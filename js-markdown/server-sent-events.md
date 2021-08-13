EN

- <a href="https://ar.javascript.info/"
- <a href="server-sent-events.html"
- <a href="https://es.javascript.info/server-sent-events"
- <a href="https://fr.javascript.info/server-sent-events"
- server-sent-events"
  server-sent-events"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=server-sent-events"
- <a href="https://tr.javascript.info/server-sent-events"
- <a href="https://zh.javascript.info/server-sent-events"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fserver-sent-events" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fserver-sent-events" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="network.html" Network requests</span></a></span>

30th November 2020

# Server Sent Events

The [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) specification describes a built-in class `EventSource`, that keeps connection with the server and allows to receive events from it.

Similar to `WebSocket`, the connection is persistent.

But there are several important differences:

<table><thead><tr class="header"><th><code>WebSocket</code></th><th><code>EventSource</code></th></tr></thead><tbody><tr class="odd"><td>Bi-directional: both client and server can exchange messages</td><td>One-directional: only server sends data</td></tr><tr class="even"><td>Binary and text data</td><td>Only text</td></tr><tr class="odd"><td>WebSocket protocol</td><td>Regular HTTP</td></tr></tbody></table>

`EventSource` is a less-powerful way of communicating with the server than `WebSocket`.

Why should one ever use it?

The main reason: it’s simpler. In many applications, the power of `WebSocket` is a little bit too much.

We need to receive a stream of data from server: maybe chat messages or market prices, or whatever. That’s what `EventSource` is good at. Also it supports auto-reconnect, something we need to implement manually with `WebSocket`. Besides, it’s a plain old HTTP, not a new protocol.

## <a href="server-sent-events.html#getting-messages" id="getting-messages" class="main__anchor">Getting messages</a>

To start receiving messages, we just need to create `new EventSource(url)`.

The browser will connect to `url` and keep the connection open, waiting for events.

The server should respond with status 200 and the header `Content-Type: text/event-stream`, then keep the connection and write messages into it in the special format, like this:

    data: Message 1

    data: Message 2

    data: Message 3
    data: of two lines

- A message text goes after `data:`, the space after the colon is optional.
- Messages are delimited with double line breaks `\n\n`.
- To send a line break `\n`, we can immediately send one more `data:` (3rd message above).

In practice, complex messages are usually sent JSON-encoded. Line-breaks are encoded as `\n` within them, so multiline `data:` messages are not necessary.

For instance:

    data: {"user":"John","message":"First line\n Second line"}

…So we can assume that one `data:` holds exactly one message.

For each such message, the `message` event is generated:

    let eventSource = new EventSource("/events/subscribe");

    eventSource.onmessage = function(event) {
      console.log("New message", event.data);
      // will log 3 times for the data stream above
    };

    // or eventSource.addEventListener('message', ...)

### <a href="server-sent-events.html#cross-origin-requests" id="cross-origin-requests" class="main__anchor">Cross-origin requests</a>

`EventSource` supports cross-origin requests, like `fetch` and any other networking methods. We can use any URL:

    let source = new EventSource("https://another-site.com/events");

The remote server will get the `Origin` header and must respond with `Access-Control-Allow-Origin` to proceed.

To pass credentials, we should set the additional option `withCredentials`, like this:

    let source = new EventSource("https://another-site.com/events", {
      withCredentials: true
    });

Please see the chapter [Fetch: Cross-Origin Requests](fetch-crossorigin.html) for more details about cross-origin headers.

## <a href="server-sent-events.html#reconnection" id="reconnection" class="main__anchor">Reconnection</a>

Upon creation, `new EventSource` connects to the server, and if the connection is broken – reconnects.

That’s very convenient, as we don’t have to care about it.

There’s a small delay between reconnections, a few seconds by default.

The server can set the recommended delay using `retry:` in response (in milliseconds):

    retry: 15000
    data: Hello, I set the reconnection delay to 15 seconds

The `retry:` may come both together with some data, or as a standalone message.

The browser should wait that many milliseconds before reconnecting. Or longer, e.g. if the browser knows (from OS) that there’s no network connection at the moment, it may wait until the connection appears, and then retry.

