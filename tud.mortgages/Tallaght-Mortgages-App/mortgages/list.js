'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.list = async (event, context) => {
    console.log("request: " + JSON.stringify(event.queryStringParameters));
  const timestamp = new Date().getTime();
  // console.log(event.queryStringParameters);
 // const queryParams = JSON.parse(event.queryStringParameters);


  // create a response
  const response = {
    statusCode: 200,
    body: "Query is " + JSON.stringify(event.queryStringParameters),
  };
  return response;
};