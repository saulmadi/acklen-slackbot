/// <reference path="../../typings/node/node.d.ts"/>
// Description
//  A Hubot script written in TypeScript to show information about acklen avenue project
//
// Configuration:
//   None
//
// Commands:
//   hubot create project note ProjectWall
// Author:
//   Rene Rosa <realpasro09@hotmail.com>
//   Frank Rodriguez <frankhn0801@gmail.com>

function AcklenProjects(robot: any) {
  var fs = require('fs');
  var projects = JSON.parse(fs.readFileSync('project.json', 'utf8'));
  var _ = require('underscore');

 robot.respond(/create notes for (.*)/i, (msg: any) => {
    var projectName = msg.match[1];
    var project = _.filter(projects, function(p){
      return p.name.toLowerCase() === projectName.toLowerCase();
    });
    if (project.length === 0){
      var myjson = {'name': projectName };
      projects.push(myjson);
      fs.writeFile('project.json', JSON.stringify(projects));
      msg.reply('Great ' + projectName  +' notes were created successfully')
    } else {
      msg.reply('ooops looks like you already have this project note')
    }
  })

  robot.respond(/add note (.*) to (.*) with (.*)/i, (msg: any) => {
    var variableName: string = msg.match[1];
    var projectName: string  = msg.match[2];
    var value: string = msg.match[3];
    var projectExist: boolean =false;

    _.each(projects, function(p){
      if(p.name.toLowerCase() === projectName.toLowerCase())
      {
        p[variableName] = value;
        projectExist = true;
      }
    })
    if (projectExist){
      fs.writeFile('project.json', JSON.stringify(projects));
      msg.reply(variableName + ' added to ' + projectName);
    } else{
      msg.send("Hey fellow " + projectName + " is not added as a project note, you can create a new  note project with the command: create notes for [Name of the Project note]");
    }
  })

  robot.respond(/list (.*) notes/i, (msg:any) =>{
    var projectName: string  = msg.match[1];

    var project = _.filter(projects, function(p){
      return p.name.toLowerCase() === projectName.toLowerCase();
    });

    if (project.length === 0){
      msg.send("ok yo got me, I dont have information about this project note :(");
    }
    else{
      var response: string ='';
      var properties = Object.keys(project[0]);

      for (var key in properties) {
        var propertyName = properties[key];
        response += properties[key] + ": " + project[0][propertyName] + "\n";
      }
      msg.send(response);
    }

  })

  robot.respond(/list me all note projects/i, (msg:any) =>{
    if (projects.length === 0){
      msg.send("there are not notes, try adding one with the command: create notes for [Name Of Note Project]");
    }
    else{
      var response: string = '';
      for (var project in projects) {
        response += parseInt(project) + 1 + ". " + projects[project].name + "\n";
      }
      response += "If you want to see the detail of each note project just try: \n"
      response += "list [ProjectName] notes"
      msg.send(response);
    }

  })

  robot.respond(/edit (.*) in (.*) with -> (.*)/i, (msg: any) => {
       var property: string = msg.match[1];
       var projectName: string = msg.match[2];
       var newValue: string = msg.match[3];

       var project = _.filter(projects, function(p) {
           return p.name.toLowerCase() === projectName.toLowerCase();
       });


       if (project.length === 0) {
           msg.send("ok yo got me, I don't have information about this project :(");
       }
       else {

           if (project[0][property].length === 0) {
               msg.send("ok yo got me, I don't have information about this note :(");
           }
           else {
               var response: string = '';

               _.each(projects, function(p) {
                   if (p.name.toLowerCase() === projectName.toLowerCase()) {
                       p[property] = newValue;
                   }
               })

               fs.writeFile('project.json', JSON.stringify(projects));

               msg.send("You have edited " + property + " in " + projectName);

           }
       }

   })
}

export = AcklenProjects;
