data "github_user" "current" {
  username = ""
}

resource "github_repository" "main" {
  name = "firebase-planning-poker"

  vulnerability_alerts = true

  has_downloads = true
  has_issues    = true
  has_projects  = true
}

resource "github_repository_environment" "development" {
  environment = "Development"
  repository  = github_repository.main.name
}

resource "github_actions_environment_secret" "firebase-admin-sdk-credentials" {
  repository      = github_repository.main.name
  environment     = github_repository_environment.development.environment
  secret_name     = "GCP_FIREBASE_ADMINSDK_SERVICE_ACCOUNT_KEY"
  plaintext_value = google_service_account_key.firebase-adminsdk.private_key
}

resource "github_actions_environment_secret" "firebase-ci-credentials" {
  repository      = github_repository.main.name
  environment     = github_repository_environment.development.environment
  secret_name     = "GCP_CI_SERVICE_ACCOUNT_KEY"
  plaintext_value = google_service_account_key.github-ci.private_key
}
