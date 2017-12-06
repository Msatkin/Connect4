import Player from './../Player';

export default class Ai extends Player {
    constructor(id, color) {
        super(id, color);
        this.type = "Ai";
    }

    //Contains logic for ai choice
    makeChoice(columns) {
        let choiceMade = false;
        //Loops until valid choice is found (7 times at max)
        while (!choiceMade) {
            //Chooses random column
            let columnId = Math.floor(Math.random() * columns.length);
            let column = columns[columnId];
            //Checks if choice is valid
            if (column.validateSelection()) {
                //Add piece to column and call endturn callback function
                column.addPiece();
                column.endTurn(columns[columnId].id, columns[columnId].pieces.length - 1);
                //Exit loop
                choiceMade = true;
            }
            else {
                //Removes choice from columns to choose from
                columns = columns.filter(item => item.id !== column.id);
            }
        }
    }
}