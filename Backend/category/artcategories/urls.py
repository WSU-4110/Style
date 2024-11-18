from django.urls import path  # Importing 'path' function for defining URL patterns
from . import views  # Importing the views module from the current directory

# Defining URL patterns for the app
urlpatterns = [
    # Mapping the root URL ('') to the 'home' view function
    # When a user visits the root of the site (e.g., '/'), the 'home' function will be executed
    path('', views.home, name='home'),
]
