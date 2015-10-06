function UnitDomain(domain) {
    this.domain = domain;
}

var length = new UnitDomain("Length");
var mass = new UnitDomain("Mass");
var time = new UnitDomain("Time");
var temperature = new UnitDomain("Temperature");
var volume = new UnitDomain("Volume");

function Unit(symbol, name) {
    this.symbol = symbol;
    this.name = name;
}

// Set up some units.
var milliMeters = new Unit("mm", "millimeters");
var milliMeters = new Unit("cm", "centimeters");
var milliMeters = new Unit("m", "meters");
var milliMeters = new Unit("km", "kilometers");
var milliMeters = new Unit("\"", "inch");

function Converters() {
    
    this.converters = {};
    
    this.add = function (name, toSi, fromSi) {
        this.converters[name] = {
            toSi: toSi,
            fromSi: fromSi
        };
    };
    
    this.convert = function (value, from, to) {
        return converters[to].fromSi(converters[from].toSi(value));
    }
}

var converters = new Converters();

converters.add('m', function (value) { return value; }, function (value) { return value; });
converters.add('mm', function (value) { return value / 1000; }, function (value) { return value * 1000; });
converters.add('cm', function (value) { return value / 100; }, function (value) { return value * 100; });
converters.add('km', function (value) { return value * 1000; }, function (value) { return value / 1000; });
converters.add('inch', function (value) { return value * 0.0254; }, function (value) { return value / 0.0254; });

converters.add('kg', function (value) { return value; }, function (value) { return value; });
converters.add('g', function (value) { return value / 1000; }, function (value) { return value * 1000; });

converters.add('K', function (value) { return value; }, function (value) { return value; });
converters.add('C', function (value) { return value - 273.15; }, function (value) { return value + 273.15; });

converters.add('A', function (value) { return value; }, function (value) { return value; });
converters.add('mol', function (value) { return value; }, function (value) { return value; });
converters.add('cd', function (value) { return value; }, function (value) { return value; });

