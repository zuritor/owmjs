const Request                   = require('../Request');

class CurrentWeather {

    /**
     * 
     * @param {RequestManager} rm 
     */
    constructor(rm) {
        this.rm = rm;
        this.endpoint = '/data/2.5/weather';
    }

    /**
     * 
     * @param {string} name             e.g. Cologne, London, New York
     * @param {string} country          ISO 3166 country codes. e.g. uk
     */
    ByCityName(name, country = null) {
        // api.openweathermap.org/data/2.5/weather?q={city name},{country code}
        
        var q;
        if(country) q = `${name},${country}`;
        else q = name;

        return this.rm.sendRequest(new Request(this.endpoint, 'ByCityName', {q: q}));
    }

    /**
     * 
     * @param {Number} id               visit http://bulk.openweathermap.org/sample/
     */
    ByCityID(id) {
        //  api.openweathermap.org/data/2.5/weather?id=2172797
        return this.rm.sendRequest(new Request(this.endpoint, 'ByCityID', {id: id}));
    }

    /**
     * 
     * @param {Number} lat              latitude
     * @param {Number} lon              longitude
     */
    ByGeographicCoordinates(lat, lon) {
        // api.openweathermap.org/data/2.5/weather?lat=35&lon=139
        return this.rm.sendRequest(new Request(this.endpoint, 'ByGeographicCoordinates', {lat: lat, lon: lon}));
    }

    /**
     * 
     * @param {Number} zip 
     * @param {string} country          ISO 3166 country codes. e.g. uk
     */
    ByZipCode(zip, country = null) {
        // api.openweathermap.org/data/2.5/weather?zip=94040,us

        var q;
        if(country) q = `${zip},${country}`;
        else q = zip;

        return this.rm.sendRequest(new Request(this.endpoint, 'ByZipCode', {zip: q}));
    }


    /**
     * 
     * @param {Number} lonleft          longitude Left
     * @param {Number} latbottom        latitude Bottom
     * @param {Number} lonright         longitude Right
     * @param {Number} lattop           latitude Top
     * @param {Number} zoom  
     * @param {String} cluster         optional [yes, no] 'use server clustering of points'
     * @see {@link https://openweathermap.org/current }
     */
    ByRectangleZone(lonleft, latbottom, lonright, lattop, zoom, cluster = null) {
        // "Parameter: 
        // bbox bounding box [lon-left,lat-bottom,lon-right,lat-top,zoom]
        // callback javascript functionName
        // cluster use server clustering of points. Possible values ​​are [yes, no]
        // lang language [ru, en ... ]"
        // http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10
        var box = lonleft + "," + latbottom + "," + lonright + "," + lattop + "," + zoom;

        var parameter = {bbox: box};
        if(cluster) parameter.cluster = cluster;

        return this.rm.sendRequest(new Request('/data/2.5/box/city', 'ByRectangleZone', parameter));
    }

    /**
     * 
     * @param {Number} lat 
     * @param {Number} long 
     * @param {Number} cnt              optional: "number of cities around the point that should be returned"
     * @param {string} cluster          optional [yes, no] "use server clustering of points"
     * @see {@link https://openweathermap.org/current}
     */
    ByCircle(lat, lon, cnt = null, cluster = null) {
        // "Parameter:
        // lat latitude
        // lon longitude
        // callback functionName for JSONP callback.
        // cluster use server clustering of points. Possible values ​​are [yes, no]
        // lang language [en , ru ... ]
        // cnt number of cities around the point that should be returned"
        // http://api.openweathermap.org/data/2.5/find?lat=55.5&lon=37.5&cnt=10

        var parameter = {lat: lat, lon: lon}
        if(cnt) parameter.cnt = cnt;
        if(cluster) parameter.cluster = cluster;

        return this.rm.sendRequest(new Request('/data/2.5/find', 'ByCircle', parameter));
    }

    /**
     * 
     * @param {Number[]} cities         list of city ids
     * @see {@link https://openweathermap.org/current }
     * @see {@link http://bulk.openweathermap.org/sample/ list of cities}
     */
    MultipleCity(cities) {
        // http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric 
        return this.rm.sendRequest(new Request('/data/2.5/group', 'MultipleCity', {id: cities.join(',')}));
    }
}

module.exports = CurrentWeather;