import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import StartPage from "./StartPage/StartPage";
import Typography from "@material-ui/core/Typography";

const AppContainer = styled.div``;

const Header = styled.header``;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: lightblue;
    height: 100%;
    width: 100%;
    padding: 8px;
    margin: 0px;
  }
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Typography variant="h2">Fyra hinkar</Typography>
        </Header>
        <StartPage />
      </AppContainer>
    </React.Fragment>
  );
}

export default App;
