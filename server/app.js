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
    if (!req.body) {
        res.status(404).send('Body missing from request');
        return;
    }

    database.addTemplate(req.body, err => {
        res.status(404).send(err);
    }, () => {
        res.sendStatus(200);
    });
});

// Get template by id
app.get('/template', (req, res, next) => {
    if (!req.query || !req.query.id || isNaN(req.query.id)) {
        res.status(404).send('Parameter missing from request');
        return;
    }

    database.getTemplate(req.query.id, err => {
        res.status(404).send(err);
    }, template => {
        res.send(template);
    });
});

// Get max n templates
app.get('/templates', (req, res, next) => {
    if (!req.query || !req.query.max || isNaN(req.query.max)) {
        res.status(404).send('Parameter missing from request');
        return;
    }

    database.getTemplates(req.query.max, err => {
        res.status(404).send(err);
    }, templates => {
        res.send(templates);
    });
});

module.exports = app;