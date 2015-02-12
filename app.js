/**
 * Hubot Script for Windows Azure
 * 2014 Léo Colombaro - MIT License
 */

// Require Command Environment
var exec = require('child_process').exec;

// Declare Runtime Environment Variables
var config = require('./config.js');

// Run Robot
exec('coffee node_modules/hubot/bin/hubot', function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log("" + error);
  }
});