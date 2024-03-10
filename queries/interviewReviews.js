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

module.exports = {
	getReviewByInterview,
};
