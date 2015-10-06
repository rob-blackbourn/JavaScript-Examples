function Transformer(converter, targetConverter, convertTo, convertFrom) {
    this.converter = converter;
    this.targetConverter = targetConverter;
    this.convertTo = convertTo;
    this.convertFrom = convertFrom;
}

Transformer.prototype.transform = function (value, from, to, scalar) {
    if (from.domain == this.converter.domain) {
        value = from.convert(value, this.converter);
        value = this.convertTo(value, scalar);
        return this.targetConverter.convert(value, to);
    } else if (to.domain == this.converter.domain) {
        value = from.convert(value, this.targetConverter);
        value = this.convertFrom(value, scalar);
        return this.converter.convert(value, to);
    }
};

Transformer.prototype.toString = function () {
    return this.converter.domain + " to " + this.targetConverter.domain;
}

module.exports = Transformer;