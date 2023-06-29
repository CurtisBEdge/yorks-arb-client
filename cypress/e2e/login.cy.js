describe('login and out', () => {
  it('logs in and out', () => {
    cy.intercept('POST', new RegExp('/api/auth/login'), {
      "token": "cVw",
      "user": {
        "username": "admin",
        "admin": true
      }
    }).as('login')
    cy.visit('/gatehouse');
    cy.get('[data-cy="input-username"]').type('admin');
    cy.get('[data-cy="input-password"]').type('Password1');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@login');
    cy.contains(`You are logged in as admin`);
    cy.get('[data-cy="logout-button"]').click();
    cy.contains(`You are logged in as admin`).should('not.exist');
  })

  it('cannot login incorrect password', () => {
    cy.intercept('POST', new RegExp('/api/auth/login'), {
      statusCode: 401
    }).as('login')
    cy.visit('/gatehouse');
    cy.get('[data-cy="input-username"]').type('admin');
    cy.get('[data-cy="input-password"]').type('Password5');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@login');
    cy.contains(`Username or password is incorrect`);
  })

  it('cannot login with no username', () => {
    cy.visit('/gatehouse');
    cy.get('input[id="username"]').focus().blur();
    cy.get('[data-cy="input-password"]').type('Password1');
    cy.contains(`Please enter your username`);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  })

  it('cannot login with invalid password', () => {
    cy.visit('/gatehouse');
    cy.get('[data-cy="input-username"]').type('admin');
    cy.get('[data-cy="input-password"]').type('Password');
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
});
