const helper = {
    hide(element, classSelector) {
        element.classList.remove(classSelector);
    },

    show(element, classSelector) {
        element.classList.add(classSelector);
    }
}

const game = {
    currentMode: 'easy',
    // уровни сложности и активное время для ячеек
    modes: {
        easy: 1500,
        middle: 1000,
        hard: 500,
    },
    userPoints: 0,
    computerPoints: 0,
    isFinishGame: false,
    winner: null,

    // начать игру (после выбора уровня сложности)
    startGame(rows, colls) {
        this.isFinishGame = false;
        gameField.innerHTML = '';

        this.helper.hide(modeButtosBox.parentElement, 'game-mode--active');
        this.createGameField(rows, colls);
        this.helper.show(gamePoints, 'game-points--active');
        this.helper.show(gameField, 'game-table--active');
    },

    // Получение рандомного числа для выбора ячейки
    getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    // Показать ячейку
    showCell(table, max) {
        let cells = table.querySelectorAll('td');
        let cellsArr = [...cells];
        // Возвращает рандомную ячейку
        this.checkCell(table, cellsArr[this.getRandomNum(0, max)], max);
    },

    // проверить ячейку на то, открывалась ли она уже
    checkCell(table, cellEl, max) {
        if (cellEl.classList.contains('cell-opened')) {
            this.showCell(table, max);
        }
        return cell.highlightСell(cellEl, this.modes[this.currentMode]);
    },

    // Добавление очков/ вывод на табло
    addPoints(player) {
        // Добавить очко
        ++this[`${player}Points`];
        // Для отслеживания последнего хода
        this.winner = 'user';

        if (player === 'user') {
            userPointsEl.innerText = this.userPoints;
        } else if (player === 'computer') {
            computerPointsEl.innerText = this.computerPoints;
        }
    },

    // проверка победителя на максимальное кол-во очков
    checkWinnerPoints() {
        if (this.userPoints === MAXPOINTS || this.computerPoints === MAXPOINTS) {
            this.winner = this.userPoints > this.computerPoints ? 'user' : 'computer';
            this.showMessageForWinner();
            return true;
        }
        return false;
    },

    // вывод победителя
    showMessageForWinner() {
        this.helper.show(winnerModal, 'winner-modal--active');
        this.helper.show(winnerModalOverlay, 'winner-modal-overlay--active');
        this.helper.show(fireWorksBox, 'fireworks-wrapper--active');
        winnerTitle.innerText = `${this.winner} won`;
        this.isFinishGame = true;
    },

    // создать поле 10 на 10
    createGameField(rows, colls) {

        const cellsFragment = document.createDocumentFragment();
        for (let i = 0;
            i < rows;
            i++) {
            const tr = document.createElement('tr');
            for (let i = 0;
                i < colls;
                i++) {
                const td = document.createElement('td');
                tr.appendChild(td);
            }
            cellsFragment.appendChild(tr);
        }
        gameField.appendChild(cellsFragment);
    },

    // сбросить все очки
    resetGame() {
        this.userPoints = 0;
        this.computerPoints = 0;
        userPointsEl.innerText = 0;
        computerPointsEl.innerText = 0;
    },

    // завершить игру(очистить все очки), вывести блок с выбором уровня
    finishGame() {
        this.resetGame();
        this.helper.show(modeButtosBox.parentElement, 'game-mode--active');
        this.helper.hide(gamePoints, 'game-points--active');
        this.helper.hide(gameField, 'game-table--active');
        this.helper.hide(winnerModal, 'winner-modal--active');
        this.helper.hide(winnerModalOverlay, 'winner-modal-overlay--active');
        this.helper.hide(fireWorksBox, 'fireworks-wrapper--active');

    }
}

// присваивание объкту game ссылку на объект helper, как свойство
game.helper = helper;


const cell = {

    highlightСell(currentCell, time) {
        if (!game.checkWinnerPoints()) {

            // показать новую ячейку
            helper.show(currentCell, 'highlight-cell');

            // разукрасить ячейку и присвоить очки
            setTimeout(() => {

                helper.hide(currentCell, 'highlight-cell');
                helper.show(currentCell, 'cell-opened');

                if (currentCell.classList.contains('user-cell')) {
                    game.addPoints('user')
                } else {
                    helper.show(currentCell, 'computer-cell');
                    game.addPoints('computer');
                }
            }, time);

        }


    }
}


// уровень сложности
const modeButtosBox = document.querySelector('.game-mode__btn-box');
// Очки
const MAXPOINTS = 10;
const gamePoints = document.querySelector('.game-points');
const computerPointsEl = document.querySelector('.computer-points');
const userPointsEl = document.querySelector('.user-points');
// Таблица
const gameField = document.querySelector('.game-table');
const ROWS = 10;
const COLLS = 10;

// Поздравление победителя
const winnerModal = document.querySelector('.winner-modal');
const winnerModalOverlay = document.querySelector('.winner-modal-overlay')
const winnerTitle = document.querySelector('.winner-modal__title');
const winnerModalClose = document.querySelector('.winner-modal__close');
const fireWorksBox = document.querySelector('.fireworks-wrapper');
// Id таймера подсветки ячеек
let highlightCellTimerId = null;




// Начало игры
modeButtosBox.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        game.currentMode = e.target.dataset.mode;
        game.startGame(ROWS, COLLS);
        startHighlightingCells();
    }
})

// Клики по таблице
gameField.addEventListener('click', function (e) {

    if (e.target.tagName === 'TD') {
        if (e.target.classList.contains('highlight-cell')) {
            helper.show(e.target, 'user-cell');
        }
    }
})


document.body.addEventListener('click', function (e) {

    if (e.target.classList.contains('winner-modal__close') ||
        e.target.classList.contains('winner-modal-overlay--active')) {
        game.finishGame();
    }
})


// Рекурсивный вызов таймера для подсветки ячеек
function startHighlightingCells() {
    highlightCellTimerId = setTimeout(function highlightCellWithInterval() {
        if (!game.isFinishGame) {
            game.showCell(gameField, ROWS * COLLS);

            setTimeout(highlightCellWithInterval, game.modes[game.currentMode]);

        } else {
            clearTimeout(highlightCellTimerId);

        }
    }, game.modes[game.currentMode]);
}