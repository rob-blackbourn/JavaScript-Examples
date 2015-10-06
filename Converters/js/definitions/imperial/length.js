var Converter = require('../../converter');

module.exports = function (repository) {
    var meterConverter = repository.find({ name: 'meter' });
    var feetConverter = new Converter("length", "imperial", "UK", "feet", "ft", true, 3048, 10000, 0, false, meterConverter);
    repository.add(feetConverter);
    repository.add(new Converter("length", "imperial", "UK", "thou", "th", true, 1, 12000, 0, false, feetConverter));
    repository.add(new Converter("length", "imperial", "UK", "inch", "in", true, 1, 12, 0, false, feetConverter));
    repository.add(new Converter("length", "imperial", "UK", "yard", "yd", true, 3, 1, 0, false, feetConverter));
    repository.add(new Converter("length", "imperial", "UK", "chain", "ch", true, 66, 1, 0, false, feetConverter));
    repository.add(new Converter("length", "imperial", "UK", "furlong", "fur", true, 660, 1, 0, false, feetConverter));
    repository.add(new Converter("length", "imperial", "UK", "mile", "mi", true, 5280, 1, 0, false, feetConverter));
    repository.add(new Converter("length", "imperial", "UK", "league", "lea", true, 15840, 1, 0, false, feetConverter));
};