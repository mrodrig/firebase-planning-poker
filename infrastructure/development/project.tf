resource "google_project" "main" {
  name       = local.project_name
  project_id = local.project_id

  labels = {
    firebase = "enabled"
  }
}

resource "google_firebase_project" "main" {
  provider = google-beta
  project  = local.project_id
}

data "google_service_account" "firebase-adminsdk" {
  # We can't have this lookup by the account name without hardcoding the email name prefix because
  # there's no way for us to currently determine the hash value that's appended to the end (eg. 6uerl)
  account_id = local.firebase_adminsdk_account
}

resource "google_service_account_key" "firebase-adminsdk" {
  service_account_id = data.google_service_account.firebase-adminsdk.name
}

resource "google_service_account" "github-ci" {
  account_id   = "github-ci"
  display_name = "GitHub CI"
}

resource "google_project_iam_member" "github-ci-owner" {
  project = local.project_id
  role    = "roles/owner"
  member  = google_service_account.github-ci.member
}

resource "google_service_account_key" "github-ci" {
  service_account_id = google_service_account.github-ci.name
}
