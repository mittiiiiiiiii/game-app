describe('アプリの流れのテスト', () => {

    it('レンダリングとコンポーネント遷移のテスト', () => {
        cy.visit('/');
        cy.get('[data-testid=header-label]').should('be.visible').and('have.text', 'NS-TYPING');
        cy.get('[data-testid=title-label]').should('be.visible').and('have.text', 'NS-TYPING');
        cy.contains('数字・記号専用のタイピング練習ゲーム').should('be.visible');

        cy.contains('プレイする').should('be.visible').click();
        cy.url().should('include', '/game'); 
        cy.get('[data-testid="header-label"]').should('exist');
        cy.contains('NS-TYPING').should('exist');
        cy.contains('表示された数字または記号のキーを押してください').should('exist');
        cy.contains('問題数: ').should('exist'); 
        cy.contains('正解数: ').should('exist'); 

        for (let i = 0; i < 10; i++) {
            cy.get('[data-testid="current-symbol"]').invoke('text').then((currentSymbol) => {
                cy.get('body').type(currentSymbol);
            });
        }
        cy.url().should('include', '/result');

        cy.contains('タイトルに戻る').click();
        cy.url().should('include', '/');
        cy.get('[data-testid="title-label"]').should('exist');
    });
});

describe('Game コンポーネントからStartコンポーネントに戻るかテスト', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('プレイする').click();
        cy.url().should('include', '/game');
    });

    it('「タイトルに戻る」ボタンをクリックすると Start コンポーネントに遷移する', () => {
        cy.contains('タイトルに戻る').should('exist').click();
        cy.url().should('include', '/');
        cy.get('[data-testid="title-label"]').should('exist');
    });
});