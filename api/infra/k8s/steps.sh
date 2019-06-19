# Database credentials
kubectl create secret generic cloudsql-instance-credentials --from-file=credentials.json=/path/to/credentials.json
kubectl create secret generic cloudsql-db-credentials --from-literal=username=proxyuser --from-literal=password=banana-apple-pie



# Settup Voyager
curl -fsSL https://raw.githubusercontent.com/appscode/voyager/7.4.0/hack/deploy/voyager.sh \
    | bash -s -- --provider=gke --enable-analytics=false

## Voyager letsencrypt
kubectl create secret generic voyager-gce --namespace default --from-literal=GCE_PROJECT=eve-book --from-file=GOOGLE_SERVICE_ACCOUNT_JSON_KEY=/path/to/credentials.json
kubectl create secret generic acme-account --from-literal=ACME_EMAIL=tine.jozelj@tjo.space


# Create api-secrets
echo -n 'clientid/clientsecret' | base64
# and store them to api-deployment.yaml