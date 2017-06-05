! function main(context, mainCallback) {
    "function" == typeof define && define.amd ?
        define([], mainCallback) :
        "object" == typeof module && module.exports ?
        module.exports = mainCallback() :
        context.StartAudioContext = mainCallback()
}(this, function mainCallback() {
    function e(e) {
        var t = e.createBuffer(1, 1, e.sampleRate),
            n = e.createBufferSource();
        n.buffer = t,
            n.connect(e.destination),
            n.start(0),
            e.resume && e.resume()
    }

    function t(e) {
        return "running" === e.state
    }

    function n(e, n) {
        function i() {
            t(e) ? n() : (requestAnimationFrame(i),
                e.resume && e.resume())
        }
        t(e) ? n() : i()
    }

    function validateType(e, t, n) {
        if (Array.isArray(e) || NodeList && e instanceof NodeList)
            for (var o = 0; o < e.length; o++)
                validateType(e[o], t, n);
        else if ("string" == typeof e)
            validateType(document.querySelectorAll(e), t, n);
        else if (e.jquery && "function" == typeof e.toArray)
            validateType(e.toArray(), t, n);
        else if (Element && e instanceof Element) {
            var r = new d(e, n);
            t.push(r)
        }
    }

    function o(e, t, o) {
        var d = new Promise(function (t) {
                n(e, t)
            }),
            r = [];
        return t && validateType(t, r, e),
            d.then(function () {
                for (var e = 0; e < r.length; e++)
                    r[e].dispose();
                r = null,
                    o && o()
            }),
            d
    }
    var dragHandler = function (event, callback) {
        this._dragged = !1,
            this._element = event,
            this._bindedMove = this._moved.bind(this),
            this._bindedEnd = this._ended.bind(this, callback),
            event.addEventListener("touchmove", this._bindedMove),
            event.addEventListener("touchend", this._bindedEnd),
            event.addEventListener("mouseup", this._bindedEnd)
    };
    return dragHandler.prototype._moved = function (e) {
            this._dragged = !0
        },
        dragHandler.prototype._ended = function (t) {
            this._dragged || e(t),
                this._dragged = !1
        },
        dragHandler.prototype.dispose = function () {
            this._element.removeEventListener("touchmove", this._bindedMove),
                this._element.removeEventListener("touchend", this._bindedEnd),
                this._element.removeEventListener("mouseup", this._bindedEnd),
                this._bindedMove = null,
                this._bindedEnd = null,
                this._element = null
        },
        o
});