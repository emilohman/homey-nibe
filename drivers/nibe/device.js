'use strict';

const Homey = require('homey');
const { OAuth2Device, OAuth2Token, OAuth2Util } = require('homey-oauth2app');

const defaultParameters = {
  '10001': {
    'key': 'ventilation_fan_speed',
    'divideBy': 0,
    'capability': 'speed.fan'
  },
  '10012': {
    'key': 'cpr_info_ep14_blocked',
    'divideBy': 0,
    'bool': true,
    'capability': 'blocked.compressor'
  },
  '10033': {
    'key': 'addition_blocked',
    'divideBy': 0,
    'bool': true,
    'capability': 'blocked.addition'
  },
  '40004': {
    'key': 'status_outdoor_temp',
    'divideBy': 10,
    'capability': 'measure_temperature.outside'
  },
  '40008': {
    'key': 'system_1_heat_medium_flow',
    'divideBy': 10,
    'capability': 'measure_temperature.heat_medium_flow'
  },
  '40012': {
    'key': 'cpr_info_ep14_condenser_return',
    'divideBy': 10,
    'capability': 'measure_temperature.condenser_return'
  },
  '40013': {
    'key': 'status_hot_water_top',
    'divideBy': 10,
    'capability': 'measure_temperature.hot_water_top'
  },
  '40014': {
    'key': 'status_hot_water_charging',
    'divideBy': 10,
    'capability': 'measure_temperature.hot_water_charging'
  },
  '40017': {
    'key': 'cpr_info_ep14_condenser_out',
    'divideBy': 10,
    'capability': 'measure_temperature.condenser_out'
  },
  '40018': {
    'key': 'cpr_info_ep14_hot_gas',
    'divideBy': 10,
    'capability': 'measure_temperature.hot_gas'
  },
  '40019': {
    'key': 'cpr_info_ep14_liquid_line',
    'divideBy': 10,
    'capability': 'measure_temperature.liquid_line'
  },
  '40020': {
    'key': 'cpr_info_ep14_evaporator',
    'divideBy': 10,
    'capability': 'measure_temperature.evaporator'
  },
  '40022': {
    'key': 'cpr_info_ep14_suction_gas',
    'divideBy': 10,
    'capability': 'measure_temperature.suction_gas'
  },
  '40025': {
    'key': 'ventilation_exhaust_air',
    'divideBy': 10,
    'capability': 'measure_temperature.ventilation_exhaust_air'
  },
  '40026': {
    'key': 'ventilation_extract_air',
    'divideBy': 10,
    'capability': 'measure_temperature.ventilation_extract_air'
  },
  '40033': {
    'key': 'system_1_room_temperature',
    'divideBy': 10,
    'capability': 'measure_temperature.inside'
  },
  '40067': {
    'key': 'status_avg_outdoor_temp',
    'divideBy': 10,
    'capability': 'measure_temperature.avg_outside'
  },
  '40071': {
    'key': 'system_1_external_flow_temp'
  },
  '40072': {
    'key': 'heat_meter_flow',
    'divideBy': 10
  },
  '40079': {
    'key': 'status_current_1',
    'divideBy': 10,
    'capability': 'measure_current.phase_1'
  },
  '40081': {
    'key': 'status_current_2',
    'divideBy': 10,
    'capability': 'measure_current.phase_2'
  },
  '40083': {
    'key': 'status_current_3',
    'divideBy': 10,
    'capability': 'measure_current.phase_3'
  },
  '40101': {
    'key': 'outdoor_air_mix_incoming_air_temp',
    'divideBy': 10
  },
  '40919': {
    'key': 'outdoor_air_mix_status',
    'divideBy': 0
  },
  '41026': {
    'key': 'defrosting_value_air_velocity_sensor',
    'divideBy': 10,
    'capability': 'counter.defrosting_value_air_velocity_sensor'
  },
  '43005': {
    'key': 'status_degree_minutes',
    'divideBy': 10,
    'capability': 'degree_minutes'
  },
  '43009': {
    'key': 'system_1_calculated_flow_temp',
    'divideBy': 10,
    'capability': 'measure_temperature.calculated_flow_temp'
  },
  '43081': {
    'key': 'addition_time_factor',
    'divideBy': 10,
    'capability': 'time.addition_time_factor'
  },
  '43084': {
    'key': 'addition_electrical_addition_power',
    'divideBy': 10,
    'capability': 'measure_power.addition_electrical_addition_power'
  },
  '43122': {
    'key': 'cpr_info_ep14_allowed_compr_freq_min',
    'divideBy': 0,
    'capability': 'frequency.allowed_compressor_min'
  },
  '43123': {
    'key': 'cpr_info_ep14_allowed_compr_freq',
    'divideBy': 0,
    'capability': 'frequency.allowed_compressor'
  },
  '43124': {
    'key': 'defrosting_reference_air_velocity_sensor',
    'divideBy': 10,
    'capability': 'counter.defrosting_reference_air_velocity_sensor'
  },
  '43125': {
    'key': 'defrosting_decrease_from_reference',
    'divideBy': 10,
    'capability': 'percentage.defrosting_decrease_from_reference'
  },
  '43136': {
    'key': 'cpr_info_ep14_current_compr_frequency',
    'divideBy': 10,
    'capability': 'frequency.current_compressor'
  },
  '43161': {
    'key': 'system_1_external_adjustment',
    'divideBy': 0,
    'bool': true,
    'capability': 'blocked.external'
  },
  '43416': {
    'key': 'cpr_info_ep14_compressor_starts',
    'divideBy': 0,
    'capability': 'counter.compressor_starts'
  },
  '43420': {
    'key': 'cpr_info_ep14_compressor_operating_time',
    'divideBy': 0,
    'capability': 'time.compressor_operating'
  },
  '43424': {
    'key': 'cpr_info_ep14_compressor_operating_time_hot_water',
    'divideBy': 0,
    'capability': 'time.compressor_operating_hot_water'
  },
  '43437': {
    'key': 'cpr_info_ep14_pump_speed_heating_medium',
    'divideBy': 0,
    'capability': 'speed.pump_speed_heating_medium'
  },
  '44298': {
    'key': 'heat_meter_hw_incl_int_add',
    'divideBy': 10
  },
  '44300': {
    'key': 'heat_meter_heating_int_add_incl',
    'divideBy': 10
  },
  '44306': {
    'key': 'heat_meter_hotwater_compr_only',
    'divideBy': 10
  },
  '44308': {
    'key': 'heat_meter_heating_compr_only',
    'divideBy': 10
  },
  '47212': {
    'key': 'addition_set_max_electrical_add',
    'divideBy': 100,
    'capability': 'measure_power.addition_set_max_electrical_add'
  },
  '47214': {
    'key': 'addition_fuse_size',
    'divideBy': 0,
    'capability': 'measure_current.addition_fuse_size'
  },
  '47407': {
    'key': 'aux_in_out_aux_1',
    'divideBy': 0
  },
  '47408': {
    'key': 'aux_in_out_aux_2'
  },
  '47409': {
    'key': 'aux_in_out_aux_3'
  },
  '47410': {
    'key': 'aux_in_out_aux_4',
    'divideBy': 0
  },
  '47411': {
    'key': 'aux_in_out_aux_5',
    'divideBy': 0
  },
  '47412': {
    'key': 'aux_in_out_x',
    'divideBy': 0
  },
  '48745': {
    'key': 'system_info_country'
  },
  '99999': {
    'key': 'system_alarm',
    'divideBy': 0,
    'bool': true,
    'capability': 'alarm_generic.system'
  },
  '48132': {
    'key': 'hot_water_boost',
    'divideBy': 0,
    'bool': true,
    'capability': 'onoff.hot_water_boost'
  },
  '47260': {
    'key': 'ventilation_boost',
    'divideBy': 0,
    'bool': true,
    'capability': 'onoff.ventilation_boost'
  }
};

