const Handlebars = require("handlebars");

Handlebars.registerHelper('loud', function(string) {
   console.log(Object.keys(string))
});