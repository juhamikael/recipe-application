describe("Test Login", () => {
  it("passes", () => {
    cy.login("testuser", "T€st1234");
    cy.visit("localhost:3000/create");
    cy.url().should("include", "/create");
  });
});

describe("Test Navbar", () => {
  describe("Test Navbar without #create", () => {
    it("passes without #create", () => {
      cy.visit("localhost:3000");
      cy.url().should("include", "/");

      cy.get("#home").click();
      cy.url().should("include", "/");

      cy.get("#how").click();
      cy.url().should("include", "/how");

      cy.get("#about").click();
      cy.url().should("include", "/about");

      cy.get("#sign-in").click();
      cy.url().should("include", "/sign-in");
    });
  });

  describe("Test Navbar with #create", () => {
    before(() => {
      cy.login("testuser", "T€st1234");
    });

    it("passes with #create", () => {
      cy.visit("localhost:3000");

      cy.get("#create").click();
      cy.url().should("include", "/create");
    });
  });
});
