var Converter = require('../../converter');

module.exports = function (repository) {
    
    var kelvinConverter = repository.find({ name: 'Kelvin' });
    
    repository.add(new Converter("temperature", "metric", "si", '\u00b0C', "Celsius", kelvinConverter,
        function (value) {
        return value.add(273.15);
    }, function (value) {
        return value.sub(273.15);
    }));
    repository.add(new Converter("temperature", "imperial", "UK", '\u00b0F', "Fahrenheit", kelvinConverter,
        function (value) {
        return value.add(459.67).mul(5).div(9);
    }, function (value) {
        return value.mul(9).div(5).sub(459.67);
    }));
    repository.add(new Converter("temperature", "imperial", "UK", "GM", "Gas Mark", kelvinConverter,
        function (value) {
        return value.mul(125).div(9).add(422.038);
    }, function (value) {
        return value.sub(422.038).mul(9).div(125);
    }));
};