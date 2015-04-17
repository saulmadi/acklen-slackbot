/// <reference path="../../typings/node/node.d.ts"/>

import ms = require("../helpers/messageSender");
import ts = require("../helpers/trelloService");
class StartDeveloping {	
    constructor(private messageSender: ms.ISendMessages, private tresloService: ts.ITrelloService){
    }
    
	registerListener = (robot: any) => {
		robot.respond(/Start Developing ?(.*)/i, (msg: any) => {
			var cardName = msg.match[1]
			
                var values =  this.tresloService.moveCard(cardName, "in dev");
                    
				this.messageSender.send(msg, cardName +" is in developement pull the branch '" +cardName+"'");
					})
	}
}

var httpClient = require("request-promise")

var MessageSender = ms.MessageSender;
var TrelloService = ts.TrelloService
var fn = new StartDeveloping(new MessageSender(), new TrelloService(httpClient)).registerListener
export = fn