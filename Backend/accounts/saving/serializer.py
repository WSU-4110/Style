from rest_framework import serializers
from .models import Customer, ArtistPortfolio

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['firebase_user_id', 'fullname', 'email', 'city', 'phone_number', 'profile_picture']

class ArtistPortfolioSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer()

    class Meta:
        model = ArtistPortfolio
        fields = ['user_profile', 'business_name', 'bio', 'profile_picture', 'photos', 'services']

    def create(self, validated_data):
        # Extract the user_profile data and create or get the related customer
        user_profile_data = validated_data.pop('user_profile')
        user_profile, created = Customer.objects.get_or_create(
            firebase_user_id=user_profile_data['firebase_user_id'],
            defaults=user_profile_data  # Create the user profile if it doesn't exist
        )
        # Now create the artist portfolio with the related user_profile
        portfolio = ArtistPortfolio.objects.create(user_profile=user_profile, **validated_data)
        return portfolio