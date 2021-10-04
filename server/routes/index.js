const express = require('express');
const router = express.Router();
const { getReviews, getMetaData, updateHelpful, updateReport,  } = require('../controllers/index.js');


router.get('/reviews', getReviews);
router.get('/reviews/meta', getMetaData);
router.put('/reviews/:review_id/helpful', updateHelpful);
router.put('/reviews/:review_id/report', updateReport);
// router.post('/reviews', postReview);
module.exports = router;