'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

//const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.list = async (event, context) => {

  if (event.queryStringParameters === 'undefined' || event.queryStringParameters == null) {
    console.error('Validation Failed');
    const errorResponse = {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Validation. There must be a query string containing the required mortgage status.',
    };
    return errorResponse;
  }

  const listStatus = event.queryStringParameters.status;

  console.log("request: " + JSON.stringify(event.queryStringParameters));


  try {
    var findMortgage = {
        TableName: "MORTGAGES_TABLE",
        IndexName: "MortgateStatusIndex",
        KeyConditionExpression: 'mortgageStatus = :statusCode',
        ExpressionAttributeValues: { ':statusCode': listStatus } 
      };
  
      const findMortgageResponse = await dynamoDb.query(findMortgage).promise();
   //   let foundMortgage = convertMortgageItemToHttpAPI(findMortgageResponse.Item)
      console.log(findMortgageResponse);
      return { 
        statusCode: 200, 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(findMortgageResponse.Items) 
      };
} catch (error) {
    return {
        statusCode: 400,
        error: `Could not find the Mortgage: ${error.stack}`
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
foundMortgage.status = mortgageItem.status.S; 

return foundMortgage;
};