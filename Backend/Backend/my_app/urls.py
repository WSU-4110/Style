from django.urls import path
from .views import register_view, login_view, password_reset_request, placeholder_view

urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('password-reset/', password_reset_request, name='password_reset'),
    path('placeholder/', placeholder_view, name='placeholder'),
]
