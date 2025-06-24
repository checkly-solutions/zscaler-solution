// @ts-nocheck
import { ApiCheck, AssertionBuilder } from 'checkly/constructs';
import { apiGroups } from './resources/createGroup';

const environments = ['BETA', 'ZS1', 'ZS2'];

for (let i = 0; i < environments.length; i++) {
  // const group = createGroup(environments[i]);
  const body = process.env[`${environments[i]}_API_KEY`];

  if (!body) {
    throw new Error('BETA_API_KEY environment variable is not set');
  }
  // console.log(environments[i]); // Access element using index
  new ApiCheck(`post-${environments[i]}-authentication-api`, {
    name: `POST ${environments[i]} authentication API`,
    group: apiGroups[environments[i]],
    tags: [`${environments[i]}-authentication`, `${environments[i]}`],
    degradedResponseTime: 5000,
    maxResponseTime: 10000,
    frequency: 24 * 60, // 24 hours in minutes
    request: {
      url: process.env[`${environments[i]}_AUTH_URL`],
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
