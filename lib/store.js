var path = require('path')
  , fs = require('fs');

var GIFS_PATH = process.env.HOME + '/.gifs';

try {
  var gifs = JSON.parse(fs.readFileSync(path.resolve(GIFS_PATH)));
} catch(err) {
  // Don't throw an exception if the ~/.gifs file doesn't exist yet
  var gifs = {};
}

module.exports = {};

module.exports.get = function(caption) {
  return gifs[caption];
};

module.exports.set = function(caption, url) {
  gifs[caption] = url;
  fs.writeFileSync(
    path.resolve(GIFS_PATH),
    JSON.stringify(gifs, undefined, 2)
  );
};
