var Converter = require('../../converter');

module.exports = function (repository) {
    var usaFluidOunceConverter = repository.find({ authority: 'USA', name: 'fluid ounce' });
    repository.add(new Converter("volume", "utensils", "USA", "drop", "drop", true, 1, 576, 0, false, usaFluidOunceConverter));
    repository.add(new Converter("volume", "utensils", "USA", "teaspoon", "tsp", true, 1, 6, 0, false, usaFluidOunceConverter));
    repository.add(new Converter("volume", "utensils", "USA", "tablespoon", "tbsp", true, 1, 2, 0, false, usaFluidOunceConverter));
    repository.add(new Converter("volume", "utensils", "USA", "cup", "cup", true, 8, 1, 0, false, usaFluidOunceConverter));
};