var turn = 0;
var movesPlayed = [];
var win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function draw(item){
	// var game= document.getElementById("board");
	var move = item.id[item.id.length-1];
	canvas=item.getContext("2d");
	if(movesPlayed[move]==null && turn<9){
		if(turn%2===0){
			canvas.beginPath();
			canvas.moveTo(10,10);
			canvas.lineTo(90,90);
			canvas.moveTo(90,10);
			canvas.lineTo(10,90);
			canvas.stroke();
			canvas.closePath();
			movesPlayed[move]="X";

		}
		else{
			canvas.beginPath();
			canvas.arc(50,50,44,0,Math.PI*2,true);
			canvas.stroke();
			canvas.closePath();
			movesPlayed[move]="O";
		}

		winner(movesPlayed[move]);
		turn++;
		if(turn==9){
			alert("draw");
			setTimeout(window.location.reload.bind(window.location),3000);
		}
		
	}
}

function winner(player){
	for(var i=0;i<win.length;i++){
		if(movesPlayed[win[i][0]]==player && movesPlayed[win[i][0]]==player && movesPlayed[win[i][1]]==player && movesPlayed[win[i][2]]==player){
			turn = 999;
			alert(player+" won");
			setTimeout(window.location.reload.bind(window.location),3000);
		}
	}
}
