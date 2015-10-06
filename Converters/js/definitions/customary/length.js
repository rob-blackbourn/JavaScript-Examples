var Converter = require('../../converter');

module.exports = function (repository) {
    var meterConverter = repository.find({ name: 'meter' });
    var feetConverter = new Converter("length", "customary", "USA", "feet", "ft", true, 32808, 10000, 0, false, meterConverter);
    repository.add(feetConverter);
    repository.add(new Converter("length", "customary", "USA", "thou", "th", true, 1, 12000, 0, false, feetConverter));
    repository.add(new Converter("length", "customary", "USA", "inch", "in", true, 1, 12, 0, false, feetConverter));
    repository.add(new Converter("length", "customary", "USA", "yard", "yd", true, 3, 1, 0, false, feetConverter));
    repository.add(new Converter("length", "customary", "USA", "chain", "ch", true, 66, 1, 0, false, feetConverter));
    repository.add(new Converter("length", "customary", "USA", "furlong", "fur", true, 660, 1, 0, false, feetConverter));
    repository.add(new Converter("length", "customary", "USA", "mile", "mi", true, 5280, 1, 0, false, feetConverter));
    repository.add(new Converter("length", "customary", "USA", "league", "lea", true, 15840, 1, 0, false, feetConverter));
};