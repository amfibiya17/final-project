describe("add personal event", () => {
  it("can make a personal event", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[placeholder=\"Email\"]").type("test@test");
    cy.get("input[placeholder=\"Password\"]").type("test");
    cy.get('[data-cy="login"]').click();

    cy.get(`[aria-label="15 July 2022"]`).click();
    cy.get("input[placeholder=\"event\"]").type("test demo day");
    cy.get('[data-cy="submit"]').click()

  });
});