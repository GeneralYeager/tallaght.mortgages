'use strict';

//const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const clarificationUtils = require('./utils/clarificationDB.js');

exports.handler = async (event, context) => {

  const deleteReq = JSON.parse(event.body);

  const mortgageId = deleteReq.mortgageId;

  try {
    const clars = await clarificationUtils.queryClarifications(mortgageId);

    for (const i in clars.Items) {
      await clarificationUtils.deleteClarifications(clars.Items[i]);
    }
    
    const count = clars.Count;
    console.log("items deleted = " + count);
    
    return { 
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(count)
    };
    
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify( { error : `Could not create a new clarification for mortgage: ${mortgageId}. Error [${error.stack}].` } )
    };
  }
};
