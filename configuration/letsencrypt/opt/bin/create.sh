#!/bin/ash

domains=""
while read p || [[ -n "$p" ]]; do
  domains="$domains -d $p "
done <$CERTBOT_DOMAIN_LIST_FILE

CMD="certbot certonly -n --standalone --agree-tos --non-interactive            \
        -m $CERTBOT_EMAIL --preferred-challenges http --http-01-port 80        \
        --cert-name $CERTBOT_CERT_NAME                                         \
        --renew-with-new-domains --keep-until-expiring $domains"

$CMD

if [ -n "$CERTBOT_CRON_RENEW" ]; then
  echo "$CERTBOT_CRON_RENEW $CMD" > /etc/crontabs/root
  crond -f
fi

#https://github.com/hamburml/docker-flow-letsencrypt