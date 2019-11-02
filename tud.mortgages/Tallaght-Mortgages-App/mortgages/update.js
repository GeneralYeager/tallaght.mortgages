'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.update = async (event, context) => {
  const timestamp = new Date().getTime();

  const mortgageId = event.pathParameters.id;

  const mortgageRequest = JSON.parse(event.body);
  if (typeof mortgageRequest.loanAmount !== 'string' || mortgageRequest.loanAmount == null ||
        typeof mortgageRequest.yearsInEmployment !== 'string' || mortgageRequest.yearsInEmployment == null ||
        typeof mortgageRequest.salary !== 'string' || mortgageRequest.salary == null ||
        typeof mortgageRequest.employerName !== 'string' || mortgageRequest.employerName == null ||
        typeof mortgageRequest.term !== 'string' || mortgageRequest.term == null ||
        typeof mortgageRequest.mortgageStatus !== 'string' || mortgageRequest.mortgageStatus == null
  ) {
    console.error('Validation Failed');
    const errorResponse = {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Validation. Parameter types. Couldn\'t update the mortgage application.',
    };
    return errorResponse;
  }

  try {
    
    var newMortgage = {
     TableName: "MORTGAGES_TABLE",
      Key: {
       "mortgageId": {
         S: mortgageId
        }
      },
      ExpressionAttributeNames: {
        "#A": "loanAmount",
        "#B": "yearsInEmployment",
        "#C": "salary",
        "#D": "employerName",
        "#E": "term",
        "#F": "mortgageStatus"
      }, 
      UpdateExpression: "set #A = :a, #B = :b, #C = :c, #D = :d, #E = :e, #F = :f",
      ExpressionAttributeValues: {
        ":a": { "N": mortgageRequest.loanAmount },
        ":b": { "N": mortgageRequest.yearsInEmployment },
        ":c": { "N": mortgageRequest.salary },
        ":d": { "S": mortgageRequest.employerName },
        ":e": { "N": mortgageRequest.term },
        ":f": { "S": mortgageRequest.mortgageStatus }
        
      },
      ReturnValues: "ALL_NEW"
    };

    const updatedMortgageResponse = await dynamoDb.updateItem(newMortgage).promise();
    const updatedMortgage = convertMortgageItemToHttpAPI(updatedMortgageResponse.Attributes);
    return { statusCode: 200, body: JSON.stringify(updatedMortgage) };
    
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not update the Mortgage: ${error.stack}`
    };
  }
};

function convertMortgageItemToHttpAPI(mortgageItem) {
  let foundMortgage = {};

  foundMortgage.mortgageId = mortgageItem.mortgageId.S;
  foundMortgage.customerId = mortgageItem.customerId.S;
  foundMortgage.term = mortgageItem.term.N;
  foundMortgage.loanAmount = mortgageItem.loanAmount.N;
  foundMortgage.salary = mortgageItem.salary.N;
  foundMortgage.employerName = mortgageItem.employerName.S;
  foundMortgage.yearsInEmployment = mortgageItem.yearsInEmployment.N;                
  foundMortgage.mortgageStatus = mortgageItem.mortgageStatus.S;
  return foundMortgage;
};