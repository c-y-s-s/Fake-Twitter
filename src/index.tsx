import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { Provider } from "react-redux";
import { store } from "./reducers";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
onAuthStateChanged(auth, (user) => {
  root.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Normalize />
          <GlobalStyle />
          <App user={user} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
});

reportWebVitals();
