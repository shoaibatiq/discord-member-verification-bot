# Discord Member Verification Bot
---
### Powerd By:
  [![nodejs ](https://i.imgur.com/PDBdxFK.png)](https://nodejs.org/en/)   [![firebase ](https://i.imgur.com/C3pkUtm.png)](https://firebase.google.com/)  [![discord.js ](https://i.imgur.com/YGCfwBd.png)](https://discord.js.org/#/)
  
 ![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103) ![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

---
### Installation
1. Clone the repo
```sh
git clone https://github.com/shoaibatiq/discord-member-verification-bot.git
```

2. Install packages
```sh
npm install
```
---
### Usage
This bot utilizes `discord.js` and  `firebase` to create a member verification system in your server. You need to store the verified users' emails in `firebase realtime database` under the `registerdUsers`. In your server create a `verification` channel and also create a `verified` role (role name is up to you). Add the bot to your server and populate `.env` and `dbCreds.json` with your credentials. Run the bot and use the slash command `/verify` in the verification channel. Change the `verification`  channel's permission so that `@everyone` can only view the channel and see chat history and disable all permissions for the `verified` role. After executing the slash command enter your email address, if your email is in `regestierdUsers` you will receive an OTP code on your email address otherwise the bot will display the message that this email isn't authorized. After receiving the OTP code enter it in the `Enter OTP` input field in the `verification` channel. If the OTP  is correct then the bot will assign you the `verified` role and the user will be authorized to view the channel only visible to `verified` members. After verifying the member the bot will also store member's `discord handle`, `discord user id`, `email` in `firebase` under `users` and if someone tries to use the same email for verification agian the bot will display a message that this email has already been used.

<img src="https://raw.githubusercontent.com/shoaibatiq/discord-member-verification-bot/master/Screenshots/Screenshot%20(34).png" />
<img src="https://raw.githubusercontent.com/shoaibatiq/discord-member-verification-bot/master/Screenshots/Screenshot%20(35).png" />
<img src="https://raw.githubusercontent.com/shoaibatiq/discord-member-verification-bot/master/Screenshots/Screenshot%20(36).png" />
<img src="https://raw.githubusercontent.com/shoaibatiq/discord-member-verification-bot/master/Screenshots/Screenshot%20(37).png" />
<img src="https://raw.githubusercontent.com/shoaibatiq/discord-member-verification-bot/master/Screenshots/Screenshot%20(39).png" />
<img src="https://raw.githubusercontent.com/shoaibatiq/discord-member-verification-bot/master/Screenshots/Screenshot%20(38).png" />
<img src="https://raw.githubusercontent.com/shoaibatiq/discord-member-verification-bot/master/Screenshots/Screenshot%20(40).png" />

---
### Firebase Realtime Databse Structure
<img src="https://raw.githubusercontent.com/shoaibatiq/discord-member-verification-bot/master/Screenshots/db.png" />

---

### Note:
You might get permission error while assigning `verified` role. Yo can fix that by going to Server setiings->Roles and sliding the `Verification Bot` role all the way up.
