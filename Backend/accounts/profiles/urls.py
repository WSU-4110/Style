from django.urls import path
from .views import login_view, register_view
from .views import portfolio_view, google_login
from django.urls import path
from .views import login_view, register_view, portfolio_view, google_login

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('portfolio/', portfolio_view, name='portfolio'),
    path('google-login/', google_login, name='google_login'),
]
