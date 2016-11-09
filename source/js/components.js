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

	// One page js
	var $onePage = $parent.find('[data-one-page]');
	if ($onePage.length) {
		var OnePage = require('./components/onePage');
		$onePage.each(function() {
			new OnePage($(this));
		});
	}

	// One page js
	var $scrollMagic = $parent.find('[data-magic]');
	if ($scrollMagic.length) {
		var scrollMagic = require('./components/scrollMagic');
		$scrollMagic.each(function() {
			new scrollMagic($(this));
		});
	}



};

module.exports = new Components();


(function(){

	var s = skrollr.init({
		forceHeight: false,
		smoothScrolling: true,
		mobileDeceleration: 0.004,
		easing: {
			  //This easing will sure drive you crazy
			  wtf: Math.random,
			  inverted: function(p) {
				return 1 - p;
			  }
			},
			render: function(data) {
				var $data = $('#data');
				$data.text(data.curTop);
		  }
		});

		window.onload=function(){
			s.refresh()
		};



		// Setup variables
		$window = $(window);
		$slide = $('.homeSlide');
		$body = $('body');

		//FadeIn all sections
		$body.imagesLoaded( function() {
			setTimeout(function() {

				  // Resize sections
				  adjustWindow();

				  // Fade in sections
				  $body.removeClass('loading').addClass('loaded');

			}, 800);
		});

		function adjustWindow(){

			// Init Skrollr


			// Get window size
			winH = $window.height();

			// Keep minimum height 550
			if(winH <= 550) {
				winH = 550;
			}

			// Resize our slides
			$slide.height(winH);

			// Refresh Skrollr after resizing our sections


		}

}());
