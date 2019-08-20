const http = require('http');
const express = require('express');
const path = require('path');
const {getNextOption} = require('../utils/utils');

const app = express();

const port = 3000;
const states = ['stop', 'play'];
let server;

app.get("/*", function(req, res) {
    res.sendFile(path.resolve(__dirname + '../../templates' + req.url));
});

const playServer = () => {
    server = app.listen(port);
};

const stopServer = () => {
    server.close();
};

const runServer = () => {
    if(getNextOption(states) == "play") {
        playServer();
    } else {
        stopServer();
    }
}

module.exports = runServer;