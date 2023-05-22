"use strict";
import { currScore } from "./Ball.js";
import {score } from "./Ball.js";
// importing 
import Ball from "./Ball.js";
import Pad from "./Pad.js";

// holder or listeners
const ball = new Ball(document.getElementById('ball'));
const left_pad = new Pad(document.getElementById('pad-left'));
const right_pad = new Pad(document.getElementById('pad-right'));
const high = document.getElementById('high-score');

// variables
let lastTime; // to hold the value of time of the last frame
let xValue = 40; // factor by which pad will move

// storing and accessing global score from local storage
let globalScore = window.localStorage.getItem("globalScore"); // Retrieve global score from local storage
console.log(globalScore);

if (globalScore == null) {
  alert("This is your first time");
  localStorage.setItem("globalScore", "0"); // Store initial global score as string
  globalScore = "0"; // Set globalScore variable to "0" as default
}

// Convert globalScore to a number if needed
globalScore = parseInt(globalScore);

high.innerHTML = globalScore;

let isGameRunning = false;

// update functions to keep update the position in the game
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime; // to hold time value btw two frames so we can make our position calculation according to it
    // that's why we are also passing delta as a parameter to update
    ball.update(delta, [left_pad.info(), right_pad.info()]);

    // to check if ball is missed
    if (ballOut()) {
      gameReset();
    }
  }

  lastTime = time;
  // this will create an infinite loop and our function will
  // keep on running. It's better than setInterval as it makes frames much smoother
  if (isGameRunning) {
    window.requestAnimationFrame(update);
  }
}

// function to check if ball is out or not
function ballOut() { 
  const info = ball.getInfo();
  const container = document.getElementById('cont');
  const cont_info = container.getBoundingClientRect();
  return info.right >= cont_info.right || info.left <= cont_info.left;
}

// function to move the pads
function movePad(key) {
  if (key == 'ArrowUp' || key == 'W' || key == 'w') {
    if ((xValue -= 2) <= 6) {
      xValue = 6;
    } else {
      xValue -= 2;
    }
  }
  if (key == 'ArrowDown' || key == 'S' || key == 's') {
    if ((xValue += 2) >= 74) {
      xValue = 74;
    } else {
      xValue += 2;
    }
  }

  left_pad.position = xValue;
  right_pad.position = xValue;
}

// to move the pad when keys are pressed
window.addEventListener('keydown', function(event) {
  movePad(event.key);
});

// game logic is applied above
// now other functionalities are being added

// holding all three sections
const scoreSection = document.getElementById('score');
const gameSection = document.getElementById('cont');
const startSection = document.getElementById('start-menu');
const overSection = document.getElementById('game-over');

const start_game = document.getElementById('start-game');
// this will trigger the game start
start_game.addEventListener('click', startTheGame);

// this is the driver function of our program
function startTheGame() {
  console.log("start");
  overSection.classList.add('hide');
  // first hide and unhide sections
  startSection.classList.toggle('hide');
  gameSection.classList.toggle('hide');
  scoreSection.classList.toggle('hide');
  // currScore=0;
  isGameRunning = true;
  window.requestAnimationFrame(update);
}

let hope = false;
// to reset the game
function gameReset() {
  ball.reset();
  right_pad.reset();
  left_pad.reset();

  isGameRunning = false;

  if (globalScore < currScore) {
    globalScore = currScore;
  }
  else
  {
    globalScore=globalScore;
  }
  localStorage.setItem("globalScore",globalScore);
  score.innerHTML = 0;
  high.innerHTML = globalScore;

  overSection.classList.toggle('hide');
  document.getElementById('over-score').innerHTML = currScore;
  document.getElementById('over-high').innerHTML = globalScore;
  localStorage.setItem("globalScore", globalScore);
  
}

function restart() {
    location.reload();
}

const retryButton = document.getElementById('issue');
retryButton.addEventListener('click', restart);
