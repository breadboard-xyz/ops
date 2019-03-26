var fs    = require('fs')
  , ms    = require('ms')
  , _     = require('lodash')
  ;

module.exports = {
  "debug" : {
    "details"           : true
  },
  "www" : {
    "url"               : "https://www.breadboard.io",
    "internal-http"     : 1337
  },
  "community-ui"        : {
    "hostname"          : "oss.breadboard.xyz",
    "port"              : 8040
  },
  "gateway" : {
    "url"               : "https://foobar.run",
    "urls" : {
      "github.com"      : "https://github.run",
      "gitlab.com"      : "https://gitlab.run",
      "bitbucket.org"   : "https://bitbucket.run"
    }
  },
  "account"     : {
    "url"               : "https://account.breadboard.io"
  },
  "codedb" : {
    "url"               : "http://code.breadboard.xyz:8585",
    "ttl"               : ms('1d') / 1000
  },
  "google"              : {
    "analytics"         : {
      "id"              :  _.trim(fs.readFileSync('/run/secrets/google/analytics/id', 'utf-8'))
    }
  },
  "session" : {
    "host"              : "account.redis.breadboard.xyz",
    "port"              : 6379,
    "secret"            : _.trim(fs.readFileSync('/run/secrets/session/key', 'utf-8')),
    "password"          : "",
    "db"                : 0,
    "prefix"            : null,
    "cookie"            : {
      "name"            : "session",
      "maxAge"          : ms('7d'),
      "httpOnly"        : true,
      "secure"          : false,
      "domain"          : _.trim(fs.readFileSync('/run/secrets/session/cookie/domain', 'utf-8'))
    }
  },
  "mongo" : {
      "hostname"    : _.trim(fs.readFileSync('/run/secrets/mongodb/host', 'utf-8'))
    , "port"        : 27017
    , "username"    : _.trim(fs.readFileSync('/run/secrets/mongodb/username', 'utf-8'))
    , "password"    : _.trim(fs.readFileSync('/run/secrets/mongodb/password', 'utf-8'))
    , "database"    : _.trim(fs.readFileSync('/run/secrets/mongodb/database', 'utf-8'))
  },
  "metering" : {
    "redis" : {
      "host"      : "metering.redis.breadboard.xyz",
      "port"      : 6379,
      "password"  : null,
      "db"        : 0
    }
  }
};