var fs   = require('fs'),
	path = require('path');

// read pages json
var pagesJSON = fs.readFileSync(path.join(__dirname, '..', 'data/pages.json')),
	pages     = JSON.parse(pagesJSON);

// read items json
var itemsJSON = fs.readFileSync(path.join(__dirname, '..', 'data/items.json')),
	items     = JSON.parse(itemsJSON);


var addressRegexp = /(?:^\[b\]).*?(?:\[\/b\])/;

items.forEach(function (item) {

	var match = item.description.match(addressRegexp);

	if (match) {
		item.address = match[1];
	}

});


var resultItemsJSON = JSON.stringify(items, null, '\t');

// write
fs.writeFileSync(path.join(__dirname, '..', 'data/items-final.json'), resultItemsJSON, {
	encoding: 'utf-8',
});