import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import { GlobalStyle,Container, Background, Header, BlackBoxContainer } from '../../utils/StyledComponents';

const symbols = ['@', '#', '$', '%', '&', '*', '!', '?', '+', '=', 
                 '<', '>', '/', '\\', '|', '^', '~', '`', '_', '-', 
                 '(', ')', '{', '}', '[', ']', '.', ',', ';', ':', '"', "'",
                 '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// コンポーネント定義
const Game = ({ gameStarted }) => {
  const navigate = useNavigate();
  const [currentSymbol, setCurrentSymbol] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistypeCount, setMistypeCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // 不正なアクセスをブロック
  useEffect(() => {
    if (!gameStarted) {
      navigate('/');
    }
  }, [gameStarted, navigate]);

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
          <SymbolDisplay>{currentSymbol}</SymbolDisplay>
          <QuestionStats>問題数: {questionCount}<br/><br/><br/>正解数: {correctCount}</QuestionStats>
          <ReturnButton onClick={handlePlayButtonClick}>タイトルに戻る</ReturnButton>
            </BlackBoxContainer>
        </Container>
    </>
  );
};

export default Game;


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