# Description:
#   Example scripts for you to examine and try out.
#
# Notes:
#   They are commented out by default, because most of them are pretty silly and
#   wouldn't be useful and amusing enough for day to day huboting.
#   Uncomment the ones you want to try and experiment with.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md
###
Util = require "util"
mongodb = require "mongodb"
Server = mongodb.Server
Collection = mongodb.Collection
Db = mongodb.Db

module.exports = (robot) ->
  user = "admin"
  pass = "root"
  host = "ds051831.mongolab.com"
  port = "51831"
  dbname = "heroku_app34060973"

  robot.hear //, (robot) ->
      insertToDatabase(robot)

  formatMessage = (robot) ->
     "#{new Date()} #{robot.message.user.room}: #{robot.message.user.real_name}: #{robot.message.user.email_address} #{robot.message.text}\n"

  insertToDatabase = (robot) ->
    server = new Server host, port, {}
    db = new Db dbname, server, { w: 1, native_parser: true }

    db.open (err, client) ->
      return error err if err

      db.authenticate user, pass, (err, success) ->
        return error err if err
        collection = new Collection client, 'SlackLogger'
        collection.save({ChannelName:robot.message.user.room,Author:robot.message.user.real_name,EmailAddress:robot.message.user.email_address,SlackMessage:robot.message.text,SlackDateTime:new Date()}, {w:0})
###
