var Converter = require('../../converter');

module.exports = function (repository) {
    var litreConverter = repository.find({ name: 'litre' });
    repository.add(new Converter("volume", "utensils", "CAN", "teaspoon", "tsp", true, 5, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "CAN", "dessertspoon", "dstspn", true, 10, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "CAN", "tablespoon", "tbsp", true, 15, 1000, 0, false, litreConverter));
    repository.add(new Converter("volume", "utensils", "CAN", "cup", "cup", true, 250, 1000, 0, false, litreConverter));
};