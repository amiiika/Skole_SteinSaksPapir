const game = ()=>{
    let pScore = 0;
    let cScore = 0;

    //start game
    const startGame =()=>{
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playBtn.addEventListener('click', ()=>{
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    };
    //Play Match
    const playMatch = () =>{
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        hands.forEach(hand =>{
            hand.addEventListener('animationend', function(){
                this.style.animation = '';
            });
        });
        //computers options
        const computerOptions = ['Rock','Paper','Scissors'];

        options.forEach(options=>{
            options.addEventListener('click',function() {
                //Computer choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                setTimeout(()=>{
                //here is where we call compare hands
                compareHands(this.textContent, computerChoice)
                //update images
                playerHand.src =`../src/${this.textContent}.png`;
                computerHand.src =`../src/${computerChoice}.png`;
                },2000)


                //animation
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";

            });
        });
    };

    const updateScore = ()=>{
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };


    const compareHands = (playerChoice, computerChoice)=>{
        //update text
        const winner = document.querySelector('.winner');
        //Checking for tie
        if(computerChoice===playerChoice){
            winner.textContent = 'It is a tie!';
            return;
        }
        
        //Check for Rock
        if(playerChoice === 'Rock'){
            if(computerChoice === 'Scissors'){
                winner.textContent ='Player won';
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Computer won';
                cScore++;
                updateScore();
                return;
            }
        }
        //Check for Scissors
        if(playerChoice === 'Scissors'){
            if(computerChoice === 'Rock'){
                winner.textContent ='Computer won';
                cScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Player won';
                pScore++;
                updateScore();
                return;
            }
        }
          //Check for Paper
          if(playerChoice === 'Paper'){
            if(computerChoice === 'Scissors'){
                winner.textContent ='Computer won';
                cScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Player won';
                pScore++;
                updateScore();
                return;
            }
        }
    }



    //Is call all the inner functions
    startGame();
    playMatch();
};

//start the game function
game();


//add timer, max three wins, fail when you choose to late or to early