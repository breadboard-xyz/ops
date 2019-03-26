var fs    = require('fs')
  , ms    = require('ms')
  ;

module.exports = {
  "session" : {
    "name" : "session",
    "maxAge" : ms('7d'),
    "keys" : [
      `${fs.readFileSync('/run/secrets/session/key', 'utf-8')}`
    ]
  },
  "breadboard" : {
    "port": 8040
  },
  "tailf" : {
    "url" : "https://tailf.io"
  },
  "account": {
    "oauth" : {
      "strategy"  : [
        {
          "name" : "github.com",
          "login_url" : "https://account.breadboard.io/auth/github.com"
        }
      ]
    }
  },
  "codedb": {
    "url": "http://code.breadboard.xyz:8585"
  },
  "gateway": {
    "url": "https://foobar.run"
  }
};
