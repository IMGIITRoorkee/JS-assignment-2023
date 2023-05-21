/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("main-canvas")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = canvas.width 
const CANVAS_HEIGHT = canvas.height 
const scrollSpeed = 1
const backgroundImages = document.getElementsByClassName("background-image")
const retryButton = document.getElementById("retry-button")
//player constants
const playerWidth = 30
const playerHeight = 21
const playerSpeed = 3
const playerImage = document.getElementById("player-image")
//enemy constants
const enemyWidth = 20
const enemyHeight = 12
const enemySpeed = 0.75
const enemyImage = document.getElementById("enemy-image")
//bullet constants
const bulletWidth = 4
const bulletSpeed = 8
const bulletImage = document.getElementById("bullet")
//score constants
const scoreValue = 5
const scoreWidth = 4
const scoreImage = document.getElementById("pickup")
const scoreDOM = document.getElementById("actual-score")
let spawnRate = 80;
let gameOver = false;
class MovementManager
{
    constructor()
    {
        this.keys = []
        window.addEventListener("keydown", (e) =>
        {
            if((e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") && (this.keys.indexOf(e.key) === -1))
            {
                this.keys.push(e.key)
            }
            console.log(this.keys)
        })
        window.addEventListener("keyup", (e) =>
        {
            if(this.keys.indexOf(e.key) !== -1)
            {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
            console.log(this.keys)
        })
    }
}
class BackgroundLayer
{
    constructor(image, speedMultiplier)
    {
        this.image = image
        this.width = CANVAS_WIDTH
        this.height = CANVAS_HEIGHT
        this.x = 0;
        this.x2 = this.x + CANVAS_WIDTH;
        this.y = 0;
        this.speed = scrollSpeed*speedMultiplier
    }
    draw()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
    update()
    {
        if(this.x <= -CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.speed - 10
        else this.x -= this.speed;
        if(this.x2 <= -CANVAS_WIDTH) this.x2 = CANVAS_WIDTH - this.speed - 10
        else this.x2 -= this.speed
    }
}
class Player
{
    constructor(playerImage, playerWidth, playerHeight, playerSpeed)
    {
        this.x = 5
        this.y = CANVAS_HEIGHT*0.5;
        this.width = playerWidth
        this.height = playerHeight
        this.speed = playerSpeed
        this.image = playerImage
    }
    draw()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    update(moveManager)
    {
        if(moveManager.keys.indexOf("w") !== -1) this.y-=this.speed;
        if(moveManager.keys.indexOf("s") !== -1) this.y+=this.speed;
        if(moveManager.keys.indexOf("a") !== -1) this.x-=this.speed;
        if(moveManager.keys.indexOf("d") !== -1) this.x+=this.speed;
        //boundary check
        if(this.x <= 0) this.x = 0
        if(this.x + this.width >= CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width
        if(this.y <= 0) this.y = 0
        if(this.y + this.height >= CANVAS_HEIGHT) this.y = CANVAS_HEIGHT - this.height
    }
}
class Enemy
{
    constructor(enemyImage, enemyWidth, enemyHeight, enemySpeed)
    {
        this.image = enemyImage
        this.width = enemyWidth
        this.height = enemyHeight
        this.speed = enemySpeed*(Math.random()*3 + 1)
        this.x = CANVAS_WIDTH + Math.floor(Math.random()*10 + 5)
        this.y = this.height + Math.random()*(CANVAS_HEIGHT - this.height)
    }
    update()
    {
        this.x -= this.speed;
    }
    draw()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}
class EnemyManager
{
    constructor(spawnRate)
    {
        this.x = CANVAS_WIDTH + 20
        this.rate = spawnRate
        this.seed = 0;
        this.enemies = []
    }
    spawn()
    {
        if(this.seed % this.rate === 0)
        {
            this.enemies = this.enemies.concat(Array.from(Array(5),() => new Enemy(enemyImage, enemyWidth, enemyHeight, enemySpeed)))
        }
        ++this.seed;
    }
    display()
    {
        this.enemies.forEach(enemy =>
            {
                enemy.draw()
                enemy.update()
            })
    }
    despawn()
    {
        this.enemies.forEach(enemy =>
            {
                if(enemy.x <= -(CANVAS_WIDTH))
                {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1)
                }
            })
    }
    checkDeath(col, player)
    {
        this.enemies.forEach(enemy =>
            {
                if(col.checkCollision(enemy, player, 0.25))
                {
                    gameOver = true;
                }
            })
    }
}
class Bullet
{
    constructor(bulletSpeed, bulletX, bulletY, bulletWidth, bulletImage)
    {
        this.x = bulletX
        this.y = bulletY
        this.width = bulletWidth
        this.speed = bulletSpeed
        this.image = bulletImage
    }
    draw()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.width)
        // ctx.fillStyle = "white"
        // ctx.strokeStyle = "white"
        // ctx.beginPath()
        // ctx.arc(this.x + this.width*0.5, this.y + this.width*0.5, this.width*0.5, 0, Math.PI*2)
        // ctx.fill()
        // ctx.stroke()
       
    }
    update()
    {
        this.x += this.speed;
    }
}
class BulletManager
{
    constructor(player)
    {
        this.shot = false
        this.parent = player
        this.bullets = []
        this.attackActive = []
        this.scoreDrops = []
        window.addEventListener("keydown", (e) =>
        {
            if(e.key === "k" && this.attackActive.indexOf(e.key) === -1)
            {
                // this.shot = true;
                this.attackActive.push(e.key)
                this.bullets.push(new Bullet(bulletSpeed, this.parent.x + this.parent.width, this.parent.y + (this.parent.height*0.3), bulletWidth, bulletImage))
                console.log("shot")
            }
        })
        window.addEventListener("keyup", (e) =>
        {
            if(e.key === "k" && this.attackActive.indexOf(e.key) !== -1)
            {
                // this.shot = false;
                this.attackActive.splice(this.attackActive.indexOf(e.key), 1)
            }
        })

    }
    spawn()
    {
        console.log("running")
        this.bullets.forEach(bullet => 
            {
                bullet.draw()
                bullet.update()
    })
    }
    despawn()
    {
        this.bullets.forEach(bullet => 
            {
                if(bullet.x >= CANVAS_WIDTH)
                {
                    this.bullets.splice(this.bullets.indexOf(bullet), 1)
                }
            })
    }
    checkHit(col, currentEnemies)
    {
       currentEnemies.forEach(enemy =>
        {
            this.bullets.forEach(bullet =>
                {
                    if(col.checkCollision(bullet, enemy, 0.5))
                    {
                        this.scoreDrops.push(new ScorePickup(enemy.x, enemy.y, scoreValue, scoreWidth, scoreImage))
                        currentEnemies.splice(currentEnemies.indexOf(enemy), 1)
                        this.bullets.splice(this.bullets.indexOf(bullet), 1)
                    }
                })
        })
    }
}
class ScorePickup
{
    constructor(x, y, scoreValue, scoreWidth, scoreImage)
    {
        this.value = Math.floor(scoreValue*(Math.random()*5 + 1));
        this.x = x;
        this.y = y;
        this.width = scoreWidth
        this.image = scoreImage
    }
    draw()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.width)
        // ctx.fillStyle = "blue"
        // ctx.strokeStyle = "white"
        // ctx.beginPath()
        // ctx.arc(this.x, this.y, this.width*0.5, 0, Math.PI*2)
        // ctx.fill()
        // ctx.stroke()
    }
}
class ScoreManager
{
    constructor()
    {
        this.score = 0
        scoreDOM.innerHTML = this.score;
    }
    checkPickup(player, col, currentDropped)
    {
        currentDropped.forEach(drop =>
            {
                if(col.checkCollision(drop, player, 0.6))
                {
                    this.score += drop.value
                    scoreDOM.innerHTML = this.score;
                    currentDropped.splice(currentDropped.indexOf(drop), 1)
                    console.log(this.score)
                }
            })
    }
    showDrops(currentDropped)
    {
        currentDropped.forEach(drop => drop.draw())
    }
}
class CollisionManager
{
    checkCollision(object1, object2, multiplier)
    {
        const delx =  object1.x - object2.x
        const dely = object1.y - object2.y
        const distance = delx*delx + dely*dely;
        const sumOfRadii = (object1.width*multiplier) + (object2.width*multiplier)
        return distance < sumOfRadii*sumOfRadii
    }
}
const collisionManager = new CollisionManager()
let player = new Player(playerImage, playerWidth, playerHeight, playerSpeed)
let background1 = new BackgroundLayer(backgroundImages[0], 0.2)
let background2 = new BackgroundLayer(backgroundImages[1], 0.4)
let background3 = new BackgroundLayer(backgroundImages[2], 0.8)
let background4 = new BackgroundLayer(backgroundImages[3], 1.2)
let moveManager = new MovementManager()
let enemyManager = new EnemyManager(spawnRate)
let bulletManager = new BulletManager(player)
let scoreManager = new ScoreManager()

