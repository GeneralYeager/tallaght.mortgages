'use strict';

const AWS = require('aws-sdk');
//const stepTokenUtil = require("./utils/restartWorkflow.js");

const stepfunctions = new AWS.StepFunctions();
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const { STEP_FUNCTION_TABLE_NAME } = process.env;


exports.handler = async (event, context, callback) => {

    console.log('Event Body= ' + event.body);
    const brokerClarification = JSON.parse(event.body);

    try {

        var dbTokenParam = {
            TableName: STEP_FUNCTION_TABLE_NAME,
            Key: {
                'mortgageId': brokerClarification.mortgageId
            }
        };

        const tokenItem = await dynamoDB.get(dbTokenParam).promise();

       // return stepTokenUtil.restartWorkflow(decision.mortgageId, tokenItem.Item.stepFunctionToken, decision.action);
        const brokerClarResp = { 
                statusCode: 200,
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify("Mortgage has been clarified!")
        };
        
        if (typeof(tokenItem.Item) === "undefined" || tokenItem.Item == null) {
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify("Could not obtain the Step Function token from DynamoDB")
            };    
        } else {
            console.log(tokenItem);
            console.log(`Step Token=[${tokenItem.Item.stepFunctionToken}]`);

            await dynamoDB.delete(dbTokenParam).promise();


            const result = await stepfunctions.sendTaskSuccess({
                output: JSON.stringify(brokerClarResp),
                taskToken: tokenItem.Item.stepFunctionToken
            }).promise();
            console.log(brokerClarResp);
            return brokerClarResp;
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify("Could not obtain the Step Function token from DynamoDB")
        };
    }
}