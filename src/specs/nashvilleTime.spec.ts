import NashvilleTime = require('../scripts/NashvilleTime');
import rob = require('./fakes/FakeRobot');
var FakeRobot = rob.FakeRobot;
import res = require('./fakes/FakeResponse');
var FakeResponse = res.FakeResponse;
import chai = require('chai');
var expect = chai.expect;

describe("The Nashville Time Hubot script", () => {
  
  beforeEach(() => {
    this.robot = new FakeRobot();        
  });

  it("should respond to 'time zone' with a taunt.", () => {    
    var resp = new FakeResponse();
    this.robot.overhears("time zone", resp);
    NashvilleTime(this.robot);
    expect(resp.messageReplied).to.equal("Only a sith deals in times other than Nashville Time!");        
  });

  it("should respond to 'time zone' with a taunt.", () => {    
    var resp = new FakeResponse();
    this.robot.overhears("nashville time", resp);
    resp.setRandomResponse(1);
    NashvilleTime(this.robot);
    expect(resp.messageReplied).to.equal("http://joshowens.me/content/images/2014/Nov/timezone-meme.jpg");        
  });

  it("should respond to 'GriNgo TiMe' with a taunt.", () => {    
    var resp = new FakeResponse();
    this.robot.overhears("GriNgo TiMe", resp);
    resp.setRandomResponse(2);
    NashvilleTime(this.robot);
    expect(resp.messageReplied).to.equal("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJjN9aW3UM5r2KNc83eh7kjJK0Yd4JOhplskP-WJW1DTLFhqTwjQ");        
  });
  
  
});
