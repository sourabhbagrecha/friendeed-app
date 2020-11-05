import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import configs from "../configs";
    
const Auth0ProviderMain = ({ children }) => {
  const env = process.env.NODE_ENV
  const domain= configs[env].domain
  const clientId= configs[env].clientId
  console.log({domain, clientId})
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin+"/home"}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderMain;