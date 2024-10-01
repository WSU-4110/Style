from django.urls import path
from .views import login_view, register_view
from .views import portfolio_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('portfolio/', portfolio_view, name='portfolio'),

]