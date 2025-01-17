(function () {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]')) l(r);
    new MutationObserver(r => {
      for (const i of r)
        if (i.type === "childList")
          for (const f of i.addedNodes) f.tagName === "LINK" && f.rel === "modulepreload" && l(f)
    }).observe(document, {
      childList: !0,
      subtree: !0
    });
  
    function n(r) {
      const i = {};
      return r.integrity && (i.integrity = r.integrity), r.referrerpolicy && (i.referrerPolicy = r.referrerpolicy), r.crossorigin === "use-credentials" ? i.credentials = "include" : r.crossorigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
    }
  
    function l(r) {
      if (r.ep) return;
      r.ep = !0;
      const i = n(r);
      fetch(r.href, i)
    }
  })();
  
  function E() { }
  const Je = t => t;
  
  function J(t, e) {
    for (const n in e) t[n] = e[n];
    return t
  }
  
  function Re(t) {
    return t()
  }
  
  function pe() {
    return Object.create(null)
  }
  
  function G(t) {
    t.forEach(Re)
  }
  
  function Oe(t) {
    return typeof t == "function"
  }
  
  function V(t, e) {
    return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function"
  }
  
  function Qe(t) {
    return Object.keys(t).length === 0
  }
  const De = typeof window < "u";
  let Xe = De ? () => window.performance.now() : () => Date.now(),
    me = De ? t => requestAnimationFrame(t) : E;
  const K = new Set;
  
  function ze(t) {
    K.forEach(e => {
      e.c(t) || (K.delete(e), e.f())
    }), K.size !== 0 && me(ze)
  }
  
  function Ye(t) {
    let e;
    return K.size === 0 && me(ze), {
      promise: new Promise(n => {
        K.add(e = {
          c: t,
          f: n
        })
      }),
      abort() {
        K.delete(e)
      }
    }
  }
  
  function h(t, e) {
    t.appendChild(e)
  }
  
  function Ve(t) {
    if (!t) return document;
    const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
    return e && e.host ? e : t.ownerDocument
  }
  
  function Ze(t) {
    const e = p("style");
    return xe(Ve(t), e), e.sheet
  }
  
  function xe(t, e) {
    return h(t.head || t, e), e.sheet
  }
  
  function H(t, e, n) {
    t.insertBefore(e, n || null)
  }
  
  function j(t) {
    t.parentNode.removeChild(t)
  }
  
  function $e(t, e) {
    for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e)
  }
  
  function p(t) {
    return document.createElement(t)
  }
  
  function et(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t)
  }
  
  function O(t) {
    return document.createTextNode(t)
  }
  
  function S() {
    return O(" ")
  }
  
  function Be() {
    return O("")
  }
  
  function ce(t, e, n, l) {
    return t.addEventListener(e, n, l), () => t.removeEventListener(e, n, l)
  }
  
  function tt(t) {
    return function (e) {
      return e.preventDefault(), t.call(this, e)
    }
  }
  
  function m(t, e, n) {
    n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
  }
  
  function nt(t) {
    return Array.from(t.childNodes)
  }
  
  function be(t, e) {
    e = "" + e, t.wholeText !== e && (t.data = e)
  }
  
  function ke(t, e) {
    t.value = e == null ? "" : e
  }
  
  function A(t, e, n, l) {
    n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, l ? "important" : "")
  }
  
  function y(t, e, n) {
    t.classList[n ? "add" : "remove"](e)
  }
  
  function it(t, e, {
    bubbles: n = !1,
    cancelable: l = !1
  } = {}) {
    const r = document.createEvent("CustomEvent");
    return r.initCustomEvent(t, n, l, e), r
  }
  class Q {
    constructor(e = !1) {
      this.is_svg = !1, this.is_svg = e, this.e = this.n = null
    }
    c(e) {
      this.h(e)
    }
    m(e, n, l = null) {
      this.e || (this.is_svg ? this.e = et(n.nodeName) : this.e = p(n.nodeName), this.t = n, this.c(e)), this.i(l)
    }
    h(e) {
      this.e.innerHTML = e, this.n = Array.from(this.e.childNodes)
    }
    i(e) {
      for (let n = 0; n < this.n.length; n += 1) H(this.t, this.n[n], e)
    }
    p(e) {
      this.d(), this.h(e), this.i(this.a)
    }
    d() {
      this.n.forEach(j)
    }
  }
  const re = new Map;
  let oe = 0;
  
  function lt(t) {
    let e = 5381,
      n = t.length;
    for (; n--;) e = (e << 5) - e ^ t.charCodeAt(n);
    return e >>> 0
  }
  
  function ft(t, e) {
    const n = {
      stylesheet: Ze(e),
      rules: {}
    };
    return re.set(t, n), n
  }
  
  function ye(t, e, n, l, r, i, f, o = 0) {
    const s = 16.666 / l;
    let u = `{
  `;
    for (let k = 0; k <= 1; k += s) {
      const g = e + (n - e) * i(k);
      u += k * 100 + `%{${f(g, 1 - g)}}
  `
    }
    const c = u + `100% {${f(n, 1 - n)}}
  }`,
      a = `__svelte_${lt(c)}_${o}`,
      d = Ve(t),
      {
        stylesheet: _,
        rules: T
      } = re.get(d) || ft(d, t);
    T[a] || (T[a] = !0, _.insertRule(`@keyframes ${a} ${c}`, _.cssRules.length));
    const L = t.style.animation || "";
    return t.style.animation = `${L ? `${L}, ` : ""}${a} ${l}ms linear ${r}ms 1 both`, oe += 1, a
  }
  
  function rt(t, e) {
    const n = (t.style.animation || "").split(", "),
      l = n.filter(e ? i => i.indexOf(e) < 0 : i => i.indexOf("__svelte") === -1),
      r = n.length - l.length;
    r && (t.style.animation = l.join(", "), oe -= r, oe || ot())
  }
  
  function ot() {
    me(() => {
      oe || (re.forEach(t => {
        const {
          ownerNode: e
        } = t.stylesheet;
        e && j(e)
      }), re.clear())
    })
  }
  let ee;
  
  function $(t) {
    ee = t
  }
  
  function Ue() {
    if (!ee) throw new Error("Function called outside component initialization");
    return ee
  }
  
  function qe(t) {
    Ue().$$.on_mount.push(t)
  }
  
  function st(t) {
    Ue().$$.on_destroy.push(t)
  }
  
  function ct(t, e) {
    const n = t.$$.callbacks[e.type];
    n && n.slice().forEach(l => l.call(this, e))
  }
  const x = [],
    se = [],
    le = [],
    we = [],
    ut = Promise.resolve();
  let de = !1;
  
  function at() {
    de || (de = !0, ut.then(Fe))
  }
  
  function te(t) {
    le.push(t)
  }
  const ue = new Set;
  let ie = 0;
  
  function Fe() {
    const t = ee;
    do {
      for (; ie < x.length;) {
        const e = x[ie];
        ie++ , $(e), dt(e.$$)
      }
      for ($(null), x.length = 0, ie = 0; se.length;) se.pop()();
      for (let e = 0; e < le.length; e += 1) {
        const n = le[e];
        ue.has(n) || (ue.add(n), n())
      }
      le.length = 0
    } while (x.length);
    for (; we.length;) we.pop()();
    de = !1, ue.clear(), $(t)
  }
  
  function dt(t) {
    if (t.fragment !== null) {
      t.update(), G(t.before_update);
      const e = t.dirty;
      t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(te)
    }
  }
  let Z;
  
  function mt() {
    return Z || (Z = Promise.resolve(), Z.then(() => {
      Z = null
    })), Z
  }
  
  function ae(t, e, n) {
    t.dispatchEvent(it(`${e ? "intro" : "outro"}${n}`))
  }
  const fe = new Set;
  let z;
  
  function he() {
    z = {
      r: 0,
      c: [],
      p: z
    }
  }
  
  function _e() {
    z.r || G(z.c), z = z.p
  }
  
  function P(t, e) {
    t && t.i && (fe.delete(t), t.i(e))
  }
  
  function R(t, e, n, l) {
    if (t && t.o) {
      if (fe.has(t)) return;
      fe.add(t), z.c.push(() => {
        fe.delete(t), l && (n && t.d(1), l())
      }), t.o(e)
    } else l && l()
  }
  const ht = {
    duration: 0
  };
  
  function ve(t, e, n, l) {
    let r = e(t, n),
      i = l ? 0 : 1,
      f = null,
      o = null,
      s = null;
  
    function u() {
      s && rt(t, s)
    }
  
    function c(d, _) {
      const T = d.b - i;
      return _ *= Math.abs(T), {
        a: i,
        b: d.b,
        d: T,
        duration: _,
        start: d.start,
        end: d.start + _,
        group: d.group
      }
    }
  
    function a(d) {
      const {
        delay: _ = 0,
        duration: T = 300,
        easing: L = Je,
        tick: k = E,
        css: g
      } = r || ht, b = {
        start: Xe() + _,
        b: d
      };
      d || (b.group = z, z.r += 1), f || o ? o = b : (g && (u(), s = ye(t, i, d, T, _, L, g)), d && k(0, 1), f = c(b, T), te(() => ae(t, d, "start")), Ye(D => {
        if (o && D > o.start && (f = c(o, T), o = null, ae(t, f.b, "start"), g && (u(), s = ye(t, i, f.b, f.duration, 0, L, r.css))), f) {
          if (D >= f.end) k(i = f.b, 1 - i), ae(t, f.b, "end"), o || (f.b ? u() : --f.group.r || G(f.group.c)), f = null;
          else if (D >= f.start) {
            const C = D - f.start;
            i = f.a + f.d * L(C / f.duration), k(i, 1 - i)
          }
        }
        return !!(f || o)
      }))
    }
    return {
      run(d) {
        Oe(r) ? mt().then(() => {
          r = r(), a(d)
        }) : a(d)
      },
      end() {
        u(), f = o = null
      }
    }
  }
  
  function X(t, e) {
    const n = {},
      l = {},
      r = {
        $$scope: 1
      };
    let i = t.length;
    for (; i--;) {
      const f = t[i],
        o = e[i];
      if (o) {
        for (const s in f) s in o || (l[s] = 1);
        for (const s in o) r[s] || (n[s] = o[s], r[s] = 1);
        t[i] = o
      } else
        for (const s in f) r[s] = 1
    }
    for (const f in l) f in n || (n[f] = void 0);
    return n
  }
  
  function Y(t) {
    return typeof t == "object" && t !== null ? t : {}
  }
  
  function W(t) {
    t && t.c()
  }
  
  function B(t, e, n, l) {
    const {
      fragment: r,
      on_mount: i,
      on_destroy: f,
      after_update: o
    } = t.$$;
    r && r.m(e, n), l || te(() => {
      const s = i.map(Re).filter(Oe);
      f ? f.push(...s) : G(s), t.$$.on_mount = []
    }), o.forEach(te)
  }
  
  function U(t, e) {
    const n = t.$$;
    n.fragment !== null && (G(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = [])
  }
  
  function _t(t, e) {
    t.$$.dirty[0] === -1 && (x.push(t), at(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31
  }
  
  function q(t, e, n, l, r, i, f, o = [-1]) {
    const s = ee;
    $(t);
    const u = t.$$ = {
      fragment: null,
      ctx: null,
      props: i,
      update: E,
      not_equal: r,
      bound: pe(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(e.context || (s ? s.$$.context : [])),
      callbacks: pe(),
      dirty: o,
      skip_bound: !1,
      root: e.target || s.$$.root
    };
    f && f(u.root);
    let c = !1;
    if (u.ctx = n ? n(t, e.props || {}, (a, d, ..._) => {
      const T = _.length ? _[0] : d;
      return u.ctx && r(u.ctx[a], u.ctx[a] = T) && (!u.skip_bound && u.bound[a] && u.bound[a](T), c && _t(t, a)), d
    }) : [], u.update(), c = !0, G(u.before_update), u.fragment = l ? l(u.ctx) : !1, e.target) {
      if (e.hydrate) {
        const a = nt(e.target);
        u.fragment && u.fragment.l(a), a.forEach(j)
      } else u.fragment && u.fragment.c();
      e.intro && P(t.$$.fragment), B(t, e.target, e.anchor, e.customElement), Fe()
    }
    $(s)
  }
  class F {
    $destroy() {
      U(this, 1), this.$destroy = E
    }
    $on(e, n) {
      const l = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
      return l.push(n), () => {
        const r = l.indexOf(n);
        r !== -1 && l.splice(r, 1)
      }
    }
    $set(e) {
      this.$$set && !Qe(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1)
    }
  }
  
  function gt(t) {
    const e = t - 1;
    return e * e * e + 1
  }
  
  function Te(t, {
    delay: e = 0,
    duration: n = 400,
    easing: l = gt,
    x: r = 0,
    y: i = 0,
    opacity: f = 0
  } = {}) {
    const o = getComputedStyle(t),
      s = +o.opacity,
      u = o.transform === "none" ? "" : o.transform,
      c = s * (1 - f);
    return {
      delay: e,
      duration: n,
      easing: l,
      css: (a, d) => `
              transform: ${u} translate(${(1 - a) * r}px, ${(1 - a) * i}px);
              opacity: ${s - c * d}`
    }
  }
  
  function Le(t) {
    let e, n, l;
    return {
      c() {
        e = p("p"), n = new Q(!1), l = O("\xA0|\xA0"), n.a = l, m(e, "id", "emoji")
      },
      m(r, i) {
        H(r, e, i), n.m(t[1], e), h(e, l)
      },
      p(r, i) {
        i & 2 && n.p(r[1])
      },
      d(r) {
        r && j(e)
      }
    }
  }
  
  function Me(t) {
    let e;
    return {
      c() {
        e = p("p"), m(e, "id", "rightLabel"), m(e, "class", "ml-auto mr-0")
      },
      m(n, l) {
        H(n, e, l), e.innerHTML = t[3]
      },
      p(n, l) {
        l & 8 && (e.innerHTML = n[3])
      },
      d(n) {
        n && j(e)
      }
    }
  }
  
  function pt(t) {
    let e, n, l, r, i = t[1] && Le(t),
      f = t[3] && Me(t);
    return {
      c() {
        e = p("div"), i && i.c(), n = S(), l = p("p"), r = S(), f && f.c(), m(l, "id", "content"), m(e, "class", "flex pl-2 pr-2 pt-1 pb-1"), y(e, "disabled", t[2])
      },
      m(o, s) {
        H(o, e, s), i && i.m(e, null), h(e, n), h(e, l), l.innerHTML = t[0], h(e, r), f && f.m(e, null)
      },
      p(o, [s]) {
        o[1] ? i ? i.p(o, s) : (i = Le(o), i.c(), i.m(e, n)) : i && (i.d(1), i = null), s & 1 && (l.innerHTML = o[0]), o[3] ? f ? f.p(o, s) : (f = Me(o), f.c(), f.m(e, null)) : f && (f.d(1), f = null), s & 4 && y(e, "disabled", o[2])
      },
      i: E,
      o: E,
      d(o) {
        o && j(e), i && i.d(), f && f.d()
      }
    }
  }
  
  function bt(t, e, n) {
    let {
      text: l
    } = e, {
      emoji: r = void 0
    } = e, {
      disabled: i = !1
    } = e, {
      rightText: f = void 0
    } = e;
    return t.$$set = o => {
      "text" in o && n(0, l = o.text), "emoji" in o && n(1, r = o.emoji), "disabled" in o && n(2, i = o.disabled), "rightText" in o && n(3, f = o.rightText)
    }, [l, r, i, f]
  }
  class kt extends F {
    constructor(e) {
      super(), q(this, e, bt, pt, V, {
        text: 0,
        emoji: 1,
        disabled: 2,
        rightText: 3
      })
    }
  }
  
  function je(t) {
    let e, n, l;
    return {
      c() {
        e = p("p"), n = new Q(!1), l = O("\xA0|\xA0"), n.a = l, m(e, "id", "emoji")
      },
      m(r, i) {
        H(r, e, i), n.m(t[1], e), h(e, l)
      },
      p(r, i) {
        i & 2 && n.p(r[1])
      },
      d(r) {
        r && j(e)
      }
    }
  }
  
  function yt(t) {
    let e, n, l, r, i, f = t[1] && je(t);
    return {
      c() {
        e = p("div"), f && f.c(), n = S(), l = p("p"), r = S(), i = p("input"), m(l, "id", "content"), m(i, "id", "input"), m(i, "type", "range"), m(i, "min", t[4]), m(i, "max", t[5]), i.value = t[3], m(i, "class", "ml-auto mr-1 svelte-remtfg"), y(i, "selected", t[6]), m(e, "class", "flex pl-2 pr-2 pt-1 pb-1 items-center"), y(e, "disabled", t[2])
      },
      m(o, s) {
        H(o, e, s), f && f.m(e, null), h(e, n), h(e, l), l.innerHTML = t[0], h(e, r), h(e, i)
      },
      p(o, [s]) {
        o[1] ? f ? f.p(o, s) : (f = je(o), f.c(), f.m(e, n)) : f && (f.d(1), f = null), s & 1 && (l.innerHTML = o[0]), s & 16 && m(i, "min", o[4]), s & 32 && m(i, "max", o[5]), s & 8 && (i.value = o[3]), s & 64 && y(i, "selected", o[6]), s & 4 && y(e, "disabled", o[2])
      },
      i: E,
      o: E,
      d(o) {
        o && j(e), f && f.d()
      }
    }
  }
  
  function wt(t, e, n) {
    let {
      text: l
    } = e, {
      emoji: r = void 0
    } = e, {
      disabled: i = !1
    } = e, {
      currentSelection: f = 5
    } = e, {
      min: o = 0
    } = e, {
      max: s = 5
    } = e, {
      selected: u = !1
    } = e;
    return t.$$set = c => {
      "text" in c && n(0, l = c.text), "emoji" in c && n(1, r = c.emoji), "disabled" in c && n(2, i = c.disabled), "currentSelection" in c && n(3, f = c.currentSelection), "min" in c && n(4, o = c.min), "max" in c && n(5, s = c.max), "selected" in c && n(6, u = c.selected)
    }, [l, r, i, f, o, s, u]
  }
  class vt extends F {
    constructor(e) {
      super(), q(this, e, wt, yt, V, {
        text: 0,
        emoji: 1,
        disabled: 2,
        currentSelection: 3,
        min: 4,
        max: 5,
        selected: 6
      })
    }
  }
  
  function Ie(t) {
    let e, n, l;
    return {
      c() {
        e = p("p"), n = new Q(!1), l = O("\xA0|\xA0"), n.a = l, m(e, "id", "emoji")
      },
      m(r, i) {
        H(r, e, i), n.m(t[1], e), h(e, l)
      },
      p(r, i) {
        i & 2 && n.p(r[1])
      },
      d(r) {
        r && j(e)
      }
    }
  }
  
  function Tt(t) {
    let e, n, l, r, i, f = t[1] && Ie(t);
    return {
      c() {
        e = p("div"), f && f.c(), n = S(), l = p("p"), r = S(), i = p("div"), m(l, "id", "content"), m(i, "class", "ml-auto mr-1 checkbox svelte-hgesf7"), y(i, "checked", t[3]), y(i, "unchecked", t[3] == !1), m(e, "class", "flex pl-2 pr-2 pt-1 pb-1"), y(e, "disabled", t[2])
      },
      m(o, s) {
        H(o, e, s), f && f.m(e, null), h(e, n), h(e, l), l.innerHTML = t[0], h(e, r), h(e, i)
      },
      p(o, [s]) {
        o[1] ? f ? f.p(o, s) : (f = Ie(o), f.c(), f.m(e, n)) : f && (f.d(1), f = null), s & 1 && (l.innerHTML = o[0]), s & 8 && y(i, "checked", o[3]), s & 8 && y(i, "unchecked", o[3] == !1), s & 4 && y(e, "disabled", o[2])
      },
      i: E,
      o: E,
      d(o) {
        o && j(e), f && f.d()
      }
    }
  }
  
  function Lt(t, e, n) {
    let {
      text: l
    } = e, {
      emoji: r = void 0
    } = e, {
      disabled: i = !1
    } = e, {
      checked: f = !1
    } = e;
    return t.$$set = o => {
      "text" in o && n(0, l = o.text), "emoji" in o && n(1, r = o.emoji), "disabled" in o && n(2, i = o.disabled), "checked" in o && n(3, f = o.checked)
    }, [l, r, i, f]
  }
  class Mt extends F {
    constructor(e) {
      super(), q(this, e, Lt, Tt, V, {
        text: 0,
        emoji: 1,
        disabled: 2,
        checked: 3
      })
    }
  }
  
  function Ce(t) {
    let e, n, l;
    return {
      c() {
        e = p("p"), n = new Q(!1), l = O("\xA0|\xA0"), n.a = l, m(e, "id", "emoji")
      },
      m(r, i) {
        H(r, e, i), n.m(t[1], e), h(e, l)
      },
      p(r, i) {
        i & 2 && n.p(r[1])
      },
      d(r) {
        r && j(e)
      }
    }
  }
  
  function jt(t) {
    let e, n, l, r, i, f, o, s, u, c, a = t[1] && Ce(t);
    return {
      c() {
        e = p("div"), a && a.c(), n = S(), l = p("p"), r = S(), i = p("div"), f = p("div"), o = p("p"), s = S(), u = p("div"), c = p("p"), m(l, "id", "content"), m(f, "class", "mr-5 pl-2 pr-2 rounded-lg svelte-1a85w1m"), y(f, "selected", t[6]), y(f, "confirmed", t[5]), y(f, "unconfirmedAndSelected", !t[5] && t[6]), m(u, "class", "pl-2 pr-2 rounded-lg svelte-1a85w1m"), y(u, "selected", t[6]), y(u, "confirmed", !t[5]), y(u, "unconfirmedAndSelected", t[5] && t[6]), m(i, "class", "ml-auto mr-1 flex flex-row"), m(e, "class", "flex pl-2 pr-2 pt-1 pb-1"), y(e, "disabled", t[2])
      },
      m(d, _) {
        H(d, e, _), a && a.m(e, null), h(e, n), h(e, l), l.innerHTML = t[0], h(e, r), h(e, i), h(i, f), h(f, o), o.innerHTML = t[4], h(i, s), h(i, u), h(u, c), c.innerHTML = t[3]
      },
      p(d, [_]) {
        d[1] ? a ? a.p(d, _) : (a = Ce(d), a.c(), a.m(e, n)) : a && (a.d(1), a = null), _ & 1 && (l.innerHTML = d[0]), _ & 16 && (o.innerHTML = d[4]), _ & 64 && y(f, "selected", d[6]), _ & 32 && y(f, "confirmed", d[5]), _ & 96 && y(f, "unconfirmedAndSelected", !d[5] && d[6]), _ & 8 && (c.innerHTML = d[3]), _ & 64 && y(u, "selected", d[6]), _ & 32 && y(u, "confirmed", !d[5]), _ & 96 && y(u, "unconfirmedAndSelected", d[5] && d[6]), _ & 4 && y(e, "disabled", d[2])
      },
      i: E,
      o: E,
      d(d) {
        d && j(e), a && a.d()
      }
    }
  }
  
  function It(t, e, n) {
    let {
      text: l
    } = e, {
      emoji: r = void 0
    } = e, {
      disabled: i = !1
    } = e, {
      confirmDenyText: f
    } = e, {
      confirmAcceptText: o
    } = e, {
      confirmed: s = !0
    } = e, {
      selected: u = !1
    } = e;
    return t.$$set = c => {
      "text" in c && n(0, l = c.text), "emoji" in c && n(1, r = c.emoji), "disabled" in c && n(2, i = c.disabled), "confirmDenyText" in c && n(3, f = c.confirmDenyText), "confirmAcceptText" in c && n(4, o = c.confirmAcceptText), "confirmed" in c && n(5, s = c.confirmed), "selected" in c && n(6, u = c.selected)
    }, [l, r, i, f, o, s, u]
  }
  class Ct extends F {
    constructor(e) {
      super(), q(this, e, It, jt, V, {
        text: 0,
        emoji: 1,
        disabled: 2,
        confirmDenyText: 3,
        confirmAcceptText: 4,
        confirmed: 5,
        selected: 6
      })
    }
  }
  
  function Se(t) {
    let e, n, l;
    return {
      c() {
        e = p("p"), n = new Q(!1), l = O("\xA0|\xA0"), n.a = l, m(e, "id", "emoji")
      },
      m(r, i) {
        H(r, e, i), n.m(t[1], e), h(e, l)
      },
      p(r, i) {
        i & 2 && n.p(r[1])
      },
      d(r) {
        r && j(e)
      }
    }
  }
  
  function St(t) {
    let e, n, l, r, i, f, o, s, u, c, a = t[1] && Se(t);
    return {
      c() {
        e = p("div"), a && a.c(), n = S(), l = p("p"), r = S(), i = p("div"), f = p("div"), o = S(), s = p("span"), u = S(), c = p("div"), m(l, "id", "content"), m(f, "class", "arrowLeft arrow svelte-12x2ypo"), m(c, "class", "arrowRight arrow svelte-12x2ypo"), m(i, "class", "ml-auto mr-1 flex flex-row"), m(e, "class", "flex pl-2 pr-2 pt-1 pb-1"), y(e, "disabled", t[2])
      },
      m(d, _) {
        H(d, e, _), a && a.m(e, null), h(e, n), h(e, l), l.innerHTML = t[0], h(e, r), h(e, i), h(i, f), h(i, o), h(i, s), s.innerHTML = t[3], h(i, u), h(i, c)
      },
      p(d, [_]) {
        d[1] ? a ? a.p(d, _) : (a = Se(d), a.c(), a.m(e, n)) : a && (a.d(1), a = null), _ & 1 && (l.innerHTML = d[0]), _ & 8 && (s.innerHTML = d[3]), _ & 4 && y(e, "disabled", d[2])
      },
      i: E,
      o: E,
      d(d) {
        d && j(e), a && a.d()
      }
    }
  }
  
  function Ht(t, e, n) {
    let {
      text: l
    } = e, {
      emoji: r = void 0
    } = e, {
      disabled: i = !1
    } = e, {
      currentValue: f = ""
    } = e;
    return t.$$set = o => {
      "text" in o && n(0, l = o.text), "emoji" in o && n(1, r = o.emoji), "disabled" in o && n(2, i = o.disabled), "currentValue" in o && n(3, f = o.currentValue)
    }, [l, r, i, f]
  }
  class Et extends F {
    constructor(e) {
      super(), q(this, e, Ht, St, V, {
        text: 0,
        emoji: 1,
        disabled: 2,
        currentValue: 3
      })
    }
  }
  
  function He(t) {
    let e, n, l;
    return {
      c() {
        e = p("p"), n = new Q(!1), l = O("\xA0|\xA0"), n.a = l, m(e, "id", "emoji")
      },
      m(r, i) {
        H(r, e, i), n.m(t[2], e), h(e, l)
      },
      p(r, i) {
        i & 4 && n.p(r[2])
      },
      d(r) {
        r && j(e)
      }
    }
  }
  
  function At(t) {
    let e, n, l, r, i, f, o, s, u = t[2] && He(t);
    return {
      c() {
        e = p("div"), u && u.c(), n = S(), l = p("p"), r = S(), i = p("div"), f = p("input"), m(l, "id", "content"), m(f, "maxlength", t[5]), A(f, "width", (t[5] > 10 ? 10 * 15 : t[5] * 15 + 4) + "px"), m(f, "type", "text"), m(f, "id", "input"), m(f, "placeholder", t[4]), m(f, "spellcheck", "false"), m(f, "class", "svelte-1qrdrd0"), m(i, "class", "ml-auto mr-1 flex flex-row"), m(e, "class", "flex pl-2 pr-2 pt-1 pb-1"), y(e, "disabled", t[3])
      },
      m(c, a) {
        H(c, e, a), u && u.m(e, null), h(e, n), h(e, l), l.innerHTML = t[1], h(e, r), h(e, i), h(i, f), t[11](f), ke(f, t[0]), o || (s = [ce(f, "input", t[12]), ce(f, "input", t[7]), ce(f, "submit", tt(t[10]))], o = !0)
      },
      p(c, [a]) {
        c[2] ? u ? u.p(c, a) : (u = He(c), u.c(), u.m(e, n)) : u && (u.d(1), u = null), a & 2 && (l.innerHTML = c[1]), a & 32 && m(f, "maxlength", c[5]), a & 32 && A(f, "width", (c[5] > 10 ? 10 * 15 : c[5] * 15 + 4) + "px"), a & 16 && m(f, "placeholder", c[4]), a & 1 && f.value !== c[0] && ke(f, c[0]), a & 8 && y(e, "disabled", c[3])
      },
      i: E,
      o: E,
      d(c) {
        c && j(e), u && u.d(), t[11](null), o = !1, G(s)
      }
    }
  }
  
  function Pt(t, e, n) {
    let {
      text: l
    } = e, {
      emoji: r = void 0
    } = e, {
      disabled: i = !1
    } = e, {
      placeholder: f = ""
    } = e, {
      maxLength: o = 10
    } = e, {
      value: s
    } = e, {
      index: u
    } = e, {
      selected: c = !1
    } = e, a;
  
    function d() {
      "alt" in window && alt.emit("inputChanged", u, s)
    }
    qe(() => {
      c && _(c)
    });
  
    function _(g) {
      if (g && a) {
        const b = a.value.length;
        a.setSelectionRange(b, b), a.focus()
      } else a && a.blur()
    }
  
    function T(g) {
      ct.call(this, t, g)
    }
  
    function L(g) {
      se[g ? "unshift" : "push"](() => {
        a = g, n(6, a)
      })
    }
  
    function k() {
      s = this.value, n(0, s)
    }
    return t.$$set = g => {
      "text" in g && n(1, l = g.text), "emoji" in g && n(2, r = g.emoji), "disabled" in g && n(3, i = g.disabled), "placeholder" in g && n(4, f = g.placeholder), "maxLength" in g && n(5, o = g.maxLength), "value" in g && n(0, s = g.value), "index" in g && n(8, u = g.index), "selected" in g && n(9, c = g.selected)
    }, t.$$.update = () => {
      t.$$.dirty & 512 && _(c)
    }, [s, l, r, i, f, o, a, d, u, c, T, L, k]
  }
  class Nt extends F {
    constructor(e) {
      super(), q(this, e, Pt, At, V, {
        text: 1,
        emoji: 2,
        disabled: 3,
        placeholder: 4,
        maxLength: 5,
        value: 0,
        index: 8,
        selected: 9
      })
    }
  }
  
  function Ee(t, e, n) {
    const l = t.slice();
    return l[28] = e[n], l[30] = n, l
  }
  
  function Ae(t) {
    let e, n, l, r, i, f, o = t[5] + 1 + "",
      s, u, c = t[4].length + "",
      a, d, _, T, L, k, g = t[4],
      b = [];
    for (let v = 0; v < g.length; v += 1) b[v] = Pe(Ee(t, g, v));
    const D = v => R(b[v], 1, 1, () => {
      b[v] = null
    });
    let C = t[3] && Ne(t);
    return {
      c() {
        e = p("div"), n = p("div"), l = p("div"), r = p("h1"), i = S(), f = p("p"), s = O(o), u = O("/"), a = O(c), d = S(), _ = p("div");
        for (let v = 0; v < b.length; v += 1) b[v].c();
        T = S(), C && C.c(), m(r, "id", "title"), m(r, "class", "text-center p-1 font-bold w-full mr-1 rounded-lg uppercase svelte-1a4pdvg"), m(f, "id", "indexer"), m(f, "class", "ml-auto w-max font-arial p-1 rounded-lg break-normal svelte-1a4pdvg"), m(l, "class", "flex"), m(_, "id", "itemsCont"), m(_, "class", "overflow-hidden mt-2 mb-2"), A(_, "max-height", t[8] + "em"), m(n, "id", "itemsMainCont"), m(n, "class", "rounded-lg pb-1 svelte-1a4pdvg"), m(e, "id", "mainCont"), m(e, "class", "absolute shadow-lg"), A(e, "left", t[6] + "em"), A(e, "top", t[7] + "em"), A(e, "width", t[9] + "em"), A(e, "color", t[11]), A(e, "font-size", t[10] + "px"), A(e, "font-weight", t[12])
      },
      m(v, w) {
        H(v, e, w), h(e, n), h(n, l), h(l, r), r.innerHTML = t[2], h(l, i), h(l, f), h(f, s), h(f, u), h(f, a), h(n, d), h(n, _);
        for (let M = 0; M < b.length; M += 1) b[M].m(_, null);
        t[14](_), h(e, T), C && C.m(e, null), k = !0
      },
      p(v, w) {
        if (t = v, (!k || w & 4) && (r.innerHTML = t[2]), (!k || w & 32) && o !== (o = t[5] + 1 + "") && be(s, o), (!k || w & 16) && c !== (c = t[4].length + "") && be(a, c), w & 48) {
          g = t[4];
          let M;
          for (M = 0; M < g.length; M += 1) {
            const ne = Ee(t, g, M);
            b[M] ? (b[M].p(ne, w), P(b[M], 1)) : (b[M] = Pe(ne), b[M].c(), P(b[M], 1), b[M].m(_, null))
          }
          for (he(), M = g.length; M < b.length; M += 1) D(M);
          _e()
        } (!k || w & 256) && A(_, "max-height", t[8] + "em"), t[3] ? C ? C.p(t, w) : (C = Ne(t), C.c(), C.m(e, null)) : C && (C.d(1), C = null), (!k || w & 64) && A(e, "left", t[6] + "em"), (!k || w & 128) && A(e, "top", t[7] + "em"), (!k || w & 512) && A(e, "width", t[9] + "em"), (!k || w & 2048) && A(e, "color", t[11]), (!k || w & 1024) && A(e, "font-size", t[10] + "px"), (!k || w & 4096) && A(e, "font-weight", t[12])
      },
      i(v) {
        if (!k) {
          for (let w = 0; w < g.length; w += 1) P(b[w]);
          te(() => {
            L || (L = ve(e, Te, {
              x: -200,
              duration: t[13] ? 200 : 0
            }, !0)), L.run(1)
          }), k = !0
        }
      },
      o(v) {
        b = b.filter(Boolean);
        for (let w = 0; w < b.length; w += 1) R(b[w]);
        L || (L = ve(e, Te, {
          x: -200,
          duration: t[13] ? 200 : 0
        }, !1)), L.run(0), k = !1
      },
      d(v) {
        v && j(e), $e(b, v), t[14](null), C && C.d(), v && L && L.end()
      }
    }
  }
  
  function Rt(t) {
    let e, n;
    const l = [t[28], {
      index: t[30]
    }, {
      selected: t[5] === t[30]
    }];
    let r = {};
    for (let i = 0; i < l.length; i += 1) r = J(r, l[i]);
    return e = new Nt({
      props: r
    }), {
      c() {
        W(e.$$.fragment)
      },
      m(i, f) {
        B(e, i, f), n = !0
      },
      p(i, f) {
        const o = f & 48 ? X(l, [f & 16 && Y(i[28]), l[1], f & 32 && {
          selected: i[5] === i[30]
        }]) : {};
        e.$set(o)
      },
      i(i) {
        n || (P(e.$$.fragment, i), n = !0)
      },
      o(i) {
        R(e.$$.fragment, i), n = !1
      },
      d(i) {
        U(e, i)
      }
    }
  }
  
  function Ot(t) {
    let e, n;
    const l = [t[28]];
    let r = {};
    for (let i = 0; i < l.length; i += 1) r = J(r, l[i]);
    return e = new Et({
      props: r
    }), {
      c() {
        W(e.$$.fragment)
      },
      m(i, f) {
        B(e, i, f), n = !0
      },
      p(i, f) {
        const o = f & 16 ? X(l, [Y(i[28])]) : {};
        e.$set(o)
      },
      i(i) {
        n || (P(e.$$.fragment, i), n = !0)
      },
      o(i) {
        R(e.$$.fragment, i), n = !1
      },
      d(i) {
        U(e, i)
      }
    }
  }
  
  function Dt(t) {
    let e, n;
    const l = [{
      selected: t[5] === t[30]
    }, t[28]];
    let r = {};
    for (let i = 0; i < l.length; i += 1) r = J(r, l[i]);
    return e = new Ct({
      props: r
    }), {
      c() {
        W(e.$$.fragment)
      },
      m(i, f) {
        B(e, i, f), n = !0
      },
      p(i, f) {
        const o = f & 48 ? X(l, [f & 32 && {
          selected: i[5] === i[30]
        }, f & 16 && Y(i[28])]) : {};
        e.$set(o)
      },
      i(i) {
        n || (P(e.$$.fragment, i), n = !0)
      },
      o(i) {
        R(e.$$.fragment, i), n = !1
      },
      d(i) {
        U(e, i)
      }
    }
  }
  
  function zt(t) {
    let e, n;
    const l = [{
      selected: t[5] === t[30]
    }, t[28]];
    let r = {};
    for (let i = 0; i < l.length; i += 1) r = J(r, l[i]);
    return e = new vt({
      props: r
    }), {
      c() {
        W(e.$$.fragment)
      },
      m(i, f) {
        B(e, i, f), n = !0
      },
      p(i, f) {
        const o = f & 48 ? X(l, [f & 32 && {
          selected: i[5] === i[30]
        }, f & 16 && Y(i[28])]) : {};
        e.$set(o)
      },
      i(i) {
        n || (P(e.$$.fragment, i), n = !0)
      },
      o(i) {
        R(e.$$.fragment, i), n = !1
      },
      d(i) {
        U(e, i)
      }
    }
  }
  
  function Vt(t) {
    let e, n;
    const l = [t[28]];
    let r = {};
    for (let i = 0; i < l.length; i += 1) r = J(r, l[i]);
    return e = new Mt({
      props: r
    }), {
      c() {
        W(e.$$.fragment)
      },
      m(i, f) {
        B(e, i, f), n = !0
      },
      p(i, f) {
        const o = f & 16 ? X(l, [Y(i[28])]) : {};
        e.$set(o)
      },
      i(i) {
        n || (P(e.$$.fragment, i), n = !0)
      },
      o(i) {
        R(e.$$.fragment, i), n = !1
      },
      d(i) {
        U(e, i)
      }
    }
  }
  
  function Bt(t) {
    let e, n;
    const l = [t[28]];
    let r = {};
    for (let i = 0; i < l.length; i += 1) r = J(r, l[i]);
    return e = new kt({
      props: r
    }), {
      c() {
        W(e.$$.fragment)
      },
      m(i, f) {
        B(e, i, f), n = !0
      },
      p(i, f) {
        const o = f & 16 ? X(l, [Y(i[28])]) : {};
        e.$set(o)
      },
      i(i) {
        n || (P(e.$$.fragment, i), n = !0)
      },
      o(i) {
        R(e.$$.fragment, i), n = !1
      },
      d(i) {
        U(e, i)
      }
    }
  }
  
  function Pe(t) {
    let e, n, l, r;
    const i = [Bt, Vt, zt, Dt, Ot, Rt],
      f = [];
  
    function o(s, u) {
      return s[28].type == "MenuItem" ? 0 : s[28].type == "CheckboxItem" ? 1 : s[28].type == "RangeSliderItem" ? 2 : s[28].type == "ConfirmItem" ? 3 : s[28].type == "ListItem" ? 4 : s[28].type == "InputItem" ? 5 : -1
    }
    return ~(e = o(t)) && (n = f[e] = i[e](t)), {
      c() {
        n && n.c(), l = Be()
      },
      m(s, u) {
        ~e && f[e].m(s, u), H(s, l, u), r = !0
      },
      p(s, u) {
        let c = e;
        e = o(s), e === c ? ~e && f[e].p(s, u) : (n && (he(), R(f[c], 1, 1, () => {
          f[c] = null
        }), _e()), ~e ? (n = f[e], n ? n.p(s, u) : (n = f[e] = i[e](s), n.c()), P(n, 1), n.m(l.parentNode, l)) : n = null)
      },
      i(s) {
        r || (P(n), r = !0)
      },
      o(s) {
        R(n), r = !1
      },
      d(s) {
        ~e && f[e].d(s), s && j(l)
      }
    }
  }
  
  function Ne(t) {
    let e;
    return {
      c() {
        e = p("div"), m(e, "id", "description"), m(e, "class", "mt-2 rounded-lg text-center p-3 svelte-1a4pdvg")
      },
      m(n, l) {
        H(n, e, l), e.innerHTML = t[3]
      },
      p(n, l) {
        l & 8 && (e.innerHTML = n[3])
      },
      d(n) {
        n && j(e)
      }
    }
  }
  
  function Ut(t) {
    let e, n, l = t[1] && Ae(t);
    return {
      c() {
        l && l.c(), e = Be()
      },
      m(r, i) {
        l && l.m(r, i), H(r, e, i), n = !0
      },
      p(r, [i]) {
        r[1] ? l ? (l.p(r, i), i & 2 && P(l, 1)) : (l = Ae(r), l.c(), P(l, 1), l.m(e.parentNode, e)) : l && (he(), R(l, 1, 1, () => {
          l = null
        }), _e())
      },
      i(r) {
        n || (P(l), n = !0)
      },
      o(r) {
        R(l), n = !1
      },
      d(r) {
        l && l.d(r), r && j(e)
      }
    }
  }
  
  function qt(t, e, n) {
    let l, r = !1,
      i = "alt:V Trainer Menu V0.1 \u2764\uFE0F",
      f = "Made with Svelte by CORROSIVE.EU & V-Change \u2764\uFE0F",
      o = [],
      s = 0,
      u = 1,
      c = 1,
      a = 30,
      d = 20,
      _ = 20,
      T = "#71B2EF",
      L = "#000000a6",
      k = "#dfdfda",
      g = 500,
      b = "Quicksand",
      D = !0;
    st(() => { }), qe(() => {
      "alt" in window ? (alt.emit("ready"), alt.on("setMenuItems", ne), alt.on("setMenuItem", v), alt.on("addMenuItem", w), alt.on("removeMenuItem", M), alt.on("setTitle", Ge), alt.on("setIndex", ge), alt.on("setVisible", We), alt.on("setConfig", C)) : (n(2, i = "DEBUG"), n(3, f = "DEBUG"), n(1, r = !0), o.push({
        type: "RangeSliderItem",
        text: "1"
      })), app.style.setProperty("--highlightColor", T), app.style.setProperty("--backgroundColor", L), app.style.setProperty("--fontSize", _ + "px"), app.style.setProperty("--fontType", b), app.style.setProperty("--fontColor", k)
    });
  
    function C(I, N) {
      switch (I) {
        case "left":
          n(6, u = N);
          break;
        case "top":
          n(7, c = N);
          break;
        case "height":
          n(8, a = N);
          break;
        case "width":
          n(9, d = N);
          break;
        case "fontSize":
          n(10, _ = N), app.style.setProperty("--fontSize", _ + "px");
          break;
        case "highlightColor":
          T = N, app.style.setProperty("--highlightColor", T);
          break;
        case "backgroundColor":
          L = N, app.style.setProperty("--backgroundColor", L);
          break;
        case "fontColor":
          n(11, k = N), app.style.setProperty("--fontColor", k);
          break;
        case "fontWeight":
          n(12, g = N);
          break;
        case "fontType":
          b = N, app.style.setProperty("--fontType", b);
          break;
        case "useAnimations":
          n(13, D = N);
          break
      }
    }
  
    function v(I, N) {
      n(4, o[N] = I, o), ge(s)
    }
  
    function w(I) {
      n(4, o = [...o, I])
    }
  
    function M(I) {
      o.splice(I, 1), n(4, o)
    }
  
    function ne(I) {
      n(4, o = I)
    }
  
    function Ge(I) {
      n(2, i = I)
    }
  
    function ge(I) {
      if (o.length === 0) {
        n(3, f = void 0), n(5, s = 0);
        return
      }
      l.children[s] && l.children[s].classList.remove("selected"), n(5, s = I), l.children[s].children[0].scrollIntoView({
        behavior: "smooth",
        block: "center"
      }), l.children[s].classList.add("selected"), n(3, f = o[I].description)
    }
  
    function We(I) {
      n(1, r = I)
    }
  
    function Ke(I) {
      se[I ? "unshift" : "push"](() => {
        l = I, n(0, l)
      })
    }
    return [l, r, i, f, o, s, u, c, a, d, _, k, g, D, Ke]
  }
  class Ft extends F {
    constructor(e) {
      super(), q(this, e, qt, Ut, V, {})
    }
  }
  
  function Gt(t) {
    let e, n;
    return e = new Ft({}), {
      c() {
        W(e.$$.fragment)
      },
      m(l, r) {
        B(e, l, r), n = !0
      },
      p: E,
      i(l) {
        n || (P(e.$$.fragment, l), n = !0)
      },
      o(l) {
        R(e.$$.fragment, l), n = !1
      },
      d(l) {
        U(e, l)
      }
    }
  }
  class Wt extends F {
    constructor(e) {
      super(), q(this, e, null, Gt, V, {})
    }
  }
  new Wt({
    target: document.getElementById("app")
  });