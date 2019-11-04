'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// var exports = module.exports = {};

exports.findCustomerByPK = async function (customerId) {

    try {
        var findCustomer = {
            Key: {
             "customerId": {
               S: customerId
              }
            },
            TableName: "CUSTOMER_TABLE"
          };
      
          const findCustomerResponse = await dynamoDb.getItem(findCustomer).promise();

          if (Object.entries(findCustomerResponse).length === 0 && findCustomerResponse.constructor === Object) {
              return null;
          }
          
          let foundCustomer = convertCustomerItemToHttpAPI(findCustomerResponse.Item)
          return foundCustomer;

    } catch (error) {
        console.log(error);
        return null;
    }
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
