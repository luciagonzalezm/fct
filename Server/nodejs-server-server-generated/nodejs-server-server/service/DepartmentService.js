'use strict';

var departments = [
  {
    "createBy": 1,
    "name": "DP-BTS-CT - EXPERIENCE DESIGN & MOBILE",
    "id": 1,
    "numEmpleados": 5
  }
];


/**
 * Delete department using ID
 * This can only be done by an administrator
 *
 * departmentId Long Department ID to delete
 * no response value expected for this operation
 **/
exports.deleteDepartmentById = function (departmentId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    departments.forEach((department, i) => {
      if (department.id === departmentId) {
        found = true;
        departments.splice(i, 1);
        resolve(departments);
      }
    });
    if (found === false) {
      reject();
    }
  });
}


/**
 * Get department by ID
 * This can only be done by an administrator
 *
 * departmentId Long ID of department to return
 * returns Department
 **/
exports.getDepartmentById = function (departmentId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    departments.forEach(departament => {
      if (departament.id === departmentId) {
        found = true;
        resolve(departament);
      }
    });
    if (found === false) {
      reject();
    }
  });
}


/**
 * Get department by name
 * This can only be done by an administrator
 *
 * name String The name that needs to be fetched
 * returns Department
 **/
exports.getDepartmentByName = function (name) {
  return new Promise(function (resolve, reject) {
    var departmentsFind = [];
    var found = false;
    departments.forEach(department => {
      if (department.name.toLowerCase() === name.toLowerCase()) {
        found = true;
        departmentsFind.push(department);
        resolve(departmentsFind);
      }
    });
    if (found === false) {
      reject();
    }
  });
}


/**
 * Get all departments
 * This can only be done by an administrator
 *
 * returns Object
 **/
exports.getDepartments = function () {
  return new Promise(function (resolve, reject) {
    resolve(departments);
  });
}


/**
 * Updated department using ID
 * This can only be done by an administrator
 *
 * departmentId Long ID of department that needs to be updated
 * body Department Updated department object
 * returns Department
 **/
exports.modifyDepartmentById = function (departmentId, body) {
  return new Promise(function (resolve, reject) {
    var found = false;
    if (body.createBy && body.name && body.id) {
      departments.forEach((department, i) => {
        if (department.id === departmentId) {
          found = true;
          departments.splice(i, 1, body);
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
 * Create department
 * This can only be done by an administrator
 *
 * body Department Created department object
 * no response value expected for this operation
 **/
exports.postNewDepartment = function (body) {
  return new Promise(function (resolve, reject) {
    if (departments.length === 0) {
      body.id = 1;
    } else {
      body.id = departments[departments.length - 1].id + 1;
    }
    if (body.createBy && body.name && body.id) {
      departments.push(body);
      resolve(departments);
    } else {
      reject();
    }
  });
}

