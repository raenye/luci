/*
 * Copyright 2023 Rani Hod <rani.hod at gmail dot com>
 * Licensed to the public under the Apache License 2.0.
 */

'use strict';
'require baseclass';

return baseclass.extend({
	title: _('S.M.A.R.T.'),

	rrdargs: function(graph, host, plugin, plugin_instance, dtype) {
		return [{
			title: "%H: Disk temperature on %pi",
			alt_autoscale: true,
			vlabel: "Celsius",
			number_format: "%3.1lf%s",

			data: {
				types: [ "smart_attribute" ],
				instances: [ "temperature-celsius-2" ],
				sources: {
					smart_attribute_temperature_celsius_2: [ "current", "worst", "threshold", "pretty" ],
				},

				options: {
					smart_attribute_temperature_celsius_2__current: {
						title: "Current",
						color: "00ff00"
					},

					smart_attribute_temperature_celsius_2__threshold: {
						title: "Threshold",
						color: "00ffff"
					},

					smart_attribute_temperature_celsius_2__pretty: {
						title: "Pretty",
						color: "ffff00"
					},

					smart_attribute_temperature_celsius_2__worst: {
						title: "Worst",
						color: "ff0000"
					}
				}
			}
		}];
	}
});
