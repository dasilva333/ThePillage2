S4 = ->
  (((1 + Math.random()) * 65536) | 0).toString(16).substring 1
guid = ->
  S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
explode = (c, e, a) ->
  f = 0: ""
  return null  if arguments.length < 2 or typeof arguments[0] is "undefined" or typeof arguments[1] is "undefined"
  return false  if c is "" or c is false or c is null
  return f  if typeof c is "function" or typeof c is "object" or typeof e is "function" or typeof e is "object"
  c = "1"  if c is true
  unless a
    e.toString().split c.toString()
  else
    g = e.toString().split(c.toString())
    d = g.splice(0, a - 1)
    b = g.join(c.toString())
    d.push b
    d
sharePopup = (b) ->
  a = (if window.location.port then ":" + window.location.port else "")
  FB.ui
    method: "feed"
    link: window.location.protocol + "//" + window.location.hostname + a + "/stations/" + b + "/play/"

  _kmq.push [ "record", "shared",
    "outbound destination": "facebook"
    "outbound name": "station"
    "outbound medium": "social"
   ]
  false
_lc = (a) ->
  b = window.tokens[a]
  b or a
toUrl = (b) ->
  a = _.zip(_.keys(b), _.values(b))
  qs = _.foldl(a, (d, c) ->
    e = (if (d is "") then "" else "&")
    (if (c[1]? and c[1] isnt "") then d + e + c[0] + "=" + encodeURIComponent(c[1]) else d)
  , "")
  qs = "?" + qs  if qs.length > 0
  qs
getLength = (a) ->
  k = 0
  i = 0
  loop
    if a[i]
      ++k
    else
      break
    i++
  k
getFormatNowDate = (g) ->
  g = "Y-m-d"  unless g
  j = new Date()
  h = j.getFullYear()
  f = j.getUTCFullYear()
  d = new String(j.getFullYear()).substr(2)
  c = j.getMonth() + 1
  c = "0" + c  if c < 10
  e = j.getDate()
  e = "0" + e  if e < 10
  a = ""
  b = 0

  while b < g.length
    if g[b] is "Y"
      a += h
    else
      if g[b] is "y"
        a += d
      else
        if g[b] is "m"
          a += c
        else
          if g[b] is "d"
            a += e
          else
            a += g[b]
    ++b
  a
