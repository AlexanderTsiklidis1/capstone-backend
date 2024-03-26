const express = require('express');
const bookings = express.Router({ mergeParams: true });
const {
	getAllBookingsByUser,
	getOneBookingByUser,
	createBooking,
	deleteBooking,
	updateBooking,
} = require('../queries/bookings');

const { getOneUser } = require('../queries/users');

bookings.get('/', async (req, res) => {
	const { userId } = req.params;
	try {
		const bookingsByUser = await getAllBookingsByUser(userId);
		res.json(bookingsByUser);
	} catch (error) {
		console.error(error);
	}
});

bookings.get('/:bookingId', async (req, res) => {
	const { userId, bookingId } = req.params;
	try {
		const user = await getOneUser(userId);
		const bookingByUser = await getOneBookingByUser(userId, bookingId);
		if (user && bookingByUser) {
			res.json(bookingByUser);
		} else {
			res.status(404).json({ message: 'User or Booking not found.' });
		}
	} catch (error) {
		console.error(error);
	}
});



module.exports = bookings;
