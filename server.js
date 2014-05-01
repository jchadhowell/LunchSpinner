var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));


app.get('/restaurants', function(req, res){

        var restaurants = [
            {name: 'Whole Foods', type: 'Eclectic'},
            {name: 'Newks', type: 'Sandwich'},
            {name: 'Chuys', type: 'Tex-mex'},
            {name: 'Masala Wok', type: 'Indian'},
            {name: 'Fire Bowl', type: 'Asian'},
            {name: 'Panera', type: 'sandwich'},
            {name: 'Noodles', type: 'pasta'}
        ];

        res.json(restaurants);
        //res.json(500,{error: 'An error has occurred.'});

});








var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
