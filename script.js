const emojiPool = ['🍎','🍌','🍇','🍓','🍍','🥝','🍉','🍑','🍒','🍋','🥥','🍐','🥭','🥕','🌽','🍆','🐶','🐱'];
const board1=document.getElementById("board");
const moves1=document.getElementById("moves");
const timel= document.getElementById('time');
const matchesl= document.getElementById('matches');
const difficultel = document.getElementById('difficulte');
const win1= document.getElementById('win');
const finalMoves1= document.getElementById('finalMoves');
const finalTime1= document.getElementById('finalTime');
const playAgain1= document.getElementById('playAgain');
const close1= document.getElementById('close');
const restart1 = document.getElementById("restart");
const shuffle1 = document.getElementById("shuffle");
const showall1 = document.getElementById("showall");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;
let totalPairs = 8;
let timerInterval = null;
let startTime = null;

function creerPlateau() {
    board1.innerHTML = ""; 
    matches = 0;
    moves = 0;
    moves1.textContent = moves;
    matchesl.textContent = matches;

    const niveau = difficultel.value;
 if (niveau === "easy") totalPairs = 8;
 if (niveau === "medium") totalPairs = 16;
 if (niveau === "hard") totalPairs = 32;
 let cartes = [];
 for (let i = 0; i < totalPairs; i++){
    cartes.push(emojiPool[i], emojiPool[i]);
 }

 cartes.sort(() => Math.random() - 0.5);

 cartes.forEach(function(symbol) {
     const carte = document.createElement("div");
     carte.classList.add("card");
     carte.dataset.symbol = symbol;
     const front = document.createElement("div");
     front.classList.add("card-front");
     front.textContent = symbol;
     const back = document.createElement("div");
     back.classList.add("card-back");
     back.textContent = "?";

     carte.appendChild(front);
     carte.appendChild(back);
     carte.addEventListener("click", retournerCarte);
     board1.appendChild(carte);
    });
 startTime = new Date();
 clearInterval(timerInterval);
 timerInterval = setInterval(updateTime, 1000);
}
function updateTime() {
    const now = new Date();
    const diff = Math.floor((now - startTime)/1000);
    const minutes = String(Math.floor(diff/60)).padStart(2,'0');
    const seconds = String(diff % 60).padStart(2,'0');
    timel.textContent = minutes + ":" + seconds;
}
function retournerCarte() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    moves1.textContent = moves;
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matches++;
        matchesl.textContent = matches;
        firstCard.removeEventListener("click", retournerCarte);
        secondCard.removeEventListener("click", retournerCarte);
        resetSelection();

        if (matches === totalPairs) victoire();
    } else {
        lockBoard = true;
        setTimeout(function() {
         firstCard.classList.remove("flipped");
         secondCard.classList.remove("flipped");
         resetSelection();
         }, 1000);
    }
}
creerPlateau()