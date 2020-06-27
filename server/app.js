const database = require('./database');
const express = require('express');
const app = express();

app.post('/template', (req, res, next) => {
    database.addTemplate(req.body, err => {
        res.status(404).send(err);
    }, () => {
        res.sendStatus(200);
    });
});

app.get('/template', (req, res, next) => {
    database.getTemplate(req.query.id, err => {
        res.status(404).send(err);
    }, template => {
        res.send(template);
    });
});

module.exports = app;