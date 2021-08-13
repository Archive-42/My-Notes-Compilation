EN

- <a href="https://ar.javascript.info/"
- <a href="websocket.html"
- <a href="https://es.javascript.info/websocket"
- <a href="https://fr.javascript.info/websocket"
- <a href="https://it.javascript.info/websocket"
  websocket"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=websocket"
- <a href="https://tr.javascript.info/websocket"
- <a href="https://zh.javascript.info/websocket"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fwebsocket" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fwebsocket" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="network.html" Network requests</span></a></span>

28th March 2021

# WebSocket

The `WebSocket` protocol, described in the specification [RFC 6455](http://tools.ietf.org/html/rfc6455) provides a way to exchange data between browser and server via a persistent connection. The data can be passed in both directions as “packets”, without breaking the connection and additional HTTP-requests.

WebSocket is especially great for services that require continuous data exchange, e.g. online games, real-time trading systems and so on.

## <a href="websocket.html#a-simple-example" id="a-simple-example" class="main__anchor">A simple example</a>

To open a websocket connection, we need to create `new WebSocket` using the special protocol `ws` in the url:

    let socket = new WebSocket("ws://javascript.info");

There’s also encrypted `wss://` protocol. It’s like HTTPS for websockets.

<span class="important__type">Always prefer `wss://`</span>

The `wss://` protocol is not only encrypted, but also more reliable.

That’s because `ws://` data is not encrypted, visible for any intermediary. Old proxy servers do not know about WebSocket, they may see “strange” headers and abort the connection.

On the other hand, `wss://` is WebSocket over TLS, (same as HTTPS is HTTP over TLS), the transport security layer encrypts the data at sender and decrypts at the receiver. So data packets are passed encrypted through proxies. They can’t see what’s inside and let them through.

Once the socket is created, we should listen to events on it. There are totally 4 events:

- **`open`** – connection established,
- **`message`** – data received,
- **`error`** – websocket error,
- **`close`** – connection closed.

…And if we’d like to send something, then `socket.send(data)` will do that.

Here’s an example:

<a href="websocket.html#"
<a href="websocket.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

    socket.onopen = function(e) {
      alert("[open] Connection established");
      alert("Sending to server");
      socket.send("My name is John");
    };

    socket.onmessage = function(event) {
      alert(`[message] Data received from server: ${event.data}`);
    };

    socket.onclose = function(event) {
      if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert('[close] Connection died');
      }
    };

    socket.onerror = function(error) {
      alert(`[error] ${error.message}`);
    };

For demo purposes, there’s a small server [server.js](article/websocket/demo/server.js) written in Node.js, for the example above, running. It responds with “Hello from server, John”, then waits 5 seconds and closes the connection.

So you’ll see events `open` → `message` → `close`.

That’s actually it, we can talk WebSocket already. Quite simple, isn’t it?

Now let’s talk more in-depth.

## <a href="websocket.html#opening-a-websocket" id="opening-a-websocket" class="main__anchor">Opening a websocket</a>

When `new WebSocket(url)` is created, it starts connecting immediately.

During the connection the browser (using headers) asks the server: “Do you support Websocket?” And if the server replies “yes”, then the talk continues in WebSocket protocol, which is not HTTP at all.

<figure><img src="article/websocket/websocket-handshake.svg" width="429" height="348" /></figure>Here’s an example of browser headers for request made by `new WebSocket("wss://javascript.info/chat")`.

    GET /chat
    Host: javascript.info
    Origin: https://javascript.info
    Connection: Upgrade
    Upgrade: websocket
    Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
    Sec-WebSocket-Version: 13

- `Origin` – the origin of the client page, e.g. `https://javascript.info`. WebSocket objects are cross-origin by nature. There are no special headers or other limitations. Old servers are unable to handle WebSocket anyway, so there are no compatibility issues. But `Origin` header is important, as it allows the server to decide whether or not to talk WebSocket with this website.
- `Connection: Upgrade` – signals that the client would like to change the protocol.
- `Upgrade: websocket` – the requested protocol is “websocket”.
- `Sec-WebSocket-Key` – a random browser-generated key for security.
- `Sec-WebSocket-Version` – WebSocket protocol version, 13 is the current one.

<span class="important__type">WebSocket handshake can’t be emulated</span>

We can’t use `XMLHttpRequest` or `fetch` to make this kind of HTTP-request, because JavaScript is not allowed to set these headers.

If the server agrees to switch to WebSocket, it should send code 101 response:

    101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=

Here `Sec-WebSocket-Accept` is `Sec-WebSocket-Key`, recoded using a special algorithm. The browser uses it to make sure that the response corresponds to the request.

Afterwards, the data is transfered using WebSocket protocol, we’ll see its structure (“frames”) soon. And that’s not HTTP at all.

### <a href="websocket.html#extensions-and-subprotocols" id="extensions-and-subprotocols" class="main__anchor">Extensions and subprotocols</a>

