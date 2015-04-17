/// <reference path="../../typings/node/node.d.ts"/>
var ms = require("../helpers/messageSender");
var StartDeveloping = (function () {
    function StartDeveloping(messageSender) {
        var _this = this;
        this.messageSender = messageSender;
        this.registerListener = function (robot) {
            robot.respond(/Start Developing ?(.*)/i, function (msg) {
                var cardName = msg.match[1];
                _this.messageSender.send(msg, cardName + " is in developement pull the branch '" + cardName + "'");
            });
        };
    }
    return StartDeveloping;
})();
var httpClient = require("request-promise");
var MessageSender = ms.MessageSender;
var fn = new StartDeveloping(new MessageSender()).registerListener;
module.exports = fn;
