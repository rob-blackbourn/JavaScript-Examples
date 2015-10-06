var Converter = require('../../converter');

module.exports = function (repository) {
    var grammeConverter = repository.find({ name: 'gramme' });
    var poundConverter = new Converter("mass", "customary", "USA", "pound", "lb", true, 100000, 45359237, 0, false, grammeConverter);
    repository.add(poundConverter);
    repository.add(new Converter("mass", "customary", "USA", "grain", "gr", true, 1, 7000, 0, false, poundConverter));
    repository.add(new Converter("mass", "customary", "USA", "dram", "dr", true, 1, 256, 0, false, poundConverter));
    repository.add(new Converter("mass", "customary", "USA", "ounce", "oz", true, 1, 16, 0, false, poundConverter));
    repository.add(new Converter("mass", "customary", "USA", "stone", "st", true, 16, 1, 0, false, poundConverter));
    repository.add(new Converter("mass", "customary", "USA", "quarter", "qtr", true, 28, 1, 0, false, poundConverter));
    repository.add(new Converter("mass", "customary", "USA", "hundredweight", "cwt", true, 112, 1, 0, false, poundConverter));
    repository.add(new Converter("mass", "customary", "USA", "ton", "tn", true, 2240, 1, 0, false, poundConverter));
};