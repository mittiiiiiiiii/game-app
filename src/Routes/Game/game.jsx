import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistoryからuseNavigateに変更
import styled, { createGlobalStyle } from 'styled-components';

const symbols = ['@', '#', '$', '%', '&', '*', '!', '?', '+', '=', 
                 '<', '>', '/', '\\', '|', '^', '~', '`', '_', '-', 
                 '(', ')', '{', '}', '[', ']', '.', ',', ';', ':', '"', "'",
                 '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


function Game() {
  const navigate = useNavigate();
  const [currentSymbol, setCurrentSymbol] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistypeCount, setMistypeCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // ゲーム開始時の処理
  useEffect(() => {
    const start = new Date();

    const newTimer = setInterval(() => {
      const now = new Date();
      setElapsedTime(Math.floor((now - start) / 1000));
    }, 1000);

    return () => clearInterval(newTimer);
  }, []);
  
  // ランダムな記号を選択
  useEffect(() => {
    setCurrentSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
  }, [questionCount]);

  // キーイベントのハンドラー
  const handleKeyPress = useCallback((event) => {
    if (event.key === currentSymbol) {
      setCorrectCount(correctCount + 1);
  
      if (questionCount < 9) {
        setQuestionCount(questionCount + 1);
      } else if (questionCount === 9) {
        const totalTime = elapsedTime;
        // 平均キータイプ数の計算：タイプした合計数（正解数＋ミスタイプ数）を経過時間で割る
        const averageKeystrokes = (correctCount + mistypeCount) / totalTime;
        navigate('/result', {
          state: {
            elapsedTime: totalTime,
            correctCount: correctCount + 1,
            mistypeCount: mistypeCount,
            accuracy: (((correctCount + 1) / (correctCount + mistypeCount + 1)) * 100).toFixed(2),
            averageKeystrokes: averageKeystrokes.toFixed(2)
          }
        });
      }
    } else {
      setMistypeCount(mistypeCount + 1);
    }
  }, [currentSymbol, correctCount, mistypeCount, questionCount, navigate, elapsedTime]);
  
  

  // キーイベントのリスナーを追加するためのuseEffect
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

   // 正確率の計算
   //const accuracy = ((correctCount / (correctCount + mistypeCount)) * 100).toFixed(2);

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
            {/*<StatsDisplay>
              経過時間: {elapsedTime}秒<br/>
              問題数: {questionCount}<br/>
              正解数: {correctCount}<br/>
              ミスタイプ数: {mistypeCount}<br/>
              正確率: {accuracy}%
              </StatsDisplay>*/}
          </BlackBox>
          <PlayButtonContainer onClick={handlePlayButtonClick}>
              <PlayButtonText>タイトルに戻る</PlayButtonText>
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
width: 138px;
height: 32px;
position: absolute;
left: 50%;
top: 425px; // 縦方向の位置を固定
transform: translateX(-50%); // 横方向にのみ中央に調整
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