'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.get = async (event, context) => {

    try {
        var findMortgage = {
            Key: {
             "mortgageId": {
               S: event.pathParameters.id
              }
            },
            TableName: "MORTGAGES_TABLE"
          };
      
          const findMortgageResponse = await dynamoDb.getItem(findMortgage).promise();
          let foundMortgage = convertMortgageItemToHttpAPI(findMortgageResponse.Item)
          console.log(foundMortgage);
          return { statusCode: 200, body: JSON.stringify(foundMortgage) };
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
    foundMortgage.mortgageStatus = mortgageItem.mortgageStatus.S; 

    return foundMortgage;
};