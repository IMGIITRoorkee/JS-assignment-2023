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


createBoxes();
setBox("b_40", "yellow");
setBox("b_41", "blueviolet");
