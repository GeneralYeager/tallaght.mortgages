'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const mortgageDAO = require("../../mortgages/dao/mortgage.js");

exports.handler = async (event, context) => {

    const mortgageId = event.mortgageId;
    try {
        const foundMortgage = await mortgageDAO.findMortgageByPK(mortgageId);
        if (foundMortgage == null) {
            return {
                statusCode: 400,
                error: `Could not find the Mortgage: ${mortgageId}`
            };
        }

        return { 
            statusCode: 200, 
            mortgage: foundMortgage
        };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could not find the Mortgage: ${error.stack}`
        };
    }
};