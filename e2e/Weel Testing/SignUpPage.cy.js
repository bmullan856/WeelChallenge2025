import Chance from "chance";
const UserInfo = new Chance();

describe("Login Page Tests", () => {
  let MockData;
  beforeEach(() => {
    cy.fixture("MockData.json").then((fData) => {
      MockData = fData;
    });
  });

  beforeEach(() => {
    cy.visit("https://app-moccona.letsweel.com/app/business-signup");
  });

  //************** UI Visual tests  ************

  it("should display all login page elements when first visiting the page", () => {
    // Define selectors and expected text in a centralised object for clarity and reuse
    const selectors = {
      logo: '[data-testid="logo"]',
      heading: '[data-testid="business-signup-container"]',
      emailLabel: 'span[data-testid="form-input-label"]',
      emailInput: '[data-testid="registration-email"]',
      submitButton: '[data-cypress-testid="submit-button"]',
      divider: '[data-testid="divider-test-id"]',
      xeroButton: '[data-testid="xero-sign-in-button"]',
      loginText: 'span[data-testid="existing-account-container"]',
    };

    const expectedText = {
      heading: MockData.TryWellHeading,
      emailLabel: MockData.EnterWorkEmailHeading,
      submitButton: MockData.SignUpEmailHeading,
      divider: MockData.OrDivider,
      xeroButton: MockData.SignUpToXero,
      loginText: MockData.AlreadyLogInHeading,
    };

    // Assertions
    cy.get(selectors.logo).should("be.visible");

    cy.get(selectors.heading).should("have.text", expectedText.heading);

    cy.get(selectors.emailLabel).should("have.text", expectedText.emailLabel);

    cy.get(selectors.emailInput)
      .should("be.visible")
      .and("have.attr", "type", "email")
      .and("have.attr", "autocomplete", "username");

    cy.get(selectors.submitButton)
      .should("be.visible")
      .and("have.text", expectedText.submitButton)
      .and("have.attr", "type", "submit");

    cy.get(selectors.divider)
      .should("be.visible")
      .and("have.text", expectedText.divider);

    cy.get(selectors.xeroButton)
      .should("be.visible")
      .and("have.text", expectedText.xeroButton);

    cy.get(selectors.loginText)
      .should("be.visible")
      .and("have.text", expectedText.loginText);
  });

  it("should display correct UI elements when email is submitted", () => {
    // Define selectors and expected text for better reusability
    const selectors = {
      emailInput: '[data-testid="registration-email"]',
      submitButton: '[data-cypress-testid="submit-button"]',
      passwordHeading: '[data-testid="registration-password-main-container"]',
      passwordInput: '[data-testid="registration-password"]',
      termsText: '[data-testid="registration-terms"]',
      createAccountButton: '[data-testid="email-sign-up"]',
    };

    const expectedText = {
      passwordHeading: MockData.PasswordHeading,
      terms:
        "I have read and I agree to the Terms and Conditions and Privacy Policy",
      createAccountButton: MockData.CreateAccount,
    };

    // Simulate entering an existing user's email
    cy.get(selectors.emailInput).type(MockData.ExistingUserEmail);
    cy.get(selectors.submitButton).click();

    // Assert visibility and correctness of the password heading
    cy.get(selectors.passwordHeading)
      .should("be.visible")
      .and("have.text", expectedText.passwordHeading);

    // Assert visibility of the password input box
    cy.get(selectors.passwordInput).should("be.visible");

    // Assert visibility and correctness of terms and conditions text
    cy.get(selectors.termsText)
      .should("be.visible")
      .and("have.text", expectedText.terms);

    // Assert visibility and correctness of the create account button
    cy.get(selectors.createAccountButton)
      .should("be.visible")
      .and("have.text", expectedText.createAccountButton);
  });

  // //**************    email test Vailidation ************

  it("should display validation messages for an empty email field", () => {
    // Define selectors and expected text for better reusability
    const selectors = {
      submitButton: '[data-cypress-testid="submit-button"]',
      emailErrorMessage: '[data-testid="form-input-wrapper-error-text"]',
    };

    const expectedText = {
      emailWarning: MockData.AddressWarningMessage,
    };

    // Simulate clicking the submit button with an empty email field
    cy.get(selectors.submitButton).click();

    // Assert the visibility and correctness of the warning message
    cy.get(selectors.emailErrorMessage)
      .should("be.visible")
      .and("have.text", expectedText.emailWarning);
  });

  it("should show validation messages for invalid email field", () => {
    // Define selectors and expected text for better organisation
    const selectors = {
      emailInput: '[data-testid="registration-email"]',
      submitButton: '[data-cypress-testid="submit-button"]',
      signUpButton: '[data-testid="email-sign-up"]',
      passwordInput: '[data-testid="registration-password"]',
      termsCheckbox: '[data-testid="registration-terms"]',
      emailErrorMessage: '[data-testid="registration-email-subtext-container"]',
    };

    const testData = {
      invalidEmail: MockData.InvalidEmail,
      validPassword: MockData.AcceptedPassword,
      emailErrorMessage: MockData.TryAgainAddressWarningMessage,
    };

    // Enter invalid email and submit
    cy.get(selectors.emailInput).type(testData.invalidEmail);
    cy.get(selectors.submitButton).click();

    // Assert that the sign-up button is visible and disabled
    cy.get(selectors.signUpButton).should("be.visible").and("be.disabled");

    // Enter password and accept terms
    cy.get(selectors.passwordInput)
      .should("be.visible")
      .type(testData.validPassword);
    cy.get(selectors.termsCheckbox).click();

    // Attempt to click the sign-up button
    cy.get(selectors.signUpButton).click();

    // Validate the error message for invalid email
    cy.get(selectors.emailErrorMessage)
      .should("be.visible")
      .and("have.text", testData.emailErrorMessage);
  });

  // //**************    Pwssward Vailidation Test   ************

  it("should show error icon for invalid password field when creating an account", () => {
    // Define selectors and expected test data for clarity and maintainability
    const selectors = {
      emailInput: '[data-testid="registration-email"]',
      submitButton: '[data-cypress-testid="submit-button"]',
      passwordInput: '[data-testid="registration-password"]',
      termsCheckbox: '[data-testid="registration-terms"]',
      signUpButton: '[data-testid="email-sign-up"]',
      errorIcons:
        '[data-testid="ds-alert-error-icon ds-exclamation-circle-icon"]',
    };

    const testData = {
      validEmail: MockData.EmailNewUser,
      invalidPassword: MockData.BadPassword,
    };

    // Enter existing email and submit
    cy.get(selectors.emailInput).type(testData.validEmail);
    cy.get(selectors.submitButton).click();

    // Enter an invalid password
    cy.get(selectors.passwordInput).type(testData.invalidPassword);

    // Accept the terms and conditions
    cy.get(selectors.termsCheckbox).click();

    // Assert that the sign-up button is disabled
    cy.get(selectors.signUpButton).should("be.disabled");

    // Verify that 4 error icons are displayed
    cy.get(selectors.errorIcons).should("be.visible").and("have.length", 4);

    // Ensure the sign-up button remains disabled
    cy.get(selectors.signUpButton).should("be.disabled");
  });

  it("should show error icon for EMPTY password field when creating an account", () => {
    // Define selectors for clarity and maintainability
    const selectors = {
      emailInput: '[data-testid="registration-email"]',
      submitButton: '[data-cypress-testid="submit-button"]',
      passwordInput: '[data-testid="registration-password"]',
      termsCheckbox: '[data-testid="registration-terms"]',
      signUpButton: '[data-testid="email-sign-up"]',
      errorIcons:
        '[data-testid="ds-alert-error-icon ds-exclamation-circle-icon"]',
    };

    const testData = {
      validEmail: MockData.EmailNewUser,
    };

    // Step 1: Enter existing email and submit
    cy.get(selectors.emailInput).type(testData.validEmail);
    cy.get(selectors.submitButton).click();

    // Step 2: Focus on the password input without entering a value
    cy.get(selectors.passwordInput).click();

    // Step 3: Accept terms and conditions
    cy.get(selectors.termsCheckbox).click();

    // Step 4: Validate the "Sign Up" button is disabled
    cy.get(selectors.signUpButton).should("be.disabled");

    // Step 5: Validate error icons are displayed with a count of 4
    cy.get(selectors.errorIcons).should("be.visible").and("have.length", 4);

    // Final Validation: Ensure the "Sign Up" button remains disabled
    cy.get(selectors.signUpButton).should("be.disabled");
  });

  it("should show tick icons for valid password field when creating an account", () => {
    // Define selectors for clarity and maintainability
    const selectors = {
      emailInput: '[data-testid="registration-email"]',
      submitButton: '[data-cypress-testid="submit-button"]',
      passwordInput: '[data-testid="registration-password"]',
      termsCheckbox: '[data-testid="registration-terms"]',
      tickIcons:
        '[data-testid="ds-alert-brand-check-icon ds-check-circle-icon"]',
      signUpButton: '[data-testid="email-sign-up"]',
    };

    const testData = {
      validEmail: MockData.EmailNewUser,
      validPassword: MockData.AcceptedPassword,
    };

    // Step 1: Enter a valid email and submit
    cy.get(selectors.emailInput).type(testData.validEmail);
    cy.get(selectors.submitButton).click();

    // Step 2: Enter a valid password
    cy.get(selectors.passwordInput).type(testData.validPassword);

    // Step 3: Accept terms and conditions
    cy.get(selectors.termsCheckbox).click();

    // Step 4: Validate tick icons are displayed with a count of 4
    cy.get(selectors.tickIcons).should("be.visible").and("have.length", 4);

    // Step 5: Validate the "Sign Up" button is enabled and visible
    cy.get(selectors.signUpButton)
      .should("be.visible")
      .and("not.have.attr", "disabled");
  });

  //**************    User Login Test   ************

  it("should not allow existing users to create a new account, display an error message, and redirect to the login page", () => {
    // Define selectors for clarity and maintainability
    const selectors = {
      emailInput: '[data-testid="registration-email"]',
      submitButton: '[data-cypress-testid="submit-button"]',
      passwordInput: '[data-testid="registration-password"]',
      termsCheckbox: '[data-testid="registration-terms"]',
      signUpButton: '[data-testid="email-sign-up"]',
      errorMessage: '[data-testid="registration-email-subtext-container"]',
      loginRedirectLink: '[data-testid="login-to-continue-link"]',
    };

    const testData = {
      existingEmail: MockData.ExistingUserEmail,
      existingPassword: MockData.ExistingUserPassword,
      errorText: MockData.AccountAlreadyExists,
      loginPageUrl: "letsweel.com/app/login",
    };

    // Step 1: Enter an existing user's email and submit
    cy.get(selectors.emailInput).type(testData.existingEmail);
    cy.get(selectors.submitButton).click();

    // Step 2: Enter an existing user's password
    cy.get(selectors.passwordInput).type(testData.existingPassword);

    // Step 3: Accept the terms and conditions
    cy.get(selectors.termsCheckbox).click();

    // Step 4: Click the "Sign Up" button
    cy.get(selectors.signUpButton).click();

    // Step 5: Verify the error message is displayed
    cy.get(selectors.errorMessage)
      .should("be.visible")
      .and("have.text", testData.errorText);

    // Step 6: Click the login redirection link
    cy.get(selectors.loginRedirectLink).should("be.visible").click();

    // Step 7: Verify the user is redirected to the login page
    cy.url().should("include", testData.loginPageUrl);
  });

  it("should allow new login with valid new credentials", () => {
    //Creat veribales to pass to the Log IN Command
    const email = UserInfo.email({ domain: MockData.Domain });
    const password = MockData.AcceptedPassword;
    //Call The Log in Command
    cy.LogIn(email, password);
  });

  //**************    Xero's redirect button   ************

  // it("should redirect to Xero's login screen", () => {
  //   // Suppress exceptions globally for this test
  //   cy.on("uncaught:exception", (err) => {
  //     if (err.message.includes("null")) {
  //       return false; // Suppress and allow the test to continue
  //     }
  //     // Throw error for any other unexpected exceptions
  //     throw err;
  //   });

  //   // Intercept the request to Xero login URL
  //   cy.intercept("GET", "ttps://login.xero.com").as("xeroRedirect");

  //   // Click the Xero sign-in button
  //   cy.get('[data-testid="xero-sign-in-button"]').click();

  //   // Wait for the Xero redirect to be intercepted
  //   cy.wait("@xeroRedirect").then((interception) => {
  //     expect(interception.response.statusCode).to.eq(200); // Verify redirect success
  //   });

  //   // Use cy.origin for any assertions on the third-party Xero page
  //   cy.origin("https://login.xero.com", () => {
  //     cy.contains("Sign in").should("be.visible"); // Replace with actual content verification
  //   });

  //   // //Use cy.origin for any assertions on the third-party Xero page
  //   // cy.origin("https://login.xero.com", () => {
  //   //   cy.get('id="xl-login-header-text"')
  //   //     .should("be.visible")
  //   //     .and("have.text", "Log in to Xero"); // Replace with actual content verification
  //   // });
  //});
});
