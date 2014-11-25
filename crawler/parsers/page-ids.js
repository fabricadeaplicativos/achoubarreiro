var _ = require('lodash');

module.exports = function (raw) {

	var ids = [];


	raw.forEach(function (entry, index) {

		if (entry.entries) {
			// is a categories page
			

			entry.entries.forEach(function (e) {
				ids.push(e.instance.id);
			});
			
		} else {
			// is a list instance
			ids.push(entry.moblets[0].instance.id);
		}
	});


	return ids;

}