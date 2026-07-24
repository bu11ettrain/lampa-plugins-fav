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
