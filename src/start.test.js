import React from 'react';
import { render, screen}from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom';
import Start from './Routes/Start/start';
import Game from './Routes/Game/game';
import Result from './Routes/Result/result';

describe('スタイルの変更を検出', () =>{
  test('Startコンポーネントのスタイルがスナップショットと一致するか', () => {
    const { container } = render(<Router><Start /></Router>);
    expect(container).toMatchSnapshot();
  });
  test('Gameコンポーネントのスタイルがスナップショットと一致するか', () => {
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });
  test('Resultコンポーネントのスタイルがスナップショットと一致するか', () => {
    const { container } = render(<Result />);
    expect(container).toMatchSnapshot();
  });
});

describe('Start コンポーネント', () => {
  test('期待されたテキストで正しくレンダリングされる', () => {
    render(<Router><Start /></Router>);
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
    render(<Router><Start /></Router>);
    //const playButton = screen.getByRole('button', { name: /プレイする/i, hidden: true });
    const playButton = screen.getByText(/プレイする/i);
    expect(playButton).toBeInTheDocument();
  });
});

