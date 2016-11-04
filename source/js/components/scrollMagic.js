/*------------------------------------*\
    One Page
\*------------------------------------*/

'use strict';

var $ = window.$;
var config = require('../config');

// Constructor
var ScrollMagic = function ScrollMagic($domElem) {

	this.$elem = $domElem;
	this.$fullpage = this.$elem;

	this._init();
};

ScrollMagic.prototype._handleScrollMagic = function($domElem) {
	var _this = this;
	//console.log('Magic');

};

// Initialise the component.
ScrollMagic.prototype._init = function($elem) {
	this._handleScrollMagic();
};


module.exports = ScrollMagic;
