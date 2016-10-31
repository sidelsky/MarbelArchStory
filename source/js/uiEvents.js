
'use strict';

/* ==========================================================================

  	Ui events and listeners

  	Attach any global listeners here like scroll and resize. We can then use the trottled versions when the events fire elsewhere.

	- Example listeners from here for your code:

	mediator.on(config.eventNames.ui.windowScroll, function(currentScrollTop) {
		//do your stuff here
	});


	mediator.on(config.eventNames.ui.windowResize, function(currentWidth) {
		//do your stuff here
	});


========================================================================== */

var $ = window.$;
var mediator = require('mediatorjs');
var config = require('./config');
var throttle = require('lodash.throttle');
var debounce = require('lodash.debounce');

var $window = config.elements.$window;


function ev_resize(e) {
  mediator.trigger(config.eventNames.ui.windowResize, window.innerWidth);
}

function ev_scroll(e) {
  mediator.trigger(config.eventNames.ui.windowScroll, $window.scrollTop());
}


var UiEvents = function UiEvents() {
	this._attachListeners()
};

UiEvents.prototype._attachListeners = function() {

	/*  Window resize throttler
	 -----------------------------------*/
	window.onresize = debounce(ev_resize, 200);

	/*  Window scroll throttler
	 -----------------------------------*/
	$window.scroll(throttle(ev_scroll, 100));

	window.onpopstate = function(event) {
	    mediator.trigger(config.eventNames.popStateFired, event.state);
	};

};

module.exports = new UiEvents();
