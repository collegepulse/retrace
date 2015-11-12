(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(win, send) {
  if (!win) win = window;
  var _onerror = win.onerror;
  win.onerror = function(msg, url, line, col, err) {
    var stack = err && err.stack;
    if (!stack) {
      // create a single stack frame from the provided data:
      stack = msg + '\n    at ' + url + ':' + line + ':' + col;
    }
    send(stack);
    if (_onerror) _onerror(msg, url, line, col, err);
  };
}

},{}],2:[function(require,module,exports){
var onerror = require('./onerror');

module.exports = function(opts, cb) {
  if (typeof opts == 'function') cb = opts;
  if (typeof opts != 'object') opts = {};

  onerror(opts.window, function(stack) {
    var target = opts.target || '/retrace';
    var url = target + '?stack=' + encodeURIComponent(stack);
    get(url, cb);
  });
};

function get(url, cb) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState != 4) return false;
    var status = req.status;
    if (status != 200) return cb(status);
    cb(null, req.responseText);
  };
  req.open('GET', url, true);
  req.send();
}

},{"./onerror":1}],3:[function(require,module,exports){
function invariant(cond, message) {
  if (!cond) throw new Error(message);
}

function fail(message) {
  invariant(false, message);
}

module.exports = function(message) {
  fail(message);
}

},{}],4:[function(require,module,exports){
require('../../client/xhr')(function(err, stack) {
  document.body.innerHTML = '<pre class="stack">' + stack + '</pre>';
});

var error = require('./error');

setTimeout(function() {
  error('boo');
}, 1);

},{"../../client/xhr":2,"./error":3}]},{},[4])
//# sourceMappingURL=bundle.js.map
