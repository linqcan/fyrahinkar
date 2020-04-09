import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import StartPage from "./StartPage/StartPage";
import Typography from "@material-ui/core/Typography";

const AppContainer = styled.div``;

const Header = styled.header`
  margin-bottom: 16px;
`;

const Footer = styled.footer`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 2px darkgray dotted;
  font-size: 12px;
  color: black;
  a {
    color: black;
    &:hover {
      color: blue;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: lightblue;
    height: 100%;
    width: 100%;
    padding: 16px;
    margin: 0px;
  }
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Typography variant="h2">
            <u>Fyra hinkar</u>
          </Typography>
        </Header>
        <StartPage />
        <Footer>
          <Typography variant="caption">
            Baserat på&nbsp;
            <a
              href="https://rikatillsammans.se/fyra-hinkar-strategin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {""}
              "Bästa sättet att strukturera sin ekonomi och sparande" av
              RikaTillsammans
            </a>
          </Typography>
        </Footer>
      </AppContainer>
    </React.Fragment>
  );
}

export default App;
