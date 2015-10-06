var metric = require('./metric');
var imperial = require('./imperial');
var customary = require('./customary');
var temperature = require('./temperature');
var utensils = require('./utensils');
var food = require('./food');

module.exports = function (repository) {
    metric(repository);
    imperial(repository);
    customary(repository);
    temperature(repository);
    utensils(repository);
    food(repository);
};