//latest
let dirn = {
  x: 0,
  y: 0,
};

//so that snake ki initial posn fixed
const foodSound = new Audio("./assets/food.mp3");
const gameOversound = new Audio("./assets/gameover.mp3");
const moveSound = new Audio("./assets/move.mp3");
let board = document.querySelector(".board");
let over = document.querySelector(".Gameover");
let restart = document.querySelector(".restart");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let scoree = document.querySelector(".score");
let highscr = document.querySelector(".highscore");
let counter = 0;
//snake,fooditem our objects
let snakeobj = [{ x: 11, y: 13 }];
let fooditem = {
  x: 4,
  y: 7,
};

//game
function endgame() {
  let Highscore = localStorage.getItem("Highscore");
  if (Highscore === null) {
    Highscoreval = 0;
    localStorage.setItem("Highscore", JSON.stringify(Highscoreval));
  } else {
    Highscoreval = JSON.parse(Highscore);
    highscr.innerHTML = "HighScore: " + Highscore;
  }

  window.requestAnimationFrame(main);

  //moving the head and snake
  window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      moveSound.play();

      dirn = { x: 0, y: -1 };
    }

    if (e.key == "ArrowUp" && dirn.y != 1) {
      moveSound.play();

      dirn.x = 0;
      dirn.y = -1;
      return;
    } else if (e.key == "ArrowDown" && dirn.y != -1) {
      moveSound.play();

      console.log("down");
      dirn.x = 0;
      dirn.y = 1;
      return;
    } else if (e.key == "ArrowRight" && dirn.x != -1) {
      moveSound.play();
      console.log("down");
      dirn.x = 1;
      dirn.y = 0;
      return;
    } else if (e.key == "ArrowLeft" && dirn.x != 1) {
      moveSound.play();
      console.log("down");
      dirn.x = -1;
      dirn.y = 0;
      return;
    }
  });
}

//Game functions
function main(ctime) {
  //game loop
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  //controlling the fps

  gamerun();
}

function Collide(obj) {
  for (let i = 1; i < snakeobj.length; i++) {
    if (snakeobj[0].x == snakeobj[i].x && snakeobj[0].y == snakeobj[i].y) {
      return true;
    }
  }
  if (snakeobj[0].x >= 18 && dirn.x == 1) {
    return true;
  }

  if (snakeobj[0].x <= 0 && dirn.x == -1) {
    return true;
  }
  if (snakeobj[0].y <= 0 && dirn.y == -1) {
    return true;
  }
  if (snakeobj[0].y >= 18 && dirn.y == 1) {
    return true;
  }
}

function isFoodOnSnake(fooditem) {
  for (let i = 1; i < snakeobj.length; i++) {
    if (snakeobj[i].x === fooditem.x && snakeobj[i].y === fooditem.y) {
      return true;
    }
  }
  return false;
}

function gamerun() {
  //updating the score

  //updating the snake
  if (Collide(snakeobj)) {
    dirn = { x: 0, y: 0 };
    over.style.display = "block";
    board.innerHTML = "";
    return;
  }

  //when snake eats the food
  if (snakeobj[0].x == fooditem.x && snakeobj[0].y == fooditem.y) {
    foodSound.play();
    snakeobj.unshift({ x: snakeobj[0].x + dirn.x, y: snakeobj[0].y + dirn.y });

    let a = 1;
    let b = 17;
    // fooditem={x:Math.floor(Math.random() * (b - a + 1)) + a,y:Math.floor(Math.random() * (b - a + 1)) + a};
    do {
      fooditem = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random()),
      };
    } while (isFoodOnSnake(fooditem));

    score++;
    if (score > Highscoreval) {
      Highscoreval = score;
      localStorage.setItem("Highscore", JSON.stringify(Highscoreval));
      highscr.innerHTML = "Highscore: " + Highscoreval;
    }
    scoree.innerHTML = "Score : " + score;
    if (score % 6 == 0) {
      speed += 2;
    }
    //to generate random no. between a and b
  }

  //moving the snake
  for (let i = snakeobj.length - 2; i >= 0; i--) {
    //snakeobj[i+1]=snakeobj[i];
    //does not happen in c++ usme to copy assign hoti hai
    snakeobj[i + 1] = { ...snakeobj[i] };
  }

  snakeobj[0].x += dirn.x;
  snakeobj[0].y += dirn.y;

  //displaying snake
  board.innerHTML = "";
  snakeobj.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    // could round the snake
    snakeElement.style.gridColumnStart = e.x;
    // if(index==0){
    // snakeElement.classList.add('head');}
    // else{
    snakeElement.classList.add("snake");
    // }
    board.appendChild(snakeElement);
  });
  //displaying the food

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = fooditem.y;
  foodElement.style.gridColumnStart = fooditem.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
endgame();

restart.addEventListener("click", () => {
  location.reload();
});




