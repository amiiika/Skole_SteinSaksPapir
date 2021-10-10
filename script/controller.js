let pScore = 0;
let cScore = 0;
let downloadTimer;

//Hand consts
const playerHand = document.querySelector(".player-hand");
const computerHand = document.querySelector(".computer-hand");
const hands = document.querySelectorAll(".hands img");

//Winner const
const winner = document.querySelector(".winner");

// Fade in game
const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document. querySelector(".intro");
    const match = document.querySelector(".match");
    
    playBtn.addEventListener("Click", () =>{
        introScreen.classList.add("fadeOut");
        match.classList.add("fadeIn");
    });
};

// Start timer
const startTimer =() =>{
    const play = document.getElementById("startbutton");
    const options = document.getElementById("options");

    play.addEventListener("click", () => {
        let timeleft = 3;

        
        options.classList.add("visible");
        options.classList.remove("hidden");

        downloadTimer = setInterval(function() {
            document.getElementById("countdown").innerHTML = timeleft;
            timeleft -= 1;
            console.log(timeleft);

            if (timeleft < 0) {
                cScore++;
                winner.textContent = "Computer won";
                options.classList.add("hidden");
                options.classList.remove("visible");
                updateScore();
                clearInterval(downloadTimer);
            }

            
        }, 1000);
    });
};

//Animation

const play2 = document.getElementById("startbutton");

play2.addEventListener("click", () => {

    document.querySelectorAll(".hand").forEach((hand) => {
        hand.classList.add("running");
    });

    playerHand.style.animationName = "shakePlayer";
    playerHand.style.animationDuration = "3s";
    computerHand.style.animationName = "shakeComputer";
    computerHand.style.animationDuration = "3s";
};




//call all the funcions
startGame();

