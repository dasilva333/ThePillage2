(function () {
    var z = this;
    var v = z._;
    var b = {};
    var l = Array.prototype,
        F = Object.prototype,
        I = Function.prototype;
    var x = l.slice,
        B = l.unshift,
        A = F.toString,
        r = F.hasOwnProperty;
    var p = l.forEach,
        j = l.map,
        D = l.reduce,
        e = l.reduceRight,
        o = l.filter,
        a = l.every,
        C = l.some,
        y = l.indexOf,
        f = l.lastIndexOf,
        c = Array.isArray,
        E = Object.keys,
        m = I.bind;
    var H = function (K) {
            return new g(K)
        };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = H
        }
        exports._ = H
    } else {
        z._ = H
    }
    H.VERSION = "1.3.1";
    var d = H.each = H.forEach = function (P, O, N) {
            if (P == null) {
                return
            }
            if (p && P.forEach === p) {
                P.forEach(O, N)
            } else {
                if (P.length === +P.length) {
                    for (var M = 0, K = P.length; M < K; M++) {
                        if (M in P && O.call(N, P[M], M, P) === b) {
                            return
                        }
                    }
                } else {
                    for (var L in P) {
                        if (H.has(P, L)) {
                            if (O.call(N, P[L], L, P) === b) {
                                return
                            }
                        }
                    }
                }
            }
        };
    H.map = H.collect = function (N, M, L) {
        var K = [];
        if (N == null) {
            return K
        }
        if (j && N.map === j) {
            return N.map(M, L)
        }
        d(N, function (Q, O, P) {
            K[K.length] = M.call(L, Q, O, P)
        });
        if (N.length === +N.length) {
            K.length = N.length
        }
        return K
    };
    H.reduce = H.foldl = H.inject = function (O, N, K, M) {
        var L = arguments.length > 2;
        if (O == null) {
            O = []
        }
        if (D && O.reduce === D) {
            if (M) {
                N = H.bind(N, M)
            }
            return L ? O.reduce(N, K) : O.reduce(N)
        }
        d(O, function (R, P, Q) {
            if (!L) {
                K = R;
                L = true
            } else {
                K = N.call(M, K, R, P, Q)
            }
        });
        if (!L) {
            throw new TypeError("Reduce of empty array with no initial value")
        }
        return K
    };
    H.reduceRight = H.foldr = function (O, N, K, M) {
        var L = arguments.length > 2;
        if (O == null) {
            O = []
        }
        if (e && O.reduceRight === e) {
            if (M) {
                N = H.bind(N, M)
            }
            return L ? O.reduceRight(N, K) : O.reduceRight(N)
        }
        var P = H.toArray(O).reverse();
        if (M && !L) {
            N = H.bind(N, M)
        }
        return L ? H.reduce(P, N, K, M) : H.reduce(P, N)
    };
    H.find = H.detect = function (N, M, L) {
        var K;
        t(N, function (Q, O, P) {
            if (M.call(L, Q, O, P)) {
                K = Q;
                return true
            }
        });
        return K
    };
    H.filter = H.select = function (N, M, L) {
        var K = [];
        if (N == null) {
            return K
        }
        if (o && N.filter === o) {
            return N.filter(M, L)
        }
        d(N, function (Q, O, P) {
            if (M.call(L, Q, O, P)) {
                K[K.length] = Q
            }
        });
        return K
    };
    H.reject = function (N, M, L) {
        var K = [];
        if (N == null) {
            return K
        }
        d(N, function (Q, O, P) {
            if (!M.call(L, Q, O, P)) {
                K[K.length] = Q
            }
        });
        return K
    };
    H.every = H.all = function (N, M, L) {
        var K = true;
        if (N == null) {
            return K
        }
        if (a && N.every === a) {
            return N.every(M, L)
        }
        d(N, function (Q, O, P) {
            if (!(K = K && M.call(L, Q, O, P))) {
                return b
            }
        });
        return K
    };
    var t = H.some = H.any = function (N, M, L) {
            M || (M = H.identity);
            var K = false;
            if (N == null) {
                return K
            }
            if (C && N.some === C) {
                return N.some(M, L)
            }
            d(N, function (Q, O, P) {
                if (K || (K = M.call(L, Q, O, P))) {
                    return b
                }
            });
            return !!K
        };
    H.include = H.contains = function (M, L) {
        var K = false;
        if (M == null) {
            return K
        }
        if (y && M.indexOf === y) {
            return M.indexOf(L) != -1
        }
        K = t(M, function (N) {
            return N === L
        });
        return K
    };
    H.invoke = function (L, M) {
        var K = x.call(arguments, 2);
        return H.map(L, function (N) {
            return (H.isFunction(M) ? M || N : N[M]).apply(N, K)
        })
    };
    H.pluck = function (L, K) {
        return H.map(L, function (M) {
            return M[K]
        })
    };
    H.max = function (N, M, L) {
        if (!M && H.isArray(N)) {
            return Math.max.apply(Math, N)
        }
        if (!M && H.isEmpty(N)) {
            return -Infinity
        }
        var K = {
            computed: -Infinity
        };
        d(N, function (R, O, Q) {
            var P = M ? M.call(L, R, O, Q) : R;
            P >= K.computed && (K = {
                value: R,
                computed: P
            })
        });
        return K.value
    };
    H.min = function (N, M, L) {
        if (!M && H.isArray(N)) {
            return Math.min.apply(Math, N)
        }
        if (!M && H.isEmpty(N)) {
            return Infinity
        }
        var K = {
            computed: Infinity
        };
        d(N, function (R, O, Q) {
            var P = M ? M.call(L, R, O, Q) : R;
            P < K.computed && (K = {
                value: R,
                computed: P
            })
        });
        return K.value
    };
    H.shuffle = function (M) {
        var K = [],
            L;
        d(M, function (P, N, O) {
            if (N == 0) {
                K[0] = P
            } else {
                L = Math.floor(Math.random() * (N + 1));
                K[N] = K[L];
                K[L] = P
            }
        });
        return K
    };
    H.sortBy = function (M, L, K) {
        return H.pluck(H.map(M, function (P, N, O) {
            return {
                value: P,
                criteria: L.call(K, P, N, O)
            }
        }).sort(function (Q, P) {
            var O = Q.criteria,
                N = P.criteria;
            return O < N ? -1 : O > N ? 1 : 0
        }), "value")
    };
    H.groupBy = function (M, N) {
        var K = {};
        var L = H.isFunction(N) ? N : function (O) {
                return O[N]
            };
        d(M, function (Q, O) {
            var P = L(Q, O);
            (K[P] || (K[P] = [])).push(Q)
        });
        return K
    };
    H.sortedIndex = function (P, O, M) {
        M || (M = H.identity);
        var K = 0,
            N = P.length;
        while (K < N) {
            var L = (K + N) >> 1;
            M(P[L]) < M(O) ? K = L + 1 : N = L
        }
        return K
    };
    H.toArray = function (K) {
        if (!K) {
            return []
        }
        if (K.toArray) {
            return K.toArray()
        }
        if (H.isArray(K)) {
            return x.call(K)
        }
        if (H.isArguments(K)) {
            return x.call(K)
        }
        return H.values(K)
    };
    H.size = function (K) {
        return H.toArray(K).length
    };
    H.first = H.head = function (M, L, K) {
        return (L != null) && !K ? x.call(M, 0, L) : M[0]
    };
    H.initial = function (M, L, K) {
        return x.call(M, 0, M.length - ((L == null) || K ? 1 : L))
    };
    H.last = function (M, L, K) {
        if ((L != null) && !K) {
            return x.call(M, Math.max(M.length - L, 0))
        } else {
            return M[M.length - 1]
        }
    };
    H.rest = H.tail = function (M, K, L) {
        return x.call(M, (K == null) || L ? 1 : K)
    };
    H.compact = function (K) {
        return H.filter(K, function (L) {
            return !!L
        })
    };
    H.flatten = function (L, K) {
        return H.reduce(L, function (M, N) {
            if (H.isArray(N)) {
                return M.concat(K ? N : H.flatten(N))
            }
            M[M.length] = N;
            return M
        }, [])
    };
    H.without = function (K) {
        return H.difference(K, x.call(arguments, 1))
    };
    H.uniq = H.unique = function (O, N, M) {
        var L = M ? H.map(O, M) : O;
        var K = [];
        H.reduce(L, function (P, R, Q) {
            if (0 == Q || (N === true ? H.last(P) != R : !H.include(P, R))) {
                P[P.length] = R;
                K[K.length] = O[Q]
            }
            return P
        }, []);
        return K
    };
    H.union = function () {
        return H.uniq(H.flatten(arguments, true))
    };
    H.intersection = H.intersect = function (L) {
        var K = x.call(arguments, 1);
        return H.filter(H.uniq(L), function (M) {
            return H.every(K, function (N) {
                return H.indexOf(N, M) >= 0
            })
        })
    };
    H.difference = function (L) {
        var K = H.flatten(x.call(arguments, 1));
        return H.filter(L, function (M) {
            return !H.include(K, M)
        })
    };
    H.zip = function () {
        var K = x.call(arguments);
        var N = H.max(H.pluck(K, "length"));
        var M = new Array(N);
        for (var L = 0; L < N; L++) {
            M[L] = H.pluck(K, "" + L)
        }
        return M
    };
    H.indexOf = function (O, M, N) {
        if (O == null) {
            return -1
        }
        var L, K;
        if (N) {
            L = H.sortedIndex(O, M);
            return O[L] === M ? L : -1
        }
        if (y && O.indexOf === y) {
            return O.indexOf(M)
        }
        for (L = 0, K = O.length; L < K; L++) {
            if (L in O && O[L] === M) {
                return L
            }
        }
        return -1
    };
    H.lastIndexOf = function (M, L) {
        if (M == null) {
            return -1
        }
        if (f && M.lastIndexOf === f) {
            return M.lastIndexOf(L)
        }
        var K = M.length;
        while (K--) {
            if (K in M && M[K] === L) {
                return K
            }
        }
        return -1
    };
    H.range = function (P, N, O) {
        if (arguments.length <= 1) {
            N = P || 0;
            P = 0
        }
        O = arguments[2] || 1;
        var L = Math.max(Math.ceil((N - P) / O), 0);
        var K = 0;
        var M = new Array(L);
        while (K < L) {
            M[K++] = P;
            P += O
        }
        return M
    };
    var h = function () {};
    H.bind = function J(N, L) {
        var M, K;
        if (N.bind === m && m) {
            return m.apply(N, x.call(arguments, 1))
        }
        if (!H.isFunction(N)) {
            throw new TypeError
        }
        K = x.call(arguments, 2);
        return M = function () {
            if (!(this instanceof M)) {
                return N.apply(L, K.concat(x.call(arguments)))
            }
            h.prototype = N.prototype;
            var P = new h;
            var O = N.apply(P, K.concat(x.call(arguments)));
            if (Object(O) === O) {
                return O
            }
            return P
        }
    };
    H.bindAll = function (L) {
        var K = x.call(arguments, 1);
        if (K.length == 0) {
            K = H.functions(L)
        }
        d(K, function (M) {
            L[M] = H.bind(L[M], L)
        });
        return L
    };
    H.memoize = function (M, L) {
        var K = {};
        L || (L = H.identity);
        return function () {
            var N = L.apply(this, arguments);
            return H.has(K, N) ? K[N] : (K[N] = M.apply(this, arguments))
        }
    };
    H.delay = function (L, M) {
        var K = x.call(arguments, 2);
        return setTimeout(function () {
            return L.apply(L, K)
        }, M)
    };
    H.defer = function (K) {
        return H.delay.apply(H, [K, 1].concat(x.call(arguments, 1)))
    };
    H.throttle = function (P, R) {
        var N, K, Q, O, M;
        var L = H.debounce(function () {
            M = O = false
        }, R);
        return function () {
            N = this;
            K = arguments;
            var S = function () {
                    Q = null;
                    if (M) {
                        P.apply(N, K)
                    }
                    L()
                };
            if (!Q) {
                Q = setTimeout(S, R)
            }
            if (O) {
                M = true
            } else {
                P.apply(N, K)
            }
            L();
            O = true
        }
    };
    H.debounce = function (K, M) {
        var L;
        return function () {
            var P = this,
                O = arguments;
            var N = function () {
                    L = null;
                    K.apply(P, O)
                };
            clearTimeout(L);
            L = setTimeout(N, M)
        }
    };
    H.once = function (M) {
        var K = false,
            L;
        return function () {
            if (K) {
                return L
            }
            K = true;
            return L = M.apply(this, arguments)
        }
    };
    H.wrap = function (K, L) {
        return function () {
            var M = [K].concat(x.call(arguments, 0));
            return L.apply(this, M)
        }
    };
    H.compose = function () {
        var K = arguments;
        return function () {
            var L = arguments;
            for (var M = K.length - 1; M >= 0; M--) {
                L = [K[M].apply(this, L)]
            }
            return L[0]
        }
    };
    H.after = function (L, K) {
        if (L <= 0) {
            return K()
        }
        return function () {
            if (--L < 1) {
                return K.apply(this, arguments)
            }
        }
    };
    H.keys = E ||
    function (M) {
        if (M !== Object(M)) {
            throw new TypeError("Invalid object")
        }
        var L = [];
        for (var K in M) {
            if (H.has(M, K)) {
                L[L.length] = K
            }
        }
        return L
    };
    H.values = function (K) {
        return H.map(K, H.identity)
    };
    H.functions = H.methods = function (M) {
        var L = [];
        for (var K in M) {
            if (H.isFunction(M[K])) {
                L.push(K)
            }
        }
        return L.sort()
    };
    H.extend = function (K) {
        d(x.call(arguments, 1), function (L) {
            for (var M in L) {
                K[M] = L[M]
            }
        });
        return K
    };
    H.defaults = function (K) {
        d(x.call(arguments, 1), function (L) {
            for (var M in L) {
                if (K[M] == null) {
                    K[M] = L[M]
                }
            }
        });
        return K
    };
    H.clone = function (K) {
        if (!H.isObject(K)) {
            return K
        }
        return H.isArray(K) ? K.slice() : H.extend({}, K)
    };
    H.tap = function (L, K) {
        K(L);
        return L
    };
    function G(N, M, L) {
        if (N === M) {
            return N !== 0 || 1 / N == 1 / M
        }
        if (N == null || M == null) {
            return N === M
        }
        if (N._chain) {
            N = N._wrapped
        }
        if (M._chain) {
            M = M._wrapped
        }
        if (N.isEqual && H.isFunction(N.isEqual)) {
            return N.isEqual(M)
        }
        if (M.isEqual && H.isFunction(M.isEqual)) {
            return M.isEqual(N)
        }
        var Q = A.call(N);
        if (Q != A.call(M)) {
            return false
        }
        switch (Q) {
        case "[object String]":
            return N == String(M);
        case "[object Number]":
            return N != +N ? M != +M : (N == 0 ? 1 / N == 1 / M : N == +M);
        case "[object Date]":
        case "[object Boolean]":
            return +N == +M;
        case "[object RegExp]":
            return N.source == M.source && N.global == M.global && N.multiline == M.multiline && N.ignoreCase == M.ignoreCase
        }
        if (typeof N != "object" || typeof M != "object") {
            return false
        }
        var R = L.length;
        while (R--) {
            if (L[R] == N) {
                return true
            }
        }
        L.push(N);
        var P = 0,
            K = true;
        if (Q == "[object Array]") {
            P = N.length;
            K = P == M.length;
            if (K) {
                while (P--) {
                    if (!(K = P in N == P in M && G(N[P], M[P], L))) {
                        break
                    }
                }
            }
        } else {
            if ("constructor" in N != "constructor" in M || N.constructor != M.constructor) {
                return false
            }
            for (var O in N) {
                if (H.has(N, O)) {
                    P++;
                    if (!(K = H.has(M, O) && G(N[O], M[O], L))) {
                        break
                    }
                }
            }
            if (K) {
                for (O in M) {
                    if (H.has(M, O) && !(P--)) {
                        break
                    }
                }
                K = !P
            }
        }
        L.pop();
        return K
    }
    H.isEqual = function (L, K) {
        return G(L, K, [])
    };
    H.isEmpty = function (L) {
        if (H.isArray(L) || H.isString(L)) {
            return L.length === 0
        }
        for (var K in L) {
            if (H.has(L, K)) {
                return false
            }
        }
        return true
    };
    H.isElement = function (K) {
        return !!(K && K.nodeType == 1)
    };
    H.isArray = c ||
    function (K) {
        return A.call(K) == "[object Array]"
    };
    H.isObject = function (K) {
        return K === Object(K)
    };
    H.isArguments = function (K) {
        return A.call(K) == "[object Arguments]"
    };
    if (!H.isArguments(arguments)) {
        H.isArguments = function (K) {
            return !!(K && H.has(K, "callee"))
        }
    }
    H.isFunction = function (K) {
        return A.call(K) == "[object Function]"
    };
    H.isString = function (K) {
        return A.call(K) == "[object String]"
    };
    H.isNumber = function (K) {
        return A.call(K) == "[object Number]"
    };
    H.isNaN = function (K) {
        return K !== K
    };
    H.isBoolean = function (K) {
        return K === true || K === false || A.call(K) == "[object Boolean]"
    };
    H.isDate = function (K) {
        return A.call(K) == "[object Date]"
    };
    H.isRegExp = function (K) {
        return A.call(K) == "[object RegExp]"
    };
    H.isNull = function (K) {
        return K === null
    };
    H.isUndefined = function (K) {
        return K === void 0
    };
    H.has = function (L, K) {
        return r.call(L, K)
    };
    H.noConflict = function () {
        z._ = v;
        return this
    };
    H.identity = function (K) {
        return K
    };
    H.times = function (N, M, L) {
        for (var K = 0; K < N; K++) {
            M.call(L, K)
        }
    };
    H.escape = function (K) {
        return ("" + K).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    };
    H.mixin = function (K) {
        d(H.functions(K), function (L) {
            u(L, H[L] = K[L])
        })
    };
    var n = 0;
    H.uniqueId = function (K) {
        var L = n++;
        return K ? K + L : L
    };
    H.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var w = /.^/;
    var s = function (K) {
            return K.replace(/\\\\/g, "\\").replace(/\\'/g, "'")
        };
    H.template = function (N, M) {
        var O = H.templateSettings;
        var K = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + N.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(O.escape || w, function (P, Q) {
            return "',_.escape(" + s(Q) + "),'"
        }).replace(O.interpolate || w, function (P, Q) {
            return "'," + s(Q) + ",'"
        }).replace(O.evaluate || w, function (P, Q) {
            return "');" + s(Q).replace(/[\r\n\t]/g, " ") + ";__p.push('"
        }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');";
        var L = new Function("obj", "_", K);
        if (M) {
            return L(M, H)
        }
        return function (P) {
            return L.call(this, P, H)
        }
    };
    H.chain = function (K) {
        return H(K).chain()
    };
    var g = function (K) {
            this._wrapped = K
        };
    H.prototype = g.prototype;
    var q = function (L, K) {
            return K ? H(L).chain() : L
        };
    var u = function (K, L) {
            g.prototype[K] = function () {
                var M = x.call(arguments);
                B.call(M, this._wrapped);
                return q(L.apply(H, M), this._chain)
            }
        };
    H.mixin(H);
    d(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (K) {
        var L = l[K];
        g.prototype[K] = function () {
            var M = this._wrapped;
            L.apply(M, arguments);
            var N = M.length;
            if ((K == "shift" || K == "splice") && N === 0) {
                delete M[0]
            }
            return q(M, this._chain)
        }
    });
    d(["concat", "join", "slice"], function (K) {
        var L = l[K];
        g.prototype[K] = function () {
            return q(L.apply(this._wrapped, arguments), this._chain)
        }
    });
    g.prototype.chain = function () {
        this._chain = true;
        return this
    };
    g.prototype.value = function () {
        return this._wrapped
    }
}).call(this);
var JSON;
if (!JSON) {
    JSON = {}
}(function () {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
(function () {
    var p = this;
    var n = p.Backbone;
    var o = Array.prototype.slice;
    var w = Array.prototype.splice;
    var b;
    if (typeof exports !== "undefined") {
        b = exports
    } else {
        b = p.Backbone = {}
    }
    b.VERSION = "0.9.0";
    var x = p._;
    if (!x && (typeof require !== "undefined")) {
        x = require("underscore")
    }
    var e = p.jQuery || p.Zepto || p.ender;
    b.noConflict = function () {
        p.Backbone = n;
        return this
    };
    b.emulateHTTP = false;
    b.emulateJSON = false;
    b.Events = {
        on: function (B, E, A) {
            var C;
            B = B.split(/\s+/);
            var z = this._callbacks || (this._callbacks = {});
            while (C = B.shift()) {
                var D = z[C] || (z[C] = {});
                var y = D.tail || (D.tail = D.next = {});
                y.callback = E;
                y.context = A;
                D.tail = y.next = {}
            }
            return this
        },
        off: function (A, D, z) {
            var C, y, B;
            if (!A) {
                delete this._callbacks
            } else {
                if (y = this._callbacks) {
                    A = A.split(/\s+/);
                    while (C = A.shift()) {
                        B = y[C];
                        delete y[C];
                        if (!D || !B) {
                            continue
                        }
                        while ((B = B.next) && B.next) {
                            if (B.callback === D && (!z || B.context === z)) {
                                continue
                            }
                            this.on(C, B.callback, B.context)
                        }
                    }
                }
            }
            return this
        },
        trigger: function (B) {
            var F, E, A, z, y, D, C;
            if (!(A = this._callbacks)) {
                return this
            }
            D = A.all;
            (B = B.split(/\s+/)).push(null);
            while (F = B.shift()) {
                if (D) {
                    B.push({
                        next: D.next,
                        tail: D.tail,
                        event: F
                    })
                }
                if (!(E = A[F])) {
                    continue
                }
                B.push({
                    next: E.next,
                    tail: E.tail
                })
            }
            C = o.call(arguments, 1);
            while (E = B.pop()) {
                z = E.tail;
                y = E.event ? [E.event].concat(C) : C;
                while ((E = E.next) !== z) {
                    E.callback.apply(E.context || this, y)
                }
            }
            return this
        }
    };
    b.Events.bind = b.Events.on;
    b.Events.unbind = b.Events.off;
    b.Model = function (y, z) {
        var A;
        y || (y = {});
        if (z && z.parse) {
            y = this.parse(y)
        }
        if (A = c(this, "defaults")) {
            y = x.extend({}, A, y)
        }
        if (z && z.collection) {
            this.collection = z.collection
        }
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = x.uniqueId("c");
        this._changed = {};
        if (!this.set(y, {
            silent: true
        })) {
            throw new Error("Can't create an invalid model")
        }
        this._changed = {};
        this._previousAttributes = x.clone(this.attributes);
        this.initialize.apply(this, arguments)
    };
    x.extend(b.Model.prototype, b.Events, {
        idAttribute: "id",
        initialize: function () {},
        toJSON: function () {
            return x.clone(this.attributes)
        },
        get: function (y) {
            return this.attributes[y]
        },
        escape: function (y) {
            var z;
            if (z = this._escapedAttributes[y]) {
                return z
            }
            var A = this.attributes[y];
            return this._escapedAttributes[y] = x.escape(A == null ? "" : "" + A)
        },
        has: function (y) {
            return this.attributes[y] != null
        },
        set: function (F, E, H) {
            var G, D, B;
            if (x.isObject(F) || F == null) {
                G = F;
                H = E
            } else {
                G = {};
                G[F] = E
            }
            H || (H = {});
            if (!G) {
                return this
            }
            if (G instanceof b.Model) {
                G = G.attributes
            }
            if (H.unset) {
                for (var D in G) {
                    G[D] = void 0
                }
            }
            if (this.validate && !this._performValidation(G, H)) {
                return false
            }
            if (this.idAttribute in G) {
                this.id = G[this.idAttribute]
            }
            var z = this.attributes;
            var y = this._escapedAttributes;
            var C = this._previousAttributes || {};
            var A = this._changing;
            this._changing = true;
            for (D in G) {
                B = G[D];
                if (!x.isEqual(z[D], B)) {
                    delete y[D]
                }
                H.unset ? delete z[D] : z[D] = B;
                delete this._changed[D];
                if (!x.isEqual(C[D], B) || (x.has(z, D) != x.has(C, D))) {
                    this._changed[D] = B
                }
            }
            if (!A) {
                if (!H.silent && this.hasChanged()) {
                    this.change(H)
                }
                this._changing = false
            }
            return this
        },
        unset: function (y, z) {
            (z || (z = {})).unset = true;
            return this.set(y, null, z)
        },
        clear: function (y) {
            (y || (y = {})).unset = true;
            return this.set(x.clone(this.attributes), y)
        },
        fetch: function (z) {
            z = z ? x.clone(z) : {};
            var y = this;
            var A = z.success;
            z.success = function (D, B, C) {
                if (!y.set(y.parse(D, C), z)) {
                    return false
                }
                if (A) {
                    A(y, D)
                }
            };
            z.error = b.wrapError(z.error, y, z);
            return (this.sync || b.sync).call(this, "read", this, z)
        },
        save: function (B, C, A) {
            var z;
            if (x.isObject(B) || B == null) {
                z = B;
                A = C
            } else {
                z = {};
                z[B] = C
            }
            A = A ? x.clone(A) : {};
            if (z && !this[A.wait ? "_performValidation" : "set"](z, A)) {
                return false
            }
            var y = this;
            var D = A.success;
            A.success = function (I, F, H) {
                var G = y.parse(I, H);
                if (A.wait) {
                    G = x.extend(z || {}, G)
                }
                if (!y.set(G, A)) {
                    return false
                }
                if (D) {
                    D(y, I)
                } else {
                    y.trigger("sync", y, I, A)
                }
            };
            A.error = b.wrapError(A.error, y, A);
            var E = this.isNew() ? "create" : "update";
            return (this.sync || b.sync).call(this, E, this, A)
        },
        destroy: function (z) {
            z = z ? x.clone(z) : {};
            var y = this;
            var C = z.success;
            var B = function () {
                    y.trigger("destroy", y, y.collection, z)
                };
            if (this.isNew()) {
                return B()
            }
            z.success = function (D) {
                if (z.wait) {
                    B()
                }
                if (C) {
                    C(y, D)
                } else {
                    y.trigger("sync", y, D, z)
                }
            };
            z.error = b.wrapError(z.error, y, z);
            var A = (this.sync || b.sync).call(this, "delete", this, z);
            if (!z.wait) {
                B()
            }
            return A
        },
        url: function () {
            var y = c(this.collection, "url") || c(this, "urlRoot") || r();
            if (this.isNew()) {
                return y
            }
            return y + (y.charAt(y.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function (z, y) {
            return z
        },
        clone: function () {
            return new this.constructor(this.attributes)
        },
        isNew: function () {
            return this.id == null
        },
        change: function (z) {
            for (var y in this._changed) {
                this.trigger("change:" + y, this, this._changed[y], z)
            }
            this.trigger("change", this, z);
            this._previousAttributes = x.clone(this.attributes);
            this._changed = {}
        },
        hasChanged: function (y) {
            if (y) {
                return x.has(this._changed, y)
            }
            return !x.isEmpty(this._changed)
        },
        changedAttributes: function (A) {
            if (!A) {
                return this.hasChanged() ? x.clone(this._changed) : false
            }
            var C, B = false,
                z = this._previousAttributes;
            for (var y in A) {
                if (x.isEqual(z[y], (C = A[y]))) {
                    continue
                }(B || (B = {}))[y] = C
            }
            return B
        },
        previous: function (y) {
            if (!y || !this._previousAttributes) {
                return null
            }
            return this._previousAttributes[y]
        },
        previousAttributes: function () {
            return x.clone(this._previousAttributes)
        },
        _performValidation: function (A, z) {
            var B = x.extend({}, this.attributes, A);
            var y = this.validate(B, z);
            if (y) {
                if (z.error) {
                    z.error(this, y, z)
                } else {
                    this.trigger("error", this, y, z)
                }
                return false
            }
            return true
        }
    });
    b.Collection = function (z, y) {
        y || (y = {});
        if (y.comparator) {
            this.comparator = y.comparator
        }
        this._reset();
        this.initialize.apply(this, arguments);
        if (z) {
            this.reset(z, {
                silent: true,
                parse: y.parse
            })
        }
    };
    x.extend(b.Collection.prototype, b.Events, {
        model: b.Model,
        initialize: function () {},
        toJSON: function () {
            return this.map(function (y) {
                return y.toJSON()
            })
        },
        add: function (z, H) {
            var D, F, B, E, G, A, C = {},
                y = {};
            H || (H = {});
            z = x.isArray(z) ? z.slice() : [z];
            for (D = 0, B = z.length; D < B; D++) {
                if (!(E = z[D] = this._prepareModel(z[D], H))) {
                    throw new Error("Can't add an invalid model to a collection")
                }
                if (C[G = E.cid] || this._byCid[G] || (((A = E.id) != null) && (y[A] || this._byId[A]))) {
                    throw new Error("Can't add the same model to a collection twice")
                }
                C[G] = y[A] = E
            }
            for (D = 0; D < B; D++) {
                (E = z[D]).on("all", this._onModelEvent, this);
                this._byCid[E.cid] = E;
                if (E.id != null) {
                    this._byId[E.id] = E
                }
            }
            this.length += B;
            F = H.at != null ? H.at : this.models.length;
            w.apply(this.models, [F, 0].concat(z));
            if (this.comparator) {
                this.sort({
                    silent: true
                })
            }
            if (H.silent) {
                return this
            }
            for (D = 0, B = this.models.length; D < B; D++) {
                if (!C[(E = this.models[D]).cid]) {
                    continue
                }
                H.index = D;
                E.trigger("add", E, this, H)
            }
            return this
        },
        remove: function (D, B) {
            var C, y, A, z;
            B || (B = {});
            D = x.isArray(D) ? D.slice() : [D];
            for (C = 0, y = D.length; C < y; C++) {
                z = this.getByCid(D[C]) || this.get(D[C]);
                if (!z) {
                    continue
                }
                delete this._byId[z.id];
                delete this._byCid[z.cid];
                A = this.indexOf(z);
                this.models.splice(A, 1);
                this.length--;
                if (!B.silent) {
                    B.index = A;
                    z.trigger("remove", z, this, B)
                }
                this._removeReference(z)
            }
            return this
        },
        get: function (y) {
            if (y == null) {
                return null
            }
            return this._byId[y.id != null ? y.id : y]
        },
        getByCid: function (y) {
            return y && this._byCid[y.cid || y]
        },
        at: function (y) {
            return this.models[y]
        },
        sort: function (z) {
            z || (z = {});
            if (!this.comparator) {
                throw new Error("Cannot sort a set without a comparator")
            }
            var y = x.bind(this.comparator, this);
            if (this.comparator.length == 1) {
                this.models = this.sortBy(y)
            } else {
                this.models.sort(y)
            }
            if (!z.silent) {
                this.trigger("reset", this, z)
            }
            return this
        },
        pluck: function (y) {
            return x.map(this.models, function (z) {
                return z.get(y)
            })
        },
        reset: function (B, z) {
            B || (B = []);
            z || (z = {});
            for (var A = 0, y = this.models.length; A < y; A++) {
                this._removeReference(this.models[A])
            }
            this._reset();
            this.add(B, {
                silent: true,
                parse: z.parse
            });
            if (!z.silent) {
                this.trigger("reset", this, z)
            }
            return this
        },
        fetch: function (y) {
            y = y ? x.clone(y) : {};
            if (y.parse === undefined) {
                y.parse = true
            }
            var A = this;
            var z = y.success;
            y.success = function (D, B, C) {
                A[y.add ? "add" : "reset"](A.parse(D, C), y);
                if (z) {
                    z(A, D)
                }
            };
            y.error = b.wrapError(y.error, A, y);
            return (this.sync || b.sync).call(this, "read", this, y)
        },
        create: function (z, y) {
            var A = this;
            y = y ? x.clone(y) : {};
            z = this._prepareModel(z, y);
            if (!z) {
                return false
            }
            if (!y.wait) {
                A.add(z, y)
            }
            var B = y.success;
            y.success = function (C, E, D) {
                if (y.wait) {
                    A.add(C, y)
                }
                if (B) {
                    B(C, E)
                } else {
                    C.trigger("sync", z, E, y)
                }
            };
            z.save(null, y);
            return z
        },
        parse: function (z, y) {
            return z
        },
        chain: function () {
            return x(this.models).chain()
        },
        _reset: function (y) {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function (A, z) {
            if (!(A instanceof b.Model)) {
                var y = A;
                z.collection = this;
                A = new this.model(y, z);
                if (A.validate && !A._performValidation(A.attributes, z)) {
                    A = false
                }
            } else {
                if (!A.collection) {
                    A.collection = this
                }
            }
            return A
        },
        _removeReference: function (y) {
            if (this == y.collection) {
                delete y.collection
            }
            y.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function (A, z, B, y) {
            if ((A == "add" || A == "remove") && B != this) {
                return
            }
            if (A == "destroy") {
                this.remove(z, y)
            }
            if (z && A === "change:" + z.idAttribute) {
                delete this._byId[z.previous(z.idAttribute)];
                this._byId[z.id] = z
            }
            this.trigger.apply(this, arguments)
        }
    });
    var u = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy"];
    x.each(u, function (y) {
        b.Collection.prototype[y] = function () {
            return x[y].apply(x, [this.models].concat(x.toArray(arguments)))
        }
    });
    b.Router = function (y) {
        y || (y = {});
        if (y.routes) {
            this.routes = y.routes
        }
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var g = /:\w+/g;
    var v = /\*\w+/g;
    var d = /[-[\]{}()+?.,\\^$|#\s]/g;
    x.extend(b.Router.prototype, b.Events, {
        initialize: function () {},
        route: function (y, z, A) {
            b.history || (b.history = new b.History);
            if (!x.isRegExp(y)) {
                y = this._routeToRegExp(y)
            }
            if (!A) {
                A = this[z]
            }
            b.history.route(y, x.bind(function (C) {
                var B = this._extractParameters(y, C);
                A && A.apply(this, B);
                this.trigger.apply(this, ["route:" + z].concat(B));
                b.history.trigger("route", this, z, B)
            }, this));
            return this
        },
        navigate: function (z, y) {
            b.history.navigate(z, y)
        },
        _bindRoutes: function () {
            if (!this.routes) {
                return
            }
            var z = [];
            for (var A in this.routes) {
                z.unshift([A, this.routes[A]])
            }
            for (var B = 0, y = z.length; B < y; B++) {
                this.route(z[B][0], z[B][1], this[z[B][1]])
            }
        },
        _routeToRegExp: function (y) {
            y = y.replace(d, "\\$&").replace(g, "([^/]+)").replace(v, "(.*?)");
            return new RegExp("^" + y + "$")
        },
        _extractParameters: function (y, z) {
            return y.exec(z).slice(1)
        }
    });
    b.History = function () {
        this.handlers = [];
        x.bindAll(this, "checkUrl")
    };
    var m = /^[#\/]/;
    var h = /msie [\w.]+/;
    var l = false;
    x.extend(b.History.prototype, b.Events, {
        interval: 50,
        getFragment: function (z, y) {
            if (z == null) {
                if (this._hasPushState || y) {
                    z = window.location.pathname;
                    var A = window.location.search;
                    if (A) {
                        z += A
                    }
                } else {
                    z = window.location.hash
                }
            }
            z = decodeURIComponent(z.replace(m, ""));
            if (!z.indexOf(this.options.root)) {
                z = z.substr(this.options.root.length)
            }
            return z
        },
        start: function (A) {
            if (l) {
                throw new Error("Backbone.history has already been started")
            }
            this.options = x.extend({}, {
                root: "/"
            }, this.options, A);
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !! this.options.pushState;
            this._hasPushState = !! (this.options.pushState && window.history && window.history.pushState);
            var z = this.getFragment();
            var y = document.documentMode;
            var C = (h.exec(navigator.userAgent.toLowerCase()) && (!y || y <= 7));
            if (C) {
                this.iframe = e('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(z)
            }
            if (this._hasPushState) {
                e(window).bind("popstate", this.checkUrl)
            } else {
                if (this._wantsHashChange && ("onhashchange" in window) && !C) {
                    e(window).bind("hashchange", this.checkUrl)
                } else {
                    if (this._wantsHashChange) {
                        this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
                    }
                }
            }
            this.fragment = z;
            l = true;
            var D = window.location;
            var B = D.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !B) {
                this.fragment = this.getFragment(null, true);
                window.location.replace(this.options.root + "#" + this.fragment);
                return true
            } else {
                if (this._wantsPushState && this._hasPushState && B && D.hash) {
                    this.fragment = D.hash.replace(m, "");
                    window.history.replaceState({}, document.title, D.protocol + "//" + D.host + this.options.root + this.fragment)
                }
            }
            if (!this.options.silent) {
                return this.loadUrl()
            }
        },
        stop: function () {
            e(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            l = false
        },
        route: function (y, z) {
            this.handlers.unshift({
                route: y,
                callback: z
            })
        },
        checkUrl: function (z) {
            var y = this.getFragment();
            if (y == this.fragment && this.iframe) {
                y = this.getFragment(this.iframe.location.hash)
            }
            if (y == this.fragment || y == decodeURIComponent(this.fragment)) {
                return false
            }
            if (this.iframe) {
                this.navigate(y)
            }
            this.loadUrl() || this.loadUrl(window.location.hash)
        },
        loadUrl: function (A) {
            var z = this.fragment = this.getFragment(A);
            var y = x.any(this.handlers, function (B) {
                if (B.route.test(z)) {
                    B.callback(z);
                    return true
                }
            });
            return y
        },
        navigate: function (z, y) {
            if (!l) {
                return false
            }
            if (!y || y === true) {
                y = {
                    trigger: y
                }
            }
            var A = (z || "").replace(m, "");
            if (this.fragment == A || this.fragment == decodeURIComponent(A)) {
                return
            }
            if (this._hasPushState) {
                if (A.indexOf(this.options.root) != 0) {
                    A = this.options.root + A
                }
                this.fragment = A;
                window.history[y.replace ? "replaceState" : "pushState"]({}, document.title, A)
            } else {
                if (this._wantsHashChange) {
                    this.fragment = A;
                    this._updateHash(window.location, A, y.replace);
                    if (this.iframe && (A != this.getFragment(this.iframe.location.hash))) {
                        if (!y.replace) {
                            this.iframe.document.open().close()
                        }
                        this._updateHash(this.iframe.location, A, y.replace)
                    }
                } else {
                    window.location.assign(this.options.root + z)
                }
            }
            if (y.trigger) {
                this.loadUrl(z)
            }
        },
        _updateHash: function (y, z, A) {
            if (A) {
                y.replace(y.toString().replace(/(javascript:|#).*$/, "") + "#" + z)
            } else {
                y.hash = z
            }
        }
    });
    b.View = function (y) {
        this.cid = x.uniqueId("view");
        this._configure(y || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    };
    var a = /^(\S+)\s*(.*)$/;
    var s = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    x.extend(b.View.prototype, b.Events, {
        tagName: "div",
        $: function (y) {
            return this.$el.find(y)
        },
        initialize: function () {},
        render: function () {
            return this
        },
        remove: function () {
            this.$el.remove();
            return this
        },
        make: function (z, y, B) {
            var A = document.createElement(z);
            if (y) {
                e(A).attr(y)
            }
            if (B) {
                e(A).html(B)
            }
            return A
        },
        setElement: function (y, z) {
            this.$el = e(y);
            this.el = this.$el[0];
            if (z !== false) {
                this.delegateEvents()
            }
        },
        delegateEvents: function (C) {
            if (!(C || (C = c(this, "events")))) {
                return
            }
            this.undelegateEvents();
            for (var B in C) {
                var D = C[B];
                if (!x.isFunction(D)) {
                    D = this[C[B]]
                }
                if (!D) {
                    throw new Error('Event "' + C[B] + '" does not exist')
                }
                var A = B.match(a);
                var z = A[1],
                    y = A[2];
                D = x.bind(D, this);
                z += ".delegateEvents" + this.cid;
                if (y === "") {
                    this.$el.bind(z, D)
                } else {
                    this.$el.delegate(y, z, D)
                }
            }
        },
        undelegateEvents: function () {
            this.$el.unbind(".delegateEvents" + this.cid)
        },
        _configure: function (A) {
            if (this.options) {
                A = x.extend({}, this.options, A)
            }
            for (var B = 0, z = s.length; B < z; B++) {
                var y = s[B];
                if (A[y]) {
                    this[y] = A[y]
                }
            }
            this.options = A
        },
        _ensureElement: function () {
            if (!this.el) {
                var y = c(this, "attributes") || {};
                if (this.id) {
                    y.id = this.id
                }
                if (this.className) {
                    y["class"] = this.className
                }
                this.setElement(this.make(this.tagName, y), false)
            } else {
                this.setElement(this.el, false)
            }
        }
    });
    var t = function (y, z) {
            var A = j(this, y, z);
            A.extend = this.extend;
            return A
        };
    b.Model.extend = b.Collection.extend = b.Router.extend = b.View.extend = t;
    var q = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    b.sync = function (C, z, y) {
        var A = q[C];
        var B = {
            type: A,
            dataType: "json"
        };
        if (!y.url) {
            B.url = c(z, "url") || r()
        }
        if (!y.data && z && (C == "create" || C == "update")) {
            B.contentType = "application/json";
            B.data = JSON.stringify(z.toJSON())
        }
        if (b.emulateJSON) {
            B.contentType = "application/x-www-form-urlencoded";
            B.data = B.data ? {
                model: B.data
            } : {}
        }
        if (b.emulateHTTP) {
            if (A === "PUT" || A === "DELETE") {
                if (b.emulateJSON) {
                    B.data._method = A
                }
                B.type = "POST";
                B.beforeSend = function (D) {
                    D.setRequestHeader("X-HTTP-Method-Override", A)
                }
            }
        }
        if (B.type !== "GET" && !b.emulateJSON) {
            B.processData = false
        }
        return e.ajax(x.extend(B, y))
    };
    b.wrapError = function (z, A, y) {
        return function (B, C) {
            var C = B === A ? C : B;
            if (z) {
                z(B, C, y)
            } else {
                A.trigger("error", B, C, y)
            }
        }
    };
    var f = function () {};
    var j = function (z, y, A) {
            var B;
            if (y && y.hasOwnProperty("constructor")) {
                B = y.constructor
            } else {
                B = function () {
                    z.apply(this, arguments)
                }
            }
            x.extend(B, z);
            f.prototype = z.prototype;
            B.prototype = new f();
            if (y) {
                x.extend(B.prototype, y)
            }
            if (A) {
                x.extend(B, A)
            }
            B.prototype.constructor = B;
            B.__super__ = z.prototype;
            return B
        };
    var c = function (y, z) {
            if (!(y && y[z])) {
                return null
            }
            return x.isFunction(y[z]) ? y[z]() : y[z]
        };
    var r = function () {
            throw new Error('A "url" property or function must be specified')
        }
}).call(this);
/*!
 * Amplify Store - Persistent Client-Side Storage @VERSION
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */ (function (a, g) {
    var b = a.store = function (j, m, e, l) {
            var l = b.type;
            if (e && e.type && e.type in b.types) {
                l = e.type
            }
            return b.types[l](j, m, e || {})
        };
    b.types = {};
    b.type = null;
    b.addType = function (e, j) {
        if (!b.type) {
            b.type = e
        }
        b.types[e] = j;
        b[e] = function (m, n, l) {
            l = l || {};
            l.type = e;
            return b(m, n, l)
        }
    };
    b.error = function () {
        return "amplify.store quota exceeded"
    };
    var h = /^__amplify__/;
    function d(e, j) {
        b.addType(e, function (t, s, u) {
            var m, r, n, o, p = s,
                l = (new Date()).getTime();
            if (!t) {
                p = {};
                o = [];
                n = 0;
                try {
                    t = j.length;
                    while (t = j.key(n++)) {
                        if (h.test(t)) {
                            r = JSON.parse(j.getItem(t));
                            if (r.expires && r.expires <= l) {
                                o.push(t)
                            } else {
                                p[t.replace(h, "")] = r.data
                            }
                        }
                    }
                    while (t = o.pop()) {
                        j.removeItem(t)
                    }
                } catch (q) {}
                return p
            }
            t = "__amplify__" + t;
            if (s === g) {
                m = j.getItem(t);
                r = m ? JSON.parse(m) : {
                    expires: -1
                };
                if (r.expires && r.expires <= l) {
                    j.removeItem(t)
                } else {
                    return r.data
                }
            } else {
                if (s === null) {
                    j.removeItem(t)
                } else {
                    r = JSON.stringify({
                        data: s,
                        expires: u.expires ? l + u.expires : null
                    });
                    try {
                        j.setItem(t, r)
                    } catch (q) {
                        b[e]();
                        try {
                            j.setItem(t, r)
                        } catch (q) {
                            throw b.error()
                        }
                    }
                }
            }
            return p
        })
    }
    for (var c in {
        localStorage: 1,
        sessionStorage: 1
    }) {
        try {
            if (window[c].getItem) {
                d(c, window[c])
            }
        } catch (f) {}
    }
    if (window.globalStorage) {
        try {
            d("globalStorage", window.globalStorage[window.location.hostname]);
            if (b.type === "sessionStorage") {
                b.type = "globalStorage"
            }
        } catch (f) {}
    }(function () {
        if (b.types.localStorage) {
            return
        }
        var j = document.createElement("div"),
            e = "amplify";
        j.style.display = "none";
        document.getElementsByTagName("head")[0].appendChild(j);
        if (j.addBehavior) {
            j.addBehavior("#default#userdata");
            b.addType("userData", function (u, t, v) {
                j.load(e);
                var q, s, o, m, n, p = t,
                    l = (new Date()).getTime();
                if (!u) {
                    p = {};
                    n = [];
                    m = 0;
                    while (q = j.XMLDocument.documentElement.attributes[m++]) {
                        s = JSON.parse(q.value);
                        if (s.expires && s.expires <= l) {
                            n.push(q.name)
                        } else {
                            p[q.name] = s.data
                        }
                    }
                    while (u = n.pop()) {
                        j.removeAttribute(u)
                    }
                    j.save(e);
                    return p
                }
                u = u.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-");
                if (t === g) {
                    q = j.getAttribute(u);
                    s = q ? JSON.parse(q) : {
                        expires: -1
                    };
                    if (s.expires && s.expires <= l) {
                        j.removeAttribute(u)
                    } else {
                        return s.data
                    }
                } else {
                    if (t === null) {
                        j.removeAttribute(u)
                    } else {
                        o = j.getAttribute(u);
                        s = JSON.stringify({
                            data: t,
                            expires: (v.expires ? (l + v.expires) : null)
                        });
                        j.setAttribute(u, s)
                    }
                }
                try {
                    j.save(e)
                } catch (r) {
                    if (o === null) {
                        j.removeAttribute(u)
                    } else {
                        j.setAttribute(u, o)
                    }
                    b.userData();
                    try {
                        j.setAttribute(u, s);
                        j.save(e)
                    } catch (r) {
                        if (o === null) {
                            j.removeAttribute(u)
                        } else {
                            j.setAttribute(u, o)
                        }
                        throw b.error()
                    }
                }
                return p
            })
        }
    }());
    (function () {
        var j = {};
        function e(l) {
            return l === g ? g : JSON.parse(JSON.stringify(l))
        }
        b.addType("memory", function (m, n, l) {
            if (!m) {
                return e(j)
            }
            if (n === g) {
                return e(j[m])
            }
            if (n === null) {
                delete j[m];
                return null
            }
            j[m] = n;
            if (l.expires) {
                setTimeout(function () {
                    delete j[m]
                }, l.expires)
            }
            return n
        })
    }())
}(this.amplify = this.amplify || {}));
function S4() {
    return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}
window.Store = function (b) {
    this.name = b;
    var a = amplify.store(this.name);
    this.records = (a && a.split(",")) || []
};
_.extend(Store.prototype, {
    save: function () {
        amplify.store(this.name, this.records.join(","))
    },
    create: function (a) {
        if (!a.id) {
            a.id = a.attributes.id = guid()
        }
        amplify.store(this.name + "-" + a.id, JSON.stringify(a));
        this.records.push(a.id.toString());
        this.save();
        return a
    },
    update: function (a) {
        amplify.store(this.name + "-" + a.id, JSON.stringify(a));
        if (!_.include(this.records, a.id.toString())) {
            this.records.push(a.id.toString())
        }
        this.save();
        return a
    },
    find: function (a) {
        return JSON.parse(amplify.store(this.name + "-" + a.id))
    },
    findAll: function () {
        return _.map(this.records, function (a) {
            return JSON.parse(amplify.store(this.name + "-" + a))
        }, this)
    },
    destroy: function (a) {
        amplify.store(this.name + "-" + a.id, null);
        this.records = _.reject(this.records, function (b) {
            return b == a.id.toString()
        });
        this.save();
        return a
    }
});
defaultSync = Backbone.sync;
amplifySync = function (f, d, c, b) {
    var e;
    var a = d.localStorage || d.collection.localStorage;
    switch (f) {
    case "read":
        e = d.id ? a.find(d) : a.findAll();
        break;
    case "create":
        e = a.create(d);
        break;
    case "update":
        e = a.update(d);
        break;
    case "delete":
        e = a.destroy(d);
        break
    }
    if (e) {
        c.success(e)
    } else {
        c.error("Record not found")
    }
};
Backbone.sync = function (c, b, a) {
    if (typeof (b.localStorage) !== "undefined" || (typeof (b.collection) !== "undefined" && typeof (b.collection.localStorage) !== "undefined")) {
        return amplifySync(c, b, a)
    } else {
        return defaultSync(c, b, a)
    }
};
(function (a) {
    var b = a.route;
    a.route = function (c, d, e) {
        return b.call(this, c, d, function () {
            if (location.hash !== "" && location.hash !== "#_=_") {
                _gaq.push(["_setAccount", "UA-23027768-1"]);
                _gaq.push(["_trackPageview", "/" + location.hash])
            }
            e.apply(this, arguments)
        })
    }
})(Backbone.Router.prototype);
(function (d) {
    d.timeago = function (g) {
        if (g instanceof Date) {
            return a(g)
        } else {
            if (typeof g === "string") {
                return a(d.timeago.parse(g))
            } else {
                return a(d.timeago.datetime(g))
            }
        }
    };
    var f = d.timeago;
    d.extend(d.timeago, {
        settings: {
            refreshMillis: 60000,
            allowFuture: false,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                numbers: []
            }
        },
        inWords: function (n) {
            var o = this.settings.strings;
            var j = o.prefixAgo;
            var s = o.suffixAgo;
            if (this.settings.allowFuture) {
                if (n < 0) {
                    j = o.prefixFromNow;
                    s = o.suffixFromNow
                }
                n = Math.abs(n)
            }
            var q = n / 1000;
            var g = q / 60;
            var p = g / 60;
            var r = p / 24;
            var l = r / 365;
            function h(t, v) {
                var u = d.isFunction(t) ? t(v, n) : t;
                var w = (o.numbers && o.numbers[v]) || v;
                return u.replace(/%d/i, w)
            }
            var m = q < 45 && h(o.seconds, Math.round(q)) || q < 90 && h(o.minute, 1) || g < 45 && h(o.minutes, Math.round(g)) || g < 90 && h(o.hour, 1) || p < 24 && h(o.hours, Math.round(p)) || p < 48 && h(o.day, 1) || r < 30 && h(o.days, Math.floor(r)) || r < 60 && h(o.month, 1) || r < 365 && h(o.months, Math.floor(r / 30)) || l < 2 && h(o.year, 1) || h(o.years, Math.floor(l));
            return d.trim([j, m, s].join(" "))
        },
        parse: function (h) {
            var g = d.trim(h);
            g = g.replace(/\.\d\d\d+/, "");
            g = g.replace(/-/, "/").replace(/-/, "/");
            g = g.replace(/T/, " ").replace(/Z/, " UTC");
            g = g.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
            return new Date(g)
        },
        datetime: function (h) {
            var j = d(h).get(0).tagName.toLowerCase() === "time";
            var g = j ? d(h).attr("datetime") : d(h).attr("title");
            return f.parse(g)
        }
    });
    d.fn.timeago = function () {
        var h = this;
        h.each(c);
        var g = f.settings;
        if (g.refreshMillis > 0) {
            setInterval(function () {
                h.each(c)
            }, g.refreshMillis)
        }
        return h
    };
    function c() {
        var g = b(this);
        if (!isNaN(g.datetime)) {
            d(this).text(a(g.datetime))
        }
        return this
    }
    function b(g) {
        g = d(g);
        if (!g.data("timeago")) {
            g.data("timeago", {
                datetime: f.datetime(g)
            });
            var h = d.trim(g.text());
            if (h.length > 0) {
                g.attr("title", h)
            }
        }
        return g.data("timeago")
    }
    function a(g) {
        return f.inWords(e(g))
    }
    function e(g) {
        return (new Date().getTime() - g.getTime() + new Date().getTimezoneOffset() * 60000)
    }
    document.createElement("abbr");
    document.createElement("time")
}(jQuery));
(function (d, b, a, c) {
    c = d.fn.innerscroll = function (e) {
        return this.each(function () {
            c.init(d(this), e)
        })
    };
    d.fn.removeInnerscroll = function (e) {
        return this.each(function () {
            var f = d(this).data(c.removerKey);
            if (d.isFunction(f)) {
                f()
            }
        })
    };
    d.extend(c, {
        getNativeScrollbarWidth: function () {
            var g = document.createElement("p");
            g.style.width = "100%";
            g.style.height = "200px";
            var h = document.createElement("div");
            h.style.position = "absolute";
            h.style.top = "0px";
            h.style.left = "0px";
            h.style.visibility = "hidden";
            h.style.width = "200px";
            h.style.height = "150px";
            h.style.overflow = "hidden";
            h.appendChild(g);
            document.body.appendChild(h);
            var f = g.offsetWidth;
            h.style.overflow = "scroll";
            var e = g.offsetWidth;
            if (f == e) {
                e = h.clientWidth
            }
            document.body.removeChild(h);
            return (f - e)
        },
        removerKey: "iscrollRemover",
        events: {
            moveThumbs: "scroll",
            mouseenter: "mouseenter",
            mousemove: "mousemove",
            mouseleave: "mouseleave"
        },
        constants: {
            thumbThickness: 6,
            thumbOpacity: 0.7,
            fadeSlow: 1000,
            fadeMedium: 400,
            fadeFast: 200,
            trackFocusPadding: 20
        },
        init: function (g, e) {
            if (!((e.draggable === "false") || (e.draggable === false))) {
                e.draggable = true
            }
            if (!((e.autoFadeout === "false") || (e.autoFadeout === false))) {
                e.autoFadeout = true
            }
            e.leftAdjust = e.leftAdjust || 0;
            e.fadeoutDelay = e.fadeoutDelay || 200;
            var f = {
                target: g,
                destination: d(e.destination),
                options: e,
                originalCSS: {
                    "overflow-x": g.css("overflow-x"),
                    "overflow-y": g.css("overflow-y"),
                    cursor: g.css("cursor")
                },
                sizing: c.getSizing(g, d(e.destination), e),
                opacityLocked: false
            };
            g.removeInnerscroll();
            g.data(c.removerKey, c.removerFactory(g, f));
            g.css({
                "overflow-y": "auto",
                "overflow-x": "hidden"
            }).bind(c.events.moveThumbs, f, c.moveThumbs);
            c.bindMouseenter(f);
            c.bindMousemove(f);
            c.bindMouseleave(f);
            f.thumbs = {};
            f.tracks = {};
            f.tracks.vertical = d("<div/>").css(c.getTrackCSS(f.sizing.tracks.vertical)).click(function (h) {
                f.target.scrollTop(h.offsetY * f.sizing.getTargetScrollHeight() / f.sizing.getTargetHeight())
            });
            f.thumbs.vertical = d("<div/>").css(c.getThumbCSS(f.sizing.thumbs.vertical)).css({
                "-moz-user-select": "-moz-none",
                "-khtml-user-select": "none",
                "-webkit-user-select": "none",
                "-user-select": "none",
                cursor: "pointer"
            }).fadeTo(0, c.constants.thumbOpacity);
            f.tracks.vertical.prepend(f.thumbs.vertical);
            f.destination.prepend(f.tracks.vertical);
            if (e.autoFadeout) {
                f.thumbs.vertical.fadeTo(c.constants.fadeSlow, 0)
            }
            if (e.draggable && d.isFunction(d.fn.draggable)) {
                f.thumbs.vertical.draggable({
                    containment: "parent",
                    axis: "y",
                    cursor: "pointer",
                    scroll: false,
                    start: function () {
                        g.unbind(c.events.moveThumbs, c.moveThumbs).unbind(c.events.mouseenter, c.mouseenter);
                        f.destination.unbind(c.events.mousemove, c.mousemove).unbind(c.events.mouseleave, c.mouseleave);
                        f.opacityLocked = true;
                        f.thumbs.vertical.stop(true, true).fadeTo(c.constants.fadeFast, c.constants.thumbOpacity)
                    },
                    drag: function (h, j) {
                        f.target.scrollTop(f.thumbs.vertical.position().top * f.sizing.getTargetScrollHeight() / f.sizing.getTargetHeight())
                    },
                    stop: function () {
                        c.hideThumbs(f);
                        f.opacityLocked = false;
                        c.bindMouseleave(f);
                        c.bindMousemove(f);
                        c.bindMouseenter(f);
                        g.bind(c.events.moveThumbs, f, c.moveThumbs)
                    }
                })
            }
        },
        removerFactory: function (f, e) {
            return function () {
                f.css(e.originalCSS).unbind(c.events.moveThumbs, c.moveThumbs).unbind(c.events.mouseenter, c.mouseenter);
                e.destination.unbind(c.events.mousemove, c.mousemove).unbind(c.events.mouseleave, c.mouseleave);
                if (e.thumbs) {
                    if (e.thumbs.horizontal) {
                        e.thumbs.horizontal.remove()
                    }
                    if (e.thumbs.vertical) {
                        e.thumbs.vertical.remove()
                    }
                }
            }
        },
        bindMouseenter: function (e) {
            if (e.options.autoFadeout) {
                e.target.bind(c.events.mouseenter, e, c.mouseenter)
            }
        },
        bindMousemove: function (e) {
            if (e.options.autoFadeout) {
                e.destination.bind(c.events.mousemove, e, c.mousemove)
            }
        },
        bindMouseleave: function (e) {
            if (e.options.autoFadeout) {
                e.destination.bind(c.events.mouseleave, e, c.mouseleave)
            }
        },
        flashThumbs: function (e) {
            if (!e.data.opacityLocked) {
                if (e.data.hideThumbsTimeout) {
                    clearTimeout(e.data.hideThumbsTimeout)
                }
                if (e.data.thumbs.vertical) {
                    e.data.thumbs.vertical.stop(true, true).fadeTo(c.constants.fadeFast, c.constants.thumbOpacity);
                    e.data.tracks.vertical.stop(true, true).fadeTo(c.constants.fadeFast, c.constants.thumbOpacity)
                }
                if (e.data.thumbs.horizontal) {
                    e.data.thumbs.horizontal.stop(true, true).fadeTo(c.constants.fadeFast, c.constants.thumbOpacity);
                    e.data.tracks.horizontal.stop(true, true).fadeTo(c.constants.fadeFast, c.constants.thumbOpacity)
                }
                c.hideThumbs(e.data)
            }
        },
        moveThumbs: function (j) {
            var g = j.data.thumbs;
            var f = j.data.sizing;
            var e = f.calcVerticalThumbHeight();
            var h = f.calcVerticalThumbTop();
            if (e != g.vertical.height()) {
                g.vertical.css("height", e + "px")
            }
            if (h != g.vertical.position().top) {
                g.vertical.css("top", h + "px")
            }
            c.flashThumbs(j)
        },
        mousemove: function (f) {
            var g = f.data.thumbs.vertical.offset().left;
            var e = f.pageX;
            if (a.abs(e - g) <= c.constants.trackFocusPadding) {
                f.data.opacityLocked = true;
                f.data.thumbs.vertical.stop(true, true).fadeTo(c.constants.fadeFast, c.constants.thumbOpacity);
                f.data.tracks.vertical.stop(true, true).fadeTo(c.constants.fadeFast, c.constants.thumbOpacity)
            } else {
                if (f.data.opacityLocked) {
                    c.hideThumbs(f.data);
                    f.data.opacityLocked = false
                }
            }
        },
        mouseenter: function (e) {
            c.flashThumbs(e)
        },
        mouseleave: function (e) {
            e.data.opacityLocked = false;
            c.hideThumbs(e.data)
        },
        hideThumbs: function (e) {
            if (e.options.autoFadeout) {
                if (e.hideThumbsTimeout) {
                    clearTimeout(e.hideThumbsTimeout)
                }
                e.hideThumbsTimeout = setTimeout(function () {
                    e.hideThumbsTimeout = undefined;
                    if (!e.opacityLocked) {
                        e.thumbs.vertical.stop(true, true).fadeTo(c.constants.fadeFast, 0);
                        e.tracks.vertical.stop(true, true).fadeTo(c.constants.fadeFast, 0)
                    }
                }, e.options.fadeoutDelay)
            }
        },
        getSizing: function (j, g, f) {
            var h = c.getNativeScrollbarWidth();
            var e = {
                getTargetWidth: function () {
                    return j.width()
                },
                getTargetHeight: function () {
                    return j.height()
                },
                getTargetScrollHeight: function () {
                    return parseFloat(j.get(0).scrollHeight, 10)
                },
                getTargetScrollWidth: function () {
                    return parseFloat(j.get(0).scrollWidth, 10)
                },
                thumbs: {
                    horizontal: {},
                    vertical: {
                        top: 0,
                        width: c.constants.thumbThickness,
                        corner: c.constants.thumbThickness / 2,
                        left: 0
                    }
                },
                tracks: {
                    horizontal: {},
                    vertical: {
                        left: j.position().left + j.width() - h - c.constants.thumbThickness + f.leftAdjust,
                        top: j.position().top,
                        height: j.height()
                    }
                }
            };
            e.calcVerticalThumbHeight = function () {
                var l = 0;
                if (e.getTargetScrollHeight() <= e.getTargetHeight()) {
                    l = 0
                } else {
                    l = e.getTargetHeight() * e.getTargetHeight() / e.getTargetScrollHeight()
                }
                return l
            };
            e.thumbs.vertical.height = e.calcVerticalThumbHeight();
            e.calcVerticalThumbTop = function () {
                return (j.height() * parseFloat(j.get(0).scrollTop, 10) / e.getTargetScrollHeight())
            };
            return e
        },
        getThumbCSS: function (e) {
            return {
                position: "absolute",
                "background-color": "black",
                width: e.width + "px",
                height: e.height + "px",
                left: e.left ? (e.left + "px") : (0 + "px"),
                top: e.top ? (e.top + "px") : (0 + "px"),
                "-moz-border-radius": e.corner + "px",
                "-webkit-border-radius": e.corner + "px",
                "border-radius": e.corner + "px",
                "z-index": "999"
            }
        },
        getTrackCSS: function (e) {
            return {
                position: "absolute",
                height: e.height + "px",
                left: e.left + "px",
                top: e.top + "px"
            }
        }
    })
})(jQuery, window, Math);
(function (c, d) {
    c.fn.jPlayer = function (h) {
        var g = "jPlayer";
        var e = typeof h === "string",
            f = Array.prototype.slice.call(arguments, 1),
            j = this;
        h = !e && f.length ? c.extend.apply(null, [true, h].concat(f)) : h;
        if (e && h.charAt(0) === "_") {
            return j
        }
        if (e) {
            this.each(function () {
                var l = c.data(this, g),
                    m = l && c.isFunction(l[h]) ? l[h].apply(l, f) : l;
                if (m !== l && m !== d) {
                    j = m;
                    return false
                }
            })
        } else {
            this.each(function () {
                var l = c.data(this, g);
                if (l) {
                    l.option(h || {})
                } else {
                    c.data(this, g, new c.jPlayer(h, this))
                }
            })
        }
        return j
    };
    c.jPlayer = function (f, g) {
        if (arguments.length) {
            this.element = c(g);
            this.options = c.extend(true, {}, this.options, f);
            var e = this;
            this.element.bind("remove.jPlayer", function () {
                e.destroy()
            });
            this._init()
        }
    };
    c.jPlayer.emulateMethods = "load play pause";
    c.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate";
    c.jPlayer.emulateOptions = "muted volume";
    c.jPlayer.reservedEvent = "ready flashreset resize repeat error warning";
    c.jPlayer.event = {
        ready: "jPlayer_ready",
        flashreset: "jPlayer_flashreset",
        resize: "jPlayer_resize",
        repeat: "jPlayer_repeat",
        click: "jPlayer_click",
        error: "jPlayer_error",
        warning: "jPlayer_warning",
        loadstart: "jPlayer_loadstart",
        progress: "jPlayer_progress",
        suspend: "jPlayer_suspend",
        abort: "jPlayer_abort",
        emptied: "jPlayer_emptied",
        stalled: "jPlayer_stalled",
        play: "jPlayer_play",
        pause: "jPlayer_pause",
        loadedmetadata: "jPlayer_loadedmetadata",
        loadeddata: "jPlayer_loadeddata",
        waiting: "jPlayer_waiting",
        playing: "jPlayer_playing",
        canplay: "jPlayer_canplay",
        canplaythrough: "jPlayer_canplaythrough",
        seeking: "jPlayer_seeking",
        seeked: "jPlayer_seeked",
        timeupdate: "jPlayer_timeupdate",
        ended: "jPlayer_ended",
        ratechange: "jPlayer_ratechange",
        durationchange: "jPlayer_durationchange",
        volumechange: "jPlayer_volumechange"
    };
    c.jPlayer.htmlEvent = ["loadstart", "abort", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "ratechange"];
    c.jPlayer.pause = function () {
        c.each(c.jPlayer.prototype.instances, function (f, e) {
            if (e.data("jPlayer").status.srcSet) {
                e.jPlayer("pause")
            }
        })
    };
    c.jPlayer.timeFormat = {
        showHour: false,
        showMin: true,
        showSec: true,
        padHour: false,
        padMin: true,
        padSec: true,
        sepHour: ":",
        sepMin: ":",
        sepSec: ""
    };
    c.jPlayer.convertTime = function (l) {
        var m = new Date(l * 1000);
        var f = m.getUTCHours();
        var h = m.getUTCMinutes();
        var j = m.getUTCSeconds();
        var g = (c.jPlayer.timeFormat.padHour && f < 10) ? "0" + f : f;
        var n = (c.jPlayer.timeFormat.padMin && h < 10) ? "0" + h : h;
        var e = (c.jPlayer.timeFormat.padSec && j < 10) ? "0" + j : j;
        return ((c.jPlayer.timeFormat.showHour) ? g + c.jPlayer.timeFormat.sepHour : "") + ((c.jPlayer.timeFormat.showMin) ? n + c.jPlayer.timeFormat.sepMin : "") + ((c.jPlayer.timeFormat.showSec) ? e + c.jPlayer.timeFormat.sepSec : "")
    };
    c.jPlayer.uaBrowser = function (l) {
        var f = l.toLowerCase();
        var h = /(webkit)[ \/]([\w.]+)/;
        var m = /(opera)(?:.*version)?[ \/]([\w.]+)/;
        var g = /(msie) ([\w.]+)/;
        var j = /(mozilla)(?:.*? rv:([\w.]+))?/;
        var e = h.exec(f) || m.exec(f) || g.exec(f) || f.indexOf("compatible") < 0 && j.exec(f) || [];
        return {
            browser: e[1] || "",
            version: e[2] || "0"
        }
    };
    c.jPlayer.uaPlatform = function (m) {
        var h = m.toLowerCase();
        var n = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/;
        var l = /(ipad|playbook)/;
        var g = /(android)/;
        var j = /(mobile)/;
        var e = n.exec(h) || [];
        var f = l.exec(h) || !j.exec(h) && g.exec(h) || [];
        if (e[1]) {
            e[1] = e[1].replace(/\s/g, "_")
        }
        return {
            platform: e[1] || "",
            tablet: f[1] || ""
        }
    };
    c.jPlayer.browser = {};
    c.jPlayer.platform = {};
    var b = c.jPlayer.uaBrowser(navigator.userAgent);
    if (b.browser) {
        c.jPlayer.browser[b.browser] = true;
        c.jPlayer.browser.version = b.version
    }
    var a = c.jPlayer.uaPlatform(navigator.userAgent);
    if (a.platform) {
        c.jPlayer.platform[a.platform] = true;
        c.jPlayer.platform.mobile = !a.tablet;
        c.jPlayer.platform.tablet = !! a.tablet
    }
    c.jPlayer.prototype = {
        count: 0,
        version: {
            script: "2.1.0",
            needFlash: "2.1.0",
            flash: "unknown"
        },
        options: {
            swfPath: "js",
            solution: "html, flash",
            supplied: "mp3",
            preload: "metadata",
            volume: 0.8,
            muted: false,
            wmode: "opaque",
            backgroundColor: "#000000",
            cssSelectorAncestor: "#jp_container_1",
            cssSelector: {
                videoPlay: ".jp-video-play",
                play: ".jp-play",
                pause: ".jp-pause",
                stop: ".jp-stop",
                seekBar: ".jp-seek-bar",
                playBar: ".jp-play-bar",
                mute: ".jp-mute",
                unmute: ".jp-unmute",
                volumeBar: ".jp-volume-bar",
                volumeBarValue: ".jp-volume-bar-value",
                volumeMax: ".jp-volume-max",
                currentTime: ".jp-current-time",
                duration: ".jp-duration",
                fullScreen: ".jp-full-screen",
                restoreScreen: ".jp-restore-screen",
                repeat: ".jp-repeat",
                repeatOff: ".jp-repeat-off",
                gui: ".jp-gui",
                noSolution: ".jp-no-solution"
            },
            fullScreen: false,
            autohide: {
                restored: false,
                full: true,
                fadeIn: 200,
                fadeOut: 600,
                hold: 1000
            },
            loop: false,
            repeat: function (e) {
                if (e.jPlayer.options.loop) {
                    c(this).unbind(".jPlayerRepeat").bind(c.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function () {
                        c(this).jPlayer("play")
                    })
                } else {
                    c(this).unbind(".jPlayerRepeat")
                }
            },
            nativeVideoControls: {},
            noFullScreen: {
                msie: /msie [0-6]/,
                ipad: /ipad.*?os [0-4]/,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android [0-3](?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                webos: /webos/
            },
            noVolume: {
                ipad: /ipad/,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android(?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                webos: /webos/,
                playbook: /playbook/
            },
            verticalVolume: false,
            idPrefix: "jp",
            noConflict: "jQuery",
            emulateHtml: false,
            errorAlerts: false,
            warningAlerts: false
        },
        optionsAudio: {
            size: {
                width: "0px",
                height: "0px",
                cssClass: ""
            },
            sizeFull: {
                width: "0px",
                height: "0px",
                cssClass: ""
            }
        },
        optionsVideo: {
            size: {
                width: "480px",
                height: "270px",
                cssClass: "jp-video-270p"
            },
            sizeFull: {
                width: "100%",
                height: "100%",
                cssClass: "jp-video-full"
            }
        },
        instances: {},
        status: {
            src: "",
            media: {},
            paused: true,
            format: {},
            formatType: "",
            waitForPlay: true,
            waitForLoad: true,
            srcSet: false,
            video: false,
            seekPercent: 0,
            currentPercentRelative: 0,
            currentPercentAbsolute: 0,
            currentTime: 0,
            duration: 0,
            readyState: 0,
            networkState: 0,
            playbackRate: 1,
            ended: 0
        },
        internal: {
            ready: false
        },
        solution: {
            html: true,
            flash: true
        },
        format: {
            mp3: {
                codec: 'audio/mpeg; codecs="mp3"',
                flashCanPlay: true,
                media: "audio"
            },
            m4a: {
                codec: 'audio/mp4; codecs="mp4a.40.2"',
                flashCanPlay: true,
                media: "audio"
            },
            oga: {
                codec: 'audio/ogg; codecs="vorbis"',
                flashCanPlay: false,
                media: "audio"
            },
            wav: {
                codec: 'audio/wav; codecs="1"',
                flashCanPlay: false,
                media: "audio"
            },
            webma: {
                codec: 'audio/webm; codecs="vorbis"',
                flashCanPlay: false,
                media: "audio"
            },
            fla: {
                codec: "audio/x-flv",
                flashCanPlay: true,
                media: "audio"
            },
            m4v: {
                codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: true,
                media: "video"
            },
            ogv: {
                codec: 'video/ogg; codecs="theora, vorbis"',
                flashCanPlay: false,
                media: "video"
            },
            webmv: {
                codec: 'video/webm; codecs="vorbis, vp8"',
                flashCanPlay: false,
                media: "video"
            },
            flv: {
                codec: "video/x-flv",
                flashCanPlay: true,
                media: "video"
            }
        },
        _init: function () {
            var f = this;
            this.element.empty();
            this.status = c.extend({}, this.status);
            this.internal = c.extend({}, this.internal);
            this.internal.domNode = this.element.get(0);
            this.formats = [];
            this.solutions = [];
            this.require = {};
            this.htmlElement = {};
            this.html = {};
            this.html.audio = {};
            this.html.video = {};
            this.flash = {};
            this.css = {};
            this.css.cs = {};
            this.css.jq = {};
            this.ancestorJq = [];
            this.options.volume = this._limitValue(this.options.volume, 0, 1);
            c.each(this.options.supplied.toLowerCase().split(","), function (q, n) {
                var o = n.replace(/^\s+|\s+$/g, "");
                if (f.format[o]) {
                    var p = false;
                    c.each(f.formats, function (s, r) {
                        if (o === r) {
                            p = true;
                            return false
                        }
                    });
                    if (!p) {
                        f.formats.push(o)
                    }
                }
            });
            c.each(this.options.solution.toLowerCase().split(","), function (q, o) {
                var n = o.replace(/^\s+|\s+$/g, "");
                if (f.solution[n]) {
                    var p = false;
                    c.each(f.solutions, function (s, r) {
                        if (n === r) {
                            p = true;
                            return false
                        }
                    });
                    if (!p) {
                        f.solutions.push(n)
                    }
                }
            });
            this.internal.instance = "jp_" + this.count;
            this.instances[this.internal.instance] = this.element;
            if (!this.element.attr("id")) {
                this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count)
            }
            this.internal.self = c.extend({}, {
                id: this.element.attr("id"),
                jq: this.element
            });
            this.internal.audio = c.extend({}, {
                id: this.options.idPrefix + "_audio_" + this.count,
                jq: d
            });
            this.internal.video = c.extend({}, {
                id: this.options.idPrefix + "_video_" + this.count,
                jq: d
            });
            this.internal.flash = c.extend({}, {
                id: this.options.idPrefix + "_flash_" + this.count,
                jq: d,
                swf: this.options.swfPath + (this.options.swfPath.toLowerCase().slice(-4) !== ".swf" ? (this.options.swfPath && this.options.swfPath.slice(-1) !== "/" ? "/" : "") + "Jplayer.swf" : "")
            });
            this.internal.poster = c.extend({}, {
                id: this.options.idPrefix + "_poster_" + this.count,
                jq: d
            });
            c.each(c.jPlayer.event, function (n, o) {
                if (f.options[n] !== d) {
                    f.element.bind(o + ".jPlayer", f.options[n]);
                    f.options[n] = d
                }
            });
            this.require.audio = false;
            this.require.video = false;
            c.each(this.formats, function (n, o) {
                f.require[f.format[o].media] = true
            });
            if (this.require.video) {
                this.options = c.extend(true, {}, this.optionsVideo, this.options)
            } else {
                this.options = c.extend(true, {}, this.optionsAudio, this.options)
            }
            this._setSize();
            this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
            this.status.noFullScreen = this._uaBlocklist(this.options.noFullScreen);
            this.status.noVolume = this._uaBlocklist(this.options.noVolume);
            this._restrictNativeVideoControls();
            this.htmlElement.poster = document.createElement("img");
            this.htmlElement.poster.id = this.internal.poster.id;
            this.htmlElement.poster.onload = function () {
                if (!f.status.video || f.status.waitForPlay) {
                    f.internal.poster.jq.show()
                }
            };
            this.element.append(this.htmlElement.poster);
            this.internal.poster.jq = c("#" + this.internal.poster.id);
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            });
            this.internal.poster.jq.hide();
            this.internal.poster.jq.bind("click.jPlayer", function () {
                f._trigger(c.jPlayer.event.click)
            });
            this.html.audio.available = false;
            if (this.require.audio) {
                this.htmlElement.audio = document.createElement("audio");
                this.htmlElement.audio.id = this.internal.audio.id;
                this.html.audio.available = !! this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio)
            }
            this.html.video.available = false;
            if (this.require.video) {
                this.htmlElement.video = document.createElement("video");
                this.htmlElement.video.id = this.internal.video.id;
                this.html.video.available = !! this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video)
            }
            this.flash.available = this._checkForFlash(10);
            this.html.canPlay = {};
            this.flash.canPlay = {};
            c.each(this.formats, function (n, o) {
                f.html.canPlay[o] = f.html[f.format[o].media].available && "" !== f.htmlElement[f.format[o].media].canPlayType(f.format[o].codec);
                f.flash.canPlay[o] = f.format[o].flashCanPlay && f.flash.available
            });
            this.html.desired = false;
            this.flash.desired = false;
            c.each(this.solutions, function (p, n) {
                if (p === 0) {
                    f[n].desired = true
                } else {
                    var q = false;
                    var o = false;
                    c.each(f.formats, function (r, s) {
                        if (f[f.solutions[0]].canPlay[s]) {
                            if (f.format[s].media === "video") {
                                o = true
                            } else {
                                q = true
                            }
                        }
                    });
                    f[n].desired = (f.require.audio && !q) || (f.require.video && !o)
                }
            });
            this.html.support = {};
            this.flash.support = {};
            c.each(this.formats, function (n, o) {
                f.html.support[o] = f.html.canPlay[o] && f.html.desired;
                f.flash.support[o] = f.flash.canPlay[o] && f.flash.desired
            });
            this.html.used = false;
            this.flash.used = false;
            c.each(this.solutions, function (o, n) {
                c.each(f.formats, function (p, q) {
                    if (f[n].support[q]) {
                        f[n].used = true;
                        return false
                    }
                })
            });
            this._resetActive();
            this._resetGate();
            this._cssSelectorAncestor(this.options.cssSelectorAncestor);
            if (!(this.html.used || this.flash.used)) {
                this._error({
                    type: c.jPlayer.error.NO_SOLUTION,
                    context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
                    message: c.jPlayer.errorMsg.NO_SOLUTION,
                    hint: c.jPlayer.errorHint.NO_SOLUTION
                });
                if (this.css.jq.noSolution.length) {
                    this.css.jq.noSolution.show()
                }
            } else {
                if (this.css.jq.noSolution.length) {
                    this.css.jq.noSolution.hide()
                }
            }
            if (this.flash.used) {
                var j, l = "jQuery=" + encodeURI(this.options.noConflict) + "&id=" + encodeURI(this.internal.self.id) + "&vol=" + this.options.volume + "&muted=" + this.options.muted;
                if (c.browser.msie && Number(c.browser.version) <= 8) {
                    var e = '<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0"></object>';
                    var h = ['<param name="movie" value="' + this.internal.flash.swf + '" />', '<param name="FlashVars" value="' + l + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'];
                    j = document.createElement(e);
                    for (var g = 0; g < h.length; g++) {
                        j.appendChild(document.createElement(h[g]))
                    }
                } else {
                    var m = function (q, s, o) {
                            var r = document.createElement("param");
                            r.setAttribute("name", s);
                            r.setAttribute("value", o);
                            q.appendChild(r)
                        };
                    j = document.createElement("object");
                    j.setAttribute("id", this.internal.flash.id);
                    j.setAttribute("data", this.internal.flash.swf);
                    j.setAttribute("type", "application/x-shockwave-flash");
                    j.setAttribute("width", "1");
                    j.setAttribute("height", "1");
                    m(j, "flashvars", l);
                    m(j, "allowscriptaccess", "always");
                    m(j, "bgcolor", this.options.backgroundColor);
                    m(j, "wmode", this.options.wmode)
                }
                this.element.append(j);
                this.internal.flash.jq = c(j)
            }
            if (this.html.used) {
                if (this.html.audio.available) {
                    this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio);
                    this.element.append(this.htmlElement.audio);
                    this.internal.audio.jq = c("#" + this.internal.audio.id)
                }
                if (this.html.video.available) {
                    this._addHtmlEventListeners(this.htmlElement.video, this.html.video);
                    this.element.append(this.htmlElement.video);
                    this.internal.video.jq = c("#" + this.internal.video.id);
                    if (this.status.nativeVideoControls) {
                        this.internal.video.jq.css({
                            width: this.status.width,
                            height: this.status.height
                        })
                    } else {
                        this.internal.video.jq.css({
                            width: "0px",
                            height: "0px"
                        })
                    }
                    this.internal.video.jq.bind("click.jPlayer", function () {
                        f._trigger(c.jPlayer.event.click)
                    })
                }
            }
            if (this.options.emulateHtml) {
                this._emulateHtmlBridge()
            }
            if (this.html.used && !this.flash.used) {
                setTimeout(function () {
                    f.internal.ready = true;
                    f.version.flash = "n/a";
                    f._trigger(c.jPlayer.event.repeat);
                    f._trigger(c.jPlayer.event.ready)
                }, 100)
            }
            this._updateNativeVideoControls();
            this._updateInterface();
            this._updateButtons(false);
            this._updateAutohide();
            this._updateVolume(this.options.volume);
            this._updateMute(this.options.muted);
            if (this.css.jq.videoPlay.length) {
                this.css.jq.videoPlay.hide()
            }
            c.jPlayer.prototype.count++
        },
        destroy: function () {
            this.clearMedia();
            this._removeUiClass();
            if (this.css.jq.currentTime.length) {
                this.css.jq.currentTime.text("")
            }
            if (this.css.jq.duration.length) {
                this.css.jq.duration.text("")
            }
            c.each(this.css.jq, function (e, f) {
                if (f.length) {
                    f.unbind(".jPlayer")
                }
            });
            this.internal.poster.jq.unbind(".jPlayer");
            if (this.internal.video.jq) {
                this.internal.video.jq.unbind(".jPlayer")
            }
            if (this.options.emulateHtml) {
                this._destroyHtmlBridge()
            }
            this.element.removeData("jPlayer");
            this.element.unbind(".jPlayer");
            this.element.empty();
            delete this.instances[this.internal.instance]
        },
        enable: function () {},
        disable: function () {},
        _testCanPlayType: function (f) {
            try {
                f.canPlayType(this.format.mp3.codec);
                return true
            } catch (e) {
                return false
            }
        },
        _uaBlocklist: function (f) {
            var e = navigator.userAgent.toLowerCase(),
                g = false;
            c.each(f, function (j, h) {
                if (h && h.test(e)) {
                    g = true;
                    return false
                }
            });
            return g
        },
        _restrictNativeVideoControls: function () {
            if (this.require.audio) {
                if (this.status.nativeVideoControls) {
                    this.status.nativeVideoControls = false;
                    this.status.noFullScreen = true
                }
            }
        },
        _updateNativeVideoControls: function () {
            if (this.html.video.available && this.html.used) {
                this.htmlElement.video.controls = this.status.nativeVideoControls;
                this._updateAutohide();
                if (this.status.nativeVideoControls && this.require.video) {
                    this.internal.poster.jq.hide();
                    this.internal.video.jq.css({
                        width: this.status.width,
                        height: this.status.height
                    })
                } else {
                    if (this.status.waitForPlay && this.status.video) {
                        this.internal.poster.jq.show();
                        this.internal.video.jq.css({
                            width: "0px",
                            height: "0px"
                        })
                    }
                }
            }
        },
        _addHtmlEventListeners: function (e, g) {
            var f = this;
            e.preload = this.options.preload;
            e.muted = this.options.muted;
            e.volume = this.options.volume;
            e.addEventListener("progress", function () {
                if (g.gate) {
                    f._getHtmlStatus(e);
                    f._updateInterface();
                    f._trigger(c.jPlayer.event.progress)
                }
            }, false);
            e.addEventListener("timeupdate", function () {
                if (g.gate) {
                    f._getHtmlStatus(e);
                    f._updateInterface();
                    f._trigger(c.jPlayer.event.timeupdate)
                }
            }, false);
            e.addEventListener("durationchange", function () {
                if (g.gate) {
                    f.status.duration = this.duration;
                    f._getHtmlStatus(e);
                    f._updateInterface();
                    f._trigger(c.jPlayer.event.durationchange)
                }
            }, false);
            e.addEventListener("play", function () {
                if (g.gate) {
                    f._updateButtons(true);
                    f._html_checkWaitForPlay();
                    f._trigger(c.jPlayer.event.play)
                }
            }, false);
            e.addEventListener("playing", function () {
                if (g.gate) {
                    f._updateButtons(true);
                    f._seeked();
                    f._trigger(c.jPlayer.event.playing)
                }
            }, false);
            e.addEventListener("pause", function () {
                if (g.gate) {
                    f._updateButtons(false);
                    f._trigger(c.jPlayer.event.pause)
                }
            }, false);
            e.addEventListener("waiting", function () {
                if (g.gate) {
                    f._seeking();
                    f._trigger(c.jPlayer.event.waiting)
                }
            }, false);
            e.addEventListener("seeking", function () {
                if (g.gate) {
                    f._seeking();
                    f._trigger(c.jPlayer.event.seeking)
                }
            }, false);
            e.addEventListener("seeked", function () {
                if (g.gate) {
                    f._seeked();
                    f._trigger(c.jPlayer.event.seeked)
                }
            }, false);
            e.addEventListener("volumechange", function () {
                if (g.gate) {
                    f.options.volume = e.volume;
                    f.options.muted = e.muted;
                    f._updateMute();
                    f._updateVolume();
                    f._trigger(c.jPlayer.event.volumechange)
                }
            }, false);
            e.addEventListener("suspend", function () {
                if (g.gate) {
                    f._seeked();
                    f._trigger(c.jPlayer.event.suspend)
                }
            }, false);
            e.addEventListener("ended", function () {
                if (g.gate) {
                    if (!c.jPlayer.browser.webkit) {
                        f.htmlElement.media.currentTime = 0
                    }
                    f.htmlElement.media.pause();
                    f._updateButtons(false);
                    f._getHtmlStatus(e, true);
                    f._updateInterface();
                    f._trigger(c.jPlayer.event.ended)
                }
            }, false);
            e.addEventListener("error", function () {
                if (g.gate) {
                    f._updateButtons(false);
                    f._seeked();
                    if (f.status.srcSet) {
                        clearTimeout(f.internal.htmlDlyCmdId);
                        f.status.waitForLoad = true;
                        f.status.waitForPlay = true;
                        if (f.status.video && !f.status.nativeVideoControls) {
                            f.internal.video.jq.css({
                                width: "0px",
                                height: "0px"
                            })
                        }
                        if (f._validString(f.status.media.poster) && !f.status.nativeVideoControls) {
                            f.internal.poster.jq.show()
                        }
                        if (f.css.jq.videoPlay.length) {
                            f.css.jq.videoPlay.show()
                        }
                        f._error({
                            type: c.jPlayer.error.URL,
                            context: f.status.src,
                            message: c.jPlayer.errorMsg.URL,
                            hint: c.jPlayer.errorHint.URL
                        })
                    }
                }
            }, false);
            c.each(c.jPlayer.htmlEvent, function (j, h) {
                e.addEventListener(this, function () {
                    if (g.gate) {
                        f._trigger(c.jPlayer.event[h])
                    }
                }, false)
            })
        },
        _getHtmlStatus: function (j, f) {
            var e = 0,
                l = 0,
                g = 0,
                h = 0,
                m = 0;
            if (j.duration) {
                this.status.duration = j.duration
            }
            e = j.currentTime;
            g = (this.status.duration > 0) ? 100 * e / this.status.duration : 0;
            if ((typeof j.seekable === "object") && (j.seekable.length > 0)) {
                h = (this.status.duration > 0) ? 100 * j.seekable.end(j.seekable.length - 1) / this.status.duration : 100;
                m = 100 * j.currentTime / j.seekable.end(j.seekable.length - 1)
            } else {
                h = 100;
                m = g
            }
            if (f) {
                e = 0;
                m = 0;
                g = 0
            }
            this.status.seekPercent = h;
            this.status.currentPercentRelative = m;
            this.status.currentPercentAbsolute = g;
            this.status.currentTime = e;
            this.status.readyState = j.readyState;
            this.status.networkState = j.networkState;
            this.status.playbackRate = j.playbackRate;
            this.status.ended = j.ended
        },
        _resetStatus: function () {
            this.status = c.extend({}, this.status, c.jPlayer.prototype.status)
        },
        _trigger: function (f, e, g) {
            var h = c.Event(f);
            h.jPlayer = {};
            h.jPlayer.version = c.extend({}, this.version);
            h.jPlayer.options = c.extend(true, {}, this.options);
            h.jPlayer.status = c.extend(true, {}, this.status);
            h.jPlayer.html = c.extend(true, {}, this.html);
            h.jPlayer.flash = c.extend(true, {}, this.flash);
            if (e) {
                h.jPlayer.error = c.extend({}, e)
            }
            if (g) {
                h.jPlayer.warning = c.extend({}, g)
            }
            this.element.trigger(h)
        },
        jPlayerFlashEvent: function (g, e) {
            if (g === c.jPlayer.event.ready) {
                if (!this.internal.ready) {
                    this.internal.ready = true;
                    this.internal.flash.jq.css({
                        width: "0px",
                        height: "0px"
                    });
                    this.version.flash = e.version;
                    if (this.version.needFlash !== this.version.flash) {
                        this._error({
                            type: c.jPlayer.error.VERSION,
                            context: this.version.flash,
                            message: c.jPlayer.errorMsg.VERSION + this.version.flash,
                            hint: c.jPlayer.errorHint.VERSION
                        })
                    }
                    this._trigger(c.jPlayer.event.repeat);
                    this._trigger(g)
                } else {
                    if (this.flash.gate) {
                        if (this.status.srcSet) {
                            var h = this.status.currentTime,
                                f = this.status.paused;
                            this.setMedia(this.status.media);
                            if (h > 0) {
                                if (f) {
                                    this.pause(h)
                                } else {
                                    this.play(h)
                                }
                            }
                        }
                        this._trigger(c.jPlayer.event.flashreset)
                    }
                }
            }
            if (this.flash.gate) {
                switch (g) {
                case c.jPlayer.event.progress:
                    this._getFlashStatus(e);
                    this._updateInterface();
                    this._trigger(g);
                    break;
                case c.jPlayer.event.timeupdate:
                    this._getFlashStatus(e);
                    this._updateInterface();
                    this._trigger(g);
                    break;
                case c.jPlayer.event.play:
                    this._seeked();
                    this._updateButtons(true);
                    this._trigger(g);
                    break;
                case c.jPlayer.event.pause:
                    this._updateButtons(false);
                    this._trigger(g);
                    break;
                case c.jPlayer.event.ended:
                    this._updateButtons(false);
                    this._trigger(g);
                    break;
                case c.jPlayer.event.click:
                    this._trigger(g);
                    break;
                case c.jPlayer.event.error:
                    this.status.waitForLoad = true;
                    this.status.waitForPlay = true;
                    if (this.status.video) {
                        this.internal.flash.jq.css({
                            width: "0px",
                            height: "0px"
                        })
                    }
                    if (this._validString(this.status.media.poster)) {
                        this.internal.poster.jq.show()
                    }
                    if (this.css.jq.videoPlay.length && this.status.video) {
                        this.css.jq.videoPlay.show()
                    }
                    if (this.status.video) {
                        this._flash_setVideo(this.status.media)
                    } else {
                        this._flash_setAudio(this.status.media)
                    }
                    this._updateButtons(false);
                    this._error({
                        type: c.jPlayer.error.URL,
                        context: e.src,
                        message: c.jPlayer.errorMsg.URL,
                        hint: c.jPlayer.errorHint.URL
                    });
                    break;
                case c.jPlayer.event.seeking:
                    this._seeking();
                    this._trigger(g);
                    break;
                case c.jPlayer.event.seeked:
                    this._seeked();
                    this._trigger(g);
                    break;
                case c.jPlayer.event.ready:
                    break;
                default:
                    this._trigger(g)
                }
            }
            return false
        },
        _getFlashStatus: function (e) {
            e.duration = sz.app.data.TrackHistory.last().toJSON().duration;
            e.currentPercentRelative = (100 * e.currentTime) / e.duration;
            this.status.seekPercent = e.seekPercent;
            this.status.currentPercentRelative = e.currentPercentRelative;
            this.status.currentPercentAbsolute = e.currentPercentAbsolute;
            this.status.currentTime = e.currentTime;
            this.status.duration = e.duration;
            this.status.readyState = 4;
            this.status.networkState = 0;
            this.status.playbackRate = 1;
            this.status.ended = false
        },
        _updateButtons: function (e) {
            if (e !== d) {
                this.status.paused = !e;
                if (this.css.jq.play.length && this.css.jq.pause.length) {
                    if (e) {
                        this.css.jq.play.hide();
                        this.css.jq.pause.show()
                    } else {
                        this.css.jq.play.show();
                        this.css.jq.pause.hide()
                    }
                }
            }
            if (this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length) {
                if (this.status.noFullScreen) {
                    this.css.jq.fullScreen.hide();
                    this.css.jq.restoreScreen.hide()
                } else {
                    if (this.options.fullScreen) {
                        this.css.jq.fullScreen.hide();
                        this.css.jq.restoreScreen.show()
                    } else {
                        this.css.jq.fullScreen.show();
                        this.css.jq.restoreScreen.hide()
                    }
                }
            }
            if (this.css.jq.repeat.length && this.css.jq.repeatOff.length) {
                if (this.options.loop) {
                    this.css.jq.repeat.hide();
                    this.css.jq.repeatOff.show()
                } else {
                    this.css.jq.repeat.show();
                    this.css.jq.repeatOff.hide()
                }
            }
        },
        _updateInterface: function () {
            if (this.css.jq.seekBar.length) {
                this.css.jq.seekBar.width(this.status.seekPercent + "%")
            }
            if (this.css.jq.playBar.length) {
                this.css.jq.playBar.width(this.status.currentPercentRelative + "%")
            }
            if (this.css.jq.currentTime.length) {
                this.css.jq.currentTime.text(c.jPlayer.convertTime(this.status.currentTime))
            }
            if (this.css.jq.duration.length) {
                this.css.jq.duration.text(c.jPlayer.convertTime(this.status.duration))
            }
        },
        _seeking: function () {
            if (this.css.jq.seekBar.length) {
                this.css.jq.seekBar.addClass("jp-seeking-bg")
            }
        },
        _seeked: function () {
            if (this.css.jq.seekBar.length) {
                this.css.jq.seekBar.removeClass("jp-seeking-bg")
            }
        },
        _resetGate: function () {
            this.html.audio.gate = false;
            this.html.video.gate = false;
            this.flash.gate = false
        },
        _resetActive: function () {
            this.html.active = false;
            this.flash.active = false
        },
        setMedia: function (g) {
            var f = this,
                e = false,
                h = this.status.media.poster !== g.poster;
            this._resetMedia();
            this._resetGate();
            this._resetActive();
            c.each(this.formats, function (j, m) {
                var l = f.format[m].media === "video";
                c.each(f.solutions, function (o, n) {
                    if (f[n].support[m] && f._validString(g[m])) {
                        var p = n === "html";
                        if (l) {
                            if (p) {
                                f.html.video.gate = true;
                                f._html_setVideo(g);
                                f.html.active = true
                            } else {
                                f.flash.gate = true;
                                f._flash_setVideo(g);
                                f.flash.active = true
                            }
                            if (f.css.jq.videoPlay.length) {
                                f.css.jq.videoPlay.show()
                            }
                            f.status.video = true
                        } else {
                            if (p) {
                                f.html.audio.gate = true;
                                f._html_setAudio(g);
                                f.html.active = true
                            } else {
                                f.flash.gate = true;
                                f._flash_setAudio(g);
                                f.flash.active = true
                            }
                            if (f.css.jq.videoPlay.length) {
                                f.css.jq.videoPlay.hide()
                            }
                            f.status.video = false
                        }
                        e = true;
                        return false
                    }
                });
                if (e) {
                    return false
                }
            });
            if (e) {
                if (!(this.status.nativeVideoControls && this.html.video.gate)) {
                    if (this._validString(g.poster)) {
                        if (h) {
                            this.htmlElement.poster.src = g.poster
                        } else {
                            this.internal.poster.jq.show()
                        }
                    }
                }
                this.status.srcSet = true;
                this.status.media = c.extend({}, g);
                this._updateButtons(false);
                this._updateInterface()
            } else {
                this._error({
                    type: c.jPlayer.error.NO_SUPPORT,
                    context: "{supplied:'" + this.options.supplied + "'}",
                    message: c.jPlayer.errorMsg.NO_SUPPORT,
                    hint: c.jPlayer.errorHint.NO_SUPPORT
                })
            }
        },
        _resetMedia: function () {
            this._resetStatus();
            this._updateButtons(false);
            this._updateInterface();
            this._seeked();
            this.internal.poster.jq.hide();
            clearTimeout(this.internal.htmlDlyCmdId);
            if (this.html.active) {
                this._html_resetMedia()
            } else {
                if (this.flash.active) {
                    this._flash_resetMedia()
                }
            }
        },
        clearMedia: function () {
            this._resetMedia();
            if (this.html.active) {
                this._html_clearMedia()
            } else {
                if (this.flash.active) {
                    this._flash_clearMedia()
                }
            }
            this._resetGate();
            this._resetActive()
        },
        load: function () {
            if (this.status.srcSet) {
                if (this.html.active) {
                    this._html_load()
                } else {
                    if (this.flash.active) {
                        this._flash_load()
                    }
                }
            } else {
                this._urlNotSetError("load")
            }
        },
        play: function (e) {
            e = (typeof e === "number") ? e : NaN;
            if (this.status.srcSet) {
                if (this.html.active) {
                    this._html_play(e)
                } else {
                    if (this.flash.active) {
                        this._flash_play(e)
                    }
                }
            } else {
                this._urlNotSetError("play")
            }
        },
        videoPlay: function (f) {
            this.play()
        },
        pause: function (e) {
            e = (typeof e === "number") ? e : NaN;
            if (this.status.srcSet) {
                if (this.html.active) {
                    this._html_pause(e)
                } else {
                    if (this.flash.active) {
                        this._flash_pause(e)
                    }
                }
            } else {
                this._urlNotSetError("pause")
            }
        },
        pauseOthers: function () {
            var e = this;
            c.each(this.instances, function (g, f) {
                if (e.element !== f) {
                    if (f.data("jPlayer").status.srcSet) {
                        f.jPlayer("pause")
                    }
                }
            })
        },
        stop: function () {
            if (this.status.srcSet) {
                if (this.html.active) {
                    this._html_pause(0)
                } else {
                    if (this.flash.active) {
                        this._flash_pause(0)
                    }
                }
            } else {
                this._urlNotSetError("stop")
            }
        },
        playHead: function (e) {
            e = this._limitValue(e, 0, 100);
            if (this.status.srcSet) {
                if (this.html.active) {
                    this._html_playHead(e)
                } else {
                    if (this.flash.active) {
                        this._flash_playHead(e)
                    }
                }
            } else {
                this._urlNotSetError("playHead")
            }
        },
        _muted: function (e) {
            this.options.muted = e;
            if (this.html.used) {
                this._html_mute(e)
            }
            if (this.flash.used) {
                this._flash_mute(e)
            }
            if (!this.html.video.gate && !this.html.audio.gate) {
                this._updateMute(e);
                this._updateVolume(this.options.volume);
                this._trigger(c.jPlayer.event.volumechange)
            }
        },
        mute: function (e) {
            e = e === d ? true : !! e;
            this._muted(e)
        },
        unmute: function (e) {
            e = e === d ? true : !! e;
            this._muted(!e)
        },
        _updateMute: function (e) {
            if (e === d) {
                e = this.options.muted
            }
            if (this.css.jq.mute.length && this.css.jq.unmute.length) {
                if (this.status.noVolume) {
                    this.css.jq.mute.hide();
                    this.css.jq.unmute.hide()
                } else {
                    if (e) {
                        this.css.jq.mute.hide();
                        this.css.jq.unmute.show()
                    } else {
                        this.css.jq.mute.show();
                        this.css.jq.unmute.hide()
                    }
                }
            }
        },
        volume: function (e) {
            e = this._limitValue(e, 0, 1);
            this.options.volume = e;
            if (this.html.used) {
                this._html_volume(e)
            }
            if (this.flash.used) {
                this._flash_volume(e)
            }
            if (!this.html.video.gate && !this.html.audio.gate) {
                this._updateVolume(e);
                this._trigger(c.jPlayer.event.volumechange)
            }
        },
        volumeBar: function (l) {
            if (this.css.jq.volumeBar.length) {
                var m = this.css.jq.volumeBar.offset(),
                    f = l.pageX - m.left,
                    g = this.css.jq.volumeBar.width(),
                    n = this.css.jq.volumeBar.height() - l.pageY + m.top,
                    j = this.css.jq.volumeBar.height();
                if (this.options.verticalVolume) {
                    this.volume(n / j)
                } else {
                    this.volume(f / g)
                }
            }
            if (this.options.muted) {
                this._muted(false)
            }
        },
        volumeBarValue: function (f) {
            this.volumeBar(f)
        },
        _updateVolume: function (e) {
            if (e === d) {
                e = this.options.volume
            }
            e = this.options.muted ? 0 : e;
            if (this.status.noVolume) {
                if (this.css.jq.volumeBar.length) {
                    this.css.jq.volumeBar.hide()
                }
                if (this.css.jq.volumeBarValue.length) {
                    this.css.jq.volumeBarValue.hide()
                }
                if (this.css.jq.volumeMax.length) {
                    this.css.jq.volumeMax.hide()
                }
            } else {
                if (this.css.jq.volumeBar.length) {
                    this.css.jq.volumeBar.show()
                }
                if (this.css.jq.volumeBarValue.length) {
                    this.css.jq.volumeBarValue.show();
                    this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"]((e * 100) + "%")
                }
                if (this.css.jq.volumeMax.length) {
                    this.css.jq.volumeMax.show()
                }
            }
        },
        volumeMax: function () {
            this.volume(1);
            if (this.options.muted) {
                this._muted(false)
            }
        },
        _cssSelectorAncestor: function (f) {
            var e = this;
            this.options.cssSelectorAncestor = f;
            this._removeUiClass();
            this.ancestorJq = f ? c(f) : [];
            if (f && this.ancestorJq.length !== 1) {
                this._warning({
                    type: c.jPlayer.warning.CSS_SELECTOR_COUNT,
                    context: f,
                    message: c.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
                    hint: c.jPlayer.warningHint.CSS_SELECTOR_COUNT
                })
            }
            this._addUiClass();
            c.each(this.options.cssSelector, function (g, h) {
                e._cssSelector(g, h)
            })
        },
        _cssSelector: function (g, h) {
            var e = this;
            if (typeof h === "string") {
                if (c.jPlayer.prototype.options.cssSelector[g]) {
                    if (this.css.jq[g] && this.css.jq[g].length) {
                        this.css.jq[g].unbind(".jPlayer")
                    }
                    this.options.cssSelector[g] = h;
                    this.css.cs[g] = this.options.cssSelectorAncestor + " " + h;
                    if (h) {
                        this.css.jq[g] = c(this.css.cs[g])
                    } else {
                        this.css.jq[g] = []
                    }
                    if (this.css.jq[g].length) {
                        var f = function (j) {
                                e[g](j);
                                c(this).blur();
                                return false
                            };
                        this.css.jq[g].bind("click.jPlayer", f)
                    }
                    if (h && this.css.jq[g].length !== 1) {
                        this._warning({
                            type: c.jPlayer.warning.CSS_SELECTOR_COUNT,
                            context: this.css.cs[g],
                            message: c.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[g].length + " found for " + g + " method.",
                            hint: c.jPlayer.warningHint.CSS_SELECTOR_COUNT
                        })
                    }
                } else {
                    this._warning({
                        type: c.jPlayer.warning.CSS_SELECTOR_METHOD,
                        context: g,
                        message: c.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
                        hint: c.jPlayer.warningHint.CSS_SELECTOR_METHOD
                    })
                }
            } else {
                this._warning({
                    type: c.jPlayer.warning.CSS_SELECTOR_STRING,
                    context: h,
                    message: c.jPlayer.warningMsg.CSS_SELECTOR_STRING,
                    hint: c.jPlayer.warningHint.CSS_SELECTOR_STRING
                })
            }
        },
        seekBar: function (j) {
            if (this.css.jq.seekBar) {
                var l = this.css.jq.seekBar.offset();
                var f = j.pageX - l.left;
                var g = this.css.jq.seekBar.width();
                var h = 100 * f / g;
                this.playHead(h)
            }
        },
        playBar: function (f) {
            this.seekBar(f)
        },
        repeat: function () {
            this._loop(true)
        },
        repeatOff: function () {
            this._loop(false)
        },
        _loop: function (e) {
            if (this.options.loop !== e) {
                this.options.loop = e;
                this._updateButtons();
                this._trigger(c.jPlayer.event.repeat)
            }
        },
        currentTime: function (f) {},
        duration: function (f) {},
        gui: function (f) {},
        noSolution: function (f) {},
        option: function (l, o) {
            var f = l;
            if (arguments.length === 0) {
                return c.extend(true, {}, this.options)
            }
            if (typeof l === "string") {
                var n = l.split(".");
                if (o === d) {
                    var h = c.extend(true, {}, this.options);
                    for (var g = 0; g < n.length; g++) {
                        if (h[n[g]] !== d) {
                            h = h[n[g]]
                        } else {
                            this._warning({
                                type: c.jPlayer.warning.OPTION_KEY,
                                context: l,
                                message: c.jPlayer.warningMsg.OPTION_KEY,
                                hint: c.jPlayer.warningHint.OPTION_KEY
                            });
                            return d
                        }
                    }
                    return h
                }
                f = {};
                var m = f;
                for (var e = 0; e < n.length; e++) {
                    if (e < n.length - 1) {
                        m[n[e]] = {};
                        m = m[n[e]]
                    } else {
                        m[n[e]] = o
                    }
                }
            }
            this._setOptions(f);
            return this
        },
        _setOptions: function (f) {
            var e = this;
            c.each(f, function (g, h) {
                e._setOption(g, h)
            });
            return this
        },
        _setOption: function (f, g) {
            var e = this;
            switch (f) {
            case "volume":
                this.volume(g);
                break;
            case "muted":
                this._muted(g);
                break;
            case "cssSelectorAncestor":
                this._cssSelectorAncestor(g);
                break;
            case "cssSelector":
                c.each(g, function (h, j) {
                    e._cssSelector(h, j)
                });
                break;
            case "fullScreen":
                if (this.options[f] !== g) {
                    this._removeUiClass();
                    this.options[f] = g;
                    this._refreshSize()
                }
                break;
            case "size":
                if (!this.options.fullScreen && this.options[f].cssClass !== g.cssClass) {
                    this._removeUiClass()
                }
                this.options[f] = c.extend({}, this.options[f], g);
                this._refreshSize();
                break;
            case "sizeFull":
                if (this.options.fullScreen && this.options[f].cssClass !== g.cssClass) {
                    this._removeUiClass()
                }
                this.options[f] = c.extend({}, this.options[f], g);
                this._refreshSize();
                break;
            case "autohide":
                this.options[f] = c.extend({}, this.options[f], g);
                this._updateAutohide();
                break;
            case "loop":
                this._loop(g);
                break;
            case "nativeVideoControls":
                this.options[f] = c.extend({}, this.options[f], g);
                this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
                this._restrictNativeVideoControls();
                this._updateNativeVideoControls();
                break;
            case "noFullScreen":
                this.options[f] = c.extend({}, this.options[f], g);
                this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
                this.status.noFullScreen = this._uaBlocklist(this.options.noFullScreen);
                this._restrictNativeVideoControls();
                this._updateButtons();
                break;
            case "noVolume":
                this.options[f] = c.extend({}, this.options[f], g);
                this.status.noVolume = this._uaBlocklist(this.options.noVolume);
                this._updateVolume();
                this._updateMute();
                break;
            case "emulateHtml":
                if (this.options[f] !== g) {
                    this.options[f] = g;
                    if (g) {
                        this._emulateHtmlBridge()
                    } else {
                        this._destroyHtmlBridge()
                    }
                }
                break
            }
            return this
        },
        _refreshSize: function () {
            this._setSize();
            this._addUiClass();
            this._updateSize();
            this._updateButtons();
            this._updateAutohide();
            this._trigger(c.jPlayer.event.resize)
        },
        _setSize: function () {
            if (this.options.fullScreen) {
                this.status.width = this.options.sizeFull.width;
                this.status.height = this.options.sizeFull.height;
                this.status.cssClass = this.options.sizeFull.cssClass
            } else {
                this.status.width = this.options.size.width;
                this.status.height = this.options.size.height;
                this.status.cssClass = this.options.size.cssClass
            }
            this.element.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _addUiClass: function () {
            if (this.ancestorJq.length) {
                this.ancestorJq.addClass(this.status.cssClass)
            }
        },
        _removeUiClass: function () {
            if (this.ancestorJq.length) {
                this.ancestorJq.removeClass(this.status.cssClass)
            }
        },
        _updateSize: function () {
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            });
            if (!this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls) {
                this.internal.video.jq.css({
                    width: this.status.width,
                    height: this.status.height
                })
            } else {
                if (!this.status.waitForPlay && this.flash.active && this.status.video) {
                    this.internal.flash.jq.css({
                        width: this.status.width,
                        height: this.status.height
                    })
                }
            }
        },
        _updateAutohide: function () {
            var e = this,
                j = "mousemove.jPlayer",
                h = ".jPlayerAutohide",
                f = j + h,
                g = function () {
                    e.css.jq.gui.fadeIn(e.options.autohide.fadeIn, function () {
                        clearTimeout(e.internal.autohideId);
                        e.internal.autohideId = setTimeout(function () {
                            e.css.jq.gui.fadeOut(e.options.autohide.fadeOut)
                        }, e.options.autohide.hold)
                    })
                };
            if (this.css.jq.gui.length) {
                this.css.jq.gui.stop(true, true);
                clearTimeout(this.internal.autohideId);
                this.element.unbind(h);
                this.css.jq.gui.unbind(h);
                if (!this.status.nativeVideoControls) {
                    if (this.options.fullScreen && this.options.autohide.full || !this.options.fullScreen && this.options.autohide.restored) {
                        this.element.bind(f, g);
                        this.css.jq.gui.bind(f, g);
                        this.css.jq.gui.hide()
                    } else {
                        this.css.jq.gui.show()
                    }
                } else {
                    this.css.jq.gui.hide()
                }
            }
        },
        fullScreen: function () {
            this._setOption("fullScreen", true)
        },
        restoreScreen: function () {
            this._setOption("fullScreen", false)
        },
        _html_initMedia: function () {
            this.htmlElement.media.src = this.status.src;
            if (this.options.preload !== "none") {
                this._html_load()
            }
            this._trigger(c.jPlayer.event.timeupdate)
        },
        _html_setAudio: function (f) {
            var e = this;
            c.each(this.formats, function (g, h) {
                if (e.html.support[h] && f[h]) {
                    e.status.src = f[h];
                    e.status.format[h] = true;
                    e.status.formatType = h;
                    return false
                }
            });
            this.htmlElement.media = this.htmlElement.audio;
            this._html_initMedia()
        },
        _html_setVideo: function (f) {
            var e = this;
            c.each(this.formats, function (g, h) {
                if (e.html.support[h] && f[h]) {
                    e.status.src = f[h];
                    e.status.format[h] = true;
                    e.status.formatType = h;
                    return false
                }
            });
            if (this.status.nativeVideoControls) {
                this.htmlElement.video.poster = this._validString(f.poster) ? f.poster : ""
            }
            this.htmlElement.media = this.htmlElement.video;
            this._html_initMedia()
        },
        _html_resetMedia: function () {
            if (this.htmlElement.media) {
                if (this.htmlElement.media.id === this.internal.video.id && !this.status.nativeVideoControls) {
                    this.internal.video.jq.css({
                        width: "0px",
                        height: "0px"
                    })
                }
                this.htmlElement.media.pause()
            }
        },
        _html_clearMedia: function () {
            if (this.htmlElement.media) {
                this.htmlElement.media.src = "";
                this.htmlElement.media.load()
            }
        },
        _html_load: function () {
            if (this.status.waitForLoad) {
                this.status.waitForLoad = false;
                this.htmlElement.media.load()
            }
            clearTimeout(this.internal.htmlDlyCmdId)
        },
        _html_play: function (g) {
            var e = this;
            this._html_load();
            this.htmlElement.media.play();
            if (!isNaN(g)) {
                try {
                    this.htmlElement.media.currentTime = g
                } catch (f) {
                    this.internal.htmlDlyCmdId = setTimeout(function () {
                        e.play(g)
                    }, 100);
                    return
                }
            }
            this._html_checkWaitForPlay()
        },
        _html_pause: function (g) {
            var e = this;
            if (g > 0) {
                this._html_load()
            } else {
                clearTimeout(this.internal.htmlDlyCmdId)
            }
            this.htmlElement.media.pause();
            if (!isNaN(g)) {
                try {
                    this.htmlElement.media.currentTime = g
                } catch (f) {
                    this.internal.htmlDlyCmdId = setTimeout(function () {
                        e.pause(g)
                    }, 100);
                    return
                }
            }
            if (g > 0) {
                this._html_checkWaitForPlay()
            }
        },
        _html_playHead: function (g) {
            var e = this;
            this._html_load();
            try {
                if ((typeof this.htmlElement.media.seekable === "object") && (this.htmlElement.media.seekable.length > 0)) {
                    this.htmlElement.media.currentTime = g * this.htmlElement.media.seekable.end(this.htmlElement.media.seekable.length - 1) / 100
                } else {
                    if (this.htmlElement.media.duration > 0 && !isNaN(this.htmlElement.media.duration)) {
                        this.htmlElement.media.currentTime = g * this.htmlElement.media.duration / 100
                    } else {
                        throw "e"
                    }
                }
            } catch (f) {
                this.internal.htmlDlyCmdId = setTimeout(function () {
                    e.playHead(g)
                }, 100);
                return
            }
            if (!this.status.waitForLoad) {
                this._html_checkWaitForPlay()
            }
        },
        _html_checkWaitForPlay: function () {
            if (this.status.waitForPlay) {
                this.status.waitForPlay = false;
                if (this.css.jq.videoPlay.length) {
                    this.css.jq.videoPlay.hide()
                }
                if (this.status.video) {
                    this.internal.poster.jq.hide();
                    this.internal.video.jq.css({
                        width: this.status.width,
                        height: this.status.height
                    })
                }
            }
        },
        _html_volume: function (e) {
            if (this.html.audio.available) {
                this.htmlElement.audio.volume = e
            }
            if (this.html.video.available) {
                this.htmlElement.video.volume = e
            }
        },
        _html_mute: function (e) {
            if (this.html.audio.available) {
                this.htmlElement.audio.muted = e
            }
            if (this.html.video.available) {
                this.htmlElement.video.muted = e
            }
        },
        _flash_setAudio: function (g) {
            var e = this;
            try {
                c.each(this.formats, function (h, j) {
                    if (e.flash.support[j] && g[j]) {
                        switch (j) {
                        case "m4a":
                        case "fla":
                            e._getMovie().fl_setAudio_m4a(g[j]);
                            break;
                        case "mp3":
                            e._getMovie().fl_setAudio_mp3(g[j]);
                            break
                        }
                        e.status.src = g[j];
                        e.status.format[j] = true;
                        e.status.formatType = j;
                        return false
                    }
                });
                if (this.options.preload === "auto") {
                    this._flash_load();
                    this.status.waitForLoad = false
                }
            } catch (f) {
                this._flashError(f)
            }
        },
        _flash_setVideo: function (g) {
            var e = this;
            try {
                c.each(this.formats, function (h, j) {
                    if (e.flash.support[j] && g[j]) {
                        switch (j) {
                        case "m4v":
                        case "flv":
                            e._getMovie().fl_setVideo_m4v(g[j]);
                            break
                        }
                        e.status.src = g[j];
                        e.status.format[j] = true;
                        e.status.formatType = j;
                        return false
                    }
                });
                if (this.options.preload === "auto") {
                    this._flash_load();
                    this.status.waitForLoad = false
                }
            } catch (f) {
                this._flashError(f)
            }
        },
        _flash_resetMedia: function () {
            this.internal.flash.jq.css({
                width: "0px",
                height: "0px"
            });
            this._flash_pause(NaN)
        },
        _flash_clearMedia: function () {
            try {
                this._getMovie().fl_clearMedia()
            } catch (e) {
                this._flashError(e)
            }
        },
        _flash_load: function () {
            try {
                this._getMovie().fl_load()
            } catch (e) {
                this._flashError(e)
            }
            this.status.waitForLoad = false
        },
        _flash_play: function (f) {
            try {
                this._getMovie().fl_play(f)
            } catch (e) {
                this._flashError(e)
            }
            this.status.waitForLoad = false;
            this._flash_checkWaitForPlay()
        },
        _flash_pause: function (f) {
            try {
                this._getMovie().fl_pause(f)
            } catch (e) {
                this._flashError(e)
            }
            if (f > 0) {
                this.status.waitForLoad = false;
                this._flash_checkWaitForPlay()
            }
        },
        _flash_playHead: function (f) {
            try {
                this._getMovie().fl_play_head(f)
            } catch (e) {
                this._flashError(e)
            }
            if (!this.status.waitForLoad) {
                this._flash_checkWaitForPlay()
            }
        },
        _flash_checkWaitForPlay: function () {
            if (this.status.waitForPlay) {
                this.status.waitForPlay = false;
                if (this.css.jq.videoPlay.length) {
                    this.css.jq.videoPlay.hide()
                }
                if (this.status.video) {
                    this.internal.poster.jq.hide();
                    this.internal.flash.jq.css({
                        width: this.status.width,
                        height: this.status.height
                    })
                }
            }
        },
        _flash_volume: function (e) {
            try {
                this._getMovie().fl_volume(e)
            } catch (f) {
                this._flashError(f)
            }
        },
        _flash_mute: function (e) {
            try {
                this._getMovie().fl_mute(e)
            } catch (f) {
                this._flashError(f)
            }
        },
        _getMovie: function () {
            return document[this.internal.flash.id]
        },
        _checkForFlash: function (g) {
            var f = false;
            var j;
            if (window.ActiveXObject) {
                try {
                    j = new ActiveXObject(("ShockwaveFlash.ShockwaveFlash." + g));
                    f = true
                } catch (l) {}
            } else {
                if (navigator.plugins && navigator.mimeTypes.length > 0) {
                    j = navigator.plugins["Shockwave Flash"];
                    if (j) {
                        var h = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1");
                        if (h >= g) {
                            f = true
                        }
                    }
                }
            }
            return f
        },
        _validString: function (e) {
            return (e && typeof e === "string")
        },
        _limitValue: function (g, f, e) {
            return (g < f) ? f : ((g > e) ? e : g)
        },
        _urlNotSetError: function (e) {
            this._error({
                type: c.jPlayer.error.URL_NOT_SET,
                context: e,
                message: c.jPlayer.errorMsg.URL_NOT_SET,
                hint: c.jPlayer.errorHint.URL_NOT_SET
            })
        },
        _flashError: function (e) {
            var f;
            if (!this.internal.ready) {
                f = "FLASH"
            } else {
                f = "FLASH_DISABLED"
            }
            this._error({
                type: c.jPlayer.error[f],
                context: this.internal.flash.swf,
                message: c.jPlayer.errorMsg[f] + e.message,
                hint: c.jPlayer.errorHint[f]
            });
            this.internal.flash.jq.css({
                width: "1px",
                height: "1px"
            })
        },
        _error: function (e) {
            this._trigger(c.jPlayer.event.error, e);
            if (this.options.errorAlerts) {
                this._alert("Error!" + (e.message ? "\n\n" + e.message : "") + (e.hint ? "\n\n" + e.hint : "") + "\n\nContext: " + e.context)
            }
        },
        _warning: function (e) {
            this._trigger(c.jPlayer.event.warning, d, e);
            if (this.options.warningAlerts) {
                this._alert("Warning!" + (e.message ? "\n\n" + e.message : "") + (e.hint ? "\n\n" + e.hint : "") + "\n\nContext: " + e.context)
            }
        },
        _alert: function (e) {
            alert("jPlayer " + this.version.script + " : id='" + this.internal.self.id + "' : " + e)
        },
        _emulateHtmlBridge: function () {
            var f = this,
                e = c.jPlayer.emulateMethods;
            c.each(c.jPlayer.emulateMethods.split(/\s+/g), function (h, g) {
                f.internal.domNode[g] = function (j) {
                    f[g](j)
                }
            });
            c.each(c.jPlayer.event, function (h, j) {
                var g = true;
                c.each(c.jPlayer.reservedEvent.split(/\s+/g), function (m, l) {
                    if (l === h) {
                        g = false;
                        return false
                    }
                });
                if (g) {
                    f.element.bind(j + ".jPlayer.jPlayerHtml", function () {
                        f._emulateHtmlUpdate();
                        var l = document.createEvent("Event");
                        l.initEvent(h, false, true);
                        f.internal.domNode.dispatchEvent(l)
                    })
                }
            })
        },
        _emulateHtmlUpdate: function () {
            var e = this;
            c.each(c.jPlayer.emulateStatus.split(/\s+/g), function (g, f) {
                e.internal.domNode[f] = e.status[f]
            });
            c.each(c.jPlayer.emulateOptions.split(/\s+/g), function (g, f) {
                e.internal.domNode[f] = e.options[f]
            })
        },
        _destroyHtmlBridge: function () {
            var e = this;
            this.element.unbind(".jPlayerHtml");
            var f = c.jPlayer.emulateMethods + " " + c.jPlayer.emulateStatus + " " + c.jPlayer.emulateOptions;
            c.each(f.split(/\s+/g), function (h, g) {
                delete e.internal.domNode[g]
            })
        }
    };
    c.jPlayer.error = {
        FLASH: "e_flash",
        FLASH_DISABLED: "e_flash_disabled",
        NO_SOLUTION: "e_no_solution",
        NO_SUPPORT: "e_no_support",
        URL: "e_url",
        URL_NOT_SET: "e_url_not_set",
        VERSION: "e_version"
    };
    c.jPlayer.errorMsg = {
        FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",
        FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",
        NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
        NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
        URL: "Media URL could not be loaded.",
        URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
        VERSION: "jPlayer " + c.jPlayer.prototype.version.script + " needs Jplayer.swf version " + c.jPlayer.prototype.version.needFlash + " but found "
    };
    c.jPlayer.errorHint = {
        FLASH: "Check your swfPath option and that Jplayer.swf is there.",
        FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
        NO_SOLUTION: "Review the jPlayer options: support and supplied.",
        NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
        URL: "Check media URL is valid.",
        URL_NOT_SET: "Use setMedia() to set the media URL.",
        VERSION: "Update jPlayer files."
    };
    c.jPlayer.warning = {
        CSS_SELECTOR_COUNT: "e_css_selector_count",
        CSS_SELECTOR_METHOD: "e_css_selector_method",
        CSS_SELECTOR_STRING: "e_css_selector_string",
        OPTION_KEY: "e_option_key"
    };
    c.jPlayer.warningMsg = {
        CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
        CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
        CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
        OPTION_KEY: "The option requested in jPlayer('option') is undefined."
    };
    c.jPlayer.warningHint = {
        CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
        CSS_SELECTOR_METHOD: "Check your method name.",
        CSS_SELECTOR_STRING: "Check your css selector is a string.",
        OPTION_KEY: "Check your option name."
    }
})(jQuery);
jQuery.extend({
    autoHinter: function (d) {
        var f = {
            url: "/api/stations/trackartist/",
            input: jQuery("#create-station input:text"),
            container: jQuery(".results"),
            queryParam: "q",
            delay: 500,
            minChars: 1,
            max: 15,
            formatItem: function () {},
            returnItem: function () {},
            selectItem: function () {},
            createItem: function () {},
            notMatch: function () {}
        };
        d = jQuery.extend(f, d);
        var e, q, b = d.input,
            r = d.container,
            n = false,
            c = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                esc: 27,
                enter: 13,
                backspace: 8
            },
            s = false,
            a = function () {
                r.show()
            },
            g = function () {
                if (!s) {
                    r.hide()
                }
            },
            l = function () {
                r.find("li.selected").removeClass("selected");
                r.find("li:first").addClass("selected");
                h()
            },
            h = function () {
                var v = r.find("li.selected"),
                    u = v.prevAll().length;
                if (v.length > 0) {
                    b.val(d.returnItem(q[u]))
                }
                d.selectItem(q[u]);
                n = true
            },
            p = function () {
                var v = b.val(),
                    u = d.max;
                if (b.val().length < d.minChars) {
                    return false
                }
                data = {};
                data[d.queryParam] = v;
                data.limit = u;
                jQuery.ajax({
                    url: d.url,
                    data: data,
                    success: function (w) {
                        q = w;
                        var x = "<ul>";
                        $.each(w, function () {
                            x += d.formatItem(this)
                        });
                        x += "</ul>";
                        r.html(x).show();
                        r.find("ul li").mouseenter(function () {
                            $(this).addClass("selected").siblings().removeClass("selected")
                        }).click(function () {
                            h();
                            g();
                            d.createItem()
                        });
                        if (w.length === 0) {
                            d.notMatch()
                        } else {
                            d.selectItem(w[0])
                        }
                    }
                })
            },
            o = function () {
                e = setTimeout(p, d.delay)
            },
            j = function () {
                var u = r.find("li.selected"),
                    v = r.find("li:first");
                if (u.length > 0) {
                    if (u[0] == v[0]) {
                        u.removeClass("selected");
                        r.find("li:last").addClass("selected")
                    } else {
                        u.removeClass("selected").prev().addClass("selected")
                    }
                } else {
                    u.removeClass("selected");
                    v.addClass("selected")
                }
            },
            m = function () {
                var u = r.find("li.selected"),
                    v = r.find("li:first");
                if (u.length > 0) {
                    if (u[0] == r.find("li:last")[0]) {
                        u.removeClass("selected");
                        v.addClass("selected")
                    } else {
                        u.removeClass("selected").next().addClass("selected")
                    }
                } else {
                    u.removeClass("selected");
                    v.addClass("selected")
                }
            },
            t = function (v) {
                var u = v.keyCode || v.which;
                switch (u) {
                case c.esc:
                    g();
                    break;
                case c.up:
                    j();
                    break;
                case c.down:
                    m();
                    break;
                case c.enter:
                    if (n) {
                        d.createItem();
                        break
                    }
                    if (r.find("li").length == 1) {
                        l();
                        g()
                    } else {
                        if (r.find("li.selected").length == 1) {
                            h();
                            g()
                        }
                    }
                    break;
                case c.left:
                    break;
                case c.right:
                    break;
                case c.backspace:
                    g();
                    r.find("li.selected").removeClass("selected");
                    n = false;
                    break;
                default:
                    if (typeof e !== "undefined") {
                        clearTimeout(e)
                    }
                    o()
                }
            };
        b.blur(g);
        b.bind($.browser.opera ? "keypress" : "keydown", t);
        r.mousedown(function () {
            s = true
        }).mouseup(function () {
            s = false
        });
        p()
    }
});
var Base64 = (function () {
    var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var b = {
        encode: function (e) {
            var c = "";
            var n, l, h;
            var m, j, g, f;
            var d = 0;
            do {
                n = e.charCodeAt(d++);
                l = e.charCodeAt(d++);
                h = e.charCodeAt(d++);
                m = n >> 2;
                j = ((n & 3) << 4) | (l >> 4);
                g = ((l & 15) << 2) | (h >> 6);
                f = h & 63;
                if (isNaN(l)) {
                    g = f = 64
                } else {
                    if (isNaN(h)) {
                        f = 64
                    }
                }
                c = c + a.charAt(m) + a.charAt(j) + a.charAt(g) + a.charAt(f)
            } while (d < e.length);
            return c
        },
        decode: function (e) {
            var c = "";
            var n, l, h;
            var m, j, g, f;
            var d = 0;
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do {
                m = a.indexOf(e.charAt(d++));
                j = a.indexOf(e.charAt(d++));
                g = a.indexOf(e.charAt(d++));
                f = a.indexOf(e.charAt(d++));
                n = (m << 2) | (j >> 4);
                l = ((j & 15) << 4) | (g >> 2);
                h = ((g & 3) << 6) | f;
                c = c + String.fromCharCode(n);
                if (g != 64) {
                    c = c + String.fromCharCode(l)
                }
                if (f != 64) {
                    c = c + String.fromCharCode(h)
                }
            } while (d < e.length);
            return c
        }
    };
    return b
})();
var MD5 = (function () {
    var q = 0;
    var a = "";
    var n = 8;
    var l = function (t, w) {
            var v = (t & 65535) + (w & 65535);
            var u = (t >> 16) + (w >> 16) + (v >> 16);
            return (u << 16) | (v & 65535)
        };
    var p = function (t, u) {
            return (t << u) | (t >>> (32 - u))
        };
    var b = function (w) {
            var v = [];
            var t = (1 << n) - 1;
            for (var u = 0; u < w.length * n; u += n) {
                v[u >> 5] |= (w.charCodeAt(u / n) & t) << (u % 32)
            }
            return v
        };
    var g = function (v) {
            var w = "";
            var t = (1 << n) - 1;
            for (var u = 0; u < v.length * 32; u += n) {
                w += String.fromCharCode((v[u >> 5] >>> (u % 32)) & t)
            }
            return w
        };
    var s = function (v) {
            var u = q ? "0123456789ABCDEF" : "0123456789abcdef";
            var w = "";
            for (var t = 0; t < v.length * 4; t++) {
                w += u.charAt((v[t >> 2] >> ((t % 4) * 8 + 4)) & 15) + u.charAt((v[t >> 2] >> ((t % 4) * 8)) & 15)
            }
            return w
        };
    var r = function (w) {
            var v = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var y = "";
            var x, t;
            for (var u = 0; u < w.length * 4; u += 3) {
                x = (((w[u >> 2] >> 8 * (u % 4)) & 255) << 16) | (((w[u + 1 >> 2] >> 8 * ((u + 1) % 4)) & 255) << 8) | ((w[u + 2 >> 2] >> 8 * ((u + 2) % 4)) & 255);
                for (t = 0; t < 4; t++) {
                    if (u * 8 + t * 6 > w.length * 32) {
                        y += a
                    } else {
                        y += v.charAt((x >> 6 * (3 - t)) & 63)
                    }
                }
            }
            return y
        };
    var d = function (A, w, v, u, z, y) {
            return l(p(l(l(w, A), l(u, y)), z), v)
        };
    var m = function (w, v, B, A, u, z, y) {
            return d((v & B) | ((~v) & A), w, v, u, z, y)
        };
    var c = function (w, v, B, A, u, z, y) {
            return d((v & A) | (B & (~A)), w, v, u, z, y)
        };
    var o = function (w, v, B, A, u, z, y) {
            return d(v ^ B ^ A, w, v, u, z, y)
        };
    var j = function (w, v, B, A, u, z, y) {
            return d(B ^ (v | (~A)), w, v, u, z, y)
        };
    var f = function (E, z) {
            E[z >> 5] |= 128 << ((z) % 32);
            E[(((z + 64) >>> 9) << 4) + 14] = z;
            var D = 1732584193;
            var C = -271733879;
            var B = -1732584194;
            var A = 271733878;
            var y, w, v, t;
            for (var u = 0; u < E.length; u += 16) {
                y = D;
                w = C;
                v = B;
                t = A;
                D = m(D, C, B, A, E[u + 0], 7, -680876936);
                A = m(A, D, C, B, E[u + 1], 12, -389564586);
                B = m(B, A, D, C, E[u + 2], 17, 606105819);
                C = m(C, B, A, D, E[u + 3], 22, -1044525330);
                D = m(D, C, B, A, E[u + 4], 7, -176418897);
                A = m(A, D, C, B, E[u + 5], 12, 1200080426);
                B = m(B, A, D, C, E[u + 6], 17, -1473231341);
                C = m(C, B, A, D, E[u + 7], 22, -45705983);
                D = m(D, C, B, A, E[u + 8], 7, 1770035416);
                A = m(A, D, C, B, E[u + 9], 12, -1958414417);
                B = m(B, A, D, C, E[u + 10], 17, -42063);
                C = m(C, B, A, D, E[u + 11], 22, -1990404162);
                D = m(D, C, B, A, E[u + 12], 7, 1804603682);
                A = m(A, D, C, B, E[u + 13], 12, -40341101);
                B = m(B, A, D, C, E[u + 14], 17, -1502002290);
                C = m(C, B, A, D, E[u + 15], 22, 1236535329);
                D = c(D, C, B, A, E[u + 1], 5, -165796510);
                A = c(A, D, C, B, E[u + 6], 9, -1069501632);
                B = c(B, A, D, C, E[u + 11], 14, 643717713);
                C = c(C, B, A, D, E[u + 0], 20, -373897302);
                D = c(D, C, B, A, E[u + 5], 5, -701558691);
                A = c(A, D, C, B, E[u + 10], 9, 38016083);
                B = c(B, A, D, C, E[u + 15], 14, -660478335);
                C = c(C, B, A, D, E[u + 4], 20, -405537848);
                D = c(D, C, B, A, E[u + 9], 5, 568446438);
                A = c(A, D, C, B, E[u + 14], 9, -1019803690);
                B = c(B, A, D, C, E[u + 3], 14, -187363961);
                C = c(C, B, A, D, E[u + 8], 20, 1163531501);
                D = c(D, C, B, A, E[u + 13], 5, -1444681467);
                A = c(A, D, C, B, E[u + 2], 9, -51403784);
                B = c(B, A, D, C, E[u + 7], 14, 1735328473);
                C = c(C, B, A, D, E[u + 12], 20, -1926607734);
                D = o(D, C, B, A, E[u + 5], 4, -378558);
                A = o(A, D, C, B, E[u + 8], 11, -2022574463);
                B = o(B, A, D, C, E[u + 11], 16, 1839030562);
                C = o(C, B, A, D, E[u + 14], 23, -35309556);
                D = o(D, C, B, A, E[u + 1], 4, -1530992060);
                A = o(A, D, C, B, E[u + 4], 11, 1272893353);
                B = o(B, A, D, C, E[u + 7], 16, -155497632);
                C = o(C, B, A, D, E[u + 10], 23, -1094730640);
                D = o(D, C, B, A, E[u + 13], 4, 681279174);
                A = o(A, D, C, B, E[u + 0], 11, -358537222);
                B = o(B, A, D, C, E[u + 3], 16, -722521979);
                C = o(C, B, A, D, E[u + 6], 23, 76029189);
                D = o(D, C, B, A, E[u + 9], 4, -640364487);
                A = o(A, D, C, B, E[u + 12], 11, -421815835);
                B = o(B, A, D, C, E[u + 15], 16, 530742520);
                C = o(C, B, A, D, E[u + 2], 23, -995338651);
                D = j(D, C, B, A, E[u + 0], 6, -198630844);
                A = j(A, D, C, B, E[u + 7], 10, 1126891415);
                B = j(B, A, D, C, E[u + 14], 15, -1416354905);
                C = j(C, B, A, D, E[u + 5], 21, -57434055);
                D = j(D, C, B, A, E[u + 12], 6, 1700485571);
                A = j(A, D, C, B, E[u + 3], 10, -1894986606);
                B = j(B, A, D, C, E[u + 10], 15, -1051523);
                C = j(C, B, A, D, E[u + 1], 21, -2054922799);
                D = j(D, C, B, A, E[u + 8], 6, 1873313359);
                A = j(A, D, C, B, E[u + 15], 10, -30611744);
                B = j(B, A, D, C, E[u + 6], 15, -1560198380);
                C = j(C, B, A, D, E[u + 13], 21, 1309151649);
                D = j(D, C, B, A, E[u + 4], 6, -145523070);
                A = j(A, D, C, B, E[u + 11], 10, -1120210379);
                B = j(B, A, D, C, E[u + 2], 15, 718787259);
                C = j(C, B, A, D, E[u + 9], 21, -343485551);
                D = l(D, y);
                C = l(C, w);
                B = l(B, v);
                A = l(A, t)
            }
            return [D, C, B, A]
        };
    var e = function (v, y) {
            var x = b(v);
            if (x.length > 16) {
                x = f(x, v.length * n)
            }
            var t = new Array(16),
                w = new Array(16);
            for (var u = 0; u < 16; u++) {
                t[u] = x[u] ^ 909522486;
                w[u] = x[u] ^ 1549556828
            }
            var z = f(t.concat(b(y)), 512 + y.length * n);
            return f(w.concat(z), 512 + 128)
        };
    var h = {
        hexdigest: function (t) {
            return s(f(b(t), t.length * n))
        },
        b64digest: function (t) {
            return r(f(b(t), t.length * n))
        },
        hash: function (t) {
            return g(f(b(t), t.length * n))
        },
        hmac_hexdigest: function (t, u) {
            return s(e(t, u))
        },
        hmac_b64digest: function (t, u) {
            return r(e(t, u))
        },
        hmac_hash: function (t, u) {
            return g(e(t, u))
        },
        test: function () {
            return MD5.hexdigest("abc") === "900150983cd24fb0d6963f7d28e17f72"
        }
    };
    return h
})();
if (!Function.prototype.bind) {
    Function.prototype.bind = function (e) {
        var d = this;
        var c = Array.prototype.slice;
        var b = Array.prototype.concat;
        var a = c.call(arguments, 1);
        return function () {
            return d.apply(e ? e : this, b.call(a, c.call(arguments, 0)))
        }
    }
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (b) {
        var a = this.length;
        var c = Number(arguments[1]) || 0;
        c = (c < 0) ? Math.ceil(c) : Math.floor(c);
        if (c < 0) {
            c += a
        }
        for (; c < a; c++) {
            if (c in this && this[c] === b) {
                return c
            }
        }
        return -1
    }
}(function (f) {
    var e;
    function c(h, g) {
        return new e.Builder(h, g)
    }
    function a(g) {
        return new e.Builder("message", g)
    }
    function d(g) {
        return new e.Builder("iq", g)
    }
    function b(g) {
        return new e.Builder("presence", g)
    }
    e = {
        VERSION: "0d2a2d7",
        NS: {
            HTTPBIND: "http://jabber.org/protocol/httpbind",
            BOSH: "urn:xmpp:xbosh",
            CLIENT: "jabber:client",
            AUTH: "jabber:iq:auth",
            ROSTER: "jabber:iq:roster",
            PROFILE: "jabber:iq:profile",
            DISCO_INFO: "http://jabber.org/protocol/disco#info",
            DISCO_ITEMS: "http://jabber.org/protocol/disco#items",
            MUC: "http://jabber.org/protocol/muc",
            SASL: "urn:ietf:params:xml:ns:xmpp-sasl",
            STREAM: "http://etherx.jabber.org/streams",
            BIND: "urn:ietf:params:xml:ns:xmpp-bind",
            SESSION: "urn:ietf:params:xml:ns:xmpp-session",
            VERSION: "jabber:iq:version",
            STANZAS: "urn:ietf:params:xml:ns:xmpp-stanzas"
        },
        addNamespace: function (g, h) {
            e.NS[g] = h
        },
        Status: {
            ERROR: 0,
            CONNECTING: 1,
            CONNFAIL: 2,
            AUTHENTICATING: 3,
            AUTHFAIL: 4,
            CONNECTED: 5,
            DISCONNECTED: 6,
            DISCONNECTING: 7,
            ATTACHED: 8
        },
        LogLevel: {
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            FATAL: 4
        },
        ElementType: {
            NORMAL: 1,
            TEXT: 3,
            CDATA: 4
        },
        TIMEOUT: 1.1,
        SECONDARY_TIMEOUT: 0.1,
        forEachChild: function (l, m, j) {
            var h, g;
            for (h = 0; h < l.childNodes.length; h++) {
                g = l.childNodes[h];
                if (g.nodeType == e.ElementType.NORMAL && (!m || this.isTagEqual(g, m))) {
                    j(g)
                }
            }
        },
        isTagEqual: function (h, g) {
            return h.tagName.toLowerCase() == g.toLowerCase()
        },
        _xmlGenerator: null,
        _makeGenerator: function () {
            var g;
            if (document.implementation.createDocument === undefined) {
                g = this._getIEXmlDom();
                g.appendChild(g.createElement("strophe"))
            } else {
                g = document.implementation.createDocument("jabber:client", "strophe", null)
            }
            return g
        },
        xmlGenerator: function () {
            if (!e._xmlGenerator) {
                e._xmlGenerator = e._makeGenerator()
            }
            return e._xmlGenerator
        },
        _getIEXmlDom: function () {
            var h = null;
            var l = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM"];
            for (var j = 0; j < l.length; j++) {
                if (h === null) {
                    try {
                        h = new ActiveXObject(l[j])
                    } catch (g) {
                        h = null
                    }
                } else {
                    break
                }
            }
            return h
        },
        xmlElement: function (j) {
            if (!j) {
                return null
            }
            var m = e.xmlGenerator().createElement(j);
            var g, l, h;
            for (g = 1; g < arguments.length; g++) {
                if (!arguments[g]) {
                    continue
                }
                if (typeof (arguments[g]) == "string" || typeof (arguments[g]) == "number") {
                    m.appendChild(e.xmlTextNode(arguments[g]))
                } else {
                    if (typeof (arguments[g]) == "object" && typeof (arguments[g].sort) == "function") {
                        for (l = 0; l < arguments[g].length; l++) {
                            if (typeof (arguments[g][l]) == "object" && typeof (arguments[g][l].sort) == "function") {
                                m.setAttribute(arguments[g][l][0], arguments[g][l][1])
                            }
                        }
                    } else {
                        if (typeof (arguments[g]) == "object") {
                            for (h in arguments[g]) {
                                if (arguments[g].hasOwnProperty(h)) {
                                    m.setAttribute(h, arguments[g][h])
                                }
                            }
                        }
                    }
                }
            }
            return m
        },
        xmlescape: function (g) {
            return g
        },
        xmlTextNode: function (g) {
            g = e.xmlescape(g);
            return e.xmlGenerator().createTextNode(g)
        },
        getText: function (h) {
            if (!h) {
                return null
            }
            var j = "";
            if (h.childNodes.length === 0 && h.nodeType == e.ElementType.TEXT) {
                j += h.nodeValue
            }
            for (var g = 0; g < h.childNodes.length; g++) {
                if (h.childNodes[g].nodeType == e.ElementType.TEXT) {
                    j += h.childNodes[g].nodeValue
                }
            }
            return j
        },
        copyElement: function (j) {
            var g, h;
            if (j.nodeType == e.ElementType.NORMAL) {
                h = e.xmlElement(j.tagName);
                for (g = 0; g < j.attributes.length; g++) {
                    h.setAttribute(j.attributes[g].nodeName.toLowerCase(), j.attributes[g].value)
                }
                for (g = 0; g < j.childNodes.length; g++) {
                    h.appendChild(e.copyElement(j.childNodes[g]))
                }
            } else {
                if (j.nodeType == e.ElementType.TEXT) {
                    h = e.xmlGenerator().createTextNode(j.nodeValue)
                }
            }
            return h
        },
        escapeNode: function (g) {
            return g.replace(/^\s+|\s+$/g, "").replace(/\\/g, "\\5c").replace(/ /g, "\\20").replace(/\"/g, "\\22").replace(/\&/g, "\\26").replace(/\'/g, "\\27").replace(/\//g, "\\2f").replace(/:/g, "\\3a").replace(/</g, "\\3c").replace(/>/g, "\\3e").replace(/@/g, "\\40")
        },
        unescapeNode: function (g) {
            return g.replace(/\\20/g, " ").replace(/\\22/g, '"').replace(/\\26/g, "&").replace(/\\27/g, "'").replace(/\\2f/g, "/").replace(/\\3a/g, ":").replace(/\\3c/g, "<").replace(/\\3e/g, ">").replace(/\\40/g, "@").replace(/\\5c/g, "\\")
        },
        getNodeFromJid: function (g) {
            if (g.indexOf("@") < 0) {
                return null
            }
            return g.split("@")[0]
        },
        getDomainFromJid: function (g) {
            var h = e.getBareJidFromJid(g);
            if (h.indexOf("@") < 0) {
                return h
            } else {
                var j = h.split("@");
                j.splice(0, 1);
                return j.join("@")
            }
        },
        getResourceFromJid: function (g) {
            var h = g.split("/");
            if (h.length < 2) {
                return null
            }
            h.splice(0, 1);
            return h.join("/")
        },
        getBareJidFromJid: function (g) {
            return g ? g.split("/")[0] : null
        },
        log: function (h, g) {
            return
        },
        debug: function (g) {
            this.log(this.LogLevel.DEBUG, g)
        },
        info: function (g) {
            this.log(this.LogLevel.INFO, g)
        },
        warn: function (g) {
            this.log(this.LogLevel.WARN, g)
        },
        error: function (g) {
            this.log(this.LogLevel.ERROR, g)
        },
        fatal: function (g) {
            this.log(this.LogLevel.FATAL, g)
        },
        serialize: function (j) {
            var g;
            if (!j) {
                return null
            }
            if (typeof (j.tree) === "function") {
                j = j.tree()
            }
            var m = j.nodeName;
            var h, l;
            if (j.getAttribute("_realname")) {
                m = j.getAttribute("_realname")
            }
            g = "<" + m;
            for (h = 0; h < j.attributes.length; h++) {
                if (j.attributes[h].nodeName != "_realname") {
                    g += " " + j.attributes[h].nodeName.toLowerCase() + "='" + j.attributes[h].value.replace(/&/g, "&amp;").replace(/\'/g, "&apos;").replace(/</g, "&lt;") + "'"
                }
            }
            if (j.childNodes.length > 0) {
                g += ">";
                for (h = 0; h < j.childNodes.length; h++) {
                    l = j.childNodes[h];
                    switch (l.nodeType) {
                    case e.ElementType.NORMAL:
                        g += e.serialize(l);
                        break;
                    case e.ElementType.TEXT:
                        g += e.xmlescape(l.nodeValue);
                        break;
                    case e.ElementType.CDATA:
                        g += "<![CDATA[" + l.nodeValue + "]]>"
                    }
                }
                g += "</" + m + ">"
            } else {
                g += "/>"
            }
            return g
        },
        _requestId: 0,
        _connectionPlugins: {},
        addConnectionPlugin: function (g, h) {
            e._connectionPlugins[g] = h
        }
    };
    e.Builder = function (h, g) {
        if (h == "presence" || h == "message" || h == "iq") {
            if (g && !g.xmlns) {
                g.xmlns = e.NS.CLIENT
            } else {
                if (!g) {
                    g = {
                        xmlns: e.NS.CLIENT
                    }
                }
            }
        }
        this.nodeTree = e.xmlElement(h, g);
        this.node = this.nodeTree
    };
    e.Builder.prototype = {
        tree: function () {
            return this.nodeTree
        },
        toString: function () {
            return e.serialize(this.nodeTree)
        },
        up: function () {
            this.node = this.node.parentNode;
            return this
        },
        attrs: function (h) {
            for (var g in h) {
                if (h.hasOwnProperty(g)) {
                    this.node.setAttribute(g, h[g])
                }
            }
            return this
        },
        c: function (h, g, j) {
            var l = e.xmlElement(h, g, j);
            this.node.appendChild(l);
            if (!j) {
                this.node = l
            }
            return this
        },
        cnode: function (j) {
            var m = e.xmlGenerator();
            try {
                var h = (m.importNode !== undefined)
            } catch (l) {
                var h = false
            }
            var g = h ? m.importNode(j, true) : e.copyElement(j);
            this.node.appendChild(g);
            this.node = g;
            return this
        },
        t: function (g) {
            var h = e.xmlTextNode(g);
            this.node.appendChild(h);
            return this
        }
    };
    e.Handler = function (m, l, h, j, o, n, g) {
        this.handler = m;
        this.ns = l;
        this.name = h;
        this.type = j;
        this.id = o;
        this.options = g || {
            matchbare: false
        };
        if (!this.options.matchBare) {
            this.options.matchBare = false
        }
        if (this.options.matchBare) {
            this.from = n ? e.getBareJidFromJid(n) : null
        } else {
            this.from = n
        }
        this.user = true
    };
    e.Handler.prototype = {
        isMatch: function (h) {
            var l;
            var j = null;
            if (this.options.matchBare) {
                j = e.getBareJidFromJid(h.getAttribute("from"))
            } else {
                j = h.getAttribute("from")
            }
            l = false;
            if (!this.ns) {
                l = true
            } else {
                var g = this;
                e.forEachChild(h, null, function (m) {
                    if (m.getAttribute("xmlns") == g.ns) {
                        l = true
                    }
                });
                l = l || h.getAttribute("xmlns") == this.ns
            }
            if (l && (!this.name || e.isTagEqual(h, this.name)) && (!this.type || h.getAttribute("type") == this.type) && (!this.id || h.getAttribute("id") == this.id) && (!this.from || j == this.from)) {
                return true
            }
            return false
        },
        run: function (h) {
            var g = null;
            try {
                g = this.handler(h)
            } catch (j) {
                if (j.sourceURL) {
                    e.fatal("error: " + this.handler + " " + j.sourceURL + ":" + j.line + " - " + j.name + ": " + j.message)
                } else {
                    if (j.fileName) {
                        if (typeof (console) != "undefined") {
                            console.trace();
                            console.error(this.handler, " - error - ", j, j.message)
                        }
                        e.fatal("error: " + this.handler + " " + j.fileName + ":" + j.lineNumber + " - " + j.name + ": " + j.message)
                    } else {
                        e.fatal("error: " + this.handler)
                    }
                }
                throw j
            }
            return g
        },
        toString: function () {
            return "{Handler: " + this.handler + "(" + this.name + "," + this.id + "," + this.ns + ")}"
        }
    };
    e.TimedHandler = function (h, g) {
        this.period = h;
        this.handler = g;
        this.lastCalled = new Date().getTime();
        this.user = true
    };
    e.TimedHandler.prototype = {
        run: function () {
            this.lastCalled = new Date().getTime();
            return this.handler()
        },
        reset: function () {
            this.lastCalled = new Date().getTime()
        },
        toString: function () {
            return "{TimedHandler: " + this.handler + "(" + this.period + ")}"
        }
    };
    e.Request = function (j, h, g, l) {
        this.id = ++e._requestId;
        this.xmlData = j;
        this.data = e.serialize(j);
        this.origFunc = h;
        this.func = h;
        this.rid = g;
        this.date = NaN;
        this.sends = l || 0;
        this.abort = false;
        this.dead = null;
        this.age = function () {
            if (!this.date) {
                return 0
            }
            var m = new Date();
            return (m - this.date) / 1000
        };
        this.timeDead = function () {
            if (!this.dead) {
                return 0
            }
            var m = new Date();
            return (m - this.dead) / 1000
        };
        this.xhr = this._newXHR()
    };
    e.Request.prototype = {
        getResponse: function () {
            var g = null;
            if (this.xhr.responseXML && this.xhr.responseXML.documentElement) {
                g = this.xhr.responseXML.documentElement;
                if (g.tagName == "parsererror") {
                    e.error("invalid response received");
                    e.error("responseText: " + this.xhr.responseText);
                    e.error("responseXML: " + e.serialize(this.xhr.responseXML));
                    throw "parsererror"
                }
            } else {
                if (this.xhr.responseText) {
                    e.error("invalid response received");
                    e.error("responseText: " + this.xhr.responseText);
                    e.error("responseXML: " + e.serialize(this.xhr.responseXML))
                }
            }
            return g
        },
        _newXHR: function () {
            var g = null;
            if (window.XMLHttpRequest) {
                g = new XMLHttpRequest();
                if (g.overrideMimeType) {
                    g.overrideMimeType("text/xml")
                }
            } else {
                if (window.ActiveXObject) {
                    g = new ActiveXObject("Microsoft.XMLHTTP")
                }
            }
            g.onreadystatechange = this.func.bind(null, this);
            return g
        }
    };
    e.Connection = function (g) {
        this.service = g;
        this.jid = "";
        this.rid = Math.floor(Math.random() * 4294967295);
        this.sid = null;
        this.streamId = null;
        this.features = null;
        this.do_session = false;
        this.do_bind = false;
        this.timedHandlers = [];
        this.handlers = [];
        this.removeTimeds = [];
        this.removeHandlers = [];
        this.addTimeds = [];
        this.addHandlers = [];
        this._idleTimeout = null;
        this._disconnectTimeout = null;
        this.authenticated = false;
        this.disconnecting = false;
        this.connected = false;
        this.errors = 0;
        this.paused = false;
        this.hold = 1;
        this.wait = 60;
        this.window = 5;
        this._data = [];
        this._requests = [];
        this._uniqueId = Math.round(Math.random() * 10000);
        this._sasl_success_handler = null;
        this._sasl_failure_handler = null;
        this._sasl_challenge_handler = null;
        this._idleTimeout = setTimeout(this._onIdle.bind(this), 100);
        for (var h in e._connectionPlugins) {
            if (e._connectionPlugins.hasOwnProperty(h)) {
                var l = e._connectionPlugins[h];
                var j = function () {};
                j.prototype = l;
                this[h] = new j();
                this[h].init(this)
            }
        }
    };
    e.Connection.prototype = {
        reset: function () {
            this.rid = Math.floor(Math.random() * 4294967295);
            this.sid = null;
            this.streamId = null;
            this.do_session = false;
            this.do_bind = false;
            this.timedHandlers = [];
            this.handlers = [];
            this.removeTimeds = [];
            this.removeHandlers = [];
            this.addTimeds = [];
            this.addHandlers = [];
            this.authenticated = false;
            this.disconnecting = false;
            this.connected = false;
            this.errors = 0;
            this._requests = [];
            this._uniqueId = Math.round(Math.random() * 10000)
        },
        pause: function () {
            this.paused = true
        },
        resume: function () {
            this.paused = false
        },
        getUniqueId: function (g) {
            if (typeof (g) == "string" || typeof (g) == "number") {
                return ++this._uniqueId + ":" + g
            } else {
                return ++this._uniqueId + ""
            }
        },
        connect: function (h, j, n, m, l) {
            this.jid = h;
            this.pass = j;
            this.connect_callback = n;
            this.disconnecting = false;
            this.connected = false;
            this.authenticated = false;
            this.errors = 0;
            this.wait = m || this.wait;
            this.hold = l || this.hold;
            this.domain = e.getDomainFromJid(this.jid);
            var g = this._buildBody().attrs({
                to: this.domain,
                "xml:lang": "en",
                wait: this.wait,
                hold: this.hold,
                content: "text/xml; charset=utf-8",
                ver: "1.6",
                "xmpp:version": "1.0",
                "xmlns:xmpp": e.NS.BOSH
            });
            this._changeConnectStatus(e.Status.CONNECTING, null);
            this._requests.push(new e.Request(g.tree(), this._onRequestStateChange.bind(this, this._connect_cb.bind(this)), g.tree().getAttribute("rid")));
            this._throttledRequestHandler()
        },
        attach: function (j, g, l, o, n, m, h) {
            this.jid = j;
            this.sid = g;
            this.rid = l;
            this.connect_callback = o;
            this.domain = e.getDomainFromJid(this.jid);
            this.authenticated = true;
            this.connected = true;
            this.wait = n || this.wait;
            this.hold = m || this.hold;
            this.window = h || this.window;
            this._changeConnectStatus(e.Status.ATTACHED, null)
        },
        xmlInput: function (g) {
            return
        },
        xmlOutput: function (g) {
            return
        },
        rawInput: function (g) {
            return
        },
        rawOutput: function (g) {
            return
        },
        send: function (h) {
            if (h === null) {
                return
            }
            if (typeof (h.sort) === "function") {
                for (var g = 0; g < h.length; g++) {
                    this._queueData(h[g])
                }
            } else {
                if (typeof (h.tree) === "function") {
                    this._queueData(h.tree())
                } else {
                    this._queueData(h)
                }
            }
            this._throttledRequestHandler();
            clearTimeout(this._idleTimeout);
            this._idleTimeout = setTimeout(this._onIdle.bind(this), 100)
        },
        flush: function () {
            clearTimeout(this._idleTimeout);
            this._onIdle()
        },
        sendIQ: function (l, p, g, m) {
            var n = null;
            var j = this;
            if (typeof (l.tree) === "function") {
                l = l.tree()
            }
            var o = l.getAttribute("id");
            if (!o) {
                o = this.getUniqueId("sendIQ");
                l.setAttribute("id", o)
            }
            var h = this.addHandler(function (r) {
                if (n) {
                    j.deleteTimedHandler(n)
                }
                var q = r.getAttribute("type");
                if (q == "result") {
                    if (p) {
                        p(r)
                    }
                } else {
                    if (q == "error") {
                        if (g) {
                            g(r)
                        }
                    } else {
                        throw {
                            name: "StropheError",
                            message: "Got bad IQ type of " + q
                        }
                    }
                }
            }, null, "iq", null, o);
            if (m) {
                n = this.addTimedHandler(m, function () {
                    j.deleteHandler(h);
                    if (g) {
                        g(null)
                    }
                    return false
                })
            }
            this.send(l);
            return o
        },
        _queueData: function (g) {
            if (g === null || !g.tagName || !g.childNodes) {
                throw {
                    name: "StropheError",
                    message: "Cannot queue non-DOMElement."
                }
            }
            this._data.push(g)
        },
        _sendRestart: function () {
            this._data.push("restart");
            this._throttledRequestHandler();
            clearTimeout(this._idleTimeout);
            this._idleTimeout = setTimeout(this._onIdle.bind(this), 100)
        },
        addTimedHandler: function (j, h) {
            var g = new e.TimedHandler(j, h);
            this.addTimeds.push(g);
            return g
        },
        deleteTimedHandler: function (g) {
            this.removeTimeds.push(g)
        },
        addHandler: function (n, m, j, l, p, o, h) {
            var g = new e.Handler(n, m, j, l, p, o, h);
            this.addHandlers.push(g);
            return g
        },
        deleteHandler: function (g) {
            this.removeHandlers.push(g)
        },
        disconnect: function (g) {
            this._changeConnectStatus(e.Status.DISCONNECTING, g);
            e.info("Disconnect was called because: " + g);
            if (this.connected) {
                this._disconnectTimeout = this._addSysTimedHandler(3000, this._onDisconnectTimeout.bind(this));
                this._sendTerminate()
            }
        },
        _changeConnectStatus: function (g, n) {
            for (var h in e._connectionPlugins) {
                if (e._connectionPlugins.hasOwnProperty(h)) {
                    var l = this[h];
                    if (l.statusChanged) {
                        try {
                            l.statusChanged(g, n)
                        } catch (j) {
                            e.error("" + h + " plugin caused an exception changing status: " + j)
                        }
                    }
                }
            }
            if (this.connect_callback) {
                try {
                    this.connect_callback(g, n)
                } catch (m) {
                    e.error("User connection callback caused an exception: " + m)
                }
            }
        },
        _buildBody: function () {
            var g = c("body", {
                rid: this.rid++,
                xmlns: e.NS.HTTPBIND
            });
            if (this.sid !== null) {
                g.attrs({
                    sid: this.sid
                })
            }
            return g
        },
        _removeRequest: function (h) {
            e.debug("removing request");
            var g;
            for (g = this._requests.length - 1; g >= 0; g--) {
                if (h == this._requests[g]) {
                    this._requests.splice(g, 1)
                }
            }
            h.xhr.onreadystatechange = function () {};
            this._throttledRequestHandler()
        },
        _restartRequest: function (g) {
            var h = this._requests[g];
            if (h.dead === null) {
                h.dead = new Date()
            }
            this._processRequest(g)
        },
        _processRequest: function (j) {
            var p = this._requests[j];
            var s = -1;
            try {
                if (p.xhr.readyState == 4) {
                    s = p.xhr.status
                }
            } catch (n) {
                e.error("caught an error in _requests[" + j + "], reqStatus: " + s)
            }
            if (typeof (s) == "undefined") {
                s = -1
            }
            if (p.sends > 5) {
                this._onDisconnectTimeout();
                return
            }
            var h = p.age();
            var g = (!isNaN(h) && h > Math.floor(e.TIMEOUT * this.wait));
            var l = (p.dead !== null && p.timeDead() > Math.floor(e.SECONDARY_TIMEOUT * this.wait));
            var r = (p.xhr.readyState == 4 && (s < 1 || s >= 500));
            if (g || l || r) {
                if (l) {
                    e.error("Request " + this._requests[j].id + " timed out (secondary), restarting")
                }
                p.abort = true;
                p.xhr.abort();
                p.xhr.onreadystatechange = function () {};
                this._requests[j] = new e.Request(p.xmlData, p.origFunc, p.rid, p.sends);
                p = this._requests[j]
            }
            if (p.xhr.readyState === 0) {
                e.debug("request id " + p.id + "." + p.sends + " posting");
                try {
                    p.xhr.open("POST", this.service, true)
                } catch (o) {
                    e.error("XHR open failed.");
                    if (!this.connected) {
                        this._changeConnectStatus(e.Status.CONNFAIL, "bad-service")
                    }
                    this.disconnect();
                    return
                }
                var q = function () {
                        p.date = new Date();
                        p.xhr.send(p.data)
                    };
                if (p.sends > 1) {
                    var m = Math.min(Math.floor(e.TIMEOUT * this.wait), Math.pow(p.sends, 3)) * 1000;
                    setTimeout(q, m)
                } else {
                    q()
                }
                p.sends++;
                if (this.xmlOutput !== e.Connection.prototype.xmlOutput) {
                    this.xmlOutput(p.xmlData)
                }
                if (this.rawOutput !== e.Connection.prototype.rawOutput) {
                    this.rawOutput(p.data)
                }
            } else {
                e.debug("_processRequest: " + (j === 0 ? "first" : "second") + " request has readyState of " + p.xhr.readyState)
            }
        },
        _throttledRequestHandler: function () {
            if (!this._requests) {
                e.debug("_throttledRequestHandler called with undefined requests")
            } else {
                e.debug("_throttledRequestHandler called with " + this._requests.length + " requests")
            }
            if (!this._requests || this._requests.length === 0) {
                return
            }
            if (this._requests.length > 0) {
                this._processRequest(0)
            }
            if (this._requests.length > 1 && Math.abs(this._requests[0].rid - this._requests[1].rid) < this.window) {
                this._processRequest(1)
            }
        },
        _onRequestStateChange: function (l, j) {
            e.debug("request id " + j.id + "." + j.sends + " state changed to " + j.xhr.readyState);
            if (j.abort) {
                j.abort = false;
                return
            }
            var h;
            if (j.xhr.readyState == 4) {
                h = 0;
                try {
                    h = j.xhr.status
                } catch (m) {}
                if (typeof (h) == "undefined") {
                    h = 0
                }
                if (this.disconnecting) {
                    if (h >= 400) {
                        this._hitError(h);
                        return
                    }
                }
                var g = (this._requests[0] == j);
                var n = (this._requests[1] == j);
                if ((h > 0 && h < 500) || j.sends > 5) {
                    this._removeRequest(j);
                    e.debug("request id " + j.id + " should now be removed")
                }
                if (h == 200) {
                    if (n || (g && this._requests.length > 0 && this._requests[0].age() > Math.floor(e.SECONDARY_TIMEOUT * this.wait))) {
                        this._restartRequest(0)
                    }
                    e.debug("request id " + j.id + "." + j.sends + " got 200");
                    l(j);
                    this.errors = 0
                } else {
                    e.error("request id " + j.id + "." + j.sends + " error " + h + " happened");
                    if (h === 0 || (h >= 400 && h < 600) || h >= 12000) {
                        this._hitError(h);
                        if (h >= 400 && h < 500) {
                            this._changeConnectStatus(e.Status.DISCONNECTING, null);
                            this._doDisconnect()
                        }
                    }
                }
                if (!((h > 0 && h < 500) || j.sends > 5)) {
                    this._throttledRequestHandler()
                }
            }
        },
        _hitError: function (g) {
            this.errors++;
            e.warn("request errored, status: " + g + ", number of errors: " + this.errors);
            if (this.errors > 4) {
                this._onDisconnectTimeout()
            }
        },
        _doDisconnect: function () {
            e.info("_doDisconnect was called");
            this.authenticated = false;
            this.disconnecting = false;
            this.sid = null;
            this.streamId = null;
            this.rid = Math.floor(Math.random() * 4294967295);
            if (this.connected) {
                this._changeConnectStatus(e.Status.DISCONNECTED, null);
                this.connected = false
            }
            this.handlers = [];
            this.timedHandlers = [];
            this.removeTimeds = [];
            this.removeHandlers = [];
            this.addTimeds = [];
            this.addHandlers = []
        },
        _dataRecv: function (q) {
            try {
                var g = q.getResponse()
            } catch (o) {
                if (o != "parsererror") {
                    throw o
                }
                this.disconnect("strophe-parsererror")
            }
            if (g === null) {
                return
            }
            if (this.xmlInput !== e.Connection.prototype.xmlInput) {
                this.xmlInput(g)
            }
            if (this.rawInput !== e.Connection.prototype.rawInput) {
                this.rawInput(e.serialize(g))
            }
            var m, j;
            while (this.removeHandlers.length > 0) {
                j = this.removeHandlers.pop();
                m = this.handlers.indexOf(j);
                if (m >= 0) {
                    this.handlers.splice(m, 1)
                }
            }
            while (this.addHandlers.length > 0) {
                this.handlers.push(this.addHandlers.pop())
            }
            if (this.disconnecting && this._requests.length === 0) {
                this.deleteTimedHandler(this._disconnectTimeout);
                this._disconnectTimeout = null;
                this._doDisconnect();
                return
            }
            var h = g.getAttribute("type");
            var p, l;
            if (h !== null && h == "terminate") {
                if (this.disconnecting) {
                    return
                }
                p = g.getAttribute("condition");
                l = g.getElementsByTagName("conflict");
                if (p !== null) {
                    if (p == "remote-stream-error" && l.length > 0) {
                        p = "conflict"
                    }
                    this._changeConnectStatus(e.Status.CONNFAIL, p)
                } else {
                    this._changeConnectStatus(e.Status.CONNFAIL, "unknown")
                }
                this.disconnect();
                return
            }
            var n = this;
            e.forEachChild(g, null, function (v) {
                var s, t;
                t = n.handlers;
                n.handlers = [];
                for (s = 0; s < t.length; s++) {
                    var r = t[s];
                    try {
                        if (r.isMatch(v) && (n.authenticated || !r.user)) {
                            if (r.run(v)) {
                                n.handlers.push(r)
                            }
                        } else {
                            n.handlers.push(r)
                        }
                    } catch (u) {}
                }
            })
        },
        _sendTerminate: function () {
            e.info("_sendTerminate was called");
            var g = this._buildBody().attrs({
                type: "terminate"
            });
            if (this.authenticated) {
                g.c("presence", {
                    xmlns: e.NS.CLIENT,
                    type: "unavailable"
                })
            }
            this.disconnecting = true;
            var h = new e.Request(g.tree(), this._onRequestStateChange.bind(this, this._dataRecv.bind(this)), g.tree().getAttribute("rid"));
            this._requests.push(h);
            this._throttledRequestHandler()
        },
        _connect_cb: function (w) {
            e.info("_connect_cb was called");
            this.connected = true;
            var h = w.getResponse();
            if (!h) {
                return
            }
            if (this.xmlInput !== e.Connection.prototype.xmlInput) {
                this.xmlInput(h)
            }
            if (this.rawInput !== e.Connection.prototype.rawInput) {
                this.rawInput(e.serialize(h))
            }
            var n = h.getAttribute("type");
            var v, p;
            if (n !== null && n == "terminate") {
                v = h.getAttribute("condition");
                p = h.getElementsByTagName("conflict");
                if (v !== null) {
                    if (v == "remote-stream-error" && p.length > 0) {
                        v = "conflict"
                    }
                    this._changeConnectStatus(e.Status.CONNFAIL, v)
                } else {
                    this._changeConnectStatus(e.Status.CONNFAIL, "unknown")
                }
                return
            }
            if (!this.sid) {
                this.sid = h.getAttribute("sid")
            }
            if (!this.stream_id) {
                this.stream_id = h.getAttribute("authid")
            }
            var j = h.getAttribute("requests");
            if (j) {
                this.window = parseInt(j, 10)
            }
            var g = h.getAttribute("hold");
            if (g) {
                this.hold = parseInt(g, 10)
            }
            var r = h.getAttribute("wait");
            if (r) {
                this.wait = parseInt(r, 10)
            }
            var x = false;
            var m = false;
            var u = false;
            var y = h.getElementsByTagName("mechanism");
            var o, t, q, l;
            if (y.length > 0) {
                for (o = 0; o < y.length; o++) {
                    t = e.getText(y[o]);
                    if (t == "DIGEST-MD5") {
                        m = true
                    } else {
                        if (t == "PLAIN") {
                            x = true
                        } else {
                            if (t == "ANONYMOUS") {
                                u = true
                            }
                        }
                    }
                }
            } else {
                var s = this._buildBody();
                this._requests.push(new e.Request(s.tree(), this._onRequestStateChange.bind(this, this._connect_cb.bind(this)), s.tree().getAttribute("rid")));
                this._throttledRequestHandler();
                return
            }
            if (e.getNodeFromJid(this.jid) === null && u) {
                this._changeConnectStatus(e.Status.AUTHENTICATING, null);
                this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
                this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
                this.send(c("auth", {
                    xmlns: e.NS.SASL,
                    mechanism: "ANONYMOUS"
                }).tree())
            } else {
                if (e.getNodeFromJid(this.jid) === null) {
                    this._changeConnectStatus(e.Status.CONNFAIL, "x-strophe-bad-non-anon-jid");
                    this.disconnect()
                } else {
                    if (m) {
                        this._changeConnectStatus(e.Status.AUTHENTICATING, null);
                        this._sasl_challenge_handler = this._addSysHandler(this._sasl_challenge1_cb.bind(this), null, "challenge", null, null);
                        this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
                        this.send(c("auth", {
                            xmlns: e.NS.SASL,
                            mechanism: "DIGEST-MD5"
                        }).tree())
                    } else {
                        if (x) {
                            q = e.getBareJidFromJid(this.jid);
                            q = q + "\u0000";
                            q = q + e.getNodeFromJid(this.jid);
                            q = q + "\u0000";
                            q = q + this.pass;
                            this._changeConnectStatus(e.Status.AUTHENTICATING, null);
                            this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
                            this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
                            l = Base64.encode(q);
                            this.send(c("auth", {
                                xmlns: e.NS.SASL,
                                mechanism: "PLAIN"
                            }).t(l).tree())
                        } else {
                            this._changeConnectStatus(e.Status.AUTHENTICATING, null);
                            this._addSysHandler(this._auth1_cb.bind(this), null, null, null, "_auth_1");
                            this.send(d({
                                type: "get",
                                to: this.domain,
                                id: "_auth_1"
                            }).c("query", {
                                xmlns: e.NS.AUTH
                            }).c("username", {}).t(e.getNodeFromJid(this.jid)).tree())
                        }
                    }
                }
            }
        },
        _sasl_challenge1_cb: function (m) {
            var h = /([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/;
            var s = Base64.decode(e.getText(m));
            var t = MD5.hexdigest("" + (Math.random() * 1234567890));
            var p = "";
            var u = null;
            var q = "";
            var g = "";
            var o;
            this.deleteHandler(this._sasl_failure_handler);
            while (s.match(h)) {
                o = s.match(h);
                s = s.replace(o[0], "");
                o[2] = o[2].replace(/^"(.+)"$/, "$1");
                switch (o[1]) {
                case "realm":
                    p = o[2];
                    break;
                case "nonce":
                    q = o[2];
                    break;
                case "qop":
                    g = o[2];
                    break;
                case "host":
                    u = o[2];
                    break
                }
            }
            var n = "xmpp/" + this.domain;
            if (u !== null) {
                n = n + "/" + u
            }
            var l = MD5.hash(e.getNodeFromJid(this.jid) + ":" + p + ":" + this.pass) + ":" + q + ":" + t;
            var j = "AUTHENTICATE:" + n;
            var r = "";
            r += "username=" + this._quote(e.getNodeFromJid(this.jid)) + ",";
            r += "realm=" + this._quote(p) + ",";
            r += "nonce=" + this._quote(q) + ",";
            r += "cnonce=" + this._quote(t) + ",";
            r += 'nc="00000001",';
            r += 'qop="auth",';
            r += "digest-uri=" + this._quote(n) + ",";
            r += "response=" + this._quote(MD5.hexdigest(MD5.hexdigest(l) + ":" + q + ":00000001:" + t + ":auth:" + MD5.hexdigest(j))) + ",";
            r += 'charset="utf-8"';
            this._sasl_challenge_handler = this._addSysHandler(this._sasl_challenge2_cb.bind(this), null, "challenge", null, null);
            this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
            this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
            this.send(c("response", {
                xmlns: e.NS.SASL
            }).t(Base64.encode(r)).tree());
            return false
        },
        _quote: function (g) {
            return '"' + g.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'
        },
        _sasl_challenge2_cb: function (g) {
            this.deleteHandler(this._sasl_success_handler);
            this.deleteHandler(this._sasl_failure_handler);
            this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
            this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
            this.send(c("response", {
                xmlns: e.NS.SASL
            }).tree());
            return false
        },
        _auth1_cb: function (g) {
            var h = d({
                type: "set",
                id: "_auth_2"
            }).c("query", {
                xmlns: e.NS.AUTH
            }).c("username", {}).t(e.getNodeFromJid(this.jid)).up().c("password").t(this.pass);
            if (!e.getResourceFromJid(this.jid)) {
                this.jid = e.getBareJidFromJid(this.jid) + "/strophe"
            }
            h.up().c("resource", {}).t(e.getResourceFromJid(this.jid));
            this._addSysHandler(this._auth2_cb.bind(this), null, null, null, "_auth_2");
            this.send(h.tree());
            return false
        },
        _sasl_success_cb: function (g) {
            e.info("SASL authentication succeeded.");
            this.deleteHandler(this._sasl_failure_handler);
            this._sasl_failure_handler = null;
            if (this._sasl_challenge_handler) {
                this.deleteHandler(this._sasl_challenge_handler);
                this._sasl_challenge_handler = null
            }
            this._addSysHandler(this._sasl_auth1_cb.bind(this), null, "stream:features", null, null);
            this._sendRestart();
            return false
        },
        _sasl_auth1_cb: function (h) {
            this.features = h;
            var g, l;
            for (g = 0; g < h.childNodes.length; g++) {
                l = h.childNodes[g];
                if (l.nodeName == "bind") {
                    this.do_bind = true
                }
                if (l.nodeName == "session") {
                    this.do_session = true
                }
            }
            if (!this.do_bind) {
                this._changeConnectStatus(e.Status.AUTHFAIL, null);
                return false
            } else {
                this._addSysHandler(this._sasl_bind_cb.bind(this), null, null, null, "_bind_auth_2");
                var j = e.getResourceFromJid(this.jid);
                if (j) {
                    this.send(d({
                        type: "set",
                        id: "_bind_auth_2"
                    }).c("bind", {
                        xmlns: e.NS.BIND
                    }).c("resource", {}).t(j).tree())
                } else {
                    this.send(d({
                        type: "set",
                        id: "_bind_auth_2"
                    }).c("bind", {
                        xmlns: e.NS.BIND
                    }).tree())
                }
            }
            return false
        },
        _sasl_bind_cb: function (g) {
            if (g.getAttribute("type") == "error") {
                e.info("SASL binding failed.");
                this._changeConnectStatus(e.Status.AUTHFAIL, null);
                return false
            }
            var j = g.getElementsByTagName("bind");
            var h;
            if (j.length > 0) {
                h = j[0].getElementsByTagName("jid");
                if (h.length > 0) {
                    this.jid = e.getText(h[0]);
                    if (this.do_session) {
                        this._addSysHandler(this._sasl_session_cb.bind(this), null, null, null, "_session_auth_2");
                        this.send(d({
                            type: "set",
                            id: "_session_auth_2"
                        }).c("session", {
                            xmlns: e.NS.SESSION
                        }).tree())
                    } else {
                        this.authenticated = true;
                        this._changeConnectStatus(e.Status.CONNECTED, null)
                    }
                }
            } else {
                e.info("SASL binding failed.");
                this._changeConnectStatus(e.Status.AUTHFAIL, null);
                return false
            }
        },
        _sasl_session_cb: function (g) {
            if (g.getAttribute("type") == "result") {
                this.authenticated = true;
                this._changeConnectStatus(e.Status.CONNECTED, null)
            } else {
                if (g.getAttribute("type") == "error") {
                    e.info("Session creation failed.");
                    this._changeConnectStatus(e.Status.AUTHFAIL, null);
                    return false
                }
            }
            return false
        },
        _sasl_failure_cb: function (g) {
            if (this._sasl_success_handler) {
                this.deleteHandler(this._sasl_success_handler);
                this._sasl_success_handler = null
            }
            if (this._sasl_challenge_handler) {
                this.deleteHandler(this._sasl_challenge_handler);
                this._sasl_challenge_handler = null
            }
            this._changeConnectStatus(e.Status.AUTHFAIL, null);
            return false
        },
        _auth2_cb: function (g) {
            if (g.getAttribute("type") == "result") {
                this.authenticated = true;
                this._changeConnectStatus(e.Status.CONNECTED, null)
            } else {
                if (g.getAttribute("type") == "error") {
                    this._changeConnectStatus(e.Status.AUTHFAIL, null);
                    this.disconnect()
                }
            }
            return false
        },
        _addSysTimedHandler: function (j, h) {
            var g = new e.TimedHandler(j, h);
            g.user = false;
            this.addTimeds.push(g);
            return g
        },
        _addSysHandler: function (m, l, h, j, n) {
            var g = new e.Handler(m, l, h, j, n);
            g.user = false;
            this.addHandlers.push(g);
            return g
        },
        _onDisconnectTimeout: function () {
            e.info("_onDisconnectTimeout was called");
            var g;
            while (this._requests.length > 0) {
                g = this._requests.pop();
                g.abort = true;
                g.xhr.abort();
                g.xhr.onreadystatechange = function () {}
            }
            this._doDisconnect();
            return false
        },
        _onIdle: function () {
            var j, m, o, l;
            while (this.addTimeds.length > 0) {
                this.timedHandlers.push(this.addTimeds.pop())
            }
            while (this.removeTimeds.length > 0) {
                m = this.removeTimeds.pop();
                j = this.timedHandlers.indexOf(m);
                if (j >= 0) {
                    this.timedHandlers.splice(j, 1)
                }
            }
            var h = new Date().getTime();
            l = [];
            for (j = 0; j < this.timedHandlers.length; j++) {
                m = this.timedHandlers[j];
                if (this.authenticated || !m.user) {
                    o = m.lastCalled + m.period;
                    if (o - h <= 0) {
                        if (m.run()) {
                            l.push(m)
                        }
                    } else {
                        l.push(m)
                    }
                }
            }
            this.timedHandlers = l;
            var g, n;
            if (this.authenticated && this._requests.length === 0 && this._data.length === 0 && !this.disconnecting) {
                e.info("no requests during idle cycle, sending blank request");
                this._data.push(null)
            }
            if (this._requests.length < 2 && this._data.length > 0 && !this.paused) {
                g = this._buildBody();
                for (j = 0; j < this._data.length; j++) {
                    if (this._data[j] !== null) {
                        if (this._data[j] === "restart") {
                            g.attrs({
                                to: this.domain,
                                "xml:lang": "en",
                                "xmpp:restart": "true",
                                "xmlns:xmpp": e.NS.BOSH
                            })
                        } else {
                            g.cnode(this._data[j]).up()
                        }
                    }
                }
                delete this._data;
                this._data = [];
                this._requests.push(new e.Request(g.tree(), this._onRequestStateChange.bind(this, this._dataRecv.bind(this)), g.tree().getAttribute("rid")));
                this._processRequest(this._requests.length - 1)
            }
            if (this._requests.length > 0) {
                n = this._requests[0].age();
                if (this._requests[0].dead !== null) {
                    if (this._requests[0].timeDead() > Math.floor(e.SECONDARY_TIMEOUT * this.wait)) {
                        this._throttledRequestHandler()
                    }
                }
                if (n > Math.floor(e.TIMEOUT * this.wait)) {
                    e.warn("Request " + this._requests[0].id + " timed out, over " + Math.floor(e.TIMEOUT * this.wait) + " seconds since last activity");
                    this._throttledRequestHandler()
                }
            }
            clearTimeout(this._idleTimeout);
            if (this.connected) {
                this._idleTimeout = setTimeout(this._onIdle.bind(this), 100)
            }
        }
    };
    if (f) {
        f(e, c, a, d, b)
    }
})(function () {
    window.Strophe = arguments[0];
    window.$build = arguments[1];
    window.$msg = arguments[2];
    window.$iq = arguments[3];
    window.$pres = arguments[4]
});
if (window.XDomainRequest) {
    Strophe.debug("using XdomainRequest for IE");
    XDomainRequest.prototype.oldsend = XDomainRequest.prototype.send;
    XDomainRequest.prototype.send = function () {
        try {
            XDomainRequest.prototype.oldsend.apply(this, arguments)
        } catch (a) {}
        this.readyState = 2;
        try {
            this.onreadystatechange()
        } catch (a) {}
    }
}
Strophe.addConnectionPlugin("xdomainrequest", {
    init: function () {
        if (window.XDomainRequest) {
            Strophe.Request.prototype._newXHR = function () {
                var a = function (f, c) {
                        f.status = c;
                        f.readyState = 4;
                        try {
                            f.onreadystatechange()
                        } catch (d) {}
                    };
                var b = new XDomainRequest();
                b.readyState = 0;
                b.onreadystatechange = this.func.bind(null, this);
                b.onload = function () {
                    var c = new ActiveXObject("Microsoft.XMLDOM");
                    c.async = "false";
                    c.loadXML(b.responseText);
                    b.responseXML = c;
                    a(b, 200)
                };
                b.onerror = function () {
                    a(b, 500)
                };
                b.ontimeout = function () {
                    a(b, 500)
                };
                return b
            }
        } else {
            Strophe.error("XDomainRequest not found. Falling back to native XHR implementation.")
        }
    }
});
function explode(c, e, a) {
    var f = {
        0: ""
    };
    if (arguments.length < 2 || typeof arguments[0] == "undefined" || typeof arguments[1] == "undefined") {
        return null
    }
    if (c === "" || c === false || c === null) {
        return false
    }
    if (typeof c == "function" || typeof c == "object" || typeof e == "function" || typeof e == "object") {
        return f
    }
    if (c === true) {
        c = "1"
    }
    if (!a) {
        return e.toString().split(c.toString())
    } else {
        var g = e.toString().split(c.toString());
        var d = g.splice(0, a - 1);
        var b = g.join(c.toString());
        d.push(b);
        return d
    }
}
Strophe.Connection.prototype._sasl_challenge1_fb = function (e) {
    var c = Base64.decode(Strophe.getText(e));
    var d = "";
    var g = "";
    var a = "";
    this.deleteHandler(this._sasl_failure_handler);
    var b = explode("&", c);
    for (i = 0; i < b.length; i++) {
        map = explode("=", b[i]);
        switch (map[0]) {
        case "nonce":
            d = map[1];
            break;
        case "method":
            g = map[1];
            break;
        case "version":
            a = map[1];
            break
        }
    }
    var f = this;
    $.getJSON("/api/sasl", {
        nonce: d,
        method: g,
        version: a
    }, function (h) {
        f._sasl_challenge_handler = f._addSysHandler(f._sasl_challenge2_cb.bind(f), null, "challenge", null, null);
        f._sasl_success_handler = f._addSysHandler(f._sasl_success_cb.bind(f), null, "success", null, null);
        f._sasl_failure_handler = f._addSysHandler(f._sasl_failure_cb.bind(f), null, "failure", null, null);
        f.send($build("response", {
            xmlns: Strophe.NS.SASL
        }).t(Base64.encode(h.result)).tree())
    });
    return false
};
Strophe.Connection.prototype._connect_fb = function (p) {
    Strophe.info("_connect_fb was called");
    this.connected = true;
    var c = p.getResponse();
    if (!c) {
        return
    }
    this.xmlInput(c);
    this.rawInput(Strophe.serialize(c));
    var f = c.getAttribute("type");
    var o, h;
    if (f !== null && f == "terminate") {
        o = c.getAttribute("condition");
        h = c.getElementsByTagName("conflict");
        if (o !== null) {
            if (o == "remote-stream-error" && h.length > 0) {
                o = "conflict"
            }
            this._changeConnectStatus(Strophe.Status.CONNFAIL, o)
        } else {
            this._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown")
        }
        return
    }
    if (!this.sid) {
        this.sid = c.getAttribute("sid")
    }
    if (!this.stream_id) {
        this.stream_id = c.getAttribute("authid")
    }
    var d = c.getAttribute("requests");
    if (d) {
        this.window = d
    }
    var a = c.getAttribute("hold");
    if (a) {
        this.hold = a
    }
    var l = c.getAttribute("wait");
    if (l) {
        this.wait = l
    }
    var q = c.getElementsByTagName("mechanism");
    var g, n, j, e, b;
    if (q.length == 0) {
        var m = this._buildBody();
        this._requests.push(new Strophe.Request(m.tree(), this._onRequestStateChange.bind(this, this._connect_fb.bind(this)), m.tree().getAttribute("rid")));
        this._throttledRequestHandler();
        return
    } else {
        for (g = 0; g < q.length; g++) {
            n = Strophe.getText(q[g]);
            if (n == "X-FACEBOOK-PLATFORM") {
                b = true;
                break
            }
        }
    }
    if (!b) {
        return
    }
    this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
    this._sasl_challenge_handler = this._addSysHandler(this._sasl_challenge1_fb.bind(this), null, "challenge", null, null);
    this._sasl_failure_handler = this._addSysHandler(this._sasl_challenge1_fb.bind(this), null, "failure", null, null);
    this.send($build("auth", {
        xmlns: Strophe.NS.SASL,
        mechanism: "X-FACEBOOK-PLATFORM"
    }).tree())
};
Strophe.Connection.prototype.facebookConnect = function (b, e, d, c) {
    this.jid = b;
    this.connect_callback = e;
    this.disconnecting = false;
    this.connected = false;
    this.authenticated = false;
    this.errors = 0;
    this.wait = d || this.wait;
    this.hold = c || this.hold;
    this.domain = Strophe.getDomainFromJid(this.jid);
    var a = this._buildBody().attrs({
        to: this.domain,
        "xml:lang": "en",
        wait: this.wait,
        hold: this.hold,
        content: "text/xml; charset=utf-8",
        ver: "1.6",
        "xmpp:version": "1.0",
        "xmlns:xmpp": Strophe.NS.BOSH
    });
    this._changeConnectStatus(Strophe.Status.CONNECTING, null);
    this._requests.push(new Strophe.Request(a.tree(), this._onRequestStateChange.bind(this, this._connect_fb.bind(this)), a.tree().getAttribute("rid")));
    this._throttledRequestHandler()
};
var messagingTimeout;
var loader;
String.prototype.toTitleCase = function () {
    var a = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;
    return this.replace(/([^\W_]+[^\s\-]*) */g, function (c, e, b, d) {
        if (b > 0 && b + e.length !== d.length && e.search(a) > -1 && d.charAt(b - 2) !== ":" && d.charAt(b - 1).search(/[^\s\-]/) < 0) {
            return c.toLowerCase()
        }
        if (e.substr(1).search(/[A-Z]|\../) > -1) {
            return c
        }
        return c.charAt(0).toUpperCase() + c.substr(1)
    })
};
function sharePopup(b) {
    var a = window.location.port ? ":" + window.location.port : "";
    FB.ui({
        method: "feed",
        link: window.location.protocol + "//" + window.location.hostname + a + "/stations/" + b + "/play/"
    });
    _kmq.push(["record", "shared",
    {
        "outbound destination": "facebook",
        "outbound name": "station",
        "outbound medium": "social"
    }]);
    return false
}
$(function () {
    $(window).load(function () {
        LoadingPage.fadeOut()
    });
    sz.isMyProfile = function () {
        return (sz.app.data.Accounts.at(0).get("username") === sz.app.data.User.toJSON().username)
    };
    $("#loading").ajaxStart(function () {
        sz.ui.LoadingIndicator.start()
    }).ajaxStop(function () {
        sz.ui.LoadingIndicator.stop()
    });
    var c = false,
        a = false,
        b = 4;
    $(window).resize(function () {
        var d = $("#friends").outerWidth();
        $("#chats").css("right", d)
    }).trigger("resize");
    $("#logo").toggle(function () {
        $(this).removeClass("up").addClass("down");
        $("#dropdown").show()
    }, function () {
        $(this).removeClass("down").addClass("up");
        $("#dropdown").hide()
    })
});
(function () {
    window.sz = {};
    sz.controllers = {};
    sz.model = {};
    sz.ui = {};
    sz.ui.modals = {};
    sz.ui.LoadingIndicator = {
        callback: null,
        animate: function () {
            var b = $("#loading .left");
            b.animate({
                opacity: 1
            }, 600);
            b.animate({
                opacity: 0
            }, 600)
        },
        start: function () {
            if (!$.browser.msie) {
                var b = this;
                $("#loading").fadeIn();
                b.animate();
                b.callback = setInterval(b.animate, 1200)
            }
        },
        stop: function () {
            if (!$.browser.msie) {
                clearInterval(this.callback);
                $("#loading").fadeOut()
            }
        }
    };
    sz.app = {};
    sz.app.controller = {};
    sz.app.ui = {};
    sz.app.data = {};
    sz.app.settings = function () {
        var d = new Date();
        var e = "sz_settings";
        var b = (new Date(d.valueOf() - 2 * 24 * 60 * 60 * 1000)).toGMTString();
        var c = (new Date(d.valueOf() + 365 * 24 * 60 * 60 * 1000)).toGMTString();
        this.defaults = {
            volume: 100
        };
        this.get = function (f) {
            return this.defaults[f]
        };
        this.set = function (f, g) {
            this.defaults[f] = g;
            this.save()
        };
        this.load = function () {
            var h = document.cookie.split(";");
            var g = null;
            var f = 0;
            for (; f < h.length; f++) {
                g = $.trim(h[f]);
                if (g.indexOf(e) === 0) {
                    _.extend(this.defaults, JSON.parse(unescape(g.split("=")[1])));
                    return
                }
            }
        };
        this.save = function () {
            document.cookie = e + "=" + escape(this.toString()) + "; expires=" + c + "; path=/"
        };
        this.toString = function () {
            return JSON.stringify(this.defaults)
        };
        this.load()
    };
    sz.app.settings = new sz.app.settings();
    var a = function () {
            var c = (function () {
                var g = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
                var f, e;
                $("body").append(g);
                f = g.children("div").innerWidth();
                g.css("overflow-y", "scroll");
                e = g.children("div").innerWidth();
                g.remove();
                return (f - e)
            })();
            var d = 155;
            var b = 338;
            $('<style type="text/css">#content-scroll.scroll.open #content {right:' + (b - c) + "px}#content-scroll.scroll #content {right:" + (d - c) + "px}</style>").appendTo("head")
        };
    sz.app.controller.renderScrollbar = function () {
        var b = $("#content-scroll");
        var c = $("#content-view");
        c.innerscroll({
            destination: b,
            draggable: true
        });
        scrollbar = b.children().not(c);
        scrollbar.addClass("scrollbar");
        a()
    };
    sz.app.controller._updateScrollbar = function () {
        var d = $("#content").innerHeight();
        var c = $("#content-scroll");
        var b = c.height();
        c.removeClass("scroll");
        if (b < d) {
            c.addClass("scroll")
        }
    };
    sz.app.controller.updateScrollbar = function () {
        setTimeout(sz.app.controller._updateScrollbar, 500)
    };
    window.fbAsyncInit = function () {
        FB.init({
            appId: facebook_app_id,
            status: true,
            cookie: true,
            xfbml: true,
            music: true
        })
    };
    $(document).ready(function () {
        var b = document.createElement("script");
        b.type = "text/javascript";
        b.src = document.location.protocol + facebook_connect_base_url + facebook_locale + "/all/vb.js";
        b.async = true;
        document.getElementById("fb-root").appendChild(b);
        sz.app.controller.renderScrollbar();
        $(window, "#content-scroll").on("resize", sz.app.controller.updateScrollbar);
        $("#content").on("rendered", sz.app.controller.updateScrollbar)
    })
})();
function _lc(a) {
    var b = window.tokens[a];
    return b || a
}
String.prototype.startsWith = function (a) {
    return (this.indexOf(a) === 0)
};
function toUrl(b) {
    var a = _.zip(_.keys(b), _.values(b));
    qs = _.foldl(a, function (d, c) {
        var e = (d === "") ? "" : "&";
        return (c[1] != null && c[1] !== "") ? d + e + c[0] + "=" + encodeURIComponent(c[1]) : d
    }, "");
    if (qs.length > 0) {
        qs = "?" + qs
    }
    return qs
}
String.prototype.format = function () {
    var b = Array.prototype.slice.call(arguments);
    var d = b.length;
    var a = this;
    for (var c = 0; c < d; c++) {
        a = a.replace("{" + c + "}", b[c])
    }
    return a
};
function getLength(a) {
    k = 0;
    for (i = 0;; i++) {
        if (a[i]) {
            ++k
        } else {
            break
        }
    }
    return k
}
function getFormatNowDate(g) {
    if (!g) {
        g = "Y-m-d"
    }
    var j = new Date();
    var h = j.getFullYear();
    var f = j.getUTCFullYear();
    var d = new String(j.getFullYear()).substr(2);
    var c = j.getMonth() + 1;
    if (c < 10) {
        c = "0" + c
    }
    var e = j.getDate();
    if (e < 10) {
        e = "0" + e
    }
    var a = "";
    for (var b = 0; b < g.length; ++b) {
        if (g[b] == "Y") {
            a += h
        } else {
            if (g[b] == "y") {
                a += d
            } else {
                if (g[b] == "m") {
                    a += c
                } else {
                    if (g[b] == "d") {
                        a += e
                    } else {
                        a += g[b]
                    }
                }
            }
        }
    }
    return a
}(function () {
    var a;
    a = (function () {
        function b(f, e, d, c) {
            var g = this;
            this.image = f;
            this.parent = e;
            this.width = d;
            this.height = c;
            this.dimensions = {};
            $(f).on("load", function (h) {
                return g.resizeImage()
            });
            $(window).on("resize", function (h) {
                return g.resizeImage()
            })
        }
        b.prototype.resizeImage = function () {
            this.dimensions.imgWidth = this.width;
            this.dimensions.imgHeight = this.height;
            this.dimensions.parentWidth = this.parent.width();
            this.dimensions.parentHeight = this.parent.height();
            this.aspectRatio = this.dimensions.imgWidth / this.dimensions.imgHeight;
            return this.image.css({
                width: "100%",
                minWidth: this.dimensions.parentHeight * this.aspectRatio,
                minHeight: this.dimensions.parentHeight,
                height: "auto"
            })
        };
        return b
    })();
    window.sz.ui.ResizedImage = a
}).call(this);
(function () {
    var a = Object.prototype.hasOwnProperty,
        b = function (f, d) {
            for (var c in d) {
                if (a.call(d, c)) {
                    f[c] = d[c]
                }
            }
            function e() {
                this.constructor = f
            }
            e.prototype = d.prototype;
            f.prototype = new e;
            f.__super__ = d.prototype;
            return f
        };
    sz.model.syncHandleToken = function (f, e, d) {
        var c;
        c = d.complete ||
        function () {};
        d.complete = function (g) {
            c();
            if (g.status === 401 && g.responseText === "invalidToken") {
                return (new sz.ui.modals.InvalidTokenFound()).render()
            }
        };
        return Backbone.sync.call(this, f, e, d)
    };
    sz.model.BaseModel = (function (d) {
        b(c, d);
        function c() {
            c.__super__.constructor.apply(this, arguments)
        }
        c.prototype.initialize = function (e) {
            return this.sync = sz.model.syncHandleToken
        };
        return c
    })(Backbone.Model);
    sz.model.BaseCollection = (function (d) {
        b(c, d);
        function c() {
            c.__super__.constructor.apply(this, arguments)
        }
        c.prototype.initialize = function (e) {
            return this.sync = sz.model.syncHandleToken
        };
        return c
    })(Backbone.Collection)
}).call(this);
sz.model.Station = sz.model.BaseModel.extend({
    defaults: {
        favorite: false
    },
    initialize: function () {
        this.bind("change:id", this.bindFavorites, this);
        this.favoriteCollection = sz.app.data.MyFavourites;
        this.bindFavorites()
    },
    bindFavorites: function () {
        var b = function (c) {
                if (this.id !== c.get("station")) {
                    return
                }
                this.favoriteModel = c;
                this.set({
                    favorite: true
                });
                this.favoriteModel.bind("destroy", a, this)
            };
        var a = function () {
                this.favoriteModel = null;
                this.set({
                    favorite: false
                })
            };
        this.favoriteModel = this.favoriteCollection.get(this.id);
        this.set({
            favorite: this.favoriteModel !== undefined
        }, {
            silent: true
        });
        if (this.favoriteModel) {
            this.favoriteModel.bind("destroy", a, this)
        }
        this.favoriteCollection.bind("add", b, this)
    },
    isFavorited: function () {
        return this.getFavoriteModel() !== null
    },
    getFavoriteModel: function () {
        return this.favoriteCollection.get(this.id) || null
    },
    toggleFavorite: function () {
        var b = this.favoriteCollection;
        var d = sz.app.data.User.get("favourites_count");
        var f = sz.app.data.Accounts.at(0).get("username");
        var c = sz.app.data.User.get("username") === f;
        var a = this.getFavoriteModel();
        var e = function () {
                if (window.location.hash.match(/\/users\/\d+\/(?:stations|favourites)/)) {
                    sz.app.ui.StationGrid.stationList.fetch()
                }
            };
        if (a) {
            a.set({
                username: f
            }, {
                silent: true
            });
            return a.destroy().success(function () {
                _kmq.push(["record", "Unfavorited Station"]);
                if (c) {
                    e();
                    --d;
                    sz.app.data.User.set({
                        favourites_count: d
                    })
                }
            }).error(function () {
                b.add(a)
            })
        }
        a = this.favoriteCollection.add({
            station: this.id,
            user: f
        }).last();
        return a.save().success(function () {
            _kmq.push(["record", "Favorited Station"]);
            if (c) {
                e();
                ++d;
                sz.app.data.User.set({
                    favourites_count: d
                })
            }
        }).error(function () {
            a.destroy()
        })
    },
    url: function () {
        if (this.id) {
            return "/api/stations/" + this.id + "/"
        }
        return "/api/stations/trackartist/"
    },
    toString: function () {
        return "Station " + this.id + ' "' + this.get("title") + '"'
    },
    includesArtists: function (g) {
        var h = this.toJSON().meta;
        if (typeof h == "undefined" || typeof h.artists == "undefined") {
            return ""
        }
        var c = h.artists;
        var f = [];
        for (i = 0; i < Math.min(c.length, 4); i++) {
            var e = c[i].name;
            var d = c[i].slug;
            var b = '<a href="#/artists/' + d + '/" title="' + e + '">' + e + "</a>";
            f.push(b)
        }
        return f.join(", ")
    },
    createdByUser: function () {
        if (!this.get("user")) {
            return ""
        }
        return this.get("user")
    },
    createdByFullName: function () {
        if (!this.get("user")) {
            return ""
        }
        var a = this.get("user");
        return a.first_name + " " + a.last_name
    },
    share: function () {
        FB.ui({
            method: "feed",
            link: window.location.protocol + "//" + window.location.host + "/stations/" + this.id + "/play/"
        });
        _kmq.push(["record", "shared",
        {
            "outbound destination": "facebook",
            "outbound name": "station",
            "outbound medium": "social"
        }])
    },
    toJSON: function () {
        var a = _.clone(this.attributes);
        if (a.user_username) {
            _.extend(a, {
                user_username: a.user_username || a.user.username,
                user_is_active: _(a).has("user_is_active") ? a.user_is_active : a.user.is_active,
                user_profile: "/users/" + a.user_username + "/stations/",
                user_avatar: (facebook_https ? "https" : "http") + "://graph.facebook.com/" + a.user_username + "/picture"
            })
        }
        return a
    }
});
sz.model.UserStation = sz.model.Station.extend({
    url: function () {
        var a = this.get("user");
        var b = this.get("station");
        if (this.id) {
            return "/api/users/" + a + "/stations/" + b + "/"
        } else {
            return "/api/users/" + a + "/stations/"
        }
    }
});
sz.model.UserStations = sz.model.BaseCollection.extend({
    model: sz.model.UserStation,
    username: null,
    url: function () {
        if (this.username == null) {
            throw "User cannot be null"
        }
        return "/api/users/" + this.username + "/stations/"
    }
});
sz.model.UserFavourite = sz.model.Station.extend({
    url: function () {
        var a = this.get("user") || this.get("user_username");
        var b = this.get("station") || this.get("id");
        if (!this.get("id")) {
            return "/api/users/" + a + "/favourites/"
        } else {
            return "/api/users/" + a + "/favourites/" + b + "/"
        }
    }
});
sz.model.UserFavourites = sz.model.BaseCollection.extend({
    model: sz.model.UserFavourite,
    username: null,
    url: function () {
        if (this.username == null) {
            throw "User cannot be null"
        }
        return "/api/users/" + this.username + "/favourites/"
    }
});
sz.model.StationInfo = sz.model.BaseModel.extend({
    station_id: null,
    url: function () {
        if (this.station_id == null) {
            throw "Station cannot be null"
        }
        return "/api/stations/" + this.station_id + "/"
    }
});
sz.model.StationTrackImage = sz.model.BaseModel.extend();
sz.model.StationTrackImages = sz.model.BaseCollection.extend({
    model: sz.model.StationTrackImage,
    station_id: null,
    url: function () {
        if (this.station_id == null) {
            throw "Station cannot be null"
        }
        return "/api/stations/" + this.station_id + "/playlistimages/"
    }
});
sz.app.data.MyFavourites = new sz.model.UserFavourites();
sz.app.data.UserStation = new sz.model.UserStation();
sz.app.data.Station = new sz.model.Station();
sz.app.data.UserStations = new sz.model.UserStations();
sz.app.data.UserFavourite = new sz.model.UserFavourite();
sz.app.data.UserFavourites = new sz.model.UserFavourites();
sz.app.data.StationTrackImages = new sz.model.StationTrackImages();
sz.model.Featured = sz.model.BaseModel.extend({});
sz.model.Featureds = sz.model.BaseCollection.extend({
    model: sz.model.Featured,
    url: function () {
        return "/api/featured/"
    }
});
sz.app.data.Featureds = new sz.model.Featureds();
sz.model.FeaturedPage = sz.model.BaseModel.extend({
    url: function () {
        return "/api/featuredpage/"
    }
});
sz.app.data.FeaturedPage = new sz.model.FeaturedPage();
sz.model.Populars = sz.model.BaseCollection.extend({
    model: sz.model.Station,
    type: "website",
    sitename: "senzari",
    parse: function (a, b) {
        return _(_(a.popular).pluck("station")).map(function (c) {
            _(c).extend({
                user_username: c.user.username,
                user_name: c.user.first_name + " " + c.user.last_name,
                image: c.meta.image
            });
            return c
        })
    },
    url: function () {
        if (this.type === "website" && this.sitename !== null) {
            return "/api/popular/website/" + this.sitename + "/"
        } else {
            if (this.type === "friends") {
                return "/api/popular/friends/"
            }
        }
        throw "parameter is invalid!"
    }
});
sz.app.data.Populars = new sz.model.Populars();
sz.model.Activity = sz.model.BaseModel.extend({
    toJSON: function () {
        var c = _.clone(this.attributes);
        var a = "";
        var b = $($("#activity-messages-template").html()).filter("#user-you").text();
        if (c.instance_type === "StationPlayHistory") {
            a = "listen"
        } else {
            if (c.instance_type === "StationFavourite") {
                a = "favorite"
            } else {
                if (c.instance_type === "Station") {
                    a = "create"
                }
            }
        }
        return {
            typeClass: a,
            type: c.instance_type,
            user: {
                me: this.myActivity(),
                name: c.user1_name,
                image: (facebook_https ? "https" : "http") + "://graph.facebook.com/" + c.user1_id + "/picture",
                profile: "/users/" + c.user1_id + "/stations/"
            },
            station: {
                url: "/stations/" + c.instance_object_id + "/play/",
                image: c.station.meta.image,
                name: c.instance_object_name,
                created: $.timeago(c.date_created),
                owner: {
                    me: this.myStation(),
                    name: c.station.user.first_name + " " + c.station.user.last_name,
                    image: (facebook_https ? "https" : "http") + "://graph.facebook.com/" + c.station.user.username + "/picture",
                    profile: "/users/" + c.station.user.username + "/stations/"
                }
            }
        }
    },
    myActivity: function () {
        return this.get("user1_id") === sz.app.data.Accounts.models[0].get("facebook_id")
    },
    myStation: function () {
        return this.get("station").user.username === sz.app.data.Accounts.models[0].get("facebook_id")
    }
});
sz.model.Activities = sz.model.BaseCollection.extend({
    model: sz.model.Activity,
    type: null,
    url: function () {
        return "/api/activity/" + this.type + "/"
    }
});
sz.app.data.MyActivities = new sz.model.Activities();
sz.app.data.MyActivities.type = "myactivity";
sz.app.data.MyFriendsActivities = new sz.model.Activities();
sz.app.data.MyFriendsActivities.type = "myfriendsactivity";
sz.app.data.GlobalActivities = new sz.model.Activities();
sz.app.data.GlobalActivities.type = "global";
sz.model.Artist = sz.model.BaseModel.extend({
    id: null,
    name: null,
    slug: null,
    url: function () {
        if (this.slug === null) {
            throw "slug cannot be null"
        }
        return "/api/artists/" + this.slug + "/"
    },
    getSimilars: function (a) {
        _.extend(a || {}, {
            slug: this.get("slug")
        });
        return new sz.model.SimilarArtist(a)
    },
    image: function () {
        var a = this.get("images");
        if (!a || !a.length) {
            return this.get("image") || "/static/images/artist_thumb.jpg"
        }
        return a[0].image_full
    },
    createStation: function () {
        var b = {
            value: this.id || this.get("value"),
            artist: this.get("name"),
            track: "",
            type: "ARTIST",
            name: (this.get("artist") || this.get("name")) + " Radio"
        };
        var a = new sz.model.Station(b);
        return a.save().success(function () {
            _kmq.push(["record", "Created Station"])
        })
    },
    toJSON: function () {
        var a = _.clone(this.attributes);
        _.extend(a, {
            image: this.image()
        });
        return a
    }
});
sz.model.SimilarArtist = sz.model.BaseCollection.extend({
    model: sz.model.Artist,
    options: {
        slug: null,
        limit: 8
    },
    initialize: function (a) {
        _.extend(this.options, a || {});
        this.reset()
    },
    parse: function (a, b) {
        return a.artists.splice(0, this.options.limit)
    },
    url: function () {
        if (this.options.slug === null) {
            throw "slug cannot be null"
        }
        return "/api/artists/" + this.options.slug + "/similar/?limit=" + this.options.limit
    }
});
sz.model.ArtistActivities = sz.model.BaseCollection.extend({
    model: sz.model.Activity,
    slug: null,
    url: function () {
        if (this.slug == null) {
            throw "slug cannot be null"
        }
        return "/api/activity/artist/" + this.slug + "/"
    }
});
sz.model.UserActivities = sz.model.BaseCollection.extend({
    model: sz.model.Activity,
    username: null,
    url: function () {
        if (this.username == null) {
            throw "User cannot be null"
        }
        return "/api/users/" + this.username + "/activities/"
    }
});
sz.app.data.Artist = new sz.model.Artist();
sz.app.data.ArtistActivities = new sz.model.ArtistActivities();
sz.app.data.UserActivities = new sz.model.UserActivities();
sz.model.Account = sz.model.BaseModel.extend({
    url: "/api/1.0/account/"
});
sz.model.Accounts = sz.model.BaseCollection.extend({
    model: sz.model.Account,
    url: "/api/1.0/account/"
});
sz.app.data.Accounts = new sz.model.Accounts();
sz.model.AccountsLogout = sz.model.BaseModel.extend({
    url: "/api/accounts/logout/"
});
sz.app.data.AccountsLogout = new sz.model.AccountsLogout();
sz.model.AccountSetting = sz.model.BaseModel.extend({
    defaults: {
        key: undefined,
        value: undefined
    }
});
sz.model.AccountSettings = sz.model.BaseCollection.extend({
    model: sz.model.AccountSetting,
    url: "/api/1.0/account/settings/",
    getByKey: function (a) {
        var b = this.filter(function (c) {
            return c.get("key") === a
        });
        if (b[0]) {
            if (!b[0]._url) {
                b[0]._url = b[0].url;
                b[0].url = function () {
                    return b[0]._url() + "/"
                }
            }
            return b[0]
        }
        return undefined
    },
    getValue: function (a) {
        var b = this.getByKey(a);
        return b.get ? b.get("value") : undefined
    },
    absoluteValues: function () {
        var a = {};
        this.each(function (c) {
            var d = c.toJSON();
            var b = {};
            b[d.key] = d.value;
            _.extend(a, b)
        });
        return a
    }
});
sz.app.data.AccountSettings = new sz.model.AccountSettings();
(function () {
    var a = Object.prototype.hasOwnProperty,
        b = function (f, d) {
            for (var c in d) {
                if (a.call(d, c)) {
                    f[c] = d[c]
                }
            }
            function e() {
                this.constructor = f
            }
            e.prototype = d.prototype;
            f.prototype = new e;
            f.__super__ = d.prototype;
            return f
        };
    sz.model.EditorialPage = (function (c) {
        b(d, c);
        function d() {
            d.__super__.constructor.apply(this, arguments)
        }
        d.prototype.defaults = {
            id: null,
            background_image: "",
            background_link: "",
            category: "",
            html_template: "",
            locale: "",
            page_url: "",
            resource_uri: "",
            sub_category: "",
            title: ""
        };
        d.prototype.url = function () {
            var e;
            e = this.get("id");
            return "/api/1.0/editorialpages/" + e + "/?format=json"
        };
        return d
    })(sz.model.BaseModel);
    sz.model.EditorialPages = (function (d) {
        b(c, d);
        function c() {
            c.__super__.constructor.apply(this, arguments)
        }
        c.prototype.model = sz.model.EditorialPage;
        c.prototype.url = function () {
            var e;
            e = window.website_code ? "&website_code=" + window.website_code : "";
            return "/api/1.0/editorialpages/?format=json" + e
        };
        return c
    })(sz.model.BaseCollection);
    window.sz.app.data.EditorialPages = new sz.model.EditorialPages()
}).call(this);
sz.model.Friend = sz.model.BaseModel.extend({
    defaults: {
        name: "",
        avatar: "",
        current_station: "",
        current_station_slug: "",
        online_presence: "",
        is_favorite: false,
        is_user: false,
        inviteable: true
    },
    initialize: function () {
        var c = this;
        var b;
        var a = function () {
                this.trigger("change")
            };
        this.inviteAvailable = false;
        this.inviteCollection = sz.app.data.UninvitedFriendList;
        this.inviteCollection.bind("reset", function () {
            var d = c.invite;
            if (this.get("is_user")) {
                return
            }
            b = c.inviteCollection.get(c.id);
            if (b) {
                c.set({
                    inviteable: true
                });
                b.bind("change:invited", a, c);
                c.inviteAvailable = true
            } else {
                c.inviteAvailable = false
            }
            if (c.inviteAvailable !== d) {
                c.trigger("change")
            }
        })
    },
    profile: function () {
        return "/user/" + this.get("id") + "/"
    },
    toggleFavorite: function (a) {
        return this.save({
            is_favorite: this.get("is_favorite")
        }, a)
    },
    canInvite: function () {
        if (this.get("is_user") || this.isInvited() || !this.get("inviteable")) {
            return false
        }
        return true
    },
    isInvited: function () {
        var a = this.inviteCollection.get(this.id);
        if (this.get("is_user")) {
            return false
        }
        return a && a.get("invited") || false
    },
    invite: function () {
        var a = this;
        var b = this.inviteCollection.get(this.id);
        a.trigger("change");
        b.save({
            invited: true
        }).success(function () {
            sz.app.ui.Chat.sendInvitation(a.id)
        });
        return b
    },
    toJSON: function () {
        var a = _.clone(this.attributes);
        if (!sz.app.ui.Chat.connected()) {
            a.online_presence = ""
        }
        switch (a.online_presence) {
        case "active":
            a.online_presence = "online";
            break;
        case "idle":
            a.online_presence = "away";
            break
        }
        a.canInvite = this.canInvite();
        a.isInvited = this.isInvited();
        return a
    }
});
sz.model.FriendList = sz.model.BaseCollection.extend({
    model: sz.model.Friend,
    url: "/api/friends/facebook/",
    update: function (a, b) {
        a = a || {};
        b = b || [];
        var d = this,
            c = a.success;
        a.success = function (m, f, l) {
            var j = false;
            var h = [];
            var e = [];
            var g = function () {
                    this.unbind("change", g);
                    j = true
                };
            _(d.parse(m, l)).each(function (q) {
                var o = d.get(q.id);
                var n = {};
                var p, r = {};
                if (!o) {
                    d.add(q, a);
                    j = true;
                    h.push(q.id)
                } else {
                    if (b.length) {
                        for (p in q) {
                            if (b.indexOf(p) !== -1) {
                                continue
                            }
                            r[p] = q[p];
                            delete q[p]
                        }
                    }
                    o.set(r);
                    o.bind("change", g);
                    o.set(q);
                    o.unbind("change", g);
                    h.push(o.id)
                }
            });
            if (d.length !== h.length) {
                e = d.filter(function (n) {
                    return h.indexOf(n.id) === -1
                })
            }
            if (e.length) {
                j = true;
                d.remove(e, a)
            }
            if (!a.silent && j) {
                d.trigger("changed", d, a)
            }
            if (c) {
                c(d, m)
            }
        };
        return (this.sync || Backbone.sync).call(this, "read", this, a)
    },
    filterByOnline: function () {
        var a = new sz.model.FriendList(this.filter(function (b) {
            return b.get("online_presence") !== "offline"
        }));
        a.each(function (b) {
            b.unbind("all", a._onModelEvent)
        });
        return a
    },
    filterByFavorite: function () {
        var a = new sz.model.FriendList(this.filter(function (b) {
            return b.get("is_favorite")
        }));
        a.each(function (b) {
            b.unbind("all", a._onModelEvent)
        });
        return a
    },
    orderByOnline: function () {
        return this.sortBy(function (a) {
            return [a.get("online_presence"), a.get("current_station") === "", a.get("name")]
        })
    },
    orderByFavorite: function () {
        return this.sortBy(function (a) {
            return [a.get("online_presence"), a.get("current_station") === "", a.get("is_favorite"), a.get("name")]
        })
    },
    orderByName: function () {
        return this.sortBy(function (a) {
            return a.get("name")
        })
    }
});
sz.app.data.FriendList = new sz.model.FriendList();
sz.model.User = sz.model.BaseModel.extend({
    defaults: {
        name: "",
        username: "",
        location: "",
        avatar: "",
        stations_count: "",
        stations_shared_count: "",
        subscriptions_count: "",
        favourites_count: "",
        facebook_profile_url: ""
    },
    username: null,
    url: function () {
        if (this.username === null) {
            throw "username cannot be null"
        }
        return "/api/1.0/users/" + this.username + "/"
    },
    fetch: function (b) {
        var a = this;
        b || (b = {
            success: function (c, d) {
                a.trigger("reset", c)
            }
        });
        return Backbone.Model.prototype.fetch.call(this, b)
    }
});
sz.app.data.User = new sz.model.User();
sz.model.Track = sz.model.BaseModel.extend({
    station: null,
    action: "next",
    playDuration: null,
    id: null,
    defaults: {
        station: "",
        title: "",
        album: "",
        artist: "",
        artist_slug: "",
        url: "",
        username: "",
        like: null
    },
    track_sleeveart_large: function () {
        return this.get("track_sleeveart").replace(/\_50\.jpg$/, "_100.jpg")
    },
    url: function () {
        if (this.station === null) {
            throw "Station cannot be null"
        }
        if (this.get("like") !== null) {
            return "/api/stations/" + this.station + "/" + this.get("like") ? "like" : "dislike/" + this.id + "/"
        } else {
            if (this.playDuration) {
                return "/api/stations/" + this.station + "/next/?action=" + this.action + "&duration=" + this.playDuration
            } else {
                return "/api/stations/" + this.station + "/next/?action=" + this.action
            }
        }
    }
});
sz.model.TrackHistory = sz.model.BaseCollection.extend({
    model: sz.model.Track,
    localStorage: new Store("trackhistory")
});
sz.app.data.TrackHistory = new sz.model.TrackHistory();
sz.model.UninvitedFriend = sz.model.BaseModel.extend({
    defaults: {
        id: "",
        facebook_id: "",
        name: "",
        avatar: "",
        invited: false
    }
});
sz.model.UninvitedFriendList = sz.model.BaseCollection.extend({
    model: sz.model.UninvitedFriend,
    url: "/api/invitation/uninvited_friends"
});
sz.app.data.UninvitedFriendList = new sz.model.UninvitedFriendList();
(function () {
    var a = Object.prototype.hasOwnProperty,
        b = function (f, d) {
            for (var c in d) {
                if (a.call(d, c)) {
                    f[c] = d[c]
                }
            }
            function e() {
                this.constructor = f
            }
            e.prototype = d.prototype;
            f.prototype = new e;
            f.__super__ = d.prototype;
            return f
        };
    sz.model.Place = (function (c) {
        b(d, c);
        function d() {
            d.__super__.constructor.apply(this, arguments)
        }
        d.prototype.defaults = {
            id: "",
            name: "",
            artists: [],
            weeklyArtists: [],
            dailyArtists: [],
            lastCheckinDate: null
        };
        d.prototype.url = function () {
            var e;
            e = this.get("id");
            return "/api/1.0/places/" + e + "/?format=json"
        };
        return d
    })(sz.model.BaseModel)
}).call(this);
sz.model.BrowseRecommended = sz.model.BaseCollection.extend({
    model: sz.model.Artist,
    url: function () {
        return "/api/artists/recommended/"
    }
});
sz.ui.Message = Backbone.View.extend({
    el: "#modal",
    template: _.template($("#modal-message-template").html()),
    events: {
        "click .message-close": "destroy"
    },
    options: {
        open: function () {},
        closable: true
    },
    initialize: function () {
        _.bindAll(this, "destroy")
    },
    render: function () {
        var b = this.template({
            title: this.options.title,
            message: this.options.message,
            closable: this.options.closable
        });
        $(this.el).empty().html(b).show();
        _.bind(this.options.open, this)();
        var c = $(this.el).find(".message-buttons");
        for (var a in this.options.buttons) {
            var e = this.options.buttons[a],
                d = $("<a></a>");
            d.attr("href", "#");
            d.text(a);
            d.click(e);
            $(c).append(d)
        }
        return this
    },
    destroy: function () {
        $(this.el).empty().hide();
        return false
    }
});
sz.ui.modals.CreatingStation = sz.ui.Message.extend({
    options: {
        title: _lc("create-station.loading.popup.title"),
        message: _lc("create-station.loading.popup.txt"),
        closable: false,
        open: function () {
            this.model.createStation().success(function (a) {
                sz.ui.Message.closeAll();
                location.href = "#/stations/" + a.station_id + "/play/"
            }).error(function () {
                sz.ui.Message.closeAll();
                new sz.ui.Message({
                    title: _lc("create-station.loading.popup.error.title"),
                    message: _lc("create-station.loading.popup.error.txt")
                }).render()
            })
        }
    }
});
sz.ui.modals.GeneralError = sz.ui.Message.extend({
    options: {
        title: _lc("popup.error.title"),
        message: _lc("popup.error.text"),
        closable: true,
        open: function () {
            _.delay(this.destroy, 8000)
        }
    }
});
sz.ui.modals.InvalidTokenFound = sz.ui.Message.extend({
    options: {
        title: _lc("popup.error.title"),
        message: _lc("popup.error.invalid-token"),
        closable: false,
        open: function () {}
    },
    initialize: function () {
        this.options.buttons = {};
        this.options.buttons[_lc("popup.button.ok")] = function () {
            $.get("/api/accounts/logout", function () {
                window.location.reload()
            });
            return false
        }
    }
});
sz.ui.Message.closeAll = function () {
    $("#modal").empty().hide()
};
sz.ui.FriendListItem = Backbone.View.extend({
    tagName: "li",
    template: _.template($("#friend-item-template").html()),
    events: {
        "click .favorite": "toggleFavorite",
        "click .profile-image > img": "chat",
        "click .chat": "chat",
        "click .invite-button": "invite"
    },
    initialize: function () {
        _.bindAll(this, "render", "invite");
        this.model.bind("change", this.render);
        this.model.view = this
    },
    render: function () {
        var a = $(this.el);
        a.html(this.template(this.model.toJSON()));
        return this
    },
    invite: function () {
        this.model.invite();
        this.$(".invite-button").hide();
        this.$(".invite-sent").show();
        _kmq.push(["record", "Invited Friend"])
    },
    chat: function () {
        sz.app.ui.Chat.showChatBox(this.model, true);
        return false
    },
    toggleFavorite: function (b) {
        var a = this.model;
        this.$(".favorite").toggleClass("active");
        a.toggleFavorite({
            silent: true
        }).success(function () {
            a.collection.trigger("change:is_favorite", a);
            _kmq.push(["record", "Favorited Friend"])
        });
        b.stopPropagation();
        return false
    },
    remove: function () {
        this.model.unbind("change", this.render);
        this.model.unbind("change:has_invites", this.updateInvitation);
        return Backbone.View.prototype.remove.call(this)
    }
});
sz.ui.FriendList = Backbone.View.extend({
    template: _.template($("#friends-list-template").html()),
    filterOnline: true,
    filterFavorite: false,
    events: {
        "click h3": "helpAnchor",
        "click a.online": "filterByOnline",
        "click a.all": "showAll",
        "click a.favorite": "filterByFavorite",
        "click a#friends-pane-toggle": "toggleFriends",
        "click #chat-toggle a": "toggleChatStatus",
        "keyup input": "filterFriends",
        "keypress input": "filterFriends"
    },
    helpAnchor: function (a) {
        $(a.currentTarget).children("a").click()
    },
    filterByOnline: function () {
        this.filterOnline = true;
        this.filterFavorite = false;
        this.filterFriends();
        this.$(".list > .wrapper").animate({
            scrollTop: 0
        }, "slow");
        this.$("h3").removeClass("active").children("a.online").parent().addClass("active");
        return false
    },
    showAll: function () {
        this.filterOnline = false;
        this.filterFavorite = false;
        this.filterFriends();
        this.$(".list > .wrapper").animate({
            scrollTop: 0
        }, "slow");
        this.$("h3").removeClass("active").children("a.all").parent().addClass("active");
        return false
    },
    filterByFavorite: function () {
        this.filterOnline = false;
        this.filterFavorite = true;
        this.filterFriends();
        this.$(".list > .wrapper").animate({
            scrollTop: 0
        }, "slow");
        this.$("h3").removeClass("active").children("a.favorite").parent().addClass("active");
        return false
    },
    toggleFriends: function () {
        $(this.el).toggleClass("open");
        $("#content-scroll").toggleClass("open").trigger("resize");
        this.sizeFriendsList();
        return false
    },
    initialize: function () {
        var a = this;
        _.bindAll(this, "render", "renderFriends", "filterFriends", "renderFriend", "updateFavorite", "updateOnlineStatus", "sizeFriendsList");
        this.connectingAnimation = null;
        this.friendItems = [];
        this.chat = sz.app.ui.Chat;
        this.collection = sz.app.data.FriendList;
        this.rendered = false;
        this.collection.on("reset", this.filterFriends);
        this.collection.on("changed", this.filterFriends);
        this.collection.on("change:is_favorite", this.updateFavorite);
        this.chat.on("connected", this.updateOnlineStatus, this);
        this.chat.on("connecting", this.updateOnlineStatus, this);
        this.chat.on("disconnected", this.updateOnlineStatus, this);
        $(window).on("resize", this.sizeFriendsList)
    },
    sizeFriendsList: function () {
        var a = this.$(".list").height();
        var b = this.$(".list > .wrapper");
        b.height(a);
        b.trigger("scroll")
    },
    render: function () {
        $(this.el).html(this.template());
        this.updateOnlineStatus(false);
        this.$(".list > .wrapper").innerscroll({
            destination: this.$(".list"),
            draggable: true
        });
        this.$(".list").children(":not([class=wrapper])").addClass("scrollbar");
        this.sizeFriendsList();
        return this
    },
    renderFriend: function (c) {
        var a = new sz.ui.FriendListItem({
            model: c
        });
        var b = $(a.render().el);
        this.$(".list > .wrapper > ul").append(b);
        this.friendItems.push(a)
    },
    renderFriends: function (b) {
        var c = $(this.el),
            a = [],
            d = _.after(a.lenth, this.sizeFriendsList);
        if (!this.rendered && this.collection.filterByOnline().length === 0) {
            this.rendered = true;
            if (this.collection.filterByFavorite().length) {
                this.filterByFavorite()
            } else {
                this.showAll()
            }
        }
        b = b || null;
        _.each(this.friendItems, function (e) {
            e.remove()
        });
        this.friendItems = [];
        if (this.filterOnline) {
            a = this.collection.filterByOnline().orderByOnline()
        } else {
            if (this.filterFavorite) {
                a = this.collection.filterByFavorite().orderByFavorite()
            } else {
                a = this.collection.orderByName()
            }
        }
        if (b && typeof (b) === "string") {
            a = _(a).filter(function (e) {
                var f = e.get("name").toLowerCase();
                return (f.indexOf(b.toLowerCase()) !== -1)
            })
        }
        _.each(a, this.renderFriend);
        this.sizeFriendsList()
    },
    updateFavorite: function (b) {
        if (!this.filterFavorite) {
            return
        }
        var c = $(b.view.el);
        var a = this;
        c.fadeOut("slow", function () {
            a.filterFriends()
        })
    },
    filterFriends: function (b) {
        if (!this.el) {
            return
        }
        var a = this.$("input").val();
        if (b && b.type === "keyup" && b.keyCode === 27) {
            a = "";
            this.$("input").val("")
        }
        this.renderFriends(a)
    },
    toggleChatStatus: function () {
        if (this.chat.connected() || this.chat.connecting) {
            this.chat.disconnect();
            _kmq.push(["record", "Chat: Clicked Disconnect"])
        } else {
            this.chat.connect(true);
            _kmq.push(["record", "Chat: Clicked Connect"])
        }
        return false
    },
    updateOnlineStatus: function (c) {
        var a = this.$("#chat-toggle a");
        var b, d;
        c = c !== undefined ? c : true;
        if (c) {
            this.filterFriends()
        }
        a.hide();
        if (this.chat.connecting) {
            clearTimeout(this.connectingAnimation);
            this.connectingAnimation = setTimeout(this.updateOnlineStatus, 300, false);
            b = a.filter(".connecting");
            d = b.show().hasClass("on");
            if (d) {
                b.removeClass("on").addClass("off")
            } else {
                b.removeClass("off").addClass("on")
            }
        } else {
            if (this.chat.connected()) {
                a.filter(".on:not(.connecting)").show()
            } else {
                a.filter(".off:not(.connecting)").show()
            }
        }
    }
});
sz.ui.Player = Backbone.View.extend({
    id: "footer-container",
    template: _.template($("#player-template").html()),
    detailTemplate: _.template($("#station-player-template").html()),
    isStationOwner: false,
    ready: false,
    volumeChangeChunk: 0.1,
    volumePopupID: "#volume-popup",
    volumePopupDisappearDelay: 1000,
    _volumePopupDisappearEvent: null,
    events: {
        "click .volume-up": "volumeUp",
        "click .volume-down": "volumeDown",
        "click .player-skip": "forward",
        "click .favorite": "favorite",
        "click .share": "doShare"
    },
    initialize: function () {
        var a = this;
        var b = false;
        _.bindAll(this, "render", "forward", "playStation", "updateVolumePopup");
        this.model = sz.app.data.Station;
        this.model.bind("change", this.updateStationBox, this);
        $(":input").live("focus", function () {
            b = true
        }).live("blur", function () {
            b = false
        });
        $(document).keypress(function (c) {
            if (b) {
                return
            }
            if (c.which === 187 || c.which === 61) {
                a.volumeUp()
            } else {
                if (c.which === 189 || c.which === 45) {
                    a.volumeDown()
                } else {
                    if (c.which === 32) {
                        a.playPause()
                    }
                }
            }
        })
    },
    render: function () {
        this.volume = sz.app.settings.get("volume");
        $(this.el).html(this.template({
            station: this.model
        }));
        this.buildPlayer();
        return this
    },
    updateStationBox: function (a) {
        if (!a || !a.get("meta")) {
            this.$(".stopped").show();
            return
        }
        this.$(".stopped").hide();
        this.$(".station").html(this.detailTemplate(a))
    },
    updateVolumePopup: function () {
        if (this._volumePopupDisappearEvent) {
            clearTimeout(this._volumePopupDisappearEvent)
        }
        var g = $(this.volumePopupID + " div.tick").removeClass("active");
        var c = this.volume;
        var h = g.splice(0, c * 10);
        $(h).addClass("active");
        var e = $(this.volumePopupID + " #volume-icon");
        var b = c * 100;
        var d = "volume-100";
        if (b < 1) {
            d = "volume-0"
        } else {
            if (b <= 33) {
                d = "volume-33"
            } else {
                if (b <= 66) {
                    d = "volume-66"
                }
            }
        }
        e.removeClass();
        e.addClass(d);
        $(this.volumePopupID).stop().removeAttr("style").show();
        var a = this;
        this._volumePopupDisappearEvent = setTimeout(function f() {
            $(a.volumePopupID).fadeOut()
        }, a.volumePopupDisappearDelay)
    },
    buildPlayer: function () {
        var a = this;
        this.$("#jplayer").jPlayer({
            cssSelectorAncestor: "#player-container",
            swfPath: "/static/js/lib",
            supplied: "mp3",
            solution: "flash, html",
            preload: "auto",
            volume: a.volume,
            ready: function () {
                a.ready = true;
                a.trigger("ready")
            },
            play: function (b) {
                a.$(".player-pause").show();
                a.$(".player-play").hide()
            },
            pause: function (b) {
                a.$(".player-play").show();
                a.$(".player-pause").hide()
            },
            ended: function () {
                a.getNextTrack("next");
                _kmq.push(["record", "Track Played Full",
                {
                    station_id: a.model.id
                }])
            },
            error: function () {
                $(this).jPlayer("clearMedia");
                _kmq.push(["record", "Track Error",
                {
                    station_id: a.model.id
                }]);
                a.getNextTrack("error")
            }
        });
        a.$(".jp-seek-bar").unbind("click");
        a.$(".jp-play-bar").unbind("click")
    },
    volumeUp: function () {
        this.volume += this.volumeChangeChunk;
        if (this.volume > 1) {
            this.volume = 1
        }
        this.$("#jplayer").jPlayer("volume", this.volume);
        sz.app.settings.set("volume", this.volume);
        this.updateVolumePopup();
        return false
    },
    volumeDown: function () {
        this.volume -= this.volumeChangeChunk;
        if (this.volume < 0) {
            this.volume = 0
        }
        this.$("#jplayer").jPlayer("volume", this.volume);
        sz.app.settings.set("volume", this.volume);
        this.updateVolumePopup();
        return false
    },
    playPause: function () {
        var a = this.$("#jplayer");
        if (a.length) {
            if (a.data("jPlayer").status.paused) {
                a.jPlayer("play")
            } else {
                a.jPlayer("pause")
            }
        }
    },
    stopStation: function (a) {
        if (arguments.length === 1 && a !== this.model.id) {
            return
        }
        this.$(".stopped").show();
        this.$("#jplayer").jPlayer("stop").jPlayer("clearMedia");
        this.model.clear();
        this.trigger("stopped")
    },
    playStation: function (a) {
        this.$(".stopped").hide();
        this.getNextTrack("first");
        this.trigger("playing");
        _kmq.push(["record", "Played Station"])
    },
    getPlayDuration: function () {
        var a = 0;
        var c = 0;
        var b = this.$(".jp-current-time").html();
        b = b.split(":");
        a = parseInt(b[0], 10) * 60;
        c = parseInt(b[1], 10);
        return a + c
    },
    getNextTrack: function (d) {
        var c = this,
            a = this.getPlayDuration(),
            b = new sz.model.Track();
        b.action = d;
        b.playDuration = a;
        b.station = this.model.id;
        b.fetch({
            success: function (e, f) {
                c.handleNext(e, f)
            },
            error: function (e, f) {
                c.handleError(e, f)
            }
        })
    },
    handleNext: function (b, g) {
        var f = b.toJSON(),
            c = this.$("#jplayer");
        var e = f.duration,
            a = Math.floor(e / 60),
            d = e - (a * 60);
        d = (d <= 9) ? "0" + d : d;
        formattedDuration = (a <= 9 ? "0" : "") + a + ":" + d;
        $("#duration").text(formattedDuration);
        $(c).jPlayer("setMedia", {
            mp3: b.get("url")
        });
        $(c).jPlayer("play");
        if (sz.app.data.TrackHistory.get(b.id)) {
            sz.app.data.TrackHistory.get(b.id).destroy()
        }
        sz.app.data.TrackHistory.add(b);
        sz.app.ui.StationInfo.updateStationInfoTrackImage(b.toJSON())
    },
    handleError: function (b, c) {
        var a;
        switch (c.status) {
        case 406:
            message = window.tokens["player.error-message.skip-limit"];
            _kmq.push(["record", "Skip Limit Reached"]);
            break;
        case 404:
            message = window.tokens["player.error-message.no-tracks-found"];
            break;
        default:
            message = window.tokens["player.error-message.default"];
            break
        }
        new sz.ui.Message({
            title: "Error",
            message: message,
            closable: false,
            open: function () {
                setTimeout(function () {
                    sz.ui.Message.closeAll()
                }, 3000)
            }
        }).render()
    },
    forward: function () {
        this.getNextTrack("next");
        _kmq.push(["record", "Track Skipped",
        {
            station_id: this.model.id
        }]);
        return false
    },
    favorite: function () {
        this.model.toggleFavorite();
        return false
    },
    doShare: function () {
        this.model.share();
        return false
    }
});
sz.ui.UserNavigation = Backbone.View.extend({
    template: _.template($("#user-navigation-template").html()),
    initialize: function () {
        _.bindAll(this, "render", "setSelected");
        sz.app.data.Accounts.bind("reset", this.render)
    },
    render: function () {
        var a = sz.app.data.Accounts.at(0).toJSON();
        $(this.el).html(this.template(a));
        this.setSelected();
        return this
    },
    setSelected: function () {
        var b = this.$("a:not(.extra-item)").removeClass("active");
        var a = window.location.hash;
        var c = [{
            url: /^#\/featured\/popular\/$/,
            replaceWith: null
        }, {
            url: /^#\/featured\/activity\/$/,
            replaceWith: null
        }, {
            url: /^#\/featured\/map\/$/,
            replaceWith: null
        }, {
            url: /^#\/mtv\/$/,
            replaceWith: null
        }, {
            url: /^#\/featured\/activity\/$/,
            replaceWith: null
        }, {
            url: /^#\/users\/[^\/]+\/stations\/$/,
            replaceWith: null
        }, {
            url: /^#\/users\/[^\/]+\/favourites\/$/,
            replaceWith: null
        }, {
            url: /^#\/users\/[^\/]+\/activities\/$/,
            replaceWith: null
        }, {
            url: /^#\/users\/[^\/]+\/recommendations\/$/,
            replaceWith: null
        }, {
            url: /^#\/station\/create\/$/,
            replaceWith: null
        }, {
            url: /^#\/accounts\/info\/$/,
            replaceWith: null
        }];
        _.every(c, function (e) {
            var d = a.match(e.url);
            if (d === null) {
                return true
            }
            if (d.length === 2) {
                a = a.replace(d[1], e.replaceWith)
            }
            b.filter(function () {
                return $(this).attr("href") === a
            }).addClass("active");
            return false
        })
    }
});
sz.ui.UserProfile = Backbone.View.extend({
    className: "content-box-full",
    template: _.template($("#user-profile-template").html()),
    initialize: function () {
        _.bindAll(this, "render", "setSelected")
    },
    render: function (b) {
        var a = sz.app.data.User.toJSON();
        a.is_my_profile = sz.isMyProfile();
        a.type = b;
        $(this.el).html(this.template(a));
        this.setSelected();
        return this
    },
    setSelected: function () {
        var a = window.location.hash.replace(/^(\#\/|\#)/, "#/");
        this.$(".content-filter").find("a[href$='" + a + "']").addClass("active")
    }
});
sz.ui.UserProfileAccount = Backbone.View.extend({
    events: {
        "click #disable-account": "disableAccount",
        "click input": "toggleSettings",
        "change #language-selector": "changeLanguage"
    },
    template: _.template($("#user-profile-account-template").html()),
    initialize: function () {
        _.bindAll(this, "render");
        sz.app.data.Accounts.bind("reset", this.render);
        sz.app.data.AccountSettings.getByKey("facebook_enable_chat").bind("change:value", this.toggleChat, this)
    },
    changeLanguage: function () {
        $('#user-language-selector-form input[name="next"]').val(location.hash);
        $("#user-language-selector-form").submit()
    },
    render: function () {
        var a = sz.app.data.Accounts.at(0).toJSON();
        a.settings = sz.app.data.AccountSettings.absoluteValues();
        $(this.el).html(this.template(a));
        _kmq.push(["record", "Viewed User Profile: Accounts page"]);
        return this
    },
    toggleChat: function (a, b) {
        if (b) {
            this.$("#facebook_enable_chat").attr("checked", "checked");
            _kmq.push(["record", "Chat: Clicked Connect"])
        } else {
            this.$("#facebook_enable_chat").removeAttr("checked");
            _kmq.push(["record", "Chat: Clicked Disconnect"])
        }
    },
    toggleSettings: function (b) {
        var a = $(b.currentTarget);
        sz.app.data.AccountSettings.getByKey(a.attr("id")).save({
            value: a.is(":checked")
        })
    },
    disableAccount: function () {
        var a = _lc("user.account.disable.button");
        var b = _lc("user.account.cancel.button");
        var c = {};
        c[a] = function () {
            sz.app.data.Accounts.at(0).save({
                is_active: false
            }).success(function () {
                _kmq.push(["record", "canceled",
                {
                    reason: "no reason option"
                }]);
                location.href = "/logout/"
            })
        };
        c[b] = function () {
            sz.ui.Message.closeAll()
        };
        new sz.ui.Message({
            title: "Disable Account",
            message: window.tokens["user.account.disable.confirmation.message"],
            buttons: c
        }).render();
        return false
    }
});
sz.ui.FeaturedPopular = Backbone.View.extend({
    tagName: "div",
    id: "content-box",
    template: _.template($("#featured-popular-template").html()),
    emptyTemplate: _.template($("#featured-popular-empty-template").html()),
    type: "website",
    events: {
        "click .content-filter a": "changeSelect"
    },
    initialize: function () {
        _.bindAll(this, "render", "renderPopular", "changeSelect")
    },
    render: function () {
        $(this.el).html(this.template({}));
        this.renderPopular();
        _kmq.push(["record", "Viewed Popular page"]);
        return this
    },
    renderPopular: function () {
        var a = this;
        a.$(".stations-grid,#blank-slate").remove();
        a.$("#content-body").append('<ul class="stations-grid"></ul>');
        var b = a.$(".stations-grid");
        sz.app.data.Populars.type = this.type;
        sz.app.data.Populars.fetch({
            success: function (c, e) {
                var d = sz.app.data.Populars;
                if (d.length === 0) {
                    a.$("#content-body").append(a.emptyTemplate({
                        type: a.type
                    }));
                    return false
                }
                d.each(function (f) {
                    stationItem = new sz.ui.StationGridItem({
                        model: f
                    });
                    b.append(stationItem.render().el)
                });
                a.$(".stations-grid").masonry({
                    itemSelector: "li",
                    columnWidth: 152,
                    isFitWidth: true,
                    gutterWidth: 25
                });
                $("#content").trigger("rendered")
            }
        })
    },
    changeSelect: function (c) {
        var a = $(c.target);
        var b = a.attr("rel");
        this.$(".content-filter a").removeClass("active");
        a.addClass("active");
        this.type = b;
        this.renderPopular();
        return false
    }
});
sz.ui.ActivityItem = Backbone.View.extend({
    regularTemplate: _.template($("#activity-item-template").html()),
    artistTemplate: _.template($("#artist-page-activity-item").html()),
    className: "activity",
    initialize: function (a) {
        this.artist = a.artist
    },
    render: function () {
        var a = this.regularTemplate;
        if (this.artist) {
            a = this.artistTemplate
        }
        var b = this.model.toJSON();
        var c = a(b);
        $(this.el).addClass(this.options.odd ? "light" : "dark").html(c).html();
        return this
    }
});
sz.ui.ActivityFeed = Backbone.View.extend({
    template: _.template($("#activity-feed-template").html()),
    emptyTemplate: _.template($("#activity-feed-empty-template").html()),
    friendMode: true,
    events: {
        "click .content-filter a": "changeSelect"
    },
    initialize: function () {
        _.bindAll(this, "render", "activity", "changeSelect")
    },
    render: function () {
        $(this.el).html(this.template({}));
        _kmq.push(["record", "Viewed Activity Feed page"]);
        return this.renderActivities()
    },
    renderActivities: function () {
        var b;
        var a = this;
        if (this.friendMode) {
            b = sz.app.data.MyFriendsActivities
        } else {
            b = sz.app.data.GlobalActivities
        }
        b.fetch().success(function () {
            a.$("#content-body").empty();
            if (b.length) {
                b.each(a.activity)
            } else {
                a.$("#content-body").html(a.emptyTemplate({
                    friendMode: a.friendMode
                }));
                $("#content-scroll").addClass("full-screen")
            }
            $("#content").trigger("rendered")
        });
        return this
    },
    activity: function (b, a) {
        var c = new sz.ui.ActivityItem({
            model: b,
            odd: (a % 2 === 0)
        });
        this.$("#content-body").append(c.render().el)
    },
    changeSelect: function (c) {
        var a = $(c.target);
        var b = a.attr("rel");
        this.$(".content-filter a").removeClass("active");
        a.addClass("active");
        this.friendMode = b === "friend";
        this.renderActivities();
        return false
    }
});
sz.ui.MyActivity = Backbone.View.extend({
    emptyTemplate: _.template($("#activities-blank-slate-template").html()),
    id: "content-body",
    initialize: function () {
        _.bindAll(this, "render", "activity")
    },
    render: function (a) {
        var c = this.messagesTemplate;
        var d = {
            name: this.options.name || sz.app.data.User.get("name"),
            myGrid: this.options.myActivity
        };
        if (this.collection.length === 0) {
            if (!a) {
                $("#content-scroll").addClass("full-screen")
            }
            $(this.el).append(this.emptyTemplate(d));
            return this
        }
        var b = this;
        this.collection.each(function (f, e) {
            b.activity(f, e, a)
        });
        $("#content").trigger("rendered");
        return this
    },
    activity: function (c, b, a) {
        var d = "div";
        var e = "activity";
        if (a) {
            d = "li";
            e = c.toJSON().typeClass
        }
        var f = new sz.ui.ActivityItem({
            artist: a,
            model: c,
            tagName: d,
            className: e,
            odd: (b % 2 === 0)
        });
        $(this.el).append(f.render().el)
    }
});
sz.ui.StationGrid = Backbone.View.extend({
    id: "content-body",
    tagName: "div",
    template: _.template($("#station-grid-template").html()),
    emptyTemplate: _.template($("#stations-blank-slate-template").html()),
    stationList: null,
    type: "stations",
    ownerUsername: null,
    myUsername: null,
    isMyGrid: false,
    rendered: false,
    initialize: function () {
        _.bindAll(this, "render", "renderStationList", "renderStation")
    },
    render: function () {
        var a = sz.app.data.Accounts.at(0);
        this.myUsername = a.get("username");
        this.ownerUsername = sz.app.data.User.username;
        this.isMyGrid = (this.myUsername == this.ownerUsername);
        if (!this.rendered) {
            this.stationList.fetch();
            this.rendered = true
        }
        this.$el.html("");
        return this
    },
    renderStation: function (d) {
        var c = new sz.ui.StationGridItem({
            model: d,
            type: this.type
        });
        var b = (this.myUsername !== null && this.myUsername === d.get("user_username"));
        var a = (this.myUsername !== null && this.myUsername === this.ownerUsername);
        c.myUsername = this.myUsername;
        c.isMyStation = b;
        c.isMyGrid = a;
        $(this.el).find("ul").append(c.render().el)
    },
    renderStationList: function () {
        var a = {
            name: sz.app.data.User.get("name"),
            myGrid: (this.myUsername !== null && this.myUsername === this.ownerUsername),
            type: this.type
        };
        if (this.stationList !== null && this.stationList.length !== 0) {
            $(this.el).html(this.template());
            this.stationList.each(this.renderStation)
        } else {
            $("#content-scroll").addClass("full-screen");
            $(this.el).html(this.emptyTemplate(a))
        }
        $(".stations-grid").masonry({
            itemSelector: "li",
            columnWidth: 152,
            isFitWidth: true,
            gutterWidth: 25
        });
        $("#content").trigger("rendered")
    }
});
sz.ui.StationGridItem = Backbone.View.extend({
    tagName: "li",
    options: {
        type: "stations"
    },
    myUsername: "",
    isMyGrid: false,
    isMyStation: false,
    isFavourited: false,
    isSubscribed: false,
    recommendationTemplate: _.template($("#recommended-station-grid-item-template").html()),
    template: _.template($("#station-grid-item-template").html()),
    events: {
        "click .share": "share",
        "click .delete": "deleteItem",
        "click .favorite": "favorite",
        "click .station-create": "createStation"
    },
    initialize: function () {
        _.bindAll(this, "render", "deleteItem", "favorite", "share", "createStation");
        this.model.bind("change", this.render)
    },
    createStation: function () {
        new sz.ui.modals.CreatingStation({
            model: this.model
        }).render();
        return false
    },
    deleteItem: function () {
        if (!this.isMyStation) {
            return
        }
        var a = this;
        var d = a.model.get("id");
        var c = new sz.model.Station({
            id: d
        });
        var b = sz.app.data.User.get("stations_count");
        var e = sz.app.data.User.get("favourites_count");
        new sz.ui.Message({
            title: window.tokens["station.delete.message-title"],
            message: window.tokens["station.delete.message-body"],
            closable: true,
            buttons: {
                Delete: function () {
                    c.destroy().success(function () {
                        sz.app.ui.StationGrid.stationList.fetch();
                        if (a.isMyGrid) {
                            --b;
                            sz.app.data.User.set({
                                stations_count: b
                            });
                            if (a.model.isFavorited()) {
                                --e;
                                sz.app.data.User.set({
                                    favourites_count: e
                                })
                            }
                            sz.app.ui.Player.stopStation(d)
                        }
                        sz.ui.Message.closeAll();
                        _kmq.push(["record", "Deleted Station"])
                    });
                    return false
                },
                Cancel: function () {
                    sz.ui.Message.closeAll();
                    return false
                }
            }
        }).render();
        return false
    },
    share: function () {
        this.model.share();
        return false
    },
    favorite: function () {
        var c = this.$(".favorite");
        var b = this.model.isFavorited();
        var a = this;
        this.model.toggleFavorite().success(function () {
            if (b) {
                $(c).removeClass("active")
            } else {
                $(c).addClass("active")
            }
        }).error(function () {
            new sz.ui.modals.GeneralError().render()
        });
        return false
    },
    render: function () {
        var a = this.model.toJSON();
        a.type = this.options.type;
        a.is_my_station = this.isMyStation;
        a.is_my_grid = this.isMyGrid;
        if (a.user_avatar) {
            $(this.el).html(this.template(a))
        } else {
            $(this.el).html(this.recommendationTemplate(a))
        }
        this.$("img").error(function () {
            var b = $(this);
            var c = b.css("background-image").replace(/^url\(['"]*/, "").replace(/['"]*\)$/, "");
            b.unbind("error").attr("src", c)
        });
        return this
    }
});
sz.ui.StationCreate = Backbone.View.extend({
    tagName: "div",
    id: "create-station-box",
    template: _.template($("#station-create-template").html()),
    events: {
        "click button": "create"
    },
    initialize: function () {
        _.bindAll(this, "render", "create");
        this.model = null
    },
    fillInCopyrightBox: function (a) {
        var d = this.$("#copyright-box");
        var b = $("<img>").attr("alt", "Copyright");
        var c = $("<a>").attr("target", "_blank");
        if (a.source_logo !== "") {
            b.attr("src", a.source_logo);
            $(d).append(b)
        }
        if (a.owner_url && a.owner) {
            c.attr({
                href: a.owner_url,
                title: a.owner
            }).text(a.owner);
            $(d).append(c)
        }
    },
    fillInCreateStationBackground: function (b) {
        var c = this.$("#create-station-background");
        var a = c.find("img");
        $(a).attr("src", b.image_full);
        new sz.ui.ResizedImage(this.$(a), this.$(c), b.width, b.height)
    },
    render: function () {
        var a = this;
        $("#content-scroll").addClass("full-screen");
        $(this.el).html(this.template());
        $.ajax({
            url: "/api/stations/random-image/",
            async: false,
            success: function (b) {
                a.fillInCreateStationBackground(b);
                a.fillInCopyrightBox(b)
            }
        });
        $.autoHinter({
            input: this.$("#create-station input:text"),
            container: this.$(".results"),
            formatItem: function (b) {
                if (b.type === "ARTIST") {
                    return "<li><strong>" + b.artist + "</strong></li>"
                } else {
                    return "<li><strong>" + b.track + "</strong> <span><em>by " + b.artist + "</em></span></li>"
                }
            },
            returnItem: function (b) {
                if (!b) {
                    throw new Error()
                }
                return (b.type === "ARTIST") ? b.artist : b.track
            },
            selectItem: function (b) {
                if (!b) {
                    throw new Error()
                }
                b.name = (b.type === "ARTIST" ? b.artist : b.track) + " Radio";
                a.model = new sz.model.Artist(b)
            },
            createItem: function () {
                a.create()
            },
            notMatch: function () {
                $("div.results").html(a.errorTemplate({}));
                this.model = null
            }
        });
        this.$("#create-station-input input").focus();
        _kmq.push(["record", "Viewed Create Station page"]);
        return this
    },
    create: function () {
        if (this.model && this.model.get("slug")) {
            new sz.ui.modals.CreatingStation({
                model: this.model
            }).render()
        }
        return false
    }
});
sz.ui.StationInfo = Backbone.View.extend({
    tagName: "div",
    id: "artist-box",
    template: _.template($("#station-info-track-template").html()),
    backgroundTemplate: _.template($("#fancy-frame").html()),
    prefetchedTracks: [],
    events: {
        "click .next-song": "nextTrack"
    },
    initialize: function () {
        _.bindAll(this, "render")
    },
    render: function () {
        $(this.el).html(this.template());
        return this
    },
    updateStationInfoTrackImage: function (b) {
        var e = $("#artist-box"),
            f = e.find("#copyright-box"),
            a = e.find("#image-box");
        f.find("img, a").remove();
        if (b.artist_img_source_logo !== "") {
            f.append($("<img>").attr({
                src: b.artist_img_source_logo,
                alt: "Copyright"
            }));
            if (b.artist_img_copyright_url && b.artist_img_copyright_owner) {
                f.append($("<a>").attr({
                    href: b.artist_img_copyright_url,
                    target: "_blank",
                    title: b.artist_img_copyright_owner
                }).html(b.artist_img_copyright_owner))
            }
        }
        var d = this.createImage(b);
        a.find("div.fancy-frame.on-bench").remove();
        a.append(d);
        var c = $(d.find("img")[0]);
        new sz.ui.ResizedImage(c, c.parent().parent(), c.width(), c.height());
        c.load(function () {
            oldActive = a.find(".track-background.active");
            if (oldActive.length == 0) {
                d.addClass("active").removeClass("on-deck").show()
            } else {
                if (oldActive.length == 1) {
                    var g = oldActive.first();
                    if (b.id != g.id) {
                        g.switchClass("active", "on-bench", 500);
                        d.switchClass("on-deck", "active", 500);
                        setTimeout(function () {
                            g.remove;
                            $(".on-deck").remove()
                        }, 600)
                    }
                }
            }
        });
        c.attr("src", b.artist_img_full)
    },
    createImage: function (b) {
        var a = this.backgroundTemplate({
            url: "",
            id: b.id,
            classes: "track-background on-deck"
        });
        return $(a)
    },
    prefetch: function () {
        var a = this;
        a.prefetchedTracks = [];
        sz.app.data.StationTrackImages.station_id = sz.app.data.Station.id;
        sz.app.data.StationTrackImages.fetch(opts = {
            success: function (b, c) {
                _.each(c, function (e, d) {
                    a.prefetchedTracks[e.id] = a.createImage(e);
                    a.prefetchedTracks.push(e.id)
                })
            }
        })
    },
    nextTrack: function () {
        sz.app.ui.Player.forward();
        return false
    }
});
sz.ui.ArtistPage = Backbone.View.extend({
    template: _.template($("#artist-page-template").html()),
    notFoundTemplate: _.template($("#artist-404-template").html()),
    initialize: function () {
        _.bindAll(this, "render")
    },
    events: {
        "click #create-artist-station button": "createStation"
    },
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        _kmq.push(["record", "Viewed Artist Profile"]);
        return this
    },
    createStation: function () {
        new sz.ui.modals.CreatingStation({
            model: this.model
        }).render();
        return false
    },
    render404: function () {
        $(this.el).html(this.notFoundTemplate());
        return this
    }
});
sz.ui.ChatBox = Backbone.View.extend({
    template: _.template($("#chat-box").html()),
    templateItem: _.template($("#chat-list").html()),
    className: "chat-window",
    events: {
        "click a.close": "hide",
        "click a.connect": "connect",
        "click a.connect-cancel": "disconnect",
        "click .invite": "invite",
        "click .hideable": "hideMessage",
        "click .messages": "focusTextarea",
        "keyup textarea": "checkSend",
        "keypress textarea": "checkSend"
    },
    initialize: function () {
        _.bindAll(this, "updateScrollbar");
        this.chat = sz.app.ui.Chat;
        this.model.bind("change:online_presence", this.updateOnlineStatus, this);
        this.chat.bind("connected", this.onConnect, this);
        this.chat.bind("connecting", this.onConnecting, this);
        this.chat.bind("disconnected", this.onDisconnect, this)
    },
    render: function () {
        var a = $(this.el);
        var b = this.model.toJSON();
        b.connected = this.chat.connected();
        b.connecting = this.chat.connecting;
        a.html(this.template(b));
        _kmq.push(["record", "Clicked Friend to Chat"]);
        return this
    },
    updateOnlineStatus: function () {
        var b = this.model.toJSON().online_presence;
        var a = "status-" + b;
        this.$(".icon-sprite").removeClass("status-active status-idle status-offline status-").addClass(a);
        if (this.chat.connected() && b === "offline") {
            this.$(".status-user-offline").show()
        } else {
            this.$(".status-user-offline").hide()
        }
    },
    updateScrollbar: function () {
        var a = this.$(".messages");
        var b = _.map(a.children(), function (c) {
            return $(c).innerHeight()
        });
        a.animate({
            scrollTop: _.reduce(b, function (d, c) {
                return d + c
            }, 0)
        }, "slow")
    },
    appendMessage: function (e, d) {
        var b = _.template($("#chat-list").html());
        var a = new Date();
        var c = (e === "Me");
        if (!$.trim(d)) {
            return
        }
        if (e !== "Me") {
            e = this.model.get("name")
        }
        this.$(".messages").append(b({
            from: e,
            message: d,
            me: c
        }));
        this.updateScrollbar()
    },
    connect: function () {
        this.chat.connect(true);
        return false
    },
    disconnect: function () {
        this.chat.disconnect();
        return false
    },
    invite: function () {
        this.model.invite();
        this.$(".action").children().hide().filter(".invited").show()
    },
    _canFocus: function () {
        var a = this.$("textarea");
        return a.attr("disabled") !== "disabled" && this.chat.el.find("textarea:focus").not(a).length === 0
    },
    show: function (b) {
        var a = this;
        b = b || false;
        $(this.el).css("display", "block");
        this.updateOnlineStatus();
        if ((b && this.$("textarea").attr("disabled") !== "disabled") || this._canFocus()) {
            this.$("textarea").focus()
        }
        setTimeout(function () {
            a.$(".hideable").fadeOut("slow")
        }, 25000)
    },
    hide: function () {
        $(this.el).fadeOut("fast");
        return false
    },
    hideMessage: function (a) {
        $(a.currentTarget).fadeOut("fast");
        this.$("textarea").focus()
    },
    focusTextarea: function () {
        this.$("textarea").focus()
    },
    checkSend: function (c) {
        if (c.keyCode === 27) {
            $(this.el).hide()
        }
        if (!(c.keyCode === 13 && !c.shiftKey)) {
            return true
        }
        c.preventDefault();
        var a = this.$("textarea");
        var b = $.trim(a.val());
        a.val("");
        if (b) {
            this.chat.sendMessage(this.model.id, b);
            this.appendMessage("Me", b)
        }
    },
    onConnect: function () {
        this.$(".status").hide();
        this.$("textarea").removeAttr("disabled").focus();
        this.updateOnlineStatus()
    },
    onConnecting: function () {
        this.$(".status").hide();
        this.$(".status-connecting").show();
        this.$("textarea").attr("disabled", "disabled");
        this.updateOnlineStatus()
    },
    onDisconnect: function () {
        this.$(".status").hide();
        this.$(".status-offline").show();
        this.$("textarea").attr("disabled", "disabled");
        this.updateOnlineStatus()
    }
});
sz.ui.Chat = Backbone.View.extend({
    initialize: function () {
        var a = sz.app.data.AccountSettings.getByKey("facebook_enable_chat");
        this.online = a.get("value");
        this.connection = null;
        this.connecting = false;
        this.chatBoxes = {};
        this.el = $("#chats");
        a.bind("change:value", this.handleConnection, this);
        this.connect();
        $(window).unload(this.disconnect)
    },
    handleConnection: function (b, a) {
        if (this.online === a) {
            return
        }
        this.online = a;
        if (a) {
            this.connect()
        } else {
            this.disconnect()
        }
    },
    connected: function () {
        return this.connection && this.connection.connected && !this.connecting
    },
    connect: function (c) {
        var a = this;
        var d = function (j) {
                var l = j.getAttribute("from");
                var h = j.getAttribute("type");
                var f = j.getElementsByTagName("body");
                if (h == "chat" && f.length > 0) {
                    var g = l.split("@")[0].split("-")[1];
                    var e = f[0];
                    a.showChatBox(g).appendMessage(g, Strophe.getText(e))
                }
                return true
            };
        var b = function (f, g) {
                var e = Strophe.Status;
                if (f === e.DISCONNECTED) {
                    a.connecting = false;
                    a.connection = null;
                    a.trigger("disconnected");
                    if (a.online) {
                        a.connect(true)
                    }
                } else {
                    if (f === e.CONNECTING) {
                        a.connecting = true;
                        a.trigger("connecting")
                    } else {
                        if (f === e.CONNECTED) {
                            a.connection.addHandler(d, null, "message", null, null, null);
                            a.connection.send($pres().tree());
                            a.connecting = false;
                            a.trigger("connected")
                        }
                    }
                }
            };
        c = c || false;
        if (!c && this.connection && this.connection.connected) {
            return
        }
        if (!c && !this.online) {
            return
        }
        this.online = true;
        sz.app.data.AccountSettings.getByKey("facebook_enable_chat").save({
            value: true
        });
        if (this.connection === null) {
            this.connection = new Strophe.Connection("http://chat.senzari.com:5280/http-bind/")
        }
        this.connection.facebookConnect(facebook_uid + "@chat.facebook.com/senzari", b, 60, 1)
    },
    disconnect: function () {
        if (!this.connection) {
            return
        }
        this.connection.disconnect();
        this.online = false;
        sz.app.data.AccountSettings.getByKey("facebook_enable_chat").save({
            value: false
        })
    },
    sendMessage: function (e, d) {
        var a = this;
        var b = function () {
                a.unbind("connect", b);
                a.sendMessage(e, d)
            };
        if (!this.connected()) {
            this.connect();
            this.bind("connected", b);
            return
        }
        var c = $msg({
            to: "-" + e + "@chat.facebook.com",
            type: "chat"
        }).cnode(Strophe.xmlElement("body", d));
        this.connection.send(c.tree())
    },
    sendInvitation: function (b) {
        var a = _lc("invitation.user.invite.fb-message");
        this.sendMessage(b, a)
    },
    showChatBox: function (b, c) {
        if (!b.id) {
            b = sz.app.data.FriendList.get(b.toString())
        }
        var a = this.chatBoxes[b.id];
        if (!a) {
            a = this.renderChatBox(b)
        }
        a.show(c);
        return a
    },
    renderChatBox: function (b) {
        var c = new sz.ui.ChatBox({
            model: b
        });
        var a = c.render().el;
        this.chatBoxes[b.id] = c;
        this.el.append(a);
        return c
    }
});
(function () {
    var a, b = Object.prototype.hasOwnProperty,
        d = function (h, f) {
            for (var e in f) {
                if (b.call(f, e)) {
                    h[e] = f[e]
                }
            }
            function g() {
                this.constructor = h
            }
            g.prototype = f.prototype;
            h.prototype = new g;
            h.__super__ = f.prototype;
            return h
        },
        c = Array.prototype.indexOf ||
    function (g) {
        for (var f = 0, e = this.length; f < e; f++) {
            if (f in this && this[f] === g) {
                return f
            }
        }
        return -1
    };
    a = (function (f) {
        d(e, f);
        function e(g) {
            var h = this;
            this.latlng_ = g.latlng;
            this.place_ = g.place;
            this.map_ = g.map;
            this.div_ = null;
            this.setMap(this.map_);
            this.boundsChangedListener_ = google.maps.event.addListener(this.map_, "bounds_changed", function () {
                var j;
                j = h.getProjection().fromLatLngToDivPixel(h.latlng_);
                return h.div_.css({
                    left: j.x - 127,
                    top: j.y - 87 - 41
                })
            });
            return this
        }
        e.prototype.draw = function () {
            var j, h, g;
            if (this.div_ == null) {
                g = _.template($("#map-popup").html());
                j = $("<div class='map-popup'/>");
                j.html(g({
                    place: this.place_
                }));
                h = this.getProjection().fromLatLngToDivPixel(this.latlng_);
                j.css({
                    left: h.x - 127,
                    top: h.y - 87 - 41
                });
                return this.div_ = j
            }
        };
        e.prototype.open = function () {
            this.draw();
            return this.getPanes().floatPane.appendChild(this.div_[0])
        };
        e.prototype.close = function () {
            return this.remove()
        };
        e.prototype.remove = function () {
            if (this.div_) {
                return this.div_.remove()
            }
        };
        return e
    })(google.maps.OverlayView);
    sz.ui.MapSearch = {
        OK: "ok",
        ERROR: "error",
        ERROR_LOCATION_NOT_SPECIFIED: "error, location not found",
        ERROR_LOCATION_NOT_FOUND: "error, location not specified",
        ERROR_USER_DENIED: "error, user denied location request",
        ERROR_POSITION_UNAVAILABLE: "error, position unavailable",
        searchPlaces: function (e, g) {
            var f;
            f = [];
            return f
        },
        searchAddress: function (e, j) {
            var g, f, h = this;
            f = [];
            g = new google.maps.Geocoder();
            return g.geocode({
                address: e
            }, function (p, n) {
                var m, q, o, l;
                if (n === google.maps.GeocoderStatus.OK && p.length > 0) {
                    q = function (r) {
                        var s;
                        s = {
                            coords: {
                                latitude: r.geometry.location.lat(),
                                longitude: r.geometry.location.lng()
                            },
                            name: r.formatted_address
                        };
                        return f.push(s)
                    };
                    for (o = 0, l = p.length; o < l; o++) {
                        m = p[o];
                        q(m)
                    }
                }
                if (j) {
                    return j(f)
                }
            })
        },
        profileLocation: function (h) {
            var f, e, g;
            f = sz.app.data.Accounts.at(0).get("geo_city");
            g = JSON.parse(f);
            e = {
                coords: {
                    latitude: g.latitude,
                    longitude: g.longitude
                },
                name: "My Location",
                from: "Profile"
            };
            if (!g.longitude && !g.latitude) {
                return h(null, this.ERROR_LOCATION_NOT_SPECIFIED)
            } else {
                return h(e, this.OK)
            }
        },
        defaultLocation: function (j) {
            var h, g, e;
            e = this;
            h = function (m, l) {
                return j(m, l)
            };
            g = {
                maximumAge: 0,
                timeout: 5000
            };
            if (!navigator.geolocation) {
                e.profileLocation(h)
            }
            try {
                return navigator.geolocation.getCurrentPosition(function (m) {
                    var l;
                    l = {
                        coords: {
                            latitude: m.coords.latitude,
                            longitude: m.coords.longitude
                        },
                        name: "My Location",
                        from: "Browser"
                    };
                    return j(l, e.OK)
                }, function (l) {
                    return e.profileLocation(h)
                }, g)
            } catch (f) {
                return e.profileLocation(h)
            }
        }
    };
    sz.ui.LocationDetail = Backbone.View.extend({
        id: "location-detail",
        template: _.template($("#location-detail-template").html()),
        options: {
            viewType: "all"
        },
        initialize: function () {
            _.bindAll(this, "prevArtist", "nextArtist", "switchTab", "renderArtist");
            this.model.bind("all", this.modelChanged, this);
            this.carouselIndex = 0;
            this.currentView = "all";
            this.viewType = "all";
            this.collectionName = "artists";
            return this.modelLength = 0
        },
        events: {
            "click .previous": "prevArtist",
            "click .next": "nextArtist",
            "click #location-detail-filter li": "switchTab",
            "click .location-close": "remove"
        },
        modelChanged: function () {
            var f, e;
            e = this.model.get("dailyArtists") ? "today" : this.model.get("weeklyArtists") ? "weekly" : "all";
            f = e === "today" ? "dailyArtists" : e === "weekly" ? "weeklyArtists" : "artists";
            this.currentView = e;
            this.viewType = e;
            return this.collectionName = f
        },
        render: function () {
            var e;
            e = this.model.toJSON();
            _.extend(e, {
                activeTab: this.currentView,
                viewType: this.viewType,
                currentArtists: this.model.get(this.collectionName),
                hasDaily: this.viewType === "today",
                hasWeekly: this.viewType === "weekly" || this.viewType === "today"
            });
            $(this.el).html(this.template(e));
            _.each(e.currentArtists, this.renderArtist);
            this.carouselIndex = 0;
            this.modelLength = e.currentArtists.length;
            this.renderFacepile();
            _kmq.push(["record", "Viewed Location detail layer"]);
            return this
        },
        renderArtist: function (g) {
            var e, f;
            g.image = g.thumbnail;
            e = new sz.model.Artist(g);
            f = new sz.ui.StationGridItem({
                model: e
            });
            return this.$(".artist-carousel > ul").append(f.render().el)
        },
        nextArtist: function () {
            var e;
            if (this.carouselIndex > (this.modelLength - 2)) {
                return false
            }
            this.carouselIndex += 1;
            this.renderFacepile();
            e = this.carouselIndex * 168 * -1;
            this.$(".artist-carousel > ul").stop().animate({
                left: e
            }, "slow");
            return false
        },
        prevArtist: function () {
            var e;
            if (this.carouselIndex === 0) {
                return false
            }
            this.carouselIndex -= 1;
            this.renderFacepile();
            e = this.carouselIndex * 168 * -1;
            this.$(".artist-carousel > ul").stop().animate({
                left: e
            }, "slow");
            return false
        },
        switchTab: function (f) {
            this.currentView = $(f.target).attr("rel");
            return this.render()
        },
        renderFacepile: function () {
            var e, h, l, g, j, f;
            this.$("#location-facepile ul").empty();
            e = this.model.get("artists")[this.carouselIndex];
            if (e && e.friends) {
                j = e.friends;
                f = [];
                for (l = 0, g = j.length; l < g; l++) {
                    h = j[l];
                    f.push(this.renderFacepileFriend(h))
                }
                return f
            }
        },
        renderFacepileFriend: function (h) {
            var g, f, e, j;
            g = "https://graph.facebook.com/" + h + "/picture";
            j = "https://www.facebook.com/" + h + "/";
            e = $("<img>").attr({
                src: g,
                width: 52,
                height: 52
            });
            f = $("<a>").attr({
                href: j,
                target: "_blank"
            });
            return this.$("#location-facepile ul").append($("<li>").append(f.append(e)))
        },
        remove: function () {
            var e;
            e = this.options.parentView;
            e.closeAllMarkers(true, false);
            return sz.ui.LocationDetail.__super__.remove.apply(this, arguments)
        }
    });
    sz.ui.FeaturedMap = Backbone.View.extend({
        template: _.template($("#featured-maps").html()),
        initialize: function () {
            _.bindAll(this, "appendData", "generateSearchUrl", "showPlace");
            return this.bubble_event = true
        },
        events: {
            "click .place-link": "showPlace",
            "touchend .place-link": "showPlace",
            "click #map": "closeAllMarkers"
        },
        renderMap: function () {
            var e, f = this;
            this.markers = [];
            this.places = [];
            this.popupWindows = {};
            this.map = new google.maps.Map(this.$("#map")[0], {
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            this.coords = {
                latitude: 39.828175,
                longitude: -98.5795
            };
            this.map.setCenter(new google.maps.LatLng(this.coords.latitude, this.coords.longitude));
            this.map.setZoom(4);
            sz.ui.MapSearch.defaultLocation(function (h, g) {
                if (g === sz.ui.MapSearch.OK) {
                    f.coords = h.coords;
                    f.map.setCenter(new google.maps.LatLng(f.coords.latitude, f.coords.longitude));
                    if (h.from === "Profile") {
                        f.map.setZoom(12);
                        f.map.setOptions({
                            maxZoom: 17,
                            minZoom: 10
                        })
                    } else {
                        if (h.from === "Browser") {
                            f.map.setZoom(15);
                            f.map.setOptions({
                                maxZoom: 17,
                                minZoom: 10
                            })
                        }
                    }
                }
                return google.maps.event.addListener(f.map, "idle", function () {
                    var m, l, n, j;
                    l = f.map.getCenter();
                    f.coords = {
                        latitude: l.lat(),
                        longitude: l.lng()
                    };
                    n = f.generateSearchUrl();
                    f.appendData(n);
                    j = [];
                    while (f.markers.length > 250) {
                        m = f.markers.shift();
                        j.push(m.setMap(null))
                    }
                    return j
                })
            });
            return e = new sz.ui.MapHinter({
                map: this
            })
        },
        setCenter: function () {
            var e;
            e = new google.maps.LatLng(this.coords.latitude, this.coords.longitude);
            return this.map.setCenter(e)
        },
        render: function () {
            $(this.el).html(this.template());
            _kmq.push(["record", "Viewed Location map page"]);
            return this
        },
        destroy: function () {
            var e;
            while (e = this.markers.shift()) {
                e.setMap(null)
            }
            return this.places = []
        },
        searchMap: function (g) {
            var f;
            if (g.keyCode === 13) {
                this.destroy();
                f = this.generateSearchUrl($(g.target).val());
                this.appendData(f);
                return this.hidePlace()
            }
        },
        generateSearchUrl: function (h) {
            var j, f, g, e;
            j = this.coords.latitude || 39.828175;
            f = this.coords.longitude || -98.5795;
            if (h != null) {
                g = escape(h)
            }
            e = "/api/1.0/places/?format=json&near=" + j + "," + f;
            if (g != null) {
                e = e + ("&q=" + g)
            }
            return e
        },
        closeAllMarkers: function (f, h) {
            var g, e;
            if (f == null) {
                f = this.bubble_event
            }
            if (h == null) {
                h = this.$("#location-detail").length === 1
            }
            if (_(f).has("type")) {
                f = this.bubble_event
            }
            this.bubble_event = true;
            if (!f || h) {
                return
            }
            e = [];
            for (g in this.popupWindows) {
                e.push(this.popupWindows[g].close())
            }
            return e
        },
        appendData: function (e) {
            var f = this;
            return $.getJSON(e, function (m) {
                var j, l, h, g;
                g = [];
                for (l = 0, h = m.length; l < h; l++) {
                    j = m[l];
                    g.push((function (p) {
                        var t, s, u, q, o, n, r;
                        if (r = p.id, c.call(f.places, r) < 0) {
                            s = p.loc[1];
                            q = p.loc[0];
                            u = new google.maps.LatLng(s, q);
                            t = "/static/images/v3/icon-map-marker.png";
                            o = new google.maps.Marker({
                                map: f.map,
                                position: u,
                                title: p.name,
                                icon: t
                            });
                            n = new a({
                                map: f.map,
                                place: p,
                                latlng: u
                            });
                            f.popupWindows[p.id] = n;
                            google.maps.event.addListener(o, "click", function () {
                                if (f.$("#location-detail").length) {
                                    return
                                }
                                f.closeAllMarkers(true, false);
                                f.popupWindows[p.id].open(f.map, o);
                                return f.bubble_event = false
                            });
                            google.maps.event.addDomListener(o, "touch", function () {
                                if (f.$("#location-detail").length) {
                                    return
                                }
                                f.closeAllMarkers(true, false);
                                f.popupWindows[p.id].open(f.map, o);
                                return f.bubble_event = false
                            });
                            f.markers.push(o);
                            return f.places.push(p.id)
                        }
                    })(j))
                }
                return g
            })
        },
        showPlace: function (j) {
            var h, f, e, g, l = this;
            h = $(this.el);
            g = $(j.currentTarget).attr("rel");
            e = new sz.model.Place({
                id: g
            });
            f = new sz.ui.LocationDetail({
                model: e,
                parentView: this
            });
            e.fetch({
                success: function (n, m) {
                    return h.append(f.render().el)
                }
            });
            return false
        }
    })
}).call(this);
sz.ui.TrackHistoryCarousel = Backbone.View.extend({
    template: _.template($("#songs-played-carousel-template").html()),
    scrollWidth: 102,
    animateLength: 0,
    currentLocation: 0,
    dataForIndex: [],
    totalImages: function () {
        return $("#carousel li").length
    },
    events: {
        "click .actions a.next": "moveForward",
        "click .actions a.back": "moveBackward",
        "click .actions a.current-station": "currentStation"
    },
    initialize: function () {
        _.bindAll(this, "render", "fillInTrack", "addTrack", "currentStation", "moveForward", "moveBackward");
        this.playedTracks = sz.app.data.TrackHistory;
        this.playedTracks.bind("add", this.addTrack, this);
        this.player = sz.app.ui.Player;
        this.player.on("stopped", this.updateCurrentStation, this);
        this.player.on("playing", this.updateCurrentStation, this)
    },
    updateNavigation: function () {
        var b = this.currentLocation;
        var a = this.dataForIndex.length;
        this.$(".back,.next").css("visibility", "hidden");
        if (a === 0) {
            return
        }
        if (b !== 0) {
            this.$(".back").css("visibility", "visible")
        }
        if (a > b + 1) {
            this.$(".next").css("visibility", "visible")
        }
    },
    addTrack: function (b) {
        var c = $("<img>").attr("src", b.get("artist_img_thumb")).addClass("default");
        var a = $("<li>").append(c);
        var d = this.$("#carousel-images");
        c.error(function () {
            var e = $(this);
            var f = e.css("background-image").replace(/^url\(['"]*/, "").replace(/['"]*\)$/, "");
            e.unbind("error").attr("src", f)
        });
        this.dataForIndex.push(b);
        this.currentLocation = this.dataForIndex.length - 1;
        d.append(a);
        if (this.dataForIndex.length == 1) {
            d.css("left", "47px")
        } else {
            d.animate({
                left: ((this.currentLocation * this.scrollWidth) - 47) * -1
            }, this.animateLength)
        }
        this.fillInTrack(b)
    },
    updateCurrentStation: function () {
        if (this.player.model.id) {
            this.$("a.current-station").css("visibility", "visible")
        } else {
            this.$("a.current-station").css("visibility", "hidden")
        }
    },
    currentStation: function () {
        if (this.player.model.id) {
            location.href = "#/stations/" + this.player.model.id + "/"
        }
        return false
    },
    fillInTrack: function (c) {
        var b = "",
            e = "Not Playing",
            a = "",
            d = "";
        if (typeof c !== "undefined") {
            b = c.get("album");
            e = c.get("title");
            a = c.get("artist");
            d = "#/artists/" + c.get("artist_slug") + "/"
        }
        this.$(".data .album-title").text(b);
        this.$(".data .song-title").text(e);
        this.$(".data h3 a").text(a);
        this.$(".data h3 a").attr("href", d);
        this.updateNavigation()
    },
    render: function () {
        $(this.el).html(this.template());
        return this
    },
    moveForward: function () {
        if (this.currentLocation >= this.totalImages() - 1 || this.totalImages() === 1) {
            return false
        }
        var b = parseInt($("#carousel ul").css("left"), 10);
        var a = this.animateLength;
        $("#carousel ul").animate({
            left: b - this.scrollWidth
        }, a);
        this.currentLocation += 1;
        var c = this.dataForIndex[this.currentLocation];
        this.fillInTrack(c);
        return false
    },
    moveBackward: function () {
        if (this.currentLocation <= 0) {
            return false
        }
        var b = parseInt($("#carousel ul").css("left"), 10);
        var a = this.animateLength;
        $("#carousel ul").animate({
            left: b + this.scrollWidth
        }, a);
        this.currentLocation -= 1;
        var c = this.dataForIndex[this.currentLocation];
        this.fillInTrack(this.dataForIndex[this.currentLocation]);
        return false
    }
});
(function () {
    var b = function (d, e) {
            return function () {
                return d.apply(e, arguments)
            }
        },
        a = Object.prototype.hasOwnProperty,
        c = function (g, e) {
            for (var d in e) {
                if (a.call(e, d)) {
                    g[d] = e[d]
                }
            }
            function f() {
                this.constructor = g
            }
            f.prototype = e.prototype;
            g.prototype = new f;
            g.__super__ = e.prototype;
            return g
        };
    sz.ui.EditorialPageView = (function (e) {
        c(d, e);
        function d() {
            this.renderUserStations = b(this.renderUserStations, this);
            d.__super__.constructor.apply(this, arguments)
        }
        d.prototype.id = "editorial-page";
        d.prototype.render = function () {
            var f;
            $(this.el).html(this.model.get("html_template"));
            f = $(this.el).find(".editorial-overlay img");
            new sz.ui.ResizedImage(f, f.parent(), f.width(), f.height());
            this.renderUserStations();
            sz.app.ui.UserNavigation.setSelected();
            _kmq.push(["record", "Viewed Editorial page"]);
            return this.el
        };
        d.prototype.renderUserStations = function () {
            var f = this;
            this.$(".user-stations").each(function (h, j) {
                var g, l;
                l = $(j).attr("rel");
                g = null;
                _.each($(j).attr("class").split(" "), function (m) {
                    var n;
                    if (m.startsWith("limit-")) {
                        n = Number(m.replace("limit-", ""));
                        return g = n > 0 ? n : null
                    }
                });
                if (l) {
                    $(j).html('<ul class="stations-grid"></ul>');
                    sz.app.data.UserStations.username = l;
                    return $.when(sz.app.data.UserStations.fetch()).then(function () {
                        var q, o, p, n, m;
                        g = g ? g : sz.app.data.UserStations.models.length;
                        q = sz.app.data.UserStations.models.slice(0, g);
                        p = function (s) {
                            var r;
                            r = new sz.ui.StationGridItem({
                                model: s
                            });
                            return $(j).find(".stations-grid").append(r.render().el)
                        };
                        for (n = 0, m = q.length; n < m; n++) {
                            o = q[n];
                            p(o)
                        }
                        return $(".stations-grid").masonry({
                            itemSelector: "li",
                            columnWidth: 152,
                            isFitWidth: true,
                            gutterWidth: 25
                        })
                    })
                }
            });
            return this.el
        };
        return d
    })(Backbone.View)
}).call(this);
sz.controllers.BaseController = Backbone.Router.extend({
    initialize: function () {
        _.bindAll(this);
        this.initSubViews();
        this.initData();
        this.renderSubViews();
        this.initialized = false
    },
    initSubViews: function () {
        if (this.initialized) {
            return
        }
        sz.app.ui.UserNavigation = new sz.ui.UserNavigation({
            el: $("#nav")
        });
        sz.app.ui.Chat = new sz.ui.Chat();
        sz.app.ui.FriendList = new sz.ui.FriendList({
            el: $("#friends")
        });
        sz.app.ui.Player = new sz.ui.Player({
            el: $("#player-container")
        });
        sz.app.ui.ActivityFeed = new sz.ui.ActivityFeed();
        sz.app.ui.StationGrid = new sz.ui.StationGrid();
        sz.app.ui.UserProfile = new sz.ui.UserProfile();
        sz.app.ui.UserProfileAccount = new sz.ui.UserProfileAccount();
        sz.app.ui.StationCreate = new sz.ui.StationCreate();
        sz.app.ui.StationInfo = new sz.ui.StationInfo();
        sz.app.ui.ArtistPage = new sz.ui.ArtistPage();
        sz.app.ui.TrackHistoryCarousel = new sz.ui.TrackHistoryCarousel({
            el: $("#carousel")
        });
        this.initialized = true
    },
    initData: function () {
        this.fetchInviteData();
        this.fetchFriendStatus()
    },
    renderSubViews: function () {
        var a = $("#main");
        $("#content").html(sz.app.ui.StationCreate.render().el);
        sz.app.ui.UserNavigation.render();
        sz.app.ui.TrackHistoryCarousel.render();
        sz.app.ui.FriendList.render();
        sz.app.ui.Player.render()
    },
    fetchInviteData: function () {
        sz.app.data.UninvitedFriendList.fetch();
        setInterval(function () {
            sz.app.data.UninvitedFriendList.fetch()
        }, 30000)
    },
    fetchFriendStatus: function () {
        sz.app.data.FriendList.fetch();
        setInterval(function () {
            sz.app.data.FriendList.update({}, ["online_presence", "current_station"])
        }, 60000)
    }
});
(function () {
    var a = Object.prototype.hasOwnProperty,
        b = function (f, d) {
            for (var c in d) {
                if (a.call(d, c)) {
                    f[c] = d[c]
                }
            }
            function e() {
                this.constructor = f
            }
            e.prototype = d.prototype;
            f.prototype = new e;
            f.__super__ = d.prototype;
            return f
        };
    sz.controllers.Editorial = (function (d) {
        b(c, d);
        function c() {
            c.__super__.constructor.apply(this, arguments)
        }
        c.prototype.routes = {
            ":editorialProfileId/": "editorialProfile"
        };
        c.prototype.editorialProfile = function (f) {
            var e, g = this;
            this.page = null;
            sz.app.data.EditorialPages.each(function (j) {
                var h;
                h = j.get("page_url");
                if (("/#/" + f + "/") === h) {
                    return g.page = j
                }
            });
            if (this.page) {
                e = new sz.ui.EditorialPageView({
                    model: this.page
                });
                return $("#content").html(e.render())
            }
        };
        return c
    })(Backbone.Router)
}).call(this);
sz.controllers.Account = Backbone.Router.extend({
    routes: {
        "accounts/": "index",
        "accounts/login/": "login",
        "accounts/logout/": "logout",
        "accounts/info/": "accountInfo"
    },
    initialize: function () {
        _.bindAll(this, "index", "login", "logout")
    },
    index: function (a) {},
    accountInfo: function () {
        sz.app.ui.UserNavigation.setSelected();
        sz.app.ui.UserProfileAccount = new sz.ui.UserProfileAccount();
        $("#content").html(sz.app.ui.UserProfileAccount.render().el)
    },
    login: function () {},
    logout: function () {}
});
sz.controllers.Featured = Backbone.Router.extend({
    routes: {
        "/": "featured",
        "featured/": "featured",
        "featured/popular/": "featuredPopular",
        "featured/activity/": "featuredActityFeed",
        "featured/map/": "featuredMaps",
        "featuredpage/": "featured"
    },
    initialize: function () {
        _.bindAll(this, "featured", "featuredPopular", "featuredActityFeed", "featuredMaps")
    },
    featured: function () {
        sz.app.ui.UserNavigation.setSelected();
        $("#content").html(sz.app.ui.Featured.render().el)
    },
    featuredMaps: function () {
        sz.app.ui.UserNavigation.setSelected();
        if (typeof sz.app.ui.FeaturedMap === "undefined") {
            $(window).resize(function () {
                google.maps.event.trigger(sz.app.ui.FeaturedMap.map, "resize")
            })
        }
        sz.app.ui.FeaturedMap = new sz.ui.FeaturedMap();
        var a = sz.app.ui.FeaturedMap;
        $("#content-scroll").addClass("full-screen");
        $("#content").html(a.render().el);
        a.renderMap()
    },
    featuredPopular: function () {
        sz.app.ui.UserNavigation.setSelected();
        sz.app.ui.FeaturedPopular = new sz.ui.FeaturedPopular();
        $("#content-scroll").removeClass("full-screen");
        $("#content").html(sz.app.ui.FeaturedPopular.render().el)
    },
    featuredActityFeed: function () {
        sz.app.ui.UserNavigation.setSelected();
        sz.app.ui.ActivityFeed = new sz.ui.ActivityFeed();
        $("#content-scroll").removeClass("full-screen");
        $("#content").html(sz.app.ui.ActivityFeed.render().el)
    }
});
sz.controllers.Profile = Backbone.Router.extend({
    routes: {
        "users/:user/stations/": "userStations",
        "users/:user/favourites/": "userFavorites",
        "users/:user/activities/": "userActivities",
        "users/:user/recommendations/": "userRecommendations"
    },
    initialize: function () {
        _.bindAll(this, "userStations", "userFavorites", "renderUserProfile")
    },
    renderUserProfile: function (a, b) {
        sz.app.data.User.username = a;
        sz.app.data.User.fetch().success(function (d, c) {
            if (sz.app.ui.StationGrid.stationList) {
                sz.app.ui.StationGrid.stationList.unbind();
                sz.app.ui.StationGrid.stationList = null
            }
            $("#content").html(sz.app.ui.UserProfile.render(b).el);
            switch (b) {
            case "stations":
                sz.app.ui.StationGrid.stationList = new sz.model.UserStations();
                _kmq.push(["record", "Viewed User Profile: Stations"]);
                break;
            case "favorites":
                sz.app.ui.StationGrid.stationList = new sz.model.UserFavourites();
                _kmq.push(["record", "Viewed User Profile: Favorites"]);
                break;
            case "recommendations":
                sz.app.ui.StationGrid.stationList = new sz.model.BrowseRecommended();
                _kmq.push(["record", "Viewed User Profile: Recommendations"]);
                break;
            default:
                break
            }
            sz.app.ui.StationGrid.stationList.username = a;
            sz.app.ui.StationGrid.type = b;
            sz.app.ui.StationGrid.rendered = false;
            sz.app.ui.StationGrid.stationList.bind("all", sz.app.ui.StationGrid.renderStationList);
            $("#content-scroll").removeClass("full-screen");
            $("#content .content-box-full").append(sz.app.ui.StationGrid.render().el);
            sz.app.ui.UserProfile.setSelected();
            sz.app.ui.UserNavigation.setSelected()
        }).error(function () {
            $("#content-scroll").addClass("full-screen");
            $("#content").html($("#user-no-profile-template").html())
        })
    },
    userActivities: function (a) {
        sz.app.data.User.username = a;
        sz.app.data.UserActivities.username = a;
        sz.app.data.User.fetch().success(function (c, b) {
            $("#content").html(sz.app.ui.UserProfile.render("activities").el);
            sz.app.ui.UserProfile.setSelected();
            sz.app.ui.UserNavigation.setSelected();
            sz.app.data.UserActivities.fetch().success(function () {
                var f = sz.app.data.UserActivities;
                var d = (sz.app.data.Accounts.first().get("username") === a);
                var e = new sz.ui.MyActivity({
                    collection: f,
                    myActivity: d
                });
                $("#content-scroll").removeClass("full-screen");
                $("#content .content-box-full").append(e.render().el);
                _kmq.push(["record", "Viewed User Profile: Activities"])
            })
        })
    },
    userStations: function (a) {
        this.renderUserProfile(a, "stations")
    },
    userFavorites: function (a) {
        this.renderUserProfile(a, "favorites")
    },
    userRecommendations: function (a) {
        this.renderUserProfile(a, "recommendations")
    }
});
sz.controllers.Station = Backbone.Router.extend({
    routes: {
        "station/create/": "stationCreate",
        "stations/:stationId/": "stationInfo",
        "stations/:stationId/play/": "playStation"
    },
    initialize: function () {
        _.bindAll(this, "playStation", "stationInfo")
    },
    stationCreate: function (a) {
        $("#content").html(new sz.ui.StationCreate().render().el);
        sz.app.ui.UserNavigation.setSelected()
    },
    stationInfo: function (a) {
        if (sz.app.data.Station.get("id") !== a) {
            this.playStation(a);
            return
        }
        sz.app.ui.UserNavigation.setSelected();
        $("#content-scroll").addClass("full-screen");
        $("#content").html(sz.app.ui.StationInfo.render().el);
        if (sz.app.data.TrackHistory.last()) {
            sz.app.ui.StationInfo.updateStationInfoTrackImage(sz.app.data.TrackHistory.last().toJSON())
        }
    },
    playStation: function (b) {
        var a = this;
        var c = function () {
                sz.app.ui.Player.playStation(b);
                a.stationInfo(b);
                sz.app.ui.Player.unbind("ready", c)
            };
        sz.app.data.Station.set({
            id: b
        }, {
            silent: true
        });
        sz.app.data.Station.fetch().success(function (e, d) {
            if (sz.app.ui.Player.ready) {
                sz.app.ui.Player.playStation(b);
                a.stationInfo(b)
            } else {
                sz.app.ui.Player.bind("ready", c)
            }
        })
    }
});
sz.controllers.Artist = Backbone.Router.extend({
    routes: {
        "artists/:artistSlug/": "artistProfile"
    },
    initalize: function () {
        _.bindAll(this, "artistProfile")
    },
    handle404: function () {
        sz.app.ui.ArtistPage = new sz.ui.ArtistPage();
        $("#content").html(sz.app.ui.ArtistPage.render404().el);
        $("#content-scroll").addClass("full-screen")
    },
    artistProfile: function (b) {
        var a = this;
        $("#content-scroll").removeClass("full-screen");
        sz.app.data.Artist.slug = b;
        sz.app.data.Artist.fetch({
            success: function (d, c) {
                sz.app.ui.ArtistPage = new sz.ui.ArtistPage({
                    model: sz.app.data.Artist
                });
                $("#content").html(sz.app.ui.ArtistPage.render().el).trigger("rendered");
                var e = d.getSimilars({
                    limit: 10
                });
                e.fetch({
                    success: function (j, g) {
                        var f = j.models;
                        var h = $("#similar-artists");
                        if (f.length > 0) {
                            h.empty();
                            _.each(f, function (l) {
                                var m = new sz.ui.StationGridItem({
                                    model: l
                                });
                                h.append(m.render().el)
                            });
                            h.masonry({
                                itemSelector: "li",
                                columnWidth: 188,
                                isFitWidth: true,
                                gutterWidth: -18
                            });
                            $("#content").trigger("rendered")
                        }
                    }
                });
                sz.app.data.ArtistActivities.slug = b;
                sz.app.data.ArtistActivities.fetch({
                    success: function (g, h) {
                        var f = new sz.ui.MyActivity({
                            collection: g,
                            myActivity: false,
                            name: sz.app.data.Artist.get("name"),
                            el: $("#artist-activities"),
                            id: null
                        });
                        f.render(true)
                    },
                    error: function (g, f) {
                        if (f.status == 404) {}
                    }
                })
            },
            error: function (d, c) {
                if (c.status == 404) {
                    a.handle404();
                    return false
                }
            }
        })
    }
});
sz.controllers.Index = Backbone.Router.extend({
    routes: {
        "/": "index"
    },
    initialize: function () {
        _.bindAll(this, "index")
    },
    index: function () {}
});
$(document).ready(function () {
    var b = "initial_path";
    var a = (function () {
        var f = document.cookie.split(";");
        var c = (new Date((new Date()).valueOf() - 2 * 24 * 60 * 60 * 1000)).toGMTString();
        var e = null;
        for (var d in f) {
            e = $.trim(f[d]);
            if (e.indexOf(b) == 0) {
                document.cookie = b + "=; expires=" + c + "; path=/";
                return unescape(e.split("=")[1])
            }
        }
        return
    })();
    if (a) {
        location.href = a
    }
    $.when(sz.app.data.Accounts.fetch(), sz.app.data.AccountSettings.fetch()).then(function () {
        var c = sz.app.data.Accounts.at(0);
        var d = (c != null) ? c.get("username") : null;
        sz.app.data.MyFavourites.username = d;
        $.when(sz.app.data.MyFavourites.fetch(), sz.app.data.EditorialPages.fetch()).then(function () {
            sz.app.controller.Base = new sz.controllers.BaseController();
            sz.app.controller.Index = new sz.controllers.Index();
            sz.app.controller.Featured = new sz.controllers.Featured();
            sz.app.controller.Station = new sz.controllers.Station();
            sz.app.controller.Artist = new sz.controllers.Artist();
            sz.app.controller.Profile = new sz.controllers.Profile();
            sz.app.controller.Account = new sz.controllers.Account();
            sz.app.controller.Editorial = new sz.controllers.Editorial();
            Backbone.history.start()
        })
    })
});
$(window).bind("load", function () {
    $("#fade").removeClass("loading").hide().empty()
});
(function () {
    var a;
    a = (function () {
        var b;
        b = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            esc: 27,
            enter: 13,
            back: 8
        };
        function c(d) {
            var f, e, g = this;
            f = {
                map: sz.app.ui.FeaturedMap,
                input: jQuery("#location-search-input"),
                results: jQuery("#location-search-results"),
                delay: 500,
                minChars: 1,
                maxResults: 15
            };
            this.selected = null;
            this.options = jQuery.extend(f, d);
            e = jQuery.browser.opera ? "keypress" : "keydown";
            this.options.input.bind(e, function (h) {
                return g.inputEvent(h)
            });
            this.options.results.show();
            this.options.input.attr("autocorrect", "off");
            this.options.input.attr("autocapitalize", "words");
            this.options.input.attr("autocomplete", "off")
        }
        c.prototype.inputEvent = function (f) {
            var d;
            d = f.keyCode || f.which;
            switch (d) {
            case b.esc:
                this.selectNone();
                return this.hideHint();
            case b.up:
                return this.actionUp();
            case b.down:
                return this.actionDown();
            case b.enter:
                if (this.selected != null) {
                    this.selectSelected()
                } else {
                    this.selectFirst()
                }
                return this.hideHint();
            case b.back:
                this.hideHint();
                return this.selectNone();
            default:
                if (this.timeout != null) {
                    clearTimeout(this.timeout)
                }
                return this.freshResults()
            }
        };
        c.prototype.hideHint = function () {
            return this.options.results.hide()
        };
        c.prototype.actionUp = function () {
            var d;
            if (this.selected == null) {
                this.selected = this.options.results.find("li:first")
            }
            d = $(this.selected).prev();
            if (d.length > 0) {
                this.selected = d
            }
            this.options.results.find("li").removeClass("selected");
            $(this.selected).addClass("selected");
            return false
        };
        c.prototype.actionDown = function () {
            var d;
            if (this.selected == null) {
                this.selected = this.options.results.find("li:first")
            }
            d = $(this.selected).next();
            if (d.length > 0) {
                this.selected = d
            }
            this.options.results.find("li").removeClass("selected");
            $(this.selected).addClass("selected");
            return false
        };
        c.prototype.selectSelected = function () {
            if (this.selected != null) {
                return this.open(this.selected)
            }
        };
        c.prototype.selectNone = function () {
            this.selected = null;
            this.options.input.val("");
            return this.options.results.empty()
        };
        c.prototype.selectFirst = function () {
            return this.open(this.options.results.find("li:first"))
        };
        c.prototype.selectOne = function (d) {
            if (d != null) {
                return this.open(d)
            }
        };
        c.prototype.open = function (e) {
            var d;
            this.options.input.val(e.text());
            this.options.map.destroy();
            this.options.map.coords = {
                latitude: e.attr("data-lat"),
                longitude: e.attr("data-lon")
            };
            d = this.options.map.generateSearchUrl();
            this.options.map.appendData(d);
            return this.options.map.setCenter()
        };
        c.prototype.freshResults = function () {
            var d = this;
            return this.timeout = setTimeout(function () {
                return d.renderResults()
            }, this.options.delay)
        };
        c.prototype.renderResults = function () {
            var d, e = this;
            d = this.options.input.val();
            return sz.ui.MapSearch.searchAddress(d, function (m) {
                var j, g, h, n, l, f;
                h = $("<ul/>");
                j = 0;
                n = function (p) {
                    var o;
                    o = $("<li><strong>" + p.name + "</strong></li>");
                    if (j === 0) {
                        e.selected = o;
                        e.selected.addClass("selected")
                    }
                    o.attr("data-lat", p.coords.latitude);
                    o.attr("data-lon", p.coords.longitude);
                    o.on("click", function (q) {
                        e.selectOne(o);
                        return e.hideHint()
                    });
                    h.append(o);
                    return j++
                };
                for (l = 0, f = m.length; l < f; l++) {
                    g = m[l];
                    n(g)
                }
                return e.options.results.html(h).show()
            })
        };
        return c
    })();
    sz.ui.MapHinter = a
}).call(this);