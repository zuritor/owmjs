const Request                   = require('../Request');

class Forecast {

    /**
     * 
     * @param {RequestManager} rm 
     */
    constructor(rm) {
        this.rm = rm;
        this.endpoint = '/data/2.5/forecast';
    }

    /**
     * 
     * @param {string} name             e.g. Cologne, London, New York
     * @param {string} country          ISO 3166 country codes. e.g. uk
     * @param {Number} cnt              optional "number of days returned (from 1 to 16)"
     */
    ByCityName(name, country = null, cnt = null) {
        // api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml
        
        var params = {};
        if(country) params.q = `${name},${country}`;
        else params.q = name;
        if(cnt) params.cnt = cnt;

        return this.rm.sendRequest(new Request(this.endpoint, 'ByCityName', params));
    }

    /**
     * 
     * @param {Number} id               see http://bulk.openweathermap.org/sample/
     * @param {Number} cnt              optional "number of days returned (from 1 to 16)"
     */
    ByCityID(id, cnt = null) {
        //  api.openweathermap.org/data/2.5/forecast?id=524901
        var params = {id: id};
        if(cnt) params.cnt = cnt;

        return this.rm.sendRequest(new Request(this.endpoint, 'ByCityID', params));
    }

    /**
     * 
     * @param {Number} lat              latitude
     * @param {Number} lon              longitude
     * @param {Number} cnt              optional "number of days returned (from 1 to 16)"
     */
    ByGeographicCoordinates(lat, lon, cnt = null) {
        // api.openweathermap.org/data/2.5/forecast?lat=35&lon=139
        var params = {lat: lat, lon: lon};
        if(cnt) params.cnt = cnt;
        
        return this.rm.sendRequest(new Request(this.endpoint, 'ByGeographicCoordinates', params));
    }

    /**
     * 
     * @param {Number} zip 
     * @param {string} country          ISO 3166 country codes. e.g. uk
     * @param {Number} cnt              optional "number of days returned (from 1 to 16)"
     */
    ByZipCode(zip, country = null, cnt = null) {
        // api.openweathermap.org/data/2.5/forecast?zip=94040,us

        var params = {};
        if(country) params.q = `${zip},${country}`;
        else params.q = zip;
        if(cnt) params.cnt = cnt;

        return this.rm.sendRequest(new Request(this.endpoint, 'ByZipCode', params));
    }
}

module.exports = Forecast;