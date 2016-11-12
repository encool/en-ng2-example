var PropertiesPanelModule =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var propertiesPanelModule = __webpack_require__(1);
	module.exports = propertiesPanelModule;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  __depends__: [
	    __webpack_require__(3)
	  ],
	  __init__: [ 'propertiesPanel' ],
	  propertiesPanel: [ 'type', __webpack_require__(61) ]
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var forEach = __webpack_require__(4);

	var HANDLERS = {
	  'properties-panel.update-businessobject': __webpack_require__(30),
	  'properties-panel.create-and-reference': __webpack_require__(56),
	  'properties-panel.create-businessobject-list': __webpack_require__(58),
	  'properties-panel.update-businessobject-list': __webpack_require__(59),
	  'properties-panel.multi-command-executor': __webpack_require__(60)
	};


	function CommandInitializer(eventBus, commandStack) {

	  eventBus.on('diagram.init', function() {
	    forEach(HANDLERS, function(handler, id) {
	      commandStack.registerHandler(id, handler);
	    });
	  });
	}

	CommandInitializer.$inject = [ 'eventBus', 'commandStack' ];

	module.exports = {
	  __init__: [ CommandInitializer ]
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(5),
	    baseEach = __webpack_require__(6),
	    createForEach = __webpack_require__(27);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection). Iteratee functions may exit iteration early
	 * by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	 * may be used for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array|Object|string} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(n) {
	 *   console.log(n);
	 * }).value();
	 * // => logs each value from left to right and returns the array
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	 *   console.log(n, key);
	 * });
	 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	 */
	var forEach = createForEach(arrayEach, baseEach);

	module.exports = forEach;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(7),
	    createBaseEach = __webpack_require__(26);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(8),
	    keys = __webpack_require__(12);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(9);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(10);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(13),
	    isArrayLike = __webpack_require__(17),
	    isObject = __webpack_require__(11),
	    shimKeys = __webpack_require__(21);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(14);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(15),
	    isObjectLike = __webpack_require__(16);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(18),
	    isLength = __webpack_require__(20);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(19);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(23),
	    isIndex = __webpack_require__(24),
	    isLength = __webpack_require__(20),
	    keysIn = __webpack_require__(25);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(17),
	    isObjectLike = __webpack_require__(16);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(13),
	    isLength = __webpack_require__(20),
	    isObjectLike = __webpack_require__(16);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(23),
	    isIndex = __webpack_require__(24),
	    isLength = __webpack_require__(20),
	    isObject = __webpack_require__(11);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(18),
	    isLength = __webpack_require__(20),
	    toObject = __webpack_require__(10);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(28),
	    isArray = __webpack_require__(23);

	/**
	 * Creates a function for `_.forEach` or `_.forEachRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createForEach(arrayFunc, eachFunc) {
	  return function(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	      ? arrayFunc(collection, iteratee)
	      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	  };
	}

	module.exports = createForEach;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(29);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var reduce = __webpack_require__(31),
	    is = __webpack_require__(55).is,
	    keys = __webpack_require__(12),
	    forEach = __webpack_require__(4);

	/**
	 * A handler that implements a BPMN 2.0 property update
	 * for business objects which are not represented in the
	 * diagram.
	 *
	 * This is useful in the context of the properties panel in
	 * order to update child elements of elements visible in
	 * the diagram.
	 *
	 * Example: perform an update of a specific event definition
	 * of an intermediate event.
	 *
	 * @class
	 * @constructor
	 */
	function UpdateBusinessObjectHandler(elementRegistry) {
	  this._elementRegistry = elementRegistry;
	}

	UpdateBusinessObjectHandler.$inject = [ 'elementRegistry' ];

	module.exports = UpdateBusinessObjectHandler;

	/**
	 * returns the root element
	 */
	function getRoot(businessObject) {
	  var parent = businessObject;
	  while (parent.$parent) {
	    parent = parent.$parent;
	  }
	  return parent;
	}

	function getProperties(businessObject, propertyNames) {
	  return reduce(propertyNames, function(result, key) {
	    result[key] = businessObject.get(key);
	    return result;
	  }, {});
	}


	function setProperties(businessObject, properties) {
	  forEach(properties, function(value, key) {
	    businessObject.set(key, value);
	  });
	}


	////// api /////////////////////////////////////////////

	/**
	 * Updates a business object with a list of new properties
	 *
	 * @method  UpdateBusinessObjectHandler#execute
	 *
	 * @param {Object} context
	 * @param {djs.model.Base} context.element the element which has a child business object updated
	 * @param {moddle.businessObject} context.businessObject the businessObject to update
	 * @param {Object} context.properties a list of properties to set on the businessObject
	 *
	 * @return {Array<djs.mode.Base>} the updated element
	 */
	UpdateBusinessObjectHandler.prototype.execute = function(context) {

	  var element = context.element,
	      businessObject = context.businessObject,
	      rootElements = getRoot(businessObject).rootElements,
	      referenceType = context.referenceType,
	      referenceProperty = context.referenceProperty,
	      changed = [ element ]; // this will not change any diagram-js elements

	  if (!element) {
	    throw new Error('element required');
	  }

	  if (!businessObject) {
	    throw new Error('businessObject required');
	  }

	  var properties = context.properties,
	      oldProperties = context.oldProperties || getProperties(businessObject, keys(properties));

	  // check if there the update needs an external element for reference
	  if (typeof referenceType !== 'undefined' && typeof referenceProperty !== 'undefined') {
	    forEach(rootElements, function(rootElement) {
	      if (is(rootElement, referenceType)) {
	        if (rootElement.id === properties[referenceProperty]) {
	          properties[referenceProperty] = rootElement;
	        }
	      }
	    });
	  }

	  // update properties
	  setProperties(businessObject, properties);

	  // store old values
	  context.oldProperties = oldProperties;
	  context.changed = changed;

	  // indicate changed on objects affected by the update
	  return changed;
	};

	/**
	 * Reverts the update
	 *
	 * @method  UpdateBusinessObjectHandler#revert
	 *
	 * @param {Object} context
	 *
	 * @return {djs.mode.Base} the updated element
	 */
	UpdateBusinessObjectHandler.prototype.revert = function(context) {

	  var oldProperties = context.oldProperties,
	      businessObject = context.businessObject;

	  // update properties
	  setProperties(businessObject, oldProperties);

	  return context.changed;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(5),
	    baseCallback = __webpack_require__(32),
	    baseCreate = __webpack_require__(54),
	    baseForOwn = __webpack_require__(7),
	    isArray = __webpack_require__(23),
	    isFunction = __webpack_require__(15),
	    isObject = __webpack_require__(11),
	    isTypedArray = __webpack_require__(41);

	/**
	 * An alternative to `_.reduce`; this method transforms `object` to a new
	 * `accumulator` object which is the result of running each of its own enumerable
	 * properties through `iteratee`, with each invocation potentially mutating
	 * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
	 * with four arguments: (accumulator, value, key, object). Iteratee functions
	 * may exit iteration early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Array|Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The custom accumulator value.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {*} Returns the accumulated value.
	 * @example
	 *
	 * _.transform([2, 3, 4], function(result, n) {
	 *   result.push(n *= n);
	 *   return n % 2 == 0;
	 * });
	 * // => [4, 9]
	 *
	 * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
	 *   result[key] = n * 3;
	 * });
	 * // => { 'a': 3, 'b': 6 }
	 */
	function transform(object, iteratee, accumulator, thisArg) {
	  var isArr = isArray(object) || isTypedArray(object);
	  iteratee = baseCallback(iteratee, thisArg, 4);

	  if (accumulator == null) {
	    if (isArr || isObject(object)) {
	      var Ctor = object.constructor;
	      if (isArr) {
	        accumulator = isArray(object) ? new Ctor : [];
	      } else {
	        accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
	      }
	    } else {
	      accumulator = {};
	    }
	  }
	  (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
	    return iteratee(accumulator, value, index, object);
	  });
	  return accumulator;
	}

	module.exports = transform;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(33),
	    baseMatchesProperty = __webpack_require__(45),
	    bindCallback = __webpack_require__(28),
	    identity = __webpack_require__(29),
	    property = __webpack_require__(52);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}

	module.exports = baseCallback;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(34),
	    getMatchData = __webpack_require__(42),
	    toObject = __webpack_require__(10);

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(35),
	    toObject = __webpack_require__(10);

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(36),
	    isObject = __webpack_require__(11),
	    isObjectLike = __webpack_require__(16);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(37),
	    equalByTag = __webpack_require__(39),
	    equalObjects = __webpack_require__(40),
	    isArray = __webpack_require__(23),
	    isTypedArray = __webpack_require__(41);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(38);

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalArrays;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(12);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(20),
	    isObjectLike = __webpack_require__(16);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(43),
	    pairs = __webpack_require__(44);

	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(12),
	    toObject = __webpack_require__(10);

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(46),
	    baseIsEqual = __webpack_require__(35),
	    baseSlice = __webpack_require__(47),
	    isArray = __webpack_require__(23),
	    isKey = __webpack_require__(48),
	    isStrictComparable = __webpack_require__(43),
	    last = __webpack_require__(49),
	    toObject = __webpack_require__(10),
	    toPath = __webpack_require__(50);

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');

	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(10);

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(23),
	    toObject = __webpack_require__(10);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}

	module.exports = isKey;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(51),
	    isArray = __webpack_require__(23);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = toPath;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(19),
	    basePropertyDeep = __webpack_require__(53),
	    isKey = __webpack_require__(48);

	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(46),
	    toPath = __webpack_require__(50);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(prototype) {
	    if (isObject(prototype)) {
	      object.prototype = prototype;
	      var result = new object;
	      object.prototype = undefined;
	    }
	    return result || {};
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Is an element of the given BPMN type?
	 *
	 * @param  {djs.model.Base|ModdleElement} element
	 * @param  {String} type
	 *
	 * @return {Boolean}
	 */
	function is(element, type) {
	  var bo = getBusinessObject(element);

	  return bo && (typeof bo.$instanceOf === 'function') && bo.$instanceOf(type);
	}

	module.exports.is = is;


	/**
	 * Return the business object for a given element.
	 *
	 * @param  {djs.model.Base|ModdleElement} element
	 *
	 * @return {ModdleElement}
	 */
	function getBusinessObject(element) {
	  return (element && element.businessObject) || element;
	}

	module.exports.getBusinessObject = getBusinessObject;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var elementHelper = __webpack_require__(57);

	/**
	 * A handler capable of creating a new element under a provided parent
	 * and updating / creating a reference to it in one atomic action.
	 *
	 * @class
	 * @constructor
	 */
	function CreateAndReferenceElementHandler(elementRegistry, bpmnFactory) {
	  this._elementRegistry = elementRegistry;
	  this._bpmnFactory = bpmnFactory;
	}

	CreateAndReferenceElementHandler.$inject = [ 'elementRegistry', 'bpmnFactory' ];

	module.exports = CreateAndReferenceElementHandler;

	function ensureNotNull(prop, name) {
	  if (!prop) {
	    throw new Error(name + ' required');
	  }
	  return prop;
	}

	////// api /////////////////////////////////////////////

	/**
	 * Creates a new element under a provided parent and updates / creates a reference to it in
	 * one atomic action.
	 *
	 * @method  CreateAndReferenceElementHandler#execute
	 *
	 * @param {Object} context
	 * @param {djs.model.Base} context.element which is the context for the reference
	 * @param {moddle.referencingObject} context.referencingObject the object which creates the reference
	 * @param {String} context.referenceProperty the property of the referencingObject which makes the reference
	 * @param {moddle.newObject} context.newObject the new object to add
	 * @param {moddle.newObjectContainer} context.newObjectContainer the container for the new object
	 *
	 * @returns {Array<djs.mode.Base>} the updated element
	 */
	CreateAndReferenceElementHandler.prototype.execute = function(context) {

	  var referencingObject = ensureNotNull(context.referencingObject, 'referencingObject'),
	      referenceProperty = ensureNotNull(context.referenceProperty, 'referenceProperty'),
	      newObject = ensureNotNull(context.newObject, 'newObject'),
	      newObjectContainer = ensureNotNull(context.newObjectContainer, 'newObjectContainer'),
	      newObjectParent = ensureNotNull(context.newObjectParent, 'newObjectParent'),
	      changed = [ context.element ]; // this will not change any diagram-js elements

	  // create new object
	  var referencedObject = elementHelper
	                          .createElement(newObject.type, newObject.properties, newObjectParent, this._bpmnFactory);
	  context.referencedObject = referencedObject;

	  // add to containing list
	  newObjectContainer.push(referencedObject);

	  // adjust reference attribute
	  context.previousReference = referencingObject[referenceProperty];
	  referencingObject[referenceProperty] = referencedObject;

	  context.changed = changed;

	  // indicate changed on objects affected by the update
	  return changed;
	};

	/**
	 * Reverts the update
	 *
	 * @method  CreateAndReferenceElementHandler#revert
	 *
	 * @param {Object} context
	 *
	 * @returns {djs.mode.Base} the updated element
	 */
	CreateAndReferenceElementHandler.prototype.revert = function(context) {

	  var referencingObject = context.referencingObject,
	      referenceProperty = context.referenceProperty,
	      previousReference = context.previousReference,
	      referencedObject = context.referencedObject,
	      newObjectContainer = context.newObjectContainer;

	  // reset reference
	  referencingObject.set(referenceProperty, previousReference);

	  // remove new element
	  newObjectContainer.splice(newObjectContainer.indexOf(referencedObject), 1);

	  return context.changed;
	};


/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';

	var ElementHelper = {};
	module.exports = ElementHelper;

	/**
	 * Creates a new element and set the parent to it
	 *
	 * @method ElementHelper#createElement
	 *
	 * @param {String} elementType of the new element
	 * @param {Object} properties of the new element in key-value pairs
	 * @param {moddle.object} parent of the new element
	 * @param {BpmnFactory} factory which creates the new element
	 *
	 * @returns {djs.model.Base} element which is created
	 */
	ElementHelper.createElement = function(elementType, properties, parent, factory) {
	  var element = factory.create(elementType, properties);
	  element.$parent = parent;

	  return element;
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var forEach = __webpack_require__(4);

	var elementHelper = __webpack_require__(57);

	/**
	 * A handler that implements a BPMN 2.0 property update
	 * for business objects which are not represented in the
	 * diagram.
	 *
	 * This is useful in the context of the properties panel in
	 * order to update child elements of elements visible in
	 * the diagram.
	 *
	 * Example: perform an update of a specific event definition
	 * of an intermediate event.
	 *
	 * @class
	 * @constructor
	 */
	function CreateBusinessObjectListHandler(elementRegistry, bpmnFactory) {
	  this._elementRegistry = elementRegistry;
	  this._bpmnFactory = bpmnFactory;
	}

	CreateBusinessObjectListHandler.$inject = [ 'elementRegistry', 'bpmnFactory' ];

	module.exports = CreateBusinessObjectListHandler;

	function ensureNotNull(prop, name) {
	  if (!prop) {
	    throw new Error(name + ' required');
	  }
	  return prop;

	}
	function ensureList(prop, name) {
	  if (!prop || Object.prototype.toString.call(prop) !== '[object Array]' ) {
	    throw new Error(name + ' needs to be a list');
	  }
	  return prop;
	}

	////// api /////////////////////////////////////////////

	/**
	 * Creates a new element under a provided parent and updates / creates a reference to it in
	 * one atomic action.
	 *
	 * @method  CreateBusinessObjectListHandler#execute
	 *
	 * @param {Object} context
	 * @param {djs.model.Base} context.element which is the context for the reference
	 * @param {moddle.referencingObject} context.referencingObject the object which creates the reference
	 * @param {String} context.referenceProperty the property of the referencingObject which makes the reference
	 * @param {moddle.newObject} context.newObject the new object to add
	 * @param {moddle.newObjectContainer} context.newObjectContainer the container for the new object
	 *
	 * @return {Array<djs.mode.Base>} the updated element
	 */
	CreateBusinessObjectListHandler.prototype.execute = function(context) {

	  var currentObject = ensureNotNull(context.currentObject, 'currentObject'),
	      propertyName = ensureNotNull(context.propertyName, 'propertyName'),
	      newObjects = ensureList(context.newObjects, 'newObjects'),
	      changed = [ context.element ]; // this will not change any diagram-js elements


	  var childObjects = [];
	  var self = this;

	  // create new array of business objects
	  forEach(newObjects, function(obj) {
	    var element = elementHelper.createElement(obj.type, obj.properties, currentObject, self._bpmnFactory);

	    childObjects.push(element);
	  });
	  context.childObject = childObjects;

	  // adjust array reference in the parent business object
	  context.previousChilds = currentObject[propertyName];
	  currentObject[propertyName] = childObjects;

	  context.changed = changed;

	  // indicate changed on objects affected by the update
	  return changed;
	};

	/**
	 * Reverts the update
	 *
	 * @method  CreateBusinessObjectListHandler#revert
	 *
	 * @param {Object} context
	 *
	 * @return {djs.mode.Base} the updated element
	 */
	CreateBusinessObjectListHandler.prototype.revert = function(context) {

	  var currentObject = context.currentObject,
	      propertyName = context.propertyName,
	      previousChilds = context.previousChilds;

	  // remove new element
	  currentObject.set(propertyName, previousChilds);

	  return context.changed;
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var forEach = __webpack_require__(4);

	/**
	 * A handler that implements a BPMN 2.0 property update
	 * for business object lists which are not represented in the
	 * diagram.
	 *
	 * This is useful in the context of the properties panel in
	 * order to update child elements of elements visible in
	 * the diagram.
	 *
	 * Example: perform an update of a specific event definition
	 * of an intermediate event.
	 *
	 * @class
	 * @constructor
	 */
	function UpdateBusinessObjectListHandler(elementRegistry, bpmnFactory) {
	  this._elementRegistry = elementRegistry;
	  this._bpmnFactory = bpmnFactory;
	}

	UpdateBusinessObjectListHandler.$inject = [ 'elementRegistry', 'bpmnFactory' ];

	module.exports = UpdateBusinessObjectListHandler;

	function ensureNotNull(prop, name) {
	  if (!prop) {
	    throw new Error(name + 'required');
	  }
	  return prop;
	}

	////// api /////////////////////////////////////////////

	/**
	 * Updates a element under a provided parent.
	 */
	UpdateBusinessObjectListHandler.prototype.execute = function(context) {

	  var currentObject = ensureNotNull(context.currentObject, 'currentObject'),
	      propertyName = ensureNotNull(context.propertyName, 'propertyName'),
	      updatedObjectList = context.updatedObjectList,
	      objectsToRemove = context.objectsToRemove || [],
	      objectsToAdd = context.objectsToAdd || [],
	      changed = [ context.element], // this will not change any diagram-js elements
	      referencePropertyName;

	  if (context.referencePropertyName) {
	    referencePropertyName = context.referencePropertyName;
	  }

	  var objectList = currentObject[propertyName];
	  // adjust array reference in the parent business object
	  context.previousList = currentObject[propertyName];

	  if (updatedObjectList) {
	    currentObject[propertyName] = updatedObjectList;
	  }
	  else {
	    var listCopy = [];
	    // remove all objects which should be removed
	    forEach(objectList, function(object) {
	      if (objectsToRemove.indexOf(object) == -1) {
	        listCopy.push(object);
	      }
	    });
	    // add all objects which should be added
	    listCopy = listCopy.concat(objectsToAdd);

	    // set property to new list
	    if (listCopy.length > 0 || !referencePropertyName) {

	      // as long as there are elements in the list update the list
	      currentObject[propertyName] = listCopy;
	    } else if (referencePropertyName) {

	      // remove the list when it is empty
	      var parentObject = currentObject.$parent;
	      parentObject.set(referencePropertyName, undefined);
	    }
	  }

	  context.changed = changed;

	  // indicate changed on objects affected by the update
	  return changed;
	};

	/**
	 * Reverts the update
	 *
	 * @method  CreateBusinessObjectListHandler#revert
	 *
	 * @param {Object} context
	 *
	 * @return {djs.mode.Base} the updated element
	 */
	UpdateBusinessObjectListHandler.prototype.revert = function(context) {

	  var currentObject = context.currentObject,
	      propertyName = context.propertyName,
	      previousList = context.previousList,
	      parentObject = currentObject.$parent;

	  if (context.referencePropertyName) {
	    parentObject.set(context.referencePropertyName, currentObject);
	  }

	  // remove new element
	  currentObject.set(propertyName, previousList);

	  return context.changed;
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var forEach = __webpack_require__(4);

	/**
	 * A handler that combines and executes multiple commands.
	 *
	 * All updates are bundled on the command stack and executed in one step.
	 * This also makes it possible to revert the changes in one step.
	 *
	 * Example use case: remove the camunda:formKey attribute and in addition
	 * add all form fields needed for the camunda:formData property.
	 *
	 * @class
	 * @constructor
	 */
	function MultiCommandHandler(commandStack) {
	  this._commandStack = commandStack;
	}

	MultiCommandHandler.$inject = [ 'commandStack' ];

	module.exports = MultiCommandHandler;

	MultiCommandHandler.prototype.preExecute = function(context) {

	  var commandStack = this._commandStack;

	  forEach(context, function(command) {
	    commandStack.execute(command.cmd, command.context);
	  });
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var domify = __webpack_require__(62),
	    domQuery = __webpack_require__(64),
	    domRemove = __webpack_require__(66),
	    domClasses = __webpack_require__(67),
	    domClosest = __webpack_require__(70),
	    domAttr = __webpack_require__(73),
	    domDelegate = __webpack_require__(74),
	    domMatches = __webpack_require__(77);

	var forEach = __webpack_require__(4),
	    filter = __webpack_require__(78),
	    get = __webpack_require__(81),
	    keys = __webpack_require__(12),
	    isEmpty = __webpack_require__(82),
	    isArray = __webpack_require__(23),
	    xor = __webpack_require__(84),
	    debounce = __webpack_require__(94);

	var updateSelection = __webpack_require__(96);

	var scrollTabs = __webpack_require__(97);

	var getBusinessObject = __webpack_require__(55).getBusinessObject;

	var HIDE_CLASS = 'bpp-hidden';
	var DEBOUNCE_DELAY = 300;


	function isToggle(node) {
	  return node.type === 'checkbox' || node.type === 'radio';
	}

	function isSelect(node) {
	  return node.type === 'select-one';
	}

	function isContentEditable(node) {
	  return domAttr(node, 'contenteditable');
	}

	function getPropertyPlaceholders(node) {
	  var selector = 'input[name], textarea[name], [data-value], [contenteditable]';
	  var placeholders = domQuery.all(selector, node);
	  if ((!placeholders || !placeholders.length) && domMatches(node, selector)) {
	    placeholders = [ node ];
	  }
	  return placeholders;
	}

	/**
	 * Return all active form controls.
	 * This excludes the invisible controls unless all is true
	 *
	 * @param {Element} node
	 * @param {Boolean} [all=false]
	 */
	function getFormControls(node, all) {
	  var controls = domQuery.all('input[name], textarea[name], select[name], [contenteditable]', node);

	  if (!controls || !controls.length) {
	    controls = domMatches(node, 'option') ? [ node ] : controls;
	  }

	  if (!all) {
	    controls = filter(controls, function(node) {
	      return !domClosest(node, '.' + HIDE_CLASS);
	    });
	  }

	  return controls;
	}

	function getFormControlValuesInScope(entryNode) {
	  var values = {};

	  var controlNodes = getFormControls(entryNode);

	  forEach(controlNodes, function(controlNode) {
	    var value = controlNode.value;

	    var name = domAttr(controlNode, 'name') || domAttr(controlNode, 'data-name');

	    // take toggle state into account for radio / checkboxes
	    if (isToggle(controlNode)) {
	      if (controlNode.checked) {
	        if (!domAttr(controlNode, 'value')) {
	          value = true;
	        } else {
	          value = controlNode.value;
	        }
	      } else {
	        value = null;
	      }
	    } else
	    if (isContentEditable(controlNode)) {
	      value = controlNode.innerText;
	    }

	    if (value !== null) {
	      // return the actual value
	      // handle serialization in entry provider
	      // (ie. if empty string should be serialized or not)
	      values[name] = value;
	    }
	  });

	  return values;

	}

	/**
	 * Extract input values from entry node
	 *
	 * @param  {DOMElement} entryNode
	 * @returns {Object}
	 */
	function getFormControlValues(entryNode) {

	  var values;

	  var listContainer = domQuery('[data-list-entry-container]', entryNode);
	  if (listContainer) {
	    values = [];
	    var listNodes = listContainer.children || [];
	    forEach(listNodes, function(listNode) {
	      values.push(getFormControlValuesInScope(listNode));
	    });
	  }
	  else {
	    values = getFormControlValuesInScope(entryNode);
	  }

	  return values;
	}

	/**
	 * Return true if the given form extracted value equals
	 * to an old cached version.
	 *
	 * @param {Object} value
	 * @param {Object} oldValue
	 * @return {Boolean}
	 */
	function valueEqual(value, oldValue) {

	  if (value && !oldValue) {
	    return false;
	  }

	  var allKeys = keys(value).concat(keys(oldValue));

	  return allKeys.every(function(key) {
	    return value[key] === oldValue[key];
	  });
	}

	/**
	 * Return true if the given form extracted value(s)
	 * equal an old cached version.
	 *
	 * @param {Array<Object>|Object} values
	 * @param {Array<Object>|Object} oldValues
	 * @return {Boolean}
	 */
	function valuesEqual(values, oldValues) {

	  if (isArray(values)) {

	    if (values.length !== oldValues.length) {
	      return false;
	    }

	    return values.every(function(v, idx) {
	      return valueEqual(v, oldValues[idx]);
	    });
	  }

	  return valueEqual(values, oldValues);
	}

	/**
	 * Return a mapping of { id: entry } for all entries in the given groups in the given tabs.
	 *
	 * @param {Object} tabs
	 * @return {Object}
	 */
	function extractEntries(tabs) {
	  return indexBy(flattenDeep(map(flattenDeep(map(tabs, 'groups')), 'entries')), 'id');
	}

	/**
	 * Return a mapping of { id: group } for all groups in the given tabs.
	 *
	 * @param {Object} tabs
	 * @return {Object}
	 */
	function extractGroups(tabs) {
	  return indexBy(flattenDeep(map(tabs, 'groups')), 'id');
	}

	/**
	 * A properties panel implementation.
	 *
	 * To use it provide a `propertiesProvider` component that knows
	 * about which properties to display.
	 *
	 * Properties edit state / visibility can be intercepted
	 * via a custom {@link PropertiesActivator}.
	 *
	 * @class
	 * @constructor
	 *
	 * @param {Object} config
	 * @param {EventBus} eventBus
	 * @param {Modeling} modeling
	 * @param {PropertiesProvider} propertiesProvider
	 * @param {Canvas} canvas
	 * @param {CommandStack} commandStack
	 */
	function PropertiesPanel(config, eventBus, modeling, propertiesProvider, commandStack, canvas) {

	  this._eventBus = eventBus;
	  this._modeling = modeling;
	  this._commandStack = commandStack;
	  this._canvas = canvas;
	  this._propertiesProvider = propertiesProvider;

	  this._init(config);
	}

	PropertiesPanel.$inject = [
	  'config.propertiesPanel',
	  'eventBus',
	  'modeling',
	  'propertiesProvider',
	  'commandStack',
	  'canvas' ];

	module.exports = PropertiesPanel;


	PropertiesPanel.prototype._init = function(config) {

	  var eventBus = this._eventBus;

	  var self = this;

	  /**
	   * Select the root element once it is added to the canvas
	   */
	  eventBus.on('root.added', function(e) {
	    self.update(e.element);
	  });

	  eventBus.on('selection.changed', function(e) {
	    var newElement = e.newSelection[0];

	    self.update(newElement);
	  });

	  // add / update tab-bar scrolling
	  eventBus.on([
	    'propertiesPanel.changed',
	    'propertiesPanel.resized'
	  ], function(event) {

	    var tabBarNode = domQuery('.bpp-properties-tab-bar', self._container);

	    if (!tabBarNode) {
	      return;
	    }

	    var scroller = scrollTabs.get(tabBarNode);

	    if (!scroller) {

	      // we did not initialize yet, do that
	      // now and make sure we select the active
	      // tab on scroll update
	      scroller = scrollTabs(tabBarNode, {
	        selectors: {
	          tabsContainer: '.bpp-properties-tabs-links',
	          tab: '.bpp-properties-tabs-links li',
	          ignore: '.bpp-hidden',
	          active: '.bpp-active'
	        }
	      });


	      scroller.on('scroll', function(newActiveNode, oldActiveNode, direction) {

	        var linkNode = domQuery('[data-tab-target]', newActiveNode);

	        var tabId = domAttr(linkNode, 'data-tab-target');

	        self.activateTab(tabId);
	      });
	    }

	    // react on tab changes and or tabContainer resize
	    // and make sure the active tab is shown completely
	    scroller.update();
	  });

	  eventBus.on('elements.changed', function(e) {

	    var current = self._current;
	    var element = current && current.element;

	    if (element) {
	      if (e.elements.indexOf(element) !== -1) {
	        self.update(element);
	      }
	    }
	  });

	  eventBus.on('diagram.destroy', function() {
	    self.detach();
	  });

	  this._container = domify('<div class="bpp-properties-panel"></div>');

	  this._bindListeners(this._container);

	  if (config && config.parent) {
	    this.attachTo(config.parent);
	  }
	};


	PropertiesPanel.prototype.attachTo = function(parentNode) {

	  if (!parentNode) {
	    throw new Error('parentNode required');
	  }

	  // ensure we detach from the
	  // previous, old parent
	  this.detach();

	  // unwrap jQuery if provided
	  if (parentNode.get) {
	    parentNode = parentNode.get(0);
	  }

	  if (typeof parentNode === 'string') {
	    parentNode = domQuery(parentNode);
	  }

	  var container = this._container;

	  parentNode.appendChild(container);

	  this._emit('attach');
	};

	PropertiesPanel.prototype.detach = function() {

	  var container = this._container,
	      parentNode = container.parentNode;

	  if (!parentNode) {
	    return;
	  }

	  this._emit('detach');

	  parentNode.removeChild(container);
	};


	/**
	 * Select the given tab within the properties panel.
	 *
	 * @param {Object|String} tab
	 */
	PropertiesPanel.prototype.activateTab = function(tab) {

	  var tabId = typeof tab === 'string' ? tab : tab.id;

	  var current = this._current;

	  var panelNode = current.panel;

	  var allTabNodes = domQuery.all('.bpp-properties-tab', panelNode),
	      allTabLinkNodes = domQuery.all('.bpp-properties-tab-link', panelNode);

	  forEach(allTabNodes, function(tabNode) {

	    var currentTabId = domAttr(tabNode, 'data-tab');

	    domClasses(tabNode).toggle('bpp-active', tabId === currentTabId);
	  });

	  forEach(allTabLinkNodes, function(tabLinkNode) {

	    var tabLink = domQuery('[data-tab-target]', tabLinkNode),
	        currentTabId = domAttr(tabLink, 'data-tab-target');

	    domClasses(tabLinkNode).toggle('bpp-active', tabId === currentTabId);
	  });
	};

	/**
	 * Update the DOM representation of the properties panel
	 */
	PropertiesPanel.prototype.update = function(element) {
	  var current = this._current;

	  // no actual selection change
	  var needsCreate = true;

	  if (typeof element === 'undefined') {

	    // use RootElement of BPMN diagram to generate properties panel if no element is selected
	    element = this._canvas.getRootElement();
	  }

	  var newTabs = this._propertiesProvider.getTabs(element);

	  if (current && current.element === element) {
	    // see if we can reuse the existing panel

	    needsCreate = this._entriesChanged(current, newTabs);
	    //needsCreate = false;
	  }

	  if (needsCreate) {

	    if (current) {

	      // get active tab from the existing panel before remove it
	      var activeTabNode = domQuery('.bpp-properties-tab.bpp-active', current.panel);

	      var activeTabId;
	      if (activeTabNode) {
	        activeTabId = domAttr(activeTabNode, 'data-tab');
	      }

	      // remove old panel
	      domRemove(current.panel);
	    }

	    this._current = this._create(element, newTabs);

	    // activate the saved active tab from the remove panel or the first tab
	    (activeTabId) ? this.activateTab(activeTabId) : this.activateTab(this._current.tabs[0]);

	  }

	  if (this._current) {
	    // make sure correct tab contents are visible
	    this._updateActivation(this._current);

	  }

	  this._emit('changed');
	};


	/**
	 * Returns true if one of two groups has different entries than the other.
	 *
	 * @param  {Object} current
	 * @param  {Object} newTabs
	 * @return {Booelan}
	 */
	PropertiesPanel.prototype._entriesChanged = function(current, newTabs) {

	  var oldEntryIds = keys(current.entries),
	      newEntryIds = keys(extractEntries(newTabs));

	  return !isEmpty(xor(oldEntryIds, newEntryIds));
	};

	PropertiesPanel.prototype._emit = function(event) {
	  this._eventBus.fire('propertiesPanel.' + event, { panel: this, current: this._current });
	};

	PropertiesPanel.prototype._bindListeners = function(container) {

	  var self = this;

	  // handles a change for a given event
	  var handleChange = function handleChange(event) {

	    // see if we handle a change inside a [data-entry] element.
	    // if not, drop out
	    var node = domClosest(event.delegateTarget, '[data-entry]'),
	        entryId, entry;

	    // change from outside a [data-entry] element, simply ignore
	    if (!node) {
	      return;
	    }

	    entryId = domAttr(node, 'data-entry');
	    entry = self.getEntry(entryId);

	    var values = getFormControlValues(node);

	    if (event.type === 'change') {

	      // - if the "data-on-change" attribute is present and a value is changed,
	      //   then the associated action is performed.
	      // - if the associated action returns "true" then an update to the business
	      //   object is done
	      // - if it does not return "true", then only the DOM content is updated
	      var onChangeAction = event.delegateTarget.getAttribute('data-on-change');

	      if (onChangeAction) {
	        var isEntryDirty = self.executeAction(entry, node, onChangeAction, event);

	        if (!isEntryDirty) {
	          return self.update(self._current.element);
	        }
	      }
	    }
	    self.applyChanges(entry, values, node);
	    self.updateState(entry, node);
	  };

	  // debounce update only elements that are target of key events,
	  // i.e. INPUT and TEXTAREA. SELECTs will trigger an immediate update anyway.
	  domDelegate.bind(container, 'input, textarea, [contenteditable]', 'input', debounce(handleChange, DEBOUNCE_DELAY));
	  domDelegate.bind(container, 'input, textarea, select, [contenteditable]', 'change', handleChange);

	  domDelegate.bind(container, '[data-action]', 'click', function onClick(event) {

	    // triggers on all inputs
	    var inputNode = event.delegateTarget;
	    var entryNode = domClosest(inputNode, '[data-entry]');

	    var actionId = domAttr(inputNode, 'data-action'),
	        entryId = domAttr(entryNode, 'data-entry');

	    var entry = self.getEntry(entryId);

	    var isEntryDirty = self.executeAction(entry, entryNode, actionId, event);

	    if (isEntryDirty) {
	      var values = getFormControlValues(entryNode);

	      self.applyChanges(entry, values, entryNode);
	    }

	    self.updateState(entry, entryNode);
	  });

	  function handleInput(event, element) {
	    // triggers on all inputs
	    var inputNode = event.delegateTarget;

	    var entryNode = domClosest(inputNode, '[data-entry]');

	    // only work on data entries
	    if (!entryNode) {
	      return;
	    }

	    var eventHandlerId = domAttr(inputNode, 'data-blur'),
	        entryId = domAttr(entryNode, 'data-entry');

	    var entry = self.getEntry(entryId);

	    var isEntryDirty = self.executeAction(entry, entryNode, eventHandlerId, event);

	    if (isEntryDirty) {
	      var values = getFormControlValues(entryNode);

	      self.applyChanges(entry, values, entryNode);
	    }

	    self.updateState(entry, entryNode);
	  }

	  domDelegate.bind(container, '[data-blur]', 'blur', handleInput, true);

	  // make tab links interactive
	  domDelegate.bind(container, '.bpp-properties-tabs-links [data-tab-target]', 'click', function(event) {
	    event.preventDefault();

	    var delegateTarget = event.delegateTarget;

	    var tabId = domAttr(delegateTarget, 'data-tab-target');

	    // activate tab on link click
	    self.activateTab(tabId);
	  });

	};

	PropertiesPanel.prototype.updateState = function(entry, entryNode) {
	  this.updateShow(entry, entryNode);
	  this.updateDisable(entry, entryNode);
	};

	/**
	 * Update the visibility of the entry node in the DOM
	 */
	PropertiesPanel.prototype.updateShow = function(entry, node) {

	  var current = this._current;

	  if (!current) {
	    return;
	  }

	  var showNodes = domQuery.all('[data-show]', node) || [];

	  forEach(showNodes, function(showNode) {

	    var expr = domAttr(showNode, 'data-show');
	    var fn = get(entry, expr);
	    if (fn) {
	      var scope = domClosest(showNode, '[data-scope]') || node;
	      var shouldShow = fn(current.element, node, showNode, scope) || false;
	      var hasClass = domClasses(showNode).has(HIDE_CLASS);
	      if (shouldShow) {
	        if (hasClass) {
	          domClasses(showNode).remove(HIDE_CLASS);
	        }
	      } else {
	        domClasses(showNode).add(HIDE_CLASS);
	      }
	    }
	  });
	};

	/**
	 * Evaluates a given function. If it returns true, then the
	 * node is marked as "disabled".
	 */
	PropertiesPanel.prototype.updateDisable = function(entry, node) {
	  var current = this._current;

	  if (!current) {
	    return;
	  }

	  var nodes = domQuery.all('[data-disable]', node) || [];

	  forEach(nodes, function(currentNode) {
	    var expr = domAttr(currentNode, 'data-disable');
	    var fn = get(entry, expr);
	    if (fn) {
	      var scope = domClosest(currentNode, '[data-scope]') || node;
	      var shouldDisable = fn(current.element, node, currentNode, scope) || false;
	      domAttr(currentNode, 'disabled', shouldDisable ? '' : null);
	    }
	  });
	};

	PropertiesPanel.prototype.executeAction = function(entry, entryNode, actionId, event) {
	  var current = this._current;

	  if (!current) {
	    return;
	  }

	  var fn = get(entry, actionId);
	  if (fn) {
	    var scopeNode = domClosest(event.target, '[data-scope]') || entryNode;
	    return fn.apply(entry, [ current.element, entryNode, event, scopeNode ]);
	  }
	};

	/**
	 * Apply changes to the business object by executing a command
	 */
	PropertiesPanel.prototype.applyChanges = function(entry, values, containerElement) {

	  var element = this._current.element;

	  // ensure we only update the model if we got dirty changes
	  if (valuesEqual(values, entry.oldValues)) {
	    return;
	  }

	  var command = entry.set(element, values, containerElement);

	  var commandToExecute;

	  if (isArray(command)) {
	    if (command.length) {
	      commandToExecute = {
	        cmd: 'properties-panel.multi-command-executor',
	        context: flattenDeep(command)
	      };
	    }
	  } else {
	    commandToExecute = command;
	  }

	  if (commandToExecute) {
	    this._commandStack.execute(commandToExecute.cmd, commandToExecute.context || { element : element });
	  } else {
	    this.update(element);
	  }
	};


	/**
	 * apply validation errors in the DOM and show or remove an error message near the entry node.
	 */
	PropertiesPanel.prototype.applyValidationErrors = function(validationErrors, entryNode) {

	  var valid = true;

	  var controlNodes = getFormControls(entryNode, true);

	  forEach(controlNodes, function(controlNode) {

	    var name = domAttr(controlNode, 'name') || domAttr(controlNode, 'data-name');

	    var error = validationErrors && validationErrors[name];

	    var errorMessageNode = domQuery('.bpp-error-message', controlNode.parentNode);

	    if (error) {
	      valid = false;

	      if (!errorMessageNode) {
	        errorMessageNode = domify('<div></div>');

	        domClasses(errorMessageNode).add('bpp-error-message');

	        // insert errorMessageNode after controlNode
	        controlNode.parentNode.insertBefore(errorMessageNode, controlNode.nextSibling);
	      }

	      errorMessageNode.innerHTML = error;

	      domClasses(controlNode).add('invalid');
	    } else {
	      domClasses(controlNode).remove('invalid');

	      if (errorMessageNode) {
	        controlNode.parentNode.removeChild(errorMessageNode);
	      }
	    }
	  });

	  return valid;
	};


	/**
	 * Check if the entry contains valid input
	 */
	PropertiesPanel.prototype.validate = function(entry, values, entryNode) {
	  var self = this;

	  var current = this._current;

	  var valid = true;

	  entryNode = entryNode || domQuery('[data-entry="' + entry.id + '"]', current.panel);

	  if (values instanceof Array) {
	    var listContainer = domQuery('[data-list-entry-container]', entryNode),
	        listEntryNodes = listContainer.children || [];

	    // create new elements
	    for (var i = 0; i < values.length; i++) {
	      var listValue = values[i];

	      if (entry.validateListItem) {

	        var validationErrors = entry.validateListItem(current.element, listValue, entryNode, i),
	            listEntryNode = listEntryNodes[i];

	        valid = self.applyValidationErrors(validationErrors, listEntryNode) && valid;
	      }
	    }
	  }
	  else {
	    if (entry.validate) {
	      this.validationErrors = entry.validate(current.element, values, entryNode);

	      valid = self.applyValidationErrors(this.validationErrors, entryNode) && valid;
	    }
	  }

	  return valid;
	};

	PropertiesPanel.prototype.getEntry = function(id) {
	  return this._current && this._current.entries[id];
	};

	var flattenDeep = __webpack_require__(156),
	    indexBy = __webpack_require__(158),
	    map = __webpack_require__(160);

	PropertiesPanel.prototype._create = function(element, tabs) {

	  if (!element) {
	    return null;
	  }

	  var containerNode = this._container;

	  var panelNode = this._createPanel(element, tabs);

	  containerNode.appendChild(panelNode);

	  var entries = extractEntries(tabs);
	  var groups = extractGroups(tabs);

	  return {
	    tabs: tabs,
	    groups: groups,
	    entries: entries,
	    element: element,
	    panel: panelNode
	  };
	};

	/**
	 * Update variable parts of the entry node on element changes.
	 *
	 * @param {djs.model.Base} element
	 * @param {EntryDescriptor} entry
	 * @param {Object} values
	 * @param {HTMLElement} entryNode
	 * @param {Number} idx
	 */
	PropertiesPanel.prototype._bindTemplate = function(element, entry, values, entryNode, idx) {

	  var eventBus = this._eventBus;

	  function isPropertyEditable(entry, propertyName) {
	    return eventBus.fire('propertiesPanel.isPropertyEditable', {
	      entry: entry,
	      propertyName: propertyName,
	      element: element
	    });
	  }

	  var inputNodes = getPropertyPlaceholders(entryNode);

	  forEach(inputNodes, function(node) {

	    var name,
	        newValue,
	        editable;

	    // we deal with an input element
	    if ('value' in node || isContentEditable(node) === 'true') {
	      name = domAttr(node, 'name') || domAttr(node, 'data-name');
	      newValue = values[name];

	      editable = isPropertyEditable(entry, name);
	      if (editable && entry.editable) {
	        editable = entry.editable(element, entryNode, node, name, newValue, idx);
	      }

	      domAttr(node, 'readonly', editable ? null : '');
	      domAttr(node, 'disabled', editable ? null : '');

	      // take full control over setting the value
	      // and possibly updating the input in entry#setControlValue
	      if (entry.setControlValue) {
	        entry.setControlValue(element, entryNode, node, name, newValue, idx);
	      } else if (isToggle(node)) {
	        setToggleValue(node, newValue);
	      } else if (isSelect(node)) {
	        setSelectValue(node, newValue);
	      } else {
	        setInputValue(node, newValue);
	      }
	    }

	    // we deal with some non-editable html element
	    else {
	      name = domAttr(node, 'data-value');
	      newValue = values[name];
	      if (entry.setControlValue) {
	        entry.setControlValue(element, entryNode, node, name, newValue, idx);
	      } else {
	        setTextValue(node, newValue);
	      }
	    }
	  });
	};

	// TODO(nikku): WTF freaking name? Change / clarify.
	PropertiesPanel.prototype._updateActivation = function(current) {
	  var self = this;

	  var eventBus = this._eventBus;

	  var element = current.element;

	  function isEntryVisible(entry) {
	    return eventBus.fire('propertiesPanel.isEntryVisible', {
	      entry: entry,
	      element: element
	    });
	  }

	  function isGroupVisible(group, element, groupNode) {
	    if (typeof group.enabled === 'function') {
	      return group.enabled(element, groupNode);
	    } else {
	      return true;
	    }
	  }

	  function isTabVisible(tab, element) {
	    if (typeof tab.enabled === 'function') {
	      return tab.enabled(element);
	    } else {
	      return true;
	    }
	  }

	  function toggleVisible(node, visible) {
	    domClasses(node).toggle(HIDE_CLASS, !visible);
	  }

	  // check whether the active tab is visible
	  // if not: set the first tab as active tab
	  function checkActiveTabVisibility(node, visible) {
	    var isActive = domClasses(node).has('bpp-active');
	    if (!visible && isActive) {
	      self.activateTab(current.tabs[0]);
	    }
	  }

	  function updateLabel(element, selector, text) {
	    var labelNode = domQuery(selector, element);

	    if (!labelNode) {
	      return;
	    }

	    labelNode.textContent = text;
	  }

	  var panelNode = current.panel;

	  forEach(current.tabs, function(tab) {

	    var tabNode = domQuery('[data-tab=' + tab.id + ']', panelNode);
	    var tabLinkNode = domQuery('[data-tab-target=' + tab.id + ']', panelNode).parentNode;

	    var tabVisible = false;

	    forEach(tab.groups, function(group) {

	      var groupVisible = false;

	      var groupNode = domQuery('[data-group=' + group.id + ']', tabNode);

	      forEach(group.entries, function(entry) {

	        var entryNode = domQuery('[data-entry="' + entry.id + '"]', groupNode);

	        var entryVisible = isEntryVisible(entry);

	        groupVisible = groupVisible || entryVisible;

	        toggleVisible(entryNode, entryVisible);

	        var values = 'get' in entry ? entry.get(element, entryNode) : {};

	        if (values instanceof Array) {
	          var listEntryContainer = domQuery('[data-list-entry-container]', entryNode);
	          var existingElements = listEntryContainer.children || [];

	          for (var i = 0; i < values.length; i++) {
	            var listValue = values[i];
	            var listItemNode = existingElements[i];
	            if (!listItemNode) {
	              listItemNode = domify(entry.createListEntryTemplate(listValue, i, listEntryContainer));
	              listEntryContainer.appendChild(listItemNode);
	            }
	            domAttr(listItemNode, 'data-index', i);

	            self._bindTemplate(element, entry, listValue, listItemNode, i);
	          }

	          var entriesToRemove = existingElements.length - values.length;

	          for (var j = 0; j < entriesToRemove; j++) {
	            // remove orphaned element
	            listEntryContainer.removeChild(listEntryContainer.lastChild);
	          }

	        } else {
	          self._bindTemplate(element, entry, values, entryNode);
	        }

	        // update conditionally visible elements
	        self.updateState(entry, entryNode);
	        self.validate(entry, values, entryNode);

	        // remember initial state for later dirty checking
	        entry.oldValues = getFormControlValues(entryNode);
	      });

	      if (typeof group.label === 'function') {
	        updateLabel(groupNode, '.group-label', group.label(element, groupNode));
	      }

	      groupVisible = groupVisible && isGroupVisible(group, element, groupNode);

	      tabVisible = tabVisible || groupVisible;

	      toggleVisible(groupNode, groupVisible);
	    });

	    tabVisible = tabVisible && isTabVisible(tab, element);

	    toggleVisible(tabNode, tabVisible);
	    toggleVisible(tabLinkNode, tabVisible);

	    checkActiveTabVisibility(tabNode, tabVisible);
	  });

	  // inject elements id into header
	  updateLabel(panelNode, '[data-label-id]', getBusinessObject(element).id || '');
	};

	PropertiesPanel.prototype._createPanel = function(element, tabs) {
	  var self = this;

	  var panelNode = domify('<div class="bpp-properties"></div>'),
	      headerNode = domify('<div class="bpp-properties-header">' +
	        '<div class="label" data-label-id></div>' +
	        '<div class="search">' +
	          '<input type="search" placeholder="Search for property" />' +
	          '<button><span>Search</span></button>' +
	        '</div>' +
	      '</div>'),
	      tabBarNode = domify('<div class="bpp-properties-tab-bar"></div>'),
	      tabLinksNode = domify('<ul class="bpp-properties-tabs-links"></ul>'),
	      tabContainerNode = domify('<div class="bpp-properties-tabs-container"></div>');

	  panelNode.appendChild(headerNode);

	  forEach(tabs, function(tab, tabIndex) {

	    if (!tab.id) {
	      throw new Error('tab must have an id');
	    }

	    var tabNode = domify('<div class="bpp-properties-tab" data-tab="' + tab.id + '"></div>'),
	        tabLinkNode = domify('<li class="bpp-properties-tab-link">' +
	          '<a href data-tab-target="' + tab.id + '">' + tab.label + '</a>' +
	        '</li>');

	    var groups = tab.groups;

	    forEach(groups, function(group) {

	      if (!group.id) {
	        throw new Error('group must have an id');
	      }

	      var groupNode = domify('<div class="bpp-properties-group" data-group="' + group.id + '">' +
	          '<span class="group-toggle"></span>' +
	          '<span class="group-label">' + group.label + '</span>' +
	        '</div>');

	      // TODO(nre): use event delegation to handle that...
	      groupNode.querySelector('.group-toggle').addEventListener('click', function(evt) {
	        domClasses(groupNode).toggle('group-closed');
	        evt.preventDefault();
	        evt.stopPropagation();
	      });
	      groupNode.addEventListener('click', function(evt) {
	        if (!evt.defaultPrevented && domClasses(groupNode).has('group-closed')) {
	          domClasses(groupNode).remove('group-closed');
	        }
	      });

	      forEach(group.entries, function(entry) {

	        if (!entry.id) {
	          throw new Error('entry must have an id');
	        }

	        var html = entry.html;

	        if (typeof html === 'string') {
	          html = domify(html);
	        }

	        // unwrap jquery
	        if (html.get) {
	          html = html.get(0);
	        }

	        var entryNode = domify('<div class="bpp-properties-entry" data-entry="' + entry.id + '"></div>');

	        forEach(entry.cssClasses || [], function(cssClass) {
	          domClasses(entryNode).add(cssClass);
	        });

	        entryNode.appendChild(html);

	        groupNode.appendChild(entryNode);

	        // update conditionally visible elements
	        self.updateState(entry, entryNode);
	      });

	      tabNode.appendChild(groupNode);
	    });

	    tabLinksNode.appendChild(tabLinkNode);
	    tabContainerNode.appendChild(tabNode);
	  });

	  tabBarNode.appendChild(tabLinksNode);

	  panelNode.appendChild(tabBarNode);
	  panelNode.appendChild(tabContainerNode);

	  return panelNode;
	};



	function setInputValue(node, value) {

	  var contentEditable = isContentEditable(node);

	  var oldValue = contentEditable ? node.innerText : node.value;

	  var selection;

	  // prevents input fields from having the value 'undefined'
	  if (value === undefined) {
	    value = '';
	  }

	  if (oldValue === value) {
	    return;
	  }

	  // update selection on undo/redo
	  if (document.activeElement === node) {
	    selection = updateSelection(getSelection(node), oldValue, value);
	  }

	  if (contentEditable) {
	    node.innerText = value;
	  } else {
	    node.value = value;
	  }

	  if (selection) {
	    setSelection(node, selection);
	  }
	}

	function setSelectValue(node, value) {
	  if (value !== undefined) {
	    node.value = value;
	  }
	}

	function setToggleValue(node, value) {
	  var nodeValue = node.value;

	  node.checked = (value === nodeValue) || (!domAttr(node, 'value') && value);
	}

	function setTextValue(node, value) {
	  node.textContent = value;
	}

	function getSelection(node) {

	  return isContentEditable(node) ? getContentEditableSelection(node) : {
	    start: node.selectionStart,
	    end: node.selectionEnd
	  };
	}

	function getContentEditableSelection(node) {

	  var selection = window.getSelection();

	  var focusNode = selection.focusNode,
	      focusOffset = selection.focusOffset,
	      anchorOffset = selection.anchorOffset;

	  if (!focusNode) {
	    throw new Error('not selected');
	  }

	  // verify we have selection on the current element
	  if (!node.contains(focusNode)) {
	    throw new Error('not selected');
	  }

	  return {
	    start: Math.min(focusOffset, anchorOffset),
	    end: Math.max(focusOffset, anchorOffset)
	  };
	}

	function setSelection(node, selection) {

	  if (isContentEditable(node)) {
	    setContentEditableSelection(node, selection);
	  } else {
	    node.selectionStart = selection.start;
	    node.selectionEnd = selection.end;
	  }
	}

	function setContentEditableSelection(node, selection) {

	  var focusNode,
	      domRange,
	      domSelection;

	  focusNode = node.firstChild || node,
	  domRange = document.createRange();
	  domRange.setStart(focusNode, selection.start);
	  domRange.setEnd(focusNode, selection.end);

	  domSelection = window.getSelection();
	  domSelection.removeAllRanges();
	  domSelection.addRange(domRange);
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(63);

/***/ },
/* 63 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */

	module.exports = parse;

	/**
	 * Tests for browser support.
	 */

	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}

	/**
	 * Wrap map from jquery.
	 */

	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};

	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];

	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */

	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');

	  // default to the global `document` object
	  if (!doc) doc = document;

	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);

	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

	  var tag = m[1];

	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }

	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;

	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }

	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }

	  return fragment;
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65);

