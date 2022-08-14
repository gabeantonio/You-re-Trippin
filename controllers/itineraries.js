const Trip = require('../models/trip');

module.exports = {
    create,
    new: newItinerary
}

function create(req,res) {
    console.log(req.params.id, '<--- Params Trip ID');
    console.log(req.body, '<--- The itinerary information.');
    Trip.findById(req.params.id, function(err, trip) {

        // req.body.user = req.user._id;
        // req.body.userName = req.user.name;
        // req.body.userAvatar = req.user.avatar

        trip.itinerary.push(req.body);
        console.log(trip, '<--- Trip Document with Itinerary');
        trip.save(function(err) {
            res.redirect(`/trips/${trip._id}`)
        })
    })
}

function newItinerary(req, res) {
    // Grab a Trip based on its ID.
    Trip.findById(req.params.id, function(err, trip) {
        res.render('itineraries/new-itineraries', {title: 'Trip', trip: trip});
    })
}