const canvas = document.getElementsByTagName('canvas')[1];
const ctx = canvas.getContext("2d");

const joystick = document.getElementsByTagName('canvas')[0];
const jtx = joystick.getContext('2d');

const jumpButton = document.getElementsByClassName('round-button')[0];

canvas.width = innerWidth;
canvas.height = 400;

let leftScrollOffset = 0;
let rightScrollOffset = 0;
const gameSpeed = 0.1;
const deathAudio = new Audio('./game-assets/death.mp3')
const jumpAudio = new Audio('./game-assets/jump.wav')

const deathImage = new Image();
deathImage.src = './game-assets/game-over.webp';

const marioRight = new Image();
marioRight.src = './game-assets/marioRight.png'

const marioLeft = new Image();
marioLeft.src = './game-assets/marioLeft.png'

const marioJump = new Image();
marioJump.src = './game-assets/marioJump.png'

const enemy = new Image();
enemy.src = './game-assets/enemy.png'

const backgroundImage = new Image();
backgroundImage.src = "./game-assets/background.png"
class Background{
    constructor(img){
        this.width = 4374
        this.height = 400
        this.Image = img
        this.position = {
            x:0,
            y:0
        }
    }

    draw(){
        ctx.drawImage(this.Image , this.position.x , this.position.y)
    }
}
const background = new Background(backgroundImage);

class Mario {
    constructor(){
        this.position = {
            x:100,
            y: 0
        }
        this.velocity = {
            x:0,
            y:gameSpeed*2,
        }
        this.width = 16
        this.height = 18
        this.gravity = 0.4
        this.imageFrames = [
            {
                image:marioRight,
                frames:[
                    {
                        type:'idle',
                        framePosition:0
                    },
                    {
                        type:'run',
                        framePosition:16
                    },
                    {
                        type:'stand',
                        framePosition:30
                    },
                    {
                        type:'full-run',
                        framePosition:44
                    },
                    {
                        type:'left-press',
                        framePosition:65
                    }
                ]
            },
            {
                 image:marioLeft,
                 frames:[
                    {
                        type:'idle',
                        framePosition:46
                    },
                    {
                        type:'run',
                        framePosition:31
                    },
                    {
                        type:'stand',
                        framePosition:17
                    },
                    {
                        type:'full-run',
                        framePosition:1
                    }
                ]
            },
            {
                image:marioJump,
                frames:[
                    {
                        type:'right',
                        framePosition:6
                    },
                    {
                        type:'left',
                        framePosition:26
                    }
                ]

            }
        ]
        this.direction = 0;
        this.frames = 0;
    }
    
    draw(){
        ctx.drawImage(
            this.imageFrames[this.direction].image,
            (!this.velocity.x) ? this.imageFrames[this.direction].frames
            [0].framePosition 
            : this.imageFrames[this.direction].frames[this.frames].framePosition,
            0,
            16,
            18,
            this.position.x,
            this.position.y,
            this.width, 
            this.height
        )
}

    update(){
        this.draw()
        if(this.frames > 3) this.frames = 0
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y ;
        if(this.position.y + this.height + this.velocity.y <= canvas.height ){ 
            this.velocity.y += this.gravity
        }
        else this.velocity.y = 0
        if(this.position.x < 0){
            this.velocity.x = 0
            this.position.x =0
        }
        if(this.position.y < 0){
            this.velocity.y = 0;
            this.position.y = 0
        } 
    }
}

class DeathImage{
    constructor(){
        this.position = {
            x : canvas.width/2,
            y : canvas.height/2
        }
    }
    draw(){
        ctx.drawImage(deathImage , this.position.x , this.position.y)
    }
}

class Enemies {
    constructor(x , y , platformWidth){
        this.position = {
            x,
            y
        }
        this.width = 18
        this.height = 18
        this.maxWidth = 18
        this.xVelocity = 0
        this.imageFrames = 
            {
                image:enemy,
                frames:[
                    {
                        framePosition:1,
                    },
                    {
                        framePosition:20
                    }
                ]
            }
        this.frames=0
        this.platformWidth = platformWidth
    }

    draw(){
        ctx.fillStyle  = 'rgba(255 , 255 , 255, 1)'
        ctx.drawImage(
            this.imageFrames.image ,
            this.imageFrames.frames[this.frames].framePosition,
            0,
            18,
            20,
            this.position.x,
            this.position.y , this.width , this.height);
    }
    update(){
        this.draw();
        this.position.x += this.xVelocity
    }
}

