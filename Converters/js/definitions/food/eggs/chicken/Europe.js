var Converter = require('../../../../converter');

module.exports = function (repository) {
    var grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });
    repository.add(new Converter("mass", "food/chicken/eggs", "EUR", "very large", "XL", true, 73, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "EUR", "large", "L", true, 68, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "EUR", "medium", "M", true, 58, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "EUR", "small", "S", true, 53, 1, 0, false, grammeConverter));
};