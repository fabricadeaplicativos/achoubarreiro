var fs   = require('fs'),
	path = require('path');

// read appdef
var appDefJSON = fs.readFileSync(path.join(__dirname, 'data/appdef.json')),
	appDef = JSON.parse(appDefJSON);


// extract pages and write to pages file
var pagesJSON =  JSON.stringify(appDef.pages, null, '\t');
fs.writeFileSync(path.join(__dirname, 'data/pages.json'), pagesJSON, {
	encoding: 'utf-8'
});


// extract page instance ids
var pageIdParser = require('./parsers/page-ids');
var pageids = pageIdParser(appDef.pages);

console.log(pageids)

fs.writeFileSync(path.join(__dirname, 'data/page-ids.json'), JSON.stringify(pageids), {
	encoding: 'utf-8',
});