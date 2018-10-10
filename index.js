"use strict";

const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const HumanPlayer = require("./humanPlayer.js");
const BotPlayer = require("./botPlayer.js");

// var players = ["X","O"];
var players = [];
var turn = 0;
var gameStart = false;

const STARTTEMPLATE =
  "Board Game: \n |  1  |  2  |  3  | \n |  4  |  5  |  6  | \n |  7  |  8  |  9  | ";
// const TEMPLATE =
//   "Board Game: \n |     |     |     | \n |     |     |     | \n |     |     |     | ";
var board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

bot.start(ctx => ctx.reply("Welcome!!! \n send /play to start new game"));
bot.help(ctx =>
  ctx.reply(
    "inturactions: \n * /play - start game \n * /me - assign the second player \n * /bot - play against bot \n * /1 - /9 - set sign in this cell \n * /end - end the game \n enjoy!"
  )
);
bot.on("sticker", ctx => ctx.reply("👍"));

bot.command("play", ctx => {
  // checks
  if (players.length == 1) {
    ctx.reply(
      "send /me to be the second player \n send /bot to play against bot \n or \n send /end to end the game"
    );
    return;
  }
  if (players.length >= 2) {
    ctx.reply("2 players already play \n send /end to end the game");
    return;
  }
  // end checks

  ctx.reply(
    "who play against you? \n send /me to be the second player \n send /bot to play against bot"
  );
  const fullName =
    ctx.message.from.first_name + " " + ctx.message.from.last_name;

  let player = new HumanPlayer();
  player.id = ctx.message.from.id;
  player.sign = "X";
  player.name = fullName;

  players.push(player);
});

bot.command("me", ctx => {
  if (players.length == 0) ctx.reply("send /play to start new game");
  if (players.length >= 2)
    ctx.reply("2 players already play \n send /end to end the game");
  if (players.length != 1) return;
  const fullName =
    ctx.message.from.first_name + " " + ctx.message.from.last_name;

  let player = new HumanPlayer();
  player.id = ctx.message.from.id;
  player.sign = "O";
  player.name = fullName;

  players.push(player);

  const msg =
    STARTTEMPLATE +
    "\n" +
    players[0].name +
    " vs " +
    players[1].name +
    "\n let's the game begin!";
  ctx.reply(msg);
  gameStart = true;
});

bot.command("bot", ctx => {
  if (players.length == 0) ctx.reply("send /play to start new game");
  if (players.length >= 2)
    ctx.reply("2 players already play \n send /end to end the game");
  if (players.length != 1) return;

  let bot = new BotPlayer();
  players.push(bot);

  const msg =
    STARTTEMPLATE +
    "\n" +
    players[0].name +
    " vs " +
    players[1].name +
    "\n let's the game begin!";
  ctx.reply(msg);
  gameStart = true;
});

bot.command("end", ctx => {
  const id = ctx.message.from.id;
  if (gameStart && id != players[0].id && id != players[1].id) {
    ctx.reply(
      "you can't finish this game because you aren't one of the players.."
    );
    return;
  }
  ctx.reply("Game Over! \n send /play to start new game");
  initVars();
});

bot.command("1", ctx => play(ctx, "1"));
bot.command("2", ctx => play(ctx, "2"));
bot.command("3", ctx => play(ctx, "3"));
bot.command("4", ctx => play(ctx, "4"));
bot.command("5", ctx => play(ctx, "5"));
bot.command("6", ctx => play(ctx, "6"));
bot.command("7", ctx => play(ctx, "7"));
bot.command("8", ctx => play(ctx, "8"));
bot.command("9", ctx => play(ctx, "9"));

function play(ctx, pos) {
  if (players.length != 2) return;
  var sign = players[turn].sign;
  var found = false;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == pos) {
        board[i][j] = sign;
        found = true;
      }
    }
  }

  if (!found) {
    ctx.reply(
      "this position on the board already used.. \n please select another position"
    );
    return;
  }

  ctx.reply(createBoard());
  if (getWinner()) {
    ctx.reply(players[turn].name + " won!!");
    initVars();
    return;
  } else if (tie()) {
    ctx.reply("tie... \n send /play to start new game");
    initVars();
    return;
  } else {
    if (turn == 0) turn = 1;
    else turn = 0;
    ctx.reply(players[turn].name + " it's your turn");

    // if (typeof(players[turn]) === BotPlayer) {
    if (players[turn] instanceof BotPlayer) {
      const nextMove = players[turn].play(board);
      ctx.reply("bot chooose: /" + nextMove);
      play(ctx, nextMove);
    }
  }
}

function createBoard() {
  var print = "";
  for (let i = 0; i < 3; i++) {
    print += "|";
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "X" || board[i][j] == "O")
        print += "  " + board[i][j] + "  |";
      else print += "      |";
    }
    print += "\n ";
  }

  return print;
}

function initVars() {
  board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  players = [];
  turn = 0;
  gameStart = false;
}

function allSame(i1, i2, i3, sign) {
  if (
    board[i1[0]][i1[1]] == board[i2[0]][i2[1]] &&
    board[i1[0]][i1[1]] == board[i3[0]][i3[1]] &&
    board[i1[0]][i1[1]] == sign
  )
    return true;
  else return false;
}

function getWinner() {
  const sign = players[turn].sign;
  // rows
  if (allSame([0, 0], [0, 1], [0, 2], sign)) return true;
  if (allSame([1, 0], [1, 1], [1, 2], sign)) return true;
  if (allSame([2, 0], [2, 1], [2, 2], sign)) return true;

  // columns
  if (allSame([0, 0], [1, 0], [2, 0], sign)) return true;
  if (allSame([0, 1], [1, 1], [2, 1], sign)) return true;
  if (allSame([0, 2], [1, 2], [2, 2], sign)) return true;

  // diagonals
  if (allSame([0, 0], [1, 1], [2, 2], sign)) return true;
  if (allSame([0, 2], [1, 1], [2, 0], sign)) return true;
}

function tie() {
  var num = 1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == num.toString()) return false;
      num++;
    }
  }

  return true;
}

bot.catch(err => {
  console.log("Ooops", err);
  ctx.reply("Ooops..");
});

bot.startPolling();
