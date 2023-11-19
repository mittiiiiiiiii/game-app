describe('アプリのルーティング', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('デフォルトでスタートページにナビゲートする', () => {
    cy.url().should('include', '/');
  });

  describe('Start Page', () => {
    it('正しくレンダリングされる', () => {
      cy.contains('NS-TYPING'); // ヘッダーのテキストを確認
      cy.contains('数字・記号専用のタイピング練習ゲーム'); // 説明文を確認
    });
  
    it('プレイボタンをクリックするとゲームページに遷移する', () => {
      cy.contains('プレイする').click(); // プレイボタンをクリック
      cy.url().should('include', '/game'); // URLがゲームページに変更されたことを確認
    });
  });
});