class NibeDevice extends OAuth2Device {
    onOAuth2Migrate() {
      const store = this.getStore();
      if( store.token ) {
        const token = new OAuth2Token(store.token);
        const sessionId = OAuth2Util.getRandomId();
        const configId = this.getDriver().getOAuth2ConfigId();

        return {
          sessionId,
          configId,
          token,
        }
      }
    }

    onOAuth2MigrateSuccess() {
      this.unsetStoreValue('token');
    }

    async onOAuth2Init() {
      this.log('Initializing NibeDevice');

      await this.initNibePremium();

      clearInterval(this.fetchIntervalIndex);
      this.fetchIntervalIndex = setInterval(async () => {
        await this.fetchData();
      }, 1000 * 60 * 1);

      try {
        await this.fetchData();
      } catch(error) {
        this.log(error);
      }
    }

    async initNibePremium() {
      this.registerCapabilityListener("onoff.hot_water_boost", async value => {
        if (value) {
          await this.oAuth2Client.putParameters(this.getData().id, {'hot_water_boost': '1'});
        } else {
          await this.oAuth2Client.putParameters(this.getData().id, {'hot_water_boost': '0'});
        }

        return Promise.resolve(true);
      });

      this.registerCapabilityListener("onoff.ventilation_boost", async value => {
        if (value) {
          await this.oAuth2Client.putParameters(this.getData().id, {'ventilation_boost': '1'});
        } else {
          await this.oAuth2Client.putParameters(this.getData().id, {'ventilation_boost': '0'});
        }

        return Promise.resolve(true);
      });

      let hotWaterBoostAction = new Homey.FlowCardAction('hot_water_boost');
      hotWaterBoostAction.register().registerRunListener(async ( args, state ) => {
        await this.oAuth2Client.putParameters(this.getData().id, {'hot_water_boost': args.state});
        return Promise.resolve( true );
      });

      let ventilationBoostAction = new Homey.FlowCardAction('ventilation_boost');
      ventilationBoostAction.register().registerRunListener(async ( args, state ) => {
        await this.oAuth2Client.putParameters(this.getData().id, {'ventilation_boost': args.state});
        return Promise.resolve( true );
      });

      let updateThermostatAction = new Homey.FlowCardAction('update_thermostat');
      const categories = await this.oAuth2Client.getSystemCategories(this.getData().id);
      updateThermostatAction.register().registerRunListener(async ( args, state ) => {
        await this.oAuth2Client.postSmartHomeThermostats(this.getData().id,
            this.hashString(args.thermostat_name),
            args.thermostat_name,
            args.target_temperature,
            args.measured_temperature,
            args.climate_system.name);
        return Promise.resolve( true );
      })
      .getArgument('climate_system')
      .registerAutocompleteListener(( query, args ) => {
        let climate_systems = [];

        for (let i = 0, categoryLength = categories.length; i < categoryLength; i++) {
          const category = categories[i];
          if (category.categoryId.match(/SYSTEM_[0-8]/g)) {
            climate_systems.push({"name": category.name});
          }
        }
        return Promise.resolve(climate_systems);
      })
    }

