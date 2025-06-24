export const endpoint_array = [
  {
    name: 'download devices os types',
    method: 'GET',
    url: '/papi/public/v1/downloadDevices?osTypes=1,2',
  },
  {
    name: 'download devices registration types',
    method: 'GET',
    url: '/papi/public/v1/downloadDevices?registrationTypes=1,3',
  },
  {
    name: 'download service status',
    method: 'GET',
    url: '/papi/public/v1/downloadServiceStatus?osTypes=1,2',
  },
];

// {
//   name: 'download disable reasons',
//   method: 'GET',
//   url: '/papi/public/v1/downloadDisableReasons',
//   headers: {
//     // what timezone string is expected here?
//     'Time-Zone': 'string',
//   },
//   query: {
//     osTypes: '1,2',
//     startDate: '2023-10-01T00:00:00Z',
//     endDate: '2023-10-31T23:59:59Z',
//   },
// },
// {
//   name: 'get device details',
//   method: 'GET',
//   url: '/papi/public/v1/getDeviceDetails',
//   query: {
//     username: 'string',
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
//   url: '/papi/public/v1/getOtp',
//   query: {
//     udid: 'string',
//   },
// },
// {
//   name: 'get passwords',
//   method: 'GET',
//   url: '/papi/public/v1/getPasswords',
//   query: {
//     username: 'string',
//     osType: 2,
//   },
// },
// {
//   name: 'get zdx group entitlements',
//   method: 'GET',
//   url: '/papi/public/v1/getZdxGroupEntitlements',
//   query: {
//     'page integer': 'integer',
//     pageSize: 'integer',
//     'search string': 'string',
//   },
// },
// {
//   name: 'remove devices',
//   method: 'POST',
//   url: '/papi/public/v1/removeDevices',
//   query: {
//     'page integer': 'integer',
//     pageSize: 'integer',
//     'search string': 'string',
//   },
// },
// {
//   name: 'remove machine tunnel',
//   method: 'POST',
//   url: '/papi/public/v1/removeMachineTunnel',
//   query: {
//     hostName: 'string',
//     machineToken: 'string',
//   },
//   body: {
//     hostNames: ['string'],
//     machineToken: 'string',
//   },
// },
// {
//   // Force removes the enrolled device from the portal. You can only remove devices that are in registered or device removal pending state. At least one criterion (username, Zscaler Client Connector version, OS type, or UDID) must be specified to remove devices.
//   name: 'force remove devices',
//   method: 'POST',
//   url: '/papi/public/v1/forceRemoveDevices',
//   body: {
//     clientConnectorVersion: ['string'],
//     udids: ['string'],
//     userName: 'string',
//   },
// },
