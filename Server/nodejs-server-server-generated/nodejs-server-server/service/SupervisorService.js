'use strict';

var supervisors = [
  {
    "firstName": "López",
    "lastName": "Castaño",
    "password": "martaL2021",
    "role": "supervisor",
    "name": "Marta",
    "id": 1,
    "department": 1,
    "email": "marta.lopez@viewnext.com",
    "username": "marta"
  }
];

exports.supervisors = supervisors;


/**
 * Delete supervisor using ID
 * This can only be done by an administrator
 *
 * supervisorId Long Supervisor ID to delete
 * no response value expected for this operation
 **/
exports.deleteSupervisorById = function (supervisorId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    supervisors.forEach((supervisor, i) => {
      if (supervisor.id === supervisorId) {
        found = true;
        supervisors.splice(i, 1);
        resolve(supervisors);
      }
    });
    if (found === false) {
      reject();
    }
  });
}


/**
 * Get supervisor by ID
 * This can only be done by an administrator or a supervisor
 *
 * supervisorId Long ID of supervisor to return
 * returns Supervisor
 **/
exports.getSupervisorById = function (supervisorId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    supervisors.forEach(supervisor => {
      if (supervisor.id === supervisorId) {
        found = true;
        resolve(supervisor);
      }
    });
    if (found === false) {
      reject();
    }
  });
}


/**
 * Get supervisor by name
 * This can only be done by an administrator or a supervisor
 *
 * name String The name that needs to be fetched
 * returns Supervisor
 **/
exports.getSupervisorByName = function (name) {
  return new Promise(function (resolve, reject) {
    var supervisorsFind = [];
    var found = false;
    supervisors.forEach(supervisor => {
      if (supervisor.name.toLowerCase() === name.toLowerCase()) {
        found = true;
        supervisorsFind.push(supervisor);
        resolve(supervisorsFind);
      }
    });
    if (found === false) {
      reject();
    }
  });
}


/**
 * Get all supervisor
 * This can only be done by an administrator or a supervisor
 *
 * returns Object
 **/
exports.getSupervisors = function () {
  return new Promise(function (resolve, reject) {
    resolve(supervisors);
  });
}


/**
 * Updated supervisor using ID
 * This can only be done by an administrator or a supervisor
 *
 * supervisorId Long ID of supervisor that needs to be updated
 * body Supervisor Updated supervisor object
 * returns Supervisor
 **/
exports.modifySupervisorById = function (supervisorId, body) {
  return new Promise(function (resolve, reject) {
    var found = false;
    if (body.id && body.role && body.name && body.firstName && body.lastName && body.department && body.email && body.username && body.password) {
      supervisors.forEach((supervisor, i) => {
        if (supervisor.id === supervisorId) {
          supervisors.splice(i, 1, body);
          resolve(body);
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
 * Create supervisor
 * This can only be done by an administrator
 *
 * body Supervisor Created supervisor object
 * no response value expected for this operation
 **/
exports.postNewSupervisor = function (body) {
  return new Promise(function (resolve, reject) {
    if (supervisors.length === 0) {
      body.id = 1;
    } else {
      body.id = supervisors[supervisors.length - 1].id + 1;
    }
    if (body.id && body.role && body.name && body.firstName && body.lastName && body.department && body.email && body.username && body.password) {
      supervisors.push(body);
      resolve(supervisors);
    } else {
      reject();
    }
  });
}

