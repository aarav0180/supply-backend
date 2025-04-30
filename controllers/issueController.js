const Project = require('../models/Project');
const { errorHandler } = require('../helpers/deberrorHandler');

// List all issues in a project
exports.listIssues = (req, res) => {
  if (!req.user) {
    console.log('❌ Unauthorized access to list issues');
    return res.status(401).json({ error: "User is not authenticated" });
  }

  const project = req.project;
  console.log('📋 Listing issues for project:', project._id);
  res.json(project.issues);
};

// Add an issue to a project
exports.addIssue = (req, res) => {
  if (!req.user) {
    console.log('❌ Unauthorized access to add issue');
    return res.status(401).json({ error: "User is not authenticated" });
  }

  const project = req.project;
  const { title, deadline, labels, attachments } = req.body;

  const newIssue = {
    title,
    deadline,
    labels: labels || [],
    attachments: attachments || 0
  };

  project.issues.push(newIssue);

  project.save((err, updatedProject) => {
    if (err) {
      console.log('❌ Error adding issue:', err);
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    console.log('✅ Issue added:', newIssue);
    res.json(updatedProject.issues[updatedProject.issues.length - 1]);
  });
};

// Remove a specific issue from a project
exports.removeIssue = (req, res) => {
  if (!req.user) {
    console.log('❌ Unauthorized access to remove issue');
    return res.status(401).json({ error: "User is not authenticated" });
  }

  const project = req.project;
  const { issueId } = req.params;

  const issue = project.issues.id(issueId);
  if (!issue) {
    console.log('⚠️ Issue not found:', issueId);
    return res.status(404).json({ error: 'Issue not found' });
  }

  issue.remove();

  project.save((err) => {
    if (err) {
      console.log('❌ Error removing issue:', err);
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    console.log('✅ Issue removed:', issueId);
    res.json({ message: 'Issue removed successfully' });
  });
};

// Update a specific issue
exports.updateIssue = (req, res) => {
  if (!req.user) {
    console.log('❌ Unauthorized access to update issue');
    return res.status(401).json({ error: "User is not authenticated" });
  }

  const project = req.project;
  const { issueId } = req.params;
  const issue = project.issues.id(issueId);

  if (!issue) {
    console.log('⚠️ Issue not found for update:', issueId);
    return res.status(404).json({ error: 'Issue not found' });
  }

  const { title, deadline, labels, attachments } = req.body;

  if (title !== undefined) issue.title = title;
  if (deadline !== undefined) issue.deadline = deadline;
  if (labels !== undefined) issue.labels = labels;
  if (attachments !== undefined) issue.attachments = attachments;

  project.save((err) => {
    if (err) {
      console.log('❌ Error updating issue:', err);
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    console.log('✅ Issue updated:', issue);
    res.json(issue);
  });
};
