vcl 4.0;

# On Kuberentes is "localhost"
# In Docker-Compose is "zkill-nginx"
backend default {
    .host = "zkill-nginx";
    .port = "8080";
}
