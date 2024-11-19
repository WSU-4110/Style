import { NextResponse } from 'next/server';
import { setDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../firebase-admin';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import multer from 'multer';
import * as admin from 'firebase-admin';

// Multer setup
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Utility to handle Multer file uploads in a Next.js API route
const multerPromise = (req) =>
  new Promise((resolve, reject) => {
    upload.any()(req, {}, (err) => {
      if (err) reject(err);
      else resolve(req);
    });
  });

export async function POST(request) {
  try {
    console.log('Incoming request to /api/profile');

    // Parse Multer files and fields
    const req = await multerPromise(request);
    const { files, body } = req;

    console.log('Uploaded files:', files);
    console.log('Form data:', body);

    const { businessName, bio } = body;

    // Extract and verify the token from the request headers
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      console.error('Authorization header is missing');
      return NextResponse.json(
        { message: 'Authorization header is missing' },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.error('Authorization token is missing');
      return NextResponse.json(
        { message: 'Authorization token is missing' },
        { status: 401 }
      );
    }

    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    console.log('Decoded Firebase token for user ID:', userId);

    // Prepare the business profile object
    const businessProfile = { businessName, bio };

    // Save the business profile to Firestore
    await setDoc(doc(db, 'businesses', userId), businessProfile);
    console.log('Business profile saved to Firestore:', businessProfile);

    // Handle file uploads (profile picture and photos)
    const uploadedFileUrls = [];
    for (const file of files) {
      const storageRef = ref(storage, `uploads/${userId}/${file.originalname}`);
      await uploadBytes(storageRef, file.buffer);
      const downloadURL = await getDownloadURL(storageRef);
      uploadedFileUrls.push(downloadURL);
      console.log(`Uploaded file to Firebase Storage: ${storageRef.fullPath}`);
    }

    // Respond with a success message
    return NextResponse.json(
      { message: 'Business profile and files uploaded successfully!', uploadedFileUrls },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating business profile:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return NextResponse.json(
      {
        message: 'An error occurred while updating the profile.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET method is not implemented yet' }, { status: 200 });
}
