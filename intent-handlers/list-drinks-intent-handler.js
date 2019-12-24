const { arrayToString, buildRandomOutput, isIntent } = require('./intent-utils');
const Drink = require('../drink');

const ListDrinksIntentHandler = {
  canHandle(handlerInput) {
    return isIntent(handlerInput, 'ListDrinksIntent');
  },
  handle(handlerInput) {
    console.log('ListDrinksIntentHandler | invoked');
    const drinks = Drink.all().map(drink => drink.name);

    const firstSentences = [
      'Temos: ',
      'Atualmente conheço: ',
    ];

    const secondSentences = [
      `<prosody rate="fast">${arrayToString(drinks)}.</prosody>`,
    ];

    const finishSentences = [
      'Qual você gostaria de fazer hoje?',
      'Qual você vai querer hoje?',
      'Qual deles você ficou com vontade?',
    ];

    const speakOutput = `<speak>${buildRandomOutput(firstSentences, secondSentences, finishSentences)}</speak>`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(buildRandomOutput(finishSentences))
      .getResponse();
  },
};

module.exports = ListDrinksIntentHandler;
