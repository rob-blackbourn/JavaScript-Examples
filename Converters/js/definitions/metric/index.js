var Converter = require('../../converter');
var Transformer = require('../../transformer');
var numbers = require('../../numbers');
var Real = numbers.Real;

function createSiConverters(repository, targetConverter) {
    
    var createPrefix = function (symbol, name, isMultiplier, scalar) {
        return { symbol: symbol, name: name, isMultiplier: isMultiplier, scalar: scalar };
    };
    var prefixes = [
        createPrefix('y', 'yocto', false, new Real(Math.pow(10, 24))),
        createPrefix('z', 'zepto', false, new Real(Math.pow(10, 21))),
        createPrefix('a', 'atto', false, new Real(Math.pow(10, 18))),
        createPrefix('f', 'femto', false, new Real(Math.pow(10, 15))),
        createPrefix('p', 'pico', false, new Real(Math.pow(10, 12))),
        createPrefix('n', 'nano', false, new Real(Math.pow(10, 9))),
        createPrefix('\u00b5', 'micro', false, new Real(Math.pow(10, 6))),
        createPrefix('m', 'milli', false, new Real(Math.pow(10, 3))),
        createPrefix('c', 'centi', false, new Real(Math.pow(10, 2))),
        createPrefix('d', 'deci', false, new Real(Math.pow(10, 1))),
        createPrefix('da', 'deca', true, new Real(Math.pow(10, 1))),
        createPrefix('h', 'hecto', true, new Real(Math.pow(10, 2))),
        createPrefix('k', 'kilo', true, new Real(Math.pow(10, 3))),
        createPrefix('M', 'mega', true, new Real(Math.pow(10, 6))),
        createPrefix('G', 'giga', true, new Real(Math.pow(10, 9))),
        createPrefix('T', 'tera', true, new Real(Math.pow(10, 12))),
        createPrefix('P', 'peta', true, new Real(Math.pow(10, 15))),
        createPrefix('E', 'exa', true, new Real(Math.pow(10, 18))),
        createPrefix('Z', 'zetta', true, new Real(Math.pow(10, 21))),
        createPrefix('Y', 'yotta', true, new Real(Math.pow(10, 24)))
    ];
    
    prefixes.map(function (prefix) {
        repository.add(
            new Converter(
                targetConverter.domain,
                targetConverter.system,
                targetConverter.authority,
                    prefix.symbol + targetConverter.symbol,
                    prefix.name + targetConverter.name,
                targetConverter,
                prefix.isMultiplier ?
                    function (value) {
                    return value.mul(prefix.scalar);
                } :
                    function (value) {
                    return value.div(prefix.scalar);
                },
                prefix.isMultiplier ?
                    function (value) {
                    return value.div(prefix.scalar);
                } :
                    function (value) {
                    return value.mul(prefix.scalar);
                }
            ))
    });
}

module.exports = function (repository) {
    var meterConverter = repository.add(new Converter("length", "metric", "si", "m", "meter", null, null, null));
    createSiConverters(repository, meterConverter);
    
    var grammeConverter = repository.add(new Converter("mass", "metric", "si", "g", "gramme", null, null, null));
    createSiConverters(repository, grammeConverter);
    
    var secondConverter = repository.add(new Converter("temperature", "metric", "si", "s", "second", null, null, null));
    createSiConverters(repository, secondConverter);
    
    var litreConverter = repository.add(new Converter("volume", "metric", "si", "l", "litre", null, null, null));
    createSiConverters(repository, litreConverter);
    
    var kelvinConverter = repository.add(new Converter("temperature", "metric", "si", "K", "Kelvin", null, null, null));
    createSiConverters(repository, kelvinConverter);
    
    repository.transformers.add(
        new Transformer(
            grammeConverter, litreConverter,
            function (value, scalar) { return value.mul(scalar); },
            function (value, scalar) { return value.div(scalar); }))
};