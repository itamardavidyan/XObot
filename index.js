const Telegraf = require("telegraf");
const express = require("express");
const expressApp = express();

const API_TOKEN = process.env.API_TOKEN || "";
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "https://your-heroku-app.herokuapp.com";

const bot = new Telegraf(API_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));
/*
 your bot commands and all the other stuff on here ....
*/
// and at the end just start server on PORT
expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
