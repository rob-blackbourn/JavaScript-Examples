var australia = require('./Australia');
var canada = require('./Canada');
var fda = require('./FDA');
var japan = require('./Japan');
var uk = require('./UK');
var usa = require('./USA');

module.exports = function (repository) {
    australia(repository);
    canada(repository);
    fda(repository);
    japan(repository);
    uk(repository);
    usa(repository);
};