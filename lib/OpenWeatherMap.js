const RequestManager            = require('./RequestManager');
const CurrentWeather            = require('./modules/CurrentWeather');
const UltravioletIndex          = require('./modules/UltravioletIndex')
const Forecast                  = require('./modules/Forecast')

class OpenWeatherMap {

    /**
     * 
     * @param {string} key 
     * @param {string} unit                 optional [imperial, metric] default Kelvin
     * @param {string} format               optional [json, xml, html]
     */
    constructor(key, unit = null) {
        this.rm = new RequestManager(key, unit);

        this.current = new CurrentWeather(this.rm);
        this.uv = new UltravioletIndex(this.rm);
        this.forecast = new Forecast(this.rm);
    }
}

module.exports = OpenWeatherMap;