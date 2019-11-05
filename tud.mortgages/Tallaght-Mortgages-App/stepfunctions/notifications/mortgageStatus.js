'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// Create promise and SNS service object
const snsModule = new AWS.SNS({apiVersion: '2010-03-31'});

exports.handler = async (event, context) => {

    try {
       
        let topicArn = process.env.UNDERWRITER_TOPIC_ARN;
        if (event.status == 'Rejected' || event.status == 'Approved' || event.status == 'Clarification Requested')
            topicArn = process.env.BROKER_TOPIC_ARN;

        // Create publish parameters
        var params = {
            Message: `Mortgage ${event.mortgageId} is now in status ${event.status}`,
            TopicArn: topicArn
        };
    
        // Create promise and SNS service object
        var data = await snsModule.publish(params).promise();
        console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);

        return { 
            statusCode: 200
        };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could not find the Mortgage: ${error.stack}`
        };
    }
};