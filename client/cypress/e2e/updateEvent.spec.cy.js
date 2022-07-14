describe("update an event", () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1280, 720)
  })
  it("can update an event from personal appointments", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[placeholder=\"Email\"]").type("test2@test");
    cy.get("input[placeholder=\"Password\"]").type("test2");

    cy.get('[data-cy="login"]').click();
    cy.location('pathname', { timeout: 10000 }).should('eq', '/home')

    cy.contains('Update').click();
    cy.get('[data-cy="update-date"]').click().type("2022-07-26");

    cy.get('[data-cy="update-text"]').click().type("test updated")

    cy.contains('Update appointment').click();
    cy.contains('Log out').click();


  });
});