import SceneManager from './../SceneManager';
import Scene from './../Scene';
import Human from './../../players/Human';
import Ai from './../../players/Ai';
import DisplayObject from './../../components/DisplayObject';
import backgroundImage from './../../assets/images/background.jpg';

export default class MainScene extends Scene {
    constructor() {
        super();
    }

    update() {
        super.update();
    }

    //Resizes scene
    onResize() {
        super.onResize();
        //Updates selections position
        //this.setSelectionPosition(this.singlePlayer, true);
        //this.setSelectionPosition(this.twoPlayers);
    }

    //Starts main scene process
    start() {
        this.setBackground(new PIXI.Sprite(PIXI.loaders.shared.resources.mainBackground.texture), SceneManager.renderer);
        this.createSelections();
    }

    //Creates number of players selections 
    createSelections() {
        let textOptions = {fontFamily : 'Nunito', fontSize: 48, fill : 0x000000, align : 'center', fontWeight: 'bold'};
        
        this.singlePlayer_btn = new DisplayObject(
            new PIXI.Text('Single Player', textOptions),
            {
                interactive: true,
                position: {
                    x: this.screenWidth/2,
                    y: this.screenHeight/2 - this.screenHeight * .25},
                anchor: {
                    x: .5,
                    y: .5},
                onClick: () => this.playersSelected(true),
                layer: this.mainLayer,
                parent: this
            });

        this.twoPlayers_btn = new DisplayObject(
            new PIXI.Text('Two Players', textOptions),
            {
                interactive: true,
                position: {
                    x: this.screenWidth/2,
                    y: this.screenHeight/2 + this.screenHeight * .25},
                anchor: {
                    x: .5,
                    y: .5},
                onClick: () => this.playersSelected(),
                layer: this.mainLayer,
                parent: this
            });
    }

    //Chooses player types
    playersSelected(isSinglePlayer) {
        let players = [new Human(0, 0xFF0000)];
        players.push((isSinglePlayer) ? new Ai(1, 0x4c4c4c) : new Human(1, 0x4c4c4c))
        this.startGame(players);
    }

    //Sends player selection choice to game and begins game
    startGame(players) {
        SceneManager.goToScene("game");
        SceneManager.scenes["game"].start(players);
    }

    setSize(width, height) {
        super.setSize(width, height);
        if(this.singlePlayer_btn) {
            this.singlePlayer_btn.setPosition({x: this.screenWidth/2, y: this.screenHeight/2 - this.screenHeight * .25});
            this.twoPlayers_btn.setPosition({x: this.screenWidth/2, y: this.screenHeight/2 + this.screenHeight * .25});
        }
    }
}