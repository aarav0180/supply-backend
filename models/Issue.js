const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: String, required: true },
  labels: [{ type: String }],
  attachments: { type: Number, default: 0 },
}, { _id: true });

module.exports = IssueSchema;
