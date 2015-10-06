var Converter = require('../../converter');

module.exports = function (repository) {
    var litreConverter = repository.find({ system: 'metric', name: 'litre' });
    var pintConverter = repository.find({ system: 'imperial', name: 'pint' });
    repository.add(new Converter("volume", "utensils", "UK", "teaspoon", "tsp", true, 5, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "UK", "dessertspoon", "dstspn", true, 10, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "UK", "tablespoon", "tbsp", true, 15, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "UK", "cup", "cup", true, 1, 2, 0, false, pintConverter));
};