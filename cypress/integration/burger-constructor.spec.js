const url = "http://localhost:3000";

describe('Проверка burger-constructor', function() {
    it('Запуск сервера по адресу localhost:3000', function() {
        cy.visit(url);
    });

    it('Открытие модального окна с данными об ингредиенте и его закрытие', () => {
        cy.get('[data-test="60d3b41abdacab0026a733cd"]').click();
        cy.location('pathname').should('eq', '/ingredients/60d3b41abdacab0026a733cd');
        cy.get('[data-test="modal"]').should('exist');
        cy.get('[data-test="modal-header"]').find('svg').click();
        cy.get('[data-test="modal"]').should('not.exist');
    });

    it('Перетаскивание ингредиентов в конструктор', () => {
        const dataTransfer = new DataTransfer();

        //Добавление булки
        cy.get('[data-test="60d3b41abdacab0026a733c6"]').trigger('dragstart', { dataTransfer });
        cy.get('[data-test="constructor"]').trigger('drop', { dataTransfer });

        //Добавление соуса
        cy.get('[data-test="60d3b41abdacab0026a733cd"]').trigger('dragstart', { dataTransfer });
        cy.get('[data-test="constructor"]').trigger('drop', { dataTransfer });

        //Добавление начинки
        cy.get('[data-test="60d3b41abdacab0026a733c9"]').trigger('dragstart', { dataTransfer });
        cy.get('[data-test="constructor"]').trigger('drop', { dataTransfer });
    });

    it('Проверка стоимости заказа', () => {
        cy.get('[data-test="order-price"]').should('contain', '3927');
    });

    it('Переход на страницу логина', () => {
        cy.contains('Оформить заказ').should('be.enabled').click();
        cy.location('pathname').should('eq', '/login');
        cy.get('input[type=email]').click().type('sveta2@sveta2.ru');
        cy.get('input[type=password]').click().type('qwerty123');
        cy.contains('Войти').click();
    });

    it('Оформление заказа и открытие модального окна заказа', () => {
        cy.location('pathname').should('eq', '/');
        cy.contains('Оформить заказ').should('be.enabled').click();
        cy.get('[data-test="modal"]', { timeout: 20000 }).should('exist');
    });

    it('Закрытие модального окна заказа', () => {
        cy.get('[data-test="modal-header"]').find('svg').click();
        cy.get('[data-test="modal"]').should('not.exist');
    });
});