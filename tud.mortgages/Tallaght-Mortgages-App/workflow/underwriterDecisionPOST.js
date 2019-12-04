'use strict';

const AWS = require('aws-sdk');
const stepTokenUtil = require("./utils/restartWorkflow.js");

const stepfunctions = new AWS.StepFunctions();
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

//const { STEP_FUNCTION_TABLE_NAME, CLARIFICATION_TABLE_NAME } = process.env;
const { STEP_FUNCTION_TABLE_NAME } = process.env;

exports.handler = async (event, context, callback) => {

    //console.log('Event= ' + JSON.stringify(event));
    
    //console.log('Event= ' + JSON.parse(event.body));
    console.log('Event Body= ' + event.body);
    const decision = JSON.parse(event.body);

//    const action = event.queryStringParameters.action;
  //  const taskToken = event.queryStringParameters.taskToken;
    //const statemachineName = event.queryStringParameters.sm;
    //const executionName = event.queryStringParameters.ex;
    //const mortgageId = event.queryStringParameters.mortgageId;
    try {
        
     /*   if (decision.action == "clarify") {
            var clarParam = {
                TableName: CLARIFICATION_TABLE_NAME,
                Item: {
                    'mortgageId': decision.mortgageId,
                    'clarificationText': decision.clarification
                }
            };   
            await dynamoDB.put(clarParam).promise();
        }
*/
        var dbTokenParam = {
            TableName: STEP_FUNCTION_TABLE_NAME,
            Key: {
                'mortgageId': decision.mortgageId
            }
        };

        const tokenItem = await dynamoDB.get(dbTokenParam).promise();
        console.log(tokenItem);
        console.log(`Step Token=[${tokenItem.Item.stepFunctionToken}]`);

        await dynamoDB.delete(dbTokenParam).promise();


        return stepTokenUtil.restartWorkflow(decision.mortgageId, tokenItem.Item.stepFunctionToken, decision.action);
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            error: `Could not obtain the Step Function token from DynamoDB [${error}]`
        };
    }
}