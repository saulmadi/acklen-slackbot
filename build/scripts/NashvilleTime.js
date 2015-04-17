/// <reference path="../../typings/node/node.d.ts"/>
// Description
//  An example Hubot script written in TypeScript
//
// Configuration:
//   None
//
// Commands:
//   hubot hello - responds 'Howdy!'
//
// Author:
//   Byron Sommardahl <byron@acklenavenue.com>
function NashvilleTime(robot) {
    robot.hear(/time zone/i, function (msg) {
        msg.reply("Only a sith deals in times other than Nashville Time!");
    });
}
module.exports = NashvilleTime;
