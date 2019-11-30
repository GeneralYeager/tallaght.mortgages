'use strict';

const AWS = require('aws-sdk');

const stepfunctions = new AWS.StepFunctions();

exports.restartWorkflow = async function (mortgageId, taskToken, action) {

    try {
        
        let decision;
        if (action === "approve") {
            decision = { 
                statusCode: 200,
                Status: `Mortgage [${mortgageId}] Approved!` 
            };
        } else if (action === "reject") {
            decision = { 
                statusCode: 500,
                Status: `Mortgage [${mortgageId}] Rejected!` 
            };
        } else {
            console.error("Unrecognized action. Expected: approve, reject.");
            callback({"Status": "Failed to process the request. Unrecognized Action."});
        }

        const result = await stepfunctions.sendTaskSuccess({
            output: JSON.stringify(decision),
            taskToken: taskToken
        }).promise();

        console.log(JSON.stringify(result));
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(decision.Status)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            error: `Could not restart the Step Function excution [${error}]`
        };
    }
}
