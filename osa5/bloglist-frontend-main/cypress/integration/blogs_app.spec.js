describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', {
      'username': 'root',
      'name': 'Matti Mattson',
      'password': 'sekret'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.contains('Welcome')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
    })

    it('A blog can be created', async function() {
      cy.contains('Create a Blog!').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#submitButton').click()

      await cy.visit('http://localhost:3000')

      cy.contains('Test blog')
    })

    it('A blog can be liked', async function() {
      cy.contains('Create a Blog!').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#submitButton').click()

      await cy.visit('http://localhost:3000')

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be deleted', async function() {
      cy.contains('Create a Blog!').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#submitButton').click()

      await cy.visit('http://localhost:3000')

      cy.contains('view').click()
      cy.contains('delete').click()

      await cy.visit('http://localhost:3000')

      cy.contains('Test blog').should('not.exist')
    })
  })
})