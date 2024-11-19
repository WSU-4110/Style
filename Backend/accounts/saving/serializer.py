from rest_framework import serializers
from .models import Customer, ArtistPortfolio

# Serializer for the Customer model
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['firebase_user_id', 'fullname', 'email', 'city', 'phone_number', 'profile_picture']
        # Specifies fields to serialize, allowing CRUD operations for the Customer model

# Serializer for the ArtistPortfolio model
class ArtistPortfolioSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer()
    # Nested serializer to include related Customer data

    class Meta:
        model = ArtistPortfolio
        fields = ['user_profile', 'business_name', 'bio', 'profile_picture', 'photos', 'services']
        # Specifies fields to serialize, allowing CRUD operations for the ArtistPortfolio model

    def create(self, validated_data):
        # Handles creation of a portfolio along with the related customer profile
        user_profile_data = validated_data.pop('user_profile')
        user_profile, created = Customer.objects.get_or_create(
            firebase_user_id=user_profile_data['firebase_user_id'],
            defaults=user_profile_data  # Creates a new Customer if it doesn't exist
        )
        # Creates the portfolio linked to the customer profile
        portfolio = ArtistPortfolio.objects.create(user_profile=user_profile, **validated_data)
        return portfolio
