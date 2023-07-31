exports.handler = async function (event, context) {
  try {
    // Perform any logic or data retrieval here to get the environment variables
    const apiKey = process.env.API_KEY; // Replace 'API_KEY' with your actual environment variable name

    // Return the environment variables as JSON response
    return {
      statusCode: 200,
      body: JSON.stringify({ apiKey }),
    };
  } catch (error) {
    console.error('Error fetching environment variables:', error);
    // Return an error response if there was an issue retrieving the environment variables
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
