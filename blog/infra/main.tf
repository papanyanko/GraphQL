terraform {
  required_version = "~> 1.0"
  backend "gcs" {
    prefix = "tfstate/v1"
  }
}

## project ##
provider "google" {
  project = var.gcp_project_id
  region  = var.primary_region
}

locals {
  backend_app_name = "blog-3213678-backend-app"
  frontend_app_name = "blog-3213678-frontend-app"
}

module "artifact-registry" {
  source = "./modules/artifact-registry"
  gcp_project_id = var.gcp_project_id
  artifact_registry_location = var.primary_region
  backend_app_name = local.backend_app_name
  frontend_app_name = local.frontend_app_name
}