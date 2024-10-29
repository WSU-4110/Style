from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .views import save_customer_info, save_business_info

urlpatterns = [
    path('save-customer/', save_customer_info, name='save-customer'),
    path('save-business/', save_business_info, name='save-business'),
]