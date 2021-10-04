const express = require('express');
const router = express.Router();
const { getReviews,  updateHelpful, updateReport } = require('../controllers/index.js');


router.get('/reviews/', getReviews);
// router.get('/reviews/meta', getMeta);
router.put('/reviews/:review_id/helpful', updateHelpful);
router.put('/reviews/:review_id/report', updateReport);
module.exports = router;