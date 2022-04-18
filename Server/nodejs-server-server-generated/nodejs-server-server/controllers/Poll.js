'use strict';

var utils = require('../utils/writer.js');
var Poll = require('../service/PollService');

module.exports.deletePollById = function deletePollById (req, res, next) {
  var pollId = req.swagger.params['pollId'].value;
  Poll.deletePollById(pollId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPollById = function getPollById (req, res, next) {
  var pollId = req.swagger.params['pollId'].value;
  Poll.getPollById(pollId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPolls = function getPolls (req, res, next) {
  Poll.getPolls()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modifyPollById = function modifyPollById (req, res, next) {
  var pollId = req.swagger.params['pollId'].value;
  var body = req.swagger.params['body'].value;
  Poll.modifyPollById(pollId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postNewPoll = function postNewPoll (req, res, next) {
  var body = req.swagger.params['body'].value;
  Poll.postNewPoll(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
