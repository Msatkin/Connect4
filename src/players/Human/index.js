import Player from './../Player';

export default class Human extends Player {
    constructor(id, color) {
        super(id, color);
        this.type = "Human";
    }
}