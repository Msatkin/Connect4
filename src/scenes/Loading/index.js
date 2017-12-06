import SceneManager from './../SceneManager';
import Scene from './../Scene';
import loadImages from './../../assets/images/imageLoader';

export default class LoadingScene extends Scene {
    constructor() {
        super();
        loadImages(this.loadingComplete);
    }

    loadingComplete() {
        SceneManager.goToScene("main");
        SceneManager.currentScene.start();
    }
}