var express = require('express');
var router = express.Router();
var fs = require('fs');

var getFlights = function(req, res) {
    var type = req.params.type;

    //любые другие данные либо запрос к какому-нибудь api
    fs.readFile(__dirname + '/../public/files/flights.json', 'utf8', function(err, data) {
        var json = JSON.parse(data)
	        , arr = []
	        , flights = [];

        if (type === 'dep') {
	        flights = json.departure;
        } else {
	        flights = json.arrival;
        }

	    flights.forEach(function(flight) {
		    arr.push({
				number: flight.number,
			    airline: {
				    name: flight.airline,
				    img: '/imgs/airline/' + flight.airline.replace(/\s/g,'_') + '.png'
			    },
			    aircraft: {
				    name: flight.aircraft.split(' ')[0],
				    model: flight.aircraft.split(' ')[1]
			    },
			    destination: flight.destination,
                terminal: flight.terminal,
			    date: {
				    time: flight.time.split(' ')[0],
				    date: flight.time.split(' ')[1]

			    },
			    status: {
                    text: flight.status,
                    class: function() {
                         if (/Landed/i.test(flight.status)) {
                             return 'success';
                         } else if (/Cancelled/i.test(flight.status)) {
                             return 'danger';
                         } else if (/Not/i.test(flight.status)) {
	                         return 'warning';
                         } else {
                            return 'primary';
                         }
                    }()
                }
		    });
        });

        res.render('table', { data: arr });

    });
};


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Airport timetable',
        background: 'airport'
    });
});

/* GET dme airport. */
router.get('/dme/:type?', function(req, res, next) {
    var airport = 'Moscow, Domodedovo (DME)';
    var type = req.params.type;
    if (type) {
        next();
    } else {
        res.render('airport', {
            title: airport,
            airport: airport,
	        background: 'dme'
        });
    }
}, getFlights);

/* GET svo airport. */
router.get('/svo/:type?', function(req, res, next) {
    var airport = 'Moscow, Sheremetyevo (SVO)';
    var type = req.params.type;
    if (type) {
        next();
    } else {
        res.render('airport', {
            title: airport,
            airport: airport,
	        background: 'svo'
        });
    }
}, getFlights);

/* GET vko airport. */
router.get('/vko/:type?', function(req, res, next) {
    var airport = 'Moscow, Vnukovo (VKO)';
    var type = req.params.type;
    if (type) {
        next();
    } else {
        res.render('airport', {
            title: airport,
            airport: airport,
	        background: 'vko'
        });
    }
}, getFlights);

module.exports = router;
