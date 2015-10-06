var numbers = require('./numbers');

function Converter(domain, system, authority, symbol, name, targetConverter, toTarget, fromTarget) {
    this.domain = domain;
    this.system = system;
    this.authority = authority;
    this.symbol = symbol;
    this.name = name;
    this.targetConverter = targetConverter;
    this.toTarget = toTarget;
    this.fromTarget = fromTarget;
}

Converter.prototype.toString = function () {
    return "domain=" + this.domain + ",system=" + this.system + ",authority=" + this.authority + ",symbol=" + this.symbol + ",name=" + this.name;
};

Converter.prototype.convert = function (value, to) {
    
    if (!(value instanceof numbers.Real)) {
        value = new numbers.Real(value);
    }
    
    var toConverters = [];
    var toConverter = to;
    while (toConverter.fromTarget) {
        toConverters.push(toConverter);
        toConverter = toConverter.targetConverter;
    }
    
    var from = this;
    while (from.toTarget) {
        
        if (from == to) {
            return value;
        }
        
        value = from.toTarget(value);
        
        var index = toConverters.indexOf(from);
        
        if (index == -1) {
            from = from.targetConverter;
        } else {
            for (; index >= 0; --index) {
                value = toConverters[index].fromTarget(value);
            }
            return value;
        }
    }
    
    while (toConverters.length > 0) {
        value = toConverters.pop().fromTarget(value);
    }
    
    return value;
};

module.exports = Converter;