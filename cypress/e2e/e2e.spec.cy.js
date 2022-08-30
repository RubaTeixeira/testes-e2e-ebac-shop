/// <reference types="cypress" />

import CadastroPage from '../support/page-objects/cadastro.page'
import { faker } from '@faker-js/faker'
const dadosCadastro = require('../fixtures/dados.cadastro.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        let emailFaker = faker.internet.email(dadosCadastro[0].nome, dadosCadastro[0].sobrenome)

        //Rotina 1 - Escolher, personalizar e adicionar produtos ao carrinho
        cy.addProdutos('Ajax Full-Zip Sweatshirt', 'M', 'Green', 1)
        cy.addProdutos('Apollo Running Short', '36', 'Black', 1)
        cy.addProdutos('Argus All-Weather Tank', 'L', 'Gray', 1)
        cy.addProdutos('Arcadio Gym Short', '36', 'Blue', 1)

        //Rotina 2 - Acessar carrinho para visualizar produtos, ir para o checkout    
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()
        cy.screenshot()
        cy.get('.checkout-button').click()

        //Rotina 3 - Preencher dados de cadastro, criar login e finalizar a compra
        CadastroPage.dadosFaturamento(
            dadosCadastro[0].nome,
            dadosCadastro[0].sobrenome,
            dadosCadastro[0].pais,
            dadosCadastro[0].endereco,
            dadosCadastro[0].numero,
            dadosCadastro[0].cidade,
            dadosCadastro[0].estado,
            dadosCadastro[0].cep,
            dadosCadastro[0].telefone
        )

        cy.get('#billing_email').type(emailFaker)
        cy.get('#createaccount').click()
        cy.get('#account_password').type('!teste@teste$')
        cy.get('#terms').click()
        cy.get('#place_order').click().wait(10000)

    });

})