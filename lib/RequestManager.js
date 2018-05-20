const axios               = require('axios')

class RequestManager {

    /**
     * 
     * @param {string} key 
     * @param {string} unit                 optional [imperial, metric] default Kelvin
     */
    constructor(key, unit = null) {
        this.key = key;
        this.unit = unit;
        this.host = 'https://api.openweathermap.org';
    }


    /**
     * send request to the given endpoint
     * @param {Request} request
     */
    async sendRequest(request) {
        var error = null;

        // add key and other importent parameter
        request.parameter.appid = this.key;
        if(this.unit) request.parameter.units = this.unit;

        try {
            let response = await axios.get(this.host + request.endpoint, {params : request.parameter});

            return Promise.resolve(response.data);
        } catch(error) {
            if(!error.response) {
                error = new Error('Wrapper encountered an error');
                error.status = 500;
            } else if(!error.response.data) {
                console.log(error);
                error = new Error('Wrapper encountered an error');
                error.status = 500;
            } else {
                var e = error.response.data;
                error = new Error(e.message);
                error.status = e.cod;
            }

            return Promise.reject(error);
        }    
    }
}

module.exports = RequestManager;