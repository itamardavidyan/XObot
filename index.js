const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => ctx.reply("Welcome!"));
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears("hi", ctx => ctx.reply("Hey there"));
bot.hears(/buy/i, ctx => ctx.reply("Buy-buy"));

bot.startPolling();

// const Telegraf = require("telegraf");
// const express = require("express");
// const expressApp = express();

// const API_TOKEN =
//   process.env.API_TOKEN || "664502429:AAFE5ZMd_rkvPPyG4ZMEdVHccQwBRh9fNrI";
// const PORT = process.env.PORT || 3000;
// const URL = process.env.URL || "https://xoxobot.herokuapp.com/";

// const bot = new Telegraf(API_TOKEN);
// bot.start(ctx => ctx.reply("Welcome"));
// bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
// expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));
// /*
//  your bot commands and all the other stuff on here ....
// */
// // and at the end just start server on PORT
// expressApp.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// expressApp.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
