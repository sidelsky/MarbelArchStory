

/*------------------------------------*\
    BUILD
    - Application entry point.
    - Initialise global components here.
    - Initialise component references here.
    - Initialise UI stuff, helpers and handlers
\*------------------------------------*/


'use strict';

var $ = window.$; // jsQuery is global. This shims it and makes it available internally here.
require('./uiEvents'); // Listeners and triggers for window scroll etc
require('./utilities'); // Methods and utils for reuse around the site
require('./components');
require('./animations');

// require('./setup'); //intialisation, polyfills, breakpoints, listeners etc
// require('../modules/TrackingModule/CustomTracking'); // GA tracking and custom events
// require('./componentsInitialiser'); // Initialiser for each component. Normally triggered based on existance in dom of js-see-me class instance

// require('./utilities/handlebars-partials');
// require('./utilities/handlebars-helpers');

var Example = require('./components/example');
var exampleInstance;


//NOTE
// Add any smaller component initialisers into components.js. If added there they will also be initialised when added to content via ajax calls.

var $example = $('.js-see-me-example');
$example.each(function(i, elem) {
  exampleInstance = new Example($(elem));
});