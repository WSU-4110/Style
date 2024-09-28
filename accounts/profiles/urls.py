from django.urls import path
from .views import login_view, register_view
from .views import placeholder_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('', placeholder_view, name= 'placeholder'),

]