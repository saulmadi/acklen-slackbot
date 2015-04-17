/// <reference path="../../typings/node/node.d.ts"/>
var ms = require("../helpers/messageSender");
var ts = require("../helpers/trelloService");
var StartDeveloping = (function () {
    function StartDeveloping(messageSender, tresloService) {
        var _this = this;
        this.messageSender = messageSender;
        this.tresloService = tresloService;
        this.registerListener = function (robot) {
            robot.respond(/Start Developing ?(.*)/i, function (msg) {
                var cardName = msg.match[1];
                var values = _this.tresloService.moveCard(cardName, "in dev");
                _this.messageSender.send(msg, cardName + " is in developement pull the branch '" + cardName + "'");
            });
        };
    }
    return StartDeveloping;
})();
var httpClient = require("request-promise");
var MessageSender = ms.MessageSender;
var TrelloService = ts.TrelloService;
var fn = new StartDeveloping(new MessageSender(), new TrelloService(httpClient)).registerListener;
module.exports = fn;
