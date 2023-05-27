let start_button = document.getElementsByClassName("start-game")[0];
let how_to_button = document.getElementsByClassName("how-to-play")[0];
let end_button = document.getElementsByClassName("end-game")[0];
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

function start_game() {
    let hide_stuff = document.getElementsByClassName("bgs")[0];
    let game_area = document.getElementsByClassName("game-canvas")[0];
    hide_stuff.setAttribute("hidden" , "hidden");
    game_area.removeAttribute("hidden");
    document.body.style.backgroundColor = "white";
        generateCubes();
        setInterval(() => {
            // for(let i = 0; i < cube.length; i ++){
            //     cube[i].addEventListener("mouseover" , () => {
            //         cube[i].setAttribute("hidden" , "hidden");
            //     })
            // }
            init();
            setTimeout(() => {
                gameEndCheck();
            } , 3000);
        } , 2000);

    
        
 
    // This works but as a mouse over event!
    // Logic is that if the line's perpendicular distance frm the centrer is < a/rt2, its a cut.
   
   
  

   
}



// var time = 10;

// function timerEndGame(){
//     let x = document.getElementsByClassName("redirect-text")[0];
//     const time_inti = setInterval(() => {
//         time -= 1;
//         x.innerHTML = `Youll be redirected to the home screen after ${time} secs`;
//     }, 1000);
//     if(time <= 0){
//         clearInterval(time_inti);
//         location.reload();
//     }
// }

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
    // console.log("Count is: " + count);
    let x = document.createElement("div");
    let game_area = document.getElementsByClassName("game-canvas")[0];
    x.className = `cube-${count} cube`;
   
    let position_left = Math.random() * 1000;
    x.style.setProperty("--my-start-left" , (position_left + "px"));
    x.style.setProperty("--my-middle-left" , (position_left + 200 + "px"));
    x.style.setProperty("--my-end-left" , (position_left + 400 + "px"));
    
    game_area.appendChild(x);
}

// function cubeHider(){
//     for(let i = 1; i < count; i ++){
//         let indi_cube = document.getElementsByClassName(`cube-${i}`)[0];
//         console.log(indi_cube.offsetTop);
//         if(indi_cube.offsetTop >= 550){
//             indi_cube.style.display = "none";
//         }
//         else{
//             indi_cube.style.display = "block";
//         }
//     }
// }
let cube = document.getElementsByClassName("cube");

function generateCubes(){
    
    
        setInterval(() => {
            createCube();
            destroyCube();
            // cubeHider();
            // gameEndCheck();
        } , 1000);
        
}


getComputedStyle(document.documentElement)
    .getPropertyValue('--my-start-left'); // returns val




let game_area = document.getElementsByClassName("game-area")[0];
let x_initial;
let y_initial;
let x_final;
let y_final;
// game_area.addEventListener("mousedown" , (e) => {
//     console.log(e);
//     x_initial = e.screenX;
//     y_initial = e.screenY;
//     console.log(x_initial);
// })

// game_area.addEventListener("mouseup" , (e) => {
//     console.log("Final" + e);
//     x_final = e.screenX;
//     y_final = e.screenY;
// })


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



function init() {
    document.onmousemove = function(e){
        cursorX = e.pageX;
        cursorY = e.pageY;
    };
    // console.log("X is " + cursorX);
    // console.log("Y is : " + cursorY);
    // if(cursorY < 60){
    //     stopDragLine();
    // }
    // else if(cursorX > 800){
    //     stopDragLine();
    // }
    canvas.addEventListener('mousedown', startDragLine, false);
    canvas.addEventListener('mouseup', stopDragLine, false);
   
}

let num = Math.random() * 4;
var game_end = 0;
// function gameEndCheck() {
//     for(let i = 0; i < count1; i ++){
//         if(!cube[i].classList.contains("cut")){
//             game_end = 1;
//             // alert("Game finished");
//             let gameEnd = document.getElementsByClassName("game-end")[0];
//             gameEnd.removeAttribute("hidden");
//             let gameArea = document.getElementsByClassName("game-canvas")[0];
//             gameArea.setAttribute("hidden" , "hidden");
//         }
//     }
    
// }

function gameEndCheck(){
    for(let i = 1; i < count; i ++){
        let indi_cube = document.getElementsByClassName(`cube-${i}`)[0];
        indi_cube.addEventListener("animationend" , () =>{
            if(!indi_cube.classList.contains("cut")){
                game_end = 1;
                // alert("Game finished");
                let gameEnd = document.getElementsByClassName("game-end")[0];
                gameEnd.removeAttribute("hidden");
                let gameArea = document.getElementsByClassName("game-canvas")[0];
                gameArea.setAttribute("hidden" , "hidden");
            }
        })
        

    }
}




