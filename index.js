"use strict";

const playerRed = "R";
const playerYellow = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;
let currColumns;

var rows = 6;
var colums = 7;

window.onload = function(){
    setGame();
}
function setGame() {
    board = [];
    
    currColumns = [5,5,5,5,5,5,5];
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < colums; c++) {
        row.push(' ');
           //HTML
        //     <div id="0-0" class="tile"></div>
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add('tile');
        tile.addEventListener("click", setPiece);
        document.getElementById("board").append(tile);
            
        }
        
    board.push(row);
        
    }

}


function setPiece() {
  
  if(gameOver){
        return;
    } 
     let coords = this.id.split("-"); //"0-0" -> 
    
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    r = currColumns[c]; 
    if(r < 0){
        return;
    }
   board[r][c] = currPlayer; 
    let tile =  document.getElementById(r.toString() + "-" + c.toString()); 
    if(currPlayer == playerRed){
        tile.classList.add("red_piece");
        currPlayer = playerYellow;
    }
    else{
        tile.classList.add("yellow_piece");
        currPlayer = playerRed;
    }
    r -=1;//updating de row height for the colum
    currColumns[c] = r; //update the array
    checkWinner();
}
function checkWinner() {
    //horizontaly
    for (let r = 0; r < rows; r++) {
      
        for (let c = 0; c < colums-3; c++) {
            if(board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1] ==board[r][c+2] && board[r][c+2]==board[r][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }}
        //vertically
        for (let c = 0; r < colums; c++) {
      
            for (let r = 0; c < rows-3; r++) {
                if(board[r][c] != ' '){
                    if(board[r][c] == board[r+1][c] && board[r+1][c] ==board[r+2][c] && board[r+2][c]==board[r+3][c]){
                        setWinner(r, c);
                        return;
                    }
                }
            }}

}

function setWinner() {
    let winner = document.getElementById("winner");
    if(board[r][c] == playerRed){
        winner.innerText = "Red wins";
    }
    else{
        winner.innerText = "Yellow wins";
    }
    gameOver = true;
}