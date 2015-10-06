var fs = require('fs'),
    readline = require('readline');

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

Column.prototype.toValue = function (value) {
    if (this.type === Number) {
        if (value === '') {
            return null;
        } else if (this.decimals) {
            return parseFloat(value);
        } else {
            return parseInt(value);
        }
    } else {
        value = value.slice(1, -1);
        
        if (this.type === Boolean) {
            switch (value) {
                case 'Y':
                    return true;
                case 'N':
                    return false;
            }
        } else if (this.type === String) {
            if (value !== '') {
                return value;
            }
        }
    }
};

function Table(title, name, primaryKey, foreignKeys, columns) {
    this.title = title;
    this.name = name;
    this.primaryKey = primaryKey;
    this.foreignKeys = foreignKeys;
    this.columns = columns;
}

Table.prototype.toKey = function (row) {
    if (this.primaryKey) {
        var key = [];
        for (var index = 0; index < this.primaryKey.columnNames.length; ++index) {
            var columnName = this.primaryKey.columnNames[index];
            var value = row[columnName];
            key.push(value);
        }
        return key;
    }
};

Table.prototype.toRow = function (line) {
    var row = {};
    var items = line.split("^");
    
    for (var itemNumber = 0; itemNumber < items.length; ++itemNumber) {
        var column = this.columns[itemNumber];
        row[column.name] = column.toValue(items[itemNumber].trim());
    }
    
    return row;
}

Table.prototype.load = function (folder, addRow, createIndex) {
    
    var filename = folder + '/' + this.name + '.txt';
    
    readline.createInterface({
        input: fs.createReadStream(filename)
    }).on('line', line => {
        if (line !== "") {
            var row = this.toRow(line);
            var key = this.toKey(row);
            addRow(this, key, row);
        }
    }).on('close', () => {
        createIndex(this);
    });
};

function Database(name, version, tables) {
    this.name = name;
    this.version = version;
    this.tables = tables;
}

Database.prototype.load = function (folder, addRow, createIndex) {
    for (var tableIndex = 0; tableIndex < this.tables.length; ++tableIndex) {
        var table = this.tables[tableIndex];
        table.load(folder, addRow, createIndex);
    }
};

module.exports = {
    TableReference : TableReference,
    ForeignKey: ForeignKey,
    PrimaryKey: PrimaryKey,
    Column: Column,
    Table: Table,
    Database: Database
};
