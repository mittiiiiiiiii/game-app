import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate をインポート

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const BackgroundContainer = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
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
`;

const TitleText = styled.div`
  width: 179px;
  height: 45px;
  position: absolute;
  left: 260px;
  top: 52px;
  text-align: center;
  color: white;
  font-size: 40px;
  font-family: Impact;
  font-weight: 400;
`;

const SubtitleText = styled.div`
  width: 292px;
  height: 19px;
  position: absolute;
  left: 204px;
  top: 204px;
  color: white;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
`;

const PlayButtonContainer = styled.div`
  width: 100px;
  height: 45px;
  position: absolute;
  left: 300px;
  top: 329px;
`;

const PlayButton = styled.div`
  width: 100px;
  height: 45px;
  position: absolute;
  background: #008000;
`;

const PlayButtonText = styled.div`
  width: 84px;
  height: 18px;
  position: absolute;
  left: 8px;
  top: 12px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
`;

function Start() {
  const navigate = useNavigate(); // useNavigate フックを使用

  // PlayButton をクリックした時の処理
  const handlePlayButtonClick = () => {
    navigate('/game'); // '/game' にナビゲート
  };
  return (
    <>
      <GlobalStyle />
      <BackgroundContainer>
        <TitleLabel>
          <TextContainer data-testid="title-label">NS-TYPING</TextContainer>
        </TitleLabel>
        <StyledDiv>
          <BlackBox />
          <TitleText data-testid="subtitle-text">NS-TYPING<br/></TitleText>
          <SubtitleText>数字・記号専用のタイピング練習ゲーム<br/></SubtitleText>
          <PlayButtonContainer>
          <PlayButton onClick={handlePlayButtonClick}> {/* onClick イベントを追加 */}
            <PlayButtonText>プレイする</PlayButtonText>
          </PlayButton>
        </PlayButtonContainer>
        </StyledDiv>
      </BackgroundContainer>
    </>
  );
}

export default Start;
