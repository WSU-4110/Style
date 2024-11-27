from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from allauth.socialaccount.models import SocialAccount
import firebase_admin
from firebase_admin import credentials, auth
from decouple import config
import os
from pathlib import Path

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Firebase credentials: Load path from .env
cred_path = config('FIREBASE_SERVICE_ACCOUNT_KEY')
#Firebase app
cred = credentials.Certificate(os.path.join(BASE_DIR, 'keys', cred_path))
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

#user registration viewing
def register_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return render(request, 'profiles/account_page.html')

        if len(password) < 8:
            messages.error(request, "Password must be at least 8 characters.")
            return render(request, 'profiles/account_page.html')

        try:
            #create Firebase user
            user = auth.create_user(
                email=email,
                password=password
            )
            #django user for management
            django_user = User.objects.create_user(username=username, email=email, password=password)
            django_user.save()

            login(request, django_user)
            messages.success(request, "User registered successfully")
            return redirect('portfolio')
        except Exception as e:
            messages.error(request, str(e))
            return render(request, 'profiles/account_page.html')

    return render(request, 'profiles/account_page.html')

# Function to save user data to Firestore
def save_user_data_to_firestore(user_uid, username, email):
    try:
        db.collection('users').document(user_uid).set({
            'username': username,
            'email': email,
            'createdAt': firestore.SERVER_TIMESTAMP,
        })
    except Exception as e:
        print(f"Error saving user data to Firestore: {e}")

#user login viewing
def login_view(request):
    if request.method == "POST":
        email_or_username = request.POST.get('email')
        password = request.POST.get('password')

        try:
            #firebase authentication
            firebase_user = auth.get_user_by_email(email_or_username)
            #authenticate with Django
            django_user = User.objects.get(email=email_or_username)
            user = authenticate(request, username=django_user.username, password=password)

            if user is not None:
                login(request, user)
                messages.success(request, "user logged in succesfully")
                return redirect('portfolio')

            else:
                messages.error(request, "Invalid login credentials.")
                return render(request, 'profiles/account_page.html')

        except Exception as e:
            messages.error(request, str(e))
            return render(request, 'profiles/account_page.html')

    return render(request, 'profiles/account_page.html')

#google login view (redirect to allauth)
def google_login(request):
    return redirect('/accounts/google/login/')

#portfolio view
def portfolio_view(request):
    return render(request, 'portfolio.html')