'use strict';

var utils = require('../utils/writer.js');
var Supervisor = require('../service/SupervisorService');

module.exports.deleteSupervisorById = function deleteSupervisorById (req, res, next) {
  var supervisorId = req.swagger.params['supervisorId'].value;
  Supervisor.deleteSupervisorById(supervisorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSupervisorById = function getSupervisorById (req, res, next) {
  var supervisorId = req.swagger.params['supervisorId'].value;
  Supervisor.getSupervisorById(supervisorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSupervisorByName = function getSupervisorByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  Supervisor.getSupervisorByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSupervisors = function getSupervisors (req, res, next) {
  Supervisor.getSupervisors()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modifySupervisorById = function modifySupervisorById (req, res, next) {
  var supervisorId = req.swagger.params['supervisorId'].value;
  var body = req.swagger.params['body'].value;
  Supervisor.modifySupervisorById(supervisorId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postNewSupervisor = function postNewSupervisor (req, res, next) {
  var body = req.swagger.params['body'].value;
  Supervisor.postNewSupervisor(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
