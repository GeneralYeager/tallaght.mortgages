'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const mortgageDAO = require("./dao/mortgage.js");

exports.update = async (event, context) => {
  const timestamp = new Date().getTime();

  const mortgageId = event.pathParameters.id;

  const mortgageRequest = JSON.parse(event.body);
  if (mortgageRequest.loanAmount == null || mortgageRequest.yearsInEmployment == null ||
      mortgageRequest.salary == null || mortgageRequest.employerName == null ||
      mortgageRequest.term == null || mortgageRequest.mortgageStatus == null
  ) {
    console.error('Validation Failed');
    const errorResponse = {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify( { error : `Validation. Parameter types. Couldn\'t update the mortgage application.` } )
    };
    return errorResponse;
  }


  try {
      const foundMortgage = await mortgageDAO.updateMortgage(mortgageRequest);
      if (foundMortgage == null) {
          return {
              statusCode: 400,
              headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
              body: JSON.stringify( { error : `Could not update the Mortgage: ${mortgageId}.` } )
          };
      }

      return { 
          statusCode: 200, 
          headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify(foundMortgage) 
      };
  } catch (error) {
      return {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify( { error : `Could not update the Mortgage: ${mortgageId}. Error [${error.stack}].` } )
      };
  }
};