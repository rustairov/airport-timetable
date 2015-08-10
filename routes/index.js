var express = require('express');
var router = express.Router();
var fs = require('fs');

var readFile = function(req, res) {
    var type = req.params.type;
    var pathToFile = '';
    switch (type) {
        case 'dep':
            pathToFile = __dirname + '/../public/files/departure.json';
            break;
        case 'arr':
            pathToFile = __dirname +  '/../public/files/arrival.json';
            break;
        default:
            break;
    }
    fs.readFile(pathToFile, function(err, data) {
        var arr = JSON.parse(data.toString());

        arr.forEach(function(flight) {
            console.log(flight);
        });

        res.render('table', {
            table: arr
        });

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
