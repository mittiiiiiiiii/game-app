import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

// コンポーネント定義
const Result = () => {
  const navigate = useNavigate();

  //Startコンポーネントに遷移
  const handlePlayButtonClick = () => {
    navigate('/');
  };

  return (
    <>
      <GlobalStyle />
        <Container>
          <Background/>
            <Header data-testid="header-label">NS-TYPING</Header>
            <BlackBoxContainer>
              <ResultTitle>結果</ResultTitle>
              <ElapsedTime>
                <StyledSpan color="white">経過時間: </StyledSpan>
                <StyledSpan color="#008000">00:14:26</StyledSpan>
              </ElapsedTime>
              <CorrectKeyCount>
                <StyledSpan color="white">正しく打ったキーの数: </StyledSpan>
                <StyledSpan color="#008000">10</StyledSpan>
              </CorrectKeyCount>
              <AverageKeyType>
                <StyledSpan color="white">平均キータイプ数: </StyledSpan>
                <StyledSpan color="#008000">0.7</StyledSpan>
                <StyledSpan color="white">回/秒</StyledSpan>
              </AverageKeyType>
              <MistypeCount>
                <StyledSpan color="white">ミスタイプ数: </StyledSpan>
                <StyledSpan color="#008000">4</StyledSpan>
              </MistypeCount>
              <Accuracy>
                <StyledSpan color="white">正確率: </StyledSpan>
                <StyledSpan color="#008000">71.43</StyledSpan>
                <StyledSpan color="white">%</StyledSpan>
              </Accuracy>
              <ReturnButton onClick={handlePlayButtonClick}>タイトルに戻る</ReturnButton>
            </BlackBoxContainer>
        </Container>
    </>
  );
};

export default Result;

// グローバルスタイルを追加
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Background = styled.div`
  box-sizing: border-box;
  width: 100vw; 
  min-height: 100vh; 
  padding: 150px 200px 0px;
  background-color: rgb(222, 222, 222);
  background-image: linear-gradient(rgb(236, 235, 235) 50%, transparent 50%, transparent);
  background-size: 5px 5px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  background: #008000;
  color: white;
  font-size: 70px;
  font-family: Impact;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 3.5px;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 1);
`;

const BlackBoxContainer = styled.div`
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 160px;
  transform: translateX(-50%);
  background: #1E1E1E;
  border: 10px solid yellow;
`;

// 結果タイトルのスタイル
const ResultTitle = styled.div`
  width: 173px;
  height: 64px;
  position: absolute;
  left: 263px;
  top: 91px;
  text-align: center;
  color: white;
  font-size: 50px;
  font-family: Arial;
  font-weight: 400;
`;

const ReturnButton = styled.div`
  width: 138px;
  height: 32px;
  position: absolute;
  left: 281px;
  top: 425px;
  background: #008000;
  color: white;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.color};
  font-size: 20px;
  font-family: Arial;
  font-weight: 400;
  word-wrap: break-word;
`;

const ElapsedTime = styled.div`
  width: 304px;
  height: 122px;
  position: absolute;
  left: 91px;
  top: 205px;
`;

const CorrectKeyCount = styled.div`
  position: absolute;
  left: 91px;
  top: 235px; // 経過時間の下に配置
  color: white;
  font-size: 20px;
  font-family: Arial;
  font-weight: 400;
`;

const AverageKeyType = styled.div`
  position: absolute;
  left: 91px;
  top: 265px; // 正しく打ったキーの数の下に配置
  color: white;
  font-size: 20px;
  font-family: Arial;
  font-weight: 400;
`;

const MistypeCount = styled.div`
  position: absolute;
  left: 91px;
  top: 295px; // 平均キータイプ数の下に配置
  color: white;
  font-size: 20px;
  font-family: Arial;
  font-weight: 400;
`;

const Accuracy = styled.div`
  position: absolute;
  left: 91px;
  top: 325px; // ミスタイプ数の下に配置
  color: white;
  font-size: 20px;
  font-family: Arial;
  font-weight: 400;
`;