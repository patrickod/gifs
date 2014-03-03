var exec = require('child_process').exec;

module.exports = {};

module.exports.save = function(value){
  exec('echo ' + value + ' | pbcopy');
};
