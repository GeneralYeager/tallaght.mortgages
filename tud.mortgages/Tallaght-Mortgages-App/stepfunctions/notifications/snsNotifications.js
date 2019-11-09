'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// Create promise and SNS service object
const snsModule = new AWS.SNS({apiVersion: '2010-03-31'});

exports.handler = async (event, context) => {

    let params = event;
    try {
        // Create publish parameters
       /* var params = {
            Message: `Mortgage ${event.mortgageId} is now in status ${event.status}`,
            TopicArn: topicArn
        };
        */

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
            error: `Could not sent SNS notification [${params.Message}]`
        };
    }
};