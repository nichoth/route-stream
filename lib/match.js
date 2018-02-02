/**
 * Attempt to match the given request to
 * one of the routes. When successful
 * a  {fn, params, splats} obj is returned
 *
 * @param  {Array} routes
 * @param  {String} uri
 * @return {Object}
 */
function match (_route, uri, startAt) {
    var routes = [Route(_route)]
    var captures, i = startAt || 0;

    for (var len = routes.length; i < len; ++i) {
        var route = routes[i],
            re = route.re,
            keys = route.keys,
            splats = [],
            params = {};

        if (captures = uri.match(re)) {
            for (var j = 1, len = captures.length; j < len; ++j) {
                var key = keys[j-1],
                    val = typeof captures[j] === 'string'
                        ? unescape(captures[j])
                        : captures[j];
                if (key) {
                    params[key] = val;
                } else {
                    splats.push(val);
                }
            }

            return {
                params: params,
                splats: splats,
                route: route.src
                // next: i + 1
            };
        }
    }
};


module.exports = match

function Route (path){
  var src, re, keys = [];

  if (path instanceof RegExp) {
    re = path;
    src = path.toString();
  } else {
    re = pathToRegExp(path, keys);
    src = path;
  }

  return {
     re: re,
     src: path.toString(),
     keys: keys
  }
};

/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String} path
 * @param  {Array} keys
 * @return {RegExp}
 */
var pathToRegExp = function (path, keys) {
	path = path
		.concat('/?')
		.replace(/\/\(/g, '(?:/')
		.replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g, function(_, slash, format, key, capture, optional){
			if (_ === "*"){
				keys.push(undefined);
				return _;
			}

			keys.push(key);
			slash = slash || '';
			return ''
				+ (optional ? '' : slash)
				+ '(?:'
				+ (optional ? slash : '')
				+ (format || '') + (capture || '([^/]+?)') + ')'
				+ (optional || '');
		})
		.replace(/([\/.])/g, '\\$1')
		.replace(/\*/g, '(.*)');
	return new RegExp('^' + path + '$', 'i');
};
