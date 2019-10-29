"use strict"; 
var AWS = require("aws-sdk");

class MortgagesDAO {
	constructor(dbClient) {
		this.dbClient = dbClient;
	}
}

MortgagesDAO.prototype.findByID = function(mortgageId) {
	
}

MortgagesDAO.prototype.findByState = function(state) {
}

MortgagesDAO.prototype.update = function(mortgage) {
}

MortgagesDAO.prototype.create = function(mortgage) {
	
	const params = {
		TableName: process.env.MORTGAGE_DB_TABLE,
		Item: {
			mortgageID: uuid.v1(),
			text: data.text,
			checked: false,
			createdAt: timestamp,
			updatedAt: timestamp,
		},
	};

	// write the todo to the database
	dynamoDb.put(params, (error) => {
		// handle potential errors
		if (error) {
			console.error(error);
			callback(null, {
			statusCode: error.statusCode || 501,
			headers: { 'Content-Type': 'text/plain' },
			body: 'Couldn\'t create the todo item.',
		});
		return;
    }
	
	return this.dbClient.put(params).promise();
}

module.exports = MortgagesDAO;