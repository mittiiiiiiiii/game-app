import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// コンポーネント定義
const Start = () => {
  return (
    <>
      <GlobalStyle />
        <Container>
          <Background/>
            <Header data-testid="header-label">NS-TYPING</Header>
            <BlackBoxContainer>
              
            </BlackBoxContainer>
        </Container>
    </>
  );
};

export default Start;

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

const Background = styled.div`
  box-sizing: border-box;
  width: 100vw; 
  min-height: 100vh; 
  padding: 150px 200px 0px;
  background-color: rgb(222, 222, 222);
  background-image: linear-gradient(rgb(236, 235, 235) 50%, transparent 50%, transparent);
  background-size: 5px 5px;
  position: relative;
  display: flex;
  justify-content: center;
`;


const BlackBoxContainer = styled.div`
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;             // 親要素に対して左から50%の位置に設定
  top: 160px;
  transform: translateX(-50%); // X軸方向に自身の幅の50%分だけ左に移動
  background: #1E1E1E;
  border: 10px solid yellow;    // 黄色の枠を追加
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
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 1); // 完全に不透明な黒の影
`;