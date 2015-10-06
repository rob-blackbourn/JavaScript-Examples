var Converter = require('../../converter');
var numbers = require('../../numbers');
var Real = numbers.Real;

module.exports = function (repository) {
    
    var minimScalar = new Real(9600);
    var fluidDramScalar = new Real(160);
    var fluidOunceScalar = new Real(16);
    var quartScalar = new Real(2);
    var gallonScalar = new Real(8);
    
    var litreConverter = repository.find({ name: 'litre' });
    var pintConverter = repository.add(new Converter("volume", "customary", "USA", "pt", "pint", litreConverter,
        function (value) {
        return value.mul(0.4732);
    }, function (value) {
        return value.div(0.4732);
    }));
    repository.add(new Converter("volume", "customary", "USA", "min", "minim", pintConverter,
        function (value) {
        return value.div(minimScalar);
    }, function (value) {
        return value.mul(minimScalar);
    }));
    repository.add(new Converter("volume", "customary", "USA", "fl dr", "fluid dram", pintConverter,
        function (value) {
        return value.div(fluidDramScalar);
    }, function (value) {
        return value.mul(fluidDramScalar);
    }));
    repository.add(new Converter("volume", "customary", "USA", "fl oz", "fluid ounce", pintConverter,
        function (value) {
        return value.div(fluidOunceScalar);
    }, function (value) {
        return value.mul(fluidOunceScalar);
    }));
    repository.add(new Converter("volume", "customary", "USA", "qt", "quart", pintConverter,
        function (value) {
        return value.mul(quartScalar);
    }, function (value) {
        return value.div(quartScalar);
    }));
    repository.add(new Converter("volume", "customary", "USA", "gal", "gallon", pintConverter,
        function (value) {
        return value.mul(gallonScalar);
    }, function (value) {
        return value.div(gallonScalar);
    }));
};