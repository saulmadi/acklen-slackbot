export interface IIHubotFutbolWisdom {
	showLeagueFixtures(id:Number): any
	showLeagueTable(id:Number): any
	showHelp():any
	showTeamFixtures(id:Number): any
}

export class HubotFutbolWisdom implements IIHubotFutbolWisdom {
	constructor(private promise: any){
		
	}


	showHelp():any{
		var helpMessage = "Command | Help \n";
		helpMessage += "premier-league standings | Return the actual season standing for England's Premier League \n";
		helpMessage += "premier-league fixtures | Return todays date fixtures for England's Premier League \n";
		helpMessage += "la-liga standings | Return the actual season standing for Spain's La Liga \n";
		helpMessage += "la-liga fixtures | Return todays date fixtures for Spains's La Liga \n";
		helpMessage += "real-madrid fixtures | Return todays date fixtures for Real Madrid \n";
		return helpMessage;
	}

	showTeamFixtures(id:Number): any{
		var dateTimeToday = new Date();
    	var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0"+(dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
    	var day = (dateTimeToday.getDate()) <= 9 ? "0" + (dateTimeToday.getDate()) : (dateTimeToday.getDate());
    	var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month +"-" + day;

    	var urlToGet = "http://api.football-data.org/alpha/teams/"+id+"/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
    	var promiseFixtures = this.promise(urlToGet);
    	return promiseFixtures.then((body) => {
      		var fixtures = JSON.parse(body);
      		var message = "";
      		if (fixtures.fixtures.length > 0){
        		message = "MatchDay | Home Team | Away Team | Status \n";
        		for(var i = 0; i<fixtures.fixtures.length;i++){
          			var game = fixtures.fixtures[i];
          			message += game.matchday + " | " + game.homeTeamName + " " + game.result.goalsHomeTeam + " | " + game.awayTeamName + " " + game.result.goalsAwayTeam + " | " + game.status + "\n";
        		}
        		return message;
      		}
      		else{
        		message = "No games for today. Go back to work.";
      		}

      		return message;

    	});
	}

	showLeagueTable(id:Number): any{
		var urlToGet = 'http://api.football-data.org/alpha/soccerseasons/'+id+'/leagueTable';
		var promise = this.promise(urlToGet);

		return promise.then((body) => {
	      	var leagueTable = JSON.parse(body);
	      	var message = "";
	      	var team:any;

	      	if(leagueTable.standing.length === 0) {
	      		message = "No league table was found, get back to work!";
	      	}else {
	      		message = "` Position ` | ` Team Name                                    ` | ` Points ` \n";
		      	for(var i = 0; i < leagueTable.standing.length; i++) {
		        	team = leagueTable.standing[i];
		        	message += "` "+ team.position + "       ` | ` " + team.teamName + " ` | `" + team.points + "pts   `\n";
		      	}
	      	}
	      	return message;
    	});
	}

	showLeagueFixtures(id: Number) :any {
		var dateTimeToday = new Date();
    	var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0"+(dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
    	var day = (dateTimeToday.getDate()) <= 9 ? "0" + (dateTimeToday.getDate()) : (dateTimeToday.getDate());
    	var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month +"-" + day;

    	var urlToGet = "http://api.football-data.org/alpha/soccerseasons/"+id+"/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
    	var promiseFixtures = this.promise(urlToGet);
    	return promiseFixtures.then((body) => {
      		var fixtures = JSON.parse(body);
      		var message = "";
      		if (fixtures.fixtures.length > 0){
        		message = "MatchDay | Home Team | Away Team | Status \n";
        		for(var i = 0; i<fixtures.fixtures.length;i++){
          			var game = fixtures.fixtures[i];
          			message += game.matchday + " | " + game.homeTeamName + " " + game.result.goalsHomeTeam + " | " + game.awayTeamName + " " + game.result.goalsAwayTeam + " | " + game.status + "\n";
        		}
        		return message;
      		}
      		else{
        		message = "No games for today. Go back to work.";
      		}

      		return message;

    	});
	}

	showPremierLeagueFixtures() :any {
		var dateTimeToday = new Date();
    	var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0"+(dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
    	var day = (dateTimeToday.getDay()) <= 9 ? "0" + (dateTimeToday.getDay()) : (dateTimeToday.getDay());
    	var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month +"-" + day;

    	var urlToGet = "http://api.football-data.org/alpha/soccerseasons/354/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
    	var promiseFixtures = this.promise(urlToGet);
    	return promiseFixtures.then((body) => {
      		var fixtures = JSON.parse(body);
      		var message = "";
      		if (fixtures.fixtures.length > 0){
        		message = "MatchDay | Home Team | Away Team | Status \n";
        		for(var i = 0; i<fixtures.fixtures.length;i++){
          			var game = fixtures.fixtures[i];
          			message += game.matchday + " | " + game.homeTeamName + " " + game.result.goalsHomeTeam + " | " + game.awayTeamName + " " + game.result.goalsAwayTeam + " | " + game.status + "\n";
        		}
        		return message;
      		}
      		else{
        		message = "No games for today. Go back to work.";
      		}

      		return message;

    	});
	}

	showLaLigaFixtures() :any {
		var dateTimeToday = new Date();
    	var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0"+(dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
    	var day = (dateTimeToday.getDate()) <= 9 ? "0" + (dateTimeToday.getDate()) : (dateTimeToday.getDate());
    	var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month +"-" + day;

    	var urlToGet = "http://api.football-data.org/alpha/soccerseasons/358/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
    	var promiseFixtures = this.promise(urlToGet);
    	return promiseFixtures.then((body) => {
      		var fixtures = JSON.parse(body);
      		var message = "";
      		if (fixtures.fixtures.length > 0){
        		message = "MatchDay | Home Team | Away Team | Status \n";
        		for(var i = 0; i<fixtures.fixtures.length;i++){
          			var game = fixtures.fixtures[i];
          			message += game.matchday + " | " + game.homeTeamName + " " + game.result.goalsHomeTeam + " | " + game.awayTeamName + " " + game.result.goalsAwayTeam + " | " + game.status + "\n";
        		}
        		return message;
      		}
      		else{
        		message = "No games for today. Go back to work.";
      		}

      		return message;

    	});
	}
}
