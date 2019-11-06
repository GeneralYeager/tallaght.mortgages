'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const uuid = require("uuid/v4");

const stepfunctions = new AWS.StepFunctions();

exports.handler = async (event, context) => {

    try {
        const workflowArn = process.env.MORTGAGE_WORKFLOW_ARN;

        // Start the workflow
        var params = {
            "input": event.body,
            "name": uuid(),
            "stateMachineArn": workflowArn
        }

        const workflowExecution = await stepfunctions.startExecution(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(workflowExecution)
        };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could not find the Mortgage: ${error.stack}`
        };
    }
};