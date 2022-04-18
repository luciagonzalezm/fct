'use strict';

var utils = require('../utils/writer.js');
var Administrator = require('../service/AdministratorService');

module.exports.deleteAdministratorById = function deleteAdministratorById (req, res, next) {
  var administratorId = req.swagger.params['administratorId'].value;
  Administrator.deleteAdministratorById(administratorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAdministratorById = function getAdministratorById (req, res, next) {
  var administratorId = req.swagger.params['administratorId'].value;
  Administrator.getAdministratorById(administratorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAdministratorByName = function getAdministratorByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  Administrator.getAdministratorByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAdministrators = function getAdministrators (req, res, next) {
  Administrator.getAdministrators()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modifyAdministratorById = function modifyAdministratorById (req, res, next) {
  var administratorId = req.swagger.params['administratorId'].value;
  var body = req.swagger.params['body'].value;
  Administrator.modifyAdministratorById(administratorId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postNewAdministrator = function postNewAdministrator (req, res, next) {
  var body = req.swagger.params['body'].value;
  Administrator.postNewAdministrator(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
