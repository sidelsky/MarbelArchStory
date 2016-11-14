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


(function(){

    var windowWidth = $(window).width();

    //if(windowWidth > 1024){

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
			s.refresh();
		};

    //}



		// Setup variables
		$window = $(window);
		$slide = $('.scene-bg');
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

        // main-menu-container

        var $menu = $('.menu'),
            $menuItem = $menu.find('.menu__item'),
            $this = $(this);

            //console.log($menuItem);

            $menuItem.hover(function(){
                $(this).parent().children().not(this).stop().addClass('js-active');
            }, function(){
                $(this).parent().children().not(this).stop().removeClass('js-active');
            });


		function do_scrollTo() {

            $.extend($.easing, {
              def: 'easeInOutQuart',
                easeInOutQuart: function (x, t, b, c, d) {
                  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
                }
              });

		  $('a[href*=\\#]:not([href=\\#])').on('click',function (e) {
		    e.preventDefault();

		    var target = this.hash;
		    $target = $(target);

		    $('html, body').stop().animate({
		      'scrollTop': $target.offset().top
          }, 800, 'easeInOutQuart');
		  });
		}

        do_scrollTo();

}());
