var Converter = require('../../../../converter');
var numbers = require('../../../../numbers');
var Fraction = numbers.Fraction;
var Real = numbers.Real;

module.exports = function (repository) {
    
    var grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });
    
    var veryLargeScalar = new Real(73);
    var largeScalar = new Real(68);
    var mediumScalar = new Real(58);
    var smallScalar = new Real(53);
    
    repository.add(new Converter("mass", "food/chicken/eggs", "EUR", "XL", "very large", grammeConverter,
        function (value) {
        return value.mul(veryLargeScalar);
    }, function (value) {
        return value.div(veryLargeScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "EUR", "L", "large", grammeConverter,
        function (value) {
        return value.mul(largeScalar);
    }, function (value) {
        return value.div(largeScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "EUR", "M", "medium", grammeConverter,
        function (value) {
        return value.mul(mediumScalar);
    }, function (value) {
        return value.div(mediumScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "EUR", "S", "small", grammeConverter,
        function (value) {
        return value.mul(smallScalar);
    }, function (value) {
        return value.div(smallScalar);
    }));

};