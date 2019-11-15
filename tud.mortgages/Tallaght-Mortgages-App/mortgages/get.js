'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const mortgageDAO = require("./dao/mortgage.js");

exports.get = async (event, context) => {

    const mortgageId = event.pathParameters.id;
    try {
        const foundMortgage = await mortgageDAO.findMortgageByPK(mortgageId);
        if (foundMortgage == null) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify( { error : `Could not find the Mortgage: ${mortgageId}` } )
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
            body: JSON.stringify( { error : `Could not find the Mortgage: ${mortgageId}. Error [${error.stack}].` } )
        };
    }
};