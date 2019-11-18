'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const customerDAO = require("./dao/customer.js")

exports.get = async (event, context) => {
    
    const customerId = event.pathParameters.id;
    try {
        const foundCustomer = await customerDAO.findCustomerByPK(customerId);
        if (foundCustomer == null) {
            return {
              statusCode: 400,
              headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
              body: JSON.stringify( { error : `Could not find the Customer: ${customerId}` } )
            };
        }

        return { 
            statusCode: 200, 
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(foundCustomer) 
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify( { error : `Could not find the Customer: ${error.stack}` } )
        };
    }
};