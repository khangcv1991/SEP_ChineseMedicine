var libs = process.cwd() + '/libs/';

//var log = require(libs + 'log')(module);
var db = require(libs + 'db/mongoose');
var config = require(libs + 'config');

var User = require(libs + 'model/user');
var Client = require(libs + 'model/client');
var AccessToken = require(libs + 'model/accessToken');
var RefreshToken = require(libs + 'model/refreshToken');

User.find({}, function(err, users){
    if (users.length == 0) {
        var user = new User({
            username: config.get("default:user:username"),
            password: config.get("default:user:password")
        });

        console.log("New user - %s:%s", user.username, user.password);
        user.save(function(err, user) {
            if(!err) {
                //log.info("New user - %s:%s", user.username, user.password);
                console.log("New user - %s:%s", user.username, user.password);
            }else {
                //return log.error(err);
                return console.log(err);
            }
        });
    }
    else
    {
        console.log("USERS EXIST");
    }
});

Client.find({}, function(err, clients){
    if (clients.length < 2) {

        var newClients = ["iosClient", "androidClient"];

        for (var i = 0; i < newClients.length ; i++)
        {
            var newClientName = newClients[i];
            var newClient = new Client({
                name: config.get("default:" + newClientName + ":name"),
                clientId: config.get("default:" + newClientName + ":clientId"),
                clientSecret: config.get("default:" + newClientName + ":clientSecret")
            });

            newClient.save(function(err, client) {

                if(!err) {
                    //log.info("New client - %s:%s", client.clientId, client.clientSecret);
                    console.log("New client - %s:%s", client.clientId, client.clientSecret);
                } else {
                    //return log.error(err);
                    return console.log(err);
                }

            });
        }
    }
    else
    {
        console.log("CLIENTS EXIST");
    }
});

//setTimeout(function() {
//    db.disconnect();
//}, 3000);