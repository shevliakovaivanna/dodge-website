
describe('Головна сторінка Dodge', () => {
  it('відображає назву Dodge', () => {
    cy.visit('/');
    cy.contains('h1', 'Dodge').should('be.visible');
  });

  it('відображає опис сайту', () => {
    cy.visit('/');
    cy.contains('Машина твоєї мрії починається тут.').should('be.visible');
  });
});
