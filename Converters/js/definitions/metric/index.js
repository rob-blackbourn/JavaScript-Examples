var Converter = require('../../converter');
var Transformer = require('../../transformer');
var numbers = require('../../numbers');
var Real = numbers.Real;

function createSiConverters(repository, baseConverter) {
    
    var createPrefix = function (symbol, name, isScalar, value) {
        return { symbol: symbol, name: name, isScalar: isScalar, value: value };
    };
    var prefixes = [
        createPrefix('y', 'yocto', false, Math.pow(10, 24)),
        createPrefix('z', 'zepto', false, Math.pow(10, 21)),
        createPrefix('a', 'atto', false, Math.pow(10, 18)),
        createPrefix('f', 'femto', false, Math.pow(10, 15)),
        createPrefix('p', 'pico', false, Math.pow(10, 12)),
        createPrefix('n', 'nano', false, Math.pow(10, 9)),
        createPrefix('\u00b5', 'micro', false, Math.pow(10, 6)),
        createPrefix('m', 'milli', false, Math.pow(10, 3)),
        createPrefix('c', 'centi', false, Math.pow(10, 2)),
        createPrefix('d', 'deci', false, Math.pow(10, 1)),
        createPrefix('da', 'deca', true, Math.pow(10, 1)),
        createPrefix('h', 'hecto', true, Math.pow(10, 2)),
        createPrefix('k', 'kilo', true, Math.pow(10, 3)),
        createPrefix('M', 'mega', true, Math.pow(10, 6)),
        createPrefix('G', 'giga', true, Math.pow(10, 9)),
        createPrefix('T', 'tera', true, Math.pow(10, 12)),
        createPrefix('P', 'peta', true, Math.pow(10, 15)),
        createPrefix('E', 'exa', true, Math.pow(10, 18)),
        createPrefix('Z', 'zetta', true, Math.pow(10, 21)),
        createPrefix('Y', 'yotta', true, Math.pow(10, 24))
    ];
    
    prefixes.map(function (prefix) {
        repository.add(
            new Converter(
                baseConverter.domain,
                baseConverter.system,
                baseConverter.authority,
                prefix.name + baseConverter.name,
                prefix.symbol + baseConverter.symbol,
                false,
                prefix.isMultiplier ? value : 1,
                prefix.isMultiplier ? 1 : value,
                0,
                false,
                baseConverter,
            ))
    });
}

module.exports = function (repository) {
    var meterConverter = repository.add(new Converter("length", "metric", "si", "meter", "m", false, 1, 1, null));
    createSiConverters(repository, meterConverter);
    
    var grammeConverter = repository.add(new Converter("mass", "metric", "si", "gramme", "g", false, 1, 1, null));
    createSiConverters(repository, grammeConverter);
    
    var secondConverter = repository.add(new Converter("temperature", "metric", "si", "second", "s", false, 1, 1, null));
    createSiConverters(repository, secondConverter);
    
    var litreConverter = repository.add(new Converter("volume", "metric", "si", "litre", "l", false, 1, 1, null));
    createSiConverters(repository, litreConverter);
    
    var kelvinConverter = repository.add(new Converter("temperature", "metric", "si", "Kelvin", "K", false, 1, 1, null));
    createSiConverters(repository, kelvinConverter);
    
    repository.transformers.add(
        new Transformer(
            grammeConverter, litreConverter,
            function (value, scalar) { return value.mul(scalar); },
            function (value, scalar) { return value.div(scalar); }))
};