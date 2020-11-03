import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderMain from "./components/utils/Auth0ProviderMain.component";
import AuthorizedApolloProvider from "./components/utils/AuthorizedApolloProvider.component";
import { UserProvider } from "./contexts/User.context";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Auth0ProviderMain>
        <AuthorizedApolloProvider>
          <App />
        </AuthorizedApolloProvider>
      </Auth0ProviderMain>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
