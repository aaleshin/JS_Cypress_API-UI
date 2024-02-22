import {
    authData,
    authSignInURI,
    authSignUpURI,
    deleteDataURI,
    refreshTokenURI, validateOnceTokenURI,
    wrongToken
} from "../apiData/identificationApiData";

describe("Identification API refresh token tests", async function () {
    it('Get new access token', () => {
        const newAuthData = authData()
        cy.request('POST', authSignUpURI, newAuthData)
        cy.request('POST', authSignInURI, {email: newAuthData.email, password: newAuthData.password})
            .then((response) => {
                expect(response.status).to.eq(200)
                const accessToken = response.body["jwtToken"]
                const refreshToken = response.body["refreshToken"]
                cy.wait(1000) // Refresh Token is updated once per second

                cy.request('POST', refreshTokenURI, {refreshToken: refreshToken})
                    .then((newResponse) => {
                        const newAccessToken = newResponse.body["jwtToken"]
                        const newRefreshToken = newResponse.body["refreshToken"]
                        expect(newResponse.status).to.eq(200)
                        expect(newResponse.body).to.have.property('jwtToken')
                        expect(newResponse.body).to.have.property('refreshToken')
                        expect(newAccessToken).to.not.eq(accessToken)
                        expect(newRefreshToken).to.not.eq(refreshToken)

                        cy.request({
                            method: 'POST', url: deleteDataURI, headers: {
                                'Authorization': `Bearer ${newAccessToken}`
                            }
                        })
                    });
            });
    });

    it('Fail get new access token if wrong refresh token', () => {
        cy.request({method: 'POST', url: refreshTokenURI, body: {refreshToken: wrongToken}, failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(409)
                expect(response.body.code).to.eq('notSpecified')
                expect(response.body.message).to.eq('Token already used')
            });
    });

    it('Fail get new access token if no refresh token', () => {
        cy.request({method: 'POST', url: refreshTokenURI, failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(415)
            });
    });

    it('Fail get new access token if wrong body', () => {
        cy.request({method: 'POST', url: refreshTokenURI, body: {}, failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.errors.RefreshToken[0]).to.eq("The RefreshToken field is required.")
            });
    });

    it('Fail get new access token if wrong method', () => {
        cy.request({method: 'GET', url: refreshTokenURI, failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(405)
            });
    });

    it('Fail get new access token if wrong url', () => {
        cy.request({method: 'POST', url: refreshTokenURI + "1", failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(404)
            });
    });
})

describe("Identification API validate once token tests", async function () {
    let accessToken = null
    let refreshToken = null

    beforeEach(() => {
        const newAuthData = authData()
        cy.request('POST', authSignUpURI, newAuthData)
        cy.request('POST', authSignInURI, {email: newAuthData.email, password: newAuthData.password})
            .then((response) => {
                expect(response.status).to.eq(200)
                accessToken = response.body["jwtToken"]
                refreshToken = response.body["refreshToken"]
            });
    });

    it('Validate jwt token', () => {
        cy.request('POST', validateOnceTokenURI, {token: accessToken})
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.eq(true)
            });

        cy.request('POST', validateOnceTokenURI, {token: accessToken})
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.eq(false)
            });
    });

    it('Fail validate refresh token', () => {
        cy.request('POST', validateOnceTokenURI, {token: refreshToken})
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.eq(true)
            });

        cy.request('POST', validateOnceTokenURI, {token: refreshToken})
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.eq(false)
            });
    });

    afterEach(() => {
        cy.request({
            method: 'POST', url: deleteDataURI, headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
    })
})

describe("Identification API validate once token negative tests", function () {
    it('Validate wrong token', () => {
        cy.request({method: 'POST', url: validateOnceTokenURI, body: {token: wrongToken}, failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.eq(false)
            });
    });

    it('Fail to try validate jwt token without token', () => {
        cy.request({method: 'POST', url: validateOnceTokenURI, failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(415)
            });
    });

    it('Fail validate jwt token if empty body', () => {
        cy.request({method: 'POST', url: validateOnceTokenURI, body: {}, failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.eq(false)
            });
    });

    it('Fail validate jwt token if wrong method', () => {
        cy.request({method: 'GET', url: validateOnceTokenURI, failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(405)
            });
    });

    it('Fail validate jwt token if wrong url', () => {
        cy.request({method: 'POST', url: validateOnceTokenURI + "1", failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(404)
            });
    });
})