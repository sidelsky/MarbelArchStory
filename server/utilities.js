
'use strict';
/* ==========================================================================

  Server Utilities

========================================================================== */

var fs = require('fs');
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

function removeExt(items, ext) {
  var newItems = [];
  items.forEach(function(item) {
    var name = item.split('.')[0];
    if (name.length && item.split('.')[1] === ext) {
      newItems.push(item.split('.')[0]);
    }
  });
  return newItems;
}

var Utilities = function() {
};


/*  Output of all pages to index.html
 -----------------------------------*/
Utilities.prototype.getFileStrings = function() {

    /*

  var pages = removeExt(fs.readdirSync(rootPath + '/source/html/pages'), 'hbs');
  var forms = removeExt(fs.readdirSync(rootPath + '/source/html/pages/forms'), 'hbs');
  var devPages = removeExt(fs.readdirSync(rootPath + '/source/html/pages/DevHelpers'), 'hbs');
  var components = removeExt(fs.readdirSync(rootPath + '/source/html/pages/components'), 'hbs');
  // var modals = removeExt(fs.readdirSync(rootPath + '/source/html/pages/modals'), 'hbs');

  var list = "<h3>Pages</h3><ul>";

  pages.forEach(function(value){
    list += '<li><a href="/' + value + '.html">' + value + '</a></li>';
  });

  list += '</ul><h3>Dev Helpers</h3><ul>';

  devPages.forEach(function(value){
    list += '<li><a href="/devHelpers/' + value + '.html">' + value + '</a></li>';
  });

  list += '</ul><h3>Forms</h3><ul>';

  forms.forEach(function(value){
    list += '<li><a href="/forms/' + value + '.html">' + value + '</a></li>';
  });

  list += '</ul><h3>Mock pages</h3><p>These are only used as ajax html endpoints to retrieve html based on element ids</p><ul>';

  forms.forEach(function(value){
    list += '<li><a href="/mockPages/' + value + '.html">' + value + '</a></li>';
  });

  list += '</ul><h3>Components</h3><ul>';

	components.forEach(function(value) {
		list += '<li><a href="/components/' + value + '.html">' + value + '</a></li>';
	});

	list += '</ul>';

	// list += '</ul><h3>Modals</h3><ul>';

	// modals.forEach(function(value) {
	// 	list += '<li><a href="/modals/' + value + '.html">' + value + '</a></li>';
	// });

	// list += '</ul>';

  return list;

  */
};

module.exports = new Utilities();
