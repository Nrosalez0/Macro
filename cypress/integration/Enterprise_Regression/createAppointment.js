/// <reference types="cypress" />
import indexPage from "../../support/index"
import action from "../../support/commands"

//for (let i=0; i <2;i++) {
beforeEach ( ()=>{
    cy.restoreLocalStorageCache()
})
afterEach ( ()=>{
    cy.saveLocalStorageCache()
})
describe('Appointment Reservation',()=>{
    describe('Open Whyline Agenda web',()=>{
        it('Opening agenda',()=>{
            cy.fixture('agendas.json').then((url)=>{
                cy.visit(url.enterprise).wait(3000)
            })
        })
        it('Select "Create appointment"',()=>{
            action.raisedButtonClick('Create an appointment')
        })
    })
    describe('Location config',function(){
        it('Location dialog panel', function(){ 
            cy.locationValidation()
            // Buttons
            cy.buttonExist('Yes').buttonExist('No')
            cy.buttonClick('No').wait(2000)
        })
    })
    describe('Loading...',()=>{
        it('Loader',()=>{
            cy.loading().wait(3000)
        })
    })
    describe('Agenda basic validations',() => { // ??
        it('Steps validations',()=>{ 
            // HowManyteps ?
            let howManySteps = 5;
            cy.stepNumberCheck('1','2','3','4','5')
            // Name and expansion panel header name
            cy.stepNameCheck('Choose a place','Choose a service','Choose date and time','Enter your information','Check the information provided')
            // Step 1 must be available
            cy.get('#mat-expansion-panel-header-0').contains('Choose a place').should('not.to.be.disabled')
        })
        it('Expansion panels --all steps',()=>{
            cy.get('.mat-expansion-panel-body').should('exist').and('have.length','5')
            cy.buttonExist('More filters')
        })
        it('Front Page',()=>{
            // Should be on a new URL which includes '/new'
            cy.url().should('include', '/new')
            // Header
            cy.get('wl-header.ng-tns-c0-0 > .mat-toolbar').should('exist')
            // Background
            cy.get('.whyline-bg').should('exist')
            // Fluid page
            cy.get('.container-fluid-page').should('exist')
            // Footer
            cy.get('wl-footer.ng-tns-c0-0 > .mat-toolbar').should('exist')
        })
    })
    describe('Step 1: Choose a place', ()=>{
        it('Body validations',function(){
            // Search field wrapper
            cy.get('.mat-form-field-wrapper').should('exist')
            // Search place field --input
            cy.get('#mat-input-0').should('exist').clear()
            // Next button Step 1 - not available
            cy.buttonExist('Next') //
            cy.get('[aria-describedby="cdk-describedby-message-1"] > .mat-raised-button').should('contain','Next').and('be.disabled') //
            // Header Step 1
            cy.get('#mat-expansion-panel-header-0').contains('Choose a place').should('not.to.be.disabled')
        })
        it('Searching place',()=>{
            //cy.get('.mat-form-field-wrapper').type('tst')
            indexPage.searchPlace('tst', {setTimeout : 3000}) // Search place by name using radio button
            //Next button Step 1 - Available
            cy.get('[aria-describedby="cdk-describedby-message-1"] > .mat-raised-button').should('contain','Next').and('not.to.be.disabled').click() //
        })
    })
    describe('Step 2: Choose a Service', function(){
        it('Search and select scheme tree',function(){
            // Next button available
            cy.get('.mat-button-wrapper').contains('Next')  //expect('next').not.to.be.disabled
            //cy.get('.mat-button-wrapper').should('have.focus')   // visible')
            // Expansion panel
            cy.get('.mat-tree-node').should('exist') // tree node should exist
            cy.get('.mat-expansion-panel-body').should('exist') // Check...
            //Next
            cy.get('.mat-button-focus-overlay').should('exist') // Check...
            //cy.get('.mat-expansion-panel-body').contains('Next') //Check...
            //cy.get('.mat-button-wrapper').contains('Next').click()
            cy.get('[aria-describedby="cdk-describedby-message-3"] > .mat-raised-button > .mat-button-wrapper').click()
        })
    })   
    describe('Step 3: Choose Date and Time', function(){
        it('Search and select available slot',function(){
            // Expansion panel
            cy.get('.mat-tree-node').should('exist') // tree node should exist
            cy.get('.mat-expansion-panel-body').should('exist') // Check...
            cy.get('.mat-datepicker-toggle').should('exist') // First available date
            cy.get('.mat-select-placeholder').should('exist').click() // First available hour / Choose time
            cy.get('#mat-option-0 > .mat-option-text').click() // 
            //Next button 
            cy.get('.mat-button-focus-overlay').should('exist')
            cy.get('[aria-describedby="cdk-describedby-message-5"] > .mat-raised-button > .mat-button-wrapper').contains('Next').click() // Check...
        })
    })        
    describe('Step 4: Enter your information',function(){
        it('Complete personal information',function(){
            let name = 'Name'

            //cy.get('.mat-form-field').contains('label','First name').should('exist').invoke('val',name) //type('Name')
            //cy.get('.mat-form-field-wrapper').contains('label','First name').find('#mat-form-field-label').type('Nombre', {force:true})
            cy.get('#mat-input-3').should('exist').type('Nombre')  // Verify firstName field before type
            cy.get('#mat-input-4').should('exist').type('Apellido')  // Verify lastName field before type
            cy.get('#mat-input-5').should('exist').type('22333444')  // Verify dni field before type
            cy.get('#mat-input-6').type('1122334455')  // Verify phoneNumber field before type
            cy.get('#mat-input-2').type('mauro.rosalez@whyline.com')  // Verify mail field before type
            //Next button available
            cy.get('.mat-button-focus-overlay').should('exist').and('not.to.be.disabled')
            cy.get('.mat-action-row > .mat-raised-button > .mat-button-wrapper').should('exist').contains('Next').click()
            //cy.get('#mat-raised-button mat-primary').should('exist')
            //
        })
    })
    describe('Step 5: Check the information provided',function(){
        it('Accept Terms & Conditions',function(){
            cy.get('.mat-raised-button.mat-primary')
                .should('be.disabled').and('contain','Create')
            indexPage.acceptTerms()
        })
        it('Create appointment',function(){
            cy.get('.mat-action-row > .mat-raised-button > .mat-button-wrapper').should('exist').contains('Create').click() // Create button 
            cy.get('.mat-dialog-actions > :nth-child(2) > .mat-button-wrapper').should('exist').click() 
        })
    })
    describe('Tracking confirmation',function(){
        it('Confirm appointment',function(){
            cy.wait(2500)
            //cy.get('.status > .ng-tns-c37-40').should('exist').contains('Confirmed') // Confirmed status displayed
            cy.get('.status-container').should('exist').contains('Confirmed')
            // Edit button highlighted
            cy.get('.container-fluid > :nth-child(2) > .mat-button-wrapper')
                .should('exist').contains('Edit') 
            // Cancel appointment button 
            cy.get('.mat-warn > .mat-button-wrapper')
                .should('exist').contains('Cancel') 
             // Check-in
             cy.get('.container-fluid > :nth-child(1) > .mat-button-wrapper')
                .contains('Confirm').should('exist')
                    .click() // Confirm appointment button  
        })
        it('Appointment Confirmation',function(){ // sure you yout want to confirm the appointment ??
            cy.get('#mat-dialog-2').should('exist').and('be.visible') // Appointment confirmation dialog popup
            cy.get('#mat-dialog-title-2').should('exist') // Title
            cy.get('.mat-dialog-content').should('exist') // Body content
            cy.get('.mat-dialog-actions').should('contain','Yes').and('contain','No') // Yes / No
            // Buttons
            cy.buttonExist('Yes')
            cy.buttonExist('No')
            cy.buttonClick('Yes')
            //cy.get('.mat-dialog-actions > :nth-child(2) > .mat-button-wrapper').should('exist').contains('Yes').click() // Confirm YES
        })
    })    
})

//}