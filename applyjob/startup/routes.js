const express = require('express');
const candidatejobapplication = require('../routes/candidatejobapplication');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/candidatejobapplication', candidatejobapplication);
    app.use(error);
}