(->
  G = (N, M, L) ->
    return N isnt 0 or 1 / N is 1 / M  if N is M
    return N is M  if not N? or not M?
    N = N._wrapped  if N._chain
    M = M._wrapped  if M._chain
    return N.isEqual(M)  if N.isEqual and H.isFunction(N.isEqual)
    return M.isEqual(N)  if M.isEqual and H.isFunction(M.isEqual)
    Q = A.call(N)
    return false  unless Q is A.call(M)
    switch Q
      when "[object String]"
        return N is String(M)
      when "[object Number]"
        return (if N isnt +N then M isnt +M else (if N is 0 then 1 / N is 1 / M else N is +M))
      when "[object Date]", "[object Boolean]"
        return +N is +M
      when "[object RegExp]"
        return N.source is M.source and N.global is M.global and N.multiline is M.multiline and N.ignoreCase is M.ignoreCase
    return false  if typeof N isnt "object" or typeof M isnt "object"
    R = L.length
    return true  if L[R] is N  while R--
    L.push N
    P = 0
    K = true
    if Q is "[object Array]"
      P = N.length
      K = P is M.length
      break  unless K = P of N is P of M and G(N[P], M[P], L)  while P--  if K
    else
      return false  if "constructor" of N isnt "constructor" of M or N.constructor isnt M.constructor
      for O of N
        if H.has(N, O)
          P++
          break  unless K = H.has(M, O) and G(N[O], M[O], L)
      if K
        for O of M
          break  if H.has(M, O) and not (P--)
        K = not P
    L.pop()
    K
  z = this
  v = z._
  b = {}
  l = Array::
  F = Object::
  I = Function::
  x = l.slice
  B = l.unshift
  A = F.toString
  r = F.hasOwnProperty
  p = l.forEach
  j = l.map
  D = l.reduce
  e = l.reduceRight
  o = l.filter
  a = l.every
  C = l.some
  y = l.indexOf
  f = l.lastIndexOf
  c = Array.isArray
  E = Object.keys
  m = I.bind
  H = (K) ->
    new g(K)

  if typeof exports isnt "undefined"
    exports = module.exports = H  if typeof module isnt "undefined" and module.exports
    exports._ = H
  else
    z._ = H
  H.VERSION = "1.3.1"
  d = H.each = H.forEach = (P, O, N) ->
    return  unless P?
    if p and P.forEach is p
      P.forEach O, N
    else
      if P.length is +P.length
        M = 0
        K = P.length

        while M < K
          return  if M of P and O.call(N, P[M], M, P) is b
          M++
      else
        for L of P
          return  if O.call(N, P[L], L, P) is b  if H.has(P, L)

  H.map = H.collect = (N, M, L) ->
    K = []
    return K  unless N?
    return N.map(M, L)  if j and N.map is j
    d N, (Q, O, P) ->
      K[K.length] = M.call(L, Q, O, P)

    K.length = N.length  if N.length is +N.length
    K

  H.reduce = H.foldl = H.inject = (O, N, K, M) ->
    L = arguments.length > 2
    O = []  unless O?
    if D and O.reduce is D
      N = H.bind(N, M)  if M
      return (if L then O.reduce(N, K) else O.reduce(N))
    d O, (R, P, Q) ->
      unless L
        K = R
        L = true
      else
        K = N.call(M, K, R, P, Q)

    throw new TypeError("Reduce of empty array with no initial value")  unless L
    K

  H.reduceRight = H.foldr = (O, N, K, M) ->
    L = arguments.length > 2
    O = []  unless O?
    if e and O.reduceRight is e
      N = H.bind(N, M)  if M
      return (if L then O.reduceRight(N, K) else O.reduceRight(N))
    P = H.toArray(O).reverse()
    N = H.bind(N, M)  if M and not L
    (if L then H.reduce(P, N, K, M) else H.reduce(P, N))

  H.find = H.detect = (N, M, L) ->
    K = undefined
    t N, (Q, O, P) ->
      if M.call(L, Q, O, P)
        K = Q
        true

    K

  H.filter = H.select = (N, M, L) ->
    K = []
    return K  unless N?
    return N.filter(M, L)  if o and N.filter is o
    d N, (Q, O, P) ->
      K[K.length] = Q  if M.call(L, Q, O, P)

    K

  H.reject = (N, M, L) ->
    K = []
    return K  unless N?
    d N, (Q, O, P) ->
      K[K.length] = Q  unless M.call(L, Q, O, P)

    K

  H.every = H.all = (N, M, L) ->
    K = true
    return K  unless N?
    return N.every(M, L)  if a and N.every is a
    d N, (Q, O, P) ->
      b  unless K = K and M.call(L, Q, O, P)

    K

  t = H.some = H.any = (N, M, L) ->
    M or (M = H.identity)
    K = false
    return K  unless N?
    return N.some(M, L)  if C and N.some is C
    d N, (Q, O, P) ->
      b  if K or (K = M.call(L, Q, O, P))

    !!K

  H.include = H.contains = (M, L) ->
    K = false
    return K  unless M?
    return M.indexOf(L) isnt -1  if y and M.indexOf is y
    K = t(M, (N) ->
      N is L
    )
    K

  H.invoke = (L, M) ->
    K = x.call(arguments, 2)
    H.map L, (N) ->
      (if H.isFunction(M) then M or N else N[M]).apply N, K

  H.pluck = (L, K) ->
    H.map L, (M) ->
      M[K]

  H.max = (N, M, L) ->
    return Math.max.apply(Math, N)  if not M and H.isArray(N)
    return -Infinity  if not M and H.isEmpty(N)
    K = computed: -Infinity
    d N, (R, O, Q) ->
      P = (if M then M.call(L, R, O, Q) else R)
      P >= K.computed and (K =
        value: R
        computed: P
      )

    K.value

  H.min = (N, M, L) ->
    return Math.min.apply(Math, N)  if not M and H.isArray(N)
    return Infinity  if not M and H.isEmpty(N)
    K = computed: Infinity
    d N, (R, O, Q) ->
      P = (if M then M.call(L, R, O, Q) else R)
      P < K.computed and (K =
        value: R
        computed: P
      )

    K.value

  H.shuffle = (M) ->
    K = []
    L = undefined
    d M, (P, N, O) ->
      if N is 0
        K[0] = P
      else
        L = Math.floor(Math.random() * (N + 1))
        K[N] = K[L]
        K[L] = P

    K

  H.sortBy = (M, L, K) ->
    H.pluck H.map(M, (P, N, O) ->
      value: P
      criteria: L.call(K, P, N, O)
    ).sort((Q, P) ->
      O = Q.criteria
      N = P.criteria
      (if O < N then -1 else (if O > N then 1 else 0))
    ), "value"

  H.groupBy = (M, N) ->
    K = {}
    L = (if H.isFunction(N) then N else (O) ->
      O[N]
    )
    d M, (Q, O) ->
      P = L(Q, O)
      (K[P] or (K[P] = [])).push Q

    K

  H.sortedIndex = (P, O, M) ->
    M or (M = H.identity)
    K = 0
    N = P.length
    while K < N
      L = (K + N) >> 1
      (if M(P[L]) < M(O) then K = L + 1 else N = L)
    K

  H.toArray = (K) ->
    return []  unless K
    return K.toArray()  if K.toArray
    return x.call(K)  if H.isArray(K)
    return x.call(K)  if H.isArguments(K)
    H.values K

  H.size = (K) ->
    H.toArray(K).length

  H.first = H.head = (M, L, K) ->
    (if (L?) and not K then x.call(M, 0, L) else M[0])

  H.initial = (M, L, K) ->
    x.call M, 0, M.length - (if (not (L?)) or K then 1 else L)

  H.last = (M, L, K) ->
    if (L?) and not K
      x.call M, Math.max(M.length - L, 0)
    else
      M[M.length - 1]

  H.rest = H.tail = (M, K, L) ->
    x.call M, (if (not (K?)) or L then 1 else K)

  H.compact = (K) ->
    H.filter K, (L) ->
      !!L

  H.flatten = (L, K) ->
    H.reduce L, ((M, N) ->
      return M.concat((if K then N else H.flatten(N)))  if H.isArray(N)
      M[M.length] = N
      M
    ), []

  H.without = (K) ->
    H.difference K, x.call(arguments, 1)

  H.uniq = H.unique = (O, N, M) ->
    L = (if M then H.map(O, M) else O)
    K = []
    H.reduce L, ((P, R, Q) ->
      if 0 is Q or (if N is true then H.last(P) isnt R else not H.include(P, R))
        P[P.length] = R
        K[K.length] = O[Q]
      P
    ), []
    K

  H.union = ->
    H.uniq H.flatten(arguments, true)

  H.intersection = H.intersect = (L) ->
    K = x.call(arguments, 1)
    H.filter H.uniq(L), (M) ->
      H.every K, (N) ->
        H.indexOf(N, M) >= 0

  H.difference = (L) ->
    K = H.flatten(x.call(arguments, 1))
    H.filter L, (M) ->
      not H.include(K, M)

  H.zip = ->
    K = x.call(arguments)
    N = H.max(H.pluck(K, "length"))
    M = new Array(N)
    L = 0

    while L < N
      M[L] = H.pluck(K, "" + L)
      L++
    M

  H.indexOf = (O, M, N) ->
    return -1  unless O?
    L = undefined
    K = undefined
    if N
      L = H.sortedIndex(O, M)
      return (if O[L] is M then L else -1)
    return O.indexOf(M)  if y and O.indexOf is y
    L = 0
    K = O.length

    while L < K
      return L  if L of O and O[L] is M
      L++
    -1

  H.lastIndexOf = (M, L) ->
    return -1  unless M?
    return M.lastIndexOf(L)  if f and M.lastIndexOf is f
    K = M.length
    return K  if K of M and M[K] is L  while K--
    -1

  H.range = (P, N, O) ->
    if arguments.length <= 1
      N = P or 0
      P = 0
    O = arguments[2] or 1
    L = Math.max(Math.ceil((N - P) / O), 0)
    K = 0
    M = new Array(L)
    while K < L
      M[K++] = P
      P += O
    M

  h = ->

  H.bind = J = (N, L) ->
    M = undefined
    K = undefined
    return m.apply(N, x.call(arguments, 1))  if N.bind is m and m
    throw new TypeError  unless H.isFunction(N)
    K = x.call(arguments, 2)
    M = ->
      return N.apply(L, K.concat(x.call(arguments)))  unless this instanceof M
      h:: = N::
      P = new h
      O = N.apply(P, K.concat(x.call(arguments)))
      return O  if Object(O) is O
      P

  H.bindAll = (L) ->
    K = x.call(arguments, 1)
    K = H.functions(L)  if K.length is 0
    d K, (M) ->
      L[M] = H.bind(L[M], L)

    L

  H.memoize = (M, L) ->
    K = {}
    L or (L = H.identity)
    ->
      N = L.apply(this, arguments)
      (if H.has(K, N) then K[N] else (K[N] = M.apply(this, arguments)))

  H.delay = (L, M) ->
    K = x.call(arguments, 2)
    setTimeout (->
      L.apply L, K
    ), M

  H.defer = (K) ->
    H.delay.apply H, [ K, 1 ].concat(x.call(arguments, 1))

  H.throttle = (P, R) ->
    N = undefined
    K = undefined
    Q = undefined
    O = undefined
    M = undefined
    L = H.debounce(->
      M = O = false
    , R)
    ->
      N = this
      K = arguments
      S = ->
        Q = null
        P.apply N, K  if M
        L()

      Q = setTimeout(S, R)  unless Q
      if O
        M = true
      else
        P.apply N, K
      L()
      O = true

  H.debounce = (K, M) ->
    L = undefined
    ->
      P = this
      O = arguments
      N = ->
        L = null
        K.apply P, O

      clearTimeout L
      L = setTimeout(N, M)

  H.once = (M) ->
    K = false
    L = undefined
    ->
      return L  if K
      K = true
      L = M.apply(this, arguments)

  H.wrap = (K, L) ->
    ->
      M = [ K ].concat(x.call(arguments, 0))
      L.apply this, M

  H.compose = ->
    K = arguments
    ->
      L = arguments
      M = K.length - 1

      while M >= 0
        L = [ K[M].apply(this, L) ]
        M--
      L[0]

  H.after = (L, K) ->
    return K()  if L <= 0
    ->
      K.apply this, arguments  if --L < 1

  H.keys = E or (M) ->
    throw new TypeError("Invalid object")  if M isnt Object(M)
    L = []
    for K of M
      L[L.length] = K  if H.has(M, K)
    L

  H.values = (K) ->
    H.map K, H.identity

  H.functions = H.methods = (M) ->
    L = []
    for K of M
      L.push K  if H.isFunction(M[K])
    L.sort()

  H.extend = (K) ->
    d x.call(arguments, 1), (L) ->
      for M of L
        K[M] = L[M]

    K

  H.defaults = (K) ->
    d x.call(arguments, 1), (L) ->
      for M of L
        K[M] = L[M]  unless K[M]?

    K

  H.clone = (K) ->
    return K  unless H.isObject(K)
    (if H.isArray(K) then K.slice() else H.extend({}, K))

  H.tap = (L, K) ->
    K L
    L

  H.isEqual = (L, K) ->
    G L, K, []

  H.isEmpty = (L) ->
    return L.length is 0  if H.isArray(L) or H.isString(L)
    for K of L
      return false  if H.has(L, K)
    true

  H.isElement = (K) ->
    !!(K and K.nodeType is 1)

  H.isArray = c or (K) ->
    A.call(K) is "[object Array]"

  H.isObject = (K) ->
    K is Object(K)

  H.isArguments = (K) ->
    A.call(K) is "[object Arguments]"

  unless H.isArguments(arguments)
    H.isArguments = (K) ->
      !!(K and H.has(K, "callee"))
  H.isFunction = (K) ->
    A.call(K) is "[object Function]"

  H.isString = (K) ->
    A.call(K) is "[object String]"

  H.isNumber = (K) ->
    A.call(K) is "[object Number]"

  H.isNaN = (K) ->
    K isnt K

  H.isBoolean = (K) ->
    K is true or K is false or A.call(K) is "[object Boolean]"

  H.isDate = (K) ->
    A.call(K) is "[object Date]"

  H.isRegExp = (K) ->
    A.call(K) is "[object RegExp]"

  H.isNull = (K) ->
    K is null

  H.isUndefined = (K) ->
    K is undefined

  H.has = (L, K) ->
    r.call L, K

  H.noConflict = ->
    z._ = v
    this

  H.identity = (K) ->
    K

  H.times = (N, M, L) ->
    K = 0

    while K < N
      M.call L, K
      K++

  H.escape = (K) ->
    ("" + K).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace /\//g, "&#x2F;"

  H.mixin = (K) ->
    d H.functions(K), (L) ->
      u L, H[L] = K[L]

  n = 0
  H.uniqueId = (K) ->
    L = n++
    (if K then K + L else L)

  H.templateSettings =
    evaluate: /<%([\s\S]+?)%>/g
    interpolate: /<%=([\s\S]+?)%>/g
    escape: /<%-([\s\S]+?)%>/g

  w = /.^/
  s = (K) ->
    K.replace(/\\\\/g, "\\").replace /\\'/g, "'"

  H.template = (N, M) ->
    O = H.templateSettings
    K = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + N.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(O.escape or w, (P, Q) ->
      "',_.escape(" + s(Q) + "),'"
    ).replace(O.interpolate or w, (P, Q) ->
      "'," + s(Q) + ",'"
    ).replace(O.evaluate or w, (P, Q) ->
      "');" + s(Q).replace(/[\r\n\t]/g, " ") + ";__p.push('"
    ).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');"
    L = new Function("obj", "_", K)
    return L(M, H)  if M
    (P) ->
      L.call this, P, H

  H.chain = (K) ->
    H(K).chain()

  g = (K) ->
    @_wrapped = K

  H:: = g::
  q = (L, K) ->
    (if K then H(L).chain() else L)

  u = (K, L) ->
    g::[K] = ->
      M = x.call(arguments)
      B.call M, @_wrapped
      q L.apply(H, M), @_chain

  H.mixin H
  d [ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], (K) ->
    L = l[K]
    g::[K] = ->
      M = @_wrapped
      L.apply M, arguments
      N = M.length
      delete M[0]  if (K is "shift" or K is "splice") and N is 0
      q M, @_chain

  d [ "concat", "join", "slice" ], (K) ->
    L = l[K]
    g::[K] = ->
      q L.apply(@_wrapped, arguments), @_chain

  g::chain = ->
    @_chain = true
    this

  g::value = ->
    @_wrapped
).call this
JSON = undefined
JSON = {}  unless JSON
(->
  f = (n) ->
    (if n < 10 then "0" + n else n)
  quote = (string) ->
    escapable.lastIndex = 0
    (if escapable.test(string) then "\"" + string.replace(escapable, (a) ->
      c = meta[a]
      (if typeof c is "string" then c else "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4))
    ) + "\"" else "\"" + string + "\"")
  str = (key, holder) ->
    i = undefined
    k = undefined
    v = undefined
    length = undefined
    mind = gap
    partial = undefined
    value = holder[key]
    value = value.toJSON(key)  if value and typeof value is "object" and typeof value.toJSON is "function"
    value = rep.call(holder, key, value)  if typeof rep is "function"
    switch typeof value
      when "string"
        quote value
      when "number"
        (if isFinite(value) then String(value) else "null")
      when "boolean", "null"
        String value
      when "object"
        return "null"  unless value
        gap += indent
        partial = []
        if Object::toString.apply(value) is "[object Array]"
          length = value.length
          i = 0
          while i < length
            partial[i] = str(i, value) or "null"
            i += 1
          v = (if partial.length is 0 then "[]" else (if gap then "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" else "[" + partial.join(",") + "]"))
          gap = mind
          return v
        if rep and typeof rep is "object"
          length = rep.length
          i = 0
          while i < length
            if typeof rep[i] is "string"
              k = rep[i]
              v = str(k, value)
              partial.push quote(k) + (if gap then ": " else ":") + v  if v
            i += 1
        else
          for k of value
            if Object::hasOwnProperty.call(value, k)
              v = str(k, value)
              partial.push quote(k) + (if gap then ": " else ":") + v  if v
        v = (if partial.length is 0 then "{}" else (if gap then "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" else "{" + partial.join(",") + "}"))
        gap = mind
        v
  if typeof Date::toJSON isnt "function"
    Date::toJSON = (key) ->
      (if isFinite(@valueOf()) then @getUTCFullYear() + "-" + f(@getUTCMonth() + 1) + "-" + f(@getUTCDate()) + "T" + f(@getUTCHours()) + ":" + f(@getUTCMinutes()) + ":" + f(@getUTCSeconds()) + "Z" else null)

    String::toJSON = Number::toJSON = Boolean::toJSON = (key) ->
      @valueOf()
  cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
  escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
  gap = undefined
  indent = undefined
  meta =
    "\b": "\\b"
    "\t": "\\t"
    "\n": "\\n"
    "\f": "\\f"
    "\r": "\\r"
    "\"": "\\\""
    "\\": "\\\\"

  rep = undefined
  if typeof JSON.stringify isnt "function"
    JSON.stringify = (value, replacer, space) ->
      i = undefined
      gap = ""
      indent = ""
      if typeof space is "number"
        i = 0
        while i < space
          indent += " "
          i += 1
      else
        indent = space  if typeof space is "string"
      rep = replacer
      throw new Error("JSON.stringify")  if replacer and typeof replacer isnt "function" and (typeof replacer isnt "object" or typeof replacer.length isnt "number")
      str "",
        "": value
  if typeof JSON.parse isnt "function"
    JSON.parse = (text, reviver) ->
      walk = (holder, key) ->
        k = undefined
        v = undefined
        value = holder[key]
        if value and typeof value is "object"
          for k of value
            if Object::hasOwnProperty.call(value, k)
              v = walk(value, k)
              if v isnt `undefined`
                value[k] = v
              else
                delete value[k]
        reviver.call holder, key, value
      j = undefined
      text = String(text)
      cx.lastIndex = 0
      if cx.test(text)
        text = text.replace(cx, (a) ->
          "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        )
      if /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))
        j = eval("(" + text + ")")
        return (if typeof reviver is "function" then walk(
          "": j
        , "") else j)
      throw new SyntaxError("JSON.parse")
)()
(->
  p = this
  n = p.Backbone
  o = Array::slice
  w = Array::splice
  b = undefined
  if typeof exports isnt "undefined"
    b = exports
  else
    b = p.Backbone = {}
  b.VERSION = "0.9.0"
  x = p._
  x = require("underscore")  if not x and (typeof require isnt "undefined")
  e = p.jQuery or p.Zepto or p.ender
  b.noConflict = ->
    p.Backbone = n
    this

  b.emulateHTTP = false
  b.emulateJSON = false
  b.Events =
    on: (B, E, A) ->
      C = undefined
      B = B.split(/\s+/)
      z = @_callbacks or (@_callbacks = {})
      while C = B.shift()
        D = z[C] or (z[C] = {})
        y = D.tail or (D.tail = D.next = {})
        y.callback = E
        y.context = A
        D.tail = y.next = {}
      this

    off: (A, D, z) ->
      C = undefined
      y = undefined
      B = undefined
      unless A
        delete @_callbacks
      else
        if y = @_callbacks
          A = A.split(/\s+/)
          while C = A.shift()
            B = y[C]
            delete y[C]

            continue  if not D or not B
            while (B = B.next) and B.next
              continue  if B.callback is D and (not z or B.context is z)
              @on C, B.callback, B.context
      this

    trigger: (B) ->
      F = undefined
      E = undefined
      A = undefined
      z = undefined
      y = undefined
      D = undefined
      C = undefined
      return this  unless A = @_callbacks
      D = A.all
      (B = B.split(/\s+/)).push null
      while F = B.shift()
        if D
          B.push
            next: D.next
            tail: D.tail
            event: F
        continue  unless E = A[F]
        B.push
          next: E.next
          tail: E.tail
      C = o.call(arguments, 1)
      while E = B.pop()
        z = E.tail
        y = (if E.event then [ E.event ].concat(C) else C)
        E.callback.apply E.context or this, y  while (E = E.next) isnt z
      this

  b.Events.bind = b.Events.on
  b.Events.unbind = b.Events.off
  b.Model = (y, z) ->
    A = undefined
    y or (y = {})
    y = @parse(y)  if z and z.parse
    y = x.extend({}, A, y)  if A = c(this, "defaults")
    @collection = z.collection  if z and z.collection
    @attributes = {}
    @_escapedAttributes = {}
    @cid = x.uniqueId("c")
    @_changed = {}
    throw new Error("Can't create an invalid model")  unless @set(y,
      silent: true
    )
    @_changed = {}
    @_previousAttributes = x.clone(@attributes)
    @initialize.apply this, arguments

  x.extend b.Model::, b.Events,
    idAttribute: "id"
    initialize: ->

    toJSON: ->
      x.clone @attributes

    get: (y) ->
      @attributes[y]

    escape: (y) ->
      z = undefined
      return z  if z = @_escapedAttributes[y]
      A = @attributes[y]
      @_escapedAttributes[y] = x.escape((if not A? then "" else "" + A))

    has: (y) ->
      @attributes[y]?

    set: (F, E, H) ->
      G = undefined
      D = undefined
      B = undefined
      if x.isObject(F) or not F?
        G = F
        H = E
      else
        G = {}
        G[F] = E
      H or (H = {})
      return this  unless G
      G = G.attributes  if G instanceof b.Model
      if H.unset
        for D of G
          G[D] = undefined
      return false  if @validate and not @_performValidation(G, H)
      @id = G[@idAttribute]  if @idAttribute of G
      z = @attributes
      y = @_escapedAttributes
      C = @_previousAttributes or {}
      A = @_changing
      @_changing = true
      for D of G
        B = G[D]
        delete y[D]  unless x.isEqual(z[D], B)
        (if H.unset then delete z[D]
         else z[D] = B)
        delete @_changed[D]

        @_changed[D] = B  if not x.isEqual(C[D], B) or (x.has(z, D) isnt x.has(C, D))
      unless A
        @change H  if not H.silent and @hasChanged()
        @_changing = false
      this

    unset: (y, z) ->
      (z or (z = {})).unset = true
      @set y, null, z

    clear: (y) ->
      (y or (y = {})).unset = true
      @set x.clone(@attributes), y

    fetch: (z) ->
      z = (if z then x.clone(z) else {})
      y = this
      A = z.success
      z.success = (D, B, C) ->
        return false  unless y.set(y.parse(D, C), z)
        A y, D  if A

      z.error = b.wrapError(z.error, y, z)
      (@sync or b.sync).call this, "read", this, z

    save: (B, C, A) ->
      z = undefined
      if x.isObject(B) or not B?
        z = B
        A = C
      else
        z = {}
        z[B] = C
      A = (if A then x.clone(A) else {})
      return false  if z and not this[(if A.wait then "_performValidation" else "set")](z, A)
      y = this
      D = A.success
      A.success = (I, F, H) ->
        G = y.parse(I, H)
        G = x.extend(z or {}, G)  if A.wait
        return false  unless y.set(G, A)
        if D
          D y, I
        else
          y.trigger "sync", y, I, A

      A.error = b.wrapError(A.error, y, A)
      E = (if @isNew() then "create" else "update")
      (@sync or b.sync).call this, E, this, A

    destroy: (z) ->
      z = (if z then x.clone(z) else {})
      y = this
      C = z.success
      B = ->
        y.trigger "destroy", y, y.collection, z

      return B()  if @isNew()
      z.success = (D) ->
        B()  if z.wait
        if C
          C y, D
        else
          y.trigger "sync", y, D, z

      z.error = b.wrapError(z.error, y, z)
      A = (@sync or b.sync).call(this, "delete", this, z)
      B()  unless z.wait
      A

    url: ->
      y = c(@collection, "url") or c(this, "urlRoot") or r()
      return y  if @isNew()
      y + (if y.charAt(y.length - 1) is "/" then "" else "/") + encodeURIComponent(@id)

    parse: (z, y) ->
      z

    clone: ->
      new @constructor(@attributes)

    isNew: ->
      not @id?

    change: (z) ->
      for y of @_changed
        @trigger "change:" + y, this, @_changed[y], z
      @trigger "change", this, z
      @_previousAttributes = x.clone(@attributes)
      @_changed = {}

    hasChanged: (y) ->
      return x.has(@_changed, y)  if y
      not x.isEmpty(@_changed)

    changedAttributes: (A) ->
      return (if @hasChanged() then x.clone(@_changed) else false)  unless A
      C = undefined
      B = false
      z = @_previousAttributes
      for y of A
        continue  if x.isEqual(z[y], (C = A[y]))
        (B or (B = {}))[y] = C
      B

    previous: (y) ->
      return null  if not y or not @_previousAttributes
      @_previousAttributes[y]

    previousAttributes: ->
      x.clone @_previousAttributes

    _performValidation: (A, z) ->
      B = x.extend({}, @attributes, A)
      y = @validate(B, z)
      if y
        if z.error
          z.error this, y, z
        else
          @trigger "error", this, y, z
        return false
      true

  b.Collection = (z, y) ->
    y or (y = {})
    @comparator = y.comparator  if y.comparator
    @_reset()
    @initialize.apply this, arguments
    if z
      @reset z,
        silent: true
        parse: y.parse

  x.extend b.Collection::, b.Events,
    model: b.Model
    initialize: ->

    toJSON: ->
      @map (y) ->
        y.toJSON()

    add: (z, H) ->
      D = undefined
      F = undefined
      B = undefined
      E = undefined
      G = undefined
      A = undefined
      C = {}
      y = {}
      H or (H = {})
      z = (if x.isArray(z) then z.slice() else [ z ])
      D = 0
      B = z.length

      while D < B
        throw new Error("Can't add an invalid model to a collection")  unless E = z[D] = @_prepareModel(z[D], H)
        throw new Error("Can't add the same model to a collection twice")  if C[G = E.cid] or @_byCid[G] or ((A = E.id)?) and (y[A] or @_byId[A])
        C[G] = y[A] = E
        D++
      D = 0
      while D < B
        (E = z[D]).on "all", @_onModelEvent, this
        @_byCid[E.cid] = E
        @_byId[E.id] = E  if E.id?
        D++
      @length += B
      F = (if H.at? then H.at else @models.length)
      w.apply @models, [ F, 0 ].concat(z)
      @sort silent: true  if @comparator
      return this  if H.silent
      D = 0
      B = @models.length

      while D < B
        continue  unless C[(E = @models[D]).cid]
        H.index = D
        E.trigger "add", E, this, H
        D++
      this

    remove: (D, B) ->
      C = undefined
      y = undefined
      A = undefined
      z = undefined
      B or (B = {})
      D = (if x.isArray(D) then D.slice() else [ D ])
      C = 0
      y = D.length

      while C < y
        z = @getByCid(D[C]) or @get(D[C])
        continue  unless z
        delete @_byId[z.id]

        delete @_byCid[z.cid]

        A = @indexOf(z)
        @models.splice A, 1
        @length--
        unless B.silent
          B.index = A
          z.trigger "remove", z, this, B
        @_removeReference z
        C++
      this

    get: (y) ->
      return null  unless y?
      @_byId[(if y.id? then y.id else y)]

    getByCid: (y) ->
      y and @_byCid[y.cid or y]

    at: (y) ->
      @models[y]

    sort: (z) ->
      z or (z = {})
      throw new Error("Cannot sort a set without a comparator")  unless @comparator
      y = x.bind(@comparator, this)
      if @comparator.length is 1
        @models = @sortBy(y)
      else
        @models.sort y
      @trigger "reset", this, z  unless z.silent
      this

    pluck: (y) ->
      x.map @models, (z) ->
        z.get y

    reset: (B, z) ->
      B or (B = [])
      z or (z = {})
      A = 0
      y = @models.length

      while A < y
        @_removeReference @models[A]
        A++
      @_reset()
      @add B,
        silent: true
        parse: z.parse

      @trigger "reset", this, z  unless z.silent
      this

    fetch: (y) ->
      y = (if y then x.clone(y) else {})
      y.parse = true  if y.parse is `undefined`
      A = this
      z = y.success
      y.success = (D, B, C) ->
        A[(if y.add then "add" else "reset")] A.parse(D, C), y
        z A, D  if z

      y.error = b.wrapError(y.error, A, y)
      (@sync or b.sync).call this, "read", this, y

    create: (z, y) ->
      A = this
      y = (if y then x.clone(y) else {})
      z = @_prepareModel(z, y)
      return false  unless z
      A.add z, y  unless y.wait
      B = y.success
      y.success = (C, E, D) ->
        A.add C, y  if y.wait
        if B
          B C, E
        else
          C.trigger "sync", z, E, y

      z.save null, y
      z

    parse: (z, y) ->
      z

    chain: ->
      x(@models).chain()

    _reset: (y) ->
      @length = 0
      @models = []
      @_byId = {}
      @_byCid = {}

    _prepareModel: (A, z) ->
      unless A instanceof b.Model
        y = A
        z.collection = this
        A = new @model(y, z)
        A = false  if A.validate and not A._performValidation(A.attributes, z)
      else
        A.collection = this  unless A.collection
      A

    _removeReference: (y) ->
      delete y.collection  if this is y.collection
      y.off "all", @_onModelEvent, this

    _onModelEvent: (A, z, B, y) ->
      return  if (A is "add" or A is "remove") and B isnt this
      @remove z, y  if A is "destroy"
      if z and A is "change:" + z.idAttribute
        delete @_byId[z.previous(z.idAttribute)]

        @_byId[z.id] = z
      @trigger.apply this, arguments

  u = [ "forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy" ]
  x.each u, (y) ->
    b.Collection::[y] = ->
      x[y].apply x, [ @models ].concat(x.toArray(arguments))

  b.Router = (y) ->
    y or (y = {})
    @routes = y.routes  if y.routes
    @_bindRoutes()
    @initialize.apply this, arguments

  g = /:\w+/g
  v = /\*\w+/g
  d = /[-[\]{}()+?.,\\^$|#\s]/g
  x.extend b.Router::, b.Events,
    initialize: ->

    route: (y, z, A) ->
      b.history or (b.history = new b.History)
      y = @_routeToRegExp(y)  unless x.isRegExp(y)
      A = this[z]  unless A
      b.history.route y, x.bind((C) ->
        B = @_extractParameters(y, C)
        A and A.apply(this, B)
        @trigger.apply this, [ "route:" + z ].concat(B)
        b.history.trigger "route", this, z, B
      , this)
      this

    navigate: (z, y) ->
      b.history.navigate z, y

    _bindRoutes: ->
      return  unless @routes
      z = []
      for A of @routes
        z.unshift [ A, @routes[A] ]
      B = 0
      y = z.length

      while B < y
        @route z[B][0], z[B][1], this[z[B][1]]
        B++

    _routeToRegExp: (y) ->
      y = y.replace(d, "\\$&").replace(g, "([^/]+)").replace(v, "(.*?)")
      new RegExp("^" + y + "$")

    _extractParameters: (y, z) ->
      y.exec(z).slice 1

  b.History = ->
    @handlers = []
    x.bindAll this, "checkUrl"

  m = /^[#\/]/
  h = /msie [\w.]+/
  l = false
  x.extend b.History::, b.Events,
    interval: 50
    getFragment: (z, y) ->
      unless z?
        if @_hasPushState or y
          z = window.location.pathname
          A = window.location.search
          z += A  if A
        else
          z = window.location.hash
      z = decodeURIComponent(z.replace(m, ""))
      z = z.substr(@options.root.length)  unless z.indexOf(@options.root)
      z

    start: (A) ->
      throw new Error("Backbone.history has already been started")  if l
      @options = x.extend({},
        root: "/"
      , @options, A)
      @_wantsHashChange = @options.hashChange isnt false
      @_wantsPushState = !!@options.pushState
      @_hasPushState = !!(@options.pushState and window.history and window.history.pushState)
      z = @getFragment()
      y = document.documentMode
      C = (h.exec(navigator.userAgent.toLowerCase()) and (not y or y <= 7))
      if C
        @iframe = e("<iframe src=\"javascript:0\" tabindex=\"-1\" />").hide().appendTo("body")[0].contentWindow
        @navigate z
      if @_hasPushState
        e(window).bind "popstate", @checkUrl
      else
        if @_wantsHashChange and ("onhashchange" of window) and not C
          e(window).bind "hashchange", @checkUrl
        else
          @_checkUrlInterval = setInterval(@checkUrl, @interval)  if @_wantsHashChange
      @fragment = z
      l = true
      D = window.location
      B = D.pathname is @options.root
      if @_wantsHashChange and @_wantsPushState and not @_hasPushState and not B
        @fragment = @getFragment(null, true)
        window.location.replace @options.root + "#" + @fragment
        return true
      else
        if @_wantsPushState and @_hasPushState and B and D.hash
          @fragment = D.hash.replace(m, "")
          window.history.replaceState {}, document.title, D.protocol + "//" + D.host + @options.root + @fragment
      @loadUrl()  unless @options.silent

    stop: ->
      e(window).unbind("popstate", @checkUrl).unbind "hashchange", @checkUrl
      clearInterval @_checkUrlInterval
      l = false

    route: (y, z) ->
      @handlers.unshift
        route: y
        callback: z

    checkUrl: (z) ->
      y = @getFragment()
      y = @getFragment(@iframe.location.hash)  if y is @fragment and @iframe
      return false  if y is @fragment or y is decodeURIComponent(@fragment)
      @navigate y  if @iframe
      @loadUrl() or @loadUrl(window.location.hash)

    loadUrl: (A) ->
      z = @fragment = @getFragment(A)
      y = x.any(@handlers, (B) ->
        if B.route.test(z)
          B.callback z
          true
      )
      y

    navigate: (z, y) ->
      return false  unless l
      y = trigger: y  if not y or y is true
      A = (z or "").replace(m, "")
      return  if @fragment is A or @fragment is decodeURIComponent(A)
      if @_hasPushState
        A = @options.root + A  unless A.indexOf(@options.root) is 0
        @fragment = A
        window.history[(if y.replace then "replaceState" else "pushState")] {}, document.title, A
      else
        if @_wantsHashChange
          @fragment = A
          @_updateHash window.location, A, y.replace
          if @iframe and (A isnt @getFragment(@iframe.location.hash))
            @iframe.document.open().close()  unless y.replace
            @_updateHash @iframe.location, A, y.replace
        else
          window.location.assign @options.root + z
      @loadUrl z  if y.trigger

    _updateHash: (y, z, A) ->
      if A
        y.replace y.toString().replace(/(javascript:|#).*$/, "") + "#" + z
      else
        y.hash = z

  b.View = (y) ->
    @cid = x.uniqueId("view")
    @_configure y or {}
    @_ensureElement()
    @initialize.apply this, arguments
    @delegateEvents()

  a = /^(\S+)\s*(.*)$/
  s = [ "model", "collection", "el", "id", "attributes", "className", "tagName" ]
  x.extend b.View::, b.Events,
    tagName: "div"
    $: (y) ->
      @$el.find y

    initialize: ->

    render: ->
      this

    remove: ->
      @$el.remove()
      this

    make: (z, y, B) ->
      A = document.createElement(z)
      e(A).attr y  if y
      e(A).html B  if B
      A

    setElement: (y, z) ->
      @$el = e(y)
      @el = @$el[0]
      @delegateEvents()  if z isnt false

    delegateEvents: (C) ->
      return  unless C or (C = c(this, "events"))
      @undelegateEvents()
      for B of C
        D = C[B]
        D = this[C[B]]  unless x.isFunction(D)
        throw new Error("Event \"" + C[B] + "\" does not exist")  unless D
        A = B.match(a)
        z = A[1]
        y = A[2]
        D = x.bind(D, this)
        z += ".delegateEvents" + @cid
        if y is ""
          @$el.bind z, D
        else
          @$el.delegate y, z, D

    undelegateEvents: ->
      @$el.unbind ".delegateEvents" + @cid

    _configure: (A) ->
      A = x.extend({}, @options, A)  if @options
      B = 0
      z = s.length

      while B < z
        y = s[B]
        this[y] = A[y]  if A[y]
        B++
      @options = A

    _ensureElement: ->
      unless @el
        y = c(this, "attributes") or {}
        y.id = @id  if @id
        y["class"] = @className  if @className
        @setElement @make(@tagName, y), false
      else
        @setElement @el, false

  t = (y, z) ->
    A = j(this, y, z)
    A.extend = @extend
    A

  b.Model.extend = b.Collection.extend = b.Router.extend = b.View.extend = t
  q =
    create: "POST"
    update: "PUT"
    delete: "DELETE"
    read: "GET"

  b.sync = (C, z, y) ->
    A = q[C]
    B =
      type: A
      dataType: "json"

    B.url = c(z, "url") or r()  unless y.url
    if not y.data and z and (C is "create" or C is "update")
      B.contentType = "application/json"
      B.data = JSON.stringify(z.toJSON())
    if b.emulateJSON
      B.contentType = "application/x-www-form-urlencoded"
      B.data = (if B.data then model: B.data else {})
    if b.emulateHTTP
      if A is "PUT" or A is "DELETE"
        B.data._method = A  if b.emulateJSON
        B.type = "POST"
        B.beforeSend = (D) ->
          D.setRequestHeader "X-HTTP-Method-Override", A
    B.processData = false  if B.type isnt "GET" and not b.emulateJSON
    e.ajax x.extend(B, y)

  b.wrapError = (z, A, y) ->
    (B, C) ->
      C = (if B is A then C else B)
      if z
        z B, C, y
      else
        A.trigger "error", B, C, y

  f = ->

  j = (z, y, A) ->
    B = undefined
    if y and y.hasOwnProperty("constructor")
      B = y.constructor
    else
      B = ->
        z.apply this, arguments
    x.extend B, z
    f:: = z::
    B:: = new f()
    x.extend B::, y  if y
    x.extend B, A  if A
    B::constructor = B
    B.__super__ = z::
    B

  c = (y, z) ->
    return null  unless y and y[z]
    (if x.isFunction(y[z]) then y[z]() else y[z])

  r = ->
    throw new Error("A \"url\" property or function must be specified")
).call this
((a, g) ->
  d = (e, j) ->
    b.addType e, (t, s, u) ->
      m = undefined
      r = undefined
      n = undefined
      o = undefined
      p = s
      l = (new Date()).getTime()
      unless t
        p = {}
        o = []
        n = 0
        try
          t = j.length
          while t = j.key(n++)
            if h.test(t)
              r = JSON.parse(j.getItem(t))
              if r.expires and r.expires <= l
                o.push t
              else
                p[t.replace(h, "")] = r.data
          j.removeItem t  while t = o.pop()
        return p
      t = "__amplify__" + t
      if s is g
        m = j.getItem(t)
        r = (if m then JSON.parse(m) else expires: -1)
        if r.expires and r.expires <= l
          j.removeItem t
        else
          return r.data
      else
        if s is null
          j.removeItem t
        else
          r = JSON.stringify(
            data: s
            expires: (if u.expires then l + u.expires else null)
          )
          try
            j.setItem t, r
          catch q
            b[e]()
            try
              j.setItem t, r
            catch q
              throw b.error()
      p
  b = a.store = (j, m, e, l) ->
    l = b.type
    l = e.type  if e and e.type and e.type of b.types
    b.types[l] j, m, e or {}

  b.types = {}
  b.type = null
  b.addType = (e, j) ->
    b.type = e  unless b.type
    b.types[e] = j
    b[e] = (m, n, l) ->
      l = l or {}
      l.type = e
      b m, n, l

  b.error = ->
    "amplify.store quota exceeded"

  h = /^__amplify__/
  for c of
    localStorage: 1
    sessionStorage: 1
    try
      d c, window[c]  if window[c].getItem
  if window.globalStorage
    try
      d "globalStorage", window.globalStorage[window.location.hostname]
      b.type = "globalStorage"  if b.type is "sessionStorage"
  (->
    return  if b.types.localStorage
    j = document.createElement("div")
    e = "amplify"
    j.style.display = "none"
    document.getElementsByTagName("head")[0].appendChild j
    if j.addBehavior
      j.addBehavior "#default#userdata"
      b.addType "userData", (u, t, v) ->
        j.load e
        q = undefined
        s = undefined
        o = undefined
        m = undefined
        n = undefined
        p = t
        l = (new Date()).getTime()
        unless u
          p = {}
          n = []
          m = 0
          while q = j.XMLDocument.documentElement.attributes[m++]
            s = JSON.parse(q.value)
            if s.expires and s.expires <= l
              n.push q.name
            else
              p[q.name] = s.data
          j.removeAttribute u  while u = n.pop()
          j.save e
          return p
        u = u.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-")
        if t is g
          q = j.getAttribute(u)
          s = (if q then JSON.parse(q) else expires: -1)
          if s.expires and s.expires <= l
            j.removeAttribute u
          else
            return s.data
        else
          if t is null
            j.removeAttribute u
          else
            o = j.getAttribute(u)
            s = JSON.stringify(
              data: t
              expires: (if v.expires then (l + v.expires) else null)
            )
            j.setAttribute u, s
        try
          j.save e
        catch r
          if o is null
            j.removeAttribute u
          else
            j.setAttribute u, o
          b.userData()
          try
            j.setAttribute u, s
            j.save e
          catch r
            if o is null
              j.removeAttribute u
            else
              j.setAttribute u, o
            throw b.error()
        p
  )()
  (->
    e = (l) ->
      (if l is g then g else JSON.parse(JSON.stringify(l)))
    j = {}
    b.addType "memory", (m, n, l) ->
      return e(j)  unless m
      return e(j[m])  if n is g
      if n is null
        delete j[m]

        return null
      j[m] = n
      if l.expires
        setTimeout (->
          delete j[m]
        ), l.expires
      n
  )()
) @amplify = @amplify or {}
window.Store = (b) ->
  @name = b
  a = amplify.store(@name)
  @records = (a and a.split(",")) or []

_.extend Store::,
  save: ->
    amplify.store @name, @records.join(",")

  create: (a) ->
    a.id = a.attributes.id = guid()  unless a.id
    amplify.store @name + "-" + a.id, JSON.stringify(a)
    @records.push a.id.toString()
    @save()
    a

  update: (a) ->
    amplify.store @name + "-" + a.id, JSON.stringify(a)
    @records.push a.id.toString()  unless _.include(@records, a.id.toString())
    @save()
    a

  find: (a) ->
    JSON.parse amplify.store(@name + "-" + a.id)

  findAll: ->
    _.map @records, ((a) ->
      JSON.parse amplify.store(@name + "-" + a)
    ), this

  destroy: (a) ->
    amplify.store @name + "-" + a.id, null
    @records = _.reject(@records, (b) ->
      b is a.id.toString()
    )
    @save()
    a

defaultSync = Backbone.sync
amplifySync = (f, d, c, b) ->
  e = undefined
  a = d.localStorage or d.collection.localStorage
  switch f
    when "read"
      e = (if d.id then a.find(d) else a.findAll())
    when "create"
      e = a.create(d)
    when "update"
      e = a.update(d)
    when "delete"
      e = a.destroy(d)
  if e
    c.success e
  else
    c.error "Record not found"

Backbone.sync = (c, b, a) ->
  if typeof (b.localStorage) isnt "undefined" or (typeof (b.collection) isnt "undefined" and typeof (b.collection.localStorage) isnt "undefined")
    amplifySync c, b, a
  else
    defaultSync c, b, a

((a) ->
  b = a.route
  a.route = (c, d, e) ->
    b.call this, c, d, ->
      if location.hash isnt "" and location.hash isnt "#_=_"
        _gaq.push [ "_setAccount", "UA-23027768-1" ]
        _gaq.push [ "_trackPageview", "/" + location.hash ]
      e.apply this, arguments
) Backbone.Router::
((d) ->
  c = ->
    g = b(this)
    d(this).text a(g.datetime)  unless isNaN(g.datetime)
    this
  b = (g) ->
    g = d(g)
    unless g.data("timeago")
      g.data "timeago",
        datetime: f.datetime(g)

      h = d.trim(g.text())
      g.attr "title", h  if h.length > 0
    g.data "timeago"
  a = (g) ->
    f.inWords e(g)
  e = (g) ->
    new Date().getTime() - g.getTime() + new Date().getTimezoneOffset() * 60000
  d.timeago = (g) ->
    if g instanceof Date
      a g
    else
      if typeof g is "string"
        a d.timeago.parse(g)
      else
        a d.timeago.datetime(g)

  f = d.timeago
  d.extend d.timeago,
    settings:
      refreshMillis: 60000
      allowFuture: false
      strings:
        prefixAgo: null
        prefixFromNow: null
        suffixAgo: "ago"
        suffixFromNow: "from now"
        seconds: "less than a minute"
        minute: "about a minute"
        minutes: "%d minutes"
        hour: "about an hour"
        hours: "about %d hours"
        day: "a day"
        days: "%d days"
        month: "about a month"
        months: "%d months"
        year: "about a year"
        years: "%d years"
        numbers: []

    inWords: (n) ->
      h = (t, v) ->
        u = (if d.isFunction(t) then t(v, n) else t)
        w = (o.numbers and o.numbers[v]) or v
        u.replace /%d/i, w
      o = @settings.strings
      j = o.prefixAgo
      s = o.suffixAgo
      if @settings.allowFuture
        if n < 0
          j = o.prefixFromNow
          s = o.suffixFromNow
        n = Math.abs(n)
      q = n / 1000
      g = q / 60
      p = g / 60
      r = p / 24
      l = r / 365
      m = q < 45 and h(o.seconds, Math.round(q)) or q < 90 and h(o.minute, 1) or g < 45 and h(o.minutes, Math.round(g)) or g < 90 and h(o.hour, 1) or p < 24 and h(o.hours, Math.round(p)) or p < 48 and h(o.day, 1) or r < 30 and h(o.days, Math.floor(r)) or r < 60 and h(o.month, 1) or r < 365 and h(o.months, Math.floor(r / 30)) or l < 2 and h(o.year, 1) or h(o.years, Math.floor(l))
      d.trim [ j, m, s ].join(" ")

    parse: (h) ->
      g = d.trim(h)
      g = g.replace(/\.\d\d\d+/, "")
      g = g.replace(/-/, "/").replace(/-/, "/")
      g = g.replace(/T/, " ").replace(/Z/, " UTC")
      g = g.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2")
      new Date(g)

    datetime: (h) ->
      j = d(h).get(0).tagName.toLowerCase() is "time"
      g = (if j then d(h).attr("datetime") else d(h).attr("title"))
      f.parse g

  d.fn.timeago = ->
    h = this
    h.each c
    g = f.settings
    if g.refreshMillis > 0
      setInterval (->
        h.each c
      ), g.refreshMillis
    h

  document.createElement "abbr"
  document.createElement "time"
) jQuery
((d, b, a, c) ->
  c = d.fn.innerscroll = (e) ->
    @each ->
      c.init d(this), e

  d.fn.removeInnerscroll = (e) ->
    @each ->
      f = d(this).data(c.removerKey)
      f()  if d.isFunction(f)

  d.extend c,
    getNativeScrollbarWidth: ->
      g = document.createElement("p")
      g.style.width = "100%"
      g.style.height = "200px"
      h = document.createElement("div")
      h.style.position = "absolute"
      h.style.top = "0px"
      h.style.left = "0px"
      h.style.visibility = "hidden"
      h.style.width = "200px"
      h.style.height = "150px"
      h.style.overflow = "hidden"
      h.appendChild g
      document.body.appendChild h
      f = g.offsetWidth
      h.style.overflow = "scroll"
      e = g.offsetWidth
      e = h.clientWidth  if f is e
      document.body.removeChild h
      f - e

    removerKey: "iscrollRemover"
    events:
      moveThumbs: "scroll"
      mouseenter: "mouseenter"
      mousemove: "mousemove"
      mouseleave: "mouseleave"

    constants:
      thumbThickness: 6
      thumbOpacity: 0.7
      fadeSlow: 1000
      fadeMedium: 400
      fadeFast: 200
      trackFocusPadding: 20

    init: (g, e) ->
      e.draggable = true  unless (e.draggable is "false") or (e.draggable is false)
      e.autoFadeout = true  unless (e.autoFadeout is "false") or (e.autoFadeout is false)
      e.leftAdjust = e.leftAdjust or 0
      e.fadeoutDelay = e.fadeoutDelay or 200
      f =
        target: g
        destination: d(e.destination)
        options: e
        originalCSS:
          "overflow-x": g.css("overflow-x")
          "overflow-y": g.css("overflow-y")
          cursor: g.css("cursor")

        sizing: c.getSizing(g, d(e.destination), e)
        opacityLocked: false

      g.removeInnerscroll()
      g.data c.removerKey, c.removerFactory(g, f)
      g.css(
        "overflow-y": "auto"
        "overflow-x": "hidden"
      ).bind c.events.moveThumbs, f, c.moveThumbs
      c.bindMouseenter f
      c.bindMousemove f
      c.bindMouseleave f
      f.thumbs = {}
      f.tracks = {}
      f.tracks.vertical = d("<div/>").css(c.getTrackCSS(f.sizing.tracks.vertical)).click((h) ->
        f.target.scrollTop h.offsetY * f.sizing.getTargetScrollHeight() / f.sizing.getTargetHeight()
      )
      f.thumbs.vertical = d("<div/>").css(c.getThumbCSS(f.sizing.thumbs.vertical)).css(
        "-moz-user-select": "-moz-none"
        "-khtml-user-select": "none"
        "-webkit-user-select": "none"
        "-user-select": "none"
        cursor: "pointer"
      ).fadeTo(0, c.constants.thumbOpacity)
      f.tracks.vertical.prepend f.thumbs.vertical
      f.destination.prepend f.tracks.vertical
      f.thumbs.vertical.fadeTo c.constants.fadeSlow, 0  if e.autoFadeout
      if e.draggable and d.isFunction(d.fn.draggable)
        f.thumbs.vertical.draggable
          containment: "parent"
          axis: "y"
          cursor: "pointer"
          scroll: false
          start: ->
            g.unbind(c.events.moveThumbs, c.moveThumbs).unbind c.events.mouseenter, c.mouseenter
            f.destination.unbind(c.events.mousemove, c.mousemove).unbind c.events.mouseleave, c.mouseleave
            f.opacityLocked = true
            f.thumbs.vertical.stop(true, true).fadeTo c.constants.fadeFast, c.constants.thumbOpacity

          drag: (h, j) ->
            f.target.scrollTop f.thumbs.vertical.position().top * f.sizing.getTargetScrollHeight() / f.sizing.getTargetHeight()

          stop: ->
            c.hideThumbs f
            f.opacityLocked = false
            c.bindMouseleave f
            c.bindMousemove f
            c.bindMouseenter f
            g.bind c.events.moveThumbs, f, c.moveThumbs

    removerFactory: (f, e) ->
      ->
        f.css(e.originalCSS).unbind(c.events.moveThumbs, c.moveThumbs).unbind c.events.mouseenter, c.mouseenter
        e.destination.unbind(c.events.mousemove, c.mousemove).unbind c.events.mouseleave, c.mouseleave
        if e.thumbs
          e.thumbs.horizontal.remove()  if e.thumbs.horizontal
          e.thumbs.vertical.remove()  if e.thumbs.vertical

    bindMouseenter: (e) ->
      e.target.bind c.events.mouseenter, e, c.mouseenter  if e.options.autoFadeout

    bindMousemove: (e) ->
      e.destination.bind c.events.mousemove, e, c.mousemove  if e.options.autoFadeout

    bindMouseleave: (e) ->
      e.destination.bind c.events.mouseleave, e, c.mouseleave  if e.options.autoFadeout

    flashThumbs: (e) ->
      unless e.data.opacityLocked
        clearTimeout e.data.hideThumbsTimeout  if e.data.hideThumbsTimeout
        if e.data.thumbs.vertical
          e.data.thumbs.vertical.stop(true, true).fadeTo c.constants.fadeFast, c.constants.thumbOpacity
          e.data.tracks.vertical.stop(true, true).fadeTo c.constants.fadeFast, c.constants.thumbOpacity
        if e.data.thumbs.horizontal
          e.data.thumbs.horizontal.stop(true, true).fadeTo c.constants.fadeFast, c.constants.thumbOpacity
          e.data.tracks.horizontal.stop(true, true).fadeTo c.constants.fadeFast, c.constants.thumbOpacity
        c.hideThumbs e.data

    moveThumbs: (j) ->
      g = j.data.thumbs
      f = j.data.sizing
      e = f.calcVerticalThumbHeight()
      h = f.calcVerticalThumbTop()
      g.vertical.css "height", e + "px"  unless e is g.vertical.height()
      g.vertical.css "top", h + "px"  unless h is g.vertical.position().top
      c.flashThumbs j

    mousemove: (f) ->
      g = f.data.thumbs.vertical.offset().left
      e = f.pageX
      if a.abs(e - g) <= c.constants.trackFocusPadding
        f.data.opacityLocked = true
        f.data.thumbs.vertical.stop(true, true).fadeTo c.constants.fadeFast, c.constants.thumbOpacity
        f.data.tracks.vertical.stop(true, true).fadeTo c.constants.fadeFast, c.constants.thumbOpacity
      else
        if f.data.opacityLocked
          c.hideThumbs f.data
          f.data.opacityLocked = false

    mouseenter: (e) ->
      c.flashThumbs e

    mouseleave: (e) ->
      e.data.opacityLocked = false
      c.hideThumbs e.data

    hideThumbs: (e) ->
      if e.options.autoFadeout
        clearTimeout e.hideThumbsTimeout  if e.hideThumbsTimeout
        e.hideThumbsTimeout = setTimeout(->
          e.hideThumbsTimeout = `undefined`
          unless e.opacityLocked
            e.thumbs.vertical.stop(true, true).fadeTo c.constants.fadeFast, 0
            e.tracks.vertical.stop(true, true).fadeTo c.constants.fadeFast, 0
        , e.options.fadeoutDelay)

    getSizing: (j, g, f) ->
      h = c.getNativeScrollbarWidth()
      e =
        getTargetWidth: ->
          j.width()

        getTargetHeight: ->
          j.height()

        getTargetScrollHeight: ->
          parseFloat j.get(0).scrollHeight, 10

        getTargetScrollWidth: ->
          parseFloat j.get(0).scrollWidth, 10

        thumbs:
          horizontal: {}
          vertical:
            top: 0
            width: c.constants.thumbThickness
            corner: c.constants.thumbThickness / 2
            left: 0

        tracks:
          horizontal: {}
          vertical:
            left: j.position().left + j.width() - h - c.constants.thumbThickness + f.leftAdjust
            top: j.position().top
            height: j.height()

      e.calcVerticalThumbHeight = ->
        l = 0
        if e.getTargetScrollHeight() <= e.getTargetHeight()
          l = 0
        else
          l = e.getTargetHeight() * e.getTargetHeight() / e.getTargetScrollHeight()
        l

      e.thumbs.vertical.height = e.calcVerticalThumbHeight()
      e.calcVerticalThumbTop = ->
        j.height() * parseFloat(j.get(0).scrollTop, 10) / e.getTargetScrollHeight()

      e

    getThumbCSS: (e) ->
      position: "absolute"
      "background-color": "black"
      width: e.width + "px"
      height: e.height + "px"
      left: (if e.left then (e.left + "px") else (0 + "px"))
      top: (if e.top then (e.top + "px") else (0 + "px"))
      "-moz-border-radius": e.corner + "px"
      "-webkit-border-radius": e.corner + "px"
      "border-radius": e.corner + "px"
      "z-index": "999"

    getTrackCSS: (e) ->
      position: "absolute"
      height: e.height + "px"
      left: e.left + "px"
      top: e.top + "px"
) jQuery, window, Math
((c, d) ->
  c.fn.jPlayer = (h) ->
    g = "jPlayer"
    e = typeof h is "string"
    f = Array::slice.call(arguments, 1)
    j = this
    h = (if not e and f.length then c.extend.apply(null, [ true, h ].concat(f)) else h)
    return j  if e and h.charAt(0) is "_"
    if e
      @each ->
        l = c.data(this, g)
        m = (if l and c.isFunction(l[h]) then l[h].apply(l, f) else l)
        if m isnt l and m isnt d
          j = m
          false
    else
      @each ->
        l = c.data(this, g)
        if l
          l.option h or {}
        else
          c.data this, g, new c.jPlayer(h, this)
    j

  c.jPlayer = (f, g) ->
    if arguments.length
      @element = c(g)
      @options = c.extend(true, {}, @options, f)
      e = this
      @element.bind "remove.jPlayer", ->
        e.destroy()

      @_init()

  c.jPlayer.emulateMethods = "load play pause"
  c.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate"
  c.jPlayer.emulateOptions = "muted volume"
  c.jPlayer.reservedEvent = "ready flashreset resize repeat error warning"
  c.jPlayer.event =
    ready: "jPlayer_ready"
    flashreset: "jPlayer_flashreset"
    resize: "jPlayer_resize"
    repeat: "jPlayer_repeat"
    click: "jPlayer_click"
    error: "jPlayer_error"
    warning: "jPlayer_warning"
    loadstart: "jPlayer_loadstart"
    progress: "jPlayer_progress"
    suspend: "jPlayer_suspend"
    abort: "jPlayer_abort"
    emptied: "jPlayer_emptied"
    stalled: "jPlayer_stalled"
    play: "jPlayer_play"
    pause: "jPlayer_pause"
    loadedmetadata: "jPlayer_loadedmetadata"
    loadeddata: "jPlayer_loadeddata"
    waiting: "jPlayer_waiting"
    playing: "jPlayer_playing"
    canplay: "jPlayer_canplay"
    canplaythrough: "jPlayer_canplaythrough"
    seeking: "jPlayer_seeking"
    seeked: "jPlayer_seeked"
    timeupdate: "jPlayer_timeupdate"
    ended: "jPlayer_ended"
    ratechange: "jPlayer_ratechange"
    durationchange: "jPlayer_durationchange"
    volumechange: "jPlayer_volumechange"

  c.jPlayer.htmlEvent = [ "loadstart", "abort", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "ratechange" ]
  c.jPlayer.pause = ->
    c.each c.jPlayer::instances, (f, e) ->
      e.jPlayer "pause"  if e.data("jPlayer").status.srcSet

  c.jPlayer.timeFormat =
    showHour: false
    showMin: true
    showSec: true
    padHour: false
    padMin: true
    padSec: true
    sepHour: ":"
    sepMin: ":"
    sepSec: ""

  c.jPlayer.convertTime = (l) ->
    m = new Date(l * 1000)
    f = m.getUTCHours()
    h = m.getUTCMinutes()
    j = m.getUTCSeconds()
    g = (if (c.jPlayer.timeFormat.padHour and f < 10) then "0" + f else f)
    n = (if (c.jPlayer.timeFormat.padMin and h < 10) then "0" + h else h)
    e = (if (c.jPlayer.timeFormat.padSec and j < 10) then "0" + j else j)
    (if (c.jPlayer.timeFormat.showHour) then g + c.jPlayer.timeFormat.sepHour else "") + (if (c.jPlayer.timeFormat.showMin) then n + c.jPlayer.timeFormat.sepMin else "") + (if (c.jPlayer.timeFormat.showSec) then e + c.jPlayer.timeFormat.sepSec else "")

  c.jPlayer.uaBrowser = (l) ->
    f = l.toLowerCase()
    h = /(webkit)[ \/]([\w.]+)/
    m = /(opera)(?:.*version)?[ \/]([\w.]+)/
    g = /(msie) ([\w.]+)/
    j = /(mozilla)(?:.*? rv:([\w.]+))?/
    e = h.exec(f) or m.exec(f) or g.exec(f) or f.indexOf("compatible") < 0 and j.exec(f) or []
    browser: e[1] or ""
    version: e[2] or "0"

  c.jPlayer.uaPlatform = (m) ->
    h = m.toLowerCase()
    n = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/
    l = /(ipad|playbook)/
    g = /(android)/
    j = /(mobile)/
    e = n.exec(h) or []
    f = l.exec(h) or not j.exec(h) and g.exec(h) or []
    e[1] = e[1].replace(/\s/g, "_")  if e[1]
    platform: e[1] or ""
    tablet: f[1] or ""

  c.jPlayer.browser = {}
  c.jPlayer.platform = {}
  b = c.jPlayer.uaBrowser(navigator.userAgent)
  if b.browser
    c.jPlayer.browser[b.browser] = true
    c.jPlayer.browser.version = b.version
  a = c.jPlayer.uaPlatform(navigator.userAgent)
  if a.platform
    c.jPlayer.platform[a.platform] = true
    c.jPlayer.platform.mobile = not a.tablet
    c.jPlayer.platform.tablet = !!a.tablet
  c.jPlayer:: =
    count: 0
    version:
      script: "2.1.0"
      needFlash: "2.1.0"
      flash: "unknown"

    options:
      swfPath: "js"
      solution: "html, flash"
      supplied: "mp3"
      preload: "metadata"
      volume: 0.8
      muted: false
      wmode: "opaque"
      backgroundColor: "#000000"
      cssSelectorAncestor: "#jp_container_1"
      cssSelector:
        videoPlay: ".jp-video-play"
        play: ".jp-play"
        pause: ".jp-pause"
        stop: ".jp-stop"
        seekBar: ".jp-seek-bar"
        playBar: ".jp-play-bar"
        mute: ".jp-mute"
        unmute: ".jp-unmute"
        volumeBar: ".jp-volume-bar"
        volumeBarValue: ".jp-volume-bar-value"
        volumeMax: ".jp-volume-max"
        currentTime: ".jp-current-time"
        duration: ".jp-duration"
        fullScreen: ".jp-full-screen"
        restoreScreen: ".jp-restore-screen"
        repeat: ".jp-repeat"
        repeatOff: ".jp-repeat-off"
        gui: ".jp-gui"
        noSolution: ".jp-no-solution"

      fullScreen: false
      autohide:
        restored: false
        full: true
        fadeIn: 200
        fadeOut: 600
        hold: 1000

      loop: false
      repeat: (e) ->
        if e.jPlayer.options.loop
          c(this).unbind(".jPlayerRepeat").bind c.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", ->
            c(this).jPlayer "play"
        else
          c(this).unbind ".jPlayerRepeat"

      nativeVideoControls: {}
      noFullScreen:
        msie: /msie [0-6]/
        ipad: /ipad.*?os [0-4]/
        iphone: /iphone/
        ipod: /ipod/
        android_pad: /android [0-3](?!.*?mobile)/
        android_phone: /android.*?mobile/
        blackberry: /blackberry/
        windows_ce: /windows ce/
        webos: /webos/

      noVolume:
        ipad: /ipad/
        iphone: /iphone/
        ipod: /ipod/
        android_pad: /android(?!.*?mobile)/
        android_phone: /android.*?mobile/
        blackberry: /blackberry/
        windows_ce: /windows ce/
        webos: /webos/
        playbook: /playbook/

      verticalVolume: false
      idPrefix: "jp"
      noConflict: "jQuery"
      emulateHtml: false
      errorAlerts: false
      warningAlerts: false

    optionsAudio:
      size:
        width: "0px"
        height: "0px"
        cssClass: ""

      sizeFull:
        width: "0px"
        height: "0px"
        cssClass: ""

    optionsVideo:
      size:
        width: "480px"
        height: "270px"
        cssClass: "jp-video-270p"

      sizeFull:
        width: "100%"
        height: "100%"
        cssClass: "jp-video-full"

    instances: {}
    status:
      src: ""
      media: {}
      paused: true
      format: {}
      formatType: ""
      waitForPlay: true
      waitForLoad: true
      srcSet: false
      video: false
      seekPercent: 0
      currentPercentRelative: 0
      currentPercentAbsolute: 0
      currentTime: 0
      duration: 0
      readyState: 0
      networkState: 0
      playbackRate: 1
      ended: 0

    internal:
      ready: false

    solution:
      html: true
      flash: true

    format:
      mp3:
        codec: "audio/mpeg; codecs=\"mp3\""
        flashCanPlay: true
        media: "audio"

      m4a:
        codec: "audio/mp4; codecs=\"mp4a.40.2\""
        flashCanPlay: true
        media: "audio"

      oga:
        codec: "audio/ogg; codecs=\"vorbis\""
        flashCanPlay: false
        media: "audio"

      wav:
        codec: "audio/wav; codecs=\"1\""
        flashCanPlay: false
        media: "audio"

      webma:
        codec: "audio/webm; codecs=\"vorbis\""
        flashCanPlay: false
        media: "audio"

      fla:
        codec: "audio/x-flv"
        flashCanPlay: true
        media: "audio"

      m4v:
        codec: "video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\""
        flashCanPlay: true
        media: "video"

      ogv:
        codec: "video/ogg; codecs=\"theora, vorbis\""
        flashCanPlay: false
        media: "video"

      webmv:
        codec: "video/webm; codecs=\"vorbis, vp8\""
        flashCanPlay: false
        media: "video"

      flv:
        codec: "video/x-flv"
        flashCanPlay: true
        media: "video"

    _init: ->
      f = this
      @element.empty()
      @status = c.extend({}, @status)
      @internal = c.extend({}, @internal)
      @internal.domNode = @element.get(0)
      @formats = []
      @solutions = []
      @require = {}
      @htmlElement = {}
      @html = {}
      @html.audio = {}
      @html.video = {}
      @flash = {}
      @css = {}
      @css.cs = {}
      @css.jq = {}
      @ancestorJq = []
      @options.volume = @_limitValue(@options.volume, 0, 1)
      c.each @options.supplied.toLowerCase().split(","), (q, n) ->
        o = n.replace(/^\s+|\s+$/g, "")
        if f.format[o]
          p = false
          c.each f.formats, (s, r) ->
            if o is r
              p = true
              false

          f.formats.push o  unless p

      c.each @options.solution.toLowerCase().split(","), (q, o) ->
        n = o.replace(/^\s+|\s+$/g, "")
        if f.solution[n]
          p = false
          c.each f.solutions, (s, r) ->
            if n is r
              p = true
              false

          f.solutions.push n  unless p

      @internal.instance = "jp_" + @count
      @instances[@internal.instance] = @element
      @element.attr "id", @options.idPrefix + "_jplayer_" + @count  unless @element.attr("id")
      @internal.self = c.extend({},
        id: @element.attr("id")
        jq: @element
      )
      @internal.audio = c.extend({},
        id: @options.idPrefix + "_audio_" + @count
        jq: d
      )
      @internal.video = c.extend({},
        id: @options.idPrefix + "_video_" + @count
        jq: d
      )
      @internal.flash = c.extend({},
        id: @options.idPrefix + "_flash_" + @count
        jq: d
        swf: @options.swfPath + (if @options.swfPath.toLowerCase().slice(-4) isnt ".swf" then (if @options.swfPath and @options.swfPath.slice(-1) isnt "/" then "/" else "") + "Jplayer.swf" else "")
      )
      @internal.poster = c.extend({},
        id: @options.idPrefix + "_poster_" + @count
        jq: d
      )
      c.each c.jPlayer.event, (n, o) ->
        if f.options[n] isnt d
          f.element.bind o + ".jPlayer", f.options[n]
          f.options[n] = d

      @require.audio = false
      @require.video = false
      c.each @formats, (n, o) ->
        f.require[f.format[o].media] = true

      if @require.video
        @options = c.extend(true, {}, @optionsVideo, @options)
      else
        @options = c.extend(true, {}, @optionsAudio, @options)
      @_setSize()
      @status.nativeVideoControls = @_uaBlocklist(@options.nativeVideoControls)
      @status.noFullScreen = @_uaBlocklist(@options.noFullScreen)
      @status.noVolume = @_uaBlocklist(@options.noVolume)
      @_restrictNativeVideoControls()
      @htmlElement.poster = document.createElement("img")
      @htmlElement.poster.id = @internal.poster.id
      @htmlElement.poster.onload = ->
        f.internal.poster.jq.show()  if not f.status.video or f.status.waitForPlay

      @element.append @htmlElement.poster
      @internal.poster.jq = c("#" + @internal.poster.id)
      @internal.poster.jq.css
        width: @status.width
        height: @status.height

      @internal.poster.jq.hide()
      @internal.poster.jq.bind "click.jPlayer", ->
        f._trigger c.jPlayer.event.click

      @html.audio.available = false
      if @require.audio
        @htmlElement.audio = document.createElement("audio")
        @htmlElement.audio.id = @internal.audio.id
        @html.audio.available = !!@htmlElement.audio.canPlayType and @_testCanPlayType(@htmlElement.audio)
      @html.video.available = false
      if @require.video
        @htmlElement.video = document.createElement("video")
        @htmlElement.video.id = @internal.video.id
        @html.video.available = !!@htmlElement.video.canPlayType and @_testCanPlayType(@htmlElement.video)
      @flash.available = @_checkForFlash(10)
      @html.canPlay = {}
      @flash.canPlay = {}
      c.each @formats, (n, o) ->
        f.html.canPlay[o] = f.html[f.format[o].media].available and "" isnt f.htmlElement[f.format[o].media].canPlayType(f.format[o].codec)
        f.flash.canPlay[o] = f.format[o].flashCanPlay and f.flash.available

      @html.desired = false
      @flash.desired = false
      c.each @solutions, (p, n) ->
        if p is 0
          f[n].desired = true
        else
          q = false
          o = false
          c.each f.formats, (r, s) ->
            if f[f.solutions[0]].canPlay[s]
              if f.format[s].media is "video"
                o = true
              else
                q = true

          f[n].desired = (f.require.audio and not q) or (f.require.video and not o)

      @html.support = {}
      @flash.support = {}
      c.each @formats, (n, o) ->
        f.html.support[o] = f.html.canPlay[o] and f.html.desired
        f.flash.support[o] = f.flash.canPlay[o] and f.flash.desired

      @html.used = false
      @flash.used = false
      c.each @solutions, (o, n) ->
        c.each f.formats, (p, q) ->
          if f[n].support[q]
            f[n].used = true
            false

      @_resetActive()
      @_resetGate()
      @_cssSelectorAncestor @options.cssSelectorAncestor
      unless @html.used or @flash.used
        @_error
          type: c.jPlayer.error.NO_SOLUTION
          context: "{solution:'" + @options.solution + "', supplied:'" + @options.supplied + "'}"
          message: c.jPlayer.errorMsg.NO_SOLUTION
          hint: c.jPlayer.errorHint.NO_SOLUTION

        @css.jq.noSolution.show()  if @css.jq.noSolution.length
      else
        @css.jq.noSolution.hide()  if @css.jq.noSolution.length
      if @flash.used
        j = undefined
        l = "jQuery=" + encodeURI(@options.noConflict) + "&id=" + encodeURI(@internal.self.id) + "&vol=" + @options.volume + "&muted=" + @options.muted
        if c.browser.msie and Number(c.browser.version) <= 8
          e = "<object id=\"" + @internal.flash.id + "\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" width=\"0\" height=\"0\"></object>"
          h = [ "<param name=\"movie\" value=\"" + @internal.flash.swf + "\" />", "<param name=\"FlashVars\" value=\"" + l + "\" />", "<param name=\"allowScriptAccess\" value=\"always\" />", "<param name=\"bgcolor\" value=\"" + @options.backgroundColor + "\" />", "<param name=\"wmode\" value=\"" + @options.wmode + "\" />" ]
          j = document.createElement(e)
          g = 0

          while g < h.length
            j.appendChild document.createElement(h[g])
            g++
        else
          m = (q, s, o) ->
            r = document.createElement("param")
            r.setAttribute "name", s
            r.setAttribute "value", o
            q.appendChild r

          j = document.createElement("object")
          j.setAttribute "id", @internal.flash.id
          j.setAttribute "data", @internal.flash.swf
          j.setAttribute "type", "application/x-shockwave-flash"
          j.setAttribute "width", "1"
          j.setAttribute "height", "1"
          m j, "flashvars", l
          m j, "allowscriptaccess", "always"
          m j, "bgcolor", @options.backgroundColor
          m j, "wmode", @options.wmode
        @element.append j
        @internal.flash.jq = c(j)
      if @html.used
        if @html.audio.available
          @_addHtmlEventListeners @htmlElement.audio, @html.audio
          @element.append @htmlElement.audio
          @internal.audio.jq = c("#" + @internal.audio.id)
        if @html.video.available
          @_addHtmlEventListeners @htmlElement.video, @html.video
          @element.append @htmlElement.video
          @internal.video.jq = c("#" + @internal.video.id)
          if @status.nativeVideoControls
            @internal.video.jq.css
              width: @status.width
              height: @status.height
          else
            @internal.video.jq.css
              width: "0px"
              height: "0px"
          @internal.video.jq.bind "click.jPlayer", ->
            f._trigger c.jPlayer.event.click
      @_emulateHtmlBridge()  if @options.emulateHtml
      if @html.used and not @flash.used
        setTimeout (->
          f.internal.ready = true
          f.version.flash = "n/a"
          f._trigger c.jPlayer.event.repeat
          f._trigger c.jPlayer.event.ready
        ), 100
      @_updateNativeVideoControls()
      @_updateInterface()
      @_updateButtons false
      @_updateAutohide()
      @_updateVolume @options.volume
      @_updateMute @options.muted
      @css.jq.videoPlay.hide()  if @css.jq.videoPlay.length
      c.jPlayer::count++

    destroy: ->
      @clearMedia()
      @_removeUiClass()
      @css.jq.currentTime.text ""  if @css.jq.currentTime.length
      @css.jq.duration.text ""  if @css.jq.duration.length
      c.each @css.jq, (e, f) ->
        f.unbind ".jPlayer"  if f.length

      @internal.poster.jq.unbind ".jPlayer"
      @internal.video.jq.unbind ".jPlayer"  if @internal.video.jq
      @_destroyHtmlBridge()  if @options.emulateHtml
      @element.removeData "jPlayer"
      @element.unbind ".jPlayer"
      @element.empty()
      delete @instances[@internal.instance]

    enable: ->

    disable: ->

    _testCanPlayType: (f) ->
      try
        f.canPlayType @format.mp3.codec
        return true
      catch e
        return false

    _uaBlocklist: (f) ->
      e = navigator.userAgent.toLowerCase()
      g = false
      c.each f, (j, h) ->
        if h and h.test(e)
          g = true
          false

      g

    _restrictNativeVideoControls: ->
      if @require.audio
        if @status.nativeVideoControls
          @status.nativeVideoControls = false
          @status.noFullScreen = true

    _updateNativeVideoControls: ->
      if @html.video.available and @html.used
        @htmlElement.video.controls = @status.nativeVideoControls
        @_updateAutohide()
        if @status.nativeVideoControls and @require.video
          @internal.poster.jq.hide()
          @internal.video.jq.css
            width: @status.width
            height: @status.height
        else
          if @status.waitForPlay and @status.video
            @internal.poster.jq.show()
            @internal.video.jq.css
              width: "0px"
              height: "0px"

    _addHtmlEventListeners: (e, g) ->
      f = this
      e.preload = @options.preload
      e.muted = @options.muted
      e.volume = @options.volume
      e.addEventListener "progress", (->
        if g.gate
          f._getHtmlStatus e
          f._updateInterface()
          f._trigger c.jPlayer.event.progress
      ), false
      e.addEventListener "timeupdate", (->
        if g.gate
          f._getHtmlStatus e
          f._updateInterface()
          f._trigger c.jPlayer.event.timeupdate
      ), false
      e.addEventListener "durationchange", (->
        if g.gate
          f.status.duration = @duration
          f._getHtmlStatus e
          f._updateInterface()
          f._trigger c.jPlayer.event.durationchange
      ), false
      e.addEventListener "play", (->
        if g.gate
          f._updateButtons true
          f._html_checkWaitForPlay()
          f._trigger c.jPlayer.event.play
      ), false
      e.addEventListener "playing", (->
        if g.gate
          f._updateButtons true
          f._seeked()
          f._trigger c.jPlayer.event.playing
      ), false
      e.addEventListener "pause", (->
        if g.gate
          f._updateButtons false
          f._trigger c.jPlayer.event.pause
      ), false
      e.addEventListener "waiting", (->
        if g.gate
          f._seeking()
          f._trigger c.jPlayer.event.waiting
      ), false
      e.addEventListener "seeking", (->
        if g.gate
          f._seeking()
          f._trigger c.jPlayer.event.seeking
      ), false
      e.addEventListener "seeked", (->
        if g.gate
          f._seeked()
          f._trigger c.jPlayer.event.seeked
      ), false
      e.addEventListener "volumechange", (->
        if g.gate
          f.options.volume = e.volume
          f.options.muted = e.muted
          f._updateMute()
          f._updateVolume()
          f._trigger c.jPlayer.event.volumechange
      ), false
      e.addEventListener "suspend", (->
        if g.gate
          f._seeked()
          f._trigger c.jPlayer.event.suspend
      ), false
      e.addEventListener "ended", (->
        if g.gate
          f.htmlElement.media.currentTime = 0  unless c.jPlayer.browser.webkit
          f.htmlElement.media.pause()
          f._updateButtons false
          f._getHtmlStatus e, true
          f._updateInterface()
          f._trigger c.jPlayer.event.ended
      ), false
      e.addEventListener "error", (->
        if g.gate
          f._updateButtons false
          f._seeked()
          if f.status.srcSet
            clearTimeout f.internal.htmlDlyCmdId
            f.status.waitForLoad = true
            f.status.waitForPlay = true
            if f.status.video and not f.status.nativeVideoControls
              f.internal.video.jq.css
                width: "0px"
                height: "0px"
            f.internal.poster.jq.show()  if f._validString(f.status.media.poster) and not f.status.nativeVideoControls
            f.css.jq.videoPlay.show()  if f.css.jq.videoPlay.length
            f._error
              type: c.jPlayer.error.URL
              context: f.status.src
              message: c.jPlayer.errorMsg.URL
              hint: c.jPlayer.errorHint.URL
      ), false
      c.each c.jPlayer.htmlEvent, (j, h) ->
        e.addEventListener this, (->
          f._trigger c.jPlayer.event[h]  if g.gate
        ), false

    _getHtmlStatus: (j, f) ->
      e = 0
      l = 0
      g = 0
      h = 0
      m = 0
      @status.duration = j.duration  if j.duration
      e = j.currentTime
      g = (if (@status.duration > 0) then 100 * e / @status.duration else 0)
      if (typeof j.seekable is "object") and (j.seekable.length > 0)
        h = (if (@status.duration > 0) then 100 * j.seekable.end(j.seekable.length - 1) / @status.duration else 100)
        m = 100 * j.currentTime / j.seekable.end(j.seekable.length - 1)
      else
        h = 100
        m = g
      if f
        e = 0
        m = 0
        g = 0
      @status.seekPercent = h
      @status.currentPercentRelative = m
      @status.currentPercentAbsolute = g
      @status.currentTime = e
      @status.readyState = j.readyState
      @status.networkState = j.networkState
      @status.playbackRate = j.playbackRate
      @status.ended = j.ended

    _resetStatus: ->
      @status = c.extend({}, @status, c.jPlayer::status)

    _trigger: (f, e, g) ->
      h = c.Event(f)
      h.jPlayer = {}
      h.jPlayer.version = c.extend({}, @version)
      h.jPlayer.options = c.extend(true, {}, @options)
      h.jPlayer.status = c.extend(true, {}, @status)
      h.jPlayer.html = c.extend(true, {}, @html)
      h.jPlayer.flash = c.extend(true, {}, @flash)
      h.jPlayer.error = c.extend({}, e)  if e
      h.jPlayer.warning = c.extend({}, g)  if g
      @element.trigger h

    jPlayerFlashEvent: (g, e) ->
      if g is c.jPlayer.event.ready
        unless @internal.ready
          @internal.ready = true
          @internal.flash.jq.css
            width: "0px"
            height: "0px"

          @version.flash = e.version
          if @version.needFlash isnt @version.flash
            @_error
              type: c.jPlayer.error.VERSION
              context: @version.flash
              message: c.jPlayer.errorMsg.VERSION + @version.flash
              hint: c.jPlayer.errorHint.VERSION
          @_trigger c.jPlayer.event.repeat
          @_trigger g
        else
          if @flash.gate
            if @status.srcSet
              h = @status.currentTime
              f = @status.paused
              @setMedia @status.media
              if h > 0
                if f
                  @pause h
                else
                  @play h
            @_trigger c.jPlayer.event.flashreset
      if @flash.gate
        switch g
          when c.jPlayer.event.progress
            @_getFlashStatus e
            @_updateInterface()
            @_trigger g
          when c.jPlayer.event.timeupdate
            @_getFlashStatus e
            @_updateInterface()
            @_trigger g
          when c.jPlayer.event.play
            @_seeked()
            @_updateButtons true
            @_trigger g
          when c.jPlayer.event.pause
            @_updateButtons false
            @_trigger g
          when c.jPlayer.event.ended
            @_updateButtons false
            @_trigger g
          when c.jPlayer.event.click
            @_trigger g
          when c.jPlayer.event.error
            @status.waitForLoad = true
            @status.waitForPlay = true
            if @status.video
              @internal.flash.jq.css
                width: "0px"
                height: "0px"
            @internal.poster.jq.show()  if @_validString(@status.media.poster)
            @css.jq.videoPlay.show()  if @css.jq.videoPlay.length and @status.video
            if @status.video
              @_flash_setVideo @status.media
            else
              @_flash_setAudio @status.media
            @_updateButtons false
            @_error
              type: c.jPlayer.error.URL
              context: e.src
              message: c.jPlayer.errorMsg.URL
              hint: c.jPlayer.errorHint.URL
          when c.jPlayer.event.seeking
            @_seeking()
            @_trigger g
          when c.jPlayer.event.seeked
            @_seeked()
            @_trigger g
          when c.jPlayer.event.ready
          else
            @_trigger g
      false

    _getFlashStatus: (e) ->
      e.duration = sz.app.data.TrackHistory.last().toJSON().duration
      e.currentPercentRelative = (100 * e.currentTime) / e.duration
      @status.seekPercent = e.seekPercent
      @status.currentPercentRelative = e.currentPercentRelative
      @status.currentPercentAbsolute = e.currentPercentAbsolute
      @status.currentTime = e.currentTime
      @status.duration = e.duration
      @status.readyState = 4
      @status.networkState = 0
      @status.playbackRate = 1
      @status.ended = false

    _updateButtons: (e) ->
      if e isnt d
        @status.paused = not e
        if @css.jq.play.length and @css.jq.pause.length
          if e
            @css.jq.play.hide()
            @css.jq.pause.show()
          else
            @css.jq.play.show()
            @css.jq.pause.hide()
      if @css.jq.restoreScreen.length and @css.jq.fullScreen.length
        if @status.noFullScreen
          @css.jq.fullScreen.hide()
          @css.jq.restoreScreen.hide()
        else
          if @options.fullScreen
            @css.jq.fullScreen.hide()
            @css.jq.restoreScreen.show()
          else
            @css.jq.fullScreen.show()
            @css.jq.restoreScreen.hide()
      if @css.jq.repeat.length and @css.jq.repeatOff.length
        if @options.loop
          @css.jq.repeat.hide()
          @css.jq.repeatOff.show()
        else
          @css.jq.repeat.show()
          @css.jq.repeatOff.hide()

    _updateInterface: ->
      @css.jq.seekBar.width @status.seekPercent + "%"  if @css.jq.seekBar.length
      @css.jq.playBar.width @status.currentPercentRelative + "%"  if @css.jq.playBar.length
      @css.jq.currentTime.text c.jPlayer.convertTime(@status.currentTime)  if @css.jq.currentTime.length
      @css.jq.duration.text c.jPlayer.convertTime(@status.duration)  if @css.jq.duration.length

    _seeking: ->
      @css.jq.seekBar.addClass "jp-seeking-bg"  if @css.jq.seekBar.length

    _seeked: ->
      @css.jq.seekBar.removeClass "jp-seeking-bg"  if @css.jq.seekBar.length

    _resetGate: ->
      @html.audio.gate = false
      @html.video.gate = false
      @flash.gate = false

    _resetActive: ->
      @html.active = false
      @flash.active = false

    setMedia: (g) ->
      f = this
      e = false
      h = @status.media.poster isnt g.poster
      @_resetMedia()
      @_resetGate()
      @_resetActive()
      c.each @formats, (j, m) ->
        l = f.format[m].media is "video"
        c.each f.solutions, (o, n) ->
          if f[n].support[m] and f._validString(g[m])
            p = n is "html"
            if l
              if p
                f.html.video.gate = true
                f._html_setVideo g
                f.html.active = true
              else
                f.flash.gate = true
                f._flash_setVideo g
                f.flash.active = true
              f.css.jq.videoPlay.show()  if f.css.jq.videoPlay.length
              f.status.video = true
            else
              if p
                f.html.audio.gate = true
                f._html_setAudio g
                f.html.active = true
              else
                f.flash.gate = true
                f._flash_setAudio g
                f.flash.active = true
              f.css.jq.videoPlay.hide()  if f.css.jq.videoPlay.length
              f.status.video = false
            e = true
            false

        false  if e

      if e
        unless @status.nativeVideoControls and @html.video.gate
          if @_validString(g.poster)
            if h
              @htmlElement.poster.src = g.poster
            else
              @internal.poster.jq.show()
        @status.srcSet = true
        @status.media = c.extend({}, g)
        @_updateButtons false
        @_updateInterface()
      else
        @_error
          type: c.jPlayer.error.NO_SUPPORT
          context: "{supplied:'" + @options.supplied + "'}"
          message: c.jPlayer.errorMsg.NO_SUPPORT
          hint: c.jPlayer.errorHint.NO_SUPPORT

    _resetMedia: ->
      @_resetStatus()
      @_updateButtons false
      @_updateInterface()
      @_seeked()
      @internal.poster.jq.hide()
      clearTimeout @internal.htmlDlyCmdId
      if @html.active
        @_html_resetMedia()
      else
        @_flash_resetMedia()  if @flash.active

    clearMedia: ->
      @_resetMedia()
      if @html.active
        @_html_clearMedia()
      else
        @_flash_clearMedia()  if @flash.active
      @_resetGate()
      @_resetActive()

    load: ->
      if @status.srcSet
        if @html.active
          @_html_load()
        else
          @_flash_load()  if @flash.active
      else
        @_urlNotSetError "load"

    play: (e) ->
      e = (if (typeof e is "number") then e else NaN)
      if @status.srcSet
        if @html.active
          @_html_play e
        else
          @_flash_play e  if @flash.active
      else
        @_urlNotSetError "play"

    videoPlay: (f) ->
      @play()

    pause: (e) ->
      e = (if (typeof e is "number") then e else NaN)
      if @status.srcSet
        if @html.active
          @_html_pause e
        else
          @_flash_pause e  if @flash.active
      else
        @_urlNotSetError "pause"

    pauseOthers: ->
      e = this
      c.each @instances, (g, f) ->
        f.jPlayer "pause"  if f.data("jPlayer").status.srcSet  if e.element isnt f

    stop: ->
      if @status.srcSet
        if @html.active
          @_html_pause 0
        else
          @_flash_pause 0  if @flash.active
      else
        @_urlNotSetError "stop"

    playHead: (e) ->
      e = @_limitValue(e, 0, 100)
      if @status.srcSet
        if @html.active
          @_html_playHead e
        else
          @_flash_playHead e  if @flash.active
      else
        @_urlNotSetError "playHead"

    _muted: (e) ->
      @options.muted = e
      @_html_mute e  if @html.used
      @_flash_mute e  if @flash.used
      if not @html.video.gate and not @html.audio.gate
        @_updateMute e
        @_updateVolume @options.volume
        @_trigger c.jPlayer.event.volumechange

    mute: (e) ->
      e = (if e is d then true else !!e)
      @_muted e

    unmute: (e) ->
      e = (if e is d then true else !!e)
      @_muted not e

    _updateMute: (e) ->
      e = @options.muted  if e is d
      if @css.jq.mute.length and @css.jq.unmute.length
        if @status.noVolume
          @css.jq.mute.hide()
          @css.jq.unmute.hide()
        else
          if e
            @css.jq.mute.hide()
            @css.jq.unmute.show()
          else
            @css.jq.mute.show()
            @css.jq.unmute.hide()

    volume: (e) ->
      e = @_limitValue(e, 0, 1)
      @options.volume = e
      @_html_volume e  if @html.used
      @_flash_volume e  if @flash.used
      if not @html.video.gate and not @html.audio.gate
        @_updateVolume e
        @_trigger c.jPlayer.event.volumechange

    volumeBar: (l) ->
      if @css.jq.volumeBar.length
        m = @css.jq.volumeBar.offset()
        f = l.pageX - m.left
        g = @css.jq.volumeBar.width()
        n = @css.jq.volumeBar.height() - l.pageY + m.top
        j = @css.jq.volumeBar.height()
        if @options.verticalVolume
          @volume n / j
        else
          @volume f / g
      @_muted false  if @options.muted

    volumeBarValue: (f) ->
      @volumeBar f

    _updateVolume: (e) ->
      e = @options.volume  if e is d
      e = (if @options.muted then 0 else e)
      if @status.noVolume
        @css.jq.volumeBar.hide()  if @css.jq.volumeBar.length
        @css.jq.volumeBarValue.hide()  if @css.jq.volumeBarValue.length
        @css.jq.volumeMax.hide()  if @css.jq.volumeMax.length
      else
        @css.jq.volumeBar.show()  if @css.jq.volumeBar.length
        if @css.jq.volumeBarValue.length
          @css.jq.volumeBarValue.show()
          @css.jq.volumeBarValue[(if @options.verticalVolume then "height" else "width")] (e * 100) + "%"
        @css.jq.volumeMax.show()  if @css.jq.volumeMax.length

    volumeMax: ->
      @volume 1
      @_muted false  if @options.muted

    _cssSelectorAncestor: (f) ->
      e = this
      @options.cssSelectorAncestor = f
      @_removeUiClass()
      @ancestorJq = (if f then c(f) else [])
      if f and @ancestorJq.length isnt 1
        @_warning
          type: c.jPlayer.warning.CSS_SELECTOR_COUNT
          context: f
          message: c.jPlayer.warningMsg.CSS_SELECTOR_COUNT + @ancestorJq.length + " found for cssSelectorAncestor."
          hint: c.jPlayer.warningHint.CSS_SELECTOR_COUNT
      @_addUiClass()
      c.each @options.cssSelector, (g, h) ->
        e._cssSelector g, h

    _cssSelector: (g, h) ->
      e = this
      if typeof h is "string"
        if c.jPlayer::options.cssSelector[g]
          @css.jq[g].unbind ".jPlayer"  if @css.jq[g] and @css.jq[g].length
          @options.cssSelector[g] = h
          @css.cs[g] = @options.cssSelectorAncestor + " " + h
          if h
            @css.jq[g] = c(@css.cs[g])
          else
            @css.jq[g] = []
          if @css.jq[g].length
            f = (j) ->
              e[g] j
              c(this).blur()
              false

            @css.jq[g].bind "click.jPlayer", f
          if h and @css.jq[g].length isnt 1
            @_warning
              type: c.jPlayer.warning.CSS_SELECTOR_COUNT
              context: @css.cs[g]
              message: c.jPlayer.warningMsg.CSS_SELECTOR_COUNT + @css.jq[g].length + " found for " + g + " method."
              hint: c.jPlayer.warningHint.CSS_SELECTOR_COUNT
        else
          @_warning
            type: c.jPlayer.warning.CSS_SELECTOR_METHOD
            context: g
            message: c.jPlayer.warningMsg.CSS_SELECTOR_METHOD
            hint: c.jPlayer.warningHint.CSS_SELECTOR_METHOD
      else
        @_warning
          type: c.jPlayer.warning.CSS_SELECTOR_STRING
          context: h
          message: c.jPlayer.warningMsg.CSS_SELECTOR_STRING
          hint: c.jPlayer.warningHint.CSS_SELECTOR_STRING

    seekBar: (j) ->
      if @css.jq.seekBar
        l = @css.jq.seekBar.offset()
        f = j.pageX - l.left
        g = @css.jq.seekBar.width()
        h = 100 * f / g
        @playHead h

    playBar: (f) ->
      @seekBar f

    repeat: ->
      @_loop true

    repeatOff: ->
      @_loop false

    _loop: (e) ->
      if @options.loop isnt e
        @options.loop = e
        @_updateButtons()
        @_trigger c.jPlayer.event.repeat

    currentTime: (f) ->

    duration: (f) ->

    gui: (f) ->

    noSolution: (f) ->

    option: (l, o) ->
      f = l
      return c.extend(true, {}, @options)  if arguments.length is 0
      if typeof l is "string"
        n = l.split(".")
        if o is d
          h = c.extend(true, {}, @options)
          g = 0

          while g < n.length
            if h[n[g]] isnt d
              h = h[n[g]]
            else
              @_warning
                type: c.jPlayer.warning.OPTION_KEY
                context: l
                message: c.jPlayer.warningMsg.OPTION_KEY
                hint: c.jPlayer.warningHint.OPTION_KEY

              return d
            g++
          return h
        f = {}
        m = f
        e = 0

        while e < n.length
          if e < n.length - 1
            m[n[e]] = {}
            m = m[n[e]]
          else
            m[n[e]] = o
          e++
      @_setOptions f
      this

    _setOptions: (f) ->
      e = this
      c.each f, (g, h) ->
        e._setOption g, h

      this

    _setOption: (f, g) ->
      e = this
      switch f
        when "volume"
          @volume g
        when "muted"
          @_muted g
        when "cssSelectorAncestor"
          @_cssSelectorAncestor g
        when "cssSelector"
          c.each g, (h, j) ->
            e._cssSelector h, j
        when "fullScreen"
          if @options[f] isnt g
            @_removeUiClass()
            @options[f] = g
            @_refreshSize()
        when "size"
          @_removeUiClass()  if not @options.fullScreen and @options[f].cssClass isnt g.cssClass
          @options[f] = c.extend({}, @options[f], g)
          @_refreshSize()
        when "sizeFull"
          @_removeUiClass()  if @options.fullScreen and @options[f].cssClass isnt g.cssClass
          @options[f] = c.extend({}, @options[f], g)
          @_refreshSize()
        when "autohide"
          @options[f] = c.extend({}, @options[f], g)
          @_updateAutohide()
        when "loop"
          @_loop g
        when "nativeVideoControls"
          @options[f] = c.extend({}, @options[f], g)
          @status.nativeVideoControls = @_uaBlocklist(@options.nativeVideoControls)
          @_restrictNativeVideoControls()
          @_updateNativeVideoControls()
        when "noFullScreen"
          @options[f] = c.extend({}, @options[f], g)
          @status.nativeVideoControls = @_uaBlocklist(@options.nativeVideoControls)
          @status.noFullScreen = @_uaBlocklist(@options.noFullScreen)
          @_restrictNativeVideoControls()
          @_updateButtons()
        when "noVolume"
          @options[f] = c.extend({}, @options[f], g)
          @status.noVolume = @_uaBlocklist(@options.noVolume)
          @_updateVolume()
          @_updateMute()
        when "emulateHtml"
          if @options[f] isnt g
            @options[f] = g
            if g
              @_emulateHtmlBridge()
            else
              @_destroyHtmlBridge()
      this

    _refreshSize: ->
      @_setSize()
      @_addUiClass()
      @_updateSize()
      @_updateButtons()
      @_updateAutohide()
      @_trigger c.jPlayer.event.resize

    _setSize: ->
      if @options.fullScreen
        @status.width = @options.sizeFull.width
        @status.height = @options.sizeFull.height
        @status.cssClass = @options.sizeFull.cssClass
      else
        @status.width = @options.size.width
        @status.height = @options.size.height
        @status.cssClass = @options.size.cssClass
      @element.css
        width: @status.width
        height: @status.height

    _addUiClass: ->
      @ancestorJq.addClass @status.cssClass  if @ancestorJq.length

    _removeUiClass: ->
      @ancestorJq.removeClass @status.cssClass  if @ancestorJq.length

    _updateSize: ->
      @internal.poster.jq.css
        width: @status.width
        height: @status.height

      if not @status.waitForPlay and @html.active and @status.video or @html.video.available and @html.used and @status.nativeVideoControls
        @internal.video.jq.css
          width: @status.width
          height: @status.height
      else
        if not @status.waitForPlay and @flash.active and @status.video
          @internal.flash.jq.css
            width: @status.width
            height: @status.height

    _updateAutohide: ->
      e = this
      j = "mousemove.jPlayer"
      h = ".jPlayerAutohide"
      f = j + h
      g = ->
        e.css.jq.gui.fadeIn e.options.autohide.fadeIn, ->
          clearTimeout e.internal.autohideId
          e.internal.autohideId = setTimeout(->
            e.css.jq.gui.fadeOut e.options.autohide.fadeOut
          , e.options.autohide.hold)

      if @css.jq.gui.length
        @css.jq.gui.stop true, true
        clearTimeout @internal.autohideId
        @element.unbind h
        @css.jq.gui.unbind h
        unless @status.nativeVideoControls
          if @options.fullScreen and @options.autohide.full or not @options.fullScreen and @options.autohide.restored
            @element.bind f, g
            @css.jq.gui.bind f, g
            @css.jq.gui.hide()
          else
            @css.jq.gui.show()
        else
          @css.jq.gui.hide()

    fullScreen: ->
      @_setOption "fullScreen", true

    restoreScreen: ->
      @_setOption "fullScreen", false

    _html_initMedia: ->
      @htmlElement.media.src = @status.src
      @_html_load()  if @options.preload isnt "none"
      @_trigger c.jPlayer.event.timeupdate

    _html_setAudio: (f) ->
      e = this
      c.each @formats, (g, h) ->
        if e.html.support[h] and f[h]
          e.status.src = f[h]
          e.status.format[h] = true
          e.status.formatType = h
          false

      @htmlElement.media = @htmlElement.audio
      @_html_initMedia()

    _html_setVideo: (f) ->
      e = this
      c.each @formats, (g, h) ->
        if e.html.support[h] and f[h]
          e.status.src = f[h]
          e.status.format[h] = true
          e.status.formatType = h
          false

      @htmlElement.video.poster = (if @_validString(f.poster) then f.poster else "")  if @status.nativeVideoControls
      @htmlElement.media = @htmlElement.video
      @_html_initMedia()

    _html_resetMedia: ->
      if @htmlElement.media
        if @htmlElement.media.id is @internal.video.id and not @status.nativeVideoControls
          @internal.video.jq.css
            width: "0px"
            height: "0px"
        @htmlElement.media.pause()

    _html_clearMedia: ->
      if @htmlElement.media
        @htmlElement.media.src = ""
        @htmlElement.media.load()

    _html_load: ->
      if @status.waitForLoad
        @status.waitForLoad = false
        @htmlElement.media.load()
      clearTimeout @internal.htmlDlyCmdId

    _html_play: (g) ->
      e = this
      @_html_load()
      @htmlElement.media.play()
      unless isNaN(g)
        try
          @htmlElement.media.currentTime = g
        catch f
          @internal.htmlDlyCmdId = setTimeout(->
            e.play g
          , 100)
          return
      @_html_checkWaitForPlay()

    _html_pause: (g) ->
      e = this
      if g > 0
        @_html_load()
      else
        clearTimeout @internal.htmlDlyCmdId
      @htmlElement.media.pause()
      unless isNaN(g)
        try
          @htmlElement.media.currentTime = g
        catch f
          @internal.htmlDlyCmdId = setTimeout(->
            e.pause g
          , 100)
          return
      @_html_checkWaitForPlay()  if g > 0

    _html_playHead: (g) ->
      e = this
      @_html_load()
      try
        if (typeof @htmlElement.media.seekable is "object") and (@htmlElement.media.seekable.length > 0)
          @htmlElement.media.currentTime = g * @htmlElement.media.seekable.end(@htmlElement.media.seekable.length - 1) / 100
        else
          if @htmlElement.media.duration > 0 and not isNaN(@htmlElement.media.duration)
            @htmlElement.media.currentTime = g * @htmlElement.media.duration / 100
          else
            throw "e"
      catch f
        @internal.htmlDlyCmdId = setTimeout(->
          e.playHead g
        , 100)
        return
      @_html_checkWaitForPlay()  unless @status.waitForLoad

    _html_checkWaitForPlay: ->
      if @status.waitForPlay
        @status.waitForPlay = false
        @css.jq.videoPlay.hide()  if @css.jq.videoPlay.length
        if @status.video
          @internal.poster.jq.hide()
          @internal.video.jq.css
            width: @status.width
            height: @status.height

    _html_volume: (e) ->
      @htmlElement.audio.volume = e  if @html.audio.available
      @htmlElement.video.volume = e  if @html.video.available

    _html_mute: (e) ->
      @htmlElement.audio.muted = e  if @html.audio.available
      @htmlElement.video.muted = e  if @html.video.available

    _flash_setAudio: (g) ->
      e = this
      try
        c.each @formats, (h, j) ->
          if e.flash.support[j] and g[j]
            switch j
              when "m4a", "fla"
                e._getMovie().fl_setAudio_m4a g[j]
              when "mp3"
                e._getMovie().fl_setAudio_mp3 g[j]
            e.status.src = g[j]
            e.status.format[j] = true
            e.status.formatType = j
            false

        if @options.preload is "auto"
          @_flash_load()
          @status.waitForLoad = false
      catch f
        @_flashError f

    _flash_setVideo: (g) ->
      e = this
      try
        c.each @formats, (h, j) ->
          if e.flash.support[j] and g[j]
            switch j
              when "m4v", "flv"
                e._getMovie().fl_setVideo_m4v g[j]
            e.status.src = g[j]
            e.status.format[j] = true
            e.status.formatType = j
            false

        if @options.preload is "auto"
          @_flash_load()
          @status.waitForLoad = false
      catch f
        @_flashError f

    _flash_resetMedia: ->
      @internal.flash.jq.css
        width: "0px"
        height: "0px"

      @_flash_pause NaN

    _flash_clearMedia: ->
      try
        @_getMovie().fl_clearMedia()
      catch e
        @_flashError e

    _flash_load: ->
      try
        @_getMovie().fl_load()
      catch e
        @_flashError e
      @status.waitForLoad = false

    _flash_play: (f) ->
      try
        @_getMovie().fl_play f
      catch e
        @_flashError e
      @status.waitForLoad = false
      @_flash_checkWaitForPlay()

    _flash_pause: (f) ->
      try
        @_getMovie().fl_pause f
      catch e
        @_flashError e
      if f > 0
        @status.waitForLoad = false
        @_flash_checkWaitForPlay()

    _flash_playHead: (f) ->
      try
        @_getMovie().fl_play_head f
      catch e
        @_flashError e
      @_flash_checkWaitForPlay()  unless @status.waitForLoad

    _flash_checkWaitForPlay: ->
      if @status.waitForPlay
        @status.waitForPlay = false
        @css.jq.videoPlay.hide()  if @css.jq.videoPlay.length
        if @status.video
          @internal.poster.jq.hide()
          @internal.flash.jq.css
            width: @status.width
            height: @status.height

    _flash_volume: (e) ->
      try
        @_getMovie().fl_volume e
      catch f
        @_flashError f

    _flash_mute: (e) ->
      try
        @_getMovie().fl_mute e
      catch f
        @_flashError f

    _getMovie: ->
      document[@internal.flash.id]

    _checkForFlash: (g) ->
      f = false
      j = undefined
      if window.ActiveXObject
        try
          j = new ActiveXObject(("ShockwaveFlash.ShockwaveFlash." + g))
          f = true
      else
        if navigator.plugins and navigator.mimeTypes.length > 0
          j = navigator.plugins["Shockwave Flash"]
          if j
            h = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1")
            f = true  if h >= g
      f

    _validString: (e) ->
      e and typeof e is "string"

    _limitValue: (g, f, e) ->
      (if (g < f) then f else (if (g > e) then e else g))

    _urlNotSetError: (e) ->
      @_error
        type: c.jPlayer.error.URL_NOT_SET
        context: e
        message: c.jPlayer.errorMsg.URL_NOT_SET
        hint: c.jPlayer.errorHint.URL_NOT_SET

    _flashError: (e) ->
      f = undefined
      unless @internal.ready
        f = "FLASH"
      else
        f = "FLASH_DISABLED"
      @_error
        type: c.jPlayer.error[f]
        context: @internal.flash.swf
        message: c.jPlayer.errorMsg[f] + e.message
        hint: c.jPlayer.errorHint[f]

      @internal.flash.jq.css
        width: "1px"
        height: "1px"

    _error: (e) ->
      @_trigger c.jPlayer.event.error, e
      @_alert "Error!" + (if e.message then "\n\n" + e.message else "") + (if e.hint then "\n\n" + e.hint else "") + "\n\nContext: " + e.context  if @options.errorAlerts

    _warning: (e) ->
      @_trigger c.jPlayer.event.warning, d, e
      @_alert "Warning!" + (if e.message then "\n\n" + e.message else "") + (if e.hint then "\n\n" + e.hint else "") + "\n\nContext: " + e.context  if @options.warningAlerts

    _alert: (e) ->
      alert "jPlayer " + @version.script + " : id='" + @internal.self.id + "' : " + e

    _emulateHtmlBridge: ->
      f = this
      e = c.jPlayer.emulateMethods
      c.each c.jPlayer.emulateMethods.split(/\s+/g), (h, g) ->
        f.internal.domNode[g] = (j) ->
          f[g] j

      c.each c.jPlayer.event, (h, j) ->
        g = true
        c.each c.jPlayer.reservedEvent.split(/\s+/g), (m, l) ->
          if l is h
            g = false
            false

        if g
          f.element.bind j + ".jPlayer.jPlayerHtml", ->
            f._emulateHtmlUpdate()
            l = document.createEvent("Event")
            l.initEvent h, false, true
            f.internal.domNode.dispatchEvent l

    _emulateHtmlUpdate: ->
      e = this
      c.each c.jPlayer.emulateStatus.split(/\s+/g), (g, f) ->
        e.internal.domNode[f] = e.status[f]

      c.each c.jPlayer.emulateOptions.split(/\s+/g), (g, f) ->
        e.internal.domNode[f] = e.options[f]

    _destroyHtmlBridge: ->
      e = this
      @element.unbind ".jPlayerHtml"
      f = c.jPlayer.emulateMethods + " " + c.jPlayer.emulateStatus + " " + c.jPlayer.emulateOptions
      c.each f.split(/\s+/g), (h, g) ->
        delete e.internal.domNode[g]

  c.jPlayer.error =
    FLASH: "e_flash"
    FLASH_DISABLED: "e_flash_disabled"
    NO_SOLUTION: "e_no_solution"
    NO_SUPPORT: "e_no_support"
    URL: "e_url"
    URL_NOT_SET: "e_url_not_set"
    VERSION: "e_version"

  c.jPlayer.errorMsg =
    FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: "
    FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: "
    NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used."
    NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options."
    URL: "Media URL could not be loaded."
    URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set."
    VERSION: "jPlayer " + c.jPlayer::version.script + " needs Jplayer.swf version " + c.jPlayer::version.needFlash + " but found "

  c.jPlayer.errorHint =
    FLASH: "Check your swfPath option and that Jplayer.swf is there."
    FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor."
    NO_SOLUTION: "Review the jPlayer options: support and supplied."
    NO_SUPPORT: "Video or audio formats defined in the supplied option are missing."
    URL: "Check media URL is valid."
    URL_NOT_SET: "Use setMedia() to set the media URL."
    VERSION: "Update jPlayer files."

  c.jPlayer.warning =
    CSS_SELECTOR_COUNT: "e_css_selector_count"
    CSS_SELECTOR_METHOD: "e_css_selector_method"
    CSS_SELECTOR_STRING: "e_css_selector_string"
    OPTION_KEY: "e_option_key"

  c.jPlayer.warningMsg =
    CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: "
    CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method."
    CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty."
    OPTION_KEY: "The option requested in jPlayer('option') is undefined."

  c.jPlayer.warningHint =
    CSS_SELECTOR_COUNT: "Check your css selector and the ancestor."
    CSS_SELECTOR_METHOD: "Check your method name."
    CSS_SELECTOR_STRING: "Check your css selector is a string."
    OPTION_KEY: "Check your option name."
) jQuery
jQuery.extend autoHinter: (d) ->
  f =
    url: "/api/stations/trackartist/"
    input: jQuery("#create-station input:text")
    container: jQuery(".results")
    queryParam: "q"
    delay: 500
    minChars: 1
    max: 15
    formatItem: ->

    returnItem: ->

    selectItem: ->

    createItem: ->

    notMatch: ->

  d = jQuery.extend(f, d)
  e = undefined
  q = undefined
  b = d.input
  r = d.container
  n = false
  c =
    left: 37
    up: 38
    right: 39
    down: 40
    esc: 27
    enter: 13
    backspace: 8

  s = false
  a = ->
    r.show()

  g = ->
    r.hide()  unless s

  l = ->
    r.find("li.selected").removeClass "selected"
    r.find("li:first").addClass "selected"
    h()

  h = ->
    v = r.find("li.selected")
    u = v.prevAll().length
    b.val d.returnItem(q[u])  if v.length > 0
    d.selectItem q[u]
    n = true

  p = ->
    v = b.val()
    u = d.max
    return false  if b.val().length < d.minChars
    data = {}
    data[d.queryParam] = v
    data.limit = u
    jQuery.ajax
      url: d.url
      data: data
      success: (w) ->
        q = w
        x = "<ul>"
        $.each w, ->
          x += d.formatItem(this)

        x += "</ul>"
        r.html(x).show()
        r.find("ul li").mouseenter(->
          $(this).addClass("selected").siblings().removeClass "selected"
        ).click ->
          h()
          g()
          d.createItem()

        if w.length is 0
          d.notMatch()
        else
          d.selectItem w[0]

  o = ->
    e = setTimeout(p, d.delay)

  j = ->
    u = r.find("li.selected")
    v = r.find("li:first")
    if u.length > 0
      if u[0] is v[0]
        u.removeClass "selected"
        r.find("li:last").addClass "selected"
      else
        u.removeClass("selected").prev().addClass "selected"
    else
      u.removeClass "selected"
      v.addClass "selected"

  m = ->
    u = r.find("li.selected")
    v = r.find("li:first")
    if u.length > 0
      if u[0] is r.find("li:last")[0]
        u.removeClass "selected"
        v.addClass "selected"
      else
        u.removeClass("selected").next().addClass "selected"
    else
      u.removeClass "selected"
      v.addClass "selected"

  t = (v) ->
    u = v.keyCode or v.which
    switch u
      when c.esc
        g()
      when c.up
        j()
      when c.down
        m()
      when c.enter
        if n
          d.createItem()
          break
        if r.find("li").length is 1
          l()
          g()
        else
          if r.find("li.selected").length is 1
            h()
            g()
      when c.left, c.right
    , c.backspace
        g()
        r.find("li.selected").removeClass "selected"
        n = false
      else
        clearTimeout e  if typeof e isnt "undefined"
        o()

  b.blur g
  b.bind (if $.browser.opera then "keypress" else "keydown"), t
  r.mousedown(->
    s = true
  ).mouseup ->
    s = false

  p()

Base64 = (->
  a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  b =
    encode: (e) ->
      c = ""
      n = undefined
      l = undefined
      h = undefined
      m = undefined
      j = undefined
      g = undefined
      f = undefined
      d = 0
      loop
        n = e.charCodeAt(d++)
        l = e.charCodeAt(d++)
        h = e.charCodeAt(d++)
        m = n >> 2
        j = ((n & 3) << 4) | (l >> 4)
        g = ((l & 15) << 2) | (h >> 6)
        f = h & 63
        if isNaN(l)
          g = f = 64
        else
          f = 64  if isNaN(h)
        c = c + a.charAt(m) + a.charAt(j) + a.charAt(g) + a.charAt(f)
        break unless d < e.length
      c

    decode: (e) ->
      c = ""
      n = undefined
      l = undefined
      h = undefined
      m = undefined
      j = undefined
      g = undefined
      f = undefined
      d = 0
      e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "")
      loop
        m = a.indexOf(e.charAt(d++))
        j = a.indexOf(e.charAt(d++))
        g = a.indexOf(e.charAt(d++))
        f = a.indexOf(e.charAt(d++))
        n = (m << 2) | (j >> 4)
        l = ((j & 15) << 4) | (g >> 2)
        h = ((g & 3) << 6) | f
        c = c + String.fromCharCode(n)
        c = c + String.fromCharCode(l)  unless g is 64
        c = c + String.fromCharCode(h)  unless f is 64
        break unless d < e.length
      c

  b
)()
MD5 = (->
  q = 0
  a = ""
  n = 8
  l = (t, w) ->
    v = (t & 65535) + (w & 65535)
    u = (t >> 16) + (w >> 16) + (v >> 16)
    (u << 16) | (v & 65535)

  p = (t, u) ->
    (t << u) | (t >>> (32 - u))

  b = (w) ->
    v = []
    t = (1 << n) - 1
    u = 0

    while u < w.length * n
      v[u >> 5] |= (w.charCodeAt(u / n) & t) << (u % 32)
      u += n
    v

  g = (v) ->
    w = ""
    t = (1 << n) - 1
    u = 0

    while u < v.length * 32
      w += String.fromCharCode((v[u >> 5] >>> (u % 32)) & t)
      u += n
    w

  s = (v) ->
    u = (if q then "0123456789ABCDEF" else "0123456789abcdef")
    w = ""
    t = 0

    while t < v.length * 4
      w += u.charAt((v[t >> 2] >> ((t % 4) * 8 + 4)) & 15) + u.charAt((v[t >> 2] >> ((t % 4) * 8)) & 15)
      t++
    w

  r = (w) ->
    v = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    y = ""
    x = undefined
    t = undefined
    u = 0

    while u < w.length * 4
      x = (((w[u >> 2] >> 8 * (u % 4)) & 255) << 16) | (((w[u + 1 >> 2] >> 8 * ((u + 1) % 4)) & 255) << 8) | ((w[u + 2 >> 2] >> 8 * ((u + 2) % 4)) & 255)
      t = 0
      while t < 4
        if u * 8 + t * 6 > w.length * 32
          y += a
        else
          y += v.charAt((x >> 6 * (3 - t)) & 63)
        t++
      u += 3
    y

  d = (A, w, v, u, z, y) ->
    l p(l(l(w, A), l(u, y)), z), v

  m = (w, v, B, A, u, z, y) ->
    d (v & B) | ((~v) & A), w, v, u, z, y

  c = (w, v, B, A, u, z, y) ->
    d (v & A) | (B & (~A)), w, v, u, z, y

  o = (w, v, B, A, u, z, y) ->
    d v ^ B ^ A, w, v, u, z, y

  j = (w, v, B, A, u, z, y) ->
    d B ^ (v | (~A)), w, v, u, z, y

  f = (E, z) ->
    E[z >> 5] |= 128 << ((z) % 32)
    E[(((z + 64) >>> 9) << 4) + 14] = z
    D = 1732584193
    C = -271733879
    B = -1732584194
    A = 271733878
    y = undefined
    w = undefined
    v = undefined
    t = undefined
    u = 0

    while u < E.length
      y = D
      w = C
      v = B
      t = A
      D = m(D, C, B, A, E[u + 0], 7, -680876936)
      A = m(A, D, C, B, E[u + 1], 12, -389564586)
      B = m(B, A, D, C, E[u + 2], 17, 606105819)
      C = m(C, B, A, D, E[u + 3], 22, -1044525330)
      D = m(D, C, B, A, E[u + 4], 7, -176418897)
      A = m(A, D, C, B, E[u + 5], 12, 1200080426)
      B = m(B, A, D, C, E[u + 6], 17, -1473231341)
      C = m(C, B, A, D, E[u + 7], 22, -45705983)
      D = m(D, C, B, A, E[u + 8], 7, 1770035416)
      A = m(A, D, C, B, E[u + 9], 12, -1958414417)
      B = m(B, A, D, C, E[u + 10], 17, -42063)
      C = m(C, B, A, D, E[u + 11], 22, -1990404162)
      D = m(D, C, B, A, E[u + 12], 7, 1804603682)
      A = m(A, D, C, B, E[u + 13], 12, -40341101)
      B = m(B, A, D, C, E[u + 14], 17, -1502002290)
      C = m(C, B, A, D, E[u + 15], 22, 1236535329)
      D = c(D, C, B, A, E[u + 1], 5, -165796510)
      A = c(A, D, C, B, E[u + 6], 9, -1069501632)
      B = c(B, A, D, C, E[u + 11], 14, 643717713)
      C = c(C, B, A, D, E[u + 0], 20, -373897302)
      D = c(D, C, B, A, E[u + 5], 5, -701558691)
      A = c(A, D, C, B, E[u + 10], 9, 38016083)
      B = c(B, A, D, C, E[u + 15], 14, -660478335)
      C = c(C, B, A, D, E[u + 4], 20, -405537848)
      D = c(D, C, B, A, E[u + 9], 5, 568446438)
      A = c(A, D, C, B, E[u + 14], 9, -1019803690)
      B = c(B, A, D, C, E[u + 3], 14, -187363961)
      C = c(C, B, A, D, E[u + 8], 20, 1163531501)
      D = c(D, C, B, A, E[u + 13], 5, -1444681467)
      A = c(A, D, C, B, E[u + 2], 9, -51403784)
      B = c(B, A, D, C, E[u + 7], 14, 1735328473)
      C = c(C, B, A, D, E[u + 12], 20, -1926607734)
      D = o(D, C, B, A, E[u + 5], 4, -378558)
      A = o(A, D, C, B, E[u + 8], 11, -2022574463)
      B = o(B, A, D, C, E[u + 11], 16, 1839030562)
      C = o(C, B, A, D, E[u + 14], 23, -35309556)
      D = o(D, C, B, A, E[u + 1], 4, -1530992060)
      A = o(A, D, C, B, E[u + 4], 11, 1272893353)
      B = o(B, A, D, C, E[u + 7], 16, -155497632)
      C = o(C, B, A, D, E[u + 10], 23, -1094730640)
      D = o(D, C, B, A, E[u + 13], 4, 681279174)
      A = o(A, D, C, B, E[u + 0], 11, -358537222)
      B = o(B, A, D, C, E[u + 3], 16, -722521979)
      C = o(C, B, A, D, E[u + 6], 23, 76029189)
      D = o(D, C, B, A, E[u + 9], 4, -640364487)
      A = o(A, D, C, B, E[u + 12], 11, -421815835)
      B = o(B, A, D, C, E[u + 15], 16, 530742520)
      C = o(C, B, A, D, E[u + 2], 23, -995338651)
      D = j(D, C, B, A, E[u + 0], 6, -198630844)
      A = j(A, D, C, B, E[u + 7], 10, 1126891415)
      B = j(B, A, D, C, E[u + 14], 15, -1416354905)
      C = j(C, B, A, D, E[u + 5], 21, -57434055)
      D = j(D, C, B, A, E[u + 12], 6, 1700485571)
      A = j(A, D, C, B, E[u + 3], 10, -1894986606)
      B = j(B, A, D, C, E[u + 10], 15, -1051523)
      C = j(C, B, A, D, E[u + 1], 21, -2054922799)
      D = j(D, C, B, A, E[u + 8], 6, 1873313359)
      A = j(A, D, C, B, E[u + 15], 10, -30611744)
      B = j(B, A, D, C, E[u + 6], 15, -1560198380)
      C = j(C, B, A, D, E[u + 13], 21, 1309151649)
      D = j(D, C, B, A, E[u + 4], 6, -145523070)
      A = j(A, D, C, B, E[u + 11], 10, -1120210379)
      B = j(B, A, D, C, E[u + 2], 15, 718787259)
      C = j(C, B, A, D, E[u + 9], 21, -343485551)
      D = l(D, y)
      C = l(C, w)
      B = l(B, v)
      A = l(A, t)
      u += 16
    [ D, C, B, A ]

  e = (v, y) ->
    x = b(v)
    x = f(x, v.length * n)  if x.length > 16
    t = new Array(16)
    w = new Array(16)
    u = 0

    while u < 16
      t[u] = x[u] ^ 909522486
      w[u] = x[u] ^ 1549556828
      u++
    z = f(t.concat(b(y)), 512 + y.length * n)
    f w.concat(z), 512 + 128

  h =
    hexdigest: (t) ->
      s f(b(t), t.length * n)

    b64digest: (t) ->
      r f(b(t), t.length * n)

    hash: (t) ->
      g f(b(t), t.length * n)

    hmac_hexdigest: (t, u) ->
      s e(t, u)

    hmac_b64digest: (t, u) ->
      r e(t, u)

    hmac_hash: (t, u) ->
      g e(t, u)

    test: ->
      MD5.hexdigest("abc") is "900150983cd24fb0d6963f7d28e17f72"

  h
)()
unless Function::bind
  Function::bind = (e) ->
    d = this
    c = Array::slice
    b = Array::concat
    a = c.call(arguments, 1)
    ->
      d.apply (if e then e else this), b.call(a, c.call(arguments, 0))
unless Array::indexOf
  Array::indexOf = (b) ->
    a = @length
    c = Number(arguments[1]) or 0
    c = (if (c < 0) then Math.ceil(c) else Math.floor(c))
    c += a  if c < 0
    while c < a
      return c  if c of this and this[c] is b
      c++
    -1
((f) ->
  c = (h, g) ->
    new e.Builder(h, g)
  a = (g) ->
    new e.Builder("message", g)
  d = (g) ->
    new e.Builder("iq", g)
  b = (g) ->
    new e.Builder("presence", g)
  e = undefined
  e =
    VERSION: "0d2a2d7"
    NS:
      HTTPBIND: "http://jabber.org/protocol/httpbind"
      BOSH: "urn:xmpp:xbosh"
      CLIENT: "jabber:client"
      AUTH: "jabber:iq:auth"
      ROSTER: "jabber:iq:roster"
      PROFILE: "jabber:iq:profile"
      DISCO_INFO: "http://jabber.org/protocol/disco#info"
      DISCO_ITEMS: "http://jabber.org/protocol/disco#items"
      MUC: "http://jabber.org/protocol/muc"
      SASL: "urn:ietf:params:xml:ns:xmpp-sasl"
      STREAM: "http://etherx.jabber.org/streams"
      BIND: "urn:ietf:params:xml:ns:xmpp-bind"
      SESSION: "urn:ietf:params:xml:ns:xmpp-session"
      VERSION: "jabber:iq:version"
      STANZAS: "urn:ietf:params:xml:ns:xmpp-stanzas"

    addNamespace: (g, h) ->
      e.NS[g] = h

    Status:
      ERROR: 0
      CONNECTING: 1
      CONNFAIL: 2
      AUTHENTICATING: 3
      AUTHFAIL: 4
      CONNECTED: 5
      DISCONNECTED: 6
      DISCONNECTING: 7
      ATTACHED: 8

    LogLevel:
      DEBUG: 0
      INFO: 1
      WARN: 2
      ERROR: 3
      FATAL: 4

    ElementType:
      NORMAL: 1
      TEXT: 3
      CDATA: 4

    TIMEOUT: 1.1
    SECONDARY_TIMEOUT: 0.1
    forEachChild: (l, m, j) ->
      h = undefined
      g = undefined
      h = 0
      while h < l.childNodes.length
        g = l.childNodes[h]
        j g  if g.nodeType is e.ElementType.NORMAL and (not m or @isTagEqual(g, m))
        h++

    isTagEqual: (h, g) ->
      h.tagName.toLowerCase() is g.toLowerCase()

    _xmlGenerator: null
    _makeGenerator: ->
      g = undefined
      if document.implementation.createDocument is `undefined`
        g = @_getIEXmlDom()
        g.appendChild g.createElement("strophe")
      else
        g = document.implementation.createDocument("jabber:client", "strophe", null)
      g

    xmlGenerator: ->
      e._xmlGenerator = e._makeGenerator()  unless e._xmlGenerator
      e._xmlGenerator

    _getIEXmlDom: ->
      h = null
      l = [ "Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM" ]
      j = 0

      while j < l.length
        if h is null
          try
            h = new ActiveXObject(l[j])
          catch g
            h = null
        else
          break
        j++
      h

    xmlElement: (j) ->
      return null  unless j
      m = e.xmlGenerator().createElement(j)
      g = undefined
      l = undefined
      h = undefined
      g = 1
      while g < arguments.length
        continue  unless arguments[g]
        if typeof (arguments[g]) is "string" or typeof (arguments[g]) is "number"
          m.appendChild e.xmlTextNode(arguments[g])
        else
          if typeof (arguments[g]) is "object" and typeof (arguments[g].sort) is "function"
            l = 0
            while l < arguments[g].length
              m.setAttribute arguments[g][l][0], arguments[g][l][1]  if typeof (arguments[g][l]) is "object" and typeof (arguments[g][l].sort) is "function"
              l++
          else
            if typeof (arguments[g]) is "object"
              for h of arguments[g]
                m.setAttribute h, arguments[g][h]  if arguments[g].hasOwnProperty(h)
        g++
      m

    xmlescape: (g) ->
      g

    xmlTextNode: (g) ->
      g = e.xmlescape(g)
      e.xmlGenerator().createTextNode g

    getText: (h) ->
      return null  unless h
      j = ""
      j += h.nodeValue  if h.childNodes.length is 0 and h.nodeType is e.ElementType.TEXT
      g = 0

      while g < h.childNodes.length
        j += h.childNodes[g].nodeValue  if h.childNodes[g].nodeType is e.ElementType.TEXT
        g++
      j

    copyElement: (j) ->
      g = undefined
      h = undefined
      if j.nodeType is e.ElementType.NORMAL
        h = e.xmlElement(j.tagName)
        g = 0
        while g < j.attributes.length
          h.setAttribute j.attributes[g].nodeName.toLowerCase(), j.attributes[g].value
          g++
        g = 0
        while g < j.childNodes.length
          h.appendChild e.copyElement(j.childNodes[g])
          g++
      else
        h = e.xmlGenerator().createTextNode(j.nodeValue)  if j.nodeType is e.ElementType.TEXT
      h

    escapeNode: (g) ->
      g.replace(/^\s+|\s+$/g, "").replace(/\\/g, "\\5c").replace(RegExp(" ", "g"), "\\20").replace(/\"/g, "\\22").replace(/\&/g, "\\26").replace(/\'/g, "\\27").replace(/\//g, "\\2f").replace(/:/g, "\\3a").replace(/</g, "\\3c").replace(/>/g, "\\3e").replace /@/g, "\\40"

    unescapeNode: (g) ->
      g.replace(/\\20/g, " ").replace(/\\22/g, "\"").replace(/\\26/g, "&").replace(/\\27/g, "'").replace(/\\2f/g, "/").replace(/\\3a/g, ":").replace(/\\3c/g, "<").replace(/\\3e/g, ">").replace(/\\40/g, "@").replace /\\5c/g, "\\"

    getNodeFromJid: (g) ->
      return null  if g.indexOf("@") < 0
      g.split("@")[0]

    getDomainFromJid: (g) ->
      h = e.getBareJidFromJid(g)
      if h.indexOf("@") < 0
        h
      else
        j = h.split("@")
        j.splice 0, 1
        j.join "@"

    getResourceFromJid: (g) ->
      h = g.split("/")
      return null  if h.length < 2
      h.splice 0, 1
      h.join "/"

    getBareJidFromJid: (g) ->
      (if g then g.split("/")[0] else null)

    log: (h, g) ->
      return

    debug: (g) ->
      @log @LogLevel.DEBUG, g

    info: (g) ->
      @log @LogLevel.INFO, g

    warn: (g) ->
      @log @LogLevel.WARN, g

    error: (g) ->
      @log @LogLevel.ERROR, g

    fatal: (g) ->
      @log @LogLevel.FATAL, g

    serialize: (j) ->
      g = undefined
      return null  unless j
      j = j.tree()  if typeof (j.tree) is "function"
      m = j.nodeName
      h = undefined
      l = undefined
      m = j.getAttribute("_realname")  if j.getAttribute("_realname")
      g = "<" + m
      h = 0
      while h < j.attributes.length
        g += " " + j.attributes[h].nodeName.toLowerCase() + "='" + j.attributes[h].value.replace(/&/g, "&amp;").replace(/\'/g, "&apos;").replace(/</g, "&lt;") + "'"  unless j.attributes[h].nodeName is "_realname"
        h++
      if j.childNodes.length > 0
        g += ">"
        h = 0
        while h < j.childNodes.length
          l = j.childNodes[h]
          switch l.nodeType
            when e.ElementType.NORMAL
              g += e.serialize(l)
            when e.ElementType.TEXT
              g += e.xmlescape(l.nodeValue)
            when e.ElementType.CDATA
              g += "<![CDATA[" + l.nodeValue + "]]>"
          h++
        g += "</" + m + ">"
      else
        g += "/>"
      g

    _requestId: 0
    _connectionPlugins: {}
    addConnectionPlugin: (g, h) ->
      e._connectionPlugins[g] = h

  e.Builder = (h, g) ->
    if h is "presence" or h is "message" or h is "iq"
      if g and not g.xmlns
        g.xmlns = e.NS.CLIENT
      else
        g = xmlns: e.NS.CLIENT  unless g
    @nodeTree = e.xmlElement(h, g)
    @node = @nodeTree

  e.Builder:: =
    tree: ->
      @nodeTree

    toString: ->
      e.serialize @nodeTree

    up: ->
      @node = @node.parentNode
      this

    attrs: (h) ->
      for g of h
        @node.setAttribute g, h[g]  if h.hasOwnProperty(g)
      this

    c: (h, g, j) ->
      l = e.xmlElement(h, g, j)
      @node.appendChild l
      @node = l  unless j
      this

    cnode: (j) ->
      m = e.xmlGenerator()
      try
        h = (m.importNode isnt `undefined`)
      catch l
        h = false
      g = (if h then m.importNode(j, true) else e.copyElement(j))
      @node.appendChild g
      @node = g
      this

    t: (g) ->
      h = e.xmlTextNode(g)
      @node.appendChild h
      this

  e.Handler = (m, l, h, j, o, n, g) ->
    @handler = m
    @ns = l
    @name = h
    @type = j
    @id = o
    @options = g or matchbare: false
    @options.matchBare = false  unless @options.matchBare
    if @options.matchBare
      @from = (if n then e.getBareJidFromJid(n) else null)
    else
      @from = n
    @user = true

  e.Handler:: =
    isMatch: (h) ->
      l = undefined
      j = null
      if @options.matchBare
        j = e.getBareJidFromJid(h.getAttribute("from"))
      else
        j = h.getAttribute("from")
      l = false
      unless @ns
        l = true
      else
        g = this
        e.forEachChild h, null, (m) ->
          l = true  if m.getAttribute("xmlns") is g.ns

        l = l or h.getAttribute("xmlns") is @ns
      return true  if l and (not @name or e.isTagEqual(h, @name)) and (not @type or h.getAttribute("type") is @type) and (not @id or h.getAttribute("id") is @id) and (not @from or j is @from)
      false

    run: (h) ->
      g = null
      try
        g = @handler(h)
      catch j
        if j.sourceURL
          e.fatal "error: " + @handler + " " + j.sourceURL + ":" + j.line + " - " + j.name + ": " + j.message
        else
          if j.fileName
            unless typeof (console) is "undefined"
              console.trace()
              console.error @handler, " - error - ", j, j.message
            e.fatal "error: " + @handler + " " + j.fileName + ":" + j.lineNumber + " - " + j.name + ": " + j.message
          else
            e.fatal "error: " + @handler
        throw j
      g

    toString: ->
      "{Handler: " + @handler + "(" + @name + "," + @id + "," + @ns + ")}"

  e.TimedHandler = (h, g) ->
    @period = h
    @handler = g
    @lastCalled = new Date().getTime()
    @user = true

  e.TimedHandler:: =
    run: ->
      @lastCalled = new Date().getTime()
      @handler()

    reset: ->
      @lastCalled = new Date().getTime()

    toString: ->
      "{TimedHandler: " + @handler + "(" + @period + ")}"

  e.Request = (j, h, g, l) ->
    @id = ++e._requestId
    @xmlData = j
    @data = e.serialize(j)
    @origFunc = h
    @func = h
    @rid = g
    @date = NaN
    @sends = l or 0
    @abort = false
    @dead = null
    @age = ->
      return 0  unless @date
      m = new Date()
      (m - @date) / 1000

    @timeDead = ->
      return 0  unless @dead
      m = new Date()
      (m - @dead) / 1000

    @xhr = @_newXHR()

  e.Request:: =
    getResponse: ->
      g = null
      if @xhr.responseXML and @xhr.responseXML.documentElement
        g = @xhr.responseXML.documentElement
        if g.tagName is "parsererror"
          e.error "invalid response received"
          e.error "responseText: " + @xhr.responseText
          e.error "responseXML: " + e.serialize(@xhr.responseXML)
          throw "parsererror"
      else
        if @xhr.responseText
          e.error "invalid response received"
          e.error "responseText: " + @xhr.responseText
          e.error "responseXML: " + e.serialize(@xhr.responseXML)
      g

    _newXHR: ->
      g = null
      if window.XMLHttpRequest
        g = new XMLHttpRequest()
        g.overrideMimeType "text/xml"  if g.overrideMimeType
      else
        g = new ActiveXObject("Microsoft.XMLHTTP")  if window.ActiveXObject
      g.onreadystatechange = @func.bind(null, this)
      g

  e.Connection = (g) ->
    @service = g
    @jid = ""
    @rid = Math.floor(Math.random() * 4294967295)
    @sid = null
    @streamId = null
    @features = null
    @do_session = false
    @do_bind = false
    @timedHandlers = []
    @handlers = []
    @removeTimeds = []
    @removeHandlers = []
    @addTimeds = []
    @addHandlers = []
    @_idleTimeout = null
    @_disconnectTimeout = null
    @authenticated = false
    @disconnecting = false
    @connected = false
    @errors = 0
    @paused = false
    @hold = 1
    @wait = 60
    @window = 5
    @_data = []
    @_requests = []
    @_uniqueId = Math.round(Math.random() * 10000)
    @_sasl_success_handler = null
    @_sasl_failure_handler = null
    @_sasl_challenge_handler = null
    @_idleTimeout = setTimeout(@_onIdle.bind(this), 100)
    for h of e._connectionPlugins
      if e._connectionPlugins.hasOwnProperty(h)
        l = e._connectionPlugins[h]
        j = ->

        j:: = l
        this[h] = new j()
        this[h].init this

  e.Connection:: =
    reset: ->
      @rid = Math.floor(Math.random() * 4294967295)
      @sid = null
      @streamId = null
      @do_session = false
      @do_bind = false
      @timedHandlers = []
      @handlers = []
      @removeTimeds = []
      @removeHandlers = []
      @addTimeds = []
      @addHandlers = []
      @authenticated = false
      @disconnecting = false
      @connected = false
      @errors = 0
      @_requests = []
      @_uniqueId = Math.round(Math.random() * 10000)

    pause: ->
      @paused = true

    resume: ->
      @paused = false

    getUniqueId: (g) ->
      if typeof (g) is "string" or typeof (g) is "number"
        ++@_uniqueId + ":" + g
      else
        ++@_uniqueId + ""

    connect: (h, j, n, m, l) ->
      @jid = h
      @pass = j
      @connect_callback = n
      @disconnecting = false
      @connected = false
      @authenticated = false
      @errors = 0
      @wait = m or @wait
      @hold = l or @hold
      @domain = e.getDomainFromJid(@jid)
      g = @_buildBody().attrs(
        to: @domain
        "xml:lang": "en"
        wait: @wait
        hold: @hold
        content: "text/xml; charset=utf-8"
        ver: "1.6"
        "xmpp:version": "1.0"
        "xmlns:xmpp": e.NS.BOSH
      )
      @_changeConnectStatus e.Status.CONNECTING, null
      @_requests.push new e.Request(g.tree(), @_onRequestStateChange.bind(this, @_connect_cb.bind(this)), g.tree().getAttribute("rid"))
      @_throttledRequestHandler()

    attach: (j, g, l, o, n, m, h) ->
      @jid = j
      @sid = g
      @rid = l
      @connect_callback = o
      @domain = e.getDomainFromJid(@jid)
      @authenticated = true
      @connected = true
      @wait = n or @wait
      @hold = m or @hold
      @window = h or @window
      @_changeConnectStatus e.Status.ATTACHED, null

    xmlInput: (g) ->
      return

    xmlOutput: (g) ->
      return

    rawInput: (g) ->
      return

    rawOutput: (g) ->
      return

    send: (h) ->
      return  if h is null
      if typeof (h.sort) is "function"
        g = 0

        while g < h.length
          @_queueData h[g]
          g++
      else
        if typeof (h.tree) is "function"
          @_queueData h.tree()
        else
          @_queueData h
      @_throttledRequestHandler()
      clearTimeout @_idleTimeout
      @_idleTimeout = setTimeout(@_onIdle.bind(this), 100)

    flush: ->
      clearTimeout @_idleTimeout
      @_onIdle()

    sendIQ: (l, p, g, m) ->
      n = null
      j = this
      l = l.tree()  if typeof (l.tree) is "function"
      o = l.getAttribute("id")
      unless o
        o = @getUniqueId("sendIQ")
        l.setAttribute "id", o
      h = @addHandler((r) ->
        j.deleteTimedHandler n  if n
        q = r.getAttribute("type")
        if q is "result"
          p r  if p
        else
          if q is "error"
            g r  if g
          else
            throw
              name: "StropheError"
              message: "Got bad IQ type of " + q
      , null, "iq", null, o)
      if m
        n = @addTimedHandler(m, ->
          j.deleteHandler h
          g null  if g
          false
        )
      @send l
      o

    _queueData: (g) ->
      if g is null or not g.tagName or not g.childNodes
        throw
          name: "StropheError"
          message: "Cannot queue non-DOMElement."
      @_data.push g

    _sendRestart: ->
      @_data.push "restart"
      @_throttledRequestHandler()
      clearTimeout @_idleTimeout
      @_idleTimeout = setTimeout(@_onIdle.bind(this), 100)

    addTimedHandler: (j, h) ->
      g = new e.TimedHandler(j, h)
      @addTimeds.push g
      g

    deleteTimedHandler: (g) ->
      @removeTimeds.push g

    addHandler: (n, m, j, l, p, o, h) ->
      g = new e.Handler(n, m, j, l, p, o, h)
      @addHandlers.push g
      g

    deleteHandler: (g) ->
      @removeHandlers.push g

    disconnect: (g) ->
      @_changeConnectStatus e.Status.DISCONNECTING, g
      e.info "Disconnect was called because: " + g
      if @connected
        @_disconnectTimeout = @_addSysTimedHandler(3000, @_onDisconnectTimeout.bind(this))
        @_sendTerminate()

    _changeConnectStatus: (g, n) ->
      for h of e._connectionPlugins
        if e._connectionPlugins.hasOwnProperty(h)
          l = this[h]
          if l.statusChanged
            try
              l.statusChanged g, n
            catch j
              e.error "" + h + " plugin caused an exception changing status: " + j
      if @connect_callback
        try
          @connect_callback g, n
        catch m
          e.error "User connection callback caused an exception: " + m

    _buildBody: ->
      g = c("body",
        rid: @rid++
        xmlns: e.NS.HTTPBIND
      )
      g.attrs sid: @sid  if @sid isnt null
      g

    _removeRequest: (h) ->
      e.debug "removing request"
      g = undefined
      g = @_requests.length - 1
      while g >= 0
        @_requests.splice g, 1  if h is @_requests[g]
        g--
      h.xhr.onreadystatechange = ->

      @_throttledRequestHandler()

    _restartRequest: (g) ->
      h = @_requests[g]
      h.dead = new Date()  if h.dead is null
      @_processRequest g

    _processRequest: (j) ->
      p = @_requests[j]
      s = -1
      try
        s = p.xhr.status  if p.xhr.readyState is 4
      catch n
        e.error "caught an error in _requests[" + j + "], reqStatus: " + s
      s = -1  if typeof (s) is "undefined"
      if p.sends > 5
        @_onDisconnectTimeout()
        return
      h = p.age()
      g = (not isNaN(h) and h > Math.floor(e.TIMEOUT * @wait))
      l = (p.dead isnt null and p.timeDead() > Math.floor(e.SECONDARY_TIMEOUT * @wait))
      r = (p.xhr.readyState is 4 and (s < 1 or s >= 500))
      if g or l or r
        e.error "Request " + @_requests[j].id + " timed out (secondary), restarting"  if l
        p.abort = true
        p.xhr.abort()
        p.xhr.onreadystatechange = ->

        @_requests[j] = new e.Request(p.xmlData, p.origFunc, p.rid, p.sends)
        p = @_requests[j]
      if p.xhr.readyState is 0
        e.debug "request id " + p.id + "." + p.sends + " posting"
        try
          p.xhr.open "POST", @service, true
        catch o
          e.error "XHR open failed."
          @_changeConnectStatus e.Status.CONNFAIL, "bad-service"  unless @connected
          @disconnect()
          return
        q = ->
          p.date = new Date()
          p.xhr.send p.data

        if p.sends > 1
          m = Math.min(Math.floor(e.TIMEOUT * @wait), Math.pow(p.sends, 3)) * 1000
          setTimeout q, m
        else
          q()
        p.sends++
        @xmlOutput p.xmlData  if @xmlOutput isnt e.Connection::xmlOutput
        @rawOutput p.data  if @rawOutput isnt e.Connection::rawOutput
      else
        e.debug "_processRequest: " + (if j is 0 then "first" else "second") + " request has readyState of " + p.xhr.readyState

    _throttledRequestHandler: ->
      unless @_requests
        e.debug "_throttledRequestHandler called with undefined requests"
      else
        e.debug "_throttledRequestHandler called with " + @_requests.length + " requests"
      return  if not @_requests or @_requests.length is 0
      @_processRequest 0  if @_requests.length > 0
      @_processRequest 1  if @_requests.length > 1 and Math.abs(@_requests[0].rid - @_requests[1].rid) < @window

    _onRequestStateChange: (l, j) ->
      e.debug "request id " + j.id + "." + j.sends + " state changed to " + j.xhr.readyState
      if j.abort
        j.abort = false
        return
      h = undefined
      if j.xhr.readyState is 4
        h = 0
        try
          h = j.xhr.status
        h = 0  if typeof (h) is "undefined"
        if @disconnecting
          if h >= 400
            @_hitError h
            return
        g = (@_requests[0] is j)
        n = (@_requests[1] is j)
        if (h > 0 and h < 500) or j.sends > 5
          @_removeRequest j
          e.debug "request id " + j.id + " should now be removed"
        if h is 200
          @_restartRequest 0  if n or (g and @_requests.length > 0 and @_requests[0].age() > Math.floor(e.SECONDARY_TIMEOUT * @wait))
          e.debug "request id " + j.id + "." + j.sends + " got 200"
          l j
          @errors = 0
        else
          e.error "request id " + j.id + "." + j.sends + " error " + h + " happened"
          if h is 0 or (h >= 400 and h < 600) or h >= 12000
            @_hitError h
            if h >= 400 and h < 500
              @_changeConnectStatus e.Status.DISCONNECTING, null
              @_doDisconnect()
        @_throttledRequestHandler()  unless (h > 0 and h < 500) or j.sends > 5

    _hitError: (g) ->
      @errors++
      e.warn "request errored, status: " + g + ", number of errors: " + @errors
      @_onDisconnectTimeout()  if @errors > 4

    _doDisconnect: ->
      e.info "_doDisconnect was called"
      @authenticated = false
      @disconnecting = false
      @sid = null
      @streamId = null
      @rid = Math.floor(Math.random() * 4294967295)
      if @connected
        @_changeConnectStatus e.Status.DISCONNECTED, null
        @connected = false
      @handlers = []
      @timedHandlers = []
      @removeTimeds = []
      @removeHandlers = []
      @addTimeds = []
      @addHandlers = []

    _dataRecv: (q) ->
      try
        g = q.getResponse()
      catch o
        throw o  unless o is "parsererror"
        @disconnect "strophe-parsererror"
      return  if g is null
      @xmlInput g  if @xmlInput isnt e.Connection::xmlInput
      @rawInput e.serialize(g)  if @rawInput isnt e.Connection::rawInput
      m = undefined
      j = undefined
      while @removeHandlers.length > 0
        j = @removeHandlers.pop()
        m = @handlers.indexOf(j)
        @handlers.splice m, 1  if m >= 0
      @handlers.push @addHandlers.pop()  while @addHandlers.length > 0
      if @disconnecting and @_requests.length is 0
        @deleteTimedHandler @_disconnectTimeout
        @_disconnectTimeout = null
        @_doDisconnect()
        return
      h = g.getAttribute("type")
      p = undefined
      l = undefined
      if h isnt null and h is "terminate"
        return  if @disconnecting
        p = g.getAttribute("condition")
        l = g.getElementsByTagName("conflict")
        if p isnt null
          p = "conflict"  if p is "remote-stream-error" and l.length > 0
          @_changeConnectStatus e.Status.CONNFAIL, p
        else
          @_changeConnectStatus e.Status.CONNFAIL, "unknown"
        @disconnect()
        return
      n = this
      e.forEachChild g, null, (v) ->
        s = undefined
        t = undefined
        t = n.handlers
        n.handlers = []
        s = 0
        while s < t.length
          r = t[s]
          try
            if r.isMatch(v) and (n.authenticated or not r.user)
              n.handlers.push r  if r.run(v)
            else
              n.handlers.push r
          s++

    _sendTerminate: ->
      e.info "_sendTerminate was called"
      g = @_buildBody().attrs(type: "terminate")
      if @authenticated
        g.c "presence",
          xmlns: e.NS.CLIENT
          type: "unavailable"
      @disconnecting = true
      h = new e.Request(g.tree(), @_onRequestStateChange.bind(this, @_dataRecv.bind(this)), g.tree().getAttribute("rid"))
      @_requests.push h
      @_throttledRequestHandler()

    _connect_cb: (w) ->
      e.info "_connect_cb was called"
      @connected = true
      h = w.getResponse()
      return  unless h
      @xmlInput h  if @xmlInput isnt e.Connection::xmlInput
      @rawInput e.serialize(h)  if @rawInput isnt e.Connection::rawInput
      n = h.getAttribute("type")
      v = undefined
      p = undefined
      if n isnt null and n is "terminate"
        v = h.getAttribute("condition")
        p = h.getElementsByTagName("conflict")
        if v isnt null
          v = "conflict"  if v is "remote-stream-error" and p.length > 0
          @_changeConnectStatus e.Status.CONNFAIL, v
        else
          @_changeConnectStatus e.Status.CONNFAIL, "unknown"
        return
      @sid = h.getAttribute("sid")  unless @sid
      @stream_id = h.getAttribute("authid")  unless @stream_id
      j = h.getAttribute("requests")
      @window = parseInt(j, 10)  if j
      g = h.getAttribute("hold")
      @hold = parseInt(g, 10)  if g
      r = h.getAttribute("wait")
      @wait = parseInt(r, 10)  if r
      x = false
      m = false
      u = false
      y = h.getElementsByTagName("mechanism")
      o = undefined
      t = undefined
      q = undefined
      l = undefined
      if y.length > 0
        o = 0
        while o < y.length
          t = e.getText(y[o])
          if t is "DIGEST-MD5"
            m = true
          else
            if t is "PLAIN"
              x = true
            else
              u = true  if t is "ANONYMOUS"
          o++
      else
        s = @_buildBody()
        @_requests.push new e.Request(s.tree(), @_onRequestStateChange.bind(this, @_connect_cb.bind(this)), s.tree().getAttribute("rid"))
        @_throttledRequestHandler()
        return
      if e.getNodeFromJid(@jid) is null and u
        @_changeConnectStatus e.Status.AUTHENTICATING, null
        @_sasl_success_handler = @_addSysHandler(@_sasl_success_cb.bind(this), null, "success", null, null)
        @_sasl_failure_handler = @_addSysHandler(@_sasl_failure_cb.bind(this), null, "failure", null, null)
        @send c("auth",
          xmlns: e.NS.SASL
          mechanism: "ANONYMOUS"
        ).tree()
      else
        if e.getNodeFromJid(@jid) is null
          @_changeConnectStatus e.Status.CONNFAIL, "x-strophe-bad-non-anon-jid"
          @disconnect()
        else
          if m
            @_changeConnectStatus e.Status.AUTHENTICATING, null
            @_sasl_challenge_handler = @_addSysHandler(@_sasl_challenge1_cb.bind(this), null, "challenge", null, null)
            @_sasl_failure_handler = @_addSysHandler(@_sasl_failure_cb.bind(this), null, "failure", null, null)
            @send c("auth",
              xmlns: e.NS.SASL
              mechanism: "DIGEST-MD5"
            ).tree()
          else
            if x
              q = e.getBareJidFromJid(@jid)
              q = q + "\u0000"
              q = q + e.getNodeFromJid(@jid)
              q = q + "\u0000"
              q = q + @pass
              @_changeConnectStatus e.Status.AUTHENTICATING, null
              @_sasl_success_handler = @_addSysHandler(@_sasl_success_cb.bind(this), null, "success", null, null)
              @_sasl_failure_handler = @_addSysHandler(@_sasl_failure_cb.bind(this), null, "failure", null, null)
              l = Base64.encode(q)
              @send c("auth",
                xmlns: e.NS.SASL
                mechanism: "PLAIN"
              ).t(l).tree()
            else
              @_changeConnectStatus e.Status.AUTHENTICATING, null
              @_addSysHandler @_auth1_cb.bind(this), null, null, null, "_auth_1"
              @send d(
                type: "get"
                to: @domain
                id: "_auth_1"
              ).c("query",
                xmlns: e.NS.AUTH
              ).c("username", {}).t(e.getNodeFromJid(@jid)).tree()

    _sasl_challenge1_cb: (m) ->
      h = /([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/
      s = Base64.decode(e.getText(m))
      t = MD5.hexdigest("" + (Math.random() * 1234567890))
      p = ""
      u = null
      q = ""
      g = ""
      o = undefined
      @deleteHandler @_sasl_failure_handler
      while s.match(h)
        o = s.match(h)
        s = s.replace(o[0], "")
        o[2] = o[2].replace(/^"(.+)"$/, "$1")
        switch o[1]
          when "realm"
            p = o[2]
          when "nonce"
            q = o[2]
          when "qop"
            g = o[2]
          when "host"
            u = o[2]
      n = "xmpp/" + @domain
      n = n + "/" + u  if u isnt null
      l = MD5.hash(e.getNodeFromJid(@jid) + ":" + p + ":" + @pass) + ":" + q + ":" + t
      j = "AUTHENTICATE:" + n
      r = ""
      r += "username=" + @_quote(e.getNodeFromJid(@jid)) + ","
      r += "realm=" + @_quote(p) + ","
      r += "nonce=" + @_quote(q) + ","
      r += "cnonce=" + @_quote(t) + ","
      r += "nc=\"00000001\","
      r += "qop=\"auth\","
      r += "digest-uri=" + @_quote(n) + ","
      r += "response=" + @_quote(MD5.hexdigest(MD5.hexdigest(l) + ":" + q + ":00000001:" + t + ":auth:" + MD5.hexdigest(j))) + ","
      r += "charset=\"utf-8\""
      @_sasl_challenge_handler = @_addSysHandler(@_sasl_challenge2_cb.bind(this), null, "challenge", null, null)
      @_sasl_success_handler = @_addSysHandler(@_sasl_success_cb.bind(this), null, "success", null, null)
      @_sasl_failure_handler = @_addSysHandler(@_sasl_failure_cb.bind(this), null, "failure", null, null)
      @send c("response",
        xmlns: e.NS.SASL
      ).t(Base64.encode(r)).tree()
      false

    _quote: (g) ->
      "\"" + g.replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\""

    _sasl_challenge2_cb: (g) ->
      @deleteHandler @_sasl_success_handler
      @deleteHandler @_sasl_failure_handler
      @_sasl_success_handler = @_addSysHandler(@_sasl_success_cb.bind(this), null, "success", null, null)
      @_sasl_failure_handler = @_addSysHandler(@_sasl_failure_cb.bind(this), null, "failure", null, null)
      @send c("response",
        xmlns: e.NS.SASL
      ).tree()
      false

    _auth1_cb: (g) ->
      h = d(
        type: "set"
        id: "_auth_2"
      ).c("query",
        xmlns: e.NS.AUTH
      ).c("username", {}).t(e.getNodeFromJid(@jid)).up().c("password").t(@pass)
      @jid = e.getBareJidFromJid(@jid) + "/strophe"  unless e.getResourceFromJid(@jid)
      h.up().c("resource", {}).t e.getResourceFromJid(@jid)
      @_addSysHandler @_auth2_cb.bind(this), null, null, null, "_auth_2"
      @send h.tree()
      false

    _sasl_success_cb: (g) ->
      e.info "SASL authentication succeeded."
      @deleteHandler @_sasl_failure_handler
      @_sasl_failure_handler = null
      if @_sasl_challenge_handler
        @deleteHandler @_sasl_challenge_handler
        @_sasl_challenge_handler = null
      @_addSysHandler @_sasl_auth1_cb.bind(this), null, "stream:features", null, null
      @_sendRestart()
      false

    _sasl_auth1_cb: (h) ->
      @features = h
      g = undefined
      l = undefined
      g = 0
      while g < h.childNodes.length
        l = h.childNodes[g]
        @do_bind = true  if l.nodeName is "bind"
        @do_session = true  if l.nodeName is "session"
        g++
      unless @do_bind
        @_changeConnectStatus e.Status.AUTHFAIL, null
        return false
      else
        @_addSysHandler @_sasl_bind_cb.bind(this), null, null, null, "_bind_auth_2"
        j = e.getResourceFromJid(@jid)
        if j
          @send d(
            type: "set"
            id: "_bind_auth_2"
          ).c("bind",
            xmlns: e.NS.BIND
          ).c("resource", {}).t(j).tree()
        else
          @send d(
            type: "set"
            id: "_bind_auth_2"
          ).c("bind",
            xmlns: e.NS.BIND
          ).tree()
      false

    _sasl_bind_cb: (g) ->
      if g.getAttribute("type") is "error"
        e.info "SASL binding failed."
        @_changeConnectStatus e.Status.AUTHFAIL, null
        return false
      j = g.getElementsByTagName("bind")
      h = undefined
      if j.length > 0
        h = j[0].getElementsByTagName("jid")
        if h.length > 0
          @jid = e.getText(h[0])
          if @do_session
            @_addSysHandler @_sasl_session_cb.bind(this), null, null, null, "_session_auth_2"
            @send d(
              type: "set"
              id: "_session_auth_2"
            ).c("session",
              xmlns: e.NS.SESSION
            ).tree()
          else
            @authenticated = true
            @_changeConnectStatus e.Status.CONNECTED, null
      else
        e.info "SASL binding failed."
        @_changeConnectStatus e.Status.AUTHFAIL, null
        false

    _sasl_session_cb: (g) ->
      if g.getAttribute("type") is "result"
        @authenticated = true
        @_changeConnectStatus e.Status.CONNECTED, null
      else
        if g.getAttribute("type") is "error"
          e.info "Session creation failed."
          @_changeConnectStatus e.Status.AUTHFAIL, null
          return false
      false

    _sasl_failure_cb: (g) ->
      if @_sasl_success_handler
        @deleteHandler @_sasl_success_handler
        @_sasl_success_handler = null
      if @_sasl_challenge_handler
        @deleteHandler @_sasl_challenge_handler
        @_sasl_challenge_handler = null
      @_changeConnectStatus e.Status.AUTHFAIL, null
      false

    _auth2_cb: (g) ->
      if g.getAttribute("type") is "result"
        @authenticated = true
        @_changeConnectStatus e.Status.CONNECTED, null
      else
        if g.getAttribute("type") is "error"
          @_changeConnectStatus e.Status.AUTHFAIL, null
          @disconnect()
      false

    _addSysTimedHandler: (j, h) ->
      g = new e.TimedHandler(j, h)
      g.user = false
      @addTimeds.push g
      g

    _addSysHandler: (m, l, h, j, n) ->
      g = new e.Handler(m, l, h, j, n)
      g.user = false
      @addHandlers.push g
      g

    _onDisconnectTimeout: ->
      e.info "_onDisconnectTimeout was called"
      g = undefined
      while @_requests.length > 0
        g = @_requests.pop()
        g.abort = true
        g.xhr.abort()
        g.xhr.onreadystatechange = ->
      @_doDisconnect()
      false

    _onIdle: ->
      j = undefined
      m = undefined
      o = undefined
      l = undefined
      @timedHandlers.push @addTimeds.pop()  while @addTimeds.length > 0
      while @removeTimeds.length > 0
        m = @removeTimeds.pop()
        j = @timedHandlers.indexOf(m)
        @timedHandlers.splice j, 1  if j >= 0
      h = new Date().getTime()
      l = []
      j = 0
      while j < @timedHandlers.length
        m = @timedHandlers[j]
        if @authenticated or not m.user
          o = m.lastCalled + m.period
          if o - h <= 0
            l.push m  if m.run()
          else
            l.push m
        j++
      @timedHandlers = l
      g = undefined
      n = undefined
      if @authenticated and @_requests.length is 0 and @_data.length is 0 and not @disconnecting
        e.info "no requests during idle cycle, sending blank request"
        @_data.push null
      if @_requests.length < 2 and @_data.length > 0 and not @paused
        g = @_buildBody()
        j = 0
        while j < @_data.length
          if @_data[j] isnt null
            if @_data[j] is "restart"
              g.attrs
                to: @domain
                "xml:lang": "en"
                "xmpp:restart": "true"
                "xmlns:xmpp": e.NS.BOSH
            else
              g.cnode(@_data[j]).up()
          j++
        delete @_data

        @_data = []
        @_requests.push new e.Request(g.tree(), @_onRequestStateChange.bind(this, @_dataRecv.bind(this)), g.tree().getAttribute("rid"))
        @_processRequest @_requests.length - 1
      if @_requests.length > 0
        n = @_requests[0].age()
        @_throttledRequestHandler()  if @_requests[0].timeDead() > Math.floor(e.SECONDARY_TIMEOUT * @wait)  if @_requests[0].dead isnt null
        if n > Math.floor(e.TIMEOUT * @wait)
          e.warn "Request " + @_requests[0].id + " timed out, over " + Math.floor(e.TIMEOUT * @wait) + " seconds since last activity"
          @_throttledRequestHandler()
      clearTimeout @_idleTimeout
      @_idleTimeout = setTimeout(@_onIdle.bind(this), 100)  if @connected

  f e, c, a, d, b  if f
) ->
  window.Strophe = arguments[0]
  window.$build = arguments[1]
  window.$msg = arguments[2]
  window.$iq = arguments[3]
  window.$pres = arguments[4]

if window.XDomainRequest
  Strophe.debug "using XdomainRequest for IE"
  XDomainRequest::oldsend = XDomainRequest::send
  XDomainRequest::send = ->
    try
      XDomainRequest::oldsend.apply this, arguments
    @readyState = 2
    try
      @onreadystatechange()
Strophe.addConnectionPlugin "xdomainrequest",
  init: ->
    if window.XDomainRequest
      Strophe.Request::_newXHR = ->
        a = (f, c) ->
          f.status = c
          f.readyState = 4
          try
            f.onreadystatechange()

        b = new XDomainRequest()
        b.readyState = 0
        b.onreadystatechange = @func.bind(null, this)
        b.onload = ->
          c = new ActiveXObject("Microsoft.XMLDOM")
          c.async = "false"
          c.loadXML b.responseText
          b.responseXML = c
          a b, 200

        b.onerror = ->
          a b, 500

        b.ontimeout = ->
          a b, 500

        b
    else
      Strophe.error "XDomainRequest not found. Falling back to native XHR implementation."

Strophe.Connection::_sasl_challenge1_fb = (e) ->
  c = Base64.decode(Strophe.getText(e))
  d = ""
  g = ""
  a = ""
  @deleteHandler @_sasl_failure_handler
  b = explode("&", c)
  i = 0
  while i < b.length
    map = explode("=", b[i])
    switch map[0]
      when "nonce"
        d = map[1]
      when "method"
        g = map[1]
      when "version"
        a = map[1]
    i++
  f = this
  $.getJSON "/api/sasl",
    nonce: d
    method: g
    version: a
  , (h) ->
    f._sasl_challenge_handler = f._addSysHandler(f._sasl_challenge2_cb.bind(f), null, "challenge", null, null)
    f._sasl_success_handler = f._addSysHandler(f._sasl_success_cb.bind(f), null, "success", null, null)
    f._sasl_failure_handler = f._addSysHandler(f._sasl_failure_cb.bind(f), null, "failure", null, null)
    f.send $build("response",
      xmlns: Strophe.NS.SASL
    ).t(Base64.encode(h.result)).tree()

  false

Strophe.Connection::_connect_fb = (p) ->
  Strophe.info "_connect_fb was called"
  @connected = true
  c = p.getResponse()
  return  unless c
  @xmlInput c
  @rawInput Strophe.serialize(c)
  f = c.getAttribute("type")
  o = undefined
  h = undefined
  if f isnt null and f is "terminate"
    o = c.getAttribute("condition")
    h = c.getElementsByTagName("conflict")
    if o isnt null
      o = "conflict"  if o is "remote-stream-error" and h.length > 0
      @_changeConnectStatus Strophe.Status.CONNFAIL, o
    else
      @_changeConnectStatus Strophe.Status.CONNFAIL, "unknown"
    return
  @sid = c.getAttribute("sid")  unless @sid
  @stream_id = c.getAttribute("authid")  unless @stream_id
  d = c.getAttribute("requests")
  @window = d  if d
  a = c.getAttribute("hold")
  @hold = a  if a
  l = c.getAttribute("wait")
  @wait = l  if l
  q = c.getElementsByTagName("mechanism")
  g = undefined
  n = undefined
  j = undefined
  e = undefined
  b = undefined
  if q.length is 0
    m = @_buildBody()
    @_requests.push new Strophe.Request(m.tree(), @_onRequestStateChange.bind(this, @_connect_fb.bind(this)), m.tree().getAttribute("rid"))
    @_throttledRequestHandler()
    return
  else
    g = 0
    while g < q.length
      n = Strophe.getText(q[g])
      if n is "X-FACEBOOK-PLATFORM"
        b = true
        break
      g++
  return  unless b
  @_changeConnectStatus Strophe.Status.AUTHENTICATING, null
  @_sasl_challenge_handler = @_addSysHandler(@_sasl_challenge1_fb.bind(this), null, "challenge", null, null)
  @_sasl_failure_handler = @_addSysHandler(@_sasl_challenge1_fb.bind(this), null, "failure", null, null)
  @send $build("auth",
    xmlns: Strophe.NS.SASL
    mechanism: "X-FACEBOOK-PLATFORM"
  ).tree()

Strophe.Connection::facebookConnect = (b, e, d, c) ->
  @jid = b
  @connect_callback = e
  @disconnecting = false
  @connected = false
  @authenticated = false
  @errors = 0
  @wait = d or @wait
  @hold = c or @hold
  @domain = Strophe.getDomainFromJid(@jid)
  a = @_buildBody().attrs(
    to: @domain
    "xml:lang": "en"
    wait: @wait
    hold: @hold
    content: "text/xml; charset=utf-8"
    ver: "1.6"
    "xmpp:version": "1.0"
    "xmlns:xmpp": Strophe.NS.BOSH
  )
  @_changeConnectStatus Strophe.Status.CONNECTING, null
  @_requests.push new Strophe.Request(a.tree(), @_onRequestStateChange.bind(this, @_connect_fb.bind(this)), a.tree().getAttribute("rid"))
  @_throttledRequestHandler()

messagingTimeout = undefined
loader = undefined
String::toTitleCase = ->
  a = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i
  @replace /([^\W_]+[^\s\-]*) */g, (c, e, b, d) ->
    return c.toLowerCase()  if b > 0 and b + e.length isnt d.length and e.search(a) > -1 and d.charAt(b - 2) isnt ":" and d.charAt(b - 1).search(/[^\s\-]/) < 0
    return c  if e.substr(1).search(/[A-Z]|\../) > -1
    c.charAt(0).toUpperCase() + c.substr(1)

$ ->
  $(window).load ->
    LoadingPage.fadeOut()

  sz.isMyProfile = ->
    sz.app.data.Accounts.at(0).get("username") is sz.app.data.User.toJSON().username

  $("#loading").ajaxStart(->
    sz.ui.LoadingIndicator.start()
  ).ajaxStop ->
    sz.ui.LoadingIndicator.stop()

  c = false
  a = false
  b = 4
  $(window).resize(->
    d = $("#friends").outerWidth()
    $("#chats").css "right", d
  ).trigger "resize"
  $("#logo").toggle (->
    $(this).removeClass("up").addClass "down"
    $("#dropdown").show()
  ), ->
    $(this).removeClass("down").addClass "up"
    $("#dropdown").hide()

(->
  window.sz = {}
  sz.controllers = {}
  sz.model = {}
  sz.ui = {}
  sz.ui.modals = {}
  sz.ui.LoadingIndicator =
    callback: null
    animate: ->
      b = $("#loading .left")
      b.animate
        opacity: 1
      , 600
      b.animate
        opacity: 0
      , 600

    start: ->
      unless $.browser.msie
        b = this
        $("#loading").fadeIn()
        b.animate()
        b.callback = setInterval(b.animate, 1200)

    stop: ->
      unless $.browser.msie
        clearInterval @callback
        $("#loading").fadeOut()

  sz.app = {}
  sz.app.controller = {}
  sz.app.ui = {}
  sz.app.data = {}
  sz.app.settings = ->
    d = new Date()
    e = "sz_settings"
    b = (new Date(d.valueOf() - 2 * 24 * 60 * 60 * 1000)).toGMTString()
    c = (new Date(d.valueOf() + 365 * 24 * 60 * 60 * 1000)).toGMTString()
    @defaults = volume: 100
    @get = (f) ->
      @defaults[f]

    @set = (f, g) ->
      @defaults[f] = g
      @save()

    @load = ->
      h = document.cookie.split(";")
      g = null
      f = 0
      while f < h.length
        g = $.trim(h[f])
        if g.indexOf(e) is 0
          _.extend @defaults, JSON.parse(unescape(g.split("=")[1]))
          return
        f++

    @save = ->
      document.cookie = e + "=" + escape(@toString()) + "; expires=" + c + "; path=/"

    @toString = ->
      JSON.stringify @defaults

    @load()

  sz.app.settings = new sz.app.settings()
  a = ->
    c = (->
      g = $("<div style=\"width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;\"><div style=\"height:100px;\"></div>")
      f = undefined
      e = undefined
      $("body").append g
      f = g.children("div").innerWidth()
      g.css "overflow-y", "scroll"
      e = g.children("div").innerWidth()
      g.remove()
      f - e
    )()
    d = 155
    b = 338
    $("<style type=\"text/css\">#content-scroll.scroll.open #content {right:" + (b - c) + "px}#content-scroll.scroll #content {right:" + (d - c) + "px}</style>").appendTo "head"

  sz.app.controller.renderScrollbar = ->
    b = $("#content-scroll")
    c = $("#content-view")
    c.innerscroll
      destination: b
      draggable: true

    scrollbar = b.children().not(c)
    scrollbar.addClass "scrollbar"
    a()

  sz.app.controller._updateScrollbar = ->
    d = $("#content").innerHeight()
    c = $("#content-scroll")
    b = c.height()
    c.removeClass "scroll"
    c.addClass "scroll"  if b < d

  sz.app.controller.updateScrollbar = ->
    setTimeout sz.app.controller._updateScrollbar, 500

  window.fbAsyncInit = ->
    FB.init
      appId: facebook_app_id
      status: true
      cookie: true
      xfbml: true
      music: true

  $(document).ready ->
    b = document.createElement("script")
    b.type = "text/javascript"
    b.src = document.location.protocol + facebook_connect_base_url + facebook_locale + "/all/vb.js"
    b.async = true
    document.getElementById("fb-root").appendChild b
    sz.app.controller.renderScrollbar()
    $(window, "#content-scroll").on "resize", sz.app.controller.updateScrollbar
    $("#content").on "rendered", sz.app.controller.updateScrollbar
)()
String::startsWith = (a) ->
  @indexOf(a) is 0

String::format = ->
  b = Array::slice.call(arguments)
  d = b.length
  a = this
  c = 0

  while c < d
    a = a.replace("{" + c + "}", b[c])
    c++
  a

(->
  a = undefined
  a = (->
    b = (f, e, d, c) ->
      g = this
      @image = f
      @parent = e
      @width = d
      @height = c
      @dimensions = {}
      $(f).on "load", (h) ->
        g.resizeImage()

      $(window).on "resize", (h) ->
        g.resizeImage()
    b::resizeImage = ->
      @dimensions.imgWidth = @width
      @dimensions.imgHeight = @height
      @dimensions.parentWidth = @parent.width()
      @dimensions.parentHeight = @parent.height()
      @aspectRatio = @dimensions.imgWidth / @dimensions.imgHeight
      @image.css
        width: "100%"
        minWidth: @dimensions.parentHeight * @aspectRatio
        minHeight: @dimensions.parentHeight
        height: "auto"

    b
  )()
  window.sz.ui.ResizedImage = a
).call this
(->
  a = Object::hasOwnProperty
  b = (f, d) ->
    e = ->
      @constructor = f
    for c of d
      f[c] = d[c]  if a.call(d, c)
    e:: = d::
    f:: = new e
    f.__super__ = d::
    f

  sz.model.syncHandleToken = (f, e, d) ->
    c = undefined
    c = d.complete or ->

    d.complete = (g) ->
      c()
      (new sz.ui.modals.InvalidTokenFound()).render()  if g.status is 401 and g.responseText is "invalidToken"

    Backbone.sync.call this, f, e, d

  sz.model.BaseModel = ((d) ->
    c = ->
      c.__super__.constructor.apply this, arguments
    b c, d
    c::initialize = (e) ->
      @sync = sz.model.syncHandleToken

    c
  )(Backbone.Model)
  sz.model.BaseCollection = ((d) ->
    c = ->
      c.__super__.constructor.apply this, arguments
    b c, d
    c::initialize = (e) ->
      @sync = sz.model.syncHandleToken

    c
  )(Backbone.Collection)
).call this
sz.model.Station = sz.model.BaseModel.extend(
  defaults:
    favorite: false

  initialize: ->
    @bind "change:id", @bindFavorites, this
    @favoriteCollection = sz.app.data.MyFavourites
    @bindFavorites()

  bindFavorites: ->
    b = (c) ->
      return  if @id isnt c.get("station")
      @favoriteModel = c
      @set favorite: true
      @favoriteModel.bind "destroy", a, this

    a = ->
      @favoriteModel = null
      @set favorite: false

    @favoriteModel = @favoriteCollection.get(@id)
    @set
      favorite: @favoriteModel isnt `undefined`
    ,
      silent: true

    @favoriteModel.bind "destroy", a, this  if @favoriteModel
    @favoriteCollection.bind "add", b, this

  isFavorited: ->
    @getFavoriteModel() isnt null

  getFavoriteModel: ->
    @favoriteCollection.get(@id) or null

  toggleFavorite: ->
    b = @favoriteCollection
    d = sz.app.data.User.get("favourites_count")
    f = sz.app.data.Accounts.at(0).get("username")
    c = sz.app.data.User.get("username") is f
    a = @getFavoriteModel()
    e = ->
      sz.app.ui.StationGrid.stationList.fetch()  if window.location.hash.match(/\/users\/\d+\/(?:stations|favourites)/)

    if a
      a.set
        username: f
      ,
        silent: true

      return a.destroy().success(->
        _kmq.push [ "record", "Unfavorited Station" ]
        if c
          e()
          --d
          sz.app.data.User.set favourites_count: d
      ).error(->
        b.add a
      )
    a = @favoriteCollection.add(
      station: @id
      user: f
    ).last()
    a.save().success(->
      _kmq.push [ "record", "Favorited Station" ]
      if c
        e()
        ++d
        sz.app.data.User.set favourites_count: d
    ).error ->
      a.destroy()

  url: ->
    return "/api/stations/" + @id + "/"  if @id
    "/api/stations/trackartist/"

  toString: ->
    "Station " + @id + " \"" + @get("title") + "\""

  includesArtists: (g) ->
    h = @toJSON().meta
    return ""  if typeof h is "undefined" or typeof h.artists is "undefined"
    c = h.artists
    f = []
    i = 0
    while i < Math.min(c.length, 4)
      e = c[i].name
      d = c[i].slug
      b = "<a href=\"#/artists/" + d + "/\" title=\"" + e + "\">" + e + "</a>"
      f.push b
      i++
    f.join ", "

  createdByUser: ->
    return ""  unless @get("user")
    @get "user"

  createdByFullName: ->
    return ""  unless @get("user")
    a = @get("user")
    a.first_name + " " + a.last_name

  share: ->
    FB.ui
      method: "feed"
      link: window.location.protocol + "//" + window.location.host + "/stations/" + @id + "/play/"

    _kmq.push [ "record", "shared",
      "outbound destination": "facebook"
      "outbound name": "station"
      "outbound medium": "social"
     ]

  toJSON: ->
    a = _.clone(@attributes)
    if a.user_username
      _.extend a,
        user_username: a.user_username or a.user.username
        user_is_active: (if _(a).has("user_is_active") then a.user_is_active else a.user.is_active)
        user_profile: "/users/" + a.user_username + "/stations/"
        user_avatar: (if facebook_https then "https" else "http") + "://graph.facebook.com/" + a.user_username + "/picture"
    a
)
sz.model.UserStation = sz.model.Station.extend(url: ->
  a = @get("user")
  b = @get("station")
  if @id
    "/api/users/" + a + "/stations/" + b + "/"
  else
    "/api/users/" + a + "/stations/"
)
sz.model.UserStations = sz.model.BaseCollection.extend(
  model: sz.model.UserStation
  username: null
  url: ->
    throw "User cannot be null"  unless @username?
    "/api/users/" + @username + "/stations/"
)
sz.model.UserFavourite = sz.model.Station.extend(url: ->
  a = @get("user") or @get("user_username")
  b = @get("station") or @get("id")
  unless @get("id")
    "/api/users/" + a + "/favourites/"
  else
    "/api/users/" + a + "/favourites/" + b + "/"
)
sz.model.UserFavourites = sz.model.BaseCollection.extend(
  model: sz.model.UserFavourite
  username: null
  url: ->
    throw "User cannot be null"  unless @username?
    "/api/users/" + @username + "/favourites/"
)
sz.model.StationInfo = sz.model.BaseModel.extend(
  station_id: null
  url: ->
    throw "Station cannot be null"  unless @station_id?
    "/api/stations/" + @station_id + "/"
)
sz.model.StationTrackImage = sz.model.BaseModel.extend()
sz.model.StationTrackImages = sz.model.BaseCollection.extend(
  model: sz.model.StationTrackImage
  station_id: null
  url: ->
    throw "Station cannot be null"  unless @station_id?
    "/api/stations/" + @station_id + "/playlistimages/"
)
sz.app.data.MyFavourites = new sz.model.UserFavourites()
sz.app.data.UserStation = new sz.model.UserStation()
sz.app.data.Station = new sz.model.Station()
sz.app.data.UserStations = new sz.model.UserStations()
sz.app.data.UserFavourite = new sz.model.UserFavourite()
sz.app.data.UserFavourites = new sz.model.UserFavourites()
sz.app.data.StationTrackImages = new sz.model.StationTrackImages()
sz.model.Featured = sz.model.BaseModel.extend({})
sz.model.Featureds = sz.model.BaseCollection.extend(
  model: sz.model.Featured
  url: ->
    "/api/featured/"
)
sz.app.data.Featureds = new sz.model.Featureds()
sz.model.FeaturedPage = sz.model.BaseModel.extend(url: ->
  "/api/featuredpage/"
)
sz.app.data.FeaturedPage = new sz.model.FeaturedPage()
sz.model.Populars = sz.model.BaseCollection.extend(
  model: sz.model.Station
  type: "website"
  sitename: "senzari"
  parse: (a, b) ->
    _(_(a.popular).pluck("station")).map (c) ->
      _(c).extend
        user_username: c.user.username
        user_name: c.user.first_name + " " + c.user.last_name
        image: c.meta.image

      c

  url: ->
    if @type is "website" and @sitename isnt null
      return "/api/popular/website/" + @sitename + "/"
    else
      return "/api/popular/friends/"  if @type is "friends"
    throw "parameter is invalid!"
)
sz.app.data.Populars = new sz.model.Populars()
sz.model.Activity = sz.model.BaseModel.extend(
  toJSON: ->
    c = _.clone(@attributes)
    a = ""
    b = $($("#activity-messages-template").html()).filter("#user-you").text()
    if c.instance_type is "StationPlayHistory"
      a = "listen"
    else
      if c.instance_type is "StationFavourite"
        a = "favorite"
      else
        a = "create"  if c.instance_type is "Station"
    typeClass: a
    type: c.instance_type
    user:
      me: @myActivity()
      name: c.user1_name
      image: (if facebook_https then "https" else "http") + "://graph.facebook.com/" + c.user1_id + "/picture"
      profile: "/users/" + c.user1_id + "/stations/"

    station:
      url: "/stations/" + c.instance_object_id + "/play/"
      image: c.station.meta.image
      name: c.instance_object_name
      created: $.timeago(c.date_created)
      owner:
        me: @myStation()
        name: c.station.user.first_name + " " + c.station.user.last_name
        image: (if facebook_https then "https" else "http") + "://graph.facebook.com/" + c.station.user.username + "/picture"
        profile: "/users/" + c.station.user.username + "/stations/"

  myActivity: ->
    @get("user1_id") is sz.app.data.Accounts.models[0].get("facebook_id")

  myStation: ->
    @get("station").user.username is sz.app.data.Accounts.models[0].get("facebook_id")
)
sz.model.Activities = sz.model.BaseCollection.extend(
  model: sz.model.Activity
  type: null
  url: ->
    "/api/activity/" + @type + "/"
)
sz.app.data.MyActivities = new sz.model.Activities()
sz.app.data.MyActivities.type = "myactivity"
sz.app.data.MyFriendsActivities = new sz.model.Activities()
sz.app.data.MyFriendsActivities.type = "myfriendsactivity"
sz.app.data.GlobalActivities = new sz.model.Activities()
sz.app.data.GlobalActivities.type = "global"
sz.model.Artist = sz.model.BaseModel.extend(
  id: null
  name: null
  slug: null
  url: ->
    throw "slug cannot be null"  if @slug is null
    "/api/artists/" + @slug + "/"

  getSimilars: (a) ->
    _.extend a or {},
      slug: @get("slug")

    new sz.model.SimilarArtist(a)

  image: ->
    a = @get("images")
    return @get("image") or "/static/images/artist_thumb.jpg"  if not a or not a.length
    a[0].image_full

  createStation: ->
    b =
      value: @id or @get("value")
      artist: @get("name")
      track: ""
      type: "ARTIST"
      name: (@get("artist") or @get("name")) + " Radio"

    a = new sz.model.Station(b)
    a.save().success ->
      _kmq.push [ "record", "Created Station" ]

  toJSON: ->
    a = _.clone(@attributes)
    _.extend a,
      image: @image()

    a
)
sz.model.SimilarArtist = sz.model.BaseCollection.extend(
  model: sz.model.Artist
  options:
    slug: null
    limit: 8

  initialize: (a) ->
    _.extend @options, a or {}
    @reset()

  parse: (a, b) ->
    a.artists.splice 0, @options.limit

  url: ->
    throw "slug cannot be null"  if @options.slug is null
    "/api/artists/" + @options.slug + "/similar/?limit=" + @options.limit
)
sz.model.ArtistActivities = sz.model.BaseCollection.extend(
  model: sz.model.Activity
  slug: null
  url: ->
    throw "slug cannot be null"  unless @slug?
    "/api/activity/artist/" + @slug + "/"
)
sz.model.UserActivities = sz.model.BaseCollection.extend(
  model: sz.model.Activity
  username: null
  url: ->
    throw "User cannot be null"  unless @username?
    "/api/users/" + @username + "/activities/"
)
sz.app.data.Artist = new sz.model.Artist()
sz.app.data.ArtistActivities = new sz.model.ArtistActivities()
sz.app.data.UserActivities = new sz.model.UserActivities()
sz.model.Account = sz.model.BaseModel.extend(url: "/api/1.0/account/")
sz.model.Accounts = sz.model.BaseCollection.extend(
  model: sz.model.Account
  url: "/api/1.0/account/"
)
sz.app.data.Accounts = new sz.model.Accounts()
sz.model.AccountsLogout = sz.model.BaseModel.extend(url: "/api/accounts/logout/")
sz.app.data.AccountsLogout = new sz.model.AccountsLogout()
sz.model.AccountSetting = sz.model.BaseModel.extend(defaults:
  key: `undefined`
  value: `undefined`
)
sz.model.AccountSettings = sz.model.BaseCollection.extend(
  model: sz.model.AccountSetting
  url: "/api/1.0/account/settings/"
  getByKey: (a) ->
    b = @filter((c) ->
      c.get("key") is a
    )
    if b[0]
      unless b[0]._url
        b[0]._url = b[0].url
        b[0].url = ->
          b[0]._url() + "/"
      return b[0]
    `undefined`

  getValue: (a) ->
    b = @getByKey(a)
    (if b.get then b.get("value") else `undefined`)

  absoluteValues: ->
    a = {}
    @each (c) ->
      d = c.toJSON()
      b = {}
      b[d.key] = d.value
      _.extend a, b

    a
)
sz.app.data.AccountSettings = new sz.model.AccountSettings()
(->
  a = Object::hasOwnProperty
  b = (f, d) ->
    e = ->
      @constructor = f
    for c of d
      f[c] = d[c]  if a.call(d, c)
    e:: = d::
    f:: = new e
    f.__super__ = d::
    f

  sz.model.EditorialPage = ((c) ->
    d = ->
      d.__super__.constructor.apply this, arguments
    b d, c
    d::defaults =
      id: null
      background_image: ""
      background_link: ""
      category: ""
      html_template: ""
      locale: ""
      page_url: ""
      resource_uri: ""
      sub_category: ""
      title: ""

    d::url = ->
      e = undefined
      e = @get("id")
      "/api/1.0/editorialpages/" + e + "/?format=json"

    d
  )(sz.model.BaseModel)
  sz.model.EditorialPages = ((d) ->
    c = ->
      c.__super__.constructor.apply this, arguments
    b c, d
    c::model = sz.model.EditorialPage
    c::url = ->
      e = undefined
      e = (if window.website_code then "&website_code=" + window.website_code else "")
      "/api/1.0/editorialpages/?format=json" + e

    c
  )(sz.model.BaseCollection)
  window.sz.app.data.EditorialPages = new sz.model.EditorialPages()
).call this
sz.model.Friend = sz.model.BaseModel.extend(
  defaults:
    name: ""
    avatar: ""
    current_station: ""
    current_station_slug: ""
    online_presence: ""
    is_favorite: false
    is_user: false
    inviteable: true

  initialize: ->
    c = this
    b = undefined
    a = ->
      @trigger "change"

    @inviteAvailable = false
    @inviteCollection = sz.app.data.UninvitedFriendList
    @inviteCollection.bind "reset", ->
      d = c.invite
      return  if @get("is_user")
      b = c.inviteCollection.get(c.id)
      if b
        c.set inviteable: true
        b.bind "change:invited", a, c
        c.inviteAvailable = true
      else
        c.inviteAvailable = false
      c.trigger "change"  if c.inviteAvailable isnt d

  profile: ->
    "/user/" + @get("id") + "/"

  toggleFavorite: (a) ->
    @save
      is_favorite: @get("is_favorite")
    , a

  canInvite: ->
    return false  if @get("is_user") or @isInvited() or not @get("inviteable")
    true

  isInvited: ->
    a = @inviteCollection.get(@id)
    return false  if @get("is_user")
    a and a.get("invited") or false

  invite: ->
    a = this
    b = @inviteCollection.get(@id)
    a.trigger "change"
    b.save(invited: true).success ->
      sz.app.ui.Chat.sendInvitation a.id

    b

  toJSON: ->
    a = _.clone(@attributes)
    a.online_presence = ""  unless sz.app.ui.Chat.connected()
    switch a.online_presence
      when "active"
        a.online_presence = "online"
      when "idle"
        a.online_presence = "away"
    a.canInvite = @canInvite()
    a.isInvited = @isInvited()
    a
)
sz.model.FriendList = sz.model.BaseCollection.extend(
  model: sz.model.Friend
  url: "/api/friends/facebook/"
  update: (a, b) ->
    a = a or {}
    b = b or []
    d = this
    c = a.success
    a.success = (m, f, l) ->
      j = false
      h = []
      e = []
      g = ->
        @unbind "change", g
        j = true

      _(d.parse(m, l)).each (q) ->
        o = d.get(q.id)
        n = {}
        p = undefined
        r = {}
        unless o
          d.add q, a
          j = true
          h.push q.id
        else
          if b.length
            for p of q
              continue  if b.indexOf(p) isnt -1
              r[p] = q[p]
              delete q[p]
          o.set r
          o.bind "change", g
          o.set q
          o.unbind "change", g
          h.push o.id

      if d.length isnt h.length
        e = d.filter((n) ->
          h.indexOf(n.id) is -1
        )
      if e.length
        j = true
        d.remove e, a
      d.trigger "changed", d, a  if not a.silent and j
      c d, m  if c

    (@sync or Backbone.sync).call this, "read", this, a

  filterByOnline: ->
    a = new sz.model.FriendList(@filter((b) ->
      b.get("online_presence") isnt "offline"
    ))
    a.each (b) ->
      b.unbind "all", a._onModelEvent

    a

  filterByFavorite: ->
    a = new sz.model.FriendList(@filter((b) ->
      b.get "is_favorite"
    ))
    a.each (b) ->
      b.unbind "all", a._onModelEvent

    a

  orderByOnline: ->
    @sortBy (a) ->
      [ a.get("online_presence"), a.get("current_station") is "", a.get("name") ]

  orderByFavorite: ->
    @sortBy (a) ->
      [ a.get("online_presence"), a.get("current_station") is "", a.get("is_favorite"), a.get("name") ]

  orderByName: ->
    @sortBy (a) ->
      a.get "name"
)
sz.app.data.FriendList = new sz.model.FriendList()
sz.model.User = sz.model.BaseModel.extend(
  defaults:
    name: ""
    username: ""
    location: ""
    avatar: ""
    stations_count: ""
    stations_shared_count: ""
    subscriptions_count: ""
    favourites_count: ""
    facebook_profile_url: ""

  username: null
  url: ->
    throw "username cannot be null"  if @username is null
    "/api/1.0/users/" + @username + "/"

  fetch: (b) ->
    a = this
    b or (b = success: (c, d) ->
      a.trigger "reset", c
    )
    Backbone.Model::fetch.call this, b
)
sz.app.data.User = new sz.model.User()
sz.model.Track = sz.model.BaseModel.extend(
  station: null
  action: "next"
  playDuration: null
  id: null
  defaults:
    station: ""
    title: ""
    album: ""
    artist: ""
    artist_slug: ""
    url: ""
    username: ""
    like: null

  track_sleeveart_large: ->
    @get("track_sleeveart").replace /\_50\.jpg$/, "_100.jpg"

  url: ->
    throw "Station cannot be null"  if @station is null
    if @get("like") isnt null
      (if "/api/stations/" + @station + "/" + @get("like") then "like" else "dislike/" + @id + "/")
    else
      if @playDuration
        "/api/stations/" + @station + "/next/?action=" + @action + "&duration=" + @playDuration
      else
        "/api/stations/" + @station + "/next/?action=" + @action
)
sz.model.TrackHistory = sz.model.BaseCollection.extend(
  model: sz.model.Track
  localStorage: new Store("trackhistory")
)
sz.app.data.TrackHistory = new sz.model.TrackHistory()
sz.model.UninvitedFriend = sz.model.BaseModel.extend(defaults:
  id: ""
  facebook_id: ""
  name: ""
  avatar: ""
  invited: false
)
sz.model.UninvitedFriendList = sz.model.BaseCollection.extend(
  model: sz.model.UninvitedFriend
  url: "/api/invitation/uninvited_friends"
)
sz.app.data.UninvitedFriendList = new sz.model.UninvitedFriendList()
(->
  a = Object::hasOwnProperty
  b = (f, d) ->
    e = ->
      @constructor = f
    for c of d
      f[c] = d[c]  if a.call(d, c)
    e:: = d::
    f:: = new e
    f.__super__ = d::
    f

  sz.model.Place = ((c) ->
    d = ->
      d.__super__.constructor.apply this, arguments
    b d, c
    d::defaults =
      id: ""
      name: ""
      artists: []
      weeklyArtists: []
      dailyArtists: []
      lastCheckinDate: null

    d::url = ->
      e = undefined
      e = @get("id")
      "/api/1.0/places/" + e + "/?format=json"

    d
  )(sz.model.BaseModel)
).call this
sz.model.BrowseRecommended = sz.model.BaseCollection.extend(
  model: sz.model.Artist
  url: ->
    "/api/artists/recommended/"
)
sz.ui.Message = Backbone.View.extend(
  el: "#modal"
  template: _.template($("#modal-message-template").html())
  events:
    "click .message-close": "destroy"

  options:
    open: ->

    closable: true

  initialize: ->
    _.bindAll this, "destroy"

  render: ->
    b = @template(
      title: @options.title
      message: @options.message
      closable: @options.closable
    )
    $(@el).empty().html(b).show()
    _.bind(@options.open, this)()
    c = $(@el).find(".message-buttons")
    for a of @options.buttons
      e = @options.buttons[a]
      d = $("<a></a>")
      d.attr "href", "#"
      d.text a
      d.click e
      $(c).append d
    this

  destroy: ->
    $(@el).empty().hide()
    false
)
sz.ui.modals.CreatingStation = sz.ui.Message.extend(options:
  title: _lc("create-station.loading.popup.title")
  message: _lc("create-station.loading.popup.txt")
  closable: false
  open: ->
    @model.createStation().success((a) ->
      sz.ui.Message.closeAll()
      location.href = "#/stations/" + a.station_id + "/play/"
    ).error ->
      sz.ui.Message.closeAll()
      new sz.ui.Message(
        title: _lc("create-station.loading.popup.error.title")
        message: _lc("create-station.loading.popup.error.txt")
      ).render()
)
sz.ui.modals.GeneralError = sz.ui.Message.extend(options:
  title: _lc("popup.error.title")
  message: _lc("popup.error.text")
  closable: true
  open: ->
    _.delay @destroy, 8000
)
sz.ui.modals.InvalidTokenFound = sz.ui.Message.extend(
  options:
    title: _lc("popup.error.title")
    message: _lc("popup.error.invalid-token")
    closable: false
    open: ->

  initialize: ->
    @options.buttons = {}
    @options.buttons[_lc("popup.button.ok")] = ->
      $.get "/api/accounts/logout", ->
        window.location.reload()

      false
)
sz.ui.Message.closeAll = ->
  $("#modal").empty().hide()

sz.ui.FriendListItem = Backbone.View.extend(
  tagName: "li"
  template: _.template($("#friend-item-template").html())
  events:
    "click .favorite": "toggleFavorite"
    "click .profile-image > img": "chat"
    "click .chat": "chat"
    "click .invite-button": "invite"

  initialize: ->
    _.bindAll this, "render", "invite"
    @model.bind "change", @render
    @model.view = this

  render: ->
    a = $(@el)
    a.html @template(@model.toJSON())
    this

  invite: ->
    @model.invite()
    @$(".invite-button").hide()
    @$(".invite-sent").show()
    _kmq.push [ "record", "Invited Friend" ]

  chat: ->
    sz.app.ui.Chat.showChatBox @model, true
    false

  toggleFavorite: (b) ->
    a = @model
    @$(".favorite").toggleClass "active"
    a.toggleFavorite(silent: true).success ->
      a.collection.trigger "change:is_favorite", a
      _kmq.push [ "record", "Favorited Friend" ]

    b.stopPropagation()
    false

  remove: ->
    @model.unbind "change", @render
    @model.unbind "change:has_invites", @updateInvitation
    Backbone.View::remove.call this
)
sz.ui.FriendList = Backbone.View.extend(
  template: _.template($("#friends-list-template").html())
  filterOnline: true
  filterFavorite: false
  events:
    "click h3": "helpAnchor"
    "click a.online": "filterByOnline"
    "click a.all": "showAll"
    "click a.favorite": "filterByFavorite"
    "click a#friends-pane-toggle": "toggleFriends"
    "click #chat-toggle a": "toggleChatStatus"
    "keyup input": "filterFriends"
    "keypress input": "filterFriends"

  helpAnchor: (a) ->
    $(a.currentTarget).children("a").click()

  filterByOnline: ->
    @filterOnline = true
    @filterFavorite = false
    @filterFriends()
    @$(".list > .wrapper").animate
      scrollTop: 0
    , "slow"
    @$("h3").removeClass("active").children("a.online").parent().addClass "active"
    false

  showAll: ->
    @filterOnline = false
    @filterFavorite = false
    @filterFriends()
    @$(".list > .wrapper").animate
      scrollTop: 0
    , "slow"
    @$("h3").removeClass("active").children("a.all").parent().addClass "active"
    false

  filterByFavorite: ->
    @filterOnline = false
    @filterFavorite = true
    @filterFriends()
    @$(".list > .wrapper").animate
      scrollTop: 0
    , "slow"
    @$("h3").removeClass("active").children("a.favorite").parent().addClass "active"
    false

  toggleFriends: ->
    $(@el).toggleClass "open"
    $("#content-scroll").toggleClass("open").trigger "resize"
    @sizeFriendsList()
    false

  initialize: ->
    a = this
    _.bindAll this, "render", "renderFriends", "filterFriends", "renderFriend", "updateFavorite", "updateOnlineStatus", "sizeFriendsList"
    @connectingAnimation = null
    @friendItems = []
    @chat = sz.app.ui.Chat
    @collection = sz.app.data.FriendList
    @rendered = false
    @collection.on "reset", @filterFriends
    @collection.on "changed", @filterFriends
    @collection.on "change:is_favorite", @updateFavorite
    @chat.on "connected", @updateOnlineStatus, this
    @chat.on "connecting", @updateOnlineStatus, this
    @chat.on "disconnected", @updateOnlineStatus, this
    $(window).on "resize", @sizeFriendsList

  sizeFriendsList: ->
    a = @$(".list").height()
    b = @$(".list > .wrapper")
    b.height a
    b.trigger "scroll"

  render: ->
    $(@el).html @template()
    @updateOnlineStatus false
    @$(".list > .wrapper").innerscroll
      destination: @$(".list")
      draggable: true

    @$(".list").children(":not([class=wrapper])").addClass "scrollbar"
    @sizeFriendsList()
    this

  renderFriend: (c) ->
    a = new sz.ui.FriendListItem(model: c)
    b = $(a.render().el)
    @$(".list > .wrapper > ul").append b
    @friendItems.push a

  renderFriends: (b) ->
    c = $(@el)
    a = []
    d = _.after(a.lenth, @sizeFriendsList)
    if not @rendered and @collection.filterByOnline().length is 0
      @rendered = true
      if @collection.filterByFavorite().length
        @filterByFavorite()
      else
        @showAll()
    b = b or null
    _.each @friendItems, (e) ->
      e.remove()

    @friendItems = []
    if @filterOnline
      a = @collection.filterByOnline().orderByOnline()
    else
      if @filterFavorite
        a = @collection.filterByFavorite().orderByFavorite()
      else
        a = @collection.orderByName()
    if b and typeof (b) is "string"
      a = _(a).filter((e) ->
        f = e.get("name").toLowerCase()
        f.indexOf(b.toLowerCase()) isnt -1
      )
    _.each a, @renderFriend
    @sizeFriendsList()

  updateFavorite: (b) ->
    return  unless @filterFavorite
    c = $(b.view.el)
    a = this
    c.fadeOut "slow", ->
      a.filterFriends()

  filterFriends: (b) ->
    return  unless @el
    a = @$("input").val()
    if b and b.type is "keyup" and b.keyCode is 27
      a = ""
      @$("input").val ""
    @renderFriends a

  toggleChatStatus: ->
    if @chat.connected() or @chat.connecting
      @chat.disconnect()
      _kmq.push [ "record", "Chat: Clicked Disconnect" ]
    else
      @chat.connect true
      _kmq.push [ "record", "Chat: Clicked Connect" ]
    false

  updateOnlineStatus: (c) ->
    a = @$("#chat-toggle a")
    b = undefined
    d = undefined
    c = (if c isnt `undefined` then c else true)
    @filterFriends()  if c
    a.hide()
    if @chat.connecting
      clearTimeout @connectingAnimation
      @connectingAnimation = setTimeout(@updateOnlineStatus, 300, false)
      b = a.filter(".connecting")
      d = b.show().hasClass("on")
      if d
        b.removeClass("on").addClass "off"
      else
        b.removeClass("off").addClass "on"
    else
      if @chat.connected()
        a.filter(".on:not(.connecting)").show()
      else
        a.filter(".off:not(.connecting)").show()
)
sz.ui.Player = Backbone.View.extend(
  id: "footer-container"
  template: _.template($("#player-template").html())
  detailTemplate: _.template($("#station-player-template").html())
  isStationOwner: false
  ready: false
  volumeChangeChunk: 0.1
  volumePopupID: "#volume-popup"
  volumePopupDisappearDelay: 1000
  _volumePopupDisappearEvent: null
  events:
    "click .volume-up": "volumeUp"
    "click .volume-down": "volumeDown"
    "click .player-skip": "forward"
    "click .favorite": "favorite"
    "click .share": "doShare"

  initialize: ->
    a = this
    b = false
    _.bindAll this, "render", "forward", "playStation", "updateVolumePopup"
    @model = sz.app.data.Station
    @model.bind "change", @updateStationBox, this
    $(":input").live("focus", ->
      b = true
    ).live "blur", ->
      b = false

    $(document).keypress (c) ->
      return  if b
      if c.which is 187 or c.which is 61
        a.volumeUp()
      else
        if c.which is 189 or c.which is 45
          a.volumeDown()
        else
          a.playPause()  if c.which is 32

  render: ->
    @volume = sz.app.settings.get("volume")
    $(@el).html @template(station: @model)
    @buildPlayer()
    this

  updateStationBox: (a) ->
    if not a or not a.get("meta")
      @$(".stopped").show()
      return
    @$(".stopped").hide()
    @$(".station").html @detailTemplate(a)

  updateVolumePopup: ->
    clearTimeout @_volumePopupDisappearEvent  if @_volumePopupDisappearEvent
    g = $(@volumePopupID + " div.tick").removeClass("active")
    c = @volume
    h = g.splice(0, c * 10)
    $(h).addClass "active"
    e = $(@volumePopupID + " #volume-icon")
    b = c * 100
    d = "volume-100"
    if b < 1
      d = "volume-0"
    else
      if b <= 33
        d = "volume-33"
      else
        d = "volume-66"  if b <= 66
    e.removeClass()
    e.addClass d
    $(@volumePopupID).stop().removeAttr("style").show()
    a = this
    @_volumePopupDisappearEvent = setTimeout(f = ->
      $(a.volumePopupID).fadeOut()
    , a.volumePopupDisappearDelay)

  buildPlayer: ->
    a = this
    @$("#jplayer").jPlayer
      cssSelectorAncestor: "#player-container"
      swfPath: "/static/js/lib"
      supplied: "mp3"
      solution: "flash, html"
      preload: "auto"
      volume: a.volume
      ready: ->
        a.ready = true
        a.trigger "ready"

      play: (b) ->
        a.$(".player-pause").show()
        a.$(".player-play").hide()

      pause: (b) ->
        a.$(".player-play").show()
        a.$(".player-pause").hide()

      ended: ->
        a.getNextTrack "next"
        _kmq.push [ "record", "Track Played Full",
          station_id: a.model.id
         ]

      error: ->
        $(this).jPlayer "clearMedia"
        _kmq.push [ "record", "Track Error",
          station_id: a.model.id
         ]
        a.getNextTrack "error"

    a.$(".jp-seek-bar").unbind "click"
    a.$(".jp-play-bar").unbind "click"

  volumeUp: ->
    @volume += @volumeChangeChunk
    @volume = 1  if @volume > 1
    @$("#jplayer").jPlayer "volume", @volume
    sz.app.settings.set "volume", @volume
    @updateVolumePopup()
    false

  volumeDown: ->
    @volume -= @volumeChangeChunk
    @volume = 0  if @volume < 0
    @$("#jplayer").jPlayer "volume", @volume
    sz.app.settings.set "volume", @volume
    @updateVolumePopup()
    false

  playPause: ->
    a = @$("#jplayer")
    if a.length
      if a.data("jPlayer").status.paused
        a.jPlayer "play"
      else
        a.jPlayer "pause"

  stopStation: (a) ->
    return  if arguments.length is 1 and a isnt @model.id
    @$(".stopped").show()
    @$("#jplayer").jPlayer("stop").jPlayer "clearMedia"
    @model.clear()
    @trigger "stopped"

  playStation: (a) ->
    @$(".stopped").hide()
    @getNextTrack "first"
    @trigger "playing"
    _kmq.push [ "record", "Played Station" ]

  getPlayDuration: ->
    a = 0
    c = 0
    b = @$(".jp-current-time").html()
    b = b.split(":")
    a = parseInt(b[0], 10) * 60
    c = parseInt(b[1], 10)
    a + c

  getNextTrack: (d) ->
    c = this
    a = @getPlayDuration()
    b = new sz.model.Track()
    b.action = d
    b.playDuration = a
    b.station = @model.id
    b.fetch
      success: (e, f) ->
        c.handleNext e, f

      error: (e, f) ->
        c.handleError e, f

  handleNext: (b, g) ->
    f = b.toJSON()
    c = @$("#jplayer")
    e = f.duration
    a = Math.floor(e / 60)
    d = e - (a * 60)
    d = (if (d <= 9) then "0" + d else d)
    formattedDuration = (if a <= 9 then "0" else "") + a + ":" + d
    $("#duration").text formattedDuration
    $(c).jPlayer "setMedia",
      mp3: b.get("url")

    $(c).jPlayer "play"
    sz.app.data.TrackHistory.get(b.id).destroy()  if sz.app.data.TrackHistory.get(b.id)
    sz.app.data.TrackHistory.add b
    sz.app.ui.StationInfo.updateStationInfoTrackImage b.toJSON()

  handleError: (b, c) ->
    a = undefined
    switch c.status
      when 406
        message = window.tokens["player.error-message.skip-limit"]
        _kmq.push [ "record", "Skip Limit Reached" ]
      when 404
        message = window.tokens["player.error-message.no-tracks-found"]
      else
        message = window.tokens["player.error-message.default"]
    new sz.ui.Message(
      title: "Error"
      message: message
      closable: false
      open: ->
        setTimeout (->
          sz.ui.Message.closeAll()
        ), 3000
    ).render()

  forward: ->
    @getNextTrack "next"
    _kmq.push [ "record", "Track Skipped",
      station_id: @model.id
     ]
    false

  favorite: ->
    @model.toggleFavorite()
    false

  doShare: ->
    @model.share()
    false
)
sz.ui.UserNavigation = Backbone.View.extend(
  template: _.template($("#user-navigation-template").html())
  initialize: ->
    _.bindAll this, "render", "setSelected"
    sz.app.data.Accounts.bind "reset", @render

  render: ->
    a = sz.app.data.Accounts.at(0).toJSON()
    $(@el).html @template(a)
    @setSelected()
    this

  setSelected: ->
    b = @$("a:not(.extra-item)").removeClass("active")
    a = window.location.hash
    c = [
      url: /^#\/featured\/popular\/$/
      replaceWith: null
    ,
      url: /^#\/featured\/activity\/$/
      replaceWith: null
    ,
      url: /^#\/featured\/map\/$/
      replaceWith: null
    ,
      url: /^#\/mtv\/$/
      replaceWith: null
    ,
      url: /^#\/featured\/activity\/$/
      replaceWith: null
    ,
      url: /^#\/users\/[^\/]+\/stations\/$/
      replaceWith: null
    ,
      url: /^#\/users\/[^\/]+\/favourites\/$/
      replaceWith: null
    ,
      url: /^#\/users\/[^\/]+\/activities\/$/
      replaceWith: null
    ,
      url: /^#\/users\/[^\/]+\/recommendations\/$/
      replaceWith: null
    ,
      url: /^#\/station\/create\/$/
      replaceWith: null
    ,
      url: /^#\/accounts\/info\/$/
      replaceWith: null
     ]
    _.every c, (e) ->
      d = a.match(e.url)
      return true  if d is null
      a = a.replace(d[1], e.replaceWith)  if d.length is 2
      b.filter(->
        $(this).attr("href") is a
      ).addClass "active"
      false
)
sz.ui.UserProfile = Backbone.View.extend(
  className: "content-box-full"
  template: _.template($("#user-profile-template").html())
  initialize: ->
    _.bindAll this, "render", "setSelected"

  render: (b) ->
    a = sz.app.data.User.toJSON()
    a.is_my_profile = sz.isMyProfile()
    a.type = b
    $(@el).html @template(a)
    @setSelected()
    this

  setSelected: ->
    a = window.location.hash.replace(/^(\#\/|\#)/, "#/")
    @$(".content-filter").find("a[href$='" + a + "']").addClass "active"
)
sz.ui.UserProfileAccount = Backbone.View.extend(
  events:
    "click #disable-account": "disableAccount"
    "click input": "toggleSettings"
    "change #language-selector": "changeLanguage"

  template: _.template($("#user-profile-account-template").html())
  initialize: ->
    _.bindAll this, "render"
    sz.app.data.Accounts.bind "reset", @render
    sz.app.data.AccountSettings.getByKey("facebook_enable_chat").bind "change:value", @toggleChat, this

  changeLanguage: ->
    $("#user-language-selector-form input[name=\"next\"]").val location.hash
    $("#user-language-selector-form").submit()

  render: ->
    a = sz.app.data.Accounts.at(0).toJSON()
    a.settings = sz.app.data.AccountSettings.absoluteValues()
    $(@el).html @template(a)
    _kmq.push [ "record", "Viewed User Profile: Accounts page" ]
    this

  toggleChat: (a, b) ->
    if b
      @$("#facebook_enable_chat").attr "checked", "checked"
      _kmq.push [ "record", "Chat: Clicked Connect" ]
    else
      @$("#facebook_enable_chat").removeAttr "checked"
      _kmq.push [ "record", "Chat: Clicked Disconnect" ]

  toggleSettings: (b) ->
    a = $(b.currentTarget)
    sz.app.data.AccountSettings.getByKey(a.attr("id")).save value: a.is(":checked")

  disableAccount: ->
    a = _lc("user.account.disable.button")
    b = _lc("user.account.cancel.button")
    c = {}
    c[a] = ->
      sz.app.data.Accounts.at(0).save(is_active: false).success ->
        _kmq.push [ "record", "canceled",
          reason: "no reason option"
         ]
        location.href = "/logout/"

    c[b] = ->
      sz.ui.Message.closeAll()

    new sz.ui.Message(
      title: "Disable Account"
      message: window.tokens["user.account.disable.confirmation.message"]
      buttons: c
    ).render()
    false
)
sz.ui.FeaturedPopular = Backbone.View.extend(
  tagName: "div"
  id: "content-box"
  template: _.template($("#featured-popular-template").html())
  emptyTemplate: _.template($("#featured-popular-empty-template").html())
  type: "website"
  events:
    "click .content-filter a": "changeSelect"

  initialize: ->
    _.bindAll this, "render", "renderPopular", "changeSelect"

  render: ->
    $(@el).html @template({})
    @renderPopular()
    _kmq.push [ "record", "Viewed Popular page" ]
    this

  renderPopular: ->
    a = this
    a.$(".stations-grid,#blank-slate").remove()
    a.$("#content-body").append "<ul class=\"stations-grid\"></ul>"
    b = a.$(".stations-grid")
    sz.app.data.Populars.type = @type
    sz.app.data.Populars.fetch success: (c, e) ->
      d = sz.app.data.Populars
      if d.length is 0
        a.$("#content-body").append a.emptyTemplate(type: a.type)
        return false
      d.each (f) ->
        stationItem = new sz.ui.StationGridItem(model: f)
        b.append stationItem.render().el

      a.$(".stations-grid").masonry
        itemSelector: "li"
        columnWidth: 152
        isFitWidth: true
        gutterWidth: 25

      $("#content").trigger "rendered"

  changeSelect: (c) ->
    a = $(c.target)
    b = a.attr("rel")
    @$(".content-filter a").removeClass "active"
    a.addClass "active"
    @type = b
    @renderPopular()
    false
)
sz.ui.ActivityItem = Backbone.View.extend(
  regularTemplate: _.template($("#activity-item-template").html())
  artistTemplate: _.template($("#artist-page-activity-item").html())
  className: "activity"
  initialize: (a) ->
    @artist = a.artist

  render: ->
    a = @regularTemplate
    a = @artistTemplate  if @artist
    b = @model.toJSON()
    c = a(b)
    $(@el).addClass((if @options.odd then "light" else "dark")).html(c).html()
    this
)
sz.ui.ActivityFeed = Backbone.View.extend(
  template: _.template($("#activity-feed-template").html())
  emptyTemplate: _.template($("#activity-feed-empty-template").html())
  friendMode: true
  events:
    "click .content-filter a": "changeSelect"

  initialize: ->
    _.bindAll this, "render", "activity", "changeSelect"

  render: ->
    $(@el).html @template({})
    _kmq.push [ "record", "Viewed Activity Feed page" ]
    @renderActivities()

  renderActivities: ->
    b = undefined
    a = this
    if @friendMode
      b = sz.app.data.MyFriendsActivities
    else
      b = sz.app.data.GlobalActivities
    b.fetch().success ->
      a.$("#content-body").empty()
      if b.length
        b.each a.activity
      else
        a.$("#content-body").html a.emptyTemplate(friendMode: a.friendMode)
        $("#content-scroll").addClass "full-screen"
      $("#content").trigger "rendered"

    this

  activity: (b, a) ->
    c = new sz.ui.ActivityItem(
      model: b
      odd: (a % 2 is 0)
    )
    @$("#content-body").append c.render().el

  changeSelect: (c) ->
    a = $(c.target)
    b = a.attr("rel")
    @$(".content-filter a").removeClass "active"
    a.addClass "active"
    @friendMode = b is "friend"
    @renderActivities()
    false
)
sz.ui.MyActivity = Backbone.View.extend(
  emptyTemplate: _.template($("#activities-blank-slate-template").html())
  id: "content-body"
  initialize: ->
    _.bindAll this, "render", "activity"

  render: (a) ->
    c = @messagesTemplate
    d =
      name: @options.name or sz.app.data.User.get("name")
      myGrid: @options.myActivity

    if @collection.length is 0
      $("#content-scroll").addClass "full-screen"  unless a
      $(@el).append @emptyTemplate(d)
      return this
    b = this
    @collection.each (f, e) ->
      b.activity f, e, a

    $("#content").trigger "rendered"
    this

  activity: (c, b, a) ->
    d = "div"
    e = "activity"
    if a
      d = "li"
      e = c.toJSON().typeClass
    f = new sz.ui.ActivityItem(
      artist: a
      model: c
      tagName: d
      className: e
      odd: (b % 2 is 0)
    )
    $(@el).append f.render().el
)
sz.ui.StationGrid = Backbone.View.extend(
  id: "content-body"
  tagName: "div"
  template: _.template($("#station-grid-template").html())
  emptyTemplate: _.template($("#stations-blank-slate-template").html())
  stationList: null
  type: "stations"
  ownerUsername: null
  myUsername: null
  isMyGrid: false
  rendered: false
  initialize: ->
    _.bindAll this, "render", "renderStationList", "renderStation"

  render: ->
    a = sz.app.data.Accounts.at(0)
    @myUsername = a.get("username")
    @ownerUsername = sz.app.data.User.username
    @isMyGrid = (@myUsername is @ownerUsername)
    unless @rendered
      @stationList.fetch()
      @rendered = true
    @$el.html ""
    this

  renderStation: (d) ->
    c = new sz.ui.StationGridItem(
      model: d
      type: @type
    )
    b = (@myUsername isnt null and @myUsername is d.get("user_username"))
    a = (@myUsername isnt null and @myUsername is @ownerUsername)
    c.myUsername = @myUsername
    c.isMyStation = b
    c.isMyGrid = a
    $(@el).find("ul").append c.render().el

  renderStationList: ->
    a =
      name: sz.app.data.User.get("name")
      myGrid: (@myUsername isnt null and @myUsername is @ownerUsername)
      type: @type

    if @stationList isnt null and @stationList.length isnt 0
      $(@el).html @template()
      @stationList.each @renderStation
    else
      $("#content-scroll").addClass "full-screen"
      $(@el).html @emptyTemplate(a)
    $(".stations-grid").masonry
      itemSelector: "li"
      columnWidth: 152
      isFitWidth: true
      gutterWidth: 25

    $("#content").trigger "rendered"
)
sz.ui.StationGridItem = Backbone.View.extend(
  tagName: "li"
  options:
    type: "stations"

  myUsername: ""
  isMyGrid: false
  isMyStation: false
  isFavourited: false
  isSubscribed: false
  recommendationTemplate: _.template($("#recommended-station-grid-item-template").html())
  template: _.template($("#station-grid-item-template").html())
  events:
    "click .share": "share"
    "click .delete": "deleteItem"
    "click .favorite": "favorite"
    "click .station-create": "createStation"

  initialize: ->
    _.bindAll this, "render", "deleteItem", "favorite", "share", "createStation"
    @model.bind "change", @render

  createStation: ->
    new sz.ui.modals.CreatingStation(model: @model).render()
    false

  deleteItem: ->
    return  unless @isMyStation
    a = this
    d = a.model.get("id")
    c = new sz.model.Station(id: d)
    b = sz.app.data.User.get("stations_count")
    e = sz.app.data.User.get("favourites_count")
    new sz.ui.Message(
      title: window.tokens["station.delete.message-title"]
      message: window.tokens["station.delete.message-body"]
      closable: true
      buttons:
        Delete: ->
          c.destroy().success ->
            sz.app.ui.StationGrid.stationList.fetch()
            if a.isMyGrid
              --b
              sz.app.data.User.set stations_count: b
              if a.model.isFavorited()
                --e
                sz.app.data.User.set favourites_count: e
              sz.app.ui.Player.stopStation d
            sz.ui.Message.closeAll()
            _kmq.push [ "record", "Deleted Station" ]

          false

        Cancel: ->
          sz.ui.Message.closeAll()
          false
    ).render()
    false

  share: ->
    @model.share()
    false

  favorite: ->
    c = @$(".favorite")
    b = @model.isFavorited()
    a = this
    @model.toggleFavorite().success(->
      if b
        $(c).removeClass "active"
      else
        $(c).addClass "active"
    ).error ->
      new sz.ui.modals.GeneralError().render()

    false

  render: ->
    a = @model.toJSON()
    a.type = @options.type
    a.is_my_station = @isMyStation
    a.is_my_grid = @isMyGrid
    if a.user_avatar
      $(@el).html @template(a)
    else
      $(@el).html @recommendationTemplate(a)
    @$("img").error ->
      b = $(this)
      c = b.css("background-image").replace(/^url\(['"]*/, "").replace(/['"]*\)$/, "")
      b.unbind("error").attr "src", c

    this
)
sz.ui.StationCreate = Backbone.View.extend(
  tagName: "div"
  id: "create-station-box"
  template: _.template($("#station-create-template").html())
  events:
    "click button": "create"

  initialize: ->
    _.bindAll this, "render", "create"
    @model = null

  fillInCopyrightBox: (a) ->
    d = @$("#copyright-box")
    b = $("<img>").attr("alt", "Copyright")
    c = $("<a>").attr("target", "_blank")
    if a.source_logo isnt ""
      b.attr "src", a.source_logo
      $(d).append b
    if a.owner_url and a.owner
      c.attr(
        href: a.owner_url
        title: a.owner
      ).text a.owner
      $(d).append c

  fillInCreateStationBackground: (b) ->
    c = @$("#create-station-background")
    a = c.find("img")
    $(a).attr "src", b.image_full
    new sz.ui.ResizedImage(@$(a), @$(c), b.width, b.height)

  render: ->
    a = this
    $("#content-scroll").addClass "full-screen"
    $(@el).html @template()
    $.ajax
      url: "/api/stations/random-image/"
      async: false
      success: (b) ->
        a.fillInCreateStationBackground b
        a.fillInCopyrightBox b

    $.autoHinter
      input: @$("#create-station input:text")
      container: @$(".results")
      formatItem: (b) ->
        if b.type is "ARTIST"
          "<li><strong>" + b.artist + "</strong></li>"
        else
          "<li><strong>" + b.track + "</strong> <span><em>by " + b.artist + "</em></span></li>"

      returnItem: (b) ->
        throw new Error()  unless b
        (if (b.type is "ARTIST") then b.artist else b.track)

      selectItem: (b) ->
        throw new Error()  unless b
        b.name = (if b.type is "ARTIST" then b.artist else b.track) + " Radio"
        a.model = new sz.model.Artist(b)

      createItem: ->
        a.create()

      notMatch: ->
        $("div.results").html a.errorTemplate({})
        @model = null

    @$("#create-station-input input").focus()
    _kmq.push [ "record", "Viewed Create Station page" ]
    this

  create: ->
    new sz.ui.modals.CreatingStation(model: @model).render()  if @model and @model.get("slug")
    false
)
sz.ui.StationInfo = Backbone.View.extend(
  tagName: "div"
  id: "artist-box"
  template: _.template($("#station-info-track-template").html())
  backgroundTemplate: _.template($("#fancy-frame").html())
  prefetchedTracks: []
  events:
    "click .next-song": "nextTrack"

  initialize: ->
    _.bindAll this, "render"

  render: ->
    $(@el).html @template()
    this

  updateStationInfoTrackImage: (b) ->
    e = $("#artist-box")
    f = e.find("#copyright-box")
    a = e.find("#image-box")
    f.find("img, a").remove()
    if b.artist_img_source_logo isnt ""
      f.append $("<img>").attr(
        src: b.artist_img_source_logo
        alt: "Copyright"
      )
      if b.artist_img_copyright_url and b.artist_img_copyright_owner
        f.append $("<a>").attr(
          href: b.artist_img_copyright_url
          target: "_blank"
          title: b.artist_img_copyright_owner
        ).html(b.artist_img_copyright_owner)
    d = @createImage(b)
    a.find("div.fancy-frame.on-bench").remove()
    a.append d
    c = $(d.find("img")[0])
    new sz.ui.ResizedImage(c, c.parent().parent(), c.width(), c.height())
    c.load ->
      oldActive = a.find(".track-background.active")
      if oldActive.length is 0
        d.addClass("active").removeClass("on-deck").show()
      else
        if oldActive.length is 1
          g = oldActive.first()
          unless b.id is g.id
            g.switchClass "active", "on-bench", 500
            d.switchClass "on-deck", "active", 500
            setTimeout (->
              g.remove
              $(".on-deck").remove()
            ), 600

    c.attr "src", b.artist_img_full

  createImage: (b) ->
    a = @backgroundTemplate(
      url: ""
      id: b.id
      classes: "track-background on-deck"
    )
    $ a

  prefetch: ->
    a = this
    a.prefetchedTracks = []
    sz.app.data.StationTrackImages.station_id = sz.app.data.Station.id
    sz.app.data.StationTrackImages.fetch opts = success: (b, c) ->
      _.each c, (e, d) ->
        a.prefetchedTracks[e.id] = a.createImage(e)
        a.prefetchedTracks.push e.id

  nextTrack: ->
    sz.app.ui.Player.forward()
    false
)
sz.ui.ArtistPage = Backbone.View.extend(
  template: _.template($("#artist-page-template").html())
  notFoundTemplate: _.template($("#artist-404-template").html())
  initialize: ->
    _.bindAll this, "render"

  events:
    "click #create-artist-station button": "createStation"

  render: ->
    $(@el).html @template(@model.toJSON())
    _kmq.push [ "record", "Viewed Artist Profile" ]
    this

  createStation: ->
    new sz.ui.modals.CreatingStation(model: @model).render()
    false

  render404: ->
    $(@el).html @notFoundTemplate()
    this
)
sz.ui.ChatBox = Backbone.View.extend(
  template: _.template($("#chat-box").html())
  templateItem: _.template($("#chat-list").html())
  className: "chat-window"
  events:
    "click a.close": "hide"
    "click a.connect": "connect"
    "click a.connect-cancel": "disconnect"
    "click .invite": "invite"
    "click .hideable": "hideMessage"
    "click .messages": "focusTextarea"
    "keyup textarea": "checkSend"
    "keypress textarea": "checkSend"

  initialize: ->
    _.bindAll this, "updateScrollbar"
    @chat = sz.app.ui.Chat
    @model.bind "change:online_presence", @updateOnlineStatus, this
    @chat.bind "connected", @onConnect, this
    @chat.bind "connecting", @onConnecting, this
    @chat.bind "disconnected", @onDisconnect, this

  render: ->
    a = $(@el)
    b = @model.toJSON()
    b.connected = @chat.connected()
    b.connecting = @chat.connecting
    a.html @template(b)
    _kmq.push [ "record", "Clicked Friend to Chat" ]
    this

  updateOnlineStatus: ->
    b = @model.toJSON().online_presence
    a = "status-" + b
    @$(".icon-sprite").removeClass("status-active status-idle status-offline status-").addClass a
    if @chat.connected() and b is "offline"
      @$(".status-user-offline").show()
    else
      @$(".status-user-offline").hide()

  updateScrollbar: ->
    a = @$(".messages")
    b = _.map(a.children(), (c) ->
      $(c).innerHeight()
    )
    a.animate
      scrollTop: _.reduce(b, (d, c) ->
        d + c
      , 0)
    , "slow"

  appendMessage: (e, d) ->
    b = _.template($("#chat-list").html())
    a = new Date()
    c = (e is "Me")
    return  unless $.trim(d)
    e = @model.get("name")  if e isnt "Me"
    @$(".messages").append b(
      from: e
      message: d
      me: c
    )
    @updateScrollbar()

  connect: ->
    @chat.connect true
    false

  disconnect: ->
    @chat.disconnect()
    false

  invite: ->
    @model.invite()
    @$(".action").children().hide().filter(".invited").show()

  _canFocus: ->
    a = @$("textarea")
    a.attr("disabled") isnt "disabled" and @chat.el.find("textarea:focus").not(a).length is 0

  show: (b) ->
    a = this
    b = b or false
    $(@el).css "display", "block"
    @updateOnlineStatus()
    @$("textarea").focus()  if (b and @$("textarea").attr("disabled") isnt "disabled") or @_canFocus()
    setTimeout (->
      a.$(".hideable").fadeOut "slow"
    ), 25000

  hide: ->
    $(@el).fadeOut "fast"
    false

  hideMessage: (a) ->
    $(a.currentTarget).fadeOut "fast"
    @$("textarea").focus()

  focusTextarea: ->
    @$("textarea").focus()

  checkSend: (c) ->
    $(@el).hide()  if c.keyCode is 27
    return true  unless c.keyCode is 13 and not c.shiftKey
    c.preventDefault()
    a = @$("textarea")
    b = $.trim(a.val())
    a.val ""
    if b
      @chat.sendMessage @model.id, b
      @appendMessage "Me", b

  onConnect: ->
    @$(".status").hide()
    @$("textarea").removeAttr("disabled").focus()
    @updateOnlineStatus()

  onConnecting: ->
    @$(".status").hide()
    @$(".status-connecting").show()
    @$("textarea").attr "disabled", "disabled"
    @updateOnlineStatus()

  onDisconnect: ->
    @$(".status").hide()
    @$(".status-offline").show()
    @$("textarea").attr "disabled", "disabled"
    @updateOnlineStatus()
)
sz.ui.Chat = Backbone.View.extend(
  initialize: ->
    a = sz.app.data.AccountSettings.getByKey("facebook_enable_chat")
    @online = a.get("value")
    @connection = null
    @connecting = false
    @chatBoxes = {}
    @el = $("#chats")
    a.bind "change:value", @handleConnection, this
    @connect()
    $(window).unload @disconnect

  handleConnection: (b, a) ->
    return  if @online is a
    @online = a
    if a
      @connect()
    else
      @disconnect()

  connected: ->
    @connection and @connection.connected and not @connecting

  connect: (c) ->
    a = this
    d = (j) ->
      l = j.getAttribute("from")
      h = j.getAttribute("type")
      f = j.getElementsByTagName("body")
      if h is "chat" and f.length > 0
        g = l.split("@")[0].split("-")[1]
        e = f[0]
        a.showChatBox(g).appendMessage g, Strophe.getText(e)
      true

    b = (f, g) ->
      e = Strophe.Status
      if f is e.DISCONNECTED
        a.connecting = false
        a.connection = null
        a.trigger "disconnected"
        a.connect true  if a.online
      else
        if f is e.CONNECTING
          a.connecting = true
          a.trigger "connecting"
        else
          if f is e.CONNECTED
            a.connection.addHandler d, null, "message", null, null, null
            a.connection.send $pres().tree()
            a.connecting = false
            a.trigger "connected"

    c = c or false
    return  if not c and @connection and @connection.connected
    return  if not c and not @online
    @online = true
    sz.app.data.AccountSettings.getByKey("facebook_enable_chat").save value: true
    @connection = new Strophe.Connection("http://chat.senzari.com:5280/http-bind/")  if @connection is null
    @connection.facebookConnect facebook_uid + "@chat.facebook.com/senzari", b, 60, 1

  disconnect: ->
    return  unless @connection
    @connection.disconnect()
    @online = false
    sz.app.data.AccountSettings.getByKey("facebook_enable_chat").save value: false

  sendMessage: (e, d) ->
    a = this
    b = ->
      a.unbind "connect", b
      a.sendMessage e, d

    unless @connected()
      @connect()
      @bind "connected", b
      return
    c = $msg(
      to: "-" + e + "@chat.facebook.com"
      type: "chat"
    ).cnode(Strophe.xmlElement("body", d))
    @connection.send c.tree()

  sendInvitation: (b) ->
    a = _lc("invitation.user.invite.fb-message")
    @sendMessage b, a

  showChatBox: (b, c) ->
    b = sz.app.data.FriendList.get(b.toString())  unless b.id
    a = @chatBoxes[b.id]
    a = @renderChatBox(b)  unless a
    a.show c
    a

  renderChatBox: (b) ->
    c = new sz.ui.ChatBox(model: b)
    a = c.render().el
    @chatBoxes[b.id] = c
    @el.append a
    c
)
(->
  a = undefined
  b = Object::hasOwnProperty
  d = (h, f) ->
    g = ->
      @constructor = h
    for e of f
      h[e] = f[e]  if b.call(f, e)
    g:: = f::
    h:: = new g
    h.__super__ = f::
    h

  c = Array::indexOf or (g) ->
    f = 0
    e = @length

    while f < e
      return f  if f of this and this[f] is g
      f++
    -1

  a = ((f) ->
    e = (g) ->
      h = this
      @latlng_ = g.latlng
      @place_ = g.place
      @map_ = g.map
      @div_ = null
      @setMap @map_
      @boundsChangedListener_ = google.maps.event.addListener(@map_, "bounds_changed", ->
        j = undefined
        j = h.getProjection().fromLatLngToDivPixel(h.latlng_)
        h.div_.css
          left: j.x - 127
          top: j.y - 87 - 41
      )
      this
    d e, f
    e::draw = ->
      j = undefined
      h = undefined
      g = undefined
      unless @div_?
        g = _.template($("#map-popup").html())
        j = $("<div class='map-popup'/>")
        j.html g(place: @place_)
        h = @getProjection().fromLatLngToDivPixel(@latlng_)
        j.css
          left: h.x - 127
          top: h.y - 87 - 41

        @div_ = j

    e::open = ->
      @draw()
      @getPanes().floatPane.appendChild @div_[0]

    e::close = ->
      @remove()

    e::remove = ->
      @div_.remove()  if @div_

    e
  )(google.maps.OverlayView)
  sz.ui.MapSearch =
    OK: "ok"
    ERROR: "error"
    ERROR_LOCATION_NOT_SPECIFIED: "error, location not found"
    ERROR_LOCATION_NOT_FOUND: "error, location not specified"
    ERROR_USER_DENIED: "error, user denied location request"
    ERROR_POSITION_UNAVAILABLE: "error, position unavailable"
    searchPlaces: (e, g) ->
      f = undefined
      f = []
      f

    searchAddress: (e, j) ->
      g = undefined
      f = undefined
      h = this
      f = []
      g = new google.maps.Geocoder()
      g.geocode
        address: e
      , (p, n) ->
        m = undefined
        q = undefined
        o = undefined
        l = undefined
        if n is google.maps.GeocoderStatus.OK and p.length > 0
          q = (r) ->
            s = undefined
            s =
              coords:
                latitude: r.geometry.location.lat()
                longitude: r.geometry.location.lng()

              name: r.formatted_address

            f.push s

          o = 0
          l = p.length

          while o < l
            m = p[o]
            q m
            o++
        j f  if j

    profileLocation: (h) ->
      f = undefined
      e = undefined
      g = undefined
      f = sz.app.data.Accounts.at(0).get("geo_city")
      g = JSON.parse(f)
      e =
        coords:
          latitude: g.latitude
          longitude: g.longitude

        name: "My Location"
        from: "Profile"

      if not g.longitude and not g.latitude
        h null, @ERROR_LOCATION_NOT_SPECIFIED
      else
        h e, @OK

    defaultLocation: (j) ->
      h = undefined
      g = undefined
      e = undefined
      e = this
      h = (m, l) ->
        j m, l

      g =
        maximumAge: 0
        timeout: 5000

      e.profileLocation h  unless navigator.geolocation
      try
        return navigator.geolocation.getCurrentPosition((m) ->
          l = undefined
          l =
            coords:
              latitude: m.coords.latitude
              longitude: m.coords.longitude

            name: "My Location"
            from: "Browser"

          j l, e.OK
        , (l) ->
          e.profileLocation h
        , g)
      catch f
        return e.profileLocation(h)

  sz.ui.LocationDetail = Backbone.View.extend(
    id: "location-detail"
    template: _.template($("#location-detail-template").html())
    options:
      viewType: "all"

    initialize: ->
      _.bindAll this, "prevArtist", "nextArtist", "switchTab", "renderArtist"
      @model.bind "all", @modelChanged, this
      @carouselIndex = 0
      @currentView = "all"
      @viewType = "all"
      @collectionName = "artists"
      @modelLength = 0

    events:
      "click .previous": "prevArtist"
      "click .next": "nextArtist"
      "click #location-detail-filter li": "switchTab"
      "click .location-close": "remove"

    modelChanged: ->
      f = undefined
      e = undefined
      e = (if @model.get("dailyArtists") then "today" else (if @model.get("weeklyArtists") then "weekly" else "all"))
      f = (if e is "today" then "dailyArtists" else (if e is "weekly" then "weeklyArtists" else "artists"))
      @currentView = e
      @viewType = e
      @collectionName = f

    render: ->
      e = undefined
      e = @model.toJSON()
      _.extend e,
        activeTab: @currentView
        viewType: @viewType
        currentArtists: @model.get(@collectionName)
        hasDaily: @viewType is "today"
        hasWeekly: @viewType is "weekly" or @viewType is "today"

      $(@el).html @template(e)
      _.each e.currentArtists, @renderArtist
      @carouselIndex = 0
      @modelLength = e.currentArtists.length
      @renderFacepile()
      _kmq.push [ "record", "Viewed Location detail layer" ]
      this

    renderArtist: (g) ->
      e = undefined
      f = undefined
      g.image = g.thumbnail
      e = new sz.model.Artist(g)
      f = new sz.ui.StationGridItem(model: e)
      @$(".artist-carousel > ul").append f.render().el

    nextArtist: ->
      e = undefined
      return false  if @carouselIndex > (@modelLength - 2)
      @carouselIndex += 1
      @renderFacepile()
      e = @carouselIndex * 168 * -1
      @$(".artist-carousel > ul").stop().animate
        left: e
      , "slow"
      false

    prevArtist: ->
      e = undefined
      return false  if @carouselIndex is 0
      @carouselIndex -= 1
      @renderFacepile()
      e = @carouselIndex * 168 * -1
      @$(".artist-carousel > ul").stop().animate
        left: e
      , "slow"
      false

    switchTab: (f) ->
      @currentView = $(f.target).attr("rel")
      @render()

    renderFacepile: ->
      e = undefined
      h = undefined
      l = undefined
      g = undefined
      j = undefined
      f = undefined
      @$("#location-facepile ul").empty()
      e = @model.get("artists")[@carouselIndex]
      if e and e.friends
        j = e.friends
        f = []
        l = 0
        g = j.length

        while l < g
          h = j[l]
          f.push @renderFacepileFriend(h)
          l++
        f

    renderFacepileFriend: (h) ->
      g = undefined
      f = undefined
      e = undefined
      j = undefined
      g = "https://graph.facebook.com/" + h + "/picture"
      j = "https://www.facebook.com/" + h + "/"
      e = $("<img>").attr(
        src: g
        width: 52
        height: 52
      )
      f = $("<a>").attr(
        href: j
        target: "_blank"
      )
      @$("#location-facepile ul").append $("<li>").append(f.append(e))

    remove: ->
      e = undefined
      e = @options.parentView
      e.closeAllMarkers true, false
      sz.ui.LocationDetail.__super__.remove.apply this, arguments
  )
  sz.ui.FeaturedMap = Backbone.View.extend(
    template: _.template($("#featured-maps").html())
    initialize: ->
      _.bindAll this, "appendData", "generateSearchUrl", "showPlace"
      @bubble_event = true

    events:
      "click .place-link": "showPlace"
      "touchend .place-link": "showPlace"
      "click #map": "closeAllMarkers"

    renderMap: ->
      e = undefined
      f = this
      @markers = []
      @places = []
      @popupWindows = {}
      @map = new google.maps.Map(@$("#map")[0],
        mapTypeId: google.maps.MapTypeId.ROADMAP
      )
      @coords =
        latitude: 39.828175
        longitude: -98.5795

      @map.setCenter new google.maps.LatLng(@coords.latitude, @coords.longitude)
      @map.setZoom 4
      sz.ui.MapSearch.defaultLocation (h, g) ->
        if g is sz.ui.MapSearch.OK
          f.coords = h.coords
          f.map.setCenter new google.maps.LatLng(f.coords.latitude, f.coords.longitude)
          if h.from is "Profile"
            f.map.setZoom 12
            f.map.setOptions
              maxZoom: 17
              minZoom: 10
          else
            if h.from is "Browser"
              f.map.setZoom 15
              f.map.setOptions
                maxZoom: 17
                minZoom: 10
        google.maps.event.addListener f.map, "idle", ->
          m = undefined
          l = undefined
          n = undefined
          j = undefined
          l = f.map.getCenter()
          f.coords =
            latitude: l.lat()
            longitude: l.lng()

          n = f.generateSearchUrl()
          f.appendData n
          j = []
          while f.markers.length > 250
            m = f.markers.shift()
            j.push m.setMap(null)
          j

      e = new sz.ui.MapHinter(map: this)

    setCenter: ->
      e = undefined
      e = new google.maps.LatLng(@coords.latitude, @coords.longitude)
      @map.setCenter e

    render: ->
      $(@el).html @template()
      _kmq.push [ "record", "Viewed Location map page" ]
      this

    destroy: ->
      e = undefined
      e.setMap null  while e = @markers.shift()
      @places = []

    searchMap: (g) ->
      f = undefined
      if g.keyCode is 13
        @destroy()
        f = @generateSearchUrl($(g.target).val())
        @appendData f
        @hidePlace()

    generateSearchUrl: (h) ->
      j = undefined
      f = undefined
      g = undefined
      e = undefined
      j = @coords.latitude or 39.828175
      f = @coords.longitude or -98.5795
      g = escape(h)  if h?
      e = "/api/1.0/places/?format=json&near=" + j + "," + f
      e = e + ("&q=" + g)  if g?
      e

    closeAllMarkers: (f, h) ->
      g = undefined
      e = undefined
      f = @bubble_event  unless f?
      h = @$("#location-detail").length is 1  unless h?
      f = @bubble_event  if _(f).has("type")
      @bubble_event = true
      return  if not f or h
      e = []
      for g of @popupWindows
        e.push @popupWindows[g].close()
      e

    appendData: (e) ->
      f = this
      $.getJSON e, (m) ->
        j = undefined
        l = undefined
        h = undefined
        g = undefined
        g = []
        l = 0
        h = m.length

        while l < h
          j = m[l]
          g.push ((p) ->
            t = undefined
            s = undefined
            u = undefined
            q = undefined
            o = undefined
            n = undefined
            r = undefined
            if r = p.id
            c.call(f.places, r) < 0
              s = p.loc[1]
              q = p.loc[0]
              u = new google.maps.LatLng(s, q)
              t = "/static/images/v3/icon-map-marker.png"
              o = new google.maps.Marker(
                map: f.map
                position: u
                title: p.name
                icon: t
              )
              n = new a(
                map: f.map
                place: p
                latlng: u
              )
              f.popupWindows[p.id] = n
              google.maps.event.addListener o, "click", ->
                return  if f.$("#location-detail").length
                f.closeAllMarkers true, false
                f.popupWindows[p.id].open f.map, o
                f.bubble_event = false

              google.maps.event.addDomListener o, "touch", ->
                return  if f.$("#location-detail").length
                f.closeAllMarkers true, false
                f.popupWindows[p.id].open f.map, o
                f.bubble_event = false

              f.markers.push o
              f.places.push p.id
          )(j)
          l++
        g

    showPlace: (j) ->
      h = undefined
      f = undefined
      e = undefined
      g = undefined
      l = this
      h = $(@el)
      g = $(j.currentTarget).attr("rel")
      e = new sz.model.Place(id: g)
      f = new sz.ui.LocationDetail(
        model: e
        parentView: this
      )
      e.fetch success: (n, m) ->
        h.append f.render().el

      false
  )
).call this
sz.ui.TrackHistoryCarousel = Backbone.View.extend(
  template: _.template($("#songs-played-carousel-template").html())
  scrollWidth: 102
  animateLength: 0
  currentLocation: 0
  dataForIndex: []
  totalImages: ->
    $("#carousel li").length

  events:
    "click .actions a.next": "moveForward"
    "click .actions a.back": "moveBackward"
    "click .actions a.current-station": "currentStation"

  initialize: ->
    _.bindAll this, "render", "fillInTrack", "addTrack", "currentStation", "moveForward", "moveBackward"
    @playedTracks = sz.app.data.TrackHistory
    @playedTracks.bind "add", @addTrack, this
    @player = sz.app.ui.Player
    @player.on "stopped", @updateCurrentStation, this
    @player.on "playing", @updateCurrentStation, this

  updateNavigation: ->
    b = @currentLocation
    a = @dataForIndex.length
    @$(".back,.next").css "visibility", "hidden"
    return  if a is 0
    @$(".back").css "visibility", "visible"  if b isnt 0
    @$(".next").css "visibility", "visible"  if a > b + 1

  addTrack: (b) ->
    c = $("<img>").attr("src", b.get("artist_img_thumb")).addClass("default")
    a = $("<li>").append(c)
    d = @$("#carousel-images")
    c.error ->
      e = $(this)
      f = e.css("background-image").replace(/^url\(['"]*/, "").replace(/['"]*\)$/, "")
      e.unbind("error").attr "src", f

    @dataForIndex.push b
    @currentLocation = @dataForIndex.length - 1
    d.append a
    if @dataForIndex.length is 1
      d.css "left", "47px"
    else
      d.animate
        left: ((@currentLocation * @scrollWidth) - 47) * -1
      , @animateLength
    @fillInTrack b

  updateCurrentStation: ->
    if @player.model.id
      @$("a.current-station").css "visibility", "visible"
    else
      @$("a.current-station").css "visibility", "hidden"

  currentStation: ->
    location.href = "#/stations/" + @player.model.id + "/"  if @player.model.id
    false

  fillInTrack: (c) ->
    b = ""
    e = "Not Playing"
    a = ""
    d = ""
    if typeof c isnt "undefined"
      b = c.get("album")
      e = c.get("title")
      a = c.get("artist")
      d = "#/artists/" + c.get("artist_slug") + "/"
    @$(".data .album-title").text b
    @$(".data .song-title").text e
    @$(".data h3 a").text a
    @$(".data h3 a").attr "href", d
    @updateNavigation()

  render: ->
    $(@el).html @template()
    this

  moveForward: ->
    return false  if @currentLocation >= @totalImages() - 1 or @totalImages() is 1
    b = parseInt($("#carousel ul").css("left"), 10)
    a = @animateLength
    $("#carousel ul").animate
      left: b - @scrollWidth
    , a
    @currentLocation += 1
    c = @dataForIndex[@currentLocation]
    @fillInTrack c
    false

  moveBackward: ->
    return false  if @currentLocation <= 0
    b = parseInt($("#carousel ul").css("left"), 10)
    a = @animateLength
    $("#carousel ul").animate
      left: b + @scrollWidth
    , a
    @currentLocation -= 1
    c = @dataForIndex[@currentLocation]
    @fillInTrack @dataForIndex[@currentLocation]
    false
)
(->
  b = (d, e) ->
    ->
      d.apply e, arguments

  a = Object::hasOwnProperty
  c = (g, e) ->
    f = ->
      @constructor = g
    for d of e
      g[d] = e[d]  if a.call(e, d)
    f:: = e::
    g:: = new f
    g.__super__ = e::
    g

  sz.ui.EditorialPageView = ((e) ->
    d = ->
      @renderUserStations = b(@renderUserStations, this)
      d.__super__.constructor.apply this, arguments
    c d, e
    d::id = "editorial-page"
    d::render = ->
      f = undefined
      $(@el).html @model.get("html_template")
      f = $(@el).find(".editorial-overlay img")
      new sz.ui.ResizedImage(f, f.parent(), f.width(), f.height())
      @renderUserStations()
      sz.app.ui.UserNavigation.setSelected()
      _kmq.push [ "record", "Viewed Editorial page" ]
      @el

    d::renderUserStations = ->
      f = this
      @$(".user-stations").each (h, j) ->
        g = undefined
        l = undefined
        l = $(j).attr("rel")
        g = null
        _.each $(j).attr("class").split(" "), (m) ->
          n = undefined
          if m.startsWith("limit-")
            n = Number(m.replace("limit-", ""))
            g = (if n > 0 then n else null)

        if l
          $(j).html "<ul class=\"stations-grid\"></ul>"
          sz.app.data.UserStations.username = l
          $.when(sz.app.data.UserStations.fetch()).then ->
            q = undefined
            o = undefined
            p = undefined
            n = undefined
            m = undefined
            g = (if g then g else sz.app.data.UserStations.models.length)
            q = sz.app.data.UserStations.models.slice(0, g)
            p = (s) ->
              r = undefined
              r = new sz.ui.StationGridItem(model: s)
              $(j).find(".stations-grid").append r.render().el

            n = 0
            m = q.length

            while n < m
              o = q[n]
              p o
              n++
            $(".stations-grid").masonry
              itemSelector: "li"
              columnWidth: 152
              isFitWidth: true
              gutterWidth: 25

      @el

    d
  )(Backbone.View)
).call this
sz.controllers.BaseController = Backbone.Router.extend(
  initialize: ->
    _.bindAll this
    @initSubViews()
    @initData()
    @renderSubViews()
    @initialized = false

  initSubViews: ->
    return  if @initialized
    sz.app.ui.UserNavigation = new sz.ui.UserNavigation(el: $("#nav"))
    sz.app.ui.Chat = new sz.ui.Chat()
    sz.app.ui.FriendList = new sz.ui.FriendList(el: $("#friends"))
    sz.app.ui.Player = new sz.ui.Player(el: $("#player-container"))
    sz.app.ui.ActivityFeed = new sz.ui.ActivityFeed()
    sz.app.ui.StationGrid = new sz.ui.StationGrid()
    sz.app.ui.UserProfile = new sz.ui.UserProfile()
    sz.app.ui.UserProfileAccount = new sz.ui.UserProfileAccount()
    sz.app.ui.StationCreate = new sz.ui.StationCreate()
    sz.app.ui.StationInfo = new sz.ui.StationInfo()
    sz.app.ui.ArtistPage = new sz.ui.ArtistPage()
    sz.app.ui.TrackHistoryCarousel = new sz.ui.TrackHistoryCarousel(el: $("#carousel"))
    @initialized = true

  initData: ->
    @fetchInviteData()
    @fetchFriendStatus()

  renderSubViews: ->
    a = $("#main")
    $("#content").html sz.app.ui.StationCreate.render().el
    sz.app.ui.UserNavigation.render()
    sz.app.ui.TrackHistoryCarousel.render()
    sz.app.ui.FriendList.render()
    sz.app.ui.Player.render()

  fetchInviteData: ->
    sz.app.data.UninvitedFriendList.fetch()
    setInterval (->
      sz.app.data.UninvitedFriendList.fetch()
    ), 30000

  fetchFriendStatus: ->
    sz.app.data.FriendList.fetch()
    setInterval (->
      sz.app.data.FriendList.update {}, [ "online_presence", "current_station" ]
    ), 60000
)
(->
  a = Object::hasOwnProperty
  b = (f, d) ->
    e = ->
      @constructor = f
    for c of d
      f[c] = d[c]  if a.call(d, c)
    e:: = d::
    f:: = new e
    f.__super__ = d::
    f

  sz.controllers.Editorial = ((d) ->
    c = ->
      c.__super__.constructor.apply this, arguments
    b c, d
    c::routes = ":editorialProfileId/": "editorialProfile"
    c::editorialProfile = (f) ->
      e = undefined
      g = this
      @page = null
      sz.app.data.EditorialPages.each (j) ->
        h = undefined
        h = j.get("page_url")
        g.page = j  if ("/#/" + f + "/") is h

      if @page
        e = new sz.ui.EditorialPageView(model: @page)
        $("#content").html e.render()

    c
  )(Backbone.Router)
).call this
sz.controllers.Account = Backbone.Router.extend(
  routes:
    "accounts/": "index"
    "accounts/login/": "login"
    "accounts/logout/": "logout"
    "accounts/info/": "accountInfo"

  initialize: ->
    _.bindAll this, "index", "login", "logout"

  index: (a) ->

  accountInfo: ->
    sz.app.ui.UserNavigation.setSelected()
    sz.app.ui.UserProfileAccount = new sz.ui.UserProfileAccount()
    $("#content").html sz.app.ui.UserProfileAccount.render().el

  login: ->

  logout: ->
)
sz.controllers.Featured = Backbone.Router.extend(
  routes:
    "/": "featured"
    "featured/": "featured"
    "featured/popular/": "featuredPopular"
    "featured/activity/": "featuredActityFeed"
    "featured/map/": "featuredMaps"
    "featuredpage/": "featured"

  initialize: ->
    _.bindAll this, "featured", "featuredPopular", "featuredActityFeed", "featuredMaps"

  featured: ->
    sz.app.ui.UserNavigation.setSelected()
    $("#content").html sz.app.ui.Featured.render().el

  featuredMaps: ->
    sz.app.ui.UserNavigation.setSelected()
    if typeof sz.app.ui.FeaturedMap is "undefined"
      $(window).resize ->
        google.maps.event.trigger sz.app.ui.FeaturedMap.map, "resize"
    sz.app.ui.FeaturedMap = new sz.ui.FeaturedMap()
    a = sz.app.ui.FeaturedMap
    $("#content-scroll").addClass "full-screen"
    $("#content").html a.render().el
    a.renderMap()

  featuredPopular: ->
    sz.app.ui.UserNavigation.setSelected()
    sz.app.ui.FeaturedPopular = new sz.ui.FeaturedPopular()
    $("#content-scroll").removeClass "full-screen"
    $("#content").html sz.app.ui.FeaturedPopular.render().el

  featuredActityFeed: ->
    sz.app.ui.UserNavigation.setSelected()
    sz.app.ui.ActivityFeed = new sz.ui.ActivityFeed()
    $("#content-scroll").removeClass "full-screen"
    $("#content").html sz.app.ui.ActivityFeed.render().el
)
sz.controllers.Profile = Backbone.Router.extend(
  routes:
    "users/:user/stations/": "userStations"
    "users/:user/favourites/": "userFavorites"
    "users/:user/activities/": "userActivities"
    "users/:user/recommendations/": "userRecommendations"

  initialize: ->
    _.bindAll this, "userStations", "userFavorites", "renderUserProfile"

  renderUserProfile: (a, b) ->
    sz.app.data.User.username = a
    sz.app.data.User.fetch().success((d, c) ->
      if sz.app.ui.StationGrid.stationList
        sz.app.ui.StationGrid.stationList.unbind()
        sz.app.ui.StationGrid.stationList = null
      $("#content").html sz.app.ui.UserProfile.render(b).el
      switch b
        when "stations"
          sz.app.ui.StationGrid.stationList = new sz.model.UserStations()
          _kmq.push [ "record", "Viewed User Profile: Stations" ]
        when "favorites"
          sz.app.ui.StationGrid.stationList = new sz.model.UserFavourites()
          _kmq.push [ "record", "Viewed User Profile: Favorites" ]
        when "recommendations"
          sz.app.ui.StationGrid.stationList = new sz.model.BrowseRecommended()
          _kmq.push [ "record", "Viewed User Profile: Recommendations" ]
        else
      sz.app.ui.StationGrid.stationList.username = a
      sz.app.ui.StationGrid.type = b
      sz.app.ui.StationGrid.rendered = false
      sz.app.ui.StationGrid.stationList.bind "all", sz.app.ui.StationGrid.renderStationList
      $("#content-scroll").removeClass "full-screen"
      $("#content .content-box-full").append sz.app.ui.StationGrid.render().el
      sz.app.ui.UserProfile.setSelected()
      sz.app.ui.UserNavigation.setSelected()
    ).error ->
      $("#content-scroll").addClass "full-screen"
      $("#content").html $("#user-no-profile-template").html()

  userActivities: (a) ->
    sz.app.data.User.username = a
    sz.app.data.UserActivities.username = a
    sz.app.data.User.fetch().success (c, b) ->
      $("#content").html sz.app.ui.UserProfile.render("activities").el
      sz.app.ui.UserProfile.setSelected()
      sz.app.ui.UserNavigation.setSelected()
      sz.app.data.UserActivities.fetch().success ->
        f = sz.app.data.UserActivities
        d = (sz.app.data.Accounts.first().get("username") is a)
        e = new sz.ui.MyActivity(
          collection: f
          myActivity: d
        )
        $("#content-scroll").removeClass "full-screen"
        $("#content .content-box-full").append e.render().el
        _kmq.push [ "record", "Viewed User Profile: Activities" ]

  userStations: (a) ->
    @renderUserProfile a, "stations"

  userFavorites: (a) ->
    @renderUserProfile a, "favorites"

  userRecommendations: (a) ->
    @renderUserProfile a, "recommendations"
)
sz.controllers.Station = Backbone.Router.extend(
  routes:
    "station/create/": "stationCreate"
    "stations/:stationId/": "stationInfo"
    "stations/:stationId/play/": "playStation"

  initialize: ->
    _.bindAll this, "playStation", "stationInfo"

  stationCreate: (a) ->
    $("#content").html new sz.ui.StationCreate().render().el
    sz.app.ui.UserNavigation.setSelected()

  stationInfo: (a) ->
    if sz.app.data.Station.get("id") isnt a
      @playStation a
      return
    sz.app.ui.UserNavigation.setSelected()
    $("#content-scroll").addClass "full-screen"
    $("#content").html sz.app.ui.StationInfo.render().el
    sz.app.ui.StationInfo.updateStationInfoTrackImage sz.app.data.TrackHistory.last().toJSON()  if sz.app.data.TrackHistory.last()

  playStation: (b) ->
    a = this
    c = ->
      sz.app.ui.Player.playStation b
      a.stationInfo b
      sz.app.ui.Player.unbind "ready", c

    sz.app.data.Station.set
      id: b
    ,
      silent: true

    sz.app.data.Station.fetch().success (e, d) ->
      if sz.app.ui.Player.ready
        sz.app.ui.Player.playStation b
        a.stationInfo b
      else
        sz.app.ui.Player.bind "ready", c
)
sz.controllers.Artist = Backbone.Router.extend(
  routes:
    "artists/:artistSlug/": "artistProfile"

  initalize: ->
    _.bindAll this, "artistProfile"

  handle404: ->
    sz.app.ui.ArtistPage = new sz.ui.ArtistPage()
    $("#content").html sz.app.ui.ArtistPage.render404().el
    $("#content-scroll").addClass "full-screen"

  artistProfile: (b) ->
    a = this
    $("#content-scroll").removeClass "full-screen"
    sz.app.data.Artist.slug = b
    sz.app.data.Artist.fetch
      success: (d, c) ->
        sz.app.ui.ArtistPage = new sz.ui.ArtistPage(model: sz.app.data.Artist)
        $("#content").html(sz.app.ui.ArtistPage.render().el).trigger "rendered"
        e = d.getSimilars(limit: 10)
        e.fetch success: (j, g) ->
          f = j.models
          h = $("#similar-artists")
          if f.length > 0
            h.empty()
            _.each f, (l) ->
              m = new sz.ui.StationGridItem(model: l)
              h.append m.render().el

            h.masonry
              itemSelector: "li"
              columnWidth: 188
              isFitWidth: true
              gutterWidth: -18

            $("#content").trigger "rendered"

        sz.app.data.ArtistActivities.slug = b
        sz.app.data.ArtistActivities.fetch
          success: (g, h) ->
            f = new sz.ui.MyActivity(
              collection: g
              myActivity: false
              name: sz.app.data.Artist.get("name")
              el: $("#artist-activities")
              id: null
            )
            f.render true

          error: (g, f) ->
            f.status is 404

      error: (d, c) ->
        if c.status is 404
          a.handle404()
          false
)
sz.controllers.Index = Backbone.Router.extend(
  routes:
    "/": "index"

  initialize: ->
    _.bindAll this, "index"

  index: ->
)
$(document).ready ->
  b = "initial_path"
  a = (->
    f = document.cookie.split(";")
    c = (new Date((new Date()).valueOf() - 2 * 24 * 60 * 60 * 1000)).toGMTString()
    e = null
    for d of f
      e = $.trim(f[d])
      if e.indexOf(b) is 0
        document.cookie = b + "=; expires=" + c + "; path=/"
        return unescape(e.split("=")[1])
    return
  )()
  location.href = a  if a
  $.when(sz.app.data.Accounts.fetch(), sz.app.data.AccountSettings.fetch()).then ->
    c = sz.app.data.Accounts.at(0)
    d = (if (c?) then c.get("username") else null)
    sz.app.data.MyFavourites.username = d
    $.when(sz.app.data.MyFavourites.fetch(), sz.app.data.EditorialPages.fetch()).then ->
      sz.app.controller.Base = new sz.controllers.BaseController()
      sz.app.controller.Index = new sz.controllers.Index()
      sz.app.controller.Featured = new sz.controllers.Featured()
      sz.app.controller.Station = new sz.controllers.Station()
      sz.app.controller.Artist = new sz.controllers.Artist()
      sz.app.controller.Profile = new sz.controllers.Profile()
      sz.app.controller.Account = new sz.controllers.Account()
      sz.app.controller.Editorial = new sz.controllers.Editorial()
      Backbone.history.start()

$(window).bind "load", ->
  $("#fade").removeClass("loading").hide().empty()

(->
  a = undefined
  a = (->
    c = (d) ->
      f = undefined
      e = undefined
      g = this
      f =
        map: sz.app.ui.FeaturedMap
        input: jQuery("#location-search-input")
        results: jQuery("#location-search-results")
        delay: 500
        minChars: 1
        maxResults: 15

      @selected = null
      @options = jQuery.extend(f, d)
      e = (if jQuery.browser.opera then "keypress" else "keydown")
      @options.input.bind e, (h) ->
        g.inputEvent h

      @options.results.show()
      @options.input.attr "autocorrect", "off"
      @options.input.attr "autocapitalize", "words"
      @options.input.attr "autocomplete", "off"
    b = undefined
    b =
      left: 37
      up: 38
      right: 39
      down: 40
      esc: 27
      enter: 13
      back: 8

    c::inputEvent = (f) ->
      d = undefined
      d = f.keyCode or f.which
      switch d
        when b.esc
          @selectNone()
          @hideHint()
        when b.up
          @actionUp()
        when b.down
          @actionDown()
        when b.enter
          if @selected?
            @selectSelected()
          else
            @selectFirst()
          @hideHint()
        when b.back
          @hideHint()
          @selectNone()
        else
          clearTimeout @timeout  if @timeout?
          @freshResults()

    c::hideHint = ->
      @options.results.hide()

    c::actionUp = ->
      d = undefined
      @selected = @options.results.find("li:first")  unless @selected?
      d = $(@selected).prev()
      @selected = d  if d.length > 0
      @options.results.find("li").removeClass "selected"
      $(@selected).addClass "selected"
      false

    c::actionDown = ->
      d = undefined
      @selected = @options.results.find("li:first")  unless @selected?
      d = $(@selected).next()
      @selected = d  if d.length > 0
      @options.results.find("li").removeClass "selected"
      $(@selected).addClass "selected"
      false

    c::selectSelected = ->
      @open @selected  if @selected?

    c::selectNone = ->
      @selected = null
      @options.input.val ""
      @options.results.empty()

    c::selectFirst = ->
      @open @options.results.find("li:first")

    c::selectOne = (d) ->
      @open d  if d?

    c::open = (e) ->
      d = undefined
      @options.input.val e.text()
      @options.map.destroy()
      @options.map.coords =
        latitude: e.attr("data-lat")
        longitude: e.attr("data-lon")

      d = @options.map.generateSearchUrl()
      @options.map.appendData d
      @options.map.setCenter()

    c::freshResults = ->
      d = this
      @timeout = setTimeout(->
        d.renderResults()
      , @options.delay)

    c::renderResults = ->
      d = undefined
      e = this
      d = @options.input.val()
      sz.ui.MapSearch.searchAddress d, (m) ->
        j = undefined
        g = undefined
        h = undefined
        n = undefined
        l = undefined
        f = undefined
        h = $("<ul/>")
        j = 0
        n = (p) ->
          o = undefined
          o = $("<li><strong>" + p.name + "</strong></li>")
          if j is 0
            e.selected = o
            e.selected.addClass "selected"
          o.attr "data-lat", p.coords.latitude
          o.attr "data-lon", p.coords.longitude
          o.on "click", (q) ->
            e.selectOne o
            e.hideHint()

          h.append o
          j++

        l = 0
        f = m.length

        while l < f
          g = m[l]
          n g
          l++
        e.options.results.html(h).show()

    c
  )()
  sz.ui.MapHinter = a
).call this