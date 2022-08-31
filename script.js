const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const minuteSpan = document.querySelector("#minute");
const secondSpan = document.querySelector("#second");
const short = document.querySelector("#short");
const long = document.querySelector("#long");
const pomodoro = document.querySelector("#pomodoro");
const modeBtns = document.querySelector("#mode-btns");
const allModes = document.querySelectorAll("button[data-mode]");
const progressBarLine = document.querySelector(".bar-line");

var workSound = new Audio("./sound/get-back-to-work.mp3");
var breakSound = new Audio("./sound/get-some-break.mp3");

let minutes = 25;
let seconds = 0;
let mode = "pomodoro";
let pomodoroCount = 1;
let interval;
let color = "#2B4865";
let lineWidth = 0;

let remainingTime = {
  seconds: 0,
  minutes: 0,
  isFull: false,
};

function isDigit(n) {
  return n <= 9 ? "0" + n : n;
}
const startTimer = () => {
  startBtn.style.display = "none";
  stopBtn.style.display = "block";
  if (remainingTime.isFull) {
    minutes = remainingTime.minutes;
    seconds = remainingTime.seconds;
  }
  timer(minutes, seconds, mode);
};
const stopTimer = () => {
  clearInterval(interval);

  remainingTime.minutes = minuteSpan.innerHTML.slice(-1);
  remainingTime.seconds = secondSpan.innerHTML;
  remainingTime.isFull = true;

  startBtn.style.display = "block";
  stopBtn.style.display = "none";
};

const timer = (minutes, seconds, mode) => {
  interval = setInterval(() => {
    if (seconds <= 0) {
      seconds = 60;
      minutes--;
    }
    seconds--;
    showProgressBar(mode);
    minuteSpan.innerHTML = isDigit(minutes);
    secondSpan.innerHTML = isDigit(seconds);

    if (minutes == 0 && seconds == 0) {
      clearInterval(interval);

      switch (mode) {
        case "pomodoro":
          if (pomodoroCount % 4 === 0) {
            breakSound.play();
            changeMode("long");
          } else {
            breakSound.play();
            changeMode("short");
          }
          break;
        case "short":
          workSound.play();
          changeMode("pomodoro");
          break;
        case "long":
          workSound.play();
          changeMode("pomodoro");
          break;
      }
      console.log(mode);
    }
  }, 1000);
};

modeBtns.addEventListener("click", (event) => {
  mode = event.target.dataset.mode;
  if (!mode) return;
  lineWidth = 0;
  working = false;

  stopTimer();
  remainingTime.isFull = false;

  changeMode(mode);
});

function changeMode(mode) {
  allModes.forEach((e) => e.classList.remove("active"));
  document.querySelector(`[data-mode="${mode}"]`).classList.add("active");

  switch (mode) {
    case "short":
      mode = "short";
      minutes = 5;
      color = "#78b2a4";
      break;
    case "long":
      mode = "long";
      minutes = 15;
      color = "#256D85";
      break;
    case "pomodoro":
      mode = "pomodoro";
      minutes = 25;
      color = "#2B4865";
      pomodoroCount++;
      break;
  }

  seconds = 0;
  minuteSpan.innerHTML = isDigit(minutes);
  secondSpan.innerHTML = isDigit(seconds);
  document.body.style.backgroundColor = color;
  // console.log(mode);

  timer(minutes, seconds, mode);
  startBtn.style.display = "none";
  stopBtn.style.display = "block";
}
// --pomodoro: #2B4865;
// --short :#78b2a4;
// --long:#256D85;

function showProgressBar(mode) {
  switch (mode) {
    case "short":
      lineWidth += 0.3333333333333333;
      break;
    case "long":
      lineWidth += 0.1111111111111111;
      break;
    case "pomodoro":
      lineWidth += 0.0666666666666667;
      break;
  }
  progressBarLine.style.width = `${lineWidth}%`;
}
