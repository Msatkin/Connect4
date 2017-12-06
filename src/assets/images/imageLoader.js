import * as PIXI from 'pixi.js';
import boardPiece from './boardPiece.png';
import token from './token.png';
import mainBackground from './background.jpg';
import audioOn from './audio_on.png';
import audioOff from './audio_off.png';
import gear from './gear.png';
import gameBackground from './gameBackground.jpg';
import endBackground from './endBackground.jpg';
import { loader } from 'pixi.js';

//Pre-loads images
export default function(callback) {
    const loader = new PIXI.loaders.Loader();
    
    loader.add('column', boardPiece);
    loader.add('token', token);
    loader.add('mainBackground', mainBackground);
    loader.add('gameBackground', gameBackground);
    loader.add('endBackground', endBackground);
    loader.add('audioOn', audioOn);
    loader.add('audioOff', audioOff);
    loader.add('gear', gear);

    loader.load();
    loader.on('progress', onProgress);
    loader.onComplete.add(onAssetsLoaded);
    if (callback) loader.onComplete.add(callback);
}


//Sets loader
function onAssetsLoaded(loader)
{
    PIXI.loaders.shared = loader;
    console.log("Assets Loaded");
}

//Prints loading progress
function onProgress(loader, res) {
    console.log("Loading: " + Math.round(loader.progress) + "%");
}