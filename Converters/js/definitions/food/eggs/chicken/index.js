var australia = require('./Australia');
var canada = require('./Canada');
var europe = require('./Europe');
var nz = require('./NewZealand');
var usa = require('./USA');

module.exports = function (repository) {
    australia(repository);
    canada(repository);
    europe(repository);
    nz(repository);
    usa(repository);
};