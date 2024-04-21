variable "gcp_project_id" {
  type = string
}

resource "google_service_account" "blog_app_runner" {
  project = var.gcp_project_id
  account_id = "blog-app-runner"
  display_name = "Cloud Run Blog App Dervice Account"
}

resource "google_project_iam_member" "blog_app_runner_member" {
  project = var.gcp_project_id
  role = "roles/editor"
  member = "serviceAccount:${google_service_account.blog_app_runner.email}"
}

resource "google_project_iam_member" "cloud_runner_member" {
  project = var.gcp_project_id
  role = "roles/run.invoker"
  member = "serviceAccount:${google_service_account.blog_app_runner.email}"
}

resource "google_project_iam_member" "sercret_accessor_member" {
  project = var.gcp_project_id
  role = "roles/secretmanager.secretAccessor"
  member = "serviceAccount:${google_service_account.blog_app_runner.email}"
}

output "blog_app_runner_service_account" {
  value = google_service_account.blog_app_runner.email
}