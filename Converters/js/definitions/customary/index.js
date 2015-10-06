var length = require('./length');
var mass = require('./mass');
var volume = require('./volume');

module.exports = function (repository) {
    length(repository);
    mass(repository);
    volume(repository);
};