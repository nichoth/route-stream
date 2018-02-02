# route stream

WIP

Expose browser route events as pull streams

## develop

    $ npm start

## example

```js
var Router = require('../')
var S = require('pull-stream')
require('../view')

var router = Router()

S(
    router('/foo'),
    S.log()
)

S(
    // each call creates a new stream, so you can pipe the same route
    // event to multiple sinks
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
```

