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

function setBox(id, color) {
    document.getElementById(id).innerHTML = `<div class ="cir" style = "background:${color}"></div>`
}

function clearBox(id) {
    document.getElementById(id).innerHTML = ``;
}


createBoxes();
// setBox("b_40", "yellow");
// setBox("b_41", "rgb(12, 12, 181)");

var move = 5;
var pos = 0;

function playerMover(move) {
    if (move > 0) {
        setTimeout(() => {
            if (pos >= 1) clearBox("b_" + pos);
            pos++;
            setBox("b_" + pos, "yellow");
            move--;
            playerMover(move)
        }, 300)
    }
}

// playerMover(move);

//Dice Area:
let images = ["img/dice-01.svg", "img/dice-02.svg", "img/dice-03.svg", "img/dice-04.svg", "img/dice-05.svg", "img/dice-06.svg"];
let dice = document.querySelectorAll('.dice');

function roll() {
    dice.forEach(function (die) {
        die.classList.add("shake")
    });
    setTimeout(function () {
        dice.forEach(function (die) {
            die.classList.remove("shake")
        });
        let dieVal1 = Math.floor((Math.random()) * 6);
        document.querySelector('#dice-01').setAttribute('src', images[dieVal1]);
    }, 500)
}

document.querySelector('.btn').addEventListener('click', roll);