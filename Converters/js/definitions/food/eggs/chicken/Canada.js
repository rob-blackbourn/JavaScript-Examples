var Converter = require('../../../../converter');

module.exports = function (repository) {
    var grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });
    repository.add(new Converter("mass", "food/chicken/eggs", "CAN", "jumbo", "jumbo", true, 70, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "CAN", "very large", "XL", true, 66, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "CAN", "large", "L", true, 59, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "CAN", "medium", "M", true, 52, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "CAN", "small", "S", true, 45, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "CAN", "peewee", "peewee", true, 41, 1, 0, false, grammeConverter));
};