'use strict';

var Administrator = require('./AdministratorService');
var Supervisor = require('./SupervisorService');
var User = require('./UserService');


/**
 * Login administrator
 * Login in the sistem as administrador
 *
 * body Login Login object
 * returns Administrator
 **/
exports.loginAdministrator = function (body) {
  return new Promise(function (resolve, reject) {
    var found = false;
    if (body.username && body.password && body.role) {
      Administrator.administrators.forEach(administrator => {
        if ((administrator.username === body.username) && (administrator.password === body.password) && (administrator.role === body.role)) {
          found = true;
          resolve(administrator);
        }
      });
    } else {
      reject();
    }
    if (found === false) {
      reject();
    }
  });
}


/**
 * Login supervisor
 * Login in the sistem as supervisor
 *
 * body Login Login object
 * returns Supervisor
 **/
exports.loginSupervisor = function (body) {
  return new Promise(function (resolve, reject) {
    var found = false;
    if (body.username && body.password && body.role) {
      Supervisor.supervisors.forEach(supervisor => {
        if ((supervisor.username === body.username) && (supervisor.password === body.password) && (supervisor.role === body.role)) {
          found = true;
          resolve(supervisor);
        }
      });
    } else {
      reject();
    }
    if (found === false) {
      reject();
    }
  });
}


/**
 * Login user
 * Login in the sistem as user
 *
 * body Login Login object
 * returns User
 **/
exports.loginUser = function (body) {
  return new Promise(function (resolve, reject) {
    var found = false;
    if (body.username && body.password && body.role) {
      User.users.forEach(user => {
        if ((user.username === body.username) && (user.password === body.password) && (user.role === body.role)) {
          found = true;
          resolve(user);
        }
      });
    } else {
      reject();
    }
    if (found === false) {
      reject();
    }
  });
}

