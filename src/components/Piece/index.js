import * as PIXI from 'pixi.js';
import SceneManager from './../../scenes/SceneManager';
import DisplayObject from './../../components/DisplayObject';

export default class Piece {
    constructor(id, player, x, columnWidth, columnHeight, scene) {
        this.player = player;
        this.id = id;
        this.columnHeight = columnHeight;
        this.createPiece(columnWidth, columnHeight, x, scene);
        //this.dropPiece(x);
    }
    //Creates piece and sets inital size, position, and color
    createPiece(columnWidth, columnHeight, x, scene) {
        this.displayObject = new DisplayObject(
            new PIXI.Sprite(PIXI.loaders.shared.resources.token.texture),
            {
                position: {
                    x: x,
                    y: 0},
                anchor: {
                    x: .5,
                    y: 0},
                layer: scene.layers["piece"],
                parent: scene
            });

        this.displayObject.displayObject.tint = this.player.color;

        this.setSize(columnWidth, columnHeight);
        this.setPosition(x)
    }

    setSize(columnWidth, columnHeight) {
        this.columnHeight = columnHeight;
        this.displayObject.setSize({width: columnWidth * .85, height: columnHeight/6});
    }

    setPosition(x, y) {
        let yPos =  (y != undefined) ? y : (this.columnHeight - (this.displayObject.getSize().height * this.id) + this.columnHeight * .01);
        this.displayObject.setPosition({x: x, y: yPos});
    }

    onResize(columnWidth, columnHeight, x) {
        this.setSize(columnWidth, columnHeight);
        this.setPosition(x);
    }

    destroy() {
        this.displayObject.destroy();
    }
}