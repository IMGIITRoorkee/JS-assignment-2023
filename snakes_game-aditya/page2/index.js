const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

let play_again_btn = document.getElementById("after-death");

class snakePart{
    constructor (x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let velocityX = 0;false
let velocityY = 0;

//making the game for a square canvas right now
let canvasSize = canvas.width;
let tileCount = 20;
let tileSize = canvasSize/tileCount;
let blockSize = tileSize - 2;

//initial variables of the snake 
let headX = tileCount/2;
let headY = tileCount/2;
let appleX = Math.floor((Math.random())*tileCount);
let appleY = Math.floor((Math.random())*tileCount);
const snakeParts = [];
let snakeLength = 2;
let score = 0;

//game loop
let mainGameIntervalId = setInterval(() => {
    drawGame();
}, 1000/speed);

function drawGame(){
    clearScreen();
    drawSnake();
    drawInfo();
    moveSnake();
    drawApple();
    if((wallTouch() || selfCrash()) && !(velocityX == 0 && velocityY == 0)){
        gameOver();    
    }
   
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
    
    ctx.fillStyle = "green";
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x*tileSize, part.y*tileSize, blockSize, blockSize)
    }
    
    snakeParts.push(new snakePart(headX, headY));
    while (snakeParts.length > snakeLength){
        snakeParts.shift();
    }
    
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX*(tileSize), headY*(tileSize), blockSize, blockSize);
}

function drawApple(){
    ctx.fillStyle = "red";
    if (appleX == headX && appleY == headY){
        appleX = Math.floor((Math.random())*tileCount);
        appleY = Math.floor((Math.random())*tileCount);
        snakeLength ++;
        score ++;
    }
    let flag = false;
    while(!flag){
        let flagEach = true;
        for(let snakePart in snakeParts){
            if(snakePart.x == appleX && snakePart.y == appleY){
                flagEach = false;
            }
        }
        if(flagEach == false){
            appleX = Math.floor((Math.random())*tileCount);
            appleY = Math.floor((Math.random())*tileCount);
        }else{
            ctx.fillRect(appleX*(tileSize), appleY*(tileSize), blockSize, blockSize);
            flag = true;
        }
    }
}
function drawInfo(){
    ctx.fillStyle = "white";
    ctx.font = "30px Arial"
    ctx.fillText("Score: " + score, (tileCount -3)*tileSize, 50, 100);
    // ctx.fillText("headX: " + headX, (tileCount -3)*tileSize, 20, 100);
    // ctx.fillText("headY: " + headY, (tileCount -3)*tileSize, 30, 100);
    // ctx.fillText("velocityX:  " +  velocityX, (tileCount -3)*tileSize, 40, 100);
    // ctx.fillText("velocityY:  " +  velocityY, (tileCount -3)*tileSize, 50, 100);
    // ctx.fillText("appleX: " + appleX, (tileCount -3)*tileSize, 60, 100);
    // ctx.fillText("appleY: " + appleY, (tileCount -3)*tileSize, 70, 100);
    // ctx.fillText("snakeLength: " + snakeLength, (tileCount -3)*tileSize, 80, 100);
}

document.addEventListener("keydown", keyDown);
let valid_keydown = false;

function keyDown(event){
    //left arrow
    if (event.keyCode == 37){
        if(velocityX == 1){
            return;
        }

        velocityX = -1;
        velocityY = 0;
        valid_keydown = true
    }

     //up arrow
     if (event.keyCode == 38){
        if(velocityY == 1){
            return;
        }
        velocityX = 0;
        velocityY = -1;
        valid_keydown = true

    }

    //right arrow
    if (event.keyCode == 39){
        if(velocityX == -1){
            return;
        }
        velocityX = 1;
        velocityY = 0;
        valid_keydown = true

    }
    
    //down arrow
    if (event.keyCode == 40){
        if(velocityY == -1){
            return;
        }
        velocityX = 0;
        velocityY = 1;
        valid_keydown = true

    }

}

function moveSnake() {
    headX += velocityX;
    headY += velocityY;
}

function wallTouch(){
    if((headX == -1)|| (headX == (tileCount)) || (headY == -1 ) || (headY == (tileCount))){
        return true;
    }
}
function selfCrash(){
    for (part of snakeParts){
        if (headX == part.x && headY == part.y){
            return true;
        }
    }
}

play_again_btn.addEventListener("click", () => {
    location.reload();
} )

document.addEventListener("keydown", (event) => {
    if(event.keyCode == 13 && (wallTouch() || selfCrash()) && !(velocityX == 0 && velocityY == 0)){
        location.reload();
    }
})


function gameOver(){
    clearInterval(mainGameIntervalId);
    ctx.fillStyle = " white"
    ctx.font = "100px Arial"
    ctx.fillText("Game over!!", canvas.width*(0.2), tileCount*tileSize/2);
    play_again_btn.style.display = "block";

}

drawGame();