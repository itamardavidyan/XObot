
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

// var players = ["X","O"];
// var players = [];
var turn = 1;

const TEMPLATE = "Board Game: \n |     |     |     | \n |     |     |     | \n |     |     |     | ";
var board = TEMPLATE;

bot.start(ctx => ctx.reply("Welcome!!! :)"));
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
// bot.hears("hi", ctx => ctx.reply("Hey there"));
bot.hears(/me/i, ctx => {
  if (players.length == 0) return;
  ctx.reply("game start")
});

bot.command("play", (ctx) => {
  ctx.reply(ctx.message.from.id);
  ctx.reply(TEMPLATE);
  ctx.reply("who play against you?");
  players[ctx.message.from.id] = "X";
  turn = ctx.message.from.id;
  ctx.reply(players[turn]);
//   ctx.reply(players[turn]);
//   if (turn == 0) turn = 1;
//   else turn = 0;
})

bot.startPolling();
