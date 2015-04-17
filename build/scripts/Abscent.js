/// <reference path="../../typings/node/node.d.ts"/>
// Description
//  An Awesome hubot script
//
// Configuration:
//   None
//
// Commands:
//   hubot hello - responds 'Howdy!'
//
// Author:
//   Richard Siwady   <richard@acklenavenue.com>
//   Douglas Guerrero <dguerrero@acklenavenue.com>
var http = require("request-promise");
var Parse = require('node-parse-api').Parse;
var ParseOptions = {
    app_id: 'wQFYcalrOw3YwIQoQ1BcgiMFhGE0tL4P24uKXFDm',
    master_key: 'dz2uvnXPJO3jonBjlSK6NcEaNolJ03WS9RcUczQG' // master_key:'...' could be used too
};
var app = new Parse(ParseOptions);
function Abscent(robot) {
    // We should get this from some sort of a DB
    var commands = ['AFK', 'BRB'];
    var adjectives = ['for', 'in', 'until', 'back'];
    var format = ['min', 'mins', 'day'];
    // Build the regex using the commands, adjectives and formats.
    var regex = new RegExp('\\b(' + commands.join('|') + ')\\s+(' + adjectives.join('|') + ')\\s+([0-9]+)\\s+(' + format.join('|') + ')\\b', 'i');
    // Let's make hubot hear every command :)
    robot.hear(/.*/i, function (msg) {
        var user = msg.message.user;
        var object = regex.exec(msg.message.text);
        if (object !== null) {
            var command = {
                User: user.name,
                Command: object[1],
                Time: parseInt(object[3]),
                Format: object[4]
            };
            saveAbscence(command);
        }
    });
    robot.respond(/abscence help/i, function (msg) {
        msg.send('http://hola.com');
    });
    robot.hear(/ /i, function (msg) {
    });
}
function saveAbscence(command) {
    app.insert('Users', { User: command.User, Command: command.Command, Time: command.Time, Format: command.Format }, function (err, response) {
        if (err)
            return err;
        else
            return response;
    });
}
function checkIsAbscent(user) {
    app.findMany('Users', { User: user.User }, function (err, response) {
        console.log(response);
    });
}
module.exports = Abscent;
