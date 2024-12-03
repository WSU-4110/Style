import * as admin from 'firebase-admin';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
config();

// Read the service account key directly
const serviceAccountPath = path.join(__dirname, 'api/keys/style-438016-firebase-adminsdk-f35zz-99e2282da9.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK 
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://style-438016-default-rtdb.firebaseio.com/'
  });
}

console.log('Firebase Admin SDK initialized');

module.exports = admin;
