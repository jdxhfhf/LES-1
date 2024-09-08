document.addEventListener('DOMContentLoaded', function () {
    // Элементы DOM
    const computerDiceOne = document.querySelector('.computer-dice-one');
    const computerDiceTwo = document.querySelector('.computer-dice-two');
    const playerDiceOne = document.querySelector('.player-dice-one');
    const playerDiceTwo = document.querySelector('.player-dice-two');
    const computerCredits = document.querySelector('.computer-credits');
    const playerCredits = document.querySelector('.player-credits');
    const messageBox = document.querySelector('.message-box p');
    const goButton = document.querySelector('.go-button');
    const higherButton = document.querySelector('.higher-button');
    const lowerButton = document.querySelector('.lower-button');

    let computerTotal = 0;
    let playerTotal = 0;
    let playerPrediction = '';

    // Начальные кредиты
    let computerScore = 0;
    let playerScore = 0;

    // Генерация случайного числа от 1 до 6 для кубика
    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // Обновление отображения кубиков
    function updateDiceDisplay(diceElement, diceValue) {
        diceElement.innerHTML = `&#98${55 + diceValue};`; // Юникод символы для кубиков
    }

    // Бросок кубиков компьютером
    function computerRoll() {
        const dice1 = rollDice();
        const dice2 = rollDice();
        computerTotal = dice1 + dice2;
        updateDiceDisplay(computerDiceOne, dice1);
        updateDiceDisplay(computerDiceTwo, dice2);
    }

    // Бросок кубиков игроком
    function playerRoll() {
        const dice1 = rollDice();
        const dice2 = rollDice();
        playerTotal = dice1 + dice2;
        updateDiceDisplay(playerDiceOne, dice1);
        updateDiceDisplay(playerDiceTwo, dice2);
    }

    // Проверка результата на основе предположения игрока
    function checkResult() {
        if ((playerPrediction === 'higher' && playerTotal > computerTotal) ||
            (playerPrediction === 'lower' && playerTotal < computerTotal)) {
            playerScore++;
            messageBox.textContent = 'jij hebt gewonnen ';
        } else if (playerTotal === computerTotal) {
            messageBox.textContent = 'Tekenen!';
        } else {
            computerScore++;
            messageBox.textContent = 'De computer heeft de ronde gewonnen.';
        }
        updateScores();
    }

    // Обновление отображения кредитов
    function updateScores() {
        computerCredits.textContent = computerScore;
        playerCredits.textContent = playerScore;
    }

    // Начало игры
    goButton.addEventListener('click', function () {
        computerRoll();
        playerRoll();
        messageBox.textContent = 'Kies: hoger of lager?';
        higherButton.disabled = false;
        lowerButton.disabled = false;
    });

    // Кнопка "Hoger"
    higherButton.addEventListener('click', function () {
        playerPrediction = 'higher';
        checkResult();
        higherButton.disabled = true;
        lowerButton.disabled = true;
    });

    // Кнопка "Lager"
    lowerButton.addEventListener('click', function () {
        playerPrediction = 'lower';
        checkResult();
        higherButton.disabled = true;
        lowerButton.disabled = true;
    });
});