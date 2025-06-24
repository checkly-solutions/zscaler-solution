// @ts-nocheck

/* Explainer:
After successful auth from API check, get the original request url
determine environment of request URL, so we can update correct auth env variable in checkly
*/

const axios = require('axios').default;
const checkly_apiKey = process.env.CHECKLY_CLI_API_KEY;
const checkly_accountid = process.env.CHECKLY_ID;

let environment;

try {
  if (request.url.includes('zscalerone')) {
    environment = 'ZS1';
  } else if (request.url.includes('zscalertwo')) {
    environment = 'ZS2';
  } else if (request.url.includes('zscalerbeta')) {
    environment = 'BETA';
  }

  const responseBody = await JSON.parse(response.body);

  if (!responseBody.jwtToken) {
    throw new Error('Token not found in response');
  }
  const jwtToken = await responseBody.jwtToken;

  const tokenUpdateResponse = await axios.put(
    `variables/${environment}_TOKEN`, 
    {
      // This is the request BODY (data)
      key: `${environment}_TOKEN`,
      value: jwtToken,
      secret: true,
    },
    {
      baseURL: 'https://api.checklyhq.com/v1/',
      headers: {
        Authorization: `Bearer ${checkly_apiKey}`,
        'x-checkly-account': checkly_accountid,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log('Successful update:', tokenUpdateResponse);
} catch (error) {
  throw new Error('Error occurred:', error);
}
