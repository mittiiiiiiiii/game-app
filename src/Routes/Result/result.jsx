import React from 'react';
import styled from 'styled-components';

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
  text-shadow: 2px 2px black; // 完全に不透明な黒に更新
`;


function Result() {
  return (
    <TitleLabel>
      <TextContainer>NS-TYPING</TextContainer>
    </TitleLabel>
  );
}

export default Result;