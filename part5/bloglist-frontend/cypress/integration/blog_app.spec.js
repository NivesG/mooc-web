describe('Blog app', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
          name: 'testnives',
          username: 'testnives',
          password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.visit('http://localhost:3001')
      })
      
    it('Login form is shown', function() {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
      })

    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('testnives')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
        cy.contains('nives is logged in')
      })

      it('fails with wrong credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('nives')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.get('.error').contains('wrong username or password')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('html').should('not.contain', 'nives is logged in')
        
      })
    })

  

      

  
  })

 