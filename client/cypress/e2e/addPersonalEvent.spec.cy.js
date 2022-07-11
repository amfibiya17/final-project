let newDate = new Date();
const todaysDate = newDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})

describe("add personal event", () => {
  it("can make a personal event", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[placeholder=\"Email\"]").type("test@test");
    cy.get("input[placeholder=\"Password\"]").type("test");
    cy.get("input[value=\"Login\"]").click();

    cy.get(`[aria-label="11 July 2022"]`).click();
    cy.get("input[placeholder=\"name\"]").type("test dinner");
    cy.get("input[value=\"Submit\"]").click();

  });
});