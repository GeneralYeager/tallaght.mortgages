'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.autoassessment = async (event, context) => {

    try {
        const mortgageApplication = JSON.parse(event.body);
        
        if (mortgageApplication.yearsInEmployment != undefined && mortgageApplicationy.yearsInEmployment != null) {
            let lengthOfService = toInt(mortgageApplication.yearsInEmployment)
            if (10 > lengthOfService) {
                return { 
                    statusCode: 400,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({approved: false, reason: 'Must be employed for more that 10 years for autoapproval'})
                };
            }
        }

        if (mortgageApplication.salary != undefined && mortgageApplicationy.salary != null) {
            let salary = toInt(mortgageApplication.salary)
            if (100000 > salary) {
                return { 
                    statusCode: 400,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({approved: false, reason: 'Must be earning in excess of 100000 euro for autoapproval'})
                };
            }
        }

/*check age and term
        term
        customerId
*/

        return { 
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' }, 
            body: {approved: true, reason: 'All criteria for autoapproval have been met.'} 
        };
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could run the Auto Assessment: ${error.stack}`
        };
    }
};

function toInt(param) {
    return (typeof param === 'string') ? parseInt(param) : param;
}