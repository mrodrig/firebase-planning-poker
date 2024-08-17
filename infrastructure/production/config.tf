locals {
  region       = "us-central1"
  project_name = "firebase-planning-poker"
  project_id   = "fire-planning-poker-prd"

  firebase_adminsdk_account = "firebase-adminsdk-k84dg"
}

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "=5.40.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "=5.40.0"
    }
    github = {
      source  = "integrations/github"
      version = "6.2.3"
    }
  }
}

provider "google" {
  project = local.project_id
}

provider "google-beta" {
  project               = local.project_id
  user_project_override = true
  billing_project       = local.project_id
}

provider "github" {}

# The first time this is initialized, the following block needs to be commented out to avoid a "Failed to get existing workspaces: querying Cloud Storage failed: storage: bucket doesn't exist" error
terraform {
  backend "gcs" {
    bucket = "fire-planning-poker-prd.appspot.com"
    prefix = "tfstate"
  }
}

# gcloud auth application-default set-quota-project <proj_id>
