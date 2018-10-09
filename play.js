// var board;
// const huPlayer = 'X';
// const aiPlayer = 'O';
// const winCombos = [
// 	[1, 2, 3],
// 	[4, 5, 6],
// 	[7, 8, 9],
// 	[1, 4, 7],
// 	[2, 5, 8],
// 	[3, 6, 9],
// 	[1, 5, 9],
// 	[7, 5, 3]
// ]

// // const cells = document.querySelectorAll('.cell');

// // // function turnClick(square) {
// // // 	if (typeof origBoard[square.target.id] == 'number') {
// // // 		turn(square.target.id, huPlayer)
// // // 		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
// // // 	}
// // // }


// // // turn(bestSpot(), aiPlayer);
// // function turn(squareId, player) {
// // 	origBoard[squareId] = player;
// // 	document.getElementById(squareId).innerText = player;
// // 	let gameWon = checkWin(origBoard, player)
// // 	if (gameWon) gameOver(gameWon)
// // }

// // function checkWin(board, player) {
// // 	let plays = board.reduce((a, e, i) =>
// // 		(e === player) ? a.concat(i) : a, []);
// // 	let gameWon = null;
// // 	for (let [index, win] of winCombos.entries()) {
// // 		if (win.every(elem => plays.indexOf(elem) > -1)) {
// // 			gameWon = {index: index, player: player};
// // 			break;
// // 		}
// // 	}
// // 	return gameWon;
// // }

// // function gameOver(gameWon) {
// // 	for (let index of winCombos[gameWon.index]) {
// // 		document.getElementById(index).style.backgroundColor =
// // 			gameWon.player == huPlayer ? "blue" : "red";
// // 	}
// // 	for (var i = 0; i < cells.length; i++) {
// // 		cells[i].removeEventListener('click', turnClick, false);
// // 	}
// // 	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
// // }

// // function declareWinner(who) {
// // 	document.querySelector(".endgame").style.display = "block";
// // 	document.querySelector(".endgame .text").innerText = who;
// // }

// // function emptySquares() {
// // 	return origBoard.filter(s => typeof s == 'number');
// // }


// // // turn(bestSpot(), aiPlayer);
// // function bestSpot() {
// // 	return minimax(board, aiPlayer).index;
// // }

// // function checkTie() {
// // 	if (emptySquares().length == 0) {
// // 		for (var i = 0; i < cells.length; i++) {
// // 			cells[i].style.backgroundColor = "green";
// // 			cells[i].removeEventListener('click', turnClick, false);
// // 		}
// // 		declareWinner("Tie Game!")
// // 		return true;
// // 	}
// // 	return false;
// // }

// // function minimax(newBoard, player) {
// // 	var availSpots = emptySquares();

// // 	if (checkWin(newBoard, huPlayer)) {
// // 		return {score: -10};
// // 	} else if (checkWin(newBoard, aiPlayer)) {
// // 		return {score: 10};
// // 	} else if (availSpots.length === 0) {
// // 		return {score: 0};
// // 	}
// // 	var moves = [];
// // 	for (var i = 0; i < availSpots.length; i++) {
// // 		var move = {};
// // 		move.index = newBoard[availSpots[i]];
// // 		newBoard[availSpots[i]] = player;

// // 		if (player == aiPlayer) {
// // 			var result = minimax(newBoard, huPlayer);
// // 			move.score = result.score;
// // 		} else {
// // 			var result = minimax(newBoard, aiPlayer);
// // 			move.score = result.score;
// // 		}

// // 		newBoard[availSpots[i]] = move.index;

// // 		moves.push(move);
// // 	}

// // 	var bestMove;
// // 	if(player === aiPlayer) {
// // 		var bestScore = -10000;
// // 		for(var i = 0; i < moves.length; i++) {
// // 			if (moves[i].score > bestScore) {
// // 				bestScore = moves[i].score;
// // 				bestMove = i;
// // 			}
// // 		}
// // 	} 
// // 	// else {
// // 	// 	var bestScore = 10000;
// // 	// 	for(var i = 0; i < moves.length; i++) {
// // 	// 		if (moves[i].score < bestScore) {
// // 	// 			bestScore = moves[i].score;
// // 	// 			bestMove = i;
// // 	// 		}
// // 	// 	}
// // 	// }

// // 	return moves[bestMove];
// // }





// // //
// // //

// // //
// // //
// // ///
// // //
// // //
// // //
// // //
// // ///
// // //
// // ///
// // ///
// // ///
// // ///
// // ///
// // ///
// // ///
// // ///
// // ///
// // ///
// // //
// // //
// // //
// // //

// function emptySquares(board) {
// 	var spots = [];
// 	var num = 1;
// 	for (let i = 0; i < 3; i++) {
// 		for (let j = 0; j < 3; j++) {
// 		  if ( board[i][j] == num.toString() ) {
// 			  spots.push(board[i][j]);
// 		  }
// 		  num++;
// 		}
// 	}

// 	return spots;
	
// }

// function minimax(newBoard, player) {
// 	var availSpots = emptySquares(board);

// 	if (checkWin(newBoard)) {
// 		return {score: -10};
// 	} else if (checkWin(newBoard)) {
// 		return {score: 10};
// 	} else if (availSpots.length === 0) {
// 		return {score: 0};
// 	}

// 	var moves = [];
// 	for (var i = 0; i < availSpots.length; i++) {
// 		var move = {};
// 		const spot = parseInt(availSpots[i]);
// 		const row = Math.floor((spot - 1) / 3);
// 		const col = (spot - 1) % 3;
// 		move.index = newBoard[row][col];
// 		newBoard[row][col] = player;

// 		if (player == aiPlayer) {
// 			var result = minimax(newBoard, huPlayer);
// 			move.score = result.score;
// 		} else {
// 			var result = minimax(newBoard, aiPlayer);
// 			move.score = result.score;
// 		}

// 		newBoard[row][col] = move.index;

// 		moves.push(move);
// 	}

// 	var bestMove;
// 	var bestScore = -10000;
// 	for(var i = 0; i < moves.length; i++) {
// 		if (moves[i].score > bestScore) {
// 			bestScore = moves[i].score;
// 			bestMove = i;
// 		}
// 	}

// 	return moves[bestMove];
// }