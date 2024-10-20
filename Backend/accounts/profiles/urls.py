from django.urls import path
from .views import login_view, register_view
from .views import portfolio_view, google_login
from django.conf import settings
from django.conf.urls.static import static
from .views import save_customer_info, save_business_info


urlpatterns = [
    path('save-customer/', save_customer_info, name='save-customer'),
    path('save-business/', save_business_info, name='save-business'),
]
urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('portfolio/', portfolio_view, name='portfolio'),
    path('google-login/', google_login, name='google_login'),

]