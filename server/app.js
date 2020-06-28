const database = require('./database');
const express = require('express');
const cors = require('cors')({ origin: true });
const bodyParser = require('body-parser');

const app = express();
app.use(cors);
app.use(bodyParser());

const TIMEOUT = 3000; // 3 seconds

app.get('/', (req, res, next) => {
    res.send('Hello world');
});

// Create new template
app.post('/template', (req, res, next) => {
    const timeout = setTimeout(() => {
        res.sendStatus(408);
    }, TIMEOUT);

    database.addTemplate(req.body, err => {
        clearTimeout(timeout);
        res.status(404).send(err);
    }, () => {
        clearTimeout(timeout);
        res.sendStatus(200);
    });
});

// Get template by id
app.get('/template', (req, res, next) => {
    const timeout = setTimeout(() => {
        res.sendStatus(408);
    }, TIMEOUT);

    database.getTemplate(req.query.id, err => {
        clearTimeout(timeout);
        res.status(404).send(err);
    }, template => {
        clearTimeout(timeout);
        res.send(template);
    });
});

// Get max n templates
app.get('/templates', (req, res, next) => {
    const timeout = setTimeout(() => {
        res.sendStatus(408);
    }, TIMEOUT);

    database.getTemplates(req.query.max, err => {
        clearTimeout(timeout);
        res.status(404).send(err);
    }, templates => {
        clearTimeout(timeout);
        res.send(templates);
    });
});

module.exports = app;