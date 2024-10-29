from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile, ArtistPortfolio
from .serializers import UserProfileSerializer, ArtistPortfolioSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        firebase_user = self.request.user  # Get Firebase user from request
        serializer.save(firebase_user_id=firebase_user.uid)

class ArtistPortfolioViewSet(viewsets.ModelViewSet):
    queryset = ArtistPortfolio.objects.all()
    serializer_class = ArtistPortfolioSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user_profile = UserProfile.objects.get(firebase_user_id=self.request.user.uid)
        serializer.save(user_profile=user_profile)