const enemies  = [ new Enemies(400  , 342 - 18  , 423) , new Enemies(641 + 180 , 242 - 18, 208),
    new Enemies(1070 + 110 , 107 -18 ,178),new Enemies(3097 + 10 , 240 -18 , 99),
    new Enemies(2777 + 180 , 187 -18 ,205), new Enemies(3840 + 50 , 346 -18 , 348),
    new Enemies(3840 + 150 , 346 -18 , 348)
];

const deathAnimation = new DeathImage();

class Platform {
    constructor( x , y , width){
        this.position = {
            x,
            y
        }
        this.width = width
        this.height = 0
        this.maxWidth = width
    }
    draw(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x ,this.position.y , this.width , this.height);
    }
}
//, new Platform( 495 , 320 ,95)
        
const platforms = [
    new Platform( 0, 342 ,423) , new Platform( 486 , 320 ,95) , 
    new Platform(641 , 242 , 208 ) , new Platform(696 ,135, 125) , 
    new Platform(857  ,  320 ,  71) , new Platform(937 , 214 , 125) ,
    new Platform(1070 , 107 ,178), new Platform(1337 , 347 , 99) ,
    new Platform( 1577 , 347 , 125 ) , new Platform(1603 , 134 , 99),
    new Platform(1737 , 347 , 125) ,  new Platform(1870 , 240 , 72),
    new Platform(2030 , 160 , 152) , new Platform(2617 , 294 , 98),
    new Platform(2777 , 187 ,205) , new Platform(3017 , 347 , 72),
    new Platform(3097 , 240 , 99) , new Platform( 3257 , 240 , 98),
    new Platform(3440 , 347 , 240) ,   new Platform(3680 , 241 , 54),
    new Platform(3734 , 187 , 54) , new Platform(3787 , 134 , 54),
    new Platform(3840 , 346 , 348)
] 
const mario = new Mario(); 
const keys = {
    right : {
        pressed:false
    },
    left : {
        pressed:false
    }
}
  let upKeystokes = 0;

let death = false

const deathSequence = ()=>{
    death=true
    const playFunc = async ()=>{
        await deathAudio.play()
    }
    playFunc();
    mario.velocity.y = 10
    setTimeout(()=>{
        location.href = "/JS-assignment-2023/death.html"
    } , 500)
    
}

class Coins{
    constructor(x, y , width , specialFunction){
        this.position = {
            x,
            y
        }
        this.width = width
        this.height = 27
        this.maxWidth = width
        this.specialFunction = specialFunction
    }
    draw(){
        ctx.fillStyle  = 'rgba(255 , 255 , 255, 0)'
        ctx.fillRect(this.position.x , this.position.y , this.width , this.height);
    }
}

const enemieDeath = (enemy) =>{
    enemy.xVelocity = 0;
    const intervalId = setInterval(()=>{
        if(enemy.height <= 0) clearInterval(intervalId);
        else{
            enemy.position.y += 3
            enemy.height -= 3;
        }
    } , 1000)
}

class WinLine{
    constructor(){
        this.position = {
            x : 130,
            y : 0
        },
        this.width = 0;
        this.height = 400;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x , this.position.y , this.width , this.height)
    }
}

const winline =  new WinLine();
const winSequence = async () =>{
    location.href = '/JS-assignment-2023/win.html'
}


const coins = [new Coins(720 , 107 , 24 , deathSequence)];

joystick.width = 75;
joystick.height = 75
class JoystickBackGround {
    constructor(){
        this.center = {
            x:joystick.width/2,
            y:joystick.height/2
        }
        this.radius = joystick.width/2;
    }
    draw(){
        jtx.beginPath();
        jtx.arc(this.center.x , this.center.y , this.radius , 0 , Math.PI * 2 ,false );
        jtx.lineWidth = 1;
        jtx.strokeStyle = '#ffffff'
        jtx.stroke();
    }
}
const joystickBackground = new JoystickBackGround();


class Joystick{
    constructor(){
        this.center = {
            x:joystick.width/2,
            y:joystick.height/2
        }
        this.radius = 20;
        this.movedCenter = {
            x:joystick.width/2,
            y:joystick.height/2
        }
        this.maxMove = this.radius + 30;
    }
    draw(){
        jtx.beginPath();
        jtx.arc(this.movedCenter.x , this.movedCenter.y , this.radius , 0 , Math.PI * 2 );
        jtx.fillStyle = 'red';
        jtx.fill();
    }
}


const joystickImpl = new Joystick();



