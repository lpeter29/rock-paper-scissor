document.addEventListener('DOMContentLoaded', () => {
    const choices = ['rock', 'paper', 'scissors'];
    const choiceEmojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };
    let playerScore = 0;
    let computerScore = 0;

    const playerIconEl = document.getElementById('player-icon');
    const computerIconEl = document.getElementById('computer-icon');
    const winnerEl = document.getElementById('winner');
    const playerScoreEl = document.getElementById('player-score');
    const computerScoreEl = document.getElementById('computer-score');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const homeBtn = document.getElementById('home-btn');
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');

    startBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    });

    homeBtn.addEventListener('click', () => {
        gameScreen.style.display = 'none';
        startScreen.style.display = 'block';
        resetScores();
    });

    document.querySelectorAll('.choice').forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.id;
            playerIconEl.textContent = choiceEmojis[playerChoice];
            computerIconEl.textContent = '❔';
            
            playerIconEl.classList.add('waving');
            computerIconEl.classList.add('waving');

            setTimeout(() => {
                const computerChoice = getComputerChoice();
                computerIconEl.textContent = choiceEmojis[computerChoice];
                
                playerIconEl.classList.remove('waving');
                computerIconEl.classList.remove('waving');

                const winner = determineWinner(playerChoice, computerChoice);
                updateScores(winner);
                displayWinner(winner);
            }, 2000);
        });
    });

    resetBtn.addEventListener('click', resetScores);

    function resetScores() {
        playerScore = 0;
        computerScore = 0;
        playerScoreEl.textContent = `Player Score: ${playerScore}`;
        computerScoreEl.textContent = `Computer Score: ${computerScore}`;
        winnerEl.textContent = 'Winner: ';
        playerIconEl.textContent = '❔';
        computerIconEl.textContent = '❔';
    }

    function getComputerChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'draw';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'player';
        } else {
            return 'computer';
        }
    }

    function updateScores(winner) {
        if (winner === 'player') {
            playerScore++;
        } else if (winner === 'computer') {
            computerScore++;
        }
        playerScoreEl.textContent = `Player Score: ${playerScore}`;
        computerScoreEl.textContent = `Computer Score: ${computerScore}`;
    }

    function displayWinner(winner) {
        if (winner === 'draw') {
            winnerEl.textContent = 'Winner: It\'s a draw!';
        } else if (winner === 'player') {
            winnerEl.textContent = 'Winner: You win!';
        } else {
            winnerEl.textContent = 'Winner: Computer wins!';
        }
        animateResult(winnerEl);
        animateResult(playerScoreEl);
        animateResult(computerScoreEl);
    }

    function animateResult(element) {
        element.classList.add('hidden');
        setTimeout(() => {
            element.classList.remove('hidden');
        }, 100);
    }
});