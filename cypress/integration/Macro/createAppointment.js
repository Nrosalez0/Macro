beforeEach ( ()=>{
    cy.restoreLocalStorageCache()
})
afterEach ( ()=>{
    cy.saveLocalStorageCache()
})
describe('Creating Appointment', function(){
    it('Open Macro Agenda', function(){
        cy.fixture('agendas.json').then( (url) =>{
            cy.visit(url.macroDev)
        })  
    })
    describe('Agenda basic validations',() => { // ??
        it('Steps validations',()=>{
            // HowManyteps ?
            let howManySteps = 5;   
            cy.stepNumberCheck('1','2','3','4','5')
            // Name and expansion panel header name
            // cy.stepNameCheck('Identification','Choose a place','Select a reason for yout visit','Choose date and time','Enter your information')
            // Step 1 must be available
            cy.get('#mat-expansion-panel-header-0').contains('Identification').should('not.to.be.disabled')
        })
        it('Expansion panels --all steps',()=>{
            cy.get('.mat-expansion-panel-body').should('exist').and('have.length','6')
            
        })
        it('Front Page',()=>{
            // Should be on a new URL which includes '/new'
            cy.url().should('include','/new')
            // Header
            cy.get('wl-header.ng-tns-c0-0 > .mat-toolbar').should('exist')
            // Fluid page
            cy.get('.container-fluid-page').should('exist')
            // Footer
            cy.get('wl-footer.ng-tns-c0-0 > .mat-toolbar').should('exist')
            // Message
            cy.get('.message').should('exist')
            // Logo
            cy.get('.logo').should('exist')
        })
    })
    describe('Steps completition',() => {
        it('Step 1',()=>{
            cy.get('#mat-expansion-panel-header-0').contains('Identification').should('not.to.be.disabled')
            cy.raisedButtonCheck('Continue').should('be.disabled')
            cy.get('#mat-input-0').should('exist').type('99888777') // Ientification field
            cy.get('.mat-radio-group').contains('Male').click(1000)
            cy.raisedButtonClick('Continue')
            cy.get('#mat-input-1').type('Mauro')
            cy.get('#mat-input-2').type('Rosalez')
            cy.raisedButtonClick('Continue')
        })
        it('Location dialog panel', function(){ 
            cy.locationValidation()
            // Buttons
            cy.buttonExist('Yes').buttonExist('No').buttonClick('No').wait(1000)
        })
        it('Step 2',()=>{
            cy.placeCheckBtn('citas').click().raisedButtonClick('Next',{setTimeout:1000})
            
        })
        it('Step 3',()=>{
            cy.get('.area-button').contains('operaciones de caja').click(1000)
            cy.get('[aria-describedby="cdk-describedby-message-5"] > .mat-raised-button > .mat-button-wrapper').click()
            
            
        })
        it('Step 4',()=>{
            cy.get('.date-container').eq(0).click() // slot.ng-star-inserted
            cy.get('.slot.ng-star-inserted').eq(0).click()
            cy.get('.last-button').contains('Next').click()
        })
        it('Step 5',()=>{
            cy.get('#mat-input-7').type('1122443355')
            cy.get('#mat-input-8').type('mauro.rosalez@whyline.com')
            cy.get('[aria-describedby="cdk-describedby-message-8"] > .mat-raised-button > .mat-button-wrapper').click()
        })
        it('Step 6',()=>{
            cy.get('.mat-raised-button.mat-primary').contains('Create')
                .should('not.to.be.disabled').click().wait(2000)
        })
        it('Appointment Confirmation',function(){ // sure you yout want to confirm the appointment ??
            cy.get('#mat-dialog-1').should('exist').and('be.visible') // Appointment confirmation dialog popup
            cy.get('#mat-dialog-title-1').should('exist') // Title
            cy.get('.mat-dialog-content').should('exist') // Body content
            cy.get('.mat-dialog-actions').should('contain','Yes').and('contain','No') // Yes / No
            // Buttons
            cy.buttonExist('Yes').buttonExist('No').buttonClick('Yes')
        })
    })
})