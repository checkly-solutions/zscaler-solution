/* Explainer:
  Device-dependent endpoints that require data from getDevices API call.
  Each endpoint specifies:
  - name: Display name for the check
  - url: API endpoint path
  - requiresParams: Array of required query parameters
  - paramMapping: Maps device response fields to query parameters
*/

export const deviceDependentEndpoints = [
  {
    name: 'get-device-details',
    method: 'GET',
    url: '/papi/public/v1/getDeviceDetails',
    query: {
      username: 'string', // maps from device.user
      udid: 'string'      // maps from device.udid
    },
    paramMapping: {
      username: 'user',
      udid: 'udid'
    }
  },
  {
    name: 'get-otp',
    method: 'GET',
    url: '/papi/public/v1/getOtp',
    query: {
      udid: 'string'
    },
    paramMapping: {
      udid: 'udid'
    }
  },
  {
    name: 'get-passwords',
    method: 'GET',
    url: '/papi/public/v1/getPasswords',
    query: {
      username: 'string',
      osType: '2'
    },
    paramMapping: {
      username: 'user',
      osType: () => '2' // hardcoded value for Windows
    }
  }
  // Add more device-dependent endpoints here as needed
];