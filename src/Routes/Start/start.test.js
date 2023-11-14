import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Start from './start'; // Startコンポーネントの正しいパスを設定してください

describe('Start コンポーネント', () => {
  test('期待されたテキストで正しくレンダリングされる', () => {
    render(<Start />);
    const titleLabel = screen.getByText('NS-TYPING');

    // テキストの存在を確認
    expect(titleLabel).toBeInTheDocument();

    // テキストが見えることを確認
    expect(titleLabel).toBeVisible();
  });
});

