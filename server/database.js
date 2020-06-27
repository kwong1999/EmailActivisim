const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
require('dotenv').config();

const config = {
    authentication: {
        options: {
            userName: process.env.SERVER_USERNAME,
            password: process.env.SERVER_PASSWORD
        },
        type: "default"
    },
    server: 'caihack.database.windows.net',
    options: {
        database: 'emailtemplates',
        encrypt: true
    }
};

const connection = new Connection(config);
connection.on('connect', err => {
    if (err) {
        console.error(err);
    } else {
        // TODO: ...
    }
});

const executeQuery = (query, onError, onCompletion) => {
    let request = new Request(query, err => {
        if (err) {
            onError(err);
        }
    });

    request.on("row", columns => {
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(selectRequest);
}

exports.addTemplate = (template) => {
    return new Promise((resolve, reject) => {

    });
}

exports.getTemplate = (id, onError, onCompletion) => {
    onCompletion(id);
}

exports.getTemplates = (max) => {

}