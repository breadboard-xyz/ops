var bytes = require('bytes')
  , fs    = require('fs')
  , ms    = require('ms')
  , _     = require('lodash')
  ;

module.exports = {
  "jwt"         : {
    "key"       : _.trim(fs.readFileSync('/run/secrets/key/key', 'utf-8')),
    "public"    : _.trim(fs.readFileSync('/run/secrets/key/key.pub', 'utf-8')),
    "expiresIn" : ms('30m') / 1000
  },
  "account"     : {
    "port"          : 8050,
    "impersonate" : {
      "username"  : null
    },
    "mongo"       : {
      "hostname"  : _.trim(fs.readFileSync('/run/secrets/mongodb/hostname', 'utf-8')),
      "port"      : 27017,
      "username"  : _.trim(fs.readFileSync('/run/secrets/mongodb/username', 'utf-8')),
      "password"  : _.trim(fs.readFileSync('/run/secrets/mongodb/password', 'utf-8')),
      "database"  : _.trim(fs.readFileSync('/run/secrets/mongodb/database', 'utf-8'))
    },
    "redis" : {
      "host"          : "account.redis.breadboard.xyz",
      "port"          : 6379,
      "password"      : null,
      "db"            : 0
    },
    "oauth" : {
      "callback"  : "https://www.breadboard.io/auth/callback",
      "strategy"  : [
        {
          "module"        : "passport-github2",
          "name"          : "github.com",
          "options"       : {
            "clientID"          : _.trim(fs.readFileSync('/run/secrets/oauth/strategy/github.com/id', 'utf-8')),
            "clientSecret"      : _.trim(fs.readFileSync('/run/secrets/oauth/strategy/github.com/secret', 'utf-8')),
            "authorizationURL"  : null, // "https://github.com/login/oauth/authorize",
            "tokenURL"          : null, // "https://github.com/login/oauth/access_token",
            "customHeaders"     : null, // {},
            "userProfileURL"    : null, // "https://api.github.com/user",
            "userEmailURL"      : null  // "https://api.github.com/user/emails",
          },
          "scope"         : [
            "user:email",
            "public_repo",
            "repo",
            "read:repo_hook",
            "write:repo_hook"
          ]
        }
      ]
    }
  },
  "backend"     : {
      "mongodb"   : {
        "host"      : _.trim(fs.readFileSync('/run/secrets/backend/mongodb/host', 'utf-8')),
        "port"      : 27017,
        "user"      : _.trim(fs.readFileSync('/run/secrets/backend/mongodb/user', 'utf-8')),
        "password"  : _.trim(fs.readFileSync('/run/secrets/backend/mongodb/password', 'utf-8'))
      }
  }
};