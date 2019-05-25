// this basically sets up functions for the model file to use to make quieries
var connection = require("./connection")

// The below helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    // empty array
    var arr = [];
    // for the length of the vals obj, create '?'s and push it to the empty array
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    // returns a string of the appropriate number of '?'s
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        //check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations
            if (typeof value === 'string' && value.indexOf(" ") >= 0) {
                value = `'${value}'`;
            }
            arr.push(`${key}=${value}`);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all SQL statement functions.
// The methods are usec in the model
var orm = {
    // Grab all rows in db
    // Used when routed by a get request to '/'
    all: function (tableInput, cb) {
        // Select everything from a specific table (to be defined in model)
        var queryString = `SELECT * FROM ${tableInput};`
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            // call back to model function
            cb(result);
        });
    },
    // Creates a new row based on user input
    // Used when routed by a post request to '/api/burgers'
    create: function (table, cols, vals, cb) {
        // Insert into a table (to be defined in model) columns use toString to get the array defined in controll
        // to one string. The values use the printQuestionMarks helper function
        var queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`
        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            // call back to model function
            cb(result);
        });
    },
    // Updates the devoured boolean based on if the devoured button is clicked
    // Used when routed by a patch request to '/api/burgers/id'
    update: function (table, objColVals, condition, cb) {
        // table is defined by model, uses objToSql helper function to take the object passed by the user input
        // to key=value format and a string. Condition is defined by the id of the row we want to update
        var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`
        console.log(queryString)
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            // call back to model function
            cb(result);
        });
    }
};

// Export the orm object for the model (cat.js).
module.exports = orm;