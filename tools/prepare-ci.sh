#!/bin/bash

echo '=== Installing gcp sdk'
curl -fsSL -o /tmp/gc-sdk.tar.gz https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-262.0.0-linux-x86_64.tar.gz
echo '6d5365de421a1417c785213d5fdedae54e479f9087b037764a4205a96e52c3ca gc-sdk.tar.gz' | sha256sum -c
tar -C /tmp -xzf /tmp/gc-sdk.tar.gz
/tmp/google-cloud-sdk/install.sh
gcloud init

echo '=== Preparing google credentials'
echo $CACHE_GOOGLE_CREDENTIALS_FILE | base64 -d - > .creds-cache.json
echo $REGISTRY_GOOGLE_CREDENTIALS_FILE | base64 -d - > .creds-registry.json

echo '=== Preparing bazelrc.user'
cat > .bazelrc.user <<EOF
build --google_credentials=.creds-cache.json
build --remote_upload_local_results=true
EOF

echo '=== Authenticating docker regestry credentials'
gcloud auth configure-docker