function startDragLine(e) {
    firstClick = [e.pageX, e.pageY];
    //start the loop
    intervalLoop = setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(firstClick[0], firstClick[1]);
        ctx.quadraticCurveTo(cursorX, cursorY, cursorX - 60 , cursorY - 60);
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    },10);
    let audio = new Audio("./assets/sword.mp3");
    audio.play();
}
var count1 = 0;
function stopDragLine(){
    count1++;
    clearInterval(intervalLoop);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // console.log(`X intiail is : ${firstClick[0]} and the final x is ${cursorX}`);
    // This is problematic smwhere
    for(let i = count1; i < count1 + 1; i ++){
        
        //(y1-x1)*slope = intercept
       
        let x1 = firstClick[0];
        let x2 = cursorX;
        let y1 = firstClick[1];
        let y2 = cursorY;
        var m = (y2 - y1)/(x2 - x1);
        var c = (y1 - x1)*m;
        let indi_cube = document.getElementsByClassName(`cube-${i}`)[0];
        let rect = indi_cube.getBoundingClientRect();

        // console.log(rect.top);
        var cx = rect.left + 32;
        var cy = rect.top + 32;
        var r = 80;
        // let y = m*x + c;
        //mx0-y0+c/rt(m^2+1)
        function lineCheck(x,y,r){
            let distance = (m*x-y+c)/Math.sqrt(m*m + 1);
            console.log(`Distance is : ${distance}`);
            console.log(`Radius is ${r}`);
            if(Math.abs(distance) <= 1.7*r){
                indi_cube.classList.add("cut");
                score++;
                let y = document.getElementsByClassName("final-score")[0];
                y.ondragstart = function () {
                    return false;
                }
                y.innerHTML = `Your score was ${score}`;
                let x = document.getElementsByClassName("score")[0];
                x.innerHTML = `Score : ${score}`;
            }
        }
        
        // lineCheck(cx,cy,r);
        
       
}



function betterCollisionCheck(){
    for(let i = 1; i < count; i ++){
        let indi_cube = document.getElementsByClassName(`cube-${i}`)[0];
        if((firstClick[1] < indi_cube.offsetTop) && (indi_cube.offsetTop < cursorY) && (firstClick[0] < indi_cube.offsetLeft ) && (indi_cube.offsetLeft < cursorX)){
            console.log("HIT");
            indi_cube.classList.add("cut");
            score+= 1;
            let y = document.getElementsByClassName("final-score")[0];
            y.ondragstart = function () {
                return false;
            }
            y.innerHTML = `Your score was ${score}`;
            let x = document.getElementsByClassName("score")[0];
            x.innerHTML = `Score : ${score}`;
        }


    }
    
}


setInterval(() => {
    try {
        betterCollisionCheck();
    } catch (error) {
        console.log(error);
    }
} , 1);


// Use the e.screenX and e.screenY to automatically trigger the mouseup event (i.e fire that corresponding fn.. otherwise leads to bugs)




}

function destroyCube(){
    for(let i = 1; i < count; i ++){
    //    let x = document.getElementsByClassName(`cube-${i}`);
    //    try {
    //     console.log(x);
    //     x[0].addEventListener("animationend" , () => {
    //      x[0].classList.add = "dead";
    //         x[0].remove();
    //     })
    //    } catch (error) {
    //     console.log("That cube was dead");
    //    }
        // cube[i].addEventListener("animationend" , () => {
        //     cube[i].remove();
        //     console.log("Animation end for cube " + i);
        // })
        // console.log(cube);
        let indi_cube = document.getElementsByClassName(`cube-${i}`)[0];
        indi_cube.addEventListener("animationend" , () => {
            indi_cube.style.display = "none";
        })
        // console.log(indi_cube);

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

let start_game_again = document.getElementsByClassName("start-game-again")[0];
start_game_again.addEventListener("click" , () => {
    start_game();
    try{    
        destroyCube();
        // let x = document.getElementsByClassName("game-end")[0];
        // x.setAttribute("hidden" , "hidden");
        // let y = document.getElementsByClassName("game-canvas")[0];
        // y.removeAttribute("hidden");
        // destroyCube();
        // start_game();
        destroyCube();
        stopDragLine();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       setTimeout(() => {
        start_game();
       } , 3000);
    }
    catch(e){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            start_game();
        } , 2000);
        
    }
    


})