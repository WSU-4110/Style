import admin from '../../firebase-admin'; 
import { NextResponse } from 'next/server';
import { setDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase-admin'; 

export async function POST(request) {
  try {
    // Parse form data from the request
    const formData = await request.formData();
    const businessName = formData.get('business_name');
    const bio = formData.get('bio');
    const profilePic = formData.get('profile_picture');
    const photos = formData.getAll('photos'); 

    // Extract and verify the token from the request headers
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header is missing' }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: 'Authorization token is missing' }, { status: 401 });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    // Prepare the business profile object
    const businessProfile = {
      businessName,
      bio,
    };

    // Save the business profile to Firestore
    await setDoc(doc(db, 'businesses', userId), businessProfile);

    // Handle profile picture upload, if provided
    if (profilePic && typeof profilePic === 'object' && profilePic.name) {
      const storageRef = ref(storage, `profile_pictures/${userId}/${profilePic.name}`);
      await uploadBytes(storageRef, profilePic);
      console.log('Profile picture uploaded successfully:', storageRef.fullPath);
    }

    // Handle additional photos if needed
    if (photos.length > 0) {
      photos.forEach(async (photo) => {
        const storageRef = ref(storage, `business_photos/${userId}/${photo.name}`);
        await uploadBytes(storageRef, photo);
      });
      console.log('Business photos uploaded successfully.');
    }

    // Respond with a success message
    return NextResponse.json({ message: 'Business profile updated successfully!' }, { status: 200 });
  } catch (error) {
    // Improved error logging for better visibility
    console.error('Error updating business profile:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return NextResponse.json({
      message: 'An error occurred while updating the profile.',
      error: error.message,
    }, { status: 500 });
  }
}
