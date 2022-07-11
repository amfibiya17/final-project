describe("Log in", () => {
  it("can log in", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[placeholder=\"Email\"]").type("test@test");
    cy.get("input[placeholder=\"Password\"]").type("test");
    cy.get("input[value=\"Login\"]").click();
  });
});
