const validateObjectId = require('../middleware/validateObjectId');
const { Candidate, validate } = require('../models/candidate');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const candidates = await Candidate.find().sort('name');
    res.send(candidates);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let candidate = new Candidate({ name: req.body.name });
    candidate = await candidate.save();

    res.send(candidate);
});

router.put('/:id', [validateObjectId], async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const candidate = await Candidate.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!candidate) return res.status(404).send('The candidate with the given ID was not found.');

    res.send(candidate);
});

router.delete('/:id', validateObjectId, async(req, res) => {
    const candidate = await Candidate.findByIdAndRemove(req.params.id);

    if (!candidate) return res.status(404).send('The candidate with the given ID was not found.');

    res.send(candidate);
});

router.get('/:id', validateObjectId, async(req, res) => {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) return res.status(404).send('The candidate with the given ID was not found.');

    res.send(candidate);
});

module.exports = router;