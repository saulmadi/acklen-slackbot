var HubotFutbolWisdom = (function () {
    function HubotFutbolWisdom(promise) {
        this.promise = promise;
    }
    HubotFutbolWisdom.prototype.showPremierLeagueLeagueTable = function () {
        var urlToGet = 'http://api.football-data.org/alpha/soccerseasons/354/leagueTable';
        var promise = this.promise(urlToGet);
        return promise.then(function (body) {
            var leagueTable = JSON.parse(body);
            var message = "";
            var team;
            if (leagueTable.standing.length === 0) {
                message = "No league table was found, get back to work!";
            }
            else {
                for (var i = 0; i < leagueTable.standing.length; i++) {
                    team = leagueTable.standing[i];
                    message += team.position + " | " + team.teamName + " | " + team.points + "pts\n";
                }
            }
            return message;
        });
    };
    HubotFutbolWisdom.prototype.showLaLigaLeagueLeagueTable = function () {
        var urlToGet = 'http://api.football-data.org/alpha/soccerseasons/358/leagueTable';
        var promise = this.promise(urlToGet);
        return promise.then(function (body) {
            var leagueTable = JSON.parse(body);
            var message = "";
            var team;
            if (leagueTable.standing.length === 0) {
                message = "No league table was found, get back to work!";
            }
            else {
                for (var i = 0; i < leagueTable.standing.length; i++) {
                    team = leagueTable.standing[i];
                    message += team.position + " | " + team.teamName + " | " + team.points + "pts\n";
                }
            }
            return message;
        });
    };
    HubotFutbolWisdom.prototype.showPremierLeagueFixtures = function () {
        var dateTimeToday = new Date();
        var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0" + (dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
        var day = (dateTimeToday.getDay()) <= 9 ? "0" + (dateTimeToday.getDay()) : (dateTimeToday.getDay());
        var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month + "-" + day;
        var urlToGet = "http://api.football-data.org/alpha/soccerseasons/354/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
        var promiseFixtures = this.promise(urlToGet);
        return promiseFixtures.then(function (body) {
            var fixtures = JSON.parse(body);
            var message = "";
            if (fixtures.fixtures.length > 0) {
                message = "MatchDay | Home Team | Away Team | Status \n";
                for (var i = 0; i < fixtures.fixtures.length; i++) {
                    var game = fixtures.fixtures[i];
                    message += game.matchday + " | " + game.homeTeamName + " " + game.result.goalsHomeTeam + " | " + game.awayTeamName + " " + game.result.goalsAwayTeam + " | " + game.status + "\n";
                }
                return message;
            }
            else {
                message = "No games for today. Go back to work.";
            }
            return message;
        });
    };
    return HubotFutbolWisdom;
})();
exports.HubotFutbolWisdom = HubotFutbolWisdom;
