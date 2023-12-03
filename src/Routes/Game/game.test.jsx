import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter,BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Game from './game';
import Start from '../Start/start'
import Result from '../Result/result';

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
    test('「タイトルに戻る」ボタンで Start に遷移する', async () => {
        const mockSetGameStarted = jest.fn();

        render(
            <Router>
                <Routes>
                    <Route path="/" element={<Start setGameStarted={mockSetGameStarted} />} />
                    <Route path="/game" element={<Game gameStarted={true} />} />
                </Routes>
            </Router>
        );
    
        // Game コンポーネントに遷移
        fireEvent.click(screen.getByText('プレイする'));
    
        // 「タイトルに戻る」ボタンをクリック
        fireEvent.click(screen.getByText('タイトルに戻る'));
    
        await waitFor(() => {
            expect(screen.getByText('数字・記号専用のタイピング練習ゲーム')).toBeInTheDocument();
        });
    });
    test('10回正解後に Result に遷移する', async () => {

        render(
            <MemoryRouter initialEntries={['/game']}>
                <Routes>
                    <Route path="/game" element={<Game gameStarted={true} />} />
                    <Route path="/result" element={<Result gameStarted={true} />} />
                </Routes>
            </MemoryRouter>
        );

        // 10回の正解後に Result に遷移
        for (let i = 0; i < 10; i++) {
            const currentSymbol = screen.getByTestId('current-symbol').textContent;
            fireEvent.keyPress(screen.getByTestId('current-symbol'), { key: currentSymbol });
            //await waitFor(() => {});
        }

        // Result コンポーネントに遷移後の表示を確認
        await waitFor(() => {
            expect(screen.getByText('結果')).toBeInTheDocument();
        });
    });
});