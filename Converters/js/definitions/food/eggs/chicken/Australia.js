var Converter = require('../../../../converter');
var numbers = require('../../../../numbers');
var Fraction = numbers.Fraction;
var Real = numbers.Real;

module.exports = function (repository) {
    
    var grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });
    
    var kingSizeScalar = new Real(74);
    var jumboScalar = new Real(70);
    var veryLargeScalar = new Real(68.35);
    var largeScalar = new Real(62.45);
    var mediumScalar = new Real(45.95);
    
    repository.add(new Converter("mass", "food/chicken/eggs", "AUS", "king size", "king size", grammeConverter,
        function (value) {
        return value.mul(kingSizeScalar);
    }, function (value) {
        return value.div(kingSizeScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "AUS", "jumbo", "jumbo", grammeConverter,
        function (value) {
        return value.mul(jumboScalar);
    }, function (value) {
        return value.div(jumboScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "AUS", "XL", "very large", grammeConverter,
        function (value) {
        return value.mul(veryLargeScalar);
    }, function (value) {
        return value.div(veryLargeScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "AUS", "L", "large", grammeConverter,
        function (value) {
        return value.mul(largeScalar);
    }, function (value) {
        return value.div(largeScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "AUS", "M", "medium", grammeConverter,
        function (value) {
        return value.mul(mediumScalar);
    }, function (value) {
        return value.div(mediumScalar);
    }));

};