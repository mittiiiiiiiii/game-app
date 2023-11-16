import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from '../Routes/Start/index';
import Game from '../Routes/Game/index';
import Result from '../Routes/Result/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* スタートページ */}
        <Route path="/" element={<Start />} />

        {/* ゲームページ */}
        <Route path="/game" element={<Game />} />

        {/* 結果ページ */}
        <Route path="/result" element={<Result />} />

        {/* 未定義のパスにアクセスした場合、スタートページへリダイレクト */}
        {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
