'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// Create promise and SNS service object
const snsModule = new AWS.SNS({apiVersion: '2010-03-31'});

exports.handler = async (event, context) => {

    try {
       
        return {
            hello: event.statusCode
        };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could not find the Mortgage: ${error.stack}`
        };
    }
};