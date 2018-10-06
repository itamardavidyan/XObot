// var TelegramBot = require("node-telegram-bot-api");
// var opt = {polling : true};

// var bot = new TelegramBot(TelegramBot,opt);

// bot.on('message', function(msg){
//     console.log(msg);
// });


const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => ctx.reply("Welcome!!!"));
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears("hi", ctx => ctx.reply("Hey there"));
bot.hears(/buy/i, ctx => ctx.reply("Buy-buy"));

bot.startPolling();
