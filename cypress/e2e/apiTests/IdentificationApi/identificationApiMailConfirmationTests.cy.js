import {
    accountInfoURI,
    authData,
    authSignInURI,
    authSignUpURI, deleteDataURI,
    emailConfirmURI
} from "../apiData/identificationApiData";

describe("Identification API sign up email tests", function () {
    let newToken
    let newAuthData
    let accessToken

    beforeEach(() => {
        cy.task('getUserEmail').then((email) => {
            newAuthData = authData({email: email.auth.user})
            cy.request('POST', authSignUpURI, newAuthData)
            cy.wait(5000) // wait for email
            cy.task('getLastEmail', email).then((res) => {
                newToken = res.match(/"button_link":"http:\/\/23\.88\.106\.171\/(.*)",/)[1]
            })
        })

    })

    it('open inbox', () => {
        cy.request({method: 'GET', url: emailConfirmURI + newToken})
            .then((response) => {
                expect(response.status).to.eq(200)
            })

        cy.request('POST', authSignInURI, {email: newAuthData.email, password: newAuthData.password})
            .then((response) => {
                expect(response.status).to.eq(200)
                accessToken = response.body["jwtToken"]

                cy.request({
                    method: 'POST', url: accountInfoURI, headers: {'Authorization': `Bearer ${accessToken}`}
                })
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        expect(response.body.emailConfirmed).to.eq("True")
                        expect(response.body.email).to.eq(newAuthData.email)
                    })

                cy.request({
                    method: 'POST', url: deleteDataURI, headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            })
        ;
    });
})