/// <reference path="../../typings/node/node.d.ts"/>

import ms = require("../helpers/messageSender");

class StartDeveloping {	
    constructor(private messageSender: ms.ISendMessages){
    }
    
	registerListener = (robot: any) => {
		robot.respond(/Start Developing ?(.*)/i, (msg: any) => {
			var cardName = msg.match[1]
			
				this.messageSender.send(msg, cardName +" is in developement pull the branch '" +cardName+"'");
					})
	}
}

var httpClient = require("request-promise")

var MessageSender = ms.MessageSender;

var fn = new StartDeveloping(new MessageSender()).registerListener
export = fn