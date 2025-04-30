const mongoose = require('mongoose');
const IssueSchema = require('./Issue');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization: { type: String, required: true },
  creator: { type: String, required: true },
  contributors: [{ type: String }],
  issues: [IssueSchema],
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
