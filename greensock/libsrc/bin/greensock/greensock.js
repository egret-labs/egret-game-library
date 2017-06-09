/*!
 * VERSION: 1.13.1
 * DATE: 2014-07-19
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var tweenSetTimeOut = function () {
    return egret.setTimeout.call(this, arguments[0], this, arguments[1]);
};
var tweenClearTimeout = egret.clearTimeout;
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
        var s = function (t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]))
                ;
            return i;
        }, r = function (t, e, s) {
            i.call(this, t, e, s), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render;
        }, n = 1e-10, a = i._internals, o = a.isSelector, h = a.isArray, l = r.prototype = i.to({}, .1, {}), _ = [];
        r.version = "1.13.1", l.constructor = r, l.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.lagSmoothing = i.lagSmoothing, r.ticker = i.ticker, r.render = i.render, l.invalidate = function () {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this);
        }, l.updateTo = function (t, e) {
            var s, r = this.ratio;
            e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (s in t)
                this.vars[s] = t[s];
            if (this._initted)
                if (e)
                    this._initted = !1;
                else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                    var n = this._time;
                    this.render(0, !0, !1), this._initted = !1, this.render(n, !0, !1);
                }
                else if (this._time > 0) {
                    this._initted = !1, this._init();
                    for (var a, o = 1 / (1 - r), h = this._firstPT; h;)
                        a = h.s + h.c, h.c *= o, h.s = a - h.c, h = h._next;
                }
            return this;
        }, l.render = function (t, e, i) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var s, r, o, h, l, u, p, c, f = this._dirty ? this.totalDuration() : this._totalDuration, m = this._time, d = this._totalTime, g = this._cycle, v = this._duration, y = this._rawPrevTime;
            if (t >= f ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, r = "onComplete"), 0 === v && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > y || y === n) && y !== t && (i = !0, y > n && (r = "onReverseComplete")), this._rawPrevTime = c = !e || t || y === t ? t : n)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== d || 0 === v && y > 0 && y !== n) && (r = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === v && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0), this._rawPrevTime = c = !e || t || y === t ? t : n)) : this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (h = v + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : 0 > this._time && (this._time = 0)), this._easeType ? (l = this._time / v, u = this._easeType, p = this._easePower, (1 === u || 3 === u && l >= .5) && (l = 1 - l), 3 === u && (l *= 2), 1 === p ? l *= l : 2 === p ? l *= l * l : 3 === p ? l *= l * l * l : 4 === p && (l *= l * l * l * l), this.ratio = 1 === u ? 1 - l : 2 === u ? l : .5 > this._time / v ? l / 2 : 1 - l / 2) : this.ratio = this._ease.getRatio(this._time / v)), m === this._time && !i && g === this._cycle)
                return d !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)), void 0;
            if (!this._initted) {
                if (this._init(), !this._initted || this._gc)
                    return;
                if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                    return this._time = m, this._totalTime = d, this._rawPrevTime = y, this._cycle = g, a.lazyTweens.push(this), this._lazy = t, void 0;
                this._time && !s ? this.ratio = this._ease.getRatio(this._time / v) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
            }
            for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== m && t >= 0 && (this._active = !0), 0 === d && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _))), o = this._firstPT; o;)
                o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
            this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== d || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _)), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || _), 0 === v && this._rawPrevTime === n && c !== n && (this._rawPrevTime = 0));
        }, r.to = function (t, e, i) {
            return new r(t, e, i);
        }, r.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i);
        }, r.fromTo = function (t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new r(t, e, s);
        }, r.staggerTo = r.allTo = function (t, e, n, a, l, u, p) {
            a = a || 0;
            var c, f, m, d, g = n.delay || 0, v = [], y = function () {
                n.onComplete && n.onComplete.apply(n.onCompleteScope || this, arguments), l.apply(p || this, u || _);
            };
            for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = s(t))), c = t.length, m = 0; c > m; m++) {
                f = {};
                for (d in n)
                    f[d] = n[d];
                f.delay = g, m === c - 1 && l && (f.onComplete = y), v[m] = new r(t[m], e, f), g += a;
            }
            return v;
        }, r.staggerFrom = r.allFrom = function (t, e, i, s, n, a, o) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, s, n, a, o);
        }, r.staggerFromTo = r.allFromTo = function (t, e, i, s, n, a, o, h) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, s, n, a, o, h);
        }, r.delayedCall = function (t, e, i, s, n) {
            return new r(e, 0, { delay: t, onComplete: e, onCompleteParams: i, onCompleteScope: s, onReverseComplete: e, onReverseCompleteParams: i, onReverseCompleteScope: s, immediateRender: !1, useFrames: n, overwrite: 0 });
        }, r.set = function (t, e) {
            return new r(t, 0, e);
        }, r.isTweening = function (t) {
            return i.getTweensOf(t, !0).length > 0;
        };
        var u = function (t, e) {
            for (var s = [], r = 0, n = t._first; n;)
                n instanceof i ? s[r++] = n : (e && (s[r++] = n), s = s.concat(u(n, e)), r = s.length), n = n._next;
            return s;
        }, p = r.getAllTweens = function (e) {
            return u(t._rootTimeline, e).concat(u(t._rootFramesTimeline, e));
        };
        r.killAll = function (t, i, s, r) {
            null == i && (i = !0), null == s && (s = !0);
            var n, a, o, h = p(0 != r), l = h.length, _ = i && s && r;
            for (o = 0; l > o; o++)
                a = h[o], (_ || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1));
        }, r.killChildTweensOf = function (t, e) {
            if (null != t) {
                var n, l, _, u, p, c = a.tweenLookup;
                if ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = s(t)), h(t))
                    for (u = t.length; --u > -1;)
                        r.killChildTweensOf(t[u], e);
                else {
                    n = [];
                    for (_ in c)
                        for (l = c[_].target.parentNode; l;)
                            l === t && (n = n.concat(c[_].tweens)), l = l.parentNode;
                    for (p = n.length, u = 0; p > u; u++)
                        e && n[u].totalTime(n[u].totalDuration()), n[u]._enabled(!1, !1);
                }
            }
        };
        var c = function (t, i, s, r) {
            i = i !== !1, s = s !== !1, r = r !== !1;
            for (var n, a, o = p(r), h = i && s && r, l = o.length; --l > -1;)
                a = o[l], (h || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t);
        };
        return r.pauseAll = function (t, e, i) {
            c(!0, t, e, i);
        }, r.resumeAll = function (t, e, i) {
            c(!1, t, e, i);
        }, r.globalTimeScale = function (e) {
            var s = t._rootTimeline, r = i.ticker.time;
            return arguments.length ? (e = e || n, s._startTime = r - (r - s._startTime) * s._timeScale / e, s = t._rootFramesTimeline, r = i.ticker.frame, s._startTime = r - (r - s._startTime) * s._timeScale / e, s._timeScale = t._rootTimeline._timeScale = e, e) : s._timeScale;
        }, l.progress = function (t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration();
        }, l.totalProgress = function (t) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration();
        }, l.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time;
        }, l.duration = function (e) {
            return arguments.length ? t.prototype.duration.call(this, e) : this._duration;
        }, l.totalDuration = function (t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration);
        }, l.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat;
        }, l.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay;
        }, l.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo;
        }, r;
    }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
        var s = function (t) {
            e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
            var i, s, r = this.vars;
            for (s in r)
                i = r[s], o(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
            o(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
        }, r = 1e-10, n = i._internals, a = n.isSelector, o = n.isArray, h = n.lazyTweens, l = n.lazyRender, _ = [], u = _gsScope._gsDefine.globals, p = function (t) {
            var e, i = {};
            for (e in t)
                i[e] = t[e];
            return i;
        }, c = function (t, e, i, s) {
            t._timeline.pause(t._startTime), e && e.apply(s || t._timeline, i || _);
        }, f = function (t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]))
                ;
            return i;
        }, m = s.prototype = new e;
        return s.version = "1.13.1", m.constructor = s, m.kill()._gc = !1, m.to = function (t, e, s, r) {
            var n = s.repeat && u.TweenMax || i;
            return e ? this.add(new n(t, e, s), r) : this.set(t, s, r);
        }, m.from = function (t, e, s, r) {
            return this.add((s.repeat && u.TweenMax || i).from(t, e, s), r);
        }, m.fromTo = function (t, e, s, r, n) {
            var a = r.repeat && u.TweenMax || i;
            return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n);
        }, m.staggerTo = function (t, e, r, n, o, h, l, _) {
            var u, c = new s({ onComplete: h, onCompleteParams: l, onCompleteScope: _, smoothChildTiming: this.smoothChildTiming });
            for ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = f(t)), n = n || 0, u = 0; t.length > u; u++)
                r.startAt && (r.startAt = p(r.startAt)), c.to(t[u], e, p(r), u * n);
            return this.add(c, o);
        }, m.staggerFrom = function (t, e, i, s, r, n, a, o) {
            return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o);
        }, m.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h);
        }, m.call = function (t, e, s, r) {
            return this.add(i.delayedCall(0, t, e, s), r);
        }, m.set = function (t, e, s) {
            return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s);
        }, s.exportRoot = function (t, e) {
            t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var r, n, a = new s(t), o = a._timeline;
            for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;)
                n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
            return o.add(a, 0), a;
        }, m.add = function (r, n, a, h) {
            var l, _, u, p, c, f;
            if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
                if (r instanceof Array || r && r.push && o(r)) {
                    for (a = a || "normal", h = h || 0, l = n, _ = r.length, u = 0; _ > u; u++)
                        o(p = r[u]) && (p = new s({ tweens: p })), this.add(p, l), "string" != typeof p && "function" != typeof p && ("sequence" === a ? l = p._startTime + p.totalDuration() / p._timeScale : "start" === a && (p._startTime -= p.delay())), l += h;
                    return this._uncache(!0);
                }
                if ("string" == typeof r)
                    return this.addLabel(r, n);
                if ("function" != typeof r)
                    throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r);
            }
            if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (c = this, f = c.rawTime() > r._startTime; c._timeline;)
                    f && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1), c = c._timeline;
            return this;
        }, m.remove = function (e) {
            if (e instanceof t)
                return this._remove(e, !1);
            if (e instanceof Array || e && e.push && o(e)) {
                for (var i = e.length; --i > -1;)
                    this.remove(e[i]);
                return this;
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e);
        }, m._remove = function (t, i) {
            e.prototype._remove.call(this, t, i);
            var s = this._last;
            return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this;
        }, m.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
        }, m.insert = m.insertMultiple = function (t, e, i, s) {
            return this.add(t, e || 0, i, s);
        }, m.appendMultiple = function (t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
        }, m.addLabel = function (t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e), this;
        }, m.addPause = function (t, e, i, s) {
            return this.call(c, ["{self}", e, i, s], this, t);
        }, m.removeLabel = function (t) {
            return delete this._labels[t], this;
        }, m.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1;
        }, m._parseTimeOrLabel = function (e, i, s, r) {
            var n;
            if (r instanceof t && r.timeline === this)
                this.remove(r);
            else if (r && (r instanceof Array || r.push && o(r)))
                for (n = r.length; --n > -1;)
                    r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
            if ("string" == typeof i)
                return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
            if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e])
                null == e && (e = this.duration());
            else {
                if (n = e.indexOf("="), -1 === n)
                    return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration();
            }
            return Number(e) + i;
        }, m.seek = function (t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1);
        }, m.stop = function () {
            return this.paused(!0);
        }, m.gotoAndPlay = function (t, e) {
            return this.play(t, e);
        }, m.gotoAndStop = function (t, e) {
            return this.pause(t, e);
        }, m.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, n, a, o, u, p = this._dirty ? this.totalDuration() : this._totalDuration, c = this._time, f = this._startTime, m = this._timeScale, d = this._paused;
            if (t >= p ? (this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (u = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = p + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== c || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (u = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (u = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== c && this._first || i || u) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== c && t > 0 && (this._active = !0), 0 === c && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _)), this._time >= c)
                    for (s = this._first; s && (a = s._next, !this._paused || d);)
                        (s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                else
                    for (s = this._last; s && (a = s._prev, !this._paused || d);)
                        (s._active || c >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                this._onUpdate && (e || (h.length && l(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _))), o && (this._gc || (f === this._startTime || m !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (n && (h.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || _)));
            }
        }, m._hasPausedChild = function () {
            for (var t = this._first; t;) {
                if (t._paused || t instanceof s && t._hasPausedChild())
                    return !0;
                t = t._next;
            }
            return !1;
        }, m.getChildren = function (t, e, s, r) {
            r = r || -9999999999;
            for (var n = [], a = this._first, o = 0; a;)
                r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
            return n;
        }, m.getTweensOf = function (t, e) {
            var s, r, n = this._gc, a = [], o = 0;
            for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;)
                (s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
            return n && this._enabled(!1, !0), a;
        }, m._contains = function (t) {
            for (var e = t.timeline; e;) {
                if (e === this)
                    return !0;
                e = e.timeline;
            }
            return !1;
        }, m.shiftChildren = function (t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r;)
                r._startTime >= i && (r._startTime += t), r = r._next;
            if (e)
                for (s in n)
                    n[s] >= i && (n[s] += t);
            return this._uncache(!0);
        }, m._kill = function (t, e) {
            if (!t && !e)
                return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;)
                i[s]._kill(t, e) && (r = !0);
            return r;
        }, m.clear = function (t) {
            var e = this.getChildren(!1, !0, !0), i = e.length;
            for (this._time = this._totalTime = 0; --i > -1;)
                e[i]._enabled(!1, !1);
            return t !== !1 && (this._labels = {}), this._uncache(!0);
        }, m.invalidate = function () {
            for (var t = this._first; t;)
                t.invalidate(), t = t._next;
            return this;
        }, m._enabled = function (t, i) {
            if (t === this._gc)
                for (var s = this._first; s;)
                    s._enabled(t, !0), s = s._next;
            return e.prototype._enabled.call(this, t, i);
        }, m.duration = function (t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration);
        }, m.totalDuration = function (t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, s = 0, r = this._last, n = 999999999999; r;)
                        e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
                    this._duration = this._totalDuration = s, this._dirty = !1;
                }
                return this._totalDuration;
            }
            return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this;
        }, m.usesFrames = function () {
            for (var e = this._timeline; e._timeline;)
                e = e._timeline;
            return e === t._rootFramesTimeline;
        }, m.rawTime = function () {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
        }, s;
    }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (t, e, i) {
        var s = function (e) {
            t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0;
        }, r = 1e-10, n = [], a = e._internals, o = a.lazyTweens, h = a.lazyRender, l = new i(null, null, 1, 0), _ = s.prototype = new t;
        return _.constructor = s, _.kill()._gc = !1, s.version = "1.13.1", _.invalidate = function () {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this);
        }, _.addCallback = function (t, i, s, r) {
            return this.add(e.delayedCall(0, t, s, r), i);
        }, _.removeCallback = function (t, e) {
            if (t)
                if (null == e)
                    this._kill(null, t);
                else
                    for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1;)
                        i[s]._startTime === r && i[s]._enabled(!1, !1);
            return this;
        }, _.tweenTo = function (t, i) {
            i = i || {};
            var s, r, a, o = { ease: l, overwrite: i.delay ? 2 : 1, useFrames: this.usesFrames(), immediateRender: !1 };
            for (r in i)
                o[r] = i[r];
            return o.time = this._parseTimeOrLabel(t), s = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, a = new e(this, s, o), o.onStart = function () {
                a.target.paused(!0), a.vars.time !== a.target.time() && s === a.duration() && a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || a, i.onStartParams || n);
            }, a;
        }, _.tweenFromTo = function (t, e, i) {
            i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = { onComplete: this.seek, onCompleteParams: [t], onCompleteScope: this }, i.immediateRender = i.immediateRender !== !1;
            var s = this.tweenTo(e, i);
            return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001);
        }, _.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, a, l, _, u, p, c = this._dirty ? this.totalDuration() : this._totalDuration, f = this._duration, m = this._time, d = this._totalTime, g = this._startTime, v = this._timeScale, y = this._rawPrevTime, T = this._paused, w = this._cycle;
            if (t >= c ? (this._locked || (this._totalTime = c, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (a = !0, _ = "onComplete", 0 === this._duration && (0 === t || 0 > y || y === r) && y !== t && this._first && (u = !0, y > r && (_ = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = f, t = f + 1e-4)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== m || 0 === f && y !== r && (y > 0 || 0 > t && y >= 0) && !this._locked) && (_ = "onReverseComplete", a = this._reversed), 0 > t ? (this._active = !1, y >= 0 && this._first && (u = !0), this._rawPrevTime = t) : (this._rawPrevTime = f || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (u = !0))) : (0 === f && 0 > y && (u = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (p = f + this._repeatDelay, this._cycle = this._totalTime / p >> 0, 0 !== this._cycle && this._cycle === this._totalTime / p && this._cycle--, this._time = this._totalTime - this._cycle * p, this._yoyo && 0 !== (1 & this._cycle) && (this._time = f - this._time), this._time > f ? (this._time = f, t = f + 1e-4) : 0 > this._time ? this._time = t = 0 : t = this._time))), this._cycle !== w && !this._locked) {
                var x = this._yoyo && 0 !== (1 & w), b = x === (this._yoyo && 0 !== (1 & this._cycle)), P = this._totalTime, S = this._cycle, k = this._rawPrevTime, R = this._time;
                if (this._totalTime = w * f, w > this._cycle ? x = !x : this._totalTime += f, this._time = m, this._rawPrevTime = 0 === f ? y - 1e-4 : y, this._cycle = w, this._locked = !0, m = x ? 0 : f, this.render(m, e, 0 === f), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || n), b && (m = x ? f + 1e-4 : -1e-4, this.render(m, !0, !1)), this._locked = !1, this._paused && !T)
                    return;
                this._time = R, this._totalTime = P, this._cycle = S, this._rawPrevTime = k;
            }
            if (!(this._time !== m && this._first || i || u))
                return d !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n)), void 0;
            if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== d && t > 0 && (this._active = !0), 0 === d && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || n)), this._time >= m)
                for (s = this._first; s && (l = s._next, !this._paused || T);)
                    (s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = l;
            else
                for (s = this._last; s && (l = s._prev, !this._paused || T);)
                    (s._active || m >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = l;
            this._onUpdate && (e || (o.length && h(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n))), _ && (this._locked || this._gc || (g === this._startTime || v !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (a && (o.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[_] && this.vars[_].apply(this.vars[_ + "Scope"] || this, this.vars[_ + "Params"] || n)));
        }, _.getActive = function (t, e, i) {
            null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
            var s, r, n = [], a = this.getChildren(t, e, i), o = 0, h = a.length;
            for (s = 0; h > s; s++)
                r = a[s], r.isActive() && (n[o++] = r);
            return n;
        }, _.getLabelAfter = function (t) {
            t || 0 !== t && (t = this._time);
            var e, i = this.getLabelsArray(), s = i.length;
            for (e = 0; s > e; e++)
                if (i[e].time > t)
                    return i[e].name;
            return null;
        }, _.getLabelBefore = function (t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                if (t > e[i].time)
                    return e[i].name;
            return null;
        }, _.getLabelsArray = function () {
            var t, e = [], i = 0;
            for (t in this._labels)
                e[i++] = { time: this._labels[t], name: t };
            return e.sort(function (t, e) {
                return t.time - e.time;
            }), e;
        }, _.progress = function (t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration();
        }, _.totalProgress = function (t) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration();
        }, _.totalDuration = function (e) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration);
        }, _.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time;
        }, _.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat;
        }, _.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay;
        }, _.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo;
        }, _.currentLabel = function (t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8);
        }, s;
    }, !0), function () {
        var t = 180 / Math.PI, e = [], i = [], s = [], r = {}, n = function (t, e, i, s) {
            this.a = t, this.b = e, this.c = i, this.d = s, this.da = s - t, this.ca = i - t, this.ba = e - t;
        }, a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", o = function (t, e, i, s) {
            var r = { a: t }, n = {}, a = {}, o = { c: s }, h = (t + e) / 2, l = (e + i) / 2, _ = (i + s) / 2, u = (h + l) / 2, p = (l + _) / 2, c = (p - u) / 8;
            return r.b = h + (t - h) / 4, n.b = u + c, r.c = n.a = (r.b + n.b) / 2, n.c = a.a = (u + p) / 2, a.b = p - c, o.b = _ + (s - _) / 4, a.c = o.a = (a.b + o.b) / 2, [r, n, a, o];
        }, h = function (t, r, n, a, h) {
            var l, _, u, p, c, f, m, d, g, v, y, T, w, x = t.length - 1, b = 0, P = t[0].a;
            for (l = 0; x > l; l++)
                c = t[b], _ = c.a, u = c.d, p = t[b + 1].d, h ? (y = e[l], T = i[l], w = .25 * (T + y) * r / (a ? .5 : s[l] || .5), f = u - (u - _) * (a ? .5 * r : 0 !== y ? w / y : 0), m = u + (p - u) * (a ? .5 * r : 0 !== T ? w / T : 0), d = u - (f + ((m - f) * (3 * y / (y + T) + .5) / 4 || 0))) : (f = u - .5 * (u - _) * r, m = u + .5 * (p - u) * r, d = u - (f + m) / 2), f += d, m += d, c.c = g = f, c.b = 0 !== l ? P : P = c.a + .6 * (c.c - c.a), c.da = u - _, c.ca = g - _, c.ba = P - _, n ? (v = o(_, P, g, u), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = m;
            c = t[b], c.b = P, c.c = P + .4 * (c.d - P), c.da = c.d - c.a, c.ca = c.c - c.a, c.ba = P - c.a, n && (v = o(c.a, P, c.c, c.d), t.splice(b, 1, v[0], v[1], v[2], v[3]));
        }, l = function (t, s, r, a) {
            var o, h, l, _, u, p, c = [];
            if (a)
                for (t = [a].concat(t), h = t.length; --h > -1;)
                    "string" == typeof (p = t[h][s]) && "=" === p.charAt(1) && (t[h][s] = a[s] + Number(p.charAt(0) + p.substr(2)));
            if (o = t.length - 2, 0 > o)
                return c[0] = new n(t[0][s], 0, 0, t[-1 > o ? 0 : 1][s]), c;
            for (h = 0; o > h; h++)
                l = t[h][s], _ = t[h + 1][s], c[h] = new n(l, 0, 0, _), r && (u = t[h + 2][s], e[h] = (e[h] || 0) + (_ - l) * (_ - l), i[h] = (i[h] || 0) + (u - _) * (u - _));
            return c[h] = new n(t[h][s], 0, 0, t[h + 1][s]), c;
        }, _ = function (t, n, o, _, u, p) {
            var c, f, m, d, g, v, y, T, w = {}, x = [], b = p || t[0];
            u = "string" == typeof u ? "," + u + "," : a, null == n && (n = 1);
            for (f in t[0])
                x.push(f);
            if (t.length > 1) {
                for (T = t[t.length - 1], y = !0, c = x.length; --c > -1;)
                    if (f = x[c], Math.abs(b[f] - T[f]) > .05) {
                        y = !1;
                        break;
                    }
                y && (t = t.concat(), p && t.unshift(p), t.push(t[1]), p = t[t.length - 3]);
            }
            for (e.length = i.length = s.length = 0, c = x.length; --c > -1;)
                f = x[c], r[f] = -1 !== u.indexOf("," + f + ","), w[f] = l(t, f, r[f], p);
            for (c = e.length; --c > -1;)
                e[c] = Math.sqrt(e[c]), i[c] = Math.sqrt(i[c]);
            if (!_) {
                for (c = x.length; --c > -1;)
                    if (r[f])
                        for (m = w[x[c]], v = m.length - 1, d = 0; v > d; d++)
                            g = m[d + 1].da / i[d] + m[d].da / e[d], s[d] = (s[d] || 0) + g * g;
                for (c = s.length; --c > -1;)
                    s[c] = Math.sqrt(s[c]);
            }
            for (c = x.length, d = o ? 4 : 1; --c > -1;)
                f = x[c], m = w[f], h(m, n, o, _, r[f]), y && (m.splice(0, d), m.splice(m.length - d, d));
            return w;
        }, u = function (t, e, i) {
            e = e || "soft";
            var s, r, a, o, h, l, _, u, p, c, f, m = {}, d = "cubic" === e ? 3 : 2, g = "soft" === e, v = [];
            if (g && i && (t = [i].concat(t)), null == t || d + 1 > t.length)
                throw "invalid Bezier data";
            for (p in t[0])
                v.push(p);
            for (l = v.length; --l > -1;) {
                for (p = v[l], m[p] = h = [], c = 0, u = t.length, _ = 0; u > _; _++)
                    s = null == i ? t[_][p] : "string" == typeof (f = t[_][p]) && "=" === f.charAt(1) ? i[p] + Number(f.charAt(0) + f.substr(2)) : Number(f), g && _ > 1 && u - 1 > _ && (h[c++] = (s + h[c - 2]) / 2), h[c++] = s;
                for (u = c - d + 1, c = 0, _ = 0; u > _; _ += d)
                    s = h[_], r = h[_ + 1], a = h[_ + 2], o = 2 === d ? 0 : h[_ + 3], h[c++] = f = 3 === d ? new n(s, r, a, o) : new n(s, (2 * r + s) / 3, (2 * r + a) / 3, a);
                h.length = c;
            }
            return m;
        }, p = function (t, e, i) {
            for (var s, r, n, a, o, h, l, _, u, p, c, f = 1 / i, m = t.length; --m > -1;)
                for (p = t[m], n = p.a, a = p.d - n, o = p.c - n, h = p.b - n, s = r = 0, _ = 1; i >= _; _++)
                    l = f * _, u = 1 - l, s = r - (r = (l * l * a + 3 * u * (l * o + u * h)) * l), c = m * i + _ - 1, e[c] = (e[c] || 0) + s * s;
        }, c = function (t, e) {
            e = e >> 0 || 6;
            var i, s, r, n, a = [], o = [], h = 0, l = 0, _ = e - 1, u = [], c = [];
            for (i in t)
                p(t[i], a, e);
            for (r = a.length, s = 0; r > s; s++)
                h += Math.sqrt(a[s]), n = s % e, c[n] = h, n === _ && (l += h, n = s / e >> 0, u[n] = c, o[n] = l, h = 0, c = []);
            return { length: l, lengths: o, segments: u };
        }, f = _gsScope._gsDefine.plugin({ propName: "bezier", priority: -1, version: "1.3.3", API: 2, global: !0, init: function (t, e, i) {
                this._target = t, e instanceof Array && (e = { values: e }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                var s, r, n, a, o, h = e.values || [], l = {}, p = h[0], f = e.autoRotate || i.vars.orientToBezier;
                this._autoRotate = f ? f instanceof Array ? f : [
                    ["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]
                ] : null;
                for (s in p)
                    this._props.push(s);
                for (n = this._props.length; --n > -1;)
                    s = this._props[n], this._overwriteProps.push(s), r = this._func[s] = "function" == typeof t[s], l[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), o || l[s] !== h[0][s] && (o = l);
                if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? _(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : u(h, e.type, l), this._segCount = this._beziers[s].length, this._timeRes) {
                    var m = c(this._beziers, this._timeRes);
                    this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length;
                }
                if (f = this._autoRotate)
                    for (this._initialRotations = [], f[0] instanceof Array || (this._autoRotate = f = [f]), n = f.length; --n > -1;) {
                        for (a = 0; 3 > a; a++)
                            s = f[n][a], this._func[s] = "function" == typeof t[s] ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)] : !1;
                        s = f[n][2], this._initialRotations[n] = this._func[s] ? this._func[s].call(this._target) : this._target[s];
                    }
                return this._startRatio = i.vars.runBackwards ? 1 : 0, !0;
            }, set: function (e) {
                var i, s, r, n, a, o, h, l, _, u, p = this._segCount, c = this._func, f = this._target, m = e !== this._startRatio;
                if (this._timeRes) {
                    if (_ = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && p - 1 > r) {
                        for (l = p - 1; l > r && e >= (this._l2 = _[++r]);)
                            ;
                        this._l1 = _[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0];
                    }
                    else if (this._l1 > e && r > 0) {
                        for (; r > 0 && (this._l1 = _[--r]) >= e;)
                            ;
                        0 === r && this._l1 > e ? this._l1 = 0 : r++, this._l2 = _[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si];
                    }
                    if (i = r, e -= this._l1, r = this._si, e > this._s2 && u.length - 1 > r) {
                        for (l = u.length - 1; l > r && e >= (this._s2 = u[++r]);)
                            ;
                        this._s1 = u[r - 1], this._si = r;
                    }
                    else if (this._s1 > e && r > 0) {
                        for (; r > 0 && (this._s1 = u[--r]) >= e;)
                            ;
                        0 === r && this._s1 > e ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r;
                    }
                    o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec;
                }
                else
                    i = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0, o = (e - i * (1 / p)) * p;
                for (s = 1 - o, r = this._props.length; --r > -1;)
                    n = this._props[r], a = this._beziers[n][i], h = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a, this._round[n] && (h = Math.round(h)), c[n] ? f[n](h) : f[n] = h;
                if (this._autoRotate) {
                    var d, g, v, y, T, w, x, b = this._autoRotate;
                    for (r = b.length; --r > -1;)
                        n = b[r][2], w = b[r][3] || 0, x = b[r][4] === !0 ? 1 : t, a = this._beziers[b[r][0]], d = this._beziers[b[r][1]], a && d && (a = a[i], d = d[i], g = a.a + (a.b - a.a) * o, y = a.b + (a.c - a.b) * o, g += (y - g) * o, y += (a.c + (a.d - a.c) * o - y) * o, v = d.a + (d.b - d.a) * o, T = d.b + (d.c - d.b) * o, v += (T - v) * o, T += (d.c + (d.d - d.c) * o - T) * o, h = m ? Math.atan2(T - v, y - g) * x + w : this._initialRotations[r], c[n] ? f[n](h) : f[n] = h);
                }
            } }), m = f.prototype;
        f.bezierThrough = _, f.cubicToQuadratic = o, f._autoCSS = !0, f.quadraticToCubic = function (t, e, i) {
            return new n(t, (2 * e + t) / 3, (2 * e + i) / 3, i);
        }, f._cssRegister = function () {
            var t = _gsScope._gsDefine.globals.CSSPlugin;
            if (t) {
                var e = t._internals, i = e._parseToProxy, s = e._setPluginRatio, r = e.CSSPropTween;
                e._registerComplexSpecialProp("bezier", { parser: function (t, e, n, a, o, h) {
                        e instanceof Array && (e = { values: e }), h = new f;
                        var l, _, u, p = e.values, c = p.length - 1, m = [], d = {};
                        if (0 > c)
                            return o;
                        for (l = 0; c >= l; l++)
                            u = i(t, p[l], a, o, h, c !== l), m[l] = u.end;
                        for (_ in e)
                            d[_] = e[_];
                        return d.values = m, o = new r(t, "bezier", 0, 0, u.pt, 2), o.data = u, o.plugin = h, o.setRatio = s, 0 === d.autoRotate && (d.autoRotate = !0), !d.autoRotate || d.autoRotate instanceof Array || (l = d.autoRotate === !0 ? 0 : Number(d.autoRotate), d.autoRotate = null != u.end.left ? [
                            ["left", "top", "rotation", l, !1]
                        ] : null != u.end.x ? [
                            ["x", "y", "rotation", l, !1]
                        ] : !1), d.autoRotate && (a._transform || a._enableTransforms(!1), u.autoRotate = a._target._gsTransform), h._onInitTween(u.proxy, d, a._tween), o;
                    } });
            }
        }, m._roundProps = function (t, e) {
            for (var i = this._overwriteProps, s = i.length; --s > -1;)
                (t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e);
        }, m._kill = function (t) {
            var e, i, s = this._props;
            for (e in this._beziers)
                if (e in t)
                    for (delete this._beziers[e], delete this._func[e], i = s.length; --i > -1;)
                        s[i] === e && s.splice(i, 1);
            return this._super._kill.call(this, t);
        };
    }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) { }, !0), function () {
        var t = _gsScope._gsDefine.plugin({ propName: "roundProps", priority: -1, API: 2, init: function (t, e, i) {
                return this._tween = i, !0;
            } }), e = t.prototype;
        e._onInitAllProps = function () {
            for (var t, e, i, s = this._tween, r = s.vars.roundProps instanceof Array ? s.vars.roundProps : s.vars.roundProps.split(","), n = r.length, a = {}, o = s._propLookup.roundProps; --n > -1;)
                a[r[n]] = 1;
            for (n = r.length; --n > -1;)
                for (t = r[n], e = s._firstPT; e;)
                    i = e._next, e.pg ? e.t._roundProps(a, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : s._firstPT === e && (s._firstPT = i), e._next = e._prev = null, s._propLookup[t] = o), e = i;
            return !1;
        }, e._add = function (t, e, i, s) {
            this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e);
        };
    }(), _gsScope._gsDefine.plugin({ propName: "attr", API: 2, version: "0.3.3", init: function (t, e) {
            var i, s, r;
            if ("function" != typeof t.setAttribute)
                return !1;
            this._target = t, this._proxy = {}, this._start = {}, this._end = {};
            for (i in e)
                this._start[i] = this._proxy[i] = s = t.getAttribute(i), r = this._addTween(this._proxy, i, parseFloat(s), e[i], i), this._end[i] = r ? r.s + r.c : e[i], this._overwriteProps.push(i);
            return !0;
        }, set: function (t) {
            this._super.setRatio.call(this, t);
            for (var e, i = this._overwriteProps, s = i.length, r = 1 === t ? this._end : t ? this._proxy : this._start; --s > -1;)
                e = i[s], this._target.setAttribute(e, r[e] + "");
        } }), _gsScope._gsDefine.plugin({ propName: "directionalRotation", version: "0.2.1", API: 2, init: function (t, e) {
            "object" != typeof e && (e = { rotation: e }), this.finals = {};
            var i, s, r, n, a, o, h = e.useRadians === !0 ? 2 * Math.PI : 360, l = 1e-6;
            for (i in e)
                "useRadians" !== i && (o = (e[i] + "").split("_"), s = o[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), n = this.finals[i] = "string" == typeof s && "=" === s.charAt(1) ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, a = n - r, o.length && (s = o.join("_"), -1 !== s.indexOf("short") && (a %= h, a !== a % (h / 2) && (a = 0 > a ? a + h : a - h)), -1 !== s.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * h) % h - (0 | a / h) * h : -1 !== s.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * h) % h - (0 | a / h) * h)), (a > l || -l > a) && (this._addTween(t, i, r, r + a, i), this._overwriteProps.push(i)));
            return !0;
        }, set: function (t) {
            var e;
            if (1 !== t)
                this._super.setRatio.call(this, t);
            else
                for (e = this._firstPT; e;)
                    e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next;
        } })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (t) {
        var e, i, s, r = _gsScope.GreenSockGlobals || _gsScope, n = r.com.greensock, a = 2 * Math.PI, o = Math.PI / 2, h = n._class, l = function (e, i) {
            var s = h("easing." + e, function () {
            }, !0), r = s.prototype = new t;
            return r.constructor = s, r.getRatio = i, s;
        }, _ = t.register || function () {
        }, u = function (t, e, i, s) {
            var r = h("easing." + t, { easeOut: new e, easeIn: new i, easeInOut: new s }, !0);
            return _(r, t), r;
        }, p = function (t, e, i) {
            this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t);
        }, c = function (e, i) {
            var s = h("easing." + e, function (t) {
                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1;
            }, !0), r = s.prototype = new t;
            return r.constructor = s, r.getRatio = i, r.config = function (t) {
                return new s(t);
            }, s;
        }, f = u("Back", c("BackOut", function (t) {
            return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
        }), c("BackIn", function (t) {
            return t * t * ((this._p1 + 1) * t - this._p1);
        }), c("BackInOut", function (t) {
            return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
        })), m = h("easing.SlowMo", function (t, e, i) {
            e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0;
        }, !0), d = m.prototype = new t;
        return d.constructor = m, d.getRatio = function (t) {
            var e = t + (.5 - t) * this._p;
            return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e;
        }, m.ease = new m(.7, .7), d.config = m.config = function (t, e, i) {
            return new m(t, e, i);
        }, e = h("easing.SteppedEase", function (t) {
            t = t || 1, this._p1 = 1 / t, this._p2 = t + 1;
        }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function (t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1;
        }, d.config = e.config = function (t) {
            return new e(t);
        }, i = h("easing.RoughEase", function (e) {
            e = e || {};
            for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), c = u, f = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --c > -1;)
                i = f ? Math.random() : 1 / u * c, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), f ? s += Math.random() * r - .5 * r : c % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = { x: i, y: s };
            for (l.sort(function (t, e) {
                return t.x - e.x;
            }), o = new p(1, 1, null), c = u; --c > -1;)
                a = l[c], o = new p(a.x, a.y, o);
            this._prev = new p(0, 0, 0 !== o.t ? o : o.next);
        }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t;)
                    e = e.next;
                e = e.prev;
            }
            else
                for (; e.prev && e.t >= t;)
                    e = e.prev;
            return this._prev = e, e.v + (t - e.t) / e.gap * e.c;
        }, d.config = function (t) {
            return new i(t);
        }, i.ease = new i, u("Bounce", l("BounceOut", function (t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        }), l("BounceIn", function (t) {
            return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
        }), l("BounceInOut", function (t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5;
        })), u("Circ", l("CircOut", function (t) {
            return Math.sqrt(1 - (t -= 1) * t);
        }), l("CircIn", function (t) {
            return -(Math.sqrt(1 - t * t) - 1);
        }), l("CircInOut", function (t) {
            return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        })), s = function (e, i, s) {
            var r = h("easing." + e, function (t, e) {
                this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0);
            }, !0), n = r.prototype = new t;
            return n.constructor = r, n.getRatio = i, n.config = function (t, e) {
                return new r(t, e);
            }, r;
        }, u("Elastic", s("ElasticOut", function (t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1;
        }, .3), s("ElasticIn", function (t) {
            return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2));
        }, .3), s("ElasticInOut", function (t) {
            return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1;
        }, .45)), u("Expo", l("ExpoOut", function (t) {
            return 1 - Math.pow(2, -10 * t);
        }), l("ExpoIn", function (t) {
            return Math.pow(2, 10 * (t - 1)) - .001;
        }), l("ExpoInOut", function (t) {
            return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
        })), u("Sine", l("SineOut", function (t) {
            return Math.sin(t * o);
        }), l("SineIn", function (t) {
            return -Math.cos(t * o) + 1;
        }), l("SineInOut", function (t) {
            return -.5 * (Math.cos(Math.PI * t) - 1);
        })), h("easing.EaseLookup", { find: function (e) {
                return t.map[e];
            } }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), f;
    }, !0);
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (t, e) {
    "use strict";
    var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
    if (!i.TweenLite) {
        var s, r, n, a, o, h = function (t) {
            var e, s = t.split("."), r = i;
            for (e = 0; s.length > e; e++)
                r[s[e]] = r = r[s[e]] || {};
            return r;
        }, l = h("com.greensock"), _ = 1e-10, u = function (t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]))
                ;
            return i;
        }, p = function () {
        }, c = function () {
            var t = Object.prototype.toString, e = t.call([]);
            return function (i) {
                return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e);
            };
        }(), f = {}, m = function (s, r, n, a) {
            this.sc = f[s] ? f[s].sc : [], f[s] = this, this.gsClass = null, this.func = n;
            var o = [];
            this.check = function (l) {
                for (var _, u, p, c, d = r.length, g = d; --d > -1;)
                    (_ = f[r[d]] || new m(r[d], [])).gsClass ? (o[d] = _.gsClass, g--) : l && _.sc.push(this);
                if (0 === g && n)
                    for (u = ("com.greensock." + s).split("."), p = u.pop(), c = h(u.join("."))[p] = this.gsClass = n.apply(n, o), a && (i[p] = c, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function () {
                        return c;
                    }) : s === e && "undefined" != typeof module && module.exports && (module.exports = c)), d = 0; this.sc.length > d; d++)
                        this.sc[d].check();
            }, this.check(!0);
        }, d = t._gsDefine = function (t, e, i, s) {
            return new m(t, e, i, s);
        }, g = l._class = function (t, e, i) {
            return e = e || function () {
            }, d(t, [], function () {
                return e;
            }, i), e;
        };
        d.globals = i;
        var v = [0, 0, 1, 1], y = [], T = g("easing.Ease", function (t, e, i, s) {
            this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? v.concat(e) : v;
        }, !0), w = T.map = {}, x = T.register = function (t, e, i, s) {
            for (var r, n, a, o, h = e.split(","), _ = h.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)
                for (n = h[_], r = s ? g("easing." + n, null, !0) : l.easing[n] || {}, a = u.length; --a > -1;)
                    o = u[a], w[n + "." + o] = w[o + n] = r[o] = t.getRatio ? t : t[o] || new t;
        };
        for (n = T.prototype, n._calcEnd = !1, n.getRatio = function (t) {
            if (this._func)
                return this._params[0] = t, this._func.apply(null, this._params);
            var e = this._type, i = this._power, s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
            return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2;
        }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = s.length; --r > -1;)
            n = s[r] + ",Power" + r, x(new T(null, null, 1, r), n, "easeOut", !0), x(new T(null, null, 2, r), n, "easeIn" + (0 === r ? ",easeNone" : "")), x(new T(null, null, 3, r), n, "easeInOut");
        w.linear = l.easing.Linear.easeIn, w.swing = l.easing.Quad.easeInOut;
        var b = g("events.EventDispatcher", function (t) {
            this._listeners = {}, this._eventTarget = t || this;
        });
        n = b.prototype, n.addEventListener = function (t, e, i, s, r) {
            r = r || 0;
            var n, h, l = this._listeners[t], _ = 0;
            for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1;)
                n = l[h], n.c === e && n.s === i ? l.splice(h, 1) : 0 === _ && r > n.pr && (_ = h + 1);
            l.splice(_, 0, { c: e, s: i, up: s, pr: r }), this !== a || o || a.wake();
        }, n.removeEventListener = function (t, e) {
            var i, s = this._listeners[t];
            if (s)
                for (i = s.length; --i > -1;)
                    if (s[i].c === e)
                        return s.splice(i, 1), void 0;
        }, n.dispatchEvent = function (t) {
            var e, i, s, r = this._listeners[t];
            if (r)
                for (e = r.length, i = this._eventTarget; --e > -1;)
                    s = r[e], s.up ? s.c.call(s.s || i, { type: t, target: i }) : s.c.call(s.s || i);
        };
        var P = t.requestAnimationFrame, S = t.cancelAnimationFrame, k = Date.now || function () {
            return (new Date).getTime();
        }, R = k();
        for (s = ["ms", "moz", "webkit", "o"], r = s.length; --r > -1 && !P;)
            P = t[s[r] + "RequestAnimationFrame"], S = t[s[r] + "CancelAnimationFrame"] || t[s[r] + "CancelRequestAnimationFrame"];
        g("Ticker", function (t, e) {
            var i, s, r, n, h, l = this, u = k(), c = e !== !1 && P, f = 500, m = 33, d = function (t) {
                var e, a, o = k() - R;
                o > f && (u += o - m), R += o, l.time = (R - u) / 1e3, e = l.time - h, (!i || e > 0 || t === !0) && (l.frame++, h += e + (e >= n ? .004 : n - e), a = !0), t !== !0 && (r = s(d)), a && l.dispatchEvent("tick");
            };
            b.call(l), l.time = l.frame = 0, l.tick = function () {
                d(!0);
            }, l.lagSmoothing = function (t, e) {
                f = t || 1 / _, m = Math.min(e, f, 0);
            }, l.sleep = function () {
                null != r && (c && S ? S(r) : tweenClearTimeout(r), s = p, r = null, l === a && (o = !1));
            }, l.wake = function () {
                null !== r ? l.sleep() : l.frame > 10 && (R = k() - f + 5), s = 0 === i ? p : c && P ? P : function (t) {
                    return tweenSetTimeOut(t, 0 | 1e3 * (h - l.time) + 1);
                }, l === a && (o = !0), d(2);
            }, l.fps = function (t) {
                return arguments.length ? (i = t, n = 1 / (i || 60), h = this.time + n, l.wake(), void 0) : i;
            }, l.useRAF = function (t) {
                return arguments.length ? (l.sleep(), c = t, l.fps(i), void 0) : c;
            }, l.fps(t), tweenSetTimeOut(function () {
                c && (!r || 5 > l.frame) && l.useRAF(!1);
            }, 1500);
        }), n = l.Ticker.prototype = new l.events.EventDispatcher, n.constructor = l.Ticker;
        var A = g("core.Animation", function (t, e) {
            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, B) {
                o || a.wake();
                var i = this.vars.useFrames ? j : B;
                i.add(this, i._time), this.vars.paused && this.paused(!0);
            }
        });
        a = A.ticker = new l.Ticker, n = A.prototype, n._dirty = n._gc = n._initted = n._paused = !1, n._totalTime = n._time = 0, n._rawPrevTime = -1, n._next = n._last = n._onUpdate = n._timeline = n.timeline = null, n._paused = !1;
        var C = function () {
            o && k() - R > 2e3 && a.wake(), tweenSetTimeOut(C, 2e3);
        };
        C(), n.play = function (t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
        }, n.pause = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!0);
        }, n.resume = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!1);
        }, n.seek = function (t, e) {
            return this.totalTime(Number(t), e !== !1);
        }, n.restart = function (t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0);
        }, n.reverse = function (t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
        }, n.render = function () {
        }, n.invalidate = function () {
            return this;
        }, n.isActive = function () {
            var t, e = this._timeline, i = this._startTime;
            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t;
        }, n._enabled = function (t, e) {
            return o || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1;
        }, n._kill = function () {
            return this._enabled(!1, !1);
        }, n.kill = function (t, e) {
            return this._kill(t, e), this;
        }, n._uncache = function (t) {
            for (var e = t ? this : this.timeline; e;)
                e._dirty = !0, e = e.timeline;
            return this;
        }, n._swapSelfInParams = function (t) {
            for (var e = t.length, i = t.concat(); --e > -1;)
                "{self}" === t[e] && (i[e] = this);
            return i;
        }, n.eventCallback = function (t, e, i, s) {
            if ("on" === (t || "").substr(0, 2)) {
                var r = this.vars;
                if (1 === arguments.length)
                    return r[t];
                null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = c(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e);
            }
            return this;
        }, n.delay = function (t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay;
        }, n.duration = function (t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration);
        }, n.totalDuration = function (t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration;
        }, n.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time;
        }, n.totalTime = function (t, e, i) {
            if (o || a.wake(), !arguments.length)
                return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var s = this._totalDuration, r = this._timeline;
                    if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                        for (; r._timeline;)
                            r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline;
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), I.length && q());
            }
            return this;
        }, n.progress = n.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration();
        }, n.startTime = function (t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime;
        }, n.timeScale = function (t) {
            if (!arguments.length)
                return this._timeScale;
            if (t = t || _, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime, i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t;
            }
            return this._timeScale = t, this._uncache(!1);
        }, n.reversed = function (t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed;
        }, n.paused = function (t) {
            if (!arguments.length)
                return this._paused;
            if (t != this._paused && this._timeline) {
                o || t || a.wake();
                var e = this._timeline, i = e.rawTime(), s = i - this._pauseTime;
                !t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0);
            }
            return this._gc && !t && this._enabled(!0, !1), this;
        };
        var O = g("core.SimpleTimeline", function (t) {
            A.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0;
        });
        n = O.prototype = new A, n.constructor = O, n.kill()._gc = !1, n._first = n._last = null, n._sortChildren = !1, n.add = n.insert = function (t, e) {
            var i, s;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                for (s = t._startTime; i && i._startTime > s;)
                    i = i._prev;
            return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this;
        }, n._remove = function (t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, this._timeline && this._uncache(!0)), this;
        }, n.render = function (t, e, i) {
            var s, r = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; r;)
                s = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s;
        }, n.rawTime = function () {
            return o || a.wake(), this._totalTime;
        };
        var D = g("TweenLite", function (e, i, s) {
            if (A.call(this, i, s), this.render = D.prototype.render, null == e)
                throw "Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : D.selector(e) || e;
            var r, n, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), h = this.vars.overwrite;
            if (this._overwrite = h = null == h ? Y[D.defaultOverwrite] : "number" == typeof h ? h >> 0 : Y[h], (o || e instanceof Array || e.push && c(e)) && "number" != typeof e[0])
                for (this._targets = a = u(e), this._propLookup = [], this._siblings = [], r = 0; a.length > r; r++)
                    n = a[r], n ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(u(n))) : (this._siblings[r] = V(n, this, !1), 1 === h && this._siblings[r].length > 1 && G(n, this, null, 1, this._siblings[r])) : (n = a[r--] = D.selector(n), "string" == typeof n && a.splice(r + 1, 1)) : a.splice(r--, 1);
            else
                this._propLookup = {}, this._siblings = V(e, this, !1), 1 === h && this._siblings.length > 1 && G(e, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -_, this.render(-this._delay));
        }, !0), M = function (e) {
            return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType);
        }, z = function (t, e) {
            var i, s = {};
            for (i in t)
                U[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!F[i] || F[i] && F[i]._autoCSS) || (s[i] = t[i], delete t[i]);
            t.css = s;
        };
        n = D.prototype = new A, n.constructor = D, n.kill()._gc = !1, n.ratio = 0, n._firstPT = n._targets = n._overwrittenProps = n._startAt = null, n._notifyPluginsOfEnabled = n._lazy = !1, D.version = "1.13.1", D.defaultEase = n._ease = new T(null, null, 1, 1), D.defaultOverwrite = "auto", D.ticker = a, D.autoSleep = !0, D.lagSmoothing = function (t, e) {
            a.lagSmoothing(t, e);
        }, D.selector = t.$ || t.jQuery || function (e) {
            var i = t.$ || t.jQuery;
            return i ? (D.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
        };
        var I = [], E = {}, L = D._internals = { isArray: c, isSelector: M, lazyTweens: I }, F = D._plugins = {}, N = L.tweenLookup = {}, X = 0, U = L.reservedProps = { ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1, autoCSS: 1, lazy: 1 }, Y = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0 }, j = A._rootFramesTimeline = new O, B = A._rootTimeline = new O, q = L.lazyRender = function () {
            var t = I.length;
            for (E = {}; --t > -1;)
                s = I[t], s && s._lazy !== !1 && (s.render(s._lazy, !1, !0), s._lazy = !1);
            I.length = 0;
        };
        B._startTime = a.time, j._startTime = a.frame, B._active = j._active = !0, tweenSetTimeOut(q, 1), A._updateRoot = D.render = function () {
            var t, e, i;
            if (I.length && q(), B.render((a.time - B._startTime) * B._timeScale, !1, !1), j.render((a.frame - j._startTime) * j._timeScale, !1, !1), I.length && q(), !(a.frame % 120)) {
                for (i in N) {
                    for (e = N[i].tweens, t = e.length; --t > -1;)
                        e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete N[i];
                }
                if (i = B._first, (!i || i._paused) && D.autoSleep && !j._first && 1 === a._listeners.tick.length) {
                    for (; i && i._paused;)
                        i = i._next;
                    i || a.sleep();
                }
            }
        }, a.addEventListener("tick", A._updateRoot);
        var V = function (t, e, i) {
            var s, r, n = t._gsTweenID;
            if (N[n || (t._gsTweenID = n = "t" + X++)] || (N[n] = { target: t, tweens: [] }), e && (s = N[n].tweens, s[r = s.length] = e, i))
                for (; --r > -1;)
                    s[r] === e && s.splice(r, 1);
            return N[n].tweens;
        }, G = function (t, e, i, s, r) {
            var n, a, o, h;
            if (1 === s || s >= 4) {
                for (h = r.length, n = 0; h > n; n++)
                    if ((o = r[n]) !== e)
                        o._gc || o._enabled(!1, !1) && (a = !0);
                    else if (5 === s)
                        break;
                return a;
            }
            var l, u = e._startTime + _, p = [], c = 0, f = 0 === e._duration;
            for (n = r.length; --n > -1;)
                (o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (l = l || W(e, 0, f), 0 === W(o, l, f) && (p[c++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((f || !o._initted) && 2e-10 >= u - o._startTime || (p[c++] = o)));
            for (n = c; --n > -1;)
                o = p[n], 2 === s && o._kill(i, t) && (a = !0), (2 !== s || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
            return a;
        }, W = function (t, e, i) {
            for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline;) {
                if (n += s._startTime, r *= s._timeScale, s._paused)
                    return -100;
                s = s._timeline;
            }
            return n /= r, n > e ? n - e : i && n === e || !t._initted && 2 * _ > n - e ? _ : (n += t.totalDuration() / t._timeScale / r) > e + _ ? 0 : n - e - _;
        };
        n._init = function () {
            var t, e, i, s, r, n = this.vars, a = this._overwrittenProps, o = this._duration, h = !!n.immediateRender, l = n.ease;
            if (n.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                for (s in n.startAt)
                    r[s] = n.startAt[s];
                if (r.overwrite = !1, r.immediateRender = !0, r.lazy = h && n.lazy !== !1, r.startAt = r.delay = null, this._startAt = D.to(this.target, 0, r), h)
                    if (this._time > 0)
                        this._startAt = null;
                    else if (0 !== o)
                        return;
            }
            else if (n.runBackwards && 0 !== o)
                if (this._startAt)
                    this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                else {
                    i = {};
                    for (s in n)
                        U[s] && "autoCSS" !== s || (i[s] = n[s]);
                    if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && n.lazy !== !1, i.immediateRender = h, this._startAt = D.to(this.target, 0, i), h) {
                        if (0 === this._time)
                            return;
                    }
                    else
                        this._startAt._init(), this._startAt._enabled(!1);
                }
            if (this._ease = l = l ? l instanceof T ? l : "function" == typeof l ? new T(l, n.easeParams) : w[l] || D.defaultEase : D.defaultEase, n.easeParams instanceof Array && l.config && (this._ease = l.config.apply(l, n.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                for (t = this._targets.length; --t > -1;)
                    this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
            else
                e = this._initProps(this.target, this._propLookup, this._siblings, a);
            if (e && D._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), n.runBackwards)
                for (i = this._firstPT; i;)
                    i.s += i.c, i.c = -i.c, i = i._next;
            this._onUpdate = n.onUpdate, this._initted = !0;
        }, n._initProps = function (e, i, s, r) {
            var n, a, o, h, l, _;
            if (null == e)
                return !1;
            E[e._gsTweenID] && q(), this.vars.css || e.style && e !== t && e.nodeType && F.css && this.vars.autoCSS !== !1 && z(this.vars, e);
            for (n in this.vars) {
                if (_ = this.vars[n], U[n])
                    _ && (_ instanceof Array || _.push && c(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[n] = _ = this._swapSelfInParams(_, this));
                else if (F[n] && (h = new F[n])._onInitTween(e, this.vars[n], this)) {
                    for (this._firstPT = l = { _next: this._firstPT, t: h, p: "setRatio", s: 0, c: 1, f: !0, n: n, pg: !0, pr: h._priority }, a = h._overwriteProps.length; --a > -1;)
                        i[h._overwriteProps[a]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (o = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0);
                }
                else
                    this._firstPT = i[n] = l = { _next: this._firstPT, t: e, p: n, f: "function" == typeof e[n], n: n, pg: !1, pr: 0 }, l.s = l.f ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), l.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - l.s || 0;
                l && l._next && (l._next._prev = l);
            }
            return r && this._kill(r, e) ? this._initProps(e, i, s, r) : this._overwrite > 1 && this._firstPT && s.length > 1 && G(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (E[e._gsTweenID] = !0), o);
        }, n.render = function (t, e, i) {
            var s, r, n, a, o = this._time, h = this._duration, l = this._rawPrevTime;
            if (t >= h)
                this._totalTime = this._time = h, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete"), 0 === h && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > l || l === _) && l !== t && (i = !0, l > _ && (r = "onReverseComplete")), this._rawPrevTime = a = !e || t || l === t ? t : _);
            else if (1e-7 > t)
                this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === h && l > 0 && l !== _) && (r = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === h && (this._initted || !this.vars.lazy || i) && (l >= 0 && (i = !0), this._rawPrevTime = a = !e || t || l === t ? t : _)) : this._initted || (i = !0);
            else if (this._totalTime = this._time = t, this._easeType) {
                var u = t / h, p = this._easeType, c = this._easePower;
                (1 === p || 3 === p && u >= .5) && (u = 1 - u), 3 === p && (u *= 2), 1 === c ? u *= u : 2 === c ? u *= u * u : 3 === c ? u *= u * u * u : 4 === c && (u *= u * u * u * u), this.ratio = 1 === p ? 1 - u : 2 === p ? u : .5 > t / h ? u / 2 : 1 - u / 2;
            }
            else
                this.ratio = this._ease.getRatio(t / h);
            if (this._time !== o || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc)
                        return;
                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                        return this._time = this._totalTime = o, this._rawPrevTime = l, I.push(this), this._lazy = t, void 0;
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / h) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
                }
                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === h) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || y))), n = this._firstPT; n;)
                    n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || y)), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || y), 0 === h && this._rawPrevTime === _ && a !== _ && (this._rawPrevTime = 0));
            }
        }, n._kill = function (t, e) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target))
                return this._lazy = !1, this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
            var i, s, r, n, a, o, h, l;
            if ((c(e) || M(e)) && "number" != typeof e[0])
                for (i = e.length; --i > -1;)
                    this._kill(t, e[i]) && (o = !0);
            else {
                if (this._targets) {
                    for (i = this._targets.length; --i > -1;)
                        if (e === this._targets[i]) {
                            a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                            break;
                        }
                }
                else {
                    if (e !== this.target)
                        return !1;
                    a = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all";
                }
                if (a) {
                    h = t || a, l = t !== s && "all" !== s && t !== a && ("object" != typeof t || !t._tempKill);
                    for (r in h)
                        (n = a[r]) && (n.pg && n.t._kill(h) && (o = !0), n.pg && 0 !== n.t._overwriteProps.length || (n._prev ? n._prev._next = n._next : n === this._firstPT && (this._firstPT = n._next), n._next && (n._next._prev = n._prev), n._next = n._prev = null), delete a[r]), l && (s[r] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1);
                }
            }
            return o;
        }, n.invalidate = function () {
            return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = this._lazy = !1, this._propLookup = this._targets ? {} : [], this;
        }, n._enabled = function (t, e) {
            if (o || a.wake(), t && this._gc) {
                var i, s = this._targets;
                if (s)
                    for (i = s.length; --i > -1;)
                        this._siblings[i] = V(s[i], this, !0);
                else
                    this._siblings = V(this.target, this, !0);
            }
            return A.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? D._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1;
        }, D.to = function (t, e, i) {
            return new D(t, e, i);
        }, D.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new D(t, e, i);
        }, D.fromTo = function (t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new D(t, e, s);
        }, D.delayedCall = function (t, e, i, s, r) {
            return new D(e, 0, { delay: t, onComplete: e, onCompleteParams: i, onCompleteScope: s, onReverseComplete: e, onReverseCompleteParams: i, onReverseCompleteScope: s, immediateRender: !1, useFrames: r, overwrite: 0 });
        }, D.set = function (t, e) {
            return new D(t, 0, e);
        }, D.getTweensOf = function (t, e) {
            if (null == t)
                return [];
            t = "string" != typeof t ? t : D.selector(t) || t;
            var i, s, r, n;
            if ((c(t) || M(t)) && "number" != typeof t[0]) {
                for (i = t.length, s = []; --i > -1;)
                    s = s.concat(D.getTweensOf(t[i], e));
                for (i = s.length; --i > -1;)
                    for (n = s[i], r = i; --r > -1;)
                        n === s[r] && s.splice(i, 1);
            }
            else
                for (s = V(t).concat(), i = s.length; --i > -1;)
                    (s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
            return s;
        }, D.killTweensOf = D.killDelayedCallsTo = function (t, e, i) {
            "object" == typeof e && (i = e, e = !1);
            for (var s = D.getTweensOf(t, e), r = s.length; --r > -1;)
                s[r]._kill(i, t);
        };
        var Q = g("plugins.TweenPlugin", function (t, e) {
            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = Q.prototype;
        }, !0);
        if (n = Q.prototype, Q.version = "1.10.1", Q.API = 2, n._firstPT = null, n._addTween = function (t, e, i, s, r, n) {
            var a, o;
            return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = { _next: this._firstPT, t: t, p: e, s: i, c: a, f: "function" == typeof t[e], n: r || e, r: n }, o._next && (o._next._prev = o), o) : void 0;
        }, n.setRatio = function (t) {
            for (var e, i = this._firstPT, s = 1e-6; i;)
                e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next;
        }, n._kill = function (t) {
            var e, i = this._overwriteProps, s = this._firstPT;
            if (null != t[this._propName])
                this._overwriteProps = [];
            else
                for (e = i.length; --e > -1;)
                    null != t[i[e]] && i.splice(e, 1);
            for (; s;)
                null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
            return !1;
        }, n._roundProps = function (t, e) {
            for (var i = this._firstPT; i;)
                (t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next;
        }, D._onPluginEvent = function (t, e) {
            var i, s, r, n, a, o = e._firstPT;
            if ("_onInitAllProps" === t) {
                for (; o;) {
                    for (a = o._next, s = r; s && s.pr > o.pr;)
                        s = s._next;
                    (o._prev = s ? s._prev : n) ? o._prev._next = o : r = o, (o._next = s) ? s._prev = o : n = o, o = a;
                }
                o = e._firstPT = r;
            }
            for (; o;)
                o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
            return i;
        }, Q.activate = function (t) {
            for (var e = t.length; --e > -1;)
                t[e].API === Q.API && (F[(new t[e])._propName] = t[e]);
            return !0;
        }, d.plugin = function (t) {
            if (!(t && t.propName && t.init && t.API))
                throw "illegal plugin definition.";
            var e, i = t.propName, s = t.priority || 0, r = t.overwriteProps, n = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_roundProps", initAll: "_onInitAllProps" }, a = g("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                Q.call(this, i, s), this._overwriteProps = r || [];
            }, t.global === !0), o = a.prototype = new Q(i);
            o.constructor = a, a.API = t.API;
            for (e in n)
                "function" == typeof t[e] && (o[n[e]] = t[e]);
            return a.version = t.version, Q.activate([a]), a;
        }, s = t._gsQueue) {
            for (r = 0; s.length > r; r++)
                s[r]();
            for (n in f)
                f[n].func || t.console.log("GSAP encountered missing dependency: com.greensock." + n);
        }
        o = !1;
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
