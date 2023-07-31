exports.handler = function (event, context, callback) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      apiKey: process.env.API_KEY,
    }),
  };

  callback(null, response);
};
