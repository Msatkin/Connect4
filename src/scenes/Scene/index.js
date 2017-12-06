import * as PIXI from 'pixi.js';
import SceneManager from './../SceneManager';
import DisplayObject from './../../components/DisplayObject';

export default class Scene extends PIXI.Container {
    constructor() {
        super();
        this.paused = false;
        this.audioToggleEnabled = false;
        this.displayList = new PIXI.DisplayList();
        this.createLayer("background", -10);
        this.createLayer("main", 0);
    }

    update() {
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    isPaused() {
        return this.paused;
    }

    createLayer(name, z_index) {
        if (this.layers == null) this.layers = [];
        this.layers[name] = new PIXI.DisplayGroup(z_index, true);
        this.layers[name].on('add', function (sprite) {
            sprite.zOrder = sprite.y;
        });
    }

    setBackground(background, renderer) {
        this.backgroundImg = background;
        this.backgroundImg.displayGroup = this.layers["background"];
        this.backgroundImg.width = renderer.screen.width;
        this.backgroundImg.height = renderer.screen.height
        this.addChild(this.backgroundImg);
    }

    setSize(width, height) {
        this.screenWidth = width;
        this.screenHeight = height;
        if(this.backgroundImg) {
            this.backgroundImg.width = width;
            this.backgroundImg.height = height;
        }
    }
}