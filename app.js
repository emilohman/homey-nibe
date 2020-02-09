// Nibe

'use strict';

const Homey = require('homey');
const { OAuth2App } = require('homey-oauth2app');
const NibeOAuth2Client = require('./lib/NibeOAuth2Client');

class NibeApp extends OAuth2App {

  onOAuth2Init() {
		//this.enableOAuth2Debug();
		this.setOAuth2Config({
			apiUrl: NibeOAuth2Client.API_URL,
			client: NibeOAuth2Client,
			tokenUrl: `${NibeOAuth2Client.API_URL}/oauth/token`,
			authorizationUrl: `${NibeOAuth2Client.API_URL}/oauth/authorize`,
			scopes: ['READSYSTEM', 'WRITESYSTEM'],
		});
	}
}

module.exports = NibeApp;
