
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

const TEMPLATE = "Board Game: \n |     |     |     | \n |     |     |     | \n |     |     |     | ";
var board = TEMPLATE;

bot.start(ctx => ctx.reply("Welcome!!! :)"));
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
// bot.hears("hi", ctx => ctx.reply("Hey there"));
bot.hears(/buy/i, ctx => ctx.reply("Buy-buy"));

bot.hears("play", (ctx) => {
  ctx.reply(ctx.message.from.id);
  ctx.reply(TEMPLATE);
})

bot.startPolling();
