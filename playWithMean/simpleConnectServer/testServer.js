var app = require('express')();
// ES5 way
(function() {
   console.log('working');
})();

// ES6 way
//(()=>console.log('working'))();

var indexFn = function(request, response) {
   response.setHeader('Content-Type', 'text/plain');
   response.write(request.ip);
};

var someThingEsleFn = function(request, response) {
   response.send(request.params);
};
app.listen(9090);
app.get('/', indexFn);
app.get('/someThingElse:wtf', someThingEsleFn);

// server.controller.js
exports.someCtrl = function(req, res) {
   res.send("ctrl");
};
exports.someCtrl2 = function(req, res) {
   res.send("ctrl");
};

// server.route.js
module.exports = function(app) {
   var controller = require("server.controller.js");
   app.get('/firstRoute', controller.someCtrl);
   app.get('/secondRoute', controller.someCtrl2);
};

//server.express.js (config code)
module.exports = function() {
   var app = require("express");
   require("server.route.js")(app);
   return app;
};

// server.js (like app.js in angular)
var app = require("server.express.js");
app.listen(9090);
module.exports = app;
