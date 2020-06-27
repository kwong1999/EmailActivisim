const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const config = {
    authentication: {
        options: {
            userName: '<redacted>',
            password: '<redacted>'
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

const query = 'CREATE TABLE Templates (' +
    'TemplateId INT AUTO_INCREMENT,' +
    'Recipient varchar(320),' +
    'Subject varchar(998),' +
    'Body varchar(max) not null,' +
    'primary key(TemplateId)' +
    ');';

const insert = 'insert into Templates (Body) values (\'body\');';
const select = 'select * from Templates;';

const list = 'select schema_name(t.schema_id) as schema_name, t.name as table_name, t.create_date, t.modify_date from sys.tables t order by schema_name, table_name;'

const executeStatement = () => {
    const request = new Request(query, err => {
        err ? console.log(err) : console.log('Success');
    });

    request.on("row", columns => {
        console.log('...');
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
}