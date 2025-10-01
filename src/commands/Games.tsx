import React, { useRef, useState, useEffect } from 'react';

type GamesProps = {
    currentTheme: {
        name: string;
        background: string;
        text: string;
        prompt: string;
        path: string;
        accent: string;
    };
    args: string[];
    onGameCommand: (callback: (input: string) => void) => void;
    restoreCommand: () => void;
};

const Games: React.FC<GamesProps> = ({ currentTheme, args, onGameCommand, restoreCommand }) => {
    const [gameState, setGameState] = useState<'menu' | 'tictactoe' | 'guess' | 'rps'>('menu');
    const gameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (args.length > 0) {
            const game = args[0].toLowerCase();
            if (['tictactoe', 'guess', 'rps'].includes(game)) {
                setGameState(game as 'tictactoe' | 'guess' | 'rps');
            }
        }
    }, []);

    // Scroll into view when gameState changes to a game
    useEffect(() => {
        if (gameState !== 'menu' && gameRef.current) {
            gameRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [gameState]);

    if (args.length === 0 || !['tictactoe', 'guess', 'rps'].includes(args[0]?.toLowerCase())) {
        return (
            <div className="mb-2">
                {/* <div className={`${currentTheme.accent} font-bold mb-2`}>
                    ╔════════════════════════════════════════════════╗
                </div>
                <div className={`${currentTheme.accent} font-bold font-mono`}>
                    ║                 🎮 GAME ARCADE                 ║
                </div>
                <div className={`${currentTheme.accent} font-bold mb-2`}>
                    ╚════════════════════════════════════════════════╝
                </div> */}

                <p className="text-yellow-400 mb-2">Choose your game:</p>

                <div className="ml-4 mb-2">
                    <p className={currentTheme.accent}>
                        1. <span className="text-white font-bold">tictactoe</span> - Classic Tic-Tac-Toe vs AI
                    </p>
                    <p className="text-gray-500 ml-3">Beat the unbeatable AI (Good luck!)</p>
                </div>

                <div className="ml-4 mb-2">
                    <p className={currentTheme.accent}>
                        2. <span className="text-white font-bold">guess</span> - Number Guessing Game
                    </p>
                    <p className="text-gray-500 ml-3">I'm thinking of a number between 1-100...</p>
                </div>

                <div className="ml-4 mb-2">
                    <p className={currentTheme.accent}>
                        3. <span className="text-white font-bold">rps</span> - Rock Paper Scissors
                    </p>
                    <p className="text-gray-500 ml-3">Best of 5 rounds vs AI</p>
                </div>

                <p className="text-green-400 mt-2">Usage: games [game-name]</p>
                <p className="text-gray-500">Example: games tictactoe</p>
            </div>
        );
    }

    if (gameState === 'tictactoe') {
        return (
            <div ref={gameRef}>
                <TicTacToe
                    currentTheme={currentTheme}
                    onGameCommand={onGameCommand}
                    restoreCommand={restoreCommand}
                    onExit={() => setGameState('menu')}
                />
            </div>
        );
    }

    if (gameState === 'guess') {
        return (
            <div ref={gameRef}>
                <NumberGuess
                    currentTheme={currentTheme}
                    onGameCommand={onGameCommand}
                    restoreCommand={restoreCommand}
                    onExit={() => setGameState('menu')}
                />
            </div>
        );
    }

    if (gameState === 'rps') {
        return (
            <div ref={gameRef}>
                <RockPaperScissors
                    currentTheme={currentTheme}
                    onGameCommand={onGameCommand}
                    restoreCommand={restoreCommand}
                    onExit={() => setGameState('menu')}
                />
            </div>
        );
    }

    return null;
};

// ==================== TIC-TAC-TOE ====================
const TicTacToe: React.FC<{
    currentTheme: any;
    onGameCommand: any;
    restoreCommand: any;
    onExit: () => void;
}> = ({ currentTheme, onGameCommand, restoreCommand, onExit }) => {
    const initialBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const [board, setBoard] = useState<string[]>(initialBoard);
    const [gameActive, setGameActive] = useState(true);
    const [message, setMessage] = useState('');
    const [helpShown, setHelpShown] = useState(false);

    const player = 'X';
    const ai = 'O';

    useEffect(() => {
        if (gameActive) {
            onGameCommand((input: string) => {
                handleInput(input);
            });
        } else {
            restoreCommand();
        }

        return () => restoreCommand();
    }, [gameActive, board]);

    const formatCell = (cell: string) => {
        if (cell === 'X') return <span className="text-green-400 font-bold">X</span>;
        if (cell === 'O') return <span className="text-red-500 font-bold">O</span>;
        return <span className="text-gray-500">{cell}</span>;
    };

    const checkWinner = (b: string[], mark: string) => {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        return wins.some((combo) => combo.every((i) => b[i] === mark));
    };

    const minimax = (b: string[], isMaximizing: boolean): number => {
        if (checkWinner(b, ai)) return 10;
        if (checkWinner(b, player)) return -10;
        if (b.every((cell) => cell === 'X' || cell === 'O')) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (b[i] !== 'X' && b[i] !== 'O') {
                    const original = b[i];
                    b[i] = ai;
                    const score = minimax(b, false);
                    b[i] = original;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (b[i] !== 'X' && b[i] !== 'O') {
                    const original = b[i];
                    b[i] = player;
                    const score = minimax(b, true);
                    b[i] = original;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const getBestMove = (b: string[]) => {
        let bestScore = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {
            if (b[i] !== 'X' && b[i] !== 'O') {
                const original = b[i];
                b[i] = ai;
                const score = minimax(b, false);
                b[i] = original;

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    };

    const resetGame = () => {
        setBoard(initialBoard);
        setGameActive(true);
        setMessage('');
        setHelpShown(false);
    };

    const showHelp = () => {
        setHelpShown(true);
        setMessage(
            `Instructions:
- Enter a number (1-9) to place your X on the board.
- The AI will respond with O.
- First to get 3 in a row wins.
- Commands:
  - reset: Restart the game
  - exit: Return to game menu
  - help: Show instructions`
        );
    };

    const handleInput = (input: string) => {
        const cmd = input.trim().toLowerCase();

        if (cmd === 'reset') {
            resetGame();
            return;
        }
        if (cmd === 'exit') {
            onExit();
            return;
        }
        if (cmd === 'help') {
            showHelp();
            return;
        }

        if (!gameActive) {
            setMessage("Game over! Type 'reset' to play again or 'exit' to return to menu.");
            return;
        }

        const move = parseInt(cmd) - 1;

        if (isNaN(move) || move < 0 || move > 8 || board[move] === 'X' || board[move] === 'O') {
            setMessage('⚠️  Invalid move! Choose an empty cell (1-9)');
            return;
        }

        // Player move
        const newBoard = [...board];
        newBoard[move] = player;
        setBoard(newBoard);
        setMessage('');
        setHelpShown(false);

        if (checkWinner(newBoard, player)) {
            setMessage('🎉 YOU WIN! Impressive!');
            setGameActive(false);
            return;
        }

        if (newBoard.every((cell) => cell === 'X' || cell === 'O')) {
            setMessage("🤝 It's a DRAW! Well played!");
            setGameActive(false);
            return;
        }

        // AI move
        setTimeout(() => {
            const aiMove = getBestMove(newBoard);
            newBoard[aiMove] = ai;
            setBoard([...newBoard]);

            if (checkWinner(newBoard, ai)) {
                setMessage('💀 AI WINS! Better luck next time!');
                setGameActive(false);
                return;
            }

            if (newBoard.every((cell) => cell === 'X' || cell === 'O')) {
                setMessage("🤝 It's a DRAW! Well played!");
                setGameActive(false);
            }
        }, 500);
    };

    return (
        <div className="mb-2">
            {/* <div className={`${currentTheme.accent} font-bold mb-2`}>
                ╔═══════════════╗
            </div>
            <div className={`${currentTheme.accent} font-bold`}>
                ║ TIC-TAC-TOE   ║
            </div>
            <div className={`${currentTheme.accent} font-bold mb-2`}>
                ╚═══════════════╝
            </div> */}

            <div className="font-mono text-center mb-2">
                <div>
                    {formatCell(board[0])} │ {formatCell(board[1])} │ {formatCell(board[2])}
                </div>
                <div>───┼───┼───</div>
                <div>
                    {formatCell(board[3])} │ {formatCell(board[4])} │ {formatCell(board[5])}
                </div>
                <div>───┼───┼───</div>
                <div>
                    {formatCell(board[6])} │ {formatCell(board[7])} │ {formatCell(board[8])}
                </div>
            </div>

            <p className="text-yellow-400">You are X | AI is O</p>
            {gameActive ? (
                <p className="text-green-400">
                    Enter position (1-9) to make your move | Commands: reset, exit, help
                </p>
            ) : (
                <p className="text-gray-500">Type 'reset' to play again or 'exit' to return to menu</p>
            )}
            {message && (
                <p
                    className={
                        gameActive
                            ? 'text-red-500 whitespace-pre-line'
                            : 'text-green-400 font-bold text-lg whitespace-pre-line'
                    }
                >
                    {message}
                </p>
            )}
        </div>
    );
};

// ==================== NUMBER GUESSING ====================
const NumberGuess: React.FC<{
    currentTheme: any;
    onGameCommand: any;
    restoreCommand: any;
    onExit: () => void;
}> = ({ currentTheme, onGameCommand, restoreCommand, onExit }) => {
    const generateTarget = () => Math.floor(Math.random() * 100) + 1;
    const [target, setTarget] = useState(generateTarget());
    const [attempts, setAttempts] = useState(0);
    const [gameActive, setGameActive] = useState(true);
    const [message, setMessage] = useState('');
    const [won, setWon] = useState(false);
    const [helpShown, setHelpShown] = useState(false);

    useEffect(() => {
        if (gameActive) {
            onGameCommand((input: string) => {
                handleInput(input);
            });
        } else {
            restoreCommand();
        }

        return () => restoreCommand();
    }, [gameActive, attempts]);

    const resetGame = () => {
        setTarget(generateTarget());
        setAttempts(0);
        setGameActive(true);
        setMessage('');
        setWon(false);
        setHelpShown(false);
    };

    const showHelp = () => {
        setHelpShown(true);
        setMessage(
            `Instructions:
- Guess the number between 1 and 100.
- After each guess, you'll get hints if the number is higher or lower.
- Commands:
  - reset: Restart the game
  - exit: Return to game menu
  - help: Show instructions`
        );
    };

    const handleInput = (input: string) => {
        const cmd = input.trim().toLowerCase();

        if (cmd === 'reset') {
            resetGame();
            return;
        }
        if (cmd === 'exit') {
            onExit();
            return;
        }
        if (cmd === 'help') {
            showHelp();
            return;
        }

        if (!gameActive) {
            setMessage("Game over! Type 'reset' to play again or 'exit' to return to menu.");
            return;
        }

        const guess = parseInt(cmd);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            setMessage('⚠️  Please enter a number between 1 and 100');
            return;
        }

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (guess === target) {
            let rating = '';
            if (newAttempts <= 5) rating = '🏆 LEGENDARY';
            else if (newAttempts <= 8) rating = '⭐ EXCELLENT';
            else if (newAttempts <= 12) rating = '👍 GOOD';
            else rating = '✅ NOT BAD';

            setMessage(
                `🎉 CORRECT! The number was ${target}!\n\nAttempts: ${newAttempts}\nRating: ${rating}`
            );
            setGameActive(false);
            setWon(true);
        } else if (guess < target) {
            const diff = target - guess;
            const hint = diff > 20 ? '📈 Much higher!' : '⬆️  Higher!';
            setMessage(`❌ Too low! ${hint} (Attempt ${newAttempts})`);
        } else {
            const diff = guess - target;
            const hint = diff > 20 ? '📉 Much lower!' : '⬇️  Lower!';
            setMessage(`❌ Too high! ${hint} (Attempt ${newAttempts})`);
        }
    };

    return (
        <div className="mb-2">
            {/* <div className={`${currentTheme.accent} font-bold mb-2`}>
                ╔═══════════════════════════════╗
            </div>
            <div className={`${currentTheme.accent} font-bold`}>
                ║ NUMBER GUESSING GAME          ║
            </div>
            <div className={`${currentTheme.accent} font-bold mb-2`}>
                ╚═══════════════════════════════╝
            </div> */}

            <p className="text-yellow-400 mb-2">I'm thinking of a number between 1 and 100...</p>
            {gameActive ? (
                <p className="text-green-400 mb-2">
                    Can you guess it? | Commands: reset, exit, help
                </p>
            ) : (
                <p className="text-gray-500 mb-2">Type 'reset' to play again or 'exit' to return to menu</p>
            )}

            {message && (
                <p
                    className={
                        won
                            ? 'text-green-400 font-bold text-lg whitespace-pre-line'
                            : 'text-orange-400 whitespace-pre-line'
                    }
                >
                    {message}
                </p>
            )}
        </div>
    );
};

// ==================== ROCK PAPER SCISSORS ====================
const RockPaperScissors: React.FC<{
    currentTheme: any;
    onGameCommand: any;
    restoreCommand: any;
    onExit: () => void;
}> = ({ currentTheme, onGameCommand, restoreCommand, onExit }) => {
    const maxRounds = 5;
    const choices = ['rock', 'paper', 'scissors'];
    const emojis: { [key: string]: string } = { rock: '🪨', paper: '📄', scissors: '✂️' };

    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const [round, setRound] = useState(1);
    const [gameActive, setGameActive] = useState(true);
    const [message, setMessage] = useState('');
    const [lastResult, setLastResult] = useState('');
    const [helpShown, setHelpShown] = useState(false);

    useEffect(() => {
        if (gameActive) {
            onGameCommand((input: string) => {
                handleInput(input);
            });
        } else {
            restoreCommand();
        }

        return () => restoreCommand();
    }, [gameActive, round, playerScore, aiScore]);

    const resetGame = () => {
        setPlayerScore(0);
        setAiScore(0);
        setRound(1);
        setGameActive(true);
        setMessage('');
        setLastResult('');
        setHelpShown(false);
    };

    const showHelp = () => {
        setHelpShown(true);
        setMessage(
            `Instructions:
- Choose rock, paper, or scissors each round.
- Best of 5 rounds wins the game.
- Commands:
  - reset: Restart the game
  - exit: Return to game menu
  - help: Show instructions`
        );
    };

    const handleInput = (input: string) => {
        const cmd = input.trim().toLowerCase();

        if (cmd === 'reset') {
            resetGame();
            return;
        }
        if (cmd === 'exit') {
            onExit();
            return;
        }
        if (cmd === 'help') {
            showHelp();
            return;
        }

        if (!gameActive) {
            setMessage("Game over! Type 'reset' to play again or 'exit' to return to menu.");
            return;
        }

        let playerChoice = cmd;

        if (playerChoice === 'r') playerChoice = 'rock';
        else if (playerChoice === 'p') playerChoice = 'paper';
        else if (playerChoice === 's') playerChoice = 'scissors';

        if (!choices.includes(playerChoice)) {
            setMessage('⚠️  Invalid choice! Type: rock, paper, or scissors');
            return;
        }

        const aiChoice = choices[Math.floor(Math.random() * choices.length)];

        let result = '';
        let newPlayerScore = playerScore;
        let newAiScore = aiScore;

        if (playerChoice === aiChoice) {
            result = '🤝 TIE!';
        } else if (
            (playerChoice === 'rock' && aiChoice === 'scissors') ||
            (playerChoice === 'paper' && aiChoice === 'rock') ||
            (playerChoice === 'scissors' && aiChoice === 'paper')
        ) {
            result = '✅ YOU WIN THIS ROUND!';
            newPlayerScore++;
            setPlayerScore(newPlayerScore);
        } else {
            result = '❌ AI WINS THIS ROUND!';
            newAiScore++;
            setAiScore(newAiScore);
        }

        setLastResult(
            `You chose: ${emojis[playerChoice]} ${playerChoice}\nAI chose: ${emojis[aiChoice]} ${aiChoice}\n\n${result}`
        );
        setMessage('');
        const newRound = round + 1;

        if (newRound > maxRounds) {
            let finalResult = '';
            if (newPlayerScore > newAiScore) {
                finalResult = `🏆 YOU WIN THE GAME!\n\nFinal Score - You: ${newPlayerScore} | AI: ${newAiScore}\nWell played, champion!`;
            } else if (newAiScore > newPlayerScore) {
                finalResult = `💀 AI WINS THE GAME!\n\nFinal Score - You: ${newPlayerScore} | AI: ${newAiScore}\nBetter luck next time!`;
            } else {
                finalResult = `🤝 IT'S A TIE!\n\nFinal Score - You: ${newPlayerScore} | AI: ${newAiScore}\nEvenly matched!`;
            }
            setLastResult((prev) => prev + '\n\n' + finalResult);
            setGameActive(false);
        } else {
            setRound(newRound);
        }
    };

    return (
        <div className="mb-2">
            {/* <div className={`${currentTheme.accent} font-bold mb-2`}>
                ╔═══════════════════════════════════╗
            </div>
            <div className={`${currentTheme.accent} font-bold`}>
                ║ ROCK 🪨 PAPER 📄 SCISSORS ✂️      ║
            </div>
            <div className={`${currentTheme.accent} font-bold mb-2`}>
                ╚═══════════════════════════════════╝
            </div> */}

            <p className="text-yellow-400">Round {round}/{maxRounds}</p>
            <p className="mb-2">
                <span className="text-green-400">You: {playerScore}</span> |{' '}
                <span className="text-red-500">AI: {aiScore}</span>
            </p>

            {gameActive ? (
                <>
                    <p className="text-white">Choose: rock, paper, or scissors</p>
                    <p className="text-gray-500">(or type 'r', 'p', 's' for short)</p>
                    <p className="text-green-400 mt-1">Commands: reset, exit, help</p>
                </>
            ) : (
                <p className="text-gray-500">Type 'reset' to play again or 'exit' to return to menu</p>
            )}

            {message && <p className="text-red-500 mt-2">{message}</p>}
            {lastResult && (
                <p
                    className={`mt-2 whitespace-pre-line ${gameActive ? 'text-blue-400' : 'text-green-400 font-bold text-lg'
                        }`}
                >
                    {lastResult}
                </p>
            )}
        </div>
    );
};

export default Games;
