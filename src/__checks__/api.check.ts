// @ts-nocheck
import { ApiCheck, AssertionBuilder, RetryStrategyBuilder } from 'checkly/constructs';
import { endpoint_array } from './utils/endpoint-array';

console.log(endpoint_array, 'endpoint array'); // Verify it works

const environments = ['BETA', 'ZS1', 'ZS2'];

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

    new ApiCheck(`${method}-${environments[i]}-${cleanName}-api`, {
      name: `${method} ${environments[i]} ${cleanName} API`,
      // group: environments[i],
      tags: [`${environments[i]}-${cleanName}`, `${environments[i]}`],
      degradedResponseTime: 5000,
      maxResponseTime: 10000,
      activated: false,
      frequency: 60,
      request: {
        url: `${baseUrl}${endpoint.url}`,
        method: endpoint.method,
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'auth-token', value: process.env[`${environments[i]}_TOKEN`] || '' },
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

// for (let i = 0; i < endpoint_array.length; i++) {
//   const body = process.env[`${endpoint_array[i]}_API_KEY`];
//   if (!body) {
//     throw new Error(`${endpoint_array[i]}_API_KEY environment variable is not set`);
//   }

//   new ApiCheck(`${method}-${environment}-${cleanName}-api`, {
//     name: `${method} ${environment} ${cleanName} api`,
//     // group: environment,
//     tags: [`${environment}-${cleanName}`, `${environment}`],
//     degradedResponseTime: 5000,
//     maxResponseTime: 10000,
//     request: {
//       url: `https://mobileadmin.zscalerbeta.net/papi/public/v1/getDeviceDetails`,
//       method: 'GET',
//       headers: [
//         { key: 'Content-Type', value: 'application/json' },
//         { key: 'auth-token', value: `${process.env.BETA_TOKEN}` },
//       ],
//       // query,
//       followRedirects: true,
//       skipSSL: false,
//       assertions: [AssertionBuilder.statusCode().equals(200)],
//     },
//     runParallel: true,
//   });
// }

// };
// )}
