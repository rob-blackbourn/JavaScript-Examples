var Converter = require('../../converter');

module.exports = function (repository) {
    var grammeConverter = repository.find({ name: 'gramme' });
    var poundConverter = repository.add(new Converter("mass", "imperial", "UK", "pound", "lb", true, 45359237, 100000, 0, false, grammeConverter));
    repository.add(new Converter("mass", "imperial", "UK", "grain", "gr", true, 1, 7000, 0, false, poundConverter));
    repository.add(new Converter("mass", "imperial", "UK", "drachm", "dr", true, 1, 256, 0, false, poundConverter));
    repository.add(new Converter("mass", "imperial", "UK", "ounce", "oz", true, 1, 16, 0, false, poundConverter));
    repository.add(new Converter("mass", "imperial", "UK", "stone", "st", true, 14, 1, 0, false, poundConverter));
    repository.add(new Converter("mass", "imperial", "UK", "quarter", "qtr", true, 28, 1, 0, false, poundConverter));
    repository.add(new Converter("mass", "imperial", "UK", "hundredweight", "cwt", 112, 1, 0, false, poundConverter));
    repository.add(new Converter("mass", "imperial", "UK", "ton", "tn", true, 2240, 1, 0, false, poundConverter));
};