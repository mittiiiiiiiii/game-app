import React ,{useEffect,} from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { GlobalStyle,Container, Background, Header, BlackBoxContainer } from '../../utils/StyledComponents';

// コンポーネント定義
const Result = ({ gameStarted }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { elapsedTime = 0, correctCount = 0, mistypeCount = 0, accuracy = 0, averageKeystrokes = 0 } = location.state;
  
  //不正なアクセスを禁止する
  useEffect(() => {
    if (!gameStarted || !location.state) {
      navigate('/');
    }
  }, [gameStarted, location.state, navigate]);

  // 数値を小数点第一位までに丸める
  const formattedAverageKeystrokes = Number(averageKeystrokes).toFixed(1);
  const formattedAccuracy = Number(accuracy).toFixed(1);

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
                  ・経過時間: <GreenText>{elapsedTime}秒<br/></GreenText>
                  ・正しく打ったキーの数: <GreenText>{correctCount}<br/></GreenText>
                  ・平均キータイプ数: <GreenText>{formattedAverageKeystrokes}</GreenText>回/秒<br/>
                  ・ミスタイプ数: <GreenText>{mistypeCount}<br/></GreenText>
                  ・正確率: <GreenText>{formattedAccuracy}</GreenText>%
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