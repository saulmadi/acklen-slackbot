var Parse = require('parse').Parse;
var moment = require('moment');

export interface IIHubotParseDb {
	saveAbscence(command:any): any
	checkIsAbscent(messageSender:any, user:any): any		
}

export class HubotParseDb implements IIHubotParseDb {
	constructor(){
		Parse.initialize("wQFYcalrOw3YwIQoQ1BcgiMFhGE0tL4P24uKXFDm", "vdPFwegmiQvcnGIrFe09eTCI9oOyxm5buocTBu03"); 
	}


	saveAbscence(command:any):any{
       var ParseClass = Parse.Object.extend("Users");
       var parseClass = new ParseClass();

       parseClass.set("User", command.User);
       parseClass.set("Command", command.Command);
       parseClass.set("Time", parseInt(command.Time));
       parseClass.set("Format", command.Format);

        parseClass.save(null, {
           success: function(parseClass) {
               return parseClass.id;
           },
           error: function(parseClass, error) {
               return error.message;
           }});
       return '';
	}

	checkIsAbscent(messageSender:any, user:any): any{
		var today = new Date();
       var tommorrow = new Date();

       today.setHours(0,0,0,0);
       tommorrow.setDate(today.getDate()+1);
       tommorrow.setHours(0,0,0,0);

       var Class = Parse.Object.extend("Users");
       var query = new Parse.Query(Class);
       query.equalTo("User", user);
       query.greaterThan("createdAt", today);
       query.lessThan("createdAt", tommorrow);
       query.descending("createdAt");
       query.find({
           success: (result:any) => {
               var format = result[0].attributes.Format;

               if(format == 'min')
               {
                   today = new Date();
                   var abscenceStartTime = result[0].createdAt;
                   var abscenceEndTime = this.addMinutes(abscenceStartTime,result[0].attributes.Time);

                   if(today> abscenceStartTime && today<abscenceEndTime)
                   {
                       var date = new Date(abscenceEndTime.toString());
                       messageSender.send( result[0].attributes.User + " is abscent, will be back around " + moment(date).format('h:mm A'));
                   }

               }else if(format == 'hour')
               {
                   today = new Date();
                   var abscenceStartTime = result[0].createdAt;
                   var abscenceEndTime = this.addHours(abscenceStartTime,result[0].attributes.Time);

                   if(today> abscenceStartTime && today<abscenceEndTime)
                   {
                       var date = new Date(abscenceEndTime.toString());
                       messageSender.send(result[0].attributes.User + " is abscent, will be back around " + moment(date).format('h:mm A'));
                   }

               }else if(format == 'day')
               {

               }


           },
               error: (error:any) => {
                console.log(error.message);
           }
       });
	}
    
    addHours(date, hour): any{
       return new Date(date.getTime() + hour*60*60*1000);
    }

    addMinutes(date, minutes) :any{
       return new Date(date.getTime() + minutes*60000);
    }
}
