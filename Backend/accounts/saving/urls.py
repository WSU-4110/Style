from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, ArtistPortfolioViewSet, ProfileUploadView

router = DefaultRouter()
router.register(r'user-profile', UserProfileViewSet, basename='user-profile')
router.register(r'artist-portfolio', ArtistPortfolioViewSet, basename='artist-portfolio')

urlpatterns = [
    path('', include(router.urls)),
    path('api/profile/', ProfileUploadView.as_view(), name='profile-upload'),
]
