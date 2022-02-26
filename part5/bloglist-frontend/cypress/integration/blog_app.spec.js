describe('Blog app', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3001')
      })

    it('front page can be opened', function() {
      cy.contains('blogs')
      cy.contains('login')
    })

    it('Login form is shown', function() {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
        
      })

    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('nives')
        cy.get('#password').type('lula')
        cy.get('#login-button').click()
        cy.contains('nives is logged in')
      })

      it('fails with wrong credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('nives')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.get('.error').contains('wrong username or password')
        cy.get('html').should('not.contain', 'nives is logged in')
        
      })
    })

  

      

  
  })

 