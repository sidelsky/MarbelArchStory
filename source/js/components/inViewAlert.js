

/*------------------------------------*\
	In view alert.

	Adds a class is-visible when full element is in view.

	<div ></div>

\*------------------------------------*/

'use strict';

var $ = window.$;
var mediator = require('mediatorjs');
var config = require('../config');
var utilities = require('../utilities');

var InViewAlert = function Video($elem) {
	var _this = this;
	this.$elem = $elem;
	this.hideAfter = this.$elem.data('hideAfterSeconds')*1;
	this.isVisible = false;
	this._toggleInView(utilities.isInView(_this.$elem));
	mediator.on(config.eventNames.ui.windowScroll, function(currentScrollTop) {
		_this._toggleInView(utilities.isInView(_this.$elem));
	});
};

/*  Add animation class when in view, and then hide element after some seconds.
 -----------------------------------*/
InViewAlert.prototype._toggleInView = function (isInView) {
	var $elem = this.$elem;
	if (isInView && !this.isVisible) {
		this.isVisible = true;
		$elem.addClass(config.cssClasses.isVisible);
		if (this.hideAfter) {
			setTimeout(function(){
				$elem.removeClass(config.cssClasses.isVisible);
			}, this.hideAfter);
		}
	}
};


module.exports = InViewAlert;
