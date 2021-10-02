const express = require('express');
const router = express.Router();
const { getReviews, getMeta } = require('../controllers/index.js');


router.get('/reviews/', getReviews);
router.get('/reviews/meta', getMeta);

module.exports = router;