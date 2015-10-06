var Converter = require('../../converter');
var numbers = require('../../numbers');
var Real = numbers.Real;

module.exports = function (repository) {
    
    var grainScalar = new Real(7000);
    var dramScalar = new Real(256);
    var ounceScalar = new Real(16);
    var stoneScalar = new Real(16);
    var quarterScalar = new Real(28);
    var hundredweightScalar = new Real(112);
    var tonScalar = new Real(2240);
    
    var grammeConverter = repository.find({ name: 'gramme' });
    var poundConverter = repository.add(new Converter("mass", "customary", "USA", "lb", "pound", grammeConverter,
        function (value) {
        return value.mul(453.59237);
    }, function (value) {
        return value.div(453.59237);
    }));
    repository.add(new Converter("mass", "customary", "USA", "gr", "grain", poundConverter,
        function (value) {
        return value.div(grainScalar);
    }, function (value) {
        return value.mul(grainScalar);
    }));
    repository.add(new Converter("mass", "customary", "USA", "dr", "dram", poundConverter,
        function (value) {
        return value.div(dramScalar);
    }, function (value) {
        return value.mul(dramScalar);
    }));
    repository.add(new Converter("mass", "customary", "USA", "oz", "ounce", poundConverter,
        function (value) {
        return value.div(ounceScalar);
    }, function (value) {
        return value.mul(ounceScalar);
    }));
    repository.add(new Converter("mass", "customary", "USA", "st", "stone", poundConverter,
        function (value) {
        return value.mul(stoneScalar);
    }, function (value) {
        return value.div(stoneScalar);
    }));
    repository.add(new Converter("mass", "customary", "USA", "qtr", "quarter", poundConverter,
        function (value) {
        return value.mul(quarterScalar);
    }, function (value) {
        return value.div(quarterScalar);
    }));
    repository.add(new Converter("mass", "customary", "USA", "cwt", "hundredweight", poundConverter,
        function (value) {
        return value.mul(hundredweightScalar);
    }, function (value) {
        return value.div(hundredweightScalar);
    }));
    repository.add(new Converter("mass", "customary", "USA", "tn", "ton", poundConverter,
        function (value) {
        return value.mul(tonScalar);
    }, function (value) {
        return value.div(tonScalar);
    }));
};