


var l = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
var count = 0;
var mode = false;
var draw = false;
function createNewElement(source) {
    var element = document.createElement('img');
    element.src = source;
    element.style.height = '8rem';
    return element;
}
function showAlert(message, icon) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert';
    alertBox.innerHTML = `
      <div class="alert-content">
      <img src=${icon}>
        <h2>${message}</h2>
        <button onclick="location.reload()">OK</button>
      </div>
    `;
    document.body.appendChild(alertBox);
}


function select(inp) {
    return new Promise((resolve, reject) => {
        const alertBox = document.createElement('div');
        alertBox.className = 'alert';
        alertBox.innerHTML = `
        <div class="alert-content">
        <h2>PLEASE SELECT AVATAR FOR ${inp}:</h2>
          <div class="icon-container">

            <img src="bear.png" alt="bear" onclick="selectImage(this.src)">
            <img src="cat.png" alt="cat" onclick="selectImage(this.src)">
            <img src="woman.png" alt="woman" onclick="selectImage(this.src)">
            <img src="gamer.png" alt="gamer" onclick="selectImage(this.src)">
            <img src="man.png" alt="man" onclick="selectImage(this.src)">
          </div>
          
        </div>
      `;

        document.body.appendChild(alertBox);

        window.selectImage = function (src) {
            delete window.selectImage;
            alertBox.remove();
            resolve(src);
        };

        window.proceed = function () {
            delete window.proceed;
            alertBox.remove();
            reject(new Error('Player canceled selection.'));
        };
    });
}


