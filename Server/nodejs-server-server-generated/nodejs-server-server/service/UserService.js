'use strict';

var users = [
  {
    "firstName": "Fernández",
    "lastName": "Díaz",
    "password": "pabloF2021",
    "role": "user",
    "name": "Pablo",
    "id": 1,
    "department": 1,
    "email": "pablo.fernandez@viewnext.com",
    "username": "pablo"
  }
];

exports.users = users;


/**
 * Delete user using ID
 * This can only be done by a supervisor
 *
 * userId Long User ID to delete
 * no response value expected for this operation
 **/
exports.deleteUserById = function (userId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    users.forEach((user, i) => {
      if (user.id === userId) {
        found = true;
        users.splice(i, 1);
        resolve(users);
      }
    });
    if (found === false) {
      reject();
    }
  });
}


/**
 * Get user by ID
 * This can be done by an administrator, a supervisor or a user
 *
 * userId Long ID of user to return
 * returns User
 **/
exports.getUserById = function (userId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    users.forEach(user => {
      if (user.id === userId) {
        found = true;
        resolve(user);
      }
    });
    if (found === false) {
      reject();
    }
  });
}


/**
 * Get user by name
 * This can be done by an administrator, a supervisor or a user
 *
 * name String The name that needs to be fetched
 * returns User
 **/
exports.getUserByName = function (name) {
  return new Promise(function (resolve, reject) {
    var usersFind = [];
    var found = false;
    users.forEach(user => {
      if (user.name.toLowerCase() === name.toLowerCase()) {
        found = true;
        usersFind.push(user);
        resolve(usersFind);
      }
    });
    if (found === false) {
      reject();
    }
  });
}


/**
 * Get all user
 * This can be done by an administrator, a supervisor or a user
 *
 * returns Object
 **/
exports.getUsers = function () {
  return new Promise(function (resolve, reject) {
    resolve(users);
  });
}


/**
 * Updated user using ID
 * This can only be done by a supervisor or a user
 *
 * userId Long ID of user that needs to be updated
 * body User Updated user object
 * returns User
 **/
exports.modifyUserById = function (userId, body) {
  return new Promise(function (resolve, reject) {
    var found = false;
    if (body.id && body.role && body.name && body.firstName && body.lastName && body.department && body.email && body.username && body.password) {
      users.forEach((user, i) => {
        if (user.id === userId) {
          users.splice(i, 1, body);
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
 * Create user
 * This can only be done by a supervisor
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.postNewUser = function (body) {
  if (users.length === 0) {
    body.id = 1;
  } else {
    body.id = users[users.length - 1].id + 1;
  }
  return new Promise(function (resolve, reject) {
    if (body.id && body.role && body.name && body.firstName && body.lastName && body.department && body.email && body.username && body.password) {
      users.push(body);
      resolve(users);
    } else {
      reject();
    }
  });
}

