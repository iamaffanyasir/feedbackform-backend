const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// POST /api/feedback - Create new feedback
router.post('/feedback', async (req, res) => {
  try {
    const { name, email, feedback, colorTheme } = req.body;

    // Validation
    if (!name || !email || !feedback) {
      return res.status(400).json({ 
        error: 'Name, email, and feedback are required' 
      });
    }

    const newFeedback = new Feedback({
      name: name.trim(),
      email: email.trim(),
      feedback: feedback.trim(),
      colorTheme: colorTheme || 'blue'
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      success: true,
      data: savedFeedback,
      message: 'Feedback saved successfully'
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ 
      error: 'Failed to save feedback' 
    });
  }
});

// GET /api/feedback - Get latest feedbacks for wall display
router.get('/feedback', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: feedbacks,
      count: feedbacks.length
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ 
      error: 'Failed to fetch feedbacks' 
    });
  }
});

// GET /api/feedback/all - Get all feedbacks for dashboard
router.get('/feedback/all', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: feedbacks,
      count: feedbacks.length
    });
  } catch (error) {
    console.error('Error fetching all feedbacks:', error);
    res.status(500).json({ 
      error: 'Failed to fetch all feedbacks' 
    });
  }
});

// GET /api/feedback/:id - Get specific feedback
router.get('/feedback/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ 
        error: 'Feedback not found' 
      });
    }

    res.json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ 
      error: 'Failed to fetch feedback' 
    });
  }
});

// POST /api/feedback/delete - Delete multiple feedbacks
router.post('/feedback/delete', async (req, res) => {
  try {
    const { ids } = req.body;
    
    // Log request data for debugging
    console.log('Delete request received with IDs:', ids);
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        error: 'Valid feedback IDs are required'
      });
    }

    const result = await Feedback.deleteMany({ _id: { $in: ids } });
    
    console.log(`Deleted ${result.deletedCount} feedbacks`);

    res.json({
      success: true,
      deletedCount: result.deletedCount,
      message: `Successfully deleted ${result.deletedCount} feedbacks`
    });
  } catch (error) {
    console.error('Error deleting feedbacks:', error);
    res.status(500).json({
      error: 'Failed to delete feedbacks'
    });
  }
});

// POST /api/deleteFeedbacks - Alternative endpoint for deleting feedbacks
router.post('/deleteFeedbacks', async (req, res) => {
  try {
    const { ids } = req.body;
    
    // Log request data for debugging
    console.log('Alternative delete route received IDs:', ids);
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        error: 'Valid feedback IDs are required'
      });
    }

    const result = await Feedback.deleteMany({ _id: { $in: ids } });
    
    console.log(`Alternative route deleted ${result.deletedCount} feedbacks`);

    res.json({
      success: true,
      deletedCount: result.deletedCount,
      message: `Successfully deleted ${result.deletedCount} feedbacks`
    });
  } catch (error) {
    console.error('Error in alternative delete route:', error);
    res.status(500).json({
      error: 'Failed to delete feedbacks'
    });
  }
});

module.exports = router;
