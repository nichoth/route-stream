var OnRoute = require('route-event')
var match = require('./lib/match')
var S = require('pull-stream')
var Notify = require('pull-notify')
var Pushable = require('pull-pushable')

function Path$ () {
    var path$ = Notify()
    var onRoute = OnRoute()
    onRoute(function (path, scroll) {
        path$(path)
    })
    return path$.listen
}

function Router () {
    var path$ = Path$()

    function router (query, fn) {
        return S(
            path$(),
            Router.match(query, fn)
        )
    }

    return router
}

Router.match = function (query, fn) {
    return S(
        S.map(function (path) {
            var m = match(query, path)
            if (!fn) return m
            return fn(m)
        }),
        S.filter(Boolean)
    )
}

Router.Paths = Path$
module.exports = Router

