import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Start from './Routes/Start/start'; // Startコンポーネントの正しいパスを設定してください

describe('スタイルの変更を検出', () =>{
  test('Startコンポーネントのスタイルがスナップショットと一致するか', () => {
    const { container } = render(<Start />);
    expect(container).toMatchSnapshot();
  });
});

describe('Start コンポーネント', () => {
  test('期待されたテキストで正しくレンダリングされる', () => {
    render(<Start />);
    const titleLabel = screen.getByTestId('title-label');
    const subtitleLabel = screen.getByTestId('subtitle-text');
    const text = screen.getByText('数字・記号専用のタイピング練習ゲーム');

    // テキストの存在を確認
    expect(titleLabel).toBeInTheDocument();

    // テキストが見えることを確認
    expect(titleLabel).toBeVisible();
    
    expect(subtitleLabel).toBeInTheDocument();
    expect(subtitleLabel).toBeVisible();

    expect(text).toBeInTheDocument();
    expect(text).toBeVisible();

  });
  test('プレイボタンが存在するか', () => {
    render(<Start />);
    //const playButton = screen.getByRole('button', { name: /プレイする/i, hidden: true });
    const playButton = screen.getByText(/プレイする/i);
    expect(playButton).toBeInTheDocument();
  });
});

