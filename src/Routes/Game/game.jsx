import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistoryからuseNavigateに変更
import styled, { createGlobalStyle } from 'styled-components';

const symbols = ['@', '#', '$', '%', '&', '*', '!', '?', '+', '='];

function Game() {
  const navigate = useNavigate();
  const [currentSymbol, setCurrentSymbol] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // ランダムな記号を選択
  useEffect(() => {
    setCurrentSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
  }, [questionCount]);

  // キーイベントのハンドラー
  const handleKeyPress = useCallback((event) => {
    if (event.key === currentSymbol) {
      setCorrectCount(correctCount + 1);
    }
    
    if (questionCount < 10) {
      setQuestionCount(questionCount + 1);
    }

    if (questionCount >= 9) { // 10問目の問題が終わったらリザルト画面へ
      navigate('/result');
    }
  }, [currentSymbol, correctCount, questionCount, navigate]);

  // キーイベントのリスナーを追加するためのuseEffect
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

  // タイトルに戻るボタンのハンドラー
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
            <InstructionText>表示された数字または記号のキーを押してください</InstructionText>
            <SymbolDisplay>{currentSymbol}</SymbolDisplay>
            <StatsDisplay>問題数: {questionCount}<br/><br/><br/>正解数: {correctCount}</StatsDisplay>
          </BlackBox>
          <PlayButtonContainer>
            <PlayButton onClick={handlePlayButtonClick}>
              <PlayButtonText>タイトルに戻る</PlayButtonText>
            </PlayButton>
          </PlayButtonContainer>
        </StyledDiv>
      </BackgroundContainer>
    </>
  );
}

export default Game;

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
  justify-content: center; 
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
  width: 700px; 
  height: 100%;
  position: relative;
`;


const BlackBox = styled.div`
  width: 700px;
  height: 500px;
  background: #1E1E1E;
  border: 10px solid yellow;
  display: flex;
  justify-content: center; 
  align-items: center; 
`;

const PlayButtonContainer = styled.div`
  width: 100px;
  height: 45px;
  position: absolute;
  left: 300px;
  top: 329px;
`;

const PlayButton = styled.div`
  width: 138px; 
  height: 32px;
  position: absolute;
  background: #008000;
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
  word-wrap: break-word
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

const StatsDisplay = styled.div`
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