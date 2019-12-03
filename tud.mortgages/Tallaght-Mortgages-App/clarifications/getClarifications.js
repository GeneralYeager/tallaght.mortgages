'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const clarificationUtils = require('./utils/clarificationDB.js');

exports.handler = async (event, context) => {

  const mortgageId = event.pathParameters.id;
console.log(mortgageId);
  try {    
    const clars = await clarificationUtils.queryClarifications(mortgageId);

    return { 
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(clars.Items)
    };
    
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify( { error : `Could not create a new clarification for mortgage: ${mortgageId}. Error [${error.stack}].` } )
    };
  }
};
