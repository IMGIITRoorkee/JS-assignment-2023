/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
canvas.style.width = CANVAS_WIDTH;
canvas.style.height = CANVAS_HEIGHT;
const scrollSpeed = 1;
const bgm = document.getElementById("bgm");
const enemyDeathSound = document.getElementById("enemy-death");
enemyDeathSound.volume = 0.2;
const playerDeathSound = document.getElementById("player-death");
const backgroundImages = document.getElementsByClassName("background-image");
const retryButton = document.getElementById("retry-button");
//player constants
const playerWidth = 22;
const playerHeight = 14;
const playerSpeed = 2;
const playerImage = document.getElementById("player-image");
const playerInvincibleImage = document.getElementById("invincible-player");
//enemy constants
const enemyWidth = 16;
const enemyHeight = 9;
const enemySpeed = 0.75;
const enemyImage = document.getElementById("enemy-image");
const enemyImageDeath = document.getElementById("enemy-image-death");
//bullet constants
const bulletWidth = 4;
const bulletSpeed = 8;
const bulletImage = document.getElementById("bullet");
//score constants
const scoreValue = 5;
let score = 0;
const scoreDOM = document.getElementById("actual-score");
//pickup constants
const boltWidth = 10;
const boltHeight = 10;
const pickupWidth = 6;
const pickupHeight = 6;
const invinciblePickup = document.getElementById("invincible");
const speedPickup = document.getElementById("speed-up");
const timeout = 0;
const dropRate = 0;
//Game start constants
const gameDOM = document.getElementById("game-area");
const startDOM = document.getElementById("start-screen");
const gameOverDOM = document.getElementById("game-over");
const startButtonDOM = document.getElementById("play-button");
const menuButtonDOM = document.getElementById("main-menu-button");
let isStarted = false;

