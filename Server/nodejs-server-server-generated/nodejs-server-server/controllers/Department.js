'use strict';

var utils = require('../utils/writer.js');
var Department = require('../service/DepartmentService');

module.exports.deleteDepartmentById = function deleteDepartmentById (req, res, next) {
  var departmentId = req.swagger.params['departmentId'].value;
  Department.deleteDepartmentById(departmentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDepartmentById = function getDepartmentById (req, res, next) {
  var departmentId = req.swagger.params['departmentId'].value;
  Department.getDepartmentById(departmentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDepartmentByName = function getDepartmentByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  Department.getDepartmentByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDepartments = function getDepartments (req, res, next) {
  Department.getDepartments()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modifyDepartmentById = function modifyDepartmentById (req, res, next) {
  var departmentId = req.swagger.params['departmentId'].value;
  var body = req.swagger.params['body'].value;
  Department.modifyDepartmentById(departmentId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postNewDepartment = function postNewDepartment (req, res, next) {
  var body = req.swagger.params['body'].value;
  Department.postNewDepartment(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
