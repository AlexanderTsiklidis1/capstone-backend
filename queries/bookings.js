const e = require("express");
const db = require("../db/dbConfig");

const getAllBookingsByUser = async (userId) => {
  try {
    const bookings = await db.any(
      "SELECT * FROM bookings WHERE bookings.user_id = $1",
      userId
    );
    return bookings;
  } catch (error) {
    console.error(error);
  }
};

const getOneBookingByUser = async (userId, id) => {
  try {
    const oneBooking = await db.one(
      "SELECT * FROM bookings WHERE bookings.user_id = $1 AND bookings.id = $2",
      [userId, id]
    );
    return oneBooking;
  } catch (error) {
    console.error(error);
  }
};

const createBooking = async (userId, adminId, booking) => {
  try {
    const { date, admin_confirmed, video_meeting_id, expiration_time } =
      booking;
    const createdBooking = await db.one(
      "INSERT INTO bookings (user_id, admin_id, date, admin_confirmed, video_meeting_id, expiration_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        userId,
        adminId,
        date,
        admin_confirmed,
        video_meeting_id,
        expiration_time,
      ]
    );
    return createdBooking;
  } catch (error) {
    console.error(error);
  }
};

const deleteBooking = async (userId, adminId, id) => {
  try {
    const deletedBooking = await db.one(
      "DELETE FROM bookings WHERE booking.user_id = $1, booking.admin_id = $2, AND booking.id = $3",
      [userId, adminId, id]
    );
    return deletedBooking;
  } catch (error) {
    console.error(error);
  }
};

const updateBooking = async (userId, adminId, id, booking) => {
  try {
    const { date, admin_confirmed, video_meeting_id, expiration_time } =
      booking;
    const updatedBooking = await db.one(
      "UPDATE bookings SET date = $1, admin_confirmed = $2, video_meeting_id = $3, expiration_time = $4 WHERE user_id = $5, admin_id = $6, AND id = $7 RETURNING *",
      [
        userId,
        adminId,
        date,
        admin_confirmed,
        video_meeting_id,
        expiration_time,
        id
      ]
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllBookingsByUser,
  getOneBookingByUser,
  createBooking,
  deleteBooking,
  updateBooking
};
