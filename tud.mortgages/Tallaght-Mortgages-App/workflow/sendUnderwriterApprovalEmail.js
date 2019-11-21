const AWS = require('aws-sdk');

const snsModule = new AWS.SNS({apiVersion: '2010-03-31'});

const { UNDERWRITER_DECISION_API, UNDERWRITER_TOPIC_ARN } = process.env;

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
    
        const apigwEndpint = UNDERWRITER_DECISION_API;//event.APIGatewayEndpoint;
        console.log('apigwEndpint = ' + apigwEndpint);
    
/*        const approveEndpoint = apigwEndpint + "/execution?action=approve&ex=" + executionName + "&sm=" + statemachineName + "&taskToken=" + encodeURIComponent(taskToken);
        console.log('approveEndpoint= ' + approveEndpoint);
    
        const rejectEndpoint = apigwEndpint + "/execution?action=reject&ex=" + executionName + "&sm=" + statemachineName + "&taskToken=" + encodeURIComponent(taskToken);
        console.log('rejectEndpoint= ' + rejectEndpoint);
*/
        //const approveEndpoint = apigwEndpint + "?action=approve&ex=" + executionName + "&sm=" + statemachineName + "&taskToken=" + encodeURIComponent(taskToken);
        const approveEndpoint = apigwEndpint + "?action=approve&mortgageId=" + mortgage.mortgageId + "&taskToken=" + encodeURIComponent(taskToken);
        console.log('approveEndpoint= ' + approveEndpoint);

        const rejectEndpoint = apigwEndpint + "?action=reject&mortgageId=" + mortgage.mortgageId + "&taskToken=" + encodeURIComponent(taskToken);
        console.log('rejectEndpoint= ' + rejectEndpoint);


        const emailSnsTopic = UNDERWRITER_TOPIC_ARN;//"${SNSHumanApprovalEmailTopic}";
        console.log('emailSnsTopic= ' + emailSnsTopic);
    
        let emailMessage = `This is an email requesting that the Underwriter perform a review of the Mortgage Application [${mortgage.mortgageId}]. \n\n`;
        emailMessage += 'Please check the following information and click "Approve" link if you want to approve. \n\n';
        emailMessage += 'Execution Name -> ' + executionName + '\n\n';
        emailMessage += 'Approve ' + approveEndpoint + '\n\n';
        emailMessage += 'Reject ' + rejectEndpoint + '\n\n';
    
        var params = {
            Message: emailMessage,
            Subject: `Underwriting Decision required for Mortgage [${mortgage.mortgageId}].`,
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