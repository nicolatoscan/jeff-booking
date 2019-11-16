const sparql = require('sparql')

exports.getAccomodations = async (accType, CAP, alt) => {
    let res = null;
    console.log("poiuytrewq")
    if (CAP === undefined)
        res = await query("PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX schema: <http://schema.org/> PREFIX : <http://noi.example.org/ontology/odh#> SELECT DISTINCT ?accomodation_name ?id WHERE { ?id a schema:" + accType + " ; schema:name ?accomodation_name . } LIMIT 50");
    else
        res = await query("PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX schema: <http://schema.org/> PREFIX : <http://noi.example.org/ontology/odh#> SELECT DISTINCT ?accomodation_name ?id WHERE { ?id a schema:" + accType + " ; schema:name ?accomodation_name . } LIMIT 50");

    return shuffle(res.results.bindings);
}

exports.getCountCityAccomodation = async (accType, CAP) => {
    let res = null;
    if (CAP === undefined)
        res = await "testing";
    else
        res = await "testing";
    return res;
}

exports.getMaximumAccommodation = async (accType) => {
    let res = null;
    res = await "testing";
    return res;
}

exports.getAnHotel = async (accType, cap, alt) => {
    let res = null;
    if (cap === undefined)
        res = await query("PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX schema: <http://schema.org/> PREFIX : <http://noi.example.org/ontology/odh#> SELECT DISTINCT ?accomodation_name ?id WHERE { ?id a schema:" + accType + " ; schema:name ?accomodation_name . } LIMIT 50");
    else
        res = await query("PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX schema: <http://schema.org/> PREFIX : <http://noi.example.org/ontology/odh#> SELECT DISTINCT ?accomodation_name ?id WHERE { ?id a schema:" + accType + " ; schema:name ?accomodation_name . } LIMIT 50");

    console.log("PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX schema: <http://schema.org/> PREFIX : <http://noi.example.org/ontology/odh#> SELECT DISTINCT ?accomodation_name ?id WHERE { ?id a schema:" + accType + " ; schema:name ?accomodation_name . } LIMIT 50");
    console.log(res);
    res = res.results.bindings[Math.floor(Math.random() * res.results.bindings.length)];
    console.log(res);
    return res;
}

let query = async (q) => {
    return new Promise(resolve => {

        let client = new sparql.Client('http://cefb3a8f.ngrok.io/sparql')
        client.query(q, (err, res) => {
            resolve(res);
            console.log(err);

        })
    });
}
