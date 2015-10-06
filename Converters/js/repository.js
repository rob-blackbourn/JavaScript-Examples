function TransformerRepository() {
    this.transformers = [];
}

TransformerRepository.prototype.add = function (transformer) {
    this.transformers.push(transformer);
    return transformer;
};

TransformerRepository.prototype.find = function (domain, targetDomain) {
    for (var index = 0; index < this.transformers.length; ++index) {
        var transformer = this.transformers[index];
        if ((domain == transformer.converter.domain && targetDomain == transformer.targetConverter.domain) 
            || (domain == transformer.targetConverter.domain && targetDomain == transformer.converter.domain)) {
            return transformer;
        }
    }
};

var filter = function (candidates, criterium, getter) {
    if (criterium) {
        var possibles = [];
        for (var i = 0; i < candidates.length; ++i) {
            if (getter(candidates[i]) == criterium) {
                possibles.push(candidates[i]);
            }
        }
        return possibles;
    } else {
        return candidates;
    }
};

function ConverterRepository(defaultClassification, defaultAuthority) {
    
    this.defaultClassification = defaultClassification;
    this.defaultAuthority = defaultAuthority;
    
    this.converters = [];
    this.transformers = new TransformerRepository();
}

ConverterRepository.prototype.add = function (converter) {
    this.converters.push(converter);
    return converter;
};

ConverterRepository.prototype.find = function (criteria) {
    var possibles = this.findAll(criteria);
    
    var filtered;
    
    if (possibles.length > 1) {
        filtered = filter(possibles, this.defaultClassification, function (converter) { return converter.system; });
        if (filtered.length > 0) {
            possibles = filtered;
        }
    }
    
    if (possibles.length > 1) {
        filtered = filter(possibles, this.defaultAuthority, function (converter) { return converter.authority; });
        if (filtered.length > 0) {
            possibles = filtered;
        }
    }
    
    return possibles[0];
};

ConverterRepository.prototype.findAll = function (criteria) {
    
    var possibles = this.converters;
    possibles = filter(possibles, criteria.domain, function (converter) { return converter.domain; });
    possibles = filter(possibles, criteria.system, function (converter) { return converter.system; });
    possibles = filter(possibles, criteria.authority, function (converter) { return converter.authority; });
    possibles = filter(possibles, criteria.symbol, function (converter) { return converter.symbol; });
    possibles = filter(possibles, criteria.name, function (converter) { return converter.name; });
    
    return possibles;
};

ConverterRepository.prototype.convert = function (converter, value, targetConverter) {
    if (converter.domain == targetConverter.domain) {
        return converter.convert(value, targetConverter);
    } else {
        var transformer = this.transformers.find(converter.domain, targetConverter.domain);
        if (transformer) {
            return transformer.transform(value, converter, targetConverter);
        }
    }
};

module.exports = new ConverterRepository();
