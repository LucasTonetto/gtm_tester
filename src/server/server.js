const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

const port = 3000;
const state = ['stop', 'play'];
let server;

app.get("/*", function(req, res) {
    res.sendFile(path.resolve(__dirname + '../../templates' + req.url));
});

const getNextState = () => {
    return state.reverse()[0];
};

const playServer = () => {
    server = app.listen(port);
};

const stopServer = () => {
    server.close();
};

const runServer = () => {
    if(getNextState() == "play") {
        playServer();
    } else {
        stopServer();
    }
}

module.exports = runServer;