import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

// コンポーネント定義
const Game = () => {
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
          <InstructionText>表示された数字または記号のキーを押してください</InstructionText>
          <SymbolDisplay>@</SymbolDisplay>
          <QuestionStats>問題数: 10<br/><br/><br/>正解数: 1</QuestionStats>
          <ReturnButton onClick={handlePlayButtonClick}>タイトルに戻る</ReturnButton>
            </BlackBoxContainer>
        </Container>
    </>
  );
};

export default Game;

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

const InstructionText = styled.div`
  width: 435px;
  height: 19px;
  position: absolute;
  left: 132px;
  top: 70px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  word-wrap: break-word;
`;

const ReturnButton = styled.div`
  width: 138px;
  height: 32px;
  position: absolute;
  left: 281px;
  top: 412px;
  background: #008000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  cursor: pointer; // ボタンとしての視覚的なフィードバック
`;

const SymbolDisplay = styled.div`
  width: 154px;
  height: 110px;
  position: absolute;
  left: 273px;
  top: 187px;
  text-align: center;
  color: white;
  font-size: 90px;
  font-family: Arial;
  font-weight: 400;
  word-wrap: break-word;
`;

const QuestionStats = styled.div`
  width: 91px;
  height: 92px;
  position: absolute;
  left: 67px;
  top: 352px;
  color: white;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  word-wrap: break-word;
`;