var list = [0, 1, 2, 3, 4, 5, 6, 7, 8]
function check(icon1, icon2) {

    bool = false
    m = -1
    if (!(l[0].includes(0) || l[1].includes(0) || (l[2].includes(0)))) {
        bool = true
        var p = []



    }
    if (l[0][0] == l[0][1] && l[0][1] == l[0][2] && l[0][0] != 0) {
        bool = true
        m = l[0][0]
        var p = ['r11', 'r12', 'r13']

    }
    if (l[1][0] == l[1][1] && l[1][1] == l[1][2] && l[1][0] != 0) {
        bool = true
        m = l[1][0]
        var p = ['r21', 'r22', 'r23']
    }
    if (l[2][0] == l[2][1] && l[2][1] == l[2][2] && l[2][0] != 0) {
        bool = true
        m = l[2][0]
        var p = ['r31', 'r32', 'r33']
    }
    if (l[0][0] == l[1][0] && l[1][0] == l[2][0] && l[0][0] != 0) {
        bool = true
        m = l[0][0]
        var p = ['r11', 'r21', 'r31']
    }
    if (l[0][1] == l[1][1] && l[1][1] == l[2][1] && l[1][1] != 0) {
        bool = true
        m = l[1][1]
        var p = ['r12', 'r22', 'r32']
    }
    if (l[0][2] == l[1][2] && l[1][2] == l[2][2] && l[0][2] != 0) {
        bool = true
        m = l[0][2]

        var p = ['r13', 'r23', 'r33']
    }
    if (l[0][0] == l[1][1] && l[1][1] == l[2][2] && l[0][0] != 0) {
        bool = true
        m = l[0][0]
        var p = ['r11', 'r22', 'r33']

    }
    if (l[2][0] == l[1][1] && l[1][1] == l[0][2] && l[2][0] != 0) {
        bool = true
        m = l[2][0]
        var p = ['r31', 'r22', 'r13']

    }
    console.log(bool)
    if (bool) {
        mode = !mode
        if (p.length == 0 && !draw) {
            setTimeout(() => {
                draw = true;
                showAlert("DRAW", "computer.png");

            }, 30)





        }
        else {
            p.forEach(function (element) { document.getElementById(element).children[0].src = (m == 1) ? "redcross.png" : "redzero.png" })
            setTimeout(() => {
                s = m == 1 ? 'P1 WIN' : 'P2 WIN';
                icon = m == 1 ? icon1 : icon2;

                showAlert(s, icon)


            }, 60)


        }





    }
}
function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min) + min);
}
function willwork(a) {
    let cell = ""

    if (l[0][0] == a && l[0][1] == a && l[0][2] == 0) {
        cell = doeswork(0, 2)

    }
    else if (l[0][1] == a && l[0][2] == a && l[0][0] == 0) {
        cell = doeswork(0, 0)

    }
    else if (l[0][0] == a && l[0][2] == a && l[0][1] == 0) {
        cell = doeswork(0, 1)
    }
    else if (l[1][0] == a && l[1][1] == a && l[1][2] == 0) {
        cell = doeswork(1, 2)
    }
    else if (l[1][1] == a && l[1][2] == a && l[1][0] == 0) {
        cell = doeswork(1, 0)
    }
    else if (l[1][0] == a && l[1][2] == a && l[1][1] == 0) {
        cell = doeswork(1, 1)
    }
    else if (l[2][0] == a && l[2][1] == a && l[2][2] == 0) {
        cell = doeswork(2, 2)
    }
    else if (l[2][1] == a && l[2][2] == a && l[2][0] == 0) {
        cell = doeswork(2, 0)
    }
    else if (l[2][0] == a && l[2][2] == a && l[2][1] == 0) {
        cell = doeswork(2, 1)
    }



    else if (l[0][0] == a && l[1][0] == a && l[2][0] == 0) {
        cell = doeswork(2, 0)
    }
    else if (l[1][0] == a && l[2][0] == a && l[0][0] == 0) {
        cell = doeswork(0, 0)
    }
    else if (l[0][0] == a && l[2][0] == a && l[1][0] == 0) {
        cell = doeswork(1, 0)
    }
    else if (l[0][1] == a && l[1][1] == a && l[2][1] == 0) {
        cell = doeswork(2, 1)
    }
    else if (l[1][1] == a && l[2][1] == a && l[0][1] == 0) {
        cell = doeswork(0, 1)
    }
    else if (l[0][1] == a && l[2][1] == a && l[1][1] == 0) {
        cell = doeswork(1, 1)
    }
    else if (l[0][2] == a && l[1][2] == a && l[2][2] == 0) {
        cell = doeswork(2, 2)
    }
    else if (l[1][2] == a && l[2][2] == a && l[0][2] == 0) {
        cell = doeswork(0, 2)
    }
    else if (l[0][2] == a && l[2][2] == a && l[1][2] == 0) {
        cell = doeswork(1, 2)
    }
    else if (l[0][0] == a && l[1][1] == a && l[2][2] == 0) {
        cell = doeswork(2, 2)
    }
    else if (l[1][1] == a && l[2][2] == a && l[0][0] == 0) {
        cell = doeswork(0, 0)
    }
    else if (l[0][0] == a && l[2][2] == a && l[1][1] == 0) {
        cell = doeswork(1, 1)
    }
    else if (l[2][0] == a && l[1][1] == a && l[0][2] == 0) {
        cell = doeswork(0, 2)
    }
    else if (l[1][1] == a && l[0][2] == a && l[2][0] == 0) {
        cell = doeswork(2, 0)
    }
    else if (l[2][0] == a && l[0][2] == a && l[1][1] == 0) {
        cell = doeswork(1, 1)
    }
    else if (list.indexOf(5) != -1 && l[1][1] == 0) {
        cell = doeswork(1, 1)
    }
    return cell
}
function doeswork(a, b) {
    cell = 'r' + (a + 1) + (b + 1);
    l[a][b] = 2;

    list.splice(list.indexOf(3 * a + b), 1)

    return cell
}
function computermove() {
    if (!mode) return

    var element = createNewElement('zero.png');

    var cell = "";

    cell = willwork(2)
    if (cell === "") cell = willwork(1)



    if (cell === "") {
        const indslice = getRandomInt(0, list.length);
        const ind = list[indslice];
        list.splice(indslice, 1);
        if (ind < 3) {
            cell = 'r1' + (ind + 1);
            l[0][ind] = 2;
        } else if (ind < 6) {
            cell = 'r2' + (ind - 2);
            l[1][ind - 3] = 2;
        } else if (ind < 9) {
            cell = 'r3' + (ind - 5);
            l[2][ind - 6] = 2;
        }
        console.log(ind)
    }


    if (mode)
        document.getElementById(cell).appendChild(element);


}

