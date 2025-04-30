const express = require('express');
const router = express.Router();

const {
  list,
  create,
  remove,
  projectById,
  requireSignin
} = require('../controllers/projectController');
const { userById } = require('../controllers/authController');

// Param middleware for user and project ID
router.param('projectId', projectById);
router.param('userId', userById);

// Routes
router.get('/projects', requireSignin, (req, res, next) => {
  console.log('GET /projects - Start');
  list(req, res, next);
});                // GET all projects

router.post('/project/create/:userId', requireSignin, (req, res, next) => {
  console.log('POST /project/create/:userId - Start');
  create(req, res, next);
});  // POST create a project

router.delete('/project/:projectId', requireSignin, (req, res, next) => {
  console.log('DELETE /project/:projectId - Start');
  remove(req, res, next);
});    // DELETE remove a project

module.exports = router;