There may be additional headers `Sec-WebSocket-Extensions` and `Sec-WebSocket-Protocol` that describe extensions and subprotocols.

For instance:

- `Sec-WebSocket-Extensions: deflate-frame` means that the browser supports data compression. An extension is something related to transferring the data, functionality that extends WebSocket protocol. The header `Sec-WebSocket-Extensions` is sent automatically by the browser, with the list of all extensions it supports.

- `Sec-WebSocket-Protocol: soap, wamp` means that we’d like to transfer not just any data, but the data in [SOAP](http://en.wikipedia.org/wiki/SOAP) or WAMP (“The WebSocket Application Messaging Protocol”) protocols. WebSocket subprotocols are registered in the [IANA catalogue](http://www.iana.org/assignments/websocket/websocket.xml). So, this header describes data formats that we’re going to use.

  This optional header is set using the second parameter of `new WebSocket`. That’s the array of subprotocols, e.g. if we’d like to use SOAP or WAMP:

      let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);

The server should respond with a list of protocols and extensions that it agrees to use.

For example, the request:

    GET /chat
    Host: javascript.info
    Upgrade: websocket
    Connection: Upgrade
    Origin: https://javascript.info
    Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
    Sec-WebSocket-Version: 13
    Sec-WebSocket-Extensions: deflate-frame
    Sec-WebSocket-Protocol: soap, wamp

Response:

    101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
    Sec-WebSocket-Extensions: deflate-frame
    Sec-WebSocket-Protocol: soap

Here the server responds that it supports the extension “deflate-frame”, and only SOAP of the requested subprotocols.

## <a href="websocket.html#data-transfer" id="data-transfer" class="main__anchor">Data transfer</a>

WebSocket communication consists of “frames” – data fragments, that can be sent from either side, and can be of several kinds:

- “text frames” – contain text data that parties send to each other.
- “binary data frames” – contain binary data that parties send to each other.
- “ping/pong frames” are used to check the connection, sent from the server, the browser responds to these automatically.
- there’s also “connection close frame” and a few other service frames.

In the browser, we directly work only with text or binary frames.

**WebSocket `.send()` method can send either text or binary data.**

A call `socket.send(body)` allows `body` in string or a binary format, including `Blob`, `ArrayBuffer`, etc. No settings required: just send it out in any format.

**When we receive the data, text always comes as string. And for binary data, we can choose between `Blob` and `ArrayBuffer` formats.**

That’s set by `socket.binaryType` property, it’s `"blob"` by default, so binary data comes as `Blob` objects.

[Blob](blob.html) is a high-level binary object, it directly integrates with `<a>`, `<img>` and other tags, so that’s a sane default. But for binary processing, to access individual data bytes, we can change it to `"arraybuffer"`:

    socket.binaryType = "arraybuffer";
    socket.onmessage = (event) => {
      // event.data is either a string (if text) or arraybuffer (if binary)
    };

## <a href="websocket.html#rate-limiting" id="rate-limiting" class="main__anchor">Rate limiting</a>

Imagine, our app is generating a lot of data to send. But the user has a slow network connection, maybe on a mobile internet, outside of a city.

We can call `socket.send(data)` again and again. But the data will be buffered (stored) in memory and sent out only as fast as network speed allows.

The `socket.bufferedAmount` property stores how many bytes remain buffered at this moment, waiting to be sent over the network.

We can examine it to see whether the socket is actually available for transmission.

    // every 100ms examine the socket and send more data
    // only if all the existing data was sent out
    setInterval(() => {
      if (socket.bufferedAmount == 0) {
        socket.send(moreData());
      }
    }, 100);

## <a href="websocket.html#connection-close" id="connection-close" class="main__anchor">Connection close</a>

Normally, when a party wants to close the connection (both browser and server have equal rights), they send a “connection close frame” with a numeric code and a textual reason.

The method for that is:

    socket.close([code], [reason]);

- `code` is a special WebSocket closing code (optional)
- `reason` is a string that describes the reason of closing (optional)

Then the other party in `close` event handler gets the code and the reason, e.g.:

    // closing party:
    socket.close(1000, "Work complete");

    // the other party
    socket.onclose = event => {
      // event.code === 1000
      // event.reason === "Work complete"
      // event.wasClean === true (clean close)
    };

Most common code values:

- `1000` – the default, normal closure (used if no `code` supplied),
- `1006` – no way to set such code manually, indicates that the connection was lost (no close frame).

There are other codes like:

- `1001` – the party is going away, e.g. server is shutting down, or a browser leaves the page,
- `1009` – the message is too big to process,
- `1011` – unexpected error on server,
- …and so on.

The full list can be found in [RFC6455, §7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1).

WebSocket codes are somewhat like HTTP codes, but different. In particular, any codes less than `1000` are reserved, there’ll be an error if we try to set such a code.

    // in case connection is broken
    socket.onclose = event => {
      // event.code === 1006
      // event.reason === ""
      // event.wasClean === false (no closing frame)
    };