let spawnRate = 80;
let gameOver = false;
//add audio support - done
//overhaul pickups as score system - done
//start pickup system
const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
class MovementManager {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.keys.indexOf(e.key) !== -1) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
class BackgroundLayer {
  constructor(image, speedMultiplier) {
    this.image = image;
    this.width = CANVAS_WIDTH;
    this.height = CANVAS_HEIGHT;
    this.x = 0;
    this.x2 = this.x + CANVAS_WIDTH;
    this.y = 0;
    this.speed = scrollSpeed * speedMultiplier;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
  update() {
    if (this.x <= -CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.speed - 20;
    else this.x -= this.speed;
    if (this.x2 <= -CANVAS_WIDTH) this.x2 = CANVAS_WIDTH - this.speed - 20;
    else this.x2 -= this.speed;
  }
}
class Player {
  constructor(playerImage, playerWidth, playerHeight, playerSpeed) {
    this.x = 5;
    this.y = CANVAS_HEIGHT * 0.5;
    this.width = playerWidth;
    this.height = playerHeight;
    this.speed = playerSpeed;
    this.image = playerImage;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update(moveManager) {
    if (moveManager.keys.indexOf("w") !== -1) this.y -= this.speed;
    if (moveManager.keys.indexOf("s") !== -1) this.y += this.speed;
    if (moveManager.keys.indexOf("a") !== -1) this.x -= this.speed;
    if (moveManager.keys.indexOf("d") !== -1) this.x += this.speed;
    //boundary check
    if (this.x <= 0) this.x = 0;
    if (this.x + this.width >= CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
    if (this.y <= 0) this.y = 0;
    if (this.y + this.height >= CANVAS_HEIGHT)
      this.y = CANVAS_HEIGHT - this.height;
  }
}
class Enemy {
  constructor(enemyImage, enemyWidth, enemyHeight, enemySpeed) {
    this.image = enemyImage;
    this.width = enemyWidth;
    this.height = enemyHeight;
    this.speed = enemySpeed * (Math.random() * 3 + 1);
    this.x = CANVAS_WIDTH + Math.floor(Math.random() * 10 + 5);
    this.y = Math.random() * CANVAS_HEIGHT + this.height;
    this.rate = Math.random();
  }
  update() {
    // if(this.y + this.height > CANVAS_HEIGHT) this.y + this.height = CANVAS_HEIGHT;
    this.x -= this.speed;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  die() {
    this.image = enemyImageDeath;
    enemyDeathSound.play();
  }
}
class EnemyManager {
  constructor(spawnRate) {
    this.x = CANVAS_WIDTH + 20;
    this.rate = spawnRate;
    this.seed = 0;
    this.enemies = [];
  }
  spawn() {
    if (this.seed % this.rate === 0) {
      this.enemies = this.enemies.concat(
        Array.from(
          Array(5),
          () => new Enemy(enemyImage, enemyWidth, enemyHeight, enemySpeed)
        )
      );
    }
    ++this.seed;
  }
  display() {
    this.enemies.forEach((enemy) => {
      enemy.draw();
      enemy.update();
    });
  }
  despawn() {
    this.enemies.forEach((enemy) => {
      if (enemy.x <= -CANVAS_WIDTH) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
      }
    });
  }
  checkDeath(col, player) {
    this.enemies.forEach((enemy) => {
      if (col.checkCollision(enemy, player, 0.25)) {
        if (player.isInvincible) {
          enemy.die();
          score += scoreValue * Math.floor(Math.random() * 5 + 1);
          scoreDOM.innerHTML = score;
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        } else {
          playerDeathSound.play();
          bgm.pause();
          gameOver = true;
        }
      }
    });
  }
}
class Bullet {
  constructor(bulletSpeed, bulletX, bulletY, bulletWidth, bulletImage) {
    this.x = bulletX;
    this.y = bulletY;
    this.width = bulletWidth;
    this.speed = bulletSpeed;
    this.image = bulletImage;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.width);
    // ctx.fillStyle = "white"
    // ctx.strokeStyle = "white"
    // ctx.beginPath()
    // ctx.arc(this.x + this.width*0.5, this.y + this.width*0.5, this.width*0.5, 0, Math.PI*2)
    // ctx.fill()
    // ctx.stroke()
  }
  update() {
    this.x += this.speed;
  }
}
class BulletManager {
  constructor(player) {
    this.shot = false;
    this.parent = player;
    this.bullets = [];
    this.attackActive = [];
    this.score = 0;
    window.addEventListener("keydown", (e) => {
      if (e.key === "k" && this.attackActive.indexOf(e.key) === -1) {
        // this.shot = true;
        this.attackActive.push(e.key);
        this.bullets.push(
          new Bullet(
            bulletSpeed,
            this.parent.x + this.parent.width,
            this.parent.y + this.parent.height * 0.3,
            bulletWidth,
            bulletImage
          )
        );
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "k" && this.attackActive.indexOf(e.key) !== -1) {
        // this.shot = false;
        this.attackActive.splice(this.attackActive.indexOf(e.key), 1);
      }
    });
  }
  spawn() {
    this.bullets.forEach((bullet) => {
      bullet.draw();
      bullet.update();
    });
  }
  despawn() {
    this.bullets.forEach((bullet) => {
      if (bullet.x >= CANVAS_WIDTH) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
      }
    });
  }
  checkHit(col, currentEnemies, pickupManager) {
    currentEnemies.forEach((enemy) => {
      this.bullets.forEach((bullet) => {
        if (col.checkCollision(bullet, enemy, 0.5)) {
          //score increment
          score += scoreValue * Math.floor(Math.random() * 5 + 1);
          scoreDOM.innerHTML = score;
          //bullet disappears
          this.bullets.splice(this.bullets.indexOf(bullet), 1);
          //enemy death
          enemy.die();
          if (enemy.rate > 0.2 && enemy.rate < 0.6) {
            pickupManager.generatePickup(enemy.x, enemy.y);
          }
          sleep(100).then(() => {
            currentEnemies.splice(currentEnemies.indexOf(enemy), 1);
          });
        }
      });
    });
  }
}
class Pickup {
  constructor(
    pickupX,
    pickupY,
    pickupWidth,
    pickupHeight,
    pickupImage,
    effect
  ) {
    this.image = pickupImage;
    this.x = pickupX;
    this.y = pickupY;
    this.width = pickupWidth;
    this.height = pickupHeight;
    this.effect = effect;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
class PickupManager {
  constructor(timeout) {
    this.currentPickups = [];
    this.duration = timeout;
  }
  checkPickup(player, col) {
    this.currentPickups.forEach((pickup) => {
      if (col.checkCollision(player, pickup, 0.5)) {
        if (pickup.effect === "INVINCIBLE") {
          player.isInvincible = true;
          player.image = playerInvincibleImage;
          setTimeout(() => {
            player.isInvincible = false;
            player.image = playerImage;
          }, 3000);
        } else if (
          pickup.effect === "SPEED_UP" &&
          player.speed === playerSpeed
        ) {
          player.speed += 2;
          setTimeout(() => (player.speed = playerSpeed), 3000);
        }
        this.currentPickups.splice(this.currentPickups.indexOf(pickup), 1);
      }
    });
  }
  generatePickup(parentX, parentY) {
    let seed = Math.random();
    if (seed > 0 && seed < 0.3) {
      this.currentPickups.push(
        new Pickup(
          parentX,
          parentY,
          pickupWidth,
          pickupHeight,
          invinciblePickup,
          "INVINCIBLE"
        )
      );
    } else if (seed > 0.7 && seed < 1) {
      this.currentPickups.push(
        new Pickup(
          parentX,
          parentY,
          boltWidth,
          boltHeight,
          speedPickup,
          "SPEED_UP"
        )
      );
    }
  }
  renderPickups() {
    this.currentPickups.forEach((pickup) => pickup.draw());
  }
}
class CollisionManager {
  checkCollision(object1, object2, multiplier) {
    const delx = object1.x - object2.x;
    const dely = object1.y - object2.y;
    const distance = delx * delx + dely * dely;
    const sumOfRadii = object1.width * multiplier + object2.width * multiplier;
    return distance < sumOfRadii * sumOfRadii;
  }
}
const collisionManager = new CollisionManager();
let player = new Player(playerImage, playerWidth, playerHeight, playerSpeed);
let background1 = new BackgroundLayer(backgroundImages[0], 0);
let background2 = new BackgroundLayer(backgroundImages[1], 0.4);
let background3 = new BackgroundLayer(backgroundImages[2], 0.8);
let background4 = new BackgroundLayer(backgroundImages[3], 1.2);
let moveManager = new MovementManager();
let enemyManager = new EnemyManager(spawnRate);
let bulletManager = new BulletManager(player);
let pickupManager = new PickupManager(timeout);
// let scoreManager = new ScoreManager()
const initializeGame = () => {
  bgm.load();
  bgm.playbackRate = 1.25;
  bgm.play();
  player = new Player(playerImage, playerWidth, playerHeight, playerSpeed);
  background1 = new BackgroundLayer(backgroundImages[0], 0);
  background2 = new BackgroundLayer(backgroundImages[1], 0.4);
  background3 = new BackgroundLayer(backgroundImages[2], 0.8);
  background4 = new BackgroundLayer(backgroundImages[3], 1.2);
  moveManager = new MovementManager();
  enemyManager = new EnemyManager(spawnRate);
  bulletManager = new BulletManager(player);
  pickupManager = new PickupManager(timeout);
};
retryButton.addEventListener("click", () => {
  if (gameOver) {
    gameOverDOM.style.display = "none";
    gameDOM.style.display = "flex";
    initializeGame()
    // scoreManager = new ScoreManager()
    animate();
  }
});
menuButtonDOM.addEventListener("click", () => {
  startDOM.style.display = "flex";
  gameDOM.style.display = "none";
  gameOverDOM.style.display = "none";
});
function animate() {
  gameOver = false;
  // bgm.load();
  // bgm.volume = 0.3;
  // bgm.playbackRate = 1.25;
  // bgm.play();
  if (bgm.ended) {
    bgm.load();
    bgm.playbackRate = 1.25;
    bgm.play();
  }
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  background1.draw();
  background1.update();
  background2.draw();
  background2.update();
  background3.draw();
  background3.update();
  background4.draw();
  background4.update();
  player.draw();
  player.update(moveManager);
  enemyManager.spawn();
  enemyManager.despawn();
  enemyManager.display();
  enemyManager.checkDeath(collisionManager, player);
  bulletManager.spawn();
  bulletManager.despawn();
  bulletManager.checkHit(collisionManager, enemyManager.enemies, pickupManager);
  pickupManager.checkPickup(player, collisionManager);
  pickupManager.renderPickups();
  // scoreManager.checkPickup(player, collisionManager, bulletManager.scoreDrops)
  // scoreManager.showDrops(bulletManager.scoreDrops)
  if (!gameOver) requestAnimationFrame(animate);
  else {
    gameDOM.style.display = "none";
    gameOverDOM.style.display = "flex";
  }
}
startButtonDOM.addEventListener("click", () => {
  gameOverDOM.style.display = "none";
  startDOM.style.display = "none";
  gameDOM.style.display = "flex";
  initializeGame()
  gameOver = false;
  animate();
});
startDOM.style.display = "flex";
