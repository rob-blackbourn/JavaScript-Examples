var Converter = require('../../../../converter');

module.exports = function (repository) {
    var grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });
    repository.add(new Converter("mass", "food/chicken/eggs", "NZ", "size 8", "jumbo", true, 68, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "NZ", "size 7", "large", true, 62, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "NZ", "size 6", "standard", true, 53, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "NZ", "size 5", "medium", true, 44, 1, 0, false, grammeConverter));
    repository.add(new Converter("mass", "food/chicken/eggs", "NZ", "size 4", "pullet", true, 35, 1, 0, false, grammeConverter));
};