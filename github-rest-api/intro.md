# Intro

#### [Overview](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#overview) <span id="overview"></span>

Most applications will use an existing [wrapper library](https://docs.github.com/en/libraries) in the language of your choice, but it’s important to familiarize yourself with the underlying API HTTP methods first.

There’s no easier way to kick the tires than through [cURL](http://curl.haxx.se/). If you are using an alternative client, note that you are required to send a valid [User Agent header](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#user-agent-required) in your request.

**Hello World**

Let’s start by testing our setup. Open up a command prompt and enter the following command:

    $ curl https://api.github.com/zen

    > Keep it logically awesome.

The response will be a random selection from our design philosophies.

Next, let’s `GET` [Chris Wanstrath’s](https://github.com/defunkt) [GitHub profile](https://docs.github.com/en/rest/reference/users#get-a-user):

    # GET /users/defunkt
    $ curl https://api.github.com/users/defunkt

    > {
    >   "login": "defunkt",
    >   "id": 2,
    >   "url": "https://api.github.com/users/defunkt",
    >   "html_url": "https://github.com/defunkt",
    >   ...
    > }

Mmmmm, tastes like [JSON](http://en.wikipedia.org/wiki/JSON). Let’s add the `-i` flag to include headers:

    $ curl -i https://api.github.com/users/defunkt

    > HTTP/1.1 200 OK
    > Server: GitHub.com
    > Date: Sun, 11 Nov 2012 18:43:28 GMT
    > Content-Type: application/json; charset=utf-8
    > Status: 200 OK
    > ETag: "bfd85cbf23ac0b0c8a29bee02e7117c6"
    > X-RateLimit-Limit: 60
    > X-RateLimit-Remaining: 57
    > X-RateLimit-Reset: 1352660008
    > X-GitHub-Media-Type: github.v3
    > Vary: Accept
    > Cache-Control: public, max-age=60, s-maxage=60
    > X-Content-Type-Options: nosniff
    > Content-Length: 692
    > Last-Modified: Tue, 30 Oct 2012 18:58:42 GMT

    > {
    >   "login": "defunkt",
    >   "id": 2,
    >   "url": "https://api.github.com/users/defunkt",
    >   "html_url": "https://github.com/defunkt",
    >   ...
    > }

There are a few interesting bits in the response headers. As expected, the `Content-Type` is `application/json`.

Any headers beginning with `X-` are custom headers, and are not included in the HTTP spec. For example:

- `X-GitHub-Media-Type` has a value of `github.v3`. This lets us know the [media type](https://docs.github.com/en/rest/overview/media-types) for the response. Media types have helped us version our output in API v3. We’ll talk more about that later.
- Take note of the `X-RateLimit-Limit` and `X-RateLimit-Remaining` headers. This pair of headers indicate [how many requests a client can make](https://docs.github.com/en/rest#rate-limiting) in a rolling time period (typically an hour) and how many of those requests the client has already spent.

#### [Authentication](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#authentication) <span id="authentication"></span>

Unauthenticated clients can make 60 requests per hour. To get more requests per hour, we’ll need to _authenticate_. In fact, doing anything interesting with the GitHub API requires [authentication](https://docs.github.com/en/rest#authentication).

**Using personal access tokens**

The easiest and best way to authenticate with the GitHub API is by using Basic Authentication [via OAuth tokens](https://docs.github.com/en/rest/overview/other-authentication-methods#via-oauth-and-personal-access-tokens). OAuth tokens include [personal access tokens](https://docs.github.com/en/articles/creating-an-access-token-for-command-line-use).

Use a `-u` flag to set your username:

    $ curl -i -u your_username https://api.github.com/users/octocat

When prompted, you can enter your OAuth token, but we recommend you set up a variable for it:

You can use `-u "username:$token"` and set up a variable for `token` to avoid leaving your token in shell history, which should be avoided.

    $ curl -i -u username:$token https://api.github.com/users/octocat

When authenticating, you should see your rate limit bumped to 5,000 requests an hour, as indicated in the `X-RateLimit-Limit` header. In addition to providing more calls per hour, authentication enables you to read and write private information using the API.

You can easily [create a **personal access token**](https://docs.github.com/en/articles/creating-an-access-token-for-command-line-use) using your [Personal access tokens settings page](https://github.com/settings/tokens):

![Personal Token selection](https://docs.github.com/assets/images/personal_token.png)

**Get your own user profile**

When properly authenticated, you can take advantage of the permissions associated with your GitHub account. For example, try getting [your own user profile](https://docs.github.com/en/rest/reference/users#get-the-authenticated-user):

    $ curl -i -u your_username:your_token https://api.github.com/user

    > {
    >   ...
    >   "plan": {
    >     "space": 2516582,
    >    "collaborators": 10,
    >    "private_repos": 20,
    >    "name": "medium"
    >  }
    >   ...
    > }

This time, in addition to the same set of public information we retrieved for <span class="citation" data-cites="defunkt">\[@defunkt\]</span>(https://github.com/defunkt) earlier, you should also see the non-public information for your user profile. For example, you’ll see a `plan` object in the response which gives details about the GitHub plan for the account.

**Using OAuth tokens for apps**

Apps that need to read or write private information using the API on behalf of another user should use [OAuth](https://docs.github.com/en/apps/building-integrations/setting-up-and-registering-oauth-apps).

OAuth uses _tokens_. Tokens provide two big features:

- **Revokable access**: users can revoke authorization to third party apps at any time
- **Limited access**: users can review the specific access that a token will provide before authorizing a third party app

Tokens should be created via a [web flow](https://docs.github.com/en/apps/building-oauth-apps/authorizing-oauth-apps). An application sends users to GitHub to log in. GitHub then presents a dialog indicating the name of the app, as well as the level of access the app has once it’s authorized by the user. After a user authorizes access, GitHub redirects the user back to the application:

![GitHub’s OAuth Prompt](https://docs.github.com/assets/images/oauth_prompt.png)

**Treat OAuth tokens like passwords!** Don’t share them with other users or store them in insecure places. The tokens in these examples are fake and the names have been changed to protect the innocent.

Now that we’ve got the hang of making authenticated calls, let’s move along to the [Repositories API](https://docs.github.com/en/rest/reference/repos).

#### [Repositories](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#repositories) <span id="repositories"></span>

Almost any meaningful use of the GitHub API will involve some level of Repository information. We can [`GET` repository details](https://docs.github.com/en/rest/reference/repos#get-a-repository) in the same way we fetched user details earlier:

    $ curl -i https://api.github.com/repos/twbs/bootstrap

In the same way, we can [view repositories for the authenticated user](https://docs.github.com/en/rest/reference/repos#list-repositories-for-the-authenticated-user):

    $ curl -i -H "Authorization: token ghp_16C7e42F292c6912E7710c838347Ae178B4a" \
        https://api.github.com/user/repos

Or, we can [list repositories for another user](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user):

    $ curl -i https://api.github.com/users/octocat/repos

Or, we can [list repositories for an organization](https://docs.github.com/en/rest/reference/repos#list-organization-repositories):

    $ curl -i https://api.github.com/orgs/octo-org/repos

The information returned from these calls will depend on which scopes our token has when we authenticate:

- A token with `public_repo` [scope](https://docs.github.com/en/apps/building-oauth-apps/understanding-scopes-for-oauth-apps) returns a response that includes all public repositories we have access to see on github.com.
- A token with `repo` [scope](https://docs.github.com/en/apps/building-oauth-apps/understanding-scopes-for-oauth-apps) returns a response that includes all public and private repositories we have access to see on GitHub.

As the [docs](https://docs.github.com/en/rest/reference/repos) indicate, these methods take a `type` parameter that can filter the repositories returned based on what type of access the user has for the repository. In this way, we can fetch only directly-owned repositories, organization repositories, or repositories the user collaborates on via a team.

    $ curl -i "https://api.github.com/users/octocat/repos?type=owner"

In this example, we grab only those repositories that octocat owns, not the ones on which she collaborates. Note the quoted URL above. Depending on your shell setup, cURL sometimes requires a quoted URL or else it ignores the query string.

**Create a repository**

Fetching information for existing repositories is a common use case, but the GitHub API supports creating new repositories as well. To [create a repository](https://docs.github.com/en/rest/reference/repos#create-a-repository-for-the-authenticated-user), we need to `POST` some JSON containing the details and configuration options.

    $ curl -i -H "Authorization: token ghp_16C7e42F292c6912E7710c838347Ae178B4a" \
        -d '{ \
            "name": "blog", \
            "auto_init": true, \
            "private": true, \
            "gitignore_template": "nanoc" \
          }' \
        https://api.github.com/user/repos

In this minimal example, we create a new private repository for our blog (to be served on [GitHub Pages](http://pages.github.com/), perhaps). Though the blog will be public, we’ve made the repository private. In this single step, we’ll also initialize it with a README and a [nanoc](http://nanoc.ws/)-flavored [.gitignore template](https://github.com/github/gitignore).

The resulting repository will be found at `https://github.com/<your_username>/blog`. To create a repository under an organization for which you’re an owner, just change the API method from `/user/repos` to `/orgs/<org_name>/repos`.

Next, let’s fetch our newly created repository:

    $ curl -i https://api.github.com/repos/pengwynn/blog

    > HTTP/1.1 404 Not Found

    > {
    >    "message": "Not Found"
    > }

Oh noes! Where did it go? Since we created the repository as _private_, we need to authenticate in order to see it. If you’re a grizzled HTTP user, you might expect a `403` instead. Since we don’t want to leak information about private repositories, the GitHub API returns a `404` in this case, as if to say “we can neither confirm nor deny the existence of this repository.”

#### [Issues](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#issues) <span id="issues"></span>

The UI for Issues on GitHub aims to provide ‘just enough’ workflow while staying out of your way. With the GitHub [Issues API](https://docs.github.com/en/rest/reference/issues), you can pull data out or create issues from other tools to create a workflow that works for your team.

Just like github.com, the API provides a few methods to view issues for the authenticated user. To [see all your issues](https://docs.github.com/en/rest/reference/issues#list-issues-assigned-to-the-authenticated-user), call `GET /issues`:

    $ curl -i -H "Authorization: token ghp_16C7e42F292c6912E7710c838347Ae178B4a" \
        https://api.github.com/issues

To get only the [issues under one of your GitHub organizations](https://docs.github.com/en/rest/reference/issues#list-issues-assigned-to-the-authenticated-user), call `GET /orgs/<org>/issues`:

    $ curl -i -H "Authorization: token ghp_16C7e42F292c6912E7710c838347Ae178B4a" \
        https://api.github.com/orgs/rails/issues

We can also get [all the issues under a single repository](https://docs.github.com/en/rest/reference/issues#list-repository-issues):

    $ curl -i https://api.github.com/repos/rails/rails/issues

**Pagination**

A project the size of Rails has thousands of issues. We’ll need to [paginate](https://docs.github.com/en/rest#pagination), making multiple API calls to get the data. Let’s repeat that last call, this time taking note of the response headers:

    $ curl -i https://api.github.com/repos/rails/rails/issues

    > HTTP/1.1 200 OK

    > ...
    > Link: <https://api.github.com/repositories/8514/issues?page=2>; rel="next", <https://api.github.com/repositories/8514/issues?page=30>; rel="last"
    > ...

The [`Link` header](https://www.w3.org/wiki/LinkHeader) provides a way for a response to link to external resources, in this case additional pages of data. Since our call found more than thirty issues (the default page size), the API tells us where we can find the next page and the last page of results.

**Creating an issue**

Now that we’ve seen how to paginate lists of issues, let’s [create an issue](https://docs.github.com/en/rest/reference/issues#create-an-issue) from the API.

To create an issue, we need to be authenticated, so we’ll pass an OAuth token in the header. Also, we’ll pass the title, body, and labels in the JSON body to the `/issues` path underneath the repository in which we want to create the issue:

    $ curl -i -H 'Authorization: token ghp_16C7e42F292c6912E7710c838347Ae178B4a' \
    $    -d '{ \
    $         "title": "New logo", \
    $         "body": "We should have one", \
    $         "labels": ["design"] \
    $       }' \
    $    https://api.github.com/repos/pengwynn/api-sandbox/issues

    > HTTP/1.1 201 Created
    > Location: https://api.github.com/repos/pengwynn/api-sandbox/issues/17
    > X-RateLimit-Limit: 5000

    > {
    >   "pull_request": {
    >     "patch_url": null,
    >     "html_url": null,
    >     "diff_url": null
    >   },
    >   "created_at": "2012-11-14T15:25:33Z",
    >   "comments": 0,
    >   "milestone": null,
    >   "title": "New logo",
    >   "body": "We should have one",
    >   "user": {
    >     "login": "pengwynn",
    >     "gravatar_id": "7e19cd5486b5d6dc1ef90e671ba52ae0",
    >     "avatar_url": "https://secure.gravatar.com/avatar/7e19cd5486b5d6dc1ef90e671ba52ae0?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    >     "id": 865,
    >     "url": "https://api.github.com/users/pengwynn"
    >   },
    >   "closed_at": null,
    >   "updated_at": "2012-11-14T15:25:33Z",
    >   "number": 17,
    >   "closed_by": null,
    >   "html_url": "https://github.com/pengwynn/api-sandbox/issues/17",
    >   "labels": [
    >     {
    >       "color": "ededed",
    >       "name": "design",
    >       "url": "https://api.github.com/repos/pengwynn/api-sandbox/labels/design"
    >     }
    >   ],
    >   "id": 8356941,
    >   "assignee": null,
    >   "state": "open",
    >   "url": "https://api.github.com/repos/pengwynn/api-sandbox/issues/17"
    > }

The response gives us a couple of pointers to the newly created issue, both in the `Location` response header and the `url` field of the JSON response.

#### [Conditional requests](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#conditional-requests) <span id="conditional-requests"></span>

A big part of being a good API citizen is respecting rate limits by caching information that hasn’t changed. The API supports [conditional requests](https://docs.github.com/en/rest#conditional-requests) and helps you do the right thing. Consider the first call we made to get defunkt’s profile:

    $ curl -i https://api.github.com/users/defunkt

    > HTTP/1.1 200 OK
    > ETag: "bfd85cbf23ac0b0c8a29bee02e7117c6"

In addition to the JSON body, take note of the HTTP status code of `200` and the `ETag` header. The [ETag](http://en.wikipedia.org/wiki/HTTP_ETag) is a fingerprint of the response. If we pass that on subsequent calls, we can tell the API to give us the resource again, only if it has changed:

    $ curl -i -H 'If-None-Match: "bfd85cbf23ac0b0c8a29bee02e7117c6"' \
    $    https://api.github.com/users/defunkt

    > HTTP/1.1 304 Not Modified

The `304` status indicates that the resource hasn’t changed since the last time we asked for it and the response will contain no body. As a bonus, `304` responses don’t count against your [rate limit](https://docs.github.com/en/rest#rate-limiting).
