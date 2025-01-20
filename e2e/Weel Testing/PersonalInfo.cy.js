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

  //THIS HALF WORK BUT DOES NOT TEST ALL UI COMPONENTS ON THE PAGE

  //   it("should display all page elements when first visting personal info page", () => {
  //     //Creat veribales to pass to the Log IN Command
  //     const email = UserInfo.email({ domain: data.Domain });
  //     const password = data.AcceptedPassword;
  //     //Call The Log in Command
  //     cy.LogIn(email, password);
  //     //Weel logo should be displayed
  //     cy.get('[data-testid="logo"]').should("be.visible");
  //     //visability of page Header
  //     cy.contains("Welcome, let's get to know each other");
  //     cy.get('[data-testid="help-menu-button"]')
  //       .should("be.visible")
  //       .and("have.text", "Help");
  //   });

  //   // //**************     Vailidation Test   ************

  // vailed warners on all emty fields warning text and also button
  // warning on invails phone number
  // warning on letter in date of birth

  //   //**************    User Register Test   ************

  // THIS TEST IS WORKING

  //   it("should allow NEW login with valid NEW personal information to get to the 2FA", () => {
  //     //Creat veribales to pass to the Log IN Command
  //     const email = UserInfo.email({ domain: Mockdata.Domain });
  //     const password = Mockdata.AcceptedPassword;
  //     //Call The Log in Command
  //     cy.LogIn(email, password);
  //     //Type in User First Name
  //     cy.get('[data-testid="input-first-name"]').type(UserInfo.first());
  //     //Type in User Second Name
  //     cy.get('[data-testid="input-last-name"]').type(UserInfo.first());
  //     //input a phone number
  //     cy.get('[data-testid="input-container"]').type(Mockdata.PhoneNumber);
  //     //input day of Birthday
  //     cy.get('[data-testid="ds-input"]')
  //       .eq(0) // First input box for the day
  //       .type(Mockdata.BirthdayDay); // Enter the day

  //     cy.get('[data-testid="ds-input"]')
  //       .eq(1) // Second input box for the month
  //       .type(Mockdata.BirthdayMonth); // Enter the month

  //     cy.get('[data-testid="ds-input"]')
  //       .eq(2) // Third input box for the year
  //       .type(Mockdata.BirthdayYear); // Enter the year

  //     //click the next button
  //     cy.get('[data-testid="next-button"]').click();
  //     //Check that the page has redirect to the Validate page
  //     cy.contains(
  //       "Enter the 6-digit code sent to your mobile number to validate your account"
  //     );
  //   });
  //**************    User Log out Test   ************

  //Creat veribales to pass to the Log IN Command
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
});
