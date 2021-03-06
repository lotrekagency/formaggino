/* eslint-disable no-undef */
/// <reference types="cypress" />

context("Formaggino", () => {
  beforeEach(() => {
    cy.visit("./docs/index.html");
  });
  it("check validation errors", () => {
    cy.get(".submit-action").click();
    cy.get(".form-error").should("have.class", "active");

    cy.get("input[name=name]").type("name");
    cy.get("input[name=name]").blur();
    cy.get("input[name=name]").next().should("not.have.class", "active");



    cy.get("input[name=email]").type("email");
    cy.get("input[name=email]").blur();
    cy.get(".submit-action").click();

    cy.get("input[name=email]").next().should("have.class", "active");

    cy.get("input[name=email]").type("email@mail.it");
    cy.get("input[name=email]").blur();
    cy.wait(500);
    cy.get("input[name=email]").next().should("not.have.class", "active");

    
    cy.get("input[name=privacy]").click();
    cy.get("input[name=privacy]").next().should("not.have.class", "active");

    cy.get(".submit-action").click();
    cy.get(".form-loading").should("have.class", "active");

    cy.get(".form-report-success").should("have.class", "active");

    cy.wait(3000);
    cy.get(".form-report-success").should("not.have.class", "active");
  });
});
