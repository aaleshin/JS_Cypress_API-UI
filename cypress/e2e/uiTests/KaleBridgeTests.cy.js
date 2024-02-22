import {kaleBridgeAllLinks, kaleBridgeUrl} from "./domenData/kaleBridgeData";
import HelpersPage from "./pageObjects/HelpersPage";

const helpersPage = new HelpersPage()
describe("Kale bridge tests", function () {
    beforeEach(() => {
        helpersPage.goToPage(kaleBridgeUrl)
    });

    it('Check all links on page', () => {
        cy.get('a').should('have.length', 57)
        cy.get('a').each(page => {
            expect(kaleBridgeAllLinks.has(page.prop('href'))).to.eq(true)
        })
    });
})


