var Converter = require('../../../../converter');
var numbers = require('../../../../numbers');
var Fraction = numbers.Fraction;
var Real = numbers.Real;

module.exports = function (repository) {
    
    var ounceConverter = repository.find({ authority: 'USA', system: 'customary', name: 'ounce' });
    
    var jumboScalar = new Real(new Fraction(5, 2));
    var veryLargeScalar = new Real(new Fraction(9, 4));
    var largeScalar = new Real(2);
    var mediumScalar = new Real(new Fraction(7, 4));
    var smallScalar = new Real(new Fraction(3, 2));
    var peeweeScalar = new Real(new Fraction(5, 4));
    
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "jumbo", "jumbo", ounceConverter,
        function (value) {
        return value.mul(jumboScalar);
    }, function (value) {
        return value.div(jumboScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "XL", "very large", ounceConverter,
        function (value) {
        return value.mul(veryLargeScalar);
    }, function (value) {
        return value.div(veryLargeScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "L", "large", ounceConverter,
        function (value) {
        return value.mul(largeScalar);
    }, function (value) {
        return value.div(largeScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "M", "medium", ounceConverter,
        function (value) {
        return value.mul(mediumScalar);
    }, function (value) {
        return value.div(mediumScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "S", "small", ounceConverter,
        function (value) {
        return value.mul(smallScalar);
    }, function (value) {
        return value.div(smallScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "peewee", "peewee", ounceConverter,
        function (value) {
        return value.mul(peeweeScalar);
    }, function (value) {
        return value.div(peeweeScalar);
    }));

};