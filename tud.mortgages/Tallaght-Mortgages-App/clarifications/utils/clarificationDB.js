'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const { CLARIFICATION_TABLE_NAME } = process.env;

exports.queryClarifications = async function (mortgageId) {

    try {
        var clarificationParams = {
            TableName : CLARIFICATION_TABLE_NAME,
            KeyConditionExpression: "mortgageId = :mortId",
            ExpressionAttributeValues: {
                ":mortId": mortgageId
            }
        };

        let clarifications = await ddb.query(clarificationParams).promise();

        console.log(clarifications);
        return clarifications;
    } catch (error) {
        console.log(error);
        return null;
    }
};

exports.addClarification = async function (mortgageId, currMessageId, text) {

  try {
    var newMessage = {
      TableName: CLARIFICATION_TABLE_NAME,
      Item: {
        "mortgageId": mortgageId,
        "messageId": currMessageId + 1,
        "text": text
      }
    };
 
    const result = await ddb.put(newMessage).promise();
    console.log(result);
    return result;
  } catch (error) {
      console.log(error);
      return null;
  }
};

exports.deleteClarifications = async function (clarification) {

  try {
    var params = {
      TableName: CLARIFICATION_TABLE_NAME,
      Key: {
        'mortgageId' : clarification.mortgageId,
        'messageId' : clarification.messageId
      }
    };
 
    const deleteResult = await ddb.delete(params).promise();
    return deleteResult;
  } catch (error) {
      console.log(error);
      return null;
  }
};