EN

- <a href="https://ar.javascript.info/garbage-collection"
- <a href="garbage-collection.html"
- <a href="https://es.javascript.info/garbage-collection"
- <a href="https://fr.javascript.info/garbage-collection"
- <a href="https://it.javascript.info/garbage-collection"
  garbage-collection"

<!-- -->

- <a href="https://ko.javascript.info/garbage-collection"
- <a href=garbage-collection"
- <a href="https://tr.javascript.info/garbage-collection"
- <a href="https://zh.javascript.info/garbage-collection"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fgarbage-collection" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fgarbage-collection" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="object-basics.html" Objects: the basics</span></a></span>

13th January 2021

# Garbage collection

Memory management in JavaScript is performed automatically and invisibly to us. We create primitives, objects, functions… All that takes memory.

What happens when something is not needed any more? How does the JavaScript engine discover it and clean it up?

## <a href="garbage-collection.html#reachability" id="reachability" class="main__anchor">Reachability</a>

The main concept of memory management in JavaScript is _reachability_.

Simply put, “reachable” values are those that are accessible or usable somehow. They are guaranteed to be stored in memory.

1.  There’s a base set of inherently reachable values, that cannot be deleted for obvious reasons.

    For instance:

    - The currently executing function, its local variables and parameters.
    - Other functions on the current chain of nested calls, their local variables and parameters.
    - Global variables.
    - (there are some other, internal ones as well)

    These values are called _roots_.

2.  Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.

    For instance, if there’s an object in a global variable, and that object has a property referencing another object, _that_ object is considered reachable. And those that it references are also reachable. Detailed examples to follow.

There’s a background process in the JavaScript engine that is called [garbage collector](<https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)>). It monitors all objects and removes those that have become unreachable.

## <a href="garbage-collection.html#a-simple-example" id="a-simple-example" class="main__anchor">A simple example</a>

Here’s the simplest example:

    // user has a reference to the object
    let user = {
      name: "John"
    };

<figure><img src="article/garbage-collection/memory-user-john.svg" width="144" height="150" /></figure>Here the arrow depicts an object reference. The global variable `"user"` references the object `{name: "John"}` (we’ll call it John for brevity). The `"name"` property of John stores a primitive, so it’s painted inside the object.

If the value of `user` is overwritten, the reference is lost:

    user = null;

<figure><img src="article/garbage-collection/memory-user-john-lost.svg" width="225" height="159" /></figure>Now John becomes unreachable. There’s no way to access it, no references to it. Garbage collector will junk the data and free the memory.

## <a href="garbage-collection.html#two-references" id="two-references" class="main__anchor">Two references</a>

Now let’s imagine we copied the reference from `user` to `admin`:

    // user has a reference to the object
    let user = {
      name: "John"
    };

    let admin = user;

<figure><img src="article/garbage-collection/memory-user-john-admin.svg" width="144" height="159" /></figure>Now if we do the same:

    user = null;

…Then the object is still reachable via `admin` global variable, so it’s in memory. If we overwrite `admin` too, then it can be removed.

## <a href="garbage-collection.html#interlinked-objects" id="interlinked-objects" class="main__anchor">Interlinked objects</a>

Now a more complex example. The family:

    function marry(man, woman) {
      woman.husband = man;
      man.wife = woman;

      return {
        father: man,
        mother: woman
      }
    }

    let family = marry({
      name: "John"
    }, {
      name: "Ann"
    });

Function `marry` “marries” two objects by giving them references to each other and returns a new object that contains them both.

The resulting memory structure:

<figure><img src="article/garbage-collection/family.svg" width="337" height="204" /></figure>As of now, all objects are reachable.

Now let’s remove two references:

    delete family.father;
    delete family.mother.husband;

<figure><img src="article/garbage-collection/family-delete-refs.svg" width="337" height="204" /></figure>It’s not enough to delete only one of these two references, because all objects would still be reachable.

But if we delete both, then we can see that John has no incoming reference any more:

<figure><img src="article/garbage-collection/family-no-father.svg" width="399" height="225" /></figure>Outgoing references do not matter. Only incoming ones can make an object reachable. So, John is now unreachable and will be removed from the memory with all its data that also became unaccessible.

After garbage collection:

## <figure><img src="article/garbage-collection/family-no-father-2.svg" width="144" height="225" /></figure><a href="garbage-collection.html#unreachable-island" id="unreachable-island" class="main__anchor">Unreachable island</a>

It is possible that the whole island of interlinked objects becomes unreachable and is removed from the memory.

The source object is the same as above. Then:

    family = null;

The in-memory picture becomes:

<figure><img src="article/garbage-collection/family-no-family.svg" width="420" height="279" /></figure>This example demonstrates how important the concept of reachability is.

It’s obvious that John and Ann are still linked, both have incoming references. But that’s not enough.

