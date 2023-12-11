import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import { GlobalStyle, Container, Background, Header, BlackBoxContainer } from '../../utils/StyledComponents';

const symbols = ['@', '#', '$', '%', '&', '*', '!', '?', '+', '=', 
                 '<', '>', '/', '\\', '|', '^', '~', '`', '_', '-', 
                 '(', ')', '{', '}', '[', ']', '.', ',', ';', ':', '"', "'",
                 '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Game = ({ gameStarted }) => {
  const navigate = useNavigate();
  const [currentSymbol, setCurrentSymbol] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistypeCount, setMistypeCount] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (!gameStarted) {
      navigate('/');
    } else {
      setStartTime(new Date());
    }
  }, [gameStarted, navigate]);

  const calculateElapsedTime = useCallback(() => {
    const now = new Date();
    return ((now - startTime) / 1000).toFixed(2);
  }, [startTime]);

  const handleKeyPress = useCallback(async (event) => {
    if (event.key === currentSymbol) {
      setCorrectCount(correctCount + 1);
      if (questionCount < 9) {
        setQuestionCount(questionCount + 1);
      } else if (questionCount === 9) {
        const elapsedTime = calculateElapsedTime();
        const gameData = {
          correctCount: correctCount + 1,
          mistypeCount: mistypeCount,
          elapsedTime: elapsedTime
        };

        try {
          const response = await axios.post('http://localhost:3001/api/game/results', gameData);
          navigate('/result', { state: response.data });
        } catch (error) {
          console.error('There was a problem with the axios operation:', error);
        }
      }
    } else {
      setMistypeCount(mistypeCount + 1);
    }
  }, [currentSymbol, correctCount, mistypeCount, questionCount, navigate, calculateElapsedTime]);

  useEffect(() => {
    setCurrentSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
  }, [questionCount]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handlePlayButtonClick = () => {
    navigate('/');
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Background />
        <Header data-testid="header-label">NS-TYPING</Header>
        <BlackBoxContainer>
          <InstructionText>表示された数字または記号のキーを押してください</InstructionText>
          <SymbolDisplay data-testid="current-symbol">{currentSymbol}</SymbolDisplay>
          <QuestionStats>
            問題数: {questionCount}<br/><br/><br/>
            <span data-testid="correct-count">正解数: {correctCount}</span>
          </QuestionStats>
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