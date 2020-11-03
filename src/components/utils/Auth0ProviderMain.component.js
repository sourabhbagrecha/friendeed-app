import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
    
const Auth0ProviderMain = ({ children }) => {
  const domain="friendeed-dev.us.auth0.com"
  const clientId="a6OMEu3KekYtabKIJUDti2hrGxzYsLEg"
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