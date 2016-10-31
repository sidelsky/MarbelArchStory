/*------------------------------------*\
	Site Config
	All settings, configuration, event names, classes etc
\*------------------------------------*/

var $ = window.$;

var config = {
	eventNames: {
		animate: {
			init: 'ANIMATE:init',
			undo: 'ANIMATE:undo'
		},
		menu: {
			isOpen: 'MENU:isOpen',
			isClosed: 'MENU:isClosed'
		},
		modal: {
			modalIsOpen: 'MODAL:isOpen',
			modalIsClosed: 'MODAL:isClosed'
		},
		video: {
			youTubeApiLoaded: 'VIDEO:youtubeapiloaded',
			stopAllVideos: 'VIDEO:stopallvideos'
		},
		ui: {
			contentLoaded: 'UI:contentLoaded',
			windowResize: 'UI:windowResize',
			windowScroll: 'UI:windowScroll',
			popStateFired: 'UI:popStateFired'
		}
	},
	cssClasses : {
		isPlaying : 'is-playing',
		isActive: 'is-active',
		hasOpenNav : 'nav-is-open',
		isFixed : 'is-fixed',
		isOpen : 'is-open',
		isVisible : 'is-visible',
		isHidden : 'is-hidden',
		modalIsOpen : 'modal-is-open',
		tabIsActive : 'is-active-tab',
		noAnimate : 'no-animate',
	},
	state : {
		youTubeApiLoading : false,
		youTubeApiLoaded : false
	},
	elements : {
		$window : $(window),
	  	$html : $('html'),
	  	$body : $('body'),
	  	$siteBody : $('.site-body')
	}
};

module.exports = config;
