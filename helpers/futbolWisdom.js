var HubotFutbolWisdom = (function () {
    function HubotFutbolWisdom(promise) {
        this.promise = promise;
    }
    HubotFutbolWisdom.prototype.showHelp = function () {
        var helpMessage = "Command | Help \n";
        helpMessage += "premier-league standings | Return the actual season standing for England's Premier League \n";
        helpMessage += "premier-league fixtures | Return todays date fixtures for England's Premier League \n";
        helpMessage += "la-liga standings | Return the actual season standing for Spain's La Liga \n";
        helpMessage += "la-liga fixtures | Return todays date fixtures for Spains's La Liga \n";
        helpMessage += "real-madrid fixtures | Return todays date fixtures for Real Madrid \n";
        return helpMessage;
    };
    HubotFutbolWisdom.prototype.showTeamFixtures = function (id) {
        var dateTimeToday = new Date();
        var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0" + (dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
        var day = (dateTimeToday.getDate()) <= 9 ? "0" + (dateTimeToday.getDate()) : (dateTimeToday.getDate());
        var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month + "-" + day;
        var urlToGet = "http://api.football-data.org/alpha/teams/" + id + "/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
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
    HubotFutbolWisdom.prototype.showLeagueTable = function (id) {
        var urlToGet = 'http://api.football-data.org/alpha/soccerseasons/' + id + '/leagueTable';
        var promise = this.promise(urlToGet);
        return promise.then(function (body) {
            var leagueTable = JSON.parse(body);
            var message = "";
            var team;
            if (leagueTable.standing.length === 0) {
                message = "No league table was found, get back to work!";
            }
            else {
                message = "` Position ` | ` Team Name                                         ` | ` Points  ` \n";
                for (var i = 0; i < leagueTable.standing.length; i++) {
                    team = leagueTable.standing[i];
                    var length = 50;
                    var teamNameLength = team.teamName.length;
                    var newLength = length - teamNameLength;
                    var teamPosition = (team.position <= 9) ? team.position + " " : team.position;
                    message += "` " + teamPosition + "       ` | ` " + team.teamName + new Array(newLength).join(' ') + " ` | ` " + team.points + "pts   `\n";
                }
            }
            return message;
        });
    };
    HubotFutbolWisdom.prototype.showLeagueFixtures = function (id) {
        var dateTimeToday = new Date();
        var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0" + (dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
        var day = (dateTimeToday.getDate()) <= 9 ? "0" + (dateTimeToday.getDate()) : (dateTimeToday.getDate());
        var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month + "-" + day;
        var urlToGet = "http://api.football-data.org/alpha/soccerseasons/" + id + "/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
        var promiseFixtures = this.promise(urlToGet);
        return promiseFixtures.then(function (body) {
            var fixtures = JSON.parse(body);
            var message = "";
            if (fixtures.fixtures.length > 0) {
                message = "` MatchDay ` | ` Home Team                    ` | ` Away Team                     ` | ` Status ` \n";
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
    HubotFutbolWisdom.prototype.showLaLigaFixtures = function () {
        var dateTimeToday = new Date();
        var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0" + (dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
        var day = (dateTimeToday.getDate()) <= 9 ? "0" + (dateTimeToday.getDate()) : (dateTimeToday.getDate());
        var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month + "-" + day;
        var urlToGet = "http://api.football-data.org/alpha/soccerseasons/358/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
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
