'use strict';

var questions = [];


/**
 * Delete question using ID
 * This can only be done by a supervisor
 *
 * questionId Long Question ID to delete
 * no response value expected for this operation
 **/
exports.deleteQuestionById = function (questionId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    questions.forEach((question, i) => {
      if (question.id === questionId) {
        found = true;
        questions.splice(i, 1);
        resolve(questions);
      }
    });

    if (found === false) {
      reject();
    }
  });
}


/**
 * Get question by ID
 * This can be done by a supervisor
 *
 * questionId Long ID of question to return
 * returns Question
 **/
exports.getQuestionById = function (questionId) {
  return new Promise(function (resolve, reject) {
    var found = false;
    questions.forEach(question => {
      if (question.id === questionId) {
        found = true;
        resolve(question);
      }
    });

    if (found === false) {
      reject();
    }
  });
}


/**
 * Get all question
 * This can be done by a supervisor
 *
 * returns Object
 **/
exports.getQuestions = function () {
  return new Promise(function (resolve, reject) {
    resolve(questions);
  });
}


/**
 * Updated question using ID
 * This can only be done by a supervisor
 *
 * questionId Long ID of question that needs to be updated
 * body Question Updated question object
 * returns Question
 **/
exports.modifyQuestionById = function (questionId, body) {
  return new Promise(function (resolve, reject) {
    var found = false;
    if (body.id && body.enunciado && body.respuesta1 && body.respuesta2 && body.respuesta3) {
      questions.forEach((question, i) => {
        if (question.id === questionId) {
          found = true;
          questions.splice(i, 1, body);
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
 * Create question
 * This can only be done by a supervisor
 *
 * body Question Created question object
 * no response value expected for this operation
 **/
exports.postNewQuestion = function (body) {
  return new Promise(function (resolve, reject) {
    if (body.id && body.enunciado && body.respuesta1 && body.respuesta2 && body.respuesta3) {
      questions.push(body);
      resolve(questions);
    } else {
      reject();
    }
  });
}

