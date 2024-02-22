import {faker} from "@faker-js/faker";

export const authUrl = "https://cube.bluelight.inc/land/Auth/token/create"
export const createPlaceUrl = "https://cube.bluelight.inc/land/Places/create"
export const receivePlaceUrl = "https://cube.bluelight.inc/land/SelectVisual/ids"
export const authData = {
    "login": "root",
    "password": "qwerty12345"
}
export const wrongAuthData = {
    "login": "root1",
    "password": "qwerty123451"
}
export const basePlaceData = {
    "TileId": faker.random.word(5),
    "Transform": {
        "Pose": {
            "x": +faker.random.numeric(3),
            "y": +faker.random.numeric(2)
        },
        "Size": {
            "x": +faker.random.numeric(2),
            "y": +faker.random.numeric(1)
        },
        "rotation": +faker.random.numeric(1)
    }
}

export const singleDecorePlace = [{
    ...basePlaceData,
    "Type": {
        "kind": "decore"
    }
}]

export const decorePlace = [{
    ...basePlaceData,
    "Type": {
        "kind": "decore"
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "decore"
        }
    }]
export const landmarkInfoPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "landmark",
        "landMarkAffectedIds": [" b2i!@#$%&*()_ph49 8r0+92jek_f "],
        "Info": {
            "additionalProp1": "str45673467thing",
            "additionalProp2": " ",
            "additionalProp3": " strrthrt ing "
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "landmark",
            "landMarkAffectedIds": [" b2i!@#$%&*()_ph49 8r0+92jek_f "],
            "Info": {
                "additionalProp1": "str45673467thing",
                "additionalProp2": " ",
                "additionalProp3": " strrthrt ing "
            }
        }
    }]
export const landmarkPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "landmark",
        "landMarkAffectedIds": [" b2i!@#$%&*()_ph49 8r0+92jek_f "]
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "landmark",
            "landMarkAffectedIds": [" b2i!@#$%&*()_ph49 8r0+92jek_f "]
        }
    }]
export const masterParcelNftInfoPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "master",
            "slaves": [" gvvhjdfjnjv bjkfgn "]
        },
        "Nft": {
            "id": "string",
            "meta": ["string"]
        },
        "Info": {
            "additionalProp1": "str45673467thing",
            "additionalProp2": " ",
            "additionalProp3": " strrthrt ing "
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "master",
                "slaves": [" gvvhjdfjnjv bjkfgn "]
            },
            "Nft": {
                "id": "string",
                "meta": ["string"]
            },
            "Info": {
                "additionalProp1": "str45673467thing",
                "additionalProp2": " ",
                "additionalProp3": " strrthrt ing "
            }
        }
    }]
export const masterParcelNftPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "master",
            "slaves": [" gvvhjdfjnjv bjkfgn "]
        },
        "Nft": {
            "id": "string",
            "meta": ["string"]
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "master",
                "slaves": [" gvvhjdfjnjv bjkfgn "]
            },
            "Nft": {
                "id": "string",
                "meta": ["string"]
            }
        }
    }]
export const masterParcelInfoPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "master",
            "slaves": [" gvvhjdfjnjv bjkfgn "]
        },
        "Info": {
            "additionalProp1": "str45673467thing",
            "additionalProp2": " ",
            "additionalProp3": " strrthrt ing "
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "master",
                "slaves": [" gvvhjdfjnjv bjkfgn "]
            },
            "Info": {
                "additionalProp1": "str45673467thing",
                "additionalProp2": " ",
                "additionalProp3": " strrthrt ing "
            }
        }
    }]
export const masterParcelPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "master",
            "slaves": [" gvvhjdfjnjv bjkfgn "]
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "master",
                "slaves": [" gvvhjdfjnjv bjkfgn "]
            }
        }
    }]

export const slaveParcelNftInfoPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "slave",
            "master": "fjvefkelr"
        },
        "Nft": {
            "id": "string",
            "meta": ["string"]
        },
        "Info": {
            "additionalProp1": "str45673467thing",
            "additionalProp2": " ",
            "additionalProp3": " strrthrt ing "
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "slave",
                "master": "fjvefkelr"
            },
            "Nft": {
                "id": "string",
                "meta": ["string"]
            },
            "Info": {
                "additionalProp1": "str45673467thing",
                "additionalProp2": " ",
                "additionalProp3": " strrthrt ing "
            }
        }
    }]
export const slaveParcelNftPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "slave",
            "master": "fjvefkelr"
        },
        "Nft": {
            "id": "string",
            "meta": ["string"]
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "slave",
                "master": "fjvefkelr"
            },
            "Nft": {
                "id": "string",
                "meta": ["string"]
            }
        }
    }]
export const slaveParcelInfoPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "slave",
            "master": "fjvefkelr"
        },
        "Info": {
            "additionalProp1": "str45673467thing",
            "additionalProp2": " ",
            "additionalProp3": " strrthrt ing "
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "slave",
                "master": "fjvefkelr"
            },
            "Info": {
                "additionalProp1": "str45673467thing",
                "additionalProp2": " ",
                "additionalProp3": " strrthrt ing "
            }
        }
    }]
export const slaveParcelPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "slave",
            "master": "fjvefkelr"
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "slave",
                "master": "fjvefkelr"
            }
        }
    }]


export const simpleParcelNftInfoPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "simple"
        },
        "Nft": {
            "id": "string",
            "meta": ["string"]
        },
        "Info": {
            "additionalProp1": "str45673467thing",
            "additionalProp2": " ",
            "additionalProp3": " strrthrt ing "
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "simple"
            },
            "Nft": {
                "id": "string",
                "meta": ["string"]
            },
            "Info": {
                "additionalProp1": "str45673467thing",
                "additionalProp2": " ",
                "additionalProp3": " strrthrt ing "
            }
        }
    }]
export const simpleParcelNftPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "simple"
        },
        "Nft": {
            "id": "string",
            "meta": ["string"]
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "simple"
            },
            "Nft": {
                "id": "string",
                "meta": ["string"]
            }
        }
    }]
export const simpleParcelInfoPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "simple"
        },
        "Info": {
            "additionalProp1": "str45673467thing",
            "additionalProp2": " ",
            "additionalProp3": " strrthrt ing "
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "simple"
            },
            "Info": {
                "additionalProp1": "str45673467thing",
                "additionalProp2": " ",
                "additionalProp3": " strrthrt ing "
            }
        }
    }]
export const simpleParcelPlaces = [{
    ...basePlaceData,
    "Type": {
        "kind": "parcel",
        "ParcelStatus": {
            "kind": "simple"
        }
    }
},
    {
        ...basePlaceData,
        "Type": {
            "kind": "parcel",
            "ParcelStatus": {
                "kind": "simple"
            }
        }
    }]

export const WrongPlaceData = [{
    "tileId": faker.random.word(5),
    "Transform": {
        "Pose": {
            "x": +faker.random.numeric(3),
            "y": +faker.random.numeric(2)
        },
        "Size": {
            "x": +faker.random.numeric(2),
            "y": +faker.random.numeric(1)
        },
        "rotation": +faker.random.numeric(1)
    },
    "Type": {
        "kind": "TEST"
    }
}]