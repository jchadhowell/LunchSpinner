var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));


app.get('/restaurants', function(req, res){

    var yelp = require("yelp").createClient({
        consumer_key: "f6TEXZpl19BGpCmvj4sFsA",
        consumer_secret: "Tc5rr4kO49xrWjif6CGC-zDt5Q8",
        token: "nW7K79xxVHQKKRVJGB30UyGAbTlwjZD_",
        token_secret: "c4QpX-2fI4vv9DkkowQvg1UojJg"
    });

    yelp.search({term: "food", location: "78759", limit:"20"}, function(error, data) {
        console.log(error);
        console.log(data);

        function TransformYelpResults(yelpBusiness) {

            return {
                name:yelpBusiness.name,
                image_url:yelpBusiness.image_url,
                mobile_url: yelpBusiness.mobile_url
            };
        }

        var restaurants = data.businesses.map(TransformYelpResults);

        res.json(restaurants);
    });
});



var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
