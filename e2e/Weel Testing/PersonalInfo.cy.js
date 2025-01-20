import Chance from "chance";
const UserInfo = new Chance();

describe("PersonalInfo Page Tests", () => {
  let Mockdata;
  beforeEach(() => {
    cy.fixture("MockData.json").then((fData) => {
      Mockdata = fData;
    });
  });

  //   beforeEach(() => {
  //     cy.visit("https://app-moccona.letsweel.com/app/personal-info");
  //   });

  //************** UI Visual tests  ************

  it("should display all page elements when first visiting personal info page", () => {
    // Create variables to pass to the LogIn Command
    const email = UserInfo.email({ domain: Mockdata.Domain });
    const password = Mockdata.AcceptedPassword;

    // Step 1: Call the custom LogIn command
    cy.LogIn(email, password);

    // Step 2: Verify Weel logo is displayed
    cy.get('[data-testid="logo"]').should("be.visible");

    // Step 3: Verify visibility of the page header
    cy.contains("Welcome, let's get to know each other").should("be.visible");

    // Step 4: Verify Help button visibility and text
    cy.get('[data-testid="help-menu-button"]')
      .should("be.visible")
      .and("have.text", "Help");

    // Optional: Add more assertions to verify other UI elements (e.g., form fields, buttons)
    // Example: cy.get('[data-testid="personal-info-form"]').should('be.visible');
  });

  //**************     Vailidation Test   ************

  it("should show warning message if input fields in personal info page are empty", () => {
    const errorMessages = [
      "Please enter your first name",
      "Please enter your last name",
      "Please enter your mobile number",
      "Please enter a valid date of birth",
    ];

    // Step 1: Create variables to pass to the LogIn Command
    const email = UserInfo.email({ domain: Mockdata.Domain });
    const password = Mockdata.AcceptedPassword;

    // Step 2: Call the LogIn command
    cy.LogIn(email, password);

    // Step 3: Click focus on each input field
    cy.get('[data-testid="input-first-name"]').click();
    cy.get('[data-testid="input-last-name"]').click();
    cy.get('[data-testid="input-container"]').click();

    // Birthday input focus (split for better readability)
    cy.get('[data-testid="ds-input"]').eq(0).click(); // Day input
    cy.get('[data-testid="ds-input"]').eq(1).click(); // Month input
    cy.get('[data-testid="ds-input"]').eq(2).click(); // Year input

    // Step 4: Check for warning messages in the DOM
    errorMessages.forEach((message) => {
      cy.contains(message).should("be.visible");
    });
  });

  //   //**************    User Register Test   ************

  it("should allow NEW login with valid NEW personal information to get to the 2FA", () => {
    // Step 1: Create variables for valid email and password
    const email = UserInfo.email({ domain: Mockdata.Domain });
    const password = Mockdata.AcceptedPassword;
    const UserFirst = UserInfo.first();
    const UserLast = UserInfo.last();

    // Step 2: Call the LogIn command
    cy.LogIn(email, password);

    // Step 3: Fill out first name, last name, phone number, and birthday fields
    cy.get('[data-testid="input-first-name"]')
      .type(UserFirst)
      .should("have.value", UserFirst);
    cy.get('[data-testid="input-last-name"]')
      .type(UserLast)
      .should("have.value", UserLast);
    cy.get('[class="PhoneInputInput"]')
      .type(Mockdata.PhoneNumber)
      .should("have.value", Mockdata.PhoneNumber);

    // Input birthday fields (Day, Month, Year)
    cy.get('[data-testid="ds-input"]')
      .eq(0) // Day input
      .type(Mockdata.BirthdayDay)
      .should("have.value", Mockdata.BirthdayDay);

    cy.get('[data-testid="ds-input"]')
      .eq(1) // Month input
      .type(Mockdata.BirthdayMonth)
      .should("have.value", Mockdata.BirthdayMonth);

    cy.get('[data-testid="ds-input"]')
      .eq(2) // Year input
      .type(Mockdata.BirthdayYear)
      .should("have.value", Mockdata.BirthdayYear);

    // Step 4: Ensure 'Next' button is enabled before clicking
    cy.get('[data-testid="next-button"]').should("not.be.disabled").click();

    // Step 5: Validate page redirection to the 2FA screen
    cy.contains(
      "Enter the 6-digit code sent to your mobile number to validate your account"
    );
  });

  //**************    User Log out Test   ************

  it("should allow NEW user to logout and bring them back to the login page", () => {
    //Creat veribales to pass to the Log IN Command
    const email = UserInfo.email({ domain: Mockdata.Domain });
    const password = Mockdata.AcceptedPassword;
    //Call The Log in Command
    cy.LogIn(email, password);
    //click the logout button
    cy.contains("Logout").click();
    //check the url to see if it at the login page
    cy.url().should("include", "/app/login");
  });

  it("should allow NEW user to logout and bring them back to the login page", () => {
    // Step 1: Create variables for valid email and password
    const email = UserInfo.email({ domain: Mockdata.Domain });
    const password = Mockdata.AcceptedPassword;

    // Step 2: Log in with valid credentials
    cy.LogIn(email, password);

    // Step 3: Click the logout button
    cy.contains("Logout").click();

    // Step 4: Check the URL to confirm the user is redirected to the login page
    cy.url().should("include", "/app/login");
  });
});
