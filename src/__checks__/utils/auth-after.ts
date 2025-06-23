// @ts-nocheck
// const environments = ['BETA', 'ZS1', 'ZS2'];
const axios = require('axios').default;

let environment;

const checkly_apiKey = process.env.CHECKLY_CLI_API_KEY;
const checkly_accountid = process.env.CHECKLY_ACCOUNT_ID;

try {
  console.log(request.url, 'request url');
  // zscalerone, zscalertwo, zscalerbeta
  if (request.url.includes('zscalerone')) {
    environment = 'ZS1';
  } else if (request.url.includes('zscalertwo')) {
    environment = 'ZS2';
  } else if (request.url.includes('zscalerbeta')) {
    environment = 'BETA';
  }

  console.log('Environment:', environment);

  const responseBody = await JSON.parse(response.body);
  if (!responseBody.jwtToken) {
    throw new Error('Token not found in response');
  }
  const jwtToken = await responseBody.jwtToken;

  console.log(jwtToken, 'jwtToken');

  const tokenUpdateResponse = await axios.put(
    `variables/${environment}_TOKEN`, // Relative path since you'll use baseURL
    {
      // This is the request BODY (data)
      key: `${environment}_TOKEN`,
      value: jwtToken,
    },
    {
      // This is the Axios config object (headers, etc.)
      baseURL: 'https://api.checklyhq.com/v1/',
      headers: {
        Authorization: `Bearer ${checkly_apiKey}`,
        'x-checkly-account': checkly_accountid,
        'Content-Type': 'application/json',
      },
    }
  );
  // console.log(tokenUpdateReponse, 'tokenUpdateReponse');
} catch (error) {
  console.error('Failed to parse token:', error);
}
