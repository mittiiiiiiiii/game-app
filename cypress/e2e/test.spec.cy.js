describe('アプリの流れをテスト', () => {
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

    it('Game コンポーネントが正しくレンダリングされる', () => {
        cy.get('[data-testid="header-label"]').should('exist');
        cy.contains('NS-TYPING').should('exist');
        cy.contains('表示された数字または記号のキーを押してください').should('exist');
        cy.contains('問題数: ').should('exist'); 
        cy.contains('正解数: ').should('exist'); 
    });

    it('10問のゲームをプレイして Result に遷移するか確認', () => {
        for (let i = 0; i < 10; i++) {
            cy.get('[data-testid="current-symbol"]').invoke('text').then((currentSymbol) => {
                cy.get('body').type(currentSymbol);
            });
        }
        cy.url().should('include', '/result');
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