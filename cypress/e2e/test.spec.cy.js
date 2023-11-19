describe('アプリのルーティング', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('デフォルトでStartコンポーネントにナビゲートする', () => {
    cy.url().should('include', '/');
  });

  it('存在しないルートにアクセスするとスタートページにリダイレクトされる', () => {
    cy.visit('/some/unknown-route');
    cy.url().should('include', '/');
    cy.contains('スタートページの特定のテキスト'); // スタートページの特定のテキストを入れる
  });

  describe('Start Page', () => {
    it('正しくレンダリングされる', () => {
      cy.contains('NS-TYPING'); // ヘッダーのテキストを確認
      cy.contains('数字・記号専用のタイピング練習ゲーム'); // 説明文を確認
    });
  
    it('プレイボタンをクリックするとGameコンポーネントに遷移する', () => {
      cy.contains('プレイする').click(); // プレイボタンをクリック
      cy.url().should('include', '/game'); // URLがゲームページに変更されたことを確認
    });
  });
});
