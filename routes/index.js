var express = require('express');
var router = express.Router();

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
        console.log(req.query);

        res.render('table');
    } else {
        res.render('airport', {
            title: airport,
            airport: airport,
            css: 'dme'
        });
    }
});

router.get('/svo/:type?', function(req, res, next) {
    var airport = 'Moscow, Sheremetyevo (SVO)';
    var type = req.params.type;
    if (type) {
        console.log(req.query);

        res.render('table');
    } else {
        res.render('airport', {
            title: airport,
            airport: airport,
            css: 'svo'
        });
    }
});

router.get('/vko/:type?', function(req, res, next) {
    var airport = 'Moscow, Vnukovo (VKO)';
    var type = req.params.type;
    if (type) {
        console.log(req.query);

        res.render('table');
    } else {
        res.render('airport', {
            title: airport,
            airport: airport,
            css: 'vko'
        });
    }
});

module.exports = router;
