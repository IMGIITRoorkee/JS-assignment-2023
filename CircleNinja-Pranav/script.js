let start_button = document.getElementsByClassName("start-game")[0];
let how_to_button = document.getElementsByClassName("how-to-play")[0];
let end_button = document.getElementsByClassName("end-game")[0];
var cut_count_check = 0;
end_button.ondragstart = function (){
    return false;
}
start_button.addEventListener("click" , () => {
    start_game();
});

end_button.addEventListener("click" , () => {
    end_game();
})

var score = 0;
var lives_number = 3;
function start_game() {
    let hide_stuff = document.getElementsByClassName("bgs")[0];
    let game_area = document.getElementsByClassName("game-canvas")[0];
    hide_stuff.setAttribute("hidden" , "hidden");
    game_area.removeAttribute("hidden");
    document.body.style.backgroundColor = "white";
        generateCubes();
        setInterval(() => {
            init();
            gameEndCheck();
        } , 1000);
}

function end_game() {
    let hide_stuff = document.getElementsByClassName("bgs")[0];
    let game_area = document.getElementsByClassName("game-canvas")[0];
    hide_stuff.removeAttribute("hidden");
    game_area.setAttribute("hidden" , "hidden");
    location.reload();
}

var count = 0;



function createCube() {
    count++;
    let x = document.createElement("div");
    let game_area = document.getElementsByClassName("game-canvas")[0];
    x.className = `cube-${count} cube`;
    var index = Math.random();
    if(count % 3 == 0){
        x.style.backgroundColor = colors[0];
    }
    else{
        if(count % 2 == 0){
            x.style.backgroundColor = colors[1];
        }
        else{
            x.style.backgroundColor = colors[2];
        }
    }
    let position_left = Math.random() * 1000;
    x.style.setProperty("--my-start-left" , (position_left + "px"));
    x.style.setProperty("--my-middle-left" , (position_left + 200 + "px"));
    x.style.setProperty("--my-end-left" , (position_left + 400 + "px"));
    game_area.appendChild(x);
}
let cube = document.getElementsByClassName("cube");
var cube_generate;
function generateCubes(){
    cube_generate = setInterval(() => {
        createCube();
        destroyCube();
    } , 1000);        
}

getComputedStyle(document.documentElement)
    .getPropertyValue('--my-start-left'); 

let game_area = document.getElementsByClassName("game-area")[0];
let x_initial;
let y_initial;
let x_final;
let y_final;
var cursorX;
var cursorY;
var canvas = document.getElementById("canvas"); //canvas, context, other vars etc
var ctx = canvas.getContext("2d");
var firstClick = [0,0];
var intervalLoop = null;

for(let i = 0; i < cube.length; i ++){
    cube.ondragstart = function () {
        return false;
    }
}

function gameEndCheck(){
    try {
        for(let i = 1; i < count; i ++){
            let indi_cube = document.getElementsByClassName(`cube-${i}`)[0];
            indi_cube.addEventListener("animationend" , () =>{
                if(!indi_cube.classList.contains("cut") && !indi_cube.classList.contains('liveadded')){
                    lives_number -- ;
                    indi_cube.classList.add('liveadded');
                    let lives = document.getElementsByClassName("lives")[0];
                    lives.innerHTML = `Lives Remaining : ${lives_number}`;
                }
            })
        } 
        if(lives_number <= 0){
            game_end = 1;
            let gameEnd = document.getElementsByClassName("game-end")[0];
            gameEnd.removeAttribute("hidden");
            let x = document.getElementsByClassName('final-score')[0];
            x.innerHTML = `Your score was : ${score}`; 
            let gameArea = document.getElementsByClassName("game-canvas")[0];
            gameArea.setAttribute("hidden" , "hidden");
            try{
                clearInterval(cube_generate);
            }
            catch (error){
                console.log(error);
            }
        }
    } catch (error) {
            console.log(error);
    }
}

function init() {
    document.onmousemove = function(e){
        cursorX = e.pageX;
        cursorY = e.pageY;
    };
    let mouseX = 0;
    let mouseY = 0;
let isMouseDown = false;
ctx.clearRect(0, 0, canvas.width, canvas.height);
canvas.addEventListener('mousedown', (event) => {
    cut_count_check++;
  isMouseDown = true;
  mouseX = event.pageX - canvas.offsetLeft;
  mouseY = event.pageY - canvas.offsetTop;
  ctx.beginPath();
  ctx.moveTo(mouseX, mouseY); //go to initial
});
var pathPoints = [];
canvas.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    //current pos
    const currentX = event.pageX - canvas.offsetLeft;
    const currentY = event.pageY - canvas.offsetTop;
    
// control points for curve, took ref from docs + overflow
    const controlX = (currentX + mouseX) / 2;
    const controlY = (currentY + mouseY) / 2;
    ctx.quadraticCurveTo(mouseX, mouseY, controlX, controlY);
    mouseX = currentX;
    mouseY = currentY;
    pathPoints.push({ x: currentX, y: currentY });
    ctx.strokeStyle = "red";
    ctx.stroke();
    scoreUpdater();

  }

});

function calculateBoundingRect(points) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
  
    points.forEach((point) => {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    });
  
    return {
      left: minX,
      top: minY,
      right: maxX,
      bottom: maxY,
    };
  }

