<img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjYzOTIxfQ" class="page-cover-image" />

<span class="icon">⌨️</span>

Git for Build Sprint
====================

<a href="#10be09f9-93c1-49a7-be3d-7254917b29a8" class="table_of_contents-link">Git MVP</a>

<a href="#f22a1769-4fff-4ac9-857e-c74207757a82" class="table_of_contents-link">1. Use <code>main</code> as your primary branch</a>

<a href="#787d9957-6269-4b75-89b3-8376efd31d6a" class="table_of_contents-link">2. Feature Branch Naming</a>

<a href="#7b829502-5ed2-432d-b973-27db7bae8a49" class="table_of_contents-link">3. Delete Merged Branches</a>

<a href="#c73c32b8-c2ed-4bd2-99e8-481d1b301dd5" class="table_of_contents-link">4. Build Sprint Git Workflow</a>

<a href="#5247ac31-c651-470d-8da8-42b2311a4591" class="table_of_contents-link">Getting Started</a>

<a href="#9ae94f64-f93f-4f2e-b67b-f9f2d99fca31" class="table_of_contents-link">Sharing Is Good</a>

<a href="#17050ad8-5c2f-425f-805c-e21b073801fc" class="table_of_contents-link">We have lift off! 🚀</a>

<a href="#724ccf25-7118-43e8-9947-64b8b17af36f" class="table_of_contents-link">One small step 👨🏾‍🚀</a>

<a href="#9cf8db50-ff71-4ece-99fa-49229ca4ddbf" class="table_of_contents-link">Merging to <code>main</code></a>

Git MVP
=======

Git MVP includes 4 main requirements:

1. Use `main` as your primary branch
------------------------------------

You must use `main `as your primary branch, which is the default when creating a new repository.

**Why?**

-   Branching from the branches other than the `main `branch can create opportunities for merge conflicts.

2. Feature Branch Naming
------------------------

Feature branches must be named: `feature/<descriptive name>`

For example, if you're working on a feature that allows users to change the email address in their profile, the branch should be named `feature/change-email`

More info on branches and how to create a branch can be found [here](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging).

**Why**?

-   Without a good naming convention, it is very easy to lose track of the purpose of a branch.

3. Delete Merged Branches
-------------------------

After a branch has been merged to the `main `branch, it must be immediately deleted.

**Why?**

-   Short-lived branches are a best-practice for minimizing merge conflicts. Leaving many branches active in a repository makes it difficult for team members to navigate the on-going work. Once a branch has been reviewed, approved, and merged into the `main `branch, it should be immediately deleted.

<!-- -->

-   A healthy Git repository has a minimum of active branches.

<!-- -->

-   This is [easy to comply with using GitHub](https://help.github.com/en/github/administering-a-repository/managing-the-automatic-deletion-of-branches).

4. Build Sprint Git Workflow
----------------------------

*Following this workflow make it easier to collaborate with your teammates. It will also help prepare you for Labs, since it is very similar to the Git workflow you will use in Labs!* **The idea is that each Trello card should be on its own pull request as a feature!**

<span class="icon">👉</span>

The Build Sprint Git Workflow is designed to prepare you for your Labs experience. You can learn more about Git & GitHub in Labs, check out the [Engineering Standards](https://labs.lambdaschool.com/) and [Labs Git Workflow.](https://docs.labs.lambdaschool.com/guides/coding/git-workflow)

Getting Started
---------------

You're ready to work on a new Trello card - let's get started!

<span class="icon">💡</span>

**WITHOUT FORKING,** clone your team's repository. After that always make sure you start with a recent copy of the repo.

### `> git checkout main`

### `> git pull origin main`

-   To get started on your first task let’s make a branch. Making sure you are on the `main `branch, start a new branch with a name that matches or correlates to the task you are about to begin.

<!-- -->

-   The trick here is to think beyond yourself when naming the branch, stay aligned with your Trello board so you ***and*** others can easily make sense of it.

<!-- -->

    git checkout -b [feature/<descriptive name>]

Sharing Is Good
---------------

Now you have a branch to make all your awesome commits to!

-   Copying the description from the Trello card, which should summarize the actual work in the PR, create a **Draft Pull Request** using the `main`branch as the **base** after you have made your first commit.

<span class="icon">☝️</span>

Github created pull request drafts so that notifications will be turned off by default until you decide you are ready for review.

![](Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/draftPR.gif)

We have lift off! 🚀
-------------------

Now we’re ready to make some awesome software. Committing and pushing our code regularly are habits worth having. Before we know it, we’ll be ready to take the PR out of draft mode.

<span class="icon">💡</span>

Tip: do your best to be a great team member by making commit messages as clear as possible. They don’t have to be elaborate- keep it to the point.

### One small step 👨🏾‍🚀

When you feel you’ve completed the task you’ve been working on, it's time to:

-   Update the description

<!-- -->

-   Take the PR out of Draft Mode

<!-- -->

-   Make it "**ready for review**".

Ask someone in your team's channel to review your work.

![](Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/github-ready-pr.png)

The team will then be notified of the PR and they can begin a review before merging it to the `main `branch.

<span class="icon">💡</span>

Tip: Follow the team policy regarding the number of reviewers required before merging. It’s great practice to take the time and make comments in the code, even if just positive notes on good work your teammate did.

Merging to `main`
-----------------

If there are no conflicts to be resolved in the code choose `Rebase and merge` or `Squash and merge` from the `Merge` button.

![](Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/github-merge.png)

<span class="icon">✅</span>

If you find yourself with a merge conflict, there are a number of ways to solve it. The Github tools are very handy. You can also do it locally. When going down the local path, there is a good set of instructions [here](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges).

Your code changes are now on the `main `branch, ready to *wow!* users with your updates.

Deploy your code (if not otherwise handled by Github Events) and be ready to support and address any issues that arise.

![Humor Break!](Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/git_comic.png)

-   Revision History

    July 30, 2020: Created by <span class="user">@Christine Carpenter</span>

    August 8, 2020: Edited by: <span class="user">@Christine Carpenter</span> (update branch to main)
