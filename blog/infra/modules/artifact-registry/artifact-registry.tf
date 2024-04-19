variable "gcp_project_id" {}
variable "backend_app_name" {}
variable "frontend_app_name" {}

variable "artifact_registry_location" {
  type = string
  description = "Artifact Registry のロケーションをどこにするか"
}

resource "google_artifact_registry_repository" "blog-3213678-backend-app" {
  project = var.gcp_project_id
  location = var.artifact_registry_location
  repository_id = var.backend_app_name
  description = "backend application"
  format = "DOCKER"
}

resource "google_artifact_registry_repository" "blog-3213678-frontend-app" {
  project = var.gcp_project_id
  location = var.artifact_registry_location
  repository_id = var.frontend_app_name
  description = "frontend application"
  format = "DOCKER"
}
