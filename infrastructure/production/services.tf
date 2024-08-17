resource "google_project_service" "project" {
  for_each = toset([
    "cloudresourcemanager.googleapis.com",
    "serviceusage.googleapis.com",
    "firebase.googleapis.com",
    "firebasedatabase.googleapis.com",
    "iam.googleapis.com",
  ])
  project            = local.project_id
  service            = each.key
  disable_on_destroy = true
}
