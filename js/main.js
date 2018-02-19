const $gameScreen = $('.board');
const $startScreen = $('.screen-start');
const $playerO = $('#player1'); 
const $playerX = $('#player2'); 
const newGame = new Game(); 
const harvey = new Harvey(); 


/*************************************
Check if there's three in a row 
*************************************/

//Possible ways to win 
const inRow = [
[1, 2, 3], [4, 5, 6], [7, 8, 9], 
[1, 4, 7], [2, 5, 8], [3, 6, 9], 
[1, 5, 9], [3, 5, 7]
];

//Check a possible row to see if a player has three in a row
let threeInRow = false;

function check_row(row, filled) {
	let numInRow = 0; 
	row.forEach(digit => {
		if ($('#' + digit.toString()).hasClass(filled)) {
			numInRow += 1; 
		}
	});
	if (numInRow === 3) {
		threeInRow = true; 
	}  
}

function in_a_row(value, filled) {	 
	let possible_rows = inRow.filter(row => row.includes(parseInt(value, 10))); 
	possible_rows.forEach(row => check_row(row, filled));

	return threeInRow; 
}

function display_win_screen (player) {
	$gameScreen.hide();

	if (player === 1) {
		$('.message').text('Winner');
		$('.screen-win').addClass('screen-win-one').show();
					
	} else if (player === 2) {
		$('.screen-win').addClass('screen-win-two').show();
		$('.message').text('Winner');
	} else {
		$('.screen-win').addClass('screen-win-tie').show();
		$('.message').text("It's a tie!");
	}
	
}

function checkDraw () {
	let boxes = $('.box').toArray(); 
	let numFilled = boxes.filter(box => box.classList.contains('box-filled-1') || box.classList.contains('box-filled-2')); 
	if (numFilled.length === 8) {
		display_win_screen('draw'); 
	}
}

/*************************************
Display start and game screen
*************************************/

//Add start and win screen html to index.html 
$('body').append("<div class='screen screen-start' id='start'><header>" + 
	"<h1>Tic Tac Toe</h1>" +
	"<a href='#'' class='button' id='startGame'>Start game</a></header></div>"
);

$('body').append("<div class='screen screen-win' id='finish'><header>"  + 
	"<h1>Tic Tac Toe</h1><p class='message'></p>" + 
	"<a href='#' class='button' id='newGame'>New game</a></header></div>"); 

//Display the start screen and hide game screen on page load
$(function () {
	$gameScreen.hide(); 
	$('.screen-win').hide(); 
})

//Display gameScreen and start the game on button click 

$('#startGame').on('click', function () {
	$('#startGame').hide();
	let nameO = prompt("Please enter the name for player O");
	let nameX = prompt("Please enter the name for player X");
	$("#playerNameO").append(nameO);
	$("#playerNameX").append(nameX);
	$('.screen-start').hide(); 
	$('.board').show(); 
	$playerO.addClass('active'); 
}); 

//Assign names to players
$('gameScreen')

$('#harveyGame').on('click', function () {
	let name = prompt("Please enter your name");
});

//When player mouses over show O or X in the box
$('.box').on('mouseover', function () {
	if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
		if ($playerO.hasClass('active')) {
			$(this).css("background-image", "url(img/o.svg)");
		} else {
			$(this).css("background-image", "url(img/x.svg)");
		}
	}
})

//When player mouses out don't show O or X in box 
$('.box').on('mouseleave', function () {
	if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
		$(this).css("background-image", "none"); 
	}
})

//Add X/O when player clicks on box that hasn't been clicked yet 
$('.box').on('click', function () {
	//Check if draw 
	checkDraw(); 

	if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
		if ($playerO.hasClass('active')) {
			$(this).addClass('box-filled-1');
			$(this).css("background-image", "url(img/o.svg)");
			$playerO.removeClass('active'); 
			$playerX.addClass('active');

			let checkStatus = in_a_row($(this).val(), 'box-filled-1');
			if (checkStatus) {
				display_win_screen(1);
			} 

		} else {
			$(this).addClass('box-filled-2');
			$(this).css("background-image", "url(img/x.svg)");
			$playerX.removeClass('active');
			$playerO.addClass('active');

			let checkStatus = in_a_row($(this).val(), 'box-filled-2');
			if (checkStatus) {
				display_win_screen(2); 
			}
		}
	}
});

//Start new game 
$('#newGame').on('click', function () {
	let boxes = $('.box').toArray(); 
	boxes.forEach(box => {
		if (box.classList.contains('box-filled-1')){
			box.classList.remove('box-filled-1');
			box.style.backgroundImage = "none"; 
		}
		if (box.classList.contains('box-filled-2')) {
			box.classList.remove('box-filled-2');
			box.style.backgroundImage = "none"; 
		}
	});
	
	if ($('.screen-win').hasClass('screen-win-one')) {
		$('.screen-win').removeClass('screen-win-one');
	} else if ($('.screen-win').hasClass('screen-win-two')) {
		$('.screen-win').removeClass('screen-win-two');
	} else {
		$('.screen-win').removeClass('screen-win-tie');
	}

	$('.screen-win').hide(); 
	$gameScreen.show(); 
	$playerX.removeClass('active'); 
	$playerO.addClass('active'); 
	threeInRow = false; 
});






