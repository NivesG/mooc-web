describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testnives',
      username: 'testnives',
      password: 'password',
    }
    const user2 = {
      name: 'secondnives',
      username: 'secondnives',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('testnives')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('nives is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('nives')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'nives is logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('testnives')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('new note').click()
      cy.get('#title').type('new blog title')
      cy.get('#author').type('test nives')
      cy.get('#linkUrl').type('www.test.com')
      cy.get('#create-button').click()
      cy.get('.notification').contains(
        'A new blog new blog title by test nives was added',
      )
      cy.contains('new blog title test nives').contains('show')
    })

    describe('when blog created', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('#title').type('new blog title')
        cy.get('#author').type('test nives')
        cy.get('#linkUrl').type('www.test.com')
        cy.get('#create-button').click()
        cy.contains('new blog title test nives').contains('show').click()
      })

      it('users can like a blog', function () {
        cy.get('#like-button').click()
        cy.contains('likes 1')
      })

      it('user who created a blog can delete it', function () {
        cy.get('#delete-button').click()
        cy.get('.notification').contains(
          'Blog new blog title by test nives was deleted',
        )
        cy.contains('new blog title test nives').should('not.exist')
      })

      describe('multiple blogs created', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'blog1',
            author: 'Cypress',
            url: 'www',
            likes: 6,
          })
          cy.createBlog({
            title: 'blog2',
            author: 'Cypress',
            url: 'www',
            likes: 2,
          })
          cy.createBlog({
            title: 'blog3',
            author: 'Cypress',
            url: 'www',
            likes: 30,
          })
        })
        it('contains new blogs', function () {
          cy.get('[data-cy="blog"]').then((blog) => {
            expect(blog).to.have.length(4)
            for (let i = 0; i < blog.length; i++) {
              // Check if the number of likes of current blog is higher than or equal to that of next blog
              if (i < blog.length - 1) {
                expect(
                  Number(blog.find('[data-cy="likes"]')[i].innerText),
                ).to.be.least(
                  Number(blog.find('[data-cy="likes"]')[i + 1].innerText),
                )
                // Check if number of likes of last blog is lower than or equal to that of first blog
              } else {
                expect(
                  Number(blog.find('[data-cy="likes"]')[i].innerText),
                ).to.be.most(
                  Number(blog.find('[data-cy="likes"]')[0].innerText),
                )
              }
            }
          })
        })
      })

      describe('when another user logs in', function () {
        beforeEach(function () {
          cy.contains('logout').click()
          cy.contains('login').click()
          cy.get('#username').type('secondnives')
          cy.get('#password').type('password')
          cy.get('#login-button').click()
        })

        it('user who is not author of the blog cannot delete it', function () {
          cy.contains('new blog title test nives').contains('show').click()
          cy.get('#delete-button').should('not.exist')
        })
      })
    })
  })
})
