resource "google_firebase_database_instance" "main" {
  provider      = google-beta
  region        = local.region
  instance_id   = "${local.project_id}-default-rtdb"
  type          = "DEFAULT_DATABASE"
  desired_state = "ACTIVE"
}
