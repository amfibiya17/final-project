describe("sign up", () => {
  it("can sign up", () => {
    cy.exec("mongo final-project-test --eval 'db.users.remove({})'");
    cy.visit("http://localhost:3000/signup");

    cy.get("input[placeholder=\"Name\"]").type("tester");
    cy.get("input[placeholder=\"Email\"]").type("test@test");
    cy.get("input[placeholder=\"Password\"]").type("test");

    cy.get("input[value=\"Signup\"]").click();
  });
});
