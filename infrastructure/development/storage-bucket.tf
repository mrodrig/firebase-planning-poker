resource "google_storage_bucket" "firebase-appspot" {
  name          = "${local.project_id}.appspot.com"
  force_destroy = false
  location      = "US"
  storage_class = "STANDARD"

  versioning {
    enabled = true
  }
}

resource "google_storage_bucket" "firebase-staging" {
  name          = "staging.${local.project_id}.appspot.com"
  force_destroy = false
  location      = "US"
  storage_class = "STANDARD"

  lifecycle_rule {
    action {
      type = "Delete"
    }

    condition {
      age                                     = 15
      days_since_custom_time                  = 0
      days_since_noncurrent_time              = 0
      matches_prefix                          = []
      matches_storage_class                   = []
      matches_suffix                          = []
      no_age                                  = false
      num_newer_versions                      = 0
      send_days_since_custom_time_if_zero     = false
      send_days_since_noncurrent_time_if_zero = false
      send_num_newer_versions_if_zero         = false
      with_state                              = "ANY"
    }
  }
}


