const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const candidateJobApplicationSchema = new mongoose.Schema({
    candidateId: { type: mongoose.ObjectId },
    jobId: { type: mongoose.ObjectId },
    status: { type: String, required: true },
    notes: { type: String, maxlength: 4000 }
});

const CandidateJobApplication = mongoose.model('CandidateJobApplication', candidateJobApplicationSchema);

function validateCandidateJobApplication(candidateJobApplication) {
    const schema = {
        candidateId: Joi.required(),
        jobId: Joi.required(),
        status: Joi.string().valid("IN PROGRESS", "FINISHED").required(),
        notes: Joi.string().max(4000)
    };

    return Joi.validate(candidateJobApplication, schema);
}

exports.candidateJobApplicationSchema = candidateJobApplicationSchema;
exports.CandidateJobApplication = CandidateJobApplication;
exports.validate = validateCandidateJobApplication;