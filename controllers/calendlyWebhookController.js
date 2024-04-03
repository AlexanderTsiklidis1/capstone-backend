const { getEventDetails } = require('../queries/calendly');

exports.handleCalendlyWebhook = async (req, res) => {
    const { event, payload } = req.body;

    if (event === 'invitee.created') {
        const zoomLink = payload.event.location; 
        const eventDetails = {
            calendly_event_id: payload.event.uuid,
            invitee_email: payload.invitee.email,
            start_time: payload.event.start_time,
            end_time: payload.event.end_time,
            zoom_link: zoomLink,
        };

        await getEventDetails(eventDetails);
    }

    res.status(200).send('Received');
};