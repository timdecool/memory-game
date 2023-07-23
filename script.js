const espaceCartes = document.getElementById('espace_cartes');
let pairesTrouvees = 0;
let cartesActives = [];
let tentatives = 0;
let meilleurScore = 0;
let freezeClick = false;
document.addEventListener("click", freezeClickFn, true);

function newGame() {
    // Vider l'espace jeu avant de le remplir à nouveau
    while(espaceCartes.firstChild) {
        espaceCartes.removeChild(espaceCartes.firstChild);
    }

    tentatives = 0;
    document.getElementById('tentatives').innerText = "Tentatives : " + tentatives;
    document.getElementById('statut').innerText = "";
    pairesTrouvees = 0;

    // tableau des classes à distribuer aléatoirement
    let gameClasses = ["ours", "ours", "zebre", "zebre", "renard", "renard", "phoque", "phoque", "pandaroux", "pandaroux", "loutre", "loutre", "daims", "daims", "loup", "loup"];

    // Créer les 16 slots du jeu
    for (let i=0; i<16; i++) {

        // Créer un slot, lui donner les classes de base et le placer dans l'espace jeu
        let slot = document.createElement("div");
        espaceCartes.appendChild(slot);

        // Sélectionner une classe "Animal" au hasard
        let gameClassIndex = Math.floor(Math.random()*gameClasses.length);        
        let gameClass = gameClasses[gameClassIndex];
        slot.classList.add(gameClass);
        gameClasses.splice(gameClassIndex, 1);
        slot.classList.add("card", "card_back");

        // Ajouter l'event listener pour révéler la carte au clic
        slot.addEventListener('click', function(){
            revelerCarte(this);
        })
    }
}

function revelerCarte(slot) {
    if (slot.classList[2] == "card_back") {
        slot.classList.remove("card_back");
        cartesActives.push(slot);
        console.log(slot.classList)
    
        if (cartesActives.length == 2) {
            comparerCartes();
        }
    }
}

function comparerCartes() {
    tentatives = tentatives + 1;
    document.getElementById('tentatives').innerText = "Tentatives : " + tentatives;
    
    if (cartesActives[0].classList[0] == cartesActives[1].classList[0]) {
        document.getElementById('statut').innerText = "Et une paire de trouvée !"
        pairesTrouvees++;
        cartesActives = [];

        if (pairesTrouvees == 8) {
            document.getElementById('statut').innerText = "C'est gagné, bravo !"
            if (meilleurScore == 0 || meilleurScore > tentatives) {
                meilleurScore = tentatives;
                document.getElementById('highscores').innerText = "Meilleur score : " + meilleurScore;
            }
        }
    } else {
        document.getElementById('statut').innerText = "Raté, essaye encore.";
        freezeClick = true;
        setTimeout(function() {
            cartesActives[0].classList.add("card_back");
            cartesActives[1].classList.add("card_back");
            freezeClick = false;
            cartesActives = [];
        }, 1000);
    }

}

function freezeClickFn(e) {
    if (freezeClick) {
        e.stopPropagation();
        e.preventDefault();
    }
}

newGame();