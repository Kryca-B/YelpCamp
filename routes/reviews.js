const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilties/catchAsync');
const reviews = require('../controllers/reviews');
const { isLoggedIn } = require('../middleware');
const { validateReview } = require('../middleware')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, catchAsync(reviews.deleteReview));

module.exports = router;