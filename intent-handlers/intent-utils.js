const Alexa = require('ask-sdk-core');

function isIntent(handlerInput, intentName) {
  return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === intentName;
}

function arrayToString(array) {
  return array
    .join(', ')
    .replace(/, ([^,]*)$/, ' e $1');
}

function buildRandomOutput(...sentencesLists) {
  return sentencesLists.reduce((speakOutput, sentenceList) => `${speakOutput} ${getRandom(sentenceList)}`, '');
}

function getRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

exports.isIntent = isIntent;
exports.arrayToString = arrayToString;
exports.buildRandomOutput = buildRandomOutput;
exports.getRandom = getRandom;
