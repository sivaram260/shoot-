//variables and constants
const gameBody = document.getElementById("game-body");
const $lives = document.getElementById("lives");
var seconds = document.getElementById("timer").textContent;


const timeGauge = document.getElementById("timeGauge");

const questionTime = 60;
const gaugeWidth = 1915;
const gaugeUnit = gaugeWidth / questionTime;

var zombieId = 0;
const img = [
"zombie-1.png",
"zombie-2.png",
"zombie-4.png",
"zombie-5.png",
"zombie-6.png",
"brain.png",
"zombie-hand.png",
];
// shotgun sound
const expAudio = new Audio(
"https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav"
);
expAudio.volume = 0.2;
gameBody.onclick = () => {
expAudio.pause();
expAudio.currentTime = 0;
expAudio.play();
};
// background sound
const backgroundSound = new Audio(
"https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3"
);
backgroundSound.play();
backgroundSound.loop = true;

//lives
const maxlives = 4;
var lives = 4;

//Function to make a zombie
let score=0;
function makeZombie() {
randomImage = img[getRandomInt(0, img.length)];
gameBody.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieId}">`;
let zombie = document.getElementById("zombie" + zombieId);
zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
console.log("zombie" + zombieId)
zombie.onclick = () => {
score++;
zombieDestruct(zombie);
console.log("score",score);
document.getElementById("score").textContent=score;
};


}

// Function to check if the player missed a zombie

function checkCollision(zombie) {
if (zombie.getBoundingClientRect().top <= 0) {
lives--;
return true;
}
if(lives===0){
location.href = "./runner.html";
}
return false;

}

function zombieDestruct(zombie) {
zombie.style.display = "none";
zombieId++;
makeZombie();
}

//End Game

function endGame(status) {
backgroundSound.pause();
console.log("status",status)
console.log("game-over");
if(score>10){
location.href = "./win.html";

}
else{
location.href = "./runner.html";

}
}

// Timer

var timer = setInterval(function () {
seconds++;
timeGauge.style.width = seconds * gaugeUnit + "px";
console.log( timeGauge.style.width = seconds * gaugeUnit + "px" )

document.getElementById("timer").textContent = seconds;
let zombie = document.getElementById("zombie" + zombieId);
if (checkCollision(zombie) == true) {
zombieDestruct(zombie);
if (lives == 60) {
clearInterval(timer);
endGame("lost");
}
}
if (seconds == 60) {
clearInterval(timer);
endGame("won");
}
}, 1000);

makeZombie(zombieId);

//helper function to get random integer

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}