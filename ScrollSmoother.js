/*!
 * ScrollSmoother 3.12.2
 * https://greensock.com
 * 
 * @license Copyright 2023, GreenSock. All rights reserved.
 * *** DO NOT DEPLOY THIS FILE ***
 * This is a trial version that only works locally and on domains like codepen.io and codesandbox.io.
 * Loading it on an unauthorized domain violates the license and will cause a redirect.
 * Get the unrestricted file by joining Club GreenSock at https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */

let e, t, r, o, s, i, n, a, l, c, d, h, f, g, p, u = () => "undefined" != typeof window,
    m = () => e || u() && (e = window.gsap) && e.registerPlugin && e,
    v = function () {
        return String.fromCharCode.apply(null, arguments)
    },
    y = "greensock.com",
    w = "gsap.com",
    b = /^(?:[-9]{1,3}\.){3}[-9]{1,3}:?\d*$/,
    S = (function (t) {
        var r = "undefined" != typeof window,
            o = 0 === (r ? window.location.href : "").indexOf("file://") || -1 !== t.indexOf("localhost") || b.test(t),
            s = [y, w, "codepen.io", "codepen.plumbing", "codepen.dev", "codepen.app", "codepen.website", "pens.cloud", "css-tricks.com", "cdpn.io", "pens.io", "gannon.tv", "codecanyon.net", "themeforest.net", "cerebrax.co.uk", "tympanus.net", "tweenmax.com", "plnkr.co", "hotjar.com", "webpackbin.com", "archive.org", "codesandbox.io", "csb.app", "stackblitz.com", "stackblitz.io", "codier.io", "motiontricks.com", "stackoverflow.com", "stackexchange.com", "studiofreight.com", "webcontainer.io", "jsfiddle.net"],
            i = function () {
                if (r)
                    if ("loading" === document.readyState || "interactive" === document.readyState) document.addEventListener("readystatechange", i);
                    else {
                        document.removeEventListener("readystatechange", i);
                        var t = "object" == typeof e ? e : r && window.gsap;
                        r && window.console && !window._gsapWarned && "object" == typeof t && !1 !== t.config().trialWarn && (console.log("%cWarning", "font-size:30px;color:red;"), console.log("A trial version of " + "ScrollSmoother" + " is loaded that only works locally and on domains like codepen.io and codesandbox.io. *** DO NOT DEPLOY THIS FILE *** Loading it on an unauthorized site violates the license and will cause a redirect. Please join Club GreenSock to get full access to the bonus plugins that boost your animation superpowers. Disable this warning with gsap.config({trialWarn: false});"), console.log("%cGet unrestricted files at https://greensock.com/club", "font-size:16px;color:#4e9815"), window._gsapWarned = 1)
                    }
            },
            n = s.length;
        for (setTimeout(i, 50); --n > -1;)
            if (-1 !== t.indexOf(s[n])) return true;
        o || setTimeout((function () {
            r && (window.location.href = "https://" + y + "/requires-membership/" + "?plugin=ScrollSmoother&source=trial")
        }), 4e3)
    }("undefined" != typeof window ? window.location.host : ""), e => l.maxScroll(e || r)),
    T = e => {
        let t = o.querySelector(".ScrollSmoother-wrapper");
        return t || (t = o.createElement("div"), t.classList.add("ScrollSmoother-wrapper"), e.parentNode.insertBefore(t, e), t.appendChild(e)), t
    };
