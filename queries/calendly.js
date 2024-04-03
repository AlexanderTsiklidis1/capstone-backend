const db = require("../db/dbConfig");

const getEventDetails = async (calendlyEventId) => {
    try {
      const eventDetails = await db.one(
        "SELECT * FROM interviews WHERE calendly_event_id = $1",
        calendlyEventId
      );
      return eventDetails;
    } catch (error) {
      console.error('Error fetching interview details:', error);
      // Depending on your error handling strategy, you might throw the error, return null, or handle it differently
      throw error;
    }
  };

  module.exports = {
    getEventDetails,
    
  };