var express = require('express');// server pipe line model.
var bodyParser = require('body-parser');//let me read body of http message.
var User = require('./user')//login user object.
var Firebase = require('firebase');// firebase DB.

var app = express();
var rootRef = new Firebase('https://burning-heat-1811.firebaseio.com/');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//for alwoing cross origin requests.
app.use(function (req, res, next) {
    var oneof = false;
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if (req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if (oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

//=============================== Server Functions ====================================================

//fire base create new account.
function createNewAccount(userParam, callbackParam) {

    rootRef.createUser({
        email: userParam.userEmail,
        password: userParam.userPassword
    }, function (error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            console.log("Successfully created user account with uid:", userData.uid);
        }
    });

}
//fire base login method.
function loginAccount(userParam, callbackParam) {

    rootRef.authWithPassword({
        email: userParam.userEmail,
        password: userParam.userPassword
    }, function (error, authData) {

        var flag = false;

        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            flag = true;
        }
        callbackParam(error, authData, flag);
    });

}

// Create a callback to handle the result of the authentication
function authHandler(error, authData) {

    if (error) {
        console.log("Login Failed!", error);
        failCallback();
    } else {
        console.log("Authenticated successfully with payload:", authData);
        successCallback();
    }
}
// Authenticate users with a custom authentication token
function verifyToken(tokenParam, callbackParam) {
    rootRef.authWithCustomToken("<token>", callbackParam);
}
// Or with an email/password combination
function authWithPassword(userParam, callbackParam) {
    rootRef.authWithPassword({
        email: userParam.userEmail,
        password: userParam.userPassword
    }, callbackParam)
}
//save to the data base new profile.
function createNewProfile(userProfileParam) {
    rootRef.child('users').set(userProfileParam);
}

//===================================  Server REST Functions ====================================================

// example: get method.
app.get('/', function (req, res) {
    res.send('Sentinal Service Is Up!');
});

// example: post method.
app.post('/login', function (req, res) {
    var userAsJSON = req.body.userInfo;
    var userAsObject = JSON.parse(userAsJSON);

    authWithPassword(userAsObject, function (error, authData) {
        var message = null;

        if (error) {
            console.log(error);
        } else {
            console.log("Successfully created user account");
            message = authData;
        }

        res.send(message);
    });
});
// refistrations post method.
app.post('/registrate', function (req, res) {
    var userAsJSON = req.body.userInfo;
    var userAsObject = JSON.parse(userAsJSON);
    
    createNewAccount(userAsObject, function (error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            console.log("Successfully created user account with uid:", userData.uid);
            createNewProfile(userAsObject);
        }
    });
    
    res.send(true);
});

app.post('/verify' , function (req , res) {
    var userToken = req.body.userInfo;
    var flag = false;
    verifyToken(userToken , function (error, authData) {
        if (error) {
            console.log(error);
        } else {
            console.log(authData);
            flag = true;
        }
    });
    
    res.send(flag);
});
//================================================ Server Info =================================================

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});