var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));


app.get('/restaurants', function(req, res){

        /*var restaurants = [
            {name: 'Whole Foods', type: 'Eclectic'},
            {name: 'Newks', type: 'Sandwich'},
            {name: 'Chuys', type: 'Tex-mex'},
            {name: 'Masala Wok', type: 'Indian'},
            {name: 'Fire Bowl', type: 'Asian'},
            {name: 'Panera', type: 'sandwich'},
            {name: 'Noodles', type: 'pasta'}
        ];*/

    var yelp = require("yelp").createClient({
        consumer_key: "f6TEXZpl19BGpCmvj4sFsA",
        consumer_secret: "Tc5rr4kO49xrWjif6CGC-zDt5Q8",
        token: "nW7K79xxVHQKKRVJGB30UyGAbTlwjZD_",
        token_secret: "c4QpX-2fI4vv9DkkowQvg1UojJg"
    });

// See http://www.yelp.com/developers/documentation/v2/search_api
    yelp.search({term: "food", location: "78759", limit:"20"}, function(error, data) {
        console.log(error);
        console.log(data);   // res.json(500,{error: 'An error has occurred.'});
        //var restaurants = [{name:data.businesses[0].name, type: 'sandwich'}];

        function TransformYelpResults(yelpBusiness) {

            return {name:yelpBusiness.name, type: 'sandwich'};
        }

        var restaurants = data.businesses.map(TransformYelpResults);

        //var restaurants = [{name:'subway', type: 'sandwich'}];
        res.json(restaurants);
    });
});



var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
