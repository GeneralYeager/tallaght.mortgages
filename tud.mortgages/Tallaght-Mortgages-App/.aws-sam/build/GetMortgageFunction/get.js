let response;

exports.get = async (event, context) => {
    try {
        const mortgageId = event.pathParameters.id;
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Mortgage ID is ' + mortgageId,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
