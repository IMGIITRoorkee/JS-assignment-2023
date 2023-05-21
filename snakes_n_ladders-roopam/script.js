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

var pos1 = 0;
var pos2 = 0;

function player1Mover(move) {
    if (move > 0) {
        setTimeout(() => {
            if (pos1 >= 1) { clearBox("b_" + pos1); }
            pos1++;
            setBox("b_" + pos1, "yellow");
            move--;
            player1Mover(move)
        }, 300)
    }
}

function player2Mover(move) {
    if (move > 0) {
        setTimeout(() => {
            if (pos2 >= 1) { clearBox("b_" + pos2); }
            pos2++;
            setBox("b_" + pos2, "rgb(12,12,181)");
            move--;
            player2Mover(move)
        }, 300)
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
        let step1 = dieVal1 + 1;
        player1Mover(step1);
    }, 500)
}

function roll2(id) {
    let die = document.querySelector(id);
    die.classList.add("shake")
    let dieVal2 = Math.floor((Math.random()) * 6);
    setTimeout(function () {
        die.classList.remove("shake");
        die.setAttribute('src', images[dieVal2]);
        let step2 = dieVal2 + 1;
        player2Mover(step2);
    }, 500)
}
