
/*------------------------------------*\
	Utilities
	Reusable single purpose methods.
\*------------------------------------*/

'use strict';

var $ = window.$;
var config = require('./config');
var mediator = require('mediatorjs');

var eventNames = config.eventNames;
var $window = config.elements.$window;



var Utilities = {

	/*  Is in view.
		Is the top of the passed element in view?
		Buffer adds to the calculation. So buffer 100 means it will be true if the element is 100px below the fold.
	 -----------------------------------*/
	isInView : function($elem, buffer) {

		//out of top
	    if ($window.scrollTop() > ($elem.offset().top + $elem.height())) {
	      	return false;
		}
		//out of bottom
	    if (($window.scrollTop() + $window.height()) < $elem.offset().top) {
	      	return false;

	    }
	    return true;

	},

  	/*  Parse Params
    	Returns all url query string parameters as object from the full current url
      	Reverse of jQuery.param see: https://gist.github.com/kares/956897
	 -----------------------------------*/
	parseUrlParams: function() {

		var query = window.location.href.split('?')[1];

		if (!query) {
			return {};
		}

		var re = /([^&=]+)=?([^&]*)/g;
		var decodeRE = /\+/g;  // Regex for replacing addition symbol with a space
		var decode = function (str) {return decodeURIComponent( str.replace(decodeRE, " ") );};
		var params = {}, e;
		while ( e = re.exec(query) ) {
		    var k = decode( e[1] ), v = decode( e[2] );
		    if (k.substring(k.length - 2) === '[]') {
		        k = k.substring(0, k.length - 2);
		        (params[k] || (params[k] = [])).push(v);
		    }
		    else params[k] = v;
		}
		return params;

	},

	/*  Get html from another page.
		Passed params:
		url : url of the page
		htmlID : the html element id to have it's contens pulled in.
		cb: callback after load
	 -----------------------------------*/
	getHtmlViaAjax: function(url, htmlId, cb) {
		var _this  = this;
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'html'
		})
		.done(function(data, msg, xhr) {
			if (msg === 'success') {
				cb($(data).find("#" + htmlId).html());
			} else {
			    console.error("Error retrieving html with load more : " + msg);
			}
		})
		.fail(function(xhr, msg) {
			console.error("Error retrieving html with load more : " + msg);
		});
	},

	/*  Build url with params.

		Takes passes params and replace ALL params with the passed set.
		call utilities.parseUrlParams first to get current set and add your params to it.
		Anything more advanced than this router wise will need a plugin like: https://github.com/krasimir/navigo
		Passed params should be in object notation eg:
		{
			"page" : 1
		}
	 -----------------------------------*/
	buildUrlWithParams : function(params) {

		var paramStr = $.param(params);
		var base = window.location.href.indexOf('?') > -1 ? window.location.href.split('?')[0] : window.location.href;
      	var newUrl = base + '?' + paramStr;

	    return newUrl;

	},

	/*  Set new url with history state.
		No fall back at this stage as nothing is being driven by url or popstate as yet.
	 -----------------------------------*/
	setUrl : function(newUrl, isFromPopState) {

		if (history && history.pushState) {
		    if (!isFromPopState) {
		    	window.history.pushState({path:newUrl},'',newUrl);
		    }
		}

	}




};




module.exports = Utilities;
