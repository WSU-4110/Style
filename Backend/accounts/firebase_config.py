import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
from decouple import config
from pathlib import Path

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent

# Load the Firebase credentials
cred_path = config('FIREBASE_SERVICE_ACCOUNT_KEY')
cred = credentials.Certificate(os.path.join(BASE_DIR, 'keys', cred_path))

# Initialize Firebase only if it hasn't been initialized already
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()
