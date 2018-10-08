"use strict";

const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const HumanPlayer = require("./humanPlayer.js");

// var players = ["X","O"];
var players = [];
var turn = 0;

const STARTTEMPLATE =
  "Board Game: \n |  1  |  2  |  3  | \n |  4  |  5  |  6  | \n |  7  |  8  |  9  | ";
const TEMPLATE =
  "Board Game: \n |     |     |     | \n |     |     |     | \n |     |     |     | ";
var board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

bot.start(ctx => ctx.reply("Welcome!!!"));
bot.help(ctx =>
  ctx.reply(
    "inturactions: \n * /play - start game \n * /me - assign the second player \n * /1 - /9 - set sign in this cell \n * /end - end the game \n enjoy!"
  )
);
bot.on("sticker", ctx => ctx.reply("👍"));

bot.command("play", ctx => {
  // checks
  if (players.length == 1) {
    ctx.reply(
      "send /me to be the second player \n or \n send /end to end the game"
    );
    return;
  }
  if (players.length >= 2) {
    ctx.reply("2 players already play \n send /end to end the game");
    return;
  }
  // end checks

  ctx.reply("who play against you?");
  const fullName =
    ctx.message.from.first_name + " " + ctx.message.from.last_name;

  let player = new HumanPlayer();
  player.id = ctx.message.from.id;
  player.sign = "X";
  player.name = fullName;

  players.push({
    player
    // id: ctx.message.from.id,
    // sign: "X",
    // name: fullName
  });
});

bot.command("me", ctx => {
  if (players.length == 0) ctx.reply("send /play to start new game");
  if (players.length >= 2) ctx.reply("2 players already play");
  if (players.length != 1) return;
  const fullName =
    ctx.message.from.first_name + " " + ctx.message.from.last_name;

  let player = new HumanPlayer();
  player.id = ctx.message.from.id;
  player.sign = "O";
  player.name = fullName;

  players.push({
    player
    // id: ctx.message.from.id,
    // sign: "O",
    // name: fullName
  });

  const msg =
    STARTTEMPLATE +
    "\n" +
    players[0].name +
    " vs " +
    players[1].name +
    "\n let's the game begin!";
  ctx.reply(msg);
});

bot.command("bot", ctx => {
  if (players.length == 0) ctx.reply("send /play to start new game");
  if (players.length >= 2) ctx.reply("2 players already play");
  if (players.length != 1) return;
  const fullName = "XObot";
  players.push({
    id: 0,
    sign: "O",
    name: fullName
  });
  const msg = players[0].name + " vs " + players[1].name;
  ctx.reply(msg);
  ctx.reply("let's the game begin!");
});

bot.command("end", ctx => {
  ctx.reply("Game Over!");
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
  } else {
    if (turn == 0) turn = 1;
    else turn = 0;
    ctx.reply(players[turn].name + " it's your turn");
  }
}

function createBoard() {
  var print = "";
  for (let i = 0; i < 3; i++) {
    print += "|";
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "X" || board[i][j] == "O")
        print += "  " + board[i][j] + "  |";
      else print += "     |";
    }
    print += "\n ";
  }

  return print;
}

function initVars() {
  board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  players = [];
  turn = 0;
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

bot.catch(err => {
  console.log("Ooops", err);
  ctx.reply("Ooops..");
});

bot.startPolling();
