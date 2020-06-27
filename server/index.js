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
    err ? console.log(err) : executeStatement();
});

const insert = 'INSERT INTO TemplateSchema.Templates (Recipient, SubjectLine, Body) VALUES(N\'test_recipient\', N\'test subject\', N\'test body\');';
const select = 'select * from TemplateSchema.Templates;';

const executeQuery = query => {
    let selectRequest = new Request(query, selectErr => {
        if (selectErr) {
            console.log(selectErr);
        } else {
            console.log('Select success');
        }
    });

    selectRequest.on("row", columns => {
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(selectRequest);
}

const executeStatement = () => {
    /*let request = new Request(insert, err => {
        if (err) {
            console.log(err);
        } else {
            console.log('Insert success');
            executeQuery(select);
        }
    });

    connection.execSql(request);*/

    executeQuery(select);
}