var Converter = require('../../../../converter');

module.exports = function (repository) {
    var ounceConverter = repository.find({ authority: 'USA', system: 'customary', name: 'ounce' });
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "jumbo", "jumbo", true, 5, 2, 0, false, ounceConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "very large", "XL", true, 9, 4, 0, false, ounceConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "large", "L", true, 2, 1, 0, false, ounceConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "medium", "M", true, 7, 4, 0, false, ounceConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "small", "S", true, 3, 2, 0, false, ounceConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "USA", "peewee", "peewee", true, 5, 4, 0, false, ounceConverter));
};