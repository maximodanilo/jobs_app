const validateObjectId = require('../middleware/validateObjectId');
const { Job, validate } = require('../models/job');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const jobs = await Job.find().sort('name');
    res.send(jobs);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let job = new Job({ name: req.body.name });
    job = await job.save();

    res.send(job);
});

router.put('/:id', [validateObjectId], async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const job = await Job.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!job) return res.status(404).send('The job with the given ID was not found.');

    res.send(job);
});

router.delete('/:id', validateObjectId, async(req, res) => {
    const job = await Job.findByIdAndRemove(req.params.id);

    if (!job) return res.status(404).send('The job with the given ID was not found.');

    res.send(job);
});

router.get('/:id', validateObjectId, async(req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).send('The job with the given ID was not found.');

    res.send(job);
});

module.exports = router;