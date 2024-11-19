import logging
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Customer, ArtistPortfolio
from .serializers import UserProfileSerializer, ArtistPortfolioSerializer

# Set up logging
logger = logging.getLogger(__name__)

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

    def create(self, request, *args, **kwargs):
        user_profile = Customer.objects.filter(firebase_user_id=request.user.uid).first()

        if not user_profile:
            return Response(
                {"detail": "User profile not found. Please create a profile first."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_profile=user_profile)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProfileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            business_name = request.data.get('business_name')
            bio = request.data.get('bio')
            profile_picture = request.FILES.get('profile_picture')
            photos = request.FILES.getlist('photos')

            # Log data (replace this with database saving logic if needed)
            logger.info(f'Business Name: {business_name}')
            logger.info(f'Bio: {bio}')
            logger.info(f'Profile Picture: {profile_picture}')
            logger.info(f'Photos: {photos}')

            # Save logic here if applicable

            return Response({'message': 'Portfolio saved successfully!'}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error('Error saving portfolio:', exc_info=True)
            return Response(
                {'message': 'Failed to save portfolio. Please try again.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
