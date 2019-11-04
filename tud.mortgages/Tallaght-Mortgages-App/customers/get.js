'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const customerModule = require("./dao/getCustomer.js")
//const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.get = async (event, context) => {
    

  /*  try {
        const customerId = event.pathParameters.id;

        var findCustomer = {
            Key: {
             "customerId": {
               S: event.pathParameters.id
              }
            },
            TableName: "CUSTOMER_TABLE"
          };
      
          const findCustomerResponse = await dynamoDb.getItem(findCustomer).promise();
          let foundCustomer = convertCustomerItemToHttpAPI(findCustomerResponse.Item)
          console.log(foundCustomer);
          return { statusCode: 200, body: JSON.stringify(foundCustomer) };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could not find the Customer: ${error.stack}`
        };
    }*/

    
    try {
        const foundCustomer = customerModule.getCustomer(event.pathParameters.id);

        return { statusCode: 200, body: JSON.stringify(foundCustomer) };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could not find the Customer: ${error.stack}`
        };
    }
};