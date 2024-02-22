import {authData, authUrl, wrongAuthData} from "../apiData/landApiData";

describe("Land API Auth tests", function () {

    it('Create authorization token', () => {

        cy.request('POST', authUrl, authData)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).not.to.be.null
            })
    });
    it('Fail authorization', () => {
        cy.request({
            method: 'POST', url: authUrl, body: wrongAuthData, failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).not.to.be.null
        })
    });
})