function handleClick(cell, icon1, icon2) {



    if (mode) {

        if (l[parseInt(cell.id[1]) - 1][parseInt(cell.id[2]) - 1] == 0) {

            var element = createNewElement('cross.png');
            var int1 = parseInt(cell.id[1]) - 1
            var int2 = parseInt(cell.id[2]) - 1

            l[int1][int2] = 1;
            list.splice(list.indexOf(int1 * 3 + int2), 1);


            cell.appendChild(element);
            count++;
            check(icon1, icon2)
            setTimeout(() => {
                if (mode && !draw) computermove()

                if (!draw && mode) check(icon1, icon2)
            }, 20)

        }



    }




    else {
        if (l[parseInt(cell.id[1]) - 1][parseInt(cell.id[2]) - 1] == 0) {
            var element = count % 2 === 0 ? createNewElement('cross.png') : createNewElement('zero.png');
            l[parseInt(cell.id[1]) - 1][parseInt(cell.id[2]) - 1] = count % 2 == 0 ? 1 : 2;
            cell.appendChild(element);
            count++;
        }
        setTimeout(check(icon1, icon2), 5);
    }


}


function computer() {
    var icon1
    select("PLAYER").then((icon1t) => {
        icon1 = icon1t
        icon2 = "computer.png"
        if (mode) return;
        mode = true
        const classPlayers=document.createElement('class')
        classPlayers.innerHTML=`
        <div >
        <h2>PLAYER:<img class="image" src=${icon1}></h2>
     
        </div>
        `
        headingmain=document.getElementById('heading')
        headingmain.remove()
        document.getElementById('computer').style.display = 'none';
        document.getElementById('players').style.display = 'none';
        document.getElementById('mode').appendChild(classPlayers)
        document.getElementById('players').style.display = "none";

        const tds = document.querySelectorAll('td');
        count = 0
        l = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        tds.forEach((td) => {
            while (td.firstChild) {
                td.removeChild(td.firstChild);
            }
        });
    })

    var cells = document.querySelectorAll('td');

    cells.forEach(function (cell) {

        cell.addEventListener('click', () => (handleClick(cell, icon1, icon2)));
    });
}
function player2() {
    var icon1, icon2;
    select("PLAYER 1").then((icon1t) => {
        icon1 = icon1t
        return select("PLAYER 2");
    }).then((icon2t) => {
        icon2 = icon2t

        mode = false;
        const classPlayers=document.createElement('class')
        classPlayers.innerHTML=`
        <div >
        <h2>PLAYER 1:<img class="image" src=${icon1}></h2>
        <h2>PLAYER 2:<img class="image" src=${icon2}></h2> 
        </div>
        `
        headingmain=document.getElementById('heading')
        headingmain.remove()
        document.getElementById('computer').style.display = 'none';
        document.getElementById('players').style.display = 'none';
        document.getElementById('mode').appendChild(classPlayers)
        count = 0;
        l = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        const tds = document.querySelectorAll('td');
        tds.forEach((td) => {
            while (td.firstChild) {
                td.removeChild(td.firstChild);
            }
        });

        var cells = document.querySelectorAll('td');
        cells.forEach(function (cell) {
            cell.addEventListener('click', () => handleClick(cell, icon1, icon2));
        });
    })
}







document.getElementById('players').addEventListener('click', player2)
document.getElementById('computer').addEventListener('click', computer)