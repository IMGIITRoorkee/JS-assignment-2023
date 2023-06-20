document.addEventListener('DOMContentLoaded', () => {
    const flappyBird = document.querySelector('.flappy-bird');
    const gameDisplay = document.querySelector('.game-wrapper');
    const counterDiv = document.getElementById('counter');
    const highScoreDiv = document.querySelector('.high-score');

    let birdLeft = 220;
    let birdBottom = 200;
    let gravity = 2.4;
    let isGameOver = false;
    let gap = 430;
    let counter = 0;
    let highScore = localStorage.getItem('birdHighScore') || 0;

    highScoreDiv.innerHTML += highScore;

    counterDiv.innerHTML = counter;

    function startGame() {
        birdBottom -= gravity;
        flappyBird.style.bottom = birdBottom + 'px';
        flappyBird.style.left = birdLeft + 'px';
    }

    let startTimerId = setInterval(startGame, 20);

    function control(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        if (birdBottom < 500) {
            birdBottom += 50;
        }
        flappyBird.style.bottom = birdBottom + 'px';
        console.log(birdBottom);
    }

    document.addEventListener('keyup', control);

    function generateObstacle() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 100;
        let obstacleBottom = randomHeight;

        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);

        obstacle.style.bottom = obstacleBottom + 'px';
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle() {
            obstacleLeft -= 3;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            if (obstacleLeft === -30) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }

            if (
                obstacleLeft > 200 &&
                obstacleLeft < 280 &&
                birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
                birdBottom === 0
            ) {
                gameOver();
                clearInterval(timerId);
            }

            if (obstacleLeft < birdLeft && obstacleLeft > birdLeft - 3) {
                increaseCount();
            }
        }
        let timerId = setInterval(moveObstacle, 20);
        if (!isGameOver) {
            setTimeout(generateObstacle, 2100);
        }
    }

    generateObstacle();

    // function generateBanana() {
    //     let bananaLeft = 350;
    //     let bananaRandomHeight = Math.random() * 300 + 200;
    //     let bananaBottom = bananaRandomHeight;
      
    //     const banana = document.createElement('div');
      
    //     if (!isGameOver) {
    //       banana.classList.add('banana');
    //     }
    //     gameDisplay.appendChild(banana);
      
    //     banana.style.bottom = bananaBottom + 'px';
    //     banana.style.left = bananaLeft + 'px';
      
    //     function moveBanana() {
    //       bananaLeft -= 3;
    //       banana.style.left = bananaLeft + 'px';
      
    //       if (bananaLeft === -30) {
    //         clearInterval(bananaTimerId);
    //         gameDisplay.removeChild(banana);
    //       }
    //     }
      
    //     let bananaTimerId = setInterval(moveBanana, 20);
    //     if (!isGameOver) {
    //       setTimeout(generateBanana, 16800);
    //     }
    //   }
      
    //   generateBanana();

    function gameOver() {
        clearInterval(startTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        document.querySelector('.game-over').style.display = 'block';
        document.querySelector('.any-key').style.display = 'block';
        document.addEventListener('keyup', restart);
        if (counter > highScore) {
            highScoreDiv.innerHTML -= highScore;
            highScore = counter;
            localStorage.setItem('birdHighScore', highScore);
            
        }
    }

    function restart() {
        window.location.reload();
        isGameOver = false;
    }

    function increaseCount() {
        counter++;
        counterDiv.innerHTML = counter;
    }
});