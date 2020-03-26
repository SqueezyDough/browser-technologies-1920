const Handlebars = require("handlebars");


// source: https://code-maven.com/handlebars-conditionals
Handlebars.registerHelper('equals', function(a, b, opts) {
   if (a == b) {
       return opts.fn(this);
   } else {
       return opts.inverse(this);
   }
});