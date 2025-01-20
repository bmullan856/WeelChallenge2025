// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("LogIn", (email, password) => {
  //vist the login Page
  cy.visit("https://app-moccona.letsweel.com/app/business-signup");
  //Create a New Email for user
  cy.get('[data-testid="registration-email"]').type(email);
  //Click the submit button
  cy.get('[data-cypress-testid="submit-button"]').click();
  //Creat a New Accepted password for user
  cy.get('[data-testid="registration-password"]').type(password);
  //accept terms of registration
  cy.get('[data-testid="registration-terms"]').click();
  //click the sign up button
  cy.get('[data-testid="email-sign-up"]').click();
  //loading spinner should be shown
  cy.get('[data-testid="loading"]').should("be.visible");
  //Check that the page has redirect
  cy.url().should("include", "/personal-info");
});
