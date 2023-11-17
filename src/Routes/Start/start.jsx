import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// グローバルスタイルを追加
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;    // ブラウザのデフォルトマージンをゼロに
    padding: 0;   // ブラウザのデフォルトパディングをゼロに
    overflow: hidden; // スクロールを無効に
  }
`;

const Container = styled.div`
  width: 100vw;   // 画面の幅に合わせる
  height: 100vh;  // 画面の高さに合わせる
  position: relative;
`;

const BackgroundImage = styled.img`
  width: 1440px;
  height: 1024px;
  position: absolute;
  top: 0;
  left: 0;
`;

const InnerContainer = styled.div`
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;             // 親要素に対して左から50%の位置に設定
  top: 160px;
  transform: translateX(-50%); // X軸方向に自身の幅の50%分だけ左に移動
  background: #1E1E1E;
  border: 2px solid yellow;    // 黄色の枠を追加
`;

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

const Header = styled.div`
  width: 100%;  // 親要素の幅に合わせる
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  background: #008000;
  color: white;
  font-size: 70px;
  font-family: Impact;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 3.5px;
`;


// コンポーネント定義
const Start = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <BackgroundImage src="https://via.placeholder.com/1440x1024" />
        <InnerContainer>
          <Title>NS-TYPING</Title>
          <Description>数字・記号専用のタイピング練習ゲーム</Description>
          <PlayButton>プレイする</PlayButton>
        </InnerContainer>
        <Header>NS-TYPING</Header>
      </Container>
    </>
  );
};

export default Start;
