var Converter = require('../../converter');
var numbers = require('../../numbers');
var Fraction = numbers.Fraction;
var Real = numbers.Real;

module.exports = function (repository) {
    
    var litreConverter = repository.find({ name: 'litre' });
    
    var teaspoonScalar = new Real(new Fraction(5, 1000));
    var tablespoonScalar = new Real(new Fraction(15, 1000));
    var cupScalar = new Real(new Fraction(240, 1000));
    
    repository.add(new Converter("volume", "utensils", "FDA", "tsp", "teaspoon", litreConverter,
        function (value) {
        return value.mul(teaspoonScalar);
    }, function (value) {
        return value.div(teaspoonScalar);
    }));
    repository.add(new Converter("volume", "utensils", "FDA", "tbsp", "tablespoon", litreConverter,
        function (value) {
        return value.mul(tablespoonScalar);
    }, function (value) {
        return value.div(tablespoonScalar);
    }));
    repository.add(new Converter("volume", "utensils", "FDA", "cup", "cup", litreConverter,
        function (value) {
        return value.mul(cupScalar);
    }, function (value) {
        return value.div(cupScalar);
    }));
};