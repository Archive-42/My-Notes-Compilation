EN

- <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="long-polling.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/long-polling" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- <a href="https://fr.javascript.info/long-polling" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span>Français</span></a>
- long-polling" class="supported-langs**link"><span class="supported-langs**brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/long-polling" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

/" class="supported-langs**link"><span class="supported-langs**brief">KO</span><span>한국어</span></a>

<a href="long-polling%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>

<a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>

<a href="https://zh.javascript.info/long-polling" class="supported-langs__link"></a>

Search

<span class="share-icons__title">Share</span>2Flong-polling" rel="nofollow" &gt;2Flong-polling عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="network.html" class="breadcrumbs__link"><span>Network requests</span></a></span>

13th November 2020

# Long polling

Long polling is the simplest way of having persistent connection with server, that doesn’t use any specific protocol like WebSocket or Server Side Events.

Being very easy to implement, it’s also good enough in a lot of cases.

## <a href="long-polling.html#regular-polling" id="regular-polling" class="main__anchor">Regular Polling</a>

The simplest way to get new information from the server is periodic polling. That is, regular requests to the server: “Hello, I’m here, do you have any information for me?”. For example, once every 10 seconds.

In response, the server first takes a notice to itself that the client is online, and second – sends a packet of messages it got till that moment.

That works, but there are downsides:

1.  Messages are passed with a delay up to 10 seconds (between requests).
2.  Even if there are no messages, the server is bombed with requests every 10 seconds, even if the user switched somewhere else or is asleep. That’s quite a load to handle, speaking performance-wise.

So, if we’re talking about a very small service, the approach may be viable, but generally, it needs an improvement.

## <a href="long-polling.html#long-polling" id="long-polling" class="main__anchor">Long polling</a>

So-called “long polling” is a much better way to poll the server.

It’s also very easy to implement, and delivers messages without delays.

The flow:

1.  A request is sent to the server.
2.  The server doesn’t close the connection until it has a message to send.
3.  When a message appears – the server responds to the request with it.
4.  The browser makes a new request immediately.

The situation when the browser sent a request and has a pending connection with the server, is standard for this method. Only when a message is delivered, the connection is reestablished.

<figure><img src="article/long-polling/long-polling.svg" width="521" height="320" /></figure>If the connection is lost, because of, say, a network error, the browser immediately sends a new request.

A sketch of client-side `subscribe` function that makes long requests:

    async function subscribe() {
      let response = await fetch("/subscribe");

      if (response.status == 502) {
        // Status 502 is a connection timeout error,
        // may happen when the connection was pending for too long,
        // and the remote server or a proxy closed it
        // let's reconnect
        await subscribe();
      } else if (response.status != 200) {
        // An error - let's show it
        showMessage(response.statusText);
        // Reconnect in one second
        await new Promise(resolve => setTimeout(resolve, 1000));
        await subscribe();
      } else {
        // Get and show the message
        let message = await response.text();
        showMessage(message);
        // Call subscribe() again to get the next message
        await subscribe();
      }
    }

    subscribe();

As you can see, `subscribe` function makes a fetch, then waits for the response, handles it and calls itself again.

<span class="important__type">Server should be ok with many pending connections</span>

The server architecture must be able to work with many pending connections.

Certain server architectures run one process per connection, resulting in there being as many processes as there are connections, while each process consumes quite a bit of memory. So, too many connections will just consume it all.

That’s often the case for backends written in languages like PHP and Ruby.

Servers written using Node.js usually don’t have such problems.

That said, it isn’t a programming language issue. Most modern languages, including PHP and Ruby allow to implement a proper backend. Just please make sure that your server architecture works fine with many simultaneous connections.

## <a href="long-polling.html#demo-a-chat" id="demo-a-chat" class="main__anchor">Demo: a chat</a>

Here’s a demo chat, you can also download it and run locally (if you’re familiar with Node.js and can install modules):

Result

browser.js

server.js

index.html

