from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    firebase_user_id = models.CharField(max_length=128)  # Store Firebase UID for user authentication    fullname = models.CharField(max_length=100)
    fullname = models.CharField(max_length=250)
    email = models.EmailField()
    city = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # Optional field
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return self.fullname


class Business(models.Model):
    user_profile = models.OneToOneField(User, on_delete=models.CASCADE)
    business_name = models.CharField(max_length=250)
    bio = models.TextField()
    profile_picture = models.ImageField(upload_to='artist_pics/', null=True, blank=True)
    photos = models.JSONField()  # Store photo URLs
    services = models.JSONField() #Store service info

    def __str__(self):
        return self.business_name
