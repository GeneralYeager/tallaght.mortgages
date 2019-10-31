

exports.get = async (event, context) => {
    let response;
    try {
        const mortgageId = event.pathParameters.id;
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Mortgage ID are ' + mortgageId,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