function animate (){
    requestAnimationFrame(animate);
    ctx.clearRect( 0 , 0 , canvas.width , canvas.height)
    background.draw();
    winline.draw();
    jtx.clearRect( 0 , 0 , joystick.width , joystick.height)
    joystickBackground.draw();
    joystickImpl.draw();
    platforms.forEach((platform)=>{
        platform.draw();
    })
    mario.update();
    if(keys.right.pressed && (mario.position.x <= 400)) {
        mario.velocity.x =gameSpeed * 0.0001
        if(leftScrollOffset < 3000)leftScrollOffset += 3;
        winline.position.x -= gameSpeed *(enemies.length + platforms.length + coins.length)
        
    }
    else if (keys.left.pressed && mario.position.x > 100) {
        mario.velocity.x = -gameSpeed * 0.0001
        if(leftScrollOffset < 3000) leftScrollOffset -= 1;
        winline.position.x += gameSpeed *(enemies.length + platforms.length + coins.length)
    }
    else {
        mario.velocity.x = 0
    }

    //enemies 
    enemies.forEach((enemie) =>{
        enemie.update()
    })

    //drawing coins
    coins.forEach((coin)=>{
        coin.draw();
    })

    enemies.forEach((enemie) =>{  
        if(enemie.width <= 0){
            enemie.width = 0 ;
        }
        if(keys.right.pressed && background.position.x <= 0 && background.position.x > -3900){
            background.position.x -= gameSpeed
                if(enemie.width > 0 && enemie.position.x ===  0){
                enemie.width -= gameSpeed;
                }
                enemie.position.x -=(platforms.length + enemies.length + coins.length) * gameSpeed 
        }else if(keys.left.pressed && background.position.x < 0){
            background.position.x += gameSpeed
            if(enemie.width < enemie.maxWidth && background.position.x > -enemie.maxWidth && enemie.position.x === 0){
                enemie.width += gameSpeed
            } 
            
                enemie.position.x += (platforms.length + enemies.length + coins.length) * gameSpeed 
        } else if(background.position.x > 0){
            background.position.x = 0
        }
    })

    if(mario.position.x > winline.position.x && leftScrollOffset > 3000){
        winSequence();
    }

    //to make enemy move in vicinity of player
    enemies.forEach((enemie)=>{
        let intervalId;
        if(enemie.position.x - mario.position.x < enemie.platformWidth / 1.5){
             intervalId  = setInterval(()=>{
                if(enemie.frames == 1) enemie.frames = 0;
                enemie.frames++;
            } , 75)
             enemie.xVelocity = -gameSpeed * 10;
            }
    })
        
    
    //if statement for background image and platform movement
    platforms.forEach((platform) =>{
        if(platform.width <= 0){
            platform.width = 0 ;
        }
        if(keys.right.pressed && background.position.x <= 0 && background.position.x > -3900){
            background.position.x -= gameSpeed
                if(platform.width > 0 && platform.position.x ===  0){
                     platform.width -= gameSpeed;
                }
                platform.position.x -=(platforms.length + enemies.length + coins.length)* gameSpeed
        }else if(keys.left.pressed && background.position.x < 0){
            background.position.x += gameSpeed
            if(platform.width < platform.maxWidth && background.position.x > -platform.maxWidth && platform.position.x === 0){
                platform.width += gameSpeed
            } 
            platform.position.x +=(platforms.length + enemies.length + coins.length)*gameSpeed
        } else if(background.position.x > 0){
            background.position.x = 0
        }
    })

    coins.forEach((coin)=>{
        if(coin.width <= 0){
            coin.width = 0 ;
        }
        if(keys.right.pressed && background.position.x <= 0 && background.position.x > -3900){
            background.position.x -= gameSpeed
                if(coin.width > 0 && coin.position.x ===  0){
                coin.width -= gameSpeed;
                }
                coin.position.x -=(platforms.length + coins.length +  enemies.length) * gameSpeed 
        }else if(keys.left.pressed && background.position.x < 0){
            background.position.x += gameSpeed
            if(coin.width < coin.maxWidth && background.position.x > -coin.maxWidth && coin.position.x === 0){
                coin.width += gameSpeed
            } 
            coin.position.x += (platforms.length + coins.length +  enemies.length) * gameSpeed 
        } else if(background.position.x > 0){
            background.position.x = 0
        }
    })

    //death sequence200
   
    //collison detection 
    platforms.forEach((platform)=>{
        if((mario.position.x + mario.width >= platform.position.x) && 
        (mario.position.y + mario.height <= platform.position.y) &&
        (mario.position.y + mario.height + mario.velocity.y >= platform.position.y)&&
        (mario.position.x <= platform.position.x + platform.width)
        ){
            mario.velocity.y = 0
        }
    })

    //collision detection for enemy 
    enemies.forEach((enemie)=>{
        if((mario.position.x + mario.width >= enemie.position.x && 
            Math.floor(Math.abs(mario.position.y + mario.height - (enemie.position.y + enemie.height))) == 0 &&
            mario.position.x < enemie.position.x + enemie.width
            )){
           deathSequence();
        }
        if( mario.position.x + mario.width - enemie.position.x > 1 &&
                mario.position.x<= enemie.position.x + enemie.width &&
                mario.position.y + mario.height >= enemie.position.y +  enemie.height){
                    mario.velocity.y = 0;
                    enemieDeath(enemie);
        }

    })

    coins.forEach((coin)=>{
        if((mario.position.x + mario.width >= coin.position.x) && 
        (mario.position.y  <= coin.position.y + coin.height) &&
        (mario.position.x <= coin.position.x + coin.width)  &&
        (mario.position.y + mario.height + mario.velocity.y >= coin.position.y)){
            coin.width = 0;
            
        }
    })
    if(mario.position.y  > 375){
        deathSequence();
    }
}

