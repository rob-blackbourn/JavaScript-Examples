function gcd(a, b) {
    if (b == 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

function simplify(fraction) {
    var factor = gcd(fraction.numerator, fraction.denominator);
    fraction.numerator /= factor;
    fraction.denominator /= factor;
}

function isInt(value) {
    return parseInt(value) === value;
}

function Fraction(numerator, denominator) {
    if (isInt(numerator) && isInt(denominator)) {
        this.numerator = numerator;
        this.denominator = denominator;
        simplify(this);
    } else {
        this.numerator = Number.NaN;
        this.denominator = Number.NaN;
    }
}

Fraction.parse = function (s) {
    var result, whole, numerator, denominator;
    if ((result = /^\s*([+-]?\d+)\s+(\d+)\s*\/\s*(\d+)\s*$/.exec(s))) {
        // Fraction with whole part
        whole = parseInt(result[1]);
        numerator = parseInt(result[2]);
        denominator = parseInt(result[3]);
    } else if ((result = /^\s*([+-]?\d+)\s*\/\s*(\d+)\s*$/.exec(s))) {
        // Fraction
        whole = 0;
        numerator = parseInt(result[1]);
        denominator = parseInt(result[2]);
    } else if ((result = /^\s*([+-]?\d+)\s*$/.exec(s))) {
        // Whole
        whole = 0;
        numerator = parseInt(result[1]);
        denominator = 1;
    } else {
        return new Fraction();
    }
    
    return new Fraction(numerator + whole * denominator, denominator);
};

Fraction.prototype.toString = function () {
    var whole = parseInt(this.numerator / this.denominator);
    if (whole) {
        var numerator = this.numerator - whole * this.denominator;
        if (numerator == 0) {
            return whole.toString();
        } else {
            return whole + " " + numerator + "/" + this.denominator;
        }
    } else {
        return this.numerator + "/" + this.denominator;
    }
};

Fraction.prototype.valueOf = function () {
    return this.numerator / this.denominator;
};

Fraction.prototype.cmp = function (value) {
    return (this.numerator * value.denominator) - (value.numerator * this.denominator);
};

Fraction.prototype.eq = function (value) {
    return this.cmp(value) === 0;
};

Fraction.prototype.ne = function (value) {
    return !this.eq(value);
};

Fraction.prototype.lt = function (value) {
    return this.cmp(value) < 0;
};

Fraction.prototype.le = function (value) {
    return this.cmp(value) <= 0;
};

Fraction.prototype.gt = function (value) {
    return this.cmp(value) > 0;
};

Fraction.prototype.ge = function (value) {
    return this.cmp(value) >= 0;
};

Fraction.prototype.add = function (value) {
    return new Fraction((this.numerator * value.denominator) + (value.numerator * this.denominator), this.denominator * value.denominator);
};

Fraction.prototype.sub = function (value) {
    return new Fraction((this.numerator * value.denominator) - (value.numerator * this.denominator), this.denominator * value.denominator);
};

Fraction.prototype.mul = function (value) {
    return new Fraction(this.numerator * value.numerator, this.denominator * value.denominator);
};

Fraction.prototype.div = function (value) {
    return new Fraction(this.numerator * value.denominator, this.denominator * value.numerator);
};

Fraction.prototype.isNaN = function () {
    return Number.isNaN(this.numerator) || Number.isNaN(this.denominator);
};

Fraction.fromFloat = function (x, tolerance) {
    if (!tolerance)
        tolerance = 1.0E-6;
    
    var h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    var b = x;
    do {
        var a = Math.floor(b);
        var aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(x - h1 / k1) > x * tolerance);
    
    return new Fraction(parseInt(h1), parseInt(k1));
};

function maybeInstanceOf(value, constructor) {
    return typeof (value) === 'object' && value.constructor.name === constructor.name;
}

function Real(value) {
    
    var valueType = typeof (value);
    
    if (valueType === 'number') {
        if (isInt(value)) {
            this.value = new Fraction(parseInt(value), 1);
        } else {
            this.value = value;
        }
    } else if (value instanceof Fraction) {
        if (value.isNaN()) {
            this.value = Number.NaN;
        } else {
            this.value = value;
        }
    } else {
        if (/^\s*[+-]?\d*\.\d+([Ee][+-]?\d+)?\s*$/.test(value)) {
            this.value = parseFloat(value);
        } else {
            this.value = Fraction.parse(value);
            if (this.value.isNaN()) {
                this.value = Number.NaN;
            }
        }
    }
}

Real.prototype.toString = function () {
    return this.value.toString();
};

Real.prototype.isFloat = function () {
    return typeof (this.value) === 'number';
};

Real.prototype.valueOf = function () {
    return this.value.valueOf();
};

function areBothRealFractions(lhs, rhs) {
    return lhs instanceof Real && rhs instanceof Real && lhs.value instanceof Fraction && rhs.value instanceof Fraction;
}

Real.prototype.eq = function (number) {
    return areBothRealFractions(this, number) ? this.value.eq(number.value) : this.value == number;
};

Real.prototype.ne = function (number) {
    return areBothRealFractions(this, number) ? this.value.ne(number.value) : this.value != number;
};

Real.prototype.lt = function (number) {
    return areBothRealFractions(this, number) ? this.value.lt(number.value) : this.value < number;
};

Real.prototype.le = function (number) {
    return areBothRealFractions(this, number) ? this.value.le(number.value) : this.value <= number;
};

Real.prototype.gt = function (number) {
    return areBothRealFractions(this, number) ? this.value.gt(number.value) : this.value > number;
};

Real.prototype.ge = function (number) {
    return areBothRealFractions(this, number) ? this.value.ge(number.value) : this.value >= number;
};

Real.prototype.add = function (number) {
    return new Real(areBothRealFractions(this, number) ? this.value.add(number.value) : this.value + number);
};

Real.prototype.sub = function (number) {
    return new Real(areBothRealFractions(this, number) ? this.value.sub(number.value) : this.value - number);
};

Real.prototype.mul = function (number) {
    return new Real(areBothRealFractions(this, number) ? this.value.mul(number.value) : this.value * number);
};

Real.prototype.div = function (number) {
    return new Real(areBothRealFractions(this, number) ? this.value.div(number.value) : this.value / number);
};

// exports
module.exports = {
    Real: Real,
    Fraction: Fraction
};
