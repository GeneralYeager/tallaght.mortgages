'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies


exports.handler = async (event, context) => {

  const newClarification = JSON.parse(event.body);

  try {    
    return { 
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(newClarification.mortgageId)
    };
    
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify( { error : `Could not create a new clarification for mortgage: ${newClarification.mortgageId}. Error [${error.stack}].` } )
    };
  }
};
