const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// GET all applications
router.get('/applications', applicationController.getAllApplications);

// POST create new application
router.post('/applications', applicationController.createApplication);

// PUT update application
router.put('/applications/:id', applicationController.updateApplication);

// DELETE application
router.delete('/applications/:id', applicationController.deleteApplication);

module.exports = router;
