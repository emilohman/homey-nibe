// Nibe

'use strict';

const { OAuth2App } = require('homey-oauth2app');
const NibeOAuth2Client = require('./lib/NibeOAuth2Client');

class NibeApp extends OAuth2App {
	static OAUTH2_CLIENT = NibeOAuth2Client;
	static OAUTH2_DEBUG = false;
	static OAUTH2_MULTI_SESSION = true;
	static OAUTH2_DRIVERS = ['nibe'];

  onOAuth2Init() {

	}
}

module.exports = NibeApp;
