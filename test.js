


var d = new Buffer("ajayk:ajayk").toString('base64');
console.log(" d " ,d);

var bcrypt = require("bcrypt-nodejs");
var hash = bcrypt.hashSync("ajayk");

console.log(" --hash ", hash);

var c = bcrypt.compareSync("ajayk", hash);

console.log("comp ", c);