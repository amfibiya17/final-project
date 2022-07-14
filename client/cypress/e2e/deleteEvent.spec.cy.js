describe("delete an event", () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1280, 720)
  })
  it("can delete an event from personal appointments", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[placeholder=\"Email\"]").type("test2@test");
    cy.get("input[placeholder=\"Password\"]").type("test2");

    cy.get('[data-cy="login"]').click();
    cy.location('pathname', { timeout: 10000 }).should('eq', '/home')

    cy.contains('Delete').click();
  });
});