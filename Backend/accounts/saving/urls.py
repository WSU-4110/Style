from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, ArtistPortfolioViewSet, ProfileUploadView

# Create a router for viewsets
router = DefaultRouter()
router.register(r'user-profile', UserProfileViewSet, basename='user-profile')
# Register the UserProfileViewSet with the router on Customer model

router.register(r'artist-portfolio', ArtistPortfolioViewSet, basename='artist-portfolio')
# Register the ArtistPortfolioViewSet with the router on ArtistPortfolio model

urlpatterns = [
    path('', include(router.urls)),  
    # Include all registered router URLs

    path('api/profile/', ProfileUploadView.as_view(), name='profile-upload'),
    # A specific API endpoint for profile uploads
]
