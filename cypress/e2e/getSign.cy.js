describe('get sign with and without sign image', () => {

  const signId = 1;
  const signImageId = 2;
  it('get sign with image', () => {
    cy.intercept('GET', new RegExp(`/api/signs/get/${signId}`), {
      'id': 1,
      'title': 'This is a lovely tree',
      'description': 'Stuff about the tree',
      'lat': 1.23,
      'lon': 2.34,
      'signImageId': signImageId
    }).as('getSign')
    cy.intercept('GET', new RegExp(`/api/sign-images/${signImageId}`), {
      statusCode: 200
    }).as('getSignImage')
    cy.visit(`/signs/${signId}`)
    cy.wait('@getSign')
    cy.wait('@getSignImage')
    cy.contains('This is a lovely tree')
    cy.contains('Stuff about the tree')
    cy.get('[data-cy="signImageEl"]')
      .should('be.visible')
      .and(($img) => {
        expect($img.attr('src')).to.contain(`/api/sign-images/1`);
      })
  })
  it('get sign without image', () => {
    cy.intercept('GET', new RegExp(`/api/signs/get/${signId}`), {
      'id': 1,
      'title': 'This is a lovely tree',
      'description': 'Stuff about the tree',
      'lat': 1.23,
      'lon': 2.34,
      'signImageId': null
    }).as('getSign')
    cy.visit(`/signs/${signId}`)
    cy.wait('@getSign')
    cy.contains('This is a lovely tree')
    cy.contains('Stuff about the tree')
    cy.get('[data-cy="signImageEl"]').should('not.exist')
  })
})