describe('Suppliers', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get('input#usernameField').type('thiago@email.com')
        cy.get('input#passwordField').type('thiago')
        cy.get('button[type=submit]').click()
    })

    it('Should open list of suppliers', () => {
        cy.visit('/suppliers')
        cy.contains('h1', 'Suppliers')
        cy.get('table th').should('have.length', 5)
    })

    it('Should update existing supplier', () => {
        cy.visit('/suppliers')
        cy.contains('h1', 'Suppliers')
        cy.get('button.suppliers-edit:first').click()
        cy.contains('h1', 'Supplier #')
        cy.get('input#companyNameField').type('NEW COMPANY')
        cy.get('button#saveButton').click()

        cy.get('table td:first').should($td => {
            expect($td).to.contain('NEW COMPANY')
        })
    })

    it('Should create new supplier', () => {
        cy.visit('/suppliers/new')
        cy.get('input#companyNameField').type('NEW COMPANY')
        cy.get('input#contactNameField').type('NEW CONTACT')
        cy.get('input#contactTitleField').type('CONTACT TITLE')
        cy.get('input#streetField').type('street')
        cy.get('input#cityField').type('city')
        cy.get('input#regionField').type('region')
        cy.get('input#postalCodeField').type('postalCode')
        cy.get('input#countryField').type('country')
        cy.get('input#contactNameField').type('.')
        cy.get('button#saveButton').click()
        cy.get('table tr:last td:first').should($td => {
            expect($td).to.contain('NEW COMPANY')
        })
    })
})
