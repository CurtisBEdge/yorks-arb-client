describe("Edit sign" ,  () => {

  const signId = 1;
  const signImageId = 2;

  it('navigate to edit mode for a single sign', () => {
    cy.login();
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
    ]).as('getSigns')

    cy.intercept('GET', new RegExp(`/api/signs/get/${signId}`), {
      'id': 1,
      'title': 'This is a lovely tree',
      'description': 'Stuff about the tree',
      'lat': 1.23,
      'lon': 2.34,
      'signImageId': signImageId
    }).as('getSign')

    cy.intercept('PATCH', new RegExp(`/api/signs/${signId}`), {
      'id': 1,
      'title': 'this is a test title',
      'description': 'Stuff about the tree',
      'lat': 1.23,
      'lon': 2.34,
      'signImageId': signImageId
    }).as('editSign')

    cy.get('[data-cy="menu"]').click()
    cy.get('[data-cy="edit-sign"]').click()
    cy.wait('@getSigns')
    cy.get(`[data-cy="edit-sign-${signId}"]`).click()
    cy.wait('@getSign')
    cy.get('input[id="title"]').clear().type('this is a test title')
    cy.get('[data-cy="submit-button"]').click()
    cy.wait('@editSign')

    cy.intercept('GET', new RegExp(`/api/signs/get`), [
      {
        "id": 1,
        "title": "this is a test title",
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
    ]).as('getSignsAfterEdit')

    cy.wait('@getSignsAfterEdit')
  })
})
