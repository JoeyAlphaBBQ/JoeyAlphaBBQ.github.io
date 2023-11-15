const btnEl = document.getElementById("btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const guess = document.getElementById("guess");
const accuracy = document.getElementById("accuracy");
const attempt = document.getElementById("attempt");
const scoreboard = document.getElementById("scoreboard");
const greeting = document.getElementById("greeting");
const add_player = document.getElementById("add_player");
const player_name = document.getElementById("player_name");
const gameUI = document.getElementById("gameUI");
const test = document.getElementById("test");
const edit_name = document.getElementById("edit_name");
const new_name = document.getElementById("new_player_name");

// turn function on/off
let display_accuracy = true;
let display_attempt = true;

class Player{
  constructor(name){
    this.name = name;
    this.score = 0;
    this.accuracy = 0;
    this.attempt = 0;
  }
}

let curPlayer = new Player(player_name.value);
let score_list = [curPlayer];

// initialize value
greeting.innerText = curPlayer.name;
add_player.style.display = "none"; 
edit_name.style.display = "none"; 
scoreboard.style.display = "none";  // off by default

let randNum = RNG();
let score = 0;
let curAccuracy = 0;
let curAttempt = 0;

// return to gameUI
document.getElementById("home_btn").onclick = function(){
  // close add player prompt
  add_player.style.display= "none";
  edit_name.style.display= "none";
  // open game UI 
  gameUI.style.display = "flex";
}

document.getElementById("add_player_btn").addEventListener("click",function(){
  // open add player prompt
  add_player.style.display= "inline";
  // close game UI to add new player
  gameUI.style.display = "none";
  edit_name.style.display= "none";
});

// add new player
add_player.addEventListener("submit",function(e){
  e.preventDefault(); // stop form from submitting
  // create a new player
  curPlayer = new Player(player_name.value);
  score_list.push(curPlayer); // also add to scoreboard
  update_scoreboard();
  greeting.innerText=curPlayer.name;
  // close add player prompt
  add_player.style.display= "none";
  edit_name.style.display= "none";
  // open game UI with added player
  gameUI.style.display = "flex";
})

// change current player name prompt
document.getElementById("edit_name_btn").onclick = function(){
  new_name.value = curPlayer.name;
  // close add player prompt
  edit_name.style.display= "inline";
  // close game UI 
  gameUI.style.display = "none";
  add_player.style.display= "none";
}

// update player name
edit_name.addEventListener("submit",function(e){
  e.preventDefault(); // stop form from submitting
  // create a new player
  curPlayer.name = new_name.value;
  greeting.innerText=curPlayer.name;
  // close change name prompt
  edit_name.style.display= "none";
  add_player.style.display= "none";
  // open game UI with new player name
  gameUI.style.display = "flex";
})

// turn on/off scoreboard
document.getElementById("scoreboard_btn").onclick = function(){
  if(scoreboard.style.display != "none") {
    document.getElementById("scoreboard_btn").innerText="Scoreboard: Off";
    scoreboard.style.display = "none";
  }else{
    document.getElementById("scoreboard_btn").innerText="Scoreboard: On";
    scoreboard.style.display = "flex";
    update_scoreboard();
  } 
}

function update_scoreboard(){
  let best_accuracy = score_list[0];
  let best_score = score_list[0];
  let s = ""; // to hold score content
  for(let i =0; i < score_list.length; i++){
    s = s.concat(score_list[i].name, ", score: ", score_list[i].score);
    s = s.concat(", Accuracy: ", score_list[i].accuracy, "%<br>");
    if(best_accuracy.accuracy < score_list[i].accuracy) best_accuracy = score_list[i];
    if(best_score.score < score_list[i].score) best_score = score_list[i];
  }
  let b = "Best score is ";
  b = b.concat(best_score.score, " points by ", best_score.name);
  b = b.concat("<br> Best accuracy is ", best_accuracy.accuracy, "% by ", best_accuracy.name);
  document.getElementById("best_score").innerHTML = b;
  document.getElementById("score_content").innerHTML = s;
}

function RNG() {
  return Math.floor(Math.random() * 100) + 1;
}

function checkGuess() {
  let curGuess = guess.value;
  curPlayer.attempt++;
  if (curGuess < randNum) {
    resultEl.innerText = "Low";
  } else if (curGuess > randNum) {
    resultEl.innerText = "High";
  } else if (curGuess == randNum) {
    resultEl.innerText = "Correct!";
    curPlayer.score ++;
    scoreEl.innerText = curPlayer.score;
    randNum = RNG();
  }
  curPlayer.accuracy = Math.round(curPlayer.score/curPlayer.attempt *100); // round to percentage
  attempt.innerText = `Attempt: ${curPlayer.attempt}`;
  if(!display_attempt) attempt.innerText = "";
  accuracy.innerText = `Accuracy: ${curPlayer.accuracy}%`;
  if(!display_accuracy) accuracy.innerText = "";
  update_scoreboard();
}

btnEl.addEventListener("click", checkGuess);
window.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkGuess();
  }
});

