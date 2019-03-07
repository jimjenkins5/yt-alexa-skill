import { HandlerInput, SkillBuilders, ErrorHandler, RequestHandler } from 'ask-sdk-core';
import { Response, SessionEndedRequest } from 'ask-sdk-model';
import { Congregation } from './db';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';

async function getCount(): Promise<number> {
   const response = await Congregation.findAndCountAll();

   return response.count;
}

const congregationCountIntentHandler: RequestHandler = {
   canHandle(handlerInput: HandlerInput): boolean {
      return (handlerInput.requestEnvelope.request.type === 'LaunchRequest')
         || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'CongregationCountIntent');
   },
   async handle(handlerInput: HandlerInput) {
      const count: number = await getCount(),
            speechText = `There are currently ${count} active congregations on your territories dot com.`;

      return handlerInput.responseBuilder
         .speak(speechText)
         .getResponse();
   },
};

const helpIntentHandler: RequestHandler = {
   canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
         && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
   },
   handle(handlerInput: HandlerInput): Response {
      const speechText = 'Just ask me for the congregation count and I\'ll give it to you';

      return handlerInput.responseBuilder
         .speak(speechText)
         .reprompt(speechText)
         .getResponse();
   },
};

const cancelAndStopIntentHandler: RequestHandler = {
   canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
         && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
   },
   handle(handlerInput: HandlerInput): Response {
      const speechText = 'Goodbye!';

      return handlerInput.responseBuilder
         .speak(speechText)
         .getResponse();
   },
};

const sessionEndedRequestHandler: RequestHandler = {
   canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
   },
   handle(handlerInput: HandlerInput): Response {
      const request: SessionEndedRequest = handlerInput.requestEnvelope.request as SessionEndedRequest;

      console.log(`Session ended with reason: ${request.reason}`);

      return handlerInput.responseBuilder.getResponse();
   },
};

const errorHandler: ErrorHandler = {
   canHandle(): boolean {
      return true;
   },
   handle(handlerInput: HandlerInput, error: Error): Response {
      console.log(`Error handled: ${error.message}`);

      return handlerInput.responseBuilder
         .speak('Sorry, I can\'t understand the command. Please say again.')
         .reprompt('Sorry, I can\'t understand the command. Please say again.')
         .getResponse();
   },
};

const skillBuilder = SkillBuilders.custom();

skillBuilder.addRequestHandlers(
   congregationCountIntentHandler,
   helpIntentHandler,
   cancelAndStopIntentHandler,
   sessionEndedRequestHandler
);

skillBuilder.addErrorHandlers(errorHandler);

export const handle: LambdaHandler = (request, context, callback): void => {
   // We don't want to have to open and close the DB connection every time this function
   // is invoked. It's much faster to leave the connection open if this container is
   // reused. However, if Sequelize leaves the connection open, Lambda will never end the
   // function and we will always timeout. So we tell Lambda not to wait for the event
   // loop to complete before returning.
   context.callbackWaitsForEmptyEventLoop = false;

   // set up the skill with the new context
   return skillBuilder.lambda()(request, context, callback);
};
