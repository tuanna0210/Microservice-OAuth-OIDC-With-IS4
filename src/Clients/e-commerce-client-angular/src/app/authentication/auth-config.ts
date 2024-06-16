import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://localhost:44310',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/',
  logoutUrl: window.location.origin + '/',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'e-commerce-client-angular',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email offline_access order-api catalog-api basket-api',//openid profile email offline_access 
  
  useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
//   silentRefreshTimeout: 5000,
  timeoutFactor: 0.75, // Invoke silentRefresh after 3/4 token's lifetime
  
  showDebugInformation: true,
  nonceStateSeparator : 'semicolon'
};