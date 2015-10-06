var Converter = require('../../converter');

module.exports = function (repository) {
    
    var litreConverter = repository.find({ name: 'litre' });
    var pintConverter = repository.add(new Converter("volume", "imperial", "UK", "pint", "pt", true, 56826125, 100000000, 0, false, litreConverter));
    repository.add(new Converter("volume", "imperial", "UK", "minim", "min", true, 1, 9600, 0, false, pintConverter));
    repository.add(new Converter("volume", "imperial", "UK", "fluid scruple", "fl scruple", true, 1, 480, 0, false, pintConverter));
    repository.add(new Converter("volume", "imperial", "UK", "fluid drachm", "fl dr", true, 1, 160, 0, false, pintConverter));
    repository.add(new Converter("volume", "imperial", "UK", "fluid ounce", "fl oz", true, 1, 20, 0, false, pintConverter));
    repository.add(new Converter("volume", "imperial", "UK", "gill", "gl", true, 1, 4, 0, false, pintConverter));
    repository.add(new Converter("volume", "imperial", "UK", "quart", "qt", true, 2, 1, 0, false, pintConverter));
    repository.add(new Converter("volume", "imperial", "UK", "gallon", "gal", true, 8, 1, 0, false, pintConverter));
};