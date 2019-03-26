var fs    = require("fs"),
    bytes = require("bytes"),
    ms    = require("ms");

module.exports = {
  "jwt": {
    "key"       : fs.readFileSync('/run/secrets/key/key', 'utf-8'),
    "public"    : fs.readFileSync('/run/secrets/key/key.pem', 'utf-8'),
    "expiresIn" : "12h",
    "iss"       : "tailf.io"
  },
  "tailf": {
    "cors": {
      origin : [/\.breadboard\.io$/]
    },
    "port": 8654,
    "origin": "https://tailf.io",
    "ls_limit": 50,
    "log": {
      "dirname": "/disk"
    },
    "chunk": {
      "size": bytes('50kb')
    },
    "redis": {
      "host": "tailf.redis.breadboard.xyz",
      "port": 6379,
      "password": null,
      "db": 0,
      "db_index": 1
    },
    "metering": {
      "*": {
        "limit_per_file": bytes('100kb'),
        "limit_metadata": bytes('20kb'),
        "ttl": ms('15d')
      }
    }
  }
};