## <a href="websocket.html#connection-state" id="connection-state" class="main__anchor">Connection state</a>

To get connection state, additionally there’s `socket.readyState` property with values:

- **`0`** – “CONNECTING”: the connection has not yet been established,
- **`1`** – “OPEN”: communicating,
- **`2`** – “CLOSING”: the connection is closing,
- **`3`** – “CLOSED”: the connection is closed.

## <a href="websocket.html#chat-example" id="chat-example" class="main__anchor">Chat example</a>

Let’s review a chat example using browser WebSocket API and Node.js WebSocket module <https://github.com/websockets/ws>. We’ll pay the main attention to the client side, but the server is also simple.

HTML: we need a `<form>` to send messages and a `<div>` for incoming messages:

    <!-- message form -->
    <form name="publish">
      <input type="text" name="message">
      <input type="submit" value="Send">
    </form>

    <!-- div with messages -->
    <div id="messages"></div>

From JavaScript we want three things:

1.  Open the connection.
2.  On form submission – `socket.send(message)` for the message.
3.  On incoming message – append it to `div#messages`.

Here’s the code:

    let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

    // send message from the form
    document.forms.publish.onsubmit = function() {
      let outgoingMessage = this.message.value;

      socket.send(outgoingMessage);
      return false;
    };

    // message received - show the message in div#messages
    socket.onmessage = function(event) {
      let message = event.data;

      let messageElem = document.createElement('div');
      messageElem.textContent = message;
      document.getElementById('messages').prepend(messageElem);
    }

Server-side code is a little bit beyond our scope. Here we’ll use Node.js, but you don’t have to. Other platforms also have their means to work with WebSocket.

The server-side algorithm will be:

1.  Create `clients = new Set()` – a set of sockets.
2.  For each accepted websocket, add it to the set `clients.add(socket)` and setup `message` event listener to get its messages.
3.  When a message received: iterate over clients and send it to everyone.
4.  When a connection is closed: `clients.delete(socket)`.

    const ws = new require('ws');
    const wss = new ws.Server({noServer: true});

    const clients = new Set();

    http.createServer((req, res) => {
    // here we only handle websocket connections
    // in real project we'd have some other code here to handle non-websocket requests
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
    });

    function onSocketConnect(ws) {
    clients.add(ws);

    ws.on('message', function(message) {
    message = message.slice(0, 50); // max message length will be 50

        for(let client of clients) {
          client.send(message);
        }

    });

    ws.on('close', function() {
    clients.delete(ws);
    });
    }

Here’s the working example:

<a href="tutorial/zipview/chat.zip%3FplunkId=IhFPn8rKBriAIsNc" class="toolbar__button toolbar__button_download" title="download as zip"></a>

You can also download it (upper-right button in the iframe) and run locally. Just don’t forget to install [Node.js](https://nodejs.org/en/) and `npm install ws` before running.

## <a href="websocket.html#summary" id="summary" class="main__anchor">Summary</a>

WebSocket is a modern way to have persistent browser-server connections.

- WebSockets don’t have cross-origin limitations.
- They are well-supported in browsers.
- Can send/receive strings and binary data.

The API is simple.

Methods:

- `socket.send(data)`,
- `socket.close([code], [reason])`.

Events:

- `open`,
- `message`,
- `error`,
- `close`.

WebSocket by itself does not include reconnection, authentication and many other high-level mechanisms. So there are client/server libraries for that, and it’s also possible to implement these capabilities manually.

Sometimes, to integrate WebSocket into existing project, people run WebSocket server in parallel with the main HTTP-server, and they share a single database. Requests to WebSocket use `wss://ws.site.com`, a subdomain that leads to WebSocket server, while `https://site.com` goes to the main HTTP-server.

Surely, other ways of integration are also possible.

<a href="long-polling.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="server-sent-events.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fwebsocket" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fwebsocket" </a>

<a href="tutorial/map.html" class="map">

## <a href="websocket.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="network.html" class="sidebar__link">Network requests</a>

#### Lesson navigation

- <a href="websocket.html#a-simple-example" class="sidebar__link">A simple example</a>
- <a href="websocket.html#opening-a-websocket" class="sidebar__link">Opening a websocket</a>
- <a href="websocket.html#data-transfer" class="sidebar__link">Data transfer</a>
- <a href="websocket.html#rate-limiting" class="sidebar__link">Rate limiting</a>
- <a href="websocket.html#connection-close" class="sidebar__link">Connection close</a>
- <a href="websocket.html#connection-state" class="sidebar__link">Connection state</a>
- <a href="websocket.html#chat-example" class="sidebar__link">Chat example</a>
- <a href="websocket.html#summary" class="sidebar__link">Summary</a>

- <a href="websocket.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fwebsocket" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fwebsocket" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/11-websocket" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
