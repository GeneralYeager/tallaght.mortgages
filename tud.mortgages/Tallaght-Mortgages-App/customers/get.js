'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const customerModule = require("./dao/getCustomer.js")

exports.get = async (event, context) => {
    
    const customerId = event.pathParameters.id;
    try {
        const foundCustomer = await customerModule.getCustomer(customerId);
        if (foundCustomer == null) {
            return {
              statusCode: 400,
                error: `Could not find the Customer: ${customerId}`
            };
        }

        return { 
            statusCode: 200, 
            body: JSON.stringify(foundCustomer) 
        };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could not find the Customer: ${error.stack}`
        };
    }
};