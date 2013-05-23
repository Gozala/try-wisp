;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function(){var _ns_ = "wisp.runtime";
module.namespace = _ns_;
module.description = "Core primitives required for runtime";;

var identity = function identity(x) {
  return x;
};
exports.identity = identity;

var isOdd = function isOdd(n) {
  return n % 2 === 1;
};
exports.isOdd = isOdd;

var isEven = function isEven(n) {
  return n % 2 === 0;
};
exports.isEven = isEven;

var isDictionary = function isDictionary(form) {
  return (isObject(form)) && (isObject(Object.getPrototypeOf(form))) && (isNil(Object.getPrototypeOf(Object.getPrototypeOf(form))));
};
exports.isDictionary = isDictionary;

var dictionary = function dictionary() {
  return (function loop(keyValues, result) {
    var recur = loop;
    while (recur === loop) {
      recur = keyValues.length ?
      (function() {
        (result || 0)[(keyValues || 0)[0]] = (keyValues || 0)[1];
        return (keyValues = keyValues.slice(2), result = result, loop);
      })() :
      result;
    };
    return recur;
  })(Array.prototype.slice.call(arguments), {});
};
exports.dictionary = dictionary;

var keys = function keys(dictionary) {
  return Object.keys(dictionary);
};
exports.keys = keys;

var vals = function vals(dictionary) {
  return keys(dictionary).map(function(key) {
    return (dictionary || 0)[key];
  });
};
exports.vals = vals;

var keyValues = function keyValues(dictionary) {
  return keys(dictionary).map(function(key) {
    return [key, (dictionary || 0)[key]];
  });
};
exports.keyValues = keyValues;

var merge = function merge() {
  return Object.create(Object.prototype, Array.prototype.slice.call(arguments).reduce(function(descriptor, dictionary) {
    isObject(dictionary) ?
      Object.keys(dictionary).forEach(function(key) {
        return (descriptor || 0)[key] = Object.getOwnPropertyDescriptor(dictionary, key);
      }) :
      void(0);
    return descriptor;
  }, Object.create(Object.prototype)));
};
exports.merge = merge;

var isContainsVector = function isContainsVector(vector, element) {
  return vector.indexOf(element) >= 0;
};
exports.isContainsVector = isContainsVector;

var mapDictionary = function mapDictionary(source, f) {
  return Object.keys(source).reduce(function(target, key) {
    (target || 0)[key] = f((source || 0)[key]);
    return target;
  }, {});
};
exports.mapDictionary = mapDictionary;

var toString = Object.prototype.toString;
exports.toString = toString;

var isFn = typeof(/./) === "function" ?
  function isFn(x) {
    return toString.call(x) === "[object Function]";
  } :
  function isFn(x) {
    return typeof(x) === "function";
  };
exports.isFn = isFn;

var isString = function isString(x) {
  return (typeof(x) === "string") || (toString.call(x) === "[object String]");
};
exports.isString = isString;

var isNumber = function isNumber(x) {
  return (typeof(x) === "number") || (toString.call(x) === "[object Number]");
};
exports.isNumber = isNumber;

var isVector = isFn(Array.isArray) ?
  Array.isArray :
  function isVector(x) {
    return toString.call(x) === "[object Array]";
  };
exports.isVector = isVector;

var isDate = function isDate(x) {
  return toString.call(x) === "[object Date]";
};
exports.isDate = isDate;

var isBoolean = function isBoolean(x) {
  return (x === true) || (x === false) || (toString.call(x) === "[object Boolean]");
};
exports.isBoolean = isBoolean;

var isRePattern = function isRePattern(x) {
  return toString.call(x) === "[object RegExp]";
};
exports.isRePattern = isRePattern;

var isObject = function isObject(x) {
  return x && (typeof(x) === "object");
};
exports.isObject = isObject;

var isNil = function isNil(x) {
  return (x === void(0)) || (x === null);
};
exports.isNil = isNil;

var isTrue = function isTrue(x) {
  return x === true;
};
exports.isTrue = isTrue;

var isFalse = function isFalse(x) {
  return x === true;
};
exports.isFalse = isFalse;

var reFind = function reFind(re, s) {
  var matches = re.exec(s);
  return !(isNil(matches)) ?
    matches.length === 1 ?
      (matches || 0)[0] :
      matches :
    void(0);
};
exports.reFind = reFind;

var reMatches = function reMatches(pattern, source) {
  var matches = pattern.exec(source);
  return (!(isNil(matches))) && ((matches || 0)[0] === source) ?
    matches.length === 1 ?
      (matches || 0)[0] :
      matches :
    void(0);
};
exports.reMatches = reMatches;

var rePattern = function rePattern(s) {
  var match = reFind(/^(?:\(\?([idmsux]*)\))?(.*)/, s);
  return new RegExp((match || 0)[2], (match || 0)[1]);
};
exports.rePattern = rePattern;

var inc = function inc(x) {
  return x + 1;
};
exports.inc = inc;

var dec = function dec(x) {
  return x - 1;
};
exports.dec = dec;

var str = function str() {
  return String.prototype.concat.apply("", arguments);
};
exports.str = str;

var char = function char(code) {
  return String.fromCharCode(code);
};
exports.char = char;

var int = function int(x) {
  return isNumber(x) ?
    x >= 0 ?
      Math.floor(x) :
      Math.floor(x) :
    x.charCodeAt(0);
};
exports.int = int;

var subs = function subs(string, start, end) {
  return string.substring(start, end);
};
exports.subs = subs;

var isPatternEqual = function isPatternEqual(x, y) {
  return (isRePattern(x)) && (isRePattern(y)) && (x.source === y.source) && (x.global === y.global) && (x.multiline === y.multiline) && (x.ignoreCase === y.ignoreCase);
};

var isDateEqual = function isDateEqual(x, y) {
  return (isDate(x)) && (isDate(y)) && (Number(x) === Number(y));
};

var isDictionaryEqual = function isDictionaryEqual(x, y) {
  return (isObject(x)) && (isObject(y)) && ((function() {
    var xKeys = keys(x);
    var yKeys = keys(y);
    var xCount = xKeys.length;
    var yCount = yKeys.length;
    return (xCount === yCount) && ((function loop(index, count, keys) {
      var recur = loop;
      while (recur === loop) {
        recur = index < count ?
        isEquivalent((x || 0)[(keys || 0)[index]], (y || 0)[(keys || 0)[index]]) ?
          (index = inc(index), count = count, keys = keys, loop) :
          false :
        true;
      };
      return recur;
    })(0, xCount, xKeys));
  })());
};

var isVectorEqual = function isVectorEqual(x, y) {
  return (isVector(x)) && (isVector(y)) && (x.length === y.length) && ((function loop(xs, ys, index, count) {
    var recur = loop;
    while (recur === loop) {
      recur = index < count ?
      isEquivalent((xs || 0)[index], (ys || 0)[index]) ?
        (xs = xs, ys = ys, index = inc(index), count = count, loop) :
        false :
      true;
    };
    return recur;
  })(x, y, 0, x.length));
};

var isEquivalent = function isEquivalent(x, y) {
  switch (arguments.length) {
    case 1:
      return true;
    case 2:
      return (x === y) || (isNil(x) ?
        isNil(y) :
      isNil(y) ?
        isNil(x) :
      isString(x) ?
        false :
      isNumber(x) ?
        false :
      isFn(x) ?
        false :
      isBoolean(x) ?
        false :
      isDate(x) ?
        isDateEqual(x, y) :
      isVector(x) ?
        isVectorEqual(x, y, [], []) :
      isRePattern(x) ?
        isPatternEqual(x, y) :
      "else" ?
        isDictionaryEqual(x, y) :
        void(0));

    default:
      var more = Array.prototype.slice.call(arguments, 2);
      return (function loop(previous, current, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = (isEquivalent(previous, current)) && (index < count ?
          (previous = current, current = (more || 0)[index], index = inc(index), count = count, loop) :
          true);
        };
        return recur;
      })(x, y, 0, more.length);
  };
  return void(0);
};

var isEqual = isEquivalent;
exports.isEqual = isEqual;

var isStrictEqual = function isStrictEqual(x, y) {
  switch (arguments.length) {
    case 1:
      return true;
    case 2:
      return x === y;

    default:
      var more = Array.prototype.slice.call(arguments, 2);
      return (function loop(previous, current, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = (previous === current) && (index < count ?
          (previous = current, current = (more || 0)[index], index = inc(index), count = count, loop) :
          true);
        };
        return recur;
      })(x, y, 0, more.length);
  };
  return void(0);
};
exports.isStrictEqual = isStrictEqual;

var greaterThan = function greaterThan(x, y) {
  switch (arguments.length) {
    case 1:
      return true;
    case 2:
      return x > y;

    default:
      var more = Array.prototype.slice.call(arguments, 2);
      return (function loop(previous, current, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = (previous > current) && (index < count ?
          (previous = current, current = (more || 0)[index], index = inc(index), count = count, loop) :
          true);
        };
        return recur;
      })(x, y, 0, more.length);
  };
  return void(0);
};
exports.greaterThan = greaterThan;

var notLessThan = function notLessThan(x, y) {
  switch (arguments.length) {
    case 1:
      return true;
    case 2:
      return x >= y;

    default:
      var more = Array.prototype.slice.call(arguments, 2);
      return (function loop(previous, current, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = (previous >= current) && (index < count ?
          (previous = current, current = (more || 0)[index], index = inc(index), count = count, loop) :
          true);
        };
        return recur;
      })(x, y, 0, more.length);
  };
  return void(0);
};
exports.notLessThan = notLessThan;

var lessThan = function lessThan(x, y) {
  switch (arguments.length) {
    case 1:
      return true;
    case 2:
      return x < y;

    default:
      var more = Array.prototype.slice.call(arguments, 2);
      return (function loop(previous, current, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = (previous < current) && (index < count ?
          (previous = current, current = (more || 0)[index], index = inc(index), count = count, loop) :
          true);
        };
        return recur;
      })(x, y, 0, more.length);
  };
  return void(0);
};
exports.lessThan = lessThan;

var notGreaterThan = function notGreaterThan(x, y) {
  switch (arguments.length) {
    case 1:
      return true;
    case 2:
      return x <= y;

    default:
      var more = Array.prototype.slice.call(arguments, 2);
      return (function loop(previous, current, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = (previous <= current) && (index < count ?
          (previous = current, current = (more || 0)[index], index = inc(index), count = count, loop) :
          true);
        };
        return recur;
      })(x, y, 0, more.length);
  };
  return void(0);
};
exports.notGreaterThan = notGreaterThan;

var sum = function sum(a, b, c, d, e, f) {
  switch (arguments.length) {
    case 0:
      return 0;
    case 1:
      return a;
    case 2:
      return a + b;
    case 3:
      return a + b + c;
    case 4:
      return a + b + c + d;
    case 5:
      return a + b + c + d + e;
    case 6:
      return a + b + c + d + e + f;

    default:
      var more = Array.prototype.slice.call(arguments, 6);
      return (function loop(value, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = index < count ?
          (value = value + ((more || 0)[index]), index = inc(index), count = count, loop) :
          value;
        };
        return recur;
      })(a + b + c + d + e + f, 0, more.length);
  };
  return void(0);
};
exports.sum = sum;

var subtract = function subtract(a, b, c, d, e, f) {
  switch (arguments.length) {
    case 0:
      return (function() { throw TypeError("Wrong number of args passed to: -"); })();
    case 1:
      return 0 - a;
    case 2:
      return a - b;
    case 3:
      return a - b - c;
    case 4:
      return a - b - c - d;
    case 5:
      return a - b - c - d - e;
    case 6:
      return a - b - c - d - e - f;

    default:
      var more = Array.prototype.slice.call(arguments, 6);
      return (function loop(value, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = index < count ?
          (value = value - ((more || 0)[index]), index = inc(index), count = count, loop) :
          value;
        };
        return recur;
      })(a - b - c - d - e - f, 0, more.length);
  };
  return void(0);
};
exports.subtract = subtract;

var divide = function divide(a, b, c, d, e, f) {
  switch (arguments.length) {
    case 0:
      return (function() { throw TypeError("Wrong number of args passed to: /"); })();
    case 1:
      return 1 / a;
    case 2:
      return a / b;
    case 3:
      return a / b / c;
    case 4:
      return a / b / c / d;
    case 5:
      return a / b / c / d / e;
    case 6:
      return a / b / c / d / e / f;

    default:
      var more = Array.prototype.slice.call(arguments, 6);
      return (function loop(value, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = index < count ?
          (value = value / ((more || 0)[index]), index = inc(index), count = count, loop) :
          value;
        };
        return recur;
      })(a / b / c / d / e / f, 0, more.length);
  };
  return void(0);
};
exports.divide = divide;

var multiply = function multiply(a, b, c, d, e, f) {
  switch (arguments.length) {
    case 0:
      return 1;
    case 1:
      return a;
    case 2:
      return a * b;
    case 3:
      return a * b * c;
    case 4:
      return a * b * c * d;
    case 5:
      return a * b * c * d * e;
    case 6:
      return a * b * c * d * e * f;

    default:
      var more = Array.prototype.slice.call(arguments, 6);
      return (function loop(value, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = index < count ?
          (value = value * ((more || 0)[index]), index = inc(index), count = count, loop) :
          value;
        };
        return recur;
      })(a * b * c * d * e * f, 0, more.length);
  };
  return void(0);
};
exports.multiply = multiply;

var and = function and(a, b, c, d, e, f) {
  switch (arguments.length) {
    case 0:
      return true;
    case 1:
      return a;
    case 2:
      return a && b;
    case 3:
      return a && b && c;
    case 4:
      return a && b && c && d;
    case 5:
      return a && b && c && d && e;
    case 6:
      return a && b && c && d && e && f;

    default:
      var more = Array.prototype.slice.call(arguments, 6);
      return (function loop(value, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = index < count ?
          (value = value && ((more || 0)[index]), index = inc(index), count = count, loop) :
          value;
        };
        return recur;
      })(a && b && c && d && e && f, 0, more.length);
  };
  return void(0);
};
exports.and = and;

var or = function or(a, b, c, d, e, f) {
  switch (arguments.length) {
    case 0:
      return void(0);
    case 1:
      return a;
    case 2:
      return a || b;
    case 3:
      return a || b || c;
    case 4:
      return a || b || c || d;
    case 5:
      return a || b || c || d || e;
    case 6:
      return a || b || c || d || e || f;

    default:
      var more = Array.prototype.slice.call(arguments, 6);
      return (function loop(value, index, count) {
        var recur = loop;
        while (recur === loop) {
          recur = index < count ?
          (value = value || ((more || 0)[index]), index = inc(index), count = count, loop) :
          value;
        };
        return recur;
      })(a || b || c || d || e || f, 0, more.length);
  };
  return void(0);
};
exports.or = or;

var print = function print() {
  var more = Array.prototype.slice.call(arguments, 0);
  return console.log.apply(console.log, more);
};
exports.print = print

})()
},{}],2:[function(require,module,exports){
var _ns_ = "try-wisp.main";
module.namespace = _ns_;
var activine = require("codemirror-activine");
var persist = require("codemirror-persist");
require("wisp/engine/browser");
var rest = (require("wisp/sequence")).rest;
var cons = (require("wisp/sequence")).cons;
var vec = (require("wisp/sequence")).vec;
var str = (require("wisp/runtime")).str;
var read_ = (require("wisp/reader")).read_;
var compile_ = (require("wisp/compiler")).compile_;;

persist(CodeMirror);

var throttle = function throttle(lambda, ms) {
  var id = 0;
  return function throttled() {
    var params = Array.prototype.slice.call(arguments, 0);
    clearTimeout(id, throttled);
    return id = setTimeout.apply(window, vec(cons(lambda, cons(ms, params))));
  };
};
exports.throttle = throttle;

var tooglePreview = function tooglePreview() {
  var output = document.getElementById("output");
  var input = document.getElementById("input");
  output.hidden = !(output.hidden);
  return input.style.width = output.hidden ?
    "100%" :
    "50%";
};
exports.tooglePreview = tooglePreview;

var _errorMarker_ = (function() {
  var view = document.createElement("span");
  view.textContent = "●";
  view.style.color = "black";
  view.style.opacity = "0.5";
  return view;
})();
exports._errorMarker_ = _errorMarker_;

var updatePreview = throttle(function(editor) {
  var code = editor.getValue();
  localStorage.buffer = code;
  return (function() {
  try {
    editor.clearGutter("error-gutter");
    return output.setValue(compile_(read_(code, "scratch.wisp")));
  } catch (error) {
    _errorMarker_.setAttribute("title", error.message);
    return editor.setGutterMarker(error.line || 0, "error-gutter", _errorMarker_);
  }})();
}, 200);
exports.updatePreview = updatePreview;

var input = CodeMirror(document.getElementById("input"), {
  "lineNumbers": true,
  "matchBrackets": true,
  "electricChars": true,
  "persist": true,
  "styleActiveLine": true,
  "autofocus": true,
  "value": (document.getElementById("examples")).innerHTML,
  "theme": "solarized dark",
  "mode": "clojure",
  "autoClearEmptyLines": true,
  "fixedGutter": true,
  "gutters": ["error-gutter"],
  "extraKeys": {
    "Tab": "indentSelection"
  },
  "onChange": updatePreview,
  "onGutterClick": tooglePreview
});
exports.input = input;

input.on("change", updatePreview);

input.on("gutterClick", tooglePreview);

updatePreview(input);

var output = CodeMirror(document.getElementById("output"), {
  "lineNumbers": true,
  "fixedGutter": true,
  "matchBrackets": true,
  "mode": "javascript",
  "theme": "solarized dark",
  "readOnly": true
});
exports.output = output

},{"wisp/engine/browser":3,"wisp/sequence":4,"wisp/runtime":1,"wisp/reader":5,"wisp/compiler":6,"codemirror-activine":7,"codemirror-persist":8}],7:[function(require,module,exports){
"use strict";

var activeLine = "line@activine"

function onCursorActivity(editor) {
  var line = editor.getLineHandle(editor.getCursor().line)
  var active = editor[activeLine]
  if (line != active) {
    editor.removeLineClass(active, "background", "activeline")
    editor[activeLine] = editor.addLineClass(line, "background", "activeline")
  }
}

function setup(editor, value) {
  /**
  Takes editor and enables persists changes to the buffer across the sessions.
  **/
  if (value) {
    editor[activeLine] = editor.addLineClass(0, "background", "activeline")
    editor.on("cursorActivity", onCursorActivity)
    onCursorActivity(editor)
  } else if (activeLine in editor) {
    editor.removeLineClass(editor[activeLine], "background", "activeline")
    delete editor[activeLine]
    editor.off("cursorActivity", onCursorActivity)
  }
}

function plugin(CodeMirror) {
  CodeMirror.defineOption("activeLine", false, setup)
}

module.exports = plugin

},{}],8:[function(require,module,exports){
"use strict";

function onChange(editor) {
  localStorage[window.location.href.split("#")[0]] = editor.getValue()
}

function setup(editor, value) {
  /**
  Takes editor and enables persists changes to the buffer across the sessions.
  **/
  if (value) {
    var address = window.location.href.split("#")[0]
    var persisted = localStorage[address] || editor.getValue()
    editor.setValue(persisted)
    editor.on("change", onChange)
  } else {
    editor.off("change", onChange)
  }
}

function plugin(CodeMirror) {
  CodeMirror.defineOption("persist", false, setup)
}

module.exports = plugin

},{}],4:[function(require,module,exports){
var _ns_ = "wisp.sequence";
module.namespace = _ns_;
var isNil = (require("./runtime")).isNil;
var isVector = (require("./runtime")).isVector;
var isFn = (require("./runtime")).isFn;
var isNumber = (require("./runtime")).isNumber;
var isString = (require("./runtime")).isString;
var isDictionary = (require("./runtime")).isDictionary;
var keyValues = (require("./runtime")).keyValues;
var str = (require("./runtime")).str;
var dec = (require("./runtime")).dec;
var inc = (require("./runtime")).inc;
var merge = (require("./runtime")).merge;;

var List = function List(head, tail) {
  this.head = head;
  this.tail = tail || (list());
  this.length = inc(count(this.tail));
  return this;
};

List.prototype.length = 0;

List.type = "wisp.list";

List.prototype.type = List.type;

List.prototype.tail = Object.create(List.prototype);

List.prototype.toString = function() {
  return (function loop(result, list) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(list) ?
      "" + "(" + (result.substr(1)) + ")" :
      (result = "" + result + " " + (isVector(first(list)) ?
        "" + "[" + (first(list).join(" ")) + "]" :
      isNil(first(list)) ?
        "nil" :
      isString(first(list)) ?
        JSON.stringify(first(list)) :
      isNumber(first(list)) ?
        JSON.stringify(first(list)) :
        first(list)), list = rest(list), loop);
    };
    return recur;
  })("", this);
};

var lazySeqValue = function lazySeqValue(lazySeq) {
  return !(lazySeq.realized) ?
    (lazySeq.realized = true) && (lazySeq.x = lazySeq.x()) :
    lazySeq.x;
};

var LazySeq = function LazySeq(realized, x) {
  this.realized = realized || false;
  this.x = x;
  return this;
};

LazySeq.type = "wisp.lazy.seq";

LazySeq.prototype.type = LazySeq.type;

var lazySeq = function lazySeq(realized, body) {
  return new LazySeq(realized, body);
};
exports.lazySeq = lazySeq;

var isLazySeq = function isLazySeq(value) {
  return value && (LazySeq.type === value.type);
};
exports.isLazySeq = isLazySeq;

undefined;

var isList = function isList(value) {
  return value && (List.type === value.type);
};
exports.isList = isList;

var list = function list() {
  return arguments.length === 0 ?
    Object.create(List.prototype) :
    Array.prototype.slice.call(arguments).reduceRight(function(tail, head) {
      return cons(head, tail);
    }, list());
};
exports.list = list;

var cons = function cons(head, tail) {
  return new List(head, tail);
};
exports.cons = cons;

var reverseList = function reverseList(sequence) {
  return (function loop(items, source) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(source) ?
      list.apply(list, items) :
      (items = [first(source)].concat(items), source = rest(source), loop);
    };
    return recur;
  })([], sequence);
};

var isSequential = function isSequential(x) {
  return (isList(x)) || (isVector(x)) || (isLazySeq(x)) || (isDictionary(x)) || (isString(x));
};
exports.isSequential = isSequential;

var reverse = function reverse(sequence) {
  return isList(sequence) ?
    reverseList(sequence) :
  isVector(sequence) ?
    sequence.reverse() :
  isNil(sequence) ?
    list() :
  "else" ?
    reverse(seq(sequence)) :
    void(0);
};
exports.reverse = reverse;

var map = function map(f, sequence) {
  return isVector(sequence) ?
    sequence.map(f) :
  isList(sequence) ?
    mapList(f, sequence) :
  isNil(sequence) ?
    list() :
  "else" ?
    map(f, seq(sequence)) :
    void(0);
};
exports.map = map;

var mapList = function mapList(f, sequence) {
  return (function loop(result, items) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(items) ?
      reverse(result) :
      (result = cons(f(first(items)), result), items = rest(items), loop);
    };
    return recur;
  })(list(), sequence);
};

var filter = function filter(isF, sequence) {
  return isVector(sequence) ?
    sequence.filter(isF) :
  isList(sequence) ?
    filterList(isF, sequence) :
  isNil(sequence) ?
    list() :
  "else" ?
    filter(isF, seq(sequence)) :
    void(0);
};
exports.filter = filter;

var filterList = function filterList(isF, sequence) {
  return (function loop(result, items) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(items) ?
      reverse(result) :
      (result = isF(first(items)) ?
        cons(first(items), result) :
        result, items = rest(items), loop);
    };
    return recur;
  })(list(), sequence);
};

var reduce = function reduce(f) {
  var params = Array.prototype.slice.call(arguments, 1);
  return (function() {
    var hasInitial = count(params) >= 2;
    var initial = hasInitial ?
      first(params) :
      void(0);
    var sequence = hasInitial ?
      second(params) :
      first(params);
    return isNil(sequence) ?
      initial :
    isVector(sequence) ?
      hasInitial ?
        sequence.reduce(f, initial) :
        sequence.reduce(f) :
    isList(sequence) ?
      hasInitial ?
        reduceList(f, initial, sequence) :
        reduceList(f, first(sequence), rest(sequence)) :
    "else" ?
      reduce(f, initial, seq(sequence)) :
      void(0);
  })();
};
exports.reduce = reduce;

var reduceList = function reduceList(f, initial, sequence) {
  return (function loop(result, items) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(items) ?
      result :
      (result = f(result, first(items)), items = rest(items), loop);
    };
    return recur;
  })(initial, sequence);
};

var count = function count(sequence) {
  return isNil(sequence) ?
    0 :
    (seq(sequence)).length;
};
exports.count = count;

var isEmpty = function isEmpty(sequence) {
  return count(sequence) === 0;
};
exports.isEmpty = isEmpty;

var first = function first(sequence) {
  return isNil(sequence) ?
    void(0) :
  isList(sequence) ?
    sequence.head :
  (isVector(sequence)) || (isString(sequence)) ?
    (sequence || 0)[0] :
  isLazySeq(sequence) ?
    first(lazySeqValue(sequence)) :
  "else" ?
    first(seq(sequence)) :
    void(0);
};
exports.first = first;

var second = function second(sequence) {
  return isNil(sequence) ?
    void(0) :
  isList(sequence) ?
    first(rest(sequence)) :
  (isVector(sequence)) || (isString(sequence)) ?
    (sequence || 0)[1] :
  isLazySeq(sequence) ?
    second(lazySeqValue(sequence)) :
  "else" ?
    first(rest(seq(sequence))) :
    void(0);
};
exports.second = second;

var third = function third(sequence) {
  return isNil(sequence) ?
    void(0) :
  isList(sequence) ?
    first(rest(rest(sequence))) :
  (isVector(sequence)) || (isString(sequence)) ?
    (sequence || 0)[2] :
  isLazySeq(sequence) ?
    third(lazySeqValue(sequence)) :
  "else" ?
    second(rest(seq(sequence))) :
    void(0);
};
exports.third = third;

var rest = function rest(sequence) {
  return isNil(sequence) ?
    list() :
  isList(sequence) ?
    sequence.tail :
  (isVector(sequence)) || (isString(sequence)) ?
    sequence.slice(1) :
  isLazySeq(sequence) ?
    rest(lazySeqValue(sequence)) :
  "else" ?
    rest(seq(sequence)) :
    void(0);
};
exports.rest = rest;

var lastOfList = function lastOfList(list) {
  return (function loop(item, items) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(items) ?
      item :
      (item = first(items), items = rest(items), loop);
    };
    return recur;
  })(first(list), rest(list));
};

var last = function last(sequence) {
  return (isVector(sequence)) || (isString(sequence)) ?
    (sequence || 0)[dec(count(sequence))] :
  isList(sequence) ?
    lastOfList(sequence) :
  isNil(sequence) ?
    void(0) :
  isLazySeq(sequence) ?
    last(lazySeqValue(sequence)) :
  "else" ?
    last(seq(sequence)) :
    void(0);
};
exports.last = last;

var butlast = function butlast(sequence) {
  var items = isNil(sequence) ?
    void(0) :
  isString(sequence) ?
    subs(sequence, 0, dec(count(sequence))) :
  isVector(sequence) ?
    sequence.slice(0, dec(count(sequence))) :
  isList(sequence) ?
    list.apply(list, butlast(vec(sequence))) :
  isLazySeq(sequence) ?
    butlast(lazySeqValue(sequence)) :
  "else" ?
    butlast(seq(sequence)) :
    void(0);
  return !((isNil(items)) || (isEmpty(items))) ?
    items :
    void(0);
};
exports.butlast = butlast;

var take = function take(n, sequence) {
  return isNil(sequence) ?
    list() :
  isVector(sequence) ?
    takeFromVector(n, sequence) :
  isList(sequence) ?
    takeFromList(n, sequence) :
  isLazySeq(sequence) ?
    take(n, lazySeqValue(sequence)) :
  "else" ?
    take(n, seq(sequence)) :
    void(0);
};
exports.take = take;

var takeVectorWhile = function takeVectorWhile(predicate, vector) {
  return (function loop(result, tail, head) {
    var recur = loop;
    while (recur === loop) {
      recur = (!(isEmpty(tail))) && (predicate(head)) ?
      (result = conj(result, head), tail = rest(tail), head = first(tail), loop) :
      result;
    };
    return recur;
  })([], vector, first(vector));
};

var takeListWhile = function takeListWhile(predicate, items) {
  return (function loop(result, tail, head) {
    var recur = loop;
    while (recur === loop) {
      recur = (!(isEmpty(tail))) && (isPredicate(head)) ?
      (result = conj(result, head), tail = rest(tail), head = first(tail), loop) :
      list.apply(list, result);
    };
    return recur;
  })([], items, first(items));
};

var takeWhile = function takeWhile(predicate, sequence) {
  return isNil(sequence) ?
    list() :
  isVector(sequence) ?
    takeVectorWhile(predicate, sequence) :
  isList(sequence) ?
    takeVectorWhile(predicate, sequence) :
  "else" ?
    takeWhile(predicate, lazySeqValue(sequence)) :
    void(0);
};
exports.takeWhile = takeWhile;

var takeFromVector = function takeFromVector(n, vector) {
  return vector.slice(0, n);
};

var takeFromList = function takeFromList(n, sequence) {
  return (function loop(taken, items, n) {
    var recur = loop;
    while (recur === loop) {
      recur = (n === 0) || (isEmpty(items)) ?
      reverse(taken) :
      (taken = cons(first(items), taken), items = rest(items), n = dec(n), loop);
    };
    return recur;
  })(list(), sequence, n);
};

var dropFromList = function dropFromList(n, sequence) {
  return (function loop(left, items) {
    var recur = loop;
    while (recur === loop) {
      recur = (left < 1) || (isEmpty(items)) ?
      items :
      (left = dec(left), items = rest(items), loop);
    };
    return recur;
  })(n, sequence);
};

var drop = function drop(n, sequence) {
  return n <= 0 ?
    sequence :
  isString(sequence) ?
    sequence.substr(n) :
  isVector(sequence) ?
    sequence.slice(n) :
  isList(sequence) ?
    dropFromList(n, sequence) :
  isNil(sequence) ?
    list() :
  isLazySeq(sequence) ?
    drop(n, lazySeqValue(sequence)) :
  "else" ?
    drop(n, seq(sequence)) :
    void(0);
};
exports.drop = drop;

var conjList = function conjList(sequence, items) {
  return reduce(function(result, item) {
    return cons(item, result);
  }, sequence, items);
};

var conj = function conj(sequence) {
  var items = Array.prototype.slice.call(arguments, 1);
  return isVector(sequence) ?
    sequence.concat(items) :
  isString(sequence) ?
    "" + sequence + (str.apply(str, items)) :
  isNil(sequence) ?
    list.apply(list, reverse(items)) :
  (isList(sequence)) || (isLazySeq()) ?
    conjList(sequence, items) :
  isDictionary(sequence) ?
    merge(sequence, merge.apply(merge, items)) :
  "else" ?
    (function() { throw TypeError("" + "Type can't be conjoined " + sequence); })() :
    void(0);
};
exports.conj = conj;

var concat = function concat() {
  var sequences = Array.prototype.slice.call(arguments, 0);
  return reverse(reduce(function(result, sequence) {
    return reduce(function(result, item) {
      return cons(item, result);
    }, result, seq(sequence));
  }, list(), sequences));
};
exports.concat = concat;

var seq = function seq(sequence) {
  return isNil(sequence) ?
    void(0) :
  (isVector(sequence)) || (isList(sequence)) || (isLazySeq(sequence)) ?
    sequence :
  isString(sequence) ?
    Array.prototype.slice.call(sequence) :
  isDictionary(sequence) ?
    keyValues(sequence) :
  "default" ?
    (function() { throw TypeError("" + "Can not seq " + sequence); })() :
    void(0);
};
exports.seq = seq;

var isSeq = function isSeq(sequence) {
  return (isList(sequence)) || (isLazySeq(sequence));
};
exports.isSeq = isSeq;

var listToVector = function listToVector(source) {
  return (function loop(result, list) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(list) ?
      result :
      (result = (function() {
        result.push(first(list));
        return result;
      })(), list = rest(list), loop);
    };
    return recur;
  })([], source);
};

var vec = function vec(sequence) {
  return isNil(sequence) ?
    [] :
  isVector(sequence) ?
    sequence :
  isList(sequence) ?
    listToVector(sequence) :
  "else" ?
    vec(seq(sequence)) :
    void(0);
};
exports.vec = vec;

var sort = function sort(f, items) {
  var hasComparator = isFn(f);
  var items = (!(hasComparator)) && (isNil(items)) ?
    f :
    items;
  var compare = hasComparator ?
    function(a, b) {
      return f(a, b) ?
        0 :
        1;
    } :
    void(0);
  return isNil(items) ?
    list() :
  isVector(items) ?
    items.sort(compare) :
  isList(items) ?
    list.apply(list, vec(items).sort(compare)) :
  isDictionary(items) ?
    seq(items).sort(compare) :
  "else" ?
    sort(f, seq(items)) :
    void(0);
};
exports.sort = sort;

var repeat = function repeat(n, x) {
  return (function loop(n, result) {
    var recur = loop;
    while (recur === loop) {
      recur = n <= 0 ?
      result :
      (n = dec(n), result = conj(result, x), loop);
    };
    return recur;
  })(n, []);
};
exports.repeat = repeat

},{"./runtime":1}],5:[function(require,module,exports){
var _ns_ = "wisp.reader";
module.namespace = _ns_;
module.description = "Reader module provides functions for reading text input\n  as wisp data structures";
var list = (require("./sequence")).list;
var isList = (require("./sequence")).isList;
var count = (require("./sequence")).count;
var isEmpty = (require("./sequence")).isEmpty;
var first = (require("./sequence")).first;
var second = (require("./sequence")).second;
var third = (require("./sequence")).third;
var rest = (require("./sequence")).rest;
var map = (require("./sequence")).map;
var vec = (require("./sequence")).vec;
var cons = (require("./sequence")).cons;
var conj = (require("./sequence")).conj;
var rest = (require("./sequence")).rest;
var concat = (require("./sequence")).concat;
var last = (require("./sequence")).last;
var butlast = (require("./sequence")).butlast;
var sort = (require("./sequence")).sort;
var lazySeq = (require("./sequence")).lazySeq;
var isOdd = (require("./runtime")).isOdd;
var dictionary = (require("./runtime")).dictionary;
var keys = (require("./runtime")).keys;
var isNil = (require("./runtime")).isNil;
var inc = (require("./runtime")).inc;
var dec = (require("./runtime")).dec;
var isVector = (require("./runtime")).isVector;
var isString = (require("./runtime")).isString;
var isNumber = (require("./runtime")).isNumber;
var isBoolean = (require("./runtime")).isBoolean;
var isObject = (require("./runtime")).isObject;
var isDictionary = (require("./runtime")).isDictionary;
var rePattern = (require("./runtime")).rePattern;
var reMatches = (require("./runtime")).reMatches;
var reFind = (require("./runtime")).reFind;
var str = (require("./runtime")).str;
var subs = (require("./runtime")).subs;
var char = (require("./runtime")).char;
var vals = (require("./runtime")).vals;
var isEqual = (require("./runtime")).isEqual;
var isSymbol = (require("./ast")).isSymbol;
var symbol = (require("./ast")).symbol;
var isKeyword = (require("./ast")).isKeyword;
var keyword = (require("./ast")).keyword;
var meta = (require("./ast")).meta;
var withMeta = (require("./ast")).withMeta;
var name = (require("./ast")).name;
var gensym = (require("./ast")).gensym;
var split = (require("./string")).split;
var join = (require("./string")).join;;

var pushBackReader = function pushBackReader(source, uri) {
  return {
    "lines": split(source, "\n"),
    "buffer": "",
    "uri": uri,
    "column": -1,
    "line": 0
  };
};
exports.pushBackReader = pushBackReader;

var peekChar = function peekChar(reader) {
  var line = ((reader || 0)["lines"])[(reader || 0)["line"]];
  var column = inc((reader || 0)["column"]);
  return isNil(line) ?
    void(0) :
    (line[column]) || "\n";
};
exports.peekChar = peekChar;

var readChar = function readChar(reader) {
  var ch = peekChar(reader);
  isNewline(peekChar(reader)) ?
    (function() {
      (reader || 0)["line"] = inc((reader || 0)["line"]);
      return (reader || 0)["column"] = -1;
    })() :
    (reader || 0)["column"] = inc((reader || 0)["column"]);
  return ch;
};
exports.readChar = readChar;

var isNewline = function isNewline(ch) {
  return "\n" === ch;
};
exports.isNewline = isNewline;

var isBreakingWhitespace = function isBreakingWhitespace(ch) {
  return (ch === " ") || (ch === "\t") || (ch === "\n") || (ch === "\r");
};
exports.isBreakingWhitespace = isBreakingWhitespace;

var isWhitespace = function isWhitespace(ch) {
  return (isBreakingWhitespace(ch)) || ("," === ch);
};
exports.isWhitespace = isWhitespace;

var isNumeric = function isNumeric(ch) {
  return (ch === "0") || (ch === "1") || (ch === "2") || (ch === "3") || (ch === "4") || (ch === "5") || (ch === "6") || (ch === "7") || (ch === "8") || (ch === "9");
};
exports.isNumeric = isNumeric;

var isCommentPrefix = function isCommentPrefix(ch) {
  return ";" === ch;
};
exports.isCommentPrefix = isCommentPrefix;

var isNumberLiteral = function isNumberLiteral(reader, initch) {
  return (isNumeric(initch)) || ((("+" === initch) || ("-" === initch)) && (isNumeric(peekChar(reader))));
};
exports.isNumberLiteral = isNumberLiteral;

var readerError = function readerError(reader, message) {
  var text = "" + message + "\n" + "line:" + ((reader || 0)["line"]) + "\n" + "column:" + ((reader || 0)["column"]);
  var error = SyntaxError(text, (reader || 0)["uri"]);
  error.line = (reader || 0)["line"];
  error.column = (reader || 0)["column"];
  error.uri = (reader || 0)["uri"];
  return (function() { throw error; })();
};
exports.readerError = readerError;

var isMacroTerminating = function isMacroTerminating(ch) {
  return (!(ch === "#")) && (!(ch === "'")) && (!(ch === ":")) && (macros(ch));
};
exports.isMacroTerminating = isMacroTerminating;

var readToken = function readToken(reader, initch) {
  return (function loop(buffer, ch) {
    var recur = loop;
    while (recur === loop) {
      recur = (isNil(ch)) || (isWhitespace(ch)) || (isMacroTerminating(ch)) ?
      buffer :
      (buffer = "" + buffer + (readChar(reader)), ch = peekChar(reader), loop);
    };
    return recur;
  })(initch, peekChar(reader));
};
exports.readToken = readToken;

var skipLine = function skipLine(reader, _) {
  return (function loop() {
    var recur = loop;
    while (recur === loop) {
      recur = (function() {
      var ch = readChar(reader);
      return (ch === "\n") || (ch === "\r") || (isNil(ch)) ?
        reader :
        (loop);
    })();
    };
    return recur;
  })();
};
exports.skipLine = skipLine;

var intPattern = rePattern("^([-+]?)(?:(0)|([1-9][0-9]*)|0[xX]([0-9A-Fa-f]+)|0([0-7]+)|([1-9][0-9]?)[rR]([0-9A-Za-z]+)|0[0-9]+)(N)?$");
exports.intPattern = intPattern;

var ratioPattern = rePattern("([-+]?[0-9]+)/([0-9]+)");
exports.ratioPattern = ratioPattern;

var floatPattern = rePattern("([-+]?[0-9]+(\\.[0-9]*)?([eE][-+]?[0-9]+)?)(M)?");
exports.floatPattern = floatPattern;

var matchInt = function matchInt(s) {
  var groups = reFind(intPattern, s);
  var group3 = groups[2];
  return !((isNil(group3)) || (count(group3) < 1)) ?
    0 :
    (function() {
      var negate = "-" === groups[1] ?
        -1 :
        1;
      var a = groups[3] ?
        [groups[3], 10] :
      groups[4] ?
        [groups[4], 16] :
      groups[5] ?
        [groups[5], 8] :
      groups[7] ?
        [groups[7], parseInt(groups[7])] :
      "else" ?
        [void(0), void(0)] :
        void(0);
      var n = a[0];
      var radix = a[1];
      return isNil(n) ?
        void(0) :
        negate * (parseInt(n, radix));
    })();
};
exports.matchInt = matchInt;

var matchRatio = function matchRatio(s) {
  var groups = reFind(ratioPattern, s);
  var numinator = groups[1];
  var denominator = groups[2];
  return (parseInt(numinator)) / (parseInt(denominator));
};
exports.matchRatio = matchRatio;

var matchFloat = function matchFloat(s) {
  return parseFloat(s);
};
exports.matchFloat = matchFloat;

var matchNumber = function matchNumber(s) {
  return reMatches(intPattern, s) ?
    matchInt(s) :
  reMatches(ratioPattern, s) ?
    matchRatio(s) :
  reMatches(floatPattern, s) ?
    matchFloat(s) :
    void(0);
};
exports.matchNumber = matchNumber;

var escapeCharMap = function escapeCharMap(c) {
  return c === "t" ?
    "\t" :
  c === "r" ?
    "\r" :
  c === "n" ?
    "\n" :
  c === "\\" ?
    "\\" :
  c === "\"" ?
    "\"" :
  c === "b" ?
    "" :
  c === "f" ?
    "" :
  "else" ?
    void(0) :
    void(0);
};
exports.escapeCharMap = escapeCharMap;

var read2Chars = function read2Chars(reader) {
  return "" + (readChar(reader)) + (readChar(reader));
};
exports.read2Chars = read2Chars;

var read4Chars = function read4Chars(reader) {
  return "" + (readChar(reader)) + (readChar(reader)) + (readChar(reader)) + (readChar(reader));
};
exports.read4Chars = read4Chars;

var unicode2Pattern = rePattern("[0-9A-Fa-f]{2}");
exports.unicode2Pattern = unicode2Pattern;

var unicode4Pattern = rePattern("[0-9A-Fa-f]{4}");
exports.unicode4Pattern = unicode4Pattern;

var validateUnicodeEscape = function validateUnicodeEscape(unicodePattern, reader, escapeChar, unicodeStr) {
  return reMatches(unicodePattern, unicodeStr) ?
    unicodeStr :
    readerError(reader, "" + "Unexpected unicode escape " + "\\" + escapeChar + unicodeStr);
};
exports.validateUnicodeEscape = validateUnicodeEscape;

var makeUnicodeChar = function makeUnicodeChar(codeStr, base) {
  var base = base || 16;
  var code = parseInt(codeStr, base);
  return char(code);
};
exports.makeUnicodeChar = makeUnicodeChar;

var escapeChar = function escapeChar(buffer, reader) {
  var ch = readChar(reader);
  var mapresult = escapeCharMap(ch);
  return mapresult ?
    mapresult :
  ch === "x" ?
    makeUnicodeChar(validateUnicodeEscape(unicode2Pattern, reader, ch, read2Chars(reader))) :
  ch === "u" ?
    makeUnicodeChar(validateUnicodeEscape(unicode4Pattern, reader, ch, read4Chars(reader))) :
  isNumeric(ch) ?
    char(ch) :
  "else" ?
    readerError(reader, "" + "Unexpected unicode escape " + "\\" + ch) :
    void(0);
};
exports.escapeChar = escapeChar;

var readPast = function readPast(predicate, reader) {
  return (function loop(_) {
    var recur = loop;
    while (recur === loop) {
      recur = predicate(peekChar(reader)) ?
      (_ = readChar(reader), loop) :
      peekChar(reader);
    };
    return recur;
  })(void(0));
};
exports.readPast = readPast;

var readDelimitedList = function readDelimitedList(delim, reader, isRecursive) {
  return (function loop(form) {
    var recur = loop;
    while (recur === loop) {
      recur = (function() {
      var ch = readPast(isWhitespace, reader);
      !(ch) ?
        readerError(reader, "EOF") :
        void(0);
      return delim === ch ?
        (function() {
          readChar(reader);
          return form;
        })() :
        (function() {
          var macro = macros(ch);
          return macro ?
            (function() {
              var result = macro(reader, readChar(reader));
              return (form = result === reader ?
                form :
                conj(form, result), loop);
            })() :
            (function() {
              var o = read(reader, true, void(0), isRecursive);
              return (form = o === reader ?
                form :
                conj(form, o), loop);
            })();
        })();
    })();
    };
    return recur;
  })([]);
};
exports.readDelimitedList = readDelimitedList;

var notImplemented = function notImplemented(reader, ch) {
  return readerError(reader, "" + "Reader for " + ch + " not implemented yet");
};
exports.notImplemented = notImplemented;

var readDispatch = function readDispatch(reader, _) {
  var ch = readChar(reader);
  var dm = dispatchMacros(ch);
  return dm ?
    dm(reader, _) :
    (function() {
      var object = maybeReadTaggedType(reader, ch);
      return object ?
        object :
        readerError(reader, "No dispatch macro for ", ch);
    })();
};
exports.readDispatch = readDispatch;

var readUnmatchedDelimiter = function readUnmatchedDelimiter(rdr, ch) {
  return readerError(rdr, "Unmached delimiter ", ch);
};
exports.readUnmatchedDelimiter = readUnmatchedDelimiter;

var readList = function readList(reader, _) {
  var form = readDelimitedList(")", reader, true);
  return withMeta(list.apply(list, form), meta(form));
};
exports.readList = readList;

var readComment = function readComment(reader, _) {
  return (function loop(buffer, ch) {
    var recur = loop;
    while (recur === loop) {
      recur = (isNil(ch)) || ("\n" === ch) ?
      reader || (list(symbol(void(0), "comment"), buffer)) :
    ("\\" === ch) ?
      (buffer = "" + buffer + (escapeChar(buffer, reader)), ch = readChar(reader), loop) :
    "else" ?
      (buffer = "" + buffer + ch, ch = readChar(reader), loop) :
      void(0);
    };
    return recur;
  })("", readChar(reader));
};
exports.readComment = readComment;

var readVector = function readVector(reader) {
  return readDelimitedList("]", reader, true);
};
exports.readVector = readVector;

var readMap = function readMap(reader) {
  var form = readDelimitedList("}", reader, true);
  return isOdd(count(form)) ?
    readerError(reader, "Map literal must contain an even number of forms") :
    withMeta(dictionary.apply(dictionary, form), meta(form));
};
exports.readMap = readMap;

var readSet = function readSet(reader, _) {
  var form = readDelimitedList("}", reader, true);
  return withMeta(concat([symbol(void(0), "set")], form), meta(form));
};
exports.readSet = readSet;

var readNumber = function readNumber(reader, initch) {
  return (function loop(buffer, ch) {
    var recur = loop;
    while (recur === loop) {
      recur = (isNil(ch)) || (isWhitespace(ch)) || (macros(ch)) ?
      (function() {
        var match = matchNumber(buffer);
        return isNil(match) ?
          readerError(reader, "Invalid number format [", buffer, "]") :
          match;
      })() :
      (buffer = "" + buffer + (readChar(reader)), ch = peekChar(reader), loop);
    };
    return recur;
  })(initch, peekChar(reader));
};
exports.readNumber = readNumber;

var readString = function readString(reader) {
  return (function loop(buffer, ch) {
    var recur = loop;
    while (recur === loop) {
      recur = isNil(ch) ?
      readerError(reader, "EOF while reading string") :
    "\\" === ch ?
      (buffer = "" + buffer + (escapeChar(buffer, reader)), ch = readChar(reader), loop) :
    "\"" === ch ?
      buffer :
    "default" ?
      (buffer = "" + buffer + ch, ch = readChar(reader), loop) :
      void(0);
    };
    return recur;
  })("", readChar(reader));
};
exports.readString = readString;

var readUnquote = function readUnquote(reader) {
  var ch = peekChar(reader);
  return !(ch) ?
    readerError(reader, "EOF while reading character") :
  ch === "@" ?
    (function() {
      readChar(reader);
      return list(symbol(void(0), "unquote-splicing"), read(reader, true, void(0), true));
    })() :
    list(symbol(void(0), "unquote"), read(reader, true, void(0), true));
};
exports.readUnquote = readUnquote;

var specialSymbols = function specialSymbols(text, notFound) {
  return text === "nil" ?
    void(0) :
  text === "true" ?
    true :
  text === "false" ?
    false :
  "else" ?
    notFound :
    void(0);
};
exports.specialSymbols = specialSymbols;

var readSymbol = function readSymbol(reader, initch) {
  var token = readToken(reader, initch);
  var parts = split(token, "/");
  var hasNs = (count(parts) > 1) && (count(token) > 1);
  var ns = first(parts);
  var name = join("/", rest(parts));
  return hasNs ?
    symbol(ns, name) :
    specialSymbols(token, symbol(token));
};
exports.readSymbol = readSymbol;

var readKeyword = function readKeyword(reader, initch) {
  var token = readToken(reader, readChar(reader));
  var parts = split(token, "/");
  var name = last(parts);
  var ns = count(parts) > 1 ?
    join("/", butlast(parts)) :
    void(0);
  var issue = last(ns) === ":" ?
    "namespace can't ends with \":\"" :
  last(name) === ":" ?
    "name can't end with \":\"" :
  last(name) === "/" ?
    "name can't end with \"/\"" :
  count(split(token, "::")) > 1 ?
    "name can't contain \"::\"" :
    void(0);
  return issue ?
    readerError(reader, "Invalid token (", issue, "): ", token) :
  (!(ns)) && (first(name) === ":") ?
    keyword(rest(name)) :
    keyword(ns, name);
};
exports.readKeyword = readKeyword;

var desugarMeta = function desugarMeta(f) {
  return isKeyword(f) ?
    dictionary(name(f), true) :
  isSymbol(f) ?
    {
      "tag": f
    } :
  isString(f) ?
    {
      "tag": f
    } :
  "else" ?
    f :
    void(0);
};
exports.desugarMeta = desugarMeta;

var wrappingReader = function wrappingReader(prefix) {
  return function(reader) {
    return list(prefix, read(reader, true, void(0), true));
  };
};
exports.wrappingReader = wrappingReader;

var throwingReader = function throwingReader(msg) {
  return function(reader) {
    return readerError(reader, msg);
  };
};
exports.throwingReader = throwingReader;

var readMeta = function readMeta(reader, _) {
  var metadata = desugarMeta(read(reader, true, void(0), true));
  !(isDictionary(metadata)) ?
    readerError(reader, "Metadata must be Symbol, Keyword, String or Map") :
    void(0);
  return (function() {
    var form = read(reader, true, void(0), true);
    return isObject(form) ?
      withMeta(form, conj(metadata, meta(form))) :
      form;
  })();
};
exports.readMeta = readMeta;

var readRegex = function readRegex(reader) {
  return (function loop(buffer, ch) {
    var recur = loop;
    while (recur === loop) {
      recur = isNil(ch) ?
      readerError(reader, "EOF while reading string") :
    "\\" === ch ?
      (buffer = "" + buffer + ch + (readChar(reader)), ch = readChar(reader), loop) :
    "\"" === ch ?
      rePattern(buffer) :
    "default" ?
      (buffer = "" + buffer + ch, ch = readChar(reader), loop) :
      void(0);
    };
    return recur;
  })("", readChar(reader));
};
exports.readRegex = readRegex;

var readParam = function readParam(reader, initch) {
  var form = readSymbol(reader, initch);
  return isEqual(form, symbol("%")) ?
    symbol("%1") :
    form;
};
exports.readParam = readParam;

var isParam = function isParam(form) {
  return (isSymbol(form)) && ("%" === first(name(form)));
};
exports.isParam = isParam;

var lambdaParamsHash = function lambdaParamsHash(form) {
  return isParam(form) ?
    dictionary(form, form) :
  (isDictionary(form)) || (isVector(form)) || (isList(form)) ?
    conj.apply(conj, map(lambdaParamsHash, vec(form))) :
  "else" ?
    {} :
    void(0);
};
exports.lambdaParamsHash = lambdaParamsHash;

var lambdaParams = function lambdaParams(body) {
  var names = sort(vals(lambdaParamsHash(body)));
  var variadic = isEqual(first(names), symbol("%&"));
  var n = variadic && (count(names) === 1) ?
    0 :
    parseInt(rest(name(last(names))));
  var params = (function loop(names, i) {
    var recur = loop;
    while (recur === loop) {
      recur = i <= n ?
      (names = conj(names, symbol("" + "%" + i)), i = inc(i), loop) :
      names;
    };
    return recur;
  })([], 1);
  return variadic ?
    conj(params, symbol(void(0), "&"), symbol(void(0), "%&")) :
    names;
};
exports.lambdaParams = lambdaParams;

var readLambda = function readLambda(reader) {
  var body = readList(reader);
  return list(symbol(void(0), "fn"), lambdaParams(body), body);
};
exports.readLambda = readLambda;

var readDiscard = function readDiscard(reader, _) {
  read(reader, true, void(0), true);
  return reader;
};
exports.readDiscard = readDiscard;

var macros = function macros(c) {
  return c === "\"" ?
    readString :
  c === ":" ?
    readKeyword :
  c === ";" ?
    readComment :
  c === "'" ?
    wrappingReader(symbol(void(0), "quote")) :
  c === "@" ?
    wrappingReader(symbol(void(0), "deref")) :
  c === "^" ?
    readMeta :
  c === "`" ?
    wrappingReader(symbol(void(0), "syntax-quote")) :
  c === "~" ?
    readUnquote :
  c === "(" ?
    readList :
  c === ")" ?
    readUnmatchedDelimiter :
  c === "[" ?
    readVector :
  c === "]" ?
    readUnmatchedDelimiter :
  c === "{" ?
    readMap :
  c === "}" ?
    readUnmatchedDelimiter :
  c === "\\" ?
    readChar :
  c === "%" ?
    readParam :
  c === "#" ?
    readDispatch :
  "else" ?
    void(0) :
    void(0);
};
exports.macros = macros;

var dispatchMacros = function dispatchMacros(s) {
  return s === "{" ?
    readSet :
  s === "(" ?
    readLambda :
  s === "<" ?
    throwingReader("Unreadable form") :
  s === "\"" ?
    readRegex :
  s === "!" ?
    readComment :
  s === "_" ?
    readDiscard :
  "else" ?
    void(0) :
    void(0);
};
exports.dispatchMacros = dispatchMacros;

var readForm = function readForm(reader, ch) {
  var start = {
    "line": (reader || 0)["line"],
    "column": (reader || 0)["column"]
  };
  var readMacro = macros(ch);
  var form = readMacro ?
    readMacro(reader, ch) :
  isNumberLiteral(reader, ch) ?
    readNumber(reader, ch) :
  "else" ?
    readSymbol(reader, ch) :
    void(0);
  return form === reader ?
    form :
  !((isString(form)) || (isNumber(form)) || (isBoolean(form)) || (isNil(form)) || (isKeyword(form))) ?
    withMeta(form, conj({
      "start": start,
      "end": {
        "line": (reader || 0)["line"],
        "column": (reader || 0)["column"]
      }
    }, meta(form))) :
  "else" ?
    form :
    void(0);
};
exports.readForm = readForm;

var read = function read(reader, eofIsError, sentinel, isRecursive) {
  return (function loop() {
    var recur = loop;
    while (recur === loop) {
      recur = (function() {
      var ch = readChar(reader);
      var form = isNil(ch) ?
        eofIsError ?
          readerError(reader, "EOF") :
          sentinel :
      isWhitespace(ch) ?
        reader :
      isCommentPrefix(ch) ?
        read(readComment(reader, ch), eofIsError, sentinel, isRecursive) :
      "else" ?
        readForm(reader, ch) :
        void(0);
      return form === reader ?
        (loop) :
        form;
    })();
    };
    return recur;
  })();
};
exports.read = read;

var read_ = function read_(source, uri) {
  var reader = pushBackReader(source, uri);
  var eof = gensym();
  return (function loop(forms, form) {
    var recur = loop;
    while (recur === loop) {
      recur = form === eof ?
      forms :
      (forms = conj(forms, form), form = read(reader, false, eof, false), loop);
    };
    return recur;
  })([], read(reader, false, eof, false));
};
exports.read_ = read_;

var readFromString = function readFromString(source, uri) {
  var reader = pushBackReader(source, uri);
  return read(reader, true, void(0), false);
};
exports.readFromString = readFromString;

var readUuid = function readUuid(uuid) {
  return isString(uuid) ?
    list(symbol(void(0), "UUID."), uuid) :
    readerError(void(0), "UUID literal expects a string as its representation.");
};

var readQueue = function readQueue(items) {
  return isVector(items) ?
    list(symbol(void(0), "PersistentQueue."), items) :
    readerError(void(0), "Queue literal expects a vector for its elements.");
};

var __tagTable__ = dictionary("uuid", readUuid, "queue", readQueue);
exports.__tagTable__ = __tagTable__;

var maybeReadTaggedType = function maybeReadTaggedType(reader, initch) {
  var tag = readSymbol(reader, initch);
  var pfn = (__tagTable__ || 0)[name(tag)];
  return pfn ?
    pfn(read(reader, true, void(0), false)) :
    readerError(reader, "" + "Could not find tag parser for " + (name(tag)) + " in " + ("" + (keys(__tagTable__))));
};
exports.maybeReadTaggedType = maybeReadTaggedType

},{"./sequence":4,"./runtime":1,"./ast":9,"./string":10}],6:[function(require,module,exports){
var _ns_ = "wisp.compiler";
module.namespace = _ns_;
module.description = "wisp language compiler";
var readFromString = (require("./reader")).readFromString;
var meta = (require("./ast")).meta;
var withMeta = (require("./ast")).withMeta;
var isSymbol = (require("./ast")).isSymbol;
var symbol = (require("./ast")).symbol;
var isKeyword = (require("./ast")).isKeyword;
var keyword = (require("./ast")).keyword;
var namespace = (require("./ast")).namespace;
var isUnquote = (require("./ast")).isUnquote;
var isUnquoteSplicing = (require("./ast")).isUnquoteSplicing;
var isQuote = (require("./ast")).isQuote;
var isSyntaxQuote = (require("./ast")).isSyntaxQuote;
var name = (require("./ast")).name;
var gensym = (require("./ast")).gensym;
var prStr = (require("./ast")).prStr;
var isEmpty = (require("./sequence")).isEmpty;
var count = (require("./sequence")).count;
var isList = (require("./sequence")).isList;
var list = (require("./sequence")).list;
var first = (require("./sequence")).first;
var second = (require("./sequence")).second;
var third = (require("./sequence")).third;
var rest = (require("./sequence")).rest;
var cons = (require("./sequence")).cons;
var conj = (require("./sequence")).conj;
var reverse = (require("./sequence")).reverse;
var reduce = (require("./sequence")).reduce;
var vec = (require("./sequence")).vec;
var last = (require("./sequence")).last;
var repeat = (require("./sequence")).repeat;
var map = (require("./sequence")).map;
var filter = (require("./sequence")).filter;
var take = (require("./sequence")).take;
var concat = (require("./sequence")).concat;
var isOdd = (require("./runtime")).isOdd;
var isDictionary = (require("./runtime")).isDictionary;
var dictionary = (require("./runtime")).dictionary;
var merge = (require("./runtime")).merge;
var keys = (require("./runtime")).keys;
var vals = (require("./runtime")).vals;
var isContainsVector = (require("./runtime")).isContainsVector;
var mapDictionary = (require("./runtime")).mapDictionary;
var isString = (require("./runtime")).isString;
var isNumber = (require("./runtime")).isNumber;
var isVector = (require("./runtime")).isVector;
var isBoolean = (require("./runtime")).isBoolean;
var subs = (require("./runtime")).subs;
var reFind = (require("./runtime")).reFind;
var isTrue = (require("./runtime")).isTrue;
var isFalse = (require("./runtime")).isFalse;
var isNil = (require("./runtime")).isNil;
var isRePattern = (require("./runtime")).isRePattern;
var inc = (require("./runtime")).inc;
var dec = (require("./runtime")).dec;
var str = (require("./runtime")).str;
var char = (require("./runtime")).char;
var int = (require("./runtime")).int;
var isEqual = (require("./runtime")).isEqual;
var isStrictEqual = (require("./runtime")).isStrictEqual;
var split = (require("./string")).split;
var join = (require("./string")).join;
var upperCase = (require("./string")).upperCase;
var replace = (require("./string")).replace;
var writeReference = (require("./backend/javascript/writer")).writeReference;
var writeKeywordReference = (require("./backend/javascript/writer")).writeKeywordReference;
var writeKeyword = (require("./backend/javascript/writer")).writeKeyword;
var writeSymbol = (require("./backend/javascript/writer")).writeSymbol;
var writeNil = (require("./backend/javascript/writer")).writeNil;
var writeComment = (require("./backend/javascript/writer")).writeComment;
var writeNumber = (require("./backend/javascript/writer")).writeNumber;
var writeString = (require("./backend/javascript/writer")).writeString;
var writeNumber = (require("./backend/javascript/writer")).writeNumber;
var writeBoolean = (require("./backend/javascript/writer")).writeBoolean;;

var isSelfEvaluating = function isSelfEvaluating(form) {
  return (isNumber(form)) || ((isString(form)) && (!(isSymbol(form))) && (!(isKeyword(form)))) || (isBoolean(form)) || (isNil(form)) || (isRePattern(form));
};
exports.isSelfEvaluating = isSelfEvaluating;

var __macros__ = {};
exports.__macros__ = __macros__;

var executeMacro = function executeMacro(name, form) {
  return (__macros__ || 0)[name].apply((__macros__ || 0)[name], vec(form));
};
exports.executeMacro = executeMacro;

var installMacro = function installMacro(name, macroFn) {
  return (__macros__ || 0)[name] = macroFn;
};
exports.installMacro = installMacro;

var isMacro = function isMacro(name) {
  return (isSymbol(name)) && ((__macros__ || 0)[name]) && true;
};
exports.isMacro = isMacro;

var makeMacro = function makeMacro(pattern, body) {
  var macroFn = concat(list(symbol(void(0), "fn"), pattern), body);
  return eval("" + "(" + (compile(macroexpand(macroFn))) + ")");
};
exports.makeMacro = makeMacro;

installMacro(symbol(void(0), "defmacro"), function(name, signature) {
  var body = Array.prototype.slice.call(arguments, 2);
  return installMacro(name, makeMacro(signature, body));
});

var __specials__ = {};
exports.__specials__ = __specials__;

var installSpecial = function installSpecial(name, f, validator) {
  return (__specials__ || 0)[name] = function(form) {
    validator ?
      validator(form) :
      void(0);
    return f(withMeta(rest(form), meta(form)));
  };
};
exports.installSpecial = installSpecial;

var isSpecial = function isSpecial(name) {
  return (isSymbol(name)) && ((__specials__ || 0)[name]) && true;
};
exports.isSpecial = isSpecial;

var executeSpecial = function executeSpecial(name, form) {
  return ((__specials__ || 0)[name])(form);
};
exports.executeSpecial = executeSpecial;

var opt = function opt(argument, fallback) {
  return (isNil(argument)) || (isEmpty(argument)) ?
    fallback :
    first(argument);
};
exports.opt = opt;

var applyForm = function applyForm(fnName, form, isQuoted) {
  return cons(fnName, isQuoted ?
    map(function(e) {
      return list(symbol(void(0), "quote"), e);
    }, form) :
    form, form);
};
exports.applyForm = applyForm;

var applyUnquotedForm = function applyUnquotedForm(fnName, form) {
  return cons(fnName, map(function(e) {
    return isUnquote(e) ?
      second(e) :
    (isList(e)) && (isKeyword(first(e))) ?
      list(symbol(void(0), "syntax-quote"), second(e)) :
      list(symbol(void(0), "syntax-quote"), e);
  }, form));
};
exports.applyUnquotedForm = applyUnquotedForm;

var splitSplices = function splitSplices(form, fnName) {
  var makeSplice = function makeSplice(form) {
    return (isSelfEvaluating(form)) || (isSymbol(form)) ?
      applyUnquotedForm(fnName, list(form)) :
      applyUnquotedForm(fnName, form);
  };
  return (function loop(nodes, slices, acc) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(nodes) ?
      reverse(isEmpty(acc) ?
        slices :
        cons(makeSplice(reverse(acc)), slices)) :
      (function() {
        var node = first(nodes);
        return isUnquoteSplicing(node) ?
          (nodes = rest(nodes), slices = cons(second(node), isEmpty(acc) ?
            slices :
            cons(makeSplice(reverse(acc)), slices)), acc = list(), loop) :
          (nodes = rest(nodes), slices = slices, acc = cons(node, acc), loop);
      })();
    };
    return recur;
  })(form, list(), list());
};
exports.splitSplices = splitSplices;

var syntaxQuoteSplit = function syntaxQuoteSplit(appendName, fnName, form) {
  var slices = splitSplices(form, fnName);
  var n = count(slices);
  return n === 0 ?
    list(fnName) :
  n === 1 ?
    first(slices) :
  "default" ?
    applyForm(appendName, slices) :
    void(0);
};
exports.syntaxQuoteSplit = syntaxQuoteSplit;

var compileObject = function compileObject(form, isQuoted) {
  return isKeyword(form) ?
    writeKeyword(form) :
  isSymbol(form) ?
    writeSymbol(form) :
  isNumber(form) ?
    writeNumber(form) :
  isString(form) ?
    writeString(form) :
  isBoolean(form) ?
    writeBoolean(form) :
  isNil(form) ?
    writeNil(form) :
  isRePattern(form) ?
    compileRePattern(form) :
  isVector(form) ?
    compile(applyForm(symbol(void(0), "vector"), list.apply(list, form), isQuoted)) :
  isList(form) ?
    compile(applyForm(symbol(void(0), "list"), form, isQuoted)) :
  isDictionary(form) ?
    compileDictionary(isQuoted ?
      mapDictionary(form, function(x) {
        return list(symbol(void(0), "quote"), x);
      }) :
      form) :
    void(0);
};
exports.compileObject = compileObject;

var compileSyntaxQuotedVector = function compileSyntaxQuotedVector(form) {
  var concatForm = syntaxQuoteSplit(symbol(void(0), "concat"), symbol(void(0), "vector"), list.apply(list, form));
  return compile(count(concatForm) > 1 ?
    list(symbol(void(0), "vec"), concatForm) :
    concatForm);
};
exports.compileSyntaxQuotedVector = compileSyntaxQuotedVector;

var compileSyntaxQuoted = function compileSyntaxQuoted(form) {
  return isList(form) ?
    compile(syntaxQuoteSplit(symbol(void(0), "concat"), symbol(void(0), "list"), form)) :
  isVector(form) ?
    compileSyntaxQuotedVector(form) :
  "else" ?
    compileObject(form) :
    void(0);
};
exports.compileSyntaxQuoted = compileSyntaxQuoted;

var compile = function compile(form) {
  return isSelfEvaluating(form) ?
    compileObject(form) :
  isSymbol(form) ?
    writeReference(form) :
  isKeyword(form) ?
    writeKeywordReference(form) :
  isVector(form) ?
    compileObject(form) :
  isDictionary(form) ?
    compileObject(form) :
  isList(form) ?
    (function() {
      var head = first(form);
      return isEmpty(form) ?
        compileObject(form, true) :
      isQuote(form) ?
        compileObject(second(form), true) :
      isSyntaxQuote(form) ?
        compileSyntaxQuoted(second(form)) :
      isSpecial(head) ?
        executeSpecial(head, form) :
      isKeyword(head) ?
        compile(list(symbol(void(0), "get"), second(form), head)) :
      "else" ?
        (function() {
          return !((isSymbol(head)) || (isList(head))) ?
            (function() { throw compilerError(form, "" + "operator is not a procedure: " + head); })() :
            compileInvoke(form);
        })() :
        void(0);
    })() :
    void(0);
};
exports.compile = compile;

var compile_ = function compile_(forms) {
  return reduce(function(result, form) {
    return "" + result + (isEmpty(result) ?
      "" :
      ";\n\n") + (compile(isList(form) ?
      withMeta(macroexpand(form), conj({
        "top": true
      }, meta(form))) :
      form));
  }, "", forms);
};
exports.compile_ = compile_;

var compileProgram = function compileProgram(forms) {
  return reduce(function(result, form) {
    return "" + result + (isEmpty(result) ?
      "" :
      ";\n\n") + (compile(isList(form) ?
      withMeta(macroexpand(form), conj({
        "top": true
      }, meta(form))) :
      form));
  }, "", forms);
};
exports.compileProgram = compileProgram;

var macroexpand1 = function macroexpand1(form) {
  return isList(form) ?
    (function() {
      var op = first(form);
      var id = isSymbol(op) ?
        name(op) :
        void(0);
      return isSpecial(op) ?
        form :
      isMacro(op) ?
        executeMacro(op, rest(form)) :
      (isSymbol(op)) && (!(id === ".")) ?
        first(id) === "." ?
          count(form) < 2 ?
            (function() { throw Error("Malformed member expression, expecting (.member target ...)"); })() :
            cons(symbol(void(0), "."), cons(second(form), cons(symbol(subs(id, 1)), rest(rest(form))))) :
        last(id) === "." ?
          cons(symbol(void(0), "new"), cons(symbol(subs(id, 0, dec(count(id)))), rest(form))) :
          form :
      "else" ?
        form :
        void(0);
    })() :
    form;
};
exports.macroexpand1 = macroexpand1;

var macroexpand = function macroexpand(form) {
  return (function loop(original, expanded) {
    var recur = loop;
    while (recur === loop) {
      recur = original === expanded ?
      original :
      (original = expanded, expanded = macroexpand1(expanded), loop);
    };
    return recur;
  })(form, macroexpand1(form));
};
exports.macroexpand = macroexpand;

var _lineBreakPattern_ = /\n(?=[^\n])/m;
exports._lineBreakPattern_ = _lineBreakPattern_;

var indent = function indent(code, indentation) {
  return join(indentation, split(code, _lineBreakPattern_));
};
exports.indent = indent;

var compileTemplate = function compileTemplate(form) {
  var indentPattern = /\n *$/;
  var getIndentation = function(code) {
    return (reFind(indentPattern, code)) || "\n";
  };
  return (function loop(code, parts, values) {
    var recur = loop;
    while (recur === loop) {
      recur = count(parts) > 1 ?
      (code = "" + code + (first(parts)) + (indent("" + (first(values)), getIndentation(first(parts)))), parts = rest(parts), values = rest(values), loop) :
      "" + code + (first(parts));
    };
    return recur;
  })("", split(first(form), "~{}"), rest(form));
};
exports.compileTemplate = compileTemplate;

var compileDef = function compileDef(form) {
  var id = first(form);
  var isExport = ((((meta(form)) || {}) || 0)["top"]) && (!((((meta(id)) || {}) || 0)["private"]));
  var attribute = symbol(namespace(id), "" + "-" + (name(id)));
  return isExport ?
    compileTemplate(list("var ~{};\n~{}", compile(cons(symbol(void(0), "set!"), form)), compile(list(symbol(void(0), "set!"), list(symbol(void(0), "."), symbol(void(0), "exports"), attribute), id)))) :
    compileTemplate(list("var ~{}", compile(cons(symbol(void(0), "set!"), form))));
};
exports.compileDef = compileDef;

var compileIfElse = function compileIfElse(form) {
  var condition = macroexpand(first(form));
  var thenExpression = macroexpand(second(form));
  var elseExpression = macroexpand(third(form));
  return compileTemplate(list((isList(elseExpression)) && (isEqual(first(elseExpression), symbol(void(0), "if"))) ?
    "~{} ?\n  ~{} :\n~{}" :
    "~{} ?\n  ~{} :\n  ~{}", compile(condition), compile(thenExpression), compile(elseExpression)));
};
exports.compileIfElse = compileIfElse;

var compileDictionary = function compileDictionary(form) {
  var body = (function loop(body, names) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(names) ?
      body :
      (body = "" + (isNil(body) ?
        "" :
        "" + body + ",\n") + (compileTemplate(list("~{}: ~{}", compile(first(names)), compile(macroexpand((form || 0)[first(names)]))))), names = rest(names), loop);
    };
    return recur;
  })(void(0), keys(form));
  return isNil(body) ?
    "{}" :
    compileTemplate(list("{\n  ~{}\n}", body));
};
exports.compileDictionary = compileDictionary;

var desugarFnName = function desugarFnName(form) {
  return (isSymbol(first(form))) || (isNil(first(form))) ?
    form :
    cons(void(0), form);
};
exports.desugarFnName = desugarFnName;

var desugarFnDoc = function desugarFnDoc(form) {
  return (isString(second(form))) || (isNil(second(form))) ?
    form :
    cons(first(form), cons(void(0), rest(form)));
};
exports.desugarFnDoc = desugarFnDoc;

var desugarFnAttrs = function desugarFnAttrs(form) {
  return (isDictionary(third(form))) || (isNil(third(form))) ?
    form :
    cons(first(form), cons(second(form), cons(void(0), rest(rest(form)))));
};
exports.desugarFnAttrs = desugarFnAttrs;

var compileDesugaredFn = function compileDesugaredFn(name, doc, attrs, params, body) {
  return compileTemplate(isNil(name) ?
    list("function(~{}) {\n  ~{}\n}", join(", ", map(compile, (params || 0)["names"])), compileFnBody(map(macroexpand, body), params)) :
    list("function ~{}(~{}) {\n  ~{}\n}", compile(name), join(", ", map(compile, (params || 0)["names"])), compileFnBody(map(macroexpand, body), params)));
};
exports.compileDesugaredFn = compileDesugaredFn;

var compileStatements = function compileStatements(form, prefix) {
  return (function loop(result, expression, expressions) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(expressions) ?
      "" + result + (isNil(prefix) ?
        "" :
        prefix) + (compile(macroexpand(expression))) + ";" :
      (result = "" + result + (compile(macroexpand(expression))) + ";\n", expression = first(expressions), expressions = rest(expressions), loop);
    };
    return recur;
  })("", first(form), rest(form));
};
exports.compileStatements = compileStatements;

var compileFnBody = function compileFnBody(form, params) {
  return (isDictionary(params)) && ((params || 0)["rest"]) ?
    compileStatements(cons(list(symbol(void(0), "def"), (params || 0)["rest"], list(symbol(void(0), "Array.prototype.slice.call"), symbol(void(0), "arguments"), (params || 0)["arity"])), form), "return ") :
  (count(form) === 1) && (isList(first(form))) && (isEqual(first(first(form)), symbol(void(0), "do"))) ?
    compileFnBody(rest(first(form)), params) :
    compileStatements(form, "return ");
};
exports.compileFnBody = compileFnBody;

var desugarParams = function desugarParams(params) {
  return (function loop(names, params) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(params) ?
      {
        "names": names,
        "arity": count(names),
        "rest": void(0)
      } :
    isEqual(first(params), symbol(void(0), "&")) ?
      isEqual(count(params), 1) ?
        {
          "names": names,
          "arity": count(names),
          "rest": void(0)
        } :
      isEqual(count(params), 2) ?
        {
          "names": names,
          "arity": count(names),
          "rest": second(params)
        } :
      "else" ?
        (function() { throw TypeError("Unexpected number of parameters after &"); })() :
        void(0) :
    "else" ?
      (names = conj(names, first(params)), params = rest(params), loop) :
      void(0);
    };
    return recur;
  })([], params);
};
exports.desugarParams = desugarParams;

var analyzeOverloadedFn = function analyzeOverloadedFn(name, doc, attrs, overloads) {
  return map(function(overload) {
    var params = desugarParams(first(overload));
    return {
      "rest": (params || 0)["rest"],
      "names": (params || 0)["names"],
      "arity": (params || 0)["arity"],
      "body": rest(overload)
    };
  }, overloads);
};
exports.analyzeOverloadedFn = analyzeOverloadedFn;

var compileOverloadedFn = function compileOverloadedFn(name, doc, attrs, overloads) {
  var methods = analyzeOverloadedFn(name, doc, attrs, overloads);
  var fixedMethods = filter(function(method) {
    return !((method || 0)["rest"]);
  }, methods);
  var variadic = first(filter(function(method) {
    return (method || 0)["rest"];
  }, methods));
  var names = reduce(function(names, params) {
    return count(names) > (params || 0)["arity"] ?
      names :
      (params || 0)["names"];
  }, [], methods);
  return list(symbol(void(0), "fn"), name, doc, attrs, names, list(symbol(void(0), "raw*"), compileSwitch(symbol(void(0), "arguments.length"), map(function(method) {
    return cons((method || 0)["arity"], list(symbol(void(0), "raw*"), compileFnBody(concat(compileRebind(names, (method || 0)["names"]), (method || 0)["body"]))));
  }, fixedMethods), isNil(variadic) ?
    list(symbol(void(0), "throw"), list(symbol(void(0), "Error"), "Invalid arity")) :
    list(symbol(void(0), "raw*"), compileFnBody(concat(compileRebind(cons(list(symbol(void(0), "Array.prototype.slice.call"), symbol(void(0), "arguments"), (variadic || 0)["arity"]), names), cons((variadic || 0)["rest"], (variadic || 0)["names"])), (variadic || 0)["body"]))))), void(0));
};
exports.compileOverloadedFn = compileOverloadedFn;

var compileRebind = function compileRebind(bindings, names) {
  return (function loop(form, bindings, names) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(names) ?
      reverse(form) :
      (form = isEqual(first(names), first(bindings)) ?
        form :
        cons(list(symbol(void(0), "def"), first(names), first(bindings)), form), bindings = rest(bindings), names = rest(names), loop);
    };
    return recur;
  })(list(), bindings, names);
};
exports.compileRebind = compileRebind;

var compileSwitchCases = function compileSwitchCases(cases) {
  return reduce(function(form, caseExpression) {
    return "" + form + (compileTemplate(list("case ~{}:\n  ~{}\n", compile(macroexpand(first(caseExpression))), compile(macroexpand(rest(caseExpression))))));
  }, "", cases);
};
exports.compileSwitchCases = compileSwitchCases;

var compileSwitch = function compileSwitch(value, cases, defaultCase) {
  return compileTemplate(list("switch (~{}) {\n  ~{}\n  default:\n    ~{}\n}", compile(macroexpand(value)), compileSwitchCases(cases), compile(macroexpand(defaultCase))));
};
exports.compileSwitch = compileSwitch;

var compileFn = function compileFn(form) {
  var signature = desugarFnAttrs(desugarFnDoc(desugarFnName(form)));
  var name = first(signature);
  var doc = second(signature);
  var attrs = third(signature);
  return isVector(third(rest(signature))) ?
    compileDesugaredFn(name, doc, attrs, desugarParams(third(rest(signature))), rest(rest(rest(rest(signature))))) :
    compile(compileOverloadedFn(name, doc, attrs, rest(rest(rest(signature)))));
};
exports.compileFn = compileFn;

var compileInvoke = function compileInvoke(form) {
  return compileTemplate(list(isList(first(form)) ?
    "(~{})(~{})" :
    "~{}(~{})", compile(first(form)), compileGroup(rest(form))));
};
exports.compileInvoke = compileInvoke;

var compileGroup = function compileGroup(form, wrap) {
  return wrap ?
    "" + "(" + (compileGroup(form)) + ")" :
    join(", ", vec(map(compile, map(macroexpand, form))));
};
exports.compileGroup = compileGroup;

var compileDo = function compileDo(form) {
  return compile(list(cons(symbol(void(0), "fn"), cons([], form))));
};
exports.compileDo = compileDo;

var defineBindings = function defineBindings(form) {
  return (function loop(defs, bindings) {
    var recur = loop;
    while (recur === loop) {
      recur = count(bindings) === 0 ?
      reverse(defs) :
      (defs = cons(list(symbol(void(0), "def"), (bindings || 0)[0], (bindings || 0)[1]), defs), bindings = rest(rest(bindings)), loop);
    };
    return recur;
  })(list(), form);
};
exports.defineBindings = defineBindings;

var compileThrow = function compileThrow(form) {
  return compileTemplate(list("(function() { throw ~{}; })()", compile(macroexpand(first(form)))));
};
exports.compileThrow = compileThrow;

var compileSet = function compileSet(form) {
  return compileTemplate(list("~{} = ~{}", compile(macroexpand(first(form))), compile(macroexpand(second(form)))));
};
exports.compileSet = compileSet;

var compileVector = function compileVector(form) {
  return compileTemplate(list("[~{}]", compileGroup(form)));
};
exports.compileVector = compileVector;

var compileTry = function compileTry(form) {
  return (function loop(tryExprs, catchExprs, finallyExprs, exprs) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(exprs) ?
      isEmpty(catchExprs) ?
        compileTemplate(list("(function() {\ntry {\n  ~{}\n} finally {\n  ~{}\n}})()", compileFnBody(tryExprs), compileFnBody(finallyExprs))) :
      isEmpty(finallyExprs) ?
        compileTemplate(list("(function() {\ntry {\n  ~{}\n} catch (~{}) {\n  ~{}\n}})()", compileFnBody(tryExprs), compile(first(catchExprs)), compileFnBody(rest(catchExprs)))) :
        compileTemplate(list("(function() {\ntry {\n  ~{}\n} catch (~{}) {\n  ~{}\n} finally {\n  ~{}\n}})()", compileFnBody(tryExprs), compile(first(catchExprs)), compileFnBody(rest(catchExprs)), compileFnBody(finallyExprs))) :
    isEqual(first(first(exprs)), symbol(void(0), "catch")) ?
      (tryExprs = tryExprs, catchExprs = rest(first(exprs)), finallyExprs = finallyExprs, exprs = rest(exprs), loop) :
    isEqual(first(first(exprs)), symbol(void(0), "finally")) ?
      (tryExprs = tryExprs, catchExprs = catchExprs, finallyExprs = rest(first(exprs)), exprs = rest(exprs), loop) :
      (tryExprs = cons(first(exprs), tryExprs), catchExprs = catchExprs, finallyExprs = finallyExprs, exprs = rest(exprs), loop);
    };
    return recur;
  })(list(), list(), list(), reverse(form));
};
exports.compileTry = compileTry;

var compileProperty = function compileProperty(form) {
  return (name(second(form)))[0] === "-" ?
    compileTemplate(list(isList(first(form)) ?
      "(~{}).~{}" :
      "~{}.~{}", compile(macroexpand(first(form))), compile(macroexpand(symbol(subs(name(second(form)), 1)))))) :
    compileTemplate(list("~{}.~{}(~{})", compile(macroexpand(first(form))), compile(macroexpand(second(form))), compileGroup(rest(rest(form)))));
};
exports.compileProperty = compileProperty;

var compileApply = function compileApply(form) {
  return compile(list(symbol(void(0), "."), first(form), symbol(void(0), "apply"), first(form), second(form)));
};
exports.compileApply = compileApply;

var compileNew = function compileNew(form) {
  return compileTemplate(list("new ~{}", compile(form)));
};
exports.compileNew = compileNew;

var compileAget = function compileAget(form) {
  var target = macroexpand(first(form));
  var attribute = macroexpand(second(form));
  var notFound = third(form);
  var template = isList(target) ?
    "(~{})[~{}]" :
    "~{}[~{}]";
  return notFound ?
    compile(list(symbol(void(0), "or"), list(symbol(void(0), "get"), first(form), second(form)), macroexpand(notFound))) :
    compileTemplate(list(template, compile(target), compile(attribute)));
};
exports.compileAget = compileAget;

var compileGet = function compileGet(form) {
  return compileAget(cons(list(symbol(void(0), "or"), first(form), 0), rest(form)));
};
exports.compileGet = compileGet;

var compileInstance = function compileInstance(form) {
  return compileTemplate(list("~{} instanceof ~{}", compile(macroexpand(second(form))), compile(macroexpand(first(form)))));
};
exports.compileInstance = compileInstance;

var compileNot = function compileNot(form) {
  return compileTemplate(list("!(~{})", compile(macroexpand(first(form)))));
};
exports.compileNot = compileNot;

var compileLoop = function compileLoop(form) {
  var bindings = (function loop(names, values, tokens) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(tokens) ?
      {
        "names": names,
        "values": values
      } :
      (names = conj(names, first(tokens)), values = conj(values, second(tokens)), tokens = rest(rest(tokens)), loop);
    };
    return recur;
  })([], [], first(form));
  var names = (bindings || 0)["names"];
  var values = (bindings || 0)["values"];
  var body = rest(form);
  return compile(cons(cons(symbol(void(0), "fn"), cons(symbol(void(0), "loop"), cons(names, compileRecur(names, body)))), list.apply(list, values)));
};
exports.compileLoop = compileLoop;

var rebindBindings = function rebindBindings(names, values) {
  return (function loop(result, names, values) {
    var recur = loop;
    while (recur === loop) {
      recur = isEmpty(names) ?
      reverse(result) :
      (result = cons(list(symbol(void(0), "set!"), first(names), first(values)), result), names = rest(names), values = rest(values), loop);
    };
    return recur;
  })(list(), names, values);
};
exports.rebindBindings = rebindBindings;

var expandRecur = function expandRecur(names, body) {
  return map(function(form) {
    return isList(form) ?
      isEqual(first(form), symbol(void(0), "recur")) ?
        list(symbol(void(0), "raw*"), compileGroup(concat(rebindBindings(names, rest(form)), list(symbol(void(0), "loop"))), true)) :
        expandRecur(names, form) :
      form;
  }, body);
};
exports.expandRecur = expandRecur;

var compileRecur = function compileRecur(names, body) {
  return list(list(symbol(void(0), "raw*"), compileTemplate(list("var recur = loop;\nwhile (recur === loop) {\n  recur = ~{}\n}", compileStatements(expandRecur(names, body))))), symbol(void(0), "recur"));
};
exports.compileRecur = compileRecur;

var compileRaw = function compileRaw(form) {
  return first(form);
};
exports.compileRaw = compileRaw;

installSpecial(symbol(void(0), "set!"), compileSet);

installSpecial(symbol(void(0), "get"), compileGet);

installSpecial(symbol(void(0), "aget"), compileAget);

installSpecial(symbol(void(0), "def"), compileDef);

installSpecial(symbol(void(0), "if"), compileIfElse);

installSpecial(symbol(void(0), "do"), compileDo);

installSpecial(symbol(void(0), "do*"), compileStatements);

installSpecial(symbol(void(0), "fn"), compileFn);

installSpecial(symbol(void(0), "throw"), compileThrow);

installSpecial(symbol(void(0), "vector"), compileVector);

installSpecial(symbol(void(0), "try"), compileTry);

installSpecial(symbol(void(0), "."), compileProperty);

installSpecial(symbol(void(0), "apply"), compileApply);

installSpecial(symbol(void(0), "new"), compileNew);

installSpecial(symbol(void(0), "instance?"), compileInstance);

installSpecial(symbol(void(0), "not"), compileNot);

installSpecial(symbol(void(0), "loop"), compileLoop);

installSpecial(symbol(void(0), "raw*"), compileRaw);

installSpecial(symbol(void(0), "comment"), writeComment);

var compileRePattern = function compileRePattern(form) {
  return "" + form;
};
exports.compileRePattern = compileRePattern;

var installNative = function installNative(alias, operator, validator, fallback) {
  return installSpecial(alias, function(form) {
    return isEmpty(form) ?
      fallback :
      reduce(function(left, right) {
        return compileTemplate(list("~{} ~{} ~{}", left, name(operator), right));
      }, map(function(operand) {
        return compileTemplate(list(isList(operand) ?
          "(~{})" :
          "~{}", compile(macroexpand(operand))));
      }, form));
  }, validator);
};
exports.installNative = installNative;

var installOperator = function installOperator(alias, operator) {
  return installSpecial(alias, function(form) {
    return (function loop(result, left, right, operands) {
      var recur = loop;
      while (recur === loop) {
        recur = isEmpty(operands) ?
        "" + result + (compileTemplate(list("~{} ~{} ~{}", compile(macroexpand(left)), name(operator), compile(macroexpand(right))))) :
        (result = "" + result + (compileTemplate(list("~{} ~{} ~{} && ", compile(macroexpand(left)), name(operator), compile(macroexpand(right))))), left = right, right = first(operands), operands = rest(operands), loop);
      };
      return recur;
    })("", first(form), second(form), rest(rest(form)));
  }, verifyTwo);
};
exports.installOperator = installOperator;

var compilerError = function compilerError(form, message) {
  var error = Error("" + message);
  error.line = 1;
  return (function() { throw error; })();
};
exports.compilerError = compilerError;

var verifyTwo = function verifyTwo(form) {
  return (isEmpty(rest(form))) || (isEmpty(rest(rest(form)))) ?
    (function() { throw compilerError(form, "" + (first(form)) + " form requires at least two operands"); })() :
    void(0);
};
exports.verifyTwo = verifyTwo;

installNative(symbol(void(0), "+"), symbol(void(0), "+"), void(0), 0);

installNative(symbol(void(0), "-"), symbol(void(0), "-"), void(0), "NaN");

installNative(symbol(void(0), "*"), symbol(void(0), "*"), void(0), 1);

installNative(symbol(void(0), "/"), symbol(void(0), "/"), verifyTwo);

installNative(symbol(void(0), "mod"), symbol("%"), verifyTwo);

installNative(symbol(void(0), "and"), symbol(void(0), "&&"));

installNative(symbol(void(0), "or"), symbol(void(0), "||"));

installOperator(symbol(void(0), "not="), symbol(void(0), "!="));

installOperator(symbol(void(0), "=="), symbol(void(0), "==="));

installOperator(symbol(void(0), "identical?"), symbol(void(0), "==="));

installOperator(symbol(void(0), ">"), symbol(void(0), ">"));

installOperator(symbol(void(0), ">="), symbol(void(0), ">="));

installOperator(symbol(void(0), "<"), symbol(void(0), "<"));

installOperator(symbol(void(0), "<="), symbol(void(0), "<="));

installNative(symbol(void(0), "bit-and"), symbol(void(0), "&"), verifyTwo);

installNative(symbol(void(0), "bit-or"), symbol(void(0), "|"), verifyTwo);

installNative(symbol(void(0), "bit-xor"), symbol("^"));

installNative(symbol(void(0), "bit-not"), symbol("~"), verifyTwo);

installNative(symbol(void(0), "bit-shift-left"), symbol(void(0), "<<"), verifyTwo);

installNative(symbol(void(0), "bit-shift-right"), symbol(void(0), ">>"), verifyTwo);

installNative(symbol(void(0), "bit-shift-right-zero-fil"), symbol(void(0), ">>>"), verifyTwo);

installMacro(symbol(void(0), "str"), function str() {
  var forms = Array.prototype.slice.call(arguments, 0);
  return concat(list(symbol(void(0), "+"), ""), forms);
});

installMacro(symbol(void(0), "let"), function letMacro(bindings) {
  var body = Array.prototype.slice.call(arguments, 1);
  return cons(symbol(void(0), "do"), concat(defineBindings(bindings), body));
});

installMacro(symbol(void(0), "cond"), function cond() {
  var clauses = Array.prototype.slice.call(arguments, 0);
  return !(isEmpty(clauses)) ?
    list(symbol(void(0), "if"), first(clauses), isEmpty(rest(clauses)) ?
      (function() { throw Error("cond requires an even number of forms"); })() :
      second(clauses), cons(symbol(void(0), "cond"), rest(rest(clauses)))) :
    void(0);
});

installMacro(symbol(void(0), "defn"), function defn(name) {
  var body = Array.prototype.slice.call(arguments, 1);
  return list(symbol(void(0), "def"), name, concat(list(symbol(void(0), "fn"), name), body));
});

installMacro(symbol(void(0), "defn-"), function defn(name) {
  var body = Array.prototype.slice.call(arguments, 1);
  return concat(list(symbol(void(0), "defn"), withMeta(name, conj({
    "private": true
  }, meta(name)))), body);
});

installMacro(symbol(void(0), "assert"), function assert(x, message) {
  var title = message || "";
  var assertion = prStr(x);
  var uri = (x || 0)["uri"];
  var form = isList(x) ?
    second(x) :
    x;
  return list(symbol(void(0), "do"), list(symbol(void(0), "if"), list(symbol(void(0), "and"), list(symbol(void(0), "not"), list(symbol(void(0), "identical?"), list(symbol(void(0), "typeof"), symbol(void(0), "**verbose**")), "undefined")), symbol(void(0), "**verbose**")), list(symbol(void(0), ".log"), symbol(void(0), "console"), "Assert:", assertion)), list(symbol(void(0), "if"), list(symbol(void(0), "not"), x), list(symbol(void(0), "throw"), list(symbol(void(0), "Error."), list(symbol(void(0), "str"), "Assert failed: ", title, "\n\nAssertion:\n\n", assertion, "\n\nActual:\n\n", form, "\n--------------\n"), uri))));
});

installMacro(symbol(void(0), "import"), function(imports, path) {
  return isNil(path) ?
    list(symbol(void(0), "require"), imports) :
  isSymbol(imports) ?
    list(symbol(void(0), "def"), withMeta(imports, {
      "private": true
    }), list(symbol(void(0), "require"), path)) :
    (function loop(form, names) {
      var recur = loop;
      while (recur === loop) {
        recur = isEmpty(names) ?
        concat(list(symbol(void(0), "do*")), form) :
        (function() {
          var alias = first(names);
          var id = symbol("" + ".-" + (name(alias)));
          return (form = cons(list(symbol(void(0), "def"), withMeta(alias, {
            "private": true
          }), list(id, list(symbol(void(0), "require"), path))), form), names = rest(names), loop);
        })();
      };
      return recur;
    })(list(), imports);
});

var expandNs = function expandNs(id) {
  var params = Array.prototype.slice.call(arguments, 1);
  return (function() {
    var ns = "" + id;
    var requirer = split(ns, ".");
    var doc = isString(first(params)) ?
      first(params) :
      void(0);
    var args = doc ?
      rest(params) :
      params;
    var parseReferences = function(forms) {
      return reduce(function(references, form) {
        (references || 0)[name(first(form))] = vec(rest(form));
        return references;
      }, {}, forms);
    };
    var references = parseReferences(args);
    var idToPath = function idToPath(id) {
      var requirement = split("" + id, ".");
      var isRelative = first(requirer) === first(requirement);
      return isRelative ?
        (function loop(from, to) {
          var recur = loop;
          while (recur === loop) {
            recur = first(from) === first(to) ?
            (from = rest(from), to = rest(to), loop) :
            join("/", concat(["."], repeat(dec(count(from)), ".."), to));
          };
          return recur;
        })(requirer, requirement) :
        join("/", requirement);
    };
    var makeRequire = function(from, as, name) {
      var path = idToPath(from);
      var requirement = name ?
        list(symbol(void(0), "."), list(symbol(void(0), "require"), path), symbol(void(0), "" + "-" + name)) :
        list(symbol(void(0), "require"), path);
      return as ?
        list(symbol(void(0), "def"), as, requirement) :
        requirement;
    };
    var expandRequirement = function(form) {
      var from = first(form);
      var as = ("꞉as" === second(form)) && (third(form));
      return makeRequire(from, as);
    };
    var expandUse = function(form) {
      var from = first(form);
      var directives = dictionary.apply(dictionary, vec(rest(form)));
      var names = (directives || 0)["꞉only"];
      var renames = (directives || 0)["꞉rename"];
      var namedImports = names && (map(function(name) {
        return makeRequire(from, name, name);
      }, names));
      var renamedImports = renames && (map(function(pair) {
        return makeRequire(from, second(pair), first(pair));
      }, renames));
      (function() {
        (!(typeof(__verbose__) === "undefined")) && __verbose__ ?
          console.log("Assert:", "(or names renames)") :
          void(0);
        return !(names || renames) ?
          (function() { throw new Error("" + "Assert failed: " + ("" + "Only [my.lib :only [foo bar]] form & " + "[clojure.string :rename {replace str-replace} are supported") + "\n\nAssertion:\n\n" + "(or names renames)" + "\n\nActual:\n\n" + names + "\n--------------\n", void(0)); })() :
          void(0);
      })();
      return concat([], namedImports, renamedImports);
    };
    var requireForms = (references || 0)["require"];
    var useForms = (references || 0)["use"];
    var requirements = requireForms ?
      map(expandRequirement, requireForms) :
      void(0);
    var uses = useForms ?
      concat.apply(concat, map(expandUse, useForms)) :
      void(0);
    return concat(list(symbol(void(0), "do*"), list(symbol(void(0), "def"), symbol(void(0), "*ns*"), ns), list(symbol(void(0), "set!"), list(symbol(void(0), ".-namespace"), symbol(void(0), "module")), symbol(void(0), "*ns*"))), doc ?
      [list(symbol(void(0), "set!"), list(symbol(void(0), ".-description"), symbol(void(0), "module")), doc)] :
      void(0), requirements, uses);
  })();
};
exports.expandNs = expandNs;

installMacro(symbol(void(0), "ns"), expandNs);

installMacro(symbol(void(0), "print"), function() {
  var more = Array.prototype.slice.call(arguments, 0);
  "Prints the object(s) to the output for human consumption.";
  return concat(list(symbol(void(0), ".log"), symbol(void(0), "console")), more);
})

},{"./reader":5,"./ast":9,"./sequence":4,"./runtime":1,"./string":10,"./backend/javascript/writer":11}],3:[function(require,module,exports){
var _ns_ = "wisp.engine.browser";
module.namespace = _ns_;
var str = (require("./../runtime")).str;
var rest = (require("./../sequence")).rest;
var readFromString = (require("./../reader")).readFromString;
var compileProgram = (require("./../compiler")).compileProgram;;

var transpile = function transpile(source, uri) {
  return "" + (compileProgram(rest(readFromString("" + "(do " + source + ")", uri)))) + "\n";
};
exports.transpile = transpile;

var evaluate = function evaluate(code, url) {
  return eval(transpile(code, url));
};
exports.evaluate = evaluate;

var run = function run(code, url) {
  return (Function(transpile(code, url)))();
};
exports.run = run;

var load = function load(url, callback) {
  var request = window.XMLHttpRequest ?
    new XMLHttpRequest() :
    new ActiveXObject("Microsoft.XMLHTTP");
  request.open("GET", url, true);
  request.overrideMimeType ?
    request.overrideMimeType("application/wisp") :
    void(0);
  request.onreadystatechange = function() {
    return request.readyState === 4 ?
      (request.status === 0) || (request.status === 200) ?
        callback(run(request.responseText, url)) :
        callback("Could not load") :
      void(0);
  };
  return request.send(null);
};
exports.load = load;

var runScripts = function runScripts() {
  var scripts = Array.prototype.filter.call(document.getElementsByTagName("script"), function(script) {
    return script.type === "application/wisp";
  });
  var next = function next() {
    return scripts.length ?
      (function() {
        var script = scripts.shift();
        return script.src ?
          load(script.src, next) :
          next(run(script.innerHTML));
      })() :
      void(0);
  };
  return next();
};
exports.runScripts = runScripts;

(document.readyState === "complete") || (document.readyState === "interactive") ?
  runScripts() :
window.addEventListener ?
  window.addEventListener("DOMContentLoaded", runScripts, false) :
  window.attachEvent("onload", runScripts)

},{"./../runtime":1,"./../sequence":4,"./../reader":5,"./../compiler":6}],9:[function(require,module,exports){
var _ns_ = "wisp.ast";
module.namespace = _ns_;
var isList = (require("./sequence")).isList;
var isSequential = (require("./sequence")).isSequential;
var first = (require("./sequence")).first;
var second = (require("./sequence")).second;
var count = (require("./sequence")).count;
var last = (require("./sequence")).last;
var map = (require("./sequence")).map;
var vec = (require("./sequence")).vec;
var split = (require("./string")).split;
var join = (require("./string")).join;
var isNil = (require("./runtime")).isNil;
var isVector = (require("./runtime")).isVector;
var isNumber = (require("./runtime")).isNumber;
var isString = (require("./runtime")).isString;
var isBoolean = (require("./runtime")).isBoolean;
var isObject = (require("./runtime")).isObject;
var isDate = (require("./runtime")).isDate;
var isRePattern = (require("./runtime")).isRePattern;
var isDictionary = (require("./runtime")).isDictionary;
var str = (require("./runtime")).str;
var inc = (require("./runtime")).inc;
var subs = (require("./runtime")).subs;
var isEqual = (require("./runtime")).isEqual;;

var withMeta = function withMeta(value, metadata) {
  Object.defineProperty(value, "metadata", {
    "value": metadata,
    "configurable": true
  });
  return value;
};
exports.withMeta = withMeta;

var meta = function meta(value) {
  return isObject(value) ?
    value.metadata :
    void(0);
};
exports.meta = meta;

var __nsSeparator__ = "⁄";
exports.__nsSeparator__ = __nsSeparator__;

var Symbol = function Symbol(namespace, name) {
  this.namespace = namespace;
  this.name = name;
  return this;
};

Symbol.type = "wisp.symbol";

Symbol.prototype.type = Symbol.type;

Symbol.prototype.toString = function() {
  var ns = namespace(this);
  return ns ?
    "" + ns + "/" + (name(this)) :
    "" + (name(this));
};

var symbol = function symbol(ns, id) {
  return isSymbol(ns) ?
    ns :
  isKeyword(ns) ?
    new Symbol(namespace(ns), name(ns)) :
  isNil(id) ?
    new Symbol(void(0), ns) :
  "else" ?
    new Symbol(ns, id) :
    void(0);
};
exports.symbol = symbol;

var isSymbol = function isSymbol(x) {
  return x && (Symbol.type === x.type);
};
exports.isSymbol = isSymbol;

var isKeyword = function isKeyword(x) {
  return (isString(x)) && (count(x) > 1) && (first(x) === "꞉");
};
exports.isKeyword = isKeyword;

var keyword = function keyword(ns, id) {
  return isKeyword(ns) ?
    ns :
  isSymbol(ns) ?
    "" + "꞉" + (name(ns)) :
  isNil(id) ?
    "" + "꞉" + ns :
  isNil(ns) ?
    "" + "꞉" + id :
  "else" ?
    "" + "꞉" + ns + __nsSeparator__ + id :
    void(0);
};
exports.keyword = keyword;

var keywordName = function keywordName(value) {
  return last(split(subs(value, 1), __nsSeparator__));
};

var name = function name(value) {
  return isSymbol(value) ?
    value.name :
  isKeyword(value) ?
    keywordName(value) :
  isString(value) ?
    value :
  "else" ?
    (function() { throw new TypeError("" + "Doesn't support name: " + value); })() :
    void(0);
};
exports.name = name;

var keywordNamespace = function keywordNamespace(x) {
  var parts = split(subs(x, 1), __nsSeparator__);
  return count(parts) > 1 ?
    (parts || 0)[0] :
    void(0);
};

var namespace = function namespace(x) {
  return isSymbol(x) ?
    x.namespace :
  isKeyword(x) ?
    keywordNamespace(x) :
  "else" ?
    (function() { throw new TypeError("" + "Doesn't supports namespace: " + x); })() :
    void(0);
};
exports.namespace = namespace;

var gensym = function gensym(prefix) {
  return symbol("" + (isNil(prefix) ?
    "G__" :
    prefix) + (gensym.base = gensym.base + 1));
};
exports.gensym = gensym;

gensym.base = 0;

var isUnquote = function isUnquote(form) {
  return (isList(form)) && (isEqual(first(form), symbol(void(0), "unquote")));
};
exports.isUnquote = isUnquote;

var isUnquoteSplicing = function isUnquoteSplicing(form) {
  return (isList(form)) && (isEqual(first(form), symbol(void(0), "unquote-splicing")));
};
exports.isUnquoteSplicing = isUnquoteSplicing;

var isQuote = function isQuote(form) {
  return (isList(form)) && (isEqual(first(form), symbol(void(0), "quote")));
};
exports.isQuote = isQuote;

var isSyntaxQuote = function isSyntaxQuote(form) {
  return (isList(form)) && (isEqual(first(form), symbol(void(0), "syntax-quote")));
};
exports.isSyntaxQuote = isSyntaxQuote;

var normalize = function normalize(n, len) {
  return (function loop(ns) {
    var recur = loop;
    while (recur === loop) {
      recur = count(ns) < len ?
      (ns = "" + "0" + ns, loop) :
      ns;
    };
    return recur;
  })("" + n);
};

var quoteString = function quoteString(s) {
  s = join("\\\"", split(s, "\""));
  s = join("\\\\", split(s, "\\"));
  s = join("\\b", split(s, ""));
  s = join("\\f", split(s, ""));
  s = join("\\n", split(s, "\n"));
  s = join("\\r", split(s, "\r"));
  s = join("\\t", split(s, "\t"));
  return "" + "\"" + s + "\"";
};
exports.quoteString = quoteString;

var prStr = function prStr(x) {
  return isNil(x) ?
    "nil" :
  isKeyword(x) ?
    namespace(x) ?
      "" + ":" + (namespace(x)) + "/" + (name(x)) :
      "" + ":" + (name(x)) :
  isString(x) ?
    quoteString(x) :
  isDate(x) ?
    "" + "#inst \"" + (x.getUTCFullYear()) + "-" + (normalize(inc(x.getUTCMonth()), 2)) + "-" + (normalize(x.getUTCDate(), 2)) + "T" + (normalize(x.getUTCHours(), 2)) + ":" + (normalize(x.getUTCMinutes(), 2)) + ":" + (normalize(x.getUTCSeconds(), 2)) + "." + (normalize(x.getUTCMilliseconds(), 3)) + "-" + "00:00\"" :
  isVector(x) ?
    "" + "[" + (join(" ", map(prStr, vec(x)))) + "]" :
  isDictionary(x) ?
    "" + "{" + (join(", ", map(function(pair) {
      return "" + (prStr(first(pair))) + " " + (prStr(second(pair)));
    }, x))) + "}" :
  isSequential(x) ?
    "" + "(" + (join(" ", map(prStr, vec(x)))) + ")" :
  isRePattern(x) ?
    "" + "#\"" + (join("\\/", split(x.source, "/"))) + "\"" :
  "else" ?
    "" + x :
    void(0);
};
exports.prStr = prStr

},{"./sequence":4,"./string":10,"./runtime":1}],10:[function(require,module,exports){
var _ns_ = "wisp.string";
module.namespace = _ns_;
var str = (require("./runtime")).str;
var subs = (require("./runtime")).subs;
var reMatches = (require("./runtime")).reMatches;
var isNil = (require("./runtime")).isNil;
var isString = (require("./runtime")).isString;
var vec = (require("./sequence")).vec;
var isEmpty = (require("./sequence")).isEmpty;;

var split = function split(string, pattern, limit) {
  return string.split(pattern, limit);
};
exports.split = split;

var join = function join(separator, coll) {
  switch (arguments.length) {
    case 1:
      var coll = separator;
      return str.apply(str, vec(coll));
    case 2:
      return vec(coll).join(separator);

    default:
      (function() { throw Error("Invalid arity"); })()
  };
  return void(0);
};
exports.join = join;

var upperCase = function upperCase(string) {
  return string.toUpperCase();
};
exports.upperCase = upperCase;

var upperCase = function upperCase(string) {
  return string.toUpperCase();
};
exports.upperCase = upperCase;

var lowerCase = function lowerCase(string) {
  return string.toLowerCase();
};
exports.lowerCase = lowerCase;

var capitalize = function capitalize(string) {
  return count(string) < 2 ?
    upperCase(string) :
    "" + (upperCase(subs(s, 0, 1))) + (lowerCase(subs(s, 1)));
};
exports.capitalize = capitalize;

var replace = function replace(string, match, replacement) {
  return string.replace(match, replacement);
};
exports.replace = replace;

var __LEFTSPACES__ = /^\s\s*/;
exports.__LEFTSPACES__ = __LEFTSPACES__;

var __RIGHTSPACES__ = /\s\s*$/;
exports.__RIGHTSPACES__ = __RIGHTSPACES__;

var __SPACES__ = /^\s\s*$/;
exports.__SPACES__ = __SPACES__;

var triml = isNil("".trimLeft) ?
  function(string) {
    return string.replace(__LEFTSPACES__, "");
  } :
  function triml(string) {
    return string.trimLeft();
  };
exports.triml = triml;

var trimr = isNil("".trimRight) ?
  function(string) {
    return string.replace(__RIGHTSPACES__, "");
  } :
  function trimr(string) {
    return string.trimRight();
  };
exports.trimr = trimr;

var trim = isNil("".trim) ?
  function(string) {
    return string.replace(__LEFTSPACES__).replace(__RIGHTSPACES__);
  } :
  function trim(string) {
    return string.trim();
  };
exports.trim = trim;

var isBlank = function isBlank(string) {
  return (isNil(string)) || (isEmpty(string)) || (reMatches(__SPACES__, string));
};
exports.isBlank = isBlank

},{"./runtime":1,"./sequence":4}],11:[function(require,module,exports){
var _ns_ = "wisp.backend.javascript.writer";
module.namespace = _ns_;
module.description = "Compiler backend for for writing JS output";
var name = (require("./../../ast")).name;
var namespace = (require("./../../ast")).namespace;
var symbol = (require("./../../ast")).symbol;
var isSymbol = (require("./../../ast")).isSymbol;
var isKeyword = (require("./../../ast")).isKeyword;
var list = (require("./../../sequence")).list;
var first = (require("./../../sequence")).first;
var rest = (require("./../../sequence")).rest;
var isList = (require("./../../sequence")).isList;
var vec = (require("./../../sequence")).vec;
var map = (require("./../../sequence")).map;
var count = (require("./../../sequence")).count;
var last = (require("./../../sequence")).last;
var reduce = (require("./../../sequence")).reduce;
var isEmpty = (require("./../../sequence")).isEmpty;
var isTrue = (require("./../../runtime")).isTrue;
var isNil = (require("./../../runtime")).isNil;
var isString = (require("./../../runtime")).isString;
var isNumber = (require("./../../runtime")).isNumber;
var isVector = (require("./../../runtime")).isVector;
var isDictionary = (require("./../../runtime")).isDictionary;
var isBoolean = (require("./../../runtime")).isBoolean;
var isRePattern = (require("./../../runtime")).isRePattern;
var reFind = (require("./../../runtime")).reFind;
var dec = (require("./../../runtime")).dec;
var subs = (require("./../../runtime")).subs;
var replace = (require("./../../string")).replace;
var join = (require("./../../string")).join;
var split = (require("./../../string")).split;
var upperCase = (require("./../../string")).upperCase;;

var writeReference = function writeReference(form) {
  "Translates references from clojure convention to JS:\n\n  **macros**      __macros__\n  list->vector    listToVector\n  set!            set\n  foo_bar         foo_bar\n  number?         isNumber\n  create-server   createServer";
  return (function() {
    var id = name(form);
    id = id === "*" ?
      "multiply" :
    id === "/" ?
      "divide" :
    id === "+" ?
      "sum" :
    id === "-" ?
      "subtract" :
    id === "=" ?
      "equal?" :
    id === "==" ?
      "strict-equal?" :
    id === "<=" ?
      "not-greater-than" :
    id === ">=" ?
      "not-less-than" :
    id === ">" ?
      "greater-than" :
    id === "<" ?
      "less-than" :
    "else" ?
      id :
      void(0);
    id = join("_", split(id, "*"));
    id = join("-to-", split(id, "->"));
    id = join(split(id, "!"));
    id = join("$", split(id, "%"));
    id = join("-plus-", split(id, "+"));
    id = join("-and-", split(id, "&"));
    id = last(id) === "?" ?
      "" + "is-" + (subs(id, 0, dec(count(id)))) :
      id;
    id = reduce(function(result, key) {
      return "" + result + ((!(isEmpty(result))) && (!(isEmpty(key))) ?
        "" + (upperCase((key || 0)[0])) + (subs(key, 1)) :
        key);
    }, "", split(id, "-"));
    return id;
  })();
};
exports.writeReference = writeReference;

var writeKeywordReference = function writeKeywordReference(form) {
  return "" + "\"" + (name(form)) + "\"";
};
exports.writeKeywordReference = writeKeywordReference;

var writeKeyword = function writeKeyword(form) {
  return "" + "\"" + "꞉" + (name(form)) + "\"";
};
exports.writeKeyword = writeKeyword;

var writeSymbol = function writeSymbol(form) {
  return write(list(symbol(void(0), "symbol"), namespace(form), name(form)));
};
exports.writeSymbol = writeSymbol;

var writeNil = function writeNil(form) {
  return "void(0)";
};
exports.writeNil = writeNil;

var writeNumber = function writeNumber(form) {
  return form;
};
exports.writeNumber = writeNumber;

var writeBoolean = function writeBoolean(form) {
  return isTrue(form) ?
    "true" :
    "false";
};
exports.writeBoolean = writeBoolean;

var writeString = function writeString(form) {
  form = replace(form, RegExp("\\\\", "g"), "\\\\");
  form = replace(form, RegExp("\n", "g"), "\\n");
  form = replace(form, RegExp("\r", "g"), "\\r");
  form = replace(form, RegExp("\t", "g"), "\\t");
  form = replace(form, RegExp("\"", "g"), "\\\"");
  return "" + "\"" + form + "\"";
};
exports.writeString = writeString;

var writeTemplate = function writeTemplate() {
  var form = Array.prototype.slice.call(arguments, 0);
  return (function() {
    var indentPattern = /\n *$/;
    var lineBreakPatter = RegExp("\n", "g");
    var getIndentation = function(code) {
      return (reFind(indentPattern, code)) || "\n";
    };
    return (function loop(code, parts, values) {
      var recur = loop;
      while (recur === loop) {
        recur = count(parts) > 1 ?
        (code = "" + code + (first(parts)) + (replace("" + "" + (first(values)), lineBreakPatter, getIndentation(first(parts)))), parts = rest(parts), values = rest(values), loop) :
        "" + code + (first(parts));
      };
      return recur;
    })("", split(first(form), "~{}"), rest(form));
  })();
};
exports.writeTemplate = writeTemplate;

var writeGroup = function writeGroup() {
  var forms = Array.prototype.slice.call(arguments, 0);
  return join(", ", forms);
};
exports.writeGroup = writeGroup;

var writeInvoke = function writeInvoke(callee) {
  var params = Array.prototype.slice.call(arguments, 1);
  return writeTemplate("~{}(~{})", callee, writeGroup.apply(writeGroup, params));
};
exports.writeInvoke = writeInvoke;

var writeError = function writeError(message) {
  return function() {
    return (function() { throw Error(message); })();
  };
};
exports.writeError = writeError;

var writeVector = writeError("Vectors are not supported");
exports.writeVector = writeVector;

var writeDictionary = writeError("Dictionaries are not supported");
exports.writeDictionary = writeDictionary;

var writePattern = writeError("Regular expressions are not supported");
exports.writePattern = writePattern;

var compileComment = function compileComment(form) {
  return compileTemplate(list("//~{}\n", first(form)));
};
exports.compileComment = compileComment;

var writeDef = function writeDef(form) {
  var id = first(form);
  var isExport = ((((meta(form)) || {}) || 0)["top"]) && (!((((meta(id)) || {}) || 0)["private"]));
  var attribute = symbol(namespace(id), "" + "-" + (name(id)));
  return isExport ?
    compileTemplate(list("var ~{};\n~{}", compile(cons(symbol(void(0), "set!"), form)), compile(list(symbol(void(0), "set!"), list(symbol(void(0), "."), symbol(void(0), "exports"), attribute), id)))) :
    compileTemplate(list("var ~{}", compile(cons(symbol(void(0), "set!"), form))));
};
exports.writeDef = writeDef;

var write = function write(form) {
  return isNil(form) ?
    writeNil(form) :
  isSymbol(form) ?
    writeReference(form) :
  isKeyword(form) ?
    writeKeywordReference(form) :
  isString(form) ?
    writeString(form) :
  isNumber(form) ?
    writeNumber(form) :
  isBoolean(form) ?
    writeBoolean(form) :
  isRePattern(form) ?
    writePattern(form) :
  isVector(form) ?
    writeVector(form) :
  isDictionary(form) ?
    writeDictionary() :
  isList(form) ?
    writeInvoke.apply(writeInvoke, map(write, vec(form))) :
  "else" ?
    writeError("Unsupported form") :
    void(0);
};
exports.write = write

},{"./../../ast":9,"./../../sequence":4,"./../../runtime":1,"./../../string":10}]},{},[2])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3dpc3AvdHJ5L25vZGVfbW9kdWxlcy93aXNwL3J1bnRpbWUuanMiLCIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3dpc3AvdHJ5L21haW4uanMiLCIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3dpc3AvdHJ5L25vZGVfbW9kdWxlcy9jb2RlbWlycm9yLWFjdGl2aW5lL2NvcmUuanMiLCIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3dpc3AvdHJ5L25vZGVfbW9kdWxlcy9jb2RlbWlycm9yLXBlcnNpc3QvY29yZS5qcyIsIi9Vc2Vycy9nb3phbGEvUHJvamVjdHMvd2lzcC90cnkvbm9kZV9tb2R1bGVzL3dpc3Avc2VxdWVuY2UuanMiLCIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3dpc3AvdHJ5L25vZGVfbW9kdWxlcy93aXNwL3JlYWRlci5qcyIsIi9Vc2Vycy9nb3phbGEvUHJvamVjdHMvd2lzcC90cnkvbm9kZV9tb2R1bGVzL3dpc3AvY29tcGlsZXIuanMiLCIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3dpc3AvdHJ5L25vZGVfbW9kdWxlcy93aXNwL2VuZ2luZS9icm93c2VyLmpzIiwiL1VzZXJzL2dvemFsYS9Qcm9qZWN0cy93aXNwL3RyeS9ub2RlX21vZHVsZXMvd2lzcC9hc3QuanMiLCIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3dpc3AvdHJ5L25vZGVfbW9kdWxlcy93aXNwL3N0cmluZy5qcyIsIi9Vc2Vycy9nb3phbGEvUHJvamVjdHMvd2lzcC90cnkvbm9kZV9tb2R1bGVzL3dpc3AvYmFja2VuZC9qYXZhc2NyaXB0L3dyaXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaHhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsZ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe3ZhciBfbnNfID0gXCJ3aXNwLnJ1bnRpbWVcIjtcbm1vZHVsZS5uYW1lc3BhY2UgPSBfbnNfO1xubW9kdWxlLmRlc2NyaXB0aW9uID0gXCJDb3JlIHByaW1pdGl2ZXMgcmVxdWlyZWQgZm9yIHJ1bnRpbWVcIjs7XG5cbnZhciBpZGVudGl0eSA9IGZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgcmV0dXJuIHg7XG59O1xuZXhwb3J0cy5pZGVudGl0eSA9IGlkZW50aXR5O1xuXG52YXIgaXNPZGQgPSBmdW5jdGlvbiBpc09kZChuKSB7XG4gIHJldHVybiBuICUgMiA9PT0gMTtcbn07XG5leHBvcnRzLmlzT2RkID0gaXNPZGQ7XG5cbnZhciBpc0V2ZW4gPSBmdW5jdGlvbiBpc0V2ZW4obikge1xuICByZXR1cm4gbiAlIDIgPT09IDA7XG59O1xuZXhwb3J0cy5pc0V2ZW4gPSBpc0V2ZW47XG5cbnZhciBpc0RpY3Rpb25hcnkgPSBmdW5jdGlvbiBpc0RpY3Rpb25hcnkoZm9ybSkge1xuICByZXR1cm4gKGlzT2JqZWN0KGZvcm0pKSAmJiAoaXNPYmplY3QoT2JqZWN0LmdldFByb3RvdHlwZU9mKGZvcm0pKSkgJiYgKGlzTmlsKE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3QuZ2V0UHJvdG90eXBlT2YoZm9ybSkpKSk7XG59O1xuZXhwb3J0cy5pc0RpY3Rpb25hcnkgPSBpc0RpY3Rpb25hcnk7XG5cbnZhciBkaWN0aW9uYXJ5ID0gZnVuY3Rpb24gZGljdGlvbmFyeSgpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGtleVZhbHVlcywgcmVzdWx0KSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0ga2V5VmFsdWVzLmxlbmd0aCA/XG4gICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIChyZXN1bHQgfHwgMClbKGtleVZhbHVlcyB8fCAwKVswXV0gPSAoa2V5VmFsdWVzIHx8IDApWzFdO1xuICAgICAgICByZXR1cm4gKGtleVZhbHVlcyA9IGtleVZhbHVlcy5zbGljZSgyKSwgcmVzdWx0ID0gcmVzdWx0LCBsb29wKTtcbiAgICAgIH0pKCkgOlxuICAgICAgcmVzdWx0O1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLCB7fSk7XG59O1xuZXhwb3J0cy5kaWN0aW9uYXJ5ID0gZGljdGlvbmFyeTtcblxudmFyIGtleXMgPSBmdW5jdGlvbiBrZXlzKGRpY3Rpb25hcnkpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGRpY3Rpb25hcnkpO1xufTtcbmV4cG9ydHMua2V5cyA9IGtleXM7XG5cbnZhciB2YWxzID0gZnVuY3Rpb24gdmFscyhkaWN0aW9uYXJ5KSB7XG4gIHJldHVybiBrZXlzKGRpY3Rpb25hcnkpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gKGRpY3Rpb25hcnkgfHwgMClba2V5XTtcbiAgfSk7XG59O1xuZXhwb3J0cy52YWxzID0gdmFscztcblxudmFyIGtleVZhbHVlcyA9IGZ1bmN0aW9uIGtleVZhbHVlcyhkaWN0aW9uYXJ5KSB7XG4gIHJldHVybiBrZXlzKGRpY3Rpb25hcnkpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gW2tleSwgKGRpY3Rpb25hcnkgfHwgMClba2V5XV07XG4gIH0pO1xufTtcbmV4cG9ydHMua2V5VmFsdWVzID0ga2V5VmFsdWVzO1xuXG52YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSgpIHtcbiAgcmV0dXJuIE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5yZWR1Y2UoZnVuY3Rpb24oZGVzY3JpcHRvciwgZGljdGlvbmFyeSkge1xuICAgIGlzT2JqZWN0KGRpY3Rpb25hcnkpID9cbiAgICAgIE9iamVjdC5rZXlzKGRpY3Rpb25hcnkpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiAoZGVzY3JpcHRvciB8fCAwKVtrZXldID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkaWN0aW9uYXJ5LCBrZXkpO1xuICAgICAgfSkgOlxuICAgICAgdm9pZCgwKTtcbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgfSwgT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlKSkpO1xufTtcbmV4cG9ydHMubWVyZ2UgPSBtZXJnZTtcblxudmFyIGlzQ29udGFpbnNWZWN0b3IgPSBmdW5jdGlvbiBpc0NvbnRhaW5zVmVjdG9yKHZlY3RvciwgZWxlbWVudCkge1xuICByZXR1cm4gdmVjdG9yLmluZGV4T2YoZWxlbWVudCkgPj0gMDtcbn07XG5leHBvcnRzLmlzQ29udGFpbnNWZWN0b3IgPSBpc0NvbnRhaW5zVmVjdG9yO1xuXG52YXIgbWFwRGljdGlvbmFyeSA9IGZ1bmN0aW9uIG1hcERpY3Rpb25hcnkoc291cmNlLCBmKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbih0YXJnZXQsIGtleSkge1xuICAgICh0YXJnZXQgfHwgMClba2V5XSA9IGYoKHNvdXJjZSB8fCAwKVtrZXldKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LCB7fSk7XG59O1xuZXhwb3J0cy5tYXBEaWN0aW9uYXJ5ID0gbWFwRGljdGlvbmFyeTtcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcblxudmFyIGlzRm4gPSB0eXBlb2YoLy4vKSA9PT0gXCJmdW5jdGlvblwiID9cbiAgZnVuY3Rpb24gaXNGbih4KSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoeCkgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIjtcbiAgfSA6XG4gIGZ1bmN0aW9uIGlzRm4oeCkge1xuICAgIHJldHVybiB0eXBlb2YoeCkgPT09IFwiZnVuY3Rpb25cIjtcbiAgfTtcbmV4cG9ydHMuaXNGbiA9IGlzRm47XG5cbnZhciBpc1N0cmluZyA9IGZ1bmN0aW9uIGlzU3RyaW5nKHgpIHtcbiAgcmV0dXJuICh0eXBlb2YoeCkgPT09IFwic3RyaW5nXCIpIHx8ICh0b1N0cmluZy5jYWxsKHgpID09PSBcIltvYmplY3QgU3RyaW5nXVwiKTtcbn07XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbnZhciBpc051bWJlciA9IGZ1bmN0aW9uIGlzTnVtYmVyKHgpIHtcbiAgcmV0dXJuICh0eXBlb2YoeCkgPT09IFwibnVtYmVyXCIpIHx8ICh0b1N0cmluZy5jYWxsKHgpID09PSBcIltvYmplY3QgTnVtYmVyXVwiKTtcbn07XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5cbnZhciBpc1ZlY3RvciA9IGlzRm4oQXJyYXkuaXNBcnJheSkgP1xuICBBcnJheS5pc0FycmF5IDpcbiAgZnVuY3Rpb24gaXNWZWN0b3IoeCkge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHgpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gIH07XG5leHBvcnRzLmlzVmVjdG9yID0gaXNWZWN0b3I7XG5cbnZhciBpc0RhdGUgPSBmdW5jdGlvbiBpc0RhdGUoeCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh4KSA9PT0gXCJbb2JqZWN0IERhdGVdXCI7XG59O1xuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbnZhciBpc0Jvb2xlYW4gPSBmdW5jdGlvbiBpc0Jvb2xlYW4oeCkge1xuICByZXR1cm4gKHggPT09IHRydWUpIHx8ICh4ID09PSBmYWxzZSkgfHwgKHRvU3RyaW5nLmNhbGwoeCkgPT09IFwiW29iamVjdCBCb29sZWFuXVwiKTtcbn07XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcblxudmFyIGlzUmVQYXR0ZXJuID0gZnVuY3Rpb24gaXNSZVBhdHRlcm4oeCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh4KSA9PT0gXCJbb2JqZWN0IFJlZ0V4cF1cIjtcbn07XG5leHBvcnRzLmlzUmVQYXR0ZXJuID0gaXNSZVBhdHRlcm47XG5cbnZhciBpc09iamVjdCA9IGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgcmV0dXJuIHggJiYgKHR5cGVvZih4KSA9PT0gXCJvYmplY3RcIik7XG59O1xuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG52YXIgaXNOaWwgPSBmdW5jdGlvbiBpc05pbCh4KSB7XG4gIHJldHVybiAoeCA9PT0gdm9pZCgwKSkgfHwgKHggPT09IG51bGwpO1xufTtcbmV4cG9ydHMuaXNOaWwgPSBpc05pbDtcblxudmFyIGlzVHJ1ZSA9IGZ1bmN0aW9uIGlzVHJ1ZSh4KSB7XG4gIHJldHVybiB4ID09PSB0cnVlO1xufTtcbmV4cG9ydHMuaXNUcnVlID0gaXNUcnVlO1xuXG52YXIgaXNGYWxzZSA9IGZ1bmN0aW9uIGlzRmFsc2UoeCkge1xuICByZXR1cm4geCA9PT0gdHJ1ZTtcbn07XG5leHBvcnRzLmlzRmFsc2UgPSBpc0ZhbHNlO1xuXG52YXIgcmVGaW5kID0gZnVuY3Rpb24gcmVGaW5kKHJlLCBzKSB7XG4gIHZhciBtYXRjaGVzID0gcmUuZXhlYyhzKTtcbiAgcmV0dXJuICEoaXNOaWwobWF0Y2hlcykpID9cbiAgICBtYXRjaGVzLmxlbmd0aCA9PT0gMSA/XG4gICAgICAobWF0Y2hlcyB8fCAwKVswXSA6XG4gICAgICBtYXRjaGVzIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMucmVGaW5kID0gcmVGaW5kO1xuXG52YXIgcmVNYXRjaGVzID0gZnVuY3Rpb24gcmVNYXRjaGVzKHBhdHRlcm4sIHNvdXJjZSkge1xuICB2YXIgbWF0Y2hlcyA9IHBhdHRlcm4uZXhlYyhzb3VyY2UpO1xuICByZXR1cm4gKCEoaXNOaWwobWF0Y2hlcykpKSAmJiAoKG1hdGNoZXMgfHwgMClbMF0gPT09IHNvdXJjZSkgP1xuICAgIG1hdGNoZXMubGVuZ3RoID09PSAxID9cbiAgICAgIChtYXRjaGVzIHx8IDApWzBdIDpcbiAgICAgIG1hdGNoZXMgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5yZU1hdGNoZXMgPSByZU1hdGNoZXM7XG5cbnZhciByZVBhdHRlcm4gPSBmdW5jdGlvbiByZVBhdHRlcm4ocykge1xuICB2YXIgbWF0Y2ggPSByZUZpbmQoL14oPzpcXChcXD8oW2lkbXN1eF0qKVxcKSk/KC4qKS8sIHMpO1xuICByZXR1cm4gbmV3IFJlZ0V4cCgobWF0Y2ggfHwgMClbMl0sIChtYXRjaCB8fCAwKVsxXSk7XG59O1xuZXhwb3J0cy5yZVBhdHRlcm4gPSByZVBhdHRlcm47XG5cbnZhciBpbmMgPSBmdW5jdGlvbiBpbmMoeCkge1xuICByZXR1cm4geCArIDE7XG59O1xuZXhwb3J0cy5pbmMgPSBpbmM7XG5cbnZhciBkZWMgPSBmdW5jdGlvbiBkZWMoeCkge1xuICByZXR1cm4geCAtIDE7XG59O1xuZXhwb3J0cy5kZWMgPSBkZWM7XG5cbnZhciBzdHIgPSBmdW5jdGlvbiBzdHIoKSB7XG4gIHJldHVybiBTdHJpbmcucHJvdG90eXBlLmNvbmNhdC5hcHBseShcIlwiLCBhcmd1bWVudHMpO1xufTtcbmV4cG9ydHMuc3RyID0gc3RyO1xuXG52YXIgY2hhciA9IGZ1bmN0aW9uIGNoYXIoY29kZSkge1xuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbn07XG5leHBvcnRzLmNoYXIgPSBjaGFyO1xuXG52YXIgaW50ID0gZnVuY3Rpb24gaW50KHgpIHtcbiAgcmV0dXJuIGlzTnVtYmVyKHgpID9cbiAgICB4ID49IDAgP1xuICAgICAgTWF0aC5mbG9vcih4KSA6XG4gICAgICBNYXRoLmZsb29yKHgpIDpcbiAgICB4LmNoYXJDb2RlQXQoMCk7XG59O1xuZXhwb3J0cy5pbnQgPSBpbnQ7XG5cbnZhciBzdWJzID0gZnVuY3Rpb24gc3VicyhzdHJpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIHN0cmluZy5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG59O1xuZXhwb3J0cy5zdWJzID0gc3VicztcblxudmFyIGlzUGF0dGVybkVxdWFsID0gZnVuY3Rpb24gaXNQYXR0ZXJuRXF1YWwoeCwgeSkge1xuICByZXR1cm4gKGlzUmVQYXR0ZXJuKHgpKSAmJiAoaXNSZVBhdHRlcm4oeSkpICYmICh4LnNvdXJjZSA9PT0geS5zb3VyY2UpICYmICh4Lmdsb2JhbCA9PT0geS5nbG9iYWwpICYmICh4Lm11bHRpbGluZSA9PT0geS5tdWx0aWxpbmUpICYmICh4Lmlnbm9yZUNhc2UgPT09IHkuaWdub3JlQ2FzZSk7XG59O1xuXG52YXIgaXNEYXRlRXF1YWwgPSBmdW5jdGlvbiBpc0RhdGVFcXVhbCh4LCB5KSB7XG4gIHJldHVybiAoaXNEYXRlKHgpKSAmJiAoaXNEYXRlKHkpKSAmJiAoTnVtYmVyKHgpID09PSBOdW1iZXIoeSkpO1xufTtcblxudmFyIGlzRGljdGlvbmFyeUVxdWFsID0gZnVuY3Rpb24gaXNEaWN0aW9uYXJ5RXF1YWwoeCwgeSkge1xuICByZXR1cm4gKGlzT2JqZWN0KHgpKSAmJiAoaXNPYmplY3QoeSkpICYmICgoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHhLZXlzID0ga2V5cyh4KTtcbiAgICB2YXIgeUtleXMgPSBrZXlzKHkpO1xuICAgIHZhciB4Q291bnQgPSB4S2V5cy5sZW5ndGg7XG4gICAgdmFyIHlDb3VudCA9IHlLZXlzLmxlbmd0aDtcbiAgICByZXR1cm4gKHhDb3VudCA9PT0geUNvdW50KSAmJiAoKGZ1bmN0aW9uIGxvb3AoaW5kZXgsIGNvdW50LCBrZXlzKSB7XG4gICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICAgIHJlY3VyID0gaW5kZXggPCBjb3VudCA/XG4gICAgICAgIGlzRXF1aXZhbGVudCgoeCB8fCAwKVsoa2V5cyB8fCAwKVtpbmRleF1dLCAoeSB8fCAwKVsoa2V5cyB8fCAwKVtpbmRleF1dKSA/XG4gICAgICAgICAgKGluZGV4ID0gaW5jKGluZGV4KSwgY291bnQgPSBjb3VudCwga2V5cyA9IGtleXMsIGxvb3ApIDpcbiAgICAgICAgICBmYWxzZSA6XG4gICAgICAgIHRydWU7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlY3VyO1xuICAgIH0pKDAsIHhDb3VudCwgeEtleXMpKTtcbiAgfSkoKSk7XG59O1xuXG52YXIgaXNWZWN0b3JFcXVhbCA9IGZ1bmN0aW9uIGlzVmVjdG9yRXF1YWwoeCwgeSkge1xuICByZXR1cm4gKGlzVmVjdG9yKHgpKSAmJiAoaXNWZWN0b3IoeSkpICYmICh4Lmxlbmd0aCA9PT0geS5sZW5ndGgpICYmICgoZnVuY3Rpb24gbG9vcCh4cywgeXMsIGluZGV4LCBjb3VudCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGluZGV4IDwgY291bnQgP1xuICAgICAgaXNFcXVpdmFsZW50KCh4cyB8fCAwKVtpbmRleF0sICh5cyB8fCAwKVtpbmRleF0pID9cbiAgICAgICAgKHhzID0geHMsIHlzID0geXMsIGluZGV4ID0gaW5jKGluZGV4KSwgY291bnQgPSBjb3VudCwgbG9vcCkgOlxuICAgICAgICBmYWxzZSA6XG4gICAgICB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KSh4LCB5LCAwLCB4Lmxlbmd0aCkpO1xufTtcblxudmFyIGlzRXF1aXZhbGVudCA9IGZ1bmN0aW9uIGlzRXF1aXZhbGVudCh4LCB5KSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiAoeCA9PT0geSkgfHwgKGlzTmlsKHgpID9cbiAgICAgICAgaXNOaWwoeSkgOlxuICAgICAgaXNOaWwoeSkgP1xuICAgICAgICBpc05pbCh4KSA6XG4gICAgICBpc1N0cmluZyh4KSA/XG4gICAgICAgIGZhbHNlIDpcbiAgICAgIGlzTnVtYmVyKHgpID9cbiAgICAgICAgZmFsc2UgOlxuICAgICAgaXNGbih4KSA/XG4gICAgICAgIGZhbHNlIDpcbiAgICAgIGlzQm9vbGVhbih4KSA/XG4gICAgICAgIGZhbHNlIDpcbiAgICAgIGlzRGF0ZSh4KSA/XG4gICAgICAgIGlzRGF0ZUVxdWFsKHgsIHkpIDpcbiAgICAgIGlzVmVjdG9yKHgpID9cbiAgICAgICAgaXNWZWN0b3JFcXVhbCh4LCB5LCBbXSwgW10pIDpcbiAgICAgIGlzUmVQYXR0ZXJuKHgpID9cbiAgICAgICAgaXNQYXR0ZXJuRXF1YWwoeCwgeSkgOlxuICAgICAgXCJlbHNlXCIgP1xuICAgICAgICBpc0RpY3Rpb25hcnlFcXVhbCh4LCB5KSA6XG4gICAgICAgIHZvaWQoMCkpO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBtb3JlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcChwcmV2aW91cywgY3VycmVudCwgaW5kZXgsIGNvdW50KSB7XG4gICAgICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgICAgIHJlY3VyID0gKGlzRXF1aXZhbGVudChwcmV2aW91cywgY3VycmVudCkpICYmIChpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAocHJldmlvdXMgPSBjdXJyZW50LCBjdXJyZW50ID0gKG1vcmUgfHwgMClbaW5kZXhdLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoeCwgeSwgMCwgbW9yZS5sZW5ndGgpO1xuICB9O1xuICByZXR1cm4gdm9pZCgwKTtcbn07XG5cbnZhciBpc0VxdWFsID0gaXNFcXVpdmFsZW50O1xuZXhwb3J0cy5pc0VxdWFsID0gaXNFcXVhbDtcblxudmFyIGlzU3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBpc1N0cmljdEVxdWFsKHgsIHkpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggPT09IHk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIG1vcmUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHByZXZpb3VzLCBjdXJyZW50LCBpbmRleCwgY291bnQpIHtcbiAgICAgICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICAgICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICAgICAgcmVjdXIgPSAocHJldmlvdXMgPT09IGN1cnJlbnQpICYmIChpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAocHJldmlvdXMgPSBjdXJyZW50LCBjdXJyZW50ID0gKG1vcmUgfHwgMClbaW5kZXhdLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoeCwgeSwgMCwgbW9yZS5sZW5ndGgpO1xuICB9O1xuICByZXR1cm4gdm9pZCgwKTtcbn07XG5leHBvcnRzLmlzU3RyaWN0RXF1YWwgPSBpc1N0cmljdEVxdWFsO1xuXG52YXIgZ3JlYXRlclRoYW4gPSBmdW5jdGlvbiBncmVhdGVyVGhhbih4LCB5KSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ID4geTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocHJldmlvdXMsIGN1cnJlbnQsIGluZGV4LCBjb3VudCkge1xuICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgICByZWN1ciA9IChwcmV2aW91cyA+IGN1cnJlbnQpICYmIChpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAocHJldmlvdXMgPSBjdXJyZW50LCBjdXJyZW50ID0gKG1vcmUgfHwgMClbaW5kZXhdLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoeCwgeSwgMCwgbW9yZS5sZW5ndGgpO1xuICB9O1xuICByZXR1cm4gdm9pZCgwKTtcbn07XG5leHBvcnRzLmdyZWF0ZXJUaGFuID0gZ3JlYXRlclRoYW47XG5cbnZhciBub3RMZXNzVGhhbiA9IGZ1bmN0aW9uIG5vdExlc3NUaGFuKHgsIHkpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggPj0geTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocHJldmlvdXMsIGN1cnJlbnQsIGluZGV4LCBjb3VudCkge1xuICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgICByZWN1ciA9IChwcmV2aW91cyA+PSBjdXJyZW50KSAmJiAoaW5kZXggPCBjb3VudCA/XG4gICAgICAgICAgKHByZXZpb3VzID0gY3VycmVudCwgY3VycmVudCA9IChtb3JlIHx8IDApW2luZGV4XSwgaW5kZXggPSBpbmMoaW5kZXgpLCBjb3VudCA9IGNvdW50LCBsb29wKSA6XG4gICAgICAgICAgdHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZWN1cjtcbiAgICAgIH0pKHgsIHksIDAsIG1vcmUubGVuZ3RoKTtcbiAgfTtcbiAgcmV0dXJuIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5ub3RMZXNzVGhhbiA9IG5vdExlc3NUaGFuO1xuXG52YXIgbGVzc1RoYW4gPSBmdW5jdGlvbiBsZXNzVGhhbih4LCB5KSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4IDwgeTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocHJldmlvdXMsIGN1cnJlbnQsIGluZGV4LCBjb3VudCkge1xuICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgICByZWN1ciA9IChwcmV2aW91cyA8IGN1cnJlbnQpICYmIChpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAocHJldmlvdXMgPSBjdXJyZW50LCBjdXJyZW50ID0gKG1vcmUgfHwgMClbaW5kZXhdLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoeCwgeSwgMCwgbW9yZS5sZW5ndGgpO1xuICB9O1xuICByZXR1cm4gdm9pZCgwKTtcbn07XG5leHBvcnRzLmxlc3NUaGFuID0gbGVzc1RoYW47XG5cbnZhciBub3RHcmVhdGVyVGhhbiA9IGZ1bmN0aW9uIG5vdEdyZWF0ZXJUaGFuKHgsIHkpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggPD0geTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocHJldmlvdXMsIGN1cnJlbnQsIGluZGV4LCBjb3VudCkge1xuICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgICByZWN1ciA9IChwcmV2aW91cyA8PSBjdXJyZW50KSAmJiAoaW5kZXggPCBjb3VudCA/XG4gICAgICAgICAgKHByZXZpb3VzID0gY3VycmVudCwgY3VycmVudCA9IChtb3JlIHx8IDApW2luZGV4XSwgaW5kZXggPSBpbmMoaW5kZXgpLCBjb3VudCA9IGNvdW50LCBsb29wKSA6XG4gICAgICAgICAgdHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZWN1cjtcbiAgICAgIH0pKHgsIHksIDAsIG1vcmUubGVuZ3RoKTtcbiAgfTtcbiAgcmV0dXJuIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5ub3RHcmVhdGVyVGhhbiA9IG5vdEdyZWF0ZXJUaGFuO1xuXG52YXIgc3VtID0gZnVuY3Rpb24gc3VtKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGE7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIGEgKyBiO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBhICsgYiArIGM7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIGEgKyBiICsgYyArIGQ7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIGEgKyBiICsgYyArIGQgKyBlO1xuICAgIGNhc2UgNjpcbiAgICAgIHJldHVybiBhICsgYiArIGMgKyBkICsgZSArIGY7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIG1vcmUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDYpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHZhbHVlLCBpbmRleCwgY291bnQpIHtcbiAgICAgICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICAgICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICAgICAgcmVjdXIgPSBpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAodmFsdWUgPSB2YWx1ZSArICgobW9yZSB8fCAwKVtpbmRleF0pLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoYSArIGIgKyBjICsgZCArIGUgKyBmLCAwLCBtb3JlLmxlbmd0aCk7XG4gIH07XG4gIHJldHVybiB2b2lkKDApO1xufTtcbmV4cG9ydHMuc3VtID0gc3VtO1xuXG52YXIgc3VidHJhY3QgPSBmdW5jdGlvbiBzdWJ0cmFjdChhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oKSB7IHRocm93IFR5cGVFcnJvcihcIldyb25nIG51bWJlciBvZiBhcmdzIHBhc3NlZCB0bzogLVwiKTsgfSkoKTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gMCAtIGE7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIGEgLSBiO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBhIC0gYiAtIGM7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIGEgLSBiIC0gYyAtIGQ7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIGEgLSBiIC0gYyAtIGQgLSBlO1xuICAgIGNhc2UgNjpcbiAgICAgIHJldHVybiBhIC0gYiAtIGMgLSBkIC0gZSAtIGY7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIG1vcmUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDYpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHZhbHVlLCBpbmRleCwgY291bnQpIHtcbiAgICAgICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICAgICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICAgICAgcmVjdXIgPSBpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAodmFsdWUgPSB2YWx1ZSAtICgobW9yZSB8fCAwKVtpbmRleF0pLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoYSAtIGIgLSBjIC0gZCAtIGUgLSBmLCAwLCBtb3JlLmxlbmd0aCk7XG4gIH07XG4gIHJldHVybiB2b2lkKDApO1xufTtcbmV4cG9ydHMuc3VidHJhY3QgPSBzdWJ0cmFjdDtcblxudmFyIGRpdmlkZSA9IGZ1bmN0aW9uIGRpdmlkZShhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oKSB7IHRocm93IFR5cGVFcnJvcihcIldyb25nIG51bWJlciBvZiBhcmdzIHBhc3NlZCB0bzogL1wiKTsgfSkoKTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gMSAvIGE7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIGEgLyBiO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBhIC8gYiAvIGM7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIGEgLyBiIC8gYyAvIGQ7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIGEgLyBiIC8gYyAvIGQgLyBlO1xuICAgIGNhc2UgNjpcbiAgICAgIHJldHVybiBhIC8gYiAvIGMgLyBkIC8gZSAvIGY7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIG1vcmUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDYpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHZhbHVlLCBpbmRleCwgY291bnQpIHtcbiAgICAgICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICAgICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICAgICAgcmVjdXIgPSBpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAodmFsdWUgPSB2YWx1ZSAvICgobW9yZSB8fCAwKVtpbmRleF0pLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoYSAvIGIgLyBjIC8gZCAvIGUgLyBmLCAwLCBtb3JlLmxlbmd0aCk7XG4gIH07XG4gIHJldHVybiB2b2lkKDApO1xufTtcbmV4cG9ydHMuZGl2aWRlID0gZGl2aWRlO1xuXG52YXIgbXVsdGlwbHkgPSBmdW5jdGlvbiBtdWx0aXBseShhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBhO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBhICogYjtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gYSAqIGIgKiBjO1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBhICogYiAqIGMgKiBkO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBhICogYiAqIGMgKiBkICogZTtcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gYSAqIGIgKiBjICogZCAqIGUgKiBmO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBtb3JlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCA2KTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcCh2YWx1ZSwgaW5kZXgsIGNvdW50KSB7XG4gICAgICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgICAgIHJlY3VyID0gaW5kZXggPCBjb3VudCA/XG4gICAgICAgICAgKHZhbHVlID0gdmFsdWUgKiAoKG1vcmUgfHwgMClbaW5kZXhdKSwgaW5kZXggPSBpbmMoaW5kZXgpLCBjb3VudCA9IGNvdW50LCBsb29wKSA6XG4gICAgICAgICAgdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZWN1cjtcbiAgICAgIH0pKGEgKiBiICogYyAqIGQgKiBlICogZiwgMCwgbW9yZS5sZW5ndGgpO1xuICB9O1xuICByZXR1cm4gdm9pZCgwKTtcbn07XG5leHBvcnRzLm11bHRpcGx5ID0gbXVsdGlwbHk7XG5cbnZhciBhbmQgPSBmdW5jdGlvbiBhbmQoYSwgYiwgYywgZCwgZSwgZikge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gYTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gYSAmJiBiO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBhICYmIGIgJiYgYztcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gYSAmJiBiICYmIGMgJiYgZDtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gYSAmJiBiICYmIGMgJiYgZCAmJiBlO1xuICAgIGNhc2UgNjpcbiAgICAgIHJldHVybiBhICYmIGIgJiYgYyAmJiBkICYmIGUgJiYgZjtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgNik7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodmFsdWUsIGluZGV4LCBjb3VudCkge1xuICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgICByZWN1ciA9IGluZGV4IDwgY291bnQgP1xuICAgICAgICAgICh2YWx1ZSA9IHZhbHVlICYmICgobW9yZSB8fCAwKVtpbmRleF0pLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoYSAmJiBiICYmIGMgJiYgZCAmJiBlICYmIGYsIDAsIG1vcmUubGVuZ3RoKTtcbiAgfTtcbiAgcmV0dXJuIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5hbmQgPSBhbmQ7XG5cbnZhciBvciA9IGZ1bmN0aW9uIG9yKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHZvaWQoMCk7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGE7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIGEgfHwgYjtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gYSB8fCBiIHx8IGM7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIGEgfHwgYiB8fCBjIHx8IGQ7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIGEgfHwgYiB8fCBjIHx8IGQgfHwgZTtcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gYSB8fCBiIHx8IGMgfHwgZCB8fCBlIHx8IGY7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIG1vcmUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDYpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHZhbHVlLCBpbmRleCwgY291bnQpIHtcbiAgICAgICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICAgICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICAgICAgcmVjdXIgPSBpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAodmFsdWUgPSB2YWx1ZSB8fCAoKG1vcmUgfHwgMClbaW5kZXhdKSwgaW5kZXggPSBpbmMoaW5kZXgpLCBjb3VudCA9IGNvdW50LCBsb29wKSA6XG4gICAgICAgICAgdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZWN1cjtcbiAgICAgIH0pKGEgfHwgYiB8fCBjIHx8IGQgfHwgZSB8fCBmLCAwLCBtb3JlLmxlbmd0aCk7XG4gIH07XG4gIHJldHVybiB2b2lkKDApO1xufTtcbmV4cG9ydHMub3IgPSBvcjtcblxudmFyIHByaW50ID0gZnVuY3Rpb24gcHJpbnQoKSB7XG4gIHZhciBtb3JlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUubG9nLCBtb3JlKTtcbn07XG5leHBvcnRzLnByaW50ID0gcHJpbnRcblxufSkoKSIsInZhciBfbnNfID0gXCJ0cnktd2lzcC5tYWluXCI7XG5tb2R1bGUubmFtZXNwYWNlID0gX25zXztcbnZhciBhY3RpdmluZSA9IHJlcXVpcmUoXCJjb2RlbWlycm9yLWFjdGl2aW5lXCIpO1xudmFyIHBlcnNpc3QgPSByZXF1aXJlKFwiY29kZW1pcnJvci1wZXJzaXN0XCIpO1xucmVxdWlyZShcIndpc3AvZW5naW5lL2Jyb3dzZXJcIik7XG52YXIgcmVzdCA9IChyZXF1aXJlKFwid2lzcC9zZXF1ZW5jZVwiKSkucmVzdDtcbnZhciBjb25zID0gKHJlcXVpcmUoXCJ3aXNwL3NlcXVlbmNlXCIpKS5jb25zO1xudmFyIHZlYyA9IChyZXF1aXJlKFwid2lzcC9zZXF1ZW5jZVwiKSkudmVjO1xudmFyIHN0ciA9IChyZXF1aXJlKFwid2lzcC9ydW50aW1lXCIpKS5zdHI7XG52YXIgcmVhZF8gPSAocmVxdWlyZShcIndpc3AvcmVhZGVyXCIpKS5yZWFkXztcbnZhciBjb21waWxlXyA9IChyZXF1aXJlKFwid2lzcC9jb21waWxlclwiKSkuY29tcGlsZV87O1xuXG5wZXJzaXN0KENvZGVNaXJyb3IpO1xuXG52YXIgdGhyb3R0bGUgPSBmdW5jdGlvbiB0aHJvdHRsZShsYW1iZGEsIG1zKSB7XG4gIHZhciBpZCA9IDA7XG4gIHJldHVybiBmdW5jdGlvbiB0aHJvdHRsZWQoKSB7XG4gICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgY2xlYXJUaW1lb3V0KGlkLCB0aHJvdHRsZWQpO1xuICAgIHJldHVybiBpZCA9IHNldFRpbWVvdXQuYXBwbHkod2luZG93LCB2ZWMoY29ucyhsYW1iZGEsIGNvbnMobXMsIHBhcmFtcykpKSk7XG4gIH07XG59O1xuZXhwb3J0cy50aHJvdHRsZSA9IHRocm90dGxlO1xuXG52YXIgdG9vZ2xlUHJldmlldyA9IGZ1bmN0aW9uIHRvb2dsZVByZXZpZXcoKSB7XG4gIHZhciBvdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKTtcbiAgdmFyIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dFwiKTtcbiAgb3V0cHV0LmhpZGRlbiA9ICEob3V0cHV0LmhpZGRlbik7XG4gIHJldHVybiBpbnB1dC5zdHlsZS53aWR0aCA9IG91dHB1dC5oaWRkZW4gP1xuICAgIFwiMTAwJVwiIDpcbiAgICBcIjUwJVwiO1xufTtcbmV4cG9ydHMudG9vZ2xlUHJldmlldyA9IHRvb2dsZVByZXZpZXc7XG5cbnZhciBfZXJyb3JNYXJrZXJfID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB2aWV3LnRleHRDb250ZW50ID0gXCLil49cIjtcbiAgdmlldy5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcbiAgdmlldy5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcbiAgcmV0dXJuIHZpZXc7XG59KSgpO1xuZXhwb3J0cy5fZXJyb3JNYXJrZXJfID0gX2Vycm9yTWFya2VyXztcblxudmFyIHVwZGF0ZVByZXZpZXcgPSB0aHJvdHRsZShmdW5jdGlvbihlZGl0b3IpIHtcbiAgdmFyIGNvZGUgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgbG9jYWxTdG9yYWdlLmJ1ZmZlciA9IGNvZGU7XG4gIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgZWRpdG9yLmNsZWFyR3V0dGVyKFwiZXJyb3ItZ3V0dGVyXCIpO1xuICAgIHJldHVybiBvdXRwdXQuc2V0VmFsdWUoY29tcGlsZV8ocmVhZF8oY29kZSwgXCJzY3JhdGNoLndpc3BcIikpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBfZXJyb3JNYXJrZXJfLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgIHJldHVybiBlZGl0b3Iuc2V0R3V0dGVyTWFya2VyKGVycm9yLmxpbmUgfHwgMCwgXCJlcnJvci1ndXR0ZXJcIiwgX2Vycm9yTWFya2VyXyk7XG4gIH19KSgpO1xufSwgMjAwKTtcbmV4cG9ydHMudXBkYXRlUHJldmlldyA9IHVwZGF0ZVByZXZpZXc7XG5cbnZhciBpbnB1dCA9IENvZGVNaXJyb3IoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dFwiKSwge1xuICBcImxpbmVOdW1iZXJzXCI6IHRydWUsXG4gIFwibWF0Y2hCcmFja2V0c1wiOiB0cnVlLFxuICBcImVsZWN0cmljQ2hhcnNcIjogdHJ1ZSxcbiAgXCJwZXJzaXN0XCI6IHRydWUsXG4gIFwic3R5bGVBY3RpdmVMaW5lXCI6IHRydWUsXG4gIFwiYXV0b2ZvY3VzXCI6IHRydWUsXG4gIFwidmFsdWVcIjogKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhhbXBsZXNcIikpLmlubmVySFRNTCxcbiAgXCJ0aGVtZVwiOiBcInNvbGFyaXplZCBkYXJrXCIsXG4gIFwibW9kZVwiOiBcImNsb2p1cmVcIixcbiAgXCJhdXRvQ2xlYXJFbXB0eUxpbmVzXCI6IHRydWUsXG4gIFwiZml4ZWRHdXR0ZXJcIjogdHJ1ZSxcbiAgXCJndXR0ZXJzXCI6IFtcImVycm9yLWd1dHRlclwiXSxcbiAgXCJleHRyYUtleXNcIjoge1xuICAgIFwiVGFiXCI6IFwiaW5kZW50U2VsZWN0aW9uXCJcbiAgfSxcbiAgXCJvbkNoYW5nZVwiOiB1cGRhdGVQcmV2aWV3LFxuICBcIm9uR3V0dGVyQ2xpY2tcIjogdG9vZ2xlUHJldmlld1xufSk7XG5leHBvcnRzLmlucHV0ID0gaW5wdXQ7XG5cbmlucHV0Lm9uKFwiY2hhbmdlXCIsIHVwZGF0ZVByZXZpZXcpO1xuXG5pbnB1dC5vbihcImd1dHRlckNsaWNrXCIsIHRvb2dsZVByZXZpZXcpO1xuXG51cGRhdGVQcmV2aWV3KGlucHV0KTtcblxudmFyIG91dHB1dCA9IENvZGVNaXJyb3IoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIiksIHtcbiAgXCJsaW5lTnVtYmVyc1wiOiB0cnVlLFxuICBcImZpeGVkR3V0dGVyXCI6IHRydWUsXG4gIFwibWF0Y2hCcmFja2V0c1wiOiB0cnVlLFxuICBcIm1vZGVcIjogXCJqYXZhc2NyaXB0XCIsXG4gIFwidGhlbWVcIjogXCJzb2xhcml6ZWQgZGFya1wiLFxuICBcInJlYWRPbmx5XCI6IHRydWVcbn0pO1xuZXhwb3J0cy5vdXRwdXQgPSBvdXRwdXRcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYWN0aXZlTGluZSA9IFwibGluZUBhY3RpdmluZVwiXG5cbmZ1bmN0aW9uIG9uQ3Vyc29yQWN0aXZpdHkoZWRpdG9yKSB7XG4gIHZhciBsaW5lID0gZWRpdG9yLmdldExpbmVIYW5kbGUoZWRpdG9yLmdldEN1cnNvcigpLmxpbmUpXG4gIHZhciBhY3RpdmUgPSBlZGl0b3JbYWN0aXZlTGluZV1cbiAgaWYgKGxpbmUgIT0gYWN0aXZlKSB7XG4gICAgZWRpdG9yLnJlbW92ZUxpbmVDbGFzcyhhY3RpdmUsIFwiYmFja2dyb3VuZFwiLCBcImFjdGl2ZWxpbmVcIilcbiAgICBlZGl0b3JbYWN0aXZlTGluZV0gPSBlZGl0b3IuYWRkTGluZUNsYXNzKGxpbmUsIFwiYmFja2dyb3VuZFwiLCBcImFjdGl2ZWxpbmVcIilcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cChlZGl0b3IsIHZhbHVlKSB7XG4gIC8qKlxuICBUYWtlcyBlZGl0b3IgYW5kIGVuYWJsZXMgcGVyc2lzdHMgY2hhbmdlcyB0byB0aGUgYnVmZmVyIGFjcm9zcyB0aGUgc2Vzc2lvbnMuXG4gICoqL1xuICBpZiAodmFsdWUpIHtcbiAgICBlZGl0b3JbYWN0aXZlTGluZV0gPSBlZGl0b3IuYWRkTGluZUNsYXNzKDAsIFwiYmFja2dyb3VuZFwiLCBcImFjdGl2ZWxpbmVcIilcbiAgICBlZGl0b3Iub24oXCJjdXJzb3JBY3Rpdml0eVwiLCBvbkN1cnNvckFjdGl2aXR5KVxuICAgIG9uQ3Vyc29yQWN0aXZpdHkoZWRpdG9yKVxuICB9IGVsc2UgaWYgKGFjdGl2ZUxpbmUgaW4gZWRpdG9yKSB7XG4gICAgZWRpdG9yLnJlbW92ZUxpbmVDbGFzcyhlZGl0b3JbYWN0aXZlTGluZV0sIFwiYmFja2dyb3VuZFwiLCBcImFjdGl2ZWxpbmVcIilcbiAgICBkZWxldGUgZWRpdG9yW2FjdGl2ZUxpbmVdXG4gICAgZWRpdG9yLm9mZihcImN1cnNvckFjdGl2aXR5XCIsIG9uQ3Vyc29yQWN0aXZpdHkpXG4gIH1cbn1cblxuZnVuY3Rpb24gcGx1Z2luKENvZGVNaXJyb3IpIHtcbiAgQ29kZU1pcnJvci5kZWZpbmVPcHRpb24oXCJhY3RpdmVMaW5lXCIsIGZhbHNlLCBzZXR1cClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwbHVnaW5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBvbkNoYW5nZShlZGl0b3IpIHtcbiAgbG9jYWxTdG9yYWdlW3dpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiKVswXV0gPSBlZGl0b3IuZ2V0VmFsdWUoKVxufVxuXG5mdW5jdGlvbiBzZXR1cChlZGl0b3IsIHZhbHVlKSB7XG4gIC8qKlxuICBUYWtlcyBlZGl0b3IgYW5kIGVuYWJsZXMgcGVyc2lzdHMgY2hhbmdlcyB0byB0aGUgYnVmZmVyIGFjcm9zcyB0aGUgc2Vzc2lvbnMuXG4gICoqL1xuICBpZiAodmFsdWUpIHtcbiAgICB2YXIgYWRkcmVzcyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiKVswXVxuICAgIHZhciBwZXJzaXN0ZWQgPSBsb2NhbFN0b3JhZ2VbYWRkcmVzc10gfHwgZWRpdG9yLmdldFZhbHVlKClcbiAgICBlZGl0b3Iuc2V0VmFsdWUocGVyc2lzdGVkKVxuICAgIGVkaXRvci5vbihcImNoYW5nZVwiLCBvbkNoYW5nZSlcbiAgfSBlbHNlIHtcbiAgICBlZGl0b3Iub2ZmKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKVxuICB9XG59XG5cbmZ1bmN0aW9uIHBsdWdpbihDb2RlTWlycm9yKSB7XG4gIENvZGVNaXJyb3IuZGVmaW5lT3B0aW9uKFwicGVyc2lzdFwiLCBmYWxzZSwgc2V0dXApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGx1Z2luXG4iLCJ2YXIgX25zXyA9IFwid2lzcC5zZXF1ZW5jZVwiO1xubW9kdWxlLm5hbWVzcGFjZSA9IF9uc187XG52YXIgaXNOaWwgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNOaWw7XG52YXIgaXNWZWN0b3IgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNWZWN0b3I7XG52YXIgaXNGbiA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc0ZuO1xudmFyIGlzTnVtYmVyID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmlzTnVtYmVyO1xudmFyIGlzU3RyaW5nID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmlzU3RyaW5nO1xudmFyIGlzRGljdGlvbmFyeSA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc0RpY3Rpb25hcnk7XG52YXIga2V5VmFsdWVzID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmtleVZhbHVlcztcbnZhciBzdHIgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuc3RyO1xudmFyIGRlYyA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5kZWM7XG52YXIgaW5jID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmluYztcbnZhciBtZXJnZSA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5tZXJnZTs7XG5cbnZhciBMaXN0ID0gZnVuY3Rpb24gTGlzdChoZWFkLCB0YWlsKSB7XG4gIHRoaXMuaGVhZCA9IGhlYWQ7XG4gIHRoaXMudGFpbCA9IHRhaWwgfHwgKGxpc3QoKSk7XG4gIHRoaXMubGVuZ3RoID0gaW5jKGNvdW50KHRoaXMudGFpbCkpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkxpc3QucHJvdG90eXBlLmxlbmd0aCA9IDA7XG5cbkxpc3QudHlwZSA9IFwid2lzcC5saXN0XCI7XG5cbkxpc3QucHJvdG90eXBlLnR5cGUgPSBMaXN0LnR5cGU7XG5cbkxpc3QucHJvdG90eXBlLnRhaWwgPSBPYmplY3QuY3JlYXRlKExpc3QucHJvdG90eXBlKTtcblxuTGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHJlc3VsdCwgbGlzdCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkobGlzdCkgP1xuICAgICAgXCJcIiArIFwiKFwiICsgKHJlc3VsdC5zdWJzdHIoMSkpICsgXCIpXCIgOlxuICAgICAgKHJlc3VsdCA9IFwiXCIgKyByZXN1bHQgKyBcIiBcIiArIChpc1ZlY3RvcihmaXJzdChsaXN0KSkgP1xuICAgICAgICBcIlwiICsgXCJbXCIgKyAoZmlyc3QobGlzdCkuam9pbihcIiBcIikpICsgXCJdXCIgOlxuICAgICAgaXNOaWwoZmlyc3QobGlzdCkpID9cbiAgICAgICAgXCJuaWxcIiA6XG4gICAgICBpc1N0cmluZyhmaXJzdChsaXN0KSkgP1xuICAgICAgICBKU09OLnN0cmluZ2lmeShmaXJzdChsaXN0KSkgOlxuICAgICAgaXNOdW1iZXIoZmlyc3QobGlzdCkpID9cbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZmlyc3QobGlzdCkpIDpcbiAgICAgICAgZmlyc3QobGlzdCkpLCBsaXN0ID0gcmVzdChsaXN0KSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFwiXCIsIHRoaXMpO1xufTtcblxudmFyIGxhenlTZXFWYWx1ZSA9IGZ1bmN0aW9uIGxhenlTZXFWYWx1ZShsYXp5U2VxKSB7XG4gIHJldHVybiAhKGxhenlTZXEucmVhbGl6ZWQpID9cbiAgICAobGF6eVNlcS5yZWFsaXplZCA9IHRydWUpICYmIChsYXp5U2VxLnggPSBsYXp5U2VxLngoKSkgOlxuICAgIGxhenlTZXEueDtcbn07XG5cbnZhciBMYXp5U2VxID0gZnVuY3Rpb24gTGF6eVNlcShyZWFsaXplZCwgeCkge1xuICB0aGlzLnJlYWxpemVkID0gcmVhbGl6ZWQgfHwgZmFsc2U7XG4gIHRoaXMueCA9IHg7XG4gIHJldHVybiB0aGlzO1xufTtcblxuTGF6eVNlcS50eXBlID0gXCJ3aXNwLmxhenkuc2VxXCI7XG5cbkxhenlTZXEucHJvdG90eXBlLnR5cGUgPSBMYXp5U2VxLnR5cGU7XG5cbnZhciBsYXp5U2VxID0gZnVuY3Rpb24gbGF6eVNlcShyZWFsaXplZCwgYm9keSkge1xuICByZXR1cm4gbmV3IExhenlTZXEocmVhbGl6ZWQsIGJvZHkpO1xufTtcbmV4cG9ydHMubGF6eVNlcSA9IGxhenlTZXE7XG5cbnZhciBpc0xhenlTZXEgPSBmdW5jdGlvbiBpc0xhenlTZXEodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIChMYXp5U2VxLnR5cGUgPT09IHZhbHVlLnR5cGUpO1xufTtcbmV4cG9ydHMuaXNMYXp5U2VxID0gaXNMYXp5U2VxO1xuXG51bmRlZmluZWQ7XG5cbnZhciBpc0xpc3QgPSBmdW5jdGlvbiBpc0xpc3QodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIChMaXN0LnR5cGUgPT09IHZhbHVlLnR5cGUpO1xufTtcbmV4cG9ydHMuaXNMaXN0ID0gaXNMaXN0O1xuXG52YXIgbGlzdCA9IGZ1bmN0aW9uIGxpc3QoKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAwID9cbiAgICBPYmplY3QuY3JlYXRlKExpc3QucHJvdG90eXBlKSA6XG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5yZWR1Y2VSaWdodChmdW5jdGlvbih0YWlsLCBoZWFkKSB7XG4gICAgICByZXR1cm4gY29ucyhoZWFkLCB0YWlsKTtcbiAgICB9LCBsaXN0KCkpO1xufTtcbmV4cG9ydHMubGlzdCA9IGxpc3Q7XG5cbnZhciBjb25zID0gZnVuY3Rpb24gY29ucyhoZWFkLCB0YWlsKSB7XG4gIHJldHVybiBuZXcgTGlzdChoZWFkLCB0YWlsKTtcbn07XG5leHBvcnRzLmNvbnMgPSBjb25zO1xuXG52YXIgcmV2ZXJzZUxpc3QgPSBmdW5jdGlvbiByZXZlcnNlTGlzdChzZXF1ZW5jZSkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoaXRlbXMsIHNvdXJjZSkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkoc291cmNlKSA/XG4gICAgICBsaXN0LmFwcGx5KGxpc3QsIGl0ZW1zKSA6XG4gICAgICAoaXRlbXMgPSBbZmlyc3Qoc291cmNlKV0uY29uY2F0KGl0ZW1zKSwgc291cmNlID0gcmVzdChzb3VyY2UpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoW10sIHNlcXVlbmNlKTtcbn07XG5cbnZhciBpc1NlcXVlbnRpYWwgPSBmdW5jdGlvbiBpc1NlcXVlbnRpYWwoeCkge1xuICByZXR1cm4gKGlzTGlzdCh4KSkgfHwgKGlzVmVjdG9yKHgpKSB8fCAoaXNMYXp5U2VxKHgpKSB8fCAoaXNEaWN0aW9uYXJ5KHgpKSB8fCAoaXNTdHJpbmcoeCkpO1xufTtcbmV4cG9ydHMuaXNTZXF1ZW50aWFsID0gaXNTZXF1ZW50aWFsO1xuXG52YXIgcmV2ZXJzZSA9IGZ1bmN0aW9uIHJldmVyc2Uoc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGlzTGlzdChzZXF1ZW5jZSkgP1xuICAgIHJldmVyc2VMaXN0KHNlcXVlbmNlKSA6XG4gIGlzVmVjdG9yKHNlcXVlbmNlKSA/XG4gICAgc2VxdWVuY2UucmV2ZXJzZSgpIDpcbiAgaXNOaWwoc2VxdWVuY2UpID9cbiAgICBsaXN0KCkgOlxuICBcImVsc2VcIiA/XG4gICAgcmV2ZXJzZShzZXEoc2VxdWVuY2UpKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLnJldmVyc2UgPSByZXZlcnNlO1xuXG52YXIgbWFwID0gZnVuY3Rpb24gbWFwKGYsIHNlcXVlbmNlKSB7XG4gIHJldHVybiBpc1ZlY3RvcihzZXF1ZW5jZSkgP1xuICAgIHNlcXVlbmNlLm1hcChmKSA6XG4gIGlzTGlzdChzZXF1ZW5jZSkgP1xuICAgIG1hcExpc3QoZiwgc2VxdWVuY2UpIDpcbiAgaXNOaWwoc2VxdWVuY2UpID9cbiAgICBsaXN0KCkgOlxuICBcImVsc2VcIiA/XG4gICAgbWFwKGYsIHNlcShzZXF1ZW5jZSkpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMubWFwID0gbWFwO1xuXG52YXIgbWFwTGlzdCA9IGZ1bmN0aW9uIG1hcExpc3QoZiwgc2VxdWVuY2UpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHJlc3VsdCwgaXRlbXMpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBpc0VtcHR5KGl0ZW1zKSA/XG4gICAgICByZXZlcnNlKHJlc3VsdCkgOlxuICAgICAgKHJlc3VsdCA9IGNvbnMoZihmaXJzdChpdGVtcykpLCByZXN1bHQpLCBpdGVtcyA9IHJlc3QoaXRlbXMpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkobGlzdCgpLCBzZXF1ZW5jZSk7XG59O1xuXG52YXIgZmlsdGVyID0gZnVuY3Rpb24gZmlsdGVyKGlzRiwgc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGlzVmVjdG9yKHNlcXVlbmNlKSA/XG4gICAgc2VxdWVuY2UuZmlsdGVyKGlzRikgOlxuICBpc0xpc3Qoc2VxdWVuY2UpID9cbiAgICBmaWx0ZXJMaXN0KGlzRiwgc2VxdWVuY2UpIDpcbiAgaXNOaWwoc2VxdWVuY2UpID9cbiAgICBsaXN0KCkgOlxuICBcImVsc2VcIiA/XG4gICAgZmlsdGVyKGlzRiwgc2VxKHNlcXVlbmNlKSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5maWx0ZXIgPSBmaWx0ZXI7XG5cbnZhciBmaWx0ZXJMaXN0ID0gZnVuY3Rpb24gZmlsdGVyTGlzdChpc0YsIHNlcXVlbmNlKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChyZXN1bHQsIGl0ZW1zKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShpdGVtcykgP1xuICAgICAgcmV2ZXJzZShyZXN1bHQpIDpcbiAgICAgIChyZXN1bHQgPSBpc0YoZmlyc3QoaXRlbXMpKSA/XG4gICAgICAgIGNvbnMoZmlyc3QoaXRlbXMpLCByZXN1bHQpIDpcbiAgICAgICAgcmVzdWx0LCBpdGVtcyA9IHJlc3QoaXRlbXMpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkobGlzdCgpLCBzZXF1ZW5jZSk7XG59O1xuXG52YXIgcmVkdWNlID0gZnVuY3Rpb24gcmVkdWNlKGYpIHtcbiAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhhc0luaXRpYWwgPSBjb3VudChwYXJhbXMpID49IDI7XG4gICAgdmFyIGluaXRpYWwgPSBoYXNJbml0aWFsID9cbiAgICAgIGZpcnN0KHBhcmFtcykgOlxuICAgICAgdm9pZCgwKTtcbiAgICB2YXIgc2VxdWVuY2UgPSBoYXNJbml0aWFsID9cbiAgICAgIHNlY29uZChwYXJhbXMpIDpcbiAgICAgIGZpcnN0KHBhcmFtcyk7XG4gICAgcmV0dXJuIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgICBpbml0aWFsIDpcbiAgICBpc1ZlY3RvcihzZXF1ZW5jZSkgP1xuICAgICAgaGFzSW5pdGlhbCA/XG4gICAgICAgIHNlcXVlbmNlLnJlZHVjZShmLCBpbml0aWFsKSA6XG4gICAgICAgIHNlcXVlbmNlLnJlZHVjZShmKSA6XG4gICAgaXNMaXN0KHNlcXVlbmNlKSA/XG4gICAgICBoYXNJbml0aWFsID9cbiAgICAgICAgcmVkdWNlTGlzdChmLCBpbml0aWFsLCBzZXF1ZW5jZSkgOlxuICAgICAgICByZWR1Y2VMaXN0KGYsIGZpcnN0KHNlcXVlbmNlKSwgcmVzdChzZXF1ZW5jZSkpIDpcbiAgICBcImVsc2VcIiA/XG4gICAgICByZWR1Y2UoZiwgaW5pdGlhbCwgc2VxKHNlcXVlbmNlKSkgOlxuICAgICAgdm9pZCgwKTtcbiAgfSkoKTtcbn07XG5leHBvcnRzLnJlZHVjZSA9IHJlZHVjZTtcblxudmFyIHJlZHVjZUxpc3QgPSBmdW5jdGlvbiByZWR1Y2VMaXN0KGYsIGluaXRpYWwsIHNlcXVlbmNlKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChyZXN1bHQsIGl0ZW1zKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShpdGVtcykgP1xuICAgICAgcmVzdWx0IDpcbiAgICAgIChyZXN1bHQgPSBmKHJlc3VsdCwgZmlyc3QoaXRlbXMpKSwgaXRlbXMgPSByZXN0KGl0ZW1zKSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKGluaXRpYWwsIHNlcXVlbmNlKTtcbn07XG5cbnZhciBjb3VudCA9IGZ1bmN0aW9uIGNvdW50KHNlcXVlbmNlKSB7XG4gIHJldHVybiBpc05pbChzZXF1ZW5jZSkgP1xuICAgIDAgOlxuICAgIChzZXEoc2VxdWVuY2UpKS5sZW5ndGg7XG59O1xuZXhwb3J0cy5jb3VudCA9IGNvdW50O1xuXG52YXIgaXNFbXB0eSA9IGZ1bmN0aW9uIGlzRW1wdHkoc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGNvdW50KHNlcXVlbmNlKSA9PT0gMDtcbn07XG5leHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xuXG52YXIgZmlyc3QgPSBmdW5jdGlvbiBmaXJzdChzZXF1ZW5jZSkge1xuICByZXR1cm4gaXNOaWwoc2VxdWVuY2UpID9cbiAgICB2b2lkKDApIDpcbiAgaXNMaXN0KHNlcXVlbmNlKSA/XG4gICAgc2VxdWVuY2UuaGVhZCA6XG4gIChpc1ZlY3RvcihzZXF1ZW5jZSkpIHx8IChpc1N0cmluZyhzZXF1ZW5jZSkpID9cbiAgICAoc2VxdWVuY2UgfHwgMClbMF0gOlxuICBpc0xhenlTZXEoc2VxdWVuY2UpID9cbiAgICBmaXJzdChsYXp5U2VxVmFsdWUoc2VxdWVuY2UpKSA6XG4gIFwiZWxzZVwiID9cbiAgICBmaXJzdChzZXEoc2VxdWVuY2UpKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmZpcnN0ID0gZmlyc3Q7XG5cbnZhciBzZWNvbmQgPSBmdW5jdGlvbiBzZWNvbmQoc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgdm9pZCgwKSA6XG4gIGlzTGlzdChzZXF1ZW5jZSkgP1xuICAgIGZpcnN0KHJlc3Qoc2VxdWVuY2UpKSA6XG4gIChpc1ZlY3RvcihzZXF1ZW5jZSkpIHx8IChpc1N0cmluZyhzZXF1ZW5jZSkpID9cbiAgICAoc2VxdWVuY2UgfHwgMClbMV0gOlxuICBpc0xhenlTZXEoc2VxdWVuY2UpID9cbiAgICBzZWNvbmQobGF6eVNlcVZhbHVlKHNlcXVlbmNlKSkgOlxuICBcImVsc2VcIiA/XG4gICAgZmlyc3QocmVzdChzZXEoc2VxdWVuY2UpKSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5zZWNvbmQgPSBzZWNvbmQ7XG5cbnZhciB0aGlyZCA9IGZ1bmN0aW9uIHRoaXJkKHNlcXVlbmNlKSB7XG4gIHJldHVybiBpc05pbChzZXF1ZW5jZSkgP1xuICAgIHZvaWQoMCkgOlxuICBpc0xpc3Qoc2VxdWVuY2UpID9cbiAgICBmaXJzdChyZXN0KHJlc3Qoc2VxdWVuY2UpKSkgOlxuICAoaXNWZWN0b3Ioc2VxdWVuY2UpKSB8fCAoaXNTdHJpbmcoc2VxdWVuY2UpKSA/XG4gICAgKHNlcXVlbmNlIHx8IDApWzJdIDpcbiAgaXNMYXp5U2VxKHNlcXVlbmNlKSA/XG4gICAgdGhpcmQobGF6eVNlcVZhbHVlKHNlcXVlbmNlKSkgOlxuICBcImVsc2VcIiA/XG4gICAgc2Vjb25kKHJlc3Qoc2VxKHNlcXVlbmNlKSkpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMudGhpcmQgPSB0aGlyZDtcblxudmFyIHJlc3QgPSBmdW5jdGlvbiByZXN0KHNlcXVlbmNlKSB7XG4gIHJldHVybiBpc05pbChzZXF1ZW5jZSkgP1xuICAgIGxpc3QoKSA6XG4gIGlzTGlzdChzZXF1ZW5jZSkgP1xuICAgIHNlcXVlbmNlLnRhaWwgOlxuICAoaXNWZWN0b3Ioc2VxdWVuY2UpKSB8fCAoaXNTdHJpbmcoc2VxdWVuY2UpKSA/XG4gICAgc2VxdWVuY2Uuc2xpY2UoMSkgOlxuICBpc0xhenlTZXEoc2VxdWVuY2UpID9cbiAgICByZXN0KGxhenlTZXFWYWx1ZShzZXF1ZW5jZSkpIDpcbiAgXCJlbHNlXCIgP1xuICAgIHJlc3Qoc2VxKHNlcXVlbmNlKSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5yZXN0ID0gcmVzdDtcblxudmFyIGxhc3RPZkxpc3QgPSBmdW5jdGlvbiBsYXN0T2ZMaXN0KGxpc3QpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGl0ZW0sIGl0ZW1zKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShpdGVtcykgP1xuICAgICAgaXRlbSA6XG4gICAgICAoaXRlbSA9IGZpcnN0KGl0ZW1zKSwgaXRlbXMgPSByZXN0KGl0ZW1zKSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKGZpcnN0KGxpc3QpLCByZXN0KGxpc3QpKTtcbn07XG5cbnZhciBsYXN0ID0gZnVuY3Rpb24gbGFzdChzZXF1ZW5jZSkge1xuICByZXR1cm4gKGlzVmVjdG9yKHNlcXVlbmNlKSkgfHwgKGlzU3RyaW5nKHNlcXVlbmNlKSkgP1xuICAgIChzZXF1ZW5jZSB8fCAwKVtkZWMoY291bnQoc2VxdWVuY2UpKV0gOlxuICBpc0xpc3Qoc2VxdWVuY2UpID9cbiAgICBsYXN0T2ZMaXN0KHNlcXVlbmNlKSA6XG4gIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgdm9pZCgwKSA6XG4gIGlzTGF6eVNlcShzZXF1ZW5jZSkgP1xuICAgIGxhc3QobGF6eVNlcVZhbHVlKHNlcXVlbmNlKSkgOlxuICBcImVsc2VcIiA/XG4gICAgbGFzdChzZXEoc2VxdWVuY2UpKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmxhc3QgPSBsYXN0O1xuXG52YXIgYnV0bGFzdCA9IGZ1bmN0aW9uIGJ1dGxhc3Qoc2VxdWVuY2UpIHtcbiAgdmFyIGl0ZW1zID0gaXNOaWwoc2VxdWVuY2UpID9cbiAgICB2b2lkKDApIDpcbiAgaXNTdHJpbmcoc2VxdWVuY2UpID9cbiAgICBzdWJzKHNlcXVlbmNlLCAwLCBkZWMoY291bnQoc2VxdWVuY2UpKSkgOlxuICBpc1ZlY3RvcihzZXF1ZW5jZSkgP1xuICAgIHNlcXVlbmNlLnNsaWNlKDAsIGRlYyhjb3VudChzZXF1ZW5jZSkpKSA6XG4gIGlzTGlzdChzZXF1ZW5jZSkgP1xuICAgIGxpc3QuYXBwbHkobGlzdCwgYnV0bGFzdCh2ZWMoc2VxdWVuY2UpKSkgOlxuICBpc0xhenlTZXEoc2VxdWVuY2UpID9cbiAgICBidXRsYXN0KGxhenlTZXFWYWx1ZShzZXF1ZW5jZSkpIDpcbiAgXCJlbHNlXCIgP1xuICAgIGJ1dGxhc3Qoc2VxKHNlcXVlbmNlKSkgOlxuICAgIHZvaWQoMCk7XG4gIHJldHVybiAhKChpc05pbChpdGVtcykpIHx8IChpc0VtcHR5KGl0ZW1zKSkpID9cbiAgICBpdGVtcyA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmJ1dGxhc3QgPSBidXRsYXN0O1xuXG52YXIgdGFrZSA9IGZ1bmN0aW9uIHRha2Uobiwgc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgbGlzdCgpIDpcbiAgaXNWZWN0b3Ioc2VxdWVuY2UpID9cbiAgICB0YWtlRnJvbVZlY3RvcihuLCBzZXF1ZW5jZSkgOlxuICBpc0xpc3Qoc2VxdWVuY2UpID9cbiAgICB0YWtlRnJvbUxpc3Qobiwgc2VxdWVuY2UpIDpcbiAgaXNMYXp5U2VxKHNlcXVlbmNlKSA/XG4gICAgdGFrZShuLCBsYXp5U2VxVmFsdWUoc2VxdWVuY2UpKSA6XG4gIFwiZWxzZVwiID9cbiAgICB0YWtlKG4sIHNlcShzZXF1ZW5jZSkpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMudGFrZSA9IHRha2U7XG5cbnZhciB0YWtlVmVjdG9yV2hpbGUgPSBmdW5jdGlvbiB0YWtlVmVjdG9yV2hpbGUocHJlZGljYXRlLCB2ZWN0b3IpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHJlc3VsdCwgdGFpbCwgaGVhZCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9ICghKGlzRW1wdHkodGFpbCkpKSAmJiAocHJlZGljYXRlKGhlYWQpKSA/XG4gICAgICAocmVzdWx0ID0gY29uaihyZXN1bHQsIGhlYWQpLCB0YWlsID0gcmVzdCh0YWlsKSwgaGVhZCA9IGZpcnN0KHRhaWwpLCBsb29wKSA6XG4gICAgICByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFtdLCB2ZWN0b3IsIGZpcnN0KHZlY3RvcikpO1xufTtcblxudmFyIHRha2VMaXN0V2hpbGUgPSBmdW5jdGlvbiB0YWtlTGlzdFdoaWxlKHByZWRpY2F0ZSwgaXRlbXMpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHJlc3VsdCwgdGFpbCwgaGVhZCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9ICghKGlzRW1wdHkodGFpbCkpKSAmJiAoaXNQcmVkaWNhdGUoaGVhZCkpID9cbiAgICAgIChyZXN1bHQgPSBjb25qKHJlc3VsdCwgaGVhZCksIHRhaWwgPSByZXN0KHRhaWwpLCBoZWFkID0gZmlyc3QodGFpbCksIGxvb3ApIDpcbiAgICAgIGxpc3QuYXBwbHkobGlzdCwgcmVzdWx0KTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoW10sIGl0ZW1zLCBmaXJzdChpdGVtcykpO1xufTtcblxudmFyIHRha2VXaGlsZSA9IGZ1bmN0aW9uIHRha2VXaGlsZShwcmVkaWNhdGUsIHNlcXVlbmNlKSB7XG4gIHJldHVybiBpc05pbChzZXF1ZW5jZSkgP1xuICAgIGxpc3QoKSA6XG4gIGlzVmVjdG9yKHNlcXVlbmNlKSA/XG4gICAgdGFrZVZlY3RvcldoaWxlKHByZWRpY2F0ZSwgc2VxdWVuY2UpIDpcbiAgaXNMaXN0KHNlcXVlbmNlKSA/XG4gICAgdGFrZVZlY3RvcldoaWxlKHByZWRpY2F0ZSwgc2VxdWVuY2UpIDpcbiAgXCJlbHNlXCIgP1xuICAgIHRha2VXaGlsZShwcmVkaWNhdGUsIGxhenlTZXFWYWx1ZShzZXF1ZW5jZSkpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMudGFrZVdoaWxlID0gdGFrZVdoaWxlO1xuXG52YXIgdGFrZUZyb21WZWN0b3IgPSBmdW5jdGlvbiB0YWtlRnJvbVZlY3RvcihuLCB2ZWN0b3IpIHtcbiAgcmV0dXJuIHZlY3Rvci5zbGljZSgwLCBuKTtcbn07XG5cbnZhciB0YWtlRnJvbUxpc3QgPSBmdW5jdGlvbiB0YWtlRnJvbUxpc3Qobiwgc2VxdWVuY2UpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHRha2VuLCBpdGVtcywgbikge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IChuID09PSAwKSB8fCAoaXNFbXB0eShpdGVtcykpID9cbiAgICAgIHJldmVyc2UodGFrZW4pIDpcbiAgICAgICh0YWtlbiA9IGNvbnMoZmlyc3QoaXRlbXMpLCB0YWtlbiksIGl0ZW1zID0gcmVzdChpdGVtcyksIG4gPSBkZWMobiksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShsaXN0KCksIHNlcXVlbmNlLCBuKTtcbn07XG5cbnZhciBkcm9wRnJvbUxpc3QgPSBmdW5jdGlvbiBkcm9wRnJvbUxpc3Qobiwgc2VxdWVuY2UpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGxlZnQsIGl0ZW1zKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gKGxlZnQgPCAxKSB8fCAoaXNFbXB0eShpdGVtcykpID9cbiAgICAgIGl0ZW1zIDpcbiAgICAgIChsZWZ0ID0gZGVjKGxlZnQpLCBpdGVtcyA9IHJlc3QoaXRlbXMpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkobiwgc2VxdWVuY2UpO1xufTtcblxudmFyIGRyb3AgPSBmdW5jdGlvbiBkcm9wKG4sIHNlcXVlbmNlKSB7XG4gIHJldHVybiBuIDw9IDAgP1xuICAgIHNlcXVlbmNlIDpcbiAgaXNTdHJpbmcoc2VxdWVuY2UpID9cbiAgICBzZXF1ZW5jZS5zdWJzdHIobikgOlxuICBpc1ZlY3RvcihzZXF1ZW5jZSkgP1xuICAgIHNlcXVlbmNlLnNsaWNlKG4pIDpcbiAgaXNMaXN0KHNlcXVlbmNlKSA/XG4gICAgZHJvcEZyb21MaXN0KG4sIHNlcXVlbmNlKSA6XG4gIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgbGlzdCgpIDpcbiAgaXNMYXp5U2VxKHNlcXVlbmNlKSA/XG4gICAgZHJvcChuLCBsYXp5U2VxVmFsdWUoc2VxdWVuY2UpKSA6XG4gIFwiZWxzZVwiID9cbiAgICBkcm9wKG4sIHNlcShzZXF1ZW5jZSkpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuZHJvcCA9IGRyb3A7XG5cbnZhciBjb25qTGlzdCA9IGZ1bmN0aW9uIGNvbmpMaXN0KHNlcXVlbmNlLCBpdGVtcykge1xuICByZXR1cm4gcmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwgaXRlbSkge1xuICAgIHJldHVybiBjb25zKGl0ZW0sIHJlc3VsdCk7XG4gIH0sIHNlcXVlbmNlLCBpdGVtcyk7XG59O1xuXG52YXIgY29uaiA9IGZ1bmN0aW9uIGNvbmooc2VxdWVuY2UpIHtcbiAgdmFyIGl0ZW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgcmV0dXJuIGlzVmVjdG9yKHNlcXVlbmNlKSA/XG4gICAgc2VxdWVuY2UuY29uY2F0KGl0ZW1zKSA6XG4gIGlzU3RyaW5nKHNlcXVlbmNlKSA/XG4gICAgXCJcIiArIHNlcXVlbmNlICsgKHN0ci5hcHBseShzdHIsIGl0ZW1zKSkgOlxuICBpc05pbChzZXF1ZW5jZSkgP1xuICAgIGxpc3QuYXBwbHkobGlzdCwgcmV2ZXJzZShpdGVtcykpIDpcbiAgKGlzTGlzdChzZXF1ZW5jZSkpIHx8IChpc0xhenlTZXEoKSkgP1xuICAgIGNvbmpMaXN0KHNlcXVlbmNlLCBpdGVtcykgOlxuICBpc0RpY3Rpb25hcnkoc2VxdWVuY2UpID9cbiAgICBtZXJnZShzZXF1ZW5jZSwgbWVyZ2UuYXBwbHkobWVyZ2UsIGl0ZW1zKSkgOlxuICBcImVsc2VcIiA/XG4gICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBUeXBlRXJyb3IoXCJcIiArIFwiVHlwZSBjYW4ndCBiZSBjb25qb2luZWQgXCIgKyBzZXF1ZW5jZSk7IH0pKCkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5jb25qID0gY29uajtcblxudmFyIGNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCgpIHtcbiAgdmFyIHNlcXVlbmNlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiByZXZlcnNlKHJlZHVjZShmdW5jdGlvbihyZXN1bHQsIHNlcXVlbmNlKSB7XG4gICAgcmV0dXJuIHJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGl0ZW0pIHtcbiAgICAgIHJldHVybiBjb25zKGl0ZW0sIHJlc3VsdCk7XG4gICAgfSwgcmVzdWx0LCBzZXEoc2VxdWVuY2UpKTtcbiAgfSwgbGlzdCgpLCBzZXF1ZW5jZXMpKTtcbn07XG5leHBvcnRzLmNvbmNhdCA9IGNvbmNhdDtcblxudmFyIHNlcSA9IGZ1bmN0aW9uIHNlcShzZXF1ZW5jZSkge1xuICByZXR1cm4gaXNOaWwoc2VxdWVuY2UpID9cbiAgICB2b2lkKDApIDpcbiAgKGlzVmVjdG9yKHNlcXVlbmNlKSkgfHwgKGlzTGlzdChzZXF1ZW5jZSkpIHx8IChpc0xhenlTZXEoc2VxdWVuY2UpKSA/XG4gICAgc2VxdWVuY2UgOlxuICBpc1N0cmluZyhzZXF1ZW5jZSkgP1xuICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlcXVlbmNlKSA6XG4gIGlzRGljdGlvbmFyeShzZXF1ZW5jZSkgP1xuICAgIGtleVZhbHVlcyhzZXF1ZW5jZSkgOlxuICBcImRlZmF1bHRcIiA/XG4gICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBUeXBlRXJyb3IoXCJcIiArIFwiQ2FuIG5vdCBzZXEgXCIgKyBzZXF1ZW5jZSk7IH0pKCkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5zZXEgPSBzZXE7XG5cbnZhciBpc1NlcSA9IGZ1bmN0aW9uIGlzU2VxKHNlcXVlbmNlKSB7XG4gIHJldHVybiAoaXNMaXN0KHNlcXVlbmNlKSkgfHwgKGlzTGF6eVNlcShzZXF1ZW5jZSkpO1xufTtcbmV4cG9ydHMuaXNTZXEgPSBpc1NlcTtcblxudmFyIGxpc3RUb1ZlY3RvciA9IGZ1bmN0aW9uIGxpc3RUb1ZlY3Rvcihzb3VyY2UpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHJlc3VsdCwgbGlzdCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkobGlzdCkgP1xuICAgICAgcmVzdWx0IDpcbiAgICAgIChyZXN1bHQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGZpcnN0KGxpc3QpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pKCksIGxpc3QgPSByZXN0KGxpc3QpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoW10sIHNvdXJjZSk7XG59O1xuXG52YXIgdmVjID0gZnVuY3Rpb24gdmVjKHNlcXVlbmNlKSB7XG4gIHJldHVybiBpc05pbChzZXF1ZW5jZSkgP1xuICAgIFtdIDpcbiAgaXNWZWN0b3Ioc2VxdWVuY2UpID9cbiAgICBzZXF1ZW5jZSA6XG4gIGlzTGlzdChzZXF1ZW5jZSkgP1xuICAgIGxpc3RUb1ZlY3RvcihzZXF1ZW5jZSkgOlxuICBcImVsc2VcIiA/XG4gICAgdmVjKHNlcShzZXF1ZW5jZSkpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMudmVjID0gdmVjO1xuXG52YXIgc29ydCA9IGZ1bmN0aW9uIHNvcnQoZiwgaXRlbXMpIHtcbiAgdmFyIGhhc0NvbXBhcmF0b3IgPSBpc0ZuKGYpO1xuICB2YXIgaXRlbXMgPSAoIShoYXNDb21wYXJhdG9yKSkgJiYgKGlzTmlsKGl0ZW1zKSkgP1xuICAgIGYgOlxuICAgIGl0ZW1zO1xuICB2YXIgY29tcGFyZSA9IGhhc0NvbXBhcmF0b3IgP1xuICAgIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBmKGEsIGIpID9cbiAgICAgICAgMCA6XG4gICAgICAgIDE7XG4gICAgfSA6XG4gICAgdm9pZCgwKTtcbiAgcmV0dXJuIGlzTmlsKGl0ZW1zKSA/XG4gICAgbGlzdCgpIDpcbiAgaXNWZWN0b3IoaXRlbXMpID9cbiAgICBpdGVtcy5zb3J0KGNvbXBhcmUpIDpcbiAgaXNMaXN0KGl0ZW1zKSA/XG4gICAgbGlzdC5hcHBseShsaXN0LCB2ZWMoaXRlbXMpLnNvcnQoY29tcGFyZSkpIDpcbiAgaXNEaWN0aW9uYXJ5KGl0ZW1zKSA/XG4gICAgc2VxKGl0ZW1zKS5zb3J0KGNvbXBhcmUpIDpcbiAgXCJlbHNlXCIgP1xuICAgIHNvcnQoZiwgc2VxKGl0ZW1zKSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5zb3J0ID0gc29ydDtcblxudmFyIHJlcGVhdCA9IGZ1bmN0aW9uIHJlcGVhdChuLCB4KSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChuLCByZXN1bHQpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBuIDw9IDAgP1xuICAgICAgcmVzdWx0IDpcbiAgICAgIChuID0gZGVjKG4pLCByZXN1bHQgPSBjb25qKHJlc3VsdCwgeCksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShuLCBbXSk7XG59O1xuZXhwb3J0cy5yZXBlYXQgPSByZXBlYXRcbiIsInZhciBfbnNfID0gXCJ3aXNwLnJlYWRlclwiO1xubW9kdWxlLm5hbWVzcGFjZSA9IF9uc187XG5tb2R1bGUuZGVzY3JpcHRpb24gPSBcIlJlYWRlciBtb2R1bGUgcHJvdmlkZXMgZnVuY3Rpb25zIGZvciByZWFkaW5nIHRleHQgaW5wdXRcXG4gIGFzIHdpc3AgZGF0YSBzdHJ1Y3R1cmVzXCI7XG52YXIgbGlzdCA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkubGlzdDtcbnZhciBpc0xpc3QgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLmlzTGlzdDtcbnZhciBjb3VudCA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkuY291bnQ7XG52YXIgaXNFbXB0eSA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkuaXNFbXB0eTtcbnZhciBmaXJzdCA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkuZmlyc3Q7XG52YXIgc2Vjb25kID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5zZWNvbmQ7XG52YXIgdGhpcmQgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLnRoaXJkO1xudmFyIHJlc3QgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLnJlc3Q7XG52YXIgbWFwID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5tYXA7XG52YXIgdmVjID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS52ZWM7XG52YXIgY29ucyA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkuY29ucztcbnZhciBjb25qID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5jb25qO1xudmFyIHJlc3QgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLnJlc3Q7XG52YXIgY29uY2F0ID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5jb25jYXQ7XG52YXIgbGFzdCA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkubGFzdDtcbnZhciBidXRsYXN0ID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5idXRsYXN0O1xudmFyIHNvcnQgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLnNvcnQ7XG52YXIgbGF6eVNlcSA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkubGF6eVNlcTtcbnZhciBpc09kZCA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc09kZDtcbnZhciBkaWN0aW9uYXJ5ID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmRpY3Rpb25hcnk7XG52YXIga2V5cyA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5rZXlzO1xudmFyIGlzTmlsID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmlzTmlsO1xudmFyIGluYyA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pbmM7XG52YXIgZGVjID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmRlYztcbnZhciBpc1ZlY3RvciA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc1ZlY3RvcjtcbnZhciBpc1N0cmluZyA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc1N0cmluZztcbnZhciBpc051bWJlciA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc051bWJlcjtcbnZhciBpc0Jvb2xlYW4gPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNCb29sZWFuO1xudmFyIGlzT2JqZWN0ID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmlzT2JqZWN0O1xudmFyIGlzRGljdGlvbmFyeSA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc0RpY3Rpb25hcnk7XG52YXIgcmVQYXR0ZXJuID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLnJlUGF0dGVybjtcbnZhciByZU1hdGNoZXMgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkucmVNYXRjaGVzO1xudmFyIHJlRmluZCA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5yZUZpbmQ7XG52YXIgc3RyID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLnN0cjtcbnZhciBzdWJzID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLnN1YnM7XG52YXIgY2hhciA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5jaGFyO1xudmFyIHZhbHMgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkudmFscztcbnZhciBpc0VxdWFsID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmlzRXF1YWw7XG52YXIgaXNTeW1ib2wgPSAocmVxdWlyZShcIi4vYXN0XCIpKS5pc1N5bWJvbDtcbnZhciBzeW1ib2wgPSAocmVxdWlyZShcIi4vYXN0XCIpKS5zeW1ib2w7XG52YXIgaXNLZXl3b3JkID0gKHJlcXVpcmUoXCIuL2FzdFwiKSkuaXNLZXl3b3JkO1xudmFyIGtleXdvcmQgPSAocmVxdWlyZShcIi4vYXN0XCIpKS5rZXl3b3JkO1xudmFyIG1ldGEgPSAocmVxdWlyZShcIi4vYXN0XCIpKS5tZXRhO1xudmFyIHdpdGhNZXRhID0gKHJlcXVpcmUoXCIuL2FzdFwiKSkud2l0aE1ldGE7XG52YXIgbmFtZSA9IChyZXF1aXJlKFwiLi9hc3RcIikpLm5hbWU7XG52YXIgZ2Vuc3ltID0gKHJlcXVpcmUoXCIuL2FzdFwiKSkuZ2Vuc3ltO1xudmFyIHNwbGl0ID0gKHJlcXVpcmUoXCIuL3N0cmluZ1wiKSkuc3BsaXQ7XG52YXIgam9pbiA9IChyZXF1aXJlKFwiLi9zdHJpbmdcIikpLmpvaW47O1xuXG52YXIgcHVzaEJhY2tSZWFkZXIgPSBmdW5jdGlvbiBwdXNoQmFja1JlYWRlcihzb3VyY2UsIHVyaSkge1xuICByZXR1cm4ge1xuICAgIFwibGluZXNcIjogc3BsaXQoc291cmNlLCBcIlxcblwiKSxcbiAgICBcImJ1ZmZlclwiOiBcIlwiLFxuICAgIFwidXJpXCI6IHVyaSxcbiAgICBcImNvbHVtblwiOiAtMSxcbiAgICBcImxpbmVcIjogMFxuICB9O1xufTtcbmV4cG9ydHMucHVzaEJhY2tSZWFkZXIgPSBwdXNoQmFja1JlYWRlcjtcblxudmFyIHBlZWtDaGFyID0gZnVuY3Rpb24gcGVla0NoYXIocmVhZGVyKSB7XG4gIHZhciBsaW5lID0gKChyZWFkZXIgfHwgMClbXCJsaW5lc1wiXSlbKHJlYWRlciB8fCAwKVtcImxpbmVcIl1dO1xuICB2YXIgY29sdW1uID0gaW5jKChyZWFkZXIgfHwgMClbXCJjb2x1bW5cIl0pO1xuICByZXR1cm4gaXNOaWwobGluZSkgP1xuICAgIHZvaWQoMCkgOlxuICAgIChsaW5lW2NvbHVtbl0pIHx8IFwiXFxuXCI7XG59O1xuZXhwb3J0cy5wZWVrQ2hhciA9IHBlZWtDaGFyO1xuXG52YXIgcmVhZENoYXIgPSBmdW5jdGlvbiByZWFkQ2hhcihyZWFkZXIpIHtcbiAgdmFyIGNoID0gcGVla0NoYXIocmVhZGVyKTtcbiAgaXNOZXdsaW5lKHBlZWtDaGFyKHJlYWRlcikpID9cbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAocmVhZGVyIHx8IDApW1wibGluZVwiXSA9IGluYygocmVhZGVyIHx8IDApW1wibGluZVwiXSk7XG4gICAgICByZXR1cm4gKHJlYWRlciB8fCAwKVtcImNvbHVtblwiXSA9IC0xO1xuICAgIH0pKCkgOlxuICAgIChyZWFkZXIgfHwgMClbXCJjb2x1bW5cIl0gPSBpbmMoKHJlYWRlciB8fCAwKVtcImNvbHVtblwiXSk7XG4gIHJldHVybiBjaDtcbn07XG5leHBvcnRzLnJlYWRDaGFyID0gcmVhZENoYXI7XG5cbnZhciBpc05ld2xpbmUgPSBmdW5jdGlvbiBpc05ld2xpbmUoY2gpIHtcbiAgcmV0dXJuIFwiXFxuXCIgPT09IGNoO1xufTtcbmV4cG9ydHMuaXNOZXdsaW5lID0gaXNOZXdsaW5lO1xuXG52YXIgaXNCcmVha2luZ1doaXRlc3BhY2UgPSBmdW5jdGlvbiBpc0JyZWFraW5nV2hpdGVzcGFjZShjaCkge1xuICByZXR1cm4gKGNoID09PSBcIiBcIikgfHwgKGNoID09PSBcIlxcdFwiKSB8fCAoY2ggPT09IFwiXFxuXCIpIHx8IChjaCA9PT0gXCJcXHJcIik7XG59O1xuZXhwb3J0cy5pc0JyZWFraW5nV2hpdGVzcGFjZSA9IGlzQnJlYWtpbmdXaGl0ZXNwYWNlO1xuXG52YXIgaXNXaGl0ZXNwYWNlID0gZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKGNoKSB7XG4gIHJldHVybiAoaXNCcmVha2luZ1doaXRlc3BhY2UoY2gpKSB8fCAoXCIsXCIgPT09IGNoKTtcbn07XG5leHBvcnRzLmlzV2hpdGVzcGFjZSA9IGlzV2hpdGVzcGFjZTtcblxudmFyIGlzTnVtZXJpYyA9IGZ1bmN0aW9uIGlzTnVtZXJpYyhjaCkge1xuICByZXR1cm4gKGNoID09PSBcIjBcIikgfHwgKGNoID09PSBcIjFcIikgfHwgKGNoID09PSBcIjJcIikgfHwgKGNoID09PSBcIjNcIikgfHwgKGNoID09PSBcIjRcIikgfHwgKGNoID09PSBcIjVcIikgfHwgKGNoID09PSBcIjZcIikgfHwgKGNoID09PSBcIjdcIikgfHwgKGNoID09PSBcIjhcIikgfHwgKGNoID09PSBcIjlcIik7XG59O1xuZXhwb3J0cy5pc051bWVyaWMgPSBpc051bWVyaWM7XG5cbnZhciBpc0NvbW1lbnRQcmVmaXggPSBmdW5jdGlvbiBpc0NvbW1lbnRQcmVmaXgoY2gpIHtcbiAgcmV0dXJuIFwiO1wiID09PSBjaDtcbn07XG5leHBvcnRzLmlzQ29tbWVudFByZWZpeCA9IGlzQ29tbWVudFByZWZpeDtcblxudmFyIGlzTnVtYmVyTGl0ZXJhbCA9IGZ1bmN0aW9uIGlzTnVtYmVyTGl0ZXJhbChyZWFkZXIsIGluaXRjaCkge1xuICByZXR1cm4gKGlzTnVtZXJpYyhpbml0Y2gpKSB8fCAoKChcIitcIiA9PT0gaW5pdGNoKSB8fCAoXCItXCIgPT09IGluaXRjaCkpICYmIChpc051bWVyaWMocGVla0NoYXIocmVhZGVyKSkpKTtcbn07XG5leHBvcnRzLmlzTnVtYmVyTGl0ZXJhbCA9IGlzTnVtYmVyTGl0ZXJhbDtcblxudmFyIHJlYWRlckVycm9yID0gZnVuY3Rpb24gcmVhZGVyRXJyb3IocmVhZGVyLCBtZXNzYWdlKSB7XG4gIHZhciB0ZXh0ID0gXCJcIiArIG1lc3NhZ2UgKyBcIlxcblwiICsgXCJsaW5lOlwiICsgKChyZWFkZXIgfHwgMClbXCJsaW5lXCJdKSArIFwiXFxuXCIgKyBcImNvbHVtbjpcIiArICgocmVhZGVyIHx8IDApW1wiY29sdW1uXCJdKTtcbiAgdmFyIGVycm9yID0gU3ludGF4RXJyb3IodGV4dCwgKHJlYWRlciB8fCAwKVtcInVyaVwiXSk7XG4gIGVycm9yLmxpbmUgPSAocmVhZGVyIHx8IDApW1wibGluZVwiXTtcbiAgZXJyb3IuY29sdW1uID0gKHJlYWRlciB8fCAwKVtcImNvbHVtblwiXTtcbiAgZXJyb3IudXJpID0gKHJlYWRlciB8fCAwKVtcInVyaVwiXTtcbiAgcmV0dXJuIChmdW5jdGlvbigpIHsgdGhyb3cgZXJyb3I7IH0pKCk7XG59O1xuZXhwb3J0cy5yZWFkZXJFcnJvciA9IHJlYWRlckVycm9yO1xuXG52YXIgaXNNYWNyb1Rlcm1pbmF0aW5nID0gZnVuY3Rpb24gaXNNYWNyb1Rlcm1pbmF0aW5nKGNoKSB7XG4gIHJldHVybiAoIShjaCA9PT0gXCIjXCIpKSAmJiAoIShjaCA9PT0gXCInXCIpKSAmJiAoIShjaCA9PT0gXCI6XCIpKSAmJiAobWFjcm9zKGNoKSk7XG59O1xuZXhwb3J0cy5pc01hY3JvVGVybWluYXRpbmcgPSBpc01hY3JvVGVybWluYXRpbmc7XG5cbnZhciByZWFkVG9rZW4gPSBmdW5jdGlvbiByZWFkVG9rZW4ocmVhZGVyLCBpbml0Y2gpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGJ1ZmZlciwgY2gpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSAoaXNOaWwoY2gpKSB8fCAoaXNXaGl0ZXNwYWNlKGNoKSkgfHwgKGlzTWFjcm9UZXJtaW5hdGluZyhjaCkpID9cbiAgICAgIGJ1ZmZlciA6XG4gICAgICAoYnVmZmVyID0gXCJcIiArIGJ1ZmZlciArIChyZWFkQ2hhcihyZWFkZXIpKSwgY2ggPSBwZWVrQ2hhcihyZWFkZXIpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoaW5pdGNoLCBwZWVrQ2hhcihyZWFkZXIpKTtcbn07XG5leHBvcnRzLnJlYWRUb2tlbiA9IHJlYWRUb2tlbjtcblxudmFyIHNraXBMaW5lID0gZnVuY3Rpb24gc2tpcExpbmUocmVhZGVyLCBfKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcCgpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY2ggPSByZWFkQ2hhcihyZWFkZXIpO1xuICAgICAgcmV0dXJuIChjaCA9PT0gXCJcXG5cIikgfHwgKGNoID09PSBcIlxcclwiKSB8fCAoaXNOaWwoY2gpKSA/XG4gICAgICAgIHJlYWRlciA6XG4gICAgICAgIChsb29wKTtcbiAgICB9KSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KSgpO1xufTtcbmV4cG9ydHMuc2tpcExpbmUgPSBza2lwTGluZTtcblxudmFyIGludFBhdHRlcm4gPSByZVBhdHRlcm4oXCJeKFstK10/KSg/OigwKXwoWzEtOV1bMC05XSopfDBbeFhdKFswLTlBLUZhLWZdKyl8MChbMC03XSspfChbMS05XVswLTldPylbclJdKFswLTlBLVphLXpdKyl8MFswLTldKykoTik/JFwiKTtcbmV4cG9ydHMuaW50UGF0dGVybiA9IGludFBhdHRlcm47XG5cbnZhciByYXRpb1BhdHRlcm4gPSByZVBhdHRlcm4oXCIoWy0rXT9bMC05XSspLyhbMC05XSspXCIpO1xuZXhwb3J0cy5yYXRpb1BhdHRlcm4gPSByYXRpb1BhdHRlcm47XG5cbnZhciBmbG9hdFBhdHRlcm4gPSByZVBhdHRlcm4oXCIoWy0rXT9bMC05XSsoXFxcXC5bMC05XSopPyhbZUVdWy0rXT9bMC05XSspPykoTSk/XCIpO1xuZXhwb3J0cy5mbG9hdFBhdHRlcm4gPSBmbG9hdFBhdHRlcm47XG5cbnZhciBtYXRjaEludCA9IGZ1bmN0aW9uIG1hdGNoSW50KHMpIHtcbiAgdmFyIGdyb3VwcyA9IHJlRmluZChpbnRQYXR0ZXJuLCBzKTtcbiAgdmFyIGdyb3VwMyA9IGdyb3Vwc1syXTtcbiAgcmV0dXJuICEoKGlzTmlsKGdyb3VwMykpIHx8IChjb3VudChncm91cDMpIDwgMSkpID9cbiAgICAwIDpcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbmVnYXRlID0gXCItXCIgPT09IGdyb3Vwc1sxXSA/XG4gICAgICAgIC0xIDpcbiAgICAgICAgMTtcbiAgICAgIHZhciBhID0gZ3JvdXBzWzNdID9cbiAgICAgICAgW2dyb3Vwc1szXSwgMTBdIDpcbiAgICAgIGdyb3Vwc1s0XSA/XG4gICAgICAgIFtncm91cHNbNF0sIDE2XSA6XG4gICAgICBncm91cHNbNV0gP1xuICAgICAgICBbZ3JvdXBzWzVdLCA4XSA6XG4gICAgICBncm91cHNbN10gP1xuICAgICAgICBbZ3JvdXBzWzddLCBwYXJzZUludChncm91cHNbN10pXSA6XG4gICAgICBcImVsc2VcIiA/XG4gICAgICAgIFt2b2lkKDApLCB2b2lkKDApXSA6XG4gICAgICAgIHZvaWQoMCk7XG4gICAgICB2YXIgbiA9IGFbMF07XG4gICAgICB2YXIgcmFkaXggPSBhWzFdO1xuICAgICAgcmV0dXJuIGlzTmlsKG4pID9cbiAgICAgICAgdm9pZCgwKSA6XG4gICAgICAgIG5lZ2F0ZSAqIChwYXJzZUludChuLCByYWRpeCkpO1xuICAgIH0pKCk7XG59O1xuZXhwb3J0cy5tYXRjaEludCA9IG1hdGNoSW50O1xuXG52YXIgbWF0Y2hSYXRpbyA9IGZ1bmN0aW9uIG1hdGNoUmF0aW8ocykge1xuICB2YXIgZ3JvdXBzID0gcmVGaW5kKHJhdGlvUGF0dGVybiwgcyk7XG4gIHZhciBudW1pbmF0b3IgPSBncm91cHNbMV07XG4gIHZhciBkZW5vbWluYXRvciA9IGdyb3Vwc1syXTtcbiAgcmV0dXJuIChwYXJzZUludChudW1pbmF0b3IpKSAvIChwYXJzZUludChkZW5vbWluYXRvcikpO1xufTtcbmV4cG9ydHMubWF0Y2hSYXRpbyA9IG1hdGNoUmF0aW87XG5cbnZhciBtYXRjaEZsb2F0ID0gZnVuY3Rpb24gbWF0Y2hGbG9hdChzKSB7XG4gIHJldHVybiBwYXJzZUZsb2F0KHMpO1xufTtcbmV4cG9ydHMubWF0Y2hGbG9hdCA9IG1hdGNoRmxvYXQ7XG5cbnZhciBtYXRjaE51bWJlciA9IGZ1bmN0aW9uIG1hdGNoTnVtYmVyKHMpIHtcbiAgcmV0dXJuIHJlTWF0Y2hlcyhpbnRQYXR0ZXJuLCBzKSA/XG4gICAgbWF0Y2hJbnQocykgOlxuICByZU1hdGNoZXMocmF0aW9QYXR0ZXJuLCBzKSA/XG4gICAgbWF0Y2hSYXRpbyhzKSA6XG4gIHJlTWF0Y2hlcyhmbG9hdFBhdHRlcm4sIHMpID9cbiAgICBtYXRjaEZsb2F0KHMpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMubWF0Y2hOdW1iZXIgPSBtYXRjaE51bWJlcjtcblxudmFyIGVzY2FwZUNoYXJNYXAgPSBmdW5jdGlvbiBlc2NhcGVDaGFyTWFwKGMpIHtcbiAgcmV0dXJuIGMgPT09IFwidFwiID9cbiAgICBcIlxcdFwiIDpcbiAgYyA9PT0gXCJyXCIgP1xuICAgIFwiXFxyXCIgOlxuICBjID09PSBcIm5cIiA/XG4gICAgXCJcXG5cIiA6XG4gIGMgPT09IFwiXFxcXFwiID9cbiAgICBcIlxcXFxcIiA6XG4gIGMgPT09IFwiXFxcIlwiID9cbiAgICBcIlxcXCJcIiA6XG4gIGMgPT09IFwiYlwiID9cbiAgICBcIlxiXCIgOlxuICBjID09PSBcImZcIiA/XG4gICAgXCJcZlwiIDpcbiAgXCJlbHNlXCIgP1xuICAgIHZvaWQoMCkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5lc2NhcGVDaGFyTWFwID0gZXNjYXBlQ2hhck1hcDtcblxudmFyIHJlYWQyQ2hhcnMgPSBmdW5jdGlvbiByZWFkMkNoYXJzKHJlYWRlcikge1xuICByZXR1cm4gXCJcIiArIChyZWFkQ2hhcihyZWFkZXIpKSArIChyZWFkQ2hhcihyZWFkZXIpKTtcbn07XG5leHBvcnRzLnJlYWQyQ2hhcnMgPSByZWFkMkNoYXJzO1xuXG52YXIgcmVhZDRDaGFycyA9IGZ1bmN0aW9uIHJlYWQ0Q2hhcnMocmVhZGVyKSB7XG4gIHJldHVybiBcIlwiICsgKHJlYWRDaGFyKHJlYWRlcikpICsgKHJlYWRDaGFyKHJlYWRlcikpICsgKHJlYWRDaGFyKHJlYWRlcikpICsgKHJlYWRDaGFyKHJlYWRlcikpO1xufTtcbmV4cG9ydHMucmVhZDRDaGFycyA9IHJlYWQ0Q2hhcnM7XG5cbnZhciB1bmljb2RlMlBhdHRlcm4gPSByZVBhdHRlcm4oXCJbMC05QS1GYS1mXXsyfVwiKTtcbmV4cG9ydHMudW5pY29kZTJQYXR0ZXJuID0gdW5pY29kZTJQYXR0ZXJuO1xuXG52YXIgdW5pY29kZTRQYXR0ZXJuID0gcmVQYXR0ZXJuKFwiWzAtOUEtRmEtZl17NH1cIik7XG5leHBvcnRzLnVuaWNvZGU0UGF0dGVybiA9IHVuaWNvZGU0UGF0dGVybjtcblxudmFyIHZhbGlkYXRlVW5pY29kZUVzY2FwZSA9IGZ1bmN0aW9uIHZhbGlkYXRlVW5pY29kZUVzY2FwZSh1bmljb2RlUGF0dGVybiwgcmVhZGVyLCBlc2NhcGVDaGFyLCB1bmljb2RlU3RyKSB7XG4gIHJldHVybiByZU1hdGNoZXModW5pY29kZVBhdHRlcm4sIHVuaWNvZGVTdHIpID9cbiAgICB1bmljb2RlU3RyIDpcbiAgICByZWFkZXJFcnJvcihyZWFkZXIsIFwiXCIgKyBcIlVuZXhwZWN0ZWQgdW5pY29kZSBlc2NhcGUgXCIgKyBcIlxcXFxcIiArIGVzY2FwZUNoYXIgKyB1bmljb2RlU3RyKTtcbn07XG5leHBvcnRzLnZhbGlkYXRlVW5pY29kZUVzY2FwZSA9IHZhbGlkYXRlVW5pY29kZUVzY2FwZTtcblxudmFyIG1ha2VVbmljb2RlQ2hhciA9IGZ1bmN0aW9uIG1ha2VVbmljb2RlQ2hhcihjb2RlU3RyLCBiYXNlKSB7XG4gIHZhciBiYXNlID0gYmFzZSB8fCAxNjtcbiAgdmFyIGNvZGUgPSBwYXJzZUludChjb2RlU3RyLCBiYXNlKTtcbiAgcmV0dXJuIGNoYXIoY29kZSk7XG59O1xuZXhwb3J0cy5tYWtlVW5pY29kZUNoYXIgPSBtYWtlVW5pY29kZUNoYXI7XG5cbnZhciBlc2NhcGVDaGFyID0gZnVuY3Rpb24gZXNjYXBlQ2hhcihidWZmZXIsIHJlYWRlcikge1xuICB2YXIgY2ggPSByZWFkQ2hhcihyZWFkZXIpO1xuICB2YXIgbWFwcmVzdWx0ID0gZXNjYXBlQ2hhck1hcChjaCk7XG4gIHJldHVybiBtYXByZXN1bHQgP1xuICAgIG1hcHJlc3VsdCA6XG4gIGNoID09PSBcInhcIiA/XG4gICAgbWFrZVVuaWNvZGVDaGFyKHZhbGlkYXRlVW5pY29kZUVzY2FwZSh1bmljb2RlMlBhdHRlcm4sIHJlYWRlciwgY2gsIHJlYWQyQ2hhcnMocmVhZGVyKSkpIDpcbiAgY2ggPT09IFwidVwiID9cbiAgICBtYWtlVW5pY29kZUNoYXIodmFsaWRhdGVVbmljb2RlRXNjYXBlKHVuaWNvZGU0UGF0dGVybiwgcmVhZGVyLCBjaCwgcmVhZDRDaGFycyhyZWFkZXIpKSkgOlxuICBpc051bWVyaWMoY2gpID9cbiAgICBjaGFyKGNoKSA6XG4gIFwiZWxzZVwiID9cbiAgICByZWFkZXJFcnJvcihyZWFkZXIsIFwiXCIgKyBcIlVuZXhwZWN0ZWQgdW5pY29kZSBlc2NhcGUgXCIgKyBcIlxcXFxcIiArIGNoKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmVzY2FwZUNoYXIgPSBlc2NhcGVDaGFyO1xuXG52YXIgcmVhZFBhc3QgPSBmdW5jdGlvbiByZWFkUGFzdChwcmVkaWNhdGUsIHJlYWRlcikge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoXykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IHByZWRpY2F0ZShwZWVrQ2hhcihyZWFkZXIpKSA/XG4gICAgICAoXyA9IHJlYWRDaGFyKHJlYWRlciksIGxvb3ApIDpcbiAgICAgIHBlZWtDaGFyKHJlYWRlcik7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKHZvaWQoMCkpO1xufTtcbmV4cG9ydHMucmVhZFBhc3QgPSByZWFkUGFzdDtcblxudmFyIHJlYWREZWxpbWl0ZWRMaXN0ID0gZnVuY3Rpb24gcmVhZERlbGltaXRlZExpc3QoZGVsaW0sIHJlYWRlciwgaXNSZWN1cnNpdmUpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGZvcm0pIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY2ggPSByZWFkUGFzdChpc1doaXRlc3BhY2UsIHJlYWRlcik7XG4gICAgICAhKGNoKSA/XG4gICAgICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJFT0ZcIikgOlxuICAgICAgICB2b2lkKDApO1xuICAgICAgcmV0dXJuIGRlbGltID09PSBjaCA/XG4gICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZWFkQ2hhcihyZWFkZXIpO1xuICAgICAgICAgIHJldHVybiBmb3JtO1xuICAgICAgICB9KSgpIDpcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBtYWNybyA9IG1hY3JvcyhjaCk7XG4gICAgICAgICAgcmV0dXJuIG1hY3JvID9cbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG1hY3JvKHJlYWRlciwgcmVhZENoYXIocmVhZGVyKSk7XG4gICAgICAgICAgICAgIHJldHVybiAoZm9ybSA9IHJlc3VsdCA9PT0gcmVhZGVyID9cbiAgICAgICAgICAgICAgICBmb3JtIDpcbiAgICAgICAgICAgICAgICBjb25qKGZvcm0sIHJlc3VsdCksIGxvb3ApO1xuICAgICAgICAgICAgfSkoKSA6XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBvID0gcmVhZChyZWFkZXIsIHRydWUsIHZvaWQoMCksIGlzUmVjdXJzaXZlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChmb3JtID0gbyA9PT0gcmVhZGVyID9cbiAgICAgICAgICAgICAgICBmb3JtIDpcbiAgICAgICAgICAgICAgICBjb25qKGZvcm0sIG8pLCBsb29wKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pKCk7XG4gICAgfSkoKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoW10pO1xufTtcbmV4cG9ydHMucmVhZERlbGltaXRlZExpc3QgPSByZWFkRGVsaW1pdGVkTGlzdDtcblxudmFyIG5vdEltcGxlbWVudGVkID0gZnVuY3Rpb24gbm90SW1wbGVtZW50ZWQocmVhZGVyLCBjaCkge1xuICByZXR1cm4gcmVhZGVyRXJyb3IocmVhZGVyLCBcIlwiICsgXCJSZWFkZXIgZm9yIFwiICsgY2ggKyBcIiBub3QgaW1wbGVtZW50ZWQgeWV0XCIpO1xufTtcbmV4cG9ydHMubm90SW1wbGVtZW50ZWQgPSBub3RJbXBsZW1lbnRlZDtcblxudmFyIHJlYWREaXNwYXRjaCA9IGZ1bmN0aW9uIHJlYWREaXNwYXRjaChyZWFkZXIsIF8pIHtcbiAgdmFyIGNoID0gcmVhZENoYXIocmVhZGVyKTtcbiAgdmFyIGRtID0gZGlzcGF0Y2hNYWNyb3MoY2gpO1xuICByZXR1cm4gZG0gP1xuICAgIGRtKHJlYWRlciwgXykgOlxuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvYmplY3QgPSBtYXliZVJlYWRUYWdnZWRUeXBlKHJlYWRlciwgY2gpO1xuICAgICAgcmV0dXJuIG9iamVjdCA/XG4gICAgICAgIG9iamVjdCA6XG4gICAgICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJObyBkaXNwYXRjaCBtYWNybyBmb3IgXCIsIGNoKTtcbiAgICB9KSgpO1xufTtcbmV4cG9ydHMucmVhZERpc3BhdGNoID0gcmVhZERpc3BhdGNoO1xuXG52YXIgcmVhZFVubWF0Y2hlZERlbGltaXRlciA9IGZ1bmN0aW9uIHJlYWRVbm1hdGNoZWREZWxpbWl0ZXIocmRyLCBjaCkge1xuICByZXR1cm4gcmVhZGVyRXJyb3IocmRyLCBcIlVubWFjaGVkIGRlbGltaXRlciBcIiwgY2gpO1xufTtcbmV4cG9ydHMucmVhZFVubWF0Y2hlZERlbGltaXRlciA9IHJlYWRVbm1hdGNoZWREZWxpbWl0ZXI7XG5cbnZhciByZWFkTGlzdCA9IGZ1bmN0aW9uIHJlYWRMaXN0KHJlYWRlciwgXykge1xuICB2YXIgZm9ybSA9IHJlYWREZWxpbWl0ZWRMaXN0KFwiKVwiLCByZWFkZXIsIHRydWUpO1xuICByZXR1cm4gd2l0aE1ldGEobGlzdC5hcHBseShsaXN0LCBmb3JtKSwgbWV0YShmb3JtKSk7XG59O1xuZXhwb3J0cy5yZWFkTGlzdCA9IHJlYWRMaXN0O1xuXG52YXIgcmVhZENvbW1lbnQgPSBmdW5jdGlvbiByZWFkQ29tbWVudChyZWFkZXIsIF8pIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGJ1ZmZlciwgY2gpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSAoaXNOaWwoY2gpKSB8fCAoXCJcXG5cIiA9PT0gY2gpID9cbiAgICAgIHJlYWRlciB8fCAobGlzdChzeW1ib2wodm9pZCgwKSwgXCJjb21tZW50XCIpLCBidWZmZXIpKSA6XG4gICAgKFwiXFxcXFwiID09PSBjaCkgP1xuICAgICAgKGJ1ZmZlciA9IFwiXCIgKyBidWZmZXIgKyAoZXNjYXBlQ2hhcihidWZmZXIsIHJlYWRlcikpLCBjaCA9IHJlYWRDaGFyKHJlYWRlciksIGxvb3ApIDpcbiAgICBcImVsc2VcIiA/XG4gICAgICAoYnVmZmVyID0gXCJcIiArIGJ1ZmZlciArIGNoLCBjaCA9IHJlYWRDaGFyKHJlYWRlciksIGxvb3ApIDpcbiAgICAgIHZvaWQoMCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFwiXCIsIHJlYWRDaGFyKHJlYWRlcikpO1xufTtcbmV4cG9ydHMucmVhZENvbW1lbnQgPSByZWFkQ29tbWVudDtcblxudmFyIHJlYWRWZWN0b3IgPSBmdW5jdGlvbiByZWFkVmVjdG9yKHJlYWRlcikge1xuICByZXR1cm4gcmVhZERlbGltaXRlZExpc3QoXCJdXCIsIHJlYWRlciwgdHJ1ZSk7XG59O1xuZXhwb3J0cy5yZWFkVmVjdG9yID0gcmVhZFZlY3RvcjtcblxudmFyIHJlYWRNYXAgPSBmdW5jdGlvbiByZWFkTWFwKHJlYWRlcikge1xuICB2YXIgZm9ybSA9IHJlYWREZWxpbWl0ZWRMaXN0KFwifVwiLCByZWFkZXIsIHRydWUpO1xuICByZXR1cm4gaXNPZGQoY291bnQoZm9ybSkpID9cbiAgICByZWFkZXJFcnJvcihyZWFkZXIsIFwiTWFwIGxpdGVyYWwgbXVzdCBjb250YWluIGFuIGV2ZW4gbnVtYmVyIG9mIGZvcm1zXCIpIDpcbiAgICB3aXRoTWV0YShkaWN0aW9uYXJ5LmFwcGx5KGRpY3Rpb25hcnksIGZvcm0pLCBtZXRhKGZvcm0pKTtcbn07XG5leHBvcnRzLnJlYWRNYXAgPSByZWFkTWFwO1xuXG52YXIgcmVhZFNldCA9IGZ1bmN0aW9uIHJlYWRTZXQocmVhZGVyLCBfKSB7XG4gIHZhciBmb3JtID0gcmVhZERlbGltaXRlZExpc3QoXCJ9XCIsIHJlYWRlciwgdHJ1ZSk7XG4gIHJldHVybiB3aXRoTWV0YShjb25jYXQoW3N5bWJvbCh2b2lkKDApLCBcInNldFwiKV0sIGZvcm0pLCBtZXRhKGZvcm0pKTtcbn07XG5leHBvcnRzLnJlYWRTZXQgPSByZWFkU2V0O1xuXG52YXIgcmVhZE51bWJlciA9IGZ1bmN0aW9uIHJlYWROdW1iZXIocmVhZGVyLCBpbml0Y2gpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGJ1ZmZlciwgY2gpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSAoaXNOaWwoY2gpKSB8fCAoaXNXaGl0ZXNwYWNlKGNoKSkgfHwgKG1hY3JvcyhjaCkpID9cbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gbWF0Y2hOdW1iZXIoYnVmZmVyKTtcbiAgICAgICAgcmV0dXJuIGlzTmlsKG1hdGNoKSA/XG4gICAgICAgICAgcmVhZGVyRXJyb3IocmVhZGVyLCBcIkludmFsaWQgbnVtYmVyIGZvcm1hdCBbXCIsIGJ1ZmZlciwgXCJdXCIpIDpcbiAgICAgICAgICBtYXRjaDtcbiAgICAgIH0pKCkgOlxuICAgICAgKGJ1ZmZlciA9IFwiXCIgKyBidWZmZXIgKyAocmVhZENoYXIocmVhZGVyKSksIGNoID0gcGVla0NoYXIocmVhZGVyKSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKGluaXRjaCwgcGVla0NoYXIocmVhZGVyKSk7XG59O1xuZXhwb3J0cy5yZWFkTnVtYmVyID0gcmVhZE51bWJlcjtcblxudmFyIHJlYWRTdHJpbmcgPSBmdW5jdGlvbiByZWFkU3RyaW5nKHJlYWRlcikge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoYnVmZmVyLCBjaCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzTmlsKGNoKSA/XG4gICAgICByZWFkZXJFcnJvcihyZWFkZXIsIFwiRU9GIHdoaWxlIHJlYWRpbmcgc3RyaW5nXCIpIDpcbiAgICBcIlxcXFxcIiA9PT0gY2ggP1xuICAgICAgKGJ1ZmZlciA9IFwiXCIgKyBidWZmZXIgKyAoZXNjYXBlQ2hhcihidWZmZXIsIHJlYWRlcikpLCBjaCA9IHJlYWRDaGFyKHJlYWRlciksIGxvb3ApIDpcbiAgICBcIlxcXCJcIiA9PT0gY2ggP1xuICAgICAgYnVmZmVyIDpcbiAgICBcImRlZmF1bHRcIiA/XG4gICAgICAoYnVmZmVyID0gXCJcIiArIGJ1ZmZlciArIGNoLCBjaCA9IHJlYWRDaGFyKHJlYWRlciksIGxvb3ApIDpcbiAgICAgIHZvaWQoMCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFwiXCIsIHJlYWRDaGFyKHJlYWRlcikpO1xufTtcbmV4cG9ydHMucmVhZFN0cmluZyA9IHJlYWRTdHJpbmc7XG5cbnZhciByZWFkVW5xdW90ZSA9IGZ1bmN0aW9uIHJlYWRVbnF1b3RlKHJlYWRlcikge1xuICB2YXIgY2ggPSBwZWVrQ2hhcihyZWFkZXIpO1xuICByZXR1cm4gIShjaCkgP1xuICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJFT0Ygd2hpbGUgcmVhZGluZyBjaGFyYWN0ZXJcIikgOlxuICBjaCA9PT0gXCJAXCIgP1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHJlYWRDaGFyKHJlYWRlcik7XG4gICAgICByZXR1cm4gbGlzdChzeW1ib2wodm9pZCgwKSwgXCJ1bnF1b3RlLXNwbGljaW5nXCIpLCByZWFkKHJlYWRlciwgdHJ1ZSwgdm9pZCgwKSwgdHJ1ZSkpO1xuICAgIH0pKCkgOlxuICAgIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwidW5xdW90ZVwiKSwgcmVhZChyZWFkZXIsIHRydWUsIHZvaWQoMCksIHRydWUpKTtcbn07XG5leHBvcnRzLnJlYWRVbnF1b3RlID0gcmVhZFVucXVvdGU7XG5cbnZhciBzcGVjaWFsU3ltYm9scyA9IGZ1bmN0aW9uIHNwZWNpYWxTeW1ib2xzKHRleHQsIG5vdEZvdW5kKSB7XG4gIHJldHVybiB0ZXh0ID09PSBcIm5pbFwiID9cbiAgICB2b2lkKDApIDpcbiAgdGV4dCA9PT0gXCJ0cnVlXCIgP1xuICAgIHRydWUgOlxuICB0ZXh0ID09PSBcImZhbHNlXCIgP1xuICAgIGZhbHNlIDpcbiAgXCJlbHNlXCIgP1xuICAgIG5vdEZvdW5kIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuc3BlY2lhbFN5bWJvbHMgPSBzcGVjaWFsU3ltYm9scztcblxudmFyIHJlYWRTeW1ib2wgPSBmdW5jdGlvbiByZWFkU3ltYm9sKHJlYWRlciwgaW5pdGNoKSB7XG4gIHZhciB0b2tlbiA9IHJlYWRUb2tlbihyZWFkZXIsIGluaXRjaCk7XG4gIHZhciBwYXJ0cyA9IHNwbGl0KHRva2VuLCBcIi9cIik7XG4gIHZhciBoYXNOcyA9IChjb3VudChwYXJ0cykgPiAxKSAmJiAoY291bnQodG9rZW4pID4gMSk7XG4gIHZhciBucyA9IGZpcnN0KHBhcnRzKTtcbiAgdmFyIG5hbWUgPSBqb2luKFwiL1wiLCByZXN0KHBhcnRzKSk7XG4gIHJldHVybiBoYXNOcyA/XG4gICAgc3ltYm9sKG5zLCBuYW1lKSA6XG4gICAgc3BlY2lhbFN5bWJvbHModG9rZW4sIHN5bWJvbCh0b2tlbikpO1xufTtcbmV4cG9ydHMucmVhZFN5bWJvbCA9IHJlYWRTeW1ib2w7XG5cbnZhciByZWFkS2V5d29yZCA9IGZ1bmN0aW9uIHJlYWRLZXl3b3JkKHJlYWRlciwgaW5pdGNoKSB7XG4gIHZhciB0b2tlbiA9IHJlYWRUb2tlbihyZWFkZXIsIHJlYWRDaGFyKHJlYWRlcikpO1xuICB2YXIgcGFydHMgPSBzcGxpdCh0b2tlbiwgXCIvXCIpO1xuICB2YXIgbmFtZSA9IGxhc3QocGFydHMpO1xuICB2YXIgbnMgPSBjb3VudChwYXJ0cykgPiAxID9cbiAgICBqb2luKFwiL1wiLCBidXRsYXN0KHBhcnRzKSkgOlxuICAgIHZvaWQoMCk7XG4gIHZhciBpc3N1ZSA9IGxhc3QobnMpID09PSBcIjpcIiA/XG4gICAgXCJuYW1lc3BhY2UgY2FuJ3QgZW5kcyB3aXRoIFxcXCI6XFxcIlwiIDpcbiAgbGFzdChuYW1lKSA9PT0gXCI6XCIgP1xuICAgIFwibmFtZSBjYW4ndCBlbmQgd2l0aCBcXFwiOlxcXCJcIiA6XG4gIGxhc3QobmFtZSkgPT09IFwiL1wiID9cbiAgICBcIm5hbWUgY2FuJ3QgZW5kIHdpdGggXFxcIi9cXFwiXCIgOlxuICBjb3VudChzcGxpdCh0b2tlbiwgXCI6OlwiKSkgPiAxID9cbiAgICBcIm5hbWUgY2FuJ3QgY29udGFpbiBcXFwiOjpcXFwiXCIgOlxuICAgIHZvaWQoMCk7XG4gIHJldHVybiBpc3N1ZSA/XG4gICAgcmVhZGVyRXJyb3IocmVhZGVyLCBcIkludmFsaWQgdG9rZW4gKFwiLCBpc3N1ZSwgXCIpOiBcIiwgdG9rZW4pIDpcbiAgKCEobnMpKSAmJiAoZmlyc3QobmFtZSkgPT09IFwiOlwiKSA/XG4gICAga2V5d29yZChyZXN0KG5hbWUpKSA6XG4gICAga2V5d29yZChucywgbmFtZSk7XG59O1xuZXhwb3J0cy5yZWFkS2V5d29yZCA9IHJlYWRLZXl3b3JkO1xuXG52YXIgZGVzdWdhck1ldGEgPSBmdW5jdGlvbiBkZXN1Z2FyTWV0YShmKSB7XG4gIHJldHVybiBpc0tleXdvcmQoZikgP1xuICAgIGRpY3Rpb25hcnkobmFtZShmKSwgdHJ1ZSkgOlxuICBpc1N5bWJvbChmKSA/XG4gICAge1xuICAgICAgXCJ0YWdcIjogZlxuICAgIH0gOlxuICBpc1N0cmluZyhmKSA/XG4gICAge1xuICAgICAgXCJ0YWdcIjogZlxuICAgIH0gOlxuICBcImVsc2VcIiA/XG4gICAgZiA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmRlc3VnYXJNZXRhID0gZGVzdWdhck1ldGE7XG5cbnZhciB3cmFwcGluZ1JlYWRlciA9IGZ1bmN0aW9uIHdyYXBwaW5nUmVhZGVyKHByZWZpeCkge1xuICByZXR1cm4gZnVuY3Rpb24ocmVhZGVyKSB7XG4gICAgcmV0dXJuIGxpc3QocHJlZml4LCByZWFkKHJlYWRlciwgdHJ1ZSwgdm9pZCgwKSwgdHJ1ZSkpO1xuICB9O1xufTtcbmV4cG9ydHMud3JhcHBpbmdSZWFkZXIgPSB3cmFwcGluZ1JlYWRlcjtcblxudmFyIHRocm93aW5nUmVhZGVyID0gZnVuY3Rpb24gdGhyb3dpbmdSZWFkZXIobXNnKSB7XG4gIHJldHVybiBmdW5jdGlvbihyZWFkZXIpIHtcbiAgICByZXR1cm4gcmVhZGVyRXJyb3IocmVhZGVyLCBtc2cpO1xuICB9O1xufTtcbmV4cG9ydHMudGhyb3dpbmdSZWFkZXIgPSB0aHJvd2luZ1JlYWRlcjtcblxudmFyIHJlYWRNZXRhID0gZnVuY3Rpb24gcmVhZE1ldGEocmVhZGVyLCBfKSB7XG4gIHZhciBtZXRhZGF0YSA9IGRlc3VnYXJNZXRhKHJlYWQocmVhZGVyLCB0cnVlLCB2b2lkKDApLCB0cnVlKSk7XG4gICEoaXNEaWN0aW9uYXJ5KG1ldGFkYXRhKSkgP1xuICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJNZXRhZGF0YSBtdXN0IGJlIFN5bWJvbCwgS2V5d29yZCwgU3RyaW5nIG9yIE1hcFwiKSA6XG4gICAgdm9pZCgwKTtcbiAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICB2YXIgZm9ybSA9IHJlYWQocmVhZGVyLCB0cnVlLCB2b2lkKDApLCB0cnVlKTtcbiAgICByZXR1cm4gaXNPYmplY3QoZm9ybSkgP1xuICAgICAgd2l0aE1ldGEoZm9ybSwgY29uaihtZXRhZGF0YSwgbWV0YShmb3JtKSkpIDpcbiAgICAgIGZvcm07XG4gIH0pKCk7XG59O1xuZXhwb3J0cy5yZWFkTWV0YSA9IHJlYWRNZXRhO1xuXG52YXIgcmVhZFJlZ2V4ID0gZnVuY3Rpb24gcmVhZFJlZ2V4KHJlYWRlcikge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoYnVmZmVyLCBjaCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzTmlsKGNoKSA/XG4gICAgICByZWFkZXJFcnJvcihyZWFkZXIsIFwiRU9GIHdoaWxlIHJlYWRpbmcgc3RyaW5nXCIpIDpcbiAgICBcIlxcXFxcIiA9PT0gY2ggP1xuICAgICAgKGJ1ZmZlciA9IFwiXCIgKyBidWZmZXIgKyBjaCArIChyZWFkQ2hhcihyZWFkZXIpKSwgY2ggPSByZWFkQ2hhcihyZWFkZXIpLCBsb29wKSA6XG4gICAgXCJcXFwiXCIgPT09IGNoID9cbiAgICAgIHJlUGF0dGVybihidWZmZXIpIDpcbiAgICBcImRlZmF1bHRcIiA/XG4gICAgICAoYnVmZmVyID0gXCJcIiArIGJ1ZmZlciArIGNoLCBjaCA9IHJlYWRDaGFyKHJlYWRlciksIGxvb3ApIDpcbiAgICAgIHZvaWQoMCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFwiXCIsIHJlYWRDaGFyKHJlYWRlcikpO1xufTtcbmV4cG9ydHMucmVhZFJlZ2V4ID0gcmVhZFJlZ2V4O1xuXG52YXIgcmVhZFBhcmFtID0gZnVuY3Rpb24gcmVhZFBhcmFtKHJlYWRlciwgaW5pdGNoKSB7XG4gIHZhciBmb3JtID0gcmVhZFN5bWJvbChyZWFkZXIsIGluaXRjaCk7XG4gIHJldHVybiBpc0VxdWFsKGZvcm0sIHN5bWJvbChcIiVcIikpID9cbiAgICBzeW1ib2woXCIlMVwiKSA6XG4gICAgZm9ybTtcbn07XG5leHBvcnRzLnJlYWRQYXJhbSA9IHJlYWRQYXJhbTtcblxudmFyIGlzUGFyYW0gPSBmdW5jdGlvbiBpc1BhcmFtKGZvcm0pIHtcbiAgcmV0dXJuIChpc1N5bWJvbChmb3JtKSkgJiYgKFwiJVwiID09PSBmaXJzdChuYW1lKGZvcm0pKSk7XG59O1xuZXhwb3J0cy5pc1BhcmFtID0gaXNQYXJhbTtcblxudmFyIGxhbWJkYVBhcmFtc0hhc2ggPSBmdW5jdGlvbiBsYW1iZGFQYXJhbXNIYXNoKGZvcm0pIHtcbiAgcmV0dXJuIGlzUGFyYW0oZm9ybSkgP1xuICAgIGRpY3Rpb25hcnkoZm9ybSwgZm9ybSkgOlxuICAoaXNEaWN0aW9uYXJ5KGZvcm0pKSB8fCAoaXNWZWN0b3IoZm9ybSkpIHx8IChpc0xpc3QoZm9ybSkpID9cbiAgICBjb25qLmFwcGx5KGNvbmosIG1hcChsYW1iZGFQYXJhbXNIYXNoLCB2ZWMoZm9ybSkpKSA6XG4gIFwiZWxzZVwiID9cbiAgICB7fSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmxhbWJkYVBhcmFtc0hhc2ggPSBsYW1iZGFQYXJhbXNIYXNoO1xuXG52YXIgbGFtYmRhUGFyYW1zID0gZnVuY3Rpb24gbGFtYmRhUGFyYW1zKGJvZHkpIHtcbiAgdmFyIG5hbWVzID0gc29ydCh2YWxzKGxhbWJkYVBhcmFtc0hhc2goYm9keSkpKTtcbiAgdmFyIHZhcmlhZGljID0gaXNFcXVhbChmaXJzdChuYW1lcyksIHN5bWJvbChcIiUmXCIpKTtcbiAgdmFyIG4gPSB2YXJpYWRpYyAmJiAoY291bnQobmFtZXMpID09PSAxKSA/XG4gICAgMCA6XG4gICAgcGFyc2VJbnQocmVzdChuYW1lKGxhc3QobmFtZXMpKSkpO1xuICB2YXIgcGFyYW1zID0gKGZ1bmN0aW9uIGxvb3AobmFtZXMsIGkpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBpIDw9IG4gP1xuICAgICAgKG5hbWVzID0gY29uaihuYW1lcywgc3ltYm9sKFwiXCIgKyBcIiVcIiArIGkpKSwgaSA9IGluYyhpKSwgbG9vcCkgOlxuICAgICAgbmFtZXM7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFtdLCAxKTtcbiAgcmV0dXJuIHZhcmlhZGljID9cbiAgICBjb25qKHBhcmFtcywgc3ltYm9sKHZvaWQoMCksIFwiJlwiKSwgc3ltYm9sKHZvaWQoMCksIFwiJSZcIikpIDpcbiAgICBuYW1lcztcbn07XG5leHBvcnRzLmxhbWJkYVBhcmFtcyA9IGxhbWJkYVBhcmFtcztcblxudmFyIHJlYWRMYW1iZGEgPSBmdW5jdGlvbiByZWFkTGFtYmRhKHJlYWRlcikge1xuICB2YXIgYm9keSA9IHJlYWRMaXN0KHJlYWRlcik7XG4gIHJldHVybiBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImZuXCIpLCBsYW1iZGFQYXJhbXMoYm9keSksIGJvZHkpO1xufTtcbmV4cG9ydHMucmVhZExhbWJkYSA9IHJlYWRMYW1iZGE7XG5cbnZhciByZWFkRGlzY2FyZCA9IGZ1bmN0aW9uIHJlYWREaXNjYXJkKHJlYWRlciwgXykge1xuICByZWFkKHJlYWRlciwgdHJ1ZSwgdm9pZCgwKSwgdHJ1ZSk7XG4gIHJldHVybiByZWFkZXI7XG59O1xuZXhwb3J0cy5yZWFkRGlzY2FyZCA9IHJlYWREaXNjYXJkO1xuXG52YXIgbWFjcm9zID0gZnVuY3Rpb24gbWFjcm9zKGMpIHtcbiAgcmV0dXJuIGMgPT09IFwiXFxcIlwiID9cbiAgICByZWFkU3RyaW5nIDpcbiAgYyA9PT0gXCI6XCIgP1xuICAgIHJlYWRLZXl3b3JkIDpcbiAgYyA9PT0gXCI7XCIgP1xuICAgIHJlYWRDb21tZW50IDpcbiAgYyA9PT0gXCInXCIgP1xuICAgIHdyYXBwaW5nUmVhZGVyKHN5bWJvbCh2b2lkKDApLCBcInF1b3RlXCIpKSA6XG4gIGMgPT09IFwiQFwiID9cbiAgICB3cmFwcGluZ1JlYWRlcihzeW1ib2wodm9pZCgwKSwgXCJkZXJlZlwiKSkgOlxuICBjID09PSBcIl5cIiA/XG4gICAgcmVhZE1ldGEgOlxuICBjID09PSBcImBcIiA/XG4gICAgd3JhcHBpbmdSZWFkZXIoc3ltYm9sKHZvaWQoMCksIFwic3ludGF4LXF1b3RlXCIpKSA6XG4gIGMgPT09IFwiflwiID9cbiAgICByZWFkVW5xdW90ZSA6XG4gIGMgPT09IFwiKFwiID9cbiAgICByZWFkTGlzdCA6XG4gIGMgPT09IFwiKVwiID9cbiAgICByZWFkVW5tYXRjaGVkRGVsaW1pdGVyIDpcbiAgYyA9PT0gXCJbXCIgP1xuICAgIHJlYWRWZWN0b3IgOlxuICBjID09PSBcIl1cIiA/XG4gICAgcmVhZFVubWF0Y2hlZERlbGltaXRlciA6XG4gIGMgPT09IFwie1wiID9cbiAgICByZWFkTWFwIDpcbiAgYyA9PT0gXCJ9XCIgP1xuICAgIHJlYWRVbm1hdGNoZWREZWxpbWl0ZXIgOlxuICBjID09PSBcIlxcXFxcIiA/XG4gICAgcmVhZENoYXIgOlxuICBjID09PSBcIiVcIiA/XG4gICAgcmVhZFBhcmFtIDpcbiAgYyA9PT0gXCIjXCIgP1xuICAgIHJlYWREaXNwYXRjaCA6XG4gIFwiZWxzZVwiID9cbiAgICB2b2lkKDApIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMubWFjcm9zID0gbWFjcm9zO1xuXG52YXIgZGlzcGF0Y2hNYWNyb3MgPSBmdW5jdGlvbiBkaXNwYXRjaE1hY3JvcyhzKSB7XG4gIHJldHVybiBzID09PSBcIntcIiA/XG4gICAgcmVhZFNldCA6XG4gIHMgPT09IFwiKFwiID9cbiAgICByZWFkTGFtYmRhIDpcbiAgcyA9PT0gXCI8XCIgP1xuICAgIHRocm93aW5nUmVhZGVyKFwiVW5yZWFkYWJsZSBmb3JtXCIpIDpcbiAgcyA9PT0gXCJcXFwiXCIgP1xuICAgIHJlYWRSZWdleCA6XG4gIHMgPT09IFwiIVwiID9cbiAgICByZWFkQ29tbWVudCA6XG4gIHMgPT09IFwiX1wiID9cbiAgICByZWFkRGlzY2FyZCA6XG4gIFwiZWxzZVwiID9cbiAgICB2b2lkKDApIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuZGlzcGF0Y2hNYWNyb3MgPSBkaXNwYXRjaE1hY3JvcztcblxudmFyIHJlYWRGb3JtID0gZnVuY3Rpb24gcmVhZEZvcm0ocmVhZGVyLCBjaCkge1xuICB2YXIgc3RhcnQgPSB7XG4gICAgXCJsaW5lXCI6IChyZWFkZXIgfHwgMClbXCJsaW5lXCJdLFxuICAgIFwiY29sdW1uXCI6IChyZWFkZXIgfHwgMClbXCJjb2x1bW5cIl1cbiAgfTtcbiAgdmFyIHJlYWRNYWNybyA9IG1hY3JvcyhjaCk7XG4gIHZhciBmb3JtID0gcmVhZE1hY3JvID9cbiAgICByZWFkTWFjcm8ocmVhZGVyLCBjaCkgOlxuICBpc051bWJlckxpdGVyYWwocmVhZGVyLCBjaCkgP1xuICAgIHJlYWROdW1iZXIocmVhZGVyLCBjaCkgOlxuICBcImVsc2VcIiA/XG4gICAgcmVhZFN5bWJvbChyZWFkZXIsIGNoKSA6XG4gICAgdm9pZCgwKTtcbiAgcmV0dXJuIGZvcm0gPT09IHJlYWRlciA/XG4gICAgZm9ybSA6XG4gICEoKGlzU3RyaW5nKGZvcm0pKSB8fCAoaXNOdW1iZXIoZm9ybSkpIHx8IChpc0Jvb2xlYW4oZm9ybSkpIHx8IChpc05pbChmb3JtKSkgfHwgKGlzS2V5d29yZChmb3JtKSkpID9cbiAgICB3aXRoTWV0YShmb3JtLCBjb25qKHtcbiAgICAgIFwic3RhcnRcIjogc3RhcnQsXG4gICAgICBcImVuZFwiOiB7XG4gICAgICAgIFwibGluZVwiOiAocmVhZGVyIHx8IDApW1wibGluZVwiXSxcbiAgICAgICAgXCJjb2x1bW5cIjogKHJlYWRlciB8fCAwKVtcImNvbHVtblwiXVxuICAgICAgfVxuICAgIH0sIG1ldGEoZm9ybSkpKSA6XG4gIFwiZWxzZVwiID9cbiAgICBmb3JtIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMucmVhZEZvcm0gPSByZWFkRm9ybTtcblxudmFyIHJlYWQgPSBmdW5jdGlvbiByZWFkKHJlYWRlciwgZW9mSXNFcnJvciwgc2VudGluZWwsIGlzUmVjdXJzaXZlKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcCgpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY2ggPSByZWFkQ2hhcihyZWFkZXIpO1xuICAgICAgdmFyIGZvcm0gPSBpc05pbChjaCkgP1xuICAgICAgICBlb2ZJc0Vycm9yID9cbiAgICAgICAgICByZWFkZXJFcnJvcihyZWFkZXIsIFwiRU9GXCIpIDpcbiAgICAgICAgICBzZW50aW5lbCA6XG4gICAgICBpc1doaXRlc3BhY2UoY2gpID9cbiAgICAgICAgcmVhZGVyIDpcbiAgICAgIGlzQ29tbWVudFByZWZpeChjaCkgP1xuICAgICAgICByZWFkKHJlYWRDb21tZW50KHJlYWRlciwgY2gpLCBlb2ZJc0Vycm9yLCBzZW50aW5lbCwgaXNSZWN1cnNpdmUpIDpcbiAgICAgIFwiZWxzZVwiID9cbiAgICAgICAgcmVhZEZvcm0ocmVhZGVyLCBjaCkgOlxuICAgICAgICB2b2lkKDApO1xuICAgICAgcmV0dXJuIGZvcm0gPT09IHJlYWRlciA/XG4gICAgICAgIChsb29wKSA6XG4gICAgICAgIGZvcm07XG4gICAgfSkoKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoKTtcbn07XG5leHBvcnRzLnJlYWQgPSByZWFkO1xuXG52YXIgcmVhZF8gPSBmdW5jdGlvbiByZWFkXyhzb3VyY2UsIHVyaSkge1xuICB2YXIgcmVhZGVyID0gcHVzaEJhY2tSZWFkZXIoc291cmNlLCB1cmkpO1xuICB2YXIgZW9mID0gZ2Vuc3ltKCk7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChmb3JtcywgZm9ybSkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGZvcm0gPT09IGVvZiA/XG4gICAgICBmb3JtcyA6XG4gICAgICAoZm9ybXMgPSBjb25qKGZvcm1zLCBmb3JtKSwgZm9ybSA9IHJlYWQocmVhZGVyLCBmYWxzZSwgZW9mLCBmYWxzZSksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShbXSwgcmVhZChyZWFkZXIsIGZhbHNlLCBlb2YsIGZhbHNlKSk7XG59O1xuZXhwb3J0cy5yZWFkXyA9IHJlYWRfO1xuXG52YXIgcmVhZEZyb21TdHJpbmcgPSBmdW5jdGlvbiByZWFkRnJvbVN0cmluZyhzb3VyY2UsIHVyaSkge1xuICB2YXIgcmVhZGVyID0gcHVzaEJhY2tSZWFkZXIoc291cmNlLCB1cmkpO1xuICByZXR1cm4gcmVhZChyZWFkZXIsIHRydWUsIHZvaWQoMCksIGZhbHNlKTtcbn07XG5leHBvcnRzLnJlYWRGcm9tU3RyaW5nID0gcmVhZEZyb21TdHJpbmc7XG5cbnZhciByZWFkVXVpZCA9IGZ1bmN0aW9uIHJlYWRVdWlkKHV1aWQpIHtcbiAgcmV0dXJuIGlzU3RyaW5nKHV1aWQpID9cbiAgICBsaXN0KHN5bWJvbCh2b2lkKDApLCBcIlVVSUQuXCIpLCB1dWlkKSA6XG4gICAgcmVhZGVyRXJyb3Iodm9pZCgwKSwgXCJVVUlEIGxpdGVyYWwgZXhwZWN0cyBhIHN0cmluZyBhcyBpdHMgcmVwcmVzZW50YXRpb24uXCIpO1xufTtcblxudmFyIHJlYWRRdWV1ZSA9IGZ1bmN0aW9uIHJlYWRRdWV1ZShpdGVtcykge1xuICByZXR1cm4gaXNWZWN0b3IoaXRlbXMpID9cbiAgICBsaXN0KHN5bWJvbCh2b2lkKDApLCBcIlBlcnNpc3RlbnRRdWV1ZS5cIiksIGl0ZW1zKSA6XG4gICAgcmVhZGVyRXJyb3Iodm9pZCgwKSwgXCJRdWV1ZSBsaXRlcmFsIGV4cGVjdHMgYSB2ZWN0b3IgZm9yIGl0cyBlbGVtZW50cy5cIik7XG59O1xuXG52YXIgX190YWdUYWJsZV9fID0gZGljdGlvbmFyeShcInV1aWRcIiwgcmVhZFV1aWQsIFwicXVldWVcIiwgcmVhZFF1ZXVlKTtcbmV4cG9ydHMuX190YWdUYWJsZV9fID0gX190YWdUYWJsZV9fO1xuXG52YXIgbWF5YmVSZWFkVGFnZ2VkVHlwZSA9IGZ1bmN0aW9uIG1heWJlUmVhZFRhZ2dlZFR5cGUocmVhZGVyLCBpbml0Y2gpIHtcbiAgdmFyIHRhZyA9IHJlYWRTeW1ib2wocmVhZGVyLCBpbml0Y2gpO1xuICB2YXIgcGZuID0gKF9fdGFnVGFibGVfXyB8fCAwKVtuYW1lKHRhZyldO1xuICByZXR1cm4gcGZuID9cbiAgICBwZm4ocmVhZChyZWFkZXIsIHRydWUsIHZvaWQoMCksIGZhbHNlKSkgOlxuICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJcIiArIFwiQ291bGQgbm90IGZpbmQgdGFnIHBhcnNlciBmb3IgXCIgKyAobmFtZSh0YWcpKSArIFwiIGluIFwiICsgKFwiXCIgKyAoa2V5cyhfX3RhZ1RhYmxlX18pKSkpO1xufTtcbmV4cG9ydHMubWF5YmVSZWFkVGFnZ2VkVHlwZSA9IG1heWJlUmVhZFRhZ2dlZFR5cGVcbiIsInZhciBfbnNfID0gXCJ3aXNwLmNvbXBpbGVyXCI7XG5tb2R1bGUubmFtZXNwYWNlID0gX25zXztcbm1vZHVsZS5kZXNjcmlwdGlvbiA9IFwid2lzcCBsYW5ndWFnZSBjb21waWxlclwiO1xudmFyIHJlYWRGcm9tU3RyaW5nID0gKHJlcXVpcmUoXCIuL3JlYWRlclwiKSkucmVhZEZyb21TdHJpbmc7XG52YXIgbWV0YSA9IChyZXF1aXJlKFwiLi9hc3RcIikpLm1ldGE7XG52YXIgd2l0aE1ldGEgPSAocmVxdWlyZShcIi4vYXN0XCIpKS53aXRoTWV0YTtcbnZhciBpc1N5bWJvbCA9IChyZXF1aXJlKFwiLi9hc3RcIikpLmlzU3ltYm9sO1xudmFyIHN5bWJvbCA9IChyZXF1aXJlKFwiLi9hc3RcIikpLnN5bWJvbDtcbnZhciBpc0tleXdvcmQgPSAocmVxdWlyZShcIi4vYXN0XCIpKS5pc0tleXdvcmQ7XG52YXIga2V5d29yZCA9IChyZXF1aXJlKFwiLi9hc3RcIikpLmtleXdvcmQ7XG52YXIgbmFtZXNwYWNlID0gKHJlcXVpcmUoXCIuL2FzdFwiKSkubmFtZXNwYWNlO1xudmFyIGlzVW5xdW90ZSA9IChyZXF1aXJlKFwiLi9hc3RcIikpLmlzVW5xdW90ZTtcbnZhciBpc1VucXVvdGVTcGxpY2luZyA9IChyZXF1aXJlKFwiLi9hc3RcIikpLmlzVW5xdW90ZVNwbGljaW5nO1xudmFyIGlzUXVvdGUgPSAocmVxdWlyZShcIi4vYXN0XCIpKS5pc1F1b3RlO1xudmFyIGlzU3ludGF4UXVvdGUgPSAocmVxdWlyZShcIi4vYXN0XCIpKS5pc1N5bnRheFF1b3RlO1xudmFyIG5hbWUgPSAocmVxdWlyZShcIi4vYXN0XCIpKS5uYW1lO1xudmFyIGdlbnN5bSA9IChyZXF1aXJlKFwiLi9hc3RcIikpLmdlbnN5bTtcbnZhciBwclN0ciA9IChyZXF1aXJlKFwiLi9hc3RcIikpLnByU3RyO1xudmFyIGlzRW1wdHkgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLmlzRW1wdHk7XG52YXIgY291bnQgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLmNvdW50O1xudmFyIGlzTGlzdCA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkuaXNMaXN0O1xudmFyIGxpc3QgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLmxpc3Q7XG52YXIgZmlyc3QgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLmZpcnN0O1xudmFyIHNlY29uZCA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkuc2Vjb25kO1xudmFyIHRoaXJkID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS50aGlyZDtcbnZhciByZXN0ID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5yZXN0O1xudmFyIGNvbnMgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLmNvbnM7XG52YXIgY29uaiA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkuY29uajtcbnZhciByZXZlcnNlID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5yZXZlcnNlO1xudmFyIHJlZHVjZSA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkucmVkdWNlO1xudmFyIHZlYyA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkudmVjO1xudmFyIGxhc3QgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLmxhc3Q7XG52YXIgcmVwZWF0ID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5yZXBlYXQ7XG52YXIgbWFwID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5tYXA7XG52YXIgZmlsdGVyID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5maWx0ZXI7XG52YXIgdGFrZSA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkudGFrZTtcbnZhciBjb25jYXQgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLmNvbmNhdDtcbnZhciBpc09kZCA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc09kZDtcbnZhciBpc0RpY3Rpb25hcnkgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNEaWN0aW9uYXJ5O1xudmFyIGRpY3Rpb25hcnkgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuZGljdGlvbmFyeTtcbnZhciBtZXJnZSA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5tZXJnZTtcbnZhciBrZXlzID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmtleXM7XG52YXIgdmFscyA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS52YWxzO1xudmFyIGlzQ29udGFpbnNWZWN0b3IgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNDb250YWluc1ZlY3RvcjtcbnZhciBtYXBEaWN0aW9uYXJ5ID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLm1hcERpY3Rpb25hcnk7XG52YXIgaXNTdHJpbmcgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNTdHJpbmc7XG52YXIgaXNOdW1iZXIgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNOdW1iZXI7XG52YXIgaXNWZWN0b3IgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNWZWN0b3I7XG52YXIgaXNCb29sZWFuID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmlzQm9vbGVhbjtcbnZhciBzdWJzID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLnN1YnM7XG52YXIgcmVGaW5kID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLnJlRmluZDtcbnZhciBpc1RydWUgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNUcnVlO1xudmFyIGlzRmFsc2UgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNGYWxzZTtcbnZhciBpc05pbCA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc05pbDtcbnZhciBpc1JlUGF0dGVybiA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc1JlUGF0dGVybjtcbnZhciBpbmMgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaW5jO1xudmFyIGRlYyA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5kZWM7XG52YXIgc3RyID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLnN0cjtcbnZhciBjaGFyID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmNoYXI7XG52YXIgaW50ID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmludDtcbnZhciBpc0VxdWFsID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmlzRXF1YWw7XG52YXIgaXNTdHJpY3RFcXVhbCA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc1N0cmljdEVxdWFsO1xudmFyIHNwbGl0ID0gKHJlcXVpcmUoXCIuL3N0cmluZ1wiKSkuc3BsaXQ7XG52YXIgam9pbiA9IChyZXF1aXJlKFwiLi9zdHJpbmdcIikpLmpvaW47XG52YXIgdXBwZXJDYXNlID0gKHJlcXVpcmUoXCIuL3N0cmluZ1wiKSkudXBwZXJDYXNlO1xudmFyIHJlcGxhY2UgPSAocmVxdWlyZShcIi4vc3RyaW5nXCIpKS5yZXBsYWNlO1xudmFyIHdyaXRlUmVmZXJlbmNlID0gKHJlcXVpcmUoXCIuL2JhY2tlbmQvamF2YXNjcmlwdC93cml0ZXJcIikpLndyaXRlUmVmZXJlbmNlO1xudmFyIHdyaXRlS2V5d29yZFJlZmVyZW5jZSA9IChyZXF1aXJlKFwiLi9iYWNrZW5kL2phdmFzY3JpcHQvd3JpdGVyXCIpKS53cml0ZUtleXdvcmRSZWZlcmVuY2U7XG52YXIgd3JpdGVLZXl3b3JkID0gKHJlcXVpcmUoXCIuL2JhY2tlbmQvamF2YXNjcmlwdC93cml0ZXJcIikpLndyaXRlS2V5d29yZDtcbnZhciB3cml0ZVN5bWJvbCA9IChyZXF1aXJlKFwiLi9iYWNrZW5kL2phdmFzY3JpcHQvd3JpdGVyXCIpKS53cml0ZVN5bWJvbDtcbnZhciB3cml0ZU5pbCA9IChyZXF1aXJlKFwiLi9iYWNrZW5kL2phdmFzY3JpcHQvd3JpdGVyXCIpKS53cml0ZU5pbDtcbnZhciB3cml0ZUNvbW1lbnQgPSAocmVxdWlyZShcIi4vYmFja2VuZC9qYXZhc2NyaXB0L3dyaXRlclwiKSkud3JpdGVDb21tZW50O1xudmFyIHdyaXRlTnVtYmVyID0gKHJlcXVpcmUoXCIuL2JhY2tlbmQvamF2YXNjcmlwdC93cml0ZXJcIikpLndyaXRlTnVtYmVyO1xudmFyIHdyaXRlU3RyaW5nID0gKHJlcXVpcmUoXCIuL2JhY2tlbmQvamF2YXNjcmlwdC93cml0ZXJcIikpLndyaXRlU3RyaW5nO1xudmFyIHdyaXRlTnVtYmVyID0gKHJlcXVpcmUoXCIuL2JhY2tlbmQvamF2YXNjcmlwdC93cml0ZXJcIikpLndyaXRlTnVtYmVyO1xudmFyIHdyaXRlQm9vbGVhbiA9IChyZXF1aXJlKFwiLi9iYWNrZW5kL2phdmFzY3JpcHQvd3JpdGVyXCIpKS53cml0ZUJvb2xlYW47O1xuXG52YXIgaXNTZWxmRXZhbHVhdGluZyA9IGZ1bmN0aW9uIGlzU2VsZkV2YWx1YXRpbmcoZm9ybSkge1xuICByZXR1cm4gKGlzTnVtYmVyKGZvcm0pKSB8fCAoKGlzU3RyaW5nKGZvcm0pKSAmJiAoIShpc1N5bWJvbChmb3JtKSkpICYmICghKGlzS2V5d29yZChmb3JtKSkpKSB8fCAoaXNCb29sZWFuKGZvcm0pKSB8fCAoaXNOaWwoZm9ybSkpIHx8IChpc1JlUGF0dGVybihmb3JtKSk7XG59O1xuZXhwb3J0cy5pc1NlbGZFdmFsdWF0aW5nID0gaXNTZWxmRXZhbHVhdGluZztcblxudmFyIF9fbWFjcm9zX18gPSB7fTtcbmV4cG9ydHMuX19tYWNyb3NfXyA9IF9fbWFjcm9zX187XG5cbnZhciBleGVjdXRlTWFjcm8gPSBmdW5jdGlvbiBleGVjdXRlTWFjcm8obmFtZSwgZm9ybSkge1xuICByZXR1cm4gKF9fbWFjcm9zX18gfHwgMClbbmFtZV0uYXBwbHkoKF9fbWFjcm9zX18gfHwgMClbbmFtZV0sIHZlYyhmb3JtKSk7XG59O1xuZXhwb3J0cy5leGVjdXRlTWFjcm8gPSBleGVjdXRlTWFjcm87XG5cbnZhciBpbnN0YWxsTWFjcm8gPSBmdW5jdGlvbiBpbnN0YWxsTWFjcm8obmFtZSwgbWFjcm9Gbikge1xuICByZXR1cm4gKF9fbWFjcm9zX18gfHwgMClbbmFtZV0gPSBtYWNyb0ZuO1xufTtcbmV4cG9ydHMuaW5zdGFsbE1hY3JvID0gaW5zdGFsbE1hY3JvO1xuXG52YXIgaXNNYWNybyA9IGZ1bmN0aW9uIGlzTWFjcm8obmFtZSkge1xuICByZXR1cm4gKGlzU3ltYm9sKG5hbWUpKSAmJiAoKF9fbWFjcm9zX18gfHwgMClbbmFtZV0pICYmIHRydWU7XG59O1xuZXhwb3J0cy5pc01hY3JvID0gaXNNYWNybztcblxudmFyIG1ha2VNYWNybyA9IGZ1bmN0aW9uIG1ha2VNYWNybyhwYXR0ZXJuLCBib2R5KSB7XG4gIHZhciBtYWNyb0ZuID0gY29uY2F0KGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZm5cIiksIHBhdHRlcm4pLCBib2R5KTtcbiAgcmV0dXJuIGV2YWwoXCJcIiArIFwiKFwiICsgKGNvbXBpbGUobWFjcm9leHBhbmQobWFjcm9GbikpKSArIFwiKVwiKTtcbn07XG5leHBvcnRzLm1ha2VNYWNybyA9IG1ha2VNYWNybztcblxuaW5zdGFsbE1hY3JvKHN5bWJvbCh2b2lkKDApLCBcImRlZm1hY3JvXCIpLCBmdW5jdGlvbihuYW1lLCBzaWduYXR1cmUpIHtcbiAgdmFyIGJvZHkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICByZXR1cm4gaW5zdGFsbE1hY3JvKG5hbWUsIG1ha2VNYWNybyhzaWduYXR1cmUsIGJvZHkpKTtcbn0pO1xuXG52YXIgX19zcGVjaWFsc19fID0ge307XG5leHBvcnRzLl9fc3BlY2lhbHNfXyA9IF9fc3BlY2lhbHNfXztcblxudmFyIGluc3RhbGxTcGVjaWFsID0gZnVuY3Rpb24gaW5zdGFsbFNwZWNpYWwobmFtZSwgZiwgdmFsaWRhdG9yKSB7XG4gIHJldHVybiAoX19zcGVjaWFsc19fIHx8IDApW25hbWVdID0gZnVuY3Rpb24oZm9ybSkge1xuICAgIHZhbGlkYXRvciA/XG4gICAgICB2YWxpZGF0b3IoZm9ybSkgOlxuICAgICAgdm9pZCgwKTtcbiAgICByZXR1cm4gZih3aXRoTWV0YShyZXN0KGZvcm0pLCBtZXRhKGZvcm0pKSk7XG4gIH07XG59O1xuZXhwb3J0cy5pbnN0YWxsU3BlY2lhbCA9IGluc3RhbGxTcGVjaWFsO1xuXG52YXIgaXNTcGVjaWFsID0gZnVuY3Rpb24gaXNTcGVjaWFsKG5hbWUpIHtcbiAgcmV0dXJuIChpc1N5bWJvbChuYW1lKSkgJiYgKChfX3NwZWNpYWxzX18gfHwgMClbbmFtZV0pICYmIHRydWU7XG59O1xuZXhwb3J0cy5pc1NwZWNpYWwgPSBpc1NwZWNpYWw7XG5cbnZhciBleGVjdXRlU3BlY2lhbCA9IGZ1bmN0aW9uIGV4ZWN1dGVTcGVjaWFsKG5hbWUsIGZvcm0pIHtcbiAgcmV0dXJuICgoX19zcGVjaWFsc19fIHx8IDApW25hbWVdKShmb3JtKTtcbn07XG5leHBvcnRzLmV4ZWN1dGVTcGVjaWFsID0gZXhlY3V0ZVNwZWNpYWw7XG5cbnZhciBvcHQgPSBmdW5jdGlvbiBvcHQoYXJndW1lbnQsIGZhbGxiYWNrKSB7XG4gIHJldHVybiAoaXNOaWwoYXJndW1lbnQpKSB8fCAoaXNFbXB0eShhcmd1bWVudCkpID9cbiAgICBmYWxsYmFjayA6XG4gICAgZmlyc3QoYXJndW1lbnQpO1xufTtcbmV4cG9ydHMub3B0ID0gb3B0O1xuXG52YXIgYXBwbHlGb3JtID0gZnVuY3Rpb24gYXBwbHlGb3JtKGZuTmFtZSwgZm9ybSwgaXNRdW90ZWQpIHtcbiAgcmV0dXJuIGNvbnMoZm5OYW1lLCBpc1F1b3RlZCA/XG4gICAgbWFwKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInF1b3RlXCIpLCBlKTtcbiAgICB9LCBmb3JtKSA6XG4gICAgZm9ybSwgZm9ybSk7XG59O1xuZXhwb3J0cy5hcHBseUZvcm0gPSBhcHBseUZvcm07XG5cbnZhciBhcHBseVVucXVvdGVkRm9ybSA9IGZ1bmN0aW9uIGFwcGx5VW5xdW90ZWRGb3JtKGZuTmFtZSwgZm9ybSkge1xuICByZXR1cm4gY29ucyhmbk5hbWUsIG1hcChmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIGlzVW5xdW90ZShlKSA/XG4gICAgICBzZWNvbmQoZSkgOlxuICAgIChpc0xpc3QoZSkpICYmIChpc0tleXdvcmQoZmlyc3QoZSkpKSA/XG4gICAgICBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInN5bnRheC1xdW90ZVwiKSwgc2Vjb25kKGUpKSA6XG4gICAgICBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInN5bnRheC1xdW90ZVwiKSwgZSk7XG4gIH0sIGZvcm0pKTtcbn07XG5leHBvcnRzLmFwcGx5VW5xdW90ZWRGb3JtID0gYXBwbHlVbnF1b3RlZEZvcm07XG5cbnZhciBzcGxpdFNwbGljZXMgPSBmdW5jdGlvbiBzcGxpdFNwbGljZXMoZm9ybSwgZm5OYW1lKSB7XG4gIHZhciBtYWtlU3BsaWNlID0gZnVuY3Rpb24gbWFrZVNwbGljZShmb3JtKSB7XG4gICAgcmV0dXJuIChpc1NlbGZFdmFsdWF0aW5nKGZvcm0pKSB8fCAoaXNTeW1ib2woZm9ybSkpID9cbiAgICAgIGFwcGx5VW5xdW90ZWRGb3JtKGZuTmFtZSwgbGlzdChmb3JtKSkgOlxuICAgICAgYXBwbHlVbnF1b3RlZEZvcm0oZm5OYW1lLCBmb3JtKTtcbiAgfTtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKG5vZGVzLCBzbGljZXMsIGFjYykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkobm9kZXMpID9cbiAgICAgIHJldmVyc2UoaXNFbXB0eShhY2MpID9cbiAgICAgICAgc2xpY2VzIDpcbiAgICAgICAgY29ucyhtYWtlU3BsaWNlKHJldmVyc2UoYWNjKSksIHNsaWNlcykpIDpcbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBmaXJzdChub2Rlcyk7XG4gICAgICAgIHJldHVybiBpc1VucXVvdGVTcGxpY2luZyhub2RlKSA/XG4gICAgICAgICAgKG5vZGVzID0gcmVzdChub2RlcyksIHNsaWNlcyA9IGNvbnMoc2Vjb25kKG5vZGUpLCBpc0VtcHR5KGFjYykgP1xuICAgICAgICAgICAgc2xpY2VzIDpcbiAgICAgICAgICAgIGNvbnMobWFrZVNwbGljZShyZXZlcnNlKGFjYykpLCBzbGljZXMpKSwgYWNjID0gbGlzdCgpLCBsb29wKSA6XG4gICAgICAgICAgKG5vZGVzID0gcmVzdChub2RlcyksIHNsaWNlcyA9IHNsaWNlcywgYWNjID0gY29ucyhub2RlLCBhY2MpLCBsb29wKTtcbiAgICAgIH0pKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKGZvcm0sIGxpc3QoKSwgbGlzdCgpKTtcbn07XG5leHBvcnRzLnNwbGl0U3BsaWNlcyA9IHNwbGl0U3BsaWNlcztcblxudmFyIHN5bnRheFF1b3RlU3BsaXQgPSBmdW5jdGlvbiBzeW50YXhRdW90ZVNwbGl0KGFwcGVuZE5hbWUsIGZuTmFtZSwgZm9ybSkge1xuICB2YXIgc2xpY2VzID0gc3BsaXRTcGxpY2VzKGZvcm0sIGZuTmFtZSk7XG4gIHZhciBuID0gY291bnQoc2xpY2VzKTtcbiAgcmV0dXJuIG4gPT09IDAgP1xuICAgIGxpc3QoZm5OYW1lKSA6XG4gIG4gPT09IDEgP1xuICAgIGZpcnN0KHNsaWNlcykgOlxuICBcImRlZmF1bHRcIiA/XG4gICAgYXBwbHlGb3JtKGFwcGVuZE5hbWUsIHNsaWNlcykgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5zeW50YXhRdW90ZVNwbGl0ID0gc3ludGF4UXVvdGVTcGxpdDtcblxudmFyIGNvbXBpbGVPYmplY3QgPSBmdW5jdGlvbiBjb21waWxlT2JqZWN0KGZvcm0sIGlzUXVvdGVkKSB7XG4gIHJldHVybiBpc0tleXdvcmQoZm9ybSkgP1xuICAgIHdyaXRlS2V5d29yZChmb3JtKSA6XG4gIGlzU3ltYm9sKGZvcm0pID9cbiAgICB3cml0ZVN5bWJvbChmb3JtKSA6XG4gIGlzTnVtYmVyKGZvcm0pID9cbiAgICB3cml0ZU51bWJlcihmb3JtKSA6XG4gIGlzU3RyaW5nKGZvcm0pID9cbiAgICB3cml0ZVN0cmluZyhmb3JtKSA6XG4gIGlzQm9vbGVhbihmb3JtKSA/XG4gICAgd3JpdGVCb29sZWFuKGZvcm0pIDpcbiAgaXNOaWwoZm9ybSkgP1xuICAgIHdyaXRlTmlsKGZvcm0pIDpcbiAgaXNSZVBhdHRlcm4oZm9ybSkgP1xuICAgIGNvbXBpbGVSZVBhdHRlcm4oZm9ybSkgOlxuICBpc1ZlY3Rvcihmb3JtKSA/XG4gICAgY29tcGlsZShhcHBseUZvcm0oc3ltYm9sKHZvaWQoMCksIFwidmVjdG9yXCIpLCBsaXN0LmFwcGx5KGxpc3QsIGZvcm0pLCBpc1F1b3RlZCkpIDpcbiAgaXNMaXN0KGZvcm0pID9cbiAgICBjb21waWxlKGFwcGx5Rm9ybShzeW1ib2wodm9pZCgwKSwgXCJsaXN0XCIpLCBmb3JtLCBpc1F1b3RlZCkpIDpcbiAgaXNEaWN0aW9uYXJ5KGZvcm0pID9cbiAgICBjb21waWxlRGljdGlvbmFyeShpc1F1b3RlZCA/XG4gICAgICBtYXBEaWN0aW9uYXJ5KGZvcm0sIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwicXVvdGVcIiksIHgpO1xuICAgICAgfSkgOlxuICAgICAgZm9ybSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5jb21waWxlT2JqZWN0ID0gY29tcGlsZU9iamVjdDtcblxudmFyIGNvbXBpbGVTeW50YXhRdW90ZWRWZWN0b3IgPSBmdW5jdGlvbiBjb21waWxlU3ludGF4UXVvdGVkVmVjdG9yKGZvcm0pIHtcbiAgdmFyIGNvbmNhdEZvcm0gPSBzeW50YXhRdW90ZVNwbGl0KHN5bWJvbCh2b2lkKDApLCBcImNvbmNhdFwiKSwgc3ltYm9sKHZvaWQoMCksIFwidmVjdG9yXCIpLCBsaXN0LmFwcGx5KGxpc3QsIGZvcm0pKTtcbiAgcmV0dXJuIGNvbXBpbGUoY291bnQoY29uY2F0Rm9ybSkgPiAxID9cbiAgICBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInZlY1wiKSwgY29uY2F0Rm9ybSkgOlxuICAgIGNvbmNhdEZvcm0pO1xufTtcbmV4cG9ydHMuY29tcGlsZVN5bnRheFF1b3RlZFZlY3RvciA9IGNvbXBpbGVTeW50YXhRdW90ZWRWZWN0b3I7XG5cbnZhciBjb21waWxlU3ludGF4UXVvdGVkID0gZnVuY3Rpb24gY29tcGlsZVN5bnRheFF1b3RlZChmb3JtKSB7XG4gIHJldHVybiBpc0xpc3QoZm9ybSkgP1xuICAgIGNvbXBpbGUoc3ludGF4UXVvdGVTcGxpdChzeW1ib2wodm9pZCgwKSwgXCJjb25jYXRcIiksIHN5bWJvbCh2b2lkKDApLCBcImxpc3RcIiksIGZvcm0pKSA6XG4gIGlzVmVjdG9yKGZvcm0pID9cbiAgICBjb21waWxlU3ludGF4UXVvdGVkVmVjdG9yKGZvcm0pIDpcbiAgXCJlbHNlXCIgP1xuICAgIGNvbXBpbGVPYmplY3QoZm9ybSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5jb21waWxlU3ludGF4UXVvdGVkID0gY29tcGlsZVN5bnRheFF1b3RlZDtcblxudmFyIGNvbXBpbGUgPSBmdW5jdGlvbiBjb21waWxlKGZvcm0pIHtcbiAgcmV0dXJuIGlzU2VsZkV2YWx1YXRpbmcoZm9ybSkgP1xuICAgIGNvbXBpbGVPYmplY3QoZm9ybSkgOlxuICBpc1N5bWJvbChmb3JtKSA/XG4gICAgd3JpdGVSZWZlcmVuY2UoZm9ybSkgOlxuICBpc0tleXdvcmQoZm9ybSkgP1xuICAgIHdyaXRlS2V5d29yZFJlZmVyZW5jZShmb3JtKSA6XG4gIGlzVmVjdG9yKGZvcm0pID9cbiAgICBjb21waWxlT2JqZWN0KGZvcm0pIDpcbiAgaXNEaWN0aW9uYXJ5KGZvcm0pID9cbiAgICBjb21waWxlT2JqZWN0KGZvcm0pIDpcbiAgaXNMaXN0KGZvcm0pID9cbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaGVhZCA9IGZpcnN0KGZvcm0pO1xuICAgICAgcmV0dXJuIGlzRW1wdHkoZm9ybSkgP1xuICAgICAgICBjb21waWxlT2JqZWN0KGZvcm0sIHRydWUpIDpcbiAgICAgIGlzUXVvdGUoZm9ybSkgP1xuICAgICAgICBjb21waWxlT2JqZWN0KHNlY29uZChmb3JtKSwgdHJ1ZSkgOlxuICAgICAgaXNTeW50YXhRdW90ZShmb3JtKSA/XG4gICAgICAgIGNvbXBpbGVTeW50YXhRdW90ZWQoc2Vjb25kKGZvcm0pKSA6XG4gICAgICBpc1NwZWNpYWwoaGVhZCkgP1xuICAgICAgICBleGVjdXRlU3BlY2lhbChoZWFkLCBmb3JtKSA6XG4gICAgICBpc0tleXdvcmQoaGVhZCkgP1xuICAgICAgICBjb21waWxlKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZ2V0XCIpLCBzZWNvbmQoZm9ybSksIGhlYWQpKSA6XG4gICAgICBcImVsc2VcIiA/XG4gICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISgoaXNTeW1ib2woaGVhZCkpIHx8IChpc0xpc3QoaGVhZCkpKSA/XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7IHRocm93IGNvbXBpbGVyRXJyb3IoZm9ybSwgXCJcIiArIFwib3BlcmF0b3IgaXMgbm90IGEgcHJvY2VkdXJlOiBcIiArIGhlYWQpOyB9KSgpIDpcbiAgICAgICAgICAgIGNvbXBpbGVJbnZva2UoZm9ybSk7XG4gICAgICAgIH0pKCkgOlxuICAgICAgICB2b2lkKDApO1xuICAgIH0pKCkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5jb21waWxlID0gY29tcGlsZTtcblxudmFyIGNvbXBpbGVfID0gZnVuY3Rpb24gY29tcGlsZV8oZm9ybXMpIHtcbiAgcmV0dXJuIHJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGZvcm0pIHtcbiAgICByZXR1cm4gXCJcIiArIHJlc3VsdCArIChpc0VtcHR5KHJlc3VsdCkgP1xuICAgICAgXCJcIiA6XG4gICAgICBcIjtcXG5cXG5cIikgKyAoY29tcGlsZShpc0xpc3QoZm9ybSkgP1xuICAgICAgd2l0aE1ldGEobWFjcm9leHBhbmQoZm9ybSksIGNvbmooe1xuICAgICAgICBcInRvcFwiOiB0cnVlXG4gICAgICB9LCBtZXRhKGZvcm0pKSkgOlxuICAgICAgZm9ybSkpO1xuICB9LCBcIlwiLCBmb3Jtcyk7XG59O1xuZXhwb3J0cy5jb21waWxlXyA9IGNvbXBpbGVfO1xuXG52YXIgY29tcGlsZVByb2dyYW0gPSBmdW5jdGlvbiBjb21waWxlUHJvZ3JhbShmb3Jtcykge1xuICByZXR1cm4gcmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwgZm9ybSkge1xuICAgIHJldHVybiBcIlwiICsgcmVzdWx0ICsgKGlzRW1wdHkocmVzdWx0KSA/XG4gICAgICBcIlwiIDpcbiAgICAgIFwiO1xcblxcblwiKSArIChjb21waWxlKGlzTGlzdChmb3JtKSA/XG4gICAgICB3aXRoTWV0YShtYWNyb2V4cGFuZChmb3JtKSwgY29uaih7XG4gICAgICAgIFwidG9wXCI6IHRydWVcbiAgICAgIH0sIG1ldGEoZm9ybSkpKSA6XG4gICAgICBmb3JtKSk7XG4gIH0sIFwiXCIsIGZvcm1zKTtcbn07XG5leHBvcnRzLmNvbXBpbGVQcm9ncmFtID0gY29tcGlsZVByb2dyYW07XG5cbnZhciBtYWNyb2V4cGFuZDEgPSBmdW5jdGlvbiBtYWNyb2V4cGFuZDEoZm9ybSkge1xuICByZXR1cm4gaXNMaXN0KGZvcm0pID9cbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb3AgPSBmaXJzdChmb3JtKTtcbiAgICAgIHZhciBpZCA9IGlzU3ltYm9sKG9wKSA/XG4gICAgICAgIG5hbWUob3ApIDpcbiAgICAgICAgdm9pZCgwKTtcbiAgICAgIHJldHVybiBpc1NwZWNpYWwob3ApID9cbiAgICAgICAgZm9ybSA6XG4gICAgICBpc01hY3JvKG9wKSA/XG4gICAgICAgIGV4ZWN1dGVNYWNybyhvcCwgcmVzdChmb3JtKSkgOlxuICAgICAgKGlzU3ltYm9sKG9wKSkgJiYgKCEoaWQgPT09IFwiLlwiKSkgP1xuICAgICAgICBmaXJzdChpZCkgPT09IFwiLlwiID9cbiAgICAgICAgICBjb3VudChmb3JtKSA8IDIgP1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBFcnJvcihcIk1hbGZvcm1lZCBtZW1iZXIgZXhwcmVzc2lvbiwgZXhwZWN0aW5nICgubWVtYmVyIHRhcmdldCAuLi4pXCIpOyB9KSgpIDpcbiAgICAgICAgICAgIGNvbnMoc3ltYm9sKHZvaWQoMCksIFwiLlwiKSwgY29ucyhzZWNvbmQoZm9ybSksIGNvbnMoc3ltYm9sKHN1YnMoaWQsIDEpKSwgcmVzdChyZXN0KGZvcm0pKSkpKSA6XG4gICAgICAgIGxhc3QoaWQpID09PSBcIi5cIiA/XG4gICAgICAgICAgY29ucyhzeW1ib2wodm9pZCgwKSwgXCJuZXdcIiksIGNvbnMoc3ltYm9sKHN1YnMoaWQsIDAsIGRlYyhjb3VudChpZCkpKSksIHJlc3QoZm9ybSkpKSA6XG4gICAgICAgICAgZm9ybSA6XG4gICAgICBcImVsc2VcIiA/XG4gICAgICAgIGZvcm0gOlxuICAgICAgICB2b2lkKDApO1xuICAgIH0pKCkgOlxuICAgIGZvcm07XG59O1xuZXhwb3J0cy5tYWNyb2V4cGFuZDEgPSBtYWNyb2V4cGFuZDE7XG5cbnZhciBtYWNyb2V4cGFuZCA9IGZ1bmN0aW9uIG1hY3JvZXhwYW5kKGZvcm0pIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKG9yaWdpbmFsLCBleHBhbmRlZCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IG9yaWdpbmFsID09PSBleHBhbmRlZCA/XG4gICAgICBvcmlnaW5hbCA6XG4gICAgICAob3JpZ2luYWwgPSBleHBhbmRlZCwgZXhwYW5kZWQgPSBtYWNyb2V4cGFuZDEoZXhwYW5kZWQpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoZm9ybSwgbWFjcm9leHBhbmQxKGZvcm0pKTtcbn07XG5leHBvcnRzLm1hY3JvZXhwYW5kID0gbWFjcm9leHBhbmQ7XG5cbnZhciBfbGluZUJyZWFrUGF0dGVybl8gPSAvXFxuKD89W15cXG5dKS9tO1xuZXhwb3J0cy5fbGluZUJyZWFrUGF0dGVybl8gPSBfbGluZUJyZWFrUGF0dGVybl87XG5cbnZhciBpbmRlbnQgPSBmdW5jdGlvbiBpbmRlbnQoY29kZSwgaW5kZW50YXRpb24pIHtcbiAgcmV0dXJuIGpvaW4oaW5kZW50YXRpb24sIHNwbGl0KGNvZGUsIF9saW5lQnJlYWtQYXR0ZXJuXykpO1xufTtcbmV4cG9ydHMuaW5kZW50ID0gaW5kZW50O1xuXG52YXIgY29tcGlsZVRlbXBsYXRlID0gZnVuY3Rpb24gY29tcGlsZVRlbXBsYXRlKGZvcm0pIHtcbiAgdmFyIGluZGVudFBhdHRlcm4gPSAvXFxuICokLztcbiAgdmFyIGdldEluZGVudGF0aW9uID0gZnVuY3Rpb24oY29kZSkge1xuICAgIHJldHVybiAocmVGaW5kKGluZGVudFBhdHRlcm4sIGNvZGUpKSB8fCBcIlxcblwiO1xuICB9O1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoY29kZSwgcGFydHMsIHZhbHVlcykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGNvdW50KHBhcnRzKSA+IDEgP1xuICAgICAgKGNvZGUgPSBcIlwiICsgY29kZSArIChmaXJzdChwYXJ0cykpICsgKGluZGVudChcIlwiICsgKGZpcnN0KHZhbHVlcykpLCBnZXRJbmRlbnRhdGlvbihmaXJzdChwYXJ0cykpKSksIHBhcnRzID0gcmVzdChwYXJ0cyksIHZhbHVlcyA9IHJlc3QodmFsdWVzKSwgbG9vcCkgOlxuICAgICAgXCJcIiArIGNvZGUgKyAoZmlyc3QocGFydHMpKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoXCJcIiwgc3BsaXQoZmlyc3QoZm9ybSksIFwifnt9XCIpLCByZXN0KGZvcm0pKTtcbn07XG5leHBvcnRzLmNvbXBpbGVUZW1wbGF0ZSA9IGNvbXBpbGVUZW1wbGF0ZTtcblxudmFyIGNvbXBpbGVEZWYgPSBmdW5jdGlvbiBjb21waWxlRGVmKGZvcm0pIHtcbiAgdmFyIGlkID0gZmlyc3QoZm9ybSk7XG4gIHZhciBpc0V4cG9ydCA9ICgoKChtZXRhKGZvcm0pKSB8fCB7fSkgfHwgMClbXCJ0b3BcIl0pICYmICghKCgoKG1ldGEoaWQpKSB8fCB7fSkgfHwgMClbXCJwcml2YXRlXCJdKSk7XG4gIHZhciBhdHRyaWJ1dGUgPSBzeW1ib2wobmFtZXNwYWNlKGlkKSwgXCJcIiArIFwiLVwiICsgKG5hbWUoaWQpKSk7XG4gIHJldHVybiBpc0V4cG9ydCA/XG4gICAgY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ2YXIgfnt9O1xcbn57fVwiLCBjb21waWxlKGNvbnMoc3ltYm9sKHZvaWQoMCksIFwic2V0IVwiKSwgZm9ybSkpLCBjb21waWxlKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwic2V0IVwiKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCIuXCIpLCBzeW1ib2wodm9pZCgwKSwgXCJleHBvcnRzXCIpLCBhdHRyaWJ1dGUpLCBpZCkpKSkgOlxuICAgIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwidmFyIH57fVwiLCBjb21waWxlKGNvbnMoc3ltYm9sKHZvaWQoMCksIFwic2V0IVwiKSwgZm9ybSkpKSk7XG59O1xuZXhwb3J0cy5jb21waWxlRGVmID0gY29tcGlsZURlZjtcblxudmFyIGNvbXBpbGVJZkVsc2UgPSBmdW5jdGlvbiBjb21waWxlSWZFbHNlKGZvcm0pIHtcbiAgdmFyIGNvbmRpdGlvbiA9IG1hY3JvZXhwYW5kKGZpcnN0KGZvcm0pKTtcbiAgdmFyIHRoZW5FeHByZXNzaW9uID0gbWFjcm9leHBhbmQoc2Vjb25kKGZvcm0pKTtcbiAgdmFyIGVsc2VFeHByZXNzaW9uID0gbWFjcm9leHBhbmQodGhpcmQoZm9ybSkpO1xuICByZXR1cm4gY29tcGlsZVRlbXBsYXRlKGxpc3QoKGlzTGlzdChlbHNlRXhwcmVzc2lvbikpICYmIChpc0VxdWFsKGZpcnN0KGVsc2VFeHByZXNzaW9uKSwgc3ltYm9sKHZvaWQoMCksIFwiaWZcIikpKSA/XG4gICAgXCJ+e30gP1xcbiAgfnt9IDpcXG5+e31cIiA6XG4gICAgXCJ+e30gP1xcbiAgfnt9IDpcXG4gIH57fVwiLCBjb21waWxlKGNvbmRpdGlvbiksIGNvbXBpbGUodGhlbkV4cHJlc3Npb24pLCBjb21waWxlKGVsc2VFeHByZXNzaW9uKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZUlmRWxzZSA9IGNvbXBpbGVJZkVsc2U7XG5cbnZhciBjb21waWxlRGljdGlvbmFyeSA9IGZ1bmN0aW9uIGNvbXBpbGVEaWN0aW9uYXJ5KGZvcm0pIHtcbiAgdmFyIGJvZHkgPSAoZnVuY3Rpb24gbG9vcChib2R5LCBuYW1lcykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkobmFtZXMpID9cbiAgICAgIGJvZHkgOlxuICAgICAgKGJvZHkgPSBcIlwiICsgKGlzTmlsKGJvZHkpID9cbiAgICAgICAgXCJcIiA6XG4gICAgICAgIFwiXCIgKyBib2R5ICsgXCIsXFxuXCIpICsgKGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwifnt9OiB+e31cIiwgY29tcGlsZShmaXJzdChuYW1lcykpLCBjb21waWxlKG1hY3JvZXhwYW5kKChmb3JtIHx8IDApW2ZpcnN0KG5hbWVzKV0pKSkpKSwgbmFtZXMgPSByZXN0KG5hbWVzKSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKHZvaWQoMCksIGtleXMoZm9ybSkpO1xuICByZXR1cm4gaXNOaWwoYm9keSkgP1xuICAgIFwie31cIiA6XG4gICAgY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ7XFxuICB+e31cXG59XCIsIGJvZHkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVEaWN0aW9uYXJ5ID0gY29tcGlsZURpY3Rpb25hcnk7XG5cbnZhciBkZXN1Z2FyRm5OYW1lID0gZnVuY3Rpb24gZGVzdWdhckZuTmFtZShmb3JtKSB7XG4gIHJldHVybiAoaXNTeW1ib2woZmlyc3QoZm9ybSkpKSB8fCAoaXNOaWwoZmlyc3QoZm9ybSkpKSA/XG4gICAgZm9ybSA6XG4gICAgY29ucyh2b2lkKDApLCBmb3JtKTtcbn07XG5leHBvcnRzLmRlc3VnYXJGbk5hbWUgPSBkZXN1Z2FyRm5OYW1lO1xuXG52YXIgZGVzdWdhckZuRG9jID0gZnVuY3Rpb24gZGVzdWdhckZuRG9jKGZvcm0pIHtcbiAgcmV0dXJuIChpc1N0cmluZyhzZWNvbmQoZm9ybSkpKSB8fCAoaXNOaWwoc2Vjb25kKGZvcm0pKSkgP1xuICAgIGZvcm0gOlxuICAgIGNvbnMoZmlyc3QoZm9ybSksIGNvbnModm9pZCgwKSwgcmVzdChmb3JtKSkpO1xufTtcbmV4cG9ydHMuZGVzdWdhckZuRG9jID0gZGVzdWdhckZuRG9jO1xuXG52YXIgZGVzdWdhckZuQXR0cnMgPSBmdW5jdGlvbiBkZXN1Z2FyRm5BdHRycyhmb3JtKSB7XG4gIHJldHVybiAoaXNEaWN0aW9uYXJ5KHRoaXJkKGZvcm0pKSkgfHwgKGlzTmlsKHRoaXJkKGZvcm0pKSkgP1xuICAgIGZvcm0gOlxuICAgIGNvbnMoZmlyc3QoZm9ybSksIGNvbnMoc2Vjb25kKGZvcm0pLCBjb25zKHZvaWQoMCksIHJlc3QocmVzdChmb3JtKSkpKSk7XG59O1xuZXhwb3J0cy5kZXN1Z2FyRm5BdHRycyA9IGRlc3VnYXJGbkF0dHJzO1xuXG52YXIgY29tcGlsZURlc3VnYXJlZEZuID0gZnVuY3Rpb24gY29tcGlsZURlc3VnYXJlZEZuKG5hbWUsIGRvYywgYXR0cnMsIHBhcmFtcywgYm9keSkge1xuICByZXR1cm4gY29tcGlsZVRlbXBsYXRlKGlzTmlsKG5hbWUpID9cbiAgICBsaXN0KFwiZnVuY3Rpb24ofnt9KSB7XFxuICB+e31cXG59XCIsIGpvaW4oXCIsIFwiLCBtYXAoY29tcGlsZSwgKHBhcmFtcyB8fCAwKVtcIm5hbWVzXCJdKSksIGNvbXBpbGVGbkJvZHkobWFwKG1hY3JvZXhwYW5kLCBib2R5KSwgcGFyYW1zKSkgOlxuICAgIGxpc3QoXCJmdW5jdGlvbiB+e30ofnt9KSB7XFxuICB+e31cXG59XCIsIGNvbXBpbGUobmFtZSksIGpvaW4oXCIsIFwiLCBtYXAoY29tcGlsZSwgKHBhcmFtcyB8fCAwKVtcIm5hbWVzXCJdKSksIGNvbXBpbGVGbkJvZHkobWFwKG1hY3JvZXhwYW5kLCBib2R5KSwgcGFyYW1zKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZURlc3VnYXJlZEZuID0gY29tcGlsZURlc3VnYXJlZEZuO1xuXG52YXIgY29tcGlsZVN0YXRlbWVudHMgPSBmdW5jdGlvbiBjb21waWxlU3RhdGVtZW50cyhmb3JtLCBwcmVmaXgpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHJlc3VsdCwgZXhwcmVzc2lvbiwgZXhwcmVzc2lvbnMpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBpc0VtcHR5KGV4cHJlc3Npb25zKSA/XG4gICAgICBcIlwiICsgcmVzdWx0ICsgKGlzTmlsKHByZWZpeCkgP1xuICAgICAgICBcIlwiIDpcbiAgICAgICAgcHJlZml4KSArIChjb21waWxlKG1hY3JvZXhwYW5kKGV4cHJlc3Npb24pKSkgKyBcIjtcIiA6XG4gICAgICAocmVzdWx0ID0gXCJcIiArIHJlc3VsdCArIChjb21waWxlKG1hY3JvZXhwYW5kKGV4cHJlc3Npb24pKSkgKyBcIjtcXG5cIiwgZXhwcmVzc2lvbiA9IGZpcnN0KGV4cHJlc3Npb25zKSwgZXhwcmVzc2lvbnMgPSByZXN0KGV4cHJlc3Npb25zKSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFwiXCIsIGZpcnN0KGZvcm0pLCByZXN0KGZvcm0pKTtcbn07XG5leHBvcnRzLmNvbXBpbGVTdGF0ZW1lbnRzID0gY29tcGlsZVN0YXRlbWVudHM7XG5cbnZhciBjb21waWxlRm5Cb2R5ID0gZnVuY3Rpb24gY29tcGlsZUZuQm9keShmb3JtLCBwYXJhbXMpIHtcbiAgcmV0dXJuIChpc0RpY3Rpb25hcnkocGFyYW1zKSkgJiYgKChwYXJhbXMgfHwgMClbXCJyZXN0XCJdKSA/XG4gICAgY29tcGlsZVN0YXRlbWVudHMoY29ucyhsaXN0KHN5bWJvbCh2b2lkKDApLCBcImRlZlwiKSwgKHBhcmFtcyB8fCAwKVtcInJlc3RcIl0sIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGxcIiksIHN5bWJvbCh2b2lkKDApLCBcImFyZ3VtZW50c1wiKSwgKHBhcmFtcyB8fCAwKVtcImFyaXR5XCJdKSksIGZvcm0pLCBcInJldHVybiBcIikgOlxuICAoY291bnQoZm9ybSkgPT09IDEpICYmIChpc0xpc3QoZmlyc3QoZm9ybSkpKSAmJiAoaXNFcXVhbChmaXJzdChmaXJzdChmb3JtKSksIHN5bWJvbCh2b2lkKDApLCBcImRvXCIpKSkgP1xuICAgIGNvbXBpbGVGbkJvZHkocmVzdChmaXJzdChmb3JtKSksIHBhcmFtcykgOlxuICAgIGNvbXBpbGVTdGF0ZW1lbnRzKGZvcm0sIFwicmV0dXJuIFwiKTtcbn07XG5leHBvcnRzLmNvbXBpbGVGbkJvZHkgPSBjb21waWxlRm5Cb2R5O1xuXG52YXIgZGVzdWdhclBhcmFtcyA9IGZ1bmN0aW9uIGRlc3VnYXJQYXJhbXMocGFyYW1zKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChuYW1lcywgcGFyYW1zKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShwYXJhbXMpID9cbiAgICAgIHtcbiAgICAgICAgXCJuYW1lc1wiOiBuYW1lcyxcbiAgICAgICAgXCJhcml0eVwiOiBjb3VudChuYW1lcyksXG4gICAgICAgIFwicmVzdFwiOiB2b2lkKDApXG4gICAgICB9IDpcbiAgICBpc0VxdWFsKGZpcnN0KHBhcmFtcyksIHN5bWJvbCh2b2lkKDApLCBcIiZcIikpID9cbiAgICAgIGlzRXF1YWwoY291bnQocGFyYW1zKSwgMSkgP1xuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lc1wiOiBuYW1lcyxcbiAgICAgICAgICBcImFyaXR5XCI6IGNvdW50KG5hbWVzKSxcbiAgICAgICAgICBcInJlc3RcIjogdm9pZCgwKVxuICAgICAgICB9IDpcbiAgICAgIGlzRXF1YWwoY291bnQocGFyYW1zKSwgMikgP1xuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lc1wiOiBuYW1lcyxcbiAgICAgICAgICBcImFyaXR5XCI6IGNvdW50KG5hbWVzKSxcbiAgICAgICAgICBcInJlc3RcIjogc2Vjb25kKHBhcmFtcylcbiAgICAgICAgfSA6XG4gICAgICBcImVsc2VcIiA/XG4gICAgICAgIChmdW5jdGlvbigpIHsgdGhyb3cgVHlwZUVycm9yKFwiVW5leHBlY3RlZCBudW1iZXIgb2YgcGFyYW1ldGVycyBhZnRlciAmXCIpOyB9KSgpIDpcbiAgICAgICAgdm9pZCgwKSA6XG4gICAgXCJlbHNlXCIgP1xuICAgICAgKG5hbWVzID0gY29uaihuYW1lcywgZmlyc3QocGFyYW1zKSksIHBhcmFtcyA9IHJlc3QocGFyYW1zKSwgbG9vcCkgOlxuICAgICAgdm9pZCgwKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoW10sIHBhcmFtcyk7XG59O1xuZXhwb3J0cy5kZXN1Z2FyUGFyYW1zID0gZGVzdWdhclBhcmFtcztcblxudmFyIGFuYWx5emVPdmVybG9hZGVkRm4gPSBmdW5jdGlvbiBhbmFseXplT3ZlcmxvYWRlZEZuKG5hbWUsIGRvYywgYXR0cnMsIG92ZXJsb2Fkcykge1xuICByZXR1cm4gbWFwKGZ1bmN0aW9uKG92ZXJsb2FkKSB7XG4gICAgdmFyIHBhcmFtcyA9IGRlc3VnYXJQYXJhbXMoZmlyc3Qob3ZlcmxvYWQpKTtcbiAgICByZXR1cm4ge1xuICAgICAgXCJyZXN0XCI6IChwYXJhbXMgfHwgMClbXCJyZXN0XCJdLFxuICAgICAgXCJuYW1lc1wiOiAocGFyYW1zIHx8IDApW1wibmFtZXNcIl0sXG4gICAgICBcImFyaXR5XCI6IChwYXJhbXMgfHwgMClbXCJhcml0eVwiXSxcbiAgICAgIFwiYm9keVwiOiByZXN0KG92ZXJsb2FkKVxuICAgIH07XG4gIH0sIG92ZXJsb2Fkcyk7XG59O1xuZXhwb3J0cy5hbmFseXplT3ZlcmxvYWRlZEZuID0gYW5hbHl6ZU92ZXJsb2FkZWRGbjtcblxudmFyIGNvbXBpbGVPdmVybG9hZGVkRm4gPSBmdW5jdGlvbiBjb21waWxlT3ZlcmxvYWRlZEZuKG5hbWUsIGRvYywgYXR0cnMsIG92ZXJsb2Fkcykge1xuICB2YXIgbWV0aG9kcyA9IGFuYWx5emVPdmVybG9hZGVkRm4obmFtZSwgZG9jLCBhdHRycywgb3ZlcmxvYWRzKTtcbiAgdmFyIGZpeGVkTWV0aG9kcyA9IGZpbHRlcihmdW5jdGlvbihtZXRob2QpIHtcbiAgICByZXR1cm4gISgobWV0aG9kIHx8IDApW1wicmVzdFwiXSk7XG4gIH0sIG1ldGhvZHMpO1xuICB2YXIgdmFyaWFkaWMgPSBmaXJzdChmaWx0ZXIoZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgcmV0dXJuIChtZXRob2QgfHwgMClbXCJyZXN0XCJdO1xuICB9LCBtZXRob2RzKSk7XG4gIHZhciBuYW1lcyA9IHJlZHVjZShmdW5jdGlvbihuYW1lcywgcGFyYW1zKSB7XG4gICAgcmV0dXJuIGNvdW50KG5hbWVzKSA+IChwYXJhbXMgfHwgMClbXCJhcml0eVwiXSA/XG4gICAgICBuYW1lcyA6XG4gICAgICAocGFyYW1zIHx8IDApW1wibmFtZXNcIl07XG4gIH0sIFtdLCBtZXRob2RzKTtcbiAgcmV0dXJuIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZm5cIiksIG5hbWUsIGRvYywgYXR0cnMsIG5hbWVzLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInJhdypcIiksIGNvbXBpbGVTd2l0Y2goc3ltYm9sKHZvaWQoMCksIFwiYXJndW1lbnRzLmxlbmd0aFwiKSwgbWFwKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHJldHVybiBjb25zKChtZXRob2QgfHwgMClbXCJhcml0eVwiXSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJyYXcqXCIpLCBjb21waWxlRm5Cb2R5KGNvbmNhdChjb21waWxlUmViaW5kKG5hbWVzLCAobWV0aG9kIHx8IDApW1wibmFtZXNcIl0pLCAobWV0aG9kIHx8IDApW1wiYm9keVwiXSkpKSk7XG4gIH0sIGZpeGVkTWV0aG9kcyksIGlzTmlsKHZhcmlhZGljKSA/XG4gICAgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJ0aHJvd1wiKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJFcnJvclwiKSwgXCJJbnZhbGlkIGFyaXR5XCIpKSA6XG4gICAgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJyYXcqXCIpLCBjb21waWxlRm5Cb2R5KGNvbmNhdChjb21waWxlUmViaW5kKGNvbnMobGlzdChzeW1ib2wodm9pZCgwKSwgXCJBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbFwiKSwgc3ltYm9sKHZvaWQoMCksIFwiYXJndW1lbnRzXCIpLCAodmFyaWFkaWMgfHwgMClbXCJhcml0eVwiXSksIG5hbWVzKSwgY29ucygodmFyaWFkaWMgfHwgMClbXCJyZXN0XCJdLCAodmFyaWFkaWMgfHwgMClbXCJuYW1lc1wiXSkpLCAodmFyaWFkaWMgfHwgMClbXCJib2R5XCJdKSkpKSksIHZvaWQoMCkpO1xufTtcbmV4cG9ydHMuY29tcGlsZU92ZXJsb2FkZWRGbiA9IGNvbXBpbGVPdmVybG9hZGVkRm47XG5cbnZhciBjb21waWxlUmViaW5kID0gZnVuY3Rpb24gY29tcGlsZVJlYmluZChiaW5kaW5ncywgbmFtZXMpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGZvcm0sIGJpbmRpbmdzLCBuYW1lcykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkobmFtZXMpID9cbiAgICAgIHJldmVyc2UoZm9ybSkgOlxuICAgICAgKGZvcm0gPSBpc0VxdWFsKGZpcnN0KG5hbWVzKSwgZmlyc3QoYmluZGluZ3MpKSA/XG4gICAgICAgIGZvcm0gOlxuICAgICAgICBjb25zKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZGVmXCIpLCBmaXJzdChuYW1lcyksIGZpcnN0KGJpbmRpbmdzKSksIGZvcm0pLCBiaW5kaW5ncyA9IHJlc3QoYmluZGluZ3MpLCBuYW1lcyA9IHJlc3QobmFtZXMpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkobGlzdCgpLCBiaW5kaW5ncywgbmFtZXMpO1xufTtcbmV4cG9ydHMuY29tcGlsZVJlYmluZCA9IGNvbXBpbGVSZWJpbmQ7XG5cbnZhciBjb21waWxlU3dpdGNoQ2FzZXMgPSBmdW5jdGlvbiBjb21waWxlU3dpdGNoQ2FzZXMoY2FzZXMpIHtcbiAgcmV0dXJuIHJlZHVjZShmdW5jdGlvbihmb3JtLCBjYXNlRXhwcmVzc2lvbikge1xuICAgIHJldHVybiBcIlwiICsgZm9ybSArIChjb21waWxlVGVtcGxhdGUobGlzdChcImNhc2Ugfnt9OlxcbiAgfnt9XFxuXCIsIGNvbXBpbGUobWFjcm9leHBhbmQoZmlyc3QoY2FzZUV4cHJlc3Npb24pKSksIGNvbXBpbGUobWFjcm9leHBhbmQocmVzdChjYXNlRXhwcmVzc2lvbikpKSkpKTtcbiAgfSwgXCJcIiwgY2FzZXMpO1xufTtcbmV4cG9ydHMuY29tcGlsZVN3aXRjaENhc2VzID0gY29tcGlsZVN3aXRjaENhc2VzO1xuXG52YXIgY29tcGlsZVN3aXRjaCA9IGZ1bmN0aW9uIGNvbXBpbGVTd2l0Y2godmFsdWUsIGNhc2VzLCBkZWZhdWx0Q2FzZSkge1xuICByZXR1cm4gY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJzd2l0Y2ggKH57fSkge1xcbiAgfnt9XFxuICBkZWZhdWx0OlxcbiAgICB+e31cXG59XCIsIGNvbXBpbGUobWFjcm9leHBhbmQodmFsdWUpKSwgY29tcGlsZVN3aXRjaENhc2VzKGNhc2VzKSwgY29tcGlsZShtYWNyb2V4cGFuZChkZWZhdWx0Q2FzZSkpKSk7XG59O1xuZXhwb3J0cy5jb21waWxlU3dpdGNoID0gY29tcGlsZVN3aXRjaDtcblxudmFyIGNvbXBpbGVGbiA9IGZ1bmN0aW9uIGNvbXBpbGVGbihmb3JtKSB7XG4gIHZhciBzaWduYXR1cmUgPSBkZXN1Z2FyRm5BdHRycyhkZXN1Z2FyRm5Eb2MoZGVzdWdhckZuTmFtZShmb3JtKSkpO1xuICB2YXIgbmFtZSA9IGZpcnN0KHNpZ25hdHVyZSk7XG4gIHZhciBkb2MgPSBzZWNvbmQoc2lnbmF0dXJlKTtcbiAgdmFyIGF0dHJzID0gdGhpcmQoc2lnbmF0dXJlKTtcbiAgcmV0dXJuIGlzVmVjdG9yKHRoaXJkKHJlc3Qoc2lnbmF0dXJlKSkpID9cbiAgICBjb21waWxlRGVzdWdhcmVkRm4obmFtZSwgZG9jLCBhdHRycywgZGVzdWdhclBhcmFtcyh0aGlyZChyZXN0KHNpZ25hdHVyZSkpKSwgcmVzdChyZXN0KHJlc3QocmVzdChzaWduYXR1cmUpKSkpKSA6XG4gICAgY29tcGlsZShjb21waWxlT3ZlcmxvYWRlZEZuKG5hbWUsIGRvYywgYXR0cnMsIHJlc3QocmVzdChyZXN0KHNpZ25hdHVyZSkpKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZUZuID0gY29tcGlsZUZuO1xuXG52YXIgY29tcGlsZUludm9rZSA9IGZ1bmN0aW9uIGNvbXBpbGVJbnZva2UoZm9ybSkge1xuICByZXR1cm4gY29tcGlsZVRlbXBsYXRlKGxpc3QoaXNMaXN0KGZpcnN0KGZvcm0pKSA/XG4gICAgXCIofnt9KSh+e30pXCIgOlxuICAgIFwifnt9KH57fSlcIiwgY29tcGlsZShmaXJzdChmb3JtKSksIGNvbXBpbGVHcm91cChyZXN0KGZvcm0pKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZUludm9rZSA9IGNvbXBpbGVJbnZva2U7XG5cbnZhciBjb21waWxlR3JvdXAgPSBmdW5jdGlvbiBjb21waWxlR3JvdXAoZm9ybSwgd3JhcCkge1xuICByZXR1cm4gd3JhcCA/XG4gICAgXCJcIiArIFwiKFwiICsgKGNvbXBpbGVHcm91cChmb3JtKSkgKyBcIilcIiA6XG4gICAgam9pbihcIiwgXCIsIHZlYyhtYXAoY29tcGlsZSwgbWFwKG1hY3JvZXhwYW5kLCBmb3JtKSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVHcm91cCA9IGNvbXBpbGVHcm91cDtcblxudmFyIGNvbXBpbGVEbyA9IGZ1bmN0aW9uIGNvbXBpbGVEbyhmb3JtKSB7XG4gIHJldHVybiBjb21waWxlKGxpc3QoY29ucyhzeW1ib2wodm9pZCgwKSwgXCJmblwiKSwgY29ucyhbXSwgZm9ybSkpKSk7XG59O1xuZXhwb3J0cy5jb21waWxlRG8gPSBjb21waWxlRG87XG5cbnZhciBkZWZpbmVCaW5kaW5ncyA9IGZ1bmN0aW9uIGRlZmluZUJpbmRpbmdzKGZvcm0pIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGRlZnMsIGJpbmRpbmdzKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gY291bnQoYmluZGluZ3MpID09PSAwID9cbiAgICAgIHJldmVyc2UoZGVmcykgOlxuICAgICAgKGRlZnMgPSBjb25zKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZGVmXCIpLCAoYmluZGluZ3MgfHwgMClbMF0sIChiaW5kaW5ncyB8fCAwKVsxXSksIGRlZnMpLCBiaW5kaW5ncyA9IHJlc3QocmVzdChiaW5kaW5ncykpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkobGlzdCgpLCBmb3JtKTtcbn07XG5leHBvcnRzLmRlZmluZUJpbmRpbmdzID0gZGVmaW5lQmluZGluZ3M7XG5cbnZhciBjb21waWxlVGhyb3cgPSBmdW5jdGlvbiBjb21waWxlVGhyb3coZm9ybSkge1xuICByZXR1cm4gY29tcGlsZVRlbXBsYXRlKGxpc3QoXCIoZnVuY3Rpb24oKSB7IHRocm93IH57fTsgfSkoKVwiLCBjb21waWxlKG1hY3JvZXhwYW5kKGZpcnN0KGZvcm0pKSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVUaHJvdyA9IGNvbXBpbGVUaHJvdztcblxudmFyIGNvbXBpbGVTZXQgPSBmdW5jdGlvbiBjb21waWxlU2V0KGZvcm0pIHtcbiAgcmV0dXJuIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwifnt9ID0gfnt9XCIsIGNvbXBpbGUobWFjcm9leHBhbmQoZmlyc3QoZm9ybSkpKSwgY29tcGlsZShtYWNyb2V4cGFuZChzZWNvbmQoZm9ybSkpKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZVNldCA9IGNvbXBpbGVTZXQ7XG5cbnZhciBjb21waWxlVmVjdG9yID0gZnVuY3Rpb24gY29tcGlsZVZlY3Rvcihmb3JtKSB7XG4gIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdChcIlt+e31dXCIsIGNvbXBpbGVHcm91cChmb3JtKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZVZlY3RvciA9IGNvbXBpbGVWZWN0b3I7XG5cbnZhciBjb21waWxlVHJ5ID0gZnVuY3Rpb24gY29tcGlsZVRyeShmb3JtKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcCh0cnlFeHBycywgY2F0Y2hFeHBycywgZmluYWxseUV4cHJzLCBleHBycykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkoZXhwcnMpID9cbiAgICAgIGlzRW1wdHkoY2F0Y2hFeHBycykgP1xuICAgICAgICBjb21waWxlVGVtcGxhdGUobGlzdChcIihmdW5jdGlvbigpIHtcXG50cnkge1xcbiAgfnt9XFxufSBmaW5hbGx5IHtcXG4gIH57fVxcbn19KSgpXCIsIGNvbXBpbGVGbkJvZHkodHJ5RXhwcnMpLCBjb21waWxlRm5Cb2R5KGZpbmFsbHlFeHBycykpKSA6XG4gICAgICBpc0VtcHR5KGZpbmFsbHlFeHBycykgP1xuICAgICAgICBjb21waWxlVGVtcGxhdGUobGlzdChcIihmdW5jdGlvbigpIHtcXG50cnkge1xcbiAgfnt9XFxufSBjYXRjaCAofnt9KSB7XFxuICB+e31cXG59fSkoKVwiLCBjb21waWxlRm5Cb2R5KHRyeUV4cHJzKSwgY29tcGlsZShmaXJzdChjYXRjaEV4cHJzKSksIGNvbXBpbGVGbkJvZHkocmVzdChjYXRjaEV4cHJzKSkpKSA6XG4gICAgICAgIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwiKGZ1bmN0aW9uKCkge1xcbnRyeSB7XFxuICB+e31cXG59IGNhdGNoICh+e30pIHtcXG4gIH57fVxcbn0gZmluYWxseSB7XFxuICB+e31cXG59fSkoKVwiLCBjb21waWxlRm5Cb2R5KHRyeUV4cHJzKSwgY29tcGlsZShmaXJzdChjYXRjaEV4cHJzKSksIGNvbXBpbGVGbkJvZHkocmVzdChjYXRjaEV4cHJzKSksIGNvbXBpbGVGbkJvZHkoZmluYWxseUV4cHJzKSkpIDpcbiAgICBpc0VxdWFsKGZpcnN0KGZpcnN0KGV4cHJzKSksIHN5bWJvbCh2b2lkKDApLCBcImNhdGNoXCIpKSA/XG4gICAgICAodHJ5RXhwcnMgPSB0cnlFeHBycywgY2F0Y2hFeHBycyA9IHJlc3QoZmlyc3QoZXhwcnMpKSwgZmluYWxseUV4cHJzID0gZmluYWxseUV4cHJzLCBleHBycyA9IHJlc3QoZXhwcnMpLCBsb29wKSA6XG4gICAgaXNFcXVhbChmaXJzdChmaXJzdChleHBycykpLCBzeW1ib2wodm9pZCgwKSwgXCJmaW5hbGx5XCIpKSA/XG4gICAgICAodHJ5RXhwcnMgPSB0cnlFeHBycywgY2F0Y2hFeHBycyA9IGNhdGNoRXhwcnMsIGZpbmFsbHlFeHBycyA9IHJlc3QoZmlyc3QoZXhwcnMpKSwgZXhwcnMgPSByZXN0KGV4cHJzKSwgbG9vcCkgOlxuICAgICAgKHRyeUV4cHJzID0gY29ucyhmaXJzdChleHBycyksIHRyeUV4cHJzKSwgY2F0Y2hFeHBycyA9IGNhdGNoRXhwcnMsIGZpbmFsbHlFeHBycyA9IGZpbmFsbHlFeHBycywgZXhwcnMgPSByZXN0KGV4cHJzKSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKGxpc3QoKSwgbGlzdCgpLCBsaXN0KCksIHJldmVyc2UoZm9ybSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZVRyeSA9IGNvbXBpbGVUcnk7XG5cbnZhciBjb21waWxlUHJvcGVydHkgPSBmdW5jdGlvbiBjb21waWxlUHJvcGVydHkoZm9ybSkge1xuICByZXR1cm4gKG5hbWUoc2Vjb25kKGZvcm0pKSlbMF0gPT09IFwiLVwiID9cbiAgICBjb21waWxlVGVtcGxhdGUobGlzdChpc0xpc3QoZmlyc3QoZm9ybSkpID9cbiAgICAgIFwiKH57fSkufnt9XCIgOlxuICAgICAgXCJ+e30ufnt9XCIsIGNvbXBpbGUobWFjcm9leHBhbmQoZmlyc3QoZm9ybSkpKSwgY29tcGlsZShtYWNyb2V4cGFuZChzeW1ib2woc3VicyhuYW1lKHNlY29uZChmb3JtKSksIDEpKSkpKSkgOlxuICAgIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwifnt9Ln57fSh+e30pXCIsIGNvbXBpbGUobWFjcm9leHBhbmQoZmlyc3QoZm9ybSkpKSwgY29tcGlsZShtYWNyb2V4cGFuZChzZWNvbmQoZm9ybSkpKSwgY29tcGlsZUdyb3VwKHJlc3QocmVzdChmb3JtKSkpKSk7XG59O1xuZXhwb3J0cy5jb21waWxlUHJvcGVydHkgPSBjb21waWxlUHJvcGVydHk7XG5cbnZhciBjb21waWxlQXBwbHkgPSBmdW5jdGlvbiBjb21waWxlQXBwbHkoZm9ybSkge1xuICByZXR1cm4gY29tcGlsZShsaXN0KHN5bWJvbCh2b2lkKDApLCBcIi5cIiksIGZpcnN0KGZvcm0pLCBzeW1ib2wodm9pZCgwKSwgXCJhcHBseVwiKSwgZmlyc3QoZm9ybSksIHNlY29uZChmb3JtKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZUFwcGx5ID0gY29tcGlsZUFwcGx5O1xuXG52YXIgY29tcGlsZU5ldyA9IGZ1bmN0aW9uIGNvbXBpbGVOZXcoZm9ybSkge1xuICByZXR1cm4gY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJuZXcgfnt9XCIsIGNvbXBpbGUoZm9ybSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVOZXcgPSBjb21waWxlTmV3O1xuXG52YXIgY29tcGlsZUFnZXQgPSBmdW5jdGlvbiBjb21waWxlQWdldChmb3JtKSB7XG4gIHZhciB0YXJnZXQgPSBtYWNyb2V4cGFuZChmaXJzdChmb3JtKSk7XG4gIHZhciBhdHRyaWJ1dGUgPSBtYWNyb2V4cGFuZChzZWNvbmQoZm9ybSkpO1xuICB2YXIgbm90Rm91bmQgPSB0aGlyZChmb3JtKTtcbiAgdmFyIHRlbXBsYXRlID0gaXNMaXN0KHRhcmdldCkgP1xuICAgIFwiKH57fSlbfnt9XVwiIDpcbiAgICBcIn57fVt+e31dXCI7XG4gIHJldHVybiBub3RGb3VuZCA/XG4gICAgY29tcGlsZShsaXN0KHN5bWJvbCh2b2lkKDApLCBcIm9yXCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImdldFwiKSwgZmlyc3QoZm9ybSksIHNlY29uZChmb3JtKSksIG1hY3JvZXhwYW5kKG5vdEZvdW5kKSkpIDpcbiAgICBjb21waWxlVGVtcGxhdGUobGlzdCh0ZW1wbGF0ZSwgY29tcGlsZSh0YXJnZXQpLCBjb21waWxlKGF0dHJpYnV0ZSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVBZ2V0ID0gY29tcGlsZUFnZXQ7XG5cbnZhciBjb21waWxlR2V0ID0gZnVuY3Rpb24gY29tcGlsZUdldChmb3JtKSB7XG4gIHJldHVybiBjb21waWxlQWdldChjb25zKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwib3JcIiksIGZpcnN0KGZvcm0pLCAwKSwgcmVzdChmb3JtKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZUdldCA9IGNvbXBpbGVHZXQ7XG5cbnZhciBjb21waWxlSW5zdGFuY2UgPSBmdW5jdGlvbiBjb21waWxlSW5zdGFuY2UoZm9ybSkge1xuICByZXR1cm4gY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ+e30gaW5zdGFuY2VvZiB+e31cIiwgY29tcGlsZShtYWNyb2V4cGFuZChzZWNvbmQoZm9ybSkpKSwgY29tcGlsZShtYWNyb2V4cGFuZChmaXJzdChmb3JtKSkpKSk7XG59O1xuZXhwb3J0cy5jb21waWxlSW5zdGFuY2UgPSBjb21waWxlSW5zdGFuY2U7XG5cbnZhciBjb21waWxlTm90ID0gZnVuY3Rpb24gY29tcGlsZU5vdChmb3JtKSB7XG4gIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdChcIiEofnt9KVwiLCBjb21waWxlKG1hY3JvZXhwYW5kKGZpcnN0KGZvcm0pKSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVOb3QgPSBjb21waWxlTm90O1xuXG52YXIgY29tcGlsZUxvb3AgPSBmdW5jdGlvbiBjb21waWxlTG9vcChmb3JtKSB7XG4gIHZhciBiaW5kaW5ncyA9IChmdW5jdGlvbiBsb29wKG5hbWVzLCB2YWx1ZXMsIHRva2Vucykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkodG9rZW5zKSA/XG4gICAgICB7XG4gICAgICAgIFwibmFtZXNcIjogbmFtZXMsXG4gICAgICAgIFwidmFsdWVzXCI6IHZhbHVlc1xuICAgICAgfSA6XG4gICAgICAobmFtZXMgPSBjb25qKG5hbWVzLCBmaXJzdCh0b2tlbnMpKSwgdmFsdWVzID0gY29uaih2YWx1ZXMsIHNlY29uZCh0b2tlbnMpKSwgdG9rZW5zID0gcmVzdChyZXN0KHRva2VucykpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoW10sIFtdLCBmaXJzdChmb3JtKSk7XG4gIHZhciBuYW1lcyA9IChiaW5kaW5ncyB8fCAwKVtcIm5hbWVzXCJdO1xuICB2YXIgdmFsdWVzID0gKGJpbmRpbmdzIHx8IDApW1widmFsdWVzXCJdO1xuICB2YXIgYm9keSA9IHJlc3QoZm9ybSk7XG4gIHJldHVybiBjb21waWxlKGNvbnMoY29ucyhzeW1ib2wodm9pZCgwKSwgXCJmblwiKSwgY29ucyhzeW1ib2wodm9pZCgwKSwgXCJsb29wXCIpLCBjb25zKG5hbWVzLCBjb21waWxlUmVjdXIobmFtZXMsIGJvZHkpKSkpLCBsaXN0LmFwcGx5KGxpc3QsIHZhbHVlcykpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVMb29wID0gY29tcGlsZUxvb3A7XG5cbnZhciByZWJpbmRCaW5kaW5ncyA9IGZ1bmN0aW9uIHJlYmluZEJpbmRpbmdzKG5hbWVzLCB2YWx1ZXMpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHJlc3VsdCwgbmFtZXMsIHZhbHVlcykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkobmFtZXMpID9cbiAgICAgIHJldmVyc2UocmVzdWx0KSA6XG4gICAgICAocmVzdWx0ID0gY29ucyhsaXN0KHN5bWJvbCh2b2lkKDApLCBcInNldCFcIiksIGZpcnN0KG5hbWVzKSwgZmlyc3QodmFsdWVzKSksIHJlc3VsdCksIG5hbWVzID0gcmVzdChuYW1lcyksIHZhbHVlcyA9IHJlc3QodmFsdWVzKSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKGxpc3QoKSwgbmFtZXMsIHZhbHVlcyk7XG59O1xuZXhwb3J0cy5yZWJpbmRCaW5kaW5ncyA9IHJlYmluZEJpbmRpbmdzO1xuXG52YXIgZXhwYW5kUmVjdXIgPSBmdW5jdGlvbiBleHBhbmRSZWN1cihuYW1lcywgYm9keSkge1xuICByZXR1cm4gbWFwKGZ1bmN0aW9uKGZvcm0pIHtcbiAgICByZXR1cm4gaXNMaXN0KGZvcm0pID9cbiAgICAgIGlzRXF1YWwoZmlyc3QoZm9ybSksIHN5bWJvbCh2b2lkKDApLCBcInJlY3VyXCIpKSA/XG4gICAgICAgIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwicmF3KlwiKSwgY29tcGlsZUdyb3VwKGNvbmNhdChyZWJpbmRCaW5kaW5ncyhuYW1lcywgcmVzdChmb3JtKSksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwibG9vcFwiKSkpLCB0cnVlKSkgOlxuICAgICAgICBleHBhbmRSZWN1cihuYW1lcywgZm9ybSkgOlxuICAgICAgZm9ybTtcbiAgfSwgYm9keSk7XG59O1xuZXhwb3J0cy5leHBhbmRSZWN1ciA9IGV4cGFuZFJlY3VyO1xuXG52YXIgY29tcGlsZVJlY3VyID0gZnVuY3Rpb24gY29tcGlsZVJlY3VyKG5hbWVzLCBib2R5KSB7XG4gIHJldHVybiBsaXN0KGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwicmF3KlwiKSwgY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ2YXIgcmVjdXIgPSBsb29wO1xcbndoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xcbiAgcmVjdXIgPSB+e31cXG59XCIsIGNvbXBpbGVTdGF0ZW1lbnRzKGV4cGFuZFJlY3VyKG5hbWVzLCBib2R5KSkpKSksIHN5bWJvbCh2b2lkKDApLCBcInJlY3VyXCIpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVSZWN1ciA9IGNvbXBpbGVSZWN1cjtcblxudmFyIGNvbXBpbGVSYXcgPSBmdW5jdGlvbiBjb21waWxlUmF3KGZvcm0pIHtcbiAgcmV0dXJuIGZpcnN0KGZvcm0pO1xufTtcbmV4cG9ydHMuY29tcGlsZVJhdyA9IGNvbXBpbGVSYXc7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcInNldCFcIiksIGNvbXBpbGVTZXQpO1xuXG5pbnN0YWxsU3BlY2lhbChzeW1ib2wodm9pZCgwKSwgXCJnZXRcIiksIGNvbXBpbGVHZXQpO1xuXG5pbnN0YWxsU3BlY2lhbChzeW1ib2wodm9pZCgwKSwgXCJhZ2V0XCIpLCBjb21waWxlQWdldCk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcImRlZlwiKSwgY29tcGlsZURlZik7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcImlmXCIpLCBjb21waWxlSWZFbHNlKTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwiZG9cIiksIGNvbXBpbGVEbyk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcImRvKlwiKSwgY29tcGlsZVN0YXRlbWVudHMpO1xuXG5pbnN0YWxsU3BlY2lhbChzeW1ib2wodm9pZCgwKSwgXCJmblwiKSwgY29tcGlsZUZuKTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwidGhyb3dcIiksIGNvbXBpbGVUaHJvdyk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcInZlY3RvclwiKSwgY29tcGlsZVZlY3Rvcik7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcInRyeVwiKSwgY29tcGlsZVRyeSk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcIi5cIiksIGNvbXBpbGVQcm9wZXJ0eSk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcImFwcGx5XCIpLCBjb21waWxlQXBwbHkpO1xuXG5pbnN0YWxsU3BlY2lhbChzeW1ib2wodm9pZCgwKSwgXCJuZXdcIiksIGNvbXBpbGVOZXcpO1xuXG5pbnN0YWxsU3BlY2lhbChzeW1ib2wodm9pZCgwKSwgXCJpbnN0YW5jZT9cIiksIGNvbXBpbGVJbnN0YW5jZSk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcIm5vdFwiKSwgY29tcGlsZU5vdCk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcImxvb3BcIiksIGNvbXBpbGVMb29wKTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwicmF3KlwiKSwgY29tcGlsZVJhdyk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcImNvbW1lbnRcIiksIHdyaXRlQ29tbWVudCk7XG5cbnZhciBjb21waWxlUmVQYXR0ZXJuID0gZnVuY3Rpb24gY29tcGlsZVJlUGF0dGVybihmb3JtKSB7XG4gIHJldHVybiBcIlwiICsgZm9ybTtcbn07XG5leHBvcnRzLmNvbXBpbGVSZVBhdHRlcm4gPSBjb21waWxlUmVQYXR0ZXJuO1xuXG52YXIgaW5zdGFsbE5hdGl2ZSA9IGZ1bmN0aW9uIGluc3RhbGxOYXRpdmUoYWxpYXMsIG9wZXJhdG9yLCB2YWxpZGF0b3IsIGZhbGxiYWNrKSB7XG4gIHJldHVybiBpbnN0YWxsU3BlY2lhbChhbGlhcywgZnVuY3Rpb24oZm9ybSkge1xuICAgIHJldHVybiBpc0VtcHR5KGZvcm0pID9cbiAgICAgIGZhbGxiYWNrIDpcbiAgICAgIHJlZHVjZShmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICAgICAgICByZXR1cm4gY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ+e30gfnt9IH57fVwiLCBsZWZ0LCBuYW1lKG9wZXJhdG9yKSwgcmlnaHQpKTtcbiAgICAgIH0sIG1hcChmdW5jdGlvbihvcGVyYW5kKSB7XG4gICAgICAgIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdChpc0xpc3Qob3BlcmFuZCkgP1xuICAgICAgICAgIFwiKH57fSlcIiA6XG4gICAgICAgICAgXCJ+e31cIiwgY29tcGlsZShtYWNyb2V4cGFuZChvcGVyYW5kKSkpKTtcbiAgICAgIH0sIGZvcm0pKTtcbiAgfSwgdmFsaWRhdG9yKTtcbn07XG5leHBvcnRzLmluc3RhbGxOYXRpdmUgPSBpbnN0YWxsTmF0aXZlO1xuXG52YXIgaW5zdGFsbE9wZXJhdG9yID0gZnVuY3Rpb24gaW5zdGFsbE9wZXJhdG9yKGFsaWFzLCBvcGVyYXRvcikge1xuICByZXR1cm4gaW5zdGFsbFNwZWNpYWwoYWxpYXMsIGZ1bmN0aW9uKGZvcm0pIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocmVzdWx0LCBsZWZ0LCByaWdodCwgb3BlcmFuZHMpIHtcbiAgICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgcmVjdXIgPSBpc0VtcHR5KG9wZXJhbmRzKSA/XG4gICAgICAgIFwiXCIgKyByZXN1bHQgKyAoY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ+e30gfnt9IH57fVwiLCBjb21waWxlKG1hY3JvZXhwYW5kKGxlZnQpKSwgbmFtZShvcGVyYXRvciksIGNvbXBpbGUobWFjcm9leHBhbmQocmlnaHQpKSkpKSA6XG4gICAgICAgIChyZXN1bHQgPSBcIlwiICsgcmVzdWx0ICsgKGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwifnt9IH57fSB+e30gJiYgXCIsIGNvbXBpbGUobWFjcm9leHBhbmQobGVmdCkpLCBuYW1lKG9wZXJhdG9yKSwgY29tcGlsZShtYWNyb2V4cGFuZChyaWdodCkpKSkpLCBsZWZ0ID0gcmlnaHQsIHJpZ2h0ID0gZmlyc3Qob3BlcmFuZHMpLCBvcGVyYW5kcyA9IHJlc3Qob3BlcmFuZHMpLCBsb29wKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVjdXI7XG4gICAgfSkoXCJcIiwgZmlyc3QoZm9ybSksIHNlY29uZChmb3JtKSwgcmVzdChyZXN0KGZvcm0pKSk7XG4gIH0sIHZlcmlmeVR3byk7XG59O1xuZXhwb3J0cy5pbnN0YWxsT3BlcmF0b3IgPSBpbnN0YWxsT3BlcmF0b3I7XG5cbnZhciBjb21waWxlckVycm9yID0gZnVuY3Rpb24gY29tcGlsZXJFcnJvcihmb3JtLCBtZXNzYWdlKSB7XG4gIHZhciBlcnJvciA9IEVycm9yKFwiXCIgKyBtZXNzYWdlKTtcbiAgZXJyb3IubGluZSA9IDE7XG4gIHJldHVybiAoZnVuY3Rpb24oKSB7IHRocm93IGVycm9yOyB9KSgpO1xufTtcbmV4cG9ydHMuY29tcGlsZXJFcnJvciA9IGNvbXBpbGVyRXJyb3I7XG5cbnZhciB2ZXJpZnlUd28gPSBmdW5jdGlvbiB2ZXJpZnlUd28oZm9ybSkge1xuICByZXR1cm4gKGlzRW1wdHkocmVzdChmb3JtKSkpIHx8IChpc0VtcHR5KHJlc3QocmVzdChmb3JtKSkpKSA/XG4gICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBjb21waWxlckVycm9yKGZvcm0sIFwiXCIgKyAoZmlyc3QoZm9ybSkpICsgXCIgZm9ybSByZXF1aXJlcyBhdCBsZWFzdCB0d28gb3BlcmFuZHNcIik7IH0pKCkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy52ZXJpZnlUd28gPSB2ZXJpZnlUd287XG5cbmluc3RhbGxOYXRpdmUoc3ltYm9sKHZvaWQoMCksIFwiK1wiKSwgc3ltYm9sKHZvaWQoMCksIFwiK1wiKSwgdm9pZCgwKSwgMCk7XG5cbmluc3RhbGxOYXRpdmUoc3ltYm9sKHZvaWQoMCksIFwiLVwiKSwgc3ltYm9sKHZvaWQoMCksIFwiLVwiKSwgdm9pZCgwKSwgXCJOYU5cIik7XG5cbmluc3RhbGxOYXRpdmUoc3ltYm9sKHZvaWQoMCksIFwiKlwiKSwgc3ltYm9sKHZvaWQoMCksIFwiKlwiKSwgdm9pZCgwKSwgMSk7XG5cbmluc3RhbGxOYXRpdmUoc3ltYm9sKHZvaWQoMCksIFwiL1wiKSwgc3ltYm9sKHZvaWQoMCksIFwiL1wiKSwgdmVyaWZ5VHdvKTtcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCJtb2RcIiksIHN5bWJvbChcIiVcIiksIHZlcmlmeVR3byk7XG5cbmluc3RhbGxOYXRpdmUoc3ltYm9sKHZvaWQoMCksIFwiYW5kXCIpLCBzeW1ib2wodm9pZCgwKSwgXCImJlwiKSk7XG5cbmluc3RhbGxOYXRpdmUoc3ltYm9sKHZvaWQoMCksIFwib3JcIiksIHN5bWJvbCh2b2lkKDApLCBcInx8XCIpKTtcblxuaW5zdGFsbE9wZXJhdG9yKHN5bWJvbCh2b2lkKDApLCBcIm5vdD1cIiksIHN5bWJvbCh2b2lkKDApLCBcIiE9XCIpKTtcblxuaW5zdGFsbE9wZXJhdG9yKHN5bWJvbCh2b2lkKDApLCBcIj09XCIpLCBzeW1ib2wodm9pZCgwKSwgXCI9PT1cIikpO1xuXG5pbnN0YWxsT3BlcmF0b3Ioc3ltYm9sKHZvaWQoMCksIFwiaWRlbnRpY2FsP1wiKSwgc3ltYm9sKHZvaWQoMCksIFwiPT09XCIpKTtcblxuaW5zdGFsbE9wZXJhdG9yKHN5bWJvbCh2b2lkKDApLCBcIj5cIiksIHN5bWJvbCh2b2lkKDApLCBcIj5cIikpO1xuXG5pbnN0YWxsT3BlcmF0b3Ioc3ltYm9sKHZvaWQoMCksIFwiPj1cIiksIHN5bWJvbCh2b2lkKDApLCBcIj49XCIpKTtcblxuaW5zdGFsbE9wZXJhdG9yKHN5bWJvbCh2b2lkKDApLCBcIjxcIiksIHN5bWJvbCh2b2lkKDApLCBcIjxcIikpO1xuXG5pbnN0YWxsT3BlcmF0b3Ioc3ltYm9sKHZvaWQoMCksIFwiPD1cIiksIHN5bWJvbCh2b2lkKDApLCBcIjw9XCIpKTtcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCJiaXQtYW5kXCIpLCBzeW1ib2wodm9pZCgwKSwgXCImXCIpLCB2ZXJpZnlUd28pO1xuXG5pbnN0YWxsTmF0aXZlKHN5bWJvbCh2b2lkKDApLCBcImJpdC1vclwiKSwgc3ltYm9sKHZvaWQoMCksIFwifFwiKSwgdmVyaWZ5VHdvKTtcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCJiaXQteG9yXCIpLCBzeW1ib2woXCJeXCIpKTtcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCJiaXQtbm90XCIpLCBzeW1ib2woXCJ+XCIpLCB2ZXJpZnlUd28pO1xuXG5pbnN0YWxsTmF0aXZlKHN5bWJvbCh2b2lkKDApLCBcImJpdC1zaGlmdC1sZWZ0XCIpLCBzeW1ib2wodm9pZCgwKSwgXCI8PFwiKSwgdmVyaWZ5VHdvKTtcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCJiaXQtc2hpZnQtcmlnaHRcIiksIHN5bWJvbCh2b2lkKDApLCBcIj4+XCIpLCB2ZXJpZnlUd28pO1xuXG5pbnN0YWxsTmF0aXZlKHN5bWJvbCh2b2lkKDApLCBcImJpdC1zaGlmdC1yaWdodC16ZXJvLWZpbFwiKSwgc3ltYm9sKHZvaWQoMCksIFwiPj4+XCIpLCB2ZXJpZnlUd28pO1xuXG5pbnN0YWxsTWFjcm8oc3ltYm9sKHZvaWQoMCksIFwic3RyXCIpLCBmdW5jdGlvbiBzdHIoKSB7XG4gIHZhciBmb3JtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiBjb25jYXQobGlzdChzeW1ib2wodm9pZCgwKSwgXCIrXCIpLCBcIlwiKSwgZm9ybXMpO1xufSk7XG5cbmluc3RhbGxNYWNybyhzeW1ib2wodm9pZCgwKSwgXCJsZXRcIiksIGZ1bmN0aW9uIGxldE1hY3JvKGJpbmRpbmdzKSB7XG4gIHZhciBib2R5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgcmV0dXJuIGNvbnMoc3ltYm9sKHZvaWQoMCksIFwiZG9cIiksIGNvbmNhdChkZWZpbmVCaW5kaW5ncyhiaW5kaW5ncyksIGJvZHkpKTtcbn0pO1xuXG5pbnN0YWxsTWFjcm8oc3ltYm9sKHZvaWQoMCksIFwiY29uZFwiKSwgZnVuY3Rpb24gY29uZCgpIHtcbiAgdmFyIGNsYXVzZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gIShpc0VtcHR5KGNsYXVzZXMpKSA/XG4gICAgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJpZlwiKSwgZmlyc3QoY2xhdXNlcyksIGlzRW1wdHkocmVzdChjbGF1c2VzKSkgP1xuICAgICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBFcnJvcihcImNvbmQgcmVxdWlyZXMgYW4gZXZlbiBudW1iZXIgb2YgZm9ybXNcIik7IH0pKCkgOlxuICAgICAgc2Vjb25kKGNsYXVzZXMpLCBjb25zKHN5bWJvbCh2b2lkKDApLCBcImNvbmRcIiksIHJlc3QocmVzdChjbGF1c2VzKSkpKSA6XG4gICAgdm9pZCgwKTtcbn0pO1xuXG5pbnN0YWxsTWFjcm8oc3ltYm9sKHZvaWQoMCksIFwiZGVmblwiKSwgZnVuY3Rpb24gZGVmbihuYW1lKSB7XG4gIHZhciBib2R5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgcmV0dXJuIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZGVmXCIpLCBuYW1lLCBjb25jYXQobGlzdChzeW1ib2wodm9pZCgwKSwgXCJmblwiKSwgbmFtZSksIGJvZHkpKTtcbn0pO1xuXG5pbnN0YWxsTWFjcm8oc3ltYm9sKHZvaWQoMCksIFwiZGVmbi1cIiksIGZ1bmN0aW9uIGRlZm4obmFtZSkge1xuICB2YXIgYm9keSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHJldHVybiBjb25jYXQobGlzdChzeW1ib2wodm9pZCgwKSwgXCJkZWZuXCIpLCB3aXRoTWV0YShuYW1lLCBjb25qKHtcbiAgICBcInByaXZhdGVcIjogdHJ1ZVxuICB9LCBtZXRhKG5hbWUpKSkpLCBib2R5KTtcbn0pO1xuXG5pbnN0YWxsTWFjcm8oc3ltYm9sKHZvaWQoMCksIFwiYXNzZXJ0XCIpLCBmdW5jdGlvbiBhc3NlcnQoeCwgbWVzc2FnZSkge1xuICB2YXIgdGl0bGUgPSBtZXNzYWdlIHx8IFwiXCI7XG4gIHZhciBhc3NlcnRpb24gPSBwclN0cih4KTtcbiAgdmFyIHVyaSA9ICh4IHx8IDApW1widXJpXCJdO1xuICB2YXIgZm9ybSA9IGlzTGlzdCh4KSA/XG4gICAgc2Vjb25kKHgpIDpcbiAgICB4O1xuICByZXR1cm4gbGlzdChzeW1ib2wodm9pZCgwKSwgXCJkb1wiKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJpZlwiKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJhbmRcIiksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwibm90XCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImlkZW50aWNhbD9cIiksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwidHlwZW9mXCIpLCBzeW1ib2wodm9pZCgwKSwgXCIqKnZlcmJvc2UqKlwiKSksIFwidW5kZWZpbmVkXCIpKSwgc3ltYm9sKHZvaWQoMCksIFwiKip2ZXJib3NlKipcIikpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcIi5sb2dcIiksIHN5bWJvbCh2b2lkKDApLCBcImNvbnNvbGVcIiksIFwiQXNzZXJ0OlwiLCBhc3NlcnRpb24pKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJpZlwiKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJub3RcIiksIHgpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInRocm93XCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcIkVycm9yLlwiKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJzdHJcIiksIFwiQXNzZXJ0IGZhaWxlZDogXCIsIHRpdGxlLCBcIlxcblxcbkFzc2VydGlvbjpcXG5cXG5cIiwgYXNzZXJ0aW9uLCBcIlxcblxcbkFjdHVhbDpcXG5cXG5cIiwgZm9ybSwgXCJcXG4tLS0tLS0tLS0tLS0tLVxcblwiKSwgdXJpKSkpKTtcbn0pO1xuXG5pbnN0YWxsTWFjcm8oc3ltYm9sKHZvaWQoMCksIFwiaW1wb3J0XCIpLCBmdW5jdGlvbihpbXBvcnRzLCBwYXRoKSB7XG4gIHJldHVybiBpc05pbChwYXRoKSA/XG4gICAgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJyZXF1aXJlXCIpLCBpbXBvcnRzKSA6XG4gIGlzU3ltYm9sKGltcG9ydHMpID9cbiAgICBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImRlZlwiKSwgd2l0aE1ldGEoaW1wb3J0cywge1xuICAgICAgXCJwcml2YXRlXCI6IHRydWVcbiAgICB9KSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJyZXF1aXJlXCIpLCBwYXRoKSkgOlxuICAgIChmdW5jdGlvbiBsb29wKGZvcm0sIG5hbWVzKSB7XG4gICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICAgIHJlY3VyID0gaXNFbXB0eShuYW1lcykgP1xuICAgICAgICBjb25jYXQobGlzdChzeW1ib2wodm9pZCgwKSwgXCJkbypcIikpLCBmb3JtKSA6XG4gICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgYWxpYXMgPSBmaXJzdChuYW1lcyk7XG4gICAgICAgICAgdmFyIGlkID0gc3ltYm9sKFwiXCIgKyBcIi4tXCIgKyAobmFtZShhbGlhcykpKTtcbiAgICAgICAgICByZXR1cm4gKGZvcm0gPSBjb25zKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZGVmXCIpLCB3aXRoTWV0YShhbGlhcywge1xuICAgICAgICAgICAgXCJwcml2YXRlXCI6IHRydWVcbiAgICAgICAgICB9KSwgbGlzdChpZCwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJyZXF1aXJlXCIpLCBwYXRoKSkpLCBmb3JtKSwgbmFtZXMgPSByZXN0KG5hbWVzKSwgbG9vcCk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlY3VyO1xuICAgIH0pKGxpc3QoKSwgaW1wb3J0cyk7XG59KTtcblxudmFyIGV4cGFuZE5zID0gZnVuY3Rpb24gZXhwYW5kTnMoaWQpIHtcbiAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5zID0gXCJcIiArIGlkO1xuICAgIHZhciByZXF1aXJlciA9IHNwbGl0KG5zLCBcIi5cIik7XG4gICAgdmFyIGRvYyA9IGlzU3RyaW5nKGZpcnN0KHBhcmFtcykpID9cbiAgICAgIGZpcnN0KHBhcmFtcykgOlxuICAgICAgdm9pZCgwKTtcbiAgICB2YXIgYXJncyA9IGRvYyA/XG4gICAgICByZXN0KHBhcmFtcykgOlxuICAgICAgcGFyYW1zO1xuICAgIHZhciBwYXJzZVJlZmVyZW5jZXMgPSBmdW5jdGlvbihmb3Jtcykge1xuICAgICAgcmV0dXJuIHJlZHVjZShmdW5jdGlvbihyZWZlcmVuY2VzLCBmb3JtKSB7XG4gICAgICAgIChyZWZlcmVuY2VzIHx8IDApW25hbWUoZmlyc3QoZm9ybSkpXSA9IHZlYyhyZXN0KGZvcm0pKTtcbiAgICAgICAgcmV0dXJuIHJlZmVyZW5jZXM7XG4gICAgICB9LCB7fSwgZm9ybXMpO1xuICAgIH07XG4gICAgdmFyIHJlZmVyZW5jZXMgPSBwYXJzZVJlZmVyZW5jZXMoYXJncyk7XG4gICAgdmFyIGlkVG9QYXRoID0gZnVuY3Rpb24gaWRUb1BhdGgoaWQpIHtcbiAgICAgIHZhciByZXF1aXJlbWVudCA9IHNwbGl0KFwiXCIgKyBpZCwgXCIuXCIpO1xuICAgICAgdmFyIGlzUmVsYXRpdmUgPSBmaXJzdChyZXF1aXJlcikgPT09IGZpcnN0KHJlcXVpcmVtZW50KTtcbiAgICAgIHJldHVybiBpc1JlbGF0aXZlID9cbiAgICAgICAgKGZ1bmN0aW9uIGxvb3AoZnJvbSwgdG8pIHtcbiAgICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgICAgICAgcmVjdXIgPSBmaXJzdChmcm9tKSA9PT0gZmlyc3QodG8pID9cbiAgICAgICAgICAgIChmcm9tID0gcmVzdChmcm9tKSwgdG8gPSByZXN0KHRvKSwgbG9vcCkgOlxuICAgICAgICAgICAgam9pbihcIi9cIiwgY29uY2F0KFtcIi5cIl0sIHJlcGVhdChkZWMoY291bnQoZnJvbSkpLCBcIi4uXCIpLCB0bykpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgICB9KShyZXF1aXJlciwgcmVxdWlyZW1lbnQpIDpcbiAgICAgICAgam9pbihcIi9cIiwgcmVxdWlyZW1lbnQpO1xuICAgIH07XG4gICAgdmFyIG1ha2VSZXF1aXJlID0gZnVuY3Rpb24oZnJvbSwgYXMsIG5hbWUpIHtcbiAgICAgIHZhciBwYXRoID0gaWRUb1BhdGgoZnJvbSk7XG4gICAgICB2YXIgcmVxdWlyZW1lbnQgPSBuYW1lID9cbiAgICAgICAgbGlzdChzeW1ib2wodm9pZCgwKSwgXCIuXCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInJlcXVpcmVcIiksIHBhdGgpLCBzeW1ib2wodm9pZCgwKSwgXCJcIiArIFwiLVwiICsgbmFtZSkpIDpcbiAgICAgICAgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJyZXF1aXJlXCIpLCBwYXRoKTtcbiAgICAgIHJldHVybiBhcyA/XG4gICAgICAgIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZGVmXCIpLCBhcywgcmVxdWlyZW1lbnQpIDpcbiAgICAgICAgcmVxdWlyZW1lbnQ7XG4gICAgfTtcbiAgICB2YXIgZXhwYW5kUmVxdWlyZW1lbnQgPSBmdW5jdGlvbihmb3JtKSB7XG4gICAgICB2YXIgZnJvbSA9IGZpcnN0KGZvcm0pO1xuICAgICAgdmFyIGFzID0gKFwi6p6JYXNcIiA9PT0gc2Vjb25kKGZvcm0pKSAmJiAodGhpcmQoZm9ybSkpO1xuICAgICAgcmV0dXJuIG1ha2VSZXF1aXJlKGZyb20sIGFzKTtcbiAgICB9O1xuICAgIHZhciBleHBhbmRVc2UgPSBmdW5jdGlvbihmb3JtKSB7XG4gICAgICB2YXIgZnJvbSA9IGZpcnN0KGZvcm0pO1xuICAgICAgdmFyIGRpcmVjdGl2ZXMgPSBkaWN0aW9uYXJ5LmFwcGx5KGRpY3Rpb25hcnksIHZlYyhyZXN0KGZvcm0pKSk7XG4gICAgICB2YXIgbmFtZXMgPSAoZGlyZWN0aXZlcyB8fCAwKVtcIuqeiW9ubHlcIl07XG4gICAgICB2YXIgcmVuYW1lcyA9IChkaXJlY3RpdmVzIHx8IDApW1wi6p6JcmVuYW1lXCJdO1xuICAgICAgdmFyIG5hbWVkSW1wb3J0cyA9IG5hbWVzICYmIChtYXAoZnVuY3Rpb24obmFtZSkge1xuICAgICAgICByZXR1cm4gbWFrZVJlcXVpcmUoZnJvbSwgbmFtZSwgbmFtZSk7XG4gICAgICB9LCBuYW1lcykpO1xuICAgICAgdmFyIHJlbmFtZWRJbXBvcnRzID0gcmVuYW1lcyAmJiAobWFwKGZ1bmN0aW9uKHBhaXIpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VSZXF1aXJlKGZyb20sIHNlY29uZChwYWlyKSwgZmlyc3QocGFpcikpO1xuICAgICAgfSwgcmVuYW1lcykpO1xuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAoISh0eXBlb2YoX192ZXJib3NlX18pID09PSBcInVuZGVmaW5lZFwiKSkgJiYgX192ZXJib3NlX18gP1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXNzZXJ0OlwiLCBcIihvciBuYW1lcyByZW5hbWVzKVwiKSA6XG4gICAgICAgICAgdm9pZCgwKTtcbiAgICAgICAgcmV0dXJuICEobmFtZXMgfHwgcmVuYW1lcykgP1xuICAgICAgICAgIChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBcIkFzc2VydCBmYWlsZWQ6IFwiICsgKFwiXCIgKyBcIk9ubHkgW215LmxpYiA6b25seSBbZm9vIGJhcl1dIGZvcm0gJiBcIiArIFwiW2Nsb2p1cmUuc3RyaW5nIDpyZW5hbWUge3JlcGxhY2Ugc3RyLXJlcGxhY2V9IGFyZSBzdXBwb3J0ZWRcIikgKyBcIlxcblxcbkFzc2VydGlvbjpcXG5cXG5cIiArIFwiKG9yIG5hbWVzIHJlbmFtZXMpXCIgKyBcIlxcblxcbkFjdHVhbDpcXG5cXG5cIiArIG5hbWVzICsgXCJcXG4tLS0tLS0tLS0tLS0tLVxcblwiLCB2b2lkKDApKTsgfSkoKSA6XG4gICAgICAgICAgdm9pZCgwKTtcbiAgICAgIH0pKCk7XG4gICAgICByZXR1cm4gY29uY2F0KFtdLCBuYW1lZEltcG9ydHMsIHJlbmFtZWRJbXBvcnRzKTtcbiAgICB9O1xuICAgIHZhciByZXF1aXJlRm9ybXMgPSAocmVmZXJlbmNlcyB8fCAwKVtcInJlcXVpcmVcIl07XG4gICAgdmFyIHVzZUZvcm1zID0gKHJlZmVyZW5jZXMgfHwgMClbXCJ1c2VcIl07XG4gICAgdmFyIHJlcXVpcmVtZW50cyA9IHJlcXVpcmVGb3JtcyA/XG4gICAgICBtYXAoZXhwYW5kUmVxdWlyZW1lbnQsIHJlcXVpcmVGb3JtcykgOlxuICAgICAgdm9pZCgwKTtcbiAgICB2YXIgdXNlcyA9IHVzZUZvcm1zID9cbiAgICAgIGNvbmNhdC5hcHBseShjb25jYXQsIG1hcChleHBhbmRVc2UsIHVzZUZvcm1zKSkgOlxuICAgICAgdm9pZCgwKTtcbiAgICByZXR1cm4gY29uY2F0KGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZG8qXCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImRlZlwiKSwgc3ltYm9sKHZvaWQoMCksIFwiKm5zKlwiKSwgbnMpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInNldCFcIiksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiLi1uYW1lc3BhY2VcIiksIHN5bWJvbCh2b2lkKDApLCBcIm1vZHVsZVwiKSksIHN5bWJvbCh2b2lkKDApLCBcIipucypcIikpKSwgZG9jID9cbiAgICAgIFtsaXN0KHN5bWJvbCh2b2lkKDApLCBcInNldCFcIiksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiLi1kZXNjcmlwdGlvblwiKSwgc3ltYm9sKHZvaWQoMCksIFwibW9kdWxlXCIpKSwgZG9jKV0gOlxuICAgICAgdm9pZCgwKSwgcmVxdWlyZW1lbnRzLCB1c2VzKTtcbiAgfSkoKTtcbn07XG5leHBvcnRzLmV4cGFuZE5zID0gZXhwYW5kTnM7XG5cbmluc3RhbGxNYWNybyhzeW1ib2wodm9pZCgwKSwgXCJuc1wiKSwgZXhwYW5kTnMpO1xuXG5pbnN0YWxsTWFjcm8oc3ltYm9sKHZvaWQoMCksIFwicHJpbnRcIiksIGZ1bmN0aW9uKCkge1xuICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIFwiUHJpbnRzIHRoZSBvYmplY3QocykgdG8gdGhlIG91dHB1dCBmb3IgaHVtYW4gY29uc3VtcHRpb24uXCI7XG4gIHJldHVybiBjb25jYXQobGlzdChzeW1ib2wodm9pZCgwKSwgXCIubG9nXCIpLCBzeW1ib2wodm9pZCgwKSwgXCJjb25zb2xlXCIpKSwgbW9yZSk7XG59KVxuIiwidmFyIF9uc18gPSBcIndpc3AuZW5naW5lLmJyb3dzZXJcIjtcbm1vZHVsZS5uYW1lc3BhY2UgPSBfbnNfO1xudmFyIHN0ciA9IChyZXF1aXJlKFwiLi8uLi9ydW50aW1lXCIpKS5zdHI7XG52YXIgcmVzdCA9IChyZXF1aXJlKFwiLi8uLi9zZXF1ZW5jZVwiKSkucmVzdDtcbnZhciByZWFkRnJvbVN0cmluZyA9IChyZXF1aXJlKFwiLi8uLi9yZWFkZXJcIikpLnJlYWRGcm9tU3RyaW5nO1xudmFyIGNvbXBpbGVQcm9ncmFtID0gKHJlcXVpcmUoXCIuLy4uL2NvbXBpbGVyXCIpKS5jb21waWxlUHJvZ3JhbTs7XG5cbnZhciB0cmFuc3BpbGUgPSBmdW5jdGlvbiB0cmFuc3BpbGUoc291cmNlLCB1cmkpIHtcbiAgcmV0dXJuIFwiXCIgKyAoY29tcGlsZVByb2dyYW0ocmVzdChyZWFkRnJvbVN0cmluZyhcIlwiICsgXCIoZG8gXCIgKyBzb3VyY2UgKyBcIilcIiwgdXJpKSkpKSArIFwiXFxuXCI7XG59O1xuZXhwb3J0cy50cmFuc3BpbGUgPSB0cmFuc3BpbGU7XG5cbnZhciBldmFsdWF0ZSA9IGZ1bmN0aW9uIGV2YWx1YXRlKGNvZGUsIHVybCkge1xuICByZXR1cm4gZXZhbCh0cmFuc3BpbGUoY29kZSwgdXJsKSk7XG59O1xuZXhwb3J0cy5ldmFsdWF0ZSA9IGV2YWx1YXRlO1xuXG52YXIgcnVuID0gZnVuY3Rpb24gcnVuKGNvZGUsIHVybCkge1xuICByZXR1cm4gKEZ1bmN0aW9uKHRyYW5zcGlsZShjb2RlLCB1cmwpKSkoKTtcbn07XG5leHBvcnRzLnJ1biA9IHJ1bjtcblxudmFyIGxvYWQgPSBmdW5jdGlvbiBsb2FkKHVybCwgY2FsbGJhY2spIHtcbiAgdmFyIHJlcXVlc3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgP1xuICAgIG5ldyBYTUxIdHRwUmVxdWVzdCgpIDpcbiAgICBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuICByZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcbiAgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlID9cbiAgICByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUoXCJhcHBsaWNhdGlvbi93aXNwXCIpIDpcbiAgICB2b2lkKDApO1xuICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiByZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQgP1xuICAgICAgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB8fCAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkgP1xuICAgICAgICBjYWxsYmFjayhydW4ocmVxdWVzdC5yZXNwb25zZVRleHQsIHVybCkpIDpcbiAgICAgICAgY2FsbGJhY2soXCJDb3VsZCBub3QgbG9hZFwiKSA6XG4gICAgICB2b2lkKDApO1xuICB9O1xuICByZXR1cm4gcmVxdWVzdC5zZW5kKG51bGwpO1xufTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5cbnZhciBydW5TY3JpcHRzID0gZnVuY3Rpb24gcnVuU2NyaXB0cygpIHtcbiAgdmFyIHNjcmlwdHMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIiksIGZ1bmN0aW9uKHNjcmlwdCkge1xuICAgIHJldHVybiBzY3JpcHQudHlwZSA9PT0gXCJhcHBsaWNhdGlvbi93aXNwXCI7XG4gIH0pO1xuICB2YXIgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgcmV0dXJuIHNjcmlwdHMubGVuZ3RoID9cbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNjcmlwdCA9IHNjcmlwdHMuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHNjcmlwdC5zcmMgP1xuICAgICAgICAgIGxvYWQoc2NyaXB0LnNyYywgbmV4dCkgOlxuICAgICAgICAgIG5leHQocnVuKHNjcmlwdC5pbm5lckhUTUwpKTtcbiAgICAgIH0pKCkgOlxuICAgICAgdm9pZCgwKTtcbiAgfTtcbiAgcmV0dXJuIG5leHQoKTtcbn07XG5leHBvcnRzLnJ1blNjcmlwdHMgPSBydW5TY3JpcHRzO1xuXG4oZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB8fCAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSA/XG4gIHJ1blNjcmlwdHMoKSA6XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA/XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBydW5TY3JpcHRzLCBmYWxzZSkgOlxuICB3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIiwgcnVuU2NyaXB0cylcbiIsInZhciBfbnNfID0gXCJ3aXNwLmFzdFwiO1xubW9kdWxlLm5hbWVzcGFjZSA9IF9uc187XG52YXIgaXNMaXN0ID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5pc0xpc3Q7XG52YXIgaXNTZXF1ZW50aWFsID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5pc1NlcXVlbnRpYWw7XG52YXIgZmlyc3QgPSAocmVxdWlyZShcIi4vc2VxdWVuY2VcIikpLmZpcnN0O1xudmFyIHNlY29uZCA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkuc2Vjb25kO1xudmFyIGNvdW50ID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5jb3VudDtcbnZhciBsYXN0ID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS5sYXN0O1xudmFyIG1hcCA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkubWFwO1xudmFyIHZlYyA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkudmVjO1xudmFyIHNwbGl0ID0gKHJlcXVpcmUoXCIuL3N0cmluZ1wiKSkuc3BsaXQ7XG52YXIgam9pbiA9IChyZXF1aXJlKFwiLi9zdHJpbmdcIikpLmpvaW47XG52YXIgaXNOaWwgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNOaWw7XG52YXIgaXNWZWN0b3IgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNWZWN0b3I7XG52YXIgaXNOdW1iZXIgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNOdW1iZXI7XG52YXIgaXNTdHJpbmcgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNTdHJpbmc7XG52YXIgaXNCb29sZWFuID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmlzQm9vbGVhbjtcbnZhciBpc09iamVjdCA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc09iamVjdDtcbnZhciBpc0RhdGUgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNEYXRlO1xudmFyIGlzUmVQYXR0ZXJuID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmlzUmVQYXR0ZXJuO1xudmFyIGlzRGljdGlvbmFyeSA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5pc0RpY3Rpb25hcnk7XG52YXIgc3RyID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLnN0cjtcbnZhciBpbmMgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaW5jO1xudmFyIHN1YnMgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuc3VicztcbnZhciBpc0VxdWFsID0gKHJlcXVpcmUoXCIuL3J1bnRpbWVcIikpLmlzRXF1YWw7O1xuXG52YXIgd2l0aE1ldGEgPSBmdW5jdGlvbiB3aXRoTWV0YSh2YWx1ZSwgbWV0YWRhdGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHVlLCBcIm1ldGFkYXRhXCIsIHtcbiAgICBcInZhbHVlXCI6IG1ldGFkYXRhLFxuICAgIFwiY29uZmlndXJhYmxlXCI6IHRydWVcbiAgfSk7XG4gIHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnRzLndpdGhNZXRhID0gd2l0aE1ldGE7XG5cbnZhciBtZXRhID0gZnVuY3Rpb24gbWV0YSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID9cbiAgICB2YWx1ZS5tZXRhZGF0YSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLm1ldGEgPSBtZXRhO1xuXG52YXIgX19uc1NlcGFyYXRvcl9fID0gXCLigYRcIjtcbmV4cG9ydHMuX19uc1NlcGFyYXRvcl9fID0gX19uc1NlcGFyYXRvcl9fO1xuXG52YXIgU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKG5hbWVzcGFjZSwgbmFtZSkge1xuICB0aGlzLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5TeW1ib2wudHlwZSA9IFwid2lzcC5zeW1ib2xcIjtcblxuU3ltYm9sLnByb3RvdHlwZS50eXBlID0gU3ltYm9sLnR5cGU7XG5cblN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG5zID0gbmFtZXNwYWNlKHRoaXMpO1xuICByZXR1cm4gbnMgP1xuICAgIFwiXCIgKyBucyArIFwiL1wiICsgKG5hbWUodGhpcykpIDpcbiAgICBcIlwiICsgKG5hbWUodGhpcykpO1xufTtcblxudmFyIHN5bWJvbCA9IGZ1bmN0aW9uIHN5bWJvbChucywgaWQpIHtcbiAgcmV0dXJuIGlzU3ltYm9sKG5zKSA/XG4gICAgbnMgOlxuICBpc0tleXdvcmQobnMpID9cbiAgICBuZXcgU3ltYm9sKG5hbWVzcGFjZShucyksIG5hbWUobnMpKSA6XG4gIGlzTmlsKGlkKSA/XG4gICAgbmV3IFN5bWJvbCh2b2lkKDApLCBucykgOlxuICBcImVsc2VcIiA/XG4gICAgbmV3IFN5bWJvbChucywgaWQpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuc3ltYm9sID0gc3ltYm9sO1xuXG52YXIgaXNTeW1ib2wgPSBmdW5jdGlvbiBpc1N5bWJvbCh4KSB7XG4gIHJldHVybiB4ICYmIChTeW1ib2wudHlwZSA9PT0geC50eXBlKTtcbn07XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbnZhciBpc0tleXdvcmQgPSBmdW5jdGlvbiBpc0tleXdvcmQoeCkge1xuICByZXR1cm4gKGlzU3RyaW5nKHgpKSAmJiAoY291bnQoeCkgPiAxKSAmJiAoZmlyc3QoeCkgPT09IFwi6p6JXCIpO1xufTtcbmV4cG9ydHMuaXNLZXl3b3JkID0gaXNLZXl3b3JkO1xuXG52YXIga2V5d29yZCA9IGZ1bmN0aW9uIGtleXdvcmQobnMsIGlkKSB7XG4gIHJldHVybiBpc0tleXdvcmQobnMpID9cbiAgICBucyA6XG4gIGlzU3ltYm9sKG5zKSA/XG4gICAgXCJcIiArIFwi6p6JXCIgKyAobmFtZShucykpIDpcbiAgaXNOaWwoaWQpID9cbiAgICBcIlwiICsgXCLqnolcIiArIG5zIDpcbiAgaXNOaWwobnMpID9cbiAgICBcIlwiICsgXCLqnolcIiArIGlkIDpcbiAgXCJlbHNlXCIgP1xuICAgIFwiXCIgKyBcIuqeiVwiICsgbnMgKyBfX25zU2VwYXJhdG9yX18gKyBpZCA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmtleXdvcmQgPSBrZXl3b3JkO1xuXG52YXIga2V5d29yZE5hbWUgPSBmdW5jdGlvbiBrZXl3b3JkTmFtZSh2YWx1ZSkge1xuICByZXR1cm4gbGFzdChzcGxpdChzdWJzKHZhbHVlLCAxKSwgX19uc1NlcGFyYXRvcl9fKSk7XG59O1xuXG52YXIgbmFtZSA9IGZ1bmN0aW9uIG5hbWUodmFsdWUpIHtcbiAgcmV0dXJuIGlzU3ltYm9sKHZhbHVlKSA/XG4gICAgdmFsdWUubmFtZSA6XG4gIGlzS2V5d29yZCh2YWx1ZSkgP1xuICAgIGtleXdvcmROYW1lKHZhbHVlKSA6XG4gIGlzU3RyaW5nKHZhbHVlKSA/XG4gICAgdmFsdWUgOlxuICBcImVsc2VcIiA/XG4gICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiXCIgKyBcIkRvZXNuJ3Qgc3VwcG9ydCBuYW1lOiBcIiArIHZhbHVlKTsgfSkoKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLm5hbWUgPSBuYW1lO1xuXG52YXIga2V5d29yZE5hbWVzcGFjZSA9IGZ1bmN0aW9uIGtleXdvcmROYW1lc3BhY2UoeCkge1xuICB2YXIgcGFydHMgPSBzcGxpdChzdWJzKHgsIDEpLCBfX25zU2VwYXJhdG9yX18pO1xuICByZXR1cm4gY291bnQocGFydHMpID4gMSA/XG4gICAgKHBhcnRzIHx8IDApWzBdIDpcbiAgICB2b2lkKDApO1xufTtcblxudmFyIG5hbWVzcGFjZSA9IGZ1bmN0aW9uIG5hbWVzcGFjZSh4KSB7XG4gIHJldHVybiBpc1N5bWJvbCh4KSA/XG4gICAgeC5uYW1lc3BhY2UgOlxuICBpc0tleXdvcmQoeCkgP1xuICAgIGtleXdvcmROYW1lc3BhY2UoeCkgOlxuICBcImVsc2VcIiA/XG4gICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiXCIgKyBcIkRvZXNuJ3Qgc3VwcG9ydHMgbmFtZXNwYWNlOiBcIiArIHgpOyB9KSgpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuXG52YXIgZ2Vuc3ltID0gZnVuY3Rpb24gZ2Vuc3ltKHByZWZpeCkge1xuICByZXR1cm4gc3ltYm9sKFwiXCIgKyAoaXNOaWwocHJlZml4KSA/XG4gICAgXCJHX19cIiA6XG4gICAgcHJlZml4KSArIChnZW5zeW0uYmFzZSA9IGdlbnN5bS5iYXNlICsgMSkpO1xufTtcbmV4cG9ydHMuZ2Vuc3ltID0gZ2Vuc3ltO1xuXG5nZW5zeW0uYmFzZSA9IDA7XG5cbnZhciBpc1VucXVvdGUgPSBmdW5jdGlvbiBpc1VucXVvdGUoZm9ybSkge1xuICByZXR1cm4gKGlzTGlzdChmb3JtKSkgJiYgKGlzRXF1YWwoZmlyc3QoZm9ybSksIHN5bWJvbCh2b2lkKDApLCBcInVucXVvdGVcIikpKTtcbn07XG5leHBvcnRzLmlzVW5xdW90ZSA9IGlzVW5xdW90ZTtcblxudmFyIGlzVW5xdW90ZVNwbGljaW5nID0gZnVuY3Rpb24gaXNVbnF1b3RlU3BsaWNpbmcoZm9ybSkge1xuICByZXR1cm4gKGlzTGlzdChmb3JtKSkgJiYgKGlzRXF1YWwoZmlyc3QoZm9ybSksIHN5bWJvbCh2b2lkKDApLCBcInVucXVvdGUtc3BsaWNpbmdcIikpKTtcbn07XG5leHBvcnRzLmlzVW5xdW90ZVNwbGljaW5nID0gaXNVbnF1b3RlU3BsaWNpbmc7XG5cbnZhciBpc1F1b3RlID0gZnVuY3Rpb24gaXNRdW90ZShmb3JtKSB7XG4gIHJldHVybiAoaXNMaXN0KGZvcm0pKSAmJiAoaXNFcXVhbChmaXJzdChmb3JtKSwgc3ltYm9sKHZvaWQoMCksIFwicXVvdGVcIikpKTtcbn07XG5leHBvcnRzLmlzUXVvdGUgPSBpc1F1b3RlO1xuXG52YXIgaXNTeW50YXhRdW90ZSA9IGZ1bmN0aW9uIGlzU3ludGF4UXVvdGUoZm9ybSkge1xuICByZXR1cm4gKGlzTGlzdChmb3JtKSkgJiYgKGlzRXF1YWwoZmlyc3QoZm9ybSksIHN5bWJvbCh2b2lkKDApLCBcInN5bnRheC1xdW90ZVwiKSkpO1xufTtcbmV4cG9ydHMuaXNTeW50YXhRdW90ZSA9IGlzU3ludGF4UXVvdGU7XG5cbnZhciBub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUobiwgbGVuKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChucykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGNvdW50KG5zKSA8IGxlbiA/XG4gICAgICAobnMgPSBcIlwiICsgXCIwXCIgKyBucywgbG9vcCkgOlxuICAgICAgbnM7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFwiXCIgKyBuKTtcbn07XG5cbnZhciBxdW90ZVN0cmluZyA9IGZ1bmN0aW9uIHF1b3RlU3RyaW5nKHMpIHtcbiAgcyA9IGpvaW4oXCJcXFxcXFxcIlwiLCBzcGxpdChzLCBcIlxcXCJcIikpO1xuICBzID0gam9pbihcIlxcXFxcXFxcXCIsIHNwbGl0KHMsIFwiXFxcXFwiKSk7XG4gIHMgPSBqb2luKFwiXFxcXGJcIiwgc3BsaXQocywgXCJcYlwiKSk7XG4gIHMgPSBqb2luKFwiXFxcXGZcIiwgc3BsaXQocywgXCJcZlwiKSk7XG4gIHMgPSBqb2luKFwiXFxcXG5cIiwgc3BsaXQocywgXCJcXG5cIikpO1xuICBzID0gam9pbihcIlxcXFxyXCIsIHNwbGl0KHMsIFwiXFxyXCIpKTtcbiAgcyA9IGpvaW4oXCJcXFxcdFwiLCBzcGxpdChzLCBcIlxcdFwiKSk7XG4gIHJldHVybiBcIlwiICsgXCJcXFwiXCIgKyBzICsgXCJcXFwiXCI7XG59O1xuZXhwb3J0cy5xdW90ZVN0cmluZyA9IHF1b3RlU3RyaW5nO1xuXG52YXIgcHJTdHIgPSBmdW5jdGlvbiBwclN0cih4KSB7XG4gIHJldHVybiBpc05pbCh4KSA/XG4gICAgXCJuaWxcIiA6XG4gIGlzS2V5d29yZCh4KSA/XG4gICAgbmFtZXNwYWNlKHgpID9cbiAgICAgIFwiXCIgKyBcIjpcIiArIChuYW1lc3BhY2UoeCkpICsgXCIvXCIgKyAobmFtZSh4KSkgOlxuICAgICAgXCJcIiArIFwiOlwiICsgKG5hbWUoeCkpIDpcbiAgaXNTdHJpbmcoeCkgP1xuICAgIHF1b3RlU3RyaW5nKHgpIDpcbiAgaXNEYXRlKHgpID9cbiAgICBcIlwiICsgXCIjaW5zdCBcXFwiXCIgKyAoeC5nZXRVVENGdWxsWWVhcigpKSArIFwiLVwiICsgKG5vcm1hbGl6ZShpbmMoeC5nZXRVVENNb250aCgpKSwgMikpICsgXCItXCIgKyAobm9ybWFsaXplKHguZ2V0VVRDRGF0ZSgpLCAyKSkgKyBcIlRcIiArIChub3JtYWxpemUoeC5nZXRVVENIb3VycygpLCAyKSkgKyBcIjpcIiArIChub3JtYWxpemUoeC5nZXRVVENNaW51dGVzKCksIDIpKSArIFwiOlwiICsgKG5vcm1hbGl6ZSh4LmdldFVUQ1NlY29uZHMoKSwgMikpICsgXCIuXCIgKyAobm9ybWFsaXplKHguZ2V0VVRDTWlsbGlzZWNvbmRzKCksIDMpKSArIFwiLVwiICsgXCIwMDowMFxcXCJcIiA6XG4gIGlzVmVjdG9yKHgpID9cbiAgICBcIlwiICsgXCJbXCIgKyAoam9pbihcIiBcIiwgbWFwKHByU3RyLCB2ZWMoeCkpKSkgKyBcIl1cIiA6XG4gIGlzRGljdGlvbmFyeSh4KSA/XG4gICAgXCJcIiArIFwie1wiICsgKGpvaW4oXCIsIFwiLCBtYXAoZnVuY3Rpb24ocGFpcikge1xuICAgICAgcmV0dXJuIFwiXCIgKyAocHJTdHIoZmlyc3QocGFpcikpKSArIFwiIFwiICsgKHByU3RyKHNlY29uZChwYWlyKSkpO1xuICAgIH0sIHgpKSkgKyBcIn1cIiA6XG4gIGlzU2VxdWVudGlhbCh4KSA/XG4gICAgXCJcIiArIFwiKFwiICsgKGpvaW4oXCIgXCIsIG1hcChwclN0ciwgdmVjKHgpKSkpICsgXCIpXCIgOlxuICBpc1JlUGF0dGVybih4KSA/XG4gICAgXCJcIiArIFwiI1xcXCJcIiArIChqb2luKFwiXFxcXC9cIiwgc3BsaXQoeC5zb3VyY2UsIFwiL1wiKSkpICsgXCJcXFwiXCIgOlxuICBcImVsc2VcIiA/XG4gICAgXCJcIiArIHggOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5wclN0ciA9IHByU3RyXG4iLCJ2YXIgX25zXyA9IFwid2lzcC5zdHJpbmdcIjtcbm1vZHVsZS5uYW1lc3BhY2UgPSBfbnNfO1xudmFyIHN0ciA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5zdHI7XG52YXIgc3VicyA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5zdWJzO1xudmFyIHJlTWF0Y2hlcyA9IChyZXF1aXJlKFwiLi9ydW50aW1lXCIpKS5yZU1hdGNoZXM7XG52YXIgaXNOaWwgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNOaWw7XG52YXIgaXNTdHJpbmcgPSAocmVxdWlyZShcIi4vcnVudGltZVwiKSkuaXNTdHJpbmc7XG52YXIgdmVjID0gKHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpKS52ZWM7XG52YXIgaXNFbXB0eSA9IChyZXF1aXJlKFwiLi9zZXF1ZW5jZVwiKSkuaXNFbXB0eTs7XG5cbnZhciBzcGxpdCA9IGZ1bmN0aW9uIHNwbGl0KHN0cmluZywgcGF0dGVybiwgbGltaXQpIHtcbiAgcmV0dXJuIHN0cmluZy5zcGxpdChwYXR0ZXJuLCBsaW1pdCk7XG59O1xuZXhwb3J0cy5zcGxpdCA9IHNwbGl0O1xuXG52YXIgam9pbiA9IGZ1bmN0aW9uIGpvaW4oc2VwYXJhdG9yLCBjb2xsKSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMTpcbiAgICAgIHZhciBjb2xsID0gc2VwYXJhdG9yO1xuICAgICAgcmV0dXJuIHN0ci5hcHBseShzdHIsIHZlYyhjb2xsKSk7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHZlYyhjb2xsKS5qb2luKHNlcGFyYXRvcik7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBFcnJvcihcIkludmFsaWQgYXJpdHlcIik7IH0pKClcbiAgfTtcbiAgcmV0dXJuIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5qb2luID0gam9pbjtcblxudmFyIHVwcGVyQ2FzZSA9IGZ1bmN0aW9uIHVwcGVyQ2FzZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy50b1VwcGVyQ2FzZSgpO1xufTtcbmV4cG9ydHMudXBwZXJDYXNlID0gdXBwZXJDYXNlO1xuXG52YXIgdXBwZXJDYXNlID0gZnVuY3Rpb24gdXBwZXJDYXNlKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnRvVXBwZXJDYXNlKCk7XG59O1xuZXhwb3J0cy51cHBlckNhc2UgPSB1cHBlckNhc2U7XG5cbnZhciBsb3dlckNhc2UgPSBmdW5jdGlvbiBsb3dlckNhc2Uoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKTtcbn07XG5leHBvcnRzLmxvd2VyQ2FzZSA9IGxvd2VyQ2FzZTtcblxudmFyIGNhcGl0YWxpemUgPSBmdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICByZXR1cm4gY291bnQoc3RyaW5nKSA8IDIgP1xuICAgIHVwcGVyQ2FzZShzdHJpbmcpIDpcbiAgICBcIlwiICsgKHVwcGVyQ2FzZShzdWJzKHMsIDAsIDEpKSkgKyAobG93ZXJDYXNlKHN1YnMocywgMSkpKTtcbn07XG5leHBvcnRzLmNhcGl0YWxpemUgPSBjYXBpdGFsaXplO1xuXG52YXIgcmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2Uoc3RyaW5nLCBtYXRjaCwgcmVwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKG1hdGNoLCByZXBsYWNlbWVudCk7XG59O1xuZXhwb3J0cy5yZXBsYWNlID0gcmVwbGFjZTtcblxudmFyIF9fTEVGVFNQQUNFU19fID0gL15cXHNcXHMqLztcbmV4cG9ydHMuX19MRUZUU1BBQ0VTX18gPSBfX0xFRlRTUEFDRVNfXztcblxudmFyIF9fUklHSFRTUEFDRVNfXyA9IC9cXHNcXHMqJC87XG5leHBvcnRzLl9fUklHSFRTUEFDRVNfXyA9IF9fUklHSFRTUEFDRVNfXztcblxudmFyIF9fU1BBQ0VTX18gPSAvXlxcc1xccyokLztcbmV4cG9ydHMuX19TUEFDRVNfXyA9IF9fU1BBQ0VTX187XG5cbnZhciB0cmltbCA9IGlzTmlsKFwiXCIudHJpbUxlZnQpID9cbiAgZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9fTEVGVFNQQUNFU19fLCBcIlwiKTtcbiAgfSA6XG4gIGZ1bmN0aW9uIHRyaW1sKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcudHJpbUxlZnQoKTtcbiAgfTtcbmV4cG9ydHMudHJpbWwgPSB0cmltbDtcblxudmFyIHRyaW1yID0gaXNOaWwoXCJcIi50cmltUmlnaHQpID9cbiAgZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9fUklHSFRTUEFDRVNfXywgXCJcIik7XG4gIH0gOlxuICBmdW5jdGlvbiB0cmltcihzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnRyaW1SaWdodCgpO1xuICB9O1xuZXhwb3J0cy50cmltciA9IHRyaW1yO1xuXG52YXIgdHJpbSA9IGlzTmlsKFwiXCIudHJpbSkgP1xuICBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX19MRUZUU1BBQ0VTX18pLnJlcGxhY2UoX19SSUdIVFNQQUNFU19fKTtcbiAgfSA6XG4gIGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy50cmltKCk7XG4gIH07XG5leHBvcnRzLnRyaW0gPSB0cmltO1xuXG52YXIgaXNCbGFuayA9IGZ1bmN0aW9uIGlzQmxhbmsoc3RyaW5nKSB7XG4gIHJldHVybiAoaXNOaWwoc3RyaW5nKSkgfHwgKGlzRW1wdHkoc3RyaW5nKSkgfHwgKHJlTWF0Y2hlcyhfX1NQQUNFU19fLCBzdHJpbmcpKTtcbn07XG5leHBvcnRzLmlzQmxhbmsgPSBpc0JsYW5rXG4iLCJ2YXIgX25zXyA9IFwid2lzcC5iYWNrZW5kLmphdmFzY3JpcHQud3JpdGVyXCI7XG5tb2R1bGUubmFtZXNwYWNlID0gX25zXztcbm1vZHVsZS5kZXNjcmlwdGlvbiA9IFwiQ29tcGlsZXIgYmFja2VuZCBmb3IgZm9yIHdyaXRpbmcgSlMgb3V0cHV0XCI7XG52YXIgbmFtZSA9IChyZXF1aXJlKFwiLi8uLi8uLi9hc3RcIikpLm5hbWU7XG52YXIgbmFtZXNwYWNlID0gKHJlcXVpcmUoXCIuLy4uLy4uL2FzdFwiKSkubmFtZXNwYWNlO1xudmFyIHN5bWJvbCA9IChyZXF1aXJlKFwiLi8uLi8uLi9hc3RcIikpLnN5bWJvbDtcbnZhciBpc1N5bWJvbCA9IChyZXF1aXJlKFwiLi8uLi8uLi9hc3RcIikpLmlzU3ltYm9sO1xudmFyIGlzS2V5d29yZCA9IChyZXF1aXJlKFwiLi8uLi8uLi9hc3RcIikpLmlzS2V5d29yZDtcbnZhciBsaXN0ID0gKHJlcXVpcmUoXCIuLy4uLy4uL3NlcXVlbmNlXCIpKS5saXN0O1xudmFyIGZpcnN0ID0gKHJlcXVpcmUoXCIuLy4uLy4uL3NlcXVlbmNlXCIpKS5maXJzdDtcbnZhciByZXN0ID0gKHJlcXVpcmUoXCIuLy4uLy4uL3NlcXVlbmNlXCIpKS5yZXN0O1xudmFyIGlzTGlzdCA9IChyZXF1aXJlKFwiLi8uLi8uLi9zZXF1ZW5jZVwiKSkuaXNMaXN0O1xudmFyIHZlYyA9IChyZXF1aXJlKFwiLi8uLi8uLi9zZXF1ZW5jZVwiKSkudmVjO1xudmFyIG1hcCA9IChyZXF1aXJlKFwiLi8uLi8uLi9zZXF1ZW5jZVwiKSkubWFwO1xudmFyIGNvdW50ID0gKHJlcXVpcmUoXCIuLy4uLy4uL3NlcXVlbmNlXCIpKS5jb3VudDtcbnZhciBsYXN0ID0gKHJlcXVpcmUoXCIuLy4uLy4uL3NlcXVlbmNlXCIpKS5sYXN0O1xudmFyIHJlZHVjZSA9IChyZXF1aXJlKFwiLi8uLi8uLi9zZXF1ZW5jZVwiKSkucmVkdWNlO1xudmFyIGlzRW1wdHkgPSAocmVxdWlyZShcIi4vLi4vLi4vc2VxdWVuY2VcIikpLmlzRW1wdHk7XG52YXIgaXNUcnVlID0gKHJlcXVpcmUoXCIuLy4uLy4uL3J1bnRpbWVcIikpLmlzVHJ1ZTtcbnZhciBpc05pbCA9IChyZXF1aXJlKFwiLi8uLi8uLi9ydW50aW1lXCIpKS5pc05pbDtcbnZhciBpc1N0cmluZyA9IChyZXF1aXJlKFwiLi8uLi8uLi9ydW50aW1lXCIpKS5pc1N0cmluZztcbnZhciBpc051bWJlciA9IChyZXF1aXJlKFwiLi8uLi8uLi9ydW50aW1lXCIpKS5pc051bWJlcjtcbnZhciBpc1ZlY3RvciA9IChyZXF1aXJlKFwiLi8uLi8uLi9ydW50aW1lXCIpKS5pc1ZlY3RvcjtcbnZhciBpc0RpY3Rpb25hcnkgPSAocmVxdWlyZShcIi4vLi4vLi4vcnVudGltZVwiKSkuaXNEaWN0aW9uYXJ5O1xudmFyIGlzQm9vbGVhbiA9IChyZXF1aXJlKFwiLi8uLi8uLi9ydW50aW1lXCIpKS5pc0Jvb2xlYW47XG52YXIgaXNSZVBhdHRlcm4gPSAocmVxdWlyZShcIi4vLi4vLi4vcnVudGltZVwiKSkuaXNSZVBhdHRlcm47XG52YXIgcmVGaW5kID0gKHJlcXVpcmUoXCIuLy4uLy4uL3J1bnRpbWVcIikpLnJlRmluZDtcbnZhciBkZWMgPSAocmVxdWlyZShcIi4vLi4vLi4vcnVudGltZVwiKSkuZGVjO1xudmFyIHN1YnMgPSAocmVxdWlyZShcIi4vLi4vLi4vcnVudGltZVwiKSkuc3VicztcbnZhciByZXBsYWNlID0gKHJlcXVpcmUoXCIuLy4uLy4uL3N0cmluZ1wiKSkucmVwbGFjZTtcbnZhciBqb2luID0gKHJlcXVpcmUoXCIuLy4uLy4uL3N0cmluZ1wiKSkuam9pbjtcbnZhciBzcGxpdCA9IChyZXF1aXJlKFwiLi8uLi8uLi9zdHJpbmdcIikpLnNwbGl0O1xudmFyIHVwcGVyQ2FzZSA9IChyZXF1aXJlKFwiLi8uLi8uLi9zdHJpbmdcIikpLnVwcGVyQ2FzZTs7XG5cbnZhciB3cml0ZVJlZmVyZW5jZSA9IGZ1bmN0aW9uIHdyaXRlUmVmZXJlbmNlKGZvcm0pIHtcbiAgXCJUcmFuc2xhdGVzIHJlZmVyZW5jZXMgZnJvbSBjbG9qdXJlIGNvbnZlbnRpb24gdG8gSlM6XFxuXFxuICAqKm1hY3JvcyoqICAgICAgX19tYWNyb3NfX1xcbiAgbGlzdC0+dmVjdG9yICAgIGxpc3RUb1ZlY3RvclxcbiAgc2V0ISAgICAgICAgICAgIHNldFxcbiAgZm9vX2JhciAgICAgICAgIGZvb19iYXJcXG4gIG51bWJlcj8gICAgICAgICBpc051bWJlclxcbiAgY3JlYXRlLXNlcnZlciAgIGNyZWF0ZVNlcnZlclwiO1xuICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBpZCA9IG5hbWUoZm9ybSk7XG4gICAgaWQgPSBpZCA9PT0gXCIqXCIgP1xuICAgICAgXCJtdWx0aXBseVwiIDpcbiAgICBpZCA9PT0gXCIvXCIgP1xuICAgICAgXCJkaXZpZGVcIiA6XG4gICAgaWQgPT09IFwiK1wiID9cbiAgICAgIFwic3VtXCIgOlxuICAgIGlkID09PSBcIi1cIiA/XG4gICAgICBcInN1YnRyYWN0XCIgOlxuICAgIGlkID09PSBcIj1cIiA/XG4gICAgICBcImVxdWFsP1wiIDpcbiAgICBpZCA9PT0gXCI9PVwiID9cbiAgICAgIFwic3RyaWN0LWVxdWFsP1wiIDpcbiAgICBpZCA9PT0gXCI8PVwiID9cbiAgICAgIFwibm90LWdyZWF0ZXItdGhhblwiIDpcbiAgICBpZCA9PT0gXCI+PVwiID9cbiAgICAgIFwibm90LWxlc3MtdGhhblwiIDpcbiAgICBpZCA9PT0gXCI+XCIgP1xuICAgICAgXCJncmVhdGVyLXRoYW5cIiA6XG4gICAgaWQgPT09IFwiPFwiID9cbiAgICAgIFwibGVzcy10aGFuXCIgOlxuICAgIFwiZWxzZVwiID9cbiAgICAgIGlkIDpcbiAgICAgIHZvaWQoMCk7XG4gICAgaWQgPSBqb2luKFwiX1wiLCBzcGxpdChpZCwgXCIqXCIpKTtcbiAgICBpZCA9IGpvaW4oXCItdG8tXCIsIHNwbGl0KGlkLCBcIi0+XCIpKTtcbiAgICBpZCA9IGpvaW4oc3BsaXQoaWQsIFwiIVwiKSk7XG4gICAgaWQgPSBqb2luKFwiJFwiLCBzcGxpdChpZCwgXCIlXCIpKTtcbiAgICBpZCA9IGpvaW4oXCItcGx1cy1cIiwgc3BsaXQoaWQsIFwiK1wiKSk7XG4gICAgaWQgPSBqb2luKFwiLWFuZC1cIiwgc3BsaXQoaWQsIFwiJlwiKSk7XG4gICAgaWQgPSBsYXN0KGlkKSA9PT0gXCI/XCIgP1xuICAgICAgXCJcIiArIFwiaXMtXCIgKyAoc3VicyhpZCwgMCwgZGVjKGNvdW50KGlkKSkpKSA6XG4gICAgICBpZDtcbiAgICBpZCA9IHJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGtleSkge1xuICAgICAgcmV0dXJuIFwiXCIgKyByZXN1bHQgKyAoKCEoaXNFbXB0eShyZXN1bHQpKSkgJiYgKCEoaXNFbXB0eShrZXkpKSkgP1xuICAgICAgICBcIlwiICsgKHVwcGVyQ2FzZSgoa2V5IHx8IDApWzBdKSkgKyAoc3VicyhrZXksIDEpKSA6XG4gICAgICAgIGtleSk7XG4gICAgfSwgXCJcIiwgc3BsaXQoaWQsIFwiLVwiKSk7XG4gICAgcmV0dXJuIGlkO1xuICB9KSgpO1xufTtcbmV4cG9ydHMud3JpdGVSZWZlcmVuY2UgPSB3cml0ZVJlZmVyZW5jZTtcblxudmFyIHdyaXRlS2V5d29yZFJlZmVyZW5jZSA9IGZ1bmN0aW9uIHdyaXRlS2V5d29yZFJlZmVyZW5jZShmb3JtKSB7XG4gIHJldHVybiBcIlwiICsgXCJcXFwiXCIgKyAobmFtZShmb3JtKSkgKyBcIlxcXCJcIjtcbn07XG5leHBvcnRzLndyaXRlS2V5d29yZFJlZmVyZW5jZSA9IHdyaXRlS2V5d29yZFJlZmVyZW5jZTtcblxudmFyIHdyaXRlS2V5d29yZCA9IGZ1bmN0aW9uIHdyaXRlS2V5d29yZChmb3JtKSB7XG4gIHJldHVybiBcIlwiICsgXCJcXFwiXCIgKyBcIuqeiVwiICsgKG5hbWUoZm9ybSkpICsgXCJcXFwiXCI7XG59O1xuZXhwb3J0cy53cml0ZUtleXdvcmQgPSB3cml0ZUtleXdvcmQ7XG5cbnZhciB3cml0ZVN5bWJvbCA9IGZ1bmN0aW9uIHdyaXRlU3ltYm9sKGZvcm0pIHtcbiAgcmV0dXJuIHdyaXRlKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwic3ltYm9sXCIpLCBuYW1lc3BhY2UoZm9ybSksIG5hbWUoZm9ybSkpKTtcbn07XG5leHBvcnRzLndyaXRlU3ltYm9sID0gd3JpdGVTeW1ib2w7XG5cbnZhciB3cml0ZU5pbCA9IGZ1bmN0aW9uIHdyaXRlTmlsKGZvcm0pIHtcbiAgcmV0dXJuIFwidm9pZCgwKVwiO1xufTtcbmV4cG9ydHMud3JpdGVOaWwgPSB3cml0ZU5pbDtcblxudmFyIHdyaXRlTnVtYmVyID0gZnVuY3Rpb24gd3JpdGVOdW1iZXIoZm9ybSkge1xuICByZXR1cm4gZm9ybTtcbn07XG5leHBvcnRzLndyaXRlTnVtYmVyID0gd3JpdGVOdW1iZXI7XG5cbnZhciB3cml0ZUJvb2xlYW4gPSBmdW5jdGlvbiB3cml0ZUJvb2xlYW4oZm9ybSkge1xuICByZXR1cm4gaXNUcnVlKGZvcm0pID9cbiAgICBcInRydWVcIiA6XG4gICAgXCJmYWxzZVwiO1xufTtcbmV4cG9ydHMud3JpdGVCb29sZWFuID0gd3JpdGVCb29sZWFuO1xuXG52YXIgd3JpdGVTdHJpbmcgPSBmdW5jdGlvbiB3cml0ZVN0cmluZyhmb3JtKSB7XG4gIGZvcm0gPSByZXBsYWNlKGZvcm0sIFJlZ0V4cChcIlxcXFxcXFxcXCIsIFwiZ1wiKSwgXCJcXFxcXFxcXFwiKTtcbiAgZm9ybSA9IHJlcGxhY2UoZm9ybSwgUmVnRXhwKFwiXFxuXCIsIFwiZ1wiKSwgXCJcXFxcblwiKTtcbiAgZm9ybSA9IHJlcGxhY2UoZm9ybSwgUmVnRXhwKFwiXFxyXCIsIFwiZ1wiKSwgXCJcXFxcclwiKTtcbiAgZm9ybSA9IHJlcGxhY2UoZm9ybSwgUmVnRXhwKFwiXFx0XCIsIFwiZ1wiKSwgXCJcXFxcdFwiKTtcbiAgZm9ybSA9IHJlcGxhY2UoZm9ybSwgUmVnRXhwKFwiXFxcIlwiLCBcImdcIiksIFwiXFxcXFxcXCJcIik7XG4gIHJldHVybiBcIlwiICsgXCJcXFwiXCIgKyBmb3JtICsgXCJcXFwiXCI7XG59O1xuZXhwb3J0cy53cml0ZVN0cmluZyA9IHdyaXRlU3RyaW5nO1xuXG52YXIgd3JpdGVUZW1wbGF0ZSA9IGZ1bmN0aW9uIHdyaXRlVGVtcGxhdGUoKSB7XG4gIHZhciBmb3JtID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5kZW50UGF0dGVybiA9IC9cXG4gKiQvO1xuICAgIHZhciBsaW5lQnJlYWtQYXR0ZXIgPSBSZWdFeHAoXCJcXG5cIiwgXCJnXCIpO1xuICAgIHZhciBnZXRJbmRlbnRhdGlvbiA9IGZ1bmN0aW9uKGNvZGUpIHtcbiAgICAgIHJldHVybiAocmVGaW5kKGluZGVudFBhdHRlcm4sIGNvZGUpKSB8fCBcIlxcblwiO1xuICAgIH07XG4gICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGNvZGUsIHBhcnRzLCB2YWx1ZXMpIHtcbiAgICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgcmVjdXIgPSBjb3VudChwYXJ0cykgPiAxID9cbiAgICAgICAgKGNvZGUgPSBcIlwiICsgY29kZSArIChmaXJzdChwYXJ0cykpICsgKHJlcGxhY2UoXCJcIiArIFwiXCIgKyAoZmlyc3QodmFsdWVzKSksIGxpbmVCcmVha1BhdHRlciwgZ2V0SW5kZW50YXRpb24oZmlyc3QocGFydHMpKSkpLCBwYXJ0cyA9IHJlc3QocGFydHMpLCB2YWx1ZXMgPSByZXN0KHZhbHVlcyksIGxvb3ApIDpcbiAgICAgICAgXCJcIiArIGNvZGUgKyAoZmlyc3QocGFydHMpKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVjdXI7XG4gICAgfSkoXCJcIiwgc3BsaXQoZmlyc3QoZm9ybSksIFwifnt9XCIpLCByZXN0KGZvcm0pKTtcbiAgfSkoKTtcbn07XG5leHBvcnRzLndyaXRlVGVtcGxhdGUgPSB3cml0ZVRlbXBsYXRlO1xuXG52YXIgd3JpdGVHcm91cCA9IGZ1bmN0aW9uIHdyaXRlR3JvdXAoKSB7XG4gIHZhciBmb3JtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiBqb2luKFwiLCBcIiwgZm9ybXMpO1xufTtcbmV4cG9ydHMud3JpdGVHcm91cCA9IHdyaXRlR3JvdXA7XG5cbnZhciB3cml0ZUludm9rZSA9IGZ1bmN0aW9uIHdyaXRlSW52b2tlKGNhbGxlZSkge1xuICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgcmV0dXJuIHdyaXRlVGVtcGxhdGUoXCJ+e30ofnt9KVwiLCBjYWxsZWUsIHdyaXRlR3JvdXAuYXBwbHkod3JpdGVHcm91cCwgcGFyYW1zKSk7XG59O1xuZXhwb3J0cy53cml0ZUludm9rZSA9IHdyaXRlSW52b2tlO1xuXG52YXIgd3JpdGVFcnJvciA9IGZ1bmN0aW9uIHdyaXRlRXJyb3IobWVzc2FnZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHsgdGhyb3cgRXJyb3IobWVzc2FnZSk7IH0pKCk7XG4gIH07XG59O1xuZXhwb3J0cy53cml0ZUVycm9yID0gd3JpdGVFcnJvcjtcblxudmFyIHdyaXRlVmVjdG9yID0gd3JpdGVFcnJvcihcIlZlY3RvcnMgYXJlIG5vdCBzdXBwb3J0ZWRcIik7XG5leHBvcnRzLndyaXRlVmVjdG9yID0gd3JpdGVWZWN0b3I7XG5cbnZhciB3cml0ZURpY3Rpb25hcnkgPSB3cml0ZUVycm9yKFwiRGljdGlvbmFyaWVzIGFyZSBub3Qgc3VwcG9ydGVkXCIpO1xuZXhwb3J0cy53cml0ZURpY3Rpb25hcnkgPSB3cml0ZURpY3Rpb25hcnk7XG5cbnZhciB3cml0ZVBhdHRlcm4gPSB3cml0ZUVycm9yKFwiUmVndWxhciBleHByZXNzaW9ucyBhcmUgbm90IHN1cHBvcnRlZFwiKTtcbmV4cG9ydHMud3JpdGVQYXR0ZXJuID0gd3JpdGVQYXR0ZXJuO1xuXG52YXIgY29tcGlsZUNvbW1lbnQgPSBmdW5jdGlvbiBjb21waWxlQ29tbWVudChmb3JtKSB7XG4gIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdChcIi8vfnt9XFxuXCIsIGZpcnN0KGZvcm0pKSk7XG59O1xuZXhwb3J0cy5jb21waWxlQ29tbWVudCA9IGNvbXBpbGVDb21tZW50O1xuXG52YXIgd3JpdGVEZWYgPSBmdW5jdGlvbiB3cml0ZURlZihmb3JtKSB7XG4gIHZhciBpZCA9IGZpcnN0KGZvcm0pO1xuICB2YXIgaXNFeHBvcnQgPSAoKCgobWV0YShmb3JtKSkgfHwge30pIHx8IDApW1widG9wXCJdKSAmJiAoISgoKChtZXRhKGlkKSkgfHwge30pIHx8IDApW1wicHJpdmF0ZVwiXSkpO1xuICB2YXIgYXR0cmlidXRlID0gc3ltYm9sKG5hbWVzcGFjZShpZCksIFwiXCIgKyBcIi1cIiArIChuYW1lKGlkKSkpO1xuICByZXR1cm4gaXNFeHBvcnQgP1xuICAgIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwidmFyIH57fTtcXG5+e31cIiwgY29tcGlsZShjb25zKHN5bWJvbCh2b2lkKDApLCBcInNldCFcIiksIGZvcm0pKSwgY29tcGlsZShsaXN0KHN5bWJvbCh2b2lkKDApLCBcInNldCFcIiksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiLlwiKSwgc3ltYm9sKHZvaWQoMCksIFwiZXhwb3J0c1wiKSwgYXR0cmlidXRlKSwgaWQpKSkpIDpcbiAgICBjb21waWxlVGVtcGxhdGUobGlzdChcInZhciB+e31cIiwgY29tcGlsZShjb25zKHN5bWJvbCh2b2lkKDApLCBcInNldCFcIiksIGZvcm0pKSkpO1xufTtcbmV4cG9ydHMud3JpdGVEZWYgPSB3cml0ZURlZjtcblxudmFyIHdyaXRlID0gZnVuY3Rpb24gd3JpdGUoZm9ybSkge1xuICByZXR1cm4gaXNOaWwoZm9ybSkgP1xuICAgIHdyaXRlTmlsKGZvcm0pIDpcbiAgaXNTeW1ib2woZm9ybSkgP1xuICAgIHdyaXRlUmVmZXJlbmNlKGZvcm0pIDpcbiAgaXNLZXl3b3JkKGZvcm0pID9cbiAgICB3cml0ZUtleXdvcmRSZWZlcmVuY2UoZm9ybSkgOlxuICBpc1N0cmluZyhmb3JtKSA/XG4gICAgd3JpdGVTdHJpbmcoZm9ybSkgOlxuICBpc051bWJlcihmb3JtKSA/XG4gICAgd3JpdGVOdW1iZXIoZm9ybSkgOlxuICBpc0Jvb2xlYW4oZm9ybSkgP1xuICAgIHdyaXRlQm9vbGVhbihmb3JtKSA6XG4gIGlzUmVQYXR0ZXJuKGZvcm0pID9cbiAgICB3cml0ZVBhdHRlcm4oZm9ybSkgOlxuICBpc1ZlY3Rvcihmb3JtKSA/XG4gICAgd3JpdGVWZWN0b3IoZm9ybSkgOlxuICBpc0RpY3Rpb25hcnkoZm9ybSkgP1xuICAgIHdyaXRlRGljdGlvbmFyeSgpIDpcbiAgaXNMaXN0KGZvcm0pID9cbiAgICB3cml0ZUludm9rZS5hcHBseSh3cml0ZUludm9rZSwgbWFwKHdyaXRlLCB2ZWMoZm9ybSkpKSA6XG4gIFwiZWxzZVwiID9cbiAgICB3cml0ZUVycm9yKFwiVW5zdXBwb3J0ZWQgZm9ybVwiKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLndyaXRlID0gd3JpdGVcbiJdfQ==
;