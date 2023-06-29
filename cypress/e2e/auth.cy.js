describe('token expired', () => {
  it('token expired', () => {
    cy.login();
    cy.intercept('POST', new RegExp('/api/auth/signup'), {
      statusCode: 401
    }).as('signup')
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="add-new-user"]').click();
    cy.get('[data-cy="input-username"]').type('newUser');
    cy.get('[data-cy="input-password"]').type('Password1');
    cy.get('[data-cy="input-confirmationPassword"]').type('Password1');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@signup');
    cy.contains('Welcome to the Staff Portal');
  })
})