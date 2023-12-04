describe('Result コンポーネントのテスト', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.contains('プレイする').click();
      for (let i = 0; i < 10; i++) {
        cy.get('[data-testid="current-symbol"]').invoke('text').then((currentSymbol) => {
          cy.get('body').type(currentSymbol);
        });
      }
    });
    
    it('Result コンポーネントが正しくレンダリングされる', () => {
      cy.url().should('include', '/result');
      cy.get('[data-testid="header-label"]').should('exist');
      cy.contains('NS-TYPING').should('exist');
      cy.contains('結果').should('exist');
      cy.contains(`・経過時間:`).should('exist');
      cy.contains(`・正しく打ったキーの数:`).should('exist');
      cy.contains(`・平均キータイプ数:`).should('exist');
      cy.contains(`・ミスタイプ数:`).should('exist');
      cy.contains(`・正確率:`).should('exist');
    });
    it('Result から「タイトルに戻る」ボタンで Start コンポーネントに遷移する', () => {
      cy.contains('タイトルに戻る').click();
      cy.url().should('include', '/');
      cy.get('[data-testid="title-label"]').should('exist');
    });
  });