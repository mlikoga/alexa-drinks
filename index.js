const Alexa = require('ask-sdk-core');
const Drink = require('drink');
const { HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, IntentReflectorHandler, ErrorHandler } = require('standard_handlers');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const greetings = [
            'Olá!',
            'Bem-vindo!',
            'Oi, esse é o bar de drinks!',
            'Olá, bem-vindo ao bar de drinks!'
        ];
        const questions = [
            'Qual drink você quer hoje?',
            'O que gostaria de beber hoje?',
            'Qual vai ser a bebida de hoje?',
            'Que drink vamos fazer?',
            'Tem algum drink em mente?'
        ];
        const speakOutput = buildRandomOutput(greetings, questions);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const DrinkRecipeIntentHandler = {
    canHandle(handlerInput) {
        return isIntent(handlerInput, 'DrinkRecipeIntent')
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
    }
};

const RandomDrinkIntentHandler = {
    canHandle(handlerInput) {
        return isIntent(handlerInput, 'RandomDrinkIntent')
    },
    handle(handlerInput) {
        const drink = getRandom(Drink.all());
        console.log(`RandomDrinkIntentHandler | drink: ${drink.name}`);

        const speakOutput = getDrinkInstructions(drink);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
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

function isIntent(handlerInput, intentName) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === intentName;
}

function buildRandomOutput(...sentencesLists) {
    return sentencesLists.reduce((speakOutput, sentenceList) => speakOutput + ' ' + getRandom(sentenceList), '');
}

function getRandom(list) {
    return list[Math.floor(Math.random()*list.length)];
}

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        DrinkRecipeIntentHandler,
        RandomDrinkIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
