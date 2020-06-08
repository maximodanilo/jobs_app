const express = require('express');
const jobs = require('../routes/job');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/jobs', jobs);
    app.use(error);
}