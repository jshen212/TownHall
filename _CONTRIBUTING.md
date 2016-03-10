# Contributing Guide

#### SETUP

1) Fork the repo

2) Clone your fork to your local machine

~~~~
git clone https://github.com/**yourAcctName**/mapSnap.git
Add an upstream that points to the main repo
~~~~

3) Add an upstream remote

~~~~
git remote add upstream https://github.com/mapSnapIO/mapSnap.git
~~~~

4) Install npm and bower dependencies

~~~~
npm install
~~~~
---------------------------

#### REPEATED PROCEDURES

1) Update/sync your local code with the code from the main repo

~~~~
git pull --rebase upstream dev
~~~~

> Reinstall npm and bower dependencies if necessary.

2) Create a new branch for your contribution

~~~~
git checkout -b branchName
~~~~

3) Write your code, then add your changes

~~~~
git add yourFile
~~~~
>Commit your changes, with a message (see below for guide to commit messages)

~~~~
git commit -m "[type] description of commit"
~~~~
>Re-update/re-sync your local code with the code from the main repo

4) Rebase again to make sure you have the most updated changes

~~~~
git pull --rebase upstream dev
~~~~
>Resolve any conflicts and commit again if neccessary

5) Fix any conflicts

6) Continue with rebase once fixed
~~~~
git rebase --continue
~~~~
* if more conflicts:
* fix
* repeat step 6

7) Test code and make sure all is working

8) Push to your origin (your forked copy)

~~~~
git push origin branchName
~~~~

9) Open a pull request

---------------------------
**GIT STYLE GUIDE**

Branch Names: please use type/description with camel-casing
>feature/logoutButton

Commit Messages: please use **[TYPE]** Description with first letter of type capitalized. Description should have proper punctuation/capitalization and be in past tense.
> [Feature] Added button that allows user to logout

Possible **TYPES** include:
>setup, feature, refactor, bugfix

## Thanks for your contributions!
