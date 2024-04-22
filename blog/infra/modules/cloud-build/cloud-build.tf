variable "github_owner" {}
variable "github_app_repo_name" {}
variable "region" {}
variable "gcp_project_id" {}
variable "backend_app_name" {}
variable "frontend_app_name" {}
variable "cloudsql_instance_full_name" {}
variable "cloud_run_service_account" {}

resource "google_cloudbuild_trigger" "deploy-blog-3213678-backend-app" {
  name = "deploy-blog-3213678-backend-app"
  description = "deploys NestJS app to Cloud Run"
  location = var.region
  github {
    owner = var.github_owner
    name = var.github_app_repo_name
    push {
      branch = "^master$"
    }
  }
  included_files = ["blog/backend/**"]
  filename = "blog/backend/cloudbuild.yaml"
  substitutions = {
    _REGION = var.region
    _CLOUDSQL_INSTANCE_FULL_NAME = var.cloudsql_instance_full_name
    _ARTIFACT_REPOSITORY_IMAGE_NAME = "${var.region}-docker.pkg.dev/${var.gcp_project_id}/${var.backend_app_name}/blog-backend"
    _SERVICE_ACCOUNT: var.cloud_run_service_account
  }
}

resource "google_cloudbuild_trigger" "deploy-blog-3123678-frontend-app" {
  name = "deploy-blog-3213678-frontend-app"
  description = "deploys Next.js app to Cloud Run"
  location = var.region
  github {
    owner = var.github_owner
    name = var.github_app_repo_name
    push {
      branch = "^master$"
    }
  }
  included_files = ["blog/frontend/**"]
  filename = "blog/frontend/cloudbuild.yaml"
  substitutions = {
    _REGION = var.region
    _ARTIFACT_REPOSITORY_IMAGE_NAME = "${var.region}-docker.pkg.dev/${var.gcp_project_id}/${var.frontend_app_name}/blog-frontend"
    _SERVICE_ACCOUNT: var.cloud_run_service_account
  } 
}