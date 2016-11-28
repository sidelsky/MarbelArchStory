


/*------------------------------------*\
	Components
	Load all components in here.
\*------------------------------------*/

var $ = window.$;
var mediator = require('mediatorjs');
var eventNames = require('./config').eventNames;


var Animations = function Animations() {
	mediator.on(eventNames.animate.init, this._initAnimations);
	mediator.on(eventNames.animate.undo, this._undoAnimations);
};


/*  All Animations will initilialise in this method.
	If content is added to the page via ajax,
	the method will be called again and the initialisations rerun on child elements of the parent
 -----------------------------------*/
Animations.prototype._initAnimations = function($el) {
	if ( typeof $el !== 'undefined') {
		var $el = $el.find('[data-animation]');
		var animation = $el.attr('data-animation');
		var timer = 0;

		$(' > *', $el).not('.'+animation).each(function(i){
			var $self = $(this);
			$self.css('animation-delay', timer + 'ms').addClass(animation);
			timer += 50;
		});
	}
};

Animations.prototype._undoAnimations = function($el) {
	if ( typeof $el !== 'undefined') {
		var $el = $el.find('[data-animation]');
		var animation = $el.attr('data-animation');

		$(' > *', $el).each(function(){
			$(this).removeClass(animation);
		});
	}
};

module.exports = new Animations();
