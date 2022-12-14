const Trip = require('../models/trip');
const { rawListeners } = require('../server');


module.exports = {
    index,
    new: newTrip,
    create,
    show,
    delete: deleteTrip
}

function index(req, res) {
    Trip.find({ user: req.user.id }, function (err, trips) {
        res.render('trips/my-trips.ejs', { title: 'Trips', trips: trips })
    })
}

function newTrip(req, res) {
    res.render('trips/new-trip.ejs');
}

function create(req, res) {
    req.body.user = req.user._id;
    Trip.create(req.body, function (err, tripDocument) {
        if (err) {
            return res.render('trips/new-trip.ejs')
        }
        res.redirect('/trips');
    })
}

function show(req, res) {
    Trip.findById(req.params.id, function (err, tripDocument) {
        res.render('trips/show-trip.ejs', { title: 'Trip', trip: tripDocument })
    })
};

function deleteTrip(req, res) {
    Trip.findByIdAndRemove(req.params.id, function () {
        res.redirect('/trips')
    });
}