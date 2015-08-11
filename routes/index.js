var express = require('express');
var router = express.Router();
var fs = require('fs');

var readFile = function(req, res) {
    var type = req.params.type;

    //любая другая обработка данных либо запрос к какому-нибудь api
    fs.readFile(__dirname + '/../public/files/flights.json', function(err, data) {
        var flights = JSON.parse(data.toString())
	        , arr = [];

        if (type === 'dep') {
            flights = flights.departure;
        } else {
            flights = flights.arrival;
        }

	    flights.forEach(function(flight) {
		    arr.push({
				number: flight.number,
			    airline: {
				    name: flight.airline,
				    img: '/imgs/airline/' + flight.airline.replace(' ','_') + '.png'
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
                    status: function() {
                         if (/Landed/.test(flight.status)) {
                             return 'success';
                         } else if (/Cancelled/.test(flight.status)) {
                             return 'danger';
                         } else {
                            return '';
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
        title: 'Main'
    });
});

router.get('/dme/:type?', function(req, res, next) {
    var airport = 'Moscow, Domodedovo (DME)';
    var type = req.params.type;
    if (type) {
        next();
    } else {
        res.render('airport', {
            title: airport,
            airport: airport,
            css: 'dme'
        });
    }
}, readFile);

router.get('/svo/:type?', function(req, res, next) {
    var airport = 'Moscow, Sheremetyevo (SVO)';
    var type = req.params.type;
    if (type) {
        next();
    } else {
        res.render('airport', {
            title: airport,
            airport: airport,
            css: 'svo'
        });
    }
}, readFile);

router.get('/vko/:type?', function(req, res, next) {
    var airport = 'Moscow, Vnukovo (VKO)';
    var type = req.params.type;
    if (type) {
        next();
    } else {
        res.render('airport', {
            title: airport,
            airport: airport,
            css: 'vko'
        });
    }
}, readFile);

module.exports = router;
