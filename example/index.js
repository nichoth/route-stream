var Router = require('../')
var S = require('pull-stream')
require('../view')

var router = Router()

S(
    router('/foo'),
    S.log()
)

S(
    router('/foo', function (match) {
        // you can map the route data here
        // this is just convenience for adding S.map in the pipeline
        return match
    }),
    S.log()
)

S(
    router('/b*'),
    S.log()
)