animate();


const jumpAudioPlay = async () =>{
    await jumpAudio.play();
}


let intervalRightId;
let intervalLeftId;
let timeoutId;

let joystickPressed = 0;

window.addEventListener('keydown' , ( event ) =>{
    if(event.repeat) return
    if(event.keycode == 38 || event.keyCode == 32){
        timeoutId = setTimeout(()=>{
            mario.velocity.y -= gameSpeed * 80;
        } , 500)
    }
    if(event.keyCode == 39){
        if(!death){
            mario.direction = 0;
            keys.right.pressed = true;
            intervalRightId = setInterval(()=>{
            if(mario.frames == 3) mario.frames = 1;
            else{
                mario.frames++
            }
            } , 100)
    }} else if(event.keyCode == 37){
        if(!death){
            mario.direction = 1;
          keys.left.pressed = true;
          intervalLeftId = setInterval(()=>{
              if(mario.frames == 3) mario.frames = 1;
              else{
              mario.frames++
              }
              } , 100)
      }
    }
})



window.addEventListener('keyup' , ({ keyCode , repeat }) =>{
    if(repeat) return 
    
    if(keyCode ==38 || keyCode == 32){
        clearTimeout(timeoutId);
        mario.velocity.y -= gameSpeed * 70
        jumpAudioPlay();
    }  
    if(keyCode == 39){
        clearInterval(intervalRightId);
        keys.right.pressed = false; 
    }
    else if(keyCode == 37){
        clearInterval(intervalLeftId);
        keys.left.pressed = false;
    }    
})

let joystickTouched = 0;

joystick.addEventListener('touchstart' , (event)=>{
    joystickTouched = 1;
})

joystick.addEventListener('touchmove' , (event)=>{
   if(joystickTouched  ===1 && event.targetTouches[0].target === joystick){
    joystickImpl.movedCenter.x = event.targetTouches[0].pageX;
    joystickImpl.movedCenter.y = event.targetTouches[0].pageY;
    console.log(joystickImpl.movedCenter.x - joystickImpl.center.x -joystick.offsetLeft)
    if(joystickImpl.movedCenter.x - joystickImpl.center.x -joystick.offsetLeft > 0){
        if(!death){
            mario.direction = 0;
            keys.right.pressed = true;
            intervalRightId = setInterval(()=>{
            if(mario.frames == 3) mario.frames = 1;
            else{
                mario.frames++
            }
            } , 200)}
    } else{
        if(!death){
            mario.direction = 1;
            keys.left.pressed = true;
            intervalLeftId = setInterval(()=>{
              if(mario.frames == 3) mario.frames = 1;
              else{
              mario.frames++
              }
              } , 200)
      }
    }
    if(joystick.offsetParent.tagName.toUpperCase() === "BODY") {
                joystickImpl.movedCenter.x -= joystick.offsetLeft;
                joystickImpl.movedCenter.y -= joystick.offsetTop;
            }else{
                joystickImpl.movedCenter.x -= joystick.offsetParent.offsetLeft;
                joystickImpl.movedCenter.y -= joystick.offsetParent.offsetTop;
            }
   }
})


joystick.addEventListener('touchend' , (event)=>{
    joystickTouched = 0;
    joystickImpl.movedCenter = {
        x:joystick.width/2,
        y:joystick.height/2
    }
    keys.right.pressed = false;
    keys.left.pressed = false
    clearInterval(intervalRightId);
    clearInterval(intervalLeftId);
    jtx.clearRect( 0 , 0 , joystick.width , joystick.height)

})


let btnClicked = 0;

jumpButton.addEventListener('click' , (event)=>{
    btnClicked++
    if(btnClicked%3 > 0){
        mario.velocity.y -= gameSpeed * 80;
    }
})