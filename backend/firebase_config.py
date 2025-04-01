import firebase_admin
from firebase_admin import credentials, auth, firestore, storage
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get credentials from environment
firebase_credentials = os.getenv("FIREBASE_CREDENTIALS")
storage_bucket_name = os.getenv("FIREBASE_STORAGE_BUCKET")

# Initialize Firebase Admin SDK
cred = credentials.Certificate(firebase_credentials)

firebase_admin.initialize_app(cred, {
    "storageBucket": storage_bucket_name
})

# Firebase services
db = firestore.client()
bucket = storage.bucket()
