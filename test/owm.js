const assert                        = require('chai').assert;
const request                       = require('../lib/Request');
const pkg                           = require('../package');
const openweathermap                = require('../index');
// e24283165def1ab77dcc2ec892daab8d
const weather = new openweathermap('81b3d5ab1004c595c1448f478a558925', 'metric');

describe(`${pkg.name}/Client`, function() {
    
    describe('#Request', function() {
        it('isEqual', function() {
            var baseRequest = new request('/this/is/a/endpoint', 'fName', {a: 'a', b: 'b'});
            var tempRequest = new request('/this/is/a/endpoint', 'fName', {a: 'a', b: 'b'});
    
            assert.equal(baseRequest.isEqual(tempRequest), true, 'Both request should be equal.');
        })
    
        it('isEqual - different enpoints', function() {
            var baseRequest = new request('/this/is/a/endpoint', 'fName', {a: 'a', b: 'b'});
            var tempRequest = new request('/this/is/a/different/endpoint', 'fName', {a: 'a', b: 'b'});
    
            assert.equal(baseRequest.isEqual(tempRequest), false, 'Both request should be different.');
        })
    
        it('isEqual - different calls', function() {
            var baseRequest = new request('/this/is/a/endpoint', 'fName', {a: 'a', b: 'b'});
            var tempRequest = new request('/this/is/a/endpoint', 'fDifferentName', {a: 'a', b: 'b'});
    
            assert.equal(baseRequest.isEqual(tempRequest), false, 'Both request should be different.');
        })
    
        it('isEqual - different parameter', function() {
            var baseRequest = new request('/this/is/a/endpoint', 'fName', {a: 'a', b: 'b'});
            var tempRequest = new request('/this/is/a/endpoint', 'fName', {a: 'a', b: 'b', c: 'c'});
    
            assert.equal(baseRequest.isEqual(tempRequest), false, 'Both request should be different.');
        })
    
        it('isEqual - different parameter name', function() {
            var baseRequest = new request('/this/is/a/endpoint', 'fName', {a: 'a', b: 'b'});
            var tempRequest = new request('/this/is/a/endpoint', 'fName', {a: 'a', c: 'b'});
    
            assert.equal(baseRequest.isEqual(tempRequest), false, 'Both request should be different.');
        })
        
        it('isEqual - different parameter value', function() {
            var baseRequest = new request('/this/is/a/endpoint', 'fName', {a: 'a', b: 'b'});
            var tempRequest = new request('/this/is/a/endpoint', 'fName', {a: 'a', b: 'c'});
    
            assert.equal(baseRequest.isEqual(tempRequest), false, 'Both request should be different.');
        })
    })

    describe('#CurrentWeather', function() {
        it('ByCityName', async function() {
            var response = await weather.current.ByCityName('London');
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByCityName with CountryCode', async function() {
            var response = await weather.current.ByCityName('London', 'uk');
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByCityID', async function() {
            var response = await weather.current.ByCityID(2172797);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByGeographicCoordinates', async function() {
            var response = await weather.current.ByGeographicCoordinates(35, 139);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByZipCode', async function() {
            var response = await weather.current.ByZipCode(94040);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByZipCode with countryCode', async function() {
            var response = await weather.current.ByZipCode(94040, 'us');
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByRectangleZone minreq', async function() {
            var response = await weather.current.ByRectangleZone(12,32,15,37,10);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByRectangleZone with clustering of points', async function() {
            var response = await weather.current.ByRectangleZone(12,32,15,37,10, 'yes');

            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByCircle min', async function() {
            var response = await weather.current.ByCircle(55.5, 37.5);

            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByCircle with only 2 cities', async function() {
            var response = await weather.current.ByCircle(55.5, 37.5, 2);

            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByCircle with only 2 cities and clustering of points', async function() {
            var response = await weather.current.ByCircle(55.5, 37.5, 2, 'yes');
            
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('MultipleCity', async function() {
            var response = await weather.current.MultipleCity([524901,703448,2643743]);
            
            assert.isNotEmpty(response, 'response should not be empty');
        })
    })

    describe('#UltravioletIndex', function() {
        it('CurrentByGeographicCoordinates', async function() {
            var response = await weather.uv.CurrentByGeographicCoordinates(37.75, -122.37);

            assert.isNotEmpty(response, 'response should not be empty');
        })

        it('ForecastByGeographicCoordinates', async function() {
            var response = await weather.uv.ForecastByGeographicCoordinates(37.75, -122.37);

            assert.isNotEmpty(response, 'response should not be empty');
        })

        it('ForecastByGeographicCoordinates with two days in return', async function() {
            var response = await weather.uv.ForecastByGeographicCoordinates(37.75, -122.37, 2);

            assert.isNotEmpty(response, 'response should not be empty');
        })

        it('HistoricleByGeographicCoordinates', async function() {
            var response = await weather.uv.HistoricleByGeographicCoordinates(37.75, -122.37, 1498049953, 1498481991);

            assert.isNotEmpty(response, 'response should not be empty');
        })

        it('HistoricleByGeographicCoordinates with two days in return', async function() {
            var response = await weather.uv.HistoricleByGeographicCoordinates(37.75, -122.37, 1498049953, 1498481991, 2);

            assert.isNotEmpty(response, 'response should not be empty');
        })
    })

    describe('#Forecast', function() {
        it('ByCityName', async function() {
            var response = await weather.forecast.ByCityName('London');
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByCityName with CountryCode', async function() {
            var response = await weather.forecast.ByCityName('London', 'uk');
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByCityName with CountryCode and a two days result', async function() {
            var response = await weather.forecast.ByCityName('London', 'uk', 2);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })
        
        it('ByCityID', async function() {
            var response = await weather.forecast.ByCityID(2172797);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByCityID with a two days result', async function() {
            var response = await weather.forecast.ByCityID(2172797, 2);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })
        
        it('ByGeographicCoordinates', async function() {
            var response = await weather.forecast.ByGeographicCoordinates(35, 139);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByGeographicCoordinates with a two days result', async function() {
            var response = await weather.forecast.ByGeographicCoordinates(35, 139, 2);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })
        
        it('ByZipCode', async function() {
            var response = await weather.forecast.ByZipCode(94040);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByZipCode with countryCode', async function() {
            var response = await weather.forecast.ByZipCode(94040, 'us');
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })

        it('ByZipCode with countryCode and a two days result', async function() {
            var response = await weather.forecast.ByZipCode(94040, 'us', 2);
    
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cod, 'response shoud be defind for a valid response');
        })
    })
});