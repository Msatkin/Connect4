import SceneManager from './scenes/SceneManager';
import LoadingScene from './scenes/Loading';
import MainScene from './scenes/Main';
import GameScene from './scenes/Game';
import EndScene from './scenes/End';

SceneManager.create();

//Creates Loading Scene
let loading = SceneManager.createScene('loading', LoadingScene);

//Creates the Game scene
let main = SceneManager.createScene('main', MainScene);

//Creates the Game scene
let game = SceneManager.createScene('game', GameScene);

//Creates the Game scene
let end = SceneManager.createScene('end', EndScene);

SceneManager.setSize();

//switch to loading scene Scene 
SceneManager.goToScene('loading');
