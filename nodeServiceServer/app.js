var express = require('express');// server pipe line model.
var bodyParser = require('body-parser');//let me read body of http message.
var User = require('./user')//login user object.
var Firebase = require('firebase');// firebase DB.
var http = require('http');//for making http req.
var smtpSettings = require('./fixtures/smtp_settings.json');
var emailjs = require('emailjs');
var request = require('request');
var needle = require('needle');

var app = express();
var rootRef = new Firebase('https://burning-heat-1811.firebaseio.com/');

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb' }));

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
    }, callbackParam);

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

// Or with an email/password combination
function authWithPassword(userParam, callbackParam) {
    rootRef.authWithPassword({
        email: userParam.userEmail,
        password: userParam.userPassword
    }, callbackParam)
}
//save to the data base new profile.
function createNewProfile(userProfileParam) {
    rootRef.child('users').push(userProfileParam);
}

//=============================================  Server REST Functions ====================================================


app.post('/snapshot', function (req, res) {
    var base64 = req.body.userInfo.image,
        tmpfile = require('os').tmpDir() + '/' + require('process').hrtime()[1] + '.' + Math.round(Math.random() * 999999) + '.png';
    var emailToSend = req.body.userInfo.email;
    var userToken = req.body.userInfo.token;

    rootRef.authWithCustomToken(userToken, function (error, authData) {

        if (error) {
            console.log(error);
            res.status(500);
            res.send('Firebase Error!');
            res.end();
        } else {
            base64 = base64.replace(/^data:image\/png;base64,/, "");
            require("fs").writeFile(tmpfile, base64, 'base64', function (err) {

                emailjs.server.connect(smtpSettings).send({
                    subject: 'Here is your snapshot',
                    text: 'Your chosen snapshot',
                    from: 'Aviad Apps <aviadapps@gmail.com>',
                    to: 'User < ' + emailToSend + ' >',
                    attachment: [
                        {
                            path: tmpfile,
                            type: 'image/png',
                            name: 'Screenshot.png'
                        }
                    ]
                }, function (e, r) {
                    require('fs').unlink(tmpfile);
                });
            });

            console.log(authData);
            res.send('email is sent');
            res.end();
        }
    });



});

/*app.post('/snapshot', function (req, res) {
    var base64 = req.body.userInfo.image64,
        tmpfile = require('os').tmpDir() + '/' + require('process').hrtime()[1] + '.' + Math.round(Math.random() * 999999) + '.png';
    
    base64 = base64.replace(/^data:image\/png;base64,/, "");
    require("fs").writeFile(tmpfile, base64, 'base64', function(err) {
        
        emailjs.server.connect(smtpSettings).send({
            subject : 'Here is your snapshot',
            text : 'Your chosen snapshot',
            from : 'Aviad Apps <aviadapps@gmail.com>',
            to : 'Aviad Shua <aviadgawl@gmail.com>',
            attachment : [
            {
                path: tmpfile,
                type: 'image/png',
                name: 'Screenshot.png'
            }
            ]
        }, function (e,r) {
            require('fs').unlink(tmpfile);
        });
    });
    
});*/

// example: get method.
app.get('/', function (req, res) {
    res.send('Sentinal Service Is Up!');
});