The former `"family"` object has been unlinked from the root, there’s no reference to it any more, so the whole island becomes unreachable and will be removed.

## <a href="garbage-collection.html#internal-algorithms" id="internal-algorithms" class="main__anchor">Internal algorithms</a>

The basic garbage collection algorithm is called “mark-and-sweep”.

The following “garbage collection” steps are regularly performed:

- The garbage collector takes roots and “marks” (remembers) them.
- Then it visits and “marks” all references from them.
- Then it visits marked objects and marks _their_ references. All visited objects are remembered, so as not to visit the same object twice in the future.
- …And so on until every reachable (from the roots) references are visited.
- All objects except marked ones are removed.

For instance, let our object structure look like this:

<figure><img src="article/garbage-collection/garbage-collection-1.svg" width="463" height="204" /></figure>We can clearly see an “unreachable island” to the right side. Now let’s see how “mark-and-sweep” garbage collector deals with it.

The first step marks the roots:

<figure><img src="article/garbage-collection/garbage-collection-2.svg" width="463" height="204" /></figure>Then their references are marked:

<figure><img src="article/garbage-collection/garbage-collection-3.svg" width="463" height="204" /></figure>…And their references, while possible:

<figure><img src="article/garbage-collection/garbage-collection-4.svg" width="463" height="204" /></figure>Now the objects that could not be visited in the process are considered unreachable and will be removed:

<figure><img src="article/garbage-collection/garbage-collection-5.svg" width="463" height="204" /></figure>We can also imagine the process as spilling a huge bucket of paint from the roots, that flows through all references and marks all reachable objects. The unmarked ones are then removed.

That’s the concept of how garbage collection works. JavaScript engines apply many optimizations to make it run faster and not affect the execution.

Some of the optimizations:

- **Generational collection** – objects are split into two sets: “new ones” and “old ones”. Many objects appear, do their job and die fast, they can be cleaned up aggressively. Those that survive for long enough, become “old” and are examined less often.
- **Incremental collection** – if there are many objects, and we try to walk and mark the whole object set at once, it may take some time and introduce visible delays in the execution. So the engine tries to split the garbage collection into pieces. Then the pieces are executed one by one, separately. That requires some extra bookkeeping between them to track changes, but we have many tiny delays instead of a big one.
- **Idle-time collection** – the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.

There exist other optimizations and flavours of garbage collection algorithms. As much as I’d like to describe them here, I have to hold off, because different engines implement different tweaks and techniques. And, what’s even more important, things change as engines develop, so studying deeper “in advance”, without a real need is probably not worth that. Unless, of course, it is a matter of pure interest, then there will be some links for you below.

## <a href="garbage-collection.html#summary" id="summary" class="main__anchor">Summary</a>

The main things to know:

- Garbage collection is performed automatically. We cannot force or prevent it.
- Objects are retained in memory while they are reachable.
- Being referenced is not the same as being reachable (from a root): a pack of interlinked objects can become unreachable as a whole.

Modern engines implement advanced algorithms of garbage collection.

A general book “The Garbage Collection Handbook: The Art of Automatic Memory Management” (R. Jones et al) covers some of them.

If you are familiar with low-level programming, the more detailed information about V8 garbage collector is in the article [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

[V8 blog](https://v8.dev/) also publishes articles about changes in memory management from time to time. Naturally, to learn the garbage collection, you’d better prepare by learning about V8 internals in general and read the blog of [Vyacheslav Egorov](http://mrale.ph) who worked as one of V8 engineers. I’m saying: “V8”, because it is best covered with articles in the internet. For other engines, many approaches are similar, but garbage collection differs in many aspects.

In-depth knowledge of engines is good when you need low-level optimizations. It would be wise to plan that as the next step after you’re familiar with the language.

<a href="object-copy.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="object-methods.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fgarbage-collection" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fgarbage-collection" </a>

<a href="tutorial/map.html" class="map">

## <a href="garbage-collection.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="object-basics.html" class="sidebar__link">Objects: the basics</a>

#### Lesson navigation

- <a href="garbage-collection.html#reachability" class="sidebar__link">Reachability</a>
- <a href="garbage-collection.html#a-simple-example" class="sidebar__link">A simple example</a>
- <a href="garbage-collection.html#two-references" class="sidebar__link">Two references</a>
- <a href="garbage-collection.html#interlinked-objects" class="sidebar__link">Interlinked objects</a>
- <a href="garbage-collection.html#unreachable-island" class="sidebar__link">Unreachable island</a>
- <a href="garbage-collection.html#internal-algorithms" class="sidebar__link">Internal algorithms</a>
- <a href="garbage-collection.html#summary" class="sidebar__link">Summary</a>

- <a href="garbage-collection.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fgarbage-collection" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fgarbage-collection" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/04-object-basics/03-garbage-collection" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
