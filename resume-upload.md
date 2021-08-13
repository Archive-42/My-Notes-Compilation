EN

- <a href="https://ar.javascript.info/"
- <a href="resume-upload.html"
- <a href="https://es.javascript.info/resume-upload"
- <a href="https://fr.javascript.info/resume-upload"
- <a href="https://it.javascript.info/resume-upload"
  resume-upload"

<!-- -->

- <a href="https://ko.javascript.info/resume-upload"
- <a href=resume-upload"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/resume-upload"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fresume-upload" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fresume-upload" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="network.html" Network requests</span></a></span>

28th November 2020

# Resumable file upload

With `fetch` method it’s fairly easy to upload a file.

How to resume the upload after lost connection? There’s no built-in option for that, but we have the pieces to implement it.

Resumable uploads should come with upload progress indication, as we expect big files (if we may need to resume). So, as `fetch` doesn’t allow to track upload progress, we’ll use [XMLHttpRequest](xmlhttprequest.html).

## <a href="resume-upload.html#not-so-useful-progress-event" id="not-so-useful-progress-event" class="main__anchor">Not-so-useful progress event</a>

To resume upload, we need to know how much was uploaded till the connection was lost.

There’s `xhr.upload.onprogress` to track upload progress.

Unfortunately, it won’t help us to resume the upload here, as it triggers when the data is _sent_, but was it received by the server? The browser doesn’t know.

Maybe it was buffered by a local network proxy, or maybe the remote server process just died and couldn’t process them, or it was just lost in the middle and didn’t reach the receiver.

That’s why this event is only useful to show a nice progress bar.

To resume upload, we need to know _exactly_ the number of bytes received by the server. And only the server can tell that, so we’ll make an additional request.

## <a href="resume-upload.html#algorithm" id="algorithm" class="main__anchor">Algorithm</a>

1.  First, create a file id, to uniquely identify the file we’re going to upload:

        let fileId = file.name + '-' + file.size + '-' + file.lastModified;

    That’s needed for resume upload, to tell the server what we’re resuming.

    If the name or the size or the last modification date changes, then there’ll be another `fileId`.

2.  Send a request to the server, asking how many bytes it already has, like this:

        let response = await fetch('status', {
          headers: {
            'X-File-Id': fileId
          }
        });

        // The server has that many bytes
        let startByte = +await response.text();

    This assumes that the server tracks file uploads by `X-File-Id` header. Should be implemented at server-side.

    If the file doesn’t yet exist at the server, then the server response should be `0`

3.  Then, we can use `Blob` method `slice` to send the file from `startByte`:

        xhr.open("POST", "upload", true);

        // File id, so that the server knows which file we upload
        xhr.setRequestHeader('X-File-Id', fileId);

        // The byte we're resuming from, so the server knows we're resuming
        xhr.setRequestHeader('X-Start-Byte', startByte);

        xhr.upload.onprogress = (e) => {
          console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
        };

        // file can be from input.files[0] or another source
        xhr.send(file.slice(startByte));

    Here we send the server both file id as `X-File-Id`, so it knows which file we’re uploading, and the starting byte as `X-Start-Byte`, so it knows we’re not uploading it initially, but resuming.

    The server should check its records, and if there was an upload of that file, and the current uploaded size is exactly `X-Start-Byte`, then append the data to it.

Here’s the demo with both client and server code, written on Node.js.

It works only partially on this site, as Node.js is behind another server named Nginx, that buffers uploads, passing them to Node.js when fully complete.

But you can download it and run locally for the full demonstration:

Result

server.js

uploader.js

index.html

