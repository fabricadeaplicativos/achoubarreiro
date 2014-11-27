var fs   = require('fs'),
	path = require('path');

var bbcode = require('bbcode');

// read ITEMS json
var itemsJSON = fs.readFileSync(path.join(__dirname, 'src/items.json')),
	ITEMS     = JSON.parse(itemsJSON);


var RESULT = []
ITEMS.forEach(function (item, index) {

	var resItem = {
		id: '' + index,
		category: '' + item.moblet_id,
		image: item.image,
	};

	/////////////
	// ADDRESS //
	var addressRegexp = /(?:^\[b])((?:.|\n)*?)(?:\[\/b])/;
	var addressMatch  = item.description.match(addressRegexp);

	if (addressMatch) {
		resItem.address = addressMatch[1].replace(/\s*\n[\n\\]*\s*/, ' - ');
	}
	// ADDRESS //
	/////////////
	
	////////////
	// LATLNG //
	var latlngRegexp = /(?:google.*?(?:@|sll=))(.*?)(?:,)(.*?)(?:,)/;
	var latlngMatch  = item.description.match(latlngRegexp);

	if (latlngMatch) {
		resItem.location = [parseFloat(latlngMatch[1]), parseFloat(latlngMatch[2])];
	} else {

		console.log(index + ' has no latlng');;
	}
	// LATLNG //
	////////////
	
	///////////
	// PHONE //
	var phoneRegexp = /(?:\[tel=)(\d*?)(?:])/;
	var phoneMatch  = item.description.match(phoneRegexp);

	if (phoneMatch) {
		resItem.phone = phoneMatch[1];
	}
	// PHONE //
	///////////
	
	
	///////////
	// EMAIL //
	var emailRegexp = /(?:\[email=)(.*?)(?:])/;
	var emailMatch  = item.description.match(emailRegexp);

	if (emailMatch) {
		resItem.email = emailMatch[1];
	}
	// EMAIL //
	///////////

	
	////////////
	// PHOTOS //
	var fotosRegexp = /(?:Fotos)((?:.|\n)*)/;
	var fotosMatch  = item.description.match(fotosRegexp);

	if (fotosMatch) {
		var imagesRegexp = /(?:\[img])(.*?)(?:\[\/img])/g;

		resItem.photos = [];
		var imageMatch;

		while ((imageMatch = imagesRegexp.exec(fotosMatch[1])) !== null) {
			resItem.photos.push(imageMatch[1]);
		}

	}
	// PHOTOS //
	////////////



	///////////////////////////
	// PROCESSED DESCRIPTION //
//	resItem.description = bbcode.parse(item.description);

	// PROCESSED DESCRIPTION //
	///////////////////////////

	RESULT.push(resItem);
});


var resultJSON = JSON.stringify(RESULT, null, '\t');

// write
fs.writeFileSync(path.join(__dirname, 'dest/items.json'), resultJSON, {
	encoding: 'utf-8',
});