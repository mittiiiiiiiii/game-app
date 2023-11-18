import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router , MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Start from './Routes/Start/start';
import Game from './Routes/Game/game';
import Result from './Routes/Result/result';

// テスト用の初期データ
const initialState = {
  elapsedTime: "00:14:26",
  correctCount: 10,
  averageKeystrokes: 0.7,
  mistypeCount: 4,
  accuracy: 71.43,
};

describe('Start コンポーネント', () => {
  // 期待されたテキストで正しくレンダリングされるかのテスト
  test('期待されたテキストで正しくレンダリングされる', () => {
    render(<Router><Start /></Router>);

     // Header のテキストをテスト
    const headerLabel = screen.getByTestId('header-label');
    expect(headerLabel).toBeInTheDocument();
    expect(headerLabel).toBeVisible();
    expect(headerLabel).toHaveTextContent('NS-TYPING');

    // Title のテキストをテスト
    const titleLabel = screen.getByTestId('title-label');
    expect(titleLabel).toBeInTheDocument();
    expect(titleLabel).toBeVisible();
    expect(titleLabel).toHaveTextContent('NS-TYPING');

    // Description のテキストをテスト
    const descriptionText = screen.getByText('数字・記号専用のタイピング練習ゲーム');
    expect(descriptionText).toBeInTheDocument();
    expect(descriptionText).toBeVisible();

  });
  // プレイボタンが存在するかのテスト
  test('プレイボタンが存在するか', () => {
    render(<Router><Start /></Router>);

    // プレイボタンのテキストをテスト
    const playButton = screen.getByText('プレイする');
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeVisible();
  });
});

describe('Game コンポーネント', () => {
  // 期待されたテキストで正しくレンダリングされるかのテスト
  test('期待されたテキストで正しくレンダリングされる', () => {
    render(<Router><Game /></Router>);

    // Header のテキストをテスト
    const headerLabel = screen.getByTestId('header-label');
    expect(headerLabel).toBeInTheDocument();
    expect(headerLabel).toBeVisible();
    expect(headerLabel).toHaveTextContent('NS-TYPING');

    // InstructionText の存在と内容を確認
    const instructionText = screen.getByText('表示された数字または記号のキーを押してください');
    expect(instructionText).toBeInTheDocument();
    expect(instructionText).toBeVisible();

    // QuestionStats の存在と内容を確認
    const questionStats = screen.getByText(/問題数:/);
    expect(questionStats).toBeInTheDocument();
    expect(questionStats).toBeVisible();
  });
  test('リターンボタンが存在するか', () => {
    render(<Router><Game /></Router>);

    // プレイボタンのテキストをテスト
    const playButton = screen.getByText('タイトルに戻る');
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeVisible();
  });
});

describe('Result コンポーネント', () => {
  // 期待されたテキストで正しくレンダリングされるかのテスト
  test('期待されたテキストで正しくレンダリングされる', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: initialState }]}>
        <Result />
      </MemoryRouter>
    );

    // Header のテキストをテスト
    const headerLabel = screen.getByTestId('header-label');
    expect(headerLabel).toBeInTheDocument();
    expect(headerLabel).toBeVisible();
    expect(headerLabel).toHaveTextContent('NS-TYPING');

    // 経過時間、正しく打ったキーの数、平均キータイプ数、ミスタイプ数、正確率のテキストをテスト
    expect(screen.getByText(/経過時間:/)).toBeInTheDocument();
    expect(screen.getByText(/正しく打ったキーの数:/)).toBeInTheDocument();
    expect(screen.getByText(/平均キータイプ数:/)).toBeInTheDocument();
    expect(screen.getByText(/回\/秒/)).toBeInTheDocument();
    expect(screen.getByText(/ミスタイプ数:/)).toBeInTheDocument();
    expect(screen.getByText(/正確率:/)).toBeInTheDocument();
    expect(screen.getByText(/%$/)).toBeInTheDocument();
  });
  test('リターンボタンが存在するか', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: initialState }]}>
        <Result />
      </MemoryRouter>
    );

    // プレイボタンのテキストをテスト
    const playButton = screen.getByText('タイトルに戻る');
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeVisible();
  });
});
