const { buildRandomOutput, isIntent, getRandom } = require('./intent-utils');
const Drink = require('../drink');

const DrinkRecipeIntentHandler = {
  canHandle(handlerInput) {
    return isIntent(handlerInput, 'DrinkRecipeIntent');
  },
  handle(handlerInput) {
    const drinkName = handlerInput.requestEnvelope.request.intent.slots.drink.value;
    console.log('DrinkRecipeIntentHandler | drinkName', drinkName);
    const drink = Drink.find(drinkName);

    if (drink) {
      const speakOutput = getDrinkInstructions(drink);
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    }

    const speakOutput = 'Qual drink você quer?';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const RandomDrinkIntentHandler = {
  canHandle(handlerInput) {
    return isIntent(handlerInput, 'RandomDrinkIntent');
  },
  handle(handlerInput) {
    const drink = getRandom(Drink.all());
    console.log(`RandomDrinkIntentHandler | drink: ${drink.name}`);

    const speakOutput = getDrinkInstructions(drink);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

function getDrinkInstructions(drink) {
  const singleSentences = [
    `Para fazer ${drink.nameWithIndefinite} você vai precisar de ${drink.description}`,
    `Para ${drink.nameWithDefinite} precisamos de ${drink.description}`,
  ];
  const firstSentences = [
    `Opa, adoro ${drink.name}!`,
    `Hmm, sempre bebo ${drink.name}.`,
    `${drink.name} é dos meus preferidos!`,
  ];
  const secondSentences = [
    `É feit${drink.definiteArticle} com ${drink.description}`,
    `${drink.description} é tudo que precisamos.`,
    `Vamos precisar de ${drink.description}.`,
  ];

  let speakOutput;
  if (Math.random() < 0.2) {
    speakOutput = getRandom(singleSentences);
  } else {
    speakOutput = buildRandomOutput(firstSentences, secondSentences);
  }

  return speakOutput;
}

module.exports.DrinkRecipeIntentHandler = DrinkRecipeIntentHandler;
module.exports.RandomDrinkIntentHandler = RandomDrinkIntentHandler;
