require('babel-register');
require('./app.js');

//Adds google font
let googleFont = document.createElement('link');
googleFont.href = "https://fonts.googleapis.com/css?family=Nunito";
googleFont.rel = "stylesheet";
document.body.appendChild(googleFont);