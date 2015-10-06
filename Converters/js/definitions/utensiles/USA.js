var Converter = require('../../converter');

module.exports = function (repository) {
    
    var usaFluidOunceConverter = repository.find({ authority: 'USA', name: 'fluid ounce' });
    
    repository.add(new Converter("volume", "utensils", "USA", "drop", "drop", usaFluidOunceConverter,
        function (value) {
        return value.mul(576);
    }, function (value) {
        return value.div(576);
    }));
    repository.add(new Converter("volume", "utensils", "USA", "tsp", "teaspoon", usaFluidOunceConverter,
        function (value) {
        return value.mul(6);
    }, function (value) {
        return value.div(6);
    }));
    repository.add(new Converter("volume", "utensils", "USA", "tbsp", "tablespoon", usaFluidOunceConverter,
        function (value) {
        return value.mul(2);
    }, function (value) {
        return value.div(2);
    }));
    repository.add(new Converter("volume", "utensils", "USA", "cup", "cup", usaFluidOunceConverter,
        function (value) {
        return value.div(8);
    }, function (value) {
        return value.mul(8);
    }));
};