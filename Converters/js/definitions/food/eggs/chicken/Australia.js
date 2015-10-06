var Converter = require('../../../../converter');

module.exports = function (repository) {
    var grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });
    repository.add(new Converter("mass", "food/chicken/eggs", "AUS", "king size", "king size", true, 74, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "AUS", "jumbo", "jumbo", true, 70, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "AUS", "very large", "XL", true, 6835, 100, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "AUS", "large", "L", true, 6245, 100, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "AUS", "medium", "M", true, 4595, 100, 0, false, grammeConverter));
};