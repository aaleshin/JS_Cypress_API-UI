import _ from "lodash";
import {
    authData,
    authUrl,
    createPlaceUrl,
    decorePlace,
    landmarkInfoPlaces,
    landmarkPlaces,
    masterParcelInfoPlaces,
    masterParcelNftInfoPlaces,
    masterParcelNftPlaces,
    masterParcelPlaces,
    receivePlaceUrl,
    simpleParcelInfoPlaces,
    simpleParcelNftInfoPlaces,
    simpleParcelNftPlaces,
    simpleParcelPlaces,
    singleDecorePlace,
    slaveParcelInfoPlaces,
    slaveParcelNftInfoPlaces,
    slaveParcelNftPlaces,
    slaveParcelPlaces,
    WrongPlaceData
} from "../apiData/landApiData";


describe("Land API CREATE Place tests", function () {
    let accessToken = null;

    beforeEach(() => {
        cy.request('POST', authUrl, authData)
            .then(response => {
                accessToken = response;
            })
    });
    Object.entries({
        decorePlace,
        landmarkInfoPlaces,
        landmarkPlaces,
        masterParcelNftInfoPlaces,
        masterParcelNftPlaces,
        masterParcelInfoPlaces,
        masterParcelPlaces,
        slaveParcelNftInfoPlaces,
        slaveParcelNftPlaces,
        slaveParcelInfoPlaces,
        slaveParcelPlaces,
        simpleParcelNftInfoPlaces,
        simpleParcelNftPlaces,
        simpleParcelInfoPlaces,
        simpleParcelPlaces
    }).forEach((([name, data]) => {
        it(`Create Place ${name}`, () => {
            cy.request({
                method: 'POST',
                url: createPlaceUrl,
                body: data,
                headers: {
                    'Authorization': 'Bearer ' + accessToken.body,
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.length(24)
            })
        });
    }))

    it('Fail to creating Place', () => {
        cy.request({
            method: 'POST',
            url: createPlaceUrl,
            body: WrongPlaceData,
            headers: {
                'Authorization': 'Bearer ' + accessToken.body,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.eq("Exception when validating Unsupported Place kind 'TEST'")
        })
    });
})


describe("Land API GET Places tests", function () {
    let accessToken = null;
    let placeId = null;
    let returnedDecorePlaceEdited = null;

    beforeEach(() => {
        returnedDecorePlaceEdited = _.cloneDeep(singleDecorePlace[0])
        cy.request('POST', authUrl, authData)
            .then(response => {
                accessToken = response;

                cy.request({
                    method: 'POST',
                    url: createPlaceUrl,
                    body: singleDecorePlace,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken.body,
                    }
                }).then(response => {
                    placeId = response;
                    returnedDecorePlaceEdited.id = placeId.body[0]
                    returnedDecorePlaceEdited.typeName = singleDecorePlace[0].Type.kind
                    delete returnedDecorePlaceEdited.Type
                })
            })
    });

    it('Get Places', () => {
        cy.request({
            method: 'GET', url: receivePlaceUrl,
            qs: {
                ids: placeId.body
            },
            headers: {
                'Authorization': 'Bearer ' + accessToken.body
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body[0]).to.deep.equal({
                ...returnedDecorePlaceEdited
            })
        })
    })
})
