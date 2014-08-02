'use strict';
var port = process.env.PORT || 3000;
var DEFAULT_ZIP_CODE = '78759';
var express = require('express');
var app = express();
var geocoder = require('node-geocoder').getGeocoder('google', 'http');
var yelp = require('yelp').createClient({
    consumer_key: 'f6TEXZpl19BGpCmvj4sFsA',
    consumer_secret: 'Tc5rr4kO49xrWjif6CGC-zDt5Q8',
    token: 'nW7K79xxVHQKKRVJGB30UyGAbTlwjZD_',
    token_secret: 'c4QpX-2fI4vv9DkkowQvg1UojJg'
});

app.use(express.static(__dirname + '/public'));

function TransformYelpResults(yelpBusiness) {
    return {
        name: yelpBusiness.name,
        image_url: yelpBusiness.image_url,
        mobile_url: yelpBusiness.mobile_url
    };
}

function processYelpResponse(res, error, data) {

    if(error && error.statusCode){
        res.json(error.statusCode, JSON.parse(data));
        return;
    }

    res.json(data.businesses.map(TransformYelpResults));
}

function getZipCode(res){
    if(res && res.length && res[0].zipcode){
        return res[0].zipcode;
    }
    return null;
}

function yelpSearch(zipCode, res) {
    yelp.search({
        term: 'food',
        location: zipCode,
        limit: '20'
    }, function (error, data) {
        processYelpResponse(res, error, data);
    });
}
app.get('/restaurants', function (req, res) {
    var latitude = req.query.latitude,
        longitude = req.query.longitude;

    if (latitude && longitude) {
        geocoder.reverse(latitude, longitude, function(geocoderError, geocoderResponse) {
            var zipCode = getZipCode(geocoderResponse) || DEFAULT_ZIP_CODE;
            yelpSearch(zipCode, res);
        });

    } else {
        yelpSearch(DEFAULT_ZIP_CODE, res);
    }

});

app.listen(port, function () {
    console.log('Listening on port %d', port);
});
