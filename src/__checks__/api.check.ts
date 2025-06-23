import { ApiCheck, AssertionBuilder } from 'checkly/constructs'

const endpoint_array_and_options = [
  {"downloadDevices": [ "GET", "https://api-mobile.zscalerbeta.net/papi/public/v1/downloadDevices?osTypes=1,2",
  "https://api-mobile.zscalerbeta.net/papi/public/v1/downloadDevices?registrationTypes=1,3",]},
  {"downloadDisableReasons": ["GET", ]

  },


  "public/v1/downloadDevices?osTypes=1,2", "/papi/public/v1/downloadDisableReasons",
  "/papi/public/v1/downloadServiceStatus", "/papi/public/v1/forceRemoveDevices"

]

const environment = "beta"

// new ApiCheck(`GET ${environment} download devices`, {
//   name: `GET-${environment}-download-devices-api`,
//   // group: environment,
//   degradedResponseTime: 5000,
//   maxResponseTime: 10000,
//   request: {
//     url: 'https://api-mobile.zscalerbeta.net/papi/public/v1/downloadDevices?osTypes=1,2',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     followRedirects: true,
//     skipSSL: false,
//     assertions: [
//       AssertionBuilder.statusCode().equals(200),
//     ],
//   },
//   runParallel: true,
// })

// new ApiCheck(`GET ${environment} download devices`, {
//   name: `GET-${environment}-download-devices-api`,
//   // group: environment,
//   degradedResponseTime: 5000,
//   maxResponseTime: 10000,
//   request: {
//     url: 'https://api-mobile.zscalerbeta.net/papi/public/v1/downloadDevices?osTypes=1,2',
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     followRedirects: true,
//     skipSSL: false,
//     assertions: [
//       AssertionBuilder.statusCode().equals(200),
//     ],
//   },
//   runParallel: true,
// })
