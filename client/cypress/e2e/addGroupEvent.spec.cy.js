describe("add group event", () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1280, 720)
  })
  it("can make a group event and add test user", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[placeholder=\"Email\"]").type("test2@test");
    cy.get("input[placeholder=\"Password\"]").type("test2");

    cy.get('[data-cy="login"]').click();
    cy.location('pathname', { timeout: 10000 }).should('eq', '/home')

    cy.get(`[aria-label="25 July 2022"]`).click();
    cy.get("input[placeholder=\"Create event\"]").type("test");
    cy.get('[data-cy="submit"]').click()

    cy.get('[data-cy="create-group-event"]').click()
    cy.location('pathname', { timeout: 10000 }).should('eq', '/group_event')

    cy.get(`[aria-label="20 July 2022"]`).click();
    cy.get("input[placeholder=\"event\"]").type("test event with friend test user");

    cy.get('[data-cy="checkbox"]').click()
    cy.get('[data-cy="submit-group-event"]').click()
    cy.get('[data-cy="close-event-added-modal"]').click()
  });
});