- If the server wants the browser to stop reconnecting, it should respond with HTTP status 204.
- If the browser wants to close the connection, it should call `eventSource.close()`:

  let eventSource = new EventSource(...);

  eventSource.close();

Also, there will be no reconnection if the response has an incorrect `Content-Type` or its HTTP status differs from 301, 307, 200 and 204. In such cases the `"error"` event will be emitted, and the browser won’t reconnect.

<span class="important__type">Please note:</span>

When a connection is finally closed, there’s no way to “reopen” it. If we’d like to connect again, just create a new `EventSource`.

## <a href="server-sent-events.html#message-id" id="message-id" class="main__anchor">Message id</a>

When a connection breaks due to network problems, either side can’t be sure which messages were received, and which weren’t.

To correctly resume the connection, each message should have an `id` field, like this:

    data: Message 1
    id: 1

    data: Message 2
    id: 2

    data: Message 3
    data: of two lines
    id: 3

When a message with `id:` is received, the browser:

- Sets the property `eventSource.lastEventId` to its value.
- Upon reconnection sends the header `Last-Event-ID` with that `id`, so that the server may re-send following messages.

<span class="important__type">Put `id:` after `data:`</span>

Please note: the `id` is appended below message `data` by the server, to ensure that `lastEventId` is updated after the message is received.

## <a href="server-sent-events.html#connection-status-readystate" id="connection-status-readystate" class="main__anchor">Connection status: readyState</a>

The `EventSource` object has `readyState` property, that has one of three values:

    EventSource.CONNECTING = 0; // connecting or reconnecting
    EventSource.OPEN = 1;       // connected
    EventSource.CLOSED = 2;     // connection closed

When an object is created, or the connection is down, it’s always `EventSource.CONNECTING` (equals `0`).

We can query this property to know the state of `EventSource`.

## <a href="server-sent-events.html#event-types" id="event-types" class="main__anchor">Event types</a>

By default `EventSource` object generates three events:

- `message` – a message received, available as `event.data`.
- `open` – the connection is open.
- `error` – the connection could not be established, e.g. the server returned HTTP 500 status.

The server may specify another type of event with `event: ...` at the event start.

For example:

    event: join
    data: Bob

    data: Hello

    event: leave
    data: Bob

To handle custom events, we must use `addEventListener`, not `onmessage`:

    eventSource.addEventListener('join', event => {
      alert(`Joined ${event.data}`);
    });

    eventSource.addEventListener('message', event => {
      alert(`Said: ${event.data}`);
    });

    eventSource.addEventListener('leave', event => {
      alert(`Left ${event.data}`);
    });

## <a href="server-sent-events.html#full-example" id="full-example" class="main__anchor">Full example</a>

Here’s the server that sends messages with `1`, `2`, `3`, then `bye` and breaks the connection.

Then the browser automatically reconnects.

Result

server.js

index.html

<a href="article/server-sent-events/eventsource/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="tutorial/zipview/eventsource.zip%3FplunkId=kmGnjUVPK5PigVvr" class="code-tabs__button code-tabs__button_download"></a>

    let http = require('http');
    let url = require('url');
    let querystring = require('querystring');
    let static = require('node-static');
    let fileServer = new static.Server('.');

    function onDigits(req, res) {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache'
      });

      let i = 0;

      let timer = setInterval(write, 1000);
      write();

      function write() {
        i++;

        if (i == 4) {
          res.write('event: bye\ndata: bye-bye\n\n');
          clearInterval(timer);
          res.end();
          return;
        }

        res.write('data: ' + i + '\n\n');

      }
    }

    function accept(req, res) {

      if (req.url == '/digits') {
        onDigits(req, res);
        return;
      }

      fileServer.serve(req, res);
    }


    if (!module.parent) {
      http.createServer(accept).listen(8080);
    } else {
      exports.accept = accept;
    }

    <!DOCTYPE html>
    <script>
    let eventSource;

    function start() { // when "Start" button pressed
      if (!window.EventSource) {
        // IE or an old browser
        alert("The browser doesn't support EventSource.");
        return;
      }

      eventSource = new EventSource('digits');

      eventSource.onopen = function(e) {
        log("Event: open");
      };

      eventSource.onerror = function(e) {
        log("Event: error");
        if (this.readyState == EventSource.CONNECTING) {
          log(`Reconnecting (readyState=${this.readyState})...`);
        } else {
          log("Error has occured.");
        }
      };

      eventSource.addEventListener('bye', function(e) {
        log("Event: bye, data: " + e.data);
      });

      eventSource.onmessage = function(e) {
        log("Event: message, data: " + e.data);
      };
    }

    function stop() { // when "Stop" button pressed
      eventSource.close();
      log("eventSource.close()");
    }

    function log(msg) {
      logElem.innerHTML += msg + "<br>";
      document.documentElement.scrollTop = 99999999;
    }
    </script>

    <button onclick="start()">Start</button> Press the "Start" to begin.
    <div id="logElem" style="margin: 6px 0"></div>

    <button onclick="stop()">Stop</button> "Stop" to finish.