canvas.addEventListener('mouseup', () => {
    cut_count_check++;
    
    function checkCollision(rect1, rect2) {
        let temp = rect2.top - rect2.bottom;
        console.log(rect2.top - rect2.bottom);
       if(temp < 0){
        temp *= -1;
       }
        if(temp <= 10){
            if(rect1.top > rect2.bottom){
                return (
                    rect1.left < rect2.right &&
                    rect1.right > rect2.left
                );
            }
            else{
                return false;
            }
            
        }
        else{
            return (
                rect1.left < rect2.right &&
                rect1.right > rect2.left &&
                rect1.top < rect2.bottom &&
                rect1.bottom > rect2.top
              );
        }
        


      }
    
    for(let i = 1; i < count; i ++){
        let indi_cube = document.getElementsByClassName(`cube-${i}`)[0];
        const pathRect = calculateBoundingRect(pathPoints);
        if(checkCollision(indi_cube.getBoundingClientRect() , pathRect)){
            indi_cube.classList.add("cut");
            indi_cube.style.backgroundColor = 'red';
        };
    }
    cut_count_check = 0;
    isMouseDown = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear path
    pathPoints.length = 0;
});
}
let num = Math.random() * 4;
var game_end = 0;

function startDragLine(e) {
    firstClick = [e.pageX, e.pageY];
    let audio = new Audio("./assets/sword.mp3");
    audio.play();
    intervalLoop = setInterval(function(){
        let audio = new Audio("./assets/sword.mp3");
    audio.play();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(firstClick[0], firstClick[1]);
        ctx.quadraticCurveTo(cursorX, cursorY, cursorX - 60 , cursorY - 60);
        ctx.strokeStyle = "red";
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    },10);
    
}
var count1 = 0;

function stopDragLine(){
    count1++;
    clearInterval(intervalLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scoreUpdater();
    for(let i = count1; i < count1 + 1; i ++){       
        let x1 = firstClick[0];
        let x2 = cursorX;
        let y1 = firstClick[1];
        let y2 = cursorY;
        var m = (y2 - y1)/(x2 - x1);
        var c = (y1 - x1)*m;
        let indi_cube = document.getElementsByClassName(`cube-${i}`)[0];
        let rect = indi_cube.getBoundingClientRect();
    }         
}
// }
// Use the e.screenX and e.screenY to automatically trigger the mouseup event (i.e fire that corresponding fn.. otherwise leads to bugs)

function destroyCube(){
    for(let i = 1; i < count; i ++){
        let indi_cube = document.getElementsByClassName(`cube-${i}`)[0];
        indi_cube.addEventListener("animationend" , () => {
            indi_cube.style.display = "none";
        })

    }
}


var count_instructions = 0;

document.body.style.backgroundColor = "#FFF8D6";

let instrutions = document.getElementsByClassName("button_i")[0];
instrutions.addEventListener("click" , () => {
    count_instructions++;
    let x = document.getElementsByClassName("instructions")[0];
    if(count_instructions % 2 != 0){
        x.removeAttribute("hidden");
    }
    else{
        x.setAttribute("hidden" , "hidden");
    }
})


let x = document.getElementsByClassName("home")[0];
x.addEventListener("click" , () => {
    location.reload();
})

function destoryCubeRemove(){
    console.log(cube);
    for(let i = 0; i < cube.length; i ++){
        let x = document.getElementsByClassName(`cube`)[i];
        try {
            x.remove();
        } catch (error) {
            x.classList.remove(`cube cube-${i}`)
            console.log("Cube was already removed!");
        }
    }
    // cube[0].remove();
    // cube[0].remove();
    try {
        cube[0].remove();
        cube[0].remove();
    } catch (error) {
        console.log(error);
    }
}
let start_game_again = document.getElementsByClassName("start-game-again")[0];
start_game_again.addEventListener("click" , () => {
    try{    
        
        let score = document.getElementsByClassName('score')[0];
        score.innerHTML = `Score : 0`;
        destoryCubeRemove();
        count = 0;
        count1 = 0;
        score = 0;
        lives_number = 3;
        let lives = document.getElementsByClassName('lives')[0];
        lives.innerHTML = `Lives Remaining : ${lives_number}`;
        stopDragLine();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        start_game();
    }
    catch(e){
        score = 0;
        lives_number = 3;
        let lives = document.getElementsByClassName('lives')[0];
        lives.innerHTML = `Lives Remaining : ${lives_number}`;
        let score_text = document.getElementsByClassName('score')[0];
        score_text.innerHTML = `Score : 0`;
        destoryCubeRemove();
        count = 0;
        count1 = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            start_game();
        } , 10);   
    }
})
// Write a better collision check for the ball and the cut.. the present one is not working perfectly every time
function scoreUpdater(){
    for(let i = 1; i < count; i ++){
        let indi_cube = document.getElementsByClassName(`cube-${i}`)[0];
        if(indi_cube.classList.contains('cut') && !indi_cube.classList.contains('sadded')){
            score++;
            indi_cube.classList.add('sadded');
            console.log("The score is : " + score);
            let x = document.getElementsByClassName("score")[0];
            x.innerText = `Score : ${score}`;
        }

    }
}
var colors = ["#2ECC71" , "#FBFCFC" , "#2E86C1"];
