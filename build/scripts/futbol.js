/// <reference path="../../typings/node/node.d.ts"/>
// Description:
//   Say Hi to Hubot.
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot hello - "hello!"
//   howdy - "wait... are you from Texas too?"
//
// Authors:
//   Camilo Aguilar & Osman Hernandez
var httpClient = require("request-promise");
function Futbol(robot) {
    robot.respond(/premier-league standings/i, function (msg) {
        var urlToGet = "http://api.football-data.org/alpha/soccerseasons/354/leagueTable";
        var promise = httpClient(urlToGet);
        return promise.then(function (body) {
            var leagueTable = JSON.parse(body);
            var result = "";
            for (var i = 0; i < leagueTable.standing.length; i++) {
                var team = leagueTable.standing[i];
                result += team.position + " | " + team.teamName + " | " + team.points + "\n";
            }
            msg.reply(result);
        });
    });
    robot.respond(/premier-league fixtures/i, function (msg) {
        var dateTimeToday = new Date();
        var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0" + (dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
        var day = (dateTimeToday.getDay()) <= 9 ? "0" + (dateTimeToday.getDay()) : (dateTimeToday.getDay());
        var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month + "-" + day;
        var urlToGet = "http://api.football-data.org/alpha/soccerseasons/354/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
        console.log(urlToGet);
        var promiseFixtures = httpClient(urlToGet);
        return promiseFixtures.then(function (body) {
            var fixtures = JSON.parse(body);
            if (fixtures.fixtures.length > 0) {
                var result = "MatchDay | Home Team | Away Team | Status \n";
                for (var i = 0; i < fixtures.fixtures.length; i++) {
                    var game = fixtures.fixtures[i];
                    result += game.matchday + " | " + game.homeTeamName + " " + game.result.goalsHomeTeam + " | " + game.awayTeamName + " " + game.result.goalsAwayTeam + " | " + game.status + "\n";
                }
                msg.reply(result);
            }
            else {
                msg.reply("No games for today. Go back to work.");
            }
        });
    });
}
module.exports = Futbol;
