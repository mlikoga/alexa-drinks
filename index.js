const Alexa = require('ask-sdk-core');
const {
  CancelAndStopIntentHandler,
  ErrorHandler,
  HelpIntentHandler,
  IntentReflectorHandler,
  SessionEndedRequestHandler,
} = require('./intent-handlers/standard-handlers');
const LaunchRequestHandler = require('./intent-handlers/launch-request-handler');
const { DrinkRecipeIntentHandler, RandomDrinkIntentHandler } = require('./intent-handlers/drink-recipe-intent-handler');

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
    IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override
  )
  .addErrorHandlers(
    ErrorHandler,
  )
  .lambda();
