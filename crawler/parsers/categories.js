var fs   = require('fs'),
	path = require('path');

// read pages json
var pagesJSON = fs.readFileSync(path.join(__dirname, '..', 'data/pages.json')),
	pages     = JSON.parse(pagesJSON);

// read items json
var itemsJSON = fs.readFileSync(path.join(__dirname, '..', 'data/items.json')),
	items     = JSON.parse(itemsJSON);

items.forEach(function (item, index) {

	//insert Id for each item
	item.id = index;


	// retrieve the page of the item
	var itemPageId = item.moblet_id;

	// search for the page
	var itemPage = pages.filter(function (page) {

		console.log(itemPageId);
		console.log(page.moblets[0].instance.id);

		// return true if page is right for the item
		return page.moblets[0].instance.id == itemPageId;

	})[0];

	// set the title of the page as the category of the item
	if (itemPage) {
		item.category = itemPage.name;
	}
});


var resultItemsJSON = JSON.stringify(items, null, '\t');

// write
fs.writeFileSync(path.join(__dirname, '..', 'data/items-with-category.json'), resultItemsJSON, {
	encoding: 'utf-8',
});