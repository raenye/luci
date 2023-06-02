'use strict';
'require baseclass';
'require fs';
'require form';

return baseclass.extend({
	title: _('S.M.A.R.T. Plugin Configuration'),
	description: _('The SMART plugin reads Self-Monitoring, Analysis and Reporting Technology (SMART) information from hard disk drives.'),

	addFormOptions: function(s) {
		var o;

		o = s.option(form.Flag, 'enable', _('Enable this plugin'));

		o = s.option(form.DynamicList, 'Disks', _('Monitor disks'),
			_('When none selected, all disks will be monitored.'));
		o.depends('enable', '1');
		o.load = function(section_id) {
			return fs.trimmed('/proc/partitions').then(L.bind(function(str) {
				var lines = (str || '').split(/\n/);

				for (var i = 0; i < lines.length; i++) {
					var m = lines[i].match(/^ +[0-9]+ +[0-9]+ +[0-9]+ (\S+\D)$/);
					if (m)
						this.value(m[1]);
				}

				return this.super('load', [section_id]);
			}, this));
		};

		o = s.option(form.Flag, 'IgnoreSelected', _('Monitor all except specified'));
		o.depends('enable', '1');
	},

	configSummary: function(section) {
		var disks = L.toArray(section.Disks),
		    invert = section.IgnoreSelected == '1';

		if (disks.length == 0)
			return _('Monitoring all disks');
		else if (invert)
			return N_(disks.length, 'Monitoring all but one disk', 'Monitoring all but %d disks').format(disks.length);
		else
			return N_(disks.length, 'Monitoring one disk', 'Monitoring %d disks').format(disks.length);
	}
});
