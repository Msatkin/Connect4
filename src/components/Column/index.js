import * as PIXI from 'pixi.js';
import Piece from '../Piece/index';
import DisplayObject from './../../components/DisplayObject';

export default class Column {
    constructor(id, getPlayer, endTurn, boardHeight, scene) {
        this.id = id;
        this.pieces = [];
        this.scene = scene;

        //Sets callback functions
        this.endTurn = endTurn;
        this.getPlayer = getPlayer;

        //Creates column sprite
        this.createColumn(id, boardHeight, scene);

        //Sets z-index layer for pieces
        this.pieceLayer = scene.layers["piece"];
    }

    //Creates new column
    createColumn(id, boardHeight, scene) {
        this.displayObject = new DisplayObject(
            new PIXI.Sprite(PIXI.loaders.shared.resources.column.texture),
            {
                interactive: true,
                position: {
                    x: false,
                    y: scene.screenHeight - boardHeight},
                anchor: {
                    x: .5,
                    y: 0},
                onClick: this.onClick.bind(this),
                layer: scene.layers["main"],
                parent: scene
            });
        this.setSize(scene.screenWidth, scene.screenHeight, boardHeight);
    }

    //Sets size of column and its pieces
    setSize(width, height, boardHeight) {
        //Sets column height and width
        this.displayObject.setSize({height: boardHeight});

        //Gets board start position from column width
        let columnWidth = this.displayObject.getSize().width;
        let boardStart = ((width / 2) - ((columnWidth * 7) / 2)) + (columnWidth / 2);

        //Sets column start position from position on the board
        let xPos = boardStart + (columnWidth * this.id);
        this.displayObject.setPosition({x: xPos, y: height - boardHeight});

        //Resizes pieces to fit new column size
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].onResize(columnWidth, boardHeight, xPos);
        }
    }

    //On column click
    onClick() {
        //Checks if piece can be placed
        if (this.validateSelection()) {
            //Places piece
            this.addPiece();
            //Calls end turn callback 
            this.endTurn(this.id, this.pieces.length - 1);
        }
    }

    //Toggles the column's ability to be interacted with
    activate(activate) {
        //ValidateSelection prevents activation when column has no room for more pieces
        this.displayObject.setInteractive(this.validateSelection() ? activate : false)
    }

    //Checks if column has room for more pieces
    validateSelection() {
        if (this.pieces.length > 5 ) return false;
        return true;
    }

    //Creates and adds new piece to column
    addPiece() {
        this.pieces.push(new Piece(this.pieces.length, this.getPlayer(), this.displayObject.getPosition().x, this.displayObject.getSize().width, this.displayObject.getSize().height, this.scene))
    }

    //Clears all pieces
    clear(scene) {
        //Destroys piece
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].destroy();
        }
        //Clears array
        this.pieces = [];
        this.activate(true);
    }
}