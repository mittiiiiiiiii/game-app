describe('Game コンポーネントのテスト', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('プレイする').click();
        cy.url().should('include', '/game');
    });
    
    it('Game コンポーネントが正しくレンダリングされる', () => {
        cy.get('[data-testid="header-label"]').should('exist');
        cy.contains('NS-TYPING').should('exist');
        cy.contains('表示された数字または記号のキーを押してください').should('exist');
        cy.contains('問題数: ').should('exist'); 
        cy.contains('正解数: ').should('exist'); 
    });

    it('「タイトルに戻る」ボタンをクリックすると Start コンポーネントに遷移する', () => {
        cy.contains('タイトルに戻る').should('exist').click();
        cy.url().should('include', '/');
        cy.get('[data-testid="title-label"]').should('exist');
    });

    it('もう一度 Game コンポーネントへ遷移', () => {
        cy.visit('/');
        cy.contains('プレイする').click();
        cy.url().should('include', '/game');
    });

    it('10問のゲームをプレイして Result に遷移するか確認', () => {
        for (let i = 0; i < 10; i++) {
            cy.get('[data-testid="current-symbol"]').invoke('text').then((currentSymbol) => {
                cy.get('body').type(currentSymbol);
            });
        }
        cy.url().should('include', '/result');
    });
});