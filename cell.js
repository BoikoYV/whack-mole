class Cell {
    constructor(helper) {
        this.helper = helper;
    }

    highlightСell(currentCell, time) {
        if (!this.game.checkWinnerPoints()) {

            // show new cell
            this.helper.show(currentCell, 'highlight-cell');

            // print cell and add points
            setTimeout(() => {

                this.helper.hide(currentCell, 'highlight-cell');
                this.helper.show(currentCell, 'cell-opened');

                if (currentCell.classList.contains('user-cell')) {
                    this.game.addPoints('user')
                } else {
                    this.helper.show(currentCell, 'computer-cell');
                    this.game.addPoints('computer');
                }
            }, time);
        }
    }
}

export default Cell