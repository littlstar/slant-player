
/**
 * Module dependencies
 */

var tpl = require('./template.html')
  , dom = require('domify')
  , Frame = require('slant-frame')
  , Controls = require('slant-controls')
  , emitter = require('emitter')

/**
 * `Player' constructor
 *
 * @api public
 * @param {Element} parent
 * @param {Object} opts
 */

module.exports = Player;
function Player (parent, opts) {
  if (!(this instanceof Player)) {
    return new Player(parent, opts);
  }

  var style = getComputedStyle(parent);
  var width = opts.width || parseInt(style.width);
  var height = opts.height || parseInt(style.height);

  // init node
  this.el = dom(tpl);
  this.parent = parent;

  // init video frame
  this.frame = new Frame(this.el, {
    height: height,
    width: width,
    src: opts.src
  });

  // init frame controls
  this.controls = new Controls(this.frame, opts.controls);

  // render controls
  this.el.appendChild(this.controls.el);
}

// mixin `Emitter'
emitter(Player.prototype);

/**
 * Player active video
 *
 * @api public
 */

Player.prototype.play = function () {
  this.controls.play();
  return this;
};

/**
 * Pause active video
 *
 * @api public
 */

Player.prototype.pause = function () {
  this.controls.pause();
  return this;
};

/**
 * Set player volume
 *
 * @api public
 * @param {Number} vol
 */

Player.prototype.volume = function (vol) {
  this.controls.volume(vol);
  return this;
};

/**
 * Mute player volume
 *
 * @api public
 */

Player.prototype.mute = function () {
  this.controls.mute();
  return this;
};

/**
 * Seek player playback in seconds
 *
 * @api public
 * @param {Number} seconds
 */

Player.prototype.seek = function (seconds) {
  this.controls.seek(seconds);
  return this;
};

/**
 * Use plugin with player
 *
 * @api public
 * @param {Function} fn
 */

Player.prototype.use = function (fn) {
  fn(this);
  return this;
};

/**
 * Show video player
 *
 * @api public
 */

Player.prototype.show = function () {
  this.el.style.display = '';
  return this;
};

/*
 * Hide video player
 *
 * @api public
 */

Player.prototype.hide = function () {
  this.el.style.display = 'none';
  return this;
};

/**
 * Renders player
 *
 * @api public
 */

Player.prototype.render = function () {
  if (false == this.parent.contains(this.el)) {
    this.parent.appendChild(this.el);
  }
  this.frame.render();
  return this;
};

/**
 * Destroys player
 *
 * @api publc
 */

Player.prototype.destroy = function () {
  if (this.parent.contains(this.el)) {
    this.parent.removeChild(this.el);
  }

  return this;
};
