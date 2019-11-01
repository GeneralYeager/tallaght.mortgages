'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.update = async (event, context) => {
/*  const timestamp = new Date().getTime();
  const newMortgage = JSON.parse(event.body);
  if (typeof newMortgage.mortgageId !== 'string' || newMortgage.mortgageId == null ||
        typeof newMortgage.firstName !== 'string' || newMortgage.firstName == null ||
        typeof newMortgage.lastName !== 'string' || newMortgage.lastName == null ||
        typeof newMortgage.currentAddress1 !== 'string' || newMortgage.currentAddress1 == null ||
        typeof newMortgage.currentAddress2 !== 'string' || newMortgage.currentAddress2 == null ||
        typeof newMortgage.loanAmount !== 'number' || newMortgage.loanAmount == null ||
        typeof newMortgage.yearsInEmployment !== 'number' || newMortgage.yearsInEmployment == null ||
        typeof newMortgage.salary !== 'number' || newMortgage.salary == null ||
        typeof newMortgage.employerName !== 'string' || newMortgage.employerName == null
  ) {
    console.error('Validation Failed');
    const errorResponse = {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the mortgage application.',
    };
    return errorResponse;
  }
*/
  // create a response
  const response = {
    statusCode: 200,
    body: "customer update"
  };
  return response;
};