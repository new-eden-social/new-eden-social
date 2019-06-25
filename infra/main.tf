module "gke-cluster" {
  source  = "google-terraform-modules/kubernetes-engine/google"
  version = "1.15.0"

  general = {
    name = "new-eden-social-main"
    env  = "prod"
    zone = "europe-west3-b"
  }

  master = {
    username                     = "admin"
    password                     = "${random_string.password.result}"
    disable_kubernetes_dashboard = true
  }

  default_node_pool = {
    node_count     = 2
    min_node_count = 2
    max_node_count = 5
    machine_type   = "g1-small"
    preemptible    = true
  }
}

resource "google-sql-database-instance" "master" {
  name             = "new-eden-social-main"
  database_version = "POSTGRES_9_6"
  region           = "europe-west3"

  settings {
    tier = "db-f1-micro"
  }
}
