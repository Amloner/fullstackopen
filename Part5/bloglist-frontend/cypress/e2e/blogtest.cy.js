
describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')


  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()

  }) 


  it('Logging in as a valid user', function() {
    cy.contains('log in').click()
    cy.get('input:first').type('thavala')
    cy.get('input:last').type('frog')
    cy.contains('login').click()
    cy.contains('logged in')
  }) 

  it('Logging in as an invalid user', function() {
    cy.contains('log in').click()
   
    cy.get('input:last').type('a')
    cy.contains('login').click()
    cy.contains('Wrong credentials')
  }) 

describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
    cy.get('input:first').type('thavala')
    cy.get('input:last').type('frog')
    cy.contains('login').click()
    cy.contains('logged in')
    })

    it('A blog can be created', function() {
      cy.get('#title').type('thavala')
      cy.get('#author').type('frog')
      cy.get('#url').type('thavala')
      cy.get('#likes').type('1')
      cy.contains('save').click()
      cy.contains('thavala frog')
    })

    it('A blog can be deleted', function() {
     
      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('A blog can be likes', function() {
     
      cy.contains('view').click()
      cy.contains('delete').click()
    })
    it('Blogs are ordered', function() {
      cy.get('#title').type('First')
      cy.get('#author').type('blog')
      cy.get('#url').type('by likes')
      cy.get('#likes').type('20000')
      cy.contains('save').click()
      cy.get('#title').type('second')
      cy.get('#author').type('blog')
      cy.get('#url').type('by likes')
      cy.get('#likes').type('19999')
      cy.contains('save').click()
      cy.get('.blog').eq(0).should('contain', 'First')
cy.get('.blog').eq(1).should('contain', 'second')
    
    })




  })


})
