const validateObjectId = require('../middleware/validateObjectId');
const { CandidateJobApplication, validate } = require('../models/candidatejobapplication');
const express = require('express');
const router = express.Router();
const winston = require('winston');
const axios = require('axios');

router.get('/', async(req, res) => {
    const candidatejobapplicattions = await CandidateJobApplication.find().sort('name');
    res.send(candidatejobapplicattions);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    axios.all([
        axios.get(''),
        axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-02')
    ]).then(axios.spread((response1, response2) => {
        console.log(response1.data.url);
        console.log(response2.data.url);
    })).catch(error => {
        console.log(error);
    });


    let candidateJobApplication = new CandidateJobApplication({
        candidateId: req.body.candidateId,
        jobId: req.body.jobId,
        status: req.body.status,
        notes: req.body.notes
    });
    candidateJobApplication = await candidateJobApplication.save();

    res.send(candidateJobApplication);
});

router.put('/:id', [validateObjectId], async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const candidateJobApplication = await CandidateJobApplication.findOneAndUpdate(req.params.id, {
        candidateId: req.body.candidateId,
        jobId: req.body.jobId,
        status: req.body.status,
        notes: req.body.notes
    }, {
        new: true
    });

    if (!candidateJobApplication) return res.status(404).send('The application with the given ID was not found.');

    res.send(candidateJobApplication);
});

router.delete('/:id', validateObjectId, async(req, res) => {
    const candidateJobApplication = await CandidateJobApplication.findByIdAndRemove(req.params.id);

    if (!candidateJobApplication) return res.status(404).send('The application with the given ID was not found.');

    res.send(candidateJobApplication);
});

router.get('/:id', validateObjectId, async(req, res) => {
    const candidateJobApplication = await CandidateJobApplication.findById(req.params.id);

    if (!candidateJobApplication) return res.status(404).send('The application with the given ID was not found.');

    res.send(candidateJobApplication);
});

module.exports = router;