<a href="article/resume-upload/upload-resume/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="tutorial/zipview/upload-resume.zip%3FplunkId=a0T23I5fhhQ63WAu" class="code-tabs__button code-tabs__button_download"></a>

    let http = require('http');
    let static = require('node-static');
    let fileServer = new static.Server('.');
    let path = require('path');
    let fs = require('fs');
    let debug = require('debug')('example:resume-upload');

    let uploads = Object.create(null);

    function onUpload(req, res) {

      let fileId = req.headers['x-file-id'];
      let startByte = +req.headers['x-start-byte'];

      if (!fileId) {
        res.writeHead(400, "No file id");
        res.end();
      }

      // we'll files "nowhere"
      let filePath = '/dev/null';
      // could use a real path instead, e.g.
      // let filePath = path.join('/tmp', fileId);

      debug("onUpload fileId: ", fileId);

      // initialize a new upload
      if (!uploads[fileId]) uploads[fileId] = {};
      let upload = uploads[fileId];

      debug("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte)

      let fileStream;

      // if startByte is 0 or not set, create a new file, otherwise check the size and append to existing one
      if (!startByte) {
        upload.bytesReceived = 0;
        fileStream = fs.createWriteStream(filePath, {
          flags: 'w'
        });
        debug("New file created: " + filePath);
      } else {
        // we can check on-disk file size as well to be sure
        if (upload.bytesReceived != startByte) {
          res.writeHead(400, "Wrong start byte");
          res.end(upload.bytesReceived);
          return;
        }
        // append to existing file
        fileStream = fs.createWriteStream(filePath, {
          flags: 'a'
        });
        debug("File reopened: " + filePath);
      }


      req.on('data', function(data) {
        debug("bytes received", upload.bytesReceived);
        upload.bytesReceived += data.length;
      });

      // send request body to file
      req.pipe(fileStream);

      // when the request is finished, and all its data is written
      fileStream.on('close', function() {
        if (upload.bytesReceived == req.headers['x-file-size']) {
          debug("Upload finished");
          delete uploads[fileId];

          // can do something else with the uploaded file here

          res.end("Success " + upload.bytesReceived);
        } else {
          // connection lost, we leave the unfinished file around
          debug("File unfinished, stopped at " + upload.bytesReceived);
          res.end();
        }
      });

      // in case of I/O error - finish the request
      fileStream.on('error', function(err) {
        debug("fileStream error");
        res.writeHead(500, "File error");
        res.end();
      });

    }

    function onStatus(req, res) {
      let fileId = req.headers['x-file-id'];
      let upload = uploads[fileId];
      debug("onStatus fileId:", fileId, " upload:", upload);
      if (!upload) {
        res.end("0")
      } else {
        res.end(String(upload.bytesReceived));
      }
    }


    function accept(req, res) {
      if (req.url == '/status') {
        onStatus(req, res);
      } else if (req.url == '/upload' && req.method == 'POST') {
        onUpload(req, res);
      } else {
        fileServer.serve(req, res);
      }

    }




    // -----------------------------------

    if (!module.parent) {
      http.createServer(accept).listen(8080);
      console.log('Server listening at port 8080');
    } else {
      exports.accept = accept;
    }

    class Uploader {

      constructor({file, onProgress}) {
        this.file = file;
        this.onProgress = onProgress;

        // create fileId that uniquely identifies the file
        // we could also add user session identifier (if had one), to make it even more unique
        this.fileId = file.name + '-' + file.size + '-' + file.lastModified;
      }

      async getUploadedBytes() {
        let response = await fetch('status', {
          headers: {
            'X-File-Id': this.fileId
          }
        });

        if (response.status != 200) {
          throw new Error("Can't get uploaded bytes: " + response.statusText);
        }

        let text = await response.text();

        return +text;
      }

      async upload() {
        this.startByte = await this.getUploadedBytes();

        let xhr = this.xhr = new XMLHttpRequest();
        xhr.open("POST", "upload", true);

        // send file id, so that the server knows which file to resume
        xhr.setRequestHeader('X-File-Id', this.fileId);
        // send the byte we're resuming from, so the server knows we're resuming
        xhr.setRequestHeader('X-Start-Byte', this.startByte);

        xhr.upload.onprogress = (e) => {
          this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
        };

        console.log("send the file, starting from", this.startByte);
        xhr.send(this.file.slice(this.startByte));

        // return
        //   true if upload was successful,
        //   false if aborted
        // throw in case of an error
        return await new Promise((resolve, reject) => {

          xhr.onload = xhr.onerror = () => {
            console.log("upload end status:" + xhr.status + " text:" + xhr.statusText);

            if (xhr.status == 200) {
              resolve(true);
            } else {
              reject(new Error("Upload failed: " + xhr.statusText));
            }
          };

          // onabort triggers only when xhr.abort() is called
          xhr.onabort = () => resolve(false);

        });

      }

      stop() {
        if (this.xhr) {
          this.xhr.abort();
        }
      }

    }

    <!DOCTYPE HTML>

    <script src="uploader.js"></script>

    <form name="upload" method="POST" enctype="multipart/form-data" action="/upload">
      <input type="file" name="myfile">
      <input type="submit" name="submit" value="Upload (Resumes automatically)">
    </form>

    <button onclick="uploader.stop()">Stop upload</button>


    <div id="log">Progress indication</div>

    <script>
      function log(html) {
        document.getElementById('log').innerHTML = html;
        console.log(html);
      }

      function onProgress(loaded, total) {
        log("progress " + loaded + ' / ' + total);
      }

      let uploader;

      document.forms.upload.onsubmit = async function(e) {
        e.preventDefault();

        let file = this.elements.myfile.files[0];
        if (!file) return;

        uploader = new Uploader({file, onProgress});

        try {
          let uploaded = await uploader.upload();

          if (uploaded) {
            log('success');
          } else {
            log('stopped');
          }

        } catch(err) {
          console.error(err);
          log('error');
        }
      };

    </script>

As we can see, modern networking methods are close to file managers in their capabilities – control over headers, progress indicator, sending file parts, etc.

We can implement resumable upload and much more.

<a href="xmlhttprequest.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="long-polling.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fresume-upload" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fresume-upload" </a>

<a href="tutorial/map.html" class="map">

## <a href="resume-upload.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="network.html" class="sidebar__link">Network requests</a>

#### Lesson navigation

- <a href="resume-upload.html#not-so-useful-progress-event" class="sidebar__link">Not-so-useful progress event</a>
- <a href="resume-upload.html#algorithm" class="sidebar__link">Algorithm</a>

- <a href="resume-upload.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fresume-upload" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fresume-upload" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/09-resume-upload" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
