var fs   = require('fs'),
	path = require('path');

var bbcode = require('bbcode');

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

	//////////////
	// CATEGORY //
	// search for the page
	var itemPage = pages.filter(function (page) {
		// return true if page is right for the item
		return page.moblets[0].instance.id == itemPageId;

	})[0];

	// set the title of the page as the category of the item
	if (itemPage) {
		item.categoryTitle = itemPage.name;

		item.categories = itemPage.name.split(/(?:\s*,\s*|\s+e\s+)/);
	}
	// CATEGORY //
	//////////////

	/////////////
	// ADDRESS //
	var addressRegexp = /(?:^\[b])((?:.|\n)*?)(?:\[\/b])/;
	var addressMatch  = item.description.match(addressRegexp);

	if (addressMatch) {
		item.address = addressMatch[1];
	}
	// ADDRESS //
	/////////////
	
	////////////
	// LATLNG //
	var latlngRegexp = /(?:google.*?@)(.*?)(?:,)(.*?)(?:,)/;
	var latlngMatch  = item.description.match(latlngRegexp);

	if (latlngMatch) {
		item.location = [parseFloat(latlngMatch[1]), parseFloat(latlngMatch[2])];
	}
	// LATLNG //
	////////////
	
	///////////
	// PHONE //
	var phoneRegexp = /(?:\[tel=)(\d*?)(?:])/;
	var phoneMatch  = item.description.match(phoneRegexp);

	if (phoneMatch) {
		item.phone = phoneMatch[1];
	}
	// PHONE //
	///////////
	
	
	///////////
	// EMAIL //
	var emailRegexp = /(?:\[email=)(.*?)(?:])/;
	var emailMatch  = item.description.match(emailRegexp);

	if (emailMatch) {
		item.email = emailMatch[1];
	}
	// EMAIL //
	///////////

	
	////////////
	// PHOTOS //
	var fotosRegexp = /(?:Fotos)((?:.|\n)*)/;
	var fotosMatch  = item.description.match(fotosRegexp);

	if (fotosMatch) {
		var imagesRegexp = /(?:\[img])(.*?)(?:\[\/img])/g;

		item.photos = [];
		var imageMatch;

		while ((imageMatch = imagesRegexp.exec(fotosMatch[1])) !== null) {
			item.photos.push(imageMatch[1]);
		}

	}
	// PHOTOS //
	////////////



	////////////////////////
	// PARSED DESCRIPTION //
	item.parsedDescription = bbcode.parse(item.description);

	// PARSED DESCRIPTION //
	////////////////////////

});


var resultItemsJSON = JSON.stringify(items, null, '\t');

// write
fs.writeFileSync(path.join(__dirname, '..', 'data/items-final.json'), resultItemsJSON, {
	encoding: 'utf-8',
});