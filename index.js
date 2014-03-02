var optimist = require('optimist')
  , exec = require('child_process').exec
  , request = require('request')
  , path = require('path')
  , fs = require('fs');

var IMGUR_API_KEY = 'b3625162d3418ac51a9ee805b1840452';
var IMGUR_API_URL = 'http://imgur.com/api/upload.json';

var r = exec("curl -H 'Expect: ' -F key=" + IMGUR_API_KEY + ' -F image=@' + path.join(__dirname, 'me.gif') + " "  + IMGUR_API_URL, function(err, stdout, stderr) {
  if (err) throw err;

  try {
    var response = JSON.parse(stdout).rsp.image.original_image;
  } catch(e) {
    throw "Got invalid JSON response"
  }

  console.log(response);
});

