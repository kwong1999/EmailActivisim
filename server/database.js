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



const insert = 'INSERT INTO TemplateSchema.Templates (Recipient, SubjectLine, Body, Description, Link) VALUES (@recipient, @subjectLine, @body, @description, @link);'
exports.addTemplate = (template, onError, onCompletion) => {
    let request = new Request(insert, err => {
        err ? onError(err) : onCompletion()
    });

    const recipient = template.recipient;
    const subjectLine = template.subjectLine;
    const body = template.body;
    const description = template.description;
    const link = template.link;

    if (!recipient || !subjectLine || !body || !description || !link) {
        onError('Missing required fields');
        return;
    }

    request.addParameter('recipient', TYPES.VarChar, recipient);
    request.addParameter('subjectLine', TYPES.VarChar, subjectLine);
    request.addParameter('body', TYPES.VarChar, body);
    request.addParameter('description', TYPES.VarChar, description);
    request.addParameter('link', TYPES.VarChar, link);

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

const select = 'select top(@max) * from TemplateSchema.Templates';
exports.getTemplates = (max, onError, onCompletion) => {
    let templates = [];
    let request = new Request(select, err => {
        if (err) {
            onError(err);
        } else {
            onCompletion(templates);
        }
    });
    request.addParameter('max', TYPES.Int, max);

    request.on('row', columns => {
        let template = {};
        for (const column of columns) {
            template[column.metadata.colName] = column.value;
        }
        templates.push(template);
    });

    while (!didConnect) {}

    connection.execSql(request);
}