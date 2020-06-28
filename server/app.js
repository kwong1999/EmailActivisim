const database = require('./database');
const express = require('express');
const app = express();

// Create new template
app.post('/template', (req, res, next) => {
    database.addTemplate(req.body, err => {
        res.status(404).send(err);
    }, () => {
        res.sendStatus(200);
    });
});

// Get template by id
app.get('/template', (req, res, next) => {
    database.getTemplate(req.query.id, err => {
        res.status(404).send(err);
    }, template => {
        res.send(template);
    });
});

// Get max n templates
app.get('/templates', (req, res, next) => {
    database.getTemplates(req.query.max, err => {
        res.status(404).send(err);
    }, templates => {
        res.send(templates);
    });
});

module.exports = app;