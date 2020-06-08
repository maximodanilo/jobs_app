const express = require('express');
const candidates = require('../routes/candidate');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/candidates', candidates);
    app.use(error);
}