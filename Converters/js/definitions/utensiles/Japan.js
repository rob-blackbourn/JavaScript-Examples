var Converter = require('../../converter');

module.exports = function (repository) {
    var litreConverter = repository.find({ name: 'litre' });
    repository.add(new Converter("volume", "utensils", "JPN", "go", "go", true, 2401, 133100, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "JPN", "cup", "cup", true, 200, 1000, 0, false, litreConverter));
};