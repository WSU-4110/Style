from rest_framework import serializers
from .models import Customer, Business

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['user', 'fullname', 'email', 'city', 'phone_number', 'profile_picture']


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ['owner', 'business_name', 'email', 'address', 'phone_number', 'logo']
