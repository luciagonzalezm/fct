'use strict';

var polls = [];


/**
 * Delete poll using ID
 * This can only be done by a supervisor
 *
 * pollId Long Poll ID to delete
 * no response value expected for this operation
 **/
exports.deletePollById = function (pollId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    polls.forEach((poll, i) => {
      if (poll.id === pollId) {
        found = true;
        polls.splice(i, 1);
        resolve(polls);
      }
    });

    if (found === false) {
      reject();
    }
  });
}


/**
 * Get poll by ID
 * This can be done by a supervisor
 *
 * pollId Long ID of poll to return
 * returns Poll
 **/
exports.getPollById = function (pollId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    polls.forEach(poll => {
      if (poll.id === pollId) {
        found = true;
        resolve(poll);
      }
    });

    if (found === false) {
      reject();
    }
  });
}


/**
 * Get all poll
 * This can be done by a supervisor
 *
 * returns Object
 **/
exports.getPolls = function () {
  return new Promise(function (resolve, reject) {
    resolve(polls);
  });
}


/**
 * Updated poll using ID
 * This can only be done by a supervisor
 *
 * pollId Long ID of poll that needs to be updated
 * body Poll Updated poll object
 * returns Poll
 **/
exports.modifyPollById = function (pollId, body) {
  return new Promise(function (resolve, reject) {
    var found = false;
    if (body.id && body.titulo && body.descripcion && body.preguntas) {
      polls.forEach((poll, i) => {
        if (poll.id === pollId) {
          found = true;
          polls.splice(i, 1, body);
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
 * Create poll
 * This can only be done by a supervisor
 *
 * body Poll Created poll object
 * no response value expected for this operation
 **/
exports.postNewPoll = function (body) {
  if (polls.length === 0) {
    body.id = 1;
  } else {
    body.id = polls[polls.length - 1].id + 1;
  }
  return new Promise(function (resolve, reject) {
    if (body.id && body.titulo && body.descripcion && body.preguntas) {
      polls.push(body);
      resolve(polls);
    } else {
      reject();
    }
  });
}

