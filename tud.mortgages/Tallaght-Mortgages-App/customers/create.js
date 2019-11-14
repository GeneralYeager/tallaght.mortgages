'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.create = async (event, context) => {

  const customerRequest = JSON.parse(event.body);
  if (typeof customerRequest.firstName !== 'string' || customerRequest.firstName == null ||
        typeof customerRequest.lastName !== 'string' || customerRequest.lastName == null ||
        typeof customerRequest.currentAddress1 !== 'string' || customerRequest.currentAddress1 == null ||
        typeof customerRequest.currentAddress2 !== 'string' || customerRequest.currentAddress2 == null ||
        typeof customerRequest.dob !== 'string' || customerRequest.dob== null ||
        typeof customerRequest.gender !== 'string' || customerRequest.gender == null
  ) {
    console.error('Customer Create Validation Failed');
    const errorResponse = {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { error : 'Couldn\'t create the new Customer. Not all required attributes were provided.' } )
    };
    return errorResponse;
  }


  const timestamp = new Date().getTime();

  try {
    const genIdResponse = await dynamoDb.updateItem({
        "TableName": "ID_GEN_TABLE",
        "ReturnValues": "UPDATED_NEW",
        "ExpressionAttributeValues": {
          ":incr":{"N":"1"}
        },
        "UpdateExpression": "SET idValue = idValue + :incr",
        "Key": {
          "idName": {
            "S": "CUSTOMER_ID_GEN"
          }
        }
      }
    ).promise();

    const newCustomerId = genIdResponse.Attributes.idValue.N;
    var newCustomer = {
      Item: {
       "customerId": {
         S: newCustomerId
        }, 
       "firstName": {
         S: customerRequest.firstName
        }, 
       "lastName": {
        S: customerRequest.lastName
        }, 
        "currentAddress1": {
         S: customerRequest.currentAddress1
        }, 
        "currentAddress2": {
         S: customerRequest.currentAddress2
        }, 
        "dob": {
         S: customerRequest.dob
        }, 
        "gender": {
         S: customerRequest.gender
        }
      }, 
      ReturnConsumedCapacity: "TOTAL", 
      TableName: "CUSTOMER_TABLE"
    };

    const newCustomerResponse = await dynamoDb.putItem(newCustomer).promise();
    return { statusCode: 200, body: JSON.stringify(newCustomerId) };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { error : `Could not obtain new Customer ID: ${error.stack}` } )
    };
  }
};