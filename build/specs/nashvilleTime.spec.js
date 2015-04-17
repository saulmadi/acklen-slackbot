var _this = this;
var NashvilleTime = require('../scripts/NashvilleTime');
var rob = require('./fakes/FakeRobot');
var FakeRobot = rob.FakeRobot;
var res = require('./fakes/FakeResponse');
var FakeResponse = res.FakeResponse;
var chai = require('chai');
var expect = chai.expect;
describe("The Nashville Time Hubot script", function () {
    beforeEach(function () {
        _this.robot = new FakeRobot();
    });
    it("should respond to 'time zone' with a taunt.", function () {
        var resp = new FakeResponse();
        _this.robot.overhears("time zone", resp);
        NashvilleTime(_this.robot);
        expect(resp.messageReplied).to.equal("Only a sith deals in times other than Nashville Time!");
    });
});