retryButton.addEventListener("click", () =>
{
    if(gameOver)
    {
    player = new Player(playerImage, playerWidth, playerHeight, playerSpeed)
    background1 = new BackgroundLayer(backgroundImages[0], 0.2)
    background2 = new BackgroundLayer(backgroundImages[1], 0.4)
    background3 = new BackgroundLayer(backgroundImages[2], 0.8)
    background4 = new BackgroundLayer(backgroundImages[3], 1.2)
    moveManager = new MovementManager()
    enemyManager = new EnemyManager(spawnRate)
    bulletManager = new BulletManager(player)
    scoreManager = new ScoreManager()
    animate()
    }
})
function animate()
{
    gameOver = false;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    background1.draw()
    background1.update()
    background2.draw()
    background2.update()
    background3.draw()
    background3.update()
    background4.draw()
    background4.update()
    player.draw()
    player.update(moveManager)
    enemyManager.spawn()
    enemyManager.despawn()
    enemyManager.display()
    enemyManager.checkDeath(collisionManager, player)
    bulletManager.spawn()
    bulletManager.despawn()
    bulletManager.checkHit(collisionManager, enemyManager.enemies)
    scoreManager.checkPickup(player, collisionManager, bulletManager.scoreDrops)
    scoreManager.showDrops(bulletManager.scoreDrops)
    if(!gameOver) requestAnimationFrame(animate)
}
animate()

