import { NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseApp from '../../firebase';

const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

export async function POST(request) {
  const formData = await request.formData();

  const fullname = formData.get('fullname');
  const email = formData.get('email');
  const city = formData.get('city');
  const phone_number = formData.get('phone_number');
  const prof_pic = formData.get('prof_pic');

  try {
    // Get the current user's UID
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const userId = user.uid; // Get the user's UID

    // Create user profile document in Firestore
    const userProfile = {
      fullname,
      email,
      city,
      phone_number,
    };

    await setDoc(doc(db, 'users', userId), userProfile);

    if (prof_pic && prof_pic instanceof File) {
      const storageRef = ref(storage, `profile_pictures/${userId}/${prof_pic.name}`);
      const snapshot = await uploadBytes(storageRef, prof_pic);
      console.log('Uploaded profile picture:', snapshot.ref);
    }

    return NextResponse.json({ message: 'Profile updated successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'An error occurred while updating the profile.' }, { status: 500 });
  }
}