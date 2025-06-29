!(function (t, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? n(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], n)
    : n(((t = 'undefined' != typeof globalThis ? globalThis : t || self).HistoryLibrary = {}))
})(this, function (g) {
  'use strict'
  function m() {
    return (m =
      Object.assign ||
      function (t) {
        for (var n = 1; n < arguments.length; n++) {
          var e,
            r = arguments[n]
          for (e in r) Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e])
        }
        return t
      }).apply(this, arguments)
  }
  var t
  ;(g.Action = void 0), ((t = g.Action || (g.Action = {})).Pop = 'POP'), (t.Push = 'PUSH'), (t.Replace = 'REPLACE')
  function b(t) {
    return Object.freeze(t)
  }
  function w(t, n) {
    if (!t) {
      'undefined' != typeof console && console.warn(n)
      try {
        throw new Error(n)
      } catch (t) {}
    }
  }
  var A = 'beforeunload',
    P = 'popstate'
  function f(t, n, e) {
    return Math.min(Math.max(t, n), e)
  }
  function k(t) {
    t.preventDefault(), (t.returnValue = '')
  }
  function O() {
    var t = []
    return {
      get length() {
        return t.length
      },
      push: function (n) {
        return (
          t.push(n),
          function () {
            t = t.filter(function (t) {
              return t !== n
            })
          }
        )
      },
      call: function (n) {
        t.forEach(function (t) {
          return t && t(n)
        })
      },
    }
  }
  function S() {
    return Math.random().toString(36).substr(2, 8)
  }
  function x(t) {
    var n = t.pathname,
      e = void 0 === n ? '/' : n,
      n = t.search,
      n = void 0 === n ? '' : n,
      t = t.hash,
      t = void 0 === t ? '' : t
    return (
      n && '?' !== n && (e += '?' === n.charAt(0) ? n : '?' + n),
      t && '#' !== t && (e += '#' === t.charAt(0) ? t : '#' + t),
      e
    )
  }
  function E(t) {
    var n,
      e = {}
    return (
      t &&
        (0 <= (n = t.indexOf('#')) && ((e.hash = t.substr(n)), (t = t.substr(0, n))),
        0 <= (n = t.indexOf('?')) && ((e.search = t.substr(n)), (t = t.substr(0, n))),
        t && (e.pathname = t)),
      e
    )
  }
  ;(g.createBrowserHistory = function (t) {
    var o = void 0 === (t = (t = void 0 === t ? {} : t).window) ? document.defaultView : t,
      c = o.history
    function a() {
      var t = o.location,
        n = t.pathname,
        e = t.search,
        r = t.hash,
        t = c.state || {}
      return [t.idx, b({ pathname: n, search: e, hash: r, state: t.usr || null, key: t.key || 'default' })]
    }
    var i = null
    o.addEventListener(P, function () {
      var t, n, e, r
      i
        ? (s.call(i), (i = null))
        : ((t = g.Action.Pop),
          (n = (e = a())[0]),
          (e = e[1]),
          s.length
            ? null != n
              ? (r = u - n) &&
                ((i = {
                  action: t,
                  location: e,
                  retry: function () {
                    y(-1 * r)
                  },
                }),
                y(r))
              : w(
                  !1,
                  'You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation.'
                )
            : d(t))
    })
    var n = g.Action.Pop,
      u = (t = a())[0],
      e = t[1],
      r = O(),
      s = O()
    function l(t) {
      return 'string' == typeof t ? t : x(t)
    }
    function h(t, n) {
      return (
        void 0 === n && (n = null),
        b(m({ pathname: e.pathname, hash: '', search: '' }, 'string' == typeof t ? E(t) : t, { state: n, key: S() }))
      )
    }
    function f(t, n) {
      return [{ usr: t.state, key: t.key, idx: n }, l(t)]
    }
    function p(t, n, e) {
      return !s.length || (s.call({ action: t, location: n, retry: e }), 0)
    }
    function d(t) {
      n = t
      t = a()
      ;(u = t[0]), (e = t[1]), r.call({ action: n, location: e })
    }
    function y(t) {
      c.go(t)
    }
    return (
      null == u && ((u = 0), c.replaceState(m({}, c.state, { idx: u }), '')),
      {
        get action() {
          return n
        },
        get location() {
          return e
        },
        createHref: l,
        push: function t(n, e) {
          var r = g.Action.Push,
            a = h(n, e)
          if (
            p(r, a, function () {
              t(n, e)
            })
          ) {
            var a = (i = f(a, u + 1))[0],
              i = i[1]
            try {
              c.pushState(a, '', i)
            } catch (t) {
              o.location.assign(i)
            }
            d(r)
          }
        },
        replace: function t(n, e) {
          var r,
            a = g.Action.Replace,
            i = h(n, e)
          p(a, i, function () {
            t(n, e)
          }) && ((i = (r = f(i, u))[0]), (r = r[1]), c.replaceState(i, '', r), d(a))
        },
        go: y,
        back: function () {
          y(-1)
        },
        forward: function () {
          y(1)
        },
        listen: function (t) {
          return r.push(t)
        },
        block: function (t) {
          var n = s.push(t)
          return (
            1 === s.length && o.addEventListener(A, k),
            function () {
              n(), s.length || o.removeEventListener(A, k)
            }
          )
        },
      }
    )
  }),
    (g.createHashHistory = function (t) {
      var o = void 0 === (t = (t = void 0 === t ? {} : t).window) ? document.defaultView : t,
        c = o.history
      function a() {
        var t = E(o.location.hash.substr(1)),
          n = t.pathname,
          e = t.search,
          r = t.hash,
          t = c.state || {}
        return [
          t.idx,
          b({
            pathname: void 0 === n ? '/' : n,
            search: void 0 === e ? '' : e,
            hash: void 0 === r ? '' : r,
            state: t.usr || null,
            key: t.key || 'default',
          }),
        ]
      }
      var i = null
      function n() {
        var t, n, e, r
        i
          ? (l.call(i), (i = null))
          : ((t = g.Action.Pop),
            (n = (e = a())[0]),
            (e = e[1]),
            l.length
              ? null != n
                ? (r = u - n) &&
                  ((i = {
                    action: t,
                    location: e,
                    retry: function () {
                      v(-1 * r)
                    },
                  }),
                  v(r))
                : w(
                    !1,
                    'You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation.'
                  )
              : y(t))
      }
      o.addEventListener(P, n),
        o.addEventListener('hashchange', function () {
          x(a()[1]) !== x(r) && n()
        })
      var e = g.Action.Pop,
        u = (t = a())[0],
        r = t[1],
        s = O(),
        l = O()
      function h(t) {
        return (
          (e = document.querySelector('base')),
          (r = ''),
          (r =
            e && e.getAttribute('href') ? (-1 === (e = (n = o.location.href).indexOf('#')) ? n : n.slice(0, e)) : r) +
            '#' +
            ('string' == typeof t ? t : x(t))
        )
        var n, e, r
      }
      function f(t, n) {
        return (
          void 0 === n && (n = null),
          b(m({ pathname: r.pathname, hash: '', search: '' }, 'string' == typeof t ? E(t) : t, { state: n, key: S() }))
        )
      }
      function p(t, n) {
        return [{ usr: t.state, key: t.key, idx: n }, h(t)]
      }
      function d(t, n, e) {
        return !l.length || (l.call({ action: t, location: n, retry: e }), 0)
      }
      function y(t) {
        e = t
        t = a()
        ;(u = t[0]), (r = t[1]), s.call({ action: e, location: r })
      }
      function v(t) {
        c.go(t)
      }
      return (
        null == u && ((u = 0), c.replaceState(m({}, c.state, { idx: u }), '')),
        {
          get action() {
            return e
          },
          get location() {
            return r
          },
          createHref: h,
          push: function t(n, e) {
            var r = g.Action.Push,
              a = f(n, e)
            if (
              (w(
                '/' === a.pathname.charAt(0),
                'Relative pathnames are not supported in hash history.push(' + JSON.stringify(n) + ')'
              ),
              d(r, a, function () {
                t(n, e)
              }))
            ) {
              var a = (i = p(a, u + 1))[0],
                i = i[1]
              try {
                c.pushState(a, '', i)
              } catch (t) {
                o.location.assign(i)
              }
              y(r)
            }
          },
          replace: function t(n, e) {
            var r,
              a = g.Action.Replace,
              i = f(n, e)
            w(
              '/' === i.pathname.charAt(0),
              'Relative pathnames are not supported in hash history.replace(' + JSON.stringify(n) + ')'
            ),
              d(a, i, function () {
                t(n, e)
              }) && ((i = (r = p(i, u))[0]), (r = r[1]), c.replaceState(i, '', r), y(a))
          },
          go: v,
          back: function () {
            v(-1)
          },
          forward: function () {
            v(1)
          },
          listen: function (t) {
            return s.push(t)
          },
          block: function (t) {
            var n = l.push(t)
            return (
              1 === l.length && o.addEventListener(A, k),
              function () {
                n(), l.length || o.removeEventListener(A, k)
              }
            )
          },
        }
      )
    }),
    (g.createMemoryHistory = function (t) {
      var t = void 0 === (t = (n = t = void 0 === t ? {} : t).initialEntries) ? ['/'] : t,
        n = n.initialIndex,
        i = t.map(function (t) {
          var n = b(m({ pathname: '/', search: '', hash: '', state: null, key: S() }, 'string' == typeof t ? E(t) : t))
          return (
            w(
              '/' === n.pathname.charAt(0),
              'Relative pathnames are not supported in createMemoryHistory({ initialEntries }) (invalid entry: ' +
                JSON.stringify(t) +
                ')'
            ),
            n
          )
        }),
        o = f(null == n ? i.length - 1 : n, 0, i.length - 1),
        e = g.Action.Pop,
        c = i[o],
        r = O(),
        a = O()
      function u(t, n) {
        return (
          void 0 === n && (n = null),
          b(m({ pathname: c.pathname, search: '', hash: '' }, 'string' == typeof t ? E(t) : t, { state: n, key: S() }))
        )
      }
      function s(t, n, e) {
        return !a.length || (a.call({ action: t, location: n, retry: e }), 0)
      }
      function l(t, n) {
        ;(e = t), (c = n), r.call({ action: e, location: c })
      }
      function h(t) {
        var n = f(o + t, 0, i.length - 1),
          e = g.Action.Pop,
          r = i[n]
        s(e, r, function () {
          h(t)
        }) && ((o = n), l(e, r))
      }
      return {
        get index() {
          return o
        },
        get action() {
          return e
        },
        get location() {
          return c
        },
        createHref: function (t) {
          return 'string' == typeof t ? t : x(t)
        },
        push: function t(n, e) {
          var r = g.Action.Push,
            a = u(n, e)
          w(
            '/' === c.pathname.charAt(0),
            'Relative pathnames are not supported in memory history.push(' + JSON.stringify(n) + ')'
          ),
            s(r, a, function () {
              t(n, e)
            }) && ((o += 1), i.splice(o, i.length, a), l(r, a))
        },
        replace: function t(n, e) {
          var r = g.Action.Replace,
            a = u(n, e)
          w(
            '/' === c.pathname.charAt(0),
            'Relative pathnames are not supported in memory history.replace(' + JSON.stringify(n) + ')'
          ),
            s(r, a, function () {
              t(n, e)
            }) && l(r, (i[o] = a))
        },
        go: h,
        back: function () {
          h(-1)
        },
        forward: function () {
          h(1)
        },
        listen: function (t) {
          return r.push(t)
        },
        block: function (t) {
          return a.push(t)
        },
      }
    }),
    (g.createPath = x),
    (g.parsePath = E),
    Object.defineProperty(g, '__esModule', { value: !0 })
})
