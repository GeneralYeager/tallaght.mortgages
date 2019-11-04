'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const customerDAO = require("../../customers/dao/customer.js");

exports.handler = async (event, context) => {

    const customerId = event.customerId;
    try {
        const foundCustomer = await customerDAO.findCustomerByPK(customerId);
        if (foundCustomer == null) {
            return {
                statusCode: 400,
                error: `Could not find the Customer: ${foundCustomer}`
            };
        }

        return { 
            statusCode: 200, 
            customer: foundCustomer
        };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could not find the Customer: ${error.stack}`
        };
    }
};