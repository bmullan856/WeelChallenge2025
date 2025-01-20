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

  it("should display all login page elements When first visting the page", () => {
    //Weel logo should be displayed
    cy.get('[data-testid="logo"]').should("be.visible");
    //visability check on Sign up page Header
    cy.get('[data-testid="business-signup-container"]').should(
      "have.text",
      MockData.TryWellHeading
    );
    //Visability Check on Enter Email text box
    cy.get('span[data-testid="form-input-label"]').should(
      "have.text",
      MockData.EnterWorkEmailHeading
    );
    //visability check input email box
    cy.get('[data-testid="registration-email"]')
      .should("be.visible")
      .and("have.attr", "type", "email")
      .and("have.attr", "autocomplete", "username");
    //visability for the submit button with correct text and Atttibutes
    cy.get('[data-cypress-testid="submit-button"]')
      .should("be.visible")
      .and("have.text", MockData.SignUpEmailHeading)
      .and("have.attr", "type", "submit");
    //visability check Divider
    cy.get('[data-testid="divider-test-id"]')
      .should("be.visible")
      .and("have.text", MockData.OrDivider);
    //visability for Xero Button wih correct text
    cy.get('[data-testid="xero-sign-in-button"]')
      .should("be.visible")
      .and("have.text", MockData.SignUpToXero);
    //Visability check on login text
    cy.get('span[data-testid="existing-account-container"]')
      .should("be.visible")
      .and("have.text", MockData.AlreadyLogInHeading);
  });

  it("should display Correct UI elements when email is subbmited", () => {
    //Enter existing User to change the UI
    cy.get('[data-testid="registration-email"]').type(
      MockData.ExistingUserEmail
    );
    cy.get('[data-cypress-testid="submit-button"]').click();
    //Password heading
    cy.get('[data-testid="registration-password-main-container"]')
      .should("be.visible")
      .and("have.text", MockData.PasswordHeading);
    //Password text box
    cy.get('[data-testid="registration-password"]').should("be.visible");
    //terms text and check box
    cy.get('[data-testid="registration-terms"]')
      .should("be.visible")
      .and(
        "have.text",
        "I have read and I agree to the Terms and Conditions and Privacy Policy"
      );
    //creat accout button
    cy.get('[data-testid="email-sign-up"]')
      .should("be.visible")
      .and("have.text", MockData.CreateAccount);
  });

  // //**************    email test Vailidation ************

  it("should show validation messages for empty email field", () => {
    //click on the on the submit button with empty email field
    cy.get('[data-cypress-testid="submit-button"]').click();
    //Check warning message under email text imput
    cy.get('[data-testid="form-input-wrapper-error-text"]')
      .should("be.visible")
      .and("have.text", MockData.AddressWarningMessage);
  });

  it("should show validation messages for invaled email field", () => {
    //Enter invaled email
    cy.get('[data-testid="registration-email"]').type(MockData.InvalidEmail);
    cy.get('[data-cypress-testid="submit-button"]').click();
    //Sign up button should be Disabled
    cy.get('[data-testid="email-sign-up"]')
      .should("be.visible")
      .and("be.disabled");
    //Enter Password
    cy.get('[data-testid="registration-password"]')
      .should("be.visible")
      .type(MockData.AcceptedPassword);
    //Accepted terms of sign up
    cy.get('[data-testid="registration-terms"]').click();
    //click the sign up button
    cy.get('[data-testid="email-sign-up"]').click();
    //check for error message
    cy.get('[data-testid="registration-email-subtext-container"]')
      .should("be.visible")
      .and("have.text", MockData.TryAgainAddressWarningMessage);
  });

  // //**************    Pwssward Vailidation Test   ************

  it("should show error icon for invaled password field when creating an account", () => {
    //Enter Exsisting email
    cy.get('[data-testid="registration-email"]').type(MockData.EmailNewUser);
    //Submit email
    cy.get('[data-cypress-testid="submit-button"]').click();
    //Enter a bad Password
    cy.get('[data-testid="registration-password"]').type(MockData.BadPassword);
    //Accepted cardinals
    cy.get('[data-testid="registration-terms"]').click();
    //Sign up button should be Disabled
    cy.get('[data-testid="email-sign-up"]').should("be.disabled");
    //check for Warning icons should have 4 icons and text
    cy.get('[data-testid="ds-alert-error-icon ds-exclamation-circle-icon"]')
      .should("be.visible")
      .and("have.length", 4);
    //test if the login button has been Disabled
    cy.get('[data-testid="email-sign-up"]').should("be.disabled");
  });

  it("should show error icon for EMPTY password field when creating an account", () => {
    //Enter Exsisting email
    cy.get('[data-testid="registration-email"]').type(MockData.EmailNewUser);
    //Submit email
    cy.get('[data-cypress-testid="submit-button"]').click();
    //Enter a bad Password
    cy.get('[data-testid="registration-password"]').click();
    //Accepted cardinals
    cy.get('[data-testid="registration-terms"]').click();
    //Sign up button should be Disabled
    cy.get('[data-testid="email-sign-up"]').should("be.disabled");
    //check for Warning icons should have 4 icons and text
    cy.get('[data-testid="ds-alert-error-icon ds-exclamation-circle-icon"]')
      .should("be.visible")
      .and("have.length", 4);
    //test if the login button is Disabled
    cy.get('[data-testid="email-sign-up"]').should("be.disabled");
  });

  it("should show tick Icons for valid password field when creating an account", () => {
    //Enter Exsisting email
    cy.get('[data-testid="registration-email"]').type(MockData.EmailNewUser);
    //Submit email
    cy.get('[data-cypress-testid="submit-button"]').click();
    //Enter Accepted Password
    cy.get('[data-testid="registration-password"]').type(
      MockData.AcceptedPassword
    );
    //Accepted cardinals
    cy.get('[data-testid="registration-terms"]').click();
    //check for Warning icons should have 4 icons and text
    cy.get('[data-testid="ds-alert-brand-check-icon ds-check-circle-icon"]')
      .should("be.visible")
      .and("have.length", 4);
    //test if the login button has been Disabled
    cy.get('[data-testid="email-sign-up"]')
      .should("be.visible")
      .and("not.have.attr", "disabled");
  });

  //**************    User Login Test   ************

  it("should NOT allow exsiting user to creat a New account, Show Error Message & link bring user to login page", () => {
    //Enter Exsisting email
    cy.get('[data-testid="registration-email"]').type(
      MockData.ExistingUserEmail
    );
    cy.get('[data-cypress-testid="submit-button"]').click();
    //Enter Password
    cy.get('[data-testid="registration-password"]').type(
      MockData.ExistingUserPassword
    );
    //Accepted Terms
    cy.get('[data-testid="registration-terms"]').click();
    //Click the Sign up button
    cy.get('[data-testid="email-sign-up"]').click();
    //Warning message should be visable
    cy.get('[data-testid="registration-email-subtext-container"]').should(
      "have.text",
      MockData.AccountAlreadyExists
    );
    s;
    //Ensure Redirect link i showen
    cy.get('[data-testid="login-to-continue-link"]').click();
    //user redirected to the login page
    cy.url().should("include", "letsweel.com/app/login");
  });

  it("should allow NEW login with valid NEW credentials", () => {
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
