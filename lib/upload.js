var exec = require('child_process').exec
  , path = require('path');

var IMGUR_API_KEY = 'b3625162d3418ac51a9ee805b1840452';
var IMGUR_API_URL = 'http://imgur.com/api/upload.json';

var upload_from_url = function(url, cb){
  var r = exec(
    "curl -L " + url + " | curl -H 'Expect: ' -F key=" + IMGUR_API_KEY + ' -F image=@- ' + IMGUR_API_URL,
    function(err, stdout, stderr) {
      if (err) throw err;

      try {
        var uploaded_url = JSON.parse(stdout).rsp.image.original_image;
      } catch(e) {
        throw "Got invalid JSON response"
      }

      cb(null, uploaded_url);
    }
  );
};

var upload_from_disk = function(image_path, cb) {
  var r = exec(
    "curl -H 'Expect: ' -F key=" + IMGUR_API_KEY + ' -F image=@' + path.resolve(image_path) + " "  + IMGUR_API_URL,
    function(err, stdout, stderr) {
      if (err) throw err;

      try {
        var uploaded_url = JSON.parse(stdout).rsp.image.original_image;
      } catch(e) {
        throw "Got invalid JSON response"
      }

      cb(null, uploaded_url);
    }
  );
};

module.exports = function(path_or_url, cb) {
  if (path_or_url.match(/^(ftp:http(s)?):\/\//)) {
    upload_from_url(path_or_url, cb);
  } else {
    upload_from_disk(path_or_url, cb);
  }
};
