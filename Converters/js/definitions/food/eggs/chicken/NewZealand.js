var Converter = require('../../../../converter');
var numbers = require('../../../../numbers');
var Fraction = numbers.Fraction;
var Real = numbers.Real;

module.exports = function (repository) {
    
    var grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });
    
    var jumboScalar = new Real(68);
    var largeScalar = new Real(62);
    var standardScalar = new Real(53);
    var mediumScalar = new Real(44);
    var pulletScalar = new Real(35);
    
    repository.add(new Converter("mass", "food/chicken/eggs", "NZ", "size 8", "jumbo", grammeConverter,
        function (value) {
        return value.mul(jumboScalar);
    }, function (value) {
        return value.div(jumboScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "NZ", "size 7", "large", grammeConverter,
        function (value) {
        return value.mul(largeScalar);
    }, function (value) {
        return value.div(largeScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "NZ", "size 6", "standard", grammeConverter,
        function (value) {
        return value.mul(standardScalar);
    }, function (value) {
        return value.div(standardScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "NZ", "size 5", "medium", grammeConverter,
        function (value) {
        return value.mul(mediumScalar);
    }, function (value) {
        return value.div(mediumScalar);
    }));
    repository.add(new Converter("mass", "food/chicken/eggs", "NZ", "size 4", "pullet", grammeConverter,
        function (value) {
        return value.mul(pulletScalar);
    }, function (value) {
        return value.div(pulletScalar);
    }));

};