'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// Create promise and SNS service object
const snsModule = new AWS.SNS({apiVersion: '2010-03-31'});
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const { TABLE_NAME, WEBSOCKET_ENDPOINT } = process.env;

exports.handler = async (event, context) => {

    let params = event;
  /*  let params = event;
    try {
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
    }*/

    try {
        // Create promise and SNS service object
        var data = await snsModule.publish(params).promise();
        console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);

    } catch (error) {
        return {
            statusCode: 500,
            error: `Could not sent SNS notification [${params.Message}]. Error[${error.stack}]`
        };
    }

    try {
        connectionData = await ddb.scan({ TableName: TABLE_NAME, ProjectionExpression: 'connectionId' }).promise();
     
        const apigwManagementApi = new AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: WEBSOCKET_ENDPOINT //event.requestContext.domainName + '/' + event.requestContext.stage
        });
      
        //const postData = JSON.parse(event.body).data;
        //const postData = '{\"author\": \"1212121", \"message\": \"Mortgage 1212121 is now Auto Approved"}';
      
        const postCalls = connectionData.Items.map(async ({ connectionId }) => {
            try {
                await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: /*postData*/params }).promise();
            } catch (e) {
              if (e.statusCode === 410) {
                    console.log(`Found stale connection, deleting ${connectionId}`);
                    await ddb.delete({ TableName: TABLE_NAME, Key: { connectionId } }).promise();
                } else {
                    throw e;
                }
            }
        });
        
        try {
            await Promise.all(postCalls);
        } catch (e) {
            return { statusCode: 500, body: e.stack };
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            error: `Could not sent Websocket notification [${params.Message}]. Error[${error.stack}]`
        };
    }

    return { 
        statusCode: 200//,
       // messageId: data.MessageId
    };
};