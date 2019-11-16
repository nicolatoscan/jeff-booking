const dbmanager = require('./dbmanager')
const accomodationTypes = require('./enum/accomodationTypes')
const cityMappingToCap = require('./enum/cityMappingToCap')


exports.getAccomodations = async (slots) => {
    //if (!handlerInput.requestEnvelope.request.intent.slots.AccommodationType)
    let accType = slots.AccommodationType.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    let cap = undefined;
    if (slots.city)
        cap = cityMappingToCap[slots.city.value];
    let alt = undefined;
    if (slots.altitude)
        alt = slots.altitude.value;

    let res = null;
    if (accType === "apartment") {
        res = await dbmanager.getAccomodations(accomodationTypes.APARTMENT, cap, alt)
    } if (accType === "camping pitch") {
        res = await dbmanager.getAccomodations(accomodationTypes.CAMPING_PITCH, cap, alt)
    } else if (accType === "hotel") {
        res = await dbmanager.getAccomodations(accomodationTypes.HOTEL, cap, alt)
    }
    console.log("cvbn");
    console.log(JSON.stringify(res));
    return "Here's some hotels: " + res.map(x => x.accomodation_name.value).slice(0, 6).join(', ');
}

exports.getCountCityAccomodation = async (slots) => {
    let accType = slots.accType.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    let cap = undefined;
    if (slots.city)
        cap = cityMappingToCap[slots.city.value];

    if (accType === "apartment")
        return await dbmanager.getCountCityAccomodation(accomodationTypes.APARTMENT, cap)
    if (accType === "camping pitch")
        return await dbmanager.getCountCityAccomodation(accomodationTypes.CAMPING_PITCH, cap)
    if (accType === "hotel")
        return await dbmanager.getCountCityAccomodation(accomodationTypes.HOTEL, cap)
    return JSON.stringify(slots)
}

exports.getMaximumAccommodation = async (slots) => {
    let accType = slots.type.resolutions.resolutionsPerAuthority[0].values[0].value.name;

    if (accType === "apartment")
        return await dbmanager.getMaximumAccommodation(accomodationTypes.APARTMENT)
    if (accType === "camping pitch")
        return await dbmanager.getMaximumAccommodation(accomodationTypes.CAMPING_PITCH)
    if (accType === "hotel")
        return await dbmanager.getMaximumAccommodation(accomodationTypes.HOTEL)
    return JSON.stringify(slots)
}

exports.getAnHotel = async (slots, hotel) => {
    console.log(slots)
    let accType = hotel ? accomodationTypes.HOTEL : accomodationTypes.accomodationType[slots.typeOfAcc.resolutions.resolutionsPerAuthority[0].values[0].value.name];
    let cap = undefined;
    if (slots && slots.place)
        cap = cityMappingToCap[slots.city.value];
    let alt = undefined;
    if (slots && slots.altitude)
        alt = slots.altitude.value;

    let res = await dbmanager.getAnHotel(accType, cap);
    console.log(res);
    return res.accomodation_name.value;

}




