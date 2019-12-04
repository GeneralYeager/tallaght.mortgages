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
    return result;
  } catch (error) {
      console.log(error);
      return null;
  }
};

exports.deleteClarifications = async function (mortgageId) {

  try {
    var params = {
      RequestItems: {
        CLARIFICATION_TABLE_NAME: [
          {
            DeleteRequest: {
              Key: { HashKey: mortgageId }
            }
          }
        ]
      }
    };
 
    const deleteResult = await ddb.batchWrite(params);
    return deleteResult;
  } catch (error) {
      console.log(error);
      return null;
  }
};