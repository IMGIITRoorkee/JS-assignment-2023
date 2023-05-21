function createBoxes() {
    let boxes = "";
    let no = 100, inc = -1;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            boxes += `<div class = "box" id="b_${no}"></div>`
            no += inc;
        }
        if (i % 2 == 0) no -= 9;
        else no -= 11;
        inc = -inc;
    }
    document.querySelector(".board").innerHTML = boxes;
}

createBoxes();

function setBox(id, color) {
    document.getElementById(id).innerHTML = `<div class ="cir" style = "background:${color}"></div>`
}

function clearBox(id) {
    document.getElementById(id).innerHTML = ``;
}

function modifyBox1(id) {
    document.getElementById(id).firstChild.style.background = "rgb(12,12,181)";
}

function modifyBox2(id) {
    document.getElementById(id).firstChild.style.background = "yellow";
}


var pos1 = 0;
var pos2 = 0;

function player1Mover(move) {
    setTimeout(() => {
        if (pos1 + move > 100) return;
        if (pos1 >= 1) {
            if (pos1 == pos2) { modifyBox1("b_" + pos1); }
            else { clearBox("b_" + pos1); }
        }
        pos1 += move;
        setBox("b_" + pos1, "yellow");
        check_ladder1();
        check_snake1();
        check_winner1();
    }, 1000)

}

function player2Mover(move) {
    setTimeout(() => {
        if (pos2 + move > 100) return;
        if (pos2 >= 1) {
            if (pos1 == pos2) { modifyBox2("b_" + pos2); }
            else { clearBox("b_" + pos2); }
        }
        pos2 += move;
        setBox("b_" + pos2, "rgb(12,12,181)");
        check_ladder2();
        check_snake2();
        check_winner2();
    }, 1000)
}


//ladders and snakes:
var ladders = [[1, 38], [4, 14], [9, 31], [21, 42], [28, 84], [51, 67], [71, 91], [80, 100]];
var snakes = [[17, 7], [54, 34], [62, 19], [64, 60], [87, 24], [93, 73], [95, 75], [98, 79]];

function check_ladder1() {
    for (let i = 0; i < ladders.length; i++) {
        if (ladders[i][0] == pos1) {
            player1Mover(ladders[i][1] - ladders[i][0]);
            break;
        }
    }
}

function check_ladder2() {
    for (let i = 0; i < ladders.length; i++) {
        if (ladders[i][0] == pos2) {
            player2Mover(ladders[i][1] - ladders[i][0]);
            break;
        }
    }
}

function check_snake1() {
    for (let i = 0; i < snakes.length; i++) {
        if (snakes[i][0] == pos1) {
            player1Mover(snakes[i][1] - snakes[i][0]);
            break;
        }
    }
}

function check_snake2() {
    for (let i = 0; i < snakes.length; i++) {
        if (snakes[i][0] == pos2) {
            player2Mover(snakes[i][1] - snakes[i][0]);
            break;
        }
    }
}

//Dice Area:
let images = ["img/dice-01.svg", "img/dice-02.svg", "img/dice-03.svg", "img/dice-04.svg", "img/dice-05.svg", "img/dice-06.svg"];

document.querySelector('#btn1').addEventListener('click', () => { roll1('#dice-01') });
document.querySelector('#btn2').addEventListener('click', () => { roll2('#dice-02') });

function roll1(id) {
    let die = document.querySelector(id);
    die.classList.add("shake")
    let dieVal1 = Math.floor((Math.random()) * 6);
    setTimeout(function () {
        die.classList.remove("shake");
        die.setAttribute('src', images[dieVal1]);
        player1Mover(dieVal1 + 1);
    }, 500)
}

function roll2(id) {
    let die = document.querySelector(id);
    die.classList.add("shake")
    let dieVal2 = Math.floor((Math.random()) * 6);
    setTimeout(function () {
        die.classList.remove("shake");
        die.setAttribute('src', images[dieVal2]);
        player2Mover(dieVal2 + 1);
    }, 500)
}

//check winner:
function check_winner1() {
    if (pos1 == 100) {
        alert("Player 1 is the winner!");
        location.reload();
    }
}

function check_winner2() {
    if (pos2 == 100) {
        alert("Player 2 is the winner!");
        location.reload();
    }
}