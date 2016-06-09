'use strict';

var table = require('azure-mobile-apps').table();

// Static Schema
//  Key is the Column Name in the DB
//  Value is the Type of the Column
// valid types are boolean, date, number, string
// table.columns = {
//     userid: 'string',
//     birthday: 'date',
//     isActive: 'boolean',
//     height: 'number'
// };
// table.dynamicSchema = false

// Dynamic Schema
//  With dynamic schema, we just store what we are provided
table.dynamicSchema = true;

// Access Rights are performed within the JSON file associated
// with this table.

// Add specific code to operations.
// For example, to only return records where the userid matches:
// table.read(function (context) {
    // context.query.where({ userid: context.user.id });
    // return context.execute();
// });

module.exports = table;
