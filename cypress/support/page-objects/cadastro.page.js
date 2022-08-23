class CadastroPage {

    dadosFaturamento(nome, sobrenome, pais, endereco, numero, cidade, estado, cep, telefone){
        
        cy.get('#billing_first_name').type(nome)
        cy.get('#billing_last_name').type(sobrenome)
        cy.get('#select2-billing_country-container').click().type(pais + '{enter}')
        cy.get('#billing_address_1').type(endereco)
        cy.get('#billing_address_2').type(numero)
        cy.get('#billing_city').type(cidade)
        cy.get('#select2-billing_state-container').click().type(estado + '{enter}')
        cy.get('#billing_postcode').type(cep)
        cy.get('#billing_phone').type(telefone)
        
    }

}

export default new CadastroPage()