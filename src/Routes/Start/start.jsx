import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import { GlobalStyle,Container, Background, Header, BlackBoxContainer } from '../../utils/StyledComponents';

const Start = ({ setGameStarted }) => {
  const navigate = useNavigate();

  //Gameコンポーネントに遷移
  const handlePlayButtonClick = () => {
    setGameStarted(true);
    navigate('/game');
  };

  return (
    <>
      <GlobalStyle />
        <Container>
          <Background/>
            <Header data-testid="header-label">NS-TYPING</Header>
            <BlackBoxContainer>
              <Title data-testid="title-label">NS-TYPING</Title>
              <Description>数字・記号専用のタイピング練習ゲーム</Description>
              <PlayButton onClick={handlePlayButtonClick}>プレイする</PlayButton>
            </BlackBoxContainer>
        </Container>
    </>
  );
};

export default Start;

const Title = styled.div`
  width: 179px;
  height: 45px;
  position: absolute;
  left: 260px;
  top: 52px;
  color: white;
  font-size: 40px;
  font-family: Impact;
  text-align: center;
`;

const Description = styled.div`
  width: 292px;
  height: 19px;
  position: absolute;
  left: 204px;
  top: 204px;
  color: white;
  font-size: 16px;
  font-family: Arial;
  text-align: center;
`;

const PlayButton = styled.div`
  width: 100px;
  height: 45px;
  position: absolute;
  left: 300px;
  top: 329px;
  background: #008000;
  color: white;
  font-size: 16px;
  font-family: Arial;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;