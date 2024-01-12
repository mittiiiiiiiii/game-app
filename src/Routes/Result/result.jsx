import React ,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { GlobalStyle,Container, Background, Header, BlackBoxContainer } from '../../utils/StyledComponents';
import axios from 'axios';

const saveResult = async (result) => {
  const response = await axios.post('http://koske-game.nip.io/db/results/save', result);
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
  
  //不正なアクセスを禁止する
  useEffect(() => {
    const fetchAndSaveResult = async () => {
      if (!gameStarted || !location.state) {
        navigate('/');
      } else {
        const response = await axios.get('http://koske-game.nip.io/db/results/last'); // 結果を保存する前に最新の結果を取得
        setLastResult(response.data);
        const result = {
          elapsedTime,
          correctCount,
          mistypeCount,
          accuracy,
          averageKeystrokes
        };
        await saveResult(result);
      }
    };
    fetchAndSaveResult();
  }, [accuracy, averageKeystrokes, correctCount, elapsedTime, gameStarted, location.state, mistypeCount, navigate]);
  
  const formattedElapsedTime = formatTime(elapsedTime);
  const formattedAccuracy = Number(accuracy).toFixed(2);
  const formattedAverageKeystrokes = Number(averageKeystrokes).toFixed(1);

  //Startコンポーネントに遷移
  const handlePlayButtonClick = () => {
    navigate('/');
  };

  return (
    <React.StrictMode>
      <>
        <GlobalStyle />
          <Container>
            <Background/>
              <Header data-testid="header-label">NS-TYPING</Header>
              <BlackBoxContainer>
                <ResultTitle>結果</ResultTitle>
                  <TextInfo>
                    ・経過時間: <GreenText>{formattedElapsedTime}</GreenText> (<GreenText>{lastResult ? formatTime(lastResult.elapsedTime) : '00:00:00'}</GreenText>)<br/>
                    ・正しく打ったキーの数: <GreenText>{correctCount}</GreenText> (<GreenText>{lastResult ? lastResult.correctCount : 0}</GreenText>)<br/>
                    ・平均キータイプ数: <GreenText>{formattedAverageKeystrokes}</GreenText>回/秒 (<GreenText>{lastResult ? Number(lastResult.averageKeystrokes).toFixed(1) : '0.0'}</GreenText>回/秒)<br/>
                    ・ミスタイプ数: <GreenText>{mistypeCount}</GreenText> (<GreenText>{lastResult ? lastResult.mistypeCount : 0}</GreenText>)<br/>
                    ・正確率: <GreenText>{formattedAccuracy}</GreenText>% (<GreenText>{lastResult ? Number(lastResult.accuracy).toFixed(2) : '0.00'}</GreenText>%)
                  </TextInfo>
                <ReturnButton onClick={handlePlayButtonClick}>タイトルに戻る</ReturnButton>
              </BlackBoxContainer>
          </Container>
      </>
    </React.StrictMode>
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