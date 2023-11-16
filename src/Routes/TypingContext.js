// TypingContext.js
import React, { createContext, useState } from 'react';

export const TypingContext = createContext();

export const TypingProvider = ({ children }) => {
  const [typingData, setTypingData] = useState({
    elapsedTime: 0,
    correctKeystrokes: 0,
    averageKeystrokes: 0,
    mistypes: 0,
    accuracy: 0,
  });

  return (
    <TypingContext.Provider value={{ typingData, setTypingData }}>
      {children}
    </TypingContext.Provider>
  );
};