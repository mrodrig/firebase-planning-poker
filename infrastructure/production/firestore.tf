resource "google_firestore_database" "main" {
  project     = local.project_id
  name        = "(default)"
  location_id = "nam5"
  type        = "FIRESTORE_NATIVE"
}
