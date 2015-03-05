# Description:
#   Example scripts for you to examine and try out.
#
# Notes:
#   They are commented out by default, because most of them are pretty silly and
#   wouldn't be useful and amusing enough for day to day huboting.
#   Uncomment the ones you want to try and experiment with.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

Util = require "util"
mongodb = require "mongodb"
Server = mongodb.Server
Collection = mongodb.Collection
Db = mongodb.Db

module.exports = (robot) ->
  user = "admin"
  pass = "password"
  host = "localhost"
  port = "27017"
  dbname = "SlackToWebSite"

  console.log "Started logging"
  robot.hear //, (robot) ->
      console.log(formatMessage(robot))
      insertToDatabase(robot)

  formatMessage = (robot) ->
     "#{new Date()} #{robot.message.user.room}: #{robot.message.user.real_name}: #{robot.message.text}\n"

  error = (err) ->
    console.log "==MONGO UNAVAILABLE=="
    console.log err      

  insertToDatabase = (robot) ->
    server = new Server host, port, {}
    db = new Db dbname, server, { w: 1, native_parser: true }

    db.open (err, client) ->
      return error err if err

      collection = new Collection client, 'SlackLogger'
      collection.save({ChannelName:robot.message.user.room,Author:robot.message.user.real_name,SlackMessage:robot.message.text,DateTime:new Date()}, {w:0})