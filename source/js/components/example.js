
/*------------------------------------*\
    File description for Example
\*------------------------------------*/




var Example = function Example($domElem) {
	console.log('Example initialising...');
  this.$elem = $domElem;
  this._init();
  this._attachHandlers();
};


/*  Public Methods
 -----------------------------------*/
Example.prototype.public = function($elem) {
  return "Hi! You can call me and return this string from a reference to a new instance of Example";
};


/*  Private Methods
    Have the underscore to signofy private status.
    Will still be public, but this is good so that we can test the method externally if needed.
 -----------------------------------*/
Example.prototype._init = function($elem) {
  return "Hi! You can also call me reference to a new instance of Example. But you should not do that because I am underscored and considered private";
};


Example.prototype._init = function($elem) {
  //Initialise the component.
};

Example.prototype._attachHandlers = function() {
  var _this = this;
  this.$elem.on('click', function() {
    //do stuff
    _this._doClickStuff();
  });
};

Example.prototype._doClickStuff = function($elem) {
  // The click stuf happens here.
  alert('you clicked me!');
};



module.exports = Example; //Returns a constructor

// module.exports = new Example(); //Returns self initialised instance if Example only needs to be initialised once on the site. Optional approach.
