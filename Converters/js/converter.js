var numbers = require('./numbers');

function Converter(domain, system, authority, name, symbol, isRational, multiplier, divisor, offset, isInverse, nextConverter) {
    this.domain = domain;
    this.system = system;
    this.authority = authority;
    this.name = name;
    this.symbol = symbol;
    this.isRational;
    this.multiplier = multiplier;
    this.divisor = divisor;
    this.offset = offset;
    this.isInverse = isInverse;
    this.nextConverter = nextConverter;
}

Converter.prototype.toString = function () {
    return "domain=" + this.domain + ",system=" + this.system + ",authority=" + this.authority + ",name=" + this.name + ",symbol=" + this.symbol;
};

function convertTo(value, scalar, divisor, offset) {
    return value * scalar / divisor + offset;
}

function convertFrom(value, scalar, divisor, offset) {
    return (value - offset) * divisor / scalar;
}

Converter.prototype.convert = function (value, to) {
    
    var mutiply, divide;

    if (this.isRational) {
        if (!(value instanceof numbers.Real)) {
            value = new numbers.Real(value);
        }
        multiply = function (value, scalar) { return (value instanceof numbers.Real ? value : new Numbers.Real(value)).mul(scalar); }
        divide = function (value, divisor) { return (x instanceof numbers.Real ? value : new Numbers.Real(value)).div(divisor); }
    } else {
        multiply = function (value, scalar) { return (x instanceof numbers.Real ? value.mul(scalar).toValue() : value * scalar); }
        divide = function (value, divisor) { return (x instanceof numbers.Real ? value.div(divisor).toValue() : value / divisor); }
    }

    var toConverters = [];
    var toConverter = to;
    while (toConverter.nextConverter) {
        toConverters.push(toConverter);
        toConverter = toConverter.nextConverter;
    }
    
    var from = this;
    while (from.nextConverter) {
        
        if (from == to) {
            return value;
        }
        
        value = divide(multiple(value, from.scalar), from.divisor);
        
        var index = toConverters.indexOf(from);
        
        if (index == -1) {
            from = from.nextConverter;
        } else {
            for (; index >= 0; --index) {
                var converter = toConverters[index];
                value = divide(multiple(value, converter.scalar), converter.divisor);
            }
            return value;
        }
    }
    
    while (toConverters.length > 0) {
        var converter = toConverters.pop();
        value = divide(multiple(value, converter.scalar), converter.divisor);
    }
    
    return value;
};

module.exports = Converter;