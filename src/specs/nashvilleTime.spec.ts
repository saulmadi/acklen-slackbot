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

});
