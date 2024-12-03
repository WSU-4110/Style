from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from allauth.socialaccount.models import SocialAccount
from accounts.firebase_config import db, auth  # Use absolute import

# User registration view
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

        # Check if the user already exists in Django or Firebase
        if User.objects.filter(email=email).exists():
            messages.error(request, "A user with this email already exists.")
            return render(request, 'profiles/account_page.html')

        try:
            # Create Firebase user
            firebase_user = auth.create_user(
                email=email,
                password=password
            )
            # Create a Django user for management
            django_user = User.objects.create_user(username=username, email=email, password=password)
            django_user.save()

            # Save user data to Firestore
            save_user_data_to_firestore(firebase_user.uid, username, email)

            login(request, django_user)
            messages.success(request, "User registered successfully")
            return redirect('portfolio')
        except firebase_admin.auth.AuthError as e:
            messages.error(request, f"Firebase error: {str(e)}")
            return render(request, 'profiles/account_page.html')
        except Exception as e:
            messages.error(request, f"Unexpected error: {str(e)}")
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

# User login view
def login_view(request):
    if request.method == "POST":
        email_or_username = request.POST.get('email')
        password = request.POST.get('password')

        try:
            # Authenticate with Django
            django_user = User.objects.filter(email=email_or_username).first()
            if not django_user:
                messages.error(request, "User with this email does not exist.")
                return render(request, 'profiles/account_page.html')

            user = authenticate(request, username=django_user.username, password=password)

            if user is not None:
                login(request, user)
                messages.success(request, "User logged in successfully")
                return redirect('portfolio')
            else:
                messages.error(request, "Invalid login credentials.")
                return render(request, 'profiles/account_page.html')

        except firebase_admin.auth.UserNotFoundError:
            messages.error(request, "User not found in Firebase.")
            return render(request, 'profiles/account_page.html')
        except Exception as e:
            messages.error(request, f"Unexpected error: {str(e)}")
            return render(request, 'profiles/account_page.html')

    return render(request, 'profiles/account_page.html')

# Google login view (redirect to allauth)
def google_login(request):
    return redirect('/accounts/google/login/')

# Portfolio view
def portfolio_view(request):
    return render(request, 'portfolio.html')

# Delete Profile View
def delete_profile(request):
    if request.method == "POST":
        try:
            user = request.user

            firebase_user = firebase_auth.get_user_by_email(user.email)
            firebase_auth.delete_user(firebase_user.uid)

            db.collection('users').document(firebase_user.uid).delete()

            user.delete()
            
            # Log out the user and redirect
            logout(request)
            messages.success(request, "Your profile has been deleted successfully.")
            return redirect('homepage')  
        except firebase_admin.auth.UserNotFoundError:
            messages.error(request, "User not found in Firebase.")
            return redirect('portfolio')
        except Exception as e:
            messages.error(request, f"Error deleting profile: {str(e)}")
            return redirect('portfolio')

    return render(request, 'userprofile/page.tsx')