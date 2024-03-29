'use strict';

const { OAuth2Client } = require('homey-oauth2app');

class NibeOAuth2Client extends OAuth2Client {
    static API_URL = 'https://api.nibeuplink.com';
    static TOKEN_URL = 'https://api.nibeuplink.com/oauth/token';
    static AUTHORIZATION_URL = 'https://api.nibeuplink.com/oauth/authorize';
    static SCOPES = ['READSYSTEM', 'WRITESYSTEM'];

    async getSystems() {
        return this.get({
            path: '/api/v1/systems'
        })
    }

    async getSystem(id) {
        return this.get({
            path: `/api/v1/systems/${id}`
        })
    }

    async getSystemParameters(id, params) {
        return this.get({
            path: `/api/v1/systems/${id}/parameters`,
            query: params
        })
    }

    async getSystemStatus(id) {
        return this.get({
            path: `/api/v1/systems/${id}/status/system`
        })
    }

    async getSystemUnits(id) {
        return this.get({
            path: `/api/v1/systems/${id}/units`
        })
    }

    async getSystemCategories(id) {
        return this.get({
            path: `/api/v1/systems/${id}/serviceinfo/categories`
        })
    }

    async getCategoryParameters(id, category) {
        return this.get({
            path: `/api/v1/systems/${id}/serviceinfo/categories/status?categoryId=${category}`
        })
    }

    async getSystemPremium(id) {
        return this.get({
            path: `/api/v1/systems/${id}/premium`
        })
    }

    async getSmartHomeThermostats(id) {
        return this.get({
            path: `/api/v1/systems/${id}/smarthome/thermostats`
        })
    }

    async getSmartHomeMode(id) {
        return this.get({
            path: `/api/v1/systems/${id}/smarthome/mode`
        })
    }

    async putParameters(id, settings) {
        return this.put({
            path: `/api/v1/systems/${id}/parameters`,
            json: {
              "settings": settings
            }
        })
    }

    async postSmartHomeThermostats(id,
                                   thermostat_id,
                                   thermostat_name,
                                   measured_temp,
                                   target_temp,
                                   climate_systems) {
        return this.post({
            path: `/api/v1/systems/${id}/smarthome/thermostats`,
            json: {
                "externalId": thermostat_id,
                "name": thermostat_name,
                "actualTemp": measured_temp*10,
                "targetTemp": target_temp*10,
                "climateSystems": [climate_systems.charAt(climate_systems.length-1)]
            }
        })
    }

    async putSmartHomeMode(id, mode) {
        return this.put({
            path: `/api/v1/systems/${id}/smarthome/mode`,
            json: {
                "mode": mode
            }
        })
    }
}

module.exports = NibeOAuth2Client;
