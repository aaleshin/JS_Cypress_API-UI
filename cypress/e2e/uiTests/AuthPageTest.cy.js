import HelpersPage from "./pageObjects/HelpersPage";
import {authPageUrl} from "./domenData/authPageData";
import {logInWithMetaMask, privacyPopupButton} from "./pageObjects/AuthPage";

const helpersPage = new HelpersPage()
describe('Auth page tests',function () {
    before(() => {
        helpersPage.goToPage(authPageUrl)
        cy.contains(logInWithMetaMask).click()
        cy.acceptMetamaskAccess().should("be.true");
        cy.confirmMetamaskSignatureRequest().should("be.true");
    });

    after(() => {
        cy.disconnectMetamaskWalletFromAllDapps();
    });

    it('Register and login with Metamask', () => {
        cy.contains('...').should('be.visible');
    });
})