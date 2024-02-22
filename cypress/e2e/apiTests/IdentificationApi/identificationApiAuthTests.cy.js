import {
    authData,
    authSignInURI,
    authSignUpURI,
    deleteDataURI,
    sameAuthData
} from "../apiData/identificationApiData";

describe("Identification API Auth tests", function () {

    it('Create account', () => {

        cy.request('POST', authSignUpURI, authData())
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).not.to.be.null
            })
    });

    it('Fail authorization if same data', () => {

        cy.request({method: 'POST', url: authSignUpURI, body: sameAuthData, failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(409)
                expect(response.body.validates.name).to.eq("Name QA_test already exists")
                expect(response.body.validates.email).to.eq("Email qa_test@qatest.com already exists")
            })
    });

    it('Fail authorization if wrong email', () => {
        cy.request({
            method: 'POST',
            url: authSignUpURI,
            body: {email: "test", name: authData().name, password: authData().password},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(409)
            expect(response.body.validates.email).to.eq("Email is not valid: test")
        })
    });

    it('Fail authorization if short password', () => {
        cy.request({
            method: 'POST',
            url: authSignUpURI,
            body: {email: authData().email, name: authData().name, password: "test"},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(409)
            expect(response.body.validates.password).to.eq("password is too short, minimal length 6")
        })
    });

    it('Fail authorization if name contains swears', () => {
        cy.request({
            method: 'POST',
            url: authSignUpURI,
            body: {email: authData().email, name: "Transexual", password: authData().password},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(409)
            expect(response.body.validates.name).to.eq("Name contains swears")
        })
    });
    it('Fail registration without email', () => {
        cy.request({
            method: 'POST',
            url: authSignUpURI,
            body: {name: authData().name, password: authData().password},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.errors.Email[0]).to.eq("The Email field is required.")
        })
    });

    it('Fail registration without name', () => {
        cy.request({
            method: 'POST',
            url: authSignUpURI,
            body: {email: authData().email, password: authData().password},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.errors.Name[0]).to.eq("The Name field is required.")
        })
    });

    it('Fail registration without password', () => {
        cy.request({
            method: 'POST',
            url: authSignUpURI,
            body: {email: authData().email, name: authData().name},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.errors.Password[0]).to.eq("The Password field is required.")
        })
    });

    it('Fail registration without data', () => {
        cy.request({
            method: 'POST',
            url: authSignUpURI,
            body: {},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.errors.Email[0]).to.eq("The Email field is required.")
            expect(response.body.errors.Name[0]).to.eq("The Name field is required.")
            expect(response.body.errors.Password[0]).to.eq("The Password field is required.")
        })
    });

    it('Fail registration without body', () => {
        cy.request({
            method: 'POST',
            url: authSignUpURI,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(415)
            expect(response.body.title).to.eq("Unsupported Media Type")
        })
    });

    it('Fail registration with wrong body', () => {
        cy.request({
            method: 'POST',
            url: authSignUpURI,
            body: {test: "test"},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.errors.Email[0]).to.eq("The Email field is required.")
            expect(response.body.errors.Name[0]).to.eq("The Name field is required.")
            expect(response.body.errors.Password[0]).to.eq("The Password field is required.")
        })
    });
})

describe("Identification API Login tests", function () {
    let newAuthData
    let accessToken

    beforeEach(() => {
        newAuthData = authData()
        cy.request('POST', authSignUpURI, newAuthData)
    });

    it('User login', () => {

        cy.request('POST', authSignInURI, {email: newAuthData.email, password: newAuthData.password})
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body["jwtToken"]).to.have.length(271)
                expect(response.body["refreshToken"]).to.have.length(608)

                accessToken = response.body["jwtToken"]
                cy.request({
                    method: 'POST', url: deleteDataURI, headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            });
    })

    it('Fail login if wrong data', () => {
        cy.request({
            method: 'POST',
            url: authSignInURI,
            body: {email: "test" + newAuthData.email, password: "test" + newAuthData.password},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(409)
            expect(response.body.message).to.eq("Email or password is incorrect")
        })
    });

    it('Fail login without data', () => {
        cy.request({
            method: 'POST',
            url: authSignInURI,
            body: {},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.errors.Email[0]).to.eq("The Email field is required.")
            expect(response.body.errors.Password[0]).to.eq("The Password field is required.")
        })
    });

    it('Fail login without body', () => {
        cy.request({
            method: 'POST',
            url: authSignInURI,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(415)
            expect(response.body.title).to.eq("Unsupported Media Type")
        })
    });

    it('Fail login with wrong body', () => {
        cy.request({
            method: 'POST',
            url: authSignInURI,
            body: {test: "test"},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.errors.Email[0]).to.eq("The Email field is required.")
            expect(response.body.errors.Password[0]).to.eq("The Password field is required.")
        })
    });
})

