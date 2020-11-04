import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderMain from "./utils/Auth0ProviderMain.component";
import AuthorizedApolloProvider from "./utils/AuthorizedApolloProvider.component";
import { UserProvider } from "./contexts/User.context";
import { AlertProvider } from "./contexts/Alert.context";

ReactDOM.render(
  <BrowserRouter>
    <AlertProvider>
      <UserProvider>
        <Auth0ProviderMain>
          <AuthorizedApolloProvider>
            <App />
          </AuthorizedApolloProvider>
        </Auth0ProviderMain>
      </UserProvider>
    </AlertProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
