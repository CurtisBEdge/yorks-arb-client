describe('get list of signs', () => {
  it('get list of signs', () => {
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
      },
      {
        "id": 4,
        "title": "This is a lovely tree 4",
        "description": "Stuff about the tree",
        "lat": 1.23,
        "lon": 2.34,
        "signImageId": 4
      }
    ]).as('getSigns')
    cy.intercept('GET', new RegExp(`/api/signs/get/1`), {
      "id": 1,
      "title": "This is a lovely tree 1",
      "description": "Stuff about the tree",
      "lat": 1.23,
      "lon": 2.34,
      "signImageId": null
    }).as('getSign')
    cy.visit(`/list-of-signs`)
    cy.wait('@getSigns')
    cy.contains("This is a lovely tree 1")
    cy.contains("This is a lovely tree 2")
    cy.contains("This is a lovely tree 3")
    cy.contains("This is a lovely tree 4")
    cy.get('[data-cy="sign1"]').click();
    cy.wait('@getSign')
    cy.contains("This is a lovely tree 1")
  })
  it('show error message when there are no signs', () => {
    cy.intercept('GET', new RegExp(`/api/signs/get`), []).as('getSigns')
    cy.visit(`/list-of-signs`)
    cy.wait('@getSigns')
    cy.contains("There are no signs to show currently.")
  })
})