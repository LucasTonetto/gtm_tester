const http = require('http');
const port = 3000;
const state = ['stop', 'play'];
let server;

const playServer = () => {
    server = http.createServer((req, resp) => {
        resp.end("Hello");
    }).listen(port);
};

const stopServer = () => {
    server.close();
};

const runServer = () => {
    const nextState = state.reverse()[0];
    if(nextState == "play") {
        playServer();
    } else {
        stopServer();
    }
}

module.exports = runServer;