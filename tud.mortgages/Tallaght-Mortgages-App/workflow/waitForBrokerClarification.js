const AWS = require('aws-sdk');

const snsModule = new AWS.SNS({apiVersion: '2010-03-31'});
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

//const notificationUtil = require('../stepfunctions/notifications/utils/notificationUtils');

const { STEP_FUNCTION_TABLE_NAME } = process.env;

exports.handler = async (event, context, callback) => {

    try {       
        //console.log('event= ' + JSON.stringify(event));
        const mortgage = event.mortgage;
        console.log('mortgage= ' + JSON.stringify(mortgage));

        const executionContext = event.ExecutionContext;
        console.log('executionContext= ' + executionContext);
    
        const executionName = executionContext.Execution.Name;
        console.log('executionName= ' + executionName);
    
        const statemachineName = executionContext.StateMachine.Name;
        console.log('statemachineName= ' + statemachineName);
    
        const taskToken = executionContext.Task.Token;
        console.log('taskToken= ' + taskToken);
    
 

        var dbTokenParam = {
            TableName: STEP_FUNCTION_TABLE_NAME,
            Item: {
                'mortgageId': mortgage.mortgageId,
                'stepFunctionToken': taskToken
            }
        };

        await dynamoDB.put(dbTokenParam).promise();

        return { 
            statusCode: 200,
        //    messageId: data.MessageId
        };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could not send the SNS notification: ${error.stack}`
        };
    }
}