<a href="article/long-polling/longpoll/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="tutorial/zipview/longpoll.zip%3FplunkId=1LAJIEQpn9jFLCd5" class="code-tabs__button code-tabs__button_download"></a>

    // Sending messages, a simple POST
    function PublishForm(form, url) {

      function sendMessage(message) {
        fetch(url, {
          method: 'POST',
          body: message
        });
      }

      form.onsubmit = function() {
        let message = form.message.value;
        if (message) {
          form.message.value = '';
          sendMessage(message);
        }
        return false;
      };
    }

    // Receiving messages with long polling
    function SubscribePane(elem, url) {

      function showMessage(message) {
        let messageElem = document.createElement('div');
        messageElem.append(message);
        elem.append(messageElem);
      }

      async function subscribe() {
        let response = await fetch(url);

        if (response.status == 502) {
          // Connection timeout
          // happens when the connection was pending for too long
          // let's reconnect
          await subscribe();
        } else if (response.status != 200) {
          // Show Error
          showMessage(response.statusText);
          // Reconnect in one second
          await new Promise(resolve => setTimeout(resolve, 1000));
          await subscribe();
        } else {
          // Got message
          let message = await response.text();
          showMessage(message);
          await subscribe();
        }
      }

      subscribe();

    }

    let http = require('http');
    let url = require('url');
    let querystring = require('querystring');
    let static = require('node-static');

    let fileServer = new static.Server('.');

    let subscribers = Object.create(null);

    function onSubscribe(req, res) {
      let id = Math.random();

      res.setHeader('Content-Type', 'text/plain;charset=utf-8');
      res.setHeader("Cache-Control", "no-cache, must-revalidate");

      subscribers[id] = res;

      req.on('close', function() {
        delete subscribers[id];
      });

    }

    function publish(message) {

      for (let id in subscribers) {
        let res = subscribers[id];
        res.end(message);
      }

      subscribers = Object.create(null);
    }

    function accept(req, res) {
      let urlParsed = url.parse(req.url, true);

      // new client wants messages
      if (urlParsed.pathname == '/subscribe') {
        onSubscribe(req, res);
        return;
      }

      // sending a message
      if (urlParsed.pathname == '/publish' && req.method == 'POST') {
        // accept POST
        req.setEncoding('utf8');
        let message = '';
        req.on('data', function(chunk) {
          message += chunk;
        }).on('end', function() {
          publish(message); // publish it to everyone
          res.end("ok");
        });

        return;
      }

      // the rest is static
      fileServer.serve(req, res);

    }

    function close() {
      for (let id in subscribers) {
        let res = subscribers[id];
        res.end();
      }
    }

    // -----------------------------------

    if (!module.parent) {
      http.createServer(accept).listen(8080);
      console.log('Server running on port 8080');
    } else {
      exports.accept = accept;

      if (process.send) {
         process.on('message', (msg) => {
           if (msg === 'shutdown') {
             close();
           }
         });
      }

      process.on('SIGINT', close);
    }

    <!DOCTYPE html>
    <script src="browser.js"></script>

    All visitors of this page will see messages of each other.

    <form name="publish">
      <input type="text" name="message" />
      <input type="submit" value="Send" />
    </form>

    <div id="subscribe">
    </div>

    <script>
      new PublishForm(document.forms.publish, 'publish');
      // random url parameter to avoid any caching issues
      new SubscribePane(document.getElementById('subscribe'), 'subscribe?random=' + Math.random());
    </script>

Browser code is in `browser.js`.

## <a href="long-polling.html#area-of-usage" id="area-of-usage" class="main__anchor">Area of usage</a>

Long polling works great in situations when messages are rare.

If messages come very often, then the chart of requesting-receiving messages, painted above, becomes saw-like.

Every message is a separate request, supplied with headers, authentication overhead, and so on.

So, in this case, another method is preferred, such as [Websocket](websocket.html) or [Server Sent Events](server-sent-events.html).

<a href="resume-upload.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="websocket.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Flong-polling" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Flong-polling" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="long-polling.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

- <a href="network.html" class="sidebar__link">Network requests</a>

#### Lesson navigation

- long-polling.html\#regular-polling" &gt;Regular Polling
- long-polling.html\#long-polling" &gt;Long polling
- long-polling.html\#demo-a-chat" &gt;Demo: a chat
- long-polling.html\#area-of-usage" &gt;Area of usage

<!-- -->

- <a href="long-polling.html#comments" class="sidebar__link">Comments</a>

<a s%3A%2F%2Fjavascript.info%2Flong-polling" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Flong-polling" class="share share_fb sidebar**share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/10-long-polling" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
