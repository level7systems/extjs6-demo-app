var port = 3000;
var data = require('./node_modules/data');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan')
var fs = require('fs');
var collection_size = 1000;


app.use(bodyParser.json());
app.use(morgan('combined'))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:1841');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));

    next();
});

app.get('/', function (req, res) {
    res.json({
        message: 'Mock REST API server',
        available_endpoints: {
            "/personnel": ["GET"]
        }
    });
});

app.get('/:collection', function (req, res) {
    
    var page = (req.query.page) ? req.query.page : 1;
    
    if (!String(page).match(/^[0-9]+$/)) {
        res.status(404).json({
            message: 'page parameter has to be a number',
        });
        return false;
    }
    
    var per_page = (req.query.page) ? req.query.per_page : 30;
    
    if (!String(per_page).match(/^[0-9]+$/)) {
        res.status(404).json({
            message: 'per_page parameter has to be a number',
        });
        return false;
    }
    
    if (per_page > 100) {
        res.status(404).json({
            message: 'per_page max is 100',
        });
        return false;
    }
    
    if ((per_page * page) > collection_size) {
        res.status(404).json({
            message: 'pager out of range',
        });
        return false;
    }
    
    var factory = data[req.params.collection];
    
    if (typeof(factory) !== 'function') {
        res.status(404).json({
            message: 'Not found',
        });
        return false;
    }
    
    var output = [];
    
    var id = (page * per_page) - per_page + 1;
    
    for (id; id <= (page * per_page); id++) {
        var record = { id: id  };
        
        var _data = factory();
        
        for (prop in _data) {
            record[prop] = _data[prop];
        }
        
        output.push(record);
    }
    
    var next_page = parseInt(page) + 1;
    var last_page = Math.floor(collection_size/per_page);
    var first_page = 1;
    var prev_page = (page === 1) ? 1 : parseInt(page) - 1;
    
    var pager = '<http://localhost:'+port+'/'+req.params.collection+'?page='+next_page+'&per_page='+per_page+'>; rel="next",';
    pager+= '<http://localhost:'+port+'/'+req.params.collection+'?page='+last_page+'&per_page='+per_page+'>; rel="last",';
    pager+= '<http://localhost:'+port+'/'+req.params.collection+'?page='+first_page+'&per_page='+per_page+'>; rel="first",';
    pager+= '<http://localhost:'+port+'/'+req.params.collection+'?page='+prev_page+'&per_page='+per_page+'>; rel="prev"';
    
    res.header('Link', pager);
    
    res.json(output);
});


var server = app.listen(port, function () {
    console.log('Mock REST API server listening at http://localhost:%s', port);
});
