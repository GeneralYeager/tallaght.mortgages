'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// var exports = module.exports = {};

exports.getCustomer = async function (customerId) {
   /* return {
        firstName: "Alna",
        lastName: "Duffin"

    };*/
    //try {
        //const customerId = event.pathParameters.id;

        var findCustomer = {
            Key: {
             "customerId": {
               //S: event.pathParameters.id
               S: customerId
              }
            },
            TableName: "CUSTOMER_TABLE"
          };
      
          const findCustomerResponse = await dynamoDb.getItem(findCustomer).promise();
          let foundCustomer = convertCustomerItemToHttpAPI(findCustomerResponse.Item)
          console.log(foundCustomer);
          //return { statusCode: 200, body: JSON.stringify(foundCustomer) };
          return foundCustomer;
    //} catch (error) {
      /*  return {
            statusCode: 400,
            error: `Could not find the Customer: ${error.stack}`
        };
    }*/
};

function convertCustomerItemToHttpAPI(customerItem) {
    let foundCustomer = {};

    foundCustomer.lastName = customerItem.lastName.S;
    foundCustomer.dob = customerItem.dob.S;
    foundCustomer.currentAddress2 = customerItem.currentAddress2.S;
    foundCustomer.currentAddress1 = customerItem.currentAddress1.S;
    foundCustomer.firstName = customerItem.firstName.S;
    foundCustomer.gender = customerItem.gender.S;
    foundCustomer.customerId = customerItem.customerId.S;
    foundCustomer.dob = customerItem.dob.S;                
  
    return foundCustomer;
};
