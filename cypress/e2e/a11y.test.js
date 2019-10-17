/// <reference types="Cypress" />
describe("Accessibility checks", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.injectAxe()
    cy.wait(500)
  })
  it("dummy e2e test", () => {
    expect(true).to.equal(true)
  })
  // it("Has no detectable a11y violations on load", () => {
  //   cy.checkA11y()
  // })
  // it("Navigates to page 2 and checks for accessibility violations", () => {
  //   cy.findByText(/puerto rico/i)
  //     .click()
  //     .checkA11y()
  // })
})