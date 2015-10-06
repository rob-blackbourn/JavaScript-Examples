var Converter = require('../../converter');

module.exports = function (repository) {
    var litreConverter = repository.find({ name: 'litre' });
    var pintConverter = new Converter("volume", "customary", "USA", "pint", "pt", true, 4732, 10000, 0, false, litreConverter);
    repository.add(pintConverter);
    repository.add(new Converter("volume", "customary", "USA", "minim", "min", true, 1, 9600, 0, false, pintConverter));
    repository.add(new Converter("volume", "customary", "USA", "fluid dram", "fl dr", true, 1, 160, 0, false, pintConverter));
    repository.add(new Converter("volume", "customary", "USA", "fluid ounce", "fl oz", true, 1, 16, 0, false, pintConverter));
    repository.add(new Converter("volume", "customary", "USA", "quart", "qt", true, 2, 1, 0, false, pintConverter));
    repository.add(new Converter("volume", "customary", "USA", "gallon", "gal", true, 8, 1, 0, false, pintConverter));
};