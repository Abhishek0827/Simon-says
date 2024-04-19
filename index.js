let gameSeq = [];
let userSeq = [];
let start = false;
let level = 0;
let allBtns = document.querySelectorAll(".btn");
let colorArray = ["red", "peach", "blue", "green"];
let mobileText = document.querySelector(".mobileText");
let mobileStartBtn = document.querySelector(".mobileStartBtn");

function startGame() {
  if (start == false) {
    start = true;
    levelUp();
    document.querySelector("h1").innerText = "GAME STARTED";
  }
}
document.addEventListener("keypress", () => {
  startGame();
});
mobileStartBtn.addEventListener("click", () => {
  startGame();
});
function levelUp() {
  setTimeout(() => {
    userSeq = [];
    level++;
    document.querySelector("h2").innerText = `LEVEL ${level}`;
    mobileText.innerHTML = `LEVEL ${level}`;
    let randomColor = colorArray[Math.floor(Math.random() * 4)];
    let randomBtn = document.getElementById(`${randomColor}`);
    gameSeq.push(randomColor);
    gameFlash(randomBtn);
  }, 300);
}
function checkSeq(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 400);
    }
  } else {
    document.querySelector(
      "h2"
    ).innerHTML = `Level ${level} failed <br>Press any key to start again..`;
    document.querySelector("h1").innerText = "GAME OVER";
    mobileText.innerHTML = `Level ${level} failed <br>Press the red button to start again..`;
    document.body.style.backgroundColor="red";
    let sound = new Audio("lose.mp3");
    sound.play();
    setTimeout(()=>{
        document.body.style.backgroundColor="white";
    },100)
    resetGame();
  }
}
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("flash2");
  setTimeout(() => {
    btn.classList.remove("flash2");
  }, 200);
}

function userClk() {
  if (start == true) {
    let tap=new Audio("tap.mp3");
    tap.play();
    userFlash(this);
    let btn = this;
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkSeq(userSeq.length - 1);
  }
}

for (let btn of allBtns) {
  btn.addEventListener("click", userClk);
}
function resetGame() {
  start = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
