describe('Start コンポーネントのテスト', () => {
    it('Start コンポーネントが正しくレンダリングされる', () => {
        cy.visit('/');
        cy.get('[data-testid=header-label]').should('be.visible').and('have.text', 'NS-TYPING');
        cy.get('[data-testid=title-label]').should('be.visible').and('have.text', 'NS-TYPING');
        cy.contains('数字・記号専用のタイピング練習ゲーム').should('be.visible');
    });

    it('プレイボタンをクリックすると Game コンポーネントに遷移する', () => {
        cy.visit('/');
        cy.contains('プレイする').should('be.visible').click();
        cy.url().should('include', '/game'); 
        cy.contains('表示された数字または記号のキーを押してください').should('be.visible');
    });
});