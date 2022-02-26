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

    describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('testnives')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
      })
  
      it('A blog can be created', function() {
        cy.contains('new note').click()
        cy.get('#title').type('new blog title')
        cy.get('#author').type('test nives')
        cy.get('#linkUrl').type('www.test.com')
        cy.get('#create-button').click()
        cy.get('.notification').contains('A new blog new blog title by test nives was added')
        cy.contains('new blog title test nives')
          .contains('show')
      })

      it('users can like a blog', function() {
        cy.contains('new note').click()
        cy.get('#title').type('new blog title')
        cy.get('#author').type('test nives')
        cy.get('#linkUrl').type('www.test.com')
        cy.get('#create-button').click()
        cy.contains('new blog title test nives')
          .contains('show').click()
        cy.get('#like-button').click()
        cy.contains('likes 1')
        
        
      })
    })

  

      

  
  })

 