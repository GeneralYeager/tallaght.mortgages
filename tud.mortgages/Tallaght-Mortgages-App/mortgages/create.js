
'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.create = async (event, context) => {

  const mortgageRequest = JSON.parse(event.body);
  if (typeof mortgageRequest.loanAmount !== 'string' || mortgageRequest.loanAmount == null ||
        typeof mortgageRequest.yearsInEmployment !== 'string' || mortgageRequest.yearsInEmployment == null ||
        typeof mortgageRequest.salary !== 'string' || mortgageRequest.salary == null ||
        typeof mortgageRequest.employerName !== 'string' || mortgageRequest.employerName == null ||
        typeof mortgageRequest.term !== 'string' || mortgageRequest.term == null ||
        typeof mortgageRequest.customerId !== 'string' || mortgageRequest.customerId == null
  ) {
    console.error('Validation Failed');
    const errorResponse = {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Validation. Parameter types. Couldn\'t create the mortgage application.',
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
            "S": "MORTGAGE_ID_GEN"
          }
        }
      }
    ).promise();

    const newMortgageId = genIdResponse.Attributes.idValue.N;

    let newMortgage = {
      Item: {
        "mortgageId": {
          S: newMortgageId
        }, 
       "customerId": {
         S: mortgageRequest.customerId
        }, 
       "term": {
         N: mortgageRequest.term
        }, 
       "employerName": {
         S: mortgageRequest.employerName
        }, 
        "salary": {
         N: mortgageRequest.salary
        }, 
        "yearsInEmployment": {
         N: mortgageRequest.yearsInEmployment
        }, 
        "loanAmount": {
         N: mortgageRequest.loanAmount
        }, 
        "mortgageStatus": {
         S: "PreSubmission"
        }
      }, 
      ReturnConsumedCapacity: "TOTAL", 
      TableName: "MORTGAGES_TABLE"
    };

    const newMortgageResponse = await dynamoDb.putItem(newMortgage).promise();
    
    return { statusCode: 200, body: JSON.stringify(newMortgageId) };
    
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not obtain new Mortgage ID: ${error.stack}`
    };
  }
};