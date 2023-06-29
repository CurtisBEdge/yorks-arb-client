describe('admin can change own password', () => {
  it('change password', () => {
    cy.login();
    cy.intercept('PATCH', new RegExp('/api/auth/editPassword'), {
      statusCode: 200
    }).as('editPw')
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="change-password"]').click();
    cy.get('[data-cy="input-password"]').type('Password1');
    cy.get('[data-cy="input-confirmationPassword"]').type('Password1');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@editPw');
    cy.get('[data-cy="change-pw-success"]');
  })

  it('cannot change password if invalid', () => {
    cy.login();
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="change-password"]').click();
    cy.get('[data-cy="input-password"]').type('Pass1');
    cy.get('input[id="newPassword"]').focus().blur();
    cy.contains(`Password must be at least 8 characters`);
    cy.get('input[id="newPassword"]').clear().type('Password');
    cy.get('input[id="newPassword"]').focus().blur();
    cy.contains(`Password must contain at least 1 uppercase letter and 1 number`);
    cy.get('input[id="newPassword"]').clear().type('password1');
    cy.get('input[id="newPassword"]').focus().blur();
    cy.contains(`Password must contain at least 1 uppercase letter and 1 number`);
    cy.get('input[id="newPassword"]').clear().type('PASSWORD1');
    cy.get('input[id="newPassword"]').focus().blur();
    cy.contains(`Password must contain at least 1 uppercase letter and 1 number`);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  })

  it('cannot change if passwords do not match', () => {
    cy.login();
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="change-password"]').click();
    cy.get('[data-cy="input-password"]').type('Password1');
    cy.get('[data-cy="input-confirmationPassword"]').type('Password');
    cy.get('input[id="confirmationNewPassword"]').focus().blur();
    cy.contains(`Password does not match`);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  })

  it('cannot change password if not logged in', () => {
    cy.visit('/');
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="change-password"]').should('not.exist');
    cy.visit('/change-password');
    cy.contains(`Welcome to the Staff Portal`);
  })
})


