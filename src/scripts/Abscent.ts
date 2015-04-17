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
var Parse = require('parse').Parse;

Parse.initialize("wQFYcalrOw3YwIQoQ1BcgiMFhGE0tL4P24uKXFDm", "vdPFwegmiQvcnGIrFe09eTCI9oOyxm5buocTBu03");

function Abscent(robot: any) {


    // We should get this from some sort of a DB
    var commands = ['AFK', 'BRB'];
    var adjectives = ['for', 'in', 'until', 'back'];
    var format = ['min', 'hour', 'day'];

    // Build the regex using the commands, adjectives and formats.
    var regex = new RegExp(
        '\\b(' + commands.join('|') + ')\\s+(' +
                 adjectives.join('|') +
                 ')\\s+([0-9]+)\\s+(' +
                 format.join('|') + ')\\b', 'i');

    // Let's make hubot hear every command :)
    robot.hear(/.*/i,
        (msg:any) => {
            var user = msg.message.user;
            var object = regex.exec(msg.message.text);

            if(object !== null ) {
                var command = {
                    User: user.name,
                    Command: object[1],
                    Time: parseInt(object[3]),
                    Format: object[4]
                };
                saveAbscence(command);
            }
        });

    robot.respond(/abscence help/i,
            (msg:any)=>{
                msg.send('http://hola.com');
            });

    robot.hear(/(^|\W)@\w+/g,
        (msg: any) => {

            for(var i = 0; i < msg.match.length; i++){
                var user = msg.match[i];
                user = user.substring(1, user.length);
                var message = checkIsAbscent(msg, user);
            }
        });
}

function saveAbscence(commands)
{
   var ParseClass = Parse.Object.extend("Users");
   var parseClass = new ParseClass();

   parseClass.set("User", commands.User);
   parseClass.set("Command", commands.Command);
   parseClass.set("Time", parseInt(commands.Time));
   parseClass.set("Format", commands.Format);

   parseClass.save(null, {
       success: function(parseClass) {
           console.log(parseClass.id);
       },
       error: function(parseClass, error) {
           console.log(error.message);
       }
   });
}

function checkIsAbscent(msg, user)
{
   var today = new Date();
       var tommorrow = new Date();

       today.setHours(0,0,0,0);
       tommorrow.setDate(today.getDate()+2);
       tommorrow.setHours(0,0,0,0);

       var Class = Parse.Object.extend("Users");
       var query = new Parse.Query(Class);
       query.equalTo("User", user);
       query.greaterThan("createdAt", today);
       query.lessThan("createdAt", tommorrow);
       query.descending("createdAt");
       query.find({
           success: function(result) {
               var format = result[0].attributes.Format;

               if(format == 'min')
               {
                   today = new Date();
                   var abscenceStartTime = result[0].createdAt;
                   var abscenceEndTime = addMinutes(abscenceStartTime,result[0].attributes.Time);

                   if(today> abscenceStartTime && today<abscenceEndTime)
                   {
                       var date = new Date(abscenceEndTime.toString());
                       msg.send( result[0].attributes.User + " is abscent, will be back around " + date.toLocaleTimeString());
                   }

               }else if(format == 'hour')
               {
                   today = new Date();
                   var abscenceStartTime = result[0].createdAt;
                   var abscenceEndTime = addHours(abscenceStartTime,result[0].attributes.Time);

                   if(today> abscenceStartTime && today<abscenceEndTime)
                   {
                       var date = new Date(abscenceEndTime.toString());
                       msg.send( result[0].attributes.User + " is abscent, will be back around " + date.toLocaleTimeString() );
                   }

               }else if(format == 'day')
               {

               }


           },
               error: function(error) {
                console.log(error.message);
           }
       });
}

function addHours(date, hour) {
   return new Date(date.getTime() + hour*60*60*1000);
}

function addMinutes(date, minutes) {
   return new Date(date.getTime() + minutes*60000);
}

export = Abscent;