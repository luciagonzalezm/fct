'use strict';

var administrators = [
  {
    "firstName": "González",
    "lastName": "Martín",
    "password": "luciaG2021",
    "role": "administrator",
    "name": "Lucía",
    "id": 1,
    "department": 1,
    "email": "lucia.gonzalez@viewnext.com",
    "username": "lucia"
  },
  {
    "firstName": "Vega",
    "lastName": "Calzado",
    "password": "albaV2021",
    "role": "administrator",
    "name": "Alba",
    "id": 2,
    "department": 1,
    "email": "alba.vega@viewnext.com",
    "username": "alba"
  },
  {
    "firstName": "Consuegra",
    "lastName": "Rosa",
    "password": "antonioC2021",
    "role": "administrator",
    "name": "Antonio",
    "id": 3,
    "department": 1,
    "email": "antonio.consuegra@viewnext.com",
    "username": "antonio"
  }
];

exports.administrators = administrators;


/**
 * Delete administrator using ID
 * This can only be done by an administrator
 *
 * administratorId Long Administrator ID to delete
 * no response value expected for this operation
 **/
exports.deleteAdministratorById = function (administratorId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    administrators.forEach((administrator, i) => {
      if (administrator.id === administratorId) {
        found = true;
        administrators.splice(i, 1);
        resolve(administrators);
      }
    });

    if (found === false) {
      reject();
    }
  });
}


/**
 * Get administrator by ID
 * This can only be done by an administrator
 *
 * administratorId Long ID of administrator to return
 * returns Administrator
 **/
exports.getAdministratorById = function (administratorId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    administrators.forEach(administrator => {
      if (administrator.id === administratorId) {
        found = true;
        resolve(administrator);
      }
    });

    if (found === false) {
      reject();
    }
  });
}


/**
 * Get administrator by name
 * This can only be done by an administrator
 *
 * name String The name that needs to be fetched
 * returns Administrator
 **/
exports.getAdministratorByName = function (name) {
  return new Promise(function (resolve, reject) {
    var administratorsFind = [];
    var found = false;
    administrators.forEach(administrator => {
      if (administrator.name.toLowerCase() === name.toLowerCase()) {
        found = true;
        administratorsFind.push(administrator);
        resolve(administratorsFind);
      }
    });

    if (found === false) {
      reject();
    }
  });
}


/**
 * Get all administrator
 * This can only be done by an administrator
 *
 * returns Object
 **/
exports.getAdministrators = function () {
  return new Promise(function (resolve, reject) {
    resolve(administrators);
  });
}


/**
 * Updated administrator using ID
 * This can only be done by an administrator
 *
 * administratorId Long ID of administrator that needs to be updated
 * body Administrator Updated administrator object
 * returns Administrator
 **/
exports.modifyAdministratorById = function (administratorId, body) {
  return new Promise(function (resolve, reject) {
    var found = false;
    if (body.id && body.role && body.name && body.firstName && body.lastName && body.department && body.email && body.username && body.password) {
      administrators.forEach((administrator, i) => {
        if (administrator.id === administratorId) {
          found = true;
          administrators.splice(i, 1, body);
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
 * Create administrator
 * This can only be done by an administrator
 *
 * body Administrator Created administrator object
 * no response value expected for this operation
 **/
exports.postNewAdministrator = function (body) {
  return new Promise(function (resolve, reject) {
    if (administrators.length === 0) {
      body.id = 1;
    } else {
      body.id = administrators[administrators.length - 1].id + 1;
    }
    if (body.id && body.role && body.name && body.firstName && body.lastName && body.department && body.email && body.username && body.password) {
      administrators.push(body);
      resolve(administrators);
    } else {
      reject();
    }
  });
}
