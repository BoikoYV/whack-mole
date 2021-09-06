// winners elements
const winnerModal = document.querySelector('.winner-modal');
const winnerModalOverlay = document.querySelector('.winner-modal-overlay')
const winnerTitle = document.querySelector('.winner-modal__title');
const fireWorksBox = document.querySelector('.fireworks-wrapper');

class Game {
    constructor(helper, cell, gameField, maxPoints, modeButtosBox) {

        this.currentMode = 'easy';
        this.modes = {
            easy: 1500,
            middle: 1000,
            hard: 500,
        };
        this.userPoints = 0;
        this.computerPoints = 0;
        this.isFinishGame = false;
        this.winner = null;
        this.helper = helper;
        this.cell = cell;
        this.gameField = gameField;
        this.maxPoints = maxPoints;
        this.userPointsEl = document.querySelector('.user-points');
        this.computerPointsEl = document.querySelector('.computer-points');
        this.gamePoints = document.querySelector('.game-points');
        this.modeButtosBox = modeButtosBox;
    }

    startGame(rows, colls) {
        this.isFinishGame = false;
        this.gameField.innerHTML = '';

        this.helper.hide(this.modeButtosBox.parentElement, 'game-mode--active');
        this.createGameField(rows, colls);
        this.helper.show(this.gamePoints, 'game-points--active');
        this.helper.show(this.gameField, 'game-table--active');
    };

    showCell(table, max) {
        let cells = table.querySelectorAll('td');
        let cellsArr = [...cells];
        // return random cell
        this.checkCell(table, cellsArr[this.getRandomNum(0, max)], max);
    };

    getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    // check cell for being opened
    checkCell(table, cellEl, max) {
        if (cellEl.classList.contains('cell-opened')) {
            this.showCell(table, max);
        }
        return this.cell.highlightСell(cellEl, this.modes[this.currentMode]);
    };

    addPoints(player) {
        ++this[`${player}Points`];
        this.winner = 'user';

        if (player === 'user') {
            this.userPointsEl.innerText = this.userPoints;
        } else if (player === 'computer') {
            this.computerPointsEl.innerText = this.computerPoints;
        }
    };

    checkWinnerPoints() {
        if (this.userPoints === this.maxPoints || this.computerPoints === this.maxPoints) {
            this.winner = this.userPoints > this.computerPoints ? 'user' : 'computer';
            this.showMessageForWinner();
            return true;
        }
        return false;
    };

    showMessageForWinner() {
        this.helper.show(winnerModal, 'winner-modal--active');
        this.helper.show(winnerModalOverlay, 'winner-modal-overlay--active');
        this.helper.show(fireWorksBox, 'fireworks-wrapper--active');
        winnerTitle.innerText = `${this.winner} won`;
        this.isFinishGame = true;
    };

    createGameField(rows, colls) {
        const cellsFragment = document.createDocumentFragment();
        for (let i = 0; i < rows; i++) {
            const tr = document.createElement('tr');
            for (let i = 0; i < colls; i++) {
                const td = document.createElement('td');
                tr.appendChild(td);
            }
            cellsFragment.appendChild(tr);
        }
        this.gameField.appendChild(cellsFragment);
    };

    resetGame() {
        this.userPoints = 0;
        this.computerPoints = 0;
        this.userPointsEl.innerText = 0;
        this.computerPointsEl.innerText = 0;
    };

    finishGame() {
        this.resetGame();
        this.helper.show(this.modeButtosBox.parentElement, 'game-mode--active');
        this.helper.hide(this.gamePoints, 'game-points--active');
        this.helper.hide(this.gameField, 'game-table--active');
        this.helper.hide(winnerModal, 'winner-modal--active');
        this.helper.hide(winnerModalOverlay, 'winner-modal-overlay--active');
        this.helper.hide(fireWorksBox, 'fireworks-wrapper--active');

    }

}

export default Game;