const express = require('express');
const reviews = express.Router({ mergeParams: true });

const { getOneInterviewByUser } = require('../queries/interviews');

const {
	getReviewByInterview,
	createReview,
} = require('../queries/interviewReviews');
