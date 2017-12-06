import Scene from './../Scene';
import SceneManager from './../SceneManager';
import Board from './../../components/Board';
import loadImages from './../../assets/images/imageLoader';

export default class GameScene extends Scene {
    constructor() {
        super();
        this.turnCount = 0;
        this.createLayer("piece", -5);
        this.loaded = false;
    }

    //Starts game
    start(players) {
        if (!this.loaded) {
            this.setBackground(new PIXI.Sprite(PIXI.loaders.shared.resources.gameBackground.texture), SceneManager.renderer);
            this.loaded = true;
        }

        this.players = players;
        this.currentPlayer = players[0];
        this.createBoard();
        this.startTurn();
    }

    //Ends game
    endGame() {
        SceneManager.goToScene("end");
        SceneManager.scenes["end"].displayWinner(this.currentPlayer.id, this.turnCount);
    }

    update() {
        super.update();
    }

    //Creates the gameboard
    createBoard() {
        this.gameBoard = new Board(this, this.getPlayer.bind(this), this.finishTurn.bind(this));
    }

    //Begins turn
    startTurn() {
        //Increases turn count
        this.turnCount++;
        //Sets current player
        this.gameBoard.currentPlayer = this.currentPlayer;
        //Begins turn depending on player type
        if (this.currentPlayer.type == "Human") {
            this.gameBoard.activate(true);
        }
        else {
            this.gameBoard.activate(false);
            let player = this.currentPlayer;
            let columns = this.gameBoard.columns;
            setTimeout(() => player.makeChoice(columns), 500);
        }
    }

    //Processes end of turn
    finishTurn(x, y) {
        //Checks if there is a winner
        if (this.gameBoard.checkVictory(x, y, this.currentPlayer.id)) {
            this.endGame();
        }
        //If not switches players and goes again
        else {
            this.switchPlayer();
            this.startTurn();
        }
    }

    //Gets active player
    getPlayer() {
        return this.currentPlayer;
    }

    //Switches active player
    switchPlayer() {
        this.currentPlayer = (this.currentPlayer.id == 0) ? this.players[1] : this.players[0];
    }

    setSize(width, height) {
        super.setSize(width, height);
        if (this.gameBoard != null) this.gameBoard.setSize(width, height, height - (height * .15));
    }

    restartGame() {
        this.gameBoard.clear(this);
        this.turnCount = 0;
        this.currentPlayer = this.players[0];
    }
}