    async fetchData() {
      const data = this.getData();

      const parameters = await this.getParameters(data.id);

      parameters.forEach((parameter) => {
        if (parameter.capability) {
          this.setCapabilityValue(parameter.capability, parameter.value).then(() => {
            this.log('Setting: ' + parameter.capability + ' to: ' + parameter.value);
          }).catch((err) => {
            this.log('Error setting: ' + parameter.capability + ' to: ' + parameter.value);
            this.log(err);
          });
        }
      });
    }

    async getParameters(id) {
      let params = [];

      const categories = await this.oAuth2Client.getSystemCategories(id);

      for (let i = 0, categoryLength = categories.length; i < categoryLength; i++) {
        const category = categories[i];
        const parameters = await this.oAuth2Client.getCategoryParameters(id, category.categoryId);

        for (let j = 0, length = parameters.length; j < length; j++) {
          const parameter = parameters[j];
          const name = parameter.parameterId || (category.categoryId + '_' + parameter.title.split(/[^a-z]+/gi).join('_')).toLowerCase().replace(/[_]+$/, '');
          const defaults = defaultParameters[name];
          Object.assign(parameter, {
            key: name,
            categoryId: category.categoryId
          }, defaults)

          if (parameter.divideBy > 0) {
            parameter.value = parameter.rawValue / parameter.divideBy;
          } else {
            parameter.value = parameter.rawValue;
          }

          if (parameter.bool) {
            parameter.value = !!parameter.value;
          }

          params.push(parameter);

          if (!parameter.capability) {
            this.log(parameter.key + ': ' + parameter.value);
          }
        };
      };

      // Get system alarm
      const system = await this.oAuth2Client.getSystem(id);

      const parameter = {
        value: system.hasAlarmed,
        key: 99999
      };
      const defaults = defaultParameters[parameter.key];
      Object.assign(parameter, defaults);

      params.push(parameter);

      this.log(parameter.key + ': ' + parameter.value);

      // Get boost parameters
      const boostParameters = await this.oAuth2Client.getSystemParameters(id, {parameterIds: ['hot_water_boost', 'ventilation_boost']});

      for (let k = 0, length = boostParameters.length; k < length; k++) {
        const parameter = boostParameters[k];
        const defaults = defaultParameters[parameter.parameterId];
        Object.assign(parameter, defaults);

        if (parameter.bool) {
          parameter.value = !!parameter.value;
        }

        params.push(parameter);

        this.log(parameter.key + ': ' + parameter.value);
      }
      return params;
    }

    hashString(str){
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }
}

module.exports = NibeDevice;
