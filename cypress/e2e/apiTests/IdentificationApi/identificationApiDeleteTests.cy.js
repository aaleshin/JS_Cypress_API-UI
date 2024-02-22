import {authData, authSignInURI, authSignUpURI, deleteDataURI} from "../apiData/identificationApiData";

describe("Identification API Delete tests", function () {
    let accessToken = null;

    beforeEach(() => {
        const newAuthData = authData()
        cy.request('POST', authSignUpURI, newAuthData)
        cy.request('POST', authSignInURI, {email: newAuthData.email, password: newAuthData.password})
            .then((response) => {
                expect(response.status).to.eq(200)
                accessToken = response.body["jwtToken"]
            });
    });

    it('Delete account', () => {
        cy.request({
            method: 'POST', url: deleteDataURI, headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.eq('{"success":"Account has been deleted"}')
            });
    });

    it('Fail delete account if wrong token', () => {
        cy.request({
            method: 'POST',
            url: deleteDataURI,
            headers: {'Authorization': `Bearer ${accessToken}1`},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.headers["www-authenticate"]).to.eq("Bearer error=\"invalid_token\", error_description=\"The signature key was not found\"")
        })
    });

    it('Fail delete account without token', () => {
        cy.request({
            method: 'POST',
            url: deleteDataURI,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body).to.eq("")
        })
    });

    it('Fail delete already deleted account', () => {
        cy.request({
            method: 'POST', url: deleteDataURI, headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                expect(response.status).to.eq(200)
            })
        cy.request({
            method: 'POST', url: deleteDataURI, headers: {
                'Authorization': `Bearer ${accessToken}`
            }, failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(401)
                expect(response.body).to.eq("")
            })
    });

    it('Fail delete account without data', () => {
        cy.request({
            method: 'POST',
            url: deleteDataURI,
            headers: {'Authorization': `Bearer `},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body).to.eq("")
        })
    });
})