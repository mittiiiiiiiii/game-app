import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Start from './start';

describe('Start コンポーネントのテスト', () => {
  test('スタートページのラベルが表示される', () => {
    render(<Start />);
    const titleLabel = screen.getByText('スタートページのラベル');
    expect(titleLabel).toBeInTheDocument();
  });
});
