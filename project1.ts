import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let totalScore: number;
let round: number;
const maxRounds = 5;
const maxAttempts = 5;

const resetGame = () => {
    totalScore = 0;
    round = 1;
};

const startRound = () => {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    const askQuestion = () => {
        if (attempts >= maxAttempts) {
            console.log(`You've used all ${maxAttempts} attempts. The correct number was ${targetNumber}.`);
            round++;
            if (round <= maxRounds) {
                startRound();
            } else {
                console.log(`Game Over! Your total score is ${totalScore}.`);
                rl.question('Do you want to play again? (yes/no): ', (answer) => {
                    if (answer.toLowerCase() === 'yes') {
                        resetGame();
                        startRound();
                    } else {
                        rl.close();
                    }
                });
            }
            return;
        }

        rl.question(`Round ${round} - Guess the number (between 1 and 100): `, (answer) => {
            const guess = parseInt(answer, 10);
            attempts++;

            if (isNaN(guess)) {
                console.log('Please enter a valid number.');
            } else if (guess < targetNumber) {
                console.log('Too low!');
            } else if (guess > targetNumber) {
                console.log('Too high!');
            } else {
                console.log(`Congratulations! You've guessed the number in ${attempts} attempts.`);
                totalScore += (10 - attempts > 0 ? 10 - attempts : 1);  // Scoring: 10 points - number of attempts
                round++;
                if (round <= maxRounds) {
                    startRound();
                } else {
                    console.log(`Game Over! Your total score is ${totalScore}.`);
                    rl.question('Do you want to play again? (yes/no): ', (answer) => {
                        if (answer.toLowerCase() === 'yes') {
                            resetGame();
                            startRound();
                        } else {
                            rl.close();
                        }
                    });
                }
                return;
            }

            askQuestion();
        });
    };

    askQuestion();
};

// Initialize the game state and start the first round
resetGame();
startRound();
