!function (n, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : n.YMRTC = e(); }(this, function () { var i = function (n, e) { return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, e) { n.__proto__ = e; } || function (n, e) { for (var t in e)
    e.hasOwnProperty(t) && (n[t] = e[t]); })(n, e); }; function a(n, e) { function t() { this.constructor = n; } i(n, e), n.prototype = null === e ? Object.create(e) : (t.prototype = e.prototype, new t); } var n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}; var e = !0, t = !0; function r(n, e, t) { var i = n.match(e); return i && i.length >= t && parseInt(i[t], 10); } var v = { extractVersion: r, wrapPeerConnectionEvent: function (n, i, r) { if (n.RTCPeerConnection) {
        var e = n.RTCPeerConnection.prototype, o = e.addEventListener;
        e.addEventListener = function (n, t) { if (n !== i)
            return o.apply(this, arguments); var e = function (n) { var e = r(n); e && t(e); }; return this.n = this.n || {}, this.n[t] = e, o.apply(this, [n, e]); };
        var a = e.removeEventListener;
        e.removeEventListener = function (n, e) { if (n !== i || !this.n || !this.n[e])
            return a.apply(this, arguments); var t = this.n[e]; return delete this.n[e], a.apply(this, [n, t]); }, Object.defineProperty(e, "on" + i, { get: function () { return this["_on" + i]; }, set: function (n) { this["_on" + i] && (this.removeEventListener(i, this["_on" + i]), delete this["_on" + i]), n && this.addEventListener(i, this["_on" + i] = n); }, enumerable: !0, configurable: !0 });
    } }, disableLog: function (n) { return "boolean" != typeof n ? new Error("Argument type: " + typeof n + ". Please use a boolean.") : (e = n) ? "adapter.js logging disabled" : "adapter.js logging enabled"; }, disableWarnings: function (n) { return "boolean" != typeof n ? new Error("Argument type: " + typeof n + ". Please use a boolean.") : (t = !n, "adapter.js deprecation warnings " + (n ? "disabled" : "enabled")); }, log: function () { if ("object" == typeof window) {
        if (e)
            return;
        "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments);
    } }, deprecated: function (n, e) { t && console.warn(n + " is deprecated, please use " + e + " instead."); }, detectBrowser: function (n) { var e = n && n.navigator, t = { browser: null, version: null }; if (void 0 === n || !n.navigator)
        return t.browser = "Not a browser.", t; if (e.mozGetUserMedia)
        t.browser = "firefox", t.version = r(e.userAgent, /Firefox\/(\d+)\./, 1);
    else if (e.webkitGetUserMedia)
        t.browser = "chrome", t.version = r(e.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
    else if (e.mediaDevices && e.userAgent.match(/Edge\/(\d+).(\d+)$/))
        t.browser = "edge", t.version = r(e.userAgent, /Edge\/(\d+).(\d+)$/, 2);
    else {
        if (!n.RTCPeerConnection || !e.userAgent.match(/AppleWebKit\/(\d+)\./))
            return t.browser = "Not a supported browser.", t;
        t.browser = "safari", t.version = r(e.userAgent, /AppleWebKit\/(\d+)\./, 1);
    } return t; } }, c = v.log, s = v.log; function u(t, e, n) { var i = n ? "outbound-rtp" : "inbound-rtp", r = new Map; if (null === e)
    return r; var o = []; return t.forEach(function (n) { "track" === n.type && n.trackIdentifier === e.id && o.push(n); }), o.forEach(function (e) { t.forEach(function (n) { n.type === i && n.trackId === e.id && function e(t, i, r) { i && !r.has(i.id) && (r.set(i.id, i), Object.keys(i).forEach(function (n) { n.endsWith("Id") ? e(t, t.get(i[n]), r) : n.endsWith("Ids") && i[n].forEach(function (n) { e(t, t.get(n), r); }); })); }(t, n, r); }); }), r; } var o, h = { shimGetUserMedia: function (n) { var a = v.detectBrowser(n), u = n && n.navigator, s = function (r) { if ("object" != typeof r || r.mandatory || r.optional)
        return r; var o = {}; return Object.keys(r).forEach(function (e) { if ("require" !== e && "advanced" !== e && "mediaSource" !== e) {
        var t = "object" == typeof r[e] ? r[e] : { ideal: r[e] };
        void 0 !== t.exact && "number" == typeof t.exact && (t.min = t.max = t.exact);
        var i = function (n, e) { return n ? n + e.charAt(0).toUpperCase() + e.slice(1) : "deviceId" === e ? "sourceId" : e; };
        if (void 0 !== t.ideal) {
            o.optional = o.optional || [];
            var n = {};
            "number" == typeof t.ideal ? (n[i("min", e)] = t.ideal, o.optional.push(n), (n = {})[i("max", e)] = t.ideal) : n[i("", e)] = t.ideal, o.optional.push(n);
        }
        void 0 !== t.exact && "number" != typeof t.exact ? (o.mandatory = o.mandatory || {}, o.mandatory[i("", e)] = t.exact) : ["min", "max"].forEach(function (n) { void 0 !== t[n] && (o.mandatory = o.mandatory || {}, o.mandatory[i(n, e)] = t[n]); });
    } }), r.advanced && (o.optional = (o.optional || []).concat(r.advanced)), o; }, i = function (t, i) { if (61 <= a.version)
        return i(t); if ((t = JSON.parse(JSON.stringify(t))) && "object" == typeof t.audio) {
        var n = function (n, e, t) { e in n && !(t in n) && (n[t] = n[e], delete n[e]); };
        n((t = JSON.parse(JSON.stringify(t))).audio, "autoGainControl", "googAutoGainControl"), n(t.audio, "noiseSuppression", "googNoiseSuppression"), t.audio = s(t.audio);
    } if (t && "object" == typeof t.video) {
        var r = t.video.facingMode;
        r = r && ("object" == typeof r ? r : { ideal: r });
        var o, e = a.version < 66;
        if (r && ("user" === r.exact || "environment" === r.exact || "user" === r.ideal || "environment" === r.ideal) && (!u.mediaDevices.getSupportedConstraints || !u.mediaDevices.getSupportedConstraints().facingMode || e) && (delete t.video.facingMode, "environment" === r.exact || "environment" === r.ideal ? o = ["back", "rear"] : "user" !== r.exact && "user" !== r.ideal || (o = ["front"]), o))
            return u.mediaDevices.enumerateDevices().then(function (n) { var e = (n = n.filter(function (n) { return "videoinput" === n.kind; })).find(function (e) { return o.some(function (n) { return -1 !== e.label.toLowerCase().indexOf(n); }); }); return !e && n.length && -1 !== o.indexOf("back") && (e = n[n.length - 1]), e && (t.video.deviceId = r.exact ? { exact: e.deviceId } : { ideal: e.deviceId }), t.video = s(t.video), c("chrome: " + JSON.stringify(t)), i(t); });
        t.video = s(t.video);
    } return c("chrome: " + JSON.stringify(t)), i(t); }, r = function (n) { return 64 <= a.version ? n : { name: { PermissionDeniedError: "NotAllowedError", PermissionDismissedError: "NotAllowedError", InvalidStateError: "NotAllowedError", DevicesNotFoundError: "NotFoundError", ConstraintNotSatisfiedError: "OverconstrainedError", TrackStartError: "NotReadableError", MediaDeviceFailedDueToShutdown: "NotAllowedError", MediaDeviceKillSwitchOn: "NotAllowedError", TabCaptureError: "AbortError", ScreenCaptureError: "AbortError", DeviceCaptureError: "AbortError" }[n.name] || n.name, message: n.message, constraint: n.constraint || n.constraintName, toString: function () { return this.name + (this.message && ": ") + this.message; } }; }; u.getUserMedia = function (n, e, t) { i(n, function (n) { u.webkitGetUserMedia(n, e, function (n) { t && t(r(n)); }); }); }; var e = function (t) { return new Promise(function (n, e) { u.getUserMedia(t, n, e); }); }; if (u.mediaDevices || (u.mediaDevices = { getUserMedia: e, enumerateDevices: function () { return new Promise(function (e) { var t = { audio: "audioinput", video: "videoinput" }; return n.MediaStreamTrack.getSources(function (n) { e(n.map(function (n) { return { label: n.label, kind: t[n.kind], deviceId: n.id, groupId: "" }; })); }); }); }, getSupportedConstraints: function () { return { deviceId: !0, echoCancellation: !0, facingMode: !0, frameRate: !0, height: !0, width: !0 }; } }), u.mediaDevices.getUserMedia) {
        var t = u.mediaDevices.getUserMedia.bind(u.mediaDevices);
        u.mediaDevices.getUserMedia = function (n) { return i(n, function (e) { return t(e).then(function (n) { if (e.audio && !n.getAudioTracks().length || e.video && !n.getVideoTracks().length)
            throw n.getTracks().forEach(function (n) { n.stop(); }), new DOMException("", "NotFoundError"); return n; }, function (n) { return Promise.reject(r(n)); }); }); };
    }
    else
        u.mediaDevices.getUserMedia = function (n) { return e(n); }; void 0 === u.mediaDevices.addEventListener && (u.mediaDevices.addEventListener = function () { c("Dummy mediaDevices.addEventListener called."); }), void 0 === u.mediaDevices.removeEventListener && (u.mediaDevices.removeEventListener = function () { c("Dummy mediaDevices.removeEventListener called."); }); }, shimMediaStream: function (n) { n.MediaStream = n.MediaStream || n.webkitMediaStream; }, shimOnTrack: function (o) { if ("object" != typeof o || !o.RTCPeerConnection || "ontrack" in o.RTCPeerConnection.prototype)
        "RTCRtpTransceiver" in o || v.wrapPeerConnectionEvent(o, "track", function (n) { return n.transceiver || (n.transceiver = { receiver: n.receiver }), n; });
    else {
        Object.defineProperty(o.RTCPeerConnection.prototype, "ontrack", { get: function () { return this.e; }, set: function (n) { this.e && this.removeEventListener("track", this.e), this.addEventListener("track", this.e = n); }, enumerable: !0, configurable: !0 });
        var n = o.RTCPeerConnection.prototype.setRemoteDescription;
        o.RTCPeerConnection.prototype.setRemoteDescription = function () { var r = this; return r.t || (r.t = function (i) { i.stream.addEventListener("addtrack", function (e) { var n; n = o.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function (n) { return n.track && n.track.id === e.track.id; }) : { track: e.track }; var t = new Event("track"); t.track = e.track, t.receiver = n, t.transceiver = { receiver: n }, t.streams = [i.stream], r.dispatchEvent(t); }), i.stream.getTracks().forEach(function (e) { var n; n = o.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function (n) { return n.track && n.track.id === e.id; }) : { track: e }; var t = new Event("track"); t.track = e, t.receiver = n, t.transceiver = { receiver: n }, t.streams = [i.stream], r.dispatchEvent(t); }); }, r.addEventListener("addstream", r.t)), n.apply(r, arguments); };
    } }, shimGetSendersWithDtmf: function (n) { if ("object" == typeof n && n.RTCPeerConnection && !("getSenders" in n.RTCPeerConnection.prototype) && "createDTMFSender" in n.RTCPeerConnection.prototype) {
        var i = function (n, e) { return { track: e, get dtmf() { return void 0 === this.i && ("audio" === e.kind ? this.i = n.createDTMFSender(e) : this.i = null), this.i; }, r: n }; };
        if (!n.RTCPeerConnection.prototype.getSenders) {
            n.RTCPeerConnection.prototype.getSenders = function () { return this.o = this.o || [], this.o.slice(); };
            var r = n.RTCPeerConnection.prototype.addTrack;
            n.RTCPeerConnection.prototype.addTrack = function (n, e) { var t = r.apply(this, arguments); return t || (t = i(this, n), this.o.push(t)), t; };
            var t = n.RTCPeerConnection.prototype.removeTrack;
            n.RTCPeerConnection.prototype.removeTrack = function (n) { t.apply(this, arguments); var e = this.o.indexOf(n); -1 !== e && this.o.splice(e, 1); };
        }
        var o = n.RTCPeerConnection.prototype.addStream;
        n.RTCPeerConnection.prototype.addStream = function (n) { var e = this; e.o = e.o || [], o.apply(e, [n]), n.getTracks().forEach(function (n) { e.o.push(i(e, n)); }); };
        var e = n.RTCPeerConnection.prototype.removeStream;
        n.RTCPeerConnection.prototype.removeStream = function (n) { var t = this; t.o = t.o || [], e.apply(t, [n]), n.getTracks().forEach(function (e) { var n = t.o.find(function (n) { return n.track === e; }); n && t.o.splice(t.o.indexOf(n), 1); }); };
    }
    else if ("object" == typeof n && n.RTCPeerConnection && "getSenders" in n.RTCPeerConnection.prototype && "createDTMFSender" in n.RTCPeerConnection.prototype && n.RTCRtpSender && !("dtmf" in n.RTCRtpSender.prototype)) {
        var a = n.RTCPeerConnection.prototype.getSenders;
        n.RTCPeerConnection.prototype.getSenders = function () { var e = this, n = a.apply(e, []); return n.forEach(function (n) { n.r = e; }), n; }, Object.defineProperty(n.RTCRtpSender.prototype, "dtmf", { get: function () { return void 0 === this.i && ("audio" === this.track.kind ? this.i = this.r.createDTMFSender(this.track) : this.i = null), this.i; } });
    } }, shimSenderReceiverGetStats: function (n) { if ("object" == typeof n && n.RTCPeerConnection && n.RTCRtpSender && n.RTCRtpReceiver) {
        if (!("getStats" in n.RTCRtpSender.prototype)) {
            var t = n.RTCPeerConnection.prototype.getSenders;
            t && (n.RTCPeerConnection.prototype.getSenders = function () { var e = this, n = t.apply(e, []); return n.forEach(function (n) { n.r = e; }), n; });
            var e = n.RTCPeerConnection.prototype.addTrack;
            e && (n.RTCPeerConnection.prototype.addTrack = function () { var n = e.apply(this, arguments); return n.r = this, n; }), n.RTCRtpSender.prototype.getStats = function () { var e = this; return this.r.getStats().then(function (n) { return u(n, e.track, !0); }); };
        }
        if (!("getStats" in n.RTCRtpReceiver.prototype)) {
            var i = n.RTCPeerConnection.prototype.getReceivers;
            i && (n.RTCPeerConnection.prototype.getReceivers = function () { var e = this, n = i.apply(e, []); return n.forEach(function (n) { n.r = e; }), n; }), v.wrapPeerConnectionEvent(n, "track", function (n) { return n.receiver.r = n.srcElement, n; }), n.RTCRtpReceiver.prototype.getStats = function () { var e = this; return this.r.getStats().then(function (n) { return u(n, e.track, !1); }); };
        }
        if ("getStats" in n.RTCRtpSender.prototype && "getStats" in n.RTCRtpReceiver.prototype) {
            var o = n.RTCPeerConnection.prototype.getStats;
            n.RTCPeerConnection.prototype.getStats = function () { if (0 < arguments.length && arguments[0] instanceof n.MediaStreamTrack) {
                var e, t, i, r = arguments[0];
                return this.getSenders().forEach(function (n) { n.track === r && (e ? i = !0 : e = n); }), this.getReceivers().forEach(function (n) { return n.track === r && (t ? i = !0 : t = n), n.track === r; }), i || e && t ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : e ? e.getStats() : t ? t.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
            } return o.apply(this, arguments); };
        }
    } }, shimSourceObject: function (n) { var t = n && n.URL; "object" == typeof n && (!n.HTMLMediaElement || "srcObject" in n.HTMLMediaElement.prototype || Object.defineProperty(n.HTMLMediaElement.prototype, "srcObject", { get: function () { return this.a; }, set: function (n) { var e = this; this.a = n, this.src && t.revokeObjectURL(this.src), n ? (this.src = t.createObjectURL(n), n.addEventListener("addtrack", function () { e.src && t.revokeObjectURL(e.src), e.src = t.createObjectURL(n); }), n.addEventListener("removetrack", function () { e.src && t.revokeObjectURL(e.src), e.src = t.createObjectURL(n); })) : this.src = ""; } })); }, shimAddTrackRemoveTrackWithNative: function (n) { n.RTCPeerConnection.prototype.getLocalStreams = function () { var e = this; return this.u = this.u || {}, Object.keys(this.u).map(function (n) { return e.u[n][0]; }); }; var i = n.RTCPeerConnection.prototype.addTrack; n.RTCPeerConnection.prototype.addTrack = function (n, e) { if (!e)
        return i.apply(this, arguments); this.u = this.u || {}; var t = i.apply(this, arguments); return this.u[e.id] ? -1 === this.u[e.id].indexOf(t) && this.u[e.id].push(t) : this.u[e.id] = [e, t], t; }; var r = n.RTCPeerConnection.prototype.addStream; n.RTCPeerConnection.prototype.addStream = function (n) { var t = this; this.u = this.u || {}, n.getTracks().forEach(function (e) { if (t.getSenders().find(function (n) { return n.track === e; }))
        throw new DOMException("Track already exists.", "InvalidAccessError"); }); var e = t.getSenders(); r.apply(this, arguments); var i = t.getSenders().filter(function (n) { return -1 === e.indexOf(n); }); this.u[n.id] = [n].concat(i); }; var e = n.RTCPeerConnection.prototype.removeStream; n.RTCPeerConnection.prototype.removeStream = function (n) { return this.u = this.u || {}, delete this.u[n.id], e.apply(this, arguments); }; var o = n.RTCPeerConnection.prototype.removeTrack; n.RTCPeerConnection.prototype.removeTrack = function (t) { var i = this; return this.u = this.u || {}, t && Object.keys(this.u).forEach(function (n) { var e = i.u[n].indexOf(t); -1 !== e && i.u[n].splice(e, 1), 1 === i.u[n].length && delete i.u[n]; }), o.apply(this, arguments); }; }, shimAddTrackRemoveTrack: function (a) { var n = v.detectBrowser(a); if (a.RTCPeerConnection.prototype.addTrack && 65 <= n.version)
        return this.shimAddTrackRemoveTrackWithNative(a); var t = a.RTCPeerConnection.prototype.getLocalStreams; a.RTCPeerConnection.prototype.getLocalStreams = function () { var e = this, n = t.apply(this); return e.s = e.s || {}, n.map(function (n) { return e.s[n.id]; }); }; var i = a.RTCPeerConnection.prototype.addStream; a.RTCPeerConnection.prototype.addStream = function (n) { var t = this; if (t.c = t.c || {}, t.s = t.s || {}, n.getTracks().forEach(function (e) { if (t.getSenders().find(function (n) { return n.track === e; }))
        throw new DOMException("Track already exists.", "InvalidAccessError"); }), !t.s[n.id]) {
        var e = new a.MediaStream(n.getTracks());
        t.c[n.id] = e, t.s[e.id] = n, n = e;
    } i.apply(t, [n]); }; var r = a.RTCPeerConnection.prototype.removeStream; function o(i, n) { var r = n.sdp; return Object.keys(i.s || []).forEach(function (n) { var e = i.s[n], t = i.c[e.id]; r = r.replace(new RegExp(t.id, "g"), e.id); }), new RTCSessionDescription({ type: n.type, sdp: r }); } a.RTCPeerConnection.prototype.removeStream = function (n) { var e = this; e.c = e.c || {}, e.s = e.s || {}, r.apply(e, [e.c[n.id] || n]), delete e.s[e.c[n.id] ? e.c[n.id].id : n.id], delete e.c[n.id]; }, a.RTCPeerConnection.prototype.addTrack = function (e, n) { var t = this; if ("closed" === t.signalingState)
        throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError"); var i = [].slice.call(arguments, 1); if (1 !== i.length || !i[0].getTracks().find(function (n) { return n === e; }))
        throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError"); if (t.getSenders().find(function (n) { return n.track === e; }))
        throw new DOMException("Track already exists.", "InvalidAccessError"); t.c = t.c || {}, t.s = t.s || {}; var r = t.c[n.id]; if (r)
        r.addTrack(e), Promise.resolve().then(function () { t.dispatchEvent(new Event("negotiationneeded")); });
    else {
        var o = new a.MediaStream([e]);
        t.c[n.id] = o, t.s[o.id] = n, t.addStream(o);
    } return t.getSenders().find(function (n) { return n.track === e; }); }, ["createOffer", "createAnswer"].forEach(function (n) { var e = a.RTCPeerConnection.prototype[n]; a.RTCPeerConnection.prototype[n] = function () { var t = this, i = arguments; return arguments.length && "function" == typeof arguments[0] ? e.apply(t, [function (n) { var e = o(t, n); i[0].apply(null, [e]); }, function (n) { i[1] && i[1].apply(null, n); }, arguments[2]]) : e.apply(t, arguments).then(function (n) { return o(t, n); }); }; }); var e = a.RTCPeerConnection.prototype.setLocalDescription; a.RTCPeerConnection.prototype.setLocalDescription = function () { var i, n, r; return arguments.length && arguments[0].type && (arguments[0] = (i = this, n = arguments[0], r = n.sdp, Object.keys(i.s || []).forEach(function (n) { var e = i.s[n], t = i.c[e.id]; r = r.replace(new RegExp(e.id, "g"), t.id); }), new RTCSessionDescription({ type: n.type, sdp: r }))), e.apply(this, arguments); }; var u = Object.getOwnPropertyDescriptor(a.RTCPeerConnection.prototype, "localDescription"); Object.defineProperty(a.RTCPeerConnection.prototype, "localDescription", { get: function () { var n = u.get.apply(this); return "" === n.type ? n : o(this, n); } }), a.RTCPeerConnection.prototype.removeTrack = function (e) { var t, i = this; if ("closed" === i.signalingState)
        throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError"); if (!e.r)
        throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError"); if (!(e.r === i))
        throw new DOMException("Sender was not created by this connection.", "InvalidAccessError"); i.c = i.c || {}, Object.keys(i.c).forEach(function (n) { i.c[n].getTracks().find(function (n) { return e.track === n; }) && (t = i.c[n]); }), t && (1 === t.getTracks().length ? i.removeStream(i.s[t.id]) : t.removeTrack(e.track), i.dispatchEvent(new Event("negotiationneeded"))); }; }, shimPeerConnection: function (t) { var n = v.detectBrowser(t); if (!t.RTCPeerConnection && t.webkitRTCPeerConnection)
        t.RTCPeerConnection = function (n, e) { return s("PeerConnection"), n && n.iceTransportPolicy && (n.iceTransports = n.iceTransportPolicy), new t.webkitRTCPeerConnection(n, e); }, t.RTCPeerConnection.prototype = t.webkitRTCPeerConnection.prototype, t.webkitRTCPeerConnection.generateCertificate && Object.defineProperty(t.RTCPeerConnection, "generateCertificate", { get: function () { return t.webkitRTCPeerConnection.generateCertificate; } });
    else {
        var o = t.RTCPeerConnection;
        t.RTCPeerConnection = function (n, e) { if (n && n.iceServers) {
            for (var t = [], i = 0; i < n.iceServers.length; i++) {
                var r = n.iceServers[i];
                !r.hasOwnProperty("urls") && r.hasOwnProperty("url") ? (v.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (r = JSON.parse(JSON.stringify(r))).urls = r.url, t.push(r)) : t.push(n.iceServers[i]);
            }
            n.iceServers = t;
        } return new o(n, e); }, t.RTCPeerConnection.prototype = o.prototype, Object.defineProperty(t.RTCPeerConnection, "generateCertificate", { get: function () { return o.generateCertificate; } });
    } var u = t.RTCPeerConnection.prototype.getStats; t.RTCPeerConnection.prototype.getStats = function (n, e, t) { var i = this, r = arguments; if (0 < arguments.length && "function" == typeof n)
        return u.apply(this, arguments); if (0 === u.length && (0 === arguments.length || "function" != typeof n))
        return u.apply(this, []); var o = function (n) { var i = {}; return n.result().forEach(function (e) { var t = { id: e.id, timestamp: e.timestamp, type: { localcandidate: "local-candidate", remotecandidate: "remote-candidate" }[e.type] || e.type }; e.names().forEach(function (n) { t[n] = e.stat(n); }), i[t.id] = t; }), i; }, a = function (e) { return new Map(Object.keys(e).map(function (n) { return [n, e[n]]; })); }; if (2 <= arguments.length) {
        return u.apply(this, [function (n) { r[1](a(o(n))); }, n]);
    } return new Promise(function (e, n) { u.apply(i, [function (n) { e(a(o(n))); }, n]); }).then(e, t); }, n.version < 51 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (n) { var r = t.RTCPeerConnection.prototype[n]; t.RTCPeerConnection.prototype[n] = function () { var t = arguments, i = this, n = new Promise(function (n, e) { r.apply(i, [t[0], n, e]); }); return t.length < 2 ? n : n.then(function () { t[1].apply(null, []); }, function (n) { 3 <= t.length && t[2].apply(null, [n]); }); }; }), n.version < 52 && ["createOffer", "createAnswer"].forEach(function (n) { var r = t.RTCPeerConnection.prototype[n]; t.RTCPeerConnection.prototype[n] = function () { var t = this; if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
        var i = 1 === arguments.length ? arguments[0] : void 0;
        return new Promise(function (n, e) { r.apply(t, [n, e, i]); });
    } return r.apply(this, arguments); }; }), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (n) { var e = t.RTCPeerConnection.prototype[n]; t.RTCPeerConnection.prototype[n] = function () { return arguments[0] = new ("addIceCandidate" === n ? t.RTCIceCandidate : t.RTCSessionDescription)(arguments[0]), e.apply(this, arguments); }; }); var e = t.RTCPeerConnection.prototype.addIceCandidate; t.RTCPeerConnection.prototype.addIceCandidate = function () { return arguments[0] ? e.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve()); }; }, fixNegotiationNeeded: function (n) { v.wrapPeerConnectionEvent(n, "negotiationneeded", function (n) { if ("stable" === n.target.signalingState)
        return n; }); }, shimGetDisplayMedia: function (n, t) { "getDisplayMedia" in n.navigator || ("function" == typeof t ? navigator.getDisplayMedia = function (e) { return t(e).then(function (n) { return e.video = { mandatory: { chromeMediaSource: "desktop", chromeMediaSourceId: n, maxFrameRate: e.video.frameRate || 3 } }, navigator.mediaDevices.getUserMedia(e); }); } : console.error("shimGetDisplayMedia: getSourceId argument is not a function")); } }, L = (function (n) { var f = { generateIdentifier: function () { return Math.random().toString(36).substr(2, 10); } }; f.localCName = f.generateIdentifier(), f.splitLines = function (n) { return n.trim().split("\n").map(function (n) { return n.trim(); }); }, f.splitSections = function (n) { return n.split("\nm=").map(function (n, e) { return (0 < e ? "m=" + n : n).trim() + "\r\n"; }); }, f.getDescription = function (n) { var e = f.splitSections(n); return e && e[0]; }, f.getMediaSections = function (n) { var e = f.splitSections(n); return e.shift(), e; }, f.matchPrefix = function (n, e) { return f.splitLines(n).filter(function (n) { return 0 === n.indexOf(e); }); }, f.parseCandidate = function (n) { for (var e, t = { foundation: (e = 0 === n.indexOf("a=candidate:") ? n.substring(12).split(" ") : n.substring(10).split(" "))[0], component: parseInt(e[1], 10), protocol: e[2].toLowerCase(), priority: parseInt(e[3], 10), ip: e[4], port: parseInt(e[5], 10), type: e[7] }, i = 8; i < e.length; i += 2)
    switch (e[i]) {
        case "raddr":
            t.relatedAddress = e[i + 1];
            break;
        case "rport":
            t.relatedPort = parseInt(e[i + 1], 10);
            break;
        case "tcptype":
            t.tcpType = e[i + 1];
            break;
        case "ufrag":
            t.ufrag = e[i + 1], t.usernameFragment = e[i + 1];
            break;
        default: t[e[i]] = e[i + 1];
    } return t; }, f.writeCandidate = function (n) { var e = []; e.push(n.foundation), e.push(n.component), e.push(n.protocol.toUpperCase()), e.push(n.priority), e.push(n.ip), e.push(n.port); var t = n.type; return e.push("typ"), e.push(t), "host" !== t && n.relatedAddress && n.relatedPort && (e.push("raddr"), e.push(n.relatedAddress), e.push("rport"), e.push(n.relatedPort)), n.tcpType && "tcp" === n.protocol.toLowerCase() && (e.push("tcptype"), e.push(n.tcpType)), (n.usernameFragment || n.ufrag) && (e.push("ufrag"), e.push(n.usernameFragment || n.ufrag)), "candidate:" + e.join(" "); }, f.parseIceOptions = function (n) { return n.substr(14).split(" "); }, f.parseRtpMap = function (n) { var e = n.substr(9).split(" "), t = { payloadType: parseInt(e.shift(), 10) }; return e = e[0].split("/"), t.name = e[0], t.clockRate = parseInt(e[1], 10), t.channels = 3 === e.length ? parseInt(e[2], 10) : 1, t.numChannels = t.channels, t; }, f.writeRtpMap = function (n) { var e = n.payloadType; void 0 !== n.preferredPayloadType && (e = n.preferredPayloadType); var t = n.channels || n.numChannels || 1; return "a=rtpmap:" + e + " " + n.name + "/" + n.clockRate + (1 !== t ? "/" + t : "") + "\r\n"; }, f.parseExtmap = function (n) { var e = n.substr(9).split(" "); return { id: parseInt(e[0], 10), direction: 0 < e[0].indexOf("/") ? e[0].split("/")[1] : "sendrecv", uri: e[1] }; }, f.writeExtmap = function (n) { return "a=extmap:" + (n.id || n.preferredId) + (n.direction && "sendrecv" !== n.direction ? "/" + n.direction : "") + " " + n.uri + "\r\n"; }, f.parseFmtp = function (n) { for (var e, t = {}, i = n.substr(n.indexOf(" ") + 1).split(";"), r = 0; r < i.length; r++)
    t[(e = i[r].trim().split("="))[0].trim()] = e[1]; return t; }, f.writeFmtp = function (e) { var n = "", t = e.payloadType; if (void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
    var i = [];
    Object.keys(e.parameters).forEach(function (n) { e.parameters[n] ? i.push(n + "=" + e.parameters[n]) : i.push(n); }), n += "a=fmtp:" + t + " " + i.join(";") + "\r\n";
} return n; }, f.parseRtcpFb = function (n) { var e = n.substr(n.indexOf(" ") + 1).split(" "); return { type: e.shift(), parameter: e.join(" ") }; }, f.writeRtcpFb = function (n) { var e = "", t = n.payloadType; return void 0 !== n.preferredPayloadType && (t = n.preferredPayloadType), n.rtcpFeedback && n.rtcpFeedback.length && n.rtcpFeedback.forEach(function (n) { e += "a=rtcp-fb:" + t + " " + n.type + (n.parameter && n.parameter.length ? " " + n.parameter : "") + "\r\n"; }), e; }, f.parseSsrcMedia = function (n) { var e = n.indexOf(" "), t = { ssrc: parseInt(n.substr(7, e - 7), 10) }, i = n.indexOf(":", e); return -1 < i ? (t.attribute = n.substr(e + 1, i - e - 1), t.value = n.substr(i + 1)) : t.attribute = n.substr(e + 1), t; }, f.parseSsrcGroup = function (n) { var e = n.substr(13).split(" "); return { semantics: e.shift(), ssrcs: e.map(function (n) { return parseInt(n, 10); }) }; }, f.getMid = function (n) { var e = f.matchPrefix(n, "a=mid:")[0]; if (e)
    return e.substr(6); }, f.parseFingerprint = function (n) { var e = n.substr(14).split(" "); return { algorithm: e[0].toLowerCase(), value: e[1] }; }, f.getDtlsParameters = function (n, e) { return { role: "auto", fingerprints: f.matchPrefix(n + e, "a=fingerprint:").map(f.parseFingerprint) }; }, f.writeDtlsParameters = function (n, e) { var t = "a=setup:" + e + "\r\n"; return n.fingerprints.forEach(function (n) { t += "a=fingerprint:" + n.algorithm + " " + n.value + "\r\n"; }), t; }, f.getIceParameters = function (n, e) { var t = f.splitLines(n); return { usernameFragment: (t = t.concat(f.splitLines(e))).filter(function (n) { return 0 === n.indexOf("a=ice-ufrag:"); })[0].substr(12), password: t.filter(function (n) { return 0 === n.indexOf("a=ice-pwd:"); })[0].substr(10) }; }, f.writeIceParameters = function (n) { return "a=ice-ufrag:" + n.usernameFragment + "\r\na=ice-pwd:" + n.password + "\r\n"; }, f.parseRtpParameters = function (n) { for (var e = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] }, t = f.splitLines(n)[0].split(" "), i = 3; i < t.length; i++) {
    var r = t[i], o = f.matchPrefix(n, "a=rtpmap:" + r + " ")[0];
    if (o) {
        var a = f.parseRtpMap(o), u = f.matchPrefix(n, "a=fmtp:" + r + " ");
        switch (a.parameters = u.length ? f.parseFmtp(u[0]) : {}, a.rtcpFeedback = f.matchPrefix(n, "a=rtcp-fb:" + r + " ").map(f.parseRtcpFb), e.codecs.push(a), a.name.toUpperCase()) {
            case "RED":
            case "ULPFEC": e.fecMechanisms.push(a.name.toUpperCase());
        }
    }
} return f.matchPrefix(n, "a=extmap:").forEach(function (n) { e.headerExtensions.push(f.parseExtmap(n)); }), e; }, f.writeRtpDescription = function (n, e) { var t = ""; t += "m=" + n + " ", t += 0 < e.codecs.length ? "9" : "0", t += " UDP/TLS/RTP/SAVPF ", t += e.codecs.map(function (n) { return void 0 !== n.preferredPayloadType ? n.preferredPayloadType : n.payloadType; }).join(" ") + "\r\n", t += "c=IN IP4 0.0.0.0\r\n", t += "a=rtcp:9 IN IP4 0.0.0.0\r\n", e.codecs.forEach(function (n) { t += f.writeRtpMap(n), t += f.writeFmtp(n), t += f.writeRtcpFb(n); }); var i = 0; return e.codecs.forEach(function (n) { n.maxptime > i && (i = n.maxptime); }), 0 < i && (t += "a=maxptime:" + i + "\r\n"), t += "a=rtcp-mux\r\n", e.headerExtensions && e.headerExtensions.forEach(function (n) { t += f.writeExtmap(n); }), t; }, f.parseRtpEncodingParameters = function (n) { var t, i = [], e = f.parseRtpParameters(n), r = -1 !== e.fecMechanisms.indexOf("RED"), o = -1 !== e.fecMechanisms.indexOf("ULPFEC"), a = f.matchPrefix(n, "a=ssrc:").map(function (n) { return f.parseSsrcMedia(n); }).filter(function (n) { return "cname" === n.attribute; }), u = 0 < a.length && a[0].ssrc, s = f.matchPrefix(n, "a=ssrc-group:FID").map(function (n) { return n.substr(17).split(" ").map(function (n) { return parseInt(n, 10); }); }); 0 < s.length && 1 < s[0].length && s[0][0] === u && (t = s[0][1]), e.codecs.forEach(function (n) { if ("RTX" === n.name.toUpperCase() && n.parameters.apt) {
    var e = { ssrc: u, codecPayloadType: parseInt(n.parameters.apt, 10) };
    u && t && (e.rtx = { ssrc: t }), i.push(e), r && ((e = JSON.parse(JSON.stringify(e))).fec = { ssrc: t, mechanism: o ? "red+ulpfec" : "red" }, i.push(e));
} }), 0 === i.length && u && i.push({ ssrc: u }); var c = f.matchPrefix(n, "b="); return c.length && (c = 0 === c[0].indexOf("b=TIAS:") ? parseInt(c[0].substr(7), 10) : 0 === c[0].indexOf("b=AS:") ? 1e3 * parseInt(c[0].substr(5), 10) * .95 - 16e3 : void 0, i.forEach(function (n) { n.maxBitrate = c; })), i; }, f.parseRtcpParameters = function (n) { var e = {}, t = f.matchPrefix(n, "a=ssrc:").map(function (n) { return f.parseSsrcMedia(n); }).filter(function (n) { return "cname" === n.attribute; })[0]; t && (e.cname = t.value, e.ssrc = t.ssrc); var i = f.matchPrefix(n, "a=rtcp-rsize"); e.reducedSize = 0 < i.length, e.compound = 0 === i.length; var r = f.matchPrefix(n, "a=rtcp-mux"); return e.mux = 0 < r.length, e; }, f.parseMsid = function (n) { var e, t = f.matchPrefix(n, "a=msid:"); if (1 === t.length)
    return { stream: (e = t[0].substr(7).split(" "))[0], track: e[1] }; var i = f.matchPrefix(n, "a=ssrc:").map(function (n) { return f.parseSsrcMedia(n); }).filter(function (n) { return "msid" === n.attribute; }); return 0 < i.length ? { stream: (e = i[0].value.split(" "))[0], track: e[1] } : void 0; }, f.generateSessionId = function () { return Math.random().toString().substr(2, 21); }, f.writeSessionBoilerplate = function (n, e) { var t = void 0 !== e ? e : 2; return "v=0\r\no=thisisadapterortc " + (n || f.generateSessionId()) + " " + t + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"; }, f.writeMediaSection = function (n, e, t, i) { var r = f.writeRtpDescription(n.kind, e); if (r += f.writeIceParameters(n.iceGatherer.getLocalParameters()), r += f.writeDtlsParameters(n.dtlsTransport.getLocalParameters(), "offer" === t ? "actpass" : "active"), r += "a=mid:" + n.mid + "\r\n", n.direction ? r += "a=" + n.direction + "\r\n" : n.rtpSender && n.rtpReceiver ? r += "a=sendrecv\r\n" : n.rtpSender ? r += "a=sendonly\r\n" : n.rtpReceiver ? r += "a=recvonly\r\n" : r += "a=inactive\r\n", n.rtpSender) {
    var o = "msid:" + i.id + " " + n.rtpSender.track.id + "\r\n";
    r += "a=" + o, r += "a=ssrc:" + n.sendEncodingParameters[0].ssrc + " " + o, n.sendEncodingParameters[0].rtx && (r += "a=ssrc:" + n.sendEncodingParameters[0].rtx.ssrc + " " + o, r += "a=ssrc-group:FID " + n.sendEncodingParameters[0].ssrc + " " + n.sendEncodingParameters[0].rtx.ssrc + "\r\n");
} return r += "a=ssrc:" + n.sendEncodingParameters[0].ssrc + " cname:" + f.localCName + "\r\n", n.rtpSender && n.sendEncodingParameters[0].rtx && (r += "a=ssrc:" + n.sendEncodingParameters[0].rtx.ssrc + " cname:" + f.localCName + "\r\n"), r; }, f.getDirection = function (n, e) { for (var t = f.splitLines(n), i = 0; i < t.length; i++)
    switch (t[i]) {
        case "a=sendrecv":
        case "a=sendonly":
        case "a=recvonly":
        case "a=inactive": return t[i].substr(2);
    } return e ? f.getDirection(e) : "sendrecv"; }, f.getKind = function (n) { return f.splitLines(n)[0].split(" ")[0].substr(2); }, f.isRejected = function (n) { return "0" === n.split(" ", 2)[1]; }, f.parseMLine = function (n) { var e = f.splitLines(n)[0].substr(2).split(" "); return { kind: e[0], port: parseInt(e[1], 10), protocol: e[2], fmt: e.slice(3).join(" ") }; }, f.parseOLine = function (n) { var e = f.matchPrefix(n, "o=")[0].substr(2).split(" "); return { username: e[0], sessionId: e[1], sessionVersion: parseInt(e[2], 10), netType: e[3], addressType: e[4], address: e[5] }; }, f.isValidSDP = function (n) { if ("string" != typeof n || 0 === n.length)
    return !1; for (var e = f.splitLines(n), t = 0; t < e.length; t++)
    if (e[t].length < 2 || "=" !== e[t].charAt(1))
        return !1; return !0; }, n.exports = f; }(o = { exports: {} }, o.exports), o.exports); function f(n, e, t, i, r) { var o = L.writeRtpDescription(n.kind, e); if (o += L.writeIceParameters(n.iceGatherer.getLocalParameters()), o += L.writeDtlsParameters(n.dtlsTransport.getLocalParameters(), "offer" === t ? "actpass" : r || "active"), o += "a=mid:" + n.mid + "\r\n", n.rtpSender && n.rtpReceiver ? o += "a=sendrecv\r\n" : n.rtpSender ? o += "a=sendonly\r\n" : n.rtpReceiver ? o += "a=recvonly\r\n" : o += "a=inactive\r\n", n.rtpSender) {
    var a = n.rtpSender.f || n.rtpSender.track.id;
    n.rtpSender.f = a;
    var u = "msid:" + (i ? i.id : "-") + " " + a + "\r\n";
    o += "a=" + u, o += "a=ssrc:" + n.sendEncodingParameters[0].ssrc + " " + u, n.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + n.sendEncodingParameters[0].rtx.ssrc + " " + u, o += "a=ssrc-group:FID " + n.sendEncodingParameters[0].ssrc + " " + n.sendEncodingParameters[0].rtx.ssrc + "\r\n");
} return o += "a=ssrc:" + n.sendEncodingParameters[0].ssrc + " cname:" + L.localCName + "\r\n", n.rtpSender && n.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + n.sendEncodingParameters[0].rtx.ssrc + " cname:" + L.localCName + "\r\n"), o; } function p(c, f) { var d = { codecs: [], headerExtensions: [], fecMechanisms: [] }, l = function (n, e) { n = parseInt(n, 10); for (var t = 0; t < e.length; t++)
    if (e[t].payloadType === n || e[t].preferredPayloadType === n)
        return e[t]; }; return c.codecs.forEach(function (t) { for (var n = 0; n < f.codecs.length; n++) {
    var e = f.codecs[n];
    if (t.name.toLowerCase() === e.name.toLowerCase() && t.clockRate === e.clockRate) {
        if ("rtx" === t.name.toLowerCase() && t.parameters && e.parameters.apt && (i = t, r = e, o = c.codecs, a = f.codecs, s = u = void 0, u = l(i.parameters.apt, o), s = l(r.parameters.apt, a), !u || !s || u.name.toLowerCase() !== s.name.toLowerCase()))
            continue;
        (e = JSON.parse(JSON.stringify(e))).numChannels = Math.min(t.numChannels, e.numChannels), d.codecs.push(e), e.rtcpFeedback = e.rtcpFeedback.filter(function (n) { for (var e = 0; e < t.rtcpFeedback.length; e++)
            if (t.rtcpFeedback[e].type === n.type && t.rtcpFeedback[e].parameter === n.parameter)
                return !0; return !1; });
        break;
    }
} var i, r, o, a, u, s; }), c.headerExtensions.forEach(function (n) { for (var e = 0; e < f.headerExtensions.length; e++) {
    var t = f.headerExtensions[e];
    if (n.uri === t.uri) {
        d.headerExtensions.push(t);
        break;
    }
} }), d; } function m(n, e, t) { return -1 !== { offer: { setLocalDescription: ["stable", "have-local-offer"], setRemoteDescription: ["stable", "have-remote-offer"] }, answer: { setLocalDescription: ["have-remote-offer", "have-local-pranswer"], setRemoteDescription: ["have-local-offer", "have-remote-pranswer"] } }[e][n].indexOf(t); } function F(n, e) { var t = n.getRemoteCandidates().find(function (n) { return e.foundation === n.foundation && e.ip === n.ip && e.port === n.port && e.priority === n.priority && e.protocol === n.protocol && e.type === n.type; }); return t || n.addRemoteCandidate(e), !t; } function g(n, e) { var t = new Error(e); return t.name = n, t.code = { NotSupportedError: 9, InvalidStateError: 11, InvalidAccessError: 15, TypeError: void 0, OperationError: void 0 }[n], t; } var d = function (x, A) { function N(n, e) { e.addTrack(n), e.dispatchEvent(new x.MediaStreamTrackEvent("addtrack", { track: n })); } function r(n, e, t, i) { var r = new Event("track"); r.track = e, r.receiver = t, r.transceiver = { receiver: t }, r.streams = i, x.setTimeout(function () { n.d("track", r); }); } var i = function (n) { var e, i, r, t = this, o = document.createDocumentFragment(); if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function (n) { t[n] = o[n].bind(o); }), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this.l = null, this.v = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", n = JSON.parse(JSON.stringify(n || {})), this.usingBundle = "max-bundle" === n.bundlePolicy, "negotiate" === n.rtcpMuxPolicy)
    throw g("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported"); switch (n.rtcpMuxPolicy || (n.rtcpMuxPolicy = "require"), n.iceTransportPolicy) {
    case "all":
    case "relay": break;
    default: n.iceTransportPolicy = "all";
} switch (n.bundlePolicy) {
    case "balanced":
    case "max-compat":
    case "max-bundle": break;
    default: n.bundlePolicy = "balanced";
} if (n.iceServers = (e = n.iceServers || [], i = A, r = !1, (e = JSON.parse(JSON.stringify(e))).filter(function (n) { if (n && (n.urls || n.url)) {
    var e = n.urls || n.url;
    n.url && !n.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
    var t = "string" == typeof e;
    return t && (e = [e]), e = e.filter(function (n) { return 0 !== n.indexOf("turn:") || -1 === n.indexOf("transport=udp") || -1 !== n.indexOf("turn:[") || r ? 0 === n.indexOf("stun:") && 14393 <= i && -1 === n.indexOf("?transport=udp") : r = !0; }), delete n.url, n.urls = t ? e[0] : e, !!e.length;
} })), this.h = [], n.iceCandidatePoolSize)
    for (var a = n.iceCandidatePoolSize; 0 < a; a--)
        this.h.push(new x.RTCIceGatherer({ iceServers: n.iceServers, gatherPolicy: n.iceTransportPolicy }));
else
    n.iceCandidatePoolSize = 0; this.p = n, this.transceivers = [], this.m = L.generateSessionId(), this.g = 0, this.w = void 0, this.y = !1; }; Object.defineProperty(i.prototype, "localDescription", { configurable: !0, get: function () { return this.l; } }), Object.defineProperty(i.prototype, "remoteDescription", { configurable: !0, get: function () { return this.v; } }), i.prototype.onicecandidate = null, i.prototype.onaddstream = null, i.prototype.ontrack = null, i.prototype.onremovestream = null, i.prototype.onsignalingstatechange = null, i.prototype.oniceconnectionstatechange = null, i.prototype.onconnectionstatechange = null, i.prototype.onicegatheringstatechange = null, i.prototype.onnegotiationneeded = null, i.prototype.ondatachannel = null, i.prototype.d = function (n, e) { this.y || (this.dispatchEvent(e), "function" == typeof this["on" + n] && this["on" + n](e)); }, i.prototype.b = function () { var n = new Event("icegatheringstatechange"); this.d("icegatheringstatechange", n); }, i.prototype.getConfiguration = function () { return this.p; }, i.prototype.getLocalStreams = function () { return this.localStreams; }, i.prototype.getRemoteStreams = function () { return this.remoteStreams; }, i.prototype.S = function (n, e) { var t = 0 < this.transceivers.length, i = { track: null, iceGatherer: null, iceTransport: null, dtlsTransport: null, localCapabilities: null, remoteCapabilities: null, rtpSender: null, rtpReceiver: null, kind: n, mid: null, sendEncodingParameters: null, recvEncodingParameters: null, stream: null, associatedRemoteMediaStreams: [], wantReceive: !0 }; if (this.usingBundle && t)
    i.iceTransport = this.transceivers[0].iceTransport, i.dtlsTransport = this.transceivers[0].dtlsTransport;
else {
    var r = this.k();
    i.iceTransport = r.iceTransport, i.dtlsTransport = r.dtlsTransport;
} return e || this.transceivers.push(i), i; }, i.prototype.addTrack = function (e, n) { if (this.y)
    throw g("InvalidStateError", "Attempted to call addTrack on a closed peerconnection."); var t; if (this.transceivers.find(function (n) { return n.track === e; }))
    throw g("InvalidAccessError", "Track already exists."); for (var i = 0; i < this.transceivers.length; i++)
    this.transceivers[i].track || this.transceivers[i].kind !== e.kind || (t = this.transceivers[i]); return t || (t = this.S(e.kind)), this.I(), -1 === this.localStreams.indexOf(n) && this.localStreams.push(n), t.track = e, t.stream = n, t.rtpSender = new x.RTCRtpSender(e, t.dtlsTransport), t.rtpSender; }, i.prototype.addStream = function (e) { var t = this; if (15025 <= A)
    e.getTracks().forEach(function (n) { t.addTrack(n, e); });
else {
    var i = e.clone();
    e.getTracks().forEach(function (n, e) { var t = i.getTracks()[e]; n.addEventListener("enabled", function (n) { t.enabled = n.enabled; }); }), i.getTracks().forEach(function (n) { t.addTrack(n, i); });
} }, i.prototype.removeTrack = function (e) { if (this.y)
    throw g("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection."); if (!(e instanceof x.RTCRtpSender))
    throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender."); var n = this.transceivers.find(function (n) { return n.rtpSender === e; }); if (!n)
    throw g("InvalidAccessError", "Sender was not created by this connection."); var t = n.stream; n.rtpSender.stop(), n.rtpSender = null, n.track = null, n.stream = null, -1 === this.transceivers.map(function (n) { return n.stream; }).indexOf(t) && -1 < this.localStreams.indexOf(t) && this.localStreams.splice(this.localStreams.indexOf(t), 1), this.I(); }, i.prototype.removeStream = function (n) { var t = this; n.getTracks().forEach(function (e) { var n = t.getSenders().find(function (n) { return n.track === e; }); n && t.removeTrack(n); }); }, i.prototype.getSenders = function () { return this.transceivers.filter(function (n) { return !!n.rtpSender; }).map(function (n) { return n.rtpSender; }); }, i.prototype.getReceivers = function () { return this.transceivers.filter(function (n) { return !!n.rtpReceiver; }).map(function (n) { return n.rtpReceiver; }); }, i.prototype.T = function (t, n) { var i = this; if (n && 0 < t)
    return this.transceivers[0].iceGatherer; if (this.h.length)
    return this.h.shift(); var r = new x.RTCIceGatherer({ iceServers: this.p.iceServers, gatherPolicy: this.p.iceTransportPolicy }); return Object.defineProperty(r, "state", { value: "new", writable: !0 }), this.transceivers[t].bufferedCandidateEvents = [], this.transceivers[t].bufferCandidates = function (n) { var e = !n.candidate || 0 === Object.keys(n.candidate).length; r.state = e ? "completed" : "gathering", null !== i.transceivers[t].bufferedCandidateEvents && i.transceivers[t].bufferedCandidateEvents.push(n); }, r.addEventListener("localcandidate", this.transceivers[t].bufferCandidates), r; }, i.prototype.O = function (u, s) { var c = this, f = this.transceivers[s].iceGatherer; if (!f.onlocalcandidate) {
    var n = this.transceivers[s].bufferedCandidateEvents;
    this.transceivers[s].bufferedCandidateEvents = null, f.removeEventListener("localcandidate", this.transceivers[s].bufferCandidates), f.onlocalcandidate = function (n) { if (!(c.usingBundle && 0 < s)) {
        var e = new Event("icecandidate");
        e.candidate = { sdpMid: u, sdpMLineIndex: s };
        var t = n.candidate, i = !t || 0 === Object.keys(t).length;
        if (i)
            "new" !== f.state && "gathering" !== f.state || (f.state = "completed");
        else {
            "new" === f.state && (f.state = "gathering"), t.component = 1, t.ufrag = f.getLocalParameters().usernameFragment;
            var r = L.writeCandidate(t);
            e.candidate = Object.assign(e.candidate, L.parseCandidate(r)), e.candidate.candidate = r, e.candidate.toJSON = function () { return { candidate: e.candidate.candidate, sdpMid: e.candidate.sdpMid, sdpMLineIndex: e.candidate.sdpMLineIndex, usernameFragment: e.candidate.usernameFragment }; };
        }
        var o = L.getMediaSections(c.l.sdp);
        o[e.candidate.sdpMLineIndex] += i ? "a=end-of-candidates\r\n" : "a=" + e.candidate.candidate + "\r\n", c.l.sdp = L.getDescription(c.l.sdp) + o.join("");
        var a = c.transceivers.every(function (n) { return n.iceGatherer && "completed" === n.iceGatherer.state; });
        "gathering" !== c.iceGatheringState && (c.iceGatheringState = "gathering", c.b()), i || c.d("icecandidate", e), a && (c.d("icecandidate", new Event("icecandidate")), c.iceGatheringState = "complete", c.b());
    } }, x.setTimeout(function () { n.forEach(function (n) { f.onlocalcandidate(n); }); }, 0);
} }, i.prototype.k = function () { var n = this, e = new x.RTCIceTransport(null); e.onicestatechange = function () { n.j(), n.C(); }; var t = new x.RTCDtlsTransport(e); return t.ondtlsstatechange = function () { n.C(); }, t.onerror = function () { Object.defineProperty(t, "state", { value: "failed", writable: !0 }), n.C(); }, { iceTransport: e, dtlsTransport: t }; }, i.prototype.P = function (n) { var e = this.transceivers[n].iceGatherer; e && (delete e.onlocalcandidate, delete this.transceivers[n].iceGatherer); var t = this.transceivers[n].iceTransport; t && (delete t.onicestatechange, delete this.transceivers[n].iceTransport); var i = this.transceivers[n].dtlsTransport; i && (delete i.ondtlsstatechange, delete i.onerror, delete this.transceivers[n].dtlsTransport); }, i.prototype.R = function (n, e, t) { var i = p(n.localCapabilities, n.remoteCapabilities); e && n.rtpSender && (i.encodings = n.sendEncodingParameters, i.rtcp = { cname: L.localCName, compound: n.rtcpParameters.compound }, n.recvEncodingParameters.length && (i.rtcp.ssrc = n.recvEncodingParameters[0].ssrc), n.rtpSender.send(i)), t && n.rtpReceiver && 0 < i.codecs.length && ("video" === n.kind && n.recvEncodingParameters && A < 15019 && n.recvEncodingParameters.forEach(function (n) { delete n.rtx; }), n.recvEncodingParameters.length ? i.encodings = n.recvEncodingParameters : i.encodings = [{}], i.rtcp = { compound: n.rtcpParameters.compound }, n.rtcpParameters.cname && (i.rtcp.cname = n.rtcpParameters.cname), n.sendEncodingParameters.length && (i.rtcp.ssrc = n.sendEncodingParameters[0].ssrc), n.rtpReceiver.receive(i)); }, i.prototype.setLocalDescription = function (n) { var e, d, l = this; if (-1 === ["offer", "answer"].indexOf(n.type))
    return Promise.reject(g("TypeError", 'Unsupported type "' + n.type + '"')); if (!m("setLocalDescription", n.type, l.signalingState) || l.y)
    return Promise.reject(g("InvalidStateError", "Can not set local " + n.type + " in state " + l.signalingState)); if ("offer" === n.type)
    e = L.splitSections(n.sdp), d = e.shift(), e.forEach(function (n, e) { var t = L.parseRtpParameters(n); l.transceivers[e].localCapabilities = t; }), l.transceivers.forEach(function (n, e) { l.O(n.mid, e); });
else if ("answer" === n.type) {
    e = L.splitSections(l.v.sdp), d = e.shift();
    var v = 0 < L.matchPrefix(d, "a=ice-lite").length;
    e.forEach(function (n, e) { var t = l.transceivers[e], i = t.iceGatherer, r = t.iceTransport, o = t.dtlsTransport, a = t.localCapabilities, u = t.remoteCapabilities; if (!(L.isRejected(n) && 0 === L.matchPrefix(n, "a=bundle-only").length) && !t.rejected) {
        var s = L.getIceParameters(n, d), c = L.getDtlsParameters(n, d);
        v && (c.role = "server"), l.usingBundle && 0 !== e || (l.O(t.mid, e), "new" === r.state && r.start(i, s, v ? "controlling" : "controlled"), "new" === o.state && o.start(c));
        var f = p(a, u);
        l.R(t, 0 < f.codecs.length, !1);
    } });
} return l.l = { type: n.type, sdp: n.sdp }, "offer" === n.type ? l.D("have-local-offer") : l.D("stable"), Promise.resolve(); }, i.prototype.setRemoteDescription = function (O) { var j = this; if (-1 === ["offer", "answer"].indexOf(O.type))
    return Promise.reject(g("TypeError", 'Unsupported type "' + O.type + '"')); if (!m("setRemoteDescription", O.type, j.signalingState) || j.y)
    return Promise.reject(g("InvalidStateError", "Can not set remote " + O.type + " in state " + j.signalingState)); var C = {}; j.remoteStreams.forEach(function (n) { C[n.id] = n; }); var P = [], n = L.splitSections(O.sdp), R = n.shift(), D = 0 < L.matchPrefix(R, "a=ice-lite").length, M = 0 < L.matchPrefix(R, "a=group:BUNDLE ").length; j.usingBundle = M; var e = L.matchPrefix(R, "a=ice-options:")[0]; return j.canTrickleIceCandidates = !!e && 0 <= e.substr(14).split(" ").indexOf("trickle"), n.forEach(function (n, e) { var t = L.splitLines(n), i = L.getKind(n), r = L.isRejected(n) && 0 === L.matchPrefix(n, "a=bundle-only").length, o = t[0].substr(2).split(" ")[2], a = L.getDirection(n, R), u = L.parseMsid(n), s = L.getMid(n) || L.generateIdentifier(); if (r || "application" === i && ("DTLS/SCTP" === o || "UDP/DTLS/SCTP" === o))
    j.transceivers[e] = { mid: s, kind: i, protocol: o, rejected: !0 };
else {
    var c, f, d, l, v, h, p, m, g;
    !r && j.transceivers[e] && j.transceivers[e].rejected && (j.transceivers[e] = j.S(i, !0));
    var w, y, b = L.parseRtpParameters(n);
    r || (w = L.getIceParameters(n, R), (y = L.getDtlsParameters(n, R)).role = "client"), p = L.parseRtpEncodingParameters(n);
    var S = L.parseRtcpParameters(n), k = 0 < L.matchPrefix(n, "a=end-of-candidates", R).length, I = L.matchPrefix(n, "a=candidate:").map(function (n) { return L.parseCandidate(n); }).filter(function (n) { return 1 === n.component; });
    if (("offer" === O.type || "answer" === O.type) && !r && M && 0 < e && j.transceivers[e] && (j.P(e), j.transceivers[e].iceGatherer = j.transceivers[0].iceGatherer, j.transceivers[e].iceTransport = j.transceivers[0].iceTransport, j.transceivers[e].dtlsTransport = j.transceivers[0].dtlsTransport, j.transceivers[e].rtpSender && j.transceivers[e].rtpSender.setTransport(j.transceivers[0].dtlsTransport), j.transceivers[e].rtpReceiver && j.transceivers[e].rtpReceiver.setTransport(j.transceivers[0].dtlsTransport)), "offer" !== O.type || r)
        "answer" !== O.type || r || (f = (c = j.transceivers[e]).iceGatherer, d = c.iceTransport, l = c.dtlsTransport, v = c.rtpReceiver, h = c.sendEncodingParameters, m = c.localCapabilities, j.transceivers[e].recvEncodingParameters = p, j.transceivers[e].remoteCapabilities = b, j.transceivers[e].rtcpParameters = S, I.length && "new" === d.state && (!D && !k || M && 0 !== e ? I.forEach(function (n) { F(c.iceTransport, n); }) : d.setRemoteCandidates(I)), M && 0 !== e || ("new" === d.state && d.start(f, w, "controlling"), "new" === l.state && l.start(y)), j.R(c, "sendrecv" === a || "recvonly" === a, "sendrecv" === a || "sendonly" === a), !v || "sendrecv" !== a && "sendonly" !== a ? delete c.rtpReceiver : (g = v.track, u ? (C[u.stream] || (C[u.stream] = new x.MediaStream), N(g, C[u.stream]), P.push([g, v, C[u.stream]])) : (C.default || (C.default = new x.MediaStream), N(g, C.default), P.push([g, v, C.default]))));
    else {
        (c = j.transceivers[e] || j.S(i)).mid = s, c.iceGatherer || (c.iceGatherer = j.T(e, M)), I.length && "new" === c.iceTransport.state && (!k || M && 0 !== e ? I.forEach(function (n) { F(c.iceTransport, n); }) : c.iceTransport.setRemoteCandidates(I)), m = x.RTCRtpReceiver.getCapabilities(i), A < 15019 && (m.codecs = m.codecs.filter(function (n) { return "rtx" !== n.name; })), h = c.sendEncodingParameters || [{ ssrc: 1001 * (2 * e + 2) }];
        var T, E = !1;
        if ("sendrecv" === a || "sendonly" === a) {
            if (E = !c.rtpReceiver, v = c.rtpReceiver || new x.RTCRtpReceiver(c.dtlsTransport, i), E)
                g = v.track, u && "-" === u.stream || (u ? (C[u.stream] || (C[u.stream] = new x.MediaStream, Object.defineProperty(C[u.stream], "id", { get: function () { return u.stream; } })), Object.defineProperty(g, "id", { get: function () { return u.track; } }), T = C[u.stream]) : (C.default || (C.default = new x.MediaStream), T = C.default)), T && (N(g, T), c.associatedRemoteMediaStreams.push(T)), P.push([g, v, T]);
        }
        else
            c.rtpReceiver && c.rtpReceiver.track && (c.associatedRemoteMediaStreams.forEach(function (n) { var e, t, i = n.getTracks().find(function (n) { return n.id === c.rtpReceiver.track.id; }); i && (e = i, (t = n).removeTrack(e), t.dispatchEvent(new x.MediaStreamTrackEvent("removetrack", { track: e }))); }), c.associatedRemoteMediaStreams = []);
        c.localCapabilities = m, c.remoteCapabilities = b, c.rtpReceiver = v, c.rtcpParameters = S, c.sendEncodingParameters = h, c.recvEncodingParameters = p, j.R(j.transceivers[e], !1, E);
    }
} }), void 0 === j.w && (j.w = "offer" === O.type ? "active" : "passive"), j.v = { type: O.type, sdp: O.sdp }, "offer" === O.type ? j.D("have-remote-offer") : j.D("stable"), Object.keys(C).forEach(function (n) { var i = C[n]; if (i.getTracks().length) {
    if (-1 === j.remoteStreams.indexOf(i)) {
        j.remoteStreams.push(i);
        var e = new Event("addstream");
        e.stream = i, x.setTimeout(function () { j.d("addstream", e); });
    }
    P.forEach(function (n) { var e = n[0], t = n[1]; i.id === n[2].id && r(j, e, t, [i]); });
} }), P.forEach(function (n) { n[2] || r(j, n[0], n[1], []); }), x.setTimeout(function () { j && j.transceivers && j.transceivers.forEach(function (n) { n.iceTransport && "new" === n.iceTransport.state && 0 < n.iceTransport.getRemoteCandidates().length && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), n.iceTransport.addRemoteCandidate({})); }); }, 4e3), Promise.resolve(); }, i.prototype.close = function () { this.transceivers.forEach(function (n) { n.iceTransport && n.iceTransport.stop(), n.dtlsTransport && n.dtlsTransport.stop(), n.rtpSender && n.rtpSender.stop(), n.rtpReceiver && n.rtpReceiver.stop(); }), this.y = !0, this.D("closed"); }, i.prototype.D = function (n) { this.signalingState = n; var e = new Event("signalingstatechange"); this.d("signalingstatechange", e); }, i.prototype.I = function () { var e = this; "stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, x.setTimeout(function () { if (e.needNegotiation) {
    e.needNegotiation = !1;
    var n = new Event("negotiationneeded");
    e.d("negotiationneeded", n);
} }, 0)); }, i.prototype.j = function () { var n, e = { new: 0, closed: 0, checking: 0, connected: 0, completed: 0, disconnected: 0, failed: 0 }; if (this.transceivers.forEach(function (n) { e[n.iceTransport.state]++; }), n = "new", 0 < e.failed ? n = "failed" : 0 < e.checking ? n = "checking" : 0 < e.disconnected ? n = "disconnected" : 0 < e.new ? n = "new" : 0 < e.connected ? n = "connected" : 0 < e.completed && (n = "completed"), n !== this.iceConnectionState) {
    this.iceConnectionState = n;
    var t = new Event("iceconnectionstatechange");
    this.d("iceconnectionstatechange", t);
} }, i.prototype.C = function () { var n, e = { new: 0, closed: 0, connecting: 0, connected: 0, completed: 0, disconnected: 0, failed: 0 }; if (this.transceivers.forEach(function (n) { e[n.iceTransport.state]++, e[n.dtlsTransport.state]++; }), e.connected += e.completed, n = "new", 0 < e.failed ? n = "failed" : 0 < e.connecting ? n = "connecting" : 0 < e.disconnected ? n = "disconnected" : 0 < e.new ? n = "new" : 0 < e.connected && (n = "connected"), n !== this.connectionState) {
    this.connectionState = n;
    var t = new Event("connectionstatechange");
    this.d("connectionstatechange", t);
} }, i.prototype.createOffer = function () { var u = this; if (u.y)
    return Promise.reject(g("InvalidStateError", "Can not call createOffer after close")); var e = u.transceivers.filter(function (n) { return "audio" === n.kind; }).length, t = u.transceivers.filter(function (n) { return "video" === n.kind; }).length, n = arguments[0]; if (n) {
    if (n.mandatory || n.optional)
        throw new TypeError("Legacy mandatory/optional constraints not supported.");
    void 0 !== n.offerToReceiveAudio && (e = !0 === n.offerToReceiveAudio ? 1 : !1 === n.offerToReceiveAudio ? 0 : n.offerToReceiveAudio), void 0 !== n.offerToReceiveVideo && (t = !0 === n.offerToReceiveVideo ? 1 : !1 === n.offerToReceiveVideo ? 0 : n.offerToReceiveVideo);
} for (u.transceivers.forEach(function (n) { "audio" === n.kind ? --e < 0 && (n.wantReceive = !1) : "video" === n.kind && --t < 0 && (n.wantReceive = !1); }); 0 < e || 0 < t;)
    0 < e && (u.S("audio"), e--), 0 < t && (u.S("video"), t--); var i = L.writeSessionBoilerplate(u.m, u.g++); u.transceivers.forEach(function (n, e) { var t = n.track, i = n.kind, r = n.mid || L.generateIdentifier(); n.mid = r, n.iceGatherer || (n.iceGatherer = u.T(e, u.usingBundle)); var o = x.RTCRtpSender.getCapabilities(i); A < 15019 && (o.codecs = o.codecs.filter(function (n) { return "rtx" !== n.name; })), o.codecs.forEach(function (e) { "H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"), n.remoteCapabilities && n.remoteCapabilities.codecs && n.remoteCapabilities.codecs.forEach(function (n) { e.name.toLowerCase() === n.name.toLowerCase() && e.clockRate === n.clockRate && (e.preferredPayloadType = n.payloadType); }); }), o.headerExtensions.forEach(function (e) { (n.remoteCapabilities && n.remoteCapabilities.headerExtensions || []).forEach(function (n) { e.uri === n.uri && (e.id = n.id); }); }); var a = n.sendEncodingParameters || [{ ssrc: 1001 * (2 * e + 1) }]; t && 15019 <= A && "video" === i && !a[0].rtx && (a[0].rtx = { ssrc: a[0].ssrc + 1 }), n.wantReceive && (n.rtpReceiver = new x.RTCRtpReceiver(n.dtlsTransport, i)), n.localCapabilities = o, n.sendEncodingParameters = a; }), "max-compat" !== u.p.bundlePolicy && (i += "a=group:BUNDLE " + u.transceivers.map(function (n) { return n.mid; }).join(" ") + "\r\n"), i += "a=ice-options:trickle\r\n", u.transceivers.forEach(function (n, e) { i += f(n, n.localCapabilities, "offer", n.stream, u.w), i += "a=rtcp-rsize\r\n", !n.iceGatherer || "new" === u.iceGatheringState || 0 !== e && u.usingBundle || (n.iceGatherer.getLocalCandidates().forEach(function (n) { n.component = 1, i += "a=" + L.writeCandidate(n) + "\r\n"; }), "completed" === n.iceGatherer.state && (i += "a=end-of-candidates\r\n")); }); var r = new x.RTCSessionDescription({ type: "offer", sdp: i }); return Promise.resolve(r); }, i.prototype.createAnswer = function () { var r = this; if (r.y)
    return Promise.reject(g("InvalidStateError", "Can not call createAnswer after close")); if ("have-remote-offer" !== r.signalingState && "have-local-pranswer" !== r.signalingState)
    return Promise.reject(g("InvalidStateError", "Can not call createAnswer in signalingState " + r.signalingState)); var o = L.writeSessionBoilerplate(r.m, r.g++); r.usingBundle && (o += "a=group:BUNDLE " + r.transceivers.map(function (n) { return n.mid; }).join(" ") + "\r\n"); var a = L.getMediaSections(r.v.sdp).length; r.transceivers.forEach(function (n, e) { if (!(a < e + 1)) {
    if (n.rejected)
        return "application" === n.kind ? "DTLS/SCTP" === n.protocol ? o += "m=application 0 DTLS/SCTP 5000\r\n" : o += "m=application 0 " + n.protocol + " webrtc-datachannel\r\n" : "audio" === n.kind ? o += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === n.kind && (o += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void (o += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + n.mid + "\r\n");
    var t;
    if (n.stream)
        "audio" === n.kind ? t = n.stream.getAudioTracks()[0] : "video" === n.kind && (t = n.stream.getVideoTracks()[0]), t && 15019 <= A && "video" === n.kind && !n.sendEncodingParameters[0].rtx && (n.sendEncodingParameters[0].rtx = { ssrc: n.sendEncodingParameters[0].ssrc + 1 });
    var i = p(n.localCapabilities, n.remoteCapabilities);
    !i.codecs.filter(function (n) { return "rtx" === n.name.toLowerCase(); }).length && n.sendEncodingParameters[0].rtx && delete n.sendEncodingParameters[0].rtx, o += f(n, i, "answer", n.stream, r.w), n.rtcpParameters && n.rtcpParameters.reducedSize && (o += "a=rtcp-rsize\r\n");
} }); var n = new x.RTCSessionDescription({ type: "answer", sdp: o }); return Promise.resolve(n); }, i.prototype.addIceCandidate = function (s) { var c, f = this; return s && void 0 === s.sdpMLineIndex && !s.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function (n, e) { if (!f.v)
    return e(g("InvalidStateError", "Can not add ICE candidate without a remote description")); if (s && "" !== s.candidate) {
    var t = s.sdpMLineIndex;
    if (s.sdpMid)
        for (var i = 0; i < f.transceivers.length; i++)
            if (f.transceivers[i].mid === s.sdpMid) {
                t = i;
                break;
            }
    var r = f.transceivers[t];
    if (!r)
        return e(g("OperationError", "Can not add ICE candidate"));
    if (r.rejected)
        return n();
    var o = 0 < Object.keys(s.candidate).length ? L.parseCandidate(s.candidate) : {};
    if ("tcp" === o.protocol && (0 === o.port || 9 === o.port))
        return n();
    if (o.component && 1 !== o.component)
        return n();
    if ((0 === t || 0 < t && r.iceTransport !== f.transceivers[0].iceTransport) && !F(r.iceTransport, o))
        return e(g("OperationError", "Can not add ICE candidate"));
    var a = s.candidate.trim();
    0 === a.indexOf("a=") && (a = a.substr(2)), (c = L.getMediaSections(f.v.sdp))[t] += "a=" + (o.type ? a : "end-of-candidates") + "\r\n", f.v.sdp = L.getDescription(f.v.sdp) + c.join("");
}
else
    for (var u = 0; u < f.transceivers.length && (f.transceivers[u].rejected || (f.transceivers[u].iceTransport.addRemoteCandidate({}), (c = L.getMediaSections(f.v.sdp))[u] += "a=end-of-candidates\r\n", f.v.sdp = L.getDescription(f.v.sdp) + c.join(""), !f.usingBundle)); u++)
        ; n(); }); }, i.prototype.getStats = function (e) { if (e && e instanceof x.MediaStreamTrack) {
    var t = null;
    if (this.transceivers.forEach(function (n) { n.rtpSender && n.rtpSender.track === e ? t = n.rtpSender : n.rtpReceiver && n.rtpReceiver.track === e && (t = n.rtpReceiver); }), !t)
        throw g("InvalidAccessError", "Invalid selector.");
    return t.getStats();
} var i = []; return this.transceivers.forEach(function (e) { ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function (n) { e[n] && i.push(e[n].getStats()); }); }), Promise.all(i).then(function (n) { var e = new Map; return n.forEach(function (n) { n.forEach(function (n) { e.set(n.id, n); }); }), e; }); }; ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function (n) { var e = x[n]; if (e && e.prototype && e.prototype.getStats) {
    var t = e.prototype.getStats;
    e.prototype.getStats = function () { return t.apply(this).then(function (t) { var i = new Map; return Object.keys(t).forEach(function (n) { var e; t[n].type = { inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate" }[(e = t[n]).type] || e.type, i.set(n, t[n]); }), i; }); };
} }); var n = ["createOffer", "createAnswer"]; return n.forEach(function (n) { var t = i.prototype[n]; i.prototype[n] = function () { var e = arguments; return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then(function (n) { "function" == typeof e[0] && e[0].apply(null, [n]); }, function (n) { "function" == typeof e[1] && e[1].apply(null, [n]); }) : t.apply(this, arguments); }; }), (n = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function (n) { var t = i.prototype[n]; i.prototype[n] = function () { var e = arguments; return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(function () { "function" == typeof e[1] && e[1].apply(null); }, function (n) { "function" == typeof e[2] && e[2].apply(null, [n]); }) : t.apply(this, arguments); }; }), ["getStats"].forEach(function (n) { var e = i.prototype[n]; i.prototype[n] = function () { var n = arguments; return "function" == typeof n[1] ? e.apply(this, arguments).then(function () { "function" == typeof n[1] && n[1].apply(null); }) : e.apply(this, arguments); }; }), i; }, w = { shimGetUserMedia: function (n) { var e = n && n.navigator, t = e.mediaDevices.getUserMedia.bind(e.mediaDevices); e.mediaDevices.getUserMedia = function (n) { return t(n).catch(function (n) { return Promise.reject({ name: { PermissionDeniedError: "NotAllowedError" }[(e = n).name] || e.name, message: e.message, constraint: e.constraint, toString: function () { return this.name; } }); var e; }); }; }, shimPeerConnection: function (n) { var e = v.detectBrowser(n); if (n.RTCIceGatherer && (n.RTCIceCandidate || (n.RTCIceCandidate = function (n) { return n; }), n.RTCSessionDescription || (n.RTCSessionDescription = function (n) { return n; }), e.version < 15025)) {
        var t = Object.getOwnPropertyDescriptor(n.MediaStreamTrack.prototype, "enabled");
        Object.defineProperty(n.MediaStreamTrack.prototype, "enabled", { set: function (n) { t.set.call(this, n); var e = new Event("enabled"); e.enabled = n, this.dispatchEvent(e); } });
    } !n.RTCRtpSender || "dtmf" in n.RTCRtpSender.prototype || Object.defineProperty(n.RTCRtpSender.prototype, "dtmf", { get: function () { return void 0 === this.i && ("audio" === this.track.kind ? this.i = new n.RTCDtmfSender(this) : "video" === this.track.kind && (this.i = null)), this.i; } }), n.RTCDtmfSender && !n.RTCDTMFSender && (n.RTCDTMFSender = n.RTCDtmfSender); var o = d(n, e.version); n.RTCPeerConnection = function (n) { var e, i, r; return n && n.iceServers && (n.iceServers = (e = n.iceServers, r = !1, (e = JSON.parse(JSON.stringify(e))).filter(function (n) { if (n && (n.urls || n.url)) {
        var e = n.urls || n.url;
        n.url && !n.urls && v.deprecated("RTCIceServer.url", "RTCIceServer.urls");
        var t = "string" == typeof e;
        return t && (e = [e]), e = e.filter(function (n) { return 0 !== n.indexOf("turn:") || -1 === n.indexOf("transport=udp") || -1 !== n.indexOf("turn:[") || r ? 0 === n.indexOf("stun:") && 14393 <= i && -1 === n.indexOf("?transport=udp") : r = !0; }), delete n.url, n.urls = t ? e[0] : e, !!e.length;
    } }))), new o(n); }, n.RTCPeerConnection.prototype = o.prototype; }, shimReplaceTrack: function (n) { !n.RTCRtpSender || "replaceTrack" in n.RTCRtpSender.prototype || (n.RTCRtpSender.prototype.replaceTrack = n.RTCRtpSender.prototype.setTrack); } }, l = v.log, y = { shimGetUserMedia: function (n) { var r = v.detectBrowser(n), o = n && n.navigator, e = n && n.MediaStreamTrack, a = function (n) { return { name: { InternalError: "NotReadableError", NotSupportedError: "TypeError", PermissionDeniedError: "NotAllowedError", SecurityError: "NotAllowedError" }[n.name] || n.name, message: { "The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context." }[n.message] || n.message, constraint: n.constraint, toString: function () { return this.name + (this.message && ": ") + this.message; } }; }, i = function (n, e, t) { var i = function (i) { if ("object" != typeof i || i.require)
        return i; var r = []; return Object.keys(i).forEach(function (n) { if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
        var e = i[n] = "object" == typeof i[n] ? i[n] : { ideal: i[n] };
        if (void 0 === e.min && void 0 === e.max && void 0 === e.exact || r.push(n), void 0 !== e.exact && ("number" == typeof e.exact ? e.min = e.max = e.exact : i[n] = e.exact, delete e.exact), void 0 !== e.ideal) {
            i.advanced = i.advanced || [];
            var t = {};
            "number" == typeof e.ideal ? t[n] = { min: e.ideal, max: e.ideal } : t[n] = e.ideal, i.advanced.push(t), delete e.ideal, Object.keys(e).length || delete i[n];
        }
    } }), r.length && (i.require = r), i; }; return n = JSON.parse(JSON.stringify(n)), r.version < 38 && (l("spec: " + JSON.stringify(n)), n.audio && (n.audio = i(n.audio)), n.video && (n.video = i(n.video)), l("ff37: " + JSON.stringify(n))), o.mozGetUserMedia(n, e, function (n) { t(a(n)); }); }; if (o.mediaDevices || (o.mediaDevices = { getUserMedia: function (t) { return new Promise(function (n, e) { i(t, n, e); }); }, addEventListener: function () { }, removeEventListener: function () { } }), o.mediaDevices.enumerateDevices = o.mediaDevices.enumerateDevices || function () { return new Promise(function (n) { n([{ kind: "audioinput", deviceId: "default", label: "", groupId: "" }, { kind: "videoinput", deviceId: "default", label: "", groupId: "" }]); }); }, r.version < 41) {
        var t = o.mediaDevices.enumerateDevices.bind(o.mediaDevices);
        o.mediaDevices.enumerateDevices = function () { return t().then(void 0, function (n) { if ("NotFoundError" === n.name)
            return []; throw n; }); };
    } if (r.version < 49) {
        var u = o.mediaDevices.getUserMedia.bind(o.mediaDevices);
        o.mediaDevices.getUserMedia = function (e) { return u(e).then(function (n) { if (e.audio && !n.getAudioTracks().length || e.video && !n.getVideoTracks().length)
            throw n.getTracks().forEach(function (n) { n.stop(); }), new DOMException("The object can not be found here.", "NotFoundError"); return n; }, function (n) { return Promise.reject(a(n)); }); };
    } if (!(55 < r.version && "autoGainControl" in o.mediaDevices.getSupportedConstraints())) {
        var s = function (n, e, t) { e in n && !(t in n) && (n[t] = n[e], delete n[e]); }, c = o.mediaDevices.getUserMedia.bind(o.mediaDevices);
        if (o.mediaDevices.getUserMedia = function (n) { return "object" == typeof n && "object" == typeof n.audio && (n = JSON.parse(JSON.stringify(n)), s(n.audio, "autoGainControl", "mozAutoGainControl"), s(n.audio, "noiseSuppression", "mozNoiseSuppression")), c(n); }, e && e.prototype.getSettings) {
            var f = e.prototype.getSettings;
            e.prototype.getSettings = function () { var n = f.apply(this, arguments); return s(n, "mozAutoGainControl", "autoGainControl"), s(n, "mozNoiseSuppression", "noiseSuppression"), n; };
        }
        if (e && e.prototype.applyConstraints) {
            var d = e.prototype.applyConstraints;
            e.prototype.applyConstraints = function (n) { return "audio" === this.kind && "object" == typeof n && (n = JSON.parse(JSON.stringify(n)), s(n, "autoGainControl", "mozAutoGainControl"), s(n, "noiseSuppression", "mozNoiseSuppression")), d.apply(this, [n]); };
        }
    } o.getUserMedia = function (n, e, t) { if (r.version < 44)
        return i(n, e, t); v.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), o.mediaDevices.getUserMedia(n).then(e, t); }; }, shimOnTrack: function (n) { "object" != typeof n || !n.RTCPeerConnection || "ontrack" in n.RTCPeerConnection.prototype || Object.defineProperty(n.RTCPeerConnection.prototype, "ontrack", { get: function () { return this.e; }, set: function (n) { this.e && (this.removeEventListener("track", this.e), this.removeEventListener("addstream", this.t)), this.addEventListener("track", this.e = n), this.addEventListener("addstream", this.t = function (t) { t.stream.getTracks().forEach(function (n) { var e = new Event("track"); e.track = n, e.receiver = { track: n }, e.transceiver = { receiver: e.receiver }, e.streams = [t.stream], this.dispatchEvent(e); }.bind(this)); }.bind(this)); }, enumerable: !0, configurable: !0 }), "object" == typeof n && n.RTCTrackEvent && "receiver" in n.RTCTrackEvent.prototype && !("transceiver" in n.RTCTrackEvent.prototype) && Object.defineProperty(n.RTCTrackEvent.prototype, "transceiver", { get: function () { return { receiver: this.receiver }; } }); }, shimSourceObject: function (n) { "object" == typeof n && (!n.HTMLMediaElement || "srcObject" in n.HTMLMediaElement.prototype || Object.defineProperty(n.HTMLMediaElement.prototype, "srcObject", { get: function () { return this.mozSrcObject; }, set: function (n) { this.mozSrcObject = n; } })); }, shimPeerConnection: function (u) { var s = v.detectBrowser(u); if ("object" == typeof u && (u.RTCPeerConnection || u.mozRTCPeerConnection)) {
        u.RTCPeerConnection || (u.RTCPeerConnection = function (n, e) { if (s.version < 38 && n && n.iceServers) {
            for (var t = [], i = 0; i < n.iceServers.length; i++) {
                var r = n.iceServers[i];
                if (r.hasOwnProperty("urls"))
                    for (var o = 0; o < r.urls.length; o++) {
                        var a = { url: r.urls[o] };
                        0 === r.urls[o].indexOf("turn") && (a.username = r.username, a.credential = r.credential), t.push(a);
                    }
                else
                    t.push(n.iceServers[i]);
            }
            n.iceServers = t;
        } return new u.mozRTCPeerConnection(n, e); }, u.RTCPeerConnection.prototype = u.mozRTCPeerConnection.prototype, u.mozRTCPeerConnection.generateCertificate && Object.defineProperty(u.RTCPeerConnection, "generateCertificate", { get: function () { return u.mozRTCPeerConnection.generateCertificate; } }), u.RTCSessionDescription = u.mozRTCSessionDescription, u.RTCIceCandidate = u.mozRTCIceCandidate), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (n) { var e = u.RTCPeerConnection.prototype[n]; u.RTCPeerConnection.prototype[n] = function () { return arguments[0] = new ("addIceCandidate" === n ? u.RTCIceCandidate : u.RTCSessionDescription)(arguments[0]), e.apply(this, arguments); }; });
        var n = u.RTCPeerConnection.prototype.addIceCandidate;
        u.RTCPeerConnection.prototype.addIceCandidate = function () { return arguments[0] ? n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve()); };
        var o = { inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate" }, t = u.RTCPeerConnection.prototype.getStats;
        u.RTCPeerConnection.prototype.getStats = function (n, r, e) { return t.apply(this, [n || null]).then(function (t) { var e, i; if (s.version < 48 && (e = t, i = new Map, Object.keys(e).forEach(function (n) { i.set(n, e[n]), i[n] = e[n]; }), t = i), s.version < 53 && !r)
            try {
                t.forEach(function (n) { n.type = o[n.type] || n.type; });
            }
            catch (n) {
                if ("TypeError" !== n.name)
                    throw n;
                t.forEach(function (n, e) { t.set(e, Object.assign({}, n, { type: o[n.type] || n.type })); });
            } return t; }).then(r, e); };
    } }, shimSenderGetStats: function (n) { if ("object" == typeof n && n.RTCPeerConnection && n.RTCRtpSender && !(n.RTCRtpSender && "getStats" in n.RTCRtpSender.prototype)) {
        var t = n.RTCPeerConnection.prototype.getSenders;
        t && (n.RTCPeerConnection.prototype.getSenders = function () { var e = this, n = t.apply(e, []); return n.forEach(function (n) { n.r = e; }), n; });
        var e = n.RTCPeerConnection.prototype.addTrack;
        e && (n.RTCPeerConnection.prototype.addTrack = function () { var n = e.apply(this, arguments); return n.r = this, n; }), n.RTCRtpSender.prototype.getStats = function () { return this.track ? this.r.getStats(this.track) : Promise.resolve(new Map); };
    } }, shimReceiverGetStats: function (n) { if ("object" == typeof n && n.RTCPeerConnection && n.RTCRtpSender && !(n.RTCRtpSender && "getStats" in n.RTCRtpReceiver.prototype)) {
        var t = n.RTCPeerConnection.prototype.getReceivers;
        t && (n.RTCPeerConnection.prototype.getReceivers = function () { var e = this, n = t.apply(e, []); return n.forEach(function (n) { n.r = e; }), n; }), v.wrapPeerConnectionEvent(n, "track", function (n) { return n.receiver.r = n.srcElement, n; }), n.RTCRtpReceiver.prototype.getStats = function () { return this.r.getStats(this.track); };
    } }, shimRemoveStream: function (n) { !n.RTCPeerConnection || "removeStream" in n.RTCPeerConnection.prototype || (n.RTCPeerConnection.prototype.removeStream = function (e) { var t = this; v.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function (n) { n.track && -1 !== e.getTracks().indexOf(n.track) && t.removeTrack(n); }); }); }, shimRTCDataChannel: function (n) { n.DataChannel && !n.RTCDataChannel && (n.RTCDataChannel = n.DataChannel); }, shimGetDisplayMedia: function (n, t) { "getDisplayMedia" in n.navigator || (navigator.getDisplayMedia = function (n) { if (!n || !n.video) {
        var e = new DOMException("getDisplayMedia without video constraints is undefined");
        return e.name = "NotFoundError", e.code = 8, Promise.reject(e);
    } return !0 === n.video ? n.video = { mediaSource: t } : n.video.mediaSource = t, navigator.mediaDevices.getUserMedia(n); }); } }, b = { shimLocalStreamsAPI: function (n) { if ("object" == typeof n && n.RTCPeerConnection) {
        if ("getLocalStreams" in n.RTCPeerConnection.prototype || (n.RTCPeerConnection.prototype.getLocalStreams = function () { return this.M || (this.M = []), this.M; }), "getStreamById" in n.RTCPeerConnection.prototype || (n.RTCPeerConnection.prototype.getStreamById = function (e) { var t = null; return this.M && this.M.forEach(function (n) { n.id === e && (t = n); }), this.x && this.x.forEach(function (n) { n.id === e && (t = n); }), t; }), !("addStream" in n.RTCPeerConnection.prototype)) {
            var i = n.RTCPeerConnection.prototype.addTrack;
            n.RTCPeerConnection.prototype.addStream = function (e) { this.M || (this.M = []), -1 === this.M.indexOf(e) && this.M.push(e); var t = this; e.getTracks().forEach(function (n) { i.call(t, n, e); }); }, n.RTCPeerConnection.prototype.addTrack = function (n, e) { return e && (this.M ? -1 === this.M.indexOf(e) && this.M.push(e) : this.M = [e]), i.call(this, n, e); };
        }
        "removeStream" in n.RTCPeerConnection.prototype || (n.RTCPeerConnection.prototype.removeStream = function (n) { this.M || (this.M = []); var e = this.M.indexOf(n); if (-1 !== e) {
            this.M.splice(e, 1);
            var t = this, i = n.getTracks();
            this.getSenders().forEach(function (n) { -1 !== i.indexOf(n.track) && t.removeTrack(n); });
        } });
    } }, shimRemoteStreamsAPI: function (n) { if ("object" == typeof n && n.RTCPeerConnection && ("getRemoteStreams" in n.RTCPeerConnection.prototype || (n.RTCPeerConnection.prototype.getRemoteStreams = function () { return this.x ? this.x : []; }), !("onaddstream" in n.RTCPeerConnection.prototype))) {
        Object.defineProperty(n.RTCPeerConnection.prototype, "onaddstream", { get: function () { return this.A; }, set: function (n) { this.A && this.removeEventListener("addstream", this.A), this.addEventListener("addstream", this.A = n); } });
        var e = n.RTCPeerConnection.prototype.setRemoteDescription;
        n.RTCPeerConnection.prototype.setRemoteDescription = function () { var t = this; return this.N || this.addEventListener("track", this.N = function (n) { n.streams.forEach(function (n) { if (t.x || (t.x = []), !(0 <= t.x.indexOf(n))) {
            t.x.push(n);
            var e = new Event("addstream");
            e.stream = n, t.dispatchEvent(e);
        } }); }), e.apply(t, arguments); };
    } }, shimCallbacksAPI: function (n) { if ("object" == typeof n && n.RTCPeerConnection) {
        var e = n.RTCPeerConnection.prototype, r = e.createOffer, o = e.createAnswer, a = e.setLocalDescription, u = e.setRemoteDescription, s = e.addIceCandidate;
        e.createOffer = function (n, e) { var t = 2 <= arguments.length ? arguments[2] : n, i = r.apply(this, [t]); return e ? (i.then(n, e), Promise.resolve()) : i; }, e.createAnswer = function (n, e) { var t = 2 <= arguments.length ? arguments[2] : n, i = o.apply(this, [t]); return e ? (i.then(n, e), Promise.resolve()) : i; };
        var t = function (n, e, t) { var i = a.apply(this, [n]); return t ? (i.then(e, t), Promise.resolve()) : i; };
        e.setLocalDescription = t, t = function (n, e, t) { var i = u.apply(this, [n]); return t ? (i.then(e, t), Promise.resolve()) : i; }, e.setRemoteDescription = t, t = function (n, e, t) { var i = s.apply(this, [n]); return t ? (i.then(e, t), Promise.resolve()) : i; }, e.addIceCandidate = t;
    } }, shimGetUserMedia: function (n) { var i = n && n.navigator; i.getUserMedia || (i.webkitGetUserMedia ? i.getUserMedia = i.webkitGetUserMedia.bind(i) : i.mediaDevices && i.mediaDevices.getUserMedia && (i.getUserMedia = function (n, e, t) { i.mediaDevices.getUserMedia(n).then(e, t); }.bind(i))); }, shimRTCIceServerUrls: function (n) { var o = n.RTCPeerConnection; n.RTCPeerConnection = function (n, e) { if (n && n.iceServers) {
        for (var t = [], i = 0; i < n.iceServers.length; i++) {
            var r = n.iceServers[i];
            !r.hasOwnProperty("urls") && r.hasOwnProperty("url") ? (v.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (r = JSON.parse(JSON.stringify(r))).urls = r.url, delete r.url, t.push(r)) : t.push(n.iceServers[i]);
        }
        n.iceServers = t;
    } return new o(n, e); }, n.RTCPeerConnection.prototype = o.prototype, "generateCertificate" in n.RTCPeerConnection && Object.defineProperty(n.RTCPeerConnection, "generateCertificate", { get: function () { return o.generateCertificate; } }); }, shimTrackEventTransceiver: function (n) { "object" == typeof n && n.RTCPeerConnection && "receiver" in n.RTCTrackEvent.prototype && !n.RTCTransceiver && Object.defineProperty(n.RTCTrackEvent.prototype, "transceiver", { get: function () { return { receiver: this.receiver }; } }); }, shimCreateOfferLegacy: function (n) { var r = n.RTCPeerConnection.prototype.createOffer; n.RTCPeerConnection.prototype.createOffer = function (n) { var e = this; if (n) {
        void 0 !== n.offerToReceiveAudio && (n.offerToReceiveAudio = !!n.offerToReceiveAudio);
        var t = e.getTransceivers().find(function (n) { return n.sender.track && "audio" === n.sender.track.kind; });
        !1 === n.offerToReceiveAudio && t ? "sendrecv" === t.direction ? t.setDirection ? t.setDirection("sendonly") : t.direction = "sendonly" : "recvonly" === t.direction && (t.setDirection ? t.setDirection("inactive") : t.direction = "inactive") : !0 !== n.offerToReceiveAudio || t || e.addTransceiver("audio"), void 0 !== n.offerToReceiveVideo && (n.offerToReceiveVideo = !!n.offerToReceiveVideo);
        var i = e.getTransceivers().find(function (n) { return n.sender.track && "video" === n.sender.track.kind; });
        !1 === n.offerToReceiveVideo && i ? "sendrecv" === i.direction ? i.setDirection("sendonly") : "recvonly" === i.direction && i.setDirection("inactive") : !0 !== n.offerToReceiveVideo || i || e.addTransceiver("video");
    } return r.apply(e, arguments); }; } }, S = { shimRTCIceCandidate: function (e) { if (e.RTCIceCandidate && !(e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)) {
        var r = e.RTCIceCandidate;
        e.RTCIceCandidate = function (n) { if ("object" == typeof n && n.candidate && 0 === n.candidate.indexOf("a=") && ((n = JSON.parse(JSON.stringify(n))).candidate = n.candidate.substr(2)), n.candidate && n.candidate.length) {
            var e = new r(n), t = L.parseCandidate(n.candidate), i = Object.assign(e, t);
            return i.toJSON = function () { return { candidate: i.candidate, sdpMid: i.sdpMid, sdpMLineIndex: i.sdpMLineIndex, usernameFragment: i.usernameFragment }; }, i;
        } return new r(n); }, e.RTCIceCandidate.prototype = r.prototype, v.wrapPeerConnectionEvent(e, "icecandidate", function (n) { return n.candidate && Object.defineProperty(n, "candidate", { value: new e.RTCIceCandidate(n.candidate), writable: "false" }), n; });
    } }, shimCreateObjectURL: function (n) { var e = n && n.URL; if ("object" == typeof n && n.HTMLMediaElement && "srcObject" in n.HTMLMediaElement.prototype && e.createObjectURL && e.revokeObjectURL) {
        var t = e.createObjectURL.bind(e), i = e.revokeObjectURL.bind(e), r = new Map, o = 0;
        e.createObjectURL = function (n) { if ("getTracks" in n) {
            var e = "polyblob:" + ++o;
            return r.set(e, n), v.deprecated("URL.createObjectURL(stream)", "elem.srcObject = stream"), e;
        } return t(n); }, e.revokeObjectURL = function (n) { i(n), r.delete(n); };
        var a = Object.getOwnPropertyDescriptor(n.HTMLMediaElement.prototype, "src");
        Object.defineProperty(n.HTMLMediaElement.prototype, "src", { get: function () { return a.get.apply(this); }, set: function (n) { return this.srcObject = r.get(n) || null, a.set.apply(this, [n]); } });
        var u = n.HTMLMediaElement.prototype.setAttribute;
        n.HTMLMediaElement.prototype.setAttribute = function () { return 2 === arguments.length && "src" === ("" + arguments[0]).toLowerCase() && (this.srcObject = r.get(arguments[1]) || null), u.apply(this, arguments); };
    } }, shimMaxMessageSize: function (n) { if (!n.RTCSctpTransport && n.RTCPeerConnection) {
        var c = v.detectBrowser(n);
        "sctp" in n.RTCPeerConnection.prototype || Object.defineProperty(n.RTCPeerConnection.prototype, "sctp", { get: function () { return void 0 === this.L ? null : this.L; } });
        var f = n.RTCPeerConnection.prototype.setRemoteDescription;
        n.RTCPeerConnection.prototype.setRemoteDescription = function () { var n, e, t, i; if (this.L = null, t = arguments[0], (i = L.splitSections(t.sdp)).shift(), i.some(function (n) { var e = L.parseMLine(n); return e && "application" === e.kind && -1 !== e.protocol.indexOf("SCTP"); })) {
            var r, o = function (n) { var e = n.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/); if (null === e || e.length < 2)
                return -1; var t = parseInt(e[1], 10); return t != t ? -1 : t; }(arguments[0]), a = (n = o, e = 65536, "firefox" === c.browser && (e = c.version < 57 ? -1 === n ? 16384 : 2147483637 : c.version < 60 ? 57 === c.version ? 65535 : 65536 : 2147483637), e), u = function (n, e) { var t = 65536; "firefox" === c.browser && 57 === c.version && (t = 65535); var i = L.matchPrefix(n.sdp, "a=max-message-size:"); return 0 < i.length ? t = parseInt(i[0].substr(19), 10) : "firefox" === c.browser && -1 !== e && (t = 2147483637), t; }(arguments[0], o);
            r = 0 === a && 0 === u ? Number.POSITIVE_INFINITY : 0 === a || 0 === u ? Math.max(a, u) : Math.min(a, u);
            var s = {};
            Object.defineProperty(s, "maxMessageSize", { get: function () { return r; } }), this.L = s;
        } return f.apply(this, arguments); };
    } }, shimSendThrowTypeError: function (n) { if (n.RTCPeerConnection && "createDataChannel" in n.RTCPeerConnection.prototype) {
        var e = n.RTCPeerConnection.prototype.createDataChannel;
        n.RTCPeerConnection.prototype.createDataChannel = function () { var n = e.apply(this, arguments); return t(n, this), n; }, v.wrapPeerConnectionEvent(n, "datachannel", function (n) { return t(n.channel, n.target), n; });
    } function t(t, i) { var r = t.send; t.send = function () { var n = arguments[0], e = n.length || n.size || n.byteLength; if ("open" === t.readyState && i.sctp && e > i.sctp.maxMessageSize)
        throw new TypeError("Message too large (can send a maximum of " + i.sctp.maxMessageSize + " bytes)"); return r.apply(t, arguments); }; } } }, k = function (n, e) { var t = n && n.window, i = { shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0 }; for (var r in e)
    hasOwnProperty.call(e, r) && (i[r] = e[r]); var o = v.log, a = v.detectBrowser(t), u = h, s = w, c = y, f = b, d = S, l = { browserDetails: a, commonShim: d, extractVersion: v.extractVersion, disableLog: v.disableLog, disableWarnings: v.disableWarnings }; switch (a.browser) {
    case "chrome":
        if (!u || !u.shimPeerConnection || !i.shimChrome)
            return o("Chrome shim is not included in this adapter release."), l;
        o("adapter.js shimming chrome."), l.browserShim = u, d.shimCreateObjectURL(t), u.shimGetUserMedia(t), u.shimMediaStream(t), u.shimSourceObject(t), u.shimPeerConnection(t), u.shimOnTrack(t), u.shimAddTrackRemoveTrack(t), u.shimGetSendersWithDtmf(t), u.shimSenderReceiverGetStats(t), u.fixNegotiationNeeded(t), d.shimRTCIceCandidate(t), d.shimMaxMessageSize(t), d.shimSendThrowTypeError(t);
        break;
    case "firefox":
        if (!c || !c.shimPeerConnection || !i.shimFirefox)
            return o("Firefox shim is not included in this adapter release."), l;
        o("adapter.js shimming firefox."), l.browserShim = c, d.shimCreateObjectURL(t), c.shimGetUserMedia(t), c.shimSourceObject(t), c.shimPeerConnection(t), c.shimOnTrack(t), c.shimRemoveStream(t), c.shimSenderGetStats(t), c.shimReceiverGetStats(t), c.shimRTCDataChannel(t), d.shimRTCIceCandidate(t), d.shimMaxMessageSize(t), d.shimSendThrowTypeError(t);
        break;
    case "edge":
        if (!s || !s.shimPeerConnection || !i.shimEdge)
            return o("MS edge shim is not included in this adapter release."), l;
        o("adapter.js shimming edge."), l.browserShim = s, d.shimCreateObjectURL(t), s.shimGetUserMedia(t), s.shimPeerConnection(t), s.shimReplaceTrack(t), d.shimMaxMessageSize(t), d.shimSendThrowTypeError(t);
        break;
    case "safari":
        if (!f || !i.shimSafari)
            return o("Safari shim is not included in this adapter release."), l;
        o("adapter.js shimming safari."), l.browserShim = f, d.shimCreateObjectURL(t), f.shimRTCIceServerUrls(t), f.shimCreateOfferLegacy(t), f.shimCallbacksAPI(t), f.shimLocalStreamsAPI(t), f.shimRemoteStreamsAPI(t), f.shimTrackEventTransceiver(t), f.shimGetUserMedia(t), d.shimRTCIceCandidate(t), d.shimMaxMessageSize(t), d.shimSendThrowTypeError(t);
        break;
    default: o("Unsupported browser!");
} return l; }({ window: n.window }), I = T; function T() { } T.mixin = function (n) { var e = n.prototype || n; e.isWildEmitter = !0, e.on = function (n, e, t) { this.callbacks = this.callbacks || {}; var i = 3 === arguments.length, r = i ? e : void 0, o = i ? t : e; return o.F = r, (this.callbacks[n] = this.callbacks[n] || []).push(o), this; }, e.once = function (e, n, t) { var i = this, r = 3 === arguments.length, o = r ? n : void 0, a = r ? t : n; return this.on(e, o, function n() { i.off(e, n), a.apply(this, arguments); }), this; }, e.releaseGroup = function (n) { var e, t, i, r; for (e in this.callbacks = this.callbacks || {}, this.callbacks)
    for (t = 0, i = (r = this.callbacks[e]).length; t < i; t++)
        r[t].F === n && (r.splice(t, 1), t--, i--); return this; }, e.off = function (n, e) { this.callbacks = this.callbacks || {}; var t, i = this.callbacks[n]; return i && (1 === arguments.length ? delete this.callbacks[n] : (t = i.indexOf(e), i.splice(t, 1), 0 === i.length && delete this.callbacks[n])), this; }, e.emit = function (n) { this.callbacks = this.callbacks || {}; var e, t, i, r = [].slice.call(arguments, 1), o = this.callbacks[n], a = this.getWildcardCallbacks(n); if (o)
    for (e = 0, t = (i = o.slice()).length; e < t && i[e]; ++e)
        i[e].apply(this, r); if (a)
    for (t = a.length, e = 0, t = (i = a.slice()).length; e < t && i[e]; ++e)
        i[e].apply(this, [n].concat(r)); return this; }, e.getWildcardCallbacks = function (n) { this.callbacks = this.callbacks || {}; var e, t, i = []; for (e in this.callbacks)
    t = e.split("*"), ("*" === e || 2 === t.length && n.slice(0, t[0].length) === t[0]) && (i = i.concat(this.callbacks[e])); return i; }; }, T.mixin(T); var E = function (e) { function n() { var n = null !== e && e.apply(this, arguments) || this; return n.J = { video: !0, appKey: "", userId: "", token: "", localMediaConstraints: { video: { width: { ideal: 320 }, frameRate: { ideal: 12 }, facingMode: "user" }, audio: { autoGainControl: !0, channelCount: 1, echoCancellation: !0, noiseSuppression: !0, sampleRate: { ideal: 8e3 }, sampleSize: { ideal: 8 }, volume: .9 } } }, n; } return a(n, e), n.prototype.set = function (n, e) { this.J[n] = e, this.emit("change:" + n, n, e); }, n.prototype.get = function (n) { return this.J[n]; }, n; }(I); H.sessions = {}, H.isExtensionEnabled = function () { if (navigator.getDisplayMedia)
    return !0; if (window.navigator.userAgent.match("Chrome")) {
    var n = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10), e = 33;
    return window.navigator.userAgent.match("Linux") && (e = 35), 26 <= n && n <= e || H.extension.isInstalled();
} return !0; }; var O = { extensionId: "hapfgfdkleiggjjpfpenajgdnfckjpaj", isInstalled: function () { return null !== document.querySelector("#janus-extension-installed"); }, getScreen: function (n) { var e = window.setTimeout(function () { return error = new Error("NavigatorUserMediaError"), error.name = 'The required Chrome extension is not installed: click <a href="#">here</a> to install it. (NOTE: this will need you to refresh the page)', n(error); }, 1e3); this.cache[e] = n, window.postMessage({ type: "janusGetScreen", id: e }, "*"); }, init: function () { var i = {}; this.cache = i, window.addEventListener("message", function (n) { if (n.origin == window.location.origin)
        if ("janusGotScreen" == n.data.type && i[n.data.id]) {
            var e = i[n.data.id];
            if (delete i[n.data.id], "" === n.data.sourceId) {
                var t = new Error("NavigatorUserMediaError");
                t.name = "You cancelled the request for permission, giving up...", e(t);
            }
            else
                e(null, n.data.sourceId);
        }
        else
            "janusGetScreenPending" == n.data.type && (console.log("clearing ", n.data.id), window.clearTimeout(n.data.id)); }); } }; function H(u) { if (void 0 === H.initDone)
    return u.error("Library not initialized"), {}; if (!H.isWebrtcSupported())
    return u.error("WebRTC not supported by this browser"), {}; if (H.log("Library initialized: " + H.initDone), (u = u || {}).success = "function" == typeof u.success ? u.success : H.noop, u.error = "function" == typeof u.error ? u.error : H.noop, u.destroyed = "function" == typeof u.destroyed ? u.destroyed : H.noop, null === u.server || void 0 === u.server)
    return u.error("Invalid server url"), {}; var v = !1, s = null, c = {}, f = null, r = null, o = 0, d = u.server; H.isArray(d) ? (H.log("Multiple servers provided (" + d.length + "), will use the first that works"), d = null, r = u.server, H.debug(r)) : 0 === d.indexOf("ws") ? (v = !0, H.log("Using WebSockets to contact Janus: " + d)) : (v = !1, H.log("Using REST API to contact Janus: " + d)); var w = u.iceServers; null == w && (w = [{ urls: "stun:stun.l.google.com:19302" }]); var y = u.iceTransportPolicy, b = u.bundlePolicy, S = u.ipv6; null == S && (S = !1); var l = !1; void 0 !== u.withCredentials && null !== u.withCredentials && (l = !0 === u.withCredentials); var e = null; void 0 !== u.max_poll_events && null !== u.max_poll_events && (e = u.max_poll_events), e < 1 && (e = 1); var h = null; void 0 !== u.token && null !== u.token && (h = u.token); var p = null; void 0 !== u.apisecret && null !== u.apisecret && (p = u.apisecret), this.destroyOnUnload = !0, void 0 !== u.destroyOnUnload && null !== u.destroyOnUnload && (this.destroyOnUnload = !0 === u.destroyOnUnload); var a = 25e3; void 0 !== u.keepAlivePeriod && null !== u.keepAlivePeriod && (a = u.keepAlivePeriod), isNaN(a) && (a = 25e3); var t = 6e4; void 0 !== u.longPollTimeout && null !== u.longPollTimeout && (t = u.longPollTimeout), isNaN(t) && (t = 6e4); var m = !1, g = null, E = {}, k = this, I = 0, T = {}; function O() { if (null != g)
    if (H.debug("Long poll..."), m) {
        var n = d + "/" + g + "?rid=" + (new Date).getTime();
        null != e && (n = n + "&maxev=" + e), null != h && (n = n + "&token=" + encodeURIComponent(h)), null != p && (n = n + "&apisecret=" + encodeURIComponent(p)), H.httpAPICall(n, { verb: "GET", withCredentials: l, success: j, timeout: t, error: function (n, e) { if (H.error(n + ":", e), 3 < ++I)
                return m = !1, void u.error("Lost connection to the server (is it down?)"); O(); } });
    }
    else
        H.warn("Is the server down? (connected=false)"); } function j(n, e) { if (I = 0, v || null == g || !0 === e || setTimeout(O, 200), v || !H.isArray(n))
    if ("keepalive" !== n.janus)
        if ("ack" !== n.janus)
            if ("success" !== n.janus)
                if ("trickle" === n.janus) {
                    if (null == (a = n.sender))
                        return void H.warn("Missing sender...");
                    if (null == (s = E[a]))
                        return void H.debug("This handle is not attached to this session");
                    var t = n.candidate;
                    H.debug("Got a trickled candidate on session " + g), H.debug(t);
                    var i = s.webrtcStuff;
                    i.pc && i.remoteSdp ? (H.debug("Adding remote candidate:", t), t && !0 !== t.completed ? i.pc.addIceCandidate(t) : i.pc.addIceCandidate()) : (H.debug("We didn't do setRemoteDescription (trickle got here before the offer?), caching candidate"), i.candidates || (i.candidates = []), i.candidates.push(t), H.debug(i.candidates));
                }
                else {
                    if ("webrtcup" === n.janus)
                        return H.debug("Got a webrtcup event on session " + g), H.debug(n), null == (a = n.sender) ? void H.warn("Missing sender...") : null == (s = E[a]) ? void H.debug("This handle is not attached to this session") : void s.webrtcState(!0);
                    if ("hangup" === n.janus) {
                        if (H.debug("Got a hangup event on session " + g), H.debug(n), null == (a = n.sender))
                            return void H.warn("Missing sender...");
                        if (null == (s = E[a]))
                            return void H.debug("This handle is not attached to this session");
                        s.webrtcState(!1, n.reason), s.hangup();
                    }
                    else if ("detached" === n.janus) {
                        if (H.debug("Got a detached event on session " + g), H.debug(n), null == (a = n.sender))
                            return void H.warn("Missing sender...");
                        if (null == (s = E[a]))
                            return;
                        s.detached = !0, s.ondetached(), s.detach();
                    }
                    else if ("media" === n.janus) {
                        if (H.debug("Got a media event on session " + g), H.debug(n), null == (a = n.sender))
                            return void H.warn("Missing sender...");
                        if (null == (s = E[a]))
                            return void H.debug("This handle is not attached to this session");
                        s.mediaState(n.type, n.receiving);
                    }
                    else if ("slowlink" === n.janus) {
                        if (H.debug("Got a slowlink event on session " + g), H.debug(n), null == (a = n.sender))
                            return void H.warn("Missing sender...");
                        if (null == (s = E[a]))
                            return void H.debug("This handle is not attached to this session");
                        s.slowLink(n.uplink, n.nacks);
                    }
                    else {
                        if ("error" === n.janus) {
                            var r, o;
                            if (H.error("Ooops: " + n.error.code + " " + n.error.reason), H.debug(n), null != (r = n.transaction))
                                null != (o = T[r]) && o(n), delete T[r];
                            return;
                        }
                        if ("event" === n.janus) {
                            var a;
                            if (H.debug("Got a plugin event on session " + g), H.debug(n), null == (a = n.sender))
                                return void H.warn("Missing sender...");
                            var u = n.plugindata;
                            if (null == u)
                                return void H.warn("Missing plugindata...");
                            H.debug("  -- Event is coming from " + a + " (" + u.plugin + ")");
                            var s, c = u.data;
                            if (H.debug(c), null == (s = E[a]))
                                return void H.warn("This handle is not attached to this session");
                            var f = n.jsep;
                            null != f && (H.debug("Handling SDP as well..."), H.debug(f));
                            var d = s.onmessage;
                            null != d ? (H.debug("Notifying application..."), d(c, f)) : H.debug("No provided notification callback");
                        }
                        else
                            H.warn("Unknown message/event  '" + n.janus + "' on session " + g), H.debug(n);
                    }
                }
            else
                H.debug("Got a success on session " + g), H.debug(n), null != (r = n.transaction) && (null != (o = T[r]) && o(n), delete T[r]);
        else
            H.debug("Got an ack on session " + g), H.debug(n), null != (r = n.transaction) && (null != (o = T[r]) && o(n), delete T[r]);
    else
        H.vdebug("Got a keepalive on session " + g);
else
    for (var l = 0; l < n.length; l++)
        j(n[l], !0); } function C() { if (null !== d && v && m) {
    f = setTimeout(C, a);
    var n = { janus: "keepalive", session_id: g, transaction: H.randomString(12) };
    null != h && (n.token = h), null != p && (n.apisecret = p), s.send(JSON.stringify(n));
} } function P(t) { var n = H.randomString(12), e = { janus: "create", transaction: n }; if (t.reconnect && (m = !1, e.janus = "claim", e.session_id = g, s && (s.onopen = null, s.onerror = null, s.onclose = null, f && (clearTimeout(f), f = null))), null != h && (e.token = h), null != p && (e.apisecret = p), null === d && H.isArray(r) && (0 === (d = r[o]).indexOf("ws") ? (v = !0, H.log("Server #" + (o + 1) + ": trying WebSockets to contact Janus (" + d + ")")) : (v = !1, H.log("Server #" + (o + 1) + ": trying REST API to contact Janus (" + d + ")"))), v)
    for (var i in s = H.newWebSocket(d, "janus-protocol"), c = { error: function () { if (H.error("Error connecting to the Janus WebSockets server... " + d), H.isArray(r) && !t.reconnect)
            return ++o == r.length ? void t.error("Error connecting to any of the provided Janus servers: Is the server down?") : (d = null, void setTimeout(function () { P(t); }, 200)); t.error("Error connecting to the Janus WebSockets server: Is the server down?"); }, open: function () { T[n] = function (n) { if (H.debug(n), "success" !== n.janus)
            return H.error("Ooops: " + n.error.code + " " + n.error.reason), void t.error(n.error.reason); f = setTimeout(C, a), m = !0, g = n.session_id ? n.session_id : n.data.id, t.reconnect ? H.log("Claimed session: " + g) : H.log("Created session: " + g), H.sessions[g] = k, t.success(); }, s.send(JSON.stringify(e)); }, message: function (n) { j(JSON.parse(n.data)); }, close: function () { null !== d && m && (m = !1, u.error("Lost connection to the server (is it down?)")); } })
        s.addEventListener(i, c[i]);
else
    H.httpAPICall(d, { verb: "POST", withCredentials: l, body: e, success: function (n) { if (H.debug(n), "success" !== n.janus)
            return H.error("Ooops: " + n.error.code + " " + n.error.reason), void t.error(n.error.reason); m = !0, g = n.session_id ? n.session_id : n.data.id, t.reconnect ? H.log("Claimed session: " + g) : H.log("Created session: " + g), H.sessions[g] = k, O(), t.success(); }, error: function (n, e) { if (H.error(n + ":", e), H.isArray(r) && !t.reconnect)
            return ++o == r.length ? void t.error("Error connecting to any of the provided Janus servers: Is the server down?") : (d = null, void setTimeout(function () { P(t); }, 200)); "" === e ? t.error(n + ": Is the server down?") : t.error(n + ": " + e); } }); } function R(n, i) { if ((i = i || {}).success = "function" == typeof i.success ? i.success : H.noop, i.error = "function" == typeof i.error ? i.error : H.noop, !m)
    return H.warn("Is the server down? (connected=false)"), void i.error("Is the server down? (connected=false)"); var e = E[n]; if (null == e || null === e.webrtcStuff || void 0 === e.webrtcStuff)
    return H.warn("Invalid handle"), void i.error("Invalid handle"); var t = i.message, r = i.jsep, o = H.randomString(12), a = { janus: "message", body: t, transaction: o }; if (null !== e.token && void 0 !== e.token && (a.token = e.token), null != p && (a.apisecret = p), null != r && (a.jsep = r), H.debug("Sending message to plugin (handle=" + n + "):"), H.debug(a), v)
    return a.session_id = g, a.handle_id = n, T[o] = function (n) { if (H.debug("Message sent!"), H.debug(n), "success" === n.janus) {
        var e = n.plugindata;
        if (null == e)
            return H.warn("Request succeeded, but missing plugindata..."), void i.success();
        H.log("Synchronous transaction successful (" + e.plugin + ")");
        var t = e.data;
        return H.debug(t), void i.success(t);
    } "ack" === n.janus ? i.success() : void 0 !== n.error && null !== n.error ? (H.error("Ooops: " + n.error.code + " " + n.error.reason), i.error(n.error.code + " " + n.error.reason)) : (H.error("Unknown error"), i.error("Unknown error")); }, void s.send(JSON.stringify(a)); H.httpAPICall(d + "/" + g + "/" + n, { verb: "POST", withCredentials: l, body: a, success: function (n) { if (H.debug("Message sent!"), H.debug(n), "success" === n.janus) {
        var e = n.plugindata;
        if (null == e)
            return H.warn("Request succeeded, but missing plugindata..."), void i.success();
        H.log("Synchronous transaction successful (" + e.plugin + ")");
        var t = e.data;
        return H.debug(t), void i.success(t);
    } "ack" === n.janus ? i.success() : void 0 !== n.error && null !== n.error ? (H.error("Ooops: " + n.error.code + " " + n.error.reason), i.error(n.error.code + " " + n.error.reason)) : (H.error("Unknown error"), i.error("Unknown error")); }, error: function (n, e) { H.error(n + ":", e), i.error(n + ": " + e); } }); } function D(n, e) { if (m) {
    var t = E[n];
    if (null != t && null !== t.webrtcStuff && void 0 !== t.webrtcStuff) {
        var i = { janus: "trickle", candidate: e, transaction: H.randomString(12) };
        if (null !== t.token && void 0 !== t.token && (i.token = t.token), null != p && (i.apisecret = p), H.vdebug("Sending trickle candidate (handle=" + n + "):"), H.vdebug(i), v)
            return i.session_id = g, i.handle_id = n, void s.send(JSON.stringify(i));
        H.httpAPICall(d + "/" + g + "/" + n, { verb: "POST", withCredentials: l, body: i, success: function (n) { H.vdebug("Candidate sent!"), H.vdebug(n), "ack" === n.janus || H.error("Ooops: " + n.error.code + " " + n.error.reason); }, error: function (n, e) { H.error(n + ":", e); } });
    }
    else
        H.warn("Invalid handle");
}
else
    H.warn("Is the server down? (connected=false)"); } function M(n, e) { (e = e || {}).success = "function" == typeof e.success ? e.success : H.noop, e.error = "function" == typeof e.error ? e.error : H.noop; var t = E[n]; if (null == t || null === t.webrtcStuff || void 0 === t.webrtcStuff)
    return H.warn("Invalid handle"), void e.error("Invalid handle"); var i = t.webrtcStuff, r = e.text; if (null == r)
    return H.warn("Invalid text"), void e.error("Invalid text"); H.log("Sending string on data channel: " + r), i.dataChannel.send(r), e.success(); } function x(n, e) { (e = e || {}).success = "function" == typeof e.success ? e.success : H.noop, e.error = "function" == typeof e.error ? e.error : H.noop; var t = E[n]; if (null == t || null === t.webrtcStuff || void 0 === t.webrtcStuff)
    return H.warn("Invalid handle"), void e.error("Invalid handle"); var i = t.webrtcStuff; if (null === i.dtmfSender || void 0 === i.dtmfSender) {
    if (void 0 !== i.pc && null !== i.pc) {
        var r = i.pc.getSenders().find(function (n) { return n.track && "audio" === n.track.kind; });
        if (!r)
            return H.warn("Invalid DTMF configuration (no audio track)"), void e.error("Invalid DTMF configuration (no audio track)");
        i.dtmfSender = r.dtmf, i.dtmfSender && (H.log("Created DTMF Sender"), i.dtmfSender.ontonechange = function (n) { H.debug("Sent DTMF tone: " + n.tone); });
    }
    if (null === i.dtmfSender || void 0 === i.dtmfSender)
        return H.warn("Invalid DTMF configuration"), void e.error("Invalid DTMF configuration");
} var o = e.dtmf; if (null == o)
    return H.warn("Invalid DTMF parameters"), void e.error("Invalid DTMF parameters"); var a = o.tones; if (null == a)
    return H.warn("Invalid DTMF string"), void e.error("Invalid DTMF string"); var u = o.duration; null == u && (u = 500); var s = o.gap; null == s && (s = 50), H.debug("Sending DTMF string " + a + " (duration " + u + "ms, gap " + s + "ms)"), i.dtmfSender.insertDTMF(a, u, s); } function A(t, i) { (i = i || {}).success = "function" == typeof i.success ? i.success : H.noop, i.error = "function" == typeof i.error ? i.error : H.noop; var n = !0; void 0 !== i.asyncRequest && null !== i.asyncRequest && (n = !0 === i.asyncRequest), H.log("Destroying handle " + t + " (async=" + n + ")"), W(t); var e = E[t]; if (null == e || e.detached)
    return delete E[t], void i.success(); if (!m)
    return H.warn("Is the server down? (connected=false)"), void i.error("Is the server down? (connected=false)"); var r = { janus: "detach", transaction: H.randomString(12) }; if (null !== e.token && void 0 !== e.token && (r.token = e.token), null != p && (r.apisecret = p), v)
    return r.session_id = g, r.handle_id = t, s.send(JSON.stringify(r)), delete E[t], void i.success(); H.httpAPICall(d + "/" + g + "/" + t, { verb: "POST", async: n, withCredentials: l, body: r, success: function (n) { H.log("Destroyed handle:"), H.debug(n), "success" !== n.janus && H.error("Ooops: " + n.error.code + " " + n.error.reason), delete E[t], i.success(); }, error: function (n, e) { H.error(n + ":", e), delete E[t], i.success(); } }); } function N(t, i, r, o, e) { var a = E[t]; if (null == a || null === a.webrtcStuff || void 0 === a.webrtcStuff)
    return H.warn("Invalid handle"), void o.error("Invalid handle"); var u = a.webrtcStuff; H.debug("streamsDone:", e), e && (H.debug("  -- Audio tracks:", e.getAudioTracks()), H.debug("  -- Video tracks:", e.getVideoTracks())); var n = !1; if (u.myStream && r.update && !u.streamExternal) {
    if ((!r.update && B(r) || r.update && (r.addAudio || r.replaceAudio)) && e.getAudioTracks() && e.getAudioTracks().length)
        if (u.myStream.addTrack(e.getAudioTracks()[0]), r.replaceAudio && "firefox" === H.webRTCAdapter.browserDetails.browser)
            for (var s in H.log("Replacing audio track:", e.getAudioTracks()[0]), u.pc.getSenders()) {
                (d = u.pc.getSenders()[s]) && d.track && "audio" === d.track.kind && d.replaceTrack(e.getAudioTracks()[0]);
            }
        else if ("firefox" === H.webRTCAdapter.browserDetails.browser && 59 <= H.webRTCAdapter.browserDetails.version) {
            H.log((r.replaceVideo ? "Replacing" : "Adding") + " video track:", e.getVideoTracks()[0]);
            var c = null;
            if ((l = u.pc.getTransceivers()) && 0 < l.length)
                for (var f in l) {
                    if ((h = l[f]).sender && h.sender.track && "audio" === h.sender.track.kind || h.receiver && h.receiver.track && "audio" === h.receiver.track.kind) {
                        c = h;
                        break;
                    }
                }
            c && c.sender ? c.sender.replaceTrack(e.getVideoTracks()[0]) : u.pc.addTrack(e.getVideoTracks()[0], e);
        }
        else
            H.log((r.replaceAudio ? "Replacing" : "Adding") + " audio track:", e.getAudioTracks()[0]), u.pc.addTrack(e.getAudioTracks()[0], e);
    if ((!r.update && z(r) || r.update && (r.addVideo || r.replaceVideo)) && e.getVideoTracks() && e.getVideoTracks().length)
        if (u.myStream.addTrack(e.getVideoTracks()[0]), r.replaceVideo && "firefox" === H.webRTCAdapter.browserDetails.browser)
            for (var s in H.log("Replacing video track:", e.getVideoTracks()[0]), u.pc.getSenders()) {
                var d;
                (d = u.pc.getSenders()[s]) && d.track && "video" === d.track.kind && d.replaceTrack(e.getVideoTracks()[0]);
            }
        else if ("firefox" === H.webRTCAdapter.browserDetails.browser && 59 <= H.webRTCAdapter.browserDetails.version) {
            H.log((r.replaceVideo ? "Replacing" : "Adding") + " video track:", e.getVideoTracks()[0]);
            var l, v = null;
            if ((l = u.pc.getTransceivers()) && 0 < l.length)
                for (var f in l) {
                    var h;
                    if ((h = l[f]).sender && h.sender.track && "video" === h.sender.track.kind || h.receiver && h.receiver.track && "video" === h.receiver.track.kind) {
                        v = h;
                        break;
                    }
                }
            v && v.sender ? v.sender.replaceTrack(e.getVideoTracks()[0]) : u.pc.addTrack(e.getVideoTracks()[0], e);
        }
        else
            H.log((r.replaceVideo ? "Replacing" : "Adding") + " video track:", e.getVideoTracks()[0]), u.pc.addTrack(e.getVideoTracks()[0], e);
}
else
    u.myStream = e, n = !0; if (!u.pc) {
    var p = { iceServers: w, iceTransportPolicy: y, bundlePolicy: b }, m = { optional: [{ DtlsSrtpKeyAgreement: !0 }] };
    if (!0 === S && m.optional.push({ googIPv6: !0 }), o.rtcConstraints && "object" == typeof o.rtcConstraints)
        for (var f in H.debug("Adding custom PeerConnection constraints:", o.rtcConstraints), o.rtcConstraints)
            m.optional.push(o.rtcConstraints[f]);
    "edge" === H.webRTCAdapter.browserDetails.browser && (p.bundlePolicy = "max-bundle"), H.log("Creating PeerConnection"), H.debug(m), u.pc = new RTCPeerConnection(p, m), H.debug(u.pc), u.pc.getStats && (u.volume = {}, u.bitrate.value = "0 kbits/sec"), H.log("Preparing local SDP and gathering candidates (trickle=" + u.trickle + ")"), u.pc.oniceconnectionstatechange = function (n) { u.pc && a.iceState(u.pc.iceConnectionState); }, u.pc.onicecandidate = function (n) { if (null == n.candidate || "edge" === H.webRTCAdapter.browserDetails.browser && 0 < n.candidate.candidate.indexOf("endOfCandidates"))
        H.log("End of candidates."), (u.iceDone = !0) === u.trickle ? D(t, { completed: !0 }) : function (n, e) { (e = e || {}).success = "function" == typeof e.success ? e.success : H.noop, e.error = "function" == typeof e.error ? e.error : H.noop; var t = E[n]; if (null == t || null === t.webrtcStuff || void 0 === t.webrtcStuff)
            return H.warn("Invalid handle, not sending anything"); var i = t.webrtcStuff; if (H.log("Sending offer/answer SDP..."), null === i.mySdp || void 0 === i.mySdp)
            return H.warn("Local SDP instance is invalid, not sending anything..."); i.mySdp = { type: i.pc.localDescription.type, sdp: i.pc.localDescription.sdp }, !1 === i.trickle && (i.mySdp.trickle = !1); H.debug(e), i.sdpSent = !0, e.success(i.mySdp); }(t, o);
    else {
        var e = { candidate: n.candidate.candidate, sdpMid: n.candidate.sdpMid, sdpMLineIndex: n.candidate.sdpMLineIndex };
        !0 === u.trickle && D(t, e);
    } }, u.pc.ontrack = function (n) { H.log("Handling Remote Track"), H.debug(n), n.streams && (u.remoteStream = n.streams[0], a.onremotestream(u.remoteStream), n.track && !n.track.onended && (H.log("Adding onended callback to track:", n.track), n.track.onended = function (n) { H.log("Remote track removed:", n), u.remoteStream && (u.remoteStream.removeTrack(n.target), a.onremotestream(u.remoteStream)); })); };
} if (n && null != e && (H.log("Adding local stream"), e.getTracks().forEach(function (n) { H.log("Adding local track:", n), u.pc.addTrack(n, e); })), function (n) { if (H.debug("isDataEnabled:", n), "edge" == H.webRTCAdapter.browserDetails.browser)
    return H.warn("Edge doesn't support data channels yet"), !1; return null != n && !0 === n.data; }(r) && !u.dataChannel) {
    H.log("Creating data channel");
    var g = function () { var n = null !== u.dataChannel ? u.dataChannel.readyState : "null"; H.log("State change on data channel: " + n), "open" === n && a.ondataopen(); };
    u.dataChannel = u.pc.createDataChannel("JanusDataChannel", { ordered: !1 }), u.dataChannel.onmessage = function (n) { H.log("Received message on data channel: " + n.data), a.ondata(n.data); }, u.dataChannel.onopen = g, u.dataChannel.onclose = g, u.dataChannel.onerror = function (n) { H.error("Got error on data channel:", n); };
} u.myStream && a.onlocalstream(u.myStream), null == i ? function (n, e, t) { (t = t || {}).success = "function" == typeof t.success ? t.success : H.noop, t.error = "function" == typeof t.error ? t.error : H.noop; var i = E[n]; if (null == i || null === i.webrtcStuff || void 0 === i.webrtcStuff)
    return H.warn("Invalid handle"), t.error("Invalid handle"); var r = i.webrtcStuff, o = !0 === t.simulcast; H.log(o ? "Creating offer (iceDone=" + r.iceDone + ", simulcast=" + o + ")" : "Creating offer (iceDone=" + r.iceDone + ")"); var a = {}; if ("firefox" === H.webRTCAdapter.browserDetails.browser && 59 <= H.webRTCAdapter.browserDetails.version) {
    var u = null, s = null, c = r.pc.getTransceivers();
    if (c && 0 < c.length)
        for (var f in c) {
            var d = c[f];
            d.sender && d.sender.track && "audio" === d.sender.track.kind || d.receiver && d.receiver.track && "audio" === d.receiver.track.kind ? u || (u = d) : (d.sender && d.sender.track && "video" === d.sender.track.kind || d.receiver && d.receiver.track && "video" === d.receiver.track.kind) && (s || (s = d));
        }
    var l = B(e), v = _(e);
    l || v ? l && v ? u && (u.direction = "sendrecv", H.log("Setting audio transceiver to sendrecv:", u)) : l && !v ? u && (u.direction = "sendonly", H.log("Setting audio transceiver to sendonly:", u)) : !l && v && (u ? (u.direction = "recvonly", H.log("Setting audio transceiver to recvonly:", u)) : (u = r.pc.addTransceiver("audio", { direction: "recvonly" }), H.log("Adding recvonly audio transceiver:", u))) : e.removeAudio && u && (u.direction = "inactive", H.log("Setting audio transceiver to inactive:", u));
    var h = z(e), p = K(e);
    h || p ? h && p ? s && (s.direction = "sendrecv", H.log("Setting video transceiver to sendrecv:", s)) : h && !p ? s && (s.direction = "sendonly", H.log("Setting video transceiver to sendonly:", s)) : !h && p && (s ? (s.direction = "recvonly", H.log("Setting video transceiver to recvonly:", s)) : (s = r.pc.addTransceiver("video", { direction: "recvonly" }), H.log("Adding recvonly video transceiver:", s))) : e.removeVideo && s && (s.direction = "inactive", H.log("Setting video transceiver to inactive:", s));
}
else
    a.offerToReceiveAudio = _(e), a.offerToReceiveVideo = K(e); !0 === t.iceRestart && (a.iceRestart = !0); H.debug(a); var m = z(e); if (m && o && "firefox" === H.webRTCAdapter.browserDetails.browser) {
    H.log("Enabling Simulcasting for Firefox (RID)");
    var g = r.pc.getSenders()[1];
    H.log(g);
    var w = g.getParameters();
    H.log(w), g.setParameters({ encodings: [{ rid: "high", active: !0, priority: "high", maxBitrate: 1e6 }, { rid: "medium", active: !0, priority: "medium", maxBitrate: 3e5 }, { rid: "low", active: !0, priority: "low", maxBitrate: 1e5 }] });
} r.pc.createOffer(a).then(function (n) { if (H.debug(n), H.log("Setting local description"), m && o && ("chrome" === H.webRTCAdapter.browserDetails.browser ? (H.log("Enabling Simulcasting for Chrome (SDP munging)"), n.sdp = function (n) { for (var e = n.split("\r\n"), t = !1, i = [-1], r = [-1], o = null, a = null, u = null, s = null, c = -1, f = 0; f < e.length; f++) {
    var d = e[f].match(/m=(\w+) */);
    if (d) {
        var l = d[1];
        if ("video" === l) {
            if (!(i[0] < 0)) {
                c = f;
                break;
            }
            t = !0;
        }
        else if (-1 < i[0]) {
            c = f;
            break;
        }
    }
    else if (t) {
        var v = e[f].match(/a=ssrc-group:FID (\d+) (\d+)/);
        if (v)
            i[0] = v[1], r[0] = v[2], e.splice(f, 1), f--;
        else {
            if (i[0]) {
                var h = e[f].match("a=ssrc:" + i[0] + " cname:(.+)");
                if (h && (o = h[1]), (h = e[f].match("a=ssrc:" + i[0] + " msid:(.+)")) && (a = h[1]), (h = e[f].match("a=ssrc:" + i[0] + " mslabel:(.+)")) && (u = h[1]), (h = e[f].match("a=ssrc:" + i + " label:(.+)")) && (s = h[1]), 0 === e[f].indexOf("a=ssrc:" + r)) {
                    e.splice(f, 1), f--;
                    continue;
                }
                if (0 === e[f].indexOf("a=ssrc:" + i[0])) {
                    e.splice(f, 1), f--;
                    continue;
                }
            }
            0 != e[f].length || (e.splice(f, 1), f--);
        }
    }
} if (i[0] < 0) {
    t = !(c = -1);
    for (var f = 0; f < e.length; f++) {
        var d = e[f].match(/m=(\w+) */);
        if (d) {
            var l = d[1];
            if ("video" === l) {
                if (!(i[0] < 0)) {
                    c = f;
                    break;
                }
                t = !0;
            }
            else if (-1 < i[0]) {
                c = f;
                break;
            }
        }
        else if (t) {
            if (i[0] < 0) {
                var p = e[f].match(/a=ssrc:(\d+)/);
                if (p) {
                    i[0] = p[1], e.splice(f, 1), f--;
                    continue;
                }
            }
            else {
                var h = e[f].match("a=ssrc:" + i[0] + " cname:(.+)");
                if (h && (o = h[1]), (h = e[f].match("a=ssrc:" + i[0] + " msid:(.+)")) && (a = h[1]), (h = e[f].match("a=ssrc:" + i[0] + " mslabel:(.+)")) && (u = h[1]), (h = e[f].match("a=ssrc:" + i[0] + " label:(.+)")) && (s = h[1]), 0 === e[f].indexOf("a=ssrc:" + r[0])) {
                    e.splice(f, 1), f--;
                    continue;
                }
                if (0 === e[f].indexOf("a=ssrc:" + i[0])) {
                    e.splice(f, 1), f--;
                    continue;
                }
            }
            0 != e[f].length || (e.splice(f, 1), f--);
        }
    }
} if (i[0] < 0)
    return H.warn("Couldn't find the video SSRC, simulcasting NOT enabled"), n; c < 0 && (c = e.length); i[1] = Math.floor(4294967295 * Math.random()), i[2] = Math.floor(4294967295 * Math.random()), r[1] = Math.floor(4294967295 * Math.random()), r[2] = Math.floor(4294967295 * Math.random()); for (var f = 0; f < i.length; f++)
    o && (e.splice(c, 0, "a=ssrc:" + i[f] + " cname:" + o), c++), a && (e.splice(c, 0, "a=ssrc:" + i[f] + " msid:" + a), c++), u && (e.splice(c, 0, "a=ssrc:" + i[f] + " mslabel:" + u), c++), s && (e.splice(c, 0, "a=ssrc:" + i[f] + " label:" + s), c++), o && (e.splice(c, 0, "a=ssrc:" + r[f] + " cname:" + o), c++), a && (e.splice(c, 0, "a=ssrc:" + r[f] + " msid:" + a), c++), u && (e.splice(c, 0, "a=ssrc:" + r[f] + " mslabel:" + u), c++), s && (e.splice(c, 0, "a=ssrc:" + r[f] + " label:" + s), c++); e.splice(c, 0, "a=ssrc-group:FID " + i[2] + " " + r[2]), e.splice(c, 0, "a=ssrc-group:FID " + i[1] + " " + r[1]), e.splice(c, 0, "a=ssrc-group:FID " + i[0] + " " + r[0]), e.splice(c, 0, "a=ssrc-group:SIM " + i[0] + " " + i[1] + " " + i[2]), (n = e.join("\r\n")).endsWith("\r\n") || (n += "\r\n"); return n; }(n.sdp)) : "firefox" !== H.webRTCAdapter.browserDetails.browser && H.warn("simulcast=true, but this is not Chrome nor Firefox, ignoring")), r.mySdp = n.sdp, r.pc.setLocalDescription(n).catch(t.error), r.mediaConstraints = a, r.iceDone || r.trickle) {
    H.log("Offer ready"), H.debug(t);
    var e = { type: n.type, sdp: n.sdp };
    t.success(e);
}
else
    H.log("Waiting for all candidates..."); }, t.error); }(t, r, o) : u.pc.setRemoteDescription(i).then(function () { if (H.log("Remote description accepted!"), u.remoteSdp = i.sdp, u.candidates && 0 < u.candidates.length) {
    for (var n in u.candidates) {
        var e = u.candidates[n];
        H.debug("Adding remote candidate:", e), e && !0 !== e.completed ? u.pc.addIceCandidate(e) : u.pc.addIceCandidate();
    }
    u.candidates = [];
} !function (n, e, t) { (t = t || {}).success = "function" == typeof t.success ? t.success : H.noop, t.error = "function" == typeof t.error ? t.error : H.noop; var i = E[n]; if (null == i || null === i.webrtcStuff || void 0 === i.webrtcStuff)
    return H.warn("Invalid handle"), t.error("Invalid handle"); var r = i.webrtcStuff, o = !0 === t.simulcast; H.log(o ? "Creating answer (iceDone=" + r.iceDone + ", simulcast=" + o + ")" : "Creating answer (iceDone=" + r.iceDone + ")"); var a = null; if ("firefox" === H.webRTCAdapter.browserDetails.browser && 59 <= H.webRTCAdapter.browserDetails.version) {
    a = {};
    var u = null, s = null, c = r.pc.getTransceivers();
    if (c && 0 < c.length)
        for (var f in c) {
            var d = c[f];
            d.sender && d.sender.track && "audio" === d.sender.track.kind || d.receiver && d.receiver.track && "audio" === d.receiver.track.kind ? u || (u = d) : (d.sender && d.sender.track && "video" === d.sender.track.kind || d.receiver && d.receiver.track && "video" === d.receiver.track.kind) && (s || (s = d));
        }
    var l = B(e), v = _(e);
    l || v ? l && v ? u && (u.direction = "sendrecv", H.log("Setting audio transceiver to sendrecv:", u)) : l && !v ? u && (u.direction = "sendonly", H.log("Setting audio transceiver to sendonly:", u)) : !l && v && (u ? (u.direction = "recvonly", H.log("Setting audio transceiver to recvonly:", u)) : (u = r.pc.addTransceiver("audio", { direction: "recvonly" }), H.log("Adding recvonly audio transceiver:", u))) : e.removeAudio && u && (u.direction = "inactive", H.log("Setting audio transceiver to inactive:", u));
    var h = z(e), p = K(e);
    h || p ? h && p ? s && (s.direction = "sendrecv", H.log("Setting video transceiver to sendrecv:", s)) : h && !p ? s && (s.direction = "sendonly", H.log("Setting video transceiver to sendonly:", s)) : !h && p && (s ? (s.direction = "recvonly", H.log("Setting video transceiver to recvonly:", s)) : (s = r.pc.addTransceiver("video", { direction: "recvonly" }), H.log("Adding recvonly video transceiver:", s))) : e.removeVideo && s && (s.direction = "inactive", H.log("Setting video transceiver to inactive:", s));
}
else
    a = "firefox" == H.webRTCAdapter.browserDetails.browser || "edge" == H.webRTCAdapter.browserDetails.browser ? { offerToReceiveAudio: _(e), offerToReceiveVideo: K(e) } : { mandatory: { OfferToReceiveAudio: _(e), OfferToReceiveVideo: K(e) } }; H.debug(a); var m = z(e); if (m && o && "firefox" === H.webRTCAdapter.browserDetails.browser) {
    H.log("Enabling Simulcasting for Firefox (RID)");
    var g = r.pc.getSenders()[1];
    H.log(g);
    var w = g.getParameters();
    H.log(w), g.setParameters({ encodings: [{ rid: "high", active: !0, priority: "high", maxBitrate: 1e6 }, { rid: "medium", active: !0, priority: "medium", maxBitrate: 3e5 }, { rid: "low", active: !0, priority: "low", maxBitrate: 1e5 }] });
} r.pc.createAnswer(a).then(function (n) { if (H.debug(n), H.log("Setting local description"), m && o && ("chrome" === H.webRTCAdapter.browserDetails.browser ? H.warn("simulcast=true, but this is an answer, and video breaks in Chrome if we enable it") : "firefox" !== H.webRTCAdapter.browserDetails.browser && H.warn("simulcast=true, but this is not Chrome nor Firefox, ignoring")), r.mySdp = n.sdp, r.pc.setLocalDescription(n).catch(t.error), r.mediaConstraints = a, r.iceDone || r.trickle) {
    var e = { type: n.type, sdp: n.sdp };
    t.success(e);
}
else
    H.log("Waiting for all candidates..."); }, t.error); }(t, r, o); }, o.error); } function L(l, v) { (v = v || {}).success = "function" == typeof v.success ? v.success : H.noop, v.error = "function" == typeof v.error ? v.error : q; var h = v.jsep; v.media = v.media || { audio: !0, video: !0 }; var p = v.media, m = E[l]; if (null == m || null === m.webrtcStuff || void 0 === m.webrtcStuff)
    return H.warn("Invalid handle"), void v.error("Invalid handle"); var n, e = m.webrtcStuff; if (e.trickle = (n = v.trickle, H.debug("isTrickleEnabled:", n), null == n || !0 === n), void 0 === e.pc || null === e.pc)
    p.update = !1;
else if (void 0 !== e.pc && null !== e.pc)
    if (H.log("Updating existing media session"), p.update = !0, null !== v.stream && void 0 !== v.stream)
        v.stream !== e.myStream && H.log("Renegotiation involves a new external stream");
    else {
        if (p.addAudio) {
            if (p.replaceAudio = !1, p.removeAudio = !1, p.audioSend = !0, e.myStream && e.myStream.getAudioTracks() && e.myStream.getAudioTracks().length)
                return H.error("Can't add audio stream, there already is one"), void v.error("Can't add audio stream, there already is one");
        }
        else
            p.removeAudio ? (p.replaceAudio = !1, p.addAudio = !1, p.audioSend = !1) : p.replaceAudio && (p.addAudio = !1, p.removeAudio = !1, p.audioSend = !0);
        if (null === e.myStream || void 0 === e.myStream ? (p.replaceAudio && (p.replaceAudio = !1, p.addAudio = !0, p.audioSend = !0), B(p) && (p.addAudio = !0)) : null !== e.myStream.getAudioTracks() && void 0 !== e.myStream.getAudioTracks() && 0 !== e.myStream.getAudioTracks().length || (p.replaceAudio && (p.replaceAudio = !1, p.addAudio = !0, p.audioSend = !0), B(p) && (p.addAudio = !0)), p.addVideo) {
            if (p.replaceVideo = !1, p.removeVideo = !1, p.videoSend = !0, e.myStream && e.myStream.getVideoTracks() && e.myStream.getVideoTracks().length)
                return H.error("Can't add video stream, there already is one"), void v.error("Can't add video stream, there already is one");
        }
        else
            p.removeVideo ? (p.replaceVideo = !1, p.addVideo = !1, p.videoSend = !1) : p.replaceVideo && (p.addVideo = !1, p.removeVideo = !1, p.videoSend = !0);
        null === e.myStream || void 0 === e.myStream ? (p.replaceVideo && (p.replaceVideo = !1, p.addVideo = !0, p.videoSend = !0), z(p) && (p.addVideo = !0)) : null !== e.myStream.getVideoTracks() && void 0 !== e.myStream.getVideoTracks() && 0 !== e.myStream.getVideoTracks().length || (p.replaceVideo && (p.replaceVideo = !1, p.addVideo = !0, p.videoSend = !0), z(p) && (p.addVideo = !0)), p.addData && (p.data = !0);
    } if (p.update && !e.streamExternal) {
    if (p.removeAudio || p.replaceAudio) {
        if (e.myStream && e.myStream.getAudioTracks() && e.myStream.getAudioTracks().length) {
            var t = e.myStream.getAudioTracks()[0];
            H.log("Removing audio track:", t), e.myStream.removeTrack(t);
            try {
                t.stop();
            }
            catch (n) { }
        }
        if (e.pc.getSenders() && e.pc.getSenders().length) {
            var i = !0;
            if (p.replaceAudio && "firefox" === H.webRTCAdapter.browserDetails.browser && (i = !1), i)
                for (var r in e.pc.getSenders()) {
                    (t = e.pc.getSenders()[r]) && t.track && "audio" === t.track.kind && (H.log("Removing audio sender:", t), e.pc.removeTrack(t));
                }
        }
    }
    if (p.removeVideo || p.replaceVideo) {
        if (e.myStream && e.myStream.getVideoTracks() && e.myStream.getVideoTracks().length) {
            t = e.myStream.getVideoTracks()[0];
            H.log("Removing video track:", t), e.myStream.removeTrack(t);
            try {
                t.stop();
            }
            catch (n) { }
        }
        if (e.pc.getSenders() && e.pc.getSenders().length) {
            var o = !0;
            if (p.replaceVideo && "firefox" === H.webRTCAdapter.browserDetails.browser && (o = !1), o)
                for (var r in e.pc.getSenders()) {
                    (t = e.pc.getSenders()[r]) && t.track && "video" === t.track.kind && (H.log("Removing video sender:", t), e.pc.removeTrack(t));
                }
        }
    }
} if (null !== v.stream && void 0 !== v.stream) {
    var a = v.stream;
    if (H.log("MediaStream provided by the application"), H.debug(a), p.update && e.myStream && e.myStream !== v.stream && !e.streamExternal) {
        try {
            var u = e.myStream.getTracks();
            for (var s in u) {
                var c = u[s];
                H.log(c), null != c && c.stop();
            }
        }
        catch (n) { }
        e.myStream = null;
    }
    return e.streamExternal = !0, void N(l, h, p, v, a);
} if (B(p) || z(p)) {
    var f = { mandatory: {}, optional: [] };
    m.consentDialog(!0);
    var g = B(p);
    !0 === g && null != p && null != p && "object" == typeof p.audio && (g = p.audio);
    var w = z(p);
    if (!0 === w && null != p && null != p)
        if (!(!0 === v.simulcast) || h || void 0 !== p.video && !1 !== p.video || (p.video = "hires"), p.video && "screen" != p.video && "window" != p.video)
            if ("object" == typeof p.video)
                w = p.video;
            else {
                var d = 0, y = 0;
                "lowres" === p.video ? (y = 240, d = 320) : "lowres-16:9" === p.video ? (y = 180, d = 320) : "hires" === p.video || "hires-16:9" === p.video || "hdres" === p.video ? (y = 720, d = 1280) : "fhdres" === p.video ? (y = 1080, d = 1920) : "4kres" === p.video ? (y = 2160, d = 3840) : ("stdres" === p.video ? y = 480 : "stdres-16:9" === p.video ? y = 360 : (H.log("Default video setting is stdres 4:3"), y = 480), d = 640), H.log("Adding media constraint:", p.video), H.log("Adding video constraint:", w = { height: { ideal: y }, width: { ideal: d } });
            }
        else if ("screen" === p.video || "window" === p.video) {
            if (p.screenshareFrameRate || (p.screenshareFrameRate = 3), navigator.getDisplayMedia)
                return void navigator.getDisplayMedia({ video: !0 }).then(function (e) { m.consentDialog(!1), B(p) ? navigator.mediaDevices.getUserMedia({ audio: !0, video: !1 }).then(function (n) { e.addTrack(n.getAudioTracks()[0]), N(l, h, p, v, e); }) : N(l, h, p, v, e); }, function (n) { m.consentDialog(!1), v.error(n); });
            function b(n, e) { m.consentDialog(!1), n ? v.error(n) : N(l, h, p, v, e); }
            function S(n, t, i) { H.log("Adding media constraint (screen capture)"), H.debug(n), navigator.mediaDevices.getUserMedia(n).then(function (e) { i ? navigator.mediaDevices.getUserMedia({ audio: !0, video: !1 }).then(function (n) { e.addTrack(n.getAudioTracks()[0]), t(null, e); }) : t(null, e); }).catch(function (n) { m.consentDialog(!1), t(n); }); }
            if ("chrome" === H.webRTCAdapter.browserDetails.browser) {
                var k = H.webRTCAdapter.browserDetails.version, I = 33;
                window.navigator.userAgent.match("Linux") && (I = 35), 26 <= k && k <= I ? S(f = { video: { mandatory: { googLeakyBucket: !0, maxWidth: window.screen.width, maxHeight: window.screen.height, minFrameRate: p.screenshareFrameRate, maxFrameRate: p.screenshareFrameRate, chromeMediaSource: "screen" } }, audio: B(p) }, b) : H.extension.getScreen(function (n, e) { if (n)
                    return m.consentDialog(!1), v.error(n); (f = { audio: !1, video: { mandatory: { chromeMediaSource: "desktop", maxWidth: window.screen.width, maxHeight: window.screen.height, minFrameRate: p.screenshareFrameRate, maxFrameRate: p.screenshareFrameRate }, optional: [{ googLeakyBucket: !0 }, { googTemporalLayeredScreencast: !0 }] } }).video.mandatory.chromeMediaSourceId = e, S(f, b, B(p)); });
            }
            else if (window.navigator.userAgent.match("Firefox")) {
                if (!(33 <= parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10))) {
                    var T = new Error("NavigatorUserMediaError");
                    return T.name = "Your version of Firefox does not support screen sharing, please install Firefox 33 (or more recent versions)", m.consentDialog(!1), void v.error(T);
                }
                S(f = { video: { mozMediaSource: p.video, mediaSource: p.video }, audio: B(p) }, function (n, e) { if (b(n, e), !n)
                    var t = e.currentTime, i = window.setInterval(function () { e || window.clearInterval(i), e.currentTime == t && (window.clearInterval(i), e.onended && e.onended()), t = e.currentTime; }, 500); });
            }
            return;
        }
    null != p && "screen" === p.video || navigator.mediaDevices.enumerateDevices().then(function (n) { var e, t, i = n.some(function (n) { return "audioinput" === n.kind; }), r = function (n) { if (H.debug("isScreenSendEnabled:", n), null == n)
        return !1; if ("object" != typeof n.video || "object" != typeof n.video.mandatory)
        return !1; var e = n.video.mandatory; {
        if (e.chromeMediaSource)
            return "desktop" === e.chromeMediaSource || "screen" === e.chromeMediaSource;
        if (e.mozMediaSource)
            return "window" === e.mozMediaSource || "screen" === e.mozMediaSource;
        if (e.mediaSource)
            return "window" === e.mediaSource || "screen" === e.mediaSource;
    } return !1; }(p) || n.some(function (n) { return "videoinput" === n.kind; }), o = B(p), a = z(p), u = (H.debug("isAudioSendRequired:", e = p), null != e && !1 !== e.audio && !1 !== e.audioSend && void 0 !== e.failIfNoAudio && null !== e.failIfNoAudio && !0 === e.failIfNoAudio), s = (H.debug("isVideoSendRequired:", t = p), null != t && !1 !== t.video && !1 !== t.videoSend && void 0 !== t.failIfNoVideo && null !== t.failIfNoVideo && !0 === t.failIfNoVideo); if (o || a || u || s) {
        var c = !!o && i, f = !!a && r;
        if (!c && !f)
            return m.consentDialog(!1), v.error("No capture device found"), !1;
        if (!c && u)
            return m.consentDialog(!1), v.error("Audio capture is required, but no capture device found"), !1;
        if (!f && s)
            return m.consentDialog(!1), v.error("Video capture is required, but no capture device found"), !1;
    } var d = { audio: !!i && g, video: !!r && w }; H.debug("getUserMedia constraints", d), navigator.mediaDevices.getUserMedia(d).then(function (n) { m.consentDialog(!1), N(l, h, p, v, n); }).catch(function (n) { m.consentDialog(!1), v.error({ code: n.code, name: n.name, message: n.message }); }); }).catch(function (n) { m.consentDialog(!1), v.error("enumerateDevices error", n); });
}
else
    N(l, h, p, v); } function F(n, t) { (t = t || {}).success = "function" == typeof t.success ? t.success : H.noop, t.error = "function" == typeof t.error ? t.error : q; var i = t.jsep, e = E[n]; if (null == e || null === e.webrtcStuff || void 0 === e.webrtcStuff)
    return H.warn("Invalid handle"), void t.error("Invalid handle"); var r = e.webrtcStuff; if (null != i) {
    if (null === r.pc)
        return H.warn("Wait, no PeerConnection?? if this is an answer, use createAnswer and not handleRemoteJsep"), void t.error("No PeerConnection: if this is an answer, use createAnswer and not handleRemoteJsep");
    r.pc.setRemoteDescription(i).then(function () { if (H.log("Remote description accepted!"), r.remoteSdp = i.sdp, r.candidates && 0 < r.candidates.length) {
        for (var n in r.candidates) {
            var e = r.candidates[n];
            H.debug("Adding remote candidate:", e), e && !0 !== e.completed ? r.pc.addIceCandidate(e) : r.pc.addIceCandidate();
        }
        r.candidates = [];
    } t.success(); }, t.error);
}
else
    t.error("Invalid JSEP"); } function J(n, r) { var e = E[n]; if (null == e || null === e.webrtcStuff || void 0 === e.webrtcStuff)
    return H.warn("Invalid handle"), 0; var o = r ? "remote" : "local", a = e.webrtcStuff; return a.volume[o] || (a.volume[o] = { value: 0 }), a.pc.getStats && "chrome" === H.webRTCAdapter.browserDetails.browser ? !r || null !== a.remoteStream && void 0 !== a.remoteStream ? r || null !== a.myStream && void 0 !== a.myStream ? null === a.volume[o].timer || void 0 === a.volume[o].timer ? (H.log("Starting " + o + " volume monitor"), a.volume[o].timer = setInterval(function () { a.pc.getStats(function (n) { for (var e = n.result(), t = 0; t < e.length; t++) {
    var i = e[t];
    "ssrc" == i.type && (r && i.stat("audioOutputLevel") ? a.volume[o].value = parseInt(i.stat("audioOutputLevel")) : !r && i.stat("audioInputLevel") && (a.volume[o].value = parseInt(i.stat("audioInputLevel"))));
} }); }, 200), 0) : a.volume[o].value : (H.warn("Local stream unavailable"), 0) : (H.warn("Remote stream unavailable"), 0) : (H.warn("Getting the " + o + " volume unsupported by browser"), 0); } function U(n, e) { var t = E[n]; if (null == t || null === t.webrtcStuff || void 0 === t.webrtcStuff)
    return H.warn("Invalid handle"), !0; var i = t.webrtcStuff; return null === i.pc || void 0 === i.pc ? (H.warn("Invalid PeerConnection"), !0) : void 0 === i.myStream || null === i.myStream ? (H.warn("Invalid local MediaStream"), !0) : e ? null === i.myStream.getVideoTracks() || void 0 === i.myStream.getVideoTracks() || 0 === i.myStream.getVideoTracks().length ? (H.warn("No video track"), !0) : !i.myStream.getVideoTracks()[0].enabled : null === i.myStream.getAudioTracks() || void 0 === i.myStream.getAudioTracks() || 0 === i.myStream.getAudioTracks().length ? (H.warn("No audio track"), !0) : !i.myStream.getAudioTracks()[0].enabled; } function G(n, e, t) { var i = E[n]; if (null == i || null === i.webrtcStuff || void 0 === i.webrtcStuff)
    return H.warn("Invalid handle"), !1; var r = i.webrtcStuff; return null === r.pc || void 0 === r.pc ? (H.warn("Invalid PeerConnection"), !1) : void 0 === r.myStream || null === r.myStream ? (H.warn("Invalid local MediaStream"), !1) : e ? null === r.myStream.getVideoTracks() || void 0 === r.myStream.getVideoTracks() || 0 === r.myStream.getVideoTracks().length ? (H.warn("No video track"), !1) : (r.myStream.getVideoTracks()[0].enabled = !t, !0) : null === r.myStream.getAudioTracks() || void 0 === r.myStream.getAudioTracks() || 0 === r.myStream.getAudioTracks().length ? (H.warn("No audio track"), !1) : (r.myStream.getAudioTracks()[0].enabled = !t, !0); } function V(n) { var e = E[n]; if (null == e || null === e.webrtcStuff || void 0 === e.webrtcStuff)
    return H.warn("Invalid handle"), "Invalid handle"; var r = e.webrtcStuff; return null === r.pc || void 0 === r.pc ? "Invalid PeerConnection" : r.pc.getStats ? null === r.bitrate.timer || void 0 === r.bitrate.timer ? (H.log("Starting bitrate timer (via getStats)"), r.bitrate.timer = setInterval(function () { r.pc.getStats().then(function (n) { n.forEach(function (n) { if (n) {
    var e = !1;
    if (("video" === n.mediaType || -1 < n.id.toLowerCase().indexOf("video")) && "inbound-rtp" === n.type && n.id.indexOf("rtcp") < 0 ? e = !0 : "ssrc" != n.type || !n.bytesReceived || "VP8" !== n.googCodecName && "" !== n.googCodecName || (e = !0), e)
        if (r.bitrate.bsnow = n.bytesReceived, r.bitrate.tsnow = n.timestamp, null === r.bitrate.bsbefore || null === r.bitrate.tsbefore)
            r.bitrate.bsbefore = r.bitrate.bsnow, r.bitrate.tsbefore = r.bitrate.tsnow;
        else {
            var t = r.bitrate.tsnow - r.bitrate.tsbefore;
            "safari" == H.webRTCAdapter.browserDetails.browser && (t /= 1e3);
            var i = Math.round(8 * (r.bitrate.bsnow - r.bitrate.bsbefore) / t);
            r.bitrate.value = i + " kbits/sec", r.bitrate.bsbefore = r.bitrate.bsnow, r.bitrate.tsbefore = r.bitrate.tsnow;
        }
} }); }); }, 1e3), "0 kbits/sec") : r.bitrate.value : (H.warn("Getting the video bitrate unsupported by browser"), "Feature unsupported by browser"); } function q(n) { H.error("WebRTC error:", n); } function W(n, e) { H.log("Cleaning WebRTC stuff"); var t = E[n]; if (null != t) {
    var i = t.webrtcStuff;
    if (null != i) {
        if (!0 === e) {
            var r = { janus: "hangup", transaction: H.randomString(12) };
            null !== t.token && void 0 !== t.token && (r.token = t.token), null != p && (r.apisecret = p), H.debug("Sending hangup request (handle=" + n + "):"), H.debug(r), v ? (r.session_id = g, r.handle_id = n, s.send(JSON.stringify(r))) : H.httpAPICall(d + "/" + g + "/" + n, { verb: "POST", withCredentials: l, body: r });
        }
        i.remoteStream = null, i.volume && (i.volume.local && i.volume.local.timer && clearInterval(i.volume.local.timer), i.volume.remote && i.volume.remote.timer && clearInterval(i.volume.remote.timer)), i.volume = {}, i.bitrate.timer && clearInterval(i.bitrate.timer), i.bitrate.timer = null, i.bitrate.bsnow = null, i.bitrate.bsbefore = null, i.bitrate.tsnow = null, i.bitrate.tsbefore = null, i.bitrate.value = null;
        try {
            if (!i.streamExternal && null !== i.myStream && void 0 !== i.myStream) {
                H.log("Stopping local stream tracks");
                var o = i.myStream.getTracks();
                for (var a in o) {
                    var u = o[a];
                    H.log(u), null != u && u.stop();
                }
            }
        }
        catch (n) { }
        i.streamExternal = !1, i.myStream = null;
        try {
            i.pc.close();
        }
        catch (n) { }
        i.pc = null, i.candidates = null, i.mySdp = null, i.remoteSdp = null, i.iceDone = !1, i.dataChannel = null, i.dtmfSender = null;
    }
    t.oncleanup();
} } function B(n) { return H.debug("isAudioSendEnabled:", n), null == n || !1 !== n.audio && (void 0 === n.audioSend || null === n.audioSend || !0 === n.audioSend); } function _(n) { return H.debug("isAudioRecvEnabled:", n), null == n || !1 !== n.audio && (void 0 === n.audioRecv || null === n.audioRecv || !0 === n.audioRecv); } function z(n) { return H.debug("isVideoSendEnabled:", n), null == n || !1 !== n.video && (void 0 === n.videoSend || null === n.videoSend || !0 === n.videoSend); } function K(n) { return H.debug("isVideoRecvEnabled:", n), null == n || !1 !== n.video && (void 0 === n.videoRecv || null === n.videoRecv || !0 === n.videoRecv); } P(u), this.getServer = function () { return d; }, this.isConnected = function () { return m; }, this.reconnect = function (n) { (n = n || {}).success = "function" == typeof n.success ? n.success : H.noop, n.error = "function" == typeof n.error ? n.error : H.noop, n.reconnect = !0, P(n); }, this.getSessionId = function () { return g; }, this.destroy = function (n) { !function (t) { (t = t || {}).success = "function" == typeof t.success ? t.success : H.noop; var n = !0; void 0 !== t.asyncRequest && null !== t.asyncRequest && (n = !0 === t.asyncRequest); var i = !0; void 0 !== t.notifyDestroyed && null !== t.notifyDestroyed && (i = !0 === t.notifyDestroyed); if (H.log("Destroying session " + g + " (async=" + n + ")"), !m)
    return H.warn("Is the server down? (connected=false)"), t.success(); if (null == g)
    return H.warn("No session to destroy"), t.success(), i && u.destroyed(); delete H.sessions[g]; var r = { janus: "destroy", transaction: H.randomString(12) }; null != h && (r.token = h); null != p && (r.apisecret = p); if (v) {
    r.session_id = g;
    var o = function () { for (var n in c)
        s.removeEventListener(n, c[n]); s.removeEventListener("message", e), s.removeEventListener("error", a), f && clearTimeout(f), s.close(); }, e = function (n) { var e = JSON.parse(n.data); e.session_id == r.session_id && e.transaction == r.transaction && (o(), t.success(), i && u.destroyed()); }, a = function (n) { o(), t.error("Failed to destroy the server: Is the server down?"), i && u.destroyed(); };
    return s.addEventListener("message", e), s.addEventListener("error", a), s.send(JSON.stringify(r));
} H.httpAPICall(d + "/" + g, { verb: "POST", async: n, withCredentials: l, body: r, success: function (n) { H.log("Destroyed session:"), H.debug(n), g = null, m = !1, "success" !== n.janus && H.error("Ooops: " + n.error.code + " " + n.error.reason), t.success(), i && u.destroyed(); }, error: function (n, e) { H.error(n + ":", e), g = null, m = !1, t.success(), i && u.destroyed(); } }); }(n); }, this.attach = function (n) { !function (i) { if ((i = i || {}).success = "function" == typeof i.success ? i.success : H.noop, i.error = "function" == typeof i.error ? i.error : H.noop, i.consentDialog = "function" == typeof i.consentDialog ? i.consentDialog : H.noop, i.iceState = "function" == typeof i.iceState ? i.iceState : H.noop, i.mediaState = "function" == typeof i.mediaState ? i.mediaState : H.noop, i.webrtcState = "function" == typeof i.webrtcState ? i.webrtcState : H.noop, i.slowLink = "function" == typeof i.slowLink ? i.slowLink : H.noop, i.onmessage = "function" == typeof i.onmessage ? i.onmessage : H.noop, i.onlocalstream = "function" == typeof i.onlocalstream ? i.onlocalstream : H.noop, i.onremotestream = "function" == typeof i.onremotestream ? i.onremotestream : H.noop, i.ondata = "function" == typeof i.ondata ? i.ondata : H.noop, i.ondataopen = "function" == typeof i.ondataopen ? i.ondataopen : H.noop, i.oncleanup = "function" == typeof i.oncleanup ? i.oncleanup : H.noop, i.ondetached = "function" == typeof i.ondetached ? i.ondetached : H.noop, !m)
    return H.warn("Is the server down? (connected=false)"), i.error("Is the server down? (connected=false)"); var r = i.plugin; if (null == r)
    return H.error("Invalid plugin"), i.error("Invalid plugin"); var n = i.opaqueId, o = i.token ? i.token : h, e = H.randomString(12), t = { janus: "attach", plugin: r, opaque_id: n, transaction: e }; null != o && (t.token = o); null != p && (t.apisecret = p); if (v)
    return T[e] = function (n) { if (H.debug(n), "success" !== n.janus)
        return H.error("Ooops: " + n.error.code + " " + n.error.reason), void i.error("Ooops: " + n.error.code + " " + n.error.reason); var e = n.data.id; H.log("Created handle: " + e); var t = { session: k, plugin: r, id: e, token: o, detached: !1, webrtcStuff: { started: !1, myStream: null, streamExternal: !1, remoteStream: null, mySdp: null, mediaConstraints: null, pc: null, dataChannel: null, dtmfSender: null, trickle: !0, iceDone: !1, volume: { value: null, timer: null }, bitrate: { value: null, bsnow: null, bsbefore: null, tsnow: null, tsbefore: null, timer: null } }, getId: function () { return e; }, getPlugin: function () { return r; }, getVolume: function () { return J(e, !0); }, getRemoteVolume: function () { return J(e, !0); }, getLocalVolume: function () { return J(e, !1); }, isAudioMuted: function () { return U(e, !1); }, muteAudio: function () { return G(e, !1, !0); }, unmuteAudio: function () { return G(e, !1, !1); }, isVideoMuted: function () { return U(e, !0); }, muteVideo: function () { return G(e, !0, !0); }, unmuteVideo: function () { return G(e, !0, !1); }, getBitrate: function () { return V(e); }, send: function (n) { R(e, n); }, data: function (n) { M(e, n); }, dtmf: function (n) { x(e, n); }, consentDialog: i.consentDialog, iceState: i.iceState, mediaState: i.mediaState, webrtcState: i.webrtcState, slowLink: i.slowLink, onmessage: i.onmessage, createOffer: function (n) { L(e, n); }, createAnswer: function (n) { L(e, n); }, handleRemoteJsep: function (n) { F(e, n); }, onlocalstream: i.onlocalstream, onremotestream: i.onremotestream, ondata: i.ondata, ondataopen: i.ondataopen, oncleanup: i.oncleanup, ondetached: i.ondetached, hangup: function (n) { W(e, !0 === n); }, detach: function (n) { A(e, n); } }; E[e] = t, i.success(t); }, t.session_id = g, s.send(JSON.stringify(t)); H.httpAPICall(d + "/" + g, { verb: "POST", withCredentials: l, body: t, success: function (n) { if (H.debug(n), "success" !== n.janus)
        return H.error("Ooops: " + n.error.code + " " + n.error.reason), void i.error("Ooops: " + n.error.code + " " + n.error.reason); var e = n.data.id; H.log("Created handle: " + e); var t = { session: k, plugin: r, id: e, token: o, detached: !1, webrtcStuff: { started: !1, myStream: null, streamExternal: !1, remoteStream: null, mySdp: null, mediaConstraints: null, pc: null, dataChannel: null, dtmfSender: null, trickle: !0, iceDone: !1, volume: { value: null, timer: null }, bitrate: { value: null, bsnow: null, bsbefore: null, tsnow: null, tsbefore: null, timer: null } }, getId: function () { return e; }, getPlugin: function () { return r; }, getVolume: function () { return J(e, !0); }, getRemoteVolume: function () { return J(e, !0); }, getLocalVolume: function () { return J(e, !1); }, isAudioMuted: function () { return U(e, !1); }, muteAudio: function () { return G(e, !1, !0); }, unmuteAudio: function () { return G(e, !1, !1); }, isVideoMuted: function () { return U(e, !0); }, muteVideo: function () { return G(e, !0, !0); }, unmuteVideo: function () { return G(e, !0, !1); }, getBitrate: function () { return V(e); }, send: function (n) { R(e, n); }, data: function (n) { M(e, n); }, dtmf: function (n) { x(e, n); }, consentDialog: i.consentDialog, iceState: i.iceState, mediaState: i.mediaState, webrtcState: i.webrtcState, slowLink: i.slowLink, onmessage: i.onmessage, createOffer: function (n) { L(e, n); }, createAnswer: function (n) { L(e, n); }, handleRemoteJsep: function (n) { F(e, n); }, onlocalstream: i.onlocalstream, onremotestream: i.onremotestream, ondata: i.ondata, ondataopen: i.ondataopen, oncleanup: i.oncleanup, ondetached: i.ondetached, hangup: function (n) { W(e, !0 === n); }, detach: function (n) { A(e, n); } }; E[e] = t, i.success(t); }, error: function (n, e) { H.error(n + ":", e); } }); }(n); }; } H.useDefaultDependencies = function (n) { var o = n && n.fetch || fetch, a = n && n.Promise || Promise, t = n && n.WebSocket || WebSocket; return { newWebSocket: function (n, e) { return new t(n, e); }, extension: n && n.extension || O, isArray: function (n) { return Array.isArray(n); }, webRTCAdapter: n && n.adapter || k, httpAPICall: function (n, i) { var e = { method: i.verb, headers: { Accept: "application/json, text/plain, */*" }, cache: "no-cache" }; "POST" === i.verb && (e.headers["Content-Type"] = "application/json"), void 0 !== i.withCredentials && (e.credentials = !0 === i.withCredentials ? "include" : i.withCredentials ? i.withCredentials : "omit"), void 0 !== i.body && (e.body = JSON.stringify(i.body)); var t = o(n, e).catch(function (n) { return a.reject({ message: "Probably a network error, is the server down?", error: n }); }); if (void 0 !== i.timeout) {
        var r = new a(function (n, e) { var t = setTimeout(function () { return clearTimeout(t), e({ message: "Request timed out", timeout: i.timeout }); }, i.timeout); });
        t = a.race([t, r]);
    } return t.then(function (e) { return e.ok ? typeof i.success == typeof H.noop ? e.json().then(function (n) { i.success(n); }).catch(function (n) { return a.reject({ message: "Failed to parse response body", error: n, response: e }); }) : void 0 : a.reject({ message: "API call failed", response: e }); }).catch(function (n) { typeof i.error == typeof H.noop && i.error(n.message || "<< internal error >>", n); }), t; } }; }, H.useOldDependencies = function (n) { var r = n && n.jQuery || jQuery, t = n && n.WebSocket || WebSocket; return { newWebSocket: function (n, e) { return new t(n, e); }, isArray: function (n) { return r.isArray(n); }, extension: n && n.extension || O, webRTCAdapter: n && n.adapter || k, httpAPICall: function (n, i) { var e = void 0 !== i.body ? { contentType: "application/json", data: JSON.stringify(i.body) } : {}, t = void 0 !== i.withCredentials ? { xhrFields: { withCredentials: i.withCredentials } } : {}; return r.ajax(r.extend(e, t, { url: n, type: i.verb, cache: !1, dataType: "json", async: i.async, timeout: i.timeout, success: function (n) { typeof i.success == typeof H.noop && i.success(n); }, error: function (n, e, t) { typeof i.error == typeof H.noop && i.error(e, t); } })); } }; }, H.noop = function () { }, H.init = function (n) { if ((n = n || {}).callback = "function" == typeof n.callback ? n.callback : H.noop, !0 === H.initDone)
    n.callback();
else {
    if ("undefined" != typeof console && void 0 !== console.log || (console = { log: function () { } }), H.trace = H.noop, H.debug = H.noop, H.vdebug = H.noop, H.log = H.noop, H.warn = H.noop, H.error = H.noop, !0 === n.debug || "all" === n.debug)
        H.trace = console.trace.bind(console), H.debug = console.debug.bind(console), H.vdebug = console.debug.bind(console), H.log = console.log.bind(console), H.warn = console.warn.bind(console), H.error = console.error.bind(console);
    else if (Array.isArray(n.debug))
        for (var e in n.debug) {
            var t = n.debug[e];
            switch (t) {
                case "trace":
                    H.trace = console.trace.bind(console);
                    break;
                case "debug":
                    H.debug = console.debug.bind(console);
                    break;
                case "vdebug":
                    H.vdebug = console.debug.bind(console);
                    break;
                case "log":
                    H.log = console.log.bind(console);
                    break;
                case "warn":
                    H.warn = console.warn.bind(console);
                    break;
                case "error":
                    H.error = console.error.bind(console);
                    break;
                default: console.error("Unknown debugging option '" + t + "' (supported: 'trace', 'debug', 'vdebug', 'log', warn', 'error')");
            }
        }
    H.log("Initializing library");
    var i = n.dependencies || H.useDefaultDependencies();
    H.isArray = i.isArray, H.webRTCAdapter = i.webRTCAdapter, H.httpAPICall = i.httpAPICall, H.newWebSocket = i.newWebSocket, (H.extension = i.extension).init(), H.listDevices = function (o, n) { o = "function" == typeof o ? o : H.noop, null == n && (n = { audio: !0, video: !0 }), navigator.mediaDevices ? navigator.mediaDevices.getUserMedia(n).then(function (r) { navigator.mediaDevices.enumerateDevices().then(function (n) { H.debug(n), o(n); try {
        var e = r.getTracks();
        for (var t in e) {
            var i = e[t];
            null != i && i.stop();
        }
    }
    catch (n) { } }); }).catch(function (n) { H.error(n), o([]); }) : (H.warn("navigator.mediaDevices unavailable"), o([])); }, H.attachMediaStream = function (n, e) { "chrome" === H.webRTCAdapter.browserDetails.browser ? 43 <= H.webRTCAdapter.browserDetails.version ? n.srcObject = e : void 0 !== n.src ? n.src = URL.createObjectURL(e) : H.error("Error attaching stream to element") : n.srcObject = e; }, H.reattachMediaStream = function (n, e) { "chrome" === H.webRTCAdapter.browserDetails.browser ? 43 <= H.webRTCAdapter.browserDetails.version ? n.srcObject = e.srcObject : void 0 !== n.src ? n.src = e.src : H.error("Error reattaching stream to element") : n.srcObject = e.srcObject; };
    var r = window.onbeforeunload;
    window.onbeforeunload = function () { for (var n in H.log("Closing window"), H.sessions)
        null !== H.sessions[n] && void 0 !== H.sessions[n] && H.sessions[n].destroyOnUnload && (H.log("Destroying session " + n), H.sessions[n].destroy({ asyncRequest: !1, notifyDestroyed: !1 })); r && "function" == typeof r && r(); }, H.initDone = !0, n.callback();
} }, H.isWebrtcSupported = function () { return void 0 !== window.RTCPeerConnection && null !== window.RTCPeerConnection && void 0 !== navigator.getUserMedia && null !== navigator.getUserMedia; }, H.randomString = function (n) { for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = "", i = 0; i < n; i++) {
    var r = Math.floor(Math.random() * e.length);
    t += e.substring(r, r + 1);
} return t; }, window.getStats = function (n, i, r) { var e = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; "undefined" == typeof MediaStreamTrack && (MediaStreamTrack = {}); var o = { encryption: "sha-256", audio: { send: { tracks: [], codecs: [], availableBandwidth: 0, streams: 0 }, recv: { tracks: [], codecs: [], availableBandwidth: 0, streams: 0 }, bytesSent: 0, bytesReceived: 0 }, video: { send: { tracks: [], codecs: [], availableBandwidth: 0, streams: 0 }, recv: { tracks: [], codecs: [], availableBandwidth: 0, streams: 0 }, bytesSent: 0, bytesReceived: 0 }, bandwidth: { systemBandwidth: 0, sentPerSecond: 0, encodedPerSecond: 0, helper: { audioBytesSent: 0, videoBytesSent: 0 }, speed: 0 }, results: {}, connectionType: { systemNetworkType: ((navigator.connection || {}).type || "unknown").toString().toLowerCase(), systemIpAddress: "192.168.1.2", local: { candidateType: [], transport: [], ipAddress: [], networkType: [] }, remote: { candidateType: [], transport: [], ipAddress: [], networkType: [] } }, resolutions: { send: { width: 0, height: 0 }, recv: { width: 0, height: 0 } }, internal: { audio: { send: {}, recv: {} }, video: { send: {}, recv: {} }, candidates: {} }, nomore: function () { s = !0; } }, a = { checkIfOfferer: function (n) { "googLibjingleSession" === n.type && (o.isOfferer = n.googInitiator); } }, u = this; n instanceof e && (u = n); var s = !1; a.datachannel = function (n) { "datachannel" === n.type && (o.datachannel = { state: n.state }); }, a.googCertificate = function (n) { "googCertificate" == n.type && (o.encryption = n.googFingerprintAlgorithm); }, a.checkAudioTracks = function (n) { if ("audio" === n.mediaType) {
    var e = n.id.split("_").pop();
    if (o.audio[e] && -1 === o.audio[e].codecs.indexOf(n.googCodecName) && o.audio[e].codecs.push(n.googCodecName), n.bytesSent) {
        e = "send";
        var t = 0;
        n.bytesSent && (o.internal.audio[e].prevBytesSent || (o.internal.audio[e].prevBytesSent = n.bytesSent), t = n.bytesSent - o.internal.audio[e].prevBytesSent, o.internal.audio[e].prevBytesSent = n.bytesSent), o.audio[e].availableBandwidth = t;
    }
    if (n.bytesReceived) {
        e = "recv";
        t = 0;
        n.bytesReceived && (o.internal.audio[e].prevBytesReceived || (o.internal.audio[e].prevBytesReceived = n.bytesReceived), t = n.bytesReceived - o.internal.audio[e].prevBytesReceived, o.internal.audio[e].prevBytesReceived = n.bytesReceived), o.audio[e].availableBandwidth = t;
    }
    -1 === o.audio[e].tracks.indexOf(n.googTrackId) && o.audio[e].tracks.push(n.googTrackId);
} }, a.checkVideoTracks = function (n) { if ("video" === n.mediaType) {
    var e = n.id.split("_").pop();
    o.video[e] && -1 === o.video[e].codecs.indexOf(n.googCodecName) && o.video[e].codecs.push(n.googCodecName);
    var t, i, r = 0;
    if (n.bytesSent && (e = "send", (!o.internal.video[e].prevBytesSent || o.internal.video[e].prevBytesSent > n.bytesSent) && (o.internal.video[e].prevBytesSent = n.bytesSent), r = n.bytesSent - o.internal.video[e].prevBytesSent, o.internal.video[e].prevBytesSent = n.bytesSent), n.bytesReceived && (e = "recv", (!o.internal.video[e].prevBytesReceived || o.internal.video[e].prevBytesReceived > n.bytesReceived) && (o.internal.video[e].prevBytesReceived = n.bytesReceived), r = n.bytesReceived - o.internal.video[e].prevBytesReceived, o.internal.video[e].prevBytesReceived = n.bytesReceived), o.video[e].availableBandwidth = r, n.packetsLost)
        n.packetsSent && (e = "send", o.internal.video[e].prevTransPacket || (o.internal.video[e].prevTransPacket = n.packetsSent), i = n.packetsSent - o.internal.video[e].prevTransPacket, o.internal.video[e].prevTransPacket = n.packetsSent), n.packetsReceived && (e = "recv", o.internal.video[e].prevTransPacket || (o.internal.video[e].prevTransPacket = n.packetsReceived), i = n.packetsReceived - o.internal.video[e].prevTransPacket, o.internal.video[e].prevTransPacket = n.packetsReceived), o.internal.video[e].prevLostPacket || (o.internal.video[e].prevLostPacket = n.packetsLost), t = n.packetsLost - o.internal.video[e].prevLostPacket, o.internal.video[e].prevLostPacket = n.packetsLost, o.video[e].packetsLost = t, o.video[e].packetsTransferred = i, o.video[e].packetsLostRate = 0 !== i ? .01 * Math.round(t / (i + t) * 1e4) : 100;
    n.googFrameHeightReceived && n.googFrameWidthReceived && (o.resolutions[e].width = n.googFrameWidthReceived, o.resolutions[e].height = n.googFrameHeightReceived), n.googFrameHeightSent && n.googFrameWidthSent && (o.resolutions[e].width = n.googFrameWidthSent, o.resolutions[e].height = n.googFrameHeightSent), -1 === o.video[e].tracks.indexOf(n.googTrackId) && o.video[e].tracks.push(n.googTrackId);
} }, a.bweforvideo = function (n) { "VideoBwe" === n.type && (o.bandwidth.availableSendBandwidth = n.googAvailableSendBandwidth, o.bandwidth.googActualEncBitrate = n.googActualEncBitrate, o.bandwidth.googAvailableSendBandwidth = n.googAvailableSendBandwidth, o.bandwidth.googAvailableReceiveBandwidth = n.googAvailableReceiveBandwidth, o.bandwidth.googRetransmitBitrate = n.googRetransmitBitrate, o.bandwidth.googTargetEncBitrate = n.googTargetEncBitrate, o.bandwidth.googBucketDelay = n.googBucketDelay, o.bandwidth.googTransmitBitrate = n.googTransmitBitrate); }, a.candidatePair = function (t) { if ("googCandidatePair" === t.type || "candidate-pair" === t.type) {
    if ("true" == t.googActiveConnection)
        Object.keys(o.internal.candidates).forEach(function (n) { var e = o.internal.candidates[n]; -1 !== e.ipAddress.indexOf(t.googLocalAddress) && (o.connectionType.local.candidateType = e.candidateType, o.connectionType.local.ipAddress = e.ipAddress, o.connectionType.local.networkType = e.networkType, o.connectionType.local.transport = e.transport), -1 !== e.ipAddress.indexOf(t.googRemoteAddress) && (o.connectionType.remote.candidateType = e.candidateType, o.connectionType.remote.ipAddress = e.ipAddress, o.connectionType.remote.networkType = e.networkType, o.connectionType.remote.transport = e.transport); }), o.connectionType.transport = t.googTransportType, (n = o.internal.candidates[t.localCandidateId]) && n.ipAddress && (o.connectionType.systemIpAddress = n.ipAddress), (e = o.internal.candidates[t.remoteCandidateId]) && e.ipAddress && (o.connectionType.systemIpAddress = e.ipAddress);
    if ("candidate-pair" === t.type && !0 === t.selected && !0 === t.nominated && "succeeded" === t.state)
        var n = o.internal.candidates[t.remoteCandidateId], e = o.internal.candidates[t.remoteCandidateId];
} }; var t = {}, c = {}, f = {}, d = {}; a.localcandidate = function (n) { "localcandidate" !== n.type && "local-candidate" !== n.type || n.id && (t[n.id] || (t[n.id] = []), c[n.id] || (c[n.id] = []), f[n.id] || (f[n.id] = []), d[n.id] || (d[n.id] = []), n.candidateType && -1 === t[n.id].indexOf(n.candidateType) && t[n.id].push(n.candidateType), n.transport && -1 === c[n.id].indexOf(n.transport) && c[n.id].push(n.transport), n.ipAddress && -1 === f[n.id].indexOf(n.ipAddress + ":" + n.portNumber) && f[n.id].push(n.ipAddress + ":" + n.portNumber), n.networkType && -1 === d[n.id].indexOf(n.networkType) && d[n.id].push(n.networkType), o.internal.candidates[n.id] = { candidateType: t[n.id], ipAddress: f[n.id], portNumber: n.portNumber, networkType: d[n.id], priority: n.priority, transport: c[n.id], timestamp: n.timestamp, id: n.id, type: n.type }, o.connectionType.local.candidateType = t[n.id], o.connectionType.local.ipAddress = f[n.id], o.connectionType.local.networkType = d[n.id], o.connectionType.local.transport = c[n.id]); }; var l = {}, v = {}, h = {}, p = {}; a.remotecandidate = function (n) { "remotecandidate" !== n.type && "remote-candidate" !== n.type || n.id && (l[n.id] || (l[n.id] = []), v[n.id] || (v[n.id] = []), h[n.id] || (h[n.id] = []), p[n.id] || (p[n.id] = []), n.candidateType && -1 === l[n.id].indexOf(n.candidateType) && l[n.id].push(n.candidateType), n.transport && -1 === v[n.id].indexOf(n.transport) && v[n.id].push(n.transport), n.ipAddress && -1 === h[n.id].indexOf(n.ipAddress + ":" + n.portNumber) && h[n.id].push(n.ipAddress + ":" + n.portNumber), n.networkType && -1 === p[n.id].indexOf(n.networkType) && p[n.id].push(n.networkType), o.internal.candidates[n.id] = { candidateType: l[n.id], ipAddress: h[n.id], portNumber: n.portNumber, networkType: p[n.id], priority: n.priority, transport: v[n.id], timestamp: n.timestamp, id: n.id, type: n.type }, o.connectionType.remote.candidateType = l[n.id], o.connectionType.remote.ipAddress = h[n.id], o.connectionType.remote.networkType = p[n.id], o.connectionType.remote.transport = v[n.id]); }, a.dataSentReceived = function (n) { "video" !== n.mediaType && "audio" !== n.mediaType || (n.bytesSent && (o[n.mediaType].bytesSent = parseInt(n.bytesSent)), n.bytesReceived && (o[n.mediaType].bytesReceived = parseInt(n.bytesReceived))); }; var m = { audio: { send: [], recv: [] }, video: { send: [], recv: [] } }; a.ssrc = function (n) { if (n.googCodecName && ("video" === n.mediaType || "audio" === n.mediaType) && "ssrc" === n.type) {
    var e = n.id.split("_").pop();
    -1 === m[n.mediaType][e].indexOf(n.ssrc) && m[n.mediaType][e].push(n.ssrc), o[n.mediaType][e].streams = m[n.mediaType][e].length;
} }, function e() { var t; t = function (n) { if (n && "function" == typeof n.forEach) {
    n.forEach(function (e) { Object.keys(a).forEach(function (n) { "function" == typeof a[n] && a[n](e); }), "local-candidate" !== e.type && "remote-candidate" !== e.type && e.type; });
    try {
        -1 !== u.iceConnectionState.search(/failed/gi) && (s = !0);
    }
    catch (n) {
        s = !0;
    }
    !0 === s && (o.datachannel && (o.datachannel.state = "close"), o.ended = !0), o.results = n, o.audio && o.video && (o.bandwidth.speed = o.audio.bytesSent - o.bandwidth.helper.audioBytesSent + (o.video.bytesSent - o.bandwidth.helper.videoBytesSent), o.bandwidth.helper.audioBytesSent = o.audio.bytesSent, o.bandwidth.helper.videoBytesSent = o.video.bytesSent), i(o), s || void 0 !== typeof r && r && setTimeout(e, r || 1e3);
}
else
    !s && void 0 !== typeof r && r && setTimeout(e, r || 1e3); }, void 0 !== window.InstallTrigger ? u.getStats(null).then(function (n) { var e = []; n.forEach(function (n) { e.push(n); }), t(e); }).catch(t) : u.getStats(function (n) { var i = []; n.result().forEach(function (e) { var t = {}; e.names().forEach(function (n) { t[n] = e.stat(n); }), t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, i.push(t); }), t(i); }); }(); }; var j = function (t) { function n(n) { var e = t.call(this) || this; return e.r = null, e.U = null, e.G = { speed: 0, packetsLost: 0, packetsTransferred: 0, packetsLostRate: 0, bytesTransferred: 0 }, e.V = { speed: 0, packetsLost: 0, packetsTransferred: 0, packetsLostRate: 0, bytesTransferred: 0 }, e.q = !1, n && e.setPC(n), e; } return a(n, t), n.prototype.setPC = function (n) { var e = this; this.r !== n && (window.getStats(n, function (n) { return e.W(n); }, 1e3), this.r = n), this.q = !1; }, n.prototype.getStats = function () { return { send: this.G, recv: this.V }; }, n.prototype.destroy = function () { this.q = !0, this.U && this.U.nomore(); }, n.prototype.W = function (n) { if (this.U && this.U !== n && this.U.nomore(), this.q)
    n.nomore();
else {
    this.U = n;
    var e = this.G;
    e.speed = Math.round(10 * (parseFloat(String(n.video.send.availableBandwidth)) + parseFloat(String(n.audio.send.availableBandwidth)))) / 10, e.packetsLost = parseInt(String(n.video.send.packetsLost)) || 0, e.packetsTransferred = parseInt(String(n.video.send.packetsTransferred)) || 0, e.packetsLostRate = parseInt(String(n.video.send.packetsLostRate)) || 0, e.bytesTransferred = parseInt(String(n.audio.bytesSent)) + parseInt(String(n.video.bytesSent));
    var t = this.V;
    t.speed = Math.round(10 * (parseFloat(String(n.video.recv.availableBandwidth)) + parseFloat(String(n.audio.recv.availableBandwidth)))) / 10, t.packetsLost = parseInt(String(n.video.recv.packetsLost)) || 0, t.packetsTransferred = parseInt(String(n.video.recv.packetsTransferred)) || 0, t.packetsLostRate = parseInt(String(n.video.recv.packetsLostRate)) || 0, t.bytesTransferred = parseInt(String(n.audio.bytesReceived)) + parseInt(String(n.video.bytesReceived)), this.emit("stats", { send: e, recv: t });
} }, n; }(I), C = function (e) { function n() { var n = null !== e && e.apply(this, arguments) || this; return n.B = null, n._ = new j, n.z = "unknown", n.K = null, n; } return a(n, e), n.prototype.init = function (n) { var t = this; n.attach({ plugin: "janus.plugin.videoroom", success: function (n) { t.B = n, t.emit("init"); }, error: function (n) { t.K = n, t.emit("error", n); }, consentDialog: function (n) { t.emit("consentDialog", n); }, onmessage: function (n, e) { t.emit("message", n, e); }, onlocalstream: function (n) { t.emit("localStream", n), t.z = "send", t._.setPC(t.B.webrtcStuff.pc); }, onremotestream: function (n) { t.emit("remoteStream", n), t.z = "recv", t._.setPC(t.B.webrtcStuff.pc); }, ondataopen: function () { t.emit("dataOpen"); }, ondata: function (n) { t.emit("dataReceive", n); }, webrtcState: function (n) { t.emit("webrtcState", n); }, iceState: function (n) { t.emit("iceState", n); }, mediaState: function (n) { t.emit("mediaState", n); }, slowLink: function (n) { t.emit("slowLink", n); }, oncleanup: function () { t.emit("cleanup"); }, detached: function () { t.emit("detached"); } }), this._.on("stats", function (n) { t.emit("stats-update", "send" === t.z ? n.send : n.recv); }); }, n.prototype.doWhenInited = function () { var t = this; return new Promise(function (n, e) { t.B ? n() : t.K ? e(t.K) : (t.once("init", function () { return n(); }), t.once("error", function (n) { return e(n); })); }); }, n.prototype.send = function (n) { var e = this; this.doWhenInited().then(function () { return e.B.send(n); }); }, n.prototype.createOffer = function (n) { var i = this; return this.doWhenInited().then(function () { return new Promise(function (e, t) { i.B.createOffer({ media: { audioRecv: !1, videoRecv: !1, audioSend: !0, videoSend: !0 }, stream: n, success: function (n) { e(n); }, error: function (n) { var e = new Error; e.name = n, t(e); } }); }); }); }, n.prototype.createAnswer = function (n, i) { var r = this; return this.doWhenInited().then(function () { return new Promise(function (e, t) { r.B.createAnswer({ media: n, success: function (n) { e(n); }, error: function (n) { t(n); }, jsep: i }); }); }); }, n.prototype.handleRemoteJsep = function (n) { var e = this; this.doWhenInited().then(function () { return e.B.handleRemoteJsep({ jsep: n }); }); }, n.prototype.hangup = function () { this.B && (this.B.hangup(), this._.destroy()); }, n.prototype.isAudioMuted = function () { return !!this.B && this.B.isAudioMuted(); }, n.prototype.isVideoMuted = function () { return !!this.B && this.B.isVideoMuted(); }, n.prototype.muteAudio = function () { var n = this; this.doWhenInited().then(function () { return n.B.muteAudio(); }); }, n.prototype.unmuteAudio = function () { var n = this; this.doWhenInited().then(function () { return n.B.unmuteAudio(); }); }, n.prototype.muteVideo = function () { var n = this; this.doWhenInited().then(function () { return n.B.muteVideo(); }); }, n.prototype.unmuteVideo = function () { var n = this; this.doWhenInited().then(function () { return n.B.unmuteVideo(); }); }, n.prototype.getStats = function () { var n = this._.getStats(); return "send" === this.z ? n.send : n.recv; }, n.prototype.detach = function () { this.B && this.B.detach(), this._.destroy(); }, n; }(I), P = "error", R = function (t) { function n(n) { var e = t.call(this) || this; return e.H = n, e.Y = null, e.Q = "disconnected", e.X = null, e.$ = null, e.Z = [], e.nn = [], e.en = null, e; } return a(n, t), n.prototype.init = function () { var i = this; return this.tn("connecting"), new Promise(function (n) { H.init({ debug: i.H.get("debug"), callback: function () { n(); } }); }).then(function () { return new Promise(function (n, t) { i.Y = new H({ server: "wss://ymrtc-dev2.youme.im/janus/", success: function () { n(); }, error: function (n) { i.Y = null, i.en = null; var e = new Error; e.name = n, i.tn(P), t(e); }, destroyed: function () { i.Y = null, i.en = null, i.tn("ended"); } }); }); }).then(function () { return new Promise(function (e, t) { i.Y.attach({ plugin: "janus.plugin.videoroom", success: function (n) { i.en = n, i.emit("init"), i.tn("connected"), e(); }, error: function (n) { i.Y && i.Y.destroy(), i.en = null; var e = new Error; e.name = n, i.tn(P), t(e); }, consentDialog: function (n) { i.emit("consentDialog", n); }, onmessage: function (n, e) { i.emit("message", n, e); }, onlocalstream: function (n) { i.emit("localStream", n); }, onremotestream: function (n) { i.emit("remoteStream", n); }, ondataopen: function () { i.emit("dataOpen"); }, ondata: function (n) { i.emit("dataReceive", n); }, webrtcState: function (n) { i.emit("webrtcState", n); }, iceState: function (n) { i.emit("iceState", n); }, mediaState: function (n) { i.emit("mediaState", n); }, slowLink: function (n) { i.emit("slowLink", n); }, oncleanup: function () { i.emit("cleanup"); }, detached: function () { i.emit("detached"); } }); }); }); }, n.prototype.destroy = function () { this.en && this.en.detach(), this.Y && this.Y.destroy(), this.emit("destroy"); }, n.prototype.doWhenInited = function () { var e = this; return new Promise(function (n) { e.Y && e.en ? n() : e.once("init", function () { return n(); }); }); }, n.prototype.createSubHandle = function () { var n = this, e = new C; return this.doWhenInited().then(function () { e.init(n.Y); }), e; }, n.prototype.getServer = function () { return this.Y ? this.Y.getServer() : ""; }, n.prototype.isConnected = function () { return !!this.Y && this.Y.isConnected(); }, n.prototype.getSessionId = function () { return this.Y ? this.Y.getSessionId() : ""; }, n.prototype.isAudioMuted = function () { return !!this.en && this.en.isAudioMuted(); }, n.prototype.isVideoMuted = function () { return !!this.en && this.en.isVideoMuted(); }, n.prototype.muteAudio = function () { var n = this; this.doWhenInited().then(function () { return n.en.muteAudio(); }); }, n.prototype.unmuteAudio = function () { var n = this; this.doWhenInited().then(function () { return n.en.unmuteAudio(); }); }, n.prototype.muteVideo = function () { var n = this; this.doWhenInited().then(function () { return n.en.muteVideo(); }); }, n.prototype.unmuteVideo = function () { var n = this; this.doWhenInited().then(function () { return n.en.unmuteVideo(); }); }, n.prototype.send = function (n) { var e = this; this.doWhenInited().then(function () { return e.en.send(n); }); }, n.prototype.createOffer = function (n) { var i = this; void 0 === n && (n = {}); var e = { media: {} }; return n.stream ? e.stream = n.stream : e.media = Object.assign({}, n, { audioRecv: !1, videoRecv: !1, audioSend: !0, videoSend: this.H.get("video") || !!n.video }), this.doWhenInited().then(function () { return new Promise(function (n, t) { i.en.createOffer(Object.assign({}, { success: function (e) { i.X = e, i.Z.forEach(function (n) { n(e); }), n(e); }, error: function (n) { if ("string" == typeof n) {
        var e = new Error(n);
        e.name = "OfferError", t(e);
    }
    else
        t(n); } }, e)); }); }); }, n.prototype.handleRemoteJsep = function (e) { var n = this; this.doWhenInited().then(function () { return n.en.handleRemoteJsep(e); }), this.$ = e.jsep, this.nn.forEach(function (n) { n(e.jsep); }); }, n.prototype.hangup = function () { this.en && this.en.hangup(); }, n.prototype.requestLocalJsep = function () { var e = this; return this.X ? Promise.resolve(this.X) : new Promise(function (n) { e.Z.push(n); }); }, n.prototype.requestRemoteJsep = function () { var e = this; return this.$ ? Promise.resolve(this.$) : new Promise(function (n) { e.nn.push(n); }); }, n.prototype.tn = function (n) { this.Q !== n && (this.Q = n, this.emit("status:" + n, n)); }, n.isWebRTCSupported = function () { return H.isWebrtcSupported(); }, n; }(I), D = function (t) { function n(n) { var e = t.call(this) || this; return e.H = n, e.in = !1, e.rn = "", e.an = "", e.un = "", e; } return a(n, t), n.prototype.login = function (n, e, t) { if (this.in) {
    if (e === this.an)
        return Promise.resolve();
    this.logout();
} return this.H.set("appKey", n), this.H.set("userId", e), this.H.set("token", t), this.rn = n, this.an = e, this.un = t, this.emit("logging"), this.in = !0, this.emit("login"), Promise.resolve(); }, n.prototype.logout = function () { this.in = !1, this.an = "", this.emit("logout"); }, n.prototype.isLogin = function () { return this.in; }, n.prototype.doIfLogged = function () { var t = this; return new Promise(function (n, e) { t.in ? n() : t.once("login", function () { return n(); }); }); }, n.prototype.getMyUserId = function () { return this.an; }, n.prototype.reconnect = function () { return this.in = !1, this.login(this.rn, this.an, this.un); }, n; }(I), M = "stop", x = "recording", A = function (i) { function r(n, e) { var t = i.call(this) || this; return t.H = n, t.sn = e, t.Q = M, t.cn = !1, t.fn = !1, t.dn = null, t.ln = [], t.vn = [], t.sn.on("localStream", function (e) { e !== t.dn && (t.dn = e, t.ln.forEach(function (n) { n(e); }), t.ln = [], t.vn = [], t.emit("has-stream", t.dn)); }), t.sn.on("message", function (n, e) { null != e && t.sn.handleRemoteJsep({ jsep: e }); }), t; } return a(r, i), r.prototype.start = function (n) { var e = this; return this.dn ? (this.tn(x), Promise.resolve(this.dn)) : (this.tn("starting"), this.hn(n).then(function (n) { return e.tn(x), n; })); }, r.prototype.stop = function () { this.dn && (this.emit("remove-stream", this.dn), this.sn.send({ message: { request: "unpublish" } }), this.sn.hangup(), this.dn = null, this.tn(M)); }, r.prototype.pause = function () { this.pn(!1), this.cn = !0, this.fn = !0, this.H.set("pauseVideo", !0), this.H.set("pauseAudio", !0), this.emit("pause-video"), this.emit("pause-audio"); }, r.prototype.pauseVideo = function () { this.mn(!1), this.cn = !0, this.H.set("pauseVideo", !0), this.emit("pause-video"); }, r.prototype.pauseAudio = function () { this.gn(!1), this.fn = !0, this.H.set("pauseAudio", !0), this.emit("pause-audio"); }, r.prototype.resume = function () { this.pn(!0), this.cn = !1, this.fn = !1, this.H.set("pauseVideo", !1), this.H.set("pauseAudio", !1), this.emit("resume-video"), this.emit("resume-audio"); }, r.prototype.resumeVideo = function () { this.mn(!0), this.cn = !1, this.H.set("pauseVideo", !1), this.emit("resume-video"); }, r.prototype.resumeAudio = function () { this.gn(!0), this.fn = !1, this.H.set("pauseAudio", !1), this.emit("resume-audio"); }, r.prototype.isVideoPaused = function () { return this.cn; }, r.prototype.isAudioPaused = function () { return this.fn; }, r.prototype.getStatus = function () { return this.Q; }, r.prototype.requestStream = function () { var t = this; return this.dn ? Promise.resolve(this.dn) : new Promise(function (n, e) { t.ln.push(n), t.vn.push(e); }); }, r.prototype.getScreenSources = function (n) { return r.wn() ? new Promise(function (t, i) { window.require("electron").desktopCapturer.getSources({ types: n || ["screen", "window"] }, function (n, e) { n && i(n), t(e); }); }) : Promise.resolve([]); }, r.prototype.hn = function (t) { var n = this; if (t && t.stream) {
    this.dn = t.stream;
    for (var e = 0, i = this.ln; e < i.length; e++) {
        (0, i[e])(this.dn);
    }
    return this.ln = [], this.vn = [], this.emit("has-stream", this.dn), Promise.resolve(this.dn);
} return t && t.video && r.yn() && ("stdres-16:9" === t.video || "lowres-16:9" === t.video || "lowres" === t.video) && (t.video = "stdres"), t && t.video && ("screen" === t.video || "window" === t.video) && r.wn() ? new Promise(function (e) { t.electronScreenSourceId ? e(t.electronScreenSourceId) : n.getScreenSources([t.video]).then(function (n) { e(n ? n[0].id : ""); }); }).then(function (n) { return navigator.mediaDevices.getUserMedia({ audio: "screen" === t.audio && { mandatory: { chromeMediaSource: "desktop" } }, video: { mandatory: { chromeMediaSource: "desktop", chromeMediaSourceId: n, maxWidth: t.electronScreenShareMaxWidth || 1280, maxHeight: t.electronScreenShareMaxHeight || 720, maxFrameRate: t.electronScreenShareMaxFrameRate || 6 } } }); }).then(function (e) { return t.audio && "screen" !== t.audio ? navigator.mediaDevices.getUserMedia({ audio: !0, video: !1 }).then(function (n) { return e.addTrack(n.getAudioTracks()[0]), e; }) : e; }).then(function (e) { return n.dn = e, n.ln.forEach(function (n) { n(e); }), n.ln = [], n.vn = [], n.emit("has-stream", n.dn), e; }).catch(function (e) { throw n.vn.forEach(function (n) { n(e); }), e; }) : this.sn.createOffer(t).then(function () { return n.dn ? n.dn : n.requestStream(); }).catch(function (e) { throw n.vn.forEach(function (n) { n(e); }), e; }); }, r.prototype.pn = function (n) { n ? (this.sn.unmuteAudio(), this.sn.unmuteVideo()) : (this.sn.muteAudio(), this.sn.muteVideo()); }, r.prototype.mn = function (n) { n ? this.sn.unmuteVideo() : this.sn.muteVideo(); }, r.prototype.gn = function (n) { n ? this.sn.unmuteAudio() : this.sn.muteAudio(); }, r.prototype.tn = function (n) { this.Q = n, this.emit("status:" + n, n); }, r.wn = function () { return !!(window.process && window.process.versions && window.process.versions.electron); }, r.yn = function () { return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform); }, r; }(I), N = function (u) { function n(t, n, e, i, r, o) { var a = u.call(this) || this; return a.H = o, a.bn = !1, a.Sn = "new", a.dn = null, a.Q = "new", a.an = n, a.kn = e, a.tn("negotiating"), a.In = r.createSubHandle(), a.In.send({ message: { request: "join", room: t, ptype: "subscriber", feed: n, private_id: i, appkey: a.H.get("appKey") } }), a.In.on("message", function (n, e) { null != e && a.In.createAnswer({ audioRecv: !0, videoRecv: !0, audioSend: !1, videoSend: !1 }, e).then(function (n) { a.In.send({ message: { request: "start", room: t }, jsep: n }), a.tn("negotiated"); }); }), a.In.on("remoteStream", function (n) { a.bn && a.In.muteAudio(), a.dn = n, a.emit("update-stream", n); }), a.In.on("iceState", function (n) { a.Sn = n, a.emit("ice-status:" + n, n); }), a.In.on("stats-update", function (n) { a.emit("media-stats-update", n); }), a; } return a(n, u), n.prototype.getId = function () { return this.an; }, n.prototype.getName = function () { return this.kn; }, n.prototype.getIceConnectionState = function () { return this.Sn; }, n.prototype.requestStream = function () { var t = this; return this.dn ? Promise.resolve(this.dn) : new Promise(function (e, n) { t.once("update-stream", function (n) { return e(n); }); }); }, n.prototype.getMute = function () { return this.bn; }, n.prototype.setMute = function (n) { this.bn = n, this.dn && (n ? this.In.muteAudio() : this.In.unmuteAudio()); }, n.prototype.getMediaStats = function () { return this.In.getStats(); }, n.prototype.destroy = function () { this.In.detach(), this.emit("destroy"); }, n.prototype.tn = function (n) { this.Q !== n && (this.Q = n, this.emit("signaling-status:" + n, n)); }, n; }(I), J = function (o) { function n(n, e, t, i, r) { var u = o.call(this) || this; return u.Tn = n, u.H = e, u.En = t, u.On = i, u.sn = r, u.jn = 0, u.Cn = "", u.Q = "out", u.Pn = !1, u.Rn = {}, u.In = u.sn.createSubHandle(), u.joinIn(), u.In.on("message", function (n, e) { var t = !1, i = n.videoroom; if (null != e && u.In.handleRemoteJsep(e), i) {
    if ("joined" === i)
        u.Cn = n.private_id, u.H.set("myId", n.id), u.tn("in"), u.emit("joined"), (r = n.publishers) && r.forEach(function (n) { var e = n.id, t = n.display || "" + e, i = new N(u.jn, e, t, u.Cn, u.sn, u.H); u.Rn[e] = i, u.On.registerUser(i), u.emit("member-join", e); }), t = !0;
    if ("event" === i) {
        var r;
        (r = n.publishers) && r.forEach(function (n) { var e = n.id; if (!u.Rn[e]) {
            var t = n.display || "" + e, i = new N(u.jn, e, t, u.Cn, u.sn, u.H);
            u.Rn[e] = i, u.On.registerUser(i), u.emit("member-join", e);
        } });
        var o = n.leaving;
        "ok" === o && (u.getMemberIdList().length ? (u.In.detach(), u.In.off("message")) : u.In.send({ message: { request: "destroy", room: u.jn, appkey: u.H.get("appKey") }, success: function () { u.In.detach(), u.In.off("message"); } }), u.clear(), t = !0, u.tn("out")), o && u.Rn[o] && (u.emit("member-leave", o), u.Rn[o].destroy(), delete u.Rn[o], t = !0);
        var a = n.unpublished;
        a && u.Rn[a] && (u.emit("member-leave", a), u.Rn[a].destroy(), delete u.Rn[a], t = !0);
    }
    t && u.emit("update", u.getMemberNameList());
} }), u.In.on("stats-update", function (n) { u.emit("media-stats-update", n); }), u; } return a(n, o), n.prototype.getName = function () { return this.Tn; }, n.prototype.joinIn = function () { var u = this; this.In.send({ message: { request: "list", appkey: this.H.get("appKey") }, success: function (n) { for (var e = !1, t = /[1-9][0-9]{0,19}/.test(u.Tn) && parseInt(u.Tn) < 0x10000000000000000, i = 0, r = n.list; i < r.length; i++) {
        var o = r[i];
        u.Tn === o.description && (e = !0, u.jn = o.room);
    } if (e)
        u.In.send({ message: { request: "join", room: u.jn, ptype: "publisher", display: u.H.get("userId"), appkey: u.H.get("appKey"), apptoken: u.H.get("token") }, error: function (n) { (new Error).name = n, u.emit("join-error", n); } });
    else {
        var a = t ? parseInt(u.Tn) : void 0;
        u.In.send({ message: { request: "create", room: a, description: u.Tn, publishers: 20, is_private: !1, videocodec: "h264", fir_freq: 2, appkey: u.H.get("appKey"), apptoken: u.H.get("token"), display: u.H.get("userId"), admin_key: "supersecret" }, success: function (n) { var e = n.room ? n.room : a; u.jn = e, u.In.send({ message: { request: "join", room: e, ptype: "publisher", display: u.H.get("userId"), appkey: u.H.get("appKey"), apptoken: u.H.get("token") } }); }, error: function (n) { (new Error).name = n, u.emit("join-error", n); } });
    } }, error: function (n) { (new Error).name = n, u.emit("join-error", n); } }), this.tn("joining"); }, n.prototype.publish = function () { var e = this; this.Pn || (this.Pn = !0, new Promise(function (n) { "in" === e.Q ? n() : e.once("status:in", function () { return n(); }); }).then(function () { return e.Pn ? e.En.requestStream() : Promise.resolve(null); }).then(function (n) { return n ? e.In.createOffer(n) : null; }).then(function (n) { n && e.In.send({ message: { request: "configure", video: !0, audio: !0, appkey: e.H.get("appKey") }, jsep: n }); })); }, n.prototype.unpublish = function () { this.Pn = !1, this.In.send({ message: { request: "unpublish", appkey: this.H.get("appKey") } }), this.In.hangup(); }, n.prototype.leave = function () { this.In.send({ message: { request: "leave", appkey: this.H.get("appKey") } }); }, n.prototype.clear = function () { var e = this; this.getMemberIdList().forEach(function (n) { e.Rn[n].destroy(), delete e.Rn[n]; }); }, n.prototype.getMembers = function () { return this.Rn; }, n.prototype.getMemberIdList = function () { return Object.keys(this.Rn); }, n.prototype.getMemberNameList = function () { var e = this; return this.getMemberIdList().map(function (n) { return e.Rn[n].getName(); }); }, n.prototype.getStatus = function () { return this.Q; }, n.prototype.getMediaStats = function () { return this.In.getStats(); }, n.prototype.tn = function (n) { this.Q !== n && (this.Q = n, this.emit("status:" + n, n)); }, n; }(I), U = function (o) { function n(n, e, t, i) { var r = o.call(this) || this; return r.H = n, r.En = e, r.On = t, r.sn = i, r.Dn = {}, r.En.on("has-stream", function () { r.getRoomNameList().forEach(function (n) { r.Dn[n].publish(); }); }), r.En.on("remove-stream", function () { r.getRoomNameList().forEach(function (n) { r.Dn[n].unpublish(); }); }), r; } return a(n, o), n.prototype.joinRoom = function (n) { this.Dn[n] && this.leaveRoom(); var t = new J(n, this.H, this.En, this.On, this.sn); return this.Mn(t), this.En.getStatus() === x && t.publish(), this.Dn[n] = t, new Promise(function (n, e) { "in" === t.getStatus() ? n() : (t.once("status:in", function () { return n(); }), t.once("join-error", function (n) { return e(); })); }); }, n.prototype.leaveRoom = function (n) { n ? this.Dn[n] && (this.Dn[n].leave(), delete this.Dn[n]) : this.leaveAllRoom(); }, n.prototype.leaveAllRoom = function () { var e = this; this.getRoomNameList().forEach(function (n) { e.Dn[n].leave(); }), this.Dn = {}; }, n.prototype.inRoom = function (n) { return !!this.Dn[n]; }, n.prototype.getRoomNameList = function () { return Object.keys(this.Dn); }, n.prototype.getRoomMemberIdList = function (n) { return this.Dn[n] ? this.Dn[n].getMemberIdList() : []; }, n.prototype.getRoomMemberNameList = function (n) { return this.Dn[n] ? this.Dn[n].getMemberNameList() : []; }, n.prototype.getRoomMediaStats = function (n) { return this.Dn[n] ? this.Dn[n].getMediaStats() : null; }, n.prototype.Mn = function (n) { var i = this; if (n) {
    var r = n.getName();
    n.on("member-join", r, function (n) { var e = i.On.getUser(n); if (e) {
        var t = e.getName();
        i.emit("member-join:" + r + ":" + t, r, t);
    } }), n.on("member-leave", r, function (n) { var e = i.On.getUser(n); if (e) {
        var t = e.getName();
        i.emit("member-leave:" + r + ":" + t, r, t);
    } }), n.on("update", r, function (n) { i.emit("update:" + r, r, n); }), n.on("status:in", r, function () { i.emit("join:" + r, r); }), n.on("status:out", r, function () { i.emit("leave:" + r, r), n.releaseGroup(r); }), n.on("media-stats-update", r, function (n) { i.emit("media-stats-update:" + r, r, n); });
} }, n; }(I), G = function (e) { function n() { var n = null !== e && e.apply(this, arguments) || this; return n.xn = {}, n.An = {}, n.Nn = !1, n; } return a(n, e), n.prototype.registerUser = function (n) { var e = n.getId(), t = n.getName(); this.xn[e] = n, this.An[t] = n, this.Ln(n), this.Nn && this.setMute(e, !0); }, n.prototype.getUser = function (n) { return this.xn[n]; }, n.prototype.getUserByName = function (n) { return this.An[n]; }, n.prototype.requestUserStream = function (n) { return this.An[n] ? this.An[n].requestStream() : Promise.reject("The user dose not exists."); }, n.prototype.getMute = function (n) { return !!this.An[n] && this.An[n].getMute(); }, n.prototype.setMute = function (n, e) { this.An[n] && this.An[n].setMute(e), e || (this.Nn = !1); }, n.prototype.setAllMute = function (n) { for (var e = 0, t = Object.keys(this.xn); e < t.length; e++) {
    var i = t[e];
    this.setMute(i, n);
} this.Nn = !0; }, n.prototype.getUserMediaStats = function (n) { return this.An[n] ? this.An[n].getMediaStats() : null; }, n.prototype.Ln = function (n) { var t = this, i = n.getName(); n.on("update-stream", i, function (n) { t.emit("update-stream:" + i, i, 0, n); }), n.on("remove-stream", i, function () { t.emit("remove-stream:" + i, i, 0); }), n.on("signaling-status:*", i, function (n, e) { t.emit("signaling-status:" + i + ":" + e, i, 0, e); }), n.on("ice-status:*", i, function (n, e) { t.emit("ice-status:" + i + ":" + e, i, 0, e); }), n.on("destroy", function () { n.releaseGroup(i), delete t.An[i], delete t.xn[n.getId()]; }), n.on("media-stats-update", i, function (n) { t.emit("media-stats-update:" + i, i, 0, n); }); }, n; }(I); return function (t) { function n(n) { var e = t.call(this) || this; return e.rn = "", e.H = new E, e.sn = new R(e.H), e.En = new A(e.H, e.sn), e.Fn = new D(e.H), e.On = new G, e.Jn = new U(e.H, e.En, e.On, e.sn), e.Un(), e.Gn(), e.Vn(), e.qn(), e.Wn(), n && e.init(n), e; } return a(n, t), n.prototype.init = function (n) { n.appKey && (this.rn = n.appKey, n.userId && n.token && this.login(n.userId, n.token).then(), n.roomId && this.joinRoom(n.roomId).then()), void 0 !== n.video && this.H.set("video", !!n.video), n.debug && this.H.set("debug", n.debug); }, n.prototype.login = function (n, e) { var t = this; return this.sn.init().then(function () { return t.Fn.login(t.rn, n, e); }); }, n.prototype.logout = function () { return this.sn.destroy(), this.Fn.logout(); }, n.prototype.getMyUserId = function () { return this.Fn.getMyUserId(); }, n.prototype.joinRoom = function (n) { var e = this; return this.Fn.doIfLogged().then(function () { return e.Jn.joinRoom("" + n); }); }, n.prototype.leaveRoom = function (n) { return n ? this.Jn.leaveRoom("" + n) : this.Jn.leaveAllRoom(); }, n.prototype.inRoom = function (n) { return this.Jn.inRoom("" + n); }, n.prototype.getRoomIdList = function () { return this.Jn.getRoomNameList(); }, n.prototype.getRoomMemberIdList = function (n) { return this.Jn.getRoomMemberIdList("" + n); }, n.prototype.getRoomMediaStats = function (n) { return this.Jn.getRoomMediaStats("" + n); }, n.prototype.requestUserStream = function (n) { return this.On.requestUserStream("" + n); }, n.prototype.getMute = function (n) { return this.On.getMute("" + n); }, n.prototype.setMute = function (n, e) { return this.On.setMute("" + n, e); }, n.prototype.setAllMute = function (n) { return this.On.setAllMute(n); }, n.prototype.getUserMediaStats = function (n) { return this.On.getUserMediaStats("" + n); }, n.prototype.startRTC = function (n) { return this.startLocalMedia(n); }, n.prototype.startLocalMedia = function (n) { return this.En.start(n); }, n.prototype.pauseLocalMedia = function () { return this.En.pause(); }, n.prototype.pauseLocalVideo = function () { return this.En.pauseVideo(); }, n.prototype.pauseLocalAudio = function () { return this.En.pauseAudio(); }, n.prototype.pause = function () { return this.pauseLocalMedia(); }, n.prototype.resumeLocalMedia = function () { return this.En.resume(); }, n.prototype.resumeLocalVideo = function () { return this.En.resumeVideo(); }, n.prototype.resumeLocalAudio = function () { return this.En.resumeAudio(); }, n.prototype.resume = function () { return this.resumeLocalMedia(); }, n.prototype.isLocalVideoPaused = function () { return this.En.isVideoPaused(); }, n.prototype.isLocalAudioPaused = function () { return this.En.isAudioPaused(); }, n.prototype.stopLocalMedia = function () { return this.En.stop(); }, n.prototype.getLocalMediaStatus = function () { return this.En.getStatus(); }, n.prototype.electronRequestSourceList = function (n) { return this.En.getScreenSources(n); }, n.prototype.requestLocalMediaStream = function () { return this.En.requestStream(); }, n.prototype.Un = function () { var n = this; this.Fn.on("login", function () { return n.emit("account.logged"); }), this.Fn.on("logging", function () { return n.emit("account.logging"); }), this.Fn.on("logout", function () { return n.emit("account.logout"); }); }, n.prototype.Gn = function () { var i = this; this.Jn.on("update:*", function (n, e, t) { return i.emit("room.update:" + e, e, t); }), this.Jn.on("member-join:*", function (n, e, t) { return i.emit("room.member-join:" + e, e, t); }), this.Jn.on("member-leave:*", function (n, e, t) { return i.emit("room.member-leave:" + e, e, t); }), this.Jn.on("join:*", function (n, e) { return i.emit("room.join:" + e, e); }), this.Jn.on("leave:*", function (n, e) { return i.emit("room.leave:" + e, e); }), this.Jn.on("media-stats-update:*", function (n, e, t) { return i.emit("room.media-stats-update:" + e, e, t); }); }, n.prototype.Vn = function () { var r = this; this.On.on("ice-status:*", function (n, e, t, i) { return r.emit("user.ice-status" + (0 < t ? "-screen" : "") + ":" + e + ":" + i, e, i); }), this.On.on("signaling-status:*", function (n, e, t, i) { return r.emit("user.signaling-status" + (0 < t ? "-screen" : "") + ":" + e + ":" + i, e, i); }), this.On.on("update-stream:*", function (n, e, t, i) { return r.emit("user.update" + (0 < t ? "-screen" : "") + "-stream:" + e, e, i); }), this.On.on("remove-stream:*", function (n, e, t) { return r.emit("user.remove" + (0 < t ? "-screen" : "") + "-stream:" + e, e); }), this.On.on("media-stats-update:*", function (n, e, t, i) { return r.emit("user.media-stats-update" + (0 < t ? "-screen" : "") + ":" + e, e, i); }), this.On.on("error:*", function (n, e, t, i) { return r.emit("user." + n, e, i); }); }, n.prototype.qn = function () { var t = this; this.En.on("status:*", function (n, e) { return t.emit("local-media.status:" + e, e); }), this.En.on("has-stream", function (n) { return t.emit("local-media.has-stream", n); }), this.En.on("remove-stream", function () { return t.emit("local-media.remove-stream"); }), this.En.on("pause-video", function () { return t.emit("local-media.pause-video"); }), this.En.on("pause-audio", function () { return t.emit("local-media.pause-audio"); }), this.En.on("resume-video", function () { return t.emit("local-media.resume-video"); }), this.En.on("resume-audio", function () { return t.emit("local-media.resume-audio"); }), this.En.on("error", function (n) { return t.emit("local-media.error", n); }), this.En.on("applied-constraints-video", function (n, e) { return t.emit("local-media.applied-constraints-video", n, e); }), this.En.on("applied-constraints-audio", function (n, e) { return t.emit("local-media.applied-constraints-audio", n, e); }); }, n.prototype.Wn = function () { var t = this; this.sn.on("status:*", function (n, e) { return t.emit("signaling.status:" + e, e); }), this.sn.on("status:connected", function () { return t.emit("signaling.ready"); }); }, n.support = R.isWebRTCSupported(), n; }(I); });
