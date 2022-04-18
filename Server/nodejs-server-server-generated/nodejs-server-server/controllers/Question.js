'use strict';

var utils = require('../utils/writer.js');
var Question = require('../service/QuestionService');

module.exports.deleteQuestionById = function deleteQuestionById (req, res, next) {
  var questionId = req.swagger.params['questionId'].value;
  Question.deleteQuestionById(questionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getQuestionById = function getQuestionById (req, res, next) {
  var questionId = req.swagger.params['questionId'].value;
  Question.getQuestionById(questionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getQuestions = function getQuestions (req, res, next) {
  Question.getQuestions()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modifyQuestionById = function modifyQuestionById (req, res, next) {
  var questionId = req.swagger.params['questionId'].value;
  var body = req.swagger.params['body'].value;
  Question.modifyQuestionById(questionId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postNewQuestion = function postNewQuestion (req, res, next) {
  var body = req.swagger.params['body'].value;
  Question.postNewQuestion(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
