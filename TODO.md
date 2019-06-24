cat data/letsencrypt/live/haproxy/cert.pem data/letsencrypt/live/haproxy/privkey.pem | tee breadboard.io/haproxy/ssl/fullchain.pem

cat /srv/data/letsencrypt/live/haproxy/fullchain.pem /srv/data/letsencrypt/live/haproxy/privkey.pem | tee /srv/breadboard.io/haproxy/ssl/fullchain.pem