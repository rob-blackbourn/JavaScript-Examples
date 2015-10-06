var Converter = require('../../converter');
var numbers = require('../../numbers');
var Real = numbers.Real;

module.exports = function (repository) {
    
    var minimScalar = new Real(9600);
    var fluidScrupleScalar = new Real(480);
    var fluidDrachmScalar = new Real(160);
    var fluidOunceScalar = new Real(20);
    var gillScalar = new Real(4);
    var quartScalar = new Real(2);
    var gallonScalar = new Real(8);
    
    var litreConverter = repository.find({ name: 'litre' });
    var pintConverter = repository.add(new Converter("volume", "imperial", "UK", "pt", "pint", litreConverter,
        function (value) {
        return value.mul(0.56826125);
    }, function (value) {
        return value.div(0.56826125);
    }));
    repository.add(new Converter("volume", "imperial", "UK", "min", "minim", pintConverter,
        function (value) {
        return value.div(minimScalar);
    }, function (value) {
        return value.mul(minimScalar);
    }));
    repository.add(new Converter("volume", "imperial", "UK", "fl scruple", "fluid scruple", pintConverter,
        function (value) {
        return value.div(fluidScrupleScalar);
    }, function (value) {
        return value.mul(fluidScrupleScalar);
    }));
    repository.add(new Converter("volume", "imperial", "UK", "fl dr", "fluid drachm", pintConverter,
        function (value) {
        return value.div(fluidDrachmScalar);
    }, function (value) {
        return value.mul(fluidDrachmScalar);
    }));
    repository.add(new Converter("volume", "imperial", "UK", "fl oz", "fluid ounce", pintConverter,
        function (value) {
        return value.div(fluidOunceScalar);
    }, function (value) {
        return value.mul(fluidOunceScalar);
    }));
    repository.add(new Converter("volume", "imperial", "UK", "gl", "gill", pintConverter,
        function (value) {
        return value.div(gillScalar);
    }, function (value) {
        return value.mul(gillScalar);
    }));
    repository.add(new Converter("volume", "imperial", "UK", "qt", "quart", pintConverter,
        function (value) {
        return value.mul(quartScalar);
    }, function (value) {
        return value.div(quartScalar);
    }));
    repository.add(new Converter("volume", "imperial", "UK", "gal", "gallon", pintConverter,
        function (value) {
        return value.mul(gallonScalar);
    }, function (value) {
        return value.div(gallonScalar);
    }));
};