class HelpersPage {

    goToPage(url) {
        cy.visit(url, {failOnStatusCode: false})
    }

    fillInput(element, text) {
        cy.get(element).type(text)
        return this
    }

    clickToElement(element) {
        cy.get(element).click()
    }
}

export default HelpersPage