# discord.js-v13TS-template
A template for discord.js v13 written in typescript

---
### Setup

Requires nodejs v16 or above

- Rename `example.config.yml` to `config.yml` and put in the parameters
- You may do the same with `example.storage.yml` but that's just there for example on if you wanted stored manipulatable data during runtime.

once params have been filled in run:


```
# To install packages: 
$ npm i

# Running the bot with either yarn or npm
$ yarn start 
# Or
$ npm start
 
```

---
### Notes
- All notes are provided to help not spoonfeed

- If you want to add a new value to the `config.yml` make sure to add it to `config.ts` too (same case for `storage.yml`)

- Adding new commands is pretty easy just add a new file and copy the template, easy right?

- ESlint has been added in here for extra help to help you style your code to be better, ~~make sure the eslint plugin is install on your VScode first!~~ (you can press `ctrl + shift + p` then click `ESlint: Fix all auto-fixable Problems` for some quick savers) or by running `eslint "**"`
---

###### Help support my personal bot! written in typescript too!
- [Support Server](https://support.bucketbot.dev)
- [Invite](https://invite.bucketbot.dev)
- [Github](https://github.com/KingOKarma/KFCBot)
