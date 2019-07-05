require('dotenv').config();
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

server.listen(process.env.SOCKET_IO);

io.on('connection', function (socket) {
    console.log('Starting');

    var redisClient = redis.createClient({
        host : process.env.REDIS_HOST,
        auth_pass: process.env.REDIS_PASSWORD
    });

    redisClient.psubscribe('*', function(err, count) {});

    redisClient.on('pmessage', function (subscribed, channel, message) {
        message = JSON.parse(message);
        socket.emit(message.evento, message.datos);
    });
});
