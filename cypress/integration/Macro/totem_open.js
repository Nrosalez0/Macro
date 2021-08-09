/// <reference types="cypress" /> 

//import indexPage from "../../support/index"
//import action from "../../support/commands"
beforeEach ( ()=>{
    cy.restoreLocalStorageCache()
})
afterEach ( ()=>{
    cy.saveLocalStorageCache()
})
describe('Now Serving Module',()=>{
    describe('Open Macro QMS',()=>{
        it('Open Whyline',()=>{
            cy.fixture('agendas.json').then((url)=>{
                cy.visit(url.macroDev, {setTimeout : 3000})
            })
        })
        it('Log in',()=>{
            cy.macroLoginPageValidation().macroAdminLogin()
        }) 
    })
    describe('Loading...',()=>{
        it('Loading...',()=>{
            cy.qmsLoader()
        })
    })
    describe('QMS basic validations',() => {
        it('Validations',()=>{
            cy.qmsValidations()
        })
        it('Search Org',()=>{
            // Search Org. (with single place)
            cy.qmsSearchOrg('testing') // Org name
            cy.get('[tooltip-enable="!organization.canUseOrganization"] > .container-skewed > .ng-scope').click().wait(4000)
            // Search place 
            //cy.get('.buttons').should('contain','Use this place')
            //cy.get('[ng-class="{"disabled": disabledForPlace(place._id)}"]').click()
            cy.get('.big-list > li.ng-scope').find('.container-skewed').contains('this place').click().wait(4000) //
        })
        it('Open Totem', ()=>{
            cy.get('.ng-scope').find('[ui-sref="app.totems"]').click()
            cy.get('.big-list').find('.buttons.pull-right').contains('Open').trigger('mouseover',{force: true}).invoke('show').click({force: true}) //.contains('totem')
            //cy.get('.ng-scope').shoud('be.disabled').contains('open').click() // Find Totem name
        })
    })
})
