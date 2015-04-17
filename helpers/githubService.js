/// <reference path="../../typings/node/node.d.ts"/>
var _ = require("underscore");
var GithubServices = (function () {
    function GithubServices(httpClient) {
        this.httpClient = httpClient;
    }
    GithubServices.prototype.createBranch = function (name, from) {
        var _this = this;
        var getOptions = {
            uri: "https://api.github.com/repos/saulmadi/acklen-slackbot/git/refs/heads?client_id=f877c09dc922492643ae&client_secret=d9725b5f686127401e0a471eafc48efbe2f03751",
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36"
            }
        };
        var branchRefrences = this.httpClient(getOptions);
        branchRefrences.then(function (body) {
            var fromBranch = _.find(JSON.parse(body), function (item) {
                return item.ref === "refs/heads/" + from;
            });
            console.log("entro a la cosas" + body);
            var options = {
                uri: "https://api.github.com/repos/saulmadi/acklen-slackbot/git/refs?access_token=4dcf4b3298bc38faa8bc348ae93fcb4f62aa549b",
                method: "POST",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36"
                },
                body: JSON.stringify({
                    ref: "refs/heads/" + name,
                    sha: fromBranch.object.sha
                })
            };
            _this.httpClient(options).then(function (body) {
                return "jay";
            });
        });
    };
    return GithubServices;
})();
exports.GithubServices = GithubServices;
