from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages

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

        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            login(request, user)
            print("user registered and logged in sucessfully")
            return redirect('http://localhost:3000/')
        except Exception as e:
            messages.error(request, str(e))
            return render(request, 'profiles/account_page.html')

    return render(request, 'profiles/account_page.html')

#user login viewing
def login_view(request):
    if request.method == "POST":
        email_or_username = request.POST.get('email')
        password = request.POST.get('password')

        #email or username
        try:
            user = User.objects.get(email=email_or_username)
            username = user.username
        except User.DoesNotExist:
            username = email_or_username

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            print("user logged in succesfully")
            return redirect('portfolio')

        else:
            messages.error(request, "Invalid login credentials.")
            return render(request, 'profiles/account_page.html')

    return render(request, 'profiles/account_page.html')

def portfolio_view(request):
    return render(request, 'portfolio.html')