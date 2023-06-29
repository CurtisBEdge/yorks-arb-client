describe('add sign', () => {
  it('add sign without image', () => {
    cy.login();
    cy.intercept('POST', new RegExp('/api/signs'), {
      result: {
        "id": 1,
        "title": "hjdrgsdsdth",
        "description": "sdthsth",
        "lat": 3.0,
        "lon": 5.0,
        "signImageId": null
      }
    }).as('addSign')
    cy.intercept('GET', new RegExp('/api/signs/get'),[
      {
        "id": 1,
        "title": "hjdrgsdsdth",
        "description": "sdthsth",
        "lat": 3.0,
        "lon": 5.0,
        "signImageId": null
      }
    ]).as('getSigns')

    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="add-sign"]').click();
    cy.get('[data-cy="title"]').type("hjdrgsdsdth");
    cy.get('[data-cy="description"]').type("sdthsth");
    cy.get('[data-cy="lat"]').type("3.0");
    cy.get('[data-cy="lon"]').type("5.0");
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@addSign');
    cy.location('pathname').should('eq', '/view-signs');
    cy.wait('@getSigns');
    cy.contains("hjdrgsdsdth");
    cy.contains("sdthsth");
  })
  it('Failed to add sign with image too big', () => {
    cy.login();
    cy.intercept('POST', new RegExp('/api/signs'), {
      statusCode: 400,
      result: {
          "message": "Image filesize is too big."
        }
    }).as('addSign')
    cy.intercept('GET', new RegExp('/api/signs/get'),[
    ]).as('getSigns')
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="add-sign"]').click();
    cy.get('[data-cy="title"]').type("hjdrgsdsdth");
    cy.get('[data-cy="description"]').type("sdthsth");
    cy.get('[data-cy="lat"]').type("3.0");
    cy.get('[data-cy="lon"]').type("5.0");
    cy.get('input[id="signImage"]').selectFile('./cypress/fixtures/Snake_River_(5mb).png')
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@addSign');
    cy.contains("Error uploading sign")
  })
  it('Success add sign with image', () => {
    cy.login();
    cy.intercept('POST', new RegExp('/api/signs'), {
      result: {
        "id": 1,
        "title": "hjdrgsdsdth",
        "description": "sdthsth",
        "lat": 3.0,
        "lon": 5.0,
        "signImageId": 1
      }
    }).as('addSign')
    cy.intercept('GET', new RegExp('/api/signs/get'), [
      {
        "id": 1,
        "title": "hjdrgsdsdth",
        "description": "sdthsth",
        "lat": 3.0,
        "lon": 5.0,
        "signImageId": 1
      }
    ]).as('getSigns')
    cy.intercept('GET', new RegExp('/api/signs/get/1'),
      {
        "id": 1,
        "title": "hjdrgsdsdth",
        "description": "sdthsth",
        "lat": 3.0,
        "lon": 5.0,
        "signImageId": 1
      }
    ).as('getSign')
    cy.intercept('GET', new RegExp(`/api/sign-images/1`), {
      statusCode: 200
    }).as('getSignImage')
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="add-sign"]').click();
    cy.get('[data-cy="title"]').type("hjdrgsdsdth");
    cy.get('[data-cy="description"]').type("sdthsth");
    cy.get('[data-cy="lat"]').type("3.0");
    cy.get('[data-cy="lon"]').type("5.0");
    cy.get('input[id="signImage"]').selectFile('./cypress/fixtures/Thursday.jpg')
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@addSign');
    cy.location('pathname').should('eq', '/view-signs');
    cy.wait('@getSigns');
    cy.contains("hjdrgsdsdth");
    cy.contains("sdthsth");
    cy.visit('/signs/1');
    cy.wait('@getSign');
    cy.wait('@getSignImage');
    cy.get('[data-cy="signImageEl"]')
      .should('be.visible')
      .and(($img) => {
        expect($img.attr('src')).to.contain(`/api/sign-images/1`);
      })
  })
})