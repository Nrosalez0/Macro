/// <reference types="cypress" /> 
class action {
    raisedButtonClick = (buttonName) => {
        cy.fixture('locators.json').then( (locators) =>{ 
            cy.get(locators.raisedbutton).should('exist').and('be.visible').and('not.to.be.disabled')
                .contains(buttonName).click();
        })
    }
}
export default new action();
// Agendas Enterprise
// General Buttons
// ...
// ...
Cypress.Commands.add('loading',()=>{
    cy.fixture('locators.json').then( (locators)=>{
        cy.get(locators.loader).should('exist').and('be.visible') 
        cy.get(locators.svg).should('exist')   
        
    })
})
Cypress.Commands.add('locationValidation', ()=>{
    cy.fixture('locators.json').then( (locators)=>{
        cy.get(locators.locationDialog).should('exist').and('be.visible') // Location dialog popup
        cy.get(locators.locationTitle).should('exist') // Title
        cy.get(locators.locationBody).should('exist') // Body contents
        cy.get(locators.locationAction).should('contain','Yes').and('contain','No') // Yes / No
    })
})
Cypress.Commands.add('stepNameCheck',(stepName1,stepName2,stepName3,stepName4,stepName5)=>{
    cy.fixture('locators.json').then( (locators) => {
        cy.get(locators.stepName).should('exist').and('contain',stepName1)
            .and('contain',stepName2).and('contain',stepName3)
                .and('contain',stepName4).and('contain',stepName5); // For all Steps
        cy.get(locators.stepHeaderName).should('exist').and('contain',stepName1)
            .and('contain',stepName2).and('contain',stepName3)
                .and('contain',stepName4).and('contain',stepName5); // For all Steps
    })
})
Cypress.Commands.add('stepNumberCheck',(stepNum1,stepNum2,stepNum3,stepNum4,stepNum5)=>{
    cy.fixture('locators.json').then( (locators) => {
        cy.get(locators.stepNumber).should('exist').and('contain',stepNum1)
            .and('contain',stepNum2).and('contain',stepNum3)
                .and('contain',stepNum4).and('contain',stepNum5);
    })
})
/// Buttons
Cypress.Commands.add('buttonExist', (buttonName) =>{
    cy.fixture('locators.json').then( (locators) =>{
        cy.get(locators.buttonWrapper).contains(buttonName).should('exist')
            .and('be.visible').and('not.to.be.disabled')
    })
})
Cypress.Commands.add('buttonClick', (buttonName)=>{
    cy.fixture('locators.json').then( (locators) =>{
        cy.get(locators.buttonWrapper).contains(buttonName).should('exist')
            .and('be.visible').and('not.to.be.disabled').click();
    })
})
Cypress.Commands.add('raisedButtonCheck',(buttonName)=>{
    cy.fixture('locators.json').then( (locators) =>{ 
        cy.get(locators.raisedbutton).contains(buttonName)
            .should('exist').and('be.visible');
    })
})
Cypress.Commands.add('raisedButtonClick',(buttonName)=>{
    cy.fixture('locators.json').then( (locators) =>{ 
        cy.get(locators.raisedbutton).contains(buttonName)
            .should('exist').and('be.visible').and('not.to.be.disabled')
                .click();
    })
})
Cypress.Commands.add('placeCheckBtn',(buttonName)=>{
    cy.fixture('locators.json').then( (locators) =>{ 
        cy.get(locators.placeCheckBtn).contains(buttonName)
    })
})     
Cypress.Commands.add('log1', (value) => {
    cy.log("******* "+value+" *******")
})
// Enterprise CMR-QMS
Cypress.Commands.add('qmsLoader',()=>{
    cy.fixture('locators.json').then( (locators) =>{
        cy.get(locators.qmsLoader) // Overlay
        cy.get(locators.qmsLoaderMessage) // Please Wait message
    })
})
Cypress.Commands.add('qmsValidations',()=>{ // QMS Basic Validations
    cy.fixture('locators.json').then( (locators) =>{
        cy.get(locators.qmsHeader).should('exist').and('be.visible').and('not.to.be.disabled') // Header
        cy.get(locators.qmsLeftPanel).should('exist').and('be.visible').and('not.to.be.disabled') // Left panel
        cy.get(locators.qmsLogoContainer).should('exist').and('be.visible').and('not.to.be.disabled') // Logo container
        cy.get(locators.qmsToggleIcon).should('exist').and('be.visible').and('not.to.be.disabled') // Toggle icon
        cy.get(locators.qmsSectionHeader).should('exist').and('be.visible').and('not.to.be.disabled') // Section Header
        cy.get(locators.qmsNewOrgIcon).should('exist').and('be.visible').and('not.to.be.disabled') // New Org. Icon
        cy.get(locators.qmsList).should('exist').and('be.visible').and('not.to.be.disabled') // Organizations List
        cy.get(locators.qmsSearch).should('exist').and('be.visible').and('not.to.be.disabled') // Search button
        
    })
})
Cypress.Commands.add('qmsSearchOrg',(orgId)=>{ // Search Org
    cy.fixture('locators.json').then( (locators) =>{
        cy.get(locators.qmsSearch).should('exist')
            .and('be.visible').and('not.to.be.disabled').type(orgId) 
    })
})
// CMR - Login / logs
Cypress.Commands.add('loginPageValidation',()=> {
    cy.fixture('locators.json').then( (locators) =>{
        cy.get(locators.signIn).should('exist').and('be.visible').and('not.to.be.disabled') // Front page
        cy.get(locators.container).should('exist').and('be.visible').and('not.to.be.disabled') // Container
        cy.get(locators.form).should('exist').and('be.visible').and('not.to.be.disabled') // Form
        cy.get(locators.recaptcha).should('exist').and('be.visible').and('not.to.be.disabled') // Recaptcha
        cy.get(locators.loginButton).should('exist').and('be.visible').and('not.to.be.disabled') // Send button
        cy.get(locators.footer).should('exist').and('be.visible').and('not.to.be.disabled') // Footer
        cy.get(locators.forgotAction).should('exist').and('be.visible').and('not.to.be.disabled') // Forgot password
        cy.get(locators.forgotButton).should('exist').and('be.visible').and('not.to.be.disabled') // Forgot button
        cy.get(locators.copyright).should('exist').and('be.visible').and('not.to.be.disabled') // Copyright
        cy.get(locators.extradata).should('exist').and('be.visible').and('not.to.be.disabled') // Copyright/Terms/Policy
    })
})
Cypress.Commands.add('adminLogin', ()=>{
    cy.fixture('locators.json').then( (locators) =>{
        cy.get(locators.loginUser).should('exist')
            .and('be.visible').and('not.to.be.disabled').type(locators.adminUser) // User
        cy.get(locators.loginPass).should('exist')
            .and('be.visible').and('not.to.be.disabled').type (locators.adminPass, {sensitive: true}) // Pass
        cy.get(locators.loginButton).should('exist')
            .and('be.visible').and('not.to.be.disabled').and('contain','Send').click()
    })
})
// MACRO
Cypress.Commands.add('macroLoginPageValidation',()=> {
    cy.fixture('locators.json').then( (locators) =>{
        cy.get(locators.signIn).should('exist').and('be.visible').and('not.to.be.disabled') // Front page
        cy.get(locators.container).should('exist').and('be.visible').and('not.to.be.disabled') // Container
        cy.get(locators.form).should('exist').and('be.visible').and('not.to.be.disabled') // Form
        cy.get(locators.recaptcha).should('exist').and('be.visible').and('not.to.be.disabled') // Recaptcha
        cy.get(locators.macroLoginButton).should('exist').and('be.visible').and('not.to.be.disabled') // Send button
        cy.get(locators.footer).should('exist').and('be.visible').and('not.to.be.disabled') // Footer
        cy.get(locators.forgotAction).should('exist').and('be.visible').and('not.to.be.disabled') // Forgot password
        cy.get(locators.forgotButton).should('exist').and('be.visible').and('not.to.be.disabled') // Forgot button
        cy.get(locators.copyright).should('exist').and('be.visible').and('not.to.be.disabled') // Copyright
        cy.get(locators.extradata).should('exist').and('be.visible').and('not.to.be.disabled') // Copyright/Terms/Policy
    })
})
Cypress.Commands.add('macroAdminLogin', ()=>{
    cy.fixture('locators.json').then( (locators) =>{
        cy.get(locators.loginUser).should('exist')
            .and('be.visible').and('not.to.be.disabled').type(locators.macroAdminUser) // User
        cy.get(locators.loginPass).should('exist')
            .and('be.visible').and('not.to.be.disabled').type (locators.macroAdminPass, {sensitive: true}) // Pass
        cy.get(locators.macroLoginButton).should('exist')
            .and('be.visible').and('not.to.be.disabled').and('contain','Send').click()
    })
})
//
///  
//
//
// Commands
Cypress.Commands.add('welcomeCheck',()=>{
    cy.fixture('appLocators.json').then( (app)=>{
        cy.get(app.contentrol).should('exist')
        cy.get(app.gradientwrpr).should('exist')
        cy.get(app.wlCard).should('exist')
        cy.get(app.loginOptions).should('exist')
        cy.get(app.welcome).should('exist')
        cy.get(app.logoRow).should('exist')
        cy.get(app.faceBtn).should('exist')
        cy.get(app.loginByMailBtn).should('exist').and('contain','Enter using E-mail')
        cy.get(app.facebookbtn).should('exist').and('contain','Facebook')
        cy.get(app.registerBtn).should('exist').should('exist').and('contain','First time here?')
        cy.get(app.button).should('have.length', 7)
            .and('contain','Enter using E-mail').should('be.visible')
                .and('contain','Facebook').should('be.visible')
                    .and('contain','First time here?').should('be.visible')
                
    })
})
Cypress.Commands.add('loginByMail',()=>{
    cy.fixture('appLocators.json').then( (app)=>{
        cy.get(app.loginByMailBtn).should('exist').and('contain','Enter using E-mail').click().loginCheck()
        cy.get(app.loginList).should('exist')
        cy.get(app.textInput).should('have.length', 2).clear()
        cy.get(app.textInput).eq(0).type(app.adminUser)
        cy.get(app.textInput).eq(1).type(app.adminPass) //first().type(app.adminUser)
        cy.get(app.wllogin).find('.button').eq(2).and('include.text','Enter').click()
    })
})
Cypress.Commands.add('loginByMailV2',(userMail,userPass)=>{
    cy.fixture('appLocators.json').then( (app)=>{
        cy.get(app.loginByMailBtn).should('exist').and('contain','Enter using E-mail').click().loginCheck()
        cy.get(app.loginList).should('exist')
        cy.get(app.textInput).should('have.length', 2).clear()
    })
    cy.fixture('users.json').then( (users)=>{
        cy.get(app.textInput).eq(0).type(users[0])
        cy.get(app.textInput).eq(1).type(users[0]) //first().type(app.adminUser)
        cy.get(app.wllogin).find('.button').eq(2).and('include.text','Enter').click()
    })
})
Cypress.Commands.add('loginCheck',()=>{
    cy.fixture('appLocators.json').then( (app) =>{
        cy.get(app.wllogin).should('exist').and('be.visible')
    })
})
Cypress.Commands.add('indexCheck',()=>{
    cy.fixture('appLocators').then( (app)=>{
        cy.get(app.toolbar).should('exist')
        cy.get(app.gradientwrpr).should('exist')
    })  
})
Cypress.Commands.add('searchPlace', ()=>{
    cy.fixture('appLocators').then( (app)=>{
        cy.get(app.searchbarInput).should('exist').type(app.searchedPlace)
        cy.get(app.inputWrpr).should('exist').and('contain',app.searchedPlace).click()
    })
})
/////////////////////////////////// LOCAL STORAGE ///////////////////////////////////
let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorageCache", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});
Cypress.Commands.add("restoreLocalStorageCache", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
      localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});
Cypress.Commands.add("clearLocalStorageCache", () => {
    localStorage.clear();
    LOCAL_STORAGE_MEMORY = {};
});