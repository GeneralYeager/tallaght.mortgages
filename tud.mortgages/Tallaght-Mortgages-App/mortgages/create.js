
'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.create = async (event, context) => {

  const mortgageRequest = JSON.parse(event.body);
  if (mortgageRequest.loanAmount == null || mortgageRequest.yearsInEmployment == null ||
    mortgageRequest.salary == null || mortgageRequest.employerName == null ||
    mortgageRequest.term == null || mortgageRequest.customerId == null
  ) {
    console.error('Validation Failed');
    const errorResponse = {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify( { error : `Incomplete/Invalid Parameters. Couldn\'t create the mortgage application.` } )    
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
    
    return { 
      statusCode: 200, 
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(newMortgageId) 
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify( { error : `Could not obtain new Mortgage ID: ${error.stack}` } )
    };
  }
};