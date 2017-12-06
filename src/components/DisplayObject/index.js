import * as PIXI from 'pixi.js';

//Wrapper class for display objects (sprite, text, ect)
export default class DisplayObject {
    constructor(content, options) {
        this.displayObject = content;
        if (options.position) this.setPosition(options.position);
        if (options.anchor) this.setAnchor(options.anchor);
        if (options.interactive != null) this.setInteractive(options.interactive);
        if (options.size) this.setSize(options.size);
        if (options.onClick) this.setOnClick(options.onClick);
        if (options.layer) this.setLayer(options.layer);
        if (options.parent) this.addToParent(options.parent);
    }

    //Sets object's ability to be clicked
    setInteractive(status) {
        this.displayObject.interactive = status;
        this.displayObject.buttonMode = status;
    }
    
    setPosition(position) {
        if(position.x != null) this.displayObject.position.x = position.x;
        if(position.y != null) this.displayObject.position.y = position.y;
    }
    
    setSize(size) {
        if (size.width != null) this.displayObject.width = size.width;
        if (size.height != null) this.displayObject.height = size.height;
    }

    setAnchor(anchor) {
        if(anchor.x != null) this.displayObject.anchor.x = anchor.x;
        if(anchor.y != null) this.displayObject.anchor.y = anchor.y;
    }

    setOnClick(func) {
        this.displayObject.on("pointerdown", func);
    }

    setLayer(layer) {
        this.displayObject.displayGroup = layer;
    }

    //Adds object to scene
    addToParent(parent) {
        this.parent = parent;
        parent.addChild(this.displayObject);
    }

    getSize() {
        return {
            width: this.displayObject.width,
            height: this.displayObject.height
        }
    }

    getPosition() {
        return {
            x: this.displayObject.position.x,
            y: this.displayObject.position.y,

        }
    }

    destroy() {
        this.parent.removeChild(this.displayObject);
    }
}