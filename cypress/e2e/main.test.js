describe('Home page', function() {
  it('Visits home page', function() {
    cy.visit('http://localhost:8000')
  })
  it('Visits 2019 Puerto Rico sub-album', function() {
    cy.contains('2019 Puerto Rico').click()
  })
  it('Visits Jayuya sub-album page 1', function() {
    cy.contains('Jayuya').click()
  })
  it('Counts 15 photos on Jayuya sub-album page 1', function() {
    // scroll to bottom of page to make sure all images load
    cy.scrollTo('bottom')
    cy.get('picture'/*, { timeout: 500 }*/).should('have.length', 15)
  })
  it('Visits Jayuya sub-album page 2', function() {
    cy.contains('Next Page').click()
  })
  it('Revisits Jayuya sub-album page 1', function() {
    cy.contains('Previous Page').click()
  })
  it('Revisits 2019 Puerto Rico sub-album via breadcrumb link', function() {
    cy.contains('2019 Puerto Rico').click()
  })
  
})