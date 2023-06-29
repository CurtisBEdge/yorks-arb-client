describe('admin can create admin', () => {
  it('can sign up and show success message', () => {
    cy.login();
    cy.intercept('POST', new RegExp('/api/auth/signup'), {
      result: "New user created successfully"
    }).as('signup')
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="add-new-user"]').click();
    cy.get('[data-cy="input-username"]').type('newUser');
    cy.get('[data-cy="input-password"]').type('Password1');
    cy.get('[data-cy="input-confirmationPassword"]').type('Password1');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@signup');
    cy.get('[data-cy="new-user-success"]');
  })

  it('cannot signup with no username', () => {
    cy.login();
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="add-new-user"]').click();
    cy.get('input[id="username"]').focus().blur();
    cy.get('[data-cy="input-password"]').type('Password1');
    cy.get('[data-cy="input-confirmationPassword"]').type('Password1');
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  })

  it('cannot signup with invalid password', () => {
    cy.login();
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="add-new-user"]').click();
    cy.get('[data-cy="input-username"]').type('newUser');
    cy.get('[data-cy="input-password"]').type('Pass1');
    cy.get('input[id="password"]').focus().blur();
    cy.contains(`Password must be at least 8 characters`);
    cy.get('input[id="password"]').clear().type('Password');
    cy.get('input[id="password"]').focus().blur();
    cy.contains(`Password must contain at least 1 uppercase letter and 1 number`);
    cy.get('input[id="password"]').clear().type('password1');
    cy.get('input[id="password"]').focus().blur();
    cy.contains(`Password must contain at least 1 uppercase letter and 1 number`);
    cy.get('input[id="password"]').clear().type('PASSWORD1');
    cy.get('input[id="password"]').focus().blur();
    cy.contains(`Password must contain at least 1 uppercase letter and 1 number`);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  })

  it('cannot signup if passwords do not match', () => {
    cy.login();
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="add-new-user"]').click();
    cy.get('[data-cy="input-username"]').type('newUser');
    cy.get('[data-cy="input-password"]').type('Password1');
    cy.get('[data-cy="input-confirmationPassword"]').type('Password');
    cy.get('input[id="confirmationPassword"]').focus().blur();
    cy.contains(`Password does not match`);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  })

  it('cannot add new admin if not logged in', () => {
    cy.visit('/');
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="add-new-user"]').should('not.exist');
    cy.visit('/add-new-user');
    cy.contains(`Welcome to the Staff Portal`);
  })
})










