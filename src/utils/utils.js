const nodeListMap = (nodeList, fn) => {
    Array.prototype.map.call(nodeList, fn);
};

module.exports = {
    "nodeListMap": nodeListMap
};