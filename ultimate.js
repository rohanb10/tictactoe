var turns = 0;
var previous="none";
var movesPlayed = [
{board: "1", moves: [], winner: "", numMoves: 0},
{board: "2", moves: [], winner: "", numMoves: 0},
{board: "3", moves: [], winner: "", numMoves: 0},
{board: "4", moves: [], winner: "", numMoves: 0},
{board: "5", moves: [], winner: "", numMoves: 0},
{board: "6", moves: [], winner: "", numMoves: 0},
{board: "7", moves: [], winner: "", numMoves: 0},
{board: "8", moves: [], winner: "", numMoves: 0},
{board: "9", moves: [], winner: "", numMoves: 0},
];
var win = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var completed = [];

var gameOver=false;

$(".tile").click(function(event) {
	var tileClicked = $(this).data('tile');
	var boardClicked = $(this).data('board');

	var currentBoard = $.grep(movesPlayed, function(e){ 
		return e.board == boardClicked; 
	})[0];
	var color = ($(this).css('background-color')).toString();
	//second condition is to ensure correct board is selected
	if($(this).text()=="" && (color=='rgb(204, 204, 204)' || turns==0) && !gameOver){
		previous = tileClicked;
		var player = newTurn();
		$(this).text(player);
		currentBoard.moves[tileClicked] = player;
		currentBoard.numMoves++;
		if(checkSmall(currentBoard.board,currentBoard.moves,player)){
			currentBoard.winner = player;
			$(".board"+currentBoard.board).empty();
			$(".board"+currentBoard.board).append("<span>&nbsp;"+player.toUpperCase()+"&nbsp;</span>");
		}
		if(currentBoard.numMoves>=9 && currentBoard.winner==""){
			currentBoard.winner="tie"
			completed[currentBoard.board]="tie";
		}
		colour(tileClicked);
	}
});

function checkSmall(index, board, player){
	for(var i=0;i<win.length;i++){
		if(board[win[i][0]]==player && board[win[i][1]]==player && board[win[i][2]]==player){
			completed[index]=player;
			if(checkBig(player)){
				$(".message").empty();
				$(".message").append('Player '+player.toUpperCase()+' wins!');
			}
			return true;
		}
	}
}

function checkBig(player){
	for(var i=0;i<win.length;i++){
		if(completed[win[i][0]]==player && completed[win[i][1]]==player && completed[win[i][2]]==player){
			gameOver = true;
			return true;
		}
	}
}

function colour(tile){
	if(gameOver){
		$(".tile").each(function(index, el) {
			$(this).css('background-color', '#FFFFFF');
		});
	}
	else if(completed[tile]==null){
		$(".tile").each(function(index, el) {
			if($(this).data('board')==tile){
				$(this).css('background-color', '#CCCCCC');
			}
			else{
				$(this).css('background-color', '#FFFFFF');
			}
		});
	}
	else{
		$(".tile").each(function(index, el) {
			if(completed[$(this).data('board')]==null){
				$(this).css('background-color', '#CCCCCC');
			}
			else{
				$(this).css('background-color', '#FFFFFF');
			}
		});
	}
}

function newTurn(){
	turns++;
	if(turns%2==1){
		$("#p-symbol").text("o");
		return "x";
	}
	else{
		$("#p-symbol").text("x");
		return "o";
	}
}

$(window).bind('beforeunload', function(){
	if(turns>0 && !gameOver){
		return 'There is a game in progress.';
	}
});