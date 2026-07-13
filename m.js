// trakttv.js
(function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _regenerator() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
    var e,
      t,
      r = "function" == typeof Symbol ? Symbol : {},
      n = r.iterator || "@@iterator",
      o = r.toStringTag || "@@toStringTag";
    function i(r, n, o, i) {
      var c = n && n.prototype instanceof Generator ? n : Generator,
        u = Object.create(c.prototype);
      return _regeneratorDefine(u, "_invoke", function (r, n, o) {
        var i,
          c,
          u,
          f = 0,
          p = o || [],
          y = !1,
          G = {
            p: 0,
            n: 0,
            v: e,
            a: d,
            f: d.bind(e, 4),
            d: function (t, r) {
              return i = t, c = 0, u = e, G.n = r, a;
            }
          };
        function d(r, n) {
          for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
            var o,
              i = p[t],
              d = G.p,
              l = i[2];
            r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
          }
          if (o || r > 1) return a;
          throw y = !0, n;
        }
        return function (o, p, l) {
          if (f > 1) throw TypeError("Generator is already running");
          for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
            i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
            try {
              if (f = 2, i) {
                if (c || (o = "next"), t = i[o]) {
                  if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  u = t.value, c < 2 && (c = 0);
                } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
                i = e;
              } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
            } catch (t) {
              i = e, c = 1, u = t;
            } finally {
              f = 1;
            }
          }
          return {
            value: t,
            done: y
          };
        };
      }(r, o, i), !0), u;
    }
    var a = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
        return this;
      }), t),
      u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
      return this;
    }), _regeneratorDefine(u, "toString", function () {
      return "[object Generator]";
    }), (_regenerator = function () {
      return {
        w: i,
        m: f
      };
    })();
  }
  function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
      i({}, "", {});
    } catch (e) {
      i = 0;
    }
    _regeneratorDefine = function (e, r, n, t) {
      function o(r, n) {
        _regeneratorDefine(e, r, function (e) {
          return this._invoke(r, n, e);
        });
      }
      r ? i ? i(e, r, {
        value: n,
        enumerable: !t,
        configurable: !t,
        writable: !t
      }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
    }, _regeneratorDefine(e, r, n, t);
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /**
   * Генерує зображення з текстом за допомогою Canvas API.
   * @param {string} text - Текст для відображення на зображенні.
   * @returns {string} - URL зображення у форматі data:image/png;base64.
   */
  function textToImage(text) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = 400;
    var height = 600;
    canvas.width = width;
    canvas.height = height;

    // Фон
    context.fillStyle = '#1a202c'; // Темно-сірий фон
    context.fillRect(0, 0, width, height);

    // Налаштування тексту
    context.fillStyle = '#ffffff'; // Білий колір тексту
    context.font = 'bold 48px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Розбивка тексту на рядки
    var words = text.split(' ');
    var lines = [];
    var currentLine = words[0] || '';
    for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var testLine = currentLine + ' ' + word;
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > width - 40 && currentLine !== '') {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    // Відображення тексту
    var lineHeight = 58;
    var startY = (height - lines.length * lineHeight) / 2 + lineHeight / 2;
    lines.forEach(function (line, index) {
      context.fillText(line, width / 2, startY + index * lineHeight);
    });
    return canvas.toDataURL('image/png');
  }

  var PREFIX = 'TraktTV';
  var onceKeys = new Set();
  function isDebugEnabled() {
    try {
      return !!(typeof Lampa !== 'undefined' && Lampa && Lampa.Storage && typeof Lampa.Storage.field === 'function' && Lampa.Storage.field('trakt_enable_logging'));
    } catch (e) {
      return false;
    }
  }
  function write(level, message, meta) {
    var targetLevel = level === 'error' || level === 'warn' || level === 'log' ? level : 'log';
    var writer = typeof console !== 'undefined' && typeof console[targetLevel] === 'function' ? console[targetLevel].bind(console) : typeof console !== 'undefined' && typeof console.log === 'function' ? console.log.bind(console) : null;
    if (!writer) return;
    if (typeof meta === 'undefined') writer(PREFIX, message);else writer(PREFIX, message, meta);
  }
  function debugEnabled() {
    return isDebugEnabled();
  }
  function logWarn(message, meta) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$debugOnly = _ref2.debugOnly,
      debugOnly = _ref2$debugOnly === void 0 ? true : _ref2$debugOnly;
    if (debugOnly && !isDebugEnabled()) return;
    write('warn', message, meta);
  }
  function logError(message, meta) {
    var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref3$debugOnly = _ref3.debugOnly,
      debugOnly = _ref3$debugOnly === void 0 ? false : _ref3$debugOnly;
    if (debugOnly && !isDebugEnabled()) return;
    write('error', message, meta);
  }
  function logDebug(message, meta) {
    if (!isDebugEnabled()) return;
    write('log', message, meta);
  }
  function logDebugOnce(key, message, meta) {
    if (!isDebugEnabled()) return;
    if (!key) return logDebug(message, meta);
    if (onceKeys.has(key)) return;
    onceKeys.add(key);
    write('log', message, meta);
  }

  // ── Environment Detection + Request Routing + CORS Fallback ──────────────
  // Smart TV platforms (Tizen, WebOS) can call api.trakt.tv directly (no CORS).
  // Browser environments must go through a CORS proxy.
  // OAuth paths ALWAYS go through the proxy (client_secret is server-side only).
  // ──────────────────────────────────────────────────────────────────────────

  // ── Base URLs ─────────────────────────────────────────────────────────────

  var PROXY_BASE_URL = 'https://apx.lme.isroot.in/trakt';
  var DIRECT_BASE_URL = 'https://api.trakt.tv';

  // ── Client ID for Direct API Calls ────────────────────────────────────────
  // User-provided Trakt client ID, needed only when calling api.trakt.tv directly.
  // Set at runtime via setClientId() or auto-loaded from Lampa.Storage.

  var TRAKT_CLIENT_ID = '';
  function setClientId(id) {
    if (id && typeof id === 'string' && id.trim()) {
      TRAKT_CLIENT_ID = id.trim();
    }
  }

  // Auto-load from Lampa.Storage if available
  try {
    if (typeof Lampa !== 'undefined' && Lampa.Storage && typeof Lampa.Storage.field === 'function') {
      var storedId = Lampa.Storage.field('trakt_client_id');
      if (storedId) setClientId(storedId);
    }
  } catch (e) {/* noop — runs in non-Lampa context */}

  // ── Environment Detection ─────────────────────────────────────────────────
  // Cached in module-level boolean. Never persisted to storage.

  var _corsFreeDetected = null;

  /**
   * Detect whether the current environment is CORS-free (Smart TV / local).
   * Returns the cached boolean on subsequent calls.
   * @returns {boolean}
   */
  function detectCorsFree() {
    if (_corsFreeDetected !== null) return _corsFreeDetected;
    try {
      // 1. Protocol check — file/widget/local protocols are CORS-free
      var protocol = (window.location.protocol || '').toLowerCase();
      if (protocol === 'file:' || protocol === 'widget:' || protocol === 'local:') {
        _corsFreeDetected = true;
        return true;
      }

      // 2. User-Agent check — Smart TV platforms
      var ua = navigator.userAgent || '';
      if (/LampaApp|Tizen|WebOS|SmartTV/i.test(ua)) {
        _corsFreeDetected = true;
        return true;
      }
    } catch (e) {
      // If detection fails, assume CORS-strict
    }
    _corsFreeDetected = false;
    return false;
  }

  // ── CORS-Free mode flag ───────────────────────────────────────────────────
  // Initialized from environment detection. Set to false on CORS fallback
  // for the rest of the session.

  var corsFreeMode = false;
  (function initCorsFreeMode() {
    corsFreeMode = detectCorsFree();
  })();

  // ── OAuth Path Detection ──────────────────────────────────────────────────
  // OAuth ALWAYS goes through the proxy because the proxy holds the
  // client_secret and refresh token logic server-side.

  /**
   * Check whether a path is an OAuth endpoint.
   * @param {string} path
   * @returns {boolean}
   */
  function isOAuthPath(path) {
    return typeof path === 'string' && path.indexOf('/oauth/') !== -1;
  }

  // ── Base URL Resolution ───────────────────────────────────────────────────

  /**
   * Resolve which base URL to use for a given path.
   * OAuth → proxy (always). CORS-free → direct. Otherwise → proxy.
   * @param {string} path
   * @returns {string}
   */
  function resolveBaseUrl(path) {
    if (isOAuthPath(path)) return PROXY_BASE_URL;
    if (corsFreeMode) return DIRECT_BASE_URL;
    return PROXY_BASE_URL;
  }

  // ── CORS Error Detection ──────────────────────────────────────────────────

  /**
   * Check if an error represents a CORS block or network failure.
   * jQuery ajax gives status 0 for CORS/network errors.
   * TypeError handles native fetch network errors (cross-compatibility).
   * Does NOT match 4xx/5xx — those are legitimate API responses.
   * @param {Error} error
   * @returns {boolean}
   */
  function isCorsOrNetworkError(error) {
    if (!error) return false;
    if (error.status === 0) return true;
    if (error instanceof TypeError) return true;
    return false;
  }

  // ── Response Header Parser ────────────────────────────────────────────────

  /**
   * Parse jQuery XHR response headers into a lowercase-keyed object.
   * Matches the implementation in api.js (lines 1738-1758).
   * @param {jqXHR} jqXHR
   * @returns {Object}
   */
  function parseResponseHeaders(jqXHR) {
    var headers = {};
    if (!jqXHR || typeof jqXHR.getAllResponseHeaders !== 'function') {
      return headers;
    }
    var raw = jqXHR.getAllResponseHeaders();
    if (!raw) return headers;
    raw.trim().split(/[\r\n]+/).forEach(function (line) {
      var separatorIndex = line.indexOf(':');
      if (separatorIndex <= 0) return;
      var key = line.slice(0, separatorIndex).trim().toLowerCase();
      var value = line.slice(separatorIndex + 1).trim();
      if (key) headers[key] = value;
    });
    return headers;
  }

  // ── jQuery AJAX Helper (internal, not exported) ───────────────────────────

  /**
   * Wrapper around $.ajax with the same error shape as _performRequest in api.js.
   * Always resolves with { data, status, headers }.
   * Rejects with Error objects having { status, headers, response, originalError }.
   * @param {string} method  - HTTP method (GET, POST, PUT, DELETE, etc.)
   * @param {string} url     - Full request URL
   * @param {Object} params  - Request body for POST/PUT
   * @param {Object} headers - Request headers
   * @returns {Promise<{data: *, status: number, headers: Object}>}
   */
  function doAjaxCall(method, url, params, headers) {
    return new Promise(function (resolve, reject) {
      var ajaxParams = {
        url: url,
        timeout: 15000,
        headers: _objectSpread2(_objectSpread2({}, headers || {}), {}, {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }),
        type: method,
        dataType: 'json',
        crossDomain: true
      };
      if (method === 'POST' || method === 'PUT') {
        ajaxParams.data = JSON.stringify(params || {});
        ajaxParams.contentType = 'application/json';
        ajaxParams.processData = false;
      }
      $.ajax(ajaxParams).done(function (data, _textStatus, jqXHR) {
        var status = jqXHR && typeof jqXHR.status === 'number' ? jqXHR.status : 200;
        resolve({
          data: data,
          status: status,
          headers: parseResponseHeaders(jqXHR)
        });
      }).fail(function (jqXHR) {
        var status = jqXHR && jqXHR.status ? jqXHR.status : 0;
        reject(Object.assign(new Error('TraktTV API Error'), {
          status: status,
          headers: parseResponseHeaders(jqXHR),
          response: jqXHR && (jqXHR.responseJSON || jqXHR.responseText || null),
          originalError: jqXHR || {}
        }));
      });
    });
  }

  // ── Main Request Execution ────────────────────────────────────────────────
  // Replaces _performRequest in api.js. Handles the entire request lifecycle
  // including CORS fallback: direct → proxy on CORS/network error.

  /**
   * Execute an API request with intelligent routing and CORS fallback.
   *
   * Attempt strategy:
   *   - CORS-free path: try DIRECT_BASE_URL first, fall back to PROXY_BASE_URL
   *     on CORS/network error (switches session to CORS-strict).
   *   - OAuth path: always PROXY_BASE_URL (single attempt).
   *   - CORS-strict path: always PROXY_BASE_URL (single attempt).
   *
   * Result shape (matches _performRequest):
   *   - withMeta=true:  { data, status, headers }
   *   - withMeta=false: data (response body only)
   *
   * @param {string}  method          - HTTP method
   * @param {string}  path            - API path (e.g. '/sync/history')
   * @param {Object}  [params={}]     - Request body
   * @param {Object}  [headers={}]    - Request headers
   * @param {boolean} [unauthorized]  - Reserved for caller bookkeeping
   * @param {Object}  [requestOptions={}] - Options (withMeta, etc.)
   * @returns {Promise<*>}
   */
  function executeRequest(_x, _x2, _x3, _x4, _x5) {
    return _executeRequest.apply(this, arguments);
  }
  function _executeRequest() {
    _executeRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(method, path, params, headers, unauthorized) {
      var requestOptions,
        baseUrl,
        useDirect,
        withMeta,
        attempts,
        lastError,
        attempt,
        currentBase,
        currentUrl,
        requestHeaders,
        result,
        _args = arguments,
        _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            requestOptions = _args.length > 5 && _args[5] !== undefined ? _args[5] : {};
            baseUrl = resolveBaseUrl(path);
            useDirect = baseUrl === DIRECT_BASE_URL;
            withMeta = !!(requestOptions && requestOptions.withMeta);
            attempts = useDirect ? 2 : 1;
            lastError = null;
            attempt = 0;
          case 1:
            if (!(attempt < attempts)) {
              _context.n = 8;
              break;
            }
            currentBase = attempt === 0 ? baseUrl : PROXY_BASE_URL;
            currentUrl = currentBase + path;
            requestHeaders = _objectSpread2({}, headers || {}); // For direct API calls, add Trakt client ID for app identification
            if (currentBase === DIRECT_BASE_URL && TRAKT_CLIENT_ID) {
              requestHeaders['trakt-api-key'] = TRAKT_CLIENT_ID;
            }
            _context.p = 2;
            _context.n = 3;
            return doAjaxCall(method, currentUrl, params || {}, requestHeaders);
          case 3:
            result = _context.v;
            if (!withMeta) {
              _context.n = 4;
              break;
            }
            return _context.a(2, result);
          case 4:
            return _context.a(2, result.data);
          case 5:
            _context.p = 5;
            _t = _context.v;
            lastError = _t;

            // Only fallback on CORS/network error from direct attempt
            if (!(useDirect && attempt === 0 && isCorsOrNetworkError(_t))) {
              _context.n = 6;
              break;
            }
            corsFreeMode = false; // switch session to CORS-strict
            return _context.a(3, 7);
          case 6:
            throw _t;
          case 7:
            attempt++;
            _context.n = 1;
            break;
          case 8:
            throw lastError;
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[2, 5]]);
    }));
    return _executeRequest.apply(this, arguments);
  }

  var TOKEN_EXPIRY_SKEW_MS = 2 * 60 * 1000;
  var DEVICE_AUTH_STALE_MS = 20 * 60 * 1000;
  var MAX_RETRY_ATTEMPTS = 2; // 3 спроби загалом
  var RETRY_BASE_DELAY_MS = 600;
  var RETRY_MAX_DELAY_MS = 15000;
  var CACHE_TTL_FEED_MS = 5 * 60 * 1000;
  var CACHE_TTL_PROGRESS_MS = 30 * 1000;
  var CACHE_TTL_METADATA_MS = 60 * 60 * 1000;
  var MUTATION_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
  var inFlightRequests = new Map();
  var responseCache = new Map();
  var RESPONSE_CACHE_MAX = 200;
  var AUTH_BLOCK_STORAGE_KEY = 'trakt_auth_blocked';
  var AUTH_RATE_LIMIT_STORAGE_KEY = 'trakt_auth_rate_limited_until';

  // ── Global Rate Limiter ──────────────────────────────────────────────────
  // Sliding-window rate limiter that also enters global cooldown after 429.
  // Prevents runaway concurrent requests from different modules.

  var RL_MAX_REQUESTS_PER_WINDOW = 50; // max requests per window
  var RL_WINDOW_MS = 10 * 1000; // sliding window: 10 seconds
  var RL_MAX_AUTH_PER_WINDOW = 5; // auth (/oauth/*) requests per window
  var RL_DEFAULT_COOLDOWN_MS = 60 * 1000; // default cooldown after 429
  var RL_MIN_COOLDOWN_MS = 10 * 1000; // minimum cooldown
  var RL_MAX_COOLDOWN_MS = 5 * 60 * 1000; // maximum cooldown
  var RL_POLL_INTERVAL_MS = 300; // how often waitForSlot re-checks
  var AUTH_RATE_LIMIT_DEFAULT_COOLDOWN_MS = 60 * 1000;
  var AUTH_RATE_LIMIT_MAX_COOLDOWN_MS = 5 * 60 * 1000;
  var rlRequestLog = []; // { ts: number } timestamps of recent requests
  var rlAuthRequestLog = []; // timestamps of recent auth requests
  var rlCooldownUntil = 0; // 0 = no cooldown

  function rlIsAuthEndpoint(url) {
    if (!url || typeof url !== 'string') return false;
    return url.indexOf('/oauth/') !== -1;
  }
  function rlIsOnCooldown() {
    var remaining = rlCooldownUntil - Date.now();
    if (remaining <= 0) {
      rlCooldownUntil = 0;
      return false;
    }
    return true;
  }
  function rlEnterCooldown(retryAfterSeconds) {
    var durationMs = RL_DEFAULT_COOLDOWN_MS;
    if (typeof retryAfterSeconds === 'number' && Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
      durationMs = retryAfterSeconds * 1000;
    }
    durationMs = Math.max(RL_MIN_COOLDOWN_MS, Math.min(RL_MAX_COOLDOWN_MS, durationMs));
    rlCooldownUntil = Date.now() + durationMs;
  }
  function rlPruneLog(log) {
    var cutoff = Date.now() - RL_WINDOW_MS;
    while (log.length > 0 && log[0].ts < cutoff) log.shift();
  }
  function rlCanMakeRequest(url) {
    var isAuth = rlIsAuthEndpoint(url);
    var log = isAuth ? rlAuthRequestLog : rlRequestLog;
    var max = isAuth ? RL_MAX_AUTH_PER_WINDOW : RL_MAX_REQUESTS_PER_WINDOW;
    rlPruneLog(log);
    return log.length < max;
  }
  function rlRecordRequest(url, status) {
    var isAuth = rlIsAuthEndpoint(url);
    var log = isAuth ? rlAuthRequestLog : rlRequestLog;
    log.push({
      ts: Date.now()
    });
    rlPruneLog(log);
    if (status === 429) {
      rlEnterCooldown();
    }
  }
  function rlGetCooldownRemainingMs() {
    return Math.max(0, rlCooldownUntil - Date.now());
  }
  function rlWaitForSlot(_x) {
    return _rlWaitForSlot.apply(this, arguments);
  } // ── end Rate Limiter ─────────────────────────────────────────────────────
  function _rlWaitForSlot() {
    _rlWaitForSlot = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url) {
      var isAuth;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            // Auth requests bypass cooldown but still respect sliding window
            isAuth = rlIsAuthEndpoint(url);
          case 1:
            if (!(!isAuth && rlIsOnCooldown())) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return sleep$1(RL_POLL_INTERVAL_MS);
          case 2:
            return _context.a(3, 1);
          case 3:
            if (!rlCanMakeRequest(url)) {
              _context.n = 4;
              break;
            }
            return _context.a(2);
          case 4:
            _context.n = 5;
            return sleep$1(RL_POLL_INTERVAL_MS);
          case 5:
            _context.n = 1;
            break;
          case 6:
            return _context.a(2);
        }
      }, _callee);
    }));
    return _rlWaitForSlot.apply(this, arguments);
  }
  var authBlocked = false;
  var authBlockedReason = '';
  var authBlockedAt = 0;
  var authBlockedNotified = false;
  var authBlockedTokenFingerprint = '';
  function getAccessTokenFingerprint() {
    var token = String(Lampa.Storage.get('trakt_token') || '');
    if (!token) return '';
    return "".concat(token.length, ":").concat(token.slice(-12));
  }
  function getStorageNumber(name) {
    var value = Number(Lampa.Storage.get(name));
    return Number.isFinite(value) ? value : null;
  }
  function clearTokenExpiryMeta() {
    Lampa.Storage.set('trakt_token_created_at', null);
    Lampa.Storage.set('trakt_token_expires_in', null);
    Lampa.Storage.set('trakt_token_expires_at', null);
  }
  function clearAuthStorage() {
    Lampa.Storage.set('trakt_token', null);
    Lampa.Storage.set('trakt_refresh_token', null);
    clearTokenExpiryMeta();
    clearAuthRateLimitCooldown();
    Lampa.Storage.set('trakt_active_device_auth', false);
    Lampa.Storage.set('trakt_active_device_auth_started_at', null);
  }
  function setAuthBlocked() {
    var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'reauth_required';
    authBlocked = true;
    authBlockedReason = String(reason || 'reauth_required');
    authBlockedAt = Date.now();
    authBlockedNotified = false;
    authBlockedTokenFingerprint = getAccessTokenFingerprint();
    try {
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.set === 'function') {
        Lampa.Storage.set(AUTH_BLOCK_STORAGE_KEY, true);
      }
    } catch (error) {/* noop */}
  }
  function clearAuthBlocked() {
    authBlocked = false;
    authBlockedReason = '';
    authBlockedAt = 0;
    authBlockedNotified = false;
    authBlockedTokenFingerprint = '';
    try {
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.set === 'function') {
        Lampa.Storage.set(AUTH_BLOCK_STORAGE_KEY, false);
      }
    } catch (error) {/* noop */}
  }
  function isAuthBlocked() {
    if (authBlocked) return true;
    try {
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.get === 'function') {
        return Lampa.Storage.get(AUTH_BLOCK_STORAGE_KEY) === true;
      }
    } catch (error) {
      return authBlocked;
    }
    return authBlocked;
  }
  function buildAuthBlockedError() {
    var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'reauth_required';
    return Object.assign(new Error('Trakt auth is blocked, reauthorization required'), {
      status: 401,
      code: 'reauth_required',
      reason: reason || 'reauth_required',
      blocked: true,
      blockedAt: authBlockedAt || Date.now()
    });
  }
  function clearAuthRateLimitCooldown() {
    try {
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.set === 'function') {
        Lampa.Storage.set(AUTH_RATE_LIMIT_STORAGE_KEY, null);
      }
    } catch (error) {/* noop */}
  }
  function getAuthRateLimitRemainingMs() {
    var cooldownUntil = 0;
    try {
      cooldownUntil = Number(Lampa.Storage.get(AUTH_RATE_LIMIT_STORAGE_KEY) || 0);
    } catch (error) {
      cooldownUntil = 0;
    }
    if (!Number.isFinite(cooldownUntil) || cooldownUntil <= Date.now()) {
      clearAuthRateLimitCooldown();
      return 0;
    }
    return cooldownUntil - Date.now();
  }
  function buildAuthRateLimitError(error) {
    return Object.assign(new Error('Trakt auth is temporarily rate limited'), {
      status: 503,
      code: 'auth_rate_limited',
      retryAfterMs: getAuthRateLimitRemainingMs(),
      originalError: error || null
    });
  }
  function setAuthRateLimitCooldown(error) {
    var retryAfterMs = parseRetryAfterMs$1(error && error.headers ? error.headers : {});
    var cooldownMs = Math.min(AUTH_RATE_LIMIT_MAX_COOLDOWN_MS, Math.max(1000, retryAfterMs || AUTH_RATE_LIMIT_DEFAULT_COOLDOWN_MS));
    try {
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.set === 'function') {
        Lampa.Storage.set(AUTH_RATE_LIMIT_STORAGE_KEY, Date.now() + cooldownMs);
      }
    } catch (storageError) {/* noop */}
    return cooldownMs;
  }
  function isAuthRateLimitStatus(status) {
    return status === 429 || status === 503;
  }
  function notifyAuthBlockedOnce() {
    if (authBlockedNotified) return;
    authBlockedNotified = true;
    try {
      if (Lampa && Lampa.Bell && typeof Lampa.Bell.push === 'function') {
        var text = Lampa.Lang && typeof Lampa.Lang.translate === 'function' ? Lampa.Lang.translate('trakttvAuthMissed') || 'Trakt authorization required' : 'Trakt authorization required';
        Lampa.Bell.push({
          text: text
        });
      }
    } catch (error) {/* noop */}
  }
  function hasUsableAccessToken() {
    var token = String(Lampa.Storage.get('trakt_token') || '');
    return !!token;
  }
  function hasNewAccessTokenSinceBlock() {
    var current = getAccessTokenFingerprint();
    if (!current) return false;
    if (!authBlockedTokenFingerprint) return true;
    return current !== authBlockedTokenFingerprint;
  }
  function saveTokens() {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!response || _typeof(response) !== 'object') return;
    if (response.access_token) {
      Lampa.Storage.set('trakt_token', response.access_token);
    }
    if (response.refresh_token) {
      Lampa.Storage.set('trakt_refresh_token', response.refresh_token);
    }
    var expiresIn = Number(response.expires_in);
    var createdAt = Number(response.created_at) || Math.floor(Date.now() / 1000);
    if (Number.isFinite(expiresIn) && expiresIn > 0) {
      var expiresAt = createdAt * 1000 + expiresIn * 1000;
      Lampa.Storage.set('trakt_token_created_at', createdAt);
      Lampa.Storage.set('trakt_token_expires_in', expiresIn);
      Lampa.Storage.set('trakt_token_expires_at', expiresAt);
    } else if (response.access_token || response.refresh_token) {
      clearTokenExpiryMeta();
    }
    if (response.access_token) {
      clearAuthBlocked();
      clearAuthRateLimitCooldown();
    }
  }
  function getTokenExpiryMeta() {
    var createdAt = getStorageNumber('trakt_token_created_at');
    var expiresIn = getStorageNumber('trakt_token_expires_in');
    var expiresAt = getStorageNumber('trakt_token_expires_at');
    if (!expiresAt && createdAt && expiresIn) {
      expiresAt = createdAt * 1000 + expiresIn * 1000;
      Lampa.Storage.set('trakt_token_expires_at', expiresAt);
    }
    return {
      createdAt: createdAt,
      expiresIn: expiresIn,
      expiresAt: expiresAt
    };
  }
  function isTokenExpiringSoon() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$skewMs = _ref.skewMs,
      skewMs = _ref$skewMs === void 0 ? TOKEN_EXPIRY_SKEW_MS : _ref$skewMs;
    var _getTokenExpiryMeta = getTokenExpiryMeta(),
      expiresAt = _getTokenExpiryMeta.expiresAt;
    if (!expiresAt || expiresAt <= 0) return true;
    return Date.now() + skewMs >= expiresAt;
  }
  function isDeviceAuthActive() {
    if (Lampa.Storage.get('trakt_active_device_auth') !== true) {
      return false;
    }
    var startedAt = getStorageNumber('trakt_active_device_auth_started_at');
    var now = Date.now();
    var isStale = !startedAt || now - startedAt > DEVICE_AUTH_STALE_MS;
    if (isStale) {
      Lampa.Storage.set('trakt_active_device_auth', false);
      Lampa.Storage.set('trakt_active_device_auth_started_at', null);
      logWarn('Device auth flag was stale and reset', undefined, {
        debugOnly: true
      });
      return false;
    }
    return true;
  }
  function readBooleanStorage$2(name) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var parse = function parse(value) {
      if (typeof value === 'boolean') return value;
      if (value === 1 || value === '1' || value === 'true') return true;
      if (value === 0 || value === '0' || value === 'false') return false;
      return null;
    };
    try {
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.get === 'function') {
        var direct = parse(Lampa.Storage.get(name));
        if (direct !== null) return direct;
      }
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.field === 'function') {
        var fromField = parse(Lampa.Storage.field(name));
        if (fromField !== null) return fromField;
      }
    } catch (error) {
      return fallback;
    }
    return fallback;
  }
  function buildRecommendationsUrl$1(type, limit) {
    var ignoreWatchlisted = readBooleanStorage$2('trakt_source_ignore_watchlisted', false) ? 'true' : 'false';
    var query = new URLSearchParams({
      extended: 'full,images',
      limit: String(Math.max(1, parseInt(limit, 10) || 36)),
      ignore_watched: readBooleanStorage$2('trakt_source_ignore_watched', false) ? 'true' : 'false',
      ignore_watchlisted: ignoreWatchlisted,
      ignore_collected: ignoreWatchlisted
    });
    return "/recommendations/".concat(type, "?").concat(query.toString());
  }
  function getImageUrl(media) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'poster';
    var imageSet = media.images && media.images[type];
    var imageUrl = '';
    if (imageSet) {
      if (_typeof(imageSet) === 'object' && !Array.isArray(imageSet)) {
        imageUrl = imageSet.medium || imageSet.thumb || imageSet.full || '';
      } else if (Array.isArray(imageSet) && imageSet.length > 0) {
        imageUrl = imageSet[0];
      } else if (typeof imageSet === 'string') {
        imageUrl = imageSet;
      }
    }
    if (imageUrl && !imageUrl.startsWith('http')) {
      var finalUrl = 'https://' + imageUrl.replace(/^\/+/, '');
      return finalUrl;
    }
    return imageUrl;
  }
  function addToHistory$1(data) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var body = {
      movies: [],
      shows: []
    };

    // Логування для налагодження

    // Перевірка, чи data має структуру для епізодів (викликається з watching.js)
    if (data.episodes) {
      // Якщо це епізоди, додаємо їх до shows
      body.shows.push({
        ids: data.ids || {},
        // Використовуємо передані ids або порожній об'єкт
        seasons: [{
          number: data.season_number || 1,
          episodes: data.episodes.map(function (ep) {
            return {
              number: ep.number,
              watched_at: ep.watched_at || new Date().toISOString()
            };
          })
        }]
      });
      return requestApi('POST', '/sync/history', body);
    }

    // Перевірка, чи data має структуру для фільму
    if (data.method === 'movie') {
      // Перевірка наявності необхідних даних
      if (!data.id) {
        return Promise.reject(new Error(Lampa.Lang.translate('trakttv_movie_id_missed')));
      }
      body.movies.push({
        ids: {
          tmdb: data.id
        },
        watched_at: new Date().toISOString()
      });
      return requestApi('POST', '/sync/history', body);
    }
    // Перевірка, чи data має структуру для серіалу
    else if (data.method === 'show' || data.method === 'tv') {
      // Перевірка наявності необхідних даних
      if (!data.id) {
        return Promise.reject(new Error(Lampa.Lang.translate('trakttv_show_id_missed')));
      }
      if (mode === 'all') {
        // Додаємо весь серіал в історію
        body.shows.push({
          ids: data.ids || {
            tmdb: data.id
          },
          watched_at: new Date().toISOString()
        });
        return requestApi('POST', '/sync/history', body);
      } else if (mode === 'last_season' || mode === 'last_episode') {
        var _data$ids;
        // Спочатку отримуємо історію серіалу, щоб визначити які епізоди вже переглянуті
        return getShowHistory(data.id, (_data$ids = data.ids) === null || _data$ids === void 0 ? void 0 : _data$ids.trakt).then(function (historyData) {
          var _data$ids2;
          // Отримуємо інформацію про серіал для визначення всіх сезонів та епізодів
          return getShowInfo(data.id, (_data$ids2 = data.ids) === null || _data$ids2 === void 0 ? void 0 : _data$ids2.trakt).then(function (showInfo) {
            // Отримуємо останній сезон
            var lastSeason = showInfo.last_season || data.season || 1;

            // Отримуємо список всіх переглянутих епізодів
            var watchedEpisodes = {};
            if (historyData && historyData.length > 0) {
              historyData.forEach(function (item) {
                if (item.episode) {
                  var s = item.episode.season;
                  var e = item.episode.number;
                  if (!watchedEpisodes[s]) {
                    watchedEpisodes[s] = [];
                  }
                  if (!watchedEpisodes[s].includes(e)) {
                    watchedEpisodes[s].push(e);
                  }
                }
              });
            }

            // Отримуємо інформацію про останній сезон
            var seasonUrl = Lampa.TMDB.api('tv/' + data.id + '/season/' + lastSeason + '?api_key=' + Lampa.TMDB.key() + '&language=' + Lampa.Storage.get('language', 'ru'));
            return new Promise(function (resolve, reject) {
              var network = new Lampa.Reguest();
              network.silent(seasonUrl, function (seasonData) {
                if (seasonData && seasonData.episodes && seasonData.episodes.length > 0) {
                  // Знаходимо всі епізоди сезону
                  var allEpisodes = seasonData.episodes.map(function (e) {
                    return e.episode_number;
                  }).sort(function (a, b) {
                    return a - b;
                  });

                  // Знаходимо невідмічені епізоди
                  var unwatchedEpisodes = allEpisodes.filter(function (e) {
                    return !watchedEpisodes[lastSeason] || !watchedEpisodes[lastSeason].includes(e);
                  });
                  if (mode === 'last_episode' && unwatchedEpisodes.length > 0) {
                    // Додаємо перший невідмічений епізод
                    var nextEpisode = unwatchedEpisodes[0];
                    body.shows.push({
                      ids: data.ids || {
                        tmdb: data.id
                      },
                      seasons: [{
                        number: lastSeason,
                        episodes: [{
                          number: nextEpisode,
                          watched_at: new Date().toISOString()
                        }]
                      }]
                    });
                  } else if (mode === 'last_season' && unwatchedEpisodes.length > 0) {
                    // Додаємо всі невідмічені епізоди сезону
                    body.shows.push({
                      ids: data.ids || {
                        tmdb: data.id
                      },
                      seasons: [{
                        number: lastSeason,
                        episodes: unwatchedEpisodes.map(function (e) {
                          return {
                            number: e,
                            watched_at: new Date().toISOString()
                          };
                        })
                      }]
                    });
                  } else {
                    // Якщо всі епізоди вже переглянуті, додаємо весь сезон
                    body.shows.push({
                      ids: data.ids || {
                        tmdb: data.id
                      },
                      seasons: [{
                        number: lastSeason,
                        watched_at: new Date().toISOString()
                      }]
                    });
                  }
                  resolve(requestApi('POST', '/sync/history', body));
                } else {
                  // Якщо не вдалося отримати дані про епізоди, додаємо весь сезон
                  body.shows.push({
                    ids: data.ids || {
                      tmdb: data.id
                    },
                    seasons: [{
                      number: lastSeason,
                      watched_at: new Date().toISOString()
                    }]
                  });
                  resolve(requestApi('POST', '/sync/history', body));
                }
              }, function () {
                // У випадку помилки додаємо весь сезон
                body.shows.push({
                  ids: data.ids || {
                    tmdb: data.id
                  },
                  seasons: [{
                    number: lastSeason,
                    watched_at: new Date().toISOString()
                  }]
                });
                resolve(requestApi('POST', '/sync/history', body));
              });
            });
          });
        })["catch"](function (error) {
          var _data$ids3;
          // Fallback to original behavior if there's an error
          return getShowInfo(data.id, (_data$ids3 = data.ids) === null || _data$ids3 === void 0 ? void 0 : _data$ids3.trakt).then(function (showInfo) {
            var lastSeason = showInfo.last_season || data.season || 1;
            var lastEpisode = showInfo.last_episode || data.episode || 1;
            if (mode === 'last_season') {
              body.shows.push({
                ids: data.ids || {
                  tmdb: data.id
                },
                seasons: [{
                  number: lastSeason,
                  watched_at: new Date().toISOString()
                }]
              });
            } else if (mode === 'last_episode') {
              body.shows.push({
                ids: data.ids || {
                  tmdb: data.id
                },
                seasons: [{
                  number: lastSeason,
                  episodes: [{
                    number: lastEpisode,
                    watched_at: new Date().toISOString()
                  }]
                }]
              });
            }
            return requestApi('POST', '/sync/history', body);
          });
        });
      } else {
        // Якщо mode не вказаний або інший, додаємо весь серіал
        // Використовуємо передані ids або формуватимемо за TMDB ID
        body.shows.push({
          ids: data.ids || {
            tmdb: data.id
          },
          watched_at: new Date().toISOString()
        });
        return requestApi('POST', '/sync/history', body);
      }
    } else {
      // Якщо тип вмісту не визначено, повертаємо помилку
      return Promise.reject(new Error(Lampa.Lang.translate('trakttv_unknown_content')));
    }
  }
  function tmdbRequest(url) {
    return new Promise(function (resolve, reject) {
      try {
        var network = new Lampa.Reguest();
        network.silent(url, function (data) {
          return resolve(data);
        }, function () {
          return reject(new Error('TMDB request failed'));
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  // Функція для отримання інформації про серіал з TMDB або Trakt
  function getShowInfo(tmdbId) {
    var traktId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return new Promise(function (resolve, reject) {
      // Якщо переданий Trakt ID, отримуємо інформацію з Trakt
      if (traktId) {
        requestApi('GET', "/shows/".concat(traktId, "?extended=full")).then(function (showData) {
          if (showData && showData.seasons) {
            // Знаходимо останній сезон (виключаючи спеціальні сезони з номером 0)
            var regularSeasons = showData.seasons.filter(function (s) {
              return s.number > 0;
            });
            var lastSeasonData = regularSeasons.length > 0 ? regularSeasons.reduce(function (prev, current) {
              return prev.number > current.number ? prev : current;
            }) : null;

            // Якщо знайдено останній сезон, отримуємо інформацію про його епізоди
            if (lastSeasonData) {
              requestApi('GET', "/shows/".concat(traktId, "/seasons/").concat(lastSeasonData.number, "?extended=full")).then(function (seasonData) {
                if (seasonData && seasonData.episodes && seasonData.episodes.length > 0) {
                  // Знаходимо останній епізод сезону
                  var lastEpisodeData = seasonData.episodes.reduce(function (prev, current) {
                    return prev.number > current.number ? prev : current;
                  });
                  resolve({
                    last_season: lastSeasonData.number,
                    last_episode: lastEpisodeData.number,
                    total_seasons: regularSeasons.length,
                    total_episodes: seasonData.episodes.length
                  });
                } else {
                  resolve({
                    last_season: lastSeasonData.number,
                    last_episode: 1
                  });
                }
              })["catch"](function () {
                // Якщо не вдалося отримати дані про епізоди, повертаємо хоча б номер сезону
                resolve({
                  last_season: lastSeasonData.number,
                  last_episode: 1
                });
              });
            } else {
              resolve({
                last_season: 1,
                last_episode: 1
              });
            }
          } else {
            resolve({
              last_season: 1,
              last_episode: 1
            });
          }
        })["catch"](function () {
          // У випадку помилки повертаємо значення за замовчуванням
          resolve({
            last_season: 1,
            last_episode: 1
          });
        });
        return;
      }

      // Використовуємо Lampa.TMDB для отримання інформації про серіал
      var url = Lampa.TMDB.api('tv/' + tmdbId + '?api_key=' + Lampa.TMDB.key() + '&language=' + Lampa.Storage.get('language', 'ru'));
      tmdbRequest(url).then(function (data) {
        if (data && data.seasons) {
          // Знаходимо останній сезон (виключаючи спеціальні сезони з номером 0)
          var regularSeasons = data.seasons.filter(function (s) {
            return s.season_number > 0;
          });
          var lastSeasonData = regularSeasons.length > 0 ? regularSeasons.reduce(function (prev, current) {
            return prev.season_number > current.season_number ? prev : current;
          }) : null;

          // Якщо знайдено останній сезон, отримуємо інформацію про його епізоди
          if (lastSeasonData) {
            var seasonUrl = Lampa.TMDB.api('tv/' + tmdbId + '/season/' + lastSeasonData.season_number + '?api_key=' + Lampa.TMDB.key() + '&language=' + Lampa.Storage.get('language', 'ru'));
            return tmdbRequest(seasonUrl).then(function (seasonData) {
              if (seasonData && seasonData.episodes && seasonData.episodes.length > 0) {
                // Знаходимо останній епізод сезону
                var lastEpisodeData = seasonData.episodes.reduce(function (prev, current) {
                  return prev.episode_number > current.episode_number ? prev : current;
                });
                resolve({
                  last_season: lastSeasonData.season_number,
                  last_episode: lastEpisodeData.episode_number,
                  total_seasons: regularSeasons.length,
                  total_episodes: seasonData.episodes.length
                });
              } else {
                resolve({
                  last_season: lastSeasonData.season_number,
                  last_episode: 1
                });
              }
            })["catch"](function () {
              // Якщо не вдалося отримати дані про епізоди, повертаємо хоча б номер сезону
              resolve({
                last_season: lastSeasonData.season_number,
                last_episode: 1
              });
            });
          } else {
            resolve({
              last_season: 1,
              last_episode: 1
            });
          }
        } else {
          resolve({
            last_season: 1,
            last_episode: 1
          });
        }
      })["catch"](function () {
        // У випадку помилки повертаємо значення за замовчуванням
        resolve({
          last_season: 1,
          last_episode: 1
        });
      });
    });
  }

  /**
   * Refresh tokens using refresh_token
   * unauthorized = true
   * Note: blocked while device auth polling is active
   */
  function refreshTokens() {
    return _refreshTokens.apply(this, arguments);
  }
  function _refreshTokens() {
    _refreshTokens = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _ref16,
        redirect_uri,
        _ref16$reason,
        reason,
        refresh_token,
        logging,
        _args2 = arguments;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _ref16 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, redirect_uri = _ref16.redirect_uri, _ref16$reason = _ref16.reason, reason = _ref16$reason === void 0 ? 'manual' : _ref16$reason;
            refresh_token = Lampa.Storage.get('trakt_refresh_token');
            logging = Lampa.Storage.field('trakt_enable_logging');
            if (refresh_token) {
              _context2.n = 1;
              break;
            }
            if (logging) logDebug('refreshTokens skipped: no refresh token');
            setAuthBlocked('no_refresh_token');
            return _context2.a(2, Promise.reject(Object.assign(new Error('No refresh_token'), {
              status: 0,
              code: 'no_refresh_token'
            })));
          case 1:
            if (!isDeviceAuthActive()) {
              _context2.n = 2;
              break;
            }
            if (logging) logDebug('refreshTokens skipped: device auth active', {
              reason: reason
            });
            return _context2.a(2, Promise.reject(Object.assign(new Error('Device auth is active'), {
              status: 423,
              code: 'device_auth_active'
            })));
          case 2:
            return _context2.a(2, rlWaitForSlot('/oauth/token').then(function () {
              return _performRequest('POST', '/oauth/token', {
                refresh_token: refresh_token,
                redirect_uri: redirect_uri || '',
                grant_type: 'refresh_token'
              }, true);
            }).then(function (res) {
              rlRecordRequest('/oauth/token', 200);
              if (res && res.access_token) {
                saveTokens(res);
              }
              return res;
            })["catch"](function (error) {
              var status = Number(error && error.status) || 0;
              rlRecordRequest('/oauth/token', status);
              if (status === 429) {
                var retryAfterSec = parseRetryAfterMs$1(error && error.headers ? error.headers : {});
                rlEnterCooldown(retryAfterSec ? Math.round(retryAfterSec / 1000) : undefined);
                logWarn('Trakt rate limit on token refresh, global cooldown entered', {
                  cooldownMs: rlGetCooldownRemainingMs()
                }, {
                  debugOnly: true
                });
              }
              if (error && (error.status === 400 || error.status === 401)) {
                setAuthBlocked("refresh_failed_".concat(error.status));
                clearAuthStorage();
              }
              if (logging) logWarn('refreshTokens failed', {
                reason: reason,
                error: error
              }, {
                debugOnly: true
              });
              throw error;
            }));
        }
      }, _callee2);
    }));
    return _refreshTokens.apply(this, arguments);
  }
  var refreshPromise = null;
  function runRefreshFlow() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (refreshPromise) {
      return refreshPromise;
    }
    refreshPromise = refreshTokens(options)["finally"](function () {
      refreshPromise = null;
    });
    return refreshPromise;
  }
  function ensureValidAccessToken() {
    return _ensureValidAccessToken.apply(this, arguments);
  }
  function _ensureValidAccessToken() {
    _ensureValidAccessToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _ref17,
        _ref17$reason,
        reason,
        _ref17$force,
        force,
        _ref17$skewMs,
        skewMs,
        token,
        refreshToken,
        noAccessToken,
        shouldRefreshByExpiry,
        _args3 = arguments;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _ref17 = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, _ref17$reason = _ref17.reason, reason = _ref17$reason === void 0 ? 'preflight' : _ref17$reason, _ref17$force = _ref17.force, force = _ref17$force === void 0 ? false : _ref17$force, _ref17$skewMs = _ref17.skewMs, skewMs = _ref17$skewMs === void 0 ? TOKEN_EXPIRY_SKEW_MS : _ref17$skewMs;
            token = Lampa.Storage.get('trakt_token');
            refreshToken = Lampa.Storage.get('trakt_refresh_token');
            if (refreshToken) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, null);
          case 1:
            if (!isDeviceAuthActive()) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2, null);
          case 2:
            noAccessToken = !token;
            shouldRefreshByExpiry = force || isTokenExpiringSoon({
              skewMs: Number(skewMs) || TOKEN_EXPIRY_SKEW_MS
            });
            if (!(!noAccessToken && !shouldRefreshByExpiry)) {
              _context3.n = 3;
              break;
            }
            return _context3.a(2, null);
          case 3:
            return _context3.a(2, runRefreshFlow({
              reason: reason
            }));
        }
      }, _callee3);
    }));
    return _ensureValidAccessToken.apply(this, arguments);
  }
  function sleep$1(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, Math.max(0, Number(ms) || 0));
    });
  }
  function sortForStableSerialize(value) {
    if (Array.isArray(value)) {
      return value.map(sortForStableSerialize);
    }
    if (value && _typeof(value) === 'object') {
      var normalized = {};
      Object.keys(value).sort().forEach(function (key) {
        if (typeof value[key] === 'undefined') return;
        normalized[key] = sortForStableSerialize(value[key]);
      });
      return normalized;
    }
    return value;
  }
  function stableSerialize(value) {
    try {
      return JSON.stringify(sortForStableSerialize(value));
    } catch (error) {
      return String(value);
    }
  }
  function normalizeQueryString() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var source = String(query || '').replace(/^\?+/, '');
    if (!source) return '';
    try {
      var parsed = new URLSearchParams(source);
      var entries = [];
      parsed.forEach(function (value, key) {
        if (!key || key === '_') return;
        entries.push([String(key), String(value)]);
      });
      entries.sort(function (left, right) {
        if (left[0] === right[0]) {
          if (left[1] === right[1]) return 0;
          return left[1] > right[1] ? 1 : -1;
        }
        return left[0] > right[0] ? 1 : -1;
      });
      var normalized = new URLSearchParams();
      entries.forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];
        return normalized.append(key, value);
      });
      return normalized.toString();
    } catch (error) {
      return source;
    }
  }
  function normalizeRequestUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var source = String(url || '').trim();
    if (source.indexOf(PROXY_BASE_URL) === 0) {
      source = source.slice(PROXY_BASE_URL.length);
    }
    if (source.indexOf(DIRECT_BASE_URL) === 0) {
      source = source.slice(DIRECT_BASE_URL.length);
    }
    var queryIndex = source.indexOf('?');
    var rawPath = queryIndex >= 0 ? source.slice(0, queryIndex) : source;
    var rawQuery = queryIndex >= 0 ? source.slice(queryIndex + 1) : '';
    var path = "/".concat(String(rawPath || '').replace(/^\/+/, '')).replace(/\/{2,}/g, '/');
    var normalizedPath = path.length > 1 ? path.replace(/\/+$/, '') : path;
    var query = normalizeQueryString(rawQuery);
    var full = query ? "".concat(normalizedPath, "?").concat(query) : normalizedPath;
    return {
      path: normalizedPath,
      query: query,
      full: full
    };
  }
  function buildAuthScope() {
    var unauthorized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (unauthorized) return 'unauthorized';
    var token = String(Lampa.Storage.get('trakt_token') || '');
    if (!token) return 'anon';
    return "token:".concat(token.length, ":").concat(token.slice(-8));
  }
  function buildRequestKey(method, url, params, unauthorized) {
    var requestOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var normalizedMethod = String(method || 'GET').toUpperCase();
    var request = normalizeRequestUrl(url);
    var authScope = buildAuthScope(unauthorized);
    var mode = requestOptions && requestOptions.withMeta ? 'meta' : 'data';
    var body = normalizedMethod === 'GET' ? '' : stableSerialize(params || {});
    return [normalizedMethod, request.path, request.query, authScope, mode, body].join('|');
  }
  function buildCacheKey(method, url, unauthorized) {
    var requestOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var normalizedMethod = String(method || 'GET').toUpperCase();
    var request = normalizeRequestUrl(url);
    var authScope = buildAuthScope(unauthorized);
    var mode = requestOptions && requestOptions.withMeta ? 'meta' : 'data';
    return [normalizedMethod, request.path, request.query, authScope, mode].join('|');
  }
  function parseRetryAfterMs$1() {
    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var value = headers && headers['retry-after'];
    if (!value) return null;
    var numeric = Number(value);
    if (Number.isFinite(numeric) && numeric >= 0) {
      return numeric * 1000;
    }
    var dateMs = Date.parse(value);
    if (Number.isFinite(dateMs)) {
      return Math.max(0, dateMs - Date.now());
    }
    return null;
  }
  function isRetryableStatus(status) {
    return status === 429 || status === 504 || status >= 500 && status <= 599;
  }
  function resolveRetryDelayMs(status, attempt) {
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var step = Math.max(1, Number(attempt) || 1);
    var backoff = Math.min(RETRY_MAX_DELAY_MS, RETRY_BASE_DELAY_MS * Math.pow(2, step - 1));
    var jitter = Math.floor(Math.random() * 250);
    var backoffWithJitter = backoff + jitter;
    if (status === 429) {
      var retryAfterMs = parseRetryAfterMs$1(headers);
      if (retryAfterMs !== null) {
        return Math.max(retryAfterMs, backoffWithJitter);
      }
    }
    return backoffWithJitter;
  }
  function cloneValue(value) {
    if (!value || _typeof(value) !== 'object') return value;
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (error) {
      return value;
    }
  }
  function getCacheTtlMs(method, url) {
    var requestOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var normalizedMethod = String(method || 'GET').toUpperCase();
    if (normalizedMethod !== 'GET') return 0;
    if (requestOptions && requestOptions.cache === false) return 0;
    var request = normalizeRequestUrl(url);
    var path = request.path || '';
    if (!path) return 0;
    if (/^\/(media|movies|shows)\/(trending|popular|anticipated)(\/|$)/.test(path)) {
      return CACHE_TTL_FEED_MS;
    }
    if (/^\/recommendations(\/|$)/.test(path) || /^\/search(\/|$)/.test(path)) {
      return CACHE_TTL_FEED_MS;
    }
    if (path === '/users/me' || /^\/users\/me\/lists(\/|$)/.test(path) || /^\/users\/me\/likes\/lists(\/|$)/.test(path)) {
      return CACHE_TTL_PROGRESS_MS;
    }
    if (/^\/networks(\/|$)/.test(path)) {
      return CACHE_TTL_METADATA_MS;
    }

    // Static metadata: show/movie descriptions, TMDB resolution — 1 hour
    if (/^\/shows\/\d+(\/|$)/.test(path)) return CACHE_TTL_METADATA_MS;
    if (/^\/movies\/\d+(\/|$)/.test(path)) return CACHE_TTL_METADATA_MS;
    if (/^\/search\/tmdb\/\d+/.test(path)) return CACHE_TTL_METADATA_MS;
    return 0;
  }
  function getCachedResponse(cacheKey) {
    var cached = responseCache.get(cacheKey);
    if (!cached) return null;
    if ((Number(cached.expiresAt) || 0) <= Date.now()) {
      responseCache["delete"](cacheKey);
      return null;
    }
    return cloneValue(cached.value);
  }
  function setCachedResponse(cacheKey, value, ttlMs) {
    if (!cacheKey || !ttlMs) return;

    // Evict oldest entry if at capacity
    if (responseCache.size >= RESPONSE_CACHE_MAX && !responseCache.has(cacheKey)) {
      var oldestKey = responseCache.keys().next().value;
      if (oldestKey) responseCache["delete"](oldestKey);
    }
    responseCache.set(cacheKey, {
      expiresAt: Date.now() + ttlMs,
      value: cloneValue(value)
    });
  }
  function clearResponseCache() {
    responseCache.clear();
  }
  function performRequestWithRetry(_x2, _x3) {
    return _performRequestWithRetry.apply(this, arguments);
  }
  function _performRequestWithRetry() {
    _performRequestWithRetry = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(method, url) {
      var params,
        unauthorized,
        requestOptions,
        logging,
        maxRetriesRaw,
        maxRetries,
        attempt,
        result,
        status,
        retryAfterSec,
        delay,
        _args4 = arguments,
        _t;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            params = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
            unauthorized = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : false;
            requestOptions = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : {};
            logging = Lampa.Storage.field('trakt_enable_logging');
            maxRetriesRaw = Number(requestOptions && requestOptions.maxRetries);
            maxRetries = Number.isFinite(maxRetriesRaw) ? Math.max(0, Math.min(5, maxRetriesRaw)) : MAX_RETRY_ATTEMPTS;
            attempt = 0;
          case 1:
            _context4.n = 2;
            return rlWaitForSlot(url);
          case 2:
            _context4.p = 2;
            _context4.n = 3;
            return _performRequest(method, url, params, unauthorized, requestOptions);
          case 3:
            result = _context4.v;
            // Record successful request in the rate limiter log
            rlRecordRequest(url, 200);
            return _context4.a(2, result);
          case 4:
            _context4.p = 4;
            _t = _context4.v;
            status = Number(_t && _t.status) || 0; // Record failure in rate limiter; trigger cooldown on 429
            rlRecordRequest(url, status);
            if (status === 429 && !rlIsOnCooldown()) {
              retryAfterSec = parseRetryAfterMs$1(_t && _t.headers ? _t.headers : {});
              rlEnterCooldown(retryAfterSec ? Math.round(retryAfterSec / 1000) : undefined);
              if (logging) {
                logWarn('Trakt rate limit: global cooldown entered', {
                  endpoint: normalizeRequestUrl(url).full,
                  method: String(method || 'GET').toUpperCase(),
                  cooldownMs: rlGetCooldownRemainingMs()
                }, {
                  debugOnly: true
                });
              }
            }
            if (!(!isRetryableStatus(status) || attempt >= maxRetries)) {
              _context4.n = 5;
              break;
            }
            // Propagate 403 as terminal for non-auth to avoid futile retries
            if (status === 403) {
              logWarn('Trakt request rejected with 403, not retrying', {
                endpoint: normalizeRequestUrl(url).full,
                method: String(method || 'GET').toUpperCase()
              }, {
                debugOnly: true
              });
            }
            throw _t;
          case 5:
            attempt += 1;
            delay = resolveRetryDelayMs(status, attempt, _t && _t.headers ? _t.headers : {});
            if (logging) {
              logWarn('Trakt request retry scheduled', {
                endpoint: normalizeRequestUrl(url).full,
                method: String(method || 'GET').toUpperCase(),
                status: status,
                retryReason: status === 429 ? 'rate_limit' : 'server_error',
                retryDelayMs: delay,
                attempt: attempt,
                maxRetries: maxRetries
              }, {
                debugOnly: true
              });
            }
            _context4.n = 6;
            return sleep$1(delay);
          case 6:
            _context4.n = 1;
            break;
          case 7:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 4]]);
    }));
    return _performRequestWithRetry.apply(this, arguments);
  }
  function executeRequestWithPolicy(_x4, _x5) {
    return _executeRequestWithPolicy.apply(this, arguments);
  }
  function _executeRequestWithPolicy() {
    _executeRequestWithPolicy = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(method, url) {
      var params,
        unauthorized,
        requestOptions,
        normalizedMethod,
        ttlMs,
        cacheKey,
        useCache,
        cached,
        dedupEnabled,
        requestKey,
        promise,
        _args5 = arguments;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            params = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
            unauthorized = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : false;
            requestOptions = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : {};
            normalizedMethod = String(method || 'GET').toUpperCase();
            ttlMs = getCacheTtlMs(normalizedMethod, url, requestOptions);
            cacheKey = ttlMs > 0 ? buildCacheKey(normalizedMethod, url, unauthorized, requestOptions) : '';
            useCache = ttlMs > 0 && !(requestOptions && requestOptions.forceFresh);
            if (!useCache) {
              _context5.n = 1;
              break;
            }
            cached = getCachedResponse(cacheKey);
            if (!(cached !== null)) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2, cached);
          case 1:
            dedupEnabled = !(requestOptions && requestOptions.dedup === false);
            requestKey = dedupEnabled ? buildRequestKey(normalizedMethod, url, params, unauthorized, requestOptions) : '';
            if (!(requestKey && inFlightRequests.has(requestKey))) {
              _context5.n = 2;
              break;
            }
            return _context5.a(2, inFlightRequests.get(requestKey));
          case 2:
            promise = performRequestWithRetry(normalizedMethod, url, params, unauthorized, requestOptions).then(function (result) {
              if (useCache) {
                setCachedResponse(cacheKey, result, ttlMs);
              }
              if (MUTATION_METHODS.has(normalizedMethod)) {
                clearResponseCache();
              }
              return result;
            })["finally"](function () {
              if (requestKey) inFlightRequests["delete"](requestKey);
            });
            if (requestKey) {
              inFlightRequests.set(requestKey, promise);
            }
            return _context5.a(2, promise);
        }
      }, _callee5);
    }));
    return _executeRequestWithPolicy.apply(this, arguments);
  }
  function requestApi(_x6, _x7) {
    return _requestApi.apply(this, arguments);
  }
  function _requestApi() {
    _requestApi = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(method, url) {
      var params,
        unauthorized,
        requestOptions,
        logging,
        normalizedMethod,
        normalizedEndpoint,
        didRefreshAfter401,
        status,
        cooldownMs,
        _cooldownMs,
        refreshStatus,
        _args6 = arguments,
        _t2,
        _t3,
        _t4;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            params = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
            unauthorized = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : false;
            requestOptions = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : {};
            logging = Lampa.Storage.field('trakt_enable_logging');
            normalizedMethod = String(method || 'GET').toUpperCase();
            normalizedEndpoint = normalizeRequestUrl(url).full;
            didRefreshAfter401 = false;

            // If auth is blocked due to prior terminal auth failure, stop user-scoped traffic until new token appears.
            if (!(!unauthorized && isAuthBlocked())) {
              _context6.n = 2;
              break;
            }
            if (!(hasUsableAccessToken() && hasNewAccessTokenSinceBlock())) {
              _context6.n = 1;
              break;
            }
            clearAuthBlocked();
            _context6.n = 2;
            break;
          case 1:
            if (logging) {
              logWarn('Auth blocked: user-scoped request rejected without network', {
                endpoint: normalizedEndpoint,
                method: normalizedMethod,
                reason: authBlockedReason || 'reauth_required'
              }, {
                debugOnly: true
              });
            }
            notifyAuthBlockedOnce();
            throw buildAuthBlockedError(authBlockedReason || 'reauth_required');
          case 2:
            if (!(!unauthorized && getAuthRateLimitRemainingMs() > 0)) {
              _context6.n = 3;
              break;
            }
            if (logging) {
              logWarn('Auth cooldown: user-scoped request rejected without network', {
                endpoint: normalizedEndpoint,
                method: normalizedMethod,
                retryAfterMs: getAuthRateLimitRemainingMs()
              }, {
                debugOnly: true
              });
            }
            throw buildAuthRateLimitError();
          case 3:
            if (!(!unauthorized && Lampa.Storage.get('trakt_refresh_token'))) {
              _context6.n = 9;
              break;
            }
            if (!(getAuthRateLimitRemainingMs() > 0)) {
              _context6.n = 4;
              break;
            }
            if (logging) {
              logWarn('Preflight token refresh skipped: auth cooldown active', {
                endpoint: normalizedEndpoint,
                method: normalizedMethod,
                retryAfterMs: getAuthRateLimitRemainingMs()
              }, {
                debugOnly: true
              });
            }
            throw buildAuthRateLimitError();
          case 4:
            _context6.p = 4;
            _context6.n = 5;
            return ensureValidAccessToken({
              reason: "preflight:".concat(normalizedMethod, ":").concat(normalizedEndpoint)
            });
          case 5:
            _context6.n = 9;
            break;
          case 6:
            _context6.p = 6;
            _t2 = _context6.v;
            status = Number(_t2 && _t2.status) || 0;
            if (!isAuthRateLimitStatus(status)) {
              _context6.n = 7;
              break;
            }
            cooldownMs = setAuthRateLimitCooldown(_t2);
            if (logging) {
              logWarn('Preflight token refresh rate limited, auth cooldown entered', {
                endpoint: normalizedEndpoint,
                method: normalizedMethod,
                status: status,
                cooldownMs: cooldownMs
              }, {
                debugOnly: true
              });
            }
            throw buildAuthRateLimitError(_t2);
          case 7:
            if (!(_t2 && (_t2.status === 400 || _t2.status === 401))) {
              _context6.n = 8;
              break;
            }
            setAuthBlocked("preflight_refresh_failed_".concat(_t2.status));
            notifyAuthBlockedOnce();
            throw _t2;
          case 8:
            // On 503, enter auth cooldown and continue with current token
            if (status === 503) {
              _cooldownMs = setAuthRateLimitCooldown(_t2);
              if (logging) {
                logWarn('Preflight token refresh: 503 received, auth cooldown entered, using current token', {
                  endpoint: normalizedEndpoint,
                  method: normalizedMethod,
                  cooldownMs: _cooldownMs
                }, {
                  debugOnly: true
                });
              }
            } else if (logging) {
              logWarn('Preflight token refresh failed, using current token', {
                endpoint: normalizedEndpoint,
                method: normalizedMethod,
                status: _t2 && _t2.status
              }, {
                debugOnly: true
              });
            }
          case 9:
            _context6.p = 10;
            _context6.n = 11;
            return executeRequestWithPolicy(normalizedMethod, url, params, unauthorized, requestOptions);
          case 11:
            return _context6.a(2, _context6.v);
          case 12:
            _context6.p = 12;
            _t3 = _context6.v;
            if (!(!unauthorized && _t3 && _t3.status === 401 && !didRefreshAfter401)) {
              _context6.n = 18;
              break;
            }
            didRefreshAfter401 = true;
            if (logging) {
              logDebug('401 received, run single refresh flow', {
                endpoint: normalizedEndpoint,
                method: normalizedMethod
              });
            }
            _context6.p = 13;
            _context6.n = 14;
            return runRefreshFlow({
              reason: "401:".concat(normalizedMethod, ":").concat(normalizedEndpoint)
            });
          case 14:
            _context6.n = 17;
            break;
          case 15:
            _context6.p = 15;
            _t4 = _context6.v;
            refreshStatus = Number(_t4 && _t4.status) || 0;
            if (!isAuthRateLimitStatus(refreshStatus)) {
              _context6.n = 16;
              break;
            }
            setAuthRateLimitCooldown(_t4);
            throw buildAuthRateLimitError(_t4);
          case 16:
            throw _t4;
          case 17:
            return _context6.a(3, 9);
          case 18:
            if (!unauthorized && _t3 && _t3.status === 401) {
              setAuthBlocked('unauthorized_after_refresh');
              notifyAuthBlockedOnce();
            }
            if (!unauthorized && _t3 && _t3.status === 403 && normalizedEndpoint === '/users/me') {
              setAuthBlocked('users_me_forbidden');
              notifyAuthBlockedOnce();
            }
            throw _t3;
          case 19:
            return _context6.a(2);
        }
      }, _callee6, null, [[13, 15], [10, 12], [4, 6]]);
    }));
    return _requestApi.apply(this, arguments);
  }
  function _performRequest(method, url) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var unauthorized = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var requestOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var headers = ensureHeaders({
      unauthorized: unauthorized
    });
    return executeRequest(method, url, params, headers, unauthorized, requestOptions);
  }

  /**
   * Ensure Trakt headers (canonical).
   * Always sets:
   * - 'Content-Type': 'application/json'
   * - 'trakt-api-version': '2'
   * - 'x-requested-with': 'lme-plugins'
   * When unauthorized === true, DO NOT add Authorization Bearer header.
   * When unauthorized === false and access token exists, add Bearer.
   * Signature: function ensureHeaders({ unauthorized } = { unauthorized: false })
   */
  function ensureHeaders() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        unauthorized: false
      },
      unauthorized = _ref4.unauthorized;
    var headers = {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'x-requested-with': 'lme-plugins'
    };
    if (!unauthorized) {
      var token = Lampa.Storage.get('trakt_token');
      if (token) headers['Authorization'] = "Bearer ".concat(token);
    }
    return headers;
  }
  function formatTraktResults() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return {
      results: (Array.isArray(items) ? items : []).map(function (item) {
        var media = item.movie || item.show;
        if (!media || !media.ids) return null;
        return {
          component: 'full',
          id: media.ids.tmdb || media.ids.trakt,
          ids: media.ids,
          title: media.title,
          original_title: media.title,
          release_date: media.year ? String(media.year) : '',
          vote_average: Number(media.rating || 0),
          poster: getImageUrl(media, 'poster'),
          image: getImageUrl(media, 'fanart'),
          method: item.movie ? 'movie' : 'tv',
          card_type: item.movie ? 'movie' : 'tv'
        };
      }).filter(Boolean)
    };
  }
  function mapUpNextNitroItem() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var show = item.show || {};
    var ids = show.ids || {};
    var progress = item.progress || {};
    var nextEpisode = progress.next_episode || null;
    var lastEpisode = progress.last_episode || null;
    var id = ids.tmdb || ids.trakt;
    if (!id) return null;
    var watched = toNonNegativeInt$1(progress.completed) !== null ? toNonNegativeInt$1(progress.completed) : toNonNegativeInt$1(progress && progress.stats && progress.stats.play_count) || 0;
    var aired = toNonNegativeInt$1(progress.aired) !== null ? toNonNegativeInt$1(progress.aired) : toNonNegativeInt$1(show.aired_episodes) !== null ? toNonNegativeInt$1(show.aired_episodes) : toNonNegativeInt$1(item.cached_aired_episode_count) || 0;
    var progressTotal = aired > 0 ? aired : watched;
    var releaseDate = nextEpisode && nextEpisode.first_aired ? nextEpisode.first_aired : show.first_aired || (show.year ? String(show.year) : '');
    return {
      component: 'full',
      id: id,
      ids: ids,
      title: show.title || '',
      original_title: show.original_title || show.title || '',
      original_name: show.original_title || show.title || '',
      name: show.title || '',
      release_date: releaseDate ? String(releaseDate) : '',
      vote_average: Number(show.rating || 0),
      poster: getImageUrl(show, 'poster'),
      image: getImageUrl(show, 'fanart'),
      method: 'tv',
      type: 'tv',
      card_type: 'tv',
      source: 'tmdb',
      trakt_upnext_watched: watched,
      trakt_upnext_total: progressTotal,
      trakt_upnext_progress: "".concat(watched, "/").concat(progressTotal),
      trakt_upnext_last_watched_at: progress.last_watched_at || null,
      trakt_upnext_hidden: toNonNegativeInt$1(progress.hidden) || 0,
      trakt_upnext_reset_at: progress.reset_at || null,
      trakt_upnext_next_episode: nextEpisode,
      trakt_upnext_last_episode: lastEpisode,
      total_count: toNonNegativeInt$1(item.total_count)
    };
  }

  // Функція для отримання історії серіалу за TMDB ID
  function getShowHistory(tmdbId) {
    var traktId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return new Promise(function (resolve, reject) {
      // Якщо переданий Trakt ID, отримуємо інформацію з Trakt
      if (traktId) {
        requestApi('GET', "/shows/".concat(traktId, "/history")).then(function (historyData) {
          resolve(historyData);
        })["catch"](function (error) {
          reject(error);
        });
        return;
      }

      // Спочатку отримуємо Trakt ID за TMDB ID
      requestApi('GET', "/search/tmdb/".concat(tmdbId, "?type=show")).then(function (response) {
        if (response && response.length > 0 && response[0].show && response[0].show.ids.trakt) {
          var foundTraktId = response[0].show.ids.trakt;

          // Отримуємо історію серіалу за Trakt ID
          requestApi('GET', "/sync/history/shows/".concat(foundTraktId)).then(function (historyData) {
            resolve(historyData);
          })["catch"](function (error) {
            reject(error);
          });
        } else {
          reject(new Error('Show not found in Trakt'));
        }
      })["catch"](function (error) {
        reject(error);
      });
    });
  }
  function resolveTraktIds() {
    var _params$external_ids, _params$external_ids2, _params$external_ids3;
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var rawIds = params.ids && Object.keys(params.ids).length ? _objectSpread2({}, params.ids) : {};
    var tmdbId = params.id || params.tmdb || ((_params$external_ids = params.external_ids) === null || _params$external_ids === void 0 ? void 0 : _params$external_ids.tmdb_id);
    var traktId = (_params$external_ids2 = params.external_ids) === null || _params$external_ids2 === void 0 ? void 0 : _params$external_ids2.trakt_id;
    var imdbId = ((_params$external_ids3 = params.external_ids) === null || _params$external_ids3 === void 0 ? void 0 : _params$external_ids3.imdb_id) || params.imdb;
    if (traktId && !rawIds.trakt) rawIds.trakt = traktId;
    if (tmdbId && !rawIds.tmdb) rawIds.tmdb = tmdbId;
    if (imdbId && !rawIds.imdb) rawIds.imdb = imdbId;
    return rawIds;
  }
  function normalizeMediaType() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var method = (params.method || params.type || '').toString().toLowerCase();
    return method === 'movie' ? 'movie' : 'show';
  }
  function buildSyncPayload() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var ids = resolveTraktIds(params);
    if (!ids || !Object.keys(ids).length) {
      throw new Error('TraktTV media ids are missing');
    }
    return normalizeMediaType(params) === 'movie' ? {
      movies: [{
        ids: ids
      }],
      shows: []
    } : {
      movies: [],
      shows: [{
        ids: ids
      }]
    };
  }
  function sameAnyId() {
    var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!left || !right) return false;
    var keys = ['trakt', 'tmdb', 'imdb'];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (left[key] && right[key] && String(left[key]) === String(right[key])) {
        return true;
      }
    }
    return false;
  }
  function extractMediaFromSyncItem() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (item.movie) return {
      media: item.movie,
      type: 'movie'
    };
    if (item.show) return {
      media: item.show,
      type: 'show'
    };
    return {
      media: null,
      type: null
    };
  }
  function normalizeListCardData(item) {
    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$likedListIds = _ref5.likedListIds,
      likedListIds = _ref5$likedListIds === void 0 ? [] : _ref5$likedListIds,
      _ref5$wide = _ref5.wide,
      wide = _ref5$wide === void 0 ? false : _ref5$wide,
      _ref5$canManage = _ref5.canManage,
      canManage = _ref5$canManage === void 0 ? false : _ref5$canManage;
    var list = item && item.list ? item.list : item;
    if (!list) return null;
    var ids = list.ids || {};
    var listId = ids.trakt || list.id;
    if (!listId) return null;
    var likedIds = Array.isArray(likedListIds) ? likedListIds : [];
    var rawTitle = list.name || list.title || '';
    var title = rawTitle.replace(/^\s*\[\d+\]\s*/, '').trim();
    var description = list.description || '';
    var poster = getImageUrl(list, 'poster') || textToImage(title || rawTitle || 'List');
    var image = getImageUrl(list, 'fanart');
    var cardTitle = wide ? '' : title;
    var card = {
      component: 'trakt_list',
      id: listId,
      list_id: listId,
      ids: ids,
      slug: ids.slug || list.slug || '',
      title: cardTitle,
      list_title: title,
      original_title: cardTitle,
      description: description,
      overview: description,
      poster: poster,
      image: image,
      cover: image || poster,
      method: 'list',
      item_count: list.item_count || 0,
      privacy: list.privacy || '',
      display_numbers: !!list.display_numbers,
      allow_comments: !!list.allow_comments,
      updated_at: list.updated_at || list.updated || '',
      can_manage: !!canManage,
      is_liked: likedIds.includes(listId)
    };
    if (wide) {
      card.params = {
        style: {
          name: 'wide'
        }
      };
    }
    return card;
  }
  function formatListCards(items) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var results = (Array.isArray(items) ? items : []).map(function (item) {
      return normalizeListCardData(item, options);
    }).filter(Boolean);
    return {
      results: results
    };
  }
  function sanitizeListPayload() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var normalized = {};
    var name = (payload.name || payload.title || '').toString().trim();
    var description = (payload.description || '').toString().trim();
    var privacy = (payload.privacy || '').toString().trim();
    if (name) normalized.name = name;
    if (description) normalized.description = description;
    if (privacy) normalized.privacy = privacy;
    if (typeof payload.display_numbers === 'boolean') normalized.display_numbers = payload.display_numbers;
    if (typeof payload.allow_comments === 'boolean') normalized.allow_comments = payload.allow_comments;
    if (typeof payload.sort_by === 'string' && payload.sort_by) normalized.sort_by = payload.sort_by;
    if (typeof payload.sort_how === 'string' && payload.sort_how) normalized.sort_how = payload.sort_how;
    return normalized;
  }
  function makePaginationMeta(items, page, limit) {
    var count = Array.isArray(items) ? items.length : 0;
    var total = (page - 1) * limit + count;
    var total_pages = count === limit ? page + 1 : page;
    return {
      total: total,
      total_pages: total_pages,
      page: page
    };
  }
  function toPositiveInt$1(value) {
    var parsed = parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  function toNonNegativeInt$1(value) {
    var parsed = parseInt(value, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
  }
  function resolvePaginationFromHeaders() {
    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var fallbackPage = toPositiveInt$1(fallback.page) || 1;
    var fallbackLimit = toPositiveInt$1(fallback.limit) || 1;
    var fallbackTotal = toNonNegativeInt$1(fallback.total) || 0;
    var page = toPositiveInt$1(headers['x-pagination-page']) || fallbackPage;
    var limit = toPositiveInt$1(headers['x-pagination-limit']) || fallbackLimit;
    var total = toNonNegativeInt$1(headers['x-pagination-item-count']);
    var pageCount = toPositiveInt$1(headers['x-pagination-page-count']);
    var safeTotal = total !== null ? total : fallbackTotal;
    var safePageCount = pageCount || Math.max(1, Math.ceil(safeTotal / limit));
    return {
      page: page,
      limit: limit,
      total: safeTotal,
      total_pages: safePageCount
    };
  }
  var WATCHLIST_SORT_FIELDS = new Set(['rank', 'added', 'title', 'released', 'runtime', 'popularity', 'random', 'percentage', 'imdb_rating', 'tmdb_rating', 'rt_tomatometer', 'rt_audience', 'metascore', 'votes', 'imdb_votes', 'tmdb_votes', 'my_rating', 'watched', 'collected']);
  var WATCHLIST_VIP_SORT_FIELDS = new Set(['imdb_rating', 'tmdb_rating', 'rt_tomatometer', 'rt_audience', 'metascore', 'votes', 'imdb_votes', 'tmdb_votes']);
  function normalizeWatchlistSort(rawSort) {
    var normalized = (rawSort || 'added/desc').toString().trim().toLowerCase().replace(/^\/+/, '');
    var parts = normalized.split('/').filter(Boolean);
    var field = WATCHLIST_SORT_FIELDS.has(parts[0]) ? parts[0] : 'added';
    var order = parts[1] === 'asc' ? 'asc' : 'desc';
    return "".concat(field, "/").concat(order);
  }
  function normalizeWatchlistMediaType(rawType) {
    var value = (rawType || '').toString().trim().toLowerCase();
    if (value === 'movie' || value === 'movies') return 'movies';
    if (value === 'show' || value === 'shows' || value === 'tv' || value === 'series' || value === 'serials') return 'shows';
    if (value === 'all' || value === 'mixed' || value === 'movies,shows') return 'movies,shows';
    return 'movies,shows';
  }
  function resolveWatchlistPagination() {
    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 36;
    var hasHeaderPagination = !!(toPositiveInt$1(headers['x-pagination-page']) || toPositiveInt$1(headers['x-pagination-limit']) || toPositiveInt$1(headers['x-pagination-page-count']) || toNonNegativeInt$1(headers['x-pagination-item-count']) !== null);
    if (hasHeaderPagination) {
      return resolvePaginationFromHeaders(headers, {
        page: page,
        limit: limit,
        total: (Math.max(1, page) - 1) * Math.max(1, limit) + (Array.isArray(items) ? items.length : 0)
      });
    }
    var fallback = makePaginationMeta(items, page, limit);
    return {
      page: page,
      limit: limit,
      total: fallback.total,
      total_pages: fallback.total_pages
    };
  }
  function buildWatchlistUrl() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref6$mediaType = _ref6.mediaType,
      mediaType = _ref6$mediaType === void 0 ? 'movies,shows' : _ref6$mediaType,
      _ref6$sort = _ref6.sort,
      sort = _ref6$sort === void 0 ? 'added/desc' : _ref6$sort,
      _ref6$page = _ref6.page,
      page = _ref6$page === void 0 ? 1 : _ref6$page,
      _ref6$limit = _ref6.limit,
      limit = _ref6$limit === void 0 ? 36 : _ref6$limit,
      uncollected = _ref6.uncollected;
    var query = new URLSearchParams({
      extended: 'full,images',
      page: String(page),
      limit: String(limit)
    });
    if (typeof uncollected !== 'undefined' && uncollected !== null) {
      var normalized = typeof uncollected === 'string' ? uncollected.toLowerCase().trim() : uncollected;
      if (normalized === true || normalized === 'true' || normalized === 1 || normalized === '1') {
        query.set('uncollected', 'true');
      } else if (normalized === false || normalized === 'false' || normalized === 0 || normalized === '0') {
        query.set('uncollected', 'false');
      }
    }
    return "/sync/watchlist/".concat(mediaType, "/").concat(sort, "?").concat(query.toString());
  }

  /* duplicate ensureHeaders removed */

  var api$1 = {
    addToHistory: addToHistory$1,
    watchlistSortFields: Array.from(WATCHLIST_SORT_FIELDS),
    watchlistVipSortFields: Array.from(WATCHLIST_VIP_SORT_FIELDS),
    normalizeWatchlistSort: normalizeWatchlistSort,
    isWatchlistVipSort: function isWatchlistVipSort() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return WATCHLIST_VIP_SORT_FIELDS.has((field || '').toString().trim().toLowerCase());
    },
    formatListsResults: function formatListsResults(items) {
      var likedListIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      try {
        return formatListCards(items, _objectSpread2({
          likedListIds: likedListIds
        }, options));
      } catch (error) {
        return {
          results: []
        };
      }
    },
    get: function get(url) {
      var unauthorized = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return requestApi('GET', url, {}, unauthorized);
    },
    // Normalize ids for watchlist/history operations.
    // Prefer params.ids when filled; fall back to tmdb_id/trakt_id when needed.
    recommendations: function recommendations() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var limit = options.limit || 36;
      var page = options.page || 1;
      var fetchLimit = limit * 5;
      var moviesRequest = requestApi('GET', buildRecommendationsUrl$1('movies', fetchLimit));
      var showsRequest = requestApi('GET', buildRecommendationsUrl$1('shows', fetchLimit));
      return Promise.allSettled([moviesRequest, showsRequest]).then(function (responses) {
        var moviesState = responses[0];
        var showsState = responses[1];
        var moviesResponse = moviesState && moviesState.status === 'fulfilled' && Array.isArray(moviesState.value) ? moviesState.value : [];
        var showsResponse = showsState && showsState.status === 'fulfilled' && Array.isArray(showsState.value) ? showsState.value : [];
        if (moviesState && moviesState.status === 'rejected') {
          logWarn('recommendations: movies request failed', moviesState.reason, {
            debugOnly: true
          });
        }
        if (showsState && showsState.status === 'rejected') {
          logWarn('recommendations: shows request failed', showsState.reason, {
            debugOnly: true
          });
        }
        var formattedMovies = moviesResponse.map(function (movie) {
          return {
            component: 'full',
            id: movie.ids.tmdb,
            ids: movie.ids,
            title: movie.title,
            original_title: movie.title,
            release_date: movie.year + '',
            vote_average: Number(movie.rating || 0),
            poster: getImageUrl(movie, 'poster'),
            method: 'movie',
            card_type: 'movie'
          };
        });
        var formattedShows = showsResponse.map(function (show) {
          return {
            component: 'full',
            id: show.ids.tmdb,
            ids: show.ids,
            title: show.title,
            original_title: show.title,
            original_name: show.original_title || show.title || '',
            release_date: show.year + '',
            vote_average: Number(show.rating || 0),
            poster: getImageUrl(show, 'poster'),
            type: 'tv',
            method: 'tv',
            card_type: 'tv'
          };
        });
        var combinedResults = [].concat(_toConsumableArray(formattedMovies), _toConsumableArray(formattedShows));
        if (!combinedResults.length) {
          if (moviesState.status === 'rejected' && showsState.status === 'rejected') {
            throw moviesState.reason || showsState.reason || new Error('Recommendations request failed');
          }
          return {
            results: [],
            total: 0,
            total_pages: 1,
            page: page
          };
        }
        for (var i = combinedResults.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var _ref7 = [combinedResults[j], combinedResults[i]];
          combinedResults[i] = _ref7[0];
          combinedResults[j] = _ref7[1];
        }
        var total = combinedResults.length;
        var total_pages = Math.max(1, Math.ceil(total / limit));
        var offset = (page - 1) * limit;
        var paginatedResults = combinedResults.slice(offset, offset + limit);
        return {
          results: paginatedResults,
          total: total,
          total_pages: total_pages,
          page: page
        };
      });
    },
    watchlist: function watchlist() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var page = Math.max(1, parseInt(params.page, 10) || 1);
      var limit = Math.max(1, parseInt(params.limit, 10) || 36);
      var sort = normalizeWatchlistSort(params.sort || params.watchlistSort);
      var mediaType = normalizeWatchlistMediaType(params.mediaType || params.watchlistType || params.type);
      var url = buildWatchlistUrl({
        mediaType: mediaType,
        sort: sort,
        page: page,
        limit: limit,
        uncollected: params.uncollected
      });
      return requestApi('GET', url, {}, false, 0, {
        withMeta: true
      }).then(function (response) {
        var payload = response && Array.isArray(response.data) ? response.data : [];
        var headers = response && response.headers ? response.headers : {};
        var formatted = formatTraktResults(payload);
        var pagination = resolveWatchlistPagination(headers, payload, page, limit);
        return {
          results: formatted.results || [],
          total: pagination.total,
          total_pages: pagination.total_pages,
          page: pagination.page,
          limit: pagination.limit
        };
      });
    },
    upnext: function upnext(params) {
      var requestedPage = Math.max(1, parseInt(params && params.page, 10) || 1);
      var requestedLimit = Math.max(1, parseInt(params && params.limit, 10) || 36);
      var query = new URLSearchParams({
        page: String(requestedPage),
        limit: String(requestedLimit)
      });
      var url = "/sync/progress/up_next_nitro?".concat(query.toString());
      return requestApi('GET', url, {}, false, 0, {
        withMeta: true
      }).then(function (response) {
        var payload = response && Array.isArray(response.data) ? response.data : [];
        var headers = response && response.headers ? response.headers : {};
        var mapped = payload.map(mapUpNextNitroItem).filter(Boolean);
        var bodyTotal = toNonNegativeInt$1(payload && payload[0] && payload[0].total_count);
        var fallbackTotal = bodyTotal !== null ? bodyTotal : (requestedPage - 1) * requestedLimit + mapped.length;
        var pagination = resolvePaginationFromHeaders(headers, {
          page: requestedPage,
          limit: requestedLimit,
          total: fallbackTotal
        });
        return {
          results: mapped,
          total: pagination.total,
          total_pages: pagination.total_pages,
          page: pagination.page,
          limit: pagination.limit
        };
      });
    },
    auth: {
      /**
       * Build Standard OAuth authorize URL
       * params: { redirect_uri, state?, signup?, prompt? }
       */
      startStandardOAuth: function startStandardOAuth() {
        var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          redirect_uri = _ref8.redirect_uri,
          state = _ref8.state,
          signup = _ref8.signup,
          prompt = _ref8.prompt;
        var base = "".concat(PROXY_BASE_URL, "/oauth/authorize");
        var qs = new URLSearchParams({
          redirect_uri: redirect_uri,
          response_type: 'code'
        });
        if (state) qs.set('state', state);
        if (typeof signup !== 'undefined') qs.set('signup', String(signup));
        if (prompt) qs.set('prompt', prompt);
        return base + '?' + qs.toString();
      },
      /**
       * Exchange authorization code for tokens
       * Body: { code, redirect_uri, grant_type: 'authorization_code' }
       * unauthorized = true
       */
      exchangeCode: function exchangeCode(_ref9) {
        var code = _ref9.code,
          redirect_uri = _ref9.redirect_uri;
        return requestApi('POST', '/oauth/token', {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        }, true).then(function (res) {
          if (res && res.access_token) {
            saveTokens(res);
          }
          return res;
        })["catch"](function (error) {
          if (error && error.status === 400) {
            setAuthBlocked('oauth_exchange_failed_400');
          }
          throw error;
        });
      },
      /**
       * Refresh tokens using refresh_token
       * unauthorized = true
       */
      refresh: function refresh() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return runRefreshFlow(_objectSpread2({
          reason: 'manual-refresh'
        }, options));
      },
      ensureValid: function ensureValid() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return ensureValidAccessToken(options);
      },
      storeTokens: function storeTokens() {
        var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        saveTokens(response);
        return response;
      },
      clear: function clear() {
        clearAuthBlocked();
        clearAuthStorage();
      },
      /**
       * Revoke token best-effort
       * unauthorized = true
       */
      revoke: function revoke(_ref0) {
        var token = _ref0.token;
        return requestApi('POST', '/oauth/revoke', {
          token: token
        }, true);
      },
      device: {
        /**
         * Device OAuth: start
         */
        login: function login() {
          var url = '/oauth/device/code';
          return rlWaitForSlot(url).then(function () {
            return _performRequest('POST', url, {}, true);
          }).then(function (res) {
            rlRecordRequest(url, 200);
            return res;
          })["catch"](function (error) {
            rlRecordRequest(url, Number(error && error.status) || 0);
            throw error;
          });
        },
        /**
         * Device OAuth: poll token
         * unauthorized = true
         */
        poll: function poll(device_code) {
          var url = '/oauth/device/token';
          return rlWaitForSlot(url).then(function () {
            return _performRequest('POST', url, {
              code: device_code
            }, true);
          }).then(function (response) {
            rlRecordRequest(url, 200);
            if (response && response.access_token) {
              saveTokens(response);
            }
            return response;
          })["catch"](function (error) {
            var status = Number(error && error.status) || 0;
            rlRecordRequest(url, status);
            if (status === 429) {
              var retryAfterSec = parseRetryAfterMs$1(error && error.headers ? error.headers : {});
              rlEnterCooldown(retryAfterSec ? Math.round(retryAfterSec / 1000) : undefined);
              logWarn('Trakt rate limit on device auth, global cooldown entered', {
                cooldownMs: rlGetCooldownRemainingMs()
              }, {
                debugOnly: true
              });
            }
            if (error && status === 400) {
              var payload = error && error.response;
              var code = payload && _typeof(payload) === 'object' ? String(payload.error || payload.error_code || '').toLowerCase() : '';
              if (code && code !== 'authorization_pending') {
                setAuthBlocked("device_poll_failed_".concat(code));
              }
            }
            throw error;
          });
        }
      },
      logout: function logout() {
        clearAuthBlocked();
        clearAuthStorage();
      }
    },
    addToWatchlist: function addToWatchlist(params) {
      return requestApi('POST', '/sync/watchlist', buildSyncPayload(params));
    },
    removeFromWatchlist: function removeFromWatchlist(params) {
      return requestApi('POST', '/sync/watchlist/remove', buildSyncPayload(params));
    },
    inWatchlist: function inWatchlist(params) {
      var type = normalizeMediaType(params) === 'movie' ? 'movies' : 'shows';
      var ids = resolveTraktIds(params);
      return requestApi('GET', "/sync/watchlist/".concat(type, "?extended=full")).then(function (response) {
        var found = (Array.isArray(response) ? response : []).find(function (item) {
          var entity = extractMediaFromSyncItem(item);
          return entity.media && sameAnyId(entity.media.ids || {}, ids);
        });
        return !!found;
      });
    },
    inHistory: function inHistory(params) {
      var type = normalizeMediaType(params) === 'movie' ? 'movies' : 'shows';
      var ids = resolveTraktIds(params);
      return requestApi('GET', "/sync/history/".concat(type, "?extended=full")).then(function (response) {
        var found = (Array.isArray(response) ? response : []).find(function (item) {
          var entity = extractMediaFromSyncItem(item);
          return entity.media && sameAnyId(entity.media.ids || {}, ids);
        });
        return !!found;
      });
    },
    // liked lists (read-only)
    likesLists: function likesLists() {
      var _this = this;
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var page = params.page || 1;
      var limit = params.limit || 36;
      return requestApi('GET', "/users/me/likes/lists?limit=".concat(limit, "&page=").concat(page, "&extended=images")).then(function (response) {
        var raw = Array.isArray(response) ? response : [];
        var likedListIds = raw.map(function (item) {
          var _item$list;
          return item === null || item === void 0 || (_item$list = item.list) === null || _item$list === void 0 || (_item$list = _item$list.ids) === null || _item$list === void 0 ? void 0 : _item$list.trakt;
        }).filter(Boolean);
        var formatted = _this.formatListsResults(raw, likedListIds, {
          wide: false,
          canManage: false
        });
        var pageMeta = makePaginationMeta(raw, page, limit);
        formatted.total = pageMeta.total;
        formatted.total_pages = pageMeta.total_pages;
        formatted.page = page;
        return formatted;
      });
    },
    // alias for backward compatibility
    lists: function lists() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.likesLists(params);
    },
    // personal lists (CRUD enabled)
    myLists: function myLists() {
      var _this2 = this;
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var page = params.page || 1;
      var limit = params.limit || 36;
      return requestApi('GET', "/users/me/lists?limit=".concat(limit, "&page=").concat(page, "&extended=images")).then(function (response) {
        var raw = Array.isArray(response) ? response : [];
        var formatted = _this2.formatListsResults(raw, [], {
          wide: true,
          canManage: true
        });
        var pageMeta = makePaginationMeta(raw, page, limit);
        formatted.total = pageMeta.total;
        formatted.total_pages = pageMeta.total_pages;
        formatted.page = page;
        return formatted;
      });
    },
    myList: function myList() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var listId = params.listId || params.id;
      if (!listId) return Promise.reject(new Error('List ID is missing'));
      return requestApi('GET', "/users/me/lists/".concat(encodeURIComponent(listId), "?extended=images")).then(function (response) {
        return normalizeListCardData(response, {
          wide: true,
          canManage: true
        });
      });
    },
    createList: function createList() {
      var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var body = sanitizeListPayload(payload);
      if (!body.name) return Promise.reject(new Error('List name is missing'));
      if (!body.privacy) body.privacy = 'private';
      return requestApi('POST', '/users/me/lists', body);
    },
    updateList: function updateList() {
      var _ref1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        listId = _ref1.listId,
        payload = _ref1.payload;
      if (!listId) return Promise.reject(new Error('List ID is missing'));
      var body = sanitizeListPayload(payload);
      if (!body.name) return Promise.reject(new Error('List name is missing'));
      return requestApi('PUT', "/users/me/lists/".concat(encodeURIComponent(listId)), body);
    },
    deleteList: function deleteList() {
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        listId = _ref10.listId;
      if (!listId) return Promise.reject(new Error('List ID is missing'));
      return requestApi('DELETE', "/users/me/lists/".concat(encodeURIComponent(listId)));
    },
    addToList: function addToList() {
      var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        listId = _ref11.listId,
        item = _ref11.item;
      if (!listId) return Promise.reject(new Error('List ID is missing'));
      return requestApi('POST', "/users/me/lists/".concat(encodeURIComponent(listId), "/items"), buildSyncPayload(item || {}));
    },
    removeFromList: function removeFromList() {
      var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        listId = _ref12.listId,
        item = _ref12.item;
      if (!listId) return Promise.reject(new Error('List ID is missing'));
      return requestApi('POST', "/users/me/lists/".concat(encodeURIComponent(listId), "/items/remove"), buildSyncPayload(item || {}));
    },
    myListItems: function myListItems() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var listId = params.listId || params.id;
      var page = params.page || 1;
      var limit = params.limit || 36;
      if (!listId) return Promise.reject(new Error('List ID is missing'));
      var url = "/users/me/lists/".concat(encodeURIComponent(listId), "/items?extended=full,images&page=").concat(page, "&limit=").concat(limit);
      return requestApi('GET', url).then(function (response) {
        var raw = Array.isArray(response) ? response : [];
        var formatted = formatTraktResults(raw);
        var pageMeta = makePaginationMeta(raw, page, limit);
        formatted.total = pageMeta.total;
        formatted.total_pages = pageMeta.total_pages;
        formatted.page = page;
        return formatted;
      });
    },
    inList: function inList() {
      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        listId = _ref13.listId,
        item = _ref13.item,
        _ref13$limit = _ref13.limit,
        limit = _ref13$limit === void 0 ? 100 : _ref13$limit,
        _ref13$maxPages = _ref13.maxPages,
        maxPages = _ref13$maxPages === void 0 ? 10 : _ref13$maxPages;
      if (!listId) return Promise.reject(new Error('List ID is missing'));
      var ids = resolveTraktIds(item || {});
      if (!Object.keys(ids).length) return Promise.resolve(false);
      var page = 1;
      var _checkPage = function checkPage() {
        var url = "/users/me/lists/".concat(encodeURIComponent(listId), "/items?extended=images&page=").concat(page, "&limit=").concat(limit);
        return requestApi('GET', url).then(function (response) {
          var raw = Array.isArray(response) ? response : [];
          var found = raw.some(function (entry) {
            var entity = extractMediaFromSyncItem(entry);
            return entity.media && sameAnyId(entity.media.ids || {}, ids);
          });
          if (found) return true;
          if (!raw.length || raw.length < limit || page >= maxPages) return false;
          page += 1;
          return _checkPage();
        });
      };
      return _checkPage();
    },
    // public list detail (liked/shared)
    list: function list() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var listId = params.id || params.list_id || params.listId;
      var page = params.page || 1;
      var limit = params.limit || 36;
      if (!listId) {
        return Promise.reject(new Error('List ID is missing'));
      }
      var url = "/lists/".concat(encodeURIComponent(listId), "/items?extended=full,images&page=").concat(page, "&limit=").concat(limit);
      return requestApi('GET', url).then(function (response) {
        var raw = Array.isArray(response) ? response : [];
        var formatted = formatTraktResults(raw);
        var pageMeta = makePaginationMeta(raw, page, limit);
        formatted.total = pageMeta.total;
        formatted.total_pages = pageMeta.total_pages;
        formatted.page = page;
        return formatted;
      });
    },
    // Новий метод для отримання списків, пов'язаних з медіа (фільмом або серіалом)
    getMediaLists: function getMediaLists(params) {
      return new Promise(function (resolve, reject) {
        var tmdbId = params.id;
        var mediaType = params.method; // 'movie' or 'show'

        if (!tmdbId || !mediaType) {
          reject(new Error('Media ID or type is missing'));
          return;
        }

        // Спочатку отримуємо Trakt ID за TMDB ID
        requestApi('GET', "/search/tmdb/".concat(tmdbId, "?type=").concat(mediaType)).then(function (searchResponse) {
          var traktId = null;
          if (searchResponse && searchResponse.length > 0) {
            if (mediaType === 'movie' && searchResponse[0].movie) {
              traktId = searchResponse[0].movie.ids.trakt;
            } else if (mediaType === 'show' && searchResponse[0].show) {
              traktId = searchResponse[0].show.ids.trakt;
            }
          }
          if (!traktId) {
            reject(new Error("Trakt ID not found for TMDB ID: ".concat(tmdbId)));
            return;
          }
          var url = '';
          if (mediaType === 'movie') {
            url = "/movies/".concat(traktId, "/lists");
          } else if (mediaType === 'show') {
            url = "/shows/".concat(traktId, "/lists");
          }
          requestApi('GET', url).then(function (response) {
            var formattedData = api$1.formatListsResults(response);
            resolve(formattedData.results);
          })["catch"](function (error) {
            reject(error);
          });
        })["catch"](function (error) {
          reject(error);
        });
      });
    },
    dvdCalendar: function dvdCalendar() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var limit = Math.max(1, parseInt(params.limit, 10) || 36);
      var page = Math.max(1, parseInt(params.page, 10) || 1);
      var now = new Date();
      var startDate = new Date(now);
      startDate.setDate(now.getDate() - 3);
      var yyyy = startDate.getFullYear();
      var mm = String(startDate.getMonth() + 1).padStart(2, '0');
      var dd = String(startDate.getDate()).padStart(2, '0');
      var dateString = "".concat(yyyy, "-").concat(mm, "-").concat(dd);
      var days = 31;
      var url = "/calendars/my/dvd/".concat(dateString, "/").concat(days, "?extended=full,images");
      return requestApi('GET', url).then(function (response) {
        var raw = Array.isArray(response) ? response : [];
        var formatted = formatTraktResults(raw);
        var total = raw.length;
        return {
          results: formatted.results || [],
          total: total,
          total_pages: Math.max(1, Math.ceil(total / limit)),
          page: page
        };
      });
    },
    calendar: function calendar() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var limit = Math.max(1, parseInt(params.limit, 10) || 36);
      var page = Math.max(1, parseInt(params.page, 10) || 1);

      // Calculate date range: 3 days ago to 3 days ahead (7 days total)
      var now = new Date();
      var startDate = new Date(now);
      startDate.setDate(now.getDate() - 3);
      var yyyy = startDate.getFullYear();
      var mm = String(startDate.getMonth() + 1).padStart(2, '0');
      var dd = String(startDate.getDate()).padStart(2, '0');
      var dateString = "".concat(yyyy, "-").concat(mm, "-").concat(dd);
      var days = 7;
      var url = "/calendars/my/shows/".concat(dateString, "/").concat(days, "?extended=full,images");
      return requestApi('GET', url).then(function (response) {
        var raw = Array.isArray(response) ? response : [];

        // Group by show TMDB ID to deduplicate
        var showMap = {};
        raw.forEach(function (item) {
          var show = item && item.show;
          var episode = item && item.episode;
          if (!show || !show.ids) return;
          var tmdbId = show.ids.tmdb;
          if (!tmdbId) return;
          if (!showMap[tmdbId]) {
            showMap[tmdbId] = {
              show: show,
              first_aired: item.first_aired,
              episode: episode
            };
          }
        });
        var shows = Object.values(showMap);

        // Shuffle for variety
        for (var i = shows.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var _ref14 = [shows[j], shows[i]];
          shows[i] = _ref14[0];
          shows[j] = _ref14[1];
        }
        var total = shows.length;
        var offset = (page - 1) * limit;
        var paginated = shows.slice(offset, offset + limit);
        var results = paginated.map(function (_ref15) {
          var show = _ref15.show,
            first_aired = _ref15.first_aired,
            episode = _ref15.episode;
          var releaseDate = first_aired ? String(first_aired).slice(0, 10) : show.year ? String(show.year) : '';
          return {
            component: 'full',
            id: show.ids.tmdb,
            ids: show.ids,
            title: show.title,
            original_title: show.title,
            original_name: show.title,
            name: show.title,
            release_date: releaseDate,
            vote_average: Number(show.rating || 0),
            poster: getImageUrl(show, 'poster'),
            image: getImageUrl(show, 'fanart'),
            method: 'tv',
            type: 'tv',
            card_type: 'tv',
            source: 'tmdb',
            season: episode ? episode.season : null,
            episode: episode ? episode.number : null,
            episode_title: episode ? episode.title : null,
            air_date: releaseDate
          };
        });
        return {
          results: results,
          total: total,
          total_pages: Math.max(1, Math.ceil(total / limit)),
          page: page
        };
      });
    },
    scrobble: function scrobble(method, data) {
      return requestApi('POST', "/scrobble/".concat(method), data, false, 0, {
        cache: false
      });
    },
    getPlaybackProgress: function getPlaybackProgress() {
      return requestApi('GET', '/sync/playback');
    }
  };

  // Local safe resolver for Api to support runtime-scoped execution (e.g., dev/trakt.js)
  var Api$2 = typeof api$1 !== 'undefined' && api$1 || window.TraktTV && window.TraktTV.api || null;
  var API_MISSING_LOG_KEY$2 = 'component-main:api-missing';
  function logApiMissing$1() {
    logDebugOnce(API_MISSING_LOG_KEY$2, 'API bridge is unavailable in component/main');
  }

  // Version check for Lampa 3.0+ modular system
  var isLampa3 = window.Lampa && window.Lampa.Manifest && window.Lampa.Manifest.app_digital >= 300;
  var DEFAULT_WATCHLIST_SORT = 'added/desc';
  var DEFAULT_WATCHLIST_SORT_FIELDS = ['rank', 'added', 'title', 'released', 'runtime', 'popularity', 'random', 'percentage', 'imdb_rating', 'tmdb_rating', 'rt_tomatometer', 'rt_audience', 'metascore', 'votes', 'imdb_votes', 'tmdb_votes', 'my_rating', 'watched', 'collected'];
  var DEFAULT_WATCHLIST_QUICK_SORT_FIELDS = ['added', 'rank', 'released'];
  var DEFAULT_WATCHLIST_VIP_SORT_FIELDS = ['imdb_rating', 'tmdb_rating', 'rt_tomatometer', 'rt_audience', 'metascore', 'votes', 'imdb_votes', 'tmdb_votes'];
  var WATCHLIST_SORT_LABELS = {
    rank: {
      key: 'trakttv_watchlist_sort_rank',
      fallback: 'Rank'
    },
    added: {
      key: 'trakttv_watchlist_sort_added',
      fallback: 'Added'
    },
    title: {
      key: 'trakttv_watchlist_sort_title',
      fallback: 'Title'
    },
    released: {
      key: 'trakttv_watchlist_sort_released',
      fallback: 'Released'
    },
    runtime: {
      key: 'trakttv_watchlist_sort_runtime',
      fallback: 'Runtime'
    },
    popularity: {
      key: 'trakttv_watchlist_sort_popularity',
      fallback: 'Popularity'
    },
    random: {
      key: 'trakttv_watchlist_sort_random',
      fallback: 'Random'
    },
    percentage: {
      key: 'trakttv_watchlist_sort_percentage',
      fallback: 'Percentage'
    },
    imdb_rating: {
      key: 'trakttv_watchlist_sort_imdb_rating',
      fallback: 'IMDb rating'
    },
    tmdb_rating: {
      key: 'trakttv_watchlist_sort_tmdb_rating',
      fallback: 'TMDB rating'
    },
    rt_tomatometer: {
      key: 'trakttv_watchlist_sort_rt_tomatometer',
      fallback: 'RT Tomatometer'
    },
    rt_audience: {
      key: 'trakttv_watchlist_sort_rt_audience',
      fallback: 'RT Audience'
    },
    metascore: {
      key: 'trakttv_watchlist_sort_metascore',
      fallback: 'Metascore'
    },
    votes: {
      key: 'trakttv_watchlist_sort_votes',
      fallback: 'Votes'
    },
    imdb_votes: {
      key: 'trakttv_watchlist_sort_imdb_votes',
      fallback: 'IMDb votes'
    },
    tmdb_votes: {
      key: 'trakttv_watchlist_sort_tmdb_votes',
      fallback: 'TMDB votes'
    },
    my_rating: {
      key: 'trakttv_watchlist_sort_my_rating',
      fallback: 'My rating'
    },
    watched: {
      key: 'trakttv_watchlist_sort_watched',
      fallback: 'Watched'
    },
    collected: {
      key: 'trakttv_watchlist_sort_collected',
      fallback: 'Collected'
    }
  };
  var traktVipStatusCache = null;
  var traktVipStatusPromise = null;
  function resolveUpnextProgress$1() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var watched = Number(element.trakt_upnext_watched);
    var total = Number(element.trakt_upnext_total);
    var text = (element.trakt_upnext_progress || '').toString().trim();
    var safeWatched = Number.isFinite(watched) ? watched : 0;
    var safeTotal = Number.isFinite(total) ? total : 0;
    if (!text && safeTotal > 0) {
      text = "".concat(safeWatched, "/").concat(safeTotal);
    }
    if ((!safeWatched || !safeTotal) && text.indexOf('/') > -1) {
      var parts = text.split('/');
      var parsedWatched = Number(parts[0]);
      var parsedTotal = Number(parts[1]);
      if (Number.isFinite(parsedWatched) && parsedWatched >= 0) safeWatched = parsedWatched;
      if (Number.isFinite(parsedTotal) && parsedTotal > 0) safeTotal = parsedTotal;
    }
    if (!text) return null;
    var percent = safeTotal > 0 ? Math.max(0, Math.min(100, Math.round(safeWatched / safeTotal * 100))) : null;
    return {
      text: text,
      percent: percent
    };
  }
  function renderUpnextCardWatched(card, element) {
    var progress = resolveUpnextProgress$1(element || {});
    if (!progress) return;
    var cardNode = card && typeof card.render === 'function' ? card.render(true) : null;
    var cardView = cardNode && cardNode.querySelector ? cardNode.querySelector('.card__view') : null;
    if (!cardView) return;
    var wrap = cardView.querySelector('.card-watched.trakt-upnext-watched');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'card-watched trakt-upnext-watched';
      wrap.innerHTML = '<div class="card-watched__inner"><div class="card-watched__body"></div></div>';
      cardView.insertBefore(wrap, cardView.firstChild);
    }
    var body = wrap.querySelector('.card-watched__body');
    if (!body) return;
    var row = body.querySelector('.card-watched__item.trakt-upnext-watched__item');
    if (!row) {
      row = document.createElement('div');
      row.className = 'card-watched__item trakt-upnext-watched__item';
      row.innerHTML = '<span></span><div class="time-line"><div></div></div>';
      body.innerHTML = '';
      body.appendChild(row);
    }
    var title = row.querySelector('span');
    if (title) title.textContent = progress.text;
    var bar = row.querySelector('.time-line > div');
    if (bar) bar.style.width = "".concat(progress.percent || 0, "%");
  }
  function renderTvTypeBadge(card, element) {
    if (!element || element.method !== 'tv' && element.type !== 'show') return;
    var cardNode = card && typeof card.render === 'function' ? card.render(true) : null;
    var cardView = cardNode && cardNode.querySelector ? cardNode.querySelector('.card__view') : null;
    if (!cardNode || !cardView) return;
    cardNode.classList.add('card--tv');
    if (!cardView.querySelector('.card__type')) {
      var type = document.createElement('div');
      type.className = 'card__type';
      type.textContent = Lampa.Lang.translate('trakttv_card_type_tv');
      cardView.appendChild(type);
    }
  }
  function baseComponent(object, type) {
    var comp;
    var total_pages = 0;
    var waitload = false;

    // Use modular system for Lampa 3.0+, fallback to old system for compatibility
    if (isLampa3 && Lampa.Maker) {
      comp = Lampa.Maker.make('Category', object);
      comp.use({
        onCreate: function onCreate() {
          var _this = this;
          var params = _objectSpread2({}, object);
          if ((type === 'list' || type === 'myListItems') && object.id) {
            params.id = object.id;
          } else if ((type === 'list' || type === 'myListItems') && object.list_id) {
            params.id = object.list_id;
          }
          params.limit = 36;
          params.page = params.page || 1;
          if (!Api$2) {
            logApiMissing$1();
            this.empty();
            if (this.activity) this.activity.loader(false);
            return;
          }
          Api$2[type](params).then(function (data) {
            if (data && data.total_pages) {
              total_pages = data.total_pages;
            }
            _this.build(data && _typeof(data) === 'object' && Array.isArray(data.results) ? data : {
              results: []
            });
          })["catch"](function () {
            _this.empty();
            if (_this.activity) _this.activity.loader(false);
          });
        },
        onNext: function onNext(resolve, reject) {
          var _this2 = this;
          if (waitload) {
            reject.call(this);
            return;
          }
          if (object.page <= total_pages) {
            waitload = true;
            object.page++;
            var params = _objectSpread2({}, object);
            if ((type === 'list' || type === 'myListItems') && object.id) {
              params.id = object.id;
            } else if ((type === 'list' || type === 'myListItems') && object.list_id) {
              params.id = object.list_id;
            }
            params.limit = 36;
            if (!Api$2) {
              waitload = false;
              reject.call(this);
              return;
            }
            Api$2[type](params).then(function (data) {
              if (data && data.total_pages) {
                total_pages = data.total_pages;
                _this2.total_pages = data.total_pages;
              }
              resolve.call(_this2, data && _typeof(data) === 'object' && Array.isArray(data.results) ? data : {
                results: []
              });
              waitload = false;
            })["catch"](function () {
              waitload = false;
              reject.call(_this2);
            });
          } else {
            reject.call(this);
          }
        },
        onController: function onController(controller) {
          if (type === 'watchlist' && object && typeof object.onHead === 'function') {
            controller.up = function () {
              if (Navigator.canmove('up')) Navigator.move('up');else object.onHead();
            };
          }
        },
        onEmpty: function onEmpty() {
          if (type !== 'watchlist' || !object || typeof object.onHead !== 'function') return;
          if (!this.empty_class || typeof this.empty_class.use !== 'function') return;
          this.empty_class.use({
            onController: function onController(controller) {
              controller.up = function () {
                if (Navigator.canmove('up')) Navigator.move('up');else object.onHead();
              };
            }
          });
        },
        onInstance: function onInstance(card, element) {
          card.use({
            onCreate: function onCreate() {
              renderTvTypeBadge(this, element);
              if (type === 'upnext') {
                renderUpnextCardWatched(this, element);
              }
            }
          });
          card.use({
            onlyMenu: false,
            onlyEnter: function onlyEnter() {
              Lampa.Activity.push(this.data);
            },
            onLong: function onLong() {
              if (type === 'myListItems' && object && object.can_manage && object.id) {
                openMyListItemActions(object, element);
              }
            }
          });
        }
      });
    } else {
      // Backward compatibility for Lampa < 3.0
      comp = new Lampa.InteractionCategory(object);
      comp.create = function () {
        var _this3 = this;
        var params = _objectSpread2({}, object);
        if ((type === 'list' || type === 'myListItems') && object.id) {
          params.id = object.id;
        } else if ((type === 'list' || type === 'myListItems') && object.list_id) {
          params.id = object.list_id;
        }
        params.limit = 36;
        params.page = params.page || 1;
        if (!Api$2) {
          logApiMissing$1();
          return;
        }
        Api$2[type](params).then(function (data) {
          if (data && data.total_pages) {
            total_pages = data.total_pages;
          }
          _this3.build(data && _typeof(data) === 'object' && Array.isArray(data.results) ? data : {
            results: []
          });
          if (_this3.activity.scroll) {
            _this3.activity.scroll.onEnd = _this3.next.bind(_this3);
          }
        })["catch"](function () {
          _this3.empty();
          if (_this3.activity) _this3.activity.loader(false);
        });
      };
      comp.next = function () {
        var _this4 = this;
        if (waitload) return;
        if (object.page < total_pages) {
          waitload = true;
          object.page++;
          var params = _objectSpread2({}, object);
          if ((type === 'list' || type === 'myListItems') && object.id) {
            params.id = object.id;
          } else if ((type === 'list' || type === 'myListItems') && object.list_id) {
            params.id = object.list_id;
          }
          params.limit = 36;
          if (!Api$2) {
            logApiMissing$1();
            return;
          }
          Api$2[type](params).then(function (data) {
            if (data && data.total_pages) {
              total_pages = data.total_pages;
            }
            _this4.append(data && _typeof(data) === 'object' && Array.isArray(data.results) ? data : {
              results: []
            });
            waitload = false;
          })["catch"](function () {
            waitload = false;
          });
        }
      };
      comp.cardRender = function (_, element, card) {
        renderTvTypeBadge(card, element);
        if (type === 'upnext') {
          renderUpnextCardWatched(card, element);
        }
        card.onMenu = type === 'myListItems' && object && object.can_manage && object.id ? function () {
          return openMyListItemActions(object, element);
        } : false;
        card.onEnter = function () {
          Lampa.Activity.push(card.data);
        };
      };
    }
    return comp;
  }
  function baseRecommendations(object) {
    var comp;
    var total_pages = 0;
    var waitload = false;

    // Use modular system for Lampa 3.0+, fallback to old system for compatibility
    if (isLampa3 && Lampa.Maker) {
      comp = Lampa.Maker.make('Category', object);
      comp.use({
        onCreate: function onCreate() {
          var _this5 = this;
          var params = _objectSpread2({}, object);
          params.limit = 36;
          params.page = params.page || 1;
          if (!Api$2) {
            logApiMissing$1();
            this.empty();
            if (this.activity) this.activity.loader(false);
            return;
          }
          Api$2.recommendations(params).then(function (recommendations) {
            _this5.build(recommendations && _typeof(recommendations) === 'object' && Array.isArray(recommendations.results) ? recommendations : {
              results: []
            });
            if (recommendations && recommendations.total_pages) {
              total_pages = recommendations.total_pages;
            }
          })["catch"](function () {
            _this5.empty();
            if (_this5.activity) _this5.activity.loader(false);
          });
        },
        onNext: function onNext(resolve, reject) {
          var _this6 = this;
          if (waitload) {
            reject.call(this);
            return;
          }
          if (object.page <= total_pages) {
            waitload = true;
            object.page++;
            var params = _objectSpread2({}, object);
            params.limit = 36;
            if (!Api$2) {
              waitload = false;
              reject.call(this);
              return;
            }
            Api$2.recommendations(params).then(function (data) {
              if (data && data.total_pages) {
                total_pages = data.total_pages;
                _this6.total_pages = data.total_pages;
              }
              resolve.call(_this6, data && _typeof(data) === 'object' && Array.isArray(data.results) ? data : {
                results: []
              });
              waitload = false;
            })["catch"](function () {
              waitload = false;
              reject.call(_this6);
            });
          } else {
            reject.call(this);
          }
        },
        onInstance: function onInstance(card, element) {
          renderTvTypeBadge(card, element);
          card.use({
            onlyMenu: false,
            onlyEnter: function onlyEnter() {
              Lampa.Activity.push({
                url: '',
                component: 'full',
                id: element.id,
                method: element.method,
                card: this.data,
                source: 'tmdb'
              });
            }
          });
        }
      });
    } else {
      // Backward compatibility for Lampa < 3.0
      comp = new Lampa.InteractionCategory(object);
      comp.create = function () {
        var _this7 = this;
        var params = _objectSpread2({}, object);
        params.limit = 36;
        params.page = params.page || 1;
        if (!Api$2) {
          logApiMissing$1();
          return;
        }
        Api$2.recommendations(params).then(function (recommendations) {
          _this7.build(recommendations && _typeof(recommendations) === 'object' && Array.isArray(recommendations.results) ? recommendations : {
            results: []
          });
          if (recommendations && recommendations.total_pages) {
            total_pages = recommendations.total_pages;
          }
          if (_this7.activity.scroll) {
            _this7.activity.scroll.onEnd = _this7.next.bind(_this7);
          }
        })["catch"](function () {
          _this7.empty();
          if (_this7.activity) _this7.activity.loader(false);
        });
      };
      comp.next = function () {
        var _this8 = this;
        if (waitload) return;
        if (object.page < total_pages) {
          waitload = true;
          object.page++;
          var params = _objectSpread2({}, object);
          params.limit = 36;
          if (!Api$2) {
            logApiMissing$1();
            return;
          }
          Api$2.recommendations(params).then(function (data) {
            if (data && data.total_pages) {
              total_pages = data.total_pages;
            }
            _this8.append(data && _typeof(data) === 'object' && Array.isArray(data.results) ? data : {
              results: []
            });
            waitload = false;
          })["catch"](function () {
            waitload = false;
          });
        }
      };
      comp.cardRender = function (object, element, card) {
        renderTvTypeBadge(card, element);
        card.onMenu = false;
        card.onEnter = function () {
          Lampa.Activity.push({
            url: '',
            component: 'full',
            id: element.id,
            method: element.method,
            card: card,
            source: 'tmdb'
          });
        };
      };
    }
    return comp;
  }
  function t$3(key) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    try {
      var translated = Lampa.Lang.translate(key);
      return translated || fallback || key;
    } catch (e) {
      return fallback || key;
    }
  }
  function notify$1(text) {
    Lampa.Bell.push({
      text: text
    });
  }
  function getListName() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (element.list_title || element.title || element.name || '').trim();
  }
  function restoreContentController() {
    setTimeout(function () {
      if (Lampa && Lampa.Controller) Lampa.Controller.toggle('content');
    }, 0);
  }
  function formatNamedListTitle(name, itemCount) {
    var safeName = (name || '').trim();
    var hasCount = typeof itemCount === 'number' && itemCount >= 0;
    if (safeName && hasCount) return "".concat(safeName, " (").concat(itemCount, ")");
    if (safeName) return safeName;
    return t$3('trakt_list_detail', 'List Content');
  }
  function refreshActivity(object, component) {
    if (!Lampa || !Lampa.Activity || typeof Lampa.Activity.replace !== 'function') return;
    var next = _objectSpread2(_objectSpread2({}, object), {}, {
      component: component || object.component,
      page: 1,
      refresh: Date.now()
    });
    Lampa.Activity.replace(next);
  }
  function refreshMyListsAfterCreate(activityObject, createdList) {
    var listId = createdList && createdList.ids ? createdList.ids.trakt || createdList.id : createdList && createdList.id;
    var maxAttempts = 8;
    var delayMs = 900;
    if (!Api$2 || !listId) {
      refreshActivity(activityObject, 'trakt_my_lists');
      return;
    }
    var _attempt = function attempt(index) {
      Api$2.myLists({
        page: 1,
        limit: 100
      }).then(function (data) {
        var results = data && Array.isArray(data.results) ? data.results : [];
        var found = results.some(function (item) {
          return String(item.id) === String(listId);
        });
        if (found || index >= maxAttempts) {
          refreshActivity(activityObject, 'trakt_my_lists');
          return;
        }
        setTimeout(function () {
          return _attempt(index + 1);
        }, delayMs);
      })["catch"](function () {
        if (index >= maxAttempts) {
          refreshActivity(activityObject, 'trakt_my_lists');
          return;
        }
        setTimeout(function () {
          return _attempt(index + 1);
        }, delayMs);
      });
    };
    _attempt(1);
  }
  function refreshMyListsAfterDelete(activityObject, deletedListId) {
    var listId = deletedListId;
    var maxAttempts = 8;
    var delayMs = 900;
    if (!Api$2 || !listId) {
      refreshActivity(activityObject, 'trakt_my_lists');
      return;
    }
    var _attempt2 = function attempt(index) {
      Api$2.myLists({
        page: 1,
        limit: 100
      }).then(function (data) {
        var results = data && Array.isArray(data.results) ? data.results : [];
        var stillExists = results.some(function (item) {
          return String(item.id) === String(listId);
        });
        if (!stillExists || index >= maxAttempts) {
          refreshActivity(activityObject, 'trakt_my_lists');
          return;
        }
        setTimeout(function () {
          return _attempt2(index + 1);
        }, delayMs);
      })["catch"](function () {
        if (index >= maxAttempts) {
          refreshActivity(activityObject, 'trakt_my_lists');
          return;
        }
        setTimeout(function () {
          return _attempt2(index + 1);
        }, delayMs);
      });
    };
    _attempt2(1);
  }
  function showApiError(error) {
    var fallbackKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'trakt_list_action_error';
    var status = error && error.status;
    var message = t$3(fallbackKey, 'Trakt request failed');
    if (status === 420) message = t$3('trakt_list_limit_reached', 'List limit reached');else if (status === 409) message = t$3('trakt_list_conflict', 'Conflict while updating list');else if (status === 401 || status === 403) message = t$3('trakttvAuthMissed', 'Not logged');
    notify$1(message);
    logError('List API request failed', {
      status: status,
      error: error
    }, {
      debugOnly: true
    });
  }
  function buildCreateListCard() {
    return {
      id: '__trakt_create_list__',
      title: t$3('trakt_list_create_short', 'Create'),
      description: '',
      overview: '',
      method: 'list',
      can_manage: true,
      is_create_action: true,
      cover: './img/img_load.svg',
      poster: './img/img_load.svg',
      params: {
        style: {
          name: 'wide'
        }
      }
    };
  }
  function withCreateListAction(data, page) {
    if (page !== 1) return data;
    var normalized = data && _typeof(data) === 'object' && Array.isArray(data.results) ? _objectSpread2(_objectSpread2({}, data), {}, {
      results: data.results.slice()
    }) : {
      results: []
    };
    normalized.results.unshift(buildCreateListCard());
    return normalized;
  }
  function openListDetail(element) {
    var componentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'trakt_list_detail';
    var listName = getListName(element);
    Lampa.Activity.push({
      url: '',
      title: formatNamedListTitle(listName, element.item_count),
      component: componentName,
      id: element.id,
      list_id: element.id,
      name: listName,
      description: element.description,
      privacy: element.privacy,
      can_manage: !!element.can_manage,
      page: 1,
      source: 'tmdb'
    });
  }
  function openListEditor(list, onSubmit) {
    var source = list || {};
    var defaultName = source.list_title || source.title || source.name || '';
    var defaultDescription = source.description || '';
    var defaultPrivacy = source.privacy || 'private';
    Lampa.Input.edit({
      title: t$3('trakt_list_name_input', 'List name'),
      value: defaultName,
      free: true,
      nosave: true,
      nomic: true
    }, function (nameValue) {
      restoreContentController();
      var name = (nameValue || '').trim();
      if (!name) {
        notify$1(t$3('trakt_list_name_required', 'List name is required'));
        return;
      }
      onSubmit({
        name: name,
        description: defaultDescription,
        privacy: defaultPrivacy,
        display_numbers: !!source.display_numbers,
        allow_comments: !!source.allow_comments
      });
    });
  }
  function createMyList(activityObject) {
    if (!Api$2) return;
    openListEditor({}, function (payload) {
      Api$2.createList(payload).then(function (createdList) {
        notify$1(t$3('trakt_list_created', 'List created'));
        refreshMyListsAfterCreate(activityObject, createdList);
      })["catch"](function (error) {
        return showApiError(error, 'trakt_list_create_error');
      });
    });
  }
  function editMyList(activityObject, element) {
    if (!Api$2 || !element || !element.id) return;
    openListEditor(element, function (payload) {
      Api$2.updateList({
        listId: element.id,
        payload: payload
      }).then(function () {
        notify$1(t$3('trakt_list_updated', 'List updated'));
        refreshActivity(activityObject, 'trakt_my_lists');
      })["catch"](function (error) {
        return showApiError(error, 'trakt_list_edit_error');
      });
    });
  }
  function deleteMyList(activityObject, element) {
    if (!Api$2 || !element || !element.id) return;
    Lampa.Select.show({
      title: t$3('trakt_list_confirm_delete', 'Delete this list?'),
      items: [{
        title: t$3('trakt_list_delete_confirm_action', 'Delete'),
        confirm: true
      }, {
        title: t$3('cancel', 'Cancel')
      }],
      onSelect: function onSelect(item) {
        if (!item.confirm) {
          Lampa.Controller.toggle('content');
          return;
        }
        Api$2.deleteList({
          listId: element.id
        }).then(function () {
          notify$1(t$3('trakt_list_deleted', 'List deleted'));
          refreshMyListsAfterDelete(activityObject, element.id);
        })["catch"](function (error) {
          return showApiError(error, 'trakt_list_delete_error');
        });
      },
      onBack: function onBack() {
        Lampa.Controller.toggle('content');
      }
    });
  }
  function openMyListActions(activityObject, element) {
    if (!element) return;
    if (element.is_create_action) {
      createMyList(activityObject);
      return;
    }
    Lampa.Select.show({
      title: t$3('title_action', 'Action'),
      items: [{
        title: t$3('trakt_list_open', 'Open list'),
        action: 'open'
      }, {
        title: t$3('trakt_list_edit', 'Edit list'),
        action: 'edit'
      }, {
        title: t$3('trakt_list_delete', 'Delete list'),
        action: 'delete'
      }],
      onSelect: function onSelect(item) {
        if (item.action === 'open') openListDetail(element, 'trakt_my_list_detail');
        if (item.action === 'edit') editMyList(activityObject, element);
        if (item.action === 'delete') deleteMyList(activityObject, element);
      },
      onBack: function onBack() {
        Lampa.Controller.toggle('content');
      }
    });
  }
  function openMyListItemActions(object, element) {
    if (!Api$2 || !object || !object.id || !element) return;
    Lampa.Select.show({
      title: t$3('title_action', 'Action'),
      items: [{
        title: t$3('trakt_remove_from_list', 'Remove from this list'),
        action: 'remove'
      }],
      onSelect: function onSelect(item) {
        if (item.action !== 'remove') return;
        Api$2.removeFromList({
          listId: object.id,
          item: element
        }).then(function () {
          notify$1(t$3('trakt_item_removed_from_list', 'Item removed from list'));
          refreshActivity(object, 'trakt_my_list_detail');
        })["catch"](function (error) {
          return showApiError(error, 'trakt_remove_from_list_error');
        });
      },
      onBack: function onBack() {
        Lampa.Controller.toggle('content');
      }
    });
  }
  function renderWideListCard(card, element) {
    var root = card.render();
    root.addClass('trakt-list-wide-card');
    var promo = root.find('.card__promo');
    if (element.is_create_action) {
      root.addClass('trakt-list-wide-card--create');
      return;
    }
    if (promo.length) {
      // For list cards without real posters use only generated cover text.
      promo.remove();
    }
  }
  function listCatalog(object, apiMethod) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var config = _objectSpread2({
      detailComponent: 'trakt_list_detail',
      manage: false,
      addCreateAction: false
    }, options);
    var comp;
    var total_pages = 0;
    var waitload = false;
    var withActions = function withActions(data, page) {
      return config.addCreateAction ? withCreateListAction(data, page) : data;
    };
    if (isLampa3 && Lampa.Maker) {
      comp = Lampa.Maker.make('Category', object);
      comp.use({
        onCreate: function onCreate() {
          var _this9 = this;
          var params = _objectSpread2({}, object);
          params.limit = 36;
          params.page = params.page || 1;
          if (!Api$2 || !Api$2[apiMethod]) {
            this.empty();
            if (this.activity) this.activity.loader(false);
            return;
          }
          Api$2[apiMethod](params).then(function (data) {
            total_pages = data && data.total_pages ? data.total_pages : 0;
            _this9.build(withActions(data, params.page));
          })["catch"](function () {
            _this9.empty();
            if (_this9.activity) _this9.activity.loader(false);
          });
        },
        onNext: function onNext(resolve, reject) {
          var _this0 = this;
          if (waitload) {
            reject.call(this);
            return;
          }
          if (object.page <= total_pages) {
            waitload = true;
            object.page++;
            var params = _objectSpread2({}, object);
            params.limit = 36;
            if (!Api$2 || !Api$2[apiMethod]) {
              waitload = false;
              reject.call(this);
              return;
            }
            Api$2[apiMethod](params).then(function (data) {
              if (data && data.total_pages) {
                total_pages = data.total_pages;
                _this0.total_pages = data.total_pages;
              }
              resolve.call(_this0, withActions(data, params.page));
              waitload = false;
            })["catch"](function () {
              waitload = false;
              reject.call(_this0);
            });
          } else {
            reject.call(this);
          }
        },
        onInstance: function onInstance(card, element) {
          renderWideListCard(card, element);
          card.use({
            onlyMenu: false,
            onlyEnter: function onlyEnter() {
              if (element.is_create_action) {
                createMyList(object);
                return;
              }
              openListDetail(element, config.detailComponent);
            },
            onLong: function onLong() {
              if (config.manage) openMyListActions(object, element);
            }
          });
        }
      });
    } else {
      comp = new Lampa.InteractionCategory(object);
      comp.create = function () {
        var _this1 = this;
        var params = _objectSpread2({}, object);
        params.limit = 36;
        params.page = params.page || 1;
        if (!Api$2 || !Api$2[apiMethod]) return;
        Api$2[apiMethod](params).then(function (data) {
          total_pages = data && data.total_pages ? data.total_pages : 0;
          _this1.build(withActions(data, params.page));
          if (_this1.activity.scroll) _this1.activity.scroll.onEnd = _this1.next.bind(_this1);
        })["catch"](function () {
          _this1.empty();
          if (_this1.activity) _this1.activity.loader(false);
        });
      };
      comp.next = function () {
        var _this10 = this;
        if (waitload) return;
        if (object.page < total_pages) {
          waitload = true;
          object.page++;
          var params = _objectSpread2({}, object);
          params.limit = 36;
          if (!Api$2 || !Api$2[apiMethod]) return;
          Api$2[apiMethod](params).then(function (data) {
            if (data && data.total_pages) {
              total_pages = data.total_pages;
            }
            _this10.append(withActions(data, params.page));
            waitload = false;
          })["catch"](function () {
            waitload = false;
          });
        }
      };
      comp.cardRender = function (_, element, card) {
        renderWideListCard(card, element);
        card.onEnter = function () {
          if (element.is_create_action) {
            createMyList(object);
            return;
          }
          openListDetail(element, config.detailComponent);
        };
        card.onMenu = config.manage ? function () {
          return openMyListActions(object, element);
        } : false;
      };
    }
    return comp;
  }
  function getWatchlistSortFields() {
    var fields = Api$2 && Array.isArray(Api$2.watchlistSortFields) && Api$2.watchlistSortFields.length ? Api$2.watchlistSortFields : DEFAULT_WATCHLIST_SORT_FIELDS;
    return fields.slice();
  }
  function getQuickWatchlistSortFields() {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getWatchlistSortFields();
    var available = new Set((fields || []).map(function (field) {
      return String(field).trim().toLowerCase();
    }));
    return DEFAULT_WATCHLIST_QUICK_SORT_FIELDS.filter(function (field) {
      return available.has(field);
    });
  }
  function getHiddenWatchlistSortFields() {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getWatchlistSortFields();
    var quickSet = new Set(getQuickWatchlistSortFields(fields));
    return (fields || []).filter(function (field) {
      return !quickSet.has(String(field).trim().toLowerCase());
    });
  }
  function getWatchlistVipSortFieldSet() {
    var fields = Api$2 && Array.isArray(Api$2.watchlistVipSortFields) && Api$2.watchlistVipSortFields.length ? Api$2.watchlistVipSortFields : DEFAULT_WATCHLIST_VIP_SORT_FIELDS;
    return new Set(fields.map(function (field) {
      return String(field).trim().toLowerCase();
    }));
  }
  function normalizeWatchlistSortValue(rawSort) {
    if (Api$2 && typeof Api$2.normalizeWatchlistSort === 'function') {
      return Api$2.normalizeWatchlistSort(rawSort || DEFAULT_WATCHLIST_SORT);
    }
    var normalized = (rawSort || DEFAULT_WATCHLIST_SORT).toString().trim().toLowerCase().replace(/^\/+/, '');
    var parts = normalized.split('/').filter(Boolean);
    var field = getWatchlistSortFields().indexOf(parts[0]) > -1 ? parts[0] : 'added';
    var order = parts[1] === 'asc' ? 'asc' : 'desc';
    return "".concat(field, "/").concat(order);
  }
  function parseWatchlistSortValue(rawSort) {
    var normalized = normalizeWatchlistSortValue(rawSort);
    var parts = normalized.split('/');
    return {
      field: parts[0] || 'added',
      order: parts[1] === 'asc' ? 'asc' : 'desc'
    };
  }
  function buildWatchlistSortValue() {
    var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'added';
    var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'desc';
    return normalizeWatchlistSortValue("".concat(field, "/").concat(order === 'asc' ? 'asc' : 'desc'));
  }
  function isWatchlistVipSortField() {
    var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return getWatchlistVipSortFieldSet().has((field || '').toString().trim().toLowerCase());
  }
  function readStoredTraktVipStatus() {
    if (!Lampa || !Lampa.Storage || typeof Lampa.Storage.get !== 'function') return null;
    var value = Lampa.Storage.get('trakt_user_vip');
    if (value === true || value === 'true' || value === 1 || value === '1') return true;
    if (value === false || value === 'false' || value === 0 || value === '0') return false;
    return null;
  }
  function writeStoredTraktVipStatus(value) {
    traktVipStatusCache = !!value;
    if (Lampa && Lampa.Storage && typeof Lampa.Storage.set === 'function') {
      Lampa.Storage.set('trakt_user_vip', !!value);
    }
  }
  function getTraktVipStatusCached() {
    if (typeof traktVipStatusCache === 'boolean') return traktVipStatusCache;
    var stored = readStoredTraktVipStatus();
    if (typeof stored === 'boolean') {
      traktVipStatusCache = stored;
      return stored;
    }
    return false;
  }
  function loadTraktVipStatus() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$force = _ref.force,
      force = _ref$force === void 0 ? false : _ref$force;
    if (!force && typeof traktVipStatusCache === 'boolean') {
      return Promise.resolve(traktVipStatusCache);
    }
    if (!Api$2 || !Lampa || !Lampa.Storage || !Lampa.Storage.get('trakt_token')) {
      return Promise.resolve(false);
    }
    if (traktVipStatusPromise) return traktVipStatusPromise;
    traktVipStatusPromise = Api$2.get('/users/me').then(function (user) {
      var vipEnabled = !!(user && user.vip);
      writeStoredTraktVipStatus(vipEnabled);
      return vipEnabled;
    })["catch"](function () {
      return getTraktVipStatusCached();
    })["finally"](function () {
      traktVipStatusPromise = null;
    });
    return traktVipStatusPromise;
  }
  function sanitizeWatchlistSortForVip(rawSort) {
    var vipEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var parsed = parseWatchlistSortValue(rawSort);
    if (!vipEnabled && isWatchlistVipSortField(parsed.field)) {
      return parseWatchlistSortValue(DEFAULT_WATCHLIST_SORT);
    }
    return parsed;
  }
  function formatWatchlistSortLabel() {
    var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var key = (field || '').toString().trim().toLowerCase();
    var known = WATCHLIST_SORT_LABELS[key];
    if (known) return t$3(known.key, known.fallback);
    return key.split('_').filter(Boolean).map(function (part) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(' ');
  }
  function formatWatchlistSortArrow() {
    var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'desc';
    return order === 'asc' ? '↑' : '↓';
  }
  function normalizeWatchlistTab(rawType) {
    var value = (rawType || '').toString().trim().toLowerCase();
    if (value === 'show' || value === 'shows' || value === 'tv' || value === 'series' || value === 'serials') {
      return 'shows';
    }
    return 'movies';
  }
  function buildWatchlistTabTitle(tabId) {
    if (tabId === 'shows') return t$3('trakttv_watchlist_tab_shows', 'Shows');
    return t$3('trakttv_watchlist_tab_movies', 'Movies');
  }
  function watchlistHub() {
    var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var activity;
    var html;
    var controls;
    var navigation;
    var sortNavigation;
    var moreSortButton;
    var body;
    var views = {};
    var lastControlsFocus = null;
    var activeTab = normalizeWatchlistTab(object.watchlistType || object.mediaType || object.type);
    var vipEnabled = Lampa && Lampa.Storage && Lampa.Storage.get('trakt_token') ? getTraktVipStatusCached() : false;
    var activeSort = sanitizeWatchlistSortForVip(object.watchlistSort || object.sort, vipEnabled);
    var activeSortField = activeSort.field;
    var activeSortOrder = activeSort.order;
    var tabs = [{
      id: 'movies'
    }, {
      id: 'shows'
    }];
    var sortFields = getWatchlistSortFields();
    var quickSortFields = getQuickWatchlistSortFields(sortFields);
    var hiddenSortFields = getHiddenWatchlistSortFields(sortFields);
    function rememberControlsFocus(element) {
      if (!element) return;
      lastControlsFocus = element && element.jquery ? element[0] : element;
    }
    function getCurrentSortValue() {
      return buildWatchlistSortValue(activeSortField, activeSortOrder);
    }
    function isHiddenSortField(field) {
      return hiddenSortFields.indexOf((field || '').toString().trim().toLowerCase()) > -1;
    }
    function restoreControls() {
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      setTimeout(function () {
        Lampa.Controller.toggle('trakt_watchlist_controls');
      }, delay);
    }
    function syncObjectState() {
      object.watchlistType = activeTab;
      object.mediaType = activeTab;
      object.type = activeTab;
      object.watchlistSort = getCurrentSortValue();
      object.sort = object.watchlistSort;
    }
    function buildTabs() {
      navigation = $('<div class="trakt-watchlist-hub__tabs"></div>');
      tabs.forEach(function (tab) {
        var button = $("<div class=\"simple-button simple-button--filter simple-button--invisible selector trakt-watchlist__tab\" data-tab=\"".concat(tab.id, "\">") + "<div>".concat(buildWatchlistTabTitle(tab.id), "</div>") + "</div>");
        if (tab.id === activeTab) button.addClass('active');
        button.on('hover:focus', function () {
          rememberControlsFocus(button);
        });
        button.on('hover:enter', function () {
          rememberControlsFocus(button);
          switchTab(tab.id);
        });
        navigation.append(button);
      });
    }
    function updateTabs() {
      navigation.find('.trakt-watchlist__tab').removeClass('active');
      var activeButton = navigation.find(".trakt-watchlist__tab[data-tab=\"".concat(activeTab, "\"]"));
      if (activeButton.length) activeButton.addClass('active');
    }
    function buildSorts() {
      sortNavigation = $('<div class="trakt-watchlist-hub__sorts"></div>');
      quickSortFields.forEach(function (field) {
        var button = $("<div class=\"simple-button simple-button--filter simple-button--invisible selector trakt-watchlist__sort\" data-sort-field=\"".concat(field, "\">") + "<div class=\"trakt-watchlist__sort-label\">".concat(formatWatchlistSortLabel(field), "</div>") + "<div class=\"trakt-watchlist__sort-state\"></div>" + "</div>");
        button.on('hover:focus', function () {
          rememberControlsFocus(button);
        });
        button.on('hover:enter', function () {
          rememberControlsFocus(button);
          switchSort(field);
        });
        sortNavigation.append(button);
      });
      if (hiddenSortFields.length) {
        moreSortButton = $("<div class=\"simple-button simple-button--filter simple-button--invisible selector trakt-watchlist__sort trakt-watchlist__sort--more\" data-sort-field=\"__more__\">" + "<div class=\"trakt-watchlist__sort-label\">".concat(t$3('trakttv_watchlist_sort_more', 'More'), "</div>") + "<div class=\"trakt-watchlist__sort-state\"></div>" + "</div>");
        moreSortButton.on('hover:focus', function () {
          rememberControlsFocus(moreSortButton);
        });
        moreSortButton.on('hover:enter', function () {
          rememberControlsFocus(moreSortButton);
          openMoreSorts();
        });
        sortNavigation.append(moreSortButton);
      }
      updateSorts();
    }
    function updateSorts() {
      if (!sortNavigation) return;
      sortNavigation.find('.trakt-watchlist__sort').each(function (index, element) {
        var button = $(element);
        var field = (button.attr('data-sort-field') || '').toString();
        var isMoreButton = field === '__more__';
        var isActive = field === activeSortField;
        var state = button.find('.trakt-watchlist__sort-state');
        var label = button.find('.trakt-watchlist__sort-label');
        button.removeClass('active trakt-watchlist__sort--active trakt-watchlist__sort--asc trakt-watchlist__sort--desc trakt-watchlist__sort--vip trakt-watchlist__sort--locked');
        if (isMoreButton) {
          var hiddenActive = isHiddenSortField(activeSortField);
          var activeHiddenVip = hiddenActive && isWatchlistVipSortField(activeSortField);
          label.text(hiddenActive ? formatWatchlistSortLabel(activeSortField) : t$3('trakttv_watchlist_sort_more', 'More'));
          if (activeHiddenVip) button.addClass('trakt-watchlist__sort--vip');
          if (hiddenActive) {
            button.addClass('active trakt-watchlist__sort--active');
            button.addClass(activeSortOrder === 'asc' ? 'trakt-watchlist__sort--asc' : 'trakt-watchlist__sort--desc');
            state.text(formatWatchlistSortArrow(activeSortOrder));
          } else {
            state.text('');
          }
          return;
        }
        label.text(formatWatchlistSortLabel(field));
        if (isActive) {
          button.addClass('active trakt-watchlist__sort--active');
          button.addClass(activeSortOrder === 'asc' ? 'trakt-watchlist__sort--asc' : 'trakt-watchlist__sort--desc');
          state.text(formatWatchlistSortArrow(activeSortOrder));
        } else {
          state.text('');
        }
      });
    }
    function buildMoreSortItems() {
      return hiddenSortFields.map(function (field) {
        var vipOnly = isWatchlistVipSortField(field);
        var isActive = field === activeSortField;
        var arrow = isActive ? " ".concat(formatWatchlistSortArrow(activeSortOrder)) : '';
        return {
          title: "".concat(formatWatchlistSortLabel(field)).concat(arrow),
          subtitle: vipOnly ? t$3('trakttv_vip_status', 'VIP') : '',
          selected: isActive,
          ghost: vipOnly && !vipEnabled,
          field: field
        };
      });
    }
    function createViewObject(tabId) {
      syncObjectState();
      return _objectSpread2(_objectSpread2({}, object), {}, {
        page: 1,
        watchlistType: tabId,
        mediaType: tabId,
        type: tabId,
        watchlistSort: getCurrentSortValue(),
        sort: getCurrentSortValue(),
        onHead: function onHead() {
          Lampa.Controller.toggle('trakt_watchlist_controls');
        }
      });
    }
    function makeTabView(tabId) {
      var viewObject = createViewObject(tabId);
      var view = new baseComponent(viewObject, 'watchlist');
      view.activity = activity;
      view.create();
      var render = view.render(true);
      render.classList.add('trakt-watchlist__view');
      render.classList.add("trakt-watchlist__view--".concat(tabId));
      if (tabId !== activeTab) render.classList.add('hide');
      body.append(render);
      views[tabId] = view;
      return view;
    }
    function getView(tabId) {
      if (views[tabId]) return views[tabId];
      return makeTabView(tabId);
    }
    function destroyView(tabId) {
      var view = views[tabId];
      if (!view) return;
      if (view.destroy) view.destroy();
      delete views[tabId];
    }
    function rebuildViews() {
      Object.keys(views).forEach(function (tabId) {
        destroyView(tabId);
      });
      if (body) body.empty();
      showView(getView(activeTab));
    }
    function hideView(view) {
      if (!view) return;
      var render = view.render(true);
      render.classList.add('hide');
      if (view.pause) view.pause();
    }
    function showView(view) {
      if (!view) return;
      var render = view.render(true);
      render.classList.remove('hide');
      if (view.start) view.start();
    }
    function switchTab(tabId) {
      if (!tabId || tabId === activeTab) {
        Lampa.Controller.toggle('content');
        return;
      }
      hideView(views[activeTab]);
      activeTab = tabId;
      syncObjectState();
      updateTabs();
      showView(getView(tabId));
    }
    function applySort(field, order) {
      activeSortField = field;
      activeSortOrder = order === 'asc' ? 'asc' : 'desc';
      syncObjectState();
      updateSorts();
      rebuildViews();
    }
    function switchSort(field) {
      var vipOnly = isWatchlistVipSortField(field);
      var nextOrder = field === activeSortField ? activeSortOrder === 'desc' ? 'asc' : 'desc' : 'desc';
      if (!vipOnly) {
        applySort(field, nextOrder);
        return Promise.resolve(true);
      }
      return loadTraktVipStatus().then(function (status) {
        vipEnabled = !!status;
        updateSorts();
        if (!vipEnabled) {
          notify$1(t$3('trakttv_watchlist_sort_vip_required', 'This sort is available only for Trakt VIP users'));
          return false;
        }
        applySort(field, nextOrder);
        return true;
      })["catch"](function () {
        vipEnabled = getTraktVipStatusCached();
        updateSorts();
        notify$1(t$3('trakttv_watchlist_sort_vip_required', 'This sort is available only for Trakt VIP users'));
        return false;
      });
    }
    function openMoreSorts() {
      if (!hiddenSortFields.length) {
        restoreControls();
        return;
      }
      Lampa.Select.show({
        title: t$3('trakttv_watchlist_sort_more_title', 'More sorting'),
        items: buildMoreSortItems(),
        onSelect: function onSelect(item) {
          if (!item || !item.field) {
            restoreControls();
            return;
          }
          Promise.resolve(switchSort(item.field))["finally"](function () {
            restoreControls();
          });
        },
        onBack: function onBack() {
          restoreControls();
        }
      });
    }
    function getControlsFocusTarget() {
      if (lastControlsFocus && typeof document !== 'undefined' && document.body && document.body.contains(lastControlsFocus)) {
        return lastControlsFocus;
      }
      var activeSortButton = sortNavigation ? sortNavigation.find(".trakt-watchlist__sort[data-sort-field=\"".concat(activeSortField, "\"]"))[0] : null;
      var moreButtonNode = moreSortButton ? moreSortButton[0] : null;
      var activeTabButton = navigation ? navigation.find(".trakt-watchlist__tab[data-tab=\"".concat(activeTab, "\"]"))[0] : null;
      var fallbackButton = controls ? controls.find('.selector')[0] : null;
      return activeSortButton || (isHiddenSortField(activeSortField) ? moreButtonNode : null) || activeTabButton || fallbackButton || false;
    }
    function ensureControlsController() {
      Lampa.Controller.add('trakt_watchlist_controls', {
        toggle: function toggle() {
          Lampa.Controller.collectionSet(controls);
          Lampa.Controller.collectionFocus(getControlsFocusTarget(), controls);
        },
        right: function right() {
          if (typeof Navigator !== 'undefined') Navigator.move('right');
        },
        left: function left() {
          if (typeof Navigator !== 'undefined' && Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
        },
        down: function down() {
          if (typeof Navigator !== 'undefined' && Navigator.canmove('down')) Navigator.move('down');else Lampa.Controller.toggle('content');
        },
        up: function up() {
          if (typeof Navigator !== 'undefined' && Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
        },
        back: function back() {
          Lampa.Activity.backward();
        }
      });
    }
    return {
      create: function create() {
        activity = this.activity;
        activity.render().addClass('trakt-watchlist-activity');
        html = $('<div class="trakt-watchlist-hub"></div>');
        controls = $('<div class="trakt-watchlist-hub__controls"></div>');
        body = $('<div class="trakt-watchlist-hub__body"></div>');
        buildTabs();
        buildSorts();
        controls.append(navigation, sortNavigation);
        html.append(controls, body);
        ensureControlsController();
        syncObjectState();
        showView(getView(activeTab));
        loadTraktVipStatus({
          force: true
        }).then(function (status) {
          vipEnabled = !!status;
          var safeSort = sanitizeWatchlistSortForVip(getCurrentSortValue(), vipEnabled);
          var hasChanged = safeSort.field !== activeSortField || safeSort.order !== activeSortOrder;
          activeSortField = safeSort.field;
          activeSortOrder = safeSort.order;
          syncObjectState();
          updateSorts();
          if (hasChanged) {
            rebuildViews();
          }
        })["catch"](function () {
          vipEnabled = getTraktVipStatusCached();
          updateSorts();
        });
        return this.render();
      },
      render: function render(js) {
        return js ? html[0] : html;
      },
      start: function start() {
        var current = getView(activeTab);
        if (current && current.start) current.start();
      },
      pause: function pause() {
        var current = views[activeTab];
        if (current && current.pause) current.pause();
      },
      destroy: function destroy() {
        Object.keys(views).forEach(function (tabId) {
          destroyView(tabId);
        });
        if (html) html.remove();
        views = {};
        lastControlsFocus = null;
      }
    };
  }
  function watchlist$1(object) {
    if (!object.page) object.page = 1;
    return new watchlistHub(object);
  }
  function upnext(object) {
    if (!object.page) object.page = 1;
    return new baseComponent(object, 'upnext');
  }
  function recommendations(object) {
    if (!object.page) object.page = 1;
    return new baseRecommendations(object);
  }
  function liked_lists(object) {
    if (!object.page) object.page = 1;
    return listCatalog(object, 'likesLists', {
      detailComponent: 'trakt_list_detail',
      manage: false,
      addCreateAction: false
    });
  }
  function lists(object) {
    return liked_lists(object);
  }
  function my_lists(object) {
    if (!object.page) object.page = 1;
    return listCatalog(object, 'myLists', {
      detailComponent: 'trakt_my_list_detail',
      manage: true,
      addCreateAction: true
    });
  }
  function list_detail(object) {
    if (!object.page) object.page = 1;
    return new baseComponent(object, 'list');
  }
  function my_list_detail(object) {
    if (!object.page) object.page = 1;
    object.can_manage = true;
    return new baseComponent(object, 'myListItems');
  }
  function trakt_list_detail(object) {
    if (!object.page) object.page = 1;
    var paramsForBaseComponent = _objectSpread2(_objectSpread2({}, object), {}, {
      id: object.id || object.list_id,
      page: object.page,
      limit: object.limit
    });
    return new baseComponent(paramsForBaseComponent, 'list');
  }
  var Catalog = {
    watchlist: watchlist$1,
    upnext: upnext,
    recommendations: recommendations,
    lists: lists,
    liked_lists: liked_lists,
    my_lists: my_lists,
    list_detail: list_detail,
    my_list_detail: my_list_detail,
    trakt_list_detail: trakt_list_detail
  };

  function Main() {
    Lampa.Lang.add({
      trakttvAuthMissed: {
        ru: "Не авторизированы",
        en: "Not logged",
        uk: "Не авторизовані",
        ro: "Neautorizat"
      },
      trakttvAuthOk: {
        ru: "Авторизированы",
        en: "Logged",
        uk: "Авторизовані",
        ro: "Autorizat"
      },
      trakttvAuthUpdated: {
        ru: "Авторизация обновлена",
        en: "Auth success updated",
        uk: "Авторизацію оновлено",
        ro: "Autorizare actualizată"
      },
      trakttvAuthError: {
        ru: "Ошибка авторизации",
        en: "Auth error",
        uk: "Помилка авторизаці",
        ro: "Eroare de autorizare"
      },
      traktLampaRestart: {
        ru: "Перезагрузите приложение",
        en: "Please restart application",
        uk: "Перезавантажте додаток",
        ro: "Vă rugăm să reporniți aplicația"
      },
      trakttvLoading: {
        ru: "Загрузка, а пока сделай кофе",
        en: "Loading and go drink coffee",
        uk: "Завантаження, а поки зроби собі кавусю",
        ro: "Se încarcă, între timp fă o cafea"
      },
      trakttv_remove_from_collection: {
        ru: "Удалить из watchlist",
        en: "Remove from watchlist",
        uk: "Видалити з watchlist",
        ro: "Elimină din watchlist"
      },
      trakttv_add_to_collection: {
        ru: "Добавить в watchlist",
        en: "Add to watchlist",
        uk: "Додати в watchlist",
        ro: "Adaugă în watchlist"
      },
      trakttv_WatchlistSort: {
        ru: "Сортировка watchlist",
        en: "Sort watchlist",
        uk: "Сортування watchlist",
        ro: "Sortare watchlist"
      },
      trakttvLogin: {
        ru: "Войти в Trakt.TV",
        en: "Login to Trakt.TV",
        uk: "Увійти в Trakt.TV",
        ro: "Autentificare pe Trakt.TV"
      },
      trakttvLogout: {
        ru: "Выйти из Trakt.TV",
        en: "Logout from Trakt.TV",
        uk: "Вийти з Trakt.TV",
        ro: "Deconectare de la Trakt.TV"
      },
      trakttvLogoutNoty: {
        ru: "Вы вышли из Trakt.TV",
        en: "You have logged out from Trakt.TV",
        uk: "Ви вийшли з Trakt.TV",
        ro: "V-ați deconectat de la Trakt.TV"
      },
      trakttvKeyCleanered: {
        ru: "Ключ очищен",
        en: "Key cleaned",
        uk: "Ключ очищено",
        ro: "Cheie ștearsă"
      },
      trakttvFullClearNoty: {
        ru: "Все очищено",
        en: "All cleared",
        uk: "Все очищено",
        ro: "Totul a fost șters"
      },
      trakttvHumorMinutes: {
        ru: "Потрачено {time} минут на просмотр! Уже почти Netflix-чемпион",
        en: "Spent {time} minutes watching! Almost a Netflix champion",
        uk: "Витрачено {time} хвилин на перегляд! Ти вже майже Netflix-чемпіон",
        ro: "Ai petrecut {time} minute vizionând! Ești aproape un campion Netflix"
      },
      trakttvStatPlays: {
        ru: "просмотров",
        en: "plays",
        uk: "переглядів",
        ro: "vizionări"
      },
      trakttvStatWatched: {
        ru: "просмотрено",
        en: "watched",
        uk: "переглянуто",
        ro: "vizionat"
      },
      trakttvStatMinutes: {
        ru: "минут",
        en: "minutes",
        uk: "хвилин",
        ro: "minute"
      },
      trakttv_no_series: {
        ru: "Нет сериалов",
        en: "No series",
        uk: "Немає серіалів",
        ro: "Niciun serial"
      },
      trakttv_episodes_on: {
        ru: "Серии на",
        en: "Episodes on",
        uk: "Серії на",
        ro: "Episoade pe"
      },
      trakttv_calendar_error: {
        ru: "Ошибка загрузки календаря Trakt",
        en: "Trakt Calendar load error",
        uk: "Помилка завантаження календаря Trakt",
        ro: "Eroare la încărcarea calendarului Trakt"
      },
      trakttv_no_upcoming: {
        ru: "Нет предстоящих эпизодов",
        en: "No upcoming episodes",
        uk: "Немає майбутніх епізодів",
        ro: "Nu există episoade viitoare"
      },
      trakttvFullClear: {
        ru: "Очистить все ключи Trakt.TV",
        en: "Clear all Trakt.TV keys",
        uk: "Очистити всі ключі Trakt.TV",
        ro: "Șterge toate cheile Trakt.TV"
      },
      trakt_componentDisable: {
        ru: "Компонент отключен",
        en: "Component disabled",
        uk: "Компонент вимкнено",
        ro: "Componentă dezactivată"
      },
      trakt_componentEnable: {
        ru: "Компонент включен",
        en: "Component enabled",
        uk: "Компонент увімкнено",
        ro: "Componentă activată"
      },
      trakt_history_added: {
        ru: "Добавлено в историю просмотров",
        en: "Added to watch history",
        uk: "Додано до історії переглядів",
        ro: "Adăugat în istoricul vizionărilor"
      },
      trakt_history_addError: {
        ru: "Ошибка добавления в историю",
        en: "Error adding to history",
        uk: "Помилка додавання до історії",
        ro: "Eroare la adăugarea în istoric"
      },
      trakt_history_all: {
        ru: "Весь сериал",
        en: "Entire series",
        uk: "Весь серіал",
        ro: "Tot serialul"
      },
      trakt_history_season: {
        ru: "Последний сезон",
        en: "Last season",
        uk: "Останній сезон",
        ro: "Ultimul sezon"
      },
      trakt_history_episodes: {
        ru: "Последний эпизод",
        en: "Last episode",
        uk: "Остання серія",
        ro: "Ultimul episod"
      },
      trakt_history_title: {
        ru: "Что отправить в историю?",
        en: "What to send to history?",
        uk: "Що відправити до історії?",
        ro: "Ce doriți să trimiteți în istoric?"
      },
      trakt_history_removed: {
        ru: "Удалено из истории просмотров",
        en: "Removed from watch history",
        uk: "Видалено з історії переглядів",
        ro: "Eliminat din istoricul vizionărilor"
      },
      trakt_history_button: {
        ru: "Добавить в историю",
        en: "Add to history",
        uk: "Додати до історії",
        ro: "Adaugă în istoric"
      },
      trakt_watchlist_button: {
        ru: "Добавить в watchlist",
        en: "Add to watchlist",
        uk: "Додати до watchlist",
        ro: "Adaugă în watchlist"
      },
      trakt_watchlist_remove: {
        ru: "Удалить из watchlist",
        en: "Remove from watchlist",
        uk: "Видалити з watchlist",
        ro: "Elimină din watchlist"
      },
      trakt_watchlist_add: {
        ru: "Добавлено в watchlist",
        en: "Added to watchlist",
        uk: "Додано до watchlist",
        ro: "Adăugat în watchlist"
      },
      trakt_history_in: {
        ru: "В истории",
        en: "In history",
        uk: "В історії",
        ro: "În istoric"
      },
      trakt_history_not_in: {
        ru: "Добавить в историю",
        en: "Add to history",
        uk: "Додати до історії",
        ro: "Adaugă în istoric"
      },
      trakttv_recommendations: {
        ru: "Рекомендации",
        en: "Recommendations",
        uk: "Рекомендації",
        ro: "Recomandări"
      },
      trakttv_watchlist: {
        ru: "Watchlist",
        en: "Watchlist",
        uk: "Watchlist",
        ro: "Watchlist"
      },
      trakttv_calendar: {
        ru: "Календарь",
        en: "Calendar",
        uk: "Календар",
        ro: "Calendar"
      },
      trakttv_menu_title: {
        ru: "TraktTV",
        en: "TraktTV",
        uk: "TraktTV",
        ro: "TraktTV"
      },
      trakttv_row_upnext: {
        ru: "TraktTV: Смотреть дальше",
        en: "TraktTV: Up Next",
        uk: "TraktTV: Дивитись далі",
        ro: "TraktTV: Progres vizionare"
      },
      trakttv_row_recommendations_main: {
        ru: "TraktTV: Рекомендации (главная)",
        en: "TraktTV: Recommendations (main)",
        uk: "TraktTV: Рекомендації (головна)",
        ro: "TraktTV: Recomandări (acasă)"
      },
      trakttv_row_recommendations_movie: {
        ru: "TraktTV: Рекомендации (фильмы)",
        en: "TraktTV: Recommendations (movies)",
        uk: "TraktTV: Рекомендації (фільми)",
        ro: "TraktTV: Recomandări (filme)"
      },
      trakttv_row_recommendations_tv: {
        ru: "TraktTV: Рекомендации (серіалы)",
        en: "TraktTV: Recommendations (tv)",
        uk: "TraktTV: Рекомендації (серіали)",
        ro: "TraktTV: Recomandări (seriale)"
      },
      trakttv_row_calendar_main: {
        ru: "TraktTV: Календарь выходов",
        en: "TraktTV: Calendar",
        uk: "TraktTV: Календар виходів",
        ro: "TraktTV: Calendar"
      },
      trakttv_row_calendar_tv: {
        ru: "TraktTV: Календарь выходов (сериалы)",
        en: "TraktTV: Calendar (shows)",
        uk: "TraktTV: Календар виходів (серіали)",
        ro: "TraktTV: Calendar (seriale)"
      },
      trakttv_row_dvd_calendar_main: {
        ru: "TraktTV: DVD Релизы",
        en: "TraktTV: DVD Releases",
        uk: "TraktTV: DVD Релізи",
        ro: "TraktTV: Lansări DVD"
      },
      trakttv_row_dvd_calendar_movies: {
        ru: "TraktTV: DVD Релизы (фильмы)",
        en: "TraktTV: DVD Releases (movies)",
        uk: "TraktTV: DVD Релізи (фільми)",
        ro: "TraktTV: Lansări DVD (filme)"
      },
      trakttv_no_recommendations: {
        ru: "Нет рекомендаций",
        en: "No recommendations",
        uk: "Немає рекомендацій",
        ro: "Nu există recomandări"
      },
      trakttv_show_recommendations: {
        ru: "Показывать рекомендации TraktTV на главной",
        en: "Show TraktTV recommendations on main page",
        uk: "Показувати рекомендації TraktTV на головній сторінці",
        ro: "Afișează recomandările TraktTV pe pagina principală"
      },
      trakttv_source_trending: {
        ru: "В тренде",
        en: "Trending",
        uk: "У тренді",
        ro: "În tendințe"
      },
      trakttv_source_anticipated: {
        ru: "Ожидаемые",
        en: "Anticipated",
        uk: "Очікувані",
        ro: "Anticipate"
      },
      trakttv_source_popular: {
        ru: "Популярные",
        en: "Popular",
        uk: "Популярні",
        ro: "Populare"
      },
      trakttv_source_recommendations_movies: {
        ru: "Рекомендации: фильмы",
        en: "Recommendations: Movies",
        uk: "Рекомендації: фільми",
        ro: "Recomandări: Filme"
      },
      trakttv_source_recommendations_shows: {
        ru: "Рекомендации: сериалы",
        en: "Recommendations: Shows",
        uk: "Рекомендації: серіали",
        ro: "Recomandări: Seriale"
      },
      trakttv_source_section: {
        ru: "Фильтры источника TraktTV",
        en: "TraktTV source filters",
        uk: "Фільтри джерела TraktTV",
        ro: "Filtre sursă TraktTV"
      },
      trakttv_source_ignore_watched: {
        ru: "Источник: скрывать просмотренное",
        en: "Source: ignore watched",
        uk: "Джерело: приховувати переглянуте",
        ro: "Sursă: ascunde vizionate"
      },
      trakttv_source_ignore_watched_descr: {
        ru: "Применяется ко всем лентам TraktTV (категории, рекомендации, поиск)",
        en: "Applies to all TraktTV source feeds (categories, recommendations, search)",
        uk: "Застосовується до всіх стрічок TraktTV (категорії, рекомендації, пошук)",
        ro: "Se aplică tuturor fluxurilor TraktTV (categorii, recomandări, căutare)"
      },
      trakttv_source_ignore_watchlisted: {
        ru: "Источник: скрывать watchlist",
        en: "Source: ignore watchlisted",
        uk: "Джерело: приховувати watchlist",
        ro: "Sursă: ascunde watchlist"
      },
      trakttv_source_ignore_watchlisted_descr: {
        ru: "Применяется ко всем лентам TraktTV (категории, рекомендации, поиск)",
        en: "Applies to all TraktTV source feeds (categories, recommendations, search)",
        uk: "Застосовується до всіх стрічок TraktTV (категорії, рекомендації, пошук)",
        ro: "Se aplică tuturor fluxurilor TraktTV (categorii, recomandări, căutare)"
      },
      trakt_source_search_lists: {
        ru: "Списки",
        en: "Lists",
        uk: "Списки",
        ro: "Liste"
      },
      trakt_source_search_lists_more_hint: {
        ru: "Открывайте списки напрямую из результатов поиска",
        en: "Open lists directly from search results",
        uk: "Відкривайте списки напряму з результатів пошуку",
        ro: "Deschideți listele direct din rezultatele căutării"
      },
      trakt_progress_section: {
        ru: "Настройки прогресса",
        en: "Progress settings",
        uk: "Налаштування прогресу",
        ro: "Setări progres"
      },
      trakttv_show_tv_progress: {
        ru: "Показывать прогресс просмотра сериалов",
        en: "Show TV progress",
        uk: "Показувати прогрес прогляду серіалів",
        ro: "Afișează progresul serialelor"
      },
      trakttv_related_lists: {
        ru: "Связанные списки",
        en: "Related lists",
        uk: "Пов'язані списки",
        ro: "Liste corelate"
      },
      trakt_list_detail: {
        ru: "Содержимое списка",
        en: "List Content",
        uk: "Вміст списку",
        ro: "Conținut listă"
      },
      trakt_my_lists: {
        ru: "Мои списки",
        en: "My Lists",
        uk: "Мої списки",
        ro: "Listele mele"
      },
      trakt_liked_lists: {
        ru: "Понравившиеся списки",
        en: "Liked Lists",
        uk: "Вподобані списки",
        ro: "Liste apreciate"
      },
      trakt_no_lists: {
        ru: "Нет списков",
        en: "No lists",
        uk: "Немає списків",
        ro: "Nicio listă"
      },
      trakt_list_items: {
        ru: "Элементы списка",
        en: "List Items",
        uk: "Елементи списку",
        ro: "Elemente listă"
      },
      trakt_list_items_short: {
        ru: "элем.",
        en: "items",
        uk: "елем.",
        ro: "elemente"
      },
      trakt_list_open: {
        ru: "Открыть список",
        en: "Open list",
        uk: "Відкрити список",
        ro: "Deschide lista"
      },
      trakt_list_create: {
        ru: "Создать список",
        en: "Create list",
        uk: "Створити список",
        ro: "Creează listă"
      },
      trakt_list_create_short: {
        ru: "Создать",
        en: "Create",
        uk: "Створити",
        ro: "Creează"
      },
      trakt_list_create_hint: {
        ru: "Создайте новый список Trakt",
        en: "Create a new Trakt list",
        uk: "Створіть новий список Trakt",
        ro: "Creează o listă nouă Trakt"
      },
      trakt_list_name_input: {
        ru: "Название списка",
        en: "List name",
        uk: "Назва списку",
        ro: "Nume listă"
      },
      trakt_list_description_input: {
        ru: "Описание списка",
        en: "List description",
        uk: "Опис списку",
        ro: "Descriere listă"
      },
      trakt_list_name_required: {
        ru: "Укажите название списка",
        en: "List name is required",
        uk: "Вкажіть назву списку",
        ro: "Numele listei este obligatoriu"
      },
      trakt_list_privacy: {
        ru: "Приватность списка",
        en: "List privacy",
        uk: "Приватність списку",
        ro: "Confidențialitate listă"
      },
      trakt_list_privacy_private: {
        ru: "Приватный",
        en: "Private",
        uk: "Приватний",
        ro: "Privat"
      },
      trakt_list_privacy_friends: {
        ru: "Для друзей",
        en: "Friends",
        uk: "Для друзів",
        ro: "Prieteni"
      },
      trakt_list_privacy_public: {
        ru: "Публичный",
        en: "Public",
        uk: "Публічний",
        ro: "Public"
      },
      trakt_list_created: {
        ru: "Список создан",
        en: "List created",
        uk: "Список створено",
        ro: "Listă creată"
      },
      trakt_list_create_error: {
        ru: "Ошибка создания списка",
        en: "Failed to create list",
        uk: "Помилка створення списку",
        ro: "Eroare la crearea listei"
      },
      trakt_list_edit: {
        ru: "Редактировать список",
        en: "Edit list",
        uk: "Редагувати список",
        ro: "Editează lista"
      },
      trakt_list_updated: {
        ru: "Список обновлен",
        en: "List updated",
        uk: "Список оновлено",
        ro: "Listă actualizată"
      },
      trakt_list_edit_error: {
        ru: "Ошибка обновления списка",
        en: "Failed to update list",
        uk: "Помилка оновлення списку",
        ro: "Eroare la actualizarea listei"
      },
      trakt_list_delete: {
        ru: "Удалить список",
        en: "Delete list",
        uk: "Видалити список",
        ro: "Șterge lista"
      },
      trakt_list_confirm_delete: {
        ru: "Удалить этот список?",
        en: "Delete this list?",
        uk: "Видалити цей список?",
        ro: "Ștergeți această listă?"
      },
      trakt_list_delete_confirm_action: {
        ru: "Удалить",
        en: "Delete",
        uk: "Видалити",
        ro: "Șterge"
      },
      trakt_list_deleted: {
        ru: "Список удален",
        en: "List deleted",
        uk: "Список видалено",
        ro: "Listă ștearsă"
      },
      trakt_list_delete_error: {
        ru: "Ошибка удаления списка",
        en: "Failed to delete list",
        uk: "Помилка видалення списку",
        ro: "Eroare la ștergerea listei"
      },
      trakt_add_to_list_action: {
        ru: "Добавить в список",
        en: "Add to list",
        uk: "Додати до списку",
        ro: "Adaugă în listă"
      },
      trakt_remove_from_list_action: {
        ru: "Удалить из списка",
        en: "Remove from list",
        uk: "Прибрати зі списку",
        ro: "Elimină din listă"
      },
      trakt_remove_from_list: {
        ru: "Удалить из этого списка",
        en: "Remove from this list",
        uk: "Прибрати з цього списку",
        ro: "Elimină din această listă"
      },
      trakt_item_added_to_list: {
        ru: "Элемент добавлен в список",
        en: "Item added to list",
        uk: "Елемент додано до списку",
        ro: "Element adăugat în listă"
      },
      trakt_item_removed_from_list: {
        ru: "Элемент удален из списка",
        en: "Item removed from list",
        uk: "Елемент прибрано зі списку",
        ro: "Element eliminat din listă"
      },
      trakt_remove_from_list_error: {
        ru: "Ошибка удаления элемента из списка",
        en: "Failed to remove item from list",
        uk: "Помилка видалення елемента зі списку",
        ro: "Eroare la eliminarea elementului"
      },
      trakt_list_action_error: {
        ru: "Ошибка операции со списком",
        en: "List action failed",
        uk: "Помилка операції зі списком",
        ro: "Eroare operațiune listă"
      },
      trakt_list_limit_reached: {
        ru: "Достигнут лимит списков Trakt",
        en: "Trakt lists limit reached",
        uk: "Досягнуто ліміт списків Trakt",
        ro: "Limita listelor Trakt a fost atinsă"
      },
      trakt_list_conflict: {
        ru: "Элемент уже есть в списке",
        en: "Item is already in this list",
        uk: "Елемент уже є у цьому списку",
        ro: "Elementul este deja în listă"
      },
      trakt_lists_button: {
        ru: "TraktTV Списки",
        en: "TraktTV lists",
        uk: "TraktTV Списки",
        ro: "TraktTV Liste"
      },
      trakt_lists_button_in_watchlist: {
        ru: "В watchlist",
        en: "In watchlist",
        uk: "У watchlist",
        ro: "În watchlist"
      },
      trakt_manage_lists_title: {
        ru: "Управление списками",
        en: "Manage lists",
        uk: "Керування списками",
        ro: "Gestionare liste"
      },
      trakt_watchlist_action_error: {
        ru: "Ошибка операции с watchlist",
        en: "Watchlist action failed",
        uk: "Помилка операції з watchlist",
        ro: "Eroare operațiune watchlist"
      },
      trakttv_user_info: {
        ru: "Пользователь Trakt.TV",
        en: "Trakt.TV User",
        uk: "Користувач Trakt.TV",
        ro: "Utilizator Trakt.TV"
      },
      trakttv_username: {
        ru: "Имя пользователя",
        en: "Username",
        uk: "Ім'я користувача",
        ro: "Nume utilizator"
      },
      trakttv_vip_status: {
        ru: "VIP",
        en: "VIP",
        uk: "VIP",
        ro: "VIP"
      },
      trakttv_vip_enabled: {
        ru: "Активирован",
        en: "Activated",
        uk: "Активовано",
        ro: "Activat"
      },
      trakttv_vip_disabled: {
        ru: "Не активирован",
        en: "Not activated",
        uk: "Не активовано",
        ro: "Neactivat"
      },
      trakttv_movies: {
        ru: "Фильмы",
        en: "Movies",
        uk: "Фільми",
        ro: "Filme"
      },
      trakttv_watchlist_tab_movies: {
        ru: "Фильмы",
        en: "Movies",
        uk: "Фільми",
        ro: "Filme"
      },
      trakttv_watchlist_tab_shows: {
        ru: "Сериалы",
        en: "Shows",
        uk: "Серіали",
        ro: "Seriale"
      },
      trakttv_watchlist_sort_more: {
        ru: "Ещё",
        en: "More",
        uk: "Ще",
        ro: "Mai mult"
      },
      trakttv_watchlist_sort_more_title: {
        ru: "Другие сортировки",
        en: "More sorting",
        uk: "Інші сортування",
        ro: "Mai multe sortări"
      },
      trakttv_watchlist_sort_rank: {
        ru: "Ранг",
        en: "Rank",
        uk: "Ранг",
        ro: "Rang"
      },
      trakttv_watchlist_sort_added: {
        ru: "Дата добавления",
        en: "Added",
        uk: "Дата додавання",
        ro: "Data adăugării"
      },
      trakttv_watchlist_sort_title: {
        ru: "Название",
        en: "Title",
        uk: "Назва",
        ro: "Titlu"
      },
      trakttv_watchlist_sort_released: {
        ru: "Релиз",
        en: "Released",
        uk: "Реліз",
        ro: "Lansare"
      },
      trakttv_watchlist_sort_runtime: {
        ru: "Длительность",
        en: "Runtime",
        uk: "Тривалість",
        ro: "Durată"
      },
      trakttv_watchlist_sort_popularity: {
        ru: "Популярность",
        en: "Popularity",
        uk: "Популярність",
        ro: "Popularitate"
      },
      trakttv_watchlist_sort_random: {
        ru: "Случайно",
        en: "Random",
        uk: "Випадково",
        ro: "Aleatoriu"
      },
      trakttv_watchlist_sort_percentage: {
        ru: "Процент",
        en: "Percentage",
        uk: "Відсоток",
        ro: "Procent"
      },
      trakttv_watchlist_sort_imdb_rating: {
        ru: "Рейтинг IMDb",
        en: "IMDb rating",
        uk: "Рейтинг IMDb",
        ro: "Rating IMDb"
      },
      trakttv_watchlist_sort_tmdb_rating: {
        ru: "Рейтинг TMDB",
        en: "TMDB rating",
        uk: "Рейтинг TMDB",
        ro: "Rating TMDB"
      },
      trakttv_watchlist_sort_rt_tomatometer: {
        ru: "RT Tomatometer",
        en: "RT Tomatometer",
        uk: "RT Tomatometer",
        ro: "RT Tomatometer"
      },
      trakttv_watchlist_sort_rt_audience: {
        ru: "RT Audience",
        en: "RT Audience",
        uk: "RT Audience",
        ro: "RT Audience"
      },
      trakttv_watchlist_sort_metascore: {
        ru: "Metascore",
        en: "Metascore",
        uk: "Metascore",
        ro: "Metascore"
      },
      trakttv_watchlist_sort_votes: {
        ru: "Голоса",
        en: "Votes",
        uk: "Голоси",
        ro: "Voturi"
      },
      trakttv_watchlist_sort_imdb_votes: {
        ru: "Голоса IMDb",
        en: "IMDb votes",
        uk: "Голоси IMDb",
        ro: "Voturi IMDb"
      },
      trakttv_watchlist_sort_tmdb_votes: {
        ru: "Голоса TMDB",
        en: "TMDB votes",
        uk: "Голоси TMDB",
        ro: "Voturi TMDB"
      },
      trakttv_watchlist_sort_my_rating: {
        ru: "Моя оценка",
        en: "My rating",
        uk: "Моя оцінка",
        ro: "Evaluarea mea"
      },
      trakttv_watchlist_sort_watched: {
        ru: "Просмотрено",
        en: "Watched",
        uk: "Переглянуто",
        ro: "Vizionat"
      },
      trakttv_watchlist_sort_collected: {
        ru: "В коллекции",
        en: "Collected",
        uk: "У колекції",
        ro: "În colecție"
      },
      trakttv_watchlist_sort_vip_required: {
        ru: "Это сортирование доступно только для Trakt VIP",
        en: "This sorting is available only for Trakt VIP users",
        uk: "Це сортування доступне лише для Trakt VIP",
        ro: "Această sortare este disponibilă doar pentru Trakt VIP"
      },
      trakttv_episodes: {
        ru: "Эпизоды",
        en: "Episodes",
        uk: "Епізоди",
        ro: "Episoade"
      },
      trakttv_code: {
        ru: "Код",
        en: "Code",
        uk: "Код",
        ro: "Cod"
      },
      trakttv_auth: {
        ru: "Авторизация Trakt",
        en: "Trakt Auth",
        uk: "Авторизація Trakt",
        ro: "Autorizare Trakt"
      },
      trakttv_enable_watching: {
        ru: "Включить отслеживание просмотра",
        en: "Enable watch tracking",
        uk: "Ввімкнути відстеження перегляду",
        ro: "Activare urmărire vizionare"
      },
      trakttv_enable_watching_descr: {
        ru: "Автоматически отмечать просмотренные эпизоды и добавлять сериалы в \"Смотрю\"",
        en: "Automatically mark watched episodes and add series to \"Watching\"",
        uk: "Автоматично позначати переглянуті епізоди та додавати серіали в \"Дивлюся\"",
        ro: "Marchează automat episoadele vizionate și adaugă serialele în „Vizionare”"
      },
      trakttv_min_progress_threshold: {
        ru: "Порог просмотра",
        en: "Viewing threshold",
        uk: "Поріг перегляду",
        ro: "Prag vizionare"
      },
      trakttv_min_progress_threshold_descr: {
        ru: "Минимальный процент просмотра для отметки эпизода на Trakt.TV",
        en: "Minimum percentage of viewing to mark an episode on Trakt.TV",
        uk: "Мінімальний відсоток перегляду для позначення епізоду на Trakt.TV",
        ro: "Procent minim de vizionare pentru a marca un episod pe Trakt.TV"
      },
      trakttv_nav_sync: {
        ru: "Синхронизация списков",
        en: "Lists sync",
        uk: "Синхронізація списків",
        ro: "Sincronizare liste"
      },
      trakttv_nav_source: {
        ru: "Настройки источника",
        en: "Source settings",
        uk: "Налаштування джерела",
        ro: "Setări sursă"
      },
      trakttv_card_type_tv: {
        ru: "TV",
        en: "TV",
        uk: "TV",
        ro: "TV"
      },
      trakt_list_title_named: {
        ru: "Список - {name}",
        en: "List - {name}",
        uk: "Список - {name}",
        ro: "Listă - {name}"
      },
      trakttv_movie_id_missed: {
        ru: "Отсутствует ID фильма",
        en: "Movie ID is missing",
        uk: "Відсутній ID фільму",
        ro: "Lipsește ID-ul filmului"
      },
      trakttv_show_id_missed: {
        ru: "Отсутствует ID сериала",
        en: "Show ID is missing",
        uk: "Відсутній ID серіалу",
        ro: "Lipsește ID-ul serialului"
      },
      trakttv_unknown_content: {
        ru: "Неизвестный тип контента",
        en: "Unknown content type",
        uk: "Невідомий тип контенту",
        ro: "Tip conținut necunoscut"
      },
      trakttv_show_not_found: {
        ru: "Сериал не найден в Trakt",
        en: "Show not found in Trakt",
        uk: "Серіал не знайдено в Trakt",
        ro: "Serialul nu a fost găsit pe Trakt"
      },
      trakttv_params_missed: {
        ru: "Отсутствуют параметры",
        en: "Params is missing",
        uk: "Відсутні параметри",
        ro: "Parametri lipsă"
      },
      trakttv_media_id_missed: {
        ru: "Отсутствует ID медиа",
        en: "Media ID is missing",
        uk: "Відсутній ID медіа",
        ro: "Lipsește ID-ul media"
      },
      trakttv_list_id_missed: {
        ru: "Отсутствует ID списка",
        en: "List ID is missing",
        uk: "Відсутній ID списку",
        ro: "Lipsește ID-ul listei"
      },
      trakttv_upnext: {
        ru: "Смотреть дальше",
        en: "Up Next",
        uk: "Дивитись далі",
        ro: "Progres vizionare"
      },
      trakttv_topshelf: {
        ru: "Top Shelf (Apple TV)",
        en: "Top Shelf (Apple TV)",
        uk: "Top Shelf (Apple TV)",
        ro: "Top Shelf (Apple TV)"
      },
      trakttv_topshelf_descr: {
        ru: "Обновлять Top Shelf на Apple TV",
        en: "Update Top Shelf on Apple TV",
        uk: "Оновлювати Top Shelf на Apple TV",
        ro: "Actualizează Top Shelf pe Apple TV"
      },
      trakt_bookmarks_sync_section: {
        ru: "Синхронизация списков Lampa",
        en: "Lampa lists sync",
        uk: "Синхронізація списків Lampa",
        ro: "Sincronizare liste Lampa"
      },
      trakt_bookmarks_mode: {
        ru: "Режим синхронизации",
        en: "Sync mode",
        uk: "Режим синхронізації",
        ro: "Mod sincronizare"
      },
      trakt_bookmarks_mode_watchlist: {
        ru: "Watchlist",
        en: "Watchlist",
        uk: "Watchlist",
        ro: "Watchlist"
      },
      trakt_bookmarks_mode_my_lists: {
        ru: "Мои списки",
        en: "My Lists",
        uk: "Мої списки",
        ro: "Listele mele"
      },
      trakt_bookmarks_local_type: {
        ru: "Локальный список Lampa",
        en: "Local Lampa list",
        uk: "Локальний список Lampa",
        ro: "Listă locală Lampa"
      },
      trakt_bookmarks_local_type_description: {
        ru: "Выберите локальный тип, который нужно импортировать или экспортировать",
        en: "Choose which local list type to import or export",
        uk: "Оберіть локальний тип, який треба імпортувати або експортувати",
        ro: "Alegeți tipul listei locale pentru import sau export"
      },
      trakt_bookmarks_import_button: {
        ru: "Импортировать выбранный список из Trakt",
        en: "Import selected list from Trakt",
        uk: "Імпортувати вибраний список з Trakt",
        ro: "Importă lista selectată din Trakt"
      },
      trakt_bookmarks_export_button: {
        ru: "Экспортировать выбранный список в Trakt",
        en: "Export selected list to Trakt",
        uk: "Експортувати вибраний список у Trakt",
        ro: "Exportă lista selectată în Trakt"
      },
      trakt_bookmarks_auth_required: {
        ru: "Сначала войдите в Trakt.TV",
        en: "Login to Trakt.TV first",
        uk: "Спочатку увійдіть у Trakt.TV",
        ro: "Mai întâi autentificați-vă pe Trakt.TV"
      },
      trakt_bookmarks_local_unavailable: {
        ru: "Локальное избранное недоступно",
        en: "Local favorites are unavailable",
        uk: "Локальне вибране недоступне",
        ro: "Favoritele locale sunt indisponibile"
      },
      trakt_bookmarks_operation_in_progress: {
        ru: "Синхронизация уже выполняется",
        en: "Sync is already running",
        uk: "Синхронізація вже виконується",
        ro: "Sincronizarea este deja în curs"
      },
      trakt_bookmarks_import_start: {
        ru: "Запуск импорта списка",
        en: "Starting list import",
        uk: "Запуск імпорту списку",
        ro: "Pornire import listă"
      },
      trakt_bookmarks_export_start: {
        ru: "Запуск экспорта списка",
        en: "Starting list export",
        uk: "Запуск експорту списку",
        ro: "Pornire export listă"
      },
      trakt_bookmarks_progress_prepare: {
        ru: "Подготовка",
        en: "Preparing",
        uk: "Підготовка",
        ro: "Pregătire"
      },
      trakt_bookmarks_progress_loading_source: {
        ru: "Загрузка источника",
        en: "Loading source",
        uk: "Завантаження джерела",
        ro: "Încărcare sursă"
      },
      trakt_bookmarks_progress_loading_target: {
        ru: "Загрузка цели",
        en: "Loading target",
        uk: "Завантаження цілі",
        ro: "Încărcare destinație"
      },
      trakt_bookmarks_progress_import: {
        ru: "Импорт элементов",
        en: "Importing items",
        uk: "Імпорт елементів",
        ro: "Importare elemente"
      },
      trakt_bookmarks_progress_export: {
        ru: "Экспорт элементов",
        en: "Exporting items",
        uk: "Експорт елементів",
        ro: "Exportare elemente"
      },
      trakt_bookmarks_import_select_list: {
        ru: "Выберите список для импорта",
        en: "Select list to import",
        uk: "Оберіть список для імпорту",
        ro: "Selectați lista pentru import"
      },
      trakt_bookmarks_export_select_list: {
        ru: "Выберите список для экспорта",
        en: "Select list to export",
        uk: "Оберіть список для експорту",
        ro: "Selectați lista pentru export"
      },
      trakt_bookmarks_no_lists: {
        ru: "Нет персональных списков",
        en: "No personal lists found",
        uk: "Немає персональних списків",
        ro: "Nicio listă personală găsită"
      },
      trakt_bookmarks_lists_load_error: {
        ru: "Не удалось загрузить персональные списки",
        en: "Failed to load personal lists",
        uk: "Не вдалося завантажити персональні списки",
        ro: "Eroare la încărcarea listelor personale"
      },
      trakt_bookmarks_added: {
        ru: "Добавлено",
        en: "Added",
        uk: "Додано",
        ro: "Adăugat"
      },
      trakt_bookmarks_duplicates: {
        ru: "Дубликаты",
        en: "Duplicates",
        uk: "Дублікати",
        ro: "Duplicate"
      },
      trakt_bookmarks_skipped_unsupported: {
        ru: "Пропущено (без TMDB)",
        en: "Skipped (no TMDB)",
        uk: "Пропущено (без TMDB)",
        ro: "Omis (fără TMDB)"
      },
      trakt_bookmarks_failed: {
        ru: "Ошибки",
        en: "Failed",
        uk: "Помилки",
        ro: "Eșuat"
      },
      trakt_bookmarks_import_done: {
        ru: "Импорт завершен",
        en: "Import completed",
        uk: "Імпорт завершено",
        ro: "Import finalizat"
      },
      trakt_bookmarks_export_done: {
        ru: "Экспорт завершен",
        en: "Export completed",
        uk: "Експорт завершено",
        ro: "Export finalizat"
      },
      trakt_bookmarks_canceled: {
        ru: "Операция отменена",
        en: "Operation canceled",
        uk: "Операцію скасовано",
        ro: "Operațiune anulată"
      },
      trakt_bookmarks_sync_failed: {
        ru: "Ошибка синхронизации списка",
        en: "List sync failed",
        uk: "Помилка синхронізації списку",
        ro: "Sincronizare listă eșuată"
      },
      trakttv_scan_qr_code: {
        ru: "Отсканируйте QR-код",
        en: "Scan QR code",
        uk: "Відскануйте QR-код",
        ro: "Scanați codul QR"
      },
      trakttv_scan_qr: {
        ru: "Отсканируйте QR-код",
        en: "Scan QR code",
        uk: "Відскануйте QR-код",
        ro: "Scanați codul QR"
      },
      trakttv_check_now: {
        ru: "Проверить",
        en: "Check now",
        uk: "Перевірити",
        ro: "Verifică"
      },
      trakttv_settings_thanks: {
        ru: "Подяка",
        en: "Thanks",
        uk: "Подяка",
        ro: "Mulțumesc"
      },
      trakttv_settings_thanks_description: {
        ru: "Поддержка развития TraktTV-плагина добровольная. Спасибо за вклад.",
        en: "Support for TraktTV plugin development is voluntary. Thank you for your contribution.",
        uk: "Підтримка розвитку плагіна TraktTV добровільна. Дякуємо за внесок.",
        ro: "Susținerea dezvoltării plugin-ului TraktTV este voluntară. Vă mulțumim pentru contribuție."
      },
      trakttv_seconds: {
        ru: "сек",
        en: "sec",
        uk: "сек",
        ro: "sec"
      },
      trakttv_scrobble_interval: {
        ru: "Интервал скробблинга",
        en: "Scrobble interval",
        uk: "Інтервал скроблінгу",
        ro: "Interval scrobble"
      },
      trakttv_scrobble_interval_descr: {
        ru: "Как часто синхронизировать прогресс во время просмотра",
        en: "How often to sync progress during playback",
        uk: "Як часто синхронізувати прогрес під час перегляду",
        ro: "Cât de des să sincronizezi progresul în timpul redării"
      },
      trakttv_scrobble_queue_enabled: {
        ru: "Офлайн-очередь",
        en: "Offline queue",
        uk: "Офлайн-черга",
        ro: "Coadă offline"
      },
      trakttv_scrobble_queue_descr: {
        ru: "Сохранять скробблинг при отсутствии сети и отправлять позже",
        en: "Save pending scrobbles when offline and send later",
        uk: "Зберігати скроблінг при відсутності мережі та надсилати пізніше",
        ro: "Salvează scrobble-urile în așteptare când ești offline și trimite mai târziu"
      },
      trakttv_scrobble_resumed: {
        ru: "Прогресс восстановлен из Trakt",
        en: "Progress restored from Trakt",
        uk: "Прогрес відновлено з Trakt",
        ro: "Progres restabilit din Trakt"
      },
      trakttv_scrobble_started: {
        ru: "Скробблинг запущен",
        en: "Scrobbling started",
        uk: "Скроблінг запущено",
        ro: "Scrobble a început"
      },
      trakttv_scrobble_queue_processed: {
        ru: "Офлайн-очередь скробблинга обработана",
        en: "Scrobble offline queue processed",
        uk: "Офлайн-чергу скроблінгу оброблено",
        ro: "Coada offline de scrobble a fost procesată"
      }
    });
  }

  /**
   * Утиліти для TraktTV timetable
   */

  /**
   * Повертає сьогоднішню дату у форматі YYYY-MM-DD
   */
  function getTodayString() {
    var now = new Date();
    var yyyy = now.getFullYear();
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var dd = String(now.getDate()).padStart(2, '0');
    return "".concat(yyyy, "-").concat(mm, "-").concat(dd);
  }

  /**
   * Нормалізує URL постера
   * @param {Array<string>} posterArr
   * @returns {string}
   */
  function normalizePoster(posterArr) {
    if (!Array.isArray(posterArr) || !posterArr[0]) return '';
    var url = posterArr[0];
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return 'https:' + url;
    if (url.startsWith('walter-')) return 'https://' + url;
    return url;
  }

  function TraktTimetableAll() {
    var _this2 = this;
    var Scroll = Lampa.Scroll;
    var Activity = Lampa.Activity;
    var Modal = Lampa.Modal;
    var Template = Lampa.Template;
    var Empty = Lampa.Empty;
    this.activity = null;
    this._destroyed = false;
    var scroll = new Scroll({
      mask: true,
      over: true,
      step: 300
    });
    var html = $('<div></div>');
    var body = $('<div class="timetable"></div>');
    var last;
    var DAYS = 31;
    var episodeTypes = [{
      key: 'series_finale',
      color: '#8d6e63'
    }, {
      key: 'season_finale',
      color: '#e74c3c'
    }, {
      key: 'mid_season_finale',
      color: '#fbc02d'
    }, {
      key: 'series_premiere',
      color: '#40b3ff'
    }, {
      key: 'season_premiere',
      color: '#29b6f6'
    }, {
      key: 'mid_season_premiere',
      color: '#7e57c2'
    }, {
      key: 'standard',
      color: '#aaa'
    }];
    function groupEpisodesByDate(episodes) {
      var grouped = {};
      episodes.forEach(function (ep) {
        if (!grouped[ep.air_date]) grouped[ep.air_date] = [];
        grouped[ep.air_date].push(ep);
      });
      return grouped;
    }
    function groupEpisodesByShow(episodes) {
      var byShow = {};
      episodes.forEach(function (ep) {
        var sid = ep.card.id;
        if (!byShow[sid]) byShow[sid] = {
          card: ep.card,
          episodes: []
        };
        byShow[sid].episodes.push(ep);
      });
      return byShow;
    }
    function prepareTimetableData(traktData) {
      var shows = {};
      traktData.forEach(function (item) {
        var tmdbId = item.show.ids.tmdb;
        if (!tmdbId) return;
        var posterUrl = '';
        if (item.show.images && Array.isArray(item.show.images.poster)) {
          posterUrl = normalizePoster(item.show.images.poster);
        }
        if (!shows[tmdbId]) {
          shows[tmdbId] = {
            id: tmdbId,
            season: item.episode.season,
            episodes: [],
            card: {
              id: tmdbId,
              name: item.show.title,
              poster: posterUrl,
              source: 'tmdb'
            }
          };
        }
        shows[tmdbId].episodes.push({
          air_date: item.first_aired ? item.first_aired.slice(0, 10) : '',
          season_number: item.episode.season,
          episode_number: item.episode.number,
          episode_type: item.episode.episode_type,
          name: item.episode.title,
          still_path: '',
          card: shows[tmdbId].card
        });
      });
      return Object.values(shows).flatMap(function (show) {
        return show.episodes.map(function (ep) {
          return _objectSpread2(_objectSpread2({}, ep), {}, {
            card: show.card
          });
        });
      });
    }
    function fetchTraktCalendar() {
      return _fetchTraktCalendar.apply(this, arguments);
    }
    function _fetchTraktCalendar() {
      _fetchTraktCalendar = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var dateString;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              dateString = getTodayString();
              _context2.p = 1;
              _context2.n = 2;
              return api$1.get("/calendars/my/shows/".concat(dateString, "/").concat(DAYS, "?extended=images,full"));
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              Lampa.Bell.push({
                text: Lampa.Lang.translate('trakttv_calendar_error')
              });
              return _context2.a(2, []);
          }
        }, _callee2, null, [[1, 3]]);
      }));
      return _fetchTraktCalendar.apply(this, arguments);
    }
    this.create = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(activityBody) {
        var _this = this;
        var traktData, episodes, groupedByDate, startDate, dates, i, d, y, m, day, hasAny;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (this.activity) this.activity.loader(true);
              _context.n = 1;
              return fetchTraktCalendar();
            case 1:
              traktData = _context.v;
              if (!this._destroyed) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              episodes = prepareTimetableData(traktData);
              groupedByDate = groupEpisodesByDate(episodes);
              startDate = new Date();
              dates = [];
              for (i = 0; i < DAYS; i++) {
                d = new Date(startDate);
                d.setDate(startDate.getDate() + i);
                y = d.getFullYear();
                m = String(d.getMonth() + 1).padStart(2, '0');
                day = String(d.getDate()).padStart(2, '0');
                dates.push("".concat(y, "-").concat(m, "-").concat(day));
              }
              hasAny = false;
              dates.forEach(function (date) {
                if ((groupedByDate[date] || []).length) hasAny = true;
                _this.append(date, groupedByDate[date] || []);
              });
              if (!hasAny) this.empty();
              scroll.minus(); // scroll готовий до рендеру
              scroll.append(body); // додаємо body в scroll
              html.append(scroll.render()); // додаємо scroll в html

              if (this.activity) this.activity.loader(false);

              // Зберігаємо посилання для контролера
              this.body = body;
              this.scroll = scroll;
              this.html = html;

              // Відразу активуємо фокус
              if (this.activity && typeof this.activity.toggle === 'function') {
                this.activity.toggle();
              }
              if (activityBody) {
                activityBody.append(html);
              }
              return _context.a(2, this.render());
          }
        }, _callee, this);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    this.empty = function () {
      var empty = new Empty({
        descr: Lampa.Lang.translate('trakttv_no_upcoming')
      });
      html.append(empty.render());
      _this2.start = empty.start;
      if (_this2.activity) _this2.activity.loader(false);
    };
    this.append = function (date, eps) {
      var item = $("\n            <div class=\"timetable__item selector\">\n                <div class=\"timetable__inner\">\n                    <div class=\"timetable__date\">".concat(date, "</div>\n                    <div class=\"timetable__body\"></div>\n                </div>\n            </div>\n        "));
      if (eps.length) {
        var byShow = groupEpisodesByShow(eps);
        Object.values(byShow).forEach(function (show) {
          var card = show.card;
          var typesSet = _toConsumableArray(new Set(show.episodes.map(function (ep) {
            return ep.episode_type;
          }).filter(Boolean)));
          var foundType = episodeTypes.find(function (typeObj) {
            return typesSet.includes(typeObj.key);
          }) || episodeTypes[episodeTypes.length - 1];
          var mainTypeKey = foundType.key;
          var mainTypeColor = foundType.color;
          item.find('.timetable__body').append("\n                    <div>\n                        <span title=\"".concat(mainTypeKey, "\" style=\"display:inline-block;width:0.9em;height:0.9em;border-radius:0.2em;margin-right:0.3em;background:").concat(mainTypeColor, ";vertical-align:middle\"></span>\n                        ").concat(card.name || '', "\n                    </div>\n                "));
        });
        item.addClass('timetable__item--any');
      } else {
        item.find('.timetable__body').append("<div class=\"timetable__empty\">".concat(Lampa.Lang.translate('trakttv_no_series'), "</div>"));
      }
      item.on('hover:focus', function () {
        last = $(this)[0];
        scroll.update($(this)); // ВАЖЛИВО! Оновлення скролу
      }).on('hover:hover', function () {
        last = $(this)[0];
      }).on('hover:enter', function () {
        last = $(this)[0];
        if (eps.length) {
          var _byShow = groupEpisodesByShow(eps);
          var modal = $('<div></div>');
          Object.values(_byShow).forEach(function (show) {
            var card = show.card;
            var noty = Template.get('notice_card', {
              time: date,
              title: card.name,
              descr: show.episodes.map(function (ep) {
                return "S: <b>".concat(ep.season_number, "</b> E: <b>").concat(ep.episode_number, "</b> \u2014 ").concat(ep.name);
              }).join('<br>')
            });
            noty.find('.notice__img').remove();
            if (card.poster) {
              noty.find('.notice__left').css('margin-right', '5em');
              noty.find('.notice__left').prepend("<img src=\"".concat(card.poster, "\" style=\"max-width:120px;max-height:170px;display:block;margin-bottom:1em;\">"));
            }
            noty.on('hover:enter', function () {
              Modal.close();
              Activity.push({
                url: '',
                component: 'full',
                id: card.id,
                method: 'tv',
                card: card,
                source: card.source
              });
            });
            modal.append(noty);
          });
          Modal.open({
            title: "".concat(Lampa.Lang.translate('trakttv_episodes_on'), " ").concat(date),
            size: 'medium',
            html: modal,
            onBack: function onBack() {
              Modal.close();
              Lampa.Controller.toggle('content');
            }
          });
        }
      });
      body.append(item);
    };
    this.back = function () {
      Activity.backward();
    };
    this.start = function () {
      if (this.activity) this.activity.loader(false);
      Lampa.Controller.add('content', {
        link: this,
        toggle: function toggle() {
          Lampa.Controller.collectionSet(scroll.render());
          if (!last) {
            last = body.find('.timetable__item.selector').get(0);
          }
          Lampa.Controller.collectionFocus(last || false, scroll.render());
        },
        left: function left() {
          if (typeof Navigator !== 'undefined' && Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
        },
        right: function right() {
          if (typeof Navigator !== 'undefined' && Navigator.canmove('right')) Navigator.move('right');else Navigator.move('right');
        },
        up: function up() {
          if (typeof Navigator !== 'undefined' && Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
        },
        down: function down() {
          if (typeof Navigator !== 'undefined' && Navigator.canmove('down')) Navigator.move('down');
        },
        back: this.back
      });
      Lampa.Controller.toggle('content');
    };
    this.pause = function () {};
    this.stop = function () {};
    this.render = function () {
      return html;
    };
    this.destroy = function () {
      this._destroyed = true;
      scroll.destroy();
      html.remove();
      this.body = null;
      this.html = null;
      this.scroll = null;
      this.activity = null;
      last = null;
    };
  }

  /**
   * Файл з SVG іконками для використання в плагіні
   * Це дозволяє уникнути дублювання коду та легко змінювати іконки
   */

  // Стилі для заголовків з іконками
  var HEADER_STYLE = 'display:flex; align-items:center; gap:10px;';
  var ICON_STYLE = 'width:52px; height:52px;';
  var LINE_TITLE_STYLE = 'display:inline-flex; align-items:center; gap:.4em;';
  var LINE_ICON_STYLE = 'width:1em; height:1em; display:inline-block;';
  var TRAKT_ICON_CLASS = 'trakt-brand-icon';

  // Основна іконка Trakt.TV
  var TRAKT_ICON = "<svg class=\"".concat(TRAKT_ICON_CLASS, "\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" aria-hidden=\"true\" focusable=\"false\">\n  <path fill=\"currentColor\" d=\"M47.87,9.58c-.05-.39-.13-.77-.23-1.15-.19-.74-.46-1.45-.79-2.14-.15-.3-.31-.6-.5-.88-.36-.6-.77-1.16-1.24-1.69C43.03,1.43,40.05,0,36.73,0H11.26C5.04,0,0,5.05,0,11.27v25.48C0,42.96,5.04,48,11.26,48h25.47c6.22,0,11.27-5.04,11.27-11.26V11.27c0-.57-.04-1.13-.13-1.69ZM47,36.74c0,5.66-4.61,10.25-10.26,10.25H11.26c-5.66,0-10.25-4.6-10.25-10.25V11.27C1,5.61,5.6,1,11.26,1h25.47c3.04,0,5.77,1.33,7.66,3.43l-22.85,22.86-8.62-8.62-1.46,1.46,14.4,14.4,1.46-1.47-4.31-4.31L45.61,6.14c.18.29.33.6.47.91l-21.69,21.7,3.62,3.62,1.46-1.46-2.16-2.16,19.47-19.48c.08.4.14.8.17,1.21l-18.26,18.27,1.46,1.46,16.83-16.84v23.36ZM15.77,15.82l7.93,7.93,1.46-1.48-7.93-7.92-1.46,1.46ZM13.62,17.98l7.92,7.93,1.47-1.48-7.93-7.92-1.46,1.47ZM6.67,35.12V12.88c0-3.42,2.78-6.2,6.2-6.2h20.79v-2.08H12.87c-4.56,0-8.28,3.71-8.28,8.28v22.23c0,4.57,3.72,8.29,8.28,8.29h22.24c4.57,0,8.28-3.72,8.28-8.29v-3.51h-2.08v3.51c0,3.42-2.78,6.21-6.2,6.21H12.87c-3.42,0-6.2-2.79-6.2-6.21Z\"/>\n</svg>");

  // Іконка для watchlist
  var WATCHLIST_ICON = "<svg fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z\"/></svg>";

  // Іконка для історії (галочка)
  var HISTORY_ICON = "<svg fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z\"/></svg>";

  // Функція для створення заголовка з іконкою
  function createHeaderWithIcon(icon, text) {
    return "<div class=\"trakt-header\" style=\"".concat(HEADER_STYLE, "\"><div class=\"trakt-icon\" style=\"").concat(ICON_STYLE, "\">").concat(icon, "</div><div class=\"trakt-title\">").concat(text, "</div></div>");
  }
  function createLineTitle(text) {
    var sizedIcon = TRAKT_ICON.replace('<svg ', "<svg style=\"width:100%; height:100%; display:block;\" ");
    var root = document.createElement('span');
    root.className = 'trakt-line-title';
    root.setAttribute('style', LINE_TITLE_STYLE);
    var iconWrap = document.createElement('span');
    iconWrap.className = 'trakt-line-title__icon';
    iconWrap.setAttribute('style', LINE_ICON_STYLE);
    iconWrap.innerHTML = sizedIcon;
    var label = document.createElement('span');
    label.textContent = text;
    root.appendChild(iconWrap);
    root.appendChild(label);
    return root;
  }

  // Експортуємо всі іконки та утиліти
  var icons = {
    TRAKT_ICON: TRAKT_ICON,
    WATCHLIST_ICON: WATCHLIST_ICON,
    HISTORY_ICON: HISTORY_ICON,
    HEADER_STYLE: HEADER_STYLE,
    ICON_STYLE: ICON_STYLE,
    createHeaderWithIcon: createHeaderWithIcon,
    createLineTitle: createLineTitle
  };

  function t$2(key) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    try {
      var translated = Lampa.Lang.translate(key);
      return translated || fallback || key;
    } catch (e) {
      return fallback || key;
    }
  }
  function notify(text) {
    Lampa.Bell.push({
      text: text
    });
  }
  function normalizeCardParams(cardData) {
    var _cardData$movie, _cardData$data;
    var source = (cardData === null || cardData === void 0 ? void 0 : cardData.movie) || (cardData === null || cardData === void 0 ? void 0 : cardData.card) || (cardData === null || cardData === void 0 ? void 0 : cardData.data) || cardData || {};
    var method = (cardData === null || cardData === void 0 ? void 0 : cardData.method) || source.method || source.card_type || (source.first_air_date || source.name ? 'tv' : 'movie');
    var externalIds = (cardData === null || cardData === void 0 ? void 0 : cardData.external_ids) || source.external_ids || {};
    var ids = _objectSpread2(_objectSpread2({}, source.ids || {}), (cardData === null || cardData === void 0 ? void 0 : cardData.ids) || {});
    var rawId = source.id || (cardData === null || cardData === void 0 ? void 0 : cardData.id) || (cardData === null || cardData === void 0 || (_cardData$movie = cardData.movie) === null || _cardData$movie === void 0 ? void 0 : _cardData$movie.id) || (cardData === null || cardData === void 0 || (_cardData$data = cardData.data) === null || _cardData$data === void 0 ? void 0 : _cardData$data.id) || externalIds.tmdb_id;
    if (!ids.tmdb && externalIds.tmdb_id) ids.tmdb = externalIds.tmdb_id;
    if (!ids.trakt && externalIds.trakt_id) ids.trakt = externalIds.trakt_id;
    if (!ids.imdb && externalIds.imdb_id) ids.imdb = externalIds.imdb_id;
    if (!ids.tmdb && rawId) ids.tmdb = rawId;
    return _objectSpread2(_objectSpread2({}, source), {}, {
      method: method,
      ids: ids,
      id: rawId || ids.tmdb
    });
  }
  function loadMyListsMembership(params, lists) {
    var safeLists = Array.isArray(lists) ? lists : [];
    var checks = safeLists.map(function (list) {
      return api$1.inList({
        listId: list.id,
        item: params,
        limit: 100,
        maxPages: 5
      }).then(function (inList) {
        return _objectSpread2(_objectSpread2({}, list), {}, {
          inList: !!inList
        });
      })["catch"](function () {
        return _objectSpread2(_objectSpread2({}, list), {}, {
          inList: false
        });
      });
    });
    return Promise.all(checks);
  }
  function buildManagerItems(watchlistState, lists) {
    var items = [];
    items.push({
      title: watchlistState ? t$2('trakt_watchlist_remove', 'Remove from watchlist') : t$2('trakt_watchlist_add', 'Add to watchlist'),
      target: 'watchlist',
      inList: !!watchlistState
    });
    (lists || []).forEach(function (list) {
      var listName = (list.list_title || list.title || '').trim();
      if (!listName) return;
      var actionTitle = list.inList ? t$2('trakt_remove_from_list_action', 'Remove from list') : t$2('trakt_add_to_list_action', 'Add to list');
      items.push({
        title: "".concat(listName, " \xB7 ").concat(actionTitle),
        target: 'list',
        listId: list.id,
        listTitle: listName,
        inList: !!list.inList
      });
    });
    return items;
  }
  function updateButtonStyle(button, textNode, isAdded) {
    if (isAdded) {
      button.classList.add('added');
      button.style.color = '#37ff54';
      if (textNode) textNode.textContent = t$2('trakt_lists_button_in_watchlist', 'In watchlist');
    } else {
      button.classList.remove('added');
      button.style.color = '';
      if (textNode) textNode.textContent = t$2('trakt_lists_button', 'Manage lists');
    }
  }
  function refreshButtonState(button, textNode, params) {
    api$1.inWatchlist(params).then(function (isAdded) {
      return updateButtonStyle(button, textNode, !!isAdded);
    })["catch"](function () {
      return updateButtonStyle(button, textNode, false);
    });
  }
  function handleSelectAction(item, params, onDone) {
    if (item.target === 'watchlist') {
      var request = item.inList ? api$1.removeFromWatchlist(params) : api$1.addToWatchlist(params);
      request.then(function () {
        notify(item.inList ? t$2('trakt_watchlist_remove', 'Removed from watchlist') : t$2('trakt_watchlist_add', 'Added to watchlist'));
        if (onDone) onDone();
      })["catch"](function () {
        return notify(t$2('trakt_watchlist_action_error', 'Watchlist action failed'));
      });
      return;
    }
    if (item.target === 'list' && item.listId) {
      var _request = item.inList ? api$1.removeFromList({
        listId: item.listId,
        item: params
      }) : api$1.addToList({
        listId: item.listId,
        item: params
      });
      _request.then(function () {
        notify(item.inList ? t$2('trakt_item_removed_from_list', 'Item removed from list') : t$2('trakt_item_added_to_list', 'Item added to list'));
        if (onDone) onDone();
      })["catch"](function (error) {
        if (error && error.status === 409) {
          notify(t$2('trakt_list_conflict', 'Item is already in this list'));
          return;
        }
        notify(t$2('trakt_list_action_error', 'List action failed'));
      });
    }
  }
  function openListManager(params, button, textNode) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var onBack = typeof options.onBack === 'function' ? options.onBack : function () {
      Lampa.Controller.toggle('content');
    };
    Promise.all([api$1.inWatchlist(params)["catch"](function () {
      return false;
    }), api$1.myLists({
      page: 1,
      limit: 100
    })["catch"](function () {
      return {
        results: []
      };
    })]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        watchlistState = _ref2[0],
        myListsResponse = _ref2[1];
      var lists = myListsResponse && Array.isArray(myListsResponse.results) ? myListsResponse.results : [];
      loadMyListsMembership(params, lists).then(function (withMembership) {
        Lampa.Select.show({
          title: t$2('trakt_manage_lists_title', 'Manage lists'),
          items: buildManagerItems(!!watchlistState, withMembership),
          onSelect: function onSelect(item) {
            handleSelectAction(item, params, function () {
              return refreshButtonState(button, textNode, params);
            });
          },
          onBack: onBack
        });
      });
    })["catch"](function () {
      notify(t$2('trakt_list_action_error', 'List action failed'));
    });
  }
  function openManagerByCard(cardData) {
    var _params$ids, _params$ids2, _params$ids3;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!Lampa.Storage.get('trakt_token')) {
      notify(t$2('trakt_login', 'Login to Trakt.TV'));
      return false;
    }
    var params = normalizeCardParams(cardData);
    if (!params || !params.id && !(params !== null && params !== void 0 && (_params$ids = params.ids) !== null && _params$ids !== void 0 && _params$ids.tmdb) && !(params !== null && params !== void 0 && (_params$ids2 = params.ids) !== null && _params$ids2 !== void 0 && _params$ids2.trakt) && !(params !== null && params !== void 0 && (_params$ids3 = params.ids) !== null && _params$ids3 !== void 0 && _params$ids3.imdb)) {
      notify(t$2('trakt_list_action_error', 'List action failed'));
      return false;
    }
    openListManager(params, null, null, options);
    return true;
  }
  function addWatchlistButton(card) {
    var button = document.createElement('div');
    button.className = 'full-start__button selector watchlist-button trakt-list-manager-button';
    button.innerHTML = "\n        ".concat(icons.WATCHLIST_ICON, "\n        <span>").concat(t$2('trakt_lists_button', 'Manage lists'), "</span>\n    ");
    var textNode = button.querySelector('span');
    var params = normalizeCardParams(card);
    refreshButtonState(button, textNode, params);
    button.on('hover:enter', function () {
      openListManager(params, button, textNode);
    });
    return button;
  }
  var watchlist = {
    addWatchlistButton: addWatchlistButton,
    openManagerByCard: openManagerByCard
  };

  var TraktHistory = {
    // Функція для відображення прогресу перегляду серіалу
    showWatchProgress: function showWatchProgress(data, element) {
      // Перевіряємо чи це серіал
      if (data.movie && data.movie.first_air_date && element.object.method === 'tv') {
        // Отримуємо історію серіалу
        getShowHistory(data.movie.id).then(function (historyData) {
          if (historyData && historyData.length > 0) {
            // Отримуємо останній переглянутий епізод
            var lastWatched = historyData[0];
            if (lastWatched && lastWatched.episode) {
              var _Lampa;
              var season = lastWatched.episode.season;
              var episode = lastWatched.episode.number;
              var hasApplecation = Array.isArray((_Lampa = Lampa) === null || _Lampa === void 0 || (_Lampa = _Lampa.Manifest) === null || _Lampa === void 0 ? void 0 : _Lampa.plugins) && Lampa.Manifest.plugins.some(function (plugin) {
                return plugin && plugin.name === 'Applecation';
              });
              var renderRoot = element.object.activity.render();

              // Для Applecation вставляємо прогрес у блок інформації, перед бейджами якості
              if (hasApplecation) {
                var tryInsertApplecation = function tryInsertApplecation() {
                  var _rootNode$querySelect, _cardRoot$querySelect;
                  var rootNode = renderRoot && renderRoot.get ? renderRoot.get(0) : null;
                  var cardRoot = (rootNode === null || rootNode === void 0 || (_rootNode$querySelect = rootNode.querySelector) === null || _rootNode$querySelect === void 0 ? void 0 : _rootNode$querySelect.call(rootNode, '.full-start-new.applecation')) || document.querySelector('.full-start-new.applecation');
                  var applecationInfo = cardRoot === null || cardRoot === void 0 || (_cardRoot$querySelect = cardRoot.querySelector) === null || _cardRoot$querySelect === void 0 ? void 0 : _cardRoot$querySelect.call(cardRoot, '.applecation__info');
                  if (!applecationInfo) return false;
                  var existingDefault = cardRoot.querySelector('.full-start-new__details.trakt');
                  if (existingDefault) existingDefault.remove();
                  var existingApplecation = applecationInfo.querySelector('.trakt-applecation-progress');
                  if (existingApplecation) existingApplecation.remove();
                  var applecationProgress = document.createElement('span');
                  applecationProgress.className = 'trakt-applecation-progress';
                  applecationProgress.innerHTML = "\n                                        <span class=\"trakt-icon\">".concat(icons.TRAKT_ICON, "</span>\n                                        <span class=\"trakt-applecation-progress__text\">S").concat(season, " \xB7 E").concat(episode, "</span>\n                                    ");
                  var badges = applecationInfo.querySelector('.applecation__quality-badges');
                  if (badges) {
                    badges.before(applecationProgress);
                  } else {
                    applecationInfo.append(applecationProgress);
                  }
                  return true;
                };
                if (tryInsertApplecation()) return;
                var attempts = 0;
                var _retryInsert = function retryInsert() {
                  if (tryInsertApplecation()) return;
                  attempts += 1;
                  if (attempts < 10) setTimeout(_retryInsert, 200);
                };
                _retryInsert();
                return;
              }

              // Створюємо елемент для відображення прогресу
              var progressElement = document.createElement('div');
              progressElement.className = 'full-start-new__details trakt';
              progressElement.innerHTML = "\n                                <div class=\"trakt-icon\" style=\"width:48px; height:48px;\">".concat(icons.TRAKT_ICON, "</div>\n                                <span>").concat(Lampa.Lang.translate('full_season'), ": ").concat(season, "</span><span class=\"full-start-new__split\">\u25CF</span>\n                                <span>").concat(Lampa.Lang.translate('full_episode'), ": ").concat(episode, "</span>\n                            ");

              // Знаходимо елемент після якого вставити прогрес
              var taglineElement = renderRoot.find('.full-start-new__rate-line');
              if (taglineElement.length) {
                // Перевіряємо чи вже є елемент прогресу
                var existingProgress = renderRoot.find('.full-start-new__details.trakt');
                if (existingProgress.length) {
                  existingProgress.remove();
                }
                taglineElement.after(progressElement);
              }
            }
          }
        })["catch"](function (error) {
          logWarn('Failed to load show history for progress badge', error, {
            debugOnly: true
          });
        });
      }
    },
    addHistoryButton: function addHistoryButton(data) {
      var button = document.createElement('div');
      button.className = 'full-start__button selector trakt_history-button';
      button.innerHTML = "\n               ".concat(icons.HISTORY_ICON, " \n                <span>").concat(Lampa.Lang.translate('trakt_history_not_in'), "</span>\n");

      // Перевіряємо чи є в історії
      inHistory(data.movie, function (isInHistory) {
        updateButtonStyle(button, isInHistory);
      }, function () {
        button.style.display = 'none';
      });
      function updateButtonStyle(button, isInHistory) {
        if (isInHistory) {
          button.classList.add('added');
          button.style.color = '#37ff54';
          button.querySelector('span').textContent = Lampa.Lang.translate('trakt_history_in');
        } else {
          button.classList.remove('added');
          button.style.color = '';
          button.querySelector('span').textContent = Lampa.Lang.translate('trakt_history_not_in');
        }
      }

      // Обробник кліку для кнопки, що працює на всіх платформах
      $(button).on('hover:enter', function () {
        var isInHistory = button.classList.contains('added');
        if (isInHistory) {
          // Вже в історії, видаляємо
          var _type = data.movie.first_air_date ? 'show' : 'movie';

          // Створюємо об'єкт для передачі в API
          var _apiData = {
            method: _type === 'movie' ? 'movie' : 'show',
            id: data.movie.id,
            season: data.movie.season_number || 1,
            episode: data.movie.episode_number || 1
          };
          if (_type === 'movie') {
            removeFromHistory(_apiData).then(function () {
              Lampa.Bell.push({
                text: Lampa.Lang.translate('trakt_history_removed')
              });
              updateButtonStyle(button, false);
            })["catch"](function (err) {
              Lampa.Bell.push({
                text: Lampa.Lang.translate('trakt_history_removeError'),
                err: err
              });
            });
          } else if (_type === 'show') {
            Lampa.Select.show({
              title: Lampa.Lang.translate('trakt_history_title'),
              items: [{
                title: Lampa.Lang.translate('trakt_history_all'),
                action: 'all'
              }, {
                title: Lampa.Lang.translate('trakt_history_season'),
                action: 'last_season'
              }, {
                title: Lampa.Lang.translate('trakt_history_episodes'),
                action: 'last_episode'
              }],
              onSelect: function onSelect(a) {
                removeFromHistory(_apiData, a.action).then(function () {
                  Lampa.Bell.push({
                    text: Lampa.Lang.translate('trakt_history_removed', {
                      type: a.title
                    })
                  });
                  updateButtonStyle(button, false);
                })["catch"](function (err) {
                  Lampa.Bell.push({
                    text: Lampa.Lang.translate('trakt_history_removeError'),
                    err: err
                  });
                });
              },
              onBack: function onBack() {
                Lampa.Controller.toggle('menu');
              }
            });
          }
          return;
        }
        var type = data.movie.first_air_date ? 'show' : 'movie';

        // Створюємо об'єкт для передачі в API
        var apiData = {
          method: type === 'movie' ? 'movie' : 'show',
          id: data.movie.id,
          season: data.movie.season_number || 1,
          episode: data.movie.episode_number || 1
        };
        if (type === 'movie') {
          addToHistory(apiData).then(function () {
            Lampa.Bell.push({
              text: Lampa.Lang.translate('trakt_history_added')
            });
            updateButtonStyle(button, true);
          })["catch"](function (err) {
            Lampa.Bell.push({
              text: Lampa.Lang.translate('trakt_history_addError'),
              err: err
            });
          });
        } else if (type === 'show') {
          Lampa.Select.show({
            title: Lampa.Lang.translate('trakt_history_title'),
            items: [{
              title: Lampa.Lang.translate('trakt_history_all'),
              action: 'all'
            }, {
              title: Lampa.Lang.translate('trakt_history_season'),
              action: 'last_season'
            }, {
              title: Lampa.Lang.translate('trakt_history_episodes'),
              action: 'last_episode'
            }],
            onSelect: function onSelect(a) {
              addToHistory(apiData, a.action).then(function () {
                Lampa.Bell.push({
                  text: Lampa.Lang.translate('trakt_history_added', {
                    type: a.title
                  })
                });
                updateButtonStyle(button, true);
              })["catch"](function (err) {
                Lampa.Bell.push({
                  text: Lampa.Lang.translate('trakt_history_addError'),
                  err: err
                });
              });
            },
            onBack: function onBack() {
              Lampa.Controller.toggle('menu');
            }
          });
        }
      });
      return button;
    }
  };

  /**
   * Модуль для роботи з меню TraktTV
   */
  var menuAdded = false;
  function addMenuItems() {
    if (menuAdded) return;
    var t = function t(key) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      try {
        return Lampa.Lang.translate(key) || fallback || key;
      } catch (e) {
        return fallback || key;
      }
    };
    var watchlistTitle = t('trakttv_watchlist', 'Watchlist');
    var upNextTitle = t('trakttv_upnext', 'Up Next');
    var calendarTitle = t('trakttv_calendar', 'Calendar');
    var recommendationsTitle = t('trakttv_recommendations', 'Recommendations');
    var menuTitle = t('trakttv_menu_title', 'TraktTV');
    var myListsTitle = t('trakt_my_lists', 'My Lists');
    var likedListsTitle = t('trakt_liked_lists', 'Liked Lists');
    var watchlist = $("<li class=\"menu__item selector\">\n        <div class=\"menu__ico\">".concat(icons.TRAKT_ICON, " </div>\n        <div class=\"menu__text\">").concat(watchlistTitle, "</div>\n    </li>"));
    var upnext = $("<li class=\"menu__item selector\">\n        <div class=\"menu__ico\">".concat(icons.TRAKT_ICON, " </div>\n        <div class=\"menu__text\">").concat(upNextTitle, "</div>\n    </li>"));
    var timetable = $("<li class=\"menu__item selector\">\n    <div class=\"menu__ico\">\n         <div class=\"menu__ico\">".concat(icons.TRAKT_ICON, " </div>\n    </div>\n    <div class=\"menu__text\">").concat(calendarTitle, "</div>\n    </li>"));
    var myLists = $("<li class=\"menu__item selector\">\n        <div class=\"menu__ico\">".concat(icons.TRAKT_ICON, " </div>\n        <div class=\"menu__text\">").concat(myListsTitle, "</div>\n    </li>"));
    var likedLists = $("<li class=\"menu__item selector\">\n        <div class=\"menu__ico\">".concat(icons.TRAKT_ICON, " </div>\n        <div class=\"menu__text\">").concat(likedListsTitle, "</div>\n    </li>"));
    timetable.on('hover:enter', function () {
      Lampa.Activity.push({
        url: '',
        title: calendarTitle,
        component: 'trakt_timetable_all',
        id: 'trakt_timetable_all'
      });
    });
    watchlist.on('hover:enter', function () {
      Lampa.Activity.push({
        url: '',
        title: watchlistTitle,
        component: 'trakt_watchlist',
        page: 1
      });
    });
    upnext.on('hover:enter', function () {
      Lampa.Activity.push({
        url: '',
        title: upNextTitle,
        component: 'trakt_upnext',
        page: 1
      });
    });
    myLists.on('hover:enter', function () {
      Lampa.Activity.push({
        url: '',
        title: myListsTitle,
        component: 'trakt_my_lists',
        page: 1
      });
    });
    likedLists.on('hover:enter', function () {
      Lampa.Activity.push({
        url: '',
        title: likedListsTitle,
        component: 'trakt_lists',
        page: 1
      });
    });

    // Combine menu items
    var items = [{
      title: upNextTitle,
      component: 'trakt_upnext'
    }, {
      title: watchlistTitle,
      component: 'trakt_watchlist'
    }, {
      title: calendarTitle,
      component: 'trakt_timetable_all'
    }, {
      title: recommendationsTitle,
      component: 'trakttv_recommendations',
      toggleOption: 'trakttv_show_recommendations'
    }];

    // Додаємо пункти меню для списків Trakt
    items.push({
      title: myListsTitle,
      component: 'trakt_my_lists'
    });
    items.push({
      title: likedListsTitle,
      component: 'trakt_lists'
    });
    var menuList = $('.menu .menu__list').eq(0);
    var sideMenuMap = {
      trakt_watchlist: watchlist,
      trakt_upnext: upnext,
      trakt_timetable_all: timetable,
      trakt_my_lists: myLists,
      trakt_lists: likedLists
    };
    function syncSideMenuItem(key) {
      var menuItem = sideMenuMap[key];
      if (!menuItem) return;
      var shouldShow = Lampa.Storage.get(key) === true;
      var alreadyAdded = menuItem.parent().length > 0;
      if (shouldShow && !alreadyAdded) menuList.append(menuItem);
      if (!shouldShow && alreadyAdded) menuItem.remove();
    }
    var combineButton = $("<li class=\"menu__item selector\">\n    <div class=\"menu__ico\">".concat(icons.TRAKT_ICON, " </div>\n        <div class=\"menu__text\">").concat(menuTitle, "</div>\n    </li>"));
    combineButton.on('hover:enter', function () {
      Lampa.Select.show({
        title: menuTitle,
        items: items,
        onSelect: function onSelect(a) {
          Lampa.Activity.push({
            url: '',
            title: a.title,
            component: a.component,
            page: 1
          });
        },
        onLong: function onLong(a) {
          // Визначаємо ключ для перемикання
          var toggleKey = a.toggleOption || a.component;

          // Отримуємо поточне значення
          var currentValue = Lampa.Storage.field(toggleKey, true);

          // Перемикаємо значення
          if (currentValue === true) {
            Lampa.Bell.push({
              text: Lampa.Lang.translate('trakt_componentDisable')
            });
            Lampa.Storage.set(toggleKey, false);
          } else {
            Lampa.Bell.push({
              text: Lampa.Lang.translate('trakt_componentEnable')
            });
            Lampa.Storage.set(toggleKey, true);
          }
          syncSideMenuItem(toggleKey);
        },
        onBack: function onBack() {
          Lampa.Controller.toggle('menu');
        }
      });
    });
    menuList.append(combineButton);

    // Перевіряємо кожен елемент локального сховища і додаємо відповідні пункти меню
    items.forEach(function (item) {
      var key = item.component;
      syncSideMenuItem(key);
    });
    menuAdded = true;
  }

  var PAGE_LIMIT = 100;
  var MAX_PAGES = 100;
  var SUPPORTED_FAVORITE_TYPES = ['book', 'like', 'wath', 'look', 'viewed', 'scheduled', 'continued', 'thrown'];
  var MARK_FAVORITE_TYPES = ['look', 'viewed', 'scheduled', 'continued', 'thrown'];
  function toNumericId(value) {
    var numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric <= 0) return 0;
    return numeric;
  }
  function normalizeFavoriteType(value) {
    var type = (value || 'book').toString().trim().toLowerCase();
    return SUPPORTED_FAVORITE_TYPES.indexOf(type) > -1 ? type : 'book';
  }
  function isMarkFavoriteType(type) {
    return MARK_FAVORITE_TYPES.indexOf(type) > -1;
  }
  function cancelError() {
    var error = new Error('Operation canceled');
    error.code = 'canceled';
    return error;
  }
  function isCanceled(checkCancel) {
    return typeof checkCancel === 'function' && checkCancel() === true;
  }
  function normalizeResults(response) {
    return response && Array.isArray(response.results) ? response.results : [];
  }
  function detectTraktType() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var method = (item.method || item.type || '').toString().toLowerCase();
    return method === 'movie' ? 'movie' : 'show';
  }
  function detectLampaType() {
    var card = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var method = (card.method || card.type || '').toString().toLowerCase();
    if (method === 'movie') return 'movie';
    if (method === 'tv' || method === 'show') return 'show';
    if (card.first_air_date || card.name || card.original_name || card.number_of_seasons) {
      return 'show';
    }
    return 'movie';
  }
  function buildLocalDuplicateKey() {
    var card = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!card || typeof card.id === 'undefined' || card.id === null) return '';
    return "".concat(detectLampaType(card), ":").concat(String(card.id));
  }
  function getComparableKeys(type) {
    var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var keys = [];
    if (!ids || _typeof(ids) !== 'object') return keys;
    if (ids.tmdb) keys.push("".concat(type, ":tmdb:").concat(String(ids.tmdb)));
    if (ids.trakt) keys.push("".concat(type, ":trakt:").concat(String(ids.trakt)));
    if (ids.imdb) keys.push("".concat(type, ":imdb:").concat(String(ids.imdb).toLowerCase()));
    return keys;
  }
  function extractIdsFromLocalCard() {
    var card = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var sourceIds = card && card.ids && _typeof(card.ids) === 'object' ? card.ids : {};
    var ids = {};
    if (sourceIds.tmdb) ids.tmdb = sourceIds.tmdb;
    if (sourceIds.trakt) ids.trakt = sourceIds.trakt;
    if (sourceIds.imdb) ids.imdb = sourceIds.imdb;
    if (!ids.tmdb) {
      var tmdbId = toNumericId(card.id);
      if (tmdbId) ids.tmdb = tmdbId;
    }
    return ids;
  }
  function addLocalCardToTargetSet(targetSet) {
    var card = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!targetSet || !card) return;
    var type = detectLampaType(card);
    var ids = extractIdsFromLocalCard(card);
    var duplicateKey = buildLocalDuplicateKey(card);
    getComparableKeys(type, ids).forEach(function (key) {
      return targetSet.add(key);
    });
    if (duplicateKey) targetSet.add("local:".concat(duplicateKey));
  }
  function buildLocalTargetSet() {
    var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var targetSet = new Set();
    (Array.isArray(cards) ? cards : []).forEach(function (card) {
      addLocalCardToTargetSet(targetSet, card);
    });
    return targetSet;
  }
  function isLocalDuplicate(targetSet) {
    var card = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!targetSet) return false;
    var type = detectLampaType(card);
    var ids = extractIdsFromLocalCard(card);
    var duplicateKey = buildLocalDuplicateKey(card);
    var compareKeys = getComparableKeys(type, ids);
    if (compareKeys.some(function (key) {
      return targetSet.has(key);
    })) {
      return true;
    }
    return Boolean(duplicateKey && targetSet.has("local:".concat(duplicateKey)));
  }
  function removeConflictingMarks(_ref) {
    var favorite = _ref.favorite,
      favoriteType = _ref.favoriteType,
      card = _ref.card;
    if (!favorite || !isMarkFavoriteType(favoriteType)) return;
    if (typeof favorite.check !== 'function' || typeof favorite.remove !== 'function') return;
    var status = favorite.check(card) || {};
    MARK_FAVORITE_TYPES.forEach(function (type) {
      if (type === favoriteType) return;
      if (!status[type]) return;
      try {
        favorite.remove(type, card);
      } catch (error) {}
    });
  }
  function mapTraktToLampaCard() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var ids = item && item.ids && _typeof(item.ids) === 'object' ? item.ids : {};
    var tmdbId = toNumericId(ids.tmdb);
    if (!tmdbId) return null;
    var type = detectTraktType(item);
    var title = item.title || item.name || item.original_title || item.original_name || '';
    var originalTitle = item.original_title || item.original_name || title;
    var releaseDate = item.release_date || item.first_air_date || '';
    var voteAverage = Number(item.vote_average) || 0;
    var poster = item.poster || item.img || '';
    var image = item.image || item.background_image || '';
    var normalizedIds = {
      tmdb: tmdbId
    };
    if (ids.trakt) normalizedIds.trakt = ids.trakt;
    if (ids.imdb) normalizedIds.imdb = ids.imdb;
    if (type === 'movie') {
      return {
        id: tmdbId,
        ids: normalizedIds,
        title: title,
        original_title: originalTitle,
        release_date: releaseDate,
        poster: poster,
        img: poster,
        background_image: image,
        image: image,
        vote_average: voteAverage,
        method: 'movie',
        type: 'movie',
        card_type: 'movie',
        source: 'tmdb'
      };
    }
    return {
      id: tmdbId,
      ids: normalizedIds,
      title: title,
      name: title,
      original_title: originalTitle,
      original_name: originalTitle,
      first_air_date: releaseDate,
      release_date: releaseDate,
      poster: poster,
      img: poster,
      background_image: image,
      image: image,
      vote_average: voteAverage,
      number_of_seasons: Number(item.number_of_seasons) || 0,
      method: 'tv',
      type: 'tv',
      card_type: 'tv',
      source: 'tmdb'
    };
  }
  function mapLampaToTraktItem() {
    var card = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var type = detectLampaType(card);
    var ids = extractIdsFromLocalCard(card);
    if (!Object.keys(ids).length) return null;
    return {
      type: type,
      method: type === 'movie' ? 'movie' : 'show',
      ids: ids
    };
  }
  function parseWriteStatus(response, type) {
    var section = type === 'movie' ? 'movies' : 'shows';
    var added = Number(response && response.added && response.added[section]) || 0;
    var existing = Number(response && response.existing && response.existing[section]) || 0;
    var notFoundRaw = response && response.not_found ? response.not_found[section] : null;
    var notFound = Array.isArray(notFoundRaw) ? notFoundRaw.length : Number(notFoundRaw || 0);
    if (notFound > 0) return 'failed';
    if (added > 0) return 'added';
    if (existing > 0) return 'duplicate';
    return 'added';
  }
  function loadSourceItems(_x) {
    return _loadSourceItems.apply(this, arguments);
  }
  function _loadSourceItems() {
    _loadSourceItems = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref2) {
      var api, source, listId, checkCancel, onProgress, items, page, response, chunk, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            api = _ref2.api, source = _ref2.source, listId = _ref2.listId, checkCancel = _ref2.checkCancel, onProgress = _ref2.onProgress;
            items = [];
            page = 1;
          case 1:
            if (!(page <= MAX_PAGES)) {
              _context.n = 9;
              break;
            }
            if (!isCanceled(checkCancel)) {
              _context.n = 2;
              break;
            }
            throw cancelError();
          case 2:
            onProgress && onProgress({
              phase: 'loading_source',
              page: page,
              processed: items.length,
              total: 0,
              percent: 0
            });
            if (!(source === 'watchlist')) {
              _context.n = 4;
              break;
            }
            _context.n = 3;
            return api.watchlist({
              page: page,
              limit: PAGE_LIMIT
            });
          case 3:
            _t = _context.v;
            _context.n = 6;
            break;
          case 4:
            _context.n = 5;
            return api.myListItems({
              listId: listId,
              page: page,
              limit: PAGE_LIMIT
            });
          case 5:
            _t = _context.v;
          case 6:
            response = _t;
            chunk = normalizeResults(response);
            if (chunk.length) {
              _context.n = 7;
              break;
            }
            return _context.a(3, 9);
          case 7:
            items.push.apply(items, _toConsumableArray(chunk));
            if (!(chunk.length < PAGE_LIMIT)) {
              _context.n = 8;
              break;
            }
            return _context.a(3, 9);
          case 8:
            page += 1;
            _context.n = 1;
            break;
          case 9:
            return _context.a(2, items);
        }
      }, _callee);
    }));
    return _loadSourceItems.apply(this, arguments);
  }
  function loadTargetItems(_x2) {
    return _loadTargetItems.apply(this, arguments);
  }
  function _loadTargetItems() {
    _loadTargetItems = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref3) {
      var api, target, listId, checkCancel, onProgress, items, page, response, chunk, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            api = _ref3.api, target = _ref3.target, listId = _ref3.listId, checkCancel = _ref3.checkCancel, onProgress = _ref3.onProgress;
            items = [];
            page = 1;
          case 1:
            if (!(page <= MAX_PAGES)) {
              _context2.n = 9;
              break;
            }
            if (!isCanceled(checkCancel)) {
              _context2.n = 2;
              break;
            }
            throw cancelError();
          case 2:
            onProgress && onProgress({
              phase: 'loading_target',
              page: page,
              processed: items.length,
              total: 0,
              percent: 0
            });
            if (!(target === 'watchlist')) {
              _context2.n = 4;
              break;
            }
            _context2.n = 3;
            return api.watchlist({
              page: page,
              limit: PAGE_LIMIT
            });
          case 3:
            _t2 = _context2.v;
            _context2.n = 6;
            break;
          case 4:
            _context2.n = 5;
            return api.myListItems({
              listId: listId,
              page: page,
              limit: PAGE_LIMIT
            });
          case 5:
            _t2 = _context2.v;
          case 6:
            response = _t2;
            chunk = normalizeResults(response);
            if (chunk.length) {
              _context2.n = 7;
              break;
            }
            return _context2.a(3, 9);
          case 7:
            items.push.apply(items, _toConsumableArray(chunk));
            if (!(chunk.length < PAGE_LIMIT)) {
              _context2.n = 8;
              break;
            }
            return _context2.a(3, 9);
          case 8:
            page += 1;
            _context2.n = 1;
            break;
          case 9:
            return _context2.a(2, items);
        }
      }, _callee2);
    }));
    return _loadTargetItems.apply(this, arguments);
  }
  function importBookmarks(_x3) {
    return _importBookmarks.apply(this, arguments);
  }
  function _importBookmarks() {
    _importBookmarks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref4) {
      var api, favorite, _ref4$source, source, _ref4$listId, listId, _ref4$favoriteType, favoriteType, checkCancel, onProgress, resolvedFavoriteType, items, localCards, localTargetSet, summary, index, item, mappedCard;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            api = _ref4.api, favorite = _ref4.favorite, _ref4$source = _ref4.source, source = _ref4$source === void 0 ? 'watchlist' : _ref4$source, _ref4$listId = _ref4.listId, listId = _ref4$listId === void 0 ? null : _ref4$listId, _ref4$favoriteType = _ref4.favoriteType, favoriteType = _ref4$favoriteType === void 0 ? 'book' : _ref4$favoriteType, checkCancel = _ref4.checkCancel, onProgress = _ref4.onProgress;
            if (api) {
              _context3.n = 1;
              break;
            }
            throw new Error('Trakt API is not available');
          case 1:
            if (favorite) {
              _context3.n = 2;
              break;
            }
            throw new Error('Favorite API is not available');
          case 2:
            resolvedFavoriteType = normalizeFavoriteType(favoriteType);
            _context3.n = 3;
            return loadSourceItems({
              api: api,
              source: source,
              listId: listId,
              checkCancel: checkCancel,
              onProgress: onProgress
            });
          case 3:
            items = _context3.v;
            localCards = favorite.get({
              type: resolvedFavoriteType
            }) || [];
            localTargetSet = buildLocalTargetSet(localCards);
            summary = {
              favorite_type: resolvedFavoriteType,
              total: items.length,
              processed: 0,
              added: 0,
              duplicates: 0,
              skipped_unsupported: 0,
              failed: 0
            };
            index = 0;
          case 4:
            if (!(index < items.length)) {
              _context3.n = 7;
              break;
            }
            if (!isCanceled(checkCancel)) {
              _context3.n = 5;
              break;
            }
            throw cancelError();
          case 5:
            item = items[index];
            mappedCard = mapTraktToLampaCard(item);
            summary.processed += 1;
            if (!mappedCard) {
              summary.skipped_unsupported += 1;
            } else if (isLocalDuplicate(localTargetSet, mappedCard)) {
              removeConflictingMarks({
                favorite: favorite,
                favoriteType: resolvedFavoriteType,
                card: mappedCard
              });
              summary.duplicates += 1;
            } else {
              try {
                removeConflictingMarks({
                  favorite: favorite,
                  favoriteType: resolvedFavoriteType,
                  card: mappedCard
                });
                favorite.add(resolvedFavoriteType, mappedCard);
                addLocalCardToTargetSet(localTargetSet, mappedCard);
                summary.added += 1;
              } catch (error) {
                summary.failed += 1;
              }
            }
            onProgress && onProgress({
              phase: 'processing_import',
              processed: summary.processed,
              total: summary.total,
              percent: summary.total ? Math.round(summary.processed / summary.total * 100) : 100
            });
            if (!(index % 20 === 0)) {
              _context3.n = 6;
              break;
            }
            _context3.n = 6;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 0);
            });
          case 6:
            index++;
            _context3.n = 4;
            break;
          case 7:
            return _context3.a(2, summary);
        }
      }, _callee3);
    }));
    return _importBookmarks.apply(this, arguments);
  }
  function exportBookmarks(_x4) {
    return _exportBookmarks.apply(this, arguments);
  }
  function _exportBookmarks() {
    _exportBookmarks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref5) {
      var api, favorite, _ref5$target, target, _ref5$listId, listId, _ref5$favoriteType, favoriteType, checkCancel, onProgress, resolvedFavoriteType, bookmarks, targetItems, targetSet, summary, index, card, mapped, compareKeys, isDuplicate, response, status, _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            api = _ref5.api, favorite = _ref5.favorite, _ref5$target = _ref5.target, target = _ref5$target === void 0 ? 'watchlist' : _ref5$target, _ref5$listId = _ref5.listId, listId = _ref5$listId === void 0 ? null : _ref5$listId, _ref5$favoriteType = _ref5.favoriteType, favoriteType = _ref5$favoriteType === void 0 ? 'book' : _ref5$favoriteType, checkCancel = _ref5.checkCancel, onProgress = _ref5.onProgress;
            if (api) {
              _context4.n = 1;
              break;
            }
            throw new Error('Trakt API is not available');
          case 1:
            if (favorite) {
              _context4.n = 2;
              break;
            }
            throw new Error('Favorite API is not available');
          case 2:
            resolvedFavoriteType = normalizeFavoriteType(favoriteType);
            bookmarks = favorite.get({
              type: resolvedFavoriteType
            }) || [];
            _context4.n = 3;
            return loadTargetItems({
              api: api,
              target: target,
              listId: listId,
              checkCancel: checkCancel,
              onProgress: onProgress
            });
          case 3:
            targetItems = _context4.v;
            targetSet = new Set();
            targetItems.forEach(function (item) {
              var type = detectTraktType(item);
              var ids = item && item.ids && _typeof(item.ids) === 'object' ? item.ids : {};
              getComparableKeys(type, ids).forEach(function (key) {
                return targetSet.add(key);
              });
            });
            summary = {
              favorite_type: resolvedFavoriteType,
              total: bookmarks.length,
              processed: 0,
              added: 0,
              duplicates: 0,
              skipped_unsupported: 0,
              failed: 0
            };
            index = 0;
          case 4:
            if (!(index < bookmarks.length)) {
              _context4.n = 15;
              break;
            }
            if (!isCanceled(checkCancel)) {
              _context4.n = 5;
              break;
            }
            throw cancelError();
          case 5:
            card = bookmarks[index];
            mapped = mapLampaToTraktItem(card);
            summary.processed += 1;
            if (mapped) {
              _context4.n = 6;
              break;
            }
            summary.skipped_unsupported += 1;
            _context4.n = 13;
            break;
          case 6:
            compareKeys = getComparableKeys(mapped.type, mapped.ids);
            isDuplicate = compareKeys.some(function (key) {
              return targetSet.has(key);
            });
            if (!isDuplicate) {
              _context4.n = 7;
              break;
            }
            summary.duplicates += 1;
            _context4.n = 13;
            break;
          case 7:
            _context4.p = 7;
            if (!(target === 'watchlist')) {
              _context4.n = 9;
              break;
            }
            _context4.n = 8;
            return api.addToWatchlist({
              method: mapped.method,
              ids: mapped.ids
            });
          case 8:
            _t3 = _context4.v;
            _context4.n = 11;
            break;
          case 9:
            _context4.n = 10;
            return api.addToList({
              listId: listId,
              item: {
                method: mapped.method,
                ids: mapped.ids
              }
            });
          case 10:
            _t3 = _context4.v;
          case 11:
            response = _t3;
            status = parseWriteStatus(response, mapped.type);
            if (status === 'added') {
              summary.added += 1;
              compareKeys.forEach(function (key) {
                return targetSet.add(key);
              });
            } else if (status === 'duplicate') {
              summary.duplicates += 1;
              compareKeys.forEach(function (key) {
                return targetSet.add(key);
              });
            } else {
              summary.failed += 1;
            }
            _context4.n = 13;
            break;
          case 12:
            _context4.p = 12;
            summary.failed += 1;
          case 13:
            onProgress && onProgress({
              phase: 'processing_export',
              processed: summary.processed,
              total: summary.total,
              percent: summary.total ? Math.round(summary.processed / summary.total * 100) : 100
            });
            if (!(index % 20 === 0)) {
              _context4.n = 14;
              break;
            }
            _context4.n = 14;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 0);
            });
          case 14:
            index++;
            _context4.n = 4;
            break;
          case 15:
            return _context4.a(2, summary);
        }
      }, _callee4, null, [[7, 12]]);
    }));
    return _exportBookmarks.apply(this, arguments);
  }
  var bookmarksSync = {
    importBookmarks: importBookmarks,
    exportBookmarks: exportBookmarks,
    normalizeFavoriteType: normalizeFavoriteType,
    supportedFavoriteTypes: SUPPORTED_FAVORITE_TYPES.slice()
  };

  var UKRAINIAN_THANKS_URL = 'https://lampame.donatik.me/';
  var DEFAULT_THANKS_URL = 'https://lampame.gumroad.com/coffee';
  function getCurrentLanguage() {
    return String(Lampa.Storage.get('language', 'ru') || 'ru').toLowerCase();
  }
  function getThanksUrlByLanguage() {
    return getCurrentLanguage() === 'uk' ? UKRAINIAN_THANKS_URL : DEFAULT_THANKS_URL;
  }
  function openThanksModal() {
    var thanksUrl = getThanksUrlByLanguage();
    var html = Lampa.Template.get('modal_qr', {
      title: Lampa.Lang.translate('trakttv_settings_thanks'),
      text: Lampa.Lang.translate('trakttv_settings_thanks_description'),
      qr_text: "<a href=\"".concat(thanksUrl, "\">").concat(thanksUrl, "</a>")
    });
    var qrElement = html.find('.account-modal-split__qr-code');
    var enabledController = Lampa.Controller.enabled().name;
    Lampa.Utils.qrcode(thanksUrl, qrElement, function (error) {
      console.error('TraktTV', 'Unable to generate thanks QR code', error);
      qrElement.text(thanksUrl);
    });
    Lampa.Modal.open({
      title: '',
      html: html,
      size: 'medium',
      onBack: function onBack() {
        Lampa.Modal.close();
        Lampa.Controller.toggle(enabledController);
      }
    });
  }

  // Local safe resolver for Api to support runtime-scoped execution (e.g., dev/trakt.js)
  var Api$1 = typeof api$1 !== 'undefined' && api$1 || window.TraktTV && window.TraktTV.api || null;
  var isBookmarksSyncRunning = false;
  var DEFAULT_BOOKMARKS_SYNC_TYPES = ['book', 'like', 'wath', 'look', 'viewed', 'scheduled', 'continued', 'thrown'];
  var API_MISSING_LOG_KEY$1 = 'config:api-missing';
  function logApiMissing() {
    logDebugOnce(API_MISSING_LOG_KEY$1, 'API bridge is unavailable in config');
  }

  // ─────────────────────────────────────────────────────
  //  MAIN — register all components and params
  // ─────────────────────────────────────────────────────

  function main() {
    // 1. Register main component in settings
    Lampa.SettingsApi.addComponent({
      component: 'trakt',
      name: 'Trakt.TV',
      icon: icons.TRAKT_ICON,
      before: 'interface'
    });

    // 2. Register sub-component templates (hidden from main menu)
    //    These are only accessible via navigation from the main 'trakt' component.
    Lampa.Template.add('settings_trakt_sync', '<div></div>');
    Lampa.Template.add('settings_trakt_progress', '<div></div>');
    Lampa.Template.add('settings_trakt_source', '<div></div>');

    // 3. Main component params
    addMainParams();

    // 4. Sub-component params
    addSyncParams();
    addProgressParams();
    addSourceParams();
  }

  // ─────────────────────────────────────────────────────
  //  MAIN COMPONENT — 'trakt'
  // ─────────────────────────────────────────────────────

  function addMainParams() {
    // ── Thanks / donation ──
    Lampa.SettingsApi.addParam({
      component: 'trakt',
      param: {
        name: 'trakttv_thanks',
        type: 'button'
      },
      field: {
        name: Lampa.Lang.translate('trakttv_settings_thanks'),
        description: Lampa.Lang.translate('trakttv_settings_thanks_description')
      },
      onChange: function onChange() {
        openThanksModal();
      }
    });

    // ── Auth: login / logout combined ──
    Lampa.SettingsApi.addParam({
      component: 'trakt',
      param: {
        name: 'trakt_auth',
        type: 'button'
      },
      field: {
        name: ''
      },
      onRender: function onRender(item) {
        var token = Lampa.Storage.get('trakt_token');
        var nameEl = item.find('.settings-param__name');
        if (!token) {
          nameEl.html('<span class="trakt-auth-label">' + Lampa.Lang.translate('trakttvAuthMissed') + '</span>');
          return;
        }

        // Show loading while fetching user info
        nameEl.html('<span class="trakt-auth-label">' + Lampa.Lang.translate('loading') + '…</span>');
        if (!Api$1) {
          logApiMissing();
          nameEl.html('<span class="trakt-auth-label">Trakt.TV</span>');
          return;
        }
        Api$1.get('/users/me').then(function (user) {
          if (user && user.username) {
            var vipBadge = user.vip ? ' <span class="trakt-vip-badge trakt-vip-badge--enabled">' + Lampa.Lang.translate('trakttv_vip_enabled') + '</span>' : '';
            nameEl.html('<span class="trakt-auth-label trakt-auth-label--user">' + Lampa.Lang.translate('trakttv_username') + ': <b>' + user.username + '</b>' + vipBadge + '</span>');
          } else {
            nameEl.html('<span class="trakt-auth-label">Trakt.TV</span>');
          }
        })["catch"](function () {
          nameEl.html('<span class="trakt-auth-label">Trakt.TV</span>');
        });
      },
      onChange: function onChange() {
        var token = Lampa.Storage.get('trakt_token');
        if (!token) {
          startDeviceAuth();
        } else {
          if (Api$1) Api$1.auth.logout();
          Lampa.Bell.push({
            text: Lampa.Lang.translate('trakttvLogoutNoty')
          });
          Lampa.Settings.update();
        }
      }
    });

    // ── Navigation: Lists sync ──
    Lampa.SettingsApi.addParam({
      component: 'trakt',
      param: {
        name: 'nav_trakt_sync',
        type: 'button'
      },
      field: {
        name: t$1('trakttv_nav_sync', 'Lists sync')
      },
      onChange: function onChange() {
        Lampa.Settings.create('trakt_sync', {
          onBack: function onBack() {
            Lampa.Settings.create('trakt');
          }
        });
      }
    });

    // ── Navigation: Progress settings ──
    Lampa.SettingsApi.addParam({
      component: 'trakt',
      param: {
        name: 'nav_trakt_progress',
        type: 'button'
      },
      field: {
        name: t$1('trakt_progress_section', 'Progress settings')
      },
      onChange: function onChange() {
        Lampa.Settings.create('trakt_progress', {
          onBack: function onBack() {
            Lampa.Settings.create('trakt');
          }
        });
      }
    });

    // ── Navigation: Source settings ──
    Lampa.SettingsApi.addParam({
      component: 'trakt',
      param: {
        name: 'nav_trakt_source',
        type: 'button'
      },
      field: {
        name: t$1('trakttv_nav_source', 'Source settings')
      },
      onChange: function onChange() {
        Lampa.Settings.create('trakt_source', {
          onBack: function onBack() {
            Lampa.Settings.create('trakt');
          }
        });
      }
    });

    // ── Top Shelf (Apple TV only) ──
    if (Lampa.Platform.is('apple_tv') === true) {
      Lampa.SettingsApi.addParam({
        component: 'trakt',
        param: {
          name: 'trakttv_topshelf',
          type: 'trigger',
          "default": false
        },
        field: {
          name: Lampa.Lang.translate('trakttv_topshelf'),
          description: Lampa.Lang.translate('trakttv_topshelf_descr')
        }
      });
    }

    // ── Full clear ──
    Lampa.SettingsApi.addParam({
      component: 'trakt',
      param: {
        name: 'trakt_full_clear',
        type: 'button'
      },
      field: {
        name: Lampa.Lang.translate('trakttvFullClear')
      },
      onChange: function onChange() {
        Object.keys(localStorage).forEach(function (key) {
          if (key.toLowerCase().includes('trakt')) {
            localStorage.removeItem(key);
          }
        });
        if (typeof Lampa.Storage.set === 'function') {
          Lampa.Storage.set('trakt_token', null);
          Lampa.Storage.set('trakt_refresh_token', null);
          Lampa.Storage.set('trakt_token_created_at', null);
          Lampa.Storage.set('trakt_token_expires_in', null);
          Lampa.Storage.set('trakt_token_expires_at', null);
          Lampa.Storage.set('trakt_active_device_auth', false);
          Lampa.Storage.set('trakt_active_device_auth_started_at', null);
        }
        Lampa.Bell.push({
          text: Lampa.Lang.translate('trakttvFullClearNoty')
        });
        Lampa.Settings.update();
      }
    });
  }

  // ─────────────────────────────────────────────────────
  //  SUB-COMPONENT — 'trakt_sync'  (Lists sync)
  // ─────────────────────────────────────────────────────

  function addSyncParams() {
    Lampa.SettingsApi.addParam({
      component: 'trakt_sync',
      param: {
        name: 'trakt_bookmarks_mode',
        type: 'select',
        "default": 'watchlist',
        values: {
          watchlist: t$1('trakt_bookmarks_mode_watchlist', 'Watchlist'),
          my_lists: t$1('trakt_bookmarks_mode_my_lists', 'My Lists')
        }
      },
      field: {
        name: t$1('trakt_bookmarks_mode', 'Sync mode')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'trakt_sync',
      param: {
        name: 'trakt_bookmarks_favorite_type',
        type: 'select',
        "default": 'book',
        values: getBookmarksFavoriteTypeValues()
      },
      field: {
        name: t$1('trakt_bookmarks_local_type', 'Local Lampa list'),
        description: t$1('trakt_bookmarks_local_type_description', 'Choose which local Lampa list to sync')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'trakt_sync',
      param: {
        name: 'trakt_bookmarks_import',
        type: 'button'
      },
      field: {
        name: t$1('trakt_bookmarks_import_button', 'Import bookmarks from Trakt')
      },
      onRender: function onRender(item) {
        if (Lampa.Storage.get('trakt_token')) item.show();else item.hide();
      },
      onChange: function onChange() {
        startBookmarksImportFlow();
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'trakt_sync',
      param: {
        name: 'trakt_bookmarks_export',
        type: 'button'
      },
      field: {
        name: t$1('trakt_bookmarks_export_button', 'Export bookmarks to Trakt')
      },
      onRender: function onRender(item) {
        if (Lampa.Storage.get('trakt_token')) item.show();else item.hide();
      },
      onChange: function onChange() {
        startBookmarksExportFlow();
      }
    });
  }

  // ─────────────────────────────────────────────────────
  //  SUB-COMPONENT — 'trakt_progress'  (Progress settings)
  // ─────────────────────────────────────────────────────

  function addProgressParams() {
    Lampa.SettingsApi.addParam({
      component: 'trakt_progress',
      param: {
        name: 'trakt_enable_watching',
        type: 'trigger',
        "default": false
      },
      field: {
        name: Lampa.Lang.translate('trakttv_enable_watching'),
        description: Lampa.Lang.translate('trakttv_enable_watching_descr')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'trakt_progress',
      param: {
        name: 'trakttv_show_tv_progress',
        type: 'trigger',
        "default": true
      },
      field: {
        name: Lampa.Lang.translate('trakttv_show_tv_progress')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'trakt_progress',
      param: {
        name: 'trakt_min_progress',
        type: 'select',
        "default": '90',
        values: {
          '50': '50%',
          '60': '60%',
          '70': '70%',
          '80': '80%',
          '85': '85%',
          '90': '90%',
          '95': '95%',
          '100': '100%'
        }
      },
      field: {
        name: Lampa.Lang.translate('trakttv_min_progress_threshold'),
        description: Lampa.Lang.translate('trakttv_min_progress_threshold_descr')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'trakt_progress',
      param: {
        name: 'trakt_scrobble_interval',
        type: 'select',
        "default": '90',
        values: {
          '30': '30 ' + t$1('trakttv_seconds', 'sec'),
          '60': '60 ' + t$1('trakttv_seconds', 'sec'),
          '90': '90 ' + t$1('trakttv_seconds', 'sec'),
          '120': '120 ' + t$1('trakttv_seconds', 'sec')
        }
      },
      field: {
        name: t$1('trakttv_scrobble_interval', 'Scrobble interval'),
        description: t$1('trakttv_scrobble_interval_descr', 'How often to sync progress during playback (affects battery/data)')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'trakt_progress',
      param: {
        name: 'trakt_scrobble_queue_enabled',
        type: 'trigger',
        "default": true
      },
      field: {
        name: t$1('trakttv_scrobble_queue_enabled', 'Offline queue'),
        description: t$1('trakttv_scrobble_queue_descr', 'Save pending scrobbles when offline and send later')
      }
    });
  }

  // ─────────────────────────────────────────────────────
  //  SUB-COMPONENT — 'trakt_source'  (Source filters)
  // ─────────────────────────────────────────────────────

  function addSourceParams() {
    Lampa.SettingsApi.addParam({
      component: 'trakt_source',
      param: {
        name: 'trakt_source_ignore_watched',
        type: 'trigger',
        "default": false
      },
      field: {
        name: t$1('trakttv_source_ignore_watched', 'Source: ignore watched'),
        description: t$1('trakttv_source_ignore_watched_descr', 'Applies to all TraktTV source feeds (categories, recommendations, search)')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'trakt_source',
      param: {
        name: 'trakt_source_ignore_watchlisted',
        type: 'trigger',
        "default": false
      },
      field: {
        name: t$1('trakttv_source_ignore_watchlisted', 'Source: ignore watchlisted'),
        description: t$1('trakttv_source_ignore_watchlisted_descr', 'Applies to all TraktTV source feeds (categories, recommendations, search)')
      }
    });
  }

  // ─────────────────────────────────────────────────────
  //  DEVICE AUTH — extracted from inline for reuse
  // ─────────────────────────────────────────────────────

  var currentPollTimeoutId = null;
  var visibilityHandler = null;
  var pollInFlight = false;
  var checkNowHandler = null;
  function startDeviceAuth() {
    if (Lampa.Storage.get('trakt_token')) return;
    if (!Api$1) {
      logApiMissing();
      return;
    }
    (Api$1 && Api$1.auth.device.login()).then(function (data) {
      if (!data || !data.user_code || !data.verification_url) {
        Lampa.Bell.push({
          text: Lampa.Lang.translate('trakttvAuthError')
        });
        return;
      }
      var safeVerification = String(data.verification_url || '');
      var safeUserCode = String(data.user_code || '');
      var activateUrl = 'https://trakt.tv/activate/' + safeUserCode;
      var qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=420x420&data=' + encodeURIComponent(activateUrl);
      var modal = $(['<div class="about trakt-device-auth">', '  <div class="trakt-device-auth__inner">', '    <div class="trakt-device-auth__qr-col">', '      <div class="trakt-device-auth__qr-container">', '        <a href="' + activateUrl + '" target="_blank" rel="noopener noreferrer" class="trakt-device-auth__qr-link">', '          <img src="' + qrCodeUrl + '" alt="Trakt.TV QR Code" class="trakt-device-auth__qr-image">', '        </a>', '        <div class="trakt-device-auth__qr-caption">' + Lampa.Lang.translate('trakttv_scan_qr_code') + '</div>', '      </div>', '    </div>', '    <div class="trakt-device-auth__info-col">', '      <div class="about__text trakt-device-auth__verification">' + safeVerification + '</div>', '      <div class="about__text trakt-device-auth__code">' + Lampa.Lang.translate('trakttv_code') + ': <strong>' + safeUserCode + '</strong></div>', '      <div class="modal__button selector trakt-check-btn">' + Lampa.Lang.translate('trakttv_check_now') + '</div>', '    </div>', '  </div>', '</div>'].join(''));
      modal.find('.trakt-device-auth__qr-image').on('error', function () {
        modal.find('.trakt-device-auth__qr-container').addClass('trakt-device-auth__qr-container--hidden');
      });
      Lampa.Modal.open({
        title: Lampa.Lang.translate('trakttv_auth'),
        html: modal,
        size: Lampa.Platform.screen('mobile') ? 'medium' : 'small',
        select: modal.find('.trakt-check-btn')[0],
        onSelect: function onSelect() {
          if (checkNowHandler) checkNowHandler();
        },
        scroll: {
          nopadding: true
        },
        onBack: function onBack() {
          if (currentPollTimeoutId) {
            clearTimeout(currentPollTimeoutId);
            currentPollTimeoutId = null;
          }
          Lampa.Storage.set('trakt_active_device_auth', false);
          Lampa.Storage.set('trakt_active_device_auth_started_at', null);
          Lampa.Modal.close();
          Lampa.Controller.toggle('settings_component');
        }
      });
      if (Lampa.Storage.get('trakt_active_device_auth') === true) {
        var startedAt = Number(Lampa.Storage.get('trakt_active_device_auth_started_at') || 0);
        var isStale = !startedAt || Date.now() - startedAt > 20 * 60 * 1000;
        if (isStale) {
          Lampa.Storage.set('trakt_active_device_auth', false);
          Lampa.Storage.set('trakt_active_device_auth_started_at', null);
        } else {
          logDebug('Device auth already active, skip duplicate start');
          return;
        }
      }
      Lampa.Storage.set('trakt_active_device_auth', true);
      Lampa.Storage.set('trakt_active_device_auth_started_at', Date.now());
      pollAuth(data, Lampa.Modal);
    })["catch"](function (error) {
      logError('Device auth init failed', error, {
        debugOnly: true
      });
      Lampa.Bell.push({
        text: Lampa.Lang.translate('trakttvAuthError')
      });
    });
  }

  // ─────────────────────────────────────────────────────
  //  POLLING — unchanged from original
  // ─────────────────────────────────────────────────────

  function handlePollingError(modalInstance, messageKey, defaultMessage, code, stop) {
    if (stop === undefined) stop = true;
    logWarn('Device auth polling stopped', {
      code: code
    }, {
      debugOnly: true
    });
    if (stop) {
      if (currentPollTimeoutId) {
        clearTimeout(currentPollTimeoutId);
        currentPollTimeoutId = null;
      }
      if (visibilityHandler) {
        document.removeEventListener('visibilitychange', visibilityHandler);
        visibilityHandler = null;
      }
      pollInFlight = false;
      checkNowHandler = null;
      Lampa.Storage.set('trakt_active_device_auth', false);
      Lampa.Storage.set('trakt_active_device_auth_started_at', null);
    }
    if (modalInstance) {
      modalInstance.close();
    }
    Lampa.Bell.push({
      text: Lampa.Lang.translate(messageKey) || defaultMessage
    });
  }
  function handleAuthSuccess(modalInstance, response) {
    logDebug('Device auth succeeded');
    if (currentPollTimeoutId) {
      clearTimeout(currentPollTimeoutId);
      currentPollTimeoutId = null;
    }
    if (visibilityHandler) {
      document.removeEventListener('visibilitychange', visibilityHandler);
      visibilityHandler = null;
    }
    pollInFlight = false;
    checkNowHandler = null;
    if (Api$1 && Api$1.auth && typeof Api$1.auth.storeTokens === 'function') {
      Api$1.auth.storeTokens(response);
    } else {
      Lampa.Storage.set('trakt_token', response.access_token);
      Lampa.Storage.set('trakt_refresh_token', response.refresh_token);
    }
    Lampa.Storage.set('trakt_active_device_auth', false);
    Lampa.Storage.set('trakt_active_device_auth_started_at', null);
    if (modalInstance) {
      modalInstance.close();
    }
    Lampa.Settings.update();
    Lampa.Bell.push({
      text: Lampa.Lang.translate('trakttvAuthOk')
    });
  }
  function extractPollingErrorCode(error) {
    var payload = error && error.response;
    if (!payload) return '';
    if (_typeof(payload) === 'object') {
      return String(payload.error || payload.error_code || '').trim().toLowerCase();
    }
    if (typeof payload === 'string') {
      try {
        var decoded = JSON.parse(payload);
        if (decoded && _typeof(decoded) === 'object') {
          return String(decoded.error || decoded.error_code || '').trim().toLowerCase();
        }
      } catch (e) {
        return '';
      }
    }
    return '';
  }
  function parseRetryAfterMs(headers) {
    if (!headers) headers = {};
    var value = headers && headers['retry-after'];
    if (!value) return null;
    var numeric = Number(value);
    if (Number.isFinite(numeric) && numeric >= 0) {
      return numeric * 1000;
    }
    var dateMs = Date.parse(value);
    if (Number.isFinite(dateMs)) {
      return Math.max(0, dateMs - Date.now());
    }
    return null;
  }
  function pollAuth(data, modalInstance) {
    var originalIntervalSec = Number(data && data.interval);
    var originalIntervalMs = Number.isFinite(originalIntervalSec) && originalIntervalSec > 0 ? originalIntervalSec * 1000 : 5000;
    var currentPollingStepMs = originalIntervalMs;
    var expiresMs = Number.isFinite(Number(data && data.expires_in)) ? Number(data.expires_in) * 1000 : 600 * 1000;
    var pendingCount = 0;
    if (!data || !data.device_code) {
      handlePollingError(modalInstance, 'trakttvAuthError', 'Authentication error', 'missing-device_code');
      return;
    }
    var startTime = Date.now();
    logDebug('Device auth polling started', {
      stepMs: currentPollingStepMs,
      expiresMs: expiresMs
    });
    if (currentPollTimeoutId) {
      clearTimeout(currentPollTimeoutId);
      currentPollTimeoutId = null;
    }
    var scheduleNext = function scheduleNext(delayMs) {
      if (currentPollTimeoutId) {
        clearTimeout(currentPollTimeoutId);
      }
      currentPollTimeoutId = setTimeout(executePoll, delayMs);
    };
    var executePoll = function executePoll() {
      currentPollTimeoutId = null;
      if (Date.now() - startTime >= expiresMs) {
        logWarn('Device auth polling timeout', {
          expiresMs: expiresMs
        }, {
          debugOnly: true
        });
        handlePollingError(modalInstance, 'trakttvExpired', 'Expired, please restart', 'timeout');
        return;
      }
      if (!Api$1) {
        logApiMissing();
        handlePollingError(modalInstance, 'trakttvAuthError', 'Authentication error', 'api-missing');
        return;
      }
      pollInFlight = true;
      Api$1.auth.device.poll(data.device_code).then(function (response) {
        pollInFlight = false;
        pendingCount = 0;
        handleAuthSuccess(modalInstance, response);
      })["catch"](function (error) {
        var status = error && error.status;
        var errorCode = extractPollingErrorCode(error);
        switch (status) {
          case 400:
            if (!errorCode || errorCode === 'authorization_pending') {
              pendingCount++;
              var effectiveDelay = originalIntervalMs;
              if (pendingCount > 3) {
                var multiplier = Math.min(1.5 + (pendingCount - 4) * 0.25, 4);
                effectiveDelay = Math.min(originalIntervalMs * multiplier, 45 * 1000);
                logDebug('Adaptive backoff increased delay', {
                  pendingCount: pendingCount,
                  effectiveDelay: effectiveDelay
                });
              }
              scheduleNext(effectiveDelay);
              pollInFlight = false;
              break;
            }
            logWarn('Device auth poll returned invalid 400 state', {
              status: status,
              errorCode: errorCode
            }, {
              debugOnly: true
            });
            pendingCount = 0;
            handlePollingError(modalInstance, 'trakttvAuthError', 'Authentication error', errorCode || status);
            break;
          case 404:
            pendingCount = 0;
            handlePollingError(modalInstance, 'trakttvInvalidCode', 'Invalid device code', status);
            break;
          case 409:
            pendingCount = 0;
            handlePollingError(modalInstance, 'trakttvAuthOk', 'Already authorized', status);
            break;
          case 410:
            pendingCount = 0;
            handlePollingError(modalInstance, 'trakttvExpired', 'Expired, please restart', status);
            break;
          case 418:
            pendingCount = 0;
            handlePollingError(modalInstance, 'trakttvDenied', 'Access denied', status);
            break;
          case 429:
            pendingCount = 0;
            currentPollingStepMs = Math.min(currentPollingStepMs * 2, 60 * 1000);
            var jitter = Math.random() * 1000;
            var retryAfterMs = parseRetryAfterMs(error && error.headers ? error.headers : {});
            var nextStepMs = Math.max(currentPollingStepMs + jitter, retryAfterMs || 0);
            logWarn('Device auth polling slowed down by server', {
              nextStepMs: nextStepMs
            }, {
              debugOnly: true
            });
            scheduleNext(nextStepMs);
            pollInFlight = false;
            break;
          default:
            pendingCount = 0;
            logWarn('Device auth poll returned unexpected status', {
              status: status
            }, {
              debugOnly: true
            });
            handlePollingError(modalInstance, 'trakttvAuthError', 'Authentication error', status || 'unknown-error');
            break;
        }
      });
    };
    checkNowHandler = function checkNowHandler() {
      if (pollInFlight) return;
      if (currentPollTimeoutId) {
        clearTimeout(currentPollTimeoutId);
        currentPollTimeoutId = null;
      }
      executePoll();
    };
    if (visibilityHandler) {
      document.removeEventListener('visibilitychange', visibilityHandler);
    }
    visibilityHandler = function visibilityHandler() {
      if (document.hidden) {
        if (currentPollTimeoutId) {
          clearTimeout(currentPollTimeoutId);
          currentPollTimeoutId = null;
        }
      } else {
        if (!currentPollTimeoutId && Lampa.Storage.get('trakt_active_device_auth') === true) {
          currentPollingStepMs = originalIntervalMs;
          scheduleNext(originalIntervalMs);
        }
      }
    };
    document.addEventListener('visibilitychange', visibilityHandler);
    scheduleNext(originalIntervalMs);
  }

  // ─────────────────────────────────────────────────────
  //  HELPERS — translation, bookmarks sync, etc.
  // ─────────────────────────────────────────────────────

  function t$1(key, fallback) {
    if (typeof Lampa === 'undefined' || !Lampa || !Lampa.Lang || typeof Lampa.Lang.translate !== 'function') {
      return fallback || key;
    }
    var translated = Lampa.Lang.translate(key);
    if (!translated || translated === key) {
      return fallback || translated || key;
    }
    return translated;
  }
  function ensureBookmarksSyncAvailable() {
    if (!Lampa.Storage.get('trakt_token')) {
      Lampa.Bell.push({
        text: t$1('trakt_bookmarks_auth_required', 'Login to Trakt.TV first')
      });
      return false;
    }
    if (!Api$1) {
      logApiMissing();
      Lampa.Bell.push({
        text: t$1('trakt_bookmarks_sync_failed', 'Bookmarks sync failed')
      });
      return false;
    }
    if (!Lampa.Favorite) {
      Lampa.Bell.push({
        text: t$1('trakt_bookmarks_local_unavailable', 'Local bookmarks are unavailable')
      });
      return false;
    }
    return true;
  }
  function getBookmarksSyncMode() {
    var mode = Lampa.Storage.field('trakt_bookmarks_mode');
    return mode === 'my_lists' ? 'my_lists' : 'watchlist';
  }
  function getSupportedFavoriteTypes() {
    var types = bookmarksSync && Array.isArray(bookmarksSync.supportedFavoriteTypes) ? bookmarksSync.supportedFavoriteTypes : DEFAULT_BOOKMARKS_SYNC_TYPES;
    return types.length ? types : DEFAULT_BOOKMARKS_SYNC_TYPES;
  }
  function getFavoriteTypeTitle(type) {
    if (type === undefined) type = 'book';
    return t$1('title_' + type, type);
  }
  function getBookmarksFavoriteTypeValues() {
    var values = {};
    getSupportedFavoriteTypes().forEach(function (type) {
      values[type] = getFavoriteTypeTitle(type);
    });
    return values;
  }
  function getBookmarksFavoriteType() {
    var type = (Lampa.Storage.field('trakt_bookmarks_favorite_type') || 'book').toString().trim().toLowerCase();
    var supportedTypes = getSupportedFavoriteTypes();
    return supportedTypes.indexOf(type) > -1 ? type : 'book';
  }
  function buildProgressBar(percent) {
    var total = 12;
    var safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
    var filled = Math.round(safePercent / 100 * total);
    return '[' + '#'.repeat(filled) + '-'.repeat(Math.max(0, total - filled)) + ']';
  }
  function formatSyncProgressText(operation, payload, favoriteType) {
    if (favoriteType === undefined) favoriteType = 'book';
    var percent = Math.max(0, Math.min(100, Number(payload.percent) || 0));
    var bar = buildProgressBar(percent);
    var favoriteTypeTitle = getFavoriteTypeTitle(favoriteType);
    var phaseText = '';
    switch (payload.phase) {
      case 'loading_source':
        phaseText = t$1('trakt_bookmarks_progress_loading_source', 'Loading source') + ' (p' + (payload.page || 1) + ')';
        break;
      case 'loading_target':
        phaseText = t$1('trakt_bookmarks_progress_loading_target', 'Loading target') + ' (p' + (payload.page || 1) + ')';
        break;
      case 'processing_import':
        phaseText = t$1('trakt_bookmarks_progress_import', 'Importing');
        break;
      case 'processing_export':
        phaseText = t$1('trakt_bookmarks_progress_export', 'Exporting');
        break;
      default:
        phaseText = t$1('trakt_bookmarks_progress_prepare', 'Preparing');
        break;
    }
    var counter = '';
    if (payload.total) {
      counter = ' ' + (payload.processed || 0) + '/' + payload.total;
    }
    return bar + ' ' + percent + '% ' + phaseText + counter + ' · ' + favoriteTypeTitle;
  }
  function formatSyncSummary(operation, summary, favoriteType) {
    if (favoriteType === undefined) favoriteType = 'book';
    var prefix = operation === 'import' ? t$1('trakt_bookmarks_import_done', 'Import completed') : t$1('trakt_bookmarks_export_done', 'Export completed');
    var favoriteTypeTitle = getFavoriteTypeTitle(summary.favorite_type || favoriteType);
    return prefix + ' (' + favoriteTypeTitle + '): ' + t$1('trakt_bookmarks_added', 'Added') + ' ' + (summary.added || 0) + ', ' + t$1('trakt_bookmarks_duplicates', 'Duplicates') + ' ' + (summary.duplicates || 0) + ', ' + t$1('trakt_bookmarks_skipped_unsupported', 'Skipped') + ' ' + (summary.skipped_unsupported || 0) + ', ' + t$1('trakt_bookmarks_failed', 'Failed') + ' ' + (summary.failed || 0);
  }
  function selectMyList(title, _onSelect) {
    if (!Api$1) return;
    Api$1.myLists({
      page: 1,
      limit: 100
    }).then(function (response) {
      var lists = response && Array.isArray(response.results) ? response.results.filter(function (list) {
        return !!list.id;
      }) : [];
      if (!lists.length) {
        Lampa.Bell.push({
          text: t$1('trakt_bookmarks_no_lists', 'No personal lists found')
        });
        return;
      }
      var items = lists.map(function (list) {
        var listTitle = list.list_title || list.title || list.name || String(list.id);
        var itemCount = Number(list.item_count) || 0;
        return {
          title: listTitle + ' (' + itemCount + ')',
          listId: list.id,
          listTitle: listTitle
        };
      });
      items.push({
        title: t$1('cancel', 'Cancel'),
        cancel: true
      });
      Lampa.Select.show({
        title: title,
        items: items,
        onSelect: function onSelect(item) {
          if (!item || item.cancel) {
            if (Lampa.Controller) Lampa.Controller.toggle('settings_component');
            return;
          }
          if (Lampa.Controller) Lampa.Controller.toggle('settings_component');
          _onSelect && _onSelect(item);
        },
        onBack: function onBack() {
          if (Lampa.Controller) Lampa.Controller.toggle('settings_component');
        }
      });
    })["catch"](function () {
      Lampa.Bell.push({
        text: t$1('trakt_bookmarks_lists_load_error', 'Failed to load personal lists')
      });
    });
  }
  function runBookmarksSyncOperation(_x, _x2) {
    return _runBookmarksSyncOperation.apply(this, arguments);
  }
  function _runBookmarksSyncOperation() {
    _runBookmarksSyncOperation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(operation, opts) {
      var source, target, listId, favoriteType, resolvedFavoriteType, favoriteTypeTitle, isCanceled, startActionText, startText, summary, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (opts === undefined) opts = {};
            source = opts.source || 'watchlist';
            target = opts.target || 'watchlist';
            listId = opts.listId || null;
            favoriteType = opts.favoriteType || 'book';
            if (ensureBookmarksSyncAvailable()) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            if (!isBookmarksSyncRunning) {
              _context.n = 2;
              break;
            }
            Lampa.Bell.push({
              text: t$1('trakt_bookmarks_operation_in_progress', 'Bookmarks sync already in progress')
            });
            return _context.a(2);
          case 2:
            resolvedFavoriteType = getSupportedFavoriteTypes().indexOf(favoriteType) > -1 ? favoriteType : getBookmarksFavoriteType();
            favoriteTypeTitle = getFavoriteTypeTitle(resolvedFavoriteType);
            isBookmarksSyncRunning = true;
            isCanceled = false;
            startActionText = operation === 'import' ? t$1('trakt_bookmarks_import_start', 'Starting import') : t$1('trakt_bookmarks_export_start', 'Starting export');
            startText = startActionText + ': ' + favoriteTypeTitle;
            Lampa.Loading.start(function () {
              isCanceled = true;
            }, startText);
            _context.p = 3;
            if (!(operation === 'import')) {
              _context.n = 5;
              break;
            }
            _context.n = 4;
            return bookmarksSync.importBookmarks({
              api: Api$1,
              favorite: Lampa.Favorite,
              source: source,
              listId: listId,
              favoriteType: resolvedFavoriteType,
              checkCancel: function checkCancel() {
                return isCanceled;
              },
              onProgress: function onProgress(payload) {
                Lampa.Loading.setText(formatSyncProgressText(operation, payload, resolvedFavoriteType));
              }
            });
          case 4:
            _t = _context.v;
            _context.n = 7;
            break;
          case 5:
            _context.n = 6;
            return bookmarksSync.exportBookmarks({
              api: Api$1,
              favorite: Lampa.Favorite,
              target: target,
              listId: listId,
              favoriteType: resolvedFavoriteType,
              checkCancel: function checkCancel() {
                return isCanceled;
              },
              onProgress: function onProgress(payload) {
                Lampa.Loading.setText(formatSyncProgressText(operation, payload, resolvedFavoriteType));
              }
            });
          case 6:
            _t = _context.v;
          case 7:
            summary = _t;
            Lampa.Bell.push({
              text: formatSyncSummary(operation, summary, resolvedFavoriteType)
            });
            logDebug('Bookmarks sync summary', {
              operation: operation,
              summary: summary
            });
            _context.n = 9;
            break;
          case 8:
            _context.p = 8;
            _t2 = _context.v;
            if (_t2 && _t2.code === 'canceled') {
              Lampa.Bell.push({
                text: t$1('trakt_bookmarks_canceled', 'Operation canceled')
              });
            } else {
              Lampa.Bell.push({
                text: t$1('trakt_bookmarks_sync_failed', 'Bookmarks sync failed')
              });
              logError('Bookmarks sync failed', {
                operation: operation,
                error: _t2
              }, {
                debugOnly: true
              });
            }
          case 9:
            _context.p = 9;
            Lampa.Loading.stop();
            isBookmarksSyncRunning = false;
            return _context.f(9);
          case 10:
            return _context.a(2);
        }
      }, _callee, null, [[3, 8, 9, 10]]);
    }));
    return _runBookmarksSyncOperation.apply(this, arguments);
  }
  function startBookmarksImportFlow() {
    if (!ensureBookmarksSyncAvailable()) return;
    var favoriteType = getBookmarksFavoriteType();
    var favoriteTypeTitle = getFavoriteTypeTitle(favoriteType);
    if (getBookmarksSyncMode() === 'my_lists') {
      selectMyList(t$1('trakt_bookmarks_import_select_list', 'Select source list') + ': ' + favoriteTypeTitle, function (item) {
        runBookmarksSyncOperation('import', {
          source: 'my_list',
          listId: item.listId,
          favoriteType: favoriteType
        });
      });
      return;
    }
    runBookmarksSyncOperation('import', {
      source: 'watchlist',
      favoriteType: favoriteType
    });
  }
  function startBookmarksExportFlow() {
    if (!ensureBookmarksSyncAvailable()) return;
    var favoriteType = getBookmarksFavoriteType();
    var favoriteTypeTitle = getFavoriteTypeTitle(favoriteType);
    if (getBookmarksSyncMode() === 'my_lists') {
      selectMyList(t$1('trakt_bookmarks_export_select_list', 'Select target list') + ': ' + favoriteTypeTitle, function (item) {
        runBookmarksSyncOperation('export', {
          target: 'my_list',
          listId: item.listId,
          favoriteType: favoriteType
        });
      });
      return;
    }
    runBookmarksSyncOperation('export', {
      target: 'watchlist',
      favoriteType: favoriteType
    });
  }
  var config = {
    main: main
  };

  var STORAGE_KEY$1 = 'trakt_scrobble_queue';
  var MAX_QUEUE_SIZE = 50;
  var MAX_RETRIES = 3;
  var PROCESS_DELAY_MS = 500;
  var INIT_DELAY_MS = 2000;
  var BETWEEN_ITEMS_DELAY_MS = 200;
  var queue = [];
  var isProcessing = false;
  var processTimerId = null;
  function buildScrobbleBody$1(media, progress) {
    var isShow = media.method === 'tv' || media.method === 'show' || media.card_type === 'tv' || media.card_type === 'show' || !!media.original_name;
    var safeProgress = Math.max(0, Math.min(100, Number(progress) || 0));
    if (isShow) {
      var season = media.season_number || media.season;
      var episode = media.episode_number || media.episode;
      if (!season || !episode) {
        if (debugEnabled()) {
          logWarn('scrobble_queue: season/episode missing for show, skipping', {
            media: {
              id: media.id,
              season_number: media.season_number,
              season: media.season,
              episode_number: media.episode_number,
              episode: media.episode
            },
            season: season,
            episode: episode
          });
        }
        return null;
      }
      return {
        show: {
          ids: {
            tmdb: media.id
          }
        },
        episode: {
          season: season,
          number: episode
        },
        progress: safeProgress
      };
    }
    return {
      movie: {
        ids: {
          tmdb: media.id
        }
      },
      progress: safeProgress
    };
  }
  function replayAction(_x) {
    return _replayAction.apply(this, arguments);
  }
  function _replayAction() {
    _replayAction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(item) {
      var body, status, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            body = buildScrobbleBody$1(item.media, item.progress);
            _context.p = 1;
            _context.n = 2;
            return api$1.scrobble(item.type, body);
          case 2:
            _context.n = 5;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            status = _t && _t.status; // 409 = already processed, 422 = invalid state — treat as success
            if (!(status === 409 || status === 422)) {
              _context.n = 4;
              break;
            }
            return _context.a(2);
          case 4:
            throw _t;
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
    }));
    return _replayAction.apply(this, arguments);
  }
  function persistQueue() {
    try {
      if (typeof Lampa !== 'undefined' && Lampa && Lampa.Storage && typeof Lampa.Storage.set === 'function') {
        Lampa.Storage.set(STORAGE_KEY$1, queue);
      }
    } catch (error) {
      if (debugEnabled()) {
        logWarn('scrobble_queue: failed to persist queue', {
          error: error && error.message
        });
      }
    }
  }
  function loadQueue() {
    try {
      if (typeof Lampa !== 'undefined' && Lampa && Lampa.Storage && typeof Lampa.Storage.get === 'function') {
        var stored = Lampa.Storage.get(STORAGE_KEY$1);
        if (Array.isArray(stored)) {
          return stored;
        }
      }
    } catch (error) {
      if (debugEnabled()) {
        logWarn('scrobble_queue: failed to load queue', {
          error: error && error.message
        });
      }
    }
    return [];
  }
  function scheduleProcess(delayMs) {
    if (processTimerId !== null) {
      clearTimeout(processTimerId);
    }
    processTimerId = setTimeout(function () {
      processTimerId = null;
      processQueueImpl();
    }, delayMs);
  }
  function processQueueImpl() {
    return _processQueueImpl.apply(this, arguments);
  }
  function _processQueueImpl() {
    _processQueueImpl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var initialLength, succeeded, discarded, item, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!isProcessing) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            if (!(queue.length === 0)) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2);
          case 2:
            isProcessing = true;
            initialLength = queue.length;
            succeeded = 0;
            discarded = 0;
          case 3:
            if (!(queue.length > 0)) {
              _context2.n = 9;
              break;
            }
            item = queue[0];
            _context2.p = 4;
            _context2.n = 5;
            return replayAction(item);
          case 5:
            queue.shift();
            succeeded++;
            persistQueue();
            if (debugEnabled()) {
              logDebug('scrobble_queue: item succeeded', {
                id: item.id,
                type: item.type
              });
            }
            _context2.n = 7;
            break;
          case 6:
            _context2.p = 6;
            _t2 = _context2.v;
            item.retries = (item.retries || 0) + 1;
            queue.shift();
            if (item.retries >= MAX_RETRIES) {
              discarded++;
              persistQueue();
              if (debugEnabled()) {
                logWarn('scrobble_queue: item discarded after max retries', {
                  id: item.id,
                  type: item.type,
                  retries: item.retries,
                  error: _t2 && _t2.message
                });
              }
            } else {
              queue.push(item);
              persistQueue();
              if (debugEnabled()) {
                logWarn('scrobble_queue: item failed, re-queued for retry', {
                  id: item.id,
                  type: item.type,
                  retries: item.retries,
                  error: _t2 && _t2.message
                });
              }
            }
          case 7:
            if (!(queue.length > 0)) {
              _context2.n = 8;
              break;
            }
            _context2.n = 8;
            return new Promise(function (resolve) {
              setTimeout(resolve, BETWEEN_ITEMS_DELAY_MS);
            });
          case 8:
            _context2.n = 3;
            break;
          case 9:
            isProcessing = false;
            if (debugEnabled()) {
              logDebug('scrobble_queue: processing complete', {
                initialLength: initialLength,
                succeeded: succeeded,
                discarded: discarded,
                remaining: queue.length
              });
            }
          case 10:
            return _context2.a(2);
        }
      }, _callee2, null, [[4, 6]]);
    }));
    return _processQueueImpl.apply(this, arguments);
  }
  var scrobbleQueue = {
    init: function init() {
      queue = loadQueue();
      if (queue.length > 0) {
        if (debugEnabled()) {
          logDebug('scrobble_queue: loaded pending items', {
            count: queue.length
          });
        }
        scheduleProcess(INIT_DELAY_MS);
      }
    },
    enqueue: function enqueue(action) {
      var item = {
        id: 'sc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
        type: action.type,
        media: action.media,
        progress: action.progress,
        created_at: action.created_at || Date.now(),
        retries: 0
      };
      queue.push(item);
      if (queue.length > MAX_QUEUE_SIZE) {
        var removed = queue.shift();
        if (debugEnabled()) {
          logDebug('scrobble_queue: queue full, dropped oldest', {
            droppedId: removed.id
          });
        }
      }
      persistQueue();
      if (!isProcessing) {
        scheduleProcess(PROCESS_DELAY_MS);
      }
    },
    processQueue: processQueueImpl,
    getQueueLength: function getQueueLength() {
      return queue.length;
    },
    destroy: function destroy() {
      if (processTimerId !== null) {
        clearTimeout(processTimerId);
        processTimerId = null;
      }
      isProcessing = false;
    }
  };

  // ── Throttle State ─────────────────────────────────────────────────────────

  var throttleState = {
    lastSendTime: 0,
    lastSentPercent: 0,
    minInterval: 90000,
    // 90 seconds min between updates
    minPercentChange: 5,
    // 5% absolute change threshold
    currentMedia: null,
    timerId: null
  };

  // ── Helpers ────────────────────────────────────────────────────────────────

  /**
   * Determine content type from media object.
   * Inline implementation — no import from watching.js to avoid circular deps.
   * @param {Object} media
   * @returns {string} 'movie' or 'show'
   */
  function getContentType$2(media) {
    if (!media) return 'movie';
    if (media.method === 'tv' || media.method === 'show') return 'show';
    if (media.card_type === 'tv' || media.card_type === 'show') return 'show';
    if (media.media_type === 'tv' || media.media_type === 'show') return 'show';
    if (media.original_name || media.name) return 'show';
    if (media.episode_run_time || media.first_air_date || media.created_by || media.number_of_seasons || media.number_of_episodes) {
      return 'show';
    }
    return 'movie';
  }

  /**
   * Build the scrobble request body for /scrobble/* endpoints.
   * @param {Object} media
   * @param {number} progress 0-100
   * @returns {Object|null} body or null if media.id missing
   */
  function buildScrobbleBody(media, progress) {
    if (!media || !media.id) {
      if (debugEnabled()) {
        logWarn('scrobble: media.id missing, skipping', {
          media: media
        });
      }
      return null;
    }
    var type = getContentType$2(media);
    var safeProgress = Math.max(0, Math.min(100, Number(progress) || 0));
    if (type === 'movie') {
      return {
        movie: {
          ids: {
            tmdb: media.id
          }
        },
        progress: safeProgress
      };
    }
    var season = media.season_number || media.season;
    var episode = media.episode_number || media.episode;
    if (!season || !episode) {
      if (debugEnabled()) {
        logWarn('scrobble: season/episode missing for show, skipping', {
          media: {
            id: media.id,
            season_number: media.season_number,
            season: media.season,
            episode_number: media.episode_number,
            episode: media.episode
          },
          season: season,
          episode: episode
        });
      }
      return null;
    }
    return {
      show: {
        ids: {
          tmdb: media.id
        }
      },
      episode: {
        season: season,
        number: episode
      },
      progress: safeProgress
    };
  }

  /**
   * Read minInterval from Lampa.Storage with fallback.
   * @returns {number} interval in ms
   */
  function resolveMinInterval() {
    var seconds = 90;
    try {
      if (typeof Lampa !== 'undefined' && Lampa && Lampa.Storage && typeof Lampa.Storage.field === 'function') {
        var stored = Lampa.Storage.field('trakt_scrobble_interval');
        if (stored !== undefined && stored !== null) {
          var parsed = Number(stored);
          if (Number.isFinite(parsed) && parsed > 0) {
            seconds = parsed;
          }
        }
      }
    } catch (e) {
      // silent fallback
    }
    return seconds * 1000;
  }

  // ── Throttle Logic ─────────────────────────────────────────────────────────

  function shouldSendProgress(percent) {
    var now = Date.now();
    var elapsed = now - throttleState.lastSendTime;
    var currentInterval = resolveMinInterval();

    // No progress sent before
    if (throttleState.lastSendTime === 0) return true;

    // Heartbeat: send even without percent change if enough time passed
    if (elapsed > currentInterval * 2) return true;

    // Normal threshold check
    if (elapsed > currentInterval && Math.abs(percent - throttleState.lastSentPercent) >= throttleState.minPercentChange) {
      return true;
    }
    return false;
  }
  function updateThrottleState(percent) {
    throttleState.lastSendTime = Date.now();
    throttleState.lastSentPercent = percent;
  }

  // ── Scrobble Actions ───────────────────────────────────────────────────────

  function performScrobble(action, media, progress) {
    var body = buildScrobbleBody(media, progress);
    if (!body) return Promise.resolve();
    return api$1.scrobble(action, body).then(function (result) {
      if (debugEnabled()) {
        logDebug("scrobble/".concat(action, " success"), {
          type: getContentType$2(media),
          id: media.id,
          progress: body.progress
        });
      }
      return result;
    })["catch"](function (error) {
      var status = error && error.status;

      // 409 = already processed, 422 = invalid state (e.g. pause after completion)
      if (status === 409 || status === 422) {
        if (debugEnabled()) {
          logDebug("scrobble/".concat(action, " ").concat(status, " ignored (terminal)"), {
            id: media.id,
            progress: body.progress
          });
        }
        return;
      }
      logWarn("scrobble/".concat(action, " failed, enqueuing"), {
        error: error && error.message,
        status: status,
        media: media.id,
        progress: body.progress
      }, {
        debugOnly: true
      });
      scrobbleQueue.enqueue({
        type: action,
        media: media ? _objectSpread2({}, media) : null,
        progress: body.progress,
        created_at: Date.now()
      });
    });
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  var scrobbler = {
    init: function init(media) {
      throttleState.currentMedia = media || null;
      throttleState.lastSendTime = 0;
      throttleState.lastSentPercent = 0;
      throttleState.timerId = null;
      if (debugEnabled()) {
        logDebug('scrobbler initialized', {
          hasMedia: !!media
        });
      }
    },
    scrobbleStart: function scrobbleStart(media, progress) {
      return performScrobble('start', media, progress).then(function (result) {
        if (result) {
          updateThrottleState(Number(progress) || 0);
        }
        return result;
      });
    },
    scrobblePause: function scrobblePause(media, progress) {
      return performScrobble('pause', media, progress);
    },
    scrobbleStop: function scrobbleStop(media, progress) {
      return performScrobble('stop', media, progress);
    },
    onProgressUpdate: function onProgressUpdate(hash, percent, road, media) {
      // Ignore early or empty progress
      var safePercent = Number(percent) || 0;
      if (safePercent < 1 || !media) {
        if (debugEnabled()) {
          logDebug('scrobbler onProgressUpdate: skipped (percent < 1 or no media)', {
            percent: safePercent,
            hasMedia: !!media
          });
        }
        return;
      }

      // Store current media reference
      if (media) {
        throttleState.currentMedia = media;
      }

      // Check throttle before sending
      if (shouldSendProgress(safePercent)) {
        if (debugEnabled()) {
          logDebug('scrobbler onProgressUpdate: sending progress', {
            percent: safePercent,
            mediaId: media && media.id
          });
        }
        updateThrottleState(safePercent);

        // Trakt uses /scrobble/start for progress updates with progress > 0
        performScrobble('start', media, safePercent);
      }
    },
    getCurrentProgress: function getCurrentProgress() {
      return {
        percent: throttleState.lastSentPercent,
        time: Date.now()
      };
    },
    setCurrentMedia: function setCurrentMedia(media) {
      throttleState.currentMedia = media;
    },
    destroy: function destroy() {
      if (throttleState.timerId !== null) {
        clearTimeout(throttleState.timerId);
        throttleState.timerId = null;
      }
      throttleState.lastSendTime = 0;
      throttleState.lastSentPercent = 0;
      throttleState.currentMedia = null;
      if (debugEnabled()) {
        logDebug('scrobbler destroyed');
      }
    }
  };

  /**
   * Simple in-memory idempotency cache and per-key lock to avoid duplicate Trakt finish calls on Smart TV.
   * Persisted in Lampa.Storage session scope under 'trakt_completion_cache'.
   * Record shape: { ts:number, token:string, status:'intent'|'finishing'|'finished' }
   */

  var completionCache = new Map(); // key -> { ts, token, status }
  var lockQueues = new Map(); // key -> array of resolvers for queued locks
  var requestInProgress = {}; // Об'єкт для відстеження запитів, що виконуються
  var hashMetaCache = new Map(); // hash -> { ts, card, season, episode, ids }
  var cloudInjectInProgress = false; // Flag: suppress scrobble during cloud Timeline inject
  var HASH_META_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

  function nowSec() {
    return Math.floor(Date.now() / 1000);
  }
  function sleep(ms) {
    return new Promise(function (r) {
      return setTimeout(r, ms);
    });
  }
  function getTTL() {
    // 6h default to prevent duplicate finishes from periodic timeline saves in long sessions.
    var def = 60 * 60 * 6;
    var v = Lampa.Storage.field('trakt_completion_ttl');
    var num = parseInt(v !== undefined ? v : def);
    return isNaN(num) ? def : num;
  }
  function getDebounceMs() {
    var def = 400;
    var v = Lampa.Storage.field('trakt_finish_debounce');
    var num = parseInt(v !== undefined ? v : def);
    return isNaN(num) ? def : num;
  }
  function logEnabled() {
    return Lampa.Storage.field('trakt_enable_logging');
  }
  function shouldEmitDebugLog() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var first = typeof args[0] === 'string' ? args[0] : '';
    var second = typeof args[1] === 'string' ? args[1] : '';
    if (first === 'watching.init called while already initialized, skipping') return true;
    if (first === 'Request for key is already in progress, skipping.') return true;
    if (first === 'Episode index not resolved') return true;
    if (first === 'finish error') return true;
    if (first === 'addShowToWatching called while already adding, skipping') return true;
    if (first === 'finish') {
      if (second.indexOf('retry attempt') === 0) return true;
      if (second === 'abort on client error') return true;
      if (second === '409 conflict -> treat as finished, no retries') return true;
    }
    return false;
  }
  function slog() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (!logEnabled() || !shouldEmitDebugLog(args)) return;
    if (!args.length) return;
    var message = args[0];
    var rest = args.slice(1);
    if (!rest.length) logDebug(message);else if (rest.length === 1) logDebug(message, rest[0]);else logDebug(message, rest);
  }
  function normalizeCardForCache(card) {
    if (!card) return null;
    return {
      id: card.id,
      ids: card.ids,
      original_name: card.original_name,
      name: card.name,
      original_title: card.original_title,
      title: card.title,
      first_air_date: card.first_air_date,
      created_by: card.created_by,
      number_of_seasons: card.number_of_seasons,
      number_of_episodes: card.number_of_episodes,
      episode_run_time: card.episode_run_time,
      card_type: card.card_type,
      media_type: card.media_type,
      method: card.method
    };
  }
  function loadHashMetaCache() {
    var raw = Lampa.Storage.get('trakt_hash_meta_cache');
    var now = nowSec();
    hashMetaCache.clear();
    if (raw && Array.isArray(raw.entries)) {
      raw.entries.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];
        if (v && now - v.ts <= HASH_META_TTL_SEC) {
          hashMetaCache.set(k, v);
        }
      });
    }
    slog('hashMetaCache restored', Object.fromEntries(hashMetaCache));
  }
  function persistHashMetaCache() {
    var now = nowSec();
    var _iterator = _createForOfIteratorHelper(hashMetaCache.entries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          k = _step$value[0],
          v = _step$value[1];
        if (!v || now - v.ts > HASH_META_TTL_SEC) hashMetaCache["delete"](k);
      }
      // keep cache small
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (hashMetaCache.size > 300) {
      var ordered = Array.from(hashMetaCache.entries()).sort(function (a, b) {
        return (a[1].ts || 0) - (b[1].ts || 0);
      });
      ordered.slice(0, hashMetaCache.size - 300).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
          k = _ref4[0];
        return hashMetaCache["delete"](k);
      });
    }
    var payload = {
      ts: now,
      entries: Array.from(hashMetaCache.entries())
    };
    Lampa.Storage.set('trakt_hash_meta_cache', payload);
  }
  function setHashMeta(hash, meta) {
    if (!hash || !meta) return;
    var next = {
      ts: nowSec(),
      card: normalizeCardForCache(meta.card),
      season: meta.season,
      episode: meta.episode,
      ids: meta.ids || meta.card && meta.card.ids
    };
    hashMetaCache.set(hash, next);
    persistHashMetaCache();
  }
  function getHashMeta(hash) {
    if (!hash) return null;
    var rec = hashMetaCache.get(hash);
    if (!rec) return null;
    if (nowSec() - rec.ts > HASH_META_TTL_SEC) {
      hashMetaCache["delete"](hash);
      return null;
    }
    return rec;
  }
  function extractSeasonEpisode(obj) {
    if (!obj) return {};
    var season = obj.season_number || obj.season || obj.seasonNumber || obj.s;
    var episode = obj.episode_number || obj.episode || obj.episodeNumber || obj.e;
    return {
      season: season,
      episode: episode
    };
  }

  /**
   * Brute-force season/episode from timeline hash.
   * Hash formula: Lampa.Utils.hash([season, season > 10 ? ':' : '', episode, originalName].join(''))
   */
  function resolveSeasonEpisode(hash, originalName) {
    if (!hash || !originalName) return {};
    for (var s = 1; s <= 30; s++) {
      var sep = s > 10 ? ':' : '';
      for (var e = 1; e <= 60; e++) {
        var computed = Lampa.Utils.hash([s, sep, e, originalName].join(''));
        if (computed == hash) {
          return {
            season: s,
            episode: e
          };
        }
      }
    }
    return {};
  }
  function collectTitleCandidates() {
    var seen = new Set();
    var candidates = [];
    for (var _len2 = arguments.length, sources = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      sources[_key2] = arguments[_key2];
    }
    sources.forEach(function (source) {
      if (!source || _typeof(source) !== 'object') return;
      [source.original_name, source.original_title, source.name, source.title].forEach(function (value) {
        if (typeof value !== 'string') return;
        var title = value.trim();
        if (!title || seen.has(title)) return;
        seen.add(title);
        candidates.push(title);
      });
    });
    return candidates;
  }

  /**
   * Build idempotency key for media card or episode
   * movie: 'movie:trakt:ID' | 'movie:tmdb:ID' | 'movie:hash:...'
   * episode: 'episode:trakt:showID:Sx:Ey' or fallback by hash
   */
  function getCompletionKey(media) {
    try {
      var type = getContentType$1(media) === 'show' ? 'episode' : 'movie';
      var ids = media.ids || {};
      if (type === 'movie') {
        if (ids.trakt) return "movie:trakt:".concat(ids.trakt);
        if (media.id) return "movie:tmdb:".concat(media.id);
        if (media.hash) return "movie:hash:".concat(media.hash);
      } else {
        // Prefer show trakt id + season/episode if present on card
        var showTrakt = ids && ids.trakt || media.show && media.show.ids && media.show.ids.trakt;
        var s = media.season_number || media.season || media.seasonNumber;
        var e = media.episode_number || media.episode || media.episodeNumber;
        if (showTrakt && s && e) return "episode:trakt:".concat(showTrakt, ":S").concat(s, ":E").concat(e);
        // fallback tmdb
        if (media.id && s && e) return "episode:tmdb:".concat(media.id, ":S").concat(s, ":E").concat(e);
        if (media.hash) return "episode:hash:".concat(media.hash);
      }
    } catch (e) {}
    // ultimate fallback: hashed title
    var title = media.original_title || media.original_name || media.name || media.title || 'unknown';
    return "unknown:".concat(Lampa.Utils.hash(title));
  }

  /**
   * Persist/restore cache in session storage with TTL cleanup
   */
  function loadSessionCache() {
    var raw = Lampa.Storage.get('trakt_completion_cache');
    var ttl = getTTL();
    var now = nowSec();
    completionCache.clear();
    if (raw && Array.isArray(raw.entries)) {
      raw.entries.forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          k = _ref6[0],
          v = _ref6[1];
        if (v && now - v.ts <= ttl) {
          completionCache.set(k, v);
        }
      });
    }
    slog('completionCache restored', Object.fromEntries(completionCache));
  }
  function persistSessionCache() {
    var ttl = getTTL();
    var now = nowSec();
    // cleanup expired
    var _iterator2 = _createForOfIteratorHelper(completionCache.entries()),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = _slicedToArray(_step2.value, 2),
          k = _step2$value[0],
          v = _step2$value[1];
        if (!v || now - v.ts > ttl) completionCache["delete"](k);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var payload = {
      ts: now,
      entries: Array.from(completionCache.entries())
    };
    Lampa.Storage.set('trakt_completion_cache', payload);
  }

  /**
   * Check if finish is allowed once within TTL for a key
   * Returns { allow:boolean, reason:string }
   */
  function canFinishOnce(key) {
    var ttl = getTTL();
    var rec = completionCache.get(key);
    var now = nowSec();
    if (!rec) return {
      allow: true,
      reason: 'no_record'
    };
    if (now - rec.ts > ttl) {
      completionCache["delete"](key);
      return {
        allow: true,
        reason: 'expired'
      };
    }
    if (rec.status === 'finished') return {
      allow: false,
      reason: 'already_finished'
    };
    if (rec.status === 'finishing') return {
      allow: false,
      reason: 'already_finishing'
    };
    return {
      allow: true,
      reason: 'has_intent'
    };
  }

  /**
   * Update record and persist
   */
  function markFinished(key, token, status) {
    var rec = {
      ts: nowSec(),
      token: token,
      status: status
    };
    completionCache.set(key, rec);
    persistSessionCache();
    slog('markFinished', key, rec);
  }

  /**
   * Simple per-key mutex using a queue of Promises
   */
  function withPerKeyLock(_x, _x2) {
    return _withPerKeyLock.apply(this, arguments);
  }
  /**
   * Idempotent finisher with limited retries
   * doFinish must perform actual network call; it should throw error with {status} when HTTP error known
   */
  function _withPerKeyLock() {
    _withPerKeyLock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(key, fn) {
      var queue, release, p, prev;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            queue = lockQueues.get(key);
            if (!queue) {
              queue = [];
              lockQueues.set(key, queue);
            }
            p = new Promise(function (res) {
              return release = res;
            });
            prev = queue.length ? queue[queue.length - 1] : Promise.resolve();
            queue.push(p);
            _context.p = 1;
            _context.n = 2;
            return prev;
          case 2:
            _context.n = 3;
            return fn();
          case 3:
            return _context.a(2, _context.v);
          case 4:
            _context.p = 4;
            release(); // resolve current
            queue.shift(); // remove current
            if (!queue.length) lockQueues["delete"](key);
            return _context.f(4);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1,, 4, 5]]);
    }));
    return _withPerKeyLock.apply(this, arguments);
  }
  function finishWithIdempotency(_x3) {
    return _finishWithIdempotency.apply(this, arguments);
  }
  /**
   * Debounced finish intent setter
   */
  function _finishWithIdempotency() {
    _finishWithIdempotency = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref7) {
      var key, token, doFinish, _ref7$logPrefix, logPrefix;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            key = _ref7.key, token = _ref7.token, doFinish = _ref7.doFinish, _ref7$logPrefix = _ref7.logPrefix, logPrefix = _ref7$logPrefix === void 0 ? 'finish' : _ref7$logPrefix;
            return _context3.a(2, withPerKeyLock(key, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
              var check, delays, lastErr, attempt, res, status, _t;
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.p = _context2.n) {
                  case 0:
                    check = canFinishOnce(key);
                    slog(logPrefix, 'canFinishOnce', key, check);
                    if (check.allow) {
                      _context2.n = 1;
                      break;
                    }
                    return _context2.a(2, {
                      skipped: true,
                      reason: check.reason
                    });
                  case 1:
                    // set finishing
                    markFinished(key, token, 'finishing');
                    delays = [500, 1500, 4500];
                    lastErr = null;
                    attempt = 0;
                  case 2:
                    if (!(attempt < delays.length)) {
                      _context2.n = 10;
                      break;
                    }
                    _context2.p = 3;
                    _context2.n = 4;
                    return doFinish();
                  case 4:
                    res = _context2.v;
                    // On success 2xx
                    markFinished(key, token, 'finished');
                    return _context2.a(2, {
                      ok: true,
                      status: res && res.status,
                      data: res
                    });
                  case 5:
                    _context2.p = 5;
                    _t = _context2.v;
                    status = _t && _t.status; // Treat 409 as finished without retries
                    if (!(status === 409)) {
                      _context2.n = 6;
                      break;
                    }
                    slog(logPrefix, '409 conflict -> treat as finished, no retries');
                    markFinished(key, token, 'finished');
                    return _context2.a(2, {
                      ok: true,
                      status: 409,
                      conflict: true
                    });
                  case 6:
                    if (!(!status || status >= 500 && status < 600)) {
                      _context2.n = 8;
                      break;
                    }
                    lastErr = _t;
                    slog(logPrefix, "retry attempt ".concat(attempt + 1), {
                      status: status,
                      err: _t
                    });
                    if (!(attempt < delays.length - 1)) {
                      _context2.n = 7;
                      break;
                    }
                    _context2.n = 7;
                    return sleep(delays[attempt]);
                  case 7:
                    return _context2.a(3, 9);
                  case 8:
                    // Other 4xx => no retries
                    slog(logPrefix, 'abort on client error', {
                      status: status,
                      err: _t
                    });
                    // roll back to intent so later we might attempt again if user retriggers after TTL
                    markFinished(key, token, 'intent');
                    return _context2.a(2, {
                      ok: false,
                      status: status,
                      clientError: true
                    });
                  case 9:
                    attempt++;
                    _context2.n = 2;
                    break;
                  case 10:
                    // all retries exhausted -> rollback to intent
                    markFinished(key, token, 'intent');
                    return _context2.a(2, {
                      ok: false,
                      error: lastErr
                    });
                }
              }, _callee2, null, [[3, 5]]);
            }))));
        }
      }, _callee3);
    }));
    return _finishWithIdempotency.apply(this, arguments);
  }
  var intentTimers = new Map(); // key -> timeout id
  function markFinishIntent(key) {
    var token = Lampa.Storage.get('trakt_token');
    var ttl = getTTL();
    var now = nowSec();
    var rec = completionCache.get(key);
    var isFresh = rec && now - rec.ts <= ttl;

    // Do not downgrade terminal states to intent inside TTL window.
    if (isFresh && (rec.status === 'finished' || rec.status === 'finishing')) {
      slog('markFinishIntent skipped (terminal state preserved)', key, rec);
      return {
        skipped: true,
        reason: rec.status
      };
    }
    var next = {
      ts: now,
      token: token,
      status: 'intent'
    };
    completionCache.set(key, next);
    persistSessionCache();

    // debounce persist bursts
    var wait = getDebounceMs();
    if (intentTimers.has(key)) clearTimeout(intentTimers.get(key));
    var t = setTimeout(function () {
      var cur = completionCache.get(key);
      // keep latest ts fresh only for intent state
      if (cur && cur.status === 'intent') {
        completionCache.set(key, _objectSpread2(_objectSpread2({}, cur), {}, {
          ts: nowSec()
        }));
        persistSessionCache();
        slog('markFinishIntent debounced persisted', key);
      }
    }, wait);
    intentTimers.set(key, t);
    slog('markFinishIntent', key, next);
    return {
      ok: true
    };
  }

  /**
   * Compute finish for given media via API:
   * - movie -> /sync/history
   * - show episode -> /sync/history with show/episodes derived by hash/season/episode
   * This function is the only entry point that sends final Trakt request.
   */
  function finish(_x4) {
    return _finish.apply(this, arguments);
  }
  /**
   * Визначає тип вмісту (фільм чи серіал) на основі даних картки
   * @param {Object} card - Картка вмісту
   * @returns {string} 'movie' або 'show'
   */
  function _finish() {
    _finish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(media) {
      var token, key, doFinish, result;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            token = Lampa.Storage.get('trakt_token');
            if (token) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2, {
              skipped: true,
              reason: 'no_token'
            });
          case 1:
            key = getCompletionKey(media); // START -- RACE CONDITION FIX
            if (!requestInProgress[key]) {
              _context5.n = 2;
              break;
            }
            slog('Request for key is already in progress, skipping.', key);
            return _context5.a(2, {
              skipped: true,
              reason: 'in_progress'
            });
          case 2:
            requestInProgress[key] = true;
            // END -- RACE CONDITION FIX
            _context5.p = 3;
            doFinish = /*#__PURE__*/function () {
              var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
                var type, tmdbId, search, e, traktId, res, _tmdbId, _search, _e, traktShowId, season, episode, seasons, _e2, last, titleCandidates, found, _iterator5, _step5, s, _iterator6, _step6, ep, _iterator7, _step7, title, epHash, _e3, _res, _t2, _t3, _t4;
                return _regenerator().w(function (_context4) {
                  while (1) switch (_context4.p = _context4.n) {
                    case 0:
                      // replicate existing logic but only final "history" call
                      type = getContentType$1(media); // if movie -> addToHistory({method:'movie', id, ids})
                      if (!(type === 'movie')) {
                        _context4.n = 4;
                        break;
                      }
                      // look up trakt id if needed
                      tmdbId = media.id || media.ids && media.ids.tmdb;
                      _context4.n = 1;
                      return api$1.get("/search/tmdb/".concat(tmdbId, "?type=movie"));
                    case 1:
                      search = _context4.v;
                      if (!(!search || !search.length || !search[0].movie || !search[0].movie.ids)) {
                        _context4.n = 2;
                        break;
                      }
                      e = new Error('Movie not found');
                      e.status = 404;
                      throw e;
                    case 2:
                      traktId = search[0].movie.ids.trakt;
                      _context4.n = 3;
                      return api$1.addToHistory({
                        method: 'movie',
                        id: tmdbId,
                        ids: _objectSpread2(_objectSpread2({}, media.ids || {}), {}, {
                          trakt: traktId
                        })
                      });
                    case 3:
                      res = _context4.v;
                      return _context4.a(2, {
                        status: 200,
                        data: res
                      });
                    case 4:
                      // show episode
                      _tmdbId = media.id || media.ids && media.ids.tmdb;
                      _context4.n = 5;
                      return api$1.get("/search/tmdb/".concat(_tmdbId, "?type=show"));
                    case 5:
                      _search = _context4.v;
                      if (!(!_search || !_search.length || !_search[0].show || !_search[0].show.ids)) {
                        _context4.n = 6;
                        break;
                      }
                      _e = new Error('Show not found');
                      _e.status = 404;
                      throw _e;
                    case 6:
                      traktShowId = _search[0].show.ids.trakt; // Prefer season/episode from media; otherwise try to resolve by timeline hash if available
                      season = media.season_number || media.season || media.seasonNumber;
                      episode = media.episode_number || media.episode || media.episodeNumber;
                      if (!(!season || !episode)) {
                        _context4.n = 30;
                        break;
                      }
                      _context4.n = 7;
                      return api$1.get("/shows/".concat(traktShowId, "/seasons?extended=episodes"));
                    case 7:
                      seasons = _context4.v;
                      if (seasons) {
                        _context4.n = 8;
                        break;
                      }
                      _e2 = new Error('Seasons not found');
                      _e2.status = 404;
                      throw _e2;
                    case 8:
                      // Try map by timeline hash using all known title variants.
                      last = Lampa.Storage.get('trakt_last_card', media) || media;
                      titleCandidates = collectTitleCandidates(media, last);
                      _iterator5 = _createForOfIteratorHelper(seasons);
                      _context4.p = 9;
                      _iterator5.s();
                    case 10:
                      if ((_step5 = _iterator5.n()).done) {
                        _context4.n = 27;
                        break;
                      }
                      s = _step5.value;
                      if (s.episodes) {
                        _context4.n = 11;
                        break;
                      }
                      return _context4.a(3, 26);
                    case 11:
                      _iterator6 = _createForOfIteratorHelper(s.episodes);
                      _context4.p = 12;
                      _iterator6.s();
                    case 13:
                      if ((_step6 = _iterator6.n()).done) {
                        _context4.n = 22;
                        break;
                      }
                      ep = _step6.value;
                      _iterator7 = _createForOfIteratorHelper(titleCandidates);
                      _context4.p = 14;
                      _iterator7.s();
                    case 15:
                      if ((_step7 = _iterator7.n()).done) {
                        _context4.n = 17;
                        break;
                      }
                      title = _step7.value;
                      epHash = Lampa.Utils.hash([s.number, s.number > 10 ? ':' : '', ep.number, title].join(''));
                      if (!(media.hash && epHash === media.hash)) {
                        _context4.n = 16;
                        break;
                      }
                      season = s.number;
                      episode = ep.number;
                      found = true;
                      return _context4.a(3, 17);
                    case 16:
                      _context4.n = 15;
                      break;
                    case 17:
                      _context4.n = 19;
                      break;
                    case 18:
                      _context4.p = 18;
                      _t2 = _context4.v;
                      _iterator7.e(_t2);
                    case 19:
                      _context4.p = 19;
                      _iterator7.f();
                      return _context4.f(19);
                    case 20:
                      if (!found) {
                        _context4.n = 21;
                        break;
                      }
                      return _context4.a(3, 22);
                    case 21:
                      _context4.n = 13;
                      break;
                    case 22:
                      _context4.n = 24;
                      break;
                    case 23:
                      _context4.p = 23;
                      _t3 = _context4.v;
                      _iterator6.e(_t3);
                    case 24:
                      _context4.p = 24;
                      _iterator6.f();
                      return _context4.f(24);
                    case 25:
                      if (!found) {
                        _context4.n = 26;
                        break;
                      }
                      return _context4.a(3, 27);
                    case 26:
                      _context4.n = 10;
                      break;
                    case 27:
                      _context4.n = 29;
                      break;
                    case 28:
                      _context4.p = 28;
                      _t4 = _context4.v;
                      _iterator5.e(_t4);
                    case 29:
                      _context4.p = 29;
                      _iterator5.f();
                      return _context4.f(29);
                    case 30:
                      if (!(!season || !episode)) {
                        _context4.n = 31;
                        break;
                      }
                      slog('Episode index not resolved', {
                        tmdbId: _tmdbId,
                        traktShowId: traktShowId,
                        hash: media.hash,
                        mediaTitles: collectTitleCandidates(media),
                        lastCardTitles: collectTitleCandidates(Lampa.Storage.get('trakt_last_card', null)),
                        hasMediaIds: !!(media && media.ids)
                      });
                      _e3 = new Error('Episode index not resolved');
                      _e3.status = 422;
                      throw _e3;
                    case 31:
                      _context4.n = 32;
                      return api$1.addToHistory({
                        method: 'show',
                        id: _tmdbId,
                        ids: _objectSpread2(_objectSpread2({}, media.ids || {}), {}, {
                          trakt: traktShowId
                        }),
                        season_number: season,
                        episodes: [{
                          number: episode,
                          watched_at: new Date().toISOString()
                        }]
                      });
                    case 32:
                      _res = _context4.v;
                      return _context4.a(2, {
                        status: 200,
                        data: _res
                      });
                    case 33:
                      return _context4.a(2);
                  }
                }, _callee4, null, [[14, 18, 19, 20], [12, 23, 24, 25], [9, 28, 29, 30]]);
              }));
              return function doFinish() {
                return _ref9.apply(this, arguments);
              };
            }();
            _context5.n = 4;
            return finishWithIdempotency({
              key: key,
              token: token,
              doFinish: doFinish,
              logPrefix: 'finish'
            });
          case 4:
            result = _context5.v;
            slog('finish result', key, result);
            return _context5.a(2, result);
          case 5:
            _context5.p = 5;
            delete requestInProgress[key]; // Завжди знімаємо блокування
            return _context5.f(5);
          case 6:
            return _context5.a(2);
        }
      }, _callee5, null, [[3,, 5, 6]]);
    }));
    return _finish.apply(this, arguments);
  }
  function getContentType$1(card) {
    if (!card) return 'movie';
    if (card.method === 'tv' || card.method === 'show') return 'show';
    if (card.card_type === 'tv' || card.card_type === 'show') return 'show';
    if (card.media_type === 'tv' || card.media_type === 'show') return 'show';
    if (card.original_name || card.name) return 'show';
    if (card.episode_run_time || card.first_air_date || card.created_by || card.number_of_seasons || card.number_of_episodes) {
      return 'show';
    }
    return 'movie';
  }
  var isAddingShowToWatching = false;
  var isInitialized$1 = false;

  /**
   * Модуль для відстеження перегляду в Trakt.TV
   */
  var watching = {
    /**
     * Перевіряє, чи увімкнено логування
     * @returns {boolean} true, якщо логування увімкнено
     */
    isLoggingEnabled: function isLoggingEnabled() {
      return Lampa.Storage.field('trakt_enable_logging');
    },
    /**
     * Ініціалізує обробники подій відстеження перегляду
     */
    init: function init() {
      if (isInitialized$1) {
        slog('watching.init called while already initialized, skipping');
        return;
      }
      isInitialized$1 = true;

      // Restore cache from session
      loadSessionCache();
      loadHashMetaCache();

      // Start scrobble queue processing
      scrobbleQueue.init();
      slog('watching.init');

      // Слідкуємо за оновленнями Timeline
      if (window.Lampa && Lampa.Timeline && Lampa.Timeline.listener) {
        this._onTimelineUpdate = this.processTimelineUpdate.bind(this);
        Lampa.Timeline.listener.follow('update', this._onTimelineUpdate);
        slog('Timeline listener attached');
      }

      // Слідкуємо за стартом програвача для збереження поточної картки
      if (window.Lampa && Lampa.Player && Lampa.Player.listener) {
        this._onPlayerStart = this.onPlayerStart.bind(this);
        Lampa.Player.listener.follow('start', this._onPlayerStart);
        slog('Player listener attached');
      }
    },
    /**
     * Обробник події старту програвача
     * @param {Object} data - Дані події
     */
    onPlayerStart: function onPlayerStart(data) {
      if (this.isLoggingEnabled()) {
        slog('Player start event received', data);
      }
      var card = data.card || Lampa.Activity.active() && Lampa.Activity.active().movie;
      if (this.isLoggingEnabled()) {
        slog('Card determined in onPlayerStart', card);
      }
      if (!card) {
        if (this.isLoggingEnabled()) {
          slog('No card found in onPlayerStart');
        }
        return;
      }
      Lampa.Storage.set('trakt_last_card', card);
      if (this.isLoggingEnabled()) {
        slog('Card saved to storage', card);
      }
      var timeline = data && data.timeline;
      var hash = timeline && timeline.hash;
      if (hash) {
        var se = extractSeasonEpisode(data);
        // Fallback: brute-force season/episode from hash using original name
        if (!se.season || !se.episode) {
          var origName = card.original_name || card.original_title || card.title;
          if (origName) {
            se = resolveSeasonEpisode(hash, origName);
          }
        }
        setHashMeta(hash, {
          card: card,
          season: se.season,
          episode: se.episode,
          ids: card && card.ids
        });
        if (this.isLoggingEnabled()) {
          slog('Hash meta cached from player start', {
            hash: hash,
            season: se.season,
            episode: se.episode
          });
        }
      }

      // Scrobble: send start event to Trakt with saved progress if resuming
      if (card && Lampa.Storage.field('trakt_enable_watching')) {
        var token = Lampa.Storage.get('trakt_token');
        if (token) {
          // Build media with season/episode from hash meta
          var metaHash = hash ? getHashMeta(hash) : null;
          var mediaForStart = Object.assign({}, card);
          if (metaHash) {
            if (!card.season_number && metaHash.season) mediaForStart.season_number = metaHash.season;
            if (!card.episode_number && metaHash.episode) mediaForStart.episode_number = metaHash.episode;
          }
          scrobbler.setCurrentMedia(mediaForStart);
          var startProgress = timeline && timeline.percent || 0;
          scrobbler.scrobbleStart(mediaForStart, startProgress);
        }
      }
    },
    /**
     * Обробник оновлень Timeline
     * @param {Object} data - Дані події
     */
    processTimelineUpdate: function processTimelineUpdate(data) {
      if (this.isLoggingEnabled()) {
        slog('Timeline update received', data);
      }
      var enableWatching = Lampa.Storage.field('trakt_enable_watching');
      if (!enableWatching) {
        if (this.isLoggingEnabled()) {
          slog('Watching is disabled by settings');
        }
        return;
      }
      if (!data || !data.data || !data.data.hash || !data.data.road) {
        if (this.isLoggingEnabled()) {
          slog('Invalid data received', data);
        }
        return;
      }
      var hash = data.data.hash;
      var road = data.data.road || {};
      var percent = parseFloat(road.percent || 0);
      if (isNaN(percent)) percent = 0;
      var token = Lampa.Storage.get('trakt_token');
      var minProgress = parseInt(Lampa.Storage.field('trakt_min_progress') || config.minProgress);
      window.last_timeline_event = {
        data: {
          hash: hash,
          road: road
        },
        ts: Date.now()
      };
      if (this.isLoggingEnabled()) {
        slog('Processing timeline update', {
          hash: hash,
          percent: percent,
          token: !!token,
          minProgress: minProgress
        });
      }
      if (!token) {
        if (this.isLoggingEnabled()) {
          slog('No token found, skipping update');
        }
        return;
      }
      var card = this.getCurrentCard();
      var meta = getHashMeta(hash);
      if (!card && meta && meta.card) {
        card = meta.card;
        if (this.isLoggingEnabled()) {
          slog('Card restored from hash meta cache', card);
        }
      }
      if (card && hash) {
        var se = extractSeasonEpisode(card);
        var cachedMeta = meta || getHashMeta(hash);
        var seasonValue = se.season || cachedMeta && cachedMeta.season;
        var episodeValue = se.episode || cachedMeta && cachedMeta.episode;
        var idsValue = card.ids || cachedMeta && cachedMeta.ids;
        setHashMeta(hash, {
          card: card,
          season: seasonValue,
          episode: episodeValue,
          ids: idsValue
        });
        if (this.isLoggingEnabled() && (!se.season || !se.episode) && cachedMeta && (cachedMeta.season || cachedMeta.episode)) {
          slog('Hash meta preserved season/episode from cache', {
            hash: hash,
            season: seasonValue,
            episode: episodeValue
          });
        }
      }
      slog('Card from getCurrentCard:', card);
      if (!card) {
        if (this.isLoggingEnabled()) {
          slog('No card found, skipping update');
        }
        slog('No card found, skipping update');
        return;
      }

      // Scrobble: throttled progress update (skip if cloud timeline inject)
      if (card && percent > 0 && !cloudInjectInProgress) {
        scrobbler.onProgressUpdate(hash, percent, road, card);
      }

      // Перевіряємо, чи потрібно додати серіал в "Смотрю"
      slog('Calling checkAndAddToShow');
      this.checkAndAddToShow(card, hash, percent, token);

      // Інтеграція нового фініш-флоу: при досягненні порогу формуємо key і викликаємо finish()
      slog('Checking if should finish with idempotency, percent:', percent, 'minProgress:', minProgress);
      var watchedByPercent = (typeof percent === 'number' ? percent : 0) >= minProgress;
      var watchedByTime = road && road.time && road.duration ? road.time / road.duration * 100 >= minProgress : false;
      if (watchedByPercent || watchedByTime) {
        var media = Object.assign({}, card, {
          hash: hash
        });
        if (meta) {
          if (!media.season_number && meta.season) media.season_number = meta.season;
          if (!media.episode_number && meta.episode) media.episode_number = meta.episode;
          if (!media.ids && meta.ids) media.ids = meta.ids;
        }
        var key = getCompletionKey(media);
        slog('Timeline threshold reached, finish intent and attempt', {
          key: key,
          percent: percent
        });
        markFinishIntent(key);
        finish(media)["catch"](function (e) {
          return slog('finish error', e);
        });
        // Also send scrobble stop for active watching
        scrobbler.scrobbleStop(media, percent);
      } else {
        slog('Below minProgress, no finish');
      }
    },
    /**
     * Отримує поточну картку
     * @returns {Object|null} Поточна картка
     */
    getCurrentCard: function getCurrentCard() {
      var card = Lampa.Activity && Lampa.Activity.active && Lampa.Activity.active() && (Lampa.Activity.active().card_data || Lampa.Activity.active().card || Lampa.Activity.active().movie) || null;
      if (!card) card = Lampa.Storage.get('trakt_last_card', null);
      if (this.isLoggingEnabled()) {
        slog('Current card determined', card);
      }
      return card;
    },
    /**
     * Перевіряє, чи потрібно додати серіал в "Смотрю"
     * @param {Object} card - Картка серіалу
     * @param {string} hash - Хеш епізоду
     * @param {number} percent - Відсоток перегляду
     * @param {string} token - Токен авторизації
     */
    checkAndAddToShow: function checkAndAddToShow(card, hash, percent, token) {
      var originalName = card.original_name || card.name || card.original_title || card.title;
      var firstEpisodeHash = Lampa.Utils.hash('11' + originalName);
      if (this.isLoggingEnabled()) {
        slog('Checking if show should be added to watching', {
          card: card,
          hash: hash,
          percent: percent,
          firstEpisodeHash: firstEpisodeHash,
          shouldAdd: hash === firstEpisodeHash
        });
      }
      var shouldAdd = hash === firstEpisodeHash;
      if (shouldAdd) {
        slog('Adding show to watching');
        this.addShowToWatching(card, token);
      }
    },
    /**
     * Додає серіал в "Смотрю"
     * @param {Object} card - Картка серіалу
     * @param {string} token - Токен авторизації
     */
    addShowToWatching: function addShowToWatching(card, token) {
      var _this = this;
      if (isAddingShowToWatching) {
        slog('addShowToWatching called while already adding, skipping');
        return;
      }
      isAddingShowToWatching = true;
      if (this.isLoggingEnabled()) {
        slog('Adding show to watching', card);
      }
      var tmdbId = card.id || card.ids && card.ids.tmdb;
      if (!tmdbId) {
        slog('No tmdbId found, returning');
        isAddingShowToWatching = false;
        return;
      }
      var contentType = getContentType$1(card);
      api$1.get("/search/tmdb/".concat(tmdbId, "?type=").concat(contentType)).then(function (response) {
        if (response && response.length > 0) {
          var item = response[0];
          var traktId = item.show && item.show.ids.trakt || item.movie && item.movie.ids.trakt;
          var body = {};
          if (contentType === 'show') {
            body.shows = [{
              ids: _objectSpread2({
                trakt: traktId
              }, card.ids),
              watched_at: new Date().toISOString()
            }];
          } else {
            body.movies = [{
              ids: _objectSpread2({
                trakt: traktId
              }, card.ids),
              watched_at: new Date().toISOString()
            }];
          }
          if (_this.isLoggingEnabled()) {
            slog('Sending request to add content to watching', body);
          }
          return api$1.get('/sync/watchlist', body);
        } else {
          slog('No show found or no traktId in response');
        }
      })["catch"](function (error) {
        logWarn('Failed to add show to watching', error, {
          debugOnly: true
        });
      })["finally"](function () {
        isAddingShowToWatching = false;
      });
    },
    /**
     * Позначення наміру завершити (події onEnded/onStop/onHidden тощо)
     * Використовується замість прямих фінальних запитів.
     */
    markFinishIntent: markFinishIntent,
    /**
     * Отримати кешовані метадані за hash
     */
    getMetaByHash: getHashMeta,
    /**
     * Запам'ятати метадані за hash
     */
    rememberHashMeta: setHashMeta,
    /**
     * Публічний доступ до єдиного генератора completion key
     */
    getCompletionKey: getCompletionKey,
    /**
     * Публічний доступ до визначення типу контенту
     */
    getContentType: getContentType$1,
    /**
     * Єдиний шлях відправити фінальний запит з ідемпотентністю
     */
    finish: finish,
    /**
     * Знаходить інформацію про епізод за хешем
     * @param {Object} card - Картка серіалу
     * @param {string} hash - Хеш епізоду
     * @param {Array} seasons - Сезони серіалу
     * @returns {Object|null} Інформація про епізод
     */
    findEpisodeByHash: function findEpisodeByHash(card, hash, seasons) {
      var originalName = card.original_name || card.name || card.original_title || card.title;
      for (var i = 0; i < seasons.length; i++) {
        var season = seasons[i];
        if (!season.episodes) continue;
        for (var j = 0; j < season.episodes.length; j++) {
          var episode = season.episodes[j];
          var episodeHashStr = [season.number, season.number > 10 ? ':' : '', episode.number, originalName].join('');
          var episodeHash = Lampa.Utils.hash(episodeHashStr);
          if (episodeHash === hash && episode.ids && episode.ids.trakt) {
            var result = {
              traktId: episode.ids.trakt,
              season: season.number,
              episode: episode.number
            };
            slog('Found matching episode:', result);
            return result;
          }
        }
      }
      slog('No matching episode found');
      return null;
    },
    /**
     * Set flag to suppress scrobble during cloud timeline injection
     * @param {boolean} val
     */
    setCloudInjectInProgress: function setCloudInjectInProgress(val) {
      cloudInjectInProgress = !!val;
    },
    /**
     * Очищує ресурси модуля: зупиняє таймери, очищає кеш та знімає слухачі подій
     */
    destroy: function destroy() {
      isInitialized$1 = false;
      isAddingShowToWatching = false;

      // Clear all pending intent timers
      var _iterator3 = _createForOfIteratorHelper(intentTimers),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _slicedToArray(_step3.value, 2),
            timerId = _step3$value[1];
          clearTimeout(timerId);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      intentTimers.clear();

      // Clear caches
      completionCache.clear();
      hashMetaCache.clear();

      // Clear lock queues — resolve all pending locks to prevent hanging
      var _iterator4 = _createForOfIteratorHelper(lockQueues),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = _slicedToArray(_step4.value, 2),
            queue = _step4$value[1];
          queue.forEach(function (resolve) {
            return resolve();
          });
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      lockQueues.clear();

      // Clear request tracking
      Object.keys(requestInProgress).forEach(function (key) {
        return delete requestInProgress[key];
      });

      // Remove Timeline listener
      if (this._onTimelineUpdate && window.Lampa && Lampa.Timeline && Lampa.Timeline.listener && Lampa.Timeline.listener.remove) {
        Lampa.Timeline.listener.remove('update', this._onTimelineUpdate);
        delete this._onTimelineUpdate;
      }

      // Remove Player listener
      if (this._onPlayerStart && window.Lampa && Lampa.Player && Lampa.Player.listener && Lampa.Player.listener.remove) {
        Lampa.Player.listener.remove('start', this._onPlayerStart);
        delete this._onPlayerStart;
      }
      scrobbler.destroy();
      scrobbleQueue.destroy();
      slog('watching.destroy');
    }
  };

  var isInitialized = false;
  var API_MISSING_LOG_KEY = 'events:api-missing';
  function resolveUpnextProgress() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var watched = Number(data.trakt_upnext_watched);
    var total = Number(data.trakt_upnext_total);
    var text = (data.trakt_upnext_progress || '').toString().trim();
    var safeWatched = Number.isFinite(watched) ? watched : 0;
    var safeTotal = Number.isFinite(total) ? total : 0;
    if (!text && safeTotal > 0) {
      text = "".concat(safeWatched, "/").concat(safeTotal);
    }
    if ((!safeWatched || !safeTotal) && text.indexOf('/') > -1) {
      var parts = text.split('/');
      var parsedWatched = Number(parts[0]);
      var parsedTotal = Number(parts[1]);
      if (Number.isFinite(parsedWatched) && parsedWatched >= 0) safeWatched = parsedWatched;
      if (Number.isFinite(parsedTotal) && parsedTotal > 0) safeTotal = parsedTotal;
    }
    if (!text) return null;
    var percent = safeTotal > 0 ? Math.max(0, Math.min(100, Math.round(safeWatched / safeTotal * 100))) : null;
    return {
      text: text,
      percent: percent
    };
  }
  function renderUpnextProgressBadge(cardInstance) {
    if (!cardInstance || !cardInstance.data || !cardInstance.render) return;
    var progress = resolveUpnextProgress(cardInstance.data);
    if (!progress) return;
    var cardNode = cardInstance.render(true);
    var cardView = cardNode && cardNode.querySelector ? cardNode.querySelector('.card__view') : null;
    if (!cardView) return;
    var wrap = cardView.querySelector('.card-watched.trakt-upnext-watched');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'card-watched trakt-upnext-watched';
      wrap.innerHTML = '<div class="card-watched__inner"><div class="card-watched__body"></div></div>';
      cardView.insertBefore(wrap, cardView.firstChild);
    }
    var body = wrap.querySelector('.card-watched__body');
    if (!body) return;
    var row = body.querySelector('.card-watched__item.trakt-upnext-watched__item');
    if (!row) {
      row = document.createElement('div');
      row.className = 'card-watched__item trakt-upnext-watched__item';
      row.innerHTML = '<span></span><div class="time-line"><div></div></div>';
      body.innerHTML = '';
      body.appendChild(row);
    }
    var title = row.querySelector('span');
    if (title) title.textContent = progress.text;
    var bar = row.querySelector('.time-line > div');
    if (bar) bar.style.width = "".concat(progress.percent || 0, "%");
  }
  function decorateUpnextLine(event) {
    if (!event || !event.data || event.data.trakt_row !== 'upnext') return;
    if (!Array.isArray(event.items)) return;
    event.items.forEach(renderUpnextProgressBadge);
  }

  /**
   * Модуль для обробки подій плагіна
   */
  var events = {
    /**
     * Ініціалізує обробники подій
     */
    init: function init() {
      var _this = this;
      if (isInitialized) {
        logDebugOnce('events:init-repeat', 'events.init skipped: already initialized');
        return;
      }
      isInitialized = true;
      this._cleanups = [];

      // Следим за готовностью приложения
      if (window.appready) this.onAppReady();else {
        var _appHandler = function _appHandler(e) {
          if (e.type === 'ready') _this.onAppReady();
        };
        Lampa.Listener.follow('app', _appHandler);
        this._cleanups.push(function () {
          return Lampa.Listener.remove('app', _appHandler);
        });
      }

      // Додаємо кнопку watchlist на картку
      var _fullHandler = function _fullHandler(e) {
        if (e.type === 'complite' && Lampa.Storage.get('trakt_token')) {
          _this.onFullCardReady(e);
        }
      };
      Lampa.Listener.follow('full', _fullHandler);
      this._cleanups.push(function () {
        return Lampa.Listener.remove('full', _fullHandler);
      });
      var _lineHandler = function _lineHandler(e) {
        if (!e || !e.type) return;
        if (e.type === 'append' || e.type === 'visible' || e.type === 'toggle') {
          decorateUpnextLine(e);
        }
      };
      Lampa.Listener.follow('line', _lineHandler);
      this._cleanups.push(function () {
        return Lampa.Listener.remove('line', _lineHandler);
      });

      // Переадресація завершальних подій програвача на idempotent intent
      if (window.Lampa && Lampa.Player && Lampa.Player.listener) {
        // onDestroy / onHidden -> markFinishIntent + scrobbleStop for the current media key
        var routeFinishIntent = function routeFinishIntent(evt) {
          try {
            if (!Lampa.Storage.field('trakt_enable_watching')) return;
            var token = Lampa.Storage.get('trakt_token');
            if (!token) return;
            var card = Lampa.Activity.active && Lampa.Activity.active() && (Lampa.Activity.active().card_data || Lampa.Activity.active().card || Lampa.Activity.active().movie) || Lampa.Storage.get('trakt_last_card');
            if (!card) return;
            // Include last known hash if available from timeline storage
            var lastTimeline = window.last_timeline_event && window.last_timeline_event.data || {};
            var media = Object.assign({}, card, {
              hash: lastTimeline.hash
            });
            var meta = watching && typeof watching.getMetaByHash === 'function' ? watching.getMetaByHash(lastTimeline.hash) : null;
            if (meta) {
              if (!media.season_number && meta.season) media.season_number = meta.season;
              if (!media.episode_number && meta.episode) media.episode_number = meta.episode;
              if (!media.ids && meta.ids) media.ids = meta.ids;
            }
            var key = watching && typeof watching.getCompletionKey === 'function' ? watching.getCompletionKey(media) : null;
            if (key && watching && typeof watching.markFinishIntent === 'function') {
              watching.markFinishIntent(key);
            }

            // Only scrobble pause on close if below threshold (stop already sent by timeline handler)
            if (typeof scrobbler !== 'undefined' && scrobbler) {
              var currentProgress = lastTimeline.road && lastTimeline.road.percent || 0;
              var minProgress = parseInt(Lampa.Storage.field('trakt_min_progress') || 90, 10);
              if (currentProgress < minProgress && typeof scrobbler.scrobblePause === 'function') {
                scrobbler.scrobblePause(media, currentProgress);
              }
            }

            // Primary finish route is timeline update.
            // Fallback to direct finish only when "ended" happened without known timeline hash.
            var shouldFallbackFinish = !!(evt && evt.type === 'ended' && !lastTimeline.hash);
            if (shouldFallbackFinish && watching && typeof watching.finish === 'function') {
              var contentType = watching && typeof watching.getContentType === 'function' ? watching.getContentType(media) : 'movie';
              var season = media.season_number || media.season || media.seasonNumber;
              var episode = media.episode_number || media.episode || media.episodeNumber;
              var canFinishSafely = contentType === 'movie' || season && episode || media.hash;
              if (canFinishSafely) {
                watching.finish(media)["catch"](function (e) {
                  logWarn('Fallback finish failed', {
                    eventType: evt && evt.type,
                    error: e
                  }, {
                    debugOnly: true
                  });
                });
              }
            }
          } catch (e) {
            logWarn('Event finish route failed', e, {
              debugOnly: true
            });
          }
        };
        var _visibilityHandler = function _visibilityHandler(e) {
          if (e && e.hidden) routeFinishIntent({
            type: 'hidden'
          });
        };
        Lampa.Player.listener.follow('destroy', routeFinishIntent);
        Lampa.Player.listener.follow('visibility', _visibilityHandler);
        this._cleanups.push(function () {
          return Lampa.Player.listener.remove('destroy', routeFinishIntent);
        });
        this._cleanups.push(function () {
          return Lampa.Player.listener.remove('visibility', _visibilityHandler);
        });
      }

      // External player support: send scrobble start when external player launches
      var _externalHandler = function _externalHandler(e) {
        try {
          if (!Lampa.Storage.field('trakt_enable_watching')) return;
          if (!Lampa.Storage.get('trakt_token')) return;
          var card = e && e.data && (e.data.card || Lampa.Storage.get('trakt_last_card'));
          if (!card) return;
          var timeline = e && e.data && e.data.timeline;
          var startProgress = timeline && timeline.percent || 0;
          scrobbler.setCurrentMedia(card);
          scrobbler.scrobbleStart(card, startProgress);
        } catch (e) {
          logWarn('External player handler failed', e, {
            debugOnly: true
          });
        }
      };
      if (window.Lampa && Lampa.Player && Lampa.Player.listener) {
        Lampa.Player.listener.follow('external', _externalHandler);
        this._cleanups.push(function () {
          Lampa.Player.listener.remove('external', _externalHandler);
        });
      }

      // Pause detection: video pause event for real-time scrobble pause
      // Skips false pauses from HLS seek (when progress update was sent < 3s ago)
      var _pauseHandler = function _pauseHandler() {
        try {
          if (!Lampa.Storage.field('trakt_enable_watching')) return;
          if (!Lampa.Storage.get('trakt_token')) return;
          // Skip if a scrobbleStart/progress was sent within last 3 seconds (HLS seek)
          var lastProgress = typeof scrobbler !== 'undefined' && scrobbler && typeof scrobbler.getCurrentProgress === 'function' ? scrobbler.getCurrentProgress() : null;
          if (lastProgress && lastProgress.time && Date.now() - lastProgress.time < 3000) return;
          var lastTimeline = window.last_timeline_event && window.last_timeline_event.data;
          if (!lastTimeline || !lastTimeline.hash || !lastTimeline.road) return;
          var card = Lampa.Storage.get('trakt_last_card');
          if (!card) return;
          var media = Object.assign({}, card, {
            hash: lastTimeline.hash
          });
          var meta = watching && typeof watching.getMetaByHash === 'function' ? watching.getMetaByHash(lastTimeline.hash) : null;
          if (meta) {
            if (!media.season_number && meta.season) media.season_number = meta.season;
            if (!media.episode_number && meta.episode) media.episode_number = meta.episode;
          }
          var percent = lastTimeline.road.percent || 0;
          if (typeof scrobbler !== 'undefined' && scrobbler && typeof scrobbler.scrobblePause === 'function') {
            scrobbler.scrobblePause(media, percent);
          }
        } catch (e) {
          logWarn('Pause handler failed', e, {
            debugOnly: true
          });
        }
      };
      document.addEventListener('pause', _pauseHandler, true);
      this._cleanups.push(function () {
        document.removeEventListener('pause', _pauseHandler, true);
      });
    },
    /**
     * Видаляє всі обробники подій та скидає стан ініціалізації
     * Дозволяє clean re-init without listener duplication
     */
    destroy: function destroy() {
      if (this._cleanups && this._cleanups.length) {
        for (var i = 0; i < this._cleanups.length; i++) {
          try {
            this._cleanups[i]();
          } catch (e) {}
        }
        this._cleanups = [];
      }
      isInitialized = false;
    },
    /**
     * Обробник події готовності додатку
     */
    onAppReady: function onAppReady() {
      // Імпортуємо config динамічно, щоб уникнути циклічних залежностей
      config.main();

      // Імпортуємо addMenuItems динамічно
      addMenuItems();

      // Initialize scrobbler for queue processing
      scrobbler.init();
    },
    /**
     * Додає блок з пов'язаними списками в картку медіа
     * @param {Object} e - Об'єкт події
     */
    addRelatedListsBlock: function addRelatedListsBlock(e) {
      var _e$object;
      if (!e) return;

      // Перевірка чи вже додано (дедуплікація)
      if (e.object && e.object.activity && typeof e.object.activity.render === 'function') {
        if (e.object.activity.render().find('.tag-count.trakttv-lists').length > 0) {
          return;
        }
      }

      // Перевіряємо наявність даних картки
      var card = e.data;
      if (!card) return;

      // Визначаємо тип контенту - e.object.method є primary джерело
      var method = (_e$object = e.object) === null || _e$object === void 0 ? void 0 : _e$object.method; // 'tv' or 'movie'

      // Fallback через евристики з e.data.movie
      if (!method && e.data && e.data.movie) {
        method = e.data.movie.name || e.data.movie.first_air_date ? 'tv' : 'movie';
      }

      // Fallback через card евристики
      if (!method && card) {
        method = card.method || card.card_type || (card.first_air_date || card.name ? 'tv' : 'movie');
      }

      // Перевіряємо наявність ID
      if (!card.id && (!card.external_ids || !card.external_ids.trakt_id)) return;

      // Параметри для запиту
      // Trakt API використовує 'show' замість 'tv'
      var params = {
        id: card.id,
        method: method === 'tv' ? 'show' : 'movie'
      };

      // Додаємо trakt_id, якщо він доступний
      if (card.external_ids && card.external_ids.trakt_id) {
        params.ids = {
          trakt: card.external_ids.trakt_id
        };
      }

      // Отримуємо пов'язані списки та списки, які користувач лайкнув
      // Local safe resolver for Api to support runtime-scoped execution (e.g., dev/trakt.js)
      var Api = typeof api !== 'undefined' && api || window.TraktTV && window.TraktTV.api || null;
      if (!Api) {
        logDebugOnce(API_MISSING_LOG_KEY, 'API bridge is unavailable in events');
        return;
      }
      Promise.all([Api && Api.getMediaLists(params), Api && Api.likesLists({
        page: 1,
        limit: 1000
      }) // Отримуємо всі лайкнуті списки
      ]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          mediaListsResponse = _ref2[0],
          likedListsResponse = _ref2[1];
        var formattedMediaLists = mediaListsResponse; // getMediaLists вже повертає відформатовані дані
        var likedListIds = likedListsResponse.results.map(function (list) {
          return list.id;
        });

        // Перевіряємо наявність списків
        if (!formattedMediaLists || !Array.isArray(formattedMediaLists) || formattedMediaLists.length === 0) {
          return;
        }

        // Перевіряємо наявність activity та render
        if (!e.object || !e.object.activity || typeof e.object.activity.render !== 'function') {
          return;
        }

        // Знаходимо блок з тегами
        var tagsBlock = e.object.activity.render().find('.full-descr__tags');
        if (tagsBlock.length === 0) {
          return;
        }

        // Створюємо елемент для відображення кількості списків
        var listsCountElement = $("\n                <div class=\"tag-count selector trakttv-lists\">\n                    <div class=\"tag-count__name\">".concat(Lampa.Lang.translate('trakttv_related_lists'), "</div>\n                </div>\n            "));

        // Додаємо обробник кліку для відображення списків
        listsCountElement.on('hover:enter', function () {
          var selectItems = formattedMediaLists.map(function (list) {
            return {
              title: list.title,
              item_count: list.item_count,
              id: list.id,
              component: 'trakt_list_detail',
              // Вказуємо компонент
              list_id: list.id,
              // Передаємо list_id
              page: 1,
              // Початкова сторінка
              liked: likedListIds.includes(list.id) // Додаємо статус лайку
            };
          });
          if (selectItems.length === 0) {
            Lampa.Noty.show(Lampa.Lang.translate('trakt_no_lists'));
            return;
          }
          Lampa.Select.show({
            title: Lampa.Lang.translate('trakttv_related_lists'),
            items: selectItems,
            onSelect: function onSelect(a) {
              var listTitle = typeof a.item_count === 'number' ? "".concat(a.title, " (").concat(a.item_count, ")") : a.title;
              Lampa.Activity.push({
                url: '',
                title: listTitle,
                component: a.component,
                list_id: a.list_id,
                page: a.page
              });
            },
            onRender: function onRender(item, element) {
              if (element.liked) {
                item.find('.selectbox__title').append('<span class="selectbox__lables"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 22 22" xml:space="preserve"><path fill="currentColor" d="M11,20c-0.3,0-0.5-0.1-0.7-0.3l-8.5-8.5c-0.9-0.9-1.4-2-1.4-3.3c0-2.6,2.1-4.7,4.7-4.7c1.4,0,2.7,0.6,3.6,1.5l2.3,2.3l2.3-2.3c0.9-0.9,2.2-1.5,3.6-1.5c2.6,0,4.7,2.1,4.7,4.7c0,1.3-0.5,2.4-1.4,3.3l-8.5,8.5C11.5,19.9,11.3,20,11,20z"></path></svg></span>');
              }
            },
            onBack: function onBack() {
              Lampa.Controller.toggle('content');
            }
          });
        });

        // Додаємо елемент в кінець блоку з тегами
        tagsBlock.append(listsCountElement);
      })["catch"](function (error) {
        logWarn('Related lists loading failed', error, {
          debugOnly: true
        });
      });
    },
    /**
     * Обробник події готовності картки фільму/серіалу
     * @param {Object} e - Об'єкт події
     */
    onFullCardReady: function onFullCardReady(e) {
      // Перевіряємо наявність необхідних даних
      if (!e || !e.data) {
        return;
      }

      // Перевіряємо наявність activity
      if (!e.object || !e.object.activity || typeof e.object.activity.render !== 'function') {
        return;
      }
      var buttonsContainer = e.object.activity.render().find('.full-start-new__buttons');
      if (buttonsContainer.find('.trakt-list-manager-button').length === 0) {
        var button = watchlist.addWatchlistButton(e.data);
        buttonsContainer.append(button);
      }

      // Видалено кнопку TraktHistory.addHistoryButton згідно з завданням
      // const historyButton = TraktHistory.addHistoryButton(e.data);
      // e.object.activity.render().find('.full-start-new__buttons').append(historyButton);

      // Додаємо блок з пов'язаними списками
      // Перевіряємо наявність необхідних даних для списків
      // Виправлено: додано більше логування для налагодження

      if (!e.data.id) {
        // Спробуємо отримати ID з інших джерел

        // Перевіряємо наявність ID в різних можливих полях
        if (e.data.card && e.data.card.id) {
          e.data.id = e.data.card.id;
        } else if (e.data.data && e.data.data.id) {
          e.data.id = e.data.data.id;
        } else if (e.data.movie && e.data.movie.id) {
          e.data.id = e.data.movie.id;
        } else if (e.data.show && e.data.show.id) {
          e.data.id = e.data.show.id;
        } else if (e.data.external_ids && e.data.external_ids.tmdb_id) {
          e.data.id = e.data.external_ids.tmdb_id;
        } else {
          return;
        }
      }

      // Перевіряємо наявність external_ids
      if (!e.data.external_ids) {
        e.data.external_ids = {};
      }

      // Створюємо глибоку копію об'єкта події для передачі в addRelatedListsBlock
      var eventForLists = {
        data: JSON.parse(JSON.stringify(e.data)),
        object: {
          method: e.object.method,
          activity: e.object.activity
        }
      };

      // Додаткова перевірка копії даних
      if (!eventForLists.data.id) {
        eventForLists.data.id = e.data.id; // Явно копіюємо ID
      }
      this.addRelatedListsBlock(eventForLists);

      // Додаємо прогрес перегляду для серіалів
      if (e.object.method === 'tv') {
        // Перевіряємо налаштування trakttv_show_tv_progress
        var showProgress = Lampa.Storage.field('trakttv_show_tv_progress');
        // Показуємо прогрес, якщо налаштування не існуё true
        if (showProgress === undefined || showProgress === true) {
          TraktHistory.showWatchProgress(e.data, e);
        }
      }

      // Fetch Trakt playback progress for resume
      this.fetchAndRestorePlayback(e.data, e.object.method);
    },
    /**
     * Fetch Trakt playback progress and inject into Lampa Timeline when cloud is newer
     */
    fetchAndRestorePlayback: function fetchAndRestorePlayback(card, method) {
      if (!card || !card.id) return;
      if (!Lampa.Storage.field('trakt_enable_watching')) return;
      if (!Lampa.Storage.get('trakt_token')) return;
      var tmdbId = card.id;

      // Local safe resolver for Api to support runtime-scoped execution
      var Api = typeof api !== 'undefined' && api || window.TraktTV && window.TraktTV.api || null;
      if (!Api) return;
      Api.getPlaybackProgress().then(function (playbackItems) {
        if (!playbackItems || !Array.isArray(playbackItems) || !playbackItems.length) return;

        // Find matching item
        var matchingItem = null;
        for (var i = 0; i < playbackItems.length; i++) {
          var item = playbackItems[i];
          var media = item.movie || item.show;
          if (!media || !media.ids) continue;
          if (String(media.ids.tmdb) === String(tmdbId)) {
            matchingItem = item;
            break;
          }
        }
        if (!matchingItem) return;
        var progress = matchingItem.progress;
        if (!progress || progress <= 0) return;

        // Determine Lampa hash
        var hash = null;
        var seasonNum = null;
        var episodeNum = null;
        if (method === 'movie') {
          var showCard = card.card || card.movie || card;
          var title = showCard.original_title || showCard.title || showCard.original_name || showCard.name;
          if (title) hash = Lampa.Utils.hash(title);
        } else {
          seasonNum = matchingItem.episode ? matchingItem.episode.season : null;
          episodeNum = matchingItem.episode ? matchingItem.episode.number : null;
          var showCard = card.card || card.movie || card;
          var showName = showCard.original_name || showCard.original_title || showCard.title || showCard.name;
          if (showName && seasonNum && episodeNum) {
            hash = Lampa.Utils.hash([seasonNum, seasonNum > 10 ? ':' : '', episodeNum, showName].join(''));
          }
        }
        if (!hash) return;

        // Check local timeline
        var localProgress = Lampa.Timeline.view(hash);
        var localPercent = localProgress && localProgress.percent ? localProgress.percent : 0;

        // Write to Timeline only if cloud progress > local progress
        if (progress > localPercent) {
          var progressTimeSec = progress / 100 * (matchingItem.duration || 0);
          if (typeof watching !== 'undefined' && watching && typeof watching.setCloudInjectInProgress === 'function') {
            watching.setCloudInjectInProgress(true);
          }
          Lampa.Timeline.update({
            hash: hash,
            percent: progress,
            time: progressTimeSec || 0,
            duration: matchingItem.duration || 0,
            received: true
          });
          if (typeof watching !== 'undefined' && watching && typeof watching.setCloudInjectInProgress === 'function') {
            watching.setCloudInjectInProgress(false);
          }
        }
      })["catch"](function () {
        // Silent fail — playback fetch is non-critical
      });
    }
  };

  /**
   * Helper functions for ContentRows integration (Lampa 3.0+)
   */

  /**
   * Check if user has permission to see UpNext content
   * @returns {boolean}
   */
  function checkUpNextPermissions() {
    if (!Lampa.Storage.get('trakt_token')) return false;
    return true;
  }

  /**
   * Check if user has permission to see Recommendations content
   * @returns {boolean}
   */
  function checkRecommendationsPermissions() {
    if (!Lampa.Storage.get('trakt_token')) return false;
    return true;
  }

  /**
   * Check if user has permission to see Calendar content
   * @returns {boolean}
   */
  function checkCalendarPermissions() {
    if (!Lampa.Storage.get('trakt_token')) return false;
    return true;
  }

  /**
   * Unified content type detection
   * @param {Object} data - Item data
   * @returns {string} - Content type: 'movie', 'tv', 'show', 'episode'
   */
  function getContentType(data) {
    if (data.method) return data.method;
    if (data.type) return data.type;
    if (data.card_type) return data.card_type;
    return data.name ? 'tv' : 'movie';
  }

  /**
   * Normalize content data for display (Lampa 3.0+)
   * Always adds params.emit for modular card system
   * @param {Array} items - Array of content items
   * @returns {Array} - Normalized items with params.emit
   */
  function normalizeContentData(items) {
    return items.map(function (item) {
      var normalized = _objectSpread2({}, item);
      var contentType = getContentType(item);
      if (contentType === 'tv' || contentType === 'show') {
        normalized.name = item.title || item.original_title;
        normalized.original_name = item.original_name || item.original_title || item.title;
        normalized.first_air_date = item.release_date;
        normalized.type = 'tv';
        normalized.card_type = 'tv';
      }
      if (contentType === 'movie') {
        delete normalized.name;
        delete normalized.original_name;
        normalized.release_date = item.release_date;
        normalized.title = item.title || item.original_title;
        normalized.type = 'movie';
        normalized.card_type = 'movie';
      }
      if (contentType === 'episode') {
        normalized.name = item.title || item.original_title;
        normalized.first_air_date = item.release_date;
        normalized.type = 'episode';
        normalized.card_type = 'episode';
      }

      // Add params.emit for Lampa 3.0+ modular system.
      // Use onlyEnter to avoid default navigation firing as well.
      // CRITICAL: Use normalized closure variables instead of this.data
      // to prevent runtime modification by Lampa.
      normalized.params = {
        emit: {
          onlyEnter: function onlyEnter() {
            var _this$data;
            // Use normalized.method (fixed at creation time) instead of getContentType(this.data)
            var fixedMethod = normalized.method || normalized.card_type || normalized.type;
            Lampa.Activity.push({
              url: ((_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.url) || normalized.url,
              component: 'full',
              id: normalized.id,
              // Use normalized.id (fixed)
              method: fixedMethod,
              // Use fixed method from normalized
              card: normalized,
              // Pass normalized instead of this.data
              source: normalized.source || 'tmdb',
              season: normalized.season,
              episode: normalized.episode
            });
          }
        }
      };
      return normalized;
    });
  }

  /**
   * Filter items by content type
   * @param {Array} items - Array of items to filter
   * @param {string} filterType - Type to filter: 'movie', 'tv', 'show'
   * @returns {Array} - Filtered items
   */
  function filterByContentType(items, filterType) {
    return items.filter(function (item) {
      var type = getContentType(item);
      if (filterType === 'tv') {
        return type === 'tv' || type === 'show';
      }
      return type === filterType;
    });
  }

  var STORAGE_KEY = 'appletv_topshelf';
  var CUSTOM_KEY = 'appletv_topshelf_custom';
  var SETTINGS_KEY = 'trakttv_topshelf';
  var ROW_UPNEXT = 'content_rows_TraktUpNextRow';
  var ROW_RECOMMENDATIONS = 'content_rows_TraktRecommendationsRow';
  var MAX_ITEMS = 10;
  var sectionsState = {
    upnext: null,
    recommendations: null
  };
  var listenersBound = false;
  function isEnabled() {
    if (!Lampa || !Lampa.Platform || !Lampa.Storage) return false;
    return Lampa.Platform.is('apple_tv') === true && Lampa.Storage.field(SETTINGS_KEY);
  }
  function syncCustomFlag(enabled) {
    if (typeof localStorage === 'undefined') return;
    try {
      if (enabled) localStorage.setItem(CUSTOM_KEY, 'true');else localStorage.removeItem(CUSTOM_KEY);
    } catch (error) {
      logWarn('TopShelf custom flag update failed', error, {
        debugOnly: true
      });
    }
  }
  function isRowEnabled(key) {
    var value = Lampa.Storage.get(key, 'true');
    return value === true || value === 'true';
  }
  function normalizeUrl(url) {
    if (!url) return '';
    if (String(url).startsWith('http')) return url;
    return 'https://' + String(url).replace(/^\/+/, '');
  }
  function getItemTitle(item) {
    return item.title || item.name || item.original_title || item.original_name || '';
  }
  function getItemMedia(item) {
    var type = item.method || item.card_type || item.type;
    return type === 'movie' ? 'movie' : 'tv';
  }
  function getItemImage(item, shape) {
    if (shape === 'poster') return normalizeUrl(item.poster || item.image);
    return normalizeUrl(item.image || item.poster);
  }
  function mapItems(items, shape) {
    return items.slice(0, MAX_ITEMS).map(function (item) {
      var id = item.id;
      var title = getItemTitle(item);
      var media = getItemMedia(item);
      var imageURL = getItemImage(item, shape);
      var source = item.source || 'tmdb';
      if (!id || !title || !imageURL) return null;
      return {
        id: String(id),
        title: title,
        imageURL: imageURL,
        deepLink: "lampa://topshelf?card=".concat(encodeURIComponent(id), "&media=").concat(encodeURIComponent(media), "&source=").concat(encodeURIComponent(source))
      };
    }).filter(Boolean);
  }
  function buildSections() {
    var sections = [];
    if (isRowEnabled(ROW_UPNEXT) && Array.isArray(sectionsState.upnext) && sectionsState.upnext.length) {
      sections.push({
        title: Lampa.Lang.translate('trakttv_upnext'),
        imageShape: 'poster',
        items: mapItems(sectionsState.upnext, 'poster')
      });
    }
    if (isRowEnabled(ROW_RECOMMENDATIONS) && Array.isArray(sectionsState.recommendations) && sectionsState.recommendations.length) {
      sections.push({
        title: Lampa.Lang.translate('trakttv_recommendations'),
        imageShape: 'poster',
        items: mapItems(sectionsState.recommendations, 'poster')
      });
    }
    return sections.filter(function (section) {
      return section.items && section.items.length;
    });
  }
  function writePayload() {
    if (typeof localStorage === 'undefined') return;
    var sections = buildSections();
    if (!sections.length) return;
    var payload = {
      updatedAt: Math.floor(Date.now() / 1000),
      sections: sections
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      if (typeof window !== 'undefined' && window.location && window.location.assign) {
        window.location.assign('lampa://topshelfupdate');
      }
    } catch (error) {
      logWarn('TopShelf payload update failed', error, {
        debugOnly: true
      });
    }
  }
  function bindTopshelfListeners() {
    if (listenersBound || typeof window === 'undefined') return;
    listenersBound = true;
    window.addEventListener('appletv:app-background', function () {
      if (!isEnabled()) return;
      writePayload();
    });
    window.addEventListener('appletv:app-request-topshelf-update', function () {
      if (!isEnabled()) return;
      writePayload();
    });
    if (Lampa.Storage && Lampa.Storage.listener) {
      Lampa.Storage.listener.follow('change', function (e) {
        if (e && e.name === SETTINGS_KEY) {
          syncCustomFlag(isEnabled());
        }
      });
    }
  }
  function updateTopshelf(section, items) {
    if (!isEnabled()) {
      syncCustomFlag(false);
      return;
    }
    if (!sectionsState.hasOwnProperty(section)) return;
    sectionsState[section] = Array.isArray(items) ? items : [];
    syncCustomFlag(true);
    bindTopshelfListeners();
    writePayload();
  }

  // Local safe resolver for Api
  var Api = typeof api$1 !== 'undefined' && api$1 || window.TraktTV && window.TraktTV.api || null;
  var initialized = false;
  var UI_DEADLINE_MAIN_MS = 2800;
  var UI_DEADLINE_CATEGORY_MS = 3200;
  var STALE_CACHE_TTL_MS = 1000 * 60 * 60 * 6;
  var STORAGE_CACHE_PREFIX = 'trakttv_row_cache_v1_';
  var SOURCE_FILTER_FIELDS = ['trakt_source_ignore_watched', 'trakt_source_ignore_watchlisted'];
  function getUiDeadline(screen) {
    return screen === 'main' ? UI_DEADLINE_MAIN_MS : UI_DEADLINE_CATEGORY_MS;
  }
  function getAuthFingerprint() {
    try {
      if (!Lampa || !Lampa.Storage || typeof Lampa.Storage.get !== 'function') return 'anon';
      var accessToken = String(Lampa.Storage.get('trakt_token') || '');
      var refreshToken = String(Lampa.Storage.get('trakt_refresh_token') || '');
      var token = accessToken || refreshToken;
      if (!token) return 'anon';
      return 't' + token.length + '_' + token.slice(-8);
    } catch (error) {
      return 'anon';
    }
  }
  function parseBooleanValue(value) {
    if (typeof value === 'boolean') return value;
    if (value === 1 || value === '1' || value === 'true') return true;
    if (value === 0 || value === '0' || value === 'false') return false;
    return null;
  }
  function readBooleanStorage$1(name) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    try {
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.get === 'function') {
        var direct = parseBooleanValue(Lampa.Storage.get(name));
        if (direct !== null) return direct;
      }
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.field === 'function') {
        var fromField = parseBooleanValue(Lampa.Storage.field(name));
        if (fromField !== null) return fromField;
      }
    } catch (error) {
      return fallback;
    }
    return fallback;
  }
  function getSourceFilterFingerprint() {
    var ignoreWatched = readBooleanStorage$1('trakt_source_ignore_watched', false) ? '1' : '0';
    var ignoreWatchlisted = readBooleanStorage$1('trakt_source_ignore_watchlisted', false) ? '1' : '0';
    return "iw:".concat(ignoreWatched, "|iwl:").concat(ignoreWatchlisted);
  }
  function buildRowCacheKey(config, params, screen) {
    var rowName = config && config.name ? config.name : 'unknown';
    var categoryContext = params && params.url ? String(params.url) : '';
    var authFingerprint = getAuthFingerprint();
    var filtersFingerprint = getSourceFilterFingerprint();
    return STORAGE_CACHE_PREFIX + [rowName, screen || 'unknown', categoryContext, authFingerprint, filtersFingerprint].join('|');
  }
  function toCacheLine(line) {
    var cached = Object.assign({}, line);
    delete cached.onMore;
    return cached;
  }
  function saveRowToCache(cacheKey, line) {
    if (!line || !Array.isArray(line.results) || !line.results.length) return;
    if (!Lampa || !Lampa.Storage || typeof Lampa.Storage.set !== 'function') return;
    try {
      Lampa.Storage.set(cacheKey, {
        time: Date.now(),
        line: toCacheLine(line)
      });
    } catch (error) {
      logWarn('Rows cache save failed', error, {
        debugOnly: true
      });
    }
  }
  function clearRowCache(cacheKey) {
    if (!Lampa || !Lampa.Storage || typeof Lampa.Storage.set !== 'function') return;
    try {
      Lampa.Storage.set(cacheKey, null);
    } catch (error) {
      logWarn('Rows cache clear failed', error, {
        debugOnly: true
      });
    }
  }
  function loadRowFromCache(cacheKey) {
    if (!Lampa || !Lampa.Storage || typeof Lampa.Storage.get !== 'function') return null;
    try {
      var cached = Lampa.Storage.get(cacheKey);
      var time = Number(cached && cached.time || 0);
      var line = cached && cached.line;
      if (!time || !line || !Array.isArray(line.results) || !line.results.length) return null;
      if (Date.now() - time > STALE_CACHE_TTL_MS) return null;
      return line;
    } catch (error) {
      logWarn('Rows cache load failed', error, {
        debugOnly: true
      });
      return null;
    }
  }
  function clearAllRowCaches() {
    if (!Lampa || !Lampa.Storage || typeof Lampa.Storage.set !== 'function') return;
    try {
      var keys = typeof localStorage !== 'undefined' ? Object.keys(localStorage) : [];
      keys.forEach(function (key) {
        if (String(key || '').indexOf(STORAGE_CACHE_PREFIX) !== 0) return;
        Lampa.Storage.set(key, null);
      });
    } catch (error) {
      logWarn('Rows cache bulk clear failed', error, {
        debugOnly: true
      });
    }
  }
  function createOnMoreHandler(config) {
    return function () {
      Lampa.Activity.push({
        title: config.displayTitle,
        component: config.component,
        page: 1
      });
    };
  }
  function attachOnMore(line, config) {
    if (!line) return null;
    var payload = Object.assign({}, line);
    payload.onMore = createOnMoreHandler(config);
    return payload;
  }
  function createRowPayload(config, data, normalizedResults) {
    return {
      title: config.displayTitle,
      trakt_line: true,
      trakt_line_title: config.displayTitle,
      trakt_more_component: config.component,
      trakt_more_title: config.displayTitle,
      trakt_row: config.traktRow || '',
      source: 'tmdb',
      page: data && data.page ? data.page : 1,
      total_pages: data && data.total_pages ? data.total_pages : 1,
      results: normalizedResults
    };
  }

  /**
   * Initialize ContentRows for TraktTV plugin (Lampa 3.0+)
   * Registers content rows for main and category screens
   */
  function initContentRows() {
    if (initialized) return;
    if (!Lampa || !Lampa.ContentRows || typeof Lampa.ContentRows.add !== 'function') return;
    initialized = true;

    // Cleanup deprecated cache keys
    Lampa.Storage.set('trakttv_cached_upnext', null);
    Lampa.Storage.set('trakttv_cached_recommendations', null);
    clearAllRowCaches();
    registerLineTitleDecorator();
    registerSourceFiltersCacheInvalidation();
    registerRows();
    registerCalendarRows();
    registerDvdRows();
  }
  function registerSourceFiltersCacheInvalidation() {
    if (!Lampa || !Lampa.Storage || !Lampa.Storage.listener || typeof Lampa.Storage.listener.follow !== 'function') return;
    Lampa.Storage.listener.follow('change', function (event) {
      var name = event && event.name ? String(event.name) : '';
      if (!name || SOURCE_FILTER_FIELDS.indexOf(name) === -1) return;
      clearAllRowCaches();
    });
  }
  function registerLineTitleDecorator() {
    Lampa.Listener.follow('line', function (e) {
      if (!e || e.type !== 'create' || !e.data || !e.data.trakt_line) return;
      try {
        var titleNode = icons.createLineTitle(e.data.trakt_line_title || e.data.title || '');
        var container = e.line && e.line.render ? e.line.render().find('.items-line__title') : null;
        if (container && container.length) container.empty().append(titleNode);
        if (e.line && typeof e.line.use === 'function' && e.data.trakt_more_component) {
          e.line.use({
            onlyMore: function onlyMore() {
              Lampa.Activity.push({
                title: e.data.trakt_more_title || e.data.title || '',
                component: e.data.trakt_more_component,
                page: 1,
                source: e.data.source || 'tmdb'
              });
            }
          });
        }
      } catch (error) {
        logError('Line title decorate failed', error, {
          debugOnly: true
        });
      }
    });
  }
  function createRowCall(config) {
    return function (params, screen) {
      if (typeof config.visibleOn === 'function' && !config.visibleOn(params, screen)) return;
      if (typeof config.checkPermission === 'function' && !config.checkPermission()) return;
      var rowLimit = Math.max(1, parseInt(config.limit, 10) || 20);
      var rowDisplayLimit = Math.max(1, parseInt(config.displayLimit, 10) || 0);
      return function (call) {
        if (!Api || typeof Api[config.apiMethod] !== 'function') {
          logWarn('Row API method unavailable', {
            row: config.name
          }, {
            debugOnly: true
          });
          return call();
        }
        var cacheKey = buildRowCacheKey(config, params, screen);
        var staleLine = attachOnMore(loadRowFromCache(cacheKey), config);
        var deadline = getUiDeadline(screen);
        var done = false;
        var timeoutId = null;
        var finish = function finish(line) {
          if (done) return;
          done = true;
          if (timeoutId) clearTimeout(timeoutId);
          if (line && Array.isArray(line.results) && line.results.length) call(line);else call();
        };
        timeoutId = setTimeout(function () {
          finish(staleLine);
        }, deadline);
        Api[config.apiMethod]({
          limit: rowLimit,
          page: 1
        }).then(function (data) {
          var results = data && Array.isArray(data.results) ? data.results : [];
          var filtered = typeof config.filter === 'function' ? config.filter(results, params, screen) : results;
          if (!filtered || !filtered.length) {
            clearRowCache(cacheKey);
            if (!done) finish(null);
            return;
          }
          var limitedResults = rowDisplayLimit > 0 ? filtered.slice(0, rowDisplayLimit) : filtered;
          var normalizedResults = normalizeContentData(limitedResults);
          if (screen === 'main' && config.topshelf) {
            updateTopshelf(config.topshelf, filtered);
          }
          var line = createRowPayload(config, data, normalizedResults);
          saveRowToCache(cacheKey, line);
          if (!done) finish(attachOnMore(line, config));
        })["catch"](function (error) {
          logWarn('Row load failed', {
            row: config.name,
            error: error
          }, {
            debugOnly: true
          });
          if (!done) finish(staleLine);
        });
      };
    };
  }
  function registerRows() {
    var rows = [{
      name: 'TraktUpNextRow',
      title: Lampa.Lang.translate('trakttv_row_upnext'),
      index: 1,
      screen: ['main', 'category'],
      displayTitle: Lampa.Lang.translate('trakttv_upnext'),
      apiMethod: 'upnext',
      component: 'trakt_upnext',
      limit: 36,
      displayLimit: 20,
      topshelf: 'upnext',
      traktRow: 'upnext',
      checkPermission: checkUpNextPermissions,
      visibleOn: function visibleOn(params, screen) {
        return screen !== 'category' || params.url === 'tv';
      }
    }, {
      name: 'TraktRecommendationsRow',
      title: Lampa.Lang.translate('trakttv_row_recommendations_main'),
      index: 2,
      screen: ['main'],
      displayTitle: Lampa.Lang.translate('trakttv_recommendations'),
      apiMethod: 'recommendations',
      component: 'trakttv_recommendations',
      limit: 36,
      displayLimit: 20,
      topshelf: 'recommendations',
      checkPermission: checkRecommendationsPermissions,
      visibleOn: function visibleOn() {
        return true;
      }
    }, {
      name: 'TraktRecommendationsRowMovie',
      title: Lampa.Lang.translate('trakttv_row_recommendations_movie'),
      index: 2,
      screen: ['category'],
      displayTitle: Lampa.Lang.translate('trakttv_recommendations'),
      apiMethod: 'recommendations',
      component: 'trakttv_recommendations',
      limit: 36,
      displayLimit: 20,
      checkPermission: checkRecommendationsPermissions,
      visibleOn: function visibleOn(params) {
        return params.url === 'movie';
      },
      filter: function filter(results) {
        return filterByContentType(results, 'movie');
      }
    }, {
      name: 'TraktRecommendationsRowTv',
      title: Lampa.Lang.translate('trakttv_row_recommendations_tv'),
      index: 2,
      screen: ['category'],
      displayTitle: Lampa.Lang.translate('trakttv_recommendations'),
      apiMethod: 'recommendations',
      component: 'trakttv_recommendations',
      limit: 36,
      displayLimit: 20,
      checkPermission: checkRecommendationsPermissions,
      visibleOn: function visibleOn(params) {
        return params.url === 'tv';
      },
      filter: function filter(results) {
        return filterByContentType(results, 'tv');
      }
    }];
    rows.forEach(function (row) {
      Lampa.ContentRows.add({
        name: row.name,
        title: row.title,
        index: row.index,
        screen: row.screen,
        call: createRowCall(row)
      });
    });
  }

  /**
   * Register Calendar rows with Episode card format
   * (same look as title_upcoming_episodes / title_recent_episodes)
   */
  function registerCalendarRows() {
    if (!Api || typeof Api.get !== 'function') return;
    var ROW_LIMIT = 20;

    /**
     * Build a calendar API call handler for a given screen filter
     */
    function createCalendarCall(screenFilter) {
      return function (params, screen) {
        // Permission: needs Trakt auth
        if (!Lampa.Storage.get('trakt_token')) return;

        // Screen-specific visibility
        if (typeof screenFilter === 'function' && !screenFilter(params, screen)) return;
        return function (call) {
          var now = new Date();
          var startDate = new Date(now);
          startDate.setDate(now.getDate() - 3);
          var yyyy = startDate.getFullYear();
          var mm = String(startDate.getMonth() + 1).padStart(2, '0');
          var dd = String(startDate.getDate()).padStart(2, '0');
          var dateString = "".concat(yyyy, "-").concat(mm, "-").concat(dd);
          var days = 7;
          Api.get("/calendars/my/shows/".concat(dateString, "/").concat(days, "?extended=full,images")).then(function (response) {
            var raw = Array.isArray(response) ? response : [];

            // Group by show TMDB ID (deduplicate — one card per show)
            var showMap = {};
            raw.forEach(function (item) {
              var show = item && item.show;
              var episode = item && item.episode;
              if (!show || !show.ids) return;
              var tmdbId = show.ids.tmdb;
              if (!tmdbId) return;
              if (!showMap[tmdbId]) {
                showMap[tmdbId] = {
                  show: show,
                  first_aired: item.first_aired,
                  episode: episode
                };
              }
            });
            var shows = Object.values(showMap);

            // Sort by first_aired ascending (earliest upcoming first)
            shows.sort(function (a, b) {
              return (a.first_aired || '').localeCompare(b.first_aired || '');
            });

            // Resolve Episode interaction & Module from Lampa runtime
            var EpisodeClass = Lampa.Maker && Lampa.Maker.get('Episode');
            var EpisodeModule = Lampa.Maker && Lampa.Maker.module('Episode');
            var moduleMask = EpisodeModule ? EpisodeModule.only('Card', 'Callback') : undefined;
            var selectedShows = shows.slice(0, ROW_LIMIT);

            // Build base episode-card items (still_path will be filled from TMDB)
            var baseResults = selectedShows.map(function (item) {
              var show = item.show;
              var first_aired = item.first_aired;
              var episode = item.episode;
              var airDate = first_aired ? String(first_aired).slice(0, 10) : '';
              var airTime = airDate ? Lampa.Utils.parseToDate(airDate).getTime() : Date.now();
              var card = {
                id: show.ids.tmdb,
                ids: show.ids,
                title: show.title,
                original_title: show.title,
                original_name: show.title,
                name: show.title,
                poster: getImageUrl(show, 'poster'),
                image: getImageUrl(show, 'fanart'),
                source: 'tmdb'
              };
              var epData = {
                air_date: airDate,
                season_number: episode ? episode.season : null,
                episode_number: episode ? episode.number : null,
                name: episode ? episode.title : '',
                still_path: ''
              };
              var out = {
                card: card,
                episode: epData,
                time: airTime,
                title: show.title,
                id: show.ids.tmdb,
                ids: show.ids,
                params: {}
              };

              // Copy episode fields to root
              Lampa.Arrays && Lampa.Arrays.extend ? Lampa.Arrays.extend(out, epData) : Object.keys(epData).forEach(function (k) {
                out[k] = epData[k];
              });

              // Episode interaction
              if (EpisodeClass) {
                out.params.createInstance = function (data) {
                  var merged = _typeof(data) === 'object' && data !== null ? Object.assign({}, data, data.episode || {}, {
                    card: data.card || data
                  }) : {};
                  return new EpisodeClass(merged);
                };
              }
              if (moduleMask) {
                out.params.module = moduleMask;
              }
              out.params.emit = {
                onlyEnter: function onlyEnter() {
                  Lampa.Activity.push({
                    url: '',
                    component: 'full',
                    id: card.id,
                    method: 'tv',
                    card: card,
                    source: 'tmdb'
                  });
                },
                onlyFocus: function onlyFocus() {
                  if (Lampa.Utils && Lampa.Utils.cardImgBackgroundBlur) {
                    Lampa.Background.change(Lampa.Utils.cardImgBackgroundBlur(card));
                  }
                }
              };
              return out;
            });

            // Fetch episode stills from TMDB in parallel (silent, each fails to empty string)
            var stillPromises = selectedShows.map(function (item) {
              var showTmdbId = item.show && item.show.ids && item.show.ids.tmdb;
              var seasonNum = item.episode && item.episode.season;
              var epNum = item.episode && item.episode.number;
              if (!showTmdbId || seasonNum == null || epNum == null) return Promise.resolve('');
              return new Promise(function (resolve) {
                try {
                  var url = Lampa.TMDB.api('tv/' + showTmdbId + '/season/' + seasonNum + '/episode/' + epNum + '?api_key=' + Lampa.TMDB.key() + '&language=' + Lampa.Storage.get('language', 'en'));
                  var network = new Lampa.Reguest();
                  network.silent(url, function (data) {
                    resolve(data && data.still_path ? String(data.still_path) : '');
                  }, function () {
                    resolve('');
                  });
                } catch (e) {
                  resolve('');
                }
              });
            });
            return Promise.all(stillPromises).then(function (stillPaths) {
              // Merge still_path into results
              baseResults.forEach(function (out, index) {
                var path = stillPaths[index];
                if (path) {
                  out.still_path = path;
                  out.episode.still_path = path;
                }
              });
              if (!baseResults.length) return call();
              call({
                results: baseResults,
                title: Lampa.Lang.translate('trakttv_calendar'),
                trakt_line: true,
                trakt_line_title: Lampa.Lang.translate('trakttv_calendar')
              });
            });
          })["catch"](function () {
            call();
          });
        };
      };
    }

    // Row: main screen (always visible when authed)
    Lampa.ContentRows.add({
      name: 'TraktCalendarRow',
      title: Lampa.Lang.translate('trakttv_row_calendar_main'),
      index: 3,
      screen: ['main'],
      call: createCalendarCall(function () {
        return true;
      })
    });

    // Row: category / tv screen (only on tv URL)
    Lampa.ContentRows.add({
      name: 'TraktCalendarRowTv',
      title: Lampa.Lang.translate('trakttv_row_calendar_tv'),
      index: 3,
      screen: ['category'],
      call: createCalendarCall(function (params) {
        return params && params.url === 'tv';
      })
    });
  }

  /**
   * Register DVD calendar rows (standard poster cards)
   * Uses /calendars/all/dvd/{start_date}/{days} via createRowCall
   */
  function registerDvdRows() {
    var dvdRows = [{
      name: 'TraktDvdCalendarRow',
      title: Lampa.Lang.translate('trakttv_row_dvd_calendar_main'),
      index: 3,
      screen: ['main'],
      displayTitle: Lampa.Lang.translate('trakttv_calendar') + ' DVD',
      apiMethod: 'dvdCalendar',
      limit: 36,
      displayLimit: 20,
      checkPermission: checkCalendarPermissions,
      visibleOn: function visibleOn() {
        return true;
      }
    }, {
      name: 'TraktDvdCalendarRowMovies',
      title: Lampa.Lang.translate('trakttv_row_dvd_calendar_movies'),
      index: 3,
      screen: ['category'],
      displayTitle: Lampa.Lang.translate('trakttv_calendar') + ' DVD',
      apiMethod: 'dvdCalendar',
      limit: 36,
      displayLimit: 20,
      checkPermission: checkCalendarPermissions,
      visibleOn: function visibleOn(params) {
        return params && params.url === 'movie';
      }
    }];
    dvdRows.forEach(function (row) {
      Lampa.ContentRows.add({
        name: row.name,
        title: row.title,
        index: row.index,
        screen: row.screen,
        call: createRowCall(row)
      });
    });
  }

  var SOURCE_KEY = 'trakttv';
  var DEFAULT_LIMIT = 20;
  var DEFAULT_CHUNK = 3;
  var TRAKT_TRENDING_GENRES = [{
    name: 'Action',
    slug: 'action',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Adventure',
    slug: 'adventure',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Animation',
    slug: 'animation',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Anime',
    slug: 'anime',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Biography',
    slug: 'biography',
    supported_types: ['shows']
  }, {
    name: 'Children',
    slug: 'children',
    supported_types: ['shows']
  }, {
    name: 'Comedy',
    slug: 'comedy',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Crime',
    slug: 'crime',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Documentary',
    slug: 'documentary',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Donghua',
    slug: 'donghua',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Drama',
    slug: 'drama',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Family',
    slug: 'family',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Fantasy',
    slug: 'fantasy',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Game Show',
    slug: 'game-show',
    supported_types: ['shows']
  }, {
    name: 'History',
    slug: 'history',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Holiday',
    slug: 'holiday',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Home And Garden',
    slug: 'home-and-garden',
    supported_types: ['shows']
  }, {
    name: 'Horror',
    slug: 'horror',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Mini Series',
    slug: 'mini-series',
    supported_types: ['shows']
  }, {
    name: 'Music',
    slug: 'music',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Musical',
    slug: 'musical',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Mystery',
    slug: 'mystery',
    supported_types: ['movies', 'shows']
  }, {
    name: 'News',
    slug: 'news',
    supported_types: ['shows']
  }, {
    name: 'None',
    slug: 'none',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Reality',
    slug: 'reality',
    supported_types: ['shows']
  }, {
    name: 'Romance',
    slug: 'romance',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Science Fiction',
    slug: 'science-fiction',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Short',
    slug: 'short',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Soap',
    slug: 'soap',
    supported_types: ['shows']
  }, {
    name: 'Special Interest',
    slug: 'special-interest',
    supported_types: ['shows']
  }, {
    name: 'Sporting Event',
    slug: 'sporting-event',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Superhero',
    slug: 'superhero',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Suspense',
    slug: 'suspense',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Talk Show',
    slug: 'talk-show',
    supported_types: ['shows']
  }, {
    name: 'Thriller',
    slug: 'thriller',
    supported_types: ['movies', 'shows']
  }, {
    name: 'War',
    slug: 'war',
    supported_types: ['movies', 'shows']
  }, {
    name: 'Western',
    slug: 'western',
    supported_types: ['movies', 'shows']
  }];
  var TRAKT_TRENDING_GENRE_SLUGS = new Set(TRAKT_TRENDING_GENRES.map(function (genre) {
    return String(genre && genre.slug ? genre.slug : '').trim().toLowerCase();
  }).filter(Boolean));
  function t(key) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    try {
      var translated = Lampa.Lang.translate(key);
      return translated || fallback || key;
    } catch (e) {
      return fallback || key;
    }
  }
  function decodeQuery(value) {
    if (value === undefined || value === null) return '';
    if (_typeof(value) === 'object') return '';
    var source = String(value || '').trim();
    if (!source) return '';
    if (source === '[object Object]') return '';
    try {
      var decoded = decodeURIComponent(source);
      var normalized = String(decoded || '').trim();
      if (!normalized || normalized === '[object Object]') return '';
      return normalized;
    } catch (e) {
      return source === '[object Object]' ? '' : source;
    }
  }
  function toPositiveInt(value) {
    var parsed = parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  function toNonNegativeInt(value) {
    var parsed = parseInt(value, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
  }
  function readBooleanStorage(name) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var parse = function parse(value) {
      if (typeof value === 'boolean') return value;
      if (value === 1 || value === '1' || value === 'true') return true;
      if (value === 0 || value === '0' || value === 'false') return false;
      return null;
    };
    try {
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.get === 'function') {
        var direct = parse(Lampa.Storage.get(name));
        if (direct !== null) return direct;
      }
      if (Lampa && Lampa.Storage && typeof Lampa.Storage.field === 'function') {
        var fromField = parse(Lampa.Storage.field(name));
        if (fromField !== null) return fromField;
      }
    } catch (error) {
      return fallback;
    }
    return fallback;
  }
  function resolvePagination() {
    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_LIMIT;
    var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var fallbackPage = toPositiveInt(page) || 1;
    var fallbackLimit = toPositiveInt(limit) || DEFAULT_LIMIT;
    var safeCount = Math.max(0, parseInt(count, 10) || 0);
    var headerPage = toPositiveInt(headers['x-pagination-page']) || fallbackPage;
    var headerLimit = toPositiveInt(headers['x-pagination-limit']) || fallbackLimit;
    var headerTotal = toNonNegativeInt(headers['x-pagination-item-count']);
    var headerPageCount = toPositiveInt(headers['x-pagination-page-count']);
    var total = headerTotal !== null ? headerTotal : (Math.max(1, headerPage) - 1) * Math.max(1, headerLimit) + safeCount;
    var totalPages = headerPageCount || (safeCount >= headerLimit ? headerPage + 1 : Math.max(1, headerPage));
    return {
      page: headerPage,
      limit: headerLimit,
      total: total,
      total_pages: totalPages
    };
  }
  function normalizeSearchType() {
    var rawType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var value = String(rawType || '').trim().toLowerCase();
    if (value === 'movie' || value === 'movies') return 'movie';
    if (value === 'tv' || value === 'show' || value === 'shows' || value === 'series') return 'show';
    if (value === 'list' || value === 'lists') return 'list';
    return '';
  }
  function normalizePath() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return String(path || '').trim().replace(/^\/+/, '');
  }
  function applyQueryParams(query) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!params || _typeof(params) !== 'object') return query;
    Object.keys(params).forEach(function (key) {
      var value = params[key];
      if (value === undefined || value === null || value === '') return;
      var normalizedKey = String(key || '').trim();
      if (!normalizedKey || normalizedKey === '[object Object]') return;
      if (_typeof(value) === 'object') return;
      var normalizedValue = String(value).trim();
      if (!normalizedValue || normalizedValue === '[object Object]') return;
      query.set(normalizedKey, normalizedValue);
    });
    return query;
  }
  function applySourceFilters(query) {
    query.set('ignore_watched', readBooleanStorage('trakt_source_ignore_watched', false) ? 'true' : 'false');
    query.set('ignore_watchlisted', readBooleanStorage('trakt_source_ignore_watchlisted', false) ? 'true' : 'false');
    return query;
  }
  function buildFeedUrl(path) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_LIMIT;
    var queryParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var query = applyQueryParams(applySourceFilters(new URLSearchParams({
      extended: 'full,images',
      page: String(Math.max(1, parseInt(page, 10) || 1)),
      limit: String(Math.max(1, parseInt(limit, 10) || DEFAULT_LIMIT))
    })), queryParams);
    return "/".concat(normalizePath(path), "?").concat(query.toString());
  }
  function buildRecommendationsUrl(type) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_LIMIT;
    var queryParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var normalizedType = normalizePath(type).replace(/^recommendations\//, '');
    var query = applyQueryParams(applySourceFilters(new URLSearchParams({
      extended: 'full,images',
      page: String(Math.max(1, parseInt(page, 10) || 1)),
      limit: String(Math.max(1, parseInt(limit, 10) || DEFAULT_LIMIT))
    })), queryParams);
    query.set('ignore_collected', readBooleanStorage('trakt_source_ignore_watchlisted', false) ? 'true' : 'false');
    return "/recommendations/".concat(normalizedType, "?").concat(query.toString());
  }
  function buildSearchUrl(type, query) {
    var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_LIMIT;
    var queryParams = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var normalizedQuery = decodeQuery(query);
    if (!normalizedQuery) return '';
    var finalParams = applyQueryParams(applySourceFilters(new URLSearchParams({
      query: normalizedQuery,
      extended: 'full,images',
      page: String(Math.max(1, parseInt(page, 10) || 1)),
      limit: String(Math.max(1, parseInt(limit, 10) || DEFAULT_LIMIT))
    })), queryParams);
    return "/search/".concat(normalizePath(type), "?").concat(finalParams.toString());
  }
  function normalizeTraktGenreValue(value) {
    var normalized = String(value || '').trim().toLowerCase();
    if (!normalized || normalized === '[object object]') return '';
    if (normalized === '16') return 'animation';
    if (/^\d+$/.test(normalized)) return '';
    if (TRAKT_TRENDING_GENRE_SLUGS.has(normalized)) return normalized;
    if (/^[a-z0-9-]+$/.test(normalized)) return normalized;
    return '';
  }
  function resolveTraktGenreFilter() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var raw = params ? params.genres : null;
    if (raw === undefined || raw === null || raw === '') return '';
    var values = Array.isArray(raw) ? raw : String(raw).split(',');
    var normalizedValues = values.map(function (value) {
      return normalizeTraktGenreValue(value);
    }).filter(Boolean);
    if (!normalizedValues.length) return '';
    return Array.from(new Set(normalizedValues)).join(',');
  }
  function supportsAllGenreTypes() {
    var genre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var requiredTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (!Array.isArray(requiredTypes) || !requiredTypes.length) return true;
    var supportedTypes = Array.isArray(genre.supported_types) ? genre.supported_types : [];
    return requiredTypes.every(function (type) {
      return supportedTypes.indexOf(type) > -1;
    });
  }
  function buildTrendingGenreDefinitions(path, typeHint) {
    var requiredTypes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var trendingTitle = t('trakttv_source_trending', 'Trending');
    return TRAKT_TRENDING_GENRES.filter(function (genre) {
      return supportsAllGenreTypes(genre, requiredTypes);
    }).map(function (genre) {
      return {
        path: path,
        title: "".concat(trendingTitle, ": ").concat(genre.name),
        typeHint: typeHint,
        query: {
          genres: genre.slug
        },
        lazy: true
      };
    });
  }
  function detectMediaType(entry) {
    var typeHint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var normalizedHint = String(typeHint || '').toLowerCase();
    if (normalizedHint === 'movie' || normalizedHint === 'movies') return 'movie';
    if (normalizedHint === 'show' || normalizedHint === 'shows' || normalizedHint === 'tv') return 'tv';
    if (entry && _typeof(entry) === 'object') {
      if (entry.movie) return 'movie';
      if (entry.show) return 'tv';
      if (entry.type === 'movie') return 'movie';
      if (entry.type === 'show' || entry.type === 'tv') return 'tv';
      if (entry.first_aired || entry.aired_episodes !== undefined) return 'tv';
    }
    return 'movie';
  }
  function mapMediaCard(entry) {
    var typeHint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    if (!entry || _typeof(entry) !== 'object') return null;
    var media = entry.movie || entry.show || entry;
    if (!media || _typeof(media) !== 'object') return null;
    var ids = media.ids && _typeof(media.ids) === 'object' ? _objectSpread2({}, media.ids) : {};
    var mediaType = detectMediaType(entry, typeHint);
    var id = ids.tmdb || null;
    if (!id) return null;
    var title = media.title || media.name || media.original_title || '';
    var releaseDate = mediaType === 'movie' ? media.released || (media.year ? String(media.year) : '') : media.first_aired || (media.year ? String(media.year) : '');
    var poster = getImageUrl(media, 'poster') || getImageUrl(media, 'thumb') || getImageUrl(media, 'fanart') || textToImage(title || 'No image');
    var fanart = getImageUrl(media, 'fanart') || getImageUrl(media, 'thumb') || poster;
    var card = {
      component: 'full',
      source: 'tmdb',
      id: id,
      ids: ids,
      title: title,
      original_title: media.original_title || title,
      release_date: releaseDate ? String(releaseDate) : '',
      vote_average: Number(media.rating || 0),
      vote_count: Number(media.votes || 0),
      overview: media.overview || '',
      poster: poster,
      image: fanart,
      method: mediaType === 'movie' ? 'movie' : 'tv',
      card_type: mediaType === 'movie' ? 'movie' : 'tv'
    };
    if (mediaType === 'movie') {
      card.type = 'movie';
    } else {
      card.type = 'tv';
      card.name = title;
      card.original_name = media.original_title || title;
    }
    if (ids.imdb) card.imdb_id = ids.imdb;
    if (media.runtime) card.runtime = Number(media.runtime) || 0;
    if (media.year) card.release_year = String(media.year);
    return card;
  }
  function mapListCard(entry) {
    if (!entry || _typeof(entry) !== 'object') return null;
    var list = entry.list || entry;
    var ids = list.ids && _typeof(list.ids) === 'object' ? _objectSpread2({}, list.ids) : {};
    var listId = ids.trakt || list.id;
    if (!listId) return null;
    var title = (list.name || list.title || list.slug || "List ".concat(listId)).toString().trim();
    return {
      component: 'full',
      source: SOURCE_KEY,
      id: "trakt_list_".concat(listId),
      title: title,
      original_title: title,
      release_date: '',
      vote_average: 0,
      poster: getImageUrl(list, 'poster') || textToImage(title || 'List'),
      image: getImageUrl(list, 'fanart'),
      method: 'list',
      card_type: 'list',
      trakt_search_type: 'list',
      trakt_list_id: listId,
      list_id: listId,
      ids: ids
    };
  }
  function mapCards(items) {
    var typeHint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var source = Array.isArray(items) ? items : [];
    var normalizedHint = String(typeHint || '').toLowerCase();
    if (normalizedHint === 'list') {
      return source.map(mapListCard).filter(Boolean);
    }
    return source.map(function (entry) {
      return mapMediaCard(entry, normalizedHint);
    }).filter(Boolean);
  }
  function fetchWithMeta(url) {
    return requestApi('GET', url, {}, false, 0, {
      withMeta: true
    }).then(function (response) {
      var data = response && Array.isArray(response.data) ? response.data : [];
      var headers = response && response.headers ? response.headers : {};
      return {
        data: data,
        headers: headers
      };
    });
  }
  function createLinePayload(_ref) {
    var title = _ref.title,
      path = _ref.path,
      items = _ref.items,
      headers = _ref.headers,
      page = _ref.page,
      limit = _ref.limit,
      typeHint = _ref.typeHint,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? {} : _ref$query;
    var results = mapCards(items, typeHint);
    var pagination = resolvePagination(headers, page, limit, Array.isArray(items) ? items.length : 0);
    var line = {
      title: title,
      url: normalizePath(path),
      source: SOURCE_KEY,
      page: pagination.page,
      total: pagination.total,
      total_pages: pagination.total_pages,
      results: results
    };
    var genres = query && _typeof(query) === 'object' ? String(query.genres || '').trim() : '';
    if (genres) line.genres = genres;
    return line;
  }
  function loadFeedLine(_ref2) {
    var path = _ref2.path,
      title = _ref2.title,
      _ref2$typeHint = _ref2.typeHint,
      typeHint = _ref2$typeHint === void 0 ? 'media' : _ref2$typeHint,
      _ref2$recommendations = _ref2.recommendations,
      recommendations = _ref2$recommendations === void 0 ? false : _ref2$recommendations,
      _ref2$query = _ref2.query,
      query = _ref2$query === void 0 ? {} : _ref2$query;
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_LIMIT;
    var endpoint = recommendations ? buildRecommendationsUrl(path, page, limit, query) : buildFeedUrl(path, page, limit, query);
    return fetchWithMeta(endpoint).then(function (_ref3) {
      var data = _ref3.data,
        headers = _ref3.headers;
      return createLinePayload({
        title: title,
        path: path,
        items: data,
        headers: headers,
        page: page,
        limit: limit,
        typeHint: typeHint,
        query: query
      });
    });
  }
  function loadSearchLine(type, query) {
    var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_LIMIT;
    var extraQuery = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var normalizedType = normalizeSearchType(type);
    var normalizedQuery = decodeQuery(query);
    if (!normalizedType || !normalizedQuery) return Promise.resolve(null);
    var endpoint = buildSearchUrl(normalizedType, normalizedQuery, page, limit, extraQuery);
    if (!endpoint) return Promise.resolve(null);
    return fetchWithMeta(endpoint).then(function (_ref4) {
      var data = _ref4.data,
        headers = _ref4.headers;
      var title = normalizedType === 'movie' ? t('menu_movies', 'Movies') : normalizedType === 'show' ? t('menu_tv', 'TV') : t('trakt_source_search_lists', 'Lists');
      var typeHint = normalizedType === 'list' ? 'list' : normalizedType === 'show' ? 'show' : 'movie';
      var line = createLinePayload({
        title: title,
        path: "search/".concat(normalizedType),
        items: data,
        headers: headers,
        page: page,
        limit: limit,
        typeHint: typeHint
      });
      line.type = normalizedType === 'show' ? 'tv' : normalizedType;
      line.search_type = normalizedType;
      line.query = normalizedQuery;
      return line;
    });
  }
  function buildMainDefinitions() {
    var defs = [{
      path: 'media/trending',
      title: t('trakttv_source_trending', 'Trending'),
      typeHint: 'media'
    }, {
      path: 'media/anticipated',
      title: t('trakttv_source_anticipated', 'Anticipated'),
      typeHint: 'media'
    }, {
      path: 'media/popular',
      title: t('trakttv_source_popular', 'Popular'),
      typeHint: 'media'
    }];
    if (Lampa.Storage.get('trakt_token')) {
      defs.push({
        path: 'recommendations/movies',
        title: t('trakttv_source_recommendations_movies', 'Recommendations: Movies'),
        typeHint: 'movie',
        recommendations: true
      });
      defs.push({
        path: 'recommendations/shows',
        title: t('trakttv_source_recommendations_shows', 'Recommendations: Shows'),
        typeHint: 'show',
        recommendations: true
      });
    }
    defs.push.apply(defs, _toConsumableArray(buildTrendingGenreDefinitions('media/trending', 'media', ['movies', 'shows'])));
    return defs;
  }
  function buildCategoryDefinitions() {
    var section = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'movies';
    var traktGenre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var isShows = section === 'shows';
    var useMediaForAnimation = !isShows && traktGenre === 'animation';
    var basePath = useMediaForAnimation ? 'media' : section;
    var baseTypeHint = useMediaForAnimation ? 'media' : isShows ? 'show' : 'movie';
    var query = traktGenre ? {
      genres: traktGenre
    } : {};
    var defs = [{
      path: "".concat(basePath, "/trending"),
      title: t('trakttv_source_trending', 'Trending'),
      typeHint: baseTypeHint,
      query: query
    }, {
      path: "".concat(basePath, "/anticipated"),
      title: t('trakttv_source_anticipated', 'Anticipated'),
      typeHint: baseTypeHint,
      query: query
    }, {
      path: "".concat(basePath, "/popular"),
      title: t('trakttv_source_popular', 'Popular'),
      typeHint: baseTypeHint,
      query: query
    }];
    if (Lampa.Storage.get('trakt_token')) {
      if (useMediaForAnimation) {
        defs.push({
          path: 'recommendations/movies',
          title: t('trakttv_source_recommendations_movies', 'Recommendations: Movies'),
          typeHint: 'movie',
          recommendations: true,
          query: query
        });
        defs.push({
          path: 'recommendations/shows',
          title: t('trakttv_source_recommendations_shows', 'Recommendations: Shows'),
          typeHint: 'show',
          recommendations: true,
          query: query
        });
      } else {
        defs.push({
          path: isShows ? 'recommendations/shows' : 'recommendations/movies',
          title: t('trakttv_recommendations', 'Recommendations'),
          typeHint: isShows ? 'show' : 'movie',
          recommendations: true,
          query: query
        });
      }
    }
    if (!traktGenre) {
      defs.push.apply(defs, _toConsumableArray(buildTrendingGenreDefinitions("".concat(basePath, "/trending"), baseTypeHint, isShows ? ['shows'] : ['movies'])));
    }
    return defs;
  }
  function createPart(definition) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (definition.lazy) {
      return function (call) {
        var line = {
          title: definition.title,
          url: normalizePath(definition.path),
          source: SOURCE_KEY,
          results: [{
            id: 'placeholder_' + Math.random().toString(36).substr(2, 9),
            title: 'Loading...',
            card_type: 'movie',
            type: 'movie',
            poster: '',
            image: '',
            release_date: '',
            params: {
              placeholder: true
            }
          }],
          lazy_load: true,
          definition: definition
        };
        var genres = definition.query && _typeof(definition.query) === 'object' ? String(definition.query.genres || '').trim() : '';
        if (genres) line.genres = genres;
        call(line);
      };
    }
    return function (call) {
      var page = Math.max(1, parseInt(params.page, 10) || 1);
      var limit = Math.max(1, parseInt(params.limit, 10) || DEFAULT_LIMIT);
      loadFeedLine(definition, page, limit).then(function (line) {
        return call(line && line.results && line.results.length ? line : null);
      })["catch"](function () {
        return call(null);
      });
    };
  }
  function nextParts() {
    var parts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CHUNK;
    var loaded = arguments.length > 2 ? arguments[2] : undefined;
    var empty = arguments.length > 3 ? arguments[3] : undefined;
    var chunk = parts.filter(Boolean).slice(0, Math.max(1, parseInt(limit, 10) || DEFAULT_CHUNK));
    if (!chunk.length) {
      if (empty) empty();
      return;
    }
    var pending = chunk.length;
    var collected = [];
    chunk.forEach(function (part) {
      if (typeof part !== 'function') {
        var index = parts.indexOf(part);
        if (index > -1) parts[index] = null;
        if (part && Array.isArray(part.results) && part.results.length) {
          collected.push(part);
        }
        pending -= 1;
        if (pending === 0) {
          if (collected.length) {
            if (loaded) loaded(collected);
          } else {
            nextParts(parts, limit, loaded, empty);
          }
        }
        return;
      }
      part(function (line) {
        var index = parts.indexOf(part);
        if (index > -1) parts[index] = null;
        if (line && Array.isArray(line.results) && line.results.length) {
          collected.push(line);
        }
        pending -= 1;
        if (pending > 0) return;
        if (collected.length) {
          if (loaded) loaded(collected);
        } else {
          nextParts(parts, limit, loaded, empty);
        }
      });
    });
  }
  function injectContentRows() {
    var screen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'main';
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var parts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    try {
      if (Lampa.ContentRows && typeof Lampa.ContentRows.call === 'function') {
        Lampa.ContentRows.call(screen, params, parts);
      }
    } catch (error) {
      logWarn('ContentRows injection failed', error, {
        debugOnly: true
      });
    }
  }
  function createPartsLoader() {
    var definitions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
    var onerror = arguments.length > 3 ? arguments[3] : undefined;
    var screen = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'main';
    var parts = definitions.map(function (definition) {
      return createPart(definition, params);
    });
    injectContentRows(screen, params, parts);
    var load = function load(resolve, reject) {
      if (Lampa.Api && typeof Lampa.Api.partNext === 'function') {
        Lampa.Api.partNext(parts, DEFAULT_CHUNK, resolve, reject);
        return;
      }
      nextParts(parts, DEFAULT_CHUNK, resolve, reject);
    };
    load(oncomplite, onerror);
    return load;
  }
  function resolveListPath() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var urlPath = normalizePath(params.url);
    var idPath = typeof params.id === 'string' ? normalizePath(params.id) : '';
    var genresPath = typeof params.genres === 'string' ? normalizePath(params.genres) : '';
    var traktGenre = resolveTraktGenreFilter(params);
    if (idPath.indexOf('/') > -1) return idPath;
    if (genresPath.indexOf('/') > -1) return genresPath;
    if (urlPath.indexOf('/') > -1) return urlPath;
    if (urlPath === 'tv' || urlPath === 'show' || urlPath === 'shows') return 'shows/popular';
    if ((urlPath === 'movie' || urlPath === 'movies') && traktGenre === 'animation') return 'media/popular';
    if (urlPath === 'movie' || urlPath === 'movies') return 'movies/popular';
    return 'media/popular';
  }
  function openSearchListDetail() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var listId = element.trakt_list_id || element.list_id;
    if (!listId) return;
    Lampa.Activity.push({
      url: '',
      title: element.title || t('trakt_list_detail', 'List Content'),
      component: 'trakt_list_detail',
      id: listId,
      list_id: listId,
      page: 1,
      source: 'tmdb'
    });
  }
  function delegateToTmdb(method, args) {
    try {
      var tmdb = Lampa.Api && Lampa.Api.sources && Lampa.Api.sources.tmdb;
      if (tmdb && typeof tmdb[method] === 'function') {
        tmdb[method].apply(tmdb, args);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }
  var TraktSourceProvider = {
    main: function main() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      return createPartsLoader(buildMainDefinitions(), params, oncomplite, onerror, 'main');
    },
    category: function category() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var section = (params.url || '').toString().toLowerCase() === 'tv' ? 'shows' : 'movies';
      var traktGenre = resolveTraktGenreFilter(params);
      return createPartsLoader(buildCategoryDefinitions(section, traktGenre), params, oncomplite, onerror, 'category');
    },
    list: function list() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var page = Math.max(1, parseInt(params.page, 10) || 1);
      var limit = Math.max(1, parseInt(params.limit, 10) || DEFAULT_LIMIT);
      var query = decodeQuery(params.query);
      var traktGenre = resolveTraktGenreFilter(params);
      var extraQuery = traktGenre ? {
        genres: traktGenre
      } : {};
      var searchType = normalizeSearchType(params.search_type || (normalizePath(params.url).startsWith('search/') ? normalizePath(params.url).split('/')[1] : ''));
      if (searchType && !query) {
        if (onerror) onerror();
        return;
      }
      if (query && searchType) {
        loadSearchLine(searchType, query, page, limit, extraQuery).then(function (line) {
          if (!line || !line.results.length) {
            if (onerror) onerror();
            return;
          }
          line.title = params.title || line.title;
          oncomplite(line);
        })["catch"](function () {
          if (onerror) onerror();
        });
        return;
      }
      var path = resolveListPath(params);
      var typeHint = path.indexOf('shows/') === 0 || path === 'shows' ? 'show' : path.indexOf('movies/') === 0 || path === 'movies' ? 'movie' : path.indexOf('recommendations/shows') === 0 ? 'show' : path.indexOf('recommendations/movies') === 0 ? 'movie' : 'media';
      var recommendations = path.indexOf('recommendations/') === 0;
      loadFeedLine({
        path: path,
        title: params.title || t('title_popular', 'Popular'),
        typeHint: typeHint,
        recommendations: recommendations,
        query: extraQuery
      }, page, limit).then(function (line) {
        if (!line || !line.results.length) {
          if (onerror) onerror();
          return;
        }
        oncomplite(line);
      })["catch"](function () {
        if (onerror) onerror();
      });
    },
    menu: function menu() {
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var items = [{
        title: "".concat(t('menu_movies', 'Movies'), ": ").concat(t('trakttv_source_trending', 'Trending')),
        id: 'movies/trending'
      }, {
        title: "".concat(t('menu_movies', 'Movies'), ": ").concat(t('trakttv_source_anticipated', 'Anticipated')),
        id: 'movies/anticipated'
      }, {
        title: "".concat(t('menu_movies', 'Movies'), ": ").concat(t('trakttv_source_popular', 'Popular')),
        id: 'movies/popular'
      }, {
        title: "".concat(t('menu_tv', 'TV'), ": ").concat(t('trakttv_source_trending', 'Trending')),
        id: 'shows/trending'
      }, {
        title: "".concat(t('menu_tv', 'TV'), ": ").concat(t('trakttv_source_anticipated', 'Anticipated')),
        id: 'shows/anticipated'
      }, {
        title: "".concat(t('menu_tv', 'TV'), ": ").concat(t('trakttv_source_popular', 'Popular')),
        id: 'shows/popular'
      }];
      oncomplite(items);
    },
    menuCategory: function menuCategory() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var action = (params.action || '').toString().toLowerCase();
      var section = action === 'tv' ? 'shows' : 'movies';
      var items = [{
        title: t('trakttv_source_trending', 'Trending'),
        url: "".concat(section, "/trending")
      }, {
        title: t('trakttv_source_anticipated', 'Anticipated'),
        url: "".concat(section, "/anticipated")
      }, {
        title: t('trakttv_source_popular', 'Popular'),
        url: "".concat(section, "/popular")
      }];
      if (Lampa.Storage.get('trakt_token')) {
        items.push({
          title: t('trakttv_recommendations', 'Recommendations'),
          url: "recommendations/".concat(section)
        });
      }
      oncomplite(items);
    },
    full: function full() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      if (delegateToTmdb('full', [_objectSpread2(_objectSpread2({}, params), {}, {
        source: 'tmdb'
      }), oncomplite, onerror])) return;
      if (onerror) onerror();
    },
    person: function person() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      if (delegateToTmdb('person', [params, oncomplite, onerror])) return;
      if (onerror) onerror();
    },
    company: function company() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      if (delegateToTmdb('company', [params, oncomplite, onerror])) return;
      if (onerror) onerror();
    },
    seasons: function seasons() {
      var tv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
      if (delegateToTmdb('seasons', [tv, from, oncomplite])) return;
      oncomplite && oncomplite({});
    },
    collections: function collections() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      if (delegateToTmdb('collections', [params, oncomplite, onerror])) return;
      if (onerror) onerror();
    },
    discovery: function discovery() {
      return {
        title: 'TraktTV',
        params: {
          save: true
        },
        search: function search(params, oncomplite) {
          var query = decodeQuery(params && params.query).trim();
          if (!query) {
            oncomplite([]);
            return;
          }
          var endpoint = buildSearchUrl('movie,show,list', query, 1, DEFAULT_LIMIT * 3);
          fetchWithMeta(endpoint).then(function (_ref5) {
            var data = _ref5.data,
              headers = _ref5.headers;
            var items = data || [];
            var movies = items.filter(function (e) {
              return e.type === 'movie';
            });
            var shows = items.filter(function (e) {
              return e.type === 'show';
            });
            var lists = items.filter(function (e) {
              return e.type === 'list';
            });
            var rows = [];
            if (movies.length) {
              var line = createLinePayload({
                title: t('menu_movies', 'Movies'),
                path: 'search/movie',
                items: movies,
                headers: headers,
                page: 1,
                limit: DEFAULT_LIMIT,
                typeHint: 'movie'
              });
              line.type = 'movie';
              line.search_type = 'movie';
              line.query = query;
              rows.push(line);
            }
            if (shows.length) {
              var _line = createLinePayload({
                title: t('menu_tv', 'TV'),
                path: 'search/show',
                items: shows,
                headers: headers,
                page: 1,
                limit: DEFAULT_LIMIT,
                typeHint: 'show'
              });
              _line.type = 'tv';
              _line.search_type = 'show';
              _line.query = query;
              rows.push(_line);
            }
            if (lists.length) {
              var _line2 = createLinePayload({
                title: t('trakt_source_search_lists', 'Lists'),
                path: 'search/list',
                items: lists,
                headers: headers,
                page: 1,
                limit: DEFAULT_LIMIT,
                typeHint: 'list'
              });
              _line2.type = 'list';
              _line2.search_type = 'list';
              _line2.query = query;
              rows.push(_line2);
            }
            oncomplite(rows);
          })["catch"](function () {
            oncomplite([]);
          });
        },
        onSelect: function onSelect(params, close) {
          var element = params && (params.element || params.item_data) ? params.element || params.item_data : {};
          var isList = element && (element.trakt_search_type === 'list' || element.method === 'list');
          close && close();
          if (isList) {
            openSearchListDetail(element);
            return;
          }
          Lampa.Activity.push(_objectSpread2(_objectSpread2({}, element), {}, {
            component: 'full',
            source: 'tmdb'
          }));
        },
        onMore: function onMore(params, close) {
          var query = decodeQuery(params && params.query).trim();
          var row = params && params.data ? params.data : {};
          var searchType = normalizeSearchType(row.search_type || row.type);
          close && close();
          if (!query || !searchType) return;
          if (searchType === 'list') {
            Lampa.Bell.push({
              text: t('trakt_source_search_lists_more_hint', 'Open lists directly from search results')
            });
            return;
          }
          Lampa.Activity.push({
            url: "search/".concat(searchType),
            title: "".concat(t('search', 'Search'), " - ").concat(query),
            component: 'category_full',
            page: 1,
            source: SOURCE_KEY,
            query: encodeURIComponent(query),
            search_type: searchType
          });
        },
        onCancel: function onCancel() {}
      };
    },
    clear: function clear() {}
  };
  function registerLazyLineLoader() {
    if (typeof Lampa === 'undefined' || !Lampa.Listener) return;
    function loadLine(e, isRetry) {
      if (e.line.destroyed) return;
      if (isRetry) {
        // Restore "Loading..." placeholder
        e.line.scroll.clear();
        if (e.line.items) {
          Lampa.Arrays.destroy(e.line.items);
          e.line.items = [];
        }
        var placeholderCard = {
          id: 'placeholder_' + Math.random().toString(36).substr(2, 9),
          title: Lampa.Lang.translate('loading') || 'Loading...',
          card_type: 'movie',
          type: 'movie',
          poster: '',
          image: '',
          release_date: '',
          params: {
            placeholder: true
          }
        };
        e.line.emit('createAndAppend', placeholderCard);
        if (e.line.items && e.line.items.length) {
          e.line.active = 0;
          e.line.last = e.line.items[0].render(true);
        }
        var isFocused = Lampa.Controller.own(e.line);
        if (isFocused) {
          Lampa.Controller.collectionSet(e.line.scroll.render(true));
          if (e.line.last) {
            Lampa.Controller.collectionFocus(e.line.last[0], e.line.scroll.render(true));
          }
        }
        Lampa.Layer.visible(e.line.scroll.render(true));
      }
      var definition = e.data.definition;
      var page = 1;
      var limit = 20;
      loadFeedLine(definition, page, limit).then(function (lineData) {
        if (e.line.destroyed) return;

        // Clear the placeholder
        e.line.scroll.clear();
        if (e.line.items) {
          Lampa.Arrays.destroy(e.line.items);
          e.line.items = [];
        }

        // Update raw results
        e.data.results = lineData.results;

        // Render new cards
        var viewSize = e.line.view || 7;
        e.data.results.slice(0, viewSize).forEach(function (card) {
          e.line.emit('createAndAppend', card);
        });
        if (e.line.items && e.line.items.length) {
          e.line.active = 0;
          e.line.last = e.line.items[0].render(true);
        }
        var isFocused = Lampa.Controller.own(e.line);
        if (isFocused) {
          Lampa.Controller.collectionSet(e.line.scroll.render(true));
          if (e.line.last) {
            Lampa.Controller.collectionFocus(e.line.last[0], e.line.scroll.render(true));
          }
        }

        // Trigger visible update in Layer
        Lampa.Layer.visible(e.line.scroll.render(true));
      })["catch"](function (err) {
        if (e.line.destroyed) return;
        e.line.loading_started = false;
        console.error('TraktTV', 'Lazy load failed:', {
          title: definition.title,
          path: definition.path,
          status: err && err.status,
          response: err && err.response,
          responseText: err && err.originalError && err.originalError.responseText,
          error: err
        });
        logWarn('Lazy line load failed', {
          title: definition.title,
          error: err
        }, {
          debugOnly: true
        });

        // Show Error card with retry on click
        e.line.scroll.clear();
        if (e.line.items) {
          Lampa.Arrays.destroy(e.line.items);
          e.line.items = [];
        }
        var errorCard = {
          id: 'error_' + Math.random().toString(36).substr(2, 9),
          title: Lampa.Lang.translate('title_error') || 'Помилка завантаження. Натисніть для повтору',
          card_type: 'movie',
          type: 'movie',
          poster: '',
          image: '',
          release_date: '',
          params: {
            emit: {
              onEnter: function onEnter() {
                if (e.line.loading_started) return;
                e.line.loading_started = true;
                loadLine(e, true);
              }
            }
          }
        };
        e.line.emit('createAndAppend', errorCard);
        if (e.line.items && e.line.items.length) {
          e.line.active = 0;
          e.line.last = e.line.items[0].render(true);
        }
        var isFocused = Lampa.Controller.own(e.line);
        if (isFocused) {
          Lampa.Controller.collectionSet(e.line.scroll.render(true));
          if (e.line.last) {
            Lampa.Controller.collectionFocus(e.line.last[0], e.line.scroll.render(true));
          }
        }
        Lampa.Layer.visible(e.line.scroll.render(true));
      });
    }
    Lampa.Listener.follow('line', function (e) {
      if (!e || !e.data || !e.data.lazy_load) return;
      if (e.type === 'visible' || e.type === 'toggle') {
        if (e.line.loading_started) return;
        e.line.loading_started = true;
        loadLine(e, false);
      } else if (e.type === 'destroy') {
        e.line.destroyed = true;
      }
    });
  }

  // Helper getter: prefer module api, fallback to global bridge
  function getGlobalApi() {
    try {
      if (typeof api$1 !== 'undefined' && api$1) return api$1;
    } catch (e) {/* noop */}
    try {
      if (typeof window !== 'undefined' && window.TraktTV && window.TraktTV.api) {
        return window.TraktTV.api;
      }
    } catch (e) {/* noop */}
    return null;
  }
  function registerSourceSelectorOption() {
    try {
      if (!Lampa || !Lampa.Params || typeof Lampa.Params.select !== 'function') return;
      var baseValues = Lampa.Params.values && _typeof(Lampa.Params.values.source) === 'object' ? Lampa.Params.values.source : {
        tmdb: 'TMDB',
        cub: 'CUB'
      };
      var sourceValues = _objectSpread2(_objectSpread2({}, baseValues), {}, {
        trakttv: 'TraktTV'
      });
      var paramsDefault = Lampa.Params.defaults && Lampa.Params.defaults.source ? Lampa.Params.defaults.source : 'tmdb';
      var defaultValue = sourceValues[paramsDefault] ? paramsDefault : sourceValues.tmdb ? 'tmdb' : Object.keys(sourceValues)[0];
      var storedSource = Lampa.Storage && typeof Lampa.Storage.field === 'function' ? Lampa.Storage.field('source') : '';
      var safeDefault = storedSource && sourceValues[storedSource] ? storedSource : defaultValue || 'tmdb';
      Lampa.Params.select('source', sourceValues, safeDefault);
    } catch (error) {
      logError('Source selector registration failed', error);
    }
  }
  function startPlugin() {
    window.plugin_trakt_ready = true;

    // Initialize Trakt client_id for direct Smart TV API calls
    // User-provided: created a dedicated key for the plugin
    setClientId('da2f995ec6a243546438f011272eb0a6f457048473527e4ee35b633100175f35');

    // Establish global bridge only after window is available
    try {
      if (typeof window !== 'undefined') {
        window.TraktTV = window.TraktTV || {};
        var current = typeof api$1 !== 'undefined' && api$1 ? api$1 : null;
        var existing = window.TraktTV.api || null;

        // Assign if not set or differs; keep existing if current is null
        if (!existing || existing !== current) {
          window.TraktTV.api = current || existing || null;
        }
        logDebug('API bridge ready', {
          hasModuleApi: !!current,
          hadExisting: !!existing,
          finalHas: !!window.TraktTV.api
        });
      }
    } catch (e) {/* noop */}

    // Додаємо стилі
    Lampa.Template.add('trakt_style', "<style>@charset 'UTF-8';.full-start-new__details.trakt{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;color:#fff}.trakt-brand-icon{width:100%;height:100%;display:block;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;color:inherit}.trakt-brand-icon path{fill:currentColor}.trakt-head-action.focus .trakt-brand-icon,.trakt-head-action.hover .trakt-brand-icon,.menu__item.focus .trakt-brand-icon,.menu__item.hover .trakt-brand-icon,.menu__item.traverse .trakt-brand-icon,.settings-folder.focus .trakt-brand-icon{color:inherit}.full-start-new__details.trakt .trakt-icon{margin-right:.5em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.full-start-new__details.trakt .full-start-new__split{margin:0 .5em}.trakt-applecation-progress{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;gap:.4em;margin-right:.6em;margin-left:.6em}.trakt-applecation-progress .trakt-icon{width:18px;height:18px;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.trakt-applecation-progress .trakt-icon svg{width:100%;height:100%}.trakt-applecation-progress__text{white-space:nowrap}.trakt-lists-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:1em;padding:1em}.trakt-list-card{width:150px;background:rgba(255,255,255,0.1);-webkit-border-radius:.5em;border-radius:.5em;padding:.5em;cursor:pointer;-webkit-transition:background .3s ease;-o-transition:background .3s ease;transition:background .3s ease}.trakt-list-card:hover{background:rgba(255,255,255,0.2)}.trakt-list-card__poster{width:100%;height:225px;background-size:cover;background-position:center;-webkit-border-radius:.5em;border-radius:.5em;margin-bottom:.5em}.trakt-list-card__title{font-size:.9em;text-align:center;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}.trakt-list-detail-header{padding:1em;background:rgba(0,0,0,0.3);margin-bottom:1em}.trakt-list-detail-title{font-size:1.5em;margin-bottom:.5em}.trakt-list-detail-description{font-size:1em;opacity:.8}.trakt-head-action{color:#ff4d4d}.trakt-head-action--ok{color:#37ff54}.trakt-head-action--error{color:#ff4d4d}.trakt-head-action svg{width:100%;height:100%;display:block}.trakt-head-icon{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.trakt-list-manager-button{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;gap:.5em}.trakt-list-manager-button svg{width:1.2em;height:1.2em}.trakt-watchlist-hub{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:100%}.trakt-watchlist-hub__controls{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;gap:.55em;padding:.8em 1.5em .2em}.trakt-watchlist-hub__tabs{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:.8em}.trakt-watchlist-hub__tabs .simple-button{margin-right:0;-webkit-box-flex:1;-webkit-flex:1 1 11em;-ms-flex:1 1 11em;flex:1 1 11em;min-width:9.5em;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:center}.trakt-watchlist-hub__tabs .simple-button--filter>div{width:100%;margin-left:0;padding:0;background:transparent;text-align:center;font-weight:700}.trakt-watchlist-hub__sorts{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:.55em}.trakt-watchlist__sort{margin-right:0;-webkit-box-flex:1;-webkit-flex:1 1 10em;-ms-flex:1 1 10em;flex:1 1 10em;min-width:7.6em;padding:.65em .85em;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;gap:.55em;-webkit-border-radius:.9em;border-radius:.9em}.trakt-watchlist__sort>div{margin-left:0}.trakt-watchlist__sort .trakt-watchlist__sort-label{min-width:0;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;font-weight:600;text-align:left}.trakt-watchlist__sort .trakt-watchlist__sort-state{-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;min-width:1em;font-size:1.05em;line-height:1;font-weight:700;text-align:center;opacity:.88}.trakt-watchlist__sort .trakt-watchlist__sort-state:empty{display:none}.trakt-watchlist__sort--active{background:rgba(255,255,255,0.14);-webkit-box-shadow:inset 0 0 0 1px rgba(255,255,255,0.16);box-shadow:inset 0 0 0 1px rgba(255,255,255,0.16)}.trakt-watchlist__sort--more{-webkit-flex-basis:8.4em;-ms-flex-preferred-size:8.4em;flex-basis:8.4em}.trakt-watchlist__sort--desc .trakt-watchlist__sort-state,.trakt-watchlist__sort--asc .trakt-watchlist__sort-state{opacity:1}.trakt-watchlist-hub__body{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-height:0}.trakt-watchlist__view.hide{display:none}.trakt-list-wide-card__meta{margin-top:.6em;font-size:1.1em;opacity:.8}.trakt-list-wide-card:not(.trakt-list-wide-card--create) .card__promo{display:none !important}.trakt-list-wide-card--create .card__view{background:-webkit-linear-gradient(315deg,rgba(23,129,255,0.28),rgba(53,255,145,0.22));background:-o-linear-gradient(315deg,rgba(23,129,255,0.28),rgba(53,255,145,0.22));background:linear-gradient(135deg,rgba(23,129,255,0.28),rgba(53,255,145,0.22));-webkit-border-radius:1em;border-radius:1em}.trakt-list-wide-card--create .card__view::before{content:'+';position:absolute;inset:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-size:6em;line-height:1;color:rgba(255,255,255,0.82);font-weight:500;z-index:0}.trakt-list-wide-card--create .card__img{opacity:0}.trakt-list-wide-card--create .card__promo{z-index:2}.trakt-list-wide-card--create .card__promo-title{font-weight:700}.trakt-userinfo-name{line-height:1.35;margin-bottom:.3em}.trakt-userinfo-vip{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;gap:.5em;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;line-height:1.35;margin-top:.1em}.trakt-userinfo-vip__label{opacity:.75}.trakt-vip-badge{display:inline-block;-webkit-border-radius:999px;border-radius:999px;padding:.2em .65em;font-size:.9em;line-height:1.25;border:1px solid transparent;vertical-align:middle}.trakt-vip-badge--enabled{color:#1be26f;border-color:rgba(27,226,111,0.45);background:rgba(27,226,111,0.14)}.trakt-vip-badge--disabled{color:#aeb5bc;border-color:rgba(174,181,188,0.45);background:rgba(174,181,188,0.12)}.trakt-device-auth{padding:.4em 1.2em 1.2em}.trakt-device-auth__inner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;gap:1.5em;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.trakt-device-auth__qr-col{-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;width:min(45%,14em)}.trakt-device-auth__info-col{-webkit-box-flex:1;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;gap:.6em;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;padding-top:.4em}.trakt-device-auth__qr-container{width:100%}.trakt-device-auth__qr-container--hidden{display:none}.trakt-device-auth__qr-link{display:block}.trakt-device-auth__qr-image{display:block;width:100%;height:auto;background:#fff;border:2px solid #e3e3e3;-webkit-border-radius:.8em;border-radius:.8em;padding:.35em;-webkit-box-sizing:border-box;box-sizing:border-box}.trakt-device-auth__qr-caption{margin-top:.6em;font-size:.95em;opacity:.72;text-align:center}.trakt-device-auth__verification{font-size:1.05em;line-height:1.5;word-break:break-word;opacity:.9}.trakt-device-auth__code{margin:0}.trakt-device-auth__code strong{letter-spacing:.08em}.trakt-check-btn{cursor:pointer;margin-top:.4em}@media screen and (max-width:480px){.trakt-device-auth{padding:0 .6em -webkit-calc(0.8em + env(safe-area-inset-bottom));padding:0 .6em calc(0.8em + env(safe-area-inset-bottom))}.trakt-device-auth__inner{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.trakt-device-auth__qr-col{width:min(100%,18.5em)}.trakt-device-auth__info-col{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:center}}</style>");
    $('body').append(Lampa.Template.get('trakt_style', {}, true));

    // Фонова валідація токена при старті (єдиний шлях auth lifecycle).
    if (Lampa.Storage.get('trakt_refresh_token')) {
      var _getGlobalApi;
      var authApi = (_getGlobalApi = getGlobalApi()) === null || _getGlobalApi === void 0 ? void 0 : _getGlobalApi.auth;
      if (authApi && typeof authApi.ensureValid === 'function') {
        authApi.ensureValid({
          reason: 'startup'
        })["catch"](function (error) {
          logError('Startup token validation failed', error, {
            debugOnly: true
          });
        });
      } else if (authApi && typeof authApi.refresh === 'function') {
        authApi.refresh({
          reason: 'startup-fallback'
        })["catch"](function (error) {
          logError('Startup token refresh fallback failed', error, {
            debugOnly: true
          });
        });
      } else if (debugEnabled()) {
        logDebug('Auth API unavailable for startup token validation', {
          authApi: !!authApi
        });
      }
    }

    // Рекомендації завантажуються динамічно при потребі
    // Добавляем компоненты
    Lampa.Component.add('trakt_watchlist', function (object) {
      return new Catalog.watchlist(object);
    });

    // Реєстрація source-провайдера TraktTV для Main/Category/List/Search discovery
    try {
      if (Lampa.Api) {
        Lampa.Api.sources = Lampa.Api.sources || {};
        if (!Lampa.Api.sources.trakttv) {
          Lampa.Api.sources.trakttv = TraktSourceProvider;
        }
        if (Lampa.Api.sources.trakttv) {
          registerSourceSelectorOption();
        }
      }
    } catch (error) {
      logError('Source provider registration failed', error);
    }
    Lampa.Component.add('trakt_upnext', function (object) {
      return new Catalog.upnext(object);
    });

    // Додаємо нові компоненти
    Lampa.Component.add('trakt_timetable_all', TraktTimetableAll);
    Lampa.Component.add('trakttv_recommendations', Catalog.recommendations);
    Lampa.Component.add('trakt_list_detail', Catalog.list_detail);
    Lampa.Component.add('trakt_my_list_detail', Catalog.my_list_detail);
    Lampa.Component.add('trakt_lists', Catalog.lists);
    Lampa.Component.add('trakt_my_lists', Catalog.my_lists);

    // Додаємо переклади
    Main();
    registerContextListAction();

    // Ініціалізуємо обробники подій
    events.init();
    // Ініціалізуємо модуль відстеження перегляду
    watching.init();

    // Initialize ContentRows (Lampa 3.0+ required)
    try {
      initContentRows();
    } catch (error) {
      logError('ContentRows initialization failed', error);
    }

    // Initialize lazy loading listener for content rows
    try {
      registerLazyLineLoader();
    } catch (error) {
      logError('Lazy line loader initialization failed', error);
    }
    if (window.appready) {
      initTraktHeadButton();
    } else if (Lampa.Listener) {
      Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') initTraktHeadButton();
      });
    }
  }
  function registerContextListAction() {
    if (typeof Lampa === 'undefined' || !Lampa.Manifest) return;
    var pluginName = Lampa.Lang.translate('trakt_manage_lists_title') || 'Trakt Lists';
    var exists = Array.isArray(Lampa.Manifest.plugins) && Lampa.Manifest.plugins.some(function (plugin) {
      return plugin && plugin.name === pluginName && plugin.component === 'trakt_context_lists';
    });
    if (exists) return;
    Lampa.Manifest.plugins = Array.isArray(Lampa.Manifest.plugins) ? Lampa.Manifest.plugins : [];
    Lampa.Manifest.plugins.push({
      type: 'video',
      version: '3.1.0',
      name: pluginName,
      component: 'trakt_context_lists',
      onContextMenu: function onContextMenu() {
        return {
          name: pluginName,
          description: ''
        };
      },
      onContextLauch: function onContextLauch(object) {
        setTimeout(function () {
          watchlist.openManagerByCard(object, {
            onBack: function onBack() {
              Lampa.Controller.toggle('content');
            }
          });
        }, 0);
      }
    });
  }
  function initTraktHeadButton() {
    if (typeof Lampa === 'undefined' || !Lampa.Head) return;
    if (window.trakt_head_button) return;
    var head = Lampa.Head.render ? Lampa.Head.render() : null;
    if (!head || !head.find) return;
    if (head.find('.trakt-head-action').length) return;
    var iconSvg = icons.TRAKT_ICON.replace('<svg ', '<svg style="width:100%; height:100%; display:block;" ');
    var button = Lampa.Head.addIcon("<span class=\"trakt-head-icon\">".concat(iconSvg, "</span>"), openTraktSettings);
    button.addClass('trakt-head-action');
    window.trakt_head_button = button;

    // Move before full--screen button in header
    var headEl = Lampa.Head.render ? Lampa.Head.render() : null;
    if (headEl && headEl.find) {
      var fs = headEl.find('.full--screen');
      if (fs.length) button.insertBefore(fs);
    }
    var scheduleUpdate = function scheduleUpdate() {
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (window.trakt_head_status_timer) clearTimeout(window.trakt_head_status_timer);
      window.trakt_head_status_timer = setTimeout(function () {
        updateTraktHeadStatus(button);
      }, delay);
    };
    scheduleUpdate(0);
    if (Lampa.Storage && Lampa.Storage.listener) {
      Lampa.Storage.listener.follow('change', function (e) {
        if (!e || !e.name) return;
        if (e.name === 'trakt_token' || e.name === 'trakt_refresh_token') {
          scheduleUpdate(300);
        }
      });
    }
  }
  function openTraktSettings() {
    if (typeof Lampa === 'undefined') return;
    var open = function open() {
      if (Lampa.Controller) Lampa.Controller.toggle('settings');
      var checkExist = setInterval(function () {
        var el = $('.settings').find('[data-component="trakt"]');
        if (el.length) {
          clearInterval(checkExist);
          setTimeout(function () {
            el.trigger('hover:enter');
          }, 100);
        }
      }, 50);
      setTimeout(function () {
        clearInterval(checkExist);
      }, 3000);
    };
    if (Lampa.ParentalControl && typeof Lampa.ParentalControl.personal === 'function') {
      Lampa.ParentalControl.personal('settings', open, false, true);
    } else {
      open();
    }
  }
  function updateTraktHeadStatus(button) {
    if (!button) return;
    var token = Lampa.Storage && Lampa.Storage.get ? Lampa.Storage.get('trakt_token') : null;
    if (!token) return setTraktHeadStatus(button, 'error');
    var Api = getGlobalApi();
    if (!Api || typeof Api.get !== 'function') return setTraktHeadStatus(button, 'error');
    Api.get('/users/me').then(function () {
      return setTraktHeadStatus(button, 'ok');
    })["catch"](function () {
      return setTraktHeadStatus(button, 'error');
    });
  }
  function setTraktHeadStatus(button, status) {
    button.removeClass('trakt-head-action--ok trakt-head-action--error');
    if (status === 'ok') button.addClass('trakt-head-action--ok');else button.addClass('trakt-head-action--error');
  }
  if (!window.plugin_trakt_ready) {
    startPlugin();
  }

})();


// tstracks.js
(function () {
    'use strict';

    var cache = {};
    var cacheTtlMs = 1000 * 60 * 10;
    var listOpened = false;
    var listProbeRequested = false;
    function log() {
    }
    function stopAutostart() {
      if (typeof Lampa !== 'undefined' && Lampa.Keypad && Lampa.Keypad.listener) {
        Lampa.Keypad.listener.send('keydown', {
          code: 0,
          enabled: false,
          event: {}
        });
      }
    }
    function stopAutostartSoon() {
      setTimeout(stopAutostart, 0);
    }
    function cacheGet(key) {
      var item = cache[key];
      if (!item) return null;
      if (Date.now() - item.ts > cacheTtlMs) {
        delete cache[key];
        return null;
      }
      return item.data;
    }
    function cacheSet(key, data) {
      cache[key] = {
        ts: Date.now(),
        data: data
      };
    }
    function getEmptyResult() {
      return {
        streams: [],
        format: {},
        chapters: []
      };
    }
    function storageGet(name, empty) {
      if (Lampa.Storage && typeof Lampa.Storage.get == 'function') {
        return Lampa.Storage.get(name, empty || '');
      }
      return empty || '';
    }
    function storageField(name) {
      if (Lampa.Storage && typeof Lampa.Storage.field == 'function') {
        return Lampa.Storage.field(name);
      }
      return storageGet(name);
    }
    function storageValue(name, empty) {
      if (Lampa.Storage && typeof Lampa.Storage.value == 'function') {
        return Lampa.Storage.value(name, empty || '');
      }
      return storageGet(name, empty || '');
    }
    function normalizeUrl(url) {
      if (!url) return '';
      var result = (url + '').trim();
      if (!result) return '';
      if (!/^https?:\/\//i.test(result)) result = 'http://' + result;
      return result.replace(/\/+$/, '');
    }
    function getTorrserverUrl() {
      var one = normalizeUrl(storageGet('torrserver_url', ''));
      var two = normalizeUrl(storageGet('torrserver_url_two', ''));
      var useLink = storageField('torrserver_use_link') || storageGet('torrserver_use_link', 'one') || 'one';
      return useLink == 'two' ? two || one : one || two;
    }
    function isTorrserverAuthEnabled() {
      var value = storageField('torrserver_auth');
      return value === true || value == 'true' || value == '1';
    }
    function encodeBase64(value) {
      try {
        return window.btoa(unescape(encodeURIComponent(value)));
      } catch (e) {
        try {
          return window.btoa(value);
        } catch (e2) {
          return '';
        }
      }
    }
    function getAuthHeader() {
      if (!isTorrserverAuthEnabled()) return '';
      var login = storageGet('torrserver_login', '') || '';
      var password = storageValue('torrserver_password', '') || '';
      var token = encodeBase64(login + ':' + password);
      return token ? 'Basic ' + token : '';
    }
    function getProbeIndex(params) {
      var value = parseInt(params && params.id, 10);
      return !isNaN(value) && value > 0 ? value : 1;
    }
    function getProbeUrl(params) {
      var torrserverUrl = getTorrserverUrl();
      var torrentHash = params && params.torrent_hash;
      if (!torrserverUrl || !torrentHash) return '';
      return torrserverUrl + '/ffp/' + torrentHash + '/' + getProbeIndex(params);
    }
    function reguest(params, callback) {
      if (!params || !params.torrent_hash) {
        if (params && params.ffprobe) {
          setTimeout(function () {
            callback({
              streams: params.ffprobe
            });
          }, 200);
        } else {
          callback(getEmptyResult());
        }
        return;
      }
      var probeUrl = getProbeUrl(params);
      if (!probeUrl) {
        callback(getEmptyResult());
        return;
      }
      var cacheKey = probeUrl;
      var cached = cacheGet(cacheKey);
      if (cached) {
        callback(cached);
        return;
      }
      var net = new Lampa.Reguest();
      net.timeout(1000 * 15);
      var head = {
        dataType: 'text'
      };
      var authHeader = getAuthHeader();
      if (authHeader) {
        head.headers = {
          Authorization: authHeader
        };
      }
      net["native"](probeUrl, function (str) {
        var json = {};
        try {
          json = JSON.parse(str);
        } catch (e) {}
        var meta = json && json.response && json.response.metadata ? json.response.metadata : json;
        if (meta && meta.streams) {
          var result = {
            streams: meta.streams,
            format: meta.format || {},
            chapters: meta.chapters || []
          };
          cacheSet(cacheKey, result);
          callback(result);
        } else {
          callback(getEmptyResult());
        }
      }, function (error) {
        log('Tracks', 'probe request fail', error && error.status ? error.status : error);
        callback(getEmptyResult());
      }, false, head);
    }
    function subscribeTracks(data) {
      var inited = false;
      var initedParse = false;
      var webosReplace = {};
      function getTracks() {
        var video = Lampa.PlayerVideo.video();
        return video.audioTracks || [];
      }
      function getSubs() {
        var video = Lampa.PlayerVideo.video();
        return video.textTracks || [];
      }
      function setTracks() {
        if (initedParse) {
          var newTracks = [];
          var videoTracks = getTracks();
          var parseTracks = initedParse.streams.filter(function (a) {
            return a.codec_type == 'audio';
          });
          var minus = 1;
          log('Tracks', 'set tracks:', videoTracks.length);
          if (parseTracks.length !== videoTracks.length) parseTracks = parseTracks.filter(function (a) {
            return a.codec_name !== 'dts';
          });
          parseTracks = parseTracks.filter(function (a) {
            return a.tags;
          });
          log('Tracks', 'filtred tracks:', parseTracks.length);
          parseTracks.forEach(function (track) {
            var orig = videoTracks[track.index - minus];
            var elem = {
              index: track.index - minus,
              language: track.tags.language,
              label: track.tags.title || track.tags.handler_name,
              ghost: orig ? false : true,
              selected: orig ? orig.selected == true || orig.enabled == true : false
            };
            Object.defineProperty(elem, "enabled", {
              set: function set(v) {
                if (v) {
                  var aud = getTracks();
                  var trk = aud[elem.index];
                  for (var i = 0; i < aud.length; i++) {
                    aud[i].enabled = false;
                    aud[i].selected = false;
                  }
                  if (trk) {
                    trk.enabled = true;
                    trk.selected = true;
                  }
                }
              },
              get: function get() {}
            });
            newTracks.push(elem);
          });
          if (parseTracks.length) Lampa.PlayerPanel.setTracks(newTracks);
        }
      }
      function setSubs() {
        if (initedParse) {
          var newSubs = [];
          var videoSubs = getSubs();
          var parseSubs = initedParse.streams.filter(function (a) {
            return a.codec_type == 'subtitle';
          });
          var minus = initedParse.streams.filter(function (a) {
            return a.codec_type == 'audio';
          }).length + 1;
          log('Tracks', 'set subs:', videoSubs.length);
          parseSubs = parseSubs.filter(function (a) {
            return a.tags;
          });
          log('Tracks', 'filtred subs:', parseSubs.length);
          parseSubs.forEach(function (track) {
            var orig = videoSubs[track.index - minus];
            var elem = {
              index: track.index - minus,
              language: track.tags.language,
              label: track.tags.title || track.tags.handler_name,
              ghost: videoSubs[track.index - minus] ? false : true,
              selected: orig ? orig.selected == true || orig.mode == 'showing' : false
            };
            Object.defineProperty(elem, "mode", {
              set: function set(v) {
                if (v) {
                  var txt = getSubs();
                  var sub = txt[elem.index];
                  for (var i = 0; i < txt.length; i++) {
                    txt[i].mode = 'disabled';
                    txt[i].selected = false;
                  }
                  if (sub) {
                    sub.mode = 'showing';
                    sub.selected = true;
                  }
                }
              },
              get: function get() {}
            });
            newSubs.push(elem);
          });
          if (parseSubs.length) Lampa.PlayerPanel.setSubs(newSubs);
        }
      }
      function listenTracks() {
        setTracks();
        Lampa.PlayerVideo.listener.remove('tracks', listenTracks);
      }
      function listenSubs() {
        setSubs();
        Lampa.PlayerVideo.listener.remove('subs', listenSubs);
      }
      function canPlay() {
        if (webosReplace.tracks) setWebosTracks(webosReplace.tracks);else setTracks();
        if (webosReplace.subs) setWebosSubs(webosReplace.subs);else setSubs();
        Lampa.PlayerVideo.listener.remove('canplay', canPlay);
      }
      function setWebosTracks(videoTracks) {
        if (initedParse) {
          var parseTracks = initedParse.streams.filter(function (a) {
            return a.codec_type == 'audio';
          });
          log('Tracks', 'webos set tracks:', videoTracks.length);
          if (parseTracks.length !== videoTracks.length) {
            parseTracks = parseTracks.filter(function (a) {
              return a.codec_name !== 'truehd';
            });
            if (parseTracks.length !== videoTracks.length) {
              parseTracks = parseTracks.filter(function (a) {
                return a.codec_name !== 'dts';
              });
            }
          }
          parseTracks = parseTracks.filter(function (a) {
            return a.tags;
          });
          parseTracks.forEach(function (track, i) {
            if (videoTracks[i]) {
              videoTracks[i].language = track.tags.language;
              videoTracks[i].label = track.tags.title || track.tags.handler_name;
            }
          });
        }
      }
      function setWebosSubs(videoSubs) {
        if (initedParse) {
          var parseSubs = initedParse.streams.filter(function (a) {
            return a.codec_type == 'subtitle';
          });
          log('Tracks', 'webos set subs:', videoSubs.length);
          if (parseSubs.length !== videoSubs.length - 1) parseSubs = parseSubs.filter(function (a) {
            return a.codec_name !== 'hdmv_pgs_subtitle';
          });
          parseSubs = parseSubs.filter(function (a) {
            return a.tags;
          });
          parseSubs.forEach(function (track, a) {
            var i = a + 1;
            if (videoSubs[i]) {
              videoSubs[i].language = track.tags.language;
              videoSubs[i].label = track.tags.title || track.tags.handler_name;
            }
          });
        }
      }
      function listenWebosSubs(_data) {
        webosReplace.subs = _data.subs;
        if (initedParse) setWebosSubs(_data.subs);
      }
      function listenWebosTracks(_data) {
        webosReplace.tracks = _data.tracks;
        if (initedParse) setWebosTracks(_data.tracks);
      }
      function listenStart() {
        inited = true;
        reguest(data, function (result) {
          initedParse = result;
          if (inited) {
            if (webosReplace.subs) setWebosSubs(webosReplace.subs);else setSubs();
            if (webosReplace.tracks) setWebosTracks(webosReplace.tracks);else setTracks();
          }
        });
      }
      function listenDestroy() {
        inited = false;
        Lampa.Player.listener.remove('destroy', listenDestroy);
        Lampa.PlayerVideo.listener.remove('tracks', listenTracks);
        Lampa.PlayerVideo.listener.remove('subs', listenSubs);
        Lampa.PlayerVideo.listener.remove('webos_subs', listenWebosSubs);
        Lampa.PlayerVideo.listener.remove('webos_tracks', listenWebosTracks);
        Lampa.PlayerVideo.listener.remove('canplay', canPlay);
      }
      Lampa.Player.listener.follow('destroy', listenDestroy);
      Lampa.PlayerVideo.listener.follow('tracks', listenTracks);
      Lampa.PlayerVideo.listener.follow('subs', listenSubs);
      Lampa.PlayerVideo.listener.follow('webos_subs', listenWebosSubs);
      Lampa.PlayerVideo.listener.follow('webos_tracks', listenWebosTracks);
      Lampa.PlayerVideo.listener.follow('canplay', canPlay);
      listenStart();
    }
    function parseMetainfo(data) {
      var loading = Lampa.Template.get('ts_tracks_probe_loading');
      var requestData = {};
      for (var key in data.element) requestData[key] = data.element[key];
      requestData.id = 1;
      data.item.after(loading);
      reguest(requestData, function (result) {
        if (listOpened) {
          var append = function append(name, fields) {
            if (fields.length) {
              var block = Lampa.Template.get('ts_tracks_probe_metainfo_block', {});
              block.find('.tracks-metainfo__label').text(Lampa.Lang.translate(name == 'video' ? 'extensions_hpu_video' : name == 'audio' ? 'player_tracks' : 'player_' + name));
              fields.forEach(function (data) {
                var item = $('<div class="tracks-metainfo__item tracks-metainfo__item--' + name + ' selector"></div>');
                item.on('hover:focus', function () {
                  Lampa.Modal.scroll().update(item);
                });
                for (var i in data) {
                  var div = $('<div class="tracks-metainfo__column--' + i + '"></div>');
                  div.text(data[i]);
                  item.append(div);
                }
                block.find('.tracks-metainfo__info').append(item);
              });
              html.append(block);
            }
          };
          var video = [];
          var audio = [];
          var subs = [];
          var codecVideo = result.streams.filter(function (a) {
            return a.codec_type == 'video';
          });
          var codecAudio = result.streams.filter(function (a) {
            return a.codec_type == 'audio';
          });
          var codecSubs = result.streams.filter(function (a) {
            return a.codec_type == 'subtitle';
          });
          codecVideo.slice(0, 1).forEach(function (v) {
            var line = {};
            if (v.width && v.height) line.video = v.width + 'x' + v.height;
            if (v.codec_name) line.codec = v.codec_name.toUpperCase();
            if (Boolean(v.is_avc)) line.avc = 'AVC';
            if (Lampa.Arrays.getKeys(line).length) video.push(line);
          });
          codecAudio.forEach(function (a, i) {
            var line = {
              num: i + 1
            };
            if (a.tags) {
              line.lang = (a.tags.language || '').toUpperCase();
            }
            line.name = a.tags ? a.tags.title || a.tags.handler_name : '';
            if (a.codec_name) line.codec = a.codec_name.toUpperCase();
            if (a.channel_layout) line.channels = a.channel_layout.replace('(side)', '').replace('stereo', '2.0');
            var bit = a.bit_rate ? a.bit_rate : a.tags && (a.tags.BPS || a.tags["BPS-eng"]) ? a.tags.BPS || a.tags["BPS-eng"] : '--';
            line.rate = bit == '--' ? bit : Math.round(bit / 1000) + ' ' + Lampa.Lang.translate('speed_kb');
            if (Lampa.Arrays.getKeys(line).length) audio.push(line);
          });
          codecSubs.forEach(function (a, i) {
            var line = {
              num: i + 1
            };
            if (a.tags) {
              line.lang = (a.tags.language || '').toUpperCase();
            }
            line.name = a.tags ? a.tags.title || a.tags.handler_name : '';
            if (Lampa.Arrays.getKeys(line).length) subs.push(line);
          });
          var html = Lampa.Template.get('ts_tracks_probe_metainfo', {});
          append('video', video);
          append('audio', audio);
          append('subs', subs);
          loading.remove();
          if (video.length || audio.length || subs.length) {
            data.item.after(html);
          }
          if (Lampa.Controller.enabled().name == 'modal') Lampa.Controller.toggle('modal');
        }
      });
    }
    function initTracks() {
      Lampa.Player.listener.follow('start', function (data) {
        if (data.torrent_hash) subscribeTracks(data);
      });
      Lampa.Listener.follow('torrent_file', function (data) {
        if (data.type == 'list_open') {
          listOpened = true;
          listProbeRequested = false;
        }
        if (data.type == 'list_close') {
          listOpened = false;
          listProbeRequested = false;
        }
        if (data.type == 'render' && data.items.length == 1 && listOpened) {
          stopAutostartSoon();
          parseMetainfo(data);
        }
        if (data.type == 'render' && listOpened && data.items.length > 1 && !listProbeRequested) {
          if (data.items[data.items.length - 1] === data.element) {
            listProbeRequested = true;
            parseMetainfo(data);
          }
        }
      });
    }

    function addTemplates() {
      Lampa.Template.add('ts_tracks_probe_loading', "\n        <div class=\"tracks-loading\">\n            <span>#{loading}...</span>\n        </div>\n    ");
      Lampa.Template.add('ts_tracks_probe_metainfo', "\n        <div class=\"tracks-metainfo\"></div>\n    ");
      Lampa.Template.add('ts_tracks_probe_metainfo_block', "\n        <div class=\"tracks-metainfo__line\">\n            <div class=\"tracks-metainfo__label\"></div>\n            <div class=\"tracks-metainfo__info\"></div>\n        </div>\n    ");
      Lampa.Template.add('ts_tracks_probe_css', "\n        <style>\n        .tracks-loading{margin-top:1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.tracks-loading:before{content:'';display:inline-block;width:1.3em;height:1.3em;background:url('./img/loader.svg') no-repeat 50% 50%;background-size:contain;margin-right:.4em}.tracks-loading>span{font-size:1.1em;line-height:1.1}.tracks-metainfo{margin-top:1em}.tracks-metainfo__line+.tracks-metainfo__line{margin-top:2em}.tracks-metainfo__label{opacity:.5;font-weight:600}.tracks-metainfo__info{padding-top:1em;line-height:1.2}.tracks-metainfo__info>div{background-color:rgba(0,0,0,0.22);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-border-radius:.3em;border-radius:.3em;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.tracks-metainfo__info>div.focus{background-color:rgba(255,255,255,0.06)}.tracks-metainfo__info>div>div{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.tracks-metainfo__info>div>div:not(:last-child){padding-right:1.5em}.tracks-metainfo__info>div+div{margin-top:1em}.tracks-metainfo__column--video,.tracks-metainfo__column--name{margin-right:auto}.tracks-metainfo__column--num{min-width:3em;padding-right:0}.tracks-metainfo__column--rate{min-width:7em;text-align:right}.tracks-metainfo__column--channels{min-width:5em;text-align:right}\n        </style>\n    ");
      $('body').append(Lampa.Template.get('ts_tracks_probe_css', {}, true));
    }

    var manifest = {
      type: "other",
      version: "1.0.0",
      name: "TS Tracks Probe",
      description: "Audio/subtitle track parsing via TorrServer ffprobe API",
      component: "tracks"
    };
    function add() {
      Lampa.Manifest.plugins = manifest;
      addTemplates();
      initTracks();
    }
    function startPlugin() {
      window.plugin_ts_tracks_probe_ready = true;
      if (window.appready) add();else {
        Lampa.Listener.follow("app", function (e) {
          if (e.type === "ready") add();
        });
      }
    }
    if (!window.plugin_ts_tracks_probe_ready) startPlugin();

})();

// last-watched-resume.js
(function () {
    'use strict';

    if (window.__vahagnLastWatchedResumeLoaded) return;
    window.__vahagnLastWatchedResumeLoaded = true;

    // ========================================================================
    // Constants
    // ========================================================================

    var LOG_PREFIX           = '[LastWatchedResume]';
    var NS                   = 'last_watched_resume_';
    var QUEUE_KEY            = NS + 'queue';
    var ENABLED_KEY          = NS + 'enabled';
    var CLEAR_KEY            = NS + 'clear';
    var ROW_NAME             = 'last_watched_resume';
    var MAX_QUEUE            = 5;
    var AUTOCLICK_TIMEOUT_MS = 6000;
    var MIN_APP_DIGITAL      = 300;
    var REORDER_CLASS        = 'lwr-reorder-active';
    var DELETE_UNDO_MS       = 4000;

    var _initialized        = false;
    var _captureBound       = false;
    var _stylesInjected     = false;
    var _activeAutoclick    = null; // current OnlineAutoclick / TorrentAutoclick

    // Pending playback context — fed by activity / torrent_file / Torrent.open
    // observers, drained by state:changed timeline updates. Cap at 8 entries
    // and 5-minute TTL — covers user picking a card, browsing, then playing.
    var _pendingContext     = [];
    var PENDING_CAP         = 8;
    var PENDING_TTL_MS      = 5 * 60 * 1000;

    // Dedup short-circuit: if Player.listener('start') already wrote an entry
    // for a given (card_id, season, episode) within this window, skip the
    // Timeline-based fallback for the same payload — both signals can fire
    // for the same playback.
    var _recentRecord       = { key: '', ts: 0 };
    var DEDUP_WINDOW_MS     = 30000;

    // ========================================================================
    // Logging helpers — single prefix, sub-event in first message word
    // ========================================================================

    function log() {
        try {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(LOG_PREFIX);
            console.log.apply(console, args);
        } catch (e) {}
    }
    function warn() {
        try {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(LOG_PREFIX);
            console.warn.apply(console, args);
        } catch (e) {}
    }
    function err() {
        try {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(LOG_PREFIX);
            console.error.apply(console, args);
        } catch (e) {}
    }

    // ========================================================================
    // Profile-scoped storage
    // ========================================================================

    var Store = {
        profileId: function () {
            try {
                if (window.Lampa && Lampa.Account && Lampa.Account.Permit && Lampa.Account.Permit.sync &&
                    Lampa.Account.Permit.account && Lampa.Account.Permit.account.profile) {
                    return Lampa.Account.Permit.account.profile.id;
                }
            } catch (e) {}
            return null;
        },
        scope: function (key) {
            var pid = Store.profileId();
            return pid ? (key + '_' + pid) : (key + '_local');
        },
        getQueue: function () {
            try {
                var raw = Lampa.Storage.get(Store.scope(QUEUE_KEY), '[]');
                if (raw && typeof raw === 'object' && raw.length === undefined) {
                    // Lampa returned an object (shouldn't happen for [] default but be safe)
                    return [];
                }
                if (typeof raw === 'string') {
                    try { raw = JSON.parse(raw); } catch (e) { raw = []; }
                }
                if (!raw || raw.length === undefined) return [];
                return raw;
            } catch (e) { return []; }
        },
        setQueue: function (arr) {
            try { Lampa.Storage.set(Store.scope(QUEUE_KEY), arr || []); }
            catch (e) { err('storage:write fail', e && e.message); }
        },
        clearQueue: function () {
            Store.setQueue([]);
        },
        upsert: function (entry) {
            var queue = Store.getQueue();
            var existingIdx = -1;
            var i;
            for (i = 0; i < queue.length; i++) {
                if (queue[i] && queue[i].card_id === entry.card_id) { existingIdx = i; break; }
            }
            var action = existingIdx >= 0 ? 'update' : 'insert';
            if (existingIdx >= 0) queue.splice(existingIdx, 1);
            queue.unshift(entry);
            var evicted = null;
            if (queue.length > MAX_QUEUE) {
                evicted = queue[queue.length - 1];
                queue = queue.slice(0, MAX_QUEUE);
            }
            Store.setQueue(queue);
            log('queue:write', 'action=' + action,
                'card_id=' + entry.card_id,
                'S' + (entry.season || '-') + 'E' + (entry.episode || '-'),
                'kind=' + entry.source.kind,
                'queue.length=' + queue.length);
            if (evicted) {
                log('queue:evict', 'card_id=' + evicted.card_id, 'reason=cap');
            }
        }
    };

    // ========================================================================
    // Recording pipeline
    // ========================================================================

    function eligibleReason(data) {
        if (!data) return 'no_data';
        if (data.iptv === true) return 'iptv';
        if (data.trailer === true) return 'trailer';
        if (!data.card) return 'no_card';
        if (!data.timeline) return 'no_timeline';
        return null;
    }

    function detectSource(data) {
        if (data.torrent_hash) {
            // Magnet — captured by patchTorrentStart into pending context
            // before TorrServer ever saw the hash. Pull it back so we can
            // re-add the torrent later if TorrServer purged it.
            var magnet = '';
            if (data.card && data.card.id != null) {
                var ctx = pendingContextForCard(data.card.id, 'torrent');
                if (ctx && ctx.magnet) magnet = ctx.magnet;
                if (!magnet) {
                    var saved = readPendingSource(data.card.id);
                    if (saved && saved.magnet) magnet = saved.magnet;
                }
            }
            return {
                kind:         'torrent',
                torrent_hash: data.torrent_hash,
                file_path:    extractFilePath(data),
                magnet:       magnet
            };
        }
        var balanser = '';
        try { balanser = Lampa.Storage.get('online_balanser', '') || ''; } catch (e) {}
        if (balanser) {
            return { kind: 'online', balanser: balanser };
        }
        return { kind: 'other' };
    }

    function pendingContextForCard(card_id, kind) {
        pruneContext();
        var i;
        for (i = 0; i < _pendingContext.length; i++) {
            var p = _pendingContext[i];
            if (p.card.id === card_id && p.kind === kind) return p;
        }
        return null;
    }

    function extractFilePath(data) {
        if (data.path && typeof data.path === 'string') return data.path;
        if (data.url && typeof data.url === 'string') {
            var m = data.url.match(/[?&]path=([^&]+)/);
            if (m) {
                try { return decodeURIComponent(m[1]); } catch (e) { return m[1]; }
            }
        }
        return '';
    }

    function onPlayerStart(data, evt) {
        // Lampa's torrent flow calls Player.play(element) where `element`
        // is the FILE descriptor (path, url, season, episode, torrent_hash,
        // timeline) and does NOT carry a `card` field — Lampa pulls the
        // card from Lampa.Activity.active().movie internally for its own
        // footer rendering (vendor/lampa-source/src/interaction/player.js
        // l. 962-966). We need to mirror that fallback or eligibleReason
        // returns 'no_card' for every torrent play, leaving the queue
        // entry without a magnet and forcing the user back through the
        // fallback path on the next click — the exact symptom of "after
        // watching, next click still redirects to torrent search".
        if (data && !data.card) {
            try {
                var act = Lampa.Activity && Lampa.Activity.active && Lampa.Activity.active();
                if (act && act.movie && act.movie.id != null) data.card = act.movie;
            } catch (e) {}
        }
        var reason = eligibleReason(data);
        if (reason) {
            log('player:start', 'evt=' + evt, 'skip', 'reason=' + reason);
            return;
        }
        var source = detectSource(data);
        var entry = {
            card_id:  data.card.id,
            season:   data.season   || (data.card && data.card.season)  || null,
            episode:  data.episode  || (data.card && data.card.episode) || null,
            source:   source,
            saved_at: Date.now()
        };
        log('player:start',
            'evt=' + evt,
            'card_id=' + entry.card_id,
            'S' + (entry.season || '-') + 'E' + (entry.episode || '-'),
            'kind=' + source.kind,
            (source.kind === 'online'  ? 'balanser=' + source.balanser :
             source.kind === 'torrent' ? 'hash=' + (source.torrent_hash || '').slice(0, 8) + ' path=' + (source.file_path || '<none>') :
             'other'));
        markRecorded(entry);
        Store.upsert(entry);
    }

    function markRecorded(entry) {
        _recentRecord = {
            key: entry.card_id + ':' + (entry.season || '-') + ':' + (entry.episode || '-'),
            ts:  Date.now()
        };
    }

    function recentlyRecorded(card_id, season, episode) {
        if (!_recentRecord.key) return false;
        if (Date.now() - _recentRecord.ts > DEDUP_WINDOW_MS) return false;
        var k = card_id + ':' + (season || '-') + ':' + (episode || '-');
        return k === _recentRecord.key;
    }

    // ========================================================================
    // Pending context — fed by activity navigations and Torrent.open patch
    // ========================================================================

    function pruneContext() {
        var cutoff = Date.now() - PENDING_TTL_MS;
        var i;
        var kept = [];
        for (i = 0; i < _pendingContext.length; i++) {
            if (_pendingContext[i].ts >= cutoff) kept.push(_pendingContext[i]);
        }
        _pendingContext = kept.slice(0, PENDING_CAP);
    }

    function rememberContext(card, kind, extra) {
        if (!card || card.id == null) return;
        pruneContext();
        // Drop existing context for the same card_id + kind so the most
        // recent observation always wins (e.g. user re-opens the same card).
        var filtered = [];
        var i;
        for (i = 0; i < _pendingContext.length; i++) {
            var p = _pendingContext[i];
            if (!(p.card.id === card.id && p.kind === kind)) filtered.push(p);
        }
        var ctx = {
            card:         card,
            kind:         kind,
            balanser:     extra && extra.balanser     ? extra.balanser     : null,
            torrent_hash: extra && extra.torrent_hash ? extra.torrent_hash : null,
            file_path:    extra && extra.file_path    ? extra.file_path    : null,
            magnet:       extra && extra.magnet       ? extra.magnet       : null,
            ts:           Date.now()
        };
        // If we already had context with a magnet for this card and the new
        // observation doesn't include one, preserve the magnet — Lampa fires
        // multiple events for one playback (Torrent.start → Torrent.open →
        // torrent_file) and only the first carries MagnetUri.
        if (!ctx.magnet) {
            var prior;
            for (i = 0; i < _pendingContext.length; i++) {
                prior = _pendingContext[i];
                if (prior.card.id === card.id && prior.magnet) {
                    ctx.magnet = prior.magnet;
                    break;
                }
            }
        }
        filtered.unshift(ctx);
        _pendingContext = filtered.slice(0, PENDING_CAP);
        log('context:remember',
            'card_id=' + card.id,
            'kind=' + kind,
            (ctx.balanser     ? 'balanser=' + ctx.balanser : ''),
            (ctx.torrent_hash ? 'hash=' + ctx.torrent_hash.slice(0, 8) : ''),
            (ctx.magnet       ? 'magnet=present' : ''),
            'pending=' + _pendingContext.length);
    }

    function findContextForHash(hash) {
        pruneContext();
        var i;
        for (i = 0; i < _pendingContext.length; i++) {
            var p = _pendingContext[i];
            var hashes = computeCardHashes(p.card);
            if (hashes.indexOf(String(hash)) !== -1) return p;
        }
        return null;
    }

    // Compute the full set of (movie OR season+episode) hashes Lampa might
    // produce for a given card — see `vendor/lampa-source/plugins/online/online.js:253`
    // and `Lampa.Timeline.view` semantics. Series cards expose `seasons` with
    // `episode_count` per season; movies use just original_title.
    function computeCardHashes(card) {
        var out = [];
        if (!card) return out;
        var origTitle = card.original_title || card.original_name || '';
        try { out.push(String(Lampa.Utils.hash(origTitle))); } catch (e) {}
        // Series — try every season/episode combination from card.seasons
        var seasons = card.seasons;
        if (seasons && seasons.length) {
            var s, e, season, epCount, sep, h;
            for (s = 0; s < seasons.length; s++) {
                season = seasons[s].season_number;
                if (season == null || season === 0) continue; // 0 = Specials
                epCount = seasons[s].episode_count || 30;
                sep = season > 10 ? ':' : '';
                for (e = 1; e <= epCount; e++) {
                    try { h = Lampa.Utils.hash(season + sep + e + origTitle); }
                    catch (ex) { continue; }
                    out.push(String(h));
                }
            }
        }
        return out;
    }

    // Given a card and a confirmed hash that matched, figure out which season
    // and episode produced it. Returns {season, episode} or {season:null, episode:null}
    // for movies / unknown.
    function reverseSeasonEpisode(card, hash) {
        if (!card) return { season: null, episode: null };
        var origTitle = card.original_title || card.original_name || '';
        var seasons = card.seasons;
        if (!seasons || !seasons.length) return { season: null, episode: null };
        var s, e, season, epCount, sep, h;
        var target = String(hash);
        for (s = 0; s < seasons.length; s++) {
            season = seasons[s].season_number;
            if (season == null || season === 0) continue;
            epCount = seasons[s].episode_count || 30;
            sep = season > 10 ? ':' : '';
            for (e = 1; e <= epCount; e++) {
                try { h = Lampa.Utils.hash(season + sep + e + origTitle); }
                catch (ex) { continue; }
                if (String(h) === target) return { season: season, episode: e };
            }
        }
        return { season: null, episode: null };
    }

    function onActivity(e) {
        try {
            // When the user lands back on the main screen, queue may have
            // been mutated mid-session (post-watch) but the row DOM still
            // shows the boot snapshot. Run a row-sync as a safety net for
            // the case where Player.listener('destroy') didn't reach us
            // (verified empirically on Tizen — native player can swallow
            // the event when handing focus back).
            var compTop = (e && typeof e.component === 'string') ? e.component
                       : (e && e.object && typeof e.object.component === 'string') ? e.object.component
                       : '';
            if (compTop === 'main') scheduleRowSync('activity_main');
        } catch (ex) {}
        try {
            // Lampa fires activity events as {component, type, object} —
            // component is a string (top-level), object is the activity
            // descriptor with movie/card/url/etc. (Earlier we tried
            // `e.object.activity.component`, but `activity` on the
            // descriptor is a method, not a nested object — its `.component`
            // resolved to undefined and the whole handler short-circuited.)
            if (!e || !e.object) return;
            var comp = (typeof e.component === 'string') ? e.component
                     : (typeof e.object.component === 'string') ? e.object.component
                     : '?';
            var card = e.object.movie || e.object.card;
            if (!card || card.id == null) return;

            if (comp === 'online') {
                // Lampa stores last balanser under 'online_last_balanser';
                // older builds use 'online_balanser'. Try both.
                var bal = '';
                try { bal = Lampa.Storage.get('online_last_balanser', '') || ''; } catch (ex) {}
                if (!bal) {
                    try { bal = Lampa.Storage.get('online_balanser', '') || ''; } catch (ex) {}
                }
                rememberContext(card, 'online', { balanser: bal });
                persistPendingSource(card.id, { kind: 'online', balanser: bal });
            } else if (comp === 'torrents') {
                // Card opened the torrent search list — remember as torrent
                // candidate; we'll narrow torrent_hash + file_path later via
                // Torrent.open patch + torrent_file listener.
                rememberContext(card, 'torrent', {});
                persistPendingSource(card.id, { kind: 'torrent' });
            }
        } catch (ex) { warn('activity', 'fail', ex && ex.message); }
    }

    // ------------------------------------------------------------------------
    // Pending-source side table — survives JS freeze during native playback.
    //
    // Tizen / WebOS / Android native players background the WebView during
    // playback; log-collector buffer is lost on next reload. But Lampa.Storage
    // writes are synchronous and persistent — so we mirror "user navigated to
    // online/torrent for card X" into Storage immediately. On next boot the
    // reconcile step reads file_view_<profile>, finds new timeline entries,
    // looks up pending source by card_id, and adds queue entries for plays
    // we never saw events for.
    // ------------------------------------------------------------------------

    var PENDING_SRC_KEY = NS + 'pending_src';
    var PENDING_SRC_CAP = 30; // remember source for up to 30 recent cards

    function pendingSrcMap() {
        try {
            var raw = Lampa.Storage.get(Store.scope(PENDING_SRC_KEY), '{}');
            if (typeof raw === 'string') {
                try { raw = JSON.parse(raw); } catch (e) { raw = {}; }
            }
            return (raw && typeof raw === 'object') ? raw : {};
        } catch (e) { return {}; }
    }

    function persistPendingSource(card_id, source) {
        try {
            if (card_id == null) return;
            var map = pendingSrcMap();
            map[card_id] = { kind: source.kind, balanser: source.balanser || null,
                             torrent_hash: source.torrent_hash || null,
                             file_path: source.file_path || null,
                             magnet: source.magnet || null,
                             ts: Date.now() };
            // Cap by trimming oldest entries when over capacity.
            var keys = Object.keys(map);
            if (keys.length > PENDING_SRC_CAP) {
                keys.sort(function (a, b) { return (map[a].ts || 0) - (map[b].ts || 0); });
                var drop = keys.length - PENDING_SRC_CAP;
                var i;
                for (i = 0; i < drop; i++) delete map[keys[i]];
            }
            Lampa.Storage.set(Store.scope(PENDING_SRC_KEY), map);
        } catch (e) { warn('pending_src', 'persist fail', e && e.message); }
    }

    function readPendingSource(card_id) {
        var map = pendingSrcMap();
        return map[card_id] || null;
    }

    // Monkey-patch Lampa.Torrent.start(element, movie) — primary path through
    // which Lampa launches a torrent from the search-results screen. The
    // `element` here carries `MagnetUri` / `Link` BEFORE TorrServer ever sees
    // a hash. Capturing the magnet now means our queue entry can re-add the
    // torrent to TorrServer on resume, even if it was purged in between.
    var _origTorrentStart = null;
    function patchTorrentStart() {
        try {
            if (!Lampa.Torrent || typeof Lampa.Torrent.start !== 'function') return;
            if (Lampa.Torrent.start.__lwr_patched) return;
            _origTorrentStart = Lampa.Torrent.start;
            Lampa.Torrent.start = function (element, movie) {
                try {
                    if (movie && movie.id != null && element) {
                        var magnet = element.MagnetUri || element.Link || '';
                        if (magnet) {
                            rememberContext(movie, 'torrent', { magnet: magnet });
                            persistPendingSource(movie.id, { kind: 'torrent', magnet: magnet });
                        }
                    }
                } catch (ex) {}
                return _origTorrentStart.apply(this, arguments);
            };
            Lampa.Torrent.start.__lwr_patched = true;
        } catch (ex) { warn('patch', 'Torrent.start fail', ex && ex.message); }
    }

    // Monkey-patch Lampa.Torrent.open(hash, card) to capture torrent context
    // BEFORE the file picker even renders. Restore the original on next init
    // (idempotent — guard prevents double-wrap).
    var _origTorrentOpen = null;
    function patchTorrentOpen() {
        try {
            if (!Lampa.Torrent || typeof Lampa.Torrent.open !== 'function') return;
            if (Lampa.Torrent.open.__lwr_patched) return;
            _origTorrentOpen = Lampa.Torrent.open;
            Lampa.Torrent.open = function (hash, card) {
                try {
                    if (card && card.id != null) {
                        rememberContext(card, 'torrent', { torrent_hash: hash });
                        persistPendingSource(card.id, { kind: 'torrent', torrent_hash: hash });
                    }
                } catch (ex) {}
                return _origTorrentOpen.apply(this, arguments);
            };
            Lampa.Torrent.open.__lwr_patched = true;
        } catch (ex) { warn('patch', 'Torrent.open fail', ex && ex.message); }
    }

    // Wrap Lampa.Player.play. On Tizen / WebOS / Android, Player.listener's
    // 'start' / 'external' events do not always reach plugin-side subscribers
    // (verified empirically on Tizen 9). Calling the recorder from inside the
    // wrapped Player.play guarantees we never miss a play that the dispatcher
    // actually reached, regardless of which event later fires.
    var _origPlayerPlay = null;
    function patchPlayerPlay() {
        try {
            if (!Lampa.Player || typeof Lampa.Player.play !== 'function') return;
            if (Lampa.Player.play.__lwr_patched) return;
            _origPlayerPlay = Lampa.Player.play;
            Lampa.Player.play = function (data) {
                try {
                    // Don't gate on data.card here — Lampa's torrent flow
                    // omits it (it's pulled from Activity.active().movie
                    // internally). onPlayerStart's own fallback resolves
                    // the card; gating up-front would short-circuit it.
                    if (data && !data.iptv && !data.trailer) {
                        onPlayerStart(data, 'patch-play');
                    }
                } catch (ex) {}
                return _origPlayerPlay.apply(this, arguments);
            };
            Lampa.Player.play.__lwr_patched = true;
        } catch (ex) { warn('patch', 'Player.play fail', ex && ex.message); }
    }

    // Capture the file path from the torrent picker — this fires when the
    // user actually selects a file, before playback begins. Updates the
    // most recent torrent context with the chosen path.
    function onTorrentFile(e) {
        try {
            if (!e || e.type !== 'onenter') return;
            if (!e.element || !e.element.path) return;
            // Patch the most recent torrent-kind context's file_path.
            var i;
            for (i = 0; i < _pendingContext.length; i++) {
                if (_pendingContext[i].kind === 'torrent') {
                    _pendingContext[i].file_path = e.element.path;
                    if (e.element.torrent_hash && !_pendingContext[i].torrent_hash) {
                        _pendingContext[i].torrent_hash = e.element.torrent_hash;
                    }
                    log('context:torrent_file',
                        'card_id=' + _pendingContext[i].card.id,
                        'path=' + e.element.path);
                    // Mirror to persistent side-table — reconcile on next
                    // boot needs this even if JS freezes during playback.
                    persistPendingSource(_pendingContext[i].card.id, {
                        kind:         'torrent',
                        torrent_hash: _pendingContext[i].torrent_hash || (e.element.torrent_hash || null),
                        file_path:    e.element.path
                    });
                    break;
                }
            }
        } catch (ex) { warn('torrent_file', 'fail', ex && ex.message); }
    }

    // ========================================================================
    // Reconcile-on-boot — recover from JS-frozen playback sessions
    // ========================================================================
    //
    // When Tizen native player takes over the WebView, log-collector buffer
    // and even my Player.play monkey-patch may not run. But Lampa.Timeline
    // writes synchronously to file_view_<profile_id> in localStorage during
    // playback (and especially on its destroy). On next Lampa boot, this
    // storage holds the truth about what was watched.
    //
    // Strategy:
    //   1. Read file_view_<profile> from Storage.
    //   2. For each hash with road.percent > 0:
    //      - if it's a hash we've already represented in our queue, skip
    //      - else reverse-lookup card from Lampa.Favorite('history')
    //      - if matched: read source from PENDING_SRC_KEY map (saved by
    //        activity / Torrent.open patches before playback)
    //      - upsert queue entry (idempotent — Store.upsert dedupes by card_id)
    //
    // This catches:
    //   - Tizen torrent playback that bypassed all in-flight hooks.
    //   - Restored sessions where JS event loop was throttled.
    //   - Quirky online plugins that don't fire activity events.

    function reconcileFromTimeline() {
        try {
            var pid = Store.profileId();
            var fileViewKey = 'file_view' + (pid ? '_' + pid : '');
            var raw;
            try { raw = Lampa.Storage.get(fileViewKey, '{}'); }
            catch (e) { warn('reconcile', 'storage.get fail', e && e.message); return; }
            if (typeof raw === 'string') {
                try { raw = JSON.parse(raw); } catch (e) { raw = {}; }
            }
            if (!raw || typeof raw !== 'object') return;

            var hashCount = 0;
            var k; for (k in raw) { if (Object.prototype.hasOwnProperty.call(raw, k)) hashCount++; }
            log('reconcile:start', 'fileViewKey=' + fileViewKey, 'hashes=' + hashCount);
            if (!hashCount) { log('reconcile:done', 'no_hashes'); return; }

            // Build set of hashes already covered by our queue (to skip).
            var covered = {};
            var queue = Store.getQueue();
            var i;
            for (i = 0; i < queue.length; i++) {
                var entry = queue[i];
                if (!entry || entry.card_id == null) continue;
                // Look up card from history to compute its hashes
                var cardForCovered = lookupCardFromHistory(entry.card_id);
                if (!cardForCovered) continue;
                var hs = computeCardHashes(cardForCovered);
                var j; for (j = 0; j < hs.length; j++) covered[hs[j]] = true;
            }

            // Build hash → card index from history
            var hist = Lampa.Favorite && Lampa.Favorite.get ? (Lampa.Favorite.get('history') || []) : [];
            log('reconcile:scan', 'history=' + hist.length, 'covered=' + Object.keys(covered).length);
            var hashToCard = {};
            for (i = 0; i < hist.length; i++) {
                var c = hist[i];
                if (!c || c.id == null) continue;
                var cardHashes = computeCardHashes(c);
                var hi;
                for (hi = 0; hi < cardHashes.length; hi++) {
                    if (!hashToCard[cardHashes[hi]]) hashToCard[cardHashes[hi]] = c;
                }
            }

            // Walk timeline entries and reconstruct queue items
            var added = 0;
            var unmatched = 0;
            var hashes = Object.keys(raw);
            // Sort hashes by some heuristic? They have no timestamp. Just
            // process in insertion order and rely on dedup.
            for (i = 0; i < hashes.length; i++) {
                var h = String(hashes[i]);
                var road = raw[h];
                if (!road) continue;
                var percent = (typeof road === 'object') ? road.percent : road;
                if (!percent || percent <= 0) continue;
                if (covered[h]) continue;
                var card = hashToCard[h];
                if (!card) { unmatched++; continue; }
                var se = reverseSeasonEpisode(card, h);
                var srcInfo = readPendingSource(card.id);
                var source;
                if (srcInfo && srcInfo.kind === 'torrent') {
                    source = {
                        kind:         'torrent',
                        torrent_hash: srcInfo.torrent_hash || '',
                        file_path:    srcInfo.file_path    || '',
                        magnet:       srcInfo.magnet       || ''
                    };
                } else if (srcInfo && srcInfo.kind === 'online') {
                    source = { kind: 'online', balanser: srcInfo.balanser || '' };
                } else {
                    source = { kind: 'unknown' };
                }
                Store.upsert({
                    card_id:  card.id,
                    season:   se.season,
                    episode:  se.episode,
                    source:   source,
                    saved_at: Date.now()
                });
                added++;
                log('reconcile:added',
                    'card_id=' + card.id,
                    'S' + (se.season || '-') + 'E' + (se.episode || '-'),
                    'kind=' + source.kind,
                    'hash=' + h);
            }
            log('reconcile:done', 'added=' + added, 'unmatched=' + unmatched);
        } catch (ex) { err('reconcile', 'fail', ex && ex.message); }
    }

    function lookupCardFromHistory(card_id) {
        var idx = historyMap();
        return idx[card_id] || null;
    }

    // Coalesce reconcile triggers — favorite events can fire several times
    // per second during cloud sync; we want at most one reconcile per 500ms.
    var _reconcileTimer = null;
    function scheduleReconcile(reason) {
        if (_reconcileTimer) return;
        _reconcileTimer = setTimeout(function () {
            _reconcileTimer = null;
            log('reconcile:trigger', 'reason=' + reason);
            reconcileFromTimeline();
            // Also refresh the row so newly-added entries appear without
            // requiring a navigation event. Activity.toggle is the
            // accepted way to force a row redraw.
            try {
                if (Lampa.Activity && Lampa.Activity.active &&
                    Lampa.Activity.active() && Lampa.Activity.active().component === 'main') {
                    var act = Lampa.Activity.active();
                    if (act && typeof act.toggle === 'function') act.toggle();
                }
            } catch (e) {}
        }, 500);
    }

    function onStateChanged(e) {
        try {
            // Favorite list changed (initial sync, cloud pull, manual edit) —
            // re-run reconcile because new history cards may match timeline
            // hashes we couldn't match at boot. Rate-limit so cloud pulls
            // that fire multiple times per second don't thrash.
            if (e && e.target === 'favorite' && e.reason === 'read') {
                scheduleReconcile('favorite_changed');
                return;
            }

            if (!e || e.target !== 'timeline' || e.reason !== 'update') return;
            if (!e.data || e.data.hash == null) return;
            var hash = e.data.hash;
            var ctx  = findContextForHash(hash);
            if (!ctx) {
                // No matching context — most likely a timeline sync from
                // server, not local playback. Skip silently.
                return;
            }
            var se = reverseSeasonEpisode(ctx.card, hash);
            if (recentlyRecorded(ctx.card.id, se.season, se.episode)) {
                // Player.listener already wrote this — don't double-record.
                return;
            }
            var source;
            if (ctx.kind === 'torrent') {
                source = {
                    kind:         'torrent',
                    torrent_hash: ctx.torrent_hash || '',
                    file_path:    ctx.file_path    || '',
                    magnet:       ctx.magnet       || ''
                };
            } else if (ctx.kind === 'online') {
                source = { kind: 'online', balanser: ctx.balanser || '' };
            } else {
                source = { kind: 'other' };
            }
            var entry = {
                card_id:  ctx.card.id,
                season:   se.season,
                episode:  se.episode,
                source:   source,
                saved_at: Date.now()
            };
            log('player:start',
                'evt=timeline',
                'card_id=' + entry.card_id,
                'S' + (entry.season || '-') + 'E' + (entry.episode || '-'),
                'kind=' + source.kind,
                (source.kind === 'online'  ? 'balanser=' + source.balanser :
                 source.kind === 'torrent' ? 'hash=' + (source.torrent_hash || '').slice(0, 8) + ' path=' + (source.file_path || '<none>') :
                 'other'));
            markRecorded(entry);
            Store.upsert(entry);
        } catch (ex) { warn('state:changed', 'fail', ex && ex.message); }
    }

    // ========================================================================
    // Card hydration from Lampa.Favorite('history')
    // ========================================================================

    // Two-layer card source:
    //   1. Lampa.Favorite.get({type: 'history'}) — official API (note the
    //      {type:...} object form — passing a bare string returns empty
    //      because get(params) reads params.type).
    //   2. Lampa.Storage.get('favorite').card — local cache of every card
    //      Lampa has touched, regardless of category. Used as fallback
    //      when sync hasn't pulled cloud bookmarks yet at boot.
    //
    // The 'favorite' storage shape is {card: [...full cards], history: [ids],
    // viewed: [ids], like: [ids], etc.}. We index all cards by id from any
    // source we can find — caller dedupes naturally on lookup.
    function historyMap() {
        var idx = {};
        try {
            // Layer 1: official API
            if (Lampa.Favorite && typeof Lampa.Favorite.get === 'function') {
                var hist = [];
                try { hist = Lampa.Favorite.get({ type: 'history' }) || []; } catch (e) {}
                var i;
                for (i = 0; i < hist.length; i++) {
                    if (hist[i] && hist[i].id != null) idx[hist[i].id] = hist[i];
                }
            }
        } catch (e) {}
        try {
            // Layer 2: storage fallback — pulls in every card Lampa has,
            // including ones not yet synced into the in-memory history
            // array right after boot.
            var fav = Lampa.Storage.get('favorite', '{}');
            if (typeof fav === 'string') {
                try { fav = JSON.parse(fav); } catch (e) { fav = {}; }
            }
            if (fav && fav.card && fav.card.length) {
                var j;
                for (j = 0; j < fav.card.length; j++) {
                    var c = fav.card[j];
                    if (c && c.id != null && !idx[c.id]) idx[c.id] = c;
                }
            }
        } catch (e) {}
        return idx;
    }

    function hydrateAndPrune(queue) {
        var hist = historyMap();
        var visible = [];
        var orphans = [];
        var kept    = [];
        var i;
        for (i = 0; i < queue.length; i++) {
            var entry = queue[i];
            if (!entry || entry.card_id == null) { orphans.push(entry && entry.card_id); continue; }
            var card = hist[entry.card_id];
            if (card) {
                visible.push({ entry: entry, card: card });
                kept.push(entry);
            } else {
                orphans.push(entry.card_id);
            }
        }
        if (orphans.length) {
            for (i = 0; i < orphans.length; i++) {
                log('queue:orphan', 'card_id=' + orphans[i], 'reason=not_in_history');
            }
            Store.setQueue(kept);
        }
        return visible;
    }

    // ========================================================================
    // Row registration (main screen)
    // ========================================================================

    function isEnabled() {
        try { return Lampa.Storage.field(ENABLED_KEY) !== false; } catch (e) { return true; }
    }

    function buildRowCard(entry, card) {
        // Shallow clone so our marker doesn't pollute Lampa.Favorite('history').
        var out = {};
        var k;
        for (k in card) {
            if (Object.prototype.hasOwnProperty.call(card, k)) out[k] = card[k];
        }
        out.__last_watched_resume = true;
        out.__lwr_entry = entry; // attached for click handler lookup
        return out;
    }

    function buildPlaceholderCard() {
        return {
            __last_watched_resume: true,
            __last_watched_resume_placeholder: true,
            id:    null,
            title: tr('lwr_empty_title'),
            name:  tr('lwr_empty_title'),
            release_date: '',
            first_air_date: '',
            poster_path: '',
            background_image: '',
            // Lampa expects vote_average for the rating badge; use 0 so it's hidden.
            vote_average: 0,
            // No img — Card class will fall back to its broken-image placeholder.
            img: ''
        };
    }

    function registerRow() {
        var ver = (Lampa.Manifest && typeof Lampa.Manifest.app_digital === 'number')
                  ? Lampa.Manifest.app_digital : 0;
        if (ver < MIN_APP_DIGITAL) {
            log('init', 'version_too_low', 'app_digital=' + ver, 'row=skipped');
            return;
        }
        if (!Lampa.ContentRows || typeof Lampa.ContentRows.add !== 'function') {
            log('init', 'content_rows_api_missing', 'row=skipped');
            return;
        }
        Lampa.ContentRows.add({
            name:   ROW_NAME,
            title:  tr('lwr_row_title'),
            index:  -1000,
            screen: ['main'],
            call:   function (/* params, screen */) {
                if (!isEnabled()) return; // undefined → row not rendered
                var queue   = Store.getQueue();
                var visible = hydrateAndPrune(queue);
                if (!visible.length) {
                    log('row:empty', 'placeholder=true');
                    var ph = buildPlaceholderCard();
                    return function (cb) {
                        cb({ title: tr('lwr_row_title'), results: [ph] });
                    };
                }
                log('row:render', 'count=' + visible.length);
                var results = [];
                var i;
                for (i = 0; i < visible.length; i++) {
                    results.push(buildRowCard(visible[i].entry, visible[i].card));
                }
                return function (cb) {
                    cb({ title: tr('lwr_row_title'), results: results });
                };
            }
        });
        log('init', 'row=registered', 'app_digital=' + ver);
    }

    // ========================================================================
    // Click interception — capture-phase on document.body
    // ========================================================================

    function findOurCardData(el) {
        var node = el;
        while (node && node !== document.body && node !== document) {
            if (node.card_data && node.card_data.__last_watched_resume === true) {
                return node.card_data;
            }
            node = node.parentNode;
        }
        return null;
    }

    function onCaptureEvent(e) {
        if (!isEnabled()) return;
        var data = findOurCardData(e.target);
        if (!data) return;
        try { e.stopImmediatePropagation(); } catch (ex) {}
        try { e.preventDefault(); } catch (ex) {}

        if (data.__last_watched_resume_placeholder) {
            log('click', 'placeholder=true');
            return;
        }

        var entry = data.__lwr_entry;
        if (!entry) {
            warn('click', 'intercepted=true', 'entry_missing=true', 'card_id=' + (data.id || '?'));
            return;
        }
        // Always re-read from Storage at click time. The DOM-attached entry
        // is a SNAPSHOT taken when the row was first rendered (boot). After
        // a watch through the fallback path, Store.upsert wrote a fresher
        // entry with the captured magnet — without this re-read the click
        // would still go through the old (no-magnet) source and bounce
        // back to the torrent-search redirect.
        var fresh = findEntryByCardId(entry.card_id);
        if (fresh) {
            entry = fresh;
            data.__lwr_entry = fresh;
        }
        log('click', 'intercepted=true',
            'card_id=' + entry.card_id,
            'kind=' + entry.source.kind,
            'magnet=' + (entry.source && entry.source.magnet ? 'present' : 'absent'),
            'S' + (entry.season || '-') + 'E' + (entry.episode || '-'));
        dispatchResume(entry, data);
    }

    function findEntryByCardId(card_id) {
        var queue = Store.getQueue();
        var i;
        for (i = 0; i < queue.length; i++) {
            if (queue[i] && queue[i].card_id === card_id) return queue[i];
        }
        return null;
    }

    // ========================================================================
    // Row sync — reflect post-watch queue changes without app reload
    // ========================================================================
    //
    // ContentRows.call() is invoked ONCE at boot — Lampa has no public API
    // to re-run it in place. After a watch updates the queue (new magnet,
    // queue reorder, eviction), the DOM cards still hold the snapshot from
    // boot: stale __lwr_entry, original order. Without this sync, clicking
    // the same card after a watch goes through the OLD (magnet-less) entry
    // and falls back to torrent-search again — the loop the user reported.
    //
    // We can't reconstruct missing cards (Lampa.Card class isn't part of
    // the public API in 3.1.x), but we CAN imperatively reorder existing
    // ones, drop evicted ones, and refresh __lwr_entry on each — covers
    // the dominant case (re-watch of an existing row card).

    var _syncTimer = null;
    function scheduleRowSync(reason) {
        if (_syncTimer) return;
        _syncTimer = setTimeout(function () {
            _syncTimer = null;
            log('row:sync', 'trigger=' + reason);
            syncRowWithQueue();
        }, 300);
    }

    function syncRowWithQueue() {
        try {
            var queue = Store.getQueue();
            var queueIds = {};
            var i;
            for (i = 0; i < queue.length; i++) {
                if (queue[i] && queue[i].card_id != null) queueIds[queue[i].card_id] = queue[i];
            }

            // Find every DOM card we own across the page. Using attribute
            // probing (not a class lookup) because cards are clones built
            // by Lampa's Card class — class names are shared with normal
            // cards, the marker lives on .card_data.
            var ourCards = [];
            $('.card').each(function () {
                if (this.card_data &&
                    this.card_data.__last_watched_resume === true &&
                    !this.card_data.__last_watched_resume_placeholder) {
                    ourCards.push(this);
                }
            });
            if (!ourCards.length) return;

            var $row = $(ourCards[0]).parent();
            var dropped = 0;

            // 1) Drop cards no longer in queue (evicted by MAX_QUEUE cap or
            //    explicit user deletion that happened between boot and now).
            for (i = 0; i < ourCards.length; i++) {
                var c = ourCards[i];
                if (!queueIds[c.card_data.id]) {
                    $(c).remove();
                    dropped++;
                }
            }

            // 2) Re-index remaining cards.
            var byId = {};
            $row.find('.card').each(function () {
                if (this.card_data &&
                    this.card_data.__last_watched_resume === true &&
                    !this.card_data.__last_watched_resume_placeholder) {
                    byId[this.card_data.id] = this;
                }
            });

            // 3) Walk queue in order; .append() moves the matching DOM node
            //    to the end of the row. After processing all queue entries,
            //    the row order matches the queue order — most-recent first.
            var moved = 0;
            for (i = 0; i < queue.length; i++) {
                var q = queue[i];
                if (!q || q.card_id == null) continue;
                var domCard = byId[q.card_id];
                if (!domCard) continue;
                $row.append(domCard);
                domCard.card_data.__lwr_entry = q;
                moved++;
            }

            try { Lampa.Controller.collectionSet($row[0]); } catch (e) {}

            log('row:sync', 'done',
                'queue.length=' + queue.length,
                'reordered=' + moved,
                'dropped=' + dropped);
        } catch (e) { warn('row:sync', 'fail', e && e.message); }
    }

    function onCaptureLong(e) {
        if (!isEnabled()) return;
        if (MoveMode.active) return; // ignore while reordering — Controller owns input
        var data = findOurCardData(e.target);
        if (!data) return;
        try { e.stopImmediatePropagation(); } catch (ex) {}
        try { e.preventDefault(); } catch (ex) {}
        if (data.__last_watched_resume_placeholder) return;
        var entry = data.__lwr_entry;
        if (!entry) return;
        log('long_press', 'card_id=' + entry.card_id);
        showActionMenu(entry, data, e.target);
    }

    function bindCaptureHandlers() {
        if (_captureBound) return;
        document.body.addEventListener('hover:enter', onCaptureEvent, true);
        document.body.addEventListener('click',       onCaptureEvent, true);
        document.body.addEventListener('hover:long',  onCaptureLong,  true);
        _captureBound = true;
    }

    // ========================================================================
    // Resume dispatch — pick path by source.kind
    // ========================================================================

    function dispatchResume(entry, card) {
        // Cancel any in-flight auto-click before starting a new one.
        if (_activeAutoclick && typeof _activeAutoclick.abort === 'function') {
            try { _activeAutoclick.abort('superseded'); } catch (e) {}
            _activeAutoclick = null;
        }
        if (entry.source.kind === 'online')        dispatchOnlineResume(entry, card);
        else if (entry.source.kind === 'torrent')  dispatchTorrentResume(entry, card);
        else                                       dispatchFallbackToFull(entry, card, 'unknown_kind');
    }

    function dispatchFallbackToFull(entry, card, reason) {
        log('resume:fallback', 'target=full', 'reason=' + reason, 'card_id=' + entry.card_id);
        try {
            var method = 'movie';
            if (card.name || card.number_of_seasons || card.first_air_date) method = 'tv';
            if (card.type === 'tv') method = 'tv';
            Lampa.Activity.push({
                url:       card.url || '',
                component: 'full',
                id:        card.id,
                method:    method,
                card:      card,
                source:    card.source || 'tmdb'
            });
        } catch (e) { err('fallback', 'Activity.push fail', e && e.message); }
    }

    // Specialised fallback for torrent paths: when TorrServer purged the
    // hash (or our magnet capture missed), there's no point sending the
    // user back to the card screen — they'd just have to find and click
    // "Торренты" themselves. Skip a step and open the torrent search
    // directly. Bonus: a click on any torrent in the list runs through
    // patchTorrentStart → magnet captured → next resume is instant.
    function dispatchFallbackToTorrents(entry, card, reason) {
        log('resume:fallback', 'target=torrents', 'reason=' + reason, 'card_id=' + entry.card_id);
        try {
            var year = '';
            try {
                var date = card.release_date || card.first_air_date || '';
                if (date) year = (date + '').slice(0, 4);
            } catch (ex) {}
            var title  = card.title || card.name || '';
            var origin = card.original_title || card.original_name || title;
            // Mirror the search-string composition of Lampa's standard
            // Торренты button (full/start/torrents.js:14-24). We use the
            // 'df_lg' combination — original + title, no year — which is
            // the most permissive and safest default across torrent sites.
            Lampa.Activity.push({
                url:        '',
                title:      Lampa.Lang.translate('title_torrents'),
                component:  'torrents',
                search:     origin + (title && title !== origin ? ' ' + title : ''),
                search_one: title,
                search_two: origin,
                movie:      card,
                page:       1
            });
        } catch (e) {
            err('fallback', 'torrents Activity.push fail', e && e.message);
            // Last-resort: card screen.
            dispatchFallbackToFull(entry, card, 'torrents_push_fail:' + reason);
        }
    }

    // ========================================================================
    // Long-press action menu — our 2 items + Lampa's standard favorite items
    // ========================================================================
    //
    // We can't set Card.onMenuShow per-instance because we don't construct
    // the cards (ContentRows does). Instead we hijack `hover:long` in
    // capture phase, replicate Lampa's standard action menu (mirrors the
    // menu_favorite array in vendor/lampa-source/src/interaction/card.js:361)
    // and prepend our three items.

    // Deliberate "open card" navigation from the long-press menu. Reuses the
    // full-screen push the torrent/online fallbacks already share, but logs it
    // as an explicit user action rather than a resume fallback. Activity.push
    // installs the 'full' screen's own controller, so — unlike the remove
    // branch — the caller must NOT toggle the previous controller back.
    function openCardScreen(entry, data) {
        log('action:open_card', 'card_id=' + entry.card_id);
        dispatchFallbackToFull(entry, data, 'menu_open_card');
    }

    function showActionMenu(entry, data, targetEl) {
        var enabled = (Lampa.Controller.enabled && Lampa.Controller.enabled() || {}).name;
        var status  = (Lampa.Favorite && Lampa.Favorite.check) ? Lampa.Favorite.check(data) : {};

        var items = [
            { title: tr('lwr_open_card'),        lwr_action: 'card' },
            { title: tr('lwr_remove_from_list'), lwr_action: 'remove' },
            { title: tr('lwr_move_in_list'),     lwr_action: 'move' },
            { title: Lampa.Lang.translate('more'),          separator: true },
            { title: Lampa.Lang.translate('title_book'),    where: 'book',    checkbox: true, checked: !!status.book },
            { title: Lampa.Lang.translate('title_like'),    where: 'like',    checkbox: true, checked: !!status.like },
            { title: Lampa.Lang.translate('title_wath'),    where: 'wath',    checkbox: true, checked: !!status.wath },
            { title: Lampa.Lang.translate('menu_history'),  where: 'history', checkbox: true, checked: !!status.history }
        ];

        if (window.lampa_settings && window.lampa_settings.account_use) {
            var marks = ['look', 'viewed', 'scheduled', 'continued', 'thrown'];
            items.push({ title: Lampa.Lang.translate('settings_cub_status'), separator: true });
            var i;
            for (i = 0; i < marks.length; i++) {
                var m = marks[i];
                items.push({
                    title:   Lampa.Lang.translate('title_' + m),
                    where:   m,
                    picked:  !!status[m],
                    collect: true
                });
            }
        }

        Lampa.Select.show({
            title: Lampa.Lang.translate('title_action'),
            items: items,
            onBack: function () {
                if (enabled) try { Lampa.Controller.toggle(enabled); } catch (e) {}
            },
            onCheck: function (a) {
                if (a.where && Lampa.Favorite && Lampa.Favorite.toggle) {
                    Lampa.Favorite.toggle(a.where, data);
                }
            },
            onSelect: function (a) {
                if (a.lwr_action === 'card') {
                    openCardScreen(entry, data);
                    return;
                }
                if (a.lwr_action === 'remove') {
                    if (enabled) try { Lampa.Controller.toggle(enabled); } catch (e) {}
                    handleRemove(entry, data, targetEl);
                    return;
                }
                if (a.lwr_action === 'move') {
                    MoveMode.enter(entry, data, targetEl, enabled);
                    return;
                }
                if (a.collect && Lampa.Favorite && Lampa.Favorite.toggle) {
                    Lampa.Favorite.toggle(a.where, data);
                }
                if (enabled) try { Lampa.Controller.toggle(enabled); } catch (e) {}
            }
        });
    }

    // ========================================================================
    // Delete with undo toast
    // ========================================================================

    function handleRemove(entry, data, targetEl) {
        var queue = Store.getQueue();
        var idx = -1;
        var i;
        for (i = 0; i < queue.length; i++) {
            if (queue[i] && queue[i].card_id === entry.card_id) { idx = i; break; }
        }
        if (idx === -1) {
            log('remove', 'noop', 'card_id=' + entry.card_id, 'reason=not_in_queue');
            return;
        }
        var removed = queue[idx];
        queue.splice(idx, 1);
        Store.setQueue(queue);
        log('remove', 'card_id=' + removed.card_id, 'idx=' + idx, 'queue.length=' + queue.length);

        // Detach the card DOM node directly. Lampa.Activity.toggle() does
        // NOT re-execute ContentRows.call() in 3.1.x, so a row can't be
        // re-rendered without leaving and re-entering the screen. Detaching
        // by ourselves both: (a) gives instant visual feedback, and (b)
        // preserves the bound jQuery handlers so we can re-attach the same
        // node verbatim if undo fires.
        var $card = $(targetEl).closest('.card');
        if (!$card.length) $card = $(targetEl).closest('.selector');
        var $row     = $card.length ? $card.parent() : null;
        var $prev    = $card.length ? $card.prev()  : null;
        var detached = ($card.length && $row && $row.length) ? $card.detach() : null;
        if (detached) {
            // Reset focus to nearest sibling so D-pad doesn't strand on a
            // ghost element. Prefer next neighbour, fall back to previous.
            try {
                var $focusTarget = ($prev && $prev.length) ? $prev : ($row.children('.card').first());
                if ($focusTarget && $focusTarget.length) {
                    Lampa.Controller.collectionSet($row[0]);
                    Lampa.Controller.collectionFocus($focusTarget[0], $row[0]);
                }
            } catch (e) {}
        }

        showUndoToast(removed, idx, data, detached, $prev, $row);
    }

    function showUndoToast(removedEntry, originalIdx, card, detached, $prev, $row) {
        // Lampa.Noty is just a passive toast — no clickable button. To give
        // the user a real undo affordance on a TV remote, we show a tiny
        // Lampa.Select with one item ("Отменить удаление: <title>") and a
        // 4-second auto-close timer. Pick within 4 s → restore. Let it close
        // → removal stands.
        var label = (card && (card.title || card.name)) || ('id ' + removedEntry.card_id);
        var undone = false;

        var undo = function () {
            if (undone) return;
            undone = true;
            var q = Store.getQueue();
            var insertAt = Math.min(originalIdx, q.length);
            q.splice(insertAt, 0, removedEntry);
            if (q.length > MAX_QUEUE) q = q.slice(0, MAX_QUEUE);
            Store.setQueue(q);
            log('remove:undo', 'card_id=' + removedEntry.card_id, 'restored_at=' + insertAt);
            // Re-attach the original DOM node — keeps focus state and any
            // Lampa-side handlers (cards bind their own hover/focus during
            // construction; recreating from scratch loses them).
            if (detached && $row && $row.length) {
                try {
                    if ($prev && $prev.length && $.contains($row[0], $prev[0])) {
                        $prev.after(detached);
                    } else {
                        $row.prepend(detached);
                    }
                    Lampa.Controller.collectionSet($row[0]);
                    Lampa.Controller.collectionFocus(detached[0], $row[0]);
                } catch (e) { warn('remove:undo', 'reattach fail', e && e.message); }
            }
        };

        try { if (Lampa.Noty && Lampa.Noty.show) Lampa.Noty.show(tr('lwr_removed_noty').replace('{title}', label)); }
        catch (e) {}

        var enabled = (Lampa.Controller.enabled && Lampa.Controller.enabled() || {}).name;
        var autoClose;
        try {
            Lampa.Select.show({
                title: tr('lwr_removed_noty').replace('{title}', label),
                items: [{ title: tr('lwr_undo'), lwr_undo: true }],
                onBack: function () {
                    if (autoClose) clearTimeout(autoClose);
                    if (enabled) try { Lampa.Controller.toggle(enabled); } catch (ex) {}
                },
                onSelect: function (a) {
                    if (autoClose) clearTimeout(autoClose);
                    if (a && a.lwr_undo) undo();
                    if (enabled) try { Lampa.Controller.toggle(enabled); } catch (ex) {}
                }
            });
            autoClose = setTimeout(function () {
                try {
                    if (Lampa.Select && typeof Lampa.Select.close === 'function') Lampa.Select.close();
                } catch (ex) {}
                if (enabled) try { Lampa.Controller.toggle(enabled); } catch (ex) {}
            }, DELETE_UNDO_MS);
        } catch (e) { warn('remove:undo', 'select fail', e && e.message); }
    }

    // ========================================================================
    // Move-mode — left/right reorder via D-pad, OK or Back commits
    // ========================================================================
    //
    // After "Переместить" is selected from the action menu, we install a
    // private Controller named 'lwr_reorder' that owns input. Each left/right
    // press swaps the card with its neighbour in BOTH the queue array and
    // the live DOM, persists immediately to Storage so a crash doesn't lose
    // progress, and re-focuses the moving card. OK/Back exit move mode
    // without rolling back — every step is already committed.

    var MoveMode = {
        active:        false,
        _entry:        null,
        _cardEl:       null,
        _rowEl:        null,
        _prevController: null,

        enter: function (entry, data, targetEl, prevController) {
            ensureStyles();
            if (MoveMode.active) MoveMode.exit('superseded');

            // Resolve the actual card DOM node — targetEl may be a child.
            var $card = $(targetEl).closest('.card');
            if (!$card.length) {
                $card = $(targetEl).closest('.selector');
            }
            if (!$card.length) {
                warn('move:enter', 'no_card_el');
                if (prevController) try { Lampa.Controller.toggle(prevController); } catch (e) {}
                return;
            }
            var $row = $card.closest('.items-line, .items-cards, .scroll__body');
            if (!$row.length) {
                warn('move:enter', 'no_row_el');
                if (prevController) try { Lampa.Controller.toggle(prevController); } catch (e) {}
                return;
            }

            MoveMode.active          = true;
            MoveMode._entry          = entry;
            MoveMode._cardEl         = $card[0];
            MoveMode._rowEl          = $row[0];
            MoveMode._prevController = prevController || null;

            $card.addClass(REORDER_CLASS);
            log('move:enter', 'card_id=' + entry.card_id);

            try {
                Lampa.Controller.add('lwr_reorder', {
                    invisible: true,
                    toggle: function () {
                        Lampa.Controller.collectionSet(MoveMode._rowEl);
                        Lampa.Controller.collectionFocus(MoveMode._cardEl, MoveMode._rowEl);
                    },
                    update: function () {
                        Lampa.Controller.collectionSet(MoveMode._rowEl);
                    },
                    left:  function () { MoveMode.shift(-1); },
                    right: function () { MoveMode.shift(+1); },
                    up:    function () { MoveMode.exit('up'); },
                    down:  function () { MoveMode.exit('down'); },
                    enter: function () { MoveMode.exit('enter'); },
                    back:  function () { MoveMode.exit('back'); }
                });
                Lampa.Controller.toggle('lwr_reorder');
            } catch (e) {
                err('move:enter', 'Controller.toggle fail', e && e.message);
                MoveMode.exit('controller_fail');
            }
        },

        shift: function (delta) {
            if (!MoveMode.active) return;
            var queue = Store.getQueue();
            var idx = -1;
            var i;
            for (i = 0; i < queue.length; i++) {
                if (queue[i] && queue[i].card_id === MoveMode._entry.card_id) { idx = i; break; }
            }
            if (idx === -1) return;
            var newIdx = idx + delta;
            if (newIdx < 0 || newIdx >= queue.length) {
                log('move:shift', 'edge', 'delta=' + delta, 'idx=' + idx);
                return;
            }
            var tmp = queue[idx];
            queue[idx] = queue[newIdx];
            queue[newIdx] = tmp;
            Store.setQueue(queue);
            log('move:shift', 'delta=' + delta, 'from=' + idx, 'to=' + newIdx);

            // Mirror the swap in the live DOM so the card visibly moves
            // without a full row re-render (which would lose focus).
            var $card    = $(MoveMode._cardEl);
            var $sibling = delta < 0 ? $card.prev('.card') : $card.next('.card');
            if ($sibling.length) {
                if (delta < 0) $sibling.before($card);
                else           $sibling.after($card);
            }

            try {
                Lampa.Controller.collectionSet(MoveMode._rowEl);
                Lampa.Controller.collectionFocus(MoveMode._cardEl, MoveMode._rowEl);
            } catch (e) {}
        },

        exit: function (reason) {
            if (!MoveMode.active) return;
            log('move:exit', 'reason=' + reason);
            try { $(MoveMode._cardEl).removeClass(REORDER_CLASS); } catch (e) {}
            var prev = MoveMode._prevController;
            MoveMode.active          = false;
            MoveMode._entry          = null;
            MoveMode._cardEl         = null;
            MoveMode._rowEl          = null;
            MoveMode._prevController = null;
            try {
                if (prev) Lampa.Controller.toggle(prev);
                else if (Lampa.Controller && Lampa.Controller.toggle) Lampa.Controller.toggle('content');
            } catch (e) {}
        }
    };

    // ========================================================================
    // CSS — visual treatment for cards in move-mode
    // ========================================================================

    function ensureStyles() {
        if (_stylesInjected) return;
        _stylesInjected = true;
        try {
            var css = '' +
                '.' + REORDER_CLASS + '{' +
                    'transform: scale(1.06) rotate(-1.5deg) !important;' +
                    'box-shadow: 0 0 0 3px #f5c518, 0 12px 28px rgba(245, 197, 24, 0.45);' +
                    'transition: transform 180ms ease, box-shadow 180ms ease;' +
                    'z-index: 30;' +
                    'position: relative;' +
                '}' +
                '.' + REORDER_CLASS + ' .card__view{' +
                    'overflow: visible !important;' +
                '}';
            var style = document.createElement('style');
            style.setAttribute('data-lwr', '1');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
        } catch (e) { warn('styles', 'inject fail', e && e.message); }
    }

    // ========================================================================
    // Online resume — Activity.push to online + DOM MutationObserver
    // ========================================================================

    function dispatchOnlineResume(entry, card) {
        log('resume:dispatch', 'target=online',
            'balanser=' + (entry.source.balanser || '?'),
            'autoclick=true');
        try {
            Lampa.Activity.push({
                url:        '',
                title:      Lampa.Lang.translate('title_online'),
                component:  'online',
                search:     card.title,
                search_one: card.title,
                search_two: card.original_title || card.original_name || card.title,
                movie:      card,
                page:       1
            });
        } catch (e) {
            err('resume:online', 'Activity.push fail', e && e.message);
            return;
        }
        OnlineAutoclick.start(entry);
    }

    var OnlineAutoclick = {
        _observer: null,
        _timer:    null,
        _started:  0,

        start: function (entry) {
            OnlineAutoclick.abort('restart');
            OnlineAutoclick._started = Date.now();
            log('resume:online', 'waiting_dom=true', 'season=' + (entry.season || '-'),
                'episode=' + (entry.episode || '-'));

            var tryMatch = function () {
                var $matches = $('.online__item').filter(function () {
                    return OnlineAutoclick._matches(this, entry);
                });
                if ($matches.length) {
                    OnlineAutoclick._fire($matches.eq(0)[0], 'season_episode');
                    return true;
                }
                return false;
            };

            // Immediate try in case the list is already rendered (warm cache).
            if (tryMatch()) return;

            try {
                OnlineAutoclick._observer = new MutationObserver(function () {
                    tryMatch();
                });
                OnlineAutoclick._observer.observe(document.body, {
                    childList: true,
                    subtree:   true
                });
            } catch (e) {
                warn('resume:online', 'MutationObserver fail', e && e.message);
            }

            OnlineAutoclick._timer = setTimeout(function () {
                OnlineAutoclick.abort('timeout');
            }, AUTOCLICK_TIMEOUT_MS);
            _activeAutoclick = OnlineAutoclick;
        },

        _matches: function (itemEl, entry) {
            // Lampa renders online items via online_folder/online templates.
            // For series items, the title prefix is "S<season> / Серия <ep>".
            // Parse from the rendered text (more robust than data attributes,
            // which differ across community balanser plugins).
            var $it = $(itemEl);
            var title = ($it.find('.online__title').text() || $it.text() || '').trim();
            if (!title) return false;
            if (entry.season && entry.episode) {
                var sRe = new RegExp('(?:^|[^0-9])S\\s*' + entry.season + '(?:[^0-9]|$)', 'i');
                var eRe = new RegExp('(?:^|[^0-9])(?:E|Серия|Episode)\\s*' + entry.episode + '(?:[^0-9]|$)', 'i');
                return sRe.test(title) && eRe.test(title);
            }
            // Movie: any rendered item is a candidate; trigger first one.
            return true;
        },

        _fire: function (el, matchedBy) {
            var dt = Date.now() - OnlineAutoclick._started;
            log('autoclick:hit', 'kind=online', 'dt_ms=' + dt, 'matched=' + matchedBy);
            OnlineAutoclick.abort('hit');
            try {
                var ev = document.createEvent('Event');
                ev.initEvent('hover:enter', false, true);
                el.dispatchEvent(ev);
            } catch (e) {
                err('autoclick:fire', 'fail', e && e.message);
            }
        },

        abort: function (reason) {
            if (OnlineAutoclick._observer) {
                try { OnlineAutoclick._observer.disconnect(); } catch (e) {}
                OnlineAutoclick._observer = null;
            }
            if (OnlineAutoclick._timer) {
                clearTimeout(OnlineAutoclick._timer);
                OnlineAutoclick._timer = null;
            }
            if (reason !== 'hit' && reason !== 'restart' && reason !== 'superseded') {
                log('autoclick:miss', 'kind=online', 'reason=' + reason);
            }
            if (_activeAutoclick === OnlineAutoclick) _activeAutoclick = null;
        }
    };

    // ========================================================================
    // Torrent resume — Lampa.Torrent.open + listener on 'torrent_file'
    // ========================================================================

    function dispatchTorrentResume(entry, card) {
        if (!Lampa.Torrent) {
            err('resume:torrent', 'fail', 'reason=api_missing');
            dispatchFallbackToTorrents(entry, card, 'torrent_api_missing');
            return;
        }
        var magnet = entry.source.magnet || '';
        var hash   = entry.source.torrent_hash || '';
        // Magnet path — call Torrent.start with a synthetic element so Lampa
        // re-adds the torrent to TorrServer if missing. Falls back to the
        // hash-only path if no magnet was recorded (legacy queue entries).
        if (magnet && typeof Lampa.Torrent.start === 'function') {
            log('resume:dispatch', 'target=torrent', 'mode=start',
                'magnet=present',
                'hash=' + hash.slice(0, 8),
                'autoclick=true');
            TorrentSafetyNet.arm(entry, card);
            TorrentAutoclick.start(entry);
            var element = {
                MagnetUri: magnet,
                Link:      magnet,
                title:     card.title || card.name || '',
                Title:     card.title || card.name || '',
                poster:    card.img || card.poster_path || ''
            };
            try {
                Lampa.Torrent.start(element, card);
            } catch (e) {
                err('resume:torrent', 'Torrent.start fail', e && e.message);
                TorrentAutoclick.abort('start_fail');
                TorrentSafetyNet.disarm();
                dispatchFallbackToTorrents(entry, card, 'torrent_start_fail');
            }
            return;
        }
        if (typeof Lampa.Torrent.open !== 'function') {
            err('resume:torrent', 'fail', 'reason=api_missing');
            dispatchFallbackToTorrents(entry, card, 'torrent_api_missing');
            return;
        }
        log('resume:dispatch', 'target=torrent', 'mode=open',
            'magnet=absent',
            'hash=' + hash.slice(0, 8),
            'autoclick=true');
        TorrentSafetyNet.arm(entry, card);
        TorrentAutoclick.start(entry);
        try {
            Lampa.Torrent.open(hash, card);
        } catch (e) {
            err('resume:torrent', 'Torrent.open fail', e && e.message);
            TorrentAutoclick.abort('open_fail');
            TorrentSafetyNet.disarm();
            dispatchFallbackToTorrents(entry, card, 'torrent_open_fail');
        }
    }

    // Safety net for the torrent path. Lampa polls /torrents every 2 s for up
    // to 90 s before giving up — too long, and the user is stuck on a spinner.
    // We listen for request_error on /torrents and bail on the first 404, so
    // the user goes back to the card screen instead of staring at a spinner.
    var TorrentSafetyNet = {
        _armed:           false,
        _entry:           null,
        _card:            null,
        _timer:           null,
        _consecutive404s: 0,
        _threshold:       2,  // bail after N consecutive 404s on /torrents

        arm: function (entry, card) {
            if (TorrentSafetyNet._timer) clearTimeout(TorrentSafetyNet._timer);
            TorrentSafetyNet._armed           = true;
            TorrentSafetyNet._entry           = entry;
            TorrentSafetyNet._card            = card;
            TorrentSafetyNet._consecutive404s = 0;
            // Hard upper bound — if no /torrents traffic happens at all
            // (e.g. TorrServer URL unreachable at the network layer), give
            // up watching after 30s so we don't strand the user later.
            TorrentSafetyNet._timer = setTimeout(function () {
                if (TorrentSafetyNet._armed) {
                    log('safety_net:expired', 'no_traffic_in_30s');
                    TorrentSafetyNet.disarm();
                }
            }, 30000);
        },

        disarm: function () {
            if (TorrentSafetyNet._timer) {
                clearTimeout(TorrentSafetyNet._timer);
                TorrentSafetyNet._timer = null;
            }
            TorrentSafetyNet._armed           = false;
            TorrentSafetyNet._entry           = null;
            TorrentSafetyNet._card            = null;
            TorrentSafetyNet._consecutive404s = 0;
        },

        onRequestError: function (e) {
            if (!TorrentSafetyNet._armed) return;
            if (!e || !e.params) return;
            var url = (e.params.url || '') + '';
            if (url.indexOf('/torrents') === -1) return;
            var status = 0;
            try {
                if (e.error) {
                    status = parseInt(e.error.status || e.error.code || 0, 10) || 0;
                }
            } catch (ex) {}
            if (status !== 404) return;
            TorrentSafetyNet._consecutive404s++;
            if (TorrentSafetyNet._consecutive404s < TorrentSafetyNet._threshold) {
                // First 404 — could be transient during a fresh torrent
                // add (TorrServer hasn't indexed the magnet yet). Wait
                // one more cycle (~2s) before bailing.
                log('safety_net:404',
                    'consecutive=' + TorrentSafetyNet._consecutive404s,
                    'threshold=' + TorrentSafetyNet._threshold,
                    'waiting');
                return;
            }
            log('safety_net:404', 'aborting torrent resume',
                'consecutive=' + TorrentSafetyNet._consecutive404s,
                'card_id=' + (TorrentSafetyNet._entry && TorrentSafetyNet._entry.card_id));
            var entry = TorrentSafetyNet._entry;
            var card  = TorrentSafetyNet._card;
            TorrentSafetyNet.disarm();
            try { TorrentAutoclick.abort('torrserver_404'); } catch (ex) {}
            // CRITICAL: Lampa's torrent flow keeps a setInterval polling
            // /torrents in the closure of interaction/torrent.js — closing
            // just the Modal doesn't stop it. The interval reads SERVER.hash
            // on each tick, and once the user opens another torrent the new
            // hash gets polled by BOTH the old (orphaned) interval AND the
            // new one. The orphaned interval re-renders the file picker on
            // every successful response, blinking the UI and stealing focus
            // to the last episode (Controller.collectionFocus on the last
            // file with progress, vendor/lampa-source/src/interaction/torrent.js:568).
            // The clean way to stop it is to trigger the loading modal's
            // own onBack — that calls Lampa's internal `close()` which
            // clearIntervals timers.files AND Torserver.clear() AND drops
            // the orphan SERVER state.
            try { Lampa.Controller.back(); } catch (ex) {
                err('safety_net', 'Controller.back fail', ex && ex.message);
                // Last-resort fallback: at least close the modal UI.
                try { if (Lampa.Modal && Lampa.Modal.close) Lampa.Modal.close(); } catch (ex2) {}
            }
            if (entry && card) dispatchFallbackToTorrents(entry, card, 'torrserver_404');
        }
    };

    var TorrentAutoclick = {
        _handler: null,
        _timer:   null,
        _started: 0,
        _entry:   null,

        start: function (entry) {
            TorrentAutoclick.abort('restart');
            TorrentAutoclick._started = Date.now();
            TorrentAutoclick._entry   = entry;
            log('resume:torrent', 'waiting_event=torrent_file',
                'path=' + (entry.source.file_path || '<none>'));

            TorrentAutoclick._handler = function (e) {
                if (!e || e.type !== 'list_open') return;
                var items = e.items || [];
                var i;
                var matchedIdx = -1;
                if (entry.source.file_path) {
                    for (i = 0; i < items.length; i++) {
                        if (items[i] && items[i].path === entry.source.file_path) { matchedIdx = i; break; }
                    }
                }
                // Fall back to season/episode match if path didn't hit
                // (release re-encoded, file renamed, but episode preserved).
                if (matchedIdx === -1 && entry.season && entry.episode) {
                    for (i = 0; i < items.length; i++) {
                        if (items[i] && (items[i].season == entry.season) && (items[i].episode == entry.episode)) {
                            matchedIdx = i;
                            break;
                        }
                    }
                }
                if (matchedIdx === -1) {
                    log('autoclick:miss', 'kind=torrent', 'reason=no_match',
                        'items=' + items.length);
                    TorrentAutoclick.abort('no_match');
                    return;
                }
                var matchedBy = (entry.source.file_path && items[matchedIdx].path === entry.source.file_path)
                                ? 'path' : 'season_episode';
                TorrentAutoclick._fire(items[matchedIdx], matchedBy);
            };

            try { Lampa.Listener.follow('torrent_file', TorrentAutoclick._handler); }
            catch (e) { err('resume:torrent', 'follow fail', e && e.message); }

            TorrentAutoclick._timer = setTimeout(function () {
                TorrentAutoclick.abort('timeout');
            }, AUTOCLICK_TIMEOUT_MS);
            _activeAutoclick = TorrentAutoclick;
        },

        _fire: function (item, matchedBy) {
            var dt = Date.now() - TorrentAutoclick._started;
            // Find the rendered DOM element for this file in the torrent file
            // picker. Files are rendered into `.torrent-files` (or similar);
            // walk the modal DOM looking for the element bound to this `item`.
            var el = TorrentAutoclick._findItemEl(item);
            if (!el) {
                log('autoclick:miss', 'kind=torrent', 'reason=dom_not_found');
                TorrentAutoclick.abort('dom_not_found');
                return;
            }
            log('autoclick:hit', 'kind=torrent', 'dt_ms=' + dt, 'matched=' + matchedBy);
            TorrentAutoclick.abort('hit');
            try {
                var ev = document.createEvent('Event');
                ev.initEvent('hover:enter', false, true);
                el.dispatchEvent(ev);
            } catch (e) {
                err('autoclick:fire', 'kind=torrent fail', e && e.message);
            }
        },

        _findItemEl: function (item) {
            // Lampa's torrent.js sets `path` on the bound element via Arrays.extend;
            // the rendered DOM is .torrent-files > .selector with an attached
            // jQuery-data link to the items array. Easiest stable lookup:
            // match by visible text containing item.path's basename or full path.
            var path = item && item.path ? item.path : '';
            if (!path) return null;
            var basename = path.split('/').pop();
            var $candidates = $('.torrent-item, .torrent-files .selector, .selector.torrent-item');
            var found = null;
            $candidates.each(function () {
                var t = ($(this).text() || '').trim();
                if (t && (t.indexOf(path) >= 0 || t.indexOf(basename) >= 0)) {
                    found = this;
                    return false; // break
                }
            });
            return found;
        },

        abort: function (reason) {
            if (TorrentAutoclick._handler) {
                try { Lampa.Listener.remove('torrent_file', TorrentAutoclick._handler); } catch (e) {}
                TorrentAutoclick._handler = null;
            }
            if (TorrentAutoclick._timer) {
                clearTimeout(TorrentAutoclick._timer);
                TorrentAutoclick._timer = null;
            }
            if (reason !== 'hit' && reason !== 'restart' && reason !== 'superseded' &&
                reason !== 'no_match' && reason !== 'dom_not_found') {
                log('autoclick:miss', 'kind=torrent', 'reason=' + reason);
            }
            TorrentAutoclick._entry = null;
            if (_activeAutoclick === TorrentAutoclick) _activeAutoclick = null;
            // Disarm the safety net only when the autoclick reached a
            // terminal state. 'restart' and 'superseded' are mid-lifecycle
            // resets driven by start() or by another dispatch — disarming
            // here would race with the new arm() that's about to follow.
            if (reason === 'hit' || reason === 'no_match' ||
                reason === 'dom_not_found' || reason === 'timeout') {
                TorrentSafetyNet.disarm();
            }
        }
    };

    // ========================================================================
    // i18n
    // ========================================================================

    function tr(key) {
        try { return Lampa.Lang.translate(key); } catch (e) { return key; }
    }

    function registerLang() {
        try {
            Lampa.Lang.add({
                lwr_row_title: {
                    ru: 'Последние просмотры',
                    en: 'Last watched'
                },
                lwr_empty_title: {
                    ru: 'Тут будут последние просмотры',
                    en: 'Your recent watches will appear here'
                },
                lwr_settings_title: {
                    ru: 'Продолжить одним кликом',
                    en: 'Last Watched Resume'
                },
                lwr_enabled: {
                    ru: 'Включить',
                    en: 'Enable'
                },
                lwr_enabled_desc: {
                    ru: 'Показывать ряд "Последние просмотры" сверху главного экрана',
                    en: 'Show the "Last watched" row at the top of the main screen'
                },
                lwr_clear: {
                    ru: 'Сбросить запомненное',
                    en: 'Clear saved'
                },
                lwr_clear_desc: {
                    ru: 'Очистить очередь последних просмотров для текущего профиля',
                    en: 'Clear the recently-watched queue for the current profile'
                },
                lwr_cleared_noty: {
                    ru: 'Запомненное удалено',
                    en: 'Saved entries cleared'
                },
                lwr_open_card: {
                    ru: 'Перейти в карточку',
                    en: 'Open card'
                },
                lwr_remove_from_list: {
                    ru: 'Удалить из списка',
                    en: 'Remove from list'
                },
                lwr_move_in_list: {
                    ru: 'Переместить',
                    en: 'Move'
                },
                lwr_removed_noty: {
                    ru: 'Удалено: {title}',
                    en: 'Removed: {title}'
                },
                lwr_undo: {
                    ru: 'Отменить',
                    en: 'Undo'
                }
            });
        } catch (e) { err('i18n', 'register fail', e && e.message); }
    }

    // ========================================================================
    // Settings
    // ========================================================================

    function registerSettings() {
        try {
            Lampa.SettingsApi.addComponent({
                component: 'last_watched_resume',
                name:      tr('lwr_settings_title'),
                icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>' +
                        '<path d="M3 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
                      '</svg>'
            });
            Lampa.SettingsApi.addParam({
                component: 'last_watched_resume',
                param:     { name: ENABLED_KEY, type: 'trigger', default: true },
                field:     {
                    name:        tr('lwr_enabled'),
                    description: tr('lwr_enabled_desc')
                },
                onChange:  function (value) {
                    log('settings:enabled', 'value=' + value);
                }
            });
            Lampa.SettingsApi.addParam({
                component: 'last_watched_resume',
                param:     { name: CLEAR_KEY, type: 'button' },
                field:     {
                    name:        tr('lwr_clear'),
                    description: tr('lwr_clear_desc')
                },
                onChange:  function () {
                    Store.clearQueue();
                    try {
                        if (Lampa.Noty && Lampa.Noty.show) {
                            Lampa.Noty.show(tr('lwr_cleared_noty'));
                        }
                    } catch (e) {}
                    log('settings:cleared');
                }
            });
        } catch (e) { err('settings', 'register fail', e && e.message); }
    }

    // ========================================================================
    // Manifest
    // ========================================================================

    function registerManifest() {
        try {
            Lampa.Manifest.plugins = {
                type:        'video',
                version:     '0.2.6',
                name:        'Last Watched Resume',
                description: 'One-click resume — last 5 watched titles row on the main screen, online + torrent.'
            };
        } catch (e) {}
    }

    // ========================================================================
    // Init
    // ========================================================================

    function init() {
        if (_initialized) return;
        _initialized = true;

        registerLang();
        registerManifest();
        registerSettings();
        registerRow();
        ensureStyles();

        // Three-layer recording strategy:
        //
        //   1. Player.listener('start' / 'external') — the OBVIOUS path,
        //      works on most setups, fastest signal. Some Tizen / native-
        //      player paths bypass it entirely (observed empirically).
        //
        //   2. Lampa.Listener('state:changed' target=timeline reason=update) —
        //      fires from Lampa.Timeline.update which is called by EVERY
        //      playback path (this is what powers Lampa's own continue-
        //      watching). Universal but only gives us a hash — we have to
        //      reverse-lookup the card via pending-context tracking.
        //
        //   3. Activity / Torrent.open observers — feed the pending-context
        //      cache so layer 2 can map hash → (card, source).
        //
        // Layer 1 is the fast path; layer 2 is the safety net. Both record
        // through the same dedup window so we never write twice for one
        // playback.
        try { Lampa.Player.listener.follow('start',    function (d) { onPlayerStart(d, 'start'); }); }
        catch (e) { err('init', "Player.listener.follow('start') fail", e && e.message); }
        try { Lampa.Player.listener.follow('external', function (d) { onPlayerStart(d, 'external'); }); }
        catch (e) { err('init', "Player.listener.follow('external') fail", e && e.message); }
        try { Lampa.Player.listener.follow('destroy',  function () { scheduleRowSync('player_destroy'); }); }
        catch (e) { err('init', "Player.listener.follow('destroy') fail", e && e.message); }

        try { Lampa.Listener.follow('state:changed', onStateChanged); }
        catch (e) { err('init', "Listener.follow('state:changed') fail", e && e.message); }
        try { Lampa.Listener.follow('activity', onActivity); }
        catch (e) { err('init', "Listener.follow('activity') fail", e && e.message); }
        try { Lampa.Listener.follow('torrent_file', onTorrentFile); }
        catch (e) { err('init', "Listener.follow('torrent_file') fail", e && e.message); }
        try { Lampa.Listener.follow('request_error', TorrentSafetyNet.onRequestError); }
        catch (e) { err('init', "Listener.follow('request_error') fail", e && e.message); }
        patchTorrentStart();
        patchTorrentOpen();
        patchPlayerPlay();

        // Reconcile-on-boot — pulls in any plays we missed during prior
        // session because JS was frozen by native player. Runs once per
        // boot, scans Lampa's own file_view_<profile> + Favorite('history').
        try { reconcileFromTimeline(); }
        catch (e) { err('init', 'reconcile fail', e && e.message); }

        bindCaptureHandlers();

        var ver = (Lampa.Manifest && Lampa.Manifest.app_digital) || 'n/a';
        var pid = Store.profileId();
        var qlen = Store.getQueue().length;
        log('init', 'profile=' + (pid || 'local'), 'ver=' + ver, 'queue.length=' + qlen);
    }

    // ========================================================================
    // Bootstrap — four-layer pattern (lampa-plugin-development skill)
    // ========================================================================

    function start() {
        if (window.Lampa && Lampa.SettingsApi && Lampa.Storage && Lampa.Player &&
            Lampa.PlayerVideo && Lampa.Listener && Lampa.Lang && Lampa.Utils) {
            init();
        } else {
            setTimeout(start, 500);
        }
    }

    if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('app', function (e) { if (e && e.type === 'ready') start(); });
        setTimeout(start, 1000);
    } else {
        var readyInterval = setInterval(function () {
            if (window.Lampa && Lampa.Listener) {
                clearInterval(readyInterval);
                Lampa.Listener.follow('app', function (e) { if (e && e.type === 'ready') start(); });
                setTimeout(start, 1000);
            }
        }, 300);
    }
})();

// ts-preload.js
;(function($, Lampa) {
    var Modal = /** @class */function(){
	var modalID = 0;

	function Modal(params) {
	    this.id = ++modalID;
	    this.active = params;
	    this.html = Lampa.Template.get('modal', {title: params.title});
	    this.scroll = new Lampa.Scroll({over: true, mask: params.mask});
	    this.last = false;
	}

	Modal.prototype.open = function(){
	    var _this = this;
	    this.html.on('click',function(e){
		if(!$(e.target).closest($('.modal__content', _this.html)).length && Lampa.DeviceInput.canClick(e.originalEvent)) window.history.back();
	    })

	    this.title(this.active.title);

	    this.html.toggleClass('modal--medium', this.active.size === 'medium');
	    this.html.toggleClass('modal--large', this.active.size === 'large');
	    this.html.toggleClass('modal--full', this.active.size === 'full');
	    this.html.toggleClass('modal--overlay', !!this.active.overlay);
	    this.html.toggleClass('modal--align-center', this.active.align === 'center');

	    if(this.active.zIndex) this.html.css('z-index', this.active.zIndex);


	    this.scroll.render().toggleClass('layer--height', this.active.size === 'full')

	    this.html.find('.modal__body').append(this.scroll.render())

	    this.bind(this.active.html);

	    this.scroll.onWheel = function(step){
		this.roll(step > 0 ? 'down' : 'up');
	    }
	    this.scroll.append(this.active.html);
	    if(this.active.buttons) this.buttons();
	    $('body').append(this.html);
	    this.max();
	    this.toggle(this.active.select);
	}

	Modal.prototype.max = function(){
	    this.scroll.render().find('.scroll__content').css('max-height',  Math.round(window.innerHeight - this.scroll.render().offset().top - (window.innerHeight * 0.1)) + 'px');
	}

	Modal.prototype.buttons = function(){
	    var footer = $('<div class="modal__footer"></div>');
	    this.active.buttons.forEach(function(button){
		var btn = $('<div class="modal__button selector" style="width: 50%;text-align: center"></div>');
		btn.text(button.name);
		btn.on('click hover:enter',function(){
		    button.onSelect();
		});
		footer.append(btn);
	    });
	    this.scroll.append(footer);
	}

	Modal.prototype.bind = function(where){
	    where.find('.selector')
		.on('hover:focus',function(e){
		    this.last = e.target;
		    this.scroll.update($(e.target));
		})
		.on('hover:enter',function(e){
		    this.last = e.target;
		    if(this.active.onSelect) this.active.onSelect($(e.target));
		})
	    ;
	}

	Modal.prototype.jump = function(tofoward){
	    var select = this.scroll.render().find('.selector.focus');

	    if(tofoward) select = select.nextAll().filter('.selector');
	    else		 select = select.prevAll().filter('.selector');

	    select = select.slice(0,10);
	    select = select.last();

	    if(select.length){
		Lampa.Controller.collectionFocus(this.select[0],this.scroll.render());
	    }
	}

	Modal.prototype.roll = function(direction){
	    var select = this.scroll.render().find('.selector');

	    if(select.length){
		Navigator.move(direction);
	    }
	    else{
		var step = Math.round(window.innerHeight * 0.15);

		this.scroll.wheel(direction === 'down' ? step : -step);
	    }
	}

	Modal.prototype.toggle = function(need_select){
	    var _this = this;
	    Lampa.Controller.add('Modal-' + this.id, {
		invisible: true,
		toggle: function(){
		    Lampa.Controller.collectionSet(_this.scroll.render());
		    Lampa.Controller.collectionFocus(need_select || _this.last, _this.scroll.render());

		    Lampa.Layer.visible(_this.scroll.render(true));
		},
		up: function(){
		    _this.roll('up');
		},
		down: function(){
		    _this.roll('down');
		},
		right: function(){
		    if(Navigator.canmove('right')) Navigator.move('right');
		    else _this.jump(true);
		},
		left: function(){
		    if(Navigator.canmove('left')) Navigator.move('left');
		    else _this.jump(false);
		},
		back: function(){
		    if(_this.active.onBack) _this.active.onBack();
		}
	    });
	    Lampa.Controller.toggle('Modal-' + this.id);
	}

	Modal.prototype.update = function(new_html) {
	    this.last = false;
	    this.scroll.clear();
	    this.scroll.append(new_html);
	    this.bind(new_html);
	    this.max();
	    this.toggle(this.active.select);
	}

	Modal.prototype.title = function(title){
	    this.html.find('.modal__title').text(title);
	    this.html.toggleClass('modal--empty-title',!title);
	}

	Modal.prototype.destroy = function(){
	    this.last = false;
	    this.scroll.destroy();
	    this.html.remove();
	}

	Modal.prototype.close = function(){
	    this.destroy();
	}

	Modal.prototype.render = function(){
	    return this.html;
	}
	return Modal;
    }();

    Lampa.Lang.add({
	ts_preload_preload: {
	    en: 'Preload',
	    ru: 'Предзагрузка',
	    be: 'Перадзагрузка',
	    uk: 'Передзавантаження',
	    pt: 'Pré-carregar',
	    zh: '预加载'
	},
	ts_preload_speed: {
	    en: 'Speed',
	    ru: 'Скорость загрузки',
	    be: 'Хуткасць загрузкі',
	    uk: 'Швидкість',
	    pt: 'Velocidade',
	    zh: '速度'
	},
	ts_preload_seeds: {
	    en: 'seeds',
	    ru: 'раздают',
	    be: 'раздаюць',
	    uk: 'роздають',
	    pt: 'entregam',
	    zh: '种子数'
	},
	ts_preload_peers: {
	    en: 'Peers',
	    ru: 'Подключились',
	    be: 'Падключыліся',
	    uk: 'Підключилися',
	    pt: 'Conectado',
	    zh: '连接数'
	}
    });
    function tsIP(){
	// Для поддержки верссии 1.6.5
	return (!!Lampa.Torserver && !!Lampa.Torserver.ip)
	    ? Lampa.Torserver.ip()
	    : Lampa.Storage.get(Lampa.Storage.field('torrserver_use_link') === 'two' ? 'torrserver_url_two' : 'torrserver_url');
    }
    if (!!Lampa.Torserver && !!Lampa.Torserver.stream && !!Lampa.Torserver.url) {
	// Для отключения ламповой предзагрузки, формируем ссылку без &preload
	Lampa.Torserver.stream = function(path, hash, id) {
	    return Lampa.Torserver.url() + '/stream/'+ encodeURIComponent(path.split('\\').pop().split('/').pop()) +'?link=' + hash + '&index=' + id + '&play'
	}
    }
    var lampaPlay = Lampa.Player.play;
    var lampaCallback = Lampa.Player.callback;
    var lampaPlaylist = Lampa.Player.playlist;
    var lampaStat = Lampa.Player.stat;
    var player = null;
    var Player = /** @class */function(){
	function Player(data) {
	    data.url = parseUrl(data.url).clearUrl + '&play';
	    this.playerData = data;
	    this.playList = null;
	    this.statUrl = null;
	    this.callback = null;
	}
	Player.prototype.setPlayList = function(playlist){
	    playlist.map(function(data){data.url = parseUrl(data.url).clearUrl + '&play'});
	    this.playList = playlist;
	};
	Player.prototype.setStatUrl = function(url){this.statUrl = url};
	Player.prototype.setCallback = function(callback){this.callback = callback};
	Player.prototype.play = function(){
	    lampaPlay(this.playerData);
	    this.playList && lampaPlaylist(this.playList);
	    this.callback && lampaCallback(this.callback);
	    this.statUrl && lampaStat(this.statUrl);
	    player = null;
	}
	return Player;
    }();

    Lampa.Player.playlist = function(playlist) {
	if (player) player.setPlayList(playlist);
	else lampaPlaylist(playlist);
    };
    Lampa.Player.stat = function(url) {
	if (player) player.setStatUrl(url);
	else lampaStat(url);
    };
    Lampa.Player.callback = function(callback) {
	if (player) player.setCallback(callback);
	else lampaCallback(callback);
    };
    Lampa.Player.play = function(data) {
	if (Lampa.Storage.field('torrserver_preload')
	    && data.url
	    && tsIP()
	    && data.url.indexOf(tsIP()) > -1
	    && ( /* Установлена опция плеера "Начать с начала" или таймкод меньше минуты */
		Lampa.Storage.field('player_timecode') === 'again'
		|| !data.timeline || !data.timeline.time
		|| parseFloat('0' + data.timeline.time) < 60
		|| true // nikk говорит включать, если что есть кнопка запуска плеера (возможно нужна опция)
	    )
	) preload(data);
	else lampaPlay(data);
    };
    function params(obj) {
	var prop, pairs = [];
	for (prop in obj) pairs.push(prop + (obj[prop] ? '=' + obj[prop] : ''));
	return pairs.join('&');
    }
    function parseUrl(url) {
	var m, base_url, stream, args, arg = {};
	if (!!(m = url.match(/^(https?:\/\/.+?)(\/stream\/[^?]+)\?(.+)$/i))) {
	    base_url = m[1];
	    stream = m[2];
	    args = m[3];
	    args.split('&').map(function(v){var p=v.split('=');arg[p[0]] = p[1] || null;});
	    delete(arg['play']);delete(arg['preload']);delete(arg['stat']);
	}
	args = params(arg);
	return {
	    clearUrl: base_url + stream + '?' + args,
	    base_url: base_url,
	    stream: stream,
	    args: '?' + args,
	    arg: arg
	}
    }

    function preload(data) {
	var u = parseUrl(data.url);
	if (!u.arg.link) return lampaPlay(data);
	player = new Player(data);
	var controller = Lampa.Controller.enabled().name;
	var network = new Lampa.Reguest();
	var modalHtml = $('<div>' + '<div class="broadcast__text" style="text-align: left"><span class="js-peer">&nbsp;</span><br><span class="js-buff">&nbsp;</span><br><span class="js-speed">&nbsp;</span></div>' + '<div class="broadcast__scan"><div></div></div>' + '</div>');
	var peer = modalHtml.find('.js-peer');
	var buff = modalHtml.find('.js-buff');
	var speed = modalHtml.find('.js-speed');
	var modal = new Modal({
	    title: Lampa.Lang.translate('loading'),
	    html: modalHtml,
	    onBack: cancel,
	    buttons: [
		{
		    name: Lampa.Lang.translate('cancel'),
		    onSelect: cancel
		},
		{
		    name: Lampa.Lang.translate('player_lauch'),
		    onSelect: play
		}
	    ]
	});
	modal.open();
	function destroy() {
	    network.clear();
	    modal.close();
	    Lampa.Controller.toggle(controller);
	}
	function cancel(){
	    if (player) {
		destroy();
		player.callback && player.callback();
		player = null;
	    }
	}
	function play(){
	    if (player) {
		destroy();
		player.play();
	    }
	}
	network.timeout(1800 * 1000); /* 30 минут на предзагрузку (для особо упоротых :D) */
	network.silent(u.clearUrl + '&preload', play, play);
	network.timeout(2000);
	var stat = function(data) {
	    if (!player) return;
	    if (data && data.Torrent) {
		var t = data.Torrent;
		var p = Math.floor((t.preloaded_bytes || 0) * 100 / (t.preload_size || 1));
		peer.html(Lampa.Lang.translate('ts_preload_peers') + ': ' + (t.active_peers || 0) + ' / ' + (t.pending_peers || 0) + ' (' + (t.total_peers || 0) + ') &bull; ' + (t.connected_seeders || 0) + ' - ' + Lampa.Lang.translate('ts_preload_seeds'));
		buff.html(Lampa.Lang.translate('ts_preload_preload') + ': ' + Lampa.Utils.bytesToSize(t.preloaded_bytes || 0) + ' / ' + Lampa.Utils.bytesToSize(t.preload_size || 0) + ' (' + p + '%)');
		speed.text(Lampa.Lang.translate('ts_preload_speed') + ': ' + Lampa.Utils.bytesToSize((t.download_speed || 0) * 8, true));
	    }
	    // network.silent(u.clearUrl + '&stat', function(t){stat({Torrent: t})}, stat);
	    network.silent(u.base_url + '/cache', stat, stat, JSON.stringify({action: 'get', hash: u.arg.link}));
	};
	stat({Torrent: {active_peers:0,pending_peers:0,total_peers:0,connected_seeders:0,preloaded_bytes:0,preload_size:0,download_speed:0}});
    }
})(jQuery, Lampa);

// pubbtorr.js
(function () {
    'use strict';

    function translate() {
      Lampa.Lang.add({
        lme_parser: {
          ru: 'Каталог парсеров',
          en: 'Parsers catalog',
          uk: 'Каталог парсерів',
          zh: '解析器目录' // Chinese translation
        },
        lme_parser_description: {
          ru: 'Нажмите для выбора парсера из ',
          en: 'Click to select a parser from the ',
          uk: 'Натисніть для вибору парсера з ',
          zh: '单击以从可用的 '
        },
        lme_parser_current: {
          ru: 'Текущий выбор:',
          en: 'Current selection:',
          uk: 'Поточний вибір:',
          zh: '当前选择：'
        },
        lme_parser_selected: {
          ru: 'Выбрано',
          en: 'Selected',
          uk: 'Обрано',
          zh: '已选择'
        },
        lme_parser_refresh: {
          ru: 'Обновить проверку',
          en: 'Refresh check',
          uk: 'Оновити перевірку',
          zh: '刷新检测'
        },
        lme_parser_none: {
          ru: 'Не выбран',
          en: 'Not selected',
          uk: 'Не вибрано',
          zh: '未选择'
        },
        lme_parser_none_description: {
          ru: 'Без активного парсера',
          en: 'No active parser',
          uk: 'Без активного парсера',
          zh: '未启用解析器'
        },
        lme_parser_health: {
          ru: 'Индикация состояния парсеров',
          en: 'Parser health indicator',
          uk: 'Індикація стану парсерів',
          zh: '解析器状态指示'
        },
        lme_parser_status_ok: {
          ru: 'Доступен',
          en: 'Available',
          uk: 'Доступний',
          zh: '可用'
        },
        lme_parser_status_auth: {
          ru: 'Ошибка ключа',
          en: 'Auth error',
          uk: 'Помилка ключа',
          zh: '密钥错误'
        },
        lme_parser_status_network: {
          ru: 'Недоступен',
          en: 'Unavailable',
          uk: 'Недоступний',
          zh: '不可用'
        },
        lme_parser_status_unknown: {
          ru: 'Не проверен',
          en: 'Unchecked',
          uk: 'Не перевірено',
          zh: '未检查'
        },
        lme_parser_status_checking: {
          ru: 'Проверка...',
          en: 'Checking...',
          uk: 'Перевірка...',
          zh: '检查中...'
        },
        lme_pubtorr: {
          ru: 'Каталог TorrServer',
          en: 'TorrServer catalog',
          uk: 'Каталог TorrServer',
          zh: '解析器目录' // Chinese translation
        },
        lme_pubtorr_description: {
          ru: 'Бесплатные серверы от проекта LME',
          en: 'Free servers from the LME project',
          uk: 'Безкоштовні сервери від проєкту LME',
          zh: '来自 LME 项目的免费服务器 '
        },
        lme_pubtorr_firstrun: {
          "ru": "Привет! Ты установил плагин LME PubTorr, учти что если стоит Mods's то в разделе парсеров будет ошибка, которая не влияет на работу. Хочешь избавиться - оставь или LME PubTorr или Mods's.",
          "en": "Hello! You have installed the LME PubTorr plugin. Note that if Mods's is enabled, there will be an error in the parsers section that does not affect functionality. If you want to get rid of it, keep either LME PubTorr or Mods's.",
          "uk": "Привіт! Ви встановили плагін LME PubTorr, врахуйте, що якщо активовано Mods's, то в розділі парсерів буде помилка, яка не впливає на роботу. Якщо хочете позбутися - залиште або LME PubTorr, або Mods's.",
          "zh": "你好！你安装了LME PubTorr插件，请注意，如果启用了Mods's，解析器部分将出现错误，但这不会影响功能。如果你想摆脱它，请保留LME PubTorr或Mods's。"
        }
      });
    }
    var Lang = {
      translate: translate
    };

    var parsersInfo = [{
      id: 'lampa_app',
      name: 'Lampa.app',
      settings: {
        url: 'lampa.app',
        key: '',
        parser_torrent_type: 'jackett'
      }
    }, {
      id: 'jacred_viewbox_dev',
      name: 'Viewbox',
      settings: {
        url: 'jacred.viewbox.dev',
        key: 'viewbox',
        parser_torrent_type: 'jackett'
      }
    }, {
      id: 'unknown',
      name: 'Unknown',
      settings: {
        url: '188.119.113.252:9117',
        key: '1',
        parser_torrent_type: 'jackett'
      }
    }, {
      id: 'trs_my_to',
      name: 'Trs.my.to',
      settings: {
        url: 'trs.my.to:9118',
        key: '',
        parser_torrent_type: 'jackett'
      }
    }, {
      id: 'jacred_my_to',
      name: 'Jacred.my.to',
      settings: {
        url: 'jacred.my.to',
        key: '',
        parser_torrent_type: 'jackett'
      }
    }, {
      id: 'jacred',
      name: 'Jac.red',
      settings: {
        url: 'jac.red',
        key: '',
        parser_torrent_type: 'jackett'
      }
    }, {
      id: 'jacred_pro',
      name: 'Jacred.pro',
      settings: {
        url: 'jacred.pro',
        key: '',
        parser_torrent_type: 'jackett'
      }
    }, {
      id: 'jac_red_ru',
      name: 'jac-red.ru',
      settings: {
        url: 'jac-red.ru',
        key: '',
        parser_torrent_type: 'jackett'
      }
    }];

    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _arrayWithoutHoles(r) {
      if (Array.isArray(r)) return _arrayLikeToArray(r);
    }
    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = t, e;
    }
    function _iterableToArray(r) {
      if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function (r) {
          return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread2(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
      }
      return e;
    }
    function _toConsumableArray(r) {
      return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
    }
    function _toPrimitive(t, r) {
      if ("object" != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == typeof i ? i : i + "";
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }

    var STATUS = {
      ok: 'ok',
      authError: 'auth_error',
      networkError: 'network_error',
      unknown: 'unknown',
      checking: 'checking'
    };
    var cache = {
      data: {},
      TTL: 10 * 60 * 1000,
      get: function get(key) {
        var cached = this.data[key];
        if (cached && Date.now() < cached.expiresAt) return cached;
        return null;
      },
      set: function set(key, value) {
        this.data[key] = _objectSpread2(_objectSpread2({}, value), {}, {
          expiresAt: Date.now() + this.TTL
        });
      }
    };
    function getProtocol() {
      if (Lampa.Utils && typeof Lampa.Utils.protocol === 'function') return Lampa.Utils.protocol();
      return location.protocol === 'https:' ? 'https://' : 'http://';
    }
    function createHealthCheckUrl(parser) {
      if (!parser || !parser.settings || !parser.settings.url) return null;
      var settings = parser.settings;
      var parserType = settings.parser_torrent_type || 'jackett';
      var hasProtocol = /^https?:\/\//.test(settings.url);
      var protocol = hasProtocol ? '' : getProtocol();
      var apiKey = '';
      if (parserType === 'prowlarr') apiKey = settings.key || '';else if (settings.url === 'spawn.pp.ua:59117') apiKey = '2';else apiKey = settings.key || '';
      var basePath = parserType === 'prowlarr' ? '/api/v1/health' : '/api/v2.0/indexers/status:healthy/results';
      return "".concat(protocol).concat(settings.url).concat(basePath, "?apikey=").concat(apiKey);
    }
    function cacheKey(parserId, url) {
      return "".concat(parserId, "::").concat(url);
    }
    function statusFromXhr(xhr) {
      if (!xhr) return STATUS.networkError;
      if (xhr.status === 200) return STATUS.ok;
      if (xhr.status === 401) return STATUS.authError;
      return STATUS.networkError;
    }
    function checkAlive(parsers) {
      if (!Array.isArray(parsers) || !parsers.length) return Promise.resolve({});
      var results = {};
      var requests = parsers.map(function (parser) {
        return new Promise(function (resolve) {
          var url = createHealthCheckUrl(parser);
          var parserId = parser.id || parser.name || 'unknown';
          if (!url) {
            results[parserId] = STATUS.unknown;
            resolve();
            return;
          }
          var key = cacheKey(parserId, url);
          var cached = cache.get(key);
          if (cached) {
            results[parserId] = cached.status;
            resolve();
            return;
          }
          $.ajax({
            url: url,
            method: 'GET',
            timeout: 5000,
            success: function success(response, textStatus, xhr) {
              var status = statusFromXhr(xhr);
              if (xhr.status === 200 || xhr.status === 401) {
                cache.set(key, {
                  status: status
                });
              }
              results[parserId] = status;
              resolve();
            },
            error: function error(xhr) {
              results[parserId] = statusFromXhr(xhr);
              resolve();
            }
          });
        });
      });
      return Promise.allSettled(requests).then(function () {
        return results;
      });
    }

    var STORAGE_KEY = 'lme_url_two';
    var NO_PARSER_ID = 'no_parser';
    function getSelectedParserId() {
      return Lampa.Storage.get(STORAGE_KEY, NO_PARSER_ID);
    }
    function getParserById(parserId) {
      return parsersInfo.find(function (parser) {
        return parser.id === parserId;
      });
    }
    function applySelectedParser() {
      var parserId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getSelectedParserId();
      var selectedParser = getParserById(parserId);
      if (!selectedParser || !selectedParser.settings) {
        if (parserId !== NO_PARSER_ID) console.warn('PubTorr: parser not found', parserId);
        return false;
      }
      var settings = selectedParser.settings;
      var parserType = settings.parser_torrent_type || 'jackett';
      Lampa.Storage.set(parserType === 'prowlarr' ? 'prowlarr_url' : 'jackett_url', settings.url);
      Lampa.Storage.set(parserType === 'prowlarr' ? 'prowlarr_key' : 'jackett_key', settings.key || '');
      Lampa.Storage.set('parser_torrent_type', parserType);
      return true;
    }

    var HEALTH_KEY$1 = 'lme_parser_health';
    var STATUS_CLASS = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, STATUS.ok, 'status-ok'), STATUS.authError, 'status-auth-error'), STATUS.networkError, 'status-network-error'), STATUS.unknown, 'status-unknown'), STATUS.checking, 'status-checking');
    function statusLabel(status) {
      switch (status) {
        case STATUS.ok:
          return Lampa.Lang.translate('lme_parser_status_ok');
        case STATUS.authError:
          return Lampa.Lang.translate('lme_parser_status_auth');
        case STATUS.networkError:
          return Lampa.Lang.translate('lme_parser_status_network');
        case STATUS.checking:
          return Lampa.Lang.translate('lme_parser_status_checking');
        default:
          return Lampa.Lang.translate('lme_parser_status_unknown');
      }
    }
    function applyStatus(item, status) {
      var classes = Object.values(STATUS_CLASS).join(' ');
      item.removeClass(classes);
      item.addClass(STATUS_CLASS[status] || STATUS_CLASS[STATUS.unknown]);
      item.find('.pubtorr-parser-modal__status').text(statusLabel(status));
    }
    function applySelection(list, selectedId) {
      list.find('.pubtorr-parser-modal__item').removeClass('is-selected');
      list.find("[data-parser-id=\"".concat(selectedId, "\"]")).addClass('is-selected');
    }
    function buildItem(parser) {
      var item = $("<div class=\"pubtorr-parser-modal__item selector status-unknown\" data-parser-id=\"".concat(parser.id, "\">\n        <div class=\"pubtorr-parser-modal__info\">\n            <div class=\"pubtorr-parser-modal__name\">").concat(parser.name, "</div>\n        </div>\n        <div class=\"pubtorr-parser-modal__status\"></div>\n    </div>"));
      applyStatus(item, STATUS.unknown);
      return item;
    }
    function updateCurrentLabel(wrapper, selectedId, parsers) {
      var current = parsers.find(function (parser) {
        return parser.id === selectedId;
      });
      var label = current ? current.name : Lampa.Lang.translate('lme_parser_none');
      wrapper.find('.pubtorr-parser-modal__current-value').text(label);
    }
    function updateSettingsSelectedLabel(selectedId, parsers) {
      var current = parsers.find(function (parser) {
        return parser.id === selectedId;
      });
      var label = current ? current.name : Lampa.Lang.translate('lme_parser_none');
      var text = "".concat(Lampa.Lang.translate('lme_parser_selected'), ": ").concat(label);
      $('.pubtorr-parser-selected').text(text);
    }
    function openParserModal() {
      var parsers = [{
        id: NO_PARSER_ID,
        name: Lampa.Lang.translate('lme_parser_none')
      }].concat(_toConsumableArray(parsersInfo));
      var selectedId = getSelectedParserId();
      var modal = $("<div class=\"pubtorr-parser-modal\">\n        <div class=\"pubtorr-parser-modal__head\">\n            <div class=\"pubtorr-parser-modal__current\">\n                <div class=\"pubtorr-parser-modal__current-label\">".concat(Lampa.Lang.translate('lme_parser_current'), "</div>\n                <div class=\"pubtorr-parser-modal__current-value\"></div>\n            </div>\n            <div class=\"pubtorr-parser-modal__actions\">\n                <div class=\"pubtorr-parser-modal__action selector\">").concat(Lampa.Lang.translate('lme_parser_refresh'), "</div>\n            </div>\n        </div>\n        <div class=\"pubtorr-parser-modal__list\"></div>\n        <div class=\"pubtorr-parser-modal__legend\">\n            <div class=\"pubtorr-parser-modal__legend-item status-ok\">").concat(Lampa.Lang.translate('lme_parser_status_ok'), "</div>\n            <div class=\"pubtorr-parser-modal__legend-item status-auth-error\">").concat(Lampa.Lang.translate('lme_parser_status_auth'), "</div>\n            <div class=\"pubtorr-parser-modal__legend-item status-network-error\">").concat(Lampa.Lang.translate('lme_parser_status_network'), "</div>\n            <div class=\"pubtorr-parser-modal__legend-item status-unknown\">").concat(Lampa.Lang.translate('lme_parser_status_unknown'), "</div>\n        </div>\n    </div>"));
      var list = modal.find('.pubtorr-parser-modal__list');
      var refreshAction = modal.find('.pubtorr-parser-modal__action');
      var healthEnabled = Lampa.Storage.get(HEALTH_KEY$1, true);
      parsers.forEach(function (parser) {
        var item = buildItem(parser);
        item.on('hover:enter', function () {
          Lampa.Storage.set(STORAGE_KEY, parser.id);
          applySelection(list, parser.id);
          updateCurrentLabel(modal, parser.id, parsers);
          updateSettingsSelectedLabel(parser.id, parsers);
          applySelectedParser(parser.id);
        });
        list.append(item);
      });
      applySelection(list, selectedId);
      updateCurrentLabel(modal, selectedId, parsers);
      updateSettingsSelectedLabel(selectedId, parsers);
      var actionableItems = list.find('.pubtorr-parser-modal__item').first();
      Lampa.Modal.open({
        title: Lampa.Lang.translate('lme_parser'),
        html: modal,
        size: 'medium',
        scroll_to_center: true,
        select: actionableItems,
        onBack: function onBack() {
          Lampa.Modal.close();
          Lampa.Controller.toggle('settings_component');
        }
      });
      if (!healthEnabled) {
        refreshAction.addClass('hide');
        modal.find('.pubtorr-parser-modal__legend').addClass('hide');
        return;
      }
      var parserItems = list.find('.pubtorr-parser-modal__item').not("[data-parser-id=\"".concat(NO_PARSER_ID, "\"]"));
      parserItems.each(function () {
        applyStatus($(this), STATUS.checking);
      });
      var runChecks = function runChecks() {
        parserItems.each(function () {
          applyStatus($(this), STATUS.checking);
        });
        checkAlive(parsersInfo).then(function (statusMap) {
          parserItems.each(function () {
            var item = $(this);
            var parserId = item.data('parserId');
            var status = statusMap[parserId] || STATUS.unknown;
            applyStatus(item, status);
          });
        });
      };
      refreshAction.on('hover:enter', function () {
        runChecks();
      });
      runChecks();
    }

    var HEALTH_KEY = 'lme_parser_health';
    function parserSetting() {
      Lampa.SettingsApi.addParam({
        component: 'parser',
        param: {
          name: 'lme_parser_manage',
          type: 'button'
        },
        field: {
          name: Lampa.Lang.translate('lme_parser'),
          description: "".concat(Lampa.Lang.translate('lme_parser_description'), " ").concat(parsersInfo.length, "<div class=\"pubtorr-parser-selected\"></div>")
        },
        onChange: function onChange() {
          openParserModal();
        },
        onRender: function onRender(item) {
          var selectedId = Lampa.Storage.get('lme_url_two', 'no_parser');
          var current = parsersInfo.find(function (parser) {
            return parser.id === selectedId;
          });
          var label = current ? current.name : Lampa.Lang.translate('lme_parser_none');
          item.find('.pubtorr-parser-selected').text("".concat(Lampa.Lang.translate('lme_parser_selected'), ": ").concat(label));
          setTimeout(function () {
            var parserUse = $('div[data-name="parser_use"]').first();
            if (parserUse.length) item.insertAfter(parserUse);
            if (Lampa.Storage.field('parser_use')) item.show();else item.hide();
          });
        }
      });
      Lampa.SettingsApi.addParam({
        component: 'parser',
        param: {
          name: HEALTH_KEY,
          type: 'trigger',
          "default": true
        },
        field: {
          name: Lampa.Lang.translate('lme_parser_health')
        },
        onRender: function onRender(item) {
          setTimeout(function () {
            var manage = $('div[data-name="lme_parser_manage"]').first();
            if (manage.length) item.insertAfter(manage);
            if (Lampa.Storage.field('parser_use')) item.show();else item.hide();
          });
        }
      });
    }
    var Parser = {
      parserSetting: parserSetting
    };

    Lampa.Platform.tv();
    function add() {
      Lang.translate();
      Lampa.Template.add('pubtorr_style', "\n        <style>\n            .pubtorr-parser-modal{--pubtorr-status-ok:#19c37d;--pubtorr-status-auth:#ff4d4f;--pubtorr-status-network:#ff4d4f;--pubtorr-status-unknown:#8c8c8c;--pubtorr-status-checking:#f5a623;--pubtorr-selected-border:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;gap:1em}.pubtorr-parser-modal__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;gap:1em}.pubtorr-parser-modal__current-label{font-size:.9em;opacity:.7}.pubtorr-parser-modal__current-value{font-size:1.1em}.pubtorr-parser-modal__action{padding:.5em .9em;-webkit-border-radius:.6em;border-radius:.6em;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2)}.pubtorr-parser-modal__action.focus{border-color:var(--pubtorr-selected-border)}.pubtorr-parser-modal__list{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;gap:.6em}.pubtorr-parser-modal__item{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;gap:1em;padding:.8em 1em .8em 1.8em;-webkit-border-radius:.7em;border-radius:.7em;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08)}.pubtorr-parser-modal__item::before{content:'';position:absolute;left:.8em;top:50%;width:.55em;height:.55em;-webkit-border-radius:50%;border-radius:50%;background:var(--pubtorr-status-color,var(--pubtorr-status-unknown));-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);-webkit-box-shadow:0 0 .6em rgba(0,0,0,0.3);box-shadow:0 0 .6em rgba(0,0,0,0.3)}.pubtorr-parser-modal__item.is-selected,.pubtorr-parser-modal__item.focus{border-color:var(--pubtorr-selected-border)}.pubtorr-parser-modal__info{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;gap:.25em;min-width:0}.pubtorr-parser-modal__name{font-size:1em}.pubtorr-parser-modal__status{font-size:.8em;opacity:.7;text-align:right;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.pubtorr-parser-modal__legend{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:.8em 1.2em;font-size:.85em;opacity:.7}.pubtorr-parser-modal__legend-item{position:relative;padding-left:1.2em}.pubtorr-parser-modal__legend-item::before{content:'';position:absolute;left:0;top:.55em;width:.5em;height:.5em;-webkit-border-radius:50%;border-radius:50%;background:var(--pubtorr-status-color,var(--pubtorr-status-unknown))}.pubtorr-parser-modal__item.status-ok,.pubtorr-parser-modal__legend-item.status-ok{--pubtorr-status-color:var(--pubtorr-status-ok)}.pubtorr-parser-modal__item.status-auth-error,.pubtorr-parser-modal__legend-item.status-auth-error{--pubtorr-status-color:var(--pubtorr-status-auth)}.pubtorr-parser-modal__item.status-network-error,.pubtorr-parser-modal__legend-item.status-network-error{--pubtorr-status-color:var(--pubtorr-status-network)}.pubtorr-parser-modal__item.status-unknown,.pubtorr-parser-modal__legend-item.status-unknown{--pubtorr-status-color:var(--pubtorr-status-unknown)}.pubtorr-parser-modal__item.status-checking{--pubtorr-status-color:var(--pubtorr-status-checking)}@media(max-width:600px){.pubtorr-parser-modal__head{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.pubtorr-parser-modal__item{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.pubtorr-parser-modal__status{text-align:left}}\n        </style>\n    ");
      $('body').append(Lampa.Template.get('pubtorr_style', {}, true));
      Parser.parserSetting();
    }
    function startPlugin() {
      window.plugin_lmepublictorr_ready = true;
      if (window.appready) add();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type === 'ready') add();
        });
      }
    }
    if (!window.plugin_lmepublictorr_ready) startPlugin();

})();

// tracks.js
(function () {
    'use strict';

    var connect_host = '{localhost}';
    var list_opened = false;

    function reguest(params, callback) {
      if (params.ffprobe && params.path.split('.').pop() !== 'mp4') {
        setTimeout(function () {
          callback({
            streams: params.ffprobe
          });
        }, 200);
      } else {
        if (connect_host == '{localhost}') connect_host = '185.204.0.61';
        var socket = new WebSocket('ws://' + connect_host + ':8080/?' + params.torrent_hash + '&index=' + params.id);
        socket.addEventListener('message', function (event) {
          socket.close();
          var json = {};

          try {
            json = JSON.parse(event.data);
          } catch (e) {}

          if (json.streams) callback(json);
        });
      }
    }

    function subscribeTracks(data) {
      var inited = false;
      var inited_parse = false;
      var webos_replace = {};

      function log() {
        console.log.apply(console.log, arguments);
      }

      function getTracks() {
        var video = Lampa.PlayerVideo.video();
        return video.audioTracks || [];
      }

      function getSubs() {
        var video = Lampa.PlayerVideo.video();
        return video.textTracks || [];
      }

      log('Tracks', 'start');

      function setTracks() {
        if (inited_parse) {
          var new_tracks = [];
          var video_tracks = getTracks();
          var parse_tracks = inited_parse.streams.filter(function (a) {
            return a.codec_type == 'audio';
          });
          var minus = 1;
          log('Tracks', 'set tracks:', video_tracks.length);
          if (parse_tracks.length !== video_tracks.length) parse_tracks = parse_tracks.filter(function (a) {
            return a.codec_name !== 'dts';
          });
          parse_tracks = parse_tracks.filter(function (a) {
            return a.tags;
          });
          log('Tracks', 'filtred tracks:', parse_tracks.length);
          parse_tracks.forEach(function (track) {
            var orig = video_tracks[track.index - minus];
            var elem = {
              index: track.index - minus,
              language: track.tags.language,
              label: track.tags.title || track.tags.handler_name,
              ghost: orig ? false : true,
              selected: orig ? orig.selected == true || orig.enabled == true : false
            };
            console.log('Tracks', 'tracks original', orig);
            Object.defineProperty(elem, "enabled", {
              set: function set(v) {
                if (v) {
                  var aud = getTracks();
                  var trk = aud[elem.index];

                  for (var i = 0; i < aud.length; i++) {
                    aud[i].enabled = false;
                    aud[i].selected = false;
                  }

                  if (trk) {
                    trk.enabled = true;
                    trk.selected = true;
                  }
                }
              },
              get: function get() {}
            });
            new_tracks.push(elem);
          });
          if (parse_tracks.length) Lampa.PlayerPanel.setTracks(new_tracks);
        }
      }

      function setSubs() {
        if (inited_parse) {
          var new_subs = [];
          var video_subs = getSubs();
          var parse_subs = inited_parse.streams.filter(function (a) {
            return a.codec_type == 'subtitle';
          });
          var minus = inited_parse.streams.filter(function (a) {
            return a.codec_type == 'audio';
          }).length + 1;
          log('Tracks', 'set subs:', video_subs.length);
          parse_subs = parse_subs.filter(function (a) {
            return a.tags;
          });
          log('Tracks', 'filtred subs:', parse_subs.length);
          parse_subs.forEach(function (track) {
            var orig = video_subs[track.index - minus];
            var elem = {
              index: track.index - minus,
              language: track.tags.language,
              label: track.tags.title || track.tags.handler_name,
              ghost: video_subs[track.index - minus] ? false : true,
              selected: orig ? orig.selected == true || orig.mode == 'showing' : false
            };
            console.log('Tracks', 'subs original', orig);
            Object.defineProperty(elem, "mode", {
              set: function set(v) {
                if (v) {
                  var txt = getSubs();
                  var sub = txt[elem.index];

                  for (var i = 0; i < txt.length; i++) {
                    txt[i].mode = 'disabled';
                    txt[i].selected = false;
                  }

                  if (sub) {
                    sub.mode = 'showing';
                    sub.selected = true;
                  }
                }
              },
              get: function get() {}
            });
            new_subs.push(elem);
          });
          if (parse_subs.length) Lampa.PlayerPanel.setSubs(new_subs);
        }
      }

      function listenTracks() {
        log('Tracks', 'tracks video event');
        setTracks();
        Lampa.PlayerVideo.listener.remove('tracks', listenTracks);
      }

      function listenSubs() {
        log('Tracks', 'subs video event');
        setSubs();
        Lampa.PlayerVideo.listener.remove('subs', listenSubs);
      }

      function canPlay() {
        log('Tracks', 'canplay video event');
        if (webos_replace.tracks) setWebosTracks(webos_replace.tracks);else setTracks();
        if (webos_replace.subs) setWebosSubs(webos_replace.subs);else setSubs();
        Lampa.PlayerVideo.listener.remove('canplay', canPlay);
      }

      function setWebosTracks(video_tracks) {
        if (inited_parse) {
          var parse_tracks = inited_parse.streams.filter(function (a) {
            return a.codec_type == 'audio';
          });
          log('Tracks', 'webos set tracks:', video_tracks.length);

          if (parse_tracks.length !== video_tracks.length) {
            parse_tracks = parse_tracks.filter(function (a) {
              return a.codec_name !== 'truehd';
            });

            if (parse_tracks.length !== video_tracks.length) {
              parse_tracks = parse_tracks.filter(function (a) {
                return a.codec_name !== 'dts';
              });
            }
          }

          parse_tracks = parse_tracks.filter(function (a) {
            return a.tags;
          });
          log('Tracks', 'webos tracks', video_tracks);
          parse_tracks.forEach(function (track, i) {
            if (video_tracks[i]) {
              video_tracks[i].language = track.tags.language;
              video_tracks[i].label = track.tags.title || track.tags.handler_name;
            }
          });
        }
      }

      function setWebosSubs(video_subs) {
        if (inited_parse) {
          var parse_subs = inited_parse.streams.filter(function (a) {
            return a.codec_type == 'subtitle';
          });
          log('Tracks', 'webos set subs:', video_subs.length);
          if (parse_subs.length !== video_subs.length - 1) parse_subs = parse_subs.filter(function (a) {
            return a.codec_name !== 'hdmv_pgs_subtitle';
          });
          parse_subs = parse_subs.filter(function (a) {
            return a.tags;
          });
          parse_subs.forEach(function (track, a) {
            var i = a + 1;

            if (video_subs[i]) {
              video_subs[i].language = track.tags.language;
              video_subs[i].label = track.tags.title || track.tags.handler_name;
            }
          });
        }
      }

      function listenWebosSubs(_data) {
        log('Tracks', 'webos subs event');
        webos_replace.subs = _data.subs;
        if (inited_parse) setWebosSubs(_data.subs);
      }

      function listenWebosTracks(_data) {
        log('Tracks', 'webos tracks event');
        webos_replace.tracks = _data.tracks;
        if (inited_parse) setWebosTracks(_data.tracks);
      }

      function listenStart() {
        inited = true;
        reguest(data, function (result) {
          log('Tracks', 'parsed', inited_parse);
          inited_parse = result;

          if (inited) {
            if (webos_replace.subs) setWebosSubs(webos_replace.subs);else setSubs();
            if (webos_replace.tracks) setWebosTracks(webos_replace.tracks);else setTracks();
          }
        });
      }

      function listenDestroy() {
        inited = false;
        Lampa.Player.listener.remove('destroy', listenDestroy);
        Lampa.PlayerVideo.listener.remove('tracks', listenTracks);
        Lampa.PlayerVideo.listener.remove('subs', listenSubs);
        Lampa.PlayerVideo.listener.remove('webos_subs', listenWebosSubs);
        Lampa.PlayerVideo.listener.remove('webos_tracks', listenWebosTracks);
        Lampa.PlayerVideo.listener.remove('canplay', canPlay);
        log('Tracks', 'end');
      }

      Lampa.Player.listener.follow('destroy', listenDestroy);
      Lampa.PlayerVideo.listener.follow('tracks', listenTracks);
      Lampa.PlayerVideo.listener.follow('subs', listenSubs);
      Lampa.PlayerVideo.listener.follow('webos_subs', listenWebosSubs);
      Lampa.PlayerVideo.listener.follow('webos_tracks', listenWebosTracks);
      Lampa.PlayerVideo.listener.follow('canplay', canPlay);
      listenStart();
    }

    function parseMetainfo(data) {
      var loading = Lampa.Template.get('tracks_loading');
      data.item.after(loading);
      reguest(data.element, function (result) {
        if (list_opened) {
          var append = function append(name, fields) {
            if (fields.length) {
              var block = Lampa.Template.get('tracks_metainfo_block', {});
              block.find('.tracks-metainfo__label').text(Lampa.Lang.translate(name == 'video' ? 'extensions_hpu_video' : name == 'audio' ? 'player_tracks' : 'player_' + name));
              fields.forEach(function (data) {
                var item = $('<div class="tracks-metainfo__item tracks-metainfo__item--' + name + ' selector"></div>');
                item.on('hover:focus', function (e) {
                  Lampa.Modal.scroll().update(item);
                });

                for (var i in data) {
                  var div = $('<div class="tracks-metainfo__column--' + i + '"></div>');
                  div.text(data[i]);
                  item.append(div);
                }

                block.find('.tracks-metainfo__info').append(item);
              });
              html.append(block);
            }
          };

          var video = [];
          var audio = [];
          var subs = [];
          var codec_video = result.streams.filter(function (a) {
            return a.codec_type == 'video';
          });
          var codec_audio = result.streams.filter(function (a) {
            return a.codec_type == 'audio';
          });
          var codec_subs = result.streams.filter(function (a) {
            return a.codec_type == 'subtitle';
          });
          codec_video.slice(0, 1).forEach(function (v) {
            var line = {};
            if (v.width && v.height) line.video = v.width + 'х' + v.height;

            if (v.duration) {
              line.duration = new Date(v.duration * 1000).toISOString().slice(11, 19);
            } else if (v.tags) {
              if (v.tags.DURATION) {
                line.duration = v.tags.DURATION ? v.tags.DURATION.split(".") : '';
                line.duration.pop();
              } else if (v.tags["DURATION-eng"]) {
                line.duration = v.tags["DURATION-eng"] ? v.tags["DURATION-eng"].split(".") : '';
                line.duration.pop();
              }
            }

            if (v.codec_name) line.codec = v.codec_name.toUpperCase();
            if (Boolean(v.is_avc)) line.avc = 'AVC';
            var bit = v.bit_rate ? v.bit_rate : v.tags && (v.tags.BPS || v.tags["BPS-eng"]) ? v.tags.BPS || v.tags["BPS-eng"] : '--';
            line.rate = bit == '--' ? bit : Math.round(bit / 1000000) + ' ' + Lampa.Lang.translate('speed_mb');
            if (Lampa.Arrays.getKeys(line).length) video.push(line);
          });
          codec_audio.forEach(function (a, i) {
            var line = {
              num: i + 1
            };

            if (a.tags) {
              line.lang = (a.tags.language || '').toUpperCase();
            }

            line.name = a.tags ? a.tags.title || a.tags.handler_name : '';
            if (a.codec_name) line.codec = a.codec_name.toUpperCase();
            if (a.channel_layout) line.channels = a.channel_layout.replace('(side)', '').replace('stereo', '2.0').replace('8 channels (FL+FR+FC+LFE+SL+SR+TFL+TFR)', '7.1');
            var bit = a.bit_rate ? a.bit_rate : a.tags && (a.tags.BPS || a.tags["BPS-eng"]) ? a.tags.BPS || a.tags["BPS-eng"] : '--';
            line.rate = bit == '--' ? bit : Math.round(bit / 1000) + ' ' + Lampa.Lang.translate('speed_kb');
            if (Lampa.Arrays.getKeys(line).length) audio.push(line);
          });
          codec_subs.forEach(function (a, i) {
            var line = {
              num: i + 1
            };

            if (a.tags) {
              line.lang = (a.tags.language || '').toUpperCase();
            }

            line.name = a.tags ? a.tags.title || a.tags.handler_name : '';
            if (a.codec_name) line.codec = a.codec_name.toUpperCase().replace('SUBRIP', 'SRT').replace('HDMV_PGS_SUBTITLE', 'HDMV PGS').replace('MOV_TEXT', 'MOV TEXT');
            if (Lampa.Arrays.getKeys(line).length) subs.push(line);
          });
          var html = Lampa.Template.get('tracks_metainfo', {});
          append('video', video);
          append('audio', audio);
          append('subs', subs);
          loading.remove();

          if (video.length || audio.length || subs.length) {
            data.item.after(html);
          }

          if (Lampa.Controller.enabled().name == 'modal') Lampa.Controller.toggle('modal');
        }
      });
    }

    Lampa.Player.listener.follow('start', function (data) {
      if (data.torrent_hash) subscribeTracks(data);
    });
    Lampa.Listener.follow('torrent_file', function (data) {
      if (data.type == 'list_open') list_opened = true;
      if (data.type == 'list_close') list_opened = false;

      if (data.type == 'render' && data.items.length == 1 && list_opened) {
        parseMetainfo(data);
      }
    });
    Lampa.Template.add('tracks_loading', "\n    <div class=\"tracks-loading\">\n        <span>#{loading}...</span>\n    </div>\n");
    Lampa.Template.add('tracks_metainfo', "\n    <div class=\"tracks-metainfo\"></div>\n");
    Lampa.Template.add('tracks_metainfo_block', "\n    <div class=\"tracks-metainfo__line\">\n        <div class=\"tracks-metainfo__label\"></div>\n        <div class=\"tracks-metainfo__info\"></div>\n    </div>\n");
    Lampa.Template.add('tracks_css', "\n    <style>\n    .tracks-loading{margin-top:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-moz-box-align:start;-ms-flex-align:start;align-items:flex-start}.tracks-loading:before{content:'';display:inline-block;width:1.3em;height:1.3em;background:url('./img/loader.svg') no-repeat 50% 50%;-webkit-background-size:contain;-moz-background-size:contain;-o-background-size:contain;background-size:contain;margin-right:.4em}.tracks-loading>span{font-size:1.1em;line-height:1.1}.tracks-metainfo{margin-top:1em}.tracks-metainfo__line+.tracks-metainfo__line{margin-top:2em}.tracks-metainfo__label{opacity:.5;font-weight:600}.tracks-metainfo__info{padding-top:1em;line-height:1.2}.tracks-metainfo__info>div{background-color:rgba(0,0,0,0.22);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.tracks-metainfo__info>div.focus{background-color:rgba(255,255,255,0.06)}.tracks-metainfo__info>div>div{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.tracks-metainfo__info>div>div:not(:last-child){padding-right:1.5em}.tracks-metainfo__info>div+div{margin-top:1em}.tracks-metainfo__column--video,.tracks-metainfo__column--name{margin-right:auto}.tracks-metainfo__column--num{min-width:3em;padding-right:0}.tracks-metainfo__column--rate{min-width:7em;text-align:right}.tracks-metainfo__column--channels{min-width:5em;text-align:right}\n    </style>\n");
    $('body').append(Lampa.Template.get('tracks_css', {}, true));

})();

// youtube-player.js
(function () {
    'use strict';

    function startPlugin(){if(Lampa.Platform.screen('mobile'))return;$('body').append("\n        <style>\n        .player-video__overlay{display:none;background:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0.5)),color-stop(53%,rgba(0,0,0,0.3)),to(rgba(11,13,16,0.8)));background:-webkit-linear-gradient(top,rgba(0,0,0,0.5) 0,rgba(0,0,0,0.3) 53%,rgba(11,13,16,0.8) 100%);background:-moz-linear-gradient(top,rgba(0,0,0,0.5) 0,rgba(0,0,0,0.3) 53%,rgba(11,13,16,0.8) 100%);background:-o-linear-gradient(top,rgba(0,0,0,0.5) 0,rgba(0,0,0,0.3) 53%,rgba(11,13,16,0.8) 100%);background:linear-gradient(to bottom,rgba(0,0,0,0.5) 0,rgba(0,0,0,0.3) 53%,rgba(11,13,16,0.8) 100%);position:absolute;top:0;left:0;width:100%;height:100%}.player:not(.iptv) .player-panel,.player:not(.iptv) .player-info,.player:not(.iptv) .player-footer{background:transparent !important;-webkit-backdrop-filter:unset !important;backdrop-filter:unset !important}.player:not(.iptv) .player-panel__body,.player:not(.iptv) .player-info__body,.player:not(.iptv) .player-footer__body{padding:0}.player:not(.iptv) .player-footer__row{padding:0}.player:not(.iptv) .head-backward{display:none !important}.player:not(.iptv) .player-info__body{padding-left:0 !important;position:relative}.player:not(.iptv) .player-info__name{font-size:1.2em;text-shadow:0 0 .2em rgba(0,0,0,0.5)}.player:not(.iptv) .player-info__title{font-size:2.4em;font-weight:600;line-height:1.4;width:60%;text-shadow:0 0 .2em rgba(0,0,0,0.5);overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.player:not(.iptv) .player-info__values{text-shadow:0 0 .2em rgba(0,0,0,0.5)}.player:not(.iptv) .player-info__values .value--name span{font-weight:600}.player:not(.iptv) .player-info__time{position:absolute;top:.8em;right:0}.player:not(.iptv) .player-panel .button{padding:.9em;width:3em;height:3em}.player:not(.iptv) .player-panel .button.animate-trigger-enter{-webkit-animation:animation-trigger-enter .2s forwards;-moz-animation:animation-trigger-enter .2s forwards;-o-animation:animation-trigger-enter .2s forwards;animation:animation-trigger-enter .2s forwards}.player:not(.iptv) .player-panel .button>svg{width:1.2em;height:1.2em}.player:not(.iptv) .player-panel .button+.button{margin-left:0}.player:not(.iptv) .player-panel__playpause{margin:0;padding:1em !important}.player:not(.iptv) .player-panel__playpause:not(.focus){background:rgba(255,255,255,0.1)}.player:not(.iptv) .player-panel__quality{-webkit-border-radius:5em !important;border-radius:5em !important;padding:0 1em !important}.player:not(.iptv) .player-panel__timeline{margin-bottom:1em}.player:not(.iptv) .player-panel__timeline:not(.focus) .player-panel__position>div::after{display:none}.player:not(.iptv) .player-panel__line-one{margin-bottom:1em;position:relative;z-index:2;text-shadow:0 0 .2em rgba(0,0,0,0.5)}.player:not(.iptv) .player-panel__box-buttons{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;background:rgba(255,255,255,0.1);-webkit-border-radius:4em;border-radius:4em}.player:not(.iptv) .player-panel__box-buttons+.player-panel__box-buttons{margin-left:.5em}.player:not(.iptv) .player-panel__next,.player:not(.iptv) .player-panel__prev{padding:1.1em !important}.player:not(.iptv) .player-panel__next>svg,.player:not(.iptv) .player-panel__prev>svg{width:.8em;height:.8em}.player:not(.iptv) .player-panel__playlist{text-align:center}.player:not(.iptv) .player-panel__playlist>svg{width:1em !important}.player:not(.iptv) .player-video__paused,.player:not(.iptv) .player-video__loader{background-color:rgba(255,255,255,0.1)}.player:not(.iptv) .player-info__values .value--size span{background:rgba(255,255,255,0.1);-webkit-border-radius:1em;border-radius:1em}.player:not(.iptv).player--panel-visible .player-video__overlay{display:block;-webkit-animation:animation-opacity .3s;-moz-animation:animation-opacity .3s;-o-animation:animation-opacity .3s;animation:animation-opacity .3s}.normalization{background:rgba(255,255,255,0.1);-webkit-border-radius:1em;border-radius:1em}.normalization canvas{-webkit-border-radius:1em;border-radius:1em}body.platform--browser .player:not(.iptv) .player-panel__box-buttons,body.platform--browser .player:not(.iptv) .player-panel__playpause:not(.focus),body.platform--browser .player:not(.iptv) .player-info__values .value--size span,body.platform--nw .player:not(.iptv) .player-panel__box-buttons,body.platform--nw .player:not(.iptv) .player-panel__playpause:not(.focus),body.platform--nw .player:not(.iptv) .player-info__values .value--size span,body.glass--style.platform--apple .player:not(.iptv) .player-panel__box-buttons,body.glass--style.platform--apple .player:not(.iptv) .player-panel__playpause:not(.focus),body.glass--style.platform--apple .player:not(.iptv) .player-info__values .value--size span,body.glass--style.platform--apple_tv .player:not(.iptv) .player-panel__box-buttons,body.glass--style.platform--apple_tv .player:not(.iptv) .player-panel__playpause:not(.focus),body.glass--style.platform--apple_tv .player:not(.iptv) .player-info__values .value--size span,body.glass--style.platform--android .player:not(.iptv) .player-panel__box-buttons,body.glass--style.platform--android .player:not(.iptv) .player-panel__playpause:not(.focus),body.glass--style.platform--android .player:not(.iptv) .player-info__values .value--size span{-webkit-backdrop-filter:blur(1em);backdrop-filter:blur(1em)}body.platform--browser .normalization,body.platform--browser .player-video__paused,body.platform--browser .player-video__loader,body.platform--nw .normalization,body.platform--nw .player-video__paused,body.platform--nw .player-video__loader,body.glass--style.platform--apple .normalization,body.glass--style.platform--apple .player-video__paused,body.glass--style.platform--apple .player-video__loader,body.glass--style.platform--apple_tv .normalization,body.glass--style.platform--apple_tv .player-video__paused,body.glass--style.platform--apple_tv .player-video__loader,body.glass--style.platform--android .normalization,body.glass--style.platform--android .player-video__paused,body.glass--style.platform--android .player-video__loader{background-color:rgba(255,255,255,0.1);-webkit-backdrop-filter:blur(1em);backdrop-filter:blur(1em)}\n        </style>\n    ");var render=Lampa.Player.render();var title=$('<div class="player-info__title"></div>');var value=$('<div class="value--name"><span></span></div>');render.find('.player-video__display').after($('<div class="player-video__overlay"></div>'));render.find('.player-panel__center').find('.button:not(.player-panel__playpause)').remove();render.find('.player-panel__timeline').before(render.find('.player-panel__line-one'));render.find('.player-info .player-info__line').before(title);render.find('.value--size').after(value);var box=$('<div class="player-panel__box-buttons"></div>');var right_panel=render.find('.player-panel__right');var left_panel=render.find('.player-panel__left');var right_box_quality=box.clone();var right_box_main=box.clone();var right_box_audio=box.clone();var left_box_main=box.clone();right_panel.append(right_box_audio);right_panel.append(right_box_quality);right_panel.append(right_box_main);right_box_main.append(right_panel.find('.button'));right_box_quality.append(right_panel.find('.player-panel__quality'));right_box_audio.append(right_panel.find('.player-panel__flow'));right_box_audio.append(right_panel.find('.player-panel__subs'));right_box_audio.append(right_panel.find('.player-panel__tracks'));left_panel.prepend(left_box_main);left_box_main.append(left_panel.find('.button'));Lampa.Player.listener.follow('start',function(data){var name=data.title;var head='';if(!data.iptv){if(data.card)head=data.card.title||data.card.name;else if(Lampa.Activity.active().movie){head=Lampa.Activity.active().movie.title||Lampa.Activity.active().movie.name;}}if(!head)head=name;title.text(head).toggleClass('hide',Boolean(data.iptv));render.find('.player-info__name').toggleClass('hide',Boolean(name==head)).toggleClass('hide',true);value.toggleClass('hide',Boolean(name==head)).find('span').text(name);});}if(!window.youtube_player_plugin){window.youtube_player_plugin=true;if(window.appready)startPlugin();else {Lampa.Listener.follow('app',function(e){if(e.type=='ready')startPlugin();});}}

})();


// tricks.js
(function () {
    'use strict';
Lampa.Platform.tv(); 
function add() {
	var a = 's'; 
	function updateT() {
		//var element = $(".view--torrent"); 
		if(Lampa.Storage.field('BUTTONS_fix') == true) {
			//if(element.length > 0) {
					$(".view--onlines_v1", Lampa.Activity.active().activity.render()).empty().append("<svg viewBox='0 0 847 847' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' image-rendering='optimizeQuality' fill-rule='evenodd' clip-rule='evenodd'><circle cx='423' cy='423' r='398' fill='#3498db' class='fill-1fc255'></circle><path d='M642 423 467 322 292 221v404l175-101z' fill='#fff7f7' stroke='#fff7f7' stroke-width='42.33' stroke-linejoin='round' class='fill-fff7f7 stroke-fff7f7'></path></svg><span>MODS's онлайн</span>");
					$(".view--torrent", Lampa.Activity.active().activity.render()).empty().append("<svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 48 48' width='48px' height='48px'><path fill='#4caf50' fill-rule='evenodd' d='M23.501,44.125c11.016,0,20-8.984,20-20 c0-11.015-8.984-20-20-20c-11.016,0-20,8.985-20,20C3.501,35.141,12.485,44.125,23.501,44.125z' clip-rule='evenodd'/><path fill='#fff' fill-rule='evenodd' d='M43.252,27.114C39.718,25.992,38.055,19.625,34,11l-7,1.077 c1.615,4.905,8.781,16.872,0.728,18.853C20.825,32.722,17.573,20.519,15,14l-8,2l10.178,27.081c1.991,0.67,4.112,1.044,6.323,1.044 c0.982,0,1.941-0.094,2.885-0.232l-4.443-8.376c6.868,1.552,12.308-0.869,12.962-6.203c1.727,2.29,4.089,3.183,6.734,3.172 C42.419,30.807,42.965,29.006,43.252,27.114z' clip-rule='evenodd'/></svg><span>Торренты</span>");
					$(".open--menu", Lampa.Activity.active().activity.render()).empty().append("<svg viewBox='0 0 847 847' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' image-rendering='optimizeQuality' fill-rule='evenodd' clip-rule='evenodd'><circle cx='423' cy='423' r='398' fill='#3498db' class='fill-1fc255'></circle><path d='M642 423 467 322 292 221v404l175-101z' fill='#fff7f7' stroke='#fff7f7' stroke-width='42.33' stroke-linejoin='round' class='fill-fff7f7 stroke-fff7f7'></path></svg><span>Смотреть</span>");
					$(".view--trailer", Lampa.Activity.active().activity.render()).empty().append("<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><g><path d='m31.77 234.14c-3.12-3.22-2.66-128.58 0-132 1.83-2.34 186.58-2.34 190.26 0 3.4 2.16 2.48 129.93 0 132-5.5 4.55-186.38 4-190.26 0z' fill='#191919'/><path d='m130.77 245.35h-4.49c-24.1 0-46.88-.35-64.17-.88-32.45-1-33.59-2.18-36.09-4.75s-4.54-4.72-4.42-71.52c0-16.69.25-32.56.61-44.68.69-23 1.49-24 3.26-26.29 2.61-3.34 6.09-3.48 14.52-3.83 5.12-.21 12.4-.4 21.63-.55 17.1-.28 40-.44 64.59-.44s47.61.16 64.93.44c32 .52 32.85 1.08 35.18 2.56 4 2.53 4.44 6.86 4.95 14.94 1 16.3 1.11 49.25.87 72.51-.56 53.77-1.68 54.7-5 57.45-2.44 2-4.06 3.36-36.37 4.32-16.06.46-37.23.72-60 .72zm-92.05-18c26.43 2.62 150.17 2.66 176.21.07 1.41-20.23 2-97 .31-118-27.17-1.42-148.84-1.42-176.47 0-1.58 21.46-1.62 98-.05 117.93z' fill='#191919'/></g><g><path d='m31.77 234.14c-3.12-3.22-2.66-128.58 0-132 1.83-2.34 186.58-2.34 190.26 0 3.4 2.16 2.48 129.93 0 132-5.5 4.55-186.38 4-190.26 0z' fill='#e83a2a'/></g><path d='m223.21 123.51c.74-1.1.94-31.2-1-32-5.6-2.46-186.21-2.29-190.8.49-1.74 1-1.88 30.31-1.1 31.55s192.16 1.06 192.9-.04z' fill='#191919'/><path d='m120.37 132.4c-28.37 0-57.78-.1-75.37-.4-4.73-.07-8.4-.15-10.92-.23-4.74-.16-8.17-.27-10.53-4-1.15-1.83-1.85-2.94-1.65-18 .08-6.37.37-14.77 1.29-18.61a9.26 9.26 0 0 1 4.13-6.05c2.23-1.34 3.46-2.08 34.93-2.73 17-.35 39.77-.57 64.21-.62 24.07 0 46.95.08 64.39.36 31.12.49 32.73 1.19 34.58 2a8.75 8.75 0 0 1 4.92 5.88c.32 1.1 1.31 4.43 1.39 19.28.08 15.72-.65 16.83-1.88 18.66-2.42 3.61-5.14 3.68-12.43 3.86-3.69.09-9 .18-15.88.25-12.8.14-30.33.24-50.71.3-9.57.04-19.94.05-30.47.05zm-82.52-16.48c29.32.63 148.34.59 177.85-.05.09-5.19 0-12.37-.26-17.08-27.44-1.5-150.44-1.22-177.2.41-.3 4.63-.43 11.64-.39 16.72z' fill='#191919'/><path d='m223.21 123.51c.74-1.1.94-31.2-1-32-5.6-2.46-186.21-2.29-190.8.49-1.74 1-1.88 30.31-1.1 31.55s192.16 1.06 192.9-.04z' fill='#fff'/><path d='m28.25 125.61s38.89-36.44 38.35-37.61c-.79-1.66-38-1.52-38.84-.43s-6.56 40.6.49 38.04z' fill='#191919'/><path d='m221.34 51.57c.57-1.2-3.72-29.95-5.73-30.48-5.92-1.58-184.88 24.52-189.04 27.91-1.57 1.32 2.6 30.29 3.56 31.4s190.65-27.63 191.21-28.83z' fill='#191919'/><path d='m30.56 88.4a7.85 7.85 0 0 1 -6.51-2.79c-1.4-1.61-2.25-2.61-4.28-17.56-.86-6.31-1.81-14.67-1.47-18.6a9.26 9.26 0 0 1 3.19-6.6c2-1.66 3.13-2.57 34.23-7.75 16.74-2.79 39.31-6.28 63.55-9.84 23.84-3.5 46.52-6.66 63.87-8.9 30.9-4 32.58-3.53 34.53-3a8.81 8.81 0 0 1 5.78 5.13c1.29 2.78 2.71 8.93 4.22 18.28 2.42 15 1.85 16.23.9 18.23-1.86 3.92-4.4 4.37-11.93 5.69-3.76.66-9.21 1.57-16.2 2.7-13.08 2.11-30.91 4.9-51.56 8.06-36.08 5.55-82.61 12.45-105.23 15.48-4 .54-7.1.93-9.23 1.17a35 35 0 0 1 -3.86.3zm3.83-33.23c.38 4.63 1.29 11.55 2.08 16.56 29.15-3.73 147.12-21.54 176.29-26.59-.68-4.9-1.79-11.49-2.74-15.85-27.27 2.43-149.27 20.41-175.63 25.88z' fill='#191919'/><path d='m221.34 51.57c.57-1.2-3.72-29.95-5.73-30.48-5.92-1.58-184.88 24.52-189.04 27.91-1.57 1.32 2.6 30.29 3.56 31.4s190.65-27.63 191.21-28.83z' fill='#fff'/><path d='m26.57 49s40.36 28.35 40 29.57c-.53 1.76-37.35 7.09-38.35 6.13s-9.01-37.16-1.65-35.7z' fill='#191919'/><path d='m64.63 38.94c-.18 1 43.79 34.37 46 34l37.83-5.62c1.92-.29-44.9-35.19-47.14-34.86s-36.51 5.47-36.69 6.48z' fill='#191919'/><path d='m142.53 27.36c-.18 1 43.79 34.37 46 34l37.83-5.62c1.92-.29-44.9-35.19-47.14-34.86s-36.51 5.48-36.69 6.48z' fill='#191919'/><path d='m70.55 125.77c-.32-1 38.25-40.43 40.51-40.43h38.25c1.94 0-39.22 41.4-41.49 41.4s-36.95 0-37.27-.97z' fill='#191919'/><path d='m149.31 125.77c-.32-1 38.25-40.43 40.51-40.43s34.36.65 34.36 2.59c0 .65-35.33 38.82-37.6 38.82s-36.95-.01-37.27-.98z' fill='#191919'/><g><path d='m129.27 217.89c-15.12 0-30.17-.12-41.29-.32-20.22-.37-20.88-.8-22.06-1.57-1.94-1.25-2.44-3.15-2.83-10.66-.34-6.72-.44-17.33-.24-27 .37-18.14 1.21-18.82 2.74-20 1.37-1.1 1.48-1.19 21-1.39 10.56-.11 24.73-.17 39.89-.17 58.31 0 59.89.63 60.73 1 2.82 1.13 3.22 3.93 3.58 11.09.33 6.65.4 17.33.17 27.21-.11 4.76-.28 8.87-.49 11.87-.33 4.81-.6 7.17-2.91 8.37-1.05.43-3.25 1.57-58.29 1.57z' fill='#fff'/><path d='m126.48 160.7c29 0 58.11.23 59.25.68 2.1.84 1.54 50.47 0 51.27s-28.7 1.25-56.45 1.25c-29.58 0-59.95-.44-61.19-1.25-1.93-1.25-1.65-49.94 0-51.27.57-.45 29.41-.68 58.39-.68m0-8c-15.18 0-29.36.06-39.94.17-5.71.06-10.21.13-13.38.22-5.82.15-7.78.2-10.09 2.06-3.18 2.56-3.44 6.28-3.76 11-.21 3.08-.37 7.26-.47 12.11-.2 9.8-.1 20.53.25 27.33.33 6.48.57 11.15 4.65 13.79 2.21 1.43 2.8 1.81 24.17 2.21 11.14.21 26.22.32 41.37.32 14.62 0 28.17-.11 38.17-.3 19.15-.38 20.09-.87 22-1.84 4.4-2.29 4.72-6.83 5.05-11.64.21-3.06.38-7.22.5-12 .23-10 .16-20.75-.18-27.5-.13-2.55-.29-4.53-.49-6-.25-1.83-.9-6.7-5.6-8.57-1.69-.67-2.2-.88-22.07-1.08-10.71-.11-25-.17-40.15-.17z' fill='#191919'/></g><path d='m83.5 173.88c-5.25 0-5.5 7.75-.5 8.13s79.38.38 82.88 0 5.25-7.5-.37-7.87-75.51-.26-82.01-.26z' fill='#191919'/><path d='m83.5 190.38c-5.25 0-5.5 7.75-.5 8.13s43.38.38 46.88 0 5.25-7.5-.37-7.87-39.51-.26-46.01-.26z' fill='#191919'/></svg><span>Трейлеры</span>");
					$(".view--online", Lampa.Activity.active().activity.render()).empty().append("<svg viewBox='0 0 847 847' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' image-rendering='optimizeQuality' fill-rule='evenodd' clip-rule='evenodd'><circle cx='423' cy='423' r='398' fill='#3498db' class='fill-1fc255'></circle><path d='M642 423 467 322 292 221v404l175-101z' fill='#fff7f7' stroke='#fff7f7' stroke-width='42.33' stroke-linejoin='round' class='fill-fff7f7 stroke-fff7f7'></path></svg><span>Смотреть</span>");
					$(".view--streamv1", Lampa.Activity.active().activity.render()).empty().append("<svg viewBox='0 0 847 847' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' image-rendering='optimizeQuality' fill-rule='evenodd' clip-rule='evenodd'><circle cx='423' cy='423' r='398' fill='#3498db' class='fill-1fc255'></circle><path d='M642 423 467 322 292 221v404l175-101z' fill='#fff7f7' stroke='#fff7f7' stroke-width='42.33' stroke-linejoin='round' class='fill-fff7f7 stroke-fff7f7'></path></svg><span>Смотреть</span>");
					$(".view--bazon", Lampa.Activity.active().activity.render()).empty().append("<svg enable-background='new 0 0 64 64' height='64px' id='Layer_1' version='1.1' viewBox='0 0 64 64' width='64px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><circle cx='32' cy='32' fill='#77B3D4' r='32'/><circle cx='32' cy='33.917' fill='#231F20' opacity='0.2' r='13.083'/><circle cx='32' cy='33.083' fill='#4F5D73' r='13.083'/><circle cx='32' cy='32' fill='#4F5D73' r='13.083'/><g opacity='0.2'><path d='M32,12c-12.15,0-22,9.85-22,22s9.85,22,22,22c12.15,0,22-9.85,22-22S44.15,12,32,12z M14.5,30.5   c0-3.038,2.462-5.5,5.5-5.5c3.037,0,5.5,2.462,5.5,5.5c0,3.037-2.463,5.5-5.5,5.5C16.962,36,14.5,33.537,14.5,30.5z M24.469,49.5   c-3.038,0-5.5-2.463-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5c3.038,0,5.5,2.462,5.5,5.5C29.969,47.037,27.506,49.5,24.469,49.5z    M26.5,21.5c0-3.038,2.462-5.5,5.5-5.5c3.037,0,5.5,2.462,5.5,5.5c0,3.038-2.463,5.5-5.5,5.5C28.962,27,26.5,24.538,26.5,21.5z    M39.469,49.5c-3.038,0-5.5-2.463-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5c3.038,0,5.5,2.462,5.5,5.5   C44.969,47.037,42.506,49.5,39.469,49.5z M44.042,36c-3.038,0-5.5-2.463-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5   c3.037,0,5.5,2.462,5.5,5.5C49.542,33.537,47.079,36,44.042,36z' fill='#231F20'/></g><g><path d='M32,10c-12.15,0-22,9.85-22,22s9.85,22,22,22c12.15,0,22-9.85,22-22S44.15,10,32,10z M14.5,28.5   c0-3.038,2.462-5.5,5.5-5.5c3.037,0,5.5,2.462,5.5,5.5c0,3.038-2.463,5.5-5.5,5.5C16.962,34,14.5,31.538,14.5,28.5z M24.469,47.5   c-3.038,0-5.5-2.463-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5c3.038,0,5.5,2.462,5.5,5.5C29.969,45.037,27.506,47.5,24.469,47.5z    M26.5,19.5c0-3.038,2.462-5.5,5.5-5.5c3.037,0,5.5,2.462,5.5,5.5c0,3.038-2.463,5.5-5.5,5.5C28.962,25,26.5,22.538,26.5,19.5z    M39.469,47.5c-3.038,0-5.5-2.463-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5c3.038,0,5.5,2.462,5.5,5.5   C44.969,45.037,42.506,47.5,39.469,47.5z M44.042,34c-3.038,0-5.5-2.462-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5   c3.037,0,5.5,2.462,5.5,5.5C49.542,31.538,47.079,34,44.042,34z' fill='#FFFFFF'/></g></svg><span>Bazon</span>");
					$(".view--filmixpva", Lampa.Activity.active().activity.render()).empty().append("<svg enable-background='new 0 0 64 64' height='64px' id='Layer_1' version='1.1' viewBox='0 0 64 64' width='64px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><circle cx='32' cy='32' fill='#77B3D4' r='32'/><circle cx='32' cy='33.917' fill='#231F20' opacity='0.2' r='13.083'/><circle cx='32' cy='33.083' fill='#4F5D73' r='13.083'/><circle cx='32' cy='32' fill='#4F5D73' r='13.083'/><g opacity='0.2'><path d='M32,12c-12.15,0-22,9.85-22,22s9.85,22,22,22c12.15,0,22-9.85,22-22S44.15,12,32,12z M14.5,30.5   c0-3.038,2.462-5.5,5.5-5.5c3.037,0,5.5,2.462,5.5,5.5c0,3.037-2.463,5.5-5.5,5.5C16.962,36,14.5,33.537,14.5,30.5z M24.469,49.5   c-3.038,0-5.5-2.463-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5c3.038,0,5.5,2.462,5.5,5.5C29.969,47.037,27.506,49.5,24.469,49.5z    M26.5,21.5c0-3.038,2.462-5.5,5.5-5.5c3.037,0,5.5,2.462,5.5,5.5c0,3.038-2.463,5.5-5.5,5.5C28.962,27,26.5,24.538,26.5,21.5z    M39.469,49.5c-3.038,0-5.5-2.463-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5c3.038,0,5.5,2.462,5.5,5.5   C44.969,47.037,42.506,49.5,39.469,49.5z M44.042,36c-3.038,0-5.5-2.463-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5   c3.037,0,5.5,2.462,5.5,5.5C49.542,33.537,47.079,36,44.042,36z' fill='#231F20'/></g><g><path d='M32,10c-12.15,0-22,9.85-22,22s9.85,22,22,22c12.15,0,22-9.85,22-22S44.15,10,32,10z M14.5,28.5   c0-3.038,2.462-5.5,5.5-5.5c3.037,0,5.5,2.462,5.5,5.5c0,3.038-2.463,5.5-5.5,5.5C16.962,34,14.5,31.538,14.5,28.5z M24.469,47.5   c-3.038,0-5.5-2.463-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5c3.038,0,5.5,2.462,5.5,5.5C29.969,45.037,27.506,47.5,24.469,47.5z    M26.5,19.5c0-3.038,2.462-5.5,5.5-5.5c3.037,0,5.5,2.462,5.5,5.5c0,3.038-2.463,5.5-5.5,5.5C28.962,25,26.5,22.538,26.5,19.5z    M39.469,47.5c-3.038,0-5.5-2.463-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5c3.038,0,5.5,2.462,5.5,5.5   C44.969,45.037,42.506,47.5,39.469,47.5z M44.042,34c-3.038,0-5.5-2.462-5.5-5.5c0-3.038,2.462-5.5,5.5-5.5   c3.037,0,5.5,2.462,5.5,5.5C49.542,31.538,47.079,34,44.042,34z' fill='#FFFFFF'/></g></svg><span>Filmix</span>");
			//}
		}
	} /* End updateT */
		
/* Скрываем ленту трейлеров на Главной */
	Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'NoTrailerMainPage',
				type: 'trigger', //доступно select,input,trigger,title,static
				default: false
			},
				field: {
					name: 'Скрыть Трейлеры-новинки', //Название подпункта меню
					description: 'Скрывает баннерную ленту на главной странице' //Комментарий к подпункту
				},
				onChange: function (value) { //Действия при изменении подпункта
						var intervalID
							intervalID = setInterval(function() {
								/* Включили */
								if (Lampa.Storage.field('NoTrailerMainPage') == true) {
										/* Мы на Главной? */
										if (Lampa.Activity.active().component == 'main' && Lampa.Activity.active().source == 'cub') {
											$('#NoTrailerMainPage').remove();
											var banner = 'div.activity__body > div > div > div > div > div:nth-child(1)'
											Lampa.Template.add('NoTrailerMainPage', '<div id="NoTrailerMainPage"><style>' + banner + '{opacity: 0%!important;display: none;}</style></div>');
											$('body').append(Lampa.Template.get('NoTrailerMainPage', {}, true));
										} 
										/* Вышли из Главной */
										if (Lampa.Activity.active().component !== 'main') {
											$('#NoTrailerMainPage').remove()
										}
										/* Мы в разделе Фильмы? */
										if (Lampa.Activity.active().component == 'category' && Lampa.Activity.active().url == 'movie' && Lampa.Activity.active().source == 'cub') {
											$('#NoTrailerMainPage').remove();
											var banner = 'div.activity__body > div > div > div > div > div:nth-child(2)'
											Lampa.Template.add('NoTrailerMainPage', '<div id="NoTrailerMainPage"><style>' + banner + '{opacity: 0%!important;display: none;}</style></div>');
											$('body').append(Lampa.Template.get('NoTrailerMainPage', {}, true));
										} 
								}
								/* Выключили */
								if (Lampa.Storage.field('NoTrailerMainPage') == false) {
									$('#NoTrailerMainPage').remove()
									clearInterval(intervalID)
								}
							}, 500);
				}
	});	
	
/* Скрываем часы на заставке */
	Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'NoTimeNoDate',
				type: 'trigger', //доступно select,input,trigger,title,static
				default: false
			},
				field: {
					name: 'Скрыть часы на заставке CUB', //Название подпункта меню
					description: 'Если переживаете за выгорание экрана OLED' //Комментарий к подпункту
				},
				onChange: function (value) { //Действия при изменении подпункта
					/* Chromecast */
					if (Lampa.Storage.field('NoTimeNoDate') == true)	{
						$('#notimedatescreen').remove();
						Lampa.Template.add('notimedatescreen', '<div id="notimedatescreen"><style>.screensaver__datetime{opacity: 0%!important;display: none;}</style></div>');
						$('body').append(Lampa.Template.get('notimedatescreen', {}, true));
					}						
					if (Lampa.Storage.field('NoTimeNoDate') == false) {
						$('#notimedatescreen').remove();
					}
					
				}
	});

/* Хранитель Экрана */
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'CustomScreenSaver',
				type: 'trigger',
				//доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Свой хранитель экрана',
				//Название подпункта меню
				description: 'Меняет скринсейвер на другой' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				if(Lampa.Storage.field('CustomScreenSaver') == false) {
					Lampa.Storage.set ('screensaver_aerial_items', '');
				}
				if(Lampa.Storage.field('CustomScreenSaver') == true) {
					Lampa.Storage.set ('screensaver_type', 'aerial');
					Lampa.Storage.set ('screensaver_aerial_items', '[{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/birds-01.mkv"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/birds-02.mkv"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/birds-03.mkv"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/birds-04.mkv"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/birds-05.mkv"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/birds-06.mkv"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/birds-07.mkv"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/birds-08.mkv"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/birds-09.mkv"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/Aquarium_01.mp4"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/Aquarium_02.mp4"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/Aquarium_03.mp4"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/Aquarium_04.mp4"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""},{"id":"","accessibilityLabel":"","src":{"H2641080p":"http://lampatv.site/Aquarium_05.mp4"},"name":"","pointsOfInterest":{"0":""},"type":"","timeOfDay":""}]');
				/*
					setInterval(function() {
						document.querySelector(".screensaver__video").removeAttr("muted");
					}, 1000)
				*/
				}
				
				//Lampa.Settings.update();
			}
		});
/* End Хранитель Экрана */


/* Скрываем панель навигации */
	Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'NavyBar',
				type: 'trigger', //доступно select,input,trigger,title,static
				default: false
			},
				field: {
					name: 'Скрыть панель навигации', //Название подпункта меню
					description: 'Если неправильно определился тип устройства' //Комментарий к подпункту
				},
				onChange: function (value) { //Действия при изменении подпункта
					if (Lampa.Storage.field('NavyBar') == true)	{
						Lampa.Template.add('no_bar', '<div id="no_bar"><style>.navigation-bar{display: none!important;}</style></div>');
						$('body').append(Lampa.Template.get('no_bar', {}, true));

						var searchReturnButton = '<div id="searchReturnButton" class="head__action head__settings selector searchReturnButton">\n' +
						        '        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						        '            <circle cx="9.9964" cy="9.63489" r="8.43556" stroke="currentColor" stroke-width="2.4"></circle>\n' +
						        '            <path d="M20.7768 20.4334L18.2135 17.8701" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></path>\n' +
						        '        </svg>\n' +
						        '    </div>\n';
						$('.open--search').hide();
						$('#searchReturnButton').remove();
						$('#app > div.head > div > div.head__actions').append(searchReturnButton);
						$('#searchReturnButton').on('hover:enter hover:click hover:touch', function() {Lampa.Search.open();});
						$('.menu__item').on('click', function () {
							this.removeClass('focus'); this.addClass('focus');
						});
					}						
					if (Lampa.Storage.field('NavyBar') == false) {
						$('.open--search').show();
						$('#no_bar').remove();
						$('#searchReturnButton').remove();
					}
					//
				}
	});
//
/* Выводим кнопку возврата на экране */
//	Lampa.SettingsApi.addParam({
//			component: 'Multi_Menu_Component',
//			param: {
//				name: 'BackButton',
//				type: 'trigger', //доступно select,input,trigger,title,static
//				default: false
//			},
//				field: {
//					name: 'Кнопка возврата на экране', //Название подпункта меню
//					description: '' //Комментарий к подпункту
//				},
//				onChange: function (value) { //Действия при изменении подпункта
//					if (Lampa.Storage.field('BackButton') == true)	{
//						//backButton()
//						$('#backit').removeClass('hide')
//					}
//					if (Lampa.Storage.field('BackButton') == false)	{
//						$('#backit').addClass('hide')
//					}
//				}
//	});		

/* Отключение неиспользуемой раскладки клавиатуры */
	Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component', 
			param: {
				name: 'KeyboardSwitchOff',
				type: 'select', //доступно select,input,trigger,title,static
				values: {					//значения (слева) выставляемые в поле TVmenu через Storage, справа - их видимое название в меню
					SwitchOff_None: 	'Не отключать',
					SwitchOff_UA: 		'Українська',
					SwitchOff_RU: 		'Русский',
					SwitchOff_EN: 		'English',
				},
					default: 'SwitchOff_None'
				},
				field: {
					name: 'Неиспользуемая клавиатура', //Название подпункта меню
					description: 'Выберите язык для отключения' //Комментарий к подпункту
				},
				onChange: function (value) { //Действия при изменении подпункта
					if (Lampa.Storage.field('KeyboardSwitchOff') == 'SwitchOff_UA')	{
						Lampa.Storage.set('keyboard_default_lang', 'default')
						var elementUA = $('.selectbox-item.selector > div:contains("Українська")');
						if(elementUA.length > 0) elementUA.parent('div').hide();
					}
					if (Lampa.Storage.field('KeyboardSwitchOff') == 'SwitchOff_RU')	{
						Lampa.Storage.set('keyboard_default_lang', 'uk')
						var elementRU = $('.selectbox-item.selector > div:contains("Русский")');
						if(elementRU.length > 0) elementRU.parent('div').hide();
					}
					if ((Lampa.Storage.field('KeyboardSwitchOff') == 'SwitchOff_EN')&(Lampa.Storage.field('language') == 'uk'))	{
						Lampa.Storage.set('keyboard_default_lang', 'uk')
						var elementEN = $('.selectbox-item.selector > div:contains("English")');
						if(elementEN.length > 0) elementEN.parent('div').hide();
					}
					if ((Lampa.Storage.field('KeyboardSwitchOff') == 'SwitchOff_EN')&(Lampa.Storage.field('language') == 'ru'))	{
						Lampa.Storage.set('keyboard_default_lang', 'default')
						var elementEN = $('.selectbox-item.selector > div:contains("English")');
						if(elementEN.length > 0) elementEN.parent('div').hide();
					}
				}
	});		
/*End Отключение неиспользуемой раскладки */

/* Торренты */
		Lampa.SettingsApi.addComponent({
			component: 'Multi_Menu_Component',
			name: 'Tweaks & Tricks', //Задаём название меню
			icon: '<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M527.579429 186.660571a119.954286 119.954286 0 1 1-67.949715 0V47.542857a33.938286 33.938286 0 0 1 67.949715 0v139.190857z m281.380571 604.598858a119.954286 119.954286 0 1 1 67.949714 0v139.190857a33.938286 33.938286 0 1 1-67.949714 0v-139.190857z m-698.441143 0a119.954286 119.954286 0 1 1 67.949714 0v139.190857a33.938286 33.938286 0 0 1-67.949714 0v-139.190857zM144.457143 13.531429c18.797714 0 34.011429 15.213714 34.011428 33.938285v410.038857a33.938286 33.938286 0 0 1-67.949714 0V47.542857c0-18.724571 15.213714-33.938286 33.938286-33.938286z m0 722.139428a60.269714 60.269714 0 1 0 0-120.466286 60.269714 60.269714 0 0 0 0 120.466286z m698.514286-722.139428c18.724571 0 33.938286 15.213714 33.938285 33.938285v410.038857a33.938286 33.938286 0 1 1-67.949714 0V47.542857c0-18.724571 15.213714-33.938286 34.011429-33.938286z m0 722.139428a60.269714 60.269714 0 1 0 0-120.466286 60.269714 60.269714 0 0 0 0 120.466286z m-349.403429 228.717714a33.938286 33.938286 0 0 1-33.938286-33.938285V520.411429a33.938286 33.938286 0 0 1 67.949715 0v410.038857a33.938286 33.938286 0 0 1-34.011429 33.938285z m0-722.139428a60.269714 60.269714 0 1 0 0 120.539428 60.269714 60.269714 0 0 0 0-120.539428z" fill="#ffffff"/></g></svg>'
		});
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'TORRENT_fix',
				type: 'trigger', //доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Контрастная рамка на торрентах', //Название подпункта меню
				description: 'Улучшает восприятие при выборе торрента' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				var green1 = '<div id="green_style"><style>.torrent-item.selector.focus{box-shadow: 0 0 0 0.5em #1aff00!important;}</style></div>';
				var green2 = '<div id="greenn_style"><style>.torrent-serial.selector.focus{box-shadow: 0 0 0 0.3em #1aff00!important;}</style></div>';
				var green3 = '<div id="greennn_style"><style>.torrent-file.selector.focus{box-shadow: 0 0 0 0.3em #1aff00!important;}</style></div>';
				var green4 = '<div id="greennnn_style"><style>.scroll__body{margin: 5px!important;}</style></div>';
				//var green5 = '<div id="speedd_style"><style>div.value--speed span{opacity: 0%!important;display: none;}</style></div>';
				if(Lampa.Storage.field('TORRENT_fix') == true) {
					$('body').append(green1);
					$('body').append(green2);
					$('body').append(green3);
					$('body').append(green4);
					//$('body').append(green5);
				}
				if(Lampa.Storage.field('TORRENT_fix') == false) {
					$('#green_style').remove();
					$('#greenn_style').remove();
					$('#greennn_style').remove();
					$('#greennnn_style').remove();
					//$('#speedd_style').remove();
				}
				//Lampa.Settings.update();
			}
		});
/*End Торренты */

/* SpeedTest */
	/* Отключенный сегмент */
	    	Lampa.SettingsApi.addParam({
	    		component: 'Multi_Menu_Component',
	    		param: {
	    			name: 'SpeedTest',
	    			type: 'static', //доступно select,input,trigger,title,static
	    		},
	    		field: {
	    			name: 'SpeedTest',
	    			description: 'Замер скорости интернет-соединения для Skaz'
	    		},
	    		onRender: function (item) {
	    			item.on('hover:enter', function(){
	    			//Lampa.Iframe.show({url: 'http://zamerka.com/',
				Lampa.Iframe.show({url: 'http://62.84.100.7/speed.php',
	              					onBack: function onBack() {Lampa.Controller.toggle('settings_component');}
	            		});});}
				});
	/* End Отключаемый сегмент  */	
	
	    	Lampa.SettingsApi.addParam({
	    		component: 'Multi_Menu_Component',
	    		param: {
	    			name: 'OpenSpeedTestParam',
	    			type: 'static', //доступно select,input,trigger,title,static
	    		},
	    		field: {
	    			name: 'OpenSpeedTest',
	    			description: 'Замер скорости интернет-соединения'
	    		},
	    		onRender: function (item) {
	    			item.on('hover:enter', function(){
					var modal = $('<div style="text-align:right;"><div style="min-height:360px;"><div style="width:100%;height:0;padding-bottom:50%;position:relative;"><iframe style="border:none;position:absolute;top:0;left:0;width:100%;height:100%;min-height:360px;border:none;background-color: #ffffff;overflow:hidden !important;" src="https://speedtest.tatar.ru/?run=5"></iframe></div></div></div>');
		  			Lampa.Modal.open({
		  				title: '',
		  				html: modal,
		  				size: 'medium',
		  				mask: true, 
		  				onBack: function onBack() {
		  					Lampa.Modal.close();
							Lampa.Controller.toggle('settings_component');
		  				},
		  				onSelect: function () {}
  			});});}
				});
	
/* End SpeedTest */


/* Anime */
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'ANIME_fix',
				type: 'trigger', //доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Удалить "Аниме" в главном меню', //Название подпункта меню
				description: '' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				 if(Lampa.Storage.field('ANIME_fix') == true) $("[data-action=anime]").eq(0).hide();
				 if(Lampa.Storage.field('ANIME_fix') == false) $("[data-action=anime]").eq(0).show();
				 //Lampa.Settings.update();
			}
		});
/*End Anime */

/* SISI */ 
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'SISI_fix',
				type: 'trigger',
				//доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Удалить "Клубника" в главном меню',
				//Название подпункта меню
				description: '' //Комментарий к подпункту
			},
			onChange: function(value) {
				if(Lampa.Storage.field('SISI_fix') == false) {
					$('#app > div.wrap.layer--height.layer--width > div.wrap__left.layer--height > div > div > div > div > div:nth-child(1) > ul > li:contains("Клубничка")').show();
				}
				if(Lampa.Storage.field('SISI_fix') == true) {
					$('#app > div.wrap.layer--height.layer--width > div.wrap__left.layer--height > div > div > div > div > div:nth-child(1) > ul > li:contains("Клубничка")').hide();
				}
			}
		});


/*	СТИЛИЗАЦИЯ кнопок просмотра с учётом MODS's */
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'BUTTONS_fix',
				type: 'trigger',
				//доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Стилизовать кнопки просмотра',
				//Название подпункта меню
				description: 'Делает кнопки цветными' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				if(Lampa.Storage.field('BUTTONS_fix') == true) {
					updateT()
				}
				Lampa.Settings.update();
			},
			onRender: function(item) {
				if(Lampa.Storage.field('BUTTONS_fix') == true) {
					updateT()
				}
			}
		});
/*	End СТИЛИЗАЦИЯ кнопок */

if(Lampa.Storage.field('ANIME_fix') == true) $("[data-action=anime]").eq(0).hide();
if(Lampa.Storage.field('SISI_fix') == true) $("[data-action=sisi]").eq(0).show();
var d = 'dn'; 

/* Кнопка Перезагрузки и Консоли*/
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'Reloadbutton',
				type: 'trigger', //доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Добавить кнопку перезагрузки', //Название подпункта меню
				description: 'Иконка рядом с часами' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				if(Lampa.Storage.field('Reloadbutton') == false) {
					$('#RELOAD').addClass('hide');
				}
				if(Lampa.Storage.field('Reloadbutton') == true) {
					$('#RELOAD').removeClass('hide');
				}
				if(Lampa.Storage.field('Reloadbutton') == false) {
					$('#CONSOLE').addClass('hide');
				}
				if(Lampa.Storage.field('Reloadbutton') == true) {
					$('#CONSOLE').removeClass('hide');
				}
				if(Lampa.Storage.field('Reloadbutton') == false) {
					$('#ExitButton').addClass('hide');
				}				
				if(Lampa.Storage.field('Reloadbutton') == true) {
					$('#ExitButton').removeClass('hide');
				}
				//Lampa.Settings.update();
			}
		});

	/* Кнопка Перезагрузки */
		var my_reload = '<div id="RELOAD" class="head__action selector reload-screen hide"><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.4800000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z" fill="currentColor"></path></g></svg></div>';
		$('#app > div.head > div > div.head__actions').append(my_reload);
		
		$('#RELOAD').on('hover:enter hover:click hover:touch', function() {
			location.reload();
		});
		if(Lampa.Storage.field('Reloadbutton') == false) {
				$('#RELOAD').addClass('hide');
		}
		if(Lampa.Storage.field('Reloadbutton') == true) {
				$('#RELOAD').removeClass('hide');
		}
	
	/* Кнопка Консоли */
		var my_console = '<div id="CONSOLE" class="head__action selector console-screen hide"><svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="20.48"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M877.685565 727.913127l-0.584863-0.365539a32.898541 32.898541 0 0 1-8.041866-46.423497 411.816631 411.816631 0 1 0-141.829267 145.777092c14.621574-8.992268 33.62962-5.117551 43.645398 8.772944l0.146216 0.073108a30.412874 30.412874 0 0 1-7.968758 43.206751l-6.141061 4.020933a475.201154 475.201154 0 1 1 163.615412-164.419599 29.974227 29.974227 0 0 1-42.841211 9.357807z m-537.342843-398.584106c7.164571-7.091463 24.71046-9.650239 33.26408 0 10.600641 11.185504 7.164571 29.462472 0 37.138798l-110.612207 107.468569L370.901811 576.14119c7.164571 7.091463 8.114974 27.342343 0 35.384209-9.796455 9.723347-29.828011 8.188081-36.480827 1.535265L208.309909 487.388236a18.423183 18.423183 0 0 1 0-25.953294l132.032813-132.032813z m343.314556 0l132.032813 132.032813a18.423183 18.423183 0 0 1 0 25.953294L689.652124 613.133772c-6.652816 6.579708-25.587754 10.746857-36.553935 0-10.30821-10.235102-7.091463-31.290168 0-38.381632l108.345863-100.669537-111.855041-108.638294c-7.164571-7.676326-9.504023-26.611265 0-36.04218 9.284699-9.138484 26.903696-7.091463 34.068267 0z m-135.54199-26.318833c3.582286-9.504023 21.347498-15.498868 32.679217-11.258612 10.819965 4.020933 17.180349 19.008046 14.256035 28.512069l-119.896906 329.716493c-3.509178 9.504023-20.616419 13.305632-30.193551 9.723347-10.161994-3.509178-21.201282-17.545889-17.545888-26.976804l120.627985-329.716493z" fill="currentColor"></path></g></svg></div>';
		$('#app > div.head > div > div.head__actions').append(my_console);
		
		$('#CONSOLE').on('hover:enter hover:click hover:touch', function() {
			Lampa.Controller.toggle('console');
		});
		if(Lampa.Storage.field('Reloadbutton') == false) {
				$('#CONSOLE').addClass('hide');
		}
		if(Lampa.Storage.field('Reloadbutton') == true) {
				$('#CONSOLE').removeClass('hide');
		}		
	/* Кнопка Выхода в верхнем баре */
		//var my_top_exit = '<div id="my_top_exit" class="head__action selector exit-screen hide"><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.4800000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z" fill="currentColor"></path></g></svg></div>';
		var my_top_exit = '<div id="my_top_exit" class="head__action selector exit-screen hide"><svg fill="#ffffff" width="256px" height="256px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,23A11,11,0,1,0,1,12,11.013,11.013,0,0,0,12,23ZM12,3a9,9,0,1,1-9,9A9.01,9.01,0,0,1,12,3ZM8.293,14.293,10.586,12,8.293,9.707A1,1,0,0,1,9.707,8.293L12,10.586l2.293-2.293a1,1,0,0,1,1.414,1.414L13.414,12l2.293,2.293a1,1,0,1,1-1.414,1.414L12,13.414,9.707,15.707a1,1,0,0,1-1.414-1.414Z" fill="currentColor"></path></g></svg></div>';
		$('#app > div.head > div > div.head__actions').append(my_top_exit);

		$('#my_top_exit').on('hover:enter hover:click hover:touch', function() {
				Lampa.Activity.out();
				if(Lampa.Platform.is('tizen')) tizen.application.getCurrentApplication().exit();
				if(Lampa.Platform.is('webos')) window.close();
				if(Lampa.Platform.is('android')) Lampa.Android.exit();
				if(Lampa.Platform.is('orsay')) Lampa.Orsay.exit();
		});
		if(Lampa.Storage.field('Reloadbutton') == false) {
				$('#my_top_exit').addClass('hide');
		}
		if(Lampa.Storage.field('Reloadbutton') == true) {
				$('#my_top_exit').removeClass('hide');
		}
		
/* End Кнопка Перезагрузки и Консоли*/


/* Стиль в плеере - YouTube */
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'YouTubeStyle',
				type: 'trigger',
				//доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Стилизация встроенного плеера',
				//Название подпункта меню
				description: 'В стиле YouTube' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				if(Lampa.Storage.field('YouTubeStyle') == false) {
					$('#YOUTUBESTYLE').remove();
					$('#YOUTUBESTYLE-POSITION').remove();
					$('#YOUTUBESTYLE-POSITION-focus').remove();
				}
				if(Lampa.Storage.field('YouTubeStyle') == true) {
					$('body').append(Lampa.Template.get('YOUTUBESTYLE', {}, true));
					$('body').append(Lampa.Template.get('YOUTUBESTYLE-POSITION', {}, true));
					$('body').append(Lampa.Template.get('YOUTUBESTYLE-POSITION-focus', {}, true));
				}
				//Lampa.Settings.update();
			},
			onRender: function(item) {
				Lampa.Template.add('YOUTUBESTYLE', '<div id="YOUTUBESTYLE" class="hide"><style>div.player-panel__position{background-color: #f00!important;}</style></div>');
				Lampa.Template.add('YOUTUBESTYLE-POSITION', '<div id="YOUTUBESTYLE-POSITION" class="hide"><style>div.player-panel__position>div:after{background-color: #f00!important; box-shadow: 0 0 3px 0.2em!important;}</style></div>');
				Lampa.Template.add('YOUTUBESTYLE-POSITION-focus', '<div id="YOUTUBESTYLE-POSITION-focus" class="hide"><style>body > div.player > div.player-panel.panel--paused > div > div.player-panel__timeline.selector.focus > div.player-panel__position > div:after{box-shadow: 0 0 3px 0.2em!important;}</style></div>');
			}

		});
/* End Стиль в плеере - YouTube */

/* Часы в плеере - МЕНЮ */
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'ClockInPlayer',
				type: 'trigger',
				//доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Часы во встроенном плеере',
				//Название подпункта меню
				description: 'Через 5 секунд после включения плеера' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				//Lampa.Settings.update();
			}
		});
	
	Lampa.Template.add('CLOCKSTYLE', '<div id="clockstyle"><style>#MyClockDiv{position: fixed!important;' + Lampa.Storage.get('Clock_coordinates') + '; z-index: 51!important}</style></div>');
	var e = 2; 
	$('body').append(Lampa.Template.get('CLOCKSTYLE', {}, true));
	if (Lampa.Storage.field('ClockInPlayerPosition') == 'Center_Up'){	
		$('#clockstyle').remove();
		Lampa.Template.add('CLOCKSTYLE', '<div id="clockstyle" class="head__time-now time--clock hide"><style>#MyClockDiv{position: absolute!important; display: flex !important; z-index: 51!important;' + ' top: 2%;left: 49%;transform: translate(-33%, -50%);}</style></div>');
		$('body').append(Lampa.Template.get('CLOCKSTYLE', {}, true));
	}
	
	/* Часы в плеере - Функция*/
		function updateClock() {
			var MyTime = document.querySelector("[class='head__time-now time--clock']").innerHTML;
			$("#MyClockDiv").remove();
			$("#MyLogoDiv").remove()
			var MyDiv = '<div id="MyClockDiv" class="head__time-now time--clock hide" ></div>';
			var MyLogo = '<div id="MyLogoDiv" class="hide" style="z-index: 51!important; position: fixed!important; visibility: hidden;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/FreeTv_Egypt_Logo.png/640px-FreeTv_Egypt_Logo.png" width="100" height="100"></div>'
			$('.player').append(MyDiv);
			//$('.player').append(MyLogo)
			if(Lampa.Storage.field('ClockInPlayer') == true) {
				if (($('body > div.player > div.player-panel').hasClass( "panel--visible" ) == false) || ($('body > div.player > div.player-info').hasClass( "info--visible" ) == false)) {
					$('#MyClockDiv').removeClass('hide');
				}
			}
			$("#MyClockDiv").text(MyTime);
		}

	/* Запускаем часы, интервал обновления 200 миллисекунд */
			Lampa.Template.add('clockcenter', '<style>.hide{visibility: hidden!important;}</style>');
			$('body').append(Lampa.Template.get('clockcenter', {}, true));
			setInterval(updateClock, 200);

/* End Часы в плеере */

/* Положение часов в плеере */
	Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component', 
			param: {
				name: 'ClockInPlayerPosition',
				type: 'select', //доступно select,input,trigger,title,static
				values: {					//значения (слева) выставляемые в поле TVmenu через Storage, справа - их видимое название в меню
					Left_Up: 	'Слева сверху ',
					Left_Down: 	'Слева снизу',
					Right_Up: 	'Справа сверху',
					Right_Down: 'Справа снизу',
					Center_Up:  'В центре сверху',
				},
					default: 'Left_Up'
				},
				field: {
					name: 'Положение часов на экране', //Название подпункта меню
					description: 'Выберите угол экрана' //Комментарий к подпункту
				},
				onChange: function (value) { //Действия при изменении подпункта
					document.querySelector("#clockstyle").remove();
					if (Lampa.Storage.field('ClockInPlayerPosition') == 'Left_Up')		Lampa.Storage.set('Clock_coordinates', 'bottom: 90%!important; right: 90%!important');
					if (Lampa.Storage.field('ClockInPlayerPosition') == 'Left_Down')	Lampa.Storage.set('Clock_coordinates', 'bottom: 10%!important; right: 90%!important'); //bottom: 90%!important; right: 10%!important
					if (Lampa.Storage.field('ClockInPlayerPosition') == 'Right_Up')		Lampa.Storage.set('Clock_coordinates', 'bottom: 90%!important; right: 12%!important');
					if (Lampa.Storage.field('ClockInPlayerPosition') == 'Right_Down')	Lampa.Storage.set('Clock_coordinates', 'bottom: 10%!important; right: 5%!important');
					
					Lampa.Template.add('CLOCKSTYLE', '<div id="clockstyle"><style>#MyClockDiv{position: fixed!important;' + Lampa.Storage.get('Clock_coordinates') + '; z-index: 51!important}</style></div>');
					$('body').append(Lampa.Template.get('CLOCKSTYLE', {}, true));
					
					if (Lampa.Storage.field('ClockInPlayerPosition') == 'Center_Up'){	
						$('#clockstyle').remove();
						Lampa.Template.add('CLOCKSTYLE', '<div id="clockstyle" class="head__time-now time--clock hide"><style>#MyClockDiv{position: absolute!important; display: flex !important; z-index: 51!important;' + ' top: 2%;left: 49%;transform: translate(-50%, -50%);}</style></div>');
						$('body').append(Lampa.Template.get('CLOCKSTYLE', {}, true));
					}
					//Lampa.Settings.update(); 
					
				}
	});		
/*End Положение часов в плеере */

/* Кнопка YouTube */
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'YouTube',
				type: 'trigger',
				//доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Раздел YouTube',
				//Название подпункта меню
				description: 'Добавляет YouTube в главном меню' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				if(Lampa.Storage.field('YouTube') == false) {
					$('#YouTubeButton').addClass('hide');
				}
				if(Lampa.Storage.field('YouTube') == true) {
					$('#YouTubeButton').removeClass('hide');
				}
				//Lampa.Settings.update();
			}
		});
/* End Кнопка YouTube */

/* Кнопка RuTube */
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'RuTube',
				type: 'trigger',
				//доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Раздел RuTube',
				//Название подпункта меню
				description: 'Добавляет RuTube в главном меню' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				if(Lampa.Storage.field('RuTube') == false) {
					$('#RuTubeButton').addClass('hide');
				}
				if(Lampa.Storage.field('RuTube') == true) {
					$('#RuTubeButton').removeClass('hide');
				}
				//Lampa.Settings.update();
			}
		});
/* End Кнопка RuTube */

/* Кнопка Twitch */
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'Twitch',
				type: 'trigger',
				//доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Раздел Twitch',
				//Название подпункта меню
				description: 'Добавляет Twitch в главном меню' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				if(Lampa.Storage.field('Twitch') == false) {
					$('#TwitchButton').addClass('hide');
				}
				if(Lampa.Storage.field('Twitch') == true) {
					$('#TwitchButton').removeClass('hide');
				}
				//Lampa.Settings.update();
			}
		});
/* End Кнопка Twitch */

/* ТоррСервер */
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'Tricks_TorrServer',
				type: 'trigger', //доступно select,input,trigger,title,static
				default: false
			},
			field: {
				name: 'Использовать "народный" TorrServer', //Название подпункта меню
				description: 'Работает после запроса доступа у @AndreyURL54' //Комментарий к подпункту
			},
			onChange: function(value) {
				//Действия при изменении подпункта
				var tricks_usermail = Lampa.Storage.field('account_email').toLowerCase();
				 Lampa.Storage.set('torrserver_use_link', (value == '0') ? 'one' : 'two');
				 Lampa.Storage.set('torrserver_auth', true);
				 Lampa.Storage.set('torrserver_login', tricks_usermail);
				 Lampa.Storage.set('torrserver_password', tricks_usermail);
				 if(Lampa.Storage.field('Tricks_TorrServer') == true) Lampa.Storage.set('torrserver_url_two', '95.215.8.180:9098');
				 if(Lampa.Storage.field('Tricks_TorrServer') == false) {
					 Lampa.Storage.set('torrserver_url_two', '');
					 Lampa.Storage.set('torrserver_login', '');
					 Lampa.Storage.set('torrserver_password', '');
				 }
				 //Lampa.Settings.update();
			}
		});
/*End ТоррСервер */
/* METRIKA */
			(function(m, e, t, r, i, k, a) {
				m[i] = m[i] || function() {
					(m[i].a = m[i].a || []).push(arguments)
				};
				m[i].l = 1 * new Date();
				for(var j = 0; j < document.scripts.length; j++) {
					if(document.scripts[j].src === r) {
						return;
					}
				}
				k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
			})
			(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
			ym(92135047, "init", {
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true
			});
			var METRIKA = '<noscript><div><img src="https://mc.yandex.ru/watch/92135047" style="position:absolute; left:-9999px;" alt="" /></div></noscript>';
			$('body').append(METRIKA);

/* End METRIKA */		

/*
* ШАБЛОНЫ
*/

/* Скрываем баннер Трейлеров на Главной */
if (Lampa.Storage.field('NoTrailerMainPage') == true) {
	var intervalID
	setTimeout(function() {
		intervalID = setInterval(function() {
			/* Мы на Главной? */
			if (Lampa.Activity.active().component == 'main' && Lampa.Activity.active().source == 'cub') {
				$('#NoTrailerMainPage').remove();
				var banner = 'div.activity__body > div > div > div > div > div:nth-child(1)'
				Lampa.Template.add('NoTrailerMainPage', '<div id="NoTrailerMainPage"><style>' + banner + '{opacity: 0%!important;display: none;}</style></div>');
				$('body').append(Lampa.Template.get('NoTrailerMainPage', {}, true));
			} 
			/* Вышли из Главной */
				if (Lampa.Activity.active().component !== 'main') {
					$('#NoTrailerMainPage').remove()
				}
			/* Мы в разделе Фильмы? */
			if (Lampa.Activity.active().component == 'category' && Lampa.Activity.active().url == 'movie' && Lampa.Activity.active().source == 'cub') {
				$('#NoTrailerMainPage').remove();
				var banner = 'div.activity__body > div > div > div > div > div:nth-child(2)'
				Lampa.Template.add('NoTrailerMainPage', '<div id="NoTrailerMainPage"><style>' + banner + '{opacity: 0%!important;display: none;}</style></div>');
				$('body').append(Lampa.Template.get('NoTrailerMainPage', {}, true));
			}
			if (Lampa.Storage.field('NoTrailerMainPage') == false) {
				clearInterval(intervalID)
			}			
		}, 500)
	}, 1000);
}

/* Скрываем часы на заставке CUB и Chromecast */
			if (Lampa.Storage.field('NoTimeNoDate') == true) {
				/* CUB */
				Lampa.Template.add('notimedatescreen', '<div id="notimedatescreen"><style>.screensaver__datetime{opacity: 0%!important;display: none;}</style></div>');
				$('body').append(Lampa.Template.get('notimedatescreen', {}, true));
				
				/* Chromecast */
				var notimedatescreenInterval = setInterval(function() {
					var elementScreenSaver = $('.screensaver-chrome')
					if (elementScreenSaver.length > 0){
		   				      /*
		 					var inScript = '<script>' +
							'let iframeHead = $("body > div.screensaver-layer > div > iframe").contents().find("head");' +
	    						'let iframeCSS = '<style>[ng-if="isSimpleTopic"]{opacity: 0%!important;display: none;}</style>'';' +
	    						'$(iframeHead).append(iframeCSS);' +
							'frames[0].document.head.appendChild(iframeCSS);' + '</script>'
	      						$('body').append(inScript);
		    				      */
					}
				}, 1000) // Interval
				// clearInterval(notimedatescreenInterval);				
				/* });; */
			}

/* Стиль скрытия панели навигации при старте */
			if (Lampa.Storage.field('NavyBar') == true)	{
				$('.menu__item').on('click', function () {
					this.removeClass('focus'); this.addClass('focus');
				});
				Lampa.Template.add('no_bar', '<div id="no_bar"><style>.navigation-bar{display: none!important;}</style></div>');
				$('body').append(Lampa.Template.get('no_bar', {}, true));
				
				var searchReturnButton = '<div id="searchReturnButton" class="head__action head__settings selector searchReturnButton">\n' +
			        '        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
			        '            <circle cx="9.9964" cy="9.63489" r="8.43556" stroke="currentColor" stroke-width="2.4"></circle>\n' +
			        '            <path d="M20.7768 20.4334L18.2135 17.8701" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></path>\n' +
			        '        </svg>\n' +
			        '    </div>\n';
				$('#app > div.head > div > div.head__actions').append(searchReturnButton);
				$('#searchReturnButton').on('hover:enter hover:click hover:touch', function() {Lampa.Search.open();});
			};
			/*
			if (Lampa.Storage.field('NavyBar') == false)	{
				$('#no_bar').remove();
			};
   			*/

/* Стиль в плеере - YouTube при старте*/
			if(Lampa.Storage.field('YouTubeStyle') == true) {
				Lampa.Template.add('YOUTUBESTYLE', '<div id="YOUTUBESTYLE" class="hide"><style>div.player-panel__position{background-color: #f00!important;}</style></div>');
				Lampa.Template.add('YOUTUBESTYLE-POSITION', '<div id="YOUTUBESTYLE-POSITION" class="hide"><style>div.player-panel__position>div:after{background-color: #f00!important; box-shadow: 0 0 3px 0.2em!important;}</style></div>');
				Lampa.Template.add('YOUTUBESTYLE-POSITION-focus', '<div id="YOUTUBESTYLE-POSITION-focus" class="hide"><style>body > div.player > div.player-panel.panel--paused > div > div.player-panel__timeline.selector.focus > div.player-panel__position > div:after{box-shadow: 0 0 3px 0.2em!important;}</style></div>');
				$('body').append(Lampa.Template.get('YOUTUBESTYLE', {}, true));
				$('body').append(Lampa.Template.get('YOUTUBESTYLE-POSITION', {}, true));
				$('body').append(Lampa.Template.get('YOUTUBESTYLE-POSITION-focus', {}, true));
			}

/* Кнопка YouTube */

			var TubeSVG = '<svg width="256px" height="256px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="0.00048000000000000007"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>youtube</title> <g id="Layer_2" data-name="Layer 2">  <g id="icons_Q2" data-name="icons Q2"> <path d="M45.1,12.8a5.5,5.5,0,0,0-3.9-3.9C37.8,8,24,8,24,8S10.2,8,6.8,8.9a5.5,5.5,0,0,0-3.9,3.9C2,16.2,2,23.4,2,23.4s0,7.2.9,10.6a5.5,5.5,0,0,0,3.9,3.9c3.4.9,17.2.9,17.2.9s13.8,0,17.2-.9A5.5,5.5,0,0,0,45.1,34c.9-3.4.9-10.6.9-10.6S46,16.2,45.1,12.8ZM19.6,30V16.8L31,23.4Z" fill="currentColor"></path> </g> </g> </g></svg>'
			var tubemenu = $('<li id="YouTubeButton"  class="menu__item selector hide"><div class="menu__ico">' + TubeSVG + '</div><div class="menu__text" >YouTube</div></li>');
			$('.menu .menu__list').eq(0).append(tubemenu)
			if(Lampa.Storage.field('YouTube') == true) {
				$('#YouTubeButton').removeClass('hide');
			}

			tubemenu.on('hover:enter', function() {
				//window.location.href = 'https://youtube.com/tv'
					if (Lampa.Platform.is('webos')) {
						webOS.service.request("luna://com.webos.applicationManager", {
						   method: "launch",
						   parameters: { "id": "youtube.leanback.v4"},
						   onSuccess: function (inResponse) {
							   console.log("The app is launched");
						   },
						   onFailure: function (inError) {
							   console.log("Failed to launch the app");
							   console.log("[" + inError.errorCode + "]: " + inError.errorText);
							   return;
						   }
					   });
					}
					if (Lampa.Platform.is('android')) {
						Lampa.Android.openYoutube('TeUQrJrfrkk');
					} 
					else window.location.href = 'https://youtube.com/tv' //Android.openYoutube(a.id) else YouTube.play(a.id)
			})

/* Кнопка RuTube */
			var RuTubeSVG = '<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_923_32857)"><rect width="511.998" height="511.998" rx="108.623" fill="#0B1D38"/><g filter="url(#filter0_d_923_32857)"><circle cx="419.52" cy="110" r="32.3481" fill="#F41240"/></g><g filter="url(#filter1_d_923_32857)"><path d="M323.396 138.772H96.0543V391.5H159.331V309.278H280.58L335.9 391.5H406.755L345.751 308.899C364.696 305.868 378.337 298.669 386.673 287.302C395.009 275.935 399.177 257.747 399.177 233.498V214.552C399.177 200.154 397.661 188.787 395.009 180.072C392.356 171.358 387.809 163.779 381.368 156.959C374.548 150.518 366.97 145.971 357.876 142.94C348.782 140.287 337.415 138.772 323.396 138.772ZM313.166 253.579H159.331V194.471H313.166C321.88 194.471 327.943 195.986 330.974 198.639C334.005 201.291 335.9 206.217 335.9 213.416V234.634C335.9 242.212 334.005 247.138 330.974 249.79C327.943 252.443 321.88 253.579 313.166 253.579Z" fill="white"/></g><g filter="url(#filter2_f_923_32857)"><rect x="13.8589" y="12.9448" width="484.045" height="485.344" rx="96.9086" stroke="black" stroke-opacity="0.65" stroke-width="6.38958"/></g></g><rect x="6.96719" y="6.96719" width="498.064" height="498.064" rx="101.656" stroke="white" stroke-width="13.9344"/><defs><filter id="filter0_d_923_32857" x="378.652" y="77.6523" width="81.7342" height="81.7342" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="8.51943"/><feGaussianBlur stdDeviation="4.25972"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_923_32857"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_923_32857" result="shape"/></filter><filter id="filter1_d_923_32857" x="87.5353" y="138.771" width="327.742" height="269.767" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="8.51943"/><feGaussianBlur stdDeviation="4.25972"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_923_32857"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_923_32857" result="shape"/></filter><filter id="filter2_f_923_32857" x="-6.3748" y="-7.28887" width="524.515" height="525.812" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="8.51943" result="effect1_foregroundBlur_923_32857"/></filter><clipPath id="clip0_923_32857"><rect width="511.998" height="511.998" rx="108.623" fill="white"/></clipPath></defs></svg>'
			var rutubemenu = $('<li id="RuTubeButton"  class="menu__item selector hide"><div class="menu__ico">' + RuTubeSVG + '</div><div class="menu__text" >RuTube</div></li>');
			$('.menu .menu__list').eq(0).append(rutubemenu)
			if(Lampa.Storage.field('RuTube') == true) {
				$('#RuTubeButton').removeClass('hide');
			}
			rutubemenu.on('hover:enter', function() {
				//window.location.href = 'https://youtube.com/tv'
					if (Lampa.Platform.is('webos')) {
						window.location.href = 'https://bit.ly/3DnLr2O'
					}
					if (Lampa.Platform.is('tizen')) {
						var rutubeurl = 'https://bit.ly/3RcgRPq'
						//window.location.href = 'https://bit.ly/3RcgRPq'
						var e = new tizen.ApplicationControl("https://tizen.org/appcontrol/operation/view", rutubeurl);
						tizen.application.launchAppControl(e, null, function () {}, function (e) {
						Lampa.Noty.show(e);})						
						//window.location.href = 'https://bit.ly/3RcgRPq'
					} 
					if (Lampa.Platform.is('android')) {
						Android.openYoutube();
					}
					else window.open('https://bit.ly/3DnLr2O', '_blank'); //Android.openYoutube(a.id) else YouTube.play(a.id)
			})

/* Кнопка Twitch */
			var TwitchSVG = '<svg width="256px" height="256px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20"></rect> <g> <style>.st0{fill-rule:evenodd;clip-rule:evenodd;}</style> <path d="M2.7 2L2 4.6v11.8h3.2V18H7l1.8-1.6h2.9l5.7-5.2V2H2.7zM16 10.5l-2.5 2.3h-4l-2.2 2v-2H4.2V3.3H16v7.2zm-2.5-4.6h-1.4v3.9h1.4V5.9zm-4 0H8.1v3.9h1.4V5.9z"></path> </g> </g></svg>'
			var twitchmenu = $('<li id="TwitchButton"  class="menu__item selector hide"><div class="menu__ico">' + TwitchSVG + '</div><div class="menu__text" >Twitch</div></li>');
			$('.menu .menu__list').eq(0).append(twitchmenu)
			if(Lampa.Storage.field('Twitch') == true) {
				$('#TwitchButton').removeClass('hide');
			}
			twitchmenu.on('hover:enter', function() {
					if (Lampa.Platform.is('webos')) {
						window.open('https://webos.tv.twitch.tv', '_blank');
					}
					
					if (Lampa.Platform.is('orsay')) {
						window.open('https://fgl27.github.io/SmartTwitchTV/release/index.html', '_blank');
					}
     					
					if (Lampa.Platform.is('tizen')) {
						window.open('https://tizen.tv.twitch.tv', '_blank');
						/*
						var twitchurl = 'https://tizen.tv.twitch.tv';
						var e = new tizen.ApplicationControl("https://tizen.org/appcontrol/operation/view", twitchurl);
						tizen.application.launchAppControl(e, null, function () {}, function (e) {
						Lampa.Noty.show(e);})						
						*/
      						/*
						var twitchurl = 'https://fgl27.github.io/SmartTwitchTV/release/index.html'
						window.open(twitchurl, '_blank'); 
      						*/
     					} 
					if (Lampa.Platform.is('android')) {
						window.open('https://android.tv.twitch.tv', '_blank'); //Android.openTwitch();
					}
					if (Lampa.Platform.is('browser')) {
						window.open('https://twitch.tv', '_blank');
					}
					if (Lampa.Platform.is('vidaa')) {
						window.open('https://tv.twitch.tv', '_blank');
					}
					//else window.open('https://fgl27.github.io/SmartTwitchTV/release/index.html', '_blank');
			})

/* Активация торрентов при старте */
			var green1 = '<div id="green_style"><style>.torrent-item.selector.focus{box-shadow: 0 0 0 0.5em #1aff00!important;}</style></div>';
			var green2 = '<div id="greenn_style"><style>.torrent-serial.selector.focus{box-shadow: 0 0 0 0.3em #1aff00!important;}</style></div>';
			var green3 = '<div id="greennn_style"><style>.torrent-file.selector.focus{box-shadow: 0 0 0 0.3em #1aff00!important;}</style></div>';
			var green4 = '<div id="greennnn_style"><style>.scroll__body{margin: 5px!important;}</style></div>';
			//var green5 = '<div id="speedd_style"><style>div.value--speed span{opacity: 0%!important;display: none;}</style></div>';
			if(Lampa.Storage.field('TORRENT_fix') == true) {
				$('body').append(green1);
				$('body').append(green2);
				$('body').append(green3);
				$('body').append(green4);
				//$('body').append(green5);
			}

  		var timerId;
  		timerId = setInterval(updateT, 1000);
  		//updateT(); // (*)

/* Отключение языков при старте */
		setInterval(function() {
			var elementCHlang = $('div.hg-button.hg-functionBtn.hg-button-LANG.selector.binded')
			if (elementCHlang.length > 0){
					if (Lampa.Storage.field('KeyboardSwitchOff') == 'SwitchOff_UA')	{
						Lampa.Storage.set('keyboard_default_lang', 'default')
						var elementUA = $('.selectbox-item.selector > div:contains("Українська")');
						if(elementUA.length > 0) elementUA.parent('div').hide();
					}
					if (Lampa.Storage.field('KeyboardSwitchOff') == 'SwitchOff_RU')	{
						Lampa.Storage.set('keyboard_default_lang', 'uk')
						var elementRU = $('.selectbox-item.selector > div:contains("Русский")');
						if(elementRU.length > 0) elementRU.parent('div').hide();
					}
					if ((Lampa.Storage.field('KeyboardSwitchOff') == 'SwitchOff_EN')&(Lampa.Storage.field('language') == 'uk'))	{
						Lampa.Storage.set('keyboard_default_lang', 'uk')
						var elementEN = $('.selectbox-item.selector > div:contains("English")');
						if(elementEN.length > 0) elementEN.parent('div').hide();
					}
					if ((Lampa.Storage.field('KeyboardSwitchOff') == 'SwitchOff_EN')&(Lampa.Storage.field('language') == 'ru'))	{
						Lampa.Storage.set('keyboard_default_lang', 'default')
						var elementEN = $('.selectbox-item.selector > div:contains("English")');
						if(elementEN.length > 0) elementEN.parent('div').hide();
					}
				}
			}, 0)

/* Удаление SISI при старте */
if(Lampa.Storage.field('SISI_fix') == true) {
	setTimeout(function() {
		$('#app > div.wrap.layer--height.layer--width > div.wrap__left.layer--height > div > div > div > div > div:nth-child(1) > ul > li:contains("Клубничка")').hide()
	}, 3000);
}

/* Активация кнопки возврата при старте */
	$('body').append('<div id="backit" class="elem-mobile-back hide"><svg width="131" height="262" viewBox="0 0 131 262" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M131 0C58.6507 0 0 58.6507 0 131C0 203.349 58.6507 262 131 262V0Z" fill="white"/><path d="M50.4953 125.318C50.9443 124.878 51.4313 124.506 51.9437 124.183L86.2229 90.4663C89.5671 87.1784 94.9926 87.1769 98.3384 90.4679C101.684 93.7573 101.684 99.0926 98.3384 102.385L68.8168 131.424L98.4907 160.614C101.836 163.904 101.836 169.237 98.4907 172.531C96.817 174.179 94.623 175 92.4338 175C90.2445 175 88.0489 174.179 86.3768 172.531L51.9437 138.658C51.4313 138.335 50.9411 137.964 50.4953 137.524C48.7852 135.842 47.9602 133.626 48.0015 131.421C47.9602 129.216 48.7852 127.002 50.4953 125.318Z" fill="black"/></svg></div>');
	Lampa.Template.add('butt_style', '<style>.elem-mobile-back{right: 0;position: fixed;z-index:49;top: 50%;width: 3em;height: 6em;background-repeat: no-repeat;background-position: 100% 50%;-webkit-background-size: contain;-moz-background-size: contain;-o-background-size: contain;background-size: contain;margin-top: -3em;font-size: .72em;display: block}</style>');
	$('body').append(Lampa.Template.get('butt_style', {}, true));
	$(".elem-mobile-back").on("click", function () {
		Lampa.Activity.back();
	});
	if (Lampa.Storage.field('BackButton') == true)	{
		$('#backit').removeClass('hide')
	}
	/* Добавляем кнопку выхода из плеера */
	setInterval(function() {
		var exitSVG = '<div id="ExitButton" class="button selector" data-controller="player_panel"><svg viewBox="0 0 24 24" fill="#ffffff"  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="#000000" stroke-width="2"></path> <path d="M9 9L15 15M15 9L9 15" stroke="#000000" stroke-width="2" stroke-linecap="round" ></path> </g></svg></div>'
		$('#ExitButton').remove()
		if (Lampa.Storage.field('BackButton') == true){
			$('.player-panel__right').append(exitSVG)
			$('#ExitButton').css("padding","0.05em")
			$('#ExitButton').on('hover:enter hover:click hover:touch', function() {
				$('#ExitButton').remove()
				$('.player').remove();
			});
		}
	}, 3000)
/* End Активация кнопки возврата при старте */

} // end of Add (main function)


/* Если всё готово */
if(window.appready) add();
	else {
		Lampa.Listener.follow('app', function(e) {
			if(e.type == 'ready') {
				add();

			}
		});
	
	
	
	}


})();

