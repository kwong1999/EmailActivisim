const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

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

    connection.execSql(request);
}

const insert = 'INSERT INTO TemplateSchema.Templates (Recipient, SubjectLine, Body) VALUES (@recipient, @subjectLine, @body);'
exports.addTemplate = (template, onError, onCompletion) => {
    let request = new Request(insert, err => {
        err ? onError(err) : onCompletion()
    });
    request.addParameter('recipient', TYPES.VarChar, template.recipient);
    request.addParameter('subjectLine', TYPES.VarChar, template.subjectLine);
    request.addParameter('body', TYPES.VarChar, template.body);
    connection.execSql(request);
    // TODO: capture & return template id?
}

exports.getTemplate = (id, onError, onCompletion) => {
    
}

exports.getTemplates = (max, onError, onCompletion) => {

}