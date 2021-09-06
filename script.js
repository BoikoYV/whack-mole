import Helper from './helper.js';
import Game from './game.js';
import Cell from './cell.js';

const modeButtosBox = document.querySelector('.game-mode__btn-box');
const MAXPOINTS = 10;

const gameField = document.querySelector('.game-table');
const ROWS = 10;
const COLLS = 10;

let highlightCellTimerId = null;


const helper = new Helper();
const cell = new Cell(helper);
const game = new Game(helper, cell, gameField, MAXPOINTS, modeButtosBox);
cell.game = game;


// start game
modeButtosBox.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        game.currentMode = e.target.dataset.mode;
        game.startGame(ROWS, COLLS);
        startHighlightingCells();
    }
})


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
