// express 
var express = require("express"),
   // body-parser
   bodyParser = require("body-parser"),
   // mongoos
   mongoose = require("mongoose"),
   // app as instance of express
   app = express(),
   // document based database
   bear = require("./bearModel"),
   // routes for app
   router = express.Router(),
   // port
   port = 9090;

// connecting to a db
mongoose.createConnection("mongodb://localhost/bear");
mongoose.connect('mongodb://localhost/bear');
// url encoded
app.use(bodyParser.urlencoded({
   extended: true
})).use(bodyParser.json());

// defining d/f routes
router
// wheever a route is changed, it ll be called
   .use(function(request, response, next) {
      console.log("some change");
      next();
   })
   // route : index
   .get("/", function(request, response) { // index route
      // json response from server side
      response.json({
         message: "welcome"
      });
   })
   // route : crazy 
   .get("/crazy", function(request, response) { // crazy route
      response.json({
         crazy: "holy shit, who called me back???"
      });
   })
   // route : bears
   .route("/bears")
   // post of route bears
   .post(function(request, response) {
      // create new instance of db bear
      var bear = new bear();
      // given from client side
      bear.name = request.body.name;
      // see whats came from client side
      console.log(bear.name);
      // return the response
      bear.save = function(error) {
         if (error) response.send(error);
         response.json({
            message: "bear is cooked"
         });
      };
   })
   // get of route bears
   .get(function(request, response) {
      bear.find(function(error, bears) {
         response.json(bears);
      });
   });

// all routes will be appended to "api"
app.use("/api", router);

// listen on localhost:port
app.listen(port);
