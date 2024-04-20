variable "target_region" {
  description = "region to deploy"
  type = string
  default = "us-cetral1"
}

resource "google_sql_database_instance" "blog-3213678-db" {
  name = "blog-3213678-db"
  database_version = "POSTGRES_15"
  region = var.target_region
  deletion_protection = false

  settings {
    tier = "db-f1-micro"
    availability_type = "ZONAL"
    disk_size = "20"
    disk_type = "PD_SSD"
  }
}

resource "google_sql_database" "blog-3213678-db" {
  name = "blog-3213678-db"
  instance = google_sql_database_instance.blog-3213678-db.name
}

output "blog_3213678_db_connection_name" {
  value = google_sql_database_instance.blog-3213678-db.connection_name
}