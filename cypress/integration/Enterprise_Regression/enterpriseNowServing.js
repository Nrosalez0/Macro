/// <reference types="cypress" />
import indexPage from "../../support/index"
import action from "../../support/commands"
beforeEach ( ()=>{
    cy.restoreLocalStorageCache()
})
afterEach ( ()=>{
    cy.saveLocalStorageCache()
})
describe('Now Serving Module',()=>{
    it('Open Whyline',()=>{
        cy.fixture('agendas.json').then((url)=>{
            cy.visit(url.enterpriseQms,{setTimeout : 3000})
        })
    })
    it('Log in',()=>{
        cy.loginPageValidation()
        cy.adminLogin().wait(12000)
    })
    it('Loading...',()=>{
        cy.qmsLoader()
    })
    it('QMS Validations',()=>{
        //cy.get('#main-content')
        //cy.qmsValidations()
    })
    it('Search Org / Place',()=>{
        cy.qmsSearchOrg('tst')
        cy.get('.big-list > li.ng-scope').find('.container-skewed').contains('Use this organization').click().wait(4000) //
        // 
        cy.get('.big-list > li.ng-scope').find('.container-skewed').contains('this place').click().wait(4000) //
        cy.get('.left')
        cy.get('.right')
        //cy.get('.ng-scope').find('.ui-sref')
    })
    it('Creating Org User',()=>{
        cy.get('.organization-name').click()
        //cy.get('[ui-sref]').find('.ng-scope').contains('[ui-sref="app.totems"]').click()
        cy.get('.ng-scope').find('[ui-sref="app.organization-users"]').click()
        cy.get('#new').click()
        cy.get('#userName').type('User')
        cy.get('#userLastname').type('001')
        cy.get('#userEmail').type('mauro.rosalez@ahyline.com')
        cy.get('.pull-right > div.ng-scope').click()
        cy.get('#userPassword').type('123123')
        cy.get('#userConfirmPassword').type('123123')
        cy.get('.modal-footer').find('.blockSaveButton').click()
        cy.get('.icon-close').click()
    })
    it('Creating Place User',()=>{
        //cy.get('.ng-scope').find('.ui-sref')
        cy.get('.organization-name').click()
        //cy.get('[ui-sref]').find('.ng-scope').contains('[ui-sref="app.totems"]').click()
        cy.get('.ng-scope').find('[ui-sref="app.users"]').click()
        cy.get('#new').click()
        cy.get('#userName').type('User')
        cy.get('#userLastname').type('001')
        cy.get('#userEmail').type('mauro.rosalez@ahyline.com')
        cy.get('.permissions').contains('administrator').click()
        cy.get('.pull-right > div.ng-scope').click()
        cy.get('#userPassword').type('123123')
        cy.get('#userConfirmPassword').type('123123')
        cy.get('.modal-footer').find('.buttons').contains('Save').click()
        //cy.get('.icon-close').click()
    })
})
