'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const clarificationUtils = require('./utils/clarificationDB.js');

exports.handler = async (event, context) => {

  const addClarification = JSON.parse(event.body);

  const mortgageId = addClarification.mortgageId;
  const text = addClarification.text;

  try {    
    const clars = await clarificationUtils.queryClarifications(mortgageId);
    const count = clars.Count;

    const newClar = await clarificationUtils.addClarification(mortgageId, count, text);
    
    return { 
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(newClar)
    };
    
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify( { error : `Could not create a new clarification for mortgage: ${addClarification.mortgageId}. Error [${error.stack}].` } )
    };
  }
};
