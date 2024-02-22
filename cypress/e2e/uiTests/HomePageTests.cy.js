import {
    applyButton,
    bottomFooter,
    buildTeam,
    mailHeaderAllLinks,
    mailHeaderExternalLinks,
    partnershipLinks,
    playNowButton,
    privacyPopupButton,
    privacyPopupText,
    setUpAnOffice,
    startJourney,
    topFooter,
    topFooterExternalLinks,
    topHeaderMainPageLinks
} from "./pageObjects/MainPage"
import {
    bottomFooterlinks,
    cookiePopupLink,
    homeUrl,
    mainHeaderBlankLinks,
    mainHeaderLinks,
    mainPageAllLinks,
    partnersLinks,
    topFooterBlankLinks,
    topFooterLinks,
    topHeaderLinks
} from "./domenData/mainPageData";
import HelpersPage from "./pageObjects/HelpersPage";

const helpersPage = new HelpersPage()
describe("Main page tests", function () {
    beforeEach(() => {
        cy.viewport('macbook-16')
        helpersPage.goToPage(homeUrl)
    });

    it('Check all links on page', () => {
        cy.get('a').should('have.length', 64)
        cy.get('a').each(page => {
            expect(mainPageAllLinks.has(page.prop('href'))).to.eq(true)
        })
    });

    it('Check top header links', () => {
        cy.get(topHeaderMainPageLinks).filter(':visible').should('have.length', 4)
        cy.get(topHeaderMainPageLinks).filter(':visible').each(page => {
            expect(topHeaderLinks.has(page.prop('href'))).to.eq(true)
        })
    });

    it('Check main header links', () => {
        cy.get(mailHeaderAllLinks).should('have.length', 7)
        cy.get(mailHeaderExternalLinks).should('have.length', 2)
        cy.get(playNowButton).should('have.length', 1)
        cy.get(mailHeaderExternalLinks).each(page => {
            expect(mainHeaderBlankLinks.has(page.prop('href'))).to.eq(true)
        })


        mainHeaderLinks.forEach(link => {
            cy.get(`${mailHeaderAllLinks}[href="${link}"]`).click()
            cy.url().should('contain', `${link}`)
            cy.go('back')
        })
    });

    it('Check main screen apply button', () => {
        cy.get(applyButton).should('have.length', 1)
        cy.get(startJourney).should('have.length', 1)
        cy.get(buildTeam).should('have.length', 1)
        cy.get(setUpAnOffice).should('have.length', 1)

    });

    it('Check main screen cookie popup', () => {
        cy.get(privacyPopupText).should('have.length', 1)
        cy.get(privacyPopupText).should('have.attr', 'href', `${cookiePopupLink}`)
        cy.contains(privacyPopupButton).click()
        cy.contains(privacyPopupButton).should('have.length', 0)
    });


    it('Check partners links', () => {
        cy.get(partnershipLinks).should('have.length', 8)
        cy.get(partnershipLinks).each(page => {
            expect(partnersLinks.has(page.prop('href'))).to.eq(true)
        })
    });

    it('Check top footer links', () => {
        cy.contains(privacyPopupButton).click()
        cy.get(topFooter).filter(':visible').should('have.length', 8)
        cy.get(topFooterExternalLinks).filter(':visible').should('have.length', 3)
        cy.get(topFooterExternalLinks).filter(':visible').each(page => {
            expect(topFooterBlankLinks.has(page.prop('href'))).to.eq(true)
        })

        topFooterLinks.forEach(link => {
            cy.get(`${topFooter}[href="${link}"]`).filter(':visible').click()
            cy.url().should('contain', `${link}`)
            cy.go('back')
        })
    });

    it('Check bottom footer links', () => {
        cy.get(bottomFooter).filter(':visible').should('have.length', 9)
        cy.get(bottomFooter).filter(':visible').each(page => {
            expect(bottomFooterlinks.has(page.prop('href'))).to.eq(true)
        })
    });
})