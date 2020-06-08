const Joi = require('joi');
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

function validateCandidate(candidate) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(candidate, schema);
}

exports.candidateSchema = candidateSchema;
exports.Candidate = Candidate;
exports.validate = validateCandidate;