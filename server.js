var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan')
var fs = require('fs');

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
    
    var filename = 'node_modules/data/'+req.params.collection+'.js';
    
    try {
        var text_data = fs.readFileSync(filename, 'utf8');
    } catch (err) {
        res.status(404).json({
            message: 'Not found',
        });
        return false;
    }
    
    try {
        var json_data = JSON.parse(text_data);
    } catch (err) {
        var json_data = { count: 0, total: 0 };
        json_data[req.params.collection] = [];
        console.log('Failed to JSON.parse data in ' + filename + ', ' + err.message);
    }
    
    res.json(json_data);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Mock REST API server listening at http://%s:%s', host, port);
});