class x {
    constructor(u) {
        t || x.register(e) || console.warn("Please gsap.registerPlugin(ScrollSmoother)"), u = this.vars = u || {}, c && c.kill(), c = this, g(this);
        let m, v, y, w, b, _, C, E, P, R, k, A, N, M, z, {
                smoothTouch: F,
                onUpdate: L,
                onStop: B,
                smooth: H,
                onFocusIn: O,
                normalizeScroll: I,
                wholePixels: U
            } = u,
            q = this,
            V = u.effectsPrefix || "",
            W = l.getScrollFunc(r),
            D = 1 === l.isTouch ? !0 === F ? .8 : parseFloat(F) || 0 : 0 === H || !1 === H ? 0 : parseFloat(H) || .8,
            j = D && +u.speed || 1,
            Y = 0,
            K = 0,
            $ = 1,
            G = h(0),
            J = () => G.update(-Y),
            Q = {
                y: 0
            },
            X = () => m.style.overflow = "visible",
            Z = e => {
                e.update();
                let t = e.getTween();
                t && (t.pause(), t._time = t._dur, t._tTime = t._tDur), M = false, e.animation.progress(e.progress, true)
            },
            ee = (e, t) => {
                (e !== Y && !R || t) && (U && (e = Math.round(e)), D && (m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + e + ", 0, 1)", m._gsap.y = e + "px"), K = e - Y, Y = e, l.isUpdating || x.isRefreshing || l.update())
            },
            te = function (e) {
                return arguments.length ? (e < 0 && (e = 0), Q.y = -e, M = true, R ? Y = -e : ee(-e), l.isRefreshing ? w.update() : W(e / j), this) : -Y
            },
            re = "undefined" != typeof ResizeObserver && !1 !== u.autoResize && new ResizeObserver(() => {
                if (!l.isRefreshing) {
                    let e = S(v) * j;
                    e < -Y && te(e), p.restart(true)
                }
            }),
            oe = e => {
                v.scrollTop = 0, e.target.contains && e.target.contains(v) || O && !1 === O(this, e) || (l.isInViewport(e.target) || e.target === z || this.scrollTo(e.target, false, "center center"), z = e.target)
            },
            se = (e, t) => {
                if (e < t.start) return e;
                let r = isNaN(t.ratio) ? 1 : t.ratio,
                    o = t.end - t.start,
                    s = e - t.start,
                    i = t.offset || 0,
                    n = t.pins || [],
                    a = n.offset || 0,
                    l = t._startClamp && t.start <= 0 || t.pins && t.pins.offset ? 0 : t._endClamp && t.end === S() ? 1 : .5;
                return n.forEach(t => {
                    o -= t.distance, t.nativeStart <= e && (s -= t.distance)
                }), a && (s *= (o - a / r) / o), e + (s - i * l) / r - s
            },
            ie = (t, r, o) => {
                o || (t.pins.length = t.pins.offset = 0);
                let s, i, n, a, l, c, d, h, f = t.pins,
                    g = t.markers;
                for (d = 0; d < r.length; d++)
                    if (h = r[d], t.trigger && h.trigger && t !== h && (h.trigger === t.trigger || h.pinnedContainer === t.trigger || t.trigger.contains(h.trigger)) && (l = h._startNative || h._startClamp || h.start, c = h._endNative || h._endClamp || h.end, n = se(l, t), a = h.pin && c > 0 ? n + (c - l) : se(c, t), h.setPositions(n, a, true, (h._startClamp ? Math.max(0, n) : n) - l), h.markerStart && g.push(e.quickSetter([h.markerStart, h.markerEnd], "y", "px")), h.pin && h.end > 0 && !o)) {
                        if (s = h.end - h.start, i = t._startClamp && h.start < 0, i) {
                            if (t.start > 0) return t.setPositions(0, t.end + (t._startNative - t.start), true), void ie(t, r);
                            s += h.start, f.offset = -h.start
                        }
                        f.push({
                            start: h.start,
                            nativeStart: l,
                            end: h.end,
                            distance: s,
                            trig: h
                        }), t.setPositions(t.start, t.end + (i ? -h.start : s), true)
                    }
            },
            ne = (e, t) => {
                b.forEach(r => ie(r, e, t))
            },
            ae = () => {
                X(), requestAnimationFrame(X), b && (l.getAll().forEach(e => {
                    e._startNative = e.start, e._endNative = e.end
                }), b.forEach(e => {
                    let t = e._startClamp || e.start,
                        r = e.autoSpeed ? Math.min(S(), e.end) : t + Math.abs((e.end - t) / e.ratio),
                        o = r - e.end;
                    if (t -= o / 2, r -= o / 2, t > r) {
                        let e = t;
                        t = r, r = e
                    }
                    e._startClamp && t < 0 ? (r = e.ratio < 0 ? S() : e.end / e.ratio, o = r - e.end, t = 0) : (e.ratio < 0 || e._endClamp && r >= S()) && (r = S(), t = e.ratio < 0 || e.ratio > 1 ? 0 : r - (r - e.start) / e.ratio, o = (r - t) * e.ratio - (e.end - e.start)), e.offset = o || 1e-4, e.pins.length = e.pins.offset = 0, e.setPositions(t, r, true)
                }), ne(l.sort())), G.reset()
            },
            le = () => l.addEventListener("refresh", ae),
            ce = () => b && b.forEach(e => e.vars.onRefresh(e)),
            de = () => (b && b.forEach(e => e.vars.onRefreshInit(e)), ce),
            he = (e, t, r, o) => () => {
                let s = "function" == typeof t ? t(r, o) : t;
                s || 0 === s || (s = o.getAttribute("data-" + V + e) || ("speed" === e ? 1 : 0)), o.setAttribute("data-" + V + e, s);
                let i = "clamp(" === (s + "").substr(0, 6);
                return {
                    clamp: i,
                    value: i ? s.substr(6, s.length - 7) : s
                }
            },
            fe = (t, o, i, n, c) => {
                c = ("function" == typeof c ? c(n, t) : c) || 0;
                let h, f, g, p, u, m, y = he("speed", o, n, t),
                    w = he("lag", i, n, t),
                    T = e.getProperty(t, "y"),
                    x = t._gsap,
                    _ = [],
                    C = () => {
                        o = y(), i = parseFloat(w().value), h = parseFloat(o.value) || 1, g = "auto" === o.value, u = g || f && f._startClamp && f.start <= 0 || _.offset ? 0 : f && f._endClamp && f.end === S() ? 1 : .5, p && p.kill(), p = i && e.to(t, {
                            ease: d,
                            overwrite: false,
                            y: "+=0",
                            duration: i
                        }), f && (f.ratio = h, f.autoSpeed = g)
                    },
                    E = () => {
                        x.y = T + "px", x.renderTransform(1), C()
                    },
                    P = [],
                    R = 0,
                    k = e => {
                        if (g) {
                            E();
                            let o = ((e, t) => {
                                let o, i, n = e.parentNode || s,
                                    a = e.getBoundingClientRect(),
                                    l = n.getBoundingClientRect(),
                                    c = l.top - a.top,
                                    d = l.bottom - a.bottom,
                                    h = (Math.abs(c) > Math.abs(d) ? c : d) / (1 - t),
                                    f = -h * t;
                                return h > 0 && (o = l.height / (r.innerHeight + l.height), i = .5 === o ? 2 * l.height : 2 * Math.min(l.height, Math.abs(-h * o / (2 * o - 1))) * (t || 1), f += t ? -i * t : -i / 2, h += i), {
                                    change: h,
                                    offset: f
                                }
                            })(t, a(0, 1, -e.start / (e.end - e.start)));
                            R = o.change, m = o.offset
                        } else m = _.offset || 0, R = (e.end - e.start - m) * (1 - h);
                        _.forEach(e => R -= e.distance * (1 - h)), e.offset = R || .001, e.vars.onUpdate(e), p && p.progress(1)
                    };
                return C(), (1 !== h || g || p) && (f = l.create({
                    trigger: g ? t.parentNode : t,
                    start: () => o.clamp ? "clamp(top bottom+=" + c + ")" : "top bottom+=" + c,
                    end: () => o.value < 0 ? "max" : o.clamp ? "clamp(bottom top-=" + c + ")" : "bottom top-=" + c,
                    scroller: v,
                    scrub: true,
                    refreshPriority: -999,
                    onRefreshInit: E,
                    onRefresh: k,
                    onKill: e => {
                        let t = b.indexOf(e);
                        t >= 0 && b.splice(t, 1), E()
                    },
                    onUpdate: t => {
                        let r, o, s, i = T + R * (t.progress - u),
                            n = _.length,
                            a = 0;
                        if (t.offset) {
                            if (n) {
                                for (o = -Y, s = t.end; n--;) {
                                    if (r = _[n], r.trig.isActive || o >= r.start && o <= r.end) return void(p && (r.trig.progress += r.trig.direction < 0 ? .001 : -.001, r.trig.update(0, 0, 1), p.resetTo("y", parseFloat(x.y), -K, true), $ && p.progress(1)));
                                    o > r.end && (a += r.distance), s -= r.distance
                                }
                                i = T + a + R * ((e.utils.clamp(t.start, t.end, o) - t.start - a) / (s - t.start) - u)
                            }
                            P.length && !g && P.forEach(e => e(i - a)), l = i + m, i = Math.round(1e5 * l) / 1e5 || 0, p ? (p.resetTo("y", i, -K, true), $ && p.progress(1)) : (x.y = i + "px", x.renderTransform(1))
                        }
                        var l
                    }
                }), k(f), e.core.getCache(f.trigger).stRevert = de, f.startY = T, f.pins = _, f.markers = P, f.ratio = h, f.autoSpeed = g, t.style.willChange = "transform"), f
            };
        function ge() {
            return y = m.clientHeight, m.style.overflow = "visible", i.style.height = r.innerHeight + (y - r.innerHeight) / j + "px", y - r.innerHeight
        }
        le(), l.addEventListener("killAll", le), e.delayedCall(.5, () => $ = 0), this.scrollTop = te, this.scrollTo = (t, r, o) => {
            let s = e.utils.clamp(0, S(), isNaN(t) ? this.offset(t, o) : +t);
            r ? R ? e.to(this, {
                duration: D,
                scrollTop: s,
                overwrite: "auto",
                ease: d
            }) : W(s) : te(s)
        }, this.offset = (t, r) => {
            let o, s = (t = n(t)[0]).style.cssText,
                i = l.create({
                    trigger: t,
                    start: r || "top top"
                });
            return b && ($ ? l.refresh() : ne([i], true)), o = i.start / j, i.kill(false), t.style.cssText = s, e.core.getCache(t).uncache = 1, o
        }, this.content = function (t) {
            if (arguments.length) {
                let r = n(t || "#smooth-content")[0] || console.warn("ScrollSmoother needs a valid content element.") || i.children[0];
                return r !== m && (m = r, P = m.getAttribute("style") || "", re && re.observe(m), e.set(m, {
                    overflow: "visible",
                    width: "100%",
                    boxSizing: "border-box",
                    y: "+=0"
                }), D || e.set(m, {
                    clearProps: "transform"
                })), this
            }
            return m
        }, this.wrapper = function (t) {
            return arguments.length ? (v = n(t || "#smooth-wrapper")[0] || T(m), E = v.getAttribute("style") || "", ge(), e.set(v, D ? {
                overflow: "hidden",
                position: "fixed",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            } : {
                overflow: "visible",
                position: "relative",
                width: "100%",
                height: "auto",
                top: "auto",
                bottom: "auto",
                left: "auto",
                right: "auto"
            }), this) : v
        }, this.effects = (e, t) => {
            if (b || (b = []), !e) return b.slice(0);
            (e = n(e)).forEach(e => {
                let t = b.length;
                for (; t--;) b[t].trigger === e && b[t].kill()
            }), t = t || {};
            let r, o, {
                    speed: s,
                    lag: i,
                    effectsPadding: a
                } = t,
                l = [];
            for (r = 0; r < e.length; r++) o = fe(e[r], s, i, r, a), o && l.push(o);
            return b.push(...l), l
        }, this.sections = (e, t) => {
            if (_ || (_ = []), !e) return _.slice(0);
            let r = n(e).map(e => l.create({
                trigger: e,
                start: "top 120%",
                end: "bottom -20%",
                onToggle: t => {
                    e.style.opacity = t.isActive ? "1" : "0", e.style.pointerEvents = t.isActive ? "all" : "none"
                }
            }));
            return t && t.add ? _.push(...r) : _ = r.slice(0), r
        }, this.content(u.content), this.wrapper(u.wrapper), this.render = e => ee(e || 0 === e ? e : Y), this.getVelocity = () => G.getVelocity(-Y), l.scrollerProxy(v, {
            scrollTop: te,
            scrollHeight: () => ge() && i.scrollHeight,
            fixedMarkers: !1 !== u.fixedMarkers && !!D,
            content: m,
            getBoundingClientRect: () => ({
                top: 0,
                left: 0,
                width: r.innerWidth,
                height: r.innerHeight
            })
        }), l.defaults({
            scroller: v
        });
        let pe = l.getAll().filter(e => e.scroller === r || e.scroller === v);
        pe.forEach(e => e.revert(true, true)), w = l.create({
            animation: e.fromTo(Q, {
                y: 0
            }, {
                y: () => -ge(),
                immediateRender: false,
                ease: "none",
                data: "ScrollSmoother",
                duration: 100,
                onUpdate: function () {
                    if (this._dur) {
                        let e = M;
                        e && (Z(w), Q.y = Y), ee(Q.y, e), J(), L && !R && L(q)
                    }
                }
            }),
            onRefreshInit: e => {
                if (x.isRefreshing) return;
                if (x.isRefreshing = true, b) {
                    let e = l.getAll().filter(e => !!e.pin);
                    b.forEach(t => {
                        t.vars.pinnedContainer || e.forEach(e => {
                            if (e.pin.contains(t.trigger)) {
                                let r = t.vars;
                                r.pinnedContainer = e.pin, t.vars = null, t.init(r, t.animation)
                            }
                        })
                    })
                }
                let t = e.getTween();
                N = t && t._end > t._dp._time, A = Y, Q.y = 0, D && (1 === l.isTouch && (v.style.position = "absolute"), v.scrollTop = 0, 1 === l.isTouch && (v.style.position = "fixed"))
            },
            onRefresh: t => {
                t.animation.invalidate(), t.setPositions(t.start, ge() / j), N || Z(t), Q.y = -W() * j, ee(Q.y), $ || t.animation.progress(e.utils.clamp(0, 1, A / j / -t.end)), N && (t.progress -= .001, t.update()), x.isRefreshing = false
            },
            id: "ScrollSmoother",
            scroller: r,
            invalidateOnRefresh: true,
            start: 0,
            refreshPriority: -9999,
            end: () => ge() / j,
            onScrubComplete: () => {
                G.reset(), B && B(this)
            },
            scrub: D || true
        }), this.smooth = function (e) {
            return arguments.length && (D = e || 0, j = D && +u.speed || 1, w.scrubDuration(e)), w.getTween() ? w.getTween().duration() : 0
        }, w.getTween() && (w.getTween().vars.ease = u.ease || d), this.scrollTrigger = w, u.effects && this.effects(!0 === u.effects ? "[data-" + V + "speed], [data-" + V + "lag]" : u.effects, {
            effectsPadding: u.effectsPadding
        }), u.sections && this.sections(!0 === u.sections ? "[data-section]" : u.sections), pe.forEach(e => {
            e.vars.scroller = v, e.revert(false, true), e.init(e.vars, e.animation)
        }), this.paused = function (e, t) {
            return arguments.length ? (!!R !== e && (e ? (w.getTween() && w.getTween().pause(), W(-Y / j), G.reset(), k = l.normalizeScroll(), k && k.disable(), R = l.observe({
                preventDefault: true,
                type: "wheel,touch,scroll",
                debounce: false,
                allowClicks: true,
                onChangeY: () => te(-Y)
            }), R.nested = f(s, "wheel,touch,scroll", true, !1 !== t)) : (R.nested.kill(), R.kill(), R = 0, k && k.enable(), w.progress = (-Y / j - w.start) / (w.end - w.start), Z(w))), this) : !!R
        }, this.kill = this.revert = () => {
            this.paused(false), Z(w), w.kill();
            let e = (b || []).concat(_ || []),
                t = e.length;
            for (; t--;) e[t].kill();
            l.scrollerProxy(v), l.removeEventListener("killAll", le), l.removeEventListener("refresh", ae), v.style.cssText = E, m.style.cssText = P;
            let o = l.defaults({});
            o && o.scroller === v && l.defaults({
                scroller: r
            }), this.normalizer && l.normalizeScroll(false), clearInterval(C), c = null, re && re.disconnect(), i.style.removeProperty("height"), r.removeEventListener("focusin", oe)
        }, this.refresh = (e, t) => w.refresh(e, t), I && (this.normalizer = l.normalizeScroll(!0 === I ? {
            debounce: true,
            content: !D && m
        } : I)), l.config(u), "overscrollBehavior" in r.getComputedStyle(i) && e.set([i, s], {
            overscrollBehavior: "none"
        }), "scrollBehavior" in r.getComputedStyle(i) && e.set([i, s], {
            scrollBehavior: "auto"
        }), r.addEventListener("focusin", oe), C = setInterval(J, 250), "loading" === o.readyState || requestAnimationFrame(() => l.refresh())
    }
    get progress() {
        return this.scrollTrigger ? this.scrollTrigger.animation._time / 100 : 0
    }
    static register(v) {
        return t || (e = v || m(), u() && window.document && (r = window, o = document, s = o.documentElement, i = o.body), e && (n = e.utils.toArray, a = e.utils.clamp, d = e.parseEase("expo"), g = e.core.context || function () {}, l = e.core.globals().ScrollTrigger, e.core.globals("ScrollSmoother", x), i && l && (p = e.delayedCall(.2, () => l.isRefreshing || c && c.refresh()).pause(), h = l.core._getVelocityProp, f = l.core._inputObserver, x.refresh = l.refresh, t = 1))), t
    }
}
x.version = "3.12.2", x.create = e => c && e && c.content() === n(e.content)[0] ? c : new x(e), x.get = () => c, m() && e.registerPlugin(x);
export default x;
export {
    x as ScrollSmoother
};
