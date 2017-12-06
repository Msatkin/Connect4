import * as PIXI from 'pixi.js';
import Column from './../Column';

export default class Board {
    constructor(scene, getPlayer, endTurn) {
        this.columns = [];
        //Set boardHeight
        this.boardHeight = scene.screenHeight - (scene.screenHeight * .15);
        //Creates board
        this.createBoard(scene, getPlayer, endTurn);
    }

    //Sets board size
    setSize(width, height, boardHeight) {
        this.boardHeight = boardHeight;
        //Recalculates each column
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].setSize(width, height, this.boardHeight);
        }
    }

    //Creates board
    createBoard(scene, getPlayer, endTurn) {
        //Creates columns
        for (let i = 0; i < 7; i++) {
            this.columns.push(new Column(i, getPlayer, endTurn, this.boardHeight, scene));
        }
    }

    //Toggles board's ability to be interacted with
    activate(activate) {
        //Toggles each column
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].activate(activate);
        }
    }

    //Clears Board
    clear(scene) {
        //Clears each column
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].clear(scene);
        }
    }

    //Checks if 4 pieces are connected vertically
    checkVertical(x, y, playerId) {
        //Includes piece that was just placed
        let connectedPieces = 1;
        //Check above
        connectedPieces += this.checkForConnected(x, y, playerId, (x) => x, (y,i) => y + i);
        //Check below
        connectedPieces += this.checkForConnected(x, y, playerId, (x) => x, (y,i) => y - i);
        
        if(connectedPieces > 3) return true;
        
        return false;
    }

    //Checks if 4 pieces are connected horizontally
    checkHorizontal(x, y, playerId) {
        //Includes piece that was just placed
        let connectedPieces = 1;
        //Check right
        connectedPieces += this.checkForConnected(x, y, playerId, (x,i) => x + i, (y) => y);
        //Check left
        connectedPieces += this.checkForConnected(x, y, playerId, (x,i) => x - i, (y) => y);
        
        if(connectedPieces > 3) return true;
        
        return false;
    }

    //Checks if 4 pieces are connected diagonally
    checkUpperLeftToLowerRight(x, y, playerId) {
        //Includes piece that was just placed
        let connectedPieces = 1;
        //Check upper left
        connectedPieces += this.checkForConnected(x, y, playerId, (x,i) => x - i, (y,i) => y + i);
        //Check lower right
        connectedPieces += this.checkForConnected(x, y, playerId, (x,i) => x + i, (y,i) => y - i);
        
        if(connectedPieces > 3) return true;
        
        return false;
    }

    //Checks if 4 pieces are connected diagonally
    checkLowerLeftToUpperRight(x, y, playerId) {
        //Includes piece that was just placed
        let connectedPieces = 1;
        //Check lower left
        connectedPieces += this.checkForConnected(x, y, playerId, (x,i) => x - i, (y,i) => y - i);
        //Check upper right
        connectedPieces += this.checkForConnected(x, y, playerId, (x,i) => x + i, (y,i) => y + i);
        
        if(connectedPieces > 3) return true;
        
        return false;
    }

    //Checks for connected pieces
    checkForConnected(x, y, playerId, xOffset, yOffset) {
        let connectedPieces = 0;
        //Checks next 3 pieces in the direction defined by the offset functions
        for (let i = 1; i < 4; i++) {
            //Checks if the offset piece is owned by the same player
            if (this.getPieceOwner(xOffset(x, i), yOffset(y, i)) === playerId) {
                connectedPieces++;
            }
            else {
                //Returns connected count as soon as the connection is broken by another player's piece
                return connectedPieces;
            }
        }
        return connectedPieces;
    }

    //Checks if victory has been achieved
    checkVictory(x, y) {
        let playerId = this.getPieceOwner(x, y);
        if (this.checkVertical(x, y, playerId) || this.checkHorizontal(x, y, playerId) || this.checkUpperLeftToLowerRight(x, y, playerId) || this.checkLowerLeftToUpperRight(x, y, playerId)) {
            return true;
        }
        return false;
    }

    //Gets the owner of a piece
    getPieceOwner(x,y) {
        try {
            let column = this.columns[x];
            return column.pieces[y].player.id;
        }
        catch (e) {
            return null;
        }
    }
}