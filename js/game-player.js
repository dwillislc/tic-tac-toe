/*************************************
Game Class 
*************************************/

//Possible ways to win 
const possInRow = [
[1, 2, 3], [4, 5, 6], [7, 8, 9], 
[1, 4, 7], [2, 5, 8], [3, 6, 9], 
[1, 5, 9], [3, 5, 7]
];


function Game() {
	this.hello = function () { console.log("hello")}; 
	this.playerNameO; 
	this.playerNameX; 
	this.playerXFilled = []; 
	this.playerOFilled = []; 
	this.activeTurn = "playerO"; 
	this.computerPlayer = 'playerX'; 
}

//FIXED: Change to use playerXFilled and playerOFilled
Game.prototype.get_available_moves = function () {	
	let available_moves = []; 
	let taken_moves = this.playerOFilled.concat(this.playerXFilled);
	for (let i = 1; i < 10; i++) {
		if(!taken_moves.includes(i)) {
			available_moves.push(i); 
		}
	}
	return available_moves;  
}

//Helper function for the prototype function 
function check_win(player) {
let win = false; 	 
	possInRow.forEach(row => {
		let threeInRow = 0; 
		
		row.forEach(box => {
			if (player.includes(box)) {
				threeInRow += 1; 
			}
		});
		
		if (threeInRow === 3) {
			win = true; 
		}
	});

	return win;	
}

//FIXED:May have to change this to using playerX and playerO filled
Game.prototype.win = function() {
	//Get clicked boxes for  
	let player_clicked; 
	let opponent_clicked;

	if (this.computerPlayer === "playerO") {
		player_clicked = this.playerOFilled; 
		opponent_clicked = this.playerXFilled;
	} else {
		player_clicked = this.playerXFilled;
		opponent_clicked = this.playerOFilled; 
	}

	if (check_win(player_clicked)) {
		return "player";
	} else if (check_win(opponent_clicked)) {
		return "opponent";
	} else { 
		return false; 
	}
} 

Game.prototype.over = function () {
	let moves = this.get_available_moves; 
	if (moves.length === 0) {
		return true; 
	} else {
		return false; 
	}
}

function deepCopy(oldObj) {
    var newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
        newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
        for (var i in oldObj) {
            newObj[i] = deepCopy(oldObj[i]);
        }
    }
    return newObj;
}

//new state needs to update the board without udating the board 
Game.prototype.get_new_state = function (move) {
	// Copy an object let newObj = JSON.parse(JSON.stringify(obj));
	let newState = deepCopy(this);  

	if (newState.activeTurn === "playerO") {
		newState.playerOFilled.push(move); 
		newState.activeTurn = "playerX";
	} else {
		newState.playerXFilled.push(move); 
		newState.activeTurn = "playerO";
	}
	return newState 
}


/*************************************
Your imaginary friend 
*************************************/

function Harvey() {
	this.choice; 
}


/*************************************
Minimax Algo 
*************************************/

function score(game) {
	if (game.win() === "player") {
		return 10; 
	} else if (game.win() === "opponent") {
		return  -10; 
	} else {
		return 0; 
	}
}

function minimax(game) {
	if (game.over()) {
		return score(game); 
	}
	scores = []; 
	moves = []; 

	//Populate the scores array, recursing as needed 
	let poss_moves = game.get_available_moves(); 
	poss_moves.forEach(move => {
		let poss_game = game.get_new_state(move);
		scores.push(minimax(poss_game))
		moves.push(move); 
	})

	//Do min or max calculation 
	if (game.activeTurn === game.computerPlayer) {
		let maxScore = Math.max(...scores); 
		let maxScoreIndex = scores.indexOf(maxScore); 
		harvey.choice = moves[maxScoreIndex]; 
		return scores[max_score_index];
	} else {
		let minScore = Math.max(...scores); 
		let minScoreIndex = scores.indexOf(maxScore);
		harvey.choice = moves[minScoreIndex]; 
		return scores[min_score_index];
	}

}


/*
def minimax(game)
    return score(game) if game.over?
    scores = [] # an array of scores
    moves = []  # an array of moves

    # Populate the scores array, recursing as needed
    game.get_available_moves.each do |move|
        possible_game = game.get_new_state(move)
        scores.push minimax(possible_game)
        moves.push move
    end

    # Do the min or the max calculation
    if game.active_turn == @player
        # This is the max calculation
        max_score_index = scores.each_with_index.max[1]
        @choice = moves[max_score_index]
        return scores[max_score_index]
    else
        # This is the min calculation
        min_score_index = scores.each_with_index.min[1]
        @choice = moves[min_score_index]
        return scores[min_score_index]
    end
end
*/