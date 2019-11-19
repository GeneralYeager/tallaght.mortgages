const AWS = require('aws-sdk');

const snsModule = new AWS.SNS({apiVersion: '2010-03-31'});

exports.lambda_handler = (event, context, callback) => {

    try {
       
        console.log('event= ' + JSON.stringify(event));
        console.log('context= ' + JSON.stringify(context));
    
        const executionContext = event.ExecutionContext;
        console.log('executionContext= ' + executionContext);
    
        const executionName = executionContext.Execution.Name;
        console.log('executionName= ' + executionName);
    
        const statemachineName = executionContext.StateMachine.Name;
        console.log('statemachineName= ' + statemachineName);
    
        const taskToken = executionContext.Task.Token;
        console.log('taskToken= ' + taskToken);
    
        const apigwEndpint = event.APIGatewayEndpoint;
        console.log('apigwEndpint = ' + apigwEndpint)
    
        const approveEndpoint = apigwEndpint + "/execution?action=approve&ex=" + executionName + "&sm=" + statemachineName + "&taskToken=" + encodeURIComponent(taskToken);
        console.log('approveEndpoint= ' + approveEndpoint);
    
        const rejectEndpoint = apigwEndpint + "/execution?action=reject&ex=" + executionName + "&sm=" + statemachineName + "&taskToken=" + encodeURIComponent(taskToken);
        console.log('rejectEndpoint= ' + rejectEndpoint);
    
        const emailSnsTopic = "${SNSHumanApprovalEmailTopic}";
        console.log('emailSnsTopic= ' + emailSnsTopic);
    
        emailMessage += 'This is an email requesting that the Underwriter perform a review of the Mortgage Application. \n\n'
        emailMessage += 'Please check the following information and click "Approve" link if you want to approve. \n\n'
        emailMessage += 'Execution Name -> ' + executionName + '\n\n'
        emailMessage += 'Approve ' + approveEndpoint + '\n\n'
        emailMessage += 'Reject ' + rejectEndpoint + '\n\n'
    
        var params = {
            Message: emailMessage,
            Subject: "Underwriting Decision required for Mortgage [].",
            TopicArn: emailSnsTopic
        };
        
        // Create promise and SNS service object
        var data = await snsModule.publish(params).promise();
        console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
     
        return { 
            statusCode: 200,
            messageId: data.MessageId
        };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could not send the SNS notification: ${error.stack}`
        };
    }
}