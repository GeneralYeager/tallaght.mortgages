'use strict';

const AWS = require('aws-sdk');
/*
var redirectToStepFunctions = function(lambdaArn, statemachineName, executionName, callback) {
  const lambdaArnTokens = lambdaArn.split(":");
  const partition = lambdaArnTokens[1];
  const region = lambdaArnTokens[3];
  const accountId = lambdaArnTokens[4];

  console.log("partition=" + partition);
  console.log("region=" + region);
  console.log("accountId=" + accountId);

  const executionArn = "arn:" + partition + ":states:" + region + ":" + accountId + ":execution:" + statemachineName + ":" + executionName;
  console.log("executionArn=" + executionArn);

  const url = "https://console.aws.amazon.com/states/home?region=" + region + "#/executions/details/" + executionArn;
  callback(null, {
      statusCode: 302,
      headers: {
        Location: url
      }
  });
};
*/

const stepfunctions = new AWS.StepFunctions();

exports.handler = async (event, context, callback) => {

    console.log('Event= ' + JSON.stringify(event));
    const action = event.query.action;
    const taskToken = event.query.taskToken;
    const statemachineName = event.query.sm;
    const executionName = event.query.ex;

    try {
        
        var message = "";
        if (action === "approve") {
            message = { "Status": "Approved! Task approved by Underwriter" };
        } else if (action === "reject") {
            message = { "Status": "Rejected! Task rejected by Underwriter" };
        } else {
            console.error("Unrecognized action. Expected: approve, reject.");
            callback({"Status": "Failed to process the request. Unrecognized Action."});
        }

        const result = await stepfunctions.sendTaskSuccess({
                output: JSON.stringify(message),
                taskToken: taskToken
            }).promise();

        console.log(JSON.stringify(result));
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(message)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            error: `Could not restart the Step Function excution [${executionName}]`
        };
    }
}
