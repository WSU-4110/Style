from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Customer, ArtistPortfolio
from .serializers import UserProfileSerializer, ArtistPortfolioSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        firebase_user = self.request.user  # Get Firebase user from request
        # Ensure that only one profile is created per user
        serializer.save(firebase_user_id=firebase_user.uid)

class ArtistPortfolioViewSet(viewsets.ModelViewSet):
    queryset = ArtistPortfolio.objects.all()
    serializer_class = ArtistPortfolioSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Attempt to get the existing user profile
        user_profile = Customer.objects.filter(firebase_user_id=self.request.user.uid).first()
        
        if not user_profile:
            return Response(
                {"detail": "User profile not found. Please create a profile first."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save(user_profile=user_profile)
