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
     const inner = document.createElement("div");
     inner.classList.add("card-inner");
     const front = document.createElement("div");
     front.classList.add("card-front");
     front.textContent = symbol;
     const back = document.createElement("div");
     back.classList.add("card-back");
     back.textContent = "?";
     inner.appendChild(front);
     inner.appendChild(back);
     carte.appendChild(inner);
     carte.addEventListener("click", retournerCarte);
     board1.appendChild(carte);
    });
 startTime = new Date();
 clearInterval(timerInterval);
 updateTime();
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
function resetSelection() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
function victoire() {
    clearInterval(timerInterval);
    finalMoves1.textContent = moves;
    finalTime1.textContent = timel.textContent;
    const timeParts = timel.textContent.split(":");
    const totalSeconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
    const score = Math.round((totalPairs * 1000) / (moves * totalSeconds));
    let scores = JSON.parse(localStorage.getItem("memory_scores")) || [];

    scores.push({
        score: score,
        moves: moves,
        time: timel.textContent,
        pairs: totalPairs
    });
    scores.sort(function(a, b) {
        return b.score - a.score;
    });
    scores = scores.slice(0, 2);
    localStorage.setItem("memory_scores", JSON.stringify(scores));
    const recordElement = document.getElementById("record");
    recordElement.innerHTML = "";
    scores.forEach(function(s, index) {
        recordElement.innerHTML += `${index+1}. Score: ${s.score} pts - Coups: ${s.moves} - Temps: ${s.time} - Paires: ${s.pairs}<br>`;
    });
    win1.style.display = "flex";
}

playAgain1.addEventListener("click", function () {
    win1.style.display = "none";
    creerPlateau();
});

close1.addEventListener("click", function () {
    win1.style.display = "none";
});
restart1.addEventListener("click", creerPlateau);

shuffle1.addEventListener("click", creerPlateau);

showall1.addEventListener("click", function () {
     lockBoard = true;
     document.querySelectorAll(".card").forEach(function (c) {
        c.classList.add("flipped");
    });
    setTimeout(function () {
        document.querySelectorAll(".card").forEach(function (c) {
            c.classList.remove("flipped");
        });
         lockBoard = false;
    }, 2000);

});
const bg = document.getElementById("bg");
const b = document.getElementById("son");


bg.playbackRate = 0.8;


bg.addEventListener("timeupdate", function() {
  if (!bg.paused && bg.currentTime >= 24) {
    bg.currentTime = 0;
  }
});


b.addEventListener("click", function() {
  bg.muted = false;      
  bg.play();              
  b.style.display = 'none'; 
});



creerPlateau()