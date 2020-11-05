import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import auth0Configs from "./auth0.configs";
    
const Auth0ProviderMain = ({ children }) => {
  const env = process.env.NODE_ENV
  const domain= auth0Configs[env].domain
  const clientId= auth0Configs[env].clientId
  console.log({domain, clientId})
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderMain;