import {createNameURI} from "../apiData/identificationApiData";

describe("Identification API names tests", function () {

    it('Create name', () => {

        cy.request('GET', createNameURI)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).not.to.be.null
            })
    });

    it('Fail create name if wrong method', () => {
        cy.request({method: 'POST', url: createNameURI, failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(405)
            });
    });

    it('Fail create name if wrong url', () => {
        cy.request({method: 'GET', url: createNameURI + "1", failOnStatusCode: false})
            .then((response) => {
                expect(response.status).to.eq(404)
            });
    });
});
