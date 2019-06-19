vcl 4.0;

# On Kuberentes is "localhost"
# In Docker-Compose is "esi-nginx"
backend default {
    .host = "esi-nginx";
    .port = "8080";
}
