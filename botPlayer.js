class BotPlayer {
  constructor() {
    this.id = "00";
    this.sign = "O";
    this.name = "botPlayer";
  }
  set id(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }

  set sign(sign) {
    this._sign = sign;
  }
  get sign() {
    return this._sign;
  }

  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }

  play() {
    // ctx.reply("2");
    return "2";
  }
}

module.exports = BotPlayer;
