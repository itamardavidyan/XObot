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

  play(board) {
    return minimax(board, 'O');
  }
}

function emptySquares(board) {
	var spots = [];
	var num = 1;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
		  if ( board[i][j] == num.toString() ) {
			  spots.push(board[i][j]);
		  }
		  num++;
		}
	}

	return spots;
	
}

function minimax(newBoard, player) {
  const huPlayer = 'X';
  const aiPlayer = 'O';
	var availSpots = emptySquares(newBoard);

	if (checkWin(newBoard)) {
		return {score: -10};
	} else if (checkWin(newBoard)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}

	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		const spot = parseInt(availSpots[i]);
		const row = Math.floor((spot - 1) / 3);
		const col = (spot - 1) % 3;
		move.index = newBoard[row][col];
		newBoard[row][col] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[row][col] = move.index;

		moves.push(move);
	}

	var bestMove;
	var bestScore = -10000;
	for(var i = 0; i < moves.length; i++) {
		if (moves[i].score > bestScore) {
			bestScore = moves[i].score;
			bestMove = i;
		}
	}

	return moves[bestMove];
}

module.exports = BotPlayer;
