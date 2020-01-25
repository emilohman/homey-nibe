'use strict';

const { OAuth2Driver } = require('homey-oauth2app');

class NibeDriver extends OAuth2Driver {
    onOAuth2Init() {
        this.log('Initializing NibeDriver');
    }

    async onPairListDevices({ oAuth2Client }) {
        const systems = await oAuth2Client.getSystems();
        return systems.objects.map(system => {
            return {
                name: system.name,
                data: {
                    id: system.systemId,
                }
            }
        });
    }
}

module.exports = NibeDriver;
