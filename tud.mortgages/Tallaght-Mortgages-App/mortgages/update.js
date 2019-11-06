'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const mortgageDAO = require("./dao/mortgage.js");

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
      const foundMortgage = await mortgageDAO.updateMortgage(mortgageRequest);
      if (foundMortgage == null) {
          return {
              statusCode: 400,
              error: `Could not update the Mortgage: ${mortgageId}`
          };
      }

      return { 
          statusCode: 200, 
          body: JSON.stringify(foundMortgage) 
      };
  } catch (error) {
      return {
          statusCode: 400,
          error: `Could not update the Mortgage: ${error.stack}`
      };
  }
};