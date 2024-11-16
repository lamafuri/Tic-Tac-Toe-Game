
const main = document.getElementById("main");
let divs = document.querySelectorAll(".sub");
const head = document.getElementById("head");
document.getElementById("restart").addEventListener("click", restart);
document.getElementById("replay").addEventListener("click", replay);
let boxPressBlock;
let boxElements = `<div class="sub" id="1"></div>
            <div class="sub" id="2"></div>
            <div class="sub" id="3"></div>
            <div class="sub" id="4"></div>
            <div class="sub" id="5"></div>
            <div class="sub" id="6"></div>
            <div class="sub" id="7"></div>
            <div class="sub" id="8"></div>
            <div class="sub" id="9"></div>`
console.log(head)
// console.log(divs);
const winPattern = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
let isCross = true;
head.innerText = "X Turn";
let i = 0;
main.addEventListener("click", gameProcess);
function gameProcess(event) {
    let a = event.target;
    if (a.innerText == "") {
        if (isCross) {
            a.innerText = "X";
            isCross = false;
            a.classList.add("x");
            head.innerText = "O Turn"
        }
        else if (!isCross) {
            a.innerText = "O";
            isCross = true;
            a.classList.add("o");
            head.innerText = "X Turn"
        }
    }
    i++;
    if (i >= 5) checkPat();
}
function emptyAllBox() {
    for (let x of divs) {
        x.innerText = "";
    }
    if (boxPressBlock) {
        main.addEventListener("click", gameProcess);
        boxPressBlock = true;
    }
    if (isCross) {
        isCross = false;
        head.innerText = "O Turn"
    }
    else if (!isCross) {
        isCross = true;
        head.innerText = "X Turn"
    }
}
function Timer() {
    main.classList.remove("main");
    main.classList.add("timer");
    for (let j = 3; j >= -1; j--) {
        setTimeout(() => {
            if (j > 0) main.innerText = j;
            else if (j == 0) {
                main.innerText = "GO";
            }
            else {
                main.classList.remove("timer");
                main.classList.add("main");
                main.innerHTML = boxElements;
                divs = document.querySelectorAll(".sub");
            }

        }, (4 - j) * 1000);
    }
}
function Win(winner) {
    head.innerText = winner + " is the Winner";
    main.removeEventListener("click", gameProcess);
    boxPressBlock = true;
}
function replay(event) {
    emptyAllBox();
    Timer();
}
function restart() {
    emptyAllBox();
    for (let box of divs) {
        box.classList.remove("x");
        box.classList.remove("o");

    }
}
function checkPat() {
    winPattern.forEach(pattern => {
        let check = [];
        for (let x of pattern) {
            check.push(divs[x - 1].innerText);
        }
        if (check[0] == check[1] && check[1] == check[2] && check[0] != "") {
            console.log("Winner is " + check[0]);
            Win(check[0]);
        }

    })
}

