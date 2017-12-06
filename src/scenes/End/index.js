import SceneManager from './../SceneManager';
import Scene from './../Scene';
import DisplayObject from './../../components/DisplayObject';

export default class EndScene extends Scene {
    constructor() {
        super();
    }

    update() {
        super.update();
    }
    //Creates winner display or modifies previous display if already created
    displayWinner(winner, turnCount) {
        winner++; //Adjusts for index starting at 0
        this.setBackground(new PIXI.Sprite(PIXI.loaders.shared.resources.endBackground.texture), SceneManager.renderer);
        let textOptions = {fontFamily : 'Nunito', fontSize: 48, fill : 0x000000, align : 'center', fontWeight: 'bolder'};
        if (this.winner_txt == null) {
            this.winner_txt = new DisplayObject(
                new PIXI.Text('Player ' + winner + ' Wins!', textOptions),
                {
                    interactive: false,
                    position: {
                        x: this.screenWidth/2,
                        y: this.screenHeight/2 - (this.screenHeight * .15) * 2},
                    anchor: {
                        x: .5,
                        y: .5},
                    layer: this.mainLayer,
                    parent: this
                });
    
            this.turnCount_txt = new DisplayObject(
                new PIXI.Text('After ' + turnCount + ' turns', textOptions),
                {
                    interactive: false,
                    position: {
                        x: this.screenWidth/2,
                        y: this.screenHeight/2 - (this.screenHeight * .15)},
                    anchor: {
                        x: .5,
                        y: .5},
                    layer: this.mainLayer,
                    parent: this
                });
    
            this.restart_btn = new DisplayObject(
                new PIXI.Text('Restart', textOptions),
                {
                    interactive: true,
                    position: {
                        x: this.screenWidth/2,
                        y: this.screenHeight/2 + (this.screenHeight * .15)},
                    anchor: {
                        x: .5,
                        y: .5},
                    onClick: () => this.restart(),
                    layer: this.mainLayer,
                    parent: this
                });
    
            this.return_btn = new DisplayObject(
                new PIXI.Text('Back to Main Menu', textOptions),
                {
                    interactive: true,
                    position: {
                        x: this.screenWidth/2,
                        y: this.screenHeight/2 + (this.screenHeight * .15) * 2},
                    anchor: {
                        x: .5,
                        y: .5},
                    onClick: () => this.return(),
                    layer: this.mainLayer,
                    parent: this
                });
        }
        else {
            this.winner_txt.displayObject.text = 'Player ' + winner + ' Wins!';
            this.turnCount_txt.displayObject.text = 'After ' + turnCount + ' turns';
        }
    }

    restart() {
        SceneManager.goToScene("game");
        SceneManager.scenes['game'].restartGame();
    }

    return() {
        SceneManager.goToScene("main");
        SceneManager.scenes['game'].restartGame();
    }

    setSize(width, height) {
        super.setSize(width, height);
        if (this.winner_txt) {
            this.winner_txt.setPosition({x: this.screenWidth/2, y: this.screenHeight/2 - (this.screenHeight * .15) * 2});
            this.turnCount_txt.setPosition({x: this.screenWidth/2, y: this.screenHeight/2 - (this.screenHeight * .15)});
            this.restart_btn.setPosition({x: this.screenWidth/2, y: this.screenHeight/2 + (this.screenHeight * .15)});
            this.return_btn.setPosition({x: this.screenWidth/2, y: this.screenHeight/2 + (this.screenHeight * .15) * 2});
        }
    }
}