// @ts-nocheck
const environments = ['BETA', 'ZS1', 'ZS2'];

try {
  console.log(request.url, 'request url')

  

  const responseBody = JSON.parse(response.body);
  if (!responseBody.jwtToken) {
    throw new Error('Token not found in response');
  }
  const jwtToken = responseBody.jwtToken;
  console.log('Token:', jwtToken);


} catch (error) {
  console.error('Failed to parse token:', error);
}
