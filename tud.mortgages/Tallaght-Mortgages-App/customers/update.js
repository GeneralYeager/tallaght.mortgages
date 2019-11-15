'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.update = async (event, context) => {
  const timestamp = new Date().getTime();

  const customerId = event.pathParameters.id;

  const customerRequest = JSON.parse(event.body);
  if (typeof customerRequest.firstName !== 'string' || customerRequest.firstName == null ||
        typeof customerRequest.lastName !== 'string' || customerRequest.lastName == null ||
        typeof customerRequest.currentAddress1 !== 'string' || customerRequest.currentAddress1 == null ||
        typeof customerRequest.currentAddress2 !== 'string' || customerRequest.currentAddress2 == null ||
        typeof customerRequest.dob !== 'string' || customerRequest.dob== null ||
        typeof customerRequest.gender !== 'string' || customerRequest.gender == null
  ) {
    console.error('Customer Update Validation Failed');
    const errorResponse = {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify( { error : `Could not update the Customer: ${customerId}. Incomplete information was provided.` } )   };
    return errorResponse;
  }

  try {
    
    var newCustomer = {
     TableName: "CUSTOMER_TABLE",
      Key: {
       "customerId": {
         S: customerId
        }
      },
      ExpressionAttributeNames: {
        "#A": "firstName",
        "#B": "lastName",
        "#C": "currentAddress1",
        "#D": "currentAddress2",
        "#E": "dob",
        "#F": "gender",
      }, 
      UpdateExpression: "set #A = :a, #B = :b, #C = :c, #D = :d, #E = :e, #F = :f",
      ExpressionAttributeValues: {
        ":a": { "S": customerRequest.firstName },
        ":b": { "S": customerRequest.lastName },
        ":c": { "S": customerRequest.currentAddress1 },
        ":d": { "S": customerRequest.currentAddress2 },
        ":e": { "S": customerRequest.dob },
        ":f": { "S": customerRequest.gender }
      },
      ReturnValues: "ALL_NEW"
    };

    const updatedCustomerResponse = await dynamoDb.updateItem(newCustomer).promise();
    const updatedCustomer = convertCustomerItemToHttpAPI(updatedCustomerResponse.Attributes);
    return { 
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(updatedCustomer)
    };
    
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify( { error : `Could not update the Customer: ${customerId}. Error [${error.stack}].` } )
    };
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