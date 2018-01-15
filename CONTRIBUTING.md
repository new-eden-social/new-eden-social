## Contributing

First off, thank you for considering contributing to EVE Book. It's people
like you that make EVE Book possible.

### 1. Where do I go from here?

If you've noticed a bug or have a question, you should check if someone else in the
community has already created a ticket by
[searching the issue tracker](https://github.com/evebook/api/issues?q=something).
If not, go ahead and [make one](https://github.com/evebook/api/issues/new)
or ask directly on [slack](https://www.fuzzwork.co.uk/tweetfleet-slack-invites/) in `#evebook`. For bigger questions
is better to use issue tracking.

### 2. Fork & create a branch

If this is something you think you can fix, then
[fork EVE Book API](https://help.github.com/articles/fork-a-repo)
and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```sh
git checkout -b 325-add-japanese-translations
```

### 3. Did you find a bug?

* **Ensure the bug was not already reported** by [searching all
  issues](https://github.com/evebook/api/issues?q=).

* If you're unable to find an open issue addressing the problem, [open a new
  one](https://github.com/evebook/api/issues/new).  Be sure to
  include a **title and clear description**, as much relevant information as
  possible, and a **code sample** or an **executable test case** demonstrating
  the expected behavior that is not occurring.

### 4. Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help;
everyone is a beginner at first :smile_cat:

### 5. Watch out for tests and code style

We are using tslint and [AirBNB code style](https://github.com/airbnb/javascript)
to make sure code style stays the same.

Tests are another things that helps us work faster and produce less bugs in code.
After you fixed bug or implemented feauture, make sure it passes all the tests.
If you introduced new functionality, you should write tests for it.

### 5. Make a Pull Request

At this point, you should switch back to your master branch and make sure it's
up to date with EVE Book API's master branch:

```sh
git remote add upstream git@github.com:evebook/api.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```sh
git checkout 325-add-japanese-translations
git rebase master
git push --set-upstream origin 325-add-japanese-translations
```

Finally, go to GitHub and
[make a Pull Request](https://help.github.com/articles/creating-a-pull-request)
:D

Travis CI will run our test suite. We care about quality, so your PR won't be
merged until all tests pass.
