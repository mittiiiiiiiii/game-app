import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const BackgroundContainer = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 150px 200px 0px;
  background-color: rgb(222, 222, 222);
  background-image: linear-gradient(rgb(236, 235, 235) 50%, transparent 50%, transparent);
  background-size: 5px 5px;
  position: relative;
  display: flex;
  justify-content: center; // 横方向の中央揃え
`;

const TitleLabel = styled.div`
  width: 100%;
  height: 80px;
  background: green;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  text-align: center;
  color: white;
  font-size: 70px;
  font-family: Impact, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  word-wrap: break-word;
  text-shadow: 2px 2px black;
`;

const StyledDiv = styled.div`
  width: 700px; // BlackBoxの幅に合わせる
  height: 100%;
  position: relative;
`;


const BlackBox = styled.div`
  width: 700px;
  height: 500px;
  background: #1E1E1E;
  border: 10px solid yellow;
`;


function Game() {
  return (
    <>
      <GlobalStyle />
      <BackgroundContainer>
        <TitleLabel>
          <TextContainer>NS-TYPING</TextContainer>
        </TitleLabel>
        <StyledDiv>
          <BlackBox />
        </StyledDiv>
      </BackgroundContainer>
    </>
  );
}

export default Game;