from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import HttpResponse
from .models import UserProfile
from django.core.mail import EmailMessage
from django.core.mail.backends.smtp import EmailBackend
from django.urls import reverse
    
def register_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return render(request, 'profiles/account_page.html')

        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            UserProfile.objects.create(user=user)  # Create user profile

            login(request, user)
            return redirect('placeholder')
        except Exception as e:
            messages.error(request, str(e))
            return render(request, 'profiles/account_page.html')

    return render(request, 'profiles/account_page.html')

def login_view(request):
    if request.method == "POST":
        email_or_username = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = User.objects.get(email=email_or_username)
            username = user.username
        except User.DoesNotExist:
            username = email_or_username

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('placeholder')

        else:
            messages.error(request, "Invalid login credentials.")
            return render(request, 'profiles/account_page.html')

    return render(request, 'profiles/account_page.html')

def password_reset_request(request):
    if request.method == "POST":
        email = request.POST.get('email')
        try:
            user = User.objects.get(email=email)
            user_profile = UserProfile.objects.get(user=user)

            # Create a unique password reset link
            reset_link = request.build_absolute_uri(reverse('password_reset_confirm', args=[user.id]))  # Update with your confirm view
            subject = 'Password Reset Request'
            message = f'Click the link to reset your password: {reset_link}'
            recipient_list = [email]

            send_user_email_with_custom_settings(user_profile, subject, message, recipient_list)
            messages.success(request, "Password reset email sent. Please check your inbox.")
        except User.DoesNotExist:
            messages.error(request, "No user found with that email address.")
        
        return render(request, 'profiles/password_reset_sent.html')  # New template for success

    return render(request, 'profiles/account_page.html')

def placeholder_view(request):
    return HttpResponse("Welcome to the site! This is the placeholder.")

#Original method 
#def send_user_email_with_custom_settings(user_profile, subject, message, recipient_list):
#    email_backend = EmailBackend(
#        host=user_profile.email_host,
#        port=user_profile.email_port,
#        username=user_profile.email_user,
#        password=user_profile.email_password,
#        use_tls=user_profile.use_tls,
#        fail_silently=False,
#    )

#    email = EmailMessage(
#        subject,
#        message,
#        user_profile.email_user,
#        recipient_list,
#        connection=email_backend,
#    )
#   email.send()

#Factory class to create EmailBackend instances 
class EmailBackendFactory:
    @staticmethod
    def create_email_backend(user_profile):
        """
        Factory method to create an EmailBackend instance using custom settings.
        """
        return EmailBackend(
            host=user_profile.email_host,
            port=user_profile.email_port,
            username=user_profile.email_user,
            password=user_profile.email_password,
            use_tls=user_profile.use_tls,
            fail_silently=False,
        )

#Updated function using the Factory Method pattern 
def send_user_email_with_custom_settings(user_profile, subject, message, recipient_list):
    email_backend = EmailBackendFactory.create_email_backend(user_profile)
    email = EmailMessage(
        subject,
        message,
        user_profile.email_user,
        recipient_list,
        connection=email_backend,
    )
    email.send()
