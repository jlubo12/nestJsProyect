'use strict';

const fetch = require('node-fetch');
const https = require('https');
const { mapError } = require('../services/accountsApiRequest');

module.exports = class ApiRequest{

    get headers() {
		return this._headers;
	}

	get body() {
		return this._body;
	}

    set headers(obj) { 
        this._headers = obj;
    }

    set body(obj){
        this._body = obj;
    }

    get endpoint(){}

    get method(){}

    get fetchParams(){}

    get httpsAgent(){
        return new https.Agent({
			rejectUnauthorized: false,
		  });
    }

    mapResult(result){} 

    mapError(code){}

    get errorMessage(){
        return 'error inesperado';
    }

    constructor(){
        this.headers = {};
        this.body = {};
    }

    async execute() {
        const response = await fetch(this.endpoint, this.fetchParams)
        const result = await response.json();

        if(response.status === 500)
			throw new Error(this.errorMessage)

        if(response.status != 200)
          return this.mapError(response.status);
          
        return this.mapResult(result);
    }
}