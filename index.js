
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

// var players = ["X","O"];
var players = [];
var turn = 0;

const TEMPLATE = "Board Game: \n |  1  |  2  |  3  | \n |  4  |  5  |  6  | \n |  7  |  8  |  9  | ";
var board = TEMPLATE;

bot.start(ctx => ctx.reply("Welcome!!! :)"));
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));

bot.hears(/me/i, ctx => {
  ctx.reply("length: " + players.length);
  if (players.length != 1) return;
  const fullName = ctx.message.from.first_name + " " + ctx.message.from.last_name
  players.push({
    id: ctx.message.from.id,
    sign: "O",
    name: fullName
  });
  const msg = players[0].name + " vs " + players[1].name;
  ctx.reply(msg);
  ctx.reply("let's the game begin!");
});

bot.command("play", (ctx) => {
//   ctx.reply(ctx.message.from);
  ctx.reply(TEMPLATE);
  ctx.reply("who play against you?");
  const fullName = ctx.message.from.first_name + " " + ctx.message.from.last_name
  players.push({
    id: ctx.message.from.id,
    sign: "X",
    name: fullName
  });
//   ctx.reply(players[turn]);
//   if (turn == 0) turn = 1;
//   else turn = 0;
})

bot.command("end", (ctx) => {
  ctx.reply("Game Over!");
  players = [];
  turn = 0;
})

bot.catch((err) => {
  console.log('Ooops', err);
  ctx.reply("Ooops..");
})

bot.startPolling();
