const http = require('http');
const port = 3000;
const state = ['stop', 'play'];
let server;

const getNextState = () => {
    return state.reverse()[0];
};

const playServer = () => {
    server = http.createServer((req, resp) => {
        resp.end("Hello");
    }).listen(port);
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