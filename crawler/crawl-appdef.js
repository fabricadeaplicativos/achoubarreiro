var fs   = require('fs'),
	path = require('path');

// read appdef
var appDefJSON = fs.readFileSync(path.join(__dirname, 'src/appdef.json')),
	APPDEF     = JSON.parse(appDefJSON);

// DIRECT REFERENCE TO PAGES
var PAGES = APPDEF.pages;


//////////////
// PAGE IDS //
var PAGEIDS = [];

PAGES.forEach(function (page, index) {

	if (page.entries) {
		// is a categories page
		

		page.entries.forEach(function (e) {
			PAGEIDS.push(e.instance.id);
		});
		
	} else {
		// is a list instance
		PAGEIDS.push(page.moblets[0].instance.id);
	}
});

fs.writeFileSync(path.join(__dirname, 'dest/page-ids.json'), JSON.stringify(PAGEIDS), {
	encoding: 'utf-8',
});

// PAGE IDS //
//////////////


////////////////
// CATEGORIES //
var CATEGORIES = [];
PAGES.forEach(function (page, index) {

	var cat = {
		id: page.moblets[0].instance.id,
		name: page.name,
		tags: page.name.split(/(?:\s*,\s*|\s+e\s+)/),
		image: page.icon
	};

	CATEGORIES.push(cat);

});

fs.writeFileSync(path.join(__dirname, 'dest/categories.json'), JSON.stringify(CATEGORIES, null, '\t'), {
	encoding: 'utf-8',
});
fs.writeFileSync(path.join(__dirname, 'src/categories.json'), JSON.stringify(CATEGORIES, null, '\t'), {
	encoding: 'utf-8',
});

// CATEGORIES //
////////////////