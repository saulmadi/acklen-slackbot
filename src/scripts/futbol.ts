/// <reference path="../../typings/node/node.d.ts"/>
// Description:
//   Soccer information
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot premier-league standings - table with teams standings"
//   hubot premier-league fixtures - shows fixtures for current day
//
// Authors:
//   Camilo Aguilar & Osman Hernandez
//   Tester:
//      Carlos Fontecha

import ms = require("../helpers/messageSender");
import fw = require("../helpers/futbolWisdom");

class Futbol {
	constructor(private messageSender: ms.ISendMessages, private hubotFutbolWisdom: fw.IIHubotFutbolWisdom) {}

	hubotAction = (robot: any) => {
		robot.respond(/futbol wisdom help/i, (msg: any) => {
			this.messageSender.send(msg, this.hubotFutbolWisdom.showHelp());
		});

		//standings
		robot.respond(/bundes-liga standings/i, (msg: any) => {
			this.hubotFutbolWisdom.showLeagueTable(351)
				.then((table) => {
					this.messageSender.send(msg, table);
				});
		});

		robot.respond(/premier-league standings/i, (msg: any) => {
			this.hubotFutbolWisdom.showLeagueTable(354)
				.then((table) => {
					this.messageSender.send(msg, table);
				});
		});

		robot.respond(/la-liga standings/i, (msg: any) => {
			this.hubotFutbolWisdom.showLeagueTable(358)
				.then((table) => {
					this.messageSender.send(msg, table);
				});
		});

		robot.respond(/serie-a standings/i, (msg: any) => {
			this.hubotFutbolWisdom.showLeagueTable(380)
				.then((table) => {
					this.messageSender.send(msg, table);
				});
		});

		//fixtures
		robot.respond(/bundes-liga fixtures/i, (msg: any) => {
			this.hubotFutbolWisdom.showLeagueFixtures(351)
				.then((fixtures) => {
					this.messageSender.send(msg, fixtures);
				});
		});

		robot.respond(/premier-league fixtures/i, (msg: any) => {
			this.hubotFutbolWisdom.showLeagueFixtures(354)
				.then((fixtures) => {
					this.messageSender.send(msg, fixtures);
				});
		});

		robot.respond(/serie-a fixtures/i, (msg: any) => {
			this.hubotFutbolWisdom.showLeagueFixtures(380)
				.then((fixtures) => {
					this.messageSender.send(msg, fixtures);
				});
		});

		robot.respond(/la-liga fixtures/i, (msg: any) => {
			this.hubotFutbolWisdom.showLeagueFixtures(358)
				.then((fixtures) => {
					this.messageSender.send(msg, fixtures);
				});
		});

		//specific team fixtures
		robot.respond(/real-madrid fixtures/i, (msg: any) => {
			this.hubotFutbolWisdom.showTeamFixtures(86)
				.then((fixtures) => {
					this.messageSender.send(msg, fixtures);
				});
		});

	}
}

var httpClient = require("request-promise");
var MessageSender = ms.MessageSender;
var HubotFutbolWisdom = fw.HubotFutbolWisdom;

var fn = new Futbol(new MessageSender(), new HubotFutbolWisdom(httpClient)).hubotAction;
export = fn
