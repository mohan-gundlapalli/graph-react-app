export const msalConfig = {
  auth: {
    clientId: "cd1d328d-f1db-42ef-837c-ebadfde10471",
    authority: "https://login.microsoftonline.com/b775ea41-8c34-433c-8d5c-efa7a3808c03", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
// export const loginRequest = {
//  scopes: ["User.Read", "Channel.ReadBasic.All", "Team.ReadBasic.All"]
// };

// export const tokenRequest = {
//   scopes: ["User.Read", "Channel.ReadBasic.All", "Team.ReadBasic.All", "api://5689f77c-9f2f-4349-a147-3384f77d0022/access_as_user"]
//  };

const resourceScopes = ["api://5689f77c-9f2f-4349-a147-3384f77d0022/.default"]

 export const loginRequest = {
  scopes: [ "offline_access", ...resourceScopes]
}

// Add here scopes for access token to be used at the API endpoints.
export const tokenRequest = {
  scopes: [...resourceScopes]
}

// Add here scopes for silent token request
export const silentRequest = {
  scopes: [ ...resourceScopes]
}

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

// Coordinates and required scopes for your web API
export const apiConfig = {
  teamsList: "https://localhost:7291/api/teamApi/",
  channelList: "https://localhost:7291/api/teamApi/GetChannels/",
  resourceScopes: ["api://5689f77c-9f2f-4349-a147-3384f77d0022/.default"]
}

