import { NextResponse } from 'next/server';
import { setDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../../firebase-admin';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import multer from 'multer';
import * as admin from 'firebase-admin';

// Multer setup for in-memory file storage
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
    console.log('Incoming request to /api/userprofile');

    // Parse Multer files and fields from the request
    const req = await multerPromise(request);
    const { files, body } = req;

    console.log('Uploaded files:', files);
    console.log('Form data:', body);

    const { fullname, email, city, phone_number } = body;

    // Extract and verify the Authorization token
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

    // Verify the Firebase token to ensure authentication
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    console.log('Decoded Firebase token for user ID:', userId);

    // Prepare the user profile object
    const userProfile = { fullname, email, city, phone_number };

    // Save the user profile data to Firestore
    await setDoc(doc(db, 'users', userId), userProfile);
    console.log('User profile saved to Firestore:', userProfile);

    // Handle profile picture upload
    let profilePictureURL = null;
    if (files && files.length > 0) {
      const file = files[0];
      const storageRef = ref(storage, `profile_pictures/${userId}/${file.originalname}`);
      await uploadBytes(storageRef, file.buffer); // Upload file to Firebase Storage
      profilePictureURL = await getDownloadURL(storageRef); // Retrieve file URL
      console.log(`Profile picture uploaded to Firebase Storage: ${storageRef.fullPath}`);

      // Save profile picture URL to Firestore
      await setDoc(doc(db, 'users', userId), { profilePictureURL }, { merge: true });
    }

    // Respond with a success message
    return NextResponse.json(
      {
        message: 'User profile saved successfully!',
        profilePictureURL,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log and respond with an error message
    console.error('Error updating user profile:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return NextResponse.json(
      {
        message: 'An error occurred while updating the user profile.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET method is not implemented yet' }, { status: 200 });
}
