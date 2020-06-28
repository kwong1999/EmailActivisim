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
        encrypt: true,
        rowCollectionOnDone: true
    }
};

// TODO: how to wait until connection is complete?

const connection = new Connection(config);
let didConnect = false;
connection.on('connect', err => {
    if (err) {
        console.error(err);
    } else {
        didConnect = true;
    }
});

const insert = 'INSERT INTO TemplateSchema.Templates (Recipient, SubjectLine, Body) VALUES (@recipient, @subjectLine, @body);'
exports.addTemplate = (template, onError, onCompletion) => {
    let request = new Request(insert, err => {
        err ? onError(err) : onCompletion()
    });
    request.addParameter('recipient', TYPES.VarChar, template.recipient);
    request.addParameter('subjectLine', TYPES.VarChar, template.subjectLine);
    request.addParameter('body', TYPES.VarChar, template.body);

    while (!didConnect) {}

    connection.execSql(request);
    // TODO: capture & return template id?
}

const selectById = 'select * from TemplateSchema.Templates where TemplateId = @id;'
exports.getTemplate = (id, onError, onCompletion) => {
    let request = new Request(selectById, err => {
        if (err) {
            onError(err);
        }
    });
    request.addParameter('id', TYPES.Int, id);

    request.on('row', columns => {
        let template = {};
        for (const column of columns) {
            template[column.metadata.colName] = column.value;
        }
        onCompletion(template);
    });

    while (!didConnect) {}

    connection.execSql(request);
}

exports.getTemplates = (max, onError, onCompletion) => {

}