


/*------------------------------------*\
	Components
	Load all components in here.
\*------------------------------------*/

var $ = window.$;
var mediator = require('mediatorjs');
var eventNames = require('./config').eventNames;


var Components = function Components() {
	mediator.on(eventNames.ui.contentLoaded, this._loadComponents);
	this._loadComponents($('body'));
};

/*  All Components will initilialise in this method.
	If content is added to the page via ajax,
	the method will be called again and the initialisations rerun on child elements of the parent
 -----------------------------------*/
Components.prototype._loadComponents = function($parent) {

	var $appendArounds = $parent.find('.js-append-around');
	$appendArounds.each(function() {
		$(this).appendAround();
	});

	// Element in view
	var $inView = $parent.find('[data-js-in-view-alert]');
	if ($inView.length) {
		var InView = require('./components/inViewAlert');
		$inView.each(function() {
			new InView($(this));
		});
	}



};

module.exports = new Components();
