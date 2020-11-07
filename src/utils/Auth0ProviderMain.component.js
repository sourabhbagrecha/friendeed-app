import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import envConfigs from "../configs";
    
const Auth0ProviderMain = ({ children }) => {
  const domain= envConfigs.domain
  const clientId= envConfigs.clientId
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