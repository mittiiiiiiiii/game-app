import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter,BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Game from './game';
import Start from '../Start/start'
import Result from '../Result/result';
import { server } from '../../mocks/server'

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('Game コンポーネント', () => {
    test('10回正解後に Result に遷移する', async () => {

        render(
            <MemoryRouter initialEntries={['/game']}>
                <Routes>
                    <Route path="/game" element={<Game gameStarted={true} />} />
                    <Route path="/result" element={<Result gameStarted={true} />} />
                </Routes>
            </MemoryRouter>
        );

        for (let i = 0; i < 10; i++) {
            const currentSymbol = screen.getByTestId('current-symbol').textContent;
            fireEvent.keyPress(screen.getByTestId('current-symbol'), { key: currentSymbol });
        }

        // Result コンポーネントに遷移後の表示を確認
        await waitFor(() => {
            expect(screen.getByText('結果')).toBeInTheDocument();
        });
    });
});