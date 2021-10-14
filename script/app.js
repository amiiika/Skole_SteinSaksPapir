let game = () => {
    let pScore = 0;
    let cScore = 0;
    let downloadTimer;
    let dontRun = false;

    //option button const
    const optionsBtn = document.querySelectorAll(".options button");
    const optionsDiv = document.getElementById("options");


    // hands const
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    //update text
    const winner = document.querySelector(".winner");


    //fade in game
    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");

        playBtn.addEventListener("click", () => {
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };


    //Start timer
    const startTimer = () => {
        const play = document.getElementById("startbutton");
        const options = document.getElementById("options");

        //Play button
        play.addEventListener("click", () => {
            options.classList.add("visible");
            options.classList.remove("hidden");
            winner.textContent = "Choose an option";

            //start animation
            document.querySelectorAll(".hand").forEach((hand) => {
                hand.classList.remove("paused");
                hand.classList.add("running");
            });

            let timeleft = 3;
            
            downloadTimer = setInterval(function () {
                document.getElementById("countdown").innerHTML = timeleft;
                timeleft -= 1;
                console.log(timeleft);

                //choose too late
                if (timeleft < 0) {
                    cScore++;
                    winner.textContent = "Computer won";
                    options.classList.add("hidden");
                    options.classList.remove("visible");
                    updateScore();
                    clearInterval(downloadTimer);
                    console.log("after 0")
                }



                //animation
                playerHand.style.animationName = "shakePlayer";
                playerHand.style.animationDuration = "3s";
                computerHand.style.animationName = "shakeComputer";
                computerHand.style.animationDuration = "3s";

            }, 1000);
            //choose too early
            optionsBtn.forEach((option) => {
                option.addEventListener("click", function () {

                    if (timeleft > 0) {
                        console.log(timeleft);
                        noRun();
                        winner.textContent = "Computer won";
                        options.classList.add("hidden");
                        options.classList.remove("visible");
                        updateScore();
                        clearInterval(downloadTimer);
                        console.log("before 0")
                    }
                });
            });
        });
    };

    //Play Match
    const playMatch = () => {

        hands.forEach((hand) => {
            hand.addEventListener("animationend", function () {
                this.style.animation = "";
            });
        });

        //computers options
        const computerOptions = ["Rock", "Paper", "Scissors"];

        optionsBtn.forEach((option) => {
            option.addEventListener("click", function () {
                optionsDiv.classList.add("hidden");
                optionsDiv.classList.remove("visible");

                //pause animation
                document.querySelectorAll(".hand").forEach((hand) => {
                    hand.classList.add("paused");
                    hand.classList.remove("running");

                });

                clearInterval(downloadTimer);
                //Computer choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                //here is where we call compare hands
                compareHands(this.textContent, computerChoice);

                //update images
                playerHand.src = `../src/${this.textContent}.png`;
                computerHand.src = `../src/${computerChoice}.png`;
            });
        });
    };

    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;

        //Win screen
        //player win
        if (pScore === 2) {
            window.location.href = "../html/winner.html";
        };

        //Computer win
        if (cScore === 10) {
            window.location.href = "../html/loser.html";
        };
    };

    //cancelling the update score
    const noRun = () => {
        dontRun = true;
    };

    //score updater
    const compareHands = (playerChoice, computerChoice) => {

        if (dontRun === false) {
            //Checking for tie
            if (computerChoice === playerChoice) {
                winner.textContent = "It is a tie!";
                return;
            }

            //Check for Rock
            if (playerChoice === "Rock") {
                if (computerChoice === "Scissors") {
                    winner.textContent = "You won";
                    pScore++;
                    updateScore();
                    return;
                } else {
                    winner.textContent = "Computer won";
                    cScore++;
                    updateScore();
                    return;
                }
            }
            //Check for Scissors
            if (playerChoice === "Scissors") {
                if (computerChoice === "Rock") {
                    winner.textContent = "Computer won";
                    cScore++;
                    updateScore();
                    return;
                } else {
                    winner.textContent = "Player won";
                    pScore++;
                    updateScore();
                    return;
                }
            }
            //Check for Paper   
            if (playerChoice === "Paper") {
                if (computerChoice === "Scissors") {
                    winner.textContent = "Computer won";
                    cScore++;
                    updateScore();
                    return;
                } else {
                    winner.textContent = "Player won";
                    pScore++;
                    updateScore();
                    return;
                }
            }
        };
    }


    //Is call all the inner functions
    startGame();
    playMatch();
    startTimer();
};

//start the game function
game();

