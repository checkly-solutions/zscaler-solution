// @ts-nocheck

/* Explainer:

*/

import { ApiCheck, AssertionBuilder, RetryStrategyBuilder } from 'checkly/constructs';
import { endpoint_array, environments } from './utils/endpoint-array';
import { apiGroups } from './resources/createGroup';

const ZS1_API_URL = 'https://mobileadmin.zscalerone.net';
const ZS2_API_URL = 'https://mobileadmin.zscalertwo.net';
const BETA_API_URL = 'https://mobileadmin.zscalerbeta.net';

for (let i = 0; i < environments.length; i++) {
  for (const endpoint of endpoint_array) {
    let cleanName = endpoint.name.replaceAll(' ', '-').toLowerCase();
    let environment = environments[i];
    let method = endpoint.method;

    let baseUrl = '';
    if (environment === 'ZS1') {
      baseUrl = ZS1_API_URL;
    } else if (environment === 'ZS2') {
      baseUrl = ZS2_API_URL;
    } else if (environment === 'BETA') {
      baseUrl = BETA_API_URL;
    }

    new ApiCheck(`${method}-${environment}-${cleanName}-api`, {
      name: `${method} ${environment} ${cleanName} API`,
      group: apiGroups[environment],
      tags: [`${environment}-${cleanName}`, `${environment}`],
      degradedResponseTime: 5000,
      maxResponseTime: 10000,
      activated: true,
      frequency: 60,
      request: {
        url: `${baseUrl}${endpoint.url}`,
        method: endpoint.method,
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'auth-token', value: process.env[`${environment}_TOKEN`] || '' },
        ],
        followRedirects: true,
        skipSSL: false,
        assertions: [AssertionBuilder.statusCode().equals(200)],
      },
      locations: ['us-east-1'],
      runParallel: false,
      retryStrategy: RetryStrategyBuilder.noRetries(),
    });
  }
}
