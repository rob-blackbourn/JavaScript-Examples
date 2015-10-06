var Converter = require('../../converter');
var numbers = require('../../numbers');
var Real = numbers.Real;

module.exports = function (repository) {
    
    var thouScalar = new Real(12000);
    var inchScalar = new Real(12);
    var yardScalar = new Real(3);
    var chainScalar = new Real(66);
    var furlongScalar = new Real(660);
    var mileScalar = new Real(5280);
    var leagueScalar = new Real(15840);
    
    var meterConverter = repository.find({ name: 'meter' });
    var feetConverter = repository.add(new Converter("length", "customary", "USA", "ft", "feet", meterConverter,
        function (value) {
        return value.mul(0.3048);
    }, function (value) {
        return value.div(0.3048);
    }));
    repository.add(new Converter("length", "customary", "USA", "th", "thou", feetConverter,
        function (value) {
        return value.div(thouScalar);
    }, function (value) {
        return value.mul(thouScalar);
    }));
    repository.add(new Converter("length", "customary", "USA", "in", "inch", feetConverter,
        function (value) {
        return value.div(inchScalar);
    }, function (value) {
        return value.mul(inchScalar);
    }));
    repository.add(new Converter("length", "customary", "USA", "yd", "yard", feetConverter,
        function (value) {
        return value.mul(yardScalar);
    }, function (value) {
        return value.div(yardScalar);
    }));
    repository.add(new Converter("length", "customary", "USA", "ch", "chain", feetConverter,
        function (value) {
        return value.mul(chainScalar);
    }, function (value) {
        return value.div(chainScalar);
    }));
    repository.add(new Converter("length", "customary", "USA", "fur", "furlong", feetConverter,
        function (value) {
        return value.mul(furlongScalar);
    }, function (value) {
        return value.div(furlongScalar);
    }));
    repository.add(new Converter("length", "customary", "USA", "mi", "mile", feetConverter,
        function (value) {
        return value.mul(mileScalar);
    }, function (value) {
        return value.div(mileScalar);
    }));
    repository.add(new Converter("length", "customary", "USA", "lea", "league", feetConverter,
        function (value) {
        return value.mul(leagueScalar);
    }, function (value) {
        return value.div(leagueScalar);
    }));
};