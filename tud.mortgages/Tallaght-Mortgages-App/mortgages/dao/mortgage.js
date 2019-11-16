'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.findMortgageByPK = async function (mortgageId) {

    try {
        var findMortgage = {
            Key: {
             "mortgageId": {
               S: mortgageId
              }
            },
            TableName: "MORTGAGES_TABLE"
          };
      
          const findMortgageResponse = await dynamoDb.getItem(findMortgage).promise();
          
          if (Object.entries(findMortgageResponse).length === 0 && findMortgageResponse.constructor === Object) {
            return null;
          }

          let foundMortgage = convertMortgageItemToHttpAPI(findMortgageResponse.Item)
          console.log(foundMortgage);
          return foundMortgage;
    } catch (error) {
        console.log(error);
        return null;
    }
};

exports.updateMortgage = async function (mortgage) {

  try {
    var newMortgage = {
      TableName: "MORTGAGES_TABLE",
      Key: {
        "mortgageId": {
          S: mortgage.mortgageId
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
        ":a": { "N": mortgage.loanAmount.toString() },
        ":b": { "N": mortgage.yearsInEmployment.toString() },
        ":c": { "N": mortgage.salary.toString() },
        ":d": { "S": mortgage.employerName },
        ":e": { "N": mortgage.term.toString() },
        ":f": { "S": mortgage.mortgageStatus }    
      },
      ReturnValues: "ALL_NEW"
    };
 
     const updatedMortgageResponse = await dynamoDb.updateItem(newMortgage).promise();
     const updatedMortgage = convertMortgageItemToHttpAPI(updatedMortgageResponse.Attributes);
     return updatedMortgage;
  } catch (error) {
      console.log(error);
      return null;
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
