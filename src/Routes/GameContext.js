// GameContext.js
import React, { createContext, useReducer } from 'react';

// 初期状態
const initialState = {
  questionCount: 0,
  correctCount: 0,
};

// リデューサー
function gameReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT_QUESTION':
      return { ...state, questionCount: state.questionCount + 1 };
    case 'INCREMENT_CORRECT':
      return { ...state, correctCount: state.correctCount + 1 };
    default:
      return state;
  }
}

// コンテキストの作成
const GameContext = createContext();

// プロバイダーコンポーネント
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
