describe('Qr Viewer', () => {
  it('can view qr code', () => {
    cy.createSigns();
    cy.login();
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="edit-sign"]').click();
    cy.get('[data-cy="view-code-3"]').click();
    cy.get('[data-cy="qr-code"]')
      .should('be.visible')
      .and(($img) => {
        expect($img.attr('src')).to.contain(`/api/qr-code/3`);
      })
  })
})