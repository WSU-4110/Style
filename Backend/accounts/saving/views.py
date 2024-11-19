from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BaseAuthentication
from firebase_admin import auth
from .models import Customer, ArtistPortfolio
from django.contrib.auth.models import User
from .serializer import UserProfileSerializer, ArtistPortfolioSerializer
from accounts.firebase_config import db, auth  # Use absolute import

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get('Authorization')
        if not token:
            return None
        try:
            decoded_token = auth.verify_id_token(token.split('Bearer ')[-1])
            user_email = decoded_token.get('email')
            if not user_email:
                return None
            user, created = User.objects.get_or_create(email=user_email)
            return (user, None)
        except Exception:
            return None

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [FirebaseAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        firebase_user = self.request.user
        serializer.save(firebase_user_id=firebase_user.uid)

class ArtistPortfolioViewSet(viewsets.ModelViewSet):
    queryset = ArtistPortfolio.objects.all()
    serializer_class = ArtistPortfolioSerializer
    authentication_classes = [FirebaseAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user_profile = Customer.objects.filter(firebase_user_id=self.request.user.uid).first()
        if not user_profile:
            return Response(
                {"detail": "User profile not found. Please create a profile first."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save(user_profile=user_profile)
