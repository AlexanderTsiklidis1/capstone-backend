const db = require('../db/dbConfig');

const getReviewByInterview = async (interviewId) => {
	try {
		const reviews = await db.one(
			'SELECT * FROM reviews WHERE interviews.id = $1',
			interviewId
		);
		return reviews;
	} catch (error) {
		console.error(error);
	}
};

const createReview = async (interviewId) => {
	try {
		const newReview = await db.one(
			'INSERT INTO reviews (interviews.id, ) VALUES ($1, $2) RETURNING *'
		);
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getReviewByInterview,
};
