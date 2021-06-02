This app integrate Nibe heat pumps into Homey.
Access data from Nibe uplink and get the current status of your heat pump.

Trigger temporary lux and ventilation boost is supported but requires a Nibe uplink premium account.

To develop you need to create your own application on https://api.nibeuplink.com/Applications
callback url: https://callback.athom.com/oauth2/callback

And fill the "Identifier" as "CLIENT_ID" and "Secret" as "CLIENT_SECRET" in a new file:
env.json 

{
  "CLIENT_ID": "12345abcde",
  "CLIENT_SECRET": "182hr2389r824ilikepie1302r0832"
}