var Converter = require('../../converter');
var numbers = require('../../numbers');
var Fraction = numbers.Fraction;
var Real = numbers.Real;

module.exports = function (repository) {
    
    var litreConverter = repository.find({ name: 'litre' });
    
    var goScalar = new Real(new Fraction(2401, 133100));
    var cupScalar = new Real(new Fraction(200, 1000));
    
    repository.add(new Converter("volume", "utensils", "JPN", "go", "go", litreConverter,
        function (value) {
        return value.mul(goScalar);
    }, function (value) {
        return value.div(goScalar);
    }));
    repository.add(new Converter("volume", "utensils", "JPN", "cup", "cup", litreConverter,
        function (value) {
        return value.mul(cupScalar);
    }, function (value) {
        return value.div(cupScalar);
    }));
};