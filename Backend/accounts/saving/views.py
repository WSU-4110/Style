import logging
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Customer, ArtistPortfolio
from .serializers import UserProfileSerializer, ArtistPortfolioSerializer

# Set up logging to record events and errors
logger = logging.getLogger(__name__)

# Viewset for managing user profiles
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    # Ensures only authenticated users can access these endpoints

    def perform_create(self, serializer):
        # Get the Firebase user ID from the request
        firebase_user = self.request.user  
        # Save the user profile, associating it with the authenticated Firebase user
        serializer.save(firebase_user_id=firebase_user.uid)

# Viewset for managing artist portfolios
class ArtistPortfolioViewSet(viewsets.ModelViewSet):
    queryset = ArtistPortfolio.objects.all()
    serializer_class = ArtistPortfolioSerializer
    permission_classes = [IsAuthenticated]
    # Restricts access to authenticated users

    def create(self, request, *args, **kwargs):
        # Retrieve the customer profile based on the Firebase user ID
        user_profile = Customer.objects.filter(firebase_user_id=request.user.uid).first()

        if not user_profile:
            # Return an error if no associated customer profile is found
            return Response(
                {"detail": "User profile not found. Please create a profile first."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate and save the artist portfolio
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_profile=user_profile)  # Associate the portfolio with the user profile if made
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

# API View for handling profile uploads
class ProfileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    # Allows the view to handle file uploads and form data

    def post(self, request, *args, **kwargs):
        try:
            # Extract data from the request
            business_name = request.data.get('business_name')
            bio = request.data.get('bio')
            profile_picture = request.FILES.get('profile_picture')
            photos = request.FILES.getlist('photos')

            # Log the data (placeholder for database saving logic)
            logger.info(f'Business Name: {business_name}')
            logger.info(f'Bio: {bio}')
            logger.info(f'Profile Picture: {profile_picture}')
            logger.info(f'Photos: {photos}')

            # You can replace this with logic to save the portfolio to the database

            return Response({'message': 'Portfolio saved successfully!'}, status=status.HTTP_200_OK)
        except Exception as e:
            # Log and return an error response in case of failure
            logger.error('Error saving portfolio:', exc_info=True)
            return Response(
                {'message': 'Failed to save portfolio. Please try again.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
