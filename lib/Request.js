
class Request {

    /**
     * 
     * @param {string} endpoint 
     * @param {string} call 
     * @param {{}} parameter 
     */
    constructor(endpoint, call, parameter) {
        this.endpoint = endpoint;
        this.call = call;
        this.parameter = parameter;
        this.timestamp = null;
        this.response = null;
    }

    /**
     * 
     * @param {Request} request 
     */
    isEqual(request) {
        if(request.endpoint !== this.endpoint) return false;
        if(request.call !== this.call) return false;

        // check if the amount of parameter is equals
        if(Object.keys(request.parameter).length !== Object.keys(this.parameter).length) return false;

        // check the parameter if they are qual
        for (var param in request.parameter) {
            if(!this.parameter[param]) return false; // key doesnt exists
            if(request.parameter[param] !== this.parameter[param]) return false; // values are not equals
        }

        return true;
    }
}

module.exports = Request;