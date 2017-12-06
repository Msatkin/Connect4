import Scene from './../Scene';
import * as PIXI from 'pixi.js';
import 'pixi-display';

module.exports = class ScenesManager {
    static create() {
        if (ScenesManager.renderer) return this;

        let width = window.innerWidth;
        let height = window.innerHeight;

        ScenesManager.scenes = {};
        ScenesManager.currentScene;
        ScenesManager.renderer;
        ScenesManager.backgroundLayer;
        ScenesManager.mainLayer;
        ScenesManager.isAudioEnabled = true;

        //Creates canvas
        ScenesManager.CreateCanvas(width, height);
        
        //Begins loop
        requestAnimationFrame(ScenesManager.loop);

        window.addEventListener("resize", ScenesManager.setSize);

        return this;
    }

    static CreateCanvas(width, height) {
        if(ScenesManager.renderer) return;
        //Creates renderer
        ScenesManager.renderer = PIXI.autoDetectRenderer(width, height);
        //Adds div to body and sets overflow to hidden
        let canvasContainer = document.createElement("div");
        canvasContainer.style.overflowX = "hidden";
        canvasContainer.style.overflowY = "hidden";
        document.body.appendChild(canvasContainer);
        //Adds canvas to newly added div
        canvasContainer.appendChild(ScenesManager.renderer.view);
    }

    static loop() {
        requestAnimationFrame(function () { ScenesManager.loop() });
        //Checks if there is a current scene and if it is not paused
        //Then updates and renders scene
        if (!ScenesManager.currentScene || ScenesManager.currentScene.isPaused()) return;
        ScenesManager.currentScene.update();
        ScenesManager.renderer.render(ScenesManager.currentScene);
    }

    //Creates new scene
    static createScene(id, sceneType) {
        //Returns undefined if scene already exists
        if (ScenesManager.scenes[id]) return undefined;
        //Creates new scene
        var scene = new sceneType();
        scene.sceneName = id;
        scene.renderer = ScenesManager.renderer;
        ScenesManager.scenes[id] = scene;

        return scene;
    }

    //Switches to the requested scene
    static goToScene(id) {
        if (ScenesManager.scenes[id]) {
            //Pauses current scene if there is a current scene
            if (ScenesManager.currentScene) ScenesManager.currentScene.pause();
            //Switchs to requested scene
            ScenesManager.currentScene = ScenesManager.scenes[id];
            //Resumes scene
            ScenesManager.currentScene.resume();
            return true;
        }
        return false;
    }
    //Resizes the canvas
    static setSize(){
        let width = window.innerWidth;
        let height = window.innerHeight;
        ScenesManager.renderer.resize(width, height);
        Object.keys(ScenesManager.scenes).map(function(scene) {
            ScenesManager.scenes[scene].setSize(width, height)
            return scene;
        });
    }
}