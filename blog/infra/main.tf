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

module "cloud-sql" {
  source = "./modules/cloud-sql"
  target_region = var.primary_region
}

module "cloud-build" {
  source = "./modules/cloud-build"
  gcp_project_id = var.gcp_project_id
  region = var.primary_region
  cloud_run_service_account = module.cloud-run.blog_app_runner_service_account
  cloudsql_instance_full_name = module.cloud-sql.blog_3213678_db_connection_name
  backend_app_name = local.backend_app_name
  github_owner = "papanyanko"
  github_app_repo_name = "GraphQL"
}

module "cloud-run" {
  source = "./modules/cloud-run"
  gcp_project_id = var.gcp_project_id
}