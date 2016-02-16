var Firebase = require('firebase');// firebase DB.
var rootRef = new Firebase('https://burning-heat-1811.firebaseio.com/');

function errorLogger() {
    
    this.rootRef = rootRef;
    
    this.logErr = function (params) {
        
    }
}