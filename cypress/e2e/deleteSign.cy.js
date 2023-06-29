describe('delete sign', () => {
  it('delete sign', () => {
    cy.createSigns();
    cy.login();

    cy.intercept('DELETE', new RegExp('/api/signs/4'), {
      result: "Sign deleted"
    }).as('delete')

    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="edit-sign"]').click();
    cy.get('[data-cy="delete-sign-4"]').click();

    cy.intercept('GET', new RegExp(`/api/signs/get`), [
      {
        "id": 1,
        "title": "This is a lovely tree 1",
        "description": "Stuff about the tree",
        "lat": 1.23,
        "lon": 2.34,
        "signImageId": null
      },
      {
        "id": 2,
        "title": "This is a lovely tree 2",
        "description": "Stuff about the tree",
        "lat": 1.23,
        "lon": 2.34,
        "signImageId": 2
      },
      {
        "id": 3,
        "title": "This is a lovely tree 3",
        "description": "Stuff about the tree",
        "lat": 1.23,
        "lon": 2.34,
        "signImageId": null
      }
    ]).as('get3Signs')

    cy.get('[data-cy="confirm-del"]').click();
    cy.wait('@delete');
    cy.wait('@get3Signs');
    cy.get('[data-cy="delete-sign-4"]').should('not.exist');
  })

  it('cancel delete from modal button', () => {
    cy.createSigns();
    cy.login();
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="edit-sign"]').click();
    cy.get('[data-cy="delete-sign-4"]').click();
    cy.get('[data-cy="cancel-del"]').click();
    cy.get('[data-cy="delete-sign-4"]')
  })

  it('cannot delete if not logged in', () => {
    cy.visit('/');
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="edit-sign"]').should('not.exist');
    cy.visit('/view-signs');
    cy.contains(`Welcome to the Staff Portal`);
  })

  it('cannot delete sign already deleted', () => {
    cy.createSigns();
    cy.login();

    cy.intercept('DELETE', new RegExp('/api/signs/4'), {
      statusCode: 404
    }).as('delete')

    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="edit-sign"]').click();
    cy.get('[data-cy="delete-sign-4"]').click();
    cy.get('[data-cy="confirm-del"]').click();
    cy.wait('@delete');
  })
})