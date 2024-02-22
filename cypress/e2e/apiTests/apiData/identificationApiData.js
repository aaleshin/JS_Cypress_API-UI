import {faker} from "@faker-js/faker";

export const authSignUpURI = "https://dev.backend.bluelight.inc/identity/auth/signup"
export const authSignInURI = "https://dev.backend.bluelight.inc/identity/auth/signin"
export const deleteDataURI = "https://dev.backend.bluelight.inc/identity/deletes/request"
export const refreshTokenURI = "https://dev.backend.bluelight.inc/identity/token/refresh"
export const validateOnceTokenURI = "https://dev.backend.bluelight.inc/identity/token/valid-once"
export const createNameURI = "https://dev.backend.bluelight.inc/identity/names/unique"
export const emailConfirmURI = "https://dev.backend.bluelight.inc/identity/email/confirm/"
export const accountInfoURI = "https://dev.backend.bluelight.inc/identity/account/info"

export const authData = (values) => ({
    "name": faker.name.firstName() + "_testQA",
    "email": values?.email || faker.internet.email(),
    "password": "qwerty12345",
    "redirectUrl": "http://23.88.106.171/",
    "allowMailing": false
})

export const sameAuthData = {
    "name": "QA_test",
    "email": "qa_test@qatest.com",
    "password": "qwerty12345",
    "redirectUrl": "http://23.88.106.171/",
    "allowMailing": false
}

export const wrongToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqd3RUb2tlbiI6ImV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNklqWTBZV1F6WTJReE5EQTNaVFUyT1RCa1pUTTNPR0UwTVNJc0ltNWlaaUk2TVRZNU1UQTFOVGN4TXl3aVpYaHdJam94TmpreE1EVTNOVEV6TENKcFlYUWlPakUyT1RFd05UVTNNVE1zSW1semN5STZJbUYxZEdnaUxDSmhkV1FpT2lKaGRYUm9JbjAuaWtCZTdDWGczWkZ4NzlVTGFqZFNfOXBDVVZQVFZMMTl5ak9kd1VqTUtrel9LQ2hfdDR4eENOUktMamRSbGsxeWQ5WDVKdzhta2cyWk5mMWZNejAwenciLCJuYmYiOjE2OTEwNTU3MTMsImV4cCI6MTY5MTkxOTcxMywiaWF0IjoxNjkxMDU1NzEzLCJpc3MiOiJhdXRoIiwiYXVkIjoiYXV0aCJ9.H2aGgkhGj1VdO0ojb_ZZ23ABZdIRaqjatnd_173z_Sk2LYOBzfeG_NAafR7-0A7d6xpHDtuVWW7IDzTnokQicg"