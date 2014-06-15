var exec = require('child_process').exec;
var os = require('os');

module.exports = {};

module.exports.save = function(value){
  if (os.platform() == 'linux') {
    copycmd = 'xsel -ib';
  } else {
    copycmd = 'pbcopy';
  }
  exec('echo ' + value + ' | ' + copycmd);
};
