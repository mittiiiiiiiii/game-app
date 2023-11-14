import React from 'react';
import styled from 'styled-components';

const TitleLabel = styled.div`
  background-color: green;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

function Start() {
  return (
    <div>
      <TitleLabel>スタートページのラベル</TitleLabel>
    </div>
  );
}

export default Start;