// example: post method.
app.post('/login', function (req, res) {
    var userAsJSON = req.body.userInfo;
    var userAsObject = JSON.parse(userAsJSON);
    var userProfile;
    
     rootRef.child('users').once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key();
            var childData = childSnapshot.val();
            if(childData.userEmail == userAsObject.userEmail){
                userProfile = childData;
                console.log(childData.userEmail);
            }
                });
            });
    
    authWithPassword(userAsObject, function (error, authData) {
        var message = null;

        if (error) {
            res.status(500);
            res.send('Firebase Error!');
            res.end();
        } else {
          
            
            message = authData.token;
        }

        res.send({profile:userProfile , token: message});
    });
});
// refistrations post method.
app.post('/registrate', function (req, res) {
    var userAsJSON = req.body.userInfo;
    var userAsObject = JSON.parse(userAsJSON);

    createNewAccount(userAsObject, function (error, userData) {
        if (error) {
            console.log("Error creating user:", error);
            res.status(500);
            res.send('Firebase Error!');
            res.end();
        } else {
            console.log("Successfully created user account", userData);
            createNewProfile(userAsObject);
            res.send({ message: 'User Created', flag: false });
        }
    });
});
//verify the give token in firebase.
app.post('/verify', function (req, res) {
    var userToken = req.body.userInfo;

    rootRef.authWithCustomToken(userToken, function (error, authData) {

        if (error) {
            console.log(error);
            res.status(500);
            res.send('Firebase Error!');
            res.end();
        } else {
            console.log(authData);
            res.send(true);
            res.end();
        }
    });
});

//change password
app.post('/changePassword', function (clientReq, clientRes) {
    var userOldPassword = clientReq.body.userInfo.oldPassword;
    var userNewPassword = clientReq.body.userInfo.newPassword;
    var userEmail = clientReq.body.userInfo.email;

    rootRef.changePassword({
        email: userEmail,
        oldPassword: userOldPassword,
        newPassword: userNewPassword
    }, function (error) {
        if (error) {
            switch (error.code) {
                case "INVALID_PASSWORD":
                    console.log("The specified user account password is incorrect.");
                    clientRes.status(500);
                    clientRes.send("The specified user account password is incorrect.");
                    clientRes.end();
                    break;
                case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                    clientRes.status(500);
                    clientRes.send("The specified user account does not exist.");
                    clientRes.end();
                    break;
                default:
                    console.log("Error changing password:", error);
            }
        } else {
            console.log("User password changed successfully!");
            clientRes.send("User password changed successfully!");
            clientRes.end();
        }
    });


});//end of responce matric status code.

//reset password.
app.post('/resetPassword', function (req, res) {
    var userEmail = req.body.userInfo;

    rootRef.resetPassword({ email: userEmail }, function (error) {
        if (error) {
            switch (error.code) {
                case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                    res.status(500);
                    res.send("The specified user account does not exist.");
                    res.end();
                    break;
                default:
                    console.log("Error resetting password:", error);
                    res.status(500);
                    res.send("Error resetting password:", error);
                    res.end();
                    break;
            }
        } else {
            console.log("Password reset email sent successfully!");
            res.send("Password reset email sent successfully!");
            res.end();
        }
    });
});

//gets the responceMatric responce time.
app.post('/responceMatricResponceTime', function (clientReq, clientRes) {
    var userToken = clientReq.body.userInfo.token;
    var userDur = clientReq.body.userInfo.durQuary;

    rootRef.authWithCustomToken(userToken, function (error, authData) {

        if (error) {
            console.log(error);
            clientRes.status(400);
            clientRes.send('Firebase Error!');
            clientRes.end();
        } else {
            console.log('message form firebase' + authData);

            http.get('http://diamondsmock2.azurewebsites.net/ResponseMetrics/ResponseTimes' + userDur, (serviceRes) => {
                // consume response body
                var data;
                serviceRes.on('data', (resData) => {
                    console.log(`dimond mock test: ${resData}`);
                    data = resData;
                });

                serviceRes.on('end', () => {
                    if (serviceRes.statusCode >= 400) {
                        clientRes.status(serviceRes.statusCode);
                        clientRes.send('Diamond Mock Server Error');
                        clientRes.end();
                    }
                    else {
                        clientRes.send(data);
                        clientRes.end();
                    }
                })
            }).on('error', (e) => {
                console.log(`Got error: ${e.message}`);
                clientRes.status(500);
                clientRes.send('Diamond Mock Error!');
                clientRes.end();
            });
        }
    });

});
//gets the responceMatric status code.
app.post('/responceMatricStatusCode', function (clientReq, clientRes) {
    var userToken = clientReq.body.userInfo;
    var userDur = clientReq.body.userDurQuary;

    rootRef.authWithCustomToken(userToken, function (error, authData) {

        if (error) {
            console.log(error);
            clientRes.status(400);
            clientRes.send('Firebase Error!');
            clientRes.end();
        } else {
            console.log('message form firebase' + authData);

            http.get('http://diamondsmock2.azurewebsites.net/ResponseMetrics/StatusCodes' + userDur, (serviceRes) => {
                // consume response body
                var data;
                serviceRes.on('data', (resData) => {
                    console.log(`dimond mock test: ${resData}`);
                    data = resData;
                });

                serviceRes.on('end', () => {
                    if (serviceRes.statusCode >= 400) {
                        clientRes.status(serviceRes.statusCode);
                        clientRes.send('Dimaond Mock Error!');
                        clientRes.end();
                    }
                    else {
                        clientRes.send(data);
                        clientRes.end();
                    }
                })
            }).on('error', (e) => {
                console.log(`Got error: ${e.message}`);
                clientRes.status(400);
                clientRes.send('Dimaond Mock Error!');
                clientRes.end();
            });
        }//end of if.
    });//end of fire base auth.

});//end of responce matric status code.


