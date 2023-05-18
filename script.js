const score = document.querySelector(".car-score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

console.log(gameArea);

startScreen.addEventListener("click", start);
//speed + moving up and objects speed
let players = { speed: 10, score: 0 };

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function keyDown(e) {
  keys[e.key] = true;
  // console.log(keys);
}
function keyUp(e) {
  keys[e.key] = false;
  // console.log(keys);
}
//endgame
function endgame() {
  players.start = false;
  startScreen.classList.remove("hide");
  gameArea.classList.add("hide");
  let audio = new Audio("gameover.mp3");
  audio.play();
  startScreen.innerHTML =
    "game over   <br>" +
    "Your Final Score is : " +
    players.score +
    " <br> refresh to start the game";
}
// collision detection
function collide(a, b) {
  aRect = a.getBoundingClientRect(); //help us finding the location of car from top left width height etc
  bRect = b.getBoundingClientRect(); //same for the enemy car;

  //conditions
  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.left > bRect.right ||
    aRect.right < bRect.left
  );
}

//animation of lines can be done with key frames in css

function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 600) {
      item.y -= 650;
    }

    item.y += players.speed;
    item.style.top = item.y + "px";
  });
}

//how will enemy arrive
function moveEnemy(car) {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach(function (item) {
    //calling of collision
    if (collide(car, item)) {
      console.log("HIT");
      endgame();
    }

    if (item.y >= 750) {
      //how enemy will come
      item.y = -300; //how enemy will come
      item.style.left = Math.floor(Math.random() * 350) + "px"; //how enemy will come
    }

    item.y += players.speed;
    item.style.top = item.y + "px";
  });
}

//functionality of the game

function gamePlay() {
  // console.log("clicked");
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  // console.log(road);

  //functionality of keys we can also make it with w a s d keys in place of arrow up etc

  if (players.start) {
    moveLines();

    moveEnemy(car);

    if (keys.ArrowUp && players.y > road.top + 200) {
      players.y -= players.speed;
    }
    if (keys.ArrowDown && players.y < road.bottom - 145) {
      players.y += players.speed;
    }
    if (keys.ArrowLeft && players.x > 0) {
      players.x -= players.speed;
    }
    if (keys.ArrowRight && players.x < road.width - 70) {
      players.x += players.speed;
    }
    car.style.top = players.y + "px";
    car.style.left = players.x + "px";
    window.requestAnimationFrame(gamePlay);
    console.log(players.score++);
    players.score++;
    let ps = players.score - 2;
    score.innerHTML = "Your Score : " + ps;
  }
}

function start() {
  //what will happen when game is start
  players.start = true;
  players.score = 0;
  score.classList.remove("hide");
  gameArea.classList.remove("hide");
  startScreen.classList.add("hide");
  let audio=new Audio("gamestart.mp3");
  audio.play();
  //making of road lines
  for (i = 0; i < 5; i++) {
    let roadline = document.createElement("div");
    roadline.setAttribute("class", "lines");
    roadline.y = i * 160;
    roadline.style.top = roadline.y + "px";
    gameArea.appendChild(roadline);
  }

  //helps us to find if our click is working
  window.requestAnimationFrame(gamePlay);

  //making our car
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  //end

  //getting positions from left and top

  players.x = car.offsetLeft;
  players.y = car.offsetTop;

  //making enemy cars
  for (i = 0; i < 3; i++) {
    let enemycar = document.createElement("div");
    enemycar.setAttribute("class", "enemy");
    enemycar.y = (i + 1) * 350 * -1;
    enemycar.style.top = enemycar.y + "px";
    enemycar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemycar);
  }
}
