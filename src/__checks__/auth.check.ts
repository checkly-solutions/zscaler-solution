// @ts-nocheck

/* Explainer:
  Iterate through list of available environments
  Set group by referencing apiGroups & environment created within createGroup file
  Pass along the appropriate auth in the body
  Send request and do an after auth update to Checkly tokens 
*/

import { ApiCheck, AssertionBuilder } from 'checkly/constructs';
import { apiGroups } from './resources/createGroup';
import { environments, auth_endpoint_array } from './utils/endpoint-array';
import { pagerdutyChannel, slackChannel } from './resources/createAlertChannels';
const alertChannels = [pagerdutyChannel, slackChannel]

for (let i = 0; i < environments.length; i++) {
  let environment = environments[i];

  let body = process.env[`${environment}_API_KEY`];

  new ApiCheck(`post-${environment}-authentication-api`, {
    name: `POST ${environment} authentication API`,
    group: apiGroups[environment],
    alertChannels,
    tags: [`${environment}-authentication`, `${environment}`],
    degradedResponseTime: 5000,
    maxResponseTime: 10000,
    frequency: 24 * 60,
    request: {
      url: auth_endpoint_array[environment],
      method: 'POST',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      body,
      bodyType: 'RAW',
      followRedirects: true,
      skipSSL: false,
      assertions: [AssertionBuilder.statusCode().equals(200)],
    },
    tearDownScript: { entrypoint: `./utils/auth-after.ts` },
    runParallel: true,
  });
}