//top failed api chart.
app.post('/allTopfaliedApi', function (clientReq, clientRes) {
    var userToken = clientReq.body.userInfo.token;

    rootRef.authWithCustomToken(userToken, function (error, authData) {

        if (error) {
            console.log(error);
            clientRes.sendStatus(400);
            clientRes.send('Firebase Error!');
            clientRes.end();
        } else {
            console.log('message form firebase' + authData);

            http.get('http://diamondsmock2.azurewebsites.net/Apis/GetAll', (serviceRes) => {
                // consume response body
                var data = '';
                serviceRes.on('data', (resData) => {

                    data += resData;
                });

                serviceRes.on('end', () => {
                    clientRes.send(data);
                    console.log(data)
                    clientRes.end();

                });
            }).on('error', (e) => {
                console.log(`Got error: ${e.message}`);
                clientRes.status(500);
                clientRes.send('Diamond Mock Error!');
                clientRes.end();
            });
        }
    });

});
////top failed api chart data.
app.post('/topfaliedApiData', function (clientReq, clientRes) {
    var userToken = clientReq.body.userInfo.token;
    var payload = { 'services': 'all', 'duration': 2, 'top': 2 }; //clientReq.body.userInfo.quary;
    
    rootRef.authWithCustomToken(userToken, function (error, authData) {

        if (error) {
            console.log(error);
            clientRes.sendStatus(400);
            clientRes.send('Firebase Error!');
            clientRes.end();
        } else {
            console.log('message form firebase' + authData.data);

            needle.post('http://diamondsmock2.azurewebsites.net/Apis/Failed', payload,
                function (err, resp, body) {
                    console.log('this is the body ' + body);
                    console.log('this is the responce ' + resp);
                    console.log('this is the error ' + err);

                    {}
                });
            
            /*request.post(
                'http://diamondsmock2.azurewebsites.net/Apis/Failed',
                { userQuary },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body + " " + response.statusCode)
                    }
                    
                    if(error){
                        console.log(error.data);
                    }
                }
                );*/

            /*http.post('http://diamondsmock2.azurewebsites.net/Apis/Failed', userQuary, (serviceRes) => {
                // consume response body
                var data = '';
                serviceRes.on('data', (resData) => {

                    data += resData;
                });

                serviceRes.on('end', () => {
                    clientRes.send(data);
                    console.log(data)
                    clientRes.end();

                });
            }).on('error', (e) => {
                console.log(`Got error: ${e.message}`);
                clientRes.status(500);
                clientRes.send('Diamond Mock Error!');
                clientRes.end();
            });*/
        }
    });

});
//====================================================== Server Info =========================================================

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});
