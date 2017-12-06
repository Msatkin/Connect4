export default class Player {
    constructor(id, color) {
        this.id = id;
        this.turn = false;
        this.color = color;
    }

    isTurn() {
        return this.turn;
    }
}