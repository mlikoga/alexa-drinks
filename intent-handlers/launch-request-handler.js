const Alexa = require('ask-sdk-core');
const { buildRandomOutput } = require('./intent-utils');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const greetings = [
      'Olá!',
      'Bem-vindo!',
      'Oi, esse é o bar de drinks!',
      'Olá, bem-vindo ao bar de drinks!',
    ];
    const questions = [
      'Qual drink você quer hoje?',
      'O que gostaria de beber hoje?',
      'Qual vai ser a bebida de hoje?',
      'Que drink vamos fazer?',
      'Tem algum drink em mente?',
    ];
    const speakOutput = buildRandomOutput(greetings, questions);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

module.exports = LaunchRequestHandler;
