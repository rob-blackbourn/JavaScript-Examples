var Converter = require('../../converter');
var numbers = require('../../numbers');
var Fraction = numbers.Fraction;
var Real = numbers.Real;

module.exports = function (repository) {
    
    var litreConverter = repository.find({ name: 'litre' });
    
    var teaspoonScalar = new Real(new Fraction(5, 1000));
    var dessertspoonScalar = new Real(new Fraction(10, 1000));
    var tablespoonScalar = new Real(new Fraction(20, 1000));
    var cupScalar = new Real(new Fraction(250, 1000));
    
    repository.add(new Converter("volume", "utensils", "AUS", "tsp", "teaspoon", litreConverter,
        function (value) {
        return value.mul(teaspoonScalar);
    }, function (value) {
        return value.div(teaspoonScalar);
    }));
    repository.add(new Converter("volume", "utensils", "AUS", "dstspn", "dessertspoon", litreConverter,
        function (value) {
        return value.mul(dessertspoonScalar);
    }, function (value) {
        return value.div(dessertspoonScalar);
    }));
    repository.add(new Converter("volume", "utensils", "AUS", "tbsp", "tablespoon", litreConverter,
        function (value) {
        return value.mul(tablespoonScalar);
    }, function (value) {
        return value.div(tablespoonScalar);
    }));
    repository.add(new Converter("volume", "utensils", "AUS", "cup", "cup", litreConverter,
        function (value) {
        return value.mul(cupScalar);
    }, function (value) {
        return value.div(cupScalar);
    }));
};