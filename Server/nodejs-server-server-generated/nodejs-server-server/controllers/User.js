'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.deleteUserById = function deleteUserById (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  User.deleteUserById(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserById = function getUserById (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  User.getUserById(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserByName = function getUserByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  User.getUserByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsers = function getUsers (req, res, next) {
  User.getUsers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modifyUserById = function modifyUserById (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  var body = req.swagger.params['body'].value;
  User.modifyUserById(userId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postNewUser = function postNewUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.postNewUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
