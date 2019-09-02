const fs = require("fs");

const getFileContent = (pathFile) => {
    const fileContent = fs.readFileSync(pathFile, 'utf-8', (error, data) => {
        if (error) throw error;
        return data;
    });
    return fileContent;
};

const editFileContent = (jsonFileContent, newPort) => {
    jsonFileContent.port = newPort;
    return JSON.stringify(jsonFileContent);
};

const editFile = (pathFile, newContent) => {
    fs.writeFileSync(pathFile, newContent, (error) => {
        if (error) throw error;
    });
};

const editPort = (newPort, path) => {
    const jsonFileContent = JSON.parse(getFileContent(path));
    const newContent = editFileContent(jsonFileContent, newPort);
    editFile(path, newContent);
};

module.exports = {
    "editPort": editPort
};