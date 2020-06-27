const database = require('./database');
const express = require('express');
const app = express();

app.get("/orders", (req, res, next) => {
    res.json(["Orange","Apple","Watermellon"]);
});

app.get('/template', (req, res, next) => {
    database.getTemplate(req.query.id, err => {
        res.status(404).send(err);
    }, template => {
        res.send(template);
    });
});

module.exports = app;