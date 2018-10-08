class HumanPlayer {
  constructor() {
    this.id = "400";
    this.sign = "e";
    this.name = "err";
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
}

module.exports = HumanPlayer;
