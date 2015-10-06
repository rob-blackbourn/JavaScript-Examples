var fs = require('fs');
var mongodb = require('mongodb');

function TableReference(tableName, columnNames) {
    this.tableName = tableName;
    this.ColumnNames = columnNames;
}

function ForeignKey(columnNames, tableReference) {
    this.columnNames = columnNames;
    this.reference = tableReference;
}

function PrimaryKey(columnNames) {
    this.columnNames = columnNames;
}

function Column(name, type, size, decimals, isNullable, description) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.decimals = decimals;
    this.isNullable = isNullable;
    this.description = description;
}

function Table(title, name, primaryKey, foreignKeys, columns) {
    this.title = title;
    this.name = name;
    this.primaryKey = primaryKey;
    this.foreignKeys = foreignKeys;
    this.columns = columns;
}

function Database(name, version, tables) {
    this.name = name;
    this.version = version;
    this.tables = tables;
    
    this.convert = function (column, value) {
        if (column.type === Number) {
            if (value === '') {
                return null;
            } else if (column.decimals) {
                return parseFloat(value);
            } else {
                return parseInt(value);
            }
        } else {
            value = value.slice(1, -1);
            
            if (column.type === Boolean) {
                switch (value) {
                    case 'Y':
                        return true;
                    case 'N':
                        return false;
                }
            } else if (column.type === String) {
                if (value !== '') {
                    return value;
                }
            }
        }
    };
    
    this.makeKey = function (table, row) {
        if (table.primaryKey) {
            var key = [];
            for (var index = 0; index < table.primaryKey.columnNames.length; ++index) {
                var columnName = table.primaryKey.columnNames[index];
                var value = row[columnName];
                key.push(value);
            }
            return key;
        }
    };
    
    this.loadTable = function (table, lines, addRow) {
        
        for (var lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
            
            var line = lines[lineIndex];
            if (line === "") {
                continue;
            }
            
            var row = {};
            var items = lines[lineIndex].split("^");
            
            for (var itemNumber = 0; itemNumber < items.length; ++itemNumber) {
                var column = table.columns[itemNumber];
                row[column.name] = this.convert(column, items[itemNumber].trim());
            }
            
            var key = this.makeKey(table, row);
            addRow(key, row);
        }
    };
    
    this.load = function (folder, addItem) {
        
        for (var tableIndex = 0; tableIndex < this.tables.length; ++tableIndex) {
            
            var table = this.tables[tableIndex];
            var path = folder + '/' + table.name + '.txt';
            var data = fs.readFileSync(path, 'utf8');
            var lines = data.split('\n');
            
            var addRow = function (key, row) {
                addItem(table, key, row);
            };
            
            this.loadTable(table, lines, addRow);
        }
    };
}

var database = new Database(
    'NDB',
    'SR28',
    [
        new Table(
            'Food Group Descriptions',
            'FD_GROUP',
            new PrimaryKey(['FdGrp_Cd']),
            [],
            [
                new Column('FdGrp_Cd', String, 4, null, false, '4-digit code identifying a food group. Only the first 2 digits are currently assigned. In the future, the last 2 digits may be used. Codes may not be consecutive.'),
                new Column('FdGrp_Desc', String, 60, null, false, 'Name of food group')
            ]
        ),
        new Table(
            'Food Description',
            'FOOD_DES',
            new PrimaryKey(['NDB_No']),
            [new ForeignKey(['FdGrp_Cd'], new TableReference('FD_GROUP', ['FdGrp_Cd']))],
            [
                new Column('NDB_No', String, 5, null, false, '5-digit Nutrient Databank number that uniquely identifies a food item. If this field is defined as numeric, the leading zero will be lost.'),
                new Column('FdGrp_Cd', String, 4, null, false, '4-digit code indicating food group to which a food item belongs.'),
                new Column('Long_Desc', String, 200, null, false, '200-character description of food item.'),
                new Column('Shrt_Desc', String, 60, null, false, '60-character abbreviated description of food item. Generated from the 200-character description using abbreviations in Appendix A. If short description is longer than 60 characters, additional abbreviations are made.'),
                new Column('ComName', String, 100, null, true, 'Other names commonly used to describe a food, including local or regional names for various foods, for example, “soda” or “pop” for “carbonated beverages.”'),
                new Column('ManufacName', String, 65, null, true, 'Indicates the company that manufactured the product, when appropriate.'),
                new Column('Survey', Boolean, true, 1, null, 'Indicates if the food item is used in the USDA Food and Nutrient Database for Dietary Studies (FNDDS) and thus has a complete nutrient profile for the 65 FNDDS nutrients.'),
                new Column('Ref_desc', String, 135, null, true, 'Description of inedible parts of a food item (refuse), such as seeds or bone.'),
                new Column('Refuse', Number, 2, null, true, 'Percentage of refuse.'),
                new Column('SciName', String, 65, null, true, 'Scientific name of the food item. Given for the least processed form of the food (usually raw), if applicable.'),
                new Column('N_Factor', Number, 4, 2, true, 'Factor for converting nitrogen to protein (see p. 12).'),
                new Column('Pro_Factor', Number, 4, 2, true, 'Factor for calculating calories from protein (see p. 13).'),
                new Column('Fat_Factor', Number, 4, 2, true, 'Factor for calculating calories from fat (see p. 13).'),
                new Column('CHO_Factor', Number, 4, 2, true, 'Factor for calculating calories from carbohydrate (see p. 13).')
            ]
        ),
        new Table(
            'Weights',
            'WEIGHT',
            new PrimaryKey(['NDB_No', 'Seq']),
            [new ForeignKey(['NDB_No'], new TableReference('FOOD_DES', ['NDB_No']))],
            [
                new Column('NDB_No', String, 5, null, false, '5-digit Nutrient Databank number.'),
                new Column('Seq', String, 2, null, false, 'Sequence number.'),
                new Column('Amount', Number, 5, 3, false, 'Unit modifier (for example, 1 in “1 cup”).'),
                new Column('Msre_Desc', String, 84, false, 'Description (for example, cup, diced, and 1-inch pieces).'),
                new Column('Gm_Wgt', Number, 7, 1, false, 'Gram weight.'),
                new Column('Num_Data_Pts', Number, 3, null, true, 'Number of data points.'),
                new Column('Std_Dev', Number, 7, 3, true, 'Standard deviation.')
            ]
        )
    ]);

mongodb.MongoClient.connect("mongodb://localhost:27017/exampleDb", function (err, db) {
    if (err) {
        console.log("Failed to connect to mongo");
    } else {
        console.log("We are connected");
        
        for (var tableIndex = 0; tableIndex < database.tables.length; ++tableIndex) {
            var table = database.tables[tableIndex];
            db.collection(table.name, function (err, collection) {
                var keys = {};
                for (var keyIndex = 0; keyIndex < table.primaryKey.columnNames.length; ++keyIndex) {
                    var columnName = table.primaryKey.columnNames[keyIndex];
                    keys[columnName] = 1;
                }
                collection.ensureIndex(keys, { unique: false, name: table.name + '_PK' }, function (err, result) {
                    if (err) {
                        console.log("Failed to create index " + err);
                    } else {
                        console.log("Created index " + result);
                    }
                });
            });
        }
        
        var addData = function (table, key, row) {
            db.collection(table.name, function (err, collection) {
                if (!err) {
                    collection.insert(row, { w: 1 }, function (err, result) {
                        if (err) {
                            console.log("Failed to insert row with error " + err + " for key " + key);
                        } else {
                            console.log("Inserted row for table " + table.name + " for key " + key);
                        }
                    });
                }
            })
        };
        
        database.load('/Users/robertblackbourn/Data/sr28asc', addData);
        
        db.collection('MEASURES', function (err, collection) {
            
            var measures = [
                { organisation: 'FDA', name: 'tsp', domain: 'volume', value: 5, unit: "ml", description: 'teaspoon' },
                { organisation: 'FDA', name: 'tbsp', domain: 'volume', value: 15, unit: 'ml', description: 'tablespoon' },
                { organisation: 'FDA', name: 'fl oz', domain: 'volume', value: 30, unit: 'ml', description: 'fluid ounce' },
                { organisation: 'FDA', name: 'cup', domain: volume, value: 240, unit: "ml", description: 'cup' },
                { organisation: 'USA', name: 'tsp', domain: 'volume', value: 4.93, unit: "ml", description: "teaspoon" },
                { organisation: 'USA', name: 'tbsp', domain: 'volume', value: 14.79, unit: 'ml', description: 'tablespoon' },
                { organisation: 'USA', name: 'fl oz', domain: 'volume', value: 29.57, unit: 'ml', description: 'fluid ounce' },
                { organisation: 'USA', name: 'cup', domain: 'volume', value: 236.59, unit: 'ml', description: 'cup' },
                { organisation: 'USA', name: 'pint', domain: 'volume', value: 473.18, unit: 'ml', description: 'pint' }
            ];
            
            collection.insert(measures, function (err, result) {
                if (err) {
                    console.log("Failed to insert row with error " + err);
                } else {
                    console.log("Inserted row for table " + table.name + " with result " + result);
                }
            });
            
            collection.ensureIndex({ organisation: 1, name: 1 }, { unique: true, name: 'MEASURES_PK' }, function (err, collection) {
                if (err) {
                    console.log("Failed to create index " + err);
                } else {
                    console.log("Created index " + result);
                }
            })
        })
    }
}
);

console.log("Done");
