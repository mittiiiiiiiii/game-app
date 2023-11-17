import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom'; 


function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const { elapsedTime, correctCount, mistypeCount, accuracy, averageKeystrokes } = location.state;

  const handlePlayButtonClick = () => {
    navigate('/');
  };

  return (
    <>
      <GlobalStyle />
      <BackgroundContainer>
        <TitleLabel>
          <TextContainer>NS-TYPING</TextContainer>
        </TitleLabel>
        <StyledDiv>
          <BlackBox>
          <TextInfo style={{ left: '91px', top: '205px' }}>
        ・経過時間: <span style={{ color: '#008000' }}>{elapsedTime}秒<br/></span>
        ・正しく打ったキーの数: <span style={{ color: '#008000' }}>{correctCount}<br/></span>
        ・平均キータイプ数: <span style={{ color: '#008000' }}>{averageKeystrokes}</span>回/秒<br/>
        ・ミスタイプ数: <span style={{ color: '#008000' }}>{mistypeCount}<br/></span>
        ・正確率: <span style={{ color: '#008000' }}>{accuracy}%</span>
      </TextInfo>
            <PlayButtonContainer onClick={handlePlayButtonClick}>
              <PlayButtonText>タイトルに戻る</PlayButtonText>
            </PlayButtonContainer>
          </BlackBox>
        </StyledDiv>
      </BackgroundContainer>
    </>
  );
}

export default Result;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const BackgroundContainer = styled.div`
  box-sizing: border-box;
  width: 100vw; // Set width to 100% of the viewport width
  min-height: 100vh; // Set minimum height to 100% of the viewport height
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
  position: relative;
`;

const PlayButtonContainer = styled.div`
  width: 138px;
  height: 32px;
  position: absolute;
  left: 281px;
  top: 425px;
  background: #008000;
  cursor: pointer;
`;

const PlayButtonText = styled.div`
  width: 130px;
  height: 18px;
  position: absolute;
  left: 4px;
  top: 8px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  word-wrap: break-word;
`;

const TextInfo = styled.div`
  position: absolute;
  color: white;
  font-size: 20px;
  font-family: Arial;
  font-weight: 400;
  word-wrap: break-word;
`;