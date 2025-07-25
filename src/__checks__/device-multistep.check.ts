// @ts-nocheck

/* Explainer:
  This generates multistep checks for endpoints that require device data.
  For each environment and endpoint that needs device data:
  1. First calls getDevices to retrieve a list of devices
  2. Extracts username and udid from the first device
  3. Uses that data to call the target endpoint with proper parameters
*/

import { MultiStepCheck } from 'checkly/constructs';
import { environments } from './utils/endpoint-array';
import { deviceDependentEndpoints } from './utils/device-endpoints';
import { apiGroups } from './resources/createGroup';
import { pagerdutyChannel, slackChannel } from './resources/createAlertChannels';

const alertChannels = [pagerdutyChannel, slackChannel];

const ZS1_API_URL = 'https://mobileadmin.zscalerone.net';
const ZS2_API_URL = 'https://mobileadmin.zscalertwo.net';
const BETA_API_URL = 'https://mobileadmin.zscalerbeta.net';

// Generate multistep checks for each environment and endpoint
for (const environment of environments) {
  let baseUrl = '';
  if (environment === 'ZS1') {
    baseUrl = ZS1_API_URL;
  } else if (environment === 'ZS2') {
    baseUrl = ZS2_API_URL;
  } else if (environment === 'BETA') {
    baseUrl = BETA_API_URL;
  }

  for (const endpoint of deviceDependentEndpoints) {
    
    new MultiStepCheck(`${endpoint.method.toLowerCase()}-${environment}-${endpoint.name}-multistep`, {
      name: `${endpoint.method} ${environment} ${endpoint.name} multistep`,
      group: apiGroups[environment],
      tags: [`${environment}`, 'multistep', 'api', 'cli'],
      alertChannels,
      muted: true,
      degradedResponseTime: 5000,
      maxResponseTime: 10000,
      activated: true,
      frequency: 60, // Run every hour
      locations: ['us-east-1'],
      runParallel: false,
      environmentVariables: [
        { key: 'AUTH_TOKEN', value: process.env[`${environment}_TOKEN`] || '' }
      ],
      code: {
        content: `
import { test, expect } from '@playwright/test';

test.describe('${endpoint.name} - ${environment}', () => {
  const baseUrl = '${baseUrl}';
  const environment = '${environment}';
  
  test('Get devices and call ${endpoint.name}', async ({ request }) => {
    const headers = {
      'Content-Type': 'application/json',
      'auth-token': process.env.AUTH_TOKEN || ''
    };

    // Step 1: Get devices list
    const devicesResponse = await test.step('GET /papi/public/v1/getDevices', async () => {
      const response = await request.get(\`\${baseUrl}/papi/public/v1/getDevices\`, {
        headers
      });
      
      expect(response).toBeOK();
      expect(response.status()).toBe(200);
      
      const devices = await response.json();
      console.log('Devices response:', JSON.stringify(devices, null, 2));
      
      // Validate we have devices in the response
      expect(devices).toBeTruthy();
      expect(Array.isArray(devices)).toBe(true);
      
      return devices;
    });

    // Step 2: Call target endpoint using device data
    await test.step('${endpoint.url}', async () => {
      // Check if we have devices to work with
      if (!devicesResponse || devicesResponse.length === 0) {
        console.log('No devices found, skipping ${endpoint.name}');
        return;
      }

      // Use the first device (registered or unregistered)
      const deviceToUse = devicesResponse[0];
      console.log('Using device (state: ' + deviceToUse.state + '):', JSON.stringify(deviceToUse, null, 2));

      // Build query parameters based on endpoint requirements
      const params = {};
      ${Object.keys(endpoint.query || {}).map(param => {
        const mapping = endpoint.paramMapping[param];
        if (typeof mapping === 'function') {
          // For hardcoded values, call the function and get the value
          const value = mapping();
          return `params['${param}'] = '${value}';`;
        } else {
          return `params['${param}'] = deviceToUse['${mapping}'];`;
        }
      }).join('\n      ')}

      console.log('Request params:', params);

      // Validate required params are present
      ${Object.keys(endpoint.query || {}).map(param => 
        `if (!params['${param}']) {
        console.log('Missing required param: ${param}');
        return;
      }`
      ).join('\n      ')}

      // Make the target endpoint request
      const response = await request.get(\`\${baseUrl}${endpoint.url}\`, {
        headers,
        params
      });

      expect(response).toBeOK();
      expect(response.status()).toBe(200);
      
      const responseData = await response.json();
      console.log('${endpoint.name} response:', JSON.stringify(responseData, null, 2));
      
      // Validate the response contains expected data
      expect(responseData).toBeTruthy();
      
      // Validate that key device fields match between getDevices and the endpoint response
      // Check common fields that should match
      if (responseData.unique_id !== undefined) {
        expect(responseData.unique_id).toBe(deviceToUse.udid);
      }
      if (responseData.user_name !== undefined) {
        expect(responseData.user_name).toBe(deviceToUse.user);
      }
      if (responseData.mac_address !== undefined) {
        expect(responseData.mac_address).toBe(deviceToUse.macAddress);
      }
      if (responseData.machineHostname !== undefined) {
        expect(responseData.machineHostname).toBe(deviceToUse.machineHostname);
      }
      if (responseData.owner !== undefined) {
        expect(responseData.owner).toBe(deviceToUse.owner);
      }
      if (responseData.type !== undefined) {
        expect(responseData.type).toBe(deviceToUse.type);
      }
      if (responseData.state !== undefined) {
        expect(responseData.state).toBe(deviceToUse.state);
      }
    });
  });
});
`
      }
    });
  }
}