## <a href="server-sent-events.html#summary" id="summary" class="main__anchor">Summary</a>

`EventSource` object automatically establishes a persistent connection and allows the server to send messages over it.

It offers:

- Automatic reconnect, with tunable `retry` timeout.
- Message ids to resume events, the last received identifier is sent in `Last-Event-ID` header upon reconnection.
- The current state is in the `readyState` property.

That makes `EventSource` a viable alternative to `WebSocket`, as the latter is more low-level and lacks such built-in features (though they can be implemented).

In many real-life applications, the power of `EventSource` is just enough.

Supported in all modern browsers (not IE).

The syntax is:

    let source = new EventSource(url, [credentials]);

The second argument has only one possible option: `{ withCredentials: true }`, it allows sending cross-origin credentials.

Overall cross-origin security is same as for `fetch` and other network methods.

### <a href="server-sent-events.html#properties-of-an-eventsource-object" id="properties-of-an-eventsource-object" class="main__anchor">Properties of an <code>EventSource</code> object</a>

`readyState`  
The current connection state: either `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` or `EventSource.CLOSED (=2)`.

`lastEventId`  
The last received `id`. Upon reconnection the browser sends it in the header `Last-Event-ID`.

### <a href="server-sent-events.html#methods" id="methods" class="main__anchor">Methods</a>

`close()`  
Closes the connection.

### <a href="server-sent-events.html#events" id="events" class="main__anchor">Events</a>

`message`  
Message received, the data is in `event.data`.

`open`  
The connection is established.

`error`  
In case of an error, including both lost connection (will auto-reconnect) and fatal errors. We can check `readyState` to see if the reconnection is being attempted.

The server may set a custom event name in `event:`. Such events should be handled using `addEventListener`, not `on<event>`.

### <a href="server-sent-events.html#server-response-format" id="server-response-format" class="main__anchor">Server response format</a>

The server sends messages, delimited by `\n\n`.

A message may have following fields:

- `data:` – message body, a sequence of multiple `data` is interpreted as a single message, with `\n` between the parts.
- `id:` – renews `lastEventId`, sent in `Last-Event-ID` on reconnect.
- `retry:` – recommends a retry delay for reconnections in ms. There’s no way to set it from JavaScript.
- `event:` – event name, must precede `data:`.

A message may include one or more fields in any order, but `id:` usually goes the last.

<a href="websocket.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="data-storage.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fserver-sent-events" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fserver-sent-events" </a>

<a href="tutorial/map.html" class="map">

## <a href="server-sent-events.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="network.html" class="sidebar__link">Network requests</a>

#### Lesson navigation

- <a href="server-sent-events.html#getting-messages" class="sidebar__link">Getting messages</a>
- <a href="server-sent-events.html#reconnection" class="sidebar__link">Reconnection</a>
- <a href="server-sent-events.html#message-id" class="sidebar__link">Message id</a>
- <a href="server-sent-events.html#connection-status-readystate" class="sidebar__link">Connection status: readyState</a>
- <a href="server-sent-events.html#event-types" class="sidebar__link">Event types</a>
- <a href="server-sent-events.html#full-example" class="sidebar__link">Full example</a>
- <a href="server-sent-events.html#summary" class="sidebar__link">Summary</a>

- <a href="server-sent-events.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fserver-sent-events" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fserver-sent-events" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/12-server-sent-events" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