/***/ },
/* 65 */
/***/ function(module, exports) {

	function one(selector, el) {
	  return el.querySelector(selector);
	}

	exports = module.exports = function(selector, el){
	  el = el || document;
	  return one(selector, el);
	};

	exports.all = function(selector, el){
	  el = el || document;
	  return el.querySelectorAll(selector);
	};

	exports.engine = function(obj){
	  if (!obj.one) throw new Error('.one callback required');
	  if (!obj.all) throw new Error('.all callback required');
	  one = obj.one;
	  exports.all = obj.all;
	  return exports;
	};


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function(el) {
	  el.parentNode && el.parentNode.removeChild(el);
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(68);

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var index = __webpack_require__(69);
	} catch (err) {
	  var index = __webpack_require__(69);
	}

	/**
	 * Whitespace regexp.
	 */

	var re = /\s+/;

	/**
	 * toString reference.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */

	module.exports = function(el){
	  return new ClassList(el);
	};

	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */

	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}

	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }

	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */

	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};

	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }

	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }

	  return this;
	};

	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */

	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};

	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(71);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var matches = __webpack_require__(72)

	module.exports = function (element, selector, checkYoSelf, root) {
	  element = checkYoSelf ? {parentNode: element} : element

	  root = root || document

	  // Make sure `element !== document` and `element != null`
	  // otherwise we get an illegal invocation
	  while ((element = element.parentNode) && element !== document) {
	    if (matches(element, selector))
	      return element
	    // After `matches` on the edge case that
	    // the selector matches the root
	    // (when the root is not the document)
	    if (element === root)
	      return
	  }
	}


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var query = __webpack_require__(65);
	} catch (err) {
	  var query = __webpack_require__(65);
	}

	/**
	 * Element prototype.
	 */

	var proto = Element.prototype;

	/**
	 * Vendor function.
	 */

	var vendor = proto.matches
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	/**
	 * Expose `match()`.
	 */

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (!el || el.nodeType !== 1) return false;
	  if (vendor) return vendor.call(el, selector);
	  var nodes = query.all(selector, el.parentNode);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * Set attribute `name` to `val`, or get attr `name`.
	 *
	 * @param {Element} el
	 * @param {String} name
	 * @param {String} [val]
	 * @api public
	 */

	module.exports = function(el, name, val) {
	  // get
	  if (arguments.length == 2) {
	    return el.getAttribute(name);
	  }

	  // remove
	  if (val === null) {
	    return el.removeAttribute(name);
	  }

	  // set
	  el.setAttribute(name, val);

	  return el;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(75);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var closest = __webpack_require__(71);
	} catch(err) {
	  var closest = __webpack_require__(71);
	}

	try {
	  var event = __webpack_require__(76);
	} catch(err) {
	  var event = __webpack_require__(76);
	}

	/**
	 * Delegate event `type` to `selector`
	 * and invoke `fn(e)`. A callback function
	 * is returned which may be passed to `.unbind()`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.bind = function(el, selector, type, fn, capture){
	  return event.bind(el, type, function(e){
	    var target = e.target || e.srcElement;
	    e.delegateTarget = closest(target, selector, true, el);
	    if (e.delegateTarget) fn.call(el, e);
	  }, capture);
	};

	/**
	 * Unbind event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @api public
	 */

	exports.unbind = function(el, type, fn, capture){
	  event.unbind(el, type, fn, capture);
	};


