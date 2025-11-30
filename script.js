// Initialisation
const emojiPool = [
  '🍎','🍌','🍇','🍓','🍍','🥝','🍉','🍑','🍒','🍋',
  '🥥','🍐','🥭','🥕','🌽','🍆','🐶','🐱','🦊','🐸',
  '🐵','🐷','🐔','🦄','🐰','🐻','🐼','🐨','🐯','🦁',
  '🐴','🐙','🦋','🌸','🌞','🌙','⭐','⚡','🔥','💧'
];

// Liste des emojis utilisés pour créer les cartes

// Récuperation des éléments du DOM
const board1 = document.getElementById("board"); // plateau du jeu
const moves1 = document.getElementById("moves"); // compteur de coups
const timel = document.getElementById('time'); // .. de temps
const matchesl = document.getElementById('matches'); // .. de paires
const difficultel = document.getElementById('difficulte'); //  difficulté
const win1 = document.getElementById('win'); // fenetre victoure
const finalMoves1 = document.getElementById('finalMoves'); // coups finaux
const finalTime1 = document.getElementById('finalTime'); // temps final
const playAgain1 = document.getElementById('playAgain'); // bouton rejouer
const close1 = document.getElementById('close'); // bouton fermer fenetre
const restart1 = document.getElementById("restart"); // bouton redémarrer
const shuffle1 = document.getElementById("shuffle"); // bouton mélanger
const showall1 = document.getElementById("showall"); // bouton montrer toutes les cartes

// Variables de jeu
let firstCard = null; // 1ere carte sélectionnée
let secondCard = null; // 2eme
let lockBoard = false; // verrou pour empêcher clic multiple
let moves = 0; // compteur de coups
let matches = 0; // .. de paires trouvées
let totalPairs = 8; // nbre total de paires selon difficulté
let timerInterval = null; // intervalle du chrono
let startTime = null; //  du début du jeu

// Création du plateau
function creerPlateau() {
    board1.innerHTML = ""; // vide le plateau
    matches = 0;
    moves = 0;
    moves1.textContent = moves; // réinitialise nbre des coups
    matchesl.textContent = matches; // réinitialise nbre paires

    // Définir le nombre de paires selon la difficulté
    const niveau = difficultel.value;
    if (niveau === "easy") totalPairs = 8;
    if (niveau === "medium") totalPairs = 16;
    if (niveau === "hard") totalPairs = 32;

    // Créer un tableau avec les paires
    let cartes = [];
    for (let i = 0; i < totalPairs; i++){
        cartes.push(emojiPool[i], emojiPool[i]); // chaque emoji *2
    }

    // Mélanger les cartes aléatoirement
    cartes.sort(() => Math.random() - 0.5);

    // Ajouter les cartes dans le DOM
    cartes.forEach(function(symbol) {
        const carte = document.createElement("div");
        carte.classList.add("card");
        carte.dataset.symbol = symbol; // stocke l’emoji pour comparaison

        const inner = document.createElement("div");
        inner.classList.add("card-inner");

        const front = document.createElement("div");
        front.classList.add("card-front");
        front.textContent = symbol; // emoji visible quand carte retournée

        const back = document.createElement("div");
        back.classList.add("card-back");
        back.textContent = "?"; // arrière de la carte

        // Construction DOM : front/back → inner → carte
        inner.appendChild(front);
        inner.appendChild(back);
        carte.appendChild(inner);

        // Ajouter l’événement clic pour retourner la carte
        carte.addEventListener("click", retournerCarte);

        // Ajouter la carte au plateau
        board1.appendChild(carte);
    });

    // Démarrer le chronoo
    startTime = new Date();
    clearInterval(timerInterval); // supprimer intervalle précédent
    updateTime(); // afficher 0:00 immédiatement
    timerInterval = setInterval(updateTime, 1000); // mise à jour chaque sec
}

// compteur de temps
function updateTime() {
    const now = new Date();
    const diff = Math.floor((now - startTime)/1000); // différence en sec
    const minutes = String(Math.floor(diff/60)).padStart(2,'0'); // minutes
    const seconds = String(diff % 60).padStart(2,'0'); // sec
    timel.textContent = minutes + ":" + seconds; // affichage dans DOM
}
// Retourner une carte
function retournerCarte() {
    if (lockBoard) return; // ne rien faire (si verrouillé =true)
    if (this === firstCard) return; // éviter de cliquer sur la meme carte

    this.classList.add("flipped"); // affiche le front de la carte

    // Si c’est 1ere carte sélectionnée
    if (!firstCard) {
        firstCard = this;
        return;
    }

    // Sinon c’est la 2eme
    secondCard = this;
    moves++;
    moves1.textContent = moves; // mise à jour nbre coups

    // Vérifier si les cartes sont identiques
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matches++;
        matchesl.textContent = matches; // mise à jour nbre paires
        // Désactiver le clic sur ces cartes
        firstCard.removeEventListener("click", retournerCarte);
        secondCard.removeEventListener("click", retournerCarte);
        resetSelection(); // réinitialiser sélection

        // Verifier si toutes les paires sont trouvées
        if (matches === totalPairs) victoire();
    } else {
        // Sinon retourner les cartes après 1s
        lockBoard = true;
        setTimeout(function() {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetSelection();
        }, 1000);
    }
}

// Réinitialiser selection
function resetSelection() {
    [firstCard, secondCard] = [null, null]; // reinitialiser cartes
    lockBoard = false; // débloquer plateau
}

// Victoire et score
function victoire() {
    clearInterval(timerInterval); // arrêter chrono
    finalMoves1.textContent = moves; // afficher coups finaux
    finalTime1.textContent = timel.textContent; // afficher temps final

    // Calcul du score
    const timeParts = timel.textContent.split(":");
    const totalSeconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
    const score = Math.round((totalPairs * 1000) / (moves * totalSeconds));

    // Stocker dans localStorage
    let scores = JSON.parse(localStorage.getItem("memory_scores")) || [];
    scores.push({
        score: score,
        moves: moves,
        time: timel.textContent,
        pairs: totalPairs
    });
    // Trier du meilleur au pire
    scores.sort(function(a, b) { return b.score - a.score; });
    // Garde seulement les 2 meilleurs scores
    scores = scores.slice(0, 2);
    localStorage.setItem("memory_scores", JSON.stringify(scores));

    // Afficher les meilleurs scores
    const recordElement = document.getElementById("record");
    recordElement.innerHTML = "";
    scores.forEach(function(s, index) {
        recordElement.innerHTML += `${index+1}. Score: ${s.score} pts - Coups: ${s.moves} - Temps: ${s.time} - Paires: ${s.pairs}<br>`;
    });

    win1.style.display = "flex"; // montrer fenetre victoire
}

// Boutons
playAgain1.addEventListener("click", function () {
    win1.style.display = "none"; // fermer fenetre
    creerPlateau(); // recréer plateau
});

close1.addEventListener("click", function () {
    win1.style.display = "none"; 
});

restart1.addEventListener("click", creerPlateau); // redemarrer
shuffle1.addEventListener("click", creerPlateau); // melanger

// Montrer toutes les cartes temporairement
showall1.addEventListener("click", function () {
    lockBoard = true; // verrouiller plateau
    document.querySelectorAll(".card").forEach(function (c) { c.classList.add("flipped"); });
    setTimeout(function () {
        document.querySelectorAll(".card").forEach(function (c) { c.classList.remove("flipped"); });
        lockBoard = false; // debloquer plateau
    }, 2000);
});
// Video et son
const bg = document.getElementById("bg"); // video de fond
const b = document.getElementById("son"); // bouton son

bg.playbackRate = 0.8; // vitesse *0.5

// Boucle de 0 a 24 s
bg.addEventListener("timeupdate", function() {
    if (!bg.paused && bg.currentTime >= 24) {
        bg.currentTime = 0;
    }
});

// Activer le son au clic
b.addEventListener("click", function() {
    bg.muted = false;
    bg.play();
    b.style.display = 'none';
});


// Démarrer le jeu
creerPlateau();
