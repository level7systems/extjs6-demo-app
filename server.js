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
    
    var limit = (req.query.page) ? req.query.limit : 30;
    
    if (!String(limit).match(/^[0-9]+$/)) {
        res.status(404).json({
            message: 'limit parameter has to be a number',
        });
        return false;
    }
    
    if (limit > 100) {
        res.status(404).json({
            message: 'limit max is 100',
        });
        return false;
    }
    
    if ((limit * page) > collection_size) {
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
    
    var id = (page * limit) - limit + 1;
    
    for (id; id <= (page * limit); id++) {
        var record = { id: id  };
        
        var _data = factory();
        
        for (prop in _data) {
            record[prop] = _data[prop];
        }
        
        output.push(record);
    }
    
    res.json({ data: output, total: collection_size});
});


var server = app.listen(port, function () {
    console.log('Mock REST API server listening at http://localhost:%s', port);
});