/***/ },
/* 76 */
/***/ function(module, exports) {

	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
	    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
	    prefix = bind !== 'addEventListener' ? 'on' : '';

	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.bind = function(el, type, fn, capture){
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};

	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.unbind = function(el, type, fn, capture){
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(72);

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(79),
	    baseCallback = __webpack_require__(32),
	    baseFilter = __webpack_require__(80),
	    isArray = __webpack_require__(23);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias select
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Array} Returns the new filtered array.
	 * @example
	 *
	 * _.filter([4, 5, 6], function(n) {
	 *   return n % 2 == 0;
	 * });
	 * // => [4, 6]
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * // using the `_.matches` callback shorthand
	 * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
	 * // => ['barney']
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.pluck(_.filter(users, 'active', false), 'user');
	 * // => ['fred']
	 *
	 * // using the `_.property` callback shorthand
	 * _.pluck(_.filter(users, 'active'), 'user');
	 * // => ['barney']
	 */
	function filter(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  predicate = baseCallback(predicate, thisArg, 3);
	  return func(collection, predicate);
	}

	module.exports = filter;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[++resIndex] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(6);

	/**
	 * The base implementation of `_.filter` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(46),
	    toPath = __webpack_require__(50);

	/**
	 * Gets the property value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, toPath(path), (path + ''));
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(23),
	    isArrayLike = __webpack_require__(17),
	    isFunction = __webpack_require__(15),
	    isObjectLike = __webpack_require__(16),
	    isString = __webpack_require__(83),
	    keys = __webpack_require__(12);

	/**
	 * Checks if `value` is empty. A value is considered empty unless it's an
	 * `arguments` object, array, string, or jQuery-like collection with a length
	 * greater than `0` or an object with own enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {Array|Object|string} value The value to inspect.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (value == null) {
	    return true;
	  }
	  if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
	      (isObjectLike(value) && isFunction(value.splice)))) {
	    return !value.length;
	  }
	  return !keys(value).length;
	}

	module.exports = isEmpty;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(16);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(85),
	    baseDifference = __webpack_require__(86),
	    baseUniq = __webpack_require__(93),
	    isArrayLike = __webpack_require__(17);

	/**
	 * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
	 * of the provided arrays.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of values.
	 * @example
	 *
	 * _.xor([1, 2], [4, 2]);
	 * // => [1, 4]
	 */
	function xor() {
	  var index = -1,
	      length = arguments.length;

	  while (++index < length) {
	    var array = arguments[index];
	    if (isArrayLike(array)) {
	      var result = result
	        ? arrayPush(baseDifference(result, array), baseDifference(array, result))
	        : array;
	    }
	  }
	  return result ? baseUniq(result) : [];
	}

	module.exports = xor;


/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(87),
	    cacheIndexOf = __webpack_require__(89),
	    createCache = __webpack_require__(90);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.difference` which accepts a single array
	 * of values to exclude.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values) {
	  var length = array ? array.length : 0,
	      result = [];

	  if (!length) {
	    return result;
	  }
	  var index = -1,
	      indexOf = baseIndexOf,
	      isCommon = true,
	      cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
	      valuesLength = values.length;

	  if (cache) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	    values = cache;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index];

	    if (isCommon && value === value) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === value) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (indexOf(values, value, 0) < 0) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(88);

	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOf;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = indexOfNaN;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	function cacheIndexOf(cache, value) {
	  var data = cache.data,
	      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

	  return result ? 0 : -1;
	}

	module.exports = cacheIndexOf;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var SetCache = __webpack_require__(91),
	    getNative = __webpack_require__(13);

	/** Native method references. */
	var Set = getNative(global, 'Set');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');

	/**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
	function createCache(values) {
	  return (nativeCreate && Set) ? new SetCache(values) : null;
	}

	module.exports = createCache;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var cachePush = __webpack_require__(92),
	    getNative = __webpack_require__(13);

	/** Native method references. */
	var Set = getNative(global, 'Set');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');

	/**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var length = values ? values.length : 0;

	  this.data = { 'hash': nativeCreate(null), 'set': new Set };
	  while (length--) {
	    this.push(values[length]);
	  }
	}

	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;

	module.exports = SetCache;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var data = this.data;
	  if (typeof value == 'string' || isObject(value)) {
	    data.set.add(value);
	  } else {
	    data.hash[value] = true;
	  }
	}

	module.exports = cachePush;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(87),
	    cacheIndexOf = __webpack_require__(89),
	    createCache = __webpack_require__(90);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.uniq` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The function invoked per iteration.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee) {
	  var index = -1,
	      indexOf = baseIndexOf,
	      length = array.length,
	      isCommon = true,
	      isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
	      seen = isLarge ? createCache() : null,
	      result = [];

	  if (seen) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	  } else {
	    isLarge = false;
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value, index, array) : value;

	    if (isCommon && value === value) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (indexOf(seen, computed, 0) < 0) {
	      if (iteratee || isLarge) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseUniq;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11),
	    now = __webpack_require__(95);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed invocations. Provide an options object to indicate that `func`
	 * should be invoked on the leading and/or trailing edge of the `wait` timeout.
	 * Subsequent calls to the debounced function return the result of the last
	 * `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=false] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	 *  delayed before it's invoked.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // avoid costly calculations while the window size is in flux
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // ensure `batchLog` is invoked once after 1 second of debounced calls
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', _.debounce(batchLog, 250, {
	 *   'maxWait': 1000
	 * }));
	 *
	 * // cancel a debounced call
	 * var todoChanges = _.debounce(batchLog, 1000);
	 * Object.observe(models.todo, todoChanges);
	 *
	 * Object.observe(models, function(changes) {
	 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	 *     todoChanges.cancel();
	 *   }
	 * }, ['delete']);
	 *
	 * // ...at some point `models.todo` is changed
	 * models.todo.completed = true;
	 *
	 * // ...before 1 second has passed `models.todo` is deleted
	 * // which cancels the debounced `todoChanges` call
	 * delete models.todo;
	 */
	function debounce(func, wait, options) {
	  var args,
	      maxTimeoutId,
	      result,
	      stamp,
	      thisArg,
	      timeoutId,
	      trailingCall,
	      lastCalled = 0,
	      maxWait = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = wait < 0 ? 0 : (+wait || 0);
	  if (options === true) {
	    var leading = true;
	    trailing = false;
	  } else if (isObject(options)) {
	    leading = !!options.leading;
	    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function cancel() {
	    if (timeoutId) {
	      clearTimeout(timeoutId);
	    }
	    if (maxTimeoutId) {
	      clearTimeout(maxTimeoutId);
	    }
	    lastCalled = 0;
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	  }

	  function complete(isCalled, id) {
	    if (id) {
	      clearTimeout(id);
	    }
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	    if (isCalled) {
	      lastCalled = now();
	      result = func.apply(thisArg, args);
	      if (!timeoutId && !maxTimeoutId) {
	        args = thisArg = undefined;
	      }
	    }
	  }

	  function delayed() {
	    var remaining = wait - (now() - stamp);
	    if (remaining <= 0 || remaining > wait) {
	      complete(trailingCall, maxTimeoutId);
	    } else {
	      timeoutId = setTimeout(delayed, remaining);
	    }
	  }

	  function maxDelayed() {
	    complete(trailing, timeoutId);
	  }

	  function debounced() {
	    args = arguments;
	    stamp = now();
	    thisArg = this;
	    trailingCall = trailing && (timeoutId || !leading);

	    if (maxWait === false) {
	      var leadingCall = leading && !timeoutId;
	    } else {
	      if (!maxTimeoutId && !leading) {
	        lastCalled = stamp;
	      }
	      var remaining = maxWait - (stamp - lastCalled),
	          isCalled = remaining <= 0 || remaining > maxWait;

	      if (isCalled) {
	        if (maxTimeoutId) {
	          maxTimeoutId = clearTimeout(maxTimeoutId);
	        }
	        lastCalled = stamp;
	        result = func.apply(thisArg, args);
	      }
	      else if (!maxTimeoutId) {
	        maxTimeoutId = setTimeout(maxDelayed, remaining);
	      }
	    }
	    if (isCalled && timeoutId) {
	      timeoutId = clearTimeout(timeoutId);
	    }
	    else if (!timeoutId && wait !== maxWait) {
	      timeoutId = setTimeout(delayed, wait);
	    }
	    if (leadingCall) {
	      isCalled = true;
	      result = func.apply(thisArg, args);
	    }
	    if (isCalled && !timeoutId && !maxTimeoutId) {
	      args = thisArg = undefined;
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  return debounced;
	}

	module.exports = debounce;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(13);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeNow = getNative(Date, 'now');

	/**
	 * Gets the number of milliseconds that have elapsed since the Unix epoch
	 * (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @category Date
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = nativeNow || function() {
	  return new Date().getTime();
	};

	module.exports = now;


/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Calculate the selection update for the given
	 * current and new input values.
	 *
	 * @param {Object} currentSelection as {start, end}
	 * @param {String} currentValue
	 * @param {String} newValue
	 *
	 * @return {Object} newSelection as {start, end}
	 */
	function calculateUpdate(currentSelection, currentValue, newValue) {

	  var currentCursor = currentSelection.start,
	      newCursor = currentCursor,
	      diff = newValue.length - currentValue.length,
	      idx;

	  var lengthDelta = newValue.length - currentValue.length;

	  var currentTail = currentValue.substring(currentCursor);

	  // check if we can remove common ending from the equation
	  // to be able to properly detect a selection change for
	  // the following scenarios:
	  //
	  //  * (AAATTT|TF) => (AAAT|TF)
	  //  * (AAAT|TF) =>  (AAATTT|TF)
	  //
	  if (newValue.lastIndexOf(currentTail) === newValue.length - currentTail.length) {
	    currentValue = currentValue.substring(0, currentValue.length - currentTail.length);
	    newValue = newValue.substring(0, newValue.length - currentTail.length);
	  }

	  // diff
	  var diff = createDiff(currentValue, newValue);

	  if (diff) {
	    if (diff.type === 'remove') {
	      newCursor = diff.newStart;
	    } else {
	      newCursor = diff.newEnd;
	    }
	  }

	  return range(newCursor);
	}

	module.exports = calculateUpdate;


	function createDiff(currentValue, newValue) {

	  var insert;

	  var l_str, l_char, l_idx = 0,
	      s_str, s_char, s_idx = 0;

	  if (newValue.length > currentValue.length) {
	    l_str = newValue;
	    s_str = currentValue;
	  } else {
	    l_str = currentValue;
	    s_str = newValue;
	  }

	  // assume there will be only one insert / remove and
	  // detect that _first_ edit operation only
	  while (l_idx < l_str.length) {

	    l_char = l_str.charAt(l_idx);
	    s_char = s_str.charAt(s_idx);

	    // chars no not equal
	    if (l_char !== s_char) {

	      if (!insert) {
	        insert = {
	          l_start: l_idx,
	          s_start: s_idx
	        };
	      }

	      l_idx++;
	    }

	    // chars equal (again?)
	    else {

	      if (insert && !insert.complete) {
	        insert.l_end = l_idx;
	        insert.s_end = s_idx;
	        insert.complete = true;
	      }

	      s_idx++;
	      l_idx++;
	    }
	  }

	  if (insert && !insert.complete) {
	    insert.complete = true;
	    insert.s_end = s_str.length;
	    insert.l_end = l_str.length;
	  }

	  // no diff
	  if (!insert) {
	    return;
	  }

	  if (newValue.length > currentValue.length) {
	    return {
	      newStart: insert.l_start,
	      newEnd: insert.l_end,
	      type: 'add'
	    };
	  } else {
	    return {
	      newStart: insert.s_start,
	      newEnd: insert.s_end,
	      type: newValue.length < currentValue.length ? 'remove' : 'replace'
	    };
	  }
	}

	/**
	 * Utility method for creating a new selection range {start, end} object.
	 *
	 * @param {Number} start
	 * @param {Number} [end]
	 *
	 * @return {Object} selection range as {start, end}
	 */
	function range(start, end) {
	  return {
	    start: start,
	    end: end === undefined ? start : end
	  };
	}

	module.exports.range = range;


	function splitStr(str, position) {
	  return {
	    before: str.substring(0, position),
	    after: str.substring(position)
	  };
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var domify = __webpack_require__(62),
	    domClasses = __webpack_require__(67),
	    domMatches = __webpack_require__(77),
	    domDelegate = __webpack_require__(74),
	    domQuery = __webpack_require__(64),
	    domEvent = __webpack_require__(98),
	    domAttr = __webpack_require__(73);

	var filter = __webpack_require__(99),
	    assign = __webpack_require__(147);

	var inherits = __webpack_require__(154);

	var EventEmitter = __webpack_require__(155);

	var DEFAULT_OPTIONS = {
	  scrollSymbolLeft: '‹',
	  scrollSymbolRight: '›'
	};


	/**
	 * This component adds the functionality to scroll over a list of tabs.
	 *
	 * It adds scroll buttons on the left and right side of the tabs container
	 * if not all tabs are visible. It also adds a mouse wheel listener on the
	 * container.
	 *
	 * If either a button is clicked or the mouse wheel is used over the tabs,
	 * a 'scroll' event is being fired. This event contains the node elements
	 * of the new and old active tab, and the direction in which the tab has
	 * changed relative to the old active tab.
	 *
	 * @example:
	 * (1) provide a tabs-container:
	 *
	 * var $el = (
	 *   <div>
	 *     <!-- button added by scrollTabs -->
	 *     <span class="scroll-tabs-button scroll-tabs-left"></span>
	 *     <ul class="my-tabs-container">
	 *       <li class="my-tab i-am-active"></li>
	 *       <li class="my-tab"></li>
	 *       <li class="my-tab ignore-me"></li>
	 *     </ul>
	 *     <!-- button added by scrollTabs -->
	 *     <span class="scroll-tabs-button scroll-tabs-right"></span>
	 *   </div>
	 * );
	 *
	 *
	 * (2) initialize scrollTabs:
	 *
	 *  var scroller = scrollTabs(tabBarNode, {
	 *    selectors: {
	 *      tabsContainer: '.my-tabs-container',
	 *      tab: '.my-tab',
	 *      ignore: '.ignore-me',
	 *      active: '.i-am-active'
	 *    }
	 *  });
	 *
	 *
	 * (3) listen to the scroll event:
	 *
	 * scroller.on('scroll', function(newActiveNode, oldActiveNode, direction) {
	 *   // direction is any of (-1: left, 1: right)
	 *   // activate the new active tab
	 * });
	 *
	 *
	 * (4) update the scroller if tabs change and or the tab container resizes:
	 *
	 * scroller.update();
	 *
	 *
	 * @param  {DOMElement} el
	 * @param  {Object} options
	 * @param  {Object} options.selectors
	 * @param  {String} options.selectors.tabsContainer the container all tabs are contained in
	 * @param  {String} options.selectors.tab a single tab inside the tab container
	 * @param  {String} options.selectors.ignore tabs that should be ignored during scroll left/right
	 * @param  {String} options.selectors.active selector for the current active tab
	 * @param  {String} [options.scrollSymbolLeft]
	 * @param  {String} [options.scrollSymbolRight]
	 */
	function ScrollTabs($el, options) {

	  // we are an event emitter
	  EventEmitter.call(this);

	  this.options = options = assign({}, DEFAULT_OPTIONS, options);
	  this.container = $el;

	  this._createScrollButtons($el, options);

	  this._bindEvents($el);
	}

	inherits(ScrollTabs, EventEmitter);


	/**
	 * Create a clickable scroll button
	 *
	 * @param {Object} options
	 * @param {String} options.className
	 * @param {String} options.label
	 * @param {Number} options.direction
	 *
	 * @return {DOMElement} The created scroll button node
	 */
	ScrollTabs.prototype._createButton = function(parentNode, options) {

	  var className = options.className,
	      direction = options.direction;


	  var button = domQuery('.' + className, parentNode);

	  if (!button) {
	    button = domify('<span class="scroll-tabs-button ' + className + '">' +
	                                options.label +
	                              '</span>');

	    parentNode.insertBefore(button, parentNode.childNodes[0]);
	  }

	  domAttr(button, 'data-direction', direction);

	  return button;
	};

	/**
	 * Create both scroll buttons
	 *
	 * @param  {DOMElement} parentNode
	 * @param  {Object} options
	 * @param  {String} options.scrollSymbolLeft
	 * @param  {String} options.scrollSymbolRight
	 */
	ScrollTabs.prototype._createScrollButtons = function(parentNode, options) {

	  // Create a button that scrolls to the tab left to the currently active tab
	  this._createButton(parentNode, {
	    className: 'scroll-tabs-left',
	    label: options.scrollSymbolLeft,
	    direction: -1
	  });

	  // Create a button that scrolls to the tab right to the currently active tab
	  this._createButton(parentNode, {
	    className: 'scroll-tabs-right',
	    label: options.scrollSymbolRight,
	    direction: 1
	  });
	};

	/**
	 * Get the current active tab
	 *
	 * @return {DOMElement}
	 */
	ScrollTabs.prototype.getActiveTabNode = function() {
	  return domQuery(this.options.selectors.active, this.container);
	};


	/**
	 * Get the container all tabs are contained in
	 *
	 * @return {DOMElement}
	 */
	ScrollTabs.prototype.getTabsContainerNode = function () {
	  return domQuery(this.options.selectors.tabsContainer, this.container);
	};


	/**
	 * Get all tabs (visible and invisible ones)
	 *
	 * @return {Array<DOMElement>}
	 */
	ScrollTabs.prototype.getAllTabNodes = function () {
	  return domQuery.all(this.options.selectors.tab, this.container);
	};


	/**
	 * Gets all tabs that don't have the ignore class set
	 *
	 * @return {Array<DOMElement>}
	 */
	ScrollTabs.prototype.getVisibleTabs = function() {
	  var allTabs = this.getAllTabNodes();

	  var ignore = this.options.selectors.ignore;

	  return filter(allTabs, function(tabNode) {
	    return !domMatches(tabNode, ignore);
	  });
	};


	/**
	 * Get a tab relative to a reference tab.
	 *
	 * @param  {DOMElement} referenceTabNode
	 * @param  {Number} n gets the nth tab next or previous to the reference tab
	 *
	 * @return {DOMElement}
	 *
	 * @example:
	 * Visible tabs: [ A | B | C | D | E ]
	 * Assume tab 'C' is the reference tab:
	 * If direction === -1, it returns tab 'B',
	 * if direction ===  2, it returns tab 'E'
	 */
	ScrollTabs.prototype.getAdjacentTab = function(referenceTabNode, n) {
	  var visibleTabs = this.getVisibleTabs();

	  var index = visibleTabs.indexOf(referenceTabNode);

	  return visibleTabs[index + n];
	};

	ScrollTabs.prototype._bindEvents = function(node) {
	  this._bindWheelEvent(node);
	  this._bindTabClickEvents(node);
	  this._bindScrollButtonEvents(node);
	};

	/**
	 *  Bind a click listener to a DOM node.
	 *  Make sure a tab link is entirely visible after onClick.
	 *
	 * @param {DOMElement} node
	 */
	ScrollTabs.prototype._bindTabClickEvents = function(node) {
	  var selector = this.options.selectors.tab;

	  var self = this;

	  domDelegate.bind(node, selector, 'click', function onClick(event) {
	    self.scrollToTabNode(event.delegateTarget);
	  });
	};


	/**
	 * Bind the wheel event listener to a DOM node
	 *
	 * @param {DOMElement} node
	 */
	ScrollTabs.prototype._bindWheelEvent = function(node) {
	  var self = this;

	  domEvent.bind(node, 'wheel', function(e) {

	    // scroll direction (-1: left, 1: right)
	    var direction = Math.sign(e.deltaY);

	    var oldActiveTab = self.getActiveTabNode();

	    var newActiveTab = self.getAdjacentTab(oldActiveTab, direction);

	    if (newActiveTab) {
	      self.scrollToTabNode(newActiveTab);
	      self.emit('scroll', newActiveTab, oldActiveTab, direction);
	    }

	    e.preventDefault();
	  });
	};

	/**
	 * Bind scroll button events to a DOM node
	 *
	 * @param  {DOMElement} node
	 */
	ScrollTabs.prototype._bindScrollButtonEvents = function(node) {

	  var self = this;

	  domDelegate.bind(node, '.scroll-tabs-button', 'click', function(event) {

	    var target = event.delegateTarget;

	    // data-direction is either -1 or 1
	    var direction = parseInt(domAttr(target, 'data-direction'), 10);

	    var oldActiveTabNode = self.getActiveTabNode();

	    var newActiveTabNode = self.getAdjacentTab(oldActiveTabNode, direction);

	    if (newActiveTabNode) {
	      self.scrollToTabNode(newActiveTabNode);
	      self.emit('scroll', newActiveTabNode, oldActiveTabNode, direction);
	    }

	    event.preventDefault();
	  });
	};


	/**
	* Scroll to a tab if it is not entirely visible
	*
	* @param  {DOMElement} tabNode tab node to scroll to
	*/
	ScrollTabs.prototype.scrollToTabNode = function(tabNode) {
	  if (!tabNode) {
	    return;
	  }

	  var tabsContainerNode = tabNode.parentNode;

	  var tabWidth = tabNode.offsetWidth,
	      tabOffsetLeft = tabNode.offsetLeft,
	      tabOffsetRight = tabOffsetLeft + tabWidth,
	      containerWidth = tabsContainerNode.offsetWidth,
	      containerScrollLeft = tabsContainerNode.scrollLeft;

	  if (containerScrollLeft > tabOffsetLeft) {
	    // scroll to the left, if the tab is overflowing on the left side
	    tabsContainerNode.scrollLeft = 0;
	  } else if (tabOffsetRight > containerWidth) {
	    // scroll to the right, if the tab is overflowing on the right side
	    tabsContainerNode.scrollLeft = tabOffsetRight - containerWidth;
	  }
	};


	/**
	 * React on tab changes from outside (resize/show/hide/add/remove),
	 * update scroll button visibility.
	 */
	ScrollTabs.prototype.update = function() {

	  var tabsContainerNode = this.getTabsContainerNode();

	  // check if tabs fit in container
	  var overflow = tabsContainerNode.scrollWidth > tabsContainerNode.offsetWidth;

	  // TODO(nikku): distinguish overflow left / overflow right?
	  var overflowClass = 'scroll-tabs-overflow';

	  domClasses(this.container).toggle(overflowClass, overflow);

	  if (overflow) {
	    // make sure the current active tab is always visible
	    this.scrollToTabNode(this.getActiveTabNode());
	  }
	};


	////// module exports /////////////////////////////////////////

	/**
	 * Create a scrollTabs instance on the given element.
	 *
	 * @param {DOMElement} $el
	 * @param {Object} options
	 *
	 * @return {ScrollTabs}
	 */
	function create($el, options) {

	  var scrollTabs = get($el);

	  if (!scrollTabs) {
	    scrollTabs = new ScrollTabs($el, options);

	    $el.__scrollTabs = scrollTabs;
	  }

	  return scrollTabs;
	}

	/**
	 * Factory function to get or create a new scroll tabs instance.
	 */
	module.exports = create;


	/**
	 * Return the scrollTabs instance that has been previously
	 * initialized on the element.
	 *
	 * @param {DOMElement} $el
	 * @return {ScrollTabs}
	 */
	function get($el) {
	  return $el.__scrollTabs;
	}

	/**
	 * Getter to retrieve an already initialized scroll tabs instance.
	 */
	module.exports.get = get;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(76);

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(100),
	    baseCallback = __webpack_require__(101),
	    baseFilter = __webpack_require__(141),
	    isArray = __webpack_require__(122);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias select
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Array} Returns the new filtered array.
	 * @example
	 *
	 * _.filter([4, 5, 6], function(n) {
	 *   return n % 2 == 0;
	 * });
	 * // => [4, 6]
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * // using the `_.matches` callback shorthand
	 * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
	 * // => ['barney']
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.pluck(_.filter(users, 'active', false), 'user');
	 * // => ['fred']
	 *
	 * // using the `_.property` callback shorthand
	 * _.pluck(_.filter(users, 'active'), 'user');
	 * // => ['barney']
	 */
	function filter(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  predicate = baseCallback(predicate, thisArg, 3);
	  return func(collection, predicate);
	}

	module.exports = filter;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[++resIndex] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(102),
	    baseMatchesProperty = __webpack_require__(130),
	    bindCallback = __webpack_require__(137),
	    identity = __webpack_require__(138),
	    property = __webpack_require__(139);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}

	module.exports = baseCallback;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(103),
	    getMatchData = __webpack_require__(127),
	    toObject = __webpack_require__(126);

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(104),
	    toObject = __webpack_require__(126);

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(105),
	    isObject = __webpack_require__(114),
	    isObjectLike = __webpack_require__(115);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(106),
	    equalByTag = __webpack_require__(108),
	    equalObjects = __webpack_require__(109),
	    isArray = __webpack_require__(122),
	    isTypedArray = __webpack_require__(125);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(107);

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalArrays;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 108 */
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(110);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(111),
	    isArrayLike = __webpack_require__(116),
	    isObject = __webpack_require__(114),
	    shimKeys = __webpack_require__(120);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(112);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(113),
	    isObjectLike = __webpack_require__(115);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(114);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 114 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(117),
	    isLength = __webpack_require__(119);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(118);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 118 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 119 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(121),
	    isArray = __webpack_require__(122),
	    isIndex = __webpack_require__(123),
	    isLength = __webpack_require__(119),
	    keysIn = __webpack_require__(124);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(116),
	    isObjectLike = __webpack_require__(115);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(111),
	    isLength = __webpack_require__(119),
	    isObjectLike = __webpack_require__(115);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 123 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(121),
	    isArray = __webpack_require__(122),
	    isIndex = __webpack_require__(123),
	    isLength = __webpack_require__(119),
	    isObject = __webpack_require__(114);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(119),
	    isObjectLike = __webpack_require__(115);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(114);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(128),
	    pairs = __webpack_require__(129);

	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(114);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(110),
	    toObject = __webpack_require__(126);

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(131),
	    baseIsEqual = __webpack_require__(104),
	    baseSlice = __webpack_require__(132),
	    isArray = __webpack_require__(122),
	    isKey = __webpack_require__(133),
	    isStrictComparable = __webpack_require__(128),
	    last = __webpack_require__(134),
	    toObject = __webpack_require__(126),
	    toPath = __webpack_require__(135);

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');

	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(126);

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 132 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(122),
	    toObject = __webpack_require__(126);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}

	module.exports = isKey;


/***/ },
/* 134 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(136),
	    isArray = __webpack_require__(122);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = toPath;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(138);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 138 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(118),
	    basePropertyDeep = __webpack_require__(140),
	    isKey = __webpack_require__(133);

	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(131),
	    toPath = __webpack_require__(135);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(142);

	/**
	 * The base implementation of `_.filter` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(143),
	    createBaseEach = __webpack_require__(146);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(144),
	    keys = __webpack_require__(110);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(145);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(126);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(117),
	    isLength = __webpack_require__(119),
	    toObject = __webpack_require__(126);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var assignWith = __webpack_require__(148),
	    baseAssign = __webpack_require__(149),
	    createAssigner = __webpack_require__(151);

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object. Subsequent sources overwrite property assignments of previous sources.
	 * If `customizer` is provided it's invoked to produce the assigned values.
	 * The `customizer` is bound to `thisArg` and invoked with five arguments:
	 * (objectValue, sourceValue, key, object, source).
	 *
	 * **Note:** This method mutates `object` and is based on
	 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using a customizer callback
	 * var defaults = _.partialRight(_.assign, function(value, other) {
	 *   return _.isUndefined(value) ? other : value;
	 * });
	 *
	 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var assign = createAssigner(function(object, source, customizer) {
	  return customizer
	    ? assignWith(object, source, customizer)
	    : baseAssign(object, source);
	});

	module.exports = assign;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(110);

	/**
	 * A specialized version of `_.assign` for customizing assigned values without
	 * support for argument juggling, multiple sources, and `this` binding `customizer`
	 * functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 */
	function assignWith(object, source, customizer) {
	  var index = -1,
	      props = keys(source),
	      length = props.length;

	  while (++index < length) {
	    var key = props[index],
	        value = object[key],
	        result = customizer(value, source[key], key, object, source);

	    if ((result === result ? (result !== value) : (value === value)) ||
	        (value === undefined && !(key in object))) {
	      object[key] = result;
	    }
	  }
	  return object;
	}

	module.exports = assignWith;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(150),
	    keys = __webpack_require__(110);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 150 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(137),
	    isIterateeCall = __webpack_require__(152),
	    restParam = __webpack_require__(153);

	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(116),
	    isIndex = __webpack_require__(123),
	    isObject = __webpack_require__(114);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 153 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 154 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 155 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(157);

	/**
	 * Recursively flattens a nested array.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to recursively flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flattenDeep([1, [2, 3, [4]]]);
	 * // => [1, 2, 3, 4]
	 */
	function flattenDeep(array) {
	  var length = array ? array.length : 0;
	  return length ? baseFlatten(array, true) : [];
	}

	module.exports = flattenDeep;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(85),
	    isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(23),
	    isArrayLike = __webpack_require__(17),
	    isObjectLike = __webpack_require__(16);

	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var createAggregator = __webpack_require__(159);

	/**
	 * Creates an object composed of keys generated from the results of running
	 * each element of `collection` through `iteratee`. The corresponding value
	 * of each key is the last element responsible for generating the key. The
	 * iteratee function is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns the composed aggregate object.
	 * @example
	 *
	 * var keyData = [
	 *   { 'dir': 'left', 'code': 97 },
	 *   { 'dir': 'right', 'code': 100 }
	 * ];
	 *
	 * _.indexBy(keyData, 'dir');
	 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	 *
	 * _.indexBy(keyData, function(object) {
	 *   return String.fromCharCode(object.code);
	 * });
	 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	 *
	 * _.indexBy(keyData, function(object) {
	 *   return this.fromCharCode(object.code);
	 * }, String);
	 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	 */
	var indexBy = createAggregator(function(result, value, key) {
	  result[key] = value;
	});

	module.exports = indexBy;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var baseCallback = __webpack_require__(32),
	    baseEach = __webpack_require__(6),
	    isArray = __webpack_require__(23);

	/**
	 * Creates a `_.countBy`, `_.groupBy`, `_.indexBy`, or `_.partition` function.
	 *
	 * @private
	 * @param {Function} setter The function to set keys and values of the accumulator object.
	 * @param {Function} [initializer] The function to initialize the accumulator object.
	 * @returns {Function} Returns the new aggregator function.
	 */
	function createAggregator(setter, initializer) {
	  return function(collection, iteratee, thisArg) {
	    var result = initializer ? initializer() : {};
	    iteratee = baseCallback(iteratee, thisArg, 3);

	    if (isArray(collection)) {
	      var index = -1,
	          length = collection.length;

	      while (++index < length) {
	        var value = collection[index];
	        setter(result, value, iteratee(value, index, collection), collection);
	      }
	    } else {
	      baseEach(collection, function(value, key, collection) {
	        setter(result, value, iteratee(value, key, collection), collection);
	      });
	    }
	    return result;
	  };
	}

	module.exports = createAggregator;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(161),
	    baseCallback = __webpack_require__(32),
	    baseMap = __webpack_require__(162),
	    isArray = __webpack_require__(23);

	/**
	 * Creates an array of values by running each element in `collection` through
	 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
	 * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
	 * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
	 * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
	 * `sum`, `uniq`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @alias collect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function timesThree(n) {
	 *   return n * 3;
	 * }
	 *
	 * _.map([1, 2], timesThree);
	 * // => [3, 6]
	 *
	 * _.map({ 'a': 1, 'b': 2 }, timesThree);
	 * // => [3, 6] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // using the `_.property` callback shorthand
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee, thisArg) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  iteratee = baseCallback(iteratee, thisArg, 3);
	  return func(collection, iteratee);
	}

	module.exports = map;


/***/ },
/* 161 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(6),
	    isArrayLike = __webpack_require__(17);

	/**
	 * The base implementation of `_.map` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;


/***/ }
/******/ ]);