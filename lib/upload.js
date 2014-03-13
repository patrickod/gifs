var exec = require('child_process').exec
  , path = require('path');

var IMGUR_API_KEY = 'b3625162d3418ac51a9ee805b1840452';
var IMGUR_API_URL = 'http://imgur.com/api/upload.json';

// Parse the response from the childProcess.exec
var parse_curl_response = function(cb) {
  return function(err, stdout, stderr) {
    if (err) throw err;

    try {
      var parsed_response = JSON.parse(stdout).rsp;
    } catch(e) {
      throw "Got invalid JSON response"
    }

    parsed_response.stat == 'fail' ? cb(parsed_response.image.error_msg) : cb(null, parsed_response.image.original_image);

  };
}


var upload_from_url = function(url, cb){
  var r = exec(
    "curl -L " + url + " | curl -H 'Expect: ' -F key=" + IMGUR_API_KEY + ' -F image=@- ' + IMGUR_API_URL, parse_curl_response(cb)
  );
};

var upload_from_disk = function(image_path, cb) {
  var r = exec(
    "curl -H 'Expect: ' -F key=" + IMGUR_API_KEY + ' -F image=@' + path.resolve(image_path) + " "  + IMGUR_API_URL, parse_curl_response(cb));
};

module.exports = function(path_or_url, cb) {
  if (path_or_url.match(/^(ftp|http(s)?):\/\//)) {
    upload_from_url(path_or_url, cb);
  } else {
    upload_from_disk(path_or_url, cb);
  }
};
