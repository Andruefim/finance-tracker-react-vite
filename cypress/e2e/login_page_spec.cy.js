/// <reference types="cypress" />

describe('The Login Page', () => {
  it('successfully loads', () => {
    cy.visit('/auth/login');

    cy.get('input[name="email"]').type('andruefim@gmail.com')

    cy.get('input[name=password]').type('1241')

    cy.get('button[type=submit]').click()

    cy.url().should('include', '/auth/confirm-email')

    cy.getAllLocalStorage('jwtToken').should('exist')

  })
})