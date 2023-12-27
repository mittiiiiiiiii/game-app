import React ,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { GlobalStyle,Container, Background, Header, BlackBoxContainer } from '../../utils/StyledComponents';
import axios from 'axios';

const saveResult = async (result) => {
  const response = await axios.post('http://koske-game.nip.io/results/save', result);
  return response.data;
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.floor((timeInSeconds % 1) * 100);

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMilliseconds = milliseconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};

const Result = ({ gameStarted }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { elapsedTime = 0, correctCount = 0, mistypeCount = 0, accuracy = 0, averageKeystrokes = 0 } = location.state;
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    const fetchLastResult = async () => {
      const response = await axios.get('http://koske-game.nip.io/results/last');
      setLastResult(response.data);
    };
  
    fetchLastResult();
  }, []);
  
  //不正なアクセスを禁止する
  useEffect(() => {
    if (!gameStarted || !location.state) {
      navigate('/');
    } else {
      const result = {
        elapsedTime,
        correctCount,
        mistypeCount,
        accuracy,
        averageKeystrokes
      };
      saveResult(result);
    }
  }, [gameStarted, location.state, navigate, elapsedTime, correctCount, mistypeCount, accuracy, averageKeystrokes]);

  const formattedElapsedTime = formatTime(elapsedTime);
  const formattedAccuracy = Number(accuracy).toFixed(2);
  const formattedAverageKeystrokes = Number(averageKeystrokes).toFixed(1);

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
                <TextInfo>
                  ・経過時間: <GreenText>{formattedElapsedTime} (前回: {lastResult ? formatTime(lastResult.elapsedTime) : '00:00:00'})<br/></GreenText>
                  ・正しく打ったキーの数: <GreenText>{correctCount} (前回: {lastResult ? lastResult.correctCount : 0})<br/></GreenText>
                  ・平均キータイプ数: <GreenText>{formattedAverageKeystrokes} (前回: {lastResult ? Number(lastResult.averageKeystrokes).toFixed(1) : '0.0'})回/秒<br/></GreenText>
                  ・ミスタイプ数: <GreenText>{mistypeCount} (前回: {lastResult ? lastResult.mistypeCount : 0})<br/></GreenText>
                  ・正確率: <GreenText>{formattedAccuracy} (前回: {lastResult ? Number(lastResult.accuracy).toFixed(2) : '0.00'})%</GreenText>%
                </TextInfo>
              <ReturnButton onClick={handlePlayButtonClick}>タイトルに戻る</ReturnButton>
            </BlackBoxContainer>
        </Container>
    </>
  );
}

export default Result;

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

const GreenText = styled.span`
  color: #008000;
`;

const TextInfo = styled.div`
  position: absolute;
  left: 91px;
  top: 205px;
  color: white;
  font-size: 20px;
  font-family: Arial;
  font-weight: 400;
  word-wrap: break-word;
`;