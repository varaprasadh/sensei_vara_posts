# @sensei_vara — Git series captions & hashtags (Posts 1-20)

3 caption variants per post: **mystery hook** / **direct value** / **short & punchy**.
Hashtags below each — 8-12 per IG best practice.

---

## P1 — Git is a graph

**Mystery hook**
Every git tutorial shows branches as forking trees.
That's a lie.
Once you see what your repo actually is, every command makes sense.
Swipe → for the mental model that fixes everything. 👇

**Direct value**
Git is a graph. Commits are nodes. Parents are edges. Everything else (branches, merges, rebases) is just walking it. With real `git log --graph` output and diagrams. ⬇️

**Short & punchy**
Git isn't a tree.
It's a graph.
Save this. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #programming #coding #devtips #versioncontrol #techthread

---

## P2 — What's inside `.git/`

**Mystery hook**
There's a folder you've ignored 10,000 times.
It contains your entire repo — not just history. The whole thing.
Open it up. ⬇️

**Direct value**
A guided tour of `.git/`: objects, refs, HEAD, index, hooks, logs. Every folder demystified, in 8 slides. ⬇️

**Short & punchy**
`.git/` is the repo.
Your files are just a snapshot. →

**Tags**
#git #github #softwareengineering #devops #buildinpublic #webdev #devthread #programming #devtips #versioncontrol #cli

---

## P3 — The 3 trees

**Mystery hook**
"Where are my changes?" is the most-asked question in git.
The answer is always one of 3 places.
If you know them, you never panic again. ⬇️

**Direct value**
Git's 3 trees: working directory, index (staging), HEAD. Where commands move files between them. The mental model that ends the confusion. ⬇️

**Short & punchy**
3 trees. Every git command moves files between them.
That's it. →

**Tags**
#git #github #softwareengineering #buildinpublic #devthread #webdev #programming #coding #devtips #versioncontrol

---

## P4 — Branches are just pointers

**Mystery hook**
You think branches are folders of code.
They're not.
A branch in git is one text file holding one number.
Once this clicks, branch operations feel free. ⬇️

**Direct value**
Branches aren't copies. They're 40-character text files. Switching, creating, deleting — all near-instant. Here's why, with `cat .git/refs/heads/main` proof. ⬇️

**Short & punchy**
A branch is a text file.
That's it. Now everything's cheap. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #programming #coding #devtips #versioncontrol

---

## P5 — Merge vs rebase, finally

**Mystery hook**
There's a 10-year debate that splits dev teams in half.
Both sides are right. Both sides are wrong.
Here's the one rule that ends it. ⬇️

**Direct value**
Merge vs rebase, finally settled. What each one does, when to use which, and the golden rule about shared history. With graph diagrams for both. ⬇️

**Short & punchy**
Merge or rebase?
Depends on the audience. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #programming #coding #devtips #versioncontrol

---

## P6 — Conflicts: stay calm

**Mystery hook**
That `<<<<<<<` marker isn't an error.
It's git asking you a question.
Here's how to answer it without panic. ⬇️

**Direct value**
Resolving merge conflicts without panic. The markers decoded, the 4-step workflow, the abort hatch. ⬇️

**Short & punchy**
Top = yours. Bottom = theirs.
Pick one. Or both. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #versioncontrol

---

## P7 — Reflog: your time machine

**Mystery hook**
You ran `git reset --hard` and watched 8 commits disappear.
They're not gone.
They're never gone.
Here's how to find them. ⬇️

**Direct value**
`git reflog` — the safety net every dev should know. Recover lost commits, deleted branches, broken resets. With the exact commands. ⬇️

**Short & punchy**
You can't actually lose commits.
Save this for 2am. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #versioncontrol

---

## P8 — Stash, properly

**Mystery hook**
`git stash` is everyone's panic button.
But it's also a power tool 90% of devs never unlock.
Here's everything past the basics. ⬇️

**Direct value**
Stash, properly: list, pop, partial stash (`-p`), naming, branching from a stash, and the 4 traps that bite people. ⬇️

**Short & punchy**
Park work. Switch branches. Come back.
3 commands. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #cli

---

## P9 — Undoing things

**Mystery hook**
There are 4 verbs in git that all "undo" something.
Most devs use the wrong one.
The right one depends on what you're trying to unmake. ⬇️

**Direct value**
`reset` vs `revert` vs `restore` vs `checkout`. What each one undoes, when to use which, with a decision tree. ⬇️

**Short & punchy**
4 verbs. 4 different undos.
Save the decision tree. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #versioncontrol

---

## P10 — Cherry-pick + interactive rebase

**Mystery hook**
Before you open that PR — wait.
There are 2 commands that turn your messy commits into a clean story.
The reviewers will love you. ⬇️

**Direct value**
Cherry-pick + `git rebase -i`: copy single commits, squash, reword, drop, reorder. The 2 power moves for clean PR history. ⬇️

**Short & punchy**
Polish before you push.
2 commands. Better PRs. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #versioncontrol

---

## P11 — `git bisect`

**Mystery hook**
A bug appeared in your last 200 commits.
Reading every one would take all day.
There's a way to find it in 8 tests. ⬇️

**Direct value**
`git bisect` = binary search for your commit history. Find the first bad commit in `log(n)` tests. Plus `bisect run` for full automation. ⬇️

**Short & punchy**
200 commits. 8 tests. One bug.
That's bisect. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #debugging

---

## P12 — Recover lost commits

**Mystery hook**
Force-pushed over your teammate's work?
Reset-hard nuked your branch?
Don't panic.
If it was committed, it's still in there. ⬇️

**Direct value**
Recover lost commits: reflog, `git fsck --lost-found`, force-push survival, and the prevention checklist. ⬇️

**Short & punchy**
Nothing's actually gone.
Save this. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #versioncontrol

---

## P13 — Pull requests, the mental model

**Mystery hook**
There's no `git pull-request` command.
PRs aren't a git feature at all.
Once you see what they really are, you'll review them better. ⬇️

**Direct value**
Pull requests demystified: they're a host feature wrapping a branch comparison. Squash vs merge vs rebase explained, plus how to actually review one. ⬇️

**Short & punchy**
A PR is a diff with a UI.
That's it. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #codereview #pullrequest

---

## P14 — Force-push, safely

**Mystery hook**
There's one flag that turns "I overwrote my teammate's work" into "git refused to push."
Most devs never type it.
You should. ⬇️

**Direct value**
`--force-with-lease`: force-push without overwriting other people's commits. With/without compared side by side. ⬇️

**Short & punchy**
`-f` is rude.
`--force-with-lease` is polite. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #versioncontrol

---

## P15 — Git hooks for builders

**Mystery hook**
Free CI that runs on your laptop, before you push.
20 lines of bash.
Most repos have it. Yours probably doesn't. ⬇️

**Direct value**
Git hooks: pre-commit, commit-msg, pre-push. Lint before commit, enforce conventional commits, run tests on push. With husky + lefthook + `core.hooksPath` setups. ⬇️

**Short & punchy**
Lint before commit.
Test before push.
1 hook each. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devops #programming #coding #devtools #ci

---

## P16 — Submodules vs subtrees vs monorepo

**Mystery hook**
Your repo depends on another repo.
There are 3 ways to wire that up.
Each has a tax. Pick the one you're willing to pay. ⬇️

**Direct value**
Submodules vs subtrees vs monorepo: trade-offs side by side, decision flowchart by team size + change frequency. ⬇️

**Short & punchy**
3 ways to nest repos.
None of them are free. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #monorepo #devtips #programming #coding

---

## P17 — What `git push` actually does

**Mystery hook**
`git push` runs 4 distinct phases.
You've never thought about any of them.
You should. They explain every weird push error you've ever seen. ⬇️

**Direct value**
Under the hood of `git push`: handshake → negotiate → packfile → update refs. Plus why non-fast-forward errors happen. ⬇️

**Short & punchy**
`git push` is 4 steps.
Now you know them. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #networking

---

## P18 — Packfiles, GC, repo size

**Mystery hook**
You ran `du -sh .git/` and it said 0.5 GB.
You committed mostly text.
Where did all that space go? ⬇️

**Direct value**
Why your `.git/` is huge: loose objects vs packfiles, `git gc`, and how to audit and reclaim space. ⬇️

**Short & punchy**
Your repo is fat.
Here's why. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devops #programming #coding #performance

---

## P19 — Git LFS: when + why

**Mystery hook**
Committed a 50 MB file once?
It's in your repo. Forever.
Until you learn this. ⬇️

**Direct value**
Git LFS explained: pointer files, server storage, setup in 3 commands, and when LFS is the wrong choice. ⬇️

**Short & punchy**
Don't `git add` that 50 MB.
Use LFS. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #coding #gamedev #ml

---

## P20 — Rewriting history (SERIES FINALE)

**Mystery hook**
You committed a secret.
Or a 200 MB binary.
Or a typo in 47 commit messages.
There's a way to wipe it from history — but read this first. ⬇️

**Direct value**
Rewriting git history: `filter-repo`, BFG, the force-push aftermath, and the irreversible mistakes to avoid. Finale of a 20-post git series. ⬇️

**Short & punchy**
Rewrote history. Force-pushed.
Now what?
Save this. →

**Tags**
#git #github #softwareengineering #devthread #buildinpublic #webdev #devops #devtips #programming #coding #security

---

## Posting tips

- **First 2 lines matter most** — IG truncates after that. Lead with the hook.
- **Hashtags**: drop in the first comment for a cleaner caption body.
- **Pinning order**: P1 → P5 → P11 → P20 makes a strong "series anchor" lineup on your grid.
- **Carousel covers** sell the click. If a cover isn't pulling, swap to an alt from the per-post agent reports.
- **Cross-post** to Threads + LinkedIn. LinkedIn caption can be slightly more formal.
- **Series wrap**: P20 is the finale — use the recap-style caption variant on Stories too, linking back to P1.
