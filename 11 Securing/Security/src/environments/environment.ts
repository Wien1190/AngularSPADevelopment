import { AuthProvider } from "../app/demos/samples/auth/AuthProvider";

export const environment = {
  production: false,
  authEnabled: false,
  title: "ngSecurity",
  provider: AuthProvider.Firebase,
  firebaseConfig: {
    apiKey: "AIzaSyArGyMzbndccpMQ2_Iz0Ew6qYi9WTLxoF8",
    authDomain: "ngberlin-4ea29.firebaseapp.com",
    databaseURL: "https://ngberlin-4ea29.firebaseio.com",
    projectId: "ngberlin-4ea29",
    storageBucket: "",
    messagingSenderId: "681469779850",
    appId: "1:681469779850:web:a4e3dbff8a56fe8f"
  },
  o365Config: {
    tenant: "d92b247e-90e0-4469-a129-6a32866c0d0a",
    clientId: "4e60c128-a813-4031-bd99-cf4327cce885", //=> Application ID in Azure
    cacheLocation: "localStorage",
    endpoints: {
      graphApiUri: "https://graph.microsoft.com",
      sharePointUri: "https://integrationsonline.sharepoint.com" // Replace "integrationsonline" with your Tenant-Name & Make sure you assign permissions in Azure AD and enable Implicit Flow
    },
    returnUrl: "http://localhost:4200"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
