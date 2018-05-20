const Request                   = require('../Request');

class UltravioletIndex {

    /**
     * 
     * @param {RequestManager} rm 
     */
    constructor(rm) {
        this.rm = rm;
        this.endpoint = '/data/2.5/uvi';
    }

    /**
     * 
     * @param {Number} lat              latitude
     * @param {Number} lon              longitude
     */
    CurrentByGeographicCoordinates(lat, lon) {
        // api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37
        return this.rm.sendRequest(new Request(this.endpoint, 'ByGeographicCoordinates', {lat: lat, lon: lon}));
    }

    /**
     * 
     * @param {Number} lat              latitude
     * @param {Number} lon              longitude
     * @param {Number} cnt              optional "number of returned days"
     */
    ForecastByGeographicCoordinates(lat, lon, cnt = null) {
        // api.openweathermap.org/data/2.5/uvi/forecast?lat=37.75&lon=-122.37
        var params = {lat: lat, lon: lon}
        if(cnt) params.cnt = cnt;
        
        return this.rm.sendRequest(new Request(this.endpoint + '/forecast', 'ByGeographicCoordinates', params));
    }

    /**
     * 
     * @param {Number} lat              latitude
     * @param {Number} lon              longitude
     * @param {Number} start            start point. Type: Unix Time
     * @param {Number} end              end point. Type: Unix Time
     * @param {Number} cnt              optional "number of returned days"
     */
    HistoricleByGeographicCoordinates(lat, lon, start, end, cnt = null) {
        // api.openweathermap.org/data/2.5/uvi/history?lat=37.75&lon=-122.37&start=1498049953&end=1498481991
        var params = {lat: lat, lon: lon, start: start, end: end}
        if(cnt) params.cnt = cnt;
        
        return this.rm.sendRequest(new Request(this.endpoint + '/history', 'ByGeographicCoordinates', params));
    }
}

module.exports = UltravioletIndex;