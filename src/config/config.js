const fs = require("fs");
const {editFileSync, getFileContentSync} = require("../utils/fileManipulate");

const editFileContent = (jsonFileContent, newPort) => {
    jsonFileContent.port = newPort;
    return JSON.stringify(jsonFileContent);
};

const editPort = (newPort, path) => {
    const jsonFileContent = JSON.parse(getFileContentSync(path));
    const newContent = editFileContent(jsonFileContent, newPort);
    editFileSync(path, newContent);
};

module.exports = {
    "editPort": editPort
};