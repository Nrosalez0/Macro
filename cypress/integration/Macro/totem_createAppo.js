/// <reference types="cypress" /> 

//import indexPage from "../../support/index"
//import action from "../../support/commands"
beforeEach ( ()=>{
    cy.restoreLocalStorageCache()
})
afterEach ( ()=>{
    cy.saveLocalStorageCache()
})
describe('Totem - Creat appointment',()=>{
    it('Opening Totem',()=>{
        cy.fixture('agendas.json').then( (url)=>{
            cy.visit(url.macroTotem).wait(2000)
        })
    })
    it('Enter ID',()=>{
        cy.get('#mat-input-1').type('11222333') // Typing ID
        cy.get('.btn').contains('Continue').click().wait(3000)
        //cy.get('.btn-next').should('be.disabled')
        //  cy.get('app-gender.ng-star-inserted').find('.btn').contains('Continue').should('be.disabled')
        cy.get('.service-text').contains('Male').click()
        cy.get('.btn').contains('Continue').click().wait(3000)
    })
})