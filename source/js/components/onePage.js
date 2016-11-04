/*------------------------------------*\
    One Page
\*------------------------------------*/

'use strict';

var $ = window.$;
var config = require('../config');

// Constructor
var OnePage = function OnePage($domElem) {

	this.$elem = $domElem;
	this.$fullpage = this.$elem;

	this._init();
};

OnePage.prototype._handleOnePage = function($domElem) {
	var _this = this;

	_this.$fullpage.fullpage(
		{
			verticalCentered: true,
			navigation: true,
			navigationPosition: 'right',
        	navigationTooltips: ['firstSlide', 'secondSlide'],
			css3: true,
        	scrollingSpeed: 700,
			autoScrolling: false,
			fitToSection: false,
			//normalScrollElements: '#scene1'
		}
	);

};

// Initialise the component.
OnePage.prototype._init = function($elem) {
	this._handleOnePage();
};


module.exports = OnePage;
