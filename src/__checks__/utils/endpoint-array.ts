/* Explainer:
environments - array of available environments for use within scripts

auth-endpoints - array of auth API endpoints for generating tokens

endpoints - array of API endpoints that you should work across all 
mobile admin environments. 

*/

export const environments = ['BETA', 'ZS1', 'ZS2'];

export const auth_endpoint_array = {
  ZS1: 'https://mobileadmin.zscalerone.net/papi/auth/v1/login',
  ZS2: 'https://mobileadmin.zscalertwo.net/papi/auth/v1/login',
  BETA: 'https://mobileadmin.zscalerbeta.net/papi/auth/v1/login',
};

export const endpoint_array = [
  {
    name: 'download devices os types',
    method: 'GET',
    url: '/papi/public/v1/downloadDevices',
    query: {
      osTypes: '1,2'
    }
  },
  {
    name: 'download devices registration types',
    method: 'GET',
    url: '/papi/public/v1/downloadDevices',
    query: {
      registrationTypes: '1,3'
    }
  },
  {
    name: 'download service status',
    method: 'GET',
    url: '/papi/public/v1/downloadServiceStatus',
    query: {
      osTypes: '1,2'
    }
  },
  {
    name: 'get devices',
    method: 'GET',
    url: '/papi/public/v1/getDevices'
  },
  {
    name: 'download disable reasons',
    method: 'GET',
    url: '/papi/public/v1/downloadDisableReasons',
    query: {
      osTypes: '1',
      startDate: '2025-01-01'
    }
  },
];

// Assertions -- status code == 200
// Assertions -- Check if the output matches the getDevices output
// Multistep checks will be generated dynamically and separated out to individual endpoints
// Refactor to take in query parameters

// {
//   name: 'get device details',
//   method: 'GET',
//   url: '/papi/public/v1/getDeviceDetails', // need to pass the output of get devices 
//   query: {
//     username: 'string', // get devices returns "user" -- pass this as "username" to second API call
//     udid: 'string',
//   },
// },
// {
//   name: 'get devices',
//   method: 'GET',
//   url: '/papi/public/v1/getDevices',
//   query: {
//     username: 'string',
//     osType: 'string',
//     page integer: 'string',
//   },
// },
// {
//   // must provide udid
//   name: 'get otp',
//   method: 'GET',
//   url: '/papi/public/v1/getOtp', // need to pass the output of get devices
//   query: {
//     udid: 'string',
//   },
// },
// {
//   name: 'get passwords',
//   method: 'GET',
//   url: '/papi/public/v1/getPasswords', //need to pass the output of get devices
//   query: {
//     username: 'string',
//     osType: 2,
//   },
// },
// {
//   name: 'get zdx group entitlements', // getting unauthorized, pavithra to see why
//   method: 'GET',
//   url: '/papi/public/v1/getZdxGroupEntitlements',
//   query: {
//     'page integer': 'integer',
//     pageSize: 'integer',
//     'search string': 'string',
//   },
// },