;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function(){var _ns_ = {
  "id": "wisp.runtime",
  "doc": "Core primitives required for runtime"
};;

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
var _ns_ = {
  "id": "wisp.sequence"
};
var wisp_runtime = require("./runtime");
var isNil = wisp_runtime.isNil;
var isVector = wisp_runtime.isVector;
var isFn = wisp_runtime.isFn;
var isNumber = wisp_runtime.isNumber;
var isString = wisp_runtime.isString;
var isDictionary = wisp_runtime.isDictionary;
var keyValues = wisp_runtime.keyValues;
var str = wisp_runtime.str;
var dec = wisp_runtime.dec;
var inc = wisp_runtime.inc;
var merge = wisp_runtime.merge;
var dictionary = wisp_runtime.dictionary;;;

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

var assoc = function assoc(source) {
  var keyValues = Array.prototype.slice.call(arguments, 1);
  return conj(source, dictionary.apply(dictionary, keyValues));
};
exports.assoc = assoc;

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
},{"./runtime":1}],3:[function(require,module,exports){
var _ns_ = {
  "id": "wisp.reader",
  "doc": "Reader module provides functions for reading text input\n  as wisp data structures"
};
var wisp_sequence = require("./sequence");
var list = wisp_sequence.list;
var isList = wisp_sequence.isList;
var count = wisp_sequence.count;
var isEmpty = wisp_sequence.isEmpty;
var first = wisp_sequence.first;
var second = wisp_sequence.second;
var third = wisp_sequence.third;
var rest = wisp_sequence.rest;
var map = wisp_sequence.map;
var vec = wisp_sequence.vec;
var cons = wisp_sequence.cons;
var conj = wisp_sequence.conj;
var concat = wisp_sequence.concat;
var last = wisp_sequence.last;
var butlast = wisp_sequence.butlast;
var sort = wisp_sequence.sort;
var lazySeq = wisp_sequence.lazySeq;;
var wisp_runtime = require("./runtime");
var isOdd = wisp_runtime.isOdd;
var dictionary = wisp_runtime.dictionary;
var keys = wisp_runtime.keys;
var isNil = wisp_runtime.isNil;
var inc = wisp_runtime.inc;
var dec = wisp_runtime.dec;
var isVector = wisp_runtime.isVector;
var isString = wisp_runtime.isString;
var isNumber = wisp_runtime.isNumber;
var isBoolean = wisp_runtime.isBoolean;
var isObject = wisp_runtime.isObject;
var isDictionary = wisp_runtime.isDictionary;
var rePattern = wisp_runtime.rePattern;
var reMatches = wisp_runtime.reMatches;
var reFind = wisp_runtime.reFind;
var str = wisp_runtime.str;
var subs = wisp_runtime.subs;
var char = wisp_runtime.char;
var vals = wisp_runtime.vals;
var isEqual = wisp_runtime.isEqual;;
var wisp_ast = require("./ast");
var isSymbol = wisp_ast.isSymbol;
var symbol = wisp_ast.symbol;
var isKeyword = wisp_ast.isKeyword;
var keyword = wisp_ast.keyword;
var meta = wisp_ast.meta;
var withMeta = wisp_ast.withMeta;
var name = wisp_ast.name;
var gensym = wisp_ast.gensym;;
var wisp_string = require("./string");
var split = wisp_string.split;
var join = wisp_string.join;;;

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
},{"./sequence":2,"./runtime":1,"./ast":4,"./string":5}],6:[function(require,module,exports){
var _ns_ = {
  "id": "try-wisp.main"
};
var activine = require("codemirror-activine");;
var persist = require("codemirror-persist");;
var wisp_engine_browser = require("wisp/engine/browser");;
var wisp_sequence = require("wisp/sequence");
var rest = wisp_sequence.rest;
var cons = wisp_sequence.cons;
var vec = wisp_sequence.vec;;
var wisp_runtime = require("wisp/runtime");
var str = wisp_runtime.str;;
var wisp_reader = require("wisp/reader");
var read_ = wisp_reader.read_;;
var wisp_compiler = require("wisp/compiler");
var compile_ = wisp_compiler.compile_;;;

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
},{"wisp/engine/browser":7,"wisp/sequence":2,"wisp/runtime":1,"wisp/reader":3,"wisp/compiler":8,"codemirror-persist":9,"codemirror-activine":10}],8:[function(require,module,exports){
var _ns_ = {
  "id": "wisp.compiler",
  "doc": "wisp language compiler"
};
var wisp_reader = require("./reader");
var readFromString = wisp_reader.readFromString;;
var wisp_ast = require("./ast");
var meta = wisp_ast.meta;
var withMeta = wisp_ast.withMeta;
var isSymbol = wisp_ast.isSymbol;
var symbol = wisp_ast.symbol;
var isKeyword = wisp_ast.isKeyword;
var keyword = wisp_ast.keyword;
var namespace = wisp_ast.namespace;
var isUnquote = wisp_ast.isUnquote;
var isUnquoteSplicing = wisp_ast.isUnquoteSplicing;
var isQuote = wisp_ast.isQuote;
var isSyntaxQuote = wisp_ast.isSyntaxQuote;
var name = wisp_ast.name;
var gensym = wisp_ast.gensym;
var prStr = wisp_ast.prStr;;
var wisp_sequence = require("./sequence");
var isEmpty = wisp_sequence.isEmpty;
var count = wisp_sequence.count;
var isList = wisp_sequence.isList;
var list = wisp_sequence.list;
var first = wisp_sequence.first;
var second = wisp_sequence.second;
var third = wisp_sequence.third;
var rest = wisp_sequence.rest;
var cons = wisp_sequence.cons;
var conj = wisp_sequence.conj;
var reverse = wisp_sequence.reverse;
var reduce = wisp_sequence.reduce;
var vec = wisp_sequence.vec;
var last = wisp_sequence.last;
var repeat = wisp_sequence.repeat;
var map = wisp_sequence.map;
var filter = wisp_sequence.filter;
var take = wisp_sequence.take;
var concat = wisp_sequence.concat;
var isSeq = wisp_sequence.isSeq;;
var wisp_runtime = require("./runtime");
var isOdd = wisp_runtime.isOdd;
var isDictionary = wisp_runtime.isDictionary;
var dictionary = wisp_runtime.dictionary;
var merge = wisp_runtime.merge;
var keys = wisp_runtime.keys;
var vals = wisp_runtime.vals;
var isContainsVector = wisp_runtime.isContainsVector;
var mapDictionary = wisp_runtime.mapDictionary;
var isString = wisp_runtime.isString;
var isNumber = wisp_runtime.isNumber;
var isVector = wisp_runtime.isVector;
var isBoolean = wisp_runtime.isBoolean;
var subs = wisp_runtime.subs;
var reFind = wisp_runtime.reFind;
var isTrue = wisp_runtime.isTrue;
var isFalse = wisp_runtime.isFalse;
var isNil = wisp_runtime.isNil;
var isRePattern = wisp_runtime.isRePattern;
var inc = wisp_runtime.inc;
var dec = wisp_runtime.dec;
var str = wisp_runtime.str;
var char = wisp_runtime.char;
var int = wisp_runtime.int;
var isEqual = wisp_runtime.isEqual;
var isStrictEqual = wisp_runtime.isStrictEqual;;
var wisp_string = require("./string");
var split = wisp_string.split;
var join = wisp_string.join;
var upperCase = wisp_string.upperCase;
var replace = wisp_string.replace;;
var wisp_backend_javascript_writer = require("./backend/javascript/writer");
var writeReference = wisp_backend_javascript_writer.writeReference;
var writeKeywordReference = wisp_backend_javascript_writer.writeKeywordReference;
var writeKeyword = wisp_backend_javascript_writer.writeKeyword;
var writeSymbol = wisp_backend_javascript_writer.writeSymbol;
var writeNil = wisp_backend_javascript_writer.writeNil;
var writeComment = wisp_backend_javascript_writer.writeComment;
var writeNumber = wisp_backend_javascript_writer.writeNumber;
var writeString = wisp_backend_javascript_writer.writeString;
var writeBoolean = wisp_backend_javascript_writer.writeBoolean;;;

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

var parseReferences = function parseReferences(forms) {
  return reduce(function(references, form) {
    isSeq(form) ?
      (references || 0)[name(first(form))] = vec(rest(form)) :
      void(0);
    return references;
  }, {}, forms);
};
exports.parseReferences = parseReferences;

var parseRequire = function parseRequire(form) {
  var requirement = isSymbol(form) ?
    [form] :
    vec(form);
  var id = first(requirement);
  var params = dictionary.apply(dictionary, rest(requirement));
  var imports = reduce(function(imports, name) {
    (imports || 0)[name] = ((imports || 0)[name]) || name;
    return imports;
  }, conj({}, (params || 0)["꞉rename"]), (params || 0)["꞉refer"]);
  return conj({
    "id": id,
    "imports": imports
  }, params);
};
exports.parseRequire = parseRequire;

var analyzeNs = function analyzeNs(form) {
  var id = first(form);
  var params = rest(form);
  var doc = isString(first(params)) ?
    first(params) :
    void(0);
  var references = parseReferences(doc ?
    rest(params) :
    params);
  return withMeta(form, {
    "id": id,
    "doc": doc,
    "require": (references || 0)["require"] ?
      map(parseRequire, (references || 0)["require"]) :
      void(0)
  });
};
exports.analyzeNs = analyzeNs;

var idToNs = function idToNs(id) {
  return symbol(void(0), join("*", split("" + id, ".")));
};
exports.idToNs = idToNs;

var nameToField = function nameToField(name) {
  return symbol(void(0), "" + "-" + name);
};
exports.nameToField = nameToField;

var compileImport = function compileImport(module) {
  return function(form) {
    return list(symbol(void(0), "def"), second(form), list(symbol(void(0), "."), module, nameToField(first(form))));
  };
};
exports.compileImport = compileImport;

var compileRequire = function compileRequire(requirer) {
  return function(form) {
    var id = (form || 0)["id"];
    var requirement = idToNs(((form || 0)["꞉as"]) || id);
    var path = resolve(requirer, id);
    var imports = (form || 0)["imports"];
    return concat([symbol(void(0), "do*"), list(symbol(void(0), "def"), requirement, list(symbol(void(0), "require"), path))], imports ?
      map(compileImport(requirement), imports) :
      void(0));
  };
};
exports.compileRequire = compileRequire;

var resolve = function resolve(from, to) {
  var requirer = split("" + from, ".");
  var requirement = split("" + to, ".");
  var isRelative = (!("" + from === "" + to)) && (first(requirer) === first(requirement));
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
exports.resolve = resolve;

var compileNs = function compileNs() {
  var form = Array.prototype.slice.call(arguments, 0);
  return (function() {
    var metadata = meta(analyzeNs(form));
    var id = "" + ((metadata || 0)["id"]);
    var doc = (metadata || 0)["doc"];
    var requirements = (metadata || 0)["require"];
    var ns = doc ?
      {
        "id": id,
        "doc": doc
      } :
      {
        "id": id
      };
    return concat([symbol(void(0), "do*"), list(symbol(void(0), "def"), symbol(void(0), "*ns*"), ns)], requirements ?
      map(compileRequire(id), requirements) :
      void(0));
  })();
};
exports.compileNs = compileNs;

installMacro(symbol(void(0), "ns"), compileNs);

installMacro(symbol(void(0), "print"), function() {
  var more = Array.prototype.slice.call(arguments, 0);
  "Prints the object(s) to the output for human consumption.";
  return concat(list(symbol(void(0), ".log"), symbol(void(0), "console")), more);
})
},{"./reader":3,"./ast":4,"./sequence":2,"./runtime":1,"./string":5,"./backend/javascript/writer":11}],7:[function(require,module,exports){
var _ns_ = {
  "id": "wisp.engine.browser"
};
var wisp_runtime = require("./../runtime");
var str = wisp_runtime.str;;
var wisp_sequence = require("./../sequence");
var rest = wisp_sequence.rest;;
var wisp_reader = require("./../reader");
var readFromString = wisp_reader.readFromString;;
var wisp_compiler = require("./../compiler");
var compile_ = wisp_compiler.compile_;;;

var evaluate = function evaluate(code, url) {
  return eval(compile_(read_(code, url)));
};
exports.evaluate = evaluate;

var run = function run(code, url) {
  return (Function(compile_(read_(code, url))))();
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
},{"./../runtime":1,"./../sequence":2,"./../reader":3,"./../compiler":8}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var _ns_ = {
  "id": "wisp.ast"
};
var wisp_sequence = require("./sequence");
var isList = wisp_sequence.isList;
var isSequential = wisp_sequence.isSequential;
var first = wisp_sequence.first;
var second = wisp_sequence.second;
var count = wisp_sequence.count;
var last = wisp_sequence.last;
var map = wisp_sequence.map;
var vec = wisp_sequence.vec;;
var wisp_string = require("./string");
var split = wisp_string.split;
var join = wisp_string.join;;
var wisp_runtime = require("./runtime");
var isNil = wisp_runtime.isNil;
var isVector = wisp_runtime.isVector;
var isNumber = wisp_runtime.isNumber;
var isString = wisp_runtime.isString;
var isBoolean = wisp_runtime.isBoolean;
var isObject = wisp_runtime.isObject;
var isDate = wisp_runtime.isDate;
var isRePattern = wisp_runtime.isRePattern;
var isDictionary = wisp_runtime.isDictionary;
var str = wisp_runtime.str;
var inc = wisp_runtime.inc;
var subs = wisp_runtime.subs;
var isEqual = wisp_runtime.isEqual;;;

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
},{"./sequence":2,"./string":5,"./runtime":1}],5:[function(require,module,exports){
var _ns_ = {
  "id": "wisp.string"
};
var wisp_runtime = require("./runtime");
var str = wisp_runtime.str;
var subs = wisp_runtime.subs;
var reMatches = wisp_runtime.reMatches;
var isNil = wisp_runtime.isNil;
var isString = wisp_runtime.isString;;
var wisp_sequence = require("./sequence");
var vec = wisp_sequence.vec;
var isEmpty = wisp_sequence.isEmpty;;;

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
},{"./runtime":1,"./sequence":2}],11:[function(require,module,exports){
var _ns_ = {
  "id": "wisp.backend.javascript.writer",
  "doc": "Compiler backend for for writing JS output"
};
var wisp_ast = require("./../../ast");
var name = wisp_ast.name;
var namespace = wisp_ast.namespace;
var symbol = wisp_ast.symbol;
var isSymbol = wisp_ast.isSymbol;
var isKeyword = wisp_ast.isKeyword;;
var wisp_sequence = require("./../../sequence");
var list = wisp_sequence.list;
var first = wisp_sequence.first;
var rest = wisp_sequence.rest;
var isList = wisp_sequence.isList;
var vec = wisp_sequence.vec;
var map = wisp_sequence.map;
var count = wisp_sequence.count;
var last = wisp_sequence.last;
var reduce = wisp_sequence.reduce;
var isEmpty = wisp_sequence.isEmpty;;
var wisp_runtime = require("./../../runtime");
var isTrue = wisp_runtime.isTrue;
var isNil = wisp_runtime.isNil;
var isString = wisp_runtime.isString;
var isNumber = wisp_runtime.isNumber;
var isVector = wisp_runtime.isVector;
var isDictionary = wisp_runtime.isDictionary;
var isBoolean = wisp_runtime.isBoolean;
var isRePattern = wisp_runtime.isRePattern;
var reFind = wisp_runtime.reFind;
var dec = wisp_runtime.dec;
var subs = wisp_runtime.subs;;
var wisp_string = require("./../../string");
var replace = wisp_string.replace;
var join = wisp_string.join;
var split = wisp_string.split;
var upperCase = wisp_string.upperCase;;;

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
},{"./../../ast":4,"./../../sequence":2,"./../../runtime":1,"./../../string":5}]},{},[6])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3RyeS13aXNwL25vZGVfbW9kdWxlcy93aXNwL3J1bnRpbWUuanMiLCIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3RyeS13aXNwL25vZGVfbW9kdWxlcy93aXNwL3NlcXVlbmNlLmpzIiwiL1VzZXJzL2dvemFsYS9Qcm9qZWN0cy90cnktd2lzcC9ub2RlX21vZHVsZXMvd2lzcC9yZWFkZXIuanMiLCIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3RyeS13aXNwL21haW4uanMiLCIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3RyeS13aXNwL25vZGVfbW9kdWxlcy93aXNwL2NvbXBpbGVyLmpzIiwiL1VzZXJzL2dvemFsYS9Qcm9qZWN0cy90cnktd2lzcC9ub2RlX21vZHVsZXMvd2lzcC9lbmdpbmUvYnJvd3Nlci5qcyIsIi9Vc2Vycy9nb3phbGEvUHJvamVjdHMvdHJ5LXdpc3Avbm9kZV9tb2R1bGVzL2NvZGVtaXJyb3ItcGVyc2lzdC9jb3JlLmpzIiwiL1VzZXJzL2dvemFsYS9Qcm9qZWN0cy90cnktd2lzcC9ub2RlX21vZHVsZXMvY29kZW1pcnJvci1hY3RpdmluZS9jb3JlLmpzIiwiL1VzZXJzL2dvemFsYS9Qcm9qZWN0cy90cnktd2lzcC9ub2RlX21vZHVsZXMvd2lzcC9hc3QuanMiLCIvVXNlcnMvZ296YWxhL1Byb2plY3RzL3RyeS13aXNwL25vZGVfbW9kdWxlcy93aXNwL3N0cmluZy5qcyIsIi9Vc2Vycy9nb3phbGEvUHJvamVjdHMvdHJ5LXdpc3Avbm9kZV9tb2R1bGVzL3dpc3AvYmFja2VuZC9qYXZhc2NyaXB0L3dyaXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25qQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNueEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2poQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXt2YXIgX25zXyA9IHtcbiAgXCJpZFwiOiBcIndpc3AucnVudGltZVwiLFxuICBcImRvY1wiOiBcIkNvcmUgcHJpbWl0aXZlcyByZXF1aXJlZCBmb3IgcnVudGltZVwiXG59OztcblxudmFyIGlkZW50aXR5ID0gZnVuY3Rpb24gaWRlbnRpdHkoeCkge1xuICByZXR1cm4geDtcbn07XG5leHBvcnRzLmlkZW50aXR5ID0gaWRlbnRpdHk7XG5cbnZhciBpc09kZCA9IGZ1bmN0aW9uIGlzT2RkKG4pIHtcbiAgcmV0dXJuIG4gJSAyID09PSAxO1xufTtcbmV4cG9ydHMuaXNPZGQgPSBpc09kZDtcblxudmFyIGlzRXZlbiA9IGZ1bmN0aW9uIGlzRXZlbihuKSB7XG4gIHJldHVybiBuICUgMiA9PT0gMDtcbn07XG5leHBvcnRzLmlzRXZlbiA9IGlzRXZlbjtcblxudmFyIGlzRGljdGlvbmFyeSA9IGZ1bmN0aW9uIGlzRGljdGlvbmFyeShmb3JtKSB7XG4gIHJldHVybiAoaXNPYmplY3QoZm9ybSkpICYmIChpc09iamVjdChPYmplY3QuZ2V0UHJvdG90eXBlT2YoZm9ybSkpKSAmJiAoaXNOaWwoT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZihmb3JtKSkpKTtcbn07XG5leHBvcnRzLmlzRGljdGlvbmFyeSA9IGlzRGljdGlvbmFyeTtcblxudmFyIGRpY3Rpb25hcnkgPSBmdW5jdGlvbiBkaWN0aW9uYXJ5KCkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3Aoa2V5VmFsdWVzLCByZXN1bHQpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBrZXlWYWx1ZXMubGVuZ3RoID9cbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgKHJlc3VsdCB8fCAwKVsoa2V5VmFsdWVzIHx8IDApWzBdXSA9IChrZXlWYWx1ZXMgfHwgMClbMV07XG4gICAgICAgIHJldHVybiAoa2V5VmFsdWVzID0ga2V5VmFsdWVzLnNsaWNlKDIpLCByZXN1bHQgPSByZXN1bHQsIGxvb3ApO1xuICAgICAgfSkoKSA6XG4gICAgICByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksIHt9KTtcbn07XG5leHBvcnRzLmRpY3Rpb25hcnkgPSBkaWN0aW9uYXJ5O1xuXG52YXIga2V5cyA9IGZ1bmN0aW9uIGtleXMoZGljdGlvbmFyeSkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoZGljdGlvbmFyeSk7XG59O1xuZXhwb3J0cy5rZXlzID0ga2V5cztcblxudmFyIHZhbHMgPSBmdW5jdGlvbiB2YWxzKGRpY3Rpb25hcnkpIHtcbiAgcmV0dXJuIGtleXMoZGljdGlvbmFyeSkubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiAoZGljdGlvbmFyeSB8fCAwKVtrZXldO1xuICB9KTtcbn07XG5leHBvcnRzLnZhbHMgPSB2YWxzO1xuXG52YXIga2V5VmFsdWVzID0gZnVuY3Rpb24ga2V5VmFsdWVzKGRpY3Rpb25hcnkpIHtcbiAgcmV0dXJuIGtleXMoZGljdGlvbmFyeSkubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBba2V5LCAoZGljdGlvbmFyeSB8fCAwKVtrZXldXTtcbiAgfSk7XG59O1xuZXhwb3J0cy5rZXlWYWx1ZXMgPSBrZXlWYWx1ZXM7XG5cbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKCkge1xuICByZXR1cm4gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLnJlZHVjZShmdW5jdGlvbihkZXNjcmlwdG9yLCBkaWN0aW9uYXJ5KSB7XG4gICAgaXNPYmplY3QoZGljdGlvbmFyeSkgP1xuICAgICAgT2JqZWN0LmtleXMoZGljdGlvbmFyeSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIChkZXNjcmlwdG9yIHx8IDApW2tleV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGRpY3Rpb25hcnksIGtleSk7XG4gICAgICB9KSA6XG4gICAgICB2b2lkKDApO1xuICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9LCBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUpKSk7XG59O1xuZXhwb3J0cy5tZXJnZSA9IG1lcmdlO1xuXG52YXIgaXNDb250YWluc1ZlY3RvciA9IGZ1bmN0aW9uIGlzQ29udGFpbnNWZWN0b3IodmVjdG9yLCBlbGVtZW50KSB7XG4gIHJldHVybiB2ZWN0b3IuaW5kZXhPZihlbGVtZW50KSA+PSAwO1xufTtcbmV4cG9ydHMuaXNDb250YWluc1ZlY3RvciA9IGlzQ29udGFpbnNWZWN0b3I7XG5cbnZhciBtYXBEaWN0aW9uYXJ5ID0gZnVuY3Rpb24gbWFwRGljdGlvbmFyeShzb3VyY2UsIGYpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uKHRhcmdldCwga2V5KSB7XG4gICAgKHRhcmdldCB8fCAwKVtrZXldID0gZigoc291cmNlIHx8IDApW2tleV0pO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH0sIHt9KTtcbn07XG5leHBvcnRzLm1hcERpY3Rpb25hcnkgPSBtYXBEaWN0aW9uYXJ5O1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuXG52YXIgaXNGbiA9IHR5cGVvZigvLi8pID09PSBcImZ1bmN0aW9uXCIgP1xuICBmdW5jdGlvbiBpc0ZuKHgpIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh4KSA9PT0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiO1xuICB9IDpcbiAgZnVuY3Rpb24gaXNGbih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZih4KSA9PT0gXCJmdW5jdGlvblwiO1xuICB9O1xuZXhwb3J0cy5pc0ZuID0gaXNGbjtcblxudmFyIGlzU3RyaW5nID0gZnVuY3Rpb24gaXNTdHJpbmcoeCkge1xuICByZXR1cm4gKHR5cGVvZih4KSA9PT0gXCJzdHJpbmdcIikgfHwgKHRvU3RyaW5nLmNhbGwoeCkgPT09IFwiW29iamVjdCBTdHJpbmddXCIpO1xufTtcbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxudmFyIGlzTnVtYmVyID0gZnVuY3Rpb24gaXNOdW1iZXIoeCkge1xuICByZXR1cm4gKHR5cGVvZih4KSA9PT0gXCJudW1iZXJcIikgfHwgKHRvU3RyaW5nLmNhbGwoeCkgPT09IFwiW29iamVjdCBOdW1iZXJdXCIpO1xufTtcbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxudmFyIGlzVmVjdG9yID0gaXNGbihBcnJheS5pc0FycmF5KSA/XG4gIEFycmF5LmlzQXJyYXkgOlxuICBmdW5jdGlvbiBpc1ZlY3Rvcih4KSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoeCkgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgfTtcbmV4cG9ydHMuaXNWZWN0b3IgPSBpc1ZlY3RvcjtcblxudmFyIGlzRGF0ZSA9IGZ1bmN0aW9uIGlzRGF0ZSh4KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHgpID09PSBcIltvYmplY3QgRGF0ZV1cIjtcbn07XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxudmFyIGlzQm9vbGVhbiA9IGZ1bmN0aW9uIGlzQm9vbGVhbih4KSB7XG4gIHJldHVybiAoeCA9PT0gdHJ1ZSkgfHwgKHggPT09IGZhbHNlKSB8fCAodG9TdHJpbmcuY2FsbCh4KSA9PT0gXCJbb2JqZWN0IEJvb2xlYW5dXCIpO1xufTtcbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG52YXIgaXNSZVBhdHRlcm4gPSBmdW5jdGlvbiBpc1JlUGF0dGVybih4KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHgpID09PSBcIltvYmplY3QgUmVnRXhwXVwiO1xufTtcbmV4cG9ydHMuaXNSZVBhdHRlcm4gPSBpc1JlUGF0dGVybjtcblxudmFyIGlzT2JqZWN0ID0gZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICByZXR1cm4geCAmJiAodHlwZW9mKHgpID09PSBcIm9iamVjdFwiKTtcbn07XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbnZhciBpc05pbCA9IGZ1bmN0aW9uIGlzTmlsKHgpIHtcbiAgcmV0dXJuICh4ID09PSB2b2lkKDApKSB8fCAoeCA9PT0gbnVsbCk7XG59O1xuZXhwb3J0cy5pc05pbCA9IGlzTmlsO1xuXG52YXIgaXNUcnVlID0gZnVuY3Rpb24gaXNUcnVlKHgpIHtcbiAgcmV0dXJuIHggPT09IHRydWU7XG59O1xuZXhwb3J0cy5pc1RydWUgPSBpc1RydWU7XG5cbnZhciBpc0ZhbHNlID0gZnVuY3Rpb24gaXNGYWxzZSh4KSB7XG4gIHJldHVybiB4ID09PSB0cnVlO1xufTtcbmV4cG9ydHMuaXNGYWxzZSA9IGlzRmFsc2U7XG5cbnZhciByZUZpbmQgPSBmdW5jdGlvbiByZUZpbmQocmUsIHMpIHtcbiAgdmFyIG1hdGNoZXMgPSByZS5leGVjKHMpO1xuICByZXR1cm4gIShpc05pbChtYXRjaGVzKSkgP1xuICAgIG1hdGNoZXMubGVuZ3RoID09PSAxID9cbiAgICAgIChtYXRjaGVzIHx8IDApWzBdIDpcbiAgICAgIG1hdGNoZXMgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5yZUZpbmQgPSByZUZpbmQ7XG5cbnZhciByZU1hdGNoZXMgPSBmdW5jdGlvbiByZU1hdGNoZXMocGF0dGVybiwgc291cmNlKSB7XG4gIHZhciBtYXRjaGVzID0gcGF0dGVybi5leGVjKHNvdXJjZSk7XG4gIHJldHVybiAoIShpc05pbChtYXRjaGVzKSkpICYmICgobWF0Y2hlcyB8fCAwKVswXSA9PT0gc291cmNlKSA/XG4gICAgbWF0Y2hlcy5sZW5ndGggPT09IDEgP1xuICAgICAgKG1hdGNoZXMgfHwgMClbMF0gOlxuICAgICAgbWF0Y2hlcyA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLnJlTWF0Y2hlcyA9IHJlTWF0Y2hlcztcblxudmFyIHJlUGF0dGVybiA9IGZ1bmN0aW9uIHJlUGF0dGVybihzKSB7XG4gIHZhciBtYXRjaCA9IHJlRmluZCgvXig/OlxcKFxcPyhbaWRtc3V4XSopXFwpKT8oLiopLywgcyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKChtYXRjaCB8fCAwKVsyXSwgKG1hdGNoIHx8IDApWzFdKTtcbn07XG5leHBvcnRzLnJlUGF0dGVybiA9IHJlUGF0dGVybjtcblxudmFyIGluYyA9IGZ1bmN0aW9uIGluYyh4KSB7XG4gIHJldHVybiB4ICsgMTtcbn07XG5leHBvcnRzLmluYyA9IGluYztcblxudmFyIGRlYyA9IGZ1bmN0aW9uIGRlYyh4KSB7XG4gIHJldHVybiB4IC0gMTtcbn07XG5leHBvcnRzLmRlYyA9IGRlYztcblxudmFyIHN0ciA9IGZ1bmN0aW9uIHN0cigpIHtcbiAgcmV0dXJuIFN0cmluZy5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFwiXCIsIGFyZ3VtZW50cyk7XG59O1xuZXhwb3J0cy5zdHIgPSBzdHI7XG5cbnZhciBjaGFyID0gZnVuY3Rpb24gY2hhcihjb2RlKSB7XG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xufTtcbmV4cG9ydHMuY2hhciA9IGNoYXI7XG5cbnZhciBpbnQgPSBmdW5jdGlvbiBpbnQoeCkge1xuICByZXR1cm4gaXNOdW1iZXIoeCkgP1xuICAgIHggPj0gMCA/XG4gICAgICBNYXRoLmZsb29yKHgpIDpcbiAgICAgIE1hdGguZmxvb3IoeCkgOlxuICAgIHguY2hhckNvZGVBdCgwKTtcbn07XG5leHBvcnRzLmludCA9IGludDtcblxudmFyIHN1YnMgPSBmdW5jdGlvbiBzdWJzKHN0cmluZywgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbn07XG5leHBvcnRzLnN1YnMgPSBzdWJzO1xuXG52YXIgaXNQYXR0ZXJuRXF1YWwgPSBmdW5jdGlvbiBpc1BhdHRlcm5FcXVhbCh4LCB5KSB7XG4gIHJldHVybiAoaXNSZVBhdHRlcm4oeCkpICYmIChpc1JlUGF0dGVybih5KSkgJiYgKHguc291cmNlID09PSB5LnNvdXJjZSkgJiYgKHguZ2xvYmFsID09PSB5Lmdsb2JhbCkgJiYgKHgubXVsdGlsaW5lID09PSB5Lm11bHRpbGluZSkgJiYgKHguaWdub3JlQ2FzZSA9PT0geS5pZ25vcmVDYXNlKTtcbn07XG5cbnZhciBpc0RhdGVFcXVhbCA9IGZ1bmN0aW9uIGlzRGF0ZUVxdWFsKHgsIHkpIHtcbiAgcmV0dXJuIChpc0RhdGUoeCkpICYmIChpc0RhdGUoeSkpICYmIChOdW1iZXIoeCkgPT09IE51bWJlcih5KSk7XG59O1xuXG52YXIgaXNEaWN0aW9uYXJ5RXF1YWwgPSBmdW5jdGlvbiBpc0RpY3Rpb25hcnlFcXVhbCh4LCB5KSB7XG4gIHJldHVybiAoaXNPYmplY3QoeCkpICYmIChpc09iamVjdCh5KSkgJiYgKChmdW5jdGlvbigpIHtcbiAgICB2YXIgeEtleXMgPSBrZXlzKHgpO1xuICAgIHZhciB5S2V5cyA9IGtleXMoeSk7XG4gICAgdmFyIHhDb3VudCA9IHhLZXlzLmxlbmd0aDtcbiAgICB2YXIgeUNvdW50ID0geUtleXMubGVuZ3RoO1xuICAgIHJldHVybiAoeENvdW50ID09PSB5Q291bnQpICYmICgoZnVuY3Rpb24gbG9vcChpbmRleCwgY291bnQsIGtleXMpIHtcbiAgICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgcmVjdXIgPSBpbmRleCA8IGNvdW50ID9cbiAgICAgICAgaXNFcXVpdmFsZW50KCh4IHx8IDApWyhrZXlzIHx8IDApW2luZGV4XV0sICh5IHx8IDApWyhrZXlzIHx8IDApW2luZGV4XV0pID9cbiAgICAgICAgICAoaW5kZXggPSBpbmMoaW5kZXgpLCBjb3VudCA9IGNvdW50LCBrZXlzID0ga2V5cywgbG9vcCkgOlxuICAgICAgICAgIGZhbHNlIDpcbiAgICAgICAgdHJ1ZTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVjdXI7XG4gICAgfSkoMCwgeENvdW50LCB4S2V5cykpO1xuICB9KSgpKTtcbn07XG5cbnZhciBpc1ZlY3RvckVxdWFsID0gZnVuY3Rpb24gaXNWZWN0b3JFcXVhbCh4LCB5KSB7XG4gIHJldHVybiAoaXNWZWN0b3IoeCkpICYmIChpc1ZlY3Rvcih5KSkgJiYgKHgubGVuZ3RoID09PSB5Lmxlbmd0aCkgJiYgKChmdW5jdGlvbiBsb29wKHhzLCB5cywgaW5kZXgsIGNvdW50KSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaW5kZXggPCBjb3VudCA/XG4gICAgICBpc0VxdWl2YWxlbnQoKHhzIHx8IDApW2luZGV4XSwgKHlzIHx8IDApW2luZGV4XSkgP1xuICAgICAgICAoeHMgPSB4cywgeXMgPSB5cywgaW5kZXggPSBpbmMoaW5kZXgpLCBjb3VudCA9IGNvdW50LCBsb29wKSA6XG4gICAgICAgIGZhbHNlIDpcbiAgICAgIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKHgsIHksIDAsIHgubGVuZ3RoKSk7XG59O1xuXG52YXIgaXNFcXVpdmFsZW50ID0gZnVuY3Rpb24gaXNFcXVpdmFsZW50KHgsIHkpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuICh4ID09PSB5KSB8fCAoaXNOaWwoeCkgP1xuICAgICAgICBpc05pbCh5KSA6XG4gICAgICBpc05pbCh5KSA/XG4gICAgICAgIGlzTmlsKHgpIDpcbiAgICAgIGlzU3RyaW5nKHgpID9cbiAgICAgICAgZmFsc2UgOlxuICAgICAgaXNOdW1iZXIoeCkgP1xuICAgICAgICBmYWxzZSA6XG4gICAgICBpc0ZuKHgpID9cbiAgICAgICAgZmFsc2UgOlxuICAgICAgaXNCb29sZWFuKHgpID9cbiAgICAgICAgZmFsc2UgOlxuICAgICAgaXNEYXRlKHgpID9cbiAgICAgICAgaXNEYXRlRXF1YWwoeCwgeSkgOlxuICAgICAgaXNWZWN0b3IoeCkgP1xuICAgICAgICBpc1ZlY3RvckVxdWFsKHgsIHksIFtdLCBbXSkgOlxuICAgICAgaXNSZVBhdHRlcm4oeCkgP1xuICAgICAgICBpc1BhdHRlcm5FcXVhbCh4LCB5KSA6XG4gICAgICBcImVsc2VcIiA/XG4gICAgICAgIGlzRGljdGlvbmFyeUVxdWFsKHgsIHkpIDpcbiAgICAgICAgdm9pZCgwKSk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIG1vcmUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHByZXZpb3VzLCBjdXJyZW50LCBpbmRleCwgY291bnQpIHtcbiAgICAgICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICAgICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICAgICAgcmVjdXIgPSAoaXNFcXVpdmFsZW50KHByZXZpb3VzLCBjdXJyZW50KSkgJiYgKGluZGV4IDwgY291bnQgP1xuICAgICAgICAgIChwcmV2aW91cyA9IGN1cnJlbnQsIGN1cnJlbnQgPSAobW9yZSB8fCAwKVtpbmRleF0sIGluZGV4ID0gaW5jKGluZGV4KSwgY291bnQgPSBjb3VudCwgbG9vcCkgOlxuICAgICAgICAgIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVjdXI7XG4gICAgICB9KSh4LCB5LCAwLCBtb3JlLmxlbmd0aCk7XG4gIH07XG4gIHJldHVybiB2b2lkKDApO1xufTtcblxudmFyIGlzRXF1YWwgPSBpc0VxdWl2YWxlbnQ7XG5leHBvcnRzLmlzRXF1YWwgPSBpc0VxdWFsO1xuXG52YXIgaXNTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIGlzU3RyaWN0RXF1YWwoeCwgeSkge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4geCA9PT0geTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocHJldmlvdXMsIGN1cnJlbnQsIGluZGV4LCBjb3VudCkge1xuICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgICByZWN1ciA9IChwcmV2aW91cyA9PT0gY3VycmVudCkgJiYgKGluZGV4IDwgY291bnQgP1xuICAgICAgICAgIChwcmV2aW91cyA9IGN1cnJlbnQsIGN1cnJlbnQgPSAobW9yZSB8fCAwKVtpbmRleF0sIGluZGV4ID0gaW5jKGluZGV4KSwgY291bnQgPSBjb3VudCwgbG9vcCkgOlxuICAgICAgICAgIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVjdXI7XG4gICAgICB9KSh4LCB5LCAwLCBtb3JlLmxlbmd0aCk7XG4gIH07XG4gIHJldHVybiB2b2lkKDApO1xufTtcbmV4cG9ydHMuaXNTdHJpY3RFcXVhbCA9IGlzU3RyaWN0RXF1YWw7XG5cbnZhciBncmVhdGVyVGhhbiA9IGZ1bmN0aW9uIGdyZWF0ZXJUaGFuKHgsIHkpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggPiB5O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBtb3JlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcChwcmV2aW91cywgY3VycmVudCwgaW5kZXgsIGNvdW50KSB7XG4gICAgICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgICAgIHJlY3VyID0gKHByZXZpb3VzID4gY3VycmVudCkgJiYgKGluZGV4IDwgY291bnQgP1xuICAgICAgICAgIChwcmV2aW91cyA9IGN1cnJlbnQsIGN1cnJlbnQgPSAobW9yZSB8fCAwKVtpbmRleF0sIGluZGV4ID0gaW5jKGluZGV4KSwgY291bnQgPSBjb3VudCwgbG9vcCkgOlxuICAgICAgICAgIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVjdXI7XG4gICAgICB9KSh4LCB5LCAwLCBtb3JlLmxlbmd0aCk7XG4gIH07XG4gIHJldHVybiB2b2lkKDApO1xufTtcbmV4cG9ydHMuZ3JlYXRlclRoYW4gPSBncmVhdGVyVGhhbjtcblxudmFyIG5vdExlc3NUaGFuID0gZnVuY3Rpb24gbm90TGVzc1RoYW4oeCwgeSkge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4geCA+PSB5O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBtb3JlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcChwcmV2aW91cywgY3VycmVudCwgaW5kZXgsIGNvdW50KSB7XG4gICAgICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgICAgIHJlY3VyID0gKHByZXZpb3VzID49IGN1cnJlbnQpICYmIChpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAocHJldmlvdXMgPSBjdXJyZW50LCBjdXJyZW50ID0gKG1vcmUgfHwgMClbaW5kZXhdLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoeCwgeSwgMCwgbW9yZS5sZW5ndGgpO1xuICB9O1xuICByZXR1cm4gdm9pZCgwKTtcbn07XG5leHBvcnRzLm5vdExlc3NUaGFuID0gbm90TGVzc1RoYW47XG5cbnZhciBsZXNzVGhhbiA9IGZ1bmN0aW9uIGxlc3NUaGFuKHgsIHkpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggPCB5O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBtb3JlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcChwcmV2aW91cywgY3VycmVudCwgaW5kZXgsIGNvdW50KSB7XG4gICAgICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgICAgIHJlY3VyID0gKHByZXZpb3VzIDwgY3VycmVudCkgJiYgKGluZGV4IDwgY291bnQgP1xuICAgICAgICAgIChwcmV2aW91cyA9IGN1cnJlbnQsIGN1cnJlbnQgPSAobW9yZSB8fCAwKVtpbmRleF0sIGluZGV4ID0gaW5jKGluZGV4KSwgY291bnQgPSBjb3VudCwgbG9vcCkgOlxuICAgICAgICAgIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVjdXI7XG4gICAgICB9KSh4LCB5LCAwLCBtb3JlLmxlbmd0aCk7XG4gIH07XG4gIHJldHVybiB2b2lkKDApO1xufTtcbmV4cG9ydHMubGVzc1RoYW4gPSBsZXNzVGhhbjtcblxudmFyIG5vdEdyZWF0ZXJUaGFuID0gZnVuY3Rpb24gbm90R3JlYXRlclRoYW4oeCwgeSkge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4geCA8PSB5O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBtb3JlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcChwcmV2aW91cywgY3VycmVudCwgaW5kZXgsIGNvdW50KSB7XG4gICAgICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgICAgIHJlY3VyID0gKHByZXZpb3VzIDw9IGN1cnJlbnQpICYmIChpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAocHJldmlvdXMgPSBjdXJyZW50LCBjdXJyZW50ID0gKG1vcmUgfHwgMClbaW5kZXhdLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoeCwgeSwgMCwgbW9yZS5sZW5ndGgpO1xuICB9O1xuICByZXR1cm4gdm9pZCgwKTtcbn07XG5leHBvcnRzLm5vdEdyZWF0ZXJUaGFuID0gbm90R3JlYXRlclRoYW47XG5cbnZhciBzdW0gPSBmdW5jdGlvbiBzdW0oYSwgYiwgYywgZCwgZSwgZikge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gYTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gYSArIGI7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGEgKyBiICsgYztcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gYSArIGIgKyBjICsgZDtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gYSArIGIgKyBjICsgZCArIGU7XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIGEgKyBiICsgYyArIGQgKyBlICsgZjtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgNik7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodmFsdWUsIGluZGV4LCBjb3VudCkge1xuICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgICByZWN1ciA9IGluZGV4IDwgY291bnQgP1xuICAgICAgICAgICh2YWx1ZSA9IHZhbHVlICsgKChtb3JlIHx8IDApW2luZGV4XSksIGluZGV4ID0gaW5jKGluZGV4KSwgY291bnQgPSBjb3VudCwgbG9vcCkgOlxuICAgICAgICAgIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVjdXI7XG4gICAgICB9KShhICsgYiArIGMgKyBkICsgZSArIGYsIDAsIG1vcmUubGVuZ3RoKTtcbiAgfTtcbiAgcmV0dXJuIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5zdW0gPSBzdW07XG5cbnZhciBzdWJ0cmFjdCA9IGZ1bmN0aW9uIHN1YnRyYWN0KGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHsgdGhyb3cgVHlwZUVycm9yKFwiV3JvbmcgbnVtYmVyIG9mIGFyZ3MgcGFzc2VkIHRvOiAtXCIpOyB9KSgpO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiAwIC0gYTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gYSAtIGI7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGEgLSBiIC0gYztcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gYSAtIGIgLSBjIC0gZDtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gYSAtIGIgLSBjIC0gZCAtIGU7XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIGEgLSBiIC0gYyAtIGQgLSBlIC0gZjtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgNik7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodmFsdWUsIGluZGV4LCBjb3VudCkge1xuICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgICByZWN1ciA9IGluZGV4IDwgY291bnQgP1xuICAgICAgICAgICh2YWx1ZSA9IHZhbHVlIC0gKChtb3JlIHx8IDApW2luZGV4XSksIGluZGV4ID0gaW5jKGluZGV4KSwgY291bnQgPSBjb3VudCwgbG9vcCkgOlxuICAgICAgICAgIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVjdXI7XG4gICAgICB9KShhIC0gYiAtIGMgLSBkIC0gZSAtIGYsIDAsIG1vcmUubGVuZ3RoKTtcbiAgfTtcbiAgcmV0dXJuIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5zdWJ0cmFjdCA9IHN1YnRyYWN0O1xuXG52YXIgZGl2aWRlID0gZnVuY3Rpb24gZGl2aWRlKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHsgdGhyb3cgVHlwZUVycm9yKFwiV3JvbmcgbnVtYmVyIG9mIGFyZ3MgcGFzc2VkIHRvOiAvXCIpOyB9KSgpO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiAxIC8gYTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gYSAvIGI7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGEgLyBiIC8gYztcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gYSAvIGIgLyBjIC8gZDtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gYSAvIGIgLyBjIC8gZCAvIGU7XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIGEgLyBiIC8gYyAvIGQgLyBlIC8gZjtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgNik7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodmFsdWUsIGluZGV4LCBjb3VudCkge1xuICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgICByZWN1ciA9IGluZGV4IDwgY291bnQgP1xuICAgICAgICAgICh2YWx1ZSA9IHZhbHVlIC8gKChtb3JlIHx8IDApW2luZGV4XSksIGluZGV4ID0gaW5jKGluZGV4KSwgY291bnQgPSBjb3VudCwgbG9vcCkgOlxuICAgICAgICAgIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVjdXI7XG4gICAgICB9KShhIC8gYiAvIGMgLyBkIC8gZSAvIGYsIDAsIG1vcmUubGVuZ3RoKTtcbiAgfTtcbiAgcmV0dXJuIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5kaXZpZGUgPSBkaXZpZGU7XG5cbnZhciBtdWx0aXBseSA9IGZ1bmN0aW9uIG11bHRpcGx5KGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGE7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIGEgKiBiO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBhICogYiAqIGM7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIGEgKiBiICogYyAqIGQ7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIGEgKiBiICogYyAqIGQgKiBlO1xuICAgIGNhc2UgNjpcbiAgICAgIHJldHVybiBhICogYiAqIGMgKiBkICogZSAqIGY7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIG1vcmUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDYpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHZhbHVlLCBpbmRleCwgY291bnQpIHtcbiAgICAgICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICAgICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICAgICAgcmVjdXIgPSBpbmRleCA8IGNvdW50ID9cbiAgICAgICAgICAodmFsdWUgPSB2YWx1ZSAqICgobW9yZSB8fCAwKVtpbmRleF0pLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoYSAqIGIgKiBjICogZCAqIGUgKiBmLCAwLCBtb3JlLmxlbmd0aCk7XG4gIH07XG4gIHJldHVybiB2b2lkKDApO1xufTtcbmV4cG9ydHMubXVsdGlwbHkgPSBtdWx0aXBseTtcblxudmFyIGFuZCA9IGZ1bmN0aW9uIGFuZChhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBhO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBhICYmIGI7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGEgJiYgYiAmJiBjO1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBhICYmIGIgJiYgYyAmJiBkO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBhICYmIGIgJiYgYyAmJiBkICYmIGU7XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIGEgJiYgYiAmJiBjICYmIGQgJiYgZSAmJiBmO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBtb3JlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCA2KTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcCh2YWx1ZSwgaW5kZXgsIGNvdW50KSB7XG4gICAgICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgICAgIHJlY3VyID0gaW5kZXggPCBjb3VudCA/XG4gICAgICAgICAgKHZhbHVlID0gdmFsdWUgJiYgKChtb3JlIHx8IDApW2luZGV4XSksIGluZGV4ID0gaW5jKGluZGV4KSwgY291bnQgPSBjb3VudCwgbG9vcCkgOlxuICAgICAgICAgIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVjdXI7XG4gICAgICB9KShhICYmIGIgJiYgYyAmJiBkICYmIGUgJiYgZiwgMCwgbW9yZS5sZW5ndGgpO1xuICB9O1xuICByZXR1cm4gdm9pZCgwKTtcbn07XG5leHBvcnRzLmFuZCA9IGFuZDtcblxudmFyIG9yID0gZnVuY3Rpb24gb3IoYSwgYiwgYywgZCwgZSwgZikge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gdm9pZCgwKTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gYTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gYSB8fCBiO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBhIHx8IGIgfHwgYztcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gYSB8fCBiIHx8IGMgfHwgZDtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gYSB8fCBiIHx8IGMgfHwgZCB8fCBlO1xuICAgIGNhc2UgNjpcbiAgICAgIHJldHVybiBhIHx8IGIgfHwgYyB8fCBkIHx8IGUgfHwgZjtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgNik7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodmFsdWUsIGluZGV4LCBjb3VudCkge1xuICAgICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgICAgICByZWN1ciA9IGluZGV4IDwgY291bnQgP1xuICAgICAgICAgICh2YWx1ZSA9IHZhbHVlIHx8ICgobW9yZSB8fCAwKVtpbmRleF0pLCBpbmRleCA9IGluYyhpbmRleCksIGNvdW50ID0gY291bnQsIGxvb3ApIDpcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3VyO1xuICAgICAgfSkoYSB8fCBiIHx8IGMgfHwgZCB8fCBlIHx8IGYsIDAsIG1vcmUubGVuZ3RoKTtcbiAgfTtcbiAgcmV0dXJuIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5vciA9IG9yO1xuXG52YXIgcHJpbnQgPSBmdW5jdGlvbiBwcmludCgpIHtcbiAgdmFyIG1vcmUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZS5sb2csIG1vcmUpO1xufTtcbmV4cG9ydHMucHJpbnQgPSBwcmludFxufSkoKSIsInZhciBfbnNfID0ge1xuICBcImlkXCI6IFwid2lzcC5zZXF1ZW5jZVwiXG59O1xudmFyIHdpc3BfcnVudGltZSA9IHJlcXVpcmUoXCIuL3J1bnRpbWVcIik7XG52YXIgaXNOaWwgPSB3aXNwX3J1bnRpbWUuaXNOaWw7XG52YXIgaXNWZWN0b3IgPSB3aXNwX3J1bnRpbWUuaXNWZWN0b3I7XG52YXIgaXNGbiA9IHdpc3BfcnVudGltZS5pc0ZuO1xudmFyIGlzTnVtYmVyID0gd2lzcF9ydW50aW1lLmlzTnVtYmVyO1xudmFyIGlzU3RyaW5nID0gd2lzcF9ydW50aW1lLmlzU3RyaW5nO1xudmFyIGlzRGljdGlvbmFyeSA9IHdpc3BfcnVudGltZS5pc0RpY3Rpb25hcnk7XG52YXIga2V5VmFsdWVzID0gd2lzcF9ydW50aW1lLmtleVZhbHVlcztcbnZhciBzdHIgPSB3aXNwX3J1bnRpbWUuc3RyO1xudmFyIGRlYyA9IHdpc3BfcnVudGltZS5kZWM7XG52YXIgaW5jID0gd2lzcF9ydW50aW1lLmluYztcbnZhciBtZXJnZSA9IHdpc3BfcnVudGltZS5tZXJnZTtcbnZhciBkaWN0aW9uYXJ5ID0gd2lzcF9ydW50aW1lLmRpY3Rpb25hcnk7OztcblxudmFyIExpc3QgPSBmdW5jdGlvbiBMaXN0KGhlYWQsIHRhaWwpIHtcbiAgdGhpcy5oZWFkID0gaGVhZDtcbiAgdGhpcy50YWlsID0gdGFpbCB8fCAobGlzdCgpKTtcbiAgdGhpcy5sZW5ndGggPSBpbmMoY291bnQodGhpcy50YWlsKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuTGlzdC5wcm90b3R5cGUubGVuZ3RoID0gMDtcblxuTGlzdC50eXBlID0gXCJ3aXNwLmxpc3RcIjtcblxuTGlzdC5wcm90b3R5cGUudHlwZSA9IExpc3QudHlwZTtcblxuTGlzdC5wcm90b3R5cGUudGFpbCA9IE9iamVjdC5jcmVhdGUoTGlzdC5wcm90b3R5cGUpO1xuXG5MaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocmVzdWx0LCBsaXN0KSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShsaXN0KSA/XG4gICAgICBcIlwiICsgXCIoXCIgKyAocmVzdWx0LnN1YnN0cigxKSkgKyBcIilcIiA6XG4gICAgICAocmVzdWx0ID0gXCJcIiArIHJlc3VsdCArIFwiIFwiICsgKGlzVmVjdG9yKGZpcnN0KGxpc3QpKSA/XG4gICAgICAgIFwiXCIgKyBcIltcIiArIChmaXJzdChsaXN0KS5qb2luKFwiIFwiKSkgKyBcIl1cIiA6XG4gICAgICBpc05pbChmaXJzdChsaXN0KSkgP1xuICAgICAgICBcIm5pbFwiIDpcbiAgICAgIGlzU3RyaW5nKGZpcnN0KGxpc3QpKSA/XG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGZpcnN0KGxpc3QpKSA6XG4gICAgICBpc051bWJlcihmaXJzdChsaXN0KSkgP1xuICAgICAgICBKU09OLnN0cmluZ2lmeShmaXJzdChsaXN0KSkgOlxuICAgICAgICBmaXJzdChsaXN0KSksIGxpc3QgPSByZXN0KGxpc3QpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoXCJcIiwgdGhpcyk7XG59O1xuXG52YXIgbGF6eVNlcVZhbHVlID0gZnVuY3Rpb24gbGF6eVNlcVZhbHVlKGxhenlTZXEpIHtcbiAgcmV0dXJuICEobGF6eVNlcS5yZWFsaXplZCkgP1xuICAgIChsYXp5U2VxLnJlYWxpemVkID0gdHJ1ZSkgJiYgKGxhenlTZXEueCA9IGxhenlTZXEueCgpKSA6XG4gICAgbGF6eVNlcS54O1xufTtcblxudmFyIExhenlTZXEgPSBmdW5jdGlvbiBMYXp5U2VxKHJlYWxpemVkLCB4KSB7XG4gIHRoaXMucmVhbGl6ZWQgPSByZWFsaXplZCB8fCBmYWxzZTtcbiAgdGhpcy54ID0geDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5MYXp5U2VxLnR5cGUgPSBcIndpc3AubGF6eS5zZXFcIjtcblxuTGF6eVNlcS5wcm90b3R5cGUudHlwZSA9IExhenlTZXEudHlwZTtcblxudmFyIGxhenlTZXEgPSBmdW5jdGlvbiBsYXp5U2VxKHJlYWxpemVkLCBib2R5KSB7XG4gIHJldHVybiBuZXcgTGF6eVNlcShyZWFsaXplZCwgYm9keSk7XG59O1xuZXhwb3J0cy5sYXp5U2VxID0gbGF6eVNlcTtcblxudmFyIGlzTGF6eVNlcSA9IGZ1bmN0aW9uIGlzTGF6eVNlcSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgKExhenlTZXEudHlwZSA9PT0gdmFsdWUudHlwZSk7XG59O1xuZXhwb3J0cy5pc0xhenlTZXEgPSBpc0xhenlTZXE7XG5cbnVuZGVmaW5lZDtcblxudmFyIGlzTGlzdCA9IGZ1bmN0aW9uIGlzTGlzdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgKExpc3QudHlwZSA9PT0gdmFsdWUudHlwZSk7XG59O1xuZXhwb3J0cy5pc0xpc3QgPSBpc0xpc3Q7XG5cbnZhciBsaXN0ID0gZnVuY3Rpb24gbGlzdCgpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDAgP1xuICAgIE9iamVjdC5jcmVhdGUoTGlzdC5wcm90b3R5cGUpIDpcbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLnJlZHVjZVJpZ2h0KGZ1bmN0aW9uKHRhaWwsIGhlYWQpIHtcbiAgICAgIHJldHVybiBjb25zKGhlYWQsIHRhaWwpO1xuICAgIH0sIGxpc3QoKSk7XG59O1xuZXhwb3J0cy5saXN0ID0gbGlzdDtcblxudmFyIGNvbnMgPSBmdW5jdGlvbiBjb25zKGhlYWQsIHRhaWwpIHtcbiAgcmV0dXJuIG5ldyBMaXN0KGhlYWQsIHRhaWwpO1xufTtcbmV4cG9ydHMuY29ucyA9IGNvbnM7XG5cbnZhciByZXZlcnNlTGlzdCA9IGZ1bmN0aW9uIHJldmVyc2VMaXN0KHNlcXVlbmNlKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChpdGVtcywgc291cmNlKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShzb3VyY2UpID9cbiAgICAgIGxpc3QuYXBwbHkobGlzdCwgaXRlbXMpIDpcbiAgICAgIChpdGVtcyA9IFtmaXJzdChzb3VyY2UpXS5jb25jYXQoaXRlbXMpLCBzb3VyY2UgPSByZXN0KHNvdXJjZSksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShbXSwgc2VxdWVuY2UpO1xufTtcblxudmFyIGlzU2VxdWVudGlhbCA9IGZ1bmN0aW9uIGlzU2VxdWVudGlhbCh4KSB7XG4gIHJldHVybiAoaXNMaXN0KHgpKSB8fCAoaXNWZWN0b3IoeCkpIHx8IChpc0xhenlTZXEoeCkpIHx8IChpc0RpY3Rpb25hcnkoeCkpIHx8IChpc1N0cmluZyh4KSk7XG59O1xuZXhwb3J0cy5pc1NlcXVlbnRpYWwgPSBpc1NlcXVlbnRpYWw7XG5cbnZhciByZXZlcnNlID0gZnVuY3Rpb24gcmV2ZXJzZShzZXF1ZW5jZSkge1xuICByZXR1cm4gaXNMaXN0KHNlcXVlbmNlKSA/XG4gICAgcmV2ZXJzZUxpc3Qoc2VxdWVuY2UpIDpcbiAgaXNWZWN0b3Ioc2VxdWVuY2UpID9cbiAgICBzZXF1ZW5jZS5yZXZlcnNlKCkgOlxuICBpc05pbChzZXF1ZW5jZSkgP1xuICAgIGxpc3QoKSA6XG4gIFwiZWxzZVwiID9cbiAgICByZXZlcnNlKHNlcShzZXF1ZW5jZSkpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMucmV2ZXJzZSA9IHJldmVyc2U7XG5cbnZhciBtYXAgPSBmdW5jdGlvbiBtYXAoZiwgc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGlzVmVjdG9yKHNlcXVlbmNlKSA/XG4gICAgc2VxdWVuY2UubWFwKGYpIDpcbiAgaXNMaXN0KHNlcXVlbmNlKSA/XG4gICAgbWFwTGlzdChmLCBzZXF1ZW5jZSkgOlxuICBpc05pbChzZXF1ZW5jZSkgP1xuICAgIGxpc3QoKSA6XG4gIFwiZWxzZVwiID9cbiAgICBtYXAoZiwgc2VxKHNlcXVlbmNlKSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5tYXAgPSBtYXA7XG5cbnZhciBtYXBMaXN0ID0gZnVuY3Rpb24gbWFwTGlzdChmLCBzZXF1ZW5jZSkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocmVzdWx0LCBpdGVtcykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkoaXRlbXMpID9cbiAgICAgIHJldmVyc2UocmVzdWx0KSA6XG4gICAgICAocmVzdWx0ID0gY29ucyhmKGZpcnN0KGl0ZW1zKSksIHJlc3VsdCksIGl0ZW1zID0gcmVzdChpdGVtcyksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShsaXN0KCksIHNlcXVlbmNlKTtcbn07XG5cbnZhciBmaWx0ZXIgPSBmdW5jdGlvbiBmaWx0ZXIoaXNGLCBzZXF1ZW5jZSkge1xuICByZXR1cm4gaXNWZWN0b3Ioc2VxdWVuY2UpID9cbiAgICBzZXF1ZW5jZS5maWx0ZXIoaXNGKSA6XG4gIGlzTGlzdChzZXF1ZW5jZSkgP1xuICAgIGZpbHRlckxpc3QoaXNGLCBzZXF1ZW5jZSkgOlxuICBpc05pbChzZXF1ZW5jZSkgP1xuICAgIGxpc3QoKSA6XG4gIFwiZWxzZVwiID9cbiAgICBmaWx0ZXIoaXNGLCBzZXEoc2VxdWVuY2UpKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmZpbHRlciA9IGZpbHRlcjtcblxudmFyIGZpbHRlckxpc3QgPSBmdW5jdGlvbiBmaWx0ZXJMaXN0KGlzRiwgc2VxdWVuY2UpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHJlc3VsdCwgaXRlbXMpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBpc0VtcHR5KGl0ZW1zKSA/XG4gICAgICByZXZlcnNlKHJlc3VsdCkgOlxuICAgICAgKHJlc3VsdCA9IGlzRihmaXJzdChpdGVtcykpID9cbiAgICAgICAgY29ucyhmaXJzdChpdGVtcyksIHJlc3VsdCkgOlxuICAgICAgICByZXN1bHQsIGl0ZW1zID0gcmVzdChpdGVtcyksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShsaXN0KCksIHNlcXVlbmNlKTtcbn07XG5cbnZhciByZWR1Y2UgPSBmdW5jdGlvbiByZWR1Y2UoZikge1xuICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICB2YXIgaGFzSW5pdGlhbCA9IGNvdW50KHBhcmFtcykgPj0gMjtcbiAgICB2YXIgaW5pdGlhbCA9IGhhc0luaXRpYWwgP1xuICAgICAgZmlyc3QocGFyYW1zKSA6XG4gICAgICB2b2lkKDApO1xuICAgIHZhciBzZXF1ZW5jZSA9IGhhc0luaXRpYWwgP1xuICAgICAgc2Vjb25kKHBhcmFtcykgOlxuICAgICAgZmlyc3QocGFyYW1zKTtcbiAgICByZXR1cm4gaXNOaWwoc2VxdWVuY2UpID9cbiAgICAgIGluaXRpYWwgOlxuICAgIGlzVmVjdG9yKHNlcXVlbmNlKSA/XG4gICAgICBoYXNJbml0aWFsID9cbiAgICAgICAgc2VxdWVuY2UucmVkdWNlKGYsIGluaXRpYWwpIDpcbiAgICAgICAgc2VxdWVuY2UucmVkdWNlKGYpIDpcbiAgICBpc0xpc3Qoc2VxdWVuY2UpID9cbiAgICAgIGhhc0luaXRpYWwgP1xuICAgICAgICByZWR1Y2VMaXN0KGYsIGluaXRpYWwsIHNlcXVlbmNlKSA6XG4gICAgICAgIHJlZHVjZUxpc3QoZiwgZmlyc3Qoc2VxdWVuY2UpLCByZXN0KHNlcXVlbmNlKSkgOlxuICAgIFwiZWxzZVwiID9cbiAgICAgIHJlZHVjZShmLCBpbml0aWFsLCBzZXEoc2VxdWVuY2UpKSA6XG4gICAgICB2b2lkKDApO1xuICB9KSgpO1xufTtcbmV4cG9ydHMucmVkdWNlID0gcmVkdWNlO1xuXG52YXIgcmVkdWNlTGlzdCA9IGZ1bmN0aW9uIHJlZHVjZUxpc3QoZiwgaW5pdGlhbCwgc2VxdWVuY2UpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHJlc3VsdCwgaXRlbXMpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBpc0VtcHR5KGl0ZW1zKSA/XG4gICAgICByZXN1bHQgOlxuICAgICAgKHJlc3VsdCA9IGYocmVzdWx0LCBmaXJzdChpdGVtcykpLCBpdGVtcyA9IHJlc3QoaXRlbXMpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoaW5pdGlhbCwgc2VxdWVuY2UpO1xufTtcblxudmFyIGNvdW50ID0gZnVuY3Rpb24gY291bnQoc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgMCA6XG4gICAgKHNlcShzZXF1ZW5jZSkpLmxlbmd0aDtcbn07XG5leHBvcnRzLmNvdW50ID0gY291bnQ7XG5cbnZhciBpc0VtcHR5ID0gZnVuY3Rpb24gaXNFbXB0eShzZXF1ZW5jZSkge1xuICByZXR1cm4gY291bnQoc2VxdWVuY2UpID09PSAwO1xufTtcbmV4cG9ydHMuaXNFbXB0eSA9IGlzRW1wdHk7XG5cbnZhciBmaXJzdCA9IGZ1bmN0aW9uIGZpcnN0KHNlcXVlbmNlKSB7XG4gIHJldHVybiBpc05pbChzZXF1ZW5jZSkgP1xuICAgIHZvaWQoMCkgOlxuICBpc0xpc3Qoc2VxdWVuY2UpID9cbiAgICBzZXF1ZW5jZS5oZWFkIDpcbiAgKGlzVmVjdG9yKHNlcXVlbmNlKSkgfHwgKGlzU3RyaW5nKHNlcXVlbmNlKSkgP1xuICAgIChzZXF1ZW5jZSB8fCAwKVswXSA6XG4gIGlzTGF6eVNlcShzZXF1ZW5jZSkgP1xuICAgIGZpcnN0KGxhenlTZXFWYWx1ZShzZXF1ZW5jZSkpIDpcbiAgXCJlbHNlXCIgP1xuICAgIGZpcnN0KHNlcShzZXF1ZW5jZSkpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuZmlyc3QgPSBmaXJzdDtcblxudmFyIHNlY29uZCA9IGZ1bmN0aW9uIHNlY29uZChzZXF1ZW5jZSkge1xuICByZXR1cm4gaXNOaWwoc2VxdWVuY2UpID9cbiAgICB2b2lkKDApIDpcbiAgaXNMaXN0KHNlcXVlbmNlKSA/XG4gICAgZmlyc3QocmVzdChzZXF1ZW5jZSkpIDpcbiAgKGlzVmVjdG9yKHNlcXVlbmNlKSkgfHwgKGlzU3RyaW5nKHNlcXVlbmNlKSkgP1xuICAgIChzZXF1ZW5jZSB8fCAwKVsxXSA6XG4gIGlzTGF6eVNlcShzZXF1ZW5jZSkgP1xuICAgIHNlY29uZChsYXp5U2VxVmFsdWUoc2VxdWVuY2UpKSA6XG4gIFwiZWxzZVwiID9cbiAgICBmaXJzdChyZXN0KHNlcShzZXF1ZW5jZSkpKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLnNlY29uZCA9IHNlY29uZDtcblxudmFyIHRoaXJkID0gZnVuY3Rpb24gdGhpcmQoc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgdm9pZCgwKSA6XG4gIGlzTGlzdChzZXF1ZW5jZSkgP1xuICAgIGZpcnN0KHJlc3QocmVzdChzZXF1ZW5jZSkpKSA6XG4gIChpc1ZlY3RvcihzZXF1ZW5jZSkpIHx8IChpc1N0cmluZyhzZXF1ZW5jZSkpID9cbiAgICAoc2VxdWVuY2UgfHwgMClbMl0gOlxuICBpc0xhenlTZXEoc2VxdWVuY2UpID9cbiAgICB0aGlyZChsYXp5U2VxVmFsdWUoc2VxdWVuY2UpKSA6XG4gIFwiZWxzZVwiID9cbiAgICBzZWNvbmQocmVzdChzZXEoc2VxdWVuY2UpKSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy50aGlyZCA9IHRoaXJkO1xuXG52YXIgcmVzdCA9IGZ1bmN0aW9uIHJlc3Qoc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgbGlzdCgpIDpcbiAgaXNMaXN0KHNlcXVlbmNlKSA/XG4gICAgc2VxdWVuY2UudGFpbCA6XG4gIChpc1ZlY3RvcihzZXF1ZW5jZSkpIHx8IChpc1N0cmluZyhzZXF1ZW5jZSkpID9cbiAgICBzZXF1ZW5jZS5zbGljZSgxKSA6XG4gIGlzTGF6eVNlcShzZXF1ZW5jZSkgP1xuICAgIHJlc3QobGF6eVNlcVZhbHVlKHNlcXVlbmNlKSkgOlxuICBcImVsc2VcIiA/XG4gICAgcmVzdChzZXEoc2VxdWVuY2UpKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLnJlc3QgPSByZXN0O1xuXG52YXIgbGFzdE9mTGlzdCA9IGZ1bmN0aW9uIGxhc3RPZkxpc3QobGlzdCkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoaXRlbSwgaXRlbXMpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBpc0VtcHR5KGl0ZW1zKSA/XG4gICAgICBpdGVtIDpcbiAgICAgIChpdGVtID0gZmlyc3QoaXRlbXMpLCBpdGVtcyA9IHJlc3QoaXRlbXMpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoZmlyc3QobGlzdCksIHJlc3QobGlzdCkpO1xufTtcblxudmFyIGxhc3QgPSBmdW5jdGlvbiBsYXN0KHNlcXVlbmNlKSB7XG4gIHJldHVybiAoaXNWZWN0b3Ioc2VxdWVuY2UpKSB8fCAoaXNTdHJpbmcoc2VxdWVuY2UpKSA/XG4gICAgKHNlcXVlbmNlIHx8IDApW2RlYyhjb3VudChzZXF1ZW5jZSkpXSA6XG4gIGlzTGlzdChzZXF1ZW5jZSkgP1xuICAgIGxhc3RPZkxpc3Qoc2VxdWVuY2UpIDpcbiAgaXNOaWwoc2VxdWVuY2UpID9cbiAgICB2b2lkKDApIDpcbiAgaXNMYXp5U2VxKHNlcXVlbmNlKSA/XG4gICAgbGFzdChsYXp5U2VxVmFsdWUoc2VxdWVuY2UpKSA6XG4gIFwiZWxzZVwiID9cbiAgICBsYXN0KHNlcShzZXF1ZW5jZSkpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMubGFzdCA9IGxhc3Q7XG5cbnZhciBidXRsYXN0ID0gZnVuY3Rpb24gYnV0bGFzdChzZXF1ZW5jZSkge1xuICB2YXIgaXRlbXMgPSBpc05pbChzZXF1ZW5jZSkgP1xuICAgIHZvaWQoMCkgOlxuICBpc1N0cmluZyhzZXF1ZW5jZSkgP1xuICAgIHN1YnMoc2VxdWVuY2UsIDAsIGRlYyhjb3VudChzZXF1ZW5jZSkpKSA6XG4gIGlzVmVjdG9yKHNlcXVlbmNlKSA/XG4gICAgc2VxdWVuY2Uuc2xpY2UoMCwgZGVjKGNvdW50KHNlcXVlbmNlKSkpIDpcbiAgaXNMaXN0KHNlcXVlbmNlKSA/XG4gICAgbGlzdC5hcHBseShsaXN0LCBidXRsYXN0KHZlYyhzZXF1ZW5jZSkpKSA6XG4gIGlzTGF6eVNlcShzZXF1ZW5jZSkgP1xuICAgIGJ1dGxhc3QobGF6eVNlcVZhbHVlKHNlcXVlbmNlKSkgOlxuICBcImVsc2VcIiA/XG4gICAgYnV0bGFzdChzZXEoc2VxdWVuY2UpKSA6XG4gICAgdm9pZCgwKTtcbiAgcmV0dXJuICEoKGlzTmlsKGl0ZW1zKSkgfHwgKGlzRW1wdHkoaXRlbXMpKSkgP1xuICAgIGl0ZW1zIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuYnV0bGFzdCA9IGJ1dGxhc3Q7XG5cbnZhciB0YWtlID0gZnVuY3Rpb24gdGFrZShuLCBzZXF1ZW5jZSkge1xuICByZXR1cm4gaXNOaWwoc2VxdWVuY2UpID9cbiAgICBsaXN0KCkgOlxuICBpc1ZlY3RvcihzZXF1ZW5jZSkgP1xuICAgIHRha2VGcm9tVmVjdG9yKG4sIHNlcXVlbmNlKSA6XG4gIGlzTGlzdChzZXF1ZW5jZSkgP1xuICAgIHRha2VGcm9tTGlzdChuLCBzZXF1ZW5jZSkgOlxuICBpc0xhenlTZXEoc2VxdWVuY2UpID9cbiAgICB0YWtlKG4sIGxhenlTZXFWYWx1ZShzZXF1ZW5jZSkpIDpcbiAgXCJlbHNlXCIgP1xuICAgIHRha2Uobiwgc2VxKHNlcXVlbmNlKSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy50YWtlID0gdGFrZTtcblxudmFyIHRha2VWZWN0b3JXaGlsZSA9IGZ1bmN0aW9uIHRha2VWZWN0b3JXaGlsZShwcmVkaWNhdGUsIHZlY3Rvcikge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocmVzdWx0LCB0YWlsLCBoZWFkKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gKCEoaXNFbXB0eSh0YWlsKSkpICYmIChwcmVkaWNhdGUoaGVhZCkpID9cbiAgICAgIChyZXN1bHQgPSBjb25qKHJlc3VsdCwgaGVhZCksIHRhaWwgPSByZXN0KHRhaWwpLCBoZWFkID0gZmlyc3QodGFpbCksIGxvb3ApIDpcbiAgICAgIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoW10sIHZlY3RvciwgZmlyc3QodmVjdG9yKSk7XG59O1xuXG52YXIgdGFrZUxpc3RXaGlsZSA9IGZ1bmN0aW9uIHRha2VMaXN0V2hpbGUocHJlZGljYXRlLCBpdGVtcykge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocmVzdWx0LCB0YWlsLCBoZWFkKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gKCEoaXNFbXB0eSh0YWlsKSkpICYmIChpc1ByZWRpY2F0ZShoZWFkKSkgP1xuICAgICAgKHJlc3VsdCA9IGNvbmoocmVzdWx0LCBoZWFkKSwgdGFpbCA9IHJlc3QodGFpbCksIGhlYWQgPSBmaXJzdCh0YWlsKSwgbG9vcCkgOlxuICAgICAgbGlzdC5hcHBseShsaXN0LCByZXN1bHQpO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShbXSwgaXRlbXMsIGZpcnN0KGl0ZW1zKSk7XG59O1xuXG52YXIgdGFrZVdoaWxlID0gZnVuY3Rpb24gdGFrZVdoaWxlKHByZWRpY2F0ZSwgc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgbGlzdCgpIDpcbiAgaXNWZWN0b3Ioc2VxdWVuY2UpID9cbiAgICB0YWtlVmVjdG9yV2hpbGUocHJlZGljYXRlLCBzZXF1ZW5jZSkgOlxuICBpc0xpc3Qoc2VxdWVuY2UpID9cbiAgICB0YWtlVmVjdG9yV2hpbGUocHJlZGljYXRlLCBzZXF1ZW5jZSkgOlxuICBcImVsc2VcIiA/XG4gICAgdGFrZVdoaWxlKHByZWRpY2F0ZSwgbGF6eVNlcVZhbHVlKHNlcXVlbmNlKSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy50YWtlV2hpbGUgPSB0YWtlV2hpbGU7XG5cbnZhciB0YWtlRnJvbVZlY3RvciA9IGZ1bmN0aW9uIHRha2VGcm9tVmVjdG9yKG4sIHZlY3Rvcikge1xuICByZXR1cm4gdmVjdG9yLnNsaWNlKDAsIG4pO1xufTtcblxudmFyIHRha2VGcm9tTGlzdCA9IGZ1bmN0aW9uIHRha2VGcm9tTGlzdChuLCBzZXF1ZW5jZSkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodGFrZW4sIGl0ZW1zLCBuKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gKG4gPT09IDApIHx8IChpc0VtcHR5KGl0ZW1zKSkgP1xuICAgICAgcmV2ZXJzZSh0YWtlbikgOlxuICAgICAgKHRha2VuID0gY29ucyhmaXJzdChpdGVtcyksIHRha2VuKSwgaXRlbXMgPSByZXN0KGl0ZW1zKSwgbiA9IGRlYyhuKSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKGxpc3QoKSwgc2VxdWVuY2UsIG4pO1xufTtcblxudmFyIGRyb3BGcm9tTGlzdCA9IGZ1bmN0aW9uIGRyb3BGcm9tTGlzdChuLCBzZXF1ZW5jZSkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AobGVmdCwgaXRlbXMpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSAobGVmdCA8IDEpIHx8IChpc0VtcHR5KGl0ZW1zKSkgP1xuICAgICAgaXRlbXMgOlxuICAgICAgKGxlZnQgPSBkZWMobGVmdCksIGl0ZW1zID0gcmVzdChpdGVtcyksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShuLCBzZXF1ZW5jZSk7XG59O1xuXG52YXIgZHJvcCA9IGZ1bmN0aW9uIGRyb3Aobiwgc2VxdWVuY2UpIHtcbiAgcmV0dXJuIG4gPD0gMCA/XG4gICAgc2VxdWVuY2UgOlxuICBpc1N0cmluZyhzZXF1ZW5jZSkgP1xuICAgIHNlcXVlbmNlLnN1YnN0cihuKSA6XG4gIGlzVmVjdG9yKHNlcXVlbmNlKSA/XG4gICAgc2VxdWVuY2Uuc2xpY2UobikgOlxuICBpc0xpc3Qoc2VxdWVuY2UpID9cbiAgICBkcm9wRnJvbUxpc3Qobiwgc2VxdWVuY2UpIDpcbiAgaXNOaWwoc2VxdWVuY2UpID9cbiAgICBsaXN0KCkgOlxuICBpc0xhenlTZXEoc2VxdWVuY2UpID9cbiAgICBkcm9wKG4sIGxhenlTZXFWYWx1ZShzZXF1ZW5jZSkpIDpcbiAgXCJlbHNlXCIgP1xuICAgIGRyb3Aobiwgc2VxKHNlcXVlbmNlKSkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5kcm9wID0gZHJvcDtcblxudmFyIGNvbmpMaXN0ID0gZnVuY3Rpb24gY29uakxpc3Qoc2VxdWVuY2UsIGl0ZW1zKSB7XG4gIHJldHVybiByZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBpdGVtKSB7XG4gICAgcmV0dXJuIGNvbnMoaXRlbSwgcmVzdWx0KTtcbiAgfSwgc2VxdWVuY2UsIGl0ZW1zKTtcbn07XG5cbnZhciBjb25qID0gZnVuY3Rpb24gY29uaihzZXF1ZW5jZSkge1xuICB2YXIgaXRlbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICByZXR1cm4gaXNWZWN0b3Ioc2VxdWVuY2UpID9cbiAgICBzZXF1ZW5jZS5jb25jYXQoaXRlbXMpIDpcbiAgaXNTdHJpbmcoc2VxdWVuY2UpID9cbiAgICBcIlwiICsgc2VxdWVuY2UgKyAoc3RyLmFwcGx5KHN0ciwgaXRlbXMpKSA6XG4gIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgbGlzdC5hcHBseShsaXN0LCByZXZlcnNlKGl0ZW1zKSkgOlxuICAoaXNMaXN0KHNlcXVlbmNlKSkgfHwgKGlzTGF6eVNlcSgpKSA/XG4gICAgY29uakxpc3Qoc2VxdWVuY2UsIGl0ZW1zKSA6XG4gIGlzRGljdGlvbmFyeShzZXF1ZW5jZSkgP1xuICAgIG1lcmdlKHNlcXVlbmNlLCBtZXJnZS5hcHBseShtZXJnZSwgaXRlbXMpKSA6XG4gIFwiZWxzZVwiID9cbiAgICAoZnVuY3Rpb24oKSB7IHRocm93IFR5cGVFcnJvcihcIlwiICsgXCJUeXBlIGNhbid0IGJlIGNvbmpvaW5lZCBcIiArIHNlcXVlbmNlKTsgfSkoKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmNvbmogPSBjb25qO1xuXG52YXIgYXNzb2MgPSBmdW5jdGlvbiBhc3NvYyhzb3VyY2UpIHtcbiAgdmFyIGtleVZhbHVlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHJldHVybiBjb25qKHNvdXJjZSwgZGljdGlvbmFyeS5hcHBseShkaWN0aW9uYXJ5LCBrZXlWYWx1ZXMpKTtcbn07XG5leHBvcnRzLmFzc29jID0gYXNzb2M7XG5cbnZhciBjb25jYXQgPSBmdW5jdGlvbiBjb25jYXQoKSB7XG4gIHZhciBzZXF1ZW5jZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gcmV2ZXJzZShyZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBzZXF1ZW5jZSkge1xuICAgIHJldHVybiByZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBpdGVtKSB7XG4gICAgICByZXR1cm4gY29ucyhpdGVtLCByZXN1bHQpO1xuICAgIH0sIHJlc3VsdCwgc2VxKHNlcXVlbmNlKSk7XG4gIH0sIGxpc3QoKSwgc2VxdWVuY2VzKSk7XG59O1xuZXhwb3J0cy5jb25jYXQgPSBjb25jYXQ7XG5cbnZhciBzZXEgPSBmdW5jdGlvbiBzZXEoc2VxdWVuY2UpIHtcbiAgcmV0dXJuIGlzTmlsKHNlcXVlbmNlKSA/XG4gICAgdm9pZCgwKSA6XG4gIChpc1ZlY3RvcihzZXF1ZW5jZSkpIHx8IChpc0xpc3Qoc2VxdWVuY2UpKSB8fCAoaXNMYXp5U2VxKHNlcXVlbmNlKSkgP1xuICAgIHNlcXVlbmNlIDpcbiAgaXNTdHJpbmcoc2VxdWVuY2UpID9cbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzZXF1ZW5jZSkgOlxuICBpc0RpY3Rpb25hcnkoc2VxdWVuY2UpID9cbiAgICBrZXlWYWx1ZXMoc2VxdWVuY2UpIDpcbiAgXCJkZWZhdWx0XCIgP1xuICAgIChmdW5jdGlvbigpIHsgdGhyb3cgVHlwZUVycm9yKFwiXCIgKyBcIkNhbiBub3Qgc2VxIFwiICsgc2VxdWVuY2UpOyB9KSgpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuc2VxID0gc2VxO1xuXG52YXIgaXNTZXEgPSBmdW5jdGlvbiBpc1NlcShzZXF1ZW5jZSkge1xuICByZXR1cm4gKGlzTGlzdChzZXF1ZW5jZSkpIHx8IChpc0xhenlTZXEoc2VxdWVuY2UpKTtcbn07XG5leHBvcnRzLmlzU2VxID0gaXNTZXE7XG5cbnZhciBsaXN0VG9WZWN0b3IgPSBmdW5jdGlvbiBsaXN0VG9WZWN0b3Ioc291cmNlKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChyZXN1bHQsIGxpc3QpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBpc0VtcHR5KGxpc3QpID9cbiAgICAgIHJlc3VsdCA6XG4gICAgICAocmVzdWx0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXN1bHQucHVzaChmaXJzdChsaXN0KSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KSgpLCBsaXN0ID0gcmVzdChsaXN0KSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFtdLCBzb3VyY2UpO1xufTtcblxudmFyIHZlYyA9IGZ1bmN0aW9uIHZlYyhzZXF1ZW5jZSkge1xuICByZXR1cm4gaXNOaWwoc2VxdWVuY2UpID9cbiAgICBbXSA6XG4gIGlzVmVjdG9yKHNlcXVlbmNlKSA/XG4gICAgc2VxdWVuY2UgOlxuICBpc0xpc3Qoc2VxdWVuY2UpID9cbiAgICBsaXN0VG9WZWN0b3Ioc2VxdWVuY2UpIDpcbiAgXCJlbHNlXCIgP1xuICAgIHZlYyhzZXEoc2VxdWVuY2UpKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLnZlYyA9IHZlYztcblxudmFyIHNvcnQgPSBmdW5jdGlvbiBzb3J0KGYsIGl0ZW1zKSB7XG4gIHZhciBoYXNDb21wYXJhdG9yID0gaXNGbihmKTtcbiAgdmFyIGl0ZW1zID0gKCEoaGFzQ29tcGFyYXRvcikpICYmIChpc05pbChpdGVtcykpID9cbiAgICBmIDpcbiAgICBpdGVtcztcbiAgdmFyIGNvbXBhcmUgPSBoYXNDb21wYXJhdG9yID9cbiAgICBmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gZihhLCBiKSA/XG4gICAgICAgIDAgOlxuICAgICAgICAxO1xuICAgIH0gOlxuICAgIHZvaWQoMCk7XG4gIHJldHVybiBpc05pbChpdGVtcykgP1xuICAgIGxpc3QoKSA6XG4gIGlzVmVjdG9yKGl0ZW1zKSA/XG4gICAgaXRlbXMuc29ydChjb21wYXJlKSA6XG4gIGlzTGlzdChpdGVtcykgP1xuICAgIGxpc3QuYXBwbHkobGlzdCwgdmVjKGl0ZW1zKS5zb3J0KGNvbXBhcmUpKSA6XG4gIGlzRGljdGlvbmFyeShpdGVtcykgP1xuICAgIHNlcShpdGVtcykuc29ydChjb21wYXJlKSA6XG4gIFwiZWxzZVwiID9cbiAgICBzb3J0KGYsIHNlcShpdGVtcykpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuc29ydCA9IHNvcnQ7XG5cbnZhciByZXBlYXQgPSBmdW5jdGlvbiByZXBlYXQobiwgeCkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AobiwgcmVzdWx0KSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gbiA8PSAwID9cbiAgICAgIHJlc3VsdCA6XG4gICAgICAobiA9IGRlYyhuKSwgcmVzdWx0ID0gY29uaihyZXN1bHQsIHgpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkobiwgW10pO1xufTtcbmV4cG9ydHMucmVwZWF0ID0gcmVwZWF0IiwidmFyIF9uc18gPSB7XG4gIFwiaWRcIjogXCJ3aXNwLnJlYWRlclwiLFxuICBcImRvY1wiOiBcIlJlYWRlciBtb2R1bGUgcHJvdmlkZXMgZnVuY3Rpb25zIGZvciByZWFkaW5nIHRleHQgaW5wdXRcXG4gIGFzIHdpc3AgZGF0YSBzdHJ1Y3R1cmVzXCJcbn07XG52YXIgd2lzcF9zZXF1ZW5jZSA9IHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpO1xudmFyIGxpc3QgPSB3aXNwX3NlcXVlbmNlLmxpc3Q7XG52YXIgaXNMaXN0ID0gd2lzcF9zZXF1ZW5jZS5pc0xpc3Q7XG52YXIgY291bnQgPSB3aXNwX3NlcXVlbmNlLmNvdW50O1xudmFyIGlzRW1wdHkgPSB3aXNwX3NlcXVlbmNlLmlzRW1wdHk7XG52YXIgZmlyc3QgPSB3aXNwX3NlcXVlbmNlLmZpcnN0O1xudmFyIHNlY29uZCA9IHdpc3Bfc2VxdWVuY2Uuc2Vjb25kO1xudmFyIHRoaXJkID0gd2lzcF9zZXF1ZW5jZS50aGlyZDtcbnZhciByZXN0ID0gd2lzcF9zZXF1ZW5jZS5yZXN0O1xudmFyIG1hcCA9IHdpc3Bfc2VxdWVuY2UubWFwO1xudmFyIHZlYyA9IHdpc3Bfc2VxdWVuY2UudmVjO1xudmFyIGNvbnMgPSB3aXNwX3NlcXVlbmNlLmNvbnM7XG52YXIgY29uaiA9IHdpc3Bfc2VxdWVuY2UuY29uajtcbnZhciBjb25jYXQgPSB3aXNwX3NlcXVlbmNlLmNvbmNhdDtcbnZhciBsYXN0ID0gd2lzcF9zZXF1ZW5jZS5sYXN0O1xudmFyIGJ1dGxhc3QgPSB3aXNwX3NlcXVlbmNlLmJ1dGxhc3Q7XG52YXIgc29ydCA9IHdpc3Bfc2VxdWVuY2Uuc29ydDtcbnZhciBsYXp5U2VxID0gd2lzcF9zZXF1ZW5jZS5sYXp5U2VxOztcbnZhciB3aXNwX3J1bnRpbWUgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xudmFyIGlzT2RkID0gd2lzcF9ydW50aW1lLmlzT2RkO1xudmFyIGRpY3Rpb25hcnkgPSB3aXNwX3J1bnRpbWUuZGljdGlvbmFyeTtcbnZhciBrZXlzID0gd2lzcF9ydW50aW1lLmtleXM7XG52YXIgaXNOaWwgPSB3aXNwX3J1bnRpbWUuaXNOaWw7XG52YXIgaW5jID0gd2lzcF9ydW50aW1lLmluYztcbnZhciBkZWMgPSB3aXNwX3J1bnRpbWUuZGVjO1xudmFyIGlzVmVjdG9yID0gd2lzcF9ydW50aW1lLmlzVmVjdG9yO1xudmFyIGlzU3RyaW5nID0gd2lzcF9ydW50aW1lLmlzU3RyaW5nO1xudmFyIGlzTnVtYmVyID0gd2lzcF9ydW50aW1lLmlzTnVtYmVyO1xudmFyIGlzQm9vbGVhbiA9IHdpc3BfcnVudGltZS5pc0Jvb2xlYW47XG52YXIgaXNPYmplY3QgPSB3aXNwX3J1bnRpbWUuaXNPYmplY3Q7XG52YXIgaXNEaWN0aW9uYXJ5ID0gd2lzcF9ydW50aW1lLmlzRGljdGlvbmFyeTtcbnZhciByZVBhdHRlcm4gPSB3aXNwX3J1bnRpbWUucmVQYXR0ZXJuO1xudmFyIHJlTWF0Y2hlcyA9IHdpc3BfcnVudGltZS5yZU1hdGNoZXM7XG52YXIgcmVGaW5kID0gd2lzcF9ydW50aW1lLnJlRmluZDtcbnZhciBzdHIgPSB3aXNwX3J1bnRpbWUuc3RyO1xudmFyIHN1YnMgPSB3aXNwX3J1bnRpbWUuc3VicztcbnZhciBjaGFyID0gd2lzcF9ydW50aW1lLmNoYXI7XG52YXIgdmFscyA9IHdpc3BfcnVudGltZS52YWxzO1xudmFyIGlzRXF1YWwgPSB3aXNwX3J1bnRpbWUuaXNFcXVhbDs7XG52YXIgd2lzcF9hc3QgPSByZXF1aXJlKFwiLi9hc3RcIik7XG52YXIgaXNTeW1ib2wgPSB3aXNwX2FzdC5pc1N5bWJvbDtcbnZhciBzeW1ib2wgPSB3aXNwX2FzdC5zeW1ib2w7XG52YXIgaXNLZXl3b3JkID0gd2lzcF9hc3QuaXNLZXl3b3JkO1xudmFyIGtleXdvcmQgPSB3aXNwX2FzdC5rZXl3b3JkO1xudmFyIG1ldGEgPSB3aXNwX2FzdC5tZXRhO1xudmFyIHdpdGhNZXRhID0gd2lzcF9hc3Qud2l0aE1ldGE7XG52YXIgbmFtZSA9IHdpc3BfYXN0Lm5hbWU7XG52YXIgZ2Vuc3ltID0gd2lzcF9hc3QuZ2Vuc3ltOztcbnZhciB3aXNwX3N0cmluZyA9IHJlcXVpcmUoXCIuL3N0cmluZ1wiKTtcbnZhciBzcGxpdCA9IHdpc3Bfc3RyaW5nLnNwbGl0O1xudmFyIGpvaW4gPSB3aXNwX3N0cmluZy5qb2luOzs7XG5cbnZhciBwdXNoQmFja1JlYWRlciA9IGZ1bmN0aW9uIHB1c2hCYWNrUmVhZGVyKHNvdXJjZSwgdXJpKSB7XG4gIHJldHVybiB7XG4gICAgXCJsaW5lc1wiOiBzcGxpdChzb3VyY2UsIFwiXFxuXCIpLFxuICAgIFwiYnVmZmVyXCI6IFwiXCIsXG4gICAgXCJ1cmlcIjogdXJpLFxuICAgIFwiY29sdW1uXCI6IC0xLFxuICAgIFwibGluZVwiOiAwXG4gIH07XG59O1xuZXhwb3J0cy5wdXNoQmFja1JlYWRlciA9IHB1c2hCYWNrUmVhZGVyO1xuXG52YXIgcGVla0NoYXIgPSBmdW5jdGlvbiBwZWVrQ2hhcihyZWFkZXIpIHtcbiAgdmFyIGxpbmUgPSAoKHJlYWRlciB8fCAwKVtcImxpbmVzXCJdKVsocmVhZGVyIHx8IDApW1wibGluZVwiXV07XG4gIHZhciBjb2x1bW4gPSBpbmMoKHJlYWRlciB8fCAwKVtcImNvbHVtblwiXSk7XG4gIHJldHVybiBpc05pbChsaW5lKSA/XG4gICAgdm9pZCgwKSA6XG4gICAgKGxpbmVbY29sdW1uXSkgfHwgXCJcXG5cIjtcbn07XG5leHBvcnRzLnBlZWtDaGFyID0gcGVla0NoYXI7XG5cbnZhciByZWFkQ2hhciA9IGZ1bmN0aW9uIHJlYWRDaGFyKHJlYWRlcikge1xuICB2YXIgY2ggPSBwZWVrQ2hhcihyZWFkZXIpO1xuICBpc05ld2xpbmUocGVla0NoYXIocmVhZGVyKSkgP1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIChyZWFkZXIgfHwgMClbXCJsaW5lXCJdID0gaW5jKChyZWFkZXIgfHwgMClbXCJsaW5lXCJdKTtcbiAgICAgIHJldHVybiAocmVhZGVyIHx8IDApW1wiY29sdW1uXCJdID0gLTE7XG4gICAgfSkoKSA6XG4gICAgKHJlYWRlciB8fCAwKVtcImNvbHVtblwiXSA9IGluYygocmVhZGVyIHx8IDApW1wiY29sdW1uXCJdKTtcbiAgcmV0dXJuIGNoO1xufTtcbmV4cG9ydHMucmVhZENoYXIgPSByZWFkQ2hhcjtcblxudmFyIGlzTmV3bGluZSA9IGZ1bmN0aW9uIGlzTmV3bGluZShjaCkge1xuICByZXR1cm4gXCJcXG5cIiA9PT0gY2g7XG59O1xuZXhwb3J0cy5pc05ld2xpbmUgPSBpc05ld2xpbmU7XG5cbnZhciBpc0JyZWFraW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIGlzQnJlYWtpbmdXaGl0ZXNwYWNlKGNoKSB7XG4gIHJldHVybiAoY2ggPT09IFwiIFwiKSB8fCAoY2ggPT09IFwiXFx0XCIpIHx8IChjaCA9PT0gXCJcXG5cIikgfHwgKGNoID09PSBcIlxcclwiKTtcbn07XG5leHBvcnRzLmlzQnJlYWtpbmdXaGl0ZXNwYWNlID0gaXNCcmVha2luZ1doaXRlc3BhY2U7XG5cbnZhciBpc1doaXRlc3BhY2UgPSBmdW5jdGlvbiBpc1doaXRlc3BhY2UoY2gpIHtcbiAgcmV0dXJuIChpc0JyZWFraW5nV2hpdGVzcGFjZShjaCkpIHx8IChcIixcIiA9PT0gY2gpO1xufTtcbmV4cG9ydHMuaXNXaGl0ZXNwYWNlID0gaXNXaGl0ZXNwYWNlO1xuXG52YXIgaXNOdW1lcmljID0gZnVuY3Rpb24gaXNOdW1lcmljKGNoKSB7XG4gIHJldHVybiAoY2ggPT09IFwiMFwiKSB8fCAoY2ggPT09IFwiMVwiKSB8fCAoY2ggPT09IFwiMlwiKSB8fCAoY2ggPT09IFwiM1wiKSB8fCAoY2ggPT09IFwiNFwiKSB8fCAoY2ggPT09IFwiNVwiKSB8fCAoY2ggPT09IFwiNlwiKSB8fCAoY2ggPT09IFwiN1wiKSB8fCAoY2ggPT09IFwiOFwiKSB8fCAoY2ggPT09IFwiOVwiKTtcbn07XG5leHBvcnRzLmlzTnVtZXJpYyA9IGlzTnVtZXJpYztcblxudmFyIGlzQ29tbWVudFByZWZpeCA9IGZ1bmN0aW9uIGlzQ29tbWVudFByZWZpeChjaCkge1xuICByZXR1cm4gXCI7XCIgPT09IGNoO1xufTtcbmV4cG9ydHMuaXNDb21tZW50UHJlZml4ID0gaXNDb21tZW50UHJlZml4O1xuXG52YXIgaXNOdW1iZXJMaXRlcmFsID0gZnVuY3Rpb24gaXNOdW1iZXJMaXRlcmFsKHJlYWRlciwgaW5pdGNoKSB7XG4gIHJldHVybiAoaXNOdW1lcmljKGluaXRjaCkpIHx8ICgoKFwiK1wiID09PSBpbml0Y2gpIHx8IChcIi1cIiA9PT0gaW5pdGNoKSkgJiYgKGlzTnVtZXJpYyhwZWVrQ2hhcihyZWFkZXIpKSkpO1xufTtcbmV4cG9ydHMuaXNOdW1iZXJMaXRlcmFsID0gaXNOdW1iZXJMaXRlcmFsO1xuXG52YXIgcmVhZGVyRXJyb3IgPSBmdW5jdGlvbiByZWFkZXJFcnJvcihyZWFkZXIsIG1lc3NhZ2UpIHtcbiAgdmFyIHRleHQgPSBcIlwiICsgbWVzc2FnZSArIFwiXFxuXCIgKyBcImxpbmU6XCIgKyAoKHJlYWRlciB8fCAwKVtcImxpbmVcIl0pICsgXCJcXG5cIiArIFwiY29sdW1uOlwiICsgKChyZWFkZXIgfHwgMClbXCJjb2x1bW5cIl0pO1xuICB2YXIgZXJyb3IgPSBTeW50YXhFcnJvcih0ZXh0LCAocmVhZGVyIHx8IDApW1widXJpXCJdKTtcbiAgZXJyb3IubGluZSA9IChyZWFkZXIgfHwgMClbXCJsaW5lXCJdO1xuICBlcnJvci5jb2x1bW4gPSAocmVhZGVyIHx8IDApW1wiY29sdW1uXCJdO1xuICBlcnJvci51cmkgPSAocmVhZGVyIHx8IDApW1widXJpXCJdO1xuICByZXR1cm4gKGZ1bmN0aW9uKCkgeyB0aHJvdyBlcnJvcjsgfSkoKTtcbn07XG5leHBvcnRzLnJlYWRlckVycm9yID0gcmVhZGVyRXJyb3I7XG5cbnZhciBpc01hY3JvVGVybWluYXRpbmcgPSBmdW5jdGlvbiBpc01hY3JvVGVybWluYXRpbmcoY2gpIHtcbiAgcmV0dXJuICghKGNoID09PSBcIiNcIikpICYmICghKGNoID09PSBcIidcIikpICYmICghKGNoID09PSBcIjpcIikpICYmIChtYWNyb3MoY2gpKTtcbn07XG5leHBvcnRzLmlzTWFjcm9UZXJtaW5hdGluZyA9IGlzTWFjcm9UZXJtaW5hdGluZztcblxudmFyIHJlYWRUb2tlbiA9IGZ1bmN0aW9uIHJlYWRUb2tlbihyZWFkZXIsIGluaXRjaCkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoYnVmZmVyLCBjaCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IChpc05pbChjaCkpIHx8IChpc1doaXRlc3BhY2UoY2gpKSB8fCAoaXNNYWNyb1Rlcm1pbmF0aW5nKGNoKSkgP1xuICAgICAgYnVmZmVyIDpcbiAgICAgIChidWZmZXIgPSBcIlwiICsgYnVmZmVyICsgKHJlYWRDaGFyKHJlYWRlcikpLCBjaCA9IHBlZWtDaGFyKHJlYWRlciksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShpbml0Y2gsIHBlZWtDaGFyKHJlYWRlcikpO1xufTtcbmV4cG9ydHMucmVhZFRva2VuID0gcmVhZFRva2VuO1xuXG52YXIgc2tpcExpbmUgPSBmdW5jdGlvbiBza2lwTGluZShyZWFkZXIsIF8pIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaCA9IHJlYWRDaGFyKHJlYWRlcik7XG4gICAgICByZXR1cm4gKGNoID09PSBcIlxcblwiKSB8fCAoY2ggPT09IFwiXFxyXCIpIHx8IChpc05pbChjaCkpID9cbiAgICAgICAgcmVhZGVyIDpcbiAgICAgICAgKGxvb3ApO1xuICAgIH0pKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKCk7XG59O1xuZXhwb3J0cy5za2lwTGluZSA9IHNraXBMaW5lO1xuXG52YXIgaW50UGF0dGVybiA9IHJlUGF0dGVybihcIl4oWy0rXT8pKD86KDApfChbMS05XVswLTldKil8MFt4WF0oWzAtOUEtRmEtZl0rKXwwKFswLTddKyl8KFsxLTldWzAtOV0/KVtyUl0oWzAtOUEtWmEtel0rKXwwWzAtOV0rKShOKT8kXCIpO1xuZXhwb3J0cy5pbnRQYXR0ZXJuID0gaW50UGF0dGVybjtcblxudmFyIHJhdGlvUGF0dGVybiA9IHJlUGF0dGVybihcIihbLStdP1swLTldKykvKFswLTldKylcIik7XG5leHBvcnRzLnJhdGlvUGF0dGVybiA9IHJhdGlvUGF0dGVybjtcblxudmFyIGZsb2F0UGF0dGVybiA9IHJlUGF0dGVybihcIihbLStdP1swLTldKyhcXFxcLlswLTldKik/KFtlRV1bLStdP1swLTldKyk/KShNKT9cIik7XG5leHBvcnRzLmZsb2F0UGF0dGVybiA9IGZsb2F0UGF0dGVybjtcblxudmFyIG1hdGNoSW50ID0gZnVuY3Rpb24gbWF0Y2hJbnQocykge1xuICB2YXIgZ3JvdXBzID0gcmVGaW5kKGludFBhdHRlcm4sIHMpO1xuICB2YXIgZ3JvdXAzID0gZ3JvdXBzWzJdO1xuICByZXR1cm4gISgoaXNOaWwoZ3JvdXAzKSkgfHwgKGNvdW50KGdyb3VwMykgPCAxKSkgP1xuICAgIDAgOlxuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBuZWdhdGUgPSBcIi1cIiA9PT0gZ3JvdXBzWzFdID9cbiAgICAgICAgLTEgOlxuICAgICAgICAxO1xuICAgICAgdmFyIGEgPSBncm91cHNbM10gP1xuICAgICAgICBbZ3JvdXBzWzNdLCAxMF0gOlxuICAgICAgZ3JvdXBzWzRdID9cbiAgICAgICAgW2dyb3Vwc1s0XSwgMTZdIDpcbiAgICAgIGdyb3Vwc1s1XSA/XG4gICAgICAgIFtncm91cHNbNV0sIDhdIDpcbiAgICAgIGdyb3Vwc1s3XSA/XG4gICAgICAgIFtncm91cHNbN10sIHBhcnNlSW50KGdyb3Vwc1s3XSldIDpcbiAgICAgIFwiZWxzZVwiID9cbiAgICAgICAgW3ZvaWQoMCksIHZvaWQoMCldIDpcbiAgICAgICAgdm9pZCgwKTtcbiAgICAgIHZhciBuID0gYVswXTtcbiAgICAgIHZhciByYWRpeCA9IGFbMV07XG4gICAgICByZXR1cm4gaXNOaWwobikgP1xuICAgICAgICB2b2lkKDApIDpcbiAgICAgICAgbmVnYXRlICogKHBhcnNlSW50KG4sIHJhZGl4KSk7XG4gICAgfSkoKTtcbn07XG5leHBvcnRzLm1hdGNoSW50ID0gbWF0Y2hJbnQ7XG5cbnZhciBtYXRjaFJhdGlvID0gZnVuY3Rpb24gbWF0Y2hSYXRpbyhzKSB7XG4gIHZhciBncm91cHMgPSByZUZpbmQocmF0aW9QYXR0ZXJuLCBzKTtcbiAgdmFyIG51bWluYXRvciA9IGdyb3Vwc1sxXTtcbiAgdmFyIGRlbm9taW5hdG9yID0gZ3JvdXBzWzJdO1xuICByZXR1cm4gKHBhcnNlSW50KG51bWluYXRvcikpIC8gKHBhcnNlSW50KGRlbm9taW5hdG9yKSk7XG59O1xuZXhwb3J0cy5tYXRjaFJhdGlvID0gbWF0Y2hSYXRpbztcblxudmFyIG1hdGNoRmxvYXQgPSBmdW5jdGlvbiBtYXRjaEZsb2F0KHMpIHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQocyk7XG59O1xuZXhwb3J0cy5tYXRjaEZsb2F0ID0gbWF0Y2hGbG9hdDtcblxudmFyIG1hdGNoTnVtYmVyID0gZnVuY3Rpb24gbWF0Y2hOdW1iZXIocykge1xuICByZXR1cm4gcmVNYXRjaGVzKGludFBhdHRlcm4sIHMpID9cbiAgICBtYXRjaEludChzKSA6XG4gIHJlTWF0Y2hlcyhyYXRpb1BhdHRlcm4sIHMpID9cbiAgICBtYXRjaFJhdGlvKHMpIDpcbiAgcmVNYXRjaGVzKGZsb2F0UGF0dGVybiwgcykgP1xuICAgIG1hdGNoRmxvYXQocykgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5tYXRjaE51bWJlciA9IG1hdGNoTnVtYmVyO1xuXG52YXIgZXNjYXBlQ2hhck1hcCA9IGZ1bmN0aW9uIGVzY2FwZUNoYXJNYXAoYykge1xuICByZXR1cm4gYyA9PT0gXCJ0XCIgP1xuICAgIFwiXFx0XCIgOlxuICBjID09PSBcInJcIiA/XG4gICAgXCJcXHJcIiA6XG4gIGMgPT09IFwiblwiID9cbiAgICBcIlxcblwiIDpcbiAgYyA9PT0gXCJcXFxcXCIgP1xuICAgIFwiXFxcXFwiIDpcbiAgYyA9PT0gXCJcXFwiXCIgP1xuICAgIFwiXFxcIlwiIDpcbiAgYyA9PT0gXCJiXCIgP1xuICAgIFwiXGJcIiA6XG4gIGMgPT09IFwiZlwiID9cbiAgICBcIlxmXCIgOlxuICBcImVsc2VcIiA/XG4gICAgdm9pZCgwKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmVzY2FwZUNoYXJNYXAgPSBlc2NhcGVDaGFyTWFwO1xuXG52YXIgcmVhZDJDaGFycyA9IGZ1bmN0aW9uIHJlYWQyQ2hhcnMocmVhZGVyKSB7XG4gIHJldHVybiBcIlwiICsgKHJlYWRDaGFyKHJlYWRlcikpICsgKHJlYWRDaGFyKHJlYWRlcikpO1xufTtcbmV4cG9ydHMucmVhZDJDaGFycyA9IHJlYWQyQ2hhcnM7XG5cbnZhciByZWFkNENoYXJzID0gZnVuY3Rpb24gcmVhZDRDaGFycyhyZWFkZXIpIHtcbiAgcmV0dXJuIFwiXCIgKyAocmVhZENoYXIocmVhZGVyKSkgKyAocmVhZENoYXIocmVhZGVyKSkgKyAocmVhZENoYXIocmVhZGVyKSkgKyAocmVhZENoYXIocmVhZGVyKSk7XG59O1xuZXhwb3J0cy5yZWFkNENoYXJzID0gcmVhZDRDaGFycztcblxudmFyIHVuaWNvZGUyUGF0dGVybiA9IHJlUGF0dGVybihcIlswLTlBLUZhLWZdezJ9XCIpO1xuZXhwb3J0cy51bmljb2RlMlBhdHRlcm4gPSB1bmljb2RlMlBhdHRlcm47XG5cbnZhciB1bmljb2RlNFBhdHRlcm4gPSByZVBhdHRlcm4oXCJbMC05QS1GYS1mXXs0fVwiKTtcbmV4cG9ydHMudW5pY29kZTRQYXR0ZXJuID0gdW5pY29kZTRQYXR0ZXJuO1xuXG52YXIgdmFsaWRhdGVVbmljb2RlRXNjYXBlID0gZnVuY3Rpb24gdmFsaWRhdGVVbmljb2RlRXNjYXBlKHVuaWNvZGVQYXR0ZXJuLCByZWFkZXIsIGVzY2FwZUNoYXIsIHVuaWNvZGVTdHIpIHtcbiAgcmV0dXJuIHJlTWF0Y2hlcyh1bmljb2RlUGF0dGVybiwgdW5pY29kZVN0cikgP1xuICAgIHVuaWNvZGVTdHIgOlxuICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJcIiArIFwiVW5leHBlY3RlZCB1bmljb2RlIGVzY2FwZSBcIiArIFwiXFxcXFwiICsgZXNjYXBlQ2hhciArIHVuaWNvZGVTdHIpO1xufTtcbmV4cG9ydHMudmFsaWRhdGVVbmljb2RlRXNjYXBlID0gdmFsaWRhdGVVbmljb2RlRXNjYXBlO1xuXG52YXIgbWFrZVVuaWNvZGVDaGFyID0gZnVuY3Rpb24gbWFrZVVuaWNvZGVDaGFyKGNvZGVTdHIsIGJhc2UpIHtcbiAgdmFyIGJhc2UgPSBiYXNlIHx8IDE2O1xuICB2YXIgY29kZSA9IHBhcnNlSW50KGNvZGVTdHIsIGJhc2UpO1xuICByZXR1cm4gY2hhcihjb2RlKTtcbn07XG5leHBvcnRzLm1ha2VVbmljb2RlQ2hhciA9IG1ha2VVbmljb2RlQ2hhcjtcblxudmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbiBlc2NhcGVDaGFyKGJ1ZmZlciwgcmVhZGVyKSB7XG4gIHZhciBjaCA9IHJlYWRDaGFyKHJlYWRlcik7XG4gIHZhciBtYXByZXN1bHQgPSBlc2NhcGVDaGFyTWFwKGNoKTtcbiAgcmV0dXJuIG1hcHJlc3VsdCA/XG4gICAgbWFwcmVzdWx0IDpcbiAgY2ggPT09IFwieFwiID9cbiAgICBtYWtlVW5pY29kZUNoYXIodmFsaWRhdGVVbmljb2RlRXNjYXBlKHVuaWNvZGUyUGF0dGVybiwgcmVhZGVyLCBjaCwgcmVhZDJDaGFycyhyZWFkZXIpKSkgOlxuICBjaCA9PT0gXCJ1XCIgP1xuICAgIG1ha2VVbmljb2RlQ2hhcih2YWxpZGF0ZVVuaWNvZGVFc2NhcGUodW5pY29kZTRQYXR0ZXJuLCByZWFkZXIsIGNoLCByZWFkNENoYXJzKHJlYWRlcikpKSA6XG4gIGlzTnVtZXJpYyhjaCkgP1xuICAgIGNoYXIoY2gpIDpcbiAgXCJlbHNlXCIgP1xuICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJcIiArIFwiVW5leHBlY3RlZCB1bmljb2RlIGVzY2FwZSBcIiArIFwiXFxcXFwiICsgY2gpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuZXNjYXBlQ2hhciA9IGVzY2FwZUNoYXI7XG5cbnZhciByZWFkUGFzdCA9IGZ1bmN0aW9uIHJlYWRQYXN0KHByZWRpY2F0ZSwgcmVhZGVyKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChfKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gcHJlZGljYXRlKHBlZWtDaGFyKHJlYWRlcikpID9cbiAgICAgIChfID0gcmVhZENoYXIocmVhZGVyKSwgbG9vcCkgOlxuICAgICAgcGVla0NoYXIocmVhZGVyKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkodm9pZCgwKSk7XG59O1xuZXhwb3J0cy5yZWFkUGFzdCA9IHJlYWRQYXN0O1xuXG52YXIgcmVhZERlbGltaXRlZExpc3QgPSBmdW5jdGlvbiByZWFkRGVsaW1pdGVkTGlzdChkZWxpbSwgcmVhZGVyLCBpc1JlY3Vyc2l2ZSkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoZm9ybSkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaCA9IHJlYWRQYXN0KGlzV2hpdGVzcGFjZSwgcmVhZGVyKTtcbiAgICAgICEoY2gpID9cbiAgICAgICAgcmVhZGVyRXJyb3IocmVhZGVyLCBcIkVPRlwiKSA6XG4gICAgICAgIHZvaWQoMCk7XG4gICAgICByZXR1cm4gZGVsaW0gPT09IGNoID9cbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlYWRDaGFyKHJlYWRlcik7XG4gICAgICAgICAgcmV0dXJuIGZvcm07XG4gICAgICAgIH0pKCkgOlxuICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG1hY3JvID0gbWFjcm9zKGNoKTtcbiAgICAgICAgICByZXR1cm4gbWFjcm8gP1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gbWFjcm8ocmVhZGVyLCByZWFkQ2hhcihyZWFkZXIpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChmb3JtID0gcmVzdWx0ID09PSByZWFkZXIgP1xuICAgICAgICAgICAgICAgIGZvcm0gOlxuICAgICAgICAgICAgICAgIGNvbmooZm9ybSwgcmVzdWx0KSwgbG9vcCk7XG4gICAgICAgICAgICB9KSgpIDpcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIG8gPSByZWFkKHJlYWRlciwgdHJ1ZSwgdm9pZCgwKSwgaXNSZWN1cnNpdmUpO1xuICAgICAgICAgICAgICByZXR1cm4gKGZvcm0gPSBvID09PSByZWFkZXIgP1xuICAgICAgICAgICAgICAgIGZvcm0gOlxuICAgICAgICAgICAgICAgIGNvbmooZm9ybSwgbyksIGxvb3ApO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfSkoKTtcbiAgICB9KSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShbXSk7XG59O1xuZXhwb3J0cy5yZWFkRGVsaW1pdGVkTGlzdCA9IHJlYWREZWxpbWl0ZWRMaXN0O1xuXG52YXIgbm90SW1wbGVtZW50ZWQgPSBmdW5jdGlvbiBub3RJbXBsZW1lbnRlZChyZWFkZXIsIGNoKSB7XG4gIHJldHVybiByZWFkZXJFcnJvcihyZWFkZXIsIFwiXCIgKyBcIlJlYWRlciBmb3IgXCIgKyBjaCArIFwiIG5vdCBpbXBsZW1lbnRlZCB5ZXRcIik7XG59O1xuZXhwb3J0cy5ub3RJbXBsZW1lbnRlZCA9IG5vdEltcGxlbWVudGVkO1xuXG52YXIgcmVhZERpc3BhdGNoID0gZnVuY3Rpb24gcmVhZERpc3BhdGNoKHJlYWRlciwgXykge1xuICB2YXIgY2ggPSByZWFkQ2hhcihyZWFkZXIpO1xuICB2YXIgZG0gPSBkaXNwYXRjaE1hY3JvcyhjaCk7XG4gIHJldHVybiBkbSA/XG4gICAgZG0ocmVhZGVyLCBfKSA6XG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9iamVjdCA9IG1heWJlUmVhZFRhZ2dlZFR5cGUocmVhZGVyLCBjaCk7XG4gICAgICByZXR1cm4gb2JqZWN0ID9cbiAgICAgICAgb2JqZWN0IDpcbiAgICAgICAgcmVhZGVyRXJyb3IocmVhZGVyLCBcIk5vIGRpc3BhdGNoIG1hY3JvIGZvciBcIiwgY2gpO1xuICAgIH0pKCk7XG59O1xuZXhwb3J0cy5yZWFkRGlzcGF0Y2ggPSByZWFkRGlzcGF0Y2g7XG5cbnZhciByZWFkVW5tYXRjaGVkRGVsaW1pdGVyID0gZnVuY3Rpb24gcmVhZFVubWF0Y2hlZERlbGltaXRlcihyZHIsIGNoKSB7XG4gIHJldHVybiByZWFkZXJFcnJvcihyZHIsIFwiVW5tYWNoZWQgZGVsaW1pdGVyIFwiLCBjaCk7XG59O1xuZXhwb3J0cy5yZWFkVW5tYXRjaGVkRGVsaW1pdGVyID0gcmVhZFVubWF0Y2hlZERlbGltaXRlcjtcblxudmFyIHJlYWRMaXN0ID0gZnVuY3Rpb24gcmVhZExpc3QocmVhZGVyLCBfKSB7XG4gIHZhciBmb3JtID0gcmVhZERlbGltaXRlZExpc3QoXCIpXCIsIHJlYWRlciwgdHJ1ZSk7XG4gIHJldHVybiB3aXRoTWV0YShsaXN0LmFwcGx5KGxpc3QsIGZvcm0pLCBtZXRhKGZvcm0pKTtcbn07XG5leHBvcnRzLnJlYWRMaXN0ID0gcmVhZExpc3Q7XG5cbnZhciByZWFkQ29tbWVudCA9IGZ1bmN0aW9uIHJlYWRDb21tZW50KHJlYWRlciwgXykge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoYnVmZmVyLCBjaCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IChpc05pbChjaCkpIHx8IChcIlxcblwiID09PSBjaCkgP1xuICAgICAgcmVhZGVyIHx8IChsaXN0KHN5bWJvbCh2b2lkKDApLCBcImNvbW1lbnRcIiksIGJ1ZmZlcikpIDpcbiAgICAoXCJcXFxcXCIgPT09IGNoKSA/XG4gICAgICAoYnVmZmVyID0gXCJcIiArIGJ1ZmZlciArIChlc2NhcGVDaGFyKGJ1ZmZlciwgcmVhZGVyKSksIGNoID0gcmVhZENoYXIocmVhZGVyKSwgbG9vcCkgOlxuICAgIFwiZWxzZVwiID9cbiAgICAgIChidWZmZXIgPSBcIlwiICsgYnVmZmVyICsgY2gsIGNoID0gcmVhZENoYXIocmVhZGVyKSwgbG9vcCkgOlxuICAgICAgdm9pZCgwKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoXCJcIiwgcmVhZENoYXIocmVhZGVyKSk7XG59O1xuZXhwb3J0cy5yZWFkQ29tbWVudCA9IHJlYWRDb21tZW50O1xuXG52YXIgcmVhZFZlY3RvciA9IGZ1bmN0aW9uIHJlYWRWZWN0b3IocmVhZGVyKSB7XG4gIHJldHVybiByZWFkRGVsaW1pdGVkTGlzdChcIl1cIiwgcmVhZGVyLCB0cnVlKTtcbn07XG5leHBvcnRzLnJlYWRWZWN0b3IgPSByZWFkVmVjdG9yO1xuXG52YXIgcmVhZE1hcCA9IGZ1bmN0aW9uIHJlYWRNYXAocmVhZGVyKSB7XG4gIHZhciBmb3JtID0gcmVhZERlbGltaXRlZExpc3QoXCJ9XCIsIHJlYWRlciwgdHJ1ZSk7XG4gIHJldHVybiBpc09kZChjb3VudChmb3JtKSkgP1xuICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJNYXAgbGl0ZXJhbCBtdXN0IGNvbnRhaW4gYW4gZXZlbiBudW1iZXIgb2YgZm9ybXNcIikgOlxuICAgIHdpdGhNZXRhKGRpY3Rpb25hcnkuYXBwbHkoZGljdGlvbmFyeSwgZm9ybSksIG1ldGEoZm9ybSkpO1xufTtcbmV4cG9ydHMucmVhZE1hcCA9IHJlYWRNYXA7XG5cbnZhciByZWFkU2V0ID0gZnVuY3Rpb24gcmVhZFNldChyZWFkZXIsIF8pIHtcbiAgdmFyIGZvcm0gPSByZWFkRGVsaW1pdGVkTGlzdChcIn1cIiwgcmVhZGVyLCB0cnVlKTtcbiAgcmV0dXJuIHdpdGhNZXRhKGNvbmNhdChbc3ltYm9sKHZvaWQoMCksIFwic2V0XCIpXSwgZm9ybSksIG1ldGEoZm9ybSkpO1xufTtcbmV4cG9ydHMucmVhZFNldCA9IHJlYWRTZXQ7XG5cbnZhciByZWFkTnVtYmVyID0gZnVuY3Rpb24gcmVhZE51bWJlcihyZWFkZXIsIGluaXRjaCkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoYnVmZmVyLCBjaCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IChpc05pbChjaCkpIHx8IChpc1doaXRlc3BhY2UoY2gpKSB8fCAobWFjcm9zKGNoKSkgP1xuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBtYXRjaE51bWJlcihidWZmZXIpO1xuICAgICAgICByZXR1cm4gaXNOaWwobWF0Y2gpID9cbiAgICAgICAgICByZWFkZXJFcnJvcihyZWFkZXIsIFwiSW52YWxpZCBudW1iZXIgZm9ybWF0IFtcIiwgYnVmZmVyLCBcIl1cIikgOlxuICAgICAgICAgIG1hdGNoO1xuICAgICAgfSkoKSA6XG4gICAgICAoYnVmZmVyID0gXCJcIiArIGJ1ZmZlciArIChyZWFkQ2hhcihyZWFkZXIpKSwgY2ggPSBwZWVrQ2hhcihyZWFkZXIpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoaW5pdGNoLCBwZWVrQ2hhcihyZWFkZXIpKTtcbn07XG5leHBvcnRzLnJlYWROdW1iZXIgPSByZWFkTnVtYmVyO1xuXG52YXIgcmVhZFN0cmluZyA9IGZ1bmN0aW9uIHJlYWRTdHJpbmcocmVhZGVyKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChidWZmZXIsIGNoKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNOaWwoY2gpID9cbiAgICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJFT0Ygd2hpbGUgcmVhZGluZyBzdHJpbmdcIikgOlxuICAgIFwiXFxcXFwiID09PSBjaCA/XG4gICAgICAoYnVmZmVyID0gXCJcIiArIGJ1ZmZlciArIChlc2NhcGVDaGFyKGJ1ZmZlciwgcmVhZGVyKSksIGNoID0gcmVhZENoYXIocmVhZGVyKSwgbG9vcCkgOlxuICAgIFwiXFxcIlwiID09PSBjaCA/XG4gICAgICBidWZmZXIgOlxuICAgIFwiZGVmYXVsdFwiID9cbiAgICAgIChidWZmZXIgPSBcIlwiICsgYnVmZmVyICsgY2gsIGNoID0gcmVhZENoYXIocmVhZGVyKSwgbG9vcCkgOlxuICAgICAgdm9pZCgwKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoXCJcIiwgcmVhZENoYXIocmVhZGVyKSk7XG59O1xuZXhwb3J0cy5yZWFkU3RyaW5nID0gcmVhZFN0cmluZztcblxudmFyIHJlYWRVbnF1b3RlID0gZnVuY3Rpb24gcmVhZFVucXVvdGUocmVhZGVyKSB7XG4gIHZhciBjaCA9IHBlZWtDaGFyKHJlYWRlcik7XG4gIHJldHVybiAhKGNoKSA/XG4gICAgcmVhZGVyRXJyb3IocmVhZGVyLCBcIkVPRiB3aGlsZSByZWFkaW5nIGNoYXJhY3RlclwiKSA6XG4gIGNoID09PSBcIkBcIiA/XG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgcmVhZENoYXIocmVhZGVyKTtcbiAgICAgIHJldHVybiBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInVucXVvdGUtc3BsaWNpbmdcIiksIHJlYWQocmVhZGVyLCB0cnVlLCB2b2lkKDApLCB0cnVlKSk7XG4gICAgfSkoKSA6XG4gICAgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJ1bnF1b3RlXCIpLCByZWFkKHJlYWRlciwgdHJ1ZSwgdm9pZCgwKSwgdHJ1ZSkpO1xufTtcbmV4cG9ydHMucmVhZFVucXVvdGUgPSByZWFkVW5xdW90ZTtcblxudmFyIHNwZWNpYWxTeW1ib2xzID0gZnVuY3Rpb24gc3BlY2lhbFN5bWJvbHModGV4dCwgbm90Rm91bmQpIHtcbiAgcmV0dXJuIHRleHQgPT09IFwibmlsXCIgP1xuICAgIHZvaWQoMCkgOlxuICB0ZXh0ID09PSBcInRydWVcIiA/XG4gICAgdHJ1ZSA6XG4gIHRleHQgPT09IFwiZmFsc2VcIiA/XG4gICAgZmFsc2UgOlxuICBcImVsc2VcIiA/XG4gICAgbm90Rm91bmQgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5zcGVjaWFsU3ltYm9scyA9IHNwZWNpYWxTeW1ib2xzO1xuXG52YXIgcmVhZFN5bWJvbCA9IGZ1bmN0aW9uIHJlYWRTeW1ib2wocmVhZGVyLCBpbml0Y2gpIHtcbiAgdmFyIHRva2VuID0gcmVhZFRva2VuKHJlYWRlciwgaW5pdGNoKTtcbiAgdmFyIHBhcnRzID0gc3BsaXQodG9rZW4sIFwiL1wiKTtcbiAgdmFyIGhhc05zID0gKGNvdW50KHBhcnRzKSA+IDEpICYmIChjb3VudCh0b2tlbikgPiAxKTtcbiAgdmFyIG5zID0gZmlyc3QocGFydHMpO1xuICB2YXIgbmFtZSA9IGpvaW4oXCIvXCIsIHJlc3QocGFydHMpKTtcbiAgcmV0dXJuIGhhc05zID9cbiAgICBzeW1ib2wobnMsIG5hbWUpIDpcbiAgICBzcGVjaWFsU3ltYm9scyh0b2tlbiwgc3ltYm9sKHRva2VuKSk7XG59O1xuZXhwb3J0cy5yZWFkU3ltYm9sID0gcmVhZFN5bWJvbDtcblxudmFyIHJlYWRLZXl3b3JkID0gZnVuY3Rpb24gcmVhZEtleXdvcmQocmVhZGVyLCBpbml0Y2gpIHtcbiAgdmFyIHRva2VuID0gcmVhZFRva2VuKHJlYWRlciwgcmVhZENoYXIocmVhZGVyKSk7XG4gIHZhciBwYXJ0cyA9IHNwbGl0KHRva2VuLCBcIi9cIik7XG4gIHZhciBuYW1lID0gbGFzdChwYXJ0cyk7XG4gIHZhciBucyA9IGNvdW50KHBhcnRzKSA+IDEgP1xuICAgIGpvaW4oXCIvXCIsIGJ1dGxhc3QocGFydHMpKSA6XG4gICAgdm9pZCgwKTtcbiAgdmFyIGlzc3VlID0gbGFzdChucykgPT09IFwiOlwiID9cbiAgICBcIm5hbWVzcGFjZSBjYW4ndCBlbmRzIHdpdGggXFxcIjpcXFwiXCIgOlxuICBsYXN0KG5hbWUpID09PSBcIjpcIiA/XG4gICAgXCJuYW1lIGNhbid0IGVuZCB3aXRoIFxcXCI6XFxcIlwiIDpcbiAgbGFzdChuYW1lKSA9PT0gXCIvXCIgP1xuICAgIFwibmFtZSBjYW4ndCBlbmQgd2l0aCBcXFwiL1xcXCJcIiA6XG4gIGNvdW50KHNwbGl0KHRva2VuLCBcIjo6XCIpKSA+IDEgP1xuICAgIFwibmFtZSBjYW4ndCBjb250YWluIFxcXCI6OlxcXCJcIiA6XG4gICAgdm9pZCgwKTtcbiAgcmV0dXJuIGlzc3VlID9cbiAgICByZWFkZXJFcnJvcihyZWFkZXIsIFwiSW52YWxpZCB0b2tlbiAoXCIsIGlzc3VlLCBcIik6IFwiLCB0b2tlbikgOlxuICAoIShucykpICYmIChmaXJzdChuYW1lKSA9PT0gXCI6XCIpID9cbiAgICBrZXl3b3JkKHJlc3QobmFtZSkpIDpcbiAgICBrZXl3b3JkKG5zLCBuYW1lKTtcbn07XG5leHBvcnRzLnJlYWRLZXl3b3JkID0gcmVhZEtleXdvcmQ7XG5cbnZhciBkZXN1Z2FyTWV0YSA9IGZ1bmN0aW9uIGRlc3VnYXJNZXRhKGYpIHtcbiAgcmV0dXJuIGlzS2V5d29yZChmKSA/XG4gICAgZGljdGlvbmFyeShuYW1lKGYpLCB0cnVlKSA6XG4gIGlzU3ltYm9sKGYpID9cbiAgICB7XG4gICAgICBcInRhZ1wiOiBmXG4gICAgfSA6XG4gIGlzU3RyaW5nKGYpID9cbiAgICB7XG4gICAgICBcInRhZ1wiOiBmXG4gICAgfSA6XG4gIFwiZWxzZVwiID9cbiAgICBmIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuZGVzdWdhck1ldGEgPSBkZXN1Z2FyTWV0YTtcblxudmFyIHdyYXBwaW5nUmVhZGVyID0gZnVuY3Rpb24gd3JhcHBpbmdSZWFkZXIocHJlZml4KSB7XG4gIHJldHVybiBmdW5jdGlvbihyZWFkZXIpIHtcbiAgICByZXR1cm4gbGlzdChwcmVmaXgsIHJlYWQocmVhZGVyLCB0cnVlLCB2b2lkKDApLCB0cnVlKSk7XG4gIH07XG59O1xuZXhwb3J0cy53cmFwcGluZ1JlYWRlciA9IHdyYXBwaW5nUmVhZGVyO1xuXG52YXIgdGhyb3dpbmdSZWFkZXIgPSBmdW5jdGlvbiB0aHJvd2luZ1JlYWRlcihtc2cpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHJlYWRlcikge1xuICAgIHJldHVybiByZWFkZXJFcnJvcihyZWFkZXIsIG1zZyk7XG4gIH07XG59O1xuZXhwb3J0cy50aHJvd2luZ1JlYWRlciA9IHRocm93aW5nUmVhZGVyO1xuXG52YXIgcmVhZE1ldGEgPSBmdW5jdGlvbiByZWFkTWV0YShyZWFkZXIsIF8pIHtcbiAgdmFyIG1ldGFkYXRhID0gZGVzdWdhck1ldGEocmVhZChyZWFkZXIsIHRydWUsIHZvaWQoMCksIHRydWUpKTtcbiAgIShpc0RpY3Rpb25hcnkobWV0YWRhdGEpKSA/XG4gICAgcmVhZGVyRXJyb3IocmVhZGVyLCBcIk1ldGFkYXRhIG11c3QgYmUgU3ltYm9sLCBLZXl3b3JkLCBTdHJpbmcgb3IgTWFwXCIpIDpcbiAgICB2b2lkKDApO1xuICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBmb3JtID0gcmVhZChyZWFkZXIsIHRydWUsIHZvaWQoMCksIHRydWUpO1xuICAgIHJldHVybiBpc09iamVjdChmb3JtKSA/XG4gICAgICB3aXRoTWV0YShmb3JtLCBjb25qKG1ldGFkYXRhLCBtZXRhKGZvcm0pKSkgOlxuICAgICAgZm9ybTtcbiAgfSkoKTtcbn07XG5leHBvcnRzLnJlYWRNZXRhID0gcmVhZE1ldGE7XG5cbnZhciByZWFkUmVnZXggPSBmdW5jdGlvbiByZWFkUmVnZXgocmVhZGVyKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChidWZmZXIsIGNoKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNOaWwoY2gpID9cbiAgICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJFT0Ygd2hpbGUgcmVhZGluZyBzdHJpbmdcIikgOlxuICAgIFwiXFxcXFwiID09PSBjaCA/XG4gICAgICAoYnVmZmVyID0gXCJcIiArIGJ1ZmZlciArIGNoICsgKHJlYWRDaGFyKHJlYWRlcikpLCBjaCA9IHJlYWRDaGFyKHJlYWRlciksIGxvb3ApIDpcbiAgICBcIlxcXCJcIiA9PT0gY2ggP1xuICAgICAgcmVQYXR0ZXJuKGJ1ZmZlcikgOlxuICAgIFwiZGVmYXVsdFwiID9cbiAgICAgIChidWZmZXIgPSBcIlwiICsgYnVmZmVyICsgY2gsIGNoID0gcmVhZENoYXIocmVhZGVyKSwgbG9vcCkgOlxuICAgICAgdm9pZCgwKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoXCJcIiwgcmVhZENoYXIocmVhZGVyKSk7XG59O1xuZXhwb3J0cy5yZWFkUmVnZXggPSByZWFkUmVnZXg7XG5cbnZhciByZWFkUGFyYW0gPSBmdW5jdGlvbiByZWFkUGFyYW0ocmVhZGVyLCBpbml0Y2gpIHtcbiAgdmFyIGZvcm0gPSByZWFkU3ltYm9sKHJlYWRlciwgaW5pdGNoKTtcbiAgcmV0dXJuIGlzRXF1YWwoZm9ybSwgc3ltYm9sKFwiJVwiKSkgP1xuICAgIHN5bWJvbChcIiUxXCIpIDpcbiAgICBmb3JtO1xufTtcbmV4cG9ydHMucmVhZFBhcmFtID0gcmVhZFBhcmFtO1xuXG52YXIgaXNQYXJhbSA9IGZ1bmN0aW9uIGlzUGFyYW0oZm9ybSkge1xuICByZXR1cm4gKGlzU3ltYm9sKGZvcm0pKSAmJiAoXCIlXCIgPT09IGZpcnN0KG5hbWUoZm9ybSkpKTtcbn07XG5leHBvcnRzLmlzUGFyYW0gPSBpc1BhcmFtO1xuXG52YXIgbGFtYmRhUGFyYW1zSGFzaCA9IGZ1bmN0aW9uIGxhbWJkYVBhcmFtc0hhc2goZm9ybSkge1xuICByZXR1cm4gaXNQYXJhbShmb3JtKSA/XG4gICAgZGljdGlvbmFyeShmb3JtLCBmb3JtKSA6XG4gIChpc0RpY3Rpb25hcnkoZm9ybSkpIHx8IChpc1ZlY3Rvcihmb3JtKSkgfHwgKGlzTGlzdChmb3JtKSkgP1xuICAgIGNvbmouYXBwbHkoY29uaiwgbWFwKGxhbWJkYVBhcmFtc0hhc2gsIHZlYyhmb3JtKSkpIDpcbiAgXCJlbHNlXCIgP1xuICAgIHt9IDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMubGFtYmRhUGFyYW1zSGFzaCA9IGxhbWJkYVBhcmFtc0hhc2g7XG5cbnZhciBsYW1iZGFQYXJhbXMgPSBmdW5jdGlvbiBsYW1iZGFQYXJhbXMoYm9keSkge1xuICB2YXIgbmFtZXMgPSBzb3J0KHZhbHMobGFtYmRhUGFyYW1zSGFzaChib2R5KSkpO1xuICB2YXIgdmFyaWFkaWMgPSBpc0VxdWFsKGZpcnN0KG5hbWVzKSwgc3ltYm9sKFwiJSZcIikpO1xuICB2YXIgbiA9IHZhcmlhZGljICYmIChjb3VudChuYW1lcykgPT09IDEpID9cbiAgICAwIDpcbiAgICBwYXJzZUludChyZXN0KG5hbWUobGFzdChuYW1lcykpKSk7XG4gIHZhciBwYXJhbXMgPSAoZnVuY3Rpb24gbG9vcChuYW1lcywgaSkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGkgPD0gbiA/XG4gICAgICAobmFtZXMgPSBjb25qKG5hbWVzLCBzeW1ib2woXCJcIiArIFwiJVwiICsgaSkpLCBpID0gaW5jKGkpLCBsb29wKSA6XG4gICAgICBuYW1lcztcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoW10sIDEpO1xuICByZXR1cm4gdmFyaWFkaWMgP1xuICAgIGNvbmoocGFyYW1zLCBzeW1ib2wodm9pZCgwKSwgXCImXCIpLCBzeW1ib2wodm9pZCgwKSwgXCIlJlwiKSkgOlxuICAgIG5hbWVzO1xufTtcbmV4cG9ydHMubGFtYmRhUGFyYW1zID0gbGFtYmRhUGFyYW1zO1xuXG52YXIgcmVhZExhbWJkYSA9IGZ1bmN0aW9uIHJlYWRMYW1iZGEocmVhZGVyKSB7XG4gIHZhciBib2R5ID0gcmVhZExpc3QocmVhZGVyKTtcbiAgcmV0dXJuIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZm5cIiksIGxhbWJkYVBhcmFtcyhib2R5KSwgYm9keSk7XG59O1xuZXhwb3J0cy5yZWFkTGFtYmRhID0gcmVhZExhbWJkYTtcblxudmFyIHJlYWREaXNjYXJkID0gZnVuY3Rpb24gcmVhZERpc2NhcmQocmVhZGVyLCBfKSB7XG4gIHJlYWQocmVhZGVyLCB0cnVlLCB2b2lkKDApLCB0cnVlKTtcbiAgcmV0dXJuIHJlYWRlcjtcbn07XG5leHBvcnRzLnJlYWREaXNjYXJkID0gcmVhZERpc2NhcmQ7XG5cbnZhciBtYWNyb3MgPSBmdW5jdGlvbiBtYWNyb3MoYykge1xuICByZXR1cm4gYyA9PT0gXCJcXFwiXCIgP1xuICAgIHJlYWRTdHJpbmcgOlxuICBjID09PSBcIjpcIiA/XG4gICAgcmVhZEtleXdvcmQgOlxuICBjID09PSBcIjtcIiA/XG4gICAgcmVhZENvbW1lbnQgOlxuICBjID09PSBcIidcIiA/XG4gICAgd3JhcHBpbmdSZWFkZXIoc3ltYm9sKHZvaWQoMCksIFwicXVvdGVcIikpIDpcbiAgYyA9PT0gXCJAXCIgP1xuICAgIHdyYXBwaW5nUmVhZGVyKHN5bWJvbCh2b2lkKDApLCBcImRlcmVmXCIpKSA6XG4gIGMgPT09IFwiXlwiID9cbiAgICByZWFkTWV0YSA6XG4gIGMgPT09IFwiYFwiID9cbiAgICB3cmFwcGluZ1JlYWRlcihzeW1ib2wodm9pZCgwKSwgXCJzeW50YXgtcXVvdGVcIikpIDpcbiAgYyA9PT0gXCJ+XCIgP1xuICAgIHJlYWRVbnF1b3RlIDpcbiAgYyA9PT0gXCIoXCIgP1xuICAgIHJlYWRMaXN0IDpcbiAgYyA9PT0gXCIpXCIgP1xuICAgIHJlYWRVbm1hdGNoZWREZWxpbWl0ZXIgOlxuICBjID09PSBcIltcIiA/XG4gICAgcmVhZFZlY3RvciA6XG4gIGMgPT09IFwiXVwiID9cbiAgICByZWFkVW5tYXRjaGVkRGVsaW1pdGVyIDpcbiAgYyA9PT0gXCJ7XCIgP1xuICAgIHJlYWRNYXAgOlxuICBjID09PSBcIn1cIiA/XG4gICAgcmVhZFVubWF0Y2hlZERlbGltaXRlciA6XG4gIGMgPT09IFwiXFxcXFwiID9cbiAgICByZWFkQ2hhciA6XG4gIGMgPT09IFwiJVwiID9cbiAgICByZWFkUGFyYW0gOlxuICBjID09PSBcIiNcIiA/XG4gICAgcmVhZERpc3BhdGNoIDpcbiAgXCJlbHNlXCIgP1xuICAgIHZvaWQoMCkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5tYWNyb3MgPSBtYWNyb3M7XG5cbnZhciBkaXNwYXRjaE1hY3JvcyA9IGZ1bmN0aW9uIGRpc3BhdGNoTWFjcm9zKHMpIHtcbiAgcmV0dXJuIHMgPT09IFwie1wiID9cbiAgICByZWFkU2V0IDpcbiAgcyA9PT0gXCIoXCIgP1xuICAgIHJlYWRMYW1iZGEgOlxuICBzID09PSBcIjxcIiA/XG4gICAgdGhyb3dpbmdSZWFkZXIoXCJVbnJlYWRhYmxlIGZvcm1cIikgOlxuICBzID09PSBcIlxcXCJcIiA/XG4gICAgcmVhZFJlZ2V4IDpcbiAgcyA9PT0gXCIhXCIgP1xuICAgIHJlYWRDb21tZW50IDpcbiAgcyA9PT0gXCJfXCIgP1xuICAgIHJlYWREaXNjYXJkIDpcbiAgXCJlbHNlXCIgP1xuICAgIHZvaWQoMCkgOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5kaXNwYXRjaE1hY3JvcyA9IGRpc3BhdGNoTWFjcm9zO1xuXG52YXIgcmVhZEZvcm0gPSBmdW5jdGlvbiByZWFkRm9ybShyZWFkZXIsIGNoKSB7XG4gIHZhciBzdGFydCA9IHtcbiAgICBcImxpbmVcIjogKHJlYWRlciB8fCAwKVtcImxpbmVcIl0sXG4gICAgXCJjb2x1bW5cIjogKHJlYWRlciB8fCAwKVtcImNvbHVtblwiXVxuICB9O1xuICB2YXIgcmVhZE1hY3JvID0gbWFjcm9zKGNoKTtcbiAgdmFyIGZvcm0gPSByZWFkTWFjcm8gP1xuICAgIHJlYWRNYWNybyhyZWFkZXIsIGNoKSA6XG4gIGlzTnVtYmVyTGl0ZXJhbChyZWFkZXIsIGNoKSA/XG4gICAgcmVhZE51bWJlcihyZWFkZXIsIGNoKSA6XG4gIFwiZWxzZVwiID9cbiAgICByZWFkU3ltYm9sKHJlYWRlciwgY2gpIDpcbiAgICB2b2lkKDApO1xuICByZXR1cm4gZm9ybSA9PT0gcmVhZGVyID9cbiAgICBmb3JtIDpcbiAgISgoaXNTdHJpbmcoZm9ybSkpIHx8IChpc051bWJlcihmb3JtKSkgfHwgKGlzQm9vbGVhbihmb3JtKSkgfHwgKGlzTmlsKGZvcm0pKSB8fCAoaXNLZXl3b3JkKGZvcm0pKSkgP1xuICAgIHdpdGhNZXRhKGZvcm0sIGNvbmooe1xuICAgICAgXCJzdGFydFwiOiBzdGFydCxcbiAgICAgIFwiZW5kXCI6IHtcbiAgICAgICAgXCJsaW5lXCI6IChyZWFkZXIgfHwgMClbXCJsaW5lXCJdLFxuICAgICAgICBcImNvbHVtblwiOiAocmVhZGVyIHx8IDApW1wiY29sdW1uXCJdXG4gICAgICB9XG4gICAgfSwgbWV0YShmb3JtKSkpIDpcbiAgXCJlbHNlXCIgP1xuICAgIGZvcm0gOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5yZWFkRm9ybSA9IHJlYWRGb3JtO1xuXG52YXIgcmVhZCA9IGZ1bmN0aW9uIHJlYWQocmVhZGVyLCBlb2ZJc0Vycm9yLCBzZW50aW5lbCwgaXNSZWN1cnNpdmUpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKCkge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaCA9IHJlYWRDaGFyKHJlYWRlcik7XG4gICAgICB2YXIgZm9ybSA9IGlzTmlsKGNoKSA/XG4gICAgICAgIGVvZklzRXJyb3IgP1xuICAgICAgICAgIHJlYWRlckVycm9yKHJlYWRlciwgXCJFT0ZcIikgOlxuICAgICAgICAgIHNlbnRpbmVsIDpcbiAgICAgIGlzV2hpdGVzcGFjZShjaCkgP1xuICAgICAgICByZWFkZXIgOlxuICAgICAgaXNDb21tZW50UHJlZml4KGNoKSA/XG4gICAgICAgIHJlYWQocmVhZENvbW1lbnQocmVhZGVyLCBjaCksIGVvZklzRXJyb3IsIHNlbnRpbmVsLCBpc1JlY3Vyc2l2ZSkgOlxuICAgICAgXCJlbHNlXCIgP1xuICAgICAgICByZWFkRm9ybShyZWFkZXIsIGNoKSA6XG4gICAgICAgIHZvaWQoMCk7XG4gICAgICByZXR1cm4gZm9ybSA9PT0gcmVhZGVyID9cbiAgICAgICAgKGxvb3ApIDpcbiAgICAgICAgZm9ybTtcbiAgICB9KSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KSgpO1xufTtcbmV4cG9ydHMucmVhZCA9IHJlYWQ7XG5cbnZhciByZWFkXyA9IGZ1bmN0aW9uIHJlYWRfKHNvdXJjZSwgdXJpKSB7XG4gIHZhciByZWFkZXIgPSBwdXNoQmFja1JlYWRlcihzb3VyY2UsIHVyaSk7XG4gIHZhciBlb2YgPSBnZW5zeW0oKTtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKGZvcm1zLCBmb3JtKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gZm9ybSA9PT0gZW9mID9cbiAgICAgIGZvcm1zIDpcbiAgICAgIChmb3JtcyA9IGNvbmooZm9ybXMsIGZvcm0pLCBmb3JtID0gcmVhZChyZWFkZXIsIGZhbHNlLCBlb2YsIGZhbHNlKSwgbG9vcCk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFtdLCByZWFkKHJlYWRlciwgZmFsc2UsIGVvZiwgZmFsc2UpKTtcbn07XG5leHBvcnRzLnJlYWRfID0gcmVhZF87XG5cbnZhciByZWFkRnJvbVN0cmluZyA9IGZ1bmN0aW9uIHJlYWRGcm9tU3RyaW5nKHNvdXJjZSwgdXJpKSB7XG4gIHZhciByZWFkZXIgPSBwdXNoQmFja1JlYWRlcihzb3VyY2UsIHVyaSk7XG4gIHJldHVybiByZWFkKHJlYWRlciwgdHJ1ZSwgdm9pZCgwKSwgZmFsc2UpO1xufTtcbmV4cG9ydHMucmVhZEZyb21TdHJpbmcgPSByZWFkRnJvbVN0cmluZztcblxudmFyIHJlYWRVdWlkID0gZnVuY3Rpb24gcmVhZFV1aWQodXVpZCkge1xuICByZXR1cm4gaXNTdHJpbmcodXVpZCkgP1xuICAgIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiVVVJRC5cIiksIHV1aWQpIDpcbiAgICByZWFkZXJFcnJvcih2b2lkKDApLCBcIlVVSUQgbGl0ZXJhbCBleHBlY3RzIGEgc3RyaW5nIGFzIGl0cyByZXByZXNlbnRhdGlvbi5cIik7XG59O1xuXG52YXIgcmVhZFF1ZXVlID0gZnVuY3Rpb24gcmVhZFF1ZXVlKGl0ZW1zKSB7XG4gIHJldHVybiBpc1ZlY3RvcihpdGVtcykgP1xuICAgIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiUGVyc2lzdGVudFF1ZXVlLlwiKSwgaXRlbXMpIDpcbiAgICByZWFkZXJFcnJvcih2b2lkKDApLCBcIlF1ZXVlIGxpdGVyYWwgZXhwZWN0cyBhIHZlY3RvciBmb3IgaXRzIGVsZW1lbnRzLlwiKTtcbn07XG5cbnZhciBfX3RhZ1RhYmxlX18gPSBkaWN0aW9uYXJ5KFwidXVpZFwiLCByZWFkVXVpZCwgXCJxdWV1ZVwiLCByZWFkUXVldWUpO1xuZXhwb3J0cy5fX3RhZ1RhYmxlX18gPSBfX3RhZ1RhYmxlX187XG5cbnZhciBtYXliZVJlYWRUYWdnZWRUeXBlID0gZnVuY3Rpb24gbWF5YmVSZWFkVGFnZ2VkVHlwZShyZWFkZXIsIGluaXRjaCkge1xuICB2YXIgdGFnID0gcmVhZFN5bWJvbChyZWFkZXIsIGluaXRjaCk7XG4gIHZhciBwZm4gPSAoX190YWdUYWJsZV9fIHx8IDApW25hbWUodGFnKV07XG4gIHJldHVybiBwZm4gP1xuICAgIHBmbihyZWFkKHJlYWRlciwgdHJ1ZSwgdm9pZCgwKSwgZmFsc2UpKSA6XG4gICAgcmVhZGVyRXJyb3IocmVhZGVyLCBcIlwiICsgXCJDb3VsZCBub3QgZmluZCB0YWcgcGFyc2VyIGZvciBcIiArIChuYW1lKHRhZykpICsgXCIgaW4gXCIgKyAoXCJcIiArIChrZXlzKF9fdGFnVGFibGVfXykpKSk7XG59O1xuZXhwb3J0cy5tYXliZVJlYWRUYWdnZWRUeXBlID0gbWF5YmVSZWFkVGFnZ2VkVHlwZSIsInZhciBfbnNfID0ge1xuICBcImlkXCI6IFwidHJ5LXdpc3AubWFpblwiXG59O1xudmFyIGFjdGl2aW5lID0gcmVxdWlyZShcImNvZGVtaXJyb3ItYWN0aXZpbmVcIik7O1xudmFyIHBlcnNpc3QgPSByZXF1aXJlKFwiY29kZW1pcnJvci1wZXJzaXN0XCIpOztcbnZhciB3aXNwX2VuZ2luZV9icm93c2VyID0gcmVxdWlyZShcIndpc3AvZW5naW5lL2Jyb3dzZXJcIik7O1xudmFyIHdpc3Bfc2VxdWVuY2UgPSByZXF1aXJlKFwid2lzcC9zZXF1ZW5jZVwiKTtcbnZhciByZXN0ID0gd2lzcF9zZXF1ZW5jZS5yZXN0O1xudmFyIGNvbnMgPSB3aXNwX3NlcXVlbmNlLmNvbnM7XG52YXIgdmVjID0gd2lzcF9zZXF1ZW5jZS52ZWM7O1xudmFyIHdpc3BfcnVudGltZSA9IHJlcXVpcmUoXCJ3aXNwL3J1bnRpbWVcIik7XG52YXIgc3RyID0gd2lzcF9ydW50aW1lLnN0cjs7XG52YXIgd2lzcF9yZWFkZXIgPSByZXF1aXJlKFwid2lzcC9yZWFkZXJcIik7XG52YXIgcmVhZF8gPSB3aXNwX3JlYWRlci5yZWFkXzs7XG52YXIgd2lzcF9jb21waWxlciA9IHJlcXVpcmUoXCJ3aXNwL2NvbXBpbGVyXCIpO1xudmFyIGNvbXBpbGVfID0gd2lzcF9jb21waWxlci5jb21waWxlXzs7O1xuXG5wZXJzaXN0KENvZGVNaXJyb3IpO1xuXG52YXIgdGhyb3R0bGUgPSBmdW5jdGlvbiB0aHJvdHRsZShsYW1iZGEsIG1zKSB7XG4gIHZhciBpZCA9IDA7XG4gIHJldHVybiBmdW5jdGlvbiB0aHJvdHRsZWQoKSB7XG4gICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgY2xlYXJUaW1lb3V0KGlkLCB0aHJvdHRsZWQpO1xuICAgIHJldHVybiBpZCA9IHNldFRpbWVvdXQuYXBwbHkod2luZG93LCB2ZWMoY29ucyhsYW1iZGEsIGNvbnMobXMsIHBhcmFtcykpKSk7XG4gIH07XG59O1xuZXhwb3J0cy50aHJvdHRsZSA9IHRocm90dGxlO1xuXG52YXIgdG9vZ2xlUHJldmlldyA9IGZ1bmN0aW9uIHRvb2dsZVByZXZpZXcoKSB7XG4gIHZhciBvdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKTtcbiAgdmFyIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dFwiKTtcbiAgb3V0cHV0LmhpZGRlbiA9ICEob3V0cHV0LmhpZGRlbik7XG4gIHJldHVybiBpbnB1dC5zdHlsZS53aWR0aCA9IG91dHB1dC5oaWRkZW4gP1xuICAgIFwiMTAwJVwiIDpcbiAgICBcIjUwJVwiO1xufTtcbmV4cG9ydHMudG9vZ2xlUHJldmlldyA9IHRvb2dsZVByZXZpZXc7XG5cbnZhciBfZXJyb3JNYXJrZXJfID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB2aWV3LnRleHRDb250ZW50ID0gXCLil49cIjtcbiAgdmlldy5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcbiAgdmlldy5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcbiAgcmV0dXJuIHZpZXc7XG59KSgpO1xuZXhwb3J0cy5fZXJyb3JNYXJrZXJfID0gX2Vycm9yTWFya2VyXztcblxudmFyIHVwZGF0ZVByZXZpZXcgPSB0aHJvdHRsZShmdW5jdGlvbihlZGl0b3IpIHtcbiAgdmFyIGNvZGUgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgbG9jYWxTdG9yYWdlLmJ1ZmZlciA9IGNvZGU7XG4gIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgZWRpdG9yLmNsZWFyR3V0dGVyKFwiZXJyb3ItZ3V0dGVyXCIpO1xuICAgIHJldHVybiBvdXRwdXQuc2V0VmFsdWUoY29tcGlsZV8ocmVhZF8oY29kZSwgXCJzY3JhdGNoLndpc3BcIikpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBfZXJyb3JNYXJrZXJfLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgIHJldHVybiBlZGl0b3Iuc2V0R3V0dGVyTWFya2VyKGVycm9yLmxpbmUgfHwgMCwgXCJlcnJvci1ndXR0ZXJcIiwgX2Vycm9yTWFya2VyXyk7XG4gIH19KSgpO1xufSwgMjAwKTtcbmV4cG9ydHMudXBkYXRlUHJldmlldyA9IHVwZGF0ZVByZXZpZXc7XG5cbnZhciBpbnB1dCA9IENvZGVNaXJyb3IoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dFwiKSwge1xuICBcImxpbmVOdW1iZXJzXCI6IHRydWUsXG4gIFwibWF0Y2hCcmFja2V0c1wiOiB0cnVlLFxuICBcImVsZWN0cmljQ2hhcnNcIjogdHJ1ZSxcbiAgXCJwZXJzaXN0XCI6IHRydWUsXG4gIFwic3R5bGVBY3RpdmVMaW5lXCI6IHRydWUsXG4gIFwiYXV0b2ZvY3VzXCI6IHRydWUsXG4gIFwidmFsdWVcIjogKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhhbXBsZXNcIikpLmlubmVySFRNTCxcbiAgXCJ0aGVtZVwiOiBcInNvbGFyaXplZCBkYXJrXCIsXG4gIFwibW9kZVwiOiBcImNsb2p1cmVcIixcbiAgXCJhdXRvQ2xlYXJFbXB0eUxpbmVzXCI6IHRydWUsXG4gIFwiZml4ZWRHdXR0ZXJcIjogdHJ1ZSxcbiAgXCJndXR0ZXJzXCI6IFtcImVycm9yLWd1dHRlclwiXSxcbiAgXCJleHRyYUtleXNcIjoge1xuICAgIFwiVGFiXCI6IFwiaW5kZW50U2VsZWN0aW9uXCJcbiAgfSxcbiAgXCJvbkNoYW5nZVwiOiB1cGRhdGVQcmV2aWV3LFxuICBcIm9uR3V0dGVyQ2xpY2tcIjogdG9vZ2xlUHJldmlld1xufSk7XG5leHBvcnRzLmlucHV0ID0gaW5wdXQ7XG5cbmlucHV0Lm9uKFwiY2hhbmdlXCIsIHVwZGF0ZVByZXZpZXcpO1xuXG5pbnB1dC5vbihcImd1dHRlckNsaWNrXCIsIHRvb2dsZVByZXZpZXcpO1xuXG51cGRhdGVQcmV2aWV3KGlucHV0KTtcblxudmFyIG91dHB1dCA9IENvZGVNaXJyb3IoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIiksIHtcbiAgXCJsaW5lTnVtYmVyc1wiOiB0cnVlLFxuICBcImZpeGVkR3V0dGVyXCI6IHRydWUsXG4gIFwibWF0Y2hCcmFja2V0c1wiOiB0cnVlLFxuICBcIm1vZGVcIjogXCJqYXZhc2NyaXB0XCIsXG4gIFwidGhlbWVcIjogXCJzb2xhcml6ZWQgZGFya1wiLFxuICBcInJlYWRPbmx5XCI6IHRydWVcbn0pO1xuZXhwb3J0cy5vdXRwdXQgPSBvdXRwdXQiLCJ2YXIgX25zXyA9IHtcbiAgXCJpZFwiOiBcIndpc3AuY29tcGlsZXJcIixcbiAgXCJkb2NcIjogXCJ3aXNwIGxhbmd1YWdlIGNvbXBpbGVyXCJcbn07XG52YXIgd2lzcF9yZWFkZXIgPSByZXF1aXJlKFwiLi9yZWFkZXJcIik7XG52YXIgcmVhZEZyb21TdHJpbmcgPSB3aXNwX3JlYWRlci5yZWFkRnJvbVN0cmluZzs7XG52YXIgd2lzcF9hc3QgPSByZXF1aXJlKFwiLi9hc3RcIik7XG52YXIgbWV0YSA9IHdpc3BfYXN0Lm1ldGE7XG52YXIgd2l0aE1ldGEgPSB3aXNwX2FzdC53aXRoTWV0YTtcbnZhciBpc1N5bWJvbCA9IHdpc3BfYXN0LmlzU3ltYm9sO1xudmFyIHN5bWJvbCA9IHdpc3BfYXN0LnN5bWJvbDtcbnZhciBpc0tleXdvcmQgPSB3aXNwX2FzdC5pc0tleXdvcmQ7XG52YXIga2V5d29yZCA9IHdpc3BfYXN0LmtleXdvcmQ7XG52YXIgbmFtZXNwYWNlID0gd2lzcF9hc3QubmFtZXNwYWNlO1xudmFyIGlzVW5xdW90ZSA9IHdpc3BfYXN0LmlzVW5xdW90ZTtcbnZhciBpc1VucXVvdGVTcGxpY2luZyA9IHdpc3BfYXN0LmlzVW5xdW90ZVNwbGljaW5nO1xudmFyIGlzUXVvdGUgPSB3aXNwX2FzdC5pc1F1b3RlO1xudmFyIGlzU3ludGF4UXVvdGUgPSB3aXNwX2FzdC5pc1N5bnRheFF1b3RlO1xudmFyIG5hbWUgPSB3aXNwX2FzdC5uYW1lO1xudmFyIGdlbnN5bSA9IHdpc3BfYXN0LmdlbnN5bTtcbnZhciBwclN0ciA9IHdpc3BfYXN0LnByU3RyOztcbnZhciB3aXNwX3NlcXVlbmNlID0gcmVxdWlyZShcIi4vc2VxdWVuY2VcIik7XG52YXIgaXNFbXB0eSA9IHdpc3Bfc2VxdWVuY2UuaXNFbXB0eTtcbnZhciBjb3VudCA9IHdpc3Bfc2VxdWVuY2UuY291bnQ7XG52YXIgaXNMaXN0ID0gd2lzcF9zZXF1ZW5jZS5pc0xpc3Q7XG52YXIgbGlzdCA9IHdpc3Bfc2VxdWVuY2UubGlzdDtcbnZhciBmaXJzdCA9IHdpc3Bfc2VxdWVuY2UuZmlyc3Q7XG52YXIgc2Vjb25kID0gd2lzcF9zZXF1ZW5jZS5zZWNvbmQ7XG52YXIgdGhpcmQgPSB3aXNwX3NlcXVlbmNlLnRoaXJkO1xudmFyIHJlc3QgPSB3aXNwX3NlcXVlbmNlLnJlc3Q7XG52YXIgY29ucyA9IHdpc3Bfc2VxdWVuY2UuY29ucztcbnZhciBjb25qID0gd2lzcF9zZXF1ZW5jZS5jb25qO1xudmFyIHJldmVyc2UgPSB3aXNwX3NlcXVlbmNlLnJldmVyc2U7XG52YXIgcmVkdWNlID0gd2lzcF9zZXF1ZW5jZS5yZWR1Y2U7XG52YXIgdmVjID0gd2lzcF9zZXF1ZW5jZS52ZWM7XG52YXIgbGFzdCA9IHdpc3Bfc2VxdWVuY2UubGFzdDtcbnZhciByZXBlYXQgPSB3aXNwX3NlcXVlbmNlLnJlcGVhdDtcbnZhciBtYXAgPSB3aXNwX3NlcXVlbmNlLm1hcDtcbnZhciBmaWx0ZXIgPSB3aXNwX3NlcXVlbmNlLmZpbHRlcjtcbnZhciB0YWtlID0gd2lzcF9zZXF1ZW5jZS50YWtlO1xudmFyIGNvbmNhdCA9IHdpc3Bfc2VxdWVuY2UuY29uY2F0O1xudmFyIGlzU2VxID0gd2lzcF9zZXF1ZW5jZS5pc1NlcTs7XG52YXIgd2lzcF9ydW50aW1lID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcbnZhciBpc09kZCA9IHdpc3BfcnVudGltZS5pc09kZDtcbnZhciBpc0RpY3Rpb25hcnkgPSB3aXNwX3J1bnRpbWUuaXNEaWN0aW9uYXJ5O1xudmFyIGRpY3Rpb25hcnkgPSB3aXNwX3J1bnRpbWUuZGljdGlvbmFyeTtcbnZhciBtZXJnZSA9IHdpc3BfcnVudGltZS5tZXJnZTtcbnZhciBrZXlzID0gd2lzcF9ydW50aW1lLmtleXM7XG52YXIgdmFscyA9IHdpc3BfcnVudGltZS52YWxzO1xudmFyIGlzQ29udGFpbnNWZWN0b3IgPSB3aXNwX3J1bnRpbWUuaXNDb250YWluc1ZlY3RvcjtcbnZhciBtYXBEaWN0aW9uYXJ5ID0gd2lzcF9ydW50aW1lLm1hcERpY3Rpb25hcnk7XG52YXIgaXNTdHJpbmcgPSB3aXNwX3J1bnRpbWUuaXNTdHJpbmc7XG52YXIgaXNOdW1iZXIgPSB3aXNwX3J1bnRpbWUuaXNOdW1iZXI7XG52YXIgaXNWZWN0b3IgPSB3aXNwX3J1bnRpbWUuaXNWZWN0b3I7XG52YXIgaXNCb29sZWFuID0gd2lzcF9ydW50aW1lLmlzQm9vbGVhbjtcbnZhciBzdWJzID0gd2lzcF9ydW50aW1lLnN1YnM7XG52YXIgcmVGaW5kID0gd2lzcF9ydW50aW1lLnJlRmluZDtcbnZhciBpc1RydWUgPSB3aXNwX3J1bnRpbWUuaXNUcnVlO1xudmFyIGlzRmFsc2UgPSB3aXNwX3J1bnRpbWUuaXNGYWxzZTtcbnZhciBpc05pbCA9IHdpc3BfcnVudGltZS5pc05pbDtcbnZhciBpc1JlUGF0dGVybiA9IHdpc3BfcnVudGltZS5pc1JlUGF0dGVybjtcbnZhciBpbmMgPSB3aXNwX3J1bnRpbWUuaW5jO1xudmFyIGRlYyA9IHdpc3BfcnVudGltZS5kZWM7XG52YXIgc3RyID0gd2lzcF9ydW50aW1lLnN0cjtcbnZhciBjaGFyID0gd2lzcF9ydW50aW1lLmNoYXI7XG52YXIgaW50ID0gd2lzcF9ydW50aW1lLmludDtcbnZhciBpc0VxdWFsID0gd2lzcF9ydW50aW1lLmlzRXF1YWw7XG52YXIgaXNTdHJpY3RFcXVhbCA9IHdpc3BfcnVudGltZS5pc1N0cmljdEVxdWFsOztcbnZhciB3aXNwX3N0cmluZyA9IHJlcXVpcmUoXCIuL3N0cmluZ1wiKTtcbnZhciBzcGxpdCA9IHdpc3Bfc3RyaW5nLnNwbGl0O1xudmFyIGpvaW4gPSB3aXNwX3N0cmluZy5qb2luO1xudmFyIHVwcGVyQ2FzZSA9IHdpc3Bfc3RyaW5nLnVwcGVyQ2FzZTtcbnZhciByZXBsYWNlID0gd2lzcF9zdHJpbmcucmVwbGFjZTs7XG52YXIgd2lzcF9iYWNrZW5kX2phdmFzY3JpcHRfd3JpdGVyID0gcmVxdWlyZShcIi4vYmFja2VuZC9qYXZhc2NyaXB0L3dyaXRlclwiKTtcbnZhciB3cml0ZVJlZmVyZW5jZSA9IHdpc3BfYmFja2VuZF9qYXZhc2NyaXB0X3dyaXRlci53cml0ZVJlZmVyZW5jZTtcbnZhciB3cml0ZUtleXdvcmRSZWZlcmVuY2UgPSB3aXNwX2JhY2tlbmRfamF2YXNjcmlwdF93cml0ZXIud3JpdGVLZXl3b3JkUmVmZXJlbmNlO1xudmFyIHdyaXRlS2V5d29yZCA9IHdpc3BfYmFja2VuZF9qYXZhc2NyaXB0X3dyaXRlci53cml0ZUtleXdvcmQ7XG52YXIgd3JpdGVTeW1ib2wgPSB3aXNwX2JhY2tlbmRfamF2YXNjcmlwdF93cml0ZXIud3JpdGVTeW1ib2w7XG52YXIgd3JpdGVOaWwgPSB3aXNwX2JhY2tlbmRfamF2YXNjcmlwdF93cml0ZXIud3JpdGVOaWw7XG52YXIgd3JpdGVDb21tZW50ID0gd2lzcF9iYWNrZW5kX2phdmFzY3JpcHRfd3JpdGVyLndyaXRlQ29tbWVudDtcbnZhciB3cml0ZU51bWJlciA9IHdpc3BfYmFja2VuZF9qYXZhc2NyaXB0X3dyaXRlci53cml0ZU51bWJlcjtcbnZhciB3cml0ZVN0cmluZyA9IHdpc3BfYmFja2VuZF9qYXZhc2NyaXB0X3dyaXRlci53cml0ZVN0cmluZztcbnZhciB3cml0ZUJvb2xlYW4gPSB3aXNwX2JhY2tlbmRfamF2YXNjcmlwdF93cml0ZXIud3JpdGVCb29sZWFuOzs7XG5cbnZhciBpc1NlbGZFdmFsdWF0aW5nID0gZnVuY3Rpb24gaXNTZWxmRXZhbHVhdGluZyhmb3JtKSB7XG4gIHJldHVybiAoaXNOdW1iZXIoZm9ybSkpIHx8ICgoaXNTdHJpbmcoZm9ybSkpICYmICghKGlzU3ltYm9sKGZvcm0pKSkgJiYgKCEoaXNLZXl3b3JkKGZvcm0pKSkpIHx8IChpc0Jvb2xlYW4oZm9ybSkpIHx8IChpc05pbChmb3JtKSkgfHwgKGlzUmVQYXR0ZXJuKGZvcm0pKTtcbn07XG5leHBvcnRzLmlzU2VsZkV2YWx1YXRpbmcgPSBpc1NlbGZFdmFsdWF0aW5nO1xuXG52YXIgX19tYWNyb3NfXyA9IHt9O1xuZXhwb3J0cy5fX21hY3Jvc19fID0gX19tYWNyb3NfXztcblxudmFyIGV4ZWN1dGVNYWNybyA9IGZ1bmN0aW9uIGV4ZWN1dGVNYWNybyhuYW1lLCBmb3JtKSB7XG4gIHJldHVybiAoX19tYWNyb3NfXyB8fCAwKVtuYW1lXS5hcHBseSgoX19tYWNyb3NfXyB8fCAwKVtuYW1lXSwgdmVjKGZvcm0pKTtcbn07XG5leHBvcnRzLmV4ZWN1dGVNYWNybyA9IGV4ZWN1dGVNYWNybztcblxudmFyIGluc3RhbGxNYWNybyA9IGZ1bmN0aW9uIGluc3RhbGxNYWNybyhuYW1lLCBtYWNyb0ZuKSB7XG4gIHJldHVybiAoX19tYWNyb3NfXyB8fCAwKVtuYW1lXSA9IG1hY3JvRm47XG59O1xuZXhwb3J0cy5pbnN0YWxsTWFjcm8gPSBpbnN0YWxsTWFjcm87XG5cbnZhciBpc01hY3JvID0gZnVuY3Rpb24gaXNNYWNybyhuYW1lKSB7XG4gIHJldHVybiAoaXNTeW1ib2wobmFtZSkpICYmICgoX19tYWNyb3NfXyB8fCAwKVtuYW1lXSkgJiYgdHJ1ZTtcbn07XG5leHBvcnRzLmlzTWFjcm8gPSBpc01hY3JvO1xuXG52YXIgbWFrZU1hY3JvID0gZnVuY3Rpb24gbWFrZU1hY3JvKHBhdHRlcm4sIGJvZHkpIHtcbiAgdmFyIG1hY3JvRm4gPSBjb25jYXQobGlzdChzeW1ib2wodm9pZCgwKSwgXCJmblwiKSwgcGF0dGVybiksIGJvZHkpO1xuICByZXR1cm4gZXZhbChcIlwiICsgXCIoXCIgKyAoY29tcGlsZShtYWNyb2V4cGFuZChtYWNyb0ZuKSkpICsgXCIpXCIpO1xufTtcbmV4cG9ydHMubWFrZU1hY3JvID0gbWFrZU1hY3JvO1xuXG5pbnN0YWxsTWFjcm8oc3ltYm9sKHZvaWQoMCksIFwiZGVmbWFjcm9cIiksIGZ1bmN0aW9uKG5hbWUsIHNpZ25hdHVyZSkge1xuICB2YXIgYm9keSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gIHJldHVybiBpbnN0YWxsTWFjcm8obmFtZSwgbWFrZU1hY3JvKHNpZ25hdHVyZSwgYm9keSkpO1xufSk7XG5cbnZhciBfX3NwZWNpYWxzX18gPSB7fTtcbmV4cG9ydHMuX19zcGVjaWFsc19fID0gX19zcGVjaWFsc19fO1xuXG52YXIgaW5zdGFsbFNwZWNpYWwgPSBmdW5jdGlvbiBpbnN0YWxsU3BlY2lhbChuYW1lLCBmLCB2YWxpZGF0b3IpIHtcbiAgcmV0dXJuIChfX3NwZWNpYWxzX18gfHwgMClbbmFtZV0gPSBmdW5jdGlvbihmb3JtKSB7XG4gICAgdmFsaWRhdG9yID9cbiAgICAgIHZhbGlkYXRvcihmb3JtKSA6XG4gICAgICB2b2lkKDApO1xuICAgIHJldHVybiBmKHdpdGhNZXRhKHJlc3QoZm9ybSksIG1ldGEoZm9ybSkpKTtcbiAgfTtcbn07XG5leHBvcnRzLmluc3RhbGxTcGVjaWFsID0gaW5zdGFsbFNwZWNpYWw7XG5cbnZhciBpc1NwZWNpYWwgPSBmdW5jdGlvbiBpc1NwZWNpYWwobmFtZSkge1xuICByZXR1cm4gKGlzU3ltYm9sKG5hbWUpKSAmJiAoKF9fc3BlY2lhbHNfXyB8fCAwKVtuYW1lXSkgJiYgdHJ1ZTtcbn07XG5leHBvcnRzLmlzU3BlY2lhbCA9IGlzU3BlY2lhbDtcblxudmFyIGV4ZWN1dGVTcGVjaWFsID0gZnVuY3Rpb24gZXhlY3V0ZVNwZWNpYWwobmFtZSwgZm9ybSkge1xuICByZXR1cm4gKChfX3NwZWNpYWxzX18gfHwgMClbbmFtZV0pKGZvcm0pO1xufTtcbmV4cG9ydHMuZXhlY3V0ZVNwZWNpYWwgPSBleGVjdXRlU3BlY2lhbDtcblxudmFyIG9wdCA9IGZ1bmN0aW9uIG9wdChhcmd1bWVudCwgZmFsbGJhY2spIHtcbiAgcmV0dXJuIChpc05pbChhcmd1bWVudCkpIHx8IChpc0VtcHR5KGFyZ3VtZW50KSkgP1xuICAgIGZhbGxiYWNrIDpcbiAgICBmaXJzdChhcmd1bWVudCk7XG59O1xuZXhwb3J0cy5vcHQgPSBvcHQ7XG5cbnZhciBhcHBseUZvcm0gPSBmdW5jdGlvbiBhcHBseUZvcm0oZm5OYW1lLCBmb3JtLCBpc1F1b3RlZCkge1xuICByZXR1cm4gY29ucyhmbk5hbWUsIGlzUXVvdGVkID9cbiAgICBtYXAoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwicXVvdGVcIiksIGUpO1xuICAgIH0sIGZvcm0pIDpcbiAgICBmb3JtLCBmb3JtKTtcbn07XG5leHBvcnRzLmFwcGx5Rm9ybSA9IGFwcGx5Rm9ybTtcblxudmFyIGFwcGx5VW5xdW90ZWRGb3JtID0gZnVuY3Rpb24gYXBwbHlVbnF1b3RlZEZvcm0oZm5OYW1lLCBmb3JtKSB7XG4gIHJldHVybiBjb25zKGZuTmFtZSwgbWFwKGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gaXNVbnF1b3RlKGUpID9cbiAgICAgIHNlY29uZChlKSA6XG4gICAgKGlzTGlzdChlKSkgJiYgKGlzS2V5d29yZChmaXJzdChlKSkpID9cbiAgICAgIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwic3ludGF4LXF1b3RlXCIpLCBzZWNvbmQoZSkpIDpcbiAgICAgIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwic3ludGF4LXF1b3RlXCIpLCBlKTtcbiAgfSwgZm9ybSkpO1xufTtcbmV4cG9ydHMuYXBwbHlVbnF1b3RlZEZvcm0gPSBhcHBseVVucXVvdGVkRm9ybTtcblxudmFyIHNwbGl0U3BsaWNlcyA9IGZ1bmN0aW9uIHNwbGl0U3BsaWNlcyhmb3JtLCBmbk5hbWUpIHtcbiAgdmFyIG1ha2VTcGxpY2UgPSBmdW5jdGlvbiBtYWtlU3BsaWNlKGZvcm0pIHtcbiAgICByZXR1cm4gKGlzU2VsZkV2YWx1YXRpbmcoZm9ybSkpIHx8IChpc1N5bWJvbChmb3JtKSkgP1xuICAgICAgYXBwbHlVbnF1b3RlZEZvcm0oZm5OYW1lLCBsaXN0KGZvcm0pKSA6XG4gICAgICBhcHBseVVucXVvdGVkRm9ybShmbk5hbWUsIGZvcm0pO1xuICB9O1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3Aobm9kZXMsIHNsaWNlcywgYWNjKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShub2RlcykgP1xuICAgICAgcmV2ZXJzZShpc0VtcHR5KGFjYykgP1xuICAgICAgICBzbGljZXMgOlxuICAgICAgICBjb25zKG1ha2VTcGxpY2UocmV2ZXJzZShhY2MpKSwgc2xpY2VzKSkgOlxuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbm9kZSA9IGZpcnN0KG5vZGVzKTtcbiAgICAgICAgcmV0dXJuIGlzVW5xdW90ZVNwbGljaW5nKG5vZGUpID9cbiAgICAgICAgICAobm9kZXMgPSByZXN0KG5vZGVzKSwgc2xpY2VzID0gY29ucyhzZWNvbmQobm9kZSksIGlzRW1wdHkoYWNjKSA/XG4gICAgICAgICAgICBzbGljZXMgOlxuICAgICAgICAgICAgY29ucyhtYWtlU3BsaWNlKHJldmVyc2UoYWNjKSksIHNsaWNlcykpLCBhY2MgPSBsaXN0KCksIGxvb3ApIDpcbiAgICAgICAgICAobm9kZXMgPSByZXN0KG5vZGVzKSwgc2xpY2VzID0gc2xpY2VzLCBhY2MgPSBjb25zKG5vZGUsIGFjYyksIGxvb3ApO1xuICAgICAgfSkoKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoZm9ybSwgbGlzdCgpLCBsaXN0KCkpO1xufTtcbmV4cG9ydHMuc3BsaXRTcGxpY2VzID0gc3BsaXRTcGxpY2VzO1xuXG52YXIgc3ludGF4UXVvdGVTcGxpdCA9IGZ1bmN0aW9uIHN5bnRheFF1b3RlU3BsaXQoYXBwZW5kTmFtZSwgZm5OYW1lLCBmb3JtKSB7XG4gIHZhciBzbGljZXMgPSBzcGxpdFNwbGljZXMoZm9ybSwgZm5OYW1lKTtcbiAgdmFyIG4gPSBjb3VudChzbGljZXMpO1xuICByZXR1cm4gbiA9PT0gMCA/XG4gICAgbGlzdChmbk5hbWUpIDpcbiAgbiA9PT0gMSA/XG4gICAgZmlyc3Qoc2xpY2VzKSA6XG4gIFwiZGVmYXVsdFwiID9cbiAgICBhcHBseUZvcm0oYXBwZW5kTmFtZSwgc2xpY2VzKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLnN5bnRheFF1b3RlU3BsaXQgPSBzeW50YXhRdW90ZVNwbGl0O1xuXG52YXIgY29tcGlsZU9iamVjdCA9IGZ1bmN0aW9uIGNvbXBpbGVPYmplY3QoZm9ybSwgaXNRdW90ZWQpIHtcbiAgcmV0dXJuIGlzS2V5d29yZChmb3JtKSA/XG4gICAgd3JpdGVLZXl3b3JkKGZvcm0pIDpcbiAgaXNTeW1ib2woZm9ybSkgP1xuICAgIHdyaXRlU3ltYm9sKGZvcm0pIDpcbiAgaXNOdW1iZXIoZm9ybSkgP1xuICAgIHdyaXRlTnVtYmVyKGZvcm0pIDpcbiAgaXNTdHJpbmcoZm9ybSkgP1xuICAgIHdyaXRlU3RyaW5nKGZvcm0pIDpcbiAgaXNCb29sZWFuKGZvcm0pID9cbiAgICB3cml0ZUJvb2xlYW4oZm9ybSkgOlxuICBpc05pbChmb3JtKSA/XG4gICAgd3JpdGVOaWwoZm9ybSkgOlxuICBpc1JlUGF0dGVybihmb3JtKSA/XG4gICAgY29tcGlsZVJlUGF0dGVybihmb3JtKSA6XG4gIGlzVmVjdG9yKGZvcm0pID9cbiAgICBjb21waWxlKGFwcGx5Rm9ybShzeW1ib2wodm9pZCgwKSwgXCJ2ZWN0b3JcIiksIGxpc3QuYXBwbHkobGlzdCwgZm9ybSksIGlzUXVvdGVkKSkgOlxuICBpc0xpc3QoZm9ybSkgP1xuICAgIGNvbXBpbGUoYXBwbHlGb3JtKHN5bWJvbCh2b2lkKDApLCBcImxpc3RcIiksIGZvcm0sIGlzUXVvdGVkKSkgOlxuICBpc0RpY3Rpb25hcnkoZm9ybSkgP1xuICAgIGNvbXBpbGVEaWN0aW9uYXJ5KGlzUXVvdGVkID9cbiAgICAgIG1hcERpY3Rpb25hcnkoZm9ybSwgZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gbGlzdChzeW1ib2wodm9pZCgwKSwgXCJxdW90ZVwiKSwgeCk7XG4gICAgICB9KSA6XG4gICAgICBmb3JtKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmNvbXBpbGVPYmplY3QgPSBjb21waWxlT2JqZWN0O1xuXG52YXIgY29tcGlsZVN5bnRheFF1b3RlZFZlY3RvciA9IGZ1bmN0aW9uIGNvbXBpbGVTeW50YXhRdW90ZWRWZWN0b3IoZm9ybSkge1xuICB2YXIgY29uY2F0Rm9ybSA9IHN5bnRheFF1b3RlU3BsaXQoc3ltYm9sKHZvaWQoMCksIFwiY29uY2F0XCIpLCBzeW1ib2wodm9pZCgwKSwgXCJ2ZWN0b3JcIiksIGxpc3QuYXBwbHkobGlzdCwgZm9ybSkpO1xuICByZXR1cm4gY29tcGlsZShjb3VudChjb25jYXRGb3JtKSA+IDEgP1xuICAgIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwidmVjXCIpLCBjb25jYXRGb3JtKSA6XG4gICAgY29uY2F0Rm9ybSk7XG59O1xuZXhwb3J0cy5jb21waWxlU3ludGF4UXVvdGVkVmVjdG9yID0gY29tcGlsZVN5bnRheFF1b3RlZFZlY3RvcjtcblxudmFyIGNvbXBpbGVTeW50YXhRdW90ZWQgPSBmdW5jdGlvbiBjb21waWxlU3ludGF4UXVvdGVkKGZvcm0pIHtcbiAgcmV0dXJuIGlzTGlzdChmb3JtKSA/XG4gICAgY29tcGlsZShzeW50YXhRdW90ZVNwbGl0KHN5bWJvbCh2b2lkKDApLCBcImNvbmNhdFwiKSwgc3ltYm9sKHZvaWQoMCksIFwibGlzdFwiKSwgZm9ybSkpIDpcbiAgaXNWZWN0b3IoZm9ybSkgP1xuICAgIGNvbXBpbGVTeW50YXhRdW90ZWRWZWN0b3IoZm9ybSkgOlxuICBcImVsc2VcIiA/XG4gICAgY29tcGlsZU9iamVjdChmb3JtKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmNvbXBpbGVTeW50YXhRdW90ZWQgPSBjb21waWxlU3ludGF4UXVvdGVkO1xuXG52YXIgY29tcGlsZSA9IGZ1bmN0aW9uIGNvbXBpbGUoZm9ybSkge1xuICByZXR1cm4gaXNTZWxmRXZhbHVhdGluZyhmb3JtKSA/XG4gICAgY29tcGlsZU9iamVjdChmb3JtKSA6XG4gIGlzU3ltYm9sKGZvcm0pID9cbiAgICB3cml0ZVJlZmVyZW5jZShmb3JtKSA6XG4gIGlzS2V5d29yZChmb3JtKSA/XG4gICAgd3JpdGVLZXl3b3JkUmVmZXJlbmNlKGZvcm0pIDpcbiAgaXNWZWN0b3IoZm9ybSkgP1xuICAgIGNvbXBpbGVPYmplY3QoZm9ybSkgOlxuICBpc0RpY3Rpb25hcnkoZm9ybSkgP1xuICAgIGNvbXBpbGVPYmplY3QoZm9ybSkgOlxuICBpc0xpc3QoZm9ybSkgP1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoZWFkID0gZmlyc3QoZm9ybSk7XG4gICAgICByZXR1cm4gaXNFbXB0eShmb3JtKSA/XG4gICAgICAgIGNvbXBpbGVPYmplY3QoZm9ybSwgdHJ1ZSkgOlxuICAgICAgaXNRdW90ZShmb3JtKSA/XG4gICAgICAgIGNvbXBpbGVPYmplY3Qoc2Vjb25kKGZvcm0pLCB0cnVlKSA6XG4gICAgICBpc1N5bnRheFF1b3RlKGZvcm0pID9cbiAgICAgICAgY29tcGlsZVN5bnRheFF1b3RlZChzZWNvbmQoZm9ybSkpIDpcbiAgICAgIGlzU3BlY2lhbChoZWFkKSA/XG4gICAgICAgIGV4ZWN1dGVTcGVjaWFsKGhlYWQsIGZvcm0pIDpcbiAgICAgIGlzS2V5d29yZChoZWFkKSA/XG4gICAgICAgIGNvbXBpbGUobGlzdChzeW1ib2wodm9pZCgwKSwgXCJnZXRcIiksIHNlY29uZChmb3JtKSwgaGVhZCkpIDpcbiAgICAgIFwiZWxzZVwiID9cbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhKChpc1N5bWJvbChoZWFkKSkgfHwgKGlzTGlzdChoZWFkKSkpID9cbiAgICAgICAgICAgIChmdW5jdGlvbigpIHsgdGhyb3cgY29tcGlsZXJFcnJvcihmb3JtLCBcIlwiICsgXCJvcGVyYXRvciBpcyBub3QgYSBwcm9jZWR1cmU6IFwiICsgaGVhZCk7IH0pKCkgOlxuICAgICAgICAgICAgY29tcGlsZUludm9rZShmb3JtKTtcbiAgICAgICAgfSkoKSA6XG4gICAgICAgIHZvaWQoMCk7XG4gICAgfSkoKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmNvbXBpbGUgPSBjb21waWxlO1xuXG52YXIgY29tcGlsZV8gPSBmdW5jdGlvbiBjb21waWxlXyhmb3Jtcykge1xuICByZXR1cm4gcmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwgZm9ybSkge1xuICAgIHJldHVybiBcIlwiICsgcmVzdWx0ICsgKGlzRW1wdHkocmVzdWx0KSA/XG4gICAgICBcIlwiIDpcbiAgICAgIFwiO1xcblxcblwiKSArIChjb21waWxlKGlzTGlzdChmb3JtKSA/XG4gICAgICB3aXRoTWV0YShtYWNyb2V4cGFuZChmb3JtKSwgY29uaih7XG4gICAgICAgIFwidG9wXCI6IHRydWVcbiAgICAgIH0sIG1ldGEoZm9ybSkpKSA6XG4gICAgICBmb3JtKSk7XG4gIH0sIFwiXCIsIGZvcm1zKTtcbn07XG5leHBvcnRzLmNvbXBpbGVfID0gY29tcGlsZV87XG5cbnZhciBjb21waWxlUHJvZ3JhbSA9IGZ1bmN0aW9uIGNvbXBpbGVQcm9ncmFtKGZvcm1zKSB7XG4gIHJldHVybiByZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBmb3JtKSB7XG4gICAgcmV0dXJuIFwiXCIgKyByZXN1bHQgKyAoaXNFbXB0eShyZXN1bHQpID9cbiAgICAgIFwiXCIgOlxuICAgICAgXCI7XFxuXFxuXCIpICsgKGNvbXBpbGUoaXNMaXN0KGZvcm0pID9cbiAgICAgIHdpdGhNZXRhKG1hY3JvZXhwYW5kKGZvcm0pLCBjb25qKHtcbiAgICAgICAgXCJ0b3BcIjogdHJ1ZVxuICAgICAgfSwgbWV0YShmb3JtKSkpIDpcbiAgICAgIGZvcm0pKTtcbiAgfSwgXCJcIiwgZm9ybXMpO1xufTtcbmV4cG9ydHMuY29tcGlsZVByb2dyYW0gPSBjb21waWxlUHJvZ3JhbTtcblxudmFyIG1hY3JvZXhwYW5kMSA9IGZ1bmN0aW9uIG1hY3JvZXhwYW5kMShmb3JtKSB7XG4gIHJldHVybiBpc0xpc3QoZm9ybSkgP1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvcCA9IGZpcnN0KGZvcm0pO1xuICAgICAgdmFyIGlkID0gaXNTeW1ib2wob3ApID9cbiAgICAgICAgbmFtZShvcCkgOlxuICAgICAgICB2b2lkKDApO1xuICAgICAgcmV0dXJuIGlzU3BlY2lhbChvcCkgP1xuICAgICAgICBmb3JtIDpcbiAgICAgIGlzTWFjcm8ob3ApID9cbiAgICAgICAgZXhlY3V0ZU1hY3JvKG9wLCByZXN0KGZvcm0pKSA6XG4gICAgICAoaXNTeW1ib2wob3ApKSAmJiAoIShpZCA9PT0gXCIuXCIpKSA/XG4gICAgICAgIGZpcnN0KGlkKSA9PT0gXCIuXCIgP1xuICAgICAgICAgIGNvdW50KGZvcm0pIDwgMiA/XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7IHRocm93IEVycm9yKFwiTWFsZm9ybWVkIG1lbWJlciBleHByZXNzaW9uLCBleHBlY3RpbmcgKC5tZW1iZXIgdGFyZ2V0IC4uLilcIik7IH0pKCkgOlxuICAgICAgICAgICAgY29ucyhzeW1ib2wodm9pZCgwKSwgXCIuXCIpLCBjb25zKHNlY29uZChmb3JtKSwgY29ucyhzeW1ib2woc3VicyhpZCwgMSkpLCByZXN0KHJlc3QoZm9ybSkpKSkpIDpcbiAgICAgICAgbGFzdChpZCkgPT09IFwiLlwiID9cbiAgICAgICAgICBjb25zKHN5bWJvbCh2b2lkKDApLCBcIm5ld1wiKSwgY29ucyhzeW1ib2woc3VicyhpZCwgMCwgZGVjKGNvdW50KGlkKSkpKSwgcmVzdChmb3JtKSkpIDpcbiAgICAgICAgICBmb3JtIDpcbiAgICAgIFwiZWxzZVwiID9cbiAgICAgICAgZm9ybSA6XG4gICAgICAgIHZvaWQoMCk7XG4gICAgfSkoKSA6XG4gICAgZm9ybTtcbn07XG5leHBvcnRzLm1hY3JvZXhwYW5kMSA9IG1hY3JvZXhwYW5kMTtcblxudmFyIG1hY3JvZXhwYW5kID0gZnVuY3Rpb24gbWFjcm9leHBhbmQoZm9ybSkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3Aob3JpZ2luYWwsIGV4cGFuZGVkKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gb3JpZ2luYWwgPT09IGV4cGFuZGVkID9cbiAgICAgIG9yaWdpbmFsIDpcbiAgICAgIChvcmlnaW5hbCA9IGV4cGFuZGVkLCBleHBhbmRlZCA9IG1hY3JvZXhwYW5kMShleHBhbmRlZCksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShmb3JtLCBtYWNyb2V4cGFuZDEoZm9ybSkpO1xufTtcbmV4cG9ydHMubWFjcm9leHBhbmQgPSBtYWNyb2V4cGFuZDtcblxudmFyIF9saW5lQnJlYWtQYXR0ZXJuXyA9IC9cXG4oPz1bXlxcbl0pL207XG5leHBvcnRzLl9saW5lQnJlYWtQYXR0ZXJuXyA9IF9saW5lQnJlYWtQYXR0ZXJuXztcblxudmFyIGluZGVudCA9IGZ1bmN0aW9uIGluZGVudChjb2RlLCBpbmRlbnRhdGlvbikge1xuICByZXR1cm4gam9pbihpbmRlbnRhdGlvbiwgc3BsaXQoY29kZSwgX2xpbmVCcmVha1BhdHRlcm5fKSk7XG59O1xuZXhwb3J0cy5pbmRlbnQgPSBpbmRlbnQ7XG5cbnZhciBjb21waWxlVGVtcGxhdGUgPSBmdW5jdGlvbiBjb21waWxlVGVtcGxhdGUoZm9ybSkge1xuICB2YXIgaW5kZW50UGF0dGVybiA9IC9cXG4gKiQvO1xuICB2YXIgZ2V0SW5kZW50YXRpb24gPSBmdW5jdGlvbihjb2RlKSB7XG4gICAgcmV0dXJuIChyZUZpbmQoaW5kZW50UGF0dGVybiwgY29kZSkpIHx8IFwiXFxuXCI7XG4gIH07XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChjb2RlLCBwYXJ0cywgdmFsdWVzKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gY291bnQocGFydHMpID4gMSA/XG4gICAgICAoY29kZSA9IFwiXCIgKyBjb2RlICsgKGZpcnN0KHBhcnRzKSkgKyAoaW5kZW50KFwiXCIgKyAoZmlyc3QodmFsdWVzKSksIGdldEluZGVudGF0aW9uKGZpcnN0KHBhcnRzKSkpKSwgcGFydHMgPSByZXN0KHBhcnRzKSwgdmFsdWVzID0gcmVzdCh2YWx1ZXMpLCBsb29wKSA6XG4gICAgICBcIlwiICsgY29kZSArIChmaXJzdChwYXJ0cykpO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShcIlwiLCBzcGxpdChmaXJzdChmb3JtKSwgXCJ+e31cIiksIHJlc3QoZm9ybSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZVRlbXBsYXRlID0gY29tcGlsZVRlbXBsYXRlO1xuXG52YXIgY29tcGlsZURlZiA9IGZ1bmN0aW9uIGNvbXBpbGVEZWYoZm9ybSkge1xuICB2YXIgaWQgPSBmaXJzdChmb3JtKTtcbiAgdmFyIGlzRXhwb3J0ID0gKCgoKG1ldGEoZm9ybSkpIHx8IHt9KSB8fCAwKVtcInRvcFwiXSkgJiYgKCEoKCgobWV0YShpZCkpIHx8IHt9KSB8fCAwKVtcInByaXZhdGVcIl0pKTtcbiAgdmFyIGF0dHJpYnV0ZSA9IHN5bWJvbChuYW1lc3BhY2UoaWQpLCBcIlwiICsgXCItXCIgKyAobmFtZShpZCkpKTtcbiAgcmV0dXJuIGlzRXhwb3J0ID9cbiAgICBjb21waWxlVGVtcGxhdGUobGlzdChcInZhciB+e307XFxufnt9XCIsIGNvbXBpbGUoY29ucyhzeW1ib2wodm9pZCgwKSwgXCJzZXQhXCIpLCBmb3JtKSksIGNvbXBpbGUobGlzdChzeW1ib2wodm9pZCgwKSwgXCJzZXQhXCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcIi5cIiksIHN5bWJvbCh2b2lkKDApLCBcImV4cG9ydHNcIiksIGF0dHJpYnV0ZSksIGlkKSkpKSA6XG4gICAgY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ2YXIgfnt9XCIsIGNvbXBpbGUoY29ucyhzeW1ib2wodm9pZCgwKSwgXCJzZXQhXCIpLCBmb3JtKSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVEZWYgPSBjb21waWxlRGVmO1xuXG52YXIgY29tcGlsZUlmRWxzZSA9IGZ1bmN0aW9uIGNvbXBpbGVJZkVsc2UoZm9ybSkge1xuICB2YXIgY29uZGl0aW9uID0gbWFjcm9leHBhbmQoZmlyc3QoZm9ybSkpO1xuICB2YXIgdGhlbkV4cHJlc3Npb24gPSBtYWNyb2V4cGFuZChzZWNvbmQoZm9ybSkpO1xuICB2YXIgZWxzZUV4cHJlc3Npb24gPSBtYWNyb2V4cGFuZCh0aGlyZChmb3JtKSk7XG4gIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdCgoaXNMaXN0KGVsc2VFeHByZXNzaW9uKSkgJiYgKGlzRXF1YWwoZmlyc3QoZWxzZUV4cHJlc3Npb24pLCBzeW1ib2wodm9pZCgwKSwgXCJpZlwiKSkpID9cbiAgICBcIn57fSA/XFxuICB+e30gOlxcbn57fVwiIDpcbiAgICBcIn57fSA/XFxuICB+e30gOlxcbiAgfnt9XCIsIGNvbXBpbGUoY29uZGl0aW9uKSwgY29tcGlsZSh0aGVuRXhwcmVzc2lvbiksIGNvbXBpbGUoZWxzZUV4cHJlc3Npb24pKSk7XG59O1xuZXhwb3J0cy5jb21waWxlSWZFbHNlID0gY29tcGlsZUlmRWxzZTtcblxudmFyIGNvbXBpbGVEaWN0aW9uYXJ5ID0gZnVuY3Rpb24gY29tcGlsZURpY3Rpb25hcnkoZm9ybSkge1xuICB2YXIgYm9keSA9IChmdW5jdGlvbiBsb29wKGJvZHksIG5hbWVzKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShuYW1lcykgP1xuICAgICAgYm9keSA6XG4gICAgICAoYm9keSA9IFwiXCIgKyAoaXNOaWwoYm9keSkgP1xuICAgICAgICBcIlwiIDpcbiAgICAgICAgXCJcIiArIGJvZHkgKyBcIixcXG5cIikgKyAoY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ+e306IH57fVwiLCBjb21waWxlKGZpcnN0KG5hbWVzKSksIGNvbXBpbGUobWFjcm9leHBhbmQoKGZvcm0gfHwgMClbZmlyc3QobmFtZXMpXSkpKSkpLCBuYW1lcyA9IHJlc3QobmFtZXMpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkodm9pZCgwKSwga2V5cyhmb3JtKSk7XG4gIHJldHVybiBpc05pbChib2R5KSA/XG4gICAgXCJ7fVwiIDpcbiAgICBjb21waWxlVGVtcGxhdGUobGlzdChcIntcXG4gIH57fVxcbn1cIiwgYm9keSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZURpY3Rpb25hcnkgPSBjb21waWxlRGljdGlvbmFyeTtcblxudmFyIGRlc3VnYXJGbk5hbWUgPSBmdW5jdGlvbiBkZXN1Z2FyRm5OYW1lKGZvcm0pIHtcbiAgcmV0dXJuIChpc1N5bWJvbChmaXJzdChmb3JtKSkpIHx8IChpc05pbChmaXJzdChmb3JtKSkpID9cbiAgICBmb3JtIDpcbiAgICBjb25zKHZvaWQoMCksIGZvcm0pO1xufTtcbmV4cG9ydHMuZGVzdWdhckZuTmFtZSA9IGRlc3VnYXJGbk5hbWU7XG5cbnZhciBkZXN1Z2FyRm5Eb2MgPSBmdW5jdGlvbiBkZXN1Z2FyRm5Eb2MoZm9ybSkge1xuICByZXR1cm4gKGlzU3RyaW5nKHNlY29uZChmb3JtKSkpIHx8IChpc05pbChzZWNvbmQoZm9ybSkpKSA/XG4gICAgZm9ybSA6XG4gICAgY29ucyhmaXJzdChmb3JtKSwgY29ucyh2b2lkKDApLCByZXN0KGZvcm0pKSk7XG59O1xuZXhwb3J0cy5kZXN1Z2FyRm5Eb2MgPSBkZXN1Z2FyRm5Eb2M7XG5cbnZhciBkZXN1Z2FyRm5BdHRycyA9IGZ1bmN0aW9uIGRlc3VnYXJGbkF0dHJzKGZvcm0pIHtcbiAgcmV0dXJuIChpc0RpY3Rpb25hcnkodGhpcmQoZm9ybSkpKSB8fCAoaXNOaWwodGhpcmQoZm9ybSkpKSA/XG4gICAgZm9ybSA6XG4gICAgY29ucyhmaXJzdChmb3JtKSwgY29ucyhzZWNvbmQoZm9ybSksIGNvbnModm9pZCgwKSwgcmVzdChyZXN0KGZvcm0pKSkpKTtcbn07XG5leHBvcnRzLmRlc3VnYXJGbkF0dHJzID0gZGVzdWdhckZuQXR0cnM7XG5cbnZhciBjb21waWxlRGVzdWdhcmVkRm4gPSBmdW5jdGlvbiBjb21waWxlRGVzdWdhcmVkRm4obmFtZSwgZG9jLCBhdHRycywgcGFyYW1zLCBib2R5KSB7XG4gIHJldHVybiBjb21waWxlVGVtcGxhdGUoaXNOaWwobmFtZSkgP1xuICAgIGxpc3QoXCJmdW5jdGlvbih+e30pIHtcXG4gIH57fVxcbn1cIiwgam9pbihcIiwgXCIsIG1hcChjb21waWxlLCAocGFyYW1zIHx8IDApW1wibmFtZXNcIl0pKSwgY29tcGlsZUZuQm9keShtYXAobWFjcm9leHBhbmQsIGJvZHkpLCBwYXJhbXMpKSA6XG4gICAgbGlzdChcImZ1bmN0aW9uIH57fSh+e30pIHtcXG4gIH57fVxcbn1cIiwgY29tcGlsZShuYW1lKSwgam9pbihcIiwgXCIsIG1hcChjb21waWxlLCAocGFyYW1zIHx8IDApW1wibmFtZXNcIl0pKSwgY29tcGlsZUZuQm9keShtYXAobWFjcm9leHBhbmQsIGJvZHkpLCBwYXJhbXMpKSk7XG59O1xuZXhwb3J0cy5jb21waWxlRGVzdWdhcmVkRm4gPSBjb21waWxlRGVzdWdhcmVkRm47XG5cbnZhciBjb21waWxlU3RhdGVtZW50cyA9IGZ1bmN0aW9uIGNvbXBpbGVTdGF0ZW1lbnRzKGZvcm0sIHByZWZpeCkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocmVzdWx0LCBleHByZXNzaW9uLCBleHByZXNzaW9ucykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGlzRW1wdHkoZXhwcmVzc2lvbnMpID9cbiAgICAgIFwiXCIgKyByZXN1bHQgKyAoaXNOaWwocHJlZml4KSA/XG4gICAgICAgIFwiXCIgOlxuICAgICAgICBwcmVmaXgpICsgKGNvbXBpbGUobWFjcm9leHBhbmQoZXhwcmVzc2lvbikpKSArIFwiO1wiIDpcbiAgICAgIChyZXN1bHQgPSBcIlwiICsgcmVzdWx0ICsgKGNvbXBpbGUobWFjcm9leHBhbmQoZXhwcmVzc2lvbikpKSArIFwiO1xcblwiLCBleHByZXNzaW9uID0gZmlyc3QoZXhwcmVzc2lvbnMpLCBleHByZXNzaW9ucyA9IHJlc3QoZXhwcmVzc2lvbnMpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkoXCJcIiwgZmlyc3QoZm9ybSksIHJlc3QoZm9ybSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZVN0YXRlbWVudHMgPSBjb21waWxlU3RhdGVtZW50cztcblxudmFyIGNvbXBpbGVGbkJvZHkgPSBmdW5jdGlvbiBjb21waWxlRm5Cb2R5KGZvcm0sIHBhcmFtcykge1xuICByZXR1cm4gKGlzRGljdGlvbmFyeShwYXJhbXMpKSAmJiAoKHBhcmFtcyB8fCAwKVtcInJlc3RcIl0pID9cbiAgICBjb21waWxlU3RhdGVtZW50cyhjb25zKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZGVmXCIpLCAocGFyYW1zIHx8IDApW1wicmVzdFwiXSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbFwiKSwgc3ltYm9sKHZvaWQoMCksIFwiYXJndW1lbnRzXCIpLCAocGFyYW1zIHx8IDApW1wiYXJpdHlcIl0pKSwgZm9ybSksIFwicmV0dXJuIFwiKSA6XG4gIChjb3VudChmb3JtKSA9PT0gMSkgJiYgKGlzTGlzdChmaXJzdChmb3JtKSkpICYmIChpc0VxdWFsKGZpcnN0KGZpcnN0KGZvcm0pKSwgc3ltYm9sKHZvaWQoMCksIFwiZG9cIikpKSA/XG4gICAgY29tcGlsZUZuQm9keShyZXN0KGZpcnN0KGZvcm0pKSwgcGFyYW1zKSA6XG4gICAgY29tcGlsZVN0YXRlbWVudHMoZm9ybSwgXCJyZXR1cm4gXCIpO1xufTtcbmV4cG9ydHMuY29tcGlsZUZuQm9keSA9IGNvbXBpbGVGbkJvZHk7XG5cbnZhciBkZXN1Z2FyUGFyYW1zID0gZnVuY3Rpb24gZGVzdWdhclBhcmFtcyhwYXJhbXMpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKG5hbWVzLCBwYXJhbXMpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBpc0VtcHR5KHBhcmFtcykgP1xuICAgICAge1xuICAgICAgICBcIm5hbWVzXCI6IG5hbWVzLFxuICAgICAgICBcImFyaXR5XCI6IGNvdW50KG5hbWVzKSxcbiAgICAgICAgXCJyZXN0XCI6IHZvaWQoMClcbiAgICAgIH0gOlxuICAgIGlzRXF1YWwoZmlyc3QocGFyYW1zKSwgc3ltYm9sKHZvaWQoMCksIFwiJlwiKSkgP1xuICAgICAgaXNFcXVhbChjb3VudChwYXJhbXMpLCAxKSA/XG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVzXCI6IG5hbWVzLFxuICAgICAgICAgIFwiYXJpdHlcIjogY291bnQobmFtZXMpLFxuICAgICAgICAgIFwicmVzdFwiOiB2b2lkKDApXG4gICAgICAgIH0gOlxuICAgICAgaXNFcXVhbChjb3VudChwYXJhbXMpLCAyKSA/XG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVzXCI6IG5hbWVzLFxuICAgICAgICAgIFwiYXJpdHlcIjogY291bnQobmFtZXMpLFxuICAgICAgICAgIFwicmVzdFwiOiBzZWNvbmQocGFyYW1zKVxuICAgICAgICB9IDpcbiAgICAgIFwiZWxzZVwiID9cbiAgICAgICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIG51bWJlciBvZiBwYXJhbWV0ZXJzIGFmdGVyICZcIik7IH0pKCkgOlxuICAgICAgICB2b2lkKDApIDpcbiAgICBcImVsc2VcIiA/XG4gICAgICAobmFtZXMgPSBjb25qKG5hbWVzLCBmaXJzdChwYXJhbXMpKSwgcGFyYW1zID0gcmVzdChwYXJhbXMpLCBsb29wKSA6XG4gICAgICB2b2lkKDApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShbXSwgcGFyYW1zKTtcbn07XG5leHBvcnRzLmRlc3VnYXJQYXJhbXMgPSBkZXN1Z2FyUGFyYW1zO1xuXG52YXIgYW5hbHl6ZU92ZXJsb2FkZWRGbiA9IGZ1bmN0aW9uIGFuYWx5emVPdmVybG9hZGVkRm4obmFtZSwgZG9jLCBhdHRycywgb3ZlcmxvYWRzKSB7XG4gIHJldHVybiBtYXAoZnVuY3Rpb24ob3ZlcmxvYWQpIHtcbiAgICB2YXIgcGFyYW1zID0gZGVzdWdhclBhcmFtcyhmaXJzdChvdmVybG9hZCkpO1xuICAgIHJldHVybiB7XG4gICAgICBcInJlc3RcIjogKHBhcmFtcyB8fCAwKVtcInJlc3RcIl0sXG4gICAgICBcIm5hbWVzXCI6IChwYXJhbXMgfHwgMClbXCJuYW1lc1wiXSxcbiAgICAgIFwiYXJpdHlcIjogKHBhcmFtcyB8fCAwKVtcImFyaXR5XCJdLFxuICAgICAgXCJib2R5XCI6IHJlc3Qob3ZlcmxvYWQpXG4gICAgfTtcbiAgfSwgb3ZlcmxvYWRzKTtcbn07XG5leHBvcnRzLmFuYWx5emVPdmVybG9hZGVkRm4gPSBhbmFseXplT3ZlcmxvYWRlZEZuO1xuXG52YXIgY29tcGlsZU92ZXJsb2FkZWRGbiA9IGZ1bmN0aW9uIGNvbXBpbGVPdmVybG9hZGVkRm4obmFtZSwgZG9jLCBhdHRycywgb3ZlcmxvYWRzKSB7XG4gIHZhciBtZXRob2RzID0gYW5hbHl6ZU92ZXJsb2FkZWRGbihuYW1lLCBkb2MsIGF0dHJzLCBvdmVybG9hZHMpO1xuICB2YXIgZml4ZWRNZXRob2RzID0gZmlsdGVyKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHJldHVybiAhKChtZXRob2QgfHwgMClbXCJyZXN0XCJdKTtcbiAgfSwgbWV0aG9kcyk7XG4gIHZhciB2YXJpYWRpYyA9IGZpcnN0KGZpbHRlcihmdW5jdGlvbihtZXRob2QpIHtcbiAgICByZXR1cm4gKG1ldGhvZCB8fCAwKVtcInJlc3RcIl07XG4gIH0sIG1ldGhvZHMpKTtcbiAgdmFyIG5hbWVzID0gcmVkdWNlKGZ1bmN0aW9uKG5hbWVzLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gY291bnQobmFtZXMpID4gKHBhcmFtcyB8fCAwKVtcImFyaXR5XCJdID9cbiAgICAgIG5hbWVzIDpcbiAgICAgIChwYXJhbXMgfHwgMClbXCJuYW1lc1wiXTtcbiAgfSwgW10sIG1ldGhvZHMpO1xuICByZXR1cm4gbGlzdChzeW1ib2wodm9pZCgwKSwgXCJmblwiKSwgbmFtZSwgZG9jLCBhdHRycywgbmFtZXMsIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwicmF3KlwiKSwgY29tcGlsZVN3aXRjaChzeW1ib2wodm9pZCgwKSwgXCJhcmd1bWVudHMubGVuZ3RoXCIpLCBtYXAoZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgcmV0dXJuIGNvbnMoKG1ldGhvZCB8fCAwKVtcImFyaXR5XCJdLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInJhdypcIiksIGNvbXBpbGVGbkJvZHkoY29uY2F0KGNvbXBpbGVSZWJpbmQobmFtZXMsIChtZXRob2QgfHwgMClbXCJuYW1lc1wiXSksIChtZXRob2QgfHwgMClbXCJib2R5XCJdKSkpKTtcbiAgfSwgZml4ZWRNZXRob2RzKSwgaXNOaWwodmFyaWFkaWMpID9cbiAgICBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInRocm93XCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcIkVycm9yXCIpLCBcIkludmFsaWQgYXJpdHlcIikpIDpcbiAgICBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInJhdypcIiksIGNvbXBpbGVGbkJvZHkoY29uY2F0KGNvbXBpbGVSZWJpbmQoY29ucyhsaXN0KHN5bWJvbCh2b2lkKDApLCBcIkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsXCIpLCBzeW1ib2wodm9pZCgwKSwgXCJhcmd1bWVudHNcIiksICh2YXJpYWRpYyB8fCAwKVtcImFyaXR5XCJdKSwgbmFtZXMpLCBjb25zKCh2YXJpYWRpYyB8fCAwKVtcInJlc3RcIl0sICh2YXJpYWRpYyB8fCAwKVtcIm5hbWVzXCJdKSksICh2YXJpYWRpYyB8fCAwKVtcImJvZHlcIl0pKSkpKSwgdm9pZCgwKSk7XG59O1xuZXhwb3J0cy5jb21waWxlT3ZlcmxvYWRlZEZuID0gY29tcGlsZU92ZXJsb2FkZWRGbjtcblxudmFyIGNvbXBpbGVSZWJpbmQgPSBmdW5jdGlvbiBjb21waWxlUmViaW5kKGJpbmRpbmdzLCBuYW1lcykge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoZm9ybSwgYmluZGluZ3MsIG5hbWVzKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShuYW1lcykgP1xuICAgICAgcmV2ZXJzZShmb3JtKSA6XG4gICAgICAoZm9ybSA9IGlzRXF1YWwoZmlyc3QobmFtZXMpLCBmaXJzdChiaW5kaW5ncykpID9cbiAgICAgICAgZm9ybSA6XG4gICAgICAgIGNvbnMobGlzdChzeW1ib2wodm9pZCgwKSwgXCJkZWZcIiksIGZpcnN0KG5hbWVzKSwgZmlyc3QoYmluZGluZ3MpKSwgZm9ybSksIGJpbmRpbmdzID0gcmVzdChiaW5kaW5ncyksIG5hbWVzID0gcmVzdChuYW1lcyksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShsaXN0KCksIGJpbmRpbmdzLCBuYW1lcyk7XG59O1xuZXhwb3J0cy5jb21waWxlUmViaW5kID0gY29tcGlsZVJlYmluZDtcblxudmFyIGNvbXBpbGVTd2l0Y2hDYXNlcyA9IGZ1bmN0aW9uIGNvbXBpbGVTd2l0Y2hDYXNlcyhjYXNlcykge1xuICByZXR1cm4gcmVkdWNlKGZ1bmN0aW9uKGZvcm0sIGNhc2VFeHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIFwiXCIgKyBmb3JtICsgKGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwiY2FzZSB+e306XFxuICB+e31cXG5cIiwgY29tcGlsZShtYWNyb2V4cGFuZChmaXJzdChjYXNlRXhwcmVzc2lvbikpKSwgY29tcGlsZShtYWNyb2V4cGFuZChyZXN0KGNhc2VFeHByZXNzaW9uKSkpKSkpO1xuICB9LCBcIlwiLCBjYXNlcyk7XG59O1xuZXhwb3J0cy5jb21waWxlU3dpdGNoQ2FzZXMgPSBjb21waWxlU3dpdGNoQ2FzZXM7XG5cbnZhciBjb21waWxlU3dpdGNoID0gZnVuY3Rpb24gY29tcGlsZVN3aXRjaCh2YWx1ZSwgY2FzZXMsIGRlZmF1bHRDYXNlKSB7XG4gIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdChcInN3aXRjaCAofnt9KSB7XFxuICB+e31cXG4gIGRlZmF1bHQ6XFxuICAgIH57fVxcbn1cIiwgY29tcGlsZShtYWNyb2V4cGFuZCh2YWx1ZSkpLCBjb21waWxlU3dpdGNoQ2FzZXMoY2FzZXMpLCBjb21waWxlKG1hY3JvZXhwYW5kKGRlZmF1bHRDYXNlKSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVTd2l0Y2ggPSBjb21waWxlU3dpdGNoO1xuXG52YXIgY29tcGlsZUZuID0gZnVuY3Rpb24gY29tcGlsZUZuKGZvcm0pIHtcbiAgdmFyIHNpZ25hdHVyZSA9IGRlc3VnYXJGbkF0dHJzKGRlc3VnYXJGbkRvYyhkZXN1Z2FyRm5OYW1lKGZvcm0pKSk7XG4gIHZhciBuYW1lID0gZmlyc3Qoc2lnbmF0dXJlKTtcbiAgdmFyIGRvYyA9IHNlY29uZChzaWduYXR1cmUpO1xuICB2YXIgYXR0cnMgPSB0aGlyZChzaWduYXR1cmUpO1xuICByZXR1cm4gaXNWZWN0b3IodGhpcmQocmVzdChzaWduYXR1cmUpKSkgP1xuICAgIGNvbXBpbGVEZXN1Z2FyZWRGbihuYW1lLCBkb2MsIGF0dHJzLCBkZXN1Z2FyUGFyYW1zKHRoaXJkKHJlc3Qoc2lnbmF0dXJlKSkpLCByZXN0KHJlc3QocmVzdChyZXN0KHNpZ25hdHVyZSkpKSkpIDpcbiAgICBjb21waWxlKGNvbXBpbGVPdmVybG9hZGVkRm4obmFtZSwgZG9jLCBhdHRycywgcmVzdChyZXN0KHJlc3Qoc2lnbmF0dXJlKSkpKSk7XG59O1xuZXhwb3J0cy5jb21waWxlRm4gPSBjb21waWxlRm47XG5cbnZhciBjb21waWxlSW52b2tlID0gZnVuY3Rpb24gY29tcGlsZUludm9rZShmb3JtKSB7XG4gIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdChpc0xpc3QoZmlyc3QoZm9ybSkpID9cbiAgICBcIih+e30pKH57fSlcIiA6XG4gICAgXCJ+e30ofnt9KVwiLCBjb21waWxlKGZpcnN0KGZvcm0pKSwgY29tcGlsZUdyb3VwKHJlc3QoZm9ybSkpKSk7XG59O1xuZXhwb3J0cy5jb21waWxlSW52b2tlID0gY29tcGlsZUludm9rZTtcblxudmFyIGNvbXBpbGVHcm91cCA9IGZ1bmN0aW9uIGNvbXBpbGVHcm91cChmb3JtLCB3cmFwKSB7XG4gIHJldHVybiB3cmFwID9cbiAgICBcIlwiICsgXCIoXCIgKyAoY29tcGlsZUdyb3VwKGZvcm0pKSArIFwiKVwiIDpcbiAgICBqb2luKFwiLCBcIiwgdmVjKG1hcChjb21waWxlLCBtYXAobWFjcm9leHBhbmQsIGZvcm0pKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZUdyb3VwID0gY29tcGlsZUdyb3VwO1xuXG52YXIgY29tcGlsZURvID0gZnVuY3Rpb24gY29tcGlsZURvKGZvcm0pIHtcbiAgcmV0dXJuIGNvbXBpbGUobGlzdChjb25zKHN5bWJvbCh2b2lkKDApLCBcImZuXCIpLCBjb25zKFtdLCBmb3JtKSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVEbyA9IGNvbXBpbGVEbztcblxudmFyIGRlZmluZUJpbmRpbmdzID0gZnVuY3Rpb24gZGVmaW5lQmluZGluZ3MoZm9ybSkge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoZGVmcywgYmluZGluZ3MpIHtcbiAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgcmVjdXIgPSBjb3VudChiaW5kaW5ncykgPT09IDAgP1xuICAgICAgcmV2ZXJzZShkZWZzKSA6XG4gICAgICAoZGVmcyA9IGNvbnMobGlzdChzeW1ib2wodm9pZCgwKSwgXCJkZWZcIiksIChiaW5kaW5ncyB8fCAwKVswXSwgKGJpbmRpbmdzIHx8IDApWzFdKSwgZGVmcyksIGJpbmRpbmdzID0gcmVzdChyZXN0KGJpbmRpbmdzKSksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShsaXN0KCksIGZvcm0pO1xufTtcbmV4cG9ydHMuZGVmaW5lQmluZGluZ3MgPSBkZWZpbmVCaW5kaW5ncztcblxudmFyIGNvbXBpbGVUaHJvdyA9IGZ1bmN0aW9uIGNvbXBpbGVUaHJvdyhmb3JtKSB7XG4gIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdChcIihmdW5jdGlvbigpIHsgdGhyb3cgfnt9OyB9KSgpXCIsIGNvbXBpbGUobWFjcm9leHBhbmQoZmlyc3QoZm9ybSkpKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZVRocm93ID0gY29tcGlsZVRocm93O1xuXG52YXIgY29tcGlsZVNldCA9IGZ1bmN0aW9uIGNvbXBpbGVTZXQoZm9ybSkge1xuICByZXR1cm4gY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ+e30gPSB+e31cIiwgY29tcGlsZShtYWNyb2V4cGFuZChmaXJzdChmb3JtKSkpLCBjb21waWxlKG1hY3JvZXhwYW5kKHNlY29uZChmb3JtKSkpKSk7XG59O1xuZXhwb3J0cy5jb21waWxlU2V0ID0gY29tcGlsZVNldDtcblxudmFyIGNvbXBpbGVWZWN0b3IgPSBmdW5jdGlvbiBjb21waWxlVmVjdG9yKGZvcm0pIHtcbiAgcmV0dXJuIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwiW357fV1cIiwgY29tcGlsZUdyb3VwKGZvcm0pKSk7XG59O1xuZXhwb3J0cy5jb21waWxlVmVjdG9yID0gY29tcGlsZVZlY3RvcjtcblxudmFyIGNvbXBpbGVUcnkgPSBmdW5jdGlvbiBjb21waWxlVHJ5KGZvcm0pIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHRyeUV4cHJzLCBjYXRjaEV4cHJzLCBmaW5hbGx5RXhwcnMsIGV4cHJzKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShleHBycykgP1xuICAgICAgaXNFbXB0eShjYXRjaEV4cHJzKSA/XG4gICAgICAgIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwiKGZ1bmN0aW9uKCkge1xcbnRyeSB7XFxuICB+e31cXG59IGZpbmFsbHkge1xcbiAgfnt9XFxufX0pKClcIiwgY29tcGlsZUZuQm9keSh0cnlFeHBycyksIGNvbXBpbGVGbkJvZHkoZmluYWxseUV4cHJzKSkpIDpcbiAgICAgIGlzRW1wdHkoZmluYWxseUV4cHJzKSA/XG4gICAgICAgIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwiKGZ1bmN0aW9uKCkge1xcbnRyeSB7XFxuICB+e31cXG59IGNhdGNoICh+e30pIHtcXG4gIH57fVxcbn19KSgpXCIsIGNvbXBpbGVGbkJvZHkodHJ5RXhwcnMpLCBjb21waWxlKGZpcnN0KGNhdGNoRXhwcnMpKSwgY29tcGlsZUZuQm9keShyZXN0KGNhdGNoRXhwcnMpKSkpIDpcbiAgICAgICAgY29tcGlsZVRlbXBsYXRlKGxpc3QoXCIoZnVuY3Rpb24oKSB7XFxudHJ5IHtcXG4gIH57fVxcbn0gY2F0Y2ggKH57fSkge1xcbiAgfnt9XFxufSBmaW5hbGx5IHtcXG4gIH57fVxcbn19KSgpXCIsIGNvbXBpbGVGbkJvZHkodHJ5RXhwcnMpLCBjb21waWxlKGZpcnN0KGNhdGNoRXhwcnMpKSwgY29tcGlsZUZuQm9keShyZXN0KGNhdGNoRXhwcnMpKSwgY29tcGlsZUZuQm9keShmaW5hbGx5RXhwcnMpKSkgOlxuICAgIGlzRXF1YWwoZmlyc3QoZmlyc3QoZXhwcnMpKSwgc3ltYm9sKHZvaWQoMCksIFwiY2F0Y2hcIikpID9cbiAgICAgICh0cnlFeHBycyA9IHRyeUV4cHJzLCBjYXRjaEV4cHJzID0gcmVzdChmaXJzdChleHBycykpLCBmaW5hbGx5RXhwcnMgPSBmaW5hbGx5RXhwcnMsIGV4cHJzID0gcmVzdChleHBycyksIGxvb3ApIDpcbiAgICBpc0VxdWFsKGZpcnN0KGZpcnN0KGV4cHJzKSksIHN5bWJvbCh2b2lkKDApLCBcImZpbmFsbHlcIikpID9cbiAgICAgICh0cnlFeHBycyA9IHRyeUV4cHJzLCBjYXRjaEV4cHJzID0gY2F0Y2hFeHBycywgZmluYWxseUV4cHJzID0gcmVzdChmaXJzdChleHBycykpLCBleHBycyA9IHJlc3QoZXhwcnMpLCBsb29wKSA6XG4gICAgICAodHJ5RXhwcnMgPSBjb25zKGZpcnN0KGV4cHJzKSwgdHJ5RXhwcnMpLCBjYXRjaEV4cHJzID0gY2F0Y2hFeHBycywgZmluYWxseUV4cHJzID0gZmluYWxseUV4cHJzLCBleHBycyA9IHJlc3QoZXhwcnMpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkobGlzdCgpLCBsaXN0KCksIGxpc3QoKSwgcmV2ZXJzZShmb3JtKSk7XG59O1xuZXhwb3J0cy5jb21waWxlVHJ5ID0gY29tcGlsZVRyeTtcblxudmFyIGNvbXBpbGVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGNvbXBpbGVQcm9wZXJ0eShmb3JtKSB7XG4gIHJldHVybiAobmFtZShzZWNvbmQoZm9ybSkpKVswXSA9PT0gXCItXCIgP1xuICAgIGNvbXBpbGVUZW1wbGF0ZShsaXN0KGlzTGlzdChmaXJzdChmb3JtKSkgP1xuICAgICAgXCIofnt9KS5+e31cIiA6XG4gICAgICBcIn57fS5+e31cIiwgY29tcGlsZShtYWNyb2V4cGFuZChmaXJzdChmb3JtKSkpLCBjb21waWxlKG1hY3JvZXhwYW5kKHN5bWJvbChzdWJzKG5hbWUoc2Vjb25kKGZvcm0pKSwgMSkpKSkpKSA6XG4gICAgY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ+e30ufnt9KH57fSlcIiwgY29tcGlsZShtYWNyb2V4cGFuZChmaXJzdChmb3JtKSkpLCBjb21waWxlKG1hY3JvZXhwYW5kKHNlY29uZChmb3JtKSkpLCBjb21waWxlR3JvdXAocmVzdChyZXN0KGZvcm0pKSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVQcm9wZXJ0eSA9IGNvbXBpbGVQcm9wZXJ0eTtcblxudmFyIGNvbXBpbGVBcHBseSA9IGZ1bmN0aW9uIGNvbXBpbGVBcHBseShmb3JtKSB7XG4gIHJldHVybiBjb21waWxlKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiLlwiKSwgZmlyc3QoZm9ybSksIHN5bWJvbCh2b2lkKDApLCBcImFwcGx5XCIpLCBmaXJzdChmb3JtKSwgc2Vjb25kKGZvcm0pKSk7XG59O1xuZXhwb3J0cy5jb21waWxlQXBwbHkgPSBjb21waWxlQXBwbHk7XG5cbnZhciBjb21waWxlTmV3ID0gZnVuY3Rpb24gY29tcGlsZU5ldyhmb3JtKSB7XG4gIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdChcIm5ldyB+e31cIiwgY29tcGlsZShmb3JtKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZU5ldyA9IGNvbXBpbGVOZXc7XG5cbnZhciBjb21waWxlQWdldCA9IGZ1bmN0aW9uIGNvbXBpbGVBZ2V0KGZvcm0pIHtcbiAgdmFyIHRhcmdldCA9IG1hY3JvZXhwYW5kKGZpcnN0KGZvcm0pKTtcbiAgdmFyIGF0dHJpYnV0ZSA9IG1hY3JvZXhwYW5kKHNlY29uZChmb3JtKSk7XG4gIHZhciBub3RGb3VuZCA9IHRoaXJkKGZvcm0pO1xuICB2YXIgdGVtcGxhdGUgPSBpc0xpc3QodGFyZ2V0KSA/XG4gICAgXCIofnt9KVt+e31dXCIgOlxuICAgIFwifnt9W357fV1cIjtcbiAgcmV0dXJuIG5vdEZvdW5kID9cbiAgICBjb21waWxlKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwib3JcIiksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZ2V0XCIpLCBmaXJzdChmb3JtKSwgc2Vjb25kKGZvcm0pKSwgbWFjcm9leHBhbmQobm90Rm91bmQpKSkgOlxuICAgIGNvbXBpbGVUZW1wbGF0ZShsaXN0KHRlbXBsYXRlLCBjb21waWxlKHRhcmdldCksIGNvbXBpbGUoYXR0cmlidXRlKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZUFnZXQgPSBjb21waWxlQWdldDtcblxudmFyIGNvbXBpbGVHZXQgPSBmdW5jdGlvbiBjb21waWxlR2V0KGZvcm0pIHtcbiAgcmV0dXJuIGNvbXBpbGVBZ2V0KGNvbnMobGlzdChzeW1ib2wodm9pZCgwKSwgXCJvclwiKSwgZmlyc3QoZm9ybSksIDApLCByZXN0KGZvcm0pKSk7XG59O1xuZXhwb3J0cy5jb21waWxlR2V0ID0gY29tcGlsZUdldDtcblxudmFyIGNvbXBpbGVJbnN0YW5jZSA9IGZ1bmN0aW9uIGNvbXBpbGVJbnN0YW5jZShmb3JtKSB7XG4gIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdChcIn57fSBpbnN0YW5jZW9mIH57fVwiLCBjb21waWxlKG1hY3JvZXhwYW5kKHNlY29uZChmb3JtKSkpLCBjb21waWxlKG1hY3JvZXhwYW5kKGZpcnN0KGZvcm0pKSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVJbnN0YW5jZSA9IGNvbXBpbGVJbnN0YW5jZTtcblxudmFyIGNvbXBpbGVOb3QgPSBmdW5jdGlvbiBjb21waWxlTm90KGZvcm0pIHtcbiAgcmV0dXJuIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwiISh+e30pXCIsIGNvbXBpbGUobWFjcm9leHBhbmQoZmlyc3QoZm9ybSkpKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZU5vdCA9IGNvbXBpbGVOb3Q7XG5cbnZhciBjb21waWxlTG9vcCA9IGZ1bmN0aW9uIGNvbXBpbGVMb29wKGZvcm0pIHtcbiAgdmFyIGJpbmRpbmdzID0gKGZ1bmN0aW9uIGxvb3AobmFtZXMsIHZhbHVlcywgdG9rZW5zKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eSh0b2tlbnMpID9cbiAgICAgIHtcbiAgICAgICAgXCJuYW1lc1wiOiBuYW1lcyxcbiAgICAgICAgXCJ2YWx1ZXNcIjogdmFsdWVzXG4gICAgICB9IDpcbiAgICAgIChuYW1lcyA9IGNvbmoobmFtZXMsIGZpcnN0KHRva2VucykpLCB2YWx1ZXMgPSBjb25qKHZhbHVlcywgc2Vjb25kKHRva2VucykpLCB0b2tlbnMgPSByZXN0KHJlc3QodG9rZW5zKSksIGxvb3ApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlY3VyO1xuICB9KShbXSwgW10sIGZpcnN0KGZvcm0pKTtcbiAgdmFyIG5hbWVzID0gKGJpbmRpbmdzIHx8IDApW1wibmFtZXNcIl07XG4gIHZhciB2YWx1ZXMgPSAoYmluZGluZ3MgfHwgMClbXCJ2YWx1ZXNcIl07XG4gIHZhciBib2R5ID0gcmVzdChmb3JtKTtcbiAgcmV0dXJuIGNvbXBpbGUoY29ucyhjb25zKHN5bWJvbCh2b2lkKDApLCBcImZuXCIpLCBjb25zKHN5bWJvbCh2b2lkKDApLCBcImxvb3BcIiksIGNvbnMobmFtZXMsIGNvbXBpbGVSZWN1cihuYW1lcywgYm9keSkpKSksIGxpc3QuYXBwbHkobGlzdCwgdmFsdWVzKSkpO1xufTtcbmV4cG9ydHMuY29tcGlsZUxvb3AgPSBjb21waWxlTG9vcDtcblxudmFyIHJlYmluZEJpbmRpbmdzID0gZnVuY3Rpb24gcmViaW5kQmluZGluZ3MobmFtZXMsIHZhbHVlcykge1xuICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AocmVzdWx0LCBuYW1lcywgdmFsdWVzKSB7XG4gICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICB3aGlsZSAocmVjdXIgPT09IGxvb3ApIHtcbiAgICAgIHJlY3VyID0gaXNFbXB0eShuYW1lcykgP1xuICAgICAgcmV2ZXJzZShyZXN1bHQpIDpcbiAgICAgIChyZXN1bHQgPSBjb25zKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwic2V0IVwiKSwgZmlyc3QobmFtZXMpLCBmaXJzdCh2YWx1ZXMpKSwgcmVzdWx0KSwgbmFtZXMgPSByZXN0KG5hbWVzKSwgdmFsdWVzID0gcmVzdCh2YWx1ZXMpLCBsb29wKTtcbiAgICB9O1xuICAgIHJldHVybiByZWN1cjtcbiAgfSkobGlzdCgpLCBuYW1lcywgdmFsdWVzKTtcbn07XG5leHBvcnRzLnJlYmluZEJpbmRpbmdzID0gcmViaW5kQmluZGluZ3M7XG5cbnZhciBleHBhbmRSZWN1ciA9IGZ1bmN0aW9uIGV4cGFuZFJlY3VyKG5hbWVzLCBib2R5KSB7XG4gIHJldHVybiBtYXAoZnVuY3Rpb24oZm9ybSkge1xuICAgIHJldHVybiBpc0xpc3QoZm9ybSkgP1xuICAgICAgaXNFcXVhbChmaXJzdChmb3JtKSwgc3ltYm9sKHZvaWQoMCksIFwicmVjdXJcIikpID9cbiAgICAgICAgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJyYXcqXCIpLCBjb21waWxlR3JvdXAoY29uY2F0KHJlYmluZEJpbmRpbmdzKG5hbWVzLCByZXN0KGZvcm0pKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJsb29wXCIpKSksIHRydWUpKSA6XG4gICAgICAgIGV4cGFuZFJlY3VyKG5hbWVzLCBmb3JtKSA6XG4gICAgICBmb3JtO1xuICB9LCBib2R5KTtcbn07XG5leHBvcnRzLmV4cGFuZFJlY3VyID0gZXhwYW5kUmVjdXI7XG5cbnZhciBjb21waWxlUmVjdXIgPSBmdW5jdGlvbiBjb21waWxlUmVjdXIobmFtZXMsIGJvZHkpIHtcbiAgcmV0dXJuIGxpc3QobGlzdChzeW1ib2wodm9pZCgwKSwgXCJyYXcqXCIpLCBjb21waWxlVGVtcGxhdGUobGlzdChcInZhciByZWN1ciA9IGxvb3A7XFxud2hpbGUgKHJlY3VyID09PSBsb29wKSB7XFxuICByZWN1ciA9IH57fVxcbn1cIiwgY29tcGlsZVN0YXRlbWVudHMoZXhwYW5kUmVjdXIobmFtZXMsIGJvZHkpKSkpKSwgc3ltYm9sKHZvaWQoMCksIFwicmVjdXJcIikpO1xufTtcbmV4cG9ydHMuY29tcGlsZVJlY3VyID0gY29tcGlsZVJlY3VyO1xuXG52YXIgY29tcGlsZVJhdyA9IGZ1bmN0aW9uIGNvbXBpbGVSYXcoZm9ybSkge1xuICByZXR1cm4gZmlyc3QoZm9ybSk7XG59O1xuZXhwb3J0cy5jb21waWxlUmF3ID0gY29tcGlsZVJhdztcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwic2V0IVwiKSwgY29tcGlsZVNldCk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcImdldFwiKSwgY29tcGlsZUdldCk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcImFnZXRcIiksIGNvbXBpbGVBZ2V0KTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwiZGVmXCIpLCBjb21waWxlRGVmKTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwiaWZcIiksIGNvbXBpbGVJZkVsc2UpO1xuXG5pbnN0YWxsU3BlY2lhbChzeW1ib2wodm9pZCgwKSwgXCJkb1wiKSwgY29tcGlsZURvKTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwiZG8qXCIpLCBjb21waWxlU3RhdGVtZW50cyk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcImZuXCIpLCBjb21waWxlRm4pO1xuXG5pbnN0YWxsU3BlY2lhbChzeW1ib2wodm9pZCgwKSwgXCJ0aHJvd1wiKSwgY29tcGlsZVRocm93KTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwidmVjdG9yXCIpLCBjb21waWxlVmVjdG9yKTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwidHJ5XCIpLCBjb21waWxlVHJ5KTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwiLlwiKSwgY29tcGlsZVByb3BlcnR5KTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwiYXBwbHlcIiksIGNvbXBpbGVBcHBseSk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcIm5ld1wiKSwgY29tcGlsZU5ldyk7XG5cbmluc3RhbGxTcGVjaWFsKHN5bWJvbCh2b2lkKDApLCBcImluc3RhbmNlP1wiKSwgY29tcGlsZUluc3RhbmNlKTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwibm90XCIpLCBjb21waWxlTm90KTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwibG9vcFwiKSwgY29tcGlsZUxvb3ApO1xuXG5pbnN0YWxsU3BlY2lhbChzeW1ib2wodm9pZCgwKSwgXCJyYXcqXCIpLCBjb21waWxlUmF3KTtcblxuaW5zdGFsbFNwZWNpYWwoc3ltYm9sKHZvaWQoMCksIFwiY29tbWVudFwiKSwgd3JpdGVDb21tZW50KTtcblxudmFyIGNvbXBpbGVSZVBhdHRlcm4gPSBmdW5jdGlvbiBjb21waWxlUmVQYXR0ZXJuKGZvcm0pIHtcbiAgcmV0dXJuIFwiXCIgKyBmb3JtO1xufTtcbmV4cG9ydHMuY29tcGlsZVJlUGF0dGVybiA9IGNvbXBpbGVSZVBhdHRlcm47XG5cbnZhciBpbnN0YWxsTmF0aXZlID0gZnVuY3Rpb24gaW5zdGFsbE5hdGl2ZShhbGlhcywgb3BlcmF0b3IsIHZhbGlkYXRvciwgZmFsbGJhY2spIHtcbiAgcmV0dXJuIGluc3RhbGxTcGVjaWFsKGFsaWFzLCBmdW5jdGlvbihmb3JtKSB7XG4gICAgcmV0dXJuIGlzRW1wdHkoZm9ybSkgP1xuICAgICAgZmFsbGJhY2sgOlxuICAgICAgcmVkdWNlKGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHJldHVybiBjb21waWxlVGVtcGxhdGUobGlzdChcIn57fSB+e30gfnt9XCIsIGxlZnQsIG5hbWUob3BlcmF0b3IpLCByaWdodCkpO1xuICAgICAgfSwgbWFwKGZ1bmN0aW9uKG9wZXJhbmQpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBpbGVUZW1wbGF0ZShsaXN0KGlzTGlzdChvcGVyYW5kKSA/XG4gICAgICAgICAgXCIofnt9KVwiIDpcbiAgICAgICAgICBcIn57fVwiLCBjb21waWxlKG1hY3JvZXhwYW5kKG9wZXJhbmQpKSkpO1xuICAgICAgfSwgZm9ybSkpO1xuICB9LCB2YWxpZGF0b3IpO1xufTtcbmV4cG9ydHMuaW5zdGFsbE5hdGl2ZSA9IGluc3RhbGxOYXRpdmU7XG5cbnZhciBpbnN0YWxsT3BlcmF0b3IgPSBmdW5jdGlvbiBpbnN0YWxsT3BlcmF0b3IoYWxpYXMsIG9wZXJhdG9yKSB7XG4gIHJldHVybiBpbnN0YWxsU3BlY2lhbChhbGlhcywgZnVuY3Rpb24oZm9ybSkge1xuICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcChyZXN1bHQsIGxlZnQsIHJpZ2h0LCBvcGVyYW5kcykge1xuICAgICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgICByZWN1ciA9IGlzRW1wdHkob3BlcmFuZHMpID9cbiAgICAgICAgXCJcIiArIHJlc3VsdCArIChjb21waWxlVGVtcGxhdGUobGlzdChcIn57fSB+e30gfnt9XCIsIGNvbXBpbGUobWFjcm9leHBhbmQobGVmdCkpLCBuYW1lKG9wZXJhdG9yKSwgY29tcGlsZShtYWNyb2V4cGFuZChyaWdodCkpKSkpIDpcbiAgICAgICAgKHJlc3VsdCA9IFwiXCIgKyByZXN1bHQgKyAoY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ+e30gfnt9IH57fSAmJiBcIiwgY29tcGlsZShtYWNyb2V4cGFuZChsZWZ0KSksIG5hbWUob3BlcmF0b3IpLCBjb21waWxlKG1hY3JvZXhwYW5kKHJpZ2h0KSkpKSksIGxlZnQgPSByaWdodCwgcmlnaHQgPSBmaXJzdChvcGVyYW5kcyksIG9wZXJhbmRzID0gcmVzdChvcGVyYW5kcyksIGxvb3ApO1xuICAgICAgfTtcbiAgICAgIHJldHVybiByZWN1cjtcbiAgICB9KShcIlwiLCBmaXJzdChmb3JtKSwgc2Vjb25kKGZvcm0pLCByZXN0KHJlc3QoZm9ybSkpKTtcbiAgfSwgdmVyaWZ5VHdvKTtcbn07XG5leHBvcnRzLmluc3RhbGxPcGVyYXRvciA9IGluc3RhbGxPcGVyYXRvcjtcblxudmFyIGNvbXBpbGVyRXJyb3IgPSBmdW5jdGlvbiBjb21waWxlckVycm9yKGZvcm0sIG1lc3NhZ2UpIHtcbiAgdmFyIGVycm9yID0gRXJyb3IoXCJcIiArIG1lc3NhZ2UpO1xuICBlcnJvci5saW5lID0gMTtcbiAgcmV0dXJuIChmdW5jdGlvbigpIHsgdGhyb3cgZXJyb3I7IH0pKCk7XG59O1xuZXhwb3J0cy5jb21waWxlckVycm9yID0gY29tcGlsZXJFcnJvcjtcblxudmFyIHZlcmlmeVR3byA9IGZ1bmN0aW9uIHZlcmlmeVR3byhmb3JtKSB7XG4gIHJldHVybiAoaXNFbXB0eShyZXN0KGZvcm0pKSkgfHwgKGlzRW1wdHkocmVzdChyZXN0KGZvcm0pKSkpID9cbiAgICAoZnVuY3Rpb24oKSB7IHRocm93IGNvbXBpbGVyRXJyb3IoZm9ybSwgXCJcIiArIChmaXJzdChmb3JtKSkgKyBcIiBmb3JtIHJlcXVpcmVzIGF0IGxlYXN0IHR3byBvcGVyYW5kc1wiKTsgfSkoKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLnZlcmlmeVR3byA9IHZlcmlmeVR3bztcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCIrXCIpLCBzeW1ib2wodm9pZCgwKSwgXCIrXCIpLCB2b2lkKDApLCAwKTtcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCItXCIpLCBzeW1ib2wodm9pZCgwKSwgXCItXCIpLCB2b2lkKDApLCBcIk5hTlwiKTtcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCIqXCIpLCBzeW1ib2wodm9pZCgwKSwgXCIqXCIpLCB2b2lkKDApLCAxKTtcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCIvXCIpLCBzeW1ib2wodm9pZCgwKSwgXCIvXCIpLCB2ZXJpZnlUd28pO1xuXG5pbnN0YWxsTmF0aXZlKHN5bWJvbCh2b2lkKDApLCBcIm1vZFwiKSwgc3ltYm9sKFwiJVwiKSwgdmVyaWZ5VHdvKTtcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCJhbmRcIiksIHN5bWJvbCh2b2lkKDApLCBcIiYmXCIpKTtcblxuaW5zdGFsbE5hdGl2ZShzeW1ib2wodm9pZCgwKSwgXCJvclwiKSwgc3ltYm9sKHZvaWQoMCksIFwifHxcIikpO1xuXG5pbnN0YWxsT3BlcmF0b3Ioc3ltYm9sKHZvaWQoMCksIFwibm90PVwiKSwgc3ltYm9sKHZvaWQoMCksIFwiIT1cIikpO1xuXG5pbnN0YWxsT3BlcmF0b3Ioc3ltYm9sKHZvaWQoMCksIFwiPT1cIiksIHN5bWJvbCh2b2lkKDApLCBcIj09PVwiKSk7XG5cbmluc3RhbGxPcGVyYXRvcihzeW1ib2wodm9pZCgwKSwgXCJpZGVudGljYWw/XCIpLCBzeW1ib2wodm9pZCgwKSwgXCI9PT1cIikpO1xuXG5pbnN0YWxsT3BlcmF0b3Ioc3ltYm9sKHZvaWQoMCksIFwiPlwiKSwgc3ltYm9sKHZvaWQoMCksIFwiPlwiKSk7XG5cbmluc3RhbGxPcGVyYXRvcihzeW1ib2wodm9pZCgwKSwgXCI+PVwiKSwgc3ltYm9sKHZvaWQoMCksIFwiPj1cIikpO1xuXG5pbnN0YWxsT3BlcmF0b3Ioc3ltYm9sKHZvaWQoMCksIFwiPFwiKSwgc3ltYm9sKHZvaWQoMCksIFwiPFwiKSk7XG5cbmluc3RhbGxPcGVyYXRvcihzeW1ib2wodm9pZCgwKSwgXCI8PVwiKSwgc3ltYm9sKHZvaWQoMCksIFwiPD1cIikpO1xuXG5pbnN0YWxsTmF0aXZlKHN5bWJvbCh2b2lkKDApLCBcImJpdC1hbmRcIiksIHN5bWJvbCh2b2lkKDApLCBcIiZcIiksIHZlcmlmeVR3byk7XG5cbmluc3RhbGxOYXRpdmUoc3ltYm9sKHZvaWQoMCksIFwiYml0LW9yXCIpLCBzeW1ib2wodm9pZCgwKSwgXCJ8XCIpLCB2ZXJpZnlUd28pO1xuXG5pbnN0YWxsTmF0aXZlKHN5bWJvbCh2b2lkKDApLCBcImJpdC14b3JcIiksIHN5bWJvbChcIl5cIikpO1xuXG5pbnN0YWxsTmF0aXZlKHN5bWJvbCh2b2lkKDApLCBcImJpdC1ub3RcIiksIHN5bWJvbChcIn5cIiksIHZlcmlmeVR3byk7XG5cbmluc3RhbGxOYXRpdmUoc3ltYm9sKHZvaWQoMCksIFwiYml0LXNoaWZ0LWxlZnRcIiksIHN5bWJvbCh2b2lkKDApLCBcIjw8XCIpLCB2ZXJpZnlUd28pO1xuXG5pbnN0YWxsTmF0aXZlKHN5bWJvbCh2b2lkKDApLCBcImJpdC1zaGlmdC1yaWdodFwiKSwgc3ltYm9sKHZvaWQoMCksIFwiPj5cIiksIHZlcmlmeVR3byk7XG5cbmluc3RhbGxOYXRpdmUoc3ltYm9sKHZvaWQoMCksIFwiYml0LXNoaWZ0LXJpZ2h0LXplcm8tZmlsXCIpLCBzeW1ib2wodm9pZCgwKSwgXCI+Pj5cIiksIHZlcmlmeVR3byk7XG5cbmluc3RhbGxNYWNybyhzeW1ib2wodm9pZCgwKSwgXCJzdHJcIiksIGZ1bmN0aW9uIHN0cigpIHtcbiAgdmFyIGZvcm1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGNvbmNhdChsaXN0KHN5bWJvbCh2b2lkKDApLCBcIitcIiksIFwiXCIpLCBmb3Jtcyk7XG59KTtcblxuaW5zdGFsbE1hY3JvKHN5bWJvbCh2b2lkKDApLCBcImxldFwiKSwgZnVuY3Rpb24gbGV0TWFjcm8oYmluZGluZ3MpIHtcbiAgdmFyIGJvZHkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICByZXR1cm4gY29ucyhzeW1ib2wodm9pZCgwKSwgXCJkb1wiKSwgY29uY2F0KGRlZmluZUJpbmRpbmdzKGJpbmRpbmdzKSwgYm9keSkpO1xufSk7XG5cbmluc3RhbGxNYWNybyhzeW1ib2wodm9pZCgwKSwgXCJjb25kXCIpLCBmdW5jdGlvbiBjb25kKCkge1xuICB2YXIgY2xhdXNlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiAhKGlzRW1wdHkoY2xhdXNlcykpID9cbiAgICBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImlmXCIpLCBmaXJzdChjbGF1c2VzKSwgaXNFbXB0eShyZXN0KGNsYXVzZXMpKSA/XG4gICAgICAoZnVuY3Rpb24oKSB7IHRocm93IEVycm9yKFwiY29uZCByZXF1aXJlcyBhbiBldmVuIG51bWJlciBvZiBmb3Jtc1wiKTsgfSkoKSA6XG4gICAgICBzZWNvbmQoY2xhdXNlcyksIGNvbnMoc3ltYm9sKHZvaWQoMCksIFwiY29uZFwiKSwgcmVzdChyZXN0KGNsYXVzZXMpKSkpIDpcbiAgICB2b2lkKDApO1xufSk7XG5cbmluc3RhbGxNYWNybyhzeW1ib2wodm9pZCgwKSwgXCJkZWZuXCIpLCBmdW5jdGlvbiBkZWZuKG5hbWUpIHtcbiAgdmFyIGJvZHkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICByZXR1cm4gbGlzdChzeW1ib2wodm9pZCgwKSwgXCJkZWZcIiksIG5hbWUsIGNvbmNhdChsaXN0KHN5bWJvbCh2b2lkKDApLCBcImZuXCIpLCBuYW1lKSwgYm9keSkpO1xufSk7XG5cbmluc3RhbGxNYWNybyhzeW1ib2wodm9pZCgwKSwgXCJkZWZuLVwiKSwgZnVuY3Rpb24gZGVmbihuYW1lKSB7XG4gIHZhciBib2R5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgcmV0dXJuIGNvbmNhdChsaXN0KHN5bWJvbCh2b2lkKDApLCBcImRlZm5cIiksIHdpdGhNZXRhKG5hbWUsIGNvbmooe1xuICAgIFwicHJpdmF0ZVwiOiB0cnVlXG4gIH0sIG1ldGEobmFtZSkpKSksIGJvZHkpO1xufSk7XG5cbmluc3RhbGxNYWNybyhzeW1ib2wodm9pZCgwKSwgXCJhc3NlcnRcIiksIGZ1bmN0aW9uIGFzc2VydCh4LCBtZXNzYWdlKSB7XG4gIHZhciB0aXRsZSA9IG1lc3NhZ2UgfHwgXCJcIjtcbiAgdmFyIGFzc2VydGlvbiA9IHByU3RyKHgpO1xuICB2YXIgdXJpID0gKHggfHwgMClbXCJ1cmlcIl07XG4gIHZhciBmb3JtID0gaXNMaXN0KHgpID9cbiAgICBzZWNvbmQoeCkgOlxuICAgIHg7XG4gIHJldHVybiBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImRvXCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImlmXCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImFuZFwiKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJub3RcIiksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiaWRlbnRpY2FsP1wiKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJ0eXBlb2ZcIiksIHN5bWJvbCh2b2lkKDApLCBcIioqdmVyYm9zZSoqXCIpKSwgXCJ1bmRlZmluZWRcIikpLCBzeW1ib2wodm9pZCgwKSwgXCIqKnZlcmJvc2UqKlwiKSksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiLmxvZ1wiKSwgc3ltYm9sKHZvaWQoMCksIFwiY29uc29sZVwiKSwgXCJBc3NlcnQ6XCIsIGFzc2VydGlvbikpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImlmXCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcIm5vdFwiKSwgeCksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwidGhyb3dcIiksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiRXJyb3IuXCIpLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInN0clwiKSwgXCJBc3NlcnQgZmFpbGVkOiBcIiwgdGl0bGUsIFwiXFxuXFxuQXNzZXJ0aW9uOlxcblxcblwiLCBhc3NlcnRpb24sIFwiXFxuXFxuQWN0dWFsOlxcblxcblwiLCBmb3JtLCBcIlxcbi0tLS0tLS0tLS0tLS0tXFxuXCIpLCB1cmkpKSkpO1xufSk7XG5cbnZhciBwYXJzZVJlZmVyZW5jZXMgPSBmdW5jdGlvbiBwYXJzZVJlZmVyZW5jZXMoZm9ybXMpIHtcbiAgcmV0dXJuIHJlZHVjZShmdW5jdGlvbihyZWZlcmVuY2VzLCBmb3JtKSB7XG4gICAgaXNTZXEoZm9ybSkgP1xuICAgICAgKHJlZmVyZW5jZXMgfHwgMClbbmFtZShmaXJzdChmb3JtKSldID0gdmVjKHJlc3QoZm9ybSkpIDpcbiAgICAgIHZvaWQoMCk7XG4gICAgcmV0dXJuIHJlZmVyZW5jZXM7XG4gIH0sIHt9LCBmb3Jtcyk7XG59O1xuZXhwb3J0cy5wYXJzZVJlZmVyZW5jZXMgPSBwYXJzZVJlZmVyZW5jZXM7XG5cbnZhciBwYXJzZVJlcXVpcmUgPSBmdW5jdGlvbiBwYXJzZVJlcXVpcmUoZm9ybSkge1xuICB2YXIgcmVxdWlyZW1lbnQgPSBpc1N5bWJvbChmb3JtKSA/XG4gICAgW2Zvcm1dIDpcbiAgICB2ZWMoZm9ybSk7XG4gIHZhciBpZCA9IGZpcnN0KHJlcXVpcmVtZW50KTtcbiAgdmFyIHBhcmFtcyA9IGRpY3Rpb25hcnkuYXBwbHkoZGljdGlvbmFyeSwgcmVzdChyZXF1aXJlbWVudCkpO1xuICB2YXIgaW1wb3J0cyA9IHJlZHVjZShmdW5jdGlvbihpbXBvcnRzLCBuYW1lKSB7XG4gICAgKGltcG9ydHMgfHwgMClbbmFtZV0gPSAoKGltcG9ydHMgfHwgMClbbmFtZV0pIHx8IG5hbWU7XG4gICAgcmV0dXJuIGltcG9ydHM7XG4gIH0sIGNvbmooe30sIChwYXJhbXMgfHwgMClbXCLqnolyZW5hbWVcIl0pLCAocGFyYW1zIHx8IDApW1wi6p6JcmVmZXJcIl0pO1xuICByZXR1cm4gY29uaih7XG4gICAgXCJpZFwiOiBpZCxcbiAgICBcImltcG9ydHNcIjogaW1wb3J0c1xuICB9LCBwYXJhbXMpO1xufTtcbmV4cG9ydHMucGFyc2VSZXF1aXJlID0gcGFyc2VSZXF1aXJlO1xuXG52YXIgYW5hbHl6ZU5zID0gZnVuY3Rpb24gYW5hbHl6ZU5zKGZvcm0pIHtcbiAgdmFyIGlkID0gZmlyc3QoZm9ybSk7XG4gIHZhciBwYXJhbXMgPSByZXN0KGZvcm0pO1xuICB2YXIgZG9jID0gaXNTdHJpbmcoZmlyc3QocGFyYW1zKSkgP1xuICAgIGZpcnN0KHBhcmFtcykgOlxuICAgIHZvaWQoMCk7XG4gIHZhciByZWZlcmVuY2VzID0gcGFyc2VSZWZlcmVuY2VzKGRvYyA/XG4gICAgcmVzdChwYXJhbXMpIDpcbiAgICBwYXJhbXMpO1xuICByZXR1cm4gd2l0aE1ldGEoZm9ybSwge1xuICAgIFwiaWRcIjogaWQsXG4gICAgXCJkb2NcIjogZG9jLFxuICAgIFwicmVxdWlyZVwiOiAocmVmZXJlbmNlcyB8fCAwKVtcInJlcXVpcmVcIl0gP1xuICAgICAgbWFwKHBhcnNlUmVxdWlyZSwgKHJlZmVyZW5jZXMgfHwgMClbXCJyZXF1aXJlXCJdKSA6XG4gICAgICB2b2lkKDApXG4gIH0pO1xufTtcbmV4cG9ydHMuYW5hbHl6ZU5zID0gYW5hbHl6ZU5zO1xuXG52YXIgaWRUb05zID0gZnVuY3Rpb24gaWRUb05zKGlkKSB7XG4gIHJldHVybiBzeW1ib2wodm9pZCgwKSwgam9pbihcIipcIiwgc3BsaXQoXCJcIiArIGlkLCBcIi5cIikpKTtcbn07XG5leHBvcnRzLmlkVG9OcyA9IGlkVG9OcztcblxudmFyIG5hbWVUb0ZpZWxkID0gZnVuY3Rpb24gbmFtZVRvRmllbGQobmFtZSkge1xuICByZXR1cm4gc3ltYm9sKHZvaWQoMCksIFwiXCIgKyBcIi1cIiArIG5hbWUpO1xufTtcbmV4cG9ydHMubmFtZVRvRmllbGQgPSBuYW1lVG9GaWVsZDtcblxudmFyIGNvbXBpbGVJbXBvcnQgPSBmdW5jdGlvbiBjb21waWxlSW1wb3J0KG1vZHVsZSkge1xuICByZXR1cm4gZnVuY3Rpb24oZm9ybSkge1xuICAgIHJldHVybiBsaXN0KHN5bWJvbCh2b2lkKDApLCBcImRlZlwiKSwgc2Vjb25kKGZvcm0pLCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcIi5cIiksIG1vZHVsZSwgbmFtZVRvRmllbGQoZmlyc3QoZm9ybSkpKSk7XG4gIH07XG59O1xuZXhwb3J0cy5jb21waWxlSW1wb3J0ID0gY29tcGlsZUltcG9ydDtcblxudmFyIGNvbXBpbGVSZXF1aXJlID0gZnVuY3Rpb24gY29tcGlsZVJlcXVpcmUocmVxdWlyZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGZvcm0pIHtcbiAgICB2YXIgaWQgPSAoZm9ybSB8fCAwKVtcImlkXCJdO1xuICAgIHZhciByZXF1aXJlbWVudCA9IGlkVG9OcygoKGZvcm0gfHwgMClbXCLqnolhc1wiXSkgfHwgaWQpO1xuICAgIHZhciBwYXRoID0gcmVzb2x2ZShyZXF1aXJlciwgaWQpO1xuICAgIHZhciBpbXBvcnRzID0gKGZvcm0gfHwgMClbXCJpbXBvcnRzXCJdO1xuICAgIHJldHVybiBjb25jYXQoW3N5bWJvbCh2b2lkKDApLCBcImRvKlwiKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCJkZWZcIiksIHJlcXVpcmVtZW50LCBsaXN0KHN5bWJvbCh2b2lkKDApLCBcInJlcXVpcmVcIiksIHBhdGgpKV0sIGltcG9ydHMgP1xuICAgICAgbWFwKGNvbXBpbGVJbXBvcnQocmVxdWlyZW1lbnQpLCBpbXBvcnRzKSA6XG4gICAgICB2b2lkKDApKTtcbiAgfTtcbn07XG5leHBvcnRzLmNvbXBpbGVSZXF1aXJlID0gY29tcGlsZVJlcXVpcmU7XG5cbnZhciByZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZShmcm9tLCB0bykge1xuICB2YXIgcmVxdWlyZXIgPSBzcGxpdChcIlwiICsgZnJvbSwgXCIuXCIpO1xuICB2YXIgcmVxdWlyZW1lbnQgPSBzcGxpdChcIlwiICsgdG8sIFwiLlwiKTtcbiAgdmFyIGlzUmVsYXRpdmUgPSAoIShcIlwiICsgZnJvbSA9PT0gXCJcIiArIHRvKSkgJiYgKGZpcnN0KHJlcXVpcmVyKSA9PT0gZmlyc3QocmVxdWlyZW1lbnQpKTtcbiAgcmV0dXJuIGlzUmVsYXRpdmUgP1xuICAgIChmdW5jdGlvbiBsb29wKGZyb20sIHRvKSB7XG4gICAgICB2YXIgcmVjdXIgPSBsb29wO1xuICAgICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICAgIHJlY3VyID0gZmlyc3QoZnJvbSkgPT09IGZpcnN0KHRvKSA/XG4gICAgICAgIChmcm9tID0gcmVzdChmcm9tKSwgdG8gPSByZXN0KHRvKSwgbG9vcCkgOlxuICAgICAgICBqb2luKFwiL1wiLCBjb25jYXQoW1wiLlwiXSwgcmVwZWF0KGRlYyhjb3VudChmcm9tKSksIFwiLi5cIiksIHRvKSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlY3VyO1xuICAgIH0pKHJlcXVpcmVyLCByZXF1aXJlbWVudCkgOlxuICAgIGpvaW4oXCIvXCIsIHJlcXVpcmVtZW50KTtcbn07XG5leHBvcnRzLnJlc29sdmUgPSByZXNvbHZlO1xuXG52YXIgY29tcGlsZU5zID0gZnVuY3Rpb24gY29tcGlsZU5zKCkge1xuICB2YXIgZm9ybSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1ldGFkYXRhID0gbWV0YShhbmFseXplTnMoZm9ybSkpO1xuICAgIHZhciBpZCA9IFwiXCIgKyAoKG1ldGFkYXRhIHx8IDApW1wiaWRcIl0pO1xuICAgIHZhciBkb2MgPSAobWV0YWRhdGEgfHwgMClbXCJkb2NcIl07XG4gICAgdmFyIHJlcXVpcmVtZW50cyA9IChtZXRhZGF0YSB8fCAwKVtcInJlcXVpcmVcIl07XG4gICAgdmFyIG5zID0gZG9jID9cbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBpZCxcbiAgICAgICAgXCJkb2NcIjogZG9jXG4gICAgICB9IDpcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBpZFxuICAgICAgfTtcbiAgICByZXR1cm4gY29uY2F0KFtzeW1ib2wodm9pZCgwKSwgXCJkbypcIiksIGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwiZGVmXCIpLCBzeW1ib2wodm9pZCgwKSwgXCIqbnMqXCIpLCBucyldLCByZXF1aXJlbWVudHMgP1xuICAgICAgbWFwKGNvbXBpbGVSZXF1aXJlKGlkKSwgcmVxdWlyZW1lbnRzKSA6XG4gICAgICB2b2lkKDApKTtcbiAgfSkoKTtcbn07XG5leHBvcnRzLmNvbXBpbGVOcyA9IGNvbXBpbGVOcztcblxuaW5zdGFsbE1hY3JvKHN5bWJvbCh2b2lkKDApLCBcIm5zXCIpLCBjb21waWxlTnMpO1xuXG5pbnN0YWxsTWFjcm8oc3ltYm9sKHZvaWQoMCksIFwicHJpbnRcIiksIGZ1bmN0aW9uKCkge1xuICB2YXIgbW9yZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIFwiUHJpbnRzIHRoZSBvYmplY3QocykgdG8gdGhlIG91dHB1dCBmb3IgaHVtYW4gY29uc3VtcHRpb24uXCI7XG4gIHJldHVybiBjb25jYXQobGlzdChzeW1ib2wodm9pZCgwKSwgXCIubG9nXCIpLCBzeW1ib2wodm9pZCgwKSwgXCJjb25zb2xlXCIpKSwgbW9yZSk7XG59KSIsInZhciBfbnNfID0ge1xuICBcImlkXCI6IFwid2lzcC5lbmdpbmUuYnJvd3NlclwiXG59O1xudmFyIHdpc3BfcnVudGltZSA9IHJlcXVpcmUoXCIuLy4uL3J1bnRpbWVcIik7XG52YXIgc3RyID0gd2lzcF9ydW50aW1lLnN0cjs7XG52YXIgd2lzcF9zZXF1ZW5jZSA9IHJlcXVpcmUoXCIuLy4uL3NlcXVlbmNlXCIpO1xudmFyIHJlc3QgPSB3aXNwX3NlcXVlbmNlLnJlc3Q7O1xudmFyIHdpc3BfcmVhZGVyID0gcmVxdWlyZShcIi4vLi4vcmVhZGVyXCIpO1xudmFyIHJlYWRGcm9tU3RyaW5nID0gd2lzcF9yZWFkZXIucmVhZEZyb21TdHJpbmc7O1xudmFyIHdpc3BfY29tcGlsZXIgPSByZXF1aXJlKFwiLi8uLi9jb21waWxlclwiKTtcbnZhciBjb21waWxlXyA9IHdpc3BfY29tcGlsZXIuY29tcGlsZV87OztcblxudmFyIGV2YWx1YXRlID0gZnVuY3Rpb24gZXZhbHVhdGUoY29kZSwgdXJsKSB7XG4gIHJldHVybiBldmFsKGNvbXBpbGVfKHJlYWRfKGNvZGUsIHVybCkpKTtcbn07XG5leHBvcnRzLmV2YWx1YXRlID0gZXZhbHVhdGU7XG5cbnZhciBydW4gPSBmdW5jdGlvbiBydW4oY29kZSwgdXJsKSB7XG4gIHJldHVybiAoRnVuY3Rpb24oY29tcGlsZV8ocmVhZF8oY29kZSwgdXJsKSkpKSgpO1xufTtcbmV4cG9ydHMucnVuID0gcnVuO1xuXG52YXIgbG9hZCA9IGZ1bmN0aW9uIGxvYWQodXJsLCBjYWxsYmFjaykge1xuICB2YXIgcmVxdWVzdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA/XG4gICAgbmV3IFhNTEh0dHBSZXF1ZXN0KCkgOlxuICAgIG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XG4gIHJlcXVlc3Qub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUgP1xuICAgIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZShcImFwcGxpY2F0aW9uL3dpc3BcIikgOlxuICAgIHZvaWQoMCk7XG4gIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCA/XG4gICAgICAocmVxdWVzdC5zdGF0dXMgPT09IDApIHx8IChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSA/XG4gICAgICAgIGNhbGxiYWNrKHJ1bihyZXF1ZXN0LnJlc3BvbnNlVGV4dCwgdXJsKSkgOlxuICAgICAgICBjYWxsYmFjayhcIkNvdWxkIG5vdCBsb2FkXCIpIDpcbiAgICAgIHZvaWQoMCk7XG4gIH07XG4gIHJldHVybiByZXF1ZXN0LnNlbmQobnVsbCk7XG59O1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcblxudmFyIHJ1blNjcmlwdHMgPSBmdW5jdGlvbiBydW5TY3JpcHRzKCkge1xuICB2YXIgc2NyaXB0cyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKSwgZnVuY3Rpb24oc2NyaXB0KSB7XG4gICAgcmV0dXJuIHNjcmlwdC50eXBlID09PSBcImFwcGxpY2F0aW9uL3dpc3BcIjtcbiAgfSk7XG4gIHZhciBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICByZXR1cm4gc2NyaXB0cy5sZW5ndGggP1xuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2NyaXB0ID0gc2NyaXB0cy5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gc2NyaXB0LnNyYyA/XG4gICAgICAgICAgbG9hZChzY3JpcHQuc3JjLCBuZXh0KSA6XG4gICAgICAgICAgbmV4dChydW4oc2NyaXB0LmlubmVySFRNTCkpO1xuICAgICAgfSkoKSA6XG4gICAgICB2b2lkKDApO1xuICB9O1xuICByZXR1cm4gbmV4dCgpO1xufTtcbmV4cG9ydHMucnVuU2NyaXB0cyA9IHJ1blNjcmlwdHM7XG5cbihkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHx8IChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpID9cbiAgcnVuU2NyaXB0cygpIDpcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyID9cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHJ1blNjcmlwdHMsIGZhbHNlKSA6XG4gIHdpbmRvdy5hdHRhY2hFdmVudChcIm9ubG9hZFwiLCBydW5TY3JpcHRzKSIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBvbkNoYW5nZShlZGl0b3IpIHtcbiAgbG9jYWxTdG9yYWdlW3dpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiKVswXV0gPSBlZGl0b3IuZ2V0VmFsdWUoKVxufVxuXG5mdW5jdGlvbiBzZXR1cChlZGl0b3IsIHZhbHVlKSB7XG4gIC8qKlxuICBUYWtlcyBlZGl0b3IgYW5kIGVuYWJsZXMgcGVyc2lzdHMgY2hhbmdlcyB0byB0aGUgYnVmZmVyIGFjcm9zcyB0aGUgc2Vzc2lvbnMuXG4gICoqL1xuICBpZiAodmFsdWUpIHtcbiAgICB2YXIgYWRkcmVzcyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiKVswXVxuICAgIHZhciBwZXJzaXN0ZWQgPSBsb2NhbFN0b3JhZ2VbYWRkcmVzc10gfHwgZWRpdG9yLmdldFZhbHVlKClcbiAgICBlZGl0b3Iuc2V0VmFsdWUocGVyc2lzdGVkKVxuICAgIGVkaXRvci5vbihcImNoYW5nZVwiLCBvbkNoYW5nZSlcbiAgfSBlbHNlIHtcbiAgICBlZGl0b3Iub2ZmKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKVxuICB9XG59XG5cbmZ1bmN0aW9uIHBsdWdpbihDb2RlTWlycm9yKSB7XG4gIENvZGVNaXJyb3IuZGVmaW5lT3B0aW9uKFwicGVyc2lzdFwiLCBmYWxzZSwgc2V0dXApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGx1Z2luXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFjdGl2ZUxpbmUgPSBcImxpbmVAYWN0aXZpbmVcIlxuXG5mdW5jdGlvbiBvbkN1cnNvckFjdGl2aXR5KGVkaXRvcikge1xuICB2YXIgbGluZSA9IGVkaXRvci5nZXRMaW5lSGFuZGxlKGVkaXRvci5nZXRDdXJzb3IoKS5saW5lKVxuICB2YXIgYWN0aXZlID0gZWRpdG9yW2FjdGl2ZUxpbmVdXG4gIGlmIChsaW5lICE9IGFjdGl2ZSkge1xuICAgIGVkaXRvci5yZW1vdmVMaW5lQ2xhc3MoYWN0aXZlLCBcImJhY2tncm91bmRcIiwgXCJhY3RpdmVsaW5lXCIpXG4gICAgZWRpdG9yW2FjdGl2ZUxpbmVdID0gZWRpdG9yLmFkZExpbmVDbGFzcyhsaW5lLCBcImJhY2tncm91bmRcIiwgXCJhY3RpdmVsaW5lXCIpXG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0dXAoZWRpdG9yLCB2YWx1ZSkge1xuICAvKipcbiAgVGFrZXMgZWRpdG9yIGFuZCBlbmFibGVzIHBlcnNpc3RzIGNoYW5nZXMgdG8gdGhlIGJ1ZmZlciBhY3Jvc3MgdGhlIHNlc3Npb25zLlxuICAqKi9cbiAgaWYgKHZhbHVlKSB7XG4gICAgZWRpdG9yW2FjdGl2ZUxpbmVdID0gZWRpdG9yLmFkZExpbmVDbGFzcygwLCBcImJhY2tncm91bmRcIiwgXCJhY3RpdmVsaW5lXCIpXG4gICAgZWRpdG9yLm9uKFwiY3Vyc29yQWN0aXZpdHlcIiwgb25DdXJzb3JBY3Rpdml0eSlcbiAgICBvbkN1cnNvckFjdGl2aXR5KGVkaXRvcilcbiAgfSBlbHNlIGlmIChhY3RpdmVMaW5lIGluIGVkaXRvcikge1xuICAgIGVkaXRvci5yZW1vdmVMaW5lQ2xhc3MoZWRpdG9yW2FjdGl2ZUxpbmVdLCBcImJhY2tncm91bmRcIiwgXCJhY3RpdmVsaW5lXCIpXG4gICAgZGVsZXRlIGVkaXRvclthY3RpdmVMaW5lXVxuICAgIGVkaXRvci5vZmYoXCJjdXJzb3JBY3Rpdml0eVwiLCBvbkN1cnNvckFjdGl2aXR5KVxuICB9XG59XG5cbmZ1bmN0aW9uIHBsdWdpbihDb2RlTWlycm9yKSB7XG4gIENvZGVNaXJyb3IuZGVmaW5lT3B0aW9uKFwiYWN0aXZlTGluZVwiLCBmYWxzZSwgc2V0dXApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGx1Z2luXG4iLCJ2YXIgX25zXyA9IHtcbiAgXCJpZFwiOiBcIndpc3AuYXN0XCJcbn07XG52YXIgd2lzcF9zZXF1ZW5jZSA9IHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpO1xudmFyIGlzTGlzdCA9IHdpc3Bfc2VxdWVuY2UuaXNMaXN0O1xudmFyIGlzU2VxdWVudGlhbCA9IHdpc3Bfc2VxdWVuY2UuaXNTZXF1ZW50aWFsO1xudmFyIGZpcnN0ID0gd2lzcF9zZXF1ZW5jZS5maXJzdDtcbnZhciBzZWNvbmQgPSB3aXNwX3NlcXVlbmNlLnNlY29uZDtcbnZhciBjb3VudCA9IHdpc3Bfc2VxdWVuY2UuY291bnQ7XG52YXIgbGFzdCA9IHdpc3Bfc2VxdWVuY2UubGFzdDtcbnZhciBtYXAgPSB3aXNwX3NlcXVlbmNlLm1hcDtcbnZhciB2ZWMgPSB3aXNwX3NlcXVlbmNlLnZlYzs7XG52YXIgd2lzcF9zdHJpbmcgPSByZXF1aXJlKFwiLi9zdHJpbmdcIik7XG52YXIgc3BsaXQgPSB3aXNwX3N0cmluZy5zcGxpdDtcbnZhciBqb2luID0gd2lzcF9zdHJpbmcuam9pbjs7XG52YXIgd2lzcF9ydW50aW1lID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcbnZhciBpc05pbCA9IHdpc3BfcnVudGltZS5pc05pbDtcbnZhciBpc1ZlY3RvciA9IHdpc3BfcnVudGltZS5pc1ZlY3RvcjtcbnZhciBpc051bWJlciA9IHdpc3BfcnVudGltZS5pc051bWJlcjtcbnZhciBpc1N0cmluZyA9IHdpc3BfcnVudGltZS5pc1N0cmluZztcbnZhciBpc0Jvb2xlYW4gPSB3aXNwX3J1bnRpbWUuaXNCb29sZWFuO1xudmFyIGlzT2JqZWN0ID0gd2lzcF9ydW50aW1lLmlzT2JqZWN0O1xudmFyIGlzRGF0ZSA9IHdpc3BfcnVudGltZS5pc0RhdGU7XG52YXIgaXNSZVBhdHRlcm4gPSB3aXNwX3J1bnRpbWUuaXNSZVBhdHRlcm47XG52YXIgaXNEaWN0aW9uYXJ5ID0gd2lzcF9ydW50aW1lLmlzRGljdGlvbmFyeTtcbnZhciBzdHIgPSB3aXNwX3J1bnRpbWUuc3RyO1xudmFyIGluYyA9IHdpc3BfcnVudGltZS5pbmM7XG52YXIgc3VicyA9IHdpc3BfcnVudGltZS5zdWJzO1xudmFyIGlzRXF1YWwgPSB3aXNwX3J1bnRpbWUuaXNFcXVhbDs7O1xuXG52YXIgd2l0aE1ldGEgPSBmdW5jdGlvbiB3aXRoTWV0YSh2YWx1ZSwgbWV0YWRhdGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHVlLCBcIm1ldGFkYXRhXCIsIHtcbiAgICBcInZhbHVlXCI6IG1ldGFkYXRhLFxuICAgIFwiY29uZmlndXJhYmxlXCI6IHRydWVcbiAgfSk7XG4gIHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnRzLndpdGhNZXRhID0gd2l0aE1ldGE7XG5cbnZhciBtZXRhID0gZnVuY3Rpb24gbWV0YSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID9cbiAgICB2YWx1ZS5tZXRhZGF0YSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLm1ldGEgPSBtZXRhO1xuXG52YXIgX19uc1NlcGFyYXRvcl9fID0gXCLigYRcIjtcbmV4cG9ydHMuX19uc1NlcGFyYXRvcl9fID0gX19uc1NlcGFyYXRvcl9fO1xuXG52YXIgU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKG5hbWVzcGFjZSwgbmFtZSkge1xuICB0aGlzLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5TeW1ib2wudHlwZSA9IFwid2lzcC5zeW1ib2xcIjtcblxuU3ltYm9sLnByb3RvdHlwZS50eXBlID0gU3ltYm9sLnR5cGU7XG5cblN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG5zID0gbmFtZXNwYWNlKHRoaXMpO1xuICByZXR1cm4gbnMgP1xuICAgIFwiXCIgKyBucyArIFwiL1wiICsgKG5hbWUodGhpcykpIDpcbiAgICBcIlwiICsgKG5hbWUodGhpcykpO1xufTtcblxudmFyIHN5bWJvbCA9IGZ1bmN0aW9uIHN5bWJvbChucywgaWQpIHtcbiAgcmV0dXJuIGlzU3ltYm9sKG5zKSA/XG4gICAgbnMgOlxuICBpc0tleXdvcmQobnMpID9cbiAgICBuZXcgU3ltYm9sKG5hbWVzcGFjZShucyksIG5hbWUobnMpKSA6XG4gIGlzTmlsKGlkKSA/XG4gICAgbmV3IFN5bWJvbCh2b2lkKDApLCBucykgOlxuICBcImVsc2VcIiA/XG4gICAgbmV3IFN5bWJvbChucywgaWQpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMuc3ltYm9sID0gc3ltYm9sO1xuXG52YXIgaXNTeW1ib2wgPSBmdW5jdGlvbiBpc1N5bWJvbCh4KSB7XG4gIHJldHVybiB4ICYmIChTeW1ib2wudHlwZSA9PT0geC50eXBlKTtcbn07XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbnZhciBpc0tleXdvcmQgPSBmdW5jdGlvbiBpc0tleXdvcmQoeCkge1xuICByZXR1cm4gKGlzU3RyaW5nKHgpKSAmJiAoY291bnQoeCkgPiAxKSAmJiAoZmlyc3QoeCkgPT09IFwi6p6JXCIpO1xufTtcbmV4cG9ydHMuaXNLZXl3b3JkID0gaXNLZXl3b3JkO1xuXG52YXIga2V5d29yZCA9IGZ1bmN0aW9uIGtleXdvcmQobnMsIGlkKSB7XG4gIHJldHVybiBpc0tleXdvcmQobnMpID9cbiAgICBucyA6XG4gIGlzU3ltYm9sKG5zKSA/XG4gICAgXCJcIiArIFwi6p6JXCIgKyAobmFtZShucykpIDpcbiAgaXNOaWwoaWQpID9cbiAgICBcIlwiICsgXCLqnolcIiArIG5zIDpcbiAgaXNOaWwobnMpID9cbiAgICBcIlwiICsgXCLqnolcIiArIGlkIDpcbiAgXCJlbHNlXCIgP1xuICAgIFwiXCIgKyBcIuqeiVwiICsgbnMgKyBfX25zU2VwYXJhdG9yX18gKyBpZCA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLmtleXdvcmQgPSBrZXl3b3JkO1xuXG52YXIga2V5d29yZE5hbWUgPSBmdW5jdGlvbiBrZXl3b3JkTmFtZSh2YWx1ZSkge1xuICByZXR1cm4gbGFzdChzcGxpdChzdWJzKHZhbHVlLCAxKSwgX19uc1NlcGFyYXRvcl9fKSk7XG59O1xuXG52YXIgbmFtZSA9IGZ1bmN0aW9uIG5hbWUodmFsdWUpIHtcbiAgcmV0dXJuIGlzU3ltYm9sKHZhbHVlKSA/XG4gICAgdmFsdWUubmFtZSA6XG4gIGlzS2V5d29yZCh2YWx1ZSkgP1xuICAgIGtleXdvcmROYW1lKHZhbHVlKSA6XG4gIGlzU3RyaW5nKHZhbHVlKSA/XG4gICAgdmFsdWUgOlxuICBcImVsc2VcIiA/XG4gICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiXCIgKyBcIkRvZXNuJ3Qgc3VwcG9ydCBuYW1lOiBcIiArIHZhbHVlKTsgfSkoKSA6XG4gICAgdm9pZCgwKTtcbn07XG5leHBvcnRzLm5hbWUgPSBuYW1lO1xuXG52YXIga2V5d29yZE5hbWVzcGFjZSA9IGZ1bmN0aW9uIGtleXdvcmROYW1lc3BhY2UoeCkge1xuICB2YXIgcGFydHMgPSBzcGxpdChzdWJzKHgsIDEpLCBfX25zU2VwYXJhdG9yX18pO1xuICByZXR1cm4gY291bnQocGFydHMpID4gMSA/XG4gICAgKHBhcnRzIHx8IDApWzBdIDpcbiAgICB2b2lkKDApO1xufTtcblxudmFyIG5hbWVzcGFjZSA9IGZ1bmN0aW9uIG5hbWVzcGFjZSh4KSB7XG4gIHJldHVybiBpc1N5bWJvbCh4KSA/XG4gICAgeC5uYW1lc3BhY2UgOlxuICBpc0tleXdvcmQoeCkgP1xuICAgIGtleXdvcmROYW1lc3BhY2UoeCkgOlxuICBcImVsc2VcIiA/XG4gICAgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiXCIgKyBcIkRvZXNuJ3Qgc3VwcG9ydHMgbmFtZXNwYWNlOiBcIiArIHgpOyB9KSgpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuXG52YXIgZ2Vuc3ltID0gZnVuY3Rpb24gZ2Vuc3ltKHByZWZpeCkge1xuICByZXR1cm4gc3ltYm9sKFwiXCIgKyAoaXNOaWwocHJlZml4KSA/XG4gICAgXCJHX19cIiA6XG4gICAgcHJlZml4KSArIChnZW5zeW0uYmFzZSA9IGdlbnN5bS5iYXNlICsgMSkpO1xufTtcbmV4cG9ydHMuZ2Vuc3ltID0gZ2Vuc3ltO1xuXG5nZW5zeW0uYmFzZSA9IDA7XG5cbnZhciBpc1VucXVvdGUgPSBmdW5jdGlvbiBpc1VucXVvdGUoZm9ybSkge1xuICByZXR1cm4gKGlzTGlzdChmb3JtKSkgJiYgKGlzRXF1YWwoZmlyc3QoZm9ybSksIHN5bWJvbCh2b2lkKDApLCBcInVucXVvdGVcIikpKTtcbn07XG5leHBvcnRzLmlzVW5xdW90ZSA9IGlzVW5xdW90ZTtcblxudmFyIGlzVW5xdW90ZVNwbGljaW5nID0gZnVuY3Rpb24gaXNVbnF1b3RlU3BsaWNpbmcoZm9ybSkge1xuICByZXR1cm4gKGlzTGlzdChmb3JtKSkgJiYgKGlzRXF1YWwoZmlyc3QoZm9ybSksIHN5bWJvbCh2b2lkKDApLCBcInVucXVvdGUtc3BsaWNpbmdcIikpKTtcbn07XG5leHBvcnRzLmlzVW5xdW90ZVNwbGljaW5nID0gaXNVbnF1b3RlU3BsaWNpbmc7XG5cbnZhciBpc1F1b3RlID0gZnVuY3Rpb24gaXNRdW90ZShmb3JtKSB7XG4gIHJldHVybiAoaXNMaXN0KGZvcm0pKSAmJiAoaXNFcXVhbChmaXJzdChmb3JtKSwgc3ltYm9sKHZvaWQoMCksIFwicXVvdGVcIikpKTtcbn07XG5leHBvcnRzLmlzUXVvdGUgPSBpc1F1b3RlO1xuXG52YXIgaXNTeW50YXhRdW90ZSA9IGZ1bmN0aW9uIGlzU3ludGF4UXVvdGUoZm9ybSkge1xuICByZXR1cm4gKGlzTGlzdChmb3JtKSkgJiYgKGlzRXF1YWwoZmlyc3QoZm9ybSksIHN5bWJvbCh2b2lkKDApLCBcInN5bnRheC1xdW90ZVwiKSkpO1xufTtcbmV4cG9ydHMuaXNTeW50YXhRdW90ZSA9IGlzU3ludGF4UXVvdGU7XG5cbnZhciBub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUobiwgbGVuKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gbG9vcChucykge1xuICAgIHZhciByZWN1ciA9IGxvb3A7XG4gICAgd2hpbGUgKHJlY3VyID09PSBsb29wKSB7XG4gICAgICByZWN1ciA9IGNvdW50KG5zKSA8IGxlbiA/XG4gICAgICAobnMgPSBcIlwiICsgXCIwXCIgKyBucywgbG9vcCkgOlxuICAgICAgbnM7XG4gICAgfTtcbiAgICByZXR1cm4gcmVjdXI7XG4gIH0pKFwiXCIgKyBuKTtcbn07XG5cbnZhciBxdW90ZVN0cmluZyA9IGZ1bmN0aW9uIHF1b3RlU3RyaW5nKHMpIHtcbiAgcyA9IGpvaW4oXCJcXFxcXFxcIlwiLCBzcGxpdChzLCBcIlxcXCJcIikpO1xuICBzID0gam9pbihcIlxcXFxcXFxcXCIsIHNwbGl0KHMsIFwiXFxcXFwiKSk7XG4gIHMgPSBqb2luKFwiXFxcXGJcIiwgc3BsaXQocywgXCJcYlwiKSk7XG4gIHMgPSBqb2luKFwiXFxcXGZcIiwgc3BsaXQocywgXCJcZlwiKSk7XG4gIHMgPSBqb2luKFwiXFxcXG5cIiwgc3BsaXQocywgXCJcXG5cIikpO1xuICBzID0gam9pbihcIlxcXFxyXCIsIHNwbGl0KHMsIFwiXFxyXCIpKTtcbiAgcyA9IGpvaW4oXCJcXFxcdFwiLCBzcGxpdChzLCBcIlxcdFwiKSk7XG4gIHJldHVybiBcIlwiICsgXCJcXFwiXCIgKyBzICsgXCJcXFwiXCI7XG59O1xuZXhwb3J0cy5xdW90ZVN0cmluZyA9IHF1b3RlU3RyaW5nO1xuXG52YXIgcHJTdHIgPSBmdW5jdGlvbiBwclN0cih4KSB7XG4gIHJldHVybiBpc05pbCh4KSA/XG4gICAgXCJuaWxcIiA6XG4gIGlzS2V5d29yZCh4KSA/XG4gICAgbmFtZXNwYWNlKHgpID9cbiAgICAgIFwiXCIgKyBcIjpcIiArIChuYW1lc3BhY2UoeCkpICsgXCIvXCIgKyAobmFtZSh4KSkgOlxuICAgICAgXCJcIiArIFwiOlwiICsgKG5hbWUoeCkpIDpcbiAgaXNTdHJpbmcoeCkgP1xuICAgIHF1b3RlU3RyaW5nKHgpIDpcbiAgaXNEYXRlKHgpID9cbiAgICBcIlwiICsgXCIjaW5zdCBcXFwiXCIgKyAoeC5nZXRVVENGdWxsWWVhcigpKSArIFwiLVwiICsgKG5vcm1hbGl6ZShpbmMoeC5nZXRVVENNb250aCgpKSwgMikpICsgXCItXCIgKyAobm9ybWFsaXplKHguZ2V0VVRDRGF0ZSgpLCAyKSkgKyBcIlRcIiArIChub3JtYWxpemUoeC5nZXRVVENIb3VycygpLCAyKSkgKyBcIjpcIiArIChub3JtYWxpemUoeC5nZXRVVENNaW51dGVzKCksIDIpKSArIFwiOlwiICsgKG5vcm1hbGl6ZSh4LmdldFVUQ1NlY29uZHMoKSwgMikpICsgXCIuXCIgKyAobm9ybWFsaXplKHguZ2V0VVRDTWlsbGlzZWNvbmRzKCksIDMpKSArIFwiLVwiICsgXCIwMDowMFxcXCJcIiA6XG4gIGlzVmVjdG9yKHgpID9cbiAgICBcIlwiICsgXCJbXCIgKyAoam9pbihcIiBcIiwgbWFwKHByU3RyLCB2ZWMoeCkpKSkgKyBcIl1cIiA6XG4gIGlzRGljdGlvbmFyeSh4KSA/XG4gICAgXCJcIiArIFwie1wiICsgKGpvaW4oXCIsIFwiLCBtYXAoZnVuY3Rpb24ocGFpcikge1xuICAgICAgcmV0dXJuIFwiXCIgKyAocHJTdHIoZmlyc3QocGFpcikpKSArIFwiIFwiICsgKHByU3RyKHNlY29uZChwYWlyKSkpO1xuICAgIH0sIHgpKSkgKyBcIn1cIiA6XG4gIGlzU2VxdWVudGlhbCh4KSA/XG4gICAgXCJcIiArIFwiKFwiICsgKGpvaW4oXCIgXCIsIG1hcChwclN0ciwgdmVjKHgpKSkpICsgXCIpXCIgOlxuICBpc1JlUGF0dGVybih4KSA/XG4gICAgXCJcIiArIFwiI1xcXCJcIiArIChqb2luKFwiXFxcXC9cIiwgc3BsaXQoeC5zb3VyY2UsIFwiL1wiKSkpICsgXCJcXFwiXCIgOlxuICBcImVsc2VcIiA/XG4gICAgXCJcIiArIHggOlxuICAgIHZvaWQoMCk7XG59O1xuZXhwb3J0cy5wclN0ciA9IHByU3RyIiwidmFyIF9uc18gPSB7XG4gIFwiaWRcIjogXCJ3aXNwLnN0cmluZ1wiXG59O1xudmFyIHdpc3BfcnVudGltZSA9IHJlcXVpcmUoXCIuL3J1bnRpbWVcIik7XG52YXIgc3RyID0gd2lzcF9ydW50aW1lLnN0cjtcbnZhciBzdWJzID0gd2lzcF9ydW50aW1lLnN1YnM7XG52YXIgcmVNYXRjaGVzID0gd2lzcF9ydW50aW1lLnJlTWF0Y2hlcztcbnZhciBpc05pbCA9IHdpc3BfcnVudGltZS5pc05pbDtcbnZhciBpc1N0cmluZyA9IHdpc3BfcnVudGltZS5pc1N0cmluZzs7XG52YXIgd2lzcF9zZXF1ZW5jZSA9IHJlcXVpcmUoXCIuL3NlcXVlbmNlXCIpO1xudmFyIHZlYyA9IHdpc3Bfc2VxdWVuY2UudmVjO1xudmFyIGlzRW1wdHkgPSB3aXNwX3NlcXVlbmNlLmlzRW1wdHk7OztcblxudmFyIHNwbGl0ID0gZnVuY3Rpb24gc3BsaXQoc3RyaW5nLCBwYXR0ZXJuLCBsaW1pdCkge1xuICByZXR1cm4gc3RyaW5nLnNwbGl0KHBhdHRlcm4sIGxpbWl0KTtcbn07XG5leHBvcnRzLnNwbGl0ID0gc3BsaXQ7XG5cbnZhciBqb2luID0gZnVuY3Rpb24gam9pbihzZXBhcmF0b3IsIGNvbGwpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAxOlxuICAgICAgdmFyIGNvbGwgPSBzZXBhcmF0b3I7XG4gICAgICByZXR1cm4gc3RyLmFwcGx5KHN0ciwgdmVjKGNvbGwpKTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gdmVjKGNvbGwpLmpvaW4oc2VwYXJhdG9yKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICAoZnVuY3Rpb24oKSB7IHRocm93IEVycm9yKFwiSW52YWxpZCBhcml0eVwiKTsgfSkoKVxuICB9O1xuICByZXR1cm4gdm9pZCgwKTtcbn07XG5leHBvcnRzLmpvaW4gPSBqb2luO1xuXG52YXIgdXBwZXJDYXNlID0gZnVuY3Rpb24gdXBwZXJDYXNlKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnRvVXBwZXJDYXNlKCk7XG59O1xuZXhwb3J0cy51cHBlckNhc2UgPSB1cHBlckNhc2U7XG5cbnZhciB1cHBlckNhc2UgPSBmdW5jdGlvbiB1cHBlckNhc2Uoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudG9VcHBlckNhc2UoKTtcbn07XG5leHBvcnRzLnVwcGVyQ2FzZSA9IHVwcGVyQ2FzZTtcblxudmFyIGxvd2VyQ2FzZSA9IGZ1bmN0aW9uIGxvd2VyQ2FzZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpO1xufTtcbmV4cG9ydHMubG93ZXJDYXNlID0gbG93ZXJDYXNlO1xuXG52YXIgY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gIHJldHVybiBjb3VudChzdHJpbmcpIDwgMiA/XG4gICAgdXBwZXJDYXNlKHN0cmluZykgOlxuICAgIFwiXCIgKyAodXBwZXJDYXNlKHN1YnMocywgMCwgMSkpKSArIChsb3dlckNhc2Uoc3VicyhzLCAxKSkpO1xufTtcbmV4cG9ydHMuY2FwaXRhbGl6ZSA9IGNhcGl0YWxpemU7XG5cbnZhciByZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZShzdHJpbmcsIG1hdGNoLCByZXBsYWNlbWVudCkge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UobWF0Y2gsIHJlcGxhY2VtZW50KTtcbn07XG5leHBvcnRzLnJlcGxhY2UgPSByZXBsYWNlO1xuXG52YXIgX19MRUZUU1BBQ0VTX18gPSAvXlxcc1xccyovO1xuZXhwb3J0cy5fX0xFRlRTUEFDRVNfXyA9IF9fTEVGVFNQQUNFU19fO1xuXG52YXIgX19SSUdIVFNQQUNFU19fID0gL1xcc1xccyokLztcbmV4cG9ydHMuX19SSUdIVFNQQUNFU19fID0gX19SSUdIVFNQQUNFU19fO1xuXG52YXIgX19TUEFDRVNfXyA9IC9eXFxzXFxzKiQvO1xuZXhwb3J0cy5fX1NQQUNFU19fID0gX19TUEFDRVNfXztcblxudmFyIHRyaW1sID0gaXNOaWwoXCJcIi50cmltTGVmdCkgP1xuICBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX19MRUZUU1BBQ0VTX18sIFwiXCIpO1xuICB9IDpcbiAgZnVuY3Rpb24gdHJpbWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy50cmltTGVmdCgpO1xuICB9O1xuZXhwb3J0cy50cmltbCA9IHRyaW1sO1xuXG52YXIgdHJpbXIgPSBpc05pbChcIlwiLnRyaW1SaWdodCkgP1xuICBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX19SSUdIVFNQQUNFU19fLCBcIlwiKTtcbiAgfSA6XG4gIGZ1bmN0aW9uIHRyaW1yKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcudHJpbVJpZ2h0KCk7XG4gIH07XG5leHBvcnRzLnRyaW1yID0gdHJpbXI7XG5cbnZhciB0cmltID0gaXNOaWwoXCJcIi50cmltKSA/XG4gIGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShfX0xFRlRTUEFDRVNfXykucmVwbGFjZShfX1JJR0hUU1BBQ0VTX18pO1xuICB9IDpcbiAgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnRyaW0oKTtcbiAgfTtcbmV4cG9ydHMudHJpbSA9IHRyaW07XG5cbnZhciBpc0JsYW5rID0gZnVuY3Rpb24gaXNCbGFuayhzdHJpbmcpIHtcbiAgcmV0dXJuIChpc05pbChzdHJpbmcpKSB8fCAoaXNFbXB0eShzdHJpbmcpKSB8fCAocmVNYXRjaGVzKF9fU1BBQ0VTX18sIHN0cmluZykpO1xufTtcbmV4cG9ydHMuaXNCbGFuayA9IGlzQmxhbmsiLCJ2YXIgX25zXyA9IHtcbiAgXCJpZFwiOiBcIndpc3AuYmFja2VuZC5qYXZhc2NyaXB0LndyaXRlclwiLFxuICBcImRvY1wiOiBcIkNvbXBpbGVyIGJhY2tlbmQgZm9yIGZvciB3cml0aW5nIEpTIG91dHB1dFwiXG59O1xudmFyIHdpc3BfYXN0ID0gcmVxdWlyZShcIi4vLi4vLi4vYXN0XCIpO1xudmFyIG5hbWUgPSB3aXNwX2FzdC5uYW1lO1xudmFyIG5hbWVzcGFjZSA9IHdpc3BfYXN0Lm5hbWVzcGFjZTtcbnZhciBzeW1ib2wgPSB3aXNwX2FzdC5zeW1ib2w7XG52YXIgaXNTeW1ib2wgPSB3aXNwX2FzdC5pc1N5bWJvbDtcbnZhciBpc0tleXdvcmQgPSB3aXNwX2FzdC5pc0tleXdvcmQ7O1xudmFyIHdpc3Bfc2VxdWVuY2UgPSByZXF1aXJlKFwiLi8uLi8uLi9zZXF1ZW5jZVwiKTtcbnZhciBsaXN0ID0gd2lzcF9zZXF1ZW5jZS5saXN0O1xudmFyIGZpcnN0ID0gd2lzcF9zZXF1ZW5jZS5maXJzdDtcbnZhciByZXN0ID0gd2lzcF9zZXF1ZW5jZS5yZXN0O1xudmFyIGlzTGlzdCA9IHdpc3Bfc2VxdWVuY2UuaXNMaXN0O1xudmFyIHZlYyA9IHdpc3Bfc2VxdWVuY2UudmVjO1xudmFyIG1hcCA9IHdpc3Bfc2VxdWVuY2UubWFwO1xudmFyIGNvdW50ID0gd2lzcF9zZXF1ZW5jZS5jb3VudDtcbnZhciBsYXN0ID0gd2lzcF9zZXF1ZW5jZS5sYXN0O1xudmFyIHJlZHVjZSA9IHdpc3Bfc2VxdWVuY2UucmVkdWNlO1xudmFyIGlzRW1wdHkgPSB3aXNwX3NlcXVlbmNlLmlzRW1wdHk7O1xudmFyIHdpc3BfcnVudGltZSA9IHJlcXVpcmUoXCIuLy4uLy4uL3J1bnRpbWVcIik7XG52YXIgaXNUcnVlID0gd2lzcF9ydW50aW1lLmlzVHJ1ZTtcbnZhciBpc05pbCA9IHdpc3BfcnVudGltZS5pc05pbDtcbnZhciBpc1N0cmluZyA9IHdpc3BfcnVudGltZS5pc1N0cmluZztcbnZhciBpc051bWJlciA9IHdpc3BfcnVudGltZS5pc051bWJlcjtcbnZhciBpc1ZlY3RvciA9IHdpc3BfcnVudGltZS5pc1ZlY3RvcjtcbnZhciBpc0RpY3Rpb25hcnkgPSB3aXNwX3J1bnRpbWUuaXNEaWN0aW9uYXJ5O1xudmFyIGlzQm9vbGVhbiA9IHdpc3BfcnVudGltZS5pc0Jvb2xlYW47XG52YXIgaXNSZVBhdHRlcm4gPSB3aXNwX3J1bnRpbWUuaXNSZVBhdHRlcm47XG52YXIgcmVGaW5kID0gd2lzcF9ydW50aW1lLnJlRmluZDtcbnZhciBkZWMgPSB3aXNwX3J1bnRpbWUuZGVjO1xudmFyIHN1YnMgPSB3aXNwX3J1bnRpbWUuc3Viczs7XG52YXIgd2lzcF9zdHJpbmcgPSByZXF1aXJlKFwiLi8uLi8uLi9zdHJpbmdcIik7XG52YXIgcmVwbGFjZSA9IHdpc3Bfc3RyaW5nLnJlcGxhY2U7XG52YXIgam9pbiA9IHdpc3Bfc3RyaW5nLmpvaW47XG52YXIgc3BsaXQgPSB3aXNwX3N0cmluZy5zcGxpdDtcbnZhciB1cHBlckNhc2UgPSB3aXNwX3N0cmluZy51cHBlckNhc2U7OztcblxudmFyIHdyaXRlUmVmZXJlbmNlID0gZnVuY3Rpb24gd3JpdGVSZWZlcmVuY2UoZm9ybSkge1xuICBcIlRyYW5zbGF0ZXMgcmVmZXJlbmNlcyBmcm9tIGNsb2p1cmUgY29udmVudGlvbiB0byBKUzpcXG5cXG4gICoqbWFjcm9zKiogICAgICBfX21hY3Jvc19fXFxuICBsaXN0LT52ZWN0b3IgICAgbGlzdFRvVmVjdG9yXFxuICBzZXQhICAgICAgICAgICAgc2V0XFxuICBmb29fYmFyICAgICAgICAgZm9vX2JhclxcbiAgbnVtYmVyPyAgICAgICAgIGlzTnVtYmVyXFxuICBjcmVhdGUtc2VydmVyICAgY3JlYXRlU2VydmVyXCI7XG4gIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlkID0gbmFtZShmb3JtKTtcbiAgICBpZCA9IGlkID09PSBcIipcIiA/XG4gICAgICBcIm11bHRpcGx5XCIgOlxuICAgIGlkID09PSBcIi9cIiA/XG4gICAgICBcImRpdmlkZVwiIDpcbiAgICBpZCA9PT0gXCIrXCIgP1xuICAgICAgXCJzdW1cIiA6XG4gICAgaWQgPT09IFwiLVwiID9cbiAgICAgIFwic3VidHJhY3RcIiA6XG4gICAgaWQgPT09IFwiPVwiID9cbiAgICAgIFwiZXF1YWw/XCIgOlxuICAgIGlkID09PSBcIj09XCIgP1xuICAgICAgXCJzdHJpY3QtZXF1YWw/XCIgOlxuICAgIGlkID09PSBcIjw9XCIgP1xuICAgICAgXCJub3QtZ3JlYXRlci10aGFuXCIgOlxuICAgIGlkID09PSBcIj49XCIgP1xuICAgICAgXCJub3QtbGVzcy10aGFuXCIgOlxuICAgIGlkID09PSBcIj5cIiA/XG4gICAgICBcImdyZWF0ZXItdGhhblwiIDpcbiAgICBpZCA9PT0gXCI8XCIgP1xuICAgICAgXCJsZXNzLXRoYW5cIiA6XG4gICAgXCJlbHNlXCIgP1xuICAgICAgaWQgOlxuICAgICAgdm9pZCgwKTtcbiAgICBpZCA9IGpvaW4oXCJfXCIsIHNwbGl0KGlkLCBcIipcIikpO1xuICAgIGlkID0gam9pbihcIi10by1cIiwgc3BsaXQoaWQsIFwiLT5cIikpO1xuICAgIGlkID0gam9pbihzcGxpdChpZCwgXCIhXCIpKTtcbiAgICBpZCA9IGpvaW4oXCIkXCIsIHNwbGl0KGlkLCBcIiVcIikpO1xuICAgIGlkID0gam9pbihcIi1wbHVzLVwiLCBzcGxpdChpZCwgXCIrXCIpKTtcbiAgICBpZCA9IGpvaW4oXCItYW5kLVwiLCBzcGxpdChpZCwgXCImXCIpKTtcbiAgICBpZCA9IGxhc3QoaWQpID09PSBcIj9cIiA/XG4gICAgICBcIlwiICsgXCJpcy1cIiArIChzdWJzKGlkLCAwLCBkZWMoY291bnQoaWQpKSkpIDpcbiAgICAgIGlkO1xuICAgIGlkID0gcmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwga2V5KSB7XG4gICAgICByZXR1cm4gXCJcIiArIHJlc3VsdCArICgoIShpc0VtcHR5KHJlc3VsdCkpKSAmJiAoIShpc0VtcHR5KGtleSkpKSA/XG4gICAgICAgIFwiXCIgKyAodXBwZXJDYXNlKChrZXkgfHwgMClbMF0pKSArIChzdWJzKGtleSwgMSkpIDpcbiAgICAgICAga2V5KTtcbiAgICB9LCBcIlwiLCBzcGxpdChpZCwgXCItXCIpKTtcbiAgICByZXR1cm4gaWQ7XG4gIH0pKCk7XG59O1xuZXhwb3J0cy53cml0ZVJlZmVyZW5jZSA9IHdyaXRlUmVmZXJlbmNlO1xuXG52YXIgd3JpdGVLZXl3b3JkUmVmZXJlbmNlID0gZnVuY3Rpb24gd3JpdGVLZXl3b3JkUmVmZXJlbmNlKGZvcm0pIHtcbiAgcmV0dXJuIFwiXCIgKyBcIlxcXCJcIiArIChuYW1lKGZvcm0pKSArIFwiXFxcIlwiO1xufTtcbmV4cG9ydHMud3JpdGVLZXl3b3JkUmVmZXJlbmNlID0gd3JpdGVLZXl3b3JkUmVmZXJlbmNlO1xuXG52YXIgd3JpdGVLZXl3b3JkID0gZnVuY3Rpb24gd3JpdGVLZXl3b3JkKGZvcm0pIHtcbiAgcmV0dXJuIFwiXCIgKyBcIlxcXCJcIiArIFwi6p6JXCIgKyAobmFtZShmb3JtKSkgKyBcIlxcXCJcIjtcbn07XG5leHBvcnRzLndyaXRlS2V5d29yZCA9IHdyaXRlS2V5d29yZDtcblxudmFyIHdyaXRlU3ltYm9sID0gZnVuY3Rpb24gd3JpdGVTeW1ib2woZm9ybSkge1xuICByZXR1cm4gd3JpdGUobGlzdChzeW1ib2wodm9pZCgwKSwgXCJzeW1ib2xcIiksIG5hbWVzcGFjZShmb3JtKSwgbmFtZShmb3JtKSkpO1xufTtcbmV4cG9ydHMud3JpdGVTeW1ib2wgPSB3cml0ZVN5bWJvbDtcblxudmFyIHdyaXRlTmlsID0gZnVuY3Rpb24gd3JpdGVOaWwoZm9ybSkge1xuICByZXR1cm4gXCJ2b2lkKDApXCI7XG59O1xuZXhwb3J0cy53cml0ZU5pbCA9IHdyaXRlTmlsO1xuXG52YXIgd3JpdGVOdW1iZXIgPSBmdW5jdGlvbiB3cml0ZU51bWJlcihmb3JtKSB7XG4gIHJldHVybiBmb3JtO1xufTtcbmV4cG9ydHMud3JpdGVOdW1iZXIgPSB3cml0ZU51bWJlcjtcblxudmFyIHdyaXRlQm9vbGVhbiA9IGZ1bmN0aW9uIHdyaXRlQm9vbGVhbihmb3JtKSB7XG4gIHJldHVybiBpc1RydWUoZm9ybSkgP1xuICAgIFwidHJ1ZVwiIDpcbiAgICBcImZhbHNlXCI7XG59O1xuZXhwb3J0cy53cml0ZUJvb2xlYW4gPSB3cml0ZUJvb2xlYW47XG5cbnZhciB3cml0ZVN0cmluZyA9IGZ1bmN0aW9uIHdyaXRlU3RyaW5nKGZvcm0pIHtcbiAgZm9ybSA9IHJlcGxhY2UoZm9ybSwgUmVnRXhwKFwiXFxcXFxcXFxcIiwgXCJnXCIpLCBcIlxcXFxcXFxcXCIpO1xuICBmb3JtID0gcmVwbGFjZShmb3JtLCBSZWdFeHAoXCJcXG5cIiwgXCJnXCIpLCBcIlxcXFxuXCIpO1xuICBmb3JtID0gcmVwbGFjZShmb3JtLCBSZWdFeHAoXCJcXHJcIiwgXCJnXCIpLCBcIlxcXFxyXCIpO1xuICBmb3JtID0gcmVwbGFjZShmb3JtLCBSZWdFeHAoXCJcXHRcIiwgXCJnXCIpLCBcIlxcXFx0XCIpO1xuICBmb3JtID0gcmVwbGFjZShmb3JtLCBSZWdFeHAoXCJcXFwiXCIsIFwiZ1wiKSwgXCJcXFxcXFxcIlwiKTtcbiAgcmV0dXJuIFwiXCIgKyBcIlxcXCJcIiArIGZvcm0gKyBcIlxcXCJcIjtcbn07XG5leHBvcnRzLndyaXRlU3RyaW5nID0gd3JpdGVTdHJpbmc7XG5cbnZhciB3cml0ZVRlbXBsYXRlID0gZnVuY3Rpb24gd3JpdGVUZW1wbGF0ZSgpIHtcbiAgdmFyIGZvcm0gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmRlbnRQYXR0ZXJuID0gL1xcbiAqJC87XG4gICAgdmFyIGxpbmVCcmVha1BhdHRlciA9IFJlZ0V4cChcIlxcblwiLCBcImdcIik7XG4gICAgdmFyIGdldEluZGVudGF0aW9uID0gZnVuY3Rpb24oY29kZSkge1xuICAgICAgcmV0dXJuIChyZUZpbmQoaW5kZW50UGF0dGVybiwgY29kZSkpIHx8IFwiXFxuXCI7XG4gICAgfTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AoY29kZSwgcGFydHMsIHZhbHVlcykge1xuICAgICAgdmFyIHJlY3VyID0gbG9vcDtcbiAgICAgIHdoaWxlIChyZWN1ciA9PT0gbG9vcCkge1xuICAgICAgICByZWN1ciA9IGNvdW50KHBhcnRzKSA+IDEgP1xuICAgICAgICAoY29kZSA9IFwiXCIgKyBjb2RlICsgKGZpcnN0KHBhcnRzKSkgKyAocmVwbGFjZShcIlwiICsgXCJcIiArIChmaXJzdCh2YWx1ZXMpKSwgbGluZUJyZWFrUGF0dGVyLCBnZXRJbmRlbnRhdGlvbihmaXJzdChwYXJ0cykpKSksIHBhcnRzID0gcmVzdChwYXJ0cyksIHZhbHVlcyA9IHJlc3QodmFsdWVzKSwgbG9vcCkgOlxuICAgICAgICBcIlwiICsgY29kZSArIChmaXJzdChwYXJ0cykpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiByZWN1cjtcbiAgICB9KShcIlwiLCBzcGxpdChmaXJzdChmb3JtKSwgXCJ+e31cIiksIHJlc3QoZm9ybSkpO1xuICB9KSgpO1xufTtcbmV4cG9ydHMud3JpdGVUZW1wbGF0ZSA9IHdyaXRlVGVtcGxhdGU7XG5cbnZhciB3cml0ZUdyb3VwID0gZnVuY3Rpb24gd3JpdGVHcm91cCgpIHtcbiAgdmFyIGZvcm1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGpvaW4oXCIsIFwiLCBmb3Jtcyk7XG59O1xuZXhwb3J0cy53cml0ZUdyb3VwID0gd3JpdGVHcm91cDtcblxudmFyIHdyaXRlSW52b2tlID0gZnVuY3Rpb24gd3JpdGVJbnZva2UoY2FsbGVlKSB7XG4gIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICByZXR1cm4gd3JpdGVUZW1wbGF0ZShcIn57fSh+e30pXCIsIGNhbGxlZSwgd3JpdGVHcm91cC5hcHBseSh3cml0ZUdyb3VwLCBwYXJhbXMpKTtcbn07XG5leHBvcnRzLndyaXRlSW52b2tlID0gd3JpdGVJbnZva2U7XG5cbnZhciB3cml0ZUVycm9yID0gZnVuY3Rpb24gd3JpdGVFcnJvcihtZXNzYWdlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkgeyB0aHJvdyBFcnJvcihtZXNzYWdlKTsgfSkoKTtcbiAgfTtcbn07XG5leHBvcnRzLndyaXRlRXJyb3IgPSB3cml0ZUVycm9yO1xuXG52YXIgd3JpdGVWZWN0b3IgPSB3cml0ZUVycm9yKFwiVmVjdG9ycyBhcmUgbm90IHN1cHBvcnRlZFwiKTtcbmV4cG9ydHMud3JpdGVWZWN0b3IgPSB3cml0ZVZlY3RvcjtcblxudmFyIHdyaXRlRGljdGlvbmFyeSA9IHdyaXRlRXJyb3IoXCJEaWN0aW9uYXJpZXMgYXJlIG5vdCBzdXBwb3J0ZWRcIik7XG5leHBvcnRzLndyaXRlRGljdGlvbmFyeSA9IHdyaXRlRGljdGlvbmFyeTtcblxudmFyIHdyaXRlUGF0dGVybiA9IHdyaXRlRXJyb3IoXCJSZWd1bGFyIGV4cHJlc3Npb25zIGFyZSBub3Qgc3VwcG9ydGVkXCIpO1xuZXhwb3J0cy53cml0ZVBhdHRlcm4gPSB3cml0ZVBhdHRlcm47XG5cbnZhciBjb21waWxlQ29tbWVudCA9IGZ1bmN0aW9uIGNvbXBpbGVDb21tZW50KGZvcm0pIHtcbiAgcmV0dXJuIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwiLy9+e31cXG5cIiwgZmlyc3QoZm9ybSkpKTtcbn07XG5leHBvcnRzLmNvbXBpbGVDb21tZW50ID0gY29tcGlsZUNvbW1lbnQ7XG5cbnZhciB3cml0ZURlZiA9IGZ1bmN0aW9uIHdyaXRlRGVmKGZvcm0pIHtcbiAgdmFyIGlkID0gZmlyc3QoZm9ybSk7XG4gIHZhciBpc0V4cG9ydCA9ICgoKChtZXRhKGZvcm0pKSB8fCB7fSkgfHwgMClbXCJ0b3BcIl0pICYmICghKCgoKG1ldGEoaWQpKSB8fCB7fSkgfHwgMClbXCJwcml2YXRlXCJdKSk7XG4gIHZhciBhdHRyaWJ1dGUgPSBzeW1ib2wobmFtZXNwYWNlKGlkKSwgXCJcIiArIFwiLVwiICsgKG5hbWUoaWQpKSk7XG4gIHJldHVybiBpc0V4cG9ydCA/XG4gICAgY29tcGlsZVRlbXBsYXRlKGxpc3QoXCJ2YXIgfnt9O1xcbn57fVwiLCBjb21waWxlKGNvbnMoc3ltYm9sKHZvaWQoMCksIFwic2V0IVwiKSwgZm9ybSkpLCBjb21waWxlKGxpc3Qoc3ltYm9sKHZvaWQoMCksIFwic2V0IVwiKSwgbGlzdChzeW1ib2wodm9pZCgwKSwgXCIuXCIpLCBzeW1ib2wodm9pZCgwKSwgXCJleHBvcnRzXCIpLCBhdHRyaWJ1dGUpLCBpZCkpKSkgOlxuICAgIGNvbXBpbGVUZW1wbGF0ZShsaXN0KFwidmFyIH57fVwiLCBjb21waWxlKGNvbnMoc3ltYm9sKHZvaWQoMCksIFwic2V0IVwiKSwgZm9ybSkpKSk7XG59O1xuZXhwb3J0cy53cml0ZURlZiA9IHdyaXRlRGVmO1xuXG52YXIgd3JpdGUgPSBmdW5jdGlvbiB3cml0ZShmb3JtKSB7XG4gIHJldHVybiBpc05pbChmb3JtKSA/XG4gICAgd3JpdGVOaWwoZm9ybSkgOlxuICBpc1N5bWJvbChmb3JtKSA/XG4gICAgd3JpdGVSZWZlcmVuY2UoZm9ybSkgOlxuICBpc0tleXdvcmQoZm9ybSkgP1xuICAgIHdyaXRlS2V5d29yZFJlZmVyZW5jZShmb3JtKSA6XG4gIGlzU3RyaW5nKGZvcm0pID9cbiAgICB3cml0ZVN0cmluZyhmb3JtKSA6XG4gIGlzTnVtYmVyKGZvcm0pID9cbiAgICB3cml0ZU51bWJlcihmb3JtKSA6XG4gIGlzQm9vbGVhbihmb3JtKSA/XG4gICAgd3JpdGVCb29sZWFuKGZvcm0pIDpcbiAgaXNSZVBhdHRlcm4oZm9ybSkgP1xuICAgIHdyaXRlUGF0dGVybihmb3JtKSA6XG4gIGlzVmVjdG9yKGZvcm0pID9cbiAgICB3cml0ZVZlY3Rvcihmb3JtKSA6XG4gIGlzRGljdGlvbmFyeShmb3JtKSA/XG4gICAgd3JpdGVEaWN0aW9uYXJ5KCkgOlxuICBpc0xpc3QoZm9ybSkgP1xuICAgIHdyaXRlSW52b2tlLmFwcGx5KHdyaXRlSW52b2tlLCBtYXAod3JpdGUsIHZlYyhmb3JtKSkpIDpcbiAgXCJlbHNlXCIgP1xuICAgIHdyaXRlRXJyb3IoXCJVbnN1cHBvcnRlZCBmb3JtXCIpIDpcbiAgICB2b2lkKDApO1xufTtcbmV4cG9ydHMud3JpdGUgPSB3cml0ZSJdfQ==
;