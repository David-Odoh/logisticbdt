// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appName: 'logistic_bdt_web',
  developmentKeyring: true,
  production: false,
  providerSocket: 'wss://kusama-rpc.polkadot.io/',
  rpc: {},
  secretKey: '0123456789123456',
  secretIV: '0123456789123456',
};

// providerSocket: 'wss://gladios.aresprotocol.io',
// providerSocket: 'ws://127.0.0.1:9944',

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
