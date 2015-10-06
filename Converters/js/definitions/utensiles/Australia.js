var Converter = require('../../converter');

module.exports = function (repository) {
    var litreConverter = repository.find({ name: 'litre' });
    repository.add(new Converter("volume", "utensils", "AUS", "teaspoon", "tsp", true, 5, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "AUS", "dessertspoon", "dstspn", true, 10, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "AUS", "tablespoon", "tbsp", true, 20, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "AUS", "cup", "cup", true, 250, 1000, 0, false, litreConverter));
};