var h = require('picodom').h
var App = require('pico-stream')

function View (props) {
    return h('nav', {}, [
        h('a', { href: '/' }, ['home']),
        ' | ',
        h('a', { href: '/foo' }, ['foo']),
        ' | ',
        h('a', { href: '/bar' }, ['bar']),
        ' | ',
        h('a', { href: '/baz' }, ['baz']),
    ])
}

App(View, [], {})

