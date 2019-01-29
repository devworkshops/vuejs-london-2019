describe('General', () => {
    it('404 route should kick off', () => {
        cy.visit('/non-existing-route')
        cy.contains('h1', 'Oops')
    })

    it('home page shows NDC', () => {
        cy.visit('/')
        cy.contains('h1', 'NDC')
    })
})
