'use strict';

const AWS = require('aws-sdk');
const stepTokenUtil = require("./utils/restartWorkflow.js");

const stepfunctions = new AWS.StepFunctions();
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const { STEP_FUNCTION_TABLE_NAME } = process.env;

exports.handler = async (event, context, callback) => {

    //console.log('Event= ' + JSON.stringify(event));
    
    console.log('Event= ' + JSON.stringify(event.queryStringParameters));
    const action = event.queryStringParameters.action;
    const taskToken = event.queryStringParameters.taskToken;
    //const statemachineName = event.queryStringParameters.sm;
    //const executionName = event.queryStringParameters.ex;
    const mortgageId = event.queryStringParameters.mortgageId;

    var dbTokenParam = {
        TableName: STEP_FUNCTION_TABLE_NAME,
        Key: {
            'mortgageId': mortgageId
        }
    };

    const response = stepTokenUtil.restartWorkflow(mortgageId, taskToken, action);

    await dynamoDB.delete(dbTokenParam).promise();
    console.log(`Step Token Deleted=[${taskToken}]`);

    return response;
}
