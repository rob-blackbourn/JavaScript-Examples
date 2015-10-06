var Converter = require('../../converter');

module.exports = function (repository) {
    var litreConverter = repository.find({ name: 'litre' });
    repository.add(new Converter("volume", "utensils", "FDA", "teaspoon", "tsp", true, 5, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "FDA", "tablespoon", "tbsp", true, 15, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "FDA", "cup", "cup", true, 240, 1000, 0